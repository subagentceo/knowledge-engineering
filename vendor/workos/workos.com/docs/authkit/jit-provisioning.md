# Just-in-time Provisioning

## Introduction

JIT provisioning automatically creates users and organization memberships when a user signs in. This feature allows users to access an organization's resources without requiring manual invitations from IT contacts.

## Automatically add users with verified domains as members

Users with [verified email domains](https://workos.com/docs/authkit/domain-verification) can be automatically added as members to an organization through the organization's [domain policy](https://workos.com/docs/authkit/organization-policies/domain-policy). This feature is useful when an application or organization wants to automatically group individuals into the same workspace based on their email domain.

![Configuring a domain policy in the dashboard](https://images.workoscdn.com/images/b98493d9-f9fe-475d-a448-f9099558cd19.png?auto=format\&fit=clip\&q=50)

## SSO JIT provisioning

When a user signs in, WorkOS detects when their email domain matches a verified domain of an organization and prompts the user to sign in through the organization's IdP. If the user existed in WorkOS previously, that existing user is automatically added to the organization. Otherwise, a new user is created and added to the organization.

![Configuring just-in-time provisioning for SSO users in the dashboard](https://images.workoscdn.com/images/90a85516-ed7a-4bd4-88a5-384b2f818436.png?auto=format\&fit=clip\&q=50)

### Custom attributes

When JIT provisioning creates a membership via SSO, [custom attributes](https://workos.com/docs/sso/attributes) from the SSO Profile are made available on the organization membership's `custom_attributes` field. This allows you to access IdP-sourced attributes in your application via the [organization membership API](https://workos.com/docs/reference/authkit/organization-membership) or [JWT templates](https://workos.com/docs/authkit/jwt-templates).

> If a directory is linked to the membership, the directory user's custom attributes will always take precedence over the SSO profile's attributes.

### Guest provisioning

SSO JIT provisioning is not fully supported for guests whose email domain has not been [verified](https://workos.com/docs/authkit/domain-verification) by the organization.

For example, an IT contact may want to gate all contractor access through their IdP (to enable access revocation across applications) but the contractor prefers to use their own email address.

Instead, guest users must be [invited](https://workos.com/docs/authkit/invitations) to join the organization before they are able to sign in with the organization's IdP.

## Disabling JIT provisioning

Both automatic membership by email domain and SSO JIT provisioning are enabled by default but can be disabled in the [WorkOS Dashboard](https://dashboard.workos.com).

Disabling these features may be useful if IT contacts prefer to manually control membership through [invitations](https://workos.com/docs/authkit/invitations).
