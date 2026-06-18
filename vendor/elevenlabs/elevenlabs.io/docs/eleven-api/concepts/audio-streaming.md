> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Understanding audio streaming

When you stream a video, you are downloading a file. The server sends bytes and your player buffers them until enough arrive to play. Audio generation streaming is fundamentally different. The audio does not exist yet when streaming begins. The model is synthesising it in real time, and the streamed bytes are the live output of that synthesis process.

This distinction matters because it changes how you reason about latency, buffering, and failure modes.

## What happens when you call the streaming endpoint

When you call ElevenLabs' streaming TTS endpoint, the following sequence occurs:

1. Your request arrives at the server.
2. The model begins synthesising speech.
3. As audio is generated, the server sends it progressively. Typically in chunks of a few kilobytes.
4. Your client receives and plays each chunk as it arrives.

The critical point is step 3: the server does not wait for the entire audio file to be ready before sending. This is what makes streaming fundamentally different from the standard endpoint, which waits for synthesis to complete before returning any audio at all.

## Why streaming reduces time-to-first-audio

With the standard endpoint, the time-to-first-audio equals the time required to synthesise the entire piece of text. For a short sentence this might be 500ms; for a paragraph it could be several seconds.

With streaming, time-to-first-audio is roughly the time required to synthesise the first audio chunk. Typically the first few hundred milliseconds of speech. Everything after that plays while subsequent chunks are being generated in parallel.

This is why streaming is essential for real-time applications: the user hears sound within a fraction of a second, even if the full generation takes longer.

## The two streaming protocols

ElevenLabs supports two streaming approaches, and they serve different use cases.

**HTTP streaming** (server-sent events) is the simpler approach. You send a complete piece of text upfront, and the server streams audio back as it is generated. This works well when you have all the text before you start. For example, a pre-written script or a complete LLM response that you want to play immediately.

**WebSocket streaming** enables bidirectional communication. You can send text incrementally, word by word or sentence by sentence, and the model begins generating before the full input is available. This is what makes end-to-end low-latency voice pipelines possible: an LLM generates tokens, you forward them to the TTS WebSocket as they arrive, and audio begins playing before the LLM has even finished its response.

The WebSocket approach introduces more complexity. The model needs to decide when to commit to generating audio: too early and it may produce unnatural prosody at phrase boundaries; too late and latency suffers. This is controlled through chunk schedules and the `auto_mode` setting, which handles this tradeoff automatically for most use cases.

## Why chunk size affects both latency and naturalness

A fundamental tension in streaming audio generation is the relationship between chunk size and speech naturalness.

Speech synthesis models benefit from seeing context. Knowing what comes before and after a given word helps the model produce natural prosody. A model generating audio from "The economy" has very different prosody considerations depending on whether the sentence ends with "is recovering" or "is in freefall."

Committing to audio too early, before the model has seen enough text, risks producing speech that sounds unnatural at phrase boundaries. Technically correct, but slightly robotic. Waiting for more context improves naturalness but increases latency.

ElevenLabs' `auto_mode` attempts to find a good balance automatically by analysing the incoming text. For most applications this produces good results. When you need finer control, for instance, in a voice agent where you are willing to accept slightly less natural prosody in exchange for lower latency, you can configure the chunk schedule directly.

## Streaming latency vs generation latency

It is easy to conflate these two, but they are different numbers.

**Generation latency** is how long the model takes to produce audio. This is what the \~75ms Flash model figure refers to: the model's inference time for a short text input, excluding network round-trips and application overhead.

**Time-to-first-audio** is the elapsed time from when your application initiates a request to when the first audio sample actually plays for the end user. This includes network latency, server processing time, and any buffering your audio player introduces.

In practice, you can expect time-to-first-audio to be significantly higher than raw model latency alone. Network round-trips add 50–200ms depending on geographic distance. Your audio player's buffer adds more. Understanding this distinction helps you set realistic expectations and diagnose performance issues: if time-to-first-audio is high, the bottleneck is usually network or application buffering, not model performance.

## Common misconceptions

**"The streaming endpoint is slower because it sends data incrementally."** No, it is faster for your users because they hear audio sooner. The total generation time is similar; what changes is when data starts arriving.

**"I need WebSockets to stream."** Not necessarily. The HTTP streaming endpoint handles most use cases well. WebSockets are specifically valuable when you are generating text and audio concurrently. For example, an LLM producing text that feeds directly into audio generation.

**"Higher quality audio formats significantly increase streaming latency."** This is mostly overstated. The primary latency contributors are model inference time and network round-trip. A higher-bitrate output format adds modest overhead, rarely worth optimising before addressing the larger contributors.

## Related

Practical implementation with code for HTTP streaming and WebSocket streaming.

Using the bidirectional WebSocket endpoint for real-time audio generation.

A broader look at what contributes to end-to-end latency in audio generation.

Specific techniques and configuration options to reduce time-to-first-audio.