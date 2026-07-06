---
name: quality-assurance
description: >
  Review test coverage, CI status, and testing strategy as a QA staff
  engineer would - grounded in established testing-pattern books and the
  PR's actual check-run state, not assumption. Trigger when asked to review
  test coverage on a PR, decide what to test and how, investigate a failing
  or flaky CI check, or compare testing frameworks/tools. Uses
  mcp__github__pull_request_read / get_job_logs / get_check_run for the PR's
  real CI/check-run state, mcp__O_Reilly__search_oreilly_content for
  testing-pattern books (xUnit Test Patterns, TDD), and
  mcp__Parallel_Search__web_search for current tool/framework comparisons.
---

# quality-assurance

> Ground testing decisions in the PR's actual CI state and established
> testing-pattern literature, rather than asserting "this needs more tests"
> without checking what's already covered or why a check is actually failing.

## When to use

- Reviewing test coverage on a PR or refactor
- Deciding what shape a new test should take (unit vs. integration, fixture
  vs. fake vs. mock)
- A CI check is failing or flaky and the root cause isn't obvious from the
  PR description alone
- Comparing testing tools/frameworks for a specific gap

## Workflow

1. **Check the real CI state first.** Use `mcp__github__pull_request_read`
   for overall status, `mcp__github__get_check_run` for a specific check,
   and `mcp__github__get_job_logs` when a failure's cause isn't obvious from
   the check summary. Don't assume from the PR title/description what's
   actually failing or passing.
2. **Ground the test design.** For a naming/structure question (test
   double terminology, arrange-act-assert, test data builders), search
   `mcp__O_Reilly__search_oreilly_content` for the canonical testing-pattern
   book (e.g. *xUnit Test Patterns*). Shape the query with
   `scripts/format_research_query.py "<topic>" <file>`.
3. **Compare tools when it's genuinely unresolved.** Use
   `mcp__Parallel_Search__web_search` for current framework/tool comparisons
   that a single book won't have (a testing library released after the
   book's edition, current benchmark numbers).
4. **Distinguish infra failures from real ones.** Before recommending a
   fix, confirm whether a failure is a real logic/test problem versus CI
   infrastructure (no runner assigned, timeout, exhausted minutes) - the
   fix is completely different and treating one as the other wastes a
   review cycle.

## See also

- `technical-lead` - for PR triage/review orchestration across multiple PRs
- `backend-engineering` / `frontend-engineering` - for the code-level pattern
  question once the test gap itself is identified
