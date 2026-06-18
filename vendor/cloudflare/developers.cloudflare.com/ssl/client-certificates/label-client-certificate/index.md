---
title: Label client certificates
description: Organize client certificates with labels for easier management.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Label client certificates

After [creating client certificates](https://developers.cloudflare.com/ssl/client-certificates/) at Cloudflare, it may be hard to differentiate the generated certificates.

## Root Cause

The option to generate private key and CSR with Cloudflare is meant for simpler cases and the certificates will be generated with just "CN=Cloudflare, C=US".

## Solution

If you need to differentiate client certificates for your clients on a per-organization basis, you can generate your own private key and CSR. When you generate the private key and CSR, you can then enter information that will be incorporated into your certificate request.

For example, if you run the following command (with OpenSSL installed):

Terminal window

```

openssl req -new -newkey rsa:2048 -nodes -keyout client1.key -out client1.csr


```

You can then specify:

```

Country Name (2 letter code) []:

State or Province Name (full name) []:

Locality Name (eg, city) []:

Organization Name (eg, company) []:

Organizational Unit Name (eg, section) []:

Common Name (eg, fully qualified host name) []:

Email Address []:


```

Usually, adding `Country Name` and `Organization Name` is enough, but you can provide as much information as you need or want.

The additional information will be included in the **Certificate Subject**, allowing you to easily identify which certificate belongs to which client. This can also make it easier to revoke a specific certificate when needed.

The following image displays an example of how a certificate with with `Country Name`, `Organization Name`, and `Organizational Unit Name` will look like on the Cloudflare dashboard:

![](https://developers.cloudflare.com/_astro/chrome_mQRJVOpkTQ.BiKeZMXO_sl7oA.webp) 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/client-certificates/label-client-certificate/#page","headline":"Label client certificates · Cloudflare SSL/TLS docs","description":"Organize client certificates with labels for easier management.","url":"https://developers.cloudflare.com/ssl/client-certificates/label-client-certificate/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/client-certificates/","name":"Client certificates (mTLS)"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/client-certificates/label-client-certificate/","name":"Label client certificates"}}]}
```
