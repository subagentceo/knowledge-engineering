# Build agents and prompts in Foundry Toolkit

Agent Builder in Foundry Toolkit streamlines the engineering workflow for building agents, including prompt engineering and integration with tools, such as MCP servers. It helps with common prompt engineering tasks:

*   Iterate and refine in real-time
*   Provide easy access to code for seamless Large Language Model (LLM) integration via APIs

Agent Builder also enhances intelligent app's capabilities with tool use:

*   Connect to existing MCP servers
*   Build new MCP servers from scaffolds
*   Use function calling to connect to external APIs and services

![Screenshot showing the Agent Builder interface with prompt engineering and testing capabilities.](/assets/docs/intelligentapps/promptbuilder/AgentBuilder.gif)

## Create, edit, and test prompts

To access Agent Builder, use either of these options:

*   In the Foundry Toolkit view, select **Developer Tools** > **Create Agent** > **Open Agent Builder**
*   In the Foundry Toolkit view, select **My Resources** > **You project name** > **Prompt Agents** > select any prompt agent

To test a prompt in Agent Builder, follow these steps:

1.  If you haven't chosen a model, select one from the **Model** dropdown list in Agent Builder. You can also select **Browse models** to add a different model from the model catalog.
    
    ![Screenshot showing the model selection dropdown in Agent Builder.](/assets/docs/intelligentapps/promptbuilder/select-models.png)
    
2.  Enter the agent instructions.
    
    Use the **Instructions** field to tell your agent exactly what to do and how to do it. List the specific tasks, put them in order, and add any special instructions like tone or how to engage.
    
3.  Iterate over your instructions by observing the model response and making changes to the instructions.
    
4.  Use the syntax to add a dynamic value in instructions. For example, add a variable called `user_name` and use it in your instructions like this: `Greet the user by their name:` .
    
5.  Provide a value for the variable in the **Variables** section.
    
6.  Enter a prompt in the text box and select the send icon to test your agent.
    
7.  Observe the model's response and make any necessary adjustments to your instructions.
    

## Use MCP servers

An MCP server is a tool that allows you to connect to external APIs and services, enabling your agent to perform actions beyond just generating text. For example, you can use an MCP server to access databases, call web services, or interact with other applications.

Use the agent builder to discover and configure featured MCP servers, connect to existing MCP servers, or build a new MCP server from scaffold.

Note

Using MCP servers might require either Node or Python environment. Foundry Toolkit validates your environment to ensure that the required dependencies are installed. After installing, use the command `npm install -g npx` to install `npx`. If you prefer Python, we recommend using `uv`

### Configure a featured MCP server

Foundry Toolkit provides a list of featured MCP servers that you can use to connect to external APIs and services.

To configure an MCP server from featured selections, follow these steps:

1.  In the **Tool** section, select **+ MCP Server**, and then select **MCP Server** in the Quick Pick.
    
2.  Select **Could not find one? Browse more MCP servers** from the dropdown list. ![Screenshot showing the connect to MCP server interface in Agent Builder.](/assets/docs/intelligentapps/promptbuilder/featured-server.png)
    
3.  Choose an MCP server that meets your needs. ![Screenshot showing the connect to MCP server interface in Agent Builder.](/assets/docs/intelligentapps/promptbuilder/featured-server.png)
    
4.  The MCP server is added to your agent in the **MCP** subsection under **Tools**.
    

### Select tools from VS Code

1.  In the **Tool** section, select **+ MCP Server**, and then select **MCP Server** in the Quick Pick.
    
2.  Select **Use Tools Added in Visual Studio Code** from the dropdown list. ![Screenshot showing the connect to MCP server interface in Agent Builder.](/assets/docs/intelligentapps/promptbuilder/featured-server.png)
    
3.  Select tools you want to use. ![Screenshot showing the select tools interface in Agent Builder.](/assets/docs/intelligentapps/promptbuilder/select-tools.png)
    
4.  An MCP Server tool called `VSCode Tools` is added to your agent in the **MCP** subsection under **Tools**.
    

