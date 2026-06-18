# Invite-only signup

## Introduction

In this scenario, we outline the considerations, concepts, and best practices for modeling a closed-registration application in which users may only be added to the application via an invitation.

## Goals & requirements

Imagine a company that wishes to model an invite only application that requires an exclusive invite to access. The product is yet to launch, and as the initial release approaches they plan to seed memberships from a small subset of organizations and later allow existing users to invite new members from a quota.

The requirements are as follows:

- Signup should be unavailable to the general public.
- An initial set of invites will be sent from a pre-existing mailing list.
- Later, members should be able to invite other members, but only to a given quota.
- Invites should be sent and accepted via email.

## Invite-only model

In order to implement a invite only structure, the application must account for the following:

- AuthKit must not expose sign up controls to the general public.
- Invites will be performed programmatically from a seed script.
- Members can invite other members via an invite UI within the application.

![Closed-registration authentication flow](https://images.workoscdn.com/images/4cb2c8f9-896d-4191-8b04-90d7bd908e6b.png?auto=format\&fit=clip\&q=80)\[border=false]

## Disabling signup

AuthKit provides an out-of-the-box signup form which handles validation UX, makes the necessary WorkOS API calls and handles the end-to-end lifecycle of the invite flow (emailing of members, accepting of invites, assignment of members to organizations where appropriate).

In this scenario, the application should not expose the signup flow to the general public. It can be disabled per environment by toggling the "Sign up" setting in the authentication section of the WorkOS dashboard.

![Image of a modal in the WorkOS dashboard to disable sign-ups](https://images.workoscdn.com/images/76369560-2e4c-41bd-b3ba-1e7e1cf806e3.png?auto=format\&fit=clip\&q=80)\[border=false]

## Inviting users

User invitations can be issued in one of two ways:

- Via the WorkOS dashboard.
- Programmatically via the WorkOS SDK.

The simplest way to get started is via the WorkOS dashboard. Invites can be created by navigating to "Invites" tab in the "Users" section of the dashboard.

![Image of a modal in the WorkOS dashboard to invite new users](https://images.workoscdn.com/images/94103735-c85e-43e2-aee1-3a46c33bf2a2.png?auto=format\&fit=clip\&q=80)\[border=false]

This is helpful in the early stages of product development where there may be a small number of potential users and the product is not yet mature enough to warrant development time spent implementing custom invitation controls, or when dealing with support requests from users who are having difficulty.

## Programmatic invitations

Manually issuing invitations from the dashboard is not scalable nor always feasible when needing to issue a large number of invites, or if organic sign up growth is desired without a support team. In this case using the WorkOS API to perform and manage invitations is preferred.

### Seeding initial users from a script

Typically, an application will implement a "seed" script which will be run once to issue a set of invites to a pre-existing mailing list. This can be done by using the WorkOS API to create an invite for each email address in the list.

## Inviting users within the application

Custom invitation controls can be implemented within the application to allow members to invite other members. This generally requires adding a form to the UI to collect the email address of the user to invite alongside a button to trigger the API call. Additionally, a count of the number of invites a user has made might be stored and checked against a quota to ensure they don't exceed the number of invites they are allowed to send.

A call can then be made to [the WorkOS API](https://workos.com/docs/reference/authkit/invitation/send) by supplying the target users email address as well as the ID of the originating organization. The invited user can then accept this invite via email and move through the steps to gain access to the application.

## Summary

This scenario covers some high-level considerations when thinking about closed-registration application. By using AuthKit, the WorkOS API, and the dashboard it's possible to limit signup and implement an invite flow within your application.

In cases where the signup restriction is temporary, signup in AuthKit can be easily re-enabled via a setting in the WorkOS dashboard.
