---
title: Get started
description: Set up the Cloudflare WAF to protect your applications from attacks.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

The Cloudflare Web Application Firewall (Cloudflare WAF) checks incoming web and API requests and filters undesired traffic based on sets of rules called rulesets.

This page will guide you through the recommended initial steps for configuring the WAF to get immediate protection against the most common attacks.

Refer to [Concepts](https://developers.cloudflare.com/waf/concepts/) for more information on WAF concepts, main components, and roles.

Note

This guide focuses on configuring WAF for individual domains, known as zones. The WAF configuration is also available at the account level for Enterprise customers with a paid add-on.

## Before you begin

* Make sure that you have [set up a Cloudflare account](https://developers.cloudflare.com/fundamentals/account/) and [added your domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to Cloudflare.
* Users on the Free plan have access to the Cloudflare Free Managed Ruleset, a subset of the Cloudflare Managed Ruleset. The Free Managed Ruleset is deployed by default on Free plans and is not specifically covered in this guide.  
If you are on a Free plan, you may skip to [5\. Review traffic in security dashboards](#5-review-traffic-in-security-dashboards).

## 1\. Deploy the Cloudflare Managed Ruleset

The [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) protects against Common Vulnerabilities and Exposures (CVEs) and known attack vectors. This ruleset is designed to identify common attacks using signatures, while generating low false positives. Rule changes are published on a weekly basis in the [WAF changelog](https://developers.cloudflare.com/waf/change-log/). Cloudflare may also add rules at any time during emergency releases for high profile zero-day protection.

* [  New dashboard ](#tab-panel-11202)
* [ Old dashboard ](#tab-panel-11203)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Web application exploits**.
3. Turn on **Cloudflare managed ruleset**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** and select the **Managed rules** tab.
3. Under **Managed Rulesets**, select **Deploy** next to the Cloudflare Managed Ruleset.

Default settings and ruleset customization

By default, the Cloudflare Managed Ruleset enables only a subset of rules and it is designed to strike a balance between protection and false positives. You can review and enable additional rules based on your application technology stack.

In particular situations, enabling the managed ruleset can cause some false positives. False positives are legitimate requests inadvertently mitigated by the WAF. For information on addressing false positives, refer to [Troubleshoot managed rules](https://developers.cloudflare.com/waf/managed-rules/troubleshooting/#troubleshoot-false-positives).

If you are testing the WAF against pentesting tools, it is recommended that you enable all rules by using the following ruleset configuration:

* **Ruleset action**: _Block_
* **Ruleset status**: _Enabled_ (enables all rules in the ruleset)

For more information on configuring the Cloudflare Managed Ruleset in the dashboard, refer to [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/#configure-in-the-dashboard).

## 2\. Create custom rule based on WAF attack score

Note

WAF attack score is only available to Business customers (limited access to a single field) and Enterprise customers (full access).

[WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/) is a machine-learning layer that complements Cloudflare's managed rulesets, providing additional protection against [SQL injection ↗](https://www.cloudflare.com/learning/security/threats/sql-injection/) (SQLi), [cross-site scripting ↗](https://www.cloudflare.com/learning/security/threats/cross-site-scripting/) (XSS), and many [remote code execution ↗](https://www.cloudflare.com/learning/security/what-is-remote-code-execution/) (RCE) attacks. It helps identify rule bypasses and potentially new, undiscovered attacks.

If you are an Enterprise customer, do the following:

1. Reach out to your account team to get access to WAF attack score.
2. [Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) using the Attack Score field:  
   * **When incoming requests match**:  
   | Field            | Operator  | Value |  
   | ---------------- | --------- | ----- |  
   | WAF Attack Score | less than | 20    |  
   * **Choose action**: Block

If you are on a Business plan, create a custom rule as mentioned above but use the [WAF Attack Score Class](https://developers.cloudflare.com/waf/detections/attack-score/#available-scores) field instead. For example, you could use the following rule expression: `WAF Attack Score Class equals Attack`.

## 3\. Configure bot protection

Note

Bot score is only available to Enterprise customers with [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/). Customers on Pro and Business plans should turn on [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) instead, which provides built-in bot protection without creating custom rules.

Enterprise customers with Bot Management should first configure bot protection using **Security Settings**, which provide baseline protection without creating custom rules:

1. In the Cloudflare dashboard, go to the **Security Settings** page and filter by **Bot traffic**.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Configure the **Definitely automated**, **Likely automated**, and **Verified bots** settings according to your needs.
3. Turn on **Block AI bots** if you want to block AI crawlers.

These built-in settings auto-update with new bot signatures and do not count toward your custom rule limits. For more details, refer to [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/).

### Create a custom rule for additional control

Optionally, if you need more granular control — for example, a different score threshold or rules that combine bot score with other fields — [create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) using the Bot Score and Verified Bot fields:

* **When incoming requests match**:  
| Field        | Operator  | Value | Logic |  
| ------------ | --------- | ----- | ----- |  
| Bot Score    | less than | 20    | And   |  
| Verified Bot | equals    | Off   |       |
* **Choose action**: Managed Challenge

This rule uses a threshold of 20 (instead of the default threshold of 30 used by the settings), providing stricter protection for traffic in the 20-29 score range.

For a more comprehensive example of baseline protection against malicious bots, refer to [Challenge bad bots](https://developers.cloudflare.com/waf/custom-rules/use-cases/challenge-bad-bots/#general-protection).

For more information about the bot-related fields you can use in expressions, refer to [Bot Management variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/).

Once you have deployed the Cloudflare Managed Ruleset and rules based on attack score and bot score, you will have achieved substantial protection, limiting the chance of false positives.

## 4\. (Optional) Deploy the Cloudflare OWASP Core Ruleset

After configuring the Cloudflare Managed Ruleset and attack score, you can also deploy the [Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/). This managed ruleset is Cloudflare's implementation of the OWASP ModSecurity Core Rule Set. Its attack coverage significantly overlaps with Cloudflare Managed Ruleset by detecting common attack vectors such as SQLi and XSS.

Warning

The Cloudflare OWASP Core Ruleset is prone to false positives and offers only marginal benefits when added on top of Cloudflare Managed Ruleset and WAF attack score. If you decide to deploy this managed ruleset, you will need to monitor and adjust its settings based on your traffic to prevent false positives.

* [  New dashboard ](#tab-panel-11204)
* [ Old dashboard ](#tab-panel-11205)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Web application exploits**.
3. Turn on **OWASP Core**.  
This will deploy the Cloudflare OWASP Core Ruleset with the default configuration: paranoia level = _PL1_ and score threshold = _Medium - 40 and higher_.

1. Go to your domain > **Security** \> **WAF** and select the **Managed rules** tab.
2. Under **Managed Rulesets**, select **Deploy** next to the Cloudflare OWASP Core Ruleset.  
This will deploy the ruleset with the default configuration: paranoia level = _PL1_ and score threshold = _Medium - 40 and higher_.

Ruleset configuration

Unlike the signature-based Cloudflare Managed Ruleset, the Cloudflare OWASP Core Ruleset is score-based. You select a certain paranoia level (levels vary from _PL1_ to _PL4_, where _PL1_ is the lowest level), which enables an increasing larger group of rules. You also select a score threshold, which decides when to perform the configured action. Low paranoia with a high score threshold usually leads to fewer false positives. For an example of how the OWASP Core Ruleset is evaluated, refer to [OWASP evaluation example](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/example/).

Follow one of these strategies to configure the ruleset according to your needs:

* Start from a strict configuration (paranoia level = _PL4_, score threshold = _Low - 60 and higher_). Reduce the score threshold and paranoia level until you achieve a good false positives/true positives rate for your incoming traffic.
* Alternatively, start from a more permissive configuration (paranoia level = _PL1_, score threshold = _High - 25 and higher_) and increase both parameters to adjust your protection, trying to keep a low number of false positives.

For more information on configuring the Cloudflare OWASP Core Ruleset in the dashboard, refer to [Configure in the dashboard](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/#ruleset-level-configuration).

## 5\. Review traffic in security dashboards

After setting up your WAF configuration, review how incoming traffic is being affected by your current settings using the following dashboards:

* Use [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) to explore all traffic, including traffic not affected by WAF mitigation measures. All data provided by [traffic detections](https://developers.cloudflare.com/waf/concepts/#available-traffic-detections) is available in this dashboard.
* Use [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to get more information about requests that are being mitigated by Cloudflare security products.

Enterprise customers can also obtain data about HTTP requests and security events using [Cloudflare Logs](https://developers.cloudflare.com/logs/).

## 6\. (Optional) Next steps

After configuring the WAF based on the information in the previous sections, you should have a strong base protection against possible threats to your applications.

You can explore the following recommendations to get additional protection for specific use cases.

### Allowlist certain IP addresses

Create a custom rule to [allow traffic from IP addresses in allowlist only](https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist/).

### Block specific countries

Create a custom rule to [block traffic from specific countries](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-traffic-from-specific-countries/).

### Define rate limits

Create a rate limiting rule to [apply rate limiting on a login endpoint](https://developers.cloudflare.com/waf/rate-limiting-rules/use-cases/#example-1).

### Prevent credential stuffing attacks

Use [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) to prevent [credential stuffing](https://www.cloudflare.com/learning/bots/what-is-credential-stuffing/) attacks on your applications.

### Prevent users from uploading malware into your applications

Note

Available to Enterprise customers with a paid add-on.

[Use WAF content scanning](https://developers.cloudflare.com/waf/detections/malicious-uploads/get-started/) to scan content being uploaded to your application, searching for malicious content.

### Get additional security for your APIs

Note

Available to Enterprise customers.

Cloudflare protects your APIs from new and known application attacks and exploits such as SQL injection attacks. API-specific security products extend those protections to the unique risks in APIs such as API discovery and authentication management.

For more information on Cloudflare's API security features, refer to [Cloudflare API Shield](https://developers.cloudflare.com/api-shield/).

### Protect your origin server

For information on how to prevent attackers from discovering or overloading your origin server, refer to [Protect your origin server](https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/) for a layered approach including proxied DNS, IP allowlisting, and authenticated origin pulls.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/get-started/#page","headline":"Get started · Cloudflare Web Application Firewall (WAF) docs","description":"Set up the Cloudflare WAF to protect your applications from attacks.","url":"https://developers.cloudflare.com/waf/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/get-started/","name":"Get started"}}]}
```
