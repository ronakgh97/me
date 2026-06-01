import { useState, useEffect, useCallback } from 'react';

// ─── TYPES ───────────────────────────────────────────────────────
type Page = 'about' | 'resume' | 'projects' | 'social' | 'blog' | 'guestbook';

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
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
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
            opacity: 0.3,
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
  return (
    <div className="text-center py-3 pixel-border bg-retro-surface mb-1">
      <div className="flex items-center justify-center gap-3">
        <span className="text-retro-cyan text-2xl glow-cyan" style={{ fontFamily: 'var(--font-terminal)' }}>
          ╔══════════════════════════════════════╗
        </span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <span className="text-retro-cyan text-2xl glow-cyan" style={{ fontFamily: 'var(--font-terminal)' }}>
        </span>
        <span
          className="text-retro-pink text-sm glow-pink tracking-widest"
          style={{ fontFamily: 'var(--font-pixel)' }}
        >
          ronak ghosh97
        </span>
        <span className="text-retro-cyan text-2xl glow-cyan" style={{ fontFamily: 'var(--font-terminal)' }}>
        </span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <span className="text-retro-cyan text-2xl glow-cyan" style={{ fontFamily: 'var(--font-terminal)' }}>
          ╚══════════════════════════════════════╝
        </span>
      </div>
    </div>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────
function Marquee() {
  return (
    <div className="pixel-border bg-retro-surface overflow-hidden py-1 mb-1">
      <div className="animate-marquee whitespace-nowrap text-retro-green text-xs" style={{ fontFamily: 'var(--font-terminal)' }}>
        ★ Hello internet! ★ welcome to my corner of the internet ★ rust enthusiast & propagandist  ★ systems programmer ★ building cool stuffs ★
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
    { label: 'GuestBook', page: 'guestbook' },
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
        <span className="text-retro-green">●</span> site is up
        <br />
        since Apr 2025
        <br />
        <span className="text-retro-green">●</span> building stuffs
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
            ANIME YAPPING & Pokemons battles
          </span>
        </div>
        <div className="pixel-border bg-retro-bg px-2 py-1 text-center">
          <span className="text-xs text-retro-purple" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
            SAFETY OFF
          </span>
        </div>
        <div className="pixel-border bg-retro-bg px-2 py-1 text-center">
          <span className="text-xs text-retro-orange" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
            GFLOPS: 999
          </span>
        </div>
      </div>

      <hr className="retro-hr mt-2" />

      {/* ASCII Art */}
      <div className="mt-2 text-retro-dim text-xs leading-tight" style={{ fontFamily: 'var(--font-terminal)' }}>
        <pre className="text-retro-cyan opacity-60">{`
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

// ─── RIGHT SIDEBAR ───────────────────────────────────────────────
function RightSidebar() {
  return (
    <div className="pixel-border bg-retro-surface p-3 text-sm flex flex-col gap-3">
      <div className="text-retro-yellow font-bold" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
        ▸ Stuff
      </div>
      <hr className="retro-hr" />

      {/* Decorative pixel art boxes */}
      <div className="flex flex-col gap-3 items-center">
        {/* Animated terminal */}
        <div className="pixel-border bg-retro-bg p-2 w-full animate-float">
          <div className="text-retro-green text-xs" style={{ fontFamily: 'var(--font-terminal)' }}>
            <div>$ cargo build --release</div>
            <div className="text-retro-dim">Compiling crate...</div>
            <div className="text-retro-green">Finished in 2 yrs</div>
          </div>
        </div>

        {/* Ferris ASCII */}
        <div className="pixel-border bg-retro-bg p-2 w-full text-center animate-pulse-glow">
          <pre className="text-retro-orange text-xs leading-tight" style={{ fontFamily: 'var(--font-terminal)' }}>
            {`
⠀⠀⠀⠀⠀⠀⣀⣤⡤
⠀⠀⠀⠀⢀⣾⣿⠋⠀
⠀⠀⠀⣠⣾⣿⡟⠀⠀
⠀⠀⢸⠛⠉⢹⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠄⠠⣀
⠀⠀⡘⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠖⠉⠀⠀⠀⣾⣿⣦⡀
⠀⠀⡇⠀⠀⠀⢡⠄⠀⠀⣀⣀⣀⣠⠊⠀⠀⠀⠀⡠⠞⠛⠛⠛⠛
⠀⠀⢃⠀⠀⠀⠀⠗⠚⠉⠉⠀⠈⠁⠀⠀⠀⢀⡔⠁
⠀⠀⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣶⣄⠲⡎⠀
⠀⠀⠀⠃⠀⠀⢠⣤⡀⠀⠀⠀⠀⣿⣿⣿⠀⠘⡄
⠀⠀⠀⡆⠀⠀⣿⣿⡇⠀⠀⠀⠀⠈⠛⠉⣴⣆⢹⡄
⠀⠀⠀⣇⢰⡧⣉⡉⠀⠀⢀⡀⠀⣀⣀⣠⣿⡷⢠⡇
⠀⠀⠀⢻⠘⠃⠈⠻⢦⠞⠋⠙⠺⠋⠉⠉⠉⢡⠟
⠀⠀⠀⠀⠳⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠋⠀
`}
          </pre>
          <div className="text-retro-dim text-xs mt-1">Mimikyu says hi</div>
        </div>

        {/* Code snippet */}
        <div className="pixel-border bg-retro-bg p-2 w-full">
          <div className="text-xs" style={{ fontFamily: 'var(--font-terminal)' }}>
            <span className="text-retro-purple">fn</span>{' '}
            <span className="text-retro-yellow">main</span>
            <span className="text-retro-text">{'() {'}</span>
            <br />
            <span className="text-retro-text">{'  '}</span>
            <span className="text-retro-purple">println!</span>
            <span className="text-retro-text">(</span>
            <span className="text-retro-green">{'"hello!!!"'}</span>
            <span className="text-retro-text">);</span>
            <br />
            <span className="text-retro-text">{'}'}</span>
          </div>
        </div>

        {/* Stats counter */}
        <div className="pixel-border bg-retro-bg p-2 w-full text-center">
          <div className="text-retro-dim text-xs mb-1">visitors</div>
          <div className="flex justify-center gap-1">
            {['0', '1', '1', '0', '1'].map((digit, i) => (
              <span
                key={i}
                className="bg-retro-bg border border-retro-border text-retro-green px-1 text-sm"
                style={{ fontFamily: 'var(--font-terminal)' }}
              >
                {digit}
              </span>
            ))}
          </div>
        </div>

        {/* Webring style */}
        <div className="pixel-border bg-retro-bg p-2 w-full text-center">
          <div className="text-retro-dim text-xs mb-1">webring</div>
          <div className="flex justify-between text-xs">
            <span className="retro-link cursor-pointer">← prev</span>
            <span className="retro-link cursor-pointer">next →</span>
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
          rust enthusiast, and builder of things that should probably have been left unbuilt.
        </p>

        <p>
          i spend most of my time writing <span className="text-retro-orange">rust</span>. like, a lot of rust.
          vector databases, linear algebra libraries, networking stacks, missile simulations — you name it,
          i've probably tried to rewrite it in rust.
        </p>

        <p>
          my main jam is building infrastructure-level tools — things like{' '}
          <span className="text-retro-pink">distributed storage systems</span>,{' '}
          <span className="text-retro-green">vector databases</span>, and{' '}
          <span className="text-retro-purple">BLAS implementations</span>.
          i like understanding how things work at a fundamental level.
        </p>

        <p>
          current projects i'm tinkering with:
        </p>
        <ul className="list-none space-y-1 ml-4">
          <li><span className="text-retro-cyan">▸</span> <span className="text-retro-yellow">blaze-db</span> — a rust-native vector database using HNSW</li>
          <li><span className="text-retro-cyan">▸</span> <span className="text-retro-yellow">rdrive</span> — distributed zero-trust object storage</li>
          <li><span className="text-retro-cyan">▸</span> <span className="text-retro-yellow">blas-rs</span> — openblas implementation in rust</li>
          <li><span className="text-retro-cyan">▸</span> <span className="text-retro-yellow">ghost-sync</span> — async networking lib for game dev</li>
          <li><span className="text-retro-cyan">▸</span> <span className="text-retro-yellow">missile-sim</span> — missile guidance simulation sandbox</li>
        </ul>

        <p>
          i use arch btw. and i don't plan on stopping. my editor is neovim, my shell is fish,
          and my window manager is hyprland. yes, i spent 3 days configuring it. no, i'm not sorry.
        </p>

        <p>
          when i'm not fighting the borrow checker at 3am, i'm probably reading about distributed systems,
          working on some ridiculous side project, or learning about yet another algorithm that i'll implement
          from scratch for "educational purposes."
        </p>

        <p className="text-retro-dim">
          long-term goal: build libs & systems that matter. short-term goal: get `blas-rs` to widely used library.
          shorter-term goal: fix that one bug that's been haunting me for a week.
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

      <div className="my-4 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
        <p className="text-retro-bright">
          systems programmer focused on <span className="text-retro-orange">rust</span>,{' '}
          <span className="text-retro-green">distributed systems</span>,{' '}
          <span className="text-retro-purple">linear algebra</span>, and{' '}
          <span className="text-retro-pink">infrastructure tooling</span>.
        </p>
      </div>

      <div className="mt-4">
        <div className="text-retro-cyan font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
          ═══ Skills ═══
        </div>
        <div className="text-sm space-y-1" style={{ fontFamily: 'var(--font-mono)' }}>
          <div><span className="text-retro-yellow">Languages:</span> Rust, C, C++, Python, JavaScript/TypeScript</div>
          <div><span className="text-retro-yellow">Systems:</span> Linux, Distributed Systems, Networking, Storage</div>
          <div><span className="text-retro-yellow">Algorithms:</span> HNSW, BLAS, Vector Search, Graph Algorithms</div>
          <div><span className="text-retro-yellow">Tools:</span> Git, Cargo, Neovim, Docker, Linux</div>
          <div><span className="text-retro-yellow">Domains:</span> Vector DBs, Object Storage, Game Networking, Simulation</div>
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
              for fast queries and search. ⭐ 10 stars on GitHub.
            </div>
          </div>
          <div>
            <span className="text-retro-green font-bold">rdrive</span> — <span className="text-retro-dim">Rust</span>
            <div className="text-retro-text ml-4 mt-1">
              Distributed, secure zero-trust object storage node. Uses SSH-like handshake protocol,
              CAS/Layering like docker image hub, mem_pooling with versioning & backups support.
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
              Missile guidance simulation/sandbox that visualizes various scenarios,
              applies proportional navigation laws using forward kinematics.
            </div>
          </div>
        </div>
      </div>

      <hr className="retro-hr my-4" />

      <div>
        <div className="text-retro-cyan font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
          ═══ What I Work With ═══
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            'Rust', 'C', 'C++', 'Python', 'TypeScript',
            'HNSW', 'BLAS', 'CUDA concepts',
            'Linux', 'Neovim', 'Docker', 'Git',
            'Distributed Systems', 'Vector DBs',
            'Networking', 'Simulation',
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
      tags: ['database', 'hnsw', 'vector-search', 'rust'],
    },
    {
      name: 'rdrive',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'Distributed, secure zero-trust object storage node. Uses SSH like handshake protocol, CAS/Layering like docker image hub and mem_pooling with versioning & backups support.',
      stars: 1,
      forks: 0,
      url: 'https://github.com/ronakgh97/rdrive',
      tags: ['distributed', 'storage', 'zero-trust', 'cas'],
    },
    {
      name: 'blas-rs',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'OpenBLAS implementation in Rust (x86 arch only). Linear algebra primitives written from scratch.',
      stars: 1,
      forks: 0,
      url: 'https://github.com/ronakgh97/blas-rs',
      tags: ['blas', 'linear-algebra', 'x86', 'scientific-computing'],
    },
    {
      name: 'hnsw-rs',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'Experimental HNSW Implementation. Exploring hierarchical navigable small world graphs for approximate nearest neighbor search.',
      stars: 1,
      forks: 0,
      url: 'https://github.com/ronakgh97/hnsw-rs',
      tags: ['hnsw', 'ann', 'graph', 'search'],
    },
    {
      name: 'ghost-sync',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'A simple composable async networking library designed for game development.',
      stars: 3,
      forks: 0,
      url: 'https://github.com/ronakgh97/ghost-sync',
      tags: ['networking', 'async', 'game-dev', 'multiplayer'],
    },
    {
      name: 'missile-sim',
      lang: 'Rust',
      langColor: 'text-retro-orange',
      description: 'A missile guidance simulation/sandbox that visualizes various scenarios, applies proportional navigation laws using forward kinematics.',
      stars: 5,
      forks: 0,
      url: 'https://github.com/ronakgh97/missile-sim',
      tags: ['simulation', 'physics', 'kinematics', 'visualization'],
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
            <span className="text-2xl">🐙</span>
            <div>
              <div className="text-retro-cyan font-bold text-lg group-hover:glow-cyan transition-all" style={{ fontFamily: 'var(--font-terminal)' }}>
                GitHub
              </div>
              <div className="text-retro-dim text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                @ronakgh97 — where all the code lives
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
            <div className="text-retro-cyan">▸ primary language: Rust</div>
            <div className="text-retro-yellow">▸ focus: systems programming</div>
            <div className="text-retro-purple">▸ 21+ total stars</div>
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
        <div className="text-retro-dim text-4xl mb-4">📝</div>
        <div className="text-retro-text text-lg" style={{ fontFamily: 'var(--font-terminal)' }}>
          no posts yet...
        </div>
        <div className="text-retro-dim text-sm mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
          check back later — i'll write something eventually
        </div>
        <div className="text-retro-dim text-xs mt-4" style={{ fontFamily: 'var(--font-terminal)' }}>
          in the meantime, check out my{' '}
          <span className="text-retro-cyan cursor-pointer">projects</span>
        </div>
      </div>

      <hr className="retro-hr" />

      <div className="mt-4">
        <div className="text-retro-cyan font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
          ═══ Planned Topics ═══
        </div>
        <div className="text-sm space-y-1 text-retro-dim" style={{ fontFamily: 'var(--font-mono)' }}>
          <div>▸ implementing HNSW from scratch</div>
          <div>▸ building a vector database in rust</div>
          <div>▸ BLAS operations: a practical guide</div>
          <div>▸ zero-trust distributed storage design</div>
          <div>▸ async networking for game dev</div>
          <div>▸ missile guidance algorithms explained</div>
        </div>
      </div>
    </div>
  );
}

// ─── GUESTBOOK PAGE ──────────────────────────────────────────────
function GuestBookPage() {
  const [entries, setEntries] = useState<{ name: string; message: string; date: string }[]>([
    { name: 'anonymous', message: 'cool portfolio! love the retro vibes 🎮', date: '2025-06-01' },
    { name: 'rust_fan', message: 'blaze-db is awesome, keep it up! 🦀', date: '2025-05-28' },
    { name: 'sysadmin42', message: 'fellow systems programmer, respect! 🖥️', date: '2025-05-15' },
  ]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(() => {
    if (!name.trim() || !message.trim()) return;
    const today = new Date().toISOString().split('T')[0];
    setEntries((prev) => [{ name: name.trim(), message: message.trim(), date: today }, ...prev]);
    setName('');
    setMessage('');
  }, [name, message]);

  return (
    <div>
      <div className="text-retro-yellow font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px' }}>
        ▸ GuestBook
      </div>
      <hr className="retro-hr" />

      <div className="text-sm text-retro-dim my-2" style={{ fontFamily: 'var(--font-mono)' }}>
        leave a message! say hi, leave feedback, or just vibe.
      </div>

      {/* Form */}
      <div className="pixel-border bg-retro-bg p-3 mb-4">
        <div className="space-y-2">
          <div>
            <label className="text-retro-cyan text-xs block mb-1" style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}>
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-retro-surface border border-retro-border text-retro-text px-2 py-1 text-sm outline-none focus:border-retro-cyan transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
              placeholder="your name..."
            />
          </div>
          <div>
            <label className="text-retro-cyan text-xs block mb-1" style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}>
              Message:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-retro-surface border border-retro-border text-retro-text px-2 py-1 text-sm outline-none focus:border-retro-cyan transition-colors resize-none"
              style={{ fontFamily: 'var(--font-mono)' }}
              placeholder="leave a message..."
              rows={3}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="retro-btn text-xs"
          >
            {'>'} submit
          </button>
        </div>
      </div>

      <hr className="retro-hr" />

      {/* Entries */}
      <div className="mt-3 space-y-2">
        <div className="text-retro-cyan font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
          ═══ Entries ({entries.length}) ═══
        </div>
        {entries.map((entry, i) => (
          <div key={i} className="pixel-border bg-retro-bg p-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-retro-pink font-bold text-sm" style={{ fontFamily: 'var(--font-terminal)' }}>
                @{entry.name}
              </span>
              <span className="text-retro-dim text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                {entry.date}
              </span>
            </div>
            <div className="text-retro-text text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
              {entry.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────
function Footer() {
  return (
    <div className="mt-2 pixel-border bg-retro-surface p-2 text-center">
      <div className="text-retro-dim text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
        <span className="text-retro-cyan">---</span> made with 💦 and ☕ by{' '}
        <a href="https://github.com/ronakgh97" target="_blank" rel="noopener noreferrer" className="retro-link">
          ronak ghosh
        </a>{' '}
        <span className="text-retro-cyan">---</span>
      </div>
      <div className="text-retro-dim text-xs mt-1" style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px' }}>
        built with tramua && cursed energy
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
      case 'guestbook':
        return <GuestBookPage />;
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
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_180px] gap-2 mt-1">
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
