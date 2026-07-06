# Status Bar

The Status Bar sits at the bottom of the VS Code workbench and displays information and actions that relate to your workspace. Items are placed into two groups: Primary (left) and Secondary (right). Items that relate to the entire workspace (status, problems/warnings, sync) go on the left and items that are secondary or contextual (language, spacing, feedback) go on the right. Limit the number of items added, as other extensions contribute to the same area.

![Status Bar example](/assets/api/ux-guidelines/examples/status-bar.png)

**✔️ Do**

*   Use short text labels
*   Use icons only when necessary
*   Use icons only for clear metaphors
*   Place primary (global) items on the left
*   Place secondary (contextual) items on the right

**❌ Don't**

*   Add custom colors
*   Add more than one icon (unless necessary)
*   Add more than one item (unless necessary)

## Status Bar Items

![Status Bar Item](/assets/api/ux-guidelines/examples/status-bar-item.png)

_This example shows an item contributed by the GitHub Pull Requests and Issues extension. It relates to the entire workspace, so it is placed on the left._

### Progress Status Bar item

When needing to show discreet progress (progress happening in the background), it's recommended to show a Status Bar item with the loading icon (you can also add spin animation). If progress needs to be elevated for user attention, we recommend moving to a progress notification.

![Status Bar Progress](/assets/api/ux-guidelines/examples/status-bar-progress.png)

_This example shows a progress Status Bar item that is discreet._

### Error and Warning Status Bar Items

If you need to show an item that is highly visible for warning or error purposes, you can configure a Status Bar Item to use a warning or error background color. Only use this pattern as a last resort and only for special cases given their prominence in the Status Bar.

![Status Bar Error](/assets/api/ux-guidelines/examples/status-bar-error.png)

_This example uses the error Status Bar Item for showing a blocking error in the file._

![Status Bar Warning](/assets/api/ux-guidelines/examples/status-bar-warning.png)

_This example uses the warning Status Bar Item for showing a warning in the file._

## Links

*   Status Bar Item API reference
*   Status Bar extension sample

7/1/2026