# Using GitHub Copilot code review

Learn how to request a code review from GitHub Copilot.

## Introduction

GitHub Copilot can review your code and provide feedback. Where possible, Copilot's feedback includes suggested changes which you can apply with a couple of clicks.

For a full introduction to GitHub Copilot code review, see [About GitHub Copilot code review](/en/copilot/concepts/code-review).

<div class="ghd-tool webui">

Copilot code review is also available for organization members without a Copilot license, when enabled by an enterprise administrator or organization owner. See [Copilot code review for organization members without a Copilot license](/en/copilot/concepts/agents/code-review#copilot-code-review-for-organization-members-without-a-copilot-license).

## Using Copilot code review

These instructions explain how to use Copilot code review in the GitHub website. To see instructions for other popular coding environments, click the appropriate tab at the top of the page.

1. On GitHub.com, create a pull request or navigate to an existing pull request.

2. Open the **Reviewers** menu, then select **Copilot**.

   ![Screenshot of selecting 'Copilot' from the 'Reviewers' menu.](/assets/images/help/copilot/code-review/request-review@2x.png)

3. Wait for Copilot to review your pull request. This usually takes less than 30 seconds.

4. Scroll down and read through Copilot's comments.

   ![Screenshot of a code review left by Copilot.](/assets/images/help/copilot/code-review/review-comment@2x.png)

   Copilot always leaves a "Comment" review, not an "Approve" review or a "Request changes" review. This means that Copilot's reviews do not count toward required approvals for the pull request, and Copilot's reviews will not block merging changes. For more details, see [Approving a pull request with required reviews](/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/approving-a-pull-request-with-required-reviews).

5. Copilot's review comments behave like review comments from humans. You can add reactions to them, comment on them, resolve them and hide them.

   Any comments you add to Copilot's review comments will be visible to humans, but they won't be visible to Copilot, and Copilot won't reply.

## Working with suggested changes provided by Copilot

Where possible, Copilot's feedback includes suggested changes which you can apply with a couple of clicks.

If you're happy with the changes, you can accept a single suggestion from Copilot and commit it, or accept a group of suggestions together in a single commit. For more information, see [Incorporating feedback in your pull request](/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/incorporating-feedback-in-your-pull-request).

You can also invoke Copilot cloud agent to implement suggested changes. To do this, you must:

* Enable tools in Copilot code review and Copilot cloud agent.
* On review comments from GitHub Copilot code review, click **Implement suggestion**. This creates a draft comment on the pull request, where you can instruct Copilot to address specific feedback. Copilot will create a new pull request against your branch with the suggestions applied.

## Providing feedback on Copilot's reviews

You can provide feedback on Copilot's comments directly within each comment. We use this information to improve the product and the quality of Copilot's suggestions.

1. On a pull request review comment from Copilot, click the thumbs up (:+1:) or thumbs down (:-1:) button.

   ![Screenshot showing a Copilot code review comment with the thumbs up and thumbs down buttons.](/assets/images/help/copilot/code-review/feedback-controls@2x.png)

2. If you click the thumbs down button, you're asked to provide additional information. You can, optionally, pick the reason for your negative feedback and leave a comment before clicking **Submit feedback**.

   ![Screenshot of the form for providing additional information when you give negative feedback on a comment from Copilot.](/assets/images/help/copilot/code-review/feedback-modal@2x.png)

## Requesting a re-review from Copilot

When you push changes to a pull request that Copilot has reviewed, it won't automatically re-review your changes.

To request a re-review from Copilot, click the <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-sync" aria-label="Re-request review" role="img"><path d="M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z"></path></svg> button next to Copilot's name in the **Reviewers** menu. For more information, see [Requesting a pull request review](/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/requesting-a-pull-request-review).

> \[!NOTE] When re-reviewing a pull request, Copilot may repeat the same comments again, even if they have been dismissed with the "Resolve conversation" button or downvoted with the thumbs down (:-1:) button.

## Enabling automatic reviews

By default, you manually request a review from Copilot on each pull request, in the same way you would request a review from a human. However, you can set up Copilot to automatically review all pull requests. See [Configuring automatic code review by GitHub Copilot](/en/copilot/how-tos/agents/copilot-code-review/automatic-code-review).

## Customizing Copilot's reviews with custom instructions

You can customize Copilot code review by adding custom instructions to your repository.

Repository custom instructions can either be repository wide or path specific. You specify repository-wide custom instructions in a `.github/copilot-instructions.md` file in your repository. You can use this file to store information that you want Copilot to consider when reviewing code anywhere in the repository.

You can also write instructions that Copilot will only use when reviewing code in files that match a specified path. You write these instructions in one or more `.github/instructions/**/*.instructions.md` files.

For more information, see [Adding repository custom instructions for GitHub Copilot](/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot).

> \[!NOTE]
> When reviewing a pull request, Copilot uses the custom instructions in the base branch of the pull request. For example, if your pull request seeks to merge `my-feature-branch` into `main`, Copilot will use the custom instructions in `main`.

### Example

This example of a `.github/copilot-instructions.md` file contains three instructions that will be applied to all Copilot code reviews in the repository.

```text
When performing a code review, respond in Spanish.

When performing a code review, apply the checks in the `/security/security-checklist.md` file.

When performing a code review, focus on readability and avoid nested ternary operators.
```

## MCP servers and agent skills

> \[!NOTE]
> Support for agent skills and MCP servers with Copilot code review is in public preview and subject to change.

Copilot code review can use agent skills and MCP servers configured in the repository, when they are relevant to the code being reviewed.

To make these available for Copilot code review on GitHub, configure:

* **Agent skills** in your repository (in `.github/skills`). If you want a skill to target review tasks, use a review-focused skill directory name such as `code-review`. For setup details, see [Adding agent skills for GitHub Copilot](/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills).
* **MCP servers** in repository Copilot settings. The GitHub MCP server and Playwright MCP server are enabled by default. For setup details, see [Configure MCP servers for your repository](/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers).

Copilot code review is more likely to use this context when:

* Agent skills directories have review-focused names and descriptions, such as `code-review`, that indicate they are intended for pull request review.
* Your agent skills or custom instructions explicitly tell Copilot code review to use specific MCP context.
* Pull request descriptions reference items available through configured MCP servers, such as issue keys or incident IDs.

To verify which MCP context Copilot code review used for a specific review, open the linked review session from the pull request timeline, then check the session logs to see which MCP servers and tools were called.

In repository settings, **Allow Copilot to use MCP tools when reviewing pull requests** is enabled by default. Disable this setting if you want MCP servers available only for Copilot cloud agent, and not for Copilot code review. For step-by-step instructions, see [Configure MCP servers for your repository](/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers#disabling-mcp-tools-for-code-review).

</div>

<div class="ghd-tool vscode">

### Reviewing a selection of code

You can request an initial review of a highlighted selection of code in Visual Studio Code.

1. In Visual Studio Code, select the code you want to review.
2. Right-click the selected code and choose **Generate Code** > **Review**.
3. VS Code creates review comments in the **Comments** panel and also shows them inline in the editor.

### Reviewing all uncommitted changes

You can request a review of your uncommitted changes in Visual Studio Code.

1. In VS Code, click the **Source Control** button in the Activity Bar.

2. At the top of the **Source Control** view, hover over **CHANGES**, then click the <!-- Currently (Feb 2025) used here: https://docs.github.com/en/copilot/using-github-copilot/code-review/using-copilot-code-review?tool=vscode#reviewing-changes --> <svg class="octicon" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M14.5 2H1.5L1 2.5V11.5L1.5 12H4V14.5L4.854 14.854L7.707 12H14.5L15 11.5V2.5L14.5 2ZM14 11H7.5L7.146 11.146L5 13.293V11.5L4.5 11H2V3H14V11Z"/><path d="M7.079 5.205L5.262 7.033L7.078 8.853L6.371 9.56L4.2 7.386V6.679L6.37 4.5L7.079 5.205ZM9.7 4.505L9 5.214L10.826 7.033L8.995 8.853L9.7 9.562L11.889 7.389V6.68L9.7 4.505Z"/></svg> **Copilot Code Review - Uncommitted Changes** button.

   ![Screenshot of the "Source Control" view. The code review button is outlined in dark orange.](/assets/images/help/copilot/code-review/vscode-review-button.png)

3. Wait for Copilot to review your changes. This usually takes less than 30 seconds.

4. If Copilot has any comments, they will be shown inline in your file(s), and in the **Problems** tab.

## Working with suggested changes provided by Copilot

Where possible, Copilot's feedback includes suggested changes which you can apply with a single click.

![Screenshot of a comment from Copilot in Visual Studio Code with a suggested change.](/assets/images/help/copilot/code-review/vscode-comment@2x.png)

If you're happy with the change, you can accept a suggestion from Copilot by clicking the **Apply and Go To Next** button. Any changes you apply will not be automatically committed.

If you don't want to apply Copilot's suggested change, click the **Discard and Go to Next** button.

## Providing feedback on Copilot's reviews

You can provide feedback on Copilot's comments directly within each comment. We use this information to improve the product and the quality of Copilot's suggestions.

To provide feedback, hover over the comment and click the thumbs up or thumbs down button.

![Screenshot of a comment from Copilot in Visual Studio Code with feedback buttons displayed. The buttons are outlined in dark orange.](/assets/images/help/copilot/code-review/vscode-comment-feedback@2x.png)

## Customizing Copilot's reviews with custom instructions

You can customize Copilot code review by adding custom instructions to your repository.

Repository custom instructions can either be repository wide or path specific. You specify repository-wide custom instructions in a `.github/copilot-instructions.md` file in your repository. You can use this file to store information that you want Copilot to consider when reviewing code anywhere in the repository.

You can also write instructions that Copilot will only use when reviewing code in files that match a specified path. You write these instructions in one or more `.github/instructions/**/*.instructions.md` files.

For more information, see [Adding repository custom instructions for GitHub Copilot](/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot).

> \[!NOTE]
> When reviewing a pull request, Copilot uses the custom instructions in the base branch of the pull request. For example, if your pull request seeks to merge `my-feature-branch` into `main`, Copilot will use the custom instructions in `main`.

### Example

This example of a `.github/copilot-instructions.md` file contains three instructions that will be applied to all Copilot code reviews in the repository.

```text
When performing a code review, respond in Spanish.

When performing a code review, apply the checks in the `/security/security-checklist.md` file.

When performing a code review, focus on readability and avoid nested ternary operators.
```

</div>

<div class="ghd-tool visualstudio">

## Prerequisite

To use Copilot code review, you must use Visual Studio version 17.14 or later. See the [Visual Studio downloads page](https://visualstudio.microsoft.com/downloads/).

## Using Copilot code review

These instructions explain how to use Copilot code review in Visual Studio. To see instructions for other popular coding environments, click the appropriate tab at the top of the page.

1. In the Git Changes window, click **Review changes with Copilot**.
   This button appears as a comment icon with a sparkle.

2. Copilot will begin reviewing your changes. After a few moments, a link showing the number of code review comments appears in the Git Changes window.

3. Click the link to view and navigate the comments. If no issues are found, you'll see the message:
   Copilot did not comment on any files.

4. Copilot displays comments in your code with a summary of each potential issue. You can:

   * Review and make changes based on the suggestions.
   * Dismiss a comment using the downward arrow in the top-right corner of the comment box.

5. To remove all review comments, click <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-x" aria-label="The X icon" role="img"><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path></svg> next to the code review link in the Git Changes window.

For more information on enabling and configuring Copilot code review in Visual Studio, see [Review local changes with Copilot Chat](https://learn.microsoft.com/en-us/visualstudio/version-control/git-make-commit?view=vs-2022#review-local-changes-with-copilot-chat) in the Visual Studio documentation.

</div>

<div class="ghd-tool mobile">

## Using Copilot code review

These instructions explain how to use Copilot code review in GitHub Mobile. To see instructions for other popular coding environments, click the appropriate tab at the top of the page.

1. In GitHub Mobile, open a pull request.
2. Scroll down to the **Reviews** section and expand it.
3. Click **Request Reviews**.
4. Add Copilot as a reviewer, then click **Done**.

Copilot will review the changes and provide feedback.

</div>

<div class="ghd-tool xcode">

## Prerequisite

To use Copilot code review in Xcode, you must use version 0.41.0 or later of the GitHub Copilot Chat extension. Download the latest release from the [`github/CopilotForXcode` repository](https://github.com/github/CopilotForXcode/releases/latest).

## Using Copilot code review

These instructions explain how to use Copilot code review in Xcode. To see instructions for other popular coding environments, click the appropriate tab at the top of the page.

1. In Xcode, make some changes to one or more files.

2. Open the Copilot chat window by clicking **Editor** in the menu bar, clicking **GitHub Copilot** then **Open Chat**.

3. Near the bottom right of the prompt box in the Copilot chat window, click the **Code Review** button (a speech bubble icon).

   ![Screenshot of the Copilot chat window in Xcode, with the 'Code Review' button outlined in dark orange.](/assets/images/help/copilot/code-review/xcode-ccr-button.png)

4. Click either **Review Staged Changes** or **Review Unstaged Changes**.

5. A list of files containing changes is displayed in the chat window. Click the check boxes to deselect any files you don't want Copilot to review.

6. Click **Continue** to start the review process.

7. If Copilot finds things to comment on, it displays a **Reviewed Changes** list in the chat window, listing the files it has commented on. Click a file in this list to see the comments.

   Each comment is shown in a popup, overlaid over the editor.

   ![Screenshot of a Copilot code review review comment.](/assets/images/help/copilot/code-review/xcode-review-popup.png)

8. If there is more than one comment in the file, use the up and down arrows, at the top right of the popup, to navigate between comments.

9. Copilot may suggest replacement code. You can apply the suggested change by clicking **Accept** or reject it by clicking **Dismiss**.

10. Click another file in the **Reviewed Changes** list in the chat window, to see the review comments for another file.

</div>

<div class="ghd-tool jetbrains">

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).

* **Compatible JetBrains IDE**. To use GitHub Copilot in JetBrains, you must have a compatible JetBrains IDE installed. GitHub Copilot is compatible with the following IDEs:

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

## Using Copilot code review

These instructions explain how to use Copilot code review in JetBrains IDEs. To see instructions for other popular coding environments, click the appropriate tab at the top of the page.

1. In a JetBrains IDE, make some changes to one or more files.
2. Open the "Commit" tool window on the left-hand side.
3. Above the commit message input field, click **Copilot: Review Code Changes**. This button appears as a magnifying glass icon with a sparkle.
4. Copilot will begin reviewing your changes.
5. Copilot displays comments in your code with a summary of each potential issue. You can:

   * Review and make changes based on the suggestions.
   * Dismiss a comment by clicking **Discard**.
6. If there is more than one comment, use the up and down arrows, at the top right of the popup, to navigate between comments.

</div>

<div class="ghd-tool cli">

## Prerequisites

* **Access to Copilot**. See [What is GitHub Copilot?](/en/copilot/about-github-copilot/what-is-github-copilot#getting-access-to-copilot).
* **GitHub CLI**. You must have the GitHub CLI installed and authenticated. See [GitHub CLI quickstart](/en/github-cli/github-cli/quickstart).

## Using Copilot code review

These instructions explain how to use Copilot code review with the GitHub CLI. To see instructions for other popular coding environments, click the appropriate tab at the top of the page.

### Requesting a review when creating a pull request

You can request a review from Copilot when creating a new pull request using `gh pr create`:

```shell copy
gh pr create --reviewer @copilot
```

You can also select Copilot interactively from the searchable reviewer prompt during `gh pr create`.

```text
? Reviewers  [Use arrows to move, space to select, <right> to all, <left> to none, type to filter]
  [ ]  Search (7472 more)
  [x]  monalisa (Mona Lisa)
> [x]  Copilot (AI)
```

### Requesting a review on an existing pull request

To request a review from Copilot on an existing pull request, use `gh pr edit`. If you are not on the pull request's branch, specify the pull request number:

```shell copy
gh pr edit PR-NUMBER --add-reviewer @copilot
```

Replace `PR-NUMBER` with the number of the pull request you want reviewed. If you have the pull request's branch checked out, you can omit the number.

</div>