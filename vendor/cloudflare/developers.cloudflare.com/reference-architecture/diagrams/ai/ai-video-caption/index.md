---
title: Automatic captioning for video uploads
description: By integrating automatic speech recognition technology into video platforms, content creators, publishers, and distributors can reach a broader audience, including individuals with hearing impairments or those who prefer to consume content in different languages.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Automatic captioning for video uploads

**Last reviewed:**  over 2 years ago 

## Introduction

Automatic Speech Recognition (ASR) models have revolutionized the accessibility of video content by enabling the generation of subtitles and translations. These models utilize advanced algorithms to transcribe spoken words into text with high accuracy. By integrating ASR technology into video platforms, content creators, publishers, and distributors can reach a broader audience, including individuals with hearing impairments or those who prefer to consume content in different languages.

The process begins with capturing the audio from the video source, which is then fed into the ASR model. This model analyzes the audio waveform and converts it into a textual representation, capturing the spoken content in the form of subtitles. Furthermore, you can also use ASR models for language translation, enabling the creation of multilingual subtitles. Once the subtitles are generated, they can be displayed alongside the video, providing a synchronized text representation of the spoken content.

## Automatic captioning on upload

![Figure 1: Automatic captioning on upload](https://developers.cloudflare.com/_astro/ai-auto-caption-architecture-diagram.CyBpgQKS_1MIa7Q.svg "Figure 1:  Automatic captioning on upload")

Figure 1: Automatic captioning on upload

1. **Client upload**: Send POST request with both video and audio to API endpoint.
2. **Audio transcription**: Generate timestamped transcriptions by calling [Workers AI](https://developers.cloudflare.com/workers-ai/) [automatic speech recognition (ARS) model](https://developers.cloudflare.com/workers-ai/models/) with audio as input. Use [Workers](https://developers.cloudflare.com/workers/) to convert the output to a supported subtitled format.
3. **Store subtitles**: Store the subtitle file(s) on [R2](https://developers.cloudflare.com/r2/).
4. **Store video**: Store the video files on [R2](https://developers.cloudflare.com/r2/).
5. **Client request**: Send GET requests for video and subtitle(s) to origin. Use global [Cache](https://developers.cloudflare.com/cache/) to increase performance.
6. **Origin request**: Fetch file(s) from [R2](https://developers.cloudflare.com/r2/) on cache `MISS` by using [Public Buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/).

## Related resources

* [Community project: automatic captioning demo ↗](https://auto-caption.pages.dev/)
* [Workers AI: Automatic speech recognition (ARS) model](https://developers.cloudflare.com/workers-ai/models/)
* [R2: Object storage for all your data](https://developers.cloudflare.com/r2/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-video-caption/#page","headline":"Automatic captioning for video uploads · Cloudflare Reference Architecture docs","description":"By integrating automatic speech recognition technology into video platforms, content creators, publishers, and distributors can reach a broader audience, including individuals with hearing impairments or those who prefer to consume content in different languages.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-video-caption/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/ai/","name":"Artificial Intelligence (AI)"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/ai/ai-video-caption/","name":"Automatic captioning for video uploads"}}]}
```
