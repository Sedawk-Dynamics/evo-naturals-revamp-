// Delicate organic line illustration of branching (microbiome-like)
// structures — DESIGN.md "Imagery". Generated from a fixed seed so it
// looks the same on every render. Change `seed` for a different shape.

type Segment = { d: string; width: number };
type Node = { x: number; y: number; r: number; filled: boolean };

function random(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function build(seed: number, origin: "center" | "bottom") {
  const rand = random(seed);
  const segments: Segment[] = [];
  const nodes: Node[] = [];
  const W = 600;
  const H = 600;

  function grow(x: number, y: number, angle: number, length: number, depth: number) {
    const ex = x + Math.cos(angle) * length;
    const ey = y + Math.sin(angle) * length;
    // Curve the branch slightly by pushing the control point sideways
    const bend = (rand() - 0.5) * length * 0.6;
    const cx = (x + ex) / 2 + Math.cos(angle + Math.PI / 2) * bend;
    const cy = (y + ey) / 2 + Math.sin(angle + Math.PI / 2) * bend;
    segments.push({
      d: `M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
      width: 0.5 + depth * 0.22,
    });

    if (depth === 0) {
      nodes.push({ x: ex, y: ey, r: 1.8 + rand() * 2.6, filled: rand() > 0.45 });
      return;
    }
    const children = rand() > 0.7 ? 3 : 2;
    for (let i = 0; i < children; i++) {
      const spread = (0.3 + rand() * 0.4) * (i - (children - 1) / 2) * 1.6;
      grow(ex, ey, angle + spread, length * (0.66 + rand() * 0.14), depth - 1);
    }
  }

  if (origin === "center") {
    const arms = 6;
    for (let i = 0; i < arms; i++) {
      const a = (i / arms) * Math.PI * 2 + rand() * 0.4;
      grow(W / 2, H / 2, a, 62 + rand() * 18, 5);
    }
    nodes.push({ x: W / 2, y: H / 2, r: 6, filled: true });
  } else {
    for (const offset of [-60, 0, 60]) {
      grow(W / 2 + offset, H, -Math.PI / 2 + offset / 400, 110, 6);
    }
  }
  return { segments, nodes, W, H };
}

export function BranchIllustration({
  seed = 7,
  origin = "center",
  color = "#757c5d",
  className = "",
}: {
  seed?: number;
  origin?: "center" | "bottom";
  color?: string;
  className?: string;
}) {
  const { segments, nodes, W, H } = build(seed, origin);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true" fill="none">
      <g stroke={color} strokeLinecap="round">
        {segments.map((s, i) => (
          <path key={i} d={s.d} strokeWidth={s.width} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x.toFixed(1)}
          cy={n.y.toFixed(1)}
          r={n.r.toFixed(1)}
          fill={n.filled ? color : "none"}
          stroke={color}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
