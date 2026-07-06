# Tutorial: Work with agents in VS Code

This tutorial walks you through using different types of agents in Visual Studio Code. You build a todo app from scratch, add a theme toggle, and redesign the layout by delegating work across local, plan, background, and cloud agents.

Tip

If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the Copilot Free plan and get a monthly allowance of inline suggestions and AI credits.

## Prerequisites

To complete this tutorial, you need:

*   Visual Studio Code installed on your computer
    
*   AI features enabled in VS Code
    
*   A GitHub account (for cloud agent workflow)
    

## Step 1: Use a local agent to scaffold an app

In this step, you use a local agent to create the initial todo app structure. Local agents are ideal for interactive tasks where you want immediate feedback and results, such as scaffolding a new project or iterating on a new feature.

1.  Create a new project folder and ensure it's under Git version control.
    
    ```
    mkdir todo-app
    cd todo-app
    git init
    ```
    
2.  Open the project folder in VS Code.
    
3.  Open the Chat view (⌃⌘I (Windows, Linux Ctrl+Alt+I)) and select **Agent** from the Agents dropdown.
    
    Optionally, choose a specific language model if you have a preference.
    
    Important
    
    If you don't see the agent option, make sure agents are enabled in your VS Code settings ( chat.agent.enabled Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG). Your organization might also have disabled agents - contact your admin to enable this functionality.
    
4.  Enter the following prompt in the chat input field to scaffold the todo app and select **Send**.
    
    ```
    Create a simple todo app with HTML, CSS, and JavaScript. Include an input field to add todos, a list to display them, and a delete button for each item.
    ```
    
5.  Review as the agent generates the different files for the app. Use **Keep** or **Undo** to accept or reject changes as needed.
    
6.  Open the `index.html` file and select the **Preview** button to see the app in the integrated browser.
    
    ![Screenshot showing the Preview button in the top right corner of the editor when an HTML file is open.](/assets/docs/agents/agents-tutorial/preview-button.png)
    
7.  Send additional prompts to enhance the app further. Notice that the preview updates live as you make changes.
    
    For example, you can ask:
    
    ```
    Mark todos as completed with a strikethrough effect.
    ```
    

You now have a working todo app that you can extend with additional features. By using a local agent, you can interactively generate and refine your code in real-time.

## Step 2: Use Copilot CLI to implement a feature plan

In this step, you use the plan agent to create an implementation plan for a theme toggle and then hand off the implementation to Copilot CLI in the background. Copilot CLI is ideal for delegating tasks that don't require immediate interaction. They can use Git worktrees to isolate file changes from your main workspace and prevent conflicts.

1.  First, commit your current changes in the Source Control view to have a clean state.
    
2.  In the Chat view, select **New Chat (+)** > **New Chat** to start a new local agent session. Notice that your previous chat session is preserved in the sessions list.
    
3.  Select **Plan** from the Agents dropdown to switch to the plan agent and enter the following prompt:
    
    ```
    Create a plan to add a dark/light theme toggle to the app. The toggle should switch between themes and persist the user's preference.
    ```
    
4.  The plan agent might ask clarifying questions to refine the plan. Respond as needed.
    
5.  When you're ready, select **Start Implementation** > **Continue in Copilot CLI** to hand off the plan to Copilot CLI.
    
    ![Screenshot showing the Start Implementation button in the Chat view.](/assets/docs/agents/agents-tutorial/plan-agent-start-implementation-cli.png)
    
6.  Copilot CLI creates a Git worktree where it starts implementing the feature. When asked, select **Copy Changes** to make sure all current changes are available to Copilot CLI.
    
7.  You can track the Copilot CLI session in the **Sessions** view. Select the session to see details about its progress.
    
    Tip
    
    While Copilot CLI works in the background, you can continue editing your main workspace without conflicts.
    
8.  Once the agent finishes, select any of the changed files to review its changes, or select **View All Changes** to open a multi-file diff editor with all the changes.
    
    Tip
    
    You can send follow-up prompts to Copilot CLI to make adjustments or improvements to the feature.
    
9.  In the Chat view, select **Apply** to apply the changes to your main workspace.
    

You've successfully used Copilot CLI to perform a task autonomously in the background. You can start multiple Copilot CLI sessions for different tasks without interrupting your main workflow.

## Step 3: Use a cloud agent to collaborate on a feature

In this step, you use a cloud agent (Copilot cloud agent) to redesign the app layout and use pull requests and collaboration features in GitHub. Copilot cloud agent runs on remote infrastructure and are ideal for tasks that don't require immediate feedback, don't need to run locally, or involve collaboration through GitHub.

1.  First, publish the project to a GitHub repository and add it as a remote to use Copilot cloud agent on your project.
    
    1.  Run the **Publish to GitHub** command from the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and follow the prompts to create a new repository.
        
    2.  Run the **Git: Add Remote** command from the Command Palette and follow the prompts to add your GitHub repository as a remote.
        
2.  In the Chat view, select **New Chat (+)** > **New Chat**.
    
3.  Select **Cloud** from the session type dropdown to switch to a cloud agent and enter the following prompt:
    
    ```
    Redesign the todo app layout to improve user experience. Update colors, spacing, typography, and add animations to give it a modern look.
    ```
    
4.  The cloud agent starts a new session to work on your request. It creates a branch and pull request in your GitHub repository.
    
5.  You can track the cloud agent in the **Sessions** view in the Chat view or select the link to view the pull request details.
    
    Tip
    
    If you have the GitHub Pull Requests extension installed, you can also track the pull request progress in the **Copilot on my Behalf** view in the GitHub Pull Requests view.
    
6.  Once completed, the cloud agent assigns the pull request to you for review.
    
    ![Screenshot showing the cloud agent session details, with the file change details.](/assets/docs/agents/agents-tutorial/cloud-agent-pull-request.png)
    
7.  Right-click the cloud agent session in the **Sessions** view to view additional options or select the session and choose **Checkout** or **Apply**.
    

You've successfully used a cloud agent to collaborate on a feature using GitHub. Cloud agents enable you to use remote resources and collaborate on changes through GitHub issues and pull requests.

## Next steps

You've successfully used different types of agents to build, enhance, and redesign a todo app. Continue exploring agents:

*   Learn about agent types and when to use them
*   Plan and research tasks with the Plan agent
*   Explore creating custom agents

7/1/2026