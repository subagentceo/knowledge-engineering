# Domain Verification

## Introduction

Domain verification allows IT contacts to prove they control specific domains. This allows WorkOS to trust actions from users with the verified domain and enables authentication and membership policy enforcement for those users.

Verifying an organization domain enables the following features:

1. Users with the verified domain who sign in with the organization's SSO connection don't need to [verify their email](https://workos.com/docs/authkit/email-verification).
2. By default, users with the verified domain are managed by the organization's [domain policy](https://workos.com/docs/authkit/organization-policies/domain-policy), allowing for enhanced control over authentication and membership.

## Self-serve domain verification

Domain verification can be delegated to the [Admin Portal domain verification flow](https://workos.com/docs/domain-verification). This out-of-the-box UI guides IT contacts to add a DNS TXT record to prove domain ownership. Once the DNS TXT record is correctly added, the organization domain is automatically verified.

## Manual domain verification

Verified domains may also be added manually via the [WorkOS Dashboard](https://dashboard.workos.com) or [API](https://workos.com/docs/reference/organization/update). This shortcut is useful if the IT contact has already proven domain ownership in another context.

> Manually verified domains can be used to define a domain policy that applies to any users with email addresses on that domain. The organization that defines this [domain policy](https://workos.com/docs/authkit/organization-policies/domain-policy) exerts authentication policy control over that domain across your application. For this reason, it is important to verify ownership of manually added domains. Additionally, WorkOS does not allow addition of common consumer domains, like `gmail.com`.

![Adding a verified domain in the dashboard](https://images.workoscdn.com/images/c015b42d-fc39-453c-a4c9-1be220c88a37.png?auto=format\&fit=clip\&q=80)
