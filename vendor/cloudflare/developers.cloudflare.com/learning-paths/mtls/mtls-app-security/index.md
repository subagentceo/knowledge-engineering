---
title: mTLS with Application Security
description: Implement mutual TLS authentication with Cloudflare.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# mTLS with Application Security

Note

This implementation requires an active [Zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones), a valid [Edge Certificate](https://developers.cloudflare.com/ssl/edge-certificates/), and [proxied](https://developers.cloudflare.com/dns/proxy-status/) hostname.   

API Shield is not required to use mTLS.   

By default, mTLS uses Client Certificates issued by a Cloudflare-managed CA and set at account-level. If you have an Enterprise account, you also have the option to [bring your own CA](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/).

## 1\. Enable mTLS

1. Go to your Cloudflare dashboard and select your account and domain.
2. Go to **SSL/TLS** \> **[Client Certificates](https://developers.cloudflare.com/ssl/client-certificates/)** and, on the **Hosts** section, select **Edit** to add the hostnames you want to [enable mTLS](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/) for.  
Example host: `mtls-test.example.com`
3. Select **Add Certificate**. The Cloudflare-managed CA is the default **Certificate Authority**.
4. Fill in the required fields. You can choose one of the following options:
* Generate a private key (usually referred to as Private Certificate) and Certificate Signing Request (CSR) with Cloudflare (which includes the Public Certificate).
* Use your own private key and CSR which allows you to also [label client certificates](https://developers.cloudflare.com/ssl/client-certificates/label-client-certificate/).

To generate and use your own CSR, you can run a command like the following:

Terminal window

```

openssl req -new -newkey rsa:2048 -nodes -keyout client1.key -out client1.csr -subj '/C=GB/ST=London/L=London/O=Organization/CN=CommonName'


```

Or use a script like this one from [GitHub ↗](https://github.com/erfianugrah/rootcatest/blob/main/fullgenerator.py).

Do not forget to copy the values shown when creating the certificate as they become unavailable after creation.

## 2\. Install the client certificate

In order for a client to utilize the Client Certificate you created, it must be on the devices that you want to use them on. You will want to place them in the same directory as your process / script that targets your APIs / hostnames.

We generally recommended using one Client Certificate per device. Configuring your system to actually use the Public and Private Certificates is especially important.

An example is to [add both certificates to the Keychain ↗](https://support.apple.com/en-gb/guide/keychain-access/kyca2431/mac) on a MacBook laptop.

Another example is to generate a [PKCS12 (P12) certificate ↗](https://en.wikipedia.org/wiki/PKCS%5F12) file and then [add it to your browser ↗](https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/lifecycle-management/7.0.2?topic=dashboards-importing-certificates-configuring-browsers):

Terminal window

```

openssl pkcs12 -export -out certificate.p12 -inkey private-cert.pem -in cert.pem


```

Use the values from the previous step.

Example using cURL command:

Terminal window

```

curl -v --cert cert.pem --key private-cert.pem <HOSTNAME>


```

Use the values from the previous step.

## 3\. Validate the client certificate in the WAF

mTLS is verified and checked in the [Cloudflare WAF phase](https://developers.cloudflare.com/waf/reference/phases/). This is done by creating WAF [Custom Rules](https://developers.cloudflare.com/waf/custom-rules/) using the dynamic fields.

All Client Certificate details can be found in the [cf.tls\_\*](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=mTLS&field-category=SSL/TLS) fields in the [Cloudflare Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/).

Example WAF Custom Rule with action block:

![Example of a WAF custom rule with an action block in the Cloudflare dashboard during the validate client certificate step](https://developers.cloudflare.com/_astro/waf-custom-rule-action-block.BKAq1FqM_14UKW4.webp) 

Note

When using [CNAME records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#cname), enforce mTLS on the specific hostname where it should be checked. It is not enough to have it set on the CNAME target.

## Demo

Note

Ensure you are not using a VPN that could interfere with certificates or TLS decryption. If needed, enable [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) for specific hostnames to bypass the VPN for trusted services, such as the mTLS hostnames.

With the Public and Private Certificates in the same directory, with this cURL command, we will gain access:

Terminal window

```

curl -I --cert cert.pem --key private-cert.pem https://mtls-test.example.com/mtls-test


```

```

HTTP/2 200

server: cloudflare


```

Without the certificates, the terminal will display the following:

Terminal window

```

curl -I https://mtls-test.example.com/mtls-test


```

```

HTTP/2 403

server: cloudflare


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/mtls/mtls-app-security/#page","headline":"mTLS with Application Security · Cloudflare Learning Paths","description":"Implement mutual TLS authentication with Cloudflare.","url":"https://developers.cloudflare.com/learning-paths/mtls/mtls-app-security/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/mtls/mtls-app-security/","name":"mTLS with Application Security"}}]}
```
