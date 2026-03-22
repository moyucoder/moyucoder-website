import type { ImageMetadata } from "astro"
import { feedDefaults } from "../../config.mjs"
import weeklySvgFallback from "../assets/weekly/weekly-hero-scribble.svg?url"

export type FeedColumn = "weekly" | "blog"

export type FeedVisual =
  | { kind: "raster"; src: ImageMetadata }
  | { kind: "svg"; src: string }
  | { kind: "remote"; src: string }
  | { kind: "none" }

const rasterModules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/**/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true, import: "default" },
)

const svgUrlModules = import.meta.glob<string>("../assets/**/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
})

function assetKey(pathFromAssets: string): string {
  return `../assets/${pathFromAssets.replace(/^\/+/, "")}`
}

function rasterAt(pathFromAssets: string): ImageMetadata | undefined {
  return rasterModules[assetKey(pathFromAssets)] as ImageMetadata | undefined
}

function svgUrlAt(pathFromAssets: string): string | undefined {
  return svgUrlModules[assetKey(pathFromAssets)] as string | undefined
}

function isHttpUrl(s: string): boolean {
  return /^https?:\/\//i.test(s.trim())
}

/** 本地路径相对 `src/assets/`；找不到返回 null */
function resolveLocalPath(pathFromAssets: string): FeedVisual | null {
  if (pathFromAssets.endsWith(".svg")) {
    const url = svgUrlAt(pathFromAssets)
    return url ? { kind: "svg", src: url } : null
  }
  const raster = rasterAt(pathFromAssets)
  return raster ? { kind: "raster", src: raster } : null
}

/**
 * 解析单条 `feedCover` 或默认图字符串：`https?://` 为外链；否则按 `src/assets/` 下路径。
 */
function resolveFeedCoverString(raw: string, column: FeedColumn): FeedVisual {
  const t = raw.trim()
  if (!t) {
    if (column === "blog") return { kind: "none" }
    const def = typeof feedDefaults.weekly === "string" ? feedDefaults.weekly.trim() : ""
    if (!def) return { kind: "svg", src: weeklySvgFallback }
    return resolveFeedCoverString(def, "weekly")
  }

  if (isHttpUrl(t)) return { kind: "remote", src: t.trim() }

  const pathFromAssets = t.replace(/^\/+/, "")
  const local = resolveLocalPath(pathFromAssets)
  if (local) return local

  if (column === "blog") return { kind: "none" }
  return { kind: "svg", src: weeklySvgFallback }
}

/** 首页卡片：frontmatter `feedCover` 优先；博客无则用灰块；周刊无则用 `config.mjs` → `feedDefaults.weekly` */
export function resolveFeedVisual(feedCover: string | undefined, column: FeedColumn): FeedVisual {
  const primary = feedCover?.trim() ?? ""
  if (column === "blog") {
    if (!primary) return { kind: "none" }
    return resolveFeedCoverString(primary, "blog")
  }
  return resolveFeedCoverString(primary, "weekly")
}
