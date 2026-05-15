# SSO Connection Widget

![SSO Connection Widget screenshot](https://images.workoscdn.com/images/1c8bb97f-b321-4fab-8a1b-b46d3dd92f1f.png?auto=format\&fit=clip\&q=50)

The `<AdminPortalSsoConnection />` widget enables users to set up SSO connections in the Admin Portal.

In order to use the SSO Connection widget, a user must have a role that has the `widgets:sso:manage` permission.

#### Widget Token

```js
import { AdminPortalSsoConnection, WorkOsWidgets } from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend. See the
 * "Tokens" section of this guide for details on how to generate the token
 */
export function AdminPortal({ authToken }) {
  return (
    <WorkOsWidgets>
      <AdminPortalSsoConnection authToken={authToken} />
    </WorkOsWidgets>
  );
}
```

## API Reference
