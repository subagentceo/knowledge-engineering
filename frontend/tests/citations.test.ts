// Citations:
//   @cite rubrics/phase-13.md (O7)
//   @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { citationsByYear, filterCitations, issuedYear, type CitationRow } from "../src/citations.js";

const clio: CitationRow = {
  id: "anthropic-sitemap:research:clio",
  type: "article",
  title: "Clio: privacy-preserving insights",
  abstract: "How people use Claude in the real world.",
  issued: { "date-parts": [[2024, 12, 12]] },
};
const econ: CitationRow = {
  id: "anthropic-sitemap:research:team:economic-research",
  type: "article",
  title: "Economic Research",
};
const rows: CitationRow[] = [clio, econ];

test("filterCitations: empty query returns all rows", () => {
  assert.equal(filterCitations(rows, "").length, 2);
  assert.equal(filterCitations(rows, "   ").length, 2);
});

test("filterCitations matches title, abstract, and id case-insensitively", () => {
  assert.deepEqual(filterCitations(rows, "CLIO"), [clio]);
  assert.equal(filterCitations(rows, "real world").length, 1);
  assert.deepEqual(filterCitations(rows, "team:economic"), [econ]);
  assert.equal(filterCitations(rows, "no-such-thing").length, 0);
});

test("issuedYear renders year or em-dash placeholder", () => {
  assert.equal(issuedYear(clio), "2024");
  assert.equal(issuedYear(econ), "—");
});

test("citationsByYear counts rows per year, ascending", () => {
  const more: CitationRow[] = [
    ...rows,
    { id: "a", type: "article", title: "A", issued: { "date-parts": [[2024, 1]] } },
    { id: "b", type: "article", title: "B", issued: { "date-parts": [[2023, 6]] } },
  ];
  assert.deepEqual(citationsByYear(more), [
    { year: "2023", count: 1 },
    { year: "2024", count: 2 },
    { year: "—", count: 1 },
  ]);
});

test("citationsByYear: undated bucket sorts last, empty input yields empty strip", () => {
  assert.deepEqual(citationsByYear([]), []);
  assert.deepEqual(citationsByYear([econ, clio]), [
    { year: "2024", count: 1 },
    { year: "—", count: 1 },
  ]);
});
