# Visual Studio Code tips and tricks

Use the tips and tricks in this article to jump right in and learn how to be productive with Visual Studio Code. Become familiar with the powerful editing, code intelligence, and source code control features and learn useful keyboard shortcuts. Make sure to explore the other in-depth topics in Getting Started and the User Guide to learn more.

If you're just getting started, make sure to check out the VS Code tutorial for a step-by-step to discover the key features.

> If you don't have Visual Studio Code installed, go to the Download page. You can find platform specific setup instructions at Running VS Code on Linux, macOS, and Windows.

Prefer a video? You can watch the VS Code Day talks Visual Studio Code tips and tricks or Elevate your VS Code experience.

## Basics

### Getting started

The best way of exploring VS Code hands-on is to open the **Welcome** page and then pick a **Walkthrough** for a self-guided tour through the setup steps, features, and deeper customizations that VS Code offers. As you discover and learn, the walkthroughs track your progress.

Open the Welcome page from the **Help** > **Welcome** menu or use the **Help: Welcome** command from the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)).

![Welcome page](/assets/docs/editing/tips-and-tricks/welcome-page.png)

Extensions can also contribute walkthroughs. You can also directly open a walkthrough by using the **Help: Open Walkthrough...** command from the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)).

![Open walkthrough command in the Command Palette](/assets/docs/editing/tips-and-tricks/open-walkthrough.png)

If you are looking to improve your code editing skills, open the **Interactive Editor Playground**. Try out VS Code's code editing features, like multi-cursor editing, IntelliSense, Snippets, Emmet, and more.

Open the Welcome page from the **Help** > **Editor Playground** menu or use the **Help: Interactive Editor Playground** command from the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)).

![Interactive editor playground](/assets/docs/editing/tips-and-tricks/interactive_playground.png)

### Command Palette

Access all available commands based on your current context.

Keyboard Shortcut: ⇧⌘P (Windows, Linux Ctrl+Shift+P)

![Command Palette](/assets/docs/editing/tips-and-tricks/OpenCommandPalette.gif)

Tip

You can move the Command Palette to another location by grabbing the top edge with the mouse cursor and dragging it somewhere else. You can also select the **Customize Layout** control in the title bar, and then select one of the preconfigured **Quick Input Positions**.

![Screenshot that shows the Command Palette in a different location, highlighting the Customize Layout control in the title bar and the preconfigured position options.](/assets/docs/editing/tips-and-tricks/command-palette-position.png)

### Default keyboard shortcuts

Many of the commands in the Command Palette have default keyboard shortcuts associated with them. You can see the default keyboard shortcut alongside the command in the **Command Palette** (⇧⌘P (Windows, Linux Ctrl+Shift+P)).

![keyboard references](/assets/docs/editing/tips-and-tricks/keyboard-references.png)

### Keyboard reference sheets

Download the keyboard shortcut reference sheet for your platform (macOS, Windows, Linux).

![Keyboard Reference Sheet](/assets/docs/editing/tips-and-tricks/KeyboardReferenceSheet.png)

### Floating windows

You can open an editor, the terminal, or specific views in a floating window, for example to move the editor to another place on your monitor or even to another monitor.

![Screenshot that shows the OS desktop with VS Code window and a CSV file opened in a floating window.](/assets/docs/editing/userinterface/floating-editor.png)

Drag an editor tab out of the current VS Code window to open it in a floating window. Alternatively, use the **Move into New Window** or **Copy into New Window** context options from the editor tab.

### Integrated terminal

Keyboard Shortcut: ⌃` (Windows, Linux Ctrl+`)

![Integrated terminal](/assets/docs/editing/tips-and-tricks/integrated_terminal.png)

You can select another terminal shell from the dropdown. Depending on your operating system and system configuration, you might see different shells listed.

Further reading:

*   Integrated Terminal documentation
*   Mastering VS Code's Terminal article

### Toggle Sidebar

Keyboard Shortcut: ⌘B (Windows, Linux Ctrl+B)

![toggle side bar](/assets/docs/editing/tips-and-tricks/toggle_side_bar.gif)

### Toggle Panel

Keyboard Shortcut: ⌘J (Windows, Linux Ctrl+J)

![toggle panel](/assets/docs/editing/tips-and-tricks/toggle_panel.gif)

### Zen mode

Enter distraction-free Zen mode.

Keyboard Shortcut: ⌘K Z (Windows, Linux Ctrl+K Z)

![zen mode](/assets/docs/editing/tips-and-tricks/zen_mode.gif)

Press Esc twice to exit Zen Mode.

## Command line

VS Code has a powerful command line interface (CLI) which enables you to customize how the editor is launched to support various scenarios. For example, you can start VS Code from the command line to open a diff editor for comparing two files.

