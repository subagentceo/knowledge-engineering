# Asking GitHub Copilot questions in your IDE

Use Copilot Chat in your editor to give you code suggestions, explain code, generate unit tests, and suggest code fixes.

## Introduction

This guide describes how to use Copilot Chat and agents to automate coding tasks by breaking them into steps, using tools to read files, edit code, and run commands, and self-correcting when something goes wrong. You can also ask general questions about software development, or specific questions about the code in your project. For more information, see [About GitHub Copilot Chat](/en/copilot/concepts/about-github-copilot-chat).

<!-- --------------------- -->

<!-- VS Code -->

<!-- --------------------- -->

<div class="ghd-tool vscode">

## Prerequisites

* **Access to GitHub Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Latest version of Visual Studio Code**. See the [Visual Studio Code download page](https://code.visualstudio.com/Download?ref_product=copilot\&ref_type=engagement\&ref_style=text).
* **Sign in to GitHub in Visual Studio Code**. If you experience authentication issues, see [Troubleshooting common issues with GitHub Copilot](/en/copilot/troubleshooting-github-copilot/troubleshooting-issues-with-github-copilot-chat#troubleshooting-authentication-issues-in-your-editor).

If you have access to GitHub Copilot via your organization, you won't be able to use GitHub Copilot Chat if your organization owner has disabled chat. See [Managing policies and features for GitHub Copilot in your organization](/en/copilot/managing-github-copilot-in-your-organization/managing-policies-and-features-for-copilot-in-your-organization).

> \[!NOTE]
> If you don’t see the **Agent** option in the mode selector, your enterprise or organization administrator may have disabled agent mode for your IDE.

## Copilot Chat agents

You can use Copilot Chat in the following modes:

* [Agent mode](#agent-mode): to get Copilot to autonomously accomplish a set task.
* [Plan mode](#plan-mode): to get Copilot to create detailed implementation plans to ensure all requirements are met.
* [Ask mode](#ask-mode): to get answers to coding questions and get Copilot to provide code suggestions.

To switch between modes, use the agents dropdown at the bottom of the chat view.

### Agent mode

Use agent mode when you have a specific task in mind and want to enable Copilot to autonomously edit your code. In agent mode, Copilot determines which files to make changes to, offers code changes and terminal commands to complete the task, and iterates to remediate issues until the original task is complete.

Agent mode is best suited to use cases where:

* Your task is complex, and involves multiple steps, iterations, and error handling.
* You want Copilot to determine the necessary steps to take to complete the task.
* The task requires Copilot to integrate with external applications, such as an MCP server.

#### Using agents

1. If the chat view is not already displayed, select **Open Chat** from the Copilot Chat menu.
2. At the bottom of the chat view, ensure **Agent** is selected from the agents dropdown.
3. Submit a prompt. In response to your prompt, Copilot streams the edits in the editor, updates the working set, and if necessary, runs terminal commands, if necessary.
4. Review and iterate on changes or run a code review.

You can also [click this link](vscode://GitHub.Copilot-Chat/chat?mode=agent\&ref_product=copilot\&ref_type=engagement\&ref_style=text) to go directly to agent mode in VS Code. <!-- markdownlint-disable-line GHD003 -->

For more information, see [Chat overview](https://aka.ms/vscode-copilot-agent) in the Visual Studio Code documentation.

When you use agent mode, each prompt you enter counts as one premium request, multiplied by the model’s multiplier. For example, if you're using the included model—which has a multiplier of 0—your prompts won’t consume any premium requests. Copilot may take several follow-up actions to complete your task, but these follow-up actions do **not** count toward your premium request usage. Only the prompts you enter are billed—tool calls or background steps taken by the agent are not charged.

The total number of premium requests you use depends on how many prompts you enter and which model you select. See [Requests in GitHub Copilot](/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/monitoring-usage-and-entitlements/avoiding-unexpected-copilot-costs).

#### Using subagents

You can use subagents to delegate tasks to an isolated agent with its own context window within your chat session. The subagent operates independently without pausing for user feedback and returns the final result to the main chat session.

Subagents are best suited for situations where:

* You want to delegate complex, multi-step tasks like research or analysis without interrupting your main session.
* You need to process large amounts of information or multiple documents that would clutter your primary context window.
* You want to explore different approaches or perspectives independently without mixing contexts together.

Subagents use the same tools and AI model as the main session, but they cannot create other subagents.

#### Enabling subagents

1. In the Copilot Chat window, click the tools icon.
2. Enable the `runSubagent` tool.

If you use custom prompt files or custom agents, ensure you specify the `runSubagent` tool in the `tools` frontmatter property. See [Creating custom agents for Copilot cloud agent](/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents#creating-a-custom-agent-profile-in-visual-studio-code), and [Use prompt files in VS Code](https://code.visualstudio.com/docs/copilot/customization/prompt-files) in the Visual Studio Code documentation.

#### Invoking subagents

Subagents can be invoked in different ways:

* **Automatic delegation**. Copilot will analyze the description of your request, the description field of your configured custom agents, and the current context and available tools to automatically choose a subagent. For example, this prompt would automatically delegate the task to a **refactor-specialist** custom agent:

  ```text
  Suggest ways to refactor this legacy code.
  ```

* **Direct invocation**. You can directly call the subagent in your prompt:

  ```text
  Use the testing subagent to write unit tests for the authentication module.
  ```

* **Calling the #runSubagent tool.**

  ```text
  Evaluate the #file:databaseSchema using #runSubagent and generate an optimized data-migration plan.
  ```

When the subagent completes its task, its results appear back in the main chat session, ready for follow-up questions or next steps.

### Plan mode

Plan mode helps you to create detailed implementation plans before executing them. This ensures that all requirements are considered and addressed before any code changes are made. The plan agent does not make any code changes until the plan is reviewed and approved by you. Once approved, you can hand off the plan to the default agent or save it for further refinement, review, or team discussions.

The plan agent is designed to:

* Research the task comprehensively using read-only tools and codebase analysis to identify requirements and constraints.
* Break down the task into manageable, actionable steps and include open questions about ambiguous requirements.
* Present a concise plan draft, based on a standardized plan format, for user review and iteration.

#### Using the plan agent

1. If the chat view is not already displayed, select **Open Chat** from the Copilot Chat menu.

2. At the bottom of the chat view, select **Plan** from the agents dropdown.

3. Type a prompt that describes a task, such as adding a feature to an existing application, refactoring code, fixing a bug, or creating an initial version of a new application.

   For example: `Create a simple to-do web app with HTML, CSS, and JS files.`

   After a few moments, the plan agent outputs a plan in the chat view. The plan provides a high-level summary and a breakdown of steps, including any open questions for clarification.

4. Review the plan and answer any questions the agent has asked.

   You can iterate multiple times to clarify requirements, adjust scope, or answer questions.

5. Once the plan is complete you can:

   * Click **Start Implementation** to switch Copilot Chat to agent mode and start an agent session to implement the required changes, based on the implementation plan.
   * Click **Open in Editor** to switch Copilot Chat to agent mode and start an agent session that generates Markdown, in a tab of your editor, with the details of the implementation plan. You can start to work through the plan yourself, or save the plan as a Markdown file for later use.

For more information, see [Planning with agents in VS Code](https://code.visualstudio.com/docs/copilot/agents/planning) in the Visual Studio Code documentation.

### Ask mode

Ask mode is optimized for answering questions about your codebase, coding, and general technology concepts. Use ask mode when you want to understand how something works, explore ideas, or get help with coding tasks.

#### Using the ask agent

1. If the chat view is not already displayed, select **Open Chat** from the Copilot Chat menu.
2. At the bottom of the chat view, select **Ask** from the agents dropdown.
3. Type a prompt in the prompt box and press <kbd>Enter</kbd>.

## Submitting prompts

You can give the agent a high-level description of what you want to build and it gets to work. Each task runs inside an agent session, a persistent conversation you can track, pause, resume, or hand off to another agent.

1. To open the chat view, click the chat icon in the title bar of Visual Studio Code. If the chat icon is not displayed, right-click the title bar and make sure that **Command Center** is selected.

   ![Screenshot of the 'Copilot Chat' button, highlighted with a dark orange outline.](/assets/images/help/copilot/vsc-copilot-chat-icon.png)

2. Enter a prompt in the prompt box. For an introduction to the kinds of prompts you can use, see [Getting started with prompts for GitHub Copilot Chat in your IDE](/en/copilot/get-started/getting-started-with-prompts-for-copilot-chat).

3. Evaluate Copilot's response, and make a follow-up request if needed.

   The response may contain text, code blocks, buttons, images, URIs, and file trees. The response often includes interactive elements. For example, the response may include a menu to insert a code block, or a button to invoke a Visual Studio Code command.

   To see the files that Copilot Chat used to generate the response, select the **Used *n* references** dropdown at the top of the response. The references may include a link to a custom instructions file for your repository. This file contains additional information that is automatically added to all of your chat questions to improve the quality of the responses. For more information, see [Adding repository custom instructions for GitHub Copilot](/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot).

## Using keywords in your prompt

You can use special keywords to help Copilot understand your prompt. For examples, see [Getting started with prompts for GitHub Copilot Chat in your IDE](/en/copilot/get-started/getting-started-with-prompts-for-copilot-chat).

### Chat participants

Chat participants are like domain experts who have a specialty that they can help you with.

Copilot Chat can infer relevant chat participants based on your natural language prompt, improving discovery of advanced capabilities without you having to explicitly specify the participant you want to use in your prompt.

> \[!NOTE] Automatic inference for chat participants is currently in public preview and is subject to change.

Alternatively, you can manually specify a chat participant to scope your prompt to a specific domain. To do this, type `@` in the chat prompt box, followed by a chat participant name.

For a list of available chat participants, type `@` in the chat prompt box. See also [GitHub Copilot Chat cheat sheet](/en/copilot/using-github-copilot/github-copilot-chat-cheat-sheet?tool=vscode#chat-participants) or [Chat participants](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-participants) in the Visual Studio Code documentation.

### Slash commands

Use slash commands to avoid writing complex prompts for common scenarios. To use a slash command, type `/` in the chat prompt box, followed by a command.

To see all available slash commands, type `/` in the chat prompt box. See also [GitHub Copilot Chat cheat sheet](/en/copilot/using-github-copilot/github-copilot-chat-cheat-sheet?tool=vscode#slash-commands) or [Slash commands](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features#_slash-commands) in the Visual Studio Code documentation.

### Chat variables

Use chat variables to include specific context in your prompt. To use a chat variable, type `#` in the chat prompt box, followed by a chat variable.

To see all available chat variables, type `#` in the chat prompt box. See also [GitHub Copilot Chat cheat sheet](/en/copilot/using-github-copilot/github-copilot-chat-cheat-sheet?tool=vscode#chat-variables).

## Using GitHub skills for Copilot

Copilot's GitHub-specific skills expand the type of information Copilot can provide. To access these skills in Copilot Chat, include `@github` in your question.

When you add `@github` to a question, Copilot dynamically selects an appropriate skill, based on the content of your question. You can also explicitly ask Copilot Chat to use a particular skill. You can do this in two ways:

* Use natural language to ask Copilot Chat to use a skill. For example, `@github Search the web to find the latest GPT model from OpenAI.`
* To specifically invoke a web search you can include the `#web` variable in your question. For example, `@github #web What is the latest LTS of Node.js?`

You can generate a list of currently available skills by asking Copilot: `@github What skills are available?`

## Using Model Context Protocol (MCP) servers

You can use MCP to extend the capabilities of Copilot Chat by integrating it with a wide range of existing tools and services. For additional information, see [About Model Context Protocol (MCP)](/en/copilot/concepts/context/mcp).

## AI models for Copilot Chat

You can change the model Copilot uses to generate responses to chat prompts. You may find that different models perform better, or provide more useful responses, depending on the type of questions you ask. Options include premium models with advanced capabilities.  See [Changing the AI model for GitHub Copilot Chat](/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat).

## Additional ways to access Copilot Chat

In addition to submitting prompts through the chat view, you can submit prompts in other ways:

* **Quick chat:** To open the quick chat dropdown, enter <kbd>Shift</kbd>+<kbd>Optin</kbd>+<kbd>Command</kbd>+<kbd>L</kbd> (Mac) / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>L</kbd> (Windows/Linux).
* **Inline:** To start an inline chat directly in the editor or integrated terminal, enter <kbd>Command</kbd>+<kbd>i</kbd> (Mac) / <kbd>Ctrl</kbd>+<kbd>i</kbd> (Windows/Linux).
* **Smart actions:** To submit prompts via the context menu, right click in your editor, select **Copilot** in the menu that appears, then select one of the actions. Smart actions can also be accessed via the sparkle icon that sometimes appears when you select a line of code.

See [inline chat](https://code.visualstudio.com/docs/copilot/copilot-chat#_inline-chat), [quick chat](https://code.visualstudio.com/docs/copilot/copilot-chat#_quick-chat), and [chat smart actions](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-smart-actions) in the Visual Studio Code documentation for more details.

## Using images in Copilot Chat

> \[!NOTE]
>
> * If you're using a Copilot Business or Copilot Enterprise plan, the organization or enterprise that provides your plan must enable the **Editor preview features** setting. See [Managing policies and features for GitHub Copilot in your organization](/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization) or [Managing policies and features for GitHub Copilot in your enterprise](/en/copilot/managing-copilot/managing-copilot-for-your-enterprise/managing-policies-and-features-for-copilot-in-your-enterprise#configuring-policies-for-github-copilot).

You can attach images to your chat prompts and then ask Copilot about the images. For example, you can attach:

* A screenshot of a code snippet and ask Copilot to explain the code.
* A mockup of the user interface for an application and ask Copilot to generate the code.
* A flowchart and ask Copilot to describe the processes shown in the image.
* A screenshot of a web page and ask Copilot to generate HTML for a similar page.

> \[!NOTE]
> The following types of image file are supported: JPEG (`.jpg`, `.jpeg`), PNG (`.png`), GIF (`.gif`), or WEBP (`.webp`).

### Attaching images to your chat prompt

1. Do one of the following:

   * Copy an image and paste it into the chat view.
   * Drag and drop one or more image file from your operating system's file explorer—or from the Explorer in VS Code—into the chat view.
   * Right-click an image file in the VS Code Explorer and click **Copilot** then **Add File to Chat**.

2. Type your prompt into the chat view to accompany the image. For example, `explain this diagram`, `describe each of these images in detail`, `what does this error message mean`.

## Sharing feedback

To indicate whether a response was helpful, use the thumbs up and thumbs down icons that appear next to the response.

To leave feedback about the GitHub Copilot Chat extension, open an issue in the [microsoft/vscode-copilot-release](https://github.com/microsoft/vscode-copilot-release/issues) repository.

## Further reading

* [Prompt engineering for GitHub Copilot Chat](/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)
* [Using Copilot Chat in VS Code](https://code.visualstudio.com/docs/copilot/copilot-chat) and [Getting started with GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/getting-started) in the Visual Studio Code documentation
* [Asking GitHub Copilot questions in GitHub](/en/copilot/github-copilot-enterprise/copilot-chat-in-github/using-github-copilot-chat-in-githubcom)
* [Responsible use of GitHub Copilot Chat in your IDE](/en/copilot/github-copilot-chat/about-github-copilot-chat)
* [GitHub Terms for Additional Products and Features](/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot)
* [GitHub Copilot Trust Center](https://copilot.github.trust.page)
* [GitHub Copilot FAQ](https://github.com/features/copilot#faq)

</div>

<!-- --------------------- -->

<!-- Visual Studio -->

<!-- --------------------- -->

<div class="ghd-tool visualstudio">

## Prerequisites

* **Access to GitHub Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Visual Studio 2022 version 17.8 or later**. See [Install Visual Studio](https://learn.microsoft.com/visualstudio/install/install-visual-studio) in the Visual Studio documentation.

  * *For Visual Studio 17.8 and 17.9:*
    * **GitHub Copilot extension**. See [Install GitHub Copilot in Visual Studio](https://learn.microsoft.com/visualstudio/ide/visual-studio-github-copilot-install-and-states?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the Visual Studio documentation.
    * **GitHub Copilot Chat extension**. See [Install GitHub Copilot in Visual Studio](https://learn.microsoft.com/visualstudio/ide/visual-studio-github-copilot-install-and-states?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the Visual Studio documentation.

  *Visual Studio 17.10 and later have the GitHub Copilot and GitHub Copilot Chat extensions built in. You don't need to install them separately.*
* **Sign in to GitHub in Visual Studio**. If you experience authentication issues, see [Troubleshooting common issues with GitHub Copilot](/en/copilot/troubleshooting-github-copilot/troubleshooting-issues-with-github-copilot-chat#troubleshooting-authentication-issues-in-your-editor).

If you have access to GitHub Copilot via your organization, you won't be able to use GitHub Copilot Chat if your organization owner has disabled chat. See [Managing policies and features for GitHub Copilot in your organization](/en/copilot/managing-github-copilot-in-your-organization/managing-policies-and-features-for-copilot-in-your-organization).

## Submitting prompts

You can ask Copilot Chat to give you code suggestions, explain code, generate unit tests, and suggest code fixes.

1. In the Visual Studio menu bar, click **View**, then click **GitHub Copilot Chat**.
2. In the Copilot Chat window, enter a prompt, then press **Enter**. For example prompts, see [Getting started with prompts for GitHub Copilot Chat in your IDE](/en/copilot/get-started/getting-started-with-prompts-for-copilot-chat).
3. Evaluate Copilot's response, and submit a follow up prompt if needed.

   The response often includes interactive elements. For example, the response may include buttons to copy, insert, or preview the result of a code block.

   To see the files that Copilot Chat used to generate the response, click the **References** link below the response. The references may include a link to a custom instructions file for your repository. This file contains additional information that is automatically added to all of your chat questions to improve the quality of the responses. For more information, see [Adding repository custom instructions for GitHub Copilot](/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot).

## Using keywords in your prompt

You can use special keywords to help Copilot understand your prompt.

### Slash commands

Use slash commands to avoid writing complex prompts for common scenarios. To use a slash command, type `/` in the chat prompt box, followed by a command.

To see all available slash commands, type `/` in the chat prompt box. See also [GitHub Copilot Chat cheat sheet](/en/copilot/using-github-copilot/github-copilot-chat-cheat-sheet?tool=vscode#slash-commands) or [Slash commands](https://learn.microsoft.com/visualstudio/ide/copilot-chat-context#slash-commands) in the Visual Studio documentation.

### References

By default, Copilot Chat will reference the file that you have open or the code that you have selected. You can also use `#` followed by a file name, file name and line numbers, or `solution` to reference a specific file, lines, or solution.

See also [GitHub Copilot Chat cheat sheet](/en/copilot/using-github-copilot/github-copilot-chat-cheat-sheet?tool=visualstudio#references) or [Reference](https://learn.microsoft.com/visualstudio/ide/copilot-chat-context#reference) in the Visual Studio documentation.

## Using GitHub skills for Copilot (preview)

> \[!NOTE]
> The `@github` chat participant is currently in preview, and only available in [Visual Studio 2022 Preview 2](https://visualstudio.microsoft.com/vs/preview/) onwards.

Copilot's GitHub-specific skills expand the type of information Copilot can provide. To access these skills in Copilot Chat in Visual Studio, include `@github` in your question.

When you add `@github` to a question, Copilot dynamically selects an appropriate skill, based on the content of your question. You can also explicitly ask Copilot Chat to use a particular skill. For example, `@github Search the web to find the latest GPT4 model from OpenAI.`

You can generate a list of currently available skills by asking Copilot: `@github What skills are available?`

## Using Model Context Protocol (MCP) servers

You can use MCP to extend the capabilities of Copilot Chat by integrating it with a wide range of existing tools and services. For additional information, see [About Model Context Protocol (MCP)](/en/copilot/concepts/context/mcp).

## AI models for Copilot Chat

You can change the model Copilot uses to generate responses to chat prompts. You may find that different models perform better, or provide more useful responses, depending on the type of questions you ask. Options include premium models with advanced capabilities.  See [Changing the AI model for GitHub Copilot Chat](/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat).

## Additional ways to access Copilot Chat

In addition to submitting prompts through the chat window, you can submit prompts inline. To start an inline chat, right click in your editor window and select **Ask Copilot**.

See [Ask questions in the inline chat view](https://learn.microsoft.com/visualstudio/ide/visual-studio-github-copilot-chat#ask-questions-in-the-inline-chat-view) in the Visual Studio documentation for more details.

## Copilot Edits

> \[!NOTE]
>
> * This feature is currently in public preview and subject to change.
> * Available in Visual Studio 17.14 and later.

Copilot Edits lets you make changes across multiple files from a single Copilot Chat prompt

Use agent mode when you have a specific task in mind and want to enable Copilot to autonomously edit your code. In agent mode, Copilot determines which files to make changes to, offers code changes and terminal commands to complete the task, and iterates to remediate issues until the original task is complete.

### Using agent mode

1. In the Visual Studio menu bar, click **View**, then click **GitHub Copilot Chat**.
2. At the bottom of the chat panel, select **Agent** from the agents dropdown.
3. Submit a prompt. In response to your prompt, Copilot streams the edits in the editor, updates the working set, and if necessary, suggests terminal commands to run.
4. Review the changes. If Copilot suggested terminal commands, confirm whether or not Copilot can run them. In response, Copilot iterates and performs additional actions to complete the task in your original prompt.

When you use Copilot agent mode, each prompt you enter counts as one premium request, multiplied by the model’s multiplier. For example, if you're using the included model—which has a multiplier of 0—your prompts won’t consume any premium requests. Copilot may take several follow-up actions to complete your task, but these follow-up actions do **not** count toward your premium request usage. Only the prompts you enter are billed—tool calls or background steps taken by the agent are not charged.

## Using images in Copilot Chat

> \[!NOTE]
>
> * If you're using a Copilot Business or Copilot Enterprise plan, the organization or enterprise that provides your plan must enable the **Editor preview features** setting. See [Managing policies and features for GitHub Copilot in your organization](/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization) or [Managing policies and features for GitHub Copilot in your enterprise](/en/copilot/managing-copilot/managing-copilot-for-your-enterprise/managing-policies-and-features-for-copilot-in-your-enterprise#configuring-policies-for-github-copilot).

You can attach images to your chat prompts and then ask Copilot about the images. For example, you can attach:

* A screenshot of a code snippet and ask Copilot to explain the code.
* A mockup of the user interface for an application and ask Copilot to generate the code.
* A flowchart and ask Copilot to describe the processes shown in the image.
* A screenshot of a web page and ask Copilot to generate HTML for a similar page.

> \[!NOTE]
> The following types of image file are supported: JPEG (`.jpg`, `.jpeg`), PNG (`.png`), GIF (`.gif`), or WEBP (`.webp`).

### Attaching images to your chat prompt

1. If you see the AI model picker at the bottom right of the chat view, select one of the models that supports adding images to prompts:

2. Do one of the following:

   * Copy an image and paste it into the chat view.
   * Click the paperclip icon at the bottom right of the chat view, click **Upload Image**, browse to the image file you want to attach, select it and click **Open**.

   You can add multiple images if required.

3. Type your prompt into the chat view to accompany the image. For example, `explain this image`, or `describe each of these images in detail`.

## Sharing feedback

To share feedback about Copilot Chat, you can use the **Send feedback** button in Visual Studio. For more information on providing feedback for Visual Studio, see the [Visual Studio Feedback](https://learn.microsoft.com/en-us/visualstudio/ide/how-to-report-a-problem-with-visual-studio?view=vs-2022) documentation.

1. In the top right corner of the Visual Studio window, click the **Send feedback** button.

   ![Screenshot of the share feedback button in Visual Studio.](/assets/images/help/copilot/vs-share-feedback-button.png)

2. Choose the option that best describes your feedback.
   * To report a bug, click **Report a problem**.
   * To request a feature, click **Suggest a feature**.

## Further reading

* [Prompt engineering for GitHub Copilot Chat](/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)
* [Using GitHub Copilot Chat in Visual Studio in the Microsoft Learn documentation](https://learn.microsoft.com/visualstudio/ide/visual-studio-github-copilot-chat?view=vs-2022#use-copilot-chat-in-visual-studio)
* [Tips to improve GitHub Copilot Chat results in the Microsoft Learn documentation](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-chat-context?view=vs-2022)
* [Asking GitHub Copilot questions in GitHub](/en/copilot/github-copilot-enterprise/copilot-chat-in-github/using-github-copilot-chat-in-githubcom)
* [Responsible use of GitHub Copilot Chat in your IDE](/en/copilot/github-copilot-chat/about-github-copilot-chat)
* [GitHub Terms for Additional Products and Features](/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot)
* [GitHub Copilot Trust Center](https://copilot.github.trust.page)
* [GitHub Copilot FAQ](https://github.com/features/copilot#faq)

</div>

<!-- --------------------- -->

<!-- JetBrains -->

<!-- --------------------- -->

<div class="ghd-tool jetbrains">

## Prerequisites

* **Access to GitHub Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Compatible JetBrains IDE**. GitHub Copilot is compatible with the following IDEs:

  * IntelliJ IDEA (Ultimate, Community, Educational)
  * Android Studio
  * AppCode
  * CLion
  * Code With Me Guest
  * DataGrip
  * DataSpell
  * GoLand
  * JetBrains Client
  * MPS
  * PhpStorm
  * PyCharm (Professional, Community, Educational)
  * Rider
  * RubyMine
  * RustRover
  * WebStorm
  * Writerside

  See the [JetBrains IDEs](https://www.jetbrains.com/products/?ref_product=copilot\&ref_type=engagement\&ref_style=button) tool finder to download.
* **Latest version of the GitHub Copilot extension**. See the [GitHub Copilot plugin](https://plugins.jetbrains.com/plugin/17718-github-copilot?ref_product=copilot\&ref_type=engagement\&ref_style=text) in the JetBrains Marketplace. For installation instructions, see [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment).
* **Sign in to GitHub in your JetBrains IDE**. For authentication instructions, see [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment?tool=jetbrains#installing-the-github-copilot-plugin-in-your-jetbrains-ide).

If you have access to GitHub Copilot via your organization, you won't be able to use GitHub Copilot Chat if your organization owner has disabled chat. See [Managing policies and features for GitHub Copilot in your organization](/en/copilot/managing-github-copilot-in-your-organization/managing-policies-and-features-for-copilot-in-your-organization).

## Submitting prompts

You can ask Copilot Chat to give you code suggestions, explain code, generate unit tests, and suggest code fixes.

1. Open the Copilot Chat window by clicking the **GitHub Copilot Chat** icon at the right side of the JetBrains IDE window.

   ![Screenshot of the GitHub Copilot Chat icon in the Activity Bar.](/assets/images/help/copilot/jetbrains-copilot-chat-icon.png)

2. Enter a prompt in the prompt box. For example prompts, see [Getting started with prompts for GitHub Copilot Chat in your IDE](/en/copilot/get-started/getting-started-with-prompts-for-copilot-chat).

3. Evaluate Copilot's response, and submit a follow up prompt if needed.

   The response often includes interactive elements. For example, the response may include buttons to copy or insert a code block.

   To see the files that Copilot Chat used to generate the response, click the **References** link below the response. The references may include a link to a custom instructions file for your repository. This file contains additional information that is automatically added to all of your chat questions to improve the quality of the responses. For more information, see [Adding repository custom instructions for GitHub Copilot](/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot).

## Supplementing your prompt

You can use slash commands and file references to help Copilot understand your what you are asking it to do.

### Slash commands

Use slash commands to avoid writing complex prompts for common scenarios. To use a slash command, type `/` in the chat prompt box, followed by a command.

To see all available slash commands, type `/` in the chat prompt box. See also [GitHub Copilot Chat cheat sheet](/en/copilot/using-github-copilot/github-copilot-chat-cheat-sheet?tool=jetbrains#slash-commands-2).

### File references

By default, Copilot Chat will reference the file that you have open or the code that you have selected. You can also tell Copilot Chat which files to reference by dragging a file into the chat prompt box. Alternatively, you can right click on a file, select **GitHub Copilot**, then select **Reference File in Chat**.

## Using GitHub skills for Copilot

Copilot's GitHub-specific skills expand the type of information Copilot can provide. To access these skills in Copilot Chat, include `@github` in your question.

When you add `@github` to a question, Copilot dynamically selects an appropriate skill, based on the content of your question. You can also explicitly ask Copilot Chat to use a particular skill. You can do this in two ways:

* Use natural language to ask Copilot Chat to use a skill. For example, `@github Search the web to find the latest GPT model from OpenAI.`
* To specifically invoke a web search you can include the `#web` variable in your question. For example, `@github #web What is the latest LTS of Node.js?`

You can generate a list of currently available skills by asking Copilot: `@github What skills are available?`

## Using Model Context Protocol (MCP) servers

You can use MCP to extend the capabilities of Copilot Chat by integrating it with a wide range of existing tools and services. For additional information, see [About Model Context Protocol (MCP)](/en/copilot/concepts/context/mcp).

## AI models for Copilot Chat

You can change the model Copilot uses to generate responses to chat prompts. You may find that different models perform better, or provide more useful responses, depending on the type of questions you ask. Options include premium models with advanced capabilities.  See [Changing the AI model for GitHub Copilot Chat](/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat).

## Additional ways to access Copilot Chat

* **Built-in requests**. In addition to submitting prompts through the chat window, you can submit built-in requests by right clicking in a file, selecting **GitHub Copilot**, then selecting one of the options.
* **Inline**. You can submit a chat prompt inline, and scope it to a highlighted code block or your current file.
  * To start an inline chat, right click on a code block or anywhere in your current file, hover over **GitHub Copilot**, then select **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-plus" aria-label="plus" role="img"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path></svg> Copilot: Inline Chat**, or enter <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>.

## Copilot Edits

Use Copilot Edits to make changes across multiple files directly from a single Copilot Chat prompt. Copilot Edits has the following modes:

* [Edit mode](#edit-mode-1) lets Copilot make controlled edits to multiple files.
* [Agent mode](#agent-mode-1) lets Copilot autonomously accomplish a set task.

### Edit mode

Edit mode is only available in Visual Studio Code and JetBrains IDEs.

Use edit mode when you want more granular control over the edits that Copilot proposes. In edit mode, you choose which files Copilot can make changes to, provide context to Copilot with each iteration, and decide whether or not to accept the suggested edits after each turn.

Edit mode is best suited to use cases where:

* You want to make a quick, specific update to a defined set of files.
* You want full control over the number of LLM requests Copilot uses.

#### Using edit mode

1. To start an edit session, click **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg> Copilot** in the menu bar, then select **Open GitHub Copilot Chat**.
2. At the top of the chat panel, click **Copilot Edits**.
3. Add relevant files to the *working set* to indicate to GitHub Copilot which files you want to work on. You can add all open files by clicking **Add all open files** or individually search for single files.
4. Submit a prompt. In response to your prompt, Copilot Edits determines which files in your *working set* to change and adds a short description of the change.
5. Review the changes and **Accept** or **Discard** the edits for each file.

### Agent mode

Use agent mode when you have a specific task in mind and want to enable Copilot to autonomously edit your code. In agent mode, Copilot determines which files to make changes to, offers code changes and terminal commands to complete the task, and iterates to remediate issues until the original task is complete.

Agent mode is best suited to use cases where:

* Your task is complex, and involves multiple steps, iterations, and error handling.
* You want Copilot to determine the necessary steps to take to complete the task.
* The task requires Copilot to integrate with external applications, such as an MCP server.

#### Using agent mode

1. To start an edit session using agent mode, click **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg> Copilot** in the menu bar, then select **Open GitHub Copilot Chat**.
2. At the top of the chat panel, click the **Agent** tab.
3. Submit a prompt. In response to your prompt, Copilot streams the edits in the editor, updates the working set, and if necessary, suggests terminal commands to run.
4. Review the changes. If Copilot suggested terminal commands, confirm whether or not Copilot can run them. In response, Copilot iterates and performs additional actions to complete the task in your original prompt.

When you use agent mode, each prompt you enter counts as one premium request, multiplied by the model’s multiplier. For example, if you're using the included model—which has a multiplier of 0—your prompts won’t consume any premium requests. Copilot may take several follow-up actions to complete your task, but these follow-up actions do **not** count toward your premium request usage. Only the prompts you enter are billed—tool calls or background steps taken by the agent are not charged.

The total number of premium requests you use depends on how many prompts you enter and which model you select. See [Requests in GitHub Copilot](/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/monitoring-usage-and-entitlements/avoiding-unexpected-copilot-costs).

### Using subagents

You can use subagents to delegate tasks to an isolated agent with its own context window within your chat session. The subagent operates independently without pausing for user feedback and returns the final result to the main chat session.

Subagents are best suited for situations where:

* You want to delegate complex, multi-step tasks like research or analysis without interrupting your main session.
* You need to process large amounts of information or multiple documents that would clutter your primary context window.
* You want to explore different approaches or perspectives independently without mixing contexts together.

Subagents use the same tools and AI model as the main session, but they cannot create other subagents.

To use subagents, you **must have custom agents configured in your environment**. See [Creating custom agents for Copilot cloud agent](/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents).

#### Enabling subagents

To enable subagents:

1. Click **Tools** in the menu bar, then click **GitHub Copilot**, then **Edit Settings**.
2. In the popup menu, click **Chat**, then click the **Enable Subagent** checkbox.

#### Invoking subagents

Subagents can be invoked in different ways:

* **Automatic delegation**. Copilot will analyze the description of your request, the description field of your configured custom agents, and the current context and available tools to automatically choose a subagent. For example, this prompt would automatically delegate the task to a **refactor-specialist** custom agent:

  ```text
  Suggest ways to refactor this legacy code.
  ```

* **Direct invocation**. You can directly call the subagent in your prompt:

  ```text
  Use the testing subagent to write unit tests for the authentication module.
  ```

When the subagent completes its task, its results appear back in the main chat session, ready for follow-up questions or next steps.

## Using plan mode

Plan mode helps you to create detailed implementation plans before executing them. This ensures that all requirements are considered and addressed before any code changes are made. The plan agent does not make any code changes until the plan is reviewed and approved by you. Once approved, you can hand off the plan to the default agent or save it for further refinement, review, or team discussions.

The plan agent is designed to:

* Research the task comprehensively using read-only tools and codebase analysis to identify requirements and constraints.
* Break down the task into manageable, actionable steps and include open questions about ambiguous requirements.
* Present a concise plan draft, based on a standardized plan format, for user review and iteration.

To use plan mode:

1. If it is not already displayed, open the Copilot Chat panel by clicking the **GitHub Copilot Chat** icon at the right side of the JetBrains IDE window.

2. At the bottom of the Copilot Chat panel, select **Plan** from the agents dropdown.

3. Type a prompt that describes a task, such as adding a feature to an existing application, refactoring code, fixing a bug, or creating an initial version of a new application.

   For example: `Create a simple to-do web app with HTML, CSS, and JS files.`

4. Submit the prompt.

   After a few moments, the plan agent outputs a plan in the chat panel. The plan provides a high-level summary and a breakdown of steps, including any open questions for clarification.

5. Review the plan and answer any questions the agent has asked.

   You can iterate multiple times to clarify requirements, adjust scope, or answer questions.

6. Once the plan is complete you can:

   * Click **Start Implementation** to switch Copilot Chat to agent mode and start an agent session to implement the required changes, based on the implementation plan.
   * Click **Open in Editor** to switch Copilot Chat to agent mode and start an agent session that generates Markdown, in a tab of your editor, with the details of the implementation plan. You can start to work through the plan yourself, or save the plan as a Markdown file for later use.

## Sharing feedback

To share feedback about Copilot Chat, you can use the **share feedback** link in JetBrains.

1. At the right side of the JetBrains IDE window, click the **Copilot Chat** icon to open the Copilot Chat window.

   ![Screenshot of the Copilot Chat icon in the Activity Bar.](/assets/images/help/copilot/jetbrains-copilot-chat-icon.png)

2. At the top of the Copilot Chat window, click the **share feedback** link.

   ![Screenshot of the share feedback link in the Copilot Chat window.](/assets/images/help/copilot/jetbrains-share-feedback.png)

## Further reading

* [Prompt engineering for GitHub Copilot Chat](/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)
* [Asking GitHub Copilot questions in GitHub](/en/copilot/github-copilot-enterprise/copilot-chat-in-github/using-github-copilot-chat-in-githubcom)
* [Responsible use of GitHub Copilot Chat in your IDE](/en/copilot/github-copilot-chat/about-github-copilot-chat)
* [GitHub Pre-release License Terms](/en/site-policy/github-terms/github-copilot-pre-release-terms)
* [GitHub Terms for Additional Products and Features](/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot)
* [GitHub Copilot Trust Center](https://copilot.github.trust.page)
* [GitHub Copilot FAQ](https://github.com/features/copilot#faq)

</div>

<!-- --------------------- -->

<!-- XCode -->

<!-- --------------------- -->

<div class="ghd-tool xcode">

## Prerequisites

* **Access to GitHub Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Latest version of the GitHub Copilot extension**. For installation instructions, see [Installing the GitHub Copilot extension in your environment](/en/copilot/configuring-github-copilot/installing-the-github-copilot-extension-in-your-environment).
* **Sign in to GitHub in Xcode**. If you experience authentication issues, see [Troubleshooting common issues with GitHub Copilot](/en/copilot/troubleshooting-github-copilot/troubleshooting-issues-with-github-copilot-chat#troubleshooting-authentication-issues-in-your-editor).

If you have access to GitHub Copilot via your organization, you won't be able to use GitHub Copilot Chat if your organization owner has disabled chat. See [Managing policies and features for GitHub Copilot in your organization](/en/copilot/managing-github-copilot-in-your-organization/managing-policies-and-features-for-copilot-in-your-organization).

## Submitting prompts

You can ask Copilot Chat to give you code suggestions, explain code, generate unit tests, and suggest code fixes.

1. To open the chat window, click **Editor** in the menu bar, then click **GitHub Copilot** then **Open Chat**. Copilot Chat opens in a new window.

2. Enter a prompt in the prompt box. For example prompts, see [Getting started with prompts for GitHub Copilot Chat in your IDE](/en/copilot/get-started/getting-started-with-prompts-for-copilot-chat).

3. Evaluate Copilot's response, and submit a follow up prompt if needed.

   The response often includes interactive elements. For example, the response may include buttons to copy or insert a code block.

   To see the files that Copilot Chat used to generate the response, click the **References** link below the response. The references may include a link to a custom instructions file for your repository. This file contains additional information that is automatically added to all of your chat questions to improve the quality of the responses. For more information, see [Adding repository custom instructions for GitHub Copilot](/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot).

## Using Model Context Protocol (MCP) servers

You can use MCP to extend the capabilities of Copilot Chat by integrating it with a wide range of existing tools and services. For additional information, see [About Model Context Protocol (MCP)](/en/copilot/concepts/context/mcp).

## AI models for Copilot Chat

You can change the model Copilot uses to generate responses to chat prompts. You may find that different models perform better, or provide more useful responses, depending on the type of questions you ask. Options include premium models with advanced capabilities.  See [Changing the AI model for GitHub Copilot Chat](/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat).

## Using keywords in your prompt

You can use special keywords to help Copilot understand your prompt.

### Slash commands

Use slash commands to avoid writing complex prompts for common scenarios. To use a slash command, type `/` in the chat prompt box, followed by a command.

To see all available slash commands, type `/` in the chat prompt box. For more information, see [GitHub Copilot Chat cheat sheet](/en/copilot/using-github-copilot/github-copilot-chat-cheat-sheet?tool=xcode#slash-commands).

## Using plan mode

> \[!NOTE]
> Plan mode is currently in public preview and subject to change.

Plan mode helps you to create detailed implementation plans before executing them. This ensures that all requirements are considered and addressed before any code changes are made. The plan agent does not make any code changes until the plan is reviewed and approved by you. Once approved, you can hand off the plan to the default agent or save it for further refinement, review, or team discussions.

The plan agent is designed to:

* Research the task comprehensively using read-only tools and codebase analysis to identify requirements and constraints.
* Break down the task into manageable, actionable steps and include open questions about ambiguous requirements.
* Present a concise plan draft, based on a standardized plan format, for user review and iteration.

To use plan mode:

1. If it is not already displayed, open the Copilot Chat window by clicking **Editor** in the menu bar, then clicking **GitHub Copilot** then **Open Chat**.

2. At the bottom of the Copilot Chat window, select **Plan** from the agents dropdown.

3. Type a prompt that describes a task, such as adding a feature to an existing application, refactoring code, fixing a bug, or creating an initial version of a new application.

   For example: `Create a simple to-do app with Swift files.`

4. Submit the prompt.

   After a few moments, the plan agent outputs a plan in the chat panel. The plan provides a high-level summary and a breakdown of steps, including any open questions for clarification.

5. Review the plan and answer any questions the agent has asked.

   You can iterate multiple times to clarify requirements, adjust scope, or answer questions.

6. Once the plan is complete you can:

   * Click **Start Implementation** to switch Copilot Chat to agent mode and start an agent session to implement the required changes, based on the implementation plan.
   * Click **Open in Editor** to switch Copilot Chat to agent mode and start an agent session that generates Markdown, in a tab of your editor, with the details of the implementation plan. You can start to work through the plan yourself, or save the plan as a Markdown file for later use.

## Using Copilot agent mode

Use agent mode when you have a specific task in mind and want to enable Copilot to autonomously edit your code. In agent mode, Copilot determines which files to make changes to, offers code changes and terminal commands to complete the task, and iterates to remediate issues until the original task is complete.

Agent mode is best suited to use cases where:

* Your task is complex, and involves multiple steps, iterations, and error handling.
* You want Copilot to determine the necessary steps to take to complete the task.
* The task requires Copilot to integrate with external applications, such as an MCP server.

### Using agent mode

1. If it is not already displayed, open the Copilot Chat window by clicking **Editor** in the menu bar, then clicking **GitHub Copilot** then **Open Chat**.
2. At the bottom of the chat panel, select **Agent** from the agents dropdown.
3. Optionally, add relevant files to the *working set* view to indicate to Copilot which files you want to work on.
4. Submit a prompt. In response to your prompt, Copilot streams the edits in the editor, updates the working set, and if necessary, suggests terminal commands to run.
5. Review the changes. If Copilot suggested terminal commands, confirm whether or not Copilot can run them. In response, Copilot iterates and performs additional actions to complete the task in your original prompt.

When you use agent mode, each prompt you enter counts as one premium request, multiplied by the model’s multiplier. For example, if you're using the included model—which has a multiplier of 0—your prompts won’t consume any premium requests. Copilot may take several follow-up actions to complete your task, but these follow-up actions do **not** count toward your premium request usage. Only the prompts you enter are billed—tool calls or background steps taken by the agent are not charged.

The total number of premium requests you use depends on how many prompts you enter and which model you select. See [Requests in GitHub Copilot](/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/monitoring-usage-and-entitlements/avoiding-unexpected-copilot-costs).

### Using subagents

You can use subagents to delegate tasks to an isolated agent with its own context window within your chat session. The subagent operates independently without pausing for user feedback and returns the final result to the main chat session.

Subagents are best suited for situations where:

* You want to delegate complex, multi-step tasks like research or analysis without interrupting your main session.
* You need to process large amounts of information or multiple documents that would clutter your primary context window.
* You want to explore different approaches or perspectives independently without mixing contexts together.

Subagents use the same tools and AI model as the main session, but they cannot create other subagents.

To use subagents, you **must have custom agents configured in your environment**. See [Creating custom agents for Copilot cloud agent](/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents).

#### Enabling subagents

1. Click **Editor** in the menu bar, then click **GitHub Copilot** then **Open GitHub Copilot for Xcode Settings**.
2. Click **Advanced** in the chat panel, then under **Chat Settings** click the **Enable Subagents** toggle.

#### Invoking subagents

Subagents can be invoked in different ways:

* **Automatic delegation**. Copilot will analyze the description of your request, the description field of your configured custom agents, and the current context and available tools to automatically choose a subagent. For example, this prompt would automatically delegate the task to a **refactor-specialist** custom agent:

  ```text
  Suggest ways to refactor this legacy code.
  ```

* **Direct invocation**. You can directly call the subagent in your prompt:

  ```text
  Use the testing subagent to write unit tests for the authentication module.
  ```

When the subagent completes its task, its results appear back in the main chat session, ready for follow-up questions or next steps.

## File references

By default, Copilot Chat will reference the file that you have open or the code that you have selected. To attach a specific file as reference, click <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-paperclip" aria-label="Add attachments" role="img"><path d="M12.212 3.02a1.753 1.753 0 0 0-2.478.003l-5.83 5.83a3.007 3.007 0 0 0-.88 2.127c0 .795.315 1.551.88 2.116.567.567 1.333.89 2.126.89.79 0 1.548-.321 2.116-.89l5.48-5.48a.75.75 0 0 1 1.061 1.06l-5.48 5.48a4.492 4.492 0 0 1-3.177 1.33c-1.2 0-2.345-.487-3.187-1.33a4.483 4.483 0 0 1-1.32-3.177c0-1.195.475-2.341 1.32-3.186l5.83-5.83a3.25 3.25 0 0 1 5.553 2.297c0 .863-.343 1.691-.953 2.301L7.439 12.39c-.375.377-.884.59-1.416.593a1.998 1.998 0 0 1-1.412-.593 1.992 1.992 0 0 1 0-2.828l5.48-5.48a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-5.48 5.48a.492.492 0 0 0 0 .707.499.499 0 0 0 .352.154.51.51 0 0 0 .356-.154l5.833-5.827a1.755 1.755 0 0 0 0-2.481Z"></path></svg> in the chat prompt box.

## Chat management

You can open a conversation thread for each Xcode IDE to keep discussions organized across different contexts. You can also revisit previous conversations and reference past suggestions through the chat history.

## Sharing feedback

To indicate whether a response was helpful, use <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-thumbsup" aria-label="Thumbs up" role="img"><path d="M8.347.631A.75.75 0 0 1 9.123.26l.238.04a3.25 3.25 0 0 1 2.591 4.098L11.494 6h.665a3.25 3.25 0 0 1 3.118 4.167l-1.135 3.859A2.751 2.751 0 0 1 11.503 16H6.586a3.75 3.75 0 0 1-2.184-.702A1.75 1.75 0 0 1 3 16H1.75A1.75 1.75 0 0 1 0 14.25v-6.5C0 6.784.784 6 1.75 6h3.417a.25.25 0 0 0 .217-.127ZM4.75 13.649l.396.33c.404.337.914.521 1.44.521h4.917a1.25 1.25 0 0 0 1.2-.897l1.135-3.859A1.75 1.75 0 0 0 12.159 7.5H10.5a.75.75 0 0 1-.721-.956l.731-2.558a1.75 1.75 0 0 0-1.127-2.14L6.69 6.611a1.75 1.75 0 0 1-1.523.889H4.75ZM3.25 7.5h-1.5a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H3a.25.25 0 0 0 .25-.25Z"></path></svg> or <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-thumbsdown" aria-label="Thumbs down" role="img"><path d="M7.653 15.369a.75.75 0 0 1-.776.371l-.238-.04a3.25 3.25 0 0 1-2.591-4.099L4.506 10h-.665A3.25 3.25 0 0 1 .723 5.833l1.135-3.859A2.75 2.75 0 0 1 4.482 0H9.43c.78.003 1.538.25 2.168.702A1.752 1.752 0 0 1 12.989 0h1.272A1.75 1.75 0 0 1 16 1.75v6.5A1.75 1.75 0 0 1 14.25 10h-3.417a.25.25 0 0 0-.217.127ZM11.25 2.351l-.396-.33a2.248 2.248 0 0 0-1.44-.521H4.496a1.25 1.25 0 0 0-1.199.897L2.162 6.256A1.75 1.75 0 0 0 3.841 8.5H5.5a.75.75 0 0 1 .721.956l-.731 2.558a1.75 1.75 0 0 0 1.127 2.14L9.31 9.389a1.75 1.75 0 0 1 1.523-.889h.417Zm1.5 6.149h1.5a.25.25 0 0 0 .25-.25v-6.5a.25.25 0 0 0-.25-.25H13a.25.25 0 0 0-.25.25Z"></path></svg> that appear next to the response.

## Further reading

* [Prompt engineering for GitHub Copilot Chat](/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)
* [Asking GitHub Copilot questions in GitHub](/en/copilot/github-copilot-enterprise/copilot-chat-in-github/using-github-copilot-chat-in-githubcom)
* [Responsible use of GitHub Copilot Chat in your IDE](/en/copilot/github-copilot-chat/about-github-copilot-chat)
* [GitHub Pre-release License Terms](/en/site-policy/github-terms/github-copilot-pre-release-terms)
* [GitHub Terms for Additional Products and Features](/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot)
* [GitHub Copilot Trust Center](https://copilot.github.trust.page)
* [GitHub Copilot FAQ](https://github.com/features/copilot#faq)

</div>

<!-- --------------------- -->

<!-- Eclipse -->

<!-- --------------------- -->

<div class="ghd-tool eclipse">

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **Compatible version of Eclipse**. To use the GitHub Copilot extension, you must have Eclipse version 2024-09 or above. See the [Eclipse download page](https://www.eclipse.org/downloads/packages/).
* If you are a member of an organization or enterprise with a Copilot Business or Copilot Enterprise plan, the "MCP servers in Copilot" policy must be enabled in order to use MCP with Copilot.
* **Latest version of the GitHub Copilot extension**. Download this from the [Eclipse Marketplace](https://aka.ms/copiloteclipse?ref_product=copilot\&ref_type=engagement\&ref_style=text). For more information, see [Installing the GitHub Copilot extension in your environment](/en/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment?tool=eclipse).
* **Sign in to GitHub in Eclipse**. If you experience authentication issues, see [Troubleshooting common issues with GitHub Copilot](/en/copilot/troubleshooting-github-copilot/troubleshooting-issues-with-github-copilot-chat#troubleshooting-authentication-issues-in-your-editor).

If you have access to GitHub Copilot via your organization, you won't be able to use GitHub Copilot Chat if your organization owner has disabled chat. See [Managing policies and features for GitHub Copilot in your organization](/en/copilot/managing-github-copilot-in-your-organization/managing-policies-and-features-for-copilot-in-your-organization).

## Submitting prompts

You can ask Copilot Chat to give you code suggestions, explain code, generate unit tests, and suggest code fixes.

1. To open the Copilot Chat panel, click the Copilot icon (<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>) in the status bar at the bottom of Eclipse, then click **Open Chat**.

2. Enter a prompt in the prompt box, then press <kbd>Enter</kbd>.

   For an introduction to the kinds of prompts you can use, see [Getting started with prompts for GitHub Copilot Chat in your IDE](/en/copilot/get-started/getting-started-with-prompts-for-copilot-chat).

3. Evaluate Copilot's response, and make a follow up request if needed.

## Using keywords in your prompt

You can use special keywords to help Copilot understand your prompt. For examples, see [Getting started with prompts for GitHub Copilot Chat in your IDE](/en/copilot/get-started/getting-started-with-prompts-for-copilot-chat).

### Slash commands

Use slash commands to avoid writing complex prompts for common scenarios. To use a slash command, type `/` in the chat prompt box, followed by a command. For example, use `/explain` to ask Copilot to explain the code in the file currently displayed in the editor.

To see all available slash commands, type `/` in the chat prompt box.

## Using Model Context Protocol (MCP) servers

You can use MCP to extend the capabilities of Copilot Chat by integrating it with a wide range of existing tools and services. For additional information, see [About Model Context Protocol (MCP)](/en/copilot/concepts/context/mcp).

## AI models for Copilot Chat

You can change the model Copilot uses to generate responses to chat prompts. You may find that different models perform better, or provide more useful responses, depending on the type of questions you ask. Options include premium models with advanced capabilities.  See [Changing the AI model for GitHub Copilot Chat](/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat).

## Using plan mode

> \[!NOTE]
> Plan mode is currently in public preview and subject to change.

Plan mode helps you to create detailed implementation plans before executing them. This ensures that all requirements are considered and addressed before any code changes are made. The plan agent does not make any code changes until the plan is reviewed and approved by you. Once approved, you can hand off the plan to the default agent or save it for further refinement, review, or team discussions.

The plan agent is designed to:

* Research the task comprehensively using read-only tools and codebase analysis to identify requirements and constraints.
* Break down the task into manageable, actionable steps and include open questions about ambiguous requirements.
* Present a concise plan draft, based on a standardized plan format, for user review and iteration.

To use plan mode:

1. If it is not already displayed, open the Copilot Chat panel by clicking the Copilot icon (<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>) in the status bar at the bottom of Eclipse, then clicking **Open Chat**.

2. At the bottom of the chat panel, select **Plan** from the agents dropdown.

3. Type a prompt that describes a task, such as adding a feature to an existing application, refactoring code, fixing a bug, or creating an initial version of a new application.

   For example: `Create a simple to-do app using JavaFX.`

4. Submit the prompt.

   After a few moments, the plan agent outputs a plan in the chat panel. The plan provides a high-level summary and a breakdown of steps, including any open questions for clarification.

5. Review the plan and answer any questions the agent has asked.

   You can iterate multiple times to clarify requirements, adjust scope, or answer questions.

6. Once the plan is complete you can:

   * Click **Start Implementation** to switch Copilot Chat to agent mode and start an agent session to implement the required changes, based on the implementation plan.
   * Click **Open in Editor** to switch Copilot Chat to agent mode and start an agent session that generates Markdown, in a tab of your editor, with the details of the implementation plan. You can start to work through the plan yourself, or save the plan as a Markdown file for later use.

## Using Copilot agent mode

Use agent mode when you have a specific task in mind and want to enable Copilot to autonomously edit your code. In agent mode, Copilot determines which files to make changes to, offers code changes and terminal commands to complete the task, and iterates to remediate issues until the original task is complete.

Agent mode is best suited to use cases where:

* Your task is complex, and involves multiple steps, iterations, and error handling.
* You want Copilot to determine the necessary steps to take to complete the task.
* The task requires Copilot to integrate with external applications, such as an MCP server.

To use agent mode:

1. Open the Copilot Chat panel by clicking the Copilot icon (<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>) in the status bar at the bottom of Eclipse, then clicking **Open Chat**.
2. At the bottom of the chat panel, select **Agent** from the agents dropdown.
3. Submit a prompt. In response to your prompt, Copilot streams the edits in the editor, updates the working set, and if necessary, suggests terminal commands to run.
4. Review the changes. If Copilot suggested terminal commands, confirm whether or not Copilot can run them. In response, Copilot iterates and performs additional actions to complete the task in your original prompt.

When you use agent mode, each prompt you enter counts as one premium request, multiplied by the model’s multiplier. For example, if you're using the included model—which has a multiplier of 0—your prompts won’t consume any premium requests. Copilot may take several follow-up actions to complete your task, but these follow-up actions do **not** count toward your premium request usage. Only the prompts you enter are billed—tool calls or background steps taken by the agent are not charged.

The total number of premium requests you use depends on how many prompts you enter and which model you select. See [Requests in GitHub Copilot](/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/monitoring-usage-and-entitlements/avoiding-unexpected-copilot-costs).

### Using subagents

You can use subagents to delegate tasks to an isolated agent with its own context window within your chat session. The subagent operates independently without pausing for user feedback and returns the final result to the main chat session.

Subagents are best suited for situations where:

* You want to delegate complex, multi-step tasks like research or analysis without interrupting your main session.
* You need to process large amounts of information or multiple documents that would clutter your primary context window.
* You want to explore different approaches or perspectives independently without mixing contexts together.

Subagents use the same tools and AI model as the main session, but they cannot create other subagents.

To use subagents, you **must have custom agents configured in your environment**. See [Creating custom agents for Copilot cloud agent](/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents).

#### Enabling subagents

1. Click the **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copilot" aria-label="copilot" role="img"><path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"></path><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"></path></svg>** icon in the status bar.
2. In the popup menu, click **Edit Preferences**.
3. Under **Chat**, click the **Enable sub-agent** check box

#### Invoking subagents

Subagents can be invoked in different ways:

* **Automatic delegation**. Copilot will analyze the description of your request, the description field of your configured custom agents, and the current context and available tools to automatically choose a subagent. For example, this prompt would automatically delegate the task to a **refactor-specialist** custom agent:

  ```text
  Suggest ways to refactor this legacy code.
  ```

* **Direct invocation**. You can directly call the subagent in your prompt:

  ```text
  Use the testing subagent to write unit tests for the authentication module.
  ```

When the subagent completes its task, its results appear back in the main chat session, ready for follow-up questions or next steps.

## Further reading

* [Prompt engineering for GitHub Copilot Chat](/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)
* [Asking GitHub Copilot questions in GitHub](/en/copilot/github-copilot-enterprise/copilot-chat-in-github/using-github-copilot-chat-in-githubcom)
* [Responsible use of GitHub Copilot Chat in your IDE](/en/copilot/github-copilot-chat/about-github-copilot-chat)
* [GitHub Terms for Additional Products and Features](/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot)
* [GitHub Copilot Trust Center](https://copilot.github.trust.page)
* [GitHub Copilot FAQ](https://github.com/features/copilot#faq)

</div>