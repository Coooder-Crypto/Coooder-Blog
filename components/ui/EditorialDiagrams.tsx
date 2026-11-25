'use client';

interface DiagramProps {
  className?: string;
}

/**
 * FIG. 01 — Agent Harness 3-Layer Loop (Context / Execution / Verification)
 * Uses pure theme CSS tokens so it blends seamlessly in both Light and Dark modes.
 */
export function HeroHarnessSvg({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 720 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`editorial-svg ${className}`}
      role="img"
      aria-label="Animated architectural diagram of a three-layer Agent Harness loop: Context, Execution, and Verification"
    >
      <defs>
        <pattern id="hero-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M 36 0 L 0 0 0 36" stroke="var(--line)" strokeWidth="0.75" opacity="0.7" />
        </pattern>
        <radialGradient id="hero-glow-accent" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-glow-blue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Architectural coordinate grid */}
      <rect width="720" height="440" fill="url(#hero-grid)" />
      <circle cx="360" cy="220" r="190" fill="url(#hero-glow-accent)" />
      <circle cx="515" cy="145" r="120" fill="url(#hero-glow-blue)" />

      {/* Outer registration marks */}
      <g stroke="var(--line-strong)" strokeWidth="1">
        <path d="M 28 40 L 28 28 L 40 28" />
        <path d="M 680 28 L 692 28 L 692 40" />
        <path d="M 28 400 L 28 412 L 40 412" />
        <path d="M 680 412 L 692 412 L 692 400" />
        <line x1="360" y1="24" x2="360" y2="416" strokeDasharray="2 6" opacity="0.55" />
        <line x1="44" y1="220" x2="676" y2="220" strokeDasharray="2 6" opacity="0.55" />
      </g>

      {/* Rotating outer calibration rings */}
      <g className="svg-spin-slow" style={{ transformOrigin: '360px 220px' }}>
        <circle
          cx="360"
          cy="220"
          r="164"
          stroke="var(--line-strong)"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.85"
        />
        <circle cx="360" cy="56" r="3" fill="var(--accent-blue)" />
        <circle cx="360" cy="384" r="3" fill="var(--muted)" />
      </g>

      <g className="svg-spin-reverse" style={{ transformOrigin: '360px 220px' }}>
        <circle
          cx="360"
          cy="220"
          r="118"
          stroke="var(--ink)"
          strokeWidth="0.9"
          strokeDasharray="2 5"
          opacity="0.35"
        />
      </g>

      {/* Closed Harness Verification Loop Path (animated flowing trace) */}
      <path
        id="harness-loop-path"
        d="M 164 220 C 164 118, 250 86, 360 86 C 470 86, 556 118, 556 220 C 556 322, 470 354, 360 354 C 250 354, 164 322, 164 220 Z"
        stroke="var(--line-strong)"
        strokeWidth="1.25"
      />
      <path
        d="M 164 220 C 164 118, 250 86, 360 86 C 470 86, 556 118, 556 220 C 556 322, 470 354, 360 354 C 250 354, 164 322, 164 220 Z"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="96 860"
        className="svg-flow-loop"
      />
      <path
        d="M 164 220 C 164 118, 250 86, 360 86 C 470 86, 556 118, 556 220 C 556 322, 470 354, 360 354 C 250 354, 164 322, 164 220 Z"
        stroke="var(--accent-blue)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="64 892"
        className="svg-flow-loop-delayed"
      />

      {/* Layer 1: CONTEXT (Left architectural card) */}
      <g className="svg-node-card">
        <rect
          x="74"
          y="174"
          width="174"
          height="92"
          rx="10"
          fill="var(--paper-light)"
          stroke="var(--line-strong)"
          strokeWidth="1.2"
        />
        <circle cx="94" cy="196" r="4" fill="var(--accent-blue)" />
        <text x="106" y="200" className="svg-mono-tag" fill="var(--accent-blue)">
          01 / CONTEXT
        </text>
        <line x1="90" y1="214" x2="230" y2="214" stroke="var(--line)" strokeWidth="1" />
        <text x="90" y="234" className="svg-node-title" fill="var(--ink)">
          Repo Map &amp; Memory
        </text>
        <text x="90" y="252" className="svg-mono-sub" fill="var(--muted)">
          AGENTS.md · Constraints
        </text>
      </g>

      {/* Layer 2: EXECUTION (Top-Right architectural card) */}
      <g className="svg-node-card">
        <rect
          x="472"
          y="112"
          width="174"
          height="92"
          rx="10"
          fill="var(--paper-light)"
          stroke="var(--line-strong)"
          strokeWidth="1.2"
        />
        <circle cx="492" cy="134" r="4" fill="var(--ink)" />
        <text x="504" y="138" className="svg-mono-tag" fill="var(--muted)">
          02 / EXECUTION
        </text>
        <line x1="488" y1="152" x2="628" y2="152" stroke="var(--line)" strokeWidth="1" />
        <text x="488" y="172" className="svg-node-title" fill="var(--ink)">
          Tools &amp; Sandbox
        </text>
        <text x="488" y="190" className="svg-mono-sub" fill="var(--muted)">
          Build · Lint · Isolated Run
        </text>
      </g>

      {/* Layer 3: VERIFICATION (Bottom-Right architectural card — highlighted) */}
      <g className="svg-node-card">
        <rect
          x="472"
          y="238"
          width="174"
          height="92"
          rx="10"
          fill="var(--paper-light)"
          stroke="var(--accent)"
          strokeWidth="1.4"
        />
        <circle cx="492" cy="260" r="4" fill="var(--accent)" className="svg-pulse-dot" />
        <text x="504" y="264" className="svg-mono-tag" fill="var(--accent-ink)">
          03 / VERIFICATION
        </text>
        <line x1="488" y1="278" x2="628" y2="278" stroke="var(--line)" strokeWidth="1" />
        <text x="488" y="298" className="svg-node-title" fill="var(--ink)">
          Tests &amp; Evidence Gate
        </text>
        <text x="488" y="316" className="svg-mono-sub" fill="var(--muted)">
          60.7% Loop · Human Own
        </text>
      </g>

      {/* Center Core: Isometric Interlocking Harness Kernel */}
      <g className="svg-float-gentle">
        <circle
          cx="360"
          cy="220"
          r="54"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.25"
        />
        <circle
          cx="360"
          cy="220"
          r="42"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        {/* Crisp geometric diamond core */}
        <polygon
          points="360,192 384,220 360,248 336,220"
          fill="var(--paper-light)"
          stroke="var(--ink)"
          strokeWidth="1.4"
        />
        <circle cx="360" cy="220" r="7" fill="var(--accent)" />
      </g>

      {/* Bottom architectural legend */}
      <text x="44" y="400" className="svg-mono-micro" fill="var(--muted)">
        DELEGATE → REVIEW → OWN
      </text>
      <text x="676" y="400" textAnchor="end" className="svg-mono-micro" fill="var(--muted)">
        VERIFIABLE LOOP · V2.6
      </text>
    </svg>
  );
}