> Make sure the VS Code binary is on your path so you can simply type 'code' to launch VS Code. See the platform specific setup topics if VS Code is added to your environment path during installation (Running VS Code on Linux, macOS, Windows).

```
# open code with current directory
code .

# open the current directory in the most recently used code window
code -r .

# create a new window
code -n

# change the language
code --locale=es

# open diff editor
code --diff <file1> <file2>

# open file at specific line and column <file:line[:character]>
code --goto package.json:10:5

# see help options
code --help

# disable all extensions
code --disable-extensions .
```

### .vscode folder

Workspace-specific configuration files are in a `.vscode` folder at the root of your workspace. For example, `tasks.json` for the Task Runner and `launch.json` for the debugger.

## Status Bar

### Errors and warnings

Keyboard Shortcut: ⇧⌘M (Windows, Linux Ctrl+Shift+M)

Quickly jump to errors and warnings in the project.

Cycle through errors with F8 or ⇧F8 (Windows, Linux Shift+F8)

![errors and warnings](/assets/docs/editing/tips-and-tricks/Errors_Warnings.gif)

You can filter problem list either by type ('info', 'errors', 'warnings') or by matching text.

### Change language mode

The language mode in the Status Bar indicates the language (for example, Markdown, Python, and more) that is associated with the active editor. You can change the language mode for the current editor by selecting the Status Bar language mode indicator, or by using the keyboard shortcut.

Keyboard Shortcut: ⌘K M (Windows, Linux Ctrl+K M)

![change syntax](/assets/docs/editing/tips-and-tricks/change_syntax.gif)

If you want to persist the new language mode for a file type, use the **Configure File Association for** command to associate the current file extension with an installed language.

## Customization

There are many options to customize VS Code to meet your preferences:

*   Change your theme
*   Change your keyboard shortcuts
*   Tune your settings
*   Add JSON validation
*   Create snippets
*   Install extensions

### Change your theme

VS Code comes with a number of built-in color themes. Use the **Preferences: Color Theme** command or use the keyboard shortcut.

Keyboard Shortcut: ⌘K ⌘T (Windows, Linux Ctrl+K Ctrl+T)

![Preview themes](/assets/docs/editing/tips-and-tricks/PreviewThemes.gif)

You can install more themes from the VS Code extension Marketplace. Select the **Preferences: Color Theme** > **+ Browse Additional Color Themes...** command to search themes from the Marketplace.

Additionally, you can install and change your File Icon themes.

![File icon themes](/assets/docs/editing/tips-and-tricks/PreviewFileIconThemes.gif)

### Keymaps

Are you used to keyboard shortcuts from another editor? You can install a Keymap extension that brings the keyboard shortcuts from your favorite editor to VS Code. Use the **Preferences: Keymaps** command to see the current list on the Visual Studio Marketplace.

Some of the more popular keymaps are:

*   Vim
*   Sublime Text Keymap
*   Emacs Keymap
*   Atom Keymap
*   Brackets Keymap
*   Eclipse Keymap
*   Visual Studio Keymap

### Customize your keyboard shortcuts

You can view and customize the keyboard shortcuts in the **Keyboard Shortcuts** editor. Use the **Preferences: Open Keyboard Shortcuts** command or use the shortcut to open the editor.

Keyboard Shortcut: ⌘K ⌘S (Windows, Linux Ctrl+K Ctrl+S)

Select the pencil icon or use Enter on a specific entry to edit the keyboard shortcut. Filter the list by using the search field.

![keyboard shortcuts](/assets/docs/editing/tips-and-tricks/keyboard-shortcuts.png)

You can also search for shortcuts and add your own keyboard shortcuts to the `keybindings.json` file.

![customize keyboard shortcuts](/assets/docs/editing/tips-and-tricks/KeyboardShortcuts.gif)

See more in Key Bindings for Visual Studio Code.

### Tune your settings

By default, VS Code shows the Settings editor to view and edit settings. You can also edit the underlying `settings.json` file by using the **Open User Settings (JSON)** command or by changing your default settings editor with the workbench.settings.editor Open in VS Code Open in VS Code Insiders setting.

Open User Settings `settings.json`

Keyboard Shortcut: ⌘, (Windows, Linux Ctrl+,)

Change the font size of various UI elements

```
// Main editor
"editor.fontSize": 18,
// Terminal panel
"terminal.integrated.fontSize": 14,
// Output panel
"[Log]": {
    "editor.fontSize": 15
}
```

Change the zoom level

```
"window.zoomLevel": 5
```

Font ligatures

```
"editor.fontFamily": "Fira Code",
"editor.fontLigatures": true
```

> **Tip:** You need to have a font installed that supports font ligatures. FiraCode is a popular font on the VS Code team.

