---
title: Get started
description: Enable leaked credentials detection and configure custom or managed detections.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

## 1\. Turn on the detection

On Free plans, the leaked credentials detection is enabled by default, and no action is required. On paid plans, you can turn on the detection in the Cloudflare dashboard, via API, or using Terraform.

* [  New dashboard ](#tab-panel-11180)
* [ Old dashboard ](#tab-panel-11181)
* [ API ](#tab-panel-11182)
* [ Terraform ](#tab-panel-11183)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Detection tools**.
3. Turn on **Leaked credential detection**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Settings**.
3. Under **Incoming traffic detections**, turn on **Leaked credentials**.

Use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Set Leaked Credential Checks Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "enabled": true

  }'


```

Use the `cloudflare_leaked_credential_check` resource to enable leaked credentials detection for a zone. For example:

```

resource "cloudflare_leaked_credential_check" "zone_lcc_example" {

  zone_id = var.cloudflare_zone_id

  enabled = true

}


```

Note

To achieve optimal latency performance, Cloudflare recommends that you turn off [Exposed Credentials Checks](https://developers.cloudflare.com/waf/managed-rules/reference/exposed-credentials-check/) (a previous implementation) after turning on leaked credentials detection and setting up your mitigation strategy as described in the next steps.

## 2\. Validate the leaked credentials detection behavior

Use [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) and HTTP logs to validate that Cloudflare is correctly detecting leaked credentials in incoming requests.

Refer to [Test your configuration](#test-your-configuration) for more information on the test credentials you can use to validate your configuration.

Alternatively, create a custom rule like the one described in the next step using a _Log_ action (only available to Enterprise customers). This rule will generate [security events](https://developers.cloudflare.com/waf/analytics/security-events/) that will allow you to validate your configuration.

## 3\. Mitigate requests with leaked credentials

If you are on a Free plan, deploy the suggested [rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) template available in:

* Old dashboard: **WAF** \> **Rate limiting rules**
* New security dashboard: **Security** \> **Security rules**

When you deploy a rule using this template, you get instant protection against IPs attempting to access your application with a leaked password more than five times per 10 seconds. This rule can delay attacks by blocking them for a period of time. Alternatively, you can create a custom rule.

Paid plans have access to more granular controls when creating a rule. If you are on a paid plan, [create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) that challenges requests containing leaked credentials:

| Field                    | Operator | Value |
| ------------------------ | -------- | ----- |
| User and Password Leaked | equals   | True  |

If you use the Expression Editor, enter the following expression:

```

(cf.waf.credential_check.username_and_password_leaked)


```

Rule action: _Managed Challenge_

This rule will match requests where Cloudflare detects a previously leaked set of credentials (username and password). For a list of fields provided by leaked credentials detection, refer to [Leaked credentials fields](https://developers.cloudflare.com/waf/detections/leaked-credentials/#leaked-credentials-fields).

Combine with other Rules language fields

You can combine the previous expression with other [fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/) and [functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/) of the Rules language. This allows you to customize the rule scope or combine leaked credential checking with other security features. For example:

* The following expression will match requests containing leaked credentials addressed at an authentication endpoint:  
| Field                    | Operator | Value            | Logic |  
| ------------------------ | -------- | ---------------- | ----- |  
| User and Password Leaked | equals   | True             | And   |  
| URI Path                 | contains | /admin/login.php |       |  
Expression when using the editor:  
`(cf.waf.credential_check.username_and_password_leaked and http.request.uri.path contains "/admin/login.php")`
* The following expression will match requests coming from bots that include authentication credentials:  
| Field                   | Operator  | Value | Logic |  
| ----------------------- | --------- | ----- | ----- |  
| Authentication detected | equals    | True  | And   |  
| Bot Score               | less than | 10    |       |  
Expression when using the editor:  
`(cf.waf.auth_detected and cf.bot_management.score lt 10)`

For additional examples, refer to [Example mitigation rules](https://developers.cloudflare.com/waf/detections/leaked-credentials/examples/).

### Handle detected leaked credentials at the origin server

Additionally, you may want to handle leaked credentials detected by Cloudflare at your origin server:

1. [Turn on](https://developers.cloudflare.com/rules/transform/managed-transforms/configure/) the **Add Leaked Credentials Checks Header** managed transform.
2. For requests received at your origin server containing the `Exposed-Credential-Check` header, you could redirect your end users to your reset password page when detecting previously leaked credentials.

## 4\. (Optional) Configure a custom detection location

Note

Only available for Enterprise customers.

To check for leaked credentials in a way that is not covered by the default configuration, add a [custom detection location](https://developers.cloudflare.com/waf/detections/leaked-credentials/#custom-detection-locations).

* [  New dashboard ](#tab-panel-11176)
* [ Old dashboard ](#tab-panel-11177)
* [ API ](#tab-panel-11178)
* [ Terraform ](#tab-panel-11179)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Detection tools**.
3. Under **Leaked credential detection** \> **Configurations**, select the edit icon.
4. Select **Add custom username and password location**.
5. In **Username location** and **Password location** (optional), enter expressions for obtaining the username and the password from the HTTP request. For example, you could use the following expressions:  
   * Username location:  
   `lookup_json_string(http.request.body.raw, "user")`  
   * Password location:  
   `lookup_json_string(http.request.body.raw, "secret")`  
This configuration will scan incoming HTTP requests containing a JSON body with a structure similar to the following:  
JavaScript  
```  
{"user": "<USERNAME>", "secret": "<PASSWORD>"}  
```  
Refer to the [lookup\_json\_string()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lookup%5Fjson%5Fstring) documentation for more information on this function.
6. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Settings**.
3. Under **Incoming traffic detections**, select **Leaked credentials** and then select **Add custom username and password location**.
4. In **Username location** and **Password location** (optional), enter expressions for obtaining the username and the password from the HTTP request. For example, you could use the following expressions:  
   * Username location:  
   `lookup_json_string(http.request.body.raw, "user")`  
   * Password location:  
   `lookup_json_string(http.request.body.raw, "secret")`  
This configuration will scan incoming HTTP requests containing a JSON body with a structure similar to the following:  
JavaScript  
```  
{"user": "<USERNAME>", "secret": "<PASSWORD>"}  
```  
Refer to the [lookup\_json\_string()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lookup%5Fjson%5Fstring) documentation for more information on this function.
5. Select **Save**.

Use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Create Leaked Credential Checks Custom Detection

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "username": "lookup_json_string(http.request.body.raw, \"user\")",

    "password": "lookup_json_string(http.request.body.raw, \"secret\")"

  }'


```

This pair of lookup expressions (for username and password) will scan incoming HTTP requests containing a JSON body with a structure similar to the following:

JavaScript

```

{"user": "<USERNAME>", "secret": "<PASSWORD>"}


```

Refer to the [lookup\_json\_string()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lookup%5Fjson%5Fstring) documentation for more information on this function.

Use the `cloudflare_leaked_credential_check_rule` resource to add a custom detection location. For example:

```

resource "cloudflare_leaked_credential_check_rule" "custom_location_example" {

  zone_id = var.cloudflare_zone_id

  username = "lookup_json_string(http.request.body.raw, \"user\")"

  password = "lookup_json_string(http.request.body.raw, \"secret\")"

}


```

Refer to the [lookup\_json\_string()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lookup%5Fjson%5Fstring) documentation for more information on this function.

You only need to provide an expression for the username in custom detection locations.

For more examples of custom detection locations for different request types, refer to [Custom detection locations](https://developers.cloudflare.com/waf/detections/leaked-credentials/#custom-detection-locations).

---

## Test your configuration

Cloudflare provides a special set of case-sensitive credentials for testing the configuration of the leaked credentials detection.

After enabling and configuring the detection, you can use the credentials mentioned in this section in your test HTTP requests.

Test credentials for users on a Free plan (will also work in paid plans):

* Username: `CF_LEAKED_USERNAME_FREE`
* Password: `CF_LEAKED_PASSWORD`

Test credentials for users on paid plans (will not work on Free plans):

* Username: `CF_EXPOSED_USERNAME` or `CF_EXPOSED_USERNAME@example.com`
* Password: `CF_EXPOSED_PASSWORD`

Cloudflare considers these specific credentials as having been previously leaked. Use them in your tests to check the behavior of your current configuration.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/leaked-credentials/get-started/#page","headline":"Get started with leaked credentials detection · Cloudflare Web Application Firewall (WAF) docs","description":"Enable leaked credentials detection and configure custom or managed detections.","url":"https://developers.cloudflare.com/waf/detections/leaked-credentials/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Account takeover","Authentication"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/leaked-credentials/","name":"Leaked credentials detection"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/leaked-credentials/get-started/","name":"Get started"}}]}
```
