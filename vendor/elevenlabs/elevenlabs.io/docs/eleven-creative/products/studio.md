> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# ElevenCreative Studio

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/15dea5969c5aa5e8209a420f41fe58f1493e5075f2450d27d5c425224cc45136/assets/images/product-guides/studio/studio-hero.webp" alt="Studio hero" />

## Overview

ElevenCreative Studio provides an end‑to‑end workflow for creating video and audio content.

With ElevenCreative Studio 3.0, you can build projects on a timeline featuring tracks for video, captions, narration, music, and sound effects. The interface allows for fine-tuning timing down to individual sentences and includes AI tools for script enhancement and voice changing. Once your project is ready, you can use our sharing and commenting systems to collaborate seamlessly with your team.

Finally, you can export your work in various audio formats (per chapter or whole project) or as a video if a video track was included.

ElevenCreative Studio supports our latest speech models, including v3. You can switch models at
any time in **Project settings**.

## Guide

Select one of the starting options at the top of the ElevenCreative Studio page.

Follow the instructions in the pop-up and click **Create**.

Add video, narration, music, and sound effects to your project using our timeline editor.

Click the **Share** button to share your project and collect feedback from teammates.

Click the **Export** button to export the project as audio or video.

You can use our [Audio Native](/docs/eleven-creative/audio-tools/audio-native) feature to easily
and effortlessly embed any ElevenCreative Studio audio project onto your website.

## Starting options

Some settings are automatically selected by default when you create a new project.

The default model is Multilingual v2 for most new projects. You can also choose other models, including v3, in **Project Settings**.

The quality setting is automatically selected depending on your subscription plan, and will not increase your credit usage.

* For free, Starter and Creator subscriptions the quality will be 128 kbps MP3, or WAV generated from 128 kbps source.
* For Pro, Scale, Business and Enterprise plans, the quality will be 16-bit, 44.1 kHz WAV, or 192 kbps MP3 (Ultra Lossless).

Video exports on free and Starter plans include a watermark. To export videos without a watermark,
you need a Creator plan or above.

## Quick Start

At the top right of the Studio page, you'll find two buttons to quickly start a new project.

#### Upload

**Upload** a file to start from existing media. We’ll analyze it and choose the best layout automatically: text or audio uploads open in the audio layout; video files open in the video layout with the timeline and captions available.

#### Start a project from scratch

Click **+ New blank project** to create a blank project, either audio or video, and begin building your content from scratch. Add voices, video, music, and sound effects from the timeline.

## Get started

Below the quick start buttons, a scrollable row of **Get started** options provides pre-built templates for common video and audio workflows. Each card is a guided workflow designed for a specific task — select one and a step-by-step wizard will walk you through the setup so you don't have to configure everything from scratch. Scroll through the row to browse all available templates.

The first five options are video templates for tasks like creating faceless videos, adding captions, dubbing, voiceovers, and generating soundtracks. The last card, **Generate audio**, opens the audio menu with options for podcasts, article narration, script generation, and more.

### Video

#### **Create faceless video**

A guided wizard walks you through four steps:

1. Choose a template — select a category that matches your video content style.
2. Pick a video — choose or generate visuals for your project.
3. Add a voiceover — select a voice and configure narration.
4. Select captions — choose a caption style for your video.

#### **Add captions**

Add automatic captions to your video. Upload a video file (.mp4, .mov, .avi, .mkv, .webm, .m4v, .flv, .wmv), then select a caption style. Your video will open in the editor with captions ready to customize.

#### Change the language of your video.

Upload a video file, configure audio and language settings (source language and target language), then select captions. Your video will be dubbed into the chosen language.

#### Add speech to your video.

Upload a video file (.mp4, .mov, .avi, .mkv, .webm, .m4v, .flv, .wmv), add a voiceover with your chosen voice, and optionally select captions. Your video will open in the editor with the voiceover track ready.

#### Auto-generate music that matches your video.

