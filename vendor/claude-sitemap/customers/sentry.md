[Sentry](https://sentry.io/welcome/) is a software monitoring platform that ingests billions of events daily, giving development teams the context they need to debug production issues. Their AI debugging agent, Seer, already used Claude to identify root causes accurately. But telling developers what's wrong wasn't enough. They wanted Seer to fix it, too.

With [Claude Managed Agents](https://claude.com/blog/claude-managed-agents), Sentry built the infrastructure to go from bug detection to merge-ready pull request, without building a custom agent runtime from scratch.

## **With Claude, Sentry achieved:**

-   End-to-end automation from bug detection to pull request, powered by Claude Managed Agents
-   Ability to efficiently process over 1 million RCAs (Root Cause Analysis) a year
-   Near immediate reviews provided on over 600k pull requests a month
-   Initial Managed Agents integration shipped in weeks instead of months by a single engineer
-   Elimination of the ongoing operational overhead of maintaining custom agent infrastructure

## **The challenge: A gap between knowing what's broken and fixing it**

Sentry provides deep context for every error: stack traces, profiling data, trace connections, logs, spans, and metrics. When Seer launched, it used Claude to analyze all that telemetry, identify root causes, and suggest code fixes. Developers at every level got faster.

"Developers are often overwhelmed by the amount of context they need to reason through to debug a problem," said Indragie Karunaratne, Senior Director of Engineering, AI/ML at Sentry. Seer helped junior developers navigate that complexity and gave senior engineers quick summaries so they could apply their expertise to validation rather than investigation.

But even with a diagnosis and a suggested fix in hand, developers still had to context-switch into their codebase, plan the implementation, write the code, and open a pull request. That handoff from diagnosis to resolution is where time and momentum were lost. Sentry wanted to close the loop: take Seer's root cause analysis and turn it into a finished PR automatically.

Building that capability meant running a coding agent. And running a coding agent meant building sandboxing, lifecycle management, and an agent runtime. For a team focused on debugging, that was a significant detour.

## **The solution: Why Sentry chose Claude and Managed Agents**

Sentry had already selected Claude for Seer after evaluating multiple AI models. Security factored heavily: running Claude through Vertex AI let Sentry minimize data shared outside Google Cloud. "We were able to preserve data residency for our customers and avoid having to add a new subprocessor by using Claude through Vertex AI,” Karunaratne said.

When it came time to extend Seer from diagnosis to automated fixing, Claude Managed Agents was a natural fit. It provided the secure agent runtime, sandboxing, and lifecycle management that Sentry would have otherwise spent months building. And there was pull from Sentry's customer base: many were already using Claude Code for local and cloud-based development and wanted an experience that bridged Sentry's debugging capabilities with Claude's coding strengths.

Managed Agents let Sentry focus on what differentiated their product, the handoff between Seer's diagnosis and the coding agent, rather than building generic agent infrastructure.