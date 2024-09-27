/** @type {import('tailwindcss').Config} */

import {
  isolateInsideOfContainer,
  scopedPreflightStyles,
} from "tailwindcss-scoped-preflight";

export default {
  prefix: "tw-",
  darkMode: ["class"],
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      animation: {
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        gradient: {
          to: { "background-position": "200% center" },
        },
      },
      fontSize: {
        xs: "1.2rem",
        sm: "1.35rem", // 기본보다 조금 큰 값
        base: "1.4rem", // 기본보다 조금 큰 값
        lg: "1.45rem",
        xl: "1.55rem",
        "2xl": "1.55rem", // 기본 1.5rem에서 더 크게 설정
        "3xl": "1.9rem", // 1.875rem에서 조금 더 크게 설정
        "4xl": "2.5rem", // 2.25rem에서 더 크게 설정
        "5xl": "3.2rem", // 3rem에서 더 크게 설정
      },
      colors: {
        primary: {
          light: "#a78bfa",
          DEFAULT: "hsl(var(--primary))",
          dark: "#7c3aed",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          light: "#f9a8d4",
          DEFAULT: "hsl(var(--secondary))",
          dark: "#ec4899",
          foreground: "hsl(var(--secondary-foreground))",
        },
        chollianBg: "#000033",
        chollianText: "#33FF33",
        chollianAccent: "#00FFFF",
        chollianYellow: "#FFFF00",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        Freesentation: ["FreesentationL"],
        FreesentationB: ["FreesentationB"],
        Playwrite: ["Playwrite CA"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".script-root"),
    }),
  ],
};
