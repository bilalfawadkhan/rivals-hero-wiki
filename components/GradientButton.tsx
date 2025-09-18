// app/components/GradientButton.tsx
"use client";

import React from "react";

type GradientButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

export default function GradientButton({
  label = "Button",
  className = "",
  ...props
}: GradientButtonProps) {
  return (
    <button
      className={[
        "relative inline-flex items-center justify-center p-0.5",
        "overflow-hidden text-[10px] md:text-sm font-medium rounded-lg group",
        // gold/navy color scheme from your screenshot
        "bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-400",
        "group-hover:from-yellow-700 group-hover:via-yellow-600 group-hover:to-yellow-500",
        "focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-700",
        className,
      ].join(" ")}
      {...props}
    >
      <span
        className={[
          "relative px-2 py-2 md:px-5 md:py-2 rounded-md transition-all ease-in duration-75",
          "bg-gray-900 text-white dark:bg-gray-800",
          "group-hover:bg-transparent group-hover:text-gray-900 dark:group-hover:text-white",
        ].join(" ")}
      >
        {label}
      </span>
    </button>
  );
}
