# GitHub Copilot frequently asked questions

This article answers frequently asked questions about using GitHub Copilot in Visual Studio Code.

## GitHub Copilot subscription

### How can I get a Copilot subscription?

There are different ways to get access to GitHub Copilot:

Type of User

Description

Individual

*   Set up GitHub Copilot Free to explore basic functionality at no cost with a monthly allowance of inline suggestions and AI credits.
*   Sign up for a paid GitHub Copilot plan for more flexibility and access to premium features.
*   See Setting up GitHub Copilot for yourself for all options.

Organization/Enterprise member

*   If you are a member of an organization or enterprise that has a subscription to GitHub Copilot, you can request access to Copilot by going to https://github.com/settings/copilot and requesting access under "Get Copilot from an organization."
*   See Setting up GitHub Copilot for your organization to enable Copilot for your organization.

### What's the advantage of signing in with a GitHub account?

Signing in with a GitHub account that has access to GitHub Copilot has the following benefits:

*   Higher monthly AI credits allowance
*   Access to premium language models in chat beyond auto model selection
*   Bring your own model keys (BYOK) to access more models
*   Remote repository indexing and semantic code search
*   Copilot code review
*   Copilot content exclusions
*   Delegate tasks to Copilot cloud agent for background execution

Depending on your Copilot plan, you might have different levels of access and limits. See GitHub Copilot plans for more information.

### How can I monitor my Copilot usage?

You can view the current Copilot usage in the Copilot status dashboard, available through the VS Code Status Bar. The dashboard shows the following information:

*   **Inline suggestions**: The percentage of inline suggestions quota you have used in the current month. Paid plans have an unlimited quota for inline suggestions.
*   **AI credits**: The percentage of your monthly AI credits allowance you have used in the current month.

Visit the GitHub Copilot documentation for more information about monitoring usage and entitlements. For tips on reducing credit consumption, see optimize AI credit usage.

### I reached my inline suggestions or AI credits limit

Your inline suggestions allowance and AI credits allowance reset every month. If you've only reached the AI credits limit, you can still use inline suggestions. Similarly, if you've reached the limit for inline suggestions, you can still use chat.

For users on Copilot Free, to access more inline suggestions and AI credits, you can sign up for a paid plan directly from VS Code. Alternatively, you can wait until the next month to continue using Copilot for free.

If you're on a paid plan and exhaust your AI credits, you can set a budget for additional usage and keep working, or wait until the next monthly cycle when your allowance resets. Learn more about what happens if you exceed your included AI credits in the GitHub Copilot documentation.

For tips on reducing credit consumption, see optimize AI credit usage.

### My Copilot subscription is not detected in VS Code

To use chat in Visual Studio Code, you must be signed into Visual Studio Code with a GitHub account that has access to GitHub Copilot.

*   If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account and sign in with another account. Use the **Accounts** menu in the Activity Bar for signing out of your current GitHub account. See Use a different GitHub account with Copilot for more information.
    
*   Verify that your Copilot subscription is still active in GitHub Copilot settings.
    
*   If you're using a Copilot plan for a managed user account on GHE.com, you'll need to update some settings before you sign in. See Using GitHub Copilot with an account on GHE.com.
    

### How can I switch accounts for Copilot

If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account in VS Code, and sign in with another account.

See Use a different GitHub account with Copilot for more information.

## General Copilot questions

### How can I remove Copilot from VS Code?

You can disable the built-in AI features in VS Code with the chat.disableAIFeatures Open in VS Code Open in VS Code Insiders setting, similar to how you configure other features in VS Code. This disables and hides features like chat or inline suggestions in VS Code and disables the Copilot extensions. You can configure the setting at the workspace or user level.

Alternatively, use the **Learn How to Hide AI Features** action from the Chat menu in the title bar to access the setting.

Note

If you have previously disabled the built-in AI features, your choice is respected upon updating to a new version of VS Code.

### Network and firewall configuration for Copilot

*   If you or your organization employs security measures like a firewall or proxy server, it may be beneficial to include certain domain URLs in an "allowlist" and open specific ports and protocols. Learn more about troubleshooting firewall settings for GitHub Copilot.
    
*   If you're working on company equipment and connecting to a corporate network, you may be connecting to the Internet via a VPN or an HTTP proxy server. In some cases, these types of network setups may prevent GitHub Copilot from connecting to GitHub's server. Learn more about troubleshooting network errors for GitHub Copilot.
    

### My request is rate-limited

This error suggests that you have exceeded the rate limit for Copilot requests. GitHub uses rate limits to ensure everyone has fair access to the Copilot service and to protect against abuse.

See Rate limits for GitHub Copilot for more information about rate limits and what to do if you are rate limited.

### Are there pre-release builds of the Copilot extensions?

Yes, you can switch to the pre-release (nightly) version of a Copilot extension to try the latest features and fixes. From the Extensions view, right-click or select the gear icon to bring up the context menu, and then select **Switch to Pre-Release Version**:

![Extensions view context menu with Switch to Pre-Release Version option](/assets/docs/agents/faq/switch-to-pre-release.png)

You can tell if you're running a pre-release version by the "Pre-release" badge in the extension details:

![Pre-release version of the GitHub Copilot extension](/assets/docs/agents/faq/copilot-ext-pre-release.png)

## Inline suggestions

### How do I enable or disable inline suggestions?

You can enable or disable inline suggestions in VS Code by using the checkboxes in the Copilot status dashboard from the VS Code Status Bar. You can enable or disable inline suggestions globally or for the file type of the active editor.

