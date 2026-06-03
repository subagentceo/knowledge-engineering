/**
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 * @cite src/db/knowledge-graph.ts
 *
 * MCP lane: exposes the knowledge graph as 7 tools.
 * Tool names: kg_create_entities, kg_create_relations, kg_add_observations,
 *   kg_delete_entities, kg_delete_relations, kg_read_graph, kg_search_nodes,
 *   kg_open_nodes.
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { jsonResult } from "../bridge-utils.js";
import {
  createEntities,
  createRelations,
  addObservations,
  deleteEntities,
  deleteRelations,
  readGraph,
  searchNodes,
  openNodes,
} from "../../db/knowledge-graph.js";
import { type D1ReplicaAdapter, majorityRead } from "../consensus.js";

export interface KGConsensusConfig {
  adapters: D1ReplicaAdapter[];
  quorum: number;
}

const EntityTypeSchema = z.enum([
  "coworker",
  "connector",
  "outcome",
  "artifact",
  "task",
  "session",
]);

const KGEntitySchema = z.object({
  name: z.string(),
  type: EntityTypeSchema,
  observations: z.array(z.string()).default([]),
});

const KGRelationSchema = z.object({
  from: z.string(),
  relation: z.string().describe("active-voice verb, e.g. 'implements', 'depends-on'"),
  to: z.string(),
});

export function registerKnowledgeGraph(server: McpServer, consensus?: KGConsensusConfig): void {
  const useConsensus =
    consensus !== undefined && consensus.adapters.length >= consensus.quorum;

  server.tool(
    "kg_create_entities",
    "Create one or more typed knowledge-graph entities. Idempotent: duplicate names are skipped.",
    {
      entities: z.array(KGEntitySchema).describe("entities to create"),
    },
    async ({ entities }) => {
      createEntities(entities);
      return jsonResult({ created: entities.length });
    }
  );

  server.tool(
    "kg_create_relations",
    "Create directed relations between named entities. Idempotent: duplicate from|relation|to triples are skipped.",
    {
      relations: z.array(KGRelationSchema).describe("relations to create"),
    },
    async ({ relations }) => {
      createRelations(relations);
      return jsonResult({ created: relations.length });
    }
  );

  server.tool(
    "kg_add_observations",
    "Append observations to an existing entity.",
    {
      entity_name: z.string().describe("name of the entity to update"),
      observations: z.array(z.string()).describe("observations to append"),
    },
    async ({ entity_name, observations }) => {
      addObservations(entity_name, observations);
      return jsonResult({ entity: entity_name, appended: observations.length });
    }
  );

  server.tool(
    "kg_delete_entities",
    "Delete entities by name. Also removes all relations that touch the deleted entities.",
    {
      names: z.array(z.string()).describe("entity names to delete"),
    },
    async ({ names }) => {
      deleteEntities(names);
      return jsonResult({ deleted: names.length });
    }
  );

  server.tool(
    "kg_delete_relations",
    "Delete specific directed relations.",
    {
      relations: z.array(KGRelationSchema).describe("relations to delete"),
    },
    async ({ relations }) => {
      deleteRelations(relations);
      return jsonResult({ deleted: relations.length });
    }
  );

  server.tool(
    "kg_read_graph",
    "Return the full knowledge graph (all entities and relations).",
    {},
    async () => {
      if (useConsensus) {
        const result = await majorityRead(
          consensus!.adapters,
          consensus!.quorum,
          "kg_read_graph",
          (a) => a.readGraph(),
        );
        return jsonResult(result);
      }
      return jsonResult(readGraph());
    }
  );

  server.tool(
    "kg_search_nodes",
    "Full-text search across entity names, types, and observations. Returns matching entities.",
    {
      query: z.string().describe("substring to search for"),
    },
    async ({ query }) => {
      if (useConsensus) {
        const result = await majorityRead(
          consensus!.adapters,
          consensus!.quorum,
          "kg_search_nodes",
          (a) => a.searchNodes(query),
        );
        return jsonResult(result);
      }
      return jsonResult(searchNodes(query));
    }
  );

  server.tool(
    "kg_open_nodes",
    "Retrieve specific entities by name plus all relations that touch them.",
    {
      names: z.array(z.string()).describe("entity names to open"),
    },
    async ({ names }) => {
      if (useConsensus) {
        const result = await majorityRead(
          consensus!.adapters,
          consensus!.quorum,
          "kg_open_nodes",
          (a) => a.openNodes(names),
        );
        return jsonResult(result);
      }
      return jsonResult(openNodes(names));
    }
  );
}
