import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090D16",
        surface: "#111827",
        "surface-glass": "rgba(17, 24, 39, 0.75)",
        solar: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        electric: {
          400: "#38BDF8",
          500: "#06B6D4",
          600: "#0284C7",
        },
        aluminum: {
          300: "#CBD5E1",
          400: "#94A3B8",
          600: "#475569",
          800: "#1E293B",
        }
      },
      boxShadow: {
        'solar-glow': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'electric-glow': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'solar-gradient': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'electric-gradient': 'linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)',
      }
    },
  },
  plugins: [],
};

export default config;
