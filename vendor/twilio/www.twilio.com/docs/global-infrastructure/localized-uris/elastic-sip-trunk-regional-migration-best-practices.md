# Twilio Elastic SIP Truking Regional Migration Best Practices

Moving your Elastic SIP Trunk's processing and storage from the default US1 (United States) Region to an alternate region involves specific steps because Twilio Regions operate in isolation; resources and data are processed in and confined to the Region where they are active.

As Elastic SIP Trunks are a Regional resource, part of the process of migrating your Twilio services to a new Region involves creating, configuring and preparing these resources in each region, configuring global resource routing, and testing.

## Elastic SIP Trunking Regional migration: general steps

### Step 1: Understand Region isolation

Each Twilio Region operates in isolation. This means resources and data in your original US1 Region will not automatically be created and made available in an alternate region. Call data associated with your SIP Trunk will be processed and stored within the Region where the calls are handled.

### Step 2: Prepare and configure Regional resources

Your Elastic SIP Trunk resource itself is Region-specific and must be created in the target Region (for example, IE1) before you can use it there. To simplify your SIP infrastructure configuration, you would want to be able to use the same trunk across multiple regions. To do this, you must create the SIP Trunk with the same friendly name and Termination URI in each Region, but only one region will be "active" at a time.

* **Create the SIP Trunk:** You must first create the SIP Trunk resource in the target Region. This can be done via the [Twilio Console](/docs/global-infrastructure/regional-sip-trunks) or via [REST API](/docs/global-infrastructure/inbound-processing-region-api-trunk).

If you wanted to create a SIP Trunk in Ireland with the REST API you would target the IE1 Region like the following:
`POST https://trunking.dublin.ie1.twilio.com/v1/Trunks`

* Set the Termination SIP URI to the same SIP URI as your current Region.
* **Configure Authentication:** IP Access Control Lists and Credential Lists associated with your SIP Trunk are also Region-specific. You will need to create these resources in each Region and assign them to the Trunk SID resource. See [Using the Twilio REST API in a non-US Region](/docs/global-infrastructure/using-the-twilio-rest-api-in-a-non-us-region) for how to access the [SIP CredentialList](/docs/voice/sip/api/sip-credentiallist-resource) and [SIP IpAccessControlList](/docs/voice/sip/api/sip-ipaccesscontrollist-resource) resources in the Target Region.

Once you have your Authentication resources created, you can attach them to your Trunks. If you wanted to attach a credential list to a Trunk homed in Ireland you would target the IE1 Region like the following:
`POST https://trunking.dublin.ie1.twilio.com/v1/Trunks/{TrunkSid}/CredentialLists`

* Add all Phone numbers to the new SIP Trunk in the new Target Region.
* **Configure Phone Number Configuration (for Origination):** If you use a Twilio phone number with this SIP Trunk for incoming (Origination) calls from the public telephone network (PSTN), the phone number's configuration is Region-specific. Ensure the phone number's configuration in the target Region is set up correctly to point to the appropriate Trunk before proceeding. This can be reviewed and adjusted via the [Console](/docs/global-infrastructure/inbound-processing-console) or [REST API](/docs/global-infrastructure/inbound-processing-api).
* You must leave the SIP Trunking configuration and navigate to Phone numbers where you can select the number you just added to the trunk and choose to route to your new target region.
* If you prefer using the REST API and wanted to move the phone number assigned to the SIP trunk from US1 to IE1 then you could use the following API:
  `POST https://routes.dublin.ie1.twilio.com/v2/PhoneNumbers/+16505551212 -d VoiceRegion=ie1`

You can also use the API to access and update the region-specific configuration of a phone number using the IncomingPhoneNumber resource. See [Using the Twilio REST API in a non-US Region](/docs/global-infrastructure/using-the-twilio-rest-api-in-a-non-us-region) for how to access the [IncomingPhoneNumber](/docs/phone-numbers/api/incomingphonenumber-resource) resource in the target Region.

### Step 3: Adjust your equipment's SIP connections to Twilio (if applicable)

If your SIP equipment or application initiates outbound (Termination) calls via the SIP Trunk, you may need to ensure it connects to an alternate edge-location for those calls once you have migrated to the new region. For instance, if you are migrating your Trunk to `IE1`, you may want to use the `dublin` edge-specific FQDN so the SIP INVITE routes to and ingresses to Twilio via the Dublin edge location.

### Step 4: Adjust any API connections you use to manage your SIP Trunks to point to the new region (if applicable)

