"use client";

// A <script> that runs while the browser parses the server HTML — before
// React or any bundle has loaded. On the client React renders it as
// text/plain, so it never runs a second time and React's dev warning about
// <script> tags stays quiet; suppressHydrationWarning accepts the mismatch.
// (Pattern from Next's "preventing flash before hydration" guide.)
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
