> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Dubbing

## Overview

**Dubbing** allows you to translate content across 90+ languages in seconds with voice translation, speaker detection, and audio dubbing.

Automatic dubbing or video translation is a process for translating and replacing the original audio of a video with a new language, while preserving the unique characteristics of the original speakers' voices.

The Dubbing v2 API is not yet live but is expected to launch in the coming weeks.

![Dubbing new project](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/8c0235c62183be7eabf87a0346600e94e3c5717ecb58f0207715894eb39c9f5e/assets/images/product-guides/dubbing/dubbing-new-project.webp)

## Guide

Go to [Dubbing](https://elevenlabs.io/app/dubbing) in your navigation menu.

Upload your video or audio file, or select the **Paste URL** tab to dub a video from YouTube,
TikTok, etc.

Choose the language, or languages, you want to dub into.

Click the **Advanced** settings to adjust speaker similarity. This setting controls how closely
your dubbed voice mimics the original speaker.

Click the generate button to submit your dub. You will be shown the cost and asked to confirm
your request.

Once your dub is ready, you'll be able to download it from your list of dubs.

![Dubbing new project advanced
settings](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/9515592460d4e2e6393e657c2743710b201c846ed0894c82343f55bde176b8fd/assets/images/product-guides/dubbing/dubbing-new-advanced.webp)

## Cloning strength

Cloning strength is the configurable setting in Automatic Dubbing on the Alpha model. The default value of 7 works well for most content.

* **Higher values** prioritize voice similarity to the original speaker, which can sound less natural across languages with very different phonetic characteristics. A higher setting can also carry over more of the original accent into the dubbed output.
* **Lower values** give the model more freedom for natural delivery in the target language at the cost of resemblance to the original voice.

## Legacy V1 dubbing

Automatic Dubbing on the main [Dubbing](https://elevenlabs.io/app/dubbing) page uses Dubbing v2 Alpha by default. To use the legacy V1 dubbing model and the original dubbing dialog, click **Advanced** and then **Use Legacy V1 Dubbing Model**. The legacy dialog includes the V1 watermark-for-credit-discount option and is the only way to reach Dubbing Studio from this page.

## FAQ

If a Dubbing Studio job fails or you cancel it, the credits are automatically refunded to your
account. Dubbing v2 (priced per minute in US dollars on Automatic Dubbing) is not charged for
failed jobs. If a dub is stuck in Queued or Loading for an extended period, cancel and resubmit
it. You will not lose credits by doing so.

Realtime or live dubbing is not currently available.

The Dubbing v2 API is not yet live but is expected to launch in the coming weeks.