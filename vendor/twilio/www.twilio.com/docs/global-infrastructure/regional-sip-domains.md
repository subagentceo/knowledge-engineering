# Regional SIP Domains

When calls are sent to or received from devices registered with your Twilio SIP Domain, the associated call data is processed and stored within a [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions).

This guide will explain the implications to your application of this Region-specific processing and storage, and show you how to control which Twilio Region is used for calls to and from your SIP Domain.

## SIP Domains and Regional Routing

Before you can use your SIP Domain in a Region, you must first create the SIP Domain resource in the target Region. To learn how to manage Regional resources via the Twilio Console, check out [this guide](/docs/global-infrastructure/managing-regional-resources-in-console).

You may create a SIP Domain with the same friendly name and SIP URI in multiple Regions. However, a SIP Domain with a given URI will only be "active" (in the sense that it can receive registrations and calls) in one Region at any time.

When you have a SIP Domain in multiple Regions, you can check which one is active and change it as follows:

## Twilio Console

1. In [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/sip-domains), go to **Voice** > **SIP domains** and select your SIP Domain. The **Active region** section shows which Region is active.
2. To change the active Region, select **Change active region**, select the target Region, and then select **Update region**.

## Legacy Console

1. In the [legacy Console](https://console.twilio.com/us1/develop/voice/manage/sip-domains), open the Domain's configuration for a Region and look for the routing card.
2. To change which Region is active, select **Re-route** in the target Region's configuration.

Whichever Region is active will be the Region where devices are registered and calls are handled.

> \[!NOTE]
>
> Note that IP Access Control Lists and Credential Lists are also Region-specific. When configuring your SIP Domain in a given Region, you'll need to create these related resources in the same Region.

Now that you know how to configure and activate your SIP Domain in the Region of your choice, let's take a look at the different types of activities powered by SIP Domains, and see how they each relate to Twilio Regions.

### Register SIP Endpoints

Before you can make or receive calls via your SIP Domain, you'll need to register devices with the domain.

When you register SIP devices with your SIP Domain, the registration records are stored in the Twilio Region where your SIP Domain is currently routed. Devices registered in a given Region may only interact with Calls that are processed in the same Region.

For example, if you have a device registered to your SIP Domain IE1, and you attempt to make a Call to the device's AOR using the Twilio API in US1, you'll get an error indicating that the device is not registered. To successfully make the Call, you'll need to use the Twilio API in IE1. To learn more about using Twilio's Regional API endpoints, see [this guide](/docs/global-infrastructure/using-the-twilio-rest-api-in-a-non-us-region).

### Make calls from your registered devices

When Twilio receives a SIP Invite request from an endpoint registered on your Domain, it creates a corresponding Call record, and then [handles the call based on your Domain's webhook configuration](/docs/voice/api/sip-twiml). This all occurs in whichever Twilio Region your Domain is currently routed to.

Requests are authenticated based on the IP Access Control Lists and Credential Lists configured for your Domain in the Region.

### Make calls to your registered devices via REST API

When your application asks Twilio to initiate an outbound SIP Call from your domain via the Twilio REST API, the processing and storage related to the Call will occur in the same Region that you send the API request to. To learn more about using the REST API with your target Region, see [our guide](/docs/global-infrastructure/using-the-twilio-rest-api-in-a-non-us-region) on the topic.

### Make calls to your registered devices via TwiML

Another way to make a call to your Domain's registered devices is by responding with a TwiML [`<Dial><Sip>`](/docs/voice/twiml/sip) instruction to an existing Twilio Call webhook. As you might guess, the Call processing and storage for the resulting SIP call will occur in the same Region where the TwiML is processed - i.e. the Region handling the original Call.

## Connecting to a local Edge Location with localized SIP URIs

When registering devices with your SIP Domain, you can connect to Twilio via a specific Edge Location by using a "localized" form of your SIP URI. See [this reference](/docs/global-infrastructure/localized-uris/sip-uris) for a complete list of these localized URIs.

Note that the localized URI you select **does not** affect which Twilio Region will be used to process registrations and calls. The URI itself affects network ingress only, and processing Region is selected based on which of your SIP Domain's Region configurations is currently active.
