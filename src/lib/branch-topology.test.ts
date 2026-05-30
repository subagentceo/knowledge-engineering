/**
 * @cite vendor/anthropics/code.claude.com/docs/en/worktrees.md
 * @tdd green
 *
 * Canonical branch-topology parse/validate/generate. Spec (modeled on the real
 * anthropics/claude-code convention <user>/<ticket>-<desc>):
 *   <git-user>/<JIRA-KEY>-<kebab-description>
 *   alexjadecli/KNOW-12-canonical-branch-topology
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  JIRA_BOARD,
  parseBranch,
  validateBranch,
  isValidBranch,
  generateBranch,
  normalizeUser,
  normalizeDescription,
  sessionTrailer,
  parseSessionTrailer,
} from "./branch-topology.ts";

const GOOD = "alexjadecli/KENG-1037-canonical-branch-topology";

test("board alias is the 4-char KENG for this repo", () => {
  assert.equal(JIRA_BOARD, "KENG");
});

test("parses a canonical branch into user / key / description", () => {
  assert.deepEqual(parseBranch(GOOD), {
    user: "alexjadecli",
    key: "KENG-1037",
    description: "canonical-branch-topology",
  });
});

test("a canonical branch validates clean", () => {
  assert.deepEqual(validateBranch(GOOD), []);
  assert.ok(isValidBranch(GOOD));
});

test("accepts a single-word and a many-word description (4-digit key)", () => {
  assert.ok(isValidBranch("alexjadecli/KENG-1000-x"));
  assert.ok(
    isValidBranch("alexjadecli/KENG-3661-prevent-status-line-overflow-rfc-8707"),
  );
});

test("rejects a missing user segment (no slash)", () => {
  assert.equal(validateBranch("KENG-1012-no-user")[0].code, "shape");
});

test("rejects an uppercase or punctuated user", () => {
  assert.ok(validateBranch("Alex-Jadecli/KENG-1012-x").some((e) => e.code === "user"));
});

test("rejects a sub-1000 (non-4-digit) key — numbering starts at 1000 so keys are always 4 digits", () => {
  assert.ok(
    validateBranch("alexjadecli/KENG-12-x").some((e) => e.code === "key-format"),
  );
  assert.ok(
    validateBranch("alexjadecli/KENG-0012-x").some((e) => e.code === "key-format"),
  );
});

test("rejects a lowercase or wrong-width board key", () => {
  assert.ok(
    validateBranch("alexjadecli/keng-1012-x").some(
      (e) => e.code === "key-format" || e.code === "user",
    ),
  );
  assert.ok(
    validateBranch("alexjadecli/KEN-1012-x").some((e) => e.code === "key-format"),
  );
});

test("rejects a key on the wrong board (repo is bound to KENG)", () => {
  assert.ok(
    validateBranch("alexjadecli/SCRM-1012-x").some((e) => e.code === "key-board"),
  );
});

test("rejects an UPPERCASE description", () => {
  assert.ok(
    validateBranch("alexjadecli/KENG-1012-Add-Retry").some(
      (e) => e.code === "description" || e.code === "key-format",
    ),
  );
});

test("normalizeUser strips punctuation and lowercases", () => {
  assert.equal(normalizeUser("alex-jadecli"), "alexjadecli");
  assert.equal(normalizeUser("Alex.Jadecli"), "alexjadecli");
});

test("normalizeDescription kebabs a free-form phrase", () => {
  assert.equal(normalizeDescription("Add Retry Logic!"), "add-retry-logic");
  assert.equal(normalizeDescription("  trailing--dashes  "), "trailing-dashes");
});

test("generateBranch builds the canonical name from a bare 4-digit issue number", () => {
  assert.equal(
    generateBranch({
      user: "alex-jadecli",
      issue: 1037,
      description: "Canonical branch topology",
    }),
    GOOD,
  );
});

test("generateBranch accepts a full key and uppercases it", () => {
  assert.equal(
    generateBranch({ user: "alexjadecli", issue: "keng-1009", description: "fix gate" }),
    "alexjadecli/KENG-1009-fix-gate",
  );
});

test("generateBranch throws on a sub-1000 issue (numbering starts at 1000)", () => {
  assert.throws(() =>
    generateBranch({ user: "alexjadecli", issue: 9, description: "x" }),
  );
});

test("generateBranch throws on an off-board key", () => {
  assert.throws(() =>
    generateBranch({ user: "alexjadecli", issue: "SCRM-1001", description: "x" }),
  );
});

test("session trailer round-trips the OTel session.id", () => {
  const id = "9cd36c62-f630-46ab-a4a3-0c606f3c2799";
  assert.equal(sessionTrailer(id), `Claude-Session: ${id}`);
  assert.equal(parseSessionTrailer(`feat: x (O1)\n\n${sessionTrailer(id)}\n`), id);
});

test("parseSessionTrailer returns null when the trailer is absent", () => {
  assert.equal(parseSessionTrailer("feat: no trailer (O1)"), null);
});
