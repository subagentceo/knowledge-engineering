# Troubleshoot AI in Visual Studio Code

This article covers diagnostic tools and techniques for troubleshooting AI-related issues in VS Code. Use these tools to identify problems with network connectivity, customization files, and AI responses.

## View logs for GitHub Copilot

The log files for the GitHub Copilot extension are stored in the standard log location for Visual Studio Code extensions. Use these logs to diagnose connection issues, extension errors, and unexpected behavior.

To view detailed logs:

1.  Open the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)).
2.  Run **Developer: Set Log Level** and set the value to **Trace** for the GitHub Copilot and GitHub Copilot Chat extensions.
3.  Run **Output: Show Output Channels** and select either **GitHub Copilot** or **GitHub Copilot Chat** from the list.
4.  In the Output panel, view the logs for the selected extension.

To switch between output channels, select **GitHub Copilot** or **GitHub Copilot Chat** from the dropdown menu on the right side of the Output panel.

## Collect network diagnostics

If you encounter problems connecting to GitHub Copilot, collect network connectivity diagnostics to identify firewall, proxy, or VPN issues.

1.  Open the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)).
2.  Run **GitHub Copilot: Collect Diagnostics**.
3.  An editor tab opens with diagnostic information you can review and share when reporting issues.

For more information about network configuration, see Network and firewall configuration for Copilot.

## Debug chat interactions

VS Code provides different tools to inspect what happens when you send a prompt to the AI.

*   **`/troubleshoot` slash command:**
    
    Ask the AI to analyze debug logs for chat sessions and agent host sessions. Use it to understand agent behavior, such as why custom instructions were ignored or why responses are slow. Type `/troubleshoot` followed by your question, such as `/troubleshoot how many tokens did I use?` or `/troubleshoot list all paths you tried to load customizations in #session`. Requires github.copilot.chat.agentDebugLog.enabled Open in VS Code Open in VS Code Insiders to be enabled.
    
    To diagnose an agent host session:
    
    1.  Open the Agents window.
    2.  In the chat input, type `/troubleshoot #session`.
    3.  Select the local or remote session that you want to troubleshoot.
    4.  Add a question or description of the issue, and then send the request.
*   **Agent Debug Log panel (Preview):**
    
    Shows a chronological event log of agent interactions during a chat session, including tool call sequences, LLM requests, token usage, prompt file discovery, and errors. This is the primary tool for understanding and debugging chat interactions.
    
    To open the Agent Debug Log panel:
    
    1.  Select the ellipsis (**...**) menu in the Chat view and select **Show Agent Debug Logs**.
    
    From the Agent Debug Log panel, you can attach a snapshot of the agent debug events to a chat conversation to ask the AI questions about the session and troubleshoot a specific interaction.
    
    Learn more about the Agent Debug Log panel.
    
*   **Cache Explorer:**
    
    Compares consecutive model requests to show where the prompt cache breaks. Use it when responses are slow or a session consumes more tokens than expected to check whether a low cache hit rate is the cause.
    
    Learn more about the Cache Explorer.
    
*   **Chat Debug view:**
    
    Shows the raw details of each LLM request and response, including the full system prompt, user prompt, context, and tool invocation payloads. Use this view to inspect the exact data sent to and received from the language model for each interaction.
    
    To open the Chat Debug view:
    
    1.  Select the overflow menu (`...`) in the Chat view.
    2.  Select **Show Chat Debug View**.

Learn more about the Chat Debug view.

## Troubleshoot MCP servers

MCP servers extend chat capabilities by connecting to external services. If an MCP server isn't working correctly, you can view its logs and restart it.

To troubleshoot MCP servers:

1.  Open the Command Palette and run **MCP: List Servers**.
2.  Select a server to view its status and available actions.
3.  Select **Show Output** to view the server's logs.
4.  Select **Restart Server** to restart a misbehaving server.

Learn more about configuring and debugging MCP servers.

## Provide feedback

If you encounter issues that you can't resolve, report them to help improve GitHub Copilot:

*   **Ghost text suggestions**: Hover over a ghost text suggestion in the editor and select **Send Copilot Completion Feedback**.
*   **Next edit suggestions**: Select the **Feedback** action in the next edit suggestions menu in the editor gutter.
*   **General issues**: Open **Help** > **Report Issue**, select **VS Code Extension**, and choose **GitHub Copilot Chat**.

When reporting issues, include relevant information from the Copilot logs to help diagnose the problem.

## Related resources

*   Debug chat interactions
*   Diagnose prompt caching with the Cache Explorer
*   Custom instructions
*   MCP servers
*   GitHub Copilot FAQ

7/1/2026