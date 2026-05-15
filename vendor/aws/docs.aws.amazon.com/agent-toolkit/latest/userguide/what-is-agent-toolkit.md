

# What is the Agent Toolkit for AWS?
<a name="what-is-agent-toolkit"></a>

The Agent Toolkit for AWS gives AI coding agents the tools, knowledge, and guardrails they need to build, deploy, and manage applications on AWS. It works with the coding agents that developers already use — including Claude Code, Cursor, and Codex — without requiring you to switch tools or learn a new workflow.

AI coding agents can handle common AWS tasks like creating an Amazon S3 bucket or launching an Amazon EC2 instance, but they often struggle with complex, multi-step workflows. They choose the wrong service for a use case, misconfigure resources, or repeatedly retry operations on newer services they were not trained on. The Agent Toolkit for AWS addresses this by giving agents secure access to any AWS service, up-to-date documentation, and step-by-step guidance for the tasks where they need it most.

**Topics**
+ [Components](#agent-toolkit-components)
+ [What can I do with the Agent Toolkit for AWS?](#what-can-i-do-agent-toolkit)
+ [How the Agent Toolkit for AWS works](#how-agent-toolkit-works)
+ [Pricing](#agent-toolkit-pricing)

## Components
<a name="agent-toolkit-components"></a>

The Agent Toolkit for AWS includes four components that work together:
+ **AWS MCP Server** — A managed server that gives agents access to AWS through the Model Context Protocol (MCP). Agents can search AWS documentation and retrieve service information without authentication. To execute AWS API calls, run Python scripts in a sandboxed environment, or follow curated skills, agents authenticate through your existing IAM credentials. All of these capabilities are available through a single endpoint with CloudWatch metrics and IAM-based access controls.
+ **Agent skills** — Curated packages of instructions, code scripts, and reference materials that help agents complete specific AWS tasks. Skills are loaded on demand — agents discover and retrieve only the skills relevant to the current task, so they do not consume unnecessary context. Skills cover service selection, step-by-step procedures, troubleshooting, and SDK best practices.
+ **Plugins** — Single-install packages for Claude Code and Codex that bundle the AWS MCP Server configuration and a curated set of agent skills. After you install a plugin, your agent is ready to work with AWS.
+ **Rules files** — Project-level configuration files that set guardrails and preferences for how agents work in your project. Rules files tell agents how to use AWS most effectively — for example, by using the AWS MCP Server, discovering available skills, or searching documentation before acting.

## What can I do with the Agent Toolkit for AWS?
<a name="what-can-i-do-agent-toolkit"></a>

With the Agent Toolkit for AWS, your AI coding agent can:
+ **Build and deploy applications on AWS** — Your agent creates AWS infrastructure, writes application code, and deploys to production. Skills from the toolkit guide your agent through choosing the right services, configuring them correctly, and following deployment best practices.
+ **Stay up to date on the latest AWS services** — The AI models that power coding agents are trained on data that can be months or years old. Newer AWS services and recently launched features are often missing from an agent's knowledge. The toolkit gives your agent real-time access to current AWS documentation, API references, and service capabilities.
+ **Follow tested procedures for complex workflows** — Instead of improvising from general knowledge, your agent follows tested procedures provided by the toolkit for workflows like configuring least-privilege IAM policies, setting up data pipelines, or deploying production-ready serverless applications.
+ **Troubleshoot operational issues** — Point your agent at a failing deployment, a spike in error rates, or an unexpected cost increase. The toolkit provides skills that help your agent work with CloudWatch logs and metrics, CloudFormation stack status, and troubleshooting procedures.
+ **Operate with security and visibility** — The AWS MCP Server provides CloudWatch metrics for monitoring agent activity, IAM-based access controls, and the ability to set enterprise guardrails — like restricting agents to read-only operations or blocking specific actions through MCP.
+ **Work with any MCP-compatible agent** — The Agent Toolkit for AWS works with Claude Code, Cursor, Codex, Kiro, Windsurf, Cline, and any other agent that supports the Model Context Protocol.

## How the Agent Toolkit for AWS works
<a name="how-agent-toolkit-works"></a>

The Agent Toolkit for AWS helps your AI coding agent build on AWS in three ways:
+ **Skills provide structured guidance** — The agent uses skills that are installed locally via a plugin, or discovers them at runtime through the AWS MCP Server. Skills contain step-by-step instructions, decision guides, and reference materials that guide the agent through complex procedures while following AWS best practices.
+ **Knowledge tools provide current information** — When the agent needs up-to-date information, it can search AWS documentation, retrieve API references, check regional availability, and access the latest AWS service information.
+ **API tools execute authenticated actions** — The AWS MCP Server translates requests into properly formatted AWS API calls, handles authentication using your IAM credentials, and executes the commands with detailed feedback about results and any errors. For complex multi-step operations, agents can write and execute Python scripts in an isolated sandbox using the `run_script` tool.

The AWS MCP Server automatically adds two global condition context keys (`aws:ViaAWSMCPService` and `aws:CalledViaAWSMCP`) to all requests. These keys let you differentiate MCP-initiated actions from direct API calls in your IAM policies. CloudTrail logs all API calls for audit visibility.

Authentication and authorization use your existing AWS IAM roles and policies, so you maintain full control over what resources and actions are available.

**Note**  
We recommend scoping down IAM roles to the minimum permissions that the agent needs to perform its task.

## Pricing
<a name="agent-toolkit-pricing"></a>

You can use the Agent Toolkit for AWS at no additional charge. You pay only for the AWS resources your agent provisions or interacts with, at standard AWS pricing. For more information about AWS pricing, see [AWS Pricing](https://aws.amazon.com/pricing/). If you are new to AWS, you can get started with many services for free. For more information, see [AWS Free Tier](https://aws.amazon.com/free/).