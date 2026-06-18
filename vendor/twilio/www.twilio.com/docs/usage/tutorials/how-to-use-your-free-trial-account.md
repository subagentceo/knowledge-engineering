# Get started with your Twilio free trial account

You can sign up for a Twilio free trial account without a credit card. After you sign up, explore the solutions for your use case in the Twilio Console.

## What you get with your Twilio trial account

Your trial includes product-specific free units — such as 100 SMS messages, 3,000 emails, and 75 voice minutes — instead of a shared dollar balance. Trial accounts expire after 30 days. For full details on free units, restrictions, and supported countries, see [Twilio trial account](/docs/usage/trials).

> \[!NOTE]
>
> You can sign up for a Twilio free trial account without a credit card. [Upgrade your account](#upgrade-your-account) before your trial expires to keep building.

## Sign up for your Twilio trial account

Sign up for your [Twilio account](https://www.twilio.com/try-twilio).

The sign-up process includes the following steps:

* Verify your email address.
* Verify your personal phone number.
* Customize your account by providing information about your project.

After signing up, you'll arrive in the [Twilio Console](https://1console.twilio.com/), where you can find your Twilio credentials, check your usage, and use Twilio products.

## Explore Twilio from your Console home page

After signing up, your [Console home page](https://1console.twilio.com/) shows options based on the product you selected during signup. From the home page, you can:

* Continue building with your selected product.
* Access your **Account SID** and **Auth Token** for API authentication.
* Navigate to other Twilio products using the left sidebar.
* Click **Upgrade** at the top of the page when you're ready to move to a paid account.

You can also [try out products](/docs/usage/trials) directly from the Console, including SMS, Voice, Email, and WhatsApp. Each trial walks you through setup and lets you see real API requests and responses.

## Work with phone numbers

If you're using SMS or Voice, you'll be working with phone numbers.

### Get your first phone number

To get your free trial phone number:

1. Go to [**Products & Services** > **Numbers & senders** > **Overview**](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory).
2. Click **Set up a new phone number**.

Depending on your country and use case, Twilio will do one of the following:

* Automatically assign you a toll-free number.
* Automatically assign you a US 10-digit long code number.
* Redirect you to the [Buy a number](https://1console.twilio.com/us1/develop/phone-numbers/manage/search) page in the Console.

If you don't see a **Try out** option on your home page, you can still get a trial phone number.

* You can get a phone number from the [Buy a number](https://1console.twilio.com/us1/develop/phone-numbers/manage/search) page in the Console.
* You might also see a **Get a number** option—or automatically get assigned a first phone number—when you try any of the **Start building** paths for SMS or Voice from the home page.

> \[!NOTE]
>
> You can have only one Twilio phone number in your trial account. If you want to use a different phone number, you can [release the phone number](https://help.twilio.com/articles/223183028-Cancel-or-release-a-Twilio-number) and buy a new number or [upgrade your account](#upgrade-your-account) to allow multiple phone numbers.

### Learn about phone number types

Twilio offers the following types of phone numbers for purchase:

* Local
* Mobile
* Toll-free
* National

For an overview of the capabilities of each type, see [Twilio Phone Number Types and Their Capabilities](https://help.twilio.com/articles/223135367-Twilio-Phone-Number-Types-and-Their-Capabilities) in the Twilio Help Center.

### Understand phone number regulatory requirements

Countries have different regulatory requirements for each type of number and method of communication.

* Learn about [country-specific guidelines](https://www.twilio.com/en-us/guidelines) for phone numbers, SMS, Voice, porting, and short codes.
* For messaging to the US and Canada, see [Differences between long codes (A2P 10DLC), short codes (paid accounts only), and toll-free numbers](https://help.twilio.com/articles/360038173654) in the Twilio Help Center.

#### Toll-free verification (US and Canada only)

Toll-free numbers must be verified before you can use them to send messages to the United States or Canada. Toll-free verification is an industry-wide regulatory requirement to help protect message recipients. Toll-free verification is free to complete.

With a verified toll-free number in your trial account, you'll be able to message up to five pre-designated phone numbers across the mobile network, in addition to the [Twilio Virtual Phone](/docs/messaging/guides/guide-to-using-the-twilio-virtual-phone).

Learn more about [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) and see [Trial Limits and US Toll-Free Number Restrictions](https://help.twilio.com/articles/11853148778523-Trial-Limits-and-US-Toll-Free-Number-Restrictions) in the Twilio Help Center.

#### A2P 10DLC (US only)

> \[!WARNING]
>
> To complete [A2P 10DLC registration](/docs/messaging/compliance/a2p-10dlc), you must have a paid Twilio account.

US and Canadian 10-digit long code (10DLC) phone numbers must be registered before you can use them to send messages from an application to US-based recipients. A2P (Application-to-Person) 10DLC is the standard enforced by telecom carriers in the United States to ensure that SMS traffic through long code phone numbers to US recipients is verified and consensual.

#### Regulatory compliance bundles (worldwide)

Regulatory compliance (RC) bundles help you organize and submit the information and documentation you need to meet regulatory requirements for individual countries. You can create RC bundles from the [Console](https://1console.twilio.com/go?to=/account/__account__/us1/phone-numbers/regulatory-compliance/bundles) or using the [Regulatory Compliance API](/docs/phone-numbers/regulatory/getting-started/create-new-bundle-public-rest-apis).

For detailed phone number requirements for each country, see the [Phone Number Regulations Guidelines](https://www.twilio.com/en-us/guidelines/regulatory).

### Use additional recipient phone numbers

You can call or message only verified recipients from a trial account. Twilio removes this security restriction when you upgrade your account.

When you signed up, you verified a personal phone number. While you have a trial account, you must verify each non-Twilio phone number that you want to use to do the following:

* Receive SMS or MMS messages from Twilio numbers.
* Receive phone calls from Twilio numbers.
* Call Twilio numbers.

To verify additional phone numbers, go to the [Verified Caller IDs](https://1console.twilio.com/us1/develop/phone-numbers/manage/verified) page in the Console and click **Add a new Caller ID**.

**Note**: You must select SMS as the verification method and have access to the device to receive the text with your verification code.

### Test SMS with the Twilio Virtual Phone

You can use the [Twilio Virtual Phone](/docs/messaging/guides/guide-to-using-the-twilio-virtual-phone) to test sending and receiving messages. The Virtual Phone is a simulated mobile device that uses a phone number owned by Twilio.

To send your first SMS message using the Twilio Virtual Phone, follow our [SMS developer quickstart](/docs/messaging/quickstart) or [SMS no-code quickstart](/docs/messaging/quickstart/no-code-sms-studio-quickstart).

### Format phone numbers

When your application sends messages or makes phone calls, the phone numbers must be in E.164 format. E.164 is an international standard for phone number formatting that includes the country code and omits any leading zeros or special characters.

For more information, see [What is E.164?](/docs/glossary/what-e164) in the Twilio glossary.

## Use test credentials for the Twilio API

Your Twilio trial account comes with a set of test credentials that you can use to test some common Twilio API resources and workflows. You can test buying a number, sending an SMS, and making a call. You can find your live and test credentials and create [API keys](/docs/iam/api-keys/keys-in-console) from the [API Keys & Tokens](https://1console.twilio.com/us1/account/keys-credentials/api-keys) page in the Console.

## Send messages internationally

During your trial, SMS messages and voice calls are restricted to your sign-up country, determined by the phone number you used during registration. After you [upgrade your account](#upgrade-your-account), you can send messages to other countries and regions when you meet the following general conditions:

* Your number is SMS-enabled and not restricted to sending or receiving messages and calls from only local numbers. Check your phone number's capabilities on the [Active Numbers](https://1console.twilio.com/us1/develop/phone-numbers/manage/incoming) page in the Console.
* The target country you're sending messages to is enabled in your [Messaging Geographic Permissions](https://1console.twilio.com/us1/develop/sms/settings/geo-permissions).
* You own the phone numbers you're sending to.

For a list of countries where trials are available, see [Supported countries](/docs/usage/trials#supported-countries).

## Trial account restrictions and limitations

Trial accounts expire after 30 days and include product-specific free units instead of a dollar balance. For the full list of restrictions — including geographic limits, verified recipient rules, pre-defined content requirements, and account limits — see [Trial restrictions](/docs/usage/trials#trial-restrictions).

## Upgrade your account

When your project is ready for production or you need more resources than a trial account allows, upgrade to a paid account. To get started, from the Console, click **Upgrade** at the top of the page or go to [**Admin** > **Account billing**](https://1console.twilio.com/us1/billing/manage-billing/billing-overview) and click **Upgrade account**. You'll create a profile, add your address, load a starting balance, and add payment details.

When you upgrade, you automatically receive a fresh set of **post-upgrade free units (PUFU)** for all products, regardless of what you used during your trial. PUFU units are consumed before any usage is charged to your account, and they never expire.

For full details on upgrade benefits, PUFU allocations, and trial restrictions, see [Twilio trial account](/docs/usage/trials).

## Take the next steps

* [Send and receive SMS](/docs/messaging/quickstart)
* [Make phone calls](/docs/voice/tutorials/how-to-make-outbound-phone-calls)
* [Learn how to make requests to Twilio APIs](/docs/usage/requests-to-twilio)
* [Try out a Twilio Video app](/docs/video/javascript-getting-started)
* [Set up an Elastic SIP Trunk](/docs/sip-trunking)
