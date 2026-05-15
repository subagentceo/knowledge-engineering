# User Management Widget

![Users Management screenshot](https://images.workoscdn.com/images/20f235c5-c888-48f5-90aa-87ec9189483a.png?auto=format\&fit=clip\&q=50)

The `<UsersManagement />` widget allows IT contacts to manage the members in an organization. IT contacts can invite new users, remove users, and change roles all within the widget.

In order to use the User Management widget, a user must have a role that has the `widgets:users-table:manage` permission.

#### Widget Token

```js
import { UsersManagement, WorkOsWidgets } from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend. See the
 * "Tokens" section of this guide for details on how to generate the token
 */
export function UserTable({ authToken }) {
  return (
    <WorkOsWidgets>
      <UsersManagement authToken={authToken} />
    </WorkOsWidgets>
  );
}
```

#### Access Token

```js
import { useAuth } from '@workos-inc/authkit-react';
import { UsersManagement, WorkOsWidgets } from '@workos-inc/widgets';

export function UserTable() {
  const { isLoading, user, getAccessToken } = useAuth();
  if (isLoading) {
    return '...';
  }
  if (!user) {
    return 'Logged in user is required';
  }

  return (
    <WorkOsWidgets>
      <UsersManagement authToken={getAccessToken} />
    </WorkOsWidgets>
  );
}
```

## API Reference