![font ligatures](/assets/docs/editing/tips-and-tricks/font-ligatures-annotated.png)

Auto Save

```
"files.autoSave": "afterDelay"
```

You can also toggle Auto Save from the top-level menu with the **File** > **Auto Save**.

Format on save

```
"editor.formatOnSave": true
```

Format on paste

```
"editor.formatOnPaste": true
```

Change the size of Tab characters

```
"editor.tabSize": 4
```

Spaces or Tabs

```
"editor.insertSpaces": true
```

Render whitespace

```
"editor.renderWhitespace": "all"
```

Whitespace characters are rendered by default in text selection.

Ignore files / folders

Removes these files / folders from your editor window.

```
"files.exclude": {
    "somefolder/": true,
    "somefile": true
}
```

Remove these files / folders from search results.

```
"search.exclude": {
    "someFolder/": true,
    "somefile": true
}
```

Learn about the many other customizations.

### Language specific settings

You can scope settings for specific languages by using the language identifier. You can find a list of commonly used language IDs in the Language Identifiers reference.

```
"[languageid]": {

}
```

> **Tip:** You can also create language-specific settings with the **Configure Language Specific Settings** command.
> 
> ![language based settings](/assets/docs/editing/tips-and-tricks/lang-based-settings.png)

### Add JSON validation

JSON validation is enabled by default for many file types. Create your own schema and validation in `settings.json`:

```
"json.schemas": [
    {
        "fileMatch": [
            "bower.json"
        ],
        "url": "https://json.schemastore.org/bower"
    }
]
```

or for a schema defined in your workspace:

```
"json.schemas": [
    {
        "fileMatch": [
            "**/foo.json"
        ],
        "url": "./myschema.json"
    }
]
```

or to use a custom schema:

```
"json.schemas": [
    {
        "fileMatch": [
            "/.myconfig"
        ],
        "schema": {
            "type": "object",
            "properties": {
                "name" : {
                    "type": "string",
                    "description": "The name of the entry"
                }
            }
        }
    }
]
```

See more in the JSON documentation.

### Configure the default browser

In VS Code, you can Ctrl+click (Cmd+click on macOS) on a link to open it in your default browser. You can configure the default browser by setting the workbench.externalBrowser Open in VS Code Open in VS Code Insiders setting.

Specify the full path to the browser executable as the settings value. Alternatively, to ensure correct functioning across devices, you can also use browser aliases, such as `edge`, `chrome`, or `firefox`.

```
"workbench.externalBrowser": "edge"
```

### Combine multiple logs into a single view

The Output panel shows the output of various services. Each services typically has their own log. To analyze related log information from multiple services, you can combine multiple logs into a single _compound log_.

Select **Create Compound Log...** from the overflow menu of the Output panel.

## Extensions

Keyboard Shortcut: ⇧⌘X (Windows, Linux Ctrl+Shift+X)

### Find extensions

You can use multiple sources to find extensions:

*   In the VS Code Marketplace.
*   Search inside VS Code in the **Extensions** view.
*   View extension recommendations
*   Community curated extension lists, such as awesome-vscode.

### Find popular extensions

In the **Extensions** view, select the **Filter** control, and then either select **Most Popular** or **Sort By** > **Install Count**.

![install extensions](/assets/docs/editing/tips-and-tricks/show-popular-extensions.png)

### Extension recommendations

In the **Extensions** view, select the **Filter** control, and then select **Recommended** to view the list of recommended extensions.

![show recommended extensions](/assets/docs/editing/tips-and-tricks/show-recommended-extensions.png)

### Create your own extension

Are you interested in creating your own extension? You can learn how to do this in the Extension API documentation, specifically check out the documentation on contribution points.

*   configuration
*   commands
*   keyboard shortcuts
*   languages
*   debuggers
*   grammars
*   themes
*   snippets
*   jsonValidation

## Files and folders

### Simple file dialog

With the simple file dialog, you can replace the system's default file dialog for opening and saving files and folders with a simpler Quick Pick dialog within VS Code.

Setting: files.simpleDialog Open in VS Code Open in VS Code Insiders

![Simple File Dialog](/assets/docs/editing/tips-and-tricks/simple-file-dialog.png)

Tip

Use the eye icon in the top right corner to show or hide files and folders starting with a dot.

When you open a folder and enter a path that doesn't exist, the simple file dialog prompts you to create the folder.

### Show Explorer view

Keyboard Shortcut: ⇧⌘E (Windows, Linux Ctrl+Shift+E)

### Quick Open

Quickly search and open files.

Keyboard Shortcut: ⌘P (Windows, Linux Ctrl+P)

![Quick Open](/assets/docs/editing/tips-and-tricks/QuickOpen.gif)

