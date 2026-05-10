# Declines

Learn about payment declines and how to lower your decline rate.

Track your decline rate over time to identify potential fraud or integration issues. For a clearer overview of your authorization rates, analyze unique declines and exclude failed retries from your analysis.

Payments can fail for a variety of reasons, including some that help prevent fraudulent transactions. Stripe works to reduce decline rates across all supported payment methods. We work with issuers and networks to improve acceptance rates, often without affecting your integration.

There are three reasons why a payment might fail:

- [Issuer declines](https://docs.stripe.com/declines.md#issuer-declines)
- [Blocked payments](https://docs.stripe.com/declines.md#blocked-payments)
- [Invalid API calls](https://docs.stripe.com/declines.md#invalid-api-calls)

You need to handle each type of payment failure differently. For every failure, you can use the [Dashboard](https://dashboard.stripe.com/payments) or API to review a payment’s details. When using the API, look at the `Charge` object’s [outcome](https://docs.stripe.com/api/charges/object.md#charge_object-outcome). This attribute covers the payment failure type and provides information about its cause.

Stripe handles non-card payment method declines similarly to card declines. Stripe sends you a response code that includes information about the decline, for example, if it’s due to insufficient funds, a lost or stolen card, or another reason.

## Issuer declines 

When your customer’s card issuer or payment provider receives a charge, their automated systems and models decide whether to authorize it. These tools analyze signals such as spending habits, account balance, and card data (expiration date, address information, and CVC).

If the card issuer or payment provider declines a payment, Stripe shares with you the decline information we receive through [Stripe decline codes](https://docs.stripe.com/declines/codes.md). This information is available in the Dashboard and through the API. When issuers provide specific explanations, such as an incorrect card number or low funds, these explanations return to Stripe as [network decline codes](https://docs.stripe.com/declines/network-codes.md).

## Blocked payments 

*Stripe Radar* (Stripe Radar helps detect and block fraud for any type of business using machine learning that trains on data across millions of global companies. It’s built into Stripe and requires no additional setup to get started) blocks high risk payments, including those that violate your custom rules or have high risk scores. This automated fraud prevention product evaluates each payment, without requiring any action from you.

When Stripe blocks a payment, it doesn’t obtain authorization from the card issuer. This precaution helps prevent potential fraudulent payments that might lead to disputes.

For some card types, customers might see the card issuer’s authorization for the payment amount on their statement. However, Stripe hasn’t charged this amount or withdrawn funds. The card issuer typically removes this authorization from the customer’s statement within a few days.

If a rule you configured blocks a payment you recognize as legitimate, you can lift the block by locating the payment in the [Dashboard](https://dashboard.stripe.com/payments) and clicking **Add to allow list**. This action doesn’t retry the payment. Instead, it overrides all of your other rules from blocking future payment attempts that match the list attribute.

> Don’t see the **Add to allow list** button on the payment details page? [Contact Stripe](https://support.stripe.com/email) to add this feature to your Radar account.

When using the API, the `outcome` of a blocked payment reflects the type of payment failure and the reason for it, along with the evaluated risk level.

```json
...
outcome: {
  network_decline_code: null,
  network_advice_code: null,
  network_status: "not_sent_to_network",
  reason: "highest_risk_level",
  advice_code: "do_not_try_again",
  risk_level: "highest",
  seller_message: "Stripe blocked this charge as too risky.",
  type: "blocked"
},
...
```

For users with [IC+ pricing](https://support.stripe.com/questions/understanding-blended-interchange-pricing), Adaptive Acceptance blocks certain payments to help you avoid unnecessary network costs. For example, Adaptive Acceptance helps you avoid excessive retry penalties. Adaptive Acceptance can also help you avoid network costs by blocking payments that have low likelihood of authorization.

```json
...
outcome: {
  network_decline_code: null,
  network_advice_code: null,
  network_status: "not_sent_to_network",
  reason: "low_probability_of_authorization",
  advice_code: "do_not_try_again",
  risk_level: "normal",
  seller_message: "Stripe blocked this payment as it is unlikely to be authorized.",
  type: "blocked"
},
...
```

## Invalid API calls 

In the API, you might see an invalid API call like the following:

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=2000 \
  -d currency=usd \
  -d payment_method=pm_card_chargeDeclinedIncorrectCvc \
  -d confirm=true
```

The invalid API call generates an error response that might look like this:

```json
{
  "error": {
    "code": "incorrect_cvc",
    "doc_url": "https://stripe.com/docs/error-codes/incorrect-cvc",
    "message": "Your card's security code is incorrect.",
    "param": "cvc",
    "type": "card_error"
  }
}
```

The [outcome](https://docs.stripe.com/api.md#charge_object-outcome) of a declined payment includes the type of payment failure and the [reason](https://docs.stripe.com/api.md#charge_object-outcome-reason), based on the card network’s decline code. The reason might contain information other than the card network’s response code, for example, if a Radar rule evaluation blocked the charge.

```json
...
outcome: {
  network_decline_code: "54",
  network_advice_code: "03",
  network_status: "declined_by_network",
  reason: "expired_card",
  advice_code: "confirm_card_data",
  risk_level: "normal",
  seller_message: "The bank returned the decline code `expired_card`.",
  type: "issuer_declined"
},
...
```

As you develop your Stripe integration, continuously [test](https://docs.stripe.com/testing.md) it to identify any potential bugs that might lead to invalid API calls. Invalid API calls typically don’t result in a payment appearing in your Dashboard. However, you might see the payment appear in a few cases.

```json
...
outcome: {
  network_decline_code: null,
  network_advice_code: null,
  network_status: "not_sent_to_network",
  type: "invalid"
},
...
```

## See also

- [Card declines](https://docs.stripe.com/declines/card.md)
- [Test declined payments](https://docs.stripe.com/testing.md#declined-payments)
- [Refund and cancel payments](https://docs.stripe.com/refunds.md)
- [Automate payment retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries.md)
