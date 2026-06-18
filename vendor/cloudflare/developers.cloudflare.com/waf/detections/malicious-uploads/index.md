---
title: Malicious uploads detection
description: Scan uploaded files for malware and malicious content.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Malicious uploads detection

The malicious uploads detection is a [traffic detection](https://developers.cloudflare.com/waf/concepts/#detection-versus-mitigation) that scans files and other content uploaded to your application for malware.

When you turn on this detection, the WAF inspects incoming uploads and checks them for malicious signatures. The scan results are available as [fields](#content-scanning-fields) you can use in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to act on requests containing malicious content.

Note

This feature is available to customers on an Enterprise plan with a paid add-on.

## How it works

Once you turn on this detection, Cloudflare inspects all incoming traffic and identifies [content objects](#what-is-a-content-object) automatically.

When Cloudflare detects one or more content objects in a request, it sends them to an antivirus (AV) scanner for analysis. The AV scanner is the same one used in [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/).

Based on the scan results, the detection populates [fields](#content-scanning-fields) you can reference in rule expressions. For example, you can create a rule to block requests with malicious files, or a more specific rule that also matches on file size, file type, or URI path.

Notes

Content scanning does not block or challenge requests on its own. It provides detection signals only. To act on these signals, create [custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/).

For more information on detection versus mitigation, refer to [Concepts](https://developers.cloudflare.com/waf/concepts/#detection-versus-mitigation).

Enabling malicious uploads detection can introduce latency since content objects will be scanned. Latency can vary depending on object size.

## What is a content object?

A content object is a file or binary payload in a request that Cloudflare identifies as scannable content. The malicious uploads detection uses heuristics to find content objects automatically, without relying on the request's `Content-Type` header (since this header can be manipulated).

The following content types are excluded from scanning: `text/html`, `text/x-shellscript`, `application/json`, `text/csv`, and `text/xml`. All other detected content is treated as a content object. Common examples include:

* Executable files (for example, `.exe`, `.bat`, `.dll`, and `.wasm`)
* Documents (for example, `.doc`, `.docx`, `.pdf`, `.ppt`, and `.xls`)
* Compressed files (for example, `.gz`, `.zip`, and `.rar`)
* Image files (for example, `.jpg`, `.png`, `.gif`, `.webp`, and `.tif`)
* Video and audio files

If Cloudflare detects a malicious object but cannot determine its exact content type, it reports the object as `application/octet-stream`.

## Scanned content

Content scanning can check the following content objects for malicious content:

* Uploaded files in a request
* Portions of the request body for multipart requests encoded as `multipart/form-data` or `multipart/mixed`
* Specific JSON properties in the request body (containing, for example, files encoded in Base64) according to the [custom scan expressions](#custom-scan-expressions) you provide

All content objects in an incoming request will be checked, namely for requests with multiple uploaded files (for example, a submitted HTML form with several file inputs).

The content scanner will fully check content objects with a size up to 50 MB. For larger content objects, the scanner will analyze the first 50 MB and provide scan results based on that portion of the object.

Notes

* The AV scanner will not scan some particular types of files, namely the following:  
   * Password-protected archives  
   * Archives with more than three recursion levels  
   * Archives with more than 300 files  
   * PGP-encrypted files
* In rare cases, the AV scanner may time out and fail to analyze a content object. When this happens, the `cf.waf.content_scan.has_failed` field will be set to true.

## Custom scan expressions

Sometimes, you may want to specify where to find the content objects, such as when the content is a Base64-encoded string within a JSON payload. For example:

```

{ "file": "<BASE64_ENCODED_STRING>" }


```

In these situations, configure a custom scan expression to tell the content scanner where to find the content objects. For more information, refer to [Configure a custom scan expression](https://developers.cloudflare.com/waf/detections/malicious-uploads/get-started/#4-optional-configure-a-custom-scan-expression).

For more information and additional examples of looking up fields in nested JSON payloads, refer to the [lookup\_json\_string()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lookup%5Fjson%5Fstring) function documentation.

Note

The content scanner will automatically decode Base64 strings.

## Content scanning fields

When content scanning is enabled, you can use the following fields in WAF rules:

| Field                                                                                                                                                                                                                  | Description                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Has content object [cf.waf.content\_scan.has\_obj](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.has%5Fobj/)  Boolean                                         | Indicates whether the request contains at least one content object.                                                                                     |
| Has malicious content object [cf.waf.content\_scan.has\_malicious\_obj](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.has%5Fmalicious%5Fobj/)  Boolean        | Indicates whether the request contains at least one malicious content object.                                                                           |
| Number of malicious content objects [cf.waf.content\_scan.num\_malicious\_obj](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.num%5Fmalicious%5Fobj/)  Integer | The number of malicious content objects detected in the request (zero or greater).                                                                      |
| Content scan has failed [cf.waf.content\_scan.has\_failed](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.has%5Ffailed/)  Boolean                              | Indicates whether the file scanner was unable to scan any of the content objects detected in the request.                                               |
| Number of content objects [cf.waf.content\_scan.num\_obj](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.num%5Fobj/)  Integer                                  | The number of content objects detected in the request (zero or greater).                                                                                |
| Content object size [cf.waf.content\_scan.obj\_sizes](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.obj%5Fsizes/)  Array<Integer>                             | An array of file sizes in bytes, in the order the content objects were detected in the request.                                                         |
| Content object type [cf.waf.content\_scan.obj\_types](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.obj%5Ftypes/)  Array<String>                              | An array of file types in the order the content objects were detected in the request.                                                                   |
| Content object result [cf.waf.content\_scan.obj\_results](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.obj%5Fresults/)  Array<String>                        | An array of scan results in the order the content objects were detected in the request.  Possible values: clean, suspicious, infected, and not scanned. |

For examples of rule expressions using these fields, refer to [Example rules](https://developers.cloudflare.com/waf/detections/malicious-uploads/example-rules/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/malicious-uploads/#page","headline":"Malicious uploads detection · Cloudflare Web Application Firewall (WAF) docs","description":"Scan uploaded files for malware and malicious content.","url":"https://developers.cloudflare.com/waf/detections/malicious-uploads/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/malicious-uploads/","name":"Malicious uploads detection"}}]}
```
