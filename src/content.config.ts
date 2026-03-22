import { docsLoader } from "@astrojs/starlight/loaders"
import { docsSchema } from "@astrojs/starlight/schema"
import { defineCollection, z } from "astro:content"

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /** 周刊期号展示用（如 `2026 · 第 1 期`）；博客可不写 */
        weeklyLabel: z.string().optional(),
        /**
         * 首页卡片封面：可为 `src/assets/` 下相对路径（如 `weekly/weekly-01-01.jpeg`），
         * 或 `https://...` 外链。与 `weeklyLabel` 并列各写一行即可。
         */
        feedCover: z.string().optional(),
      }),
    }),
  }),
}
