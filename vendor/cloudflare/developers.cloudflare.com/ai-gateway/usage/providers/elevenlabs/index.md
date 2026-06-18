---
title: ElevenLabs
description: Route ElevenLabs text-to-speech requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# ElevenLabs

[ElevenLabs ↗](https://elevenlabs.io/) offers advanced text-to-speech services, enabling high-quality voice synthesis in multiple languages.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/elevenlabs


```

## Prerequisites

When making requests to ElevenLabs, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active ElevenLabs API token.
* The model ID of the ElevenLabs voice model you want to use.

## Example

### cURL

Request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/elevenlabs/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb?output_format=mp3_44100_128 \

  --header 'Content-Type: application/json' \

  --header 'xi-api-key: {elevenlabs_api_token}' \

  --data '{

    "text": "Welcome to Cloudflare - AI Gateway!",

    "model_id": "eleven_multilingual_v2"

}'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/elevenlabs/#page","headline":"ElevenLabs · Cloudflare AI Gateway docs","description":"Route ElevenLabs text-to-speech requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/elevenlabs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/elevenlabs/","name":"ElevenLabs"}}]}
```
