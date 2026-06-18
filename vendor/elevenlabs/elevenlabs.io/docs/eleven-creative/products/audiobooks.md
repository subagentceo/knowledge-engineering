> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Audiobooks

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/d66167d5a9f0a41adc461dc06a6a6fd12813044bfbe44f4621cea93a1b8a0242/assets/images/product-guides/studio/audiobooks-new-project.png" alt="Audiobooks" title="audiobooks-new-project" />

## Overview

Audiobooks provides an end-to-end workflow for turning written content into studio-quality audio.

You can paste or upload your manuscript, generate lifelike narration using ElevenLabs voices, and structure your project with chapters. Enhance your audiobook with music and sound effects, and edit and refine narration directly in the editor.

Once complete, you can export your audiobook or publish it directly to listening platforms such as ElevenReader and partner marketplaces.

Audiobooks also supports dynamic narration, a mode that allows listeners to choose their preferred voice during playback.

## Guide

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/6f40fdd9e48caf899c67599e82c64a3a2e09b1f2d87cd2af75e168ab62f516f7/assets/images/product-guides/studio/audiobooks-create-new-book.png" alt="Audiobooks - create new book" title="audiobooks-create-new-book" />

Click **Create new book** from the Audiobooks page to start a new project.

After opening the editor, you can begin by:

* uploading a document
* pasting text directly
* importing content from a URL

Use the **Chapters** panel to structure your audiobook.

* Click the **+** button to add new chapters
* Rename and reorder chapters as needed
* If you upload a document with chapters, they will be detected automatically

Select a chapter and use the **Play** button in the player to generate or preview narration.

* If narration has already been generated, the **Play** button will play existing audio without using credits
* If narration has not yet been generated, audio will be created during playback, which will cost credits

Narration is generated at the paragraph level within each chapter.

#### Playback modes

You can choose how playback and generation behave using the mode selector to the left of the Play button:

* **Selection** — plays or generates audio only for the selected paragraph
* **Until end (generate one at a time)** — plays from the selected paragraph to the end of the chapter, generating one paragraph at a time
* **Until end (generate clips ahead)** — plays from the selected paragraph to the end of the chapter, generating multiple paragraphs ahead for smoother playback

Playing already generated audio does not consume credits. Credits are only used when generating new narration.

You can enrich your audiobook with additional audio layers:

* **Voices** — choose or update the narration voice
* **Sound effects (SFX)** — add effects from the library or generate custom sounds
* **Music** — select from the Music Marketplace or generate new tracks

To add music or sound effects:

* Click the **+** icon to import them into your project
* They will appear as separate tracks on the timeline and play alongside narration

Audiobooks supports two narration modes:

* **Original audio** — narration is pre-generated using a selected voice
* **Dynamic narration** — listeners can choose their preferred voice during playback

To switch modes, open the project status panel from the top right of the editor and click **Change mode**.

In dynamic narration mode, music, sound effects, and external audio are not included in playback.

To export your audiobook, click **Publish** in the top right corner and open the **Export** tab.

You can configure:

* **Export scope** — full project or individual chapters
* **Media type** — audio, timeline data (AAF), or subtitles
* **File structure** — single file or chapter-based ZIP
* **Audio format** — MP3 or WAV

If some sections are not yet generated, they will be completed during export.

To distribute your audiobook, click **Publish** in the top right corner and stay on the **Publish** tab.

You can publish directly to:

* **ElevenReader** — for in-app listening and distribution
* **Partner platforms** such as Spotify and InAudio
* **ElevenLabs Video** or **Audio Native** for additional formats

Publishing allows you to share your audiobook with listeners and, on supported platforms like ElevenReader, start earning from distribution.

When publishing to ElevenReader, you will go through a submission flow to prepare your audiobook for distribution.

This includes:

* Creating or selecting an author profile
* Adding book metadata (title, subtitle, cover image)
* Providing distribution details
* Setting up payouts and agreements
* Reviewing and submitting your audiobook

After submission, your audiobook will be reviewed before becoming available in the ElevenReader app.

## Editing and playback

Once your content is added, you can generate and preview narration directly in the editor.

* Use the **Play** button to generate narration or play already generated audio
* Generation happens at the paragraph level within each chapter

The status of each paragraph is shown by a bar to the left of the text:

* **Dark bar** — narration has been generated
* **Light grey bar** — narration has not yet been generated

You can edit text, adjust voice settings, or change timing, and then regenerate specific sections as needed.

The timeline allows you to review how narration, music, and sound effects play together and make adjustments before exporting.

## Voice and model settings

You can customize how your audiobook sounds using **voice and model settings** in the editor sidebar and project settings.

* **Voice** — selects the narrator used for your audiobook
* **Model** — determines speech quality, expressiveness, and supported languages

You can change these in two places:

* **Editor sidebar** — apply settings to selected paragraphs or sections
* **Project settings** — set default voice and model for the entire project

To access project-level settings, open the menu in the top-left corner and select **Project settings**.

ElevenLabs supports multiple speech models with different strengths:

