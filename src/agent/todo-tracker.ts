/**
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/todo-tracking.md
 */
// src/agent/todo-tracker.ts
//
// Watches the Agent SDK message stream and renders a unified progress view
// regardless of whether the agent emitted TodoWrite (headless) or
// TaskCreate/TaskUpdate (interactive).
//
// Source pattern: code.claude.com/docs/en/agent-sdk/todo-tracking.md
// (always fetched as the .md variant, never the bare HTML page)

import { query } from "@anthropic-ai/claude-agent-sdk";

import { coerceColor, colorize, type Color } from "../lib/ansi-color.js";
import { getOpenFeatureClient } from "../lib/openfeature.js";
import { TodoState, type Todo, type TodoStatus as Status } from "./todo-state.js";

const ICON: Record<Status, string> = {
  completed: "[x]",
  in_progress: "[~]",
  pending: "[ ]",
};

export class TodoTracker {
  private state = new TodoState();
  private cachedColor: Color | null = null;

  /**
   * Phase 13.B+ (O6). Resolve the `color-code` flag (one of 8) via
   * OpenFeature. Cached per TodoTracker instance — render() may fire
   * many times during a single session and we don't want to evaluate
   * on every redraw. The cached value reflects the flag at first
   * render; subsequent flag changes require a new TodoTracker.
   */
  private async resolveColor(): Promise<Color> {
    if (this.cachedColor !== null) return this.cachedColor;
    const client = getOpenFeatureClient();
    const raw = await client.getStringValue("color-code", "cyan");
    this.cachedColor = coerceColor(raw);
    return this.cachedColor;
  }

  async display(): Promise<void> {
    const list = this.state.list();
    if (list.length === 0) return;
    const { completed, inProgress, total } = this.state.progress();

    const color = await this.resolveColor();
    const isTty = process.stdout.isTTY === true;

    process.stdout.write(`\nProgress: ${completed}/${total} completed\n`);
    process.stdout.write(`Currently working on: ${inProgress} task(s)\n\n`);
    list.forEach((t, i) => {
      const text = t.status === "in_progress" ? t.activeForm : t.content;
      const icon = colorize(color, ICON[t.status], isTty);
      process.stdout.write(`${i + 1}. ${icon} ${text}\n`);
    });
  }

  async track(prompt: string, maxTurns = 20): Promise<void> {
    for await (const message of query({ prompt, options: { maxTurns } })) {
      if (message.type !== "assistant") continue;
      for (const block of message.message.content) {
        if (block.type !== "tool_use") continue;

        switch (block.name) {
          case "TodoWrite": {
            const todos = (block.input as { todos: Todo[] }).todos ?? [];
            this.state.replaceAll(todos);
            await this.display();
            break;
          }
          case "TaskCreate": {
            const t = block.input as Todo & { id: string };
            this.state.upsert(t.id, t);
            await this.display();
            break;
          }
          case "TaskUpdate": {
            const t = block.input as { id: string; status?: Status; content?: string };
            this.state.upsert(t.id, t);
            await this.display();
            break;
          }
          default:
            // ignore other tools
            break;
        }
      }
    }
  }
}

// CLI entry: `tsx src/agent/todo-tracker.ts "your prompt"`
if (import.meta.url === `file://${process.argv[1]}`) {
  const prompt = process.argv.slice(2).join(" ") || "Plan and execute a 3-step task with todos.";
  await new TodoTracker().track(prompt);
}
