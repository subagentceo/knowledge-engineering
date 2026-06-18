# Using Lookup with Twilio Regions

## Overview

To optimize application performance and control data residency, Lookup developers can select the [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions) that their Lookup request is processed out of.

Twilio Lookup currently operates in the following Regions:

* United States (US1) - Default Region
* Ireland (IE1)

To use this feature, you will need to create Region-specific authentication credentials and specify that target Region in your API requests. If no target Region is specified, the request will be handled in US1 by default. Keep in mind that Regions operate in full isolation from each other. Although Lookup does not store data beyond internal logging, its workload processing will happen in-Region. [Read more on Twilio's Region Isolation Model here](/docs/global-infrastructure/understanding-twilio-regions#twilios-region-isolation-model).

> \[!WARNING]
>
> During this initial phase of the rollout of Twilio Regions, Twilio does not guarantee that all data will remain within your selected Region. For example, [globally accessible Twilio resources](/docs/global-infrastructure/understanding-twilio-regions#globally-accessible-twilio-resources) like account-level billing and usage records are shared across all Regions.
>
> Also, when Lookup calls third-party providers, data may egress out of your selected Region depending on the requested phone number's resident country.

## Limitations

* Only the [Lookup v2 API](/docs/lookup/v2-api) is available in IE1 at this time. The Lookup v1 API is not available.
* We only guarantee that processing and storage will remain in-Region. There are cases when we call third party providers that will egress the Region. These include but are not limited to:
  * Caller Name Lookup, which only applies to US phone numbers, will call a third party provider out of Region.
  * Line Type Intelligence Lookups on US phone numbers will call a third party provider endpoint out of Region.

## Lookup API Quickstart in a non-US Twilio Region

### Step 1: Authentication

Before making an API request, you'll need to generate an API key specifically for the IE1 Region. You can then use this Region-specific API Key to authenticate Twilio API requests in the IE1 Region.

To create the key, follow these steps:

1. Log in to the [Twilio Console](https://console.twilio.com/).
2. Click the **Account** menu in the upper right corner of the screen.
3. Click **API keys & tokens** , under the **Keys & Credentials** heading.
4. Select **Ireland (IE1)** from the Region dropdown list.
5. Click the blue **Create API key** button.
6. Enter a friendly name for the key (example: "Lookup with Twilio Regions").
7. Leave **Key type** on the default option, "Standard".
8. Click the blue **Create API Key** button.

Make a note of the API Key's **SID** and **Secret** . You will need this information for the next step.

### Step 2: Make an API request with cURL

To select the target Region of IE1 for an API request, use this base URL. The parameter **dublin** is the Edge Location of your request, and it can be replaced with whichever Edge is closest to your application. See [Edge Locations](/docs/global-infrastructure/edge-locations) for a list of what Edges are available to you.

```bash
https://lookups.dublin.ie1.twilio.com/v2/PhoneNumbers/{PhoneNumber}
```

The following code samples show how to target IE1 for the SIM Swap Lookup and Line Type Intelligence endpoints. Ensure that the variables `$TWILIO_API_KEY` and `$TWILIO_API_KEY_SECRET` resolve to the IE1 Region API Key SID and Secret that you created in Step 1.

#### SIM Swap Lookup

```bash
curl -X GET \
'https://lookups.dublin.ie1.twilio.com/v2/PhoneNumbers/+447772000001?Fields=sim_swap' \
-u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

#### Line Type Intelligence

```bash
curl -X GET \
'https://lookups.dublin.ie1.twilio.com/v2/PhoneNumbers/+447772000001?Fields=line_type_intelligence' \
-u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

#### Identity Match

```bash
curl -X GET \
'https://lookups.dublin.ie1.twilio.com/v2/PhoneNumbers/+447772000001?Fields=identity_match&FirstName=John&LastName=Doe&AddressLine1=71+Cherry+Court&City=Southampton&PostalCode=SO53+5PD&AddressCountryCode=GB&NationalId=925076473&DateOfBirth=19901213' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

```
