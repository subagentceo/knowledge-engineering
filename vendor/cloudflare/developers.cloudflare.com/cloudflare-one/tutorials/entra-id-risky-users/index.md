---
title: Isolate risky Entra ID users
description: Microsoft Entra ID (formerly Azure Active Directory) calculates a user's risk level based on the probability that their account has been compromised. With Cloudflare Zero Trust, you can synchronize the Entra ID risky users list with Cloudflare Access and apply more stringent Zero Trust policies to users at higher risk.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Isolate risky Entra ID users

**Last reviewed:**  over 3 years ago 

Microsoft Entra ID (formerly Azure Active Directory) calculates a user's [risk level ↗](https://learn.microsoft.com/entra/id-protection/howto-identity-protection-investigate-risk) based on the probability that their account has been compromised. With Cloudflare Zero Trust, you can synchronize the Entra ID risky users list with Cloudflare Access and apply more stringent Zero Trust policies to users at higher risk.

This tutorial demonstrates how to automatically redirect users to a remote browser when they are deemed risky by Entra ID.

**Time to complete:**

1 hour

## Prerequisites

* Microsoft Entra ID Premium P2 license
* [Cloudflare Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) add-on
* [Gateway HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/) enabled on your devices
* [npm ↗](https://docs.npmjs.com/getting-started) installation
* [Node.js ↗](https://nodejs.org/en/) installation

## 1\. Set up Entra ID as an identity provider

Refer to [our IdP setup instructions](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#set-up-entra-id-as-an-identity-provider) for Entra ID.

Note

* When you configure the IdP in Cloudflare One, be sure to select **Enable group membership change reauthentication**.
* Save the **Application (client) ID**, **Directory (tenant) ID**, and **Client secret** as you will need them again in a later step.

## 2\. Add Entra ID API permissions

Once the base IdP integration is tested and working, enable additional permissions that will allow a script to create and update risky user groups in Entra ID:

1. In Microsoft Entra ID, go to **App registrations**.
2. Select the application you created for the IdP integration.
3. Go to **API permissions** and select **Add a permission**.
4. Select **Microsoft Graph**.
5. Select **Application permissions** and add the following [permissions ↗](https://learn.microsoft.com/en-us/graph/permissions-reference):  
   * `IdentityRiskyUser.ReadAll`  
   * `Directory.ReadWriteAll`  
   * `Group.Create`  
   * `Group.ReadAll`  
   * `GroupMember.ReadAll`  
   * `GroupMember.ReadWriteAll`
6. Select **Grant admin consent**.

You will see the list of enabled permissions.

![API permissions in Entra ID](https://developers.cloudflare.com/_astro/risky-users-permissions.BXnsnrQO_Zax1Jt.webp) 

## 3\. Add risky users to Entra ID group

Next, configure an automated script that will populate an Entra ID security group with risky users.

To get started quickly, deploy our example Cloudflare Workers script by following the step-by-step instructions below. Alternatively, you can implement the script using [Azure Functions ↗](https://learn.microsoft.com/azure/azure-functions/functions-overview) or any other tool.

1. Open a terminal and clone our example project.  
Terminal window  
```  
npm create cloudflare@latest risky-users -- --template https://github.com/cloudflare/msft-risky-user-ad-sync  
```
2. Go to the project directory.  
Terminal window  
```  
cd risky-users  
```
3. Modify the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to include the following values:  
   * `<ACCOUNT_ID>`: your Cloudflare [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).  
   * `<TENANT_ID>`: your Entra ID **Directory (tenant) ID**, obtained when [setting up Entra ID as an identity provider](#1-set-up-entra-id-as-an-identity-provider).  
   * `<CLIENT_ID>`: your Entra ID **Application (client) ID**, obtained when [setting up Entra ID as an identity provider](#1-set-up-entra-id-as-an-identity-provider).  
   * [  wrangler.jsonc ](#tab-panel-7732)  
   * [  wrangler.toml ](#tab-panel-7733)  
JSONC  
```  
{  
  "$schema": "./node_modules/wrangler/config-schema.json",  
  "name": "risky-users",  
  // Set this to today's date  
  "compatibility_date": "2026-06-18",  
  "main": "src/index.js",  
  "workers_dev": false,  
  "account_id": "<ACCOUNT-ID>",  
  "vars": {  
    "AZURE_AD_TENANT_ID": "<TENANT-ID>",  
    "AZURE_AD_CLIENT_ID": "<CLIENT-ID>",  
  },  
  "triggers": {  
    "crons": ["* * * * *"],  
  },  
}  
```  
TOML  
```  
"$schema" = "./node_modules/wrangler/config-schema.json"  
name = "risky-users"  
# Set this to today's date  
compatibility_date = "2026-06-18"  
main = "src/index.js"  
workers_dev = false  
account_id = "<ACCOUNT-ID>"  
[vars]  
AZURE_AD_TENANT_ID = "<TENANT-ID>"  
AZURE_AD_CLIENT_ID = "<CLIENT-ID>"  
[triggers]  
crons = [ "* * * * *" ]  
```

Note

The [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) in this example schedules the script to run every minute. Learn more about [supported cron expressions](https://developers.cloudflare.com/workers/configuration/cron-triggers/#supported-cron-expressions).

1. Deploy the Worker to Cloudflare's global network.  
Terminal window  
```  
npx wrangler deploy  
```
2. Create a secret variable named `AZURE_AD_CLIENT_SECRET`.  
Terminal window  
```  
wrangler secret put AZURE_AD_CLIENT_SECRET  
```  
You will be prompted to input the secret's value. Enter the **Client secret** obtained when [setting up Microsoft Entra ID as an identity provider](#1-set-up-azure-ad-as-an-identity-provider).

The Worker script will begin executing once per minute. To view realtime logs, run the following command and wait for the script to execute:

Terminal window

```

wrangler tail --format pretty


```

After the initial run, the auto-generated groups will appear in the Entra ID dashboard.

![Risky user groups in the Entra ID dashboard](https://developers.cloudflare.com/_astro/risky-users-groups.DdF4Xs9Y_Z2mmVhk.webp) 

## 4\. Synchronize risky user groups

Next, synchronize Entra ID risky user groups with Cloudflare Access:

1. [Enable SCIM synchronization](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#synchronize-users-and-groups).
2. In Entra ID, assign the following groups to your SCIM enterprise application:  
   * `IdentityProtection-RiskyUser-RiskLevel-high`  
   * `IdentityProtection-RiskyUser-RiskLevel-medium`  
   * `IdentityProtection-RiskyUser-RiskLevel-low`

Cloudflare Access will now synchronize changes in group membership with Entra ID. You can verify the synchronization status on the SCIM application's **Provisioning** page.

## 5\. Create a browser isolation policy

Finally, create a [Gateway HTTP policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) to isolate traffic for risky user groups.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Traffic policies** \> **Firewall policies** \> **HTTP**.
2. Select **Add a policy**.
3. Build an [Isolate policy](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/) that contains a _User Group Names_ rule. For example, the following policy serves `app1.example.com` and `app2.example.com` in a remote browser for all members flagged as high risk:  
| Selector         | Operator | Value                                       | Logic | Action  |  
| ---------------- | -------- | ------------------------------------------- | ----- | ------- |  
| Domain           | in       | app1.example.com, app2.example.com          | And   | Isolate |  
| User Group Names | in       | IdentityProtection-RiskyUser-RiskLevel-high |       |         |

To test the policy, refer to the Microsoft documentation for [simulating risky detections ↗](https://learn.microsoft.com/entra/id-protection/howto-identity-protection-simulate-risk).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/entra-id-risky-users/#page","headline":"Isolate risky Entra ID users · Cloudflare One docs","description":"Microsoft Entra ID (formerly Azure Active Directory) calculates a user's risk level based on the probability that their account has been compromised. With Cloudflare Zero Trust, you can synchronize the Entra ID risky users list with Cloudflare Access and apply more stringent Zero Trust policies to users at higher risk.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/entra-id-risky-users/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft Entra ID","SCIM"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/entra-id-risky-users/","name":"Isolate risky Entra ID users"}}]}
```
