# Verify Channel Selection

## Overview

When you [start a new verification](/docs/verify/api/verification#start-new-verification) via the Verify API to send a one-time password (OTP) or verify a phone number, you specify a `channel` parameter, such as `sms`, `whatsapp`, etc. The standard behavior is that Verify uses that specified channel and nothing more. However, if that channel fails to deliver the OTP, or if there is a better channel that could result in a higher [Verification Success Rate](https://www.twilio.com/en-us/blog/validate-measure-success-verify-implementation) or lower cost to you, it would be beneficial for Verify to automatically select the best channel(s) based on its network-wide data. This eliminates the need for you to handle failure scenarios and can improve your business outcomes. This collection of features is called **Verify Channel Selection (Orchestration)** and falls into two categories: **Optimal Channel Selection** and **Fallback**. This document explains their behaviors and how you can configure them.

## Optimal Channel Selection features

**Optimal Channel Selection** features are those that use Verify's network-wide data to select an optimal channel to deliver an OTP. A variety of data is used, such as differences in OTP Conversion Rate, Verification Success Rate, and cost between different channels. These are the specific features:

1. **RCS Upgrade**: With this feature, Verify automatically upgrades delivery of an OTP message from SMS to the RCS channel, even though `channel=sms` was specified in the [start verification](/docs/verify/api/verification#start-new-verification) request. This feature provides improved message security and encryption, and potentially higher Verification Success Rate and lower costs. This feature is enabled by default. See [RCS Messaging with Verify](/docs/verify/rcs) for more information.
2. **WhatsApp no-code**: To configure Verify to attempt OTP delivery via WhatsApp first for specific countries, consult the Verify team once you have a working [WhatsApp Sender](/docs/verify/whatsapp/byo). This setup allows Verify to send the OTP via WhatsApp even when `channel=sms` was specified in the [start verification](/docs/verify/api/verification#start-new-verification) request. The Verify team can provide expertise on which countries would benefit from this configuration and can perform tailored A/B experiments on your traffic to test the performance of each channel. This feature is opt-in. See [Verify over WhatsApp](/docs/verify/whatsapp) for more information.

## Fallback features

Fallback (failover) features are those where Verify automatically falls back to using an alternate channel after detecting that the previously selected channel will fail to deliver the OTP and verify the phone number. Optimal Channel Selection and Fallback can happen in sequence, such as an RCS Upgrade followed by an SMS Fallback.

Common reasons why a channel might not work in all cases, necessitating a fallback to a different channel:

1. **Channel unavailable for a country/region.**
2. **Channel outage or degradation:**
   * Verify has real-time monitoring of OTP conversion rates and deliverability across the customer network. Alerts trigger when a drop is observed, and we temporarily switch to sending the message through the fallback channel.
3. **Destination handset or phone number does not support the channel:**
   * **WhatsApp**: The phone number is not associated with a WhatsApp account. The end-recipient does not have WhatsApp ([Twilio Error Code: 63024](/docs/api/errors/63024#error-63024)). There is a minimal chance (\<0.2%) of duplicate attempts to send your OTP message if a WhatsApp user has signed in to multiple devices at once.
   * **RCS**: The destination handset does not have RCS enabled ([Twilio Error Code: 63036](/docs/api/errors/63036)).
4. **Destination handset is offline for a channel but can be reached via a different channel:**
   * **RCS**: RCS requires that the handset has WiFi or cellular data connectivity to receive a message. SMS only requires telephony connectivity.
   * **Silent Network Auth (SNA)**: SNA requires that the handset has cellular data connectivity to deterministically verify a user's phone number with the carrier via an active data session. SMS only requires telephony connectivity.
5. **Channel misconfiguration:**
   * **WhatsApp**:
     * The business customer violates Meta's [Commerce Policy](https://business.whatsapp.com/policy).
     * Missing customer-provided Messaging Service or [WhatsApp Sender](/docs/verify/whatsapp/byo).
     * Missing or misconfigured WhatsApp authentication templates. ([Twilio Error Code: 68008](/docs/api/errors/68008))
   * **RCS**:
     * The business customer violates Google's RCS [Terms of Service](https://developers.google.com/business-communications/rcs-business-messaging/support/tos).
     * Missing customer-provided Messaging Service or [RCS Agent](/docs/rcs).

The table below lists the supported combinations of starting channels and fallback channels. For each combination, the potential fallback reasons are indicated (referencing the reasons above).

| Starting Channel                               | Default Behavior                                 | Non-default Behavior                                      | Fallback Channel and Reasons |
| ---------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------- | ---------------------------- |
| **SMS** (`channel=sms`)                        | Will fallback to RCS (if RCS is available )      |                                                           | ✅ (1, 2.a)                   |
| **WhatsApp** (`channel=whatsapp`)              | Will fallback to SMS (if SMS channel is enabled) | Consult with the Verify team to enable Fallback for (3.a) | ✅ (1, 2.a, 5.a)              |
| **RCS** (`channel=sms`)                        | Will fallback by default to SMS                  |                                                           | ✅ (1, 2.a, 3.b, 4.a, 5.b)    |
| **Silent Network Auth (SNA)** (`channel=auto`) | Will only fallback to SMS if `channel=auto`      |                                                           | ✅ (1, 4.b)                   |

Starting channels can be selected in one of two ways:

1. **Channel parameter in [start verification](/docs/verify/api/verification#start-new-verification) request.**
   * The WhatsApp channel is disabled by default. [Bring your own Sender](/docs/verify/whatsapp/byo) to enable it.
   * The SNA channel requires [upfront configuration of your Verify Service](/docs/verify/email).
2. **Optimal Channel Selection**, when enabled, which may override the `channel` parameter.

> \[!NOTE]
>
> * This guide does not cover selection or fallback between different senders within the same channel (for example, SMS delivery via different short codes, long codes, Sender IDs, or providers).
> * To join the WhatsApp no-code optimal channel selection pilot, [contact Twilio](https://docs.google.com/forms/d/1SDINHO0YVYNHtrBtlmjlNBF87zm10dt5y03-57jRTlg/edit).
