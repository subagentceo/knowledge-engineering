---
title: iOS
description: Stream on-demand and live Cloudflare Stream video in native iOS, tvOS, and macOS apps using AVPlayer.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# iOS

You can stream both on-demand and live video to native iOS, tvOS and macOS apps using [AVPlayer ↗](https://developer.apple.com/documentation/avfoundation/avplayer).

Note

Before you can play videos, you must first [upload a video to Cloudflare Stream](https://developers.cloudflare.com/stream/uploading-videos/) or be [actively streaming to a live input](https://developers.cloudflare.com/stream/stream-live)

## Example Apps

* [iOS](https://developers.cloudflare.com/stream/examples/ios/)

## Using AVPlayer

Play a video from Cloudflare Stream using AVPlayer:

Swift

```

import SwiftUI

import AVKit


struct MyView: View {

    // Change the url to the Cloudflare Stream HLS manifest URL

    private let player = AVPlayer(url: URL(string: "https://customer-9cbb9x7nxdw5hb57.cloudflarestream.com/8f92fe7d2c1c0983767649e065e691fc/manifest/video.m3u8")!)


    var body: some View {

        VideoPlayer(player: player)

            .onAppear() {

                player.play()

            }

    }

}


struct MyView_Previews: PreviewProvider {

    static var previews: some View {

        MyView()

    }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/viewing-videos/using-own-player/ios/#page","headline":"iOS · Cloudflare Stream docs","description":"Stream on-demand and live Cloudflare Stream video in native iOS, tvOS, and macOS apps using AVPlayer.","url":"https://developers.cloudflare.com/stream/viewing-videos/using-own-player/ios/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/viewing-videos/","name":"Play video"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/viewing-videos/using-own-player/","name":"Use your own player"}},{"@type":"ListItem","position":5,"item":{"@id":"/stream/viewing-videos/using-own-player/ios/","name":"iOS"}}]}
```
