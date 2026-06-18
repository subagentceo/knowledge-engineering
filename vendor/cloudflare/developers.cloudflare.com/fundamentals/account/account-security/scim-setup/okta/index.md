---
title: Provision with Okta
description: Configure Okta as a SCIM identity provider to provision users and groups into your Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Provision with Okta

Note

**Important Update:** Cloudflare now supports native User Groups for enhanced access control. This new feature replaces the previous method of directly assigning Cloudflare roles based on IdP group mappings (identified by the pattern `CF-<accountID> - <Role Name>`), which is deprecated as of June 2nd, 2025\. SCIM Virtual Groups will reach end-of-life on December 2, 2025\. Update your SCIM configurations using the instructions below to utilize User Groups for seamless provisioning.

Once you have [gathered the required data](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/#gather-the-required-data), the following steps will be required to finish the provisioning with Okta.

## Set up your Okta SCIM application

1. In the Okta dashboard, go to **Applications** \> **Applications**.
2. Select **Browse App Catalog**.
3. Locate and select **SCIM 2.0 Test App (OAuth Bearer Token)**.
4. Select **Add Integration** and name your integration.
5. Enable the following options:  
   * **Do not display application icon to users**  
   * **Do not display application icon in the Okta Mobile App**
6. Disable **Automatically log in when user lands on login page**.
7. Select **Next**, then select **Done**.

## Integrate the Cloudflare API

Note

The **Update User Attributes** option is not supported.

1. In your integration page, go to **Provisioning** \> **Configure API Integration**.
2. Enable **Enable API Integration**.
3. In SCIM 2.0 Base URL, enter: `https://api.cloudflare.com/client/v4/accounts/<accountID>/scim/v2`, substituting `accountID` for your [Cloudflare Account ID](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/#get-the-account-id).
4. In the **OAuth Bearer Token** field, enter your API token value.
5. Deselect **Import Groups**.

## Configure user & group sync in Okta

1. In **Provisioning to App**, select **Edit**.
2. Enable **Create Users** and **Deactivate Users**. Select **Save**.
3. Select **Done**.
4. In the Assignments tab, add the users you want to synchronize with Cloudflare dashboard. You can add users in batches by assigning a group. If a user is removed from the application assignment via either direct user assignment or removed from the group that was assigned to the app, this will trigger a deprovisioning event from Okta to Cloudflare.
5. In the Push Groups tab, add the Okta groups you want to synchronize with Cloudflare dashboard. View these Okta groups in the dashboard under Manage Account > Manage members > Members > User Groups.

To verify the integration, select **View Logs** in the Okta SCIM application, and check the Audit Logs in the Cloudflare dashboard by navigating to **Manage Account** \> **Audit Log**.

This will provision all of the users in the group(s) affected to your Cloudflare account with "minimal account access."

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/okta/#page","headline":"Provision with Okta · Cloudflare Fundamentals docs","description":"Configure Okta as a SCIM identity provider to provision users and groups into your Cloudflare account.","url":"https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/okta/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/account-security/","name":"Account security"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/account/account-security/scim-setup/","name":"SCIM provisioning"}},{"@type":"ListItem","position":6,"item":{"@id":"/fundamentals/account/account-security/scim-setup/okta/","name":"Provision with Okta"}}]}
```