![Screenshot showing the VS Code status bar, highlighting the Copilot icon that indicates Copilot is active.](/assets/docs/agents/faq/copilot-disable-completions.png)

Alternatively, use the github.copilot.enable Open in VS Code Open in VS Code Insiders and github.copilot.nextEditSuggestions.enabled Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG settings to enable or disable inline suggestions and next edit suggestions, respectively. You can configure these settings at the workspace or user level.

### Inline suggestions are not working in the editor

*   Verify that GitHub Copilot is not disabled globally or for this language
*   Verify that your GitHub Copilot subscription is active and detected
*   Verify that your network settings are configured to allow connectivity to GitHub Copilot.
*   Verify that you have not reached the inline suggestions limit for the month with the Copilot Free plan.

## Chat

### Chat features aren't working for me

Verify the following requirements to ensure Chat features work in Visual Studio Code:

*   Make sure you are on the latest version of Visual Studio Code (run **Code: Check for Updates**).
*   Make sure you have the latest version of both the GitHub Copilot and GitHub Copilot Chat extensions.
*   Your GitHub account that is signed into VS Code must have an active Copilot subscription. Check your Copilot subscription.
*   Verify that you have not reached your AI credits limit for the month with the Copilot Free plan.

### Agents are not available in chat

Verify that agents are enabled in your VS Code settings: chat.agent.enabled Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG. It's possible that your organization has disabled this feature, verify with your administrator to have agents enabled.

### What can agents do in VS Code?

Agents handle complete coding tasks autonomously. They plan multi-step implementations, execute coordinated changes across multiple files, run terminal commands, invoke tools, and self-correct when they encounter errors. Use agents for feature implementation, architecture-level refactoring, framework migrations, debugging, and test generation. Learn more about using agents.

### Does Copilot work with large codebases and monorepos?

Yes. VS Code automatically indexes your workspace using semantic search, language intelligence (LSP), and GitHub's code search to provide deep understanding across your repository. For large repositories, remote indexing uses GitHub's index for fast, comprehensive results across related repositories. Use multi-root workspaces to scope context in monorepos, and custom instructions to describe your project's architecture. See best practices for large codebases.

### Can my organization control AI features and agent access?

Yes. Organization administrators can manage Copilot through enterprise AI settings and policies, including enabling or disabling agents, controlling model access, configuring content exclusions, and enforcing trust boundaries. See the GitHub Copilot Trust Center for compliance details.

### Are agents usage-limited?

Agents consume AI credits from your Copilot plan. Paid plans include a monthly AI credits allowance, and you can set a budget for additional usage if needed. You can run multiple agent sessions in parallel across local, background, and cloud environments. Users on the free plan have a monthly AI credits allowance. Learn more about usage-based billing and GitHub Copilot plans.

### Not all models are available in the language model picker

You can choose which models are available in the language model picker. Learn how to customize the language model picker.

Organizations can restrict access to certain models. If you believe a model should be available, contact your organization administrator.

### How do I prevent the Chat view from opening automatically?

By default, the Chat view opens in the Secondary Side Bar. When you close the Chat view for a workspace, VS Code remembers this setting and does not open the Chat view automatically the next time you open that workspace.

You can change the default visibility directly from the Chat view:

1.  Open the Chat view (⌃⌘I (Windows, Linux Ctrl+Alt+I)).
2.  Select the `...` icon in the top-right corner of the Chat view.
3.  Select **Show View by Default** to enable or disable the automatic opening of the Chat view.

You can also control the default visibility of the Secondary Side Bar with the workbench.secondarySideBar.defaultVisibility Open in VS Code Open in VS Code Insiders setting. Set it to `hidden` to prevent the Chat view from opening automatically.

## Troubleshooting and feedback

### How can I provide feedback on Copilot?

We track issues and feature requests for GitHub Copilot in VS Code in the microsoft/vscode GitHub repository. You can create issues in this repository or use the following feedback mechanisms in VS Code:

*   **Ghost text suggestions**
    
    Use the **Send Copilot Completion Feedback** action when hovering over a ghost text suggestion in the editor. In the Issue Reporter, provide a clear and detailed description of the issue, including steps to reproduce it.
    
    ![Screenshot that shows sending Copilot Ghost Text Feedback action in the editor.](/assets/docs/agents/faq/code-completions-feedback.png)
    
*   **Next edit suggestions**
    
    Select the **Feedback** action in the next edit suggestions menu in the editor gutter. In the Issue Reporter, provide a clear and detailed description of the issue, including steps to reproduce it.
    
    ![Screenshot that shows next edit suggestions menu in the editor gutter.](/assets/docs/agents/faq/nes-feedback.png)
    
*   **General issues**
    
    Open the VS Code Issue reporter (**Help menu** > **Report Issue**), select the **VS Code Extension** source, and then select the **GitHub Copilot Chat** extension. Provide a clear and detailed description of the issue, including steps to reproduce it.
    
    ![Screenshot that shows VS Code Issue Reporter with GitHub Copilot Chat selected.](/assets/docs/agents/faq/issue-reporter.png)
    

When you report an issue, follow the guidelines in our wiki to make sure your issue is actionable.

It can be helpful to include information from the Copilot logs if you're reporting an issue. Learn how to view logs and collect diagnostics.

## Additional resources

*   GitHub Copilot Trust Center
*   Security considerations for AI in VS Code
*   GitHub Copilot FAQ in the GitHub documentation

7/1/2026