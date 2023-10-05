/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");

const regexPattern = /hsl\(|\)|,/g;
const convertHslToCssVar = (hsl) => hsl.replace(regexPattern, "");
const getGrayScaleForPalette = (paletteName) => {
  const mauveColors = [
    "tomato",
    "red",
    "ruby",
    "crimson",
    "pink",
    "plum",
    "purple",
    "violet",
  ];
  const slateColors = ["iris", "indigo", "blue", "sky", "cyan"];
  const sageColors = ["mint", "teal", "jade", "green"];
  const oliveColors = ["grass", "lime"];
  const sandColors = ["yellow", "amber", "orange", "brown"];
  if (mauveColors.some((c) => paletteName.startsWith(c))) {
    return paletteName.includes("Dark") ? `mauveDark` : "mauve";
  }
  if (slateColors.some((c) => paletteName.startsWith(c))) {
    return paletteName.includes("Dark") ? `slateDark` : "slate";
  }
  if (sageColors.some((c) => paletteName.startsWith(c))) {
    return paletteName.includes("Dark") ? `sageDark` : "sage";
  }
  if (oliveColors.some((c) => paletteName.startsWith(c))) {
    return paletteName.includes("Dark") ? `oliveDark` : "olive";
  }
  if (sandColors.some((c) => paletteName.startsWith(c))) {
    return paletteName.includes("Dark") ? `sandDark` : "sand";
  }
};
const convertRadixPaletteToShadTheme = (paletteName, className) => {
  const grayScaleName = getGrayScaleForPalette(paletteName);
  const grayScaleAccessor = grayScaleName.replace("Dark", "");
  const grayScale = require("@radix-ui/colors")[grayScaleName];
  const grayScaleDark = require("@radix-ui/colors")[`${grayScaleName}Dark`];
  const colorScaleAccessor = paletteName.replace("Dark", "");
  const colorScale = require("@radix-ui/colors")[paletteName];
  const colorScaleDark = require("@radix-ui/colors")[`${paletteName}Dark`];
  const makeColorGetter = (palette) => (number) =>
    convertHslToCssVar(palette[`${colorScaleAccessor}${number}`]);
  const getLightColor = makeColorGetter(colorScale);
  const getDarkColor = makeColorGetter(colorScaleDark);
  const makeGray = (number, isDark) => {
    const grayPalette = isDark ? grayScaleDark : grayScale;
    return convertHslToCssVar(grayPalette[`${grayScaleAccessor}${number}`]);
  };
  return {
    [className]: {
      "--background": makeGray(1),
      "--foreground": getLightColor(11),
      "--card": makeGray(2),
      "--card-foreground": makeGray(11),
      "--popover": makeGray(3),
      "--popover-foreground": getLightColor(12),
      "--primary": getLightColor(9),
      "--primary-foreground": getLightColor(12),
      "--secondary": "220 14.3% 95.9%",
      "--secondary-foreground": "220.9 39.3% 11%",
      "--muted": makeGray(3),
      "--muted-foreground": getLightColor(10),
      "--accent": getLightColor(10),
      "--accent-foreground": "220.9 39.3% 11%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "210 20% 98%",
      "--border": getLightColor(6),
      "--input": "220 13% 91%",
      "--ring": getLightColor(8),
      "--radius": "0.5rem",
    },
    [`${className}_dark`]: {
      "--background": makeGray(1, true),
      "--foreground": getDarkColor(11),
      "--card": makeGray(2, true),
      "--card-foreground": makeGray(11, true),
      "--popover": makeGray(3, true),
      "--popover-foreground": getDarkColor(12),
      "--primary": getDarkColor(9),
      "--primary-foreground": getDarkColor(12),
      "--secondary": "220 14.3% 95.9%",
      "--secondary-foreground": "220.9 39.3% 11%",
      "--muted": makeGray(3, true),
      "--muted-foreground": makeGray(10, true),
      "--accent": getDarkColor(10),
      "--accent-foreground": "220.9 39.3% 11%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "210 20% 98%",
      "--border": getDarkColor(6),
      "--input": "220 13% 91%",
      "--ring": getDarkColor(8),
      "--radius": "0.5rem",
    },
  };
};
const shadcnPlugin = plugin(
  ({ addBase }) => {
    addBase({
      ":root": {
        "--background": "0 0% 100%",
        "--foreground": "224 71.4% 4.1%",
        "--card": "0 0% 100%",
        "--card-foreground": "224 71.4% 4.1%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "224 71.4% 4.1%",
        "--primary": "210, 80%, 21%",
        "--primary-foreground": "210 20% 98%",
        "--secondary": "220 14.3% 95.9%",
        "--secondary-foreground": "220.9 39.3% 11%",
        "--muted": "220 14.3% 95.9%",
        "--muted-foreground": "220 8.9% 46.1%",
        "--accent": "220 14.3% 95.9%",
        "--accent-foreground": "220.9 39.3% 11%",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "210 20% 98%",
        "--border": "220 13% 91%",
        "--input": "220 13% 91%",
        "--ring": "262.1 83.3% 57.8%",
        "--radius": "0.5rem",
      },
      ".dark": {
        "--background": "224 71.4% 4.1%",
        "--foreground": "210 20% 98%",
        "--card": "224 71.4% 4.1%",
        "--card-foreground": "210 20% 98%",
        "--popover": "224 71.4% 4.1%",
        "--popover-foreground": "210 20% 98%",
        "--primary": "263.4 70% 50.4%",
        "--primary-foreground": "210 20% 98%",
        "--secondary": "215 27.9% 16.9%",
        "--secondary-foreground": "210 20% 98%",
        "--muted": "215 27.9% 16.9%",
        "--muted-foreground": "217.9 10.6% 64.9%",
        "--accent": "215 27.9% 16.9%",
        "--accent-foreground": "210 20% 98%",
        "--destructive": "0 62.8% 30.6%",
        "--destructive-foreground": "210 20% 98%",
        "--border": "215 27.9% 16.9%",
        "--input": "215 27.9% 16.9%",
        "--ring": "263.4 70% 50.4%",
        "--radius": "0.5rem",
      },
      // ...convertRadixPaletteToShadTheme("tomato", ".tomato"),
      // ...convertRadixPaletteToShadTheme("teal", ".teal"),
      // ...convertRadixPaletteToShadTheme("crimson", ".crimson"),
      ...convertRadixPaletteToShadTheme("cyan", ".cyan"),
    });
    addBase({
      "*": {
        "@apply border-border": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
        "font-feature-settings": '"rlig" 1, "calt" 1',
      },
    });
  },
  {
    darkMode: ["class"],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: `var(--radius)`,
          md: `calc(var(--radius) - 2px)`,
          sm: "calc(var(--radius) - 4px)",
        },
        // fontFamily: {
        //   sans: ['var(--font-inter)', ...fontFamily.sans],
        // },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
  }
);
/** @type {import('tailwindcss').Config} */
const preset = {
  content: [],
  darkMode: ["class"],
  plugins: [require("tailwindcss-animate"), shadcnPlugin],
  safelist: [
    "dark",
    "tomato",
    "tomato_dark",
    "teal",
    "teal_dark",
    "crimson",
    "crimson_dark",
    "cyan",
    "cyan_dark",
  ],
};

console.log(preset);

module.exports = preset;
