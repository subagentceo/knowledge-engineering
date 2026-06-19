/**
 * @cite platform.claude.com/docs/en/managed-agents/vaults.md
 * @cite platform.claude.com/docs/en/api/beta/vaults/credentials/archive.md
 */
import { z } from "zod";

// ── Vault ────────────────────────────────────────────────────────────────────

export const DurableVault = z.object({
  vault_id:     z.string().startsWith("vlt_"),
  display_name: z.string(),
  metadata:     z.record(z.string()).default({}),
  status:       z.enum(["active", "archived", "deleted"]).default("active"),
  archived_at:  z.string().datetime().nullable().default(null),
  created_at:   z.string().datetime(),
  updated_at:   z.string().datetime(),
});
export type DurableVault = z.infer<typeof DurableVault>;

// ── Credential auth subtypes ─────────────────────────────────────────────────

export const StaticBearerAuth = z.object({
  type:           z.literal("static_bearer"),
  mcp_server_url: z.string().url(),
  // token is write-only — never present in API responses
});

export const TokenEndpointAuth = z.discriminatedUnion("type", [
  z.object({ type: z.literal("none") }),
  z.object({ type: z.literal("client_secret_basic") }),
  z.object({ type: z.literal("client_secret_post") }),
]);

export const MCPOAuthRefresh = z.object({
  token_endpoint:      z.string().url(),
  client_id:           z.string(),
  scope:               z.string().optional(),
  resource:            z.string().optional(),
  token_endpoint_auth: TokenEndpointAuth,
  // refresh_token and client_secret are write-only
});

export const MCPOAuthAuth = z.object({
  type:           z.literal("mcp_oauth"),
  mcp_server_url: z.string().url(),
  expires_at:     z.string().datetime().optional(),
  refresh:        MCPOAuthRefresh.optional(),
  // access_token is write-only — never returned
});

export const CredentialAuth = z.discriminatedUnion("type", [
  StaticBearerAuth,
  MCPOAuthAuth,
]);

// ── Credential ────────────────────────────────────────────────────────────────

export const DurableCredential = z.object({
  credential_id:  z.string().startsWith("vcrd_"),
  vault_id:       z.string().startsWith("vlt_"),
  display_name:   z.string().optional(),
  auth:           CredentialAuth,
  mcp_server_url: z.string().url(),   // denormalized from auth for queries
  auth_type:      z.enum(["static_bearer", "mcp_oauth"]),
  status:         z.enum(["active", "archived", "deleted"]).default("active"),
  archived_at:    z.string().datetime().nullable().default(null),
  metadata:       z.record(z.string()).default({}),
  created_at:     z.string().datetime(),
  updated_at:     z.string().datetime(),
});
export type DurableCredential = z.infer<typeof DurableCredential>;

// ── Rotation event ────────────────────────────────────────────────────────────

export const CredentialRotation = z.object({
  id:            z.number().int().positive(),
  credential_id: z.string().startsWith("vcrd_"),
  vault_id:      z.string().startsWith("vlt_"),
  rotated_at:    z.string().datetime(),
  rotated_by:    z.string(),   // skill name or user ID
});
export type CredentialRotation = z.infer<typeof CredentialRotation>;

// ── DurableTask payload ───────────────────────────────────────────────────────

export const VaultDurableTaskPayload = z.object({
  vault_id:       z.string().startsWith("vlt_"),
  credential_id:  z.string().startsWith("vcrd_").optional(),
  mcp_server_url: z.string().url(),
  auth_type:      z.enum(["static_bearer", "mcp_oauth"]),
  operation:      z.enum(["create", "rotate", "archive", "migrate"]),
  resolvable:     z.boolean(),
  suggested_skill: z.literal("durable-vault-store"),
  note:           z.string(),
});
export type VaultDurableTaskPayload = z.infer<typeof VaultDurableTaskPayload>;
