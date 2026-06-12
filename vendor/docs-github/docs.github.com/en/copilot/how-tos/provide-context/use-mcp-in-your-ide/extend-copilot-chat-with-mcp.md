# Extending GitHub Copilot Chat with Model Context Protocol (MCP) servers

Connect MCP servers to Copilot Chat to share context from other applications.

## Introduction

The Model Context Protocol (MCP) is an open standard that defines how applications share context with large language models (LLMs). For an overview of MCP, see [About Model Context Protocol (MCP)](/en/copilot/concepts/about-mcp).

For a curated list of MCP servers from partners and the community, see the [GitHub MCP Registry](https://github.com/mcp).

Enterprises and organizations can choose to enable or disable use of MCP for members of their organization or enterprise with the **MCP servers in Copilot** policy. The policy is disabled by default. See [Managing policies and features for GitHub Copilot in your enterprise](/en/copilot/how-tos/administer/enterprises/managing-policies-and-features-for-copilot-in-your-enterprise) and [Managing policies and features for GitHub Copilot in your organization](/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies). The MCP policy **only** applies to users who have a Copilot Business or Copilot Enterprise subscription from an organization or enterprise that configures the policy. Copilot Free, Copilot Pro, Copilot Pro+, or Copilot Max **do not** have their MCP access governed by this policy.

<div class="ghd-tool vscode">

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Visual Studio Code version 1.99 or later**. For information on installing Visual Studio Code, see the [Visual Studio Code download page](https://code.visualstudio.com/Download?ref_product=copilot\&ref_type=engagement\&ref_style=text).
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Configuring MCP servers in Visual Studio Code

MCP servers can be configured manually in a configuration file, or through the GitHub MCP Registry. The GitHub MCP Registry provides a curated list of MCP servers that you can easily add to your Visual Studio Code instance.

### Using the GitHub MCP Registry

> \[!NOTE]
> The GitHub MCP Registry is in public preview and may change.

Only MCP servers listed in the GitHub MCP Registry can be added through the registry. Other servers can be configured manually. See [Configuring MCP servers manually](#configuring-mcp-servers-manually).

1. In Visual Studio Code, open the extensions panel by clicking the extensions icon in the sidebar or pressing <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd> (Windows/Linux) / <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd> (Mac).
2. In the extensions search bar, type `@mcp` followed by the name of the MCP server you want to add. This opens the MCP server gallery and shows matching results.
3. Select the MCP server from the search results. On the MCP server's details page, click **Install**.
4. When prompted, confirm that you trust the server to start it. VS Code discovers the server's tools and makes them available in chat.
5. To verify that the MCP server is configured correctly, open the command palette by pressing <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows/Linux) / <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac).
6. Type and select **MCP: List Servers**. You should see the MCP server listed as a configured server.

### Configuring MCP servers manually

To configure MCP servers in Visual Studio Code, you need to set up a configuration script that specifies the details of the MCP servers you want to use. You can configure MCP servers for either:

* **A specific repository**. This enables you to share MCP servers with anyone who opens the project in Visual Studio Code. To do this, create a `.vscode/mcp.json` file in the root of your repository.
* **Your personal instance of Visual Studio Code**. You will be the only person who has access to configured MCP servers. To do this, add the configuration to your `settings.json` file in Visual Studio Code. MCP servers configured this way will be available in all workspaces.

  > \[!NOTE] We recommend you use only one location per server. Adding the same server to both locations may cause conflicts and unexpected behavior.

The steps below show how to configure the Fetch MCP server in your `.vscode/mcp.json` file. The Fetch MCP server is a simple MCP server that provides web content fetching capabilities. For more information on the Fetch MCP server, see [the Fetch directory](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) in the MCP Server repository.

You can use the same steps to configure MCP servers in your personal Visual Studio Code settings. Details on how to configure other MCP servers are available in the [MCP servers repository](https://github.com/modelcontextprotocol/servers/tree/main).

For information on configuring the GitHub MCP server, see [Using the GitHub MCP Server in your IDE](/en/copilot/customizing-copilot/using-model-context-protocol/using-the-github-mcp-server).

1. Add the following configuration to your `.vscode/mcp.json` file:

   ```json copy
   {
   "inputs": [
     // The "inputs" section defines the inputs required for the MCP server configuration.
     {
       "type": "promptString"
     }
   ],
   "servers": {
     // The "servers" section defines the MCP servers you want to use.
     "fetch": {
       "command": "uvx",
       "args": ["mcp-server-fetch"]
     }
    }
   }
   ```

2. Save the `.vscode/mcp.json` file.

3. A "Start" button will appear in your `.vscode/mcp.json` file, at the top of the list of servers. Click the "Start" button to start the MCP servers. This will trigger the input dialog and discover the server tools, which are then stored for later sessions.

   ![Screenshot of MCP server configuration in Visual Studio Code. The "Start" button is outlined in dark orange. ](/assets/images/help/copilot/mcp-start-server-button.png)

4. Open Copilot Chat by clicking the <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg> icon in the title bar of Visual Studio Code.

5. In the Copilot Chat box, select **Agent** from the popup menu.

   ![Screenshot of the Copilot Chat box in Visual Studio Code. The "Agent" option is outlined in dark orange.](/assets/images/help/copilot/copilot-chat-agent-option.png)

6. To view your list of available MCP servers, click the tools icon in the top left corner of the chat box. This will open the MCP server list, where you can see all the MCP servers and associated tools that are currently available in your Visual Studio Code instance.
   * Optionally, you can define toolsets, groups of related tools that you can reference in chat. Toolsets make it easier to group related MCP tools together and quickly enable or disable them. For information on how to define and use a toolset, see the [VS Code docs](https://code.visualstudio.com/docs/copilot/agents/agent-tools#_group-tools-with-tool-sets).

For more information on configuring MCP servers in Visual Studio Code, see [Use MCP servers in Visual Studio Code](https://aka.ms/vscode-add-mcp) in the Visual Studio Code documentation.

## Using MCP servers in Copilot Chat

Once you have configured your MCP servers, you can use them in Copilot Chat to access a wide range of tools and services. In the example below, we will use the Fetch MCP server to fetch details about a web page.

1. Open Copilot Chat by clicking the <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg> icon in the title bar of Visual Studio Code.

2. In the Copilot Chat box, select **Agent** from the agent dropdown menu.

3. In the file with the MCP configuration, check that the MCP server is running. If it is not running, click the "Start" button to start the MCP server.

   ![Screenshot of the MCP server configuration in Visual Studio Code. The "Running" status is outlined in dark orange.](/assets/images/help/copilot/vsc-mcp-server-running.png)

4. Ask Copilot Chat to fetch the details of a URL. For example:

   `Fetch https://github.com/github/docs.`

5. If Copilot asks you to confirm that you want to proceed, click **Continue**.

6. Copilot will fetch the details of the URL and display them in the chat box.

Optionally, you can use MCP prompts and resources in VS Code.

* MCP servers can define preconfigured prompts for interacting with their tools. You can access these prompts in chat with slash commands, using the format `/mcp.servername.promptname`.
* MCP servers provide resources, which are any kind of data that the server wants to make available. For example, the GitHub MCP server provides repository content as a resource. To add resources from an MCP server to your chat context, click **Add Context...** in the chat box, then click **MCP Resources**.

For more information on using MCP servers in Visual Studio Code, see [Use MCP servers in Visual Studio Code](https://aka.ms/vscode-add-mcp) in the Visual Studio Code documentation.

## Using existing MCP configurations

If you already have an MCP configuration in Claude Desktop, you can use that configuration in Visual Studio Code to access the same MCP servers. To do this, add the following configuration to your `settings.json` file in Visual Studio Code:

```json copy
"chat.mcp.discovery.enabled": true
```

Visual Studio Code will automatically find your existing configuration and use it in your Visual Studio Code instance.

</div>

<div class="ghd-tool visualstudio">

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Visual Studio version 17.14 or later**. For more information on installing Visual Studio, see the [Visual Studio downloads page](https://visualstudio.microsoft.com/downloads/).
* **Sign in to GitHub from Visual Studio**.
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Configuring MCP servers in Visual Studio

1. In the Visual Studio menu bar, click **View**, then click **GitHub Copilot Chat**.

2. At the bottom of the chat panel, select **Agent** from the mode dropdown.

3. In the Copilot Chat window, click the tools icon, then click the plus icon in the tool picker window.

4. In the "Configure MCP server" pop-up window, fill out the fields, including server ID, type, and any additional fields required for the specific MCP server configuration.

   Visual Studio supports both remote and local servers. Remote servers, defined with a URL and credentials, are hosted externally for easier setup and sharing, while local servers, defined with command-line invocation, run on your local machine and can access local resources. See example configurations below, using the GitHub MCP server as an example.

5. Click **Save**.

6. If you are using a remote server with OAuth authentication, in the `mcp.json` file, click **Auth** from the CodeLens above the server to authenticate to the server. A pop-up or new window will appear, allowing you to authenticate with your account. The server will only be able to access the scopes you approve, and that your organization policies allow.

7. In the Copilot Chat window, click the tools icon. You should now see additional tools from the MCP server that you configured.

### Remote server configuration example with OAuth

1. For "Server ID", type `github`.

2. For "Type", select "HTTP/SSE" from the dropdown.

3. For "URL", type `https://api.githubcopilot.com/mcp/`.

4. After clicking **Save**, the configuration in the `mcp.json` file should look like this:

   ```json copy
       {
         "servers": {
           "github": {
             "url": "https://api.githubcopilot.com/mcp/"
           }
         }
       }
   ```

5. In the `mcp.json` file, click **Auth** from the CodeLens above the server to authenticate to the server. A pop-up will come up allowing you to authenticate with your GitHub account.

### Local server configuration example

1. For "Server ID", type `github`.
2. For "Type", select "stdio" from the dropdown.
3. For "Command (with optional arguments)", type `docker "run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"`
4. Add an environment variable "GITHUB\_PERSONAL\_ACCESS\_TOKEN" set to your personal access token.
5. After clicking **Save**, the configuration in the `mcp.json` file should look like this:

   ```json copy
       {
         "servers": {
           "github": {
             "type": "stdio",
             "command": "docker",
             "args": [
               "run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
               "ghcr.io/github/github-mcp-server"
             ],
             "env": {
               "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_PAT"
             }
           }
         }
       }
   ```

For more information on configuring MCP servers in Visual Studio, see [Use MCP servers in Visual Studio (Preview)](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=vs-2022) in the Visual Studio documentation.

</div>

<div class="ghd-tool jetbrains">

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **A compatible JetBrains IDE**. GitHub Copilot is compatible with the following IDEs:

  * IntelliJ IDEA (Ultimate, Community, Educational)
  * Android Studio
  * AppCode
  * CLion
  * Code With Me Guest
  * DataGrip
  * DataSpell
  * GoLand
  * JetBrains Client
  * MPS
  * PhpStorm
  * PyCharm (Professional, Community, Educational)
  * Rider
  * RubyMine
  * RustRover
  * WebStorm
  * Writerside

  See the [JetBrains IDEs](https://www.jetbrains.com/products/?ref_product=copilot\&ref_type=engagement\&ref_style=button) tool finder to download.
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Configuring MCP servers from your MCP registry

1. In your JetBrains IDE, open Copilot Chat.
2. In the Copilot Chat window, click the <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-mcp" aria-label="mcp" role="img"><path d="M5.52 1.12a3.578 3.578 0 0 1 6.078 2.98 3.578 3.578 0 0 1 2.982 6.08l-3.292 3.293a.252.252 0 0 0 0 .354l.843.843a.749.749 0 1 1-1.06 1.06l-.844-.843a1.75 1.75 0 0 1 0-2.474L13.52 9.12a2.08 2.08 0 0 0 0-2.94 2.08 2.08 0 0 0-2.94 0L7.731 9.03A.75.75 0 0 1 6.67 7.97l2.85-2.85a2.08 2.08 0 0 0 0-2.94 2.08 2.08 0 0 0-2.94 0l-4.799 4.8A.75.75 0 0 1 .72 5.92Z"></path><path d="M7.52 3.12a.749.749 0 1 1 1.06 1.06L5.731 7.03A2.079 2.079 0 0 0 8.67 9.97l2.85-2.85a.749.749 0 1 1 1.06 1.06l-2.849 2.85A3.578 3.578 0 0 1 4.67 5.97Z"></path></svg> MCP icon.
3. In the MCP Registry window, find the MCP server(s) you want to add from the list of available servers.
4. Next to each MCP server you want to add, click **Install**.
5. When you are finished adding MCP servers, click **OK**.
6. In the Copilot Chat window, click the tools icon. You should now see additional tools from the MCP server(s) that you installed.

## Configuring MCP servers manually

1. In the lower right corner, click **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>**.
2. From the menu, select "Open Chat", make sure you are in Agent mode, then click the tools icon (called "Configure your MCP server") at the bottom of the chat window.
3. Click **Add MCP Tools**.
4. In the `mcp.json` file, define your MCP servers. JetBrains IDEs support both remote and local servers. Remote servers are hosted externally for easier setup and sharing, while local servers run on your local machine and can access local resources.

You can use the following configurations as examples:

### Remote server configuration example with PAT

```json copy
{
    "servers": {
        "github": {
            "url": "https://api.githubcopilot.com/mcp/",
            "requestInit": {
                "headers": {
                    "Authorization": "Bearer YOUR_PAT_HERE"
                }
            }
        }
    }
  }
```

### Local server configuration example

```json copy
{
  "servers": {
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-memory"
      ]
    }
  }
}
```

</div>

<div class="ghd-tool xcode">

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **GitHub Copilot for Xcode extension**. See [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment).
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Configuring MCP servers from your MCP registry

1. In Xcode, open Copilot Chat.
2. In the Copilot Chat window, click the <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-gear" aria-label="The Settings gear" role="img"><path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"></path></svg> icon to open settings.
3. In the settings window, select the **Tools** tab.
4. Next to **MCP Registry URL (Optional)**, click **Browse MCP Servers**.
5. In the MCP Registry window, find the MCP server(s) you want to add from the list of available servers.
6. Next to each MCP server you want to add, click **Install**.
7. When you are finished adding MCP servers, close the **MCP Servers Marketplace** window.
8. In the settings window, under **Available MCP Tools**, click the **>** icon to expand the list of available MCP tools. You should now see additional tools from the MCP server(s) that you installed.

## Configuring MCP servers manually

1. Open the GitHub Copilot for Xcode extension and go to "Settings".
   * Alternatively, in an active Xcode workspace, you can find the settings by clicking **Editor** in the menu bar, selecting **GitHub Copilot**, then clicking **Open GitHub Copilot for Xcode Settings**.
2. Select the **MCP** tab, then click **Edit Config**.
3. Define your MCP servers, editing `mcp.json`. Xcode supports both remote and local servers. Remote servers are hosted externally for easier setup and sharing, while local servers run on your local machine and can access local resources.

You can use the following configurations as examples:

### Remote server configuration example with PAT

```json copy
{
    "servers": {
        "github": {
            "url": "https://api.githubcopilot.com/mcp/",
            "requestInit": {
                "headers": {
                    "Authorization": "Bearer YOUR_PAT_HERE"
                }
            }
        }
    }
  }
```

### Local server configuration example

```json copy
{
  "servers": {
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-memory"
      ]
    }
  }
}
```

</div>

<div class="ghd-tool eclipse">

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Compatible version of Eclipse**. To use the GitHub Copilot extension, you must have Eclipse version 2024-09 or above. See the [Eclipse download page](https://www.eclipse.org/downloads/packages/).
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Configuring MCP servers from your MCP registry

1. In Eclipse, open Copilot Chat.
2. In the Copilot Chat window, click the <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-mcp" aria-label="mcp" role="img"><path d="M5.52 1.12a3.578 3.578 0 0 1 6.078 2.98 3.578 3.578 0 0 1 2.982 6.08l-3.292 3.293a.252.252 0 0 0 0 .354l.843.843a.749.749 0 1 1-1.06 1.06l-.844-.843a1.75 1.75 0 0 1 0-2.474L13.52 9.12a2.08 2.08 0 0 0 0-2.94 2.08 2.08 0 0 0-2.94 0L7.731 9.03A.75.75 0 0 1 6.67 7.97l2.85-2.85a2.08 2.08 0 0 0 0-2.94 2.08 2.08 0 0 0-2.94 0l-4.799 4.8A.75.75 0 0 1 .72 5.92Z"></path><path d="M7.52 3.12a.749.749 0 1 1 1.06 1.06L5.731 7.03A2.079 2.079 0 0 0 8.67 9.97l2.85-2.85a.749.749 0 1 1 1.06 1.06l-2.849 2.85A3.578 3.578 0 0 1 4.67 5.97Z"></path></svg> MCP icon.
3. In the MCP Registry window, find the MCP server(s) you want to add from the list of available servers.
4. Next to each MCP server you want to add, click **Install**.
5. When you are finished adding MCP servers, click **Close**.
6. In the Copilot Chat window, click the tools icon. You should now see additional tools from the MCP server(s) that you installed.

## Configuring MCP servers manually

1. Click the Copilot icon (<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>) in the status bar at the bottom of Eclipse.
2. From the menu, select **Open Chat** and, in the chat window, click the "Configure Tools..." icon.
   * Alternatively, you can select **Edit preferences**, then in the left pane, expand GitHub Copilot and click **MCP**.
3. Under "Server Configurations", define your MCP servers. Eclipse supports both remote and local servers. Remote servers are hosted externally for easier setup and sharing, while local servers run on your local machine and can access local resources.

You can use the following configurations as examples:

### Remote server configuration example with PAT

```json copy
{
    "servers": {
        "github": {
            "url": "https://api.githubcopilot.com/mcp/",
            "requestInit": {
                "headers": {
                    "Authorization": "Bearer YOUR_PAT_HERE"
                }
            }
        }
    }
  }
```

### Local server configuration example

```json copy
{
  "servers": {
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-memory"
      ]
    }
  }
}
```

</div>

## Creating a new MCP server

You can create a new MCP server to fulfill your specific needs, and then integrate it with Copilot Chat. For example, you can create an MCP server that connects to a database or a web service, and then use that server in Copilot Chat to perform tasks on that database or web service.

For more information on creating and configuring your own MCP servers, see [the official MCP documentation](https://modelcontextprotocol.io/quickstart/server).

## Further reading

* [Adding MCP servers for GitHub Copilot CLI](/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
* [Configure MCP servers for your repository](/en/copilot/how-tos/use-copilot-agents/cloud-agent/extend-cloud-agent-with-mcp)
* [Using the GitHub MCP Server in your IDE](/en/copilot/customizing-copilot/using-model-context-protocol/using-the-github-mcp-server)
* [Enhancing GitHub Copilot agent mode with MCP](/en/copilot/tutorials/enhancing-copilot-agent-mode-with-mcp)