* **Eleven v3** — most expressive model with broad language support (requires more prompt control)
* **Eleven Multilingual v2** — high-quality, natural narration (default for most audiobook use cases)
* **Eleven Flash models** — optimized for speed and lower latency

You can switch models at any time. However:

Changing the model does not update already generated audio — you will need to regenerate affected paragraphs, which will use credits.

When creating a new audiobook:

* The default model is **Eleven Multilingual v2**
* The default voice is selected automatically (can be changed anytime)
* The default language is set to **automatic detection**

When working inside the editor, you can override voice settings for specific paragraphs. Enable **Override settings** in the sidebar to adjust delivery without affecting the entire project

The contextual sidebar includes playback controls for fine-tuning narration:

* **Volume** — adjust loudness
* **Fade in / Fade out** — control how audio starts and ends

These settings apply to the selected paragraph.

The sidebar also provides AI-powered tools to improve your audiobook:

* **Enhance text** — refine text to improve delivery and clarity
* **Remove background audio** — clean up audio using voice isolation
* **Use voice changer** — modify the voice in existing audio
* **Direct speech with your voice** — record reference audio to guide delivery (Actor Mode)

Audio quality is automatically determined by your subscription plan and project settings, and does not affect credit usage.

To check the exact output quality for your project, click **Publish** in the top-right corner, open the **Export** tab, and hover over the **Audio format** field to see details such as bitrate and sample rate.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/b812960229644047965dd935ffc1fe79a6bbe1aaf930b3fdbf977b313479c8b0/assets/images/product-guides/studio/audiobooks-publish.png" alt="Publish your audiobook" title="audiobooks-publish" />

### Important behavior

If you change voice or model settings after generating audio:

* Existing paragraphs will not update automatically
* You must regenerate audio for changes to take effect, which will use credits

### Contextual sidebar

The contextual sidebar updates based on what you select in your project.

For narration, it provides:

* Playback controls
* Voice and model selection
* Override settings
* Generation history
* AI tools

This allows you to adjust and refine narration at a very granular level.

### Pronunciation dictionaries

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/116b9e87ac11971f051aace66ee692f858509cb2e57abbd82d6422fe83333259/assets/images/product-guides/studio/audiobooks-pronunciation_dictionaries.png" alt="Audiobooks - pronunciation dictionaries" title="audiobooks-pronunciation_dictionaries" />

You can control how specific words are spoken using pronunciation dictionaries.

This is useful for:

* Character names
* Brand names
* Acronyms
* Uncommon or ambiguous words

Pronunciation dictionaries let you define how words should be read using:

* **Phoneme rules** — specify pronunciation using phonetic notation
* **Aliases** — replace a word with another spelling that produces the desired pronunciation

When a word in your text matches a rule in a connected dictionary, the system will use your defined pronunciation.

#### How to use pronunciation dictionaries

1. Open the **Pronunciations Editor** from the toolbar
2. Create a new dictionary or select an existing one
3. Add entries for words you want to control
4. Click **Connect** to apply the dictionary to your project

You can also upload a dictionary file or manage all dictionaries from the Pronunciations Editor.

#### Important notes

* Dictionaries are applied in order — the **first matching rule is used**
* Changes apply only to newly generated audio. You must **regenerate paragraphs** to hear updates
* Phoneme rules are only supported on English models, e.g. Flash v2

Pronunciation dictionaries are especially helpful for maintaining consistency across long audiobooks.

## Chapters

Audiobooks are structured into chapters, which can be created manually or detected automatically when importing a document.

You can:

* Add new chapters using the **+** button
* Rename or reorder chapters
* Generate narration per chapter

Chapters help organize longer content and make exporting more flexible.

## Narration modes

Audiobooks supports two different narration approaches depending on your goals.

### Original audio

Audio is generated in advance using a selected voice and remains fixed for all listeners.

This mode is best when you want full control over:

* Voice selection
* Timing and delivery
* Music and sound design

### Dynamic narration

Instead of using a fixed voice, dynamic narration allows listeners to choose their preferred voice during playback.

This mode is ideal for:

* Accessibility
* Personalization
* Listener preference

Music, sound effects, and external audio are not included in dynamic narration playback.

## Export options

Audiobooks provides flexible export options depending on how you want to use your content.

* Full project
* Individual chapters

- Audio
- Timeline data (AAF)
- Subtitles

* Single file
* Chapter-based ZIP

- MP3
- WAV

Exporting will automatically generate any remaining sections before downloading.

## Organizing your audiobooks with series

You can group multiple audiobooks into a series to organize related content and improve discoverability.

To create a series:

1. Go to your **Bookshelf**
2. Click the **Create series** button (top-right)
3. Enter:
   * **Series name**
   * **Description**
   * **Author profile**
   * **Language**
4. Optionally add existing books to the series
5. Click **Create Series**

## FAQ

No. If some sections are not yet generated, they will be completed automatically during export, which will use credits.

Generated narration produces a fixed audio file using a selected voice. Dynamic narration allows
listeners to choose their preferred narrator's voice during playback.

Yes. You can distribute your audiobook across multiple platforms, including ElevenReader and supported partner marketplaces.