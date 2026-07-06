# Context Menus

Menu items appear in views, actions, and right-click menus. It's important that the grouping of menus remain consistent. If your extension has actions that relate to files, place your actions in the File Explorer context menu (when appropriate). If an extension has actions for certain file types, only display it for those items.

**✔️ Do**

*   Show actions when contextually appropriate
*   Group similar actions together
*   Place large groups of actions into a submenu

❌ Don't

*   Show actions for every file without context

![Context Menu](/assets/api/ux-guidelines/examples/context-menu.png)

_This example places a **Copy GitHub Permalink** next to the other copy commands. This action only appears on files that are from a GitHub repository._

## Links

*   Context Menu API reference

7/1/2026