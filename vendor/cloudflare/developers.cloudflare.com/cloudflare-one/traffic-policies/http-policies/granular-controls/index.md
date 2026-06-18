---
title: Application Granular Controls
description: How Application Granular Controls works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Application Granular Controls

With Application Granular Controls, you can create [Gateway HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) to control specific user actions within supported SaaS applications. This allows you to give users access to an application while restricting the actions that they can take within the application.

## Prerequisites

To use Application Granular Controls, you must:

* Install a [Cloudflare certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) or a [custom certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/) on your users' devices.
* Turn on [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/).
* Turn on the [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/#turn-on-the-gateway-proxy).
* (Optional) If an application uses HTTP/3, turn on the [Gateway proxy for UDP traffic](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/http3/#enable-http3-inspection).
* (Optional) To turn on [AI prompt logging](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#log-generative-ai-prompt-content), create a [DLP payload encryption public key](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#set-a-dlp-payload-encryption-public-key).

## Create a policy with Application Granular Controls

To create a Gateway HTTP policy with Application Granular Controls:

* [ Dashboard ](#tab-panel-7650)
* [ API ](#tab-panel-7651)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies** \> **HTTP**.
2. Select **Add a policy**.
3. Name the policy.
4. Under **Traffic**, build a logical expression that defines the traffic you want to allow or block. Because granular controls are specific to each application, you must use the _Application_ selector with the _is_ operator.
5. In **Value**, select your desired application.
6. In **Controls**, choose one or more Application Controls or individual Operations. For example, you can create a policy to block file uploads to ChatGPT:  
| Selector    | Operator | Value     | Controls | Action |  
| ----------- | -------- | --------- | -------- | ------ |  
| Application | is       | _ChatGPT_ | _Upload_ | Block  |
7. Select **Create policy**.

Use the [Create a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/create/) endpoint to create a policy. For example, you can create a policy to block file uploads to ChatGPT:

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block ChatGPT uploads",

    "description": "Block file uploads to ChatGPT while allowing other usage",

    "enabled": true,

    "action": "block",

    "filters": [

        "http"

    ],

    "traffic": "any(app.ids[*] == 1199) and any(app_control.controls[*] in {1653})",

    "identity": "",

    "device_posture": ""

  }'


```

For more information, refer to [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/).

## Control definitions

Gateway defines Application Granular Controls at different levels of granularity, including Application Controls and Operations.

### Application Controls

Application Controls are pre-defined controls that represent user intent, such as uploads or downloads. Cloudflare organizes sets of related operations into Application Controls for each supported application. Use Application Controls when a pre-defined grouping matches your intent.

### Operations

Operations are the individual API-level actions that an application uses. Use Operations for more fine-grained control than Application Controls provide — for example, blocking only certain types of downloads or blocking comments where no Application Control exists. Because each SaaS application uses a unique set of operations with its own scope and behaviors, operation-level controls may require analysis for each use case.

Cloudflare provides Operations based on the [available APIs for an application](#application-apis). For more information on how Operations map to [Application Controls](#application-controls), refer to [Compatible applications](#compatible-applications).

#### Operation Groups

Operation Groups are groupings of operations defined by the application vendor. Operation Groups are typically based on a categorization of the different functional areas of the application, such as signature requests, or the entities that the application defines, such as files or folders. These definitions vary by application. Gateway groups operations into these operation groups to match the operations with the corresponding vendor API documentation.

### DLP payloads

You can use Application Granular Controls with [Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) for operations that contain scannable content. This includes operations that contain the content of uploaded or downloaded files or AI prompts. For example, when a user performs a file upload, a sequence of API operations may result, such as setting up the file metadata, uploading the file content, and finalizing the upload. When applying DLP to your Zero Trust traffic, it can be helpful to specifically target an operation that contains file content.

## Application APIs

SaaS applications typically provide multiple APIs to interact with. For each application, Application Granular Controls may support the following API types:

* Web Application API: These APIs are consumed by the web application that users interact with through their browser.
* Platform API: These APIs are exposed to users to allow for programmatic interaction with the SaaS application. These are typically used by automations, scripts, or other applications.

[Application Controls](#application-controls) include Operations of both API types. If both API types are available when creating HTTP policies using [Operations](#operations), you should select the Operations that align to the API being used, or include both for wider coverage.

## Compatible applications

Application Granular Controls supports the following applications:

Artificial Intelligence

* ChatGPT
* Google Gemini
* Perplexity
* Claude

File Sharing

* Box
* Dropbox
* Google Drive
* WeTransfer
* Hightail
* ShareFile
* Smash

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/granular-controls/#page","headline":"Application Granular Controls · Cloudflare One docs","description":"How Application Granular Controls works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/granular-controls/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/http-policies/","name":"HTTP policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/http-policies/granular-controls/","name":"Application Granular Controls"}}]}
```
