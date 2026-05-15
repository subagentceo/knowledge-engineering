# Sign-In UX

## Introduction

Now that we’ve seen how the Single Sign-On (SSO) APIs work, you may want to consider how to best integrate this new flow in the sign-in experience for your users. This guide will walk you through a few different approaches you could take in your application:

- Separate SSO flow
- Separate email and password fields
- Auto-hide the password field

Throughout this guide, let’s consider the following scenario:

- You are building an app called *Demo App*
- An organization named *Foo Corp* is using Single Sign-On with Okta as the [IdP](https://workos.com/docs/glossary/idp)

### Implementing SSO with WorkOS

This document offers guidance on UX best practices when integrating SSO with the standalone API. You might instead consider [WorkOS AuthKit](https://workos.com/docs/authkit), a complete authentication platform which handles all of the UX complexity for you.

## Separate SSO flow

A basic approach would be to create a link or button on your login page with a **Sign in with SSO** or **Use Single Sign-On** option. This method differentiates the flows for the user explicitly.

You may still look up the domain if they try to sign in with their corporate email and redirect them to the appropriate flow too—see the demo below as an example.

As this adds yet another button, one thing to be mindful with this approach is the [NASCAR problem](https://indieweb.org/NASCAR_problem) where a cluster of 3rd party branded buttons creates both visual noise and confusion. Consider only offering a couple of options that are relevant to your user base.

## Separate email and password fields

Instead of asking users for their email and password in one screen, you could first ask them for their email. This method gives you an opportunity to check if a particular domain is SSO-enabled and redirect the user to the appropriate SSO flow. It is a very popular approach employed by many applications (including WorkOS itself, Apple, and Google).

## Auto-hide the password field

Finally, as an extension to the previous approach, you can automatically hide the password field if the user’s domain is SSO-enabled. This feature is a bit more complicated to implement, but provides a more seamless experience for users.
