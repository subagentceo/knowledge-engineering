---
title: Leaked credentials detection
description: Scan incoming requests for usernames and passwords exposed in known data breaches.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Leaked credentials detection

The leaked credentials [traffic detection](https://developers.cloudflare.com/waf/detections/) scans incoming requests for credentials (usernames and passwords) previously leaked from [data breaches ↗](https://www.cloudflare.com/learning/security/what-is-a-data-breach/).

Note

If you are currently using [exposed credentials check](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/) (a previous implementation that is now deprecated), refer to [Upgrade to leaked credentials detection](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/upgrade-to-leaked-credentials-detection/) to upgrade to the new implementation.

## How it works

When you turn on leaked credentials detection, Cloudflare scans incoming HTTP requests for usernames and passwords. The scan checks authentication patterns from [common web applications](#default-scan-locations) and any [custom detection locations](#custom-detection-locations) you configure.

Detected credentials are compared against a database of known leaked credentials. This database consists of:

* The [Have I Been Pwned (HIBP) ↗](https://haveibeenpwned.com) matched passwords dataset (passwords only)
* Cloudflare-collected credentials (usernames)
* Leaked credentials pairs (username and password)

Based on the results, Cloudflare populates [leaked credentials fields](#leaked-credentials-fields) for scanned requests. You can use these fields in two ways:

* **Analyze traffic**: Review detection results in the [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) dashboard to understand how often leaked credentials appear in your traffic.
* **Create rules**: Use the fields in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to challenge or block requests that contain compromised credentials.

Leaked credentials can appear in your traffic for different reasons. An attacker may be performing a [credential stuffing ↗](https://www.cloudflare.com/learning/bots/what-is-credential-stuffing/) attack, or a legitimate user may be reusing a previously leaked password.

### Notify your origin server

Leaked credentials detection provides a [managed transform](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-leaked-credentials-checks-header) that adds an `Exposed-Credential-Check` request header to matching requests. The header value indicates what was leaked — for example, `1` if both username and password were a leaked pair, `2` if the username was leaked, or `4` if only the password was leaked.

You can use this header at your origin server to warn users and prompt them to reset their password.

Note

Cloudflare does not store, log, or retain plaintext end-user passwords when performing leaked credential checks. Passwords are hashed, converted into a cryptographic representation, and then compared against a database of leaked credentials.

## Availability

For details on available features per plan, refer to [Availability](https://developers.cloudflare.com/waf/detections/#availability) in the traffic detections page.

## Default scan locations

Leaked credentials detection includes rules for identifying credentials in HTTP requests for the following well-known web applications:

* Drupal
* Joomla
* Ghost
* Magento
* Plone
* WordPress
* Microsoft Exchange OWA

Additionally, the scan includes generic rules for other common web authentication patterns.

You can also configure [custom detection locations](#custom-detection-locations) to address the specific authentication mechanism used in your web applications. A custom detection location tells the Cloudflare WAF where to find usernames and passwords in HTTP requests of your web application.

## Custom detection locations

Note

Only available for Enterprise customers.

The default scan covers [common web applications](#default-scan-locations), but your application may send credentials in a different format or field name. Custom detection locations allow you to tell Cloudflare exactly where to find usernames and passwords in HTTP requests.

For example, if the JSON body of an HTTP request authenticating a user looks like the following:

```

{ "user": "<username>", "secret": "<password>" }


```

You could configure a custom detection location with the following settings:

* Custom location for username:  
`lookup_json_string(http.request.body.raw, "user")`
* Custom location for password:  
`lookup_json_string(http.request.body.raw, "secret")`

When specifying a custom detection location, only the location of the username field is required.

The following table includes example detection locations for different request types:

| Request type     | Username location / Password location                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| JSON body        | lookup\_json\_string(http.request.body.raw, "user")lookup\_json\_string(http.request.body.raw, "secret")         |
| URL-encoded form | url\_decode(http.request.body.form\["user"\]\[0\])url\_decode(http.request.body.form\["secret"\]\[0\])           |
| Multipart form   | url\_decode(http.request.body.multipart\["user"\]\[0\])url\_decode(http.request.body.multipart\["secret"\]\[0\]) |

Expressions used to specify custom detection locations can include the following fields and functions:

* Fields:  
   * [http.request.body.form](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.form/)  
   * [http.request.body.multipart](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.multipart/)  
   * [http.request.body.raw](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.raw/)  
   * [http.request.headers](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/)  
   * [http.request.uri.args](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args/)  
   * [http.request.uri.query](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.query/)
* Functions:  
   * [lookup\_json\_string()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lookup%5Fjson%5Fstring)  
   * [url\_decode()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#url%5Fdecode)

For instructions on configuring a custom detection location, refer to [Get started](https://developers.cloudflare.com/waf/detections/leaked-credentials/get-started/#4-optional-configure-a-custom-detection-location).

## Leaked credentials fields

The following fields indicate the type of leaked credential match Cloudflare detected. Use these fields in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to act on requests containing compromised credentials.

| Field                                                                                                                                                                                                                                        | Description                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Password Leaked [cf.waf.credential\_check.password\_leaked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.credential%5Fcheck.password%5Fleaked/)  Boolean                                          | Indicates whether the password detected in the request was previously leaked.  Available on all plans.                                                     |
| User and Password Leaked [cf.waf.credential\_check.username\_and\_password\_leaked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.credential%5Fcheck.username%5Fand%5Fpassword%5Fleaked/)  Boolean | Indicates whether the username-password pair detected in the request were previously leaked.  Requires a Pro plan or above.                                |
| Username Leaked [cf.waf.credential\_check.username\_leaked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.credential%5Fcheck.username%5Fleaked/)  Boolean                                          | Indicates whether the username detected in the request was previously leaked.  Requires an Enterprise plan.                                                |
| Similar Password Leaked [cf.waf.credential\_check.username\_password\_similar](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.credential%5Fcheck.username%5Fpassword%5Fsimilar/)  Boolean           | Indicates whether a similar version of the username and password credentials detected in the request were previously leaked.  Requires an Enterprise plan. |
| Authentication detected [cf.waf.auth\_detected](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.auth%5Fdetected/)  Boolean                                                                           | Indicates whether Cloudflare detected authentication credentials in the request.  Requires an Enterprise plan.                                             |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/leaked-credentials/#page","headline":"Leaked credentials detection · Cloudflare Web Application Firewall (WAF) docs","description":"Scan incoming requests for usernames and passwords exposed in known data breaches.","url":"https://developers.cloudflare.com/waf/detections/leaked-credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication","Account takeover"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/leaked-credentials/","name":"Leaked credentials detection"}}]}
```
