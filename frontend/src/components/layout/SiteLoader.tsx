import { site } from "@/data/site";
import { Logo } from "@/components/layout/Logo";
import { InlineScript } from "@/components/ui/InlineScript";

// Loading screen shown before the site appears: the "Dither Grid" gradient
// from 21st.dev/community/gradients. The palette is sampled across a coarse
// grid of square cells with 4×4 Bayer (ordered) dithering, and the ramp
// sweeps along the grid diagonal. Once the page has loaded, the cells
// dissolve from the centre out in the same Bayer order, revealing the site.
//
// It's started by an inline script that runs while the browser is still
// parsing the HTML, so it's on screen before React or any bundle loads. The
// grid is drawn in a Web Worker (OffscreenCanvas) where supported, so it
// keeps moving while the page's own JavaScript — hydration, the WebGL
// slider — ties up the main thread; older browsers draw it on the page.
// The markup ships hidden (data-state="off") and only the script shows it,
// so with JavaScript off — or if anything fails — the site just shows.
//   off → on (grid running) → exit (dissolving) → done (hidden)

const LOADER = {
  id: "site-loader",
  // The preset's parameters, as exported from the generator (mode: pixel)
  colors: [
    { hex: "#0E2417", pos: 0 }, // Pine
    { hex: "#2E6B3E", pos: 24 }, // Moss
    { hex: "#78B86B", pos: 67 }, // Fern
    { hex: "#DDF0C8", pos: 61 }, // Sprout
  ],
  backdrop: "#0E2417", // shows in the gaps between cells
  centerX: 50,
  centerY: 50,
  pixelCols: 25,
  pixelRows: 15,
  pixelAngle: 62,
  pixelDither: 76,
  pixelGap: 7, // % of a cell
  speed: 71,
  motionAmount: 60,
  motionReverse: false,
  // Timing, in ms
  minMs: 1500, // keep the grid up at least this long, so it never just flashes
  maxMs: 8000, // never hold the site back longer than this, loaded or not
  exitMs: 850, // the dissolve
};

type LoaderConfig = typeof LOADER;
type Scene = { resize: (cssW: number, cssH: number, dpr: number) => void; leave: () => void };

