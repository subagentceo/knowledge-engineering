---
title: Provision with Microsoft Entra
description: Configure Microsoft Entra as a SCIM identity provider to provision users and groups into your Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Provision with Microsoft Entra

Note

**Important Update:** Cloudflare now supports native User Groups for enhanced access control. This new feature replaces the previous method of directly assigning Cloudflare roles based on IdP group mappings (identified by the pattern `CF-<accountID> - <Role Name>`), which is deprecated as of June 2nd, 2025\. SCIM Virtual Groups will reach end-of-life on December 2, 2025\. Update your SCIM configurations using the instructions below to utilize User Groups for seamless provisioning.

Once you have [gathered the required data](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/#gather-the-required-data), the following steps will be required to finish the provisioning with Entra.

## Set up the Enterprise application

1. Go to the Entra admin center and select **Applications** \> **Enterprise Applications**.
2. In the Microsoft Entra Gallery, select **New application** \> **Create your own application**, then choose a name.
3. Select **Integrate any other application you don't find in the gallery (Non-gallery)**.
4. **Create** an application.

## Provision the Enterprise application

1. Inside the newly created application under **Manage** from the sidebar menu, select **Provisioning**.
2. Select **New configuration** and enter the **Tenant URL**: `https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/scim/v2`. Replace `<ACCOUNT_ID>` with your own account ID.
3. Paste the SCIM provisioning API token value as **Secret token**.
4. Select **Test Connection** then **Save** the configuration.

## Configure user and group synchronization

1. Navigate to the newly created application under **Manage** from the sidebar menu, select **Users and groups**.
2. [Assign users and groups to the application ↗](https://learn.microsoft.com/entra/identity/enterprise-apps/assign-user-or-group-access-portal).
3. After the users are assigned, navigate to **Provisioning** on the sidebar menu and select **Start Provisioning**.

Note

To successfully synchronize the group details into Cloudflare the `User Principal Name` (of `Identity`) and `Email` (of `Contact Information`) fields of each user must be identical. Values are case-sensitive, and the User Principal Name can only contain alphanumeric characters. Learn more about [how to create, invite, and delete users ↗](https://learn.microsoft.com/entra/fundamentals/how-to-create-delete-users).

1. To validate which users and groups have been synchronized, navigate to **Provisioning logs** on the sidebar menu. You can also [review the Cloudflare Audit Logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).

Read-only group

If the Entra group shares the same name of an existing Cloudflare user group, the Cloudflare user group will become read-only after the provisioning.

1. To grant permissions to users and groups at Cloudflare, refer to [Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/) and [Policies](https://developers.cloudflare.com/fundamentals/manage-members/policies/).

## (Optional) Automate Cloudflare's SCIM integration

Cloudflare's SCIM integration requires one external application per account. Customers with multiple accounts may want to automate part of the setup to save time and reduce the amount of time spent in the Entra administrative UI.

The initial setup of creating the non-gallery applications and adding the provisioning URL and API key are scriptable via API, but the rest of the setup is dependent on your specific need and IDP configuration.

**1\. Get an access token**

Get an Entra access token. Note that the example below is using the Azure CLI.

```

# Using azure-cli

az login

az account get-access-token --resource https://graph.microsoft.com


(payload with accessToken returned)


```

**2\. Create a new application via template.**

The template ID 8adf8e6e-67b2-4cf2-a259-e3dc5476c621 is the suggested template to create non-gallery apps in the Entra docs. Replace `<accessToken>` and `displayName` with your values.

Example request

```

curl -X POST 'https://graph.microsoft.com/v1.0/applicationTemplates/8adf8e6e-67b2-4cf2-a259-e3dc5476c621/instantiate' \

  --header 'Content-Type: application/json' \

  --header 'Authorization: Bearer <accessToken>' \

  --data-raw '{

    "displayName": "Entra API create application test"

}'


```

Example response

```

{

  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#microsoft.graph.applicationServicePrincipal",

  "application": {

    "id": "343a8552-f9d9-471c-b677-d37062117cc8", //

    "appId": "03d8207b-e837-4be9-b4e6-180492eb3b61",

    "applicationTemplateId": "8adf8e6e-67b2-4cf2-a259-e3dc5476c621",

    "createdDateTime": "2025-01-30T00:37:44Z",

    "deletedDateTime": null,

    "displayName": "Entra API create application test",

    "description": null,

    // ... snipped rest of large application payload

  },

  "servicePrincipal": {

    "id": "a8cb133d-f841-4eb9-8bc9-c8e9e8c0d417", // Note this ID for the subsequent request

    "deletedDateTime": null,

    "accountEnabled": true,

    "appId": "03d8207b-e837-4be9-b4e6-180492eb3b61",

    "applicationTemplateId": "8adf8e6e-67b2-4cf2-a259-e3dc5476c621",

    "appDisplayName": "Entra API create application test",

  // ...snipped rest of JSON payload

}

}


```

**3\. Create a provisioning job**

To enable provisioning, you will also need to create a job. Note the SERVICE\_PRINCIPAL\_ID in the previous request will be used in the request below. The SCIM templateId is an Entra provided template.

Example request

```

curl -X POST 'https://graph.microsoft.com/v1.0/servicePrincipals/<SERVICE_PRINCIPAL_ID>/synchronization/jobs' \

  --header 'Content-Type: application/json' \

  --header 'Authorization: Bearer <accessToken>' \

  --data-raw '{

    "templateId": "scim"

}'


```

Example response

```

{

  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#servicePrincipals('a8cb133d-f841-4eb9-8bc9-c8e9e8c0d417')/synchronization/jobs/$entity",

  "id": "scim.5b223a2cc249463bbd9a791550f11c76.03d8207b-e837-4be9-b4e6-180492eb3b61",

  "templateId": "scim",

  "schedule": {

    "expiration": null,

    "interval": "PT40M",

    "state": "Disabled"

  },

}

// ... snipped rest of JSON payload


```

**4\. Configure the SCIM provisioning URL and API token**

Next, configure the Tenant URL (Cloudflare SCIM endpoint) and API token (SCIM Provisioning API Token).

Replace `<accessToken>`, `<ACCOUNT_ID>`, `<SCIM_PROVISIONING_API_TOKEN_VALUE>` with your values.

Example request

```

 --header 'Content-Type: application/json' \

  --header 'Authorization: Bearer <accessToken>' \

  --data-raw '{

  "value": [

    {

      "key": "BaseAddress",

      "value": "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/scim/v2"

    },

    {

      "key": "SecretToken",

      "value": "<SCIM_PROVISIONING_API_TOKEN_VALUE>"

    }

  ]

}'


```

After completing the tasks above, the next steps in Entra include:

* Additional group/provisioning configuration
* Test and save after updating the config.
* Provisioning after configuration is complete

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/entra/#page","headline":"Provision with Microsoft Entra · Cloudflare Fundamentals docs","description":"Configure Microsoft Entra as a SCIM identity provider to provision users and groups into your Cloudflare account.","url":"https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/entra/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/account-security/","name":"Account security"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/account/account-security/scim-setup/","name":"SCIM provisioning"}},{"@type":"ListItem","position":6,"item":{"@id":"/fundamentals/account/account-security/scim-setup/entra/","name":"Provision with Microsoft Entra"}}]}
```
