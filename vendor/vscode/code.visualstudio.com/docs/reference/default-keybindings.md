# Default keyboard shortcuts reference

VS Code comes with a set of default keyboard shortcuts. This article lists common default keyboard shortcuts in VS Code.

For a full list of keyboard shortcuts, use either of these options within VS Code:

*   Select **Preferences: Open Default Keyboard Shortcuts (JSON)** in the Command Palette.
*   Open the Keyboard Shortcuts editor, and then select **Show System Keybindings** in the **More Actions** (**...**) menu.

Note

The following keys are rendered assuming a standard US keyboard layout. Get more information about using a different keyboard layout.

## Basic Editing

Command

Key

Command id

Cut line (empty selection)

⌘X (Windows, Linux Ctrl+X)

`editor.action.clipboardCutAction`

Copy line (empty selection)

⌘C (Windows, Linux Ctrl+C)

`editor.action.clipboardCopyAction`

Paste

⌘V (Windows, Linux Ctrl+V)

`editor.action.clipboardPasteAction`

Delete Line

⇧⌘K (Windows, Linux Ctrl+Shift+K)

`editor.action.deleteLines`

Insert Line Below

⌘Enter (Windows, Linux Ctrl+Enter)

`editor.action.insertLineAfter`

Insert Line Above

⇧⌘Enter (Windows, Linux Ctrl+Shift+Enter)

`editor.action.insertLineBefore`

Move Line Down

⌥↓ (Windows, Linux Alt+Down)

`editor.action.moveLinesDownAction`

Move Line Up

⌥↑ (Windows, Linux Alt+Up)

`editor.action.moveLinesUpAction`

Copy Line Down

⇧⌥↓ (Windows Shift+Alt+Down, Linux Ctrl+Shift+Alt+Down)

`editor.action.copyLinesDownAction`

Copy Line Up

⇧⌥↑ (Windows Shift+Alt+Up, Linux Ctrl+Shift+Alt+Up)

`editor.action.copyLinesUpAction`

Undo

⌘Z (Windows, Linux Ctrl+Z)

`undo`

Redo

⇧⌘Z (Windows, Linux Ctrl+Y)

`redo`

Add Selection To Next Find Match

⌘D (Windows, Linux Ctrl+D)

`editor.action.addSelectionToNextFindMatch`

Move Last Selection To Next Find Match

⌘K ⌘D (Windows, Linux Ctrl+K Ctrl+D)

`editor.action.moveSelectionToNextFindMatch`

Undo last cursor operation

⌘U (Windows, Linux Ctrl+U)

`cursorUndo`

Insert cursor at end of each line selected

⇧⌥I (Windows, Linux Shift+Alt+I)

`editor.action.insertCursorAtEndOfEachLineSelected`

Select all occurrences of current selection

⇧⌘L (Windows, Linux Ctrl+Shift+L)

`editor.action.selectHighlights`

Select all occurrences of current word

⌘F2 (Windows, Linux Ctrl+F2)

`editor.action.changeAll`

Select current line

⌘L (Windows, Linux Ctrl+L)

`expandLineSelection`

Insert Cursor Below

⌥⌘↓ (Windows Ctrl+Alt+Down, Linux Shift+Alt+Down)

`editor.action.insertCursorBelow`

Insert Cursor Above

⌥⌘↑ (Windows Ctrl+Alt+Up, Linux Shift+Alt+Up)

`editor.action.insertCursorAbove`

Jump to matching bracket

⇧⌘\ (Windows, Linux Ctrl+Shift+\)

`editor.action.jumpToBracket`

Indent Line

⌘] (Windows, Linux Ctrl+])

`editor.action.indentLines`

Outdent Line

