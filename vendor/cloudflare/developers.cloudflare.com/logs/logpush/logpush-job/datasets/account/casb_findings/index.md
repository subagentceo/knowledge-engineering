---
title: CASB Findings
description: The descriptions below detail the fields available for casb_findings.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# CASB Findings

The descriptions below detail the fields available for `casb_findings`.

## AssetDisplayName

Type: `string`

Asset display name (for example, 'My File Name.docx').

## AssetExternalID

Type: `string`

Unique identifier for an asset of this type. Format will vary by policy vendor.

## AssetLink

Type: `string`

URL to the asset. This may not be available for some policy vendors and asset types.

## AssetMetadata

Type: `object`

Metadata associated with the asset. Structure will vary by policy vendor.

## DetectedTimestamp

Type: `int or string`

Date and time the finding was first identified (for example, '2021-07-27T00:01:07Z').

## FindingTypeDisplayName

Type: `string`

Human-readable name of the finding type (for example, 'File Publicly Accessible Read Only').

## FindingTypeID

Type: `string`

UUID of the finding type in Cloudflare's system.

## FindingTypeSeverity

Type: `string`

Severity of the finding type (for example, 'High').

## InstanceID

Type: `string`

UUID of the finding in Cloudflare's system.

## IntegrationDisplayName

Type: `string`

Human-readable name of the integration (for example, 'My Google Workspace Integration').

## IntegrationID

Type: `string`

UUID of the integration in Cloudflare's system.

## IntegrationPolicyVendor

Type: `string`

Human-readable vendor name of the integration's policy (for example, 'Google Workspace Standard Policy').

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/casb_findings/#page","headline":"CASB Findings · Cloudflare Logs docs","description":"The descriptions below detail the fields available for casb_findings.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/casb_findings/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/casb_findings/","name":"CASB Findings"}}]}
```
