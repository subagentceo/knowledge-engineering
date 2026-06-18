---
title: Azure Managed HSM
description: This tutorial uses Microsoft Azure's Managed HSM to deploy a VM with the Keyless SSL daemon. Follow these instructions to deploy your keyless server.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Azure Managed HSM

This tutorial uses [Microsoft Azure’s Managed HSM ↗](https://azure.microsoft.com/en-us/updates/akv-managed-hsm-public-preview/) — a FIPS 140-2 Level 3 certified implementation — to deploy a VM with the Keyless SSL daemon.

---

## Before you start

Make sure you have:

* Followed Microsoft's [tutorial ↗](https://docs.microsoft.com/en-us/azure/key-vault/managed-hsm/quick-create-cli) for provisioning and activating the managed HSM
* Set up a VM for your key server

---

## 1\. Create a VM

Create a VM where you will deploy the keyless daemon.

---

## 2\. Deploy the keyless server

Follow [these instructions](https://developers.cloudflare.com/ssl/keyless-ssl/configuration/cloudflare-tunnel/#4-set-up-and-activate-key-server) to deploy your keyless server.

---

## 3\. Set up the Azure CLI

Set up the Azure CLI (used to access the private key).

For example, if you were using macOS:

Terminal window

```

brew install azure-cli


```

---

## 4\. Set up the Managed HSM

1. Log in through the Azure CLI and create a resource group for the Managed HSM in one of the supported regions:  
Terminal window  
```  
az login  
az group create --name HSMgroup --location southcentralus  
```  
Note  
For a list of supported regions, see the [Microsoft documentation ↗](https://azure.microsoft.com/en-us/global-infrastructure/services/?products=key-vault).
2. [Create, provision, and activate ↗](https://docs.microsoft.com/en-us/azure/key-vault/managed-hsm/quick-create-cli) the HSM.
3. Add your private key to the `keyvault`, which returns the URI you need for **Step 4**:  
```  
az keyvault key import --hsm-name "KeylessHSM" --name "hsm-pub-keyless" --pem-file server.key  
```
4. If the key server is running in an Azure VM in the same account, use **Managed services** for authorization:  
   1. Enable managed services on the VM in the UI.  
   2. Give your service user (associated with your VM) HSM sign permissions  
   ```  
   az keyvault role assignment create  --hsm-name KeylessHSM --assignee $(az vm identity show --name "hsmtestvm" --resource-group "HSMgroup" --query principalId -o tsv) --scope / --role "Managed HSM Crypto User"  
   ```
5. In the `gokeyless` YAML file, add the URI from **Step 2** under `private_key_stores`. See our [README ↗](https://github.com/cloudflare/gokeyless/blob/master/README.md) for an example.

## 5\. Restart gokeyless

Once you save the config file, restart `gokeyless` and verify that it started successfully:

Terminal window

```

sudo systemctl restart gokeyless.service

sudo systemctl status gokeyless.service -l


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/azure-managed-hsm/#page","headline":"Azure Managed HSM · Cloudflare SSL/TLS docs","description":"This tutorial uses Microsoft Azure's Managed HSM to deploy a VM with the Keyless SSL daemon. Follow these instructions to deploy your keyless server.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/azure-managed-hsm/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Azure"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/","name":"Hardware security modules"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/azure-managed-hsm/","name":"Azure Managed HSM"}}]}
```
