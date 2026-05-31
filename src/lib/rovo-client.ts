/**
 * @cite docs/reference/rovo-api-and-orchestrator-blueprint.md
 *
 * Typed HTTP client for the Rovo tool-catalog service (src/agent/cowork/
 * rovo_catalog.py). Validates every payload against the shared zod contract.
 *
 * OAuth-only: NO x-api-key / anthropic-version headers. The service is an
 * internal catalog/validator, not an authenticated public API.
 */

import {
  type Permission,
  type ToolId,
  type CheckAccessRequest,
  Tool,
  ToolList,
  CheckAccessResponse,
} from "./rovo-catalog.js";
import { z } from "zod";

export class RovoClient {
  constructor(private readonly baseUrl = "http://localhost:8000") {}

  private async getJson<T extends z.ZodTypeAny>(path: string, schema: T): Promise<z.infer<T>> {
    const r = await fetch(`${this.baseUrl}${path}`);
    if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
    return schema.parse(await r.json());
  }

  listTools(params: { permission?: Permission; limit?: number; afterId?: ToolId } = {}): Promise<ToolList> {
    const q = new URLSearchParams();
    if (params.permission) q.set("permission", params.permission);
    if (params.limit !== undefined) q.set("limit", String(params.limit));
    if (params.afterId) q.set("after_id", params.afterId);
    const qs = q.toString();
    return this.getJson(`/v1/tools${qs ? `?${qs}` : ""}`, ToolList);
  }

  getTool(id: ToolId): Promise<Tool> {
    return this.getJson(`/v1/tools/${id}`, Tool);
  }

  async checkAccess(body: CheckAccessRequest): Promise<CheckAccessResponse> {
    const r = await fetch(`${this.baseUrl}/v1/tools/check_access`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
    return CheckAccessResponse.parse(await r.json());
  }
}
