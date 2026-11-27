'use client';

interface DiagramProps {
  className?: string;
  minimal?: boolean;
}

/**
 * FIG. 01 — Agent Harness 3-Layer Loop (Context / Execution / Verification)
 * Uses pure theme CSS tokens so it blends seamlessly in both Light and Dark modes.
 */
export function HeroHarnessSvg({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 720 400"
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
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-glow-blue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="720" height="400" fill="url(#hero-grid)" />
      <circle cx="360" cy="200" r="185" fill="url(#hero-glow-accent)" />
      <circle cx="520" cy="135" r="115" fill="url(#hero-glow-blue)" />

      {/* Outer registration marks */}
      <g stroke="var(--line-strong)" strokeWidth="1">
        <path d="M 24 36 L 24 24 L 36 24" />
        <path d="M 684 24 L 696 24 L 696 36" />
        <path d="M 24 364 L 24 376 L 36 376" />
        <path d="M 684 376 L 696 376 L 696 364" />
        <line x1="360" y1="22" x2="360" y2="378" strokeDasharray="2 6" opacity="0.55" />
        <line x1="40" y1="200" x2="680" y2="200" strokeDasharray="2 6" opacity="0.55" />
      </g>

      {/* Rotating outer calibration rings */}
      <g className="svg-spin-slow" style={{ transformOrigin: '360px 200px' }}>
        <circle
          cx="360"
          cy="200"
          r="152"
          stroke="var(--line-strong)"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.9"
        />
        <circle cx="360" cy="48" r="3.5" fill="var(--accent-blue)" />
        <circle cx="360" cy="352" r="3.5" fill="var(--muted)" />
      </g>

      <g className="svg-spin-reverse" style={{ transformOrigin: '360px 200px' }}>
        <circle
          cx="360"
          cy="200"
          r="108"
          stroke="var(--ink)"
          strokeWidth="0.9"
          strokeDasharray="2 5"
          opacity="0.35"
        />
      </g>

      {/* Closed Harness Verification Loop Path */}
      <path
        d="M 164 200 C 164 104, 250 74, 360 74 C 470 74, 556 104, 556 200 C 556 296, 470 326, 360 326 C 250 326, 164 296, 164 200 Z"
        stroke="var(--line-strong)"
        strokeWidth="1.25"
      />
      <path
        d="M 164 200 C 164 104, 250 74, 360 74 C 470 74, 556 104, 556 200 C 556 296, 470 326, 360 326 C 250 326, 164 296, 164 200 Z"
        stroke="var(--accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="96 860"
        className="svg-flow-loop"
      />
      <path
        d="M 164 200 C 164 104, 250 74, 360 74 C 470 74, 556 104, 556 200 C 556 296, 470 326, 360 326 C 250 326, 164 296, 164 200 Z"
        stroke="var(--accent-blue)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="64 892"
        className="svg-flow-loop-delayed"
      />

      {/* Layer 1: CONTEXT */}
      <g className="svg-node-card">
        <rect
          x="56"
          y="152"
          width="192"
          height="96"
          rx="10"
          fill="var(--paper-light)"
          stroke="var(--line-strong)"
          strokeWidth="1.2"
        />
        <circle cx="76" cy="176" r="4.5" fill="var(--accent-blue)" />
        <text x="89" y="180" className="svg-mono-tag" fill="var(--accent-blue)">
          01 / CONTEXT
        </text>
        <line x1="72" y1="194" x2="232" y2="194" stroke="var(--line)" strokeWidth="1" />
        <text x="72" y="215" className="svg-node-title" fill="var(--ink)">
          Repo Map &amp; Memory
        </text>
        <text x="72" y="234" className="svg-mono-sub" fill="var(--muted)">
          AGENTS.md · Ref Recall
        </text>
      </g>

      {/* Layer 2: EXECUTION */}
      <g className="svg-node-card">
        <rect
          x="472"
          y="92"
          width="192"
          height="96"
          rx="10"
          fill="var(--paper-light)"
          stroke="var(--line-strong)"
          strokeWidth="1.2"
        />
        <circle cx="492" cy="116" r="4.5" fill="var(--ink)" />
        <text x="505" y="120" className="svg-mono-tag" fill="var(--ink-secondary)">
          02 / EXECUTION
        </text>
        <line x1="488" y1="134" x2="648" y2="134" stroke="var(--line)" strokeWidth="1" />
        <text x="488" y="155" className="svg-node-title" fill="var(--ink)">
          Tools &amp; Sandbox
        </text>
        <text x="488" y="174" className="svg-mono-sub" fill="var(--muted)">
          Build · Lint · Isolated
        </text>
      </g>

      {/* Layer 3: VERIFICATION */}
      <g className="svg-node-card">
        <rect
          x="472"
          y="214"
          width="192"
          height="96"
          rx="10"
          fill="var(--paper-light)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <circle cx="492" cy="238" r="4.5" fill="var(--accent)" className="svg-pulse-dot" />
        <text x="505" y="242" className="svg-mono-tag" fill="var(--accent-ink)">
          03 / VERIFICATION
        </text>
        <line x1="488" y1="256" x2="648" y2="256" stroke="var(--line)" strokeWidth="1" />
        <text x="488" y="277" className="svg-node-title" fill="var(--ink)">
          Tests &amp; Evidence Gate
        </text>
        <text x="488" y="296" className="svg-mono-sub" fill="var(--muted)">
          Checks · Rollback · Own
        </text>
      </g>

      {/* Center Core */}
      <g className="svg-float-gentle">
        <circle cx="360" cy="200" r="52" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.25" />
        <circle
          cx="360"
          cy="200"
          r="40"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <polygon
          points="360,174 382,200 360,226 338,200"
          fill="var(--paper-light)"
          stroke="var(--ink)"
          strokeWidth="1.4"
        />
        <circle cx="360" cy="200" r="7" fill="var(--accent)" />
      </g>

      <text x="40" y="366" className="svg-mono-micro" fill="var(--muted)">
        DELEGATE → REVIEW → OWN
      </text>
      <text x="680" y="366" textAnchor="end" className="svg-mono-micro" fill="var(--muted)">
        VERIFIABLE LOOP · 2026
      </text>
    </svg>
  );
}

