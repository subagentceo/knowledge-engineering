> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Music inpainting

Music inpainting with the `music_v2` model lets you modify specific parts of a song while keeping the rest intact. Store a generated song, then reference its parts in a composition plan to keep them unchanged, regenerate them, or condition new audio on the original.

## How it works

A `music_v2` composition plan is an ordered list of **chunks**. Each chunk is one of two types:

* **Generation chunk** — generates new audio from `text` and styles. Use it to regenerate a section or add new material.
* **Audio reference chunk** — inserts a slice of a stored song unchanged. Use it to keep a section of an existing song exactly as it is.

## Quickstart

### Store a song for inpainting

You can store a song for inpainting in two ways: generate a new song with `store_for_inpainting`, or upload an existing audio file.

```python
import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs

load_dotenv()
elevenlabs = ElevenLabs(api_key=os.environ.get("ELEVENLABS_API_KEY"))

# Generate a song and store it for later inpainting
response = elevenlabs.music.compose_detailed(
    prompt="An upbeat pop song with verse and chorus",
    music_length_ms=60000,
    model_id="music_v2",
    store_for_inpainting=True
)
song_id = response.song_id

# Save the audio
with open("original.mp3", "wb") as f:
    f.write(response.audio)
```

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const response = await elevenlabs.music.composeDetailed({
  prompt: "An upbeat pop song with verse and chorus",
  musicLengthMs: 60000,
  modelId: "music_v2",
  storeForInpainting: true,
});
const songId = response.songId;
```

```python
import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs

load_dotenv()
elevenlabs = ElevenLabs(api_key=os.environ.get("ELEVENLABS_API_KEY"))

# Upload an existing audio file for inpainting
response = elevenlabs.music.upload(
    file=open("my-song.mp3", "rb"),
    extract_composition_plan="music_v2"  # Optional: extract the composition plan
)
song_id = response.song_id
composition_plan = response.composition_plan  # None if extract_composition_plan is False
```

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";
import fs from "fs";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const response = await elevenlabs.music.upload({
  file: fs.createReadStream("my-song.mp3"),
  extractCompositionPlan: true, // Optional: extract the composition plan
});
const songId = response.songId;
const compositionPlan = response.compositionPlan; // undefined if extractCompositionPlan is false
```

### Keep and regenerate chunks

Build a plan that mixes audio reference chunks (kept) with generation chunks (regenerated), then pass it to `compose` with `model_id="music_v2"`:

```python
# Keep the first 30 seconds, regenerate the rest with a new style
composition_plan = {
    "chunks": [
        # Keep the original first 30 seconds unchanged
        {
            "song_id": song_id,
            "range": {"start_ms": 0, "end_ms": 30000}
        },
        # Regenerate the chorus with a new style
        {
            "text": "[Chorus]\nWe're rising up tonight\nNothing can stop us now",
            "duration_ms": 30000,
            "positive_styles": ["bigger drums", "layered vocals", "anthemic"],
            "negative_styles": ["sparse", "minimal"],
            "context_adherence": "high"
        }
    ]
}

audio = elevenlabs.music.compose(
    composition_plan=composition_plan,
    model_id="music_v2",
)

with open("edited.mp3", "wb") as f:
    for chunk in audio:
        f.write(chunk)
```

```typescript
// Keep the first 30 seconds, regenerate the rest with a new style
const compositionPlan = {
  chunks: [
    // Keep the original first 30 seconds unchanged
    {
      songId,
      range: { startMs: 0, endMs: 30000 },
    },
    // Regenerate the chorus with a new style
    {
      text: "[Chorus]\nWe're rising up tonight\nNothing can stop us now",
      durationMs: 30000,
      positiveStyles: ["bigger drums", "layered vocals", "anthemic"],
      negativeStyles: ["sparse", "minimal"],
      contextAdherence: "high",
    },
  ],
};

const audio = await elevenlabs.music.compose({
  compositionPlan,
  modelId: "music_v2",
});
```

