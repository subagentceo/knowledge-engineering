# SSO with contractors

## Introduction

In this scenario, we outline the considerations, concepts, and best practices for configuring and enforcing SSO sign-in for all members of an organization, we'll also cover how to enforce these same constraints on external contractors who may need access to company resources but are not permanent members.

## Goals & requirements

The application should be available to logged in users only. Each user is typically assigned to a single organization and will be able to collaborate with other users within that organization.

- The majority of users collaborate within the same organization.
- Permanent members of the organization use an email address that matches the organization's domain.
- Organization members are required to authenticate using SSO.
- External contractors and collaborators are also required to authenticate using SSO.

![Diagram of AnalyticsOS auth flow for users and contractors](https://images.workoscdn.com/images/b9752155-4f5d-4702-890d-c64caa54005e.png?auto=format\&fit=clip\&q=80)\[border=false]

## Integrating SSO

Adding SSO to your application is a straightforward process when using AuthKit, and can mostly be done via the WorkOS dashboard. Steps include:

(1) Add a new SSO connection to an organization in the dashboard

(2) Configure a callback endpoint in your application

(3) Add your endpoint URL as a redirect URI in the WorkOS dashboard

(4) Handle the user session and grant access to the application

### Enforcing SSO authentication

With an active SSO connection established, it's now possible to enable it as an authentication method in the WorkOS Dashboard. This can be achieved by visiting the authentication settings view for the environment and enabling Single Sign-On.

![Enable SSO in the WorkOS dashboard](https://images.workoscdn.com/images/feb25320-d75c-47bf-ae63-ae7a99a84afb.png?auto=format\&fit=clip\&q=80)\[border=false]

This will allow users to sign-in with AuthKit using SSO, but will not enforce it as a requirement. In order to do so, we'll need to configure an authentication policy for the organization.

### SSO authentication flow

When the user logs in, they will move through the following flow:

(1) User clicks "Sign in" button

(2) User is redirected to AuthKit, where they sign via SSO

(3) User is redirected from AuthKit to the redirect URI configured for your application

(4) User is authenticated via code presented in the `redirect_uri`

(5) Access is provisioned by the application

More in-depth information on configuration can be found in the [Single Sign-On section](https://workos.com/docs/authkit/sso), with AuthKit implementation guidance available in the [Quick Start guide](https://workos.com/docs/authkit).

## Understanding authentication policies

An authentication policy is a way to enforce specific authentication methods during sign-in. They typically apply to all users attempting to access the organization.

There are several approaches to enforcing SSO within an organization, including domain verification and enforcing specific policies on those inside and outside of the organization based on their attached email domain, but for the purposes of simplicity we will simply cover a blanket authentication policy which applies to all users attempting to sign-in, regardless of verified domain existence.

An authentication policy allows the organization to:

- Enforce SSO be used by all users accessing the organization
- Enforce an MFA requirement for all users accessing the organization

## Adding an authentication policy

Authentication policies can be applied in the organization settings view of the WorkOS Dashboard.

![Applying authentication policy in the WorkOS dashboard](https://images.workoscdn.com/images/22fc71c4-1565-45e4-a148-d96de148cdd4.png?auto=format\&fit=clip\&q=80)\[border=false]

After adding SSO enforcement to the policy, all users will be required to sign-in using SSO. This will apply to all users, including external contractors. For this to function with external contractors, they will need to be added to the organization's IdP.

For cases where external contractors can not be added to the organization's IdP, an MFA requirement can be set as an enforcement fallback. This is sometimes a reasonable compromise if many contractors rotate in out of the organization.

## Summary

The organization should now be set up and to both accept SSO connections and enforce their use for all users, including external contractors. In the contractor case they will require adding to the organizations IdP or otherwise fallback to using MFA.

This scenario did not cover the full range of access constraints that can be applied to an organization following domain verification, for more information on this topic see the Access Constraints section of the documentation.
