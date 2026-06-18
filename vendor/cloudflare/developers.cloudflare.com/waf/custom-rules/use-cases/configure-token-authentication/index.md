---
title: Configure token authentication
description: Configure token-based authentication with custom rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure token authentication

Token authentication allows you to restrict access to documents, files, and media to select users without requiring them to register. This helps protect paid/restricted content from leeching and unauthorized sharing.

There are two options to configure token authentication: via Cloudflare Workers or via custom rules.

## Option 1: Configure using Cloudflare Workers

Refer to the following Cloudflare Workers resources for two different implementations of token authentication:

* The [Sign requests](https://developers.cloudflare.com/workers/examples/signing-requests/) example.
* The [Auth with headers](https://developers.cloudflare.com/workers/examples/auth-with-headers/) template.

To get started with Workers, refer to [Templates](https://developers.cloudflare.com/workers/get-started/quickstarts/).

Note

The code provided in the [Sign requests](https://developers.cloudflare.com/workers/examples/signing-requests/) example is compatible with the `is_timed_hmac_valid_v0()` function used in [Option 2](#option-2-configure-using-custom-rules). This means that you can verify requests signed by the example Worker script using a custom rule.

## Option 2: Configure using custom rules

Use the Rules language [is\_timed\_hmac\_valid\_v0()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#hmac-validation) HMAC validation function to validate hash-based message authentication code (HMAC) tokens in a custom rule expression.

Note

Access to the `is_timed_hmac_valid_v0()` HMAC validation function requires a Cloudflare Pro, Business, or Enterprise plan.

To validate token authentication, [create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) with a call to the `is_timed_hmac_valid_v0()` function in the rule expression. You can use an action such as _Block_.

### Example rule

This example illustrates a rule that blocks any visitor that does not pass HMAC key validation on a specific hostname and URL path. Details required for token authentication include:

* The secret key for generating and validating the HMAC (for example, `mysecrettoken`)
* The path you wish to authenticate (for example, `downloads.example.com/images/cat.jpg`)
* The name of the query string parameter containing the token (for example, `verify`)
* The token lifetime in seconds (for example, 3 hours = 10,800 seconds)

Consider the following example URL:

```

downloads.example.com/images/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D


```

Where:

* `/images/cat.jpg` represents the path to the asset — the HMAC message to authenticate.
* `?verify=` is the separator between the path to the asset and the timestamp when the HMAC token was issued.
* `1484063787` represents the timestamp when the token was issued, expressed as UNIX time in seconds.
* `9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D` is a Base64-encoded MAC.

Warning

When you do not use the optional `flags` argument for `is_timed_hmac_valid_v0()`, you must URL encode the Base64-encoded MAC value. For more information, refer to [HMAC validation](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#hmac-validation).

The expression for the custom rule would be similar to the following:

```

(http.host eq "downloads.example.com" and not is_timed_hmac_valid_v0("mysecrettoken", http.request.uri, 10800, http.request.timestamp.sec, 8))


```

The components of this example custom rule (using the previous example URL) include:

* Token secret key = `mysecrettoken`
* Token lifetime = `10800` (10,800 seconds = 3 hours)
* `http.request.uri` \= `/images/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D`
* `http.request.timestamp.sec` \= `1484071925` (for example)
* Separator length: `len("?verify=")` \= `8`

The [is\_timed\_hmac\_valid\_v0()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#hmac-validation) function compares the value of a MAC generated using the `mysecrettoken` secret key to the value encoded in `http.request.uri`.

If the MAC values match and if the token has not expired yet, according to the following formula:

```

http.request.timestamp.sec < (<TIMESTAMP_ISSUED> + 10800)


```

Then the token is valid and the `is_timed_hmac_valid_v0()` function returns `true`.

---

## HMAC token generation

The following examples show how you could generate tokens at your origin server for the path validated using the custom rule described in the previous section:

* [  Python 3.8 ](#tab-panel-11156)
* [  Python 2.7 ](#tab-panel-11157)
* [  PHP ](#tab-panel-11158)
* [ Workers ](#tab-panel-11159)

Python

```

import hmac

import base64

import time

import urllib.parse

from hashlib import sha256


message = "/images/cat.jpg"

secret = "mysecrettoken"

separator = "verify"

timestamp = str(int(time.time()))

digest = hmac.new((secret).encode('utf8'), "{}{}".format(message, timestamp).encode('utf8'), sha256)

token = urllib.parse.quote_plus(base64.b64encode(digest.digest()))

print("{}={}-{}".format(separator, timestamp, token))


```

Python

```

import hmac

import base64

import time

import urllib

from hashlib import sha256


message = "/images/cat.jpg"

secret = "mysecrettoken"

separator = "verify"

timestamp = str(int(time.time()))

digest = hmac.new(secret, message + timestamp, sha256)

param = urllib.urlencode({separator: '%s-%s' % (timestamp, base64.b64encode(digest.digest()))})

print(param)


```

```

<?php

$message = "/images/cat.jpg";

$secret = "mysecrettoken";

$separator = "verify";

$timestamp = time();

$token = urlencode(base64_encode(hash_hmac("sha256", $message . $timestamp, $secret, true)));

echo("{$separator}={$timestamp}-{$token}");


```

For a full example in JavaScript (JS) or TypeScript (TS), refer to the [Sign requests](https://developers.cloudflare.com/workers/examples/signing-requests/) example in the Workers documentation.

Since the example JS/TS implementation is compatible with `is_timed_hmac_valid_v0()` function, requests authenticated using the provided source code can be verified with a WAF custom rule and the `is_timed_hmac_valid_v0()` function.

This will generate a URL parameter such as the following:

```

verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D


```

You will need to append this parameter to the URL you are protecting:

```

/images/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D


```

Warning

The authentication token parameter (`verify=<VALUE>` in the example) must be the last parameter in the query string.

### Test the generated token parameter

If you are on an Enterprise plan, you can test if URLs are being generated correctly on the origin server by doing the following:

1. Set the custom rule action to _Log_.
2. Check the sampled logs in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/).

---

## Protect several paths using the same secret

You can use the same secret key to protect several URI paths.

This is illustrated in the previous example, where `http.request.uri` is passed as the [MessageMAC](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#messagemac) argument to the validation function.

Since `http.request.uri` includes the path to the asset and that value is extracted for each request, the validation function evaluates all request URIs to `downloads.example.com` using the same secret key.

Note that while you can use the same secret key to authenticate several paths, you must generate an HMAC token for each unique message you want to authenticate.

## Protect an entire URI path prefix with a single signature

You can protect an entire fixed-length URI path prefix with a single HMAC signature (it would also use the same secret). To achieve this, supply a URI path prefix (instead of the full URI path) and the original query string as the [MessageMAC](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#messagemac) argument for the [is\_timed\_hmac\_valid\_v0()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#hmac-validation) function.

Use the [substring()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#substring) function to obtain the prefix from the full URI path.

In the following example, the URI path prefix requiring a single HMAC signature is always 51 characters long (`x` is a character placeholder):

```

/case-studies/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/


```

In this case, you would need to use a different HMAC signature for every different URI path prefix of length 51.

If you wanted to block requests for case study files failing the HMAC validation, you could create a custom rule similar to the following:

Rule expression:

```

  (http.host eq "downloads.example.com" and starts_with(http.request.uri.path, "/case-studies") and not is_timed_hmac_valid_v0("mysecrettoken", concat(substring(http.request.uri.path, 0, 51), "?", http.request.uri.query), 10800, http.request.timestamp.sec, 1))


```

Action:

* Block

Example URI paths of valid incoming requests:

```

/case-studies/12345678-90ab-4cde-f012-3456789abcde/foobar-report.pdf?1755877101-5WOroVcDINdl2%2BQZxZFHJcJ6l%2Fep4HGIrX3DtSXzWO0%3D

/case-studies/12345678-90ab-4cde-f012-3456789abcde/acme-corp.pdf?1755877101-5WOroVcDINdl2%2BQZxZFHJcJ6l%2Fep4HGIrX3DtSXzWO0%3D

/case-studies/768bf477-22d5-4545-857d-b155510119ff/another-company-report.pdf?1755878057-jeMS5S1F3MIgxvL61UmiX4vODiWtuLfcPV6q%2B0Y3Rig%3D


```

The first two URI paths can use the same HMAC signature because they share the same 51-character prefix (`/case-studies/12345678-90ab-4cde-f012-3456789abcde/`) that is validated by the custom rule.

The third URI path needs a different HMAC signature, since the prefix is different.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/configure-token-authentication/#page","headline":"Configure token authentication · Cloudflare Web Application Firewall (WAF) docs","description":"Configure token-based authentication with custom rules.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/configure-token-authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/configure-token-authentication/","name":"Configure token authentication"}}]}
```
