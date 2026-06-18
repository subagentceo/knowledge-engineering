# Increase Call Answer Rates with Voice Integrity

> \[!NOTE]
>
> This page contains general information on Voice Integrity, along with some implementation details.
>
> If you're ready to enable Voice Integrity on your account(s), go to the [Voice Integrity Onboarding page](/docs/voice/spam-monitoring-with-voiceintegrity/voice-integrity-onboarding).

## Voice Integrity Overview

### The Problem: Spam Labeling of legitimate calls

Analytic engines in the US are increasingly labeling phone numbers as spam leading to reduced call answer rates and increased blocking of calls due to negative reputation.

### The Solution

Voice Integrity lets you remediate spam labels on your phone numbers and eventually monitor their reputation.

Voice Integrity is a new Trust Hub offering that lets you register your phone numbers in order to:

* Remediate spam labels
* Monitor phone number reputation (coming soon)

### What you can do today?

Through Voice Integrity, you can register your Twilio phone numbers by using the Trust Hub REST API and console. These phone numbers will be registered with analytic engines for T-Mobile, Verizon, and AT\&T.

### What's coming up?

* In the coming months, we will integrate with the analytic engine for Verizon Wireless as well. If you have already signed up for Voice Integrity, there will not be any additional action needed. We will make automatically remediate the reputation of your registered phone numbers with Verizon Wireless when available.
* You will eventually be able to monitor the reputation of your phone numbers by looking up the reputation of each phone number on each network and also signing up for notifications for reputation degradation.

### Prerequisites

To obtain an approved Voice Integrity bundle, you must do the following:

* Have an Approved Primary or Secondary Business Profile. Your Profile must include:
  * A registration authority, either an Employer Identification Number (EIN) or a Data Universal Numbering System (DUNS) number
  * A valid US business address with the correct ISO country code
  * An authorized representative with a valid US phone number
  * A functioning secure website URL (`https://`)
* Assign one or more phone numbers assigned to your Business Profile Only these assigned phone numbers can be registered for Voice Integrity.

### What else can you do to increase your call answer rates?

* Register for [Shaken/Stir](/docs/voice/trusted-calling-with-shakenstir). This is important because having highest level of Shaken/Stir attestation informs the analytic engines that you are a legitimate caller.
* Register for [CNAM](/docs/voice/brand-your-calls-using-cnam).
* Register for Branded Calling

## Next Step >

[Get started with Voice Integrity Onboarding](/docs/voice/spam-monitoring-with-voiceintegrity/voice-integrity-onboarding)

[Get started with Voice Integrity Onboarding](/docs/voice/spam-monitoring-with-voiceintegrity/voice-integrity-onboarding)
