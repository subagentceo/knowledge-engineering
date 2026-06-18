> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Professional Voice Cloning quickstart

This guide will show you how to create a Professional Voice Clone (PVC) using the PVC API. To create a PVC via the dashboard, refer to the [Professional Voice Clone](/docs/eleven-creative/voices/voice-cloning/professional-voice-cloning) product guide.

Creating a PVC requires you to be on the [Creator plan or above](https://elevenlabs.io/pricing).

For an in-depth explanation of how IVC and PVC work under the hood and when to choose each, see [Voice cloning: how it works](/docs/eleven-api/concepts/voice-cloning).

If you are unsure about what is permissible from a legal standpoint, please consult the [Terms of
Service](https://elevenlabs.io/terms-of-use) and our [AI Safety
information](https://elevenlabs.io/safety) for more information.

In terms of creating a PVC via the API, it contains considerably more steps than creating an Instant Voice Clone. This is due to the fact that PVCs are more complex and require more data and fine-tuning to create a high quality clone.

## Using the Professional Voice Clone API

This guide assumes you have [set up your API key and SDK](/docs/eleven-api/quickstart). Complete
the quickstart first if you haven't.

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code to create a PVC voice:

```python maxLines=0
# example.py
import os
import time
import base64
from contextlib import ExitStack
from io import BytesIO
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs

load_dotenv()

elevenlabs = ElevenLabs(
  api_key=os.getenv("ELEVENLABS_API_KEY"),
)

voice = elevenlabs.voices.pvc.create(
    name="My Professional Voice Clone",
    language="en",
    description="A professional voice clone of my voice"
)

print(voice)
```

```typescript maxLines=0
// example.mts
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";
import fs from "node:fs";

const elevenlabs = new ElevenLabsClient();

const voice = await elevenlabs.voices.pvc.create({
    name: "My Professional Voice Clone",
    language: "en",
    description: "A professional voice clone of my voice",
});

console.log(voice.voiceId);
```

Next we'll upload the audio sample files that will be used to train the PVC. Review the [Tips and suggestions](/docs/eleven-creative/voices/voice-cloning/professional-voice-cloning#tips-and-suggestions) section of the PVC product guide for more information on how to get best results from your audio files.

```python maxLines=0
# Define the list of file paths explicitly
# Replace with the paths to your audio and/or video files.
# The more files you add, the better the clone will be.
sample_file_paths = [
    "/path/to/your/first_sample.mp3",
    "/path/to/your/second_sample.wav",
    "relative/path/to/another_sample.mp4"
]

samples = None

files_to_upload = []
# Use ExitStack to manage multiple open files
with ExitStack() as stack:
    for filepath in sample_file_paths:
        # Open each file and add it to the stack
        audio_file = stack.enter_context(open(filepath, "rb"))
        filename = os.path.basename(filepath)

        # Create a File object for the SDK
        files_to_upload.append(
            BytesIO(audio_file.read())
        )

    samples = elevenlabs.voices.pvc.samples.create(
        voice_id=voice.voice_id,
        files=files_to_upload # Pass the list of File objects
    )
```

```typescript
const samples = await elevenlabs.voices.pvc.samples.create(voice.voiceId, {
    // Replace with the paths to your audio and/or video files.
    // The more files you add, the better the clone will be.
    files: [fs.createReadStream("/path/to/your/audio/file.mp3")],
})
```

This step will attempt to separate the audio files into individual speakers. This is required if you are uploading audio with multiple speakers.

```python maxLines=0
sample_ids_to_check = []
for sample in samples:
    if sample.sample_id:
        print(f"Starting separation for sample: {sample.sample_id}")
        elevenlabs.voices.pvc.samples.speakers.separate(
            voice_id=voice.voice_id,
            sample_id=sample.sample_id
        )
        sample_ids_to_check.append(sample.sample_id)

while sample_ids_to_check:
    # Create a copy of the list to iterate over, so we can remove items from the original
    ids_in_batch = list(sample_ids_to_check)
    for sample_id in ids_in_batch:
        status_response = elevenlabs.voices.pvc.samples.speakers.get(
            voice_id=voice.voice_id,
            sample_id=sample_id
        )
        status = status_response.status
        print(f"Sample {sample_id} status: {status}")
        if status == "completed" or status == "failed":
            sample_ids_to_check.remove(sample_id)

    if sample_ids_to_check:
        # Wait before the next poll cycle
        time.sleep(5) # Wait for 5 seconds

print("All samples have been processed or removed from polling.")
```

```typescript maxLines=0
// Trigger the speaker separation action, this will take some time to complete
for (const sample of samples) {
    if (sample.sampleId) {
        await elevenlabs.voices.pvc.samples.speakers.separate(voiceId, sample.sampleId);
    }
}

// Check the status of the speaker separation action
const ids = samples.map((sample) => sample.sampleId);
const interval = setInterval(async () => {
    // Poll the status of the speaker separation action
    for (const id of ids) {
        if (!id) continue;

        const { status } = await elevenlabs.voices.pvc.samples.speakers.get(voice.voiceId, id);
        console.log(`Sample ${id} status: ${status}`);
        if (status === "completed" || status === "failed") {
            ids.splice(ids.indexOf(id), 1);
        }

        if (ids.length === 0) {
            clearInterval(interval);
            console.log("All samples have been processed or removed from polling");
        }
    }
}, 5000);
```

Since the previous step will take some time to complete, the following step should be run in a separate process after the previous step has completed.

Once speaker separation is complete, you will have a list of speakers for each sample. In the case of samples with multiple speakers, you will have to pick the speaker you want to use for the PVC. To identify the speaker, you can retrieve the audio for each speaker and listen to them.

```python maxLines=0
# Get the list of samples from the voice created in Step 3
voice = elevenlabs.voices.get(voice_id=voice_id)

samples = voice.samples

# Loop over each sample and save the audio for each speaker to a file
speaker_audio_output_dir = "path/to/speakers/"
if not os.path.exists(speaker_audio_output_dir):
    os.makedirs(speaker_audio_output_dir)

for sample in samples:
    speaker_info = elevenlabs.voices.pvc.samples.speakers.get(
        voice_id=voice.voice_id,
        sample_id=sample.sample_id
    )

    # Proceed only if separation is actually complete
    if getattr(speaker_info, 'status', 'unknown') != "completed":
        continue

    if hasattr(speaker_info, 'speakers') and speaker_info.speakers:
        speaker_list = speaker_info.speakers
        if isinstance(speaker_info.speakers, dict):
            speaker_list = speaker_info.speakers.values()

        for speaker in speaker_list:
            audio_response = elevenlabs.voices.pvc.samples.speakers.audio.get(
                voice_id=voice.voice_id,
                sample_id=sample.sample_id,
                speaker_id=speaker.speaker_id
            )

            audio_base64 = audio_response.audio_base_64
            audio_data = base64.b64decode(audio_base64)
            output_filename = os.path.join(speaker_audio_output_dir, f"sample_{sample.sample_id}_speaker_{speaker.speaker_id}.mp3")

            with open(output_filename, "wb") as f:
                f.write(audio_data)
```

```typescript maxLines=0
// Get the list of samples from the voice created in Step 3
const { samples } = await elevenlabs.voices.get(voiceId);

// After separation is completed, get the list of speakers and their audio
if (samples) {
    for (const sample of samples) {
        if (!sample.sampleId) continue;

        const { speakers } = await elevenlabs.voices.pvc.samples.speakers.get(voiceId, sample.sampleId)

        if (speakers) {
            for (const speaker of Object.values(speakers)) {
                if (!speaker || !speaker.speakerId) continue;
                const { audioBase64 } = await elevenlabs.voices.pvc.samples.speakers.audio.get(voiceId, sample.sampleId, speaker.speakerId);
                const audioBuffer = Buffer.from(audioBase64, 'base64');

                // Write the audio to a file
                // Note which speaker ID you wish to use for the PVC
                fs.writeFileSync(`path/to/speakers/sample_${sample.sampleId}_speaker_${speaker.speakerId}.mp3`, audioBuffer);
            }
        }
    }
}
```

Once speaker separation is complete, you can update the samples to select which speaker you want to use for the PVC.

```python
elevenlabs.voices.pvc.samples.update(
    voice_id=voice.voice_id,
    sample_id=sample.sample_id,
    selected_speaker_ids=[speaker.speaker_id]
)
```

```typescript
await elevenlabs.voices.pvc.samples.update(voice.voiceId, sample.sampleId, {
    selectedSpeakerIds: [speaker.speakerId],
})
```

Repeat this process for each sample for with multiple speakers.

Before training can begin, a verification step is required to ensure you have permission to use the voice. First request the verification CAPTCHA.

```python
captcha_response = elevenlabs.voices.pvc.verification.captcha.get(voice.voice_id)

# Save captcha image to file
captcha_buffer = base64.b64decode(captcha_response)
with open('captcha.png', 'wb') as f:
    f.write(captcha_buffer)
```

```typescript
const captchaResponse = await elevenlabs.voices.pvc.verification.captcha.get(voice.voiceId);

// Save captcha image to file
const captchaBuffer = Buffer.from(captchaResponse, 'base64');
fs.writeFileSync('path/to/captcha.png', captchaBuffer);
```

The image contains several lines of text that the voice owner will need to read out loud and record. Once done, submit the recording to verify the identity of the voice's owner.

```python
elevenlabs.voices.pvc.verification.captcha.verify(
    voice_id=voice.voice_id,
    recording=open('path/to/recording.mp3', 'rb')
)
```

```typescript
await elevenlabs.voices.pvc.verification.captcha.verify(voice.voiceId, {
	recording: fs.createReadStream("/path/to/recording.mp3"),
})
```

If you are unable to verify the CAPTCHA, you can request manual verification. Note that this will take longer to process.

This should only be used if the previous verification steps have failed or are not possible, for instance if the voice owner is visually impaired.

For a list of the files that are required for manual verification, please contact support as each case may be unique.

```python
elevenlabs.voices.pvc.verification.request(
    voice_id=voice.voice_id,
    files=[open('path/to/verification/files.txt', 'rb')],
)
```

```typescript
await elevenlabs.voices.pvc.verification.request(voice.voiceId, {
    files: [fs.createReadStream("/path/to/verification/files.txt")],
});
```

Next, begin the training process. This will take some time to complete based on the length and number of samples provided.

```python maxLines=0
elevenlabs.voices.pvc.train(
    voice_id=voice.voice_id,
    # Specify the model the PVC should be trained on
    model_id="eleven_multilingual_v2"
)

# Poll the fine tuning status until it is complete or fails
# This example specifically checks for the eleven_multilingual_v2 model
while True:
    voice_details = elevenlabs.voices.get(voice_id=voice.voice_id)
    fine_tuning_state = None
    if voice_details.fine_tuning and voice_details.fine_tuning.state:
        fine_tuning_state = voice_details.fine_tuning.state.get("eleven_multilingual_v2")

    if fine_tuning_state:
        progress = None
        if voice_details.fine_tuning.progress and voice_details.fine_tuning.progress.get("eleven_multilingual_v2"):
            progress = voice_details.fine_tuning.progress.get("eleven_multilingual_v2")
        print(f"Fine tuning progress: {progress}")

        if fine_tuning_state == "fine_tuned" or fine_tuning_state == "failed":
            print("Fine tuning completed or failed")
            break
    # Wait for 5 seconds before polling again
    time.sleep(5)
```

```typescript maxLines=0
await elevenlabs.voices.pvc.train(voiceId, {
    // Specify the model the PVC should be trained on
    modelId: "eleven_multilingual_v2",
});

// Poll the fine tuning status until it is complete or fails
// This example specifically checks for the eleven_multilingual_v2 model
const interval = setInterval(async () => {
    const { fineTuning } = await elevenlabs.voices.get(voiceId);
    if (!fineTuning) return;

    console.log(`Fine tuning progress: ${fineTuning?.progress?.eleven_multilingual_v2}`);

    if (fineTuning?.state?.eleven_multilingual_v2 === "fine_tuned" || fineTuning?.state?.eleven_multilingual_v2 === "failed") {
        clearInterval(interval);
        console.log("Fine tuning completed or failed");
    }
}, 5000);
```

Once the PVC is verified, you can use it in the same way as any other voice. See the [Text to Speech quickstart](/docs/eleven-api/quickstart) for more information on how to use a voice.

## Next steps

Create a voice clone from a short audio sample without training.

Understand the technical differences between IVC and PVC and when to choose each.