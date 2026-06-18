---
title: Per-hostname
description: Set up per-hostname Authenticated Origin Pulls with custom certificates.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Per-hostname

When you enable per-hostname Authenticated Origin Pulls (AOP), all proxied traffic to the specified hostname is authenticated at the origin web server using a certificate that you upload. You can use client certificates from your Private PKI to authenticate connections from Cloudflare.

[Global](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/), [zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/), and per-hostname AOP are independent configurations. Enabling or disabling one does not affect the others. Per-hostname certificates take precedence over zone-level and global certificates for the specified hostname.

## Before you begin

Warning

It is not possible to set up per-hostname authenticated origin pulls with the Cloudflare-provided certificate used by [global AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/). You must upload your own certificate.

Refer to the steps below for an example of how to generate a custom certificate using OpenSSL. The CA root certificate that you use to issue the custom certificate should be the same CA that you will [upload to your origin](#2-configure-origin-to-accept-client-certificates).

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

## 1\. Upload custom certificate

* [ Dashboard ](#tab-panel-10646)
* [ API ](#tab-panel-10647)

1. Go to the **Origin Server** page.  
[ Go to **Origin Server** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. Select the **Authenticated Origin Pulls** tab.
3. In the **Per-hostname** section, select **Upload certificate**.
4. Paste the certificate and private key, then select **Continue**.  
Note  
You must upload a [leaf certificate](https://developers.cloudflare.com/ssl/concepts/#chain-of-trust). If you upload a root CA instead, the upload will fail.
5. Review your certificate details, save the certificate ID for future reference, and select **Continue**.
6. On the **Associate Hostnames** page, enter the fully qualified domain name that should use this certificate and select **Add** for each one. You can also skip this step and associate hostnames later.
7. Select **Save** to confirm.

Use the [Upload a Hostname Client Certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostname%5Fcertificates/methods/create/) endpoint to upload your custom certificate.

Note

You must upload a [leaf certificate](https://developers.cloudflare.com/ssl/concepts/#chain-of-trust). If you upload a root CA instead, the API will return a `missing leaf certificate` error.

Terminal window

```

MYCERT="$(cat cert.crt|perl -pe 's/\r?\n/\\n/'|sed -e 's/..$//')"

MYKEY="$(cat cert.key|perl -pe 's/\r?\n/\\n/'|sed -e's/..$//')"


request_body=$(< <(cat <<EOF

{

"certificate": "$MYCERT",

"private_key": "$MYKEY",

"bundle_method":"ubiquitous"

}

EOF

))


# Push the certificate


curl --silent \

"https://api.cloudflare.com/client/v4/zones/$ZONEID/origin_tls_client_auth/hostnames/certificates" \

--header "Content-Type: application/json" \

--header "X-Auth-Email: $MYAUTHEMAIL" \

--header "X-Auth-Key: $MYAUTHKEY" \

--data "$request_body"


```

In the API response, save the certificate `id` since it will be required in step 3.

## 2\. Configure origin to accept client certificates

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

## 3\. Enable Authenticated Origin Pulls for the hostname

* [ Dashboard ](#tab-panel-10644)
* [ API ](#tab-panel-10645)

Note

For per-hostname AOP, the enablement happens as you associate a hostname. If you had already associated hostnames as you uploaded the certificate, you can skip this step.

1. Go to the **Origin Server** page.  
[ Go to **Origin Server** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. Select the **Authenticated Origin Pulls** tab.
3. In the **Per-hostname** section, find the certificate that should be used and associate the hostname with it.

If you had set up logging on your origin during step 2, test and confirm that Authenticated Origin Pulls is working.

Use the [Enable or Disable a Hostname for Client Authentication](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostnames/methods/update/) endpoint to enable Authenticated Origin Pulls for specific hostnames.

If you had set up logging on your origin during step 2, test and confirm that Authenticated Origin Pulls is working.

## 4\. Enforce validation check on your origin

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

## 5\. (Optional) Set up expiration alerts

You can configure alerts to receive notifications before your AOP certificates expire.

Hostname-level Authenticated Origin Pulls Certificate Expiration Alert

**Who is it for?**

Customers that upload their own certificate to use with hostname-level Authenticated Origin Pull (AOP) to secure connections from Cloudflare to their origin server. AOP certificate expiration notifications are sent 30 days and 14 days before the certificate expiry.

**Other options / filters**

None.

**Included with**

Authenticated Origin Pull.

**What should you do if you receive one?**

Upload a renewed certificate to use for [hostname-level AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/).

Refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on how to set up an alert.

## Further options

Refer to [Manage certificates](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/manage-certificates/) for further options.

To learn how to remove the configuration, refer to [Rollback](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/rollback/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/#page","headline":"Per-hostname authenticated origin pulls · Cloudflare SSL/TLS docs","description":"Set up per-hostname Authenticated Origin Pulls with custom certificates.","url":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/","name":"Authenticated Origin Pulls (mTLS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/","name":"Per-hostname"}}]}
```
