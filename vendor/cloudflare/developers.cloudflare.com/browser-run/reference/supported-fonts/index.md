---
title: Supported fonts
description: View the list of pre-installed fonts available in the Browser Run Chromium environment for screenshots and PDFs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Supported fonts

Browser Run uses a managed Chromium environment that includes a standard set of fonts. When you generate a screenshot or PDF, text is rendered using the fonts available in this environment.

If your webpage specifies a font that is not supported yet, Chromium will automatically fall back to a similar supported font. If you would like to use a font that is not currently supported, refer to [Custom fonts](https://developers.cloudflare.com/browser-run/features/custom-fonts/).

## Pre-installed fonts

The following sections list the fonts available in the Browser Run environment.

### Generic CSS font family support

The following generic CSS font families are supported:

* `serif`
* `sans-serif`
* `monospace`
* `cursive`
* `fantasy`

### Common system fonts

* Andale Mono
* Arial
* Arial Black
* Comic Sans MS
* Courier
* Courier New
* Georgia
* Helvetica
* Impact
* Lucida Handwriting
* Times
* Times New Roman
* Trebuchet MS
* Verdana
* Webdings

### Open source and extended fonts

* Bitstream Vera (Serif, Sans, Mono)
* Cyberbit
* DejaVu (Serif, Sans, Mono)
* FreeFont (FreeSerif, FreeSans, FreeMono)
* GFS Neohellenic
* Liberation (Serif, Sans, Mono)
* Open Sans
* Roboto

### International fonts

Browser Run includes additional font packages for non-Latin scripts and emoji:

* IPAfont Gothic (Japanese)
* Indic fonts (Devanagari, Bengali, Tamil, and others)
* KACST fonts (Arabic)
* Noto CJK (Chinese, Japanese, Korean)
* Noto Color Emoji
* TLWG Thai fonts
* WenQuanYi Zen Hei (Chinese)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/reference/supported-fonts/#page","headline":"Supported fonts · Cloudflare Browser Run docs","description":"View the list of pre-installed fonts available in the Browser Run Chromium environment for screenshots and PDFs.","url":"https://developers.cloudflare.com/browser-run/reference/supported-fonts/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/reference/supported-fonts/","name":"Supported fonts"}}]}
```
