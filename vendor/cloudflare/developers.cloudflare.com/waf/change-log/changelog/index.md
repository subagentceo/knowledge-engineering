---
title: Changelog
description: You can now match incoming requests against Cloudforce One threat intelligence in your WAF rules. A new detection looks up the client IP address of each request against the threat intelligence database. If the IP was involved in threat activity in the past seven days, Cloudflare populates cf.intel.ip.* fields that you can use in custom rules and rate limiting rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/waf.xml) 

## 2026-06-15

  
**Use Cloudforce One threat intelligence in WAF rules**   

You can now match incoming requests against Cloudforce One threat intelligence in your WAF rules. A new detection looks up the client IP address of each request against the threat intelligence database. If the IP was involved in threat activity in the past seven days, Cloudflare populates `cf.intel.ip.*` fields that you can use in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/).

The detection populates the following fields. Use the [any()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#any) function with the `[*]` wildcard to match array values:

* `cf.intel.ip.datasets` — the dataset that flagged the IP address (`ddos` or `waf`).
* `cf.intel.ip.target_industries` — industries the IP address has targeted.
* `cf.intel.ip.attacker_names` — known threat actors associated with the IP address.
* `cf.intel.ip.attacker_countries` — source countries of the threat activity.
* `cf.intel.ip.target_countries` — countries the IP address has targeted.

For example, the following custom rule expression blocks requests from IP addresses associated with DDoS activity that have targeted France:

```

any(cf.intel.ip.target_countries[*] == "FR") and any(cf.intel.ip.datasets[*] == "ddos")


```

These fields work with the Cloudflare API and Terraform. Matches are logged in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/).

