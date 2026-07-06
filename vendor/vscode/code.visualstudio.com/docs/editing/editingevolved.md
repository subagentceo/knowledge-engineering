# Code Navigation

Visual Studio Code has a high productivity code editor which, when combined with programming language services, gives you the power of an IDE and the speed of a text editor. In this topic, we'll first describe VS Code's language intelligence features (suggestions, parameter hints, smart code navigation) and then show the power of the core text editor.

## Quick file navigation

> **Tip:** You can open any file by its name when you type ⌘P (Windows, Linux Ctrl+P) (**Quick Open**).

The Explorer is great for navigating between files when you are exploring a project. However, when you are working on a task, you will find yourself quickly jumping between the same set of files. VS Code provides two powerful commands to navigate in and across files with easy-to-use keyboard shortcuts.

Hold Ctrl and press Tab to view a list of all files open in an editor group. To open one of these files, use Tab again to pick the file you want to navigate to, then release Ctrl to open it.

![Quick Navigation](/assets/docs/editing/editingevolved/quicknav.png)

Alternatively, you can use ⌃- (Windows Alt+Left, Linux Ctrl+Alt+-) and ⌃⇧- (Windows Alt+Right, Linux Ctrl+Shift+-) to navigate between files and edit locations. If you are jumping around between different lines of the same file, these shortcuts allow you to navigate between those locations easily.

## Breadcrumbs

The editor has a navigation bar above its contents called Breadcrumbs. It shows the current location and allows you to quickly navigate between folders, files, and symbols.

![Breadcrumbs](/assets/docs/editing/editingevolved/breadcrumbs.png)

Breadcrumbs always show the file path and, with the help of language extensions, the symbol path up to the cursor position. The symbols shown are the same as in Outline view and Go to Symbol.

Selecting a breadcrumb in the path displays a dropdown with that level's siblings so you can quickly navigate to other folders and files.

![breadcrumb folder dropdown](/assets/docs/editing/editingevolved/breadcrumb-folder-dropdown.png)

If the current file type has language support for symbols, you will see the current symbol path and a dropdown of other symbols at the same level and below.

![breadcrumb symbol dropdown](/assets/docs/editing/editingevolved/breadcrumb-symbol-dropdown.png)

You can turn off breadcrumbs with the **View** > **Show Breadcrumbs** toggle or with the breadcrumbs.enabled Open in VS Code Open in VS Code Insiders setting.

### Breadcrumb customization

The appearance of breadcrumbs can be customized. If you have very long paths or are only interested in either file paths or symbols paths, you can use the breadcrumbs.filePath Open in VS Code Open in VS Code Insiders and breadcrumbs.symbolPath Open in VS Code Open in VS Code Insiders settings. Both support `on`, `off`, and `last` and they define if or what part of the path you see. By default, breadcrumbs show file and symbol icons to the left of the breadcrumb but you can remove the icons by setting breadcrumbs.icons Open in VS Code Open in VS Code Insiders to false.

### Symbol order in Breadcrumbs

You can control how symbols are ordered in the Breadcrumbs dropdown with the breadcrumbs.symbolSortOrder Open in VS Code Open in VS Code Insiders settings.

Allowed values are:

*   `position` - position in the file (default)
*   `name` - alphabetical order
*   `type` - symbol type order

### Breadcrumb path copying

You can copy the full breadcrumb path by right-clicking on the editor tab and selecting **Copy Breadcrumbs Path**. This will copy the full path including file and symbol names to the clipboard.

You can configure the symbol path separator with the breadcrumbs.symbolPathSeparator Open in VS Code Open in VS Code Insiders setting. The default value is `.`.

### Breadcrumb keyboard navigation

To interact with breadcrumbs, use the **Focus Breadcrumbs** command or press ⇧⌘. (Windows, Linux Ctrl+Shift+.). It will select that last element and open a dropdown that allows you to navigate to a sibling file or symbol. Use the ← (Windows, Linux Left) and → (Windows, Linux Right) keyboard shortcuts to go to elements before or after the current element. When the dropdown appears, start typing - all matching elements will be highlighted and the best match will be selected for quick navigation.

You can also interact with breadcrumbs without the dropdown. Press ⇧⌘; (Windows, Linux Ctrl+Shift+;) to focus the last element, use ← (Windows, Linux Left) and → (Windows, Linux Right) to navigate, and use Space to reveal the element in the editor.

## Go to Definition