/**
 * CASE 01 — Vital Agent Sync: Animated harmonic health wave through encrypted concentric shields
 */
export function VitalSyncSvg({ className = '', minimal = false }: DiagramProps) {
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
          <circle cx="12" cy="12" r="0.85" fill="var(--line-strong)" opacity="0.65" />
        </pattern>
      </defs>
      <rect width="600" height="375" fill="url(#vital-dots)" />

      <line x1="42" y1="188" x2="558" y2="188" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="300" y1="32" x2="300" y2="343" stroke="var(--line)" strokeWidth="1" />

      <g className="svg-spin-slow" style={{ transformOrigin: '300px 188px' }}>
        <circle cx="300" cy="188" r="126" stroke="var(--line-strong)" strokeWidth="1.2" strokeDasharray="10 6" />
        <circle cx="426" cy="188" r="4" fill="var(--ink)" />
      </g>
      <g className="svg-spin-reverse" style={{ transformOrigin: '300px 188px' }}>
        <circle
          cx="300"
          cy="188"
          r="92"
          stroke="var(--accent-blue)"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          opacity="0.75"
        />
        <circle cx="300" cy="96" r="4.5" fill="var(--accent-blue)" />
      </g>
      <circle cx="300" cy="188" r="56" fill="var(--paper-light)" stroke="var(--ink)" strokeWidth="1.3" opacity="0.94" />

      <path
        d="M 46 188 L 154 188 L 178 188 L 196 150 L 216 226 L 236 170 L 254 188 L 284 188 L 300 132 L 320 242 L 338 164 L 356 188 L 424 188 L 444 166 L 464 210 L 482 188 L 554 188"
        stroke="var(--line-strong)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 46 188 L 154 188 L 178 188 L 196 150 L 216 226 L 236 170 L 254 188 L 284 188 L 300 132 L 320 242 L 338 164 L 356 188 L 424 188 L 444 166 L 464 210 L 482 188 L 554 188"
        stroke="var(--accent)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="160 560"
        className="svg-pulse-wave"
      />

      {!minimal && (
        <>
          <rect x="38" y="30" width="154" height="28" rx="14" fill="var(--paper-light)" stroke="var(--line-strong)" />
          <text x="115" y="48" textAnchor="middle" className="svg-mono-micro" fill="var(--ink-secondary)">
            HEALTHKIT · LOCAL
          </text>
          <rect x="418" y="314" width="144" height="28" rx="14" fill="var(--paper-light)" stroke="var(--accent)" />
          <text x="490" y="332" textAnchor="middle" className="svg-mono-micro" fill="var(--accent-ink)">
            MCP · AUDITED
          </text>
        </>
      )}
    </svg>
  );
}