If your installation uses the Twilio Elastic SIP Trunking APIs to manage your trunks, you should adjust your resources to use the API FQDNs in the new region.

* **Target IE1 for API Requests**: Explicitly specify the correct target Edge and Region in your API request's hostname (FQDN), like `trunking.dublin.ie1.twilio.com` and/or `api.dublin.ie1.twilio.com`.
* **Use IE1 API Keys**: Ensure your application uses a Twilio API Key that was created in an alternate region. If using helper libraries, specify the `region` and `edge` parameters when creating the client to ensure it targets the correct Region and uses the corresponding credentials.

### Step 5: Configure Global Resource Routing

Calls are routed first, to an Edge, and based on the configuration of the regional routing configurations, fetch and process authentication and configuration from the Home region. Globally routable resources include Elastic SIP Trunk Termination and Origination configurations and associated phone numbers. The final step to move the processing of your Elastic SIP Trunks to an alternative region is to update this global resource routing.

* **Configure Termination Routing (Outbound from your infrastructure)**: Change the "active" Region for your SIP Trunk's Termination URI to the alternate region. This determines where outgoing calls sent from your infrastructure to the Trunk's URI will be processed.
  * **Using the Twilio Console**: You can check which Region is active by viewing the Trunk's configuration in the Console and looking for the routing card, and change it by clicking the "Re-route" button in the target Regional home.
  * **Using the REST API**: You can also manage routing for Elastic SIP Trunks using the Inbound Processing Region API. This involves making a `POST` request to set the desired VoiceRegion. For example, setting the routing to US1 for a SIP Trunk in IE1 might look like a `POST` request to `https://routes.dublin.ie1.twilio.com/v2/Trunks/<your_sip_trunk_sid>` with a body containing `VoiceRegion=us1`.
* **Configure Origination Routing (Incoming call from PSTN to your phone number)**: If your SIP Trunk is linked to a Twilio phone number for receiving incoming calls (Origination), the processing Region for those calls is determined by the phone number's Regional routing configuration.
  * **Re-route the associated Twilio phone number to the alternate region**: This must be done using the Phone Number resource's regional configuration. You can set the phone number's inbound processing Region using the [Inbound Processing Region API](/docs/global-infrastructure/inbound-processing-api) by making a `POST` request specifying the `VoiceRegion`, or via the Console Phone Numbers page, similar to Termination settings above. Note that phone numbers themselves are globally accessible, but their routing is Region-specific.
  * **Adjust [Edge Location](/docs/global-infrastructure/regional-sip-trunks#optimize-network-connectivity-by-selecting-an-edge-location) in your Trunk Origination URIs**: If you want to achieve full data isolation, then make sure to set the edge parameter to your new target home region so that signaling/media egress from there.

**Note:** this may mean that your SIP infrastructure will need to allow traffic from IP addresses in different edge location.

> \[!WARNING]
>
> Changing the active routing region can take up to five minutes to take effect and may lead to call handling errors if not tested.

> \[!NOTE]
>
> It is strongly suggested that bulk routing changes using the REST APIs be limited to rates of less than 300 requests-per-second across all service requests. If `Too many requests` errors are received, you should try again later, at a slower rate.

### Step 6: Test your application and verify your migration

After updating your resources and routing, thoroughly test your SIP Trunk functionality for both incoming (Origination) and outgoing (Termination) calls.

* **Verify Call Logs:** An important step is to check that Call Logs and other workload-generated data are being created in the *alternate* Region. You can do this in the Twilio Console by navigating to the specific Call Logs page for an alternate region or by using the REST API targeting an alternate region. Confirm that new Call Logs are *not* appearing in the old US1 Region's logs.

### Important Considerations

* **Edge vs. Region:** Note that localized SIP URIs for connecting to Twilio via a specific Edge Location (like `yourdomain.pstn.dublin.twilio.com`) affect network ingress but *not* the processing Region. The processing Region is determined by the active SIP Trunk/Termination URI's routing configuration or the associated phone number's routing configuration.
* **Dedicated Accounts:** While possible within a single account, using a dedicated Account or Subaccount per Region is recommended for easier management of resources, logs, usage, and billing.
* **Test Environment:** It is highly recommended to test this migration procedure in a pre-production environment that mirrors your production setup as closely as possible before making changes in production.
* **Unsupported Features:** Confirm that all Twilio products and features your application relies on are available in the target Region.

By following these steps, you can effectively migrate your Elastic SIP Trunk's processing from one region to another.
