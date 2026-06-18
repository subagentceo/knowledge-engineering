

# About AWS DevOps Agent
<a name="about-aws-devops-agent"></a>

AWS DevOps Agent is an AI-powered, always-available agent that spans release management and production operations, from reviewing release readiness and release testing to investigating and preventing operational issues across AWS, multicloud, and on-premises environments.

AWS DevOps Agent helps review software changes for production risks while investigating incidents and identify operational improvements as an experienced DevOps engineer.

The agent works by:
+ Learning your resources and their relationships.
+ Working with your observability tools, skills, code repositories, and CI/CD pipelines.
+ Correlating telemetry, code, and deployment data to understand relationships between your application resources.
+ Supporting applications in multicloud and hybrid environments.

## Key features
<a name="key-features"></a>

AWS DevOps Agent provides capabilities across two core areas: production operations and release management.

### Production operations
<a name="production-operations"></a>

AWS DevOps Agent autonomously investigates issues the moment they occur:
+ **Automated incident investigation** – Begins investigating immediately when an alert or support ticket comes in, correlating telemetry, code, and deployment data to identify root cause.
+ **Actionable mitigation plans** – Provides specific actions to resolve incidents, validate success, and revert changes if needed. Also provides agent-ready instructions that can be implemented by another frontier agent, such as code improvements that can be implemented by Kiro.
+ **Proactive incident prevention** – Analyzes patterns across historical incidents to deliver targeted improvements across observability, infrastructure optimization, deployment pipelines, and application resilience, so the same problems don't recur.
+ **Automated incident coordination** – Routes observations, findings, and mitigation steps through your preferred communication channels like Slack, ServiceNow, and PagerDuty.
+ **On-demand SRE task handling** – Handles SRE tasks through natural language, leveraging its deep knowledge of your application topology and service dependencies. Query resource health, investigate incident patterns, track deployments, and explore recommendations without navigating between consoles.
+ **AWS Support integration** – Create AWS Support cases directly from an investigation with full context to speed resolution.

### Release management (preview)
<a name="release-management-preview"></a>

AWS DevOps Agent includes a set of preview capabilities to help verify that code changes are ready for production before they get there:
+ **Release readiness review** – Reviews code changes during code generation, checking policy compliance, dependency impacts, and access controls. Maps cross-repository dependencies to surface breaking changes before merge and uses deterministic proofs to assess that infrastructure changes do not expand permissions beyond what the application requires. By understanding your full service topology, it reasons about blast radius and reviews changes in context of the broader system.
+ **Autonomous release testing** – Generates and runs change-specific test plans for web and API-based applications in customer-provisioned environments, catching regressions, UX issues, and integration failures before they reach production. Tests target risk areas surfaced during the release readiness review rather than a static regression suite.
+ **Built into the developer workflow** – Delivers results through pull requests, coding agent IDEs, and CI/CD pipelines so developers stay in flow from code generation through deployment.

## Environment intelligence
<a name="environment-intelligence"></a>

AWS DevOps Agent continuously learns your environment, building deep understanding of your services, dependencies, and operational patterns:
+ **Application resource mapping** – Automatically discovers applications, their component services, and the resources that compose them. Maps these relationships into a dynamic, continuously updated topology.
+ **Continuous learning** – Release reviews get more relevant, investigations get faster, and recommendations more precise as the agent learns your environment over time.
+ **Extend capabilities with agent skills** – Add reusable, modular skills that encode your runbooks, architectural standards, and operational practices so the agent executes tasks consistently and reliably.
+ **Built-in and custom integrations** – Works with Amazon CloudWatch, Datadog, Dynatrace, New Relic, Splunk, Grafana, GitHub, GitLab, Azure DevOps, ServiceNow, PagerDuty, Slack, and Microsoft Teams. Connect to private or remote MCP servers to extend further into proprietary systems.
+ **Access from anywhere** – Operates as a remote server so other applications or agents can invoke release readiness checks, trigger investigations, or query operational health. Supports MCP, ACP, and A2A protocols.

## How AWS DevOps Agent works
<a name="how-aws-devops-agent-works"></a>

AWS DevOps Agent operates through a dual-console architecture. Administrators use the AWS Management Console to create and manage Agent Spaces, configure integrations, and set up access controls. Operations teams use the AWS DevOps Agent web app for day-to-day incident response and investigation activities. The web app is where operators can interact with agent investigations, browse cross-account application topology, and learn about preventative improvements to observability, code, pipelines, and infrastructure architectures. To learn more, see [Proactive incident prevention](production-operations-proactive-incident-prevention.md).

The service is organized around Agent Spaces, which are logical containers that define what AWS DevOps Agent can access and investigate. Each Agent Space contains your AWS account configurations, third-party tool integrations, and access permissions. To learn more, see [What are DevOps Agent Spaces?](about-aws-devops-agent-what-are-devops-agent-spaces.md).

AWS DevOps Agent automatically builds an application topology that maps your resources and their relationships. This topology helps the service understand your application architecture during investigations. To learn more, see [What is a DevOps Agent Topology?](about-aws-devops-agent-what-is-a-devops-agent-topology.md).

## Benefits
<a name="benefits"></a>
+ **Ship faster with confidence** – Release readiness reviews and autonomous testing validate changes before they reach production, so developers don't wait on other teams for policy checks, dependency validation, and test results.
+ **Reduce mean time to resolution (MTTR)** – Autonomous investigation starts immediately, accelerating incident resolution from hours to minutes.
+ **Prevent recurring incidents** – Targeted recommendations address root causes and strengthen system resilience across observability, infrastructure, deployments, and application code.
+ **Improve operational efficiency** – Free your team from repetitive investigation and review tasks to focus on higher-value work.
+ **Work within existing workflows** – Integrates with your existing tools and processes without disruption, delivering results where your team already works.