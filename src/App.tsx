import { useState, useEffect } from 'react';

// ─── TYPES ───────────────────────────────────────────────────────
type Page = 'about' | 'resume' | 'projects' | 'social' | 'blog';

interface Star {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

// ─── STAR FIELD ──────────────────────────────────────────────────
function StarField() {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 1 + Math.random() * 3,
    }))
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: '2px',
            height: '2px',
            opacity: 0.4,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── CRT OVERLAY ─────────────────────────────────────────────────
function CRTOverlay() {
  return <div className="crt-overlay" />;
}

// ─── BANNER ──────────────────────────────────────────────────────
function Banner() {
  const backgroundUrl = `${import.meta.env.BASE_URL}assets/banner.gif`;
  return (
    <div
      className="text-center py-9 pixel-border bg-retro-surface mb-1 bg-cover bg-center relative overflow-hidden bg-blend-screen"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 opacity-80 animate-pulse [animation-duration:4s]">
          <span className="text-retro-white text-2xl glow-white" style={{ fontFamily: 'var(--font-terminal)' }}>
            ══════════════════════════════════════
          </span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span
            className="text-retro-pink text-sm glow-pink tracking-widest opacity-120 animate-pulse-glow"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            ronakgh97
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 opacity-60 animate-pulse [animation-duration:2s]">
          <span className="text-retro-white text-2xl glow-white" style={{ fontFamily: 'var(--font-terminal)' }}>
            ══════════════════════════════════════
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────
function Marquee() {
  return (
    <div className="pixel-border bg-retro-surface overflow-hidden py-1 mb-2">
      <div className="animate-marquee whitespace-nowrap text-retro-green text-xs" style={{ fontFamily: 'var(--font-terminal)' }}>
        ★ Hello internet!!! ★ welcome to my site ★ rust enthusiast & propagandist  ★ systems programmer ★ building cool unless stuffs ★
      </div>
    </div>
  );
}

// ─── LEFT SIDEBAR ────────────────────────────────────────────────
function LeftSidebar({ currentPage, setPage }: { currentPage: Page; setPage: (p: Page) => void }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const menuItems: { label: string; page: Page }[] = [
    { label: 'About Me', page: 'about' },
    { label: 'Resume', page: 'resume' },
    { label: 'Projects', page: 'projects' },
    { label: 'Blog', page: 'blog' },
    { label: 'Social', page: 'social' },
  ];

  return (
    <div className="pixel-border bg-retro-surface p-3 text-sm flex flex-col gap-0">
      {/* Menu */}
      <div className="text-retro-yellow font-bold mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
        ▸ Menu
      </div>
      <div className="flex flex-col gap-1 mb-2">
        {menuItems.map((item) => (
          <button
            key={item.page}
            onClick={() => setPage(item.page)}
            className={`text-left text-sm transition-all duration-150 ${currentPage === item.page
              ? 'text-retro-cyan glow-cyan font-bold'
              : 'text-retro-link hover:text-retro-link-hover'
              }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {currentPage === item.page ? '▸ ' : '  '}{item.label}
          </button>
        ))}
      </div>

      <hr className="retro-hr" />

      {/* Status */}
      <div className="text-retro-yellow font-bold mb-1 mt-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
        ▸ Status
      </div>
      <div className="text-xs text-retro-dim mb-1">
        <span className="text-retro-green">●</span> 19yo first-year cs under grad
      </div>
      <div className="text-xs text-retro-dim mb-1">
        <span className="text-retro-green">●</span> building stuffs & exploring cpu's
      </div>

      <hr className="retro-hr" />

      {/* Clock */}
      <div className="text-retro-yellow font-bold mb-1 mt-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
        ▸ Clock
      </div>
      <div className="text-retro-green text-lg glow-green" style={{ fontFamily: 'var(--font-terminal)' }}>
        {time.toLocaleTimeString('en-US', { hour12: false })}
      </div>
      <div className="text-xs text-retro-dim">
        {time.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
      </div>

      <hr className="retro-hr" />

      {/* Blinkies */}
      <div className="mt-2 flex flex-col gap-2">
        <div className="pixel-border bg-retro-bg px-2 py-1 text-center">
          <span className="text-xs text-retro-pink" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
            GPU HATER
          </span>
        </div>
        <div className="pixel-border bg-retro-bg px-2 py-1 text-center">
          <span className="text-xs text-retro-green" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
            ANIME YAPPING  Pokemons battles
          </span>
        </div>
        <div className="pixel-border bg-retro-bg px-2 py-1 text-center">
          <span className="text-xs text-retro-purple" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
            NO AI SLOP
          </span>
        </div>
        <div className="pixel-border bg-retro-bg px-2 py-1 text-center">
          <span className="text-xs text-retro-orange" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
            GFLOPS: 99999
            CACHE: FULL
          </span>
        </div>
      </div>

      <hr className="retro-hr mt-2" />

      {/* ASCII Art */}
      <div className="mt-2 animate-pulse-glow text-retro-dim text-xs leading-tight" style={{ fontFamily: 'var(--font-terminal)' }}>
        <pre className="text-retro-cyan glow-cyan opacity-200">{`                                    
                  ▀▀                
████▄  ▀▀█▄ ████▄ ██  ▄████         
██ ██ ▄█▀██ ██ ██ ██  ██            
████▀ ▀█▄██ ██ ██ ██▄ ▀████         
██                                  
▀▀                                                     
`}
        </pre>
      </div>
    </div>
  );
}

const pixelArtCls = "w-full h-auto object-contain [image-rendering:pixelated] [image-rendering:crisp-edges]";

// ─── RIGHT SIDEBAR ───────────────────────────────────────────────
function RightSidebar() {
  return (
    <div className="pixel-border bg-retro-surface p-3 text-sm flex flex-col gap-3 w-full">
      <div className="text-retro-yellow font-bold" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
        ▸ Decorative
      </div>
      <hr className="retro-hr" />

      <div className="flex flex-col gap-3 items-center w-full">

        <div className="pixel-border bg-retro-bg -mt-2 p-1 w-full animate-float animate-pulse flex justify-center items-center overflow-hidden min-h-[64px]">
          <img
            src={`${import.meta.env.BASE_URL}assets/1.gif`}
            alt="Gifs Slot"
            className={pixelArtCls}
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>

        <div className="pixel-border bg-retro-bg p-1 w-full text-center animate-pulse-glow flex justify-center items-center">
          <pre className="text-retro-red glow-red opacity-200 text-xs leading-tight whitespace-pre inline-block -mt-3 mx-auto font-mono" style={{ fontFamily: 'var(--font-terminal)' }}>{`
⠀⠀⢀⣤⣤⣤⣤⣤⣤⣀⡀⠀⠀⢀⣤⡴⠂⠀⣠⣤⣤⣤⣤⡤⠀⠀⠀⠀
⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⢀⣴⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀
⡼⠋⠉⠉⠉⠉⠙⠛⠛⠋⣩⣿⡟⠁⢀⣾⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⠏⠁⠀⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⠀⠀⢸⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠸⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⡀⠀⠘⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣀⣤⣶⣶⣶⣿⣿⣿⣿⡇⠀⢸⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠘⠉⠉⠉⠙⢿⣿⣿⣿⣿⡇⠀⢸⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠠⠖⠶⢶⣶⣾⣿⣿⣿⠁⠀⢸⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⡏⠀⢀⣾⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡿⠁⢀⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⣿⡟⢁⣴⣟⣡⣤⣤⣶⣶⣶⣶⣶⣦⣤⣀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣾⣿⣟⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣴⠞
⠀⠀⠀⠀⣀⣿⡿⠿⠛⠛⠋⠉⠉⠉⠉⠉⠉⠛⠛⣿⣿⣿⣿⣿⣿⠟⠁⠀
⠀⠀⠀⠚⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⠟⠁⠀⠀⠀
`}
          </pre>
        </div>

        <div className="pixel-border bg-retro-bg p-1 w-full flex justify-center items-center overflow-hidden min-h-[64px]">
          <img
            src={`${import.meta.env.BASE_URL}assets/2.gif`}
            alt="Gifs Slot"
            className={pixelArtCls}
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>

        <div className="pixel-border bg-retro-bg p-1 w-full relative min-h-[64px] flex items-center justify-center overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}assets/3.gif`}
            alt="Gifs Slot"
            className="absolute inset-0 w-full h-full object-cover animate-pulse-glow opacity-120 [image-rendering:pixelated]"
          />
          <div className="relative z-10 text-retro-cyan text-xs font-mono" style={{ fontFamily: 'var(--font-terminal)' }}>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── ABOUT PAGE ──────────────────────────────────────────────────
function AboutPage() {
  return (
    <div>
      <div className="text-retro-yellow font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px' }}>
        ▸ About Me
      </div>
      <hr className="retro-hr" />

      <div className="my-4 space-y-3 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
        <p>
          hey. i'm <span className="text-retro-cyan glow-cyan font-bold">ronak ghosh</span> — systems programmer,
          rust 'propagandist', and builder of things that should probably have been left unbuilt.
        </p>
        <p>
          i spend most of my time writing <span className="text-retro-orange">rust</span>. like, a lot of rust.
          databases, runtime, maths & utils libraries, networking stacks, game development — you name it,
          i've probably tried to rewrite it in rust.
        </p>
        <p>
          my main jam is building hack/dev/utility tools & HPC kernels libs — things like{' '}
          <span className="text-retro-pink">small micro-systems/utilities</span>,{' '}
          <span className="text-retro-green">graph, lsm databases</span>,{' '}
          <span className="text-retro-purple">BLAS re-implementations</span>, and{' '}
          <span className="text-retro-orange">network/ml compute/search libs.</span> {' '}
          i like understanding how cpus & softwares work together at a basic level.
        </p>
        <p>
          current projects i'm tinkering with:
        </p>
        <ul className="list-none space-y-1 ml-4">
          <li><span className="text-retro-cyan">▸</span> <span className="text-retro-yellow">rdrive</span> — distributed zero-trust object storage/streaming node</li>
          <li><span className="text-retro-cyan">▸</span> <span className="text-retro-yellow">blaze-db/hnsw-rs</span> — rust-native vector database using HNSW indexing</li>
          <li><span className="text-retro-cyan">▸</span> <span className="text-retro-yellow">blas-rs</span> — openblas implementation in rust</li>
          <li><span className="text-retro-cyan">▸</span> <span className="text-retro-yellow">ghost-sync</span> — async networking lib for game dev/general utility</li>
        </ul>
        <p>
          i use `omarchy` btw (DHH), cuz i ain't got no time to rice. my editor is neovim/rustrover, my shell is ghostty.
          i also play <span className="text-retro-cyan glow-cyan">Battlefield 2042</span> alone and <span className="text-retro-pink">Pokemon Showdown</span>
        </p>
        <p>
          when i'm not fighting the sleep cortisol DEMON at 3am, i'm probably reading about cpus x86, distributed/backend systems
          or performance engineering. i'm also working on some ridiculous side project, or learning about yet another topic/domain that i'll implement
          from scratch for "educational purposes."
        </p>
        <p className="text-retro-dim">
          long-term goal: build useful libs & systems/utilities that matter.
          short-term goal: get `blas-rs` to widely used and build ml libraries with it.
          shorter-term goal: maintain sleep schedule like normal human.
        </p>
      </div>

      <hr className="retro-hr" />

      {/* Quick links */}
      <div className="mt-3 space-y-1">
        <div className="text-retro-yellow font-bold mb-1" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
          ▸ Quick Links
        </div>
        <div className="text-sm space-y-1">
          <a href="https://github.com/ronakgh97" target="_blank" rel="noopener noreferrer" className="retro-link block">
            {'>'} github.com/ronakgh97
          </a>
          <a href="https://github.com/ronakgh97/blas-rs" target="_blank" rel="noopener noreferrer" className="retro-link block">
            {'>'} blas-rs on github
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── RESUME PAGE ─────────────────────────────────────────────────
function ResumePage() {
  return (
    <div>
      <div className="text-retro-yellow font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px' }}>
        ▸ Resume
      </div>
      <hr className="retro-hr" />

      <div
        className="text-retro-cyan glow-cyan mb-3"
        style={{ fontFamily: 'var(--font-terminal)' }}
      >
        <a
          href="resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-retro-yellow"
        >
          {'>'} cat resume.pdf
        </a>
      </div>

      <div className="my-4 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
        <p className="text-retro-bright">
          systems programmer focused on <span className="text-retro-orange">RUST</span>,{' '}
          <span className="text-retro-green">x86 architecture</span>,{' '}
          <span className="text-retro-red">reliable systems architect</span>,{' '}
          <span className="text-retro-purple">maths/network/mem kernels libs</span>, and{' '}
          <span className="text-retro-pink">hack/dev/game tooling</span>.
        </p>
      </div>

      <div className="mt-4">
        <div className="text-retro-cyan font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
          ═══ Skills ═══
        </div>
        <div className="text-sm space-y-1" style={{ fontFamily: 'var(--font-mono)' }}>
          <div><span className="text-retro-yellow">Languages:</span> Rust, C, Java, Python, Perl</div>
          <div><span className="text-retro-yellow">Domains & Interest:</span> Linux, Low-latency Systems, Database internals, Networking, x86 cpu architecture</div>
          <div><span className="text-retro-yellow">Tools:</span> Git, Tokio, Clap, Docker, Linux, Criterion, Vtune profiler, WireShark, Unreal Engine</div>
        </div>
      </div>

      <hr className="retro-hr my-4" />

      <div>
        <div className="text-retro-cyan font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
          ═══ Notable Projects ═══
        </div>
        <div className="text-sm space-y-3" style={{ fontFamily: 'var(--font-mono)' }}>
          <div>
            <span className="text-retro-green font-bold">blaze-db</span> — <span className="text-retro-dim">Rust</span>
            <div className="text-retro-text ml-4 mt-1">
              A rust-native, standalone and self-managed vector database using HNSW data structure
              for fast queries and search.
            </div>
          </div>
          <div>
            <span className="text-retro-green font-bold">rdrive</span> — <span className="text-retro-dim">Rust</span>
            <div className="text-retro-text ml-4 mt-1">
              Distributed, secure zero-trust object storage node. Uses SSH-like handshake protocol,
              CAS/Layering like docker image hub, mempool backed TLS with versioning & backups support.
            </div>
          </div>
          <div>
            <span className="text-retro-green font-bold">blas-rs</span> — <span className="text-retro-dim">Rust</span>
            <div className="text-retro-text ml-4 mt-1">
              OpenBLAS implementation in Rust for x86 architecture. Linear algebra primitives from scratch.
            </div>
          </div>
          <div>
            <span className="text-retro-green font-bold">missile-sim</span> — <span className="text-retro-dim">Rust</span>
            <div className="text-retro-text ml-4 mt-1">
              Missile guidance simulation/sandbox library that help simulate/visualizes various scenarios,
              applies proportional navigation laws using forward kinematics and guidance laws like PPN/TPN/AGN.
            </div>
          </div>
        </div>
      </div>

      <hr className="retro-hr my-4" />

      <div>
        <div className="text-retro-cyan font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
          ═══ What I Work With/On ═══
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            'Graphs Computation', 'BSTree', 'BLAS', 'Profiling',
            'Runtime', 'Docker', 'x86',
            'Reliable Systems', 'LSM DBs', 'Utilities Tooling',
            'Network Protocols', 'Low-level libs', 'Unreal Engine'
          ].map((skill) => (
            <span
              key={skill}
              className="pixel-border bg-retro-bg px-2 py-1 text-xs text-retro-cyan"
              style={{ fontFamily: 'var(--font-terminal)' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS PAGE ───────────────────────────────────────────────
function ProjectsPage() {
  const projects = [
    {
      name: 'blaze-db',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'A rust native, standalone and self-managed vector database uses HNSW data structure for fast queries and search.',
      stars: 10,
      forks: 1,
      url: 'https://github.com/ronakgh97/blaze-db',
      tags: ['database', 'graphs', 'hnsw', 'vector-search', 'rust', 'ann', 'quantization'],
    },
    {
      name: 'rdrive',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'Distributed, secure zero-trust object storage node. Uses SSH like handshake protocol, CAS/Layering like docker image hub and Mem pooling with versioning & backups support.',
      stars: 1,
      forks: 0,
      url: 'https://github.com/ronakgh97/rdrive',
      tags: ['distributed', 'object-storage', 'zero-trust', 'TLS', 'delta-transfer'],
    },
    {
      name: 'blas-rs',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'OpenBLAS implementation in Rust (x86 arch only). Linear algebra primitives written from scratch.',
      stars: 1,
      forks: 0,
      url: 'https://github.com/ronakgh97/blas-rs',
      tags: ['blas', 'linear-algebra', 'x86', 'high-performance-computing'],
    },
    {
      name: 'hnsw-rs',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'Experimental HNSW Implementation. Exploring hierarchical navigable small world graphs for approximate nearest neighbor search.',
      stars: 1,
      forks: 0,
      url: 'https://github.com/ronakgh97/hnsw-rs',
      tags: ['hnsw', 'ann', 'graph', 'search', 'algorithms'],
    },
    {
      name: 'ghost-sync',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'A simple composable async networking library designed for game development.',
      stars: 3,
      forks: 0,
      url: 'https://github.com/ronakgh97/ghost-sync',
      tags: ['networking', 'async', 'game-dev'],
    },
    {
      name: 'missile-sim',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'A missile guidance simulation/sandbox library that help simulate/visualizes various scenarios, applies proportional navigation laws using forward kinematics.',
      stars: 5,
      forks: 0,
      url: 'https://github.com/ronakgh97/missile-sim',
      tags: ['simulation', 'physics', 'kinematics', 'visualization', 'computational'],
    },
  ];

  return (
    <div>
      <div className="text-retro-yellow font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px' }}>
        ▸ Projects
      </div>
      <hr className="retro-hr" />

      <div className="text-sm text-retro-dim mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
        a collection of things i've built (mostly in rust, obviously)
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.name} className="pixel-border bg-retro-bg p-3 hover:border-retro-cyan transition-colors duration-200">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-retro-text text-sm">📁</span>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-link font-bold"
                style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px' }}
              >
                {project.name}
              </a>
              <span className={`text-xs ${project.langColor}`} style={{ fontFamily: 'var(--font-mono)' }}>
                ● {project.lang}
              </span>
            </div>
            <p className="text-retro-text text-sm mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-retro-surface border border-retro-border px-2 py-0.5 text-xs text-retro-dim"
                    style={{ fontFamily: 'var(--font-terminal)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 text-xs text-retro-dim" style={{ fontFamily: 'var(--font-mono)' }}>
                <span>⭐ {project.stars}</span>
                <span>🔱 {project.forks}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SOCIAL PAGE ─────────────────────────────────────────────────
function SocialPage() {
  return (
    <div>
      <div className="text-retro-yellow font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px' }}>
        ▸ Socials
      </div>
      <hr className="retro-hr" />

      <div className="my-4 space-y-4">
        <a
          href="https://github.com/ronakgh97"
          target="_blank"
          rel="noopener noreferrer"
          className="block pixel-border bg-retro-bg p-4 hover:border-retro-cyan transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💻</span>
            <div>
              <div className="text-retro-cyan font-bold text-lg group-hover:glow-cyan transition-all" style={{ fontFamily: 'var(--font-terminal)' }}>
                GitHub
              </div>
              <div className="text-retro-dim text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                @ronakgh97 — where all the code barely lives
              </div>
            </div>
          </div>
        </a>

        <div className="pixel-border bg-retro-bg p-4 opacity-60">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐦</span>
            <div>
              <div className="text-retro-dim font-bold text-lg" style={{ fontFamily: 'var(--font-terminal)' }}>
                Twitter/X
              </div>
              <div className="text-retro-dim text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                coming soon... maybe
              </div>
            </div>
          </div>
        </div>

        <div className="pixel-border bg-retro-bg p-4 opacity-60">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💼</span>
            <div>
              <div className="text-retro-dim font-bold text-lg" style={{ fontFamily: 'var(--font-terminal)' }}>
                LinkedIn
              </div>
              <div className="text-retro-dim text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                coming soon... maybe
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="retro-hr" />

      <div className="mt-4">
        <div className="text-retro-cyan font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
          ═══ GitHub Activity ═══
        </div>
        <div className="pixel-border bg-retro-bg p-3">
          <div className="text-sm space-y-1" style={{ fontFamily: 'var(--font-mono)' }}>
            <div className="text-retro-green">▸ 6 pinned repositories</div>
            <div className="text-retro-cyan">▸ primary language: Rust, x86</div>
            <div className="text-retro-yellow">▸ focus: systems/perf programming</div>
            <div className="text-retro-purple">▸ 1500+ total commits</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BLOG PAGE ───────────────────────────────────────────────────
function BlogPage() {
  return (
    <div>
      <div className="text-retro-yellow font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px' }}>
        ▸ Blog
      </div>
      <hr className="retro-hr" />

      <div className="my-8 text-center">
        <div className="text-retro-dim text-4xl mb-4"></div>
        <div className="text-retro-text text-lg" style={{ fontFamily: 'var(--font-terminal)' }}>
          no posts yet...
        </div>
        <div className="text-retro-dim text-sm mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
          check back later — i'll write something eventually
        </div>
      </div>

      <hr className="retro-hr" />

      <div className="mt-4">
        <div className="text-retro-cyan font-bold text-sm mb-3" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
          ═══ Planned Topics ═══
        </div>
        <div className="text-sm space-y-1 text-retro-dim" style={{ fontFamily: 'var(--font-mono)' }}>
          <div>▸ implementing simplified HNSW from paper</div>
          <div>▸ BLAS kernels: a practical guide for x86 rust</div>
          <div>▸ zero-trust distributed storage protocol design & TLS</div>
          <div>▸ async networking for RTS heavy game</div>
          <div>▸ missile guidance (PPN, TPN, APN) maths explained</div>
          <div>▸ how lsm trees can be read optimized</div>
          <div>▸ implementing a 'safe' stack memory allocator in strict rust type systems</div>
          <div>▸ and more...</div>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────
function Footer() {
  return (
    <div className="mt-2 pixel-border bg-retro-surface p-2 text-center">
      <div className="text-retro-dim text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
        <span className="text-retro-cyan">---</span> made with wasm by{' '}
        <a href="https://github.com/ronakgh97" target="_blank" rel="noopener noreferrer" className="retro-link">
          ronak ghosh
        </a>{' '}
        <span className="text-retro-cyan">---</span>
      </div>
      <div className="text-retro-dim text-xs mt-1" style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px' }}>
        built with tramua && positive cursed energy
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('about');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'resume':
        return <ResumePage />;
      case 'projects':
        return <ProjectsPage />;
      case 'social':
        return <SocialPage />;
      case 'blog':
        return <BlogPage />;
      default:
        return <AboutPage />;
    }
  };

  return (
    <div className="min-h-screen bg-retro-bg relative">
      <StarField />
      <CRTOverlay />

      <div className="relative z-10 max-w-6xl mx-auto p-2 sm:p-4">
        <Banner />
        <Marquee />

        {/* Three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_180px] gap-2 mt-1 items-start">
          {/* Left sidebar */}
          <div className="order-2 md:order-1">
            <LeftSidebar currentPage={currentPage} setPage={setCurrentPage} />
          </div>

          {/* Main content */}
          <div className="order-1 md:order-2">
            <div className="pixel-border bg-retro-surface p-4 min-h-[500px]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-retro-border">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
                <span className="text-retro-dim text-xs ml-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  ronak@portfolio:~/{currentPage}
                </span>
                <span className="text-retro-green cursor-blink">█</span>
              </div>

              {renderPage()}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="order-3">
            <RightSidebar />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
