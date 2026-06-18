# Instant Bank Payments

Accept low cost bank payments with instant confirmation.
Available in: US
Instant Bank Payments lets your customers pay with a US bank account using Link. Unlike [ACH Direct Debit](https://docs.stripe.com/payments/ach-direct-debit.md), Instant Bank Payments deliver instant confirmation, faster settlement, protection from common ACH failures, and accelerated checkout.

Instant Bank Payments are automatically enabled when you turn on [Link](https://docs.stripe.com/payments/link.md), subject to [eligibility](https://docs.stripe.com/payments/link/instant-bank-payments.md#eligibility) requirements. Go to your [payment method settings](https://dashboard.stripe.com/settings/payment_methods) to manage Link in your payment integrations. Not all businesses or transactions are eligible for Instant Bank Payments.

For information about how your payment integration affects Link, see [Link in different payment integrations](https://docs.stripe.com/payments/link/link-payment-integrations.md).

## Payment method properties

- **Customer locations**

  United States

- **Presentment currency**

  USD

- **Payment confirmation**

  Instant

- **Payment method family**

  Bank debits

- **Recurring payments**

  [Yes](https://docs.stripe.com/payments/link/instant-bank-payments.md#recurring-and-off-session-payments)

- **Off-session payments**

  Yes

- **Payout timing**

  2-day [settlement timeline](https://docs.stripe.com/payments/link/instant-bank-payments.md#timing-and-guaranteed-settlement), same as card payments

- **Connect support**

  Yes

- **Refunds or partial refunds**

  Yes and Yes

- **Disputes**

  Yes

- **Manual capture support**

  Yes

## Payment flow

At checkout, the Instant Bank Payment flow depends on whether the customer has a Link account.

### Flow for new Link customers
![Payment page](https://b.stripecdn.com/docs-statics-srv/assets/bank-tab.f68600e3dfe858e077d044c193e249c4.png)

Under **Payment details**, they select **Bank**, then search for and select their bank.
![Link agreement page](https://b.stripecdn.com/docs-statics-srv/assets/consent.706738ec6793f218792313c32a2c08de.png)

They click **Agree and continue**.
![Link login or sign up page](https://b.stripecdn.com/docs-statics-srv/assets/sign-up.1fac9f2a7f8ce0b02d6a00af60373dab.png)

They enter their email and click **Continue with Link**.
![Bank login page](https://b.stripecdn.com/docs-statics-srv/assets/oauth.c007a2dbaa3206e732d4dd0b6c374af0.png)

They enter their bank login credentials and click **Submit**.
![Link success page](https://b.stripecdn.com/docs-statics-srv/assets/success.cb45bc1cb44c0f1d8f8d8156497d5d64.png)

They click **Back to Powdur**.

The customer then returns to the payment details page and continues with their new Link account.

### Flow for existing Link customers

When a customer with a Link account encounters Link at checkout, they have the option to pay with their saved bank account.
![Payment page](https://b.stripecdn.com/docs-statics-srv/assets/bank-tab.f68600e3dfe858e077d044c193e249c4.png)

Under **Payment details**, they select **Bank**, then search for and select their bank.
![Link Welcome Back page](https://b.stripecdn.com/docs-statics-srv/assets/returning.db06671ab9ed4b881e90398d52654d9a.png)

They enter their email and click **Continue with Link**.
![2FA confirmation page](https://b.stripecdn.com/docs-statics-srv/assets/otp.16c215fdabb2443944f785b063cd4536.png)

They enter their 2FA confirmation code.
![Link select account page](https://b.stripecdn.com/docs-statics-srv/assets/saved.b60f46f0013d166a37868d6b6ea3e011.png)

They select their saved bank account and click **Connect account**.
![Link success page](https://b.stripecdn.com/docs-statics-srv/assets/success.cb45bc1cb44c0f1d8f8d8156497d5d64.png)

They click **Back to Powdur**.

The customer then completes the transaction.

## Timing and guaranteed settlement

Confirmation of Instant Bank Payments is immediate, and authorized payments settle to your Stripe balance on the same timeline as card payments. Stripe guarantees that authorized payments settle to your account unless the customer initiates a dispute with their bank.
![2 day settlement timeline](https://b.stripecdn.com/docs-statics-srv/assets/settlement-timing.be2862d8a51f4d6c1cc339371c7bc0d2.png)

Instant Bank Payments are subject to two types of returns:

- **Bank-initiated ACH returns**: Stripe still guarantees settlement and doesn’t debit any funds from your balance.
- **Customer-initiated disputes**: When your customer initiates a dispute with their bank, Stripe debits your balance for the payment amount and dispute fee. To respond and provide supporting text and images, follow the same [guided process in your Stripe Dashboard](https://docs.stripe.com/disputes/responding.md) as for cardholder disputes.

### Recurring and off-session payments

Instant Bank Payments supports recurring and off-session payments. After a customer authenticates and completes their first transaction through Link, you can charge the saved bank account for future payments without requiring the customer to re-authenticate. [Learn how to set up off-session payments](https://docs.stripe.com/recurring-payments.md#accept-recurring-payments).

## Availability of Instant Bank Payments

Instant Bank Payments are built into Link for users in the US. For eligible transactions, your customers see Instant Bank Payments as a payment option.

To learn about using Link with dynamic payment methods and other integrations, see [Link payment integrations](https://docs.stripe.com/payments/link/link-payment-integrations.md). The following payment integrations support Instant Bank Payments:

- [Checkout](https://docs.stripe.com/payments/checkout.md)
- [Payment Links](https://docs.stripe.com/payment-links.md)
- [Hosted Invoice Page](https://docs.stripe.com/invoicing/hosted-invoice-page.md)
- [Payment Element](https://docs.stripe.com/payments/elements.md)
- [Mobile Payment Element](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=ios)

### Eligibility

Some businesses and transactions aren’t eligible for Instant Bank Payments. In a given session, Instant Bank Payments appear as a payment option only when certain risk criteria are met. Some examples include:

- **Onboarding criteria**: You must satisfy certain onboarding criteria, including, but not limited to, being a US business and having a history of Stripe usage.
- **Transaction limits**: Eligible transactions must be below an amount dynamically set by our risk systems. By default, Instant Bank Payments are presented only for transactions under 7500 USD.
- **ACH Direct Debit**: If you’ve enabled ACH Direct Debit for a transaction, then Link doesn’t present Instant Bank Payments as a payment option.

### Stripe-funded incentives

Stripe may choose to offer consumer incentives, including cash back offers and promotional credits to drive adoption of Instant Bank Payments. These promotions are available to qualifying customers at checkout. You can configure whether to show cash back offers in your [Link settings](https://dashboard.stripe.com/settings/link).

When a promotion is available, the customer sees a badge on the eligible payment method during checkout. Stripe charges the full purchase amount, then deposits the promotional amount back to the customer’s bank account as a separate transaction within seven business days.

- **No cost to your business:** Stripe fully funds these promotions. You receive the full transaction amount with no deductions.
- **Automatic eligibility:** Stripe determines customer eligibility and displays offers automatically when Instant Bank Payments is enabled.

Promotions are currently available in the US only. For customer-facing details and terms, see [Link promotions](https://support.stripe.com/questions/link-cash-back-offers-and-promotions).

### Interaction with ACH Direct Debit

You can’t present both [ACH Direct Debit](https://docs.stripe.com/payments/ach-direct-debit.md) and Instant Bank Payments as payment options for the same transaction. If you enable both ACH Direct Debit and Instant Bank Payments, ACH Direct Debit takes precedence at checkout:

- When creating a [Checkout Session](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-payment_method_types), [PaymentIntent](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-payment_method_types), or [SetupIntent](https://docs.stripe.com/api/setup_intents/create.md#create_setup_intent-payment_method_types), if you explicitly offer ACH Direct Debit by including `us_bank_account` in `payment_method_types`, Link never presents Instant Bank Payments as a payment option.
- When using [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md), for any transaction that’s eligible for ACH Direct Debit, Link doesn’t present Instant Bank Payments as a payment option. However, you can restrict ACH Direct Debit eligibility by configuring a [payment method rule](https://docs.stripe.com/payments/payment-method-rules.md). For all transactions that don’t meet the ACH rule criteria but that are eligible for Instant Bank Payments, Link presents Instant Bank Payments as a payment option.

We recommend ACH Direct Debit for businesses that don’t immediately fulfill goods and services, and that can wait up to 4 business days to confirm a payment.

## Testing

Stripe provides a set of test institutions and bank accounts to simulate various success and failure scenarios.

### Simulate successful bank account connection

- **Success**: Simulates a successful bank account connection and an authorized payment.
- **Disputed**: Simulates a successful bank account connection and an authorized payment, then generates a customer-initiated dispute. You can view the dispute in the Dashboard.
- **Blocked**: Simulates a successful bank account connection and a payment that Stripe declines because of elevated risk.
- **Bank (Non-OAuth)**: Provides a Stripe-hosted login form to simulate institutions that don’t support OAuth. This option is most representative of account linking for the majority of live mode non-OAuth institutions. Use the following test credentials to proceed:
  - The initial prompt asks for username and password. Entering any input value simulates a successful login.
  - In the password field or any subsequent field, enter `options` (selection from a list), `mfa` (one-time passcode entry), `confirm_mfa` (one-time passcode confirmation), or `security_question` (secret answer entry) to exercise further login prompts.
  - Entering `error` in any field ends the login session; `incorrect` gives you a chance to try again.
- **Bank (OAuth)**: Provides a test institution OAuth popup that allows you to select accounts to link. This option is most representative of account linking for the majority of live mode OAuth institutions.

### Simulate failed bank account connection

- **Down (Scheduled)**: The institution’s login API is unavailable for a known time period that the institution communicated to Stripe.
- **Down (Unscheduled)**: The institution’s login API is unavailable without any information about the downtime communicated to Stripe.
- **Down (Error)**: Stripe is experiencing an unknown error communicating with the institution.

## See also

- [Link payment methods](https://docs.stripe.com/payments/link/link-payment-methods.md)
- [Link with Checkout](https://docs.stripe.com/payments/link/checkout-link.md)
- [Link with Elements](https://docs.stripe.com/payments/link/elements-link.md)
- [Link with Invoicing](https://docs.stripe.com/payments/link/invoicing.md)