## Conditioning

A generation chunk can be conditioned on a slice of stored audio with `conditioning_ref`. The model regenerates the chunk while staying close to the reference's musical characteristics. Control how tightly the chunk follows the reference with `condition_strength` (`low`, `medium`, `high`, or `xhigh`).

```json
{
  "text": "[Chorus]\nThis is my moment\nI won't let it go",
  "duration_ms": 15000,
  "positive_styles": ["powerful vocals", "full band", "anthemic"],
  "negative_styles": [],
  "context_adherence": "high",
  "conditioning_ref": {
    "song_id": "vVtPM1Sas70E2LIhQFch",
    "range": { "start_ms": 30000, "end_ms": 45000 }
  },
  "condition_strength": "high"
}
```

The first chunk influences the generation of all subsequent chunks. To condition the entire song
on a reference, apply `conditioning_ref` starting from the first chunk.

A conditioning reference can be at most 30 seconds (30,000ms) long.

## Context adherence

Each generation chunk has a `context_adherence` level that controls how closely it follows its neighboring chunks:

* `high` (default) — stays consistent with surrounding chunks. Use it for smooth transitions between kept and regenerated audio.
* `medium` — balances consistency with creative freedom.
* `low` — lets the chunk deviate from its context and be more creative.

## Examples

### Edit a single section

Generate a movie trailer, then regenerate just the outro with different lyrics.

### Generate the original

```python
composition_plan = {
    "chunks": [
        {
            "text": "[Intro]\nIn a world beyond code\nWhere sound becomes life",
            "duration_ms": 15000,
            "positive_styles": ["cinematic", "epic", "orchestral", "low strings", "suspenseful"],
            "negative_styles": ["acoustic", "pop", "minimalistic"],
            "context_adherence": "high"
        },
        {
            "text": "[Build]\nTechnology awakens the future\nShaping every word into power",
            "duration_ms": 20000,
            "positive_styles": ["rising brass", "full orchestra", "epic"],
            "negative_styles": ["acoustic", "pop"],
            "context_adherence": "high"
        },
        {
            "text": "[Bridge]\n(ah ah ah ah)",
            "duration_ms": 15000,
            "positive_styles": ["ethereal choir", "crescendo"],
            "negative_styles": [],
            "context_adherence": "high"
        },
        {
            "text": "[Outro]\nThe voice of tomorrow, unleashed\nElevenLabs",
            "duration_ms": 10000,
            "positive_styles": ["deep narration", "epic finale"],
            "negative_styles": [],
            "context_adherence": "high"
        }
    ]
}

response = elevenlabs.music.compose_detailed(
    composition_plan=composition_plan,
    model_id="music_v2",
    store_for_inpainting=True
)
song_id = response.song_id
```

```typescript
const compositionPlan = {
  chunks: [
    {
      text: "[Intro]\nIn a world beyond code\nWhere sound becomes life",
      durationMs: 15000,
      positiveStyles: ["cinematic", "epic", "orchestral", "low strings", "suspenseful"],
      negativeStyles: ["acoustic", "pop", "minimalistic"],
      contextAdherence: "high",
    },
    {
      text: "[Build]\nTechnology awakens the future\nShaping every word into power",
      durationMs: 20000,
      positiveStyles: ["rising brass", "full orchestra", "epic"],
      negativeStyles: ["acoustic", "pop"],
      contextAdherence: "high",
    },
    {
      text: "[Bridge]\n(ah ah ah ah)",
      durationMs: 15000,
      positiveStyles: ["ethereal choir", "crescendo"],
      negativeStyles: [],
      contextAdherence: "high",
    },
    {
      text: "[Outro]\nThe voice of tomorrow, unleashed\nElevenLabs",
      durationMs: 10000,
      positiveStyles: ["deep narration", "epic finale"],
      negativeStyles: [],
      contextAdherence: "high",
    },
  ],
};

const response = await elevenlabs.music.composeDetailed({
  compositionPlan,
  modelId: "music_v2",
  storeForInpainting: true,
});
const songId = response.songId;
```

