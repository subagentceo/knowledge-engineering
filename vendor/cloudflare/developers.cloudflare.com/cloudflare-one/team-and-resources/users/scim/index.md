---
title: SCIM provisioning
description: How SCIM provisioning works in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SCIM provisioning

System for Cross-domain Identity Management (SCIM) is an open standard protocol that allows identity providers to synchronize user identity information with cloud applications and services. After configuring SCIM, user identities that you create, edit, or delete in the identity provider are automatically updated across all supported applications. This makes it easier for IT admins to onboard new users, update their groups and permissions, and revoke access in the event of an employee termination or security breach.

Note

This section covers SCIM provisioning for Cloudflare Zero Trust only. To provision access to your Cloudflare account, you will need to set up a distinct [dashboard SSO SCIM integration](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/) in your IdP. You can assign users and groups to this new SCIM application to define who can access the Cloudflare dashboard.

Users provisioned via the [Zero Trust SCIM integration](#sync-users-and-groups-in-zero-trust-policies) will not have access to your Cloudflare dashboard unless you have manually added them to your [Cloudflare dashboard SSO application](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/).

## Supported identity providers

Cloudflare Access supports SCIM provisioning for all SAML and OIDC identity providers that use SCIM version `2.0`.

## Sync users and groups in Zero Trust policies

Cloudflare Access can automatically deprovision users from Zero Trust after they are deactivated in the identity provider and display synchronized group names in the Access and Gateway policy builders. Cloudflare does not provision new users in Zero Trust when they are added to the identity provider -- users must first register a device with the Cloudflare One Client or authenticate to an Access application.

To set up SCIM for Zero Trust, refer to our [SSO integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) guides.

## Common provider-specific issues

SCIM behavior depends on the identity provider configuration as well as Cloudflare.

Common issues include:

* **Okta**: User sync and group sync are separate. Make sure **Push Groups** is configured if you expect groups to appear in Zero Trust policies.
* **Microsoft Entra ID**: Group sync only occurs for groups included in the provisioning scope. The `userName` attribute should match the user's email address in Cloudflare One.

If users appear but groups do not, verify the IdP-side SCIM app first before troubleshooting Cloudflare policy behavior.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/#page","headline":"SCIM provisioning · Cloudflare One docs","description":"How SCIM provisioning works in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SCIM"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/users/","name":"Users"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/users/scim/","name":"SCIM provisioning"}}]}
```
