> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Agent Tooling

## Overview

Agent tooling includes reusable skills and local integrations that help you automate ElevenLabs workflows in developer tools and assistants.

## Agent skills

Agent Skills are reusable building blocks for common ElevenLabs workflows. They follow the Agent Skills specification and can be used with compatible coding assistants. Install the skills with:

```bash
npx skills add elevenlabs/skills
```

The official collection is hosted in the [elevenlabs/skills](https://github.com/elevenlabs/skills) repository.
Open each skill for a prompt you can paste into your assistant after installing the skills.

Convert text to speech using ElevenLabs voices.

```text
Use the text to speech skill to generate audio for the script below.
Model: eleven_v3
Voice: "Juniper" (or default).
Output: Save the MP3 file locally and return the file path.
Script: "Welcome to ElevenLabs. Today we will walk through the new agent tooling."
```

Transcribe audio to text with timestamps.

```text
Use the speech to text skill to transcribe the audio file path/to/file.mp3.
Return a transcript that contains speaker IDs and timestamps at the start of each paragraph.
```

Stream live transcription with low latency.

```text
Use the speech to text skill to start a real-time transcription session for microphone input.
Model: scribe_v2_realtime.
Stream partial transcripts and return committed transcripts with word-level timestamps.
```

Build conversational voice agents.

```text
Use the Agents skill to create a voice agent named "Support Concierge".
Persona: friendly, concise, asks clarifying questions when needed.
Goals: answer pricing questions and route enterprise leads to sales.
```

Add voice to a custom chat agent using the [Speech Engine skill](https://github.com/elevenlabs/skills/tree/main/speech-engine).

```text
Use the Speech Engine skill to add voice to my chat agent.
Server: Node.js with an existing HTTP server.
LLM: Use my existing chat completion logic.
Output: Create the Speech Engine server route, client connection code, and setup steps.
```

Generate sound effects from text prompts.

```text
Use the Sound effects skill to generate a 3-second effect: "Wooden door creaks open, then a soft slam."
Output WAV at 48 kHz and return the file path.
```

Generate music tracks from prompts.

```text
Use the Music skill to generate a 30-second instrumental loop.
Style: lo-fi hip hop, warm, chill.
BPM: 80. No vocals.
Return the audio file path.
```

Transform a recording into a different target voice while preserving the original delivery.

```text
Use the voice changer skill to transform path/to/file.mp3 into the voice "George".
Model: eleven_multilingual_sts_v2.
Return the transformed audio file path.
```

Remove background noise from audio files.

```text
Use the voice isolator skill to remove background noise from path/to/file.mp3.
Return the cleaned audio file path.
```

Get and configure an ElevenLabs API key.

```text
How do I get my ElevenLabs API key?
```

## ElevenLabs MCP server

The ElevenLabs MCP server is a local Model Context Protocol server for the ElevenLabs platform. It runs on your machine so tools like Claude and Cursor can call ElevenLabs APIs through simple prompts.

Install and run the MCP server locally.