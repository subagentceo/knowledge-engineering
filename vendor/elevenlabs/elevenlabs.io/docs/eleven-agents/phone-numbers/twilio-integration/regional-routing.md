> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Twilio regional routing

## Overview

Regional routing ensures that your telephony data stays within a specific geographic region. When using Twilio with ElevenLabs in an isolated environment (such as EU residency), you must configure regional routing correctly to maintain data residency compliance.

This guide explains what regional routing is, why it matters, and how to configure it properly in both Twilio and ElevenLabs.

## What is regional routing?

Regional routing is Twilio's mechanism for ensuring that call data is processed and stored within a specific geographic region. Think of it as data residency for your telephony infrastructure.

By default, Twilio phone numbers are configured to route through the US region (`us1`), **even if
the phone number itself is from another country**. For example, an Italian phone number will still
route through the US unless regional routing is explicitly configured.

## Why regional routing matters

When using ElevenLabs in an isolated environment (such as EU residency), all data processing must remain within your designated region. Without proper regional routing configuration:

* **Data residency violations**: Call data may be routed through unintended regions
* **Failed API operations**: Operations on ongoing calls (such as transfers, hold, resume) will fail
* **SDK routing mismatches**: The Twilio SDK defaults to the `us1` region, causing API calls to be sent to the wrong region even when Twilio has routed the call correctly on the backend

## How it works

When you import a Twilio phone number into ElevenLabs:

1. **Twilio routes the call**: Twilio automatically routes incoming calls to the region configured in your Twilio account (this can be `us1`, `ie1` for Ireland, `au1` for Australia, etc.)
2. **ElevenLabs needs to know the region**: To perform operations on ongoing calls (like transfers), ElevenLabs must send API requests to the same region where Twilio routed the call
3. **Region specification prevents failures**: By specifying the routing region in the ElevenLabs platform, we ensure all API calls target the correct Twilio region

If the routing region is not specified or is incorrect, operations like call transfers will fail
because the API requests will be sent to the default `us1` region while the actual call is being
handled in a different region.

## Configuration

### Check your Twilio regional routing

First, verify which region your Twilio phone number is configured to use:

1. Log into your [Twilio Console](https://console.twilio.com/)
2. Navigate to **Phone Numbers** → **Manage** → **Active numbers**
3. Select your phone number
4. Look for the **Voice & Fax** configuration section
5. Check the **Regional routing** or **Edge Location** setting

Common Twilio regions:

* `us1` - United States (default)
* `ie1` - Ireland (Europe)
* `au1` - Australia
* `br1` - Brazil
* `jp1` - Japan
* `sg1` - Singapore

If you're using an isolated environment (like EU residency), ensure your Twilio numbers are
configured to route through the matching region (e.g., `ie1` for EU).

### Configure regional routing in Twilio

If your phone number is not configured for the correct region:

1. In the [Twilio Console](https://console.twilio.com/), go to your phone number configuration
2. Find the **Voice & Fax** section
3. Set the **Edge Location** to match your desired region
4. Save the configuration

Regional routing configuration in Twilio may require additional setup or account permissions.
Contact [Twilio Support](https://support.twilio.com/) if you need assistance enabling regional
routing for your account.

### Specify the routing region in ElevenLabs

When you import or configure a Twilio phone number in the ElevenLabs [Phone Numbers](https://elevenlabs.io/app/agents/phone-numbers) page:

1. Navigate to the phone number configuration
2. If you're using an isolated environment, you'll see a warning message that reads: "You are using a phone number in an isolated environment. Double check the routing region for this phone number in your provider."
3. Verify that the **routing region** matches your Twilio configuration
4. Ensure the region specified matches the region configured in your Twilio account

   If you're using regional routing, you must use a **regional API key** from Twilio that
   corresponds to your routing region. Your standard US API key will not work for non-US regions
   and will result in authentication errors. Generate a region-specific API key in your [Twilio
   Console](https://console.twilio.com/).

## Verifying your configuration

To verify that regional routing is configured correctly:

1. **Check Twilio Console**: Confirm your phone number shows the correct Edge Location
2. **Check ElevenLabs Platform**: Verify the routing region setting matches your Twilio configuration
3. **Test call operations**: Make a test call and verify that operations like call transfer work correctly

Monitor your first few calls in the [Calls History
dashboard](https://elevenlabs.io/app/agents/history) after configuring regional routing to ensure
everything works as expected.

## Common issues

This typically indicates a regional routing mismatch. Verify that:

* Your Twilio phone number is configured with the correct Edge Location
* The routing region specified in ElevenLabs matches your Twilio configuration
* You're using an isolated environment that matches the routing region

The phone number's geographic origin doesn't determine routing behavior. You must explicitly
configure regional routing in Twilio. By default, all numbers (including European numbers) route
through `us1` unless configured otherwise.

If you're using the standard ElevenLabs environment (not EU residency or another isolated
environment), regional routing configuration is optional.

Choose a region that:

* Matches your data residency requirements (e.g., `ie1` for EU data residency)
* Is closest to your users for optimal latency
* Matches your ElevenLabs isolated environment (if applicable)

If you're seeing authentication errors when using regional routing, verify that you're using the correct **regional API key**:

* Regional routing requires a region-specific API key from Twilio, not your standard US API key
* Generate a new API key scoped to your target region (e.g., `ie1`, `au1`) in the Twilio Console
* Update your credentials in ElevenLabs with the regional API key
* Your Account SID remains the same, but the API key must match the region

## Best practices

* **Match regions**: Ensure your Twilio regional routing matches your ElevenLabs environment
* **Document configuration**: Keep records of which numbers use which regions
* **Test thoroughly**: Verify call operations work correctly after changing regional routing
* **Monitor calls**: Watch for failures in the Calls History dashboard that might indicate routing issues
* **Plan for scale**: If you plan to expand to new regions, consider regional routing from the start

## Additional resources

* [Twilio Regional Routing Documentation](https://www.twilio.com/docs/global-infrastructure/edge-locations)
* [ElevenLabs Data Residency Guide](/docs/overview/administration/data-residency)
* [Twilio Phone Numbers Guide](/docs/eleven-agents/phone-numbers/twilio-integration/native-integration)