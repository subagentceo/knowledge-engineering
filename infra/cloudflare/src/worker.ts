// infra/cloudflare/src/worker.ts
//
// Phase 0g scaffold. Full-Stack Cloud Agent runner per the cited Neon guide,
// adapted for the operator posture's OAuth-only auth.
//
// Citations:
//   - vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md
//   - seeds/prompts/operator-2026-05-10.md (OAuth-only posture)
//   - seeds/prompts/operator-2026-05-10-followup.md (OAuth substitution log)
//
// The cited guide forwards ANTHROPIC_API_KEY into the Sandbox via
// `sandbox.setEnvVars({ ANTHROPIC_API_KEY: env.ANTHROPIC_API_KEY, ... })`.
// The operator posture forbids ANTHROPIC_API_KEY. Resolution: forward
// CLAUDE_CODE_OAUTH_TOKEN; the Claude Code CLI honors it for auth. The
// `sanitizeEnv` helper enforces this at the Worker boundary — any attempt
// to forward ANTHROPIC_API_KEY throws ApiKeyForbiddenError before reaching
// the Sandbox.
//
// NOT DEPLOYED in this PR. Phase 8 brings the runner to a deployed state
// after the operator-side Neon Console + Cloudflare secret-sync workflow.

// NOTE: The package.json declares @cloudflare/sandbox and
// @neondatabase/api-client but `npm install` is not run as part of this
// Phase 0g scaffold. The imports below typecheck once those deps are
// installed (Phase 8). Until then, `wrangler deploy --dry-run` validates
// the manifest and the file shape.
//
// eslint-disable @typescript-eslint/no-unused-vars

// Type-only imports keep the file shape complete without forcing the
// dependencies to be installed for Phase 0 verification.
type SandboxBinding = unknown;
type Sandbox = {
  exec: (cmd: string) => Promise<{ stdout: string; stderr: string; exitCode: number }>;
  setEnvVars: (vars: Record<string, string>) => Promise<void>;
};
type GetSandbox = (binding: SandboxBinding, sessionId: string) => Sandbox;

declare function getSandbox(binding: SandboxBinding, sessionId: string): Sandbox;
declare class NeonApiClient {
  constructor(config: { apiKey: string });
  createProjectBranch(projectId: string, body: { branch: { name: string } }): Promise<{
    data: {
      branch: { id: string };
      connection_uris: { connection_uri: string }[];
    };
  }>;
}

// Secrets Store binding shape per
// https://developers.cloudflare.com/secrets-store/integrations/workers/
// Async get() is the only access path; values never appear in plain env.
interface SecretsStoreBinding {
  get(): Promise<string>;
}

// Cloudflare Flagship binding. Cited from
// vendor/cloudflare/developers.cloudflare.com/flagship/binding/index.md.
// The binding is bound via wrangler.jsonc (`flagship` block); Flagship
// app id provisioned by the operator runbook docs/operator-runbooks/
// cf-flagship-setup.md. Until the operator runs that runbook, the
// binding is undefined and resolveFlag() falls back to defaults.
interface FlagshipBinding {
  getStringValue(flagKey: string, defaultValue: string, context?: Record<string, unknown>): Promise<string>;
}

interface Env {
  Sandbox: SandboxBinding;
  // Secrets Store bindings (account-level; bootstrapped by
  // .github/workflows/cloudflare-preview.yml).
  CLAUDE_CODE_OAUTH_TOKEN: SecretsStoreBinding;
  NEON_API_KEY: SecretsStoreBinding;
  GITHUB_TOKEN: SecretsStoreBinding;
  // FM relay (POST /claude). Caller app token validated against this
  // binding; the OAuth credential is added server-side so the Apple
  // client (ClaudeForFoundationModels `.proxied`) ships NO key.
  // Optional: absent → /claude returns 501 until the operator binds it.
  APP_RELAY_TOKEN?: SecretsStoreBinding;
  // Worker var (non-secret).
  NEON_PROJECT_ID: string;
  IS_SANDBOX?: string;
  // Phase 13.B+ (O5). Cloudflare Flagship binding (declared in
  // wrangler.jsonc but optional until the operator runbook provisions
  // an app id). Worker pre-evaluates and forwards into Sandbox env so
  // the in-Sandbox InMemoryProvider can pick up Flagship-resolved
  // values via OPENFEATURE_<flag> env overrides.
  FLAGSHIP?: FlagshipBinding;
  // Bindings the operator posture forbids. Layer-2 defense: even if
  // somehow bound, sanitizeEnv() throws when forwarding to the Sandbox.
  ANTHROPIC_API_KEY?: never;
}

interface RunRequest {
  repoUrl: string;
  task: string;
  baseBranch?: string;
}

