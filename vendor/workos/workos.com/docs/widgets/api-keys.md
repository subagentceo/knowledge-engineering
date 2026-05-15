# API Keys Widget

![API Keys widget screenshot](https://images.workoscdn.com/images/13e0893f-eb84-43f1-9467-2598567538f3.png?auto=format\&fit=clip\&q=50)

The `<ApiKeys />` widget allows users to create, view, and revoke API keys, all within the widget. It supports two scopes via the `scope` prop:

- `"organization"` (the default): manage API keys owned by the organization.
- `"user"`: manage API keys owned by individual users.

## Organization API keys

The default `scope="organization"` mode allows admins to manage API keys in an organization. Admins can create API keys with specific permissions, view details of existing API keys, and revoke API keys.

In order to use the widget with `scope="organization"`, a user must have a role that has the `widgets:api-keys:manage` permission.

#### Widget Token

```js
import { ApiKeys, WorkOsWidgets } from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend. See the
 * "Tokens" section of this guide for details on how to generate the token
 */
export function ApiKeysPage({ authToken }) {
  return (
    <WorkOsWidgets>
      <ApiKeys authToken={authToken} />
    </WorkOsWidgets>
  );
}
```

#### Access Token

```js
import { useAuth } from '@workos-inc/authkit-react';
import { ApiKeys, WorkOsWidgets } from '@workos-inc/widgets';

export function ApiKeysPage() {
  const { isLoading, user, getAccessToken } = useAuth();
  if (isLoading) {
    return '...';
  }
  if (!user) {
    return 'Logged in user is required';
  }

  return (
    <WorkOsWidgets>
      <ApiKeys authToken={getAccessToken} />
    </WorkOsWidgets>
  );
}
```

## User API keys

Setting `scope="user"` puts the widget into user API key management. In order to use the widget with `scope="user"`, a user must have a role that has at least one of the following permissions:

- `widgets:user-api-keys:manage-self`: the user can create, view, and revoke their own API keys.
- `widgets:user-api-keys:manage-all`: includes everything `manage-self` grants, plus the ability to view and revoke API keys owned by any other user in the organization.

#### Widget Token

```js
import { ApiKeys, WorkOsWidgets } from '@workos-inc/widgets';

/**
 * @param {string} authToken - A widget token that was fetched in your backend
 * with one of `widgets:user-api-keys:manage-self` or
 * `widgets:user-api-keys:manage-all`. See the "Tokens" section of this guide
 * for details on how to generate the token.
 */
export function UserApiKeysPage({ authToken }) {
  return (
    <WorkOsWidgets>
      <ApiKeys authToken={authToken} scope="user" />
    </WorkOsWidgets>
  );
}
```

#### Access Token

```js
import { useAuth } from '@workos-inc/authkit-react';
import { ApiKeys, WorkOsWidgets } from '@workos-inc/widgets';

export function UserApiKeysPage() {
  const { isLoading, user, getAccessToken } = useAuth();
  if (isLoading) {
    return '...';
  }
  if (!user) {
    return 'Logged in user is required';
  }

  return (
    <WorkOsWidgets>
      <ApiKeys authToken={getAccessToken} scope="user" />
    </WorkOsWidgets>
  );
}
```

## API Reference
