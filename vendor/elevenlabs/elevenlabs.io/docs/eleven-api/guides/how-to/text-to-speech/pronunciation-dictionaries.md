> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Using pronunciation dictionaries

**How-to guide** · Assumes you have completed the [ElevenAPI
quickstart](/docs/eleven-api/quickstart).

## Overview

Pronunciation dictionaries allow you to customize how your AI agent pronounces specific words or phrases. This is particularly useful for:

* Correcting pronunciation of names, places, or technical terms
* Ensuring consistent pronunciation across conversations
* Customizing regional pronunciation variations

ElevenLabs supports both [IPA](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) and [CMU](https://en.wikipedia.org/wiki/CMU_Pronouncing_Dictionary) alphabets.

Pronunciation dictionary phoneme tags only work with eleven\_flash\_v2  and eleven\_v3 models.

Other models skip dictionary phoneme tags and use the default pronunciation. For other models, use
alias tags instead to substitute spellings or phrases that produce the pronunciation you need.

If you want to use IPA and CMU pronunciations in languages other than English, you will have to
switch to the eleven\_v3 model.

## Quickstart

This guide assumes you have [set up your API key and SDK](/docs/eleven-api/quickstart). Complete
the quickstart first if you haven't.

In this example, we will create a pronunciation dictionary file for the word `tomato`.

This rule will use the "IPA" alphabet and update the pronunciation for `tomato` and `Tomato` with a different pronunciation. PLS files are case sensitive which is why we include it both with and without a capital "T".

You can use AI tools like Claude or ChatGPT to help generate IPA or CMU notations for specific words.

```xml title="dictionary.pls"
<?xml version="1.0" encoding="UTF-8"?>
<lexicon version="1.0"
    xmlns="http://www.w3.org/2005/01/pronunciation-lexicon"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.w3.org/2005/01/pronunciation-lexicon
        http://www.w3.org/TR/2007/CR-pronunciation-lexicon-20071212/pls.xsd"
    alphabet="ipa" xml:lang="en-US">
<lexeme>
    <grapheme>tomato</grapheme>
    <phoneme>/tə'meɪtoʊ/</phoneme>
</lexeme>
<lexeme>
    <grapheme>Tomato</grapheme>
    <phoneme>/tə'meɪtoʊ/</phoneme>
</lexeme>
</lexicon>
```

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

```python maxLines=0
import requests
from elevenlabs.play import play, PronunciationDictionaryVersionLocator

with open("dictionary.pls", "rb") as f:
    # this dictionary changes how tomato is pronounced
    pronunciation_dictionary = elevenlabs.pronunciation_dictionaries.create_from_file(
        file=f.read(), name="example"
    )

audio_1 = elevenlabs.text_to_speech.convert(
    text="Without the dictionary: tomato",
    voice_id="aMSt68OGf4xUZAnLpTU8",
    model_id="eleven_flash_v2",
)

audio_2 = elevenlabs.text_to_speech.convert(
    text="With the dictionary: tomato",
    voice_id="aMSt68OGf4xUZAnLpTU8",
    model_id="eleven_flash_v2",
    pronunciation_dictionary_locators=[
        PronunciationDictionaryVersionLocator(
            pronunciation_dictionary_id=pronunciation_dictionary.id,
            version_id=pronunciation_dictionary.version_id,
        )
    ],
)

# play the audio
play(audio_1)
play(audio_2)
```

```typescript maxLines=0
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";
import fs from "node:fs";

const elevenlabs = new ElevenLabsClient();

const pronunciationDictionary = await elevenlabs.pronunciationDictionaries.createFromFile({
    file: fs.createReadStream("dictionary.pls"),
});

const audio1 = await elevenlabs.textToSpeech.convert("Without the dictionary: tomato", {
    voiceId: "aMSt68OGf4xUZAnLpTU8",
    modelId: "eleven_flash_v2",
});

const audio2 = await elevenlabs.textToSpeech.convert("With the dictionary: tomato", {
    voiceId: "aMSt68OGf4xUZAnLpTU8",
    modelId: "eleven_flash_v2",
    pronunciationDictionaryLocators: [
        {
            pronunciationDictionaryId: pronunciationDictionary.id,
            versionId: pronunciationDictionary.versionId,
        },
    ],
});

play(audio1);
play(audio2);
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You should hear two versions of the audio playing through your speakers, one with and one without the pronunciation dictionary.

## Next steps

Full pronunciation dictionary API reference.

Stream text to speech progressively for lower latency playback.