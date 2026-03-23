#!/usr/bin/env node
/**
 * Pagefind：仅索引文档（Starlight `pagefind` 关闭，避免与独立索引混用）。
 * 使用 micromatch 花括号同时匹配 `blog` 与 `daily`（勿经 shell 展开，故 `shell: false`）。
 */
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dist = join(root, "dist")
const out = join(dist, "pagefind")

console.log("[pagefind] blog + daily → pagefind/ (glob: {blog,daily}/**/*.html)")
const r = spawnSync(
  "npx",
  ["-y", "pagefind", "--site", dist, "--glob", "{blog,daily}/**/*.html", "--output-path", out],
  { stdio: "inherit", cwd: root, shell: false },
)
if (r.status !== 0) process.exit(r.status ?? 1)
