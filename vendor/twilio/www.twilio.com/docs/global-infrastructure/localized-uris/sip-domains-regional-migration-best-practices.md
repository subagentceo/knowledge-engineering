# Twilio Programmable Voice SIP Domains Regional Migration Best Practices

Migrating your Twilio SIP Domain from the default **United States (US1)** Region to an alternate region involves several key steps, primarily centered around creating necessary resources in the target Region and then updating the routing configuration. Twilio's Region isolation model means that each Region operates independently, and data within one Region is not accessible from another. Therefore, resources used in one Region must be explicitly created in the target Region for use there.

## SIP Domains: Regional migration steps

### Step 1: Understand Region isolation

Each Twilio Region operates in isolation. This means resources and data in your original US1 Region will not automatically be created and available in an alternate region. Call data associated with your SIP Domain will be processed and stored within the Region where the calls are handled.

### Step 2: Prepare and configure regional resources

* **Create the SIP Domain in the alternate Region**: You must first create the SIP Domain resource in the target alternate Region. You can create a SIP Domain with the same friendly name and SIP URI in multiple Regions, but only one Region can be active at any time.
* **Create related resources**: Create every resource that your SIP Domain depends on in the alternate region.
  Examples include:
  * API keys: Twilio API Keys are Region-specific. You need to create an API Key that exists in an alternate region to interact with the API there.
  * TwiML applications: TwiML Applications linked to your SIP Domain for handling calls must be created in the alternate region.
  * IP Access Control Lists (ACLs) and Credential Lists: These are also Region-specific and must be created in the same alternate region as your SIP Domain. See [Using the Twilio REST API in a non-US Region](/docs/global-infrastructure/using-the-twilio-rest-api-in-a-non-us-region) for how to access the [SIP CredentialList](/docs/voice/sip/api/sip-credentiallist-resource) and [SIP IpAccessControlList](/docs/voice/sip/api/sip-ipaccesscontrollist-resource) resources in the target Region.

### Step 3: Adjust your SIP application or infrastructure connections to Twilio (if applicable)

Your application or infrastructure may need adjustments.

* **API calls**: If your application makes REST API requests related to the SIP Domain (e.g., initiating calls to registered devices via the API), these requests must explicitly target an alternate region. This is done by including the target Region (and typically an Edge Location) in the request hostname, for example, `api.dublin.ie1.twilio.com`. If you use Twilio helper libraries, they accept `edge` and `region` parameters to construct the correct FQDN.
  * **Using regional resources**: Update your application configuration to reference the SIDs of the Twilio resources (such as the new API key or TwiML app) that exist in the alternate region. Referencing resources from another Region will result in "resource not found" errors.
  * **SDK connections**: If you are using Twilio SDKs (like Voice JavaScript, Android, or iOS SDKs) that interact with the SIP Domain (e.g., devices registering to the domain), the SDKs authenticate using Access Tokens. The Access Token must specify the target Region and refer to region-specific resources (API Key, TwiML App, Push Credential).

### Step 4: Configure Global Resource Routing

SIP Domain URIs are considered globally routable resources. When incoming connections arrive at a Twilio Edge Location, the destination Region for processing is selected based on the resource's routing configuration.

* **Change the Active Region**: To migrate your SIP Domain, you need to control its routing configuration to select the alternate region as the processing Region for incoming calls and registrations.
* **Using Twilio Console**: You can check which Region is active by viewing the Domain's configuration in the Twilio Console for a specific Region and looking for the routing card for the product/resource. To change the active Region, click the **Re-route** button in the target Region's configuration.
* **Using the REST API**: You can also manage routing for SIP Domains using the [Inbound Processing Region API](/docs/global-infrastructure/inbound-processing-api). This involves making a `POST` request to set the desired `VoiceRegion`. The request URL path is similar to routing phone numbers, but you replace "PhoneNumbers" with "SipDomain" and the phone number with the Domain's full URI. For example, setting the routing to US1 for a SIP Domain in IE1 might look like a `POST` request to `https://routes.dublin.ie1.twilio.com/v2/SipDomain/<your_sip_domain_uri>` with a body containing `VoiceRegion=us1`.

> \[!WARNING]
>
> Changing the active routing region can take up to five minutes to take effect and may lead to call handling errors if not tested.

> \[!NOTE]
>
> It is strongly suggested that bulk routing changes using the REST APIs be limited to rates of less than 300 requests-per-second across all service requests. If `Too many requests` errors are received, you should try again later, at a slower rate.

### Step 5: Test and verify your migration

Once the resources are configured and routing is updated, thoroughly test your application by verifying the Call Logs. Check that Call Logs and other workload-generated data are being created in the *alternate* Region. You can do this in the Twilio Console by navigating to the specific Call Logs page for an alternate region or by using the REST API targeting an alternate region. Additionally, confirm that new Call Logs are *not* appearing in the old US1 Region's logs.

## Important considerations

* **Edge vs. Region**: Localized SIP URIs for connecting to Twilio via a specific Edge Location (like `yourdomain.sip.dublin.twilio.com`) affect network ingress but *not* the processing Region. The processing Region is determined by the active SIP Domain URI's routing configuration.
* **Dedicated accounts**: While possible within a single account, using a dedicated Account or Subaccount per Region is recommended for easier management of resources, logs, usage, and billing.
* **Test environment**: It is highly recommended to test this migration procedure in a pre-production environment that mirrors your production setup as closely as possible before making changes in production.
* **Unsupported features**: Confirm that all Twilio products and features your application relies on are available in the target Region.

By following these steps, you can effectively migrate your SIP Domain's processing from one region to another.