**Tip:** Type ? to view command suggestions.

![Quick Open command list](/assets/docs/editing/tips-and-tricks/quick-open-command-dropdown.png)

Typing commands such as `edt` or `term` followed by a space brings up a dropdown list.

![term command in Quick Open](/assets/docs/editing/tips-and-tricks/term-quick-open.png)

#### Navigate between recently opened files

Repeatedly press the **Quick Open** keyboard shortcut to cycle quickly between recently opened files.

#### Open multiple files from Quick Open

You can open multiple files from **Quick Open** by pressing Right Arrow. This opens the currently selected file in the background, and you can continue selecting files from **Quick Open**.

### Navigate between recently opened folders and workspaces

Open a recent folder or workspace.

Keyboard Shortcut: ⌃R (Windows, Linux Ctrl+R)

Displays a Quick Pick dropdown with the list from **File** > **Open Recent** with recently opened folders and workspaces followed by files.

### Create or open a file from a link

Keyboard Shortcut: Ctrl+click (Cmd+click on macOS)

You can quickly open a file or image, or create a new file by moving the cursor to the file link and then pressing Ctrl+click.

![create and open file](/assets/docs/editing/tips-and-tricks/create_open_file.gif)

### Close the currently opened folder

Keyboard Shortcut: ⌘K F (Windows, Linux Ctrl+K F)

### Navigation history

Navigate entire history: ⌃Tab (Windows, Linux Ctrl+Tab)

Navigate back: ⌃- (Windows Alt+Left, Linux Ctrl+Alt+-)

Navigate forward: ⌃⇧- (Windows Alt+Right, Linux Ctrl+Shift+-)

![navigate history](/assets/docs/editing/tips-and-tricks/navigate_history.gif)

### File associations

Create language associations for files that aren't detected correctly. For example, many configuration files with custom file extensions are actually JSON.

```
"files.associations": {
    ".database": "json"
}
```

### Preventing dirty writes

VS Code will show you an error message when you try to save a file that cannot be saved because it has changed on disk. VS Code blocks saving the file to prevent overwriting changes that have been made outside of the editor.

To resolve the save conflict, select the **Compare** action in the notification popup to open a diff editor that shows you the contents of the file on disk (to the left) compared to the contents in VS Code (on the right):

![dirty write](/assets/docs/editing/tips-and-tricks/dirty-write.png)

Use the actions in the editor toolbar to resolve the save conflict. You can either **Accept** your changes and thereby overwriting any changes on disk, or **Revert** to the version on disk. Reverting means that your changes will be lost.

**Note:** The file remains dirty and cannot be saved until you pick one of the two actions to resolve the conflict.

## Editing hacks

Here is a selection of common features for editing code. If you're more familiar with the keyboard shortcuts for another editor, consider installing a keymap extension.

**Tip**: You can see recommended keymap extensions in the **Extensions** view by filtering the search to `@recommended:keymaps`.

### Side by side editing

Keyboard Shortcut: ⌘\ (Windows, Linux Ctrl+\)

You can also drag and drop editors to create new editor groups and move editors between groups.

![split editors](/assets/docs/editing/tips-and-tricks/split_editor.gif)

### Switch between editors

Keyboard Shortcut: ⌘1 (Windows, Linux Ctrl+1), ⌘2 (Windows, Linux Ctrl+2), ⌘3 (Windows, Linux Ctrl+3)

![navigate editors](/assets/docs/editing/tips-and-tricks/navigate_editors.gif)

### Multi cursor selection

To add cursors at arbitrary positions, select a position with your mouse and use Alt+Click (Option+Click on macOS).

To set cursors above or below the current position use:

Keyboard Shortcut: ⌥⌘↑ (Windows Ctrl+Alt+Up, Linux Shift+Alt+Up) or ⌥⌘↓ (Windows Ctrl+Alt+Down, Linux Shift+Alt+Down)

![multi cursor](/assets/docs/editing/tips-and-tricks/multicursor.gif)

You can add additional cursors to all occurrences of the current selection with ⇧⌘L (Windows, Linux Ctrl+Shift+L).

![add cursor to all occurrences of current selection](/assets/docs/editing/tips-and-tricks/add_cursor_current_selection.gif)

> Note: You can also change the modifier to Ctrl/Cmd for applying multiple cursors with the editor.multiCursorModifier Open in VS Code Open in VS Code Insiders setting . See Multi-cursor Modifier for details.

If you do not want to add all occurrences of the current selection, you can use ⌘D (Windows, Linux Ctrl+D) instead. This only selects the next occurrence after the one you selected so you can add selections one by one.

![add cursor to next occurrences of current selection one by one](/assets/docs/editing/tips-and-tricks/add_cursor_current_selection_one_by_one.gif)