⌘[ (Windows, Linux Ctrl+[)

`editor.action.outdentLines`

Go to Beginning of Line

Home

`cursorHome`

Go to End of Line

End

`cursorEnd`

Go to End of File

⌘↓ (Windows, Linux Ctrl+End)

`cursorBottom`

Go to Beginning of File

⌘↑ (Windows, Linux Ctrl+Home)

`cursorTop`

Scroll Line Down

⌃PageDown (Windows, Linux Ctrl+Down)

`scrollLineDown`

Scroll Line Up

⌃PageUp (Windows, Linux Ctrl+Up)

`scrollLineUp`

Scroll Page Down

⌘PageDown (Windows, Linux Alt+PageDown)

`scrollPageDown`

Scroll Page Up

⌘PageUp (Windows, Linux Alt+PageUp)

`scrollPageUp`

Fold (collapse) region

⌥⌘[ (Windows, Linux Ctrl+Shift+[)

`editor.fold`

Unfold (uncollapse) region

⌥⌘] (Windows, Linux Ctrl+Shift+])

`editor.unfold`

Toggle Fold region

⌘K ⌘L (Windows, Linux Ctrl+K Ctrl+L)

`editor.toggleFold`

Fold (collapse) all subregions

⌘K ⌘[ (Windows, Linux Ctrl+K Ctrl+[)

`editor.foldRecursively`

Unfold (uncollapse) all subregions

⌘K ⌘] (Windows, Linux Ctrl+K Ctrl+])

`editor.unfoldRecursively`

Fold (collapse) all regions

⌘K ⌘0 (Windows, Linux Ctrl+K Ctrl+0)

`editor.foldAll`

Unfold (uncollapse) all regions

⌘K ⌘J (Windows, Linux Ctrl+K Ctrl+J)

`editor.unfoldAll`

Add Line Comment

⌘K ⌘C (Windows, Linux Ctrl+K Ctrl+C)

`editor.action.addCommentLine`

Remove Line Comment

⌘K ⌘U (Windows, Linux Ctrl+K Ctrl+U)

`editor.action.removeCommentLine`

Toggle Line Comment

⌘/ (Windows, Linux Ctrl+/)

`editor.action.commentLine`

Toggle Block Comment

⇧⌥A (Windows Shift+Alt+A, Linux Ctrl+Shift+A)

`editor.action.blockComment`

Find

⌘F (Windows, Linux Ctrl+F)

`actions.find`

Replace

⌥⌘F (Windows, Linux Ctrl+H)

`editor.action.startFindReplaceAction`

Find Next

Enter

`editor.action.nextMatchFindAction`

Find Previous

⇧Enter (Windows, Linux Shift+Enter)

`editor.action.previousMatchFindAction`

Select All Occurrences of Find Match

⌥Enter (Windows, Linux Alt+Enter)

`editor.action.selectAllMatches`

Toggle Find Case Sensitive

⌥⌘C (Windows, Linux Alt+C)

`toggleFindCaseSensitive`

Toggle Find Regex

⌥⌘R (Windows, Linux Alt+R)

`toggleFindRegex`

Toggle Find Whole Word

⌥⌘W (Windows, Linux Alt+W)

`toggleFindWholeWord`

Toggle Use of Tab Key for Setting Focus

⌃⇧M (Windows, Linux Ctrl+M)

`editor.action.toggleTabFocusMode`

Toggle Word Wrap

⌥Z (Windows, Linux Alt+Z)

`editor.action.toggleWordWrap`

## Rich Languages Editing

Command

Key

Command id

Trigger Suggest

⌃Space (Windows, Linux Ctrl+Space)

`editor.action.triggerSuggest`

Trigger Parameter Hints

⇧⌘Space (Windows, Linux Ctrl+Shift+Space)

`editor.action.triggerParameterHints`

Format Document

⇧⌥F (Windows Shift+Alt+F, Linux Ctrl+Shift+I)

`editor.action.formatDocument`

Format Selection

⌘K ⌘F (Windows, Linux Ctrl+K Ctrl+F)

`editor.action.formatSelection`

Go to Definition

F12

`editor.action.revealDefinition`

Show Hover

⌘K ⌘I (Windows, Linux Ctrl+K Ctrl+I)

`editor.action.showHover`

Peek Definition

⌥F12 (Windows Alt+F12, Linux Ctrl+Shift+F10)

`editor.action.peekDefinition`

Open Definition to the Side

⌘K F12 (Windows, Linux Ctrl+K F12)

`editor.action.revealDefinitionAside`

Quick Fix

⌘. (Windows, Linux Ctrl+.)

`editor.action.quickFix`

Go to References

⇧F12 (Windows, Linux Shift+F12)

`editor.action.goToReferences`

Rename Symbol

F2

`editor.action.rename`

Replace with Next Value

⇧⌘. (Windows, Linux Ctrl+Shift+.)

`editor.action.inPlaceReplace.down`

Replace with Previous Value

⇧⌘, (Windows, Linux Ctrl+Shift+,)

`editor.action.inPlaceReplace.up`

Expand AST Selection

⌃⇧⌘→ (Windows, Linux Shift+Alt+Right)

`editor.action.smartSelect.expand`

Shrink AST Selection

⌃⇧⌘← (Windows, Linux Shift+Alt+Left)

`editor.action.smartSelect.shrink`

Trim Trailing Whitespace

⌘K ⌘X (Windows, Linux Ctrl+K Ctrl+X)

`editor.action.trimTrailingWhitespace`

Change Language Mode

⌘K M (Windows, Linux Ctrl+K M)

`workbench.action.editor.changeLanguageMode`

## Navigation

Command

Key

Command id

Show All Symbols

⌘T (Windows, Linux Ctrl+T)

`workbench.action.showAllSymbols`

Go to Line...

⌃G (Windows, Linux Ctrl+G)

`workbench.action.gotoLine`

Go to File..., Quick Open

⌘P (Windows, Linux Ctrl+P)

`workbench.action.quickOpen`

Go to Symbol...

⇧⌘O (Windows, Linux Ctrl+Shift+O)

`workbench.action.gotoSymbol`

Show Problems

⇧⌘M (Windows, Linux Ctrl+Shift+M)

`workbench.actions.view.problems`

Go to Next Error or Warning

F8

`editor.action.marker.nextInFiles`

Go to Previous Error or Warning

⇧F8 (Windows, Linux Shift+F8)

`editor.action.marker.prevInFiles`

Show All Commands

⇧⌘P (Windows, Linux Ctrl+Shift+P) or F1

`workbench.action.showCommands`

Navigate Editor Group History

⌃Tab (Windows, Linux Ctrl+Tab)

`workbench.action.quickOpenPreviousRecentlyUsedEditorInGroup`

Go Back

⌃- (Windows Alt+Left, Linux Ctrl+Alt+-)

`workbench.action.navigateBack`

Go back in Quick Input

⌃- (Windows Alt+Left, Linux Ctrl+Alt+-)

`workbench.action.quickInputBack`

Go Forward

⌃⇧- (Windows Alt+Right, Linux Ctrl+Shift+-)

`workbench.action.navigateForward`

Focus Breadcrumbs

⇧⌘; (Windows, Linux Ctrl+Shift+;)

`breadcrumbs.focus`

Focus and Select Breadcrumbs

⇧⌘. (Windows, Linux Ctrl+Shift+.)

`breadcrumbs.focusAndSelect`

## Editor/Window Management

Command

Key

Command id

New Window

⇧⌘N (Windows, Linux Ctrl+Shift+N)

`workbench.action.newWindow`

Close Window

⇧⌘W (Windows, Linux Alt+F4)

`workbench.action.closeWindow`

Close Editor

⌘W (Windows Ctrl+F4, Linux Ctrl+W)

`workbench.action.closeActiveEditor`

Close Folder

⌘K F (Windows, Linux Ctrl+K F)

`workbench.action.closeFolder`

Split Editor

⌘\ (Windows, Linux Ctrl+\)

`workbench.action.splitEditor`

Focus into First Editor Group

⌘1 (Windows, Linux Ctrl+1)

`workbench.action.focusFirstEditorGroup`

Focus into Second Editor Group

⌘2 (Windows, Linux Ctrl+2)

`workbench.action.focusSecondEditorGroup`

Focus into Third Editor Group

⌘3 (Windows, Linux Ctrl+3)

`workbench.action.focusThirdEditorGroup`

Focus into Editor Group on the Left

⌘K ⌘← (Windows, Linux Ctrl+K Ctrl+Left)

`workbench.action.focusLeftGroup`

Focus into Editor Group on the Right

⌘K ⌘→ (Windows, Linux Ctrl+K Ctrl+Right)

`workbench.action.focusRightGroup`

Move Editor Left

⌘K ⇧⌘← (Windows, Linux Ctrl+Shift+PageUp)

`workbench.action.moveEditorLeftInGroup`

Move Editor Right

⌘K ⇧⌘→ (Windows, Linux Ctrl+Shift+PageDown)

`workbench.action.moveEditorRightInGroup`

Move Active Editor Group Left

⌘K ← (Windows, Linux Ctrl+K Left)

`workbench.action.moveActiveEditorGroupLeft`

Move Active Editor Group Right

⌘K → (Windows, Linux Ctrl+K Right)

`workbench.action.moveActiveEditorGroupRight`

Move Editor into Next Group

⌃⌘→ (Windows, Linux Ctrl+Alt+Right)

`workbench.action.moveEditorToNextGroup`

Move Editor into Previous Group

⌃⌘← (Windows, Linux Ctrl+Alt+Left)

`workbench.action.moveEditorToPreviousGroup`

## File Management

Command

Key

Command id

New File

⌘N (Windows, Linux Ctrl+N)

`workbench.action.files.newUntitledFile`

Open File...

⌘O (Windows, Linux Ctrl+O)

`workbench.action.files.openFile`

Save

⌘S (Windows, Linux Ctrl+S)

`workbench.action.files.save`

Save All

⌥⌘S (Windows Ctrl+K S, Linux )

`saveAll`

Save As...

⇧⌘S (Windows, Linux Ctrl+Shift+S)

`workbench.action.files.saveAs`

Close

⌘W (Windows Ctrl+F4, Linux Ctrl+W)

`workbench.action.closeActiveEditor`

Close Group

⌘K W (Windows, Linux Ctrl+K W)

`workbench.action.closeEditorsInGroup`

Close All

⌘K ⌘W (Windows, Linux Ctrl+K Ctrl+W)

`workbench.action.closeAllEditors`

Reopen Closed Editor

⇧⌘T (Windows, Linux Ctrl+Shift+T)

`workbench.action.reopenClosedEditor`

Keep Open

⌘K Enter (Windows, Linux Ctrl+K Enter)

`workbench.action.keepEditor`

Copy Path of Active File

⌘K P (Windows, Linux Ctrl+K P)

`workbench.action.files.copyPathOfActiveFile`

Reveal Active File in Windows

⌘K R (Windows, Linux Ctrl+K R)

`workbench.action.files.revealActiveFileInWindows`

## Display

Command

Key

Command id

Toggle Full Screen

⌃⌘F (Windows, Linux F11)

`workbench.action.toggleFullScreen`

Toggle Zen Mode

⌘K Z (Windows, Linux Ctrl+K Z)

`workbench.action.toggleZenMode`

Leave Zen Mode

Escape Escape

`workbench.action.exitZenMode`

Zoom in

⌘= (Windows, Linux Ctrl+=)

`workbench.action.zoomIn`

Zoom out

⌘- (Windows, Linux Ctrl+-)

`workbench.action.zoomOut`

Reset Zoom

⌘Numpad0 (Windows, Linux Ctrl+Numpad0)

`workbench.action.zoomReset`

Toggle Sidebar Visibility

⌘B (Windows, Linux Ctrl+B)

`workbench.action.toggleSidebarVisibility`

Show Explorer / Toggle Focus

⇧⌘E (Windows, Linux Ctrl+Shift+E)

`workbench.view.explorer`

Show Search

⇧⌘F (Windows, Linux Ctrl+Shift+F)

`workbench.view.search`

Show Source Control

⌃⇧G (Windows, Linux Ctrl+Shift+G)

`workbench.view.scm`

Show Run

⇧⌘D (Windows, Linux Ctrl+Shift+D)

`workbench.view.debug`

Show Extensions

⇧⌘X (Windows, Linux Ctrl+Shift+X)

`workbench.view.extensions`

Show Output

⇧⌘U (Windows Ctrl+Shift+U, Linux Ctrl+K Ctrl+H)

`workbench.action.output.toggleOutput`

Quick Open View

⌃Q (Windows Ctrl+Q, Linux )

`workbench.action.quickOpenView`

Open New Command Prompt

⇧⌘C (Windows, Linux Ctrl+Shift+C)

`workbench.action.terminal.openNativeConsole`

Toggle Markdown Preview

⇧⌘V (Windows, Linux Ctrl+Shift+V)

`markdown.togglePreview`

Open Preview to the Side

⌘K V (Windows, Linux Ctrl+K V)

`markdown.showPreviewToSide`

Toggle Integrated Terminal

⌃` (Windows, Linux Ctrl+`)

`workbench.action.terminal.toggleTerminal`

## Search

Command

Key

Command id

Show Search

⇧⌘F (Windows, Linux Ctrl+Shift+F)

`workbench.view.search`

Replace in Files

⇧⌘H (Windows, Linux Ctrl+Shift+H)

`workbench.action.replaceInFiles`

Toggle Match Case

⌥⌘C (Windows, Linux Alt+C)

`toggleSearchCaseSensitive`

Toggle Match Whole Word

⌥⌘W (Windows, Linux Alt+W)

`toggleSearchWholeWord`

Toggle Use Regular Expression

⌥⌘R (Windows, Linux Alt+R)

`toggleSearchRegex`

Toggle Search Details

⇧⌘J (Windows, Linux Ctrl+Shift+J)

`workbench.action.search.toggleQueryDetails`

Focus Next Search Result

F4

`search.action.focusNextSearchResult`

Focus Previous Search Result

⇧F4 (Windows, Linux Shift+F4)

`search.action.focusPreviousSearchResult`

Show Next Search Term

↓ (Windows, Linux Down)

`history.showNext`

Show Previous Search Term

↑ (Windows, Linux Up)

`history.showPrevious`

## Search Editor

Command

Key

Command id

Open Results In Editor

⌘Enter (Windows, Linux Alt+Enter)

`search.action.openInEditor`

Focus Search Editor Input

Escape

`search.action.focusQueryEditorWidget`

Search Again

⇧⌘R (Windows, Linux Ctrl+Shift+R)

`rerunSearchEditorSearch`

Delete File Results

⇧⌘Backspace (Windows, Linux Ctrl+Shift+Backspace)

`search.searchEditor.action.deleteFileResults`

## Preferences

Command

Key

Command id

Open Settings

⌘, (Windows, Linux Ctrl+,)

`workbench.action.openSettings`

Open Keyboard Shortcuts

⌘K ⌘S (Windows, Linux Ctrl+K Ctrl+S)

`workbench.action.openGlobalKeybindings`

Select Color Theme

⌘K ⌘T (Windows, Linux Ctrl+K Ctrl+T)

`workbench.action.selectTheme`

## Chat

Command

Key

Command id

Open Chat view

⌃⌘I (Windows, Linux Ctrl+Alt+I)

`workbench.action.chat.open`

Open chat in agent mode

⇧⌘I (Windows Ctrl+Shift+I, Linux Ctrl+Shift+Alt+I)

`workbench.action.chat.openagent`

Open editor inline chat

⌘I (Windows, Linux Ctrl+I)

`inlineChat.start`

Open terminal inline chat

⌘I (Windows, Linux Ctrl+I)

`workbench.action.terminal.chat.start`

Open quick chat

⇧⌥⌘L (Windows, Linux Ctrl+Shift+Alt+L)

`workbench.action.quickchat.toggle`

Open agent picker

⌘. (Windows, Linux Ctrl+.)

`workbench.action.chat.openModePicker`

Open language model picker

⌥⌘. (Windows, Linux Ctrl+Alt+.)

`workbench.action.chat.openModelPicker`

New chat session

⌘N (Windows, Linux Ctrl+N)

`workbench.action.chat.newChat`

Accept inline suggestion

Tab

`editor.action.inlineSuggest.commit`

## Debug

Command

Key

Command id

Toggle Breakpoint

F9

`editor.debug.action.toggleBreakpoint`

Start

F5

`workbench.action.debug.start`

Continue

F5

`workbench.action.debug.continue`

Start (without debugging)

⌃F5 (Windows, Linux Ctrl+F5)

`workbench.action.debug.run`

Pause

F6

`workbench.action.debug.pause`

Step Into

F11

`workbench.action.debug.stepInto`

## Tasks

Command

Key

Command id

Run Build Task

⇧⌘B (Windows, Linux Ctrl+Shift+B)

`workbench.action.tasks.build`

## Related resources

*   Customize keyboard shortcuts

7/1/2026