/**
 * CASE 01 — Vital Agent Sync: Animated harmonic health wave through encrypted concentric shields
 */
export function VitalSyncSvg({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 600 375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`editorial-svg ${className}`}
      role="img"
      aria-label="Animated vector diagram showing an authorized health signal flowing through encrypted local privacy rings"
    >
      <defs>
        <pattern id="vital-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="0.8" fill="var(--line-strong)" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="600" height="375" fill="url(#vital-dots)" />

      {/* Horizontal calibration axis */}
      <line x1="42" y1="188" x2="558" y2="188" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="300" y1="32" x2="300" y2="343" stroke="var(--line)" strokeWidth="1" />

      {/* Three concentric rotating privacy/encryption shields */}
      <g className="svg-spin-slow" style={{ transformOrigin: '300px 188px' }}>
        <circle cx="300" cy="188" r="126" stroke="var(--line-strong)" strokeWidth="1.1" strokeDasharray="10 6" />
        <circle cx="426" cy="188" r="3.5" fill="var(--ink)" />
      </g>
      <g className="svg-spin-reverse" style={{ transformOrigin: '300px 188px' }}>
        <circle cx="300" cy="188" r="92" stroke="var(--accent-blue)" strokeWidth="1.1" strokeDasharray="6 6" opacity="0.7" />
        <circle cx="300" cy="96" r="4" fill="var(--accent-blue)" />
      </g>
      <circle cx="300" cy="188" r="56" fill="var(--paper-light)" stroke="var(--ink)" strokeWidth="1.2" opacity="0.92" />

      {/* Base subtle wave */}
      <path
        d="M 46 188 L 154 188 L 178 188 L 196 150 L 216 226 L 236 170 L 254 188 L 284 188 L 300 132 L 320 242 L 338 164 L 356 188 L 424 188 L 444 166 L 464 210 L 482 188 L 554 188"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Animated glowing terracotta pulse wave */}
      <path
        d="M 46 188 L 154 188 L 178 188 L 196 150 L 216 226 L 236 170 L 254 188 L 284 188 L 300 132 L 320 242 L 338 164 L 356 188 L 424 188 L 444 166 L 464 210 L 482 188 L 554 188"
        stroke="var(--accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="160 560"
        className="svg-pulse-wave"
      />

      {/* Endpoint tags */}
      <rect x="44" y="34" width="128" height="24" rx="12" fill="var(--paper-light)" stroke="var(--line-strong)" />
      <text x="108" y="50" textAnchor="middle" className="svg-mono-micro" fill="var(--muted)">
        HEALTHKIT · LOCAL
      </text>
      <rect x="438" y="316" width="118" height="24" rx="12" fill="var(--paper-light)" stroke="var(--accent)" />
      <text x="497" y="332" textAnchor="middle" className="svg-mono-micro" fill="var(--accent-ink)">
        MCP · AUDITED
      </text>
    </svg>
  );
}

