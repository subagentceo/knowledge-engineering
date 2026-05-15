# Audit Log Streaming Widget

![Audit Log Streaming Widget screenshot](https://images.workoscdn.com/images/408ea781-5544-4340-a566-a9d2e16f903d.png?auto=format\&fit=clip\&q=50)

The `<AdminPortalAuditLogStreaming />` widget enables users to configure and monitor audit log streaming to external destinations in the Admin Portal. It displays the streaming status, destination configuration, and connection health.

In order to use the Audit Log Streaming widget, a user must have a role that has the `widgets:audit-log-streaming:manage` permission.

#### Widget Token

```js
import {
  AdminPortalAuditLogStreaming,
  WorkOsWidgets,
} from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend. See the
 * "Tokens" section of this guide for details on how to generate the token
 */
export function AdminPortal({ authToken }) {
  return (
    <WorkOsWidgets>
      <AdminPortalAuditLogStreaming authToken={authToken} />
    </WorkOsWidgets>
  );
}
```

## API Reference