interface RunResponse {
  agentId: string;
  databaseUrl: string;
  prUrl: string;
  branchId: string;
}

class ApiKeyForbiddenError extends Error {
  constructor(key: string) {
    super(
      `${key} is forbidden by operator posture (seeds/prompts/operator-2026-05-10.md). ` +
        `Use CLAUDE_CODE_OAUTH_TOKEN instead.`
    );
    this.name = "ApiKeyForbiddenError";
  }
}

const FORBIDDEN_KEYS = ["ANTHROPIC_API_KEY"] as const;

/**
 * Reject any env map that smuggles a forbidden API key into the Sandbox.
 * Cited from seeds/prompts/operator-2026-05-10-followup.md (OAuth
 * substitution clause). Tested by the Phase 0 env-sanitizer rubric criterion.
 */
export function sanitizeEnv(vars: Record<string, string>): Record<string, string> {
  for (const key of FORBIDDEN_KEYS) {
    if (key in vars) throw new ApiKeyForbiddenError(key);
  }
  return vars;
}

/**
 * Resolve a string flag via Cloudflare Flagship (when bound), else fall
 * back to the supplied default. The result is forwarded into the
 * Sandbox env as OPENFEATURE_<flag> so the agent's in-Sandbox
 * InMemoryProvider picks it up. Cited from
 * vendor/cloudflare/developers.cloudflare.com/flagship/binding/index.md.
 */
export async function resolveFlagshipString(
  binding: FlagshipBinding | undefined,
  flagKey: string,
  defaultValue: string,
): Promise<string> {
  if (binding === undefined) return defaultValue;
  try {
    return await binding.getStringValue(flagKey, defaultValue);
  } catch {
    return defaultValue;
  }
}

async function createNeonBranch(
  apiKey: string,
  projectId: string,
  agentId: string
): Promise<{ databaseUrl: string; branchId: string }> {
  const client = new NeonApiClient({ apiKey });
  const response = await client.createProjectBranch(projectId, {
    branch: { name: `agent-${agentId}` },
  });
  const branchId = response.data.branch.id;
  const databaseUrl = response.data.connection_uris[0]?.connection_uri;
  if (!databaseUrl) throw new Error("Neon branch created but no connection URI returned");
  return { databaseUrl, branchId };
}

async function cloneRepo(sandbox: Sandbox, repoUrl: string, branch: string): Promise<void> {
  const result = await sandbox.exec(`git clone ${repoUrl} /workspace && cd /workspace && git checkout -b ${branch}`);
  if (result.exitCode !== 0) {
    throw new Error(`git clone failed: ${result.stderr}`);
  }
}

