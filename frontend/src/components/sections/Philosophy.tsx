import { philosophy } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { GlassSlider } from "@/components/ui/glass-slider";

// "Built on Nature. Guided by Knowledge." — dark band, 40/60 split:
// text + numbered points left, WebGL glass image slider right.
export function Philosophy() {
  return (
    <Section tone="dark">
      <div className="grid items-center gap-64 lg:grid-cols-[2fr_3fr]">
        <div>
          <h2 className="text-heading-lg font-w350">{philosophy.title}</h2>
          <p className="mt-24 max-w-[440px] text-body font-w350 text-snow-white/80">{philosophy.body}</p>

          <ol className="mt-48 border-t border-snow-white/20">
            {philosophy.points.map((p, i) => (
              <li key={p} className="flex items-baseline gap-24 border-b border-snow-white/20 py-24">
                <span className="font-seed-sans-mono text-label font-light tracking-mono text-lime-pulse">
                  0{i + 1}
                </span>
                <span className="text-subheading font-w350">{p}</span>
              </li>
            ))}
          </ol>
        </div>

        <GlassSlider
          slides={philosophy.slides}
          className="aspect-[6/5] rounded-large-cards border-[1.5px] border-snow-white/20"
        />
      </div>
    </Section>
  );
}
