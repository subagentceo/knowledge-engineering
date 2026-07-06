# Extension Marketplace

The features that Visual Studio Code includes out-of-the-box are just the start. VS Code extensions let you add languages, debuggers, and tools to your installation to support your development workflow. VS Code's rich extensibility model lets extension authors plug directly into the VS Code UI and contribute functionality through the same APIs used by VS Code. This article explains how to find, install, and manage VS Code extensions from the Visual Studio Code Marketplace.

## Browse for extensions

You can browse and install extensions from within VS Code. Bring up the Extensions view by clicking on the Extensions icon in the **Activity Bar** on the side of VS Code or the **View: Extensions** command (⇧⌘X (Windows, Linux Ctrl+Shift+X)).

![Extensions view icon](/assets/docs/configure/extensions/extension-marketplace/extensions-view-icon.png)

This will show you a list of the most popular VS Code extensions on the VS Code Marketplace.

![popular extensions](/assets/docs/configure/extensions/extension-marketplace/extensions-popular.png)

Each extension in the list includes a brief description, the publisher, the download count, and a five star rating. You can select the extension item to display the extension's details page where you can learn more.

Note

If your computer's Internet access goes through a proxy server, you will need to configure the proxy server. See Proxy server support for details.

## Install an extension

To install an extension, select the **Install** button. Once the installation is complete, the **Install** button will change to the **Manage** gear button.

Important

Extensions have the same permissions as VS Code itself. As of VS Code release 1.97, when you first install an extension from a third-party publisher, VS Code shows a dialog prompting you to confirm that you trust the extension publisher. Get more information about extension runtime security and how to protect yourself from malicious extensions.

If you want to install a specific version of an extension, right-click the extension and select **Install Another Version**. You can then select a version from the available list.

When Settings Sync is enabled, you can share your VS Code configurations, such as extensions, across your machines. To install an extension and not sync it across your machines, right-click the extension and select **Install (Do not Sync)**.

### Find and install an extension

For example, let's install the popular TODO Highlight extension. This extension highlights text like 'TODO:' and 'FIXME:' in your source code so you can quickly find undone sections.

![TODO Highlight extension highlighting in the editor](/assets/docs/configure/extensions/extension-marketplace/todo-highlighting.png)

In the Extensions view (⇧⌘X (Windows, Linux Ctrl+Shift+X)), type 'todo' in the search box to filter the Marketplace offerings to extensions with 'todo' in the title or metadata. You should see the **TODO Highlight** extension in the list.

![Search for todo in the Extensions view](/assets/docs/configure/extensions/extension-marketplace/search-for-todo-extension.png)

An extension is uniquely identified by its publisher and extension IDs. If you select the **TODO Highlight** extension, you will see the Extension details page, where you can find the extension ID, in this case, `wayou.vscode-todo-highlight`. Knowing the extension ID can be helpful if there are several similarly named extensions.

![TODO Highlight extension details with extension ID highlighted](/assets/docs/configure/extensions/extension-marketplace/todo-highlight-details.png)

Select the **Install** button, and VS Code will download and install the extension from the Marketplace. When the installation is complete, the **Install** button will be replaced with a **Manage** gear button.

![Manage gear button](/assets/docs/configure/extensions/extension-marketplace/manage-button.png)

To see the TODO Highlight extension in action, open any source code file and add the text 'TODO:' and you will see the text highlighted.

The TODO Highlight extension contributes the commands, **TODO-Highlight: List highlighted annotations** and **TODO-Highlight: Toggle highlight**, that you can find in the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)). The **TODO-Highlight: Toggle highlight** command lets you quickly disable or enable highlighting.

![TODO Highlight commands in the Command Palette](/assets/docs/configure/extensions/extension-marketplace/todo-highlight-commands.png)

The extension also provides settings for tuning its behavior, which you can find in the Settings editor (⌘, (Windows, Linux Ctrl+,)). For example, you might want the text search to be case insensitive and you can uncheck the **Todohighlight: Is Case Sensitive** setting.

![TODO Highlight settings in the Settings editor](/assets/docs/configure/extensions/extension-marketplace/todo-highlight-settings.png)

If an extension doesn't provide the functionality you want, you can always **Uninstall** the extension from the **Manage** button context menu.

![Uninstall the TODO Highlight extension](/assets/docs/configure/extensions/extension-marketplace/todo-highlight-uninstall.png)

