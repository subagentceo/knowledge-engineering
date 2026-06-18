# Set a phone number's inbound processing Region using the Console

This guide explains how to control which [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions) handles incoming calls to your phone numbers.

The examples in this guide target the Australia (AU1) Region.

To get the most out of this guide, familiarize yourself with the concepts described in the [Inbound Call Processing](/docs/global-infrastructure/inbound-call-processing) overview.

## Pin the Phone Numbers product menu for your target Region

Pinning the Phone Numbers product menu for your target Region allows you to manage your phone number configuration in the context of the target Region. This feature is available in the *legacy* Twilio Console. If you're using the new Twilio Console, confirm that your phone numbers are configured for your target Region.

## Twilio Console

To confirm that your Phone Numbers are configured for your target Region in the Twilio Console.

1. Navigate to **Numbers & Senders > Phone Numbers**, then select your phone number.
2. In the **Regional** tab, check that your phone number's active Region is set to your target Region. If not, click **Change active region**.
3. Select the Region you want to switch to, and click **Update region**.

## Legacy Console

Use Region-specific product navigation menus in the Twilio Console to manage resources and configuration for a specific Twilio Region.

Follow these steps to ensure that the "Phone Numbers" product is pinned in the navigation menu for your target Region.

1. Go to the **Develop** tab and click **Explore Products**.
2. In the **Super Network** section, find the **Phone Numbers** card.
3. Click the down arrow icon (**⌄**) to show available Regions.
4. If your target Region is unpinned, click on the Region name or the pin icon to pin it.

If this is the first product you've pinned for the target Region, the side navigation updates to include a collapsible section for this new target Region.

Find the collapsible section for the target Region.

> \[!NOTE]
>
> If you don't see any collapsible Region sections in the navigation menu, you only have products pinned in one Region. In this case, all products in the navigation menu implicitly operate on that one Region.

Expand the target region section to find the Phone Numbers product menu for that Region.

## Access your phone number's configuration in the target Region

> \[!WARNING]
>
> The following instructions apply to the legacy Twilio Console. If you're using the new Twilio Console, confirm that your phone numbers are configured for your target Region as described in [Pin the Phone Numbers product menu for your target Region](#pin-the-phone-numbers-product-menu-for-your-target-region).

To find the configuration page for a phone number in your target Region:

1. Expand the menu section for your target Region (skip this step if there are no Region sections present in the navigation menu because you only have one Region pinned).
2. Under the expanded target Region section, click to expand **Phone Numbers** , followed by **Manage**.
3. Finally, click on **Active numbers** .

All of your account's phone numbers are listed here. Click on a number to go to the configuration page for that number in the context of your target Region.

## Review the phone number's Region-specific configuration

> \[!WARNING]
>
> The following instructions apply to the legacy Twilio Console. If you're using the new Twilio Console, confirm that your phone numbers are configured for your target Region as described in [Pin the Phone Numbers product menu for your target Region](#pin-the-phone-numbers-product-menu-for-your-target-region).

Review the phone number's configuration in the target Region. The configuration might be different to the configuration for the same number in other Regions, so ensure that the configuration values are appropriate before activating incoming call routing to the Region.

For example, you should check that the Incoming Call webhook URL settings are correct for your application.

> \[!NOTE]
>
> To test incoming call handling in the Region without interacting with your application, consider using the demonstration URL for your Incoming Call webhook: [https://demo.twilio.com/welcome/voice/](https://demo.twilio.com/welcome/voice/)
>
> This URL returns a TwiML Response that instructs Twilio to play a sample message to the caller.

## Review and change the phone number's incoming call routing setting

> \[!WARNING]
>
> The following instructions apply to the legacy Twilio Console. If you're using the new Twilio Console, confirm that your phone numbers are configured for your target Region as described in [Pin the Phone Numbers product menu for your target Region](#pin-the-phone-numbers-product-menu-for-your-target-region).

Go to **Routing** to see the number's current incoming call routing setting in this Region.

This panel indicates whether the target Region is the "Active" Region for incoming call routing or not.

* **If the target Region is identified as "Active"**: incoming calls to the number are routed to this Region.
* **If the target Region is identified as "Inactive"**: incoming calls to the number are routed to another Region.

If the target Region is not set to Active, you can opt to set it to Active by clicking on the **Re-route** button. You must confirm the change for it to take effect.

> \[!CAUTION]
>
> Changing a phone number's incoming call routing Region can lead to call handling errors in certain cases. Test call routing in the target Region in a pre-production environment before changing routing in production.

## Verify the incoming call routing Region

To verify that calls to your phone number are being handled in the appropriate Region after a routing change:

1. Place a call to your phone number from any phone.
2. Visit the phone number's **Call Logs** from the target Region.
3. Verify that you find a new call log that corresponds with your sample call from step 1.
4. Visit the phone number's **Call Logs** in a different, non-Active Region.
5. Verify that you **do not** find a Call Log that corresponds with your sample call.

## Next steps

Now that you can handle incoming calls in a specific Twilio Region, check out these resources to learn more about building with Twilio Regions.

* [Make an outbound call in a non-US Region using the Twilio API](/docs/global-infrastructure/create-an-outbound-call-via-rest-api-in-a-non-us-twilio-region)
