---
title: Enable TLS decryption (optional)
description: Inspect encrypted traffic with TLS decryption.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable TLS decryption (optional)

[TLS decryption ↗](https://www.cloudflare.com/learning/security/what-is-https-inspection/) allows Cloudflare Gateway to inspect HTTPS requests to your private network applications.

## Should I enable TLS decryption?

With TLS decryption turned on, you can apply advanced Gateway policies, such as:

* Filtering based on the complete URL and path of requests
* Scanning for sensitive data with [Cloudflare Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/)
* Starting a remote browser isolation session with [Cloudflare Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/)

These features can increase the security posture of sensitive systems, but TLS decryption can also break your users' access to certain resources. For instance, if your internal applications use self-signed certificates, you will need to either configure a [Do Not Inspect](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) policy or an [Untrusted certificate _Pass through_](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#untrusted-certificates) policy to allow users to connect. To learn more, refer to [TLS decryption limitations](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#inspection-limitations).

With TLS decryption turned off, Gateway can only inspect and apply HTTP policies to unencrypted HTTP requests. However, you can still apply network policies to HTTPS traffic based on user identity, device posture, IP, resolved domain, SNI, and other attributes that support a Zero Trust security implementation. For more information, refer to [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/).

## Enable TLS decryption

* [ Dashboard ](#tab-panel-9118)
* [ Terraform (v5) ](#tab-panel-9119)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. In **Proxy and inspection**, turn on **Inspect HTTPS requests with TLS decryption**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Configure the `tls_decrypt` argument in [cloudflare\_zero\_trust\_gateway\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fgateway%5Fsettings):  
```  
resource "cloudflare_zero_trust_gateway_settings" "team_name" {  
  account_id = var.cloudflare_account_id  
  settings = {  
    tls_decrypt = {  
      enabled = true  
    }  
  }  
}  
```

Next, choose a [user-side certificate](#configure-user-side-certificates) to use for inspection.

## Configure user-side certificates

When you enable TLS decryption, Gateway will decrypt all traffic sent over HTTPS, apply your HTTP policies, and then re-encrypt the request with a certificate on the user device. You can either [install the certificate provided by Cloudflare](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/automated-deployment/) (default option) or [upload a custom root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/) to Cloudflare (Enterprise-only option).

### Best practices

Deploying the Cloudflare root certificate is the simplest way to get started with TLS decryption and is usually appropriate for testing or proof of concept conditions.

If you already have a certificate that you use for other inspection or trust purposes, we recommend uploading your own root certificate for the following reasons:

* Using a single certificate streamlines IT management.
* If other services (such as `git` workflows, other CLI tools, or thick client applications) rely on an existing certificate store, presenting the same certificate in inspection is far less likely to interrupt their traffic flow.
* If you are using Cloudflare Mesh to connect devices to Cloudflare, those devices will not be able to leverage HTTP policies that require decrypting TLS unless they have a certificate that matches either your uploaded certificate or the Cloudflare root certificate. It is more likely that your network infrastructure already has your own device certificates deployed, so using the existing PKI infrastructure for inspection will reduce the number of steps needed to deploy Zero Trust.

MDM deployments

Many customers [deploy the Cloudflare One Client](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-devices/) onto devices in production using an MDM tool like JAMF or Intune. Cloudflare has the ability to deploy a root certificate along with the device, but this could be more consistently and holistically configured within the MDM, where other certificates are presumably managed, trusted, and stored.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/enable-tls-decryption/#page","headline":"Enable TLS decryption (optional) · Cloudflare Learning Paths","description":"Inspect encrypted traffic with TLS decryption.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/enable-tls-decryption/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/configure-device-agent/","name":"Configure the device agent"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/configure-device-agent/enable-tls-decryption/","name":"Enable TLS decryption (optional)"}}]}
```
