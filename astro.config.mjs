// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import config from "./config.mjs"
import { rehypeHeadingIds } from "@astrojs/markdown-remark"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

const basePath = (process.env.BASE_PATH || "").replace(/\/$/, "") || undefined

// https://astro.build/config
export default defineConfig({
  site: config.url,
  ...(basePath ? { base: basePath } : {}),
  output: "static",
  trailingSlash: "always",
  devToolbar: {
    enabled: false,
  },
  server: {
    host: "0.0.0.0",
  },
  /**
   * 绑定 0.0.0.0 时，Vite 默认可能用「某块网卡」的地址做 HMR WebSocket（多网卡 / VPN 常见），
   * 浏览器端连不上则不会收到 full-reload，改 md 后页面不刷新。固定用本机回环即可恢复。
   * 若需在另一台设备上开页面并要热更新，可临时去掉 hmr.host 或改为该机可达的 IP。
   */
  vite: {
    server: {
      hmr: {
        protocol: "ws",
        host: "127.0.0.1",
      },
    },
  },
  markdown: {
    rehypePlugins: [rehypeHeadingIds, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
  integrations: [
    starlight({
      title: "摸鱼编程",
      components: {
        Header: "./src/components/StarlightHeader.astro",
        SiteTitle: "./src/components/StarlightSiteTitle.astro",
        Footer: "./src/components/Footer.astro",
      },
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
          dir: "ltr",
        },
      },
      favicon: "/logo.png",
      pagefind: false,
      lastUpdated: true,
      expressiveCode: { themes: ["github-light", "github-dark"] },
      social: [{ icon: "github", label: "GitHub", href: config.github }],
      editLink: {
        baseUrl: `${config.github}/edit/main/`,
      },
      markdown: {
        headingLinks: false,
      },
      /** 右侧「本页目录」默认只到 h3；周刊/博客常用 #### 作条目标题，需纳入锚点 */
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      customCss: ["./src/styles/starlight-brand.css", "./src/styles/ide-chrome.css"],
      logo: {
        light: "./src/assets/logo-light.png",
        dark: "./src/assets/logo-dark.png",
        replacesTitle: true,
      },
      /**
       * 用 autogenerate 按当前内容集合生成侧栏，删文后不会残留 slug，避免
       * `The slug "blog/..." specified in the Starlight sidebar config does not exist`。
       * 开发时配合 patches 中「DEV 不缓存侧栏」与内容同步，本地增删 md 不报错。
       */
      sidebar: [
        {
          label: "文档",
          collapsed: false,
          autogenerate: { directory: "blog" },
        },
      ],
      sidebarByLocale: {
        weekly: [
          {
            label: "周刊",
            collapsed: false,
            autogenerate: { directory: "weekly" },
          },
        ],
      },
    }),
  ],
})
