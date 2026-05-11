/**
 * OpenFeature client singleton (Phase 13.B+ — O5).
 *
 * Surfaces a lazily-initialized {@link Client} that the agent runtime and
 * any subsystem can call into without knowing which provider is bound.
 *
 * Provider selection:
 *   - Default: InMemoryProvider seeded from `seeds/openfeature/local-flags.json`.
 *   - When the Worker runtime calls {@link setProvider} BEFORE the first
 *     {@link getOpenFeatureClient} call, that provider wins instead. The Worker
 *     uses this to bind `@cloudflare/flagship` against an `env.FLAGSHIP`
 *     binding.
 *
 * Citations:
 *   @cite vendor/openfeature/openfeature.dev/docs/reference/intro.md
 *   @cite vendor/cloudflare/developers.cloudflare.com/flagship/sdk/server-provider/index.md
 *   @cite rubrics/phase-13.md (O5)
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { InMemoryProvider, OpenFeature, type Client, type InMemoryFlagConfiguration, type Provider } from "@openfeature/server-sdk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const LOCAL_FLAGS_PATH = resolve(REPO_ROOT, "seeds/openfeature/local-flags.json");

interface LocalFlagSpec {
  kind: "string" | "boolean" | "number";
  default: string | boolean | number;
  allowed?: string[];
  description?: string;
}

interface LocalFlagsFile {
  flags: Record<string, LocalFlagSpec>;
}

let cachedClient: Client | null = null;
let providerOverride: Provider | null = null;

/**
 * Worker-side hook: bind a non-default provider (e.g. Cloudflare Flagship)
 * BEFORE any {@link getOpenFeatureClient} call. Throws if the client has
 * already been initialized — calling order matters.
 */
export function setProvider(provider: Provider): void {
  if (cachedClient !== null) {
    throw new Error("openfeature: setProvider called after getOpenFeatureClient — client is already bound");
  }
  providerOverride = provider;
}

/**
 * Returns the OpenFeature client. First call initializes the provider:
 *   - if {@link setProvider} was called, uses that provider;
 *   - otherwise, builds an InMemoryProvider from `local-flags.json`.
 */
export function getOpenFeatureClient(): Client {
  if (cachedClient !== null) return cachedClient;
  const provider = providerOverride ?? buildLocalProvider();
  OpenFeature.setProvider(provider);
  cachedClient = OpenFeature.getClient();
  return cachedClient;
}

/**
 * For tests only: reset module state so a fresh provider can be bound.
 */
export function resetForTests(): void {
  cachedClient = null;
  providerOverride = null;
}

function buildLocalProvider(): InMemoryProvider {
  const file = JSON.parse(readFileSync(LOCAL_FLAGS_PATH, "utf8")) as LocalFlagsFile;
  // OPENFEATURE_<flag> env-var overrides. Used by the Worker to forward
  // Flagship-resolved values into the in-Sandbox InMemoryProvider, and
  // by local dev for quick A/B iteration. Dashes in flag keys are
  // normalized to underscores for env-var safety.
  for (const [key, spec] of Object.entries(file.flags)) {
    const envKey = `OPENFEATURE_${key.replace(/-/g, "_")}`;
    const override = process.env[envKey];
    if (override === undefined) continue;
    if (spec.kind === "string" && (spec.allowed === undefined || spec.allowed.includes(override))) {
      spec.default = override;
    } else if (spec.kind === "boolean") {
      spec.default = override === "true";
    } else if (spec.kind === "number") {
      const n = Number(override);
      if (!Number.isNaN(n)) spec.default = n;
    }
  }
  return new InMemoryProvider(toInMemoryFlagConfiguration(file));
}

function toInMemoryFlagConfiguration(file: LocalFlagsFile): InMemoryFlagConfiguration {
  const out: InMemoryFlagConfiguration = {} as InMemoryFlagConfiguration;
  for (const [key, spec] of Object.entries(file.flags)) {
    if (spec.kind === "string") {
      const variants: Record<string, string> = {};
      const allowed = spec.allowed ?? [String(spec.default)];
      for (const v of allowed) variants[v] = v;
      // Operator-set default must be one of the allowed values; if not,
      // bail loudly so misconfiguration is caught at startup.
      if (!allowed.includes(String(spec.default))) {
        throw new Error(`openfeature: flag "${key}" default "${spec.default}" not in allowed=${JSON.stringify(allowed)}`);
      }
      out[key] = { variants, defaultVariant: String(spec.default), disabled: false };
    } else if (spec.kind === "boolean") {
      out[key] = {
        variants: { on: true, off: false },
        defaultVariant: spec.default === true ? "on" : "off",
        disabled: false,
      };
    } else {
      // number
      out[key] = {
        variants: { default: spec.default as number },
        defaultVariant: "default",
        disabled: false,
      };
    }
  }
  return out;
}
