import { docsLoader } from "@astrojs/starlight/loaders"
import { docsSchema } from "@astrojs/starlight/schema"
import { defineCollection, z } from "astro:content"

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /**
         * 首页卡片封面：`images/…` 表示与该篇 md 同级的 `images/` 目录；
         * 或 `src/assets/` 下相对路径；或 `https://...`。
         */
        feedCover: z.string().optional(),
        /** 为 `true` 时优先排在首页「博客」栏前部；不足 20 条时其余文章按 `publishedAt` 倒序补足 */
        homeFeed: z.boolean().optional(),
        /** 首页卡片日期与排序依据（时间倒序）；YAML 可写 `2026-03-21` */
        publishedAt: z.coerce.date().optional(),
        /**
         * 子目录的 `index` 页可设：侧栏折叠分组标题（目录文件夹名用英文 slug，URL 无中文）。
         * 见 `navigation.ts` patch `sidebarGroupLabelFromDir`。
         */
        sidebarGroupLabel: z.string().optional(),
      }),
    }),
  }),
}
