# Tutorial: Get started with Visual Studio Code

In this tutorial, you learn about the key features of Visual Studio Code to help you get started quickly. You learn about the different components of the user interface, use an AI agent to build a web app, and explore how to enhance your setup with extensions. You also learn about configuring VS Code settings, using source control, and running and debugging your code.

Tip

If you prefer a video to learn about Visual Studio Code, you can watch the Getting Started video on our YouTube channel.

## Prerequisites

*   Download and install Visual Studio Code on your computer
*   Set up GitHub Copilot in VS Code
*   Install Node.js (for running and debugging JavaScript)

Tip

If you don't have a Copilot subscription yet, you can use Copilot for free by signing up for the Copilot Free plan and get a monthly limit of completions and chat interactions.

## Open a folder in VS Code

You can use VS Code to work on individual files to make quick edits, or you can open a folder, also known as a _workspace_.

Let's start by creating a folder and opening it in VS Code. You'll use this folder throughout the tutorial.

1.  Open Visual Studio Code and select **File** > **Open Folder...** from the menu to open a folder.
    
2.  Select **New Folder** and create a new folder named `vscode101`. Then select **Select Folder** (**Open** on macOS) to open the folder in VS Code.
    
    VS Code now considers the folder you've opened a workspace.
    
3.  On the Workspace Trust dialog, select **Yes, I trust the authors** to enable all features in the workspace.
    
    ![Screenshot that shows the Workspace Trust dialog.](/assets/docs/editing/getting-started/workspace-trust.png)
    
    Important
    
    Workspace Trust lets you decide whether code in your project folder can be executed by VS Code. When you download code from the internet, you should first review it to make sure it's safe to run. Get more info about Workspace Trust.
    
4.  You should now see the **Explorer** view on the left, showing the name of the folder.
    
    You'll use the Explorer view to view and manage the files and folders in your workspace.
    
    ![Screenshot of VS Code with the Explorer view opened and showing the vscode101 folder.](/assets/docs/editing/getting-started/vscode-folder-opened.png)
    

Tip

When you open a folder in VS Code, VS Code can restore the UI state for that folder, such as the open files, the active view, and the layout of the editor. You can also configure settings that only apply to that folder, or define debug configurations. Get more info about workspaces.

## Explore the user interface

Now that you have a folder open in VS Code, let's take a quick tour of the user interface.

### Switch between views with the Activity Bar

1.  Use the Activity Bar to switch between different views.
    
    ![Screenshot that highlights the Activity Bar.](/assets/docs/editing/getting-started/activity-bar.png)
    
    Tip
    
    Hover over the Activity Bar to see the name of each view and the corresponding keyboard shortcut. You can toggle a view open and closed by selecting the view again or pressing the keyboard shortcut.
    
2.  When you select a view in the Activity Bar, the **Primary Side Bar** opens to show view-specific information.
    
    For example, the Run and Debug view enables you to configure and start debugging sessions.
    
    ![Screenshot that shows the Activity Bar and the Run and Debug view in the Primary Side Bar.](/assets/docs/editing/getting-started/activity-bar-and-side-bar.png)
    
    Tip
    
    Notice the **Chat** view in the Activity Bar. This is where you interact with AI agents to generate code, ask questions, and more. You'll use it in the next step to build an app.
    

### View and edit files with the Editor

1.  Select the Explorer view in the Activity Bar, and select the **New File...** button to create a new file in your workspace.
    
    ![Screenshot that shows the New File button in the Explorer view.](/assets/docs/editing/getting-started/explorer-new-file.png)
    
2.  Enter the name `index.html` and press Enter.
    
    A file is added to your workspace and an Editor opens in the main area of the window.
    
    ![Screenshot that shows the Editor in the main area of the window.](/assets/docs/editing/getting-started/new-file-editor.png)
    
3.  Start typing some HTML code in the `index.html` file.
    
    As you type, you should see suggestions popping up that help you complete your code (_IntelliSense_). You can use the Up and Down keys to navigate the suggestions, and Tab to insert the selected suggestion.
    
