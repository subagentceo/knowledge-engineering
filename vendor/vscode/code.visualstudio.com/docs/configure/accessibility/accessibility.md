# Accessibility

Visual Studio Code has many features to help make the editor accessible to all users. Zoom levels and High Contrast colors improve editor visibility, keyboard-only navigation supports use without a mouse, and the editor is optimized for screen readers.

## Zoom

You can adjust the zoom level in VS Code with the **View** > **Appearance** > **Zoom** commands. Each **Zoom** command increases or decreases the zoom level by 20 percent.

*   **View** > **Appearance** > **Zoom In** (⌘= (Windows, Linux Ctrl+=)) - increase the zoom level.
*   **View** > **Appearance** > **Zoom Out** (⌘- (Windows, Linux Ctrl+-)) - decrease the zoom level.
*   **View** > **Appearance** > **Reset Zoom** (⌘Numpad0 (Windows, Linux Ctrl+Numpad0)) - reset the zoom level to 0.

> **Note**: If you are using a magnifier, hold down the Alt key while viewing the hover to move the cursor over the hover.

![Zoomed in editor](/assets/docs/configure/accessibility/accessibility/zoomed-in.png)

### Persisted zoom level

When you adjust the zoom level with the **View** > **Appearance** > **Zoom In / Out** commands, the zoom level is persisted in the window.zoomLevel Open in VS Code Open in VS Code Insiders setting. The default value is 0. Each increment above or below 0 represents zooming 20% in or out. You can also enter decimals to adjust the zoom level with a finer granularity.

## Accessibility help

The command **Open Accessibility Help** ⌥F1 (Windows Alt+F1, Linux Shift+Alt+F1) opens a help menu based on the current context. It currently applies to the editor, terminal, notebook, Chat view, and Inline Chat features.

You can dismiss the accessibility help menu or open additional documentation from within the help menu.

![When triggered in an editor, a dialog appears that explains how to enable screen reader mode explicitly, tab focus mode and other details](/assets/docs/configure/accessibility/accessibility/status.png)

## High Contrast theme

VS Code supports a High Contrast color theme on all platforms. Use **File** > **Preferences** > **Theme** > **Color Theme** (⌘K ⌘T (Windows, Linux Ctrl+K Ctrl+T)) to display the **Select Color Theme** dropdown and select the **High Contrast** theme.

![High Contrast Theme](/assets/docs/configure/accessibility/accessibility/high-contrast.png)

## Color vision accessibility

You can search for extensions in **Visual Studio Marketplace** that are compatible with color vision deficiency. Use the Extensions view ⇧⌘X (Windows, Linux Ctrl+Shift+X) and search for "color blind" to populate relevant options.

![Visual Studio Marketplace in VS Code UI](/assets/docs/configure/accessibility/accessibility/accessibility-extension-marketplace.png)

Once you have installed a color theme from the Marketplace, you can change the color theme with **File** > **Preferences** > **Theme** > **Color Theme** ⌘K ⌘T (Windows, Linux Ctrl+K Ctrl+T).

![Dropdown for Select Color Theme](/assets/docs/configure/accessibility/accessibility/accessibility-select-theme.png)

### Recommended themes for color vision accessibility

*   GitHub - Accessible to most forms of color blindness and matches the themes in GitHub's settings.
*   Gotthard - Optimized for approximately 20 programming languages.
*   Blinds - Created for people with deuteranopia, featuring a high contrast color ratio.
*   Greative - Considers both color blindness and light sensitivity.
*   Pitaya Smoothie - Accessible to most forms of color blindness and compliant with WCAG 2.1 criteria for color contrast.

## Customizing warning colors

The default Color Theme for VS Code is **Dark+**. However, you can customize both the theme and property colors in the user interface.

> **Note**: Go to Customizing a Color Theme for more information about overriding the colors in your current theme.

To customize the error and warning squiggles, go to **File** > **Preferences** > **Settings** for user settings. Search for "color customizations" to find the **Workbench: Color Customizations** setting, and open your user `settings.json` file by selecting **Edit in settings.json**.

![JSON file settings icon](/assets/docs/configure/accessibility/accessibility/accessibility-settings-json-file.png)

In your `settings.json` file, nest the following code inside the outermost curly braces. You can assign a color to each object by entering a hex code.

