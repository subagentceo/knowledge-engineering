# Create a PaymentIntent

Creates a PaymentIntent object.

After the PaymentIntent is created, attach a payment method and [confirm](https://docs.stripe.com/docs/api/payment_intents/confirm.md) to continue the payment. Learn more about [the available payment flows with the Payment Intents API](https://docs.stripe.com/docs/payments/payment-intents.md).

When you use `confirm=true` during creation, it’s equivalent to creating and confirming the PaymentIntent in the same call. You can use any parameters available in the [confirm API](https://docs.stripe.com/docs/api/payment_intents/confirm.md) when you supply `confirm=true`.

## Request

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>" \
  -d amount=2000 \
  -d currency=usd \
  -d "automatic_payment_methods[enabled]=true"
```

### Response

```json
{
  "id": "pi_3MtwBwLkdIwHu7ix28a3tqPa",
  "object": "payment_intent",
  "amount": 2000,
  "amount_capturable": 0,
  "amount_details": {
    "tip": {}
  },
  "amount_received": 0,
  "application": null,
  "application_fee_amount": null,
  "automatic_payment_methods": {
    "enabled": true
  },
  "canceled_at": null,
  "cancellation_reason": null,
  "capture_method": "automatic",
  "client_secret": "pi_3MtwBwLkdIwHu7ix28a3tqPa_secret_YrKJUKribcBjcG8HVhfZluoGH",
  "confirmation_method": "automatic",
  "created": 1680800504,
  "currency": "usd",
  "customer": null,
  "description": null,
  "last_payment_error": null,
  "latest_charge": null,
  "livemode": false,
  "metadata": {},
  "next_action": null,
  "on_behalf_of": null,
  "payment_method": null,
  "payment_method_options": {
    "card": {
      "installments": null,
      "mandate_options": null,
      "network": null,
      "request_three_d_secure": "automatic"
    },
    "link": {
      "persistent_token": null
    }
  },
  "payment_method_types": [
    "card",
    "link"
  ],
  "processing": null,
  "receipt_email": null,
  "review": null,
  "setup_future_usage": null,
  "shipping": null,
  "source": null,
  "statement_descriptor": null,
  "statement_descriptor_suffix": null,
  "status": "requires_payment_method",
  "transfer_data": null,
  "transfer_group": null
}
```

## Returns

Returns a PaymentIntent object.

## Parameters

- `amount` (integer, required)
  Amount intended to be collected by this PaymentIntent. A positive integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://docs.stripe.com/docs/currencies.md#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).

- `currency` (enum, required)
  Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

- `amount_details` (object, optional)
  Provides industry-specific information about the amount.

  - `amount_details.discount_amount` (integer, optional)
    The total discount applied on the transaction represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). An integer greater than 0.

    This field is mutually exclusive with the `amount_details[line_items][#][discount_amount]` field.

  - `amount_details.enforce_arithmetic_validation` (boolean, optional)
    Set to `false` to return arithmetic validation errors in the response without failing the request. Use this when you want the operation to proceed regardless of arithmetic errors in the line item data.

    Omit or set to `true` to immediately return a 400 error when arithmetic validation fails. Use this for strict validation that prevents processing with line item data that has arithmetic inconsistencies.

    For card payments, Stripe doesn’t send line item data to card networks if there’s an arithmetic validation error.

  - `amount_details.line_items` (array of objects, optional)
    A list of line items, each containing information about a product in the PaymentIntent. There is a maximum of 200 line items.

    - `amount_details.line_items.product_name` (string, required)
      The product name of the line item. Required for L3 rates. At most 1024 characters long.

      For Cards, this field is truncated to 26 alphanumeric characters before being sent to the card networks. For PayPal, this field is truncated to 127 characters.

    - `amount_details.line_items.quantity` (integer, required)
      The quantity of items. Required for L3 rates. An integer greater than 0.

    - `amount_details.line_items.unit_cost` (integer, required)
      The unit cost of the line item represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). Required for L3 rates. An integer greater than or equal to 0.

    - `amount_details.line_items.discount_amount` (integer, optional)
      The discount applied on this line item represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). An integer greater than 0.

      This field is mutually exclusive with the `amount_details[discount_amount]` field.

    - `amount_details.line_items.payment_method_options` (object, optional)
      Payment method-specific information for line items.

      - `amount_details.line_items.payment_method_options.card` (object, optional)
        This sub-hash contains line item details that are specific to the `card` payment method.

        - `amount_details.line_items.payment_method_options.card.commodity_code` (string, optional)
          Identifier that categorizes the items being purchased using a standardized commodity scheme such as (but not limited to) UNSPSC, NAICS, NAPCS, and so on.

          The maximum length is 12 characters.

      - `amount_details.line_items.payment_method_options.card_present` (object, optional)
        This sub-hash contains line item details that are specific to the `card_present` payment method.

        - `amount_details.line_items.payment_method_options.card_present.commodity_code` (string, optional)
          Identifier that categorizes the items being purchased using a standardized commodity scheme such as (but not limited to) UNSPSC, NAICS, NAPCS, and so on.

          The maximum length is 12 characters.

      - `amount_details.line_items.payment_method_options.klarna` (object, optional)
        This sub-hash contains line item details that are specific to the `klarna` payment method.

        - `amount_details.line_items.payment_method_options.klarna.image_url` (string, optional)
          URL to an image for the product. Max length, 4096 characters.

        - `amount_details.line_items.payment_method_options.klarna.product_url` (string, optional)
          URL to the product page. Max length, 4096 characters.

        - `amount_details.line_items.payment_method_options.klarna.reference` (string, optional)
          Unique reference for this line item to correlate it with your system’s internal records. The field is displayed in the Klarna Consumer App if passed.

          The maximum length is 255 characters.

        - `amount_details.line_items.payment_method_options.klarna.subscription_reference` (string, optional)
          Reference for the subscription this line item is for.

          The maximum length is 255 characters.

      - `amount_details.line_items.payment_method_options.paypal` (object, optional)
        This sub-hash contains line item details that are specific to the `paypal` payment method.

        - `amount_details.line_items.payment_method_options.paypal.category` (enum, optional)
          Type of the line item.
Possible enum values:
          - `digital_goods`
            Goods that are stored, delivered, and used in their electronic format.

          - `donation`
            A contribution or gift for which no good or service is exchanged, usually to a not for profit organization.

          - `physical_goods`
            A tangible item that can be shipped with proof of delivery.

        - `amount_details.line_items.payment_method_options.paypal.description` (string, optional)
          Description of the line item.

          The maximum length is 127 characters.

        - `amount_details.line_items.payment_method_options.paypal.sold_by` (string, optional)
          The Stripe account ID of the connected account that sells the item.

          The maximum length is 127 characters.

    - `amount_details.line_items.product_code` (string, optional)
      The product code of the line item, such as an SKU. Required for L3 rates. At most 12 characters long.

      The maximum length is 12 characters.

    - `amount_details.line_items.tax` (object, optional)
      Contains information about the tax on the item.

      - `amount_details.line_items.tax.total_tax_amount` (integer, required)
        The total amount of tax on a single line item represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). Required for L3 rates. An integer greater than or equal to 0.

        This field is mutually exclusive with the `amount_details[tax][total_tax_amount]` field.

    - `amount_details.line_items.unit_of_measure` (string, optional)
      A unit of measure for the line item, such as gallons, feet, meters, etc.

      The maximum length is 12 characters.

  - `amount_details.shipping` (object, optional)
    Contains information about the shipping portion of the amount.

    - `amount_details.shipping.amount` (integer, optional)
      If a physical good is being shipped, the cost of shipping represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). An integer greater than or equal to 0.

    - `amount_details.shipping.from_postal_code` (string, optional)
      If a physical good is being shipped, the postal code of where it is being shipped from. At most 10 alphanumeric characters long, hyphens and spaces are allowed.

      The maximum length is 10 characters.

    - `amount_details.shipping.to_postal_code` (string, optional)
      If a physical good is being shipped, the postal code of where it is being shipped to. At most 10 alphanumeric characters long, hyphens and spaces are allowed.

      The maximum length is 10 characters.

  - `amount_details.tax` (object, optional)
    Contains information about the tax portion of the amount.

    - `amount_details.tax.total_tax_amount` (integer, required)
      The total amount of tax on the transaction represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). Required for L2 rates. An integer greater than or equal to 0.

      This field is mutually exclusive with the `amount_details[line_items][#][tax][total_tax_amount]` field.