4.  Add more files to your workspace and notice that each file opens a new Editor tab.
    
    You can open as many editors as you like and view them side by side vertically or horizontally. Learn more about side by side editing.
    
    ![Screenshot that shows multiple Editor tabs.](/assets/docs/editing/getting-started/multiple-editors.png)
    

### Access the terminal from the Panel area

1.  VS Code has an integrated terminal. Open it by pressing ⌃` (Windows, Linux Ctrl+`). You can also use the **View** > **Terminal** menu item.
    
    You can choose between different shells, such as PowerShell, Command Prompt, or Bash, depending on your operating system configuration.
    
    ![Screenshot that shows the Panel area with the Terminal view.](/assets/docs/editing/getting-started/vscode-panel.png)
    
2.  In the terminal, enter the following command to create a new file in your workspace.
    
    ```
    echo "Hello, VS Code" > greetings.txt
    ```
    
    The default working folder is the root of your workspace. Notice that the Explorer view automatically picks up and shows the new file.
    
    ![Screenshot that shows the Explorer view with the new file.](/assets/docs/editing/getting-started/terminal-new-file.png)
    
3.  You can open multiple terminals simultaneously. Select the **Launch Profile** dropdown to view the available shells and choose one.
    
    ![Screenshot that shows the Launch Profile dropdown with the available shells.](/assets/docs/editing/getting-started/terminal-launch-profile.png)
    

### Access commands with the Command Palette

1.  Open the **Command Palette** by pressing ⇧⌘P (Windows, Linux Ctrl+Shift+P). You can also use the **View** > **Command Palette** menu item.
    
    Many of the commands in VS Code are available through the Command Palette. When you install extensions, they can add extra commands to the Command Palette.
    
    ![Screenshot that shows the Command Palette.](/assets/docs/editing/getting-started/command-palette.png)
    
    Tip
    
    Notice that the Command Palette shows the default keyboard shortcut for commands that have one. You can use the keyboard shortcut to run the command directly.
    
2.  The Command Palette supports different modes of operation:
    
    1.  **Command mode (`>`)**: after the `>` symbol, start typing to filter the command list. For example, type `move terminal` to find commands to move the terminal to a new window.
        
        ![Screenshot that shows the Command Palette, listing the entries for moving the terminal.](/assets/docs/editing/getting-started/command-palette-move-terminal.png)
        
    2.  **Quick Open mode**: remove the `>` character and start typing to search for files in your workspace. You can use the ⌘P (Windows, Linux Ctrl+P) keyboard shortcut to open the Command Palette and start searching for files directly.
        
        ![Screenshot that shows the Quick Open feature in the Command Palette.](/assets/docs/editing/getting-started/quick-open.png)
        
    3.  **Symbol search mode (`#`)**: replace the `>` character by `#` to search for symbols like variables or functions in your code.
        

Tip

VS Code uses fuzzy matching to find files or commands. For example, typing `odks` returns the `Open Default Keyboard Shortcuts` command.

## Build an app with an AI agent

Visual Studio Code has built-in support for GitHub Copilot for AI-powered coding. AI agents can autonomously plan a solution, create and edit multiple files, run terminal commands, and iterate on errors, all from a single natural-language prompt. You describe what you want, and the agent does whatever is needed to get the job done.

Let's use agents to build a recipe list web app from a single prompt.

1.  Open the Chat view by pressing ⌃⌘I (Windows, Linux Ctrl+Alt+I).
    
2.  Select **Agent** from the dropdown in the Chat view. Agents enable the AI to autonomously create and edit files, run terminal commands, and more.
    
    ![Screenshot that shows the Agent mode selector in the Chat view.](/assets/docs/editing/getting-started/chat-agent-mode.png)
    
