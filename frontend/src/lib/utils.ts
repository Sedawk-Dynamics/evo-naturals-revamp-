import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// shadcn / 21st.dev components import `cn` from here. tailwind-merge is
// taught the DESIGN.md tokens, otherwise it mistakes e.g. `text-body-sm`
// for a colour and drops it when `text-snow-white` is also present.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["micro", "label", "caption", "body-sm", "body", "subheading", "heading-sm", "heading", "heading-lg", "display"],
        },
      ],
      "font-weight": [{ font: ["w350"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
