# Migrate from the standalone SSO API

## Introduction

The WorkOS AuthKit API supports all of the same social and enterprise identity providers, while providing higher level authentication features that most applications need. In this guide, we'll outline the steps to migrate an existing WorkOS SSO integration to the AuthKit API.

> The existing standalone [WorkOS SSO API](https://workos.com/docs/reference/sso) will continue to be supported. This is a viable option for you if you prefer to handle more of the authentication flow yourself.

## The new User resource

The primary difference between existing integrations with [SSO](https://workos.com/docs/sso) or [Directory Sync](https://workos.com/docs/directory-sync) is the addition of a new resource: [Users](https://workos.com/docs/reference/authkit/user).

The WorkOS [User object](https://workos.com/docs/reference/authkit/user) represents a single user in your application, and binds together information from all of the Directory and Identity providers that WorkOS supports into a single resource. As you migrate your existing integration, you can expect to replace references to WorkOS Profiles and Directory Users with instead references to Users.

## Switch to AuthKit API calls

If you have built an integration with our standalone SSO API using [Get Authorization URL](https://workos.com/docs/reference/sso/get-authorization-url), you will need to switch these calls with analogous calls to the AuthKit API.

### (1) Switch SSO initiation call

When initiating SSO for one of your users, instead of calling the SSO [Get Authorization URL](https://workos.com/docs/reference/sso/get-authorization-url) API, call the AuthKit [Get Authorization URL](https://workos.com/docs/reference/authkit/authentication/get-authorization-url) API instead:

#### Next.js

```js
import type { NextApiRequest, NextApiResponse } from 'next';
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

export default (_req: NextApiRequest, res: NextApiResponse) => {
  // The user's organization ID
  const organization = 'org_123';

  // The callback URI WorkOS should redirect to after the authentication
  const redirectUri = 'https://my-app.com/callback';

  /* -diff-start */
  const authorizationUrl = workos.sso.getAuthorizationUrl({
    organization,
  /* -diff-end */
  /* +diff-start */
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    organizationId: organization,
  /* +diff-end */
    redirectUri,
    clientId,
  });

  res.redirect(authorizationUrl);
};
```

#### Express

```js
const express = require('express');
const { WorkOS } = require('@workos-inc/node');

const app = express();

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

app.get('/auth', (_req, res) => {
  // The user's organization ID
  const organization = 'org_123';

  // The callback URI WorkOS should redirect to after the authentication
  const redirectUri = 'https://my-app.com/callback';

  /* -diff-start */
  const authorizationUrl = workos.sso.getAuthorizationUrl({
    organization,
  /* -diff-end */
  /* +diff-start */
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    organizationId: organization,
  /* +diff-end */
    redirectUri,
    clientId,
  });

  res.redirect(authorizationUrl);
});
```

The AuthKit Get Authorization API supports all of the same initiation parameters as the SSO API. In addition, it also supports an additional provider type, `authkit`, which will be covered later in this guide.

### (2) Switch API in Application Callback

Similar to an SSO integration, your application will still have a callback identified by the Redirect URI passed during the previous initiation call. The contract with your callback is the same, where you should expect to be given a `code`, along with any `state` that was originally provided.

However, instead of calling the SSO [Get a Profile and Token](https://workos.com/docs/reference/sso/profile/get-profile-and-token) API, call the AuthKit [Authenticate](https://workos.com/docs/reference/authkit/authentication) API instead, with the `grant_type` set to `authorization_code`:

#### Next.js

```js
import type { NextApiRequest, NextApiResponse } from 'next';
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  /* -diff-start */
  const { profile } = await workos.sso.getProfileAndToken({
  /* -diff-end */
  /* +diff-start */
  const { user } = await workos.userManagement.authenticateWithCode({
  /* +diff-end */
    code,
    clientId,
  });

  // Use the information in `user` for further business logic.

  res.redirect('/');
};
```

#### Express

```js
const express = require('express');
const { WorkOS } = require('@workos-inc/node');

const app = express();
const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  /* -diff-start */
  const { profile } = await workos.sso.getProfileAndToken({
  /* -diff-end */
  /* +diff-start */
  const { user } = await workos.userManagement.authenticateWithCode({
  /* +diff-end */
    code,
    clientId,
  });

  // Use the information in `user` for further business logic.

  res.redirect('/');
});
```

> **Important:** Instead of receiving a [Profile](https://workos.com/docs/reference/sso/profile), your application now receives a full [User object](https://workos.com/docs/reference/authkit/user). While many of the fields are similar, such as the user’s email or name, the **User ID’s will be different** than the Profile ID’s you may have previously persisted in your application.

If email is a unique identifier in your application, you can use the WorkOS User’s email to identify the application-local user. WorkOS ensures that user email is verified before successfully completing an authentication request. When the API issues an email verification challenge, an [email verification response](https://workos.com/docs/reference/authkit/authentication-errors/email-verification-required-error) is returned.

### Handling new authentication flows

The AuthKit API offers a higher-level abstraction than the SSO API, offering more advanced [security features](https://workos.com/docs/authkit/overview/security) like email verification and account Linking.

This means that when your application attempts to exchange a code for a user object, it may return one of several new expected errors. These map to cases that were previously mentioned, like requiring that the user first verify their email, or enroll in MFA.

If your application doesn’t require these extra settings, they can be disabled in the *Authentication* section of the [WorkOS Dashboard](https://dashboard.workos.com/).

> If you are using AuthKit, you won’t need to handle error cases like required email verification, as AuthKit will automatically request this before a user is directed to their callback endpoint.

## AuthKit

If you prefer to have full control over the authentication UI, you can choose to integrate with the AuthKit API directly. However, the easiest way to get started is to use AuthKit Hosted UI, a pre-built hosted authentication UI that guides users through all of the advanced flows, like email verification and MFA enrollment.

You can enable AuthKit from the WorkOS dashboard, where you can also configure AuthKit branding and custom domains.

Getting started with AuthKit is as simple as passing `authkit` as the `provider`:

#### Next.js

```ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  // The callback URI WorkOS should redirect to after the authentication
  const redirectUri = 'https://my-app.com/callback';

  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    /* +diff-start */
    provider: 'authkit',
    /* +diff-end */
    redirectUri,
    clientId,
  });

  res.redirect(authorizationUrl);
};
```

#### Express

```js
app.get('/auth', (_req, res) => {
  // The callback URI WorkOS should redirect to after the authentication
  const redirectUri = 'https://my-app.com/callback';

  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    /* +diff-start */
    provider: 'authkit',
    /* +diff-end */
    redirectUri,
    clientId,
  });

  res.redirect(authorizationUrl);
});
```

AuthKit can handle many of the concerns your application likely needed to previously, such as identifying which users sign in using enterprise SSO, and correctly routing them to their organization’s identity provider.

## Directory Sync

Directory provisioning is also supported in AuthKit. See the [Directory Provisioning documentation](https://workos.com/docs/authkit/directory-provisioning) to learn more.

## Next Steps

Check out the [full guide](https://workos.com/docs/authkit), along with the [API reference](https://workos.com/docs/reference/authkit) to get an idea of all the ways your application’s user management needs can be solved by WorkOS.

If you need help migrating your existing WorkOS integration, or have any other questions, please reach out to [WorkOS support](mailto:support@workos.com?subject=WorkOS%20Support).
