/**
 * Shared helpers for the bridge lanes.
 *
 * - fetchText / fetchHtml: GET a public URL and return the body.
 * - jsonResult: wrap a JSON-serializable value in the MCP CallToolResult shape.
 * - normalizeSlug: accept either a full URL or a bare slug.
 */
const USER_AGENT = "knowledge-engineering-bridge/0.1 (+https://github.com/subagentceo/knowledge-engineering)";

export async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/plain, text/html;q=0.9, */*;q=0.5" },
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} for ${url}`);
  }
  return res.text();
}

export async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html, */*;q=0.8" },
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} for ${url}`);
  }
  return res.text();
}

export function jsonResult(value: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
  };
}

export function normalizeSlug(target: string, urlPrefix: string): string {
  if (target.startsWith(urlPrefix)) return target.slice(urlPrefix.length).replace(/\/$/, "");
  if (target.startsWith("http")) {
    throw new Error(`URL '${target}' does not match expected prefix '${urlPrefix}'`);
  }
  return target.replace(/^\//, "").replace(/\/$/, "");
}
