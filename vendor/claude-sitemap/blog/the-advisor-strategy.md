# The advisor strategy: Give agents an intelligence boost

Developers who want to better balance intelligence and cost have converged on what we call the advisor strategy: pair Opus as an advisor with Sonnet or Haiku as an executor. This brings near Opus-level intelligence to your agents while keeping costs near Sonnet levels.

Today we're introducing the advisor tool on the Claude Platform to make the advisor strategy a one-line change in your API call.

## Build cost-effective agents with the advisor strategy

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/69d7a8216b96ea826922fcf4_e9f8286d.png)

With the advisor strategy, Sonnet or Haiku runs the task end-to-end as the executor, calling tools, reading results, and iterating toward a solution. When the executor hits a decision it can't reasonably solve, it consults Opus for guidance as the advisor. Opus accesses the shared context and returns a plan, a correction, or a stop signal, and the executor resumes. The advisor never calls tools or produces user-facing output, and only provides guidance to the executor.

This inverts a common sub-agent pattern, where a larger orchestrator model decomposes work and delegates to smaller worker models. In the advisor strategy, a smaller, more cost-effective model drives and escalates without decomposition, a worker pool, or orchestration logic. Frontier-level reasoning applies only when the executor needs it, and the rest of the run stays at executor-level cost.

In our evaluations, Sonnet with Opus as an advisor showed a 2.7 percentage point increase on SWE-bench Multilingual1 over Sonnet alone, while reducing cost per agentic task by 11.9%.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/69d908f43209164823554d52_Claude-Blog-Advisor-tool-SWE-bench-Multilingual.png)

## The advisor tool

We’re bringing the advisor strategy to our API with the **advisor tool**, a server-side tool which Sonnet and Haiku know to invoke when they need guidance or help with a specific task.

In our evaluations, Sonnet with an Opus advisor improved scores across BrowseComp2 and Terminal-Bench 2.03 benchmarks while costing less per task than Sonnet alone.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/69d7a8216b96ea826922fcfa_880b9e59.png)

The advisor strategy also works with Haiku as the executor. On BrowseComp, Haiku with an Opus advisor scored 41.2%, more than double its solo score of 19.7%. Haiku with an Opus advisor trails Sonnet solo by 29% in score but costs 85% less per task. The advisor adds cost relative to Haiku alone, but the combined price is still a fraction of what Sonnet costs, making it a strong option for high-volume tasks that require a balance of intelligence and cost.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/69d7a8216b96ea826922fcfd_ca657f5f.png)

Declare advisor_20260301 in your Messages API request, and the model handoff happens inside a single /v1/messages request—no extra round-trips or context management. The executor model decides when to invoke it. When it does, we route the curated context to the advisor model, return the plan, and the executor continues all within the same request.

```python
response = client.messages.create(
    model="claude-sonnet-4-6",  # executor
    tools=[
        {
            "type": "advisor_20260301",
            "name": "advisor",
            "model": "claude-opus-4-6",
            "max_uses": 3,
        },
        # ... your other tools
    ],
    messages=[...]
)

# Advisor tokens reported separately
# in the usage block.
```

**Pricing**. Advisor tokens are billed at the advisor model's rates; executor tokens are billed at the executor model's rates. Since the advisor only generates a short plan (typically 400-700 text tokens) while the executor handles the full output at its lower rate, the overall cost stays well below running the advisor model end-to-end.\*\*

Built-in cost controls.\*\* Set max_uses to cap advisor calls per request. Advisor tokens are reported separately in the usage block so you can track spend per tier.

**Works alongside your existing tools.** The advisor tool is just another entry in your Messages API request. Your agent can search the web, execute code, and consult Opus in the same loop.
