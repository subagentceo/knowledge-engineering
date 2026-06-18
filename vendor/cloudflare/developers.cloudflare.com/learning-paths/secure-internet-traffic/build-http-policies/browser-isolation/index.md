---
title: Configure Browser Isolation
description: Set up Remote Browser Isolation.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure Browser Isolation

Cloudflare Browser Isolation seamlessly executes active webpage content in a secure isolated browser to protect users from zero-day attacks, malware, and phishing.

Browser Isolation provides unique and transparent protection for your users using methods that surpass the capabilities of a traditional secure web gateway. This section focuses primarily on Browser Isolation for external services, assuming that most traffic from a device or a network is being forwarded to Cloudflare. For other applications of Browser Isolation, refer to the [Deploy clientless access](https://developers.cloudflare.com/learning-paths/clientless-access/concepts/) guide.

As a note, Cloudflare's Browser Isolation technology was built to be used for 100% of your user's daily browsing. These recommendations do not suggest that you should limit or be cautious with your use of Browser Isolation, but instead help identify practical outcomes that balance technology with actualized security benefits.

## Get the most out of Browser Isolation

If your organization is interested in implementing Browser Isolation, there are a few methods that Cloudflare recommends exploring.

### Block copy, paste, and upload/download for shadow IT

As you have begun deploying Cloudflare Zero Trust, you may have started to visualize user traffic patterns using [Shadow IT Discovery](https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/). This feature gives you visibility into detected SaaS applications that your users use. Administrators can categorize applications and services on the basis of proper organizational use. If you do not use Shadow IT Discovery and instead maintain a similar list manually or with other tools, you can port that data into a [Zero Trust list](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/create-list/), update it via the API, and achieve the same outcomes.

You can control potential risk and shape user behavior without applying heavy-handed block policies by applying policies to isolate user traffic to applications that match your defined categories. You can then set additional parameters in the policy, such as the ability to restrict copy/paste and upload/download. Users can still access information in the tools -- if not use the tools to a lesser extent -- while you minimize the risk of data loss.

* [ Dashboard ](#tab-panel-9194)
* [ API ](#tab-panel-9195)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**.
2. In the **HTTP** tab, select **Add a policy**.
3. Name the policy.
4. In **Traffic**, add the following expression:  
| Selector | Operator | Value       | Action  |  
| -------- | -------- | ----------- | ------- |  
| Host     | in list  | _Shadow IT_ | Isolate |
5. In **Configure policy settings**, turn on the following options:  
   * _Disable copy / paste_  
   * _Disable file downloads_  
   * _Disable file uploads_
6. Select **Create policy**.

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "isolate",

    "description": "Block copy, paste, and upload/download for shadow IT",

    "enabled": true,

    "filters": [

        "http"

    ],

    "name": "Block shadow IT interaction",

    "precedence": 0,

    "traffic": "http.request.host in <SHADOW_IT_LIST_UUID>",

    "rule_settings": {

        "block_page_enabled": false,

        "block_reason": "",

        "override_ips": null,

        "override_host": "",

        "l4override": null,

        "biso_admin_controls": {

            "dp": false,

            "dcp": true,

            "dd": true,

            "du": true,

            "dk": false,

            "dcr": false

        }

    }

  }'


```

### Isolate all "gray-listed" traffic

A common method for using Browser Isolation to protect against unknown or zero-day threats can dramatically enhance your security posture: Separate all HTTP traffic into known acceptable, known malicious, and unknown buckets. Once your sort your traffic, isolate everything in the unknown bucket.

You can accomplish this by creating the following policies:

* Explicit allow policies for all of your known applications and trusted websites using either Cloudflare application definitions or a list
* Explicit block policies for all security risks, known malicious traffic, and against-acceptable-use intentional denies
* A policy to isolate all other traffic in this middle

In this context, if some traffic is unknown to your organization, Cloudflare will isolate it by default. Cloudflare will also prevent any malicious code from being executed client side, with additional controls available.

* [ Dashboard ](#tab-panel-9192)
* [ API ](#tab-panel-9193)

* Allow known applications and websites:  
| Selector | Operator | Value           | Action |  
| -------- | -------- | --------------- | ------ |  
| Domain   | in list  | _Known Domains_ | Allow  |
* Block security risks:  
| Selector            | Operator | Value                | Action |  
| ------------------- | -------- | -------------------- | ------ |  
| Security Categories | in       | _All Security Risks_ | Block  |
* Isolate all other traffic:  
| Selector | Operator      | Value | Action  |  
| -------- | ------------- | ----- | ------- |  
| Host     | matches regex | .\*   | Isolate |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "isolate",

    "description": "Allow known applications and websites",

    "enabled": true,

    "filters": [

        "http"

    ],

    "name": "Allow known apps and sites",

    "precedence": 0,

    "traffic": "http.request.domains in <TRUSTED_DOMAINS_LIST_UUID>",

    "rule_settings": {

        "block_page_enabled": false,

        "block_reason": "",

        "override_ips": null,

        "override_host": "",

        "l4override": null

    }

  }'


```

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "isolate",

    "description": "Block all security risks",

    "enabled": true,

    "filters": [

        "http"

    ],

    "name": "Block security risks",

    "precedence": 0,

    "traffic": "any(http.request.uri.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})",

    "rule_settings": {

        "block_page_enabled": false,

        "block_reason": "",

        "override_ips": null,

        "override_host": "",

        "l4override": null

    }

  }'


```

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "isolate",

    "description": "Isolate all other traffic",

    "enabled": true,

    "filters": [

        "http"

    ],

    "name": "Isolate traffic",

    "precedence": 0,

    "traffic": "http.request.host matches \".*\"",

    "rule_settings": {

        "block_page_enabled": false,

        "block_reason": "",

        "override_ips": null,

        "override_host": "",

        "l4override": null

    }

  }'


```

### Vendor-chain using link-based isolation

Many vendors that may exist within your security framework support URL manipulation. You can use URL manipulation as an on-ramp for Browser Isolation to add additional security controls.

For example, vendors like Zscaler and Proofpoint allow you to prepend links to URLs in a static or dynamic format. You can prepend the clientless isolation link generated for your Cloudflare account to derive additional security benefits for potentially risky clicks. This means that if you have traffic not sent through Cloudflare today (such as through another proxy), you can potentially prepend specific filtered requests with a link to automatically send the traffic to a Cloudflare isolated browser session without an endpoint agent installed.

flowchart TB
    %% Accessibility
    accTitle: Browser Isolation architecture
    accDescr: Flowchart describing the order of operations for user traffic for in-line Browser Isolation.

    %% User traffic
    user(["User goes to </br>risky.example.com"])--"Connects to"-->cloud[Third-party SWG cloud]

    %% Third-party SWG
    cloud-->warning[Third-party interstitial block or warning page]
    warning--"Appends Cloudflare subdomain"-->biso

    %% Browser Isolation
    subgraph cf [Cloudflare global network]
    biso[[Cloudflare Clientless Web Isolation]]
    inline(["Isolated browser"])
    biso--"User's browser goes to </br>customer.cloudflareaccess.com/browser/risky.example.com"-->inline
    end

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/browser-isolation/#page","headline":"Configure Browser Isolation · Cloudflare Learning Paths","description":"Set up Remote Browser Isolation.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/browser-isolation/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/","name":"Build HTTP security policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/browser-isolation/","name":"Configure Browser Isolation"}}]}
```