<elevenlabs-audio-player audio-title="Original Movie Trailer" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/movie_trailer.mp3" />

### Edit just the outro

Keep the first three sections (seconds 0–50) with a single audio reference chunk, and regenerate the outro:

```python
edited_plan = {
    "chunks": [
        # Keep the intro, build, and bridge unchanged
        {
            "song_id": song_id,
            "range": {"start_ms": 0, "end_ms": 50000}
        },
        # Regenerate the outro with new lyrics
        {
            "text": "[Outro]\nThe future has arrived\nElevenLabs",
            "duration_ms": 10000,
            "positive_styles": ["deep narration", "epic finale"],
            "negative_styles": [],
            "context_adherence": "high"
        }
    ]
}

audio = elevenlabs.music.compose(composition_plan=edited_plan, model_id="music_v2")
```

```typescript
const editedPlan = {
  chunks: [
    // Keep the intro, build, and bridge unchanged
    {
      songId,
      range: { startMs: 0, endMs: 50000 },
    },
    // Regenerate the outro with new lyrics
    {
      text: "[Outro]\nThe future has arrived\nElevenLabs",
      durationMs: 10000,
      positiveStyles: ["deep narration", "epic finale"],
      negativeStyles: [],
      contextAdherence: "high",
    },
  ],
};

const audio = await elevenlabs.music.compose({ compositionPlan: editedPlan, modelId: "music_v2" });
```

<elevenlabs-audio-player audio-title="Edited Outro" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/movie_trailer_edited.mp3" />

### Extend a song

Add a new intro and outro to an existing song.

### Generate the original

```python
response = elevenlabs.music.compose_detailed(
    prompt="Berlin night club techno",
    music_length_ms=60000,
    model_id="music_v2",
    store_for_inpainting=True
)
song_id = response.song_id
```

```typescript
const response = await elevenlabs.music.composeDetailed({
  prompt: "Berlin night club techno",
  musicLengthMs: 60000,
  modelId: "music_v2",
  storeForInpainting: true,
});
const songId = response.songId;
```

<elevenlabs-audio-player audio-title="Original (60s)" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/berlin_night_club_techno.mp3" />

### Extend with new intro and outro

Wrap a kept slice of the original between two new generation chunks:

```python
extend_plan = {
    "chunks": [
        # New intro
        {
            "text": "[Intro]",
            "duration_ms": 30000,
            "positive_styles": ["techno", "building tension", "filtered synths"],
            "negative_styles": [],
            "context_adherence": "high"
        },
        # Keep the core of the original (seconds 10-50)
        {
            "song_id": song_id,
            "range": {"start_ms": 10000, "end_ms": 50000}
        },
        # New outro
        {
            "text": "[Outro]",
            "duration_ms": 30000,
            "positive_styles": ["techno", "fading out", "sparse"],
            "negative_styles": [],
            "context_adherence": "high"
        }
    ]
}

audio = elevenlabs.music.compose(composition_plan=extend_plan, model_id="music_v2")
```

```typescript
const extendPlan = {
  chunks: [
    // New intro
    {
      text: "[Intro]",
      durationMs: 30000,
      positiveStyles: ["techno", "building tension", "filtered synths"],
      negativeStyles: [],
      contextAdherence: "high",
    },
    // Keep the core of the original (seconds 10-50)
    {
      songId,
      range: { startMs: 10000, endMs: 50000 },
    },
    // New outro
    {
      text: "[Outro]",
      durationMs: 30000,
      positiveStyles: ["techno", "fading out", "sparse"],
      negativeStyles: [],
      contextAdherence: "high",
    },
  ],
};

const audio = await elevenlabs.music.compose({ compositionPlan: extendPlan, modelId: "music_v2" });
```

