> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Dubbing

## Overview

ElevenLabs [dubbing](/docs/eleven-creative/products/dubbing) translates audio and video across 90+ languages while preserving the emotion, timing, tone and unique characteristics of each speaker. Our model separates each speaker's dialogue from the soundtrack, allowing you to recreate the original delivery in another language. It can be used to:

* Grow your addressable audience by 4x to reach international audiences
* Adapt existing material for new markets while preserving emotional nuance
* Offer content in multiple languages without re-recording voice talent

We also offer a [fully managed dubbing service](https://elevenlabs.io/elevenstudios) for video and podcast creators.

## Usage

* **[Automatic Dubbing](https://elevenlabs.io/app/dubbing)** — Dub content from one language into another with a few clicks, powered by the latest Dubbing v2 Alpha model.
  * **Upload limits:** Up to 2 GB and 180 minutes
* **[Dubbing Studio](/docs/eleven-creative/products/dubbing/dubbing-studio)** — Granular control over your dubs, including transcript editing, speaker reassignment, and per-clip regeneration. Only available via the V1 model.
  * **Upload limits:** Up to 1 GB and 45 minutes
  * **Note:** Dubbing Studio is in maintenance mode and receives critical bug fixes only
* **Human-verified dubs via ElevenLabs Productions** — For more information, reach out to [productions@elevenlabs.io](mailto:productions@elevenlabs.io).

The Dubbing v2 API is not yet live but is expected to launch in the coming weeks.

Edit transcripts and translate videos step by step in Dubbing Studio.

Learn how to integrate dubbing into your application.

### Cloning strength

Cloning strength is the configurable setting in Automatic Dubbing on the Dubbing v2 Alpha model. The default value of 7 works well for most content. Higher values prioritize voice similarity to the original speaker, which can sound less natural across languages with very different phonetic characteristics. A higher setting can also carry over more of the original accent into the dubbed output. Lower values give the model more freedom for natural delivery in the target language at the cost of resemblance to the original voice.

### Key features

* **Speaker separation:** Automatically detect multiple speakers, even with overlapping speech.
* **Multi-language output:** Generate localized tracks in 90+ languages.
* **Preserve original voices:** Retain the speaker's identity and emotional tone.
* **Keep background audio:** Avoid re-mixing music, effects, or ambient sounds.
* **Supported file types:** Videos and audio can be dubbed from various sources, including YouTube, X, TikTok, Vimeo, direct URLs, or file uploads.

Dubbing v2 does not include a watermark toggle. Free-tier dubs are watermarked automatically;
paid-tier dubs are not. There is no watermark-for-credit-discount option on Dubbing v2. The legacy
V1 dubbing flow and Dubbing Studio were the only places where the watermark discount existed.

### Cost

Refer to our [pricing page](https://elevenlabs.io/pricing) for detailed credit costs.

## Supported languages

Supports 90+ languages including English, Spanish, French, German, Japanese, Chinese, Arabic, and more.

## Key facts

* **Dubbing v2** Alpha — Dubbing v2 is currently in alpha. You may encounter occasional rough edges as we continue to improve the model.
* **Content types:** All audio and video content types are supported; up to 9 unique speakers per file is recommended for best quality.
* **Speaker preservation:** Each speaker's tone, pace, and style is preserved in the target language.
* **Source separation:** Multiple overlapping speakers are isolated into separate tracks.
* **Concurrency:** All self-serve plans (Free, Starter, Creator, Pro, Scale, Business) allow up to 5 concurrent dubbing jobs. Enterprise plans default to 100 concurrent dubbing jobs. If you hit the limit, you will receive a `too_many_concurrent_requests` error and should wait for existing jobs to complete before starting new ones.

## FAQ

Realtime or live dubbing is not currently available.

If a Dubbing Studio job fails or you cancel it, the credits are automatically refunded to your
account. Dubbing v2 (priced per minute in US dollars on Automatic Dubbing) is not charged for
failed jobs. If a dub is stuck in Queued or Loading for an extended period, cancel and resubmit
it. You will not lose credits by doing so.

The Dubbing v2 API is not yet live but is expected to launch in the coming weeks.

Automatic Dubbing on the main [Dubbing](https://elevenlabs.io/app/dubbing) page uses Dubbing v2
by default. To use the legacy V1 dubbing model and the original dubbing dialog, click
**Advanced** and then **Use Legacy V1 Dubbing Model**. The legacy dialog includes the V1
watermark-for-credit-discount option and is the only way to reach Dubbing Studio from this page.