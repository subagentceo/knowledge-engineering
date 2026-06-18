---
title: Example rules
description: Example rules for handling detected malicious file uploads.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Example rules

## Log requests with an uploaded content object

This [custom rule](https://developers.cloudflare.com/waf/custom-rules/) example logs all requests with at least one uploaded content object:

* **When incoming requests match:**  
| Field              | Operator | Value |  
| ------------------ | -------- | ----- |  
| Has content object | equals   | True  |  
If you are using the Expression Editor:  
`(cf.waf.content_scan.has_obj)`
* **Action:** _Log_

## Block requests to URI path with a malicious content object

This custom rule example blocks requests addressed at `/upload.php` that contain at least one uploaded content object considered malicious:

* **When incoming requests match:**  
| Field                        | Operator | Value       |     |  
| ---------------------------- | -------- | ----------- | --- |  
| Has malicious content object | equals   | True        | And |  
| URI Path                     | equals   | /upload.php |     |  
If you are using the Expression Editor:  
`(cf.waf.content_scan.has_malicious_obj and http.request.uri.path eq "/upload.php")`
* **Action:** _Block_

## Block requests with non-PDF file uploads

This custom rule example blocks requests addressed at `/upload` with uploaded content objects that are not PDF files:

* **When incoming requests match:**  
`any(cf.waf.content_scan.obj_types[*] != "application/pdf") and http.request.uri.path eq "/upload"`
* **Action:** _Block_

## Block requests with uploaded files over 500 KB

This custom rule example blocks requests addressed at `/upload` with uploaded content objects over 500 KB (512,000 bytes) in size:

* **When incoming requests match:**  
`any(cf.waf.content_scan.obj_sizes[*] > 512000) and http.request.uri.path eq "/upload"`
* **Action:** _Block_

## Block requests with uploaded files over the content scanning limit (50 MB)

This custom rule example blocks requests with uploaded content objects over 50 MB in size (the current content scanning limit):

* **When incoming requests match:**  
`any(cf.waf.content_scan.obj_sizes[*] >= 52428800)`
* **Action:** _Block_

In this example, you must also test for equality because currently any file over 50 MB will be handled internally as if it had a size of 50 MB (52,428,800 bytes). This means that using the `>` (greater than) [comparison operator](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#comparison-operators) would not work for this particular rule — you should use `>=` (greater than or equal) instead.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/malicious-uploads/example-rules/#page","headline":"Example rules checking uploaded content objects · Cloudflare Web Application Firewall (WAF) docs","description":"Example rules for handling detected malicious file uploads.","url":"https://developers.cloudflare.com/waf/detections/malicious-uploads/example-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/malicious-uploads/","name":"Malicious uploads detection"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/malicious-uploads/example-rules/","name":"Example rules"}}]}
```