Upload a video file (.mp4, .mov, .avi, .mkv, .webm, .m4v, .flv, .wmv), provide a description of the music style you want, then preview the generated soundtrack before applying it to your project.

### Audio

Clicking the **Generate audio** option opens the **Long-form audio** menu with five options for creating audio content in Studio.

#### Generate a Podcast

Auto-generate a podcast from documents or URLs. A guided wizard walks you through three steps:

1. Select source — choose where to import your content from for the podcast. You can upload a document (.epub, .pdf, .txt, .html, .docx, .xml, .fdx), import a URL, or use an existing project.
2. Audio settings — configure the audio output for your podcast.
3. Preferences — set additional preferences for the generated podcast.

With this option, GenFM will generate a new script from your source. If you want to keep your
script unchanged, use **New audiobook** or **Start audio project from scratch**.

#### Narrate the article

Turn any webpage or document into spoken audio. You can import a URL or upload a document. Select a default voice for your project and optionally enable **Auto-assign voices** (Alpha) to automatically detect characters and assign matching voices to them. This process can take significant time for longer content. Click **Create project** when ready.

#### **Generate a script**

Generate a script from a prompt. Describe the script or story you want to generate, then click **Generate**. Review the script, make edits, and start a new audio project from it.

#### **Narrate an audiobook**

Create a full audiobook from your manuscript. This option takes you to the dedicated **Audiobooks** feature.

### Start from scratch.

Create a blank audio project and begin writing your script. Add voices, music, and sound effects from the timeline.

## Studio Agent

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/9deebc3565104137894ad754e79b7b10887c0f28bb92842df3f93d65d33595c3/assets/images/product-guides/studio/studio-agent.webp" alt="Studio Agent" title="Studio Agent" />

### Overview

Studio Agent is a conversational AI co-editor built directly into the ElevenCreative Studio timeline.

Studio Agent is only available in Video projects.

Describe what you want to create, upload files or pull from past generations, and the agent asks clarifying questions, such as video length, tone, structure, and transitions, before building a first draft on the timeline. It places clips, voiceovers, voices, sound effects, and captions so you can go from idea to rough cut through conversation. You keep full manual control: you can take over at any point to make edits, then hand control back whenever you like.

### Key features

**Analyze Clips**

Builds a frame-level map of your video so the agent understands what is happening in the footage. This allows you to give natural-language instructions like "add a swoosh when the logo appears" and have audio placed at the precise visual moment — no manual scrubbing required.

**In-chat asset discovery**

Search, preview, and place voice models and sound effects directly from within the chat. No need to leave the conversation to browse the Voice Library or Sound Effects catalog.

**Model selection and confirmation**

The agent selects from five predefined image models and five predefined video models. It picks the model that best fits your brief based on the conversation. When it prompts you to confirm generation, you can choose a different model before the run proceeds.

### Plan and Create modes

The agent operates in two distinct modes, switched using the toggle at the top of the editor.

**Create mode** is where the agent edits the timeline directly — inserting clips, generating media, applying text overlays, and adjusting audio. Use this mode when you are ready to execute.

**Plan mode** is where the agent outlines its approach without making any changes to your timeline. Use this to review what the agent intends to do before committing.

In Plan mode the agent can still:

* Analyze footage and transcribe speech
* Search assets and voice models
* Draft scripts and scene plans
* Map out complex timeline edits and calculate gap management
* Provide platform-specific guidance for TikTok, YouTube, and Instagram

### Manual control

Studio Agent does not replace manual editing. You can take over the timeline at any point to make adjustments, then hand control back to the agent. Manual and agent-assisted editing work side by side throughout your workflow.

### Limits and file handling

**File size**

There is no agent-specific file size limit.

**Availability**

Studio Agent is available on web only. API access is not available.

### Pricing

Studio Agent is available on all plans. Chat usage is billed based on token consumption across five categories: **input**, **output**, **thinking**, **cache-read**, and **cache-write**. The total cost depends on how much you consume in each category during the conversation; there is no fixed price per interaction.