### Use an existing MCP server

Tip

Find MCP servers in these reference servers.

To use an existing MCP server, follow these steps:

1.  In the **MCP Workflow** section, select **+ Add MCP Server**.
    
2.  Or in Agent Builder, in the **Tool** section, select the `+` icon to add a tool for your agent, and then select **+ Add server** in the Quick Pick.
    
3.  Select **MCP server** in the Quick Pick.
    
4.  Select **Connect to an Existing MCP Server**
    
5.  Scroll down to the bottom of the dropdown list for the options to connect to the MCP server:
    
    *   **Command (stdio)**: Run a local command that implements the MCP protocol
    *   **HTTP (HTTP or server-sent events)**: Connect to a remote server that implements the MCP protocol
6.  Select tools from the MCP server if there are multiple tools available.
    
7.  Enter your prompts in the text box and select the send icon to test the connection.
    

Here's an example of configuring the Filesystem server in Foundry Toolkit:

1.  In the **Tool** section, select **+ MCP Server** in the Quick Pick.
    
2.  Select **Could not find one? Browse more MCP servers** from the dropdown list.
    
3.  Scroll down to the bottom of the dropdown list and select **Command (stdio)**
    
    Note
    
    Some servers use the Python runtime and the `uvx` command. The process is the same as using the `npx` command.
    
4.  Navigate to the Server instructions and locate the `npx` section.
    
5.  Copy the `command` and `args` into the input box in Foundry Toolkit. For the Filesystem server example, it's `npx -y @modelcontextprotocol/server-filesystem /Users/<username>/.aitk/examples`
    
6.  Input an ID for the server.
    
7.  Optionally, enter extra environment variables. Some servers might require extra environment variables such as API keys. In this case, Foundry Toolkit fails at the stage of adding tools and a file `mcp.json` opens, where you can enter the required server details following the instructions provided by each server. ![Screenshot showing an example of a missing arg exception](/assets/docs/intelligentapps/promptbuilder/modify-args.png) After you complete the configuration: 1. Navigate back to **Tool** section and select **+ MCP Server** 1. Select the server you configured from the dropdown list
    
8.  Select the tools you want to use.
    

![connect to MCP server](/assets/docs/intelligentapps/promptbuilder/mcp_existing.gif)

Foundry Toolkit also provides a scaffold to help you build a new MCP server. The scaffold includes a basic implementation of the MCP protocol, which you can customize to suit your needs.

### Build a new MCP server

To build a new MCP server, follow these steps:

1.  In the **MCP Workflow** section, select **Create New MCP Server**.
2.  Select a programming language from the dropdown list: **Python** or **TypeScript**
3.  Select a folder to create the new MCP server project in.
4.  Enter a name for the MCP server project.

After you create the MCP server project, you can customize the implementation to suit your needs. The scaffold includes a basic implementation of the MCP protocol, which you can modify to add your own functionality.

You can also use the Agent Builder to test the MCP server. The Agent Builder sends the prompts to the MCP server and displays the response.

Follow these steps to test the MCP server:

Note

To run the MCP Server in your local dev machine, you need: Node.js or Python installed on your machine.

1.  Open VS Code Debug panel. Select `Debug in Agent Builder` or press `F5` to start debugging the MCP server.
    
2.  The server is automatically connected to Agent Builder.
    
3.  Use Foundry Toolkit Agent Builder to enable the agent with the following instructions:
    
    *   "You are a weather forecast professional that can tell weather information based on given location.".
4.  Enter the prompt "What is the weather in Seattle?" in the prompt box and select the send icon to test the server with the prompt.
    
5.  Observe the response from the MCP server in the Agent Builder.
    

## Use function calling

Function calling connects your agent to external APIs and services.

![Screenshot showing the Add Custom Function Tool dialog with options to add tools by example or upload schemas.](/assets/docs/intelligentapps/promptbuilder/add-function-call.png)