/**
 * CASE 02 — AI Capital Map: Animated orbital constellation & provenance relationship graph
 */
export function CapitalMapSvg({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 600 375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`editorial-svg ${className}`}
      role="img"
      aria-label="Animated orbital graph illustrating AI industry entities, relationships, and evidence provenance"
    >
      <defs>
        <pattern id="cap-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" stroke="var(--line)" strokeWidth="0.65" opacity="0.65" />
        </pattern>
      </defs>
      <rect width="600" height="375" fill="url(#cap-grid)" />

      {/* Concentric cartographic orbits */}
      <circle cx="300" cy="188" r="142" stroke="var(--line-strong)" strokeWidth="0.9" />
      <g className="svg-spin-slow" style={{ transformOrigin: '300px 188px' }}>
        <circle cx="300" cy="188" r="102" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 7" />
      </g>
      <circle cx="300" cy="188" r="56" stroke="var(--accent-blue)" strokeWidth="0.9" opacity="0.45" />

      {/* Relationship edges */}
      <g stroke="var(--line-strong)" strokeWidth="1.1">
        <path d="M 300 188 Q 212 126 144 134" />
        <path d="M 300 188 Q 395 110 462 118" />
        <path d="M 300 188 Q 410 220 474 260" />
        <path d="M 300 188 Q 204 252 152 274" />
        <path d="M 144 134 Q 290 78 462 118" strokeDasharray="3 4" opacity="0.7" />
        <path d="M 152 274 Q 312 314 474 260" strokeDasharray="3 4" opacity="0.7" />
      </g>

      {/* Animated provenance signal flows */}
      <path
        d="M 144 134 Q 212 126 300 188 Q 395 110 462 118"
        stroke="var(--accent-blue)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="44 360"
        className="svg-flow-graph"
      />
      <path
        d="M 152 274 Q 204 252 300 188 Q 410 220 474 260"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="44 360"
        className="svg-flow-graph-alt"
      />

      {/* Outer entity nodes */}
      <g>
        <circle cx="144" cy="134" r="10" fill="var(--paper-light)" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="144" cy="134" r="3.5" fill="var(--ink)" />
        <text x="144" y="114" textAnchor="middle" className="svg-mono-micro" fill="var(--muted)">
          MODELS
        </text>

        <circle cx="462" cy="118" r="11" fill="var(--paper-light)" stroke="var(--accent-blue)" strokeWidth="1.6" />
        <circle cx="462" cy="118" r="4" fill="var(--accent-blue)" />
        <text x="462" y="96" textAnchor="middle" className="svg-mono-micro" fill="var(--accent-blue)">
          INFRA
        </text>

        <circle cx="474" cy="260" r="10" fill="var(--paper-light)" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="474" cy="260" r="3.5" fill="var(--accent)" />
        <text x="474" y="286" textAnchor="middle" className="svg-mono-micro" fill="var(--muted)">
          CAPITAL
        </text>

        <circle cx="152" cy="274" r="9" fill="var(--paper-light)" stroke="var(--line-strong)" strokeWidth="1.5" />
        <circle cx="152" cy="274" r="3" fill="var(--muted)" />
        <text x="152" y="298" textAnchor="middle" className="svg-mono-micro" fill="var(--muted)">
          SOURCES
        </text>
      </g>

      {/* Central focal hub */}
      <circle cx="300" cy="188" r="24" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.4" />
      <circle cx="300" cy="188" r="10" fill="var(--accent)" className="svg-pulse-dot" />
    </svg>
  );
}

/**
 * CASE 03 — ByteNote: Animated offline-first layered sheets + Yjs sync queue
 */
