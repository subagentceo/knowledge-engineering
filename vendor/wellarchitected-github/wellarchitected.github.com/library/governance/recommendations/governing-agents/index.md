# Governing agents in GitHub Enterprise

Libraries

Governance

Recommendations

Governing agents in GitHub Enterprise

# Governing agents in GitHub Enterprise

Kitty Chiu, Tiago Pascoal, Ken Muse, Josh Johanning & Ayodeji Ayodele

April 13, 2026

## Scenario overview

Agents — Copilot cloud agent, Copilot code review agent, and third-party agents like Anthropic Claude and OpenAI Codex — are becoming significant contributors to enterprise codebases. GitHub lets teams assign tasks to agents from issues, PRs, and Visual Studio Code in a single workflow. In many organizations, agents already rank among the top contributors by pull request volume.

This introduces new governance challenges. Agents act faster and at broader scale than any individual. They interact with external services through MCP, use skills to extend their capabilities, and execute code in environments that may hold secrets and infrastructure triggers. A single misconfigured enterprise policy or shared agent definition can affect multiple repositories quickly.

For enterprises managing multiple business units, the question is not _whether_ to adopt agents, but _how to govern them_ without creating bottlenecks. This recommendation covers levers for controlling agent behavior, managing costs, enforcing security boundaries, and maintaining audit visibility — while keeping teams productive.

**What “good” looks like:** agents operate within clearly defined trust boundaries, every action is auditable and traceable, model and tool access is centrally managed, and cost exposure is predictable and attributable.

## Key design strategies and checklist

1.  **Minimize enterprise-level baseline, empower organizations to adapt**
    
    Set non-negotiable controls at the enterprise level — audit log streaming and model restrictions for compliance — so every organization inherits a governance floor it can build on. Let organizations decide when and how to enable agents, configure MCP, and create their own custom agents within those boundaries. Review the model allowlist regularly — disable outdated models and enable newer ones after any legal review — so teams benefit from model improvements.
    
    The baseline should stay minimal — set guardrails for audit and compliance, then let organizations and repositories create and refine their own agents and configurations. Anti-pattern: organizations enabling agents without audit log streaming or model restrictions.
    
    See section Configure enterprise-level Copilot, agent, and MCP policies for implementation details.
    
2.  **Layer agentic configuration**
    
    Set enterprise-level controls for security and compliance baselines, then let teams tailor custom instructions and MCP access at the repository level for maximum effectiveness. Without layered configuration, enterprises either over-centralize (generic instructions, wasted tokens, friction) or under-govern (inconsistent agents, unreviewed MCP access, ad-hoc setups).
    
    Human review is even more important in the agentic world — a single instruction or MCP configuration change can alter agent behavior across many sessions and repositories. Require human review for all repository changes, including agent configuration files and MCP server configurations. Standardize the agent environment so agents build and test more reliably across repositories. Anti-pattern: allowing developers to configure arbitrary MCP servers, agent instructions, or custom agents without review, or letting agents discover and install dependencies through trial and error.
    
    See section Layer agentic configurations for implementation details.
    
3.  **Enforce security controls and human review gates on agent output**
    
    The cloud agent’s built-in protections provide a baseline, but they are not sufficient on their own. Layer additional protections including CODEOWNERS, branch rulesets requiring independent review, firewall restrictions, and least-privilege token scoping. Choose a code review agent strategy based on your team’s risk tolerance.
    
    Treat agent-authored code with the same rigor as human-authored code — same CI checks, security scans, and review gates. Anti-pattern: exempting agent-created changes from existing checks or rulesets — agent PRs should pass the same gates as any other contribution.
    
    See section Enforce security controls and human review gates for implementation details.
    
4.  **Make agent activity auditable and traceable**
    
    Stream audit logs to your SIEM so agent-related events (e.g., session creation, commits, PR activity, policy changes) are retained. Agent activities can be correlated using the `agent_session_id` field.
    
    Agents act autonomously and at scale, so agent observability requires two complementary activities: stream audit events to your SIEM for anomaly detection and long-term retention, and periodically spot-check session transcripts in the GitHub UI for high-risk repositories — transcripts are only available in the UI and cannot be exported. Anti-pattern: relying solely on the GitHub UI for audit review without streaming to an external system for retention and correlation.
    
    See section Build agent observability and audit pipeline for implementation details.
    
