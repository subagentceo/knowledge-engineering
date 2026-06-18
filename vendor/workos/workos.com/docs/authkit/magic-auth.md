# Magic Auth

## Introduction

Magic Auth is a passwordless authentication method that allows users to sign in or sign up via a unique, six digit one-time-use code sent to their email inbox.

## Getting started

AuthKit will make the necessary API calls to issue one-time-use codes via email and provide input verification and authentication automatically. If desired, you can [send these emails yourself](https://workos.com/docs/authkit/custom-emails).

### Enabling Magic Auth

Magic Auth can be enabled in the *Authentication* section of the [WorkOS dashboard](https://dashboard.workos.com). Users will then be able to sign in or sign up via Magic Auth on the AuthKit authentication page.

One-time-use codes expire after **10 minutes**.

![Dashboard showing how to enable Magic Auth](https://images.workoscdn.com/images/78df279e-3bd5-451e-a0a0-7e93ed5e5bd5.png?auto=format\&fit=clip\&q=80)

![AuthKit displaying email sign-in](https://images.workoscdn.com/images/9129ad29-d488-462b-ad85-3a2a7908235d.png?auto=format\&fit=clip\&q=80)

![AuthKit displaying code input UI](https://images.workoscdn.com/images/1810724e-466f-4f76-b905-12167a051cdf.png?auto=format\&fit=clip\&q=80)

***

## Integrating via the API

If you'd prefer to build and manage your own authentication UI, you can do so via the AuthKit [Magic Auth API](https://workos.com/docs/reference/authkit/magic-auth).

Examples of building custom UI are also [available on GitHub](https://github.com/workos/authkit).