This has been just one example of how to install and use an extension. The VS Code Marketplace has thousands of extensions supporting hundreds of programming languages and tasks. Everything from full featured language support for Java, Python, Go, and C++ to simple extensions that create GUIDs, change the color theme, or add virtual pets to the editor.

### Extension details

On the extension details page, you can read the extension's README and review the extension's:

*   **Feature Contributions** - The extension's additions to VS Code such as settings, commands and keyboard shortcuts, language grammars, debugger, etc.
*   **Changelog** - The extension repository CHANGELOG if available.
*   **Dependencies** - Lists if the extension depends on any other extensions.

![extension contributions](/assets/docs/configure/extensions/extension-marketplace/extension-contributions.png)

If an extension is an Extension Pack, the **Extension Pack** section will display which extensions will be installed when you install the pack. Extension Packs bundle separate extensions together so they can be easily installed at one time.

![Azure Tools extension pack](/assets/docs/configure/extensions/extension-marketplace/extension-pack.png)

### Extensions view filter and commands

You can filter the Extensions view with the **Filter Extensions** context menu.

![Extensions view filter context menu](/assets/docs/configure/extensions/extension-marketplace/extensions-view-filter-menu.png)

There are filters to show:

*   The list of outdated extensions that can be updated
*   The list of currently enabled/disabled extensions
*   The list of recommended extensions based on your workspace
*   The list of globally popular extensions

You can sort the extension list by **Install Count**, **Rating**, **Name**, **Published Date**, or **Updated Date** in either ascending or descending order. You can learn more about extension search filters below.

You can run additional Extensions view commands via the `...` **View and More Actions** button.

![more button](/assets/docs/configure/extensions/extension-marketplace/more-button.png)

Through this context menu you can control extension updates, enable or disable all extensions, and use the Extension Bisect utility to isolate problematic extension behavior.

### Search for an extension

You can clear the Search box at the top of the Extensions view and type in the name of the extension, tool, or programming language you're looking for.

For example, typing 'python' will bring up a list of Python language extensions:

![python extensions](/assets/docs/configure/extensions/extension-marketplace/extensions-python.png)

If you know the exact identifier for an extension you're looking for, you can use the `@id:` prefix, for example `@id:vue.volar`. Additionally, to filter or sort results, you can use the filter and sort commands, detailed below.

### Install a pre-release extension version

An extension publisher may provide a pre-release version of an extension. To install a pre-release version, select the dropdown on the **Install** button and select **Install Pre-Release Version**.

![Install pre-release version](/assets/docs/configure/extensions/extension-marketplace/extensions-install-prerelease.png)

## Manage extensions

VS Code makes it easy to manage your extensions. You can install, disable, update, and uninstall extensions through the Extensions view, the **Command Palette** (commands have the **Extensions:** prefix) or command-line switches.

### List installed extensions

By default, the Extensions view will show the extensions you currently have installed, and all extensions that are recommended for you. You can use the **Extensions: Focus on Installed View** command, available in the **Command Palette** (⇧⌘P (Windows, Linux Ctrl+Shift+P)) or in the **More Actions** (`...`) dropdown menu > **Views** > **Installed**, to clear any text in the search box and show the list of all installed extensions, which includes those that have been disabled.

### Uninstall an extension

To uninstall an extension, select the **Manage** gear button at the right of an extension entry and then choose **Uninstall** from the dropdown menu. This will uninstall the extension and prompt you to restart the extension host (**Restart Extensions**).

![uninstall an extension](/assets/docs/configure/extensions/extension-marketplace/uninstall-extension.png)

### Disable an extension

If you don't want to permanently remove an extension, you can instead temporarily disable the extension by clicking the gear button at the right of an extension entry. You can disable an extension globally or just for your current Workspace. You will be prompted to restart the extension host (**Restart Extensions**) after you disable an extension.

If you want to quickly disable all installed extensions, there is a **Disable All Installed Extensions** command in the **Command Palette** and **More Actions** (`...`) dropdown menu.

Extensions remain disabled for all VS Code sessions until you re-enable them.

### Enable an extension

Similarly if you have disabled an extension (it will be in the **Disabled** section of the list and marked _**Disabled**_), you can re-enable it with the **Enable** or **Enable (Workspace)** commands in the dropdown menu.

![enable extension](/assets/docs/configure/extensions/extension-marketplace/enable-extension.png)

There is also an **Enable All Extensions** command in the **More Actions** (`...`) dropdown menu.

