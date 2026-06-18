---
title: Securing data at rest
description: Learn how Cloudflare's API-driven Cloud Access Security Broker (CASB) works and secures data at rest.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Securing data at rest

**Last reviewed:**  about 2 years ago 

## Introduction

Data at rest refers to data that is stored in a fixed location, such as on a local hard drive, on-premises server, or cloud storage. Many businesses today are using SaaS platforms that store a lot of business data in structured forms (like databases) and unstructured forms (files like documents, images, spreadsheets). The security of the actual storage of the data, such as encryption and reliable backups, is usually abstracted from your control. But the SaaS applications allow you to manage user accounts, define what data they have access to, and also provide an ability to share access to data.

While Cloudflare mostly secures data in transit as it travels over our network, we also have the ability to connect to your SaaS applications and use our DLP profiles to examine data at rest that might not be adequately secured and then provide recommendations for you to take action.

## Protecting data with Cloudflare CASB

Cloudflare's API-driven [Cloud Access Security Broker](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) (CASB) works by integrating with SaaS APIs and discovering both unstructured data at rest (documents, spreadsheets, and so on) and also examining general configuration of the application and user accounts to ensure data access controls are correctly configured.

[DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) are used to discover if files stored in your SaaS application contain sensitive data. Matches are then compared with access controls and findings are generated, such as findings to alert you to a spreadsheet that contains credit card information that is accessible by anyone on the Internet.

When Cloudflare CASB is combined with Cloudflare's [Secure Web Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) service, which inspects all the traffic going to and from a SaaS application, customers can achieve comprehensive visibility into both data in transit and data at rest for SaaS applications.

![Figure 1: Overall solution of user access controls to, and the discovery of, sensitive data.](https://developers.cloudflare.com/_astro/securing-data-at-rest-fig1.BdIkDfSv_ZG4jIx.svg "Figure 1: Overall solution of user access controls to, and the discovery of, sensitive data.")

Figure 1: Overall solution of user access controls to, and the discovery of, sensitive data.

## Securing user access to data at rest

1. Cloudflare authenticates users attempting to access SaaS applications, whether they are initiating the request from managed or unmanaged endpoints.  
   1. For managed endpoints, we recommend deploying our [device agent](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) to maximize visibility and control of all traffic between the end user’s device and the resources being requested.  
   2. For unmanaged endpoints, we have [client-less solutions](https://developers.cloudflare.com/reference-architecture/diagrams/sase/sase-clientless-access-private-dns/) which all you to still have visibility over and inspection into the data accessed by users.
2. Cloudflare's [Zero Trust Network Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) (ZTNA) service can integrate directly with your [SaaS applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/) using standard protocols (e.g. SAML or OIDC) to become the initial enforcement point for user access. Access calls your [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) (IdP) of choice and uses additional security signals about your users and devices to make policy decisions.
3. As an extension of what was covered in Securing data in use, Cloudflare [Remote Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) (RBI) can also be used with [dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/), so that even remote clientless user’s traffic can arrive at the requested SaaS application from predictable and consistent IP addresses.

## Discovering and protecting the data at rest

1. In addition to what we covered in Securing data in transit, Cloudflare Data Loss Prevention (DLP) can be used to discover files that reside in your SaaS applications that contain sensitive data. CASB will scan every shared and/or publicly accessible file in the SaaS app for sensitive text that matches the DLP profile and alert you with recommended actions to take.
2. To complement the dedicated egress IP option mentioned above, SaaS providers enable the ability to restrict access to your organization's resources by only permitting access when traffic is sourced from specific IP addresses.
3. When you integrate a third-party SaaS application with Cloudflare CASB, CASB makes routine, out-of-band API calls that analyze the associated metadata of your configurations, users, files, and other SaaS ‘objects’. Security issues, or ‘Findings’, are then detected based on whether the metadata indicates any insecure or potentially hazardous configurations exist within the integrated SaaS applications. This can include application misconfigurations, exposed and/or sensitive data, and users accounts with poor security.

## Related resources

* [Securing data in transit](https://developers.cloudflare.com/reference-architecture/diagrams/security/securing-data-in-transit/)
* [Securing data in use](https://developers.cloudflare.com/reference-architecture/diagrams/security/securing-data-in-use/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/security/securing-data-at-rest/#page","headline":"Securing data at rest · Cloudflare Reference Architecture docs","description":"Learn how Cloudflare's API-driven Cloud Access Security Broker (CASB) works and secures data at rest.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/security/securing-data-at-rest/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/security/","name":"Security"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/security/securing-data-at-rest/","name":"Securing data at rest"}}]}
```
