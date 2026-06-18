# IdP Role Assignment

## Introduction

IdP role assignment lets you map identity provider groups to organization-scoped roles. When an IT contact adds someone to the "Engineering" group in Okta or Azure AD, they automatically get the corresponding role in your application.

Today, IdP role assignment supports organization-scoped roles only. Resource-scoped roles are managed through the API. A user can have both—their assigned organization-scoped role from the IdP, plus granular resource roles assigned by your application.

> Support for mapping IdP groups to resource-scoped roles is coming soon.

***

## How it works

**Organization layer (IdP-managed)** – Users get baseline access based on IdP groups. Everyone in "Engineering" might get `org-member`.

**Resource layer (API-managed)** – Users get specific access to workspaces and projects via API assignments.

When IdP groups change, only organization-scoped roles update. Resource-scoped assignments stay intact.

```text
Alice's roles:
├─ org-member (from IdP group: "Engineering")
├─ workspace-admin on Workspace: Platform (API assignment)
└─ project-editor on Project: API Backend (API assignment)
```

***

## Setting up IdP role assignment

Role mappings are configured in the [WorkOS Dashboard](https://dashboard.workos.com/) or through the Admin Portal.

![Role assignment in Admin Portal dialog](https://images.workoscdn.com/images/fe19e3ac-6370-404e-9590-cdb06b3de127.png?auto=format\&fit=clip\&q=50)

For setup instructions, see [Directory Sync role assignment](https://workos.com/docs/directory-sync/identity-provider-role-assignment) for real-time updates via SCIM, or [SSO role assignment](https://workos.com/docs/sso/identity-provider-role-assignment) for authentication-time assignment.

***

## Directory Sync vs. SSO

**Directory Sync (recommended)** – Role changes happen in real-time via SCIM. Access can be revoked immediately when someone leaves a group.

**SSO only** – Role assignments are evaluated at authentication time. Changes take effect on the next sign-in.

***

## Combining with FGA

Use IdP groups for baseline organization access, and API assignments for elevated resource access:

```text
From IdP:
└─ org-member (baseline access to view workspaces and projects)

From API:
├─ workspace-admin on Workspace: Platform (team leads)
└─ project-viewer on Project: Client Portal (contractors)
```
