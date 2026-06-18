> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Music quickstart

This guide will show you how to generate music with Eleven Music.

Use the [ElevenLabs music skill](https://github.com/elevenlabs/skills/tree/main/music) to generate music tracks from your AI coding assistant:

```bash
npx skills add elevenlabs/skills --skill music
```

The Eleven Music API is only available to paid users.

## Using the Eleven Music API

[Create an API key in the dashboard here](https://elevenlabs.io/app/settings/api-keys), which you’ll use to securely [access the API](/docs/api-reference/authentication).

Store the key as a managed secret and pass it to the SDKs either as a environment variable via an `.env` file, or directly in your app’s configuration depending on your preference.

```js title=".env"
ELEVENLABS_API_KEY=<your_api_key_here>
```

We'll also use the `dotenv` library to load our API key from an environment variable.

```python
pip install elevenlabs
pip install python-dotenv
```

```typescript
npm install @elevenlabs/elevenlabs-js
npm install dotenv
```

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

```python
# example.py
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
import os
from dotenv import load_dotenv
load_dotenv()

elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

track = elevenlabs.music.compose(
    prompt="Create an intense, fast-paced electronic track for a high-adrenaline video game scene. Use driving synth arpeggios, punchy drums, distorted bass, glitch effects, and aggressive rhythmic textures. The tempo should be fast, 130–150 bpm, with rising tension, quick transitions, and dynamic energy bursts.",
    music_length_ms=10000,
    model_id="music_v2",
)

# Save the track to a file
with open("path/to/music.mp3", "wb") as f:
    for chunk in track:
        f.write(chunk)
```

```typescript
// example.mts
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { Readable } from "stream";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

const track = await elevenlabs.music.compose({
  prompt: "Create an intense, fast-paced electronic track for a high-adrenaline video game scene. Use driving synth arpeggios, punchy drums, distorted bass, glitch effects, and aggressive rhythmic textures. The tempo should be fast, 130–150 bpm, with rising tension, quick transitions, and dynamic energy bursts.",
  musicLengthMs: 10000,
  modelId: "music_v2",
});

// Save the track to a file
await pipeline(Readable.from(track), createWriteStream("path/to/music.mp3"));
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You should hear the generated music playing.

## Composition plans

A composition plan is a JSON object that describes the music you want to generate in finer detail. Use text prompts for quick prototyping and composition plans when you need specific chunk structure, precise lyrics timing, or complex arrangements.

Learn how to structure songs with chunks, styles, and lyrics for precise control.

### Generating a composition plan

A composition plan can be generated from a prompt by using the API.

```python
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
import os
from dotenv import load_dotenv
load_dotenv()

elevenlabs = ElevenLabs(
api_key=os.getenv("ELEVENLABS_API_KEY"),
)

composition_plan = elevenlabs.music.composition_plan.create(
    prompt="Create an intense, fast-paced electronic track for a high-adrenaline video game scene. Use driving synth arpeggios, punchy drums, distorted bass, glitch effects, and aggressive rhythmic textures. The tempo should be fast, 130–150 bpm, with rising tension, quick transitions, and dynamic energy bursts.",
    music_length_ms=10000,
    model_id="music_v2",
)

print(composition_plan)
```

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

const compositionPlan = await elevenlabs.music.compositionPlan.create({
  prompt: "Create an intense, fast-paced electronic track for a high-adrenaline video game scene. Use driving synth arpeggios, punchy drums, distorted bass, glitch effects, and aggressive rhythmic textures. The tempo should be fast, 130–150 bpm, with rising tension, quick transitions, and dynamic energy bursts.",
  musicLengthMs: 10000,
  modelId: "music_v2",
});

console.log(JSON.stringify(compositionPlan, null, 2));
```

The above will generate a composition plan similar to the following:

```json
{
  "chunks": [
    {
      "text": "[Intro]",
      "durationMs": 3000,
      "positiveStyles": [
        "electronic",
        "fast-paced",
        "rising synth arpeggio",
        "glitch fx",
        "filtered noise sweep",
        "soft punchy kick building tension",
        "high adrenaline"
      ],
      "negativeStyles": ["soft pads", "melodic vocals", "ambient textures"],
      "contextAdherence": "high"
    },
    {
      "text": "[Peak Drop]",
      "durationMs": 4000,
      "positiveStyles": [
        "full punchy drums",
        "distorted bass stab",
        "aggressive rhythmic hits",
        "rapid arpeggio sequences"
      ],
      "negativeStyles": ["smooth transitions", "clean bass", "slow buildup"],
      "contextAdherence": "high"
    },
    {
      "text": "[Final Burst]",
      "durationMs": 3000,
      "positiveStyles": [
        "glitch stutter",
        "energy burst vox chopped sample",
        "quick transitions",
        "snare rolls"
      ],
      "negativeStyles": ["long reverb tails", "fadeout", "gentle melodies"],
      "contextAdherence": "high"
    }
  ]
}
```

### Using a composition plan

A composition plan can be used to generate music by passing it to the `compose` method.

```python
# You can pass in composition_plan or prompt, but not both.
composition = elevenlabs.music.compose(
    composition_plan=composition_plan,
    model_id="music_v2",
)

play(composition)
```

```typescript
// You can pass in compositionPlan or prompt, but not both.
const composition = await elevenlabs.music.compose({
    compositionPlan,
    modelId: "music_v2",
});

await play(composition);
```

## Generating music with details

For each music generation a composition plan is created from the prompt. You can opt to retrieve this plan by using the detailed response endpoint.

```python
track_details = elevenlabs.music.compose_detailed(
    prompt="Create an intense, fast-paced electronic track for a high-adrenaline video game scene. Use driving synth arpeggios, punchy drums, distorted bass, glitch effects, and aggressive rhythmic textures. The tempo should be fast, 130–150 bpm, with rising tension, quick transitions, and dynamic energy bursts.",
    music_length_ms=10000,
    model_id="music_v2",
)

print(track_details.json) # json contains composition_plan and song_metadata. The composition plan will include lyrics (if applicable)
print(track_details.filename)
# track_details.audio contains the audio bytes
```

```typescript
const trackDetails = await elevenlabs.music.composeDetailed({
  prompt: 'Create an intense, fast-paced electronic track for a high-adrenaline video game scene. Use driving synth arpeggios, punchy drums, distorted bass, glitch effects, and aggressive rhythmic textures. The tempo should be fast, 30–150 bpm, with rising tension, quick transitions, and dynamic energy bursts.',
  musicLengthMs: 10000,
  modelId: "music_v2",
});

console.log(JSON.stringify(trackDetails.json, null, 2)); // json contains composition_plan and song_metadata. The composition plan will include lyrics (if applicable)
console.log(trackDetails.filename);
// trackDetails.audio contains the audio bytes
```

## Copyrighted material

Attempting to generate music or a composition plan that contains copyrighted material will result in an error. This includes mentioning a band or musician by name or using copyrighted lyrics.

### Prompts with copyrighted material

In these cases, the API will return a `bad_prompt` error that contains a suggestion of what prompt you could use instead.

```python
try:
    # This will result in a bad_prompt error
    track = elevenlabs.music.compose(
        prompt="A song that sounds like 'Bohemian Rhapsody'",
        music_length_ms=10000,
        model_id="music_v2",
    )
  except Exception as e:
      if e.body['detail']['status'] == 'bad_prompt':
          prompt_suggestion = e.body['detail']['data']['prompt_suggestion']
          print(prompt_suggestion) # Prints: An epic rock ballad with dramatic tempo changes, operatic harmonies, and a narrative structure that blends melancholy with bursts of theatrical intensity.

          # Use the prompt suggestion to generate the track instead
```

```typescript
try {
  // This will result in a bad_prompt error
  const track = await elevenlabs.music.compose({
    prompt: "A song that sounds like 'Bohemian Rhapsody'",
    musicLengthMs: 10000,
    modelId: "music_v2",
  });
} catch (error) {
  if (error.body.detail.status === 'bad_prompt') {
    const promptSuggestion = error.body.detail.data.prompt_suggestion;
    console.log(promptSuggestion); // Logs: An epic rock ballad with dramatic tempo changes, operatic harmonies, and a narrative structure that blends melancholy with bursts of theatrical intensity.

    // Use the prompt suggestion to generate the track instead
  }
}
```

### Composition plans with copyrighted material

If styles using copyrighted material are used when generating a composition plan, a `bad_composition_plan` error will be returned. Similar to music prompts, a suggested composition plan `composition_plan_suggestion` will be returned within the error.

In the case of a composition plan or prompt that contains harmful material, no suggested prompt
will be returned.

## Next steps

Stream generated music in real time rather than waiting for the full file

Modify or extend specific sections of an existing music track

Explore all Music API parameters and response formats