Speech, image, music, sound effects, and video generation are billed at the standard rates for those capabilities. Commercial usage rights are determined by your subscription plan, consistent with other ElevenLabs products.

Standard subscription plans are charged in credits, while Enterprise plans may use fiat billing. [Contact our Enterprise Sales team](https://elevenlabs.io/enterprise) to learn more.

To upgrade your plan, visit your [Subscription page](https://elevenlabs.io/app/subscription).

## Generating and Editing

Once you've added content, either by importing it or creating it yourself, you can use the **Export**
button to render your chapter or project in one step. Narration will be generated where needed, and the output will be audio or video depending on your tracks and settings.

![Export your project](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/1fa385f21b435fa915e1cecfd34309b8695a208fdbabd8ab9e9f823dca1a9744/assets/images/product-guides/studio/studio-export.webp)

This will automatically generate and download an audio or video file, but you can still edit your project after this.

Once you've finished editing, you will need to use the **Export** button again to generate and download a new
version of your project that includes the updated media.

#### Timeline and tracks

![Studio timeline editing](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/9b700138300740db9507fbd4fe4f0ca16cdd917eae6705e84d5764eef2e9aa6c/assets/images/product-guides/studio/studio-timeline-editing.webp)

The timeline gives you a chapter‑wide view of your project so you can see narration, music, SFX, and video at a glance.

You can adjust timing between paragraphs and even individual sentences, trim clip edges, split and duplicate clips to iterate quickly, and zoom or pan to navigate longer chapters. Waveforms help you visualize loudness so you can align levels precisely across tracks.

#### Contextual sidebar

The **Contextual sidebar** shows tools and details for the currently selected item in your project.

This panel shows tools and details for the selected item. For narration, you'll see **Playback controls** (Volume, Fade In, Fade Out), Type, Model, Voice (with an Override settings toggle to change settings for just the current selection), and **Generation History**. Below that, an AI Tools section provides quick access to:

* **Enhance text** — refine your text to help guide delivery.
* **Remove background audio** — use voice isolator to clean up audio.
* **Use voice changer** — modify the voice in existing audio.
* **Direct speech with your voice** — record audio with your own voice to guide delivery (Actor Mode).

For media clips (audio, music, SFX, or video), the panel shows relevant clip properties and actions.

#### Chapters sidebar

When you create an ElevenCreative Studio project using the **New audio project** option and import a document that includes chapters, chapters will be automatically detected.

To manage chapters in an existing project, click on the **Chapters** tab.

You can add a new chapter using the **+** button. You can also rename and remove chapters using the **Chapter actions** (three dots) button, and drag and drop the chapters to rearrange them.

#### Generate/Regenerate

The **Generate** button will generate audio if you have not yet generated audio for the selected text, or will generate new audio if you have already generated audio. This will cost credits.

If you have made changes to the paragraph such as changing the text or the voice, then the paragraph will lose its converted status, and will need to be generated again.

The status of a paragraph (converted or unconverted) is indicated by the bar to the left of the paragraph. Unconverted paragraphs have a pale grey bar while converted paragraphs have a dark grey bar.

If the button says **Regenerate**, then this means that you won't be charged for the next generation. You're eligible for two free regenerations provided you don't change the voice or the text.

This action applies to narration and other generated speech. Timeline items like video, external audio, music, SFX, and captions are arranged on the timeline and rendered when you export.

#### Play

You can use the **Play** button in the player at the bottom of the ElevenCreative Studio interface to play audio that has already been generated, or generate audio if a paragraph has not yet been converted. Generating audio will cost credits. If you have already generated audio, then the **Play** button will play the audio that has already generated and you won't be charged any credits. There are three modes when using the **Play** button. **Until end (generate clips ahead)** will play existing audio, or generate new audio for paragraphs that have not yet been generated, from the selected paragraph to the end of the current chapter, generating multiple clips ahead. **Until end (generate one at a time)** will play existing audio or generate new audio from the selected paragraph to the end of the current chapter, but generates only one clip at a time. **Selection** will play or generate audio only for the selected paragraph. When a video track is present, the player also previews video in sync with the playhead. Playing existing audio or video never consumes credits; only generating narration does.

#### Generation history

The generation history for a paragraph appears in the contextual sidebar when the paragraph is selected. This shows all the previously generated audio for the selected paragraph, allowing you to listen to and download each individual generation.

If you prefer an earlier version of a paragraph, you can use the **Restore generation** button to return to the selected version. You can also remove generations, but be aware that if you remove a version, this is permanent and you can't restore it.

**Generation history** applies to narration generations. It doesn't track imported media (external audio, music, SFX) or video clips.

#### Undo and Redo

If you accidentally make a change, you can use the **Undo** button to restore the previous version, and the **Redo** button to restore the change.

#### Breaks

You can add a pause by using the **Insert break** button. This inserts a break tag. By default, this will be set to 1 second, but you can change the length of the break up to a maximum of 3 seconds.

For precise timing, prefer the timeline with trimming and sentence‑level control. Some newer
models may reduce or ignore break tags in favor of natural flow.

Breaks affect generated speech delivery only; they don't move or pause other timeline tracks. Use the timeline to create precise pauses across music, SFX, and video.

#### Actor Mode

**Actor Mode** allows you to specify exactly how you would like a section of text to be delivered by uploading a recording, or by recording yourself directly. You can either highlight a selection of text that you want to work on, or select a whole paragraph. Once you have selected the text you want to use Actor Mode with, click **Direct speech with your voice** from the **AI Tools** section of the sidebar, and the **Actor Mode** pop-up will appear.

For an overview of Actor Mode, see [this video](https://www.youtube.com/watch?v=Kj2dgXITrPw).

![Actor Mode pop-up](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/8468aa50ffb04f6460e535a9693b59f09354836609d104f62b1549d5d8a181a1/assets/images/product-guides/studio/studio-actor-mode-popup.webp)

Either upload or record your audio, and you will then see the option to listen back to the audio or remove it. You will also see how many credits it will cost to generate the selected text using the audio you've provided.

![Actor Mode pop-up](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/71dccdcc6f102001b78f75972202e8e8964c20318c1bbfbe9188d7ed06bd3b42/assets/images/product-guides/studio/studio-actor-mode-popup-2.webp)

If you're happy with the audio, click **Generate**, and your audio will be used to guide the delivery of the selected text.

Actor Mode will replicate all aspects of the audio you provide, including the accent.

#### Video track and voiceovers

![Studio video track](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/0941dee25f9cff9bb94fccb9fb947b18f3335c2465fb51c7f04ebfe63c71b865/assets/images/product-guides/studio/studio-video-track.webp)

Add a **video track** to voice over existing footage or to pair narration with b‑roll. Import a video file or add a blank track, then align the narration to key visual beats on the timeline. When needed, enable **captions** and choose a **template** to match your style.

#### Captions

![Studio caption templates](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/39bfa2a25125691d8ab3775b2bc12e332f86b0c308259520c747eedf54eaa6c4/assets/images/product-guides/studio/studio-caption-templates.webp)

Convert narration into styled captions for accessibility and engagement. Captions are generated automatically and can be customized with templates for colors, fonts, and placement. Edit text and timing directly on the timeline to correct any mismatches, then export your video with burned‑in captions.

#### Files

Upload or record audio files for your project. You can drag and drop files into the panel, click **Upload file**, or use the **Record** button to capture audio directly. Toggle between **This project** and **Workspace** to browse files. Uploaded audio cannot be published to distribution platforms.

![Insert audio](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/aa8200aa951210ff95bf59c5e8641ec78b761c5267e7906329065796283c5616/assets/images/product-guides/studio/studio-audio.webp)

#### Music

Generate music directly in ElevenCreative Studio and place it on its own track in the timeline. Create new songs from prompts (choose a vibe and length) or import existing tracks. Music clips can be trimmed duplicated and moved to match the narration, and you can adjust volume per clip. When the source is stereo, stereo is preserved.

![Insert music](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/b88b6ddc5576d0f4af3e94cdce222477588909eff93d2afb9513f5a3019e4378/assets/images/product-guides/studio/studio-music.webp)

#### Sound effects

![Insert sound effect](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/abe0c420f9a3838495f04e8023f398aca1d7e5e6a7b73f0cde6c1deda83a722b/assets/images/product-guides/studio/studio-sound-effect.webp)

Add sound effects as separate clips on the timeline. You can position them anywhere, layer multiple effects, and adjust their timing precisely with trimming and duplication.

You can create effects from a text prompt inside ElevenCreative Studio or browse and insert items from the **SFX library**.

You can regenerate previews to explore variants and then apply your chosen effect to the timeline. Deleting and duplicating SFX clips works the same as other timeline clips.

Sound effects are not supported in ElevenReader exports, or when streaming the project using the
ElevenCreative Studio API.

#### Lock paragraph

![Lock paragraph Button](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/c3baa6ca96dd301ab1ef394be5d681d799daf690cde0e2dd156578c5162302cb/assets/images/product-guides/studio/studio-lock.webp)

Once you're happy with the performance of a paragraph, you can use the **Lock paragraph** button to prevent any further changes.

![Locked paragraph](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/dad2aea00d4161889d8cf55256f8a01fcd2863cc130a474bda66b7928252c547/assets/images/product-guides/studio/studio-locked-paragraph.webp)

Locked paragraphs are indicated by a lock icon to the left of the paragraph. If you want to unlock a paragraph, you can do this by clicking the **Lock paragraph** button again. Locking applies to narration content; you can continue editing timeline clips like video, music, and SFX.

#### Keyboard shortcuts

![Keyboard Shortcuts](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/b6cec86ddc69edfe0e5059f7baf9498bfb9a89a463eec1882536b09f342a6564/assets/images/product-guides/studio/studio-keyboard-shortcuts.webp)

There are a range of keyboard shortcuts that can be used in ElevenCreative Studio to speed up your workflow. To see a list of all available keyboard shortcuts, click the **Project options** button, then select **Keyboard shortcuts**.

## Settings

### Voices

You can choose from many types of voices, including voices you've cloned yourself using Instant Voice Cloning or Professional Voice Cloning; Professional Voice Clones that have been shared by other users to the Voice Library; and completely synthetic voices created using our Voice Design tool. Browse through our collection to find the perfect voice for your production.

Not all voices are equal, and a lot depends on the source audio used to create that voice. Some voices will perform better than others, while some will be more stable than others. Additionally, certain voices will be more easily cloned by the AI than others, and some voices may work better with one model and one language compared to another. All of these factors are important to consider when selecting your voice.

If you’re unhappy with a voice, but you’re happy with the delivery of the narration, you can use our Voice Changer functionality to change the voice, but preserve the narration

[Learn more about voices](/docs/overview/capabilities/voices)

### Voice settings

![Studio voice settings](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/15a9c18bec595b6716f5d33102c8c31b007a598f065b70f0e2cf8f6ee18bf2f1/assets/images/product-guides/studio/studio-voice-settings.webp)

Our users have found different workflows that work for them. The most common setting is stability around 50 and similarity near 75, with minimal changes thereafter. Of course, this all depends on the original voice and the style of performance you're aiming for.

It's important to note that the AI is non-deterministic; setting the sliders to specific values won't guarantee the same results every time. Instead, the sliders function more as a range, determining how wide the randomization can be between each generation.

If you have a paragraph or text selected, you can use the **Override settings** toggle to change the settings for just the current selection. If you change the settings for the voice without enabling this, then this will change the settings for this voice across the whole of your project. This will mean that you will need to regenerate any audio that you had previously generated using different settings. If you have any locked paragraphs that use this voice, you won't be able to change the settings unless you unlock them.

#### Alias

You can use this setting to give the voice an alias that applies only for this project. For example, if you're using a different voice for each character in your audiobook, you could use the character's name as the alias.

#### Volume

If you find the generated audio for the voice to be either too quiet or too loud, you can adjust the volume. The default value is 0.00, which means that the audio will be unchanged. The minimum value is -30 dB and the maximum is +5 dB.

#### Speed

The **Speed** setting allows you to either speed up or slow down the speed of the generated speech. The default value is 1.0, which means that the speed is not adjusted. Values below 1.0 will slow the voice down, to a minimum of 0.7. Values above 1.0 will speed up the voice, to a maximum of 1.2. Extreme values may affect the quality of the generated speech.

#### Stability

The **Stability** slider determines how stable the voice is and the randomness between each generation. Lowering this slider introduces a broader emotional range for the voice. This is influenced heavily by the original voice. Setting the slider too low may result in odd performances that are overly random and cause the character to speak too quickly. On the other hand, setting it too high can lead to a monotonous voice with limited emotion.

For a more lively and dramatic performance, it is recommended to set the stability slider lower and generate a few times until you find a performance you like.

On the other hand, if you want a more serious performance, even bordering on monotone at very high values, it is recommended to set the stability slider higher. Since it is more consistent and stable, you usually don't need to generate as many samples to achieve the desired result. Experiment to find what works best for you!

#### Similarity

The **Similarity** slider dictates how closely the AI should adhere to the original voice when attempting to replicate it. If the original audio is of poor quality and the similarity slider is set too high, the AI may reproduce artifacts or background noise when trying to mimic the voice if those were present in the original recording.

#### Style exaggeration

Some models include a **Style Exaggeration** setting. This setting attempts to amplify the style of the original speaker. It does consume additional computational resources and might increase latency if set to anything other than 0. It's important to note that using this setting has shown to make the model slightly less stable, as it strives to emphasize and imitate the style of the original voice.

In general, we recommend keeping this setting at 0 at all times.

#### Speaker boost

This setting boosts the similarity to the original speaker. However, using this setting requires a slightly higher computational load, which in turn increases latency. The differences introduced by this setting are generally rather subtle.

### Pronunciation dictionaries

![Studio pronunciation dictionaries](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/529a45f8a99dd533047caade26211cacfae53245a43f791efe34d8723555619c/assets/images/product-guides/studio/studio-pronunciation-dictionaries.webp)

Sometimes you may want to specify the pronunciation of certain words, such as character or brand names, or specify how acronyms should be read. Pronunciation dictionaries allow this functionality by enabling you to upload a lexicon or dictionary file that includes rules about how specified words should be pronounced, either using a phonetic alphabet (phoneme tags) or word substitutions (alias tags).

Phoneme tags are only compatible with "Eleven Flash v2" and "Eleven English v1"
[models](/docs/overview/models).

Whenever one of these words is encountered in a project, the AI will pronounce the word using the specified replacement. When checking for a replacement word in a pronunciation dictionary, the dictionary is checked from start to end and only the first replacement is used.

Existing pronunciation dictionaries can be connected to your project from the Pronunciations Editor. You can open this from the toolbar. Find the dictionary you want to connect in the drop down menu and select **Connect**.

You can create a new pronunciation dictionary from your project by creating an entry in the Pronunciations Editor, or you can upload or create a pronunciation dictionary from **Open all pronunciation dictionaries** in the Pronunciations Editor. You can then select **Connect** to connect the pronunciation dictionary to the current project.

For more information on pronunciation dictionaries, please see our [prompting best practices guide](/docs/overview/capabilities/text-to-speech/best-practices#pronunciation-dictionaries).

### Export settings

Within the **Export** tab under **Project settings** you can add additional metadata such as Title, Author, ISBN and a Description to your project. This information will automatically be added to the downloaded audio files. You can also access previous versions of your project, and enable volume normalization. These settings apply to audio exports; video appearance is controlled by your timeline and caption templates.

## Exporting and Sharing

When you're happy with your chapter or project, use the **Export** button to generate a downloadable version. If you've already generated audio for every paragraph in either your chapter or project, you won't be charged any additional credits to export. If there are any paragraphs that do need converting as part of the export process, you will see a notification of how many credits it will cost to export.

Video exports on free and Starter plans include a watermark. To export videos without a watermark,
you need a Creator plan or above.

#### Export options

If your project only has one chapter, you will just see the option to export as either MP3 or WAV (audio), or as video when a video track/captions are present.

If your project has multiple chapters, you will have the option to export each chapter individually, or export the full project. If you're exporting the full project, you can either export as a single file, or as a ZIP file containing individual files for each chapter. You can also choose whether to download as MP3 or WAV for audio‑only exports.

For video exports, enable captions and add a video track (or shareable TTS video) before exporting. Video is rendered with your selected caption template.

#### Quality setting

The quality of the export depends on your subscription plan. For newly created projects, the quality will be:

* Free, Starter and Creator: 128 kbps MP3, or WAV converted from 128 kbps source.
* Pro, Scale, Business and Enterprise plans: 16-bit, 44.1 kHz WAV, or 192 kbps MP3 (Ultra Lossless).

If you have an older project, you may have set the quality setting when you created the project, and this can't be changed. You can check the quality setting for your project in the Export menu by hovering over **Format**

#### Downloading

Once your export is ready, it will be automatically downloaded. For shareable TTS videos, you can also copy a link for quick sharing.

You can access and download all previous exports, of both chapters and projects, by clicking the **Project options** button and selecting **Exports**.

#### Sharing

From the editor, create a read‑only link so others can play your timeline and review your mix without downloading files. You can revoke access at any time. Commenting is also available, including anonymous comments.

![Studio share project](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/f2cf13471019a920e4b8483b40fb4a92b6d70f85da6bdfd82a7560287fa20efd/assets/images/product-guides/studio/studio-share-project.webp)

#### Commenting

Invite collaborators or your audience to leave feedback directly on the timeline. Comments are timestamped to the playhead so feedback appears exactly where it’s relevant. Commenters don’t need an ElevenLabs account and can leave a name or post anonymously. Discussions stay organized with threaded replies and optional mentions of collaborators.

To add a comment, open a shared project link (or the editor with sharing enabled), move the playhead to the right moment, and click **Add comment**. Type your message and post; use **Reply** to continue the thread. You’ll receive email notifications when there’s a new comment or reply in a thread you started or participated in.

When feedback is addressed, mark the thread as **Resolved**; it will collapse in the list and can be reopened later. Resolving a thread pauses further notifications until it is reopened.

## FAQ

![Studio free regenerations](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/ac7e53c3ac7f58bb0f0d6ff90618779dd80a5a93e6c39237e35d775eb60979a8/assets/images/product-guides/studio/studio-free-regen.webp)

In ElevenCreative Studio, provided you don't change the text or voice, you can regenerate a selected paragraph or section of text twice for free.

If free regenerations are available for the selected paragraph or text, you will see **Regenerate**. If you hover over the **Regenerate** button, the number of free regenerations remaining will be displayed.

Once your free regenerations have been used, the button will display **Generate**, and you will be charged for subsequent generations.

When using **Export** to generate audio for a full chapter or project, auto-regeneration automatically checks the output for a range of issues including:

* volume distortions
* voice similarity
* mispronunciations
* missing or additional words

If any issues are detected, the tool will automatically regenerate the audio up to twice, at no extra cost.

This feature may increase the processing time but helps ensure higher quality output for your bulk conversions.