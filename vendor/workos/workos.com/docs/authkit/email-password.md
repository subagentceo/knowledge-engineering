# Email + Password

## Introduction

Email + Password authentication allows users to sign up and sign in to your application using an email address and password combination. This is one of the most common forms of authentication and is enabled by default.

## Password configuration

In the majority of cases, no additional configuration is required. However, depending on your application's security requirements you may wish to modify the password strength policy.

### Modifying the password strength policy

A strong set of password rules are applied to all users by default. This ensures that:

- All passwords meet a minimum required length
- Low complexity passwords are rejected
- Breached passwords (flagged by [haveibeenpwned](https://haveibeenpwned.com)) are rejected

These defaults are recommended in the majority of cases, however, if you wish to modify the password policy you can do so in the *Authentication* section of the [WorkOS dashboard](https://dashboard.workos.com).

You can enable password history to prevent password reuse. When modifying your policy, you can reject up to 10 of each user's most recently used previous passwords. Password history is disabled by default.

AuthKit will enforce your policy within the sign up and password reset flows.

![Dashboard password strength policy](https://images.workoscdn.com/images/d9ab3375-78b8-4dc4-a15c-76af2fad671e.png?auto=format\&fit=clip\&q=80)

### Disabling Email + Password

Disabling this method entirely will prevent users from signing up or signing in using a password. This is useful when you want to restrict access to your application to only those users who have been provisioned via SSO.

***

## Integrating via the API

If you'd prefer to build and manage your own authentication UI, you can do so via the AuthKit [Authentication API](https://workos.com/docs/reference/authkit/authentication).

Examples of building custom UI are also [available on GitHub](https://github.com/workos/authkit).
