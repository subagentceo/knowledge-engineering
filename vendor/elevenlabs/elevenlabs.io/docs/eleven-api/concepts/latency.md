> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Understanding latency

Latency in audio generation is deceptively simple-sounding but involves several distinct phenomena that are easy to conflate. Understanding the components separately makes it much easier to diagnose problems and apply the right optimisations.

## Two different latency numbers

When people ask "what is the latency of this API?", they often mean different things.

**Model inference latency** is the time the model spends generating audio. ElevenLabs Flash models achieve \~75ms model inference for typical short inputs. This is an internal measurement, excluding network round-trips and application overhead.

**Time-to-first-audio (TTFA)** is the elapsed time from when your application initiates a request to when the first audio sample actually plays for the end user. This is almost always the number that matters for user experience, and it is always larger - often substantially larger - than model inference latency alone.

The gap between these two numbers is where most latency problems live.

## What contributes to time-to-first-audio

Latency accumulates across several stages:

**Network round-trip** - your request travels from your application to ElevenLabs servers and back. Over the public internet this is typically 20–200ms depending on geographic proximity, and it is irreducible without changing your infrastructure.

**Server processing** - before the model begins generating, there is a small overhead for authentication, request validation, and scheduling. This is typically negligible (single-digit milliseconds) but is non-zero.

**Model inference** - the actual generation time. This varies by model, input length, and server load. The \~75ms Flash figure is representative for short inputs under normal conditions.

**Audio player buffering** - most audio players do not begin playback at the first byte. They buffer a small amount to prevent stuttering if the stream briefly slows down. A 500ms buffer is common; reducing it trades a small increase in stutter risk for lower perceived latency.

**Application pipeline** - if your application processes text through an LLM before sending it to the TTS API, the LLM's latency is part of the chain. In an end-to-end voice agent, the full path might be: speech recognition → LLM → TTS → audio playback, with each stage contributing its own latency.

## Why Flash models are faster than Eleven v3

The latency difference between model families is architectural, not merely a speed optimisation.

Flash models are smaller and use more aggressive approximations. They sacrifice some quality headroom to substantially reduce inference time. Eleven v3 uses a larger model with a higher-fidelity voice codec, which takes longer to run but produces richer, more emotionally nuanced audio.

This is a genuine tradeoff, not a technical limitation that will eventually go away. The \~75ms Flash latency and the higher-quality output of Eleven v3 are both consequences of deliberate architectural choices. When you choose a model, you are choosing where you sit on that tradeoff curve.

The practical implication: there is no way to get Eleven v3 quality at Flash speeds, because the quality comes from the additional computation. If your application requires both low latency and high voice quality, Flash models with the best available voices represent the upper bound of what is currently achievable.

## Why geography affects latency

ElevenLabs serves requests from server clusters in North America, Europe, and South East Asia. Requests are automatically routed to the nearest cluster.

If you are in North America and the nearest cluster is a 20ms round-trip away, your baseline latency floor is roughly 40ms before the model has processed a single byte. This is irreducible unless you control where your application runs.

One counterintuitive consequence: a latency measurement from your development laptop may not reflect what your users experience. An API that feels fast in San Francisco may feel noticeably slower to users in South Asia. If you are building a globally distributed application with strict latency requirements, you may want to ensure your application servers are geographically co-located with your users rather than just with ElevenLabs infrastructure.

## Voice type affects latency

Not all voices are equally fast to synthesise. Default voices, synthetic voices, and Instant Voice Clones generally produce audio faster than Professional Voice Clones. PVC voices involve additional model complexity that adds per-generation overhead.

This is worth knowing when designing your system: if you have both strict latency requirements and quality goals, the combination of a Flash model with an IVC or default voice will outperform the same model with a PVC voice, though the quality ceiling is also lower.

## The \~75ms figure in context

The 75ms model inference figure for Flash models is a benchmark under representative conditions. It will be higher for longer inputs (the model processes more tokens), under high server load (requests queue), and when generating with complex voices.

It is a useful reference point for comparing models, not a guarantee for every request. When diagnosing latency in your application, measure from your application, not from API benchmark figures. The numbers that matter are the ones your users experience.

## Streaming and latency

Streaming does not reduce model inference latency, but it dramatically reduces perceived latency. With streaming, your users hear audio as soon as the first chunk is generated, rather than waiting for the full synthesis to complete.

This is why streaming is the recommended approach for any application where responsiveness matters. The question is not whether to stream, but which streaming method - HTTP or WebSocket - fits your use case.

See [Understanding audio streaming](/docs/eleven-api/concepts/audio-streaming) for a detailed explanation of how streaming works and which protocol to choose.

## Related

Specific techniques and configuration options to reduce end-to-end latency.

How streaming reduces time-to-first-audio and when to use WebSockets.

Latency figures and tradeoffs for each available model.

Practical implementation of TTS streaming.