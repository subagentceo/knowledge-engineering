# Identity Linking

## Introduction

Users have unique email addresses, because each user's access to their inbox represents ultimate access to all of their credentials and thus services they control. The [User object](https://workos.com/docs/reference/authkit/user) unifies all of the identities they use so that your application does not have to consider different identity systems.

Identity linking is the process in which WorkOS safely deduplicates various credentials across identity providers to offer a single, unified user interface. It does this by using the **email address** as the unique identifier and access to the email inbox as the source of truth.

## Credentials

A credential is an authentication method in a specific identity provider. For example, WorkOS offers a [password credential](https://workos.com/docs/authkit/email-password) for users to authenticate with. In this case, WorkOS is the identity provider and password is the authentication method.

[Google OAuth](https://workos.com/docs/authkit/social-login) is another credential, where Google is the identity provider and OAuth is the authentication method.

Users may use multiple types of authentication methods based on preference, perhaps because one is more convenient to use on one of their devices, or they simply didn't remember which method they used in the past.

## Email verification

WorkOS ensures all user emails are unique via an [email verification process](https://workos.com/docs/authkit/email-verification). By default, email verification is required by all users for authentication to succeed. This ensures that verified users are always returned to your application.

When a user signs in with a new credential for the first time, e.g. they sign in through Google OAuth despite already having a password account, WorkOS will safely attach the new credential to the existing user. This is only performed if WorkOS can verify that the user has access to the email inbox referenced by that credential.

WorkOS considers it a **security risk if the user cannot verify access to their email**. Some identity providers allow creating accounts with any email address. For instance, an IT contact of an organization with the domain `apple.com` could make an account for `billg@microsoft.com`. If access to `billg@microsoft.com` is not verified, the IT contact could sign in to the application as that user.

> WorkOS does not complete the authentication flow when a new identity cannot be safely linked to an existing user to ensure account takeover risks are minimized.

## Domain verification

When an IT contact [verifies a domain for their organization](https://workos.com/docs/authkit/domain-verification), it means they have access to create email inboxes. Thus, a **verified domain implies the ability to verify all users with that email domain**.

In practice, when a domain is verified and an SSO connection is configured, users who sign in through an organization's IdP are automatically considered email verified if the domain matches. This shortcut reduces friction for your end users.

> Users who sign-in through SSO with an email address that is not a verified domain are not considered verified and will have go through the [email verification](https://workos.com/docs/authkit/email-verification) process.

## SSO identity linking

Not only can a user have multiple credentials, they may also have multiple SSO credentials. This might happen when a user works with multiple organizations that require SSO authentication for all members. In this case, there is still only one [User object](https://workos.com/docs/reference/authkit/user), but they would choose which organization's SSO IdP to use when authenticating.

![Example UI showing organization selection](https://images.workoscdn.com/images/876aeb05-cd96-46b4-9adf-3e9dd0208e47.png?auto=format\&fit=clip\&q=80)

The email verification safety still applies. When the user signs-in for the first time through an SSO IdP where the user's email address is not a verified domain, the user is asked to verify their email before the SSO credential is linked to their account.

Users without a verified domain **must be invited to the organization** before they have access via SSO for the first time.

> An [invitation](https://workos.com/docs/authkit/invitations) ensures that the authentication flow gives the user an opportunity to go to the SSO's identity provider.
