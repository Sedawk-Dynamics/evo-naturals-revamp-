import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import { ArrowUpRight, Menu } from "lucide-react";

// Demo for the magnetic cursor — open http://localhost:3000/magnetic-demo
// Any element with `data-magnetic` snaps the cursor to it.
//
// Spacing note: this project maps spacing numbers to pixels (p-32 = 32px),
// so the original demo's p-8 / h-32 / gap-12 etc. were converted to the
// same sizes on that scale (p-32 / h-128 / gap-48 …).
export default function MagneticCursorDemo() {
  return (
    <MagneticCursor magneticFactor={0.55} blendMode="exclusion" cursorSize={40}>
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background font-sans text-foreground selection:bg-primary selection:text-background">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between p-32 md:p-48">
          <div data-magnetic className="text-xl font-bold tracking-tighter mix-blend-difference">
            21st.dev
          </div>

          <button
            data-magnetic
            aria-label="Menu"
            className="group relative flex h-56 w-56 items-center justify-center rounded-full border-2 border-border bg-secondary backdrop-blur-sm transition-colors hover:bg-secondary"
          >
            <Menu className="pointer-events-none h-24 w-24 stroke-1 text-foreground" />
          </button>
        </header>

        {/* Main content */}
        <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-48 p-24">
          <div className="space-y-16 text-center">
            <h1 className="text-6xl leading-[0.9] font-medium tracking-tighter md:text-8xl">
              Fluid <br />
              <span className="text-muted-foreground">Interaction</span>
            </h1>
          </div>

          {/* High-contrast test block */}
          <div
            data-magnetic
            className="relative flex h-128 w-full max-w-sm items-center justify-between overflow-hidden rounded-2xl bg-primary px-32 text-primary-foreground shadow-2xl transition-transform hover:scale-[1.02]"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium tracking-widest uppercase opacity-60">
                Try Hovering
              </span>
              <span className="text-2xl font-bold tracking-tight">Smart Contrast</span>
            </div>
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-primary-foreground text-primary">
              <ArrowUpRight className="pointer-events-none h-5 w-5" />
            </div>
          </div>

          <p className="max-w-md text-center text-sm leading-relaxed text-muted-foreground">
            A physics-based cursor wrapper that handles velocity, magnetic snapping, and
            auto-contrast inversion.
          </p>
        </main>

        {/* Footer */}
        <footer className="relative z-10 flex w-full justify-between p-32 text-xs tracking-widest text-muted-foreground uppercase md:p-48">
          <span>GSAP Power</span>
          <span>React Three Fiber</span>
        </footer>
      </div>
    </MagneticCursor>
  );
}