/**
 * CASE 02 — AI Capital Map: Animated orbital constellation & provenance relationship graph
 */
export function CapitalMapSvg({ className = '', minimal = false }: DiagramProps) {
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
          <path d="M 30 0 L 0 0 0 30" stroke="var(--line)" strokeWidth="0.7" opacity="0.65" />
        </pattern>
      </defs>
      <rect width="600" height="375" fill="url(#cap-grid)" />

      <circle cx="300" cy="188" r="142" stroke="var(--line-strong)" strokeWidth="1" />
      <g className="svg-spin-slow" style={{ transformOrigin: '300px 188px' }}>
        <circle cx="300" cy="188" r="102" stroke="var(--line-strong)" strokeWidth="1.1" strokeDasharray="3 7" />
      </g>
      <circle cx="300" cy="188" r="56" stroke="var(--accent-blue)" strokeWidth="1" opacity="0.5" />

      <g stroke="var(--line-strong)" strokeWidth="1.2">
        <path d="M 300 188 Q 212 126 144 134" />
        <path d="M 300 188 Q 395 110 462 118" />
        <path d="M 300 188 Q 410 220 474 260" />
        <path d="M 300 188 Q 204 252 152 274" />
        <path d="M 144 134 Q 290 78 462 118" strokeDasharray="3 4" opacity="0.7" />
        <path d="M 152 274 Q 312 314 474 260" strokeDasharray="3 4" opacity="0.7" />
      </g>

      <path
        d="M 144 134 Q 212 126 300 188 Q 395 110 462 118"
        stroke="var(--accent-blue)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="48 360"
        className="svg-flow-graph"
      />
      <path
        d="M 152 274 Q 204 252 300 188 Q 410 220 474 260"
        stroke="var(--accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="48 360"
        className="svg-flow-graph-alt"
      />

      <g>
        <circle cx="144" cy="134" r="11" fill="var(--paper-light)" stroke="var(--ink)" strokeWidth="1.6" />
        <circle cx="144" cy="134" r="4" fill="var(--ink)" />
        <circle cx="462" cy="118" r="12" fill="var(--paper-light)" stroke="var(--accent-blue)" strokeWidth="1.7" />
        <circle cx="462" cy="118" r="4.5" fill="var(--accent-blue)" />
        <circle cx="474" cy="260" r="11" fill="var(--paper-light)" stroke="var(--ink)" strokeWidth="1.6" />
        <circle cx="474" cy="260" r="4" fill="var(--accent)" />
        <circle cx="152" cy="274" r="10" fill="var(--paper-light)" stroke="var(--line-strong)" strokeWidth="1.6" />
        <circle cx="152" cy="274" r="3.5" fill="var(--muted)" />
      </g>

      {!minimal && (
        <g>
          <text x="144" y="110" textAnchor="middle" className="svg-mono-micro" fill="var(--ink-secondary)">
            MODELS
          </text>
          <text x="462" y="92" textAnchor="middle" className="svg-mono-micro" fill="var(--accent-blue)">
            INFRA
          </text>
          <text x="474" y="290" textAnchor="middle" className="svg-mono-micro" fill="var(--ink-secondary)">
            CAPITAL
          </text>
          <text x="152" y="302" textAnchor="middle" className="svg-mono-micro" fill="var(--muted)">
            SOURCES
          </text>
        </g>
      )}

      <circle cx="300" cy="188" r="24" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="300" cy="188" r="10" fill="var(--accent)" className="svg-pulse-dot" />
    </svg>
  );
}

