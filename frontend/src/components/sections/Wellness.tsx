import { wellness } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";

const categoryIcons: IconName[] = ["leaf", "shield", "sun", "moon", "sprout"];

// Wellness intro + the five wellness categories as cards.
export function Wellness() {
  return (
    <Section>
      <div className="max-w-[720px]">
        <h2 className="text-heading-lg font-w350">{wellness.title}</h2>
        <p className="mt-24 text-body font-w350 text-pewter">{wellness.body}</p>
      </div>

      <p className="mt-64 font-seed-sans-mono text-label font-light tracking-mono text-pewter uppercase">
        {wellness.categoriesTitle}
      </p>
      <ul className="mt-24 grid gap-16 sm:grid-cols-2 lg:grid-cols-5">
        {wellness.categories.map((c, i) => (
          <li key={c} className="flex min-h-[200px] flex-col rounded-cards bg-warm-stone p-24">
            <div className="flex items-center justify-between">
              <span className="font-seed-sans-mono text-label font-light tracking-mono text-pewter">
                0{i + 1}
              </span>
              <Icon name={categoryIcons[i]} size={22} />
            </div>
            <h3 className="mt-auto pt-40 text-subheading font-w350">{c}</h3>
          </li>
        ))}
      </ul>
    </Section>
  );
}
