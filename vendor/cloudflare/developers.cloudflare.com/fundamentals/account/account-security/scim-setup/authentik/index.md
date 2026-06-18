---
title: Provision with Authentik
description: Configure Authentik as a SCIM identity provider to provision users and groups into your Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Provision with Authentik

Note

**Important Update:** Cloudflare now supports native User Groups for enhanced access control. This new feature replaces the previous method of directly assigning Cloudflare roles based on IdP group mappings (identified by the pattern `CF-<accountID> - <Role Name>`), which is deprecated as of June 2nd, 2025\. SCIM Virtual Groups will reach end-of-life on December 2, 2025\. Update your SCIM configurations using the instructions below to utilize User Groups for seamless provisioning.

Once you have [gathered the required data](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/#gather-the-required-data), the following steps will be required to finish the provisioning with Authentik.

## Set up your Authentik SCIM provider

1. In the Authentik Admin interface, go to **Applications** \> **Providers**.
2. Select **Create** and choose **SCIM Provider**.
3. Name your provider (for example, `Cloudflare SCIM`).
4. In **URL**, enter: `https://api.cloudflare.com/client/v4/accounts/<accountID>/scim/v2`, substituting `<accountID>` for your [Cloudflare Account ID](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/#get-the-account-id).
5. In **Token**, Paste the SCIM provisioning API token.
6. (Optional) Adjust the **User filtering** and **Group filtering** settings to control which users and groups are synchronized.
7. Select **Finish** to create the provider.

## Create an Authentik application

1. In the Authentik Admin interface, go to **Applications** \> **Applications**.
2. Select **Create**.
3. Name your application (for example, `Cloudflare Dashboard`).
4. In **Provider**, select the SCIM provider you created in the previous step.
5. Select **Create** to save the application.

## Configure user and group sync in Authentik

Note

The **Update User Attributes** option is not supported.

1. In the Authentik Admin interface, go to **Directory** \> **Groups**.
2. Create or select the groups you want to synchronize with Cloudflare. Ensure the users you want to provision are members of these groups.
3. Return to **Applications** \> **Providers** and select your SCIM provider.
4. Under **Backchannel Providers**, verify that your SCIM provider is correctly linked to the application.
5. To trigger a manual sync, select **Sync** from the provider page. Authentik will also perform automatic periodic syncs based on your configured schedule.

## Verify the integration

To verify the integration:

1. In Authentik, go to **Applications** \> **Providers**, select your SCIM provider, and review the **Sync status** section for any errors.
2. In the Cloudflare dashboard, go to **Manage Account** \> **Members** \> **User Groups** to view the synchronized groups.
3. Check the Audit Logs in the Cloudflare dashboard by going to **Manage Account** \> **Audit Log**.

## Assign policies to user groups

After users and groups are synchronized, you can assign [policies](https://developers.cloudflare.com/fundamentals/manage-members/policies/) to user groups:

1. In the Cloudflare dashboard, go to **Manage Account** \> **Members** \> **User Groups**.
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members) 
1. Select the group you want to configure.
2. Assign the appropriate policies to define the [roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/) for group members.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/authentik/#page","headline":"Provision with Authentik · Cloudflare Fundamentals docs","description":"Configure Authentik as a SCIM identity provider to provision users and groups into your Cloudflare account.","url":"https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/authentik/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/account-security/","name":"Account security"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/account/account-security/scim-setup/","name":"SCIM provisioning"}},{"@type":"ListItem","position":6,"item":{"@id":"/fundamentals/account/account-security/scim-setup/authentik/","name":"Provision with Authentik"}}]}
```
