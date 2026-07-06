# when clause contexts

Visual Studio Code sets various context keys and specific values depending on what elements are visible and active in the VS Code UI. These contexts can be used to selectively enable or disable extension commands and UI elements, such as menus and views.

For example, VS Code uses when clauses to enable or disable command keybindings, which you can see in the Default Keybindings JSON (**Preferences: Open Default Keyboard Shortcuts (JSON)**):

```
{ "key": "f5",  "command": "workbench.action.debug.start",
                   "when": "debuggersAvailable && !inDebugMode" },
```

Above, the built-in **Start Debugging** command has the keyboard shortcut F5, which is only enabled when there is an appropriate debugger available (context key `debuggersAvailable` is true) and the editor isn't in debug mode (context key `inDebugMode` is false).

## Conditional operators

A when clause can consist of a context key (for example, `inDebugMode`) or can use various operators to express more nuanced editor state.

### Logical operators

Logical operators allow combining simple context keys or when-clause expressions that include other logical, equality, comparison, match, `in`/`not in` operators or parenthesized expressions.

Operator

Symbol

Example

Not

`!`

`"!editorReadonly"` or `"!(editorReadonly || inDebugMode)"`

And

`&&`

`"textInputFocus && !editorReadonly"`

Or

`||`

`"isLinux` `||` `isWindows"`

Note on logical operator precedence: the above table lists operators in order of highest to lowest precedence. Examples:

Written as

Interpreted as

`!foo && bar`

`(!foo) && bar`

`!foo || bar`

`(!foo) || bar`

`foo || bar && baz`

`foo || (bar && baz)`

`!foo && bar || baz`

`(!foo && bar) || baz`

`!(foo || bar) && baz`

`(remains same) !(foo || bar) && baz`

### Equality operators

You can check for equality of a context key's value against a specified value. Note that the right-hand side is a value and not interpreted as a context key, meaning it is not looked up in the context.

Operator

Symbol

Example

Equality

`==`

`"editorLangId == typescript"` or `"editorLangId == 'typescript'"`

Inequality

`!=`

`"resourceExtname != .js"` or `"resourceExtname != '.js'"`

Notes:

*   If the value on the right-hand side is a string containing whitespace, it must be wrapped in single-quotes - `"resourceFilename == 'My New File.md'"`.
*   `===` has the same behavior as `==`, and `!==` has the same behavior as `!=`

### Comparison operators

You can compare a context key's value against a number. Note that left- and right-hand side of the operator must be separated by whitespace - `foo < 1`, but not `foo<1`.

Operator

Symbols

Example

Greater than

`>`, `>=`

`"gitOpenRepositoryCount >= 1"` but not `"gitOpenRepositoryCount>=1"`

Less than

`<`, `<=`

`"workspaceFolderCount < 2"` but not `"workspaceFolderCount<2"`

### Match operator

(previous name: key-value pair match operator)

Operator

Symbol

Example

Matches

`=~`

`"resourceScheme =~ /^untitled$|^file$/"`

There is a match operator (`=~`) for when clauses. The expression `key =~ regularExpressionLiteral` treats the right-hand side as a regular expression literal to match against the left-hand side. For example, to contribute context menu items for all Docker files, one could use:

```
   "when": "resourceFilename =~ /docker/"
```

Notes:

*   The right-hand side of the `=~` operator follows the same rules as regular expression literals (reference) in JavaScript, except characters need to follow escaping rules both of JSON strings and regular expressions. For example, a regular expression literal to match a substring `file://` would be `/file:\/\//` in JavaScript but `/file:\\/\\//` in a when clause because a backslash needs to be escaped in a JSON string and a slash needs to be escaped in the regular expression pattern.
*   There does not exist an operator `!=~`, but you can negate the match expression - `!(foo =~ /baz/)`.

#### Regular expression flags

It is possible to use flags with the regular expression literals. For example, `resourceFilename =~ /json/i` or `myContextKey =~ /baz/si`.

Supported flags: `i`, `s`, `m`, `u`.

Ignored flags: `g`, `y`.

### 'in' and 'not in' conditional operators

