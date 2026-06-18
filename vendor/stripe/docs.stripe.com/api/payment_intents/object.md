# The PaymentIntent object

### The PaymentIntent object

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

## Attributes

- `id` (string)
  Unique identifier for the object.

- `object` (string)
  String representing the object’s type. Objects of the same type share the same value.

- `amount` (integer)
  Amount intended to be collected by this PaymentIntent. A positive integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://docs.stripe.com/docs/currencies.md#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).

- `amount_capturable` (integer)
  Amount that can be captured from this PaymentIntent.

- `amount_details` (object, nullable)
  Provides industry-specific information about the amount.

  - `amount_details.discount_amount` (integer, nullable)
    The total discount applied on the transaction represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). An integer greater than 0.

    This field is mutually exclusive with the `amount_details[line_items][#][discount_amount]` field.

  - `amount_details.error` (object, nullable)
    Contains information about the error that occurred when validating the current amount details.

    This field populates when the amount details has a validation error that wasn’t enforced because the [enforce_arithmetic_validation](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-amount_details-enforce_arithmetic_validation) parameter was set to `false`.

    - `amount_details.error.code` (enum, nullable)
      The code of the error that occurred when validating the current amount details.
Possible enum values:
      - `amount_details_amount_mismatch`
        The sum of the line items does not match the amount on the PaymentIntent.

      - `amount_details_tax_shipping_discount_greater_than_amount`
        The sum of tax + shipping - discount is greater than the amount on the PaymentIntent.

    - `amount_details.error.message` (string, nullable)
      A message providing more details about the error.

  - `amount_details.line_items` (object, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    A list of line items, each containing information about a product in the PaymentIntent. There is a maximum of 200 line items.

    - `amount_details.line_items.object` (string)
      String representing the object’s type. Objects of the same type share the same value. Always has the value `list`.

    - `amount_details.line_items.data` (array of objects)
      Details about each object.

      - `amount_details.line_items.data.id` (string)
        Unique identifier for the object.

      - `amount_details.line_items.data.object` (string)
        String representing the object’s type. Objects of the same type share the same value.

      - `amount_details.line_items.data.discount_amount` (integer, nullable)
        The discount applied on this line item represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). An integer greater than 0.

        This field is mutually exclusive with the `amount_details[discount_amount]` field.

      - `amount_details.line_items.data.payment_method_options` (object, nullable)
        Payment method-specific information for line items.

        - `amount_details.line_items.data.payment_method_options.card` (object, nullable)
          This sub-hash contains line item details that are specific to the `card` payment method.

        - `amount_details.line_items.data.payment_method_options.card_present` (object, nullable)
          This sub-hash contains line item details that are specific to the `card_present` payment method.

        - `amount_details.line_items.data.payment_method_options.klarna` (object, nullable)
          This sub-hash contains line item details that are specific to the `klarna` payment method.

        - `amount_details.line_items.data.payment_method_options.paypal` (object, nullable)
          This sub-hash contains line item details that are specific to the `paypal` payment method.

          - `amount_details.line_items.data.payment_method_options.paypal.category` (enum, nullable)
            Type of the line item.
