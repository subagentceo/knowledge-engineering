# Extending Workbench

"Workbench" refers to the overall Visual Studio Code UI that encompasses the following UI components:

*   Title Bar
*   Activity Bar
*   Side Bar
*   Panel
*   Editor Group
*   Status Bar

VS Code provides various APIs that allow you to add your own components to the Workbench. For example, in the image below:

![workbench-contribution](/assets/api/extension-capabilities/extending-workbench/workbench-contribution.png)

*   Activity Bar: The Azure App Service extension adds a View Container
*   Side Bar: The built-in NPM extension adds a Tree View to the Explorer View
*   Editor Group: The built-in Markdown extension adds a Webview next to other editors in the Editor Group
*   Status Bar: The VSCodeVim extension adds a Status Bar Item in the Status Bar

## Views Container

With the `contributes.viewsContainers` Contribution Point, you can add new Views Containers that display next to the five built-in Views Containers. Learn more at the Tree View topic.

## Tree View

With the `contributes.views` Contribution Point, you can add new Views that display in any of the View Containers. Learn more at the Tree View topic.

## Webview

Webviews are highly customizable views built with HTML/CSS/JavaScript. They display next to text editors in the Editor Group areas. Read more about Webview in the Webview guide.

## Status Bar Item

Extensions can create custom `StatusBarItem` that display in the Status Bar. Status Bar Items can show text and icons and run commands on click events.

*   Show text and icons
*   Run a command on click

You can learn more by reviewing the Status Bar extension sample.

7/1/2026