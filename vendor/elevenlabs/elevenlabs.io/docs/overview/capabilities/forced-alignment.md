> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Forced Alignment

## Overview

The ElevenLabs [Forced Alignment](/docs/api-reference/forced-alignment/create) API turns spoken audio and text into a time-aligned transcript. This is useful for cases where you have audio recording and a transcript, but need exact timestamps for each word or phrase in the transcript. This can be used for:

* Matching subtitles to a video recording
* Generating timings for an audiobook recording of an ebook

## Usage

The Forced Alignment API can be used by interfacing with the ElevenLabs API directly.

Learn how to integrate Forced Alignment into your application.

Full API reference for the Forced Alignment endpoint.

## Supported languages

Our multilingual v2 models support 29 languages:

*English (USA, UK, Australia, Canada), Japanese, Chinese, German, Hindi, French (France, Canada), Korean, Portuguese (Brazil, Portugal), Italian, Spanish (Spain, Mexico), Indonesian, Dutch, Turkish, Filipino, Polish, Swedish, Bulgarian, Romanian, Arabic (Saudi Arabia, UAE), Czech, Greek, Finnish, Croatian, Malay, Slovak, Danish, Tamil, Ukrainian & Russian.*

## Key facts

* **Input text format**: Plain string only — do not wrap input text in JSON or any other structure
* **Diarization**: Not supported; providing diarized text will produce unexpected results
* **Pricing**: Same rate as the [Speech to Text API](https://elevenlabs.io/pricing/api?price.section=speech_to_text#pricing-table)
* **Maximum file size**: 3 GB
* **Maximum audio duration**: 10 hours
* **Maximum text length**: 675,000 characters