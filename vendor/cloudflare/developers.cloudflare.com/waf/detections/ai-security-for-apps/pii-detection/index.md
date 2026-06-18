---
title: PII detection
description: Detect personally identifiable information in AI request and response bodies.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# PII detection

AI Security for Apps (formerly Firewall for AI) can detect personally identifiable information (PII) in incoming LLM prompts. There are two approaches to PII detection, and you can use them together for layered protection:

* [Fuzzy detection (AI-powered)](#fuzzy-pii-detection) — AI Security for Apps uses an AI model to identify common PII types in the prompt content. This approach catches PII even when it appears in natural language or unexpected formats.
* [Exact detection (regex)](#exact-pii-detection-regex) — You write a WAF custom rule with a regular expression on the raw request body. This approach is ideal for organization-specific identifiers with a known, predictable format.

## Fuzzy PII detection

When AI Security for Apps is enabled and a request arrives at a `cf-llm` labeled endpoint, it scans the prompt for PII and populates two fields:

* **LLM PII detected** ([cf.llm.prompt.pii\_detected](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii%5Fdetected/)) — `true` if any PII was found.
* **LLM PII categories** ([cf.llm.prompt.pii\_categories](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii%5Fcategories/)) — An array of the specific PII types found.

The detection is based on [Presidio ↗](https://microsoft.github.io/presidio/supported%5Fentities/), a data protection and de-identification SDK. Refer to the [cf.llm.prompt.pii\_categories field reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii%5Fcategories/) for the full list of recognized categories.

Detecting PII in responses

AI Security for Apps PII detection runs on incoming requests (prompts) only. If you also need to detect PII in LLM responses, you can use [Sensitive Data Detection](https://developers.cloudflare.com/waf/managed-rules/reference/sensitive-data-detection/) to scan response bodies for patterns like credit card numbers, Social Security numbers, and API keys. Sensitive Data Detection logs matches, but does not block responses. Use it alongside request-side rules for layered visibility.

Supported PII categories

| Category                     | Description                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------- |
| CREDIT\_CARD                 | Credit card number                                                            |
| CRYPTO                       | Cryptocurrency wallet address                                                 |
| DATE\_TIME                   | Date or time expression                                                       |
| EMAIL\_ADDRESS               | Email address                                                                 |
| IBAN\_CODE                   | International bank account number                                             |
| IP\_ADDRESS                  | IP address                                                                    |
| NRP                          | Nationality, religious, or political group                                    |
| LOCATION                     | Physical location or address                                                  |
| PERSON                       | Person name                                                                   |
| PHONE\_NUMBER                | Phone number                                                                  |
| MEDICAL\_LICENSE             | Medical license number                                                        |
| URL                          | URL                                                                           |
| US\_BANK\_NUMBER             | US bank account number                                                        |
| US\_DRIVER\_LICENSE          | US driver license number                                                      |
| US\_ITIN                     | US Individual Taxpayer Identification Number                                  |
| US\_PASSPORT                 | US passport number                                                            |
| US\_SSN                      | US Social Security Number                                                     |
| UK\_NHS                      | UK National Health Service number                                             |
| UK\_NINO                     | UK National Insurance Number                                                  |
| ES\_NIF                      | Spanish tax identification number                                             |
| ES\_NIE                      | Spanish foreigner identification number                                       |
| IT\_FISCAL\_CODE             | Italian fiscal code                                                           |
| IT\_DRIVER\_LICENSE          | Italian driver license                                                        |
| IT\_VAT\_CODE                | Italian VAT code                                                              |
| IT\_PASSPORT                 | Italian passport number                                                       |
| IT\_IDENTITY\_CARD           | Italian identity card                                                         |
| PL\_PESEL                    | Polish national identification number                                         |
| SG\_NRIC\_FIN                | Singapore National Registration Identity Card / Foreign Identification Number |
| SG\_UEN                      | Singapore Unique Entity Number                                                |
| AU\_ABN                      | Australian Business Number                                                    |
| AU\_ACN                      | Australian Company Number                                                     |
| AU\_TFN                      | Australian Tax File Number                                                    |
| AU\_MEDICARE                 | Australian Medicare number                                                    |
| IN\_PAN                      | Indian Permanent Account Number                                               |
| IN\_AADHAAR                  | Indian Aadhaar number                                                         |
| IN\_VEHICLE\_REGISTRATION    | Indian vehicle registration number                                            |
| IN\_VOTER                    | Indian voter ID                                                               |
| IN\_PASSPORT                 | Indian passport number                                                        |
| FI\_PERSONAL\_IDENTITY\_CODE | Finnish personal identity code                                                |

### Be specific to reduce false positives

The `cf.llm.prompt.pii_detected` field returns `true` when any PII category is detected — including broad categories like `PERSON`, `DATE_TIME`, and `LOCATION` that frequently appear in normal conversation. Blocking based on this field alone will produce a high false-positive rate for most applications.

Instead, build rules against `cf.llm.prompt.pii_categories` and list only the categories that matter for your use case. For example, a customer support chatbot may need to block credit card numbers and SSNs but can safely ignore person names and dates. Start with the narrowest set of categories, monitor matches in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/), and expand only as needed.

### Example rules — fuzzy detection

#### Block any request containing PII

* **When incoming requests match**:  
| Field            | Operator | Value |  
| ---------------- | -------- | ----- |  
| LLM PII Detected | equals   | True  |  
Expression when using the editor:  
`(cf.llm.prompt.pii_detected)`
* **Action**: _Block_

#### Block only specific PII categories

* **When incoming requests match**:  
| Field              | Operator | Value       |  
| ------------------ | -------- | ----------- |  
| LLM PII Categories | is in    | Credit Card |  
Expression when using the editor:  
`(any(cf.llm.prompt.pii_categories[*] in {"CREDIT_CARD"}))`
* **Action**: _Block_

#### Log email addresses but block credit cards and SSNs

Create two [custom rules](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/):

1. A rule with action _Block_ and the following expression:  
`(any(cf.llm.prompt.pii_categories[*] in {"CREDIT_CARD" "US_SSN"}))`
2. A rule with action _Log_ and the following expression:  
`(any(cf.llm.prompt.pii_categories[*] in {"EMAIL_ADDRESS"}))`

## Exact PII detection (regex)

If you need to detect **custom PII formats** specific to your organization — such as internal employee IDs, patient record numbers, or proprietary account identifiers — you can create a WAF [custom rule](https://developers.cloudflare.com/waf/custom-rules/) using a regex match on the raw body ([http.request.body.raw](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.raw/) field).

This approach complements fuzzy detection by covering formats the AI model does not natively recognize.

### Example: Detect employee IDs

In the following example, an organization uses employee IDs in the format `EMP-` followed by exactly six digits (for example, `EMP-482910`).

[Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) with the following configuration:

* **When incoming requests match**:  
| Field            | Operator      | Value          |  
| ---------------- | ------------- | -------------- |  
| Raw request body | matches regex | EMP-\[0-9\]{6} |  
Expression when using the editor:  
`(http.request.body.raw matches "EMP-[0-9]{6}")`
* **Action**: _Block_
* **With response type**: Custom JSON
* **Response body**: `{ "error": "Request blocked: employee ID detected in prompt." }`

Scope to a specific endpoint

To limit this rule to only your LLM endpoint, combine it with a path condition:

| Field            | Operator      | Value          | Logic |
| ---------------- | ------------- | -------------- | ----- |
| URI Path         | equals        | /api/chat      | And   |
| Raw request body | matches regex | EMP-\[0-9\]{6} |       |

Expression when using the editor:  
`(http.request.uri.path eq "/api/chat" and http.request.body.raw matches "EMP-[0-9]{6}")`

### More regex examples

| Custom PII type       | Example format      | Regex pattern                |
| --------------------- | ------------------- | ---------------------------- |
| Employee ID           | EMP-482910          | EMP-\[0-9\]{6}               |
| Patient record number | PAT/2024/00391      | PAT/\[0-9\]{4}/\[0-9\]{5}    |
| Internal account ID   | ACCT-XX-99999       | ACCT-\[A-Z\]{2}-\[0-9\]{5}   |
| Custom API key prefix | sk\_live\_abc123... | sk\_live\_\[a-zA-Z0-9\]{20,} |

### Considerations for regex rules

* **Cloudflare Plan requirement.** Regex operators (`matches` and `~`) require a Business or Enterprise plan.
* **Body size limit.** The `http.request.body.raw` field inspects a limited portion of the request body. The exact limit [varies by plan](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.raw/).
* **JSON payloads.** The raw body includes the full JSON structure. Your regex should account for the fact that the prompt text is nested inside a JSON string.
* **Performance.** Complex regex patterns can impact rule evaluation time. Keep patterns as specific as possible.

## Combine both approaches

You can use fuzzy and exact detection together for layered protection:

`(cf.llm.prompt.pii_detected or http.request.body.raw matches "EMP-[0-9]{6}")`

This rule blocks requests where either the AI model detects any built-in PII category or the regex matches your custom identifier format.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/pii-detection/#page","headline":"PII detection · Cloudflare Web Application Firewall (WAF) docs","description":"Detect personally identifiable information in AI request and response bodies.","url":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/pii-detection/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/ai-security-for-apps/","name":"AI Security for Apps"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/ai-security-for-apps/pii-detection/","name":"PII detection"}}]}
```
