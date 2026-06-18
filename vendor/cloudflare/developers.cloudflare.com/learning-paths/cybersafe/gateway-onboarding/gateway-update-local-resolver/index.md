---
title: Update local DNS resolver
description: Learn about update local dns resolver in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Update local DNS resolver

With a Gateway location created, you have the ability to send traffic to your environment. You can test without risk by changing your DNS resolvers in your browser or network settings.

## Change DNS resolver at the network level

To configure your device to send traffic to Gateway:

macOS

![macOS DNS Resolver Options](https://developers.cloudflare.com/_astro/dns-resolvers-macosx.B1GnFXfW_Z1NldnS.webp)

Windows

![Windows DNS Resolver Options](https://developers.cloudflare.com/_astro/dns-resolvers-windows.3Ns9LR4f_Z1qBa8z.webp)

Linux

Terminal window

```

cat /etc/resolv.conf


```

```

nameserver 172.64.X.X

nameserver 172.64.X.X


```

iPhone

![iPhone DNS Resolver Options](https://developers.cloudflare.com/_astro/dns-resolvers-iphone.BNl5oq1v_Z18cmq9.webp)

Android

![Android DNS Resolver Options](https://developers.cloudflare.com/_astro/dns-resolvers-android.JkoCH2BP_Z1c3rDf.webp)

## Change DNS resolver in the browser

To configure your browser to send traffic to Gateway:

1. Obtain your DNS over HTTPS (DoH) address:  
   1. Go to **Traffic policies** \> **DNS locations**.  
   2. Select the default location.  
   3. Copy your **DNS over HTTPS** hostname: `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`
2. Follow the configuration instructions for your browser:  
Mozilla Firefox  
   1. In Firefox, go to **Settings**.  
   2. In **Privacy & Security**, go to **DNS over HTTPS**.  
   3. Under **Enable secure DNS using**, select _Max Protection_.  
   4. In **Choose provider**, choose _Custom_.  
   5. In the field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.  
Firefox is now configured to use your DoH endpoint. For more information on configuring DoH settings in Firefox, refer to [Mozilla's documentation ↗](https://support.mozilla.org/kb/dns-over-https).  
Note  
If you want to enforce DNS policies through the Cloudflare One Client instead of over DoH, you can disable DoH for your organization by blocking the [Firefox DoH canary domain ↗](https://support.mozilla.org/kb/canary-domain-use-application-dnsnet).  
Google Chrome  
   1. In Chrome, go to **Settings** \> **Privacy and security** \> **Security**.  
   2. Scroll down and turn on **Use secure DNS**.  
   3. Select **With Custom**.  
   4. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.  
Read more about [enabling DNS over HTTPS ↗](https://www.chromium.org/developers/dns-over-https) on Chrome.  
Microsoft Edge  
   1. In Microsoft Edge, go to **Settings**.  
   2. Select **Privacy, Search, and Services**, and scroll down to **Security**.  
   3. Turn on **Use secure DNS**.  
   4. Select **Choose a service provider**.  
   5. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.  
Brave  
   1. In Brave, go to **Settings** \> **Security and Privacy** \> **Security**.  
   2. Turn on **Use secure DNS**.  
   3. Select **With Custom**.  
   4. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.  
Safari  
Currently, Safari does not support DNS over HTTPS.
3. Verify that third-party firewall or TLS decryption software does not inspect or block traffic to the DoH endpoint: `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

## More locations

To configure your router or OS, or to add additional DNS endpoints, refer to [DNS locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/cybersafe/gateway-onboarding/gateway-update-local-resolver/#page","headline":"Update local DNS resolver · Cloudflare Learning Paths","description":"Learn about update local dns resolver in this guide.","url":"https://developers.cloudflare.com/learning-paths/cybersafe/gateway-onboarding/gateway-update-local-resolver/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/","name":"Onboarding Cloudflare Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/gateway-update-local-resolver/","name":"Update local DNS resolver"}}]}
```
