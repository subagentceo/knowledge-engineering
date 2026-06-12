> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Voices

## Overview

ElevenLabs provides models for voice creation & customization. The platform supports a wide range of voice options, including voices from our extensive [Voice Library](https://elevenlabs.io/app/voice-library), voice cloning, and generated voices created using text prompts.

### Voice types

* **Community**: Voices shared by the community from the ElevenLabs [Voice Library](/docs/eleven-creative/voices/voice-library).
* **Cloned**: Custom voices created using Instant Voice Cloning or Professional Voice Cloning.
* **Voice Design**: Generated voices created with the [Voice Design](/docs/eleven-creative/voices/voice-design) tool.

Our Default voices are being replaced with new voices that you will be able to use in perpetuity.
All our Default voices will expire on December 31, 2026, and they will no longer be accessible
after this date.

#### Community

The [Voice Library](/docs/eleven-creative/voices/voice-library) contains over 10,000 voices shared by the ElevenLabs community. Use it to:

* Discover unique voices shared by the ElevenLabs community.
* Add voices to your personal collection.
* Share your own voice clones for cash rewards when other paid subscribers use it.

Share your voice with the community, set your terms, and earn cash rewards when others use it.
We've paid out over **\$14M** already.

Voice Library voices are not available via the API to free tier users.

Learn how to use voices from the Voice Library

#### Cloned

Clone your own voice from short audio samples with Instant Voice Cloning, or create realistic voices using Professional Voice Cloning.

* **Instant Voice Cloning**: Quickly clone a voice from short audio samples.
* **Professional Voice Cloning**: Generate professional-grade voice clones with extended training audio.

Voice-captcha technology is used to verify that Professional Voice Clones are created from your own voice samples.

A Creator plan or above is required to create Professional Voice Clones.

Learn how to create Instant Voice Cloning & Professional Voice Cloning

Clone a voice instantly

Create a realistic voice clone

#### Voice Design

With [Voice Design](/docs/eleven-creative/voices/voice-design), you can create entirely new voices by specifying attributes like age, gender, accent, and tone. Generated voices are ideal for:

* Realistic voices with nuanced characteristics.
* Creative character voices for games and storytelling.

Voice Design creates 3 voice previews. You just need to provide:

* A **voice description** between 20 and 1000 characters.
* Optional **text** to preview the voice, between 100 and 1000 characters.

##### Voice Design with Eleven v3

Using the [Eleven v3 model](/docs/overview/models#eleven-v3), voices that are capable of a wide range of emotion can be designed via a prompt.

Using v3 gives the following benefits:

* More natural and versatile voice generation.
* Better control over voice characteristics.
* Audio tags supported in Preview generations.
* Backward compatibility with v2 models.

Learn how to craft voices from a single prompt.

Integrate Voice Design into your application.

#### Voice Remixing

Voice Remixing allows you to transform voices you own by modifying their core attributes while maintaining their recognizable characteristics. You can adjust gender, accent, speaking style, pacing, and audio quality through natural language prompts. This feature is particularly useful for adapting voices to different contexts, creating character variations, or improving audio quality of existing voice profiles. Voice Remixing works with any cloned voice you personally own (Instant Voice Cloning or Professional Voice Cloning) or voices created through Voice Design.

Learn how to transform and enhance voices

Integrate Voice Remixing into your application

### Managing voices

All voices can be managed through [**My Voices**](https://elevenlabs.io/app/voice-lab), where you can:

* Search, filter, and categorize voices
* Add descriptions and custom tags
* Organize voices for quick access

Learn how to manage your voice collection in [My Voices documentation](/docs/eleven-creative/voices/voice-library#my-voices).

* **Search and Filter**: Find voices using keywords or tags.
* **Preview Samples**: Listen to voice demos before using them.
* **Add to Collection**: Save voices for easy access in your projects.

> **Tip**: Try searching by specific accents or genres, such as "Australian narration".

### Supported languages

All ElevenLabs voices support multiple languages. ElevenLabs supports voice creation in 32 languages. Match your voice selection to your target region for the most natural results.

* **Generated and Cloned Voices**: Accent fidelity depends on input samples or selected attributes.

Our multilingual v2 models support 29 languages:

*English (USA, UK, Australia, Canada), Japanese, Chinese, German, Hindi, French (France, Canada), Korean, Portuguese (Brazil, Portugal), Italian, Spanish (Spain, Mexico), Indonesian, Dutch, Turkish, Filipino, Polish, Swedish, Bulgarian, Romanian, Arabic (Saudi Arabia, UAE), Czech, Greek, Finnish, Croatian, Malay, Slovak, Danish, Tamil, Ukrainian & Russian.*

Flash v2.5 supports 32 languages - all languages from v2 models plus:

*Hungarian, Norwegian & Vietnamese*

[Learn more about our models](/docs/overview/models)

## Key facts

* **Instant Voice Cloning**: Created from short audio samples (less than two minutes); available on most plans
* **Professional Voice Cloning**: Requires extended training audio for highest fidelity; requires a Creator plan or above
* **Voice sharing**: Professional Voice Clones can be shared publicly in the Voice Library; Instant Voice Clones and Generated Voices cannot
* **Generated Voices**: Created from text descriptions via Voice Design — suited for unique characters in games, animations, and creative storytelling