# Creating custom agents for Copilot cloud agent in your IDE

You can create specialized agents with tailored expertise for specific development tasks.

Custom agents allow you to tailor Copilot's expertise for specific tasks. For a conceptual overview of custom agents, see [About custom agents](/en/copilot/concepts/agents/cloud-agent/about-custom-agents).

> \[!NOTE]
> Custom agents are in public preview for JetBrains IDEs, Eclipse, and Xcode, and subject to change.

<div class="ghd-tool vscode">

## Creating a custom agent profile

1. Open GitHub Copilot Chat in Visual Studio Code.
2. From the agents dropdown at the bottom of the chat view, click **Configure Custom Agents...**, then click **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-plus" aria-label="Plus button" role="img"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path></svg> Create new custom agent**.
3. Choose the location where the agent profile should be created:
   * **Workspace**: Create the custom agent profile in the `.github/agents` folder of your workspace to only use it within that workspace.
   * **User profile**: Create the custom agent profile in the current user profile folder to use it across all your workspaces.
4. Enter a file name for the custom agent. This is the default name that appears in the agents dropdown.
5. Configure the agent profile in the newly created `.agent.md` file, including the description, tools, and prompts. For more information on what the agent profile can include, see [Configuring an agent profile](#configuring-an-agent-profile).
   * You can use the **Configure Tools...** button within the editor to open the "Configure Tools" dialog, where you can view and select available tools, including built-in tools and tools from MCP servers. Click **OK** to add selected tools to the agent profile.
   * To set which AI model the agent uses, add a `model:` property and select your preferred model from the autocomplete dropdown.

To update an agent profile, select **Configure Custom Agents** from the agents dropdown, and then click on an agent from the list to modify it. For more information on custom agents in VS Code, see [Custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents).

</div>

<!-- --------------------- -->

<!-- JetBrains -->

<!-- --------------------- -->

<div class="ghd-tool jetbrains">

## Creating a custom agent profile

1. Open the GitHub Copilot Chat window in your JetBrains IDE.
2. From the agents dropdown at the bottom of the chat view, click **Configure Agents...**, then in the settings window, under "Chat Agents", click **Workspace**.
3. Enter a file name for the custom agent. This is the default name that appears in the agents dropdown.
4. Configure the agent profile in the newly created `.agent.md` file in the `.github/agents` directory, including the description, tools, and prompts. For more information on what the agent profile can include, see [Configuring an agent profile](#configuring-an-agent-profile).
   * You can use the **Configure Tools...** button within the editor to open the tools dialog, where you can view and select available tools, including built-in tools and tools from MCP servers. Click **Apply** to add selected tools to the agent profile.
   * To set which AI model the agent uses, add a `model:` property and select your preferred model from the autocomplete dropdown.

To update an agent profile, select **Configure Custom Agents** from the agents dropdown, and then click <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-pencil" aria-label="The pencil icon" role="img"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path></svg> next to the agent you want to modify.

</div>

<!-- --------------------- -->

<!-- Eclipse -->

<!-- --------------------- -->

<div class="ghd-tool eclipse">

## Creating a custom agent profile

1. Open the GitHub Copilot Chat window in Eclipse.
2. From the agents dropdown at the bottom of the chat view, click **Configure Agents...**, then click **Add...**.
3. Enter a file name for the custom agent. This is the default name that appears in the agents dropdown.
4. Configure the agent profile in the newly created `.agent.md` file in the `.github/agents` directory, including the description, tools, and prompts. For more information on what the agent profile can include, see [Configuring an agent profile](#configuring-an-agent-profile).
   * You can use the **Configure Tools...** button within the editor to open the "Configure Tools" dialog, where you can view and select available tools, including built-in tools and tools from MCP servers. Click **Apply** to add selected tools to the agent profile.
   * To set which AI model the agent uses, add a `model:` property and select your preferred model from the autocomplete dropdown.

To update an agent profile, select **Configure Agents...** from the agents dropdown, and then select the agent you want to modify and click **Edit**.

</div>

<!-- --------------------- -->

<!-- XCode -->

<!-- --------------------- -->

<div class="ghd-tool xcode">

## Creating a custom agent profile

1. Open the GitHub Copilot Chat window in Xcode.
2. From the agents dropdown at the bottom of the chat view, click **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-plus" aria-label="Plus button" role="img"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path></svg> Create an agent**.
3. Enter a file name for the custom agent. This is the default name that appears in the agents dropdown.
4. Configure the agent profile in the newly created `.agent.md` file in the `.github/agents` directory, including the description, tools, and prompts. For more information on what the agent profile can include, see [Configuring an agent profile](#configuring-an-agent-profile).
   * You can use the **Customize Agent** button within the file editor to open a dialog, where you can select the AI model for the agent to use, select available tools (including built-in and MCP server tools), and configure the `handoffs` property for transitioning between custom agents. Click **Apply** to add selected options to the agent profile.

To update an agent profile, from the agents dropdown, click the pencil icon next to the agent you want to modify.

</div>

## Configuring an agent profile

An agent profile is a Markdown file with YAML frontmatter that specifies the custom agent's name, description, available tools, and MCP server configurations. Configuring an agent profile involves defining the agent's identity, capabilities, tool access, and behavioral instructions.

For detailed configuration information about YAML properties, tools, MCP server setup, tool aliases, and how custom agents are processed, see [Custom agents configuration](/en/copilot/reference/custom-agents-configuration).

To configure your agent profile:

1. Optionally, write a `name` for your custom agent. If unset, the name will default to the filename (without the `.md` or `.agent.md` suffix).
2. Write a brief `description` (required) explaining what your agent does and its specific capabilities or domain expertise.
3. In the `tools` property, define which tools the agent can use. This is a list of tool names or aliases, including tools from MCP servers configured in the repository settings or the agent profile (for example, `tools: ["read", "edit", "search", "some-mcp-server/tool-1"]`). If you omit this property, the agent will have access to all available tools. See "Tools" in [Custom agents configuration](/en/copilot/reference/custom-agents-configuration#tools).
4. Optionally, in the `mcp-servers` property, you can configure MCP servers that will be available only to this agent to extend its capabilities. See "MCP server configuration details" in [Custom agents configuration](/en/copilot/reference/custom-agents-configuration#mcp-server-configuration-details).
5. If you are creating and using the agent profile in VS Code, JetBrains IDEs, Eclipse, or Xcode, you can also use the `model` property to control which AI model the agent should use.
6. Optionally, set the `target` property to either `vscode` or `github-copilot` if you want to only use the agent in a specific environment. The agent will be available in both environments if you omit the property.
7. Write the agent's prompt. Define the agent's behavior, expertise, and instructions in the Markdown content below the YAML frontmatter. The prompt can be a maximum of 30,000 characters.

## Example agent profiles

The following examples demonstrate what an agent profile could look like for the common tasks of writing tests or planning the implementation of a project. For additional inspiration, see the [Custom agents](/en/copilot/tutorials/customization-library/custom-agents) examples in the customization library. You can also find more specific examples in the [awesome-copilot](https://github.com/github/awesome-copilot/tree/main/agents) community collection.

### Testing specialist

This example enables all tools by omitting the `tools` property.

```text copy
---
name: test-specialist
description: Focuses on test coverage, quality, and testing best practices without modifying production code
---

You are a testing specialist focused on improving code quality through comprehensive testing. Your responsibilities:

- Analyze existing tests and identify coverage gaps
- Write unit tests, integration tests, and end-to-end tests following best practices
- Review test quality and suggest improvements for maintainability
- Ensure tests are isolated, deterministic, and well-documented
- Focus only on test files and avoid modifying production code unless specifically requested

Always include clear test descriptions and use appropriate testing patterns for the language and framework.
```

### Implementation planner

This example only enables a subset of tools.

```text copy
---
name: implementation-planner
description: Creates detailed implementation plans and technical specifications in markdown format
tools: ["read", "search", "edit"]
---

You are a technical planning specialist focused on creating comprehensive implementation plans. Your responsibilities:

- Analyze requirements and break them down into actionable tasks
- Create detailed technical specifications and architecture documentation
- Generate implementation plans with clear steps, dependencies, and timelines
- Document API designs, data models, and system interactions
- Create markdown files with structured plans that development teams can follow

Always structure your plans with clear headings, task breakdowns, and acceptance criteria. Include considerations for testing, deployment, and potential risks. Focus on creating thorough documentation rather than implementing code.
```

## Using custom agents

Once you've created a custom agent, you can use it wherever Copilot cloud agent is available.

* When prompting Copilot cloud agent with a task on GitHub.com, use the dropdown menu in the agents panel or agents tab to select your custom agent instead of the default cloud agent.
* When assigning Copilot cloud agent to an issue, you can select your custom agent from the dropdown menu to handle the issue with your specialized configuration.
* When using the GitHub Copilot CLI, you can choose to use a particular custom agent by using the `/agent` slash command or referencing the agent in a prompt or via a command-line argument. For more information, see [Using GitHub Copilot CLI](/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#use-custom-agents).

When Copilot opens pull requests, it will note which custom agent was used to complete the work in the pull request description.

For more information on using Copilot cloud agent, see [Starting GitHub Copilot sessions](/en/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions).

### Using custom agents in your IDE

You can also use your custom agent profiles directly in supported IDEs. You can switch between custom agents using the agent dropdown in the Chat window, allowing you to access specialized configurations for different tasks like planning, code editing, or research.

Some properties may function differently between the GitHub.com and IDE environments. For more information on supported properties, see [Custom agents configuration](/en/copilot/reference/custom-agents-configuration#yaml-frontmatter-properties).

For more information on custom agents in VS Code specifically, see [Custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents) in the VS Code documentation.

## Next steps

* For a hands-on tutorial to create your first custom agent, see [Your first custom agent](/en/copilot/tutorials/customization-library/custom-agents/your-first-custom-agent).
* For detailed configuration information, see [Custom agents configuration](/en/copilot/reference/custom-agents-configuration).
* For information on using cloud agents, including your custom agents, to start Copilot sessions, see [Starting GitHub Copilot sessions](/en/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions).