import { validateCommonmark } from "./html-to-markdown.js";

const DEFAULT_UA = "e2m-crawler/1.0 (+https://github.com/opencoworkers/e2m-workspaces)";
const DEFAULT_TIMEOUT_MS = 10_000;

/**
 * Try fetching {url}.md. Returns validated CommonMark string or null.
 * null means: fall through to HTML pipeline.
 */
export async function fetchMarkdownNative(
  url: string,
  opts?: { timeoutMs?: number; userAgent?: string },
): Promise<string | null> {
  const mdUrl = url.endsWith(".md") ? url : `${url}.md`;
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );
  try {
    const res = await fetch(mdUrl, {
      signal: controller.signal,
      headers: {
        Accept: "text/markdown, text/plain, */*",
        "User-Agent": opts?.userAgent ?? DEFAULT_UA,
      },
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.startsWith("text/")) return null;
    const body = await res.text();
    return validateCommonmark(body);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Parse llms.txt Markdown document → array of absolute URLs.
 * Extracts all [text](url) Markdown links and resolves against baseUrl.
 */
export function parseLlmsTxt(content: string, baseUrl: string): string[] {
  const base = new URL(baseUrl);
  const seen = new Set<string>();
  const results: string[] = [];
  const re = /\[[^\]]*\]\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    try {
      const abs = new URL(m[1], base).toString();
      if (!seen.has(abs)) { seen.add(abs); results.push(abs); }
    } catch { /* skip malformed URLs */ }
  }
  return results;
}
