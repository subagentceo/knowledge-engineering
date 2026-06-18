---
title: iOS (AVPlayer)
description: Example of video playback on iOS using AVPlayer
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# iOS (AVPlayer)

**Last reviewed:**  almost 4 years ago 

Example of video playback on iOS using AVPlayer

Note

Before you can play videos, you must first [upload a video to Cloudflare Stream](https://developers.cloudflare.com/stream/uploading-videos/) or be [actively streaming to a live input](https://developers.cloudflare.com/stream/stream-live)

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

### Download and run an example app

1. Download [this example app ↗](https://developer.apple.com/documentation/avfoundation/offline%5Fplayback%5Fand%5Fstorage/using%5Favfoundation%5Fto%5Fplay%5Fand%5Fpersist%5Fhttp%5Flive%5Fstreams) from Apple's developer docs
2. Open and run the app using [Xcode ↗](https://developer.apple.com/xcode/).
3. Search in Xcode for `m3u8`, and open the `Streams` file
4. Replace the value of `playlist_url` with the HLS manifest URL for your video.
![Screenshot of a video with Cloudflare watermark at top right](https://developers.cloudflare.com/_astro/ios-example-screenshot-edit-hls-url.CK2bGBBG_ZFwMz1.webp) 
1. Click the Play button in Xcode to run the app, and play your video.

For more, see [read the docs](https://developers.cloudflare.com/stream/viewing-videos/using-own-player/ios/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/examples/ios/#page","headline":"iOS (AVPlayer) · Cloudflare Stream docs","description":"Example of video playback on iOS using AVPlayer","url":"https://developers.cloudflare.com/stream/examples/ios/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Playback"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/examples/ios/","name":"iOS (AVPlayer)"}}]}
```
