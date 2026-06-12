# Using the GitHub MCP Server in your IDE

Learn how to use the GitHub Model Context Protocol (MCP) server to interact with repositories, issues, pull requests, and other GitHub features, directly from Copilot Chat in your IDE.

The GitHub MCP server is available to all GitHub users regardless of plan type. However, specific tools within the MCP server inherit the same access requirements as their corresponding GitHub features. If a feature requires a paid GitHub or Copilot license, the equivalent MCP tool will require the same subscription. For example, tools that interact with Copilot cloud agent require a paid Copilot license.

<div class="ghd-tool vscode">

## About the GitHub MCP server

The GitHub MCP server is a Model Context Protocol (MCP) server provided and maintained by GitHub. MCP allows you to integrate AI capabilities with other tools and services, enhancing your development experience by providing context-aware AI assistance.

For a full introduction to the GitHub MCP server and an overview of MCP, see [About Model Context Protocol (MCP)](/en/copilot/concepts/about-mcp).

## Prerequisites

* A GitHub account.
* Visual Studio Code.
* The GitHub MCP server, configured in your editor. See [Setting up the GitHub MCP Server](/en/copilot/how-tos/provide-context/use-mcp/set-up-the-github-mcp-server).
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Using the GitHub MCP server in Visual Studio Code

The GitHub MCP server enables you to perform a wide range of actions on GitHub, via Copilot Chat in Visual Studio Code.

1. Open Copilot Chat by clicking the <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg> icon in the title bar of Visual Studio Code.
2. In the Copilot Chat box, select **Agent** from the agent dropdown menu.
3. To see the available actions, in the Copilot Chat box, click the **Configure tools** icon.
   * If you expand the GitHub MCP server entry, you will see a list of available tools.
4. In the Copilot Chat box, type a command or question related to the action you want to perform, and press **Enter**.
   * For example, you can ask the GitHub MCP server to create a new issue, list pull requests, or retrieve repository information.
5. The GitHub MCP server will process your request and provide a response in the chat interface.
   * In the Copilot Chat box, you may be asked to give additional permissions or provide more information to complete the action.
6. Follow the prompts to complete the action.

## Troubleshooting

If you encounter issues while using the GitHub MCP server, there are a few common troubleshooting steps you can take.

### Authorization issues

If you are having trouble authorizing the MCP server, ensure that:

* You are signed in to GitHub in your choice of IDE.

If you are authenticating with a personal access token (PAT), ensure that:

* Your GitHub PAT is valid and has the necessary scopes for the actions you want to perform.
* You have entered the correct PAT.

### Copilot agent mode problems

If you are having trouble with the Copilot Chat agent mode, ensure that:

* You have selected the correct agent in the Copilot Chat box.
* You have configured the MCP server correctly in your IDE.
* You have the necessary permissions to perform the actions you are trying to execute.

### Push protection block