/**
 * CASE 03 — ByteNote: Animated offline-first layered sheets + Yjs sync queue
 */
export function ByteNoteSvg({ className = '', minimal = false }: DiagramProps) {
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
          <path d="M 28 0 L 0 0 0 28" stroke="var(--line)" strokeWidth="0.7" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="600" height="375" fill="url(#note-grid)" />

      <rect
        x="212"
        y="56"
        width="216"
        height="248"
        rx="10"
        fill="var(--surface-subtle)"
        stroke="var(--line-strong)"
        strokeWidth="1.2"
      />
      <rect
        x="194"
        y="72"
        width="216"
        height="248"
        rx="10"
        fill="var(--paper)"
        stroke="var(--line-strong)"
        strokeWidth="1.25"
      />

      <g className="svg-float-gentle">
        <rect
          x="176"
          y="88"
          width="216"
          height="248"
          rx="10"
          fill="var(--paper-light)"
          stroke="var(--ink)"
          strokeWidth="1.4"
        />
        <path d="M 346 88 L 362 88 L 362 148 L 354 140 L 346 148 Z" fill="var(--accent)" />
        <rect x="200" y="122" width="98" height="8" rx="4" fill="var(--ink)" opacity="0.88" />
        <rect x="200" y="148" width="158" height="5.5" rx="2.75" fill="var(--line-strong)" />
        <rect x="200" y="165" width="136" height="5.5" rx="2.75" fill="var(--line-strong)" />
        <rect x="200" y="182" width="148" height="5.5" rx="2.75" fill="var(--line-strong)" />
        <rect x="200" y="210" width="114" height="5.5" rx="2.75" fill="var(--accent-blue)" opacity="0.65" />
        <rect x="200" y="227" width="150" height="5.5" rx="2.75" fill="var(--line-strong)" />
        <rect x="200" y="244" width="92" height="5.5" rx="2.75" fill="var(--line-strong)" />

        {!minimal && (
          <>
            <rect
              x="198"
              y="282"
              width="162"
              height="28"
              rx="14"
              fill="var(--accent-soft)"
              stroke="var(--accent)"
              strokeWidth="0.9"
            />
            <circle cx="215" cy="296" r="4" fill="var(--accent)" className="svg-pulse-dot" />
            <text x="228" y="300" className="svg-mono-micro" fill="var(--accent-ink)">
              INDEXEDDB · SYNC
            </text>
          </>
        )}
      </g>

      <path
        d="M 428 172 C 472 172, 488 144, 514 144"
        stroke="var(--line-strong)"
        strokeWidth="1.3"
        strokeDasharray="4 4"
      />
      <path
        d="M 428 172 C 472 172, 488 144, 514 144"
        stroke="var(--accent-blue)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="24 120"
        className="svg-flow-short"
      />
      <circle cx="526" cy="144" r="15" fill="var(--paper-light)" stroke="var(--accent-blue)" strokeWidth="1.6" />
      <circle cx="526" cy="144" r="5" fill="var(--accent-blue)" />

      <path
        d="M 86 226 C 118 226, 138 206, 174 206"
        stroke="var(--line-strong)"
        strokeWidth="1.3"
        strokeDasharray="4 4"
      />
      <path
        d="M 86 226 C 118 226, 138 206, 174 206"
        stroke="var(--accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="24 120"
        className="svg-flow-short"
      />
      <circle cx="74" cy="226" r="15" fill="var(--paper-light)" stroke="var(--accent)" strokeWidth="1.6" />
      <circle cx="74" cy="226" r="5" fill="var(--accent)" />

      {!minimal && (
        <>
          <text x="526" y="180" textAnchor="middle" className="svg-mono-micro" fill="var(--ink-secondary)">
            YJS ROOM
          </text>
          <text x="74" y="262" textAnchor="middle" className="svg-mono-micro" fill="var(--ink-secondary)">
            LOCAL QUEUE
          </text>
        </>
      )}
    </svg>
  );
}

