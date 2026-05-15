# Pipes Widget

![Pipes widget screenshot](https://images.workoscdn.com/images/e84a33bb-0510-4d85-9041-33b1a0ce938c.png?auto=format\&fit=clip\&q=50)

The `<Pipes />` widget allows users to manage their connections to third-party
providers. Users can view the available providers, connect their
accounts, reauthorize when needed, and disconnect
their accounts.

Read more in the [Pipes guide](https://workos.com/docs/pipes).

#### Widget Token

```js
import { Pipes, WorkOsWidgets } from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend. See the
 * "Tokens" section of this guide for details on how to generate the token
 */
export function PipesPage({ authToken }) {
  return (
    <WorkOsWidgets>
      <Pipes authToken={authToken} />
    </WorkOsWidgets>
  );
}
```

#### Access Token

```js
import { useAuth } from '@workos-inc/authkit-react';
import { Pipes, WorkOsWidgets } from '@workos-inc/widgets';

export function PipesPage() {
  const { isLoading, user, getAccessToken } = useAuth();
  if (isLoading) {
    return '...';
  }
  if (!user) {
    return 'Logged in user is required';
  }

  return (
    <WorkOsWidgets>
      <Pipes authToken={getAccessToken} />
    </WorkOsWidgets>
  );
}
```

## API Reference
