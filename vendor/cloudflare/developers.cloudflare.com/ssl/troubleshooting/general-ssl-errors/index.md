---
title: General SSL errors
description: Learn how to troubleshoot various SSL/TLS errors with Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# General SSL errors

## Let's Encrypt chain update

### Symptom

Starting September 9, 2024, visitors that try to connect to your website using older devices - for example, Android 7.0 and earlier - have access problems or reach security warnings.

### Resolution

The fastest way to resolve this issue is to change your certificate to use [Google Trust Services](https://developers.cloudflare.com/ssl/reference/certificate-authorities/#google-trust-services) as the certificate authority.

## Outdated browsers

### Symptom

Until Cloudflare provides an SSL certificate for your domain, the following errors may appear in various browsers for HTTPS traffic:

* **Firefox**: `_ssl_error_bad_cert_domain` / `This connection is untrusted`
* **Chrome**: `Your connection is not private`
* **Safari**: `Safari can't verify the identity of the website`
* **Edge / Internet Explorer**: `There is a problem with this website's security certificate`

### Resolution

Even with a Cloudflare SSL certificate provisioned for your domain, older browsers display errors about untrusted SSL certificates because they do not [support the Server Name Indication (SNI) protocol ↗](https://en.wikipedia.org/wiki/Server%5FName%5FIndication#Support) used by Cloudflare Universal SSL certificates.

To solve, [determine if the browser supports SNI ↗](https://caniuse.com/#feat=sni). If not, upgrade your browser.

Note

It is possible for [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to enable non-SNI support for paid plans using any certificate.

---

## Only some of your subdomains return SSL errors

### Symptom

[Cloudflare Universal SSL certificates](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl) only cover the apex domain (`example.com`) and one level of subdomains (`blog.example.com`). If visitors to your domain observe errors accessing a second level of subdomains in their browser (such as `dev.www.example.com`) but not the first level of subdomains, resolve the issue using one of the following methods below.

### Resolution

* Purchase an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager) that covers `dev.www.example.com`.
* Upload a [Custom SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates) that covers `dev.www.example.com`.
* Enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls).
* If you have a valid certificate for the second level subdomains at your origin web server, change the DNS record for `dev.www` to [DNS Only (grey cloud)](https://developers.cloudflare.com/dns/proxy-status/).

---

## Your Cloudflare Universal SSL certificate is not active

### Symptom

All active Cloudflare domains are provided a [Universal SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl). If you observe SSL errors and do not have a certificate of **Type** _Universal_ within the **Edge Certificates** tab of the Cloudflare **SSL/TLS** app for your domain, the Universal SSL certificate has not yet provisioned.

Our SSL vendors verify each SSL certificate request before Cloudflare can issue a certificate for a domain name. This process may take anywhere from 15 minutes to 24 hours. Our SSL certificate vendors sometimes flag a domain name for additional review.

### Resolution

#### No Universal certificate

If your Cloudflare SSL certificate is not issued within 24 hours of Cloudflare domain activation:

* If your origin web server has a valid SSL certificate, [temporarily pause Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/), and
* [Contact Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) and provide a screenshot of the errors.

Temporarily pausing Cloudflare will allow the HTTPS traffic to be served properly from your origin web server while the support team investigates the issue.

#### Full DNS setup

If your domain is on a [full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/), review your DNS records.

Cloudflare SSL/TLS certificates only apply for traffic [proxied through Cloudflare](https://developers.cloudflare.com/dns/proxy-status/). If SSL errors only occur for hostnames not proxied to Cloudflare, proxy those hostnames through Cloudflare.

#### Partial DNS setup

If your domain is on a [CNAME setup (partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), confirm whether you have CAA DNS records enabled at your current hosting provider. If so, ensure you [specify the Certificate Authorities that Cloudflare uses](https://developers.cloudflare.com/ssl/edge-certificates/caa-records/) to provision certificates for your domain.

---

## OCSP response error

### Symptom

Visitors to your site observe an OCSP response error.

### Resolution

This error is either caused by the browser version or an issue requiring attention by one of Cloudflare’s SSL vendors. In order to properly diagnose, [contact Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) with the following information provided by the visitor that observes the browser error:

1. The output from [https://aboutmybrowser.com/ ↗](https://aboutmybrowser.com/) .
2. The output of `https://<YOUR_DOMAIN>/cdn-cgi/trace` from the visitor’s browser.

---

## Incorrect HSTS headers

### Symptom

The HSTS headers (`Strict-Transport-Security` and `X-Content-Type-Options`) in the response do not match the configuration settings defined in your [HSTS settings](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/).

### Resolution

You may have configured [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification) that are overriding the HSTS header values defined in the **SSL/TLS** app.

1. In the Cloudflare dashboard, go to the Rules **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Under **Response Header Transform Rules**, search for a rule setting the value of one of the HSTS headers (`Strict-Transport-Security` or `X-Content-Type-Options`).
3. Delete (or edit) the rule so that the HSTS configuration settings defined in the **SSL/TLS** app are applied.
4. Repeat this procedure for the other HSTS header.

---

## Other errors

### Symptom

You are getting the error `NET::ERR_CERT_COMMON_NAME_INVALID` in your browser.

### Resolution

* Make sure that you are using a browser that supports [SNI (Server Name Indication) ↗](https://www.cloudflare.com/learning/ssl/what-is-sni/). Refer to [Browser compatibility](https://developers.cloudflare.com/ssl/reference/browser-compatibility/) for more details.
* Ensure that the hostname you are accessing is set to [proxied (orange cloud)](https://developers.cloudflare.com/dns/proxy-status/) in the DNS tab of your Cloudflare Dashboard.
* If the hostname you are accessing is a second level subdomain (such as `dev.www.example.com`), you'll need to either:  
   * Purchase an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager) that covers `dev.www.example.com`.  
   * Upload a [Custom SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates) that covers `dev.www.example.com`.  
   * Enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls)

Note

The following [openssl ↗](https://www.openssl.org/) command might help troubleshooting TLS handshake between the client and the Cloudflare network edge:

Terminal window

```

openssl s_client -connect example.com:443 -servername example.com version


```

---

## Kaspersky Antivirus

To avoid SSL errors with the Cloudflare dashboard when using Kaspersky Antivirus, allow `dash.cloudflare.com` in Kaspersky.

---

## Certificate Approval renewal email

### Symptom

When clicking `Approve Certificate` on a Certificate Approval renewal email, you get the following error message:

`An error occurred while attempting to validate your domain. Please try again later or contact support for assistance.`

### Resolution

Check the status of the certificate on the [Cloudflare dashboard ↗](https://dash.cloudflare.com?to=/:account/:zone/ssl-tls). If the status is `Active`, you can disregard this email and the error message.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/troubleshooting/general-ssl-errors/#page","headline":"General SSL errors · Cloudflare SSL/TLS docs","description":"Learn how to troubleshoot various SSL/TLS errors with Cloudflare.","url":"https://developers.cloudflare.com/ssl/troubleshooting/general-ssl-errors/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/troubleshooting/general-ssl-errors/","name":"General SSL errors"}}]}
```
