# Setting up the GitHub MCP Server

Learn how to configure the GitHub Model Context Protocol (MCP) server.

The GitHub MCP server is available to all GitHub users regardless of plan type. However, specific tools within the MCP server inherit the same access requirements as their corresponding GitHub features. If a feature requires a paid GitHub or Copilot license, the equivalent MCP tool will require the same subscription. For example, tools that interact with Copilot Cloud Agent require a paid Copilot license.

For the latest information and updates, see the [GitHub MCP server repository](https://github.com/github/github-mcp-server).

<div class="ghd-tool vscode">

## About the GitHub MCP server

The GitHub MCP server is a Model Context Protocol (MCP) server provided and maintained by GitHub. MCP allows you to integrate AI capabilities with other tools and services, enhancing your development experience by providing context-aware AI assistance.

For a full introduction to the GitHub MCP server and an overview of MCP, see [About Model Context Protocol (MCP)](/en/copilot/concepts/about-mcp).

## Prerequisites

* A GitHub account.
* Visual Studio Code.
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Setting up the GitHub MCP server in Visual Studio Code

The GitHub MCP server in Visual Studio Code can be configured remotely or locally. The remote GitHub MCP server is hosted by GitHub and is the recommended option for most users. The local GitHub MCP server is hosted on your machine and is recommended for users who want to customize their setup or have specific security requirements.

The steps below describe remote configuration through the MCP Registry view in Visual Studio Code's extensions panel. This view is backed by the GitHub MCP Registry. See [GitHub MCP Registry](https://github.com/mcp).

For information on manually configuring the remote or local GitHub MCP server, see the [GitHub MCP server documentation](https://github.com/mcp/io.github.github/github-mcp-server?ref_product=copilot\&ref_type=engagement\&ref_style=text).

1. In Visual Studio Code, open the extensions panel by clicking the extensions icon in the sidebar or pressing <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd> (Windows/Linux) / <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd> (Mac).
2. In the extensions search bar, type `@mcp github` to search the MCP server gallery.
3. Select the GitHub MCP server from the search results. On the details page, click **Install**.
4. When prompted, confirm that you trust the server to start it.
5. To verify that the GitHub MCP server is configured correctly, open the command palette by pressing <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows/Linux) / <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac).
6. Type and select **MCP: List Servers**. You should see the GitHub MCP server listed as a configured server.

</div>

<div class="ghd-tool visualstudio">

## About the GitHub MCP server

The GitHub MCP server is a Model Context Protocol (MCP) server provided and maintained by GitHub. MCP allows you to integrate AI capabilities with other tools and services, enhancing your development experience by providing context-aware AI assistance.

