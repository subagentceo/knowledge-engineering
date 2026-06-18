---
title: Add player enhancements
description: Customize the Cloudflare Stream player with branding, logos, and share links.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add player enhancements

With player enhancements, you can modify your video player to incorporate elements of your branding such as your logo, and customize additional options to present to your viewers.

The player enhancements are automatically applied to videos using the Stream Player, but you will need to add the details via the `publicDetails` property when using your own player.

## Properties

* `title`: The title that appears when viewers hover over the video. The title may differ from the file name of the video.
* `share_link`: Provides the user with a click-to-copy option to easily share the video URL. This is commonly set to the URL of the page that the video is embedded on.
* `channel_link`: The URL users will be directed to when selecting the logo from the video player.
* `logo`: A valid HTTPS URL for the image of your logo.

## Customize your own player

The example below includes every property you can set via `publicDetails`.

Terminal window

```

curl --location --request POST "https://api.cloudflare.com/client/v4/accounts/<$ACCOUNT_ID>/stream/<$VIDEO_UID>" \

--header "Authorization: Bearer <$SECRET>" \

--header 'Content-Type: application/json' \

--data-raw '{

    "publicDetails": {

        "title": "Optional video title",

        "share_link": "https://my-cool-share-link.cloudflare.com",

        "channel_link": "https://www.cloudflare.com/products/cloudflare-stream/",

        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cloudflare_Logo.png/480px-Cloudflare_Logo.png"

    }

}' | jq ".result.publicDetails"


```

Because the `publicDetails` properties are optional, you can choose which properties to include. In the example below, only the `logo` is added to the video.

Terminal window

```

curl --location --request POST "https://api.cloudflare.com/client/v4/accounts/<$ACCOUNT_ID>/stream/<$VIDEO_UID>" \

--header "Authorization: Bearer <$SECRET>" \

--header 'Content-Type: application/json' \

--data-raw '{

    "publicDetails": {

        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cloudflare_Logo.png/480px-Cloudflare_Logo.png"

    }

}'


```

You can also pull the JSON by using the endpoint below.

`https://customer-<ID>.cloudflarestream.com/<VIDEO_ID>/metadata/playerEnhancementInfo.json`

## Update player properties via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Videos** page.  
[ Go to **Videos** ](https://dash.cloudflare.com/?to=/:account/stream/videos)
2. Select a video from the list to edit it.
3. Select the **Public Details** tab.
4. From **Public Details**, enter information in the text fields for the properties you want to set.
5. When you are done, select **Save**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/edit-videos/player-enhancements/#page","headline":"Add player enhancements · Cloudflare Stream docs","description":"Customize the Cloudflare Stream player with branding, logos, and share links.","url":"https://developers.cloudflare.com/stream/edit-videos/player-enhancements/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/edit-videos/","name":"Edit videos"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/edit-videos/player-enhancements/","name":"Add player enhancements"}}]}
```
