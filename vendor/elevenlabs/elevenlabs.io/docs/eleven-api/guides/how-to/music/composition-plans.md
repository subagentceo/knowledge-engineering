> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Composition plans

Composition plans provide fine-grained control over music generation. A `music_v2` plan is an ordered list of chunks, where each chunk defines a section of the song with its own styles, lyrics, and duration. Use text prompts for quick prototyping and composition plans when you need specific chunk structure, precise lyrics timing, or complex arrangements.

Composition plans and text prompts are mutually exclusive. Use one or the other, not both.

```json
{
  "chunks": [
    {
      "text": "[Verse 1]\nWoke up today with a feeling inside\nSomething is changing I cannot hide\nThe sun on my face and the wind at my back\nI'm finally ready to get on track",
      "duration_ms": 16000,
      "positive_styles": [
        "upbeat pop",
        "female vocalist with clear tone",
        "acoustic guitar and light synths",
        "gentle and conversational vocals",
        "light drums in background",
        "polished production",
        "120 BPM",
        "C major"
      ],
      "negative_styles": ["dark", "aggressive", "slow tempo", "a cappella"],
      "context_adherence": "high"
    },
    {
      "text": "[Verse 2]\nUsed to be scared of the world outside\nBuilding up walls where I used to hide\nBut now I see clearly what I need to do\nTake that first step into something new",
      "duration_ms": 16000,
      "positive_styles": [
        "confident vocals",
        "fuller guitar strumming",
        "steady drum beat",
        "bass joins in"
      ],
      "negative_styles": ["a cappella", "sparse", "quiet"],
      "context_adherence": "high"
    },
    {
      "text": "[Pre-Chorus]\nNo more waiting for tomorrow\nThis is my time now",
      "duration_ms": 8000,
      "positive_styles": [
        "building intensity",
        "rising synth melody",
        "driving drums",
        "full band playing"
      ],
      "negative_styles": ["a cappella", "dropping out"],
      "context_adherence": "high"
    },
    {
      "text": "[Chorus]\nI'm breaking through\nNothing's gonna stop me now\nI'm breaking through\nFinally found out how",
      "duration_ms": 16000,
      "positive_styles": [
        "powerful and anthemic vocals",
        "full band at maximum energy",
        "punchy drums and bass",
        "layered synths and guitar"
      ],
      "negative_styles": ["a cappella", "minimal", "stripped back"],
      "context_adherence": "high"
    },
    {
      "text": "[Outro]",
      "duration_ms": 8000,
      "positive_styles": [
        "instrumental fade out",
        "guitar melody repeating",
        "drums softening",
        "gentle ending"
      ],
      "negative_styles": ["vocals", "abrupt ending", "building"],
      "context_adherence": "high"
    }
  ]
}
```

<elevenlabs-audio-player audio-title="Pop Song" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/example-pop-song.mp3" />

Chunk-based composition plans require the `music_v2` model. Pass `model_id="music_v2"` when
composing.

## Quickstart

Follow the [music quickstart](/docs/eleven-api/guides/cookbooks/music) to set up your API key and install the SDK, then use composition plans for more control.

### Generate music with a composition plan

```python
import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs

load_dotenv()
elevenlabs = ElevenLabs(api_key=os.environ.get("ELEVENLABS_API_KEY"))

composition_plan = {
    "chunks": [
        {
            "text": "[Verse]\nWalking down an empty street\nWondering who I'll meet",
            "duration_ms": 15000,
            "positive_styles": ["pop", "upbeat", "female vocals", "soft vocals", "acoustic guitar"],
            "negative_styles": ["dark", "slow"],
            "context_adherence": "high"
        },
        {
            "text": "[Chorus]\nThis is my moment\nI won't let it go",
            "duration_ms": 15000,
            "positive_styles": ["powerful vocals", "full band"],
            "negative_styles": [],
            "context_adherence": "high"
        }
    ]
}

audio = elevenlabs.music.compose(
    composition_plan=composition_plan,
    model_id="music_v2",
    # with_timestamps=True,  # Optional: return word-level timestamps
)

with open("output.mp3", "wb") as f:
    for chunk in audio:
        f.write(chunk)
```

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const compositionPlan = {
  chunks: [
    {
      text: "[Verse]\nWalking down an empty street\nWondering who I'll meet",
      durationMs: 15000,
      positiveStyles: ["pop", "upbeat", "female vocals", "soft vocals", "acoustic guitar"],
      negativeStyles: ["dark", "slow"],
      contextAdherence: "high",
    },
    {
      text: "[Chorus]\nThis is my moment\nI won't let it go",
      durationMs: 15000,
      positiveStyles: ["powerful vocals", "full band"],
      negativeStyles: [],
      contextAdherence: "high",
    },
  ],
};

const audio = await elevenlabs.music.compose({
  compositionPlan,
  modelId: "music_v2",
  // withTimestamps: true,  // Optional: return word-level timestamps
});
```

### Generate a plan from a prompt

Generate a composition plan from a text description, then modify it before generating:

```python
plan = elevenlabs.music.composition_plan.create(
    prompt="An upbeat pop song about summer adventures",
    music_length_ms=60000,
    model_id="music_v2"
)

# Modify the generated plan
plan["chunks"][0]["text"] = "[Verse 1]\nCustom lyrics here"

audio = elevenlabs.music.compose(composition_plan=plan, model_id="music_v2")
```

```typescript
const plan = await elevenlabs.music.compositionPlan.create({
  prompt: "An upbeat pop song about summer adventures",
  musicLengthMs: 60000,
  modelId: "music_v2",
});

