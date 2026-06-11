/**
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/todo-tracking.md
 */
// src/agent/todo-state.ts
//
// Pure todo-state reducer extracted from TodoTracker so the merge semantics are
// unit-testable without the Agent SDK. TodoWrite replaces the whole list;
// TaskCreate/TaskUpdate upsert a single entry. Insertion order is preserved for
// rendering.
//
// Source pattern: code.claude.com/docs/en/agent-sdk/todo-tracking.md

export type TodoStatus = "pending" | "in_progress" | "completed";

export interface Todo {
  id?: string;
  content: string;
  activeForm: string;
  status: TodoStatus;
}

export interface Progress {
  completed: number;
  inProgress: number;
  total: number;
}

export class TodoState {
  private todos = new Map<string, Todo>();
  private order: string[] = [];

  /** Tasks in insertion order. */
  list(): Todo[] {
    return this.order.map((k) => this.todos.get(k)!).filter(Boolean);
  }

  progress(): Progress {
    const list = this.list();
    return {
      completed: list.filter((t) => t.status === "completed").length,
      inProgress: list.filter((t) => t.status === "in_progress").length,
      total: list.length,
    };
  }

  /** Replace the entire list (TodoWrite semantics). */
  replaceAll(todos: Todo[]): void {
    this.todos.clear();
    this.order = [];
    todos.forEach((t, i) => {
      const id = t.id ?? `todo-${i}`;
      this.todos.set(id, { ...t, id });
      this.order.push(id);
    });
  }

  /** Insert or patch a single task (TaskCreate / TaskUpdate semantics). */
  upsert(id: string, patch: Partial<Todo>): void {
    const existing = this.todos.get(id);
    if (existing) {
      this.todos.set(id, { ...existing, ...patch });
      return;
    }
    this.todos.set(id, {
      id,
      content: patch.content ?? "(no content)",
      activeForm: patch.activeForm ?? patch.content ?? "(no activeForm)",
      status: patch.status ?? "pending",
    });
    this.order.push(id);
  }
}
