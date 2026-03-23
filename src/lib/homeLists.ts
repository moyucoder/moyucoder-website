import { existsSync, statSync } from "node:fs"
import { join } from "node:path"

function docFilePath(id: string): string {
  const base = join(process.cwd(), "src/content/docs", id)
  if (existsSync(`${base}.mdx`)) return `${base}.mdx`
  return `${base}.md`
}

export function mtimeMs(id: string): number {
  try {
    return statSync(docFilePath(id)).mtimeMs
  } catch {
    return 0
  }
}

type WithPublished = { id: string; data: { publishedAt?: Date | string } }

/** 解析 frontmatter `publishedAt`（Date 或 YAML 日期字符串） */
function publishedAtMs(entry: WithPublished): number | null {
  const p = entry.data.publishedAt
  if (p instanceof Date && !Number.isNaN(p.getTime())) return p.getTime()
  if (typeof p === "string" && p.trim()) {
    const t = new Date(p).getTime()
    if (!Number.isNaN(t)) return t
  }
  return null
}

/** 首页展示/排序时间：优先 `publishedAt`，否则回退文件 mtime */
export function publishedOrMtimeMs(entry: WithPublished): number {
  return publishedAtMs(entry) ?? mtimeMs(entry.id)
}

/** `daily/2026/…` 下的日刊正文（排除各级 index） */
export function isDailyIssueDocId(id: string): boolean {
  return /^daily\/\d{4}\//u.test(id) && !id.endsWith("/index")
}

/** `publishedAt` 对应的 `YYYY-MM-DD`，无则空串 */
export function publishedAtIsoDate(entry: WithPublished): string {
  const ms = publishedAtMs(entry)
  return ms === null ? "" : isoDate(ms)
}

/** `publishedAt` → 「3月20日」，无则空串 */
export function publishedAtZhMonthDay(entry: WithPublished): string {
  const iso = publishedAtIsoDate(entry)
  if (!iso) return ""
  const [, m, d] = iso.split("-")
  return `${parseInt(m, 10)}月${parseInt(d, 10)}日`
}

/** 日刊页 H1：与同页侧栏 `moyuDailySidebarLinkLabel` 一致，去掉前缀「M月d日」及紧随的中文冒号（若有）。 */
export function dailyHeadingTitle(
  id: string,
  data: { title?: string; publishedAt?: Date | string; sidebar?: { label?: string } },
): string {
  if (!isDailyIssueDocId(id)) return (data.title ?? "") as string

  const rawLabel =
    typeof data.sidebar?.label === "string" ? data.sidebar.label.trim() : ""
  if (rawLabel !== "") {
    const rest = rawLabel.replace(/^\d{1,2}月\d{1,2}日：?/, "").trim()
    if (rest !== "") return rest
    return ((data.title ?? "") as string).trim()
  }

  return ((data.title ?? "") as string).trim()
}

/** 首页日刊卡片：`M月d日` + 中文冒号 + `title`（侧栏同逻辑见 Starlight navigation patch） */
export function dailyCardMenuTitle(id: string, data: { title?: string; publishedAt?: Date | string }): string {
  if (!isDailyIssueDocId(id)) return (data.title ?? "") as string
  const md = publishedAtZhMonthDay({ id, data })
  const t = (data.title ?? "") as string
  return md ? `${md}：${t}` : t
}

/** 文档路由（含 GitHub Pages 子路径时的 `import.meta.env.BASE_URL`） */
export function hrefForDocId(id: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}${id}/`
}

export function formatDate(ms: number): string {
  if (!ms) return ""
  return new Date(ms).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

/** `YYYY-MM-DD` for `<time datetime>` */
export function isoDate(ms: number): string {
  if (!ms) return ""
  return new Date(ms).toISOString().slice(0, 10)
}
