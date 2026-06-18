# Social Login

## Introduction

Social Login allows users to sign in or sign up using their existing credentials with OAuth providers such as Google, Microsoft, GitHub, and Apple.

## Getting started

AuthKit will make the necessary API calls and route users through OAuth providers automatically during the authentication flow, though the relevant providers must first be configured and enabled.

### (1) Configure OAuth providers

Configuration can be supplied via the *Authentication* section of the [WorkOS Dashboard](https://dashboard.workos.com). WorkOS provides integration guides for common providers such as [Google](https://workos.com/docs/integrations/google-oauth), [Microsoft](https://workos.com/docs/integrations/microsoft-oauth), [GitHub](https://workos.com/docs/integrations/github-oauth), [Apple](https://workos.com/docs/integrations/apple), [GitLab](https://workos.com/docs/integrations/gitlab-oauth), [LinkedIn](https://workos.com/docs/integrations/linkedin-oauth), and [Slack](https://workos.com/docs/integrations/slack-oauth).

![Dashboard configure OAuth settings](https://images.workoscdn.com/images/037ede88-0b7a-4e26-9ede-441a25ce584c.png?auto=format\&fit=clip\&q=80)

### (2) Enable OAuth providers

After a provider has been configured and enabled, it will appear as a sign in option on the AuthKit authentication page.

![AuthKit sign in page with social providers highlighted](https://images.workoscdn.com/images/f743cf4f-a32c-464b-94a4-db9f5c146773.png?auto=format\&fit=clip\&q=80)

## Custom OAuth scopes

AuthKit offers support for custom OAuth scopes for Google, Microsoft, GitHub, GitLab, and Xero integrations. This allows you to request specific permissions when accessing user profile data from these providers. For instance, requesting access to read Google Calendar events or retrieve emails from a Microsoft account. See the relevant provider section for more information:

- [Google](https://workos.com/docs/integrations/google-oauth/configure-additional-oauth-scopes-optional)
- [Microsoft](https://workos.com/docs/integrations/microsoft-oauth/configure-additional-oauth-scopes-optional)
- [GitHub](https://workos.com/docs/integrations/github-oauth/configure-additional-oauth-scopes-optional)
- [GitLab](https://workos.com/docs/integrations/gitlab-oauth/configure-additional-oauth-scopes-optional)
- [Xero](https://workos.com/docs/integrations/xero-oauth/configure-additional-oauth-scopes-optional)

## Provider-driven user profile updates

When a user logs in with a social provider, the user profile information may be updated. The user's profile picture and name will always be updated to match the information supplied by the social provider. If the email address at the provider has changed and the user is only linked to a single provider, the email will also be updated to match. If the new email is already in use, no change will take place.

***

## Integrating via the API

If you'd prefer to build and manage your own authentication UI, you can do so via the AuthKit [Authentication API](https://workos.com/docs/reference/authkit/authentication).

Examples of building custom UI are also [available on GitHub](https://github.com/workos/authkit).
