# Visa Compelling Evidence 3.0 disputes

Use the API and Visa's Compelling Evidence 3.0 to respond to qualifying disputes.

Visa Compelling Evidence 3.0 (CE 3.0) has new qualifying criteria allowing businesses to demonstrate a non-fraudulent history with cardholders to fight friendly fraud. Submitting qualifying evidence for Visa CE 3.0 eligible disputes can increase the chance of an issuer reversing friendly fraud disputes in favor of the business.

## Visa CE 3.0 qualifying disputes 

To respond to a dispute using Visa CE 3.0, the dispute must meet the following criteria:

- The disputed transaction must be a Visa transaction with [network reason code](https://docs.stripe.com/api/disputes/object.md#dispute_object-payment_method_details-card-network_reason_code) 10.4.
- There must be at least two previous transactions that weren’t disputed, using the same payment method as the disputed transaction.
  - The previous non-disputed transactions must be within 120-364 days of the disputed transaction.
  - The previous non-disputed transactions must be paid, undisputed, and can’t be validation charges.
- You must provide descriptions for the disputed transaction’s [product description](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence-visa_compelling_evidence_3-disputed_transaction-product_description) and past undisputed transactions’ [product descriptions](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence-visa_compelling_evidence_3-prior_undisputed_transactions-product_description).
- You must categorize the disputed transaction as either `merchandise` or `services` in the [merchandise_or_services](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence-visa_compelling_evidence_3-disputed_transaction-merchandise_or_services) field.
- The disputed transaction and both past undisputed transactions must match either:
  - Two main evidence elements (for example, Customer Purchase IP and Customer Device Fingerprint).
  - One main evidence element *and* one secondary evidence element (for example, Customer Device ID and Customer Account ID).

| Main evidence elements                            | Secondary evidence elements |
| ------------------------------------------------- | --------------------------- |
| Customer purchase IP                              | Shipping address            |
| Customer device fingerprint or customer device ID | Customer email address      |
|                                                   | Customer Account ID         |

> Customer Device Fingerprint *and* Customer Device ID isn’t a valid evidence combination.

## The enhanced evidence object 

To submit evidence using Visa CE 3.0, use the [enhanced evidence](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence) object. This exists within the [dispute evidence](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence) object. The [enhanced eligibility types](https://docs.stripe.com/api/disputes/object.md#dispute_object-enhanced_eligibility_types) array contains a list of eligibility types in [enhanced evidence](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence).

```json
{
  "id": "du_TFCU9xJ2Gsj7BAiAoQok8Icp",
  "charge": "ch_vEUUPELhHVkPbMN1md3B0vG7",
  "enhanced_eligibility_types": ["visa_compelling_evidence_3"],
  "evidence": {
    "enhanced_evidence": {
      "visa_compelling_evidence_3": {
        "disputed_transaction": {
          "customer_email_address": "test@example.com",
          "customer_purchase_ip": "123.123.123.123",
          "merchandise_or_services": "merchandise",
          "product_description": "Widget ABC, color: green"
        },
        "prior_undisputed_transactions": [
          {
            "charge": "ch_nE8T8mUOoy9zkkOQLHuLsr3Z",
            "customer_email_address": "test@example.com",
            "customer_purchase_ip": "123.123.123.123",
            "product_description": "Widget DEF, color: blue"
          },
          {
            "charge": "ch_PcE97JB902XNTc1JpyBFmMTF",
            "customer_email_address": "test@example.com",
            "customer_purchase_ip": "123.123.123.123",
            "product_description": "Widget XYZ, color: yellow"
          }
        ]
      }
    }
  }
  ...
}
```

## The enhanced eligibility object 

The [enhanced eligibility](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence_details-enhanced_eligibility) object shows the status of your Visa CE 3.0 submission. This exists within the [evidence details](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence_details) object and provides detailed information on the steps required to ensure evidence is submitted to Visa as CE 3.0.

```json
{
  "enhanced_eligibility_types": ["visa_compelling_evidence_3"],
  "evidence_details": {
    "due_by": 1708387199,
    "enhanced_eligibility": {
      "visa_compelling_evidence_3": {
        "partner_rejected_details": null,
        "required_actions": [
          "missing_merchandise_or_services",
          "missing_disputed_transaction_description"
        ],
        "status": "requires_action"
      }
    },
    "has_evidence": false,
    "past_due": false,
    "submission_count": 0
  },
  "payment_method_details": {
    "card": {
      "brand": "visa",
      "network_reason_code": "10.4"
    },
    "type": "card"
  },
  "reason": "fraudulent",
  "status": "needs_response"
}
```

## Autofilled evidence 

When Stripe identifies a disputed transaction as eligible for Visa CE 3.0, Stripe attempts to autofill the disputed transaction and evidence from previous undisputed transactions. You have the option to manually add Visa CE 3.0 evidence if you believe the disputed transaction qualifies.

> Stripe must have processed all past undisputed transactions.

## Submission lifecycle 

The Visa CE 3.0 [status](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence_details-enhanced_eligibility-visa_compelling_evidence_3-status) becomes `qualified` or `requires_action` when a dispute has the [Visa Compelling Evidence 3](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence-visa_compelling_evidence_3) object filled within the [enhanced evidence](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence) object.

- If the status is `requires_action`, use the [required_actions](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence_details-enhanced_eligibility-visa_compelling_evidence_3-required_actions) array to figure out the extra evidence needed.
- If the status is `qualified`, you’re ready to submit Visa CE 3.0 evidence.

You can submit evidence using the [Update dispute](https://docs.stripe.com/api.md#update_dispute) API. To update evidence without submitting it, make sure the [submit](https://docs.stripe.com/api/disputes/update.md#update_dispute-submit) parameter is set to `false`.

After submitting evidence, the status changes to `not_qualified` if the evidence is ineligible for Visa CE 3.0. Evidence is still submitted, but not using Visa CE 3.0.

If you have submitted qualifying evidence, track the status of the dispute in the [dispute status](https://docs.stripe.com/api/disputes/object.md#dispute_object-status) field to see if you’ve won or lost.

> To increase your chances of winning a dispute, fill out the [dispute evidence](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence) object (not just the [enhanced evidence](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence) object). This evidence is used in case your Visa CE 3.0 submission is disapproved, and your dispute is submitted through the standard evidence submission flow.

## Testing 

To test your Visa CE 3.0 integration, use the following test card, which creates a Visa CE 3.0 eligible dispute:

| Testing Method | Token                              |
| -------------- | ---------------------------------- |
| Card Number    | 4000000404000038                   |
| PaymentMethod  | `pm_card_createCe3EligibleDispute` |
| Token          | `tok_createCe3EligibleDispute`     |

When providing evidence for this dispute, you can submit any two test environment transactions in the [prior_undisputed_transactions.charge](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence-visa_compelling_evidence_3-prior_undisputed_transactions-charge) field.

> In test environments, you can use any two test transactions as `prior_undisputed_transactions`. Stripe doesn’t validate the prior transactions’ payment method or transaction date while testing.

We’ll validate primary and secondary evidence elements according to Visa CE 3.0 rules.

The [Visa CE 3.0 status](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence_details-enhanced_eligibility-visa_compelling_evidence_3-status) properly reflects `qualified` or `requires_action` based on the evidence provided.

After you submit evidence, the [Visa CE 3.0 status](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence_details-enhanced_eligibility-visa_compelling_evidence_3-status) is:

- `not_qualified`: The evidence doesn’t qualify for Visa CE 3.0.
- `qualified`: The evidence qualifies for Visa CE 3.0.

> The [Visa CE 3.0 status](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence_details-enhanced_eligibility-visa_compelling_evidence_3-status) doesn’t impact the [dispute status](https://docs.stripe.com/api/disputes/object.md#dispute_object-status).
> 
> To simulate a `won` or `lost` state for the overall dispute, set [uncategorized_text](https://docs.stripe.com/api/disputes/update.md#update_dispute-evidence-uncategorized_text) to `winning_evidence` or `losing_evidence` as outlined in [Testing](https://docs.stripe.com/testing.md?testing-method=card-numbers#evidence).
