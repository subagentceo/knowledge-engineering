# Wrapping Up

In the Your First Extension topic, you learned how to create, run, and debug an extension. In the Extension Anatomy topic, you learned fundamental concepts to Visual Studio Code extension development. However, we have only seen the tip of the iceberg, and here are some suggested routes for furthering your VS Code extension development skills.

## Extension Capabilities

In this section, we split the VS Code API and Contribution Points into a few categories, each with short descriptions as to what your extension could achieve. Validate that your extension idea is achievable by reviewing the VS Code API or reading the Extension Capabilities section for new extension ideas.

## Guides & Samples

We have a great collection of sample extensions that you can adapt from, and some of them include a detailed guide that explains the source code. You can find all samples and guides in the Extension Guide Listing or the vscode-extension-samples repository.

## UX Guidelines

To help make your extension fit seamlessly into the VS Code user interface, refer to the UX Guidelines, where you'll learn the best practices for creating extension UI and conventions for following the preferred VS Code workflows.

## Issue Reporting

VS Code users can report issues by using the **Help: Report Issue...** command (`workbench.action.openIssueReporter`), or by typing `issue` in Quick Open (`workbench.action.quickOpen`) and then selecting an installed extension. This provides a consistent experience for users to report issues for the core product or installed extensions.

As an extension author, you can integrate your extension in the **Help: Report Issue...** issue reporter flow, instead of contributing a separate issue reporter command. This integration also enables you to attach any additional information when users report an issue.

To integrate in the issue reporter flow, you need to contribute a custom command and a `issue/reporter` menu contribution point. This custom command will invoke `openIssueReporter`.

An example of a contributed command and menu for `contributes` in `package.json` (See Contribution Points for adding a menu contribution and command):

```
"commands": [
    {
        "command": "extension.myCommand",
        "title": "Report Issue"
    }
],
    "menus": {
        "issue/reporter": [
            {
                "command": "extension.myCommand"
            }
        ]
    }
```

We ask extensions that previously contributed a `workbench.action.openIssueReporter` command in the command palette to start using this new issue reporting flow.

## Testing and Publishing

This section includes topics that help you develop high-quality VS Code extensions. For example, you can learn

*   How to add integration tests for your extension
*   How to publish your extension to the VS Code Marketplace
*   How to set up Continuous Integration for your extension

7/1/2026