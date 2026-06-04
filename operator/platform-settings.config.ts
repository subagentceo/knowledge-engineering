/**
 * Type-safe schema for operator/platform-settings.config.yaml.
 * Each top-level key mirrors a left-nav page at platform.claude.com/settings/*.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/costs.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/manage-claude/admin-api.md
 */
import { z } from "zod";
import { readFileSync } from "node:fs";
import { parse as parseYaml } from "yaml";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// ── leaf schemas ──────────────────────────────────────────────────────────────

const ProfileSchema = z.object({
  full_name: z.string(),
  organization_id: z.string().uuid(),
  display_name: z.string(),
});

const AppearanceSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  code_theme: z.string(),
  font_size: z.number().int().min(8).max(32),
  compact_mode: z.boolean(),
});

const OrganizationSchema = z.object({
  id: z.string().uuid(),               // platform.claude.com org UUID (≠ claude.ai export UUID)
  name: z.string().nullable(),
  members: z.number().int().positive(),
  plan: z.string(),                    // "evaluation_free" | "pay_as_you_go_credits" | ...
  primary_email: z.string().email(),
});

const WorkspaceEntrySchema = z.object({
  name: z.string(),
  id: z.string().nullable(),                        // full ID may be truncated in scrape
  created_at: z.string().datetime().nullable().optional(),
  api_keys: z.number().int().nonnegative(),
});

const WorkspacesSchema = z.object({
  count: z.number().int().nonnegative(),
  workspaces: z.array(WorkspaceEntrySchema),
});

const BillingSchema = z.object({
  plan: z.enum(["pay_as_you_go_credits", "evaluation_free", "team", "enterprise"]),
  billing_email: z.string().email(),
  credit_balance_usd: z.number(),
  credit_card_on_file: z.boolean(),
  auto_reload_enabled: z.boolean(),
  monthly_spend_limit_usd: z.number().positive().nullable(),
});

const RateLimitEntrySchema = z.object({
  workspace_id: z.string(),
  requests_per_minute: z.number().int().positive().nullable(),
  tokens_per_minute: z.number().int().positive().nullable(),
});

const LimitsSchema = z.object({
  tier: z.enum(["free", "tier_1", "tier_2", "tier_3", "tier_4"]),
  tier_1_threshold_usd: z.number(),
  tier_2_threshold_usd: z.number(),
  tier_3_threshold_usd: z.number(),
  tier_4_threshold_usd: z.number(),
  batch_requests_per_minute: z.number().int(),
  web_search_per_second: z.number().int(),
  files_api_storage_gb: z.number(),
  custom_rate_limits: z.array(RateLimitEntrySchema),
});

const ApiKeyEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string().datetime(),
  last_used_at: z.string().datetime().nullable(),
});

// Forbidden on Max 5x — schema kept for forward-compat but enabled must be false.
const ApiKeysSchema = z
  .object({
    enabled: z.literal(false),
    keys: z.array(ApiKeyEntrySchema),
  })
  .refine((v) => v.keys.length === 0, {
    message: "api_keys.keys must be empty on Max 5x (OAuth-only invariant)",
  });

const ServiceAccountEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string().datetime(),
});

const ServiceAccountsSchema = z.object({
  enabled: z.boolean(),
  accounts: z.array(ServiceAccountEntrySchema),
});

const ProviderSchema = z.object({
  provider_id: z.string(),
  issuer_url: z.string().url(),
  audience: z.string(),
});

const WorkloadIdentitySchema = z.object({
  enabled: z.boolean(),
  providers: z.array(ProviderSchema),
});

const PrivacyControlsSchema = z.object({
  data_retention_days: z.number().int().positive(),
  development_partner_program: z.enum(["joined", "not_joined"]),
  partner_joined_at: z.string().nullable(),
  partner_joined_by: z.string().email().nullable(),
  claude_code_metrics_logging: z.boolean(),
  allow_user_feedback: z.boolean(),
  allow_web_search: z.boolean(),
  allow_batch_results_download: z.boolean(),
});

// ── root schema ───────────────────────────────────────────────────────────────

export const PlatformSettingsSchema = z.object({
  profile: ProfileSchema,
  appearance: AppearanceSchema,
  organization: OrganizationSchema,
  workspaces: WorkspacesSchema,
  billing: BillingSchema,
  limits: LimitsSchema,
  api_keys: ApiKeysSchema,
  service_accounts: ServiceAccountsSchema,
  workload_identity: WorkloadIdentitySchema,
  privacy_controls: PrivacyControlsSchema,
});

export type PlatformSettings = z.infer<typeof PlatformSettingsSchema>;

// ── loader ────────────────────────────────────────────────────────────────────

const CONFIG_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "platform-settings.config.yaml",
);

export function loadPlatformSettings(): PlatformSettings {
  const raw = readFileSync(CONFIG_PATH, "utf8");
  const parsed = parseYaml(raw) as unknown;
  return PlatformSettingsSchema.parse(parsed);
}
