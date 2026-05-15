# Just-In-Time User Provisioning

## Introduction

User provisioning is the process of creating a user account and associated identity information. There are various ways for an application to provision users. This guide explores user provisioning strategies and offers a deep dive into SSO-based just-in-time (JIT) user provisioning.

## Definitions

**User provisioning**
: Provisioning is the process of creating a user and setting attributes for them inside an app.

**JIT user provisioning**
: Just-in-time user provisioning creates a user in an app when the user attempts to sign in for the first time. The account and respective role don’t exist until the app creates them – just-in-time.

**Identity**
: An identity is a collection of attributes associated with a user or entity in an identity provider. For example, an identity includes at least one unique identifier, such as id, and user profile attributes, such as name and email.

**Role**
: A primitive in your app that defines specific permissions for the users. Roles are often defined as an ability or a job title, for example, “Editor” or “Accountant”.

## User provisioning strategies

User provisioning is the process of creating a user account with associated identity data in your app. Your app needs to determine a unique identifier for an identity, create a unique account for that user, and link the identity profile attributes to that user’s account. There are many strategies to provision users in an app, but the main three are:

1. Self-registration
2. Provisioning users via [Directory Sync](https://workos.com/docs/directory-sync)
3. JIT provisioning via SSO

The type of provisioning needed will depend on your app’s architecture and level of enterprise feature support:

| Strategy               | Description                                                           | Usage                                                                                                |
| ---------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Self-registration      | Users fill out a registration form to create an account in the app    | For users that don’t have an SSO service, usually the first authentication mechanism built in an app |
| Pre-provisioning users | Use a service like Directory Sync to create users in the app          | Required by large enterprises to automatically provision users                                       |
| JIT provisioning       | Create a user account when a user signs in via SSO for the first time | Leverage user identity from an SSO provider to create an account in your app                         |

## What is JIT provisioning?

JIT provisioning creates a user account with associated identity information when a user authenticates via SSO for the first time. IT contacts often use JIT provisioning to quickly set up accounts in an app. Typically, apps that implement only SSO will have JIT provisioning support as the alternative is self-registration by individual users or manual entry of all users by the IT contact.

### Sample scenario

Consider the fictional SaaS company *HireOS*, which offers recruiting software to other businesses. *HireOS* is an online app allowing customers to track leads, candidates, and interviews.

*HireOS* has integrated SSO using WorkOS and supports JIT provisioning. For example, a *HireOS* customer would like their users to have accounts automatically provisioned in *HireOS* when they first log in. The customer’s IT contact will only need to assign the users to the *HireOS* SAML app in their identity provider. When users log into *HireOS* via SSO, they will have accounts created in *HireOS*, just in time.

A usual account setup flow using JIT provisioning follows these steps:

1. An IT contact self-registers via username and password to create a team account in *HireOS*.
2. The IT contact configures the *HireOS* team account to use SSO as the authentication mechanism.
3. The IT contact enables JIT provisioning for this team account by clicking the "Enable JIT Provisioning" checkbox.
4. The IT contact adds the users that should get access to *HireOS* to the app in the identity provider.
5. When a user logs into *HireOS* with the correct email domain and authenticates via SSO, *HireOS* creates the user account upon successful first-time login.

## JIT provisioning with WorkOS SSO

When a user authenticates to your app via SSO for the first time, and JIT provisioning is enabled, your app provisions a new user account. You can create the account by saving the identity information (the WorkOS SSO profile) directly on your app's user account. Or, you can create a separate identity from the WorkOS SSO profile related to this new user account. This logic allows users to have multiple identities if your app supports several login methods per user.

You can use the WorkOS SSO profile `id` attribute as the unique identifier for this identity from WorkOS. WorkOS ensures the profile is unique per SSO connection via the `idp_id`. In addition, your app can use either the `connection_id` or `organization_id` to tie the identity to a team account.

```json language="json" title="SSO user profile"
{
  "object": "profile",
  "id": "prof_01DMC79VCBZ0NY2099737PSVF1",
  "connection_id": "conn_01E4ZCR3C56J083X43JQXF3JK5",
  "connection_type": "OktaSAML",
  "organization_id": "org_01EHWNCE74X7JSDV0X3SZ3KJNY",
  "email": "todd@example.com",
  "first_name": "Todd",
  "last_name": "Rundgren",
  "idp_id": "00u1a0ufowBJlzPlk357",
  "role": {
    "slug": "admin"
  }
}
```

You may want to grant new users roles in your application via JIT provisioning. For more information on mapping role data between the IdP and your app, see the [Mapping Roles](https://workos.com/docs/sso/identity-provider-role-assignment) guide.

### New account creation

When your app receives a WorkOS SSO profile, it is standard to perform the following series of checks:

1. Find an identity with the profile `id` or `idp_id`. If found, log in the corresponding user.
2. If you cannot find an identity, try to find a user with the same `email` as the profile. If found, create an identity for the user and log them in.
3. Otherwise, create a new identity using the WorkOS SSO profile, create a new user, and associate this identity with the user account.

### Linking an existing user

If an admin adds SSO authentication to their team account after they've had users register, your app can link these new SSO identities to the current user accounts, just-in-time.

A linking field (e.g. `email`) should be established to find a current user with the incoming WorkOS SSO Profile. Then, the identity information can be linked with the existing user account via a persistent identifier in case of an email change later.

## Implementing SSO with WorkOS

This document offers guidance to integrate Single Sign-On with our standalone API into your existing auth stack. You might also want to look at [AuthKit](https://workos.com/docs/authkit), a complete authentication platform that leverages Single Sign-On functionality out of the box, following best practices.
