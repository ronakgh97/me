+++
title = "Optimizing NRM2 & I_AMAX kernel for x86-64 in Rust"
description = "A practical walkthrough of implementing the NRM2 and I_AMAX kernels in Rust, with x86-64 optimizations."
date = 2026-07-11
template = "article.html"

[taxonomies]
tags = ["hpc", "maths", "x86-64", "simd"]

[extra]
go_to_top = true
+++

The [nrm2](https://www.intel.com/content/www/us/en/docs/onemkl/developer-reference-dpcpp/2026-0/nrm2.html)
and [i_amax](https://www.intel.com/content/www/us/en/docs/onemkl/developer-reference-dpcpp/2026-0/iamax.html) kernels
compute the *Euclidean distance* between vectors and finds *the index of the maximum absolute value*, respectively. The
SIMD implementation is straight-forward, but with few caveats to consider, for `nrm2`, we need to handle overflow and
for `i_amax`, vectorizing the stupid scalar loop is... _fragile?_, given with few notable edge cases.