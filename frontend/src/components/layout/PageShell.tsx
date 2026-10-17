import type { ReactNode } from "react";
import { PromoBanner } from "./PromoBanner";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return <><PromoBanner /><Navbar /><main>{children}</main><Footer /></>;
}