### Column (box) selection

You can select blocks of text by holding Shift+Alt (Shift+Option on macOS) while you drag your mouse. A separate cursor will be added to the end of each selected line.

![Column text selection](/assets/docs/editing/tips-and-tricks/column-select.gif)

You can also use keyboard shortcuts to trigger column selection.

### Vertical rulers

You can add vertical column rulers to the editor with the editor.rulers Open in VS Code Open in VS Code Insiders setting, which takes an array of column character positions where you'd like vertical rulers.

```
{
  "editor.rulers": [20, 40, 60]
}
```

![Editor rulers in the editor](/assets/docs/editing/tips-and-tricks/editor-rulers.png)

### Fast scrolling

Pressing the Alt key enables fast scrolling in the editor and Explorers. By default, fast scrolling uses a 5X speed multiplier but you can control the multiplier with the **Editor: Fast Scroll Sensitivity** ( editor.fastScrollSensitivity Open in VS Code Open in VS Code Insiders ) setting.

### Locked scrolling

You can synchronize scrolling across all visible editors by using the **View: Toggle Locked Scrolling Across Editors** command. This means that when you scroll in one editor, all the other editors scroll by the same amount, keeping everything aligned.

![Locked scrolling in the editor](/assets/docs/editing/tips-and-tricks/locked-scrolling.gif)

You can choose to only activate the scrolling sync when you're holding down a specific keyboard shortcut. Set up a keyboard shortcut for the `workbench.action.holdLockedScrolling` command to temporarily lock scrolling across editors.

### Copy line up / down

Keyboard Shortcut: ⇧⌥↑ (Windows Shift+Alt+Up, Linux Ctrl+Shift+Alt+Up) or ⇧⌥↓ (Windows Shift+Alt+Down, Linux Ctrl+Shift+Alt+Down)

> The commands **Copy Line Up/Down** are unbound on Linux because the VS Code default keyboard shortcuts would conflict with Ubuntu keyboard shortcuts, see Issue #509. You can still set the commands `editor.action.copyLinesUpAction` and `editor.action.copyLinesDownAction` to your own preferred keyboard shortcuts.

![copy line down](/assets/docs/editing/tips-and-tricks/copy_line_down.gif)

### Move line up and down

Keyboard Shortcut: ⌥↑ (Windows, Linux Alt+Up) or ⌥↓ (Windows, Linux Alt+Down)

![move line up and down](/assets/docs/editing/tips-and-tricks/move_line.gif)

### Shrink / expand selection

Keyboard Shortcut: ⌃⇧⌘← (Windows, Linux Shift+Alt+Left) or ⌃⇧⌘→ (Windows, Linux Shift+Alt+Right)

![shrink expand selection](/assets/docs/editing/tips-and-tricks/shrink_expand_selection.gif)

You can learn more in the Basic Editing documentation.

### Go to Symbol in File

Keyboard Shortcut: ⇧⌘O (Windows, Linux Ctrl+Shift+O)

![Find by symbol](/assets/docs/editing/tips-and-tricks/find_by_symbol.gif)

You can group the symbols by kind by adding a colon, `@:`.

![group symbols by kind](/assets/docs/editing/tips-and-tricks/group_symbols_by_kind.png)

### Go to Symbol in Workspace

Keyboard Shortcut: ⌘T (Windows, Linux Ctrl+T)

![go to symbol in workspace](/assets/docs/editing/tips-and-tricks/go_to_symbol_in_workspace.png)

### Outline view

The Outline view in the File Explorer (default collapsed at the bottom) shows you the symbols of the currently open file.

![Outline view](/assets/docs/editing/tips-and-tricks/outline-view.png)

You can sort by symbol name, category, and position in the file, allowing quick navigation to symbol locations.

### Navigate to a specific line

Keyboard Shortcut: ⌃G (Windows, Linux Ctrl+G)

### Undo cursor position

Keyboard Shortcut: ⌘U (Windows, Linux Ctrl+U)

### Trim trailing whitespace

Keyboard Shortcut: ⌘K ⌘X (Windows, Linux Ctrl+K Ctrl+X)

![trailing whitespace](/assets/docs/editing/tips-and-tricks/trim_whitespace.gif)

### Transform text commands

You can change selected text to uppercase, lowercase, and title case with the **Transform** commands from the Command Palette.

![Transform text commands](/assets/docs/editing/tips-and-tricks/transform-text-commands.png)

### Code formatting

Currently selected source code: ⌘K ⌘F (Windows, Linux Ctrl+K Ctrl+F)

Whole document format: ⇧⌥F (Windows Shift+Alt+F, Linux Ctrl+Shift+I)

![code formatting](/assets/docs/editing/tips-and-tricks/code_formatting.gif)

### Code folding