/**
 * PLATE 02 — Jarvis Local-First System Topology (High-contrast Obsidian blueprint)
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
          <path d="M 28 0 L 0 0 0 28" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
        </pattern>
        <radialGradient id="jarvis-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e26d53" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#e26d53" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="680" height="340" fill="url(#jarvis-grid)" />
      <circle cx="340" cy="170" r="160" fill="url(#jarvis-core-glow)" />

      {/* Outer Privacy Boundary Shield */}
      <rect
        x="178"
        y="30"
        width="474"
        height="280"
        rx="16"
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(242,140,117,0.58)"
        strokeWidth="1.35"
        strokeDasharray="6 6"
      />
      <text x="198" y="54" className="svg-mono-tag" fill="#f7a08b">
        PRIVATE HOST · CONTROLLED BOUNDARY
      </text>

      {/* Left Inbound Entry Nodes */}
      <g>
        <rect x="24" y="84" width="118" height="46" rx="8" fill="#1f1f1b" stroke="rgba(255,255,255,0.28)" />
        <text x="83" y="111" textAnchor="middle" className="svg-mono-micro" fill="#f6f4ee">
          FEISHU / CHAT
        </text>

        <rect x="24" y="148" width="118" height="46" rx="8" fill="#1f1f1b" stroke="rgba(255,255,255,0.28)" />
        <text x="83" y="175" textAnchor="middle" className="svg-mono-micro" fill="#f6f4ee">
          CLI / CRON
        </text>

        <rect x="24" y="212" width="118" height="46" rx="8" fill="#1f1f1b" stroke="rgba(255,255,255,0.28)" />
        <text x="83" y="239" textAnchor="middle" className="svg-mono-micro" fill="#e6e4dc">
          TAILSCALE UI
        </text>
      </g>

      {/* Inbound traces into Hermes Runtime */}
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1.3">
        <path d="M 142 107 C 176 107, 186 156, 218 156" />
        <path d="M 142 171 L 218 171" />
        <path d="M 142 235 C 176 235, 186 188, 218 188" />
      </g>
      <path
        d="M 142 107 C 176 107, 186 156, 218 156"
        stroke="#f08369"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="24 140"
        className="svg-flow-short"
      />
      <path
        d="M 142 171 L 218 171"
        stroke="#8eb3ff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="22 120"
        className="svg-flow-short-delayed"
      />

      {/* Central Runtime Kernel */}
      <g className="svg-float-gentle">
        <rect
          x="218"
          y="108"
          width="164"
          height="128"
          rx="12"
          fill="#21211d"
          stroke="#f08369"
          strokeWidth="1.6"
        />
        <circle cx="238" cy="132" r="4.5" fill="#f08369" className="svg-pulse-dot" />
        <text x="250" y="136" className="svg-mono-micro" fill="#f7a08b">
          RUNTIME CORE
        </text>
        <line x1="234" y1="148" x2="366" y2="148" stroke="rgba(255,255,255,0.18)" />
        <text x="234" y="173" className="svg-node-title" fill="#ffffff">
          Hermes + Config
        </text>
        <text x="234" y="195" className="svg-mono-sub" fill="#d0cec4">
          Routing · Tool Policy
        </text>
        <text x="234" y="214" className="svg-mono-sub" fill="#d0cec4">
          No Upstream Fork
        </text>
      </g>

      {/* Outbound controlled paths */}
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1.3">
        <path d="M 382 146 C 414 146, 420 102, 452 102" />
        <path d="M 382 172 L 452 172" />
        <path d="M 382 198 C 414 198, 420 242, 452 242" />
      </g>
      <path
        d="M 382 146 C 414 146, 420 102, 452 102"
        stroke="#8eb3ff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="24 140"
        className="svg-flow-short"
      />
      <path
        d="M 382 172 L 452 172"
        stroke="#f08369"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="24 140"
        className="svg-flow-short-delayed"
      />
      <path
        d="M 382 198 C 414 198, 420 242, 452 242"
        stroke="#8eb3ff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="24 140"
        className="svg-flow-short"
      />

      {/* Right Pillars */}
      <rect x="452" y="72" width="180" height="60" rx="10" fill="#21211d" stroke="rgba(142,179,255,0.68)" />
      <text x="468" y="97" className="svg-mono-micro" fill="#a8c4ff">
        JARVIS-BRAIN
      </text>
      <text x="468" y="117" className="svg-mono-sub" fill="#e6e4dc">
        Obsidian · Evidence Vault
      </text>

      <rect x="452" y="142" width="180" height="60" rx="10" fill="#21211d" stroke="rgba(255,255,255,0.32)" />
      <text x="468" y="167" className="svg-mono-micro" fill="#f7a08b">
        JARVIS-DATA
      </text>
      <text x="468" y="187" className="svg-mono-sub" fill="#e6e4dc">
        Postgres · Summary CLI
      </text>

      <rect x="452" y="212" width="180" height="60" rx="10" fill="#21211d" stroke="rgba(255,255,255,0.32)" />
      <text x="468" y="237" className="svg-mono-micro" fill="#f6f4ee">
        DUAL-MODEL REVIEW
      </text>
      <text x="468" y="257" className="svg-mono-sub" fill="#e6e4dc">
        Read-Only · Blind Audit
      </text>
    </svg>
  );
}

