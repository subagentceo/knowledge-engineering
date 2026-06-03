"""Programmatic graders for Claude prompt evals.

Each grader returns (status, why). `status` is one of:
  PASS, FAIL, PASS_SLOW

`PASS_SLOW` means correct-but-over-budget; surface separately so users can
trade off correctness against speed/cost.

Copy this file into your project's evals/ directory and import into your
eval runner. The graders take a `result` object that must expose:
  result.final_text         str
  result.actions            list[dict]   # for action_taken — empty list OK
  result.turns              int          # for efficiency — 0 OK
  result.tokens_in          int
  result.tokens_out         int
  result.wall_ms            int          # for wall_budget — 0 OK
  result.error              str | None

If your runner produces a different shape, write a small adapter rather
than rewriting the graders.

License: MIT
"""
from __future__ import annotations

import os
import re
from dataclasses import dataclass, field
from typing import Any, Callable

import anthropic

# ----------------------------- constants -----------------------------------

PASS = "pass"
FAIL = "fail"
PASS_SLOW = "pass-slow"

NUM_RE = re.compile(r"(\d[\d,]*\.?\d*)")
SKU_RE = re.compile(r"SKU-\d{4}")        # override in caller's project if format differs


# ----------------------------- result shim ---------------------------------

@dataclass
class AgentResult:
    """Minimal shape every grader expects. Adapt or extend for your runner."""
    final_text: str = ""
    actions: list[dict] = field(default_factory=list)
    turns: int = 0
    tokens_in: int = 0
    tokens_out: int = 0
    wall_ms: int = 0
    error: str | None = None


# ----------------------------- helpers -------------------------------------

def _nums(text: str) -> list[float]:
    """Extract every numeric token from a string."""
    out: list[float] = []
    for m in NUM_RE.findall(text):
        try:
            out.append(float(m.replace(",", "").rstrip(".")))
        except ValueError:
            pass
    return out


# ----------------------------- graders -------------------------------------

def exact_match(result: AgentResult, spec: dict) -> tuple[str, str]:
    """Any number in the response equals the target integer."""
    target = spec.get("value")
    if target is None and "source_fn" in spec:
        target = spec["source_fn"]()
    nums = [int(n) for n in _nums(result.final_text) if n == int(n)]
    if target in nums:
        return PASS, ""
    return FAIL, f"expected {target}, got {nums[:3] or 'none'}"


def set_match(result: AgentResult, spec: dict) -> tuple[str, str]:
    """Find all matches of `pattern` in the response; compare to `expected` set."""
    pattern = re.compile(spec.get("pattern", SKU_RE.pattern))
    target = set(spec["expected"])
    found = set(pattern.findall(result.final_text))
    missing = target - found
    extra = found - target
    if not missing:
        suffix = "" if not extra else f" ({len(extra)} extra)"
        return PASS, suffix
    sample = sorted(missing)[:2]
    return FAIL, f"missing {sample}{'…' if len(missing) > 2 else ''}"


def numeric_tolerance(result: AgentResult, spec: dict) -> tuple[str, str]:
    """Closest number in response within ±tolerance_pct of target."""
    target = float(spec["target"])
    tol_pct = float(spec.get("tolerance_pct", 20))
    nums = [n for n in _nums(result.final_text) if n > 5]   # ignore tiny indices
    if not nums:
        return FAIL, "no quantity found"
    best = min(nums, key=lambda n: abs(n - target))
    delta_pct = (best - target) / target * 100
    must = spec.get("must_mention", [])
    if must and not all(m.lower() in result.final_text.lower() for m in must):
        return FAIL, f"{delta_pct:+.0f}% vs target, didn't cite {must[0]}"
    if abs(delta_pct) <= tol_pct:
        return PASS, ""
    return FAIL, f"{delta_pct:+.0f}% vs target"


def regex_present(result: AgentResult, spec: dict) -> tuple[str, str]:
    """A regex must match somewhere in the response."""
    pat = re.compile(spec["pattern"], re.IGNORECASE)
    if pat.search(result.final_text):
        return PASS, ""
    return FAIL, spec.get("why", f"pattern not found: {spec['pattern'][:30]}")


def action_taken(result: AgentResult, spec: dict) -> tuple[str, str]:
    """One of result.actions matches kind/sku/qty criteria."""
    kind = spec.get("kind")
    not_kind = spec.get("not_kind")
    if not_kind:
        bad = [a for a in result.actions if a.get("kind") == not_kind]
        if bad:
            return FAIL, f"took {not_kind} action, expected escalation"

    matches = [a for a in result.actions if a.get("kind") == kind]
    if "sku" in spec:
        matches = [a for a in matches
                   if a.get("sku") == spec["sku"]
                   or spec["sku"] in str(a.get("message", ""))]

    if "min_count" in spec:
        seen: set[str] = set()
        for a in matches:
            s = a.get("sku")
            if not s:
                m = SKU_RE.search(str(a.get("message", "")))
                s = m.group(0) if m else None
            if s:
                seen.add(s)
        if len(seen) >= spec["min_count"]:
            return PASS, ""
        return FAIL, f"only {len(seen)} distinct {kind} (need ≥{spec['min_count']})"

    if not matches:
        if "must_mention" in spec:
            haystack = (result.final_text + " " + str(result.actions)).lower()
            if any(m in haystack for m in spec["must_mention"]):
                return PASS, ""
        return FAIL, f"no {kind} for {spec.get('sku', 'target')}"

    a = matches[0]
    qty = a.get("qty") or a.get("order_qty") or a.get("quantity")
    if "qty" in spec and qty != spec["qty"]:
        return FAIL, f"qty {qty} ≠ {spec['qty']}"
    if "min_qty" in spec and (qty or 0) < spec["min_qty"]:
        return FAIL, f"qty {qty} < min {spec['min_qty']}"
    return PASS, ""


