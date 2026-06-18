---
title: Rotate ACM certificate packs
description: Replace an Advanced Certificate Manager certificate pack with zero downtime by creating the new pack, waiting for it to go Active, then deleting the old one.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rotate ACM certificate packs

Advanced Certificate Manager (ACM) certificate packs cannot be updated in place. To replace an existing pack - for example, to change the certificate authority, add hostnames, or change validation method - you create a new pack, wait for it to reach **Active** status, and then delete the old one.

The key principle is to ensure the new certificate pack reaches **Active** before removing the old one. This avoids any gap in coverage and means there is no downtime for your users.

---

## Recommended rotation process

### 1\. Create the new certificate pack

* [ Dashboard ](#tab-panel-10666)
* [ API ](#tab-panel-10667)
* [ Terraform ](#tab-panel-10668)

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. Select **Order Advanced Certificate**.
3. Configure the new certificate pack with the desired hostnames, certificate authority, and validation method.
4. Select **Save**.

Use the [Order Certificate Pack](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/create/) endpoint to create the new pack.

Add a new `cloudflare_certificate_pack` resource to your Terraform configuration and apply it. Refer to the [Terraform-specific notes](#terraform) below before proceeding.

### 2\. Wait for Active status

After ordering, the new certificate pack moves through several intermediate states before it is ready to serve traffic:

1. **Initializing**
2. **Pending Validation**
3. **Pending Issuance**
4. **Pending Deployment**
5. **Active**

Do not delete the old certificate pack until the new one reaches **Active**. Refer to [Certificate statuses](https://developers.cloudflare.com/ssl/reference/certificate-statuses/) for a description of each stage.

Monitor progress on the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) page in the dashboard, or poll the [Get Certificate Pack](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/get/) API endpoint.

For zones using Cloudflare as authoritative DNS (full setup), most validations complete within minutes. For [partial (CNAME) setups](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), you will need to place DCV tokens manually - refer to [DCV methods](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/) for details. DCV tokens expire if not satisfied within their validity window (7 days for Let's Encrypt, 14 days for Google Trust Services and SSL.com).

### 3\. Delete the old certificate pack

Once the new pack is **Active**, it is safe to delete the old one.

* [ Dashboard ](#tab-panel-10669)
* [ API ](#tab-panel-10670)
* [ Terraform ](#tab-panel-10671)

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. Select the old certificate pack.
3. Select **Delete Certificate**.

Use the [Delete Certificate Pack](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/delete/) endpoint.

Remove the old `cloudflare_certificate_pack` resource from your Terraform configuration and apply. Refer to the [Terraform-specific notes](#terraform) below.

### 4\. Expect a brief Pending Deployment state

After the old pack is deleted, the remaining certificate may briefly show **Pending Deployment** before returning to **Active**. This reflects a normal edge re-evaluation cycle as the global network reconciles the change, and typically resolves within a few minutes with no traffic impact.

If the certificate remains in **Pending Deployment** for longer than expected, refer to [Certificate statuses](https://developers.cloudflare.com/ssl/reference/certificate-statuses/) and contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

---

## Terraform

Certificate packs cannot be updated in place - every attribute of the `cloudflare_certificate_pack` resource forces a new resource on change. Plan your rotation around this constraint.

Warning

Importing existing certificate packs into Terraform state is supported but not recommended. If Cloudflare reissues the certificate (for example, on renewal), the resource ID changes and your Terraform state goes out of sync. The recommended pattern is to manage the full lifecycle through Terraform - create, wait for active, then delete - rather than importing existing packs.

### Wait for Active automatically

Set `wait_for_active_status = true` on the new resource to have Terraform block the apply until the certificate pack reaches **Active**. This removes the need to manually poll the dashboard or API between steps 1 and 3.

### Recommended pattern

1. Add the new `cloudflare_certificate_pack` resource with `wait_for_active_status = true` and run `terraform apply`. The apply will not complete until the pack is Active.
2. Remove the old resource from your configuration and run `terraform apply` to delete it.

For zero-downtime rotation of a single resource (where you cannot have both old and new in state simultaneously), use Terraform's [create\_before\_destroy ↗](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle#create%5Fbefore%5Fdestroy) lifecycle meta-argument.

Refer to the [cloudflare\_certificate\_pack provider documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/certificate%5Fpack) for the full resource schema.

---

## Common rotation issues

### Let's Encrypt rate limit

Let's Encrypt limits new certificates to five per seven-day window for the same exact set of hostnames. Repeated rotations (for example, during testing or automation loops) can exhaust this limit and block further issuance for up to a week.

If you hit this limit, switch the certificate authority to [Google Trust Services or SSL.com](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) or wait for the rate limit window to expire. Refer to [Let's Encrypt rate limits ↗](https://letsencrypt.org/docs/rate-limits/) for details.

### Pack stuck in Pending Validation

If a new pack remains in **Pending Validation** for more than 15 minutes, check that your DCV method is set up correctly. Refer to [Domain Control Validation](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/) and [Troubleshoot domain control validation](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/troubleshooting/).

---

## Distinction from custom certificate replacement

This page covers **ACM certificate packs** (Cloudflare-managed Domain Validated certificates ordered via Advanced Certificate Manager).

If you are using a **custom certificate** (a certificate you supplied), Cloudflare provides an in-place **Replace SSL certificate and key** flow that handles the rotation without requiring you to manage two packs. Refer to [Manage custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#update-an-existing-custom-certificate).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/reference/certificate-rotation/#page","headline":"Rotate ACM certificate packs · Cloudflare SSL/TLS docs","description":"Replace an Advanced Certificate Manager certificate pack with zero downtime by creating the new pack, waiting for it to go Active, then deleting the old one.","url":"https://developers.cloudflare.com/ssl/reference/certificate-rotation/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/reference/certificate-rotation/","name":"Rotate ACM certificate packs"}}]}
```
