---
title: First-time setup
description: First-time setup in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# First-time setup

This guide walks you through setting up the Cloudflare One Client (formerly WARP) for your organization for the first time. After completing these steps, your devices will route traffic through Cloudflare's network, where you can apply security policies.

Choose a setup mode based on your needs:

* [**Traffic and DNS mode** (default)](#traffic-and-dns-mode-default) — Enables the full suite of security features, including HTTP inspection, identity-based policies, and device posture checks.
* [**DNS-only mode**](#dns-only-mode) — Filters only DNS queries. Does not inspect HTTP traffic or enforce device posture checks.

## Traffic and DNS mode (default)

This mode enables the complete suite of [device security features](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/).

### 1\. Create a Cloudflare Zero Trust account.

The [Cloudflare One dashboard ↗](https://dash.cloudflare.com/one/) will be your go-to place to check device connectivity data, as well as create Secure Web Gateway and Zero Trust policies for your organization.

As you complete the [Cloudflare Zero Trust onboarding](https://developers.cloudflare.com/cloudflare-one/setup/), you will be asked to create a team name for your organization. You will need the team name when you deploy the Cloudflare One Client on your devices; it will allow your users to connect to your organization's Cloudflare Zero Trust instance.

### 2\. Set up a login method.

Configure [One-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) or connect a [third-party identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) in Zero Trust. This is the login method your users will utilize when authenticating to add a new device to your Cloudflare Zero Trust setup.

### 3\. Define device enrollment permissions.

Create [device enrollment rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) to define which users in your organization should be able to connect devices to your organization's Cloudflare Zero Trust setup. As you create your rule, you will be asked to select which login method you would like users to authenticate with.

### 4\. Install the Cloudflare root certificate on your devices.

Advanced security features including HTTP traffic inspection require users to install and trust the [Cloudflare root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) on their machine or device. If you are installing certificates manually on all your devices, these steps will need to be performed on each new device that is to be subject to HTTP filtering.

### 5\. Download and deploy the Cloudflare One Client to your devices.

Choose one of the [different ways](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) to deploy the Cloudflare One Client, depending on what works best for your organization.

### 6\. Log in to your organization's Cloudflare Zero Trust instance from your devices.

Once the Cloudflare One Client is installed on the device, [log in to your Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/). If you have already set up an identity provider in Cloudflare Access, the user will be prompted to authenticate using this method. If you have not set up an identity provider, the user can authenticate with a [one-time pin](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) which is enabled by default.

Next, build [Secure Web Gateway policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) to filter DNS, HTTP, and Network traffic on your devices.

## DNS only mode

This mode is best suited for organizations that only want to apply DNS filtering to outbound traffic from their company devices. It does not enable advanced HTTP filtering features such as HTTP policies, identity-based policies, device posture checks, or Browser Isolation.

### 1\. Create a Cloudflare Zero Trust account.

Zero Trust will be your go-to place to check device connectivity data, as well as create Secure Web Gateway and Zero Trust policies for your organization.

As you complete the [Cloudflare Zero Trust onboarding](https://developers.cloudflare.com/cloudflare-one/setup/), you will be asked to create a team name for your organization. You will need the team name when you deploy the Cloudflare One Client on your devices; it will allow your users to connect to your organization's Cloudflare Zero Trust instance.

### 2\. Set up a login method.

Configure [One-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) or connect a [third-party identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) in Zero Trust. This is the login method your users will utilize when authenticating to add a new device to your Cloudflare Zero Trust setup.

### 3\. Define device enrollment permissions.

Create [device enrollment rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) to define which users in your organization should be able to connect devices to your organization's Cloudflare Zero Trust setup. As you create your rule, you will be asked to select which login method you would like users to authenticate with.

### 4\. (Optional) Add a DNS location to Gateway.

By default, the Cloudflare One Client sends DNS queries to Cloudflare using an encrypted protocol called DNS-over-HTTPS (DoH). If you need to apply different DNS policies to different offices or network locations, [add a DNS location](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) to Gateway. Gateway will assign a unique DoH subdomain to each location, which you provide as a parameter when deploying the Cloudflare One Client to your devices.

### 5\. Download and deploy the Cloudflare One Client to your devices.

Choose one of the [different ways](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) to deploy the Cloudflare One Client, depending on what works best for your organization.

Next, create [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) to control how DNS queries from your devices get resolved.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/set-up/#page","headline":"Set up the Cloudflare One Client for your organization · Cloudflare One docs","description":"First-time setup in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/set-up/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/set-up/","name":"First-time setup"}}]}
```
