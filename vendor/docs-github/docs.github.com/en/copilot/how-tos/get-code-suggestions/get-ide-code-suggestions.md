# Getting code suggestions in your IDE with GitHub Copilot

Use GitHub Copilot to get code suggestions in your editor.

<style>
.button-container {
    display: flex;
    gap: 10px;
}
</style>

<div class="button-container">
    <a href="https://github.com/copilot?ref_product=copilot&ref_type=trial&ref_style=button&ref_plan=free" target="_blank" class="btn btn-primary mt-3 mr-3 no-underline">
        <span>Get started for free</span> <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-link-external" aria-label="link external icon" role="img"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"></path></svg>
    </a>
    <div class="ghd-tool vscode">
    <a href="vscode://GitHub.Copilot-Chat?ref_product=copilot&ref_type=engagement&ref_style=button" target="_blank" class="btn btn-primary mt-3 mr-3 no-underline">
        <span>Open in Visual Studio Code</span> <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-link-external" aria-label="link external icon" role="img"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"></path></svg>
    </a>
    </div>

</div>

<div class="ghd-tool jetbrains">

## Introduction

This guide demonstrates how to get coding suggestions from GitHub Copilot in a JetBrains IDE. To see instructions for other popular coding environments, use the tool switcher at the top of the page.

The examples in this guide use Java, however other languages will work similarly.

For more information, see [GitHub Copilot code suggestions in your IDE](/en/copilot/concepts/completions/code-suggestions?tool=jetbrains).

## Prerequisites

* **Access to Copilot**. To use GitHub Copilot in JetBrains, you need either limited access through Copilot Free or a paid Copilot plan for full access. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

* **Compatible JetBrains IDE**. To use GitHub Copilot in JetBrains, you must have a compatible JetBrains IDE installed. GitHub Copilot is compatible with the following IDEs:

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

## Getting code suggestions

GitHub Copilot offers coding suggestions as you type. For example, in a Java file, create a class by typing `class Test`.

GitHub Copilot will automatically suggest a class body in grayed text. To accept the suggestion, press <kbd>Tab</kbd>.

You can also describe something you want to do using natural language within a comment, and Copilot will suggest the code to accomplish your goal. For example, type this comment in a Java file:

```java copy
// find all images without alternate text
// and give them a red border
void process () {
```

GitHub Copilot will automatically suggest code. To accept the suggestion, press <kbd>Tab</kbd>.

GitHub Copilot will attempt to match the context and style of your code. You can always edit the suggested code.