// Modify the generated plan
plan.chunks[0].text = "[Verse 1]\nCustom lyrics here";

const audio = await elevenlabs.music.compose({ compositionPlan: plan, modelId: "music_v2" });
```

## Structure reference

### Chunks

A composition plan is an ordered list of up to 30 chunks. Each chunk generates one section of the song from its `text` and styles. The first chunk is the most important: its styles set the overall tone and genre for the whole song.

| Field               | Type   | Description                                                                                                    |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| `text`              | string | Section name in square brackets (`[Verse 1]`), lyrics lines, and inline directions in braces (`{scratching}`). |
| `duration_ms`       | number | Length in milliseconds (3,000 - 120,000).                                                                      |
| `positive_styles`   | array  | Styles and directions to include (max 50).                                                                     |
| `negative_styles`   | array  | Styles and directions to avoid (max 50). Defaults to empty.                                                    |
| `context_adherence` | string | `low`, `medium`, or `high` (default). How closely the chunk follows its surrounding chunks.                    |

A song can have up to 30 chunks. Total duration must be between 3 seconds and 10 minutes, with each chunk between 3 and 120 seconds.

The styles for the first chunk are the most important as they set the overall tone and genre. Aim
for at least 6-7 styles in early chunks until the direction is established. Generic styles like
"great production quality" are good defaults to append to the list.

Chunks can also reference audio from a stored song to keep existing sections unchanged or condition new audio on them. See [music inpainting](/docs/eleven-api/guides/how-to/music/inpainting) for editing and combining existing songs.

## Writing lyrics

The `text` field combines the section name, lyrics, and inline directions:

* **Section name** in square brackets: `[Verse 1]`, `[Chorus]`, `[Bridge]`
* **Lyrics** as plain text, with each line separated by a line break (`\n`)
* **Phonetic sounds** in parentheses: `(hmmm hmmm)`, `(ooh)`, `(yeah)`
* **Inline directions** in curly braces: `{guitar solo}`, `{scratching}`, `{instrumental break}`

Use curly braces for short, inline cues. For broader characteristics that apply to the whole chunk — genre, instrumentation, or overall vocal style — use `positive_styles` instead.

```json title="Incorrect"
{
  "text": "[Verse]\n(soft female vocals) I've been waiting\n(instrumental break)\nfor you"
}
```

```json title="Correct"
{
  "text": "[Verse]\nI've been waiting\n{instrumental break}\nfor you",
  "positive_styles": ["soft female vocals"]
}
```

In the corrected example, the overall vocal style moves to `positive_styles`, while the short inline cue stays in `text` using curly braces instead of parentheses.

## Style tips

Be specific with style descriptors:

```json
{
  "positive_styles": [
    "warm acoustic guitar with light fingerpicking",
    "soft female vocals with intimate delivery",
    "gentle percussion with brushed snare",
    "80 BPM"
  ]
}
```

Use negative styles liberally to prevent unwanted sounds. Styles must be in English (lyrics can be any language).

If you include copyrighted content in styles, the API returns a `bad_composition_plan` error with a suggested alternative. See [handling copyrighted material](/docs/eleven-api/guides/cookbooks/music#copyrighted-material).

## Examples

### Cinematic instrumental

```json
{
  "chunks": [
    {
      "text": "[Tension Build]",
      "duration_ms": 15000,
      "positive_styles": [
        "cinematic",
        "orchestral",
        "epic",
        "low strings tremolo",
        "building intensity",
        "80 BPM",
        "D minor"
      ],
      "negative_styles": ["vocals", "lyrics", "pop", "electronic", "bright"],
      "context_adherence": "high"
    },
    {
      "text": "[Climax]",
      "duration_ms": 15000,
      "positive_styles": ["full orchestra", "brass fanfare", "triumphant"],
      "negative_styles": ["quiet", "vocals"],
      "context_adherence": "high"
    },
    {
      "text": "[Resolution]",
      "duration_ms": 10000,
      "positive_styles": ["gentle strings", "piano melody", "fading out"],
      "negative_styles": ["intense", "vocals"],
      "context_adherence": "high"
    }
  ]
}
```

<elevenlabs-audio-player audio-title="Cinematic Instrumental" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/example-cinematic-instrumental.mp3" />

### Advertisement with voiceover

```json
{
  "chunks": [
    {
      "text": "[Intro]",
      "duration_ms": 5000,
      "positive_styles": [
        "upbeat",
        "modern pop",
        "energetic",
        "120 BPM",
        "instrumental",
        "catchy hook"
      ],
      "negative_styles": ["sad", "slow", "dark", "vocals"],
      "context_adherence": "high"
    },
    {
      "text": "[Voiceover]\nIntroducing the future of productivity\nWork smarter, not harder",
      "duration_ms": 10000,
      "positive_styles": ["spoken voiceover", "confident male voice", "background music"],
      "negative_styles": ["singing"],
      "context_adherence": "high"
    },
    {
      "text": "[Outro]",
      "duration_ms": 5000,
      "positive_styles": ["musical sting", "memorable"],
      "negative_styles": ["vocals"],
      "context_adherence": "high"
    }
  ]
}
```

<elevenlabs-audio-player audio-title="Advertisement" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/example-advertisement.mp3" />

## Next steps

Get started with basic music generation

Remix, extend, and stitch together sections of existing songs

Complete API documentation

Best practices for music prompts