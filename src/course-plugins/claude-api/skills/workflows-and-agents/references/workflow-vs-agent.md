# Workflow vs agent: the decision

Both handle tasks that need more than one Claude request. The decision rule:

- **Workflow** — use when you precisely understand the task and know the exact sequence of steps. A predetermined series of Claude calls. Higher completion rates, easier to test (known execution path), requires specific inputs.
- **Agent** — use only when task details are unclear and flexibility is truly required. Claude dynamically plans using the tools you provide. Lower completion rates, harder to test (unpredictable path), can create its own inputs and request more when needed.

Core principle: **prioritize workflows for reliability; reach for agents only when flexibility is essential.** Users want a 100%-working product over a fancy agent — solve reliably first, innovate second.
