# Organization Authentication Policies

## Introduction

Some organizations may prefer to limit their users to specific authentication methods to meet security requirements. These organization-level customizations can be configured on the organization page in the Dashboard.

## Domain policy

A domain policy allows an organization to control authentication and membership behavior of users whose email domain matches one of the organization's [verified domains](https://workos.com/docs/authkit/domain-verification). Domain policies are enforced for *all* users with email domains included in the policy, regardless of their membership status within the organization or the organization selected during sign-in.

Additionally, users provisioned through a [directory](https://workos.com/docs/authkit/directory-provisioning) with an email domain included in the organization's domain policy will be automatically added as active members of the organization without needing an invitation.

![Configuring a domain policy in the dashboard](https://images.workoscdn.com/images/b98493d9-f9fe-475d-a448-f9099558cd19.png?auto=format\&fit=clip\&q=50)

> Only one organization can include a specific domain in its domain policy per environment.

### Requiring SSO by default

When an SSO connection is first set up for an organization, all non-SSO authentication methods for the organization are automatically disabled. Typically, IT contacts who configure SSO intend for it to be the sole authentication method. Any additional methods can be enabled manually if the organization prefers.

## Organization policy

Unlike the domain policy, which is enforced regardless of the organization selected during sign-in, the organization policy is enforced when a member selects the specific organization during sign-in.

The organization policy can require authentication via its SSO connection or require MFA. This is particularly useful for guest members who do not have an organization email domain, or when the organization cannot include an email domain in its domain policy because the domain is managed by another organization.

![Configuring an organization policy in the dashboard](https://images.workoscdn.com/images/bcc25d91-602d-420f-a465-6ea790d27005.png?auto=format\&fit=clip\&q=50)
