# Lookup SIM Swap Overview

> \[!NOTE]
>
> Lookup SIM Swap is currently in **Private Beta** . [Request access now.](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP)

## What is SIM swap fraud?

SIM swap fraud occurs when a scammer hijacks a victim's mobile phone number in order to take over their online accounts. To hijack a mobile phone number, the scammer will typically [socially engineer](https://en.wikipedia.org/wiki/Social_engineering_\(security\)) a support agent at a mobile carrier, and port the victim's phone number to a SIM card that they control. After the SIM is activated, the scammer is able to receive the victim's texts and phone calls. They then begin to access their online accounts by going through account recovery flows that rely on SMS one-time passcodes or knowledge-based authentication, which the scammer has already collected answers for. These types of attacks can cause severe financial impact on an individual and unfortunately have been on the rise. Based on a study from [Action Fraud](https://www.which.co.uk/news/article/sim-swap-fraud-how-criminals-hijack-your-number-to-get-into-your-bank-accounts-aEzeh1P6N6Z8), there has been a 400% rise in the number of SIM swap fraud cases in the United Kingdom during the last five years. With many well-known individuals being SIM swapped, you may have seen it in the news.

Even [Europol](https://www.europol.europa.eu/operations-services-and-innovation/public-awareness-and-prevention-guides/sim-swapping-%E2%80%93-mobile-phone-scam) has printed this notice to raise awareness on the scam:

![Infographic explaining SIM swapping scam process involving data theft and unauthorized SIM porting.](https://docs-resources.prod.twilio.com/1f3e93d1ffb8b7c54c2903fc39099cbc9c931ce26634659143adbdd2536159a0.png)

* SIM swapping occurs when a fraudster, using social engineering techniques, takes control over your mobile phone SIM card using your stolen personal data.
* A fraudster obtains the victim's personal data through e.g. data breaches, phishing, social media searches, malicious apps, online shopping, malware, etc.
* With this information, the fraudster dupes the mobile phone operator into porting the victim's mobile number to a SIM in his possession
* The fraudster can now receive incoming calls and text messages, including access to the victim's online banking
* The victim will notice the mobile phone lost service, and eventually will discover they cannot login to their bank account

## Lookup SIM Swap

Have no fear, Twilio Lookup is here with — Lookup SIM Swap, our answer to this problem of mobile phone number compromises.

### What is Lookup SIM Swap?

Lookup SIM Swap provides **real-time authoritative data, directly sourced from mobile network operators, telling you if the SIM linked to a mobile phone number has recently changed** . This gives you assurance that the mobile channel can be used for communications or authentication with your user. It also can help you assess the potential risk that a mobile phone number, and the associated user's account, has been potentially compromised. Twilio has direct connections with carriers all over the world to offer one of the largest networks of real-time SIM swap data. This valuable data is made available through the Lookup API, giving you maximum flexibility for use in your application.

### When should I use SIM Swap in my app?

There are many possible times to assess the potential risk that a phone number is compromised, where you could consider integrating a Lookup SIM Swap query. Here are a few:

* New account opening
* User requests two-factor one-time passcode
* User is making high-risk transaction
* High-value user has logged in
* User makes inbound call into call center
* Outbound security alert is sent to user

You can use the data returned from SIM Swap to assess the potential risk that a mobile phone number is compromised. You can further qualify that a request may not be normal by looking at location, device, or IP information then trigger a SIM Swap request. By receiving the last datetime that a phone number has been SIM swapped, you have full control over the business logic and time threshold (e.g., 72 hours) that you choose to trigger any actions on suspicion of compromise.

Depending on the outcome of the query, you could take the following actions:

* Step-up auth via different channel
* Withhold transaction
* Put hold on account for 3 days
* Require customer to speak with agent or go to branch

### How does Lookup SIM Swap work?

#### Request API access

If you're interested in using Lookup SIM Swap and participating in the Private Beta, [submit this form](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP). Access will be granted to a limited set of participants on a rolling basis.

#### Make an API request

Send a mobile phone number to the Lookup API to make a SIM Swap request:

```bash
curl -X GET \
'https://lookups.dublin.ie1.twilio.com/v2/PhoneNumbers/+447772000001?Fields=sim_swap' \
-u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

The response contains a `sim_swap` object, which has information about the last SIM change associated with the mobile number:

```bash
{
  "calling_country_code": "44",
  "country_code": "GB",
  "phone_number": "+447772000001",
  "national_format": "07772 000001",
  "valid": true,
  "validation_errors": null,
  "caller_name": null,
  "sim_swap": {
    "last_sim_swap": {
      "last_sim_swap_date": "2020-04-27T10:18:50Z",
      "swapped_period": "PT15282H33M44S",
      "swapped_in_period": false
    },
    "carrier_name": "Vodafone UK",
    "mobile_country_code": "276",
    "mobile_network_code": "02",
    "error_code": null
  },
  "call_forwarding": null,
  "line_type_intelligence": null,
  "url": "https://lookups.dublin.ie1.twilio.com/v2/PhoneNumbers/+447772000001"
}
```

> \[!NOTE]
>
> The example request above uses the Ireland region (IE1). Check out [Using Lookup with Twilio Regions](/docs/lookup/using-lookup-with-twilio-regions) for more information about how to select the [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions) that your request is processed out of. Lookup fully supports data residency using the IE1 region when making SIM swap requests to EU countries, as well as the United Kingdom.

The description of the fields returned in the `last_sim_swap` object is provided in the [API docs](/docs/lookup/v2-api), but it's important to understand the `swapped_period` and `swapped_in_period` fields. Let's unpack that.

#### How to use the last\_sim\_swap fields

Carriers provide their data to Lookup SIM Swap in a variety of ways. For example, not all countries or carriers will return the exact SIM swap date, but Lookup SIM Swap will return it as the `last_sim_swap_date` field when it's available. To standardize all these different methods of conveying SIM swap information, we use the fields `swapped_period` and `swapped_in_period`. Both of these values together allow you to answer a question like, "Was the SIM for this phone number swapped in the last 24 hours?" This is done by configuring the `swapped_period` field to hold the trailing time period that you're interested in knowing if a SIM has been swapped, for example 24 hours, and using the `swapped_in_period` field to indicate yes or no. Find more information about the [field descriptions from the API docs](/docs/lookup/v2-api/sim-swap).

> \[!NOTE]
>
> The `swapped_period` field is configured one-time during onboarding and cannot currently be configured via the API. To update this field, [contact Support](https://www.twilio.com/help/contact).

### Onboarding to Lookup SIM Swap

To access Lookup SIM Swap, apply for use case approval from the major carriers in the country that you want to make lookups in. Some carriers may require that you have specific disclosures in your terms of service or privacy policy. Twilio will guide you through this process and submit your application(s) on your behalf. Carrier approvals can take between 2-4 weeks after which your account will be configured and you'll be off and running.

> \[!WARNING]
>
> * Complete the [carrier registration form](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP) to start the 2-4 week approval process.
> * Please take note of the [special terms and conditions](https://www.twilio.com/en-us/legal/service-country-specific-terms/identity-verification) for Lookup SIM Swap.

### Coverage and pricing

For the Beta, we are supporting countries in Europe, Latin America, and North America in the table below. However, we may not have complete coverage from all the major carriers in a given country. Pricing also varies based on country. Please [reach out to us](https://interactive.twilio.com/lookup-SIM-Swap) to our latest coverage, which is continually expanding, as well as detailed pricing information.

**Europe**: \*\*

* France
* Germany
* Italy
* Netherlands
* Spain
* United Kingdom\*\*

**Latin America**:

* Brazil
* Colombia

**North America**:

* Canada
* United States

> \[!WARNING]
>
> SIM Swap coverage is dependent on data from the major carriers in each country. Countries listed above may yet include all their major carriers at this time.

### More data packages

#### Lookup Call Forwarding

In addition to SIM Swap, we are also offering our [Call Forwarding](/docs/lookup/v2-api/call-forwarding) package. This tells you if a user has configured their mobile phone number, with their carrier, to forward their calls to another phone number. You can use this to detect a potential compromise of a user's voice channel, which is useful prior to sending a voice one-time passcode or critical outbound voice communication. This feature is only available in the United Kingdom supporting major carriers; it also requires carrier pre-approval prior to use.
