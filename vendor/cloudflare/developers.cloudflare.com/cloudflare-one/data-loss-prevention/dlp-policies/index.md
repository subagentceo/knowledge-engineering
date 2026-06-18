---
title: Scan HTTP traffic
description: Scan HTTP traffic in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scan HTTP traffic

You can scan HTTP traffic for sensitive data through [Secure Web Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) policies. Setting up DLP is a two-step process: first, configure a **DLP profile** that defines what sensitive data patterns to detect, and then build a **Gateway HTTP policy** that defines what action to take (allow, block, or log) when Gateway finds matching data. Gateway will parse and scan your HTTP traffic for strings matching the keywords or regular expressions (regexes) specified in the DLP profile.

Note

To scan AI prompts and responses without Gateway HTTP filtering, you can also enable DLP directly on an [AI Gateway](https://developers.cloudflare.com/ai-gateway/features/dlp/).

## Prerequisites

* Set up [Gateway HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/). This routes your users' web traffic through Cloudflare Gateway so it can be inspected.  
   * HTTP filtering requires turning on the [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/#turn-on-the-gateway-proxy) for TCP traffic.
* Turn on [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#turn-on-tls-decryption). Because most web traffic is encrypted with HTTPS, Gateway must decrypt it before DLP can scan the request body for sensitive data.

## 1\. Configure a DLP profile

A DLP profile defines the sensitive data patterns you want to detect — for example, social security number formats, credit card numbers, or custom patterns specific to your organization. Refer to [Configure a DLP profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/). We recommend getting started with a predefined profile.

Important

A DLP profile only defines detection patterns. DLP scans will not start until you [create a DLP policy](#2-create-a-dlp-policy).

## 2\. Create a DLP policy

DLP Profiles may be used alongside other Cloudflare One rules in a [Gateway HTTP policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/). To start logging or blocking traffic, create a policy for DLP:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**. Select **HTTP**.
2. Select **Add a policy**.
3. Build an [HTTP policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) using the [DLP Profile](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#dlp-profile) selector. For example, the following policy blocks users from uploading sensitive data to any location other than an approved corporate application. It combines three conditions: the request content matches a DLP profile, the HTTP method is `POST`, and the destination is not an approved application:  
| Selector    | Operator | Value                                                     | Logic | Action |  
| ----------- | -------- | --------------------------------------------------------- | ----- | ------ |  
| DLP Profile | in       | _Social Security, Insurance, Tax, and Identifier Numbers_ | And   | Block  |  
| HTTP Method | in       | _POST_                                                    | And   |        |  
| Application | not in   | _Workday_                                                 |       |        |
4. Select **Create policy**.

DLP scanning is now turned on for HTTP traffic matching this policy.

## 3\. Test DLP policy

You can test your DLP policy on any device connected to your [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/). To perform a basic test:

1. Go to [dlptest.com ↗](http://dlptest.com/http-post/).
2. Enter a text message or upload a file containing the sensitive data.
3. Select **Submit** to send the request.

The request will be allowed or blocked according to your DLP policies. If the data matches a DLP policy, you will see the request in your [DLP logs](#4-view-dlp-logs).

Different sites will send requests in different ways. For example, some sites will split a file upload into multiple requests. Therefore, even if the policy works on `dlptest.com`, it is not guaranteed to work the same way on another site or application.

## 4\. View DLP logs

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Logs** \> **HTTP request logs**.
2. Select **Filter**.
3. Choose an item under one of the following filters:  
   * **DLP Profiles** shows the requests which matched a specific DLP profile.  
   * **Policy** shows the requests which matched a specific DLP policy.

You can expand an individual row to view details about the request. By default, logs show that a match occurred but do not include the actual matched content. To see the data that triggered the DLP policy, [configure logging options](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/).

### Report false positives

If DLP flags a request that does not actually contain sensitive data (a false positive), you can report it to Cloudflare:

1. Select the log you want to report.
2. Select **Report DLP false positive** under **DLP details**.
3. The information to be sent to Cloudflare will appear. To confirm your report, select **Send report**.

Cloudflare will not respond directly to your report, but reporting false positives helps us improve our products. If you require technical assistance, reach out to [support ↗](https://dash.cloudflare.com/?to=/:account/support).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#page","headline":"Scan HTTP traffic · Cloudflare One docs","description":"Scan HTTP traffic in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance","Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/data-loss-prevention/","name":"Data loss prevention"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/data-loss-prevention/dlp-policies/","name":"Scan HTTP traffic"}}]}
```
