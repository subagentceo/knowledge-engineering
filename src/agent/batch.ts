/**
 * @cite vendor/claude-sitemap/blog/message-batches-api.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/manage-claude/rate-limits-api.md
 */

export interface BatchRequest {
  custom_id: string;
  params: {
    model: string;
    max_tokens: number;
    messages: Array<{ role: "user" | "assistant"; content: string }>;
  };
}

export interface BatchStatus {
  id: string;
  processing_status: "in_progress" | "canceling" | "ended";
  request_counts: {
    processing: number;
    succeeded: number;
    errored: number;
    canceled: number;
    expired: number;
  };
  created_at: string;
  ended_at: string | null;
  expires_at: string;
}

export interface BatchResult {
  custom_id: string;
  result:
    | { type: "succeeded"; message: { content: Array<{ type: string; text?: string }> } }
    | { type: "errored"; error: { type: string; message: string } }
    | { type: "canceled" }
    | { type: "expired" };
}

const API_BASE = "https://api.anthropic.com/v1";

function headers(token: string): Record<string, string> {
  return {
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };
}

async function assertOk(res: Response, context: string): Promise<void> {
  if (!res.ok) {
    throw new Error(`${context}: HTTP ${res.status}`);
  }
}

export async function submitBatch(
  token: string,
  requests: BatchRequest[],
  fetchFn: typeof fetch = fetch,
): Promise<BatchStatus> {
  const res = await fetchFn(`${API_BASE}/messages/batches`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ requests }),
  });
  await assertOk(res, "submitBatch");
  return res.json() as Promise<BatchStatus>;
}

export async function pollBatch(
  token: string,
  batchId: string,
  fetchFn: typeof fetch = fetch,
): Promise<BatchStatus> {
  const res = await fetchFn(`${API_BASE}/messages/batches/${batchId}`, {
    method: "GET",
    headers: headers(token),
  });
  await assertOk(res, "pollBatch");
  return res.json() as Promise<BatchStatus>;
}

// JSONL stream — one BatchResult JSON object per line
export async function collectBatch(
  token: string,
  batchId: string,
  fetchFn: typeof fetch = fetch,
): Promise<BatchResult[]> {
  const res = await fetchFn(`${API_BASE}/messages/batches/${batchId}/results`, {
    method: "GET",
    headers: headers(token),
  });
  await assertOk(res, "collectBatch");
  const text = await res.text();
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((l) => JSON.parse(l) as BatchResult);
}
