# Changelog

Keep track of changes and upgrades to the Stripe API.

# Dahlia
[Learn what's changing in Dahlia](https://docs.stripe.com/changelog/dahlia.md)
## 2026-05-27.dahlia

### Billing

| Title                                                                                                                                                                                             | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds discount eligibility options for add-on invoice items on Subscriptions and Preview Invoice APIs](https://docs.stripe.com/changelog/dahlia/2026-05-27/invoice-items-discount-eligibility.md) | Billing           | Non-breaking     | api      |
| [Adds amount paid off Stripe property to Invoice object](https://docs.stripe.com/changelog/dahlia/2026-05-27/invoice-object-amount-paid-off-stripe-property.md)                                   | Invoicing         | Non-breaking     | api      |
| [Adds billing schedules to enable prebilling on subscriptions](https://docs.stripe.com/changelog/dahlia/2026-05-27/subscriptions-billing-schedules.md)                                            | Billing           | Non-breaking     | api      |
| [Adds discount and discounts properties to pending subscription updates](https://docs.stripe.com/changelog/dahlia/2026-05-27/pending-subscription-updates-discount-and-discounts-properties.md)   | Sigma, Billing    | Non-breaking     | api      |
| [Adds metadata support to pending subscription updates](https://docs.stripe.com/changelog/dahlia/2026-05-27/pending-subscription-update-metadata.md)                                              | Billing           | Non-breaking     | api      |
| [Adds credited items information to invoice item proration details](https://docs.stripe.com/changelog/dahlia/2026-05-27/invoice-item-proration-credited-items.md)                                 | Billing           | Non-breaking     | api      |
| [Adds customer parameter to test clock creation](https://docs.stripe.com/changelog/dahlia/2026-05-27/test-clock-creation-customer-parameter.md)                                                   | Billing           | Non-breaking     | api      |

### Connect

| Title                                                                                                                                                                                                     | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds digital attestation support to Accounts v2 for proof of registration and beneficial ownership verification](https://docs.stripe.com/changelog/dahlia/2026-05-27/digital-attestation-accounts-v2.md) | Connect           | Non-breaking     | api      |
| [Adds automatic transfer rules to balance settings](https://docs.stripe.com/changelog/dahlia/2026-05-27/balance-settings-automatic-transfer-rules.md)                                                     | Payouts           | Non-breaking     | api      |
| [Adds the ability to configure custom start of day per connected account](https://docs.stripe.com/changelog/dahlia/2026-05-27/custom-start-of-day.md)                                                     | Payments, Payouts | Non-breaking     | api      |

### Elements

| Title                                                                                                                                                                                 | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Renames Link Authentication Element to Contact Details Element](https://docs.stripe.com/changelog/dahlia/2026-05-27/link-authentication-element-rename.md)                           | Elements           | Non-breaking     | api      |
| [Adds the ability to collect email in Checkout Sessions with Contact Details Element](https://docs.stripe.com/changelog/dahlia/2026-05-27/add-contact-details-element-to-checkout.md) | Checkout, Elements | Non-breaking     | api      |

### Payments

| Title                                                                                                                                                                                           | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for Twint as a payment method for recurring payments](https://docs.stripe.com/changelog/dahlia/2026-05-27/recurring-payments-twint.md)                                            | Payments          | Non-breaking     | api      |
| [Adds destination payment description and metadata support to transfer data](https://docs.stripe.com/changelog/dahlia/2026-05-27/transfer-data-destination-payment-description-and-metadata.md) | Payments          | Non-breaking     | api      |
| [Adds active status filtering to payment method configurations](https://docs.stripe.com/changelog/dahlia/2026-05-27/payment-method-configurations-active-status-filtering.md)                   | Payments          | Non-breaking     | api      |
| [Adds card brand restrictions to Payment Links](https://docs.stripe.com/changelog/dahlia/2026-05-27/adds-card-brand-restrictions-to-payment-links.md)                                           | Paymentlinks      | Non-breaking     | api      |
| [Adds support for Scalapay payments](https://docs.stripe.com/changelog/dahlia/2026-05-27/scalapay-payments.md)                                                                                  | Payments          | Non-breaking     | api      |

### Terminal

| Title                                                                                                                                                              | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Adds support for printing images on Terminal readers with embedded printers](https://docs.stripe.com/changelog/dahlia/2026-05-27/terminal-reader-print-action.md) | Terminal          | Non-breaking     | api      |
| [Adds support for Verifone third-party device types to Terminal APIs](https://docs.stripe.com/changelog/dahlia/2026-05-27/verifone-third-party-device-types.md)    | Terminal          | Non-breaking     | api      |
| [Adds API error details to Terminal reader action failures](https://docs.stripe.com/changelog/dahlia/2026-05-27/terminal-reader-action-failures-error-details.md)  | Terminal          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                    | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for Bizum payments](https://docs.stripe.com/changelog/dahlia/2026-05-27/bizum-payments.md) | Payments          | Non-breaking     | api      |

## 2026-05-27.preview

### Billing

| Title                                                                                                                                                                                         | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Billed until property on subscription items is no longer included in responses by default](https://docs.stripe.com/changelog/dahlia/2026-05-27/subscription-item-billed-until-includable.md) | Billing           | Breaking         | api      |
| [Adds the subscription pause endpoint](https://docs.stripe.com/changelog/dahlia/2026-05-27/pause-subscriptions.md)                                                                            | Billing           | Non-breaking     | api      |
| [Enables expansion of trial offer prices](https://docs.stripe.com/changelog/dahlia/2026-05-27/trial-offer-prices-expansion.md)                                                                | Billing           | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                              | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Mastercard support to Issuing Settlement API](https://docs.stripe.com/changelog/dahlia/2026-05-27/issuing-settlement-mastercard-support.md)                                  | Issuing           | Breaking         | api      |
| [Adds support for retrieving individual activity logs](https://docs.stripe.com/changelog/dahlia/2026-05-27/activity-logs-api-retrieve-endpoint.md)                                 | All products      | Non-breaking     | api      |
| [Adds 20 new bank account types for cross-border payouts in Global Payouts](https://docs.stripe.com/changelog/dahlia/2026-05-27/cross-border-payouts-20-new-bank-account-types.md) | Payouts           | Non-breaking     | api      |

## 2026-04-22.preview

### Agentic commerce

| Title                                                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds the Shared Payment Granted Token for managing payment methods shared by agents](https://docs.stripe.com/changelog/dahlia/2026-04-22/shared-payment-granted-token.md)                                 | All products      | Non-breaking     | api      |
| [Adds the SharedPaymentIssuedToken resource to allow agents to give sellers scoped access to a customer’s credentials](https://docs.stripe.com/changelog/dahlia/2026-04-22/shared-payment-issued-token.md) | Payments          | Non-breaking     | api      |
| [Adds the Orchestrated Commerce Agreements API to manage relationships for agentic commerce integrations](https://docs.stripe.com/changelog/dahlia/2026-04-22/orchestrated-commerce-agreements-api.md)     | All products      | Non-breaking     | api      |

### Billing

| Title                                                                                                                                                                             | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds validation for billing meter event values with more than 15 digits](https://docs.stripe.com/changelog/dahlia/2026-04-22/billing-meter-event-values-validation.md)           | Billing           | Breaking         | api      |
| [Adds Blik as a supported payment method for recurring payments in Stripe Billing](https://docs.stripe.com/changelog/dahlia/2026-04-22/stripe-billing-blik-recurring-payments.md) | Billing, Checkout | Non-breaking     | api      |

### Payouts

| Title                                                                                                                                                                            | Affected Products                   | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------- | -------- |
| [Adds support for Japan and China as Global Payouts cross-border payout destinations](https://docs.stripe.com/changelog/dahlia/2026-04-22/cross-border-payouts-new-countries.md) | Payouts                             | Breaking         | api      |
| [Adds credential reuse for Global Payouts with Accounts v2](https://docs.stripe.com/changelog/dahlia/2026-04-22/credential-reuse-with-accounts-v2.md)                            | Payouts, Payments, Billing, Connect | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                                             | Affected Products          | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------- | -------- |
| [Updates transaction categories to use flow-specific reversal types and adds Stripe fee tax category](https://docs.stripe.com/changelog/dahlia/2026-04-22/transaction-categories-flow-specific-reversal-types.md) | Treasury                   | Breaking         | api      |
| [Makes the radar session property optional in the Payment Evaluations API](https://docs.stripe.com/changelog/dahlia/2026-04-22/payment-evaluations-optional-radar-session.md)                                     | Radar                      | Breaking         | api      |
| [Adds support for automatic surcharge calculations on Checkout Sessions](https://docs.stripe.com/changelog/dahlia/2026-04-22/checkout-sessions-automatic-surcharge.md)                                            | Checkout                   | Non-breaking     | api      |
| [Adds the Stripe fee tax transaction category](https://docs.stripe.com/changelog/dahlia/2026-04-22/stripe-fee-tax-transaction-category.md)                                                                        | Treasury                   | Non-breaking     | api      |
| [Adds programmatic invocation of Stripe Workflows](https://docs.stripe.com/changelog/dahlia/2026-04-22/adds-workflows-api-with-programmatic-invocation.md)                                                        | All products               | Non-breaking     | api      |
| [Adds the Stripe profiles API to represent public business identities on Stripe](https://docs.stripe.com/changelog/dahlia/2026-04-22/stripe-profiles-apis.md)                                                     | All products               | Non-breaking     | api      |
| [Adds DELETE method support to the Batch API](https://docs.stripe.com/changelog/dahlia/2026-04-22/batch-api-delete-method.md)                                                                                     | All products               | Non-breaking     | api      |
| [Adds validation errors property to the Redaction Job object](https://docs.stripe.com/changelog/dahlia/2026-04-22/redaction-job-validation-errors-property.md)                                                    | All products               | Non-breaking     | api      |
| [Adds programmatic access to account activity logs](https://docs.stripe.com/changelog/dahlia/2026-04-22/programmatic-access-to-activity-logs.md)                                                                  | All products               | Non-breaking     | api      |
| [Makes Accounts v2 available to all Stripe users for managing customers](https://docs.stripe.com/changelog/dahlia/2026-04-22/accounts-v2-expanded-availability.md)                                                | Billing, Connect, Payments | Non-breaking     | api      |
| [Adds new tax registration types and product tax details for Stripe Tax for tickets](https://docs.stripe.com/changelog/dahlia/2026-04-22/stripe-tax-for-tickets-new-tax-registration-types.md)                    | Tax                        | Non-breaking     | api      |
| [Adds the Reporting Query Runs API v2](https://docs.stripe.com/changelog/dahlia/2026-04-22/reporting-query-runs-api-v2.md)                                                                                        | Sigma                      | Non-breaking     | api      |

## 2026-04-22.dahlia

### Payments

| Title                                                                                                                                                                                  | Affected Products                | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------- | -------- |
| [Adds support for Sunbit, a buy now, pay later payment method](https://docs.stripe.com/changelog/dahlia/2026-04-22/sunbit-buy-now-pay-later-support.md)                                | Payments                         | Non-breaking     | api      |
| [Adds support for Pix recurring payments](https://docs.stripe.com/changelog/dahlia/2026-04-22/pix-recurring-payments-support.md)                                                       | Payments                         | Non-breaking     | api      |
| [Adds the moto property to Setup Attempt payment method details for cards](https://docs.stripe.com/changelog/dahlia/2026-04-22/setup-attempt-payment-method-details-for-cards-moto.md) | Payments                         | Non-breaking     | api      |
| [Adds QR code support for Klarna payments with Terminal readers](https://docs.stripe.com/changelog/dahlia/2026-04-22/klarna-payments-with-terminal-readers-qr-code-support.md)         | All products                     | Non-breaking     | api      |
| [Adds an amount confirmation parameter to the Payment Intent API](https://docs.stripe.com/changelog/dahlia/2026-04-22/amount-confirmation-parameter-to-paymentintent.md)               | Payments                         | Non-breaking     | api      |
| [Adds support for Managed Payments, Stripe’s merchant of record solution](https://docs.stripe.com/changelog/dahlia/2026-04-22/managed-payments.md)                                     | Checkout, Paymentlinks, Payments | Non-breaking     | api      |

### Tax

| Title                                                                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds the ability to collect and store tax identification information for customers in the Faroe Islands, Gibraltar, Italy, and Paraguay](https://docs.stripe.com/changelog/dahlia/2026-04-22/new-tax-id-types-support.md) | Tax, Invoicing    | Non-breaking     | api      |
| [Adds expandable tax rate property to tax rate details](https://docs.stripe.com/changelog/dahlia/2026-04-22/adds-expandable-tax-rate-property-to-tax-rate-details.md)                                                      | Invoicing         | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds account as a new item type to Radar value lists](https://docs.stripe.com/changelog/dahlia/2026-04-22/radar-value-lists-account-item-type.md)                                                                         | Radar             | Non-breaking     | api      |
| [Removes mandatory payments KYC onboarding for app distribution for Stripe Apps](https://docs.stripe.com/changelog/dahlia/2026-04-22/app-distribution-capability.md)                                                       | All products      | Non-breaking     | api      |
| [Adds fulfillment error to issuing card cancellation and replacement reasons](https://docs.stripe.com/changelog/dahlia/2026-04-22/fulfillment-error-to-issuing-card-cancellation-and-replacement.md)                       | Issuing           | Non-breaking     | api      |
| [Adds balance report and payout reconciliation report embedded components to the Account Session API](https://docs.stripe.com/changelog/dahlia/2026-04-22/balance-and-payout-reconciliation-report-embedded-components.md) | Connect           | Non-breaking     | api      |
| [Adds support for Azure Event Grid as an event destination](https://docs.stripe.com/changelog/dahlia/2026-04-22/azure-event-grid-event-destination.md)                                                                     | All products      | Non-breaking     | api      |
| [Adds new balance transaction types for inbound transfers and reversals](https://docs.stripe.com/changelog/dahlia/2026-04-22/inbound-transfers-balance-transaction-types.md)                                               | Treasury          | Non-breaking     | api      |
| [Adds support for Phantom Cash and USDT to stablecoin payments](https://docs.stripe.com/changelog/dahlia/2026-04-22/stablecoin-payments-phantom-cash-and-usdt.md)                                                          | Crypto            | Non-breaking     | api      |
| [Adds the Product Catalog Import API v2](https://docs.stripe.com/changelog/dahlia/2026-04-22/introduces-product-catalog-import-api-v2.md)                                                                                  | All products      | Non-breaking     | api      |
| [Adds a card-presence spending control for Issuing](https://docs.stripe.com/changelog/dahlia/2026-04-22/issuing-card-presence-spending-control.md)                                                                         | Issuing           | Non-breaking     | api      |

## 2026-03-25.dahlia

### Checkout enhancements

| Title                                                                                                                                                                                                | Affected Products      | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------- | -------- |
| [Updates Checkout Session UI mode enum values](https://docs.stripe.com/changelog/dahlia/2026-03-25/updates-available-checkout-session-ui-modes.md)                                                   | Checkout, Paymentlinks | Breaking         | api      |
| [Adds pending invoice item interval parameter to create Checkout Sessions](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-pending-invoice-item-interval-parameter-to-checkout-sessions.md) | Checkout               | Non-breaking     | api      |
| [Adds integration identifier parameter to Checkout Sessions](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-integration-identifier-parameter-to-checkout-sessions.md)                      | Checkout               | Non-breaking     | api      |

### Connect enhancements

| Title                                                                                                                                                                                                                                    | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds risk requirements to the Capabilities API](https://docs.stripe.com/changelog/dahlia/2026-03-25/capabilities-api-risk-requirements.md)                                                                                              | Connect           | Breaking         | api      |
| [Removes the requirement for certain connected accounts to collect external account information in the Account Sessions API](https://docs.stripe.com/changelog/dahlia/2026-03-25/relaxed_external_account_collection_account_session.md) | Connect           | Non-breaking     | api      |

### Elements and Stripe.js enhancements

| Title                                                                                                                                                                                           | Affected Products  | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Changes the Address Element state field to default to Latin-formatted characters](https://docs.stripe.com/changelog/dahlia/2026-03-25/address-element-getvalue-and-change-event-formatting.md) | Elements           | Breaking         | stripejs |
| [Updates the elements.update() method to return a Promise](https://docs.stripe.com/changelog/dahlia/2026-03-25/elements-update-returns-promise.md)                                              | Elements           | Breaking         | stripejs |
| [Removes support for boolean values in options.layout.radios](https://docs.stripe.com/changelog/dahlia/2026-03-25/disallow-booleans-for-radios.md)                                              | Elements           | Breaking         | stripejs |
| [Removes deprecated Payment Intents, Setup Intents, and Sources methods from Stripe.js](https://docs.stripe.com/changelog/dahlia/2026-03-25/remove-legacy-stripejs-methods.md)                  | Payments           | Breaking         | stripejs |
| [Renames Checkout initialization method](https://docs.stripe.com/changelog/dahlia/2026-03-25/rename-init-checkout-to-init-checkout-elements.md)                                                 | Checkout, Elements | Breaking         | stripejs |
| [Renames Embedded Checkout initialization method](https://docs.stripe.com/changelog/dahlia/2026-03-25/rename-init-embedded-checkout-to-create-embedded-checkout-page.md)                        | Checkout           | Breaking         | stripejs |

### Issuing enhancements

| Title                                                                                                                                                                | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Updates the Issuing Token card reference ID for Visa to be optional](https://docs.stripe.com/changelog/dahlia/2026-03-25/visa-card-reference-id-optional.md)        | Issuing           | Breaking         | api      |
| [Adds support for limiting the number of allowed payments for Issuing cards](https://docs.stripe.com/changelog/dahlia/2026-03-25/issuing-card-lifecycle-controls.md) | Issuing           | Non-breaking     | api      |

### Payments enhancements

| Title                                                                                                                                                                                                                               | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Updates card property requirements and adds 3D Secure authentication properties to Payment Records](https://docs.stripe.com/changelog/dahlia/2026-03-25/payment-records-card-property-requirements-and-3d-secure-properties.md)    | Payments          | Non-breaking     | api      |
| [Adds support for the UPI payment method](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-support-for-the-upi-payment-method.md)                                                                                           | Payments          | Non-breaking     | api      |
| [Adds payment method-level support for configuring future usage of crypto payment methods in Checkout Sessions](https://docs.stripe.com/changelog/dahlia/2026-03-25/expands-crypto-payment-method-options-for-checkout-sessions.md) | Payments, Crypto  | Non-breaking     | api      |

### Radar enhancements

| Title                                                                                                                                                                         | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds crypto fingerprint support to Radar value list items](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-crypto-fingerprint-support-to-radar-value-list-items.md) | Radar, Crypto     | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                        | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds retention policy cancellation reason to Subscriptions](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-new-cancellation-reason-subscription-test-retention-policy.md)         | Billing           | Breaking         | api      |
| [Updates the events_from parameter on event destinations to accept string values](https://docs.stripe.com/changelog/dahlia/2026-03-25/updates-eventsfrom-parameter-on-event-destinations.md) | All products      | Breaking         | api      |
| [Adds decimal quantity support for Invoice Items and Invoice Line Items](https://docs.stripe.com/changelog/dahlia/2026-03-25/invoice-items-decimal-quantity.md)                              | Invoicing         | Non-breaking     | api      |
| [Adds marine carbon removal as a new Climate Orders pathway](https://docs.stripe.com/changelog/dahlia/2026-03-25/marine-carbon-removal-pathway.md)                                           | Climate           | Non-breaking     | api      |
| [Adds metadata property to credit note line items](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-metadata-field-to-credit-note-line-items.md)                                     | Invoicing         | Non-breaking     | api      |
| [Adds Tempo network support for crypto payments](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-tempo-network-enum-for-crypto-payments.md)                                         | Payments, Crypto  | Non-breaking     | api      |
| [Adds presentment details for Adaptive Pricing Subscriptions](https://docs.stripe.com/changelog/dahlia/2026-03-25/add-presentment-details-for-subscriptions.md)                              | Billing           | Non-breaking     | api      |

## 2026-03-25.preview

### Payments enhancements

| Title                                                                                                                                                                                  | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Removes the source type property from Stripe balance payment methods](https://docs.stripe.com/changelog/dahlia/2026-03-25/stripe-balance-payment-method-source-type.md)               | Payments, Connect | Breaking         | api      |
| [Adds surcharge configuration options for card-not-present payments](https://docs.stripe.com/changelog/dahlia/2026-03-25/card-not-present-payments-surcharge-configuration-options.md) | Payments          | Non-breaking     | api      |
| [Adds Risk Reserved Balance to the Balances API](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-risk-reserved-balance-to-the-balances-api.md)                                | Payments, Payouts | Non-breaking     | api      |

### Payouts enhancements

| Title                                                                                                                                                                              | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds multicurrency support for v2 payout methods](https://docs.stripe.com/changelog/dahlia/2026-03-25/multicurrency-v2-payout-methods.md)                                         | Payouts           | Breaking         | api      |
| [Restricts Accounts v2 identity properties for some Global Payouts use cases](https://docs.stripe.com/changelog/dahlia/2026-03-25/accounts-identity-fields-global-payouts.md)      | Payouts           | Breaking         | api      |
| [Adds the restricted property to the Payout Method object](https://docs.stripe.com/changelog/dahlia/2026-03-25/payout-method-restricted-property.md)                               | Payouts           | Non-breaking     | api      |
| [Expands Global Payouts cross-border payout destinations to three additional countries](https://docs.stripe.com/changelog/dahlia/2026-03-25/cross-border-payouts-new-countries.md) | Payouts           | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                                       | Affected Products    | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------- | -------- |
| [Adds hosted relink flow for Financial Connections](https://docs.stripe.com/changelog/dahlia/2026-03-25/financial-connections-hosted-relink-api.md)                                                         | Financialconnections | Non-breaking     | api      |
| [Adds support for running API operations in batches](https://docs.stripe.com/changelog/dahlia/2026-03-25/batch-jobs-v2-api.md)                                                                              | All products         | Non-breaking     | api      |
| [Adds pending invoice item interval parameter to update Checkout Sessions](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-pending-invoice-item-interval-parameter-to-checkout-sessions-update.md) | Checkout             | Non-breaking     | api      |
| [Adds support for Azure Event Grid as an event destination](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-support-for-azure-event-grid-as-an-event-destination.md)                               | All products         | Non-breaking     | api      |
| [Adds time zone support to the Accounts v2 API](https://docs.stripe.com/changelog/dahlia/2026-03-25/accounts-v2-time-zone-support.md)                                                                       | Connect              | Non-breaking     | api      |
| [Adds Stripe Tax support for ticket sales](https://docs.stripe.com/changelog/dahlia/2026-03-25/stripe-tax-ticket-sales-event-location.md)                                                                   | Tax                  | Non-breaking     | api      |
| [Adds a description and counterparty to transactions](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-description-and-counterparty-to-transactions.md)                                             | Treasury             | Non-breaking     | api      |
| [Adds support for Managed Payments on payment links](https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-support-for-managed-payments-on-payment-links.md)                                             | Paymentlinks         | Non-breaking     | api      |
| [Adds configurable trial offers for subscription items](https://docs.stripe.com/changelog/dahlia/2026-03-25/trial-offers-on-subscription-items.md)                                                          | Billing              | Non-breaking     | api      |

# Clover
[Learn what's changing in Clover](https://docs.stripe.com/changelog/clover.md)
## 2026-02-25.clover

### Billing enhancements

| Title                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Pay by Bank to the Billing API](https://docs.stripe.com/changelog/clover/2026-02-25/billing-api-pay-by-bank.md)                                                      | Billing, Payments | Non-breaking     | api      |
| [Adds payment behavior control for subscription item deletion](https://docs.stripe.com/changelog/clover/2026-02-25/subscription-item-deletion-payment-behavior-control.md) | Billing           | Non-breaking     | api      |

### Payments and payment method enhancements

| Title                                                                                                                                                                                             | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds display name and service user number to Bacs Direct Debit mandates](https://docs.stripe.com/changelog/clover/2026-02-25/display-name-and-service-user-number.md)                            | Payments          | Non-breaking     | api      |
| [Adds events for reserve holds, releases, and plans](https://docs.stripe.com/changelog/clover/2026-02-25/reserve-holds-releases-plans-events.md)                                                  | Payments          | Non-breaking     | api      |
| [Adds transaction purpose to PaymentIntents for US bank account payments](https://docs.stripe.com/changelog/clover/2026-02-25/us-bank-account-payments-transaction-purpose.md)                    | Payments          | Non-breaking     | api      |
| [Makes Boleto tax ID nullable in payment method details for Payment Records](https://docs.stripe.com/changelog/clover/2026-02-25/makes-tax-id-field-nullable-in-boleto-payment-method-details.md) | All products      | Non-breaking     | api      |

### Tax enhancements

| Title                                                                                                                                                   | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for tax collection in Sri Lanka for digital services](https://docs.stripe.com/changelog/clover/2026-02-25/tax-registrations-sri-lanka.md) | Tax               | Non-breaking     | api      |
| [Adds support for Sri Lanka VAT numbers](https://docs.stripe.com/changelog/clover/2026-02-25/sri-lanka-tax-id.md)                                       | Tax               | Non-breaking     | api      |

### Terminal enhancements

| Title                                                                                                                                                                         | Affected Products  | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds Terminal reader and location to payment method details](https://docs.stripe.com/changelog/clover/2026-02-25/terminal-reader-and-location.md)                            | Payments, Terminal | Non-breaking     | api      |
| [Adds the ability to manage cellular connectivity settings for Terminal readers](https://docs.stripe.com/changelog/clover/2026-02-25/terminal-cellular-configuration.md)      | Terminal           | Non-breaking     | api      |
| [Adds support for uploading Terminal Wi-Fi certificates and private keys](https://docs.stripe.com/changelog/clover/2026-02-25/terminal-wifi-certificates-and-private-keys.md) | Terminal           | Non-breaking     | api      |
| [Adds support for the Stripe Reader S710](https://docs.stripe.com/changelog/clover/2026-02-25/stripe-reader-s710.md)                                                          | Terminal           | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                     | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds settlement type to Application Fee objects](https://docs.stripe.com/changelog/clover/2026-02-25/settlement-type.md) | All products      | Non-breaking     | api      |

## 2026-02-25.preview

### Connect enhancements

| Title                                                                                                                            | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Smart Disputes settings to v2 Accounts](https://docs.stripe.com/changelog/clover/2026-02-25/smart-disputes-v2-accounts.md) | Connect           | Non-breaking     | api      |

### Payouts enhancements

| Title                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Expands bank account identification details in payout method responses](https://docs.stripe.com/changelog/clover/2026-02-25/payout-method-bank-account-identification.md) | All products      | Non-breaking     | api      |
| [Expands cross-border payout destinations to 12 additional countries](https://docs.stripe.com/changelog/clover/2026-02-25/cross-border-payouts-new-countries.md)           | Payments          | Non-breaking     | api      |
| [Adds the ability to specify the purpose of Outbound Payments](https://docs.stripe.com/changelog/clover/2026-02-25/outbound-payments-purpose.md)                           | Payouts           | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                        | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Make the flow property nullable on Transactions](https://docs.stripe.com/changelog/clover/2026-02-25/transaction-flow-nullable.md)          | Treasury          | Breaking         | api      |
| [Introduces Managed Payments, Stripe’s merchant of record solution](https://docs.stripe.com/changelog/clover/2026-02-25/managed-payments.md) | Payments          | Non-breaking     | api      |

## 2026-01-28.preview

### Financial Connections enhancements

| Title                                                                                                                                                                                        | Affected Products    | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------- | -------- |
| [Adds account holder information to Financial Address credentials for US bank accounts](https://docs.stripe.com/changelog/clover/2026-01-28/financial-address-account-holder-information.md) | Financialconnections | Non-breaking     | api      |
| [Adds the ability to relink deactivated Financial Connections Accounts](https://docs.stripe.com/changelog/clover/2026-01-28/financial-connections-relink.md)                                 | Financialconnections | Non-breaking     | api      |

### Payouts enhancements

| Title                                                                                                                                                                  | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Updates error codes for the Outbound Setup Intents API](https://docs.stripe.com/changelog/clover/2026-01-28/outbound-setup-intents-error-codes.md)                    | Payouts           | Breaking         | api      |
| [Adds alternative reference field to bank account and payout method resources](https://docs.stripe.com/changelog/clover/2026-01-28/alternative-reference-field.md)     | Payouts           | Non-breaking     | api      |
| [Adds fingerprint property to card payout methods](https://docs.stripe.com/changelog/clover/2026-01-28/card-payout-methods-fingerprint-property.md)                    | Payouts           | Non-breaking     | api      |
| [Global Payouts adds support for 15 new countries for cross-border payouts](https://docs.stripe.com/changelog/clover/2026-01-28/cross-border-payouts-new-countries.md) | Payments          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                          | Affected Products   | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ---------------- | -------- |
| [Adds the ability to detach a PaymentIntent from an Invoice](https://docs.stripe.com/changelog/clover/2026-01-28/detach-payment-from-invoice.md)                               | Invoicing           | Non-breaking     | api      |
| [Removes the source type parameter when creating new Stripe balance payment methods](https://docs.stripe.com/changelog/clover/2026-01-28/stripe-balance-remove-source-type.md) | Invoicing, Payments | Non-breaking     | api      |
| [Adds event type for updates on a line of credit when using Capital for Platforms](https://docs.stripe.com/changelog/clover/2026-01-28/line-of-credit-event.md)                | Capital             | Non-breaking     | api      |
| [Adds PayPay onboarding parameters to the Accounts API](https://docs.stripe.com/changelog/clover/2026-01-28/accounts-paypay-onboarding.md)                                     | Payments            | Non-breaking     | api      |

## 2026-01-28.clover

### Payments and payment method enhancements

| Title                                                                                                                                                                                                                       | Affected Products      | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------- | -------- |
| [Adds support for 3D Secure versions 2.3.0 and 2.3.1](https://docs.stripe.com/changelog/clover/2026-01-28/3d-secure-version-support.md)                                                                                     | Payments               | Non-breaking     | api      |
| [Adds the ability to monitor reserve activity on Balance Transactions and reconcile Risk Reserved balance changes](https://docs.stripe.com/changelog/clover/2026-01-28/monitor-reserve-activity-on-balance-transactions.md) | Payments, Payouts      | Non-breaking     | api      |
| [Adds the ability to opt out of strict arithmetic validation for Payment Line Items](https://docs.stripe.com/changelog/clover/2026-01-28/loosen-arithmetic-validation-for-payment-line-items.md)                            | Payments               | Non-breaking     | api      |
| [Adds Adyen as an issuer for iDEAL payments](https://docs.stripe.com/changelog/clover/2026-01-28/adds-adyen-as-an-issuer-for-ideal-payments.md)                                                                             | Payments               | Non-breaking     | api      |
| [Adds adjustable quantity to the line items response](https://docs.stripe.com/changelog/clover/2026-01-28/line-items-adjustable-quantity.md)                                                                                | Checkout, Paymentlinks | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                      | Affected Products        | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ---------------- | -------- |
| [Adds OpenAPI artifacts containing v2 API endpoints](https://docs.stripe.com/changelog/clover/2026-01-28/openapi-with-v2-apis.md)                                          | All products             | Non-breaking     | api      |
| [Reintroduces the ability to set an amount-off coupon’s duration to forever](https://docs.stripe.com/changelog/clover/2026-01-28/reintroduce-forever-amount-off-coupon.md) | Billing                  | Non-breaking     | api      |
| [Adds support for Polish NIP tax ID type](https://docs.stripe.com/changelog/clover/2026-01-28/polish-nip-tax-id-type.md)                                                   | Tax, Checkout, Invoicing | Non-breaking     | api      |
| [Adds the top-up field to Treasury ReceivedDebit linked flows](https://docs.stripe.com/changelog/clover/2026-01-28/treasury-received-debit-linked-flows-topup.md)          | Treasury                 | Non-breaking     | api      |
| [Changes currency mapping for Bulgaria from BGN to EUR](https://docs.stripe.com/changelog/clover/2026-01-28/bulgaria-currency-mapping-bgn-to-eur.md)                       | Terminal                 | Non-breaking     | api      |
| [Adds the contact phone parameter to the Accounts API](https://docs.stripe.com/changelog/clover/2026-01-28/accounts-contact-phone.md)                                      | All products             | Non-breaking     | api      |
| [Adds the ability to specify a company’s registration date on Accounts v2 objects](https://docs.stripe.com/changelog/clover/2026-01-28/accounts-v2-registration-date.md)   | Connect                  | Non-breaking     | api      |

## 2025-12-15.clover

### Accounts v2 and Connect enhancements

| Title                                                                                                                                                                                           | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Connect platforms can now use Accounts v2 to manage connected accounts and customers](https://docs.stripe.com/changelog/clover/2025-12-15/accounts-v2.md)                                      | Connect           | Non-breaking     | api      |
| [Adds the customer account property to v1 APIs for Accounts v2 interoperability](https://docs.stripe.com/changelog/clover/2025-12-15/accounts-v2-v1-api-support.md)                             | Connect           | Non-breaking     | api      |
| [Accounts now support digital attestation for proof of registration and beneficial ownership verification](https://docs.stripe.com/changelog/clover/2025-12-15/accounts-digital-attestation.md) | Connect           | Non-breaking     | api      |

### Billing enhancements

| Title                                                                                                                                                                                        | Affected Products  | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Subscriptions updated from the Customer Portal can now also modify their billing cycle anchor](https://docs.stripe.com/changelog/clover/2025-12-15/customer-portal-billing-cycle-anchor.md) | Billing            | Non-breaking     | api      |
| [Adds the ability to filter customer balance transactions by invoice](https://docs.stripe.com/changelog/clover/2025-12-15/customer-balance-transations-list-invoice.md)                      | Billing            | Non-breaking     | api      |
| [Enables expansion for invoice pricing details](https://docs.stripe.com/changelog/clover/2025-12-15/expandable-price-details-price.md)                                                       | Invoicing          | Non-breaking     | api      |
| [Adds subtotal property to Invoice Line Items](https://docs.stripe.com/changelog/clover/2025-12-15/invoice-line-item-subtotal.md)                                                            | Billing, Invoicing | Non-breaking     | api      |

### Payment methods enhancements

| Title                                                                                                                                                               | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Mollie as a supported iDEAL issuer](https://docs.stripe.com/changelog/clover/2025-12-15/mollie-ideal-issuer.md)                                               | Payments          | Non-breaking     | api      |
| [Adds additional card payment method details to Payment Records](https://docs.stripe.com/changelog/clover/2025-12-15/card-payment-method-details-payment-record.md) | Payments          | Non-breaking     | api      |
| [Adds expected debit date for bank debit payments](https://docs.stripe.com/changelog/clover/2025-12-15/expected-debit-date-on-charges.md)                           | Payments          | Non-breaking     | api      |
| [Adds support for the PayTo payment method](https://docs.stripe.com/changelog/clover/2025-12-15/payto.md)                                                           | Payments          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                            | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds the ability to update line items on existing Checkout Sessions with a custom UI](https://docs.stripe.com/changelog/clover/2025-12-15/update-line-items.md) | Checkout          | Non-breaking     | api      |

## 2025-12-15.preview

### Accounts v2 and Connect enhancements

| Title                                                                                                                                                                                | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Accounts v2 now always returns the responsibilities field when the defaults field is included](https://docs.stripe.com/changelog/clover/2025-12-15/accounts-v2-responsibilities.md) | Connect           | Breaking         | api      |
| [Removes requested field from Accounts v2 capabilities hashes](https://docs.stripe.com/changelog/clover/2025-12-15/accounts-v2-capabilities-remove-requested.md)                     | Connect           | Breaking         | api      |

### Payments and payment methods enhancements

| Title                                                                                                                                                                  | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds generic error types for Payout Methods](https://docs.stripe.com/changelog/clover/2025-12-15/generic-error-types-payout-methods.md)                               | Payouts           | Breaking         | api      |
| [Creating a Payout Method now triggers an event](https://docs.stripe.com/changelog/clover/2025-12-15/payout-method-created-event.md)                                   | Payouts           | Non-breaking     | api      |
| [Global Payouts adds support for 13 new countries for cross-border payouts](https://docs.stripe.com/changelog/clover/2025-12-15/cross-border-payouts-new-countries.md) | Payments          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                       | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Account Tokens no longer require identity information on creation](https://docs.stripe.com/changelog/clover/2025-12-15/account-tokens-identity-optional.md)                | All products      | Non-breaking     | api      |
| [Adds support for tracking transfers from connected accounts to financial accounts](https://docs.stripe.com/changelog/clover/2025-12-15/transfers-to-financial-accounts.md) | All products      | Non-breaking     | api      |
| [Adds support for retrieving information about reserves](https://docs.stripe.com/changelog/clover/2025-12-15/reserves-retrieve-api.md)                                      | All products      | Non-breaking     | api      |

## 2025-11-17.clover

### Billing enhancements

| Title                                                                                                                                                                           | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds filtering by creation date to Customer Balance Transactions lists](https://docs.stripe.com/changelog/clover/2025-11-17/customer-balance-transactions-list-created.md)     | Billing           | Non-breaking     | api      |
| [Adds filtering by creation date to Invoice Payment lists](https://docs.stripe.com/changelog/clover/2025-11-17/invoice-payments-list-created.md)                                | Billing           | Non-breaking     | api      |
| [Adds the ability to specify a payment method configuration in the customer portal](https://docs.stripe.com/changelog/clover/2025-11-17/portal-payment-method-configuration.md) | Billing           | Non-breaking     | api      |

### Enhancements to Issuing and fraud protection

| Title                                                                                                                                                             | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds a fraud warning for potentially compromised Issuing Cards](https://docs.stripe.com/changelog/clover/2025-11-17/issuing-fraud-warnings.md)                   | Issuing           | Non-breaking     | api      |
| [Adds fraud risk assessments to Issuing Authorizations](https://docs.stripe.com/changelog/clover/2025-11-17/fraud-risk-assessments-for-issuing-authorizations.md) | Issuing           | Non-breaking     | api      |

### Enhancements to payments and payment methods

| Title                                                                                                                                                                               | Affected Products  | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds the ability to specify the capture method for card present payments with Payment Intents](https://docs.stripe.com/changelog/clover/2025-11-17/card-present-capture-method.md) | Terminal, Payments | Non-breaking     | api      |
| [Adds the transaction ID to iDEAL payment method details](https://docs.stripe.com/changelog/clover/2025-11-17/ideal-transaction-id.md)                                              | Payments           | Non-breaking     | api      |
| [Adds MB WAY and TWINT to destination details for refunds](https://docs.stripe.com/changelog/clover/2025-11-17/mb-way-twint-destination-details-for-refunds.md)                     | Payments           | Non-breaking     | api      |
| [Adds Finom as a supported iDEAL issuer](https://docs.stripe.com/changelog/clover/2025-11-17/ideal-payments-finom.md)                                                               | Payments           | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                    | Affected Products              | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ---------------- | -------- |
| [Adds support for using a web browser to accept Apple’s terms and conditions for Tap to Pay on iPhone](https://docs.stripe.com/changelog/clover/2025-11-17/terminal-onboarding-links.md) | Terminal                       | Non-breaking     | api      |
| [Adds support for automatic tax transactions to Payment Intents](https://docs.stripe.com/changelog/clover/2025-11-17/payment-intents-tax-support.md)                                     | Tax, Payments                  | Non-breaking     | api      |
| [Makes client secret optional for Financial Connections Sessions](https://docs.stripe.com/changelog/clover/2025-11-17/financial-connections-client-secret.md)                            | Financialconnections           | Non-breaking     | api      |
| [Adds support for handling tokenized bank account numbers](https://docs.stripe.com/changelog/clover/2025-11-17/tokenized-account-numbers.md)                                             | Payments, Financialconnections | Non-breaking     | api      |

## 2025-11-17.preview

### Enhancements to Accounts v2 and Connect

| Title                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Updates requirements collection parameters for Accounts v2](https://docs.stripe.com/changelog/clover/2025-11-17/accounts-v2-requirements-collection.md)                   | Connect           | Breaking         | api      |
| [Adds future requirements field to Accounts v2](https://docs.stripe.com/changelog/clover/2025-11-17/accounts-v2-future-requirements.md)                                    | All products      | Breaking         | api      |
| [PaymentMethods can now list payment methods for a customer account using Accounts v2](https://docs.stripe.com/changelog/clover/2025-11-17/v2-accounts-payment-methods.md) | Connect, Payments | Non-breaking     | api      |
| [Adds support for PayPay to Accounts](https://docs.stripe.com/changelog/clover/2025-11-17/paypay-connect.md)                                                               | Payments, Connect | Non-breaking     | api      |
| [Adds support for Konbini payments and Japanese statement descriptors in Accounts v2](https://docs.stripe.com/changelog/clover/2025-11-17/accounts-v2-konbini-payments.md) | Connect           | Non-breaking     | api      |
| [Adds the capabilty to hold EUR funds to Accounts v2](https://docs.stripe.com/changelog/clover/2025-11-17/account-v2-storer-config-eur.md)                                 | All products      | Non-breaking     | api      |
| [Adds account and person tokens to Accounts v2 to securely transmit sensitive data](https://docs.stripe.com/changelog/clover/2025-11-17/accounts-v2-tokens.md)             | All products      | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                 | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds health alerts for when events fail to generate](https://docs.stripe.com/changelog/clover/2025-11-17/event-generation-failure-alert.md)                                          | All products      | Breaking         | api      |
| [Meter Usage Analytics adds support for filtering multiple tenants and dimension values](https://docs.stripe.com/changelog/clover/2025-11-17/meter-usage-tenant-dimension-filters.md) | Billing           | Breaking         | api      |
| [Adds industry-specific transaction details and purchase data for cards and Klarna](https://docs.stripe.com/changelog/clover/2025-11-17/industry-fields-cards-klarna.md)              | Payments          | Non-breaking     | api      |
| [Adds support for Argentine ID types](https://docs.stripe.com/changelog/clover/2025-11-17/argentine-id-types.md)                                                                      | Identity, Connect | Non-breaking     | api      |
| [Adds support for Accounts v2 to accept the terms of service for storing stablecoins](https://docs.stripe.com/changelog/clover/2025-11-17/stablecoin-fa-tos.md)                       | Crypto, Treasury  | Non-breaking     | api      |
| [Tax Associations now always return the list of attempted tax transactions](https://docs.stripe.com/changelog/clover/2025-11-17/tax-assocation-transaction-attempts.md)               | Tax               | Non-breaking     | api      |
| [Thin events now include field changes on related objects](https://docs.stripe.com/changelog/clover/2025-11-17/thin-events-changes.md)                                                | All products      | Non-breaking     | api      |

## 2025-10-29.clover

### Billing enhancements

| Title                                                                                                                                                                     | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds support for using Payment Records with Invoices and Credit Notes](https://docs.stripe.com/changelog/clover/2025-10-29/invoicing-payment-records.md)                 | Billing, Invoicing | Non-breaking     | api      |
| [Updates the category field of Credit Grants to be optional](https://docs.stripe.com/changelog/clover/2025-10-29/credit-grant-optional-category.md)                       | Billing            | Non-breaking     | api      |
| [Adds a webhook event type for Invoices that require a non-Stripe payment](https://docs.stripe.com/changelog/clover/2025-10-29/invoice-payment-attempt-required-event.md) | Billing, Invoicing | Non-breaking     | api      |

### Connect enhancements

| Title                                                                                                                                                                           | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds the ability to upload your platform’s terms of service agreement](https://docs.stripe.com/changelog/clover/2025-10-29/upload-file-terms-of-service.md)                    | All products      | Non-breaking     | api      |
| [Adds the ability to attest to an Account’s authorized company representative](https://docs.stripe.com/changelog/clover/2025-10-29/representative-declaration.md)               | Connect           | Non-breaking     | api      |
| [Adds a webhook event type for updates to the balance settings for connected accounts](https://docs.stripe.com/changelog/clover/2025-10-29/balance-settings-updated-webhook.md) | Connect, Payouts  | Non-breaking     | api      |

### Crypto enhancements

| Title                                                                                                                                                              | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Adds support for managing stablecoin payments with Payment Method Configurations](https://docs.stripe.com/changelog/clover/2025-10-29/stablecoin-payments-pmc.md) | Crypto, Payments  | Non-breaking     | api      |
| [Adds crypto network support for Solana](https://docs.stripe.com/changelog/clover/2025-10-29/crypto-network-solana.md)                                             | Crypto            | Non-breaking     | api      |
| [Adds blockchain transaction hash to stablecoin refunds](https://docs.stripe.com/changelog/clover/2025-10-29/stablecoin-refunds-reference-details.md)              | Crypto, Payments  | Non-breaking     | api      |

### Payment methods enhancements

| Title                                                                                                                                                                                    | Affected Products      | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------- | -------- |
| [Adds MB WAY to payment method configurations](https://docs.stripe.com/changelog/clover/2025-10-29/mb-way-payment-method-configuration.md)                                               | Payments               | Non-breaking     | api      |
| [Adds TWINT payment method options to Checkout Sessions](https://docs.stripe.com/changelog/clover/2025-10-29/twint-checkout-sessions.md)                                                 | Checkout               | Non-breaking     | api      |
| [Adds support for specifying payment method configurations to the customer portal](https://docs.stripe.com/changelog/clover/2025-10-29/customer-portal-payment-method-configurations.md) | Billing                | Non-breaking     | api      |
| [Adds MB WAY payment method to Payment Links and Checkout Sessions](https://docs.stripe.com/changelog/clover/2025-10-29/mb-way-payment-link-checkout-sessions.md)                        | Checkout, Paymentlinks | Non-breaking     | api      |
| [Adds the ability to exclude payment methods when using Setup Intents](https://docs.stripe.com/changelog/clover/2025-10-29/exclude-payment-methods-setup-intents.md)                     | Payments               | Non-breaking     | api      |
| [Adds Klarna reference parameters for line items in Payment Intents](https://docs.stripe.com/changelog/clover/2025-10-29/klarna-line-item-reference.md)                                  | Payments               | Non-breaking     | api      |
| [Adds a subscription reference to Klarna line items in Payment Intents](https://docs.stripe.com/changelog/clover/2025-10-29/klarna-items-payment-intents.md)                             | Payments               | Non-breaking     | api      |
| [Adds support for custom payment methods](https://docs.stripe.com/changelog/clover/2025-10-29/custom-payment-methods.md)                                                                 | Payments               | Non-breaking     | api      |

### Tax enhancements

| Title                                                                                                                                              | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for remote sellers in Taiwan to Stripe Tax](https://docs.stripe.com/changelog/clover/2025-10-29/stripe-tax-taiwan-remote-support.md) | Tax               | Non-breaking     | api      |
| [Adds third-party tax providers for automatic tax calculation](https://docs.stripe.com/changelog/clover/2025-10-29/automatic-tax-provider.md)      | Tax               | Non-breaking     | api      |

### Terminal enhancements

| Title                                                                                                                                              | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds a field for a Terminal reader’s last connection timestamp](https://docs.stripe.com/changelog/clover/2025-10-29/terminal-reader-last-seen.md) | Terminal          | Non-breaking     | api      |
| [Adds support for tipping in Gibraltar pounds on Terminal readers](https://docs.stripe.com/changelog/clover/2025-10-29/terminal-tips-gip.md)       | Terminal          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                           | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds support for filtering by event type to Events v2](https://docs.stripe.com/changelog/clover/2025-10-29/v2-events-api-filtering.md)                                         | All products       | Non-breaking     | api      |
| [Adds Payment Records and Payment Attempt Records](https://docs.stripe.com/changelog/clover/2025-10-29/payment-records.md)                                                      | Payments           | Non-breaking     | api      |
| [Adds support for payment line items](https://docs.stripe.com/changelog/clover/2025-10-29/payment-line-items.md)                                                                | Payments           | Non-breaking     | api      |
| [Adds support for collecting business and individual names on Payment Links](https://docs.stripe.com/changelog/clover/2025-10-29/payment-links-name-collection.md)              | Paymentlinks       | Non-breaking     | api      |
| [Adds support for Customer Sessions for Mobile Payment Element and Customer Sheet](https://docs.stripe.com/changelog/clover/2025-10-29/customer-sessions-mpe-customer-sheet.md) | Elements, Payments | Non-breaking     | api      |

## 2025-10-29.preview

### Connect enhancements

| Title                                                                                                                                                                              | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds new error code for missing verification data from connected accounts](https://docs.stripe.com/changelog/clover/2025-10-29/accounts-verification-data-error.md)               | Connect           | Breaking         | api      |
| [Adds support for using Accounts v2 payment method billing details for Stripe Tax location](https://docs.stripe.com/changelog/clover/2025-10-29/payment-method-location-source.md) | Connect           | Breaking         | api      |
| [Adds the ability to attest to the authorized company representative for Accounts v2](https://docs.stripe.com/changelog/clover/2025-10-29/v2-representative-declaration.md)        | Connect           | Non-breaking     | api      |
| [Adds support for retrieving and listing closed v2 Accounts](https://docs.stripe.com/changelog/clover/2025-10-29/return-closed-v2-accounts.md)                                     | Connect           | Non-breaking     | api      |

### Payment methods enhancements

| Title                                                                                                                                       | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for microdeposits to US Bank Accounts](https://docs.stripe.com/changelog/clover/2025-10-29/microdeposits-us-bank-accounts.md) | Payments          | Non-breaking     | api      |
| [Adds support for listing US and GB bank accounts](https://docs.stripe.com/changelog/clover/2025-10-29/list-bank-accounts.md)               | Payments          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                              | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Adds the ability to update the metadata and display name of a Financial Account](https://docs.stripe.com/changelog/clover/2025-10-29/update-financial-account.md) | Treasury          | Non-breaking     | api      |
| [Updates to Payment Record APIs](https://docs.stripe.com/changelog/clover/2025-10-29/payment-records-updates.md)                                                   | Payments          | Non-breaking     | api      |
| [Adds a shareable payment portal link for Rechnung invoices](https://docs.stripe.com/changelog/clover/2025-10-29/rechnung-payment-portal-url.md)                   | Payments          | Non-breaking     | api      |
| [Adds Tax ID Element support to Customer Sessions](https://docs.stripe.com/changelog/clover/2025-10-29/cs-add-tax-id-element-to-customer-session.md)               | Elements          | Non-breaking     | api      |
| [Adds new error codes for the crypto wallet payout method](https://docs.stripe.com/changelog/clover/2025-10-29/crypto-wallet-errors.md)                            | Payments          | Non-breaking     | api      |
| [Adds tracking for which tax provider resolved a Customer location](https://docs.stripe.com/changelog/clover/2025-10-29/tax-provider-customer-location.md)         | Tax               | Non-breaking     | api      |

## 2025-09-30.clover

### Billing enhancements

| Title                                                                                                                                                                                                               | Affected Products            | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------- | -------- |
| [Removes iterations parameter for subscription schedules](https://docs.stripe.com/changelog/clover/2025-09-30/remove-iterations.md)                                                                                 | Billing                      | Breaking         | api      |
| [Promotion Codes now reference Coupons using a polymorphic field for promotions](https://docs.stripe.com/changelog/clover/2025-09-30/polymorphic-coupon.md)                                                         | Billing                      | Breaking         | api      |
| [Adds the Discount source property and removes the Discount coupon property](https://docs.stripe.com/changelog/clover/2025-09-30/add-discount-source-property.md)                                                   | Billing                      | Breaking         | api      |
| [Makes flexible billing mode the default for new subscriptions](https://docs.stripe.com/changelog/clover/2025-09-30/billing-mode-default-flexible.md)                                                               | Billing, Checkout            | Breaking         | api      |
| [Updates computation of subscription schedule phase end date to consider billing cycle anchor changes](https://docs.stripe.com/changelog/clover/2025-09-30/billing-cycle-anchor-resets-during-phase-computation.md) | Billing                      | Breaking         | api      |
| [Adds customer portal configuration trial behavior](https://docs.stripe.com/changelog/clover/2025-09-30/customer-portal-trial-behavior.md)                                                                          | Billing                      | Non-breaking     | api      |
| [Adds the ability to itemize proration discount amounts](https://docs.stripe.com/changelog/clover/2025-09-30/itemize-proration-discount-amounts.md)                                                                 | Billing, Checkout, Invoicing | Non-breaking     | api      |

### Checkout enhancements

| Title                                                                                                                                                                                                        | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------- | -------- |
| [Removes postal code for card payments in certain regions on Checkout and Payment Element](https://docs.stripe.com/changelog/clover/2025-09-30/postal_code_in_card_form_for_non_us_countries.md)             | Checkout, Elements | Breaking         | stripejs |
| [Removes currency conversion field from Checkout Sessions](https://docs.stripe.com/changelog/clover/2025-09-30/remove-checkout-session-currency-conversion-field.md)                                         | Checkout           | Breaking         | api      |
| [Removes support for the redirectToCheckout method](https://docs.stripe.com/changelog/clover/2025-09-30/remove-redirect-to-checkout.md)                                                                      | Checkout           | Breaking         | stripejs |
| [Updates initCheckout to be synchronous](https://docs.stripe.com/changelog/clover/2025-09-30/update-init-checkout-synchronous.md)                                                                            | Checkout, Elements | Breaking         | stripejs |
| [Adds support for collecting business and individual names in Checkout Sessions](https://docs.stripe.com/changelog/clover/2025-09-30/checkout-name-collection.md)                                            | Checkout           | Non-breaking     | api      |
| [Adds the ability to exclude payment methods from Checkout Sessions and Payment Intents](https://docs.stripe.com/changelog/clover/2025-09-30/exclude-payment-methods-checkout-sessions.md)                   | Checkout, Payments | Non-breaking     | api      |
| [Adds support for setting the capture method for specific payment methods with the Checkout Sessions API](https://docs.stripe.com/changelog/clover/2025-09-30/checkout-capture-method-per-payment-method.md) | Checkout           | Non-breaking     | api      |
| [Adds support for configuring branding settings for Checkout Sessions](https://docs.stripe.com/changelog/clover/2025-09-30/checkout-sessions-branding-settings.md)                                           | Checkout           | Non-breaking     | api      |
| [Enables specifying units of measurement for Products](https://docs.stripe.com/changelog/clover/2025-09-30/product-data-unit-label.md)                                                                       | Checkout           | Non-breaking     | api      |

### Connect enhancements

| Title                                                                                                                                                                                     | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds specific descriptions for risk requirements during legal, PEP, and sanctions review](https://docs.stripe.com/changelog/clover/2025-09-30/expanded-risk-requirement-descriptions.md) | Connect           | Breaking         | api      |
| [Adds a new error code for business type validations](https://docs.stripe.com/changelog/clover/2025-09-30/business-type-error-code.md)                                                    | Connect           | Breaking         | api      |
| [Adds account balance and payout settings with the Balance Settings API](https://docs.stripe.com/changelog/clover/2025-09-30/balance-settings-ga.md)                                      | Connect, Payouts  | Non-breaking     | api      |

### Elements enhancements

| Title                                                                                                                                                                                         | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Updates default behavior for saved payment methods in Elements with Checkout Sessions](https://docs.stripe.com/changelog/clover/2025-09-30/custom-checkout-saved-payment-method-defaults.md) | Elements          | Breaking         | stripejs |
| [Prevents reusing client secrets for Intents in certain states when initializing Elements](https://docs.stripe.com/changelog/clover/2025-09-30/client-secret-reuse.md)                        | Elements          | Breaking         | stripejs |
| [Removes deprecated messaging and bank elements that were replaced](https://docs.stripe.com/changelog/clover/2025-09-30/stripejs-deprecated-elements-removal.md)                              | Elements          | Breaking         | stripejs |

### Enhancements to payments and payment methods

| Title                                                                                                                                                                                                  | Affected Products                          | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ---------------- | -------- |
| [Changes the set of decline codes used for Alma, Amazon Pay, Billie, Satispay, and South Korean payment methods](https://docs.stripe.com/changelog/clover/2025-09-30/lpm-descriptive-decline-codes.md) | Payments                                   | Breaking         | api      |
| [Adds a processing status to submitted stablecoin payments](https://docs.stripe.com/changelog/clover/2025-09-30/stablecoin-payments-processing-status.md)                                              | Payments                                   | Breaking         | api      |
| [Adds a documented reason for Klarna chargeback losses to Disputes API](https://docs.stripe.com/changelog/clover/2025-09-30/chargeback-loss-reason.md)                                                 | Payments                                   | Non-breaking     | api      |
| [Adds support for the MB WAY payment method](https://docs.stripe.com/changelog/clover/2025-09-30/mb-way-payments.md)                                                                                   | Checkout, Elements, Paymentlinks, Payments | Non-breaking     | api      |

### Terminal enhancements

| Title                                                                                                                                                     | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Japan-specific fields to the Terminal Locations API](https://docs.stripe.com/changelog/clover/2025-09-30/add-japan-fields-to-terminal-locations.md) | Terminal          | Non-breaking     | api      |
| [Adds support for custom BBPOS WisePad 3 splash screens](https://docs.stripe.com/changelog/clover/2025-09-30/custom-bbpos-wisepad3-splash-screens.md)     | Terminal          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                                          | Affected Products                         | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------- | -------- |
| [Adds additional enum values for Radar manual reviews](https://docs.stripe.com/changelog/clover/2025-09-30/radar-manual-review-enum.md)                                                                        | Radar                                     | Breaking         | api      |
| [Updates risk levels for Issuing Authorizations to use standard values](https://docs.stripe.com/changelog/clover/2025-09-30/risk-levels-issuing-authorizations.md)                                             | Issuing                                   | Breaking         | api      |
| [Adds new error codes for failures when creating Payment Methods from Financial Connections Accounts](https://docs.stripe.com/changelog/clover/2025-09-30/financial-connections-payment-method-error-codes.md) | Financialconnections, Invoicing, Payments | Non-breaking     | api      |
| [Adds support for business and individual names on Customers](https://docs.stripe.com/changelog/clover/2025-09-30/customer-business-individual-names.md)                                                       | All products                              | Non-breaking     | api      |
| [Adds support for printing a second line on Issuing physical cards](https://docs.stripe.com/changelog/clover/2025-09-30/issuing_card_second_line.md)                                                           | Issuing                                   | Non-breaking     | api      |
| [Adds cash as a value for the  crypto token currency enum](https://docs.stripe.com/changelog/clover/2025-09-30/crypto-cash-value.md)                                                                           | Crypto                                    | Non-breaking     | api      |
| [Adds a testing developer assistant in Elements with Intents](https://docs.stripe.com/changelog/clover/2025-09-30/stripe-js-developer-assistant.md)                                                            | Elements                                  | Non-breaking     | stripejs |
| [Adds tax calculation provider to Tax settings](https://docs.stripe.com/changelog/clover/2025-09-30/tax-calculation-provider.md)                                                                               | Tax                                       | Non-breaking     | api      |

## 2025-09-30.preview

### Billing enhancements

| Title                                                                                                                                                                                                       | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds pagination and updates fields for aggregrated Billing meter usage data](https://docs.stripe.com/changelog/clover/2025-09-30/update-meter-usage-fields.md)                                             | Billing           | Breaking         | api      |
| [Adds the ability to update automatic tax, invoice creation, and invoice settings for Checkout Sessions](https://docs.stripe.com/changelog/clover/2025-09-30/checkout-sessions-tax-and-invoice-settings.md) | Checkout          | Non-breaking     | api      |
| [Enables prebilling for subscriptions](https://docs.stripe.com/changelog/clover/2025-09-30/subscriptions-prebilling.md)                                                                                     | Billing           | Non-breaking     | api      |
| [Adds the unit label parameter to the product data hash](https://docs.stripe.com/changelog/clover/2025-09-30/add-product-data-unit-label-preview.md)                                                        | Checkout          | Non-breaking     | api      |

### Connect enhancements

| Title                                                                                                                                                                                          | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Moves platform-specific identity fields to a default profile for Accounts](https://docs.stripe.com/changelog/clover/2025-09-30/moving-identity-fields.md)                                     | Connect           | Breaking         | api      |
| [Adds per-currency minimum balances for automatic payouts on the Balance Settings API](https://docs.stripe.com/changelog/clover/2025-09-30/minimum-balance-by-currency-on-balance-settings.md) | Connect, Payouts  | Non-breaking     | api      |
| [Updating Balance Settings no longer requires specifying payment settings](https://docs.stripe.com/changelog/clover/2025-09-30/payments-field-optional-for-update-balance-settings.md)         | Connect, Payouts  | Non-breaking     | api      |

### Payments enhancements

| Title                                                                                                                                                            | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Restructures Smart Disputes recommended evidence field](https://docs.stripe.com/changelog/clover/2025-09-30/restructure-smart-disputes-recommended-evidence.md) | Payments          | Breaking         | api      |
| [Adds the ability to choose how you submit a dispute response](https://docs.stripe.com/changelog/clover/2025-09-30/dispute-submission-method.md)                 | Payments          | Non-breaking     | api      |
| [Adds Outbound Setup Intents to create usable payout methods](https://docs.stripe.com/changelog/clover/2025-09-30/outbound-setup-intents.md)                     | Payments          | Non-breaking     | api      |
| [Adds support for PayPay as a local payment method](https://docs.stripe.com/changelog/clover/2025-09-30/add-paypay-public-preview.md)                            | Payments          | Non-breaking     | api      |

# Basil
[Learn what's changing in Basil](https://docs.stripe.com/changelog/basil.md)
## 2025-08-27.basil

### Billing enhancements

| Title                                                                                                                                                                            | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds a name field to the customer portal configuration object](https://docs.stripe.com/changelog/basil/2025-08-27/customer-portal-config-name.md)                               | Billing           | Non-breaking     | api      |
| [Adds support for invoice items metadata and period in subscriptions and schedules](https://docs.stripe.com/changelog/basil/2025-08-27/add_invoice_items_metadata_and_period.md) | Billing           | Non-breaking     | api      |
| [Adds support for third-party tax on flexible billing mode subscriptions](https://docs.stripe.com/changelog/basil/2025-08-27/3p-tax.md)                                          | Billing           | Non-breaking     | api      |

### Connect and payout enhancements

| Title                                                                                                                                                | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Payout Details embedded component to the Account Session API](https://docs.stripe.com/changelog/basil/2025-08-27/embedded-payout-details.md)   | Connect           | Non-breaking     | api      |
| [Public preview for Payout Details embedded component](https://docs.stripe.com/changelog/basil/2025-08-27/embedded-payout-details-public-preview.md) | Connect           | Non-breaking     | api      |
| [Adds support for paying out to Financial Accounts v2](https://docs.stripe.com/changelog/basil/2025-08-27/add-payout-method-to-payouts.md)           | Payouts           | Non-breaking     | api      |

### Payment method enhancements

| Title                                                                                                                                                          | Affected Products  | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds PayPay settings to the Account object](https://docs.stripe.com/changelog/basil/2025-08-27/add_paypay_payments_settings.md)                               | Connect, Payments  | Non-breaking     | api      |
| [Adds a Charge transaction ID for several payment methods](https://docs.stripe.com/changelog/basil/2025-08-27/transaction-id.md)                               | Payments           | Non-breaking     | api      |
| [Adds the number of installments for Alma payments to Charge objects](https://docs.stripe.com/changelog/basil/2025-08-27/alma-installments.md)                 | Payments           | Non-breaking     | api      |
| [Adds support to include the IOF tax in the amount for Pix payments](https://docs.stripe.com/changelog/basil/2025-08-27/pix-payments-iof-tax.md)               | Checkout, Payments | Non-breaking     | api      |
| [Adds excluded payment method types to the Payment Intents API](https://docs.stripe.com/changelog/basil/2025-08-27/cs_add_excluded_payment_method_types_pi.md) | Payments           | Non-breaking     | api      |

### Terminal enhancements

| Title                                                                                                                                                       | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for simulating card payments on Terminal readers](https://docs.stripe.com/changelog/basil/2025-08-27/card-present-payment-method.md)          | Terminal          | Non-breaking     | api      |
| [Adds support for PayNow on Terminal](https://docs.stripe.com/changelog/basil/2025-08-27/terminal-paynow-api.md)                                            | Terminal          | Non-breaking     | api      |
| [Adds support for MXN currency in Terminal tipping configuration](https://docs.stripe.com/changelog/basil/2025-08-27/terminal-tipping-configuration-mxn.md) | Terminal          | Non-breaking     | api      |
| [Makes CVC optional when presenting a payment method on a simulated reader](https://docs.stripe.com/changelog/basil/2025-08-27/make-cvc-optional.md)        | Terminal          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                      | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Android APK for Terminal to purpose of file uploads](https://docs.stripe.com/changelog/basil/2025-08-27/terminal-android-apk-file-purpose.md)        | All products      | Non-breaking     | api      |
| [Adds support for Dispute Preventions](https://docs.stripe.com/changelog/basil/2025-08-27/add-preventions-to-dispute.md)                                   | Payments          | Non-breaking     | api      |
| [Adds support for custom expiration dates to Issuing virtual cards](https://docs.stripe.com/changelog/basil/2025-08-27/issuing-custom-expiration-dates.md) | Issuing           | Non-breaking     | api      |

## 2025-08-27.preview

### Billing enhancements

| Title                                                                                                                                                | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Makes flexible billing mode the default for new subscriptions](https://docs.stripe.com/changelog/basil/2025-08-27/billing-mode-default-flexible.md) | Billing, Checkout | Breaking         | api      |
| [Removes iterations parameter for subscription schedules](https://docs.stripe.com/changelog/basil/2025-08-27/remove_schedule_phase_iterations.md)    | Billing           | Breaking         | api      |

### Connect enhancements

| Title                                                                                                                                                                       | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Nests the Balance Settings request object under a new Payments parameter](https://docs.stripe.com/changelog/basil/2025-08-27/balance-settings-nested-in-payments-field.md) | Connect, Payouts  | Breaking         | api      |
| [Adds support for deactivating configurations in Accounts v2](https://docs.stripe.com/changelog/basil/2025-08-27/v2_accounts_configuration_deactivation.md)                 | Connect           | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                         | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for payment line items with overcapture](https://docs.stripe.com/changelog/basil/2025-08-27/payment-line-items-overcapture.md)                                  | Payments          | Non-breaking     | api      |
| [Adds a display name to the FinancialAccount object](https://docs.stripe.com/changelog/basil/2025-08-27/financial-account-display-name.md)                                    | Treasury          | Non-breaking     | api      |
| [Adds support for listing a payment method’s mandates](https://docs.stripe.com/changelog/basil/2025-08-27/mandates_listing_support.md)                                        | Payments          | Non-breaking     | api      |
| [Additional properties on PaymentRecord and PaymentAttemptRecord](https://docs.stripe.com/changelog/basil/2025-08-27/payment-records.md)                                      | Payments          | Non-breaking     | api      |
| [Adds support for admin menu passcodes on the Terminal Configuration object](https://docs.stripe.com/changelog/basil/2025-08-27/terminal-configurable-admin-menu-passcode.md) | Terminal          | Non-breaking     | api      |
| [Add the payout_method field as a property on the Payout object](https://docs.stripe.com/changelog/basil/2025-08-27/payout-payout-method.md)                                  | Payouts           | Non-breaking     | api      |
| [Additional ID number types in Accounts v2](https://docs.stripe.com/changelog/basil/2025-08-27/accounts-v2-support-more-id-types.md)                                          | Connect           | Non-breaking     | api      |

## 2025-07-30.basil

### Billing enhancements

| Title                                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Adds a duration parameter for schedule phases](https://docs.stripe.com/changelog/basil/2025-07-30/add-schedule-phase-duration.md)                                                         | Billing           | Non-breaking     | api      |
| [Adds support for quantity adjustment to the Customer Portal Configuration API](https://docs.stripe.com/changelog/basil/2025-07-30/customer-portal-subscription-update-quantity-limits.md) | Billing           | Non-breaking     | api      |
| [Adds helpers to cancel subscriptions for billing periods with mixed intervals](https://docs.stripe.com/changelog/basil/2025-07-30/cancel-at-enums.md)                                     | Billing           | Non-breaking     | api      |
| [Adds support for billing thresholds on flexible billing mode Subscriptions](https://docs.stripe.com/changelog/basil/2025-07-30/billing-thresholds.md)                                     | Billing           | Non-breaking     | api      |
| [Adds support for mixed intervals on the same subscription](https://docs.stripe.com/changelog/basil/2025-07-30/support-mixed-intervals.md)                                                 | Billing           | Non-breaking     | api      |

### Checkout enhancements

| Title                                                                                                                                                                                        | Affected Products                | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------- | -------- |
| [Enhances Checkout for app-to-web purchases](https://docs.stripe.com/changelog/basil/2025-07-30/checkout-origin-context.md)                                                                  | Checkout                         | Non-breaking     | api      |
| [Adds support for disabling future usage of Pix in Checkout Sessions](https://docs.stripe.com/changelog/basil/2025-07-30/disable-future-usage-of-pix-in-checkout-sessions.md)                | Checkout                         | Non-breaking     | api      |
| [Adds support for Invoice Rendering Templates on Checkout and Payment Links](https://docs.stripe.com/changelog/basil/2025-07-30/checkout-payment-link-invoice-rendering-templates.md)        | Checkout, Paymentlinks           | Non-breaking     | api      |
| [Adds support for the NZ BECS Direct Debit local payment method in Checkout and Payment Links](https://docs.stripe.com/changelog/basil/2025-07-30/nz-bank-account-checkout-payment-links.md) | Checkout, Paymentlinks, Payments | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                   | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds transaction ID to Charges for Cash App](https://docs.stripe.com/changelog/basil/2025-07-30/add-cashapp-transaction-id-to-charges.md)                                              | Payments          | Non-breaking     | api      |
| [Adds support for the America/Coyhaique time zone](https://docs.stripe.com/changelog/basil/2025-07-30/america_coyhaique_timezone.md)                                                    | All products      | Non-breaking     | api      |
| [Adds a new value to payment review closed reasons](https://docs.stripe.com/changelog/basil/2025-07-30/add-new-enum-to-payment-review-close-reason.md)                                  | Radar             | Non-breaking     | api      |
| [Adds support for ad-hoc products and prices when creating Payment Links](https://docs.stripe.com/changelog/basil/2025-07-30/ad-hoc-prices-for-payment-links.md)                        | Paymentlinks      | Non-breaking     | api      |
| [Adds support for new tipping currencies to the Terminal Configuration object](https://docs.stripe.com/changelog/basil/2025-07-30/add_terminal_tipping_currency_aed_bgn_huf_chf_ron.md) | Terminal          | Non-breaking     | api      |
| [Adds Connect embedded component for Instant Payouts promotion](https://docs.stripe.com/changelog/basil/2025-07-30/instant-payouts-promotion-embedded-component-ga.md)                  | Connect           | Non-breaking     | api      |

## 2025-07-30.preview

### Connect enhancements

| Title                                                                                                                                                                                       | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Account Links v2 API support for connected accounts created using the Accounts v2 API](https://docs.stripe.com/changelog/basil/2025-07-30/enable-v2-account-links-api-for-connect.md) | Connect           | Breaking         | api      |
| [Renames the parameter for custom settlement timing on the Balance Settings API](https://docs.stripe.com/changelog/basil/2025-07-30/balance-settings-delay-days-rename.md)                  | Connect, Payouts  | Breaking         | api      |
| [Updates schedule customization for weekly and monthly payouts](https://docs.stripe.com/changelog/basil/2025-07-30/payout_schedule_customization_on_balance_settings.md)                    | Connect, Payouts  | Breaking         | api      |
| [Adds Connect embedded component for Instant Payouts promotion](https://docs.stripe.com/changelog/basil/2025-07-30/instant-payouts-promotion-embedded-component.md)                         | Connect           | Non-breaking     | api      |

### Enhanced support for payment line items

| Title                                                                                                                                                                | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for payment line items to incremental authorization](https://docs.stripe.com/changelog/basil/2025-07-30/payment-line-items-increment-authorization.md) | Payments          | Non-breaking     | api      |
| [Adds support for payment line items to multicapture](https://docs.stripe.com/changelog/basil/2025-07-30/payment-line-items-multicapture.md)                         | Payments          | Non-breaking     | api      |
| [Increases payment line items limit to 200](https://docs.stripe.com/changelog/basil/2025-07-30/increase-payment-line-items-limit-to-200.md)                          | Payments          | Non-breaking     | api      |

### Enhancements for Radar and disputes

| Title                                                                                                                                                 | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds a new value to payment review closed reasons](https://docs.stripe.com/changelog/basil/2025-07-30/add-new-enum-value-to-review-close-reasons.md) | Radar             | Breaking         | api      |
| [Adds Smart Disputes to the Disputes API](https://docs.stripe.com/changelog/basil/2025-07-30/adds-smart-disputes.md)                                  | Payments          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                        | Affected Products  | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds a new event type for Payout Method updates](https://docs.stripe.com/changelog/basil/2025-07-30/payout-method-updated-webhook-event.md)                                 | Payouts            | Non-breaking     | api      |
| [Adds validation for active financial addresses to Outbound Payments and Transfers](https://docs.stripe.com/changelog/basil/2025-07-30/add-financial-address-requirement.md) | Treasury           | Non-breaking     | api      |
| [Adds support for accepting Apple’s Tap to Pay on iPhone Terms and Conditions on the web](https://docs.stripe.com/changelog/basil/2025-07-30/terminal-onboarding-links.md)   | Terminal           | Non-breaking     | api      |
| [Adds UPI support to the Subscriptions and Invoices APIs](https://docs.stripe.com/changelog/basil/2025-07-30/cs-upi-pmo-subscription-support.md)                             | Billing, Invoicing | Non-breaking     | api      |

## 2025-06-30.basil

### Connect enhancements

| Title                                                                                                                                                                | Affected Products          | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------- | -------- |
| [Verification Sessions can now collect verification information for a related Person](https://docs.stripe.com/changelog/basil/2025-06-30/identity-related-person.md) | Connect, Identity          | Non-breaking     | api      |
| [Adds the ability to provide proof-of-address documents for connected accounts](https://docs.stripe.com/changelog/basil/2025-06-30/accounts-proof-of-address.md)     | Connect, Issuing, Treasury | Non-breaking     | api      |
| [Adds more flexible schedules for monthly and weekly payouts](https://docs.stripe.com/changelog/basil/2025-06-30/flexible-schedules-payouts.md)                      | Connect, Payouts           | Non-breaking     | api      |

### Payment method enhancements

| Title                                                                                                                                | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Adds new plan types for Japan installments](https://docs.stripe.com/changelog/basil/2025-06-30/add_jp_installments_plan_types.md)   | Payments          | Non-breaking     | api      |
| [Adds support for saving Klarna payment methods](https://docs.stripe.com/changelog/basil/2025-06-30/klarna-saved-payment-methods.md) | Billing, Payments | Non-breaking     | api      |
| [Adds BUUT as a supported bank when using iDEAL](https://docs.stripe.com/changelog/basil/2025-06-30/ideal-buut-support.md)           | Payments          | Non-breaking     | api      |
| [Adds support for crypto payment method](https://docs.stripe.com/changelog/basil/2025-06-30/crypto-payment-method.md)                | Crypto            | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                                          | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds optional filter by status when listing Financial Accounts](https://docs.stripe.com/changelog/basil/2025-06-30/financial-accounts-status-filter.md)                                                       | Treasury          | Non-breaking     | api      |
| [Adds support for collecting card details and confirming Payment Intents to server-driven Terminal integrations](https://docs.stripe.com/changelog/basil/2025-06-30/terminal-server-support-cards-payments.md) | Terminal          | Non-breaking     | api      |
| [Adds Visa compliance disputes](https://docs.stripe.com/changelog/basil/2025-06-30/visa-compliance-disputes.md)                                                                                                | Payments          | Non-breaking     | api      |
| [Adds billing mode for more flexible subscriptions behavior](https://docs.stripe.com/changelog/basil/2025-06-30/billing-mode.md)                                                                               | Billing           | Non-breaking     | api      |

## 2025-06-30.preview

### Additional updates

| Title                                                                                                                                                                                           | Affected Products          | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------- | -------- |
| [Consolidates billing mode configuration across Billing products](https://docs.stripe.com/changelog/basil/2025-06-30/billing-mode-hash.md)                                                      | Billing                    | Breaking         | api      |
| [Adds submission method to dispute evidence details](https://docs.stripe.com/changelog/basil/2025-06-30/add-submission-method-to-disputes-evidence-details.md)                                  | Payments                   | Non-breaking     | api      |
| [Adds support for saving Klarna payment methods](https://docs.stripe.com/changelog/basil/2025-06-30/klarna_saved_payment_methods_preview.md)                                                    | Billing, Payments          | Non-breaking     | api      |
| [Adds the ability to provide proof-of-address documents for connected accounts in v2 APIs](https://docs.stripe.com/changelog/basil/2025-06-30/accounts-api-v2-proof-of-address.md)              | Connect, Issuing, Treasury | Non-breaking     | api      |
| [Adds error types for unsupported countries or entities when requesting capabilities for Accounts v2](https://docs.stripe.com/changelog/basil/2025-06-30/adds-unsupported-capability-status.md) | Connect                    | Non-breaking     | api      |
| [Adds new status and consolidates error codes for money management APIs](https://docs.stripe.com/changelog/basil/2025-06-30/enhance-money-management-apis.md)                                   | Payouts                    | Non-breaking     | api      |

## 2025-05-28.basil

### Enhancements for Balances and Balance Transactions

| Title                                                                                                                                                                 | Affected Products                    | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------- | -------- |
| [Adds balance types to the Balance Transactions API](https://docs.stripe.com/changelog/basil/2025-05-28/add-balance-type-to-balance-transactions.md)                  | Issuing, Payments, Payouts, Treasury | Non-breaking     | api      |
| [Adds refund and dispute prefunding balances to the Balance API](https://docs.stripe.com/changelog/basil/2025-05-28/add-refund-and-dispute-prefunding-to-balances.md) | Payments                             | Non-breaking     | api      |

### Payment method enhancements

| Title                                                                                                                                                                  | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds South Korean payment methods to the Payment Method Configurations API](https://docs.stripe.com/changelog/basil/2025-05-28/korea-payment-method-configuration.md) | Connect           | Non-breaking     | api      |
| [Adds account capability for the Pix payment method for US-based sellers](https://docs.stripe.com/changelog/basil/2025-05-28/adds-pix-capability-for-us-sellers.md)    | Payments          | Non-breaking     | api      |
| [Adds option to Checkout Sessions to let customers remove saved payment methods](https://docs.stripe.com/changelog/basil/2025-05-28/checkout-payment-method-remove.md) | Checkout          | Non-breaking     | api      |
| [Adds capture method option to Satispay payments](https://docs.stripe.com/changelog/basil/2025-05-28/satispay-capture-method-option.md)                                | Payments          | Non-breaking     | api      |
| [Adds support for setting up future usage of Naver Pay in Checkout Sessions](https://docs.stripe.com/changelog/basil/2025-05-28/naver-pay-update.md)                   | Payments          | Non-breaking     | api      |
| [Adds support for WeChat Pay for Setup Intents](https://docs.stripe.com/changelog/basil/2025-05-28/setup-intents-wechat-pay.md)                                        | Payments          | Non-breaking     | api      |
| [Adds network decline codes for PayPal refunds](https://docs.stripe.com/changelog/basil/2025-05-28/paypal_refund_network_decline_code.md)                              | Payments          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                       | Affected Products  | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds simulated S700 device type to Reader API](https://docs.stripe.com/changelog/basil/2025-05-28/simulated-s700-device-type.md)                           | Terminal           | Non-breaking     | api      |
| [Reintroduces billing thresholds](https://docs.stripe.com/changelog/basil/2025-05-28/reintroduce-billing-thresholds.md)                                     | Billing, Invoicing | Non-breaking     | api      |
| [Extracts sex and place of birth from government-issued ID documents](https://docs.stripe.com/changelog/basil/2025-05-28/extract-sex-and-place-of-birth.md) | Identity           | Non-breaking     | api      |
| [Adds metadata field on Tax Calculation line items](https://docs.stripe.com/changelog/basil/2025-05-28/add-metadata-on-tax-calculation-line-item.md)        | Tax                | Non-breaking     | api      |
| [Adds two new Connect embedded components for Disputes](https://docs.stripe.com/changelog/basil/2025-05-28/disputes-embedded-components.md)                 | Connect            | Non-breaking     | api      |
| [Adds forms to Terminal readers to collect user information](https://docs.stripe.com/changelog/basil/2025-05-28/collect-inputs.md)                          | Terminal           | Non-breaking     | api      |
| [Adds support for partial payments on invoices](https://docs.stripe.com/changelog/basil/2025-05-28/partial-payments.md)                                     | Billing, Invoicing | Non-breaking     | api      |

## 2025-05-28.preview

### Billing enhancements

| Title                                                                                                                                                      | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds more flexibility for how you manage subscription end-of-period cancellations](https://docs.stripe.com/changelog/basil/2025-05-28/cancel-at-enums.md) | Billing           | Non-breaking     | api      |
| [Adds the ability to migrate subscriptions to flexible billing mode](https://docs.stripe.com/changelog/basil/2025-05-28/migrate-subscription.md)           | Billing           | Non-breaking     | api      |

### Payments enhancements

| Title                                                                                                                                    | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Replaces tax association status fields](https://docs.stripe.com/changelog/basil/2025-05-28/flatten-tax-association.md)                  | Payments, Tax     | Breaking         | api      |
| [Renames Payment Intent field for linking tax calculation](https://docs.stripe.com/changelog/basil/2025-05-28/rename-async-workflows.md) | Payments, Tax     | Breaking         | api      |

### Additional updates

| Title                                                                                                                                                                             | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for WeChat Pay and Affirm on Terminal](https://docs.stripe.com/changelog/basil/2025-05-28/terminal-wechat-pay-and-affirm.md)                                        | Terminal          | Non-breaking     | api      |
| [Updated validation errors for redaction jobs to specify affected objects](https://docs.stripe.com/changelog/basil/2025-05-28/redaction-jobs-validation-error-erroring-object.md) | All products      | Non-breaking     | api      |

## 2025-04-30.basil

### Events enhancements

| Title                                                                                                                                                         | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds context field to event payload](https://docs.stripe.com/changelog/basil/2025-04-30/additional-context-organization-events.md)                           | All products      | Non-breaking     | api      |
| [Adds a new ping event type for testing an event destination](https://docs.stripe.com/changelog/basil/2025-04-30/cs_document_event_destination_ping_event.md) | All products      | Non-breaking     | api      |

### New country support for Tax Registration

| Title                                                                                                                                                 | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for tax ID types in ten new countries](https://docs.stripe.com/changelog/basil/2025-04-30/add-tax-ids.md)                               | Tax               | Non-breaking     | api      |
| [Tax Registration API now supports twelve new countries](https://docs.stripe.com/changelog/basil/2025-04-30/additional-tax-registration-countries.md) | Tax               | Non-breaking     | api      |

### Payment method enhancements

| Title                                                                                                                                                          | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Affirm as a supported payment method for one-time invoices and subscriptions](https://docs.stripe.com/changelog/basil/2025-04-30/affirm-send-invoice.md) | Billing           | Non-breaking     | api      |
| [Adds tax ID to Payment Method billing details](https://docs.stripe.com/changelog/basil/2025-04-30/add-tax-id-to-billing-details.md)                           | Payments          | Non-breaking     | api      |
| [Adds Pix to payment method configurations](https://docs.stripe.com/changelog/basil/2025-04-30/add_pix_to_payment_method_configuration.md)                     | Payments          | Non-breaking     | api      |
| [Adds capture method option to Billie payments](https://docs.stripe.com/changelog/basil/2025-04-30/billie-capture-method-option.md)                            | Payments          | Non-breaking     | api      |

### Regulatory enhancements

| Title                                                                                                                                                                                              | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds a demographic information hash to the Persons API](https://docs.stripe.com/changelog/basil/2025-04-30/add-us-cfpb-data-to-person.md)                                                         | Connect, Issuing  | Non-breaking     | api      |
| [Adds a minority-owned business designation field to the business profile hash](https://docs.stripe.com/changelog/basil/2025-04-30/add-minority-owned-business-designation-to-business-profile.md) | Connect, Issuing  | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                      | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------- | -------- |
| [Adds a field explaining why refunds are pending](https://docs.stripe.com/changelog/basil/2025-04-30/refund-pending-reason.md)             | Payments           | Non-breaking     | api      |
| [Adds registration date to the Accounts API](https://docs.stripe.com/changelog/basil/2025-04-30/us_cfpb.md)                                | Capital, Issuing   | Non-breaking     | api      |
| [Adds wallet options to Checkout Sessions](https://docs.stripe.com/changelog/basil/2025-04-30/checkout-link-wallet-options.md)             | Checkout           | Non-breaking     | api      |
| [Adds support for card installments on Confirmation Token](https://docs.stripe.com/changelog/basil/2025-04-30/ct-pmo-card-installments.md) | Elements, Payments | Non-breaking     | api      |

## 2025-04-30.preview

### Updates to Accounts v2

| Title                                                                                                                                     | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Payouts are now a capability](https://docs.stripe.com/changelog/basil/2025-04-30/payouts-are-now-a-capability.md)                        | Connect, Tax      | Breaking         | api      |
| [Adds support for third-party tax providers in Accounts v2](https://docs.stripe.com/changelog/basil/2025-04-30/accounts-v2-3p-api-ref.md) | All products      | Non-breaking     | api      |
| [Adds new event types for Accounts v2](https://docs.stripe.com/changelog/basil/2025-04-30/new-accounts-v2-events.md)                      | Connect, Payouts  | Non-breaking     | api      |
| [Updated address validations for Tax](https://docs.stripe.com/changelog/basil/2025-04-30/updated-address-validations-for-tax.md)          | Connect, Tax      | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                          | Affected Products  | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds provider to automatic tax](https://docs.stripe.com/changelog/basil/2025-04-30/taxprovider.md)                                                                                            | Billing, Checkout  | Non-breaking     | api      |
| [Adds the FX Quote API to provide extended exchange rate quotes](https://docs.stripe.com/changelog/basil/2025-04-30/fx-quote-api.md)                                                           | Payments           | Non-breaking     | api      |
| [Adds support for script coupons](https://docs.stripe.com/changelog/basil/2025-04-30/script-coupons.md)                                                                                        | Billing            | Non-breaking     | api      |
| [Adds support for Global Payouts](https://docs.stripe.com/changelog/basil/2025-04-30/adds-support-for-global-payouts.md)                                                                       | Payouts            | Non-breaking     | api      |
| [Adds support for US sellers to accept cross-border Pix payments](https://docs.stripe.com/changelog/basil/2025-04-30/pix_cross_border_in_public_preview.md)                                    | Payments           | Non-breaking     | api      |
| [Adds support for payment line items](https://docs.stripe.com/changelog/basil/2025-04-30/payment-line-items.md)                                                                                | Payments           | Non-breaking     | api      |
| [Adds billing mode to control how prorations and invoices for subscriptions are calculated and orchestrated](https://docs.stripe.com/changelog/basil/2025-04-30/subscriptions-billing-mode.md) | Billing, Invoicing | Non-breaking     | api      |

## 2025-03-31.basil

### Billing enhancements

| Title                                                                                                                                                                                            | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------- | -------- |
| [Adds subscription item-level billing periods and removes subscription-level periods](https://docs.stripe.com/changelog/basil/2025-03-31/deprecate-subscription-current-period-start-and-end.md) | Billing            | Breaking         | api      |
| [Invoicing resources now specify how they were generated](https://docs.stripe.com/changelog/basil/2025-03-31/adds-new-parent-field-to-invoicing-objects.md)                                      | Billing, Invoicing | Breaking         | api      |
| [Adds support for last aggregation formula on meters](https://docs.stripe.com/changelog/basil/2025-03-31/meters-last-agg-formula.md)                                                             | Billing            | Non-breaking     | api      |
| [Adds new webhook event types for Billing Meters](https://docs.stripe.com/changelog/basil/2025-03-31/billing-meter-webhooks.md)                                                                  | Billing            | Non-breaking     | api      |
| [Adds new webhook event types for billing credits](https://docs.stripe.com/changelog/basil/2025-03-31/billing-credit-webhooks.md)                                                                | Billing            | Non-breaking     | api      |

### Checkout enhancements

| Title                                                                                                                                                       | Affected Products      | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------- | -------- |
| [Checkout Session removes shipping details](https://docs.stripe.com/changelog/basil/2025-03-31/checkout-session-remove-shipping-details.md)                 | Checkout               | Breaking         | api      |
| [Checkout Sessions have lower latency and new update semantics](https://docs.stripe.com/changelog/basil/2025-03-31/checkout-legacy-subscription-upgrade.md) | Checkout               | Breaking         | api      |
| [Checkout Session allows shipping option updates](https://docs.stripe.com/changelog/basil/2025-03-31/checkout-session-shipping-options-update-param.md)     | Checkout               | Non-breaking     | api      |
| [Adds permissions parameter to Checkout Sessions](https://docs.stripe.com/changelog/basil/2025-03-31/cs_add_checkout_session_permissions.md)                | Checkout               | Non-breaking     | api      |
| [Adds optional items to Checkout Sessions and Payment Links](https://docs.stripe.com/changelog/basil/2025-03-31/checkout_optional_items.md)                 | Checkout, Paymentlinks | Non-breaking     | api      |

### Coupons enhancements

| Title                                                                                                                                                                   | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Removes support for discount coupons that don’t have a specified end time](https://docs.stripe.com/changelog/basil/2025-03-31/restrict-coupon-duration.md)             | Billing           | Breaking         | api      |
| [Removes coupon and promotion code parameters with stackable discounts](https://docs.stripe.com/changelog/basil/2025-03-31/deprecate-singular-coupon-promotion-code.md) | Billing           | Breaking         | api      |

### Deprecations to billing features

| Title                                                                                                                                                               | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Replaces Upcoming Invoice API methods with the Create Preview Invoice API](https://docs.stripe.com/changelog/basil/2025-03-31/invoice-preview-api-deprecations.md) | Billing, Invoicing | Breaking         | api      |
| [Removes legacy usage-based billing](https://docs.stripe.com/changelog/basil/2025-03-31/deprecate-legacy-usage-based-billing.md)                                    | Billing, Invoicing | Breaking         | api      |

### Elements with Checkout Session

| Title                                                                                                                                 | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds custom UI mode to Checkout Sessions](https://docs.stripe.com/changelog/basil/2025-03-31/add-checkout-session-custom-ui-mode.md) | Checkout           | Non-breaking     | api      |
| [Adds the initCheckout method](https://docs.stripe.com/changelog/basil/2025-03-31/add-init-checkout.md)                               | Checkout, Elements | Non-breaking     | stripejs |

### Increase Invoice flexibility

| Title                                                                                                                                                                                                                | Affected Products            | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------- | -------- |
| [Replaces top-level price fields with improved price modeling on Invoice Items and Invoice Line Items](https://docs.stripe.com/changelog/basil/2025-03-31/invoice-pricing-configurations.md)                         | Billing, Invoicing           | Breaking         | api      |
| [Replaces top-level tax-related properties with improved tax modeling on Invoices, Invoice Line Items, and Credit Note Line Items](https://docs.stripe.com/changelog/basil/2025-03-31/invoice-tax-configurations.md) | Billing, Invoicing           | Breaking         | api      |
| [Adds support for multiple (partial) payments on invoices](https://docs.stripe.com/changelog/basil/2025-03-31/add-support-for-multiple-partial-payments-on-invoices.md)                                              | Billing, Invoicing, Payments | Breaking         | api      |
| [Adds jurisdiction level and taxability reason to manual tax amounts on invoices](https://docs.stripe.com/changelog/basil/2025-03-31/invoice-manual-tax-amount-fields.md)                                            | Invoicing                    | Non-breaking     | api      |

### Issuing enhancements

| Title                                                                                                                                                                                           | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds reason code for Issuing authorizations created while Stripe is unavailable](https://docs.stripe.com/changelog/basil/2025-03-31/new-network-fallback-issuing-authorization-reason-code.md) | Issuing           | Breaking         | api      |
| [HTTP Accept headers for webhooks now specify JSON during Issuing authorizations](https://docs.stripe.com/changelog/basil/2025-03-31/issuing-json-webhook.md)                                   | Issuing           | Breaking         | api      |
| [Adds expired status for Issuing Authorizations](https://docs.stripe.com/changelog/basil/2025-03-31/issuing-authorizations-expired.md)                                                          | Issuing           | Breaking         | api      |

### Payment enhancements

| Title                                                                                                                                                                                          | Affected Products                                                       | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------- | -------- |
| [Updates the Vault and Forward API to return a 402 status code for upstream request timeouts](https://docs.stripe.com/changelog/basil/2025-03-31/vault-forward-api-returns-402.md)             | Payments                                                                | Breaking         | api      |
| [Removes manual capture method for Interac cards](https://docs.stripe.com/changelog/basil/2025-03-31/deprecate-interac-present-manual-capture-method.md)                                       | Payments, Terminal                                                      | Breaking         | api      |
| [Payment Methods won’t allow modifying fields for Naver Pay after the object is first created](https://docs.stripe.com/changelog/basil/2025-03-31/naver-pay-payment-method.md)                 | Payments                                                                | Breaking         | api      |
| [Partially capturing or canceling payments no longer creates a Refund](https://docs.stripe.com/changelog/basil/2025-03-31/remove-refund-from-partial-capture-and-payment-cancellation-flow.md) | Payments                                                                | Breaking         | api      |
| [Adds support for Klarna in the Hosted Invoice Page](https://docs.stripe.com/changelog/basil/2025-03-31/klarna-send-invoice.md)                                                                | Billing                                                                 | Non-breaking     | api      |
| [Adds ability to configure saved payment methods for one-time payments on the Hosted Invoice Page](https://docs.stripe.com/changelog/basil/2025-03-31/hosted-payment-method-save.md)           | Connect, Invoicing                                                      | Non-breaking     | api      |
| [Adds support for saving and reusing Naver Pay payment methods](https://docs.stripe.com/changelog/basil/2025-03-31/naver-pay-recurring.md)                                                     | Billing, Checkout, Elements, Paymentlinks, Payments                     | Non-breaking     | api      |
| [Adds support for the Billie local payment method](https://docs.stripe.com/changelog/basil/2025-03-31/add-billie.md)                                                                           | Checkout, Connect, Elements, Paymentlinks, Payments, Sigma              | Non-breaking     | api      |
| [Adds support for the Satispay local payment method](https://docs.stripe.com/changelog/basil/2025-03-31/satispay-lpm.md)                                                                       | Checkout, Connect, Elements, Paymentlinks, Payments, Sigma              | Non-breaking     | api      |
| [Makes the client parameter optional for WeChat Pay until confirmation](https://docs.stripe.com/changelog/basil/2025-03-31/lient-param-optional-wechatpay-before-confirmation.md)              | Invoicing                                                               | Non-breaking     | api      |
| [Adds support for the New Zealand BECS Direct Debit local payment method](https://docs.stripe.com/changelog/basil/2025-03-31/nz-bank-account.md)                                               | Billing, Checkout, Connect, Elements, Invoicing, Paymentlinks, Payments | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                      | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------- | -------- |
| [Removes total count expansion for list API methods](https://docs.stripe.com/changelog/basil/2025-03-31/deprecate-total-count-expansion.md)                                                | All products       | Breaking         | api      |
| [Adds new error codes for required verifications](https://docs.stripe.com/changelog/basil/2025-03-31/adds-requirement-error-codes.md)                                                      | Connect            | Breaking         | api      |
| [Updates the default layout for Payment Element](https://docs.stripe.com/changelog/basil/2025-03-31/default-layout-of-payment-element.md)                                                  | Elements           | Breaking         | stripejs |
| [Changes the political exposure property of the Person object from a string to an enum](https://docs.stripe.com/changelog/basil/2025-03-31/political-exposure-persons-api.md)              | Connect            | Breaking         | api      |
| [Adds default value to custom fields on Payment Links](https://docs.stripe.com/changelog/basil/2025-03-31/default-value-payment-links-custom-fields.md)                                    | Paymentlinks       | Non-breaking     | api      |
| [Expanded availability of Account KYC data](https://docs.stripe.com/changelog/basil/2025-03-31/availability_of_additional_kyc_data.md)                                                     | Connect            | Non-breaking     | api      |
| [Adds new error code for failures with the Setup Intents API using mobile wallets](https://docs.stripe.com/changelog/basil/2025-03-31/terminal-mobile-wallets-setup-intents-error-code.md) | Payments, Terminal | Non-breaking     | api      |
| [Adds presentment details for Adaptive Pricing](https://docs.stripe.com/changelog/basil/2025-03-31/add_presentment_details.md)                                                             | Checkout           | Non-breaking     | api      |
| [Adds BalanceTransaction types related to pay with Stripe balance](https://docs.stripe.com/changelog/basil/2025-03-31/add_pay_with_stripe_balance_bt_types.md)                             | Connect, Payments  | Non-breaking     | api      |
| [Introduces new customer balance transaction types](https://docs.stripe.com/changelog/basil/2025-03-31/new-customer-transaction-types.md)                                                  | Billing            | Non-breaking     | api      |
| [Removes support for the page parameter](https://docs.stripe.com/changelog/basil/2025-03-31/remove-page-event-destinations.md)                                                             | All products       | Non-breaking     | api      |
| [Adds ability to configure WiFi for Terminal readers](https://docs.stripe.com/changelog/basil/2025-03-31/terminal-wifi-configuration.md)                                                   | Terminal           | Non-breaking     | api      |

# Acacia
[Learn what's changing in Acacia](https://docs.stripe.com/changelog/acacia.md)
## 2025-02-24.acacia

### Improved workflows for Checkout Sessions

| Title                                                                                                                                                     | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for blocking specific card brands in Checkout Sessions](https://docs.stripe.com/changelog/acacia/2025-02-24/checkout_add_brands_blocked.md) | Checkout          | Non-breaking     | api      |
| [Checkout Sessions now group customer information in one field](https://docs.stripe.com/changelog/acacia/2025-02-24/checkout-sessions-collected-info.md)  | Checkout          | Non-breaking     | api      |

### More flexibility for buy now, pay later methods

| Title                                                                                                                                                                                              | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Makes shipping information an optional parameter for Afterpay payments](https://docs.stripe.com/changelog/acacia/2025-02-24/afterpay-shipping-details-optional.md)                                | Payments          | Non-breaking     | api      |
| [Makes billing country and email fields optional for Klarna payments](https://docs.stripe.com/changelog/acacia/2025-02-24/cs_make_billing_country_and_email_field_optional_for_klarna_payments.md) | Payments          | Non-breaking     | api      |

### More granular control of credit grants

| Title                                                                                                                                                   | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Credit grants can now be applied to specific prices](https://docs.stripe.com/changelog/acacia/2025-02-24/billing-credits-price-level-applicability.md) | Billing           | Non-breaking     | api      |
| [Credit grants can now be prioritized](https://docs.stripe.com/changelog/acacia/2025-02-24/billing-credits-priority.md)                                 | Billing           | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                             | Affected Products  | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds metadata field to the Products API for creating an inline default price](https://docs.stripe.com/changelog/acacia/2025-02-24/products-default-price-data-metadata-field.md) | Billing            | Non-breaking     | api      |
| [Adds ability to schedule debit payments for a specific date](https://docs.stripe.com/changelog/acacia/2025-02-24/target-date.md)                                                 | Payments           | Non-breaking     | api      |
| [Versioning in Stripe JS](https://docs.stripe.com/changelog/acacia/2025-02-24/stripe-js-versioning.md)                                                                            | Checkout, Elements | Non-breaking     | stripejs |

## 2025-01-27.acacia

### Checkout enhancements

| Title                                                                                                                                           | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds discounts field to Checkout Sessions](https://docs.stripe.com/changelog/acacia/2025-01-27/checkout-sessions-discounts-field.md)           | Checkout          | Non-breaking     | api      |
| [Adds Sudan to allowed shipping countries for Checkout](https://docs.stripe.com/changelog/acacia/2025-01-27/checkout-sudan-shipping-support.md) | Checkout          | Non-breaking     | api      |

### Company details for Accounts

| Title                                                                                                                                                                            | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for ownership exemption reason to the Accounts API](https://docs.stripe.com/changelog/acacia/2025-01-27/ownership-exemption-reason-accounts-api.md)                | Connect           | Non-breaking     | api      |
| [Adds directorship declaration to the Accounts API](https://docs.stripe.com/changelog/acacia/2025-01-27/directorship-declaration.md)                                             | Connect           | Non-breaking     | api      |
| [Adds proof of ultimate beneficial ownership as a document type](https://docs.stripe.com/changelog/acacia/2025-01-27/proof-of-ultimate-beneficial-ownership-document-support.md) | Connect           | Non-breaking     | api      |

### Payment method enhancements

| Title                                                                                                                                          | Affected Products  | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds support for the Pay by Bank local payment method](https://docs.stripe.com/changelog/acacia/2025-01-27/pay-by-bank-lpm.md)                | Checkout, Payments | Non-breaking     | api      |
| [Adds PayPal country property to the PaymentMethods and Charge objects](https://docs.stripe.com/changelog/acacia/2025-01-27/paypal-country.md) | Payments           | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                             | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds advice code to Charges](https://docs.stripe.com/changelog/acacia/2025-01-27/charge-outcome-advice-code.md)                                                  | Payments          | Non-breaking     | api      |
| [Modify phone number collection on Payment Links](https://docs.stripe.com/changelog/acacia/2025-01-27/add-phone-number-collection-update-payment-links-api.md)    | Paymentlinks      | Non-breaking     | api      |
| [Makes Issuing and Treasury embedded components generally available](https://docs.stripe.com/changelog/acacia/2025-01-27/issuing-treasury-embedded-components.md) | Issuing, Treasury | Non-breaking     | api      |
| [Adds support for multiple financial accounts per business](https://docs.stripe.com/changelog/acacia/2025-01-27/multi-fa.md)                                      | Treasury          | Non-breaking     | api      |
| [Adds support for collecting tips in JPY currency to Terminal](https://docs.stripe.com/changelog/acacia/2025-01-27/terminal-jp-supported-country.md)              | Terminal          | Non-breaking     | api      |

## 2024-12-18.acacia

### Billing enhancements

| Title                                                                                                                                                                            | Affected Products  | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds support for reinstating Billing Credits on Invoice voiding](https://docs.stripe.com/changelog/acacia/2024-12-18/billing-credits-invoice-voiding.md)                        | Billing, Invoicing | Non-breaking     | api      |
| [Modify trial subscriptions created by Payment Links](https://docs.stripe.com/changelog/acacia/2024-12-18/add-trial-days-update-payment-links-api.md)                            | Paymentlinks       | Non-breaking     | api      |
| [Billing Portal Configuration always returns period end date in responses](https://docs.stripe.com/changelog/acacia/2024-12-18/portal-config-schedule-at-period-end-required.md) | Billing            | Non-breaking     | api      |

### Issuing enhancements

| Title                                                                                                                                                     | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Issuing authorizations now include merchant tax ID number](https://docs.stripe.com/changelog/acacia/2024-12-18/issuing-merchant-tax-id.md)               | Issuing           | Non-breaking     | api      |
| [Creates Issuing authorizations when Stripe is unavailable](https://docs.stripe.com/changelog/acacia/2024-12-18/issuing-auths-when-stripe-unavailable.md) | Issuing           | Non-breaking     | api      |

### Payment method enhancements

| Title                                                                                                                                                                  | Affected Products  | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds additional beneficiary information for bank transfer payments](https://docs.stripe.com/changelog/acacia/2024-12-18/new-bank-transfer-beneficiary-information.md) | Payments           | Non-breaking     | api      |
| [Adds funding details to Amazon Pay and Revolut Pay charges](https://docs.stripe.com/changelog/acacia/2024-12-18/charge-pm-details.md)                                 | Payments           | Non-breaking     | api      |
| [Adds support for SEPA Direct Debit and Bacs Direct Debit mandate reference prefix](https://docs.stripe.com/changelog/acacia/2024-12-18/mandate-reference-prefix.md)   | Checkout, Payments | Non-breaking     | api      |

### Payout enhancements

| Title                                                                                                                                          | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds SDK support for trace IDs](https://docs.stripe.com/changelog/acacia/2024-12-18/trace-id-sdk.md)                                          | Payments          | Non-breaking     | api      |
| [Adds new balance transaction types to support minimum balance](https://docs.stripe.com/changelog/acacia/2024-12-18/payout-minimum-balance.md) | Payouts           | Non-breaking     | api      |

### Tax enhancements

| Title                                                                                                                                                     | Affected Products       | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------- | -------- |
| [Adds disabled reason to invoices, subscriptions, and schedules](https://docs.stripe.com/changelog/acacia/2024-12-18/add-disabled-reason.md)              | Tax, Billing, Invoicing | Non-breaking     | api      |
| [Adds support for tax ID types in 19 new countries](https://docs.stripe.com/changelog/acacia/2024-12-18/tax-ids-19-new-countries.md)                      | Tax                     | Non-breaking     | api      |
| [Adds support for 21 new countries to the Tax Registration API](https://docs.stripe.com/changelog/acacia/2024-12-18/tax-registration-21-new-countries.md) | Tax                     | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Adds signature request as a replacement option for the Vault and Forward API](https://docs.stripe.com/changelog/acacia/2024-12-18/vault-and-forward-request-signature-replacement.md)     | All products      | Non-breaking     | api      |
| [Adds support for responding to Visa compliance disputes](https://docs.stripe.com/changelog/acacia/2024-12-18/visa-compliance.md)                                                          | Payments          | Non-breaking     | api      |
| [Adds network advice and decline codes](https://docs.stripe.com/changelog/acacia/2024-12-18/network-advice-code-network-decline-code.md)                                                   | Payments          | Non-breaking     | api      |
| [Supports redisplaying payment methods for Cards and Sources](https://docs.stripe.com/changelog/acacia/2024-12-18/cards-sources-allow-redisplay.md)                                        | Payments          | Non-breaking     | api      |
| [Adds field-level permissions for revenue and worker count in an Account’s business profile](https://docs.stripe.com/changelog/acacia/2024-12-18/business-profile-revenue-worker-count.md) | Connect           | Non-breaking     | api      |
| [Adds network transaction ID to charges](https://docs.stripe.com/changelog/acacia/2024-12-18/charge-display-network-transaction-id.md)                                                     | Payments          | Non-breaking     | api      |
| [Adds regulated status field to card objects in several APIs](https://docs.stripe.com/changelog/acacia/2024-12-18/regulated-status.md)                                                     | Payments          | Non-breaking     | api      |

## 2024-11-20.acacia

### Additional payment flexibility

| Title                                                                                                                                                                  | Affected Products      | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------- | -------- |
| [Adds support for enabling Adaptive Pricing per Checkout Session](https://docs.stripe.com/changelog/acacia/2024-11-20/adaptive-pricing-param.md)                       | Checkout               | Non-breaking     | api      |
| [Customize the submit button recurring Payment Links and Checkout Sessions](https://docs.stripe.com/changelog/acacia/2024-11-20/submit-type-recurring-cpl.md)          | Checkout, Paymentlinks | Non-breaking     | api      |
| [Adds support for advanced card features on Checkout Sessions](https://docs.stripe.com/changelog/acacia/2024-11-20/advanced-card-features.md)                          | Checkout               | Non-breaking     | api      |
| [Allows Link card-only integrations to accept non-card payments under Link card brand](https://docs.stripe.com/changelog/acacia/2024-11-20/link-card-brand.md)         | Payments               | Non-breaking     | api      |
| [Adds additional beneficiary information for bank transfer payments](https://docs.stripe.com/changelog/acacia/2024-11-20/new-bank-transfer-beneficiary-information.md) | Payments               | Non-breaking     | api      |

### Issuing enhancements

| Title                                                                                                                                                                                                                  | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for merchant amount and currency for test mode authorizations](https://docs.stripe.com/changelog/acacia/2024-11-20/add-merchant-currency-and-merchant-amount-on-create-testmode-authorization-method.md) | Issuing           | Non-breaking     | api      |
| [Adds support for issuing fraud challenges](https://docs.stripe.com/changelog/acacia/2024-11-20/issuing-fraud-challenges.md)                                                                                           | Issuing           | Non-breaking     | api      |

### Payment method enhancements

| Title                                                                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds network decline code field for Swish and BLIK refunds](https://docs.stripe.com/changelog/acacia/2024-11-20/refunds-network-decline-code.md)                                                                          | Payments          | Non-breaking     | api      |
| [Adds support for SEPA Direct Debit and Bacs Direct Debit mandate reference prefixes in Checkout Sessions](https://docs.stripe.com/changelog/acacia/2024-11-20/checkout-sessions-sepa-debit-bacs-debit-mandate-options.md) | Checkout          | Non-breaking     | api      |
| [Specifying an originating payment method for Inbound Transfers is now optional](https://docs.stripe.com/changelog/acacia/2024-11-20/inbound-transfers-optional-pm.md)                                                     | Treasury          | Non-breaking     | api      |
| [Use configurable capture methods and set up future usage for South Korean payment methods](https://docs.stripe.com/changelog/acacia/2024-11-20/south-korea-payment-methods.md)                                            | Checkout          | Non-breaking     | api      |

### Support for new tax types

| Title                                                                                                      | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for Service Tax type](https://docs.stripe.com/changelog/acacia/2024-11-20/service_tax.md)    | Tax               | Non-breaking     | api      |
| [Adds tax ID support for Liechtenstein VAT](https://docs.stripe.com/changelog/acacia/2024-11-20/li_vat.md) | Tax               | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                             | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Trace payouts with a unique identifier](https://docs.stripe.com/changelog/acacia/2024-11-20/payout-trace-id-api.md)                                                                              | Payouts           | Non-breaking     | api      |
| [Converts properties on the Account object from a String to an enum](https://docs.stripe.com/changelog/acacia/2024-11-20/account-disabled-reason.md)                                              | Connect           | Non-breaking     | api      |
| [Adds indicator for connected accounts that must log in before using embedded components](https://docs.stripe.com/changelog/acacia/2024-11-20/account-sessions-stripe-authentication-response.md) | Connect           | Non-breaking     | api      |
| [Adds support for authorizers to Person API](https://docs.stripe.com/changelog/acacia/2024-11-20/authorizer-person-api.md)                                                                        | Connect           | Non-breaking     | api      |

## 2024-10-28.acacia

### Additional tax registration options

| Title                                                                                                                                                             | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for new countries to the Tax Registration API](https://docs.stripe.com/changelog/acacia/2024-10-28/tax-registration-new-countries.md)               | Tax               | Non-breaking     | api      |
| [Adds support for tax ID types in several new countries](https://docs.stripe.com/changelog/acacia/2024-10-28/tax-ids.md)                                          | Tax               | Non-breaking     | api      |
| [Adds support for collecting retail delivery fees](https://docs.stripe.com/changelog/acacia/2024-10-28/tax-retail-delivery-fee.md)                                | Tax               | Non-breaking     | api      |
| [Adds option to automatically validate customer tax location during an update](https://docs.stripe.com/changelog/acacia/2024-10-28/tax-validate-location-auto.md) | Tax               | Non-breaking     | api      |

### Billing credit grants

| Title                                                                                                                                                    | Affected Products  | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds Credit Grant APIs and resources](https://docs.stripe.com/changelog/acacia/2024-10-28/billing-credits-apis.md)                                      | Billing, Invoicing | Non-breaking     | api      |
| [Adds support for pre-tax credit amount information to invoices](https://docs.stripe.com/changelog/acacia/2024-10-28/billing-credits-invoice.md)         | Billing, Invoicing | Non-breaking     | api      |
| [Adds support for pre-tax credit amount information to credit notes](https://docs.stripe.com/changelog/acacia/2024-10-28/billing-credits-credit-note.md) | Billing, Invoicing | Non-breaking     | api      |

### Event destinations and event types

| Title                                                                                                                                                                 | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Event Destinations v2 API endpoint](https://docs.stripe.com/changelog/acacia/2024-10-28/event-destinations-api.md)                                              | All products      | Non-breaking     | api      |
| [Adds event type for updated receipt data in Issuing transactions](https://docs.stripe.com/changelog/acacia/2024-10-28/issuing-transactions-updated-receipt-event.md) | Issuing           | Non-breaking     | api      |

### New payment methods

| Title                                                                                                                                    | Affected Products                                              | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------- | -------- |
| [Adds support for new South Korean payment methods](https://docs.stripe.com/changelog/acacia/2024-10-28/south-korean-payment-methods.md) | Billing, Checkout, Elements, Invoicing, Paymentlinks, Payments | Non-breaking     | api      |
| [Adds support for Alma in France](https://docs.stripe.com/changelog/acacia/2024-10-28/alma.md)                                           | Checkout, Elements, Paymentlinks, Payments                     | Non-breaking     | api      |

### Payment method enhancements

| Title                                                                                                                                             | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds a metadata field to the Vault and Forward API](https://docs.stripe.com/changelog/acacia/2024-10-28/forwarding-api-metadata-field.md)        | Payments          | Non-breaking     | api      |
| [Adds Polish PLN currency support to Terminal tipping configuration](https://docs.stripe.com/changelog/acacia/2024-10-28/terminal-tipping-pln.md) | Terminal          | Non-breaking     | api      |
| [Supports domain registration for Amazon Pay](https://docs.stripe.com/changelog/acacia/2024-10-28/amazon-pay-domain-registration.md)              | Elements          | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                               | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for disabling Stripe user authentication for certain embedded components](https://docs.stripe.com/changelog/acacia/2024-10-28/disable-stripe-user-authentication-account-sessions.md) | Connect           | Non-breaking     | api      |
| [Adds a test helper that updates the shipping status for physical cards](https://docs.stripe.com/changelog/acacia/2024-10-28/testmode-helper-shipping-status.md)                                    | Issuing           | Non-breaking     | api      |
| [Adds created, updated, and failed events for all refund types](https://docs.stripe.com/changelog/acacia/2024-10-28/refund-webhook-update.md)                                                       | Payments          | Non-breaking     | api      |
| [Adds pricing groups to the Accounts API](https://docs.stripe.com/changelog/acacia/2024-10-28/pricing-groups-account-objects.md)                                                                    | Connect, Payments | Non-breaking     | api      |
| [Adds scheduled subscription downgrades in the customer portal](https://docs.stripe.com/changelog/acacia/2024-10-28/customer-portal-schedule-downgrades.md)                                         | Billing           | Non-breaking     | api      |
| [Makes business profile optional for customer portal configuration](https://docs.stripe.com/changelog/acacia/2024-10-28/customer-portal-config-business-profile.md)                                 | Billing           | Non-breaking     | api      |
| [Uses Visa’s Compelling Evidence 3.0 to respond to qualifying disputes](https://docs.stripe.com/changelog/acacia/2024-10-28/visa-compelling-evidence-3-0.md)                                        | All products      | Non-breaking     | api      |
| [Adds support for scheduling invoice finalization](https://docs.stripe.com/changelog/acacia/2024-10-28/schedule-invoice-finalization.md)                                                            | Invoicing         | Non-breaking     | api      |

## 2024-09-30.acacia

### Add alerts, monitoring, and reporting to usage-based billing

| Title                                                                                                                                                                             | Affected Products  | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Adds contextual filters to billing alerts](https://docs.stripe.com/changelog/acacia/2024-09-30/billing-alerts-contextualizing-filters.md)                                        | Billing            | Breaking         | api      |
| [Adds an Alerts API for usage-based billing](https://docs.stripe.com/changelog/acacia/2024-09-30/billing-alerts-api.md)                                                           | Billing            | Non-breaking     | api      |
| [Adds an event for triggered billing alerts](https://docs.stripe.com/changelog/acacia/2024-09-30/billing-alert-trigger-event.md)                                                  | Billing            | Non-breaking     | api      |
| [Adds support for listening to triggered billing alerts](https://docs.stripe.com/changelog/acacia/2024-09-30/billing-alert-webhook-listener.md)                                   | Billing            | Non-breaking     | api      |
| [Adds billing alert resources and endpoints](https://docs.stripe.com/changelog/acacia/2024-09-30/adds-billing-alert-resources-endpoints.md)                                       | Billing            | Non-breaking     | api      |
| [Adds support for subscriptions and subscription items to billing alerts](https://docs.stripe.com/changelog/acacia/2024-09-30/billing-alerts-subscription-items-subscriptions.md) | Billing, Invoicing | Non-breaking     | api      |
| [Adds Meter Event v2 API endpoints](https://docs.stripe.com/changelog/acacia/2024-09-30/usage-based-billing-v2-meter-events-api.md)                                               | Billing            | Non-breaking     | api      |

### Add filtering support for Financial Connections

| Title                                                                                                                                                                | Affected Products    | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------- | -------- |
| [Adds support for filtering by account subcategories on Financial Connections](https://docs.stripe.com/changelog/acacia/2024-09-30/financial-connections-filters.md) | Financialconnections | Non-breaking     | api      |
| [Expands filtering support for Financial Connections Sessions](https://docs.stripe.com/changelog/acacia/2024-09-30/financial-connections-additional-filters.md)      | Financialconnections | Non-breaking     | api      |

### Add new Invoice Rendering Template resource

| Title                                                                                                                                                          | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds Invoice Rendering Templates for Invoices](https://docs.stripe.com/changelog/acacia/2024-09-30/invoice-rendering-template-resource.md)                    | Invoicing         | Non-breaking     | api      |
| [Adds retrieve and archive methods for Invoice Rendering Templates](https://docs.stripe.com/changelog/acacia/2024-09-30/invoice-rendering-template-methods.md) | Invoicing         | Non-breaking     | api      |
| [Adds support for templates to Invoices and Customers](https://docs.stripe.com/changelog/acacia/2024-09-30/invoice-rendering-template-parameter.md)            | Invoicing         | Non-breaking     | api      |
| [Adds version support for Invoice Rendering Templates](https://docs.stripe.com/changelog/acacia/2024-09-30/invoice-rendering-template-version.md)              | Invoicing         | Non-breaking     | api      |

### Add support for new payment methods

| Title                                                                                                                                                              | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Adds support for three new payment methods: Multibanco, Twint, and Zip](https://docs.stripe.com/changelog/acacia/2024-09-30/payment-links-new-payment-methods.md) | Paymentlinks      | Non-breaking     | api      |
| [Adds support for using the Multibanco payment method with  billing](https://docs.stripe.com/changelog/acacia/2024-09-30/billing-mutlibanco-support.md)            | Billing           | Non-breaking     | api      |
| [Adds Twint to the PaymentMethodConfiguration API](https://docs.stripe.com/changelog/acacia/2024-09-30/twint-support-payment-method-configuration.md)              | Payments          | Non-breaking     | api      |
| [Adds Girocard as a PaymentMethod brand and network](https://docs.stripe.com/changelog/acacia/2024-09-30/adds-girocard-paymentmethod-brand-network.md)             | Payments          | Non-breaking     | api      |

### Add tax IDs for Switzerland and Croatia, and optional tax ID requirement

| Title                                                                                                                                                                                       | Affected Products      | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------- | -------- |
| [Adds Switzerland UID as a supported customer tax ID](https://docs.stripe.com/changelog/acacia/2024-09-30/switzerland-tax-uid.md)                                                           | Invoicing, Tax         | Non-breaking     | api      |
| [Adds Croatian Personal Identification Number to supported Tax IDs](https://docs.stripe.com/changelog/acacia/2024-09-30/adds-tax-id-type-hr_oib-croatian-personal-id-number.md)             | Billing, Checkout, Tax | Non-breaking     | api      |
| [Adds support for requiring a customer tax ID on Checkout and Payment Links](https://docs.stripe.com/changelog/acacia/2024-09-30/requiring-customer-tax-id-checkout-session-paymentlink.md) | Checkout, Paymentlinks | Non-breaking     | api      |

### Enhancements for Terminal readers and integrations

| Title                                                                                                                                                                                        | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Updates consent modeling for saving cards with Terminal](https://docs.stripe.com/changelog/acacia/2024-09-30/terminal-remove-customer-consent-require-allow-redisplay.md)                   | Terminal          | Breaking         | api      |
| [Adds support for configuring the reboot time setting](https://docs.stripe.com/changelog/acacia/2024-09-30/terminal-reboot-window.md)                                                        | Terminal          | Non-breaking     | api      |
| [Adds the Stripe S700 reader as a valid device type](https://docs.stripe.com/changelog/acacia/2024-09-30/terminal-reader-s700.md)                                                            | Terminal          | Non-breaking     | api      |
| [Adds details about offline collection on `card_present` PaymentMethod objects](https://docs.stripe.com/changelog/acacia/2024-09-30/terminal-offline-details-card-present-paymentmethods.md) | Terminal          | Non-breaking     | api      |

### Improve address validation and dispute and regulatory management for Issuing

| Title                                                                                                                                                                 | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Updates the default value for shipping address validation](https://docs.stripe.com/changelog/acacia/2024-09-30/card-shipping-status-submitted-address-validation.md) | Issuing           | Breaking         | api      |
| [Adds address validation for physical cards](https://docs.stripe.com/changelog/acacia/2024-09-30/issuing-address-validation.md)                                       | Issuing           | Non-breaking     | api      |
| [Adds a new webhook event for when funds are deducted as part of a dispute](https://docs.stripe.com/changelog/acacia/2024-09-30/issuing-webhook-fund-deduction.md)    | Issuing           | Non-breaking     | api      |

### New error codes for more robust testing

| Title                                                                                                                                                                                                      | Affected Products   | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------------- | -------- |
| [Adds error code for exceeded transaction limits](https://docs.stripe.com/changelog/acacia/2024-09-30/error-code-transaction-limit.md)                                                                     | Invoicing, Payments | Non-breaking     | api      |
| [Adds new error code for invalid mandate prefixes to Bacs Direct Debit and SEPA Direct Debit payments](https://docs.stripe.com/changelog/acacia/2024-09-30/error-code-invalid-mandate-reference-prefix.md) | Payments            | Non-breaking     | api      |

### Payment method enhancements

| Title                                                                                                                                                                         | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds option to retrieve CVC tokens on Confirmation Tokens](https://docs.stripe.com/changelog/acacia/2024-09-30/support-payment-method-options-confirmation.md)               | Elements          | Non-breaking     | api      |
| [Adds customer ID to payment method preview on a confirmation token](https://docs.stripe.com/changelog/acacia/2024-09-30/support-customer-payment-method-preview.md)          | Elements          | Non-breaking     | api      |
| [Adds support for identifying the unique payer for the BLIK payment method](https://docs.stripe.com/changelog/acacia/2024-09-30/buyer-id-blik.md)                             | Payments          | Non-breaking     | api      |
| [Adds support for Affirm transaction IDs](https://docs.stripe.com/changelog/acacia/2024-09-30/affirm-transaction-id-dashboard.md)                                             | Payments          | Non-breaking     | api      |
| [Adds support for in-person payment methods, including Interac cards](https://docs.stripe.com/changelog/acacia/2024-09-30/card-interac-present-support.md)                    | Terminal          | Non-breaking     | api      |
| [Displays `authorization_code` for Charges](https://docs.stripe.com/changelog/acacia/2024-09-30/displays-authorization-code-for-charges.md)                                   | Payments          | Non-breaking     | api      |
| [Adds wallet details for `card_present` Charges and Payment Methods](https://docs.stripe.com/changelog/acacia/2024-09-30/adds-offline-details-card-present-paymentmethods.md) | Terminal          | Non-breaking     | api      |
| [Adds country field for Charges that use Klarna](https://docs.stripe.com/changelog/acacia/2024-09-30/charges-klarna-payer-details-country.md)                                 | Payments          | Non-breaking     | api      |
| [Displays Amazon Pay dispute type on Disputes](https://docs.stripe.com/changelog/acacia/2024-09-30/display-amazonpay-dispute-type.md)                                         | Payments          | Non-breaking     | api      |

### Streamline invoice processing

| Title                                                                                                                                            | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Adds support for bulk invoice line item operations](https://docs.stripe.com/changelog/acacia/2024-09-30/invoicing-bulk-line-item-operations.md) | Invoicing         | Non-breaking     | api      |
| [Adds webhook events for when an invoice is due or overdue](https://docs.stripe.com/changelog/acacia/2024-09-30/billing-due-date-webhooks.md)    | Billing           | Non-breaking     | api      |
| [Adds option to automatically finalize invoices](https://docs.stripe.com/changelog/acacia/2024-09-30/automatically-finalizes-at-invoice.md)      | Invoicing         | Non-breaking     | api      |

### Tax enhancements

| Title                                                                                                                                                                                        | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds support for posting time on tax transaction creation](https://docs.stripe.com/changelog/acacia/2024-09-30/tax-posting-time-on-creation.md)                                             | Tax               | Non-breaking     | api      |
| [Adds support for tax settings and registrations for Embedded Components](https://docs.stripe.com/changelog/acacia/2024-09-30/tax-registrations-settings-embedded-components.md)             | Connect, Tax      | Non-breaking     | api      |
| [Adds new method to retrieve a Tax Calculation](https://docs.stripe.com/changelog/acacia/2024-09-30/retrieves-tax-calculation-api.md)                                                        | Tax               | Non-breaking     | api      |
| [Adds support for specifying US state sales tax elections while creating tax registrations](https://docs.stripe.com/changelog/acacia/2024-09-30/support-us-state-sales-tax-elections-api.md) | Tax               | Non-breaking     | api      |

### Additional updates

| Title                                                                                                                                                                                      | Affected Products      | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ---------------- | -------- |
| [Adds risk verification details for connected accounts](https://docs.stripe.com/changelog/acacia/2024-09-30/additional-risk-verification-details-connected-accounts.md)                    | Connect                | Breaking         | api      |
| [Adds support for email types to Credit Notes](https://docs.stripe.com/changelog/acacia/2024-09-30/credit-note-email-type.md)                                                              | Invoicing              | Non-breaking     | api      |
| [Adds support for the Payment Element on a Customer Session](https://docs.stripe.com/changelog/acacia/2024-09-30/support-payment-element-customer-session.md)                              | Elements               | Non-breaking     | api      |
| [Adds support for identifying the case type for card disputes](https://docs.stripe.com/changelog/acacia/2024-09-30/disputes-case-type-card.md)                                             | Payments               | Non-breaking     | api      |
| [Adds a method to update the metadata for Checkout Sessions](https://docs.stripe.com/changelog/acacia/2024-09-30/checkout-update-method.md)                                                | Checkout               | Non-breaking     | api      |
| [Adds parameter to link Verification Sessions to Customers](https://docs.stripe.com/changelog/acacia/2024-09-30/identity-verification-session-related-customer.md)                         | Identity               | Non-breaking     | api      |
| [Displays CHIPS tracking details for outbound wire payments and transfers](https://docs.stripe.com/changelog/acacia/2024-09-30/displays-chips-tracking-details-treasury-outbound-wires.md) | Treasury               | Non-breaking     | api      |
| [Adds additional reasonable defaulting to the Account Link API v1](https://docs.stripe.com/changelog/acacia/2024-09-30/account-link-api-default-fields-v1.md)                              | Connect                | Non-breaking     | api      |
| [Makes `LineItem.description` optional](https://docs.stripe.com/changelog/acacia/2024-09-30/description-optional-checkout-session-line-item.md)                                            | Checkout               | Non-breaking     | api      |
| [Adds `target_frozen_time` for advancing `test_helpers.test_clock` objects](https://docs.stripe.com/changelog/acacia/2024-09-30/support-status-details-test-clock.md)                      | Billing                | Non-breaking     | api      |
| [Makes status details for Test Clock test helpers required](https://docs.stripe.com/changelog/acacia/2024-09-30/make-testclock-status-details-required.md)                                 | Billing                | Non-breaking     | api      |
| [Adds a new enum value representing a ReceivedDebit failure due to an international transaction](https://docs.stripe.com/changelog/acacia/2024-09-30/ef-features.md)                       | Treasury               | Non-breaking     | api      |
| [Makes it optional to update the products and prices of a subscription](https://docs.stripe.com/changelog/acacia/2024-09-30/billing-portal-updates-optional.md)                            | Billing                | Non-breaking     | api      |
| [Add support for `custom_unit_amount` during product creation](https://docs.stripe.com/changelog/acacia/2024-09-30/products-custom-unit-amount.md)                                         | Checkout, Paymentlinks | Non-breaking     | api      |
| [Adds support for retrieving thin events](https://docs.stripe.com/changelog/acacia/2024-09-30/api-v2-thin-events.md)                                                                       | Billing                | Non-breaking     | api      |

# 2024

## 2024-06-20

### Additional updates

| Title                                                                                                                                                                                        | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Renames a `fuel` attribute of the `Authorization` object](https://docs.stripe.com/changelog/2024-06-20/renames-fuel-attribute-authorization-object.md)                                      | Issuing           | Breaking         | api      |
| [Renames a `purchase_details` attribute of the `Transaction` object](https://docs.stripe.com/changelog/2024-06-20/renames-purchase-details-transaction-object.md)                            | Issuing           | Breaking         | api      |
| [Removes undocumented fuel fields](https://docs.stripe.com/changelog/2024-06-20/removes-undocumented-fuel-fields-issuing.md)                                                                 | Issuing           | Breaking         | api      |
| [Removes undocumented fleet fields](https://docs.stripe.com/changelog/2024-06-20/removes-undocumented-fleet-fields-issuing.md)                                                               | Issuing           | Breaking         | api      |
| [Adds enum values for fuel units](https://docs.stripe.com/changelog/2024-06-20/adds-enum-fuel-units-issuing.md)                                                                              | Issuing           | Breaking         | api      |
| [Deprecates `alphanumeric_id` for Issuing Authorization](https://docs.stripe.com/changelog/2024-06-20/deprecates-alphanumeric-id-issuing.md)                                                 | Issuing           | Breaking         | api      |
| [Adds enum values for disabled reasons](https://docs.stripe.com/changelog/2024-06-20/adds-enum-disabled-reasons-capabilities.md)                                                             | Connect           | Breaking         | api      |
| [Deprecates the `bank_transfer_payments` capability type in favor of newer capability types](https://docs.stripe.com/changelog/2024-06-20/deprecates-bank-transfer-payments-capabilities.md) | Connect           | Breaking         | api      |
| [Adds new enum values for request history reasons](https://docs.stripe.com/changelog/2024-06-20/adds-enum-request-history-reasons-issuing.md)                                                | Issuing           | Breaking         | api      |

## 2024-04-10

### Additional updates

| Title                                                                                                                                                                           | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Makes automatic async the default capture method for PaymentIntents when not specified](https://docs.stripe.com/changelog/2024-04-10/automatic-sync-default-paymentintents.md) | Payments           | Breaking         | api      |
| [Renames the `rendering_options` attribute for invoices to `rendering`](https://docs.stripe.com/changelog/2024-04-10/renames-rendering-options-invoicing.md)                    | Invoicing, Billing | Breaking         | api      |
| [Renames the `features` attribute of the `Product` object](https://docs.stripe.com/changelog/2024-04-10/renames-features-attribute-product-object.md)                           | Invoicing, Billing | Breaking         | api      |

# 2023

## 2023-10-16

### Additional updates

| Title                                                                                                                                                                  | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds new account requirement error codes to the Accounts API](https://docs.stripe.com/changelog/2023-10-16/adds-account-requirement-error-accounts.md)                | Connect           | Breaking         | api      |
| [Auto-populates the statement descriptor and prefix in the Accounts API](https://docs.stripe.com/changelog/2023-10-16/auto-populates-statement-descriptor-accounts.md) | Connect           | Breaking         | api      |

## 2023-08-16

### Additional updates

| Title                                                                                                                                                         | Affected Products          | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------- | -------- |
| [Enables automatic payment methods by default for PaymentIntents and SetupIntents](https://docs.stripe.com/changelog/2023-08-16/automatic-payment-methods.md) | Payments, Elements         | Breaking         | api      |
| [One-time payments in Checkout Sessions support no-cost orders](https://docs.stripe.com/changelog/2023-08-16/no-cost-orders-checkout-session.md)              | Checkout                   | Breaking         | api      |
| [Platform-scope rendering for select PaymentMethod fingerprints](https://docs.stripe.com/changelog/2023-08-16/platform-scope-rendering-payment-method.md)     | Connect, Payments, Billing | Breaking         | api      |
| [Adds specific error codes for failed Klarna payments](https://docs.stripe.com/changelog/2023-08-16/klarna-payment-failure-error-code.md)                     | Payments, Checkout         | Breaking         | api      |
| [Adds new director verification error codes to the Accounts API](https://docs.stripe.com/changelog/2023-08-16/adds-director-verfication-error-accounts.md)    | Connect                    | Breaking         | api      |

# 2022

## 2022-11-15

### Additional updates

| Title                                                                                                                                                                | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [The `Charges` object no longer auto-expands refunds by default](https://docs.stripe.com/changelog/2022-11-15/deprecates-charges-auto-expand.md)                     | Payments          | Breaking         | api      |
| [Removes the `charges` attribute from the `PaymentIntent` object](https://docs.stripe.com/changelog/2022-11-15/removes-charges-attribute-paymentintent.md)           | Payments          | Breaking         | api      |
| [Adds new decline codes to the PaymentIntent and PaymentMethod APIs](https://docs.stripe.com/changelog/2022-11-15/adds-decline-codes-paymentintent-paymentmethod.md) | Payments          | Breaking         | api      |
| [Adds new decline codes to the SetupIntent API](https://docs.stripe.com/changelog/2022-11-15/adds-decline-codes-setupintent.md)                                      | Payments          | Breaking         | api      |
| [Adds a new structure error code to the Accounts API](https://docs.stripe.com/changelog/2022-11-15/adds-structure-error-code-accounts.md)                            | Connect           | Breaking         | api      |

## 2022-08-01

### Additional updates

| Title                                                                                                                                                                                  | Affected Products  | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Removes the `include_and_require` value when creating invoices](https://docs.stripe.com/changelog/2022-08-01/removes-include-require-value-invoices.md)                               | Invoicing          | Breaking         | api      |
| [Default customer creation in Checkout Session payment mode changed to `if_required`](https://docs.stripe.com/changelog/2022-08-01/default-customer-creation-checkout-session.md)      | Checkout           | Breaking         | api      |
| [Deferred PaymentIntent creation in Checkout Session payment mode](https://docs.stripe.com/changelog/2022-08-01/deferred-paymentintent-checkout-session.md)                            | Checkout, Payments | Breaking         | api      |
| [Removes the `setup_intent` property from Checkout Sessions in subscription mode](https://docs.stripe.com/changelog/2022-08-01/removes-setupintent-checkout-session.md)                | Checkout           | Breaking         | api      |
| [Replaces line item parameters from the Create Checkout Session endpoint](https://docs.stripe.com/changelog/2022-08-01/replaces-line-item-create-checkout-session.md)                  | Checkout           | Breaking         | api      |
| [Removes the subscription data parameter from the Create Checkout Session endpoint](https://docs.stripe.com/changelog/2022-08-01/removes-subscription-data-create-checkout-session.md) | Checkout, Billing  | Breaking         | api      |
| [Removes the shipping rate parameter from Create Checkout Session endpoint](https://docs.stripe.com/changelog/2022-08-01/removes-shipping-rate-create-checkout-session.md)             | Checkout           | Breaking         | api      |
| [Updates Checkout Session shipping properties](https://docs.stripe.com/changelog/2022-08-01/updates-shipping-property-checkout-session.md)                                             | Checkout           | Breaking         | api      |
| [Adds 3D Secure exemption status to card charges](https://docs.stripe.com/changelog/2022-08-01/adds-3d-secure-exemption-charges.md)                                                    | Payments           | Breaking         | api      |
| [New error code for invalid terms of service acceptance in Accounts API](https://docs.stripe.com/changelog/2022-08-01/error-code-invalid-tos-accounts.md)                              | Connect            | Breaking         | api      |
| [New endpoints for managing a physical card’s shipping status in test mode](https://docs.stripe.com/changelog/2022-08-01/endpoints-shipping-status-cards.md)                           | Issuing            | Breaking         | api      |
| [Adds `design_rejected` as a possible cancellation reason for issued cards](https://docs.stripe.com/changelog/2022-08-01/adds-design-rejected-value-cards.md)                          | Issuing            | Breaking         | api      |
| [Removes the `default_currency` attribute from the `Customer` object](https://docs.stripe.com/changelog/2022-08-01/removes-default-currency-customer-object.md)                        | All products       | Breaking         | api      |

# 2020

## 2020-08-27

### Additional updates

| Title                                                                                                                                                                  | Affected Products            | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------- | -------- |
| [Removes the `tax_percent` attribute](https://docs.stripe.com/changelog/2020-08-27/removes-tax-percent-attribute.md)                                                   | Checkout, Billing, Invoicing | Breaking         | api      |
| [Renames `phases` attributes in subscription schedules](https://docs.stripe.com/changelog/2020-08-27/renames-phases-attributes-subscription-schedules.md)              | Billing                      | Breaking         | api      |
| [Renames event type that triggers on automatic updates](https://docs.stripe.com/changelog/2020-08-27/renames-automatically-updated-event-type.md)                      | Payments                     | Breaking         | api      |
| [Removes the `display_items` property from Checkout Sessions](https://docs.stripe.com/changelog/2020-08-27/removes-display-items-checkout-session.md)                  | Checkout                     | Breaking         | api      |
| [Formats requirements for key persons associated with accounts](https://docs.stripe.com/changelog/2020-08-27/formats-requirements-key-persons-accounts.md)             | Connect                      | Breaking         | api      |
| [Adds new error codes to the Accounts, Persons, and Capabilities APIs](https://docs.stripe.com/changelog/2020-08-27/adds-error-codes-accounts-persons-capabilities.md) | Connect                      | Breaking         | api      |
| [Updates to 3D Secure details in `Charge` object](https://docs.stripe.com/changelog/2020-08-27/updates-3d-scure-charge-object.md)                                      | Payments                     | Breaking         | api      |
| [Customer subscriptions are no longer auto-expanded by default](https://docs.stripe.com/changelog/2020-08-27/deprecates-auto-expansion-customer-subscriptions.md)      | Billing                      | Breaking         | api      |
| [Plan tiers are no longer auto-expanded by default](https://docs.stripe.com/changelog/2020-08-27/deprecates-auto-expansion-plan-tiers.md)                              | Billing                      | Breaking         | api      |
| [Customer sources are no longer auto-expanded by default](https://docs.stripe.com/changelog/2020-08-27/deprecates-auto-expansion-customer-sources.md)                  | Payments, Billing, Invoicing | Breaking         | api      |
| [Tax IDs are no longer auto-expanded on the `Customer` object](https://docs.stripe.com/changelog/2020-08-27/deprecates-auto-expansion-tax-id-customer.md)              | All products                 | Breaking         | api      |
| [Deprecates subscription `prorate` and `subscription_prorate` parameters](https://docs.stripe.com/changelog/2020-08-27/deprecates-prorate-parameters-subscriptions.md) | Billing                      | Breaking         | api      |

## 2020-03-02

### Additional updates

| Title                                                                                                                                         | Affected Products  | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Invoices can now be numbered sequentially across your account](https://docs.stripe.com/changelog/2020-03-02/sequentially-number-invoices.md) | Billing, Invoicing | Breaking         | api      |

# 2019

## 2019-12-03

### Additional updates

| Title                                                                                                                                                                    | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------- | -------- |
| [Standardizes invoice line item IDs](https://docs.stripe.com/changelog/2019-12-03/standardizes-invoice-line-item-ids.md)                                                 | Billing, Invoicing | Breaking         | api      |
| [New requirement for `out_of_band_amount` when creating post-payment credit notes](https://docs.stripe.com/changelog/2019-12-03/post-payment-credit-note-requirement.md) | Billing, Invoicing | Breaking         | api      |
| [Customer balances are now returned when voiding invoices](https://docs.stripe.com/changelog/2019-12-03/customer-balances-returned-voided-invoices.md)                   | Billing, Invoicing | Breaking         | api      |
| [Removes deprecated tax information fields from the `Customer` object](https://docs.stripe.com/changelog/2019-12-03/removes-deprecated-tax-information-fields.md)        | All products       | Breaking         | api      |

## 2019-11-05

### Additional updates

| Title                                                                                                                                                                              | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Adds requirement for `requested_capabilities` on custom account creation](https://docs.stripe.com/changelog/2019-11-05/adds-requested-capabilities-requirement-custom-account.md) | Connect           | Breaking         | api      |
| [Nested subscription schedule settings under `default_settings`](https://docs.stripe.com/changelog/2019-11-05/nests-subscription-schedule-settings.md)                             | Billing           | Breaking         | api      |

## 2019-10-17

### Additional updates

| Title                                                                                                                                                                        | Affected Products  | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Renames and updates subscription schedule renewal properties](https://docs.stripe.com/changelog/2019-10-17/updates-subscription-renewal-properties.md)                      | Billing            | Breaking         | api      |
| [Replaces the subscription `start` field with `start_date`](https://docs.stripe.com/changelog/2019-10-17/replaces-subscription-start-field.md)                               | Billing            | Breaking         | api      |
| [Renames `billing` to `collection_method` on invoices, subscriptions, and subscription schedules](https://docs.stripe.com/changelog/2019-10-17/renames-billing-attribute.md) | Billing, Invoicing | Breaking         | api      |
| [The `due_date` property is always null on auto-billed invoices](https://docs.stripe.com/changelog/2019-10-17/invoice-due-date-null.md)                                      | Billing, Invoicing | Breaking         | api      |
| [Renames `account_balance` to `balance` on `Customer` object](https://docs.stripe.com/changelog/2019-10-17/renames-account-balance-customer-object.md)                       | Billing, Invoicing | Breaking         | api      |

## 2019-10-08

### Additional updates

| Title                                                                                                                                            | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Renames a `Person` object relationship attribute](https://docs.stripe.com/changelog/2019-10-08/renames-person-object-relationship-attribute.md) | Connect           | Breaking         | api      |

## 2019-09-09

### Additional updates

| Title                                                                                                                                                           | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Accounts in many countries now require specifying capabilities at creation time](https://docs.stripe.com/changelog/2019-09-09/2019-09-09-1.md)                 | Connect           | Breaking         | api      |
| [Adds new `details_code` values to person document verification](https://docs.stripe.com/changelog/2019-09-09/adds-detail-code-person-document-verification.md) | Connect           | Breaking         | api      |

## 2019-08-14

### Additional updates

| Title                                                                                                                                                                                                                                                            | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Renames the `platform_payments` capability for accounts to `card_payments`, requiring the manual specification of the added `transfers` capability](https://docs.stripe.com/changelog/2019-08-14/configuring-person-account-opener-no-longer-sets-executive.md) | Connect           | Breaking         | api      |
| [Configuring a person as an account opener no longer automatically sets them as an executive](https://docs.stripe.com/changelog/2019-08-14/accounts-many-countries-require-specifying-capabilities.md)                                                           | Connect           | Breaking         | api      |

## 2019-05-16

### Additional updates

| Title                                                                                                                                                                        | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Bank pull payments no longer expose internal system refunds on failure](https://docs.stripe.com/changelog/2019-05-16/renames-platform-payments-capability-card-payments.md) | Payments          | Breaking         | api      |

## 2019-03-14

### Additional updates

| Title                                                                                                                                                                                     | Affected Products  | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Renames `application_fee` on invoices to `application_fee_amount`](https://docs.stripe.com/changelog/2019-03-14/renames-application-fee-invoices-application-fee-amount.md)              | Connect, Invoicing | Breaking         | api      |
| [Subscriptions are now successfully created even if the first payment fails](https://docs.stripe.com/changelog/2019-03-14/subscriptions-successfully-created-first-payment-fails.md)      | Billing            | Breaking         | api      |
| [Invoices now provide timestamps for each state transition](https://docs.stripe.com/changelog/2019-03-14/invoices-provide-timestamps-state-transitions.md)                                | Billing, Invoicing | Breaking         | api      |
| [Renames the `date` field for invoices to `created`](https://docs.stripe.com/changelog/2019-03-14/renames-date-field-invoices-created.md)                                                 | Billing, Invoicing | Breaking         | api      |
| [Invoices now specify when they’re finalized alongside other status transitions](https://docs.stripe.com/changelog/2019-03-14/invoices-specify-finalized-alongside-status-transitions.md) | Billing, Invoicing | Breaking         | api      |

## 2019-02-19

### Additional updates

| Title                                                                                                                                                                                                                              | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Changes statement descriptor behaviors for card payments created with Charges](https://docs.stripe.com/changelog/2019-02-19/changes-statement-descriptor-behaviors-charges.md)                                                    | Payments          | Breaking         | api      |
| [Several account fields have been refactored to better describe legal entity, verification status and requirements, and configurable settings](https://docs.stripe.com/changelog/2019-02-19/several-fields-accounts-refactored.md) | Connect           | Breaking         | api      |
| [Several fields describing an account’s business details have moved to the `business_profile` subhash](https://docs.stripe.com/changelog/2019-02-19/business-details-moved-business-profile-object.md)                             | Connect           | Breaking         | api      |
| [Verification of accounts or persons now supports uploading both front and back sides](https://docs.stripe.com/changelog/2019-02-19/verification-accounts-persons-supports-front-back.md)                                          | Connect           | Breaking         | api      |
| [Accounts no longer provide a `keys` field. Platforms should use their own API key to authenticate as their connected accounts](https://docs.stripe.com/changelog/2019-02-19/accounts-no-longer-provide-keys-field.md)             | Connect           | Breaking         | api      |
| [Accounts in the US now require specifying capabilities at creation time](https://docs.stripe.com/changelog/2019-02-19/accounts-us-require-specifying-capabilities-creation.md)                                                    | Connect           | Breaking         | api      |
| [Renames the `business_id_number` for an account’s legal entity to `business_registration_number`](https://docs.stripe.com/changelog/2019-02-19/renames-business-id-number-business-registration-number.md)                        | Connect           | Breaking         | api      |

## 2019-02-11

### Additional updates

| Title                                                                                                                                                                                   | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Renames several statuses for PaymentIntents](https://docs.stripe.com/changelog/2019-02-11/renames-several-statuses-payment-intents.md)                                                 | Payments          | Breaking         | api      |
| [Renames the `save_source_to_customer` field for sources to `save_payment_method`](https://docs.stripe.com/changelog/2019-02-11/renames-save-source-to-customer-save-payment-method.md) | Payments          | Breaking         | api      |
| [Renames the `allowed_source_types` field for `sources` to `payment_method_types`](https://docs.stripe.com/changelog/2019-02-11/renames-allowed-source-types-payment-method-types.md)   | Payments          | Breaking         | api      |
| [Renames the `next_source_action` field for Payment Intents to `next_action`](https://docs.stripe.com/changelog/2019-02-11/renames-next-source-action-next-action.md)                   | Payments          | Breaking         | api      |
| [Renames the `authorize_with_url` field for Payment Intents to `redirect_to_url`](https://docs.stripe.com/changelog/2019-02-11/renames-authorize-with-url-redirect-to-url.md)           | Payments          | Breaking         | api      |

# 2018

## 2018-11-08

### Additional updates

| Title                                                                                                                                                                          | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------- | -------- |
| [Invoices now specify their automatic collection behavior using the `auto_advance` field](https://docs.stripe.com/changelog/2018-11-08/invoices-specify-auto-advance-field.md) | Invoicing, Billing | Breaking         | api      |
| [One-off Invoices no longer automatically collect payment by default](https://docs.stripe.com/changelog/2018-11-08/one-off-invoices-no-longer-auto-collect-payment.md)         | Invoicing          | Breaking         | api      |
| [Replaces the `forgiven` field with a new `uncollectible` status for invoices](https://docs.stripe.com/changelog/2018-11-08/mark-invoice-uncollectible-instead-forgiven.md)    | Invoicing, Billing | Breaking         | api      |
| [Renames an invoice error code to `invoice_already_finalized`](https://docs.stripe.com/changelog/2018-11-08/renames-invoice-error-code-invoice-already-finalized.md)           | Invoicing, Billing | Breaking         | api      |
| [Includes several changes for users of the Payment Intents API private beta](https://docs.stripe.com/changelog/2018-11-08/several-changes-payment-intents-private-beta.md)     | Payments           | Breaking         | api      |

## 2018-10-31

### Additional updates

| Title                                                                                                                                                                                                     | Affected Products  | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Descriptions for customers now have a character limit](https://docs.stripe.com/changelog/2018-10-31/descriptions-customers-character-limit.md)                                                           | All products       | Breaking         | api      |
| [Product names now have a character limit](https://docs.stripe.com/changelog/2018-10-31/names-products-character-limit.md)                                                                                | Billing, Invoicing | Breaking         | api      |
| [Descriptions for invoice line items now have a character limit](https://docs.stripe.com/changelog/2018-10-31/descriptions-invoice-line-items-character-limit.md)                                         | Billing, Invoicing | Breaking         | api      |
| [The `billing_reason` of the first invoice of a subscription is now `subscription_create`](https://docs.stripe.com/changelog/2018-10-31/first-invoice-subscription-billing-reason-subscription-create.md) | Billing, Invoicing | Breaking         | api      |

## 2018-09-24

### Additional updates

| Title                                                                                                                                                                                         | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Renames the `FileUpload` object to `Files`, which now require secret keys to download files](https://docs.stripe.com/changelog/2018-09-24/file-uploads-renamed-files-require-secret-keys.md) | All products      | Breaking         | api      |

## 2018-09-06

### Additional updates

| Title                                                                                                                      | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [SKU values no longer need to be unique](https://docs.stripe.com/changelog/2018-09-06/sku-values-no-longer-need-unique.md) | Checkout          | Breaking         | api      |

## 2018-08-23

### Additional updates

| Title                                                                                                                                                                                   | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [A subscription’s ending period can no longer be configured while canceling it](https://docs.stripe.com/changelog/2018-08-23/subscription-ending-period-cannot-configured-canceling.md) | Billing           | Breaking         | api      |
| [Customers now provide a `tax_info` object with their tax ID details](https://docs.stripe.com/changelog/2018-08-23/customers-provide-tax-info-object.md)                                | All products      | Breaking         | api      |
| [Renames the `amount` field for plan tiers to `unit_amount`](https://docs.stripe.com/changelog/2018-08-23/renames-amount-field-plan-tiers-unit-amount.md)                               | Billing           | Breaking         | api      |

## 2018-07-27

### Additional updates

| Title                                                                                                                                                                         | Affected Products  | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Subscriptions no longer support modifying the `source` parameter directly](https://docs.stripe.com/changelog/2018-07-27/subscriptions-no-longer-support-modifying-source.md) | Billing            | Breaking         | api      |
| [Ending a subscription trial now uses the timestamp of that API request](https://docs.stripe.com/changelog/2018-07-27/ending-subscription-trial-uses-request-timestamp.md)    | Billing            | Breaking         | api      |
| [Coupons now use floats rather than integers to specify `percent_off`](https://docs.stripe.com/changelog/2018-07-27/coupons-use-floats-specify-percent-off.md)                | Billing, Invoicing | Breaking         | api      |
| [Stripe now validates email addresses when creating or updating customers](https://docs.stripe.com/changelog/2018-07-27/stripe-validates-email-addresses-customers.md)        | All products       | Breaking         | api      |

## 2018-05-21

### Additional updates

| Title                                                                                                                                                                                              | Affected Products  | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Products no longer embed lists of SKUs](https://docs.stripe.com/changelog/2018-05-21/products-no-longer-embed-sku-lists.md)                                                                       | Checkout           | Breaking         | api      |
| [Invoice line items now have unique IDs and can’t be used in place of a subscription](https://docs.stripe.com/changelog/2018-05-21/invoice-line-items-have-unique-ids-cannot-use-subscription.md)  | Billing, Invoicing | Breaking         | api      |
| [Coupons, SKUs, customers, products, and plans now limit the valid characters for IDs](https://docs.stripe.com/changelog/2018-05-21/valid-characters-ids-coupons-skus-customers-products-plans.md) | Billing, Invoicing | Breaking         | api      |
| [Subscriptions now default to not defining their trial periods depending on a plan](https://docs.stripe.com/changelog/2018-05-21/subscriptions-default-no-trial-period-plan.md)                    | Billing            | Breaking         | api      |
| [Changing a subscription to a new plan with a trial now extends the trial period](https://docs.stripe.com/changelog/2018-05-21/changing-subscription-new-plan-extends-trial.md)                    | Billing            | Breaking         | api      |

## 2018-02-28

### Additional updates

| Title                                                                                                                                                                                   | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Updating a canceled subscription on a future date no longer resets its status](https://docs.stripe.com/changelog/2018-02-28/updating-canceled-subscription-no-longer-resets-status.md) | Billing           | Breaking         | api      |

## 2018-02-06

### Additional updates

| Title                                                                                                                                                                          | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Sources now provide a `recommended` value when the issuer advises using 3D Secure](https://docs.stripe.com/changelog/2018-02-06/sources-provide-recommended-use-3d-secure.md) | Payments          | Breaking         | api      |

## 2018-02-05

### Additional updates

| Title                                                                                                                                                                                                           | Affected Products  | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Free plans with prorations now produce zero-dollar invoices](https://docs.stripe.com/changelog/2018-02-05/free-plans-with-prorations-produce-zero-dollar-invoices.md)                                          | Billing            | Breaking         | api      |
| [Subscriptions can now delay the first full invoice to a future date (and optionally include a free trial)](https://docs.stripe.com/changelog/2018-02-05/subscriptions-delay-first-full-invoice-future-date.md) | Billing            | Breaking         | api      |
| [Plans now link to individual products, with several fields moving to the product resource](https://docs.stripe.com/changelog/2018-02-05/plans-link-individual-products-several-fields-moved.md)                | Billing            | Breaking         | api      |
| [Products now require a `type` field, differentiating their use with order SKUs or subscriptions and plans](https://docs.stripe.com/changelog/2018-02-05/products-require-type-field-differentiating-use.md)    | Billing, Invoicing | Breaking         | api      |

## 2018-01-23

### Additional updates

| Title                                                                                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Connect platforms can identify reused card or bank accounts across connected accounts as they now will share the same fingerprint](https://docs.stripe.com/changelog/2018-01-23/connect-platforms-identify-reused-cards-bank-accounts.md) | Connect           | Breaking         | api      |

# 2017

## 2017-12-14

### Additional updates

| Title                                                                                                                                                                      | Affected Products  | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Invoice line items now must always set a `description`](https://docs.stripe.com/changelog/2017-12-14/invoice-line-items-must-set-description.md)                          | Invoicing, Billing | Breaking         | api      |
| [Invoice payment failures now return a `card_error` when a charge is declined](https://docs.stripe.com/changelog/2017-12-14/invoice-payment-failures-return-card-error.md) | Invoicing, Billing | Breaking         | api      |

## 2017-08-15

### Additional updates

| Title                                                                                                                                                                         | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Sources can now specify that an authentication redirect isn’t required](https://docs.stripe.com/changelog/2017-08-15/sources-specify-no-authentication-redirect-required.md) | Payments          | Breaking         | api      |

## 2017-06-05

### Additional updates

| Title                                                                                                                                                                            | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Accounts can now specify why an account isn’t enabled with the new reason `under_review`](https://docs.stripe.com/changelog/2017-06-05/accounts-specify-under-review-reason.md) | Connect           | Breaking         | api      |

## 2017-05-25

### Additional updates

| Title                                                                                                                                                                                          | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Events for Connect now specify the originating connected account using the `account` field](https://docs.stripe.com/changelog/2017-05-25/events-connect-specify-originating-account.md)       | Connect           | Breaking         | api      |
| [The `request` field of the `Events` object now specifies both the request ID and idempotency key](https://docs.stripe.com/changelog/2017-05-25/events-specify-request-id-idempotency-key.md)  | All products      | Breaking         | api      |
| [Events with the `previous_attributes` field now render the complete affected sub-array](https://docs.stripe.com/changelog/2017-05-25/events-previous-attributes-render-complete-sub-array.md) | All products      | Breaking         | api      |
| [Accounts must now specify one of three types (Standard, Express, or Custom)](https://docs.stripe.com/changelog/2017-05-25/accounts-specify-type-standard-express-custom.md)                   | Connect           | Breaking         | api      |

## 2017-04-06

### Additional updates

| Title                                                                                                                                   | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Transfers are now split into payouts and transfers](https://docs.stripe.com/changelog/2017-04-06/transfers-split-payouts-transfers.md) | Connect           | Breaking         | api      |

## 2017-02-14

### Additional updates

| Title                                                                                                                                                                                             | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Charges now specify the ID for the rule blocking a transaction, which can be expanded](https://docs.stripe.com/changelog/2017-02-14/charges-specify-rule-blocking-transaction.md)                | Payments, Radar   | Breaking         | api      |
| [Charges now specify the ID for the dispute associated with a transaction, which can be expanded](https://docs.stripe.com/changelog/2017-02-14/charges-specify-dispute-associated-transaction.md) | Payments          | Breaking         | api      |

## 2017-01-27

### Additional updates

| Title                                                                                                                                                                            | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Balance transactions no longer include the `sourced_transfers` field](https://docs.stripe.com/changelog/2017-01-27/balance-transactions-no-longer-include-sourced-transfers.md) | Payments, Connect | Breaking         | api      |

# 2016

## 2016-10-19

### Additional updates

| Title                                                                                                                                                                        | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Using insufficient permissions to make API requests now throws an HTTP 403 error](https://docs.stripe.com/changelog/2016-10-19/insufficient-permissions-throw-403-error.md) | All products      | Breaking         | api      |

## 2016-07-06

### Additional updates

| Title                                                                                                                                                           | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Filter lists of subscriptions for canceled subscriptions](https://docs.stripe.com/changelog/2016-07-06/filter-canceled-subscriptions-retrieve-individually.md) | Billing           | Breaking         | api      |

## 2016-06-15

### Additional updates

| Title                                                                                                                                                        | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Deactivating a product no longer automatically deactivates its SKUs](https://docs.stripe.com/changelog/2016-06-15/deactivating-product-deactivates-skus.md) | Billing           | Breaking         | api      |

## 2016-03-07

### Additional updates

| Title                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Supported currencies are defined on the country spec for an account’s country](https://docs.stripe.com/changelog/2016-03-07/supported-currencies-defined-country-spec.md) | Payments          | Breaking         | api      |

## 2016-02-29

### Additional updates

| Title                                                                                                                                                                                 | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Creating or updating an account now validates the postal code for its legal entity](https://docs.stripe.com/changelog/2016-02-29/creating-updating-account-validates-postal-code.md) | Connect           | Breaking         | api      |

## 2016-02-23

### Additional updates

| Title                                                                                                                                                                                                                   | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Orders that are paid or fulfilled, and then become canceled or returned, now automatically refund associated charges](https://docs.stripe.com/changelog/2016-02-23/orders-paid-fulfilled-refund-associated-charges.md) | Payments          | Breaking         | api      |

## 2016-02-22

### Additional updates

| Title                                                                                                                                             | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [You can no longer add more than 250 invoice items to an invoice](https://docs.stripe.com/changelog/2016-02-22/no-more-than-250-invoice-items.md) | Billing, Invoicing | Breaking         | api      |

## 2016-02-19

### Additional updates

| Title                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Renames the `name` field on Bank Accounts to `account_holder_name`](https://docs.stripe.com/changelog/2016-02-19/renames-name-field-bank-accounts-account-holder-name.md) | Payments          | Breaking         | api      |

## 2016-02-03

### Additional updates

| Title                                                                                                                                                                            | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Accounts now only show country-specific subfields for the `legal_entity` field](https://docs.stripe.com/changelog/2016-02-03/accounts-only-show-country-fields-legal-entity.md) | Connect           | Breaking         | api      |

# 2015

## 2015-10-16

### Additional updates

| Title                                                                                                                                                                                 | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Creating or updating customers must now include a plan if a tax percentage is specified](https://docs.stripe.com/changelog/2015-10-16/customers-must-include-plan-tax-percentage.md) | Billing           | Breaking         | api      |

## 2015-10-12

### Additional updates

| Title                                                                                                                                                                                                                       | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Using invalid parameters to create cards or bank accounts for tokens, sources, or external bank accounts now throws an HTTP 400 error](https://docs.stripe.com/changelog/2015-10-12/invalid-parameters-throw-400-error.md) | Payments          | Breaking         | api      |

## 2015-10-01

### Additional updates

| Title                                                                                                                                                              | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Bank account information renamed to external accounts on user profiles](https://docs.stripe.com/changelog/2015-10-01/accounts-include-external-accounts-field.md) | Connect           | Breaking         | api      |
| [Accounts now include an `external_accounts` field](https://docs.stripe.com/changelog/2015-10-01/accounts-specify-additional-fields-bank-accounts.md)              | Connect           | Breaking         | api      |

## 2015-09-23

### Additional updates

| Title                                                                                                                                                                          | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------- | -------- |
| [The `charge` field now always reflects the latest charge on invoices](https://docs.stripe.com/changelog/2015-09-23/invoice-charge-field-reflect-latest-charge.md)             | Invoicing, Billing | Breaking         | api      |
| [Invoices no longer include the `payment` property](https://docs.stripe.com/changelog/2015-09-23/invoices-no-longer-include-payment-field.md)                                  | Invoicing, Billing | Breaking         | api      |
| [Listing all charges now includes payments from all funding sources](https://docs.stripe.com/changelog/2015-09-23/listing-charges-includes-payments-funding-sources.md)        | Payments           | Breaking         | api      |
| [Charges only support an `offset` for list pagination when filtering by source](https://docs.stripe.com/changelog/2015-09-23/charges-support-offset-list-pagination-source.md) | Payments           | Breaking         | api      |

## 2015-09-08

### Additional updates

| Title                                                                                                                                                                                            | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Rate-limited requests now return an HTTP 429 error, no longer including the `rate_limit` field](https://docs.stripe.com/changelog/2015-09-08/rate-limited-requests-return-429-no-rate-limit.md) | All products      | Breaking         | api      |

## 2015-09-03

### Additional updates

| Title                                                                                                                                                                          | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Requests that reuse idempotency tokens but alter request parameters now throw an error](https://docs.stripe.com/changelog/2015-09-03/reuse-idempotency-tokens-alter-error.md) | All products      | Breaking         | api      |

## 2015-08-19

### Additional updates

| Title                                                                                                                                                                                                        | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Balance transactions with refunds or disputes now specify the corresponding ID in the `source` field](https://docs.stripe.com/changelog/2015-08-19/balance-transactions-refunds-disputes-specify-source.md) | Payments          | Breaking         | api      |

## 2015-08-07

### Additional updates

| Title                                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Stripe now ensures the `tos_acceptance[date]` field on accounts is a valid timestamp](https://docs.stripe.com/changelog/2015-08-07/stripe-ensures-tos-acceptance-date-valid-timestamp.md) | Connect           | Breaking         | api      |

## 2015-07-28

### Additional updates

| Title                                                                                                                                                                                           | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Transfers that are immediately processed now trigger the `balance.available` event](https://docs.stripe.com/changelog/2015-07-28/transfers-immediately-processed-trigger-balance-available.md) | Connect           | Breaking         | api      |

## 2015-07-13

### Additional updates

| Title                                                                                                                                                                                                                      | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Accounts now include the `verification[disabled_reason]` field to describe why they can’t make transfers or charges](https://docs.stripe.com/changelog/2015-07-13/accounts-include-verification-disabled-reason-field.md) | Connect           | Breaking         | api      |

## 2015-07-07

### Additional updates

| Title                                                                                                                                                                          | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Transfers submitted to the bank that haven’t arrived now provide an `in_transit` status](https://docs.stripe.com/changelog/2015-07-07/transfers-in-transit-provide-status.md) | Connect           | Breaking         | api      |

## 2015-06-15

### Additional updates

| Title                                                                                                                                                     | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Accounts on manual payout schedules now throw a new error](https://docs.stripe.com/changelog/2015-06-15/accounts-manual-payout-schedules-throw-error.md) | Connect           | Breaking         | api      |

## 2015-04-07

### Additional updates

| Title                                                                                                                                                                          | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------- | -------- |
| [Updates how ending periods are calculated on prorated invoice line items](https://docs.stripe.com/changelog/2015-04-07/updates-ending-periods-prorated-invoice-line-items.md) | Billing            | Breaking         | api      |
| [Changes the sorting order of `lines` for invoices](https://docs.stripe.com/changelog/2015-04-07/changes-sorting-order-lines-invoices.md)                                      | Billing, Invoicing | Breaking         | api      |

## 2015-03-24

### Additional updates

| Title                                                                                                                                                                        | Affected Products  | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [By default, coupons no longer apply to invoice items with negative amounts](https://docs.stripe.com/changelog/2015-03-24/coupons-no-longer-apply-negative-invoice-items.md) | Billing, Invoicing | Breaking         | api      |

## 2015-02-18

### Additional updates

| Title                                                                                                                                                                                                 | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Charges that succeed now have a `succeeded` status](https://docs.stripe.com/changelog/2015-02-18/charges-succeed-have-succeeded-status.md)                                                           | Payments          | Breaking         | api      |
| [Charges now have a `source` field that accepts a source or card](https://docs.stripe.com/changelog/2015-02-18/charges-have-source-field-accepts-source-card.md)                                      | Payments          | Breaking         | api      |
| [Customers now have a `source` field that accepts a source or card, and updates related event types](https://docs.stripe.com/changelog/2015-02-18/customers-have-source-field-accepts-source-card.md) | Payments          | Breaking         | api      |

## 2015-02-16

### Additional updates

| Title                                                                                                                                                                  | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Renames the `transfer.canceled` event type to `transfer.reversed`](https://docs.stripe.com/changelog/2015-02-16/renames-transfer-canceled-event-transfer-reversed.md) | Connect           | Breaking         | api      |

## 2015-02-10

### Additional updates

| Title                                                                                                                                                                                          | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Dispute statuses now include the `warning_closed` value](https://docs.stripe.com/changelog/2015-02-10/dispute-statuses-include-warning-closed.md)                                             | Payments          | Breaking         | api      |
| [Transfers now require a sufficient account balance in test mode to better simulate live mode](https://docs.stripe.com/changelog/2015-02-10/transfers-require-sufficient-balance-test-mode.md) | Connect           | Breaking         | api      |

## 2015-01-26

### Additional updates

| Title                                                                                                                                                                                                    | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Events with the `previous_attributes` field now only render the differences to objects across updates](https://docs.stripe.com/changelog/2015-01-26/events-previous-attributes-render-differences.md)   | All products      | Breaking         | api      |
| [Subscriptions now only report the timestamp for API or invoice payment failures for the `canceled_at` field](https://docs.stripe.com/changelog/2015-01-26/subscriptions-report-api-invoice-failures.md) | Billing           | Breaking         | api      |

## 2015-01-11

### Additional updates

| Title                                                                                                                                                               | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [File uploads describe their file type with the simpler `type` field and format](https://docs.stripe.com/changelog/2015-01-11/file-uploads-describe-type-format.md) | All products      | Breaking         | api      |

# 2014

## 2014-12-22

### Additional updates

| Title                                                                                                                                                                                                                 | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Cards now use both the `unchecked` and `unavailable` values to describe address and CVC checks by issuing banks](https://docs.stripe.com/changelog/2014-12-22/cards-use-unchecked-unavailable-address-cvc-checks.md) | Payments          | Breaking         | api      |
| [Tokens with cards no longer include the `customer` field](https://docs.stripe.com/changelog/2014-12-22/tokens-cards-no-longer-include-customer-field.md)                                                             | Payments          | Breaking         | api      |

## 2014-12-17

### Additional updates

| Title                                                                                                                                                                                                                               | Affected Products                     | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------- | -------- |
| [Introduces the `statement_description` field and logic for how charges, invoices, plans, and transfers render statement descriptors](https://docs.stripe.com/changelog/2014-12-17/introduces-statement-description-field-logic.md) | Payments, Billing, Invoicing, Connect | Breaking         | api      |
| [Creating accounts using the API requires the 2014-12-17 version or newer](https://docs.stripe.com/changelog/2014-12-17/creating-accounts-requires-2014-12-17-version.md)                                                           | Connect                               | Breaking         | api      |

## 2014-12-08

### Additional updates

| Title                                                                                                                                                                    | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Disputes now include an `evidence_details` object for evidence documentation](https://docs.stripe.com/changelog/2014-12-08/disputes-include-evidence-details-object.md) | Payments          | Breaking         | api      |

## 2014-11-20

### Additional updates

| Title                                                                                                                                                                                     | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Disputes are now reported as `won` even if the charge is refunded](https://docs.stripe.com/changelog/2014-11-20/disputes-reported-won-refunded-charge.md)                                | Payments          | Breaking         | api      |
| [Invoice items now reflect the metadata for their associated subscription, rather than plan](https://docs.stripe.com/changelog/2014-11-20/invoice-items-reflect-subscription-metadata.md) | Billing           | Breaking         | api      |

## 2014-11-05

### Additional updates

| Title                                                                                                                                                       | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Account activation status terms updated for payments and transfers](https://docs.stripe.com/changelog/2014-11-05/renames-charge-account-enabled-fields.md) | Connect           | Breaking         | api      |

## 2014-10-07

### Additional updates

| Title                                                                                                                                                                                    | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [You can no longer retrieve tokens with publishable keys](https://docs.stripe.com/changelog/2014-10-07/no-longer-retrieve-tokens-publishable-keys.md)                                    | Elements          | Breaking         | api      |
| [Creating a Card or Bank Account with a publishable key omits fingerprints in API responses](https://docs.stripe.com/changelog/2014-10-07/create-card-bank-account-omit-fingerprints.md) | Elements          | Breaking         | api      |

## 2014-09-08

### Additional updates

| Title                                                                                                                                                       | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Bank Accounts now include a `status` enum that replace multiple fields](https://docs.stripe.com/changelog/2014-09-08/bank-accounts-include-status-enum.md) | Payments          | Breaking         | api      |

## 2014-08-20

### Additional updates

| Title                                                                                                                                                | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Disputes now provide several new statuses](https://docs.stripe.com/changelog/2014-08-20/disputes-provide-several-new-statuses.md)                   | Payments          | Breaking         | api      |
| [Disputes now include multiple balance transactions](https://docs.stripe.com/changelog/2014-08-20/disputes-include-multiple-balance-transactions.md) | Payments          | Breaking         | api      |

## 2014-08-04

### Additional updates

| Title                                                                                                                                                                         | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [You can now retrieve balance histories rather than relying on `Transfer` fields](https://docs.stripe.com/changelog/2014-08-04/retrieve-balance-histories-transfer-fields.md) | Connect           | Breaking         | api      |

## 2014-07-26

### Additional updates

| Title                                                                                                                                                                                   | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Application fees now include a sublist of refunds through the `refunds` field](https://docs.stripe.com/changelog/2014-07-26/application-fees-include-refunds-sublist-refunds-field.md) | Connect           | Breaking         | api      |

## 2014-07-22

### Additional updates

| Title                                                                                                                                                                        | Affected Products  | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Invoice line items now include subscription plans and quantities](https://docs.stripe.com/changelog/2014-07-22/invoice-line-items-include-subscription-plans-quantities.md) | Invoicing, Billing | Breaking         | api      |

## 2014-06-17

### Additional updates

| Title                                                                                                                                                                   | Affected Products  | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Invoices now include a sublist of refunds through the `refunds` field](https://docs.stripe.com/changelog/2014-06-17/invoices-include-refunds-sublist-refunds-field.md) | Invoicing, Billing | Breaking         | api      |

## 2014-06-13

### Additional updates

| Title                                                                                                                          | Affected Products  | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------- | -------- |
| [Renames the `type` field on cards to `brand`](https://docs.stripe.com/changelog/2014-06-13/renames-type-field-cards-brand.md) | Payments, Elements | Breaking         | api      |

## 2014-05-19

### Additional updates

| Title                                                                                                                                     | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Replaces the `account` field on transfers](https://docs.stripe.com/changelog/2014-05-19/renames-account-field-transfers-bank-account.md) | Connect, Payouts  | Breaking         | api      |

## 2014-03-28

### Additional updates

| Title                                                                                                                            | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Lists no longer include the `count` field](https://docs.stripe.com/changelog/2014-03-28/lists-no-longer-include-count-field.md) | All products      | Breaking         | api      |

## 2014-03-13

### Additional updates

| Title                                                                                                                                  | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Renames the statement descriptor field](https://docs.stripe.com/changelog/2014-03-13/renames-statement-descriptor-field-transfers.md) | Connect           | Breaking         | api      |

## 2014-01-31

### Additional updates

| Title                                                                                                                                                       | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Customers now support multiple subscriptions](https://docs.stripe.com/changelog/2014-01-31/customers-support-multiple-subscriptions.md)                    | Billing           | Breaking         | api      |
| [Trial end dates are no longer computed for canceled subscriptions](https://docs.stripe.com/changelog/2014-01-31/trial-end-dates-canceled-subscriptions.md) | Billing           | Breaking         | api      |

# 2013

## 2013-12-03

### Additional updates

| Title                                                                                                                                                                                  | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Application fees now provide an expandable `account` field to obtain user details](https://docs.stripe.com/changelog/2013-12-03/application-fees-provide-expandable-account-field.md) | Connect           | Breaking         | api      |
| [Application fee refunds are now proportional to the charged amount](https://docs.stripe.com/changelog/2013-12-03/application-fee-refunds-proportional-charged-amount.md)              | Connect           | Breaking         | api      |

## 2013-10-29

### Additional updates

| Title                                                                                                                                                                             | Affected Products  | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Coupons only apply to an invoice’s total balance, no longer applying to zero-cost invoices](https://docs.stripe.com/changelog/2013-10-29/coupons-apply-invoice-total-balance.md) | Invoicing, Billing | Breaking         | api      |

## 2013-08-13

### Additional updates

| Title                                                                                                                                                                                 | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Fee details have moved from charges to their corresponding balance transactions](https://docs.stripe.com/changelog/2013-08-13/fee-details-moved-balance-transactions.md)             | Payments          | Breaking         | api      |
| [Fee details have moved from transfers to their corresponding balance transactions](https://docs.stripe.com/changelog/2013-08-13/fee-details-moved-balance-transactions-transfers.md) | Payments          | Breaking         | api      |

## 2013-08-12

### Additional updates

| Title                                                                                                                                                        | Affected Products            | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | ---------------- | -------- |
| [Lets the `description` and `email` fields be null on several objects](https://docs.stripe.com/changelog/2013-08-12/allows-description-email-fields-null.md) | Payments, Billing, Invoicing | Breaking         | api      |

## 2013-07-05

### Additional updates

| Title                                                                                                                                                                  | Affected Products            | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------- | -------- |
| [Customers now include a `cards` sublist and `default_card` field](https://docs.stripe.com/changelog/2013-07-05/customers-include-cards-sublist-default-card-field.md) | Payments, Billing, Invoicing | Breaking         | api      |

## 2013-02-13

### Additional updates

| Title                                                                                                                                                                                           | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Disputes on charges are now tracked through the `stripe_fee` field and included in the fee total](https://docs.stripe.com/changelog/2013-02-13/disputes-tracked-stripe-fee-field-fee-total.md) | Payments          | Breaking         | api      |

## 2013-02-11

### Additional updates

| Title                                                                                                                                         | Affected Products  | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Failed invoice payments now return an HTTP error](https://docs.stripe.com/changelog/2013-02-11/failed-invoice-payments-return-http-error.md) | Invoicing, Billing | Breaking         | api      |

# 2012

## 2012-11-07

### Additional updates

| Title                                                                                                                                           | Affected Products | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Renames the `disputed` field for Charges to `dispute`](https://docs.stripe.com/changelog/2012-11-07/renames-disputed-field-charges-dispute.md) | Payments          | Breaking         | api      |

## 2012-10-26

### Additional updates

| Title                                                                                                                                               | Affected Products  | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Invoices now include a sublist of invoice line items](https://docs.stripe.com/changelog/2012-10-26/invoices-include-invoice-line-items-sublist.md) | Billing, Invoicing | Breaking         | api      |

## 2012-09-24

### Additional updates

| Title                                                                                                                                           | Affected Products  | Breaking change? | Category |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Discounts no longer include an extraneous `id` field](https://docs.stripe.com/changelog/2012-09-24/discounts-no-longer-extraneous-id-field.md) | Billing, Invoicing | Breaking         | api      |

## 2012-07-09

### Additional updates

| Title                                                                                                                                      | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Customers no longer include the `uncaptured` field](https://docs.stripe.com/changelog/2012-07-09/customers-no-longer-uncaptured-field.md) | Payments          | Breaking         | api      |

## 2012-06-18

### Additional updates

| Title                                                                                                                                                      | Affected Products  | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Tokens no longer include the `amount` and `currency` properties](https://docs.stripe.com/changelog/2012-06-18/tokens-no-longer-amount-currency-fields.md) | Elements, Payments | Breaking         | api      |

## 2012-03-25

### Additional updates

| Title                                                                                                                                                          | Affected Products | Breaking change? | Category |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Customers no longer include a `next_recurring_charge` field](https://docs.stripe.com/changelog/2012-03-25/customers-no-longer-next-recurring-charge-field.md) | Billing           | Breaking         | api      |

## 2012-02-23

### Additional updates

| Title                                                                                                                                                  | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------- | -------- |
| [Fields with null values are now included in API responses](https://docs.stripe.com/changelog/2012-02-23/fields-null-values-included-api-responses.md) | All products      | Breaking         | api      |

# 2011

## 2011-09-15

### Additional updates

| Title                                                                                                                                         | Affected Products  | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| [Cards validate differently when creating tokens](https://docs.stripe.com/changelog/2011-09-15/cards-validate-differently-creating-tokens.md) | Elements, Payments | Breaking         | api      |

## 2011-08-01

### Additional updates

| Title                                                                                                                                               | Affected Products | Breaking change? | Category |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Lists now provide a total count of items and a `data` field](https://docs.stripe.com/changelog/2011-08-01/lists-provide-total-count-data-field.md) | All products      | Breaking         | api      |

## 2011-06-28

### Additional updates

| Title                                                                                                                              | Affected Products | Breaking change? | Category |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Plans no longer include the `identifier` field](https://docs.stripe.com/changelog/2011-06-28/plans-no-longer-identifier-field.md) | Billing           | Breaking         | api      |

## 2011-06-21

### Additional updates

| Title                                                                                                                                                   | Affected Products | Breaking change? | Category |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- |
| [Errors now produce exceptions for unrecognized API parameters](https://docs.stripe.com/changelog/2011-06-21/exceptions-unrecognized-api-parameters.md) | All products      | Breaking         | api      |
