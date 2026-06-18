---
title: Use TLS inspection
description: Enable and configure TLS decryption.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use TLS inspection

TLS inspection (also known as TLS decryption or HTTPS inspection) allows Cloudflare Gateway to perform deeper traffic analysis and take actions like scanning request bodies for sensitive data, upgrading to a remote browser isolation session, and redirecting based on the complete URL and path of requests.

TLS inspection is desirable for security policy involving users accessing sensitive systems, but it can also present challenges. Without TLS inspection turned on, policies can still use user identity, device posture, IP address, resolved domain, SNI, and a number of other attributes that support a Zero Trust security implementation.

Organizations are often hesitant to adopt TLS inspection practices due to concerns about interoperability with existing systems due to past experiences with legacy systems that conceptually worked in the same way. However, Cloudflare's approach to TLS inspection is capable, performant, modern, and above all, flexible. We understand that it is never possible to inspect absolutely all traffic — something will always break. Our recommendations keep this practical reality in mind.

## Get started

To decide why and how you should turn on TLS inspection, we recommend you start with the following steps:

### 1\. Identify your goals

Cloudflare Zero Trust requires TLS inspection for most advanced security and [data loss prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) features.

Some security organizations choose to avoid TLS inspection due to concerns about user privacy and acceptable use. This is an important and sometimes complicated organization decision, but you can simplify it by establishing goals related to your security practices. Questions to consider:

* Is your organizational use of TLS inspection designed to protect from the "known" (such as sensitive data in corporate-sanctioned SaaS applications) or the "unknown" (such as users downloading or uploading files to brand-new blob storage buckets)?
* Do you intend to primarily block by domain or hostname or by building policies for complete URLs?
* Do you plan to scan the body of requests or files against DLP profiles or scan downloaded files with an antivirus or anti-malware engine?
* Do you intend to use inline [Remote Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) to take advantage of data security capabilities like copy/paste blocking, keyboard blocking, and print blocking?

If the answer to a majority of these questions is no and your organization relies mostly on hostname or DNS-based security controls, then you may not need to inspect most, if not all TLS traffic. Because Cloudflare operates both as a secure web gateway and as a secure DNS resolver for your connected users, you can apply policy control that may increase your security posture without the need to broadly inspect TLS traffic.

### 2\. Turn on TLS inspection

To turn on TLS inspection for your Zero Trust organization:

