# User Sessions Widget

![User Sessions Widget screenshot](https://images.workoscdn.com/images/c4ff10a8-e0a3-4c9d-b0a7-56bbf93f6862.png?auto=format\&fit=clip\&q=50)

The `<UserSessions />` widget provides users with visibility into their active sessions across different devices and browsers. Users can view session details and sign out of individual sessions as needed.

In order to use the User Sessions widget, a user must have a role that has the `widgets:users-table:manage` permission.

#### Widget Token

```js
import { UserSessions, WorkOsWidgets } from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend. See the
 * "Tokens" section of this guide for details on how to generate the token
 * @param {string} currentSessionId - The ID of the current session
 */
export function SessionsPage({ authToken, currentSessionId }) {
  return (
    <WorkOsWidgets>
      <UserSessions authToken={authToken} currentSessionId={currentSessionId} />
    </WorkOsWidgets>
  );
}
```

#### Access Token

```js
import { useAuth } from '@workos-inc/authkit-react';
import { UserSessions, WorkOsWidgets } from '@workos-inc/widgets';

export function SessionsPage() {
  const { isLoading, user, getAccessToken } = useAuth();
  if (isLoading) {
    return '...';
  }
  if (!user) {
    return 'Logged in user is required';
  }

  return (
    <WorkOsWidgets>
      <UserSessions authToken={getAccessToken} />
    </WorkOsWidgets>
  );
}
```

## API Reference
