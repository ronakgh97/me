+++
title = "Some SIMD techniques and usages"
description = "A collection of SIMD techniques for fast linear algebra operations or general optimizations on x86-64 architecture."
date = 2026-08-02
template = "article.html"

[taxonomies]
tags = ["bit-manipulation", "performance", "x86-64", "simd"]

[extra]
go_to_top = true
+++

## Matrix Transposing

Since **matrices** are so famous in linear algebra space, let's transpose a matrix in most optimal way. This operation
can be called `SOA` (Structure of Arrays) to `AOS` (Array of Structures) transformation...I guess, and it is a common
operation in graphics programming, physics simulations, and other applications that require efficient data access
patterns. Something known as `Data Swizzling` and `Data Deswizzling`, both of which allows us to go back & forth between
something like this;

```text
RGB Channels

[R0, G0, B0, A0]    [R0, R1, R2, R3, R4]
[R1, G1, B1, A1] -> [G0, G1, G2, G3, G4]
[R2, G2, B2, A2]    [B0, B1, B2, B3, B4]
[R3, G3, B3, A3] <- [A0, A1, A2, A3, A4]
[R4, G4, B4, A4]
```

Native implementation would be;

```rust
pub fn mat_transpose(src: &[f32], dst: &mut [f32], rows: usize, cols: usize) {
    assert_eq!(src.len(), rows * cols);
    assert_eq!(dst.len(), rows * cols);

    for i in 0..rows {
        for j in 0..cols {
            dst[j * rows + i] = src[i * cols + j];
        }
    }
}
```

