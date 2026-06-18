---
title: Use Microsoft Entra ID Conditional Access policies in Cloudflare Access
description: With Conditional Access in Microsoft Entra ID, administrators can enforce policies on applications and users directly in EntraID.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use Microsoft Entra ID Conditional Access policies in Cloudflare Access

**Last reviewed:**  over 2 years ago 

With [Conditional Access ↗](https://learn.microsoft.com/entra/identity/conditional-access/overview) in Microsoft Entra ID (formerly Azure Active Directory), administrators can enforce policies on applications and users directly in Entra ID. Conditional Access has a set of checks that are specialized to Windows and are often preferred by organizations with Windows power users.

## Before you begin

Make sure you have:

* Global admin rights to Microsoft Entra ID account
* Configured users in the Microsoft Entra ID account

## Set up an identity provider for your application

Refer to [our IdP setup instructions](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#set-up-entra-id-as-an-identity-provider) for Entra ID.

## Add API permission in Entra ID

Once the base IdP integration is tested and working, grant permission for Cloudflare to read Conditional Access policies from Entra ID.

1. In Microsoft Entra ID, go to **App registrations**.
2. Select the application you created for the IdP integration.
3. Go to **API permissions** and select **Add a permission**.
4. Select **Microsoft Graph**.
5. Select **Application permissions** and add `Policy.Read.ConditionalAccess`.  
Note  
You must select **Application permissions**; delegated permissions will not work for this feature.
6. Select **Grant admin consent**.

## Configure Conditional Access in Entra ID

1. In Microsoft Entra ID, go to **Enterprise applications** \> **Conditional Access**.
2. Go to **Authentication Contexts**.
3. [Create an authentication context ↗](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps#authentication-context) to reference in your Cloudflare Access policies. Give the authentication context a descriptive name (for example, `Require compliant devices`).
4. Next, go to **Policies**.
5. [Create a new Conditional Access policy ↗](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies) or select an existing policy.
6. Assign the conditional access policy to an authentication context:  
   1. In the policy builder, select **Target resources**.  
   2. In the **Select what this policy applies to** dropdown, select _Authentication context_.  
   3. Select the authentication context that will use this policy.  
   4. Save the policy.

## Sync Conditional Access with Zero Trust

To import your Conditional Access policies into Cloudflare Access:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Access settings**.
2. In **Manage your App Launcher**, select **Manage**.
3. Choose **Login methods**.
4. Find your Microsoft Entra ID integration and select **Edit**.
5. Enable **Azure AD Policy Sync**.
6. Select **Save**.

## Create an Access application

To enforce your Conditional Access policies on a Cloudflare Access application:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **Self-hosted and private**.
4. Select **Add public hostname** and enter the target URL of the protected application.
5. Select **Create new policy** and build an [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) using the _Azure AD - Auth context_ selector. For example:  
| Action  | Rule type               | Selector                  | Value        |  
| ------- | ----------------------- | ------------------------- | ------------ |  
| Allow   | Include                 | Emails ending in          | @example.com |  
| Require | Azure AD - Auth context | Require compliant devices |              |
6. Add this policy to your application configuration.
7. For **Identity providers**, select your Microsoft Entra ID integration.
8. Follow the remaining [self-hosted application creation steps](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) to publish the application.

Users will only be allowed access if they pass the Microsoft Entra ID Conditional Access policies associated with this authentication context.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/entra-id-conditional-access/#page","headline":"Use Microsoft Entra ID Conditional Access policies in Cloudflare Access · Cloudflare One docs","description":"With Conditional Access in Microsoft Entra ID, administrators can enforce policies on applications and users directly in EntraID.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/entra-id-conditional-access/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft Entra ID"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/entra-id-conditional-access/","name":"Use Microsoft Entra ID Conditional Access policies in Cloudflare Access"}}]}
```
