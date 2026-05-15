# Directory Sync Widget

![Directory Sync Widget screenshot](/docs/images/widgets/directory-sync-widget.png)

The `<DirectorySync />` widget enables users to manage Directory Sync connections in the Admin Portal. It displays the directory status, metadata, and callout messages.

In order to use the Directory Sync widget, a user must have a role that has the `widgets:dsync:manage` permission.

#### Widget Token

```js
import { DirectorySync, WorkOsWidgets } from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend. See the
 * "Tokens" section of this guide for details on how to generate the token
 */
export function AdminPortal({ authToken }) {
  return (
    <WorkOsWidgets>
      <DirectorySync authToken={authToken} />
    </WorkOsWidgets>
  );
}
```

## API Reference
