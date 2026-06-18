---
title: Troubleshooting
description: Resolve common cipher suite configuration issues.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting

If you encounter issues with edge certificate cipher suites, refer to the following scenarios.

## Compatibility with Minimum TLS Version

When you adjust the setting used for your domain's [Minimum TLS Version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/), your domain only allows HTTPS connections using that TLS protocol version. As explained in [About cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#related-ssltls-settings), although configured independently, cipher suites and TLS versions are closely related.

Minimum TLS Version can cause issues if you are not supporting TLS 1.2 ciphers on your domain. If you experience issues, review your domain's [Minimum TLS Version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) setting and Cloudflare's [supported ciphers list](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/).

### Testing Minimum TLS version with curl

To test supported TLS versions, attempt a request to your website or application while specifying a TLS version.

For example, to test TLS 1.1, use the `curl` command below. Replace `www.example.com` with your Cloudflare domain and hostname.

Terminal window

```

curl https://www.example.com -svo /dev/null --tls-max 1.1


```

If the TLS version you are testing is blocked by Cloudflare, the TLS handshake is not completed and returns an error:

`* error:1400442E:SSL routines:CONNECT_CR_SRVR_HELLO:tlsv1 alert`

Note

Local VPN or a device security client may prevent insecure connections using legacy protocols like TLS 1.0\. Make sure to disable such network or security client before running the test on your device.

## Compatibility with certificate encryption

If you [upload a custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/), make sure the certificate is compatible with the chosen cipher suites for your zone or hostname.

For example, if you upload an RSA certificate, your cipher suite selection cannot only support ECDSA certificates.

## Compatibility with Cloudflare Pages

It is not possible to configure minimum TLS version nor cipher suites for [Cloudflare Pages](https://developers.cloudflare.com/pages/) hostnames.

## API requirements for custom hostname certificate

When using the [Edit Custom Hostname endpoint](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/), make sure to include `type` and `method` within the `ssl` object, as well as the `settings` specifications.

Including the `settings` only will result in the error message `The SSL attribute is invalid. Please refer to the API documentation, check your input and try again`.

## TLS 1.3 settings

You cannot set specific TLS 1.3 ciphers. Instead, you can enable [TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) for your entire zone and Cloudflare will use [all applicable TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/). In combination with this, you can still [disable weak cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) for TLS 1.0-1.2.

## SSL Labs weak ciphers report

If you try to [disable](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) all of the `WEAK` cipher suites according to what is listed on a [Qualys SSL Labs ↗](https://www.ssllabs.com/ssltest/) report, you might notice that the naming conventions are not the same.

This is because SSL Labs follows RFC cipher naming convention while Cloudflare follows OpenSSL cipher naming convention. The cipher suite names list in the [OpenSSL documentation ↗](https://www.openssl.org/docs/man1.0.2/man1/ciphers.html) may help you map the names.

## Warnings related to CVE-2019-1559

Even though applications on Cloudflare are not vulnerable to [CVE-2019-1559](https://developers.cloudflare.com/ssl/reference/cloudflare-and-cve-2019-1559/), some security scanners may flag your application erroneously.

To remove these warnings, refer to [Customize cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) and exclude the following ciphers:

* `ECDHE-ECDSA-AES256-SHA384`
* `ECDHE-ECDSA-AES128-SHA256`
* `ECDHE-RSA-AES256-SHA384`

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/troubleshooting/#page","headline":"Troubleshooting - Cipher suites — Edge certificates · Cloudflare SSL/TLS docs","description":"Resolve common cipher suite configuration issues.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/","name":"Cipher suites"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/troubleshooting/","name":"Troubleshooting"}}]}
```