> \[!TIP]
> If you receive limited or no suggestions from Copilot, you may have duplication detection enabled. For more information about duplication detection, see [Managing GitHub Copilot policies as an individual subscriber](/en/copilot/configuring-github-copilot/configuring-your-personal-github-copilot-settings-on-githubcom#enabling-or-disabling-suggestions-matching-public-code).

## Showing alternative suggestions

For any given input, GitHub Copilot may offer multiple suggestions. You can select which suggestion to use, or reject all suggestions.

For example, type the following line in a Java file, and press <kbd>Enter</kbd>:

```java copy
private int calculateDaysBetweenDates(Date date1,
```

GitHub Copilot will show you a suggestion.

Now hover over the suggestion to show the GitHub Copilot control for choosing suggestions. To display next or previous suggestions, click the forward or back arrow button in the control.

You can also use keyboard shortcuts to show alternative suggestions:

| OS               | See next suggestion            | See previous suggestion         |
| :--------------- | :----------------------------- | :------------------------------ |
| macOS            | <kbd>Option</kbd>+<kbd>]</kbd> | <kbd>Option</kbd>+<kbd>\[</kbd> |
| Windows or Linux | <kbd>Alt</kbd>+<kbd>]</kbd>    | <kbd>Alt</kbd>+<kbd>\[</kbd>    |

To accept a suggestion, click "Accept" in the Copilot command palette, or press <kbd>Tab</kbd>. To reject all suggestions, press <kbd>Esc</kbd>.

## Showing multiple suggestions in a new tab

If you don't want to use any of the initial suggestions GitHub Copilot offers, you can show multiple suggestions in a new tab.

For example, type the following line in a Java file:

```java copy
private int calculateDaysBetweenDates(Date date1,
```

GitHub Copilot will show you a suggestion.

To open a new tab with multiple additional suggestions, use the following keyboard shortcut, then click **Open GitHub Copilot**:

| OS               | Open multiple suggestions                        |
| :--------------- | :----------------------------------------------- |
| macOS            | <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> |
| Windows or Linux | <kbd>Ctrl</kbd>+<kbd>Enter</kbd>                 |

To accept a suggestion, below the suggestion, click **Accept suggestion NUMBER**. To reject all suggestions, close the tab.

## Accepting partial suggestions

If you don't want to accept an entire suggestion from GitHub Copilot, you can accept the next word or the next line of a suggestion.

For example, type the following line in a Java file:

```java copy
private int calculateDaysBetweenDates(Date date1,
```

GitHub Copilot will show a suggestion in grayed text. The exact suggestion may vary.

Now hover over the suggestion to show the GitHub Copilot control for choosing suggestions. To accept only the next word of the suggestion, click **Accept Word** in the control.

Alternatively, you can use a keyboard shortcut to accept the next word of a suggestion:

| OS               | Accept Next Word                | Accept Next Line                                   |
| :--------------- | :------------------------------ | :------------------------------------------------- |
| macOS            | <kbd>Command</kbd>+<kbd>→</kbd> | <kbd>Command</kbd>+<kbd>Control</kbd>+<kbd>→</kbd> |
| Windows or Linux | <kbd>Control</kbd>+<kbd>→</kbd> | <kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>→</kbd>     |

If you want to accept the next line of a suggestion, you will need to set a custom keyboard shortcut for the command `editor.action.inlineSuggest.acceptNextLine`. For more information on setting custom keyboard shortcuts, see [Configuring GitHub Copilot in your environment](/en/copilot/configuring-github-copilot/configuring-github-copilot-in-your-environment).

</div>

<div class="ghd-tool visualstudio">

## Introduction

This guide demonstrates how to get coding suggestions from GitHub Copilot in Visual Studio for Windows. To see instructions for other popular coding environments, use the tool switcher at the top of the page.

The examples in this guide use C#, however other languages will work similarly.

For more information, see [GitHub Copilot code suggestions in your IDE](/en/copilot/concepts/completions/code-suggestions?tool=visualstudio).

## Prerequisites

* **Access to Copilot**. To use GitHub Copilot in GitHub Copilot in Visual Studio, you need either limited access through Copilot Free or a paid Copilot plan for full access. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

* **Compatible version of Visual Studio**. To use GitHub Copilot in Visual Studio, you must have version 2022 17.8 or later of Visual Studio for Windows installed. For more information, see [Install Visual Studio](https://learn.microsoft.com/en-us/visualstudio/install/install-visual-studio?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the Microsoft documentation.

* **GitHub Copilot extension for Visual Studio**. For instructions on how to install the Copilot extension, see [Install GitHub Copilot in Visual Studio](https://learn.microsoft.com/visualstudio/ide/visual-studio-github-copilot-install-and-states?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the Microsoft documentation.

* **Add your GitHub account to Visual Studio**. See [Add your GitHub accounts to your Visual Studio keychain](https://learn.microsoft.com/en-us/visualstudio/ide/work-with-github-accounts?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the Microsoft documentation.

## Getting code suggestions

GitHub Copilot offers coding suggestions as you type. For example, type this function
signature in a C# file:

```csharp copy
int CalculateDaysBetweenDates(
```

GitHub Copilot will automatically suggest an entire function body in grayed text. To accept the suggestion, press <kbd>Tab</kbd>.

You can also describe something you want to do using natural language within a comment, and Copilot will suggest the code to accomplish your goal. For example, type this comment in the C# file:

```csharp copy
using System.Xml.Linq;

var doc = XDocument.Load("index.xhml");

// find all images
```

GitHub Copilot will suggest an implementation of the function. To accept the suggestion, press <kbd>Tab</kbd>.

> \[!TIP]
> If you receive limited or no suggestions from Copilot, you may have duplication detection enabled. For more information about duplication detection, see [Managing GitHub Copilot policies as an individual subscriber](/en/copilot/configuring-github-copilot/configuring-your-personal-github-copilot-settings-on-githubcom#enabling-or-disabling-suggestions-matching-public-code).

## Showing alternative suggestions

For any given input, GitHub Copilot may offer multiple suggestions. You can select which suggestion to use, or reject all suggestions.

For example, type this function signature in a C# file:

```csharp copy
int CalculateDaysBetweenDates(
```

GitHub Copilot will show you a suggestion.

Now hover over the suggestion to show the GitHub Copilot control for choosing suggestions. To display next or previous suggestions, click the forward or back arrow button in the control.

Alternatively, you can show alternate suggestions by pressing <kbd>Alt</kbd>+<kbd>.</kbd> (or <kbd>Alt</kbd>+<kbd>,</kbd>) on your keyboard.

To accept a suggestion, click "Accept" in the Copilot command palette, or press <kbd>Tab</kbd>. To reject all suggestions, press <kbd>Esc</kbd>.

## Getting comment suggestions

> \[!NOTE] Comment suggestions are available in Visual Studio 17.14 Preview 2 and later.

GitHub Copilot can suggest comments for your code, by analyzing the code you write and generating comments that describe what the code does. For Copilot Free users, comment suggestions count towards your monthly Copilot Chat usage, not your code suggestions usage.

Comment suggestions are available in the following languages:

* C#
* C++

### Enabling comment suggestions

To enable comment suggestions, you need to configure the comment style in Visual Studio.

#### For C++

1. In Visual Studio, in the **Tools** menu, click **Options**.
2. In the left-side panel, click **Text Editor**.
3. Click **C++**, then **Code Style**.
4. Under the **Code Style** heading, click **General**.
5. Under "Comments," select **Xml Doc Comments** from the dropdown.
6. Select **Insert existing comment style at the start of new lines when writing comments** and **Continue single line comments.** Then click **OK**.
7. In the **Options** tab, in the left-side panel, click **GitHub**.
8. Click **Copilot**, then **Editor**.
9. Select **Enable AI generated descriptions for auto-inserted documentation comments in supported languages**.

#### For C\#

1. In Visual Studio, in the **Tools** menu, click **Options**.
2. In the left-side panel, click **Languages**.
3. Click **C#**, then **More Settings**, then **Advanced**.
4. Under "Comments," select **Generate XML documentation comments for ///**, **Insert // at the start of new lines when writing // comments**, and **Insert \* at the start of new lines when writing /\* \*/ comments.** Then click **OK**.
5. In the **Options** tab, in the left-side panel, click **GitHub**.
6. Click **Copilot**, then **Editor**.
7. Select **Enable AI generated descriptions for auto-inserted documentation comments in supported languages**.

### Using comment suggestions

To initiate comment suggestions, type the standard comment initiator for the language you are writing in (for example, `///`), before the code you want to comment, and wait for the suggestion to appear.

To accept the suggestion, press <kbd>Tab</kbd>. To modify the suggestion, press <kbd>Alt</kbd>+<kbd>/</kbd>. To reject the suggestion, press <kbd>Esc</kbd>.

## Navigating and accepting next edit suggestions

Based on the edits you are making, Copilot will predict the location of the next edit you are likely to make and suggest a completion for it.

You can navigate suggested code changes using <kbd>Tab</kbd>, making it easier to find the next relevant edit without manually searching through files or references. Press <kbd>Tab</kbd> again to accept a suggestion.

An arrow in the gutter indicates an available edit suggestion. Click the arrow to access the edit suggestion menu, which provides keyboard shortcuts. If an edit suggestion is outside the current editor view, the arrow will point up or down to indicate where the next suggestion is.

</div>

<div class="ghd-tool vscode">

## Introduction

This guide demonstrates how to get coding suggestions from GitHub Copilot in Visual Studio Code. To see instructions for other popular coding environments, use the tool switcher at the top of the page.

The examples in this guide use JavaScript, however other languages will work similarly.

For more information, see [GitHub Copilot code suggestions in your IDE](/en/copilot/concepts/completions/code-suggestions?tool=vscode).

## Prerequisites

* **Access to Copilot**. To use GitHub Copilot in Visual Studio Code, you need either limited access through Copilot Free or a paid Copilot plan for full access. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

* **Sign in to GitHub in Visual Studio Code**. See [Set up GitHub Copilot in Visual Studio Code](https://code.visualstudio.com/docs/copilot/setup?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the VS Code documentation..

* **Visual Studio Code**. To use GitHub Copilot in Visual Studio Code, you must have Visual Studio Code installed. For more information, see the [Visual Studio Code download page](https://code.visualstudio.com/Download?ref_product=copilot\&ref_type=engagement\&ref_style=text).

* **Copilot in Visual Studio Code**. When you set up GitHub Copilot in Visual Studio Code for the first time, the required extensions are installed automatically. You don't need to download or install them manually. For detailed instructions, see [Set up GitHub Copilot in Visual Studio Code](https://code.visualstudio.com/docs/copilot/setup?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the Visual Studio Code documentation.

## Getting code suggestions

GitHub Copilot offers coding suggestions as you type. For example, type this function header in a JavaScript file:

```javascript copy
function calculateDaysBetweenDates(begin, end) {
```

GitHub Copilot will automatically suggest the rest of the function. To accept the suggestion, press <kbd>Tab</kbd>.

You can also describe something you want to do using natural language within a comment, and Copilot will suggest the code to accomplish your goal. For example, type this comment in a JavaScript file:

```javascript copy
// write a function to
// find all images without alternate text
// and give them a red border
```

GitHub Copilot will automatically suggest code. To accept the suggestion, press <kbd>Tab</kbd>.

> \[!TIP]
> If you receive limited or no suggestions from Copilot, you may have duplication detection enabled. For more information about duplication detection, see [Managing GitHub Copilot policies as an individual subscriber](/en/copilot/configuring-github-copilot/configuring-your-personal-github-copilot-settings-on-githubcom#enabling-or-disabling-suggestions-matching-public-code).

## Showing alternative suggestions

For any given input, GitHub Copilot may offer multiple suggestions. You can select which suggestion to use, or reject all suggestions.

For example, type this function header in a JavaScript file, and press <kbd>Enter</kbd>:

```javascript copy
function calculateDaysBetweenDates(begin, end) {
```

GitHub Copilot will show you a suggestion.

Now hover over the suggestion to show the GitHub Copilot control for choosing suggestions. To display next or previous suggestions, click the forward or back arrow button in the control.

You can also use keyboard shortcuts to show alternative suggestions:

| OS               | See next suggestion                       | See previous suggestion                    |
| :--------------- | :---------------------------------------- | :----------------------------------------- |
| macOS            | <kbd>Option (⌥) or Alt</kbd>+<kbd>]</kbd> | <kbd>Option (⌥) or Alt</kbd>+<kbd>\[</kbd> |
| Windows or Linux | <kbd>Alt</kbd>+<kbd>]</kbd>               | <kbd>Alt</kbd>+<kbd>\[</kbd>               |

To accept a suggestion, click "Accept" in the Copilot command palette, or press <kbd>Tab</kbd>. To reject all suggestions, press <kbd>Esc</kbd>.

## Showing multiple suggestions in a new tab

If you don't want to use any of the initial suggestions GitHub Copilot offers, you can show multiple suggestions in a new tab.

For example, type this function header in a JavaScript file, and press <kbd>Enter</kbd>:

```javascript copy
function calculateDaysBetweenDates(begin, end) {
```

GitHub Copilot will show you a suggestion. Now press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to open a new tab with multiple additional options.

To accept a suggestion, below the suggestion, click **Accept suggestion NUMBER**. To reject all suggestions, close the tab.

## Accepting partial suggestions

If you don't want to accept an entire suggestion from GitHub Copilot, you can accept the next word or the next line of a suggestion.

For example, type this function header in a JavaScript file, and press <kbd>Enter</kbd>:

```javascript copy
function calculateDaysBetweenDates(begin, end) {
```

GitHub Copilot will automatically suggest an entire function body in grayed text. The exact suggestion may vary.

Now hover over the suggestion to show the GitHub Copilot control for choosing suggestions. To accept only the next word of the suggestion, click **Accept Word** in the control.

Alternatively, you can use a keyboard shortcut to accept the next word of a suggestion:

| OS               | Accept Next Word                |
| :--------------- | :------------------------------ |
| macOS            | <kbd>Command</kbd>+<kbd>→</kbd> |
| Windows or Linux | <kbd>Control</kbd>+<kbd>→</kbd> |

If you want to accept the next line of a suggestion, you will need to set a custom keyboard shortcut for the command `editor.action.inlineSuggest.acceptNextLine`. For more information on setting custom keyboard shortcuts, see [Configuring GitHub Copilot in your environment](/en/copilot/configuring-github-copilot/configuring-github-copilot-in-your-environment).

## Navigating and accepting next edit suggestions

Next edit suggestions predicts where and what edits may be needed based on ongoing changes.

You can navigate suggested code changes using <kbd>Tab</kbd>, making it easier to find the next relevant edit without manually searching through files or references. Press <kbd>Tab</kbd> again to accept a suggestion.

An arrow in the gutter indicates an available edit suggestion. Hover over the arrow to access the edit suggestion menu, which provides keyboard shortcuts and settings options. If an edit suggestion is outside the current editor view, the arrow will point up or down to indicate where the next suggestion is.

![Screenshot of the gutter menu in Visual Studio Code. The arrow is outlined in dark orange.](/assets/images/help/copilot/vsc-advanced-code-completion-menu.png)

For more details and examples, see [Inline suggestions with GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/ai-powered-suggestions) in the Visual Studio Code documentation.

## Changing the AI model

You can change the large language model that's used to generate inline suggestions. For more information, see [Changing the AI model for GitHub Copilot inline suggestions](/en/copilot/how-tos/use-ai-models/change-the-completion-model).

</div>

<div class="ghd-tool vimneovim">

## Introduction

This guide demonstrates how to get coding suggestions from GitHub Copilot in Vim/Neovim. To see instructions for other popular coding environments, use the tool switcher at the top of the page.

## Prerequisites

* **Access to Copilot**. To use GitHub Copilot in Vim/Neovim, you need either limited access through Copilot Free or a paid Copilot plan for full access. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

* **Compatible version of Vim/Neovim**. To use GitHub Copilot in Vim/Neovim you must have Vim version 9.0.0185 / Neovim version 0.6 or above and Node.js version 18 or above installed. For more information, see the [Vim](https://vimhelp.org/) / [Neovim documentation](https://neovim.io/doc/) and the [Node.js website](https://nodejs.org/en/).

* **GitHub Copilot extension for Vim/Neovim**. To use GitHub Copilot in Vim/Neovim, you must install the GitHub Copilot plugin. For more information, see [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment).

## Learning to use GitHub Copilot in Vim/Neovim

GitHub Copilot provides suggestions inline as you type in Vim/Neovim. To accept a suggestion, press the <kbd>tab</kbd> key.

For more information and guidance on using GitHub Copilot in Vim/Neovim run the following command to view the plugin documentation:

```shell copy
:help copilot
```

</div>

<div class="ghd-tool azure_data_studio">

## Introduction

This guide demonstrates how to get coding suggestions from GitHub Copilot in Azure Data Studio. To see instructions for other popular coding environments, use the tool switcher at the top of the page.

## Prerequisites

* **Access to Copilot**. To use GitHub Copilot in Azure Data Studio, you need either limited access through Copilot Free or a paid Copilot plan for full access. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

* **Compatible version of Azure Data Studio**. To use GitHub Copilot in Azure Data Studio, you must have Azure Data Studio version 1.44.0 or later installed. For more information, see the [Azure Data Studio download page](https://docs.microsoft.com/sql/azure-data-studio/download-azure-data-studio) in the Azure Data Studio documentation.

* **GitHub Copilot extension for Azure Data Studio**. To use GitHub Copilot in Azure Data Studio, you must install the GitHub Copilot extension. For more information, see [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment).

## Getting code suggestions

GitHub Copilot can provide you with inline suggestions as you create SQL databases in Azure Data Studio. For example, if you're writing a query that joins two tables, Copilot may suggest the join condition from columns in the open editor, other files in the workspace, and common syntax patterns.

In a SQL file, type the following query:

```sql copy
SELECT [UserId], [Red], [Orange], [Yellow], [Green], [Blue], [Purple], [Rainbow]
FROM [Tag].[Scoreboard]
INNER JOIN
```

GitHub Copilot will automatically suggest a join condition in grayed text. The exact suggestion may vary. To accept the suggestion, press <kbd>Tab</kbd>.

You can also describe something you want to do using natural language within a comment, and Copilot will suggest the code to accomplish your goal. For example, type this comment in a SQL file:

```sql copy
SELECT TokenColor, COUNT(UserID) AS UserCount
FROM Tag.Users
GROUP BY TokenColor
-- pivot that query on tokencolor for Purple, Blue, Green, Yellow, Orange, Red
-- and rename the columns to match the colors
SELECT [Purple], [Blue], [Green], [Yellow], [Orange], [Red]
```

GitHub Copilot will automatically suggest code. To accept the suggestion, press <kbd>Tab</kbd>.

> \[!TIP]
> If you receive limited or no suggestions from Copilot, you may have duplication detection enabled. For more information on duplication detection, see [Managing GitHub Copilot policies as an individual subscriber](/en/copilot/configuring-github-copilot/configuring-your-personal-github-copilot-settings-on-githubcom#enabling-or-disabling-suggestions-matching-public-code).

## Showing alternative suggestions

For some suggestions, GitHub Copilot may provide multiple alternatives. You can select which suggestion you want to use, or reject all suggestions.

For example, type this query in a SQL file:

```sql copy
SELECT [UserId], [Red], [Orange], [Yellow], [Green], [Blue], [Purple], [Rainbow]
FROM [Tag].[Scoreboard]
INNER JOIN
```

GitHub Copilot will show you a suggestion.

Now hover over the suggestion to show the GitHub Copilot control for choosing suggestions. To display next or previous suggestions, click the forward or back arrow button in the control.

You can also use keyboard shortcuts to show alternative suggestions:

| OS               | See next suggestion             | See previous suggestion        |
| :--------------- | :------------------------------ | :----------------------------- |
| macOS            | <kbd>Option</kbd>+<kbd>\[</kbd> | <kbd>Option</kbd>+<kbd>]</kbd> |
| Windows or Linux | <kbd>Alt</kbd>+<kbd>\[</kbd>    | <kbd>Alt</kbd>+<kbd>]</kbd>    |

To accept a suggestion, click "Accept" in the Copilot control, or press <kbd>Tab</kbd>. To reject all suggestions, press <kbd>Esc</kbd>.

## Accepting partial suggestions

If you don't want to accept an entire suggestion from GitHub Copilot, you can accept the next word or the next line of a suggestion.

For example, type this query in a SQL file:

```sql copy
SELECT [UserId], [Red], [Orange], [Yellow], [Green], [Blue], [Purple], [Rainbow]
FROM [Tag].[Scoreboard]
INNER JOIN
```

GitHub Copilot will show you a suggestion in grayed text. The exact suggestion may vary.

Now hover over the suggestion to show the GitHub Copilot control for choosing suggestions. To accept only the next word of the suggestion, click **Accept Word** in the control.

Alternatively, you can use a keyboard shortcut to accept the next word of a suggestion:

| OS               | Accept Next Word                |
| :--------------- | :------------------------------ |
| macOS            | <kbd>Command</kbd>+<kbd>→</kbd> |
| Windows or Linux | <kbd>Control</kbd>+<kbd>→</kbd> |

If you want to accept the next line of the suggestion, you will need to set a custom keyboard shortcut for the command `editor.action.inlineSuggest.acceptNextLine`. For more information on setting custom keyboard shortcuts, see [Keyboard shortcuts in Azure Data Studio](https://learn.microsoft.com/en-us/azure-data-studio/keyboard-shortcuts) in the Microsoft documentation.

</div>

<div class="ghd-tool xcode">

## Introduction

This guide demonstrates how to get coding suggestions from GitHub Copilot in Xcode. To see instructions for other popular coding environments, use the tool switcher at the top of the page.

## Prerequisites

* **Access to Copilot**. To use GitHub Copilot in Xcode, you need either limited access through Copilot Free or a paid Copilot plan for full access. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

* **GitHub Copilot extension for Xcode**. To use GitHub Copilot for Xcode, you must install the GitHub Copilot for Xcode extension. See [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment).

## Getting code suggestions

GitHub Copilot offers coding suggestions as you type. For example, type this function
signature in a Swift file:

```swift copy
func calculateDaysBetweenDates(
```

GitHub Copilot will automatically suggest an entire function body in grayed text. To accept the first line of a suggestion, press <kbd>Tab</kbd>. To view the full suggestion, hold <kbd>Option</kbd>, and to accept the full suggestion, press <kbd>Option</kbd>+<kbd>Tab</kbd>.

### Improving code suggestions

If you encounter issues with code suggestions, such as conflicting or missing suggestions, you can try the following:

* **Disable Xcode's native predictive text completion:** To avoid receiving two sets of code suggestions, you can disable Xcode's native predictive text completion. You can find this setting in the Xcode settings in the "Editing" tab under "Text Editing."
* **Check for duplication detection in Copilot:** If you receive limited or no suggestions from Copilot, you may have duplication detection enabled. For more information on duplication detection, see [Managing GitHub Copilot policies as an individual subscriber](/en/copilot/configuring-github-copilot/configuring-your-personal-github-copilot-settings-on-githubcom#enabling-or-disabling-suggestions-matching-public-code).
* **Check for updates and restart Xcode:** Ensure you have the latest version of Copilot for Xcode in the extension application and restart Xcode.

You can also open an issue in the [Copilot for Xcode repository](https://github.com/github/CopilotForXcode).

## Navigating and accepting next edit suggestions

Next edit suggestions predicts where and what edits may be needed based on ongoing changes.

You can navigate suggested code changes using <kbd>Tab</kbd>, making it easier to find the next relevant edit without manually searching through files or references. Press <kbd>Tab</kbd> again to accept a suggestion (unless you have disabled the "Accept suggestions with Tab" setting for the GitHub Copilot for Xcode extension).

An arrow in the gutter indicates an available edit suggestion. Hover over the arrow to access the edit suggestion menu, which provides keyboard shortcuts and settings options.

![Screenshot of the gutter menu in Xcode. The arrow is outlined in dark orange.](/assets/images/help/copilot/xcode-advanced-code-completion-menu.png)

</div>

<div class="ghd-tool eclipse">

## Introduction

This guide demonstrates how to get coding suggestions from GitHub Copilot in Eclipse. To see instructions for other popular coding environments, use the tool switcher at the top of the page.

## Prerequisites

* **Access to Copilot**. To use GitHub Copilot in Eclipse, you need either limited access through Copilot Free or a paid Copilot plan for full access. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

* **GitHub Copilot extension for Eclipse**.To use GitHub Copilot in Eclipse, you must install the GitHub Copilot extension. See [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment?tool=eclipse).

## Getting code suggestions

GitHub Copilot offers coding suggestions as you type. For example, type this function header in a Java file:

```java copy
public int getDiff(int a, int b)
```

GitHub Copilot will automatically suggest the rest of the function. To accept the suggestion, press <kbd>Tab</kbd>.
To discard the suggestion, press <kbd>Esc</kbd>.

You can also describe something you want to do using natural language within a comment, and Copilot will suggest the code to accomplish your goal. For example, type this comment in a Java file:

```java copy
/*
 * Return the difference between two different integers.
 */
```

GitHub Copilot will automatically suggest code.

> \[!TIP]
> If you receive limited or no suggestions from Copilot, you may have duplication detection enabled. For more information about duplication detection, see [Managing GitHub Copilot policies as an individual subscriber](/en/copilot/configuring-github-copilot/configuring-your-personal-github-copilot-settings-on-githubcom#enabling-or-disabling-suggestions-matching-public-code).

## Manually triggering inline suggestions

You can also use keyboard shortcuts to trigger inline suggestions.

| OS               | Trigger inline suggestions                        |
| :--------------- | :------------------------------------------------ |
| macOS            | <kbd>Option</kbd>+<kbd>Command</kbd>+<kbd>/</kbd> |
| Windows or Linux | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>/</kbd>       |

## Accepting partial suggestions

If you don't want to accept an entire suggestion from Copilot, you can accept the next word of a suggestion.

| OS               | Accept next word                |
| :--------------- | :------------------------------ |
| macOS            | <kbd>Command</kbd>+<kbd>→</kbd> |
| Windows or Linux | <kbd>Ctrl</kbd>+<kbd>→</kbd>    |

## Navigating and accepting next edit suggestions

Next edit suggestions predicts where and what edits may be needed based on ongoing changes.

You can navigate suggested code changes using <kbd>Tab</kbd>, making it easier to find the next relevant edit without manually searching through files or references. Press <kbd>Tab</kbd> again to accept a suggestion.

An arrow in the gutter indicates an available edit suggestion. Hover over the arrow to access the edit suggestion menu, which provides keyboard shortcuts and settings options.

![Screenshot of the gutter menu in Eclipse. The arrow is outlined in dark orange.](/assets/images/help/copilot/eclipse-advanced-code-completion-menu.png)

</div>

## Next steps

* **Learn how to write effective prompts** - See [Prompt engineering for GitHub Copilot Chat](/en/copilot/using-github-copilot/copilot-chat/prompt-engineering-for-copilot-chat).
* **Configure Copilot in your editor** - You can enable or disable GitHub Copilot from within your editor, and create your own preferred keyboard shortcuts for Copilot. See [Configuring GitHub Copilot in your environment](/en/copilot/configuring-github-copilot/configuring-github-copilot-in-your-environment).
* **Get started with GitHub Copilot Chat** - Learn how to ask Copilot for information and assistance, using GitHub Copilot Chat. See [Asking GitHub Copilot questions in your IDE](/en/copilot/github-copilot-chat/using-github-copilot-chat-in-your-ide).
* **Troubleshoot issues** - Learn more about how to troubleshoot common issues with GitHub Copilot. See [Troubleshoot GitHub Copilot](/en/copilot/troubleshooting-github-copilot).

## Further reading

* [GitHub Copilot code suggestions in your IDE](/en/copilot/concepts/completions/code-suggestions)