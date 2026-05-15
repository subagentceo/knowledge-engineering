# Authorization Tokens

Widgets must be supplied with an authorization token. The token can be acquired in one of two ways:

- If you are using the `authkit-js` or `authkit-react` libraries, you can use the provided access token.
- If you use one of our backend SDKs, use the "get token" method in the SDK to request a token with the appropriate scope for the widget you want to use. Widget tokens expire after one hour.

```js
const authToken = await workos.widgets.getToken({
  userId: user.id,
  organizationId,
  // scopes corresponds to the permissions required for each widget (see below)
  scopes: ['widgets:users-table:manage', 'widgets:sso:manage'],
});
```

> New WorkOS accounts are created with an "Admin" role that has all Widget permissions assigned. Existing accounts will need to assign the proper permissions to a role. This can be done on the "Roles" page of the WorkOS Dashboard. See the [Roles and Permissions guide](https://workos.com/docs/authkit/roles-and-permissions) for more information.

To successfully generate a token, the user must be assigned a role with the correct permissions for the widget.
