---
title: Types of mTLS implementation
description: Implement mutual TLS authentication with Cloudflare.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Types of mTLS implementation

There are different ways to implement mTLS authentication. The most common ones are:

## Option 1: mTLS Device Authentication

This version of mTLS is for device certificates, primarily focused on the number of IoT devices, not user devices.

Here we recommend using [mTLS with Application Security](https://developers.cloudflare.com/learning-paths/mtls/mtls-app-security/).

## Option 2: mTLS User Authentication

When a user wants to establish a secure connection with a server, they present their certificate to the server, which verifies its authenticity. Once the certificate is authenticated, an encrypted connection is established between the user and the server, and all data transmitted between them is encrypted to protect against interception by third parties.

mTLS user authentication is included with Cloudflare Access and depends on the number of users.

## Option 3: mTLS Service Authentication

The hostnames are used to look up the certificates and verify their authenticity. Once the connection is established, all data transmitted between the hosts is encrypted, ensuring that it cannot be intercepted and read by third parties. Here the main driver is the number of hostnames.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/mtls/mtls-implementation/#page","headline":"Types of mTLS implementation · Cloudflare Learning Paths","description":"Implement mutual TLS authentication with Cloudflare.","url":"https://developers.cloudflare.com/learning-paths/mtls/mtls-implementation/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/mtls/mtls-implementation/","name":"Types of mTLS implementation"}}]}
```