```
"workbench.colorCustomizations": {
    "editorError.foreground": "#ffef0f",
    "editorWarning.foreground": "#3777ff"
}
```

In the following example, the warning color is applied when a comma is missing after a JSON item.

![JSON code to alter error/warning squiggle colors](/assets/docs/configure/accessibility/accessibility/accessibility-extension-squiggles.png)

*   `editorError.foreground` - Overrides the wavy line beneath an error.
*   `editorWarning.foreground` - Overrides the wavy line beneath a warning.
*   `editorError.background` - Overrides the highlight color of an error.
*   `editorWarning.background` - Overrides the highlight color of a warning.

Assigning a color to the background of `editorError` and `editorWarning` also helps to identify potential issues. The color that you choose will highlight the respective error or warning. The colors shown in the preceding example, `#ffef0f` (yellow) and `#37777ff` (blue), are more accessible to individuals with common forms of color vision deficiencies.

### Selecting accessible colors

The accessibility of colors is subjective to the type of anomalous trichromacy (color blindness). The level of severity ranges per person and can be divided into four condition types:

Condition

Type

Deuteranopia

Reduced sensitivity to green light. It is the most common form of color blindness.

Protanopia

Reduced sensitivity to red light.

Tritanopia

Reduced sensitivity to blue light. This condition is considered rare.

Monochromia

The inability to see all colors, also referred to as achromatopsia. More information about the rarest form of color blindness: Foundation for Fighting Blindness.

One of the best approaches to selecting the best colors for a specific condition is to apply complementary colors. These are colors located opposite of one another on a color wheel.

![Color wheel highlighting complementary colors for regular vision, deuteranopia, protanopia, tritanopia and monochromacy](/assets/docs/configure/accessibility/accessibility/accessibility-color-wheels.png)

> **Note**: For more information on finding complementary colors, access the color blind simulator and interactive color wheel at Adobe Color.

## Dim unfocused editors and terminals

Unfocused views can be dimmed to make it clearer where typed input will go. This is especially useful when working with multiple editor groups or terminals. Turn on this feature by setting `"accessibility.dimUnfocused.enabled": true`. You can control the dimness level with accessibility.dimUnfocused.opacity Open in VS Code Open in VS Code Insiders , which takes the opacity fraction from 0.2 to 1 (default 0.75).

## Keyboard navigation

VS Code provides an exhaustive list of commands in the **Command Palette** (⇧⌘P (Windows, Linux Ctrl+Shift+P)) so that you can use VS Code without a mouse. Press ⇧⌘P (Windows, Linux Ctrl+Shift+P), then type a command name (for example 'git') to filter the list of commands.

VS Code also has many preset keyboard shortcuts for commands.

![Key bindings for commands are displayed at the end of the command palette entry](/assets/docs/configure/accessibility/accessibility/keyboard-shortcuts.png)

You can also set your own keyboard shortcuts. **File** > **Preferences** > **Keyboard Shortcuts** (⌘K ⌘S (Windows, Linux Ctrl+K Ctrl+S)) opens the Keyboard Shortcuts editor, where you can discover and modify keyboard shortcuts for VS Code actions. See Key Bindings for more details on customizing or adding your own keyboard shortcuts.

For quick navigation across the workbench, we recommend using **Focus Next Part** (F6) and **Focus Previous Part** (⇧F6 (Windows, Linux Shift+F6)) commands.

### Anchor selection

To make it easier to start and end selections with the keyboard, there are four commands: **Set Selection Anchor** (⌘K ⌘B (Windows, Linux Ctrl+K Ctrl+B)), **Select From Anchor to Cursor** (⌘K ⌘K (Windows, Linux Ctrl+K Ctrl+K)), **Cancel Selection Anchor** (Escape) and **Go to Selection Anchor**.

## Tab navigation

You can use the Tab key to navigate between UI controls in VS Code. Use Shift+Tab to tab in reverse order. As you tab through the UI controls, an indicator will appear around each UI element when it has focus.

All elements in the workbench support tab navigation. To avoid having too many tab stops, workbench toolbars and tab lists each have only one. Once a toolbar or a tab list has focus, you can use the arrow keys to navigate within them.

