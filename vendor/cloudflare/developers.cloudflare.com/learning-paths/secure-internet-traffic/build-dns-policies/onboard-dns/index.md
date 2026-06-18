---
title: Onboard DNS for a network
description: Configure DNS filtering for a network.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Onboard DNS for a network

The fastest way to start filtering DNS queries is to change your DNS resolver to use a specific Gateway endpoint. You can make this change at the browser, OS, or router level.

Choose this option if:

* You want to try out DNS filtering without installing software.
* You do not need to filter by user identity.
* You want to apply blanket DNS policies to all devices in a physical location, such as a retail store or office.

## Change DNS resolver in browser

To configure your browser to send traffic to Gateway:

1. Obtain your DNS over HTTPS (DoH) address:  
   1. Go to **Gateway** \> **DNS locations**.  
   2. Select **Add a location**.  
   3. Enter a name for the location.  
   4. Turn on **Set as Default DNS Location**.  
   5. Select **Add location**.  
   6. Copy your **DNS over HTTPS** hostname: `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`
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

DNS filtering is now turned on for this browser.

To configure your router or OS, or to add additional DNS endpoints, refer to [DNS locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/onboard-dns/#page","headline":"Onboard DNS for a network · Cloudflare Learning Paths","description":"Configure DNS filtering for a network.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/onboard-dns/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-dns-policies/","name":"Build DNS security policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-dns-policies/onboard-dns/","name":"Onboard DNS for a network"}}]}
```
