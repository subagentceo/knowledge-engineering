---
title: Get started
description: Enable malicious upload detection for file upload endpoints.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Note

WAF content scanning is available to customers on an Enterprise plan with a paid add-on.

## 1\. Turn on the detection

* [  New dashboard ](#tab-panel-11186)
* [ Old dashboard ](#tab-panel-11187)
* [ API ](#tab-panel-11188)
* [ Terraform ](#tab-panel-11189)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Detection tools**.
3. Turn on **Malicious uploads detection**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Settings**.
3. Under **Incoming traffic detections**, turn on **Malicious uploads**.

Use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Enable Content Scanning

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/enable" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Use the `cloudflare_content_scanning` resource to enable content scanning for a zone. For example:

```

resource "cloudflare_content_scanning" "zone_content_scanning_example" {

  zone_id = var.cloudflare_zone_id

  enabled = true

}


```

Note

Enabling malicious uploads detection can introduce latency since content objects will be scanned. Latency can vary depending on object size.

## 2\. Validate the content scanning behavior

Use [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) and HTTP logs to validate that malicious content objects are being detected correctly.

You can use the [EICAR anti-malware test file ↗](https://www.eicar.org/download-anti-malware-testfile/) to test content scanning (select the ZIP format).

Alternatively, create a custom rule like described in the next step using a _Log_ action instead of a mitigation action like _Block_. This rule will generate [security events](https://developers.cloudflare.com/waf/analytics/security-events/) that will allow you to validate your configuration.

## 3\. Create a custom rule

[Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) that blocks detected malicious content objects uploaded to your application.

For example, create a custom rule with the _Block_ action and the following expression:

| Field                        | Operator | Value |
| ---------------------------- | -------- | ----- |
| Has malicious content object | equals   | True  |

If you use the Expression Editor, enter the following expression:

```

(cf.waf.content_scan.has_malicious_obj)


```

Rule action: _Block_

This rule will match requests where Cloudflare detects a suspicious or malicious content object. For a list of fields provided by WAF content scanning, refer to [Content scanning fields](https://developers.cloudflare.com/waf/detections/malicious-uploads/#content-scanning-fields).

Optional: Combine with other Rules language fields

You can combine the previous expression with other [fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/) and [functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/) of the Rules language. This allows you to customize the rule scope or combine content scanning with other security features. For example:

* The following expression will match requests with malicious content objects uploaded to a specific endpoint:  
| Field                        | Operator | Value      | Logic |  
| ---------------------------- | -------- | ---------- | ----- |  
| Has malicious content object | equals   | True       | And   |  
| URI Path                     | contains | upload.php |       |  
Expression when using the editor:  
```  
(cf.waf.content_scan.has_malicious_obj and http.request.uri.path contains "upload.php")  
```
* The following expression will match requests from bots uploading content objects:  
| Field              | Operator  | Value | Logic |  
| ------------------ | --------- | ----- | ----- |  
| Has content object | equals    | True  | And   |  
| Bot Score          | less than | 10    |       |  
Expression when using the editor:  
```  
(cf.waf.content_scan.has_obj and cf.bot_management.score lt 10)  
```

For additional examples, refer to [Example rules](https://developers.cloudflare.com/waf/detections/malicious-uploads/example-rules/).

## 4\. (Optional) Configure a custom scan expression

To check uploaded content in a way that is not covered by the default configuration, add a [custom scan expression](https://developers.cloudflare.com/waf/detections/malicious-uploads/#custom-scan-expressions).

* [  New dashboard ](#tab-panel-11190)
* [ Old dashboard ](#tab-panel-11191)
* [ API ](#tab-panel-11192)
* [ Terraform ](#tab-panel-11193)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Detection tools**.
3. Under **Malicious uploads detection** \> **Configurations**, select the edit icon.
4. Select **Add content location**.
5. In **Content location**, enter your custom scan expression. For example:  
```  
lookup_json_string(http.request.body.raw, "file")  
```
6. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Settings**.
3. Under **Incoming traffic detections**, select **Malicious uploads**.
4. Select **Add content object location**.
5. In **Content location**, enter your custom scan expression. For example:  
```  
lookup_json_string(http.request.body.raw, "file")  
```
6. Select **Save**.

Use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Add Custom Scan Expressions

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '[

    {

        "payload": "lookup_json_string(http.request.body.raw, \"file\")"

    }

  ]'


```

The above request will add the following expression to the current list of custom scan expressions:

```

lookup_json_string(http.request.body.raw, "file")


```

Use the `cloudflare_content_scanning_expression` resource to add a custom scan expression. For example:

```

resource "cloudflare_content_scanning_expression" "my_custom_scan_expression" {

  zone_id = var.cloudflare_zone_id

  payload = "lookup_json_string(http.request.body.raw, \"file\")"

}


```

For more information, refer to [Custom scan expressions](https://developers.cloudflare.com/waf/detections/malicious-uploads/#custom-scan-expressions).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/malicious-uploads/get-started/#page","headline":"Get started with malicious uploads detection · Cloudflare Web Application Firewall (WAF) docs","description":"Enable malicious upload detection for file upload endpoints.","url":"https://developers.cloudflare.com/waf/detections/malicious-uploads/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/malicious-uploads/","name":"Malicious uploads detection"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/malicious-uploads/get-started/","name":"Get started"}}]}
```