Possible enum values:
            - `digital_goods`
              Goods that are stored, delivered, and used in their electronic format.

            - `donation`
              A contribution or gift for which no good or service is exchanged, usually to a not for profit organization.

            - `physical_goods`
              A tangible item that can be shipped with proof of delivery.

          - `amount_details.line_items.data.payment_method_options.paypal.description` (string, nullable)
            Description of the line item.

          - `amount_details.line_items.data.payment_method_options.paypal.sold_by` (string, nullable)
            The Stripe account ID of the connected account that sells the item. This is only needed when using [Separate Charges and Transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md).

      - `amount_details.line_items.data.product_code` (string, nullable)
        The product code of the line item, such as an SKU. Required for L3 rates. At most 12 characters long.

      - `amount_details.line_items.data.product_name` (string)
        The product name of the line item. Required for L3 rates. At most 1024 characters long.

        For Cards, this field is truncated to 26 alphanumeric characters before being sent to the card networks. For PayPal, this field is truncated to 127 characters.

      - `amount_details.line_items.data.quantity` (integer)
        The quantity of items. Required for L3 rates. An integer greater than 0.

      - `amount_details.line_items.data.tax` (object, nullable)
        Contains information about the tax on the item.

        - `amount_details.line_items.data.tax.total_tax_amount` (integer)
          The total amount of tax on the transaction represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). Required for L2 rates. An integer greater than or equal to 0.

          This field is mutually exclusive with the `amount_details[line_items][#][tax][total_tax_amount]` field.

      - `amount_details.line_items.data.unit_cost` (integer)
        The unit cost of the line item represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). Required for L3 rates. An integer greater than or equal to 0.

      - `amount_details.line_items.data.unit_of_measure` (string, nullable)
        A unit of measure for the line item, such as gallons, feet, meters, etc. Required for L3 rates. At most 12 alphanumeric characters long.

    - `amount_details.line_items.has_more` (boolean)
      True if this list has another page of items after this one that can be fetched.

    - `amount_details.line_items.url` (string)
      The URL where this list can be accessed.

  - `amount_details.shipping` (object, nullable)
    Contains information about the shipping portion of the amount.

    - `amount_details.shipping.amount` (integer, nullable)
      If a physical good is being shipped, the cost of shipping represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). An integer greater than or equal to 0.

    - `amount_details.shipping.from_postal_code` (string, nullable)
      If a physical good is being shipped, the postal code of where it is being shipped from. At most 10 alphanumeric characters long, hyphens and spaces are allowed.

    - `amount_details.shipping.to_postal_code` (string, nullable)
      If a physical good is being shipped, the postal code of where it is being shipped to. At most 10 alphanumeric characters long, hyphens and spaces are allowed.

  - `amount_details.tax` (object, nullable)
    Contains information about the tax portion of the amount.

    - `amount_details.tax.total_tax_amount` (integer, nullable)
      The total amount of tax on the transaction represented in the [smallest currency unit](https://docs.stripe.com/docs/currencies.md#zero-decimal). Required for L2 rates. An integer greater than or equal to 0.

      This field is mutually exclusive with the `amount_details[line_items][#][tax][total_tax_amount]` field.

  - `amount_details.tip` (object, nullable)
    Portion of the amount that corresponds to a tip.

    - `amount_details.tip.amount` (integer, nullable)
      Portion of the amount that corresponds to a tip.

- `amount_received` (integer)
  Amount that this PaymentIntent collects.

- `application` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the Connect application that created the PaymentIntent.

- `application_fee_amount` (integer, nullable)
  The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner’s Stripe account. The amount of the application fee collected will be capped at the total amount captured. For more information, see the PaymentIntents [use case for connected accounts](https://docs.stripe.com/docs/payments/connected-accounts.md).

- `automatic_payment_methods` (object, nullable)
  Settings to configure compatible payment methods from the [Stripe Dashboard](https://dashboard.stripe.com/settings/payment_methods)

  - `automatic_payment_methods.allow_redirects` (enum, nullable)
    Controls whether this PaymentIntent will accept redirect-based payment methods.

    Redirect-based payment methods may require your customer to be redirected to a payment method’s app or site for authentication or additional steps. To [confirm](https://docs.stripe.com/docs/api/payment_intents/confirm.md) this PaymentIntent, you may be required to provide a `return_url` to redirect customers back to your site after they authenticate or complete the payment.
Possible enum values:
    - `always`
      (Default) This PaymentIntent will accept redirect-based payment methods. `return_url` may be required to       [confirm](https://docs.stripe.com/docs/api/payment_intents/confirm.md) this PaymentIntent.

    - `never`
      This PaymentIntent will not accept redirect-based payment methods. Payment methods that require redirect will       be filtered. `return_url` will not be required to [confirm](https://docs.stripe.com/docs/api/payment_intents/confirm.md) this       PaymentIntent.

  - `automatic_payment_methods.enabled` (boolean)
    Automatically calculates compatible payment methods

- `canceled_at` (timestamp, nullable)
  Populated when `status` is `canceled`, this is the time at which the PaymentIntent was canceled. Measured in seconds since the Unix epoch.

- `cancellation_reason` (enum, nullable)
  Reason for cancellation of this PaymentIntent, either user-provided (`duplicate`, `fraudulent`, `requested_by_customer`, or `abandoned`) or generated by Stripe internally (`failed_invoice`, `void_invoice`, `automatic`, or `expired`).
Possible enum values:
  - `abandoned`
  - `automatic`
  - `duplicate`
  - `expired`
  - `failed_invoice`
  - `fraudulent`
  - `requested_by_customer`
  - `void_invoice`

- `capture_method` (enum)
  Controls when the funds will be captured from the customer’s account.
Possible enum values:
  - `automatic`
    Stripe automatically captures funds when the customer authorizes the payment.

  - `automatic_async`
    (Default) Stripe asynchronously captures funds when the customer authorizes the payment. Recommended over `capture_method=automatic` due to improved latency. Read the [integration guide](https://docs.stripe.com/docs/payments/payment-intents/asynchronous-capture.md) for more information.

  - `manual`
    Place a hold on the funds when the customer authorizes the payment, but [don’t capture the funds until later](https://docs.stripe.com/docs/payments/capture-later.md). (Not all payment methods support this.)

- `client_secret` (string, nullable)
  The client secret of this PaymentIntent. Used for client-side retrieval using a publishable key.

  The client secret can be used to complete a payment from your frontend. It should not be stored, logged, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.

  Refer to our docs to [accept a payment](https://docs.stripe.com/docs/payments/accept-a-payment.md?ui=elements) and learn about how `client_secret` should be handled.

- `confirmation_method` (enum)
  Describes whether we can confirm this PaymentIntent automatically, or if it requires customer action to confirm the payment.
Possible enum values:
  - `automatic`
    (Default) PaymentIntent can be confirmed using a publishable key. After `next_action`s are handled, no additional confirmation is required to complete the payment.

  - `manual`
    All payment attempts must be made using a secret key. The PaymentIntent returns to the `requires_confirmation` state after handling `next_action`s, and requires your server to initiate each payment attempt with an explicit confirmation.

- `created` (timestamp)
  Time at which the object was created. Measured in seconds since the Unix epoch.

- `currency` (enum)
  Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

- `customer` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the Customer this PaymentIntent belongs to, if one exists.

  Payment methods attached to other Customers cannot be used with this PaymentIntent.

  If [setup_future_usage](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-setup_future_usage) is set and this PaymentIntent’s payment method is not `card_present`, then the payment method attaches to the Customer after the PaymentIntent has been confirmed and any required actions from the user are complete. If the payment method is `card_present` and isn’t a digital wallet, then a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card is created and attached to the Customer instead.

- `customer_account` (string, nullable)
  ID of the Account representing the customer that this PaymentIntent belongs to, if one exists.

  Payment methods attached to other Accounts cannot be used with this PaymentIntent.

  If [setup_future_usage](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-setup_future_usage) is set and this PaymentIntent’s payment method is not `card_present`, then the payment method attaches to the Account after the PaymentIntent has been confirmed and any required actions from the user are complete. If the payment method is `card_present` and isn’t a digital wallet, then a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card is created and attached to the Account instead.

- `description` (string, nullable)
  An arbitrary string attached to the object. Often useful for displaying to users.

- `excluded_payment_method_types` (array of enums, nullable)
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

- `hooks` (object, nullable)
  Automations to be run during the PaymentIntent lifecycle

  - `hooks.inputs` (object, nullable)
    Arguments passed in automations

    - `hooks.inputs.tax` (object, nullable)
      Tax arguments

      - `hooks.inputs.tax.calculation` (string)
        The [TaxCalculation](https://docs.stripe.com/docs/api/tax/calculations.md) id

- `last_payment_error` (object, nullable)
  The payment error encountered in the previous PaymentIntent confirmation. It will be cleared if the PaymentIntent is later updated for any reason.

  - `last_payment_error.advice_code` (string, nullable)
    For card errors resulting from a card issuer decline, a short string indicating [how to proceed with an error](https://docs.stripe.com/docs/declines.md#retrying-issuer-declines) if they provide one.

  - `last_payment_error.charge` (string, nullable)
    For card errors, the ID of the failed charge.

  - `last_payment_error.code` (string, nullable)
    For some errors that could be handled programmatically, a short string indicating the [error code](https://docs.stripe.com/docs/error-codes.md) reported.

  - `last_payment_error.decline_code` (string, nullable)
    For card errors resulting from a card issuer decline, a short string indicating the [card issuer’s reason for the decline](https://docs.stripe.com/docs/declines.md#issuer-declines) if they provide one.

  - `last_payment_error.doc_url` (string, nullable)
    A URL to more information about the [error code](https://docs.stripe.com/docs/error-codes.md) reported.

  - `last_payment_error.message` (string, nullable)
    A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.

  - `last_payment_error.network_advice_code` (string, nullable)
    For card errors resulting from a card issuer decline, a 2 digit code which indicates the advice given to merchant by the card network on how to proceed with an error.

  - `last_payment_error.network_decline_code` (string, nullable)
    For payments declined by the network, an alphanumeric code which indicates the reason the payment failed.

  - `last_payment_error.param` (string, nullable)
    If the error is parameter-specific, the parameter related to the error. For example, you can use this to display a message near the correct form field.

  - `last_payment_error.payment_method` (object, nullable)
    The [PaymentMethod object](https://docs.stripe.com/docs/api/payment_methods/object.md) for errors returned on a request involving a PaymentMethod.

    - `last_payment_error.payment_method.id` (string)
      Unique identifier for the object.

    - `last_payment_error.payment_method.object` (string)
      String representing the object’s type. Objects of the same type share the same value.

    - `last_payment_error.payment_method.acss_debit` (object, nullable)
      If this is an `acss_debit` PaymentMethod, this hash contains details about the ACSS Debit payment method.

      - `last_payment_error.payment_method.acss_debit.bank_name` (string, nullable)
        Name of the bank associated with the bank account.

      - `last_payment_error.payment_method.acss_debit.fingerprint` (string, nullable)
        Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.

      - `last_payment_error.payment_method.acss_debit.institution_number` (string, nullable)
        Institution number of the bank account.

      - `last_payment_error.payment_method.acss_debit.last4` (string, nullable)
        Last four digits of the bank account number.

      - `last_payment_error.payment_method.acss_debit.transit_number` (string, nullable)
        Transit number of the bank account.

    - `last_payment_error.payment_method.affirm` (object, nullable)
      If this is an `affirm` PaymentMethod, this hash contains details about the Affirm payment method.

    - `last_payment_error.payment_method.afterpay_clearpay` (object, nullable)
      If this is an `AfterpayClearpay` PaymentMethod, this hash contains details about the AfterpayClearpay payment method.

    - `last_payment_error.payment_method.alipay` (object, nullable)
      If this is an `Alipay` PaymentMethod, this hash contains details about the Alipay payment method.

    - `last_payment_error.payment_method.allow_redisplay` (enum, nullable)
      This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow. The field defaults to “unspecified”.
Possible enum values:
      - `always`
        Use `always` to indicate that this payment method can always be shown to a customer in a checkout flow.

      - `limited`
        Use `limited` to indicate that this payment method can’t always be shown to a customer in a checkout flow. For example, it can only be shown in the context of a specific subscription.

      - `unspecified`
        This is the default value for payment methods where `allow_redisplay` wasn’t set.

    - `last_payment_error.payment_method.alma` (object, nullable)
      If this is a Alma PaymentMethod, this hash contains details about the Alma payment method.

    - `last_payment_error.payment_method.amazon_pay` (object, nullable)
      If this is a AmazonPay PaymentMethod, this hash contains details about the AmazonPay payment method.

    - `last_payment_error.payment_method.au_becs_debit` (object, nullable)
      If this is an `au_becs_debit` PaymentMethod, this hash contains details about the bank account.

      - `last_payment_error.payment_method.au_becs_debit.bsb_number` (string, nullable)
        Six-digit number identifying bank and branch associated with this bank account.

      - `last_payment_error.payment_method.au_becs_debit.fingerprint` (string, nullable)
        Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.

      - `last_payment_error.payment_method.au_becs_debit.last4` (string, nullable)
        Last four digits of the bank account number.

    - `last_payment_error.payment_method.bacs_debit` (object, nullable)
      If this is a `bacs_debit` PaymentMethod, this hash contains details about the Bacs Direct Debit bank account.

      - `last_payment_error.payment_method.bacs_debit.fingerprint` (string, nullable)
        Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.

      - `last_payment_error.payment_method.bacs_debit.last4` (string, nullable)
        Last four digits of the bank account number.

      - `last_payment_error.payment_method.bacs_debit.sort_code` (string, nullable)
        Sort code of the bank account. (e.g., `10-20-30`)

    - `last_payment_error.payment_method.bancontact` (object, nullable)
      If this is a `bancontact` PaymentMethod, this hash contains details about the Bancontact payment method.

    - `last_payment_error.payment_method.billie` (object, nullable)
      If this is a `billie` PaymentMethod, this hash contains details about the Billie payment method.

    - `last_payment_error.payment_method.billing_details` (object)
      Billing information associated with the PaymentMethod that may be used or required by particular types of payment methods.

      - `last_payment_error.payment_method.billing_details.address` (object, nullable)
        Billing address.

        - `last_payment_error.payment_method.billing_details.address.city` (string, nullable)
          City, district, suburb, town, or village.

        - `last_payment_error.payment_method.billing_details.address.country` (string, nullable)
          Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

        - `last_payment_error.payment_method.billing_details.address.line1` (string, nullable)
          Address line 1, such as the street, PO Box, or company name.

        - `last_payment_error.payment_method.billing_details.address.line2` (string, nullable)
          Address line 2, such as the apartment, suite, unit, or building.

        - `last_payment_error.payment_method.billing_details.address.postal_code` (string, nullable)
          ZIP or postal code.

        - `last_payment_error.payment_method.billing_details.address.state` (string, nullable)
          State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

      - `last_payment_error.payment_method.billing_details.email` (string, nullable)
        Email address.

      - `last_payment_error.payment_method.billing_details.name` (string, nullable)
        Full name.

      - `last_payment_error.payment_method.billing_details.phone` (string, nullable)
        Billing phone number (including extension).

      - `last_payment_error.payment_method.billing_details.tax_id` (string, nullable)
        Taxpayer identification number. Used only for transactions between LATAM buyers and non-LATAM sellers.

    - `last_payment_error.payment_method.bizum` (object, nullable)
      If this is a `bizum` PaymentMethod, this hash contains details about the Bizum payment method.

    - `last_payment_error.payment_method.blik` (object, nullable)
      If this is a `blik` PaymentMethod, this hash contains details about the BLIK payment method.

    - `last_payment_error.payment_method.boleto` (object, nullable)
      If this is a `boleto` PaymentMethod, this hash contains details about the Boleto payment method.

      - `last_payment_error.payment_method.boleto.tax_id` (string)
        Uniquely identifies the customer tax id (CNPJ or CPF)

    - `last_payment_error.payment_method.card` (object, nullable)
      If this is a `card` PaymentMethod, this hash contains the user’s card details.

      - `last_payment_error.payment_method.card.brand` (string)
        Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.

      - `last_payment_error.payment_method.card.checks` (object, nullable)
        Checks on Card address and CVC if provided.

        - `last_payment_error.payment_method.card.checks.address_line1_check` (string, nullable)
          If a address line1 was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`.

        - `last_payment_error.payment_method.card.checks.address_postal_code_check` (string, nullable)
          If a address postal code was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`.

        - `last_payment_error.payment_method.card.checks.cvc_check` (string, nullable)
          If a CVC was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`.

      - `last_payment_error.payment_method.card.country` (string, nullable)
        Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you’ve collected.

      - `last_payment_error.payment_method.card.display_brand` (string, nullable)
        The brand to use when displaying the card, this accounts for customer’s brand choice on dual-branded cards. Can be `american_express`, `cartes_bancaires`, `diners_club`, `discover`, `eftpos_australia`, `interac`, `jcb`, `mastercard`, `union_pay`, `visa`, or `other` and may contain more values in the future.

      - `last_payment_error.payment_method.card.exp_month` (integer)
        Two-digit number representing the card’s expiration month.

      - `last_payment_error.payment_method.card.exp_year` (integer)
        Four-digit number representing the card’s expiration year.

      - `last_payment_error.payment_method.card.fingerprint` (string, nullable)
        Uniquely identifies this particular card number. You can use this attribute to check whether two customers who’ve signed up with you are using the same card number, for example. For payment methods that tokenize card information (Apple Pay, Google Pay), the tokenized number might be provided instead of the underlying card number.

        *As of May 1, 2021, card fingerprint in India for Connect changed to allow two fingerprints for the same card—one for India and one for the rest of the world.*

      - `last_payment_error.payment_method.card.funding` (string)
        Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.

      - `last_payment_error.payment_method.card.generated_from` (object, nullable)
        Details of the original PaymentMethod that created this object.

        - `last_payment_error.payment_method.card.generated_from.charge` (string, nullable)
          The charge that created this object.

        - `last_payment_error.payment_method.card.generated_from.payment_method_details` (object, nullable)
          Transaction-specific details of the payment method used in the payment.

          - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present` (object, nullable)
            This hash contains the snapshot of the `card_present` transaction-specific details which generated this `card` payment method.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.amount_authorized` (integer, nullable)
              The authorized amount

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.brand` (string, nullable)
              Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.brand_product` (string, nullable)
              The [product code](https://stripe.com/docs/card-product-codes) that identifies the specific program or product associated with a card.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.capture_before` (timestamp, nullable)
              When using manual capture, a future timestamp after which the charge will be automatically refunded if uncaptured.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.cardholder_name` (string, nullable)
              The cardholder name as read from the card, in [ISO 7813](https://en.wikipedia.org/wiki/ISO/IEC_7813) format. May include alphanumeric characters, special characters and first/last name separator (`/`). In some cases, the cardholder name may not be available depending on how the issuer has configured the card. Cardholder name is typically not available on swipe or contactless payments, such as those made with Apple Pay and Google Pay.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.country` (string, nullable)
              Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you’ve collected.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.description` (string, nullable)
              A high-level description of the type of cards issued in this range.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.emv_auth_data` (string, nullable)
              Authorization response cryptogram.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.exp_month` (integer)
              Two-digit number representing the card’s expiration month.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.exp_year` (integer)
              Four-digit number representing the card’s expiration year.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.fingerprint` (string, nullable)
              Uniquely identifies this particular card number. You can use this attribute to check whether two customers who’ve signed up with you are using the same card number, for example. For payment methods that tokenize card information (Apple Pay, Google Pay), the tokenized number might be provided instead of the underlying card number.

              *As of May 1, 2021, card fingerprint in India for Connect changed to allow two fingerprints for the same card—one for India and one for the rest of the world.*

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.funding` (string, nullable)
              Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.generated_card` (string, nullable)
              ID of a card PaymentMethod generated from the card_present PaymentMethod that may be attached to a Customer for future transactions. Only present if it was possible to generate a card PaymentMethod.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.incremental_authorization_supported` (boolean)
              Whether this [PaymentIntent](https://docs.stripe.com/docs/api/payment_intents.md) is eligible for incremental authorizations. Request support using [request_incremental_authorization_support](https://docs.stripe.com/docs/api/payment_intents/create.md#create_payment_intent-payment_method_options-card_present-request_incremental_authorization_support).

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.issuer` (string, nullable)
              The name of the card’s issuing bank.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.last4` (string, nullable)
              The last four digits of the card.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.location` (string, nullable)
              ID of the [location](https://docs.stripe.com/docs/api/terminal/locations.md) that this transaction’s reader is assigned to.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.network` (string, nullable)
              Identifies which network this charge was processed on. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `interac`, `jcb`, `link`, `mastercard`, `unionpay`, `visa`, or `unknown`.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.network_transaction_id` (string, nullable)
              This is used by the financial networks to identify a transaction. Visa calls this the Transaction ID, Mastercard calls this the Trace ID, and American Express calls this the Acquirer Reference Data. This value will be present if it is returned by the financial network in the authorization response, and null otherwise.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.offline` (object, nullable)
              Details about payments collected offline.

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.offline.stored_at` (timestamp, nullable)
                Time at which the payment was collected while offline

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.offline.type` (enum, nullable)
                The method used to process this payment method offline. Only deferred is allowed.
Possible enum values:
                - `deferred`

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.overcapture_supported` (boolean)
              Defines whether the authorized amount can be over-captured or not

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.preferred_locales` (array of strings, nullable)
              The languages that the issuing bank recommends using for localizing any customer-facing text, as read from the card. Referenced from EMV tag 5F2D, data encoded on the card’s chip.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.read_method` (enum, nullable)
              How card details were read in this transaction.
Possible enum values:
              - `contact_emv`
                Inserting a chip card into the card reader.

              - `contactless_emv`
                Tapping a contactless-enabled chip card or mobile wallet.

              - `contactless_magstripe_mode`
                Older standard for contactless payments that emulated a magnetic stripe read.

              - `magnetic_stripe_fallback`
                When inserting a chip card fails three times in a row, fallback to a magnetic stripe read.

              - `magnetic_stripe_track2`
                Swiping a card using the magnetic stripe reader.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.reader` (string, nullable)
              ID of the [reader](https://docs.stripe.com/docs/api/terminal/readers.md) this transaction was made on.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.receipt` (object, nullable)
              A collection of fields required to be displayed on receipts. Only required for EMV transactions.

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.receipt.account_type` (enum, nullable)
                The type of account being debited or credited
Possible enum values:
                - `checking`
                  A checking account, as when using a debit card

                - `credit`
                  A credit account, as when using a credit card

                - `prepaid`
                  A prepaid account, as when using a debit gift card

                - `unknown`
                  An unknown account

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.receipt.application_cryptogram` (string, nullable)
                The Application Cryptogram, a unique value generated by the card to authenticate the transaction with issuers.

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.receipt.application_preferred_name` (string, nullable)
                The Application Identifier (AID) on the card used to determine which networks are eligible to process the transaction. Referenced from EMV tag 9F12, data encoded on the card’s chip.

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.receipt.authorization_code` (string, nullable)
                Identifier for this transaction.

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.receipt.authorization_response_code` (string, nullable)
                EMV tag 8A. A code returned by the card issuer.

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.receipt.cardholder_verification_method` (string, nullable)
                Describes the method used by the cardholder to verify ownership of the card. One of the following: `approval`, `failure`, `none`, `offline_pin`, `offline_pin_and_signature`, `online_pin`, or `signature`.

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.receipt.dedicated_file_name` (string, nullable)
                Similar to the application_preferred_name, identifying the applications (AIDs) available on the card. Referenced from EMV tag 84.

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.receipt.terminal_verification_results` (string, nullable)
                A 5-byte string that records the checks and validations that occur between the card and the terminal. These checks determine how the terminal processes the transaction and what risk tolerance is acceptable. Referenced from EMV Tag 95.

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.receipt.transaction_status_information` (string, nullable)
                An indication of which steps were completed during the card read process. Referenced from EMV Tag 9B.

            - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.wallet` (object, nullable)
              If a mobile wallet was presented in the transaction, this contains the details of the mobile wallet.

              - `last_payment_error.payment_method.card.generated_from.payment_method_details.card_present.wallet.type` (enum)
                The type of mobile wallet, one of `apple_pay`, `google_pay`, `samsung_pay`, or `unknown`.
Possible enum values:
                - `apple_pay`
                  Apple Pay is a mobile payment service by Apple.

                - `google_pay`
                  Google Pay is a mobile payment service by Google.

                - `samsung_pay`
                  Samsung Pay is a mobile payment service by Samsung Electronics.

                - `unknown`
                  The wallet provider is unknown.

          - `last_payment_error.payment_method.card.generated_from.payment_method_details.type` (string)
            The type of payment method transaction-specific details from the transaction that generated this `card` payment method. Always `card_present`.

        - `last_payment_error.payment_method.card.generated_from.setup_attempt` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
          The ID of the SetupAttempt that generated this PaymentMethod, if any.

      - `last_payment_error.payment_method.card.last4` (string)
        The last four digits of the card.

      - `last_payment_error.payment_method.card.networks` (object, nullable)
        Contains information about card networks that can be used to process the payment.

        - `last_payment_error.payment_method.card.networks.available` (array of strings)
          All networks available for selection via [payment_method_options.card.network](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-payment_method_options-card-network).

        - `last_payment_error.payment_method.card.networks.preferred` (string, nullable)
          The preferred network for co-branded cards. Can be `cartes_bancaires`, `mastercard`, `visa` or `invalid_preference` if requested network is not valid for the card.

      - `last_payment_error.payment_method.card.regulated_status` (enum, nullable)
        Status of a card based on the card issuer.
Possible enum values:
        - `regulated`
          The card falls under a regulated account range.

        - `unregulated`
          The card does not fall under a regulated account range.

      - `last_payment_error.payment_method.card.three_d_secure_usage` (object, nullable)
        Contains details on how this Card may be used for 3D Secure authentication.

        - `last_payment_error.payment_method.card.three_d_secure_usage.supported` (boolean)
          Whether 3D Secure is supported on this card.

      - `last_payment_error.payment_method.card.wallet` (object, nullable)
        If this Card is part of a card wallet, this contains the details of the card wallet.

        - `last_payment_error.payment_method.card.wallet.amex_express_checkout` (object, nullable)
          If this is a `amex_express_checkout` card wallet, this hash contains details about the wallet.

        - `last_payment_error.payment_method.card.wallet.apple_pay` (object, nullable)
          If this is a `apple_pay` card wallet, this hash contains details about the wallet.

        - `last_payment_error.payment_method.card.wallet.dynamic_last4` (string, nullable)
          (For tokenized numbers only.) The last four digits of the device account number.

        - `last_payment_error.payment_method.card.wallet.google_pay` (object, nullable)
          If this is a `google_pay` card wallet, this hash contains details about the wallet.

        - `last_payment_error.payment_method.card.wallet.link` (object, nullable)
          If this is a `link` card wallet, this hash contains details about the wallet.

        - `last_payment_error.payment_method.card.wallet.masterpass` (object, nullable)
          If this is a `masterpass` card wallet, this hash contains details about the wallet.

          - `last_payment_error.payment_method.card.wallet.masterpass.billing_address` (object, nullable)
            Owner’s verified billing address. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.

            - `last_payment_error.payment_method.card.wallet.masterpass.billing_address.city` (string, nullable)
              City, district, suburb, town, or village.

            - `last_payment_error.payment_method.card.wallet.masterpass.billing_address.country` (string, nullable)
              Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

            - `last_payment_error.payment_method.card.wallet.masterpass.billing_address.line1` (string, nullable)
              Address line 1, such as the street, PO Box, or company name.

            - `last_payment_error.payment_method.card.wallet.masterpass.billing_address.line2` (string, nullable)
              Address line 2, such as the apartment, suite, unit, or building.

            - `last_payment_error.payment_method.card.wallet.masterpass.billing_address.postal_code` (string, nullable)
              ZIP or postal code.

            - `last_payment_error.payment_method.card.wallet.masterpass.billing_address.state` (string, nullable)
              State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

          - `last_payment_error.payment_method.card.wallet.masterpass.email` (string, nullable)
            Owner’s verified email. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.

          - `last_payment_error.payment_method.card.wallet.masterpass.name` (string, nullable)
            Owner’s verified full name. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.

          - `last_payment_error.payment_method.card.wallet.masterpass.shipping_address` (object, nullable)
            Owner’s verified shipping address. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.

            - `last_payment_error.payment_method.card.wallet.masterpass.shipping_address.city` (string, nullable)
              City, district, suburb, town, or village.

            - `last_payment_error.payment_method.card.wallet.masterpass.shipping_address.country` (string, nullable)
              Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

            - `last_payment_error.payment_method.card.wallet.masterpass.shipping_address.line1` (string, nullable)
              Address line 1, such as the street, PO Box, or company name.

            - `last_payment_error.payment_method.card.wallet.masterpass.shipping_address.line2` (string, nullable)
              Address line 2, such as the apartment, suite, unit, or building.

            - `last_payment_error.payment_method.card.wallet.masterpass.shipping_address.postal_code` (string, nullable)
              ZIP or postal code.

            - `last_payment_error.payment_method.card.wallet.masterpass.shipping_address.state` (string, nullable)
              State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `last_payment_error.payment_method.card.wallet.samsung_pay` (object, nullable)
          If this is a `samsung_pay` card wallet, this hash contains details about the wallet.

        - `last_payment_error.payment_method.card.wallet.type` (enum)
          The type of the card wallet, one of `amex_express_checkout`, `apple_pay`, `google_pay`, `masterpass`, `samsung_pay`, `visa_checkout`, or `link`. An additional hash is included on the Wallet subhash with a name matching this value. It contains additional information specific to the card wallet type.
Possible enum values:
          - `amex_express_checkout`
          - `apple_pay`
          - `google_pay`
          - `link`
          - `masterpass`
          - `samsung_pay`
          - `visa_checkout`

        - `last_payment_error.payment_method.card.wallet.visa_checkout` (object, nullable)
          If this is a `visa_checkout` card wallet, this hash contains details about the wallet.

          - `last_payment_error.payment_method.card.wallet.visa_checkout.billing_address` (object, nullable)
            Owner’s verified billing address. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.

            - `last_payment_error.payment_method.card.wallet.visa_checkout.billing_address.city` (string, nullable)
              City, district, suburb, town, or village.

            - `last_payment_error.payment_method.card.wallet.visa_checkout.billing_address.country` (string, nullable)
              Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

            - `last_payment_error.payment_method.card.wallet.visa_checkout.billing_address.line1` (string, nullable)
              Address line 1, such as the street, PO Box, or company name.

            - `last_payment_error.payment_method.card.wallet.visa_checkout.billing_address.line2` (string, nullable)
              Address line 2, such as the apartment, suite, unit, or building.

            - `last_payment_error.payment_method.card.wallet.visa_checkout.billing_address.postal_code` (string, nullable)
              ZIP or postal code.

            - `last_payment_error.payment_method.card.wallet.visa_checkout.billing_address.state` (string, nullable)
              State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

          - `last_payment_error.payment_method.card.wallet.visa_checkout.email` (string, nullable)
            Owner’s verified email. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.

          - `last_payment_error.payment_method.card.wallet.visa_checkout.name` (string, nullable)
            Owner’s verified full name. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.

          - `last_payment_error.payment_method.card.wallet.visa_checkout.shipping_address` (object, nullable)
            Owner’s verified shipping address. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.

            - `last_payment_error.payment_method.card.wallet.visa_checkout.shipping_address.city` (string, nullable)
              City, district, suburb, town, or village.

            - `last_payment_error.payment_method.card.wallet.visa_checkout.shipping_address.country` (string, nullable)
              Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

            - `last_payment_error.payment_method.card.wallet.visa_checkout.shipping_address.line1` (string, nullable)
              Address line 1, such as the street, PO Box, or company name.

            - `last_payment_error.payment_method.card.wallet.visa_checkout.shipping_address.line2` (string, nullable)
              Address line 2, such as the apartment, suite, unit, or building.

            - `last_payment_error.payment_method.card.wallet.visa_checkout.shipping_address.postal_code` (string, nullable)
              ZIP or postal code.

            - `last_payment_error.payment_method.card.wallet.visa_checkout.shipping_address.state` (string, nullable)
              State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

    - `last_payment_error.payment_method.card_present` (object, nullable)
      If this is a `card_present` PaymentMethod, this hash contains details about the Card Present payment method.

      - `last_payment_error.payment_method.card_present.brand` (string, nullable)
        Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.

      - `last_payment_error.payment_method.card_present.brand_product` (string, nullable)
        The [product code](https://stripe.com/docs/card-product-codes) that identifies the specific program or product associated with a card.

      - `last_payment_error.payment_method.card_present.cardholder_name` (string, nullable)
        The cardholder name as read from the card, in [ISO 7813](https://en.wikipedia.org/wiki/ISO/IEC_7813) format. May include alphanumeric characters, special characters and first/last name separator (`/`). In some cases, the cardholder name may not be available depending on how the issuer has configured the card. Cardholder name is typically not available on swipe or contactless payments, such as those made with Apple Pay and Google Pay.

      - `last_payment_error.payment_method.card_present.country` (string, nullable)
        Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you’ve collected.

      - `last_payment_error.payment_method.card_present.description` (string, nullable)
        A high-level description of the type of cards issued in this range.

      - `last_payment_error.payment_method.card_present.exp_month` (integer)
        Two-digit number representing the card’s expiration month.

      - `last_payment_error.payment_method.card_present.exp_year` (integer)
        Four-digit number representing the card’s expiration year.

      - `last_payment_error.payment_method.card_present.fingerprint` (string, nullable)
        Uniquely identifies this particular card number. You can use this attribute to check whether two customers who’ve signed up with you are using the same card number, for example. For payment methods that tokenize card information (Apple Pay, Google Pay), the tokenized number might be provided instead of the underlying card number.

        *As of May 1, 2021, card fingerprint in India for Connect changed to allow two fingerprints for the same card—one for India and one for the rest of the world.*

      - `last_payment_error.payment_method.card_present.funding` (string, nullable)
        Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.

      - `last_payment_error.payment_method.card_present.issuer` (string, nullable)
        The name of the card’s issuing bank.

      - `last_payment_error.payment_method.card_present.last4` (string, nullable)
        The last four digits of the card.

      - `last_payment_error.payment_method.card_present.networks` (object, nullable)
        Contains information about card networks that can be used to process the payment.

        - `last_payment_error.payment_method.card_present.networks.available` (array of strings)
          All networks available for selection via [payment_method_options.card.network](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-payment_method_options-card-network).

        - `last_payment_error.payment_method.card_present.networks.preferred` (string, nullable)
          The preferred network for the card.

      - `last_payment_error.payment_method.card_present.offline` (object, nullable)
        Details about payment methods collected offline.

        - `last_payment_error.payment_method.card_present.offline.stored_at` (timestamp, nullable)
          Time at which the payment was collected while offline

        - `last_payment_error.payment_method.card_present.offline.type` (enum, nullable)
          The method used to process this payment method offline. Only deferred is allowed.
Possible enum values:
          - `deferred`

      - `last_payment_error.payment_method.card_present.preferred_locales` (array of strings, nullable)
        The languages that the issuing bank recommends using for localizing any customer-facing text, as read from the card. Referenced from EMV tag 5F2D, data encoded on the card’s chip.

      - `last_payment_error.payment_method.card_present.read_method` (enum, nullable)
        How card details were read in this transaction.
Possible enum values:
        - `contact_emv`
          Inserting a chip card into the card reader.

        - `contactless_emv`
          Tapping a contactless-enabled chip card or mobile wallet.

        - `contactless_magstripe_mode`
          Older standard for contactless payments that emulated a magnetic stripe read.

        - `magnetic_stripe_fallback`
          When inserting a chip card fails three times in a row, fallback to a magnetic stripe read.

        - `magnetic_stripe_track2`
          Swiping a card using the magnetic stripe reader.

      - `last_payment_error.payment_method.card_present.wallet` (object, nullable)
        If a mobile wallet was presented in the transaction, this contains the details of the mobile wallet.

        - `last_payment_error.payment_method.card_present.wallet.type` (enum)
          The type of mobile wallet, one of `apple_pay`, `google_pay`, `samsung_pay`, or `unknown`.
Possible enum values:
          - `apple_pay`
            Apple Pay is a mobile payment service by Apple.

          - `google_pay`
            Google Pay is a mobile payment service by Google.

          - `samsung_pay`
            Samsung Pay is a mobile payment service by Samsung Electronics.

          - `unknown`
            The wallet provider is unknown.

    - `last_payment_error.payment_method.cashapp` (object, nullable)
      If this is a `cashapp` PaymentMethod, this hash contains details about the Cash App Pay payment method.

      - `last_payment_error.payment_method.cashapp.buyer_id` (string, nullable)
        A unique and immutable identifier assigned by Cash App to every buyer.

      - `last_payment_error.payment_method.cashapp.cashtag` (string, nullable)
        A public identifier for buyers using Cash App.

    - `last_payment_error.payment_method.created` (timestamp)
      Time at which the object was created. Measured in seconds since the Unix epoch.

    - `last_payment_error.payment_method.crypto` (object, nullable)
      If this is a Crypto PaymentMethod, this hash contains details about the Crypto payment method.

    - `last_payment_error.payment_method.custom` (object, nullable)
      If this is a `custom` PaymentMethod, this hash contains details about the Custom payment method.

      - `last_payment_error.payment_method.custom.display_name` (string, nullable)
        Display name of the Dashboard-only CustomPaymentMethodType.

      - `last_payment_error.payment_method.custom.logo` (object, nullable)
        Contains information about the Dashboard-only CustomPaymentMethodType logo.

        - `last_payment_error.payment_method.custom.logo.content_type` (string, nullable)
          Content type of the Dashboard-only CustomPaymentMethodType logo.

        - `last_payment_error.payment_method.custom.logo.url` (string)
          URL of the Dashboard-only CustomPaymentMethodType logo.

      - `last_payment_error.payment_method.custom.type` (string)
        ID of the Dashboard-only CustomPaymentMethodType. Not expandable.

    - `last_payment_error.payment_method.customer` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The ID of the Customer to which this PaymentMethod is saved. This will not be set when the PaymentMethod has not been saved to a Customer.

    - `last_payment_error.payment_method.customer_balance` (object, nullable)
      If this is a `customer_balance` PaymentMethod, this hash contains details about the CustomerBalance payment method.

    - `last_payment_error.payment_method.eps` (object, nullable)
      If this is an `eps` PaymentMethod, this hash contains details about the EPS payment method.

      - `last_payment_error.payment_method.eps.bank` (enum, nullable)
        The customer’s bank. Should be one of `arzte_und_apotheker_bank`, `austrian_anadi_bank_ag`, `bank_austria`, `bankhaus_carl_spangler`, `bankhaus_schelhammer_und_schattera_ag`, `bawag_psk_ag`, `bks_bank_ag`, `brull_kallmus_bank_ag`, `btv_vier_lander_bank`, `capital_bank_grawe_gruppe_ag`, `deutsche_bank_ag`, `dolomitenbank`, `easybank_ag`, `erste_bank_und_sparkassen`, `hypo_alpeadriabank_international_ag`, `hypo_noe_lb_fur_niederosterreich_u_wien`, `hypo_oberosterreich_salzburg_steiermark`, `hypo_tirol_bank_ag`, `hypo_vorarlberg_bank_ag`, `hypo_bank_burgenland_aktiengesellschaft`, `marchfelder_bank`, `oberbank_ag`, `raiffeisen_bankengruppe_osterreich`, `schoellerbank_ag`, `sparda_bank_wien`, `volksbank_gruppe`, `volkskreditbank_ag`, or `vr_bank_braunau`.
Possible enum values:
        - `arzte_und_apotheker_bank`
        - `austrian_anadi_bank_ag`
        - `bank_austria`
        - `bankhaus_carl_spangler`
        - `bankhaus_schelhammer_und_schattera_ag`
        - `bawag_psk_ag`
        - `bks_bank_ag`
        - `brull_kallmus_bank_ag`
        - `btv_vier_lander_bank`
        - `capital_bank_grawe_gruppe_ag`
        - `deutsche_bank_ag`
        - `dolomitenbank`
        - `easybank_ag`
        - `erste_bank_und_sparkassen`
        - `hypo_alpeadriabank_international_ag`
        - `hypo_bank_burgenland_aktiengesellschaft`
        - `hypo_noe_lb_fur_niederosterreich_u_wien`
        - `hypo_oberosterreich_salzburg_steiermark`
        - `hypo_tirol_bank_ag`
        - `hypo_vorarlberg_bank_ag`
        - `marchfelder_bank`
        - `oberbank_ag`
        - `raiffeisen_bankengruppe_osterreich`
        - `schoellerbank_ag`
        - `sparda_bank_wien`
        - `volksbank_gruppe`
        - `volkskreditbank_ag`
        - `vr_bank_braunau`

    - `last_payment_error.payment_method.fpx` (object, nullable)
      If this is an `fpx` PaymentMethod, this hash contains details about the FPX payment method.

      - `last_payment_error.payment_method.fpx.bank` (enum)
        The customer’s bank, if provided. Can be one of `affin_bank`, `agrobank`, `alliance_bank`, `ambank`, `bank_islam`, `bank_muamalat`, `bank_rakyat`, `bsn`, `cimb`, `hong_leong_bank`, `hsbc`, `kfh`, `maybank2u`, `ocbc`, `public_bank`, `rhb`, `standard_chartered`, `uob`, `deutsche_bank`, `maybank2e`, `pb_enterprise`, or `bank_of_china`.
Possible enum values:
        - `affin_bank`
        - `agrobank`
        - `alliance_bank`
        - `ambank`
        - `bank_islam`
        - `bank_muamalat`
        - `bank_of_china`
        - `bank_rakyat`
        - `bsn`
        - `cimb`
        - `deutsche_bank`
        - `hong_leong_bank`
        - `hsbc`
        - `kfh`
        - `maybank2e`
        - `maybank2u`
        - `ocbc`
        - `pb_enterprise`
        - `public_bank`
        - `rhb`
        - `standard_chartered`
        - `uob`

    - `last_payment_error.payment_method.giropay` (object, nullable)
      If this is a `giropay` PaymentMethod, this hash contains details about the Giropay payment method.

    - `last_payment_error.payment_method.grabpay` (object, nullable)
      If this is a `grabpay` PaymentMethod, this hash contains details about the GrabPay payment method.

    - `last_payment_error.payment_method.ideal` (object, nullable)
      If this is an `ideal` PaymentMethod, this hash contains details about the iDEAL payment method.

      - `last_payment_error.payment_method.ideal.bank` (enum, nullable)
        The customer’s bank, if provided. Can be one of `abn_amro`, `adyen`, `asn_bank`, `bunq`, `buut`, `finom`, `handelsbanken`, `ing`, `knab`, `mollie`, `moneyou`, `n26`, `nn`, `rabobank`, `regiobank`, `revolut`, `sns_bank`, `triodos_bank`, `van_lanschot`, or `yoursafe`.
Possible enum values:
        - `abn_amro`
        - `adyen`
        - `asn_bank`
        - `bunq`
        - `buut`
        - `finom`
        - `handelsbanken`
        - `ing`
        - `knab`
        - `mollie`
        - `moneyou`
        - `n26`
        - `nn`
        - `rabobank`
        - `regiobank`
        - `revolut`
        - `sns_bank`
        - `triodos_bank`
        - `van_lanschot`
        - `yoursafe`

      - `last_payment_error.payment_method.ideal.bic` (enum, nullable)
        The Bank Identifier Code of the customer’s bank, if the bank was provided.
Possible enum values:
        - `ABNANL2A`
        - `ADYBNL2A`
        - `ASNBNL21`
        - `BITSNL2A`
        - `BUNQNL2A`
        - `BUUTNL2A`
        - `FNOMNL22`
        - `FVLBNL22`
        - `HANDNL2A`
        - `INGBNL2A`
        - `KNABNL2H`
        - `MLLENL2A`
        - `MOYONL21`
        - `NNBANL2G`
        - `NTSBDEB1`
        - `RABONL2U`
        - `RBRBNL21`
        - `REVOIE23`
        - `REVOLT21`
        - `SNSBNL2A`
        - `TRIONL2U`

    - `last_payment_error.payment_method.interac_present` (object, nullable)
      If this is an `interac_present` PaymentMethod, this hash contains details about the Interac Present payment method.

      - `last_payment_error.payment_method.interac_present.brand` (string, nullable)
        Card brand. Can be `interac`, `mastercard` or `visa`.

      - `last_payment_error.payment_method.interac_present.cardholder_name` (string, nullable)
        The cardholder name as read from the card, in [ISO 7813](https://en.wikipedia.org/wiki/ISO/IEC_7813) format. May include alphanumeric characters, special characters and first/last name separator (`/`). In some cases, the cardholder name may not be available depending on how the issuer has configured the card. Cardholder name is typically not available on swipe or contactless payments, such as those made with Apple Pay and Google Pay.

      - `last_payment_error.payment_method.interac_present.country` (string, nullable)
        Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you’ve collected.

      - `last_payment_error.payment_method.interac_present.description` (string, nullable)
        A high-level description of the type of cards issued in this range.

      - `last_payment_error.payment_method.interac_present.exp_month` (integer)
        Two-digit number representing the card’s expiration month.

      - `last_payment_error.payment_method.interac_present.exp_year` (integer)
        Four-digit number representing the card’s expiration year.

      - `last_payment_error.payment_method.interac_present.fingerprint` (string, nullable)
        Uniquely identifies this particular card number. You can use this attribute to check whether two customers who’ve signed up with you are using the same card number, for example. For payment methods that tokenize card information (Apple Pay, Google Pay), the tokenized number might be provided instead of the underlying card number.

        *As of May 1, 2021, card fingerprint in India for Connect changed to allow two fingerprints for the same card—one for India and one for the rest of the world.*

      - `last_payment_error.payment_method.interac_present.funding` (string, nullable)
        Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.

      - `last_payment_error.payment_method.interac_present.issuer` (string, nullable)
        The name of the card’s issuing bank.

      - `last_payment_error.payment_method.interac_present.last4` (string, nullable)
        The last four digits of the card.

      - `last_payment_error.payment_method.interac_present.networks` (object, nullable)
        Contains information about card networks that can be used to process the payment.

        - `last_payment_error.payment_method.interac_present.networks.available` (array of strings)
          All networks available for selection via [payment_method_options.card.network](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-payment_method_options-card-network).

        - `last_payment_error.payment_method.interac_present.networks.preferred` (string, nullable)
          The preferred network for the card.

      - `last_payment_error.payment_method.interac_present.preferred_locales` (array of strings, nullable)
        The languages that the issuing bank recommends using for localizing any customer-facing text, as read from the card. Referenced from EMV tag 5F2D, data encoded on the card’s chip.

      - `last_payment_error.payment_method.interac_present.read_method` (enum, nullable)
        How card details were read in this transaction.
Possible enum values:
        - `contact_emv`
          Inserting a chip card into the card reader.

        - `contactless_emv`
          Tapping a contactless-enabled chip card or mobile wallet.

        - `contactless_magstripe_mode`
          Older standard for contactless payments that emulated a magnetic stripe read.

        - `magnetic_stripe_fallback`
          When inserting a chip card fails three times in a row, fallback to a magnetic stripe read.

        - `magnetic_stripe_track2`
          Swiping a card using the magnetic stripe reader.

    - `last_payment_error.payment_method.kakao_pay` (object, nullable)
      If this is a `kakao_pay` PaymentMethod, this hash contains details about the Kakao Pay payment method.

    - `last_payment_error.payment_method.klarna` (object, nullable)
      If this is a `klarna` PaymentMethod, this hash contains details about the Klarna payment method.

      - `last_payment_error.payment_method.klarna.dob` (object, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        The customer’s date of birth, if provided.

        - `last_payment_error.payment_method.klarna.dob.day` (integer, nullable)
          The day of birth, between 1 and 31.

        - `last_payment_error.payment_method.klarna.dob.month` (integer, nullable)
          The month of birth, between 1 and 12.

        - `last_payment_error.payment_method.klarna.dob.year` (integer, nullable)
          The four-digit year of birth.

    - `last_payment_error.payment_method.konbini` (object, nullable)
      If this is a `konbini` PaymentMethod, this hash contains details about the Konbini payment method.

    - `last_payment_error.payment_method.kr_card` (object, nullable)
      If this is a `kr_card` PaymentMethod, this hash contains details about the Korean Card payment method.

      - `last_payment_error.payment_method.kr_card.brand` (enum, nullable)
        The local credit or debit card brand.
Possible enum values:
        - `bc`
          BC

        - `citi`
          Citi

        - `hana`
          Hana

        - `hyundai`
          Hyundai

        - `jeju`
          Jeju

        - `jeonbuk`
          Jeonbuk

        - `kakaobank`
          Kakao Bank

        - `kbank`
          KBank

        - `kdbbank`
          KDB Bank

        - `kookmin`
          Kookmin

        - `kwangju`
          Kwangju

        - `lotte`
          Lotte

        - `mg`
          MG

        - `nh`
          NG

        - `post`
          Post

        - `samsung`
          Samsung

        - `savingsbank`
          Savings Bank

        - `shinhan`
          Shinhan

        - `shinhyup`
          Shinhyup

        - `suhyup`
          Suhyup

        - `tossbank`
          Toss Bank

        - `woori`
          Woori

      - `last_payment_error.payment_method.kr_card.last4` (string, nullable)
        The last four digits of the card. This may not be present for American Express cards.

        The maximum length is 4 characters.

    - `last_payment_error.payment_method.link` (object, nullable)
      If this is an `Link` PaymentMethod, this hash contains details about the Link payment method (Link is also known as Onelink in the UK).

      - `last_payment_error.payment_method.link.email` (string, nullable)
        Account owner’s email address.

    - `last_payment_error.payment_method.livemode` (boolean)
      If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

    - `last_payment_error.payment_method.mb_way` (object, nullable)
      If this is a MB WAY PaymentMethod, this hash contains details about the MB WAY payment method.

    - `last_payment_error.payment_method.metadata` (object, nullable)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

    - `last_payment_error.payment_method.mobilepay` (object, nullable)
      If this is a `mobilepay` PaymentMethod, this hash contains details about the MobilePay payment method.

    - `last_payment_error.payment_method.multibanco` (object, nullable)
      If this is a `multibanco` PaymentMethod, this hash contains details about the Multibanco payment method.

    - `last_payment_error.payment_method.naver_pay` (object, nullable)
      If this is a `naver_pay` PaymentMethod, this hash contains details about the Naver Pay payment method.

      - `last_payment_error.payment_method.naver_pay.buyer_id` (string, nullable)
        Uniquely identifies this particular Naver Pay account. You can use this attribute to check whether two Naver Pay accounts are the same.

      - `last_payment_error.payment_method.naver_pay.funding` (enum)
        Whether to fund this transaction with Naver Pay points or a card.
Possible enum values:
        - `card`
          Use a card to fund this transaction.

        - `points`
          Use Naver Pay points to fund this transaction.

    - `last_payment_error.payment_method.nz_bank_account` (object, nullable)
      If this is an nz_bank_account PaymentMethod, this hash contains details about the nz_bank_account payment method.

      - `last_payment_error.payment_method.nz_bank_account.account_holder_name` (string, nullable)
        The name on the bank account. Only present if the account holder name is different from the name of the authorized signatory collected in the PaymentMethod’s billing details.

      - `last_payment_error.payment_method.nz_bank_account.bank_code` (string)
        The numeric code for the bank account’s bank.

      - `last_payment_error.payment_method.nz_bank_account.bank_name` (string)
        The name of the bank.

      - `last_payment_error.payment_method.nz_bank_account.branch_code` (string)
        The numeric code for the bank account’s bank branch.

      - `last_payment_error.payment_method.nz_bank_account.last4` (string)
        Last four digits of the bank account number.

      - `last_payment_error.payment_method.nz_bank_account.suffix` (string, nullable)
        The suffix of the bank account number.

    - `last_payment_error.payment_method.oxxo` (object, nullable)
      If this is an `oxxo` PaymentMethod, this hash contains details about the OXXO payment method.

    - `last_payment_error.payment_method.p24` (object, nullable)
      If this is a `p24` PaymentMethod, this hash contains details about the P24 payment method.

      - `last_payment_error.payment_method.p24.bank` (enum, nullable)
        The customer’s bank, if provided.

    - `last_payment_error.payment_method.pay_by_bank` (object, nullable)
      If this is a `pay_by_bank` PaymentMethod, this hash contains details about the PayByBank payment method.

    - `last_payment_error.payment_method.payco` (object, nullable)
      If this is a `payco` PaymentMethod, this hash contains details about the PAYCO payment method.

    - `last_payment_error.payment_method.paynow` (object, nullable)
      If this is a `paynow` PaymentMethod, this hash contains details about the PayNow payment method.

    - `last_payment_error.payment_method.paypal` (object, nullable)
      If this is a `paypal` PaymentMethod, this hash contains details about the PayPal payment method.

      - `last_payment_error.payment_method.paypal.country` (string, nullable)
        Two-letter ISO code representing the buyer’s country. Values are provided by PayPal directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.

      - `last_payment_error.payment_method.paypal.payer_email` (string, nullable)
        Owner’s email. Values are provided by PayPal directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.

      - `last_payment_error.payment_method.paypal.payer_id` (string, nullable)
        PayPal account PayerID. This identifier uniquely identifies the PayPal customer.

    - `last_payment_error.payment_method.paypay` (object, nullable)
      If this is a `paypay` PaymentMethod, this hash contains details about the PayPay payment method.

    - `last_payment_error.payment_method.payto` (object, nullable)
      If this is a `payto` PaymentMethod, this hash contains details about the PayTo payment method.

      - `last_payment_error.payment_method.payto.bsb_number` (string, nullable)
        Bank-State-Branch number of the bank account.

      - `last_payment_error.payment_method.payto.last4` (string, nullable)
        Last four digits of the bank account number.

      - `last_payment_error.payment_method.payto.pay_id` (string, nullable)
        The PayID alias for the bank account.

    - `last_payment_error.payment_method.pix` (object, nullable)
      If this is a `pix` PaymentMethod, this hash contains details about the Pix payment method.

    - `last_payment_error.payment_method.promptpay` (object, nullable)
      If this is a `promptpay` PaymentMethod, this hash contains details about the PromptPay payment method.

    - `last_payment_error.payment_method.radar_options` (object, nullable)
      Options to configure Radar. See [Radar Session](https://docs.stripe.com/docs/radar/radar-session.md) for more information.

      - `last_payment_error.payment_method.radar_options.session` (string, nullable)
        A [Radar Session](https://docs.stripe.com/docs/radar/radar-session.md) is a snapshot of the browser metadata and device details that help Radar make more accurate predictions on your payments.

    - `last_payment_error.payment_method.revolut_pay` (object, nullable)
      If this is a `revolut_pay` PaymentMethod, this hash contains details about the Revolut Pay payment method.

    - `last_payment_error.payment_method.samsung_pay` (object, nullable)
      If this is a `samsung_pay` PaymentMethod, this hash contains details about the SamsungPay payment method.

    - `last_payment_error.payment_method.satispay` (object, nullable)
      If this is a `satispay` PaymentMethod, this hash contains details about the Satispay payment method.

    - `last_payment_error.payment_method.scalapay` (object, nullable)
      If this is a Scalapay PaymentMethod, this hash contains details about the Scalapay payment method.

    - `last_payment_error.payment_method.sepa_debit` (object, nullable)
      If this is a `sepa_debit` PaymentMethod, this hash contains details about the SEPA debit bank account.

      - `last_payment_error.payment_method.sepa_debit.bank_code` (string, nullable)
        Bank code of bank associated with the bank account.

      - `last_payment_error.payment_method.sepa_debit.branch_code` (string, nullable)
        Branch code of bank associated with the bank account.

      - `last_payment_error.payment_method.sepa_debit.country` (string, nullable)
        Two-letter ISO code representing the country the bank account is located in.

      - `last_payment_error.payment_method.sepa_debit.fingerprint` (string, nullable)
        Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.

      - `last_payment_error.payment_method.sepa_debit.generated_from` (object, nullable)
        Information about the object that generated this PaymentMethod.

        - `last_payment_error.payment_method.sepa_debit.generated_from.charge` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
          The ID of the Charge that generated this PaymentMethod, if any.

        - `last_payment_error.payment_method.sepa_debit.generated_from.setup_attempt` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
          The ID of the SetupAttempt that generated this PaymentMethod, if any.

      - `last_payment_error.payment_method.sepa_debit.last4` (string, nullable)
        Last four characters of the IBAN.

    - `last_payment_error.payment_method.sofort` (object, nullable)
      If this is a `sofort` PaymentMethod, this hash contains details about the SOFORT payment method.

      - `last_payment_error.payment_method.sofort.country` (string, nullable)
        Two-letter ISO code representing the country the bank account is located in.

    - `last_payment_error.payment_method.sunbit` (object, nullable)
      If this is a Sunbit PaymentMethod, this hash contains details about the Sunbit payment method.

    - `last_payment_error.payment_method.swish` (object, nullable)
      If this is a `swish` PaymentMethod, this hash contains details about the Swish payment method.

    - `last_payment_error.payment_method.twint` (object, nullable)
      If this is a TWINT PaymentMethod, this hash contains details about the TWINT payment method.

    - `last_payment_error.payment_method.type` (enum)
      The type of the PaymentMethod. An additional hash is included on the PaymentMethod with a name matching this value. It contains additional information specific to the PaymentMethod type.
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

      - `custom`
        Custom payment methods are user-defined payment methods that Stripe doesn’t process. You can’t use them in PaymentIntents or SetupIntents.

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

      - `link`
        [Link (also known as Onelink in the UK)](https://docs.stripe.com/docs/payments/link.md) allows customers to pay with their saved payment details.

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

    - `last_payment_error.payment_method.upi` (object, nullable)
      If this is a `upi` PaymentMethod, this hash contains details about the UPI payment method.

      - `last_payment_error.payment_method.upi.vpa` (string, nullable)
        Customer’s unique Virtual Payment Address

    - `last_payment_error.payment_method.us_bank_account` (object, nullable)
      If this is an `us_bank_account` PaymentMethod, this hash contains details about the US bank account payment method.

      - `last_payment_error.payment_method.us_bank_account.account_holder_type` (enum, nullable)
        Account holder type: individual or company.
Possible enum values:
        - `company`
          Account belongs to a company

        - `individual`
          Account belongs to an individual

      - `last_payment_error.payment_method.us_bank_account.account_type` (enum, nullable)
        Account type: checkings or savings. Defaults to checking if omitted.
Possible enum values:
        - `checking`
          Bank account type is checking

        - `savings`
          Bank account type is savings

      - `last_payment_error.payment_method.us_bank_account.bank_name` (string, nullable)
        The name of the bank.

      - `last_payment_error.payment_method.us_bank_account.financial_connections_account` (string, nullable)
        The ID of the Financial Connections Account used to create the payment method.

      - `last_payment_error.payment_method.us_bank_account.fingerprint` (string, nullable)
        Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.

      - `last_payment_error.payment_method.us_bank_account.last4` (string, nullable)
        Last four digits of the bank account number.

      - `last_payment_error.payment_method.us_bank_account.networks` (object, nullable)
        Contains information about US bank account networks that can be used.

        - `last_payment_error.payment_method.us_bank_account.networks.preferred` (string, nullable)
          The preferred network.

        - `last_payment_error.payment_method.us_bank_account.networks.supported` (array of enums)
          All supported networks.
Possible enum values:
          - `ach`
          - `us_domestic_wire`

      - `last_payment_error.payment_method.us_bank_account.routing_number` (string, nullable)
        Routing number of the bank account.

      - `last_payment_error.payment_method.us_bank_account.status_details` (object, nullable)
        Contains information about the future reusability of this PaymentMethod.

        - `last_payment_error.payment_method.us_bank_account.status_details.blocked` (object, nullable)
          Contains more information about the underlying block. This field will only be rendered if the PaymentMethod is blocked.

          - `last_payment_error.payment_method.us_bank_account.status_details.blocked.network_code` (enum, nullable)
            The ACH network code that resulted in this block.
Possible enum values:
            - `R02`
              Account Closed

            - `R03`
              No Account, Unable to Locate Account

            - `R04`
              Invalid Account Number Structure

            - `R05`
              Unauthorized Debit to Consumer Account Using Corporate SEC Code

            - `R07`
              Authorization Revoked By Consumer

            - `R08`
              Payment Stopped

            - `R10`
              Customer Advises Originator is Not Known to Receiver and/or Originator is Not Authorized by Receiver to Debit Receiver’s Account

            - `R11`
              Customer Advises Entry Not in Accordance with the Terms of Authorization

            - `R16`
              Account Frozen, Entry Returned Per OFAC Instructions

            - `R20`
              Non-Transaction Account

            - `R29`
              Corporate Customer Advises Not Authorized

            - `R31`
              Permissible Return Entry (CCD and CTX only)

          - `last_payment_error.payment_method.us_bank_account.status_details.blocked.reason` (enum, nullable)
            The reason why this PaymentMethod’s fingerprint has been blocked
Possible enum values:
            - `bank_account_closed`
              Bank account has been closed.

            - `bank_account_frozen`
              Bank account has been frozen.

            - `bank_account_invalid_details`
              Bank account details are incorrect. Please check the account number, routing number, account holder name, and account type.

            - `bank_account_restricted`
              Bank account does not support debits.

            - `bank_account_unusable`
              Bank account has been blocked by Stripe. Please contact Support.

            - `debit_not_authorized`
              Customer has disputed a previous payment with their bank. If the `network_code` is R29, please confirm that Stripe’s Company IDs are allowlisted before attempting additional payments.

            - `tokenized_account_number_deactivated`
              Bank account’s tokenized account number is invalid. Please use a different account.

    - `last_payment_error.payment_method.wechat_pay` (object, nullable)
      If this is an `wechat_pay` PaymentMethod, this hash contains details about the wechat_pay payment method.

    - `last_payment_error.payment_method.zip` (object, nullable)
      If this is a `zip` PaymentMethod, this hash contains details about the Zip payment method.

  - `last_payment_error.payment_method_type` (string, nullable)
    If the error is specific to the type of payment method, the payment method type that had a problem. This field is only populated for invoice-related errors.

  - `last_payment_error.source` (object, nullable)
    The [source object](https://docs.stripe.com/docs/api/sources/object.md) for errors returned on a request involving a source.

    - `last_payment_error.source.id` (string)
      Unique identifier for the object.

    - `last_payment_error.source.object` (string)
      String representing the object’s type. Objects of the same type share the same value.

    - `last_payment_error.source.account` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The account this card belongs to. Only applicable on Accounts (not customers or recipients) This property is only available when returned as an [External Account](https://docs.stripe.com/api/external_account_cards/object.md) where [controller.is_controller](https://docs.stripe.com/api/accounts/object.md#account_object-controller-is_controller) is `true`.

    - `last_payment_error.source.address_city` (string, nullable)
      City/District/Suburb/Town/Village.

    - `last_payment_error.source.address_country` (string, nullable)
      Billing address country, if provided when creating card.

    - `last_payment_error.source.address_line1` (string, nullable)
      Address line 1 (Street address/PO Box/Company name).

    - `last_payment_error.source.address_line1_check` (string, nullable)
      If `address_line1` was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.

    - `last_payment_error.source.address_line2` (string, nullable)
      Address line 2 (Apartment/Suite/Unit/Building).

    - `last_payment_error.source.address_state` (string, nullable)
      State/County/Province/Region.

    - `last_payment_error.source.address_zip` (string, nullable)
      ZIP or postal code.

    - `last_payment_error.source.address_zip_check` (string, nullable)
      If `address_zip` was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.

    - `last_payment_error.source.allow_redisplay` (enum, nullable)
      This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow. The field defaults to “unspecified”.
Possible enum values:
      - `always`
        Use `always` to indicate that this payment method can always be shown to a customer in a checkout flow.

      - `limited`
        Use `limited` to indicate that this payment method can’t always be shown to a customer in a checkout flow. For example, it can only be shown in the context of a specific subscription.

      - `unspecified`
        This is the default value for payment methods where `allow_redisplay` wasn’t set.

    - `last_payment_error.source.available_payout_methods` (array of enums, nullable)
      A set of available payout methods for this card. Only values from this set should be passed as the `method` when creating a payout.
Possible enum values:
      - `instant`
      - `standard`

    - `last_payment_error.source.brand` (string)
      Card brand. Can be `American Express`, `Cartes Bancaires`, `Diners Club`, `Discover`, `Eftpos Australia`, `Girocard`, `JCB`, `MasterCard`, `UnionPay`, `Visa`, or `Unknown`.

    - `last_payment_error.source.country` (string, nullable)
      Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you’ve collected.

    - `last_payment_error.source.currency` (enum, nullable)
      Three-letter [ISO code for currency](https://www.iso.org/iso-4217-currency-codes.html) in lowercase. Must be a [supported currency](https://docs.stripe.com/currencies.md). Only applicable on accounts (not customers or recipients). The card can be used as a transfer destination for funds in this currency. This property is only available when returned as an [External Account](https://docs.stripe.com/api/external_account_cards/object.md) where [controller.is_controller](https://docs.stripe.com/api/accounts/object.md#account_object-controller-is_controller) is `true`.

    - `last_payment_error.source.customer` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The customer that this card belongs to. This attribute will not be in the card object if the card belongs to an account or recipient instead.

    - `last_payment_error.source.cvc_check` (string, nullable)
      If a CVC was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`. A result of unchecked indicates that CVC was provided but hasn’t been checked yet. Checks are typically performed when attaching a card to a Customer object, or when creating a charge. For more details, see [Check if a card is valid without a charge](https://support.stripe.com/questions/check-if-a-card-is-valid-without-a-charge).

    - `last_payment_error.source.dynamic_last4` (string, nullable)
      (For tokenized numbers only.) The last four digits of the device account number.

    - `last_payment_error.source.exp_month` (integer)
      Two-digit number representing the card’s expiration month.

    - `last_payment_error.source.exp_year` (integer)
      Four-digit number representing the card’s expiration year.

    - `last_payment_error.source.fingerprint` (string, nullable)
      Uniquely identifies this particular card number. You can use this attribute to check whether two customers who’ve signed up with you are using the same card number, for example. For payment methods that tokenize card information (Apple Pay, Google Pay), the tokenized number might be provided instead of the underlying card number.

      *As of May 1, 2021, card fingerprint in India for Connect changed to allow two fingerprints for the same card—one for India and one for the rest of the world.*

    - `last_payment_error.source.funding` (string)
      Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.

    - `last_payment_error.source.iin` (string, nullable)
      Issuer identification number of the card.

    - `last_payment_error.source.last4` (string)
      The last four digits of the card.

    - `last_payment_error.source.metadata` (object, nullable)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

    - `last_payment_error.source.name` (string, nullable)
      Cardholder name.

    - `last_payment_error.source.regulated_status` (enum, nullable)
      Status of a card based on the card issuer.
Possible enum values:
      - `regulated`
        The card falls under a regulated account range.

      - `unregulated`
        The card does not fall under a regulated account range.

    - `last_payment_error.source.tokenization_method` (string, nullable)
      If the card number is tokenized, this is the method that was used. Can be `android_pay` (includes Google Pay), `apple_pay`, `masterpass`, `visa_checkout`, or null.

    - `last_payment_error.source.wallet` (object, nullable)
      If this Card is part of a card wallet, this contains the details of the card wallet.

      - `last_payment_error.source.wallet.apple_pay` (object, nullable)
        If this is a `apple_pay` card wallet, this hash contains details about the wallet.

      - `last_payment_error.source.wallet.type` (enum)
        The type of the card wallet, one of `apple_pay` or `link`. An additional hash is included on the Wallet subhash with a name matching this value. It contains additional information specific to the card wallet type.
Possible enum values:
        - `apple_pay`
        - `link`

  - `last_payment_error.type` (enum)
    The type of error returned. One of `api_error`, `card_error`, `idempotency_error`, or `invalid_request_error`
Possible enum values:
    - `api_error`
    - `card_error`
    - `idempotency_error`
    - `invalid_request_error`

- `latest_charge` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the latest [Charge object](https://docs.stripe.com/docs/api/charges.md) created by this PaymentIntent. This property is `null` until PaymentIntent confirmation is attempted.

- `livemode` (boolean)
  If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

- `managed_payments` (object, nullable)
  Settings for Managed Payments.

  - `managed_payments.enabled` (boolean)
    Indicates whether [Managed Payments](https://docs.stripe.com/payments/managed-payments.md) is enabled for this transaction.

- `metadata` (object)
  Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Learn more about [storing information in metadata](https://docs.stripe.com/docs/payments/payment-intents/creating-payment-intents.md#storing-information-in-metadata).

- `next_action` (object, nullable)
  If present, this property tells you what actions you need to take in order for your customer to fulfill a payment using the provided source.

  - `next_action.alipay_handle_redirect` (object, nullable)
    Contains instructions for authenticating a payment by redirecting your customer to Alipay App or website.

    - `next_action.alipay_handle_redirect.native_data` (string, nullable)
      The native data to be used with Alipay SDK you must redirect your customer to in order to authenticate the payment in an Android App.

    - `next_action.alipay_handle_redirect.native_url` (string, nullable)
      The native URL you must redirect your customer to in order to authenticate the payment in an iOS App.

    - `next_action.alipay_handle_redirect.return_url` (string, nullable)
      If the customer does not exit their browser while authenticating, they will be redirected to this specified URL after completion.

    - `next_action.alipay_handle_redirect.url` (string, nullable)
      The URL you must redirect your customer to in order to authenticate the payment.

  - `next_action.blik_authorize` (object, nullable)
    Indicates that the customer should be prompted to authorize the BLIK payment in their banking app.

  - `next_action.boleto_display_details` (object, nullable)
    Contains Boleto details necessary for the customer to complete the payment.

    - `next_action.boleto_display_details.expires_at` (timestamp, nullable)
      The timestamp after which the boleto expires.

    - `next_action.boleto_display_details.hosted_voucher_url` (string, nullable)
      The URL to the hosted boleto voucher page, which allows customers to view the boleto voucher.

    - `next_action.boleto_display_details.number` (string, nullable)
      The boleto number.

    - `next_action.boleto_display_details.pdf` (string, nullable)
      The URL to the downloadable boleto voucher PDF.

  - `next_action.card_await_notification` (object, nullable)
    Contains instructions for processing off session recurring payments with Indian issued cards.

    - `next_action.card_await_notification.charge_attempt_at` (timestamp, nullable)
      The time that payment will be attempted. If customer approval is required, they need to provide approval before this time.

    - `next_action.card_await_notification.customer_approval_required` (boolean, nullable)
      For payments greater than INR 15000, the customer must provide explicit approval of the payment with their bank. For payments of lower amount, no customer action is required.

  - `next_action.cashapp_handle_redirect_or_display_qr_code` (object, nullable)
    The field that contains Cash App Pay QR code info

    - `next_action.cashapp_handle_redirect_or_display_qr_code.hosted_instructions_url` (string)
      The URL to the hosted Cash App Pay instructions page, which allows customers to view the QR code, and supports QR code refreshing on expiration.

    - `next_action.cashapp_handle_redirect_or_display_qr_code.mobile_auth_url` (string)
      The url for mobile redirect based auth

    - `next_action.cashapp_handle_redirect_or_display_qr_code.qr_code` (object)
      The field that contains CashApp QR code info

      - `next_action.cashapp_handle_redirect_or_display_qr_code.qr_code.expires_at` (timestamp)
        The date (unix timestamp) when the QR code expires.

      - `next_action.cashapp_handle_redirect_or_display_qr_code.qr_code.image_url_png` (string)
        The image_url_png string used to render QR code

      - `next_action.cashapp_handle_redirect_or_display_qr_code.qr_code.image_url_svg` (string)
        The image_url_svg string used to render QR code

  - `next_action.display_bank_transfer_instructions` (object, nullable)
    Contains the bank transfer details necessary for the customer to complete the payment.

    - `next_action.display_bank_transfer_instructions.amount_remaining` (integer, nullable)
      The remaining amount that needs to be transferred to complete the payment.

    - `next_action.display_bank_transfer_instructions.currency` (enum, nullable)
      Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

    - `next_action.display_bank_transfer_instructions.financial_addresses` (array of objects, nullable)
      A list of financial addresses that can be used to fund the customer balance

      - `next_action.display_bank_transfer_instructions.financial_addresses.aba` (object, nullable)
        An account and routing number US FinancialAddress

        - `next_action.display_bank_transfer_instructions.financial_addresses.aba.account_holder_address` (object)
          The account holder’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.account_holder_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.account_holder_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.account_holder_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.account_holder_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.account_holder_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.account_holder_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.aba.account_holder_name` (string)
          The account holder name

        - `next_action.display_bank_transfer_instructions.financial_addresses.aba.account_number` (string)
          The ABA account number

        - `next_action.display_bank_transfer_instructions.financial_addresses.aba.account_type` (string)
          The account type

        - `next_action.display_bank_transfer_instructions.financial_addresses.aba.bank_address` (object)
          The bank’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.bank_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.bank_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.bank_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.bank_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.bank_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.aba.bank_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.aba.bank_name` (string)
          The bank name

        - `next_action.display_bank_transfer_instructions.financial_addresses.aba.routing_number` (string)
          The ABA routing number

      - `next_action.display_bank_transfer_instructions.financial_addresses.iban` (object, nullable)
        An IBAN-based FinancialAddress

        - `next_action.display_bank_transfer_instructions.financial_addresses.iban.account_holder_address` (object)
          The account holder’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.account_holder_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.account_holder_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.account_holder_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.account_holder_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.account_holder_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.account_holder_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.iban.account_holder_name` (string)
          The name of the person or business that owns the bank account

        - `next_action.display_bank_transfer_instructions.financial_addresses.iban.bank_address` (object)
          The bank’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.bank_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.bank_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.bank_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.bank_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.bank_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.iban.bank_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.iban.bic` (string)
          The BIC/SWIFT code of the account.

        - `next_action.display_bank_transfer_instructions.financial_addresses.iban.country` (string)
          Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.iban.iban` (string)
          The IBAN of the account.

      - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code` (object, nullable)
        An account number and sort code-based FinancialAddress

        - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.account_holder_address` (object)
          The account holder’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.account_holder_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.account_holder_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.account_holder_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.account_holder_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.account_holder_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.account_holder_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.account_holder_name` (string)
          The name of the person or business that owns the bank account

        - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.account_number` (string)
          The account number

        - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.bank_address` (object)
          The bank’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.bank_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.bank_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.bank_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.bank_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.bank_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.bank_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.sort_code.sort_code` (string)
          The six-digit sort code

      - `next_action.display_bank_transfer_instructions.financial_addresses.spei` (object, nullable)
        A SPEI-based FinancialAddress

        - `next_action.display_bank_transfer_instructions.financial_addresses.spei.account_holder_address` (object)
          The account holder’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.account_holder_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.account_holder_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.account_holder_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.account_holder_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.account_holder_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.account_holder_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.spei.account_holder_name` (string)
          The account holder name

        - `next_action.display_bank_transfer_instructions.financial_addresses.spei.bank_address` (object)
          The bank’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.bank_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.bank_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.bank_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.bank_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.bank_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.spei.bank_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.spei.bank_code` (string)
          The three-digit bank code

        - `next_action.display_bank_transfer_instructions.financial_addresses.spei.bank_name` (string)
          The short banking institution name

        - `next_action.display_bank_transfer_instructions.financial_addresses.spei.clabe` (string)
          The CLABE number

      - `next_action.display_bank_transfer_instructions.financial_addresses.supported_networks` (array of enums, nullable)
        The payment networks supported by this FinancialAddress

      - `next_action.display_bank_transfer_instructions.financial_addresses.swift` (object, nullable)
        An account and swift code FinancialAddress

        - `next_action.display_bank_transfer_instructions.financial_addresses.swift.account_holder_address` (object)
          The account holder’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.account_holder_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.account_holder_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.account_holder_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.account_holder_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.account_holder_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.account_holder_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.swift.account_holder_name` (string)
          The account holder name

        - `next_action.display_bank_transfer_instructions.financial_addresses.swift.account_number` (string)
          The account number

        - `next_action.display_bank_transfer_instructions.financial_addresses.swift.account_type` (string)
          The account type

        - `next_action.display_bank_transfer_instructions.financial_addresses.swift.bank_address` (object)
          The bank’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.bank_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.bank_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.bank_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.bank_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.bank_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.swift.bank_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.swift.bank_name` (string)
          The bank name

        - `next_action.display_bank_transfer_instructions.financial_addresses.swift.swift_code` (string)
          The SWIFT code

      - `next_action.display_bank_transfer_instructions.financial_addresses.type` (enum)
        The type of financial address

      - `next_action.display_bank_transfer_instructions.financial_addresses.zengin` (object, nullable)
        A Zengin-based FinancialAddress

        - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.account_holder_address` (object)
          The account holder’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.account_holder_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.account_holder_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.account_holder_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.account_holder_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.account_holder_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.account_holder_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.account_holder_name` (string, nullable)
          The account holder name

        - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.account_number` (string, nullable)
          The account number

        - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.account_type` (string, nullable)
          The bank account type. In Japan, this can only be `futsu` or `toza`.

        - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.bank_address` (object)
          The bank’s physical address

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.bank_address.city` (string, nullable)
            City, district, suburb, town, or village.

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.bank_address.country` (string, nullable)
            Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.bank_address.line1` (string, nullable)
            Address line 1, such as the street, PO Box, or company name.

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.bank_address.line2` (string, nullable)
            Address line 2, such as the apartment, suite, unit, or building.

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.bank_address.postal_code` (string, nullable)
            ZIP or postal code.

          - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.bank_address.state` (string, nullable)
            State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

        - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.bank_code` (string, nullable)
          The bank code of the account

        - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.bank_name` (string, nullable)
          The bank name of the account

        - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.branch_code` (string, nullable)
          The branch code of the account

        - `next_action.display_bank_transfer_instructions.financial_addresses.zengin.branch_name` (string, nullable)
          The branch name of the account

    - `next_action.display_bank_transfer_instructions.hosted_instructions_url` (string, nullable)
      A link to a hosted page that guides your customer through completing the transfer.

    - `next_action.display_bank_transfer_instructions.reference` (string, nullable)
      A string identifying this payment. Instruct your customer to include this code in the reference or memo field of their bank transfer.

    - `next_action.display_bank_transfer_instructions.type` (enum)
      Type of bank transfer
Possible enum values:
      - `eu_bank_transfer`
        A bank transfer of type eu_bank_transfer

      - `gb_bank_transfer`
        A bank transfer of type gb_bank_transfer

      - `jp_bank_transfer`
        A bank transfer of type jp_bank_transfer

      - `mx_bank_transfer`
        A bank transfer of type mx_bank_transfer

      - `us_bank_transfer`
        A bank transfer of type us_bank_transfer

  - `next_action.klarna_display_qr_code` (object, nullable)
    The field that contains Klarna QR code info

    - `next_action.klarna_display_qr_code.data` (string)
      The data being used to generate QR code

    - `next_action.klarna_display_qr_code.expires_at` (timestamp, nullable)
      The timestamp at which the QR code expires.

    - `next_action.klarna_display_qr_code.image_url_png` (string)
      The image_url_png string used to render QR code

    - `next_action.klarna_display_qr_code.image_url_svg` (string)
      The image_url_svg string used to render QR code

  - `next_action.konbini_display_details` (object, nullable)
    Contains Konbini details necessary for the customer to complete the payment.

    - `next_action.konbini_display_details.expires_at` (timestamp)
      The timestamp at which the pending Konbini payment expires.

    - `next_action.konbini_display_details.hosted_voucher_url` (string, nullable)
      The URL for the Konbini payment instructions page, which allows customers to view and print a Konbini voucher.

    - `next_action.konbini_display_details.stores` (object)
      Payment instruction details grouped by convenience store chain.

      - `next_action.konbini_display_details.stores.familymart` (object, nullable)
        FamilyMart instruction details.

        - `next_action.konbini_display_details.stores.familymart.confirmation_number` (string, nullable)
          The confirmation number.

        - `next_action.konbini_display_details.stores.familymart.payment_code` (string)
          The payment code.

      - `next_action.konbini_display_details.stores.lawson` (object, nullable)
        Lawson instruction details.

        - `next_action.konbini_display_details.stores.lawson.confirmation_number` (string, nullable)
          The confirmation number.

        - `next_action.konbini_display_details.stores.lawson.payment_code` (string)
          The payment code.

      - `next_action.konbini_display_details.stores.ministop` (object, nullable)
        Ministop instruction details.

        - `next_action.konbini_display_details.stores.ministop.confirmation_number` (string, nullable)
          The confirmation number.

        - `next_action.konbini_display_details.stores.ministop.payment_code` (string)
          The payment code.

      - `next_action.konbini_display_details.stores.seicomart` (object, nullable)
        Seicomart instruction details.

        - `next_action.konbini_display_details.stores.seicomart.confirmation_number` (string, nullable)
          The confirmation number.

        - `next_action.konbini_display_details.stores.seicomart.payment_code` (string)
          The payment code.

  - `next_action.multibanco_display_details` (object, nullable)
    Contains Multibanco details necessary for the customer to complete the payment.

    - `next_action.multibanco_display_details.entity` (string, nullable)
      Entity number associated with this Multibanco payment.

    - `next_action.multibanco_display_details.expires_at` (timestamp, nullable)
      The timestamp at which the Multibanco voucher expires.

    - `next_action.multibanco_display_details.hosted_voucher_url` (string, nullable)
      The URL for the hosted Multibanco voucher page, which allows customers to view a Multibanco voucher.

    - `next_action.multibanco_display_details.reference` (string, nullable)
      Reference number associated with this Multibanco payment.

  - `next_action.oxxo_display_details` (object, nullable)
    Contains OXXO details necessary for the customer to complete the payment.

    - `next_action.oxxo_display_details.expires_after` (timestamp, nullable)
      The timestamp after which the OXXO voucher expires.

    - `next_action.oxxo_display_details.hosted_voucher_url` (string, nullable)
      The URL for the hosted OXXO voucher page, which allows customers to view and print an OXXO voucher.

    - `next_action.oxxo_display_details.number` (string, nullable)
      OXXO reference number.

  - `next_action.paynow_display_qr_code` (object, nullable)
    The field that contains PayNow QR code info

    - `next_action.paynow_display_qr_code.data` (string)
      The raw data string used to generate QR code, it should be used together with QR code library.

    - `next_action.paynow_display_qr_code.hosted_instructions_url` (string, nullable)
      The URL to the hosted PayNow instructions page, which allows customers to view the PayNow QR code.

    - `next_action.paynow_display_qr_code.image_url_png` (string)
      The image_url_png string used to render QR code

    - `next_action.paynow_display_qr_code.image_url_svg` (string)
      The image_url_svg string used to render QR code

  - `next_action.pix_display_qr_code` (object, nullable)
    The field that contains Pix QR code info

    - `next_action.pix_display_qr_code.data` (string)
      The raw data string used to generate QR code, it should be used together with QR code library.

    - `next_action.pix_display_qr_code.expires_at` (integer)
      The date (unix timestamp) when the PIX expires.

    - `next_action.pix_display_qr_code.hosted_instructions_url` (string)
      The URL to the hosted pix instructions page, which allows customers to view the pix QR code.

    - `next_action.pix_display_qr_code.image_url_png` (string)
      The image_url_png string used to render png QR code

    - `next_action.pix_display_qr_code.image_url_svg` (string)
      The image_url_svg string used to render svg QR code

  - `next_action.promptpay_display_qr_code` (object, nullable)
    The field that contains PromptPay QR code info

    - `next_action.promptpay_display_qr_code.data` (string)
      The raw data string used to generate QR code, it should be used together with QR code library.

    - `next_action.promptpay_display_qr_code.hosted_instructions_url` (string)
      The URL to the hosted PromptPay instructions page, which allows customers to view the PromptPay QR code.

    - `next_action.promptpay_display_qr_code.image_url_png` (string)
      The PNG path used to render the QR code, can be used as the source in an HTML img tag

    - `next_action.promptpay_display_qr_code.image_url_svg` (string)
      The SVG path used to render the QR code, can be used as the source in an HTML img tag

  - `next_action.redirect_to_url` (object, nullable)
    Contains instructions for authenticating a payment by redirecting your customer to another page or application.

    - `next_action.redirect_to_url.return_url` (string, nullable)
      If the customer does not exit their browser while authenticating, they will be redirected to this specified URL after completion.

    - `next_action.redirect_to_url.url` (string, nullable)
      The URL you must redirect your customer to in order to authenticate the payment.

  - `next_action.swish_handle_redirect_or_display_qr_code` (object, nullable)
    The field that contains Swish QR code and mobile redirect info

    - `next_action.swish_handle_redirect_or_display_qr_code.hosted_instructions_url` (string)
      The URL to the hosted Swish instructions page, which allows customers to view the QR code.

    - `next_action.swish_handle_redirect_or_display_qr_code.qr_code` (object)
      The field that contains Swish QR code info

      - `next_action.swish_handle_redirect_or_display_qr_code.qr_code.data` (string)
        The raw data string used to generate QR code, it should be used together with QR code library.

      - `next_action.swish_handle_redirect_or_display_qr_code.qr_code.image_url_png` (string)
        The image_url_png string used to render QR code

      - `next_action.swish_handle_redirect_or_display_qr_code.qr_code.image_url_svg` (string)
        The image_url_svg string used to render QR code

  - `next_action.type` (string)
    Type of the next action to perform. Refer to the other child attributes under `next_action` for available values. Examples include: `redirect_to_url`, `use_stripe_sdk`, `alipay_handle_redirect`, `oxxo_display_details`, or `verify_with_microdeposits`.

  - `next_action.upi_handle_redirect_or_display_qr_code` (object, nullable)
    The field that contains UPI QR code and mobile redirect info

    - `next_action.upi_handle_redirect_or_display_qr_code.hosted_instructions_url` (string)
      The URL to the hosted UPI instructions page, which allows customers to view the QR code.

    - `next_action.upi_handle_redirect_or_display_qr_code.qr_code` (object)
      The field that contains UPI QR code info

      - `next_action.upi_handle_redirect_or_display_qr_code.qr_code.expires_at` (timestamp)
        The date (unix timestamp) when the QR code expires.

      - `next_action.upi_handle_redirect_or_display_qr_code.qr_code.image_url_png` (string)
        The image_url_png string used to render QR code

      - `next_action.upi_handle_redirect_or_display_qr_code.qr_code.image_url_svg` (string)
        The image_url_svg string used to render QR code

  - `next_action.use_stripe_sdk` (object, nullable)
    When confirming a PaymentIntent with Stripe.js, Stripe.js depends on the contents of this dictionary to invoke authentication flows. The shape of the contents is subject to change and is only intended to be used by Stripe.js.

  - `next_action.verify_with_microdeposits` (object, nullable)
    Contains details describing microdeposits verification flow.

    - `next_action.verify_with_microdeposits.arrival_date` (timestamp)
      The timestamp when the microdeposits are expected to land.

    - `next_action.verify_with_microdeposits.hosted_verification_url` (string)
      The URL for the hosted verification page, which allows customers to verify their bank account.

    - `next_action.verify_with_microdeposits.microdeposit_type` (enum, nullable)
      The type of the microdeposit sent to the customer. Used to distinguish between different verification methods.

  - `next_action.wechat_pay_display_qr_code` (object, nullable)
    The field that contains WeChat Pay QR code info

    - `next_action.wechat_pay_display_qr_code.data` (string)
      The data being used to generate QR code

    - `next_action.wechat_pay_display_qr_code.hosted_instructions_url` (string)
      The URL to the hosted WeChat Pay instructions page, which allows customers to view the WeChat Pay QR code.

    - `next_action.wechat_pay_display_qr_code.image_data_url` (string)
      The base64 image data for a pre-generated QR code

    - `next_action.wechat_pay_display_qr_code.image_url_png` (string)
      The image_url_png string used to render QR code

    - `next_action.wechat_pay_display_qr_code.image_url_svg` (string)
      The image_url_svg string used to render QR code

  - `next_action.wechat_pay_redirect_to_android_app` (object, nullable)
    Info required for android app to app redirect

    - `next_action.wechat_pay_redirect_to_android_app.app_id` (string)
      app_id is the APP ID registered on WeChat open platform

    - `next_action.wechat_pay_redirect_to_android_app.nonce_str` (string)
      nonce_str is a random string

    - `next_action.wechat_pay_redirect_to_android_app.package` (string)
      package is static value

    - `next_action.wechat_pay_redirect_to_android_app.partner_id` (string)
      an unique merchant ID assigned by WeChat Pay

    - `next_action.wechat_pay_redirect_to_android_app.prepay_id` (string)
      an unique trading ID assigned by WeChat Pay

    - `next_action.wechat_pay_redirect_to_android_app.sign` (string)
      A signature

    - `next_action.wechat_pay_redirect_to_android_app.timestamp` (string)
      Specifies the current time in epoch format

  - `next_action.wechat_pay_redirect_to_ios_app` (object, nullable)
    Info required for iOS app to app redirect

    - `next_action.wechat_pay_redirect_to_ios_app.native_url` (string)
      An universal link that redirect to WeChat Pay app

- `on_behalf_of` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  You can specify the settlement merchant as the connected account using the `on_behalf_of` attribute on the charge. See the PaymentIntents [use case for connected accounts](https://docs.stripe.com/payments/connected-accounts.md) for details.

- `payment_details` (object, nullable)
  Payment details for this PaymentIntent.

  - `payment_details.customer_reference` (string, nullable)
    A unique value to identify the customer. This field is available only for card payments.

    This field is truncated to 25 alphanumeric characters, excluding spaces, before being sent to card networks.

  - `payment_details.order_reference` (string, nullable)
    A unique value assigned by the business to identify the transaction. Required for L2 and L3 rates.

    For Cards, this field is truncated to 25 alphanumeric characters, excluding spaces, before being sent to card networks. For Klarna, this field is truncated to 255 characters and is visible to customers when they view the order in the Klarna app.

- `payment_method` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the payment method used in this PaymentIntent.

- `payment_method_configuration_details` (object, nullable)
  Information about the [payment method configuration](https://docs.stripe.com/docs/api/payment_method_configurations.md) used for this PaymentIntent.

  - `payment_method_configuration_details.id` (string)
    ID of the payment method configuration used.

  - `payment_method_configuration_details.parent` (string, nullable)
    ID of the parent payment method configuration used.

- `payment_method_options` (object, nullable)
  Payment-method-specific configuration for this PaymentIntent.

  - `payment_method_options.acss_debit` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `acss_debit`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.acss_debit.mandate_options` (object, nullable)
      Additional fields for Mandate creation

      - `payment_method_options.acss_debit.mandate_options.custom_mandate_url` (string, nullable)
        A URL for custom mandate text

      - `payment_method_options.acss_debit.mandate_options.interval_description` (string, nullable)
        Description of the interval. Only required if the ‘payment_schedule’ parameter is ‘interval’ or ‘combined’.

      - `payment_method_options.acss_debit.mandate_options.payment_schedule` (enum, nullable)
        Payment schedule for the mandate.
Possible enum values:
        - `combined`
          Payments can be initiated at a pre-defined interval or sporadically

        - `interval`
          Payments are initiated at a regular pre-defined interval

        - `sporadic`
          Payments are initiated sporadically

      - `payment_method_options.acss_debit.mandate_options.transaction_type` (enum, nullable)
        Transaction type of the mandate.
Possible enum values:
        - `business`
          Transactions are made for business reasons

        - `personal`
          Transactions are made for personal reasons

    - `payment_method_options.acss_debit.setup_future_usage` (enum, nullable)
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

    - `payment_method_options.acss_debit.target_date` (string, nullable)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

    - `payment_method_options.acss_debit.verification_method` (enum, nullable)
      Bank account verification method. The default value is `automatic`.
Possible enum values:
      - `automatic`
        Instant verification with fallback to microdeposits.

      - `instant`
        Instant verification.

      - `microdeposits`
        Verification using microdeposits.

  - `payment_method_options.affirm` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `affirm`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.affirm.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.affirm.preferred_locale` (string, nullable)
      Preferred language of the Affirm authorization page that the customer is redirected to.

      The maximum length is 30 characters.

    - `payment_method_options.affirm.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.afterpay_clearpay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `afterpay_clearpay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.afterpay_clearpay.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.afterpay_clearpay.reference` (string, nullable)
      An internal identifier or reference that this payment corresponds to. You must limit the identifier to 128 characters, and it can only contain letters, numbers, underscores, backslashes, and dashes. This field differs from the statement descriptor and item name.

    - `payment_method_options.afterpay_clearpay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.alipay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `alipay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.alipay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.alma` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `alma`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.alma.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.amazon_pay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `amazon_pay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.amazon_pay.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.amazon_pay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.au_becs_debit` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `au_becs_debit`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.au_becs_debit.setup_future_usage` (enum, nullable)
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

    - `payment_method_options.au_becs_debit.target_date` (string, nullable)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.bacs_debit` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `bacs_debit`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.bacs_debit.mandate_options` (object, nullable)
      Additional fields for Mandate creation

      - `payment_method_options.bacs_debit.mandate_options.reference_prefix` (string, nullable)
        Prefix used to generate the Mandate reference. Must be at most 12 characters long. Must consist of only uppercase letters, numbers, spaces, or the following special characters: ‘/’, ‘_’, ‘-’, ‘&’, ‘.’. Cannot begin with ‘DDIC’ or ‘STRIPE’.

    - `payment_method_options.bacs_debit.setup_future_usage` (enum, nullable)
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

    - `payment_method_options.bacs_debit.target_date` (string, nullable)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.bancontact` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `bancontact`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.bancontact.preferred_language` (enum)
      Preferred language of the Bancontact authorization page that the customer is redirected to.
Possible enum values:
      - `de`
      - `en`
      - `fr`
      - `nl`

    - `payment_method_options.bancontact.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.billie` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `billie`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.billie.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.bizum` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `bizum`, this hash contains the configurations that will be applied to each payment attempt of that type.

  - `payment_method_options.blik` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `blik`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.blik.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.boleto` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `boleto`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.boleto.expires_after_days` (integer)
      The number of calendar days before a Boleto voucher expires. For example, if you create a Boleto voucher on Monday and you set expires_after_days to 2, the Boleto voucher will expire on Wednesday at 23:59 America/Sao_Paulo time.

    - `payment_method_options.boleto.setup_future_usage` (enum, nullable)
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

  - `payment_method_options.card` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `card`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.card.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.card.installments` (object, nullable)
      Installment details for this payment.

      For more information, see the [installments integration guide](https://docs.stripe.com/docs/payments/installments.md).

      - `payment_method_options.card.installments.available_plans` (array of objects, nullable)
        Installment plans that may be selected for this PaymentIntent.

        - `payment_method_options.card.installments.available_plans.count` (integer, nullable)
          For `fixed_count` installment plans, this is the number of installment payments your customer will make to their credit card.

        - `payment_method_options.card.installments.available_plans.interval` (enum, nullable)
          For `fixed_count` installment plans, this is the interval between installment payments your customer will make to their credit card. One of `month`.
Possible enum values:
          - `month`

        - `payment_method_options.card.installments.available_plans.type` (enum)
          Type of installment plan, one of `fixed_count`, `bonus`, or `revolving`.
Possible enum values:
          - `bonus`
            An installment plan used in Japan, where the customer defers payment to a later date that aligns with their salary bonus.

          - `fixed_count`
            An installment plan where the number of installment payments is fixed and known at the time of purchase.

          - `revolving`
            An installment plan used in Japan, where the customer pays a certain amount each month, and the remaining balance rolls over to the next month.

      - `payment_method_options.card.installments.enabled` (boolean)
        Whether Installments are enabled for this PaymentIntent.

      - `payment_method_options.card.installments.plan` (object, nullable)
        Installment plan selected for this PaymentIntent.

        - `payment_method_options.card.installments.plan.count` (integer, nullable)
          For `fixed_count` installment plans, this is the number of installment payments your customer will make to their credit card.

        - `payment_method_options.card.installments.plan.interval` (enum, nullable)
          For `fixed_count` installment plans, this is the interval between installment payments your customer will make to their credit card. One of `month`.
Possible enum values:
          - `month`

        - `payment_method_options.card.installments.plan.type` (enum)
          Type of installment plan, one of `fixed_count`, `bonus`, or `revolving`.
Possible enum values:
          - `bonus`
            An installment plan used in Japan, where the customer defers payment to a later date that aligns with their salary bonus.

          - `fixed_count`
            An installment plan where the number of installment payments is fixed and known at the time of purchase.

          - `revolving`
            An installment plan used in Japan, where the customer pays a certain amount each month, and the remaining balance rolls over to the next month.

    - `payment_method_options.card.mandate_options` (object, nullable)
      Configuration options for setting up an eMandate for cards issued in India.

      - `payment_method_options.card.mandate_options.amount` (integer)
        Amount to be charged for future payments, specified in the presentment currency.

      - `payment_method_options.card.mandate_options.amount_type` (enum)
        One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.
Possible enum values:
        - `fixed`
        - `maximum`

      - `payment_method_options.card.mandate_options.description` (string, nullable)
        A description of the mandate or subscription that is meant to be displayed to the customer.

        The maximum length is 200 characters.

      - `payment_method_options.card.mandate_options.end_date` (timestamp, nullable)
        End date of the mandate or subscription. If not provided, the mandate will be active until canceled. If provided, end date should be after start date.

      - `payment_method_options.card.mandate_options.interval` (enum)
        Specifies payment frequency. One of `day`, `week`, `month`, `year`, or `sporadic`.
Possible enum values:
        - `day`
        - `month`
        - `sporadic`
        - `week`
        - `year`

      - `payment_method_options.card.mandate_options.interval_count` (integer, nullable)
        The number of intervals between payments. For example, `interval=month` and `interval_count=3` indicates one payment every three months. Maximum of one year interval allowed (1 year, 12 months, or 52 weeks). This parameter is optional when `interval=sporadic`.

      - `payment_method_options.card.mandate_options.reference` (string)
        Unique identifier for the mandate or subscription.

        The maximum length is 80 characters.

      - `payment_method_options.card.mandate_options.start_date` (timestamp)
        Start date of the mandate or subscription. Start date should not be lesser than yesterday.

      - `payment_method_options.card.mandate_options.supported_types` (array of enums, nullable)
        Specifies the type of mandates supported. Possible values are `india`.
Possible enum values:
        - `india`

    - `payment_method_options.card.network` (enum, nullable)
      Selected network to process this payment intent on. Depends on the available networks of the card attached to the payment intent. Can be only set confirm-time.
Possible enum values:
      - `amex`
      - `cartes_bancaires`
      - `diners`
      - `discover`
      - `eftpos_au`
      - `girocard`
      - `interac`
      - `jcb`
      - `link`
      - `mastercard`
      - `unionpay`
      - `unknown`
      - `visa`

    - `payment_method_options.card.request_extended_authorization` (enum, nullable)
      Request ability to [capture beyond the standard authorization validity window](https://docs.stripe.com/docs/payments/extended-authorization.md) for this PaymentIntent.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to extend the capture window when eligible for extended authorization.

      - `never`
        Use `never` if you don’t want to extend the capture window.

    - `payment_method_options.card.request_incremental_authorization` (enum, nullable)
      Request ability to [increment the authorization](https://docs.stripe.com/docs/payments/incremental-authorization.md) for this PaymentIntent.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to increment the authorization on the PaymentIntent when eligible.

      - `never`
        Use `never` if you don’t want to increment the authorization on the PaymentIntent.

    - `payment_method_options.card.request_multicapture` (enum, nullable)
      Request ability to make [multiple captures](https://docs.stripe.com/docs/payments/multicapture.md) for this PaymentIntent.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to use multicapture when eligible.

      - `never`
        Use `never` if you don’t want to use multicapture.

    - `payment_method_options.card.request_overcapture` (enum, nullable)
      Request ability to [overcapture](https://docs.stripe.com/docs/payments/overcapture.md) for this PaymentIntent.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to overcapture the payment when eligible.

      - `never`
        Use `never` if you don’t want to overcapture the payment.

    - `payment_method_options.card.request_three_d_secure` (enum, nullable)
      We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://docs.stripe.com/docs/strong-customer-authentication.md). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. If not provided, this value defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://docs.stripe.com/docs/payments/3d-secure/authentication-flow.md#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
Possible enum values:
      - `any`
        Use `any` to manually request 3DS with a preference for a `frictionless` flow, increasing the likelihood of the authentication being completed without any additional input from the customer. 3DS will always be attempted if it is supported for the card, but Stripe can’t guarantee your preference because the issuer determines the ultimate authentication flow. To learn more about 3DS flows, read our [guide](https://stripe.com/guides/3d-secure-2#frictionless-authentication).

      - `automatic`
        (Default) Our SCA Engine automatically prompts your customers for authentication based on risk level and other requirements.

      - `challenge`
        Use `challenge` to request 3DS with a preference for a `challenge` flow, where the customer must respond to a prompt for active authentication. Stripe can’t guarantee your preference because the issuer determines the ultimate authentication flow. To learn more about 3DS flows, read our [guide](https://stripe.com/guides/3d-secure-2#frictionless-authentication).

    - `payment_method_options.card.require_cvc_recollection` (boolean, nullable)
      When enabled, using a card that is attached to a customer will require the CVC to be provided again (i.e. using the cvc_token parameter).

    - `payment_method_options.card.setup_future_usage` (enum, nullable)
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

    - `payment_method_options.card.statement_descriptor_suffix_kana` (string, nullable)
      Provides information about a card payment that customers see on their statements. Concatenated with the Kana prefix (shortened Kana descriptor) or Kana statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 22 characters. On card statements, the *concatenation* of both prefix and suffix (including separators) will appear truncated to 22 characters.

    - `payment_method_options.card.statement_descriptor_suffix_kanji` (string, nullable)
      Provides information about a card payment that customers see on their statements. Concatenated with the Kanji prefix (shortened Kanji descriptor) or Kanji statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 17 characters. On card statements, the *concatenation* of both prefix and suffix (including separators) will appear truncated to 17 characters.

    - `payment_method_options.card.surcharge` (object, nullable)
      Details about the availability and maximum amount for surcharging on this PI.

      - `payment_method_options.card.surcharge.maximum_amount` (integer, nullable)
        The maximum surcharge amount allowed for this PaymentIntent.

      - `payment_method_options.card.surcharge.status` (enum)
        Surcharge availability
Possible enum values:
        - `available`
          Surcharging is available for this payment method

        - `unavailable`
          Surcharging is not available for this payment method

  - `payment_method_options.card_present` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `card_present`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.card_present.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

      - `manual_preferred`
        Use `manual_preferred` if you prefer `manual` capture_method but support falling back to `automatic` based on the presented payment method.

    - `payment_method_options.card_present.request_extended_authorization` (boolean, nullable)
      Request ability to capture this payment beyond the standard [authorization validity window](https://docs.stripe.com/docs/terminal/features/extended-authorizations.md#authorization-validity)

    - `payment_method_options.card_present.request_incremental_authorization_support` (boolean, nullable)
      Request ability to [increment](https://docs.stripe.com/docs/terminal/features/incremental-authorizations.md) this PaymentIntent if the combination of MCC and card brand is eligible. Check [incremental_authorization_supported](https://docs.stripe.com/docs/api/charges/object.md#charge_object-payment_method_details-card_present-incremental_authorization_supported) in the [Confirm](https://docs.stripe.com/docs/api/payment_intents/confirm.md) response to verify support.

    - `payment_method_options.card_present.routing` (object, nullable)
      Network routing priority on co-branded EMV cards supporting domestic debit and international card schemes.

      - `payment_method_options.card_present.routing.requested_priority` (enum, nullable)
        Requested routing priority
Possible enum values:
        - `domestic`
          Prioritize domestic debit network routing on payment method collection

        - `international`
          Prioritize international network routing on payment method collection

  - `payment_method_options.cashapp` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `cashapp`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.cashapp.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.cashapp.setup_future_usage` (enum, nullable)
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

  - `payment_method_options.crypto` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `crypto`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.crypto.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.customer_balance` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `customer_balance`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.customer_balance.bank_transfer` (object, nullable)
      Configuration for the bank transfer funding type, if the `funding_type` is set to `bank_transfer`.

      - `payment_method_options.customer_balance.bank_transfer.eu_bank_transfer` (object, nullable)
        Configuration for eu_bank_transfer

        - `payment_method_options.customer_balance.bank_transfer.eu_bank_transfer.country` (enum)
          The desired country code of the bank account information. Permitted values include: `DE`, `FR`, `IE`, or `NL`.
Possible enum values:
          - `BE`
          - `DE`
          - `ES`
          - `FR`
          - `IE`
          - `NL`

      - `payment_method_options.customer_balance.bank_transfer.requested_address_types` (array of enums, nullable)
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

      - `payment_method_options.customer_balance.bank_transfer.type` (enum, nullable)
        The bank transfer type that this PaymentIntent is allowed to use for funding Permitted values include: `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`, `mx_bank_transfer`, or `us_bank_transfer`.
Possible enum values:
        - `eu_bank_transfer`
          A bank transfer of type eu_bank_transfer

        - `gb_bank_transfer`
          A bank transfer of type gb_bank_transfer

        - `jp_bank_transfer`
          A bank transfer of type jp_bank_transfer

        - `mx_bank_transfer`
          A bank transfer of type mx_bank_transfer

        - `us_bank_transfer`
          A bank transfer of type us_bank_transfer

    - `payment_method_options.customer_balance.funding_type` (enum, nullable)
      The funding method type to be used when there are not enough funds in the customer balance. Permitted values include: `bank_transfer`.
Possible enum values:
      - `bank_transfer`

    - `payment_method_options.customer_balance.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.eps` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `eps`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.eps.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.fpx` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `fpx`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.fpx.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.giropay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `giropay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.giropay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.grabpay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `grabpay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.grabpay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.ideal` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `ideal`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.ideal.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.interac_present` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `interac_present`, this hash contains the configurations that will be applied to each payment attempt of that type.

  - `payment_method_options.kakao_pay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `kakao_pay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.kakao_pay.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.kakao_pay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.klarna` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `klarna`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.klarna.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.klarna.preferred_locale` (string, nullable)
      Preferred locale of the Klarna checkout page that the customer is redirected to.

    - `payment_method_options.klarna.setup_future_usage` (enum, nullable)
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

  - `payment_method_options.konbini` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `konbini`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.konbini.confirmation_number` (string, nullable)
      An optional 10 to 11 digit numeric-only string determining the confirmation code at applicable convenience stores.

    - `payment_method_options.konbini.expires_after_days` (integer, nullable)
      The number of calendar days (between 1 and 60) after which Konbini payment instructions will expire. For example, if a PaymentIntent is confirmed with Konbini and `expires_after_days` set to 2 on Monday JST, the instructions will expire on Wednesday 23:59:59 JST.

    - `payment_method_options.konbini.expires_at` (timestamp, nullable)
      The timestamp at which the Konbini payment instructions will expire. Only one of `expires_after_days` or `expires_at` may be set.

    - `payment_method_options.konbini.product_description` (string, nullable)
      A product descriptor of up to 22 characters, which will appear to customers at the convenience store.

    - `payment_method_options.konbini.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.kr_card` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `kr_card`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.kr_card.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.kr_card.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.link` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `link`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.link.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.link.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.mb_way` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `mb_way`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.mb_way.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.mobilepay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `mobilepay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.mobilepay.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.mobilepay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.multibanco` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `multibanco`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.multibanco.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.naver_pay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `naver_pay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.naver_pay.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.naver_pay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.nz_bank_account` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `nz_bank_account`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.nz_bank_account.setup_future_usage` (enum, nullable)
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

    - `payment_method_options.nz_bank_account.target_date` (string, nullable)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.oxxo` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `oxxo`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.oxxo.expires_after_days` (integer)
      The number of calendar days before an OXXO invoice expires. For example, if you create an OXXO invoice on Monday and you set expires_after_days to 2, the OXXO invoice will expire on Wednesday at 23:59 America/Mexico_City time.

    - `payment_method_options.oxxo.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.p24` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `p24`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.p24.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.pay_by_bank` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `pay_by_bank`, this hash contains the configurations that will be applied to each payment attempt of that type.

  - `payment_method_options.payco` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `payco`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.payco.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.paynow` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `paynow`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.paynow.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.paypal` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `paypal`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.paypal.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.paypal.preferred_locale` (string, nullable)
      Preferred locale of the PayPal checkout page that the customer is redirected to.

    - `payment_method_options.paypal.reference` (string, nullable)
      A reference of the PayPal transaction visible to customer which is mapped to PayPal’s invoice ID. This must be a globally unique ID if you have configured in your PayPal settings to block multiple payments per invoice ID.

    - `payment_method_options.paypal.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.paypay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `paypay`, this hash contains the configurations that will be applied to each payment attempt of that type.

  - `payment_method_options.payto` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `payto`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.payto.mandate_options` (object, nullable)
      Additional fields for Mandate creation. Only `purpose` field is configurable for PayTo PaymentIntent with `setup_future_usage=none`. Other fields are only applicable to PayTo PaymentIntent with `setup_future_usage=off_session`

      - `payment_method_options.payto.mandate_options.amount` (integer, nullable)
        Amount that will be collected. It is required when `amount_type` is `fixed`.

      - `payment_method_options.payto.mandate_options.amount_type` (enum, nullable)
        The type of amount that will be collected. The amount charged must be exact or up to the value of `amount` param for `fixed` or `maximum` type respectively. Defaults to `maximum`.
Possible enum values:
        - `fixed`
          The amount is the exact amount that will be charged.

        - `maximum`
          The amount is the maximum amount that can be charged.

      - `payment_method_options.payto.mandate_options.end_date` (string, nullable)
        Date, in YYYY-MM-DD format, after which payments will not be collected. Defaults to no end date.

      - `payment_method_options.payto.mandate_options.payment_schedule` (enum, nullable)
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

      - `payment_method_options.payto.mandate_options.payments_per_period` (integer, nullable)
        The number of payments that will be made during a payment period. Defaults to 1 except for when `payment_schedule` is `adhoc`. In that case, it defaults to no limit.

      - `payment_method_options.payto.mandate_options.purpose` (enum, nullable)
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

    - `payment_method_options.payto.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.pix` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `pix`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.pix.amount_includes_iof` (enum, nullable)
      Determines if the amount includes the IOF tax.
Possible enum values:
      - `always`
        The IOF tax is included in the amount.

      - `never`
        The IOF tax is not included in the amount.

    - `payment_method_options.pix.expires_after_seconds` (integer, nullable)
      The number of seconds (between 10 and 1209600) after which Pix payment will expire.

    - `payment_method_options.pix.expires_at` (integer, nullable)
      The timestamp at which the Pix expires.

    - `payment_method_options.pix.mandate_options` (object, nullable)
      Additional fields for mandate creation. Only applicable when `setup_future_usage=off_session`.

      - `payment_method_options.pix.mandate_options.amount` (integer, nullable)
        Amount to be charged for future payments.

      - `payment_method_options.pix.mandate_options.amount_includes_iof` (enum, nullable)
        Determines if the amount includes the IOF tax.
Possible enum values:
        - `always`
          The IOF tax is included in the amount.

        - `never`
          The IOF tax is not included in the amount.

      - `payment_method_options.pix.mandate_options.amount_type` (enum, nullable)
        Type of amount.
Possible enum values:
        - `fixed`
          The exact amount for future payments.

        - `maximum`
          The maximum amount for future payments.

      - `payment_method_options.pix.mandate_options.currency` (enum, nullable)
        Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.

      - `payment_method_options.pix.mandate_options.end_date` (string, nullable)
        Date when the mandate expires and no further payments will be charged, in `YYYY-MM-DD`.

      - `payment_method_options.pix.mandate_options.payment_schedule` (enum, nullable)
        Schedule at which the future payments will be charged.
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

      - `payment_method_options.pix.mandate_options.reference` (string, nullable)
        Subscription name displayed to buyers in their bank app.

      - `payment_method_options.pix.mandate_options.start_date` (string, nullable)
        Start date of the mandate, in `YYYY-MM-DD`.

    - `payment_method_options.pix.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.promptpay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `promptpay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.promptpay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.revolut_pay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `revolut_pay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.revolut_pay.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.revolut_pay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.samsung_pay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `samsung_pay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.samsung_pay.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.satispay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `satispay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.satispay.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.satispay.setup_future_usage` (enum, nullable)
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

  - `payment_method_options.scalapay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `scalapay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.scalapay.capture_method` (enum, nullable)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.sepa_debit` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `sepa_debit`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.sepa_debit.mandate_options` (object, nullable)
      Additional fields for Mandate creation

      - `payment_method_options.sepa_debit.mandate_options.reference_prefix` (string, nullable)
        Prefix used to generate the Mandate reference. Must be at most 12 characters long. Must consist of only uppercase letters, numbers, spaces, or the following special characters: ‘/’, ‘_’, ‘-’, ‘&’, ‘.’. Cannot begin with ‘STRIPE’.

    - `payment_method_options.sepa_debit.setup_future_usage` (enum, nullable)
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

    - `payment_method_options.sepa_debit.target_date` (string, nullable)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.sofort` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `sofort`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.sofort.preferred_language` (enum, nullable)
      Preferred language of the SOFORT authorization page that the customer is redirected to.
Possible enum values:
      - `de`
      - `en`
      - `es`
      - `fr`
      - `it`
      - `nl`
      - `pl`

    - `payment_method_options.sofort.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.swish` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `swish`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.swish.reference` (string, nullable)
      A reference for this payment to be displayed in the Swish app.

      The maximum length is 35 characters.

    - `payment_method_options.swish.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.twint` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `twint`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.twint.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.upi` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `upi`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.upi.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

  - `payment_method_options.us_bank_account` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `us_bank_account`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.us_bank_account.financial_connections` (object, nullable)
      Additional fields for Financial Connections Session creation

      - `payment_method_options.us_bank_account.financial_connections.filters` (object, nullable)
        Filter the list of accounts that are allowed to be linked.

        - `payment_method_options.us_bank_account.financial_connections.filters.account_subcategories` (array of enums, nullable)
          The account subcategories to use to filter for possible accounts to link. Valid subcategories are `checking` and `savings`.
Possible enum values:
          - `checking`
            Bank account subcategory is checking

          - `savings`
            Bank account subcategory is savings

      - `payment_method_options.us_bank_account.financial_connections.permissions` (array of enums, nullable)
        The list of permissions to request. The `payment_method` permission must be included.
Possible enum values:
        - `balances`
          Allows accessing balance data from the account.

        - `ownership`
          Allows accessing ownership data from the account.

        - `payment_method`
          Allows the creation of a payment method from the account.

        - `transactions`
          Allows accessing transactions data from the account.

      - `payment_method_options.us_bank_account.financial_connections.prefetch` (array of enums, nullable)
        Data features requested to be retrieved upon account creation.
Possible enum values:
        - `balances`
          Requests to prefetch balance data on accounts collected in this session.

        - `ownership`
          Requests to prefetch ownership data on accounts collected in this session.

        - `transactions`
          Requests to prefetch transaction data on accounts collected in this session.

      - `payment_method_options.us_bank_account.financial_connections.return_url` (string, nullable)
        For webview integrations only. Upon completing OAuth login in the native browser, the user will be redirected to this URL to return to your app.

    - `payment_method_options.us_bank_account.mandate_options` (object, nullable)
      Additional fields for Mandate creation

      - `payment_method_options.us_bank_account.mandate_options.collection_method` (enum, nullable)
        Mandate collection method
Possible enum values:
        - `paper`
          Mandate customer acceptance was collected using a paper document

    - `payment_method_options.us_bank_account.setup_future_usage` (enum, nullable)
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

    - `payment_method_options.us_bank_account.target_date` (string, nullable)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

    - `payment_method_options.us_bank_account.transaction_purpose` (enum, nullable)
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

    - `payment_method_options.us_bank_account.verification_method` (enum, nullable)
      Bank account verification method. The default value is `automatic`.
Possible enum values:
      - `automatic`
        Instant verification with fallback to microdeposits.

      - `instant`
        Instant verification only.

      - `microdeposits`
        Verification using microdeposits. Cannot be used with Stripe Checkout, Hosted Invoices, or Payment Element.

  - `payment_method_options.wechat_pay` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `wechat_pay`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.wechat_pay.app_id` (string, nullable)
      The app ID registered with WeChat Pay. Only required when client is ios or android.

    - `payment_method_options.wechat_pay.client` (enum, nullable)
      The client type that the end customer will pay from
Possible enum values:
      - `android`
        The end customer will pay from an Android app

      - `ios`
        The end customer will pay from an iOS app

      - `web`
        The end customer will pay from web browser

    - `payment_method_options.wechat_pay.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.zip` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `zip`, this hash contains the configurations that will be applied to each payment attempt of that type.

    - `payment_method_options.zip.setup_future_usage` (enum, nullable)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

- `payment_method_types` (array of strings)
  The list of payment method types (e.g. card) that this PaymentIntent is allowed to use. A comprehensive list of valid payment method types can be found [here](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-type).

- `presentment_details` (object, nullable)
  A hash containing information about the currency presentation to the customer, including the displayed currency and amount used for conversion from the integration currency.

  - `presentment_details.presentment_amount` (integer)
    Amount intended to be collected by this payment, denominated in `presentment_currency`.

  - `presentment_details.presentment_currency` (string)
    Currency presented to the customer during payment.

- `processing` (object, nullable)
  If present, this property tells you about the processing state of the payment.

  - `processing.card` (object, nullable)
    If the PaymentIntent’s payment_method_types includes `card`, this hash contains the details on the `processing` state of the payment.

    - `processing.card.customer_notification` (object, nullable)
      For recurring payments of Indian cards, this hash contains details on whether customer approval is required, and until when the payment will be in `processing` state

      - `processing.card.customer_notification.approval_requested` (boolean, nullable)
        Whether customer approval has been requested for this payment. For payments greater than INR 15000 or mandate amount, the customer must provide explicit approval of the payment with their bank.

      - `processing.card.customer_notification.completes_at` (timestamp, nullable)
        If customer approval is required, they need to provide approval before this time.

  - `processing.type` (enum)
    Type of the payment method for which payment is in `processing` state, one of `card`.
Possible enum values:
    - `card`

- `receipt_email` (string, nullable)
  Email address that the receipt for the resulting payment will be sent to. If `receipt_email` is specified for a payment in live mode, a receipt will be sent regardless of your [email settings](https://dashboard.stripe.com/account/emails).

- `review` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the review associated with this PaymentIntent, if any.

- `setup_future_usage` (enum, nullable)
  Indicates that you intend to make future payments with this PaymentIntent’s payment method.

  If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

  If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

  When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
  - `off_session`
    Use `off_session` if your customer may or may not be present in your checkout flow.

  - `on_session`
    Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

- `shipping` (object, nullable)
  Shipping information for this PaymentIntent.

  - `shipping.address` (object)
    Shipping address.

    - `shipping.address.city` (string, nullable)
      City, district, suburb, town, or village.

    - `shipping.address.country` (string, nullable)
      Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

    - `shipping.address.line1` (string, nullable)
      Address line 1, such as the street, PO Box, or company name.

    - `shipping.address.line2` (string, nullable)
      Address line 2, such as the apartment, suite, unit, or building.

    - `shipping.address.postal_code` (string, nullable)
      ZIP or postal code.

    - `shipping.address.state` (string, nullable)
      State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

  - `shipping.carrier` (string, nullable)
    The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.

  - `shipping.name` (string)
    Recipient name.

  - `shipping.phone` (string, nullable)
    Recipient phone (including extension).

  - `shipping.tracking_number` (string, nullable)
    The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.

- `statement_descriptor` (string, nullable)
  Text that appears on the customer’s statement as the statement descriptor for a non-card charge. This value overrides the account’s default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors.md).

  Setting this value for a card charge returns an error. For card charges, set the [statement_descriptor_suffix](https://docs.stripe.com/get-started/account/statement-descriptors.md#dynamic) instead.

- `statement_descriptor_suffix` (string, nullable)
  Provides information about a card charge. Concatenated to the account’s [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors.md#static) to form the complete statement descriptor that appears on the customer’s statement.

- `status` (enum)
  Status of this PaymentIntent, one of `requires_payment_method`, `requires_confirmation`, `requires_action`, `processing`, `requires_capture`, `canceled`, or `succeeded`. Read more about each PaymentIntent [status](https://docs.stripe.com/docs/payments/intents.md#intent-statuses).
Possible enum values:
  - `canceled`
    The PaymentIntent has been canceled.

  - `processing`
    The PaymentIntent is currently being processed.

  - `requires_action`
    The PaymentIntent requires additional action from the customer.

  - `requires_capture`
    The PaymentIntent has been confirmed and requires capture.

  - `requires_confirmation`
    The PaymentIntent requires confirmation.

  - `requires_payment_method`
    The PaymentIntent requires a payment method to be attached.

  - `succeeded`
    The PaymentIntent has succeeded.

- `transfer_data` (object, nullable)
  The data that automatically creates a Transfer after the payment finalizes. Learn more about the [use case for connected accounts](https://docs.stripe.com/docs/payments/connected-accounts.md).

  - `transfer_data.amount` (integer, nullable)
    The amount transferred to the destination account. This transfer will occur automatically after the payment succeeds. If no amount is specified, by default the entire payment amount is transferred to the destination account. The amount must be less than or equal to the [amount](https://docs.stripe.com/docs/api/payment_intents/object.md#payment_intent_object-amount), and must be a positive integer representing how much to transfer in the smallest currency unit (e.g., 100 cents to charge $1.00).

  - `transfer_data.description` (string, nullable)
    An arbitrary string attached to the transfer. Often useful for displaying to users.

  - `transfer_data.destination` (string, expandable (can be expanded into an object with the `expand` request parameter))
    The account (if any) that the payment is attributed to for tax reporting, and where funds from the payment are transferred to after payment success.

  - `transfer_data.metadata` (object, nullable)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

  - `transfer_data.payment_data` (object, nullable)
    The data with which to populate the destination payment.

    - `transfer_data.payment_data.description` (string, nullable)
      An arbitrary string attached to the destination payment. Often useful for displaying to users.

    - `transfer_data.payment_data.metadata` (object, nullable)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

- `transfer_group` (string, nullable)
  A string that identifies the resulting payment as part of a group. Learn more about the [use case for connected accounts](https://docs.stripe.com/docs/connect/separate-charges-and-transfers.md).