5.  **Make cost exposure predictable and attributable**
    
    Configure spending limits and alerting thresholds for the cost units that agents consume before scaling adoption. Without these guardrails, agent-driven spending can spike unpredictably and be difficult to attribute to specific cost owners.
    
    Track consumption alongside adoption metrics so cost governance decisions are data-driven. Anti-pattern: enabling agents enterprise-wide without spending limits and discovering overages after the fact.
    
    See section Manage agent-related costs for implementation details.
    

### Quick checklist

#### 1. Policy & governance

*    Copilot, Agent, and MCP policies are configured at the enterprise level; see configure enterprise-level policies
*    Available models reviewed and configured
*    Third-party agents are disabled by default; enabled only after review
*    AI manager custom role is assigned to delegates; enterprise ownership is not over-granted
*    Enterprise AI governance policies are communicated to org owners and developers

#### 2. Agent setup & standardization

*    Custom instruction libraries with company-specific criteria are published in a shared repository; see repository custom instructions
*    Organization custom instructions are configured as a baseline for each org; see organization custom instructions
*    Enterprise custom agents exist in `.github-private` and are configured for enterprise-wide availability; org-scoped agents remain in the org’s `.github-private` for narrower distribution; see enterprise custom agents
*    Rulesets restrict changes to agentic primitive files; see protect agentic primitive files
*    Each repository has a `copilot-setup-steps.yml` that pins dependencies for its application type; use rulesets to restrict changes; see agent environment standardization
*    Agent workloads run on ephemeral runners (GitHub-hosted or ephemeral self-hosted); see use ephemeral runners

#### 3. Security controls & review gates

*    The `GITHUB_TOKEN` in `copilot-setup-steps.yml` is scoped to least privilege; note that this only applies to the setup workflow, not the agent’s own operations
*    The cloud agent firewall is enabled and the allowlist is configured to permit only required external domains; see cloud agent
*    A code review agent strategy is chosen; see automatic vs. on-demand code review for trade-offs
*    CI checks, security scans, and code review gates apply equally to agent-authored and human-authored code
*    Agent-generated code is always reviewed at PR time for quality, accuracy, and guideline adherence
*    Custom instructions, agents, skills, and MCP server configurations are refined when recurring issues are found

#### 4. Observability & audit

*    Audit log streaming is enabled and agent events appear in your SIEM; see audit log streaming
*    Agent sessions are periodically spot-checked via the Agents tab; see session monitoring
*    `agent_session_id` is correlated across events in your SIEM for end-to-end traceability
*    SIEM alerts are active for high-risk signals (workflow file changes, ruleset bypass attempts, usage anomalies)

#### 5. Cost management

*    Spending limits are configured per organization or cost center; “stop usage at limit” is enabled for hard caps; see manage agent-related costs
*    Set spend alerting to responsible teams
*    Model selection education and governance aligns with cost awareness
*    Usage consumption of Copilot is tracked

## Assumptions and preconditions

*   Your enterprise uses a **GitHub Enterprise Cloud** environment.
*   You have **enterprise owner** access to configure policies that cascade to organizations.
*   **GitHub Copilot Business or Enterprise** licenses are assigned. See comparing Copilot plans for current feature availability by plan.
*   **GitHub Actions** is enabled for your enterprise and organizations. The cloud agent runs on Actions runners and consumes Actions minutes.
*   You have a **SIEM platform** (e.g., Splunk, Microsoft Sentinel, Datadog) capable of ingesting GitHub audit log streams.
*   Your enterprise already has foundational code security practices in place (CI checks, pull review, secret scanning). Agent governance is an additive layer, not a replacement.
*   This recommendation does **not** cover GitHub Enterprise Server (GHES) deployments — agent capabilities are cloud-only at this time.
*   The term **custom instructions** as used throughout this article broadly encompasses the full agentic configuration layer — including agent definitions (custom agents) and skill definitions (`SKILL.md`) — unless otherwise specified.

## Recommended implementation

### 1. Configure enterprise-level Copilot, agent, and MCP policies

Navigate to your enterprise settings and click **AI controls**. This centralized pane has three policy surfaces in the sidebar: **Agents**, **Copilot**, and **MCP**. Configure each:

#### Agents → Copilot cloud agent

