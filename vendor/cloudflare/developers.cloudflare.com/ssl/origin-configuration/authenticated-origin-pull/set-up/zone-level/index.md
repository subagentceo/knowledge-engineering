---
title: Zone-level
description: Set up zone-level Authenticated Origin Pulls with a custom certificate.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Zone-level

When you enable zone-level Authenticated Origin Pulls (AOP), all proxied traffic to your zone is authenticated at the origin web server using a certificate that you upload. Unlike [global AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/), which uses a Cloudflare-provided certificate shared across all accounts, zone-level AOP uses your own certificate for stricter security.

[Global](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/), zone-level, and [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) AOP are independent configurations. Enabling or disabling one does not affect the others.

## Before you begin

Make sure your zone is using an [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) of **Full** or higher.

Warning

Zone-level AOP certificates are also applied to [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/) configured on a Cloudflare for SaaS zone. If you need a different AOP certificate for different custom hostnames, use [per-hostname AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/).

Zone-level AOP requires you to upload your own certificate. Refer to the steps below for an example of how to generate a custom certificate using OpenSSL. The CA root certificate that you use to issue the custom certificate should be the same CA that you will [upload to your origin](#3-configure-origin-to-accept-client-certificates).

OpenSSL example

1. Run the following command to generate a 4096-bit RSA private key, using AES-256 encryption. Enter a passphrase when prompted.

Terminal window

```

openssl genrsa -aes256 -out rootca.key 4096


```

1. Create the CA root certificate. When prompted, fill in the information to be included in the certificate. For the `Common Name` field, use the domain name as value, not the hostname.

Terminal window

```

openssl req -x509 -new -nodes -key rootca.key -sha256 -days 1826 -out rootca.crt


```

1. Create a Certificate Signing Request (CSR). When prompted, fill in the information to be included in the request. For the `Common Name` field, use the hostname as value.

Terminal window

```

openssl req -new -nodes -out cert.csr -newkey rsa:4096 -keyout cert.key


```

1. Sign the certificate using the `rootca.key` and `rootca.crt` created in previous steps.

Terminal window

```

openssl x509 -req -in cert.csr -CA rootca.crt -CAkey rootca.key -CAcreateserial -out cert.crt -days 730 -sha256 -extfile ./cert.v3.ext


```

1. Make sure the certificate extensions file `cert.v3.ext` specifies the following:

```

basicConstraints=CA:FALSE


```

## 1\. Upload your certificate to Cloudflare

* [ Dashboard ](#tab-panel-10648)
* [ API ](#tab-panel-10649)

1. Go to the **Origin Server** page.  
[ Go to **Origin Server** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. Select the **Authenticated Origin Pulls** tab.
3. In the **Zone-level** section, select **Upload certificate**.
4. Paste the certificate and private key, then select **Continue**.  
Note  
You must upload a [leaf certificate](https://developers.cloudflare.com/ssl/concepts/#chain-of-trust). If you upload a root CA instead, the upload will fail.
5. Review your certificate details, save the certificate ID for future reference, and select **Done**.

Use the [Upload a zone-level client certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/zone%5Fcertificates/methods/create/) endpoint to upload your certificate.

Note

You must upload a [leaf certificate](https://developers.cloudflare.com/ssl/concepts/#chain-of-trust). If you upload a root CA instead, the API will return a `missing leaf certificate` error.

## 2\. Upload the CA certificate to your origin

Upload the CA root certificate used to sign your client certificate to your origin server. Your origin will use this CA certificate to verify the client certificate presented by Cloudflare.

## 3\. Configure origin to accept client certificates

With the certificate installed, set up your origin web server to accept client certificates.

Check the examples below for Apache and NGINX or refer to your origin web server documentation - for example, [HAProxy ↗](https://www.haproxy.com/documentation/hapee/latest/security/authentication/client-certificate-authentication/), [Traefik ↗](https://doc.traefik.io/traefik/https/tls/#client-authentication-mtls), [Caddy ↗](https://caddyserver.com/docs/json/apps/http/servers/tls%5Fconnection%5Fpolicies/client%5Fauthentication/mode/).

Apache example

```

SSLCACertificateFile /path/to/origin-pull-ca.pem


```

For this example, you would have saved your certificate to `/path/to/origin-pull-ca.pem`.

NGINX example

```

ssl_verify_client optional;

ssl_client_certificate /etc/nginx/certs/cloudflare.crt;


```

For this example, you would have saved your certificate to `/etc/nginx/certs/cloudflare.crt`.

At this point, you may also want to enable logging on your origin so that you can verify the configuration is working.

## 4\. Enable zone-level Authenticated Origin Pulls

* [ Dashboard ](#tab-panel-10650)
* [ API ](#tab-panel-10651)

1. Go to the **Origin Server** page.  
[ Go to **Origin Server** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. Select the **Authenticated Origin Pulls** tab.
3. In the **Zone-level** section, switch the toggle to **On**.

Use the [Set Enablement for Zone](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/settings/methods/update/) endpoint to enable zone-level Authenticated Origin Pulls.

Warning

This endpoint is separate from the [global AOP toggle](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/), which uses the zone settings `tls_client_auth` setting. Make sure you use the correct endpoint for the configuration you intend.

## 5\. Enforce validation check on your origin

Once you can confirm everything is working as expected for your specific origin setup, configure your origin to enforce the authentication.

Apache example

```

SSLVerifyClient require


```

NGINX example

```

ssl_verify_client on;


```

After completing the process, you can use `curl` to send requests directly to your origin IPs, verifying that the requests fail due to certificate validation being enforced.

## 6\. (Optional) Set up expiration alerts

You can configure alerts to receive notifications before your AOP certificates expire.

Zone-level Authenticated Origin Pulls Certificate Expiration Alert

**Who is it for?**

Customers that upload their own certificate to use with zone-level Authenticated Origin Pull (AOP) to secure connections from Cloudflare to their origin server. AOP certificate expiration notifications are sent 30 days and 14 days before the certificate expiry.

**Other options / filters**

None.

**Included with**

Authenticated Origin Pull.

**What should you do if you receive one?**

Upload a renewed certificate to use for [zone-level AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/).

Refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on how to set up an alert.

## Further options

Refer to [Manage certificates](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/manage-certificates/) for further options.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/#page","headline":"Zone-level authenticated origin pulls · Cloudflare SSL/TLS docs","description":"Set up zone-level Authenticated Origin Pulls with a custom certificate.","url":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/","name":"Authenticated Origin Pulls (mTLS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/","name":"Zone-level"}}]}
```
