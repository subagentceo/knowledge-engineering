/**
 * @cite frontend/agent-inbox-worker/src/manifest.ts
 * @cite frontend/agent-inbox-worker/src/worker.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import {
  DOMAIN,
  FUNCTIONS,
  TIERS,
  ROLES,
  roleEmail,
  localPart,
  type Role,
} from "../src/manifest.js";

describe("ROLES", () => {
  test("generates 12 roles (4 functions x 3 tiers)", () => {
    assert.equal(ROLES.length, 12);
  });

  test("all roles are unique", () => {
    assert.equal(new Set(ROLES).size, ROLES.length);
  });

  test("includes expected combinations", () => {
    assert.ok(ROLES.includes("product-manager"));
    assert.ok(ROLES.includes("finance-subagent"));
    assert.ok(ROLES.includes("legal-coworker"));
    assert.ok(ROLES.includes("project-manager"));
  });

  test("follows <function>-<tier> pattern", () => {
    for (const role of ROLES) {
      const parts = role.split("-");
      assert.ok(parts.length === 2, `${role} should have exactly one hyphen`);
      assert.ok((FUNCTIONS as readonly string[]).includes(parts[0]!), `${role} has unknown function: ${parts[0]}`);
      assert.ok((TIERS as readonly string[]).includes(parts[1]!), `${role} has unknown tier: ${parts[1]}`);
    }
  });
});

describe("roleEmail", () => {
  test("builds email from role", () => {
    assert.equal(roleEmail("product-manager"), "product-manager@subagentknowledge.com");
  });

  test("uses DOMAIN constant", () => {
    assert.ok(roleEmail("finance-coworker").endsWith(`@${DOMAIN}`));
  });
});

describe("localPart", () => {
  test("extracts local part from email", () => {
    assert.equal(localPart("product-manager@subagentknowledge.com"), "product-manager");
  });

  test("strips +tag extensions", () => {
    assert.equal(localPart("finance-manager+urgent@subagentknowledge.com"), "finance-manager");
  });

  test("lowercases", () => {
    assert.equal(localPart("Product-Manager@FOO.COM"), "product-manager");
  });

  test("returns empty string for empty input", () => {
    assert.equal(localPart(""), "");
  });
});

describe("DOMAIN", () => {
  test("is subagentknowledge.com", () => {
    assert.equal(DOMAIN, "subagentknowledge.com");
  });
});
