---
title: Shaka Player
description: Example of video playback with Cloudflare Stream and Shaka Player
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Shaka Player

**Last reviewed:**  over 3 years ago 

Example of video playback with Cloudflare Stream and Shaka Player

First, create a video element, using the poster attribute to set a preview thumbnail image. Refer to [Display thumbnails](https://developers.cloudflare.com/stream/viewing-videos/displaying-thumbnails/) for instructions on how to generate a thumbnail image using Cloudflare Stream.

```

<video

  id="video"

  width="640"

  poster="https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/thumbnails/thumbnail.jpg"

  controls

  autoplay

></video>


```

Then listen for `DOMContentLoaded` event, create a new instance of Shaka Player, and load the manifest URI.

JavaScript

```

// Replace the manifest URI with an HLS or DASH manifest from Cloudflare Stream

const manifestUri =

  'https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.mpd';


document.addEventListener('DOMContentLoaded', () => {

  const video = document.getElementById('video');

  const player = new shaka.Player(video);

  await player.load(manifestUri);

});


```

Refer to the [Shaka Player documentation ↗](https://github.com/shaka-project/shaka-player) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/examples/shaka-player/#page","headline":"Shaka Player · Cloudflare Stream docs","description":"Example of video playback with Cloudflare Stream and Shaka Player","url":"https://developers.cloudflare.com/stream/examples/shaka-player/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Playback"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/examples/shaka-player/","name":"Shaka Player"}}]}
```