> **Note**: Tab navigation goes in the visually natural order, with the exception of WebViews (like Markdown preview). For WebViews, we recommend using the F6 and ⇧F6 (Windows, Linux Shift+F6) commands to navigate between the WebViews and the rest of the workbench. Alternatively, you can use one of many Focus Editor commands.

## Tab trapping

By default, pressing Tab within a source code file inserts the Tab character (or spaces depending on your indentation setting) and does not leave the open file. You can toggle Tab trapping with ⌃⇧M (Windows, Linux Ctrl+M), and subsequent Tab keys will move focus out of the file. When default Tab trapping is off, you will see a **Tab moves focus** indicator in the Status Bar.

Tab trapping also exists in the integrated terminal. The default behavior for the feature can be configured with editor.tabFocusMode Open in VS Code Open in VS Code Insiders .

![A Tab moves focus status bar item shows when the mode is active](/assets/docs/configure/accessibility/accessibility/tab-moves-focus.png)

You can also toggle Tab trapping on and off from the **Command Palette** (⇧⌘P (Windows, Linux Ctrl+Shift+P)) with the **Toggle Tab Key Moves Focus** action.

Read-only files never trap the Tab key. The **Integrated Terminal** panel respects the Tab trapping mode and can be toggled with ⌃⇧M (Windows, Linux Ctrl+M).

## Screen readers

VS Code supports screen readers in the editor using a strategy based on text pagination. The following screen readers have been tested:

*   Windows: NVDA and JAWS
*   macOS: VoiceOver
*   Linux: Orca

> For NVDA, we recommend that you stay in focus mode and use the hotkeys to navigate, instead of using browse mode.

The **Go to Next/Previous Error or Warning** actions (F8 and ⇧F8 (Windows, Linux Shift+F8)) allow screen readers to announce the error and warning messages.

When suggestions pop up, they are announced to screen readers. Navigate the suggestions using Ctrl+Up and Ctrl+Down and dismiss them with Shift+Escape. If suggestions get in your way, you can turn them off with the editor.quickSuggestions Open in VS Code Open in VS Code Insiders setting.

In the diff view pane, the **Go to Next/Previous Difference** actions (F7 and ⇧F7 (Windows, Linux Shift+F7)) will show the Accessible Diff Viewer with diffs presented in a unified patch format. Navigate through the unchanged, inserted, or deleted lines with Up and Down. Press Enter to return focus to the modified pane of the diff editor at the selected line number (or the closest line number that still exists, if a deleted line is selected). Use Escape or Shift+Escape to dismiss the Accessible Diff Viewer.

## Screen reader mode

When VS Code detects that a screen reader is being used, it goes into an optimized screen reader mode for UI such as the editor and Integrated Terminal. The Status bar will display **Screen Reader Optimized** in the lower right. You can exit screen reader mode by clicking on the display text or using the **Toggle Screen Reader Accessibility Mode** command.

![Activating the screen reader optimized status bar will show a notification that allows disabling the mode](/assets/docs/configure/accessibility/accessibility/screen-reader-mode.png)

Some features, such as folding and minimap (code overview), are disabled when in screen reader mode. You can control whether VS Code uses screen reader mode with the **Editor: Accessibility Support** setting ( editor.accessibilitySupport Open in VS Code Open in VS Code Insiders ) and the values are `on`, `off`, or the default `auto` that automatically detects a screen reader through querying the platform.

## Resize table columns via the keyboard

The `list.resizeColumn` command enables you to resize columns by using the keyboard. You can assign a keyboard shortcut to trigger this command.

When you trigger this command, select the column you want to resize, and provide a percentage of the width you want to set. The following video shows how to apply this to resize a column in the Keyboard Shortcuts editor.

## Accessible View

Run the command **Open Accessible View** ⌥F2 (Windows Alt+F2, Linux Shift+Alt+F2) to display an Accessible View and inspect content character by character, line by line. The Accessible View is currently available for hovers, notifications, comments, notebook output, terminal output, chat responses, inline completions, debug console output, and more.

## Input control and result navigation

Navigating between an input control (for example, search or filter input) and its results is consistent across the Extensions view, the Keyboard Shortcuts editor, and the Comments, Problems, and Debug Console panels using (⌘↓ (Windows, Linux Ctrl+Down)) and (⌘↑ (Windows, Linux Ctrl+Up)).

## Terminal accessibility