<elevenlabs-audio-player audio-title="Extended (100s)" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/berlin_night_club_techno_extended.mp3" />

### Create a seamless loop

Generate a musical phrase and create a loop using a "glue" chunk that bridges the same slice repeated twice.

### Generate a short clip

```python
composition_plan = {
    "chunks": [
        {
            "text": "[Solo Acoustic]",
            "duration_ms": 10000,
            "positive_styles": ["acoustic guitar", "fingerpicking", "warm tone", "soft dynamics"],
            "negative_styles": ["electric", "drums", "electronic"],
            "context_adherence": "high"
        }
    ]
}

response = elevenlabs.music.compose_detailed(
    composition_plan=composition_plan,
    model_id="music_v2",
    store_for_inpainting=True
)
song_id = response.song_id
```

```typescript
const compositionPlan = {
  chunks: [
    {
      text: "[Solo Acoustic]",
      durationMs: 10000,
      positiveStyles: ["acoustic guitar", "fingerpicking", "warm tone", "soft dynamics"],
      negativeStyles: ["electric", "drums", "electronic"],
      contextAdherence: "high",
    },
  ],
};

const response = await elevenlabs.music.composeDetailed({
  compositionPlan,
  modelId: "music_v2",
  storeForInpainting: true,
});
const songId = response.songId;
```

<elevenlabs-audio-player audio-title="Original (10s)" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/acoustic_guitar.mp3" />

### Create a loop with a glue chunk

```python
loop_plan = {
    "chunks": [
        # Loop start - keep a slice of the original
        {
            "song_id": song_id,
            "range": {"start_ms": 3000, "end_ms": 8000}
        },
        # Glue - generate a smooth transition between the two slices
        {
            "text": "[Glue]",
            "duration_ms": 3000,
            "positive_styles": ["acoustic guitar", "fingerpicking", "smooth transition"],
            "negative_styles": [],
            "context_adherence": "high"
        },
        # Loop end - keep the same slice again
        {
            "song_id": song_id,
            "range": {"start_ms": 3000, "end_ms": 8000}
        }
    ]
}

audio = elevenlabs.music.compose(composition_plan=loop_plan, model_id="music_v2")
```

```typescript
const loopPlan = {
  chunks: [
    // Loop start - keep a slice of the original
    {
      songId,
      range: { startMs: 3000, endMs: 8000 },
    },
    // Glue - generate a smooth transition between the two slices
    {
      text: "[Glue]",
      durationMs: 3000,
      positiveStyles: ["acoustic guitar", "fingerpicking", "smooth transition"],
      negativeStyles: [],
      contextAdherence: "high",
    },
    // Loop end - keep the same slice again
    {
      songId,
      range: { startMs: 3000, endMs: 8000 },
    },
  ],
};

const audio = await elevenlabs.music.compose({ compositionPlan: loopPlan, modelId: "music_v2" });
```

<elevenlabs-audio-player audio-title="Seamless Loop" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/acoustic_guitar_looped.mp3" />

### Generate a similar song

Condition a brand-new song on a short slice of an existing one to carry over its musical characteristics. Because the first chunk influences every chunk that follows, applying `conditioning_ref` to the first chunk shapes the entire generation, even though only that chunk references the stored audio.

### Generate the original

```python
response = elevenlabs.music.compose_detailed(
    prompt="An upbeat pop song with bright synths and driving drums",
    music_length_ms=60000,
    model_id="music_v2",
    store_for_inpainting=True
)
song_id = response.song_id
```

```typescript
const response = await elevenlabs.music.composeDetailed({
  prompt: "An upbeat pop song with bright synths and driving drums",
  musicLengthMs: 60000,
  modelId: "music_v2",
  storeForInpainting: true,
});
const songId = response.songId;
```

<elevenlabs-audio-player audio-title="Original" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/conditioning-original.mp3" />

### Generate a new song conditioned on the original