* [ Dashboard ](#tab-panel-9234)
* [ Terraform (v5) ](#tab-panel-9235)

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

#### Inspect on all ports Beta

By default, Gateway will only inspect HTTP traffic through port `80`. Additionally, if you [turn on TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#turn-on-tls-decryption), Gateway will inspect HTTPS traffic through port `443`.

To detect and inspect HTTP and HTTPS traffic on ports in addition to `80` and `443`, you can turn on [protocol detection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) and configure Gateway to [inspect traffic on all ports](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports).

### 3\. Determine the certificate used for inspection

TLS inspection requires a trusted private root certificate to be able to inspect and filter encrypted traffic. A [Cloudflare root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/automated-deployment/) is a simple and common solution that is usually appropriate for testing or proof-of-concept conditions when deployed to your devices. You can [generate a Cloudflare certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/#generate-a-cloudflare-root-certificate) in Zero Trust.

Alternatively, if you already have a root CA that you use for other inspection or trust applications, we recommend [using your own certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/). A few reasons for this include:

* Assuming the root certificate is already deployed on the relevant fleet of devices, using a single certificate streamlines your IT management.
* If external services like Git workflows or CLI tools rely on an existing certificate store, presenting the same certificate in inspection is far less likely to interrupt their traffic flow, although these are things that you may wish to exempt from inspection.
* If you are using [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) or a [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) IPsec/GRE tunnel to on-ramp traffic to Cloudflare, devices behind those tunnels will not be able to use HTTP policies that require TLS inspection unless they have a certificate that matches your organization's certificate of choice. Your network infrastructure most likely already has your own device certificates deployed, so using your own existing public key infrastructure for inspection will simplify protection.

Once you generate a Cloudflare certificate or upload a custom certificate, you will need to set it as **Available** to deploy it across the Cloudflare network and as **In-Use** to use it for inspection. For more information, refer to [Activate a root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/#activate-a-root-certificate).

### 4\. Build a baseline Do Not Inspect policy

Do you want to inspect all traffic by default, or do you only want to inspect explicit destinations? We recommend that you build a Gateway list of applications and endpoints to exclude from inspection and add the list as an OR operator in addition to our existing Do Not Inspect application group. For example:

| Selector    | Operator | Value               | Logic | Action         |
| ----------- | -------- | ------------------- | ----- | -------------- |
| Application | in       | _Do Not Inspect_    | Or    | Do Not Inspect |
| Host        | in list  | _Trusted Hostnames_ |       |                |

If your organization is newly adopting the security framework that requires TLS inspection, we recommend starting minimally. In fact, it may even be appropriate to choose to only explicitly inspect a predetermined list of hostnames, IPs, or specific user groups or device types and forego inspection for everything else during the initial deployment stage. Cloudflare has a unique and flexible approach to where and when you can deploy inspection, meaning it can be as limited and granular as your organization needs without impacting device routing tables or other memory-sensitive local constructs.

### 5\. Build the necessary pass-through rules

You can build pass-through rules to accommodate any type of device or user group that should not be subject to inspection.

For example, if users are issued a corporate-managed iPhone with limited permissions, set an additional Do Not Inspect policy for all traffic matching the device posture value. That could include the OS type, OS version, or a list of serial numbers (updated via the API with hooks from your MDM tool) for those iPhones:

* [ Dashboard ](#tab-panel-9238)
* [ API ](#tab-panel-9239)

| Selector              | Operator | Value                                   | Logic | Action         |
| --------------------- | -------- | --------------------------------------- | ----- | -------------- |
| Passed Device Posture | in       | _iOS 17 or higher (OS version)_         | And   | Do Not Inspect |
| Passed Device Posture | in       | _iPhone Serial Numbers (Serial number)_ |       |                |

1. Create a list of device serial numbers that you do not want to inspect.  
Create Zero Trust list  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "description": "The serial numbers for administrators",  
    "items": [  
        {  
            "value": "8GE8721RE"  
        }  
    ],  
    "name": "Admin Serial Numbers",  
    "type": "SERIAL"  
  }'  
```
2. Create a Do Not Inspect policy that checks the device against the list of serial numbers.

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Do not inspect corporate devices",

    "traffic": "",

    "identity": "",

    "device_posture": "any(device_posture.checks.passed[*] in {\"<SERIAL_NUMBER_LIST_UUID>\"})",

    "action": "off",

    "precedence": 14002,

    "enabled": true,

    "filters": [

        "http"

    ]

  }'


```

If you filter your network-connected devices with IPsec/GRE tunnels, Cloudflare Mesh, or other devices that do not have a Cloudflare certificate installed, you will need to accommodate by creating pass-through policies. For these devices, you should explicitly exempt TLS inspection for the source network IP range from which that traffic will be originating. For example:

* [ Dashboard ](#tab-panel-9236)
* [ API ](#tab-panel-9237)

| Selector           | Operator | Value          | Action         |
| ------------------ | -------- | -------------- | -------------- |
| Source Internal IP | in       | 203.0.113.0/24 | Do Not Inspect |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Do not inspect corporate devices",

    "traffic": "http.conn.internal_src_ip in {203.0.113.0/24}",

    "identity": "",

    "device_posture": "",

    "action": "off"

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/tls-inspection/#page","headline":"Use TLS inspection · Cloudflare Learning Paths","description":"Enable and configure TLS decryption.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/tls-inspection/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/","name":"Build HTTP security policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/tls-inspection/","name":"Use TLS inspection"}}]}
```