Keyboard Shortcut: ⌥⌘[ (Windows, Linux Ctrl+Shift+[), ⌥⌘] (Windows, Linux Ctrl+Shift+]) and ⌘K ⌘L (Windows, Linux Ctrl+K Ctrl+L)

![code folding](/assets/docs/editing/tips-and-tricks/code_folding.gif)

You can also fold/unfold all regions in the editor with **Fold All** (⌘K ⌘0 (Windows, Linux Ctrl+K Ctrl+0)) and **Unfold All** (⌘K ⌘J (Windows, Linux Ctrl+K Ctrl+J)).

You can fold all block comments with **Fold All Block Comments** (⌘K ⌘/ (Windows, Linux Ctrl+K Ctrl+/)).

### Select current line

Keyboard Shortcut: ⌘L (Windows, Linux Ctrl+L)

### Navigate to beginning and end of file

Keyboard Shortcut: ⌘↑ (Windows, Linux Ctrl+Home) and ⌘↓ (Windows, Linux Ctrl+End)

### Open Markdown preview

In a Markdown file, use

Keyboard Shortcut: ⇧⌘V (Windows, Linux Ctrl+Shift+V)

![Markdown preview](/assets/docs/editing/tips-and-tricks/markdown-preview.png)

### Side by side Markdown edit and preview

In a Markdown file, use

Keyboard Shortcut: ⌘K V (Windows, Linux Ctrl+K V)

The preview and editor will synchronize with your scrolling in either view.

![side by side Markdown preview](/assets/docs/editing/tips-and-tricks/markdown-preview-side-by-side.png)

## IntelliSense

⌃Space (Windows, Linux Ctrl+Space) to trigger the Suggestions widget.

![intellisense](/assets/docs/editing/tips-and-tricks/intellisense.gif)

You can view available methods, parameter hints, short documentation, etc.

### Peek

Select a symbol then type ⌥F12 (Windows Alt+F12, Linux Ctrl+Shift+F10). Alternatively, you can use the context menu.

![peek](/assets/docs/editing/tips-and-tricks/peek.gif)

### Go to Definition

Select a symbol then type F12. Alternatively, you can use the context menu or Ctrl+click (Cmd+click on macOS).

![go to definition](/assets/docs/editing/tips-and-tricks/goto_definition.gif)

You can go back to your previous location with the **Go** > **Back** command or ⌃- (Windows Alt+Left, Linux Ctrl+Alt+-).

You can also see the type definition if you press Ctrl (Cmd on macOS) when you are hovering over the type.

### Go to References

Select a symbol then type ⇧F12 (Windows, Linux Shift+F12). Alternatively, you can use the context menu.

![peek references](/assets/docs/editing/tips-and-tricks/find_all_references.gif)

### Find All References view

Select a symbol then type ⇧⌥F12 (Windows, Linux Shift+Alt+F12) to open the References view showing all your file's symbols in a dedicated view.

### Rename Symbol

Select a symbol then type F2. Alternatively, you can use the context menu.

![rename symbol](/assets/docs/editing/tips-and-tricks/rename_symbol.gif)

### Search and modify

Besides searching and replacing expressions, you can also search and reuse parts of what was matched, using regular expressions with capturing groups. Enable regular expressions in the search box by clicking the **Use Regular Expression** `.*` button (⌥⌘R (Windows, Linux Alt+R)) and then write a regular expression and use parentheses to define groups. You can then reuse the content matched in each group by using `$1`, `$2`, etc. in the Replace field.

![search and modify](/assets/docs/editing/tips-and-tricks/search_and_modify.png)

### .eslintrc.json

Install the ESLint extension. Configure your linter however you'd like. Consult the ESLint specification for details on its linting rules and options.

Here is configuration to use ES6.

```
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "classes": true,
      "defaultParams": true
    }
  },
  "rules": {
    "no-const-assign": 1,
    "no-extra-semi": 0,
    "semi": 0,
    "no-fallthrough": 0,
    "no-empty": 0,
    "no-mixed-spaces-and-tabs": 0,
    "no-redeclare": 0,
    "no-this-before-super": 1,
    "no-undef": 1,
    "no-unreachable": 1,
    "no-use-before-define": 0,
    "constructor-super": 1,
    "curly": 0,
    "eqeqeq": 0,
    "func-names": 0,
    "valid-typeof": 1
  }
}
```

### package.json

See IntelliSense for your `package.json` file.

![package json intellisense](/assets/docs/editing/tips-and-tricks/package_json_intellisense.gif)

### Emmet syntax

Support for Emmet syntax.

![emmet syntax](/assets/docs/editing/tips-and-tricks/emmet_syntax.gif)

## Snippets

### Create custom snippets

