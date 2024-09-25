import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "rgb(var(--color-background-primary) / <alpha-value>)", // 主要背景颜色，带有透明度
        secondary: "rgb(var(--color-background-secondary) / <alpha-value>)", // 次要背景颜色，带有透明度
        base: "rgb(var(--color-background-base) / <alpha-value>)",
        separator: "rgb(var(--color-separator) / <alpha-value>)" // 通用背景颜色，带有透明度
      },
      textColor: {
        common: "rgb(var(--color-text-base) / <alpha-value>)", // 通用文本颜色，带有透明度
        baseC: "rgb(var(--color-text-base) / <alpha-value>)", // 通用文本颜色，带有透明度
        mutedC: "rgb(var(--color-text-muted) / <alpha-value>)", // 辅助文本颜色，带有透明度
        inverted: "rgb(var(--color-text-inverted) / <alpha-value>)", // 插入文本颜色，带有透明度
        primary: "rgb(var(--color-text-primary) / <alpha-value>)", // 主要文本颜色，带有透明度
        secondary: "rgb(var(--color-text-secondary) / <alpha-value>)", // 次要文本颜色，带有透明度
        danger: "rgb(var( --color-error) / <alpha-value>)",
        commonBlue: "rgb(var( --color-common-blue) / <alpha-value>)"
      },
      borderColor: {
        primary: "rgb(var(--color-border-primary) / <alpha-value>)", // 边框颜色，带有透明度
        base: "rgb(var(--color-border-base) / <alpha-value>)", // 通用边框颜色，带有透明度
        inverted: "rgb(var(--color-border-inverted) / <alpha-value>)", // 插入边框颜色，带有透明度
        secondary: "rgb(var(--color-border-secondary) / <alpha-value>)"
      },
      colors: {
        link: {
          DEFAULT: "rgb(var(--color-link) / <alpha-value>)", // 默认链接颜色，带有透明度
          hover: "rgb(var(--color-link-hover) / <alpha-value>)" // 链接悬停颜色，带有透明度
        }
      },
      fontFamily: {
        NotoSansHK: ["Noto Sans HK", "sans-serif"],
        LXGWWenKaiMonoTCHK: ["LXGW WenKai Mono TC", "monospace"],
        NotoSerifHK: ["Noto Serif HK", "serif"],
        CactusClassicalSerifHK: ["Cactus Classical Serif", "serif"],
        NotoSerifTC: ["Noto Serif TC", "serif"],
        NotoSansTC: ["Noto Sans TC", "sans-serif"],
        ZhiMangXing: ["Zhi Mang Xing", "cursive"]
      },
      fontSize: {
        small: ["var(--fontsize-xs)", "var(--line-height--xxs)"],
        muted: ["var(--fontsize-sm)", "var(--line-height--sm)"],
        base: ["var(--fontsize-base)", "var(--line-height--base)"],
        large: ["var(--fontsize-lg)", "var(--line-height--lg)"],
        larger: ["var(--fontsize-xl)", "var(--line-height--xl)"],
        largest: ["var(--fontsize-2xl)", "var(--line-height--2xl)"]
      },
      borderRadius: {
        base: "var(--rounded--base)",
        card: "var(--rounded--card)",
        button: "var(--rounded--button)",
        option: "var(--rounded--option)",
        bar: "var(--rounded--bar)"
      },
      gradientColorStops: {
        skin: {
          primary: "rgb(var(--color-background-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-background-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--color-gradient-tertiary) / <alpha-value>)",
          quaternary: "rgb(var(--color-gradient-quaternary) / <alpha-value>)"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
