# What are DTMF Tones?

DTMF, or *Dual-Tone Multi-Frequency* tones, are in-band telecommunications signals sent over voice frequencies. Commonly used over telephone lines, DTMF tones are also commonly called *Touch Tones*.

## DTMF Tones for Automating Telecommunications Interactions

Almost as long as we've had telegraph and telephony systems, humans have needed a way to reliably interact with the system in a mechanical and reproducible way. Signalling systems have evolved to fill that role - both for routing and dialing calls as well as for interacting with phone systems once connected.

The first commonly used telephony signaling system was *pulse dialing*. Rotary phones interrupt electrical connections while spinning, and the resulting electrical pulses produced are interpreted as commands (such as 'dial this number').

![Rotary phone connected to electronics with wires, placed among flowers in a garden.](https://docs-resources.prod.twilio.com/1020dbfec774da5c9e878b1697182dba2fa1232e41d64158f0db5d100e9d9f8c.jpg)

### The Introduction of Touch Tone Phones

The first DTMF tone producing telephone was introduced in [November of 1963](https://www.edn.com/electronics-blogs/edn-moments/4424443/Tone-dialing-telephones-are-introduced--November-18--1963) for the Bell System. More user friendly than the rotation of a rotary dial, touch tone phones quickly supplanted the rotary phone. Dialing speed increased, stress on the network decreased, and users flocked to the new technology.

DTMF tones today are standardized in the International Telecommunication Union's (ITU-T) [Recommendation Q.23](https://www.itu.int/rec/T-REC-Q.23/en).

Nowadays, DTMF tones are the dominant signalling protocol for interacting with the telephone system or with automated telephone services. IVRs, or [Interactive Voice Response](/docs/glossary/what-is-ivr) systems allow callers to navigate without tying up an operator. Many other use cases for DTMF tones have also emerged - from booking appointments to checking bank balances to changing language on a phone call.

## In-Band vs. Out-Of-Band Signaling

DTMF tones are an example of an *in-band signaling protocol*; that is, signals are sent over the same communications channel as the primary data on that channel. For DTMF tones that means that tones are in the same frequency range as human voice - any DTMF tones produced can be heard over the line.

*Out-of-Band signaling protocols* take an opposite tack - signals are sent over a separate channel. Commonly used telecommunications protocols such as Signaling System No. 6 (SS6) and Signaling System No. 7 (SS7) use an out-of-band channel for signaling and switching purposes.

Although out-of-band signaling systems aren't immune from abuse, when in-band signaling protocols were dominant (especially for switching and routing) they were an order of magnitude easier to exploit. This manifested in the so-called 'Phreaking' subculture, wherein knowledgeable people could exploit tones and tone order to gain access to phone features or avoid charges. One infamous in-band signaling exploit (no longer viable) was on the [2600 Hz tone](https://en.wikipedia.org/wiki/2600_hertz), which denoted an idling phone trunk.

While in-band signals shouldn't be used to control mission-critical infrastructure, they are still very useful for telephone users. Audible feedback in the same channel gives the user some indication they properly entered a command. While building a telephony application, DTMF tones are an excellent way to add user directed interaction.

## Twilio and DTMF

### Receiving DTMF

* Twilio's [\<Gather> TwiML verb](/docs/voice/twiml/gather) supports RFC 2833 DTMF inputs. \<Gather> does not support DTMF via in-band signaling or out-of-band SIP INFO messages.
* All in-band DTMF received will be forwarded unmodified to all other parties in the call. Twilio will not detect or react to these digits.

### Sending DTMF

All digits sent are encoded using RFC-2833.

* Using [\<Number>](/docs/voice/twiml/number)'s `sendDigits` attribute
* Using [\<Play>](/docs/voice/twiml/play)'s `digits` attribute
* Using the [Call Resource](/docs/voice/api/call-resource)'s `SendDigits` parameter
* Using the [Voice SDKs' sendDigits() method](/docs/voice/sdks/javascript/twiliocall#callsenddigitsdigits)

Ready to start building out an [app that uses DTMF tones](/docs/voice/tutorials/how-to-gather-user-input-via-keypad) to navigate? We've got you covered in all of our supported languages.

Whatever your use case, [Twilio's Programmable Voice](https://www.twilio.com/en-us/voice) can help you achieve success. Let's build something amazing.
