# General Twilio Voice Regional Migration Best Practices

This guide explains how to migrate Twilio Voice workloads to a different Twilio Region. By processing and storing data outside of the default **Ashburn, VA, United States (US1)** Region, you can meet data-residency requirements, reduce latency, and improve disaster-recovery options. The other Home Regions are **Dublin, Ireland (IE1)** and **Sydney, Australia (AU1)**.

## Switching Regions: General steps

Because each Twilio Region operates in isolation, data and resources created in one Region aren't available in another. Migrating a Voice application therefore requires you to:

1. Create and configure Regional Twilio resources.
2. Adjust your application's connections to Twilio.
3. Configure Global Resource Routing.
4. Test your application and verify your migration.

### Step 1: Create and configure Regional Twilio resources

Twilio resources that your application depends on, such as API Keys, TwiML Applications, SIP Domains, and SIP Trunks, are Region-specific and must be explicitly created and configured in the new target Region. While phone numbers you own are globally accessible resources, and available in all Home regions, their Voice configurations are specific to a Region and need to be configured in the target Region in order to be functional there.

Create the Region-local resources that your application relies on:

* **API Keys**: You need an API Key that is valid in the target Region. These keys are Region-specific. You can create a new API Key in the target Region using the Twilio Console by selecting the desired Region from the menu. Make sure to note the SID and secret of the new key.
* **TwiML Applications**: If your application uses TwiML applications, create new ones in the target Region and configure their Voice URLs to point to your server endpoint. Note the SID of the new TwiML Application.
* **Push Credentials (for SDKs)**:If you use mobile SDKs for Android or iOS that use push notifications, create new Push Credentials in the target Region. You might need to use the [Twilio Conversations REST API](/docs/conversations-classic/api/credential-resource), ensuring you target the specific Region. Mobile push credential creation for the AU1 region is not supported.
* **SIP Domains and SIP Trunks**: If your application uses [Programmable Voice SIP Domains](/docs/voice/api/sip-interface) or [Twilio Elastic SIP Trunks](https://www.twilio.com/docs/sip-trunking), create these resources in each target Region. IP Access Control Lists and Credential Lists associated with these SIP resources are also Region-specific and must be created in the same Region as the trunk or domain they are linked to.

> \[!WARNING]
>
> Unlike Phone numbers, you must explicitly create SIP Domains and Elastic SIP Trunks in the target Home region. They will not be available when you navigate to a new target Home region after creating them in another Home region.

### Step 2: Adjust your application's connections to Twilio Regions

When your application connects to Twilio, whether via the REST API or SDKs, requests are processed in the default US1 Region unless you explicitly specify a target Region. To use the new target Region, you must update your application code or configuration.

* **REST API**: Specify the target [Edge Location](/docs/global-infrastructure/edge-locations) and [Region](/docs/global-infrastructure#twilio-regions) in the request's hostname (Fully Qualified Domain Name - FQDN). The FQDN format is `{product}.{edge-location}.{region}.twilio.com`. For example, to make a `POST` request to the Calls endpoint in the IE1 Region via the Dublin Edge, the FQDN would be `api.dublin.ie1.twilio.com`. [Legacy FQDNs](/docs/global-infrastructure/edge-locations/legacy-regions) without the Edge and Region are implicitly routed to US1 via the Ashburn Edge.
* **SDK Connections (Voice JS, Android, iOS)**: The SDKs connect to a Region via an Edge Location. To connect to the target Region, you must specify the target Region when generating the Access Token that your SDK client uses to authenticate. The Access Token also needs to reference the SIDs of the Region-local resources (API Key, TwiML Application, Push Credential) created in Step 1. SDK instances connected to a specific Region can only make/receive calls to/from other SDK instances or receive PSTN/SIP Trunking calls processed in that same Region. Specifying a preferred edge location for SDK calls is also possible.

### Step 3: Configure Global Resource Routing

Globally routable resources, like phone numbers, SIP Domain URIs, and SIP Trunk Termination URIs, arrive at an Edge Location and are then routed to a specific Twilio Region for processing based on their routing configuration. You need to update this configuration to route incoming traffic to the new target Region.

* **Phone Numbers**: To set the Region for incoming calls to a phone number, use the Inbound Processing Region API. You can make a `GET` request to check the current `voice_region` or a `POST` request to set it, specifying the desired `VoiceRegion`. Note that routing changes can take up to five minutes to take effect. Phone numbers provisioned via the Console automatically have an explicit routing configuration, while those provisioned via the `/IncomingPhoneNumbers` API resource might not and default to US1.
* **SIP Trunks and SIP Domains**: Routing for these resources uses the same system as phone numbers. For incoming calls to your SIP Trunk, the processing Region is determined by the associated phone number's routing. For outgoing calls from your infrastructure via a SIP Trunk's Termination URI or for SIP Domain registrations/calls, the processing Region is determined by which Region configuration for that specific URI/Domain is currently "active". This "active" Region can be changed via a "Re-route" button in the Console or by updating the routing configuration via the Inbound Processing Region API, adjusting the request URL path to include `Trunk` or `SipDomain` and the resource URI. Remember that SIP Domains and SIP Termination URIs need to be manually created in the target Region with the same configuration before changing the routing. Selecting a localized SIP URI only affects network ingress, not the processing Region.

### Step 4: Test your application and verify your migration

After you update resources and connections, test the application thoroughly:

* Make inbound and outbound calls.
* Confirm that Call Logs and any other generated resources appear *only* in the new target Region.
* Verify that no new logs appear in the previous Region.

You can check this in the Twilio Console by navigating to the specific Call Logs page for the target Region or by using the REST API to list resources from that Region.

## Troubleshooting

* **Authentication failure**: Ensure the Twilio credentials (API Key SID and Secret) you use exist in the same Region where the API request or SDK connection is being processed. When using helper libraries, explicitly specify both the `region` and `edge` parameters to avoid falling back to the default US1 Region.
* **Missing resources**: HTTP 404 errors often indicate Twilio is looking for a resource in the wrong Region. Confirm that your application connection targets the correct Region and that the resource you're referencing (e.g., TwiML App SID, Phone Number SID) was created and exists in that target Region.
* **Unsupported features**: Product and feature availability varies by Region. Check your Twilio error logs if you encounter unexpected behavior, as you might be attempting to use a feature not supported in your chosen Region. See [Regional product availability](/docs/global-infrastructure/regional-product-and-feature-availability) for more information.

## Disaster recovery

Migrating your application to a new Region can also be part of a disaster recovery plan. By preparing an alternate Region (following Step 1) and having a process to switch application connections and global resource routing (following Steps 2 and 3), you can failover your workload to the alternate Region if your primary Region becomes unavailable. This is often done in an "active/passive" configuration. Incoming PSTN traffic can be configured to failover to alternative edge regions. Outbound PSTN traffic uses a global routing database with multiple carriers and paths to ensure high availability.

> \[!WARNING]
>
> The steps you need to follow in order to prepare your alternative regional installtion can take significant amount of time and should be fully tested ahead of a disaster recovery event.
