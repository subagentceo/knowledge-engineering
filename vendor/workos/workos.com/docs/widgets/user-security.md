# User Security Widget

![User Security Widget screenshot](https://images.workoscdn.com/images/91c883ca-c3e5-474f-b93f-c2e1d0517380.png?auto=format\&fit=clip\&q=50)

The `<UserSecurity />` widget enables users to control their security settings. With this widget, users can:

- Set or change their password
- Configure and reset Multi-Factor Authentication

No special permissions are required to use this widget.

#### Widget Token

```js
import { UserSecurity, WorkOsWidgets } from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend. See the
 * "Tokens" section of this guide for details on how to generate the token
 */
export function SecurityPage({ authToken }) {
  return (
    <WorkOsWidgets>
      <UserSecurity authToken={authToken} />
    </WorkOsWidgets>
  );
}
```

#### Access Token

```js
import { useAuth } from '@workos-inc/authkit-react';
import { UserSecurity, WorkOsWidgets } from '@workos-inc/widgets';

export function SecurityPage() {
  const { isLoading, user, getAccessToken } = useAuth();
  if (isLoading) {
    return '...';
  }
  if (!user) {
    return 'Logged in user is required';
  }

  return (
    <WorkOsWidgets>
      <UserSecurity authToken={getAccessToken} />
    </WorkOsWidgets>
  );
}
```

## API Reference