The `in` operator for when clauses allows for a dynamic lookup of a context key's value within another context key's value. For example, if you wanted to add a context menu command to folders that contain a certain type of file (or something that can't be statically known), you can now use the `in` operator to achieve it. You can use the `not in` operator to check the opposite condition.

Operator

Symbol

Example

In

`in`

`"resourceFilename in supportedFolders"`

Not in

`not in`

`"resourceFilename not in supportedFolders"`

First, determine which folders should support the command, and add the folder names to an array. Then, use the `setContext` command to turn the array into a context key:

```
vscode.commands.executeCommand('setContext', 'ext.supportedFolders', [
  'test',
  'foo',
  'bar'
]);

// or

// Note in this case (using an object), the value doesn't matter, it is based on the existence of the key in the object
// The value must be of a simple type
vscode.commands.executeCommand('setContext', 'ext.supportedFolders', {
  test: true,
  foo: 'anything',
  bar: false
});
```

Then, in the `package.json` you could add a menu contribution for the `explorer/context` menu:

```
// Note, this assumes you have already defined a command called ext.doSpecial
"menus": {
  "explorer/context": [
    {
      "command": "ext.doSpecial",
      "when": "explorerResourceIsFolder && resourceFilename in ext.supportedFolders"
    }
  ]
}
```

In that example, we are taking the value of `resourceFilename` (which is the name of the folder in this case) and checking for its existence in the value of `ext.supportedFolders`. If it exists, the menu will be shown. This powerful operator should allow for richer conditional and dynamic contributions that support `when` clauses, for example menus, views, etc.

## Available context keys

Below are some of the available context keys, which evaluate to Boolean true/false.

The list here isn't exhaustive and you can find other when clause contexts by searching and filtering in the Keyboard Shortcuts editor (**Preferences: Open Keyboard Shortcuts**) or reviewing the Default Keybindings JSON file (**Preferences: Open Default Keyboard Shortcuts (JSON)**). You can also identify context keys you are interested in using the Inspect Context Keys utility.

Context name

True when

**Editor contexts**

`editorFocus`

An editor has focus, either the text or a widget.

`editorTextFocus`

The text in an editor has focus (cursor is blinking).

`textInputFocus`

Any editor has focus (regular editor, debug REPL, etc.).

`inputFocus`

Any text input area has focus (editors or text boxes).

`editorTabMovesFocus`

Whether Tab will move focus out of the editor.

`editorHasSelection`

Text is selected in the editor.

`editorHasMultipleSelections`

Multiple regions of text are selected (multiple cursors).

`editorReadonly`

The editor is read only.

`editorLangId`

True when the editor's associated language ID matches.  
Example: `"editorLangId == typescript"`.

`isInDiffEditor`

The active editor is a difference editor.

`isInEmbeddedEditor`

True when the focus is inside an embedded editor.

**Operating system contexts**

`isLinux`

True when the OS is Linux.

`isMac`

True when the OS is macOS.

`isWindows`

True when the OS is Windows.

`isWeb`

True when accessing the editor from the Web.

**List contexts**

`listFocus`

A list has focus.

`listSupportsMultiselect`

A list supports multi select.

`listHasSelectionOrFocus`

A list has selection or focus.

`listDoubleSelection`

A list has a selection of 2 elements.

`listMultiSelection`

A list has a selection of multiple elements.

**Mode contexts**

`inSnippetMode`

The editor is in snippet mode.

`inQuickOpen`

The Quick Open dropdown has focus.

**Resource contexts**

`resourceScheme`

True when the resource Uri scheme matches.  
Example: `"resourceScheme == file"`

`resourceFilename`

True when the Explorer or editor filename matches.  
Example: `"resourceFilename == gulpfile.js"`

`resourceExtname`

True when the Explorer or editor filename extension matches.  
Example: `"resourceExtname == .js"`

`resourceDirname`

True when the Explorer or editor's resource absolute folder path matches.  
Example: `"resourceDirname == /users/alice/project/src"`

`resourcePath`

True when the Explorer or editor's resource absolute path matches.  
Example: `"resourcePath == /users/alice/project/gulpfile.js"`

`resourceLangId`

True when the Explorer or editor title language ID matches.  
Example: `"resourceLangId == markdown"`

`isFileSystemResource`

True when the Explorer or editor file is a file system resource that can be handled from a file system provider.

`resourceSet`

True when an Explorer or editor file is set.

`resource`

The full Uri of the Explorer or editor file.

**Explorer contexts**

`explorerViewletVisible`

True if Explorer view is visible.

`explorerViewletFocus`

True if Explorer view has keyboard focus.

`filesExplorerFocus`

True if File Explorer section has keyboard focus.

`openEditorsFocus`

True if OPEN EDITORS section has keyboard focus.

`explorerResourceIsFolder`

True if a folder is selected in the Explorer.

**Source control contexts**

`scmProvider`

True when the Source Control provider ID matches.  
Example: `"scmProvider == git"`.

`scmResourceGroup`

True when the Source Control resource group ID matches.  
Example: `"scmResourceGroup == merge"`.

`originalResourceScheme`

True when the original resource scheme in a Quick Diff editor matches.  
Example: `"originalResourceScheme == git"`.

**Editor widget contexts**

`findWidgetVisible`

Editor Find widget is visible.

`suggestWidgetVisible`

Suggestion widget (IntelliSense) is visible.

`suggestWidgetMultipleSuggestions`

Multiple suggestions are displayed.

`renameInputVisible`

Rename input text box is visible.

`referenceSearchVisible`

Peek References peek window is open.

`inReferenceSearchEditor`

The Peek References peek window editor has focus.

`config.editor.stablePeek`

Keep peek editors open (controlled by `editor.stablePeek` setting).

`codeActionMenuVisible`

Code Action menu is visible.

`parameterHintsVisible`

Parameter hints are visible (controlled by `editor.parameterHints.enabled` setting).

`parameterHintsMultipleSignatures`

Multiple parameter hints are displayed.

**Debugger contexts**

`debuggersAvailable`

An appropriate debugger extension is available.

`inDebugMode`

A debug session is running.

`debugState`

Active debugger state.  
Possible values are `inactive`, `initializing`, `stopped`, `running`.

`debugType`

True when debug type matches.  
Example: `"debugType == 'node'"`.

`inDebugRepl`

Focus is in the Debug Console REPL.

**Integrated terminal contexts**

`terminalFocus`

An integrated terminal has focus.

`terminalIsOpen`

An integrated terminal is opened.

**Task execution contexts**

`shellExecutionSupported`

True when VS Code can run `ShellExecution` tasks.

`processExecutionSupported`

True when VS Code can run `ProcessExecution` tasks.

`customExecutionSupported`

True when VS Code can run `CustomExecution` tasks.

**Timeline view contexts**

`timelineFollowActiveEditor`

True if the Timeline view is following the active editor.

**Timeline view item contexts**

`timelineItem`

True when the timeline item's context value matches.  
Example: `"timelineItem =~ /git:file:commit\\b/"`.

**Extension contexts**

`extension`

True when the extension's ID matches.  
Example: `"extension == eamodio.gitlens"`.

`extensionStatus`

True when the extension is installed.  
Example: `"extensionStatus == installed"`.

`extensionHasConfiguration`

True if the extension has configuration.

**Testing contexts**

`testId`

True when the current Testing item ID matches.

`controllerId`

True when the current Testing controller ID matches.

`testing.testItemHasUri`

True when the current Testing item is associated with a URI.

**Workspace contexts**

`virtualWorkspace`

True when the current workspace uses a virtual file system.

`isWorkspaceTrusted`

True when the current workspace is trusted.

**Global UI contexts**

`notificationFocus`

Notification has keyboard focus.

`notificationCenterVisible`

Notification Center is visible at the bottom right of VS Code.

`notificationToastsVisible`

Notification toast is visible at the bottom right of VS Code.

`searchViewletVisible`

Search view is open.

`sideBarVisible`

Side Bar is displayed.

`sideBarFocus`

Side Bar has focus.

`panelFocus`

Panel has focus.

`inZenMode`

Window is in Zen Mode.

`isCenteredLayout`

Editor is in centered layout mode.

`workbenchState`

Can be `empty`, `folder` (1 folder), or `workspace`.

`workspaceFolderCount`

Count of workspace folders.

`replaceActive`

Search view Replace text box is open.

`view`

For `view/title` and `view/item/context`, the view to display the command in.  
Example: `"view == myViewsExplorerID"`.

`viewItem`

For `view/item/context`, the `contextValue` from the tree item.  
Example: `"viewItem == someContextValue"`.

`webviewId`

For `webview/context`, the webview ID to display the command in.  
Example: `"webviewId == catCoding"`.

`webviewSection`

For `webview/context`, the section of the webview to display the command in.  
Example: `"webviewSection == 'editor'"`.

`isFullscreen`

True when window is in fullscreen.

`focusedView`

The identifier of the currently focused view.

`canNavigateBack`

True if it is possible to navigate back.

`canNavigateForward`

True if it is possible to navigate forward.

`canNavigateToLastEditLocation`

True if it is possible to navigate to the last edit location.

**Global Editor UI contexts**

`textCompareEditorVisible`

At least one diff (compare) editor is visible.

`textCompareEditorActive`

A diff (compare) editor is active.

`editorIsOpen`

True if one editor is open.

`groupEditorsCount`

Number of editors in a group.

`activeEditorGroupEmpty`

True if the active editor group has no editors.

`activeEditorGroupIndex`

A number starting from `1` reflecting the position of an editor group in the editor grid.  
The group with index `1` will be the first in the top-left corner.

`activeEditorGroupLast`

Will be `true` for the last editor group in the editor grid.

`multipleEditorGroups`

True when multiple editor groups are present.

`activeEditor`

The identifier of the active editor in a group.

`activeEditorIsDirty`

True when the active editor in a group is dirty.

`activeEditorIsNotPreview`

True when the active editor in a group is not in preview mode.

`activeEditorIsPinned`

True when the active editor in a group is pinned.

`inSearchEditor`

True when focus is inside a search editor.

`activeWebviewPanelId`

The id of the currently active webview panel.

`activeCustomEditorId`

The id of the currently active custom editor.

**Configuration settings contexts**

`config.editor.minimap.enabled`

True when the setting `editor.minimap.enabled` is `true`.

> **Note**: You can use any user or workspace setting that evaluates to a boolean here with the prefix `"config."`.

## Visible/focused view when clause context

You can have a when clause that checks if a specific View is visible or focused.

Context name

True when

`view.${viewId}.visible`

True when specific view is visible.  
Example: `"view.workbench.explorer.fileView.visible"`

`focusedView`

True when specific view is focused.  
Example: `"focusedView == 'workbench.explorer.fileView'"`

View identifiers:

*   `workbench.explorer.fileView` - File Explorer
*   `workbench.explorer.openEditorsView` - Open Editors
*   `outline` - Outline view
*   `timeline` - Timeline view
*   `workbench.scm` - Source Control
*   `workbench.scm.repositories` - Source Control Repositories
*   `workbench.debug.variablesView` - Variables
*   `workbench.debug.watchExpressionsView` - Watch
*   `workbench.debug.callStackView` - Call Stack
*   `workbench.debug.loadedScriptsView` - Loaded Scripts
*   `workbench.debug.breakPointsView` - Breakpoints
*   `workbench.debug.disassemblyView` - Disassembly
*   `workbench.views.extensions.installed` - Installed extensions
*   `extensions.recommendedList` - Recommended extensions
*   `workbench.panel.markers.view` - Problems
*   `workbench.panel.output` - Output
*   `workbench.panel.repl.view` - Debug Console
*   `terminal` - Integrated Terminal
*   `workbench.panel.comments` - Comments

## Visible view container when clause context

You can have a when clause that checks if a specific View Container is visible

Context name

True when

`activeViewlet`

True when view container is visible in the sidebar.  
Example: `"activeViewlet == 'workbench.view.explorer'"`

`activePanel`

True when view container is visible in the panel.  
Example: `"activePanel == 'workbench.panel.output'"`

`activeAuxiliary`

True when view container is visible in the secondary sidebar.  
Example: `"activeAuxiliary == 'workbench.view.debug'"`

View container identifiers:

*   `workbench.view.explorer` - File Explorer
*   `workbench.view.search` - Search
*   `workbench.view.scm` - Source Control
*   `workbench.view.debug` - Run
*   `workbench.view.extensions` - Extensions
*   `workbench.panel.markers` - Problems
*   `workbench.panel.output` - Output
*   `workbench.panel.repl` - Debug Console
*   `terminal` - Integrated Terminal
*   `workbench.panel.comments` - Comments

If you want a when clause that is enabled only when a specific view container has focus, use `sideBarFocus` or `panelFocus` or `auxiliaryBarFocus` in combination with `activeViewlet` or `activePanel` or `activeAuxiliary` context keys.

For example, the when clause below is true only when the File Explorer has focus:

```
"sideBarFocus && activeViewlet == 'workbench.view.explorer'"
```

## Check a setting in a when clause

In a when clause, you can reference a configuration (setting) value by prefixing it with `config.`, for example `config.editor.tabCompletion` or `config.breadcrumbs.enabled`.

## Add a custom when clause context

If you are authoring your own VS Code extension and need to enable/disable commands, menus, or views using a when clause context and none of the existing keys suit your needs, you can add your own context key with the `setContext` command.

The first example below sets the key `myExtension.showMyCommand` to true, which you can use in enablement of commands or with the `when` property. The second example stores a value that you could use with a when clause to check if the number of cool open things is greater than 2.

```
vscode.commands.executeCommand('setContext', 'myExtension.showMyCommand', true);

vscode.commands.executeCommand('setContext', 'myExtension.numberOfCoolOpenThings', 4);
```

## Inspect Context Keys utility

If you would like to see all currently active context keys at runtime, you can use the **Developer: Inspect Context Keys** command from the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)). **Inspect Context Keys** will display context keys and their values in the VS Code Developer Tools **Console** tab (**Help** > **Toggle Developer Tools**).

When you run **Developer: Inspect Context Keys**, your cursor will highlight elements in the VS Code UI and when you click on an element, the current context keys and their states will be output as an object to the Console.

![Inspect Context Keys output](/assets/api/references/when-clause-contexts/inspect-context-keys.png)

The list of active context keys is extensive and may contain custom context keys from extensions you have installed.

> **Note**: Some context keys are for VS Code internal use and may change in the future.

7/1/2026