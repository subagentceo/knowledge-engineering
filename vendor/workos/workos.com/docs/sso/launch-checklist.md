# Launch Checklist

## Implement complementary enterprise features

- Integrate the WorkOS [Admin Portal](https://workos.com/docs/admin-portal) to enable your users to onboard and set up SSO themselves.
- Integrate the WorkOS Directory Sync API for automatic user updating, provisioning, and deprovisioning.

### Before you start

This document offers guidance to integrate Single Sign-On with our standalone API into your existing auth stack. You might also want to look at [AuthKit](https://workos.com/docs/authkit), a complete authentication platform that leverages Single Sign-On functionality out of the box, following best practices.

## Create an IP Allowlist

WorkOS makes use of Cloudflare to ensure security and reliability of all operations. If you are looking to create a list of allowed IP addresses for redirect requests, you can use the IP Ranges listed in the [Cloudflare documentation](https://www.cloudflare.com/ips/).

## Go-live checklist

- \[ ] Implement an SSO UI/UX. See our guide for ideas – [UI/UX Best Practices for IdP & SP-Initiated SSO](https://workos.com/blog/ui-ux-best-practices-for-idp-and-sp-initiated-sso)
- \[ ] [Test the end-to-end SSO](https://workos.com/docs/sso/test-sso) experience in your Staging environment.
- \[ ] Unlock your Production environment by adding your billing information
  > Only enterprise connections in your Production environment will be charged. OAuth connections in Production will be free.
- \[ ] Set your Production Client’s ID and API Key as environment variables
- \[ ] Secure your Production Project’s API key
- \[ ] Configure production redirect URI(s) for your application. Verify the default redirect URI is correct
- \[ ] Ensure that your application can receive redirects from WorkOS.
  Depending on your network architecture, you may need to allowlist incoming redirect traffic from `api.workos.com`.
- \[ ] Add Connections for your customers in the Production Environment

## Frequently asked questions

### How should an application handle the first time a user authenticates using WorkOS?

If a user is authenticating to your application for the first time via SSO and doesn’t have an account, you can implement just-in-time provisioning to create a user when authentication is complete.

You can also leverage [Directory Sync](https://workos.com/docs/directory-sync) to pre-provision users with API endpoints or webhooks. In this case, the user will already be created in your application when they authenticate for the first time.

### Can we add SSO authentication for a current user in an application?

If a user is authenticating to your application via SSO, but already has an account (with username/password for example), you can “upgrade” them to SSO. Usually the emails are the same for both methods of authentication, so you can match on email address. Once SSO via WorkOS is enabled, you can restrict users to sign in with only SSO.

### How does WorkOS manage user attributes from an identity provider?

WorkOS normalizes user attributes so you can expect known values such as `id`, `email`,`firstName`, and `lastName`.

### Is the user attribute mapping configurable in WorkOS?

Yes. For example, let’s say the `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname` attribute contains the user email rather than the `surname` as the attribute name suggests. In these edge cases, WorkOS will identify any attributes that are misconfigured and recommend correct mapping in the “Attribute Mapper“ section of the “Connection info” page.

### What does the “Allow Profiles Outside Organization” option do?

By default, WorkOS restricts user profiles for SAML Connections to profiles that have email domains that are in the set of [User Email Domains](https://workos.com/docs/reference/domain-verification) on the Organization.

Enabling this option removes this restriction and allows user profiles with any email address to sign in through Connections under this Organization.

If this option is enabled, your code can not exclusively trust the returned `email` attribute on user profiles to be a verified email address. Instead, you must use the `organization_id` or `connection_id` in order to verify that the profile belongs to whom it claims.

### What does “There are 0 profiles awaiting reconciliation” refer to?

This refers to the number of user profiles that have inconsistent attribute mappings, and that need to be updated in order to successfully authenticate.

### How do I integrate WorkOS SSO with my native mobile application?

When it comes to mobile applications, our typical advice in implementing SSO authentication goes like this:

1. Generate the authentication URL and route the user to a browser or browser fragment in order to authenticate.
2. The end user authenticates via the native UI of their IdP within that browser.
3. Upon successful authentication, deep-link the user back into your native application.