1.  In **Tool**, select **Add Tool**, then **Custom Tool**.
2.  Choose how to add the tool:
    *   **By Example**: Add from a JSON schema example
    *   **Upload Existing Schema**: Upload a JSON schema file
3.  Enter the tool name and description, then select **Add**.
4.  Provide a mock response in the tool card.

![Screenshot showing a function calling tool card with weather tool configuration.](/assets/docs/intelligentapps/promptbuilder/function-call-card.png)

1.  Run the agent with the function calling tool.

Use function calling tools in the **Evaluation** tab by entering mock responses for test cases.

![Screenshot showing function calling tool usage in the evaluation tab.](/assets/docs/intelligentapps/promptbuilder/function-call-eval.png)

## Integrate prompt engineering into your application

After experimenting with models and prompts, you can get into coding right away with the automatically generated Python code.

![Animated GIF showing the generated Python code](/assets/docs/intelligentapps/promptbuilder/view-code-2.gif)

To view the Python code, follow these steps:

1.  Select **View Code**.
    
2.  For models hosted on GitHub, select the inference SDK you want to use.
    
    Foundry Toolkit generates the code for the model you selected by using the provider's client SDK. For models hosted by GitHub, you can choose which inference SDK you want to use: Agent Framework SDK or the SDK from the model provider, such as OpenAI SDK or Mistral API.
    
3.  The generated code snippet is shown in a new editor, where you can copy it into your application.
    
    > To authenticate with the model, you usually need an API key from the provider. To access models hosted by GitHub, generate a personal access token (PAT) in your GitHub settings.
    

## Code snippets and code projects

Use the selector located in the upper right-hand corner of the Agent Builder to View Code or View Snippet.

![Screenshot of the selector to view code or view snippet](/assets/docs/intelligentapps/promptbuilder/view-code-selector.png)

To consume your Prompt Agent in Python code, you can either:

*   **View Code** generates an entire project with example code that calls your Prompt Agent hosted in Foundry. You will be asked to select a folder location on your local drive, then an entire project will be generated in that folder and opened in a new instance of Visual Studio Code.
    
    ![Screenshot of entire project generated Python code to call Prompt Agent](/assets/docs/intelligentapps/promptbuilder/view-code-project.png)
    
*   **View Snippet** generates a single file snippet that calls your Prompt Agent hosted in Foundry.
    
    ![Screenshot of a single Python code file to call Prompt Agent](/assets/docs/intelligentapps/promptbuilder/view-code-snippet.png)
    

## View Prompt Agent conversations

Agent Builder provides a historical list of conversations which is useful for diagnosing and debugging your Prompt Agents.

To view the details of test conversations with the Prompt Agent, use the **Conversations** tab.

![Screenshot of conversation tab listing conversations](/assets/docs/intelligentapps/promptbuilder/conversation-tab.png)

Selecting a conversation from the list will display all the details about the conversation.

![Screenshot of conversation details](/assets/docs/intelligentapps/promptbuilder/conversation-details.png)

## Select Prompt Agent versions

Each time you make changes to a Prompt Agent and save them, a new version of the Prompt Agent is created in your Foundry project. To view and work with previous versions in the Playground, use the version selector.

![Screenshot of version selector](/assets/docs/intelligentapps/promptbuilder/version-selector.png)

## Switch Prompt Agents from within the Agent Builder

The Prompt Agent switcher in the Agent Builder allows you to easily switch between Prompt Agents associated with your current project, both local and those hosted in Foundry.

![Screenshot of version selector](/assets/docs/intelligentapps/promptbuilder/prompt-agent-switcher.png)

## What you learned

In this article, you learned how to:

*   Use the Foundry Toolkit for VS Code to test and debug your agents.
*   Discover, configure, and build MCP servers to connect your agents to external APIs and services.
*   Set up function calling to connect your agents to external APIs and services.
*   Implement structured output to deliver predictable results from your agents.
*   Integrate prompt engineering into your application with generated code snippets.

## Next steps

*   Run an evaluation job for the popular evaluators

10/03/2025