---
title: Check for exposed credentials
description: Detect login requests using credentials from known data breaches.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Check for exposed credentials

Deprecation notice

Exposed credentials check has been deprecated.

Switch from exposed credentials check to [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) for improved security. To upgrade your current configuration, refer to the [upgrade guide](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/upgrade-to-leaked-credentials-detection/).

Many web applications have suffered [credential stuffing](https://www.cloudflare.com/learning/bots/what-is-credential-stuffing/) attacks in the recent past. In these attacks there is a massive number of login attempts using username/password pairs from databases of exposed credentials.

Cloudflare offers you automated checks for exposed credentials using Cloudflare Web Application Firewall (WAF).

The WAF provides two mechanisms for this check:

* The [Exposed Credentials Check Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/exposed-credentials-check/), which contains predefined rules for popular CMS applications. By enabling this ruleset for a given zone, you immediately enable checks for exposed credentials for these well-known applications. The managed ruleset is available to all paid plans.
* The ability to [write custom rules](#exposed-credentials-checks-in-custom-rules) at the account level that check for exposed credentials according to your criteria. This configuration option is available to Enterprise customers with a paid add-on.

Cloudflare updates the databases of exposed credentials supporting the exposed credentials check feature on a regular basis.

The username and password credentials in clear text never leave the Cloudflare network. The WAF only uses an anonymized version of the username and password when determining if there are previously exposed credentials. Cloudflare follows the approach based on the _k_\-Anonymity mathematical property described in the following blog post: [Validating Leaked Passwords with k-Anonymity ↗](https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/).

## Available actions

The WAF can perform one of the following actions when it detects exposed credentials:

* **Exposed-Credential-Check Header**: Adds a new HTTP header to HTTP requests with exposed credentials. Your application at the origin can then force a password reset, start a two-factor authentication process, or perform any other action. The name of the added HTTP header is `Exposed-Credential-Check` and its value is `1`. The action name is `Rewrite` in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/).  
Note  
While the header name is the same as when using the [Add Leaked Credentials Checks Header](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-leaked-credentials-checks-header) managed transform, the header can have different values when using the managed transform (from `1` to `4`), depending on your Cloudflare plan.
* **Non-Interactive Challenge**: Presents a non-interactive challenge to the clients making HTTP requests with exposed credentials.
* **Managed Challenge**: Helps reduce the lifetimes of human time spent solving CAPTCHAs across the Internet. Depending on the characteristics of a request, Cloudflare will dynamically choose the appropriate type of challenge based on specific criteria.
* **Block**: Blocks HTTP requests containing exposed credentials.
* **Log**: Only available on Enterprise plans. Logs requests with exposed credentials in the Cloudflare logs. Recommended for validating a rule before committing to a more severe action.
* **Interactive Challenge**: Presents an interactive challenge to the clients making HTTP requests with exposed credentials.

The default action for the rules in the Exposed Credentials Check Managed Ruleset is _Exposed-Credential-Check Header_ (named `rewrite` in the API).

Cloudflare recommends that you only use the following actions: _Exposed-Credential-Check Header_ (named `rewrite` in the API) and _Log_ (`log`).

## Exposed credentials checks in custom rules

Note

Exposed credentials checks in custom rules are only available via API and require account-level WAF, which is available to Enterprise customers with a paid add-on.

Besides enabling the [Exposed Credentials Check Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/exposed-credentials-check/), you can also check for exposed credentials in [custom rules](https://developers.cloudflare.com/waf/custom-rules/). One common use case is to create custom rules on the end user authentication endpoints of your application to check for exposed credentials. Rules that check for exposed credentials run before rate limiting rules.

To check for exposed credentials in a custom rule, include the exposed credentials check in the rule definition at the account level and specify how to obtain the username and password values from the HTTP request. For more information, refer to [Create a custom rule checking for exposed credentials](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/configure-api/#create-a-custom-rule-checking-for-exposed-credentials).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/#page","headline":"Check for exposed credentials · Cloudflare Web Application Firewall (WAF) docs","description":"Detect login requests using credentials from known data breaches.","url":"https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication","Account takeover"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/check-for-exposed-credentials/","name":"Check for exposed credentials"}}]}
```
