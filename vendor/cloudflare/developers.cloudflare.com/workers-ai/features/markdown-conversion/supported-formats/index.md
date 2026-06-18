---
title: Supported Formats
description: View the list of file formats supported by Workers AI Markdown Conversion.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Supported Formats

This list shows all rich-content formats that are currently supported for Markdown conversion and is updated frequently:

| Format                     | File extensions                       | Mime Types                                                                                                                                                                                                                                                              | |  PDF Documents | .pdf | application/pdf |
| -------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---- | --------------- |
| Images 1                   | .jpeg, .jpg, .png, .webp, .svg        | image/jpeg, image/png, image/webp, image/svg+xml                                                                                                                                                                                                                        |                  |      |                 |
| HTML Documents             | .html, .htm                           | text/html                                                                                                                                                                                                                                                               |                  |      |                 |
| XML Documents              | .xml                                  | application/xml                                                                                                                                                                                                                                                         |                  |      |                 |
| Microsoft Office Documents | .xlsx, .xlsm, .xlsb, .xls, .et, .docx | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroenabled.12,application/vnd.ms-excel.sheet.binary.macroenabled.12,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document |                  |      |                 |
| Open Document Format       | .ods, .odt                            | application/vnd.oasis.opendocument.spreadsheet,application/vnd.oasis.opendocument.text                                                                                                                                                                                  |                  |      |                 |
| CSV                        | .csv                                  | text/csv                                                                                                                                                                                                                                                                |                  |      |                 |
| Apple Documents            | .numbers                              | application/vnd.apple.numbers                                                                                                                                                                                                                                           |                  |      |                 |

1 Image conversion uses two Workers AI models for object detection and summarization. See [Workers AI pricing](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/#pricing) for more details.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/supported-formats/#page","headline":"Supported Formats · Cloudflare Workers AI docs","description":"View the list of file formats supported by Workers AI Markdown Conversion.","url":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/supported-formats/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/markdown-conversion/","name":"Markdown Conversion"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/markdown-conversion/supported-formats/","name":"Supported Formats"}}]}
```
