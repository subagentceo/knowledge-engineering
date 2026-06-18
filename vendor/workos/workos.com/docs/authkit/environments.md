# Staging vs. production environments

## Introduction

WorkOS provides two separate environments — **staging** and **production** — so you can build and test your integration before going live. This guide explains the differences between them, when to use each, and how to transition from staging to production.

Every WorkOS workspace includes a staging environment and a production environment. These are fully separate: API keys, organizations, connections, users, and webhook endpoints are all scoped to a single environment and don't carry over between them.

One notable exception is **AuthKit branding**. Logo, colors, and custom theme settings are shared across environments, so any branding you configure in [Branding](https://workos.com/docs/authkit/branding) will appear in both staging and production.

## When to use staging

Use the staging environment when you're:

- **Evaluating WorkOS** for the first time and exploring the API
- **Building your integration** locally or in a development environment
- **Testing Single Sign-On, Directory Sync, or other enterprise features** using the built-in test identity provider (IdP)
- **Running automated tests** or CI pipelines against WorkOS
- **Demoing your integration** to internal stakeholders before launch

Staging is free. No connections in staging incur charges, regardless of type.

## When to use production

Use the production environment when you're:

- **Serving real end users** who need to authenticate or connect via Single Sign-On
- **Onboarding enterprise customers** with live identity provider connections
- **Deploying to a customer-facing URL** with HTTPS

Production requires adding billing information in the [WorkOS Dashboard](https://dashboard.workos.com/). Enterprise connections (such as SAML-based Single Sign-On or SCIM-based Directory Sync) in production incur per-connection charges. AuthKit is free for up to 1 million monthly active users (MAUs), after which usage-based pricing applies. OAuth connections and all staging connections are free.

> If you're building an app that only uses AuthKit for username/password authentication with no Single Sign-On connections, you won't incur any charges in production as long as you stay under 1 million monthly active users. However, you still need to add billing information to unlock the production environment. See [pricing](https://workos.com/pricing) for details.

## Key differences

| Feature                    | Staging                                                | Production                                                                               |
| -------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **Redirect URIs**          | Allows `http://` and `localhost` for local development | Requires `https://` for web apps; `http://127.0.0.1` is still allowed for native clients |
| **API keys**               | Reviewable in the dashboard                            | Shown once at creation — store securely                                                  |
| **Custom domains**         | Uses WorkOS domains                                    | Can use [custom domains](https://workos.com/docs/custom-domains)                                                |
| **Billing**                | No charges                                             | Enterprise connections incur charges; AuthKit free up to 1M MAUs                         |
| **Test identity provider** | Built-in test IdP available                            | No test IdP — use real connections                                                       |
| **Rate limits**            | Same as production                                     | Same as staging                                                                          |
| **Branding**               | Shared with production                                 | Shared with staging                                                                      |

## What to set up in production

Staging and production are separate environments. Apart from branding, nothing carries over automatically. When you switch to production, you'll need to set up the following:

- **API keys and Client IDs** — see [API authentication](https://workos.com/docs/reference/api-authentication)
- **Redirect URIs** — see [Redirect URI requirements](https://workos.com/docs/reference/authkit/authentication/get-authorization-url/redirect-uri)
- **Organizations and connections** — if you're using SSO or Directory Sync
- **Webhook endpoints and secrets** — if your integration consumes WorkOS events; see [Webhooks](https://workos.com/docs/reference/webhooks)
- **Custom domains** — if you want to use them in production; see [Custom domains](https://workos.com/docs/custom-domains)

## Going live

Every integration should do the following:

1. **Verify your integration works end-to-end in staging.** For most workflows, staging is sufficient to fully validate your integration before touching production.
2. **Unlock production** by adding billing information in the [WorkOS Dashboard](https://dashboard.workos.com/).
3. **Generate your production API key** and store it securely. Production API keys can only be viewed once. See [API authentication](https://workos.com/docs/reference/api-authentication).
4. **Note your production Client ID** and update your app's environment variables.
5. **Configure production redirect URIs** for your application. For most web apps these must use `https://`. See [Redirect URI requirements](https://workos.com/docs/reference/authkit/authentication/get-authorization-url/redirect-uri).
6. **(Optional) Set up [custom domains](https://workos.com/docs/custom-domains)** for AuthKit, Admin Portal, or the Authentication API.
7. **Test the full authentication flow in production** before sending real traffic there.

If you're using enterprise features like SSO or Directory Sync, you'll also need to:

1. **Recreate organizations and connections** in production for your live customers.
2. **Set up production webhook endpoints** and store the new signing secret if your integration consumes WorkOS events. See [Webhooks](https://workos.com/docs/reference/webhooks).
3. **Generate Admin Portal links** for customer IT contacts to self-configure their connections if you're using self-serve setup.

For the full Single Sign-On launch checklist, see the [SSO launch checklist](https://workos.com/docs/sso/launch-checklist).

> Avoid configuring test SAML providers in production. Test providers may display generic or placeholder company names to your users, and any enterprise connections in production may count toward billing — even test ones. Do all SSO testing in staging.

## Frequently asked questions

### Do I need a separate WorkOS account for staging and production?

No. Both environments are included in a single WorkOS workspace.

### Can I have multiple staging or production environments?

Yes. Every workspace starts with a staging and production environment, but you can add more. Additional environment creation may be available directly in your dashboard settings. If you don't see the option, contact [support](mailto:support@workos.com) to have one created.

### Can I copy data from staging to production?

Not currently. Staging and production are fully isolated, and there isn't a built-in way to promote or migrate organizations, connections, or users between them today. When you're ready to go live, you'll need to recreate your organizations and connections in the production environment. Your end users will re-authenticate through AuthKit, which creates their accounts in production automatically.

### Can I convert a staging environment to a production environment?

Not self-serve. If you've accidentally been serving live traffic from a staging environment, contact [support](mailto:support@workos.com) for assistance. To avoid this situation, keep staging for development and testing only — staging environments are not intended for customer-facing traffic per the [Terms of Service](https://workos.com/terms).

### What features are only available in production?

Almost everything works identically across both environments. The main differences are:

- [Custom domains](https://workos.com/docs/custom-domains) for AuthKit, Admin Portal, and the Authentication API are only available in production environments.
- SSO and Directory Sync connections in staging are not billed, so you can test freely.

### Is it safe to use real OAuth credentials in staging?

Yes. You can safely configure real OAuth provider credentials (Google, Microsoft, GitHub, etc.) in your staging environment for testing. Staging environments are fully functional and secure — the only limitations are the production-only features listed above.

### Can I move an environment between workspaces?

No. Environments are tied to a specific workspace and can't be transferred.