If a language supports it, you can go to the definition of a symbol by pressing F12.

If you press Ctrl and hover over a symbol, a preview of the declaration will appear:

![Ctrl Hover](/assets/docs/editing/editingevolved/ctrlhover.png)

> **Tip:** You can jump to the definition with Ctrl+Click or open the definition to the side with Ctrl+Alt+Click.

## Go to Type Definition

Some languages also support jumping to the type definition of a symbol by running the **Go to Type Definition** command from either the editor context menu or the **Command Palette**. This will take you to the definition of the type of a symbol. The command `editor.action.goToTypeDefinition` is not bound to a keyboard shortcut by default but you can add your own custom keybinding.

## Go to Implementation

Languages can also support jumping to the implementation of a symbol by pressing ⌘F12 (Windows, Linux Ctrl+F12). For an interface, this shows all the implementors of that interface and for abstract methods, this shows all concrete implementations of that method.

## Go to Symbol

You can navigate symbols inside a file with ⇧⌘O (Windows, Linux Ctrl+Shift+O). By typing : the symbols will be grouped by category. Press Up or Down and navigate to the place you want.

![Go to Symbol](/assets/docs/editing/editingevolved/gotosymbol.png)

## Open symbol by name

Some languages support jumping to a symbol across files with ⌘T (Windows, Linux Ctrl+T). Type the first letter of a type you want to navigate to, regardless of which file contains it, and press Enter.

![Open symbol by name](/assets/docs/editing/editingevolved/symbol.png)

## Peek

We think there's nothing worse than a big context switch when all you want is to quickly check something. That's why we support peeked editors. When you execute a **Go to References** search (via ⇧F12 (Windows, Linux Shift+F12)), or a **Peek Definition** (via ⌥F12 (Windows Alt+F12, Linux Ctrl+Shift+F10)), we embed the result inline:

![Peek References](/assets/docs/editing/editingevolved/references.png)

You can navigate between different references in the peeked editor and make quick edits right there. Clicking on the peeked editor filename or double-clicking in the result list will open the reference in the outer editor.

> **Tip:** Additionally, the peek window is closed if you press Escape or double-click in the peek editor region. You can disable this behavior with the editor.stablePeek Open in VS Code Open in VS Code Insiders setting.

## Bracket matching

Matching brackets will be highlighted as soon as the cursor is near one of them.

![Bracket Matching](/assets/docs/editing/editingevolved/brackets.png)

> **Tip:** You can jump to the matching bracket with ⇧⌘\ (Windows, Linux Ctrl+Shift+\)

### Bracket Pair Colorization

Matching bracket pairs can also be colorized by setting editor.bracketPairColorization.enabled Open in VS Code Open in VS Code Insiders to `true`.

![Bracket Pair Colorization](/assets/docs/editing/editingevolved/bracket-pair-colorization-on-off.drawio.png)

All colors are themeable and up to six colors can be configured.

You can use workbench.colorCustomizations Open in VS Code Open in VS Code Insiders to override these theme-contributed colors in your settings:

```
"workbench.colorCustomizations": {
    "editorBracketHighlight.foreground1": "#FFD700",
    "editorBracketHighlight.foreground2": "#DA70D6",
    "editorBracketHighlight.foreground3": "#179fff",
},
```

## Reference information

Some languages like C# support inline reference information, that is updated live. This allows you to quickly analyze the impact of your edit or the popularity of your specific method or property throughout your project:

![Reference information](/assets/docs/editing/editingevolved/referenceinfo.png)

> **Tip:** Directly invoke the **Peek References** action by clicking on these annotations.

> **Tip:** Reference information shown in CodeLens can be turned on or off through the editor.codeLens Open in VS Code Open in VS Code Insiders setting.

## Rename symbol

Some languages support rename symbol across files. Press F2 and then type the new desired name and press Enter. All usages of the symbol will be renamed, across files.

![Rename](/assets/docs/editing/editingevolved/rename.png)

## Errors & warnings

Warnings or Errors can be generated either via configured tasks, by rich language services, or by linters, that constantly analyze your code in the background. Since we love bug-free code, warnings and errors show up in multiple places:

*   In the Status Bar, there is a summary of all errors and warnings counts.
*   You can click on the summary or press ⇧⌘M (Windows, Linux Ctrl+Shift+M) to display the **PROBLEMS** panel with a list of all current errors.
*   If you open a file that has errors or warnings, they will be rendered inline with the text and in the overview ruler.

