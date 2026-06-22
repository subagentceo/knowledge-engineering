/**
 * @cite frontend/agent-inbox-worker/src/manifest.ts
 * @cite frontend/agent-inbox-worker/src/worker.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import {
  DOMAIN,
  ROLES,
  roleEmail,
  localPart,
  isKnownRole,
  type Role,
} from "../src/manifest.js";

describe("ROLES", () => {
  test("has exactly 12 coworker addresses (matches live Cloudflare Email Routing)", () => {
    assert.equal(ROLES.length, 12);
  });

  test("all roles are unique", () => {
    assert.equal(new Set(ROLES).size, ROLES.length);
  });

  test("includes all 12 canonical coworker ids", () => {
    const expected: Role[] = [
      "product-management-coworker",
      "project-management-coworker",
      "design-coworker",
      "engineering-coworker",
      "data-coworker",
      "sales-coworker",
      "operations-coworker",
      "finance-coworker",
      "legal-coworker",
      "marketing-coworker",
      "agent-resources-coworker",
      "human-resources-coworker",
    ];
    for (const id of expected) {
      assert.ok(ROLES.includes(id), `missing coworker id: ${id}`);
    }
  });

  test("all roles end with -coworker", () => {
    for (const role of ROLES) {
      assert.ok(role.endsWith("-coworker"), `${role} should end with -coworker`);
    }
  });
});

describe("roleEmail", () => {
  test("builds email from role", () => {
    assert.equal(
      roleEmail("product-management-coworker"),
      "product-management-coworker@subagentknowledge.com",
    );
  });

  test("uses DOMAIN constant", () => {
    assert.ok(roleEmail("finance-coworker").endsWith(`@${DOMAIN}`));
  });
});

describe("localPart", () => {
  test("extracts local part from email", () => {
    assert.equal(
      localPart("product-management-coworker@subagentknowledge.com"),
      "product-management-coworker",
    );
  });

  test("strips +tag extensions", () => {
    assert.equal(
      localPart("finance-coworker+urgent@subagentknowledge.com"),
      "finance-coworker",
    );
  });

  test("lowercases", () => {
    assert.equal(localPart("Engineering-Coworker@FOO.COM"), "engineering-coworker");
  });

  test("returns empty string for empty input", () => {
    assert.equal(localPart(""), "");
  });
});

describe("isKnownRole", () => {
  test("returns true for known role local part", () => {
    assert.ok(isKnownRole("legal-coworker"));
    assert.ok(isKnownRole("data-coworker"));
  });

  test("returns false for unknown local parts", () => {
    assert.ok(!isKnownRole("product-manager"));   // old stale name
    assert.ok(!isKnownRole("finance-subagent"));   // old stale name
    assert.ok(!isKnownRole("unknown-role"));
  });
});

describe("DOMAIN", () => {
  test("is subagentknowledge.com", () => {
    assert.equal(DOMAIN, "subagentknowledge.com");
  });
});
