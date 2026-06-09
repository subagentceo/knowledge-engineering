/**
 * repo-mail.ts — version-controlled mail store for agent-to-agent messages.
 *
 * Layout (tracked in git, committed via the normal commit-per-todo loop):
 *
 *   mail/<recipient>/inbox/<id>.json   — delivered, unread
 *   mail/<recipient>/read/<id>.json    — read (receive_mail moves it here)
 *   mail/broadcast/inbox/<id>.json     — visible to every agent
 *
 * Status lifecycle mirrors the Cloudflare email lifecycle (send → route →
 * deliver → read) with git as the transport: a mail "delivers" when the file
 * lands on a branch other agents pull. Files are append-only artifacts —
 * reading moves the file between directories rather than mutating history,
 * so `git log mail/` is the full audit trail.
 *
 * @cite vendor/cloudflare/developers.cloudflare.com/email-service/llms.txt
 * @cite src/db/mailbox-store.ts (persistence-shape precedent)
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { RepoMail } from "./mailbox-types.js";

export const MAIL_ROOT = "mail";

function safeAgent(agentId: string): string {
  return agentId.replace(/[^a-zA-Z0-9_-]/g, "_");
}

function inboxDir(repoRoot: string, agent: string): string {
  return resolve(repoRoot, MAIL_ROOT, safeAgent(agent), "inbox");
}

function readDir(repoRoot: string, agent: string): string {
  return resolve(repoRoot, MAIL_ROOT, safeAgent(agent), "read");
}

export interface SendMailInput {
  from: string;
  to: string; // agent id or "broadcast"
  subject: string;
  body: string;
  thread_id?: string;
  reply_to?: string;
  labels?: string[];
}

/** Write a mail file into the recipient's inbox. Returns the validated mail. */
export function sendMail(repoRoot: string, input: SendMailInput): RepoMail {
  const mail = RepoMail.parse({
    ...input,
    id: `mail_${randomUUID().replace(/-/g, "")}`,
    timestamp: new Date().toISOString(),
    status: "delivered",
    labels: input.labels ?? [],
  });
  const dir = inboxDir(repoRoot, mail.to);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${mail.id}.json`), JSON.stringify(mail, null, 2) + "\n");
  return mail;
}

function listDir(dir: string): RepoMail[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => RepoMail.parse(JSON.parse(readFileSync(join(dir, f), "utf8"))))
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

export interface ReceiveOptions {
  markRead?: boolean; // move inbox → read (default true)
  includeBroadcast?: boolean; // default true
  thread_id?: string;
}

/**
 * Read an agent's unread mail (own inbox + broadcast). With markRead, own
 * inbox files move to read/ — broadcast mail is never moved, every agent
 * must see it.
 */
export function receiveMail(repoRoot: string, agent: string, opts: ReceiveOptions = {}): RepoMail[] {
  const { markRead = true, includeBroadcast = true, thread_id } = opts;
  const own = listDir(inboxDir(repoRoot, agent));
  const broadcast = includeBroadcast && safeAgent(agent) !== "broadcast"
    ? listDir(inboxDir(repoRoot, "broadcast"))
    : [];
  let mails = [...own, ...broadcast];
  if (thread_id !== undefined) mails = mails.filter((m) => m.thread_id === thread_id);

  if (markRead) {
    const dest = readDir(repoRoot, agent);
    for (const mail of own) {
      if (thread_id !== undefined && mail.thread_id !== thread_id) continue;
      mkdirSync(dest, { recursive: true });
      const updated: RepoMail = { ...mail, status: "read" };
      writeFileSync(join(dest, `${mail.id}.json`), JSON.stringify(updated, null, 2) + "\n");
      rmSync(join(inboxDir(repoRoot, agent), `${mail.id}.json`));
    }
  }
  return mails.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

/** Full thread across inbox + read for an agent (plus broadcast). */
export function readThread(repoRoot: string, agent: string, threadId: string): RepoMail[] {
  const dirs = [
    inboxDir(repoRoot, agent),
    readDir(repoRoot, agent),
    inboxDir(repoRoot, "broadcast"),
  ];
  return dirs
    .flatMap(listDir)
    .filter((m) => m.thread_id === threadId)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}