export function ByteNoteSvg({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 600 375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`editorial-svg ${className}`}
      role="img"
      aria-label="Animated architectural illustration of offline-first collaborative documents syncing through a dirty queue"
    >
      <defs>
        <pattern id="note-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" stroke="var(--line)" strokeWidth="0.65" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="600" height="375" fill="url(#note-grid)" />

      {/* Back stacked sheet */}
      <rect
        x="212"
        y="58"
        width="210"
        height="244"
        rx="10"
        fill="var(--surface-subtle)"
        stroke="var(--line-strong)"
        strokeWidth="1.1"
      />
      {/* Middle sheet */}
      <rect
        x="194"
        y="74"
        width="210"
        height="244"
        rx="10"
        fill="var(--paper)"
        stroke="var(--line-strong)"
        strokeWidth="1.15"
      />
      {/* Front active document sheet */}
      <g className="svg-float-gentle">
        <rect
          x="176"
          y="90"
          width="210"
          height="244"
          rx="10"
          fill="var(--paper-light)"
          stroke="var(--ink)"
          strokeWidth="1.35"
        />
        {/* Terracotta bookmark ribbon */}
        <path d="M 342 90 L 358 90 L 358 148 L 350 140 L 342 148 Z" fill="var(--accent)" />
        {/* Document editorial lines */}
        <rect x="200" y="122" width="96" height="8" rx="4" fill="var(--ink)" opacity="0.85" />
        <rect x="200" y="148" width="154" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="200" y="164" width="132" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="200" y="180" width="144" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="200" y="208" width="110" height="5" rx="2.5" fill="var(--accent-blue)" opacity="0.55" />
        <rect x="200" y="224" width="148" height="5" rx="2.5" fill="var(--line-strong)" />
        <rect x="200" y="240" width="88" height="5" rx="2.5" fill="var(--line-strong)" />
        {/* Status pill inside doc */}
        <rect x="200" y="284" width="112" height="24" rx="12" fill="var(--accent-soft)" />
        <circle cx="215" cy="296" r="3.5" fill="var(--accent)" className="svg-pulse-dot" />
        <text x="226" y="300" className="svg-mono-micro" fill="var(--accent-ink)">
          INDEXEDDB · SYNC
        </text>
      </g>

      {/* Sync arc from local document to remote Yjs room */}
      <path
        d="M 424 172 C 470 172, 488 144, 514 144"
        stroke="var(--line-strong)"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      <path
        d="M 424 172 C 470 172, 488 144, 514 144"
        stroke="var(--accent-blue)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="24 120"
        className="svg-flow-short"
      />
      <circle cx="526" cy="144" r="14" fill="var(--paper-light)" stroke="var(--accent-blue)" strokeWidth="1.4" />
      <circle cx="526" cy="144" r="4.5" fill="var(--accent-blue)" />
      <text x="526" y="176" textAnchor="middle" className="svg-mono-micro" fill="var(--muted)">
        YJS ROOM
      </text>

      {/* Local offline queue indicator on left */}
      <path
        d="M 86 226 C 118 226, 138 206, 174 206"
        stroke="var(--line-strong)"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      <path
        d="M 86 226 C 118 226, 138 206, 174 206"
        stroke="var(--accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="24 120"
        className="svg-flow-short"
      />
      <circle cx="74" cy="226" r="14" fill="var(--paper-light)" stroke="var(--accent)" strokeWidth="1.4" />
      <circle cx="74" cy="226" r="4.5" fill="var(--accent)" />
      <text x="74" y="258" textAnchor="middle" className="svg-mono-micro" fill="var(--muted)">
        LOCAL QUEUE
      </text>
    </svg>
  );
}

/**
 * PLATE 02 — Jarvis Local-First System Topology (Designed specifically for the Deep Obsidian Monolith)
 */