async function runClaude(sandbox: Sandbox, task: string): Promise<void> {
  // The OAuth substitution: the Claude Code CLI picks up
  // CLAUDE_CODE_OAUTH_TOKEN from the sandbox env (set by setEnvVars before
  // this call). No --api-key flag, no ANTHROPIC_API_KEY.
  const escaped = task.replace(/'/g, "'\\''");
  const result = await sandbox.exec(
    `cd /workspace && claude --dangerously-skip-permissions -p '${escaped}'`
  );
  if (result.exitCode !== 0) {
    throw new Error(`claude exited ${result.exitCode}: ${result.stderr}`);
  }
}

async function commitChanges(sandbox: Sandbox, message: string): Promise<void> {
  const escaped = message.replace(/"/g, '\\"');
  await sandbox.exec(`cd /workspace && git add -A && git commit -m "${escaped}"`);
}

async function pushBranch(sandbox: Sandbox, branch: string): Promise<void> {
  const result = await sandbox.exec(`cd /workspace && git push -u origin ${branch}`);
  if (result.exitCode !== 0) {
    throw new Error(`git push failed: ${result.stderr}`);
  }
}

async function createPR(sandbox: Sandbox, task: string, branch: string): Promise<string> {
  const escaped = task.replace(/"/g, '\\"');
  const result = await sandbox.exec(
    `cd /workspace && gh pr create --draft --title "agent: ${branch}" --body "${escaped}\n\nGenerated by ke-cloud-agent (Phase 0g scaffold)."`
  );
  if (result.exitCode !== 0) {
    throw new Error(`gh pr create failed: ${result.stderr}`);
  }
  const prUrlMatch = result.stdout.match(/https:\/\/github\.com\/[^\s]+/);
  if (!prUrlMatch) throw new Error(`gh pr create did not surface a PR URL: ${result.stdout}`);
  return prUrlMatch[0];
}

// ── FM relay (POST /claude) ─────────────────────────────────────────────
//
// The OAuth-only counterpart to ClaudeForFoundationModels `.apiKey`. The
// Apple client uses `.proxied(headers:..., baseURL: <this>/claude)`, ships
// no credential, and this relay injects the OAuth bearer server-side. The
// env-sanitizer invariant holds: an OAuth token is a Bearer credential,
// never ANTHROPIC_API_KEY.
//
// @cite docs/reference/anthropic-foundation-models-integration.md (§2 auth)
// @cite https://github.com/anthropics/ClaudeForFoundationModels  (.proxied)
// @cite https://github.com/modelcontextprotocol/ext-auth        (additive auth)
// @cite seeds/prompts/operator-2026-05-10.md                    (OAuth-only posture)
const RELAY_UPSTREAM = "https://api.anthropic.com/v1/messages";
const RELAY_VERSION = "2023-06-01";

/** Constant-time string compare so token validation is not a timing oracle. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function handleClaudeRelay(request: Request, env: Env): Promise<Response> {
  if (env.APP_RELAY_TOKEN === undefined) {
    return new Response("relay not provisioned (bind APP_RELAY_TOKEN)", { status: 501 });
  }
  const presented = request.headers.get("X-App-Token") ?? "";
  const expected = await env.APP_RELAY_TOKEN.get();
  if (!presented || !timingSafeEqual(presented, expected)) {
    return new Response("invalid X-App-Token", { status: 401 });
  }
  // Forbid a client smuggling its own key through the relay (defense in depth).
  if (request.headers.has("x-api-key") || request.headers.has("anthropic-api-key")) {
    return new Response("api-key headers are forbidden; relay is OAuth-only", { status: 400 });
  }

  const oauth = await env.CLAUDE_CODE_OAUTH_TOKEN.get();
  const upstream = await fetch(RELAY_UPSTREAM, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "anthropic-version": RELAY_VERSION,
      // OAuth substitution: Bearer credential, never x-api-key.
      authorization: `Bearer ${oauth}`,
    },
    body: request.body,
  });
  // Pass the upstream response through verbatim (streaming-safe).
  return new Response(upstream.body, {
    status: upstream.status,
    headers: { "content-type": upstream.headers.get("content-type") ?? "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = new URL(request.url).pathname;
    if (request.method === "POST" && pathname === "/claude") {
      return handleClaudeRelay(request, env);
    }
    if (request.method !== "POST" || pathname !== "/run") {
      return new Response("POST /run { repoUrl, task } | POST /claude (FM relay)", { status: 405 });
    }

    const body = (await request.json()) as RunRequest;
    if (!body.repoUrl || !body.task) {
      return new Response("missing repoUrl or task", { status: 400 });
    }

    const agentId = crypto.randomUUID();
    const branch = `agent/${agentId}`;

    // Resolve Secrets Store bindings up-front. The async get() pattern
    // is the only access path per Cloudflare docs; values are never on
    // the plain env object.
    const [neonApiKey, claudeOauth, githubToken] = await Promise.all([
      env.NEON_API_KEY.get(),
      env.CLAUDE_CODE_OAUTH_TOKEN.get(),
      env.GITHUB_TOKEN.get(),
    ]);

    const { databaseUrl, branchId } = await createNeonBranch(
      neonApiKey,
      env.NEON_PROJECT_ID,
      agentId
    );

    const sandbox = getSandbox(env.Sandbox, agentId);

    // Phase 13.B+ (O5): pre-evaluate the color-code flag via Flagship
    // and forward as an OPENFEATURE_<flag> env override into the
    // Sandbox. The agent's in-Sandbox InMemoryProvider uses this to
    // surface Flagship-resolved values without needing the Worker SDK.
    const colorCode = await resolveFlagshipString(env.FLAGSHIP, "color-code", "cyan");

    // OAuth substitution + env-sanitizer gate. The cited Neon guide places
    // ANTHROPIC_API_KEY here. We forward CLAUDE_CODE_OAUTH_TOKEN.
    await sandbox.setEnvVars(
      sanitizeEnv({
        CLAUDE_CODE_OAUTH_TOKEN: claudeOauth,
        DATABASE_URL: databaseUrl,
        GITHUB_TOKEN: githubToken,
        IS_SANDBOX: "1",
        OPENFEATURE_color_code: colorCode,
      })
    );

    await cloneRepo(sandbox, body.repoUrl, branch);
    await runClaude(sandbox, body.task);
    await commitChanges(sandbox, `agent: ${body.task.slice(0, 72)}`);
    await pushBranch(sandbox, branch);
    const prUrl = await createPR(sandbox, body.task, branch);

    const response: RunResponse = { agentId, databaseUrl, prUrl, branchId };
    return Response.json(response);
  },
};
