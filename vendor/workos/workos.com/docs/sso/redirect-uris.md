# Redirect URIs

## Introduction

With a [WorkOS Service Provider (SP) initiated login flow](https://workos.com/docs/sso), there are a series of exchanges that take place between a Service Provider (your application), WorkOS, and the IdP that’s being used to authenticate the user as shown in the diagram below. The [Redirect URI](https://workos.com/docs/glossary/redirect-uri) is the location to which the user gets returned to after successfully completing the authentication with their [Identity Provider (IdP)](https://workos.com/docs/glossary/idp).

With an Identity Provider (IdP) initiated login flow, the approach is similar but the user will begin the login flow by clicking on the tile within their IdP platform instead of from your application.

![Authentication Flow Diagram](https://images.workoscdn.com/images/90b84f08-3363-446a-8610-f7b2bd2ee2ca.png?auto=format\&fit=clip\&q=80)

In WorkOS Production Environments, the Redirect URI to your application cannot use HTTP or localhost, however, Redirect URIs that use HTTP and localhost are allowed in Sandbox Environments.

There should be at least one redirect URI configured and selected as a default for your application. In the [Applications](https://dashboard.workos.com/environment/applications) section of the WorkOS Dashboard, open your application and go to the **Redirects** tab to configure redirect URIs. If you try to route the authorization flow to a Redirect URI that is not yet defined for the application, it will result in an error and users will be unable to sign in, so it’s important to define them in the dashboard first.

![Dashboard Redirect URIs](https://images.workoscdn.com/images/6da31d23-c823-4557-8403-b38b2700e4d2.png?auto=format\&fit=clip\&q=50)

The Redirect URI can also be included directly in the Get Authorization URL call as a redirect\_uri parameter. When the Redirect URI is set in this fashion, it will override the default redirect URI configured for your application.

***

## Wildcard characters

WorkOS supports using wildcard characters (`*`) in Redirect URIs to handle dynamic subdomains or variable ports during development.

![Dashboard updating the redirect URIs to use a wildcard in staging](https://images.workoscdn.com/images/12f99da0-ef62-4b09-acf8-b3d05b48f9e3.png?auto=format\&fit=clip\&q=50)

### Subdomains

The `*` symbol can be used as a wildcard for subdomains; however, it must be used in accordance with the following rules:

- The protocol of the URL **must not** be `http:` in production environments.
- The wildcard **must** be located in the subdomain furthest from the root domain (e.g., `https://*.sub.example.com` will work, but `https://sub.*.example.com` will not).
- The URL **must not** contain more than one wildcard.
- A wildcard character **may** be prefixed and/or suffixed (e.g., `https://prefix-*-suffix.example.com`).
- A wildcard **will not** match across multiple subdomain levels (e.g., `https://*.example.com` will not match `https://sub1.sub2.example.com`).
- Wildcards cannot be used with [public suffix domains](https://publicsuffix.org) (e.g., `https://*.ngrok-free.app` will not work).
- The wildcard will match letters, digits, hyphens, and underscores.
- A URL with a wildcard cannot be set as the default redirect URI.

### Ports

To support [RFC 8252](https://datatracker.ietf.org/doc/html/rfc8252#section-7.3) ("OAuth 2.0 for Native Apps") and local development, a wildcard may be used in place of the port number.

- This is strictly limited to `localhost` and loopback IP addresses (e.g., `127.0.0.1`).
- Example: `http://localhost:*/auth/callback` is valid.

## Implementing SSO with WorkOS

This document offers guidance to integrate Single Sign-On with our standalone API into your existing auth stack. You might also want to look at [AuthKit](https://workos.com/docs/authkit), a complete authentication platform that leverages Single Sign-On functionality out of the box, following best practices.