3.  Enter the following prompt in the chat input box:
    
    ```
    Create a recipe list app with HTML, CSS, and JavaScript in separate files. Include an input field to add recipes with a name and description, a list to display them, and a delete button for each item. Use modern styling. Add some sample recipes to the list.
    ```
    
    Note
    
    If you haven't set up GitHub Copilot yet, you are prompted to sign in to your GitHub account and set up Copilot before you can send the prompt. If you don't have a Copilot subscription, you're associated with a free account that gives you a monthly limit of completions and chat interactions.
    
4.  Press Enter to send the prompt.
    
    The agent starts generating the app. Notice how it creates multiple files, shows you the proposed changes, and might request approval to run terminal commands.
    
    ![Screenshot that shows the agent generating the recipe list app in the Chat view.](/assets/docs/editing/getting-started/agent-generating-app.png)
    
5.  Review the generated files and select **Keep** in the Chat view to accept all changes.
    

In the next step, you install an extension to host the app in an integrated browser.

## Enhance your setup with extensions

VS Code has a rich ecosystem of extensions that let you add languages, debuggers, and tools to your installation to support your development workflow. There are thousands of extensions available in the Visual Studio Marketplace.

Let's install an extension that helps with the recipe list app you just built.

1.  Select the **Extensions** view in the Activity Bar.
    
    The Extensions view enables you to browse and install extensions from within VS Code.
    
    ![Screenshot that shows the Extensions view, highlighting the Extensions icon in the Activity Bar.](/assets/docs/editing/getting-started/extensions-view.png)
    
2.  Enter _Live Preview_ in the Extension view search box. Select the **Live Preview** extension published by Microsoft, and then select the **Install** button.
    
    Live Preview launches a local development server with live reload for static and dynamic pages.
    
3.  Open the `index.html` file, right-click in the editor, and select **Show Preview**.
    
    Your recipe list app now opens in a browser. When you make changes to your code, the browser automatically refreshes to show the latest version.
    
    ![Screenshot that shows the recipe list app preview.](/assets/docs/editing/getting-started/recipe-list-preview.png)
    
4.  Continue the chat conversation by asking the agent to add a feature. Enter the following prompt:
    
    ```
    Add the ability to mark recipes as favorites with a star icon. Favorite recipes should appear at the top of the list.
    ```
    
    The agent modifies the existing files to add the new feature. This shows how you can iteratively build on your app with follow-up prompts.
    

Explore more AI features in VS Code with the Copilot Quickstart.

## Configure VS Code settings

You can customize almost every part of VS Code by configuring settings. You can use the **Settings Editor** to modify the settings in VS Code or directly modify the `settings.json` file.

1.  Press ⌘, (Windows, Linux Ctrl+,) to open the Settings Editor (or select the **File** > **Preferences** > **Settings** menu item).
    
    ![Screenshot that shows the Settings Editor.](/assets/docs/editing/getting-started/settings-editor.png)
    
    Tip
    
    Use the search box to filter the list of settings that are shown.
    
2.  By default, VS Code doesn't automatically save modified files. Select a value from the Auto Save dropdown to change this behavior.
    
    ![Screenshot that shows the Auto Save dropdown in the Settings Editor.](/assets/docs/editing/getting-started/settings-editor-auto-save.png)
    
    VS Code automatically applies changes to settings. When you modify a file in your workspace, it should now be automatically saved.
    
3.  To revert a setting to its default value, select the gear icon next to the setting and select **Reset Setting**.
    
    ![Screenshot that shows the gear icon next to a setting in the Settings Editor.](/assets/docs/editing/getting-started/settings-editor-reset-setting.png)
    
    Tip
    
    You can quickly find all modified settings by typing `@modified` in the search box or selecting the **Modified** filter.
    
4.  You can use the tabs in the Settings Editor to switch between **User** settings and **Workspace** settings.
    
    User settings apply across all your workspaces. Workspace settings only apply to the current workspace. Workspace settings override user settings. Get more information about settings in VS Code.
    

## Use source control

Visual Studio Code has integrated source control management (SCM) and includes Git support out-of-the-box.

