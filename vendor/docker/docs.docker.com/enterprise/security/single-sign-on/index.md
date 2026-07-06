# Single sign-on overview




Single sign-on (SSO) lets users access Docker by authenticating through their
identity providers (IdPs). SSO can be configured for an entire company,
including all associated organizations, or for a single organization that has a
Docker Business subscription.

## How SSO works

When SSO is enabled, Docker supports a non-IdP-initiated flow for user sign-in.
Instead of signing in with a Docker username and password, users are redirected
to your IdP’s sign-in page. Users must initiate the SSO authentication process
by signing in to Docker Hub or Docker Desktop.

The following diagram illustrates how SSO operates and is managed between
Docker Hub, Docker Desktop, and your IdP.

![SSO architecture](/enterprise/security/single-sign-on/images/SSO.png)

## Set up SSO

To configure SSO in Docker, follow these steps:

1. [Configure your domain](/enterprise/security/single-sign-on/connect/) by creating and verifying it.
1. [Create your SSO connection](/enterprise/security/single-sign-on/connect/) in Docker and your IdP.
1. Link Docker to your identity provider.
1. Test your SSO connection.
1. Provision users in Docker.
1. Optional. [Enforce sign-in](/enterprise/enforce-sign-in/).
1. [Manage your SSO configuration](/enterprise/security/single-sign-on/manage/).

Once configuration is complete, users can sign in to Docker services using
their company email address. After signing in, users are added to your company,
assigned to an organization, and added to a team.

> [!IMPORTANT]
>
> When SSO is enforced, CLI password-based sign-in is no longer supported.
> Use a personal access token (PAT) for CLI access. For more information, see the
> [security announcement](/security/security-announcements/#deprecation-of-password-logins-on-cli-when-sso-enforced).

## Next steps

- Start [configuring SSO](/enterprise/security/single-sign-on/connect/).
- Read the [FAQs](/enterprise/security/single-sign-on/FAQs/general/).
- [Troubleshoot](/enterprise/security/single-sign-on/troubleshoot-sso/) SSO issues.

