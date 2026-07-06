# Webviews

If you need to display custom functionality that is beyond what the VS Code API supports, you can use webviews, which are fully customizable. It's important to understand that webviews should only be used if you absolutely need them.

**✔️ Do**

*   Only use webviews when absolutely necessary
*   Activate your extension only when contextually appropriate
*   Open webviews only for the active window
*   Ensure all elements in the view are themeable (see the webview-view-sample and color tokens documentation)
*   Ensure your views follow accessibility guidance (color contrast, ARIA labels, keyboard navigation)
*   Use command actions in the toolbar and in the view

❌ Don't

*   Use for promotions (upgrades, sponsors, etc.)
*   Use for wizards
*   Open on every window
*   Open on extension updates (ask via a Notification instead)
*   Add functionality that is unrelated to the editor or workspace
*   Repeat existing functionality (Welcome page, Settings, configuration, etc.)

## Webview examples

**Simple Browser**

This extension opens a browser preview for the editor to the side.

![Weview sample - Browser](/assets/api/ux-guidelines/examples/webview-browser.png)

_This example shows VS Code Web being developed right inside VS Code. A Webview panel is used to render a browser-like window._

**Pull Request**

This extension shows pull requests for the repository of the workspace in a custom tree view and then uses a webview for a detail view of the pull request.

![Webview sample - Pull Request](/assets/api/ux-guidelines/examples/webview-pull-request.png)

## Webview views

You can also place webviews into any view container (sidebar or panel) and these elements are called webview views. The same webview guidance applies to webview views.

![Webview View](/assets/api/ux-guidelines/examples/webview-view.png)

_This webview view shows content for creating a pull request that uses dropdowns, inputs, and buttons._

## Links

*   Webview extension guide
*   Webview extension sample
*   Webview View extension sample

7/1/2026