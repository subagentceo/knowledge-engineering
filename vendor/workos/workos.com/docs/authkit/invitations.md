# Invitations

## Introduction

Invitations are a way of adding a specific user to your application or as a member of an organization. They provide a flow for end-users to engage in collaboration that takes into consideration security and user choice.

## Invitation flow

Each invitation is for a specific email address to a specific organization. Invitations are for both new users and existing users.

Each invitation is a two step process:

- The inviter expresses intent for someone to join an organization.
- The invitee chooses to join that organization.

### Inviting new users to an organization

If an invitation is created for an email address that does not yet exist, an email is sent to that user with a link to sign up for your application and join the organization.

As part of signing up, they automatically join the organization. If a user is invited to multiple organizations, they only join the organization for which they clicked the invitation email for, indicating intent to join that specific organization.

### Inviting existing users to an organization

If an invitation is for an existing user, clicking the link in the email and signing in adds the user as a member to the organization. If the user is already signed in, you can use the invitation code to validate that the signed-in user is eligible to use the invitation, by querying the [Invitation API](https://workos.com/docs/reference/authkit/invitation).

This offers choice for the end-user so that they aren't automatically added to organizations that may be attempting phishing attacks.

## Application-wide invitations

Invitations do not have to be specific to an organization. An invitation sent without specifying an organization is an invitation to join the application. This enables your existing users to help grow your application by inviting peers organically.

When signup is disabled, users cannot register for a new account through [AuthKit](https://workos.com/docs/authkit) or the [API](https://workos.com/docs/reference/authkit/invitation). When a valid invitation code is present in the sign-in flow, registration is opened up both in AuthKit and the API so that a new user may sign up. This lets you model your application as a closed-registration invitation-only system.

## Sending invitations

Invitations can be sent programmatically by your application with the [Invitation API](https://workos.com/docs/reference/authkit/invitation), or viewed and manually created in the [WorkOS Dashboard](https://dashboard.workos.com/). By default, WorkOS sends these emails, but you can also [send the emails yourself](https://workos.com/docs/authkit/custom-emails).

![Dashboard displaying a list of user invitations](https://images.workoscdn.com/images/18299a05-f824-410e-a17b-828fbe5826f1.png?auto=format\&fit=clip\&q=80)

## Email address used to accept an invite

Often, a user might want to accept their invitation using an email address that's different from the one that the invitation was sent to.

### Without organization membership

When an invitation doesn't include an organization to join, a user can accept the invitation using any email address.

For example, an invitation sent to `user@example.com` can be used with `another-user@foo-corp.com` email address.

### With organization membership

For organization-specific invitations, there are different rules based on the email domain on the invitation.

- **Consumer email domains**, such as Gmail or Yahoo: the invited user must sign up using exactly the same email address to which the invitation was sent.
- **Corporate domains**: the user can sign up with any email address from the same domain as the email on the invitation. For example, an invitation sent to `user@foo-corp.com` can be accepted with `another-user@foo-corp.com`
