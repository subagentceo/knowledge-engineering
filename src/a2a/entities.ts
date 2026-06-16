/**
 * Canonical entity registry for a2a payloads.
 *
 * Agents reference docs/routes/tools by stable `id` (e.g. skills.overview),
 * never by raw URL. `entityBase + mdx` resolves the canonical .md source.
 * Deduped from the platform.claude.com llms.txt .mdx index.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/structured-outputs.md
 */
import { z } from "zod";

export const EntityKind = z.enum(["doc", "route", "tool", "dataset"]);

export const EntitySchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+(\.[a-z0-9-]+)+$/, "dotted canonical id"),
    kind: EntityKind,
    category: z.string().min(1),
    mdx: z.string().regex(/^\/.*\.md$/, "absolute .md path").optional(),
  })
  .strict();
export type Entity = z.infer<typeof EntitySchema>;

export const EntityRegistrySchema = z
  .object({
    entityBase: z.string().url(),
    entities: z.array(EntitySchema).min(1),
  })
  .strict()
  .superRefine((r, ctx) => {
    const seen = new Set<string>();
    for (const e of r.entities) {
      if (seen.has(e.id)) {
        ctx.addIssue({ code: "custom", message: `duplicate entity id: ${e.id}` });
      }
      seen.add(e.id);
    }
  });
export type EntityRegistry = z.infer<typeof EntityRegistrySchema>;

export const ENTITY_REGISTRY: EntityRegistry = EntityRegistrySchema.parse({
  entityBase: "https://platform.claude.com",
  entities: [
    { id: "skills.overview", kind: "doc", category: "agent-skills", mdx: "/docs/en/agents-and-tools/agent-skills/overview.md" },
    { id: "skills.quickstart", kind: "doc", category: "agent-skills", mdx: "/docs/en/agents-and-tools/agent-skills/quickstart.md" },
    { id: "skills.best-practices", kind: "doc", category: "agent-skills", mdx: "/docs/en/agents-and-tools/agent-skills/best-practices.md" },
    { id: "skills.enterprise", kind: "doc", category: "agent-skills", mdx: "/docs/en/agents-and-tools/agent-skills/enterprise.md" },
    { id: "skills.api-guide", kind: "doc", category: "agent-skills", mdx: "/docs/en/build-with-claude/skills-guide.md" },
    { id: "tool-use.overview", kind: "doc", category: "tool-use", mdx: "/docs/en/agents-and-tools/tool-use/overview.md" },
    { id: "tool-use.structured-outputs", kind: "doc", category: "build", mdx: "/docs/en/build-with-claude/structured-outputs.md" },
    { id: "tool-use.strict", kind: "doc", category: "tool-use", mdx: "/docs/en/agents-and-tools/tool-use/strict-tool-use.md" },
    { id: "prompt.overview", kind: "doc", category: "prompt-engineering", mdx: "/docs/en/build-with-claude/prompt-engineering/overview.md" },
  ],
});

/** Resolve a canonical entity id to its full .md URL. */
export function resolveEntity(registry: EntityRegistry, id: string): string | null {
  const e = registry.entities.find((x) => x.id === id);
  if (!e || !e.mdx) return null;
  return `${registry.entityBase}${e.mdx}`;
}
