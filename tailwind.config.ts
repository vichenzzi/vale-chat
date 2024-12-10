import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#6c68df",
        secondary: "#f3f3f3",
      },
      width: {
        chatBox: "calc(100% - 31rem)"
      },
      minWidth: {
        chatMin: '23rem'
      }
    },
  },
  plugins: [],
} satisfies Config;
