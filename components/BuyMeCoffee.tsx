// components/BuyMeACoffeeButton.tsx
// A standalone Buy Me a Coffee button component for Next.js projects using Tailwind CSS.
// Usage: <BuyMeACoffeeButton username="yourhandle" />

import React from "react";

export type BmcButtonProps = {
  /** Your Buy Me a Coffee handle (e.g., https://www.buymeacoffee.com/<username>) */
  username: string;
  /** Button label text */
  label?: string;
  /** Visual style */
  variant?: "solid" | "outline";
  /** Size */
  size?: "sm" | "md";
  /** Extra class names to tweak spacing in your layout */
  className?: string;
};

function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function CoffeeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 6.75A.75.75 0 0 1 3.75 6h11.5a.75.75 0 0 1 .743.648l.75 6a.75.75 0 0 1-.744.852H11a4.5 4.5 0 0 1-4.243 3h6.986a.75.75 0 0 1 0 1.5H6.757a4.5 4.5 0 0 1-4.48-4.08l-.5-4A.75.75 0 0 1 1.5 9h.986l-.236-1.887A.75.75 0 0 1 3 6.75ZM19.5 9a2.25 2.25 0 0 1 0 4.5h-.44l-.42-3.358A2.251 2.251 0 0 1 19.5 9Z"/>
    </svg>
  );
}

export default function BuyMeACoffeeButton({
  username,
  label = "Buy me a coffee",
  variant = "solid",
  size = "md",
  className,
}: BmcButtonProps) {
  const href = `https://www.buymeacoffee.com/${username}`;

  const base =
    "inline-flex items-center gap-2 rounded-2xl border transition shadow-sm hover:shadow-md active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500";

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
  } as const;

  const styles = {
    solid:
      "bg-amber-400 border-amber-400 text-black hover:bg-amber-300 dark:bg-amber-300 dark:border-amber-300",
    outline:
      "bg-white/80 border-amber-400 text-amber-700 hover:bg-amber-50 dark:bg-transparent dark:text-amber-300",
  } as const;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(base, sizes[size], styles[variant], className)}
      aria-label={label}
    >
      <CoffeeIcon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
      <span className="font-medium">{label}</span>
    </a>
  );
}

// -----------------------------------------------
// How to use:
// 1. Save this file as `components/BuyMeACoffeeButton.tsx`
// 2. Import it in your navbar or any component:
//    import BuyMeACoffeeButton from "./BuyMeACoffeeButton";
// 3. Add in JSX:
//    <BuyMeACoffeeButton username="yourhandle" />
// -----------------------------------------------
