> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# ElevenLabs Documentation

## How ElevenLabs works

ElevenLabs provides AI voice infrastructure: text-to-speech, speech-to-text, voice cloning, conversational agents, and generative audio. All capabilities are accessible through a REST API with official Python and TypeScript SDKs, and through a web application for no-code use.

**Voices** are the speech persona used in audio generation. Each voice has a unique ID — for example, `JBFqnCBsd6RMkjVDRZzb` — that you pass in every API request. ElevenLabs maintains a [library of 10,000+ voices](https://elevenlabs.io/app/voice-library). You can also clone a voice from an audio recording or generate one from a text description.

**Models** control the quality, latency, and language coverage of generated audio. [`eleven_v3`](/docs/overview/models) produces the most expressive output across 70+ languages. [`eleven_flash_v2_5`](/docs/overview/models) targets real-time use at \~75ms latency. Each capability — speech-to-text, music, sound effects — has its own dedicated model.

**Credits** are the unit of API consumption. Text-to-speech costs one credit per character of input text. Other operations are charged per second of audio processed. Credits reset monthly and unused credits roll over for up to two months. See [pricing](https://elevenlabs.io/pricing/api) for a full breakdown.

## Choose your path

<a href="/docs/eleven-creative/overview">
  <img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/12097a437e55f60c199946cf59c9528eb8349d110142394833d67fe93b50e68d/assets/images/overview/voice-library-bg.webp" alt="" />

  <h3>
    ElevenCreative
  </h3>

  <p>
    Learn how to use the ElevenCreative platform with step-by-step guides
  </p>
</a>

<a href="/docs/eleven-agents/overview">
  <img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/17a81505a62493491ead763b307b1e854825a0da67ab1a1d86b41b57ad87bc73/assets/images/agents/agents-overview-integrate.png" alt="" />

  <h3>
    ElevenAgents
  </h3>

  <p>
    Learn how to build, launch, and scale agents with ElevenLabs
  </p>
</a>

<a href="/docs/eleven-api/quickstart">
  <img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/002b2432fa6ab18befc9f1a6e7fadf348f46506a5a5a72a2358ba1e7f92d8ded/assets/images/overview/scribe-code-bg.webp" alt="" />

  <h3>
    ElevenAPI
  </h3>

  <p>
    Learn how to integrate with the ElevenLabs API with examples and tutorials
  </p>
</a>

## Meet the models

Our most emotionally rich, expressive speech synthesis model

Dramatic delivery and performance

70+ languages supported

5,000 character limit

Support for natural multi-speaker dialogue

Lifelike, consistent quality speech synthesis model

Natural-sounding output

29 languages supported

10,000 character limit

Most stable on long-form generations

Our fast, affordable speech synthesis model

Ultra-low latency (\~75ms†)

32 languages supported

40,000 character limit

Faster model, 50% lower price per character for API generations

State-of-the-art speech recognition model

Accurate transcription in 90+ languages

Keyterm prompting, up to 1000 terms

Entity detection, up to 56

Precise word-level timestamps

Speaker diarization, up to 32 speakers

Dynamic audio tagging

Smart language detection

Real-time speech recognition model

Accurate transcription in 90+ languages

Real-time transcription

Low latency (\~150ms†)

Precise word-level timestamps

<a href="/docs/overview/models">
  Explore all
</a>

<small>
  † Excluding application & network latency
</small>

## Browse by capability

Text to Speech

<p>
  Convert text into lifelike speech
</p>

Speech to Text

<p>
  Transcribe spoken audio into text
</p>

Music

<p>
  Generate music from text
</p>

Text to Dialogue

<p>
  Create natural-sounding dialogue from text
</p>

Image & Video

<p>
  Generate images and videos from text
</p>

Voice changer

<p>
  Modify and transform voices
</p>

Voice isolator

<p>
  Isolate voices from background noise
</p>

Dubbing

<p>
  Dub audio and videos seamlessly
</p>

Sound effects

<p>
  Create cinematic sound effects
</p>

Voices

<p>
  Clone and design custom voices
</p>

Voice Remixing

<p>
  Transform and enhance existing voices
</p>

Forced Alignment

<p>
  Align text to audio
</p>

ElevenAgents

<p>
  Deploy intelligent voice agents
</p>