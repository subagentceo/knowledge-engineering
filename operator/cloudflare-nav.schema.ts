/**
 * Type-safe schema + loader for operator/cloudflare-nav.yaml.
 *
 * Stabilizes the Cloudflare dashboard nav topology scraped via a Chrome-side
 * Claude agent. `.strict()` rejects typos; superRefine enforces unique section
 * ids and globally-unique account-scoped paths. Recents and zone-scoped
 * entries are first-class (no longer dropped as "dynamic").
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/structured-outputs.md
 */
import { z } from "zod";
import { readFileSync } from "node:fs";
import { parse as parseYaml } from "yaml";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const BadgeSchema = z.enum(["new", "beta", "alpha"]);
export type Badge = z.infer<typeof BadgeSchema>;

export const NavItemSchema = z
  .object({
    label: z.string().min(1),
    path: z.string().regex(/^\//, "path must start with '/'"),
    badge: BadgeSchema.optional(),
    absolute: z.literal(true).optional(),
  })
  .strict();
export type NavItem = z.infer<typeof NavItemSchema>;

export const NavSectionSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/, "id must be kebab-case"),
    label: z.string().min(1),
    group: z.string().min(1).optional(),
    badge: BadgeSchema.optional(),
    items: z.array(NavItemSchema).min(1),
  })
  .strict();
export type NavSection = z.infer<typeof NavSectionSchema>;

export const RecentItemSchema = z
  .object({
    label: z.string().min(1),
    path: z.string().regex(/^\//, "path must start with '/'"),
  })
  .strict();
export type RecentItem = z.infer<typeof RecentItemSchema>;

export const ZoneNavSchema = z
  .object({
    zone: z.string().regex(/^[a-z0-9.-]+$/, "zone must be a hostname"),
    items: z.array(NavItemSchema).min(1),
  })
  .strict();
export type ZoneNav = z.infer<typeof ZoneNavSchema>;

export const CloudflareNavSchema = z
  .object({
    accountId: z.string().regex(/^[a-f0-9]{32}$/, "32-char hex account id"),
    basePath: z.string().regex(/^\/[a-f0-9]{32}$/),
    sections: z.array(NavSectionSchema).min(1),
    recents: z.array(RecentItemSchema).default([]),
    zones: z.array(ZoneNavSchema).default([]),
  })
  .strict()
  .superRefine((nav, ctx) => {
    const ids = new Set<string>();
    const paths = new Set<string>();
    for (const s of nav.sections) {
      if (ids.has(s.id)) {
        ctx.addIssue({ code: "custom", message: `duplicate section id: ${s.id}` });
      }
      ids.add(s.id);
      for (const it of s.items) {
        if (paths.has(it.path)) {
          ctx.addIssue({ code: "custom", message: `duplicate path: ${it.path}` });
        }
        paths.add(it.path);
      }
    }
  });
export type CloudflareNav = z.infer<typeof CloudflareNavSchema>;

const ORIGIN = "https://dash.cloudflare.com";

/** Resolve an account-scoped nav item to a full dashboard URL. */
export function resolveUrl(nav: CloudflareNav, item: NavItem): string {
  return item.absolute ? `${ORIGIN}${item.path}` : `${ORIGIN}${nav.basePath}${item.path}`;
}

/** Resolve a zone-scoped item: /<zone>/<path>. */
export function resolveZoneUrl(zone: ZoneNav, item: NavItem): string {
  return `${ORIGIN}/${zone.zone}${item.path}`;
}

const CONFIG_PATH = join(dirname(fileURLToPath(import.meta.url)), "cloudflare-nav.yaml");

export function loadCloudflareNav(): CloudflareNav {
  const raw = readFileSync(CONFIG_PATH, "utf8");
  return CloudflareNavSchema.parse(parseYaml(raw) as unknown);
}
