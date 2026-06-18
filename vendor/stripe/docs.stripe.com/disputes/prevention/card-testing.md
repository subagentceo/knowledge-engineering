# Protect yourself from card testing

Learn about this fraudulent activity and how to protect yourself against it.

Card testing is a type of fraudulent activity where someone tries to determine whether stolen card information is valid so that they can use it to make purchases. A fraudster might do this by purchasing stolen credit card information, and then attempting to validate or make purchases with those cards to determine which cards are still valid. Other common terms for card testing are “carding”, “account testing”, “enumeration”, and “card checking.”

Fraudulent activity such as card testing is an unavoidable part of online commerce. Card testing, however, has consequences for the entire payments ecosystem, so merchants, card networks, and Stripe share responsibility to prevent it. At Stripe, we’re constantly improving our tools and systems to detect and reduce fraud, but you must remain vigilant with respect to fraud.

## How card testing works 

Card testers use both card setup and payments to determine whether the stolen or enumerated card information they have is valid or not. To quickly validate many card numbers, fraudsters use scripts to test a large amount of card information at once, and collect 3DS or issuer responses to validate which card information is valid. After they have identified the valid cards, they can cash them with merchants or resell confirmed cards on the dark web.

- **Card Setup**—This is a method preferred by fraudsters, as card validation and authorizations during card setup don’t typically show up on cardholder statements. This reduces the likelihood of card holders noticing and reporting the fraudulent activity.
- **Payments**—Card testers create small amount payments, which cardholders are less likely to notice and report as fraudulent.

## Card testing consequences 

Card testing has many negative outcomes, some of which get worse over time as card testing continues:

