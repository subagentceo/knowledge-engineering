# About GitHub Copilot cloud agent

Copilot can research a repository, create an implementation plan, and make code changes on a branch. You can review the diff, iterate, and create a pull request when you're ready.

## Overview of Copilot cloud agent

With Copilot cloud agent, GitHub Copilot can work independently in the background to complete tasks, just like a human developer.

Copilot cloud agent can:

* Research a repository
* Create implementation plans
* Fix bugs
* Implement incremental new features
* Improve test coverage
* Update documentation
* Address technical debt
* Resolve merge conflicts

When you delegate tasks to Copilot cloud agent, you can:

* Use the agents panel or other agents entry points on GitHub.com to have Copilot research, plan, and make code changes on a branch, then iterate before creating a pull request. You can also specify in your prompt that you want a pull request created right away. See [Research, plan, and iterate on code changes with Copilot cloud agent](/en/copilot/how-tos/use-copilot-agents/cloud-agent/research-plan-iterate).
* Ask Copilot to open a new pull request from other entry points, including GitHub Issues and Visual Studio Code. See [Starting GitHub Copilot sessions](/en/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions).
* Mention `@copilot` in a comment on an existing pull request to ask it to make changes. See [Review output from Copilot](/en/copilot/how-tos/use-copilot-agents/cloud-agent/make-changes-to-an-existing-pr).
* Assign security alerts to Copilot from security campaigns. See [Fixing alerts in a security campaign](/en/code-security/code-scanning/managing-code-scanning-alerts/fixing-alerts-in-security-campaign#assigning-alerts-to-copilot-cloud-agent).

Copilot cloud agent will evaluate the task it has been assigned based on the prompt you give it.

While working on a coding task, Copilot cloud agent has access to its own ephemeral development environment, powered by GitHub Actions, where it can explore your code, make changes, execute automated tests and linters and more.

> \[!NOTE] Deep research, planning, and iterating on code changes before creating a pull request are only available with Copilot cloud agent on GitHub.com. Cloud agent integrations (such as Azure Boards, JIRA, Linear, Slack, or Teams) only support creating a pull request directly.

### Benefits over traditional AI workflows

When used effectively, Copilot cloud agent offers productivity benefits over traditional AI assistants in IDEs:

* With **AI assistants in IDEs**, coding happens **locally**. Individual developers pair in **synchronous** sessions with the AI assistant. Decisions made during the session are **untracked** and lost to time unless committed. Although the assistant helps write code, the developer still has a lot of **manual steps** to do: create the branch, write commit messages, push the changes, open the PR, write the PR description, get a review, iterate in the IDE, and repeat. These steps take time and effort that may be hard to justify for simple or routine issues.

* With **Copilot cloud agent**, all coding and iterating happens **on GitHub**. You can ask Copilot to **research** a repository, **create a plan**, and **make code changes** on a branch—all before opening a pull request. You can create multiple custom agents that specialize in different types of tasks. Copilot **automates** branch creation, commit message writing, and pushing. Developers let the agents **work in the background** and then chooses to **create a pull request** when ready. Working on GitHub adds **transparency**, with every step happening in a commit and being viewable in logs, and opens up **collaboration** opportunities for the entire team.

## Copilot cloud agent versus agent mode

Copilot cloud agent is distinct from the "agent mode" feature available in your IDE. Copilot cloud agent works autonomously in a GitHub Actions-powered environment to complete development tasks assigned through GitHub issues or GitHub Copilot Chat prompts. It can research a repository, create a plan, make code changes on a branch, and optionally open a pull request. In contrast, agent mode in your IDE makes autonomous edits directly in your local development environment. For more information about agent mode, see [Asking GitHub Copilot questions in your IDE](/en/copilot/using-github-copilot/copilot-chat/asking-github-copilot-questions-in-your-ide).

## Streamlining software development with Copilot cloud agent

Assigning tasks to Copilot cloud agent can enhance your software development workflow.

For example, you can assign Copilot cloud agent to straightforward issues on your backlog by selecting "Copilot" as the assignee. This allows you to spend less time on these issues and more time on more complex or interesting work, or work that requires a high degree of creative thinking. Copilot cloud agent can work on "nice to have" issues that improve the quality of your codebase or product, but often remain on the backlog while you focus on more urgent work.

Having Copilot cloud agent as an additional coding resource also allows you to start tasks that you might not have otherwise started due to lack of resources. For example, you might create issues to refactor code or add more logging, and then immediately assign these to Copilot.

You can also use Copilot cloud agent to research a repository and create a plan before any code is written, helping you understand how a codebase works or agree on an approach before committing to changes. See [Research, plan, and iterate on code changes with Copilot cloud agent](/en/copilot/how-tos/use-copilot-agents/cloud-agent/research-plan-iterate).

Copilot cloud agent can start a task, which you then pick up and continue working on yourself. By assigning the initial work to Copilot, you free up time that you would otherwise have spent doing repetitive tasks, such as setting up the scaffolding for a new project.

You can create specialized custom agents for different tasks. For example, you might create a custom agent specialized for frontend development that focuses on React components and styling, a documentation agent that excels at writing and updating technical documentation, or a testing agent that specializes in generating comprehensive unit tests. Each custom agent can be tailored with specific prompts and tools suited to its particular task.

## Measuring pull request outcomes for Copilot cloud agent

Enterprise administrators and organization owners can use Copilot usage metrics to analyze pull request outcomes for pull requests created by Copilot cloud agent.

The Copilot usage metrics APIs include pull request lifecycle metrics such as:

* The total number of pull requests created and merged
* The number of pull requests created by Copilot cloud agent that have been merged
* Median time to merge for merged pull requests, including pull requests created by Copilot cloud agent

These metrics can help you track adoption of Copilot cloud agent and monitor changes in pull request throughput and time to merge over time. See [GitHub Copilot usage metrics](/en/copilot/concepts/copilot-usage-metrics/copilot-metrics).

## Integrating Copilot cloud agent with third-party tools

You can also invoke Copilot cloud agent from external tools, allowing you to assign tasks to Copilot, provide context, and open pull requests without leaving your workflow. See [About Copilot integrations](/en/copilot/concepts/tools/about-copilot-integrations)

## Making Copilot cloud agent available

Before you can assign tasks to Copilot cloud agent, it must be enabled.

Copilot cloud agent is available with the GitHub Copilot Pro, GitHub Copilot Pro+, GitHub Copilot Business and GitHub Copilot Enterprise plans.

If you are a GitHub Copilot Business or GitHub Copilot Enterprise subscriber, an administrator must enable the relevant policy before you can use the agent.

Repository owners can choose to opt out some or all repositories from Copilot cloud agent.

For more information, see [Managing access to GitHub Copilot cloud agent](/en/copilot/concepts/agents/cloud-agent/access-management).

## AI models for Copilot cloud agent

Depending on how you start your Copilot cloud agent task, you may be able to select the model used by Copilot cloud agent. You may find that different models perform better, or provide more useful responses, depending on the type of tasks you give Copilot.

For more information, see [Changing the AI model for GitHub Copilot cloud agent](/en/copilot/how-tos/use-copilot-agents/cloud-agent/changing-the-ai-model).

## Enhancing Copilot cloud agent's knowledge of a repository

The more Copilot cloud agent knows about the code in your repository, the tools you use, and your coding standards and practices, the more effective it will become. There are two ways you can enhance Copilot cloud agent's knowledge of a repository.

* **Custom instructions**

  These are short, natural‑language statements that you write and store as one or more files in a repository. If you are the owner of an organization on GitHub you can also define custom instructions in the settings for your organization. For more information, see [About customizing GitHub Copilot responses](/en/copilot/concepts/prompting/response-customization?tool=webui#about-repository-custom-instructions).

* **Copilot Memory** (public preview)

  If you have a Copilot Pro or Copilot Pro+ plan, you can enable Copilot Memory. This allows Copilot to store useful details it has worked out for itself about a repository. Copilot cloud agent can then use this information when it is working in that repository. For more information, see [About GitHub Copilot Memory](/en/copilot/concepts/agents/copilot-memory).

## Copilot cloud agent usage costs

Copilot cloud agent uses GitHub Actions minutes and Copilot premium requests.

Within your monthly usage allowance for GitHub Actions and premium requests, you can ask Copilot cloud agent to work on coding tasks without incurring any additional costs.

For more information, see [GitHub Copilot licenses](/en/billing/managing-billing-for-your-products/managing-billing-for-github-copilot/about-billing-for-github-copilot#allowance-usage-for-copilot-cloud-agent).

## Customizing Copilot cloud agent

You can customize Copilot cloud agent in a number of ways:

* **Custom instructions**: Custom instructions allow you to give Copilot additional context on your project and how to build, test and validate its changes. For more information, see [Adding repository custom instructions for GitHub Copilot](/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions).
* **Model Context Protocol (MCP) servers**: MCP servers allow you to give Copilot access to different data sources and tools. For more information, see [Connect agents to external tools](/en/copilot/how-tos/use-copilot-agents/cloud-agent/extend-cloud-agent-with-mcp).
* **Custom agents**: Custom agents allow you to create different specialized versions of Copilot for different tasks. For example, you could customize Copilot to be an expert frontend engineer following your team's guidelines. For more information, see [About custom agents](/en/copilot/concepts/agents/cloud-agent/about-custom-agents).
* **Hooks**: Hooks allow you to execute custom shell commands at key points during agent execution, enabling you to add validation, logging, security scanning, or workflow automation. For more information, see [About hooks for GitHub Copilot](/en/copilot/concepts/agents/hooks).
* **Skills**: Skills allow you to enhance the ability of Copilot to perform specialized tasks with instructions, scripts, and resources. For more information, see [About agent skills](/en/copilot/concepts/agents/about-agent-skills).

## Limitations of Copilot cloud agent

Copilot cloud agent has certain limitations in its software development workflow and compatibility with other features.

### Limitations in Copilot cloud agent's software development workflow

* **Copilot can only make changes in the repository specified when you start a task**. Copilot cannot make changes across multiple repositories in one run.
* **By default, Copilot can only access context in the repository specified when you start a task**. The Copilot MCP server is configured by default to allow Copilot to access context (for example issues and historic pull requests) in the repository where it is working. You can, however, configure broader access. See [Connect agents to external tools](/en/copilot/how-tos/use-copilot-agents/cloud-agent/extend-cloud-agent-with-mcp).
* **Copilot can only work on one branch at a time** and can open exactly one pull request to address each task it is assigned.

### Limitations in Copilot cloud agent's compatibility with other features

* **Copilot isn't able to comply with certain rules that may be configured for your repository**. If you have configured a ruleset or branch protection rule that isn't compatible with Copilot cloud agent, access to the agent will be blocked. For example, a rule that only allows specific commit authors can prevent Copilot cloud agent from creating or updating pull requests. If the rule is configured using rulesets, you can add Copilot as a bypass actor to enable access. See [Creating rulesets for a repository](/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository#granting-bypass-permissions-for-your-branch-or-tag-ruleset).
* **Copilot cloud agent doesn't account for content exclusions**. Content exclusions allow administrators to configure Copilot to ignore certain files. When using Copilot cloud agent, Copilot will not ignore these files, and will be able to see and update them. See [Excluding content from GitHub Copilot](/en/copilot/managing-copilot/configuring-and-auditing-content-exclusion/excluding-content-from-github-copilot).
* **Copilot cloud agent only works with repositories hosted on GitHub**. If your repository is stored using a different code hosting platform, Copilot won't be able to work on it.

## Hands-on practice

Try the [Expand your team with Copilot cloud agent](https://github.com/skills/expand-your-team-with-copilot/?ref_product=copilot\&ref_type=engagement\&ref_style=text) Skills exercise for practical experience with Copilot cloud agent.

## Further reading

* [GitHub Copilot cloud agent](/en/copilot/how-tos/use-copilot-agents/cloud-agent) how-to articles
* [About custom agents](/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
* [Responsible use of GitHub Copilot cloud agent on GitHub.com](/en/copilot/responsible-use/copilot-cloud-agent)