def wall_budget(result: AgentResult, spec: dict) -> tuple[str, str]:
    """Wall-clock time must be ≤ budget_ms."""
    budget_ms = spec["budget_ms"]
    if result.wall_ms <= budget_ms:
        return PASS, ""
    return FAIL, f"{result.wall_ms/1000:.0f}s wall (budget {budget_ms/1000:.0f}s)"


def ranked_mention(result: AgentResult, spec: dict) -> tuple[str, str]:
    """Target string appears in first N body rows of the first markdown table."""
    target, top_n = spec["target"], spec.get("top", 3)
    lines = [ln for ln in result.final_text.splitlines() if ln.strip().startswith("|")]
    body = [ln for ln in lines if not re.match(r"^\s*\|[\s:|-]+\|\s*$", ln)][1:]
    head = body[:top_n]
    if any(target in row for row in head):
        return PASS, ""
    return FAIL, f"{target} not in top-{top_n} of ranked output"


def efficiency(result: AgentResult, spec: dict) -> tuple[str, str]:
    """action_taken AND within turn/token budget."""
    inner_status, inner_why = action_taken(result, spec)
    if inner_status == FAIL:
        return FAIL, inner_why
    bt = spec.get("budget_turns", 99)
    bk = spec.get("budget_tokens", 10**9)
    if result.turns > bt:
        return PASS_SLOW, f"correct, but {result.turns} turns (budget {bt})"
    if result.tokens_out > bk:
        return PASS_SLOW, f"correct, but {result.tokens_out} out-tokens (budget {bk})"
    return PASS, ""


def llm_judge(result: AgentResult, spec: dict) -> tuple[str, str]:
    """A separate Claude call grades the response against a rubric."""
    client = anthropic.Anthropic()
    rubric = spec["rubric"]
    model = spec.get("model", os.environ.get("EVAL_JUDGE_MODEL", "claude-sonnet-4-6"))
    msg = client.messages.create(
        model=model,
        max_tokens=200,
        messages=[{
            "role": "user",
            "content": (
                "You are grading an agent's response.\n\n"
                f"RUBRIC: {rubric}\n\n"
                f"RESPONSE:\n{result.final_text[:4000]}\n\n"
                "Reply with exactly: PASS: <one-line reason>  "
                "or  FAIL: <one-line reason>"
            ),
        }],
    )
    text = msg.content[0].text.strip()
    if text.upper().startswith("PASS"):
        return PASS, ""
    return FAIL, text.split(":", 1)[-1].strip()[:60]


def composite(result: AgentResult, spec: dict) -> tuple[str, str]:
    """AND a list of sub-graders. FAIL on any FAIL; PASS_SLOW if any sub is PASS_SLOW.

    Each entry in spec['checks'] is itself a {grader, expected} dict — the
    same shape grade() consumes — so this mirrors top-level dispatch.
    """
    worst = PASS
    whys: list[str] = []
    for sub in spec["checks"]:
        fn = GRADERS[sub["grader"]]
        # Sub-graders take the 'expected' dict, not the wrapper.
        # Tolerate flat sub-specs (no 'expected' key) for ergonomics.
        sub_expected = sub.get("expected", {k: v for k, v in sub.items() if k != "grader"})
        status, why = fn(result, sub_expected)
        if status == FAIL:
            return FAIL, why
        if status == PASS_SLOW:
            worst = PASS_SLOW
            if why:
                whys.append(why)
    return worst, "; ".join(whys)


# ----------------------------- registry ------------------------------------

GRADERS: dict[str, Callable[[AgentResult, dict], tuple[str, str]]] = {
    "exact_match": exact_match,
    "set_match": set_match,
    "numeric_tolerance": numeric_tolerance,
    "regex_present": regex_present,
    "action_taken": action_taken,
    "wall_budget": wall_budget,
    "ranked_mention": ranked_mention,
    "efficiency": efficiency,
    "llm_judge": llm_judge,
    "composite": composite,
}


def grade(task: dict, result: AgentResult) -> tuple[str, str]:
    """Apply the grader named in `task['grader']` to `result`."""
    if result.error:
        return FAIL, f"error: {result.error[:60]}"
    fn = GRADERS.get(task["grader"])
    if fn is None:
        return FAIL, f"unknown grader: {task['grader']}"
    return fn(result, task.get("expected", {}))
