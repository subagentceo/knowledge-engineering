# Domains

## Organizations

When an [Organization](https://workos.com/docs/reference/organization) is created in the WorkOS Dashboard or the [Create Organization API](https://workos.com/docs/reference/organization/create), one or more domains can be associated with the organization.

Domains added to an organization need to be verified in order to activate SSO. When creating an organization via the API, domains can be initially added as either `'verified'` if already trusted, or `'pending'` if further verification is required.

If added as `'pending'`, the domain can later be verified via the WorkOS Dashboard, by an IT contact via the self-serve [Admin Portal](https://workos.com/docs/domain-verification/) flow, or through successful [DNS verification](https://workos.com/docs/domain-verification/api).

> Domains manually added in the WorkOS Dashboard are automatically considered verified.

## Email validation

During authentication, WorkOS uses these domains to verify the user signing in through the organization's [Connection](https://workos.com/docs/reference/sso/connection) belongs to one of these domains. If the domain of the user's email address does not match one of the organization's domains (or the organization has no verified domains) they will be sent to your [Redirect URI](https://workos.com/docs/sso/redirect-uris) with a [`profile_not_allowed_outside_organization`](https://workos.com/docs/reference/sso/get-authorization-url/error-codes) error.

Rejecting users with non-matching email domains prevents the impersonation of users in other organizations. This would otherwise be possible since many Identity Providers allow IT contacts to create user accounts with *any* email address, regardless of whether the IT contact actually controls the email address or its domain.

For example, an IT contact of an organization with the domain `foo.com` can create a user account for `user@bar.com` in their Identity Provider and then sign in as that user. If the application were to receive the profile and naively look up the user record using *only* the email address, then the IT contact will have gained access to the `user@bar.com` account.

Since WorkOS cannot guarantee every application handles this scenario correctly, **the default behavior is to reject profiles when its email address does not match the associated organization's domains.**

## Allowing any domain

Some applications may have organizations whose users sign in using a list of domains that cannot be statically defined, or a set of domains so large as to be cumbersome to configure.

A common use-case is non-domain guests. Imagine an organization hires a design consultancy and requires the designers to sign in using the organization's IdP. While the organization can create accounts in their IdP for these guests, they cannot add the designer's domain to the WorkOS organization since they cannot verify ownership of it. The default organization domain verification policy will prevent these designer's from signing in.

If your application has a similar use-case, [contact support](mailto:support@workos.com) and we can work with you to relax the default organization domain verification policy. SSO will no longer require any domains to be added to the organization. This change can be made for any of your environments and will affect all organizations in the environment.

## Implement profile validation

Your application will be responsible for validating the email addresses of users using SSO, and checking the appropriate fields from the SSO profile.

Important data from the SSO profile includes the `id` and the `organization_id`. Generally applications will store the Profile `id` alongside its users, such as a column on a `users` table. Similarly, the `organization_id` will be stored on the matching entity, such as a `teams` or `workspace` table; whichever represents a collection of users that are related to each other.

```json language="json" title="SSO profile"
{
  "object": "profile",
  "id": "prof_01DMC79VCBZ0NY2099737PSVF1",
  "connection_id": "conn_01E4ZCR3C56J083X43JQXF3JK5",

  // Your application should restrict any email-based JIT user
  // provisioning to within the organization that matches this ID.
  "organization_id": "org_01EHWNCE74X7JSDV0X3SZ3KJNY",

  // Only match based on email or email domain unless you are
  // filtering potential matches by the organization ID above.
  "email": "todd@example.com"

  // ...
}
```

Here's an updated version of the WorkOS callback endpoint from the [Quick Start guide](https://workos.com/docs/sso/1-add-sso-to-your-app/add-a-callback-endpoint) with examples of these checks added:

```javascript langauge="JavaScript" title="WorkOS callback"
const { WorkOS } = require('@workos-inc/node');
const workos = new WorkOS(process.env.WORKOS_API_KEY);

app.get('/callback', async (req, res) => {
  const { profile } = await workos.sso.getProfileAndToken({
    code: req.query.code,
    clientId: process.env.WORKOS_CLIENT_ID,
  });

  // Your application should have a resource that is analogous to the WorkOS
  // organization, like a "team" or "workspace".
  const team = TeamsService.findByWorkOsOrganizationId(profile.organizationId);

  if (!team) {
    return res.status(401).send({
      message: 'Unauthorized',
    });
  }

  // Your application should use the Profile ID to determine whether there is an
  // existing user linked to the SSO profile, within the scope of the "team" or
  // "workspace" associated with the WorkOS organization.
  //
  // If none is found, you can then fall back to the `email` address. If one is
  // found you should link the profile ID to the user for subsequent sign-ins.
  //
  // Finally, if no user exists with the email either, you can implement
  // JIT-provisioning and create a new user record, persisting both the `email`
  // and the ID from the profile.
  const { user } = team.users.findOrCreateByWorkOsProfile(profile);

  // Make sure to verify the user's email address. You may choose to skip
  // email verification in order to improve UX, but should only do so if
  // the new user's email address matches an expected domain for the "team".
  if (!user.emailVerified) {
    res.redirect('/verify-email');
  } else {
    // Start a session for the user.
    // ...

    res.redirect('/');
  }
});
```

> The above example makes use of JIT-provisioning, which you can read more about in more our dedicated [JIT-provisioning guide](https://workos.com/docs/sso/jit-provisioning).

With the above checks in place, your application can safely sign in and verify users through SSO from any domain.

## Custom ACS domains

While your users will authenticate with SSO using your application, they might briefly see the WorkOS [ACS URL](https://workos.com/docs/glossary/acs-url). This can be configured in the production environment to a custom domain of your choosing. For more information see the [Custom Domains](https://workos.com/docs/custom-domains) documentation.
