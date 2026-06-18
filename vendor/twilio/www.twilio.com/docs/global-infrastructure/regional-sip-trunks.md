# Regional SIP Trunks

When calls are sent to or received from your infrastructure by your [Twilio Elastic SIP Trunk](/docs/sip-trunking), the associated call data is processed and stored within a [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions).

This guide explains how to control which Twilio Region is used for calls made by your Trunk.

## SIP Trunks and regional routing

Before you use your SIP Trunk in a new Region, create the SIP Trunk resource in the target Region. To learn how to manage Regional resources using the Twilio Console, review the [Managing Regional Resources in the Console](/docs/global-infrastructure/managing-regional-resources-in-console) guide.

You can create an SIP Trunk with the same friendly name and Termination URI in multiple Regions. However, an SIP Trunk is only active in one Region at a time.

When you have an SIP Trunk in multiple Regions, you can control which Region is used for call origination and termination separately.

### Select an Origination Region

Twilio sends calls to your SIP infrastructure through your SIP Trunk when it receives a call to one of your Twilio phone numbers that is associated with your SIP Trunk. These SIP Trunking calls are processed and stored in the same Region where the incoming call is being handled. To control which Region handles SIP Trunking call processing and data storage for your incoming phone numbers, configure Regional routing for the phone numbers themselves. Learn how to configure Regional routing for your Twilio phone numbers in [the inbound processing guide](/docs/global-infrastructure/inbound-processing-console).

For example, consider you have a Trunk in the Twilio United States (US1) Region named "East Mountain Office" that is associated with the phone number `+14025551212`. You migrate the Trunk to the Ireland (IE1) Region to keep call processing and record storage local to Twilio's EU datacenters. You created the Trunk resource in IE1, configure its Origination SIP URI to point to your infrastructure, and associate the Trunk with your phone number. However, if the phone number is still routed to US1 based on its own configuration, it'll send calls to the US1 instance of your Trunk. To complete the migration, re-route the phone number to IE1. After you updae the routing, calls to the number are sent to the IE1 instance of your Trunk.

### Select a Termination Region

Your infrastructure sends outbound calls to the PSTN by connecting to your SIP Trunk's Termination URI. You can create Trunks with the same Termination URI in multiple Regions - however, just like phone numbers, only a single Region is "active" for a Termination URI at any time. The active Region is where the terminating calls are processed and the resulting data is stored.

For example, consider that you have a Trunk in Twilio's US1 Region with a Termination URI of `east-mountain-office.pstn.twilio.com`, and your PBX is configured to send outbound calls to this URI. You've created an instance of your Trunk with the same Termination URI in the IE1 Region. However, calls sent from your PBX will still be processed in US1, until you re-route the Termination URI such that IE1 is the active Region.

Check which Region is active by viewing the Trunk's configuration for a Region in Twilio Console and looking for the routing card. To change which Region is active, click the **Re-route** button in the target Region's configuration.

IP Access Control Lists, Credential Lists, and phone number associations are also Region-specific. When configuring your SIP Trunk in a given Region, create these related resources and settings in the same Region.

## Optimize network connectivity by selecting an Edge Location

When your infrastructure connects to Twilio using your Trunk's Termination URI, you can select a specific [Edge Location](/docs/global-infrastructure/understanding-edge-locations) to connect through by using a "localized" form of your SIP Termination URI. Click the "Show Localized URIs" button on your SIP Trunk's Termination configuration page to view a complete list of these localized URIs.

The localized URI you select **doesn't** affect which Twilio Region is used to process calls. The URI affects network ingress only; the processing Region is selected based on which of your SIP Termination URI's Region configurations is active.

You can also control which Edge Location connections from Twilio to your infrastructure are sent from, by specifying the `edge` parameter in your Trunk's Origination URIs. For details, see the [SIP Trunking documentation](/docs/sip-trunking#origination). Remember that the Edge Location you select doesn't influence the processing Region. The processing Region for originating calls is determined by the Twilio phone number's routing settings.