Let's use the built-in Git support to commit the changes you've made previously.

1.  Select the **Source Control** view in the Activity Bar to open the Source Control view.
    
    ![Screenshot that shows the Source Control view, highlighting the button in the Activity Bar.](/assets/docs/editing/getting-started/source-control-view.png)
    
2.  Make sure you have Git installed on your computer. If you don't have Git installed, you'll see a button in the Source Control view to install it on your machine.
    
3.  Select **Initialize Repository** to create a new Git repository for your workspace.
    
    ![Screenshot that shows the Source Control view, highlighting the Initialize Repository button.](/assets/docs/editing/getting-started/source-control-initialize.png)
    
    After you initialize a repository, the Source Control view shows the changes you've made in your workspace.
    
4.  You can stage individual changes by hovering over a file and selecting `+` next to a file.
    
    ![Screenshot that shows the Source Control view with changes in the workspace.](/assets/docs/editing/getting-started/source-control-changes.png)
    
    Tip
    
    To stage all changes, hover over **Changes** and select the **Stage All Changes** button.
    
5.  Enter a commit message, for example `Add recipe list app`, and then select the **Commit** to commit the changes to your Git repository.
    
    ![Screenshot that shows the Source Control view with a commit message.](/assets/docs/editing/getting-started/source-control-commit.png)
    
    Tip
    
    Select **Graph** in the Source Control view to show a visual representation of the commit history of your Git repository.
    

There's a lot more to discover about source control in VS Code. Get more info about source control in VS Code.

## Run and debug your code

VS Code has built-in support for running and debugging JavaScript and Node.js applications. Let's use the debugger to step through the recipe list app that the agent generated.

Note

Because the agent generates code dynamically, the file names and function names in your project might differ from the examples shown here. Look for similar patterns in your own generated code.

1.  Open the JavaScript file that the agent created for your recipe list app (for example, `app.js` or `script.js`).
    
2.  Find the function that handles adding a recipe (for example, `addRecipe`). Place the cursor on the first line inside the function body and press F9 to set a breakpoint.
    
    A red dot appears in the left margin of the editor, indicating that a breakpoint is set. With a breakpoint, you can pause the execution of your program at a specific line of code.
    
    ![Screenshot that shows a breakpoint set in the addRecipe function in the JavaScript file.](/assets/docs/editing/getting-started/js-set-breakpoint.png)
    
3.  Open the Run and Debug view in the Activity Bar, select **Debug URL**, and enter the URL of your recipe list app preview (for example, `http://localhost:3000`).
    
    ![Screenshot that shows the Debug URL configuration in the Run and Debug view.](/assets/docs/editing/getting-started/debug-url.png)
    
    The debugger starts and launches a browser window with your app.
    
4.  When the breakpoint is hit, the execution pauses and VS Code highlights the current line.
    
    ![Screenshot that shows the program stopped at a breakpoint in the editor, highlighting the Variables view to inspect variables.](/assets/docs/editing/getting-started/vscode-debugging.png)
    
    Tip
    
    Inspect the values of variables by hovering over them in the editor while the execution is paused. You can view all variables at any time in the **Variables** view in the **Run and Debug** view.
    
5.  Use the Debug toolbar to step through the code. Press **Step Over** (F10) to execute the current line and move to the next one, or press **Continue** (F5) to resume execution.
    
    ![Screenshot that shows the Debug toolbar with the Continue button highlighted.](/assets/docs/editing/getting-started/debug-toolbar-play.png)
    

There are many more debugging features in VS Code, such as watch variables, conditional breakpoints, and launch configurations. Dive into the details of debugging in VS Code.

## Next steps

Congratulations! You've completed the tutorial and explored some of the key features of Visual Studio Code. Now that you've learned the basics of Visual Studio Code, get more info about how to:

*   Build your first app with AI
    
*   Explore different agent types
    
*   Discover and run unit tests for your code
    
*   Use the integrated terminal
    
*   Set up a remote development environment
    

7/1/2026