*   In most enterprises, start with “Let organizations decide” and enable for a pilot group first.
*   Configure an organization for enterprise custom agents. See section enterprise custom agents.

ℹ️

Third-party agents have access to the same repositories where the Copilot agent is enabled. See Enabling or disabling third-party cloud agents.

#### Copilot → Policies

*   Set model access enforcement. Explicitly select which models are allowed. Review the allowlist regularly — enable newly GA models after any required review, and evaluate models’ behaviors and use cases to ensure they meet your organization’s needs. Deprecated models may be removed; ensure newer or alternative models are enabled before retirement dates.
*   Enable all Copilot capabilities. Toggle off only if you have a specific requirement to restrict a capability.

#### MCP

*   The right MCP selections (e.g., GitHub MCP Server) in combination with skills, improve user and agent effectiveness and reduce token consumption. See MCP server governance.

After configuring enterprise policies, communicate clearly to administrators and users. Policies only work if everyone understands them. If you choose “Let orgs decide” for agents, send guidance to org owners on how to enable agents within your enterprise’s boundaries.

### 2. Layer agentic configurations

Consistent agent behavior requires layered configuration, and over-centralizing instructions and agents at the enterprise level hurts usability and increases cost. Prompts and custom instructions are most effective when tailored to the repository’s language, framework, and domain. Enterprise-level controls should set security and compliance baselines; repository-level configuration is where teams optimize agent effectiveness for their specific codebase. In large enterprises with independent business units, pushing too much governance to the enterprise level leads to generic instructions, wasted tokens, and friction that slows adoption.

#### Repository custom instructions

Create a library of shared custom instructions starters. Publish these in a shared repository for teams to reference and consume for their own repository. The following types are supported:

Type

File

Scope

Repository-wide

`.github/copilot-instructions.md`

All requests in the repository

Path-specific

`.github/instructions/NAME.instructions.md`

Files matching the `applyTo` glob pattern

Agent-specific

`AGENTS.md` (or `CLAUDE.md`, `GEMINI.md`)

See supported agent-specific file locations

Skill definition

`SKILL.md`

Provides specialized domain knowledge and workflows for agents

For example, your instructions might include:

```markdown
# Common guardrails for agents

- Follow OWASP secure coding practices. Never hardcode credentials.
- Generate unit tests for all new public functions.
- Do not modify CI/CD workflow files without explicit approval.
- Use the company's approved linting and formatting rules.
```

ℹ️

Support for agent-specific instruction files (e.g., `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`) varies across environments. Not all cloud agents or IDEs honor all of these files, which means the same repository can produce different agent behavior depending on where the agent runs. If you rely on agent-specific files, test in each target environment and document which files are supported where.

#### Organization custom instructions

Use organization custom instructions to define a baseline prompt for all users in an organization. Organization owners can configure this in **Organization settings → Copilot → Custom instructions**. Note that organization instructions currently apply to Copilot cloud agent and code review agent on GitHub.com.

Treat these instructions as an organizational baseline — keep them narrow and focused on specific, non-negotiable standards (e.g., security, compliance). Broad or generic org-level instructions add context to every request, consuming tokens without improving results. Layer repository and path-specific instructions for team-level controls where the real effectiveness gains happen.

#### Enterprise custom agents

Define enterprise-level agents to deliver consistent and repeatable expertise, behavior, and tool access across all organizations. Setup enterprise custom agents by creating a `.github-private` repository in a designated organization. Then:

1.  Navigate to enterprise → **AI controls** → Custom agents section.
2.  Select the source organization containing your `.github-private` repository.
3.  Click **Create ruleset** in the “Protect agent files using rulesets” section.

Consider delegating day-to-day agent management to a team of AI managers while maintaining enterprise-owner control over security-sensitive configurations. See Establish AI managers.

Note that agents defined in `.github-private` are org-scoped by default. To make them available enterprise-wide, configure the source organization in enterprise AI controls. Some organizations may intentionally keep certain agents org-scoped rather than promoting them enterprise-wide.

ℹ️

Before deploying a custom agent enterprise-wide, test it in a sandbox repository or with a limited user group. Validate its behavior, then expand. See Preparing custom agents for rollout guidance.

#### MCP server governance

The GitHub MCP Registry provides a curated list of community MCP servers. For enterprise use, you can layer your own governance:

