---
title: Identity-based policies
description: Reference information for Identity-based policies in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Identity-based policies

With Cloudflare One, you can create Secure Web Gateway policies that filter outbound traffic down to the user identity level. To do that, you can build DNS, HTTP or Network policies using a set of [identity-based selectors](#identity-based-selectors). These selectors require you to deploy the Cloudflare One Client in [Traffic and DNS mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/).

For example, you can create different security rules for different teams — block social media for contractors but allow it for marketing.

You may also filter outbound traffic based on additional signals from [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

## Gateway identity checks

Gateway checks identity when a user logs in or re-authenticates. To check your users' identities and require re-authentication at regular intervals, you can [enforce a Cloudflare One Client session duration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).

Warning

Unless you use an [identity provider (IdP) that supports SCIM provisioning](#automatic-scim-idp-updates), Gateway will not detect when you add or remove a user from a group in your IdP until the user re-authenticates to your Zero Trust instance.

There are two ways a user can re-authenticate:

* Log out from an Access-protected application and log back in.
* In the Cloudflare One Client, re-authenticate the session by going to **Profile** \> **Account information** \> **Re-authenticate** [1](#user-content-fn-1). This will open a browser window and prompt the user to log in.

To view the identity that Gateway will use when evaluating policies, check the [user registry](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/).

### Automatic SCIM IdP updates

Gateway will automatically detect changes in user name, title, and group membership for IdPs configured with System for Cross-domain Identity Management (SCIM) provisioning. For more information, refer to [SCIM provisioning](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/).

### Extended email addresses

Extended email addresses (also known as plus addresses) are variants of an existing email address with `+` or `.` modifiers. Many email providers, such as Gmail and Outlook, deliver emails intended for an extended address to its original address. For example, providers will deliver emails sent to `contact+123@example.com` or `con.tact@example.com` to `contact@example.com`.

By default, Gateway will either filter only exact matches or all extended variants depending on the type of policy and action used:

DNS policies

| Action             | Behavior                             |
| ------------------ | ------------------------------------ |
| Allow              | Match exact address only             |
| Block              | Match exact address and all variants |
| Override           | Match exact address and all variants |
| Safe Search        | Match exact address and all variants |
| YouTube Restricted | Match exact address and all variants |

Network policies

| Action           | Behavior                             |
| ---------------- | ------------------------------------ |
| Allow            | Match exact address only             |
| Audit SSH        | Match exact address and all variants |
| Block            | Match exact address and all variants |
| Network Override | Match exact address only             |

HTTP policies

| Action         | Behavior                             |
| -------------- | ------------------------------------ |
| Allow          | Match exact address only             |
| Block          | Match exact address and all variants |
| Do Not Inspect | Match exact address only             |
| Do Not Isolate | Match exact address only             |
| Do Not Scan    | Match exact address only             |
| Isolate        | Match exact address and all variants |

Other policies

| Policy type     | Behavior                 |
| --------------- | ------------------------ |
| Egress policy   | Match exact address only |
| Resolver policy | Match exact address only |

To force Gateway to match all email address variants, go to **Traffic policies** \> **Traffic settings** \> **Policy settings** and turn on **Match extended email addresses**. This setting applies to all firewall, egress, and resolver policies.

## Identity-based selectors

### OIDC Claims

Specify a value from a [custom OIDC claim](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) configured on your identity provider.

Note

This selector is only available for the [Generic OIDC](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/) identity provider integration. Named OIDC providers such as Okta and Microsoft Entra ID do not support custom OIDC claims in Gateway policies — use the [User Group Names](#user-group-names) or [User Group IDs](#user-group-ids) selectors for those providers instead.

| UI name     | API example                                                        |
| ----------- | ------------------------------------------------------------------ |
| OIDC Claims | any(identity.oidc\_claims\[\*\] == "\\"department=engineering\\"") |

### SAML Attributes

Specify a value from the SAML Attribute Assertion.

| UI name         | API example                                        |
| --------------- | -------------------------------------------------- |
| SAML Attributes | identity.saml\_attributes == "\\"group=finance\\"" |

### User Email

Use this selector to create identity-based Gateway policies based on a user's email.

| UI name    | API example value                         |
| ---------- | ----------------------------------------- |
| User Email | identity.email == "user-name@company.com" |

### User Group IDs

Use this selector to create identity-based Gateway policies based on an IdP group ID of which the user is configured as a member in the IdP.

| UI name        | API example                                  |
| -------------- | -------------------------------------------- |
| User Group IDs | identity.groups.id == "12jf495bhjd7893ml09o" |

### User Group Email

Use this selector to create identity-based Gateway policies based on an IdP group email address of which the user is configured as a member in the IdP.

| UI name          | API example                                        |
| ---------------- | -------------------------------------------------- |
| User Group Email | identity.groups.email == "contractors@company.com" |

### User Group Names

Use this selector to create identity-based Gateway policies based on an IdP group name of which the user is configured as a member in the IdP.

| UI name          | API example                             |
| ---------------- | --------------------------------------- |
| User Group Names | identity.groups.name == "\\"finance\\"" |

### User Name

Use this selector to create identity-based Gateway policies based on an IdP username for a particular user in the IdP.

| UI name   | API example                  |
| --------- | ---------------------------- |
| User Name | identity.name == "user-name" |

Gateway groups vs. Access rule groups

In Gateway, a **User Group** refers to a group in your IdP (for example, an Okta group). Gateway does not currently support applying DNS, HTTP, and Network policies to [Access rule groups](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/groups/). This is because Access rule groups may include criteria not available through the IdP, such as device location or IP address.

## IdP groups in Gateway

Cloudflare Gateway can integrate with your organization's identity providers (IdPs). Before building a Gateway policy for IdP users or groups, be sure to [add the IdP as an authentication method](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).

Because IdPs expose user groups in different formats, reference the list below to choose the appropriate identity-based selector.

### Microsoft Entra ID

| Selector       | Value                               |
| -------------- | ----------------------------------- |
| User Group IDs | 61503835-b6fe-4630-af88-de551dd59a2 |

**Value** is the [Object Id](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#entra-groups-in-zero-trust-policies) for an Entra group.

If you enabled user and group synchronization with [SCIM](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#synchronize-users-and-groups), the synchronized groups will appear under _User Group Names_:

| Selector         | Value      |
| ---------------- | ---------- |
| User Group Names | SCIM group |

### GitHub

| Selector         | Value     |
| ---------------- | --------- |
| User Group Names | Marketing |

### Google

| Selector         | Value     |
| ---------------- | --------- |
| User Group Names | Marketing |

### Okta (OIDC)

If you added Okta as an [OIDC provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/), use the User Group Names selector:

| Selector         | Value     |
| ---------------- | --------- |
| User Group Names | Marketing |

The Okta OIDC integration supports user and group synchronization with [SCIM](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/#synchronize-users-and-groups).

### Okta (SAML)

If you added Okta as a [SAML provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta-saml/), use the SAML Attributes selector:

| Selector        | Attribute name | Attribute value |
| --------------- | -------------- | --------------- |
| SAML Attributes | groups         | Marketing       |

### Generic SAML IdP

For a [generic SAML provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/), use the SAML Attribute selector:

| Selector        | Attribute name | Attribute value |
| --------------- | -------------- | --------------- |
| SAML Attributes | department     | Marketing       |

### Generic OIDC IdP

For a [generic OIDC provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/), use the OIDC Claims selector to filter traffic based on [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) configured on your IdP:

| Selector    | Claim name | Claim value |
| ----------- | ---------- | ----------- |
| OIDC Claims | department | Engineering |

## Footnotes

1. In Cloudflare One Client version 2026.1 and earlier, select **Preferences** \> **Account** \> **Re-Authenticate Session**. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#page","headline":"Identity-based policies · Cloudflare One docs","description":"Reference information for Identity-based policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["OIDC","SAML","SCIM"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/identity-selectors/","name":"Identity-based policies"}}]}
```
