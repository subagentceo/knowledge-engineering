/**
 * infra/crawler/types.ts
 * Type-safe interfaces for sitemap crawler → markdown pipeline.
 * All interfaces are fed through ts-to-zod (run: npx ts-to-zod types.ts -o types.zod.ts)
 * Markdown must conform to CommonMark spec before storage.
 */

import { z } from "zod";

// ── Application catalog ───────────────────────────────────────────────────────

/** Functional category of the application — Kimball device_type dimension */
export const AppDeviceTypeSchema = z.enum([
  "ai_assistant",         // Claude, Copilot, Antigravity
  "browser",             // Chrome, Firefox, Safari
  "developer_tool",      // VSCode, Xcode, Docker, DBeaver, Zed, Ghostty
  "productivity",        // Office, iWork, Dropbox, OneDrive
  "communication",       // Slack, Telegram, Outlook, Helm
  "project_management",  // Linear, Jira, Confluence
  "design",              // Canva, Hype4
  "media",               // VLC, Rev
  "networking_security", // Tailscale, WireGuard, Karabiner
  "system_utility",      // Stats, Amphetamine, Rectangle
  "business",            // Stripe
  "education",           // Swift Playground
  "unknown",
]);
export type AppDeviceType = z.infer<typeof AppDeviceTypeSchema>;

/** Runtime/delivery mechanism of the application */
export const AppRuntimeSchema = z.enum([
  "native_macos",    // Pure SwiftUI/AppKit/Cocoa
  "electron",        // Electron framework detected
  "java_jvm",        // Java/Kotlin JVM (DBeaver etc.)
  "web_shortcut",    // Google Drive app shortcuts (PWA wrappers)
  "universal_binary",// fat binary — not otherwise classified
  "unknown",
]);
export type AppRuntime = z.infer<typeof AppRuntimeSchema>;

export const ApplicationSchema = z.object({
  appName:       z.string().min(1),
  appPath:       z.string().min(1),
  bundleId:      z.string().optional(),
  version:       z.string().optional(),
  minOsVersion:  z.string().optional(),
  deviceType:    AppDeviceTypeSchema,
  runtime:       AppRuntimeSchema,
  lsCategory:    z.string().optional(),   // LSApplicationCategoryType value
  vendor:        z.string().optional(),   // derived from bundle ID prefix
  isElectron:    z.boolean().default(false),
  crawledAt:     z.string().datetime({ offset: true }),
});
export type Application = z.infer<typeof ApplicationSchema>;

// ── Tailscale device registry ─────────────────────────────────────────────────

export const TailscaleOsSchema = z.enum(["macOS", "windows", "iOS", "linux", "android", "unknown"]);
export type TailscaleOs = z.infer<typeof TailscaleOsSchema>;

export const TailscaleDeviceSchema = z.object({
  deviceName:       z.string().min(1),
  deviceId:         z.string().min(1),
  managedBy:        z.string().optional(),
  creator:          z.string().optional(),
  os:               TailscaleOsSchema,
  osVersion:        z.string().optional(),
  domain:           z.string().optional(),          // FQDN on tailnet
  tailscaleVersion: z.string().optional(),
  tailscaleIps:     z.array(z.string()),             // IPv4 + IPv6
  keyExpiry:        z.string().datetime({ offset: true }).optional(),
  createdAt:        z.string().datetime({ offset: true }),
  lastSeen:         z.string().datetime({ offset: true }).optional(),
  isSubnetRouter:   z.boolean().default(false),
  isExitNode:       z.boolean().default(false),
  isEphemeral:      z.boolean().default(false),
  tailscaleSsh:     z.boolean().default(false),
  tailnet:          z.string().optional(),           // e.g. tail5af6de.ts.net
});
export type TailscaleDevice = z.infer<typeof TailscaleDeviceSchema>;

// ── Measure type enum (Kimball) ───────────────────────────────────────────────

export const MeasureTypeSchema = z.enum([
  // Kimball legacy
  "additive",
  "semi_additive",
  "non_additive",
  "average",
  "rate",
  "duration",
  "derived",
  // Cube.dev native
  "count",
  "count_distinct",
  "count_distinct_approx",
  "sum",
  "avg",
  "min",
  "max",
  "number",
]);
export type MeasureType = z.infer<typeof MeasureTypeSchema>;

export const KIMBALL_TO_CUBE_MEASURE: Record<MeasureType, string> = {
  additive: "sum", semi_additive: "sum", non_additive: "number",
  average: "avg", rate: "number", duration: "number", derived: "number",
  count: "count", count_distinct: "count_distinct",
  count_distinct_approx: "count_distinct_approx",
  sum: "sum", avg: "avg", min: "min", max: "max", number: "number",
};

