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

// Phase 8 (2026-05-15): replaced the Phase-0g type stubs with real imports.
// @cloudflare/sandbox exports the Sandbox Durable Object class wrangler
// looks for via the `Sandbox` DO binding declared in wrangler.jsonc.
// Re-exporting it at the bottom of this file makes the export discoverable
// from src/worker.ts (wrangler's entrypoint).
import { Sandbox, getSandbox } from "@cloudflare/sandbox";
import { createApiClient } from "@neondatabase/api-client";

type SandboxBinding = DurableObjectNamespace<Sandbox<unknown>>;

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
  const client = createApiClient({ apiKey });
  const response = await client.createProjectBranch(projectId, {
    branch: { name: `agent-${agentId}` },
  });
  const branchId = response.data.branch.id;
  const databaseUrl = response.data.connection_uris?.[0]?.connection_uri;
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST" || new URL(request.url).pathname !== "/run") {
      return new Response("POST /run { repoUrl, task }", { status: 405 });
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

// Phase 8: re-export the Sandbox Durable Object class so wrangler can
// register it for the `Sandbox` DO binding declared in wrangler.jsonc.
// The DO is implemented inside the @cloudflare/sandbox package; we just
// surface it on this Worker's entrypoint so the binding resolves.
export { Sandbox };
