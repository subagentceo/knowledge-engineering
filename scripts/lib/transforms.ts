// scripts/lib/transforms.ts
//
// Phase 1.A. Per-vendor URL transform strategies. Each strategy takes a
// canonical URL from llms.txt and returns the actual URL to fetch, plus
// the headers to send and a body validator that decides whether the
// response is acceptable.
//
// Citations:
//   @cite seeds/posture/session-start.xml          (.md-first hard rules per host)
//   @cite seeds/prompts/operator-2026-05-10-followup.md (Cloudflare-only HTML/JS rejection)
//   @cite vendor/anthropics/code.claude.com/docs/en/commands.md           (markdown-doc precedent)
//   @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md  (.md-first example)
//   @cite vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md  (neon.com/guides .md-first)
//
// Pure functions: no fetches, no I/O. The fetch loop is in
// scripts/crawl-vendors.ts.

export type TransformName =
  | "verbatim"
  | "append-md"
  | "append-md-and-accept"
  | "cloudflare-index-md"
  | "anthropic-mdfirst"
  | "support-mdfirst"
  | "accept-only"
  | "html-extract";

export interface TransformOutput {
  fetchUrl: string;
  headers: Record<string, string>;
  /** Returns true if the body should be saved; false otherwise. */
  validateBody: (contentType: string | null, body: string) => boolean;
  /** Optional body post-process (e.g. HTML→Markdown for `html-extract`). */
  postProcess?: (body: string) => string;
}

const KNOWN_EXT_RE = /\.[a-z0-9]+$/i;

const looksLikeHtml = (body: string): boolean => {
  const head = body.slice(0, 80).toLowerCase().trim();
  return head.startsWith("<!doctype") || head.startsWith("<html");
};

const acceptMarkdown: Record<string, string> = {
  Accept: "text/markdown",
};

/**
 * verbatim — URL already carries `.md` (e.g. turbopuffer's docs).
 */
export function verbatim(url: string): TransformOutput {
  return {
    fetchUrl: url,
    headers: {},
    validateBody: (_ct, body) => !looksLikeHtml(body),
  };
}

/**
 * append-md — append `.md` to the path if the last segment lacks an
 * extension. Used by anthropics + modelcontextprotocol.
 */
export function appendMd(url: string): TransformOutput {
  const u = new URL(url);
  const path = u.pathname;
  if (!KNOWN_EXT_RE.test(path) && !path.endsWith("/")) {
    u.pathname = `${path}.md`;
  } else if (path.endsWith("/")) {
    u.pathname = `${path}index.md`;
  }
  return {
    fetchUrl: u.toString(),
    headers: {},
    validateBody: (_ct, body) => !looksLikeHtml(body),
  };
}

/**
 * append-md-and-accept — appendMd + Accept: text/markdown header.
 * Used by stripe, twilio, sentry, neon root docs.
 */
export function appendMdAndAccept(url: string): TransformOutput {
  return {
    ...appendMd(url),
    headers: { ...acceptMarkdown },
  };
}

/**
 * cloudflare-index-md — for `developers.cloudflare.com`, append
 * `/index.md` if no extension. NEVER accept HTML/JS responses
 * (operator hard rule).
 */
export function cloudflareIndexMd(url: string): TransformOutput {
  const u = new URL(url);
  if (u.host !== "developers.cloudflare.com") {
    // Fall back to appendMd shape but enforce the same hard reject.
    return {
      ...appendMd(url),
      validateBody: (ct, body) => {
        if (ct && /text\/html/i.test(ct)) return false;
        return !looksLikeHtml(body);
      },
    };
  }
  if (!u.pathname.endsWith("/index.md")) {
    if (KNOWN_EXT_RE.test(u.pathname)) {
      // Already extension-bearing; keep as is.
    } else {
      u.pathname = u.pathname.replace(/\/?$/, "/index.md");
    }
  }
  return {
    fetchUrl: u.toString(),
    headers: { ...acceptMarkdown },
    validateBody: (ct, body) => {
      if (ct && /text\/html/i.test(ct)) return false;
      return !looksLikeHtml(body);
    },
  };
}

