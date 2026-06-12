> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Audio Native

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/46d22deceeb0c48519f5c98400269b282f6919dc7d8e97baec7e2ca4a215dc8c/assets/images/product-guides/audio-native/audio-native-product-feature.png" alt="Audio Native" />

## Overview

Audio Native is an embedded audio player that automatically voices content of a web page using ElevenLab’s [Text to Speech](/docs/eleven-creative/playground/text-to-speech) service. It can also be used to embed pre-generated content from a project into a web page. All it takes to embed on your site is a small HTML snippet. In addition, Audio Native provides built-in metrics allowing you to precisely track audience engagement via a listener dashboard.

The end result will be a Audio Native player that can narrate the content of a page, or, like in the case below, embed pre-generated content from a project:

<iframe width="100%" height="90" seamless src="https://elevenlabs.io/player/index.html?publicUserId=4d7f6f3d38ae27705f5b516ffd3e413a09baa48667073d385e5be1be773eaf69&projectId=gLj1spzTwuTgKuOtyfnX&small=true&textColor=rgba(0,%200,%200,%201)&backgroundColor=rgba(255,%20255,%20255,%201)" />

## Guide

In the ElevenLabs dashboard, under "Audio Tools" navigate to ["Audio Native"](https://elevenlabs.io/app/audio-native).

Customize the player appearance by selecting background and text colors.

The URL allowlist is the list of web pages that will be permitted to play your content.

You can choose to add a specific web page (e.g. `https://elevenlabs.io/blog`) or add a whole domain to the allowlist (e.g. `http://elevenlabs.io`). If a player is embedded on a page that is not in the allowlist, it will not work as intended.

Once you've finished configuring the player and allowlist, copy the embed code and paste it into your website's source code.

## Technology-specific guides

To integrate Audio Native into your web techology of choice, see the following guides:

## Using the API

You can use the [Audio Native API](/docs/api-reference/audio-native/create) to programmatically create an Audio Native player for your existing content.

```python title="Python"
from elevenlabs import ElevenLabs

elevenlabs = ElevenLabs(
api_key="YOUR_API_KEY",
)
response = elevenlabs.audio_native.create(
name="name",
)

# Use the snippet in response.html_snippet to embed the player on your website

```

```javascript title="JavaScript"
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({ apiKey: "YOUR_API_KEY" });
const { html_snippet } = await elevenlabs.audioNative.create({
    name: "my-audio-native-player"
});

// Use the HTML code in html_snippet to embed the player on your website
```

## Settings

### Voices

To configure the voice and model that will be used to read the content of the page, navigate to the "Settings" tab and select the voice and model you want to use.

### Pronunciation dictionaries

Sometimes you may want to specify the pronunciation of certain words, such as character or brand names, or specify how acronyms should be read. Pronunciation dictionaries allow this functionality by enabling you to upload a lexicon or dictionary file that includes rules about how specified words should be pronounced, either using a phonetic alphabet (phoneme tags) or word substitutions (alias tags).

Whenever one of these words is encountered in a project, the AI will pronounce the word using the specified replacement. When checking for a replacement word in a pronunciation dictionary, the dictionary is checked from start to end and only the first replacement is used.