1.  Maintain an internal list of reviewed and approved MCP servers with their endpoints, allowed scopes, and review status.
2.  Use rulesets to protect MCP configuration files (`.github/copilot/mcp.json` or `.mcp.json`) in repositories.
3.  Configure an MCP registry to curate a discoverable set of pre-approved servers. If your policy requires strict control, set the MCP allowlist policy to “Registry only.” For enterprises where teams need to experiment, use “Allow all” with rulesets on `.github/copilot/mcp.json` and `.mcp.json` (step 2) so changes require review.

Registry enforcement matches on server name, can be bypassed, and does not apply to the cloud agent — treat it as a governance signal and discoverability layer for IDEs, not a hard security boundary. Rulesets on `mcp.json` (step 2) are the primary technical control against unauthorized MCP endpoints across all surfaces except for cloud agent.

⚠️

MCP registry and allowlist enforcement does not cover all Copilot surfaces. It applies to IDEs (e.g., Visual Studio Code, JetBrains) but **not** to the cloud agent. The cloud agent firewall also does not apply to MCP servers.

#### Agent environment standardization

Customize the agent’s development environment by creating a `.github/workflows/copilot-setup-steps.yml` in each repository. This workflow runs before the agent starts work, giving you deterministic control over the agent’s environment. For runner selection, organization admins can set defaults centrally rather than configuring per-repository.

For additional runtime customization, hooks let you inject shell commands at key points during agent execution (e.g., formatting, linting, or logging).

For consistency across similar repositories, share `copilot-setup-steps.yml` examples with company-specific tooling by application type that teams can adapt. Note that reusable workflows are not supported for this file, and composite actions may help share common setup steps. Each repository maintains its own copy. Protect this file with rulesets so changes require review. Organization admins can also set a default runner and optionally lock it so the agent runs on a consistent runner across all repositories.

#### Use ephemeral runners for agent execution

Use GitHub-hosted runners for agent execution. Each job gets a fresh VM that is destroyed after the run, eliminating persistent state and credential leakage between sessions. If you require self-hosted runners, make sure they are ephemeral.

### 3. Enforce security controls and human review gates

#### Cloud agent

Copilot cloud agent has built-in security protections. In the repository’s settings, configure additional controls:

*   **Firewall.** The agent firewall is enabled by default, restricting the agent’s internet access to an allowlist. Organization admins can manage firewall settings across all repositories, enforcing the firewall org-wide so individual repositories cannot disable it, controlling the recommended allowlist, and adding org-wide custom allowlist entries.
*   **Recommended allowlist.** Enabled by default, this permits access to OS package repositories, container registries, language package registries, certificate authorities, and other common development dependencies — not only GitHub services. Review the full list. Customize the allowlist to include any internal registries or services your agents need.

⚠️

The cloud agent firewall is limited to processes started by the agent via its Bash tool. It does not apply to MCP servers or processes started in agent environment setup. Treat it as one layer of defense, not a comprehensive network boundary.

*   **Validation tools.** Configure cloud agent to automatically run code scanning, secret scanning, dependency checks, and Copilot code review on its changes.

#### Code review agent

Enable **Automatic reviews** with a ruleset at organization or repository level, and curate review criteria in custom instructions to ensure review consistency. For example, a path-specific `.github/instructions/code-review.instructions.md` might include:

```markdown
---
description: 'Code review standards'
applyTo: '**'
---

## Code review standards

- Block merge for security vulnerabilities, exposed secrets, logic errors, and breaking API changes.
- Flag missing tests for critical paths, N+1 queries, and significant deviations from established patterns.
- Suggest improvements for naming, readability, and minor convention deviations — but do not block merge.
```

See Use custom instructions and github/awesome-copilot examples.

#### Protect agentic primitive files with rulesets

