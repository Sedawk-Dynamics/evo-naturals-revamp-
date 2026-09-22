"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

export type GlassSlide = { title: string; description: string; image: string };

// WebGL image slider (from 21st.dev): each new image grows out of the
// centre as a refracting "glass bubble", the title re-animates letter by
// letter, and a lime line under each slide name counts down to the next.
// Sized to its parent (not the window), redraws only while a transition
// runs, and pauses its countdown while scrolled out of view.

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture1, uTexture2;
  uniform vec2 uTexture1Size, uTexture2Size, uResolution;
  uniform float uProgress;
  varying vec2 vUv;

  // Same as CSS object-fit: cover
  vec2 coverUv(vec2 uv, vec2 size) {
    vec2 s = uResolution / size;
    vec2 scaled = size * max(s.x, s.y);
    return (uv * uResolution - (uResolution - scaled) * 0.5) / scaled;
  }

  void main() {
    vec2 uv1 = coverUv(vUv, uTexture1Size);
    vec2 uv2 = coverUv(vUv, uTexture2Size);
    vec4 oldImg = texture2D(uTexture1, uv1);
    vec4 newImg = texture2D(uTexture2, uv2);

    // A circle grows from the centre; the new image inside it is refracted
    vec2 p = vUv * uResolution;
    vec2 c = uResolution * 0.5;
    float radius = uProgress * length(uResolution) * 0.85;
    float d = length(p - c);
    float nd = d / max(radius, 0.001);
    float inside = 1.0 - smoothstep(radius - 3.0, radius + 3.0, d);

    vec4 img = newImg;
    if (inside > 0.0) {
      float time = uProgress * 5.0;
      vec2 dir = d > 0.0 ? (p - c) / d : vec2(0.0);
      vec2 duv = uv2 - dir * 0.08 * pow(smoothstep(0.3, 1.0, nd), 1.5);
      duv += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * nd * inside;
      float ca = 0.02 * pow(smoothstep(0.3, 1.0, nd), 1.2);
      img = vec4(
        texture2D(uTexture2, duv + dir * ca * 1.2).r,
        texture2D(uTexture2, duv + dir * ca * 0.2).g,
        texture2D(uTexture2, duv - dir * ca * 0.8).b,
        1.0
      );
      // Faint glow on the bubble's rim
      img.rgb += smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd)) * 0.08;
    }
    // Settle onto the undistorted image at the very end
    if (uProgress > 0.95) img = mix(img, newImg, (uProgress - 0.95) / 0.05);
    gl_FragColor = mix(oldImg, img, inside);
  }