If you are using the GitHub MCP server and push protection blocks a secret that you believe is safe to expose, you may be able to bypass the block by specifying a reason for allowing the secret. See [Working with push protection and the GitHub MCP server](/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-and-the-github-mcp-server#resolving-a-block).

### General tips

If you are experiencing other issues with the GitHub MCP server, here are some general tips to help you troubleshoot:

* Check the output logs of the MCP server for any error messages.
* If you are running the MCP server locally, ensure that your local environment is set up correctly for running Docker containers.
* Try restarting the MCP server or your IDE.

</div>

<div class="ghd-tool visualstudio">

## About the GitHub MCP server

The GitHub MCP server is a Model Context Protocol (MCP) server provided and maintained by GitHub. MCP allows you to integrate AI capabilities with other tools and services, enhancing your development experience by providing context-aware AI assistance.

For a full introduction to the GitHub MCP server and an overview of MCP, see [About Model Context Protocol (MCP)](/en/copilot/concepts/about-mcp).

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Visual Studio version 17.14 or later**. For more information on installing Visual Studio, see the [Visual Studio downloads page](https://visualstudio.microsoft.com/downloads/).
* The GitHub MCP server, configured in your editor. See [Setting up the GitHub MCP Server](/en/copilot/how-tos/provide-context/use-mcp/set-up-the-github-mcp-server).
* **Sign in to GitHub from Visual Studio**.
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Using the GitHub MCP server in Visual Studio

The GitHub MCP server enables you to perform a wide range of actions on GitHub, via Copilot Chat in Visual Studio.

1. In the Visual Studio menu bar, click **View**, then click **GitHub Copilot Chat**.
2. At the bottom of the chat panel, select **Agent** from the mode dropdown.
3. In the Copilot Chat window, click the tools icon.
   * Under **GitHub**, you will see a list of available tools.
4. In the Copilot Chat box, type a command or question related to the action you want to perform, and press **Enter**.
   * For example, you can ask the GitHub MCP server to create a new issue, list pull requests, or retrieve repository information.
5. The GitHub MCP server will process your request and provide a response in the chat interface.
   * In the Copilot Chat box, you may be asked to give additional permissions or provide more information to complete the action.
6. Follow the prompts to complete the action.

</div>

<div class="ghd-tool jetbrains">

## About the GitHub MCP server

The GitHub MCP server is a Model Context Protocol (MCP) server provided and maintained by GitHub. MCP allows you to integrate AI capabilities with other tools and services, enhancing your development experience by providing context-aware AI assistance.

For a full introduction to the GitHub MCP server and an overview of MCP, see [About Model Context Protocol (MCP)](/en/copilot/concepts/about-mcp).

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
* **Latest version of the GitHub Copilot extension**. See the [GitHub Copilot plugin](https://plugins.jetbrains.com/plugin/17718-github-copilot?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the JetBrains Marketplace. For installation instructions, see [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment).
* **Sign in to GitHub in your JetBrains IDE**. For authentication instructions, see [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment?tool=jetbrains#installing-the-github-copilot-plugin-in-your-jetbrains-ide).
* **The GitHub MCP server**, configured in your editor. See [Setting up the GitHub MCP Server](/en/copilot/how-tos/provide-context/use-mcp/set-up-the-github-mcp-server).
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Using the GitHub MCP server in JetBrains IDEs

The GitHub MCP server enables you to perform a wide range of actions on GitHub, via Copilot Chat in JetBrains IDEs.

1. Open the Copilot Chat window by clicking the **GitHub Copilot Chat** icon at the right side of the JetBrains IDE window.

   ![Screenshot of the GitHub Copilot Chat icon in the Activity Bar.](/assets/images/help/copilot/jetbrains-copilot-chat-icon.png)
2. At the top of the chat panel, click the **Agent** tab.
3. To see the available actions, in the Copilot Chat box, click the tools icon.
   * You will see a list of available actions from the GitHub MCP server.
4. In the Copilot Chat box, type a command or question related to the action you want to perform, and press **Enter**.
   * For example, you can ask the GitHub MCP server to create a new issue, list pull requests, or retrieve repository information.
5. The GitHub MCP server will process your request and provide a response in the chat interface.
   * In the Copilot Chat box, you may be asked to give additional permissions or provide more information to complete the action.
6. Follow the prompts to complete the action.

## Troubleshooting

If you encounter issues while using the GitHub MCP server, there are a few common troubleshooting steps you can take.

### Authorization issues

If you are having trouble authorizing the MCP server, ensure that:

* You are signed in to GitHub in your choice of IDE.

If you are authenticating with a personal access token (PAT), ensure that:

* Your GitHub PAT is valid and has the necessary scopes for the actions you want to perform.
* You have entered the correct PAT.

### Copilot agent mode problems

If you are having trouble with the Copilot Chat agent mode, ensure that:

* You have selected the correct agent in the Copilot Chat box.
* You have configured the MCP server correctly in your IDE.
* You have the necessary permissions to perform the actions you are trying to execute.

### Push protection block

If you are using the GitHub MCP server and push protection blocks a secret that you believe is safe to expose, you may be able to bypass the block by specifying a reason for allowing the secret. See [Working with push protection and the GitHub MCP server](/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-and-the-github-mcp-server#resolving-a-block).

### General tips

If you are experiencing other issues with the GitHub MCP server, here are some general tips to help you troubleshoot:

* Check the output logs of the MCP server for any error messages.
* If you are running the MCP server locally, ensure that your local environment is set up correctly for running Docker containers.
* Try restarting the MCP server or your IDE.

</div>

<div class="ghd-tool xcode">

## About the GitHub MCP server

The GitHub MCP server is a Model Context Protocol (MCP) server provided and maintained by GitHub. MCP allows you to integrate AI capabilities with other tools and services, enhancing your development experience by providing context-aware AI assistance.

For a full introduction to the GitHub MCP server and an overview of MCP, see [About Model Context Protocol (MCP)](/en/copilot/concepts/about-mcp).

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **GitHub Copilot for Xcode extension**. See [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment).
* The GitHub MCP server, configured in your editor. See [Setting up the GitHub MCP Server](/en/copilot/how-tos/provide-context/use-mcp/set-up-the-github-mcp-server).
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Using the GitHub MCP server in Xcode

The GitHub MCP server enables you to perform a wide range of actions on GitHub, via Copilot Chat in Xcode.

1. To open the chat view, click **Editor** in the menu bar, then click **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg> Copilot** then **Open Chat**. Copilot Chat opens in a new window.
2. At the bottom of the chat panel, select **Agent**.
3. To see the available actions, in the Copilot Chat box, click the tools icon.
   * You will see a list of available actions from the GitHub MCP server.
4. In the Copilot Chat box, type a command or question related to the action you want to perform, and press **Enter**.
   * For example, you can ask the GitHub MCP server to create a new issue, list pull requests, or retrieve repository information.
5. The GitHub MCP server will process your request and provide a response in the chat interface.
   * In the Copilot Chat box, you may be asked to give additional permissions or provide more information to complete the action.
6. Follow the prompts to complete the action.

## Troubleshooting

If you encounter issues while using the GitHub MCP server, there are a few common troubleshooting steps you can take.

### Authorization issues

If you are having trouble authorizing the MCP server, ensure that:

* You are signed in to GitHub in your choice of IDE.

If you are authenticating with a personal access token (PAT), ensure that:

* Your GitHub PAT is valid and has the necessary scopes for the actions you want to perform.
* You have entered the correct PAT.

### Copilot agent mode problems

If you are having trouble with the Copilot Chat agent mode, ensure that:

* You have selected the correct agent in the Copilot Chat box.
* You have configured the MCP server correctly in your IDE.
* You have the necessary permissions to perform the actions you are trying to execute.

### Push protection block

If you are using the GitHub MCP server and push protection blocks a secret that you believe is safe to expose, you may be able to bypass the block by specifying a reason for allowing the secret. See [Working with push protection and the GitHub MCP server](/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-and-the-github-mcp-server#resolving-a-block).

### General tips

If you are experiencing other issues with the GitHub MCP server, here are some general tips to help you troubleshoot:

* Check the output logs of the MCP server for any error messages.
* If you are running the MCP server locally, ensure that your local environment is set up correctly for running Docker containers.
* Try restarting the MCP server or your IDE.

</div>

<div class="ghd-tool eclipse">

## About the GitHub MCP server

The GitHub MCP server is a Model Context Protocol (MCP) server provided and maintained by GitHub. MCP allows you to integrate AI capabilities with other tools and services, enhancing your development experience by providing context-aware AI assistance.

For a full introduction to the GitHub MCP server and an overview of MCP, see [About Model Context Protocol (MCP)](/en/copilot/concepts/about-mcp).

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Compatible version of Eclipse**. To use the GitHub Copilot extension, you must have Eclipse version 2024-09 or above. See the [Eclipse download page](https://www.eclipse.org/downloads/packages/).
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.
* The GitHub MCP server, configured in your editor. See [Setting up the GitHub MCP Server](/en/copilot/how-tos/provide-context/use-mcp/set-up-the-github-mcp-server).
* **Latest version of the GitHub Copilot extension**. Download this from the [Eclipse Marketplace](https://aka.ms/copiloteclipse?ref_product=copilot\&ref_type=engagement\&ref_style=text). For more information, see [Installing the GitHub Copilot extension in your environment](/en/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment?tool=eclipse).
* **Sign in to GitHub from Eclipse**.

## Using the GitHub MCP server in Eclipse

The GitHub MCP server enables you to perform a wide range of actions on GitHub, via Copilot Chat in Eclipse.

1. To open the Copilot Chat panel, click the Copilot icon (<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>) in the status bar at the bottom of Eclipse, then click **Open Chat**.
2. At the bottom of the chat panel, select **Agent** from the mode dropdown.
3. To see the available actions, in the Copilot Chat box, click the tools icon.
   * Under `github`, you will see a list of available actions.
4. In the Copilot Chat box, type a command or question related to the action you want to perform, and press **Enter**.
   * For example, you can ask the GitHub MCP server to create a new issue, list pull requests, or retrieve repository information.
5. The GitHub MCP server will process your request and provide a response in the chat interface.
   * In the Copilot Chat box, you may be asked to give additional permissions or provide more information to complete the action.
6. Follow the prompts to complete the action.

## Troubleshooting

If you encounter issues while using the GitHub MCP server, there are a few common troubleshooting steps you can take.

### Authorization issues

If you are having trouble authorizing the MCP server, ensure that:

* You are signed in to GitHub in your choice of IDE.

If you are authenticating with a personal access token (PAT), ensure that:

* Your GitHub PAT is valid and has the necessary scopes for the actions you want to perform.
* You have entered the correct PAT.

### Copilot agent mode problems

If you are having trouble with the Copilot Chat agent mode, ensure that:

* You have selected the correct agent in the Copilot Chat box.
* You have configured the MCP server correctly in your IDE.
* You have the necessary permissions to perform the actions you are trying to execute.

### Push protection block

If you are using the GitHub MCP server and push protection blocks a secret that you believe is safe to expose, you may be able to bypass the block by specifying a reason for allowing the secret. See [Working with push protection and the GitHub MCP server](/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-and-the-github-mcp-server#resolving-a-block).

### General tips

If you are experiencing other issues with the GitHub MCP server, here are some general tips to help you troubleshoot:

* Check the output logs of the MCP server for any error messages.
* If you are running the MCP server locally, ensure that your local environment is set up correctly for running Docker containers.
* Try restarting the MCP server or your IDE.

</div>

## Further reading

* [Enhancing GitHub Copilot agent mode with MCP](/en/copilot/tutorials/enhancing-copilot-agent-mode-with-mcp)
* [Configure MCP servers for your repository](/en/copilot/how-tos/use-copilot-agents/cloud-agent/extend-cloud-agent-with-mcp)