export function JarvisSystemSvg({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 680 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`editorial-svg jarvis-svg ${className}`}
      role="img"
      aria-label="Animated architectural blueprint of the Jarvis local-first personal agent stack, privacy boundary, and Obsidian second brain"
    >
      <defs>
        <pattern id="jarvis-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
        </pattern>
        <radialGradient id="jarvis-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e26d53" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#e26d53" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="680" height="340" fill="url(#jarvis-grid)" />
      <circle cx="340" cy="170" r="155" fill="url(#jarvis-core-glow)" />

      {/* Outer Privacy Boundary Shield */}
      <rect
        x="182"
        y="34"
        width="464"
        height="272"
        rx="16"
        fill="rgba(255,255,255,0.02)"
        stroke="rgba(242,140,117,0.42)"
        strokeWidth="1.2"
        strokeDasharray="6 6"
      />
      <text x="200" y="56" className="svg-mono-micro" fill="#f28c75">
        PRIVATE HOST · CONTROLLED BOUNDARY
      </text>

      {/* Left Inbound Entry Nodes */}
      <g>
        <rect x="28" y="88" width="112" height="44" rx="8" fill="#1c1c19" stroke="rgba(255,255,255,0.18)" />
        <text x="84" y="114" textAnchor="middle" className="svg-mono-micro" fill="#f3f2ec">
          FEISHU / CHAT
        </text>

        <rect x="28" y="152" width="112" height="44" rx="8" fill="#1c1c19" stroke="rgba(255,255,255,0.18)" />
        <text x="84" y="178" textAnchor="middle" className="svg-mono-micro" fill="#f3f2ec">
          CLI / CRON
        </text>

        <rect x="28" y="216" width="112" height="44" rx="8" fill="#1c1c19" stroke="rgba(255,255,255,0.18)" />
        <text x="84" y="242" textAnchor="middle" className="svg-mono-micro" fill="#c9c7be">
          TAILSCALE UI
        </text>
      </g>

      {/* Inbound traces into Hermes Runtime */}
      <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.2">
        <path d="M 140 110 C 176 110, 188 158, 224 158" />
        <path d="M 140 174 L 224 174" />
        <path d="M 140 238 C 176 238, 188 190, 224 190" />
      </g>
      <path
        d="M 140 110 C 176 110, 188 158, 224 158"
        stroke="#e26d53"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="24 140"
        className="svg-flow-short"
      />
      <path
        d="M 140 174 L 224 174"
        stroke="#7aa2f7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="22 120"
        className="svg-flow-short-delayed"
      />

      {/* Central Runtime Kernel */}
      <g className="svg-float-gentle">
        <rect
          x="224"
          y="112"
          width="154"
          height="122"
          rx="12"
          fill="#1b1b18"
          stroke="#e26d53"
          strokeWidth="1.5"
        />
        <circle cx="244" cy="134" r="4" fill="#e26d53" className="svg-pulse-dot" />
        <text x="256" y="138" className="svg-mono-micro" fill="#f28c75">
          RUNTIME CORE
        </text>
        <line x1="240" y1="150" x2="362" y2="150" stroke="rgba(255,255,255,0.12)" />
        <text x="240" y="174" className="svg-node-title" fill="#f6f4ee">
          Hermes + Config
        </text>
        <text x="240" y="194" className="svg-mono-sub" fill="#9c9a90">
          Routing · Tool Policy
        </text>
        <text x="240" y="212" className="svg-mono-sub" fill="#9c9a90">
          No Upstream Fork
        </text>
      </g>

      {/* Outbound controlled paths to 3 data/brain pillars */}
      <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.2">
        <path d="M 378 148 C 414 148, 420 104, 456 104" />
        <path d="M 378 174 L 456 174" />
        <path d="M 378 200 C 414 200, 420 244, 456 244" />
      </g>
      <path
        d="M 378 148 C 414 148, 420 104, 456 104"
        stroke="#7aa2f7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="24 140"
        className="svg-flow-short"
      />
      <path
        d="M 378 174 L 456 174"
        stroke="#e26d53"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="24 140"
        className="svg-flow-short-delayed"
      />
      <path
        d="M 378 200 C 414 200, 420 244, 456 244"
        stroke="#7aa2f7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="24 140"
        className="svg-flow-short"
      />

      {/* Right Pillar 1: jarvis-brain */}
      <rect x="456" y="76" width="166" height="56" rx="10" fill="#1b1b18" stroke="rgba(122,162,247,0.55)" />
      <text x="472" y="99" className="svg-mono-micro" fill="#93b4ff">
        JARVIS-BRAIN
      </text>
      <text x="472" y="118" className="svg-mono-sub" fill="#c9c7be">
        Obsidian · Evidence Vault
      </text>

      {/* Right Pillar 2: jarvis-data */}
      <rect x="456" y="146" width="166" height="56" rx="10" fill="#1b1b18" stroke="rgba(255,255,255,0.22)" />
      <text x="472" y="169" className="svg-mono-micro" fill="#f28c75">
        JARVIS-DATA
      </text>
      <text x="472" y="188" className="svg-mono-sub" fill="#c9c7be">
        Postgres · Summary CLI
      </text>

      {/* Right Pillar 3: Dual-Model Research */}
      <rect x="456" y="216" width="166" height="56" rx="10" fill="#1b1b18" stroke="rgba(255,255,255,0.22)" />
      <text x="472" y="239" className="svg-mono-micro" fill="#e6e4dc">
        DUAL-MODEL REVIEW
      </text>
      <text x="472" y="258" className="svg-mono-sub" fill="#c9c7be">
        Read-Only · Blind Audit
      </text>
    </svg>
  );
}
