# Installing the GitHub Copilot extension in your environment

To use Copilot in your preferred coding environment, follow the steps for your chosen IDE.

## Prerequisite

To use Copilot in your IDE, you need either limited access through Copilot Free or a paid Copilot plan for full access. For more information about how to get access and choose the right plan, see [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

<div class="ghd-tool azure_data_studio">

## About the GitHub Copilot extension in Azure Data Studio

Installing the GitHub Copilot extension in Azure Data Studio allows you to receive coding suggestions from Copilot as you type.

To see instructions for other popular coding environments, use the tool switcher at the top of the page.

## Installing the GitHub Copilot extension in Azure Data Studio

1. Make sure you have access to GitHub Copilot. For information, see [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

2. Make sure you have a compatible version of Azure Data Studio. To use GitHub Copilot in Azure Data Studio, you must have Azure Data Studio version 1.44.0 or later installed. See the [Azure Data Studio download page](https://docs.microsoft.com/sql/azure-data-studio/download-azure-data-studio) in the Azure Data Studio documentation.

3. Install the GitHub Copilot extension in Azure Data Studio. See [Install the GitHub Copilot extension](https://learn.microsoft.com/en-us/azure-data-studio/extensions/github-copilot-extension-overview#install-the-github-copilot-extension) in the Microsoft documentation.

4. If a popup window in Azure Data Studio prompts you to sign in to use GitHub Copilot, click **Sign in to GitHub** and follow the instructions on screen.

   * If you have previously authorized Azure Data Studio for your account on GitHub, GitHub Copilot will be automatically authorized.
   * If you don't get the prompt to authorize, you can view notifications by clicking the bell icon in the bottom panel of the Azure Data Studio window.

5. If you are following the authorization steps, in your browser, GitHub will request the necessary permissions for GitHub Copilot. To approve these permissions, click **Authorize Azure Data Studio**.

</div>

<div class="ghd-tool jetbrains">

## About the GitHub Copilot extension in JetBrains IDEs

Installing the GitHub Copilot extension in JetBrains IDEs allows you to chat with Copilot in your IDE and receive coding suggestions from Copilot as you type.

To see instructions for other popular coding environments, use the tool switcher at the top of the page.

### Version compatibility

For information about version compatibility of the GitHub Copilot extension in JetBrains IDEs, see [GitHub Copilot Versions](https://plugins.jetbrains.com/plugin/17718-github-copilot/versions) in the JetBrains Marketplace.

### About the license for the GitHub Copilot plugin in JetBrains IDEs

GitHub, Inc. is the licensor of the JetBrains plugin. The end user license agreement for this plugin is the [GitHub Terms for Additional Products and Features](/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot) and use of this plugin is subject to those terms. JetBrains has no responsibility or liability in connection with the plugin or such agreement. By using the plugin, you agree to the foregoing terms.

## Installing the GitHub Copilot plugin in your JetBrains IDE

The following procedure will guide you through installation of the GitHub Copilot plugin in IntelliJ IDEA. Steps to install the plugin in another supported IDE may differ.

1. Make sure you have access to GitHub Copilot. For information, see [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

2. Make sure you have a JetBrains IDE that is compatible with GitHub Copilot. GitHub Copilot is compatible with the following IDEs:

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

3. Install the GitHub Copilot plugin for JetBrains. See [GitHub Copilot plugin](https://plugins.jetbrains.com/plugin/17718-github-copilot?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the JetBrains Marketplace.

4. After GitHub Copilot is installed, click **Restart IDE**.

5. After your JetBrains IDE has restarted, click the **Tools** menu. Click **GitHub Copilot**, then click **Login to GitHub**.

   > \[!NOTE] If you're using a Copilot plan for a managed user account on GHE.com, you'll need to update some settings before you sign in. See [Using GitHub Copilot with an account on GHE.com](/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom?tool=jetbrains#authenticating-from-jetbrains-ides).

   ![Screenshot of the expanded "Tools" menu and "GitHub Copilot" sub-menu. The "Login to GitHub" option is highlighted in blue.](/assets/images/help/copilot/jetbrains-tools-menu.png)

6. In the "Sign in to GitHub" dialog box, to copy the device code and open the device activation window, click **Copy and Open**.

   ![Screenshot of the "Sign in to GitHub" dialog. A device code is displayed above a button labeled "Copy and Open".](/assets/images/help/copilot/device-code-copy-and-open.png)

7. A device activation window will open in your browser. Paste the device code, then click **Continue**.

8. GitHub will request the necessary permissions for GitHub Copilot. To approve these permissions, click **Authorize GitHub Copilot Plugin**.

9. After the permissions have been approved, your JetBrains IDE will show a confirmation. To begin using GitHub Copilot, click **OK**.

</div>

<div class="ghd-tool vimneovim">

## About the GitHub Copilot extension in Vim/Neovim

Installing the GitHub Copilot extension in Vim/Neovim allows you to receive coding suggestions from Copilot as you type.

To see instructions for other popular coding environments, use the tool switcher at the top of the page.

## Installing the GitHub Copilot extension in Vim/Neovim

GitHub recommends that you install the GitHub Copilot plugin with Vim/Neovim's built-in plugin manager. Alternatively, you can use a plugin manager of your choice to install `github/copilot.vim`. For more information, see the [copilot.vim repository](https://github.com/github/copilot.vim).

1. Make sure you have access to GitHub Copilot. For information, see [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

2. Make sure you have a compatible version of Vim/Neovim installed. To use GitHub Copilot in Vim/Neovim you must have Vim version 9.0.0185 / Neovim version 0.6 or above and Node.js version 18 or above. See the [Vim](https://vimhelp.org/) / [Neovim documentation](https://neovim.io/doc/) and the [Node.js website](https://nodejs.org/en/).

3. Install GitHub Copilot using the built-in plugin manager:

   * For **Neovim on macOS or Linux**, run the following command in the terminal.

     ```shell copy
     git clone https://github.com/github/copilot.vim \
     ~/.config/nvim/pack/github/start/copilot.vim
     ```

   * For **Neovim on Windows**, run the following command in Git Bash:

     ```shell copy
     git clone https://github.com/github/copilot.vim.git ^
     %USERPROFILE%/AppData/Local/nvim/pack/github/start/copilot.vim
     ```

   * For **Vim on macOS or Linux**, run the following command in the terminal.

     ```shell copy
     git clone https://github.com/github/copilot.vim \
     ~/.vim/pack/github/start/copilot.vim
     ```

   * For **Vim on Windows**, run the following command in Git Bash:

     ```shell copy
     git clone https://github.com/github/copilot.vim.git ^
     %USERPROFILE%/vimfiles/pack/github/start/copilot.vim
     ```

4. To configure GitHub Copilot, open Vim/Neovim and enter the following command.

   ```shell copy
   :Copilot setup
   ```

5. Enable GitHub Copilot in your Vim/Neovim configuration, or with the Vim/Neovim command.

   ```shell copy
   :Copilot enable
   ```

</div>

<div class="ghd-tool visualstudio">

## About the GitHub Copilot extension in Visual Studio

Installing the GitHub Copilot extension in Visual Studio allows you to receive coding suggestions from Copilot as you type.

To see instructions for other popular coding environments, use the tool switcher at the top of the page.

### Version compatibility

Starting from Visual Studio 2022 Version 17.10, the unified Copilot and GitHub Copilot Chat extension is included by default as a built-in component. For more information, see [Install GitHub Copilot in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/visual-studio-github-copilot-install-and-states?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the Microsoft documentation.

The following instructions are for versions 2022 17.8 and 2022 17.9 of Visual Studio for Windows.

## Installing the GitHub Copilot extension in Visual Studio

1. Make sure you have access to GitHub Copilot. For information, see [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

2. Make sure you have a compatible version of Visual Studio installed. To use GitHub Copilot in Visual Studio, you must have version 2022 17.8 or later of Visual Studio for Windows installed. For more information, see [Install Visual Studio](https://learn.microsoft.com/en-us/visualstudio/install/install-visual-studio?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the Microsoft documentation.

3. Install the GitHub Copilot extension in Visual Studio. See [Install GitHub Copilot in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/visual-studio-github-copilot-install-and-states?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the Microsoft documentation.

4. After installing the GitHub Copilot extension, to enable GitHub Copilot, ensure you have added your GitHub account to Visual Studio. For more information, see [Add your GitHub accounts to your Visual Studio keychain](https://learn.microsoft.com/en-us/visualstudio/ide/work-with-github-accounts?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the Microsoft documentation.

   > \[!NOTE] If you're using a Copilot plan for a managed user account on GHE.com, you'll need to update some settings before you sign in. See [Using GitHub Copilot with an account on GHE.com](/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom?tool=visualstudio#authenticating-from-visual-studio).

</div>

<div class="ghd-tool vscode">

## About GitHub Copilot in Visual Studio Code

GitHub Copilot in Visual Studio Code allows you to receive coding suggestions from Copilot as you type. You also automatically get access to GitHub Copilot Chat, which allows you to chat with Copilot.

To see instructions for other popular coding environments, use the tool switcher at the top of the page.

## Setting up GitHub Copilot in Visual Studio Code

When you set up GitHub Copilot in Visual Studio Code for the first time, the required extensions are installed automatically. You don't need to download or install them manually.

For detailed instructions, see [Set up GitHub Copilot in Visual Studio Code](https://code.visualstudio.com/docs/copilot/setup?ref_product=copilot\&ref_type=engagement\&ref_style=text#_set-up-copilot-in-vs-code) in the Visual Studio Code documentation.

> \[!NOTE] If you're using a Copilot plan for a managed user account on GHE.com, you'll need to update some settings before you sign in. See [Using GitHub Copilot with an account on GHE.com](/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom?tool=vscode#authenticating-from-vs-code).

</div>

<div class="ghd-tool xcode">

## About the GitHub Copilot extension for Xcode

Installing the GitHub Copilot extension for Xcode allows you to receive coding suggestions from Copilot as you type.

To see instructions for other popular coding environments, use the tool switcher at the top of the page.

### Version compatibility

To use GitHub Copilot for Xcode you must have Xcode version 8.0 or above and macOS Monterey (12.0) or above installed. See [Xcode](https://developer.apple.com/xcode/) on the Apple Developer site.

## Installing the GitHub Copilot extension for Xcode

1. Make sure you have access to GitHub Copilot. For information, see [Get started with GitHub Copilot](/en/copilot/about-github-copilot#getting-access-to-github-copilot).
2. Make sure you have a compatible version of Xcode installed. To use GitHub Copilot for Xcode you must have Xcode version 8.0 or above and macOS Monterey (12.0) or above. See [Xcode](https://developer.apple.com/xcode/) on the Apple Developer site.
3. Download the latest version of the GitHub Copilot for Xcode extension from the [`github/CopilotForXcode` repository](https://github.com/github/CopilotForXcode/releases/latest/download/GitHubCopilotForXcode.dmg?ref_product=copilot\&ref_type=engagement\&ref_style=text) and install it. A background item will be added for the application to be able to start itself when Xcode starts.
4. Open the **GitHub Copilot for Xcode** application from the Applications folder and step through the on-screen instructions for setting up the extension.

## Granting required permissions

Two permissions are required to be able to use the extension: "Accessibility" and "Xcode Source Editor Extension". You will be prompted to enable the "Accessibility" permission when you first start the extension.

The "Xcode Source Editor Extension" permission needs to be enabled manually.

1. Open the GitHub Copilot for Xcode application.
2. Click **Extension Permission**.
3. Enable GitHub Copilot and click **Done**.

After granting the required permissions, restart Xcode. You will see a new item in the "Editor" menu called "GitHub Copilot".

## Signing in to GitHub Copilot

Before you can use the GitHub Copilot extension for Xcode, you need to authorize the extension to access your GitHub account.

> \[!NOTE] If you're using a Copilot plan for a managed user account on GHE.com, you'll need to update some settings before you sign in. See [Using GitHub Copilot with an account on GHE.com](/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom?tool=xcode#authenticating-from-xcode).

1. Open the GitHub Copilot for Xcode application.
2. Click **Login to GitHub** and follow the prompts to authorize the extension.

</div>

<div class="ghd-tool eclipse">

## About GitHub Copilot in Eclipse

Installing GitHub Copilot in Eclipse allows you to receive coding suggestions from Copilot as you type. You also automatically get access to GitHub Copilot Chat, which allows you to chat with Copilot.

To see instructions for other popular coding environments, use the tool switcher at the top of the page.

### Version compatibility

To use the GitHub Copilot extension, you must have Eclipse version 2024-03 or above. See the [Eclipse download page](https://www.eclipse.org/downloads/packages/).

## Installing GitHub Copilot in Eclipse

1. Download and install the latest version of GitHub Copilot from the [Eclipse Marketplace](https://aka.ms/copiloteclipse?ref_product=copilot\&ref_type=engagement\&ref_style=text) or directly via the [Eclipse Update Site](https://azuredownloads-g3ahgwb5b8bkbxhd.b01.azurefd.net/github-copilot/?ref_product=copilot\&ref_type=engagement\&ref_style=text). For more information, see [Installing New Software](https://help.eclipse.org/latest/topic/org.eclipse.platform.doc.user/tasks/tasks-124.htm) in the Eclipse documentation.

2. After the extension is installed, restart Eclipse to apply the changes.

3. In the bottom right corner of the Eclipse workbench, click **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg> Copilot**, then click **Sign In to GitHub**.

4. In the "Sign In to GitHub" dialog box, to copy the device code and open the device activation window, click **Copy Code and Open**.

5. A device activation window will open in your browser. Paste the device code, then click **Continue**.

6. GitHub will request the necessary permissions for GitHub Copilot. To approve these permissions, click **Authorize GitHub Copilot Plugin**.

7. After the permissions have been approved, Eclipse will show a confirmation. To begin using GitHub Copilot, click **OK**.

</div>

## Next steps

* **Get started with Copilot** - Learn how to use Copilot in your preferred coding environment. See [Getting code suggestions in your IDE with GitHub Copilot](/en/copilot/using-github-copilot/using-github-copilot-code-suggestions-in-your-editor).