### Extension auto-update

VS Code checks for extension updates and installs them automatically. After an update, you are prompted to restart the extension host (**Restart Extensions**).

If you'd rather update your extensions manually, you can disable auto-update with the **Disable Auto Update for Extensions** command or the corresponding action in the Extensions view. You can also configure the extensions.autoUpdate Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG setting. Use the **Enable Auto Update for Extensions** command to re-enable auto update.

When auto-update is enabled, VS Code updates only enabled extensions. Disabled extensions are not updated automatically and update the next time you enable them.

![Screenshot of the Extensions context menu with the Disable Auto Update for Extensions action.](/assets/docs/configure/extensions/extension-marketplace/disable-auto-update-all-extensions-v2.png)

You can also configure auto update for individual extensions by right-clicking on an extension and toggling the **Auto Update** item.

By default, VS Code waits a short time after an update is published before it installs the update automatically. Use the extensions.autoUpdateDelay Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG setting to configure the delay, in hours. The default value is `2` hours. Set the value to `0` to install updates as soon as they are published. This delay only applies when auto-update is `on`. To update an extension immediately, select the **Update** button for the extension, which bypasses the delay.

If you don't want VS Code to even check for updates, you can set the extensions.autoCheckUpdates Open in VS Code Open in VS Code Insiders setting to false.

Note

Administrators can centrally manage the extensions.autoUpdate Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG and extensions.autoUpdateDelay Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG settings with enterprise policies.

### Update an extension manually

If you have extensions auto-update disabled, you can quickly look for extension updates by using the **Show Outdated Extensions** command that uses the `@updates` filter. This will display any available updates for your currently installed extensions.

Select the **Update** button for the outdated extension. The update will be installed, and you'll be prompted to restart the extension host (**Restart Extensions**). You can also update all your outdated extensions at one time with the **Update All Extensions** command.

If you also have automatic checking for updates disabled, you can use the **Check for Extension Updates** command to check which of your extensions can be updated.

## Recommended extensions

You can see a list of recommended extensions using **Show Recommended Extensions**, which sets the `@recommended` filter. Extension recommendations can either be:

*   **Workspace Recommendations** - Recommended by other users of your current workspace.
*   **Other Recommendations** - Recommended based on recently opened files.

See the section below to learn how to contribute recommendations for other users in your project.

### Ignoring recommendations

To dismiss a recommendation, select on the extension item to open the Details page and then select the **Manage** gear button to display the context menu. Select the **Ignore Recommendation** menu item. Ignored recommendations will no longer be recommended to you.

![Ignore extension recommendation](/assets/docs/configure/extensions/extension-marketplace/ignore-recommendation.png)

## Configuring extensions

VS Code extensions may have very different configurations and requirements. Some extensions contribute settings to VS Code, which can be modified in the Settings editor. Other extensions may have their own configuration files. Extensions may also require installation and setup of additional components like compilers, debuggers, and command-line tools. Consult the extension's README (visible in the Extensions view details page) or go to the extension page on the VS Code Marketplace (click on the extension name in the details page). Many extensions are open source and have a link to their repository on their Marketplace page.

## Command line extension management

To make it easier to automate and configure VS Code, it is possible to list, install, and uninstall extensions from the command line. When identifying an extension, provide the full name of the form `publisher.extension`, for example `ms-python.python`.

Example:

```
code --extensions-dir <dir>
    Set the root path for extensions.
code --list-extensions
    List the installed extensions.
code --show-versions
    Show versions of installed extensions, when using --list-extension.
code --install-extension (<extension-id> | <extension-vsix-path>)
    Installs an extension.
code --uninstall-extension (<extension-id>)
    Uninstalls an extension.
code --enable-proposed-api (<extension-id>)
    Enables proposed API features for extensions. Can receive one or more extension IDs to enable individually.
```

You can see the extension ID on the extension details page under the Marketplace Info.

![extension identifier](/assets/docs/configure/extensions/extension-marketplace/extension-identifier.png)

## Extensions view filters

The Extensions view search box supports filters to help you find and manage extensions. You may have seen filters such as `@installed` and `@recommended` if you used the commands **Show Installed Extensions** and **Show Recommended Extensions**. Also, there are filters available to let you sort by popularity or ratings and search by category (for example 'Linters') and tags (for example 'node'). You can see a complete listing of all filters and sort commands by typing `@` in the extensions search box and navigating through the suggestions:

![intellisense on extension search filters](/assets/docs/configure/extensions/extension-marketplace/extension-search-filters.png)

Here are some of the Extensions view filters:

*   `@builtin` - Show extensions that come with VS Code. Grouped by type (Programming Languages, Themes, etc.).
*   `@deprecated` - Show deprecated extensions.
*   `@disabled` - Show disabled installed extensions.
*   `@enabled` - Show enabled installed extensions. Extensions can be individually enabled/disabled.
*   `@featured` - Show featured extensions.
*   `@installed` - Show installed extensions.
*   `@popular` - Show popular extensions.
*   `@recentlyPublished` - Show extensions that were recently published in the Marketplace.
*   `@recommended` - Show recommended extensions. Grouped as Workspace specific or general use.
*   `@updates` - Show outdated installed extensions. A newer version is available on the Marketplace.
*   `@workspaceUnsupported` - Show extensions that are not supported for this workspace.
*   `@category` - Show extensions belonging to specified category. Below are a few of supported categories. For a complete list, type `@category` and follow the options in the suggestion list:
    *   `@category:themes`
    *   `@category:formatters`
    *   `@category:linters`
    *   `@category:snippets`

These filters can be combined as well. For example: Use `@installed @category:themes` to view all installed themes.

If no filter is provided, the Extensions view displays the currently installed and recommended extensions.

### Sorting

You can sort extensions with the `@sort` filter, which can take the following values:

*   `installs` - Sort by Marketplace installation count, in descending order.
*   `name` - Sort alphabetically by extension name.
*   `publishedDate` - Sort by extension published date.
*   `rating` - Sort by Marketplace rating (1-5 stars), in descending order.
*   `updateDate` - Sort by extension last update name.

![sort by install count](/assets/docs/configure/extensions/extension-marketplace/sort-install-count.png)

### Categories and tags

Extensions can set **Categories** and **Tags** describing their features.

![extension categories and tags](/assets/docs/configure/extensions/extension-marketplace/categories-and-tags.png)

You can filter on category and tag by using `category:` and `tag:`.

Supported categories are: `[Azure, Data Science, Debuggers, Education, Extension Packs, Formatters, Keymaps, Language Packs, Linters, Machine Learning, Notebooks, Others, Programming Languages, SCM Providers, Snippets, Testing, Themes, Visualization]`. They can be accessed through IntelliSense in the extensions search box:

![categories debuggers](/assets/docs/configure/extensions/extension-marketplace/extension-search-categories.png)

Note that you must surround the category name in quotes if it is more than one word (for example, `category:"SCM Providers"`).

Tags may contain any string and are not provided by IntelliSense, so review the Marketplace to find helpful tags.

## Install from a VSIX

You can manually install a VS Code extension packaged in a `.vsix` file. Using the **Install from VSIX** command in the Extensions view command dropdown, or the **Extensions: Install from VSIX** command in the **Command Palette**, point to the `.vsix` file.

You can also install using the VS Code `--install-extension` command-line switch providing the path to the `.vsix` file.

```
code --install-extension myextension.vsix
```

You may provide the `--install-extension` multiple times on the command line to install multiple extensions at once.

Note

When you install an extension via VSIX, auto update for that extension is disabled by default.

If you'd like to learn more about packaging and publishing extensions, see our Publishing Extensions article in the Extension API.

## Workspace recommended extensions

A good set of extensions can make working with a particular workspace or programming language more productive and you'd often like to share this list with your team or colleagues. You can create a recommended list of extensions for a workspace with the **Extensions: Configure Recommended Extensions (Workspace Folder)** command.

In a single folder workspace, the command creates an `extensions.json` file located in the workspace `.vscode` folder where you can add a list of extensions identifiers ({publisherName}.{extensionName}).

In a multi-root workspace, the command will open your `.code-workspace` file where you can list extensions under `extensions.recommendations`. You can still add extension recommendations to individual folders in a multi-root workspace by using the **Extensions: Configure Recommended Extensions (Workspace Folder)** command.

An example `extensions.json` could be:

```
{
  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}
```

which recommends a linter extension and a code formatter extension.

An extension is identified using its publisher identifier and extension identifier `publisher.extension`. You can see the name on the extension's detail page. VS Code will provide you with auto-completion for installed extensions inside these files.

![Extension identifier](/assets/docs/configure/extensions/extension-marketplace/extension-identifier.png).

VS Code prompts a user to install the recommended extensions when a workspace is opened for the first time. The user can also review the list with the **Extensions: Show Recommended Extensions** command.