**File** > **Preferences** > **Configure Snippets**, select the language, and create a snippet.

```
"create component": {
    "prefix": "component",
    "body": [
        "class $1 extends React.Component {",
        "",
        "\trender() {",
        "\t\treturn ($2);",
        "\t}",
        "",
        "}"
    ]
},
```

See more details in Creating your own Snippets.

## Git integration

Keyboard Shortcut: ⌃⇧G (Windows, Linux Ctrl+Shift+G)

Git integration comes "out-of-the-box" with VS Code. You can install other source control management (SCM) providers from the VS Code Extension Marketplace. This section describes the Git integration but much of the UI and gestures are common for other SCM providers.

## Git blame

VS Code shows git blame information inline in the editor and in the Status Bar. Hover over the Status Bar item or inline hint to view detailed git blame information.

![Screenshot that shows Git blame information when hovering over the git blame item in the Status Bar.](/assets/docs/editing/tips-and-tricks/scm-git-blame.png)

To enable or disable git blame information, use the **Git: Toggle Git Blame Editor Decoration** and **Git: Toggle Git Blame Status Bar Item** commands, or configure these settings:

*   git.blame.statusBarItem.enabled Open in VS Code Open in VS Code Insiders (enabled by default)
*   git.blame.editorDecoration.enabled Open in VS Code Open in VS Code Insiders

Learn more about git blame support in VS Code and how to customize the layout.

### Diffs

From the **Source Control** view, select a file to open the diff editor. Alternatively, select the **Open Changes** button in the top right corner to diff the current open file.

![git diff from source control](/assets/docs/editing/tips-and-tricks/msee-changes.gif)

#### Views

The default view for diffs is the **side by side view**.

Toggle **inline view** by selecting the **More Actions** (...) button in the top right, and then selecting **Inline View**.

![Screenshot that shows the More Actions menu in the diff editor, highlighting the Inline View menu item](/assets/docs/editing/tips-and-tricks/mdiff-switch-to-inline.png)

If you prefer to have the inline view as the default, configure the `"diffEditor.renderSideBySide": false` setting.

#### Accessible Diff Viewer

Navigate through diffs with F7 and ⇧F7 (Windows, Linux Shift+F7). This presents changes in a unified patch format. Lines can be navigated with arrow keys and pressing Enter jumps back in the diff editor and the selected line.

![diff\_review\_pane](/assets/docs/editing/tips-and-tricks/diff_review_pane.png)

#### Edit pending changes

While you're viewing changes in the diff editor, you can make edits directly in the pending changes side of the diff editor.

### Branches

Easily switch between Git branches via the Status Bar.

![switch branches](/assets/docs/editing/tips-and-tricks/switch-branch.gif)

### Staging

#### Stage file changes

Hover over the number of files and select the plus button to stage a file.

Select the minus button to unstage changes.

![git stage all](/assets/docs/editing/tips-and-tricks/stage-unstage.gif)

#### Stage selected

You can stage a portion of a file by making a text selection in a file and then choosing **Stage Selected Ranges** from the **Command Palette** or from the diff editor context menu (right-click).

### Undo last commit

Select the (...) button, and then select **Commit** > **Undo Last Commit** to undo the previous commit. The changes are added to the Staged Changes section.

![undo last commit](/assets/docs/editing/tips-and-tricks/mundo-last-commit.gif)

### See Git output

VS Code makes it easy to see what Git commands are actually running. This can be helpful when you're still learning Git or when you're debugging a difficult source control issue.

To view the Git output, select the (...) button in the Source Control view, and then select **Show Git Output**, use the **Git: Show Git Output** command, or use the **Toggle Output** command (⇧⌘U (Windows Ctrl+Shift+U, Linux Ctrl+K Ctrl+H)) and then select **Git** from the dropdown.

### Gutter indicators

The editor provides visual cues in the gutter about where and which changes (added, changed, or remove lines) were made. See the source control documentation for more details.

![git gutter indicators](/assets/docs/editing/tips-and-tricks/mgutter_icons.gif)

### Resolve merge conflicts

During a merge, go to the **Source Control** view (⌃⇧G (Windows, Linux Ctrl+Shift+G)) and make changes in the diff view.

You can resolve merge conflicts with the inline CodeLens which lets you **Accept Current Change**, **Accept Incoming Change**, **Accept Both Changes**, and **Compare Changes**.

![Git merge](/assets/docs/editing/tips-and-tricks/merge-conflict.png)

Learn more about resolving merge conflicts in the source control documentation.

### Set VS Code as default merge tool

```
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
```

### Set VS Code as default diff tool

```
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'
```

## Compare file with the clipboard

Keyboard Shortcut: ⌘K C (Windows, Linux Ctrl+K C)

