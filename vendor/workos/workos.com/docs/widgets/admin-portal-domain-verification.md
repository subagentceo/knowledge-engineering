# Domain Verification Widget

![Domain Verification Widget screenshot](https://images.workoscdn.com/images/6a98da6f-7178-4bb1-a276-ff024461cc16.png?auto=format\&fit=clip\&q=50)

The `<AdminPortalDomainVerification />` widget enables users to verify domains in the Admin Portal.

In order to use the Domain Verification widget, a user must have a role that has the `widgets:domain-verification:manage` permission.

#### Widget Token

```js
import {
  AdminPortalDomainVerification,
  WorkOsWidgets,
} from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend. See the
 * "Tokens" section of this guide for details on how to generate the token
 */
export function AdminPortal({ authToken }) {
  return (
    <WorkOsWidgets>
      <AdminPortalDomainVerification authToken={authToken} />
    </WorkOsWidgets>
  );
}
```

## API Reference