- `application_fee_amount` (integer, optional)
  The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner’s Stripe account. The amount of the application fee collected will be capped at the total amount captured. For more information, see the PaymentIntents [use case for connected accounts](https://docs.stripe.com/docs/payments/connected-accounts.md).

- `automatic_payment_methods` (object, optional)
  When you enable this parameter, this PaymentIntent accepts payment methods that you enable in the Dashboard and that are compatible with this PaymentIntent’s other parameters.

  - `automatic_payment_methods.enabled` (boolean, required)
    Whether this feature is enabled.

  - `automatic_payment_methods.allow_redirects` (enum, optional)
    Controls whether this PaymentIntent will accept redirect-based payment methods.

    Redirect-based payment methods may require your customer to be redirected to a payment method’s app or site for authentication or additional steps. To [confirm](https://docs.stripe.com/docs/api/payment_intents/confirm.md) this PaymentIntent, you may be required to provide a `return_url` to redirect customers back to your site after they authenticate or complete the payment.
Possible enum values:
    - `always`
      (Default) This PaymentIntent will accept redirect-based payment methods. `return_url` may be required to       [confirm](https://docs.stripe.com/docs/api/payment_intents/confirm.md) this PaymentIntent.

    - `never`
      This PaymentIntent will not accept redirect-based payment methods. Payment methods that require redirect will       be filtered. `return_url` will not be required to [confirm](https://docs.stripe.com/docs/api/payment_intents/confirm.md) this       PaymentIntent.

- `capture_method` (enum, optional)
  Controls when the funds will be captured from the customer’s account.
Possible enum values:
  - `automatic`
    Stripe automatically captures funds when the customer authorizes the payment.

  - `automatic_async`
    (Default) Stripe asynchronously captures funds when the customer authorizes the payment. Recommended over `capture_method=automatic` due to improved latency. Read the [integration guide](https://docs.stripe.com/docs/payments/payment-intents/asynchronous-capture.md) for more information.

  - `manual`
    Place a hold on the funds when the customer authorizes the payment, but [don’t capture the funds until later](https://docs.stripe.com/docs/payments/capture-later.md). (Not all payment methods support this.)

- `confirm` (boolean, optional)
  Set to `true` to attempt to [confirm this PaymentIntent](https://docs.stripe.com/docs/api/payment_intents/confirm.md) immediately. This parameter defaults to `false`. When creating and confirming a PaymentIntent at the same time, you can also provide the parameters available in the [Confirm API](https://docs.stripe.com/docs/api/payment_intents/confirm.md).

- `confirmation_method` (enum, optional)
  Describes whether we can confirm this PaymentIntent automatically, or if it requires customer action to confirm the payment.
Possible enum values:
  - `automatic`
    (Default) PaymentIntent can be confirmed using a publishable key. After `next_action`s are handled, no additional confirmation is required to complete the payment.

  - `manual`
    All payment attempts must be made using a secret key. The PaymentIntent returns to the `requires_confirmation` state after handling `next_action`s, and requires your server to initiate each payment attempt with an explicit confirmation.

- `confirmation_token` (string, optional)
  ID of the ConfirmationToken used to confirm this PaymentIntent.

  If the provided ConfirmationToken contains properties that are also being provided in this request, such as `payment_method`, then the values in this request will take precedence.

- `customer` (string, optional)
  ID of the Customer this PaymentIntent belongs to, if one exists.

  Payment methods attached to other Customers cannot be used with this PaymentIntent.

  If [setup_future_usage](https://docs.stripe.com/api/payment_intents/create.md#payment_intent_object-setup_future_usage) is set and this PaymentIntent’s payment method is not `card_present`, then the payment method attaches to the Customer after the PaymentIntent has been confirmed and any required actions from the user are complete. If the payment method is `card_present` and isn’t a digital wallet, then a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card is created and attached to the Customer instead.

- `customer_account` (string, optional)
  ID of the Account representing the customer that this PaymentIntent belongs to, if one exists.

  Payment methods attached to other Accounts cannot be used with this PaymentIntent.

  If [setup_future_usage](https://docs.stripe.com/api/payment_intents/create.md#payment_intent_object-setup_future_usage) is set and this PaymentIntent’s payment method is not `card_present`, then the payment method attaches to the Account after the PaymentIntent has been confirmed and any required actions from the user are complete. If the payment method is `card_present` and isn’t a digital wallet, then a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card is created and attached to the Account instead.

- `description` (string, optional)
  An arbitrary string attached to the object. Often useful for displaying to users.

- `error_on_requires_action` (boolean, optional)
  Set to `true` to fail the payment attempt if the PaymentIntent transitions into `requires_action`. Use this parameter for simpler integrations that don’t handle customer actions, such as [saving cards without authentication](https://docs.stripe.com/docs/payments/save-card-without-authentication.md). This parameter can only be used with [`confirm=true`](https://docs.stripe.com/docs/api/payment_intents/create.md#create_payment_intent-confirm).

- `excluded_payment_method_types` (array of enums, optional)
  The list of payment method types to exclude from use with this payment.
Possible enum values:
  - `acss_debit`
    [Pre-authorized debit payments](https://docs.stripe.com/docs/payments/acss-debit.md) are used to debit Canadian bank accounts through the Automated Clearing Settlement System (ACSS).

  - `affirm`
    [Affirm](https://docs.stripe.com/docs/payments/affirm.md) is a buy now, pay later payment method in the US.

  - `afterpay_clearpay`
    [Afterpay / Clearpay](https://docs.stripe.com/docs/payments/afterpay-clearpay.md) is a buy now, pay later payment method used in Australia, Canada, France, New Zealand, Spain, the UK, and the US.

  - `alipay`
    [Alipay](https://docs.stripe.com/docs/payments/alipay.md) is a digital wallet payment method used in China.

  - `alma`
    [Alma](https://docs.stripe.com/docs/payments/alma.md) is a Buy Now, Pay Later payment method that lets customers pay in 2, 3, or 4 installments.

  - `amazon_pay`
    [Amazon Pay](https://docs.stripe.com/docs/payments/amazon-pay.md) is a Wallet payment method that lets hundreds of millions of Amazon customers pay their way, every day.

  - `au_becs_debit`
    [BECS Direct Debit](https://docs.stripe.com/docs/payments/au-becs-debit.md) is used to debit Australian bank accounts through the Bulk Electronic Clearing System (BECS).

  - `bacs_debit`
    [Bacs Direct Debit](https://docs.stripe.com/docs/payments/payment-methods/bacs-debit.md) is used to debit UK bank accounts.

  - `bancontact`
    [Bancontact](https://docs.stripe.com/docs/payments/bancontact.md) is a bank redirect payment method used in Belgium.

  - `billie`
    [Billie](https://docs.stripe.com/docs/payments/billie.md) is a payment method.

  - `bizum`
    [Bizum](https://docs.stripe.com/docs/payments/bizum.md) is a payment method.

  - `blik`
    [BLIK](https://docs.stripe.com/docs/payments/blik.md) is a single-use payment method common in Poland.

  - `boleto`
    [Boleto](https://docs.stripe.com/docs/payments/boleto.md) is a voucher-based payment method used in Brazil.

  - `card`
    [Card payments](https://docs.stripe.com/docs/payments/payment-methods/overview.md#cards) are supported through many networks, card brands, and select Link funding sources (Link is also known as Onelink in the UK).

  - `card_present`
    [Stripe Terminal](https://docs.stripe.com/docs/terminal/payments/collect-card-payment.md) is used to collect in-person card payments.

  - `cashapp`
    [Cash App Pay](https://docs.stripe.com/docs/payments/cash-app-pay.md) enables customers to frictionlessly authenticate payments in the Cash App using their stored balance or linked card.

  - `crypto`
    [Stablecoin payments](https://docs.stripe.com/docs/payments/stablecoin-payments.md) enable customers to pay in stablecoins like USDC from 100s of wallets including Phantom and Metamask.

  - `customer_balance`
    Uses a customer’s [cash balance](https://docs.stripe.com/docs/payments/customer-balance.md) for the payment.

  - `eps`
    [EPS](https://docs.stripe.com/docs/payments/eps.md) is an Austria-based bank redirect payment method.

  - `fpx`
    [FPX](https://docs.stripe.com/docs/payments/fpx.md) is a Malaysia-based bank redirect payment method.

  - `giropay`
    [giropay](https://docs.stripe.com/docs/payments/giropay.md) is a German bank redirect payment method.

  - `grabpay`
    [GrabPay](https://docs.stripe.com/docs/payments/grabpay.md) is a digital wallet payment method used in Southeast Asia.

  - `ideal`
    [iDEAL](https://docs.stripe.com/docs/payments/ideal.md) is a Netherlands-based bank redirect payment method.

  - `interac_present`
    [Stripe Terminal](https://docs.stripe.com/docs/terminal/payments/collect-card-payment.md) accepts [Interac](https://docs.stripe.com/docs/terminal/payments/regional.md?integration-country=CA#interac-payments) debit cards for in-person payments in Canada.

  - `kakao_pay`
    [Kakao Pay](https://docs.stripe.com/docs/payments/kakao-pay/accept-a-payment.md) is a digital wallet payment method used in South Korea.

  - `klarna`
    [Klarna](https://docs.stripe.com/docs/payments/klarna.md) is a global buy now, pay later payment method.

  - `konbini`
    [Konbini](https://docs.stripe.com/docs/payments/konbini.md) is a cash-based voucher payment method used in Japan.

  - `kr_card`
    [Korean cards](https://docs.stripe.com/docs/payments/kr-card/accept-a-payment.md) enables customers to accept local credit and debit cards in South Korea.

  - `mb_way`
    MB WAY is a payment method.

  - `mobilepay`
    [MobilePay](https://docs.stripe.com/docs/payments/mobilepay.md) is a Nordic card-passthrough wallet payment method where customers authorize the payment in the MobilePay application.

  - `multibanco`
    [Multibanco](https://docs.stripe.com/docs/payments/multibanco.md) is a voucher payment method

  - `naver_pay`
    [Naver Pay](https://docs.stripe.com/docs/payments/naver-pay/accept-a-payment.md) is a digital wallet payment method used in South Korea.

  - `nz_bank_account`
    [New Zealand BECS Direct Debit](https://docs.stripe.com/docs/payments/nz-bank-account.md) is used to debit New Zealand bank accounts through the Bulk Electronic Clearing System (BECS).

  - `oxxo`
    [OXXO](https://docs.stripe.com/docs/payments/oxxo.md) is a cash-based voucher payment method used in Mexico.

  - `p24`
    [Przelewy24](https://docs.stripe.com/docs/payments/p24.md) is a bank redirect payment method used in Poland.

  - `pay_by_bank`
    [Pay By Bank](https://docs.stripe.com/docs/payments/pay-by-bank.md) is an open banking payment method in the UK.

  - `payco`
    [PAYCO](https://docs.stripe.com/docs/payments/payco/accept-a-payment.md) is a digital wallet payment method used in South Korea.

  - `paynow`
    [PayNow](https://docs.stripe.com/docs/payments/paynow.md) is a QR code payment method used in Singapore.

  - `paypal`
    [PayPal](https://docs.stripe.com/docs/payments/paypal.md) is an online wallet and redirect payment method commonly used in Europe.

  - `paypay`
    [PayPay](https://docs.stripe.com/docs/payments/paypay.md) is a payment method.

  - `payto`
    [PayTo](https://docs.stripe.com/docs/payments/payto.md) is a real time payment method

  - `pix`
    [Pix](https://docs.stripe.com/docs/payments/pix.md) is an instant bank transfer payment method in Brazil.

  - `promptpay`
    [PromptPay](https://docs.stripe.com/docs/payments/promptpay.md) is an instant funds transfer service popular in Thailand.

  - `revolut_pay`
    [Revolut Pay](https://docs.stripe.com/docs/payments/revolut-pay.md) is a digital wallet payment method used in the United Kingdom.

  - `samsung_pay`
    [Samsung Pay](https://docs.stripe.com/docs/payments/samsung-pay/accept-a-payment.md) is a digital wallet payment method used in South Korea.

  - `satispay`
    [Satispay](https://docs.stripe.com/docs/payments/satispay.md) is a payment method.

  - `scalapay`
    Scalapay is a payment method.

  - `sepa_debit`
    [SEPA Direct Debit](https://docs.stripe.com/docs/payments/sepa-debit.md) is used to debit bank accounts within the Single Euro Payments Area (SEPA) region.

  - `sofort`
    [Sofort](https://docs.stripe.com/docs/payments/sofort.md) is a bank redirect payment method used in Europe.

  - `sunbit`
    Sunbit is a payment method.

  - `swish`
    [Swish](https://docs.stripe.com/docs/payments/swish.md) is a Swedish wallet payment method where customers authorize the payment in the Swish application.

  - `twint`
    [TWINT](https://docs.stripe.com/docs/payments/twint.md) is a single-use payment method used in Switzerland.

  - `upi`
    [UPI](https://docs.stripe.com/docs/payments/upi.md) is an instant real-time payment system in India.

  - `us_bank_account`
    [ACH Direct Debit](https://docs.stripe.com/docs/payments/ach-direct-debit.md) is used to debit US bank accounts through the Automated Clearing House (ACH) payments system.

  - `wechat_pay`
    [WeChat Pay](https://docs.stripe.com/docs/payments/wechat-pay.md) is a digital wallet payment method based in China.

  - `zip`
    [Zip](https://docs.stripe.com/docs/payments/zip.md) is a Buy now, pay later Payment Method

- `hooks` (object, optional)
  Automations to be run during the PaymentIntent lifecycle

  - `hooks.inputs` (object, optional)
    Arguments passed in automations

    - `hooks.inputs.tax` (object, optional)
      Tax arguments for automations

      - `hooks.inputs.tax.calculation` (string, required)
        The [TaxCalculation](https://docs.stripe.com/docs/api/tax/calculations.md) id

- `mandate` (string, optional)
  ID of the mandate that’s used for this payment. This parameter can only be used with [`confirm=true`](https://docs.stripe.com/docs/api/payment_intents/create.md#create_payment_intent-confirm).

- `mandate_data` (object, optional)
  This hash contains details about the Mandate to create. This parameter can only be used with [`confirm=true`](https://docs.stripe.com/docs/api/payment_intents/create.md#create_payment_intent-confirm).

  - `mandate_data.customer_acceptance` (object, required)
    This hash contains details about the customer acceptance of the Mandate.

    - `mandate_data.customer_acceptance.type` (string, required)
      The type of customer acceptance information included with the Mandate. One of `online` or `offline`.

    - `mandate_data.customer_acceptance.accepted_at` (timestamp, optional)
      The time at which the customer accepted the Mandate.

    - `mandate_data.customer_acceptance.offline` (object, optional)
      If this is a Mandate accepted offline, this hash contains details about the offline acceptance.

    - `mandate_data.customer_acceptance.online` (object, optional)
      If this is a Mandate accepted online, this hash contains details about the online acceptance.

      - `mandate_data.customer_acceptance.online.ip_address` (string, required)
        The IP address from which the Mandate was accepted by the customer.

      - `mandate_data.customer_acceptance.online.user_agent` (string, required)
        The user agent of the browser from which the Mandate was accepted by the customer.

- `metadata` (object, optional)
  Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.

- `off_session` (boolean | string, optional)
  Set to `true` to indicate that the customer isn’t in your checkout flow during this payment attempt and can’t authenticate. Use this parameter in scenarios where you collect payment method details and [charge them later](https://docs.stripe.com/payments/save-during-payment.md). This parameter can only be used with [`confirm=true`](https://docs.stripe.com/docs/api/payment_intents/create.md#create_payment_intent-confirm).

- `on_behalf_of` (string, optional)
  The Stripe account ID that these funds are intended for. Learn more about the [use case for connected accounts](https://docs.stripe.com/docs/payments/connected-accounts.md).

- `payment_details` (object, optional)
  Provides industry-specific information about the charge.

  - `payment_details.customer_reference` (string, optional)
    A unique value to identify the customer. This field is available only for card payments.

    This field is truncated to 25 alphanumeric characters, excluding spaces, before being sent to card networks.

  - `payment_details.order_reference` (string, optional)
    A unique value assigned by the business to identify the transaction. Required for L2 and L3 rates.

    For Cards, this field is truncated to 25 alphanumeric characters, excluding spaces, before being sent to card networks. For Klarna, this field is truncated to 255 characters and is visible to customers when they view the order in the Klarna app.

- `payment_method` (string, optional)
  ID of the payment method (a PaymentMethod, Card, or [compatible Source](https://docs.stripe.com/docs/payments/payment-methods/transitioning.md#compatibility) object) to attach to this PaymentIntent.

  If you omit this parameter with `confirm=true`, `customer.default_source` attaches as this PaymentIntent’s payment instrument to improve migration for users of the Charges API. We recommend that you explicitly provide the `payment_method` moving forward. If the payment method is attached to a Customer, you must also provide the ID of that Customer as the [customer](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-customer) parameter of this PaymentIntent.

- `payment_method_configuration` (string, optional)
  The ID of the [payment method configuration](https://docs.stripe.com/docs/api/payment_method_configurations.md) to use with this PaymentIntent.

  The maximum length is 100 characters.

- `payment_method_data` (object, optional)
  If provided, this hash will be used to create a PaymentMethod. The new PaymentMethod will appear in the [payment_method](https://docs.stripe.com/docs/api/payment_intents/object.md#payment_intent_object-payment_method) property on the PaymentIntent.

  - `payment_method_data.type` (enum, required)
    The type of the PaymentMethod. An additional hash is included on the PaymentMethod with a name matching this value. It contains additional information specific to the PaymentMethod type.

  - `payment_method_data.acss_debit` (object, optional)
    If this is an `acss_debit` PaymentMethod, this hash contains details about the ACSS Debit payment method.

    - `payment_method_data.acss_debit.account_number` (string, required)
      Customer’s bank account number.

    - `payment_method_data.acss_debit.institution_number` (string, required)
      Institution number of the customer’s bank.

    - `payment_method_data.acss_debit.transit_number` (string, required)
      Transit number of the customer’s bank.

  - `payment_method_data.affirm` (object, optional)
    If this is an `affirm` PaymentMethod, this hash contains details about the Affirm payment method.

  - `payment_method_data.afterpay_clearpay` (object, optional)
    If this is an `AfterpayClearpay` PaymentMethod, this hash contains details about the AfterpayClearpay payment method.

  - `payment_method_data.alipay` (object, optional)
    If this is an `Alipay` PaymentMethod, this hash contains details about the Alipay payment method.

  - `payment_method_data.allow_redisplay` (enum, optional)
    This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow. The field defaults to `unspecified`.
Possible enum values:
    - `always`
      Use `always` to indicate that this payment method can always be shown to a customer in a checkout flow.

    - `limited`
      Use `limited` to indicate that this payment method can’t always be shown to a customer in a checkout flow. For example, it can only be shown in the context of a specific subscription.

    - `unspecified`
      This is the default value for payment methods where `allow_redisplay` wasn’t set.

  - `payment_method_data.alma` (object, optional)
    If this is a Alma PaymentMethod, this hash contains details about the Alma payment method.

  - `payment_method_data.amazon_pay` (object, optional)
    If this is a AmazonPay PaymentMethod, this hash contains details about the AmazonPay payment method.

  - `payment_method_data.au_becs_debit` (object, optional)
    If this is an `au_becs_debit` PaymentMethod, this hash contains details about the bank account.

    - `payment_method_data.au_becs_debit.account_number` (string, required)
      The account number for the bank account.

    - `payment_method_data.au_becs_debit.bsb_number` (string, required)
      Bank-State-Branch number of the bank account.

  - `payment_method_data.bacs_debit` (object, optional)
    If this is a `bacs_debit` PaymentMethod, this hash contains details about the Bacs Direct Debit bank account.

    - `payment_method_data.bacs_debit.account_number` (string, optional)
      Account number of the bank account that the funds will be debited from.

    - `payment_method_data.bacs_debit.sort_code` (string, optional)
      Sort code of the bank account. (e.g., `10-20-30`)

  - `payment_method_data.bancontact` (object, optional)
    If this is a `bancontact` PaymentMethod, this hash contains details about the Bancontact payment method.

  - `payment_method_data.billie` (object, optional)
    If this is a `billie` PaymentMethod, this hash contains details about the Billie payment method.

  - `payment_method_data.billing_details` (object, optional)
    Billing information associated with the PaymentMethod that may be used or required by particular types of payment methods.

    - `payment_method_data.billing_details.address` (object, optional)
      Billing address.

      - `payment_method_data.billing_details.address.city` (string, optional)
        City, district, suburb, town, or village.

      - `payment_method_data.billing_details.address.country` (string, optional)
        Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

      - `payment_method_data.billing_details.address.line1` (string, optional)
        Address line 1, such as the street, PO Box, or company name.

      - `payment_method_data.billing_details.address.line2` (string, optional)
        Address line 2, such as the apartment, suite, unit, or building.

      - `payment_method_data.billing_details.address.postal_code` (string, optional)
        ZIP or postal code.

      - `payment_method_data.billing_details.address.state` (string, optional)
        State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

    - `payment_method_data.billing_details.email` (string, optional)
      Email address.

      The maximum length is 800 characters.

    - `payment_method_data.billing_details.name` (string, optional)
      Full name.

    - `payment_method_data.billing_details.phone` (string, optional)
      Billing phone number (including extension).

    - `payment_method_data.billing_details.tax_id` (string, optional)
      Taxpayer identification number. Used only for transactions between LATAM buyers and non-LATAM sellers.

  - `payment_method_data.bizum` (object, optional)
    If this is a `bizum` PaymentMethod, this hash contains details about the Bizum payment method.

  - `payment_method_data.blik` (object, optional)
    If this is a `blik` PaymentMethod, this hash contains details about the BLIK payment method.

  - `payment_method_data.boleto` (object, optional)
    If this is a `boleto` PaymentMethod, this hash contains details about the Boleto payment method.

    - `payment_method_data.boleto.tax_id` (string, required)
      The tax ID of the customer (CPF for individual consumers or CNPJ for businesses consumers)

  - `payment_method_data.cashapp` (object, optional)
    If this is a `cashapp` PaymentMethod, this hash contains details about the Cash App Pay payment method.

  - `payment_method_data.crypto` (object, optional)
    If this is a Crypto PaymentMethod, this hash contains details about the Crypto payment method.

  - `payment_method_data.customer_balance` (object, optional)
    If this is a `customer_balance` PaymentMethod, this hash contains details about the CustomerBalance payment method.

  - `payment_method_data.eps` (object, optional)
    If this is an `eps` PaymentMethod, this hash contains details about the EPS payment method.

    - `payment_method_data.eps.bank` (string, optional)
      The customer’s bank.

  - `payment_method_data.fpx` (object, optional)
    If this is an `fpx` PaymentMethod, this hash contains details about the FPX payment method.

    - `payment_method_data.fpx.bank` (string, required)
      The customer’s bank.

  - `payment_method_data.giropay` (object, optional)
    If this is a `giropay` PaymentMethod, this hash contains details about the Giropay payment method.

  - `payment_method_data.grabpay` (object, optional)
    If this is a `grabpay` PaymentMethod, this hash contains details about the GrabPay payment method.

  - `payment_method_data.ideal` (object, optional)
    If this is an `ideal` PaymentMethod, this hash contains details about the iDEAL payment method.

    - `payment_method_data.ideal.bank` (string, optional)
      The customer’s bank. Only use this parameter for existing customers. Don’t use it for new customers.

  - `payment_method_data.interac_present` (object, optional)
    If this is an `interac_present` PaymentMethod, this hash contains details about the Interac Present payment method.

  - `payment_method_data.kakao_pay` (object, optional)
    If this is a `kakao_pay` PaymentMethod, this hash contains details about the Kakao Pay payment method.

  - `payment_method_data.klarna` (object, optional)
    If this is a `klarna` PaymentMethod, this hash contains details about the Klarna payment method.

    - `payment_method_data.klarna.dob` (object, optional)
      Customer’s date of birth

      - `payment_method_data.klarna.dob.day` (integer, required)
        The day of birth, between 1 and 31.

      - `payment_method_data.klarna.dob.month` (integer, required)
        The month of birth, between 1 and 12.

      - `payment_method_data.klarna.dob.year` (integer, required)
        The four-digit year of birth.

  - `payment_method_data.konbini` (object, optional)
    If this is a `konbini` PaymentMethod, this hash contains details about the Konbini payment method.

  - `payment_method_data.kr_card` (object, optional)
    If this is a `kr_card` PaymentMethod, this hash contains details about the Korean Card payment method.

  - `payment_method_data.link` (object, optional)
    If this is an `Link` PaymentMethod, this hash contains details about the Link payment method (Link is also known as Onelink in the UK).

  - `payment_method_data.mb_way` (object, optional)
    If this is a MB WAY PaymentMethod, this hash contains details about the MB WAY payment method.

  - `payment_method_data.metadata` (object, optional)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.

  - `payment_method_data.mobilepay` (object, optional)
    If this is a `mobilepay` PaymentMethod, this hash contains details about the MobilePay payment method.

  - `payment_method_data.multibanco` (object, optional)
    If this is a `multibanco` PaymentMethod, this hash contains details about the Multibanco payment method.

  - `payment_method_data.naver_pay` (object, optional)
    If this is a `naver_pay` PaymentMethod, this hash contains details about the Naver Pay payment method.

    - `payment_method_data.naver_pay.funding` (enum, optional)
      Whether to use Naver Pay points or a card to fund this transaction. If not provided, this defaults to `card`.
Possible enum values:
      - `card`
        Use a card to fund this transaction.

      - `points`
        Use Naver Pay points to fund this transaction.

  - `payment_method_data.nz_bank_account` (object, optional)
    If this is an nz_bank_account PaymentMethod, this hash contains details about the nz_bank_account payment method.

    - `payment_method_data.nz_bank_account.account_number` (string, required)
      The account number for the bank account.

    - `payment_method_data.nz_bank_account.bank_code` (string, required)
      The numeric code for the bank account’s bank.

    - `payment_method_data.nz_bank_account.branch_code` (string, required)
      The numeric code for the bank account’s bank branch.

    - `payment_method_data.nz_bank_account.suffix` (string, required)
      The suffix of the bank account number.

    - `payment_method_data.nz_bank_account.account_holder_name` (string, optional)
      The name on the bank account. Only required if the account holder name is different from the name of the authorized signatory collected in the PaymentMethod’s billing details.

  - `payment_method_data.oxxo` (object, optional)
    If this is an `oxxo` PaymentMethod, this hash contains details about the OXXO payment method.

  - `payment_method_data.p24` (object, optional)
    If this is a `p24` PaymentMethod, this hash contains details about the P24 payment method.

    - `payment_method_data.p24.bank` (enum, optional)
      The customer’s bank.

  - `payment_method_data.pay_by_bank` (object, optional)
    If this is a `pay_by_bank` PaymentMethod, this hash contains details about the PayByBank payment method.

  - `payment_method_data.payco` (object, optional)
    If this is a `payco` PaymentMethod, this hash contains details about the PAYCO payment method.

  - `payment_method_data.paynow` (object, optional)
    If this is a `paynow` PaymentMethod, this hash contains details about the PayNow payment method.

  - `payment_method_data.paypal` (object, optional)
    If this is a `paypal` PaymentMethod, this hash contains details about the PayPal payment method.

  - `payment_method_data.paypay` (object, optional)
    If this is a `paypay` PaymentMethod, this hash contains details about the PayPay payment method.

  - `payment_method_data.payto` (object, optional)
    If this is a `payto` PaymentMethod, this hash contains details about the PayTo payment method.

    - `payment_method_data.payto.account_number` (string, optional)
      The account number for the bank account.

    - `payment_method_data.payto.bsb_number` (string, optional)
      Bank-State-Branch number of the bank account.

    - `payment_method_data.payto.pay_id` (string, optional)
      The PayID alias for the bank account.

  - `payment_method_data.pix` (object, optional)
    If this is a `pix` PaymentMethod, this hash contains details about the Pix payment method.

  - `payment_method_data.promptpay` (object, optional)
    If this is a `promptpay` PaymentMethod, this hash contains details about the PromptPay payment method.

  - `payment_method_data.radar_options` (object, optional)
    Options to configure Radar. See [Radar Session](https://docs.stripe.com/docs/radar/radar-session.md) for more information.

    - `payment_method_data.radar_options.session` (string, optional)
      A [Radar Session](https://docs.stripe.com/docs/radar/radar-session.md) is a snapshot of the browser metadata and device details that help Radar make more accurate predictions on your payments.

  - `payment_method_data.revolut_pay` (object, optional)
    If this is a `revolut_pay` PaymentMethod, this hash contains details about the Revolut Pay payment method.

  - `payment_method_data.samsung_pay` (object, optional)
    If this is a `samsung_pay` PaymentMethod, this hash contains details about the SamsungPay payment method.

  - `payment_method_data.satispay` (object, optional)
    If this is a `satispay` PaymentMethod, this hash contains details about the Satispay payment method.

  - `payment_method_data.scalapay` (object, optional)
    If this is a Scalapay PaymentMethod, this hash contains details about the Scalapay payment method.

  - `payment_method_data.sepa_debit` (object, optional)
    If this is a `sepa_debit` PaymentMethod, this hash contains details about the SEPA debit bank account.

    - `payment_method_data.sepa_debit.iban` (string, required)
      IBAN of the bank account.

  - `payment_method_data.sofort` (object, optional)
    If this is a `sofort` PaymentMethod, this hash contains details about the SOFORT payment method.

    - `payment_method_data.sofort.country` (enum, required)
      Two-letter ISO code representing the country the bank account is located in.
Possible enum values:
      - `AT`
        Austria

      - `BE`
        Belgium

      - `DE`
        Germany

      - `ES`
        Spain

      - `IT`
        Italy

      - `NL`
        Netherlands

  - `payment_method_data.sunbit` (object, optional)
    If this is a Sunbit PaymentMethod, this hash contains details about the Sunbit payment method.

  - `payment_method_data.swish` (object, optional)
    If this is a `swish` PaymentMethod, this hash contains details about the Swish payment method.

  - `payment_method_data.twint` (object, optional)
    If this is a TWINT PaymentMethod, this hash contains details about the TWINT payment method.

  - `payment_method_data.upi` (object, optional)
    If this is a `upi` PaymentMethod, this hash contains details about the UPI payment method.

    - `payment_method_data.upi.mandate_options` (object, optional)
      Configuration options for setting up an eMandate

      - `payment_method_data.upi.mandate_options.amount` (integer, optional)
        Amount to be charged for future payments.

      - `payment_method_data.upi.mandate_options.amount_type` (enum, optional)
        One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.
Possible enum values:
        - `fixed`
          If `fixed`, the `amount` param refers to the exact amount to be charged in future payments.

        - `maximum`
          If `maximum`, the amount charged can be up to the value passed for the `amount` param.

      - `payment_method_data.upi.mandate_options.description` (string, optional)
        A description of the mandate or subscription that is meant to be displayed to the customer.

        The maximum length is 20 characters.

      - `payment_method_data.upi.mandate_options.end_date` (timestamp, optional)
        End date of the mandate or subscription.

  - `payment_method_data.us_bank_account` (object, optional)
    If this is an `us_bank_account` PaymentMethod, this hash contains details about the US bank account payment method.

    - `payment_method_data.us_bank_account.account_holder_type` (enum, optional)
      Account holder type: individual or company.
Possible enum values:
      - `company`
        Account belongs to a company

      - `individual`
        Account belongs to an individual

    - `payment_method_data.us_bank_account.account_number` (string, optional)
      Account number of the bank account.

    - `payment_method_data.us_bank_account.account_type` (enum, optional)
      Account type: checkings or savings. Defaults to checking if omitted.
Possible enum values:
      - `checking`
        Bank account type is checking

      - `savings`
        Bank account type is savings

    - `payment_method_data.us_bank_account.financial_connections_account` (string, optional)
      The ID of a Financial Connections Account to use as a payment method.

    - `payment_method_data.us_bank_account.routing_number` (string, optional)
      Routing number of the bank account.

  - `payment_method_data.wechat_pay` (object, optional)
    If this is an `wechat_pay` PaymentMethod, this hash contains details about the wechat_pay payment method.

  - `payment_method_data.zip` (object, optional)
    If this is a `zip` PaymentMethod, this hash contains details about the Zip payment method.

- `payment_method_options` (object, optional)
  Payment method-specific configuration for this PaymentIntent.

  - `payment_method_options.acss_debit` (object, optional)
    If this is a `acss_debit` PaymentMethod, this sub-hash contains details about the ACSS Debit payment method options.

    - `payment_method_options.acss_debit.mandate_options` (object, optional)
      Additional fields for Mandate creation

      - `payment_method_options.acss_debit.mandate_options.custom_mandate_url` (string, optional)
        A URL for custom mandate text to render during confirmation step. The URL will be rendered with additional GET parameters `payment_intent` and `payment_intent_client_secret` when confirming a Payment Intent, or `setup_intent` and `setup_intent_client_secret` when confirming a Setup Intent.

      - `payment_method_options.acss_debit.mandate_options.interval_description` (string, optional)
        Description of the mandate interval. Only required if ‘payment_schedule’ parameter is ‘interval’ or ‘combined’.

        The maximum length is 500 characters.

      - `payment_method_options.acss_debit.mandate_options.payment_schedule` (enum, optional)
        Payment schedule for the mandate.
Possible enum values:
        - `combined`
          Payments can be initiated at a pre-defined interval or sporadically

        - `interval`
          Payments are initiated at a regular pre-defined interval

        - `sporadic`
          Payments are initiated sporadically

      - `payment_method_options.acss_debit.mandate_options.transaction_type` (enum, optional)
        Transaction type of the mandate.
Possible enum values:
        - `business`
          Transactions are made for business reasons

        - `personal`
          Transactions are made for personal reasons

    - `payment_method_options.acss_debit.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.acss_debit.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

    - `payment_method_options.acss_debit.verification_method` (enum, optional)
      Bank account verification method. The default value is `automatic`.
Possible enum values:
      - `automatic`
        Instant verification with fallback to microdeposits.

      - `instant`
        Instant verification.

      - `microdeposits`
        Verification using microdeposits.

  - `payment_method_options.affirm` (object, optional)
    If this is an `affirm` PaymentMethod, this sub-hash contains details about the Affirm payment method options.

    - `payment_method_options.affirm.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.affirm.preferred_locale` (string, optional)
      Preferred language of the Affirm authorization page that the customer is redirected to.

      The maximum length is 30 characters.

    - `payment_method_options.affirm.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.afterpay_clearpay` (object, optional)
    If this is a `afterpay_clearpay` PaymentMethod, this sub-hash contains details about the Afterpay Clearpay payment method options.

    - `payment_method_options.afterpay_clearpay.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.afterpay_clearpay.reference` (string, optional)
      An internal identifier or reference that this payment corresponds to. You must limit the identifier to 128 characters, and it can only contain letters, numbers, underscores, backslashes, and dashes. This field differs from the statement descriptor and item name.

      The maximum length is 128 characters.

    - `payment_method_options.afterpay_clearpay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.alipay` (object, optional)
    If this is a `alipay` PaymentMethod, this sub-hash contains details about the Alipay payment method options.

    - `payment_method_options.alipay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.alma` (object, optional)
    If this is a `alma` PaymentMethod, this sub-hash contains details about the Alma payment method options.

    - `payment_method_options.alma.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.amazon_pay` (object, optional)
    If this is a `amazon_pay` PaymentMethod, this sub-hash contains details about the Amazon Pay payment method options.

    - `payment_method_options.amazon_pay.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.amazon_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.au_becs_debit` (object, optional)
    If this is a `au_becs_debit` PaymentMethod, this sub-hash contains details about the AU BECS Direct Debit payment method options.

    - `payment_method_options.au_becs_debit.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.au_becs_debit.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.bacs_debit` (object, optional)
    If this is a `bacs_debit` PaymentMethod, this sub-hash contains details about the BACS Debit payment method options.

    - `payment_method_options.bacs_debit.mandate_options` (object, optional)
      Additional fields for Mandate creation

      - `payment_method_options.bacs_debit.mandate_options.reference_prefix` (string, optional)
        Prefix used to generate the Mandate reference. Must be at most 12 characters long. Must consist of only uppercase letters, numbers, spaces, or the following special characters: ‘/’, ‘_’, ‘-’, ‘&’, ‘.’. Cannot begin with ‘DDIC’ or ‘STRIPE’.

        The maximum length is 12 characters.

    - `payment_method_options.bacs_debit.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.bacs_debit.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.bancontact` (object, optional)
    If this is a `bancontact` PaymentMethod, this sub-hash contains details about the Bancontact payment method options.

    - `payment_method_options.bancontact.preferred_language` (enum, optional)
      Preferred language of the Bancontact authorization page that the customer is redirected to.
Possible enum values:
      - `de`
        German

      - `en`
        English

      - `fr`
        French

      - `nl`
        Dutch

    - `payment_method_options.bancontact.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.billie` (object, optional)
    If this is a `billie` PaymentMethod, this sub-hash contains details about the Billie payment method options.

    - `payment_method_options.billie.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.bizum` (object, optional)
    If this is a `bizum` PaymentMethod, this sub-hash contains details about the Bizum payment method options.

  - `payment_method_options.blik` (object, optional)
    If this is a `blik` PaymentMethod, this sub-hash contains details about the BLIK payment method options.

    - `payment_method_options.blik.code` (string, optional)
      The 6-digit BLIK code that a customer has generated using their banking application. Can only be set on confirmation.

    - `payment_method_options.blik.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.boleto` (object, optional)
    If this is a `boleto` PaymentMethod, this sub-hash contains details about the Boleto payment method options.

    - `payment_method_options.boleto.expires_after_days` (integer, optional)
      The number of calendar days before a Boleto voucher expires. For example, if you create a Boleto voucher on Monday and you set expires_after_days to 2, the Boleto invoice will expire on Wednesday at 23:59 America/Sao_Paulo time.

    - `payment_method_options.boleto.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

  - `payment_method_options.card` (object, optional)
    Configuration for any card payments attempted on this PaymentIntent.

    - `payment_method_options.card.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.card.cvc_token` (string, optional)
      A single-use `cvc_update` Token that represents a card CVC value. When provided, the CVC value will be verified during the card payment attempt. This parameter can only be provided during confirmation.

    - `payment_method_options.card.installments` (object, optional)
      Installment configuration for payments attempted on this PaymentIntent.

      For more information, see the [installments integration guide](https://docs.stripe.com/docs/payments/installments.md).

      - `payment_method_options.card.installments.enabled` (boolean, optional)
        Setting to true enables installments for this PaymentIntent. This will cause the response to contain a list of available installment plans. Setting to false will prevent any selected plan from applying to a charge.

      - `payment_method_options.card.installments.plan` (object, optional)
        The selected installment plan to use for this payment attempt. This parameter can only be provided during confirmation.

        - `payment_method_options.card.installments.plan.type` (enum, required)
          Type of installment plan, one of `fixed_count`, `bonus`, or `revolving`.
Possible enum values:
          - `bonus`
            An installment plan used in Japan, where the customer defers payment to a later date that aligns with their salary bonus.

          - `fixed_count`
            An installment plan where the number of installment payments is fixed and known at the time of purchase.

          - `revolving`
            An installment plan used in Japan, where the customer pays a certain amount each month, and the remaining balance rolls over to the next month.

        - `payment_method_options.card.installments.plan.count` (integer, optional)
          For `fixed_count` installment plans, this is required. It represents the number of installment payments your customer will make to their credit card.

        - `payment_method_options.card.installments.plan.interval` (enum, optional)
          For `fixed_count` installment plans, this is required. It represents the interval between installment payments your customer will make to their credit card. One of `month`.
Possible enum values:
          - `month`

    - `payment_method_options.card.mandate_options` (object, optional)
      Configuration options for setting up an eMandate for cards issued in India.

      - `payment_method_options.card.mandate_options.amount` (integer, required)
        Amount to be charged for future payments, specified in the presentment currency.

      - `payment_method_options.card.mandate_options.amount_type` (enum, required)
        One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.
Possible enum values:
        - `fixed`
        - `maximum`

      - `payment_method_options.card.mandate_options.interval` (enum, required)
        Specifies payment frequency. One of `day`, `week`, `month`, `year`, or `sporadic`.
Possible enum values:
        - `day`
        - `month`
        - `sporadic`
        - `week`
        - `year`

      - `payment_method_options.card.mandate_options.reference` (string, required)
        Unique identifier for the mandate or subscription.

        The maximum length is 80 characters.

      - `payment_method_options.card.mandate_options.start_date` (timestamp, required)
        Start date of the mandate or subscription. Start date should not be lesser than yesterday.

      - `payment_method_options.card.mandate_options.description` (string, optional)
        A description of the mandate or subscription that is meant to be displayed to the customer.

        The maximum length is 200 characters.

      - `payment_method_options.card.mandate_options.end_date` (timestamp, optional)
        End date of the mandate or subscription. If not provided, the mandate will be active until canceled. If provided, end date should be after start date.

      - `payment_method_options.card.mandate_options.interval_count` (integer, optional)
        The number of intervals between payments. For example, `interval=month` and `interval_count=3` indicates one payment every three months. Maximum of one year interval allowed (1 year, 12 months, or 52 weeks). This parameter is optional when `interval=sporadic`.

      - `payment_method_options.card.mandate_options.supported_types` (array of enums, optional)
        Specifies the type of mandates supported. Possible values are `india`.
Possible enum values:
        - `india`

    - `payment_method_options.card.network` (string, optional)
      Selected network to process this PaymentIntent on. Depends on the available networks of the card attached to the PaymentIntent. Can be only set confirm-time.

    - `payment_method_options.card.request_extended_authorization` (enum, optional)
      Request ability to [capture beyond the standard authorization validity window](https://docs.stripe.com/docs/payments/extended-authorization.md) for this PaymentIntent.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to extend the capture window when eligible for extended authorization.

      - `never`
        Use `never` if you don’t want to extend the capture window.

    - `payment_method_options.card.request_incremental_authorization` (enum, optional)
      Request ability to [increment the authorization](https://docs.stripe.com/docs/payments/incremental-authorization.md) for this PaymentIntent.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to increment the authorization on the PaymentIntent when eligible.

      - `never`
        Use `never` if you don’t want to increment the authorization on the PaymentIntent.

    - `payment_method_options.card.request_multicapture` (enum, optional)
      Request ability to make [multiple captures](https://docs.stripe.com/docs/payments/multicapture.md) for this PaymentIntent.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to use multicapture when eligible.

      - `never`
        Use `never` if you don’t want to use multicapture.

    - `payment_method_options.card.request_overcapture` (enum, optional)
      Request ability to [overcapture](https://docs.stripe.com/docs/payments/overcapture.md) for this PaymentIntent.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to overcapture the payment when eligible.

      - `never`
        Use `never` if you don’t want to overcapture the payment.

    - `payment_method_options.card.request_three_d_secure` (enum, optional)
      We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://docs.stripe.com/docs/strong-customer-authentication.md). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. If not provided, this value defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://docs.stripe.com/docs/payments/3d-secure/authentication-flow.md#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
Possible enum values:
      - `any`
        Use `any` to manually request 3DS with a preference for a `frictionless` flow, increasing the likelihood of the authentication being completed without any additional input from the customer. 3DS will always be attempted if it is supported for the card, but Stripe can’t guarantee your preference because the issuer determines the ultimate authentication flow. To learn more about 3DS flows, read our [guide](https://stripe.com/guides/3d-secure-2#frictionless-authentication).

      - `automatic`
        (Default) Our SCA Engine automatically prompts your customers for authentication based on risk level and other requirements.

      - `challenge`
        Use `challenge` to request 3DS with a preference for a `challenge` flow, where the customer must respond to a prompt for active authentication. Stripe can’t guarantee your preference because the issuer determines the ultimate authentication flow. To learn more about 3DS flows, read our [guide](https://stripe.com/guides/3d-secure-2#frictionless-authentication).

    - `payment_method_options.card.require_cvc_recollection` (boolean, optional)
      When enabled, using a card that is attached to a customer will require the CVC to be provided again (i.e. using the cvc_token parameter).

    - `payment_method_options.card.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.card.statement_descriptor_suffix_kana` (string, optional)
      Provides information about a card payment that customers see on their statements. Concatenated with the Kana prefix (shortened Kana descriptor) or Kana statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 22 characters. On card statements, the *concatenation* of both prefix and suffix (including separators) will appear truncated to 22 characters.

    - `payment_method_options.card.statement_descriptor_suffix_kanji` (string, optional)
      Provides information about a card payment that customers see on their statements. Concatenated with the Kanji prefix (shortened Kanji descriptor) or Kanji statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 17 characters. On card statements, the *concatenation* of both prefix and suffix (including separators) will appear truncated to 17 characters.

    - `payment_method_options.card.three_d_secure` (object, optional)
      If 3D Secure authentication was performed with a third-party provider, the authentication details to use for this payment.

      - `payment_method_options.card.three_d_secure.cryptogram` (string, required)
        The cryptogram, also known as the “authentication value” (AAV, CAVV or AEVV). This value is 20 bytes, base64-encoded into a 28-character string. (Most 3D Secure providers will return the base64-encoded version, which is what you should specify here.)

      - `payment_method_options.card.three_d_secure.transaction_id` (string, required)
        For 3D Secure 1, the XID. For 3D Secure 2, the Directory Server Transaction ID (dsTransID).

      - `payment_method_options.card.three_d_secure.version` (enum, required)
        The version of 3D Secure that was performed.

      - `payment_method_options.card.three_d_secure.ares_trans_status` (enum, optional)
        The `transStatus` returned from the card Issuer’s ACS in the ARes.
Possible enum values:
        - `A`
          Attempts processing performed; Not authenticated/verified, but a proof of attempted authentication/verification is provided.

        - `C`
          Challenge required; Additional authentication is required.

        - `I`
          Informational only; 3DS Requestor challenge preference acknowledged.

        - `N`
          Not authenticated/Account not verified; Transaction denied.

        - `R`
          Authentication/Account verification rejected; Issuer is rejecting authentication/verification and request that authorisation not be attempted.

        - `U`
          Authentication/Account verification could not be performed; Technical or other problem.

        - `Y`
          Authentication verification successful.

      - `payment_method_options.card.three_d_secure.electronic_commerce_indicator` (enum, Required on all networks except Cartes Bancaires)
        The Electronic Commerce Indicator (ECI) is returned by your 3D Secure provider and indicates what degree of authentication was performed.
Possible enum values:
        - `01`
          **Mastercard variant:** Attempt acknowledged.

        - `02`
          **Mastercard variant:** Fully authenticated.

        - `05`
          Fully authenticated. The customer likely proved their identity to the issuing bank.

        - `06`
          Attempt acknowledged. The customer, or the entire issuing bank, is not set up for 3D Secure. Or the issuing bank is experiencing an outage.

          **Mastercard variant:** Acquirer SCA exemption.

        - `07`
          **Mastercard variant:** Fully authenticated recurring transaction.

      - `payment_method_options.card.three_d_secure.exemption_indicator` (enum, optional)
        The exemption requested via 3DS and accepted by the issuer at authentication time.
Possible enum values:
        - `low_risk`
          Transaction Risk Analysis (TRA) was performed, a low risk exemption was requested via 3DS and granted by the issuer.

        - `none`
          No exemption was requested via 3DS; or, if requested, it was not granted by the issuer.

      - `payment_method_options.card.three_d_secure.network_options` (object, optional)
        Network specific 3DS fields. Network specific arguments require an explicit card brand choice. The parameter `payment_method_options.card.network`` must be populated accordingly

        - `payment_method_options.card.three_d_secure.network_options.cartes_bancaires` (object, optional)
          Cartes Bancaires-specific 3DS fields.

          - `payment_method_options.card.three_d_secure.network_options.cartes_bancaires.cb_avalgo` (enum, required)
            The cryptogram calculation algorithm used by the card Issuer’s ACS to calculate the Authentication cryptogram. Also known as `cavvAlgorithm`. messageExtension: CB-AVALGO
Possible enum values:
            - `0`
              HMAC

            - `1`
              CVV

            - `2`
              CVV with ATN

            - `3`
              Mastercard SPA

            - `4`
              American Express SafeKey 1

            - `A`
              AV-CB

          - `payment_method_options.card.three_d_secure.network_options.cartes_bancaires.cb_exemption` (string, optional)
            The exemption indicator returned from Cartes Bancaires in the ARes. message extension: CB-EXEMPTION; string (4 characters) This is a 3 byte bitmap (low significant byte first and most significant bit first) that has been Base64 encoded

            The maximum length is 4 characters.

          - `payment_method_options.card.three_d_secure.network_options.cartes_bancaires.cb_score` (integer, optional)
            The risk score returned from Cartes Bancaires in the ARes. message extension: CB-SCORE; numeric value 0-99

      - `payment_method_options.card.three_d_secure.requestor_challenge_indicator` (string, optional)
        The challenge indicator (`threeDSRequestorChallengeInd`) which was requested in the AReq sent to the card Issuer’s ACS. A string containing 2 digits from 01-99.

        The maximum length is 2 characters.

  - `payment_method_options.card_present` (object, optional)
    If this is a `card_present` PaymentMethod, this sub-hash contains details about the Card Present payment method options.

    - `payment_method_options.card_present.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

      - `manual_preferred`
        Use `manual_preferred` if you prefer `manual` capture_method but support falling back to `automatic` based on the presented payment method.

    - `payment_method_options.card_present.request_extended_authorization` (boolean, optional)
      Request ability to capture this payment beyond the standard [authorization validity window](https://docs.stripe.com/docs/terminal/features/extended-authorizations.md#authorization-validity)

    - `payment_method_options.card_present.request_incremental_authorization_support` (boolean, optional)
      Request ability to [increment](https://docs.stripe.com/docs/terminal/features/incremental-authorizations.md) this PaymentIntent if the combination of MCC and card brand is eligible. Check [incremental_authorization_supported](https://docs.stripe.com/docs/api/charges/object.md#charge_object-payment_method_details-card_present-incremental_authorization_supported) in the [Confirm](https://docs.stripe.com/docs/api/payment_intents/confirm.md) response to verify support.

    - `payment_method_options.card_present.routing` (object, optional)
      Network routing priority on co-branded EMV cards supporting domestic debit and international card schemes.

      - `payment_method_options.card_present.routing.requested_priority` (enum, optional)
        Routing requested priority
Possible enum values:
        - `domestic`
          Prioritize domestic debit network routing on payment method collection

        - `international`
          Prioritize international network routing on payment method collection

  - `payment_method_options.cashapp` (object, optional)
    If this is a `cashapp` PaymentMethod, this sub-hash contains details about the Cash App Pay payment method options.

    - `payment_method_options.cashapp.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.cashapp.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

  - `payment_method_options.crypto` (object, optional)
    If this is a `crypto` PaymentMethod, this sub-hash contains details about the Crypto payment method options.

    - `payment_method_options.crypto.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.customer_balance` (object, optional)
    If this is a `customer balance` PaymentMethod, this sub-hash contains details about the customer balance payment method options.

    - `payment_method_options.customer_balance.bank_transfer` (object, optional)
      Configuration for the bank transfer funding type, if the `funding_type` is set to `bank_transfer`.

      - `payment_method_options.customer_balance.bank_transfer.type` (enum, required)
        The list of bank transfer types that this PaymentIntent is allowed to use for funding Permitted values include: `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`, `mx_bank_transfer`, or `us_bank_transfer`.
Possible enum values:
        - `eu_bank_transfer`
          eu_bank_transfer bank transfer type

        - `gb_bank_transfer`
          gb_bank_transfer bank transfer type

        - `jp_bank_transfer`
          jp_bank_transfer bank transfer type

        - `mx_bank_transfer`
          mx_bank_transfer bank transfer type

        - `us_bank_transfer`
          us_bank_transfer bank transfer type

      - `payment_method_options.customer_balance.bank_transfer.eu_bank_transfer` (object, optional)
        Configuration for the eu_bank_transfer funding type.

        - `payment_method_options.customer_balance.bank_transfer.eu_bank_transfer.country` (string, required)
          The desired country code of the bank account information. Permitted values include: `DE`, `FR`, `IE`, or `NL`.

      - `payment_method_options.customer_balance.bank_transfer.requested_address_types` (array of enums, optional)
        List of address types that should be returned in the financial_addresses response. If not specified, all valid types will be returned.

        Permitted values include: `sort_code`, `zengin`, `iban`, or `spei`.
Possible enum values:
        - `aba`
          aba bank account address type

        - `iban`
          iban bank account address type

        - `sepa`
          sepa bank account address type

        - `sort_code`
          sort_code bank account address type

        - `spei`
          spei bank account address type

        - `swift`
          swift bank account address type

        - `zengin`
          zengin bank account address type

    - `payment_method_options.customer_balance.funding_type` (enum, optional)
      The funding method type to be used when there are not enough funds in the customer balance. Permitted values include: `bank_transfer`.
Possible enum values:
      - `bank_transfer`

    - `payment_method_options.customer_balance.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.eps` (object, optional)
    If this is a `eps` PaymentMethod, this sub-hash contains details about the EPS payment method options.

    - `payment_method_options.eps.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.fpx` (object, optional)
    If this is a `fpx` PaymentMethod, this sub-hash contains details about the FPX payment method options.

    - `payment_method_options.fpx.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.giropay` (object, optional)
    If this is a `giropay` PaymentMethod, this sub-hash contains details about the Giropay payment method options.

    - `payment_method_options.giropay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.grabpay` (object, optional)
    If this is a `grabpay` PaymentMethod, this sub-hash contains details about the Grabpay payment method options.

    - `payment_method_options.grabpay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.ideal` (object, optional)
    If this is a `ideal` PaymentMethod, this sub-hash contains details about the Ideal payment method options.

    - `payment_method_options.ideal.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.interac_present` (object, optional)
    If this is a `interac_present` PaymentMethod, this sub-hash contains details about the Card Present payment method options.

  - `payment_method_options.kakao_pay` (object, optional)
    If this is a `kakao_pay` PaymentMethod, this sub-hash contains details about the Kakao Pay payment method options.

    - `payment_method_options.kakao_pay.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.kakao_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.klarna` (object, optional)
    If this is a `klarna` PaymentMethod, this sub-hash contains details about the Klarna payment method options.

    - `payment_method_options.klarna.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.klarna.on_demand` (object, optional)
      On-demand details if setting up or charging an on-demand payment.

      - `payment_method_options.klarna.on_demand.average_amount` (integer, optional)
        Your average amount value. You can use a value across your customer base, or segment based on customer type, country, etc.

      - `payment_method_options.klarna.on_demand.maximum_amount` (integer, optional)
        The maximum value you may charge a customer per purchase. You can use a value across your customer base, or segment based on customer type, country, etc.

      - `payment_method_options.klarna.on_demand.minimum_amount` (integer, optional)
        The lowest or minimum value you may charge a customer per purchase. You can use a value across your customer base, or segment based on customer type, country, etc.

      - `payment_method_options.klarna.on_demand.purchase_interval` (enum, optional)
        Interval at which the customer is making purchases
Possible enum values:
        - `day`
          Use `day` if you expect one or more days between charges.

        - `month`
          Use `month` if you expect one or more months between charges.

        - `week`
          Use `week` if you expect one or more weeks between charges.

        - `year`
          Use `year` if you expect one or more years between charges.

      - `payment_method_options.klarna.on_demand.purchase_interval_count` (integer, optional)
        The number of `purchase_interval` between charges

    - `payment_method_options.klarna.preferred_locale` (enum, optional)
      Preferred language of the Klarna authorization page that the customer is redirected to
Possible enum values:
      - `cs-CZ`
        Czech - Czechia

      - `da-DK`
        Danish - Denmark

      - `de-AT`
        German - Austria

      - `de-CH`
        German - Switzerland

      - `de-DE`
        German - Germany

      - `el-GR`
        Greek - Greece

      - `en-AT`
        English - Austria

      - `en-AU`
        English - Australia

      - `en-BE`
        English - Belgium

      - `en-CA`
        English - Canada

      - `en-CH`
        English - Switzerland

      - `en-CZ`
        English - Czechia

      - `en-DE`
        English - Germany

      - `en-DK`
        English - Denmark

      - `en-ES`
        English - Spain

      - `en-FI`
        English - Finland

      - `en-FR`
        English - France

      - `en-GB`
        English - United Kingdom

      - `en-GR`
        English - Greece

      - `en-IE`
        English - Ireland

      - `en-IT`
        English - Italy

      - `en-NL`
        English - Netherlands

      - `en-NO`
        English - Norway

      - `en-NZ`
        English - New Zealand

      - `en-PL`
        English - Poland

      - `en-PT`
        English - Portugal

      - `en-RO`
        English - Romania

      - `en-SE`
        English - Sweden

      - `en-US`
        English - United States of America

      - `es-ES`
        Spanish - Spain

      - `es-US`
        Spanish - United States of America

      - `fi-FI`
        Finnish - Finland

      - `fr-BE`
        French - Belgium

      - `fr-CA`
        French - Canada

      - `fr-CH`
        French - Switzerland

      - `fr-FR`
        French - France

      - `it-CH`
        Italy - Switzerland

      - `it-IT`
        Italian - Italy

      - `nb-NO`
        Norwegian - Norway

      - `nl-BE`
        Dutch - Belgium

      - `nl-NL`
        Dutch - Netherlands

      - `pl-PL`
        Polish - Poland

      - `pt-PT`
        Portugese - Portugal

      - `ro-RO`
        Romanian - Romania

      - `sv-FI`
        Swedish - Finland

      - `sv-SE`
        Swedish - Sweden

    - `payment_method_options.klarna.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.klarna.subscriptions` (array of objects, optional)
      Subscription details if setting up or charging a subscription.

      - `payment_method_options.klarna.subscriptions.interval` (enum, required)
        Unit of time between subscription charges.
Possible enum values:
        - `day`
          Use `day` if subscription charges occur within days.

        - `month`
          Use `month` if subscription charges occur within months.

        - `week`
          Use `week` if subscription charges occur within weeks.

        - `year`
          Use `year` if subscription charges occur within years.

      - `payment_method_options.klarna.subscriptions.reference` (string, required)
        A non-customer-facing reference to correlate subscription charges in the Klarna app. Use a value that persists across subscription charges.

        The maximum length is 255 characters.

      - `payment_method_options.klarna.subscriptions.interval_count` (integer, optional)
        The number of intervals (specified  in the `interval` attribute) between subscription  charges. For example, `interval=month` and `interval_count=3` charges every 3 months.

      - `payment_method_options.klarna.subscriptions.name` (string, optional)
        Name for subscription.

        The maximum length is 255 characters.

      - `payment_method_options.klarna.subscriptions.next_billing` (object, optional)
        Describes the upcoming charge for this subscription.

        - `payment_method_options.klarna.subscriptions.next_billing.amount` (integer, required)
          The amount of the next charge for the subscription.

        - `payment_method_options.klarna.subscriptions.next_billing.date` (string, required)
          The date of the next charge for the subscription in YYYY-MM-DD format.

  - `payment_method_options.konbini` (object, optional)
    If this is a `konbini` PaymentMethod, this sub-hash contains details about the Konbini payment method options.

    - `payment_method_options.konbini.confirmation_number` (string, optional)
      An optional 10 to 11 digit numeric-only string determining the confirmation code at applicable convenience stores. Must not consist of only zeroes and could be rejected in case of insufficient uniqueness. We recommend to use the customer’s phone number.

      The maximum length is 11 characters.

    - `payment_method_options.konbini.expires_after_days` (integer, optional)
      The number of calendar days (between 1 and 60) after which Konbini payment instructions will expire. For example, if a PaymentIntent is confirmed with Konbini and `expires_after_days` set to 2 on Monday JST, the instructions will expire on Wednesday 23:59:59 JST. Defaults to 3 days.

    - `payment_method_options.konbini.expires_at` (timestamp, optional)
      The timestamp at which the Konbini payment instructions will expire. Only one of `expires_after_days` or `expires_at` may be set.

    - `payment_method_options.konbini.product_description` (string, optional)
      A product descriptor of up to 22 characters, which will appear to customers at the convenience store.

      The maximum length is 22 characters.

    - `payment_method_options.konbini.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.kr_card` (object, optional)
    If this is a `kr_card` PaymentMethod, this sub-hash contains details about the KR Card payment method options.

    - `payment_method_options.kr_card.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.kr_card.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.link` (object, optional)
    If this is a `link` PaymentMethod, this sub-hash contains details about the Link payment method options (Link is also known as Onelink in the UK).

    - `payment_method_options.link.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.link.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.mb_way` (object, optional)
    If this is a `mb_way` PaymentMethod, this sub-hash contains details about the MB WAY payment method options.

    - `payment_method_options.mb_way.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.mobilepay` (object, optional)
    If this is a `MobilePay` PaymentMethod, this sub-hash contains details about the MobilePay payment method options.

    - `payment_method_options.mobilepay.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.mobilepay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.multibanco` (object, optional)
    If this is a `multibanco` PaymentMethod, this sub-hash contains details about the Multibanco payment method options.

    - `payment_method_options.multibanco.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.naver_pay` (object, optional)
    If this is a `naver_pay` PaymentMethod, this sub-hash contains details about the Naver Pay payment method options.

    - `payment_method_options.naver_pay.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.naver_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.nz_bank_account` (object, optional)
    If this is a `nz_bank_account` PaymentMethod, this sub-hash contains details about the NZ BECS Direct Debit payment method options.

    - `payment_method_options.nz_bank_account.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.nz_bank_account.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.oxxo` (object, optional)
    If this is a `oxxo` PaymentMethod, this sub-hash contains details about the OXXO payment method options.

    - `payment_method_options.oxxo.expires_after_days` (integer, optional)
      The number of calendar days before an OXXO voucher expires. For example, if you create an OXXO voucher on Monday and you set expires_after_days to 2, the OXXO invoice will expire on Wednesday at 23:59 America/Mexico_City time.

    - `payment_method_options.oxxo.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.p24` (object, optional)
    If this is a `p24` PaymentMethod, this sub-hash contains details about the Przelewy24 payment method options.

    - `payment_method_options.p24.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

    - `payment_method_options.p24.tos_shown_and_accepted` (boolean, optional)
      Confirm that the payer has accepted the P24 terms and conditions.

  - `payment_method_options.pay_by_bank` (object, optional)
    If this is a `pay_by_bank` PaymentMethod, this sub-hash contains details about the PayByBank payment method options.

  - `payment_method_options.payco` (object, optional)
    If this is a `payco` PaymentMethod, this sub-hash contains details about the PAYCO payment method options.

    - `payment_method_options.payco.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.paynow` (object, optional)
    If this is a `paynow` PaymentMethod, this sub-hash contains details about the PayNow payment method options.

    - `payment_method_options.paynow.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.paypal` (object, optional)
    If this is a `paypal` PaymentMethod, this sub-hash contains details about the PayPal payment method options.

    - `payment_method_options.paypal.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.paypal.preferred_locale` (enum, optional)
      [Preferred locale](https://docs.stripe.com/docs/payments/paypal/supported-locales.md) of the PayPal checkout page that the customer is redirected to.
Possible enum values:
      - `cs-CZ`
        Czech - The Czech Republic

      - `da-DK`
        Danish - Denmark

      - `de-AT`
        German - Austria

      - `de-DE`
        German - Germany

      - `de-LU`
        German - Luxembourg

      - `el-GR`
        Greek - Greece

      - `en-GB`
        English - United Kingdom

      - `en-US`
        English - United States of America

      - `es-ES`
        Spanish - Spain

      - `fi-FI`
        Finnish - Finland

      - `fr-BE`
        French - Belgium

      - `fr-FR`
        French - France

      - `fr-LU`
        French - Luxembourg

      - `hu-HU`
        Hungarian - Hungary

      - `it-IT`
        Italian - Italy

      - `nl-BE`
        Dutch - Belgium

      - `nl-NL`
        Dutch - Netherlands

      - `pl-PL`
        Polish - Poland

      - `pt-PT`
        Portuguese - Portugal

      - `sk-SK`
        Slovak - Slovakia

      - `sv-SE`
        Swedish - Sweden

    - `payment_method_options.paypal.reference` (string, optional)
      A reference of the PayPal transaction visible to customer which is mapped to PayPal’s invoice ID. This must be a globally unique ID if you have configured in your PayPal settings to block multiple payments per invoice ID.

      The maximum length is 127 characters.

    - `payment_method_options.paypal.risk_correlation_id` (string, optional)
      The risk correlation ID for an on-session payment using a saved PayPal payment method.

      The maximum length is 32 characters.

    - `payment_method_options.paypal.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.paypay` (object, optional)
    If this is a `paypay` PaymentMethod, this sub-hash contains details about the PayPay payment method options.

    - `payment_method_options.paypay.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.payto` (object, optional)
    If this is a `payto` PaymentMethod, this sub-hash contains details about the PayTo payment method options.

    - `payment_method_options.payto.mandate_options` (object, optional)
      Additional fields for Mandate creation. Only `purpose` field is configurable for PayTo PaymentIntent with `setup_future_usage=none`. Other fields are only applicable to PayTo PaymentIntent with `setup_future_usage=off_session`

      - `payment_method_options.payto.mandate_options.amount` (integer, optional)
        Amount that will be collected. It is required when `amount_type` is `fixed`.

      - `payment_method_options.payto.mandate_options.amount_type` (enum, optional)
        The type of amount that will be collected. The amount charged must be exact or up to the value of `amount` param for `fixed` or `maximum` type respectively. Defaults to `maximum`.
Possible enum values:
        - `fixed`
          The amount is the exact amount that will be charged.

        - `maximum`
          The amount is the maximum amount that can be charged.

      - `payment_method_options.payto.mandate_options.end_date` (string, optional)
        Date, in YYYY-MM-DD format, after which payments will not be collected. Defaults to no end date.

      - `payment_method_options.payto.mandate_options.payment_schedule` (enum, optional)
        The periodicity at which payments will be collected. Defaults to `adhoc`.
Possible enum values:
        - `adhoc`
          Payments will be made ad hoc

        - `annual`
          Payments will be made annually

        - `daily`
          Payments will be made daily

        - `fortnightly`
          Payments will be made fortnightly

        - `monthly`
          Payments will be made monthly

        - `quarterly`
          Payments will be made quarterly

        - `semi_annual`
          Payments will be made semi-annually

        - `weekly`
          Payments will be made weekly

      - `payment_method_options.payto.mandate_options.payments_per_period` (integer, optional)
        The number of payments that will be made during a payment period. Defaults to 1 except for when `payment_schedule` is `adhoc`. In that case, it defaults to no limit.

      - `payment_method_options.payto.mandate_options.purpose` (enum, optional)
        The purpose for which payments are made. Has a default value based on your merchant category code.
Possible enum values:
        - `dependant_support`
          Transactions are made for dependant support reasons

        - `government`
          Transactions are made for government reasons

        - `loan`
          Transactions are made for loan reasons

        - `mortgage`
          Transactions are made for mortgage reasons

        - `other`
          Transactions are made for other reasons

        - `pension`
          Transactions are made for pension reasons

        - `personal`
          Transactions are made for personal reasons

        - `retail`
          Transactions are made for retail reasons

        - `salary`
          Transactions are made for salary reasons

        - `tax`
          Transactions are made for tax reasons

        - `utility`
          Transactions are made for utility reasons

    - `payment_method_options.payto.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.pix` (object, optional)
    If this is a `pix` PaymentMethod, this sub-hash contains details about the Pix payment method options.

    - `payment_method_options.pix.amount_includes_iof` (enum, optional)
      Determines if the amount includes the IOF tax. Defaults to `never`.
Possible enum values:
      - `always`
        The IOF tax is included in the amount.

      - `never`
        The IOF tax is not included in the amount.

    - `payment_method_options.pix.expires_after_seconds` (integer, optional)
      The number of seconds (between 10 and 1209600) after which Pix payment will expire. Defaults to 86400 seconds.

    - `payment_method_options.pix.expires_at` (timestamp, optional)
      The timestamp at which the Pix expires (between 10 and 1209600 seconds in the future). Defaults to 1 day in the future.

    - `payment_method_options.pix.mandate_options` (object, optional)
      Additional fields for mandate creation. Only applicable when `setup_future_usage=off_session`.

      - `payment_method_options.pix.mandate_options.amount` (integer, optional)
        Amount to be charged for future payments. Required when `amount_type=fixed`. If not provided for `amount_type=maximum`, defaults to 40000.

      - `payment_method_options.pix.mandate_options.amount_includes_iof` (enum, optional)
        Determines if the amount includes the IOF tax. Defaults to `never`.
Possible enum values:
        - `always`
          The IOF tax is included in the amount.

        - `never`
          The IOF tax is not included in the amount.

      - `payment_method_options.pix.mandate_options.amount_type` (enum, optional)
        Type of amount. Defaults to `maximum`.
Possible enum values:
        - `fixed`
          The exact amount for future payments.

        - `maximum`
          The maximum amount for future payments.

      - `payment_method_options.pix.mandate_options.currency` (enum, optional)
        Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Only `brl` is supported currently.

      - `payment_method_options.pix.mandate_options.end_date` (string, optional)
        Date when the mandate expires and no further payments will be charged, in `YYYY-MM-DD`. If not provided, the mandate will be active until canceled. If provided, end date should be after start date.

      - `payment_method_options.pix.mandate_options.payment_schedule` (enum, optional)
        Schedule at which the future payments will be charged. Defaults to `monthly`.
Possible enum values:
        - `halfyearly`
          The future payments will be charged half-yearly.

        - `monthly`
          The future payments will be charged monthly.

        - `quarterly`
          The future payments will be charged quarterly.

        - `weekly`
          The future payments will be charged weekly.

        - `yearly`
          The future payments will be charged yearly.

      - `payment_method_options.pix.mandate_options.reference` (string, optional)
        Subscription name displayed to buyers in their bank app. Defaults to the displayable business name.

        The maximum length is 35 characters.

      - `payment_method_options.pix.mandate_options.start_date` (string, optional)
        Start date of the mandate, in `YYYY-MM-DD`. Start date should be at least 3 days in the future. Defaults to 3 days after the current date.

    - `payment_method_options.pix.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.promptpay` (object, optional)
    If this is a `promptpay` PaymentMethod, this sub-hash contains details about the PromptPay payment method options.

    - `payment_method_options.promptpay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.revolut_pay` (object, optional)
    If this is a `revolut_pay` PaymentMethod, this sub-hash contains details about the Revolut Pay payment method options.

    - `payment_method_options.revolut_pay.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.revolut_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.samsung_pay` (object, optional)
    If this is a `samsung_pay` PaymentMethod, this sub-hash contains details about the Samsung Pay payment method options.

    - `payment_method_options.samsung_pay.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.satispay` (object, optional)
    If this is a `satispay` PaymentMethod, this sub-hash contains details about the Satispay payment method options.

    - `payment_method_options.satispay.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.satispay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

  - `payment_method_options.scalapay` (object, optional)
    If this is a `scalapay` PaymentMethod, this sub-hash contains details about the ScalaPay payment method options.

    - `payment_method_options.scalapay.capture_method` (enum, optional)
      Controls when the funds are captured from the customer’s account.

      If provided, this parameter overrides the behavior of the top-level [capture_method](https://docs.stripe.com/api/payment_intents/update.md#update_payment_intent-capture_method) for this payment method type when finalizing the payment with this payment method type.

      If `capture_method` is already set on the PaymentIntent, providing an empty value for this parameter unsets the stored value for this payment method type.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.sepa_debit` (object, optional)
    If this is a `sepa_debit` PaymentIntent, this sub-hash contains details about the SEPA Debit payment method options.

    - `payment_method_options.sepa_debit.mandate_options` (object, optional)
      Additional fields for Mandate creation

      - `payment_method_options.sepa_debit.mandate_options.reference_prefix` (string, optional)
        Prefix used to generate the Mandate reference. Must be at most 12 characters long. Must consist of only uppercase letters, numbers, spaces, or the following special characters: ‘/’, ‘_’, ‘-’, ‘&’, ‘.’. Cannot begin with ‘STRIPE’.

        The maximum length is 12 characters.

    - `payment_method_options.sepa_debit.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.sepa_debit.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.sofort` (object, optional)
    If this is a `sofort` PaymentMethod, this sub-hash contains details about the SOFORT payment method options.

    - `payment_method_options.sofort.preferred_language` (enum, optional)
      Language shown to the payer on redirect.
Possible enum values:
      - `de`
        German

      - `en`
        English

      - `es`
        Spanish

      - `fr`
        French

      - `it`
        Italian

      - `nl`
        Dutch

      - `pl`
        Polish

    - `payment_method_options.sofort.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.swish` (object, optional)
    If this is a `Swish` PaymentMethod, this sub-hash contains details about the Swish payment method options.

    - `payment_method_options.swish.reference` (string, optional)
      A reference for this payment to be displayed in the Swish app.

    - `payment_method_options.swish.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.twint` (object, optional)
    If this is a `twint` PaymentMethod, this sub-hash contains details about the TWINT payment method options.

    - `payment_method_options.twint.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.upi` (object, optional)
    If this is a `upi` PaymentIntent, this sub-hash contains details about the UPI payment method options.

    - `payment_method_options.upi.mandate_options` (object, optional)
      Configuration options for setting up an eMandate

      - `payment_method_options.upi.mandate_options.amount` (integer, optional)
        Amount to be charged for future payments.

      - `payment_method_options.upi.mandate_options.amount_type` (enum, optional)
        One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.
Possible enum values:
        - `fixed`
          If `fixed`, the `amount` param refers to the exact amount to be charged in future payments.

        - `maximum`
          If `maximum`, the amount charged can be up to the value passed for the `amount` param.

      - `payment_method_options.upi.mandate_options.description` (string, optional)
        A description of the mandate or subscription that is meant to be displayed to the customer.

        The maximum length is 20 characters.

      - `payment_method_options.upi.mandate_options.end_date` (timestamp, optional)
        End date of the mandate or subscription.

  - `payment_method_options.us_bank_account` (object, optional)
    If this is a `us_bank_account` PaymentMethod, this sub-hash contains details about the US bank account payment method options.

    - `payment_method_options.us_bank_account.financial_connections` (object, optional)
      Additional fields for Financial Connections Session creation

      - `payment_method_options.us_bank_account.financial_connections.filters` (object, optional)
        Provide filters for the linked accounts that the customer can select for the payment method.

        - `payment_method_options.us_bank_account.financial_connections.filters.account_subcategories` (array of strings, optional)
          The account subcategories to use to filter for selectable accounts. Valid subcategories are `checking` and `savings`.

      - `payment_method_options.us_bank_account.financial_connections.permissions` (array of strings, optional)
        The list of permissions to request. If this parameter is passed, the `payment_method` permission must be included. Valid permissions include: `balances`, `ownership`, `payment_method`, and `transactions`.

      - `payment_method_options.us_bank_account.financial_connections.prefetch` (array of enums, optional)
        List of data features that you would like to retrieve upon account creation.
Possible enum values:
        - `balances`
          Requests to prefetch balance data on accounts collected in this session.

        - `ownership`
          Requests to prefetch ownership data on accounts collected in this session.

        - `transactions`
          Requests to prefetch transaction data on accounts collected in this session.

      - `payment_method_options.us_bank_account.financial_connections.return_url` (string, optional)
        For webview integrations only. Upon completing OAuth login in the native browser, the user will be redirected to this URL to return to your app.

    - `payment_method_options.us_bank_account.mandate_options` (object, optional)
      Additional fields for Mandate creation

      - `payment_method_options.us_bank_account.mandate_options.collection_method` (enum, optional)
        The method used to collect offline mandate customer acceptance.
Possible enum values:
        - `paper`
          Mandate customer acceptance was collected using a paper document

    - `payment_method_options.us_bank_account.networks` (object, optional)
      Additional fields for network related functions

      - `payment_method_options.us_bank_account.networks.requested` (array of enums, optional)
        Triggers validations to run across the selected networks
Possible enum values:
        - `ach`
        - `us_domestic_wire`

    - `payment_method_options.us_bank_account.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.us_bank_account.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

    - `payment_method_options.us_bank_account.transaction_purpose` (enum, optional)
      The purpose of the transaction.
Possible enum values:
      - `goods`
        For purchases of physical or digital goods, both recurring and one-off.

      - `other`
        For anything other than the purchase of goods or services, like donations, loan repayments, and so on.

      - `services`
        For purchases of services, like streaming services, web hosting, and so on.

      - `unspecified`
        This is the default value for payment methods when transaction_purpose is not set.

    - `payment_method_options.us_bank_account.verification_method` (enum, optional)
      Bank account verification method. The default value is `automatic`.
Possible enum values:
      - `automatic`
        Instant verification with fallback to microdeposits.

      - `instant`
        Instant verification only.

      - `microdeposits`
        Verification using microdeposits. Cannot be used with Stripe Checkout, Hosted Invoices, or Payment Element.

  - `payment_method_options.wechat_pay` (object, optional)
    If this is a `wechat_pay` PaymentMethod, this sub-hash contains details about the WeChat Pay payment method options.

    - `payment_method_options.wechat_pay.app_id` (string, optional)
      The app ID registered with WeChat Pay. Only required when client is ios or android.

    - `payment_method_options.wechat_pay.client` (enum, optional)
      The client type that the end customer will pay from
Possible enum values:
      - `android`
        The end customer will pay from an Android app

      - `ios`
        The end customer will pay from an iOS app

      - `web`
        The end customer will pay from web browser

    - `payment_method_options.wechat_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.zip` (object, optional)
    If this is a `zip` PaymentMethod, this sub-hash contains details about the Zip payment method options.

    - `payment_method_options.zip.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

- `payment_method_types` (array of strings, optional)
  The list of payment method types (for example, a card) that this PaymentIntent can use. If you don’t provide this, Stripe will dynamically show relevant payment methods from your [payment method settings](https://dashboard.stripe.com/settings/payment_methods). A list of valid payment method types can be found [here](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-type).

- `radar_options` (object, optional)
  Options to configure Radar. Learn more about [Radar Sessions](https://docs.stripe.com/docs/radar/radar-session.md).

  - `radar_options.session` (string, optional)
    A [Radar Session](https://docs.stripe.com/docs/radar/radar-session.md) is a snapshot of the browser metadata and device details that help Radar make more accurate predictions on your payments.

- `receipt_email` (string, optional)
  Email address to send the receipt to. If you specify `receipt_email` for a payment in live mode, you send a receipt regardless of your [email settings](https://dashboard.stripe.com/account/emails).

- `return_url` (string, optional)
  The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method’s app or site. If you’d prefer to redirect to a mobile application, you can alternatively supply an application URI scheme. This parameter can only be used with [`confirm=true`](https://docs.stripe.com/docs/api/payment_intents/create.md#create_payment_intent-confirm).

- `setup_future_usage` (enum, optional)
  Indicates that you intend to make future payments with this PaymentIntent’s payment method.

  If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

  If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

  When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
  - `off_session`
    Use `off_session` if your customer may or may not be present in your checkout flow.

  - `on_session`
    Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

- `shipping` (object, optional)
  Shipping information for this PaymentIntent.

  - `shipping.address` (object, required)
    Shipping address.

    - `shipping.address.city` (string, optional)
      City, district, suburb, town, or village.

    - `shipping.address.country` (string, required for calculating taxes)
      Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

    - `shipping.address.line1` (string, optional)
      Address line 1, such as the street, PO Box, or company name.

    - `shipping.address.line2` (string, optional)
      Address line 2, such as the apartment, suite, unit, or building.

    - `shipping.address.postal_code` (string, required for calculating taxes)
      ZIP or postal code.

    - `shipping.address.state` (string, optional)
      State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

  - `shipping.name` (string, required)
    Recipient name.

  - `shipping.carrier` (string, optional)
    The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.

  - `shipping.phone` (string, optional)
    Recipient phone (including extension).

  - `shipping.tracking_number` (string, optional)
    The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.

- `statement_descriptor` (string, optional)
  Text that appears on the customer’s statement as the statement descriptor for a non-card charge. This value overrides the account’s default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors.md).

  Setting this value for a card charge returns an error. For card charges, set the [statement_descriptor_suffix](https://docs.stripe.com/get-started/account/statement-descriptors.md#dynamic) instead.

- `statement_descriptor_suffix` (string, optional)
  Provides information about a card charge. Concatenated to the account’s [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors.md#static) to form the complete statement descriptor that appears on the customer’s statement.

- `transfer_data` (object, optional)
  The parameters that you can use to automatically create a Transfer. Learn more about the [use case for connected accounts](https://docs.stripe.com/docs/payments/connected-accounts.md).

  - `transfer_data.destination` (string, required)
    If specified, successful charges will be attributed to the destination account for tax reporting, and the funds from charges will be transferred to the destination account. The ID of the resulting transfer will be returned on the successful charge’s `transfer` field.

  - `transfer_data.amount` (integer, optional)
    The amount that will be transferred automatically when a charge succeeds. The amount is capped at the total transaction amount and if no amount is set, the full amount is transferred.

    If you intend to collect a fee and you need a more robust reporting experience, using [application_fee_amount](https://docs.stripe.com/docs/api/payment_intents/create.md#create_payment_intent-application_fee_amount) might be a better fit for your integration.

  - `transfer_data.description` (string, optional)
    An arbitrary string attached to the transfer. Often useful for displaying to users.

  - `transfer_data.metadata` (object, optional)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

  - `transfer_data.payment_data` (object, optional)
    The data with which to populate the destination payment.

    - `transfer_data.payment_data.description` (string, optional)
      An arbitrary string attached to the destination payment. Often useful for displaying to users.

    - `transfer_data.payment_data.metadata` (object, optional)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

- `transfer_group` (string, optional)
  A string that identifies the resulting payment as part of a group. Learn more about the [use case for connected accounts](https://docs.stripe.com/docs/connect/separate-charges-and-transfers.md).

- `use_stripe_sdk` (boolean, optional)
  Set to `true` when confirming server-side and using Stripe.js, iOS, or Android client-side SDKs to handle the next actions.