![Show Recommendations](/assets/docs/configure/extensions/extension-marketplace/recommendations.png)

## Next steps

Here are a few topics you may find interesting...

*   Extension API - Start learning about the VS Code extension API.
*   Your First Extension - Try creating a simple Hello World extension.
*   Publishing to the Marketplace - Publish your own extension to the VS Code Marketplace.

## Common questions

### Where are extensions installed?

Extensions are installed in a per user extensions folder. Depending on your platform, the location is in the following folder:

*   **Windows** `%USERPROFILE%\.vscode\extensions`
*   **macOS** `~/.vscode/extensions`
*   **Linux** `~/.vscode/extensions`

You can change the location by launching VS Code with the `--extensions-dir <dir>` command-line option.

Alternatively, you can set the `VSCODE_EXTENSIONS` environment variable to a location where you want to install extensions. This is useful in an enterprise environment where you want to centrally manage where extensions are installed on user machines.

### Whenever I try to install any extension, I get a connect ETIMEDOUT error

You may see this error if your machine is going through a proxy server to access the Internet. See the Proxy server support section in the setup topic for details.

### Can I download an extension directly from the Marketplace?

Some users prefer to download an extension once from the Marketplace and then install it to multiple VS Code instances from a local share. This is useful when there are connectivity concerns or if your development team wants to use a fixed set of extensions.

To download an extension, search for it in the Extensions view, right-click on an extension from the results, and select **Download VSIX** or **Download Specific Version VSIX**.

### Can I stop VS Code from providing extension recommendations?

Yes, if you would prefer to not have VS Code display extension recommendations in the Extensions view or through notifications, you can modify the following settings:

*   extensions.showRecommendationsOnlyOnDemand Open in VS Code Open in VS Code Insiders - Set to true to remove the **RECOMMENDED** section.
*   extensions.ignoreRecommendations Open in VS Code Open in VS Code Insiders - Set to true to silence extension recommendation notifications.

The **Show Recommended Extensions** command is always available if you want to see recommendations.

### Can I trust extensions from the Marketplace?

The Visual Studio Marketplace employs several measures to protect you from malicious extensions and you can also perform various steps to determine if an extension is reliable before installing it.

As of VS Code release 1.97, when you first install an extension from a third-party publisher, VS Code shows a dialog prompting you to confirm that you trust the extension publisher.

Get more information about extension runtime security.

### Can I host extensions internally for my organization?

Yes, see the Private Marketplace for Extensions.

### The extension signature cannot be verified by VS Code

The Visual Studio Marketplace signs all extensions when they are published. VS Code verifies this signature when you install an extension to check the integrity and the source of the extension package.

Important

When you install an extension, you might see the following error message: `Cannot install extension because Visual Studio Code cannot verify the extension signature`. This error can be caused by a variety of reasons and should you encounter this error, exercise caution before deciding to install anyway. Disable extension signature verification with the extensions.verifySignature Open in VS Code Open in VS Code Insiders setting.

#### Package integrity issues

For package integrity issues, it's recommended that you contact the Visual Studio Marketplace team to report the issue. Make sure to include the extension ID. The following list provides error codes related to package integrity issues:

```
PackageIntegrityCheckFailed
SignatureIsInvalid
SignatureManifestIsInvalid
SignatureIntegrityCheckFailed
EntryIsMissing
EntryIsTampered
Untrusted
CertificateRevoked
SignatureIsNotValid
SignatureArchiveHasTooManyEntries
NotSigned
```

#### Other issues

For other issues like an unsupported environment or unknown reasons, it's recommended that you report an issue with VS Code by providing all necessary information and including the shared log: ⇧⌘P (Windows, Linux Ctrl+Shift+P) > **Open View...** > **Shared**.

### My extensions don't synchronize when connected to a remote window

Settings Sync lets you share your Visual Studio Code configurations such as settings, keyboard shortcuts, and installed extensions across your machines so you are always working with your favorite setup.

VS Code does not synchronize your extensions to or from a remote window, such as when you're connected to SSH, a development container (devcontainer), or WSL.

### Can I allow or block specific extensions in my organization?

You can control which extensions can be installed in your organization by configuring the `extensions.allowed` application setting. If the setting is not configured, all extensions are allowed. If the setting is configured, all extensions not listed are blocked from installing.

Get more details about configuring allowed extensions.

02/04/2026