// Draws and animates the grid on a canvas, in a worker or on the page.
// Serialised with toString, so it must be self-contained: no imports, no
// variables from outside. Calls done() once the dissolve has finished.
function ditherScene(
  c: LoaderConfig,
  canvas: HTMLCanvasElement | OffscreenCanvas,
  reduce: boolean,
  done: () => void,
): Scene {
  // Same drawing API on both canvas kinds
  const ctx = (canvas as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
  const raf: (cb: (now: number) => void) => void =
    typeof requestAnimationFrame === "function"
      ? (cb) => requestAnimationFrame(cb)
      : (cb) => setTimeout(() => cb(performance.now()), 16);

  // The ramp is sampled in position order, so Sprout (61) sits before Fern (67)
  const stops = c.colors.map((s) => ({ hex: s.hex, pos: s.pos / 100 })).sort((a, b) => a.pos - b.pos);
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const dither = c.pixelDither / 100;
  const amt = c.motionAmount / 100;
  const dir = c.motionReverse ? -1 : 1;
  const angle = (c.pixelAngle * Math.PI) / 180;
  const dx = Math.sin(angle); // CSS angle convention: 0° points up, 90° right
  const dy = -Math.cos(angle);

  // 7 numbers per cell: slot x0, y0, x1, y1 (device px), ramp position,
  // Bayer threshold, and when it dissolves on exit (0–1)
  let cells: number[] = [];
  let w = 0;
  let h = 0;
  let gap = 0;
  let inset = 0;

  // Palette index for ramp position t, dithered by the cell's threshold b
  const pick = (t: number, b: number) => {
    const th = 0.5 + (b - 0.5) * dither;
    if (t <= stops[0].pos) return 0;
    for (let s = 1; s < stops.length; s++) {
      const lo = stops[s - 1].pos;
      const hi = stops[s].pos;
      if (t <= hi) return (hi > lo ? (t - lo) / (hi - lo) : 1) > th ? s : s - 1;
    }
    return stops.length - 1;
  };

  let ph = 0; // motion phase
  let e = 0; // exit progress
  const draw = () => {
    // Sine sweep of the ramp along the diagonal — exactly 0 at ph = 0
    const shift = Math.sin(ph * 0.9 * dir) * 0.5 * amt;
    ctx.clearRect(0, 0, w, h);
    if (e === 0) {
      ctx.fillStyle = c.backdrop;
      ctx.fillRect(0, 0, w, h);
    }
    for (let k = 0; k < cells.length; k += 7) {
      const x0 = cells[k];
      const y0 = cells[k + 1];
      const cw = cells[k + 2] - x0;
      const ch = cells[k + 3] - y0;
      if (e > 0) {
        if (e >= cells[k + 6]) continue; // dissolved — the site shows through
        ctx.fillStyle = c.backdrop;
        ctx.fillRect(x0, y0, cw, ch);
      }
      ctx.fillStyle = stops[pick(cells[k + 4] + shift, cells[k + 5])].hex;
      ctx.fillRect(x0 + inset, y0 + inset, cw - gap, ch - gap);
    }
  };

  const resize = (cssW: number, cssH: number, dpr: number) => {
    w = Math.max(1, Math.round(cssW * dpr));
    h = Math.max(1, Math.round(cssH * dpr));
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    // Square cells, sized so any screen gets the preset's cell count (25×15)
    const size = Math.sqrt((cssW * cssH) / (c.pixelCols * c.pixelRows)) || 1;
    const nx = Math.max(1, Math.round(cssW / size));
    const ny = Math.max(1, Math.round(cssH / size));
    gap = Math.max(1, Math.round((size * dpr * c.pixelGap) / 100));
    inset = Math.floor(gap / 2);

    const cx = (w * c.centerX) / 100;
    const cy = (h * c.centerY) / 100;
    const span = Math.abs(w * dx) + Math.abs(h * dy) || 1; // ramp runs corner to corner
    const far = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) || 1;

    cells = [];
    for (let j = 0; j < ny; j++) {
      const y0 = Math.round((j * h) / ny);
      const y1 = Math.round(((j + 1) * h) / ny);
      for (let i = 0; i < nx; i++) {
        const x0 = Math.round((i * w) / nx);
        const x1 = Math.round(((i + 1) * w) / nx);
        const mx = (x0 + x1) / 2 - cx;
        const my = (y0 + y1) / 2 - cy;
        const b = (BAYER[(j % 4) * 4 + (i % 4)] + 0.5) / 16;
        cells.push(x0, y0, x1, y1, 0.5 + (mx * dx + my * dy) / span, b, 0.5 * b + (0.5 * Math.hypot(mx, my)) / far);
      }
    }
    draw();
  };

  const start = performance.now();
  let leaving = false;
  let exitAt = -1;
  const frame = (now: number) => {
    if (!reduce) ph = (Math.max(0, now - start) / 1000) * (c.speed / 100);
    if (leaving) {
      if (exitAt < 0) exitAt = now;
      const p = Math.min(1, (now - exitAt) / c.exitMs);
      if (p >= 1) {
        canvas.width = canvas.height = 0; // free the bitmap
        return done();
      }
      if (!reduce) e = p; // reduced motion: CSS fades the whole overlay instead
    }
    draw();
    raf(frame);
  };
  raf(frame);

  return {
    resize,
    leave: () => {
      leaving = true;
    },
  };
}