`;

// Each slide brings its title in differently (cycled by slide index)
const TITLE_INS: { from: gsap.TweenVars; to: gsap.TweenVars }[] = [
  { from: { y: 20 }, to: { y: 0, duration: 0.8, stagger: 0.03, ease: "power3.out" } },
  { from: { y: -20 }, to: { y: 0, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)" } },
  {
    from: { filter: "blur(10px)", scale: 1.5 },
    to: { filter: "blur(0px)", scale: 1, duration: 1, stagger: { amount: 0.5, from: "random" }, ease: "power2.out" },
  },
  { from: { scale: 0 }, to: { scale: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.5)" } },
  {
    from: { rotationX: 90, transformPerspective: 400 },
    to: { rotationX: 0, duration: 0.8, stagger: 0.04, ease: "power2.out" },
  },
  { from: { x: 30 }, to: { x: 0, duration: 0.8, stagger: 0.03, ease: "power3.out" } },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function GlassSlider({
  slides,
  slideDuration = 5,
  transitionDuration = 2.5,
  className = "",
}: {
  slides: GlassSlide[];
  /** Seconds each slide stays before moving on */
  slideDuration?: number;
  /** Seconds the glass transition takes */
  transitionDuration?: number;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const goToRef = useRef<(index: number) => void>(() => {});
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    if (!root || !canvas || !titleEl || !descEl) return;
    const fills = fillRefs.current;

    let current = 0;
    let transitioning = false;
    let inView = false;
    let started = false;
    let disposed = false;
    let textures: { map: THREE.Texture; size: THREE.Vector2 }[] | null = null;
    let countdown: gsap.core.Tween | null = null;
    let transition: gsap.core.Tween | null = null;
    let textSwap: gsap.core.Tween | null = null;

    // --- Title / description ------------------------------------------------
    const lettersOf = () => Array.from(titleEl.querySelectorAll<HTMLElement>("[data-letter]"));

    // One inline-block <span> per letter so each can animate on its own;
    // letters are grouped per word so lines only break between words.
    const setText = (i: number) => {
      gsap.killTweensOf(lettersOf());
      const words = slides[i].title.split(" ").map((word) => {
        const w = document.createElement("span");
        w.className = "inline-block whitespace-nowrap";
        w.setAttribute("aria-hidden", "true");
        for (const ch of word) {
          const l = document.createElement("span");
          l.className = "inline-block";
          l.dataset.letter = "";
          l.textContent = ch;
          w.append(l);
        }
        return w;
      });
      titleEl.replaceChildren(...words.flatMap((w, j) => (j ? [" ", w] : [w])));
      titleEl.setAttribute("aria-label", slides[i].title);
      descEl.textContent = slides[i].description;
    };

    const playTextIn = (i: number) => {
      const { from, to } = TITLE_INS[i % TITLE_INS.length];
      gsap.fromTo(lettersOf(), { opacity: 0, ...from }, { opacity: 1, ...to });
      gsap.fromTo(descEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
    };

    const changeText = (i: number) => {
      gsap.to(lettersOf(), { y: -20, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power2.in" });
      gsap.to(descEl, { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" });
      textSwap = gsap.delayedCall(0.5, () => {
        setText(i);
        playTextIn(i);
      });
    };

    setText(0);
    gsap.set([...lettersOf(), descEl], { opacity: 0 });

    const killText = () => {
      textSwap?.kill();
      gsap.killTweensOf([...lettersOf(), descEl]);
    };

    // --- WebGL ----------------------------------------------------------------
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    } catch (err) {
      console.warn("GlassSlider: WebGL is unavailable, showing text only.", err);
      playTextIn(0);
      return killText;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const uniforms = {
      uTexture1: { value: null as THREE.Texture | null },
      uTexture2: { value: null as THREE.Texture | null },
      uTexture1Size: { value: new THREE.Vector2(1, 1) },
      uTexture2Size: { value: new THREE.Vector2(1, 1) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uProgress: { value: 0 },
    };
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene.add(new THREE.Mesh(geometry, material));
    const render = () => renderer.render(scene, camera);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = root;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);

    // --- Slide logic ----------------------------------------------------------
    // The lime line under the active slide fills up, then moves on
    const startCountdown = () => {
      countdown?.kill();
      const fill = fills[current];
      if (!fill) return;
      countdown = gsap.fromTo(
        fill,
        { scaleX: 0, opacity: 1 },
        {
          scaleX: 1,
          duration: slideDuration,
          ease: "none",
          paused: !inView,
          onComplete: () => goTo((current + 1) % slides.length),
        },
      );
    };

    const goTo = (target: number) => {
      if (!textures || transitioning || target === current) return;
      transitioning = true;
      countdown?.kill();
      const leaving = fills[current];
      if (leaving) gsap.to(leaving, { opacity: 0, duration: 0.3 });

      const from = textures[current];
      const to = textures[target];
      uniforms.uTexture1.value = from.map;
      uniforms.uTexture1Size.value = from.size;
      uniforms.uTexture2.value = to.map;
      uniforms.uTexture2Size.value = to.size;

      changeText(target);
      current = target;
      setActive(target);

      transition = gsap.fromTo(
        uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: transitionDuration,
          ease: "power2.inOut",
          onUpdate: render,
          onComplete: () => {
            uniforms.uProgress.value = 0;
            uniforms.uTexture1.value = to.map;
            uniforms.uTexture1Size.value = to.size;
            render();
            transitioning = false;
            startCountdown();
          },
        },
      );
    };
    goToRef.current = goTo;

    // The intro plays the first time the card is on screen with images ready
    const start = () => {
      if (started || !textures || !inView) return;
      started = true;
      playTextIn(0);
      startCountdown();
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      countdown?.paused(!inView);
      start();
    });
    intersectionObserver.observe(root);

    const loader = new THREE.TextureLoader();
    Promise.all(
      slides.map(async (s) => {
        const map = await loader.loadAsync(s.image);
        map.minFilter = map.magFilter = THREE.LinearFilter;
        map.generateMipmaps = false;
        const img = map.image as HTMLImageElement;
        return { map, size: new THREE.Vector2(img.width, img.height) };
      }),
    ).then(
      (loaded) => {
        if (disposed) {
          loaded.forEach((t) => t.map.dispose());
          return;
        }
        textures = loaded;
        uniforms.uTexture1.value = uniforms.uTexture2.value = loaded[0].map;
        uniforms.uTexture1Size.value = uniforms.uTexture2Size.value = loaded[0].size;
        render();
        setReady(true);
        start();
      },
      (err) => {
        if (disposed) return;
        console.warn("GlassSlider: could not load slide images, showing text only.", err);
        playTextIn(0);
      },
    );

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      countdown?.kill();
      transition?.kill();
      killText();
      gsap.killTweensOf(fills.filter(Boolean));
      textures?.forEach((t) => t.map.dispose());
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [slides, slideDuration, transitionDuration]);

  return (
    <div ref={rootRef} className={`relative overflow-hidden bg-forest-depths text-snow-white ${className}`}>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 size-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      />
      {/* Darkens the top and bottom so the text reads on any photo */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-forest-depths/85 via-forest-depths/0 via-45% to-forest-depths/30" />

      <div className="absolute inset-0 flex flex-col justify-between p-24 md:p-32">
        <p
          className={`font-seed-sans-mono text-label font-light tracking-mono transition-opacity duration-700 ${ready ? "" : "opacity-0"}`}
        >
          <span className="text-lime-pulse">{pad(active + 1)}</span>
          <span className="text-snow-white/60"> / {pad(slides.length)}</span>
        </p>

        <div>
          <h3 ref={titleRef} className="text-subheading font-w350 md:text-heading" />
          <p ref={descRef} className="mt-8 max-w-[380px] text-caption font-w350 text-snow-white/80 md:text-body-sm" />

          <nav
            aria-label="Slides"
            className={`mt-24 grid gap-8 transition-opacity duration-700 md:gap-16 ${ready ? "" : "pointer-events-none opacity-0"}`}
            style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}
          >
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                aria-label={slide.title}
                aria-current={i === active ? "true" : undefined}
                onClick={() => goToRef.current(i)}
                className="group py-8 text-left"
              >
                <span className="relative block h-[2px] overflow-hidden bg-snow-white/25">
                  <span
                    ref={(el) => {
                      fillRefs.current[i] = el;
                    }}
                    className="absolute inset-0 origin-left bg-lime-pulse"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
                <span
                  className={`mt-8 hidden truncate text-label transition-opacity sm:block ${
                    i === active ? "opacity-100" : "opacity-50 group-hover:opacity-80"
                  }`}
                >
                  {slide.title}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
