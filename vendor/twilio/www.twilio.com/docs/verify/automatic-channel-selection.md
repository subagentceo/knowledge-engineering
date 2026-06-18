# Verify Automatic SMS Fallback Overview

> \[!NOTE]
>
> Verify Automatic SMS Fallback is currently in the Pilot maturity stage, please [contact sales](https://www.twilio.com/en-us/help/sales) to request access to this feature.

Setting the `channel` parameter to `auto` will attempt a verification using [Silent Network Auth](/docs/verify/authentication-channels#silent-network-auth) (SNA) with a fallback to [SMS](/docs/verify/authentication-channels#sms-with-rcs-upgrade) if needed.

SNA is a very secure authentication channel that uses direct carrier connections to verify the possession of a phone number without requiring user input. However, SNA cannot be used in some cases due to carrier or network restrictions. Automatic Channel Selection works by proactively checking if an end user's IP address can support using SNA. If it doesn't, or if other restrictions or errors in the SNA process exist, the SMS channel is used as a back-up.

Learn more about how to implement [Automatic SMS Fallback](/docs/verify/api/verification#start-new-verification-with-automatic-sms-fallback).

## device\_ip parameter

It's strongly encouraged to include the `device_ip` parameter when using Automatic SMS Fallback. It is used to preemptively determine whether or not SNA will work for a given device.

To get a device's IP address, we recommend sending a hit from the device to the server to let the server determine the public IP address rather than getting the local IP address from the device directly. The public IP address allows Verify to assess its connectivity and if a device might be using a dual SIM.

## Recommended mobile app UX flow

* Display an input to the end user with a prompt to enter their phone number, including a disclaimer indicating that text messages may be received to that number.
* Display a loading screen while the application calls the [Start New Verification endpoint](/docs/verify/api/verification#start-new-verification) using the `auto` channel.
* Application checks the response for the `channel` property to see if `sna` or `sms` was used.
* If `sna` was used: Stay on the loading screen until the result of the SNA verification is known.
* If `sms` was used: Display an input to the end user with a prompt to enter the verification code, including a message that the verification was sent via SMS.
