---
title: Bot Management
description: Configure Bot Management for Enterprise to identify and act on automated traffic.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bot Management

Bot Management for Enterprise is a paid add-on that provides sophisticated bot protection for your domain. Customers can identify automated traffic, take appropriate action, and view detailed analytics within the dashboard.

This Enterprise product provides the most flexibility to customers by:

* Generating a [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) of 1-99 for every request. Scores below 30 are commonly associated with bot traffic. This lets you write targeted rules instead of applying blanket actions to all detected bots.
* Allowing customers to take action on this score with [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [Workers](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties). For example, you can challenge low-scoring requests on your login page while allowing them on your public blog.
* Allowing customers to view this score in Bot Analytics or Logs, so you can analyze bot traffic patterns and tune your rules over time.

---

## Enable Bot Management for Enterprise

Bot Management is automatically enabled for Enterprise zones entitled with the add-on.

* [  New dashboard ](#tab-panel-6842)
* [ Old dashboard ](#tab-panel-6843)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Bot management**.
4. Turn **Bot management** on.
5. Choose how your domain should respond to various types of traffic by selecting the associated edit icon.  
   * For more details on verified bots, refer to [Verified Bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).  
   * For more details on supported file types, refer to [Static resource protection](https://developers.cloudflare.com/bots/additional-configurations/static-resources/).  
   * For more details on invisible code injection, refer to [JavaScript detections](https://developers.cloudflare.com/bots/additional-configurations/javascript-detections/).  
   * For more details on WordPress optimization, refer to [Super Bot Fight Mode for WordPress](https://developers.cloudflare.com/bots/troubleshooting/wordpress-loopback-issue/).

To enable a [Bot Management ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/bots) trial on Enterprise zones without the Bot Management add-on entitled:

1. Log in to your [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. Select **Add Bot Management**.

Note

If you are not seeing Bot Management enabled on your zone or if you still see **Add Bot Management** on the Cloudflare dashboard, contact your account team for the proper entitlements.

---

## Setup

Cloudflare recommends that you deploy the following basic settings and customize them according to the traffic in your zone.

### Enable the latest Machine Learning version

Cloudflare encourages Enterprise customers to enable auto-updates to its Machine Learning models to get the newest bot detection models as they are released.

To enable auto-updates:

* [  New dashboard ](#tab-panel-6844)
* [ Old dashboard ](#tab-panel-6845)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Bot Management**.
4. Under **Configurations**, select the edit icon for **Auto-updates to the Machine Learning Model** and turn it on.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. Select **Configure Bot Management**.
4. Enable **Auto-updates to the Machine Learning Model**.

### Block AI Bots

Refer to [Block AI bots](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/).

Note

You can view blocked AI bot traffic via [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/).

### Deploy custom rule templates

The **Definitely Automated** and **Likely Automated** toggles you configured in the previous step already provide baseline protection against automated traffic.

If you need additional control, such as path-specific protection, custom score thresholds, or combining bot score with other fields, Cloudflare provides [rule templates ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules?template=bot%5Ftraffic) to get started.

Note

Custom rules created from these templates execute before the managed rules configured in **Security Settings**. For more details on this execution order, refer to [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/).

These templates use wirefilter expression syntax. In these expressions, `eq` means equals, `le` means less than or equal to, `ge` means greater than or equal to, and `not` excludes matching traffic.

* [Definite Bots template ↗](https://dash.cloudflare.com/?to=/:account/:zone:/security/security-rules/custom-rules/create?template=Definitely%20Bots): Targets malicious bot traffic while ignoring verified bots and routes delivering static content.  
```  
(cf.bot_management.score eq 1 and not cf.bot_management.verified_bot and not cf.bot_management.static_resource)  
```
* [Likely Bots template ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules/custom-rules/create?template=Likely%20Bots): Targets traffic likely to be malicious bots while ignoring verified bots and routes with static content. It may contain a small amount of non-bot traffic.  
```  
(cf.bot_management.score ge 2 and cf.bot_management.score le 29 and not cf.bot_management.verified_bot and not cf.bot_management.static_resource)  
```
* (Optional) [JavaScript detections template ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules/custom-rules/create?template=JavaScript%20Verified%20URLs): You must first enable JavaScript Detections from Security Settings, then set up a [managed challenge](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/#managed-challenge). Make sure to add a method and URI path. JavaScript detections improves security for URLs that should only expect JavaScript-enabled clients.  
```  
(not cf.bot_management.js_detection.passed and http.request.method eq "" and http.request.uri.path in {""})  
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/get-started/bot-management/#page","headline":"Bot Management · Cloudflare bot solutions docs","description":"Configure Bot Management for Enterprise to identify and act on automated traffic.","url":"https://developers.cloudflare.com/bots/get-started/bot-management/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/get-started/","name":"Get started with Cloudflare bot solutions"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/get-started/bot-management/","name":"Bot Management"}}]}
```
