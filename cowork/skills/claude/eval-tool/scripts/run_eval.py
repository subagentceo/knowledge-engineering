#!/usr/bin/env python3
"""Run a programmatic eval suite against the Anthropic API.

Usage:
    python run_eval.py --tasks tasks.yaml --prompt "system prompt here"
    python run_eval.py --tasks tasks.yaml --prompt-file system.txt --trials 3
    python run_eval.py --tasks tasks.yaml --prompt-file system.txt --filter "T01,T02"

This is the minimal runner — it doesn't do parallelism, HTML reports, or
side-by-side compare. Lift those from the cwc-workshops agent-decomposition
repo when you outgrow it.

Requirements:
    pip install anthropic pyyaml
    export ANTHROPIC_API_KEY=...
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
from collections import Counter
from pathlib import Path

import anthropic
import yaml

# Allow `from graders import grade, AgentResult` from a sibling file.
sys.path.insert(0, str(Path(__file__).parent))
try:
    from graders import grade, AgentResult, PASS, FAIL, PASS_SLOW  # type: ignore
except ImportError:
    print("error: graders.py not found in the same directory as this script.", file=sys.stderr)
    print("Copy assets/grader_recipes/graders.py next to run_eval.py.", file=sys.stderr)
    sys.exit(1)


# ----------------------------- run one -------------------------------------

def run_one(client: anthropic.Anthropic, model: str, system: str,
            task: dict, max_tokens: int) -> AgentResult:
    """One API call per task. No tool use. Adapt if you need agent loops."""
    t0 = time.time()
    try:
        msg = client.messages.create(
            model=model,
            max_tokens=max_tokens,
            system=system,
            messages=[{"role": "user", "content": task["prompt"]}],
        )
    except Exception as e:
        return AgentResult(error=f"api: {e}", wall_ms=int((time.time() - t0) * 1000))

    text = "".join(b.text for b in msg.content if getattr(b, "type", "") == "text")
    return AgentResult(
        final_text=text,
        turns=1,
        tokens_in=msg.usage.input_tokens,
        tokens_out=msg.usage.output_tokens,
        wall_ms=int((time.time() - t0) * 1000),
    )


# ----------------------------- main ----------------------------------------

def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--tasks", required=True, type=Path)
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--prompt", help="System prompt as a literal string")
    g.add_argument("--prompt-file", type=Path, help="Read system prompt from this file")
    ap.add_argument("--model", default=os.environ.get("EVAL_MODEL", "claude-sonnet-4-6"))
    ap.add_argument("--max-tokens", type=int, default=2048)
    ap.add_argument("--trials", type=int, default=1,
                    help="Run each task N times; majority vote")
    ap.add_argument("--filter", help="Comma-separated task IDs to run")
    ap.add_argument("--json-out", type=Path,
                    help="Write full results as JSON to this path")
    args = ap.parse_args()

    system = args.prompt or args.prompt_file.read_text()
    tasks = yaml.safe_load(args.tasks.read_text())["tasks"]
    if args.filter:
        wanted = set(args.filter.split(","))
        tasks = [t for t in tasks if t["id"] in wanted]
    if not tasks:
        print("No tasks selected.", file=sys.stderr)
        sys.exit(1)

    client = anthropic.Anthropic()
    print(f"\n  eval: {len(tasks)} task(s) × {args.trials} trial(s) on {args.model}\n")
    print(f"  {'ID':6} {'Name':28} {'Status':10} {'Turns':>5} {'Tok':>6} {'Wall':>7}  Why")
    print(f"  {'─'*6} {'─'*28} {'─'*10} {'─'*5} {'─'*6} {'─'*7}  {'─'*40}")

    results = []
    for task in tasks:
        per_trial = []
        for _ in range(args.trials):
            r = run_one(client, args.model, system, task, args.max_tokens)
            status, why = grade(task, r)
            per_trial.append({
                "status": status, "why": why, "final_text": r.final_text,
                "turns": r.turns, "tokens": r.tokens_in + r.tokens_out,
                "wall_ms": r.wall_ms, "error": r.error,
            })
        # Majority vote across trials
        if args.trials > 1:
            vote = Counter(t["status"] for t in per_trial).most_common(1)[0][0]
            chosen = next(t for t in per_trial if t["status"] == vote)
        else:
            chosen = per_trial[0]

        results.append({"id": task["id"], "name": task["name"],
                        "trials": per_trial, **chosen})

        dot = {"pass": "● PASS", "fail": "○ FAIL", "pass-slow": "◐ SLOW"}[chosen["status"]]
        print(f"  {task['id']:6} {task['name'][:28]:28} {dot:10}"
              f" {chosen['turns']:>5} {chosen['tokens']:>6} {chosen['wall_ms']/1000:>6.1f}s"
              f"  {chosen['why'][:40]}")

    counts = Counter(r["status"] for r in results)
    score = (counts[PASS] + 0.5 * counts[PASS_SLOW]) / len(results)
    tok_total = sum(r["tokens"] for r in results)
    print(f"\n  ─── {counts[PASS]}/{len(results)} correct · "
          f"{counts[PASS_SLOW]} slow · "
          f"{counts[FAIL]} failed · score {score:.0%} · "
          f"{tok_total/1000:.1f}k tokens\n")

    if args.json_out:
        args.json_out.write_text(json.dumps({
            "model": args.model,
            "trials": args.trials,
            "score": score,
            "counts": dict(counts),
            "results": results,
        }, indent=2, default=str))
        print(f"  → wrote {args.json_out}\n")


if __name__ == "__main__":
    main()