The threat intelligence detection is available to customers with an active [Cloudforce One](https://developers.cloudflare.com/security-center/cloudforce-one/) subscription. For more information, refer to [Threat intelligence](https://developers.cloudflare.com/waf/detections/threat-intelligence/).

## 2026-06-15

  
**WAF Release - 2026-06-15**   

This week's release introduces new managed protection to address a critical SQL injection vulnerability in Ghost CMS (CVE-2026-26980) and a new generic rule designed to identify and block sophisticated SQL Injection (SQLi) bypass attempts leveraging obfuscated boolean logic. These rules protect affected installations from unauthorized data exfiltration at the network edge.

**Key Findings**

* CVE-2026-26980: A blind SQL injection vulnerability in the Ghost CMS Content API (versions 3.24.0 to 6.19.0) allows unauthenticated remote attackers to inject malicious SQL commands via query parameters due to improper input validation.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                           | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...b4c29bc6 | N/A            | Ghost CMS - SQLi - CVE:CVE-2026-26980 | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...b56f403f | N/A            | SQLi - Obfuscated Boolean - URI       | Log             | Disabled   | This is a new detection. |

## 2026-06-09

  
**WAF Release - 2026-06-09**   

This release introduces new detections for a critical SQL injection vulnerability in Drupal installations utilizing PostgreSQL (CVE-2026-9082), alongside targeted protection for an unsafe deserialization flaw in the Mirasvit Cache Warmer extension (CVE-2026-45247). Additionally, this release includes coverage for a prototype pollution vector in Axios (CVE-2026-40175) and a new generic rule designed to identify and block sophisticated SQL Injection (SQLi) bypass attempts leveraging obfuscated boolean logic.

**Key Findings**

* CVE-2026-9082: A database abstraction vulnerability affects Drupal sites configured with a PostgreSQL backend. Remote, unauthenticated attackers can exploit this flaw via crafted inputs to inject malicious SQL commands and access or manipulate backend data.
* CVE-2026-45247: A PHP Object Injection vulnerability exists in the Mirasvit Cache Warmer extension for Magento and Adobe Commerce. This flaw stems from unsafe deserialization of untrusted user input, enabling unauthenticated attackers to execute arbitrary code on the hosting server.
* CVE-2026-40175: A prototype pollution vulnerability affects the Axios HTTP client library. Attackers can exploit this to inject malicious properties into the global JavaScript object prototype, potentially causing application crashes (Denial of Service) or executing unauthorized code depending on the application structure.

**Impact**

Successful exploitation of these vulnerabilities could allow unauthenticated attackers to execute arbitrary code, manipulate database contents, or induce application crashes, leading to severe operational disruption or complete server compromise. These newly deployed signatures intercept these advanced malicious payloads at the edge before they can interact with vulnerable software configurations.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                       | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...387cf935 | N/A            | Axios - Prototype Pollution - CVE:CVE-2026-40175                  | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...417eb9e0 | N/A            | Drupal - PostgreSQL SQLi - CVE:CVE-2026-9082 - Body               | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...fd3857fd | N/A            | Drupal - PostgreSQL SQLi - CVE:CVE-2026-9082 - URI                | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...aee241d2 | N/A            | SQLi - Obfuscated Boolean - Body                                  | N/A             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...d8620070 | N/A            | SQLi - Obfuscated Boolean - Headers                               | N/A             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...e0be4d47 | N/A            | Mirasvit Cache Warmer - PHP Object Injection - CVE:CVE-2026-45247 | N/A             | Block      | This is a new detection. |

## 2026-05-20

  
**WAF Release - 2026-05-20**   

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

**Continuous Rule Improvements**

We are continuously refining our managed rules to provide more resilient protection and deeper insights into attack patterns. To ensure an optimal security posture, we recommend consistently monitoring the Security Events dashboard and adjusting rule actions as these enhancements are deployed.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                          | Previous Action | New Action | Comments                                                                                                          |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------- | --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...9e9c068d | N/A            | Sitecore - Cache Poisoning - CVE:CVE-2025-53693 Beta | N/A             | Block      | This rule is merged into the original rule "Sitecore - Cache Poisoning - CVE:CVE-2025-53693" (ID: ...7c5b669c  ). |

## 2026-05-15

  
**WAF Release - 2026-05-15 - Emergency**   

This emergency release introduces two new rules to detect nginx heap buffer overflow and heap spray exploitation attempts targeting the rewrite module's `is_args` stale-state bug (CVE-2026-42945).

**Key Findings**

CVE-2026-42945: nginx Heap Buffer Overflow via Stale `is_args` in Rewrite Module

Successful exploitation allows remote attackers to trigger a heap buffer overflow in nginx's rewrite module by sending crafted URIs containing escapable characters. A length/copy pass mismatch in `ngx_http_script_copy_capture_code()` causes the copy pass to write escaped data into an undersized buffer, leading to heap corruption. This enables denial of service (worker process crash) and, with heap feng shui techniques, potential remote code execution.

We strongly recommend upgrading to nginx 1.30.1 (or later) immediately to address the underlying vulnerability. If you cannot upgrade immediately, avoid `rewrite` directives with `?` in the replacement string followed by `set` or `if` referencing capture groups.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                          | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...7e52be73 | N/A            | nginx - Remote Code Execution - Buffer Overread - CVE:CVE-2026-42945 | N/A             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...9df0ee6c | N/A            | nginx - Remote Code Execution - Heap Spray - CVE:CVE-2026-42945      | N/A             | Block      | This is a new detection. |

## 2026-05-11

  
**WAF Release - 2026-05-11**   

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

**Continuous Rule Improvements**

We are continuously refining our managed rules to provide more resilient protection and deeper insights into attack patterns. To ensure an optimal security posture, we recommend consistently monitoring the Security Events dashboard and adjusting rule actions as these enhancements are deployed.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                | Previous Action | New Action | Comments                                                                                                                                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...68b3c389 | N/A            | Remote Code Execution - Java Deserialization - Body - Beta | Block           | Disabled   | This is a new detection. This rule is merged into the original rule "Remote Code Execution - Java Deserialization" (ID: ...744305c4  ). |

## 2026-05-07

  
**WAF and framework adapter mitigations for React and Next.js vulnerabilities**   

Multiple security vulnerabilities were disclosed by the React team and Vercel affecting React Server Components and Next.js. These include denial of service, middleware and proxy bypass, server-side request forgery, cross-site scripting, and cache poisoning issues across a range of severity levels.

**We strongly recommend updating your application and its dependencies immediately.** Patched versions are available for React (`react-server-dom-webpack`, `react-server-dom-parcel`, and `react-server-dom-turbopack` `19.0.6`, `19.1.7`, and `19.2.6`) and Next.js (`15.5.16` and `16.2.5`).

#### WAF protections

Cloudflare WAF rules deployed in response to prior React Server Component CVEs ([CVE-2025-55184 ↗](https://github.com/facebook/react/security/advisories/GHSA-2m3v-v2m8-q956) and [CVE-2026-23864 ↗](https://github.com/facebook/react/security/advisories/GHSA-83fc-fqcc-2hmg)) already provide coverage for the newly disclosed denial-of-service vulnerabilities. These rules are enabled by default with a Block action for all customers using the Cloudflare Managed Ruleset, including Free plan customers using the Free Managed Ruleset.

| Ruleset                    | Rule description                                                                                            | Rule ID                          | Default action |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------- |
| Cloudflare Managed Ruleset | React - DoS - [CVE-2025-55184 ↗](https://github.com/facebook/react/security/advisories/GHSA-2m3v-v2m8-q956) | 2694f1610c0b471393b21aef102ec699 | Block          |
| Cloudflare Managed Ruleset | React - DoS - [CVE-2026-23864 ↗](https://github.com/facebook/react/security/advisories/GHSA-83fc-fqcc-2hmg) | aaede80b4d414dc89c443cea61680354 | Block          |

The existing rules detect the underlying attack patterns generically. As a result, they apply to the new [CVE-2026-23870 ↗](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) denial-of-service vulnerability in Server Components and the corresponding Next.js advisory [GHSA-8h8q-6873-q5fj ↗](https://github.com/vercel/next.js/security/advisories/GHSA-8h8q-6873-q5fj).

Cloudflare is investigating whether WAF rules can be safely and effectively deployed for three of the high-severity advisories: [CVE-2026-23870 ↗](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) / [GHSA-8h8q-6873-q5fj ↗](https://github.com/vercel/next.js/security/advisories/GHSA-8h8q-6873-q5fj), [GHSA-267c-6grr-h53f ↗](https://github.com/vercel/next.js/security/advisories/GHSA-267c-6grr-h53f), and [GHSA-mg66-mrh9-m8jx ↗](https://github.com/vercel/next.js/security/advisories/GHSA-mg66-mrh9-m8jx). If it is possible to create a managed WAF rule that mitigates these CVEs and does not potentially break application behavior, Cloudflare will add additional managed WAF rules. These rules will be announced through the [WAF changelog](https://developers.cloudflare.com/waf/change-log/changelog/). Because these vulnerabilities were shared with Cloudflare with minimal advance notice, we are still investigating what WAF mitigations are possible.

Several of the disclosed vulnerabilities are not possible to block in WAF. We strongly recommend updating your applications so they are not purely reliant on WAF mitigations.

Customers on Pro, Business, or Enterprise plans should ensure that [Managed Rules are enabled](https://developers.cloudflare.com/waf/get-started/#1-deploy-the-cloudflare-managed-ruleset).

#### Next.js adapters

**Vinext:** [Vinext ↗](https://github.com/cloudflare/vinext) is a Vite plugin that reimplements the Next.js API surface. Vinext's latest release is not vulnerable to any of the disclosed CVEs. Vinext's architecture differs from stock Next.js in ways that sidestep the affected code paths. For example, it does not implement the PPR resume protocol, does not expose Pages Router data-route endpoints, and strips internal headers such as `x-nextjs-data` at request boundaries. As an extra layer of defense, we added a React `19.2.6` or later requirement when running `vinext init` ([PR #1118 ↗](https://github.com/cloudflare/vinext/pull/1118), [PR #1112 ↗](https://github.com/cloudflare/vinext/pull/1112)) to prevent accidentally running a vulnerable version of React with Vinext.

**OpenNext on Cloudflare:** OpenNext is an adapter that lets you deploy Next.js apps to the Cloudflare Workers platform. OpenNext itself is not directly vulnerable to the React denial-of-service CVE, but users must update the Next.js version in their application. The OpenNext team has updated the adapter to further harden against these vectors and released a new version of the Cloudflare adapter. Test fixtures and examples have been updated to use patched versions ([PR #1255 ↗](https://github.com/opennextjs/opennextjs-cloudflare/pull/1255)).

#### Summary of disclosed vulnerabilities

| Advisory                                                                                                                                                                                           | Severity | Issue                                                           | WAF status                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CVE-2026-23870 ↗](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) / [GHSA-8h8q-6873-q5fj ↗](https://github.com/vercel/next.js/security/advisories/GHSA-8h8q-6873-q5fj) | High     | Denial of service in Server Components                          | **WAF rules in place:** 2694f1610c0b471393b21aef102ec699, aaede80b4d414dc89c443cea61680354Cloudflare is investigating additional managed WAF coverage |
| [GHSA-267c-6grr-h53f ↗](https://github.com/vercel/next.js/security/advisories/GHSA-267c-6grr-h53f)                                                                                                 | High     | Middleware bypass via segment-prefetch routes                   | Cloudflare is investigating if this can be safely and effectively mitigated by a managed WAF rule                                                     |
| [GHSA-mg66-mrh9-m8jx ↗](https://github.com/vercel/next.js/security/advisories/GHSA-mg66-mrh9-m8jx)                                                                                                 | High     | Denial of service via connection exhaustion in Cache Components | Cloudflare is investigating if this can be safely and effectively mitigated by a managed WAF rule                                                     |
| [GHSA-492v-c6pp-mqqv ↗](https://github.com/vercel/next.js/security/advisories/GHSA-492v-c6pp-mqqv)                                                                                                 | High     | Middleware bypass via dynamic route parameter injection         | Not possible to safely enable a managed WAF rule without potentially breaking application behavior                                                    |
| [GHSA-c4j6-fc7j-m34r ↗](https://github.com/vercel/next.js/security/advisories/GHSA-c4j6-fc7j-m34r)                                                                                                 | High     | SSRF via WebSocket upgrades                                     | Not possible to safely enable a managed WAF rule without potentially breaking application behavior                                                    |
| [GHSA-36qx-fr4f-26g5 ↗](https://github.com/vercel/next.js/security/advisories/GHSA-36qx-fr4f-26g5)                                                                                                 | High     | Middleware bypass in Pages Router i18n                          | Custom WAF rule possible; global managed rule could potentially break application behavior                                                            |
| [GHSA-ffhc-5mcf-pf4q ↗](https://github.com/vercel/next.js/security/advisories/GHSA-ffhc-5mcf-pf4q)                                                                                                 | Moderate | XSS via CSP nonces                                              | Custom WAF rule possible; global managed rule could potentially break application behavior                                                            |
| [GHSA-gx5p-jg67-6x7h ↗](https://github.com/vercel/next.js/security/advisories/GHSA-gx5p-jg67-6x7h)                                                                                                 | Moderate | XSS in beforeInteractive scripts                                | Not possible to safely enable a managed WAF rule without potentially breaking application behavior                                                    |
| [GHSA-h64f-5h5j-jqjh ↗](https://github.com/vercel/next.js/security/advisories/GHSA-h64f-5h5j-jqjh)                                                                                                 | Moderate | Denial of service in Image Optimization API                     | Custom WAF rule possible; global managed rule could potentially break application behavior                                                            |
| [GHSA-wfc6-r584-vfw7 ↗](https://github.com/vercel/next.js/security/advisories/GHSA-wfc6-r584-vfw7)                                                                                                 | Moderate | Cache poisoning in RSC responses                                | Custom WAF rule possible; global managed rule could potentially break application behavior                                                            |
| [GHSA-vfv6-92ff-j949 ↗](https://github.com/vercel/next.js/security/advisories/GHSA-vfv6-92ff-j949)                                                                                                 | Low      | Cache poisoning via RSC cache-busting collisions                | Not possible to safely enable a managed WAF rule without potentially breaking application behavior                                                    |
| [GHSA-3g8h-86w9-wvmq ↗](https://github.com/vercel/next.js/security/advisories/GHSA-3g8h-86w9-wvmq)                                                                                                 | Low      | Middleware redirect cache poisoning                             | Custom WAF rule possible; global managed rule could potentially break application behavior                                                            |

## 2026-05-07

  
**WAF Release - 2026-05-07 - Emergency**   

This emergency release introduces a new rule to detect Next.js App Router middleware and proxy bypass attempts via segment-prefetch routes (CVE-2026-44575).

**Key Findings**

CVE-2026-44575: Next.js Middleware / Proxy Bypass in App Router Applications via Segment-Prefetch Routes

Successful exploitation allows unauthenticated attackers to bypass middleware or proxy-based authorization checks in affected Next.js App Router applications. This leads to unauthorized access to protected content, potential exposure of sensitive application data, and compromise of application security boundaries.

We strongly recommend upgrading to Next.js 15.5.16 or 16.2.5 (or later) immediately to address the underlying vulnerability. If you cannot upgrade immediately, enforce authorization in the underlying route or page logic instead of relying solely on middleware.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                             | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ----------------------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...e77e4a53 | N/A            | Next.js - Middleware Bypass via Invalid RSC Header - CVE:CVE-2026-44575 | N/A             | Disabled   | This is a new detection. |

## 2026-05-04

  
**WAF Release - 2026-05-04**   

This week's release focuses on new detections to expand coverage across command injection, SQL injection, PHP object injection, remote code execution, and XSS attack vectors.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

**Continuous Rule Improvements**

We are continuously refining our managed rules to provide more resilient protection and deeper insights into attack patterns. To ensure an optimal security posture, we recommend consistently monitoring the Security Events dashboard and adjusting rule actions as these enhancements are deployed.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                    | Previous Action | New Action | Comments                                                                                                                                                                                                                                                                                       |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------- | --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...f0884a68 | N/A            | XSS, HTML Injection - Object Tag - Body (beta)                 | Log             | Block      | This is a new detection. This rule is merged into the original rule "XSS, HTML Injection - Object Tag" (ID: ...0c14e284  ).                                                                                                                                                                    |
| Cloudflare Managed Ruleset | ...ff012303 | N/A            | XSS, HTML Injection - Object Tag - Headers                     | Log             | Block      | This is a new detection. The rule previously known as "XSS, HTML Injection - Object Tag - Headers (beta)" is now renamed to "XSS, HTML Injection - Object Tag - Headers".                                                                                                                      |
| Cloudflare Managed Ruleset | ...16f921d9 | N/A            | XSS, HTML Injection - Object Tag - URI                         | Log             | Block      | This is a new detection. The rule previously known as "XSS, HTML Injection - Object Tag - URI (beta)" is now renamed to "XSS, HTML Injection - Object Tag - URI".                                                                                                                              |
| Cloudflare Managed Ruleset | ...dc90d21a | N/A            | Command Injection - Generic 9 - Body Vector - Beta             | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "Command Injection - Generic 9 - Body Vector" (ID: ...0677175f  )                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...f8960375 | N/A            | Command Injection - Generic 9 - Header Vector - Beta           | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "Command Injection - Generic 9 - Header Vector" (ID: ...1eb7a999  )                                                                                                                                                        |
| Cloudflare Managed Ruleset | ...ef47a800 | N/A            | Command Injection - Generic 9 - URI Vector - Beta              | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "Command Injection - Generic 9 - URI Vector" (ID: ...97321c6c  )                                                                                                                                                           |
| Cloudflare Managed Ruleset | ...beebf804 | N/A            | Command Injection - Sleep - Body                               | N/A             | Disabled   | This is a new detection. The rule previously known as "Command Injection Sleep" is now renamed to "Command Injection - Sleep - Body".                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...0d257566 | N/A            | Command Injection - Sleep - Headers                            | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                       |
| Cloudflare Managed Ruleset | ...1856fe86 | N/A            | Command Injection - Sleep - URI                                | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                       |
| Cloudflare Managed Ruleset | ...e6e43c37 | N/A            | Fortinet FortiSandbox - Command Injection - CVE:CVE-2026-39808 | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                                                       |
| Cloudflare Managed Ruleset | ...88118795 | N/A            | Remote Code Execution - Common Bash Bypass - Headers           | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                       |
| Cloudflare Managed Ruleset | ...9299d53b | N/A            | Remote Code Execution - Common Bash Bypass - URI               | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                       |
| Cloudflare Managed Ruleset | ...b0bf33f9 | N/A            | Remote Code Execution - Common Bash Bypass - Body - Beta       | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "Remote Code Execution - Common Bash Bypass Body" (ID: ...efb7e5b9  ). The rule previously known as "Remote Code Execution - Common Bash Bypass Beta" is now renamed to "Remote Code Execution - Common Bash Bypass Body". |
| Cloudflare Managed Ruleset | ...33bfe8b9 | N/A            | PHP Object Injection - 2 - Body - Beta                         | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "PHP Object Injection - 2" (ID: ...161aafdc  )                                                                                                                                                                             |
| Cloudflare Managed Ruleset | ...29552387 | N/A            | PHP Object Injection - 2 - Headers                             | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                       |
| Cloudflare Managed Ruleset | ...8104f4c5 | N/A            | PHP Object Injection - 2 - URI                                 | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                       |
| Cloudflare Managed Ruleset | ...6a46201e | N/A            | SQLi - DROP - 2 - Beta                                         | N/A             | Disabled   | This is a new detection. This rule is merged into the original rule "SQLi - DROP - 2" (ID: ...48ac2221  )                                                                                                                                                                                      |
| Cloudflare Managed Ruleset | ...8b7f85ee | N/A            | SQLi - DROP - 2 - Headers                                      | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                       |
| Cloudflare Managed Ruleset | ...1546b5f0 | N/A            | SQLi - DROP - 2 - URI                                          | N/A             | Disabled   | This is a new detection.                                                                                                                                                                                                                                                                       |
| Cloudflare Managed Ruleset | ...1e053dce | N/A            | SmarterMail - Remote Code Execution - CVE:CVE-2026-24423       | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                                                       |
| Cloudflare Managed Ruleset | ...d0023a36 | N/A            | SQLi - SELECT Expression - Body                                | Block           | Disabled   | Action changed                                                                                                                                                                                                                                                                                 |
| Cloudflare Managed Ruleset | ...26cc211f | N/A            | SQLi - String Concatenation - URI                              | Block           | Disabled   | Action changed                                                                                                                                                                                                                                                                                 |

## 2026-04-30

  
**WAF Release - 2026-04-30 - Emergency**   

This emergency release introduces a new rule to block a cPanel & WHM Authentication Bypass related to CVE-2026-41940.

**Key Findings**

* CVE-2026-41940: A critical authentication bypass vulnerability in cPanel & WHM allows unauthenticated remote attackers to bypass authentication mechanisms and gain unauthorized administrative access to the web hosting control panel. This vulnerability affects the session validation logic, enabling attackers to craft malicious requests that circumvent normal authentication checks.

**Impact**

Successful exploitation allows unauthenticated attackers to gain administrative control over affected cPanel & WHM installations. This leads to complete server compromise, potential theft or manipulation of hosted data, and significant service disruption across managed environments.

We strongly recommend applying official vendor patches for cPanel & WHM immediately to address the underlying vulnerability.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                               | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ----------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...eb2b9e2f | N/A            | cPanel - Auth Bypass - CVE:CVE-2026-41940 | N/A             | Block      | This is a new detection. |

## 2026-04-27

  
**WAF Release - 2026-04-27**   

This week's release focuses on new improvements to enhance coverage.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

**Continuous Rule Improvements**

We are continuously refining our managed rules to provide more resilient protection and deeper insights into attack patterns. To ensure an optimal security posture, we recommend consistently monitoring the Security Events dashboard and adjusting rule actions as these enhancements are deployed.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                  | Previous Action | New Action | Comments                                                                                                                                                                                                                                                              |
| -------------------------- | ----------- | -------------- | -------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...80cec1dd | N/A            | PostgreSQL - SQLi - COPY - Beta              | Log             | Block      | This is a new detection. This rule is merged into the original rule "PostgreSQL - SQLi - COPY - Body (ID: ...e7265a4e  ). The rule previously known as "PostgreSQL - SQLi - COPY" is now renamed to "PostgreSQL - SQLi - COPY - Body".                                |
| Cloudflare Managed Ruleset | ...2903de89 | N/A            | PostgreSQL - SQLi - COPY - Headers           | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...1036cfa6 | N/A            | PostgreSQL - SQLi - COPY - URI               | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...55ff389e | N/A            | SQLi - AND/OR MAKE\_SET/ELT - Beta           | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - AND/OR MAKE\_SET/ELT - Body" (ID: ...252d3934  ). The rule previously known as "SQLi - AND/OR MAKE\_SET/ELT" is now renamed to "SQLi - AND/OR MAKE\_SET/ELT - Body".                      |
| Cloudflare Managed Ruleset | ...346487f9 | N/A            | SQLi - AND/OR MAKE\_SET/ELT - Headers        | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...1ac6ceca | N/A            | SQLi - AND/OR MAKE\_SET/ELT - URI            | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...dd471337 | N/A            | SQLi - Common Patterns - Beta                | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Common Patterns - Body" (ID: ...cb5d0b9b  ). The rule previously known as "SQLi - Common Patterns" is now renamed to "SQLi - Common Patterns - Body".                                     |
| Cloudflare Managed Ruleset | ...975c07b7 | N/A            | SQLi - Common Patterns - Headers             | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...05b1b06b | N/A            | SQLi - Common Patterns - URI                 | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...dd0ba3c7 | N/A            | SQLi - Equation - Beta                       | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Equation - Body" (ID: ...c2eb3e7f  ). The rule previously known as "SQLi - Equation" is now renamed to "SQLi - Equation - Body".                                                          |
| Cloudflare Managed Ruleset | ...3d1c2384 | N/A            | SQLi - Equation - Headers                    | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...e1149ea6 | N/A            | SQLi - Equation - URI                        | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...205adbb0 | N/A            | SQLi - AND/OR Digit Operator Digit - Beta    | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - AND/OR Digit Operator Digit - Body" (ID: ...3893c564  ). The rule previously known as "SQLi - AND/OR Digit Operator Digit" is now renamed to "SQLi - AND/OR Digit Operator Digit - Body". |
| Cloudflare Managed Ruleset | ...ad2abbaa | N/A            | SQLi - AND/OR Digit Operator Digit - Headers | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...53acbc0d | N/A            | SQLi - AND/OR Digit Operator Digit - URI     | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...2b45a97d | N/A            | SQLi - Benchmark Function - Beta             | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Benchmark Function - Body" (ID: ...2ebc44ad  ). The rule previously known as "SQLi - Benchmark Function" is now renamed to "SQLi - Benchmark Function - Body".                            |
| Cloudflare Managed Ruleset | ...9889aadc | N/A            | SQLi - Benchmark Function - Headers          | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...491b28e9 | N/A            | SQLi - Benchmark Function - URI              | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...2aa649de | N/A            | SQLi - Comparison - Beta                     | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Comparison - Body" (ID: ...e7907480  ). The rule previously known as "SQLi - Comparison" is now renamed to "SQLi - Comparison - Body".                                                    |
| Cloudflare Managed Ruleset | ...39e3e013 | N/A            | SQLi - Comparison - Headers                  | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...f4bdb492 | N/A            | SQLi - Comparison - URI                      | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...a1ff3b34 | N/A            | SQLi - String Concatenation - Body - Beta    | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - String Concatenation - Headers" (ID: ...2116d2fe  ).The rule previously known as "SQLi - String Concatenation - Headers" is now renamed to "SQLi - String Concatenation - Body".          |
| Cloudflare Managed Ruleset | ...0d0e6c3b | N/A            | SQLi - String Concatenation - Headers        | Log             | Block      | This is a new detection.(Former Id was ...846d1940  )                                                                                                                                                                                                                 |
| Cloudflare Managed Ruleset | ...26cc211f | N/A            | SQLi - String Concatenation - URI            | Log             | Block      | This is a new detection. (Former Id was ...8fae8c84  )                                                                                                                                                                                                                |
| Cloudflare Managed Ruleset | ...eacc78ab | N/A            | SQLi - SELECT Expression - Beta              | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - SELECT Expression - Body" (ID: ...d0023a36  ). The rule previously known as "SQLi - SELECT Expression" is now renamed to "SQLi - SELECT Expression - Body".                               |
| Cloudflare Managed Ruleset | ...630bb223 | N/A            | SQLi - SELECT Expression - Headers           | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...dcd6efb5 | N/A            | SQLi - SELECT Expression - URI               | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...18c47cea | N/A            | SQLi - ORD and ASCII - Beta                  | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - ORD and ASCII- Body" (ID: ...d0d207f9  ). The rule previously known as "SQLi - ORD and ASCII" is now renamed to "SQLi - ORD and ASCII- Body".                                             |
| Cloudflare Managed Ruleset | ...bdb1618f | N/A            | SQLi - ORD and ASCII - URI                   | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...1d0906b6 | N/A            | SQLi - ORD and ASCII - Headers               | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |
| Cloudflare Managed Ruleset | ...9fe4eff5 | N/A            | SQLi - Destructive Operations                | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                              |

## 2026-04-21

  
**WAF Release - 2026-04-21**   

This week's release introduces a new detection for a Remote Code Execution (RCE) vulnerability in Apache ActiveMQ (CVE-2026-34197) and an updated signature for Magento 2 - Unrestricted File Upload. Alongside these detections, we are continuing our work on rule refinements to provide deeper security insights for our customers.

**Key Findings**

* Apache ActiveMQ (CVE-2026-34197): A vulnerability in Apache ActiveMQ allows an unauthenticated, remote attacker to execute arbitrary code. This flaw occurs during the processing of specially crafted network packets, leading to potential full system compromise.
* Magento 2 - Unrestricted File Upload - 2: This is a follow-up enhancement to our existing protections for Magento and Adobe Commerce.

**Impact**

Successful exploitation of these vulnerabilities could allow unauthenticated attackers to execute arbitrary code or gain full administrative control over affected servers. We strongly recommend applying official vendor patches for Apache ActiveMQ and Magento to address the underlying vulnerabilities.

**Continuous Rule Improvements**

We are continuously refining our managed rules to provide more resilient protection and deeper insights into attack patterns. To ensure an optimal security posture, we recommend consistently monitoring the Security Events dashboard and adjusting rule actions as these enhancements are deployed.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                            | Previous Action | New Action | Comments                                                                                                                                                                                                                                                          |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------------------------- | --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...ee159e2e | N/A            | Command Injection - Generic 8 - uri                                    | Log             | Block      | This is a new detection. Previous description was "Command Injection - Generic 8 - uri - Beta"                                                                                                                                                                    |
| Cloudflare Managed Ruleset | ...a15308cf | N/A            | Command Injection - Generic 8 - body - Beta                            | Disabled        | Disabled   | This is a new detection. This rule is merged into the original rule "Command Injection - Generic 8 - body" (ID: ...413592e2  ). The rule previously known as "Command Injection - Generic 8" is now renamed to "Command Injection - Generic 8 - body".            |
| Cloudflare Managed Ruleset | ...958047ed | N/A            | MySQL - SQLi - Executable Comment - Beta                               | Log             | Block      | This is a new detection. This rule is merged into the original rule "MySQL - SQLi - Executable Comment - Body" (ID: ...7bd2d8fa  ) The rule previously known as "MySQL - SQLi - Executable Comment" is now renamed to "MySQL - SQLi - Executable Comment - Body". |
| Cloudflare Managed Ruleset | ...582cc559 | N/A            | MySQL - SQLi - Executable Comment - Headers                            | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...a16639d3 | N/A            | MySQL - SQLi - Executable Comment - URI                                | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...44f24211 | N/A            | Magento 2 - Unrestricted file upload - 2                               | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...bf170a17 | N/A            | Apache ActiveMQ - Remote Code Execution - CVE:CVE-2026-34197           | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...8c2ac1a7 | N/A            | SQLi - Sleep Function - Beta                                           | Log             | Block      | This is a new detection. This rule is merged into the original rule "SQLi - Sleep Function" (ID: ...f77e8d54  )                                                                                                                                                   |
| Cloudflare Managed Ruleset | ...4dacaeb8 | N/A            | SQLi - Sleep Function - Headers                                        | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...ed4c9ece | N/A            | SQLi - Sleep Function - URI                                            | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...1dfa64df | N/A            | SQLi - Probing - uri                                                   | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...4c62e2e7 | N/A            | SQLi - Probing - header                                                | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...aab28ea1 | N/A            | SQLi - Probing - body                                                  | Disabled        | Disabled   | This is a new detection. This rule is merged into the original rule "SQLi - Probing" (ID: ...b4026c88  )                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...20999be0 | N/A            | SQLi - Probing 2                                                       | Disabled        | Disabled   | This rule had duplicate detection logic and has been deprecated.                                                                                                                                                                                                  |
| Cloudflare Managed Ruleset | ...d7aa0008 | N/A            | SQLi - UNION in MSSQL - Body                                           | Disabled        | Disabled   | This rule has been renamed to differentiate from "SQLi - UNION in MSSQL" (ID: ...ee5e35fd  ) and contains updated rule logic.                                                                                                                                     |
| Cloudflare Managed Ruleset | ...a67d8561 | N/A            | SQLi - UNION - 3                                                       | Disabled        | Disabled   | This rule had duplicate detection logic and has been deprecated.                                                                                                                                                                                                  |
| Cloudflare Managed Ruleset | ...0af34bba | N/A            | XSS, HTML Injection - Embed Tag - URI                                  | Disabled        | Disabled   | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...70282f38 | N/A            | XSS, HTML Injection - Embed Tag - Headers                              | Log             | Block      | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...23f4d718 | N/A            | XSS, HTML Injection - IFrame Tag - Src and Srcdoc Attributes - Headers | Log             | Disabled   | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...6978def1 | N/A            | XSS, HTML Injection - Link Tag - Headers                               | Log             | Disabled   | This is a new detection.                                                                                                                                                                                                                                          |
| Cloudflare Managed Ruleset | ...ebd81645 | N/A            | XSS, HTML Injection - Link Tag - URI                                   | Disabled        | Disabled   | This is a new detection.                                                                                                                                                                                                                                          |

## 2026-04-15

  
**WAF Release - 2026-04-15**   

This week's release introduces a new detection for a critical Remote Code Execution (RCE) vulnerability in Mesop (CVE-2026-33057), alongside protections for high-impact vulnerabilities in Cisco Secure Firewall Management Center (CVE-2026-20079) and FortiClient EMS (CVE-2026-21643). Additionally, this release includes an update to our existing React Server DoS coverage to address recently identified resource exhaustion vectors (CVE-2026-23869).

**Key Findings**

* Cisco Secure FMC (CVE-2026-20079): A vulnerability in the web-based management interface of Cisco Secure Firewall Management Center (FMC) that allows an unauthenticated, remote attacker to execute arbitrary commands or bypass security filters.
* FortiClient EMS (CVE-2026-21643): A critical vulnerability in the FortiClient EMS permitting unauthorized access or administrative configuration manipulation via crafted HTTP requests.
* Mesop (CVE-2026-33057): A vulnerability in the Mesop Python-based UI framework where unauthenticated attackers can execute arbitrary code by sending specially crafted, Base64-encoded payloads in the request body.

**Impact**

Successful exploitation of these vulnerabilities could allow unauthenticated attackers to execute arbitrary code, gain administrative control over network management infrastructure, or trigger server-side resource exhaustion. Administrators are strongly encouraged to apply official vendor updates.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                          | Previous Action | New Action | Comments                                                                                                           |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------- | --------------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| Cloudflare Managed Ruleset | ...aef9415b | N/A            | Cisco Secure FMC - RCE via upgradeReadinessCall - CVE:CVE-2026-20079 | Log             | Block      | This is a new detection.                                                                                           |
| Cloudflare Managed Ruleset | ...ee7be621 | N/A            | FortiClient EMS - Pre-Auth SQL Injection - CVE:CVE-2026-21643        | Log             | Block      | This is a new detection.                                                                                           |
| Cloudflare Managed Ruleset | ...c953a72b | N/A            | Mesop - Remote Code Execution - Base64 Payload - CVE:CVE-2026-33057  | Log             | Block      | This is a new detection.                                                                                           |
| Cloudflare Managed Ruleset | ...50c08f6f | N/A            | React Server - DOS - CVE:CVE-2026-23864 - 1 - Beta                   | Log             | Block      | This rule has been merged into the original rule "React Server - DOS - CVE:CVE-2026-23864 - 1" (ID: ...61680354  ) |
| Cloudflare Managed Ruleset | ...ebd81645 | N/A            | XSS, HTML Injection - Link Tag - URI (beta)                          | N/A             | Disabled   | This is a new detection.                                                                                           |
| Cloudflare Managed Ruleset | ...0af34bba | N/A            | XSS, HTML Injection - Embed Tag - URI (beta)                         | N/A             | Disabled   | This is a new detection.                                                                                           |

## 2026-04-14

  
**Email obfuscation decode script is now non-render-blocking**   

The decode script injected by [Email Address Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/) now loads with the `defer` attribute. This means the script no longer blocks page rendering. It downloads in parallel with HTML parsing and executes after the document is fully parsed, before the `DOMContentLoaded` event.

This improves page loading performance, contributing to better Core Web Vitals, for all zones with Email Address Obfuscation on. No action is required.

If you have custom JavaScript that depends on email addresses being decoded at a specific point during page load, note that the decode script now executes after HTML parsing completes rather than inline during parsing.

## 2026-04-07

  
**WAF Release - 2026-04-07**   

This week's release introduces new detections for a critical Remote Code Execution (RCE) vulnerability in MCP Server (CVE-2026-23744), alongside targeted protection for an authentication bypass vulnerability in SolarWinds products (CVE-2025-40552). Additionally, this release includes a new generic detection rule designed to identify and block Cross-Site Scripting (XSS) injection attempts leveraging "OnEvent" handlers within HTTP cookies.

**Key Findings**

* MCP Server (CVE-2026-23744): A vulnerability in the Model Context Protocol (MCP) server implementation where malformed input payloads can trigger a memory corruption state, allowing for arbitrary code execution.
* SolarWinds (CVE-2025-40552): A critical flaw in the authentication module allows unauthenticated attackers to bypass security filters and gain unauthorized access to the management console due to improper identity token validation.
* XSS OnEvents Cookies: This generic rule identifies malicious event handlers (such as onload or onerror) embedded within HTTP cookie values.

**Impact**

Successful exploitation of the MCP Server and SolarWinds vulnerabilities could allow unauthenticated attackers to execute arbitrary code or gain administrative control, leading to a full system takeover. Additionally, the new generic XSS detection prevents attackers from leveraging browser event handlers in cookies to hijack user sessions or execute malicious scripts.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                             | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...0aa410af | N/A            | Generic Rules - Command Execution - 5 - Body            | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...9131ec2f | N/A            | Generic Rules - Command Execution - 5 - Header          | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...551eb9e5 | N/A            | Generic Rules - Command Execution - 5 - URI             | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...d46229eb | N/A            | MCP Server - Remote Code Execution - CVE:CVE-2026-23744 | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...a864b9c2 | N/A            | XSS - OnEvents - Cookies                                | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...a78ad04e | N/A            | SQLi - Evasion - Body                                   | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...40732d48 | N/A            | SQLi - Evasion - Headers                                | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...e68a99b5 | N/A            | SQLi - Evasion - URI                                    | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...3e8143d2 | N/A            | SQLi - LIKE 3 - Body                                    | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...70e7fb97 | N/A            | SQLi - LIKE 3 - URI                                     | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...4c538bd9 | N/A            | SQLi - UNION - 2 - Body                                 | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...61c439c9 | N/A            | SQLi - UNION - 2 - URI                                  | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...cf33ea10 | N/A            | SolarWinds - Auth Bypass - CVE:CVE-2025-40552           | Log             | Block      | This is a new detection. |

## 2026-03-30

  
**WAF Release - 2026-03-30**   

This week's release introduces new detections for a critical authentication bypass vulnerability in Fortinet products (CVE-2025-59718), alongside three new generic detection rules designed to identify and block HTTP Parameter Pollution attempts. Additionally, this release includes targeted protection for a high-impact unrestricted file upload vulnerability in Magento and Adobe Commerce.

**Key Findings**

* CVE-2025-59718: An improper cryptographic signature verification vulnerability in Fortinet FortiOS, FortiProxy, and FortiSwitchManager. This may allow an unauthenticated attacker to bypass the FortiCloud SSO login authentication using a maliciously crafted SAML message, if that feature is enabled on the device.
* Magento 2 - Unrestricted File Upload: A critical flaw in Magento and Adobe Commerce allows unauthenticated attackers to bypass security checks and upload malicious files to the server, potentially leading to Remote Code Execution (RCE).

**Impact**

Successful exploitation of the Fortinet and Magento vulnerabilities could allow unauthenticated attackers to gain administrative control or deploy webshells, leading to complete server compromise and data theft.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                          | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | -------------------------------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...2f7f95e9 | N/A            | Generic Rules - Parameter Pollution - Body                           | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...319731a4 | N/A            | Generic Rules - Parameter Pollution - Header - Form                  | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...def262dd | N/A            | Generic Rules - Parameter Pollution - URI                            | Log             | Disabled   | This is a new detection. |
| Cloudflare Managed Ruleset | ...70a36147 | N/A            | Magento 2 - Unrestricted file upload                                 | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...2ffcca9f | N/A            | Fortinet FortiCloud SSO - Authentication Bypass - CVE:CVE-2025-59718 | Log             | Block      | This is a new detection. |

## 2026-03-23

  
**WAF Release - 2026-03-23**   

This week's release focuses on new improvements to enhance coverage.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against broad classes of web attacks and strengthen behavioral coverage.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                                                                               | Previous Action | New Action | Comments                                                                                                                                                                                  |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...97321c6c | N/A            | Command Injection - Generic 9 - URI Vector                                                                                | Log             | Disabled   | This is a new detection.                                                                                                                                                                  |
| Cloudflare Managed Ruleset | ...1eb7a999 | N/A            | Command Injection - Generic 9 - Header Vector                                                                             | Log             | Disabled   | This is a new detection.                                                                                                                                                                  |
| Cloudflare Managed Ruleset | ...0677175f | N/A            | Command Injection - Generic 9 - Body Vector                                                                               | Log             | Disabled   | This is a new detection.                                                                                                                                                                  |
| Cloudflare Managed Ruleset | ...479da68f | N/A            | PHP, vBulletin, jQuery File Upload - Code Injection, Dangerous File Upload - CVE:CVE-2018-9206, CVE:CVE-2019-17132 (beta) | Log             | Block      | This rule has been merged into the original rule "PHP, vBulletin, jQuery File Upload - Code Injection, Dangerous File Upload - CVE:CVE-2018-9206, CVE:CVE-2019-17132" (ID: ...824b817c  ) |

## 2026-03-12

  
**WAF Release - 2026-03-12 - Emergency**   

This week's release introduces new detections for vulnerabilities in Ivanti Endpoint Manager Mobile (CVE-2026-1281 and CVE-2026-1340), alongside a new generic detection rule designed to identify and block Cross-Site Scripting (XSS) injection attempts within the `Content-Security-Policy` (CSP) HTTP request header.

**Key Findings**

* CVE-2026-1281 & CVE-2026-1340: Ivanti Endpoint Manager Mobile processes HTTP requests through Apache RevwriteMap directives that pass user-controlled input to Bash scripts (`/mi/bin/map-appstore-url` and `/mi/bin/map-aft-store-url`). Bash scripts do not sanitize user input and are vulnerable to shell arithmetic expansion thereby allowing attackers to achieve unauthenticated remote code execution.
* Generic XSS in CSP Header: This rule identifies malicious payloads embedded within the request's `Content-Security-Policy` header. It specifically targets scenarios where web frameworks or applications trust and extract values directly from the CSP header in the incoming request without sufficient validation. Attackers can provide crafted header values to inject scripts or malicious directives that are subsequently processed by the server.

**Impact**

Successful exploitation of Ivanti EPMM vulnerability allows unauthenticated remote code execution and generic XSS in CSP header allows attackers to inject malicious scripts during page rendering. In environments using server-side caching, this poisoned XSS content can subsequently be cached and automatically served to all visitors.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                                        | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------------------ | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...796ea2f6 | N/A            | Ivanti EPMM - Code Injection - CVE:CVE-2026-1281 CVE:CVE-2026-1340 | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...ee964a8c | N/A            | Anomaly:Header:Content-Security-Policy                             | N/A             | Block      | This is a new detection. |

## 2026-03-02

  
**WAF Release - 2026-03-02**   

This week's release introduces new detections for vulnerabilities in SmarterTools SmarterMail (CVE-2025-52691 and CVE-2026-23760), alongside improvements to an existing Command Injection (nslookup) detection to enhance coverage.

**Key Findings**

* CVE-2025-52691: SmarterTools SmarterMail mail server is vulnerable to Arbitrary File Upload, allowing an unauthenticated attacker to upload files to any location on the mail server, potentially enabling remote code execution.
* CVE-2026-23760: SmarterTools SmarterMail versions prior to build 9511 contain an authentication bypass vulnerability in the password reset API permitting unaunthenticated to reset system administrator accounts failing to verify existing password or reset token.

**Impact**

Successful exploitation of these SmarterMail vulnerabilities could lead to full system compromise or unauthorized administrative access to mail servers. Administrators are strongly encouraged to apply vendor patches without delay.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                          | Previous Action | New Action | Comments                                                                                      |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...966ec6b1 | N/A            | SmarterMail - Arbitrary File Upload - CVE-2025-52691 | Log             | Block      | This is a new detection.                                                                      |
| Cloudflare Managed Ruleset | ...ee964a8c | N/A            | SmarterMail - Authentication Bypass - CVE-2026-23760 | Log             | Block      | This is a new detection.                                                                      |
| Cloudflare Managed Ruleset | ...75b64d99 | N/A            | Command Injection - Nslookup - Beta                  | Log             | Block      | This rule is merged into the original rule "Command Injection - Nslookup" (ID: ...b090ba9a  ) |

## 2026-02-16

  
**WAF Release - 2026-02-16**   

This week’s release introduces new detections for CVE-2025-68645 and CVE-2025-31125.

**Key Findings**

* CVE-2025-68645: A Local File Inclusion (LFI) vulnerability in the Webmail Classic UI of Zimbra Collaboration Suite (ZCS) 10.0 and 10.1 allows unauthenticated remote attackers to craft requests to the `/h/rest` endpoint, improperly influence internal dispatching, and include arbitrary files from the WebRoot directory.
* CVE-2025-31125: Vite, the JavaScript frontend tooling framework, exposes content of non-allowed files via `?inline&import` when its development server is network-exposed, enabling unauthorized attackers to read arbitrary files and potentially leak sensitive information.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                            | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------------------ | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...833761f7 | N/A            | Zimbra - Local File Inclusion - CVE:CVE-2025-68645     | Log             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...950ed8c8 | N/A            | Vite - WASM Import Path Traversal - CVE:CVE-2025-31125 | Log             | Block      | This is a new detection. |

## 2026-02-10

  
**WAF Release - 2026-02-10**   

This week’s release changes the rule action from BLOCK to Disabled for Anomaly:Header:User-Agent - Fake Google Bot.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                 | Previous Action | New Action | Comments                                                        |
| -------------------------- | ----------- | -------------- | ------------------------------------------- | --------------- | ---------- | --------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...6aa0bef8 | N/A            | Anomaly:Header:User-Agent - Fake Google Bot | Enabled         | Disabled   | We are changing the action for this rule from BLOCK to Disabled |

## 2026-02-02

  
**WAF Release - 2026-02-02**   

This week’s release introduces new detections for CVE-2025-64459 and CVE-2025-24893.

**Key Findings**

* CVE-2025-64459: Django versions prior to 5.1.14, 5.2.8, and 4.2.26 are vulnerable to SQL injection via crafted dictionaries passed to QuerySet methods and the `Q()` class.
* CVE-2025-24893: XWiki allows unauthenticated remote code execution through crafted requests to the SolrSearch endpoint, affecting the entire installation.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                          | Previous Action | New Action | Comments                                                |
| -------------------------- | ----------- | -------------- | ---------------------------------------------------- | --------------- | ---------- | ------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...30698ff3 | N/A            | XWiki - Remote Code Execution - CVE:CVE-2025-24893 2 | Log             | Block      | This is a new detection.                                |
| Cloudflare Managed Ruleset | ...da8ba7e6 | N/A            | Django SQLI - CVE:CVE-2025-64459                     | Log             | Block      | This is a new detection.                                |
| Cloudflare Managed Ruleset | ...8d667511 | N/A            | NoSQL, MongoDB - SQLi - Comparison - 2               | Block           | Block      | Rule metadata description refined. Detection unchanged. |

## 2026-01-26

  
**WAF Release - 2026-01-26**   

This week’s release introduces new detections for denial-of-service attempts targeting React CVE-2026-23864 ([https://www.cve.org/CVERecord?id=CVE-2026-23864 ↗](https://www.cve.org/CVERecord?id=CVE-2026-23864)).

**Key Findings**

* CVE-2026-23864 ([https://www.cve.org/CVERecord?id=CVE-2026-23864 ↗](https://www.cve.org/CVERecord?id=CVE-2026-23864)) affects `react-server-dom-parcel`, `react-server-dom-turbopack`, and `react-server-dom-webpack` packages.
* Attackers can send crafted HTTP requests to Server Function endpoints, causing server crashes, out-of-memory exceptions, or excessive CPU usage.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                                 | Previous Action | New Action | Comments                 |
| -------------------------- | ----------- | -------------- | ------------------------------------------- | --------------- | ---------- | ------------------------ |
| Cloudflare Managed Ruleset | ...61680354 | N/A            | React Server - DOS - CVE:CVE-2026-23864 - 1 | N/A             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...dcdffcf8 | N/A            | React Server - DOS - CVE:CVE-2026-23864 - 2 | N/A             | Block      | This is a new detection. |
| Cloudflare Managed Ruleset | ...349edbc6 | N/A            | React Server - DOS - CVE:CVE-2026-23864 - 3 | N/A             | Block      | This is a new detection. |

## 2026-01-20

  
**WAF Release - 2026-01-20**   

This week's release focuses on improvements to existing detections to enhance coverage.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against SQL injection.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description              | Previous Action | New Action | Comments                                                                           |
| -------------------------- | ----------- | -------------- | ------------------------ | --------------- | ---------- | ---------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...68d90c8f | N/A            | SQLi - Comment - Beta    | Log             | Block      | This rule is merged into the original rule "SQLi - Comment" (ID: ...6d8d8fe4  )    |
| Cloudflare Managed Ruleset | ...faa045cf | N/A            | SQLi - Comparison - Beta | Log             | Block      | This rule is merged into the original rule "SQLi - Comparison" (ID: ...e7907480  ) |

## 2026-01-15

  
**WAF Release - 2026-01-15**   

This week's release focuses on improvements to existing detections to enhance coverage.

**Key Findings**

* Existing rule enhancements have been deployed to improve detection resilience against SQL Injection.

| Ruleset                    | Rule ID     | Legacy Rule ID | Description                   | Previous Action | New Action | Comments                                                                                |
| -------------------------- | ----------- | -------------- | ----------------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------- |
| Cloudflare Managed Ruleset | ...ad7dad3e | N/A            | SQLi - String Function - Beta | Log             | Block      | This rule is merged into the original rule "SQLi - String Function" (ID: ...d32b798c  ) |
| Cloudflare Managed Ruleset | ...9e553ad3 | N/A            | SQLi - Sub Query - Beta       | Log             | Block      | This rule is merged into the original rule "SQLi - Sub Query" (ID: ...743e66b1  )       |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/change-log/changelog/#page","headline":"Changelog · Cloudflare Web Application Firewall (WAF) docs","description":"You can now match incoming requests against Cloudforce One threat intelligence in your WAF rules. A new detection looks up the client IP address of each request against the threat intelligence database. If the IP was involved in threat activity in the past seven days, Cloudflare populates cf.intel.ip.* fields that you can use in custom rules and rate limiting rules.","url":"https://developers.cloudflare.com/waf/change-log/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/change-log/","name":"WAF changelog overview"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/change-log/changelog/","name":"Changelog"}}]}
```