Agent configuration files (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.github/instructions/**/*.instructions.md`), skill configuration files (`SKILL.md`), MCP configuration files (`mcp.json`), and the `.github-private` repository for enterprise custom agents define what agents can do and which tools they can access. Unauthorized modifications can change agent behaviors.

Apply rulesets to these files so changes require human review before taking effect.

### 4. Build agent observability and audit pipeline

Enterprise owners have two complementary surfaces for monitoring agent activity: audit log streaming for retention and anomaly detection, and session monitoring in the UI for debugging and oversight.

#### Audit log streaming: for retention, correlation, and anomaly detection

Stream audit logs to your SIEM platform for long-term retention and correlation. Audit logs capture specific agent and management activities — session creation, commits, PR activity, and policy changes — not the step-by-step session transcript. Agentic audit log events such as `action`, `actor_is_agent`, `agent_session_id`, and `user` are the key fields for correlations and anomaly detection.

**What to monitor in your SIEM:**

Signal

Example event / field

Why it matters

Agent sessions per user per day

`agent_session_id`, `user`

Detect anomalous usage or compromised accounts

MCP policy changes

`copilot.mcp_*` actions

Identify unauthorized changes to approved tool integrations

Agent changes to high-risk files (workflows, MCP config, agent instructions)

`git.push`, `pull_request.*` with `actor_is_agent`

High-risk modifications that could affect CI/CD pipelines or agent behavior. Correlate audit events with webhook payloads for file-level detail

Changes to environment secrets used by agents

`environment.*` actions

Could alter what agents can access or authenticate to

Bypass events on rulesets

`repository_ruleset.*` with `actor_is_agent`

Detect attempts to circumvent governance controls

#### Session monitoring: for debugging and oversight

Session transcripts give you what audit logs cannot: the agent’s reasoning, the commands it ran, and the test output it saw before deciding what to do next. Use them for three things:

*   **Triage failures.** When an agent session produces a broken PR or stalls, the transcript shows the exact step where it went wrong — misinterpreted instruction, flaky test, or missing dependency.
*   **Spot-check agent sessions.** Schedule periodic transcript reviews for repos that hold secrets, infrastructure-as-code, or CI/CD workflows. Look for patterns: agents modifying files outside their scope, retrying failed commands in loops, or ignoring custom instruction guardrails.
*   **Validate new configurations.** After changing custom instructions, `copilot-setup-steps.yml`, or MCP server access, review a few transcripts to confirm agents behave as expected.

Enterprise administrators can review sessions from the last 28 days in **AI controls → Agent sessions**. Each repository also has an **Agents** tab where maintainers can watch past and current sessions in progress. See Monitoring agentic activity.

ℹ️

Session transcripts are available only through the GitHub UI — they cannot be streamed to a SIEM or retrieved via API.

Agent-generated code, custom instructions, and MCP configurations should be reviewed at PR time with the same rigor as human-authored code. The person who triggered the agent is the first-line reviewer and co-author; the PR approver shares responsibility for the merged result. If recurring quality issues surface during reviews, refine your custom instructions.

### 5. Manage agent-related costs

Copilot agents consume both GitHub Actions minutes and premium requests. Standard runners consume your monthly Actions allowance at no additional cost; larger runners incur a per-minute charge. Agent sessions can run for up to 59 minutes. Without spending limits, agent-driven spending can accumulate quickly and be difficult to attribute to specific cost owners.

**What makes agent cost governance different:**

*   **Actions minutes add up.** Each agent session consumes GitHub Actions minutes for the duration of the agent’s work. Monitor Actions usage to ensure agent workloads do not impact your CI/CD capacity.
*   **Model selection amplifies cost.** Different models have different request multipliers. Factor model choice into your cost governance.

For detailed guidance on budget configuration, cost center allocation, user-level budgets, and cost attribution — see Managing AI credits with FinOps principles.

ℹ️

Cost governance is part of AI governance. Predictable costs keep adoption sustainable. Revisit budgets quarterly as you scale usage or adopt new features.

## Additional solution details and trade-offs to consider

### Enterprise-controlled vs. organization-delegated policies

Factor

Enterprise-controlled

Organization-delegated

Consistency

Uniform across all orgs

May diverge between teams

Flexibility

Lower — orgs cannot expand beyond baseline

Higher — orgs self-serve

Admin overhead

Central team manages all policy

Distributed across org owners

**Trade-off:** Enterprise control reduces flexibility for individual business units. In practice, many enterprises use a hybrid: enforce non-negotiable security policies at the enterprise level (audit logging, rulesets) while letting organizations opt in to models, agents, and features within those boundaries. This ensures no org can use an unapproved model or disable audit logging, but teams have autonomy on timing and usage.

If you operate multiple independently governed business units (e.g., subsidiaries, acquired companies, or independent product lines), this hybrid approach is typically the right starting point.

### Automatic vs. on-demand code review

Review quality depends heavily on custom instructions. Without instructions, reviews may be generic or noisy. Invest in curating review criteria (see section code review agent) before scaling automatic reviews broadly.

Approach

Pros

Cons

**Automatic on high-risk repos, on-demand elsewhere**

Consistent coverage where it matters most; lower noise on low-risk repos

Requires repo classification (e.g., custom properties) and maintenance

**Automatic on all PRs**

Uniform coverage; no repos slip through

Can produce generic comments at scale if instructions are not present

**On-demand only**

Developers invoke when valuable; saves cost on non-value-adding reviews

Relies on developers remembering to request reviews; high-risk changes may go unreviewed

## Seeking further assistance

### GitHub Support

Visit the GitHub Support Portal for a comprehensive collection of articles, tutorials, and guides on using GitHub features and services.

Can’t find what you’re looking for? You can contact GitHub Support by opening a ticket.

### GitHub Expert Services

GitHub’s Expert Services Team is here to help you architect, implement, and optimize a solution that meets your unique needs. Contact us to learn more about how we can help you.

### GitHub Partners

GitHub partners with the world’s leading technology and service providers to help our customers achieve their end-to-end business objectives. Find a GitHub Partner that can help you with your specific needs here.

### GitHub Community

Join the GitHub Community Forum to ask questions, share knowledge, and connect with other GitHub users. It’s a great place to get advice and solutions from experienced users.

## Related links

### GitHub Documentation

For more details about GitHub’s features and services, check out GitHub Documentation.

### Related articles in this framework

*   GitHub Enterprise Policies & Best Practices — general platform security hardening checklist (rulesets, CODEOWNERS, commit signing, audit log streaming)
*   Rulesets Best Practices — guidance on push vs. branch rulesets, file-path scoping, and CODEOWNERS integration
*   Application Security Checklist — foundational code security practices (CI checks, pull review, secret scanning) that agent governance builds on
*   Managing AI credits with FinOps principles — layered budget configuration, user-level budgets, cost attribution, and usage governance

### External resources

*   Managing enterprise Copilot policies — model access enforcement and capability toggles
*   Establish AI managers — delegating day-to-day agent management with custom roles
*   Adding repository custom instructions — `.github/copilot-instructions.md` and path-specific instruction files
*   Adding organization custom instructions — baseline prompts for all users in an organization
*   Support for different types of custom instructions — which agent-specific instruction are supported in which environments
*   Managing Copilot coding agent for your enterprise — enable or disable the cloud agent and configure third-party agent defaults
*   Preparing custom agents for your enterprise — setting up `.github-private` and rolling out enterprise custom agents
*   github/awesome-copilot — curated collection of custom instructions, agents, and Copilot configuration examples
*   About MCP and Copilot — conceptual overview of Model Context Protocol integration in GitHub Copilot
*   Configure an MCP registry — curating a discoverable set of pre-approved MCP servers
*   Configure MCP server access — allowlist policies for MCP server usage
*   Model Context Protocol specification — protocol documentation for understanding MCP capabilities and security considerations
*   GitHub MCP Server Policies and Governance — control mechanisms for the GitHub MCP server in third-party host applications
*   About Copilot cloud agent — capabilities, built-in security protections, and operational model of the cloud agent
*   Copilot code review agent — automatic and on-demand code review powered by Copilot
*   Customizing the cloud agent environment — configuring `copilot-setup-steps.yml` to standardize agent runtime environments
*   About hooks — injecting shell commands at key points during agent execution
*   Customizing the agent firewall — managing the agent network allowlist at org and repo level
*   Configuring agent settings — enabling code scanning, secret scanning, and dependency checks on agent changes
*   Monitoring agentic activity — enterprise session monitoring UI for real-time agent oversight
*   Agentic audit log events — reference for agent-specific audit log fields used for SIEM correlation and anomaly detection
*   Streaming the audit log for your enterprise — configuring audit log streaming to external SIEM platforms
*   Managing your GitHub Copilot usage and spending — budget configuration, spending limits, and alerting thresholds in the billing platform

Last updated on April 13, 2026

Essentials of governance and administration with GitHub EnterpriseGitHub Enterprise Policies & Best Practices