/**
 * anthropic-mdfirst — for `code.claude.com`, `platform.claude.com`,
 * `claude.com/docs`, `neon.com/guides`. Append `.md`; reject HTML.
 */
const ANTHROPIC_HOSTS = new Set(["code.claude.com", "platform.claude.com", "claude.com"]);
const ANTHROPIC_PATH_PREFIXES: Record<string, string[]> = {
  "claude.com": ["/docs"],
  "neon.com": ["/guides"],
};

export function anthropicMdFirst(url: string): TransformOutput {
  const u = new URL(url);
  const isClaudeHost = ANTHROPIC_HOSTS.has(u.host);
  const prefixOk =
    isClaudeHost ||
    (ANTHROPIC_PATH_PREFIXES[u.host] ?? []).some((p) => u.pathname.startsWith(p));
  if (prefixOk && !KNOWN_EXT_RE.test(u.pathname) && !u.pathname.endsWith("/")) {
    u.pathname = `${u.pathname}.md`;
  } else if (prefixOk && u.pathname.endsWith("/")) {
    u.pathname = `${u.pathname}index.md`;
  }
  return {
    fetchUrl: u.toString(),
    headers: { ...acceptMarkdown },
    validateBody: (ct, body) => {
      if (ct && /text\/html/i.test(ct)) return false;
      return !looksLikeHtml(body);
    },
  };
}

/**
 * support-mdfirst — for Intercom-style support.claude.com articles.
 * Appends `.md` to `/en/articles/<id>-<slug>` URLs and sends
 * `Accept: text/markdown`. Validates the response is actually
 * markdown (the live probe confirmed `Content-Type: text/markdown`
 * when the suffix is present). Reject HTML responses — those
 * indicate the help-center fell back to the Intercom widget shell.
 */
export function supportMdFirst(url: string): TransformOutput {
  const u = new URL(url);
  if (!KNOWN_EXT_RE.test(u.pathname) && !u.pathname.endsWith("/")) {
    u.pathname = `${u.pathname}.md`;
  } else if (u.pathname.endsWith("/")) {
    u.pathname = `${u.pathname}index.md`;
  }
  return {
    fetchUrl: u.toString(),
    headers: { ...acceptMarkdown },
    validateBody: (ct, body) => {
      if (ct && /text\/html/i.test(ct)) return false;
      return !looksLikeHtml(body);
    },
  };
}

/**
 * accept-only — URL unchanged; send Accept: text/markdown. Reserved
 * for hosts that negotiate format without path rewriting.
 */
export function acceptOnly(url: string): TransformOutput {
  return {
    fetchUrl: url,
    headers: { ...acceptMarkdown },
    validateBody: (_ct, body) => !looksLikeHtml(body),
  };
}

/**
 * html-extract — fetch HTML, run turndown to convert to markdown.
 * Used by brave-search, intercom, sift, arkose-labs (vendors with
 * no .md endpoint and no llms.txt-friendly negotiation).
 *
 * Turndown is loaded lazily inside crawl-vendors.ts; this transform
 * just declares the intent; the post-process function is wired by
 * the caller because turndown's instance carries config.
 */
export function htmlExtract(url: string, postProcess: (body: string) => string): TransformOutput {
  return {
    fetchUrl: url,
    headers: {},
    validateBody: () => true, // accept HTML; postProcess converts
    postProcess,
  };
}

export const TRANSFORMS = {
  verbatim,
  "append-md": appendMd,
  "append-md-and-accept": appendMdAndAccept,
  "cloudflare-index-md": cloudflareIndexMd,
  "anthropic-mdfirst": anthropicMdFirst,
  "support-mdfirst": supportMdFirst,
  "accept-only": acceptOnly,
} satisfies Partial<Record<TransformName, (url: string) => TransformOutput>>;