Quickly compare the active file with the contents of the clipboard with the **File: Compare Active File with Clipboard** command in the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)).

## Debugging

### Configure debugger

From the Run and Debug view (⇧⌘D (Windows, Linux Ctrl+Shift+D)), select **create a launch.json file**, which prompts you to select the environment that matches your project (Node.js, Python, C++, and more). This generates a `launch.json` file in your workspace that contains the debugger configuration.

Node.js support is built-in and other environments require installing the appropriate language extensions. See the debugging documentation for more details.

![configure debugging](/assets/docs/editing/tips-and-tricks/configure-debug.png)

### Breakpoints and stepping through

Toggle a breakpoint by selecting the **editor margin** or by using F9 on the current line. Breakpoints in the editor margin are normally shown as red filled circles.

Once a debug session starts, the **Debug toolbar** appears on the top of the editor and enables you to step through or into the code while debugging. Learn more about debug actions in the debugging documentation.

![debug](/assets/docs/editing/tips-and-tricks/node_debug.gif)

### Data inspection

Variables can be inspected in the **VARIABLES** section of the **Run and Debug** view, by hovering over their source in the editor, or by using the debug console.

![data inspection](/assets/docs/editing/tips-and-tricks/debug_data_inspection.gif)

### Logpoints

Logpoints act much like breakpoints but instead of halting the debugger when they are hit, they log a message to the console. Logpoints are especially useful for injecting logging while debugging production servers that cannot be modified or paused.

Add a logpoint with the **Add Logpoint** command in the left editor gutter and it will be displayed as a "diamond" shaped icon. Log messages are plain text but can include expressions to be evaluated within curly braces ('{}').

![Logpoint set in the editor](/assets/docs/editing/tips-and-tricks/logpoint.png)

### Triggered breakpoints

A triggered breakpoint is a breakpoint that is automatically enabled once another breakpoint is hit. They can be very useful when diagnosing failure cases in code that happen only after a certain precondition.

Triggered breakpoints can be set by right-clicking on the glyph margin, selecting **Add Triggered Breakpoint**, and then choosing which other breakpoint enables the breakpoint.

## Task runner

Tasks in VS Code can be configured to run scripts and start processes so that these tools can be used from within VS Code without having to enter a command line or write new code.

### Auto detect tasks

Select **Terminal** from the top-level menu, run the command **Configure Tasks**, then select the type of task you'd like to run. This generates a `tasks.json` file with content like the following. See the Tasks documentation for more details.

```
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "install",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

There are occasionally issues with auto generation. Check out the documentation for getting things to work properly.

### Run tasks from the Terminal menu

Select **Terminal** from the top-level menu, run the command **Run Task**, and select the task you want to run. Terminate the running task by running the command **Terminate Task**

![task runner](/assets/docs/editing/tips-and-tricks/task_runner.gif)

### Define keyboard shortcuts for tasks

You can define a keyboard shortcut for any task. From the **Command Palette** (⇧⌘P (Windows, Linux Ctrl+Shift+P)), select **Preferences: Open Keyboard Shortcuts File**, bind the desired shortcut to the `workbench.action.tasks.runTask` command, and define the **Task** as `args`.

For example, to bind Ctrl+H to the `Run tests` task, add the following:

```
{
  "key": "ctrl+h",
  "command": "workbench.action.tasks.runTask",
  "args": "Run tests"
}
```

### Run npm scripts as tasks from the Explorer

From the Explorer view you can open a script in the editor, run it as a task, and launch it with the node debugger (when the script defines a debug option like `--inspect-brk`). The default action on click is to open the script. To run a script on a single click, set npm.scriptExplorerAction Open in VS Code Open in VS Code Insiders to `run`. Use the setting npm.exclude Open in VS Code Open in VS Code Insiders to exclude scripts in `package.json` files contained in particular folders.

![Filter problems](/assets/docs/editing/tips-and-tricks/script_explorer.png)

With the setting npm.enableRunFromFolder Open in VS Code Open in VS Code Insiders , you can enable to run npm scripts from the Explorer view context menu for a folder. The setting enables the command **Run NPM Script in Folder...** when a folder is selected. The command shows a Quick Pick list of the npm scripts contained in this folder and you can select the script to be executed as a task.

## Portable mode

VS Code has a Portable mode which lets you keep settings and data in the same location as your installation, for example, on a USB drive.

## Insiders builds

The Visual Studio Code team uses the Insiders version to test the latest features and bug fixes of VS Code. You can also use the Insiders version by downloading it here.

*   For Early Adopters - Insiders has the most recent code changes for users and extension authors to try out.
*   Frequent Builds - New builds every day with the latest bug fixes and features.
*   Side-by-side install - Insiders installs next to the Stable build allowing you to use either independently.

7/1/2026