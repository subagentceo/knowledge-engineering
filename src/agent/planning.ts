/**
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/todo-tracking.md
 */
// src/agent/planning.ts
//
// Mode-aware task planner for the orchestrator.
//
// Two surfaces, per code.claude.com/docs/en/tools-reference.md:
//   - Headless / Agent SDK runs       -> TodoWrite
//   - Interactive Claude Code session -> TaskCreate / TaskGet / TaskList / TaskUpdate
//
// Loop and schedule are first-class step kinds. The planner does NOT execute
// them itself; it emits plan steps that the runtime maps to:
//   - kind: "loop"     -> /loop slash command (session-scoped, .claude/loop.md fallback)
//   - kind: "schedule" -> /schedule slash command (Anthropic-managed routines)
//
// OAuth-only: this module never reads ANTHROPIC_API_KEY. assertOAuthOnly()
// is called at module load and will throw loudly if the env var is set.

import { z } from "zod";
import { assertOAuthOnly } from "../oauth/token.js";

assertOAuthOnly();

// ---------- Schemas ----------
export const TodoStatus = z.enum(["pending", "in_progress", "completed"]);
export type TodoStatus = z.infer<typeof TodoStatus>;

export const StepKind = z.enum([
  "task",      // a normal todo / task
  "loop",      // run repeatedly while session is open  -> /loop
  "schedule",  // recurring or one-shot routine         -> /schedule
  "subagent",  // dispatch to a named subagent
  "verify",    // verifier subagent gate
]);
export type StepKind = z.infer<typeof StepKind>;

export const PlanStep = z.object({
  id: z.string().min(1),
  kind: StepKind,
  content: z.string().min(1),                // imperative form: "Fetch llms.txt"
  activeForm: z.string().min(1),             // present-progressive: "Fetching llms.txt"
  status: TodoStatus.default("pending"),

  // Loop-only fields
  loop: z
    .object({
      interval: z.string().optional(),       // e.g. "5m"; omit => self-paced
      prompt: z.string().optional(),         // omit => use .claude/loop.md
      maxIterations: z.number().int().positive().optional(),
    })
    .optional(),

  // Schedule-only fields
  schedule: z
    .object({
      description: z.string().min(1),        // natural-language for /schedule
      cadence: z.string().optional(),        // e.g. "every weekday 9am"
      oneShot: z.boolean().optional(),
    })
    .optional(),

  // Subagent-only fields
  subagent: z
    .object({
      name: z.enum(["npm-research", "verifier"]).or(z.string()),
      input: z.string().min(1),
    })
    .optional(),

  // Citation discipline (used by verifier)
  source_url: z.string().url().optional(),
  last_fetched: z.string().datetime().optional(),
});
export type PlanStep = z.infer<typeof PlanStep>;

export const Plan = z.array(PlanStep).min(1);
export type Plan = z.infer<typeof Plan>;

// ---------- Mode detection ----------
export type RunMode = "headless" | "interactive";

export interface PlannerOptions {
  mode: RunMode;
  // Tool emitter abstraction so this module is testable without the SDK.
  emit: (toolName: string, input: unknown) => Promise<void> | void;
}

// ---------- Public planner API ----------
export class Planner {
  private plan: Plan = [];
  constructor(private opts: PlannerOptions) {}

  /** Replace the entire plan and emit a single TodoWrite (headless only). */
  async setPlan(plan: Plan): Promise<void> {
    this.plan = Plan.parse(plan);
    enforceSinglyInProgress(this.plan);
    if (this.opts.mode === "headless") {
      await this.opts.emit("TodoWrite", { todos: this.toTodoWriteShape() });
    } else {
      // interactive: create each task individually
      for (const step of this.plan) {
        await this.opts.emit("TaskCreate", this.toTaskCreateShape(step));
      }
    }
  }

  /** Transition a single step's status. */
  async setStatus(id: string, status: TodoStatus): Promise<void> {
    const step = this.plan.find((s) => s.id === id);
    if (!step) throw new Error(`[planner] unknown step id: ${id}`);
    step.status = status;
    enforceSinglyInProgress(this.plan);

    if (this.opts.mode === "headless") {
      await this.opts.emit("TodoWrite", { todos: this.toTodoWriteShape() });
    } else {
      await this.opts.emit("TaskUpdate", { id, status });
    }
  }

  /**
   * Dispatch a loop step to the /loop slash command.
   *
   * Does NOT mark the step in_progress — loops run in the background once
   * launched, so the orchestrator's foreground "what am I working on now"
   * slot stays open for whatever else is active. The R3 singly-in_progress
   * invariant is about *foreground* work, not background watches.
   */
  async dispatchLoop(id: string): Promise<void> {
    const step = this.plan.find((s) => s.id === id && s.kind === "loop");
    if (!step) throw new Error(`[planner] no loop step with id: ${id}`);
    const interval = step.loop?.interval ?? "";
    const prompt = step.loop?.prompt ?? ""; // empty => /loop falls back to .claude/loop.md
    const command = `/loop ${interval} ${prompt}`.replace(/\s+/g, " ").trim();
    await this.opts.emit("SlashCommand", { command });
  }

  /**
   * Dispatch a schedule step to the /schedule slash command.
   *
   * Same rationale as dispatchLoop: routines outlive the session and run
   * on Anthropic-managed infra; the orchestrator does not occupy its
   * single in_progress slot waiting for a routine.
   */
  async dispatchSchedule(id: string): Promise<void> {
    const step = this.plan.find((s) => s.id === id && s.kind === "schedule");
    if (!step) throw new Error(`[planner] no schedule step with id: ${id}`);
    const command = `/schedule ${step.schedule?.description ?? ""}`.trim();
    await this.opts.emit("SlashCommand", { command });
  }

  /**
   * Dispatch a subagent step.
   *
   * Subagents DO occupy the foreground in_progress slot — the orchestrator
   * is waiting on their return before continuing.
   */
  async dispatchSubagent(id: string): Promise<void> {
    const step = this.plan.find((s) => s.id === id && s.kind === "subagent");
    if (!step?.subagent) throw new Error(`[planner] no subagent step with id: ${id}`);
    await this.opts.emit("Agent", {
      subagent_type: step.subagent.name,
      prompt: step.subagent.input,
    });
    await this.setStatus(id, "in_progress");
  }

  getPlan(): Plan {
    return structuredClone(this.plan);
  }

  // ---------- shape adapters ----------
  private toTodoWriteShape() {
    return this.plan.map((s) => ({
      content: s.content,
      activeForm: s.activeForm,
      status: s.status,
    }));
  }

  private toTaskCreateShape(step: PlanStep) {
    return {
      id: step.id,
      content: step.content,
      activeForm: step.activeForm,
      status: step.status,
      metadata: {
        kind: step.kind,
        source_url: step.source_url,
        last_fetched: step.last_fetched,
      },
    };
  }
}

// ---------- Invariants ----------
export function enforceSinglyInProgress(plan: Plan): void {
  const inProgress = plan.filter((s) => s.status === "in_progress");
  if (inProgress.length > 1) {
    throw new Error(
      `[planner] invariant violation: ${inProgress.length} steps in_progress; only one allowed`
    );
  }
}
