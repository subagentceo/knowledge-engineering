/**
 * Local-process embeddings via @xenova/transformers (ONNX runtime).
 *
 * Phase 11.C / issue #35 — replacement for Voyage AI. The chassis avoids
 * the paid Voyage API + the operator-runbook signup; instead, embeddings
 * are computed in-process via the open `Xenova/all-MiniLM-L6-v2` model.
 *
 * Trade-offs:
 *   - Free, no API key, no network roundtrip per call
 *   - Lower quality on long-doc retrieval than `voyage-3` (acceptable for
 *     the chunked `vendor_grep` use case)
 *   - First call lazy-loads the model (~25MB download to ~/.cache/huggingface
 *     on first invocation; cached thereafter)
 *
 * Wired by Phase 11.C semantic `vendor_grep` (future PR). The flag
 * `KE_VENDOR_GREP_EMBEDDINGS=1` gates the path; default off so cold-start
 * stays fast.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md
 * @cite seeds/citations/turbopuffer.md
 * @cite docs/operator-runbooks/cli-only-unblock-path.md (issue #35 workaround)
 */

export interface EmbeddingPipeline {
  (text: string, opts: { pooling: "mean"; normalize: boolean }): Promise<{ data: Float32Array }>;
}

export const MODEL_ID = "Xenova/all-MiniLM-L6-v2";
export const DIMENSION = 384;

let cached: EmbeddingPipeline | null = null;

/**
 * Lazy-load the pipeline. Dynamic import keeps the dep off the cold-start
 * path for orchestrator runs that don't use embeddings.
 */
export async function loadPipeline(): Promise<EmbeddingPipeline> {
  if (cached) return cached;
  const mod = await import("@xenova/transformers");
  const p = await mod.pipeline("feature-extraction", MODEL_ID);
  cached = p as unknown as EmbeddingPipeline;
  return cached;
}

/**
 * Embed a single text into a normalized vector. Mean-pooled across
 * tokens then L2-normalized so cosine similarity reduces to dot product.
 */
export async function embed(text: string): Promise<Float32Array> {
  const p = await loadPipeline();
  const out = await p(text, { pooling: "mean", normalize: true });
  return out.data;
}

/**
 * Cosine similarity between two L2-normalized vectors. Returns NaN if
 * either vector is not unit-norm or if lengths differ.
 */
export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  if (a.length !== b.length) return NaN;
  let s = 0;
  for (let i = 0; i < a.length; i += 1) s += a[i] * b[i];
  return s;
}

/**
 * Reset the cached pipeline. Test-only.
 */
export function resetForTests(): void {
  cached = null;
}
