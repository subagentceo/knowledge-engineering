---
title: Vendor-specific DNS records
description: DNS records for common third-party services.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Vendor-specific DNS records

This article requires prior knowledge of DNS record management via the Cloudflare dashboard. To learn more, refer to Cloudflare's article on [managing DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

## Google

### Google Workspace MX records

Google Workspace requires [specific MX records ↗](https://support.google.com/a/answer/174125) added to your DNS provider.

Once you [add these records to Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/):

* [Test the configuration ↗](https://toolbox.googleapps.com/apps/checkmx/check)
* Do not add other `MX` records other than those provided by Google.

### Google Workspace service URLs

If you want to customize the service addresses URLs associated with Google Workspace, refer to [Google's documentation ↗](https://support.google.com/a/answer/53340).

Warning

Google enforces HTTPS on its services. If you find errors about redirect loops when browsing to your site through Cloudflare, use Cloudflare's [Full encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/).

### Google site verification

To add a site verification record in Cloudflare, follow [Google's documentation ↗](https://support.google.com/a/answer/7173990).

---

## Amazon

### Amazon Route53

AWS customers must [update their domain's nameservers ↗](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-name-servers-glue-records.html) to point to their new Cloudflare nameservers.

### Amazon S3 bucket

Find the [URL ↗](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html) for your bucket.

Then, [create a CNAME record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) in Cloudflare. For example, if the full host URL of the bucket is `files.example.com.s3.amazonaws.com`, you would add a `CNAME` record similar to the following:

```

files  CNAME  files.example.com.s3.amazonaws.com


```

Warning

AWS states in their [documentation ↗](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html#VirtualHostingCustomURLs) that the CNAME and the bucket name must be the same. To avoid potential compromise if you set it up differently, use a [host header origin rule](https://developers.cloudflare.com/rules/origin-rules/features/#host-header) to explicitly route all requests to the correct bucket.

### Amazon Simple Email Service (SES)

For help setting up DKIM in SES, refer to the [Amazon documentation ↗](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html).

### Amazon ELB configuration

Refer to [Amazon's ELB help content ↗](http://docs.amazonwebservices.com/ElasticLoadBalancing/latest/DeveloperGuide/using-domain-names-with-elb.html) for guidance on ELB configuration at Amazon, but generally you should:

Add a [CNAME record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) to Cloudflare for the hostname you receive from AWS, for example:

| Type  | Name | Target                                       | Proxy status |
| ----- | ---- | -------------------------------------------- | ------------ |
| CNAME | elb  | <AWS\_HOSTNAME>.<REGION>.\_elb.amazonaws.com | Proxied      |

### Amazon Amplify

To use Cloudflare DNS with AWS Amplify, refer to the [Amplify help content ↗](https://docs.aws.amazon.com/amplify/latest/userguide/to-add-a-custom-domain-managed-by-a-third-party-dns-provider.html) and follow the instructions for **manual configuration**.

At Cloudflare, you will need at least two `CNAME` records:

* A DNS-only `CNAME` to validate your domain ownership, which should look like the following:

| Type  | Name             | Target                                         | Proxy status |
| ----- | ---------------- | ---------------------------------------------- | ------------ |
| CNAME | <UNIQUE\_STRING> | <UNIQUE\_STRING>.mhbtsbpdnt.acm-validation.aws | DNS only     |

CNAME flattening

If your Cloudflare zone is on a paid plan, also make sure that the **Flatten** option turned off for the validation `CNAME` record, and that you zone is **not** using [CNAME flattening for all CNAME records](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#for-all-cname-records).

* One `CNAME` for the apex domain (`example.com`) and/or for each of the subdomains (`blog.example.com`) that you want to manage on Cloudflare. For details refer to [Manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/). These records can be proxied.

| Type  | Name | Target                             |
| ----- | ---- | ---------------------------------- |
| CNAME | @    | <AMPLIFY\_HOSTNAME>.cloudfront.net |

| Type  | Name | Target                             |
| ----- | ---- | ---------------------------------- |
| CNAME | blog | <AMPLIFY\_HOSTNAME>.cloudfront.net |

---

## Microsoft

### Microsoft 365

For information about the records to Microsoft 365, refer to [Microsoft's documentation ↗](https://learn.microsoft.com/en-us/microsoft-365/admin/get-help-with-domains/information-for-dns-records).

### Microsoft Azure

Follow Microsoft's instructions on [configuring Azure DNS settings ↗](https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain).

Then, add Azure's required records to [Cloudflare DNS](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

---

## Miscellaneous vendors

### ClickFunnels

You can configure Cloudflare to work with ClickFunnels. The process requires updating your Cloudflare DNS settings.

* [Adding a Cloudflare subdomain ↗](https://help.clickfunnels.com/hc/en-us/articles/360005906774-Adding-A-Cloudflare-Subdomain-)
* [Adding a Cloudflare domain ↗](https://help.clickfunnels.com/hc/en-us/articles/360005906094-Cloudflare-CNAME-Record)

### Discourse

To use Discourse with Cloudflare, refer to [Using Discourse with Cloudflare: Best Practices ↗](https://community.cloudflare.com/t/using-discourse-with-cloudflare-best-practices/602890).

### Forward Email

To use Cloudflare with Forward Email, refer to [Forward Email configuration with Cloudflare ↗](https://forwardemail.net/guides/cloudflare).

### Mailchimp

For help with Mailchimp, refer to [Use a custom domain with Mailchimp ↗](https://mailchimp.com/help/connect-domain/).

Note

When you [add records to Cloudflare DNS](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/), those records should be [DNS-only (unproxied)](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) until Mailchimp verifies your domain. Then, you can switch your DNS records to **Proxied**.

### Ning custom domain

For help with Ning, refer to [Use a custom domain with Ning ↗](https://www.ning.com/help/use-your-own-domain-e-g-example-com-for-your-ning-network/).

Note

When you [add records to Cloudflare DNS](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/), those records should be [DNS-only (unproxied)](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) until Ning verifies your domain. Then, you can switch your DNS records to **Proxied**.

### Rackspace CloudFiles

Configure Rackspace CloudFiles via _CNAME record_. Consult the [Rackspace documentation ↗](https://docs.rackspace.com/support/how-to/using-cnames-with-cloud-files-containers/).

Refer to Rackspace CloudFiles's documentation to [get a CNAME value ↗](https://docs.rackspace.com/support/how-to/using-cnames-with-cloud-files-containers/), then [add that record within Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

Warning

The `CNAME` record needs to be [DNS-only (unproxied)](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) since rackcdn.com is not compatible with Cloudflare.

### SendGrid

Refer to SendGrid's documentation for how to [make SendGrid compatible with Cloudflare ↗](https://docs.sendgrid.com/ui/sending-email/content-delivery-networks#using-cloudflare).

Note

You may need to refer to Cloudflare's documentation for updated navigation instructions regarding [adding DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) and creating [Configuration rules](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/).

### SmugMug

For help with SmugMug, refer to [Use a custom domain with SmugMug ↗](https://www.smugmughelp.com/en/articles/363-use-a-custom-domain).

Note

When you [add records to Cloudflare DNS](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/), those records should be [DNS-only (unproxied)](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) until SmugMug verifies your domain. Then, you can switch your DNS records to **Proxied**.

### Squarespace

First, make sure you [update your nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/) and your domain is [active](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/).

Then, set up your Squarespace DNS records:

1. Get your Squarespace DNS information by following [these instructions ↗](https://support.squarespace.com/hc/articles/213469948).
2. In Cloudflare, [add those records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/):  
   * All `A` records should be [Proxied](https://developers.cloudflare.com/dns/proxy-status/)  
   * The `CNAME` record for `www` should also be **Proxied**.  
   * The `CNAME` record for `verify.squarespace.com` should be **DNS-only**.
3. If set up properly, your Squarespace DNS Settings page will now indicate that your 'Settings contain problems.' **This is the expected behavior**.
![Screenshot of error warnings in squarespace](https://developers.cloudflare.com/_astro/hc-import-squarespace_dns_settings-test-2.9_-CHey0_1nttwE.webp) 

#### Pending domain owner verification

The `CNAME` record you added for `verify.squarespace.com` should be **DNS-only**.

If you proxy this record, Squarespace will not be able to verify your domain ownership and show you a `This website is pending domain owner verification` error. To fix the issue, [edit](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) the `CNAME` record and change the **Proxy status** to **DNS-only**.

### Tumblr custom domain

Refer to Tumblr's documentation to [get DNS record values ↗](https://help.tumblr.com/hc/en-us/articles/231256548-Custom-Domains). Then, [add records to Cloudflare DNS](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

Note

When you [add records to Cloudflare DNS](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/), those records should be [DNS-only (unproxied)](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) until Tumblr verifies your domain. Then, you can switch your DNS records to **Proxied**.

### Unbounce

Refer to Unbounce's documentation to [get a CNAME value ↗](https://documentation.unbounce.com/hc/en-us/articles/204011950), then [add that record within Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

Warning

If Cloudflare is activated via one of our hosting partners, your `CNAME` record should be [DNS-only (unproxied)](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records).

### Wix

You can use Cloudflare with [Wix websites ↗](https://www.wix.com/), though your setup needs to be different than with most website builders.

This is because Wix [does not support ↗](https://support.wix.com/en/article/request-cloudflare-support) using Cloudflare nameservers (which is the normal part of a [primary setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or with domains bought through [Cloudflare Registrar](https://developers.cloudflare.com/registrar/)).

#### Using domain pointing

If you want to manage your DNS through Cloudflare or you bought a domain through [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), you can connect that domain to Wix through [domain pointing ↗](https://support.wix.com/en/article/connecting-a-domain-to-wix-using-the-pointing-method).

This method means your website is using Cloudflare for DNS only, so all your DNS records should be [DNS-only (unproxied)](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records).

### WPEngine

For help configuring WPEngine sites, refer to:

* [Configuring DNS with WPEngine ↗](https://wpengine.com/support/wordpress-best-practice-configuring-dns-for-wp-engine/)
* [Cloudflare best practices ↗](https://wpengine.com/support/cloudflare-best-practices/)

### Zoho

To use Cloudflare with Zoho, refer to [Zoho configuration with Cloudflare ↗](https://www.zoho.com/mail/help/adminconsole/cloudflare.html).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/reference/vendor-specific-records/#page","headline":"Vendor-specific DNS records · Cloudflare DNS docs","description":"DNS records for common third-party services.","url":"https://developers.cloudflare.com/dns/manage-dns-records/reference/vendor-specific-records/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/reference/vendor-specific-records/","name":"Vendor-specific DNS records"}}]}
```
