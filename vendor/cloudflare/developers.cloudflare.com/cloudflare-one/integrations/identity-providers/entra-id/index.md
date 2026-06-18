---
title: Microsoft Entra ID
description: Microsoft Entra ID in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Microsoft Entra ID

You can integrate Microsoft Entra ID (formerly Azure Active Directory) with Cloudflare One and build policies based on user identity and group membership. Users will authenticate to Cloudflare One using their Entra ID credentials.

## Set up Entra ID as an identity provider

### 1\. Obtain Entra ID settings

The following Entra ID values are required to set up the integration:

* Application (client) ID
* Directory (tenant) ID
* Client secret

To retrieve those values:

1. Log in to the [Microsoft Entra admin center ↗](https://entra.microsoft.com/).
2. Go to **Applications** \> **Enterprise applications**.
3. Select **New application**, then select **Create your own application**.
4. Name your application.
5. Select **Register an application to integrate with Microsoft Entra ID (App you're developing)**. If offered, do not select any of the gallery applications. Select **Create**.
6. Under **Redirect URI**, select the _Web_ platform and enter the following URL.  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.  
![Registering an application in Azure](https://developers.cloudflare.com/_astro/name-app.BaJD5DTz_Z1qXF9G.webp)
7. Select **Register**.
8. Next, return to Microsoft Entra ID and go to **Applications** \> **App registrations**.
9. Select **All applications** and select the app you just created. Copy the **Application (client) ID** and **Directory (tenant) ID**. You will need these values when [adding Entra ID as an identity provider in step 3](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#3-add-entra-id-as-an-identity-provider).  
![Viewing the Application ID and Directory ID in Azure](https://developers.cloudflare.com/_astro/azure-values.BIjGV_0A_Z8hYDB.webp)
10. On the same page, under **Client credentials**, go to **Add a certificate or secret**. Select **New client secret**.
11. Name the client secret and choose an expiration period.  
Note  
When the client secret expires, users will be unable to log in through Access. Take note of your expiry date to prevent login errors and renew your client secret when necessary.
12. After the client secret is created, copy its **Value** field. Store the client secret in a safe place, as it can only be viewed immediately after creation. You will need this client secret value when [adding Entra ID as an identity provider in step 3](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#3-add-entra-id-as-an-identity-provider).  
![Location of client secret in Azure](https://developers.cloudflare.com/_astro/client-cert-value.BgU55T2B_ZpRM7a.webp)

### 2\. Configure API permissions in Entra ID

1. Go to **App registrations** \> **All applications** \> select your application > **API permissions**.
2. Select **Add a permission**.
3. Select **Microsoft Graph**.
4. Select **Delegated permissions** and enable the following [permissions ↗](https://learn.microsoft.com/graph/permissions-reference):  
   * `email`  
   * `offline_access`  
   * `openid`  
   * `profile`  
   * `User.Read`  
   * `Directory.Read.All`  
   * `GroupMember.Read.All`

Note

More narrow permissions may be used, however this is the set of permissions that are tested and supported by Cloudflare.

1. Once all seven permissions are enabled, select **Add permissions**.
2. Select **Grant admin consent**.  
![Configured permissions list in Azure](https://developers.cloudflare.com/_astro/configured-perms.C3NcHNrM_jWwgm.webp)

### 3\. Add Entra ID as an identity provider

* [ Dashboard ](#tab-panel-7212)
* [ API ](#tab-panel-7213)
* [ Terraform ](#tab-panel-7214)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select **Azure AD**.
4. Enter the **Application (client) ID**, **Client secret**, and **Directory (tenant) ID** obtained from Microsoft Entra ID.
5. Select **Save**.
6. To [test](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one) that your connection is working, select **Test**.
7. (Optional) Configure the following settings:  
   * **Proof Key for Code Exchange**: Perform [PKCE ↗](https://www.oauth.com/oauth2-servers/pkce/) on all login attempts.  
   * **Support Groups**: Allow Cloudflare to read a user's Entra ID group membership.  
   * **Entra ID Policy Sync**: Refer to our [Entra ID Conditional Access tutorial](https://developers.cloudflare.com/cloudflare-one/tutorials/entra-id-conditional-access/).  
   * **Enable SCIM**: Refer to [Synchronize users and groups](#synchronize-users-and-groups).  
   * **Email claim**: Enter the Entra ID claim that you wish to use for user identification (for example, `preferred_username`).  
   * **OIDC Claims**: Enter [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) that you wish to add to your users' identity.

Make a `POST` request to the [Identity Providers](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/identity%5Fproviders/methods/create/) endpoint:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Organizations, Identity Providers, and Groups Write`

Add an Access identity provider

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Entra ID example",

    "type": "azureAD",

    "config": {

        "client_id": "<your client id>",

        "client_secret": "<your client secret>",

        "directory_id": "<your azure directory uuid>",

        "support_groups": true

    }

  }'


```

Provider versions

The following example requires Cloudflare provider version `4.40.0` or greater.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Access: Organizations, Identity Providers, and Groups Write`
2. Configure the [cloudflare\_zero\_trust\_access\_identity\_provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fidentity%5Fprovider) resource:  
```  
resource "cloudflare_zero_trust_access_identity_provider" "microsoft_entra_id" {  
  account_id = var.cloudflare_account_id  
  name       = "Entra ID example"  
  type       = "azureAD"  
  config      = {  
    client_id                  = var.entra_id_client_id  
    client_secret              = var.entra_id_client_secret  
    directory_id               = var.entra_id_directory_id  
    support_groups             = true  
    }  
}  
```

#### UPN and email

If your organization's UPNs do not match users' email addresses, you must add a custom claim for email. For example, if your organization's email format is `user@domain.com` but the UPN is `u908080@domain.com`, you must create an email claim if you are configuring email-based policies.

By default, Cloudflare will first look for the unique claim name you created and configured in Cloudflare One to represent email (for example, `email_identifier`) in the `id_token` JSON response. If you did not configure a unique claim name, Cloudflare will then look for an `email` claim. Last, if neither claim exists, Cloudflare will look for the UPN claim.

To receive an email claim in the `id_token` from Microsoft Entra, you must:

1. In the [Microsoft Entra admin center ↗](https://entra.microsoft.com/), go to **Application** \> **App registration** \> **All applications** and select the relevant application.
2. Under **Manage**, select **Token configuration**.
3. Add a claim for email.  
![Email claim for Entra](https://developers.cloudflare.com/_astro/entra-email-claim.CPt-1jZE_1PVHWt.webp)  
The example above includes both a UPN claim and an email claim. Because an email claim was created in the Microsoft Entra configuration, Cloudflare will look for the `email` key-value pair in the JSON response.
4. If you gave your email claim another name than `email`, you must update your configuration in Cloudflare One:  
a. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers** \> **Azure AD** \> **Edit**.  
b. Under **Optional configurations** \> **Email claim**, enter the name of the claim representing your organization's email addresses.

#### Object ID

If you are concerned that users' emails or UPNs may change, you can pass the user's object ID (`oid`) from Microsoft Entra to Cloudflare Access. To configure Access to receive the object ID, refer to [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims). No additional configuration is required in Microsoft Entra.

## Synchronize users and groups

The Microsoft Entra ID integration allows you to synchronize IdP groups and automatically deprovision users using [SCIM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/).

### Prerequisites

* Microsoft Entra ID P1 or P2 license

### 1\. Enable SCIM in Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Find the Entra ID integration and select **Edit**.
3. Turn on **Enable SCIM**  and **Support groups**.
4. (Optional) Configure the following settings:
* **Enable user deprovisioning**: [Revoke a user's active session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) when they are removed from the SCIM application in Entra ID. This will invalidate all active Access sessions and prompt for reauthentication for any [Cloudflare One Client session policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).
* **Remove user seat on deprovision**: [Remove a user's seat](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/) from your Cloudflare One account when they are removed from the SCIM application in Entra ID.
* **SCIM identity update behavior**: Choose what happens in Cloudflare One when the user's identity updates in Entra ID.  
   * _Automatic identity updates_: Automatically update the [User Registry identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/) when Entra ID sends an updated identity or group membership through SCIM. This identity is used for Gateway policies and Cloudflare One Client [device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/); Access will read the user's updated identity when they reauthenticate.  
   * _Group membership change reauthentication_: [Revoke a user's active session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) when their group membership changes in Entra ID. This will invalidate all active Access sessions and prompt for reauthentication for any [Cloudflare One Client session policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/). Access will read the user's updated group membership when they reauthenticate.  
   * _No action_: Update the user's identity the next time they reauthenticate to Access or the Cloudflare One Client.
1. Select **Regenerate Secret**. Copy the **SCIM Endpoint** and **SCIM Secret**. You will need to enter these values into Entra ID.
2. Select **Save**.

The SCIM secret never expires, but you can manually regenerate the secret at any time.

### 2\. Configure SCIM in Entra ID

Note

SCIM requires a separate enterprise application from the one created during [initial setup](#set-up-entra-id-as-an-identity-provider).

1. In the Microsoft Entra ID menu, go to **Enterprise applications**.
2. Select **New application** \> **Create your own application**.
3. Name your application (for example, `Cloudflare Access SCIM`).
4. Select **Integrate any other application you don't find in the gallery (Non-gallery)**. If offered, do not select any of the gallery applications. Select **Create**.
5. After you have created the application, go to **Provisioning** \> select **New Configuration**.
6. In the **Tenant URL** field, enter the **SCIM Endpoint** obtained from your Entra ID integration in Cloudflare One [in the previous step](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#1-enable-scim-in-zero-trust).
7. In the **Secret token** field, enter the **SCIM Secret** obtained from your Entra ID integration in Cloudflare One [in the previous step](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#1-enable-scim-in-zero-trust).
8. Select **Test Connection** to ensure that the credentials were entered correctly. If the test fails, go to your Entra ID integration in Cloudflare One, select **Regenerate Secret**, select **Save**, and enter your new **SCIM Secret** in the **Secret token** field.
9. Select **Create**.
10. Once the SCIM application is created, [assign users and groups to the application ↗](https://learn.microsoft.com/entra/identity/enterprise-apps/assign-user-or-group-access-portal).

Note

Groups in this SCIM application should match the groups in your other [Cloudflare Access enterprise application](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#set-up-entra-id-as-an-identity-provider). Because SCIM group membership updates will overwrite any groups in a user's identity, assigning the same groups to each app ensures consistent policy evaluation.

1. Go to **Provisioning** and select **Start provisioning**.
2. For **Provisioning Mode**, the default mode should be set by Microsoft to _Automatic_.
3. On the **Overview** page in Entra ID, you will see the synchronization status.

To check which users and groups were synchronized, select **Provisioning logs**.

To check if user identities were updated in Cloudflare One, view your [SCIM provisioning logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/).

Note

New users must first [register the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) or authenticate to an Access application before SCIM provisioning can begin.

To monitor the exchange of identity details between Cloudflare Access and Microsoft Entra ID, go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) \> **Zero Trust** \> **Insights** \> **Logs** \> **SCIM provisioning logs** and view the [SCIM activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/).

### Provisioning attributes

Provisioning attributes define the user properties that Entra ID will synchronize with Cloudflare Access. To modify your provisioning attributes, go to the **Attribute mapping** and select **Provision Microsoft Entra ID Users**.

If not already configured, Cloudflare recommends enabling the following user attribute mappings:

| customappsso Attribute         | Entra ID Attribute        | Recommendation                                                   |
| ------------------------------ | ------------------------- | ---------------------------------------------------------------- |
| userName                       | userPrincipalName or mail | Required. Must match the user's email address in Cloudflare One. |
| emails\[type eq "work"\].value | mail                      | Required. Must match the user's email address in Cloudflare One. |
| name.givenName                 | givenName                 | Recommended                                                      |
| name.familyName                | surname                   | Recommended                                                      |

## Entra groups in Zero Trust policies

### Automatic entry

When [SCIM synchronization is enabled](#synchronize-users-and-groups), your Entra group names will automatically appear in the Access and Gateway policy builders.

![Azure group names displayed in the Access policy builder](https://developers.cloudflare.com/_astro/azure-scim-groups.CShvL-AY_Z1iMluz.webp) 

If building a Gateway policy, choose the [_User Group Names_](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#user-group-names) selector.

### Manual entry

You can create Access and Gateway policies for groups that are not synchronized with SCIM. Entra ID exposes directory groups in a format that consists of random strings, the `Object Id`, that is distinct from the `Name`.

1. Make sure you enable **Support groups** as you set up Microsoft Entra ID in Cloudflare One.
2. In your Microsoft Entra dashboard, note the `Object Id` for the Entra group. In the example below, the group named Admins has an ID of `61503835-b6fe-4630-af88-de551dd59a2`.  
![Viewing the Azure group ID on the Azure dashboard](https://developers.cloudflare.com/_astro/object-id.Cr5EOUSk_Z1BAiJq.webp)
3. If building an Access policy, choose the _Azure Groups_ selector. If building a Gateway policy, choose the _User Group IDs_ selector.
4. In the **Value** field, enter the `Object Id` for the Entra group.  
![Entering an Azure group ID in Cloudflare One](https://developers.cloudflare.com/_astro/configure-group-n.CdHBsLpw_Z1zm43i.webp)

### Nested groups

#### Authentication

Access and Gateway policies for an Entra group will also apply to all [nested groups ↗](https://learn.microsoft.com/entra/fundamentals/how-to-manage-groups#add-a-group-to-another-group). For example, if a user belongs to the group `US devs`, and `US devs` is part of the broader group `Devs`, the user would be allowed or blocked by all policies created for `Devs`.

#### SCIM provisioning

For SCIM provisioning, [nested groups are not supported ↗](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/how-provisioning-works#assignment-based-scoping). Microsoft Entra ID's SCIM implementation does not send information about nested group memberships to Cloudflare. Only users who are direct members of an explicitly assigned group will be provisioned. To ensure group memberships are correctly synchronized, you must flatten your groups in Entra ID by directly assigning users to the groups you want to provision.

Since the SCIM request from Microsoft does not include nested group information, neither Cloudflare nor Microsoft can provide a notification that nested groups are not being synchronized.

## Force user interaction during device client reauthentication

You can require users to re-enter their credentials into Entra ID whenever they [re-authenticate their Cloudflare One Client session](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/). To configure this setting:

1. Make a `GET` request to the [Identity Providers endpoint](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/identity%5Fproviders/) and copy the response for the Entra ID identity provider.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Organizations, Identity Providers, and Groups Write`  
   * `Access: Organizations, Identity Providers, and Groups Read`  
Get an Access identity provider  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers/$IDENTITY_PROVIDER_ID" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```
2. [Update the Entra ID identity provider](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/identity%5Fproviders/methods/update/) using a `PUT` request. In the request body, include all existing configurations and set the `prompt` parameter to either `login` or `select_account`. For example:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Organizations, Identity Providers, and Groups Write`  
Update an Access identity provider  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers/$IDENTITY_PROVIDER_ID" \  
  --request PUT \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",  
    "type": "azureAD",  
    "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",  
    "name": "Entra ID",  
    "version": "31e74e9b4f033e16b604552091a72295",  
    "config": {  
        "azure_cloud": "default",  
        "client_id": "<CLIENT_ID>",  
        "conditional_access_enabled": false,  
        "directory_id": "<AZURE_DIRECTORY_ID>",  
        "redirect_url": "https://<TEAM_NAME>.cloudflareaccess.com/cdn-cgi/access/callback",  
        "prompt": "login",  
        "support_groups": true  
    },  
    "scim_config": {  
        "enabled": true,  
        "user_deprovision": true,  
        "seat_deprovision": false,  
        "group_member_deprovision": false,  
        "identity_update_behavior": "automatic"  
    },  
    "scim_base_url": "https://<TEAM_NAME>.cloudflareaccess.com/populations/f174e90a-fafe-4643-bbbc-4a0ed4fc8415/scim/v2"  
  }'  
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#page","headline":"Microsoft Entra ID · Cloudflare One docs","description":"Microsoft Entra ID in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft Entra ID","SCIM"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/entra-id/","name":"Microsoft Entra ID"}}]}
```