```python
similar_plan = {
    "chunks": [
        # The first chunk conditions the whole song on the reference
        {
            "text": "[Verse]\nSalt on my skin from a borrowed sea\nCounting the heartbeats it takes to break free",
            "duration_ms": 30000,
            "positive_styles": ["pop", "energetic", "bright synths", "driving drums"],
            "negative_styles": ["sparse", "minimal"],
            "context_adherence": "high",
            "conditioning_ref": {
                "song_id": song_id,
                "range": {"start_ms": 0, "end_ms": 10000}
            },
            "condition_strength": "high"
        },
        {
            "text": "[Chorus]\nWe're rising up tonight\nNothing can stop us now",
            "duration_ms": 30000,
            "positive_styles": ["bigger drums", "layered vocals", "anthemic"],
            "negative_styles": ["sparse", "minimal"],
            "context_adherence": "high"
        }
    ]
}

audio = elevenlabs.music.compose(composition_plan=similar_plan, model_id="music_v2")
```

```typescript
const similarPlan = {
  chunks: [
    // The first chunk conditions the whole song on the reference
    {
      text: "[Verse]\nSalt on my skin from a borrowed sea\nCounting the heartbeats it takes to break free",
      durationMs: 30000,
      positiveStyles: ["pop", "energetic", "bright synths", "driving drums"],
      negativeStyles: ["sparse", "minimal"],
      contextAdherence: "high",
      conditioningRef: {
        songId,
        range: { startMs: 0, endMs: 10000 },
      },
      conditionStrength: "high",
    },
    {
      text: "[Chorus]\nWe're rising up tonight\nNothing can stop us now",
      durationMs: 30000,
      positiveStyles: ["bigger drums", "layered vocals", "anthemic"],
      negativeStyles: ["sparse", "minimal"],
      contextAdherence: "high",
    },
  ],
};

const audio = await elevenlabs.music.compose({ compositionPlan: similarPlan, modelId: "music_v2" });
```

<elevenlabs-audio-player audio-title="Conditioned New Song" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/conditioning-new.mp3" />

## Chunk reference

A `music_v2` plan contains up to 30 chunks. Each chunk is either a generation chunk or an audio reference chunk.

### Generation chunk

| Field                | Type           | Description                                                                                                    |
| -------------------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| `text`               | string         | Section name in square brackets (`[Verse 1]`), lyrics lines, and inline directions in braces (`{scratching}`). |
| `duration_ms`        | number         | Length in milliseconds (3,000 - 120,000).                                                                      |
| `positive_styles`    | array          | Styles and directions to include (max 50).                                                                     |
| `negative_styles`    | array          | Styles and directions to avoid (max 50). Defaults to empty.                                                    |
| `context_adherence`  | string         | `low`, `medium`, or `high` (default). How closely the chunk follows its surrounding chunks.                    |
| `conditioning_ref`   | object \| null | Optional `{ song_id, range }` slice of stored audio to condition on. Defaults to `null`.                       |
| `condition_strength` | string \| null | `low`, `medium` (default), `high`, or `xhigh`. How strongly the chunk follows the conditioning reference.      |

The styles for the first chunk are the most important as they set the overall tone and genre. Aim
for at least 6-7 styles in early chunks until the direction is established.

### Audio reference chunk

| Field     | Type   | Description                                                          |
| --------- | ------ | -------------------------------------------------------------------- |
| `song_id` | string | ID of the stored song to source audio from.                          |
| `range`   | object | `{ start_ms, end_ms }` slice of the stored song to insert unchanged. |

## Constraints

| Constraint                     | Value                 |
| ------------------------------ | --------------------- |
| Maximum chunks per plan        | 30                    |
| Minimum chunk duration         | 3 seconds (3,000ms)   |
| Maximum chunk duration         | 2 minutes (120,000ms) |
| Maximum conditioning reference | 30 seconds (30,000ms) |
| Minimum time range             | 50ms                  |

## Next steps

Learn composition plan fundamentals

Complete API documentation