The `src` memory access is **sequential**, but the `dst` is **strided**, which creates bad **cache locality** for bigger
matrices, since every write jumps by `rows` elements, so CPU-chan has to fetch more cache lines, therefore **thrashing
L1/L2, TLB and everything**. To improve this we can use
**[blocking technique](https://suif.stanford.edu/papers/lam-asplos91.pdf)**, which is a pretty common optimization way
to handle this. The idea is to divide the matrix into smaller blocks _(fits inside L1/L2)_ and process each block
separately, boths read & write stays inside few cache lines, which improves cache locality and reduces cache misses.

Tiled implementation would be;

```rust
pub fn mat_transpose_tiled(src: &[f32], dst: &mut [f32], rows: usize, cols: usize) {
    assert_eq!(src.len(), rows * cols);
    assert_eq!(dst.len(), rows * cols);

    const TILE: usize = 64;

    for ii in (0..rows).step_by(TILE) {
        for jj in (0..cols).step_by(TILE) {
            // we all inside 64x64 block, 
            // process each and handle last block which may be smaller than 64x64
            let i_end = (ii + TILE).min(rows);
            let j_end = (jj + TILE).min(cols);

            for i in ii..i_end {
                for j in jj..j_end {
                    dst[j * rows + i] = src[i * cols + j];
                }
            }
        }
    }
}
```

Let's write a tiny benchmark;

```rust
#[test]
fn test_perf() {
    let rows = 8192;
    let cols = 8192;
    let matrix = vec![PI; rows * cols];
    let mut transposed = vec![0.0f32; rows * cols];

    black_box(&matrix); // otherwise compiler will optimize away, since its unused
    black_box(&mut transposed);

    {
        let time = Instant::now();
        let tsc_start_mark = unsafe { // timestamp-clock counter
            _mm_lfence();
            _rdtsc()
        };
        mat_transpose(&matrix, &mut transposed, rows, cols);
        let tsc_end_mark = unsafe { // counter-end-mark
            let e = __rdtscp(&mut 0);
            _mm_lfence();
            e
        };
        let elapsed = time.elapsed();
        let tsc = tsc_end_mark - tsc_start_mark;
        println!("Native : {:.6?}, cycles: {}", elapsed, tsc);
    }

    {
        let time = Instant::now();
        let tsc_start_mark = unsafe {
            _mm_lfence();
            _rdtsc()
        };
        mat_transpose_tiled(&matrix, &mut transposed, rows, cols);
        let tsc_end_mark = unsafe {
            let e = __rdtscp(&mut 0);
            _mm_lfence();
            e
        };
        let tsc = tsc_end_mark - tsc_start_mark;
        let elapsed = time.elapsed();
        println!("Tiled  : {:.6?}, cycles: {}", elapsed, tsc);
    }
}
```

Compile & run with **"-C", "target-cpu=x86-64-v3"** and **"-C", "opt-level=3"** flags in release mode;

```terminaloutput
Native : 704.500400ms, cycles: 1704321505
Tiled  : 195.003400ms, cycles: 471748560
test scratch::mat_transpose::test_perf ... ok
```

Not bad, almost **3.6x faster** than native implementation, but we are not done yet, we can use **SIMD deez nu-...**
Since the data in `src` is **contiguous** (row major), we can load multiple values, `"swizzling"` them, simply store
them into `dst` in row major way. _"Wait, Why we can write directly in `dst` memory, its column major, right?"_ -
because now, after `"swizzling"` the registers already contain same layout as `dst`.

```text
Before:
reg0 = a00 a01 a02 a03 a04 a05 a06 a07
reg1 = a10 a11 a12 a13 a14 a15 a16 a17
... so on

After:
reg0 = a00 a10 a20 a30 a40 a50 a60 a70
reg1 = a01 a11 a21 a31 a41 a51 a61 a71
... so on    
```

Notice each earlier reg0/reg0 contain rows of `src`, (contiguous load), after `"swizzling"`, they contain rows of `dst`
(contiguous store), conceptually matching the dst layout, this is necessary, as because we can't write a column of
`dst` - its physically strided, otherwise it would defeat the whole purpose of using **SIMD deez nu-**... _sigh_.

Ok let's look inside the `"swizlling"` part, but before that, since _I am not a AVX512 larper_ (don't have capable CPU).
I
have [Intel I7 14650hx](https://www.intel.com/content/www/us/en/products/sku/235996/intel-core-i7-processor-14650hx-30m-cache-up-to-5-20-ghz/specifications.html),
has mostly all goody `AVX2` features, and it gives us full `256-bit` registers, so we can process only 8 `f32` value at
a time from `src` and `dst` each.

```text
r0: [a00 a01 a02 a03 | a04 a05 a06 a07]
r1: [a10 a11 a12 a13 | a14 a15 a16 a17]
r2: [a20 a21 a22 a23 | a24 a25 a26 a27]
r3: [a30 a31 a32 a33 | a34 a35 a36 a37]
            |
            | (_mm256_unpacklo_ps(r0, r1) / _mm256_unpackhi_ps(r0, r1))
            | (_mm256_unpacklo_ps(r2, r3) / _mm256_unpackhi_ps(r2, r3))
            v
r0: [a00 a10 a01 a11 | a04 a14 a05 a15]
r1: [a02 a12 a03 a13 | a06 a16 a07 a17]
r2: [a20 a30 a21 a31 | a24 a34 a25 a35]
r3: [a22 a32 a23 a33 | a26 a36 a27 a37]
```

By the
docs: [Intel doc](https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html#ig_expand=4928,7054,4928,6050,7054,7054&text=_mm256_unpacklo_ps) -
`Unpacks and interleaves single-precision (32-bit) floating-point elements from the low/high half of each 128-bit lane in a and b`.

```text
DEFINE INTERLEAVE_DWORDS(src1[127:0], src2[127:0]) {
	dst[31:0] := src1[31:0] 
	dst[63:32] := src2[31:0] 
	dst[95:64] := src1[63:32] 
	dst[127:96] := src2[63:32] 
	RETURN dst[127:0]	
}
dst[127:0] := INTERLEAVE_DWORDS(a[127:0], b[127:0])
dst[255:128] := INTERLEAVE_DWORDS(a[255:128], b[255:128])
dst[MAX:256] := 0
```

Look, it takes the lower 128bit of `src1` and `src2` and simply interleaves them, and similarly for upper 128bit. _"So
why we did this?"_ - because we want to pair the element vertically, and form horizontal memory layout, i.e. the column
of `dst` in each reg memory

```text
r0: [a00 a10 a01 a11 | a04 a14 a05 a15]
r2: [a20 a30 a21 a31 | a24 a34 a25 a35]

r1: [a02 a12 a03 a13 | a06 a16 a07 a17]
r3: [a22 a32 a23 a33 | a26 a36 a27 a37]
            |
            | (_mm256_shuffle_ps(r0, r2, 0b01000100), 
            |  _mm256_shuffle_ps(r0, r2, 0b11101110))
            | (_mm256_shuffle_ps(r1, r3, 0b01000100), 
            |  _mm256_shuffle_ps(r1, r3, 0b11101110))
            v
r0: [a00 a10 a20 a30 | a04 a14 a24 a34] Look, the low 128bit resembles the first column of dst
r2: [a01 a11 a21 a31 | a05 a15 a25 a35] Same here, its second column of dst

r1: [a02 a12 a22 a32 | a06 a16 a26 a36] Ok, we see the pattern, right?
r3: [a03 a13 a23 a33 | a07 a17 a27 a37]
```

Again the docs
says: [Intel doc](https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html#text=_mm256_shuffle_ps&ig_expand=4928,6050) -
`Shuffles single-precision (32-bit) floating-point elements in a within 128-bit lanes using the control in imm8`. _"What
is IMM8?"_ - it's an 8-bit const value *(control byte)*, its instruction-specific, here it's used to select the elements
from `a` and `b` to construct altered vector. For example, the binary value:
`0b01 00 01 00` means we take the 2nd **(01)** and 1st **(00)** elements from `a` and `b`, while
`0b11 10 11 10` means we take the 3rd **(11)** and 4th **(10)** elements from `a` and `b`. And now, look that's exactly
what we want, take the `a00`, `a10` from r0 and `a20`, `a30` from r2, and placed them together, that's the first partial
(lower 128bit, mind the **"within 128-bit lanes"**) column of `dst`. The `0b11 10 11 10` does the same for high 128bit,
transforming: `[a00 a10 a01 a11 | a04 a14 a05 a15]` -> `[a00 a10 a20 a30 | a04 a14 a24 a34]`.

So then after pairing r0-r2, r1-r3, r4-r6, r5-r7, somewhere **r4** would `[a40, a50, a60, a70 | a44 a54 a64 a74]`, Look,
`a40, a50, a60, a70`, let's pair with **r0**

```text
r0: [a00 a10 a20 a30 | a04 a14 a24 a34]
r4: [a40 a50 a60 a70 | a44 a54 a64 a74]
            |
            | (_mm256_permute2f128_ps(r0, r4, 0b00100000) / _mm256_permute2f128_ps(r0, r4, 0b00110001))
            v
r0: [a00 a10 a20 a30 | a40 a50 a60 a70] Look, the whole 256bit is now first column of `dst`
r4: [a04 a14 a24 a34 | a44 a54 a64 a74] And this is the fourth column of `dst`
```

According to whatever docs
says: [Intel doc](https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html#text=_mm256_permute2f128_ps&ig_expand=4928) -
`Shuffles 256 bits (composed of 8 packed single-precision (32-bit) floating-point elements) selected by imm8 from a and b`.
To paint the bigger & simpler picture, `_mm256_shuffle_ps()` lets you shuffle single 32bit floats **within EACH 128bit
lanes**, whereas `_mm256_permute2f128_ps()` lets you shuffle whole 128bit lanes **between two 256bit registers** BOTH
control by **IMM8**. So, we can use `_mm256_permute2f128_ps()` to combine the lower 128bit of r0 and r4 to form the
first column of `dst` and similarly for other regs. _"So what again `0b00 10 00 00` & `0b00 11 00 01` mean here?"_ - for
better understanding, let's look at this from the intel site:

```text
DEFINE SELECT4(src1, src2, control) {
	CASE(control[1:0]) OF
	0:	tmp[127:0] := src1[127:0]
	1:	tmp[127:0] := src1[255:128]
	2:	tmp[127:0] := src2[127:0]
	3:	tmp[127:0] := src2[255:128]
	ESAC
	IF control[3]
		tmp[127:0] := 0
	FI
	RETURN tmp[127:0]
}
dst[127:0] := SELECT4(a[255:0], b[255:0], imm8[3:0])
dst[255:128] := SELECT4(a[255:0], b[255:0], imm8[7:4])
dst[MAX:256] := 0
```

`SELECT4` compare last two bit of `control byte` and compare against **00,01,10,11* and selects the following lanes.
Here `src1` is `[a00 a10 a20 a30 | a04 a14 a24 a34]` and `src2` is `[a40 a50 a60 a70 | a44 a54 a64 a74]`. We want to
"cross" them, so we write `0b00 10 00 00`: for lower half of dst, it passes lower 4bit of `control byte`, so `00 00`
means take lower half of `src1`, **2nd bit is ignored** and 3rd bit is `0`, since we don't want to zeroed out that. So
similarly, for upper half of `dst`, take upper 4bit of `control byte`, so again `00 10` means take lower half of `src2`.
There you have it, the "cross" is complete (after we do similiar operation for `0b00 11 00 01`), and we can write the
`dst` memory in row-major order, which is contiguous now.

So finally AVX2 implementation would be;

```rust
unsafe fn transpose_8x8_avx2(src: *const f32, src_stride: usize, dst: *mut f32, dst_stride: usize) {
    unsafe {
        // load 8 source "rows"
        let r0 = _mm256_loadu_ps(src);
        let r1 = _mm256_loadu_ps(src.add(src_stride));
        let r2 = _mm256_loadu_ps(src.add(src_stride * 2));
        let r3 = _mm256_loadu_ps(src.add(src_stride * 3));
        let r4 = _mm256_loadu_ps(src.add(src_stride * 4));
        let r5 = _mm256_loadu_ps(src.add(src_stride * 5));
        let r6 = _mm256_loadu_ps(src.add(src_stride * 6));
        let r7 = _mm256_loadu_ps(src.add(src_stride * 7));

        // interleave adjacent pairs
        let t0 = _mm256_unpacklo_ps(r0, r1); // take first 4 elements of r0 and r1
        let t1 = _mm256_unpackhi_ps(r0, r1); // take last 4 elements of r0 and r1
        let t2 = _mm256_unpacklo_ps(r2, r3); // repeat for others...
        let t3 = _mm256_unpackhi_ps(r2, r3);
        let t4 = _mm256_unpacklo_ps(r4, r5);
        let t5 = _mm256_unpackhi_ps(r4, r5);
        let t6 = _mm256_unpacklo_ps(r6, r7);
        let t7 = _mm256_unpackhi_ps(r6, r7);

        // shuffle 64-bit pairs inside 128-bit lanes
        let u0 = _mm256_shuffle_ps(t0, t2, 0x44);
        let u1 = _mm256_shuffle_ps(t0, t2, 0xEE);
        let u2 = _mm256_shuffle_ps(t1, t3, 0x44);
        let u3 = _mm256_shuffle_ps(t1, t3, 0xEE);
        let u4 = _mm256_shuffle_ps(t4, t6, 0x44);
        let u5 = _mm256_shuffle_ps(t4, t6, 0xEE);
        let u6 = _mm256_shuffle_ps(t5, t7, 0x44);
        let u7 = _mm256_shuffle_ps(t5, t7, 0xEE);

        // "cross" & concat 128-bit lane
        let v0 = _mm256_permute2f128_ps(u0, u4, 0x20);
        let v1 = _mm256_permute2f128_ps(u1, u5, 0x20);
        let v2 = _mm256_permute2f128_ps(u2, u6, 0x20);
        let v3 = _mm256_permute2f128_ps(u3, u7, 0x20);

        let v4 = _mm256_permute2f128_ps(u0, u4, 0x31);
        let v5 = _mm256_permute2f128_ps(u1, u5, 0x31);
        let v6 = _mm256_permute2f128_ps(u2, u6, 0x31);
        let v7 = _mm256_permute2f128_ps(u3, u7, 0x31);

        // write the 8 transposed "rows"
        _mm256_storeu_ps(dst, v0);
        _mm256_storeu_ps(dst.add(dst_stride), v1);
        _mm256_storeu_ps(dst.add(dst_stride * 2), v2);
        _mm256_storeu_ps(dst.add(dst_stride * 3), v3);
        _mm256_storeu_ps(dst.add(dst_stride * 4), v4);
        _mm256_storeu_ps(dst.add(dst_stride * 5), v5);
        _mm256_storeu_ps(dst.add(dst_stride * 6), v6);
        _mm256_storeu_ps(dst.add(dst_stride * 7), v7);
    }
}
```

This can be easily plugged in `tiled_mat_transpose()` fn, pass the `ptrs`, `strides` and inside the 64x64 block, process
8x8 sub-blocks, and handle remaining with scalar code. Also, we can `loadu` and `storeu`, because on x86-64, CPU can
handle unaligned memory access, somewhat slower...but this is fine. It doesn't cause UB.

Let bench again;

```terminaloutput
Native : 704.500400ms, cycles: 1704321505
Tiled  : 195.003400ms, cycles: 471748560
AVX2   : 51.786500ms, cycles: 125278913
test scratch::mat_transpose::test_perf ... ok
```

BOOM!!!, almost **13.0x** over native and **4.0x** speedup over tiled implementation, and now...we can stop here, since
matrix transpose is `memory bound`, there is nothing to compute here (zero math), just data moving (CPU-chan remains
IDLE for data to arrive). Therefore, **multi-threading** is not going to help here on my consumer chip, my memory
dual-channel bandwidth maxed out at ~80-90GB/s _(CUDA larper can go away)_.

Checkout my project [blas-rs](https://github.com/ronakgh97/blas-rs) - **BLAS** implementation in pure modern Rust for
x86-64 CPUs

---

The image below is from *Intel Optimization Manual Vol.1*, although this is a bit out of context here, since its uses
`SSE, 128-bit register` and doing horizontal operations, but *the concept remain the same*.
![Swizlling SSE 4x4](https://pbs.twimg.com/media/HP_By1caIAAAjyP?format=png&name=900x900)