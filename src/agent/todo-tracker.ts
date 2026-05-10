// src/agent/todo-tracker.ts
//
// Watches the Agent SDK message stream and renders a unified progress view
// regardless of whether the agent emitted TodoWrite (headless) or
// TaskCreate/TaskUpdate (interactive).
//
// Source pattern: code.claude.com/docs/en/agent-sdk/todo-tracking.md
// (always fetched as the .md variant, never the bare HTML page)

import { query } from "@anthropic-ai/claude-agent-sdk";

type Status = "pending" | "in_progress" | "completed";

interface Todo {
  id?: string;
  content: string;
  activeForm: string;
  status: Status;
}

const ICON: Record<Status, string> = {
  completed: "[x]",
  in_progress: "[~]",
  pending: "[ ]",
};

export class TodoTracker {
  private todos = new Map<string, Todo>();
  private order: string[] = [];

  display(): void {
    if (this.todos.size === 0) return;
    const list = this.order.map((k) => this.todos.get(k)!).filter(Boolean);
    const completed = list.filter((t) => t.status === "completed").length;
    const inProgress = list.filter((t) => t.status === "in_progress").length;

    process.stdout.write(`\nProgress: ${completed}/${list.length} completed\n`);
    process.stdout.write(`Currently working on: ${inProgress} task(s)\n\n`);
    list.forEach((t, i) => {
      const text = t.status === "in_progress" ? t.activeForm : t.content;
      process.stdout.write(`${i + 1}. ${ICON[t.status]} ${text}\n`);
    });
  }

  /** Replace the entire list (TodoWrite semantics). */
  private replaceAll(todos: Todo[]): void {
    this.todos.clear();
    this.order = [];
    todos.forEach((t, i) => {
      const id = t.id ?? `todo-${i}`;
      this.todos.set(id, { ...t, id });
      this.order.push(id);
    });
  }

  /** Insert/update a single task (TaskCreate / TaskUpdate semantics). */
  private upsert(id: string, patch: Partial<Todo>): void {
    const existing = this.todos.get(id);
    if (existing) {
      this.todos.set(id, { ...existing, ...patch });
    } else {
      const next: Todo = {
        id,
        content: patch.content ?? "(no content)",
        activeForm: patch.activeForm ?? patch.content ?? "(no activeForm)",
        status: patch.status ?? "pending",
      };
      this.todos.set(id, next);
      this.order.push(id);
    }
  }

  async track(prompt: string, maxTurns = 20): Promise<void> {
    for await (const message of query({ prompt, options: { maxTurns } })) {
      if (message.type !== "assistant") continue;
      for (const block of message.message.content) {
        if (block.type !== "tool_use") continue;

        switch (block.name) {
          case "TodoWrite": {
            const todos = (block.input as { todos: Todo[] }).todos ?? [];
            this.replaceAll(todos);
            this.display();
            break;
          }
          case "TaskCreate": {
            const t = block.input as Todo & { id: string };
            this.upsert(t.id, t);
            this.display();
            break;
          }
          case "TaskUpdate": {
            const t = block.input as { id: string; status?: Status; content?: string };
            this.upsert(t.id, t);
            this.display();
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
