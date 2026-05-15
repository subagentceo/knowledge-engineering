# User Profile Widget

![User Profile Widget screenshot](https://images.workoscdn.com/images/790e97bb-0875-4ca7-8ff4-c01dafce77f4.png?auto=format\&fit=clip\&q=50)

The `<UserProfile />` widget allows users to view and manage their personal information.
Users can see their profile details and edit their display name.
This widget provides a simple, user-friendly interface for basic profile management.

No special permissions are required to use this widget.

#### Widget Token

```js
import { UserProfile, WorkOsWidgets } from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend. See the
 * "Tokens" section of this guide for details on how to generate the token
 */
export function ProfilePage({ authToken }) {
  return (
    <WorkOsWidgets>
      <UserProfile authToken={authToken} />
    </WorkOsWidgets>
  );
}
```

#### Access Token

```js
import { useAuth } from '@workos-inc/authkit-react';
import { UserProfile, WorkOsWidgets } from '@workos-inc/widgets';

export function ProfilePage() {
  const { isLoading, user, getAccessToken } = useAuth();
  if (isLoading) {
    return '...';
  }
  if (!user) {
    return 'Logged in user is required';
  }

  return (
    <WorkOsWidgets>
      <UserProfile authToken={getAccessToken} />
    </WorkOsWidgets>
  );
}
```

## API Reference
