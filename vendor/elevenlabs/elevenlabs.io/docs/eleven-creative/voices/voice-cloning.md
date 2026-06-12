> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Voice Cloning

## Overview

When cloning a voice, there are two main options: Instant Voice Cloning and Professional Voice Cloning. Instant Voice Cloning is a quick and easy way to clone your voice, while Professional Voice Cloning is a more accurate and customizable option.

## Instant Voice Cloning

![Instant voice
cloning](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/5f7bbacc7f5bae472e8fd61503496c5137675c1c0ab00b785829d1049ca1fe28/assets/images/product-guides/voices/voice-cloning/voice-cloning-ivc-modal.webp)

Instant Voice Cloning allows you to create voice clones from shorter samples near instantaneously. Creating an Instant Voice Clone (IVC) does not train or create a custom AI model. Instead, it relies on prior knowledge from training data to make an educated guess rather than training on the exact voice.

This works extremely well for a lot of voices. However, the biggest limitation with IVCs is if you are trying to clone a very unique voice, or a voice with an accent that the AI might not have experienced extensively during training. In such cases, using Professional Voice Cloning to create a custom model with explicit training might be the best option.

## Professional Voice Cloning

![Professional voice
cloning](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/84134ac62c71531ac93d090030d9651bf428dc90802c17b33ad924973b6560c2/assets/images/product-guides/voices/voice-cloning/voice-pvc-creation.webp)

Professional Voice Cloning is a feature that's available on our Creator plan or above. Professional Voice Cloning allows you to train a more realistic model of your voice by training a dedicated model on a larger set of voice data, producing a model that's virtually indistinguishable from the original voice.

Since the custom models require fine-tuning and training, it takes more time to train PVCs compared to IVCs. Generally fine-tuning takes 3-6 hours to complete, but it can sometimes take a bit longer, depending on the number of other PVCs queued for fine-tuning.

## Beginner's guide to audio recording

If you're new to audio recording, here are some tips to help you get started.

### Recording location

When recording audio, choose a suitable location and set up to minimize room echo/reverb.
So, we want to "deaden" the room as much as possible. This is precisely what a vocal booth that is acoustically treated made for, and if you do not have a vocal booth readily available, you can experiment with some ideas for a DIY vocal booth, "blanket fort", or closet.

Here are a few YouTube examples of DIY acoustics ideas:

* [I made a vocal booth for \$0.00!](https://www.youtube.com/watch?v=j4wJMDUuHSM)
* [How to Record GOOD Vocals in a BAD Room](https://www.youtube.com/watch?v=TsxdHtu-OpU)
* [The 5 BEST Vocal Home Recording TIPS!](https://www.youtube.com/watch?v=K96mw2QBz34)

### Microphone, pop-filter, and audio interface

A good microphone is crucial. Microphones can range from \$100 to \$10,000, but a professional XLR microphone costing \$150 to \$300 is sufficient for most voiceover work.

For an affordable yet high-quality setup for voiceover work, consider a **Focusrite** interface paired with an **Audio-Technica AT2020** or **Rode NT1 microphone**. This setup, costing between \$300 to \$500, offers high-quality recording suitable for professional use, with minimal self-noise for clean results.

Please ensure that you have a proper **pop-filter** in front of the microphone when recording to avoid plosives as well as breaths and air hitting the diaphragm/microphone directly, as it will sound poor and will also cause issues with the cloning process.

### Digital Audio Workstation (DAW)

There are many different recording solutions out there that all accomplish the same thing: recording audio. However, they are not all created equally. As long as they can record WAV files at 44.1kHz or 48kHz with a bitrate of at least 24 bits, they should be fine. You don't need any fancy post-processing, plugins, denoisers, or anything because we want to keep audio recording simple.

If you want a recommendation, we would suggest something like **REAPER**, which is a fantastic DAW with a tremendous amount of flexibility. It is the industry standard for a lot of audio work. Another good free option is **Audacity**.

Maintain optimal recording levels (not too loud or too quiet) to avoid digital distortion and excessive noise. Aim for peaks of -6 dB to -3 dB and an average loudness of -18 dB for voiceover work, ensuring clarity while minimizing the noise floor. Monitor closely and adjust levels as needed for the best results based on the project and recording environment.

### Positioning

One helpful guideline to follow is to maintain a distance of about two fists away from the microphone, which is approximately 20cm (7-8 in), with a pop filter placed between you and the microphone. Some people prefer to position the pop filter all the way back so that they can press it up right against it. This helps them maintain a consistent distance from the microphone more easily.

Another common technique to avoid directly breathing into the microphone or causing plosive sounds is to speak at an angle. Speaking at an angle ensures that exhaled air is less likely to hit the microphone directly and, instead, passes by it.

### Performance

The performance you give is one of the most crucial aspects of this entire recording session. The AI will try to clone everything about your voice to the best of its ability, which is very high. This means that it will attempt to replicate your cadence, tonality, performance style, the length of your pauses, whether you stutter, take deep breaths, sound breathy, or use a lot of "uhms" and "ahs" – it can even replicate those. Therefore, what we want in the audio file is precisely the performance and voice that we want to clone, nothing less and nothing more. That is also why it's quite important to find a script that you can read that fits the tonality we are aiming for.

When recording for AI, it is very important to be consistent. if you are recording a voice either keep it very animated throughout or keep it very subdued throughout you can't mix and match or the AI can become unstable because it doesn't know what part of the voice to clone. same if you're doing an accent keep the same accent throughout the recording. Consistency is key to a proper clone!