/**
 * CASE 02 — MemTable: Structured auditable ledger runtime (Event -> Proposal -> SQLite Ledger -> MCP Query)
 */
export function MemTableSvg({ className = '', minimal = false }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 600 375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`editorial-svg ${className}`}
      role="img"
      aria-label="Architectural vector diagram showing MemTable turning agent events into auditable proposals and SQLite ledger aggregations exposed via MCP"
    >
      <defs>
        <pattern id="memtable-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" stroke="var(--line)" strokeWidth="0.75" opacity="0.65" />
        </pattern>
      </defs>
      <rect width="600" height="375" fill="url(#memtable-grid)" />

      {/* Left: Observed Agent Events */}
      <g>
        <rect
          x="34"
          y="78"
          width="148"
          height="54"
          rx="8"
          fill="var(--paper-light)"
          stroke="var(--line-strong)"
          strokeWidth="1.2"
        />
        <text x="48" y="100" className="svg-mono-micro" fill="var(--accent-blue)">
          OBSERVE
        </text>
        <text x="48" y="119" className="svg-mono-sub" fill="var(--ink)">
          Agent Events
        </text>

        <rect
          x="34"
          y="156"
          width="148"
          height="54"
          rx="8"
          fill="var(--paper-light)"
          stroke="var(--line-strong)"
          strokeWidth="1.2"
        />
        <text x="48" y="178" className="svg-mono-micro" fill="var(--accent-ink)">
          PROPOSAL
        </text>
        <text x="48" y="197" className="svg-mono-sub" fill="var(--ink)">
          Schema + Trace
        </text>

        <rect
          x="34"
          y="234"
          width="148"
          height="54"
          rx="8"
          fill="var(--paper-light)"
          stroke="var(--line-strong)"
          strokeWidth="1.2"
        />
        <text x="48" y="256" className="svg-mono-micro" fill="var(--muted)">
          PACKS
        </text>
        <text x="48" y="275" className="svg-mono-sub" fill="var(--ink)">
          fitness · work
        </text>
      </g>

      {/* Connecting flows into Ledger */}
      <g stroke="var(--line-strong)" strokeWidth="1.25">
        <path d="M 182 105 C 216 105, 218 162, 248 162" />
        <path d="M 182 183 L 248 183" />
        <path d="M 182 261 C 216 261, 218 204, 248 204" />
      </g>
      <path
        d="M 182 105 C 216 105, 218 162, 248 162"
        stroke="var(--accent-blue)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeDasharray="24 140"
        className="svg-flow-short"
      />
      <path
        d="M 182 183 L 248 183"
        stroke="var(--accent)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeDasharray="22 120"
        className="svg-flow-short-delayed"
      />

      {/* Center: SQLite Structured Ledger */}
      <g className="svg-float-gentle">
        <rect
          x="248"
          y="88"
          width="174"
          height="190"
          rx="12"
          fill="var(--paper-light)"
          stroke="var(--accent)"
          strokeWidth="1.6"
        />
        <circle cx="268" cy="112" r="4.5" fill="var(--accent)" className="svg-pulse-dot" />
        <text x="280" y="116" className="svg-mono-micro" fill="var(--accent-ink)">
          SQLITE LEDGER
        </text>
        <line x1="262" y1="130" x2="408" y2="130" stroke="var(--line)" strokeWidth="1" />
        {/* Ledger rows */}
        <rect x="264" y="144" width="142" height="24" rx="4" fill="var(--paper)" stroke="var(--line)" />
        <text x="272" y="160" className="svg-mono-micro" fill="var(--ink)">
          ts · schema · verified
        </text>
        <rect x="264" y="176" width="142" height="24" rx="4" fill="var(--paper)" stroke="var(--line)" />
        <text x="272" y="192" className="svg-mono-micro" fill="var(--ink)">
          bench: 60kg → 65kg
        </text>
        <rect x="264" y="208" width="142" height="24" rx="4" fill="var(--accent-soft)" stroke="var(--accent)" />
        <text x="272" y="224" className="svg-mono-micro" fill="var(--accent-ink)">
          Δ +5kg · source_id
        </text>
        <text x="264" y="258" className="svg-mono-micro" fill="var(--muted)">
          COMPUTE WHAT CHANGED
        </text>
      </g>

      {/* Right: MCP & Query Surface */}
      <path d="M 422 183 L 462 183" stroke="var(--line-strong)" strokeWidth="1.3" />
      <path
        d="M 422 183 L 462 183"
        stroke="var(--accent-blue)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="16 80"
        className="svg-flow-short"
      />
      <rect
        x="462"
        y="128"
        width="106"
        height="110"
        rx="10"
        fill="var(--paper-light)"
        stroke="var(--ink)"
        strokeWidth="1.25"
      />
      <text x="476" y="154" className="svg-mono-micro" fill="var(--accent-blue)">
        MCP / CLI
      </text>
      <line x1="474" y1="166" x2="554" y2="166" stroke="var(--line)" />
      <text x="476" y="188" className="svg-mono-sub" fill="var(--ink)">
        Aggregate
      </text>
      <text x="476" y="208" className="svg-mono-sub" fill="var(--ink)">
        Trace ID
      </text>
      <text x="476" y="226" className="svg-mono-micro" fill="var(--muted)">
        Hermes Plug
      </text>

      {!minimal && (
        <>
          <text x="34" y="344" className="svg-mono-micro" fill="var(--muted)">
            MEMORY RECALLS · LEDGER COMPUTES
          </text>
          <text x="566" y="344" textAnchor="end" className="svg-mono-micro" fill="var(--muted)">
            NODE:SQLITE · MCP · V0.1
          </text>
        </>
      )}
    </svg>
  );
}