You can display terminal accessibility help via ⌥F1 (Windows Alt+F1, Linux Shift+Alt+F1), which describes useful tips when using a screen reader. One tip is to use ⌥F2 (Windows Alt+F2, Linux Shift+Alt+F2) to access the buffer in the terminal. This will automatically enter the screen reader's browse mode, depending on your screen reader, for an accessible view of the entire terminal buffer.

Use editor.tabFocusMode Open in VS Code Open in VS Code Insiders to control whether the terminal receives the Tab key instead of the workbench, similar to the editor.

### Shell integration

The terminal has a feature called shell integration that enables many additional features that are not found in other terminals. When using a screen reader, the Run Recent Command and Go to Recent Directory features are particularly useful.

Another shell integration powered command, **Go to Symbol in Accessible View** (⇧⌘O (Windows, Linux Ctrl+Shift+O)), lets you navigate between terminal commands similar to **Go to Symbol in Editor...** navigation in the editor.

### Minimum contrast ratio

Set terminal.integrated.minimumContrastRatio Open in VS Code Open in VS Code Insiders to a number between 1 and 21 to adjust text color luminance until the desired contrast ratio is met or pure white (`#FFFFFF`) black (`#000000`) is hit.

Note that the terminal.integrated.minimumContrastRatio Open in VS Code Open in VS Code Insiders setting will not apply to `powerline` characters.

## Status bar accessibility

Once focus is in the Status bar via **Focus Next Part** (F6), you can use arrow navigation to move focus between Status bar entries.

### Diff editor accessibility

There is an Accessible Diff Viewer in the Diff editor that presents changes in a unified patch format. You can navigate between changes with **Go to Next Difference** (F7) and **Go to Previous Difference** (⇧F7 (Windows, Linux Shift+F7)). Navigate lines with the arrow keys and press Enter to jump back in the Diff editor and the selected line.

## Debugger accessibility

The VS Code debugger UI is user accessible and has the following features:

*   Debug state changes are read out (for example, 'started', 'breakpoint hit', 'terminated', ...).
*   All debug actions are keyboard accessible.
*   Both the Run and Debug view and Debug Console support Tab navigation.
*   Debug hover is keyboard accessible (⌘K ⌘I (Windows, Linux Ctrl+K Ctrl+I)).
*   Keyboard shortcuts can be created to set focus to each debugger area.
*   While debugging and with the focus in an editor, invoking the **Debug: Add to Watch** command announces the variable's value.

## Accessibility Signals

Accessibility signals indicate if the current line has certain markers such as: errors, warnings, breakpoints, folded text regions or inline suggestions.

They are played when the primary cursor changes its line or the first time a marker is added to the current line. Accessibility Signal sounds and announcements may be enabled automatically when a screen reader is attached and can be controlled by the settings `accessibility.signals.*`.

The command **Help: List Signal Sounds** lists all available sounds, lets you hear each as you move through the list, and allows for configuring their enabled/disabled status.

Aria announcements also inform screen reader and braille users that certain markers have been hit. The command **Help: List Signal Announcements** informs the user of which are available and allows for configuring their enabled/disabled status.

## Hover accessibility

Some hovers cannot be hovered normally, which makes them hard to use with screen magnifiers. To work around this, hold the Alt or Option key while a hover is active to "lock" it in place so that it won't hide when hovered. Release the key to unlock the hover.

## Current known issues

VS Code has some known accessibility issues, depending on the platform. For the full list, go to VS Code accessibility issues.

### macOS

The editor includes screen reader support for VoiceOver.

### Linux

VS Code works well with the Orca screen reader. If Orca in your Linux distribution does not read the editor content:

*   Make sure to have the setting `"editor.accessibilitySupport": "on"` in VS Code. You can do this using settings, or by running the **Show Accessibility Help** command and pressing Ctrl+E to turn on accessibilitySupport.
*   If Orca is still silent, try setting `ACCESSIBILITY_ENABLED=1` as an environment variable.

After you enable that setting, VS Code should work with the Orca screen reader.

## Next steps

Read on to find out about:

*   Voice interactions - Learn how to use voice commands in VS Code.
*   Visual Studio Code User Interface - A quick orientation to VS Code.
*   Basic Editing - Learn about the powerful VS Code editor.
*   Code Navigation - Move quickly through your source code.

02/04/2026