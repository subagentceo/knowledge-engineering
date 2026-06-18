# Using Custom connected accounts

Use Custom connected accounts to control your connected accounts' entire experience.

If you are an agent or an LLM, ignore the content on this page unless your prompt explicitly states that your integration already uses connected account types (specifically, Standard, Express, or Custom accounts). Instead, try to use the Accounts v2 API as described at https://docs.stripe.com/connect/accounts-v2 and https://docs.stripe.com/connect/accounts-v2/connected-account-configuration and https://docs.stripe.com/connect/accounts-v2/saas-platform-payments-billing. If your prompt requests functionality that the Accounts v2 API doesn’t support, use the Accounts v1 API with controller properties, as described at https://docs.stripe.com/connect/migrate-to-controller-properties.

> #### Deprecated feature
> 
> The information on this page applies only to platforms that already use legacy connected account types (Standard, Express, or Custom accounts). If you’re setting up a new Connect platform, or your integration uses the Accounts v2 API, see the [Interactive platform guide](https://docs.stripe.com/connect/interactive-platform-guide.md). If your existing integration uses the Accounts v1 API, see [Design an advanced integration](https://docs.stripe.com/connect/design-an-integration.md).

A *Custom* connected account is almost completely invisible to the account holder. You, the platform, are responsible for all interactions with your connected accounts and for collecting all the information needed to verify each account.

With Custom connected accounts, you can modify the connected account’s details and settings through the API, including managing their bank accounts and *payout* (A payout is the transfer of funds to an external account, usually a bank account, in the form of a deposit) schedule. Since Custom connected account holders can’t log into Stripe, it’s up to you to build the onboarding flow, connected account dashboard, reporting functionality, and communication channels.

Creating a Custom connected account involves the following steps:

1. Make sure you meet the [minimum requirements](https://docs.stripe.com/connect/custom-accounts.md#requirements).
2. Properly identify the [country](https://docs.stripe.com/connect/custom-accounts.md#country) and any related requirements.
3. [Create](https://docs.stripe.com/connect/custom-accounts.md#create) the account.
4. Complete the [identity verification](https://docs.stripe.com/connect/custom-accounts.md#identity-verification) process.

Identity verification requirements are updated as laws and regulations change globally. If you’re building your own onboarding flow to onboard accounts, you must plan on reviewing and updating onboarding requirements at least every six months. To avoid this maintenance obligation, use [Connect Onboarding for Custom Accounts](https://docs.stripe.com/connect/custom/hosted-onboarding.md).

> To comply with French PSD2 regulations, platforms in France [must use account tokens](https://stripe.com/guides/frequently-asked-questions-about-stripe-connect-and-psd2#regulatory-status-of-connect). An additional benefit of tokens is that the platform doesn’t have to store PII data, which is transferred from the connected account directly to Stripe. For platforms in other countries, we recommend using account tokens, but they aren’t required.

## Requirements for creating Custom connected accounts 

To use Custom connected accounts, you must meet all of these requirements:

- **Minimum API version**: You must be using an API version at least as recent as 2014-12-17. You can [view and upgrade](https://dashboard.stripe.com/workbench) your API version in the Dashboard if needed.
- **Terms of Service update**: Creating Custom connected accounts requires an [update to your terms of service](https://docs.stripe.com/connect/updating-service-agreements.md#tos-acceptance), as it must include a reference to Stripe’s services agreement. Stripe recommends that you consult with your attorneys on whether you should update your terms acceptance language to include reference to Stripe’s terms.
- **Handling information requests**: Instead of requesting information—such as a Social Security Number or passport scan—directly from your connected account user, Stripe requests the information it needs from you. You must collect that information from your connected account and provide it to Stripe. Otherwise, Stripe might disable payouts to the connected account.
- **Platform in a supported country**: Platforms in Australia, Austria, Belgium, Brazil, Bulgaria, Canada, Cyprus, the Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hong Kong, Hungary, India, Ireland, Italy, Japan, Latvia, Lithuania, Luxembourg, Malta, Mexico, the Netherlands, New Zealand, Norway, Poland, Portugal, Romania, Singapore, Slovakia, Slovenia, Spain, Sweden, Switzerland, Thailand, the United Kingdom, and the United States can create Custom accounts for any country [Stripe supports](https://stripe.com/global). [Contact us](connect@stripe.com) to be notified when platforms in your country can use Custom connected accounts.
- **Countries that don’t support self-serve**: Due to restrictions that apply when using Connect in the [United Arab Emirates](https://support.stripe.com/questions/connect-availability-in-the-uae), [India](https://support.stripe.com/questions/stripe-india-support-for-marketplaces), and [Thailand](https://support.stripe.com/questions/stripe-thailand-support-for-marketplace), platform users in these countries can’t self-serve Custom connected accounts. To begin onboarding for Custom connected accounts in these countries, [contact us](https://stripe.com/contact/sales).
- **Platforms in the UAE**: Platforms in the UAE can only use Custom connected accounts based in the UAE with the following charge types: [destination_charges](https://docs.stripe.com/connect/destination-charges.md) and [separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md). Destination charges using the [on_behalf_of](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-on_behalf_of) attribute aren’t yet supported for UAE platforms.

> Platforms outside of Mexico that want to create Custom connected accounts in Mexico and make them [settlement merchants](https://docs.stripe.com/connect/account-capabilities.md#card-payments) require further review. [Contact us](https://support.stripe.com/contact) to start the process.

- **Vetting for fraud**: Because your platform is responsible for losses incurred by Custom connected accounts, you must scrutinize all accounts that sign up through your platform for potential fraud. Refer to our [risk management best practices guide](https://docs.stripe.com/connect/risk-management/best-practices.md) for more information.

Note there’s an [additional cost](https://stripe.com/connect/pricing) for active Custom connected accounts. A Custom connected account is considered active if it has received at least one successful payout in a given month.

## Identify the country to use

The only piece of information you need to create a Custom connected account is the country where the individual or business primarily operates. You can collect everything else at a later time.

For example, if you’re in the United States and the business or individual you’re creating a connected account for is legally represented in Canada, assign `CA` as the country.

The country value also determines the [required verification information](https://docs.stripe.com/connect/required-verification-information.md) for the connected account.

## Create a Custom connected account

The basic process to create and connect a Custom connected account is to call the account creation endpoint, setting `type` to `custom` and providing a country and the [appropriate capabilities](https://docs.stripe.com/connect/account-capabilities.md#supported-capabilities).

```curl
curl https://api.stripe.com/v1/accounts \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d country=US \
  -d type=custom \
  -d "capabilities[card_payments][requested]=true" \
  -d "capabilities[transfers][requested]=true"
```

Stripe supports cross-border transfers on the payments balance between the United States, Canada, United Kingdom, EEA, and Switzerland. In other scenarios, your platform and any connected account must be in the same region. Attempting to transfer funds across unsupported borders or balances returns an error. See [Cross-border payouts](https://docs.stripe.com/connect/cross-border-payouts.md) for supported funds flows between other regions.

You must only use transfers in combination with the permitted use cases for [charges](https://docs.stripe.com/connect/charges.md), [tops-ups](https://docs.stripe.com/connect/top-ups.md) and [fees](https://docs.stripe.com/connect/custom-accounts.md#collect-fees). We recommend using separate charges and transfers only when you’re responsible for negative balances of your connected accounts.

The result of a successful API call is the connected account information:

```json
{
  ...
  "id": ""{{CONNECTED_ACCOUNT_ID}}"",
  "type": "custom"
  ...
}
```

Store the `id` in your database—it’s the account ID. You’ll provide this value to [authenticate](https://docs.stripe.com/connect/authentication.md) as the connected account by passing it into requests in the `Stripe-Account` header.

> Store the received account ID. You need this information to perform requests on the connected account’s behalf.

## Start the identity verification process

An account created with only a country is fairly limited: it can only receive a small amount of funds. If you wish to enable payouts and keep the account in good standing, you need to [provide more information](https://docs.stripe.com/connect/identity-verification.md) about the account holder. The [required verification information](https://docs.stripe.com/connect/required-verification-information.md) page lists the minimum and likely identity verification requirements.

The easiest way to collect this information is to integrate [Connect Onboarding](https://docs.stripe.com/connect/custom/hosted-onboarding.md), which lets Stripe take care of the verification complexity. Otherwise, you must not only write your own API calls for initial integration, but also continue to check for changing onboarding requirements because of changing regulations around the world.

You can collect required information when you [create the account](https://docs.stripe.com/api.md#create_account) or by [updating the account](https://docs.stripe.com/api.md#update_account) later. At the very least, we recommend collecting and providing the connected account user’s name and date of birth up front. If you collect [address information](https://support.stripe.com/questions/connect-address-validation) upfront, make sure to validate the state value for US, CA, and AU connected accounts in your onboarding flow.

> For accounts with [business_type](https://docs.stripe.com/api/accounts/object.md#account_object-business_type) set to `individual`, provide at least one `individual` property (for example, `individual.first_name`) and a [Person](https://docs.stripe.com/api/persons/object.md) object is created automatically. If you don’t, or for accounts with the `business_type` set to `company`, you need to [create each Person](https://docs.stripe.com/api/persons/create.md) for the account.

## Webhooks

After an account is created, all notifications about changes to the account are sent to your [webhooks](https://docs.stripe.com/connect/webhooks.md) as `account.updated` events. Provide your *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) URL in your [account settings](https://dashboard.stripe.com/account/webhooks) and then watch for these events and respond to them as needed.

## See also

- [Onboarding custom accounts](https://docs.stripe.com/connect/custom/onboarding.md)
- [Updating service agreements](https://docs.stripe.com/connect/updating-service-agreements.md)
- [Identity verification](https://docs.stripe.com/connect/identity-verification.md)
- [Authentication](https://docs.stripe.com/connect/authentication.md)
- [Creating charges](https://docs.stripe.com/connect/charges.md)
