---
title: JumpCloud (SAML)
description: JumpCloud (SAML) in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# JumpCloud (SAML)

[JumpCloud ↗](https://jumpcloud.com/#platform) provides SSO identity management. Cloudflare Access integrates with JumpCloud as a SAML identity provider.

The following steps are specific to setting up JumpCloud with Cloudflare Access. For more information on configuring JumpCloud SSO application, refer to the [JumpCloud documentation ↗](https://jumpcloud.com/support/integrate-with-cloudflare).

## Set up Jumpcloud as a SAML provider

### 1\. Create an SSO application in JumpCloud

1. In the [JumpCloud Admin Portal ↗](https://console.jumpcloud.com/#/home), go to **SSO Applications**.
2. Select **Add New Application**.
3. In the search bar, enter `Cloudflare` and select the **Cloudflare Access** application.
4. Select **Next**.
5. In **Display Label**, enter an application name.
6. Select **Save Application**.
7. Review the application summary and select **Configure Application**.
8. In the **SSO** tab, configure the following settings:  
   1. In **IdP Entity ID**, enter your Cloudflare team domain:  
   ```  
   https://<your-team-name>.cloudflareaccess.com/  
   ```  
   You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.  
   2. Set both **SP Entity ID** and **ACS URL** to the following callback URL:  
   ```  
   https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
   ```  
   3. (Optional) Configure SAML attributes that you want to send to Cloudflare Access.  
   4. Scroll up to **JumpCloud Metadata** and select **Export Metadata**. Save this XML file for use in a [later step](#2-add-jumpcloud-to-zero-trust).
9. In the **User Groups** tab, [assign user groups ↗](https://jumpcloud.com/support/get-started-applications-saml-sso#managing-employee-access-to-applications) to this application.
10. Select **Save**.

### 2\. Add JumpCloud to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select **SAML**.
4. Upload your JumpCloud XML metadata file.
5. (Optional) To enable SCIM, refer to [Synchronize users and groups](#synchronize-users-and-groups).
6. (Optional) Under **Optional configurations**, configure [additional SAML options](#optional-configurations).
7. Select **Save**.

You can now [test your connection](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one) and create [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) based on the configured login method and SAML attributes.

## Synchronize users and groups

The JumpCloud integration allows you to synchronize user groups and automatically deprovision users using [SCIM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/).

### 1\. Enable SCIM in Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Find the JumpCloud integration and select **Edit**.
3. Turn on **Enable SCIM**
4. (Optional) Configure the following settings:
* **Enable user deprovisioning**: [Revoke a user's active session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) when they are removed from the SCIM application in JumpCloud. This will invalidate all active Access sessions and prompt for reauthentication for any [Cloudflare One Client session policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).
* **Remove user seat on deprovision**: [Remove a user's seat](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/) from your Cloudflare One account when they are removed from the SCIM application in JumpCloud.
* **SCIM identity update behavior**: Choose what happens in Cloudflare One when the user's identity updates in JumpCloud.  
   * _Automatic identity updates_: Automatically update the [User Registry identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/) when JumpCloud sends an updated identity or group membership through SCIM. This identity is used for Gateway policies and Cloudflare One Client [device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/); Access will read the user's updated identity when they reauthenticate.  
   * _Group membership change reauthentication_: [Revoke a user's active session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) when their group membership changes in JumpCloud. This will invalidate all active Access sessions and prompt for reauthentication for any [Cloudflare One Client session policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/). Access will read the user's updated group membership when they reauthenticate.  
   * _No action_: Update the user's identity the next time they reauthenticate to Access or the Cloudflare One Client.
1. Select **Regenerate Secret**. Copy the **SCIM Endpoint** and **SCIM Secret**. You will need to enter these values into JumpCloud.
2. Select **Save**.

The SCIM secret never expires, but you can manually regenerate the secret at any time.

### 2\. Configure SCIM in JumpCloud

1. In the [JumpCloud Admin Portal ↗](https://console.jumpcloud.com/#/home), go to **SSO Applications**.
2. Select the Cloudflare application that was created when you [Set up JumpCloud as a SAML provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/jumpcloud-saml/#set-up-jumpcloud-as-a-saml-provider).
3. Select the **SSO** tab.
4. To provision user groups, select **Include group attribute** and enter `groups`. The group attribute name has to exactly match `groups` or else it will be sent as a SAML attribute.
5. Select the **Identity Management** tab.
6. Make sure that **Enable management of User Groups and Group Membership in this application** is turned on.
7. Select **Configure**.
8. In the **Base URL** field, enter the **SCIM Endpoint** obtained from Cloudflare One.
9. In the **Token Key** field, enter the **SCIM Secret** obtained from Cloudflare One.
10. Select **Activate**. You will receive a confirmation that the Identity Management integration has been successfully verified.
11. Select **Save**.

To check if user identities were updated in Cloudflare One, view your [SCIM provisioning logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/).

Note

New users must first [register the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) or authenticate to an Access application before SCIM provisioning can begin.

### Provisioning attributes

Provisioning attributes define the user and group properties that JumpCloud will synchronize with Cloudflare Access. By default, JumpCloud will send the following attributes during a SCIM update event:

| JumpCloud user attribute | Cloudflare Access attribute |
| ------------------------ | --------------------------- |
| email                    | email                       |
| firstname                | givenName                   |
| lastname                 | surname                     |

| JumpCloud group attribute | Cloudflare Access attribute |
| ------------------------- | --------------------------- |
| name                      | groups                      |

## Example API configuration

```

{

  "config": {

    "issuer_url": "jumpcloud",

    "sso_target_url": "https://sso.myexample.jumpcloud.com/saml2/cloudflareaccess",

    "attributes": ["email", "name", "username"],

    "email_attribute_name": "",

    "sign_request": false,

    "idp_public_cert": "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"

  },

  "type": "saml",

  "name": "jumpcloud saml example"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/jumpcloud-saml/#page","headline":"JumpCloud (SAML) · Cloudflare One docs","description":"JumpCloud (SAML) in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/jumpcloud-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML","SCIM"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/jumpcloud-saml/","name":"JumpCloud (SAML)"}}]}
```