For a full introduction to the GitHub MCP server and an overview of MCP, see [About Model Context Protocol (MCP)](/en/copilot/concepts/about-mcp).

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Visual Studio version 17.14 or later**. For more information on installing Visual Studio, see the [Visual Studio downloads page](https://visualstudio.microsoft.com/downloads/).
* **Sign in to GitHub from Visual Studio**.
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Setting up the GitHub MCP server in Visual Studio

The instructions below guide you through setting up the GitHub MCP server in Visual Studio. Other MCP-compatible editors may have similar steps, but the exact process may vary.

The remote GitHub MCP server uses one-click OAuth authentication by default, but you can also manually configure it to use a personal access token (PAT) for authentication. If you use OAuth, the MCP server can only access the scopes you approve during sign-in. In organization-owned contexts, access may also be limited by admin policies that control which scopes and apps are permitted. If you use a PAT, the MCP server will have access to the scopes granted by the PAT, which is also subject to any PAT restrictions configured by the organization.

> \[!NOTE]
> If you are an Enterprise Managed User, then PAT is disabled by default, unless enabled by an enterprise administrator. If PAT is disabled, you won't be able to use PAT authentication. If you have OAuth access policy restrictions, you will need the OAuth App for each client (MCP host application) to be enabled (except Visual Studio Code and Visual Studio).

For information on setting up the GitHub MCP server locally, see the [GitHub MCP server documentation](https://github.com/mcp/io.github.github/github-mcp-server?ref_product=copilot\&ref_type=engagement\&ref_style=text).

### Remote MCP server configuration with OAuth

You do not need to create a PAT or install any additional software to use the remote GitHub MCP server with OAuth. You can set it up directly in Visual Studio.

1. In the Visual Studio menu bar, click **View**, then click **GitHub Copilot Chat**.

2. At the bottom of the chat panel, select **Agent** from the mode dropdown.

3. In the Copilot Chat window, click the tools icon, then click the plus icon in the tool picker window.

4. In the "Configure MCP server" pop-up window, fill out the fields.
   1. For "Server ID", type `github`.
   2. For "Type", select "HTTP/SSE" from the dropdown.
   3. For "URL", type `https://api.githubcopilot.com/mcp/`.

5. Click **Save**. The configuration in the `mcp.json` file should look like this:

   ```json copy
       {
         "servers": {
           "github": {
             "url": "https://api.githubcopilot.com/mcp/"
           }
         }
       }
   ```

6. In the `mcp.json` file, click **Auth** from the CodeLens above the server to authenticate to the server. A pop-up will come up allowing you to authenticate with your GitHub account.

### Remote MCP server configuration with PAT

To configure the remote GitHub MCP server with a PAT, ensure you have created a PAT with the necessary scopes for the access you want to grant to the MCP server. For more information, see [Managing your personal access tokens](/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

1. In the Visual Studio menu bar, click **View**, then click **GitHub Copilot Chat**.
2. At the bottom of the chat panel, select **Agent** from the mode dropdown.
3. In the Copilot Chat window, click the tools icon, then click the plus icon in the tool picker window.
4. In the "Configure MCP server" pop-up window, fill out the fields.
   1. For "Server ID", type `github`.
   2. For "Type", select "HTTP/SSE" from the dropdown.
   3. For "URL", type `https://api.githubcopilot.com/mcp/`.
   4. Add a new header under "Headers", called "Authorization" and set to the value `Bearer YOUR_GITHUB_PAT`, replacing "YOUR\_GITHUB\_PAT" with your PAT.
5. Click **Save**. The configuration in the `mcp.json` file should look like this:

   ```json copy
     {
       "servers": {
           "github": {
               "url": "https://api.githubcopilot.com/mcp/",
               "requestInit": {
                   "headers": {
                       "Authorization": "Bearer YOUR_GITHUB_PAT"
                   }
               }
           }
       }
     }
   ```

For more information on configuring MCP servers in Visual Studio, see [Use MCP servers in Visual Studio (Preview)](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=vs-2022) in the Visual Studio documentation.

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
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Setting up the GitHub MCP server in JetBrains IDEs

The instructions below guide you through setting up the GitHub MCP server in JetBrains IDEs. Other MCP-compatible editors may have similar steps, but the exact process may vary.

The remote GitHub MCP server uses one-click OAuth authentication by default, but you can also manually configure it to use a personal access token (PAT) for authentication. If you use OAuth, the MCP server can only access the scopes you approve during sign-in. In organization-owned contexts, access may also be limited by admin policies that control which scopes and apps are permitted. If you use a PAT, the MCP server will have access to the scopes granted by the PAT, which is also subject to any PAT restrictions configured by the organization.

> \[!NOTE]
> If you are an Enterprise Managed User, then PAT is disabled by default, unless enabled by an enterprise administrator. If PAT is disabled, you won't be able to use PAT authentication. If you have OAuth access policy restrictions, you will need the OAuth App for each client (MCP host application) to be enabled (except Visual Studio Code and Visual Studio).

For information on setting up the GitHub MCP server locally, see the [GitHub MCP server documentation](https://github.com/mcp/io.github.github/github-mcp-server?ref_product=copilot\&ref_type=engagement\&ref_style=text).

### Remote MCP server configuration with OAuth

You do not need to create a PAT or install any additional software to use the remote GitHub MCP server with OAuth. You can set it up directly in JetBrains IDEs.

1. In the lower right corner, click **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>**.

2. From the menu, select "Open Chat", make sure you are in Agent mode, then click the tools icon (called "Configure your MCP server") at the bottom of the chat window.

3. Click **Add MCP Tools**.

4. In the `mcp.json` file, add the following configuration:

   ```json copy
   {
     "servers": {
         "github": {
             "type": "http",
             "url": "https://api.githubcopilot.com/mcp/"
         }
     }
   }
   ```

5. In the "GitHub Copilot" popup that says the "MCP server definition wants to authenticate to GitHub, click **Allow**.

6. If you have not yet authorized the GitHub Copilot plugin, in the browser popup, click **Continue** next to your personal account.

### Remote MCP server configuration with PAT

To configure the remote GitHub MCP server with a PAT, ensure you have created a PAT with the necessary scopes for the access you want to grant to the MCP server. For more information, see [Managing your personal access tokens](/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

1. In the lower right corner, click **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>**.
2. From the menu, select "Open Chat", make sure you are in Agent mode, then click the tools icon (called "Configure your MCP server") at the bottom of the chat window.
3. Click **Add MCP Tools**.
4. In the `mcp.json` file, add the following configuration, replacing `YOUR_GITHUB_PAT` with the PAT you created:

```json copy
  {
    "servers": {
        "github": {
            "url": "https://api.githubcopilot.com/mcp/",
            "requestInit": {
                "headers": {
                    "Authorization": "Bearer YOUR_GITHUB_PAT"
                }
            }
        }
    }
  }
```

</div>

<div class="ghd-tool xcode">

## About the GitHub MCP server

The GitHub MCP server is a Model Context Protocol (MCP) server provided and maintained by GitHub. MCP allows you to integrate AI capabilities with other tools and services, enhancing your development experience by providing context-aware AI assistance.

For a full introduction to the GitHub MCP server and an overview of MCP, see [About Model Context Protocol (MCP)](/en/copilot/concepts/about-mcp).

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **GitHub Copilot for Xcode extension**. See [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment).
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.

## Setting up the GitHub MCP server in Xcode

The instructions below guide you through setting up the GitHub MCP server in Xcode. Other MCP-compatible editors may have similar steps, but the exact process may vary.

The remote GitHub MCP server uses one-click OAuth authentication by default, but you can also manually configure it to use a personal access token (PAT) for authentication. If you use OAuth, the MCP server can only access the scopes you approve during sign-in. In organization-owned contexts, access may also be limited by admin policies that control which scopes and apps are permitted. If you use a PAT, the MCP server will have access to the scopes granted by the PAT, which is also subject to any PAT restrictions configured by the organization.

> \[!NOTE]
> If you are an Enterprise Managed User, then PAT is disabled by default, unless enabled by an enterprise administrator. If PAT is disabled, you won't be able to use PAT authentication. If you have OAuth access policy restrictions, you will need the OAuth App for each client (MCP host application) to be enabled (except Visual Studio Code and Visual Studio).

For information on setting up the GitHub MCP server locally, see the [GitHub MCP server documentation](https://github.com/mcp/io.github.github/github-mcp-server?ref_product=copilot\&ref_type=engagement\&ref_style=text).

### Remote MCP server configuration with OAuth

You do not need to create a PAT or install any additional software to use the remote GitHub MCP server with OAuth. You can set it up directly in Xcode.

1. Open the GitHub Copilot for Xcode extension and go to "Settings".
   * Alternatively, in an active Xcode workspace, you can find the settings by clicking **Editor** in the menu bar, selecting **GitHub Copilot**, then clicking **Open GitHub Copilot for Xcode Settings**.

2. Select the **MCP** tab, then click **Edit Config**.

3. Add the following configuration:

   ```json copy
   {
     "servers": {
         "github": {
             "type": "http",
             "url": "https://api.githubcopilot.com/mcp/"
         }
     }
   }
   ```

4. In the "GitHub Copilot" popup that says the "MCP Server Definition wants to authenticate to GitHub", click **Continue**.

5. If you have not yet authorized the GitHub Copilot plugin, in the browser popup, click **Continue** next to your personal account.

### Remote MCP server configuration with PAT

To configure the remote GitHub MCP server with a PAT, ensure you have created a PAT with the necessary scopes for the access you want to grant to the MCP server. For more information, see [Managing your personal access tokens](/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

1. Open the GitHub Copilot for Xcode extension and go to "Settings".
   * Alternatively, in an active Xcode workspace, you can find the settings by clicking **Editor** in the menu bar, selecting **GitHub Copilot**, then clicking **Open GitHub Copilot for Xcode Settings**.
2. Select the **MCP** tab, then click **Edit Config**.
3. Add the following configuration, replacing `YOUR_GITHUB_PAT` with the PAT you created:

```json copy
  {
    "servers": {
        "github": {
            "url": "https://api.githubcopilot.com/mcp/",
            "requestInit": {
                "headers": {
                    "Authorization": "Bearer YOUR_GITHUB_PAT"
                }
            }
        }
    }
  }
```

</div>

<div class="ghd-tool eclipse">

## About the GitHub MCP server

The GitHub MCP server is a Model Context Protocol (MCP) server provided and maintained by GitHub. MCP allows you to integrate AI capabilities with other tools and services, enhancing your development experience by providing context-aware AI assistance.

For a full introduction to the GitHub MCP server and an overview of MCP, see [About Model Context Protocol (MCP)](/en/copilot/concepts/about-mcp).

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Compatible version of Eclipse**. To use the GitHub Copilot extension, you must have Eclipse version 2024-09 or above. See the [Eclipse download page](https://www.eclipse.org/downloads/packages/).
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.
* **Latest version of the GitHub Copilot extension**. Download this from the [Eclipse Marketplace](https://aka.ms/copiloteclipse?ref_product=copilot\&ref_type=engagement\&ref_style=text). For more information, see [Installing the GitHub Copilot extension in your environment](/en/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment?tool=eclipse).
* **Sign in to GitHub from Eclipse**.

## Setting up the GitHub MCP server in Eclipse

The instructions below guide you through setting up the GitHub MCP server in Eclipse. Other MCP-compatible editors may have similar steps, but the exact process may vary.

The remote GitHub MCP server uses one-click OAuth authentication by default, but you can also manually configure it to use a personal access token (PAT) for authentication. If you use OAuth, the MCP server can only access the scopes you approve during sign-in. In organization-owned contexts, access may also be limited by admin policies that control which scopes and apps are permitted. If you use a PAT, the MCP server will have access to the scopes granted by the PAT, which is also subject to any PAT restrictions configured by the organization.

> \[!NOTE]
> If you are an Enterprise Managed User, then PAT is disabled by default, unless enabled by an enterprise administrator. If PAT is disabled, you won't be able to use PAT authentication. If you have OAuth access policy restrictions, you will need the OAuth App for each client (MCP host application) to be enabled (except Visual Studio Code and Visual Studio).

For information on setting up the GitHub MCP server locally, see the [GitHub MCP server repository](https://github.com/github/github-mcp-server#usage-in-other-mcp-hosts-1).

### Remote MCP server configuration with OAuth

You do not need to create a PAT or install any additional software to use the remote GitHub MCP server with OAuth. You can set it up directly in Eclipse.

1. Click the Copilot icon (<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>) in the status bar at the bottom of Eclipse.

2. From the menu, select **Open Chat** and, in the chat window, click the "Configure Tools..." icon.
   * Alternatively, you can select **Edit preferences**, then in the left pane, expand GitHub Copilot and click **MCP**.

3. Add the following configuration under "Server Configurations":

   ```json copy
   {
     "servers": {
         "github": {
             "type": "http",
             "url": "https://api.githubcopilot.com/mcp/"
         }
     }
   }
   ```

4. Click **Apply**.

5. In the "GitHub Copilot" popup that says the "MCP Server Definition wants to authenticate to GitHub", click **OK**.

6. If you have not yet authorized the GitHub Copilot plugin, in the browser popup, click **Continue** next to your personal account.

### Remote MCP server configuration with PAT

To configure the remote GitHub MCP server with a PAT, ensure you have created a PAT with the necessary scopes for the access you want to grant to the MCP server. For more information, see [Managing your personal access tokens](/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

1. Click the Copilot icon (<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>) in the status bar at the bottom of Eclipse.
2. From the menu, select **Open Chat** and, in the chat window, click the "Configure Tools..." icon.
   * Alternatively, you can select **Edit preferences**, then in the left pane, expand GitHub Copilot and click **MCP**.
3. Add the following configuration under "Server Configurations", replacing `YOUR_GITHUB_PAT` with the PAT you created:

```json copy
  {
    "servers": {
        "github": {
            "url": "https://api.githubcopilot.com/mcp/",
            "requestInit": {
                "headers": {
                    "Authorization": "Bearer YOUR_GITHUB_PAT"
                }
            }
        }
    }
  }
```

</div>

## Enterprise configuration

If you are using GitHub Enterprise Server or GitHub Enterprise Cloud with data residency, additional configuration is required. For more information, see [Configuring the GitHub MCP Server for GitHub Enterprise](/en/copilot/how-tos/provide-context/use-mcp/enterprise-configuration).

## Next steps

* To learn how to use the GitHub MCP server in Visual Studio Code, see [Using the GitHub MCP Server in your IDE](/en/copilot/how-tos/provide-context/use-mcp/use-the-github-mcp-server).
* For information on configuring individual toolsets with read-only or read/write access, see [Configuring toolsets for the GitHub MCP Server](/en/copilot/how-tos/provide-context/use-mcp/configure-toolsets).