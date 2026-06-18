---
title: Determine when to use PAC files
description: Evaluate PAC files for proxy configuration.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Determine when to use PAC files

Note

Only available on Enterprise plans.

Learn how and when to use PAC files instead of (or complementary to) endpoint agents.

## What are PAC files?

A PAC file, or proxy auto-configuration file, is like a tiny map that guides your web browser to websites. Instead of going straight to a website, a PAC file can forward your traffic through a proxy server first, protecting your device and filtering unwanted URL access. Cloudflare users use PAC files to filter Internet traffic when they do not want to install agents on devices or where agent installations are not supported.

Here is a quick overview of PAC files:

* **What they do**: PAC files contain JavaScript code that decides whether or not your browser should use a proxy. The code determines this for each website you visit.
* **How they work**: PAC files tell your browser to run a `FindProxyForURL()` function with the website address. This function analyzes the address and decides whether to send it directly to the browser or through a specified proxy server.
* **Why use them**: PAC files are handy for organizations or networks that want to control access to the Internet. PAC files can allow access to some websites directly while routing others through the proxy for filtering or security.
* **Benefits**: Managing a single PAC file saves time and effort compared to manually configuring proxy settings for each device. It also allows for flexible rules based on websites, time and date, and other factors.

Think of PAC files like a GPS: you are driving to a friend's house, but there is construction on the main road. Your GPS (the PAC file) suggests a detour through a side street (the proxy server) to get there faster.

### Use cases

Some use cases for PAC files include:

* **Versions of Windows before Windows 8/Windows Server 2012**: The Cloudflare One Client does not support older versions of Windows, so PAC files provide a clientless solution to route traffic through Cloudflare to add security and filtering benefits.
* **Non-persistent virtual desktop infrastructure (VDI) environments**: PAC files can be especially valuable in non-persistent VDI environments where installing and saving user details for the Cloudflare One Client is challenging. In these instances, PAC files ensure consistent access and security regardless of individual user sessions.
* **Backup in case of agent outage**: In case of an agent outage, PAC files can act as a backup that can be deployed quickly to minimize downtime and security risk.

## Where are PAC files hosted?

PAC files are usually hosted in a centralized location where all of the devices in your organization can reach and download the file. You can configure browsers with a PAC URL to retrieve the PAC file from the address. This typically occurs when your users open the browser. Many admins push PAC files to devices via deployment methods such as Group Policy Objects (GPOs).

## Create a PAC file

For detailed instructions on creating a PAC file, refer to [Enable Gateway proxy with PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/).

### Best practices

* Avoid complex logic and nested conditions, as they might slow down processing time.
* Place frequently accessed URLs and conditions at the top for faster processing.
* Test your PAC file logic on multiple devices before deployment with tools such as an [online proxy PAC file tester ↗](https://thorsen.pm/proxyforurl).
* When users download a PAC file from a central location, the download must complete within 30 seconds or most browsers will time out.
* Requests must complete with an HTTP response code `200`.
* Requests must have an uncompressed body smaller than 1 MB (megabyte).
* Do not include standard HTTP caching within your PAC file. Cached contents can make PAC instructions outdated, and thus lead to bad HTTP routing.
* PAC files cannot be fetched through a proxy.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/pac-files/#page","headline":"Determine when to use PAC files · Cloudflare Learning Paths","description":"Evaluate PAC files for proxy configuration.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/pac-files/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/configure-device-agent/","name":"Configure the device agent"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/configure-device-agent/pac-files/","name":"Determine when to use PAC files"}}]}
```
