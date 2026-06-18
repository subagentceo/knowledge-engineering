> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Voice cloning: how it works

Voice cloning is the process of capturing a speaker's vocal characteristics - timbre, cadence, accent, pronunciation - and applying them to new speech synthesis. ElevenLabs offers two cloning methods: Instant Voice Cloning (IVC) and Professional Voice Cloning (PVC). These are not simply fast and slow versions of the same thing; they work differently at a fundamental level.

## What voice cloning does and doesn't do

Voice cloning captures a *representation* of a voice, not a recording of it. The system learns patterns - formant frequencies, prosodic tendencies, spectral characteristics - from your audio samples and encodes them into parameters that guide speech synthesis.

This means cloned voices can say things the original speaker never said. It also means the quality of the clone is bounded by what the model can learn from your samples: poor quality recordings, short samples, or noisy audio will all degrade the clone.

What voice cloning does not do is reproduce the exact acoustics of the original recording. The output passes through the synthesis model, which has its own characteristics. A clone sounds like the speaker, but through the lens of the model's voice codec.

## Instant Voice Cloning

Instant Voice Cloning works through *few-shot* adaptation: the model uses your audio sample as a conditioning signal at inference time, adjusting its output to match the target voice without any model weight updates.

This has several implications:

**It is immediate.** There is no training process. You upload audio and the clone is available straightaway.

**The quality ceiling is set by the reference audio.** The model uses your recording as a live reference during generation. Background noise, compression artefacts, or an atypical recording environment all influence the output.

**It works from short samples.** Less than two minutes of audio can produce a usable clone, though more samples - and varied speech across different sentences, tones, and cadences - generally improve consistency.

**It generalises less well across speech styles.** Because the conditioning is done at inference time rather than through fine-tuning, IVC clones can be less consistent when asked to produce speech that differs substantially from the reference material. A voice cloned from calm narration may sound different when asked to express strong emotion.

## Professional Voice Cloning

Professional Voice Cloning takes a different approach: it fine-tunes the model on your audio samples. Rather than using the audio as a conditioning signal at generation time, PVC actually modifies model parameters to better represent the target voice.

This has meaningfully different implications:

**Quality is substantially higher.** Fine-tuning allows the model to capture voice characteristics more deeply, including stylistic tendencies that IVC cannot reliably reproduce. PVC voices are more consistent across different speech types and handle emotional range better.

**It requires more data.** The fine-tuning process needs enough audio to be statistically informative. ElevenLabs recommends approximately 30 minutes of high-quality audio. More is generally better; short or low-variety samples do not give the model enough signal.

**Audio quality matters more.** Because the model is learning from your recordings rather than just conditioning on them at inference time, recording quality affects the model weights themselves. Professional recording conditions - minimal background noise, consistent microphone placement, no compression - produce meaningfully better results.

**It takes time.** Fine-tuning is a compute-intensive process. PVC creation takes minutes rather than seconds.

**It requires plan eligibility.** PVC requires a Creator plan or above, reflecting the compute investment involved.

## The verification process

Both IVC and PVC include a voice verification step. This is not a technical requirement of the synthesis - it is an ethical and legal safeguard.

The verification process uses voice-captcha technology to confirm that you are the person providing the voice samples, rather than using recordings of someone else without their consent.

There are inherent limitations: verification cannot guarantee that the provided recording truly belongs to the requester, only that the requester was present and actively participating. ElevenLabs' Terms of Service and AI Safety policies place the responsibility for authorised use with the creator.

## Speaker separation

When source audio contains multiple speakers, a speaker separation step can be applied to isolate the target voice before cloning. This is useful when recordings come from meetings, conversations, or interviews.

Speaker separation works best when voices are clearly distinct and the target speaker has substantial, continuous speaking time. It becomes unreliable when voices overlap frequently, when speakers have similar acoustic profiles, or when the target speaker has very short or fragmented turns.

Speaker separation is a signal processing approximation, not a perfect isolation. The separated audio will have subtle artefacts compared to a clean single-speaker recording. When these artefacts become training data in PVC, they affect the resulting clone - another reason why high-quality, single-speaker recordings are preferable when available.

## When to use IVC vs PVC

The decision depends on three factors: time to deployment, audio availability, and quality requirements.

**Use IVC when**: you need a clone quickly, you have limited source audio (under a few minutes), you are building a prototype or testing, or your application can tolerate moderate voice consistency across different speech styles.

**Use PVC when**: voice quality and consistency are a priority, you have access to high-quality recordings of at least 30 minutes, you are building a production application where the cloned voice represents a brand or a real person, and you are on a Creator plan or above.

For most production applications with genuine quality requirements, PVC is the better choice. IVC is a practical starting point for exploration, personalisation features, or cases where the speaker cannot provide extended recording sessions.

## Related

How to create an Instant Voice Clone via the API.

How to create a Professional Voice Clone via the API.

Voice types, management, and the voice library.

How to generate a new voice from a text description instead of cloning one.