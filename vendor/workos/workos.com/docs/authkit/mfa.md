# Multi-Factor Authentication

## Introduction

Multi-Factor Authentication (MFA) is an additional method of securing your application. MFA adds a layer of security during sign in that requires a user to provide an additional time-based one-time password (TOTP).

## Getting started

AuthKit will make the necessary API calls to handle first-time configuration of users' MFA factors automatically, and validate one-time codes as part of the authentication flow.

### Enabling MFA

MFA can be enabled in the *Authentication* section of the [WorkOS Dashboard](https://dashboard.workos.com). New and existing users will be required to set up multi-factor authentication with an authenticator app that supports one-time passcodes before they can sign in.

> The MFA requirement **does not** apply to SSO users.

![Dashboard showing how to enable MFA](https://images.workoscdn.com/images/f660826c-cb2d-4912-ba10-1f622d6a447d.png?auto=format\&fit=clip\&q=80)

![AuthKit displaying MFA configuration](https://images.workoscdn.com/images/31fcbe12-63c2-47e2-9685-d45fe4d41fb5.png?auto=format\&fit=clip\&q=80)

***

## Integrating via the API

If you'd prefer to build and manage your own authentication UI, you can do so via the AuthKit [Multi-Factor API](https://workos.com/docs/reference/authkit/mfa).

Examples of building custom UI are also [available on GitHub](https://github.com/workos/authkit).
