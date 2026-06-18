---
title: Troubleshoot compute accounts
description: Troubleshoot Troubleshoot compute accounts issues in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshoot compute accounts

Cloudflare CASB detects when compute accounts are unhealthy or outdated. Common compute account issues include security or functionality updates and API token misconfigurations.

## Identify unhealthy compute accounts

To identify unhealthy compute accounts:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Integrations** \> **Cloud & SaaS integrations**.
2. Choose the integration you created for cloud scanning.
3. Select **Manage compute accounts**.

CASB will display the status of each compute account next to its name. If a compute account is broken or outdated, CASB will set its status to **Unhealthy**. If the status is **Healthy**, no action is required.

## Repair an unhealthy compute account

When CASB marks a compute account as **Unhealthy**, CASB will not use new scan configuration changes and new scan results will not appear in the dashboard.

To repair a compute account marked as **Unhealthy**, first [upgrade the compute account](#upgrade-a-compute-account). If the compute account is still unhealthy, [roll your API token](#roll-api-tokens).

## Upgrade a compute account

Upgrading a compute account applies the latest software features, bug fixes, and infrastructure changes to a cloud compute account. You should run upgrades periodically to keep the compute account software up to date or when recommended by Cloudflare to address an issue. CASB deploys compute account upgrades through Terraform updates.

To upgrade a compute account:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Integrations** \> **Cloud & SaaS integrations**.
2. Choose the integration you created for cloud scanning.
3. Select **Open connection instructions**.
4. Follow the instructions provided to validate your local Terraform and CLI configuration.
5. Under **Step 2: Deploy Terraform Configuration**, copy the template to your local configuration. This template will be the most up to date version of the integration's Terraform configuration.
6. In a local terminal, update the cached version of the CDS Terraform modules:  
Terminal window  
```  
terraform init --upgrade  
```
7. Apply the upgraded Terraform configuration to your compute account:  
Terminal window  
```  
terraform apply  
```

## Roll API tokens

Warning

If you roll your API token in CASB but do not update it in your compute account, CASB will set your compute account's status as **Broken** and stop reporting scan results.

You may need to roll the Cloudflare API token used for your compute account if a security or operational issue appears, your API token is compromised, or your API token is removed from your compute account.

If your token is lost or compromised, you can either create a new token or roll your token to generate a new secret. Rolling your API token into a new one will invalidate the previous token, but the access and permissions will be the same as the previous API token. The new token uses the [scannable format](https://developers.cloudflare.com/fundamentals/api/get-started/token-formats/), which allows credential scanning tools to detect leaked tokens.

To roll your API token:

1. Go to **My Profile** \> **API Tokens**.  
[ Go to **API Tokens** ](https://dash.cloudflare.com/profile/api-tokens)
2. Next to the API token you want to roll, select the **three dot icon** \> **Roll**.
3. Select **Confirm** to generate a new API token.
1. Copy your API token.

Once you roll your API token in Cloudflare, you can update the API token value in your secrets manager for [Amazon Web Services (AWS) ↗](https://docs.aws.amazon.com/secretsmanager/latest/userguide/manage%5Fupdate-secret-value.html) or [Google Cloud Platform (GCP) ↗](https://cloud.google.com/secret-manager/docs/edit-secrets).

### Common token issues

#### `cloudflare-cds-secrets` does not exist in the compute account's secrets manager

To recreate the secret in your compute account:

1. Validate that you selected the correct region.
2. [Upgrade the compute account](#upgrade-a-compute-account) to recreate the secret.
3. [Update the secret value](#roll-api-tokens) in your compute account.

#### I no longer have access to the Cloudflare API token I created

[Roll your Cloudflare API token](#roll-api-tokens) and add it to your compute account. If the [status of the compute account](#identify-unhealthy-compute-accounts) is set to **Healthy**, the issue has been solved.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/troubleshoot-compute-accounts/#page","headline":"Troubleshoot compute accounts · Cloudflare One docs","description":"Troubleshoot Troubleshoot compute accounts issues in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/troubleshoot-compute-accounts/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AWS","GCP","Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/troubleshooting/troubleshoot-compute-accounts/","name":"Troubleshoot compute accounts"}}]}
```
