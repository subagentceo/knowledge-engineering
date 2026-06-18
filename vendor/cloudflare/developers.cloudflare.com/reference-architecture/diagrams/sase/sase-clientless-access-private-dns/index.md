---
title: Access to private apps without having to deploy client agents
description: Learn how to provide access to private apps without having to deploy client agents.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Access to private apps without having to deploy client agents

**Last reviewed:**  about 2 years ago 

## Introduction

Using Cloudflare to access private resources - such as applications, servers, and networks that are not exposed directly to the internet - usually involves deploying an ([agent](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/)) to devices and then using a server-side agent ([cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/), [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)), to connect the private network or application to Cloudflare. This document describes an alternative approach which removes the need to deploy software to the user's device, making it easier for allowing third party access such as contractors and partners.

Typically, to provide access to internal resources, you use Cloudflare Zero Trust Network Access [ZTNA ↗](https://www.cloudflare.com/learning/access-management/what-is-ztna/) which supports two methods for how the user device accesses a private resource.

* A CNAME in public DNS, that resolves to a hostname representing the Cloudflare tunnel which proxies the request to the internal application.
* An IP address exposed by Cloudflare tunnel, that again, proxies traffic direct to that IP address.

## Accessing private applications

Some organizations don't like the idea of public DNS records which reference internal services, even though the ZTNA services provide strong access security, sometimes just the existence of a service name in public DNS is not desired. Exposing IP addresses directly to users is also a bad idea, they are hard to remember, and IP addresses can change. Unlike accessing a web application via a public DNS record through our proxy, applications exposed via private IP addresses also require the user to install an agent on their device to capture and route the traffic to Cloudflare which in turn routes it to the application. Installing this agent can be a challenge with third parties like partners or contractors.

So how do you allow access to private resources, without creating public DNS records and without requiring the user install software on their device? Cloudflare solved this challenge with [Resolver Policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) where internal DNS services can be used. When combined with agentless [Remote Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/), it is possible to create Zero Trust access to private web applications with only a modern web browser. Policies to control access to apps are then written in our Secure Web Gateway (SWG) service as [network firewall](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) policies. This method supports HTTP based applications, although Cloudflare does provide a browser rendering service for SSH and VNC services.

Follow this [tutorial](https://developers.cloudflare.com/cloudflare-one/tutorials/clientless-access-private-dns/) for information on how to configure secure access to private web-based resources without having to deploy client agents.

![Figure 1: Remote Access Internal Hostname](https://developers.cloudflare.com/_astro/diagram1.CgnmLabJ_1lNR1W.svg "Figure 1: Remote browser connected to private web service using internal hostname")

Figure 1: Remote browser connected to private web service using internal hostname

1. Users start their access by authenticating to the [Cloudflare Browser Isolation ↗](https://your%5Fteam%5Fdomain.cloudflareaccess.com/browser) service. Note this is a browser running on Cloudflare’s edge network, therefore all requests will by default be handled by Cloudflare. The contents are rendered back to the users’ browser via secure encrypted vector streams that use HTTPS and WebRTC channels.
2. Once the user has authenticated to the remote browser, they make a request to an internal hostname which is a record in the internal DNS service. e.g. [https://app.company.internal ↗](https://app.company.internal)
3. Cloudflare looks up the internal hostname using [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/), and gets the private IP address from the internal DNS server. This DNS resolution takes place within the Cloudflare network and requires no DNS client changes on the user's device.
4. Cloudflare evaluates the network firewall policies and verifies if the user has permission to reach the destination addresses.
5. If the request passes the policy, it is sent via secure [QUIC ↗](https://blog.cloudflare.com/getting-cloudflare-tunnels-to-connect-to-the-cloudflare-network-with-quic) tunnels to the Cloudflared connectors which then is reverse proxied to the application servers. All data is transmitted securely through Cloudflare back to the users’ browser via encrypted vector streams.

## Related resources

* [Tutorial: Access a web application via its private hostname without the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/tutorials/clientless-access-private-dns/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/sase/sase-clientless-access-private-dns/#page","headline":"Access to private apps without having to deploy client agents · Cloudflare Reference Architecture docs","description":"Learn how to provide access to private apps without having to deploy client agents.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/sase/sase-clientless-access-private-dns/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-14","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/sase/","name":"Secure Access Service Edge (SASE)"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/sase/sase-clientless-access-private-dns/","name":"Access to private apps without having to deploy client agents"}}]}
```