// Runs in the browser as an inline script: shows the loader, starts the
// scene (in a worker if it can) and decides when to leave. Self-contained
// like ditherScene, which it receives as an argument.
function runDitherLoader(c: LoaderConfig, scene: typeof ditherScene) {
  const root = document.getElementById(c.id);
  const canvas = root?.querySelector("canvas");
  if (!root || !canvas) return;

  let s: Scene | undefined;
  let worker: Worker | undefined;
  let url = "";
  const size = () => {
    s?.resize(root.clientWidth || innerWidth, root.clientHeight || innerHeight, Math.min(devicePixelRatio || 1, 2));
  };
  const ro = new ResizeObserver(size);
  const finish = () => {
    if (root.getAttribute("data-state") === "done") return;
    root.setAttribute("data-state", "done");
    ro.disconnect();
    worker?.terminate();
    if (url) URL.revokeObjectURL(url);
  };

  try {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.setAttribute("data-state", "on");

    if ("transferControlToOffscreen" in canvas && typeof Worker === "function") {
      try {
        const src = `let s;onmessage=function(m){var d=m.data;if(d.canvas)s=(${scene})(d.c,d.canvas,d.reduce,function(){postMessage(0)});if(d.size)s.resize(d.size[0],d.size[1],d.size[2]);if(d.leave)s.leave()}`;
        url = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
        worker = new Worker(url);
        const off = canvas.transferControlToOffscreen();
        const w = worker;
        w.onmessage = finish;
        w.onerror = finish;
        w.postMessage({ c, canvas: off, reduce }, [off]);
        s = {
          resize: (cssW, cssH, dpr) => w.postMessage({ size: [cssW, cssH, dpr] }),
          leave: () => w.postMessage({ leave: 1 }),
        };
      } catch {
        worker?.terminate();
        worker = undefined;
      }
    }
    // No worker: draw on the page (and paint the first frame right now)
    if (!worker) s = scene(c, canvas, reduce, finish);
    size();
    ro.observe(root);

    // Leave once the page (images, video poster, fonts) has loaded. The CSS
    // exit (card, grain and vignette fading) starts with the dissolve.
    const leave = () => {
      if (root.getAttribute("data-state") !== "on") return;
      root.setAttribute("data-state", "exit");
      s?.leave();
      setTimeout(finish, c.exitMs + 1000); // hard stop, should the scene ever stall
    };
    const start = performance.now();
    const ready = () => setTimeout(leave, Math.max(0, c.minMs - (performance.now() - start)));
    if (document.readyState === "complete") ready();
    else addEventListener("load", ready, { once: true });
    setTimeout(leave, c.maxMs);
  } catch {
    finish();
  }
}

// Bitmap grain from the preset's CSS, blended over the cells
const GRAIN =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.500'/></svg>\")";
const VIGNETTE = "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 52%, rgba(0, 0, 0, 0.8) 100%)";

export function SiteLoader() {
  return (
    <>
      {/* The script changes data-state and the canvas before React
          hydrates — suppressHydrationWarning keeps what the DOM has.
          The Pine background covers the page until the worker's first frame. */}
      <div
        id={LOADER.id}
        data-state="off"
        role="status"
        aria-label={`Loading ${site.name}`}
        suppressHydrationWarning
        className="group fixed inset-0 z-[10000] overflow-hidden data-[state=done]:hidden data-[state=exit]:pointer-events-none data-[state=off]:hidden data-[state=on]:bg-[#0E2417] motion-reduce:transition-opacity motion-reduce:duration-500 motion-reduce:data-[state=exit]:opacity-0"
      >
        <canvas aria-hidden="true" suppressHydrationWarning className="absolute inset-0 size-full" />
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-overlay transition-opacity duration-300 group-data-[state=exit]:opacity-0"
          style={{ backgroundImage: GRAIN, backgroundSize: "120px 120px" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-500 group-data-[state=exit]:opacity-0"
          style={{ backgroundImage: VIGNETTE }}
        />

        <div className="absolute inset-0 flex items-center justify-center p-16 transition duration-300 group-data-[state=exit]:scale-95 group-data-[state=exit]:opacity-0">
          <div className="rounded-large-cards border border-snow-white/10 bg-[#0E2417]/70 px-32 py-24 backdrop-blur-md animate-in fade-in zoom-in-95 duration-700 motion-reduce:animate-none md:px-48 md:py-32">
            <Logo tone="light" />
          </div>
        </div>
      </div>
      <InlineScript
        html={`(${runDitherLoader.toString()})(${JSON.stringify(LOADER)},${ditherScene.toString()})`}
      />
    </>
  );
}
