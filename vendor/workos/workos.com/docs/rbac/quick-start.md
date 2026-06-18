# Quick Start

## Before getting started

To get the most out of this guide, you should have:

- A [WorkOS account](https://dashboard.workos.com/)
- Your WorkOS [API Key](https://workos.com/docs/glossary/api-key)

## What you'll build

In this guide, we'll implement role-based access control for a simple B2B video sharing SaaS application, where users can view and create videos, and elevated roles can manage other users' roles and application settings.

We will:

1. Map your application's access management model to a set of roles
2. Define permissions to control granular access to your application's resources
3. Associate permissions with roles, and configure default roles and priority order
4. If using AuthKit, assign roles to organization memberships and determine access via the [session JWT](https://workos.com/docs/reference/authkit/session-tokens)
5. If using standalone SSO, access user roles through the [SSO Profile object](https://workos.com/docs/reference/sso/profile)
6. If using standalone Directory Sync, access user roles through the [Directory User object](https://workos.com/docs/reference/directory-sync/directory-user)

## API resource definitions

[Role](https://workos.com/docs/reference/roles)
: Represents a logical grouping of access management rules.

***

## (1) Create roles

The first step to RBAC is to determine the application's access management hierarchy.

***

## (2) Create permissions

The first step to RBAC is to define

Get provider-specific instructions by selecting the directory provider you want to test:

***

## Summary

That's it! We've now setup a powerful RBAC system for our application.
