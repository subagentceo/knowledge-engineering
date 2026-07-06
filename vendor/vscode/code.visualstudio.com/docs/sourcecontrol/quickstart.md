# Quickstart: use source control in VS Code

Get up and running with Git in Visual Studio Code in minutes. This guide covers the essentials of setting up a repository, saving your changes, and syncing your code.

## Prerequisites

1.  **Install Git**: make sure Git is installed on your computer. Download Git
    
2.  **Open VS Code**: make sure you have the latest version of Visual Studio Code installed.
    

## Step 1: Open a project

You can start with an existing Git repository or a local project folder.

### Option A: Clone a repository locally

Clone a repository if you want to work on code that is already hosted on GitHub, Azure DevOps, or another Git provider. If you have previously cloned the repository, you can open the folder directly in VS Code and VS Code will detect the Git repository automatically.

To clone a repository in VS Code:

1.  Open the Source Control view (⌃⇧G (Windows, Linux Ctrl+Shift+G)) and select **Clone Repository**
    
    ![Screenshot of the Source Control view with the Clone Repository button highlighted.](/assets/docs/sourcecontrol/quickstart/clone-repository-url.png)
    
    Alternatively, open the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and enter `Git: Clone`.
    
2.  Enter the repository URL (for example, `https://github.com/microsoft/PowerToys`)
    
    If you're cloning from GitHub, you can also select **Clone from GitHub** and sign in to your GitHub account to see a list of your repositories.
    
3.  Select a parent folder on your computer to save the project
    
4.  Select **Open** when prompted to open the cloned repository in VS Code
    
5.  Confirm whether you trust the repository in the Workspace Trust dialog
    
    Caution
    
    Only trust repositories from sources you know. Untrusted code can potentially harm your computer.
    

### Option B: Initialize a repository in a local folder

To start a new project with Git, you can initialize a repository in an existing local folder. This option creates a new Git repository in your folder to track changes.

1.  Open your project folder in VS Code (**File** > **Open Folder...**).
    
2.  Open the Source Control view (⌃⇧G (Windows, Linux Ctrl+Shift+G)) and select **Initialize Repository**
    
    ![Screenshot of the Source Control view with the Initialize Repository button highlighted.](/assets/docs/sourcecontrol/quickstart/initialize-repository.png)
    
    Alternatively, open the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and enter `Git: Initialize Repository`.
    

## Step 2: Make changes and review

Git tracks changes to files in your project. The Source Control view in VS Code is your hub for managing these changes without using the command line.

Let's make a simple code change and use the Source Control view and diff editor to review it.

1.  Edit an existing file in your project, and save it.
    
    If you've just initialized a new repository, you can move on to the next step.
    
2.  Open the Source Control view (⌃⇧G (Windows, Linux Ctrl+Shift+G)).
    
    Notice that the changed file(s) are listed under **Changes** with a "U" (untracked) or "M" (modified) icon next to them. The source control icon in the Activity Bar also shows a badge with the number of affected files.
    
    ![Screenshot of the Source Control view showing a modified and new file under Changes.](/assets/docs/sourcecontrol/quickstart/git-modified-files.png)
    
3.  To review the changes to a file, select it in the Source Control view to open a diff editor.
    
    A diff editor shows the differences between the current version of the file and the last committed version. If the window is wide enough, the diff editor displays a side-by-side comparison, otherwise the changes are shown inline.
    
    ![Screenshot of the Diff Editor showing side-by-side changes between file versions.](/assets/docs/sourcecontrol/quickstart/diff-editor.png)
    
    Tip
    
    If you have a Copilot subscription, select the Code Review button in the Source Control view to perform an AI-powered code review of your changes before committing them.
    
    ![Screenshot of the Code Review button in the Source Control view.](/assets/docs/sourcecontrol/quickstart/ai-code-review-button.png)
    

## Step 3: Stage and commit

Git uses a two-step process to save changes: Stage (prepare) and Commit (save). In the Source Control view, changes are first listed under **Changes** and after staging them, they move to **Staged Changes** where they are ready to be committed.

1.  To stage your changes, do one of the following:
    
    *   Hover over a file in the **Changes** list and select **+** (plus) to stage it
        
        ![Screenshot of the Source Control view with the Stage Changes button highlighted.](/assets/docs/sourcecontrol/quickstart/stage-changes-button.png)
        
    *   Right-click a file in the **Changes** list and select **Stage Changes**
        
    *   Hover over the **Changes** header and select the **+** (plus) button to stage all changes at once
        
2.  (Optional) You can unstage changes or discard changes if needed:
    
    *   To unstage a file, hover over it in the **Staged Changes** list and select the **-** (minus) button
        
    *   To discard changes to a file, right-click it in the **Changes** list and select **Discard Changes**
        
3.  To commit your staged changes you can provide a commit message.
    
    1.  Enter a commit message in the text box at the top of the Source Control view.
        
        You can also use AI to generate a commit message based on your staged changes by selecting the sparkle icon in the commit message input box.
        
    2.  Select **Commit** to commit your changes to your Git history
        
        ![Screenshot of the Commit button in the Source Control view.](/assets/docs/sourcecontrol/quickstart/commit-button.png)
        
        After committing, the staged changes are cleared from the Source Control view and saved in your local Git history.
        
        Note
        
        Only staged changes are included in a commit. If you have unstaged changes, they remain listed under **Changes** for future commits.
        
4.  To view your commit history, select the **Source Control Graph** in the Source Control view.
    
    ![Screenshot of the Source Control Graph in the Source Control view.](/assets/docs/sourcecontrol/quickstart/source-control-graph.png)
    

## Step 4: Sync with the server

If your repository is connected to a remote server (for example, GitHub or Azure DevOps), you can sync your local commits with the remote repository.

1.  Open the Source Control view (⌃⇧G (Windows, Linux Ctrl+Shift+G))
    
2.  Select **Sync Changes** to pull the latest changes from the remote and push your local commits
    
    ![Screenshot of the Sync Changes button in the Source Control view.](/assets/docs/sourcecontrol/quickstart/sync-changes.png)
    
    Alternatively, the Status Bar shows sync status and enables you to sync changes by selecting the sync icon (rotating arrows).
    
3.  Select it to pull new changes from the server and push your commits.
    
4.  To pull or push individually, select the ellipsis menu (...) in the Source Control view and choose **Pull** or **Push**.
    
    ![Screenshot of the Pull and Push commands in the Source Control view ellipsis menu.](/assets/docs/sourcecontrol/quickstart/pull-push-commands.png)
    

Tip

If you started with a local folder (Option B) and want to save it to GitHub, use the **Publish to GitHub** button in the Source Control view.

## Next steps

Now that you know the basics, explore more features:

*   Branches and Worktrees - Learn about branch management and parallel development.
*   Repositories and Remotes - Learn about cloning, publishing, and syncing with remote repositories.
*   Resolve Merge Conflicts - Learn how to handle conflicts when merging branches.
*   Working with GitHub - Learn about Pull Requests and Issues.
*   Troubleshooting - Diagnose and resolve Git issues.
*   Source Control Overview - Full reference for source control features.

7/1/2026