// ── Sitemap entry ─────────────────────────────────────────────────────────────

export const SitemapEntrySchema = z.object({
  loc: z.string().url(),
  lastmod: z.string().datetime({ offset: true }).optional(),
  /** Derived from loc — never stored as raw HTML */
  urlPath: z.string(),
  /** e.g. "research" | "engineering" | "solutions" */
  section: z.string(),
  site: z.enum(["anthropic.com", "claude.com", "support.claude.com", "platform.claude.com"]),
});
export type SitemapEntry = z.infer<typeof SitemapEntrySchema>;

// ── Parsed page ───────────────────────────────────────────────────────────────

export const PageMetaSchema = z.object({
  url: z.string().url(),
  urlPath: z.string(),
  site: z.enum(["anthropic.com", "claude.com", "support.claude.com", "platform.claude.com"]),
  section: z.string(),
  title: z.string(),
  description: z.string().optional(),
  publishedAt: z.string().datetime({ offset: true }).optional(),
  lastmod: z.string().datetime({ offset: true }).optional(),
  /** SHA-256 of markdown content — used as Redis field and AlloyDB dedup key */
  contentHash: z.string().length(64),
  /** PDF hrefs found on page (relative → absolute resolved) */
  pdfUrls: z.array(z.string().url()),
  crawledAt: z.string().datetime({ offset: true }),
});
export type PageMeta = z.infer<typeof PageMetaSchema>;

// ── CommonMark document ───────────────────────────────────────────────────────
// Markdown MUST parse cleanly through commonmark before storage.
// Use MarkdownDoc — never store raw HTML.

export const MarkdownSectionSchema = z.object({
  level: z.number().int().min(1).max(6),
  heading: z.string().min(1),
  /** CommonMark-valid body text */
  body: z.string(),
  /** Nested subsections */
  children: z.array(z.lazy((): z.ZodTypeAny => MarkdownSectionSchema)).optional(),
});
export type MarkdownSection = z.infer<typeof MarkdownSectionSchema>;

export const MarkdownDocSchema = z.object({
  meta: PageMetaSchema,
  /** Full CommonMark markdown string — validated by commonmark parser */
  markdown: z.string().min(1),
  /** Structured sections (h1-h6 tree) */
  sections: z.array(MarkdownSectionSchema),
  /** All links found in document */
  links: z.array(z.object({ text: z.string(), href: z.string() })),
  /** Code blocks with language tag */
  codeBlocks: z.array(z.object({ lang: z.string(), code: z.string() })),
  /** Word count of plain-text content */
  wordCount: z.number().int().nonnegative(),
});
export type MarkdownDoc = z.infer<typeof MarkdownDocSchema>;

// ── Redis key taxonomy ────────────────────────────────────────────────────────
// Deterministic: URL → key. Never guess a key.

export function crawlKey(site: string, urlPath: string, type: "md" | "meta" | "pdf"): string {
  const clean = urlPath.replace(/^\/|\/$/g, "").replace(/\//g, ":");
  return `e2m:crawl:${site}:${type}:${clean}`;
}

export const CRAWL_KEYS = {
  /** Sitemap XML cache */
  sitemap: (site: string) => `e2m:crawl:sitemap:${site}`,
  /** Markdown content for a page */
  markdown: (site: string, urlPath: string) => crawlKey(site, urlPath, "md"),
  /** Page metadata JSON */
  meta: (site: string, urlPath: string) => crawlKey(site, urlPath, "meta"),
  /** PDF bytes / extracted text */
  pdf: (pdfUrl: string) => `e2m:crawl:pdf:${Buffer.from(pdfUrl).toString("base64url").slice(0, 48)}`,
  /** Bloom filter — seen URLs */
  seen: (site: string) => `e2m:crawl:seen:${site}`,
  /** Queue of pending URLs */
  queue: (site: string, section: string) => `e2m:crawl:queue:${site}:${section}`,
} as const;

// ── Crawl result (what gets persisted) ───────────────────────────────────────

export const CrawlResultSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("ok"),
    doc: MarkdownDocSchema,
    fromCache: z.boolean(),
    durationMs: z.number(),
  }),
  z.object({
    status: z.literal("skip"),
    reason: z.enum(["seen", "filtered", "no_content"]),
    url: z.string().url(),
  }),
  z.object({
    status: z.literal("error"),
    url: z.string().url(),
    error: z.string(),
    durationMs: z.number(),
  }),
]);
export type CrawlResult = z.infer<typeof CrawlResultSchema>;