- **Disputes**— Many types of card testing involve payments, some of which succeed. Customers notice successful payments and report them as fraud, which result in [Early Fraud Warnings](https://docs.stripe.com/disputes/measuring.md#early-fraud-warnings) or even [fraudulent disputes](https://docs.stripe.com/disputes.md) that cost you time and money.
- **Higher decline rates**—Card testing associates a large number of declines with your business. A high decline rate might damages the reputation of your business with card issuers and card networks, which makes all of your transactions appear riskier. This can result in an increased decline rate for legitimate payments, even after card testing ceases.
- **Additional fees**—Card testing activity can result in additional fees, such as authorization fees for custom pricing plans, and dispute fees.
- **Infrastructure strain**—Card testing usually results in numerous network requests and operations. This additional traffic can overburden your infrastructure and disrupt legitimate activity.
- **Damages ecosystem health**—Card testing has negative impacts on the financial system as a whole, so both Stripe and our financial partners want to help you stop it. A large amount of card testing resulting in Early Fraud Warnings or Disputes might, for example, enlist you into [Card Monitoring Programs](https://docs.stripe.com/disputes/monitoring-programs.md).
- **Reduce quality of data for your business to operate**-Revenue from card testing might look like good, new customers in your data, so it becomes hard for you to have a clear line of sight on your real business growth.

## Active card testing checklist 

If your integration is being exploited by card testers, we recommend that you take the following actions immediately:

- [Identify](https://docs.stripe.com/disputes/prevention/card-testing.md#identify-card-testing) the card testing activity.
- [Refund](https://docs.stripe.com/refunds.md) fraudulent payments to avoid disputes.
- [Use a Stripe-recommended integration](https://docs.stripe.com/disputes/prevention/card-testing.md#optimize-integration) or add [mitigations](https://docs.stripe.com/disputes/prevention/card-testing.md#control-implementation) to suppress card testing.
- Monitor your integration to make sure your mitigations are effective.

## Identify card testing 

You can identify most card testing activity by a significant increase in failed authorization and payments. Most attacks are obvious in your Stripe Dashboard. The common symptoms to look out for are:

- **A spike in failed or blocked payments.** You can see the trends on [the Dashboard home page](https://dashboard.stripe.com/dashboard), the [transactions](https://dashboard.stripe.com/payments) list view, and you can examine the block reasons on the payment details page.
- **A spike in requests with 402 errors**. You can see the volume spike on the [Developers](https://dashboard.stripe.com/developers) page, examine 402 failures on the [failed Logs](https://dashboard.stripe.com/logs?error_type=card_error) page or listen to webhooks and API responses, in particular with an [outcome of “generic_decline”](https://docs.stripe.com/declines/codes.md).
- **A spike in suspicious payments** with low transaction amounts, often with nonsensical customer names and emails. To avoid disputes, we recommend refunding these suspicious transactions if they get through the existing defenses.

## Prevent card testing 

Card testers employ a wide variety of techniques to make their fraudulent activity difficult to block. As a result, simple firewall rules or filters based on a single heuristic such as IP addresses are usually not sufficient to prevent card testing on their own.

Card testers can use your publishable key and use it to retry a large number of payments on your website. You have two main mitigation strategies for such attacks:

- **Use a recommended Stripe integration–** Choose a Stripe-recommended integration to take advantage of card testing protection that we know works.
- **Control implementation–** Invest in a suite of controls that stops card testers from attacking vulnerable endpoints.

In addition to implementing mitigation strategies, you want to make sure that you’re keeping your keys safe and don’t publish your secret key publicly. When your credentials are leaked or stolen, card testers can create payments and set up cards using your secret key.

> Not a developer? Using a plugin or platform? Preventing and mitigating card testing typically requires code-level changes, so you’ll need to show this documentation to the developer or vendor who wrote the code and work with them to prevent card testing.

### Use a Stripe-recommended integration 

If you use Stripe’s latest Payment Element or Checkout, we have many automated and manual controls in place to mitigate card testing, including rate limiters, AI models, CAPTCHA triggers, ongoing reviews, and so on. When we detect that you’re under a card testing attack, we dynamically choose interventions to suppress the attack as much as possible, while still allowing legitimate users to transact on your account with minimal impact. You see these payments marked as `Blocked by Stripe`.

*However, the success of Stripe’s controls depends on your integration and what risk factors you send to us*. We use many risk factors to distinguish between card testing and legitimate payments. While we compute some of these risk factors automatically, many of them depend on the information that your integration provides. In general, the more data your integration provides, the more successful card testing prevention can be.

We recommend using one of Stripe’s [recommended integrations](https://docs.stripe.com/payments/online-payments.md#compare-features-and-availability) to take advantage of the automated [CAPTCHA](https://www.hcaptcha.com/) based protection. Modern CAPTCHA solutions apply multiple risk factors to increase friction for high-risk behavior, while appearing mostly invisible to legitimate users of your service. To opt out of our CAPTCHA integration, reach out to [Stripe Support](https://support.stripe.com/contact/login).

Using one of our recommended payment integrations allows you to get the most out of Stripe’s card testing prevention. If you can’t use a recommended integration, include as much data as possible or implement your own controls. While card testing controls are separate from Radar’s protection against fraudulent disputes, they benefit [from the same risk factors used by Radar](https://docs.stripe.com/radar/optimize-risk-factors.md).

Including the following information with your payments can have a significant impact on the performance of Stripe’s card testing models. Our recommended integrations enable you to collect this information, while direct integrations might need to explicitly include this data.

- [Advanced fraud detection](https://docs.stripe.com/disputes/prevention/advanced-fraud-detection.md) (Highest impact)
- IP address
- Customer email
- Customer name
- Billing address

### Control implementation 

Adding restrictions to targeted endpoints help you suppress and prevent card testing. The restrictions you implement can make card testing impractical while having little to no impact on your legitimate traffic.

Endpoints targeted by card testers typically allow them to do one of the following:

- Save card.
- Make a payment.

The specific security measures you add to your integration vary depending on your situation and the needs of your business. We describe several common approaches below.

### Implement CAPTCHA 

Card testers often use automated scripts that CAPTCHA can block. The scripts are especially effective if you’re not using one of the recommended integrations that supports CAPTCHA. Modern CAPTCHA solutions provide options for both visible and invisible CAPTCHAS, depending on your needs. If you’ve added a CAPTCHA to your integration but card testing hasn’t stopped, check the following:

- Make sure the CAPTCHA requires validation on all requests that enable card validations or payments with Stripe.
- Review the CAPTCHA documentation to make sure that you’ve implemented it on the server side.
- If you’re using a CAPTCHA solution that provides a score, adjust the threshold at which you prevent requests from succeeding.
- Try a different CAPTCHA solution, such as switching from an invisible CAPTCHA to a visible one, or using a different CAPTCHA solution entirely.

### Limit access to your payment form 

The easier it’s for fraudulent actors to reach your payment form (for example, using guest checkout), the easier it’s for them to execute card testing attacks. You can reduce your exposure to card testers by requiring login or session validation before they can make a payment. Some of [the safeguards that protect against cross-site request forgery (CSRF) attacks](https://owasp.org/www-project-cheat-sheets/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) are also effective against some types of card testing, such as CSRF tokens.

### Add rate limits 

In some cases, you can reduce card testing by adding networking rate limits (for example, in your web shop front end). Tailor these rate limits to stop the specific kind of card testing you’re experiencing. For example, if card testers use your integration to validate cards by attaching them to new customers, an effective deterrent might be to limit the number of new customers that can be created by a single IP address in 1 day.

In addition to network rate limits, you can add rate limits to your payments and cart checkout flow to [detect and prevent unusual behavior](https://docs.stripe.com/disputes/prevention/card-testing.md#prevent-unusual-behavior) even after login or signup.

### Detect and prevent unusual behavior 

Use the Dashboard, [webhooks](https://docs.stripe.com/webhooks.md), or continuous monitoring with [Stripe Sigma or Data Pipelines](https://stripe.com/guides/improve-fraud-management-with-radar-for-fraud-teams-and-stripe-data) to track anomalies in your traffic. You can compare card testing activity to typical legitimate traffic, and then build filters that limit or prevent only the card testing activity. For example, you might make changes to your system that:

- Limit the number of cards that can be added to an account
- Limit the number of customers that can be created with a single IP address
- Limit the number of purchases that can be made with same product
- Limit the number of customers of the same type that can be created
- Filter out requests with certain user agents or other parameters

To do so, you can use [custom rules](https://docs.stripe.com/radar/rules/reference.md#velocity-rules) in Radar for Fraud Teams. We cover that in the next section.

### Use a combination of mitigations 

It might make sense to combine multiple approaches to reduce card testing to maximize the impact on fraudulent activity without having an adverse effect on legitimate traffic. For example, you might combine CAPTCHAS and rate limits so the first payment attempt from an IP address succeeds without restriction, but subsequent requests made by that same IP address for the next several hours require a captcha verification to succeed.

### Retry carefully 

Excessive retries (dunning) of payments can look like card testing if they come in extreme spikes with low success rate. Dunning and real card testing attacks might have similar effects on your business, including issuers hardening their risk stance. Make sure that you don’t keep retrying cards set up on fraudulent customers after a card testing attack, because this repeats the original attack. Stripe’s [Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries.md#non-retryable-decline-codes) already take this into consideration.

### Customize protection based on your risk appetite

Beyond the implementing mitigations, you might want to further fine tune your protection using Radar. It comes with built-in rules to block based on [bank checks](https://docs.stripe.com/radar/rules.md#traditional-bank-checks), such as *CVC* (The card verification code (CVC) or card verification value (CVV) is a three- or four-digit number printed directly on a card used to verify the entered card number) checks.

If you understand your customer behavior and want to customize the velocity of payments in detail, you can build [custom rules](https://docs.stripe.com/radar/rules/reference.md#velocity-rules) in Radar for Fraud Teams.

You can find examples in the [Radar 101 guide](https://stripe.com/guides/radar-rules-101#rules-that-help-prevent-card-testing-or-card-cashing).

## See also

- [Advanced fraud detection](https://docs.stripe.com/disputes/prevention/advanced-fraud-detection.md)
- [Optimize your Radar integration](https://docs.stripe.com/radar/optimize-risk-factors.md)
- [Keeping your keys safe](https://docs.stripe.com/keys-best-practices.md)
- [Radar 101 guide](https://stripe.com/guides/radar-rules-101)
