/**
 * Minimal Voyage AI client. Used by src/lib/turbopuffer-alloydb-bridge.ts
 * to embed text before vector upsert.
 *
 * Voyage is the embeddings provider Anthropic publicly recommends
 * (vendor/anthropics/platform.claude.com/docs/en/build-with-claude/
 * embeddings.md). Turbopuffer also names Voyage as their reference
 * provider (vendor/turbopuffer/turbopuffer.com/docs/performance.md).
 *
 * Stays tiny on purpose — single endpoint, single response shape,
 * stub-friendly via globalThis.fetch.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md
 * @cite vendor/turbopuffer/turbopuffer.com/docs/performance.md
 */

export type VoyageModel =
  | "voyage-3.5-lite"
  | "voyage-3.5"
  | "voyage-3-large"
  | "voyage-4"
  | "voyage-4-lite"
  | "voyage-4-large"
  | "voyage-code-3";

export interface VoyageClientOptions {
  apiKey: string;
  defaultModel?: VoyageModel;
  baseUrl?: string;
}

export interface VoyageEmbedOptions {
  model?: VoyageModel;
  inputType?: "document" | "query";
}

export interface VoyageEmbedResult {
  embeddings: number[][];
  model: VoyageModel;
  usage: { totalTokens: number };
}

export interface VoyageClient {
  readonly defaultModel: VoyageModel;
  embed(input: string[], opts?: VoyageEmbedOptions): Promise<VoyageEmbedResult>;
}

interface VoyageApiResponse {
  data: Array<{ embedding: number[] }>;
  model: string;
  usage: { total_tokens: number };
}

export function createVoyageClient(opts: VoyageClientOptions): VoyageClient {
  if (!opts.apiKey || opts.apiKey.trim() === "") {
    throw new Error("voyage-client: apiKey is required");
  }
  const defaultModel = opts.defaultModel ?? "voyage-3.5-lite";
  const baseUrl = opts.baseUrl ?? "https://api.voyageai.com";

  return {
    defaultModel,
    async embed(input, embedOpts = {}) {
      const model = embedOpts.model ?? defaultModel;
      const body = {
        input,
        model,
        ...(embedOpts.inputType ? { input_type: embedOpts.inputType } : {}),
      };
      const res = await fetch(`${baseUrl}/v1/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${opts.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`voyage embed failed: ${res.status} ${text}`);
      }
      const data = (await res.json()) as VoyageApiResponse;
      return {
        embeddings: data.data.map((d) => d.embedding),
        model: data.model as VoyageModel,
        usage: { totalTokens: data.usage.total_tokens },
      };
    },
  };
}
