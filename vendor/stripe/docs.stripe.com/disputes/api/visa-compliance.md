# Visa compliance disputes

Use the API to respond to Visa compliance disputes.

Businesses receive Visa compliance disputes in certain cases when the card issuer believes the disputed transaction doesn’t conform to Visa’s network rules. If Visa compliance disputes can’t be resolved between the parties, the dispute is resolved by the network in exchange for a fee.

If you contest a Visa compliance dispute, in addition to the applicable Stripe dispute fees, Stripe collects a 500 USD (or local equivalent) amount to cover the network costs associated with resolving Visa compliance disputes. Stripe refunds the 500 USD if you win the dispute.

> Compliance cases filed by issuers are referred to as pre-compliance disputes by Visa.
> 
> Learn more about [Visa rules](https://usa.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf).

## Identify Visa compliance disputes 

You can identify a Visa compliance dispute from the [dispute object](https://docs.stripe.com/api/disputes/object.md).

Use any of the following indicators to identify a Visa compliance dispute:

- [payment_method_details.case_type](https://docs.stripe.com/api/disputes/object.md#dispute_object-payment_method_details-card-case_type) is set to `compliance`.
- [enhanced_eligibility_types](https://docs.stripe.com/api/disputes/object.md#dispute_object-enhanced_eligibility_types) contains `visa_compliance`.
- [reason](https://docs.stripe.com/api/disputes/object.md#dispute_object-reason) is `noncompliant`.

```json
{
  "id": "du_TFCU9xJ2Gsj7BAiAoQok8Icp",
  "charge": "ch_vEUUPELhHVkPbMN1md3B0vG7",
  "enhanced_eligibility_types": ["visa_compliance"],
  "reason": "noncompliant",
  "payment_method_details": {
    "card": {
      "brand": "visa",
      "case_type": "compliance"
    }
  }
}
```

## Close Visa compliance disputes using the API

Closing a Visa compliance dispute indicates that you don’t have any evidence to submit and are essentially dismissing the dispute, acknowledging it as lost. You aren’t charged the 500 USD Visa compliance network fee if you choose to close the dispute.

To close a dispute, use the [close API](https://docs.stripe.com/api/disputes/close.md).

> Closing a dispute is irreversible.

## Respond to Visa compliance disputes using the API

The process of responding to a Visa compliance dispute is similar to responding to other disputes. You can use the [update API](https://docs.stripe.com/api/disputes/update.md) to submit evidence to counter a dispute.

For Visa compliance disputes, you must explicitly acknowledge a 500 USD using the [enhanced evidence](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence) object. Stripe withdraws the 500 USD network fee from your balance asynchronously after you submit evidence, typically within 1-2 days. Stripe refunds this network fee if you win the dispute.

To acknowledge the network fee, you must set [evidence.enhanced_evidence.visa_compliance.fee_acknowledged](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence-enhanced_evidence-visa_compliance-fee_acknowledged) to `true` when submitting evidence.

```json
{
  "id": "du_TFCU9xJ2Gsj7BAiAoQok8Icp",
  "charge": "ch_vEUUPELhHVkPbMN1md3B0vG7",
  "evidence": {
    ...
    "enhanced_evidence": {
      "visa_compliance": {
        "fee_acknowledged": true
    },
  }
  ...
}
```

If you acknowledge the Visa compliance network fee, [evidence_details.enhanced_eligibility.visa_compliance.status](https://docs.stripe.com/api/disputes/object.md#dispute_object-evidence_details-enhanced_eligibility-visa_compliance-status) changes to `fee_acknowledged`, indicating your acknowledgement.

```json
{
  "id": "du_TFCU9xJ2Gsj7BAiAoQok8Icp",
  "charge": "ch_vEUUPELhHVkPbMN1md3B0vG7",
  "evidence": {
    ...
    "enhanced_evidence": {
      "visa_compliance": {
        "fee_acknowledged": true
    },
  },
  "evidence_details": {
    ...
    "enhanced_eligibility": {
      "visa_compliance": {
        "status": "fee_acknowledged"
    },
  }
  ...
}
```

> If you attempt to submit evidence for a Visa compliance dispute without acknowledging the network fee, Stripe returns an error response and doesn’t submit your provided evidence.

## Testing 

To test responding to Visa compliance disputes, use the following test card, which creates a Visa compliance dispute:

| Testing Method | Token                             |
| -------------- | --------------------------------- |
| Card Number    | 4000008400000779                  |
| PaymentMethod  | `pm_card_createComplianceDispute` |
| Token          | `tok_createComplianceDispute`     |

Similar to live mode Visa compliance disputes, Stripe returns an error response if you submit evidence without acknowledging the network fee.

> To simulate a `won` or `lost` state for the overall dispute, set [uncategorized_text](https://docs.stripe.com/api/disputes/update.md#update_dispute-evidence-uncategorized_text) to `winning_evidence` or `losing_evidence` as outlined in [Testing](https://docs.stripe.com/testing.md?testing-method=card-numbers#evidence).
