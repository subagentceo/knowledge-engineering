# Personalize VS Code

VS Code is highly customizable. You can change the look of the editor with color and icon themes and assign the keyboard shortcuts you're most familiar with. Settings enable you to configure nearly every part of VS Code's editor, user interface, and functional behavior.

This article covers the following topics:

*   Configure settings
*   Change default keyboard shortcuts
*   Change the look of VS Code with themes
*   Change the display language

## Configure settings

Almost every aspect of VS Code can be customized via settings. Settings let you configure editor options such as enabling word wrapping or showing the minimap, setting up language-specific debugger settings, enabling Workspace Trust, and more. When you install extensions from the Visual Studio Marketplace, they might add their own extension settings.

The Settings editor (⌘, (Windows, Linux Ctrl+,)) provides a graphical interface to modify settings. When you modify settings, VS Code stores them in the `settings.json` file. Optionally, you can edit the `settings.json` file directly.

![Screenshot that shows the Settings editor, with the settings filtered by 'wordwrap'.](/assets/docs/getstarted/personalize-vscode/settings-search.png)

VS Code provides two types of settings. _User settings_ apply globally to any VS Code instance, while _workspace settings_ are stored with your project and apply only to that project. In the Settings editor, you can switch between user and workspace settings by using the corresponding tabs.

To modify a setting in VS Code with the Settings editor:

1.  Open the Settings editor via the **File** > **Preferences** > **Settings** menu or press ⌘, (Windows, Linux Ctrl+,).
    
2.  Search for the setting you want to change by using the tree view or by typing in the search bar.
    
3.  Modify the setting in the Settings editor.
    
    Tip
    
    To show the settings you've modified, select the **modified** filter value in the Settings editor search bar.
    

## Welcome page

By default, VS Code shows a welcome page when you start it. The welcome page provides quick access to common tasks such as opening recent projects, cloning repositories, and installing extensions.

You can customize what VS Code shows when you start it. If you frequently work with agent sessions, set the workbench.startupEditor Open in VS Code Open in VS Code Insiders setting to `agentSessionsWelcomePage` to show a welcome page with recent sessions, embedded chat, and quick actions. Learn more about the Agent Sessions Welcome Page.

Get more details about configuring settings in VS Code, such as configuring language-specific settings or syncing settings across machines.

## Change default keyboard shortcuts

VS Code lets you perform most tasks directly from the keyboard. When you install VS Code, it comes with a set of default keyboard shortcuts. Hover over a UI element in the VS Code interface to see its keyboard shortcut, if one's available. The Command Palette also shows the keyboard shortcut for commands that have a shortcut.

You can customize these default shortcuts or add new ones for your favorite commands and actions by using the Keyboard Shortcuts editor (⌘K ⌘S (Windows, Linux Ctrl+K Ctrl+S)).

![Video that shows how to open the Keyboard Shortcuts editor, search for commands, and modify shortcuts.](/assets/docs/getstarted/personalize-vscode/keyboard-shortcuts.gif)

To change a keyboard shortcut in VS Code with the Keyboard Shortcuts editor:

1.  Select **File** > **Preferences** > **Keyboard Shortcuts** or use the ⌘K ⌘S (Windows, Linux Ctrl+K Ctrl+S)shortcut to open the Keyboard Shortcuts editor.
2.  Select the pencil icon next to the command you want to change.
3.  Press the keys you want to assign as a shortcut for the command.

A _keymap extension_ enables you to modify the VS Code shortcuts to match those of your preferred editor. Select the **Preferences: Keymaps** command from the Command Palette to see a list of keymap extensions.

Get more details about configuring keyboard shortcuts in VS Code, such as specifying keyboard rules or running multiple commands.

## Change the look of VS Code with themes

Themes let you modify VS Code's appearance to match your preferences. VS Code comes with several built-in themes. You can install more themes from the Visual Studio Marketplace.

_Color themes_ enable you to modify the colors in the Visual Studio Code user interface to match your preferences and work environment. A theme affects both the VS Code user interface elements and the editor highlighting colors. VS Code supports both light and dark color themes to suit different lighting environments and personal preferences.

![Video that shows how to preview color themes from the Command Palette.](/assets/docs/getstarted/personalize-vscode/themes_hero.gif)

To change the color theme in VS Code:

1.  Open the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)).
2.  Type _color_, and then select **Preferences: Color Theme**.
3.  Use the Up and Down keys to preview color themes and use Enter to select one.
4.  Optionally, select **Browse Additional Color Themes** to browse the Visual Studio Marketplace for more color themes.

There are more theming options available in VS Code, such as File Icon themes or creating your own themes. Get more details about themes in VS Code.

## Change the display language

Visual Studio Code ships by default with English as the display language. You can change the display language by installing a Language Pack extension from the Visual Studio Marketplace.

VS Code detects the operating system's UI language and prompts you to install the appropriate Language Pack, if available on the Marketplace.

To change the current display language:

1.  Open the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)).
2.  Select the **Configure Display Language** command.
3.  Select your preferred language from the list.
4.  Restart VS Code when prompted.

Get more details about changing the display language in VS Code.

## Next steps

After personalizing VS Code, you can:

*   Explore key VS Code features with our Quickstart
*   Install extensions to add features for your programming language
*   Set up version control with Git
*   Configure debugging for your project

7/1/2026