![errors in problems panel](/assets/docs/editing/editingevolved/errors.png)

> **Tip:** To loop through errors or warnings in the current file, you can press ⌥F8 (Windows, Linux Alt+F8) or ⇧⌥F8 (Windows, Linux Shift+Alt+F8) which will show an inline zone detailing the problem and possible Code Actions (if available):

![Errors and Warnings Inline](/assets/docs/editing/editingevolved/errorsinline.png)

## Code Action

Warnings and Errors can provide Code Actions (also known as Quick Fixes) to help fix issues. These will be displayed in the editor in the left margin as a lightbulb. Clicking on the lightbulb will either display the Code Action options or perform the action.

## Inlay Hints

Some languages provide inlay hints: that is additional information about source code that is rendered inline. This is usually used to show inferred types. The sample below shows inlay hints that display the inferred types of JavaScript variables and function return types.

![Inlay hints for inferred types in TypeScript](/assets/docs/editing/editingevolved/inlay-hints.png)

Inlay hints can be enabled/disabled with the editor.inlayHints.enabled Open in VS Code Open in VS Code Insiders setting, the default is enabled. Extensions, like TypeScript or Rust, are needed to provide the actual inlay hint information.

## Outgoing link protection

For your protection, VS Code displays a prompt before opening an outgoing website link from the editor.

![Outgoing link prompt](/assets/docs/editing/editingevolved/outgoing-link-prompt.png)

You can proceed to the external website in your browser or have the options to copy the link or cancel the request. If you choose **Configure Trusted Domains**, a dropdown lets you trust the exact URL, trust the URL domain and subdomains, or trust all domains to disable outgoing link protection.

![Configure Trusted Domains dropdown](/assets/docs/editing/editingevolved/trusted-domain-dropdown.png)

The option to **Manage Trusted Domains**, also available at any time from the Command Palette, brings up the **Trusted Domains** JSON file, where you can add, remove, or modify trusted domains.

```
// You can use the "Manage Trusted Domains" command to open this file.
// Save this file to apply the trusted domains rules.
[
  "*.twitter.com"
]
```

The **Trusted Domains** JSON file also has comments with examples of the supported domain formats and a list of the domains trusted by default, such as `https://*.visualstudio.com` and `https://*.microsoft.com`.

## Next steps

Now that you know how the editor works, time to try a few other things...

*   Intro Video - Code Editing - Watch an introductory video on code editing features.
*   User Interface - In case you missed a basic orientation around VS Code.
*   Key Bindings - Learn how to modify keyboard shortcuts to your preference.
*   Debugging - This is where VS Code really shines.

## Common questions

### How can I automatically select the second entry in Quick Open instead of the first?

With the command `workbench.action.quickOpenPreviousEditor`, you can have the second entry automatically selected in Quick Open. This can be useful if you want to select the previous entry from the list without having to invoke another keyboard shortcut:

```
[
  {
    "key": "ctrl+p",
    "command": "workbench.action.quickOpenPreviousEditor"
  },
  {
    "key": "ctrl+p",
    "command": "-workbench.action.quickOpen"
  }
]
```

### How can I configure Ctrl+Tab to navigate across all editors of all groups

By default, Ctrl+Tab navigates between editors of the same editor group. If you want to navigate across all opened editors in all groups, you can create keyboard shortcuts for the `workbench.action.quickOpenPreviousRecentlyUsedEditor` and `workbench.action.quickOpenLeastRecentlyUsedEditor` commands:

```
[
  {
    "key": "ctrl+tab",
    "command": "workbench.action.quickOpenPreviousRecentlyUsedEditor",
    "when": "!inEditorsPicker"
  },
  {
    "key": "ctrl+shift+tab",
    "command": "workbench.action.quickOpenLeastRecentlyUsedEditor",
    "when": "!inEditorsPicker"
  }
]
```

### How can I navigate between recently used editors without a picker

Here is a list of commands you can use to navigate in editors without opening a picker:

Key

Command

Command ID

Open Next Recently Used Editor

`workbench.action.openNextRecentlyUsedEditor`

Open Previously Used Editor

`workbench.action.openPreviousRecentlyUsedEditor`

Open Next Recently Used Editor in Group

`workbench.action.openNextRecentlyUsedEditorInGroup`

Open Previously Used Editor in Group

`workbench.action.openPreviousRecentlyUsedEditorInGroup`

7/1/2026