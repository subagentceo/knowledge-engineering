# Refund and cancel payments

Learn how to cancel or refund a payment.

You can [cancel a payment](https://docs.stripe.com/refunds.md#cancel-payment) before it’s completed at no cost. Or you can refund all or part of a payment after it succeeds, which might incur a fee. Stripe’s processing fees from the original transaction aren’t returned. Go to our [pricing page](https://stripe.com/pricing/local-payment-methods) for more information.

Refunds use your available Stripe balance (not including pending amounts). If your available balance doesn’t cover the amount of the refund, Stripe holds the refund as pending for card transactions (refunds for other payment method types will fail) until your Stripe balance becomes sufficient. You can resolve a negative Stripe balance by collecting payments or *topping up* (The act of adding funds to a Stripe account, typically through a transfer from a bank external to Stripe) your account balance. In regions where applicable, Stripe might debit your bank accounts automatically to recover a negative Stripe balance.

## Refund requests 

We submit refund requests to your customer’s bank or *card issuer* (The entity that issued a payment card to a cardholder. This could be a bank, such as with the Visa or Mastercard network, or it could be the card network itself, such as with American Express). Successful refunds appear on the bank statement of your customers in real time, depending on the card network and issuing bank. Disputes and chargebacks aren’t possible on credit card charges that are fully refunded.

If all of the following conditions apply, we send an email to your customer notifying them of the refund:

- The original charge was created on a customer in your Stripe account.
- The customer has a stored email address.
- You enabled **Email customers for refunds** in the [Dashboard](https://dashboard.stripe.com/account/emails).

You can [view your refunded payments in the Dashboard](https://dashboard.stripe.com/test/payments?status%5B0%5D=refunded&status%5B1%5D=refund_pending&status%5B2%5D=partially_refunded).

## Issue refunds 

You can issue refunds by using the [Refunds API](https://docs.stripe.com/api/refunds.md) or the [Dashboard](https://dashboard.stripe.com/test/payments). You can issue more than one refund against a charge, but you can’t refund a total greater than the original charge amount.

#### Dashboard

To refund a payment using the Dashboard:

1. Find the payment you want to refund in the [Payments](https://dashboard.stripe.com/payments) page.
1. Click the overflow menu (⋯) to the right of the payment, then select **Refund payment**.
1. By default, you’ll issue a full refund. For a partial refund, enter a different refund amount.
1. Select a reason for the refund. If you select **Other**, you must add a note that explains the reason for the refund. Click **Refund**.

Alternatively, you can click a specific payment and issue a refund from its details page. You can also send [refund receipts](https://docs.stripe.com/receipts.md#refund-receipts) automatically or manually send a receipt for each refund.

> #### Bulk refunds
> 
> The Dashboard supports the bulk refunding of full payments. Select what payments you want to refund by checking the box to the left of each payment—even over multiple pages of results. Then, click **Refund** and select a reason. You can only issue full refunds in this way; partial refunds must be issued individually.

#### API

To refund a payment using the API, [create a refund](https://docs.stripe.com/api.md#create_refund) providing the charge’s ID or [PaymentIntent](https://docs.stripe.com/api/payment_intents.md).

When you use a PaymentIntent to collect payment, Stripe creates a [charge](https://docs.stripe.com/api/charges/object.md) object. To refund a payment after the PaymentIntent succeeds, create a refund using the PaymentIntent, which is the same as refunding the underlying charge. If you’re using Stripe Tax APIs to record sales, you must [record refunds](https://docs.stripe.com/tax/payment-intent/custom.md#reversals).

```curl
curl https://api.stripe.com/v1/refunds \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d payment_intent=pi_Aabcxyz01aDfoo
```

You can also refund only part of a PaymentIntent by specifying an amount. To do so, provide an `amount` parameter as an integer in cents (or the charge currency’s smallest currency unit).

```curl
curl https://api.stripe.com/v1/refunds \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d payment_intent=pi_Aabcxyz01aDfoo \
  -d amount=1000
```

If you want to separate the [authorization and capture](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method.md) of a charge, and refund a PaymentIntent that has a status of `requires_capture`, the refund process is different. In this case, the charge attached to the PaymentIntent remains uncaptured and can’t be refunded directly. You must [cancel the PaymentIntent](https://docs.stripe.com/api/payment_intents/cancel.md).

### Refunds through a Connect platform

Refund behavior depends on the [Connect charge type](https://docs.stripe.com/connect/charges.md#refund-creation) used in your integration.

- Stripe debits the connected account directly for refunds to [direct charge](https://docs.stripe.com/connect/direct-charges.md#issue-refunds) payments.
- Stripe debits your platform for refunds to [destination charge](https://docs.stripe.com/connect/destination-charges.md#issue-refunds) or [separate charge and transfer](https://docs.stripe.com/connect/separate-charges-and-transfers.md#issue-refunds) (with or without `on_behalf_of`) payments. Reverse the transfers associated with these charge types to recover the refund amount from your connected accounts.

Connect platforms can enable their connected accounts to provide refunds to customers from their site by using Connect embedded components such as the [payments](https://docs.stripe.com/connect/supported-embedded-components/payments.md) or the [payment details](https://docs.stripe.com/connect/supported-embedded-components/payment-details.md) component.

## Refund destinations 

Refunds can only be sent back to the original payment method used in a charge. You can’t send a refund to a different destination, such as another card or bank account.

Refunds to expired or canceled cards are handled by the customer’s card issuer and, in most cases, credited to the customer’s replacement card. If no replacement exists, the card issuer usually delivers the refund to the customer using an alternate method (for example, check or bank account deposit). In rare cases, a refund back to a card might [fail](https://docs.stripe.com/refunds.md#failed-refunds).

For other payment methods, like [ACH](https://docs.stripe.com/payments/ach-direct-debit.md) and [iDEAL](https://docs.stripe.com/payments/ideal.md), refund handling varies from bank to bank. If a customer has closed their method of payment, the bank might return the refund to us—at which point it’s marked as [failed](https://docs.stripe.com/refunds.md#failed-refunds).

## Handle failed refunds 

A refund can fail if the customer’s bank or card issuer can’t process it. For example, a closed bank account or a problem with the card can cause a refund to fail. When this happens, the bank returns the refunded amount to us and we add it back to your Stripe account balance. This process can take up to 30 days from the post date.

When using the API, a [Refund](https://docs.stripe.com/api.md#refund_object) object’s status transitions to `failed` and includes these attributes:

- `failure_balance_transaction`: The ID of the [balance transaction](https://docs.stripe.com/api.md#balance_transaction_object) representing the amount returned to your Stripe balance.
- `failure_reason`: The reason why the refund failed. These reasons include:
| Failure reason                       | Description                                                                                                                                                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `charge_for_pending_refund_disputed` | A customer disputed the charge while the refund is pending. In this case, we recommend [accepting or challenging](https://docs.stripe.com/disputes/responding.md#decide) the dispute instead of refunding to avoid duplicate reimbursements to the customer. |
| `declined`                           | Refund declined by our financial partners.                                                                                                                                                                                                                   |
| `expired_or_canceled_card`           | Payment method is canceled by a customer or expired by the partner.                                                                                                                                                                                          |
| `insufficient_funds`                 | Refund is pending due to insufficient funds and has crossed the pending refund expiry window.                                                                                                                                                                |
| `lost_or_stolen_card`                | Refund has failed due to loss or theft of the original card.                                                                                                                                                                                                 |
| `merchant_request`                   | Refund failed upon the business’s request.                                                                                                                                                                                                                   |
| `unknown`                            | Refund has failed due to an unknown reason.                                                                                                                                                                                                                  |

For some payment methods, the decline code provided by our financial partners, which indicates the reason the refund failed, is available in the `network_decline_code` field of the `destination_details` hash:

```
{
  id: "pyr_1234",
  destination_details: {
    blik: {
      network_decline_code: "decline_code"
    },
    type: 'blik',
  }
}
```

In the rare instance that a refund fails, we notify you using the `refund.failed` *event* (A tool to send events to your application via webhook or directly to your cloud infrastructure) (see [all refund-related events](https://docs.stripe.com/refunds.md#refund-events)). If this occurs, you need to arrange an alternative way to provide your customer with a refund.

If your platform uses [Connect with destination charges](https://docs.stripe.com/connect/destination-charges.md#issue-refunds), funds from a failed refund deposit to your platform account’s Stripe balance.

## Cancel a refund 

Depending on the type of refund, you might be able to cancel a refund before it reaches the customer. Some card refunds support cancellation for a short period of time. The refund must not have been processed as a charge reversal. Only Dashboard cancellations are currently supported for card refunds.

For some [payment methods](https://docs.stripe.com/payments/bank-transfers.md#refunds), Stripe reaches out to the customer to collect banking information [before processing the refund](https://docs.stripe.com/refunds.md#requires-action). You can cancel these refunds while banking information hasn’t been collected. Both the API and Dashboard cancellations are supported for this type of refund.

Canceled refunds transition to a `canceled` status. As cancellations are a type of refund failure, the attributes `failure_reason` and `failure_balance_transaction` are included on the [Refund](https://docs.stripe.com/api.md#refund_object).

If your platform uses [Connect with destination charges](https://docs.stripe.com/connect/destination-charges.md#issue-refunds), funds from a canceled refund deposit to your platform account’s Stripe balance.

To cancel a refund using the Dashboard:

1. Find the payment associated with the refund in the [Payments](https://dashboard.stripe.com/payments) page.
1. Click the overflow menu (⋯) to the right of the payment, then select **Cancel refund**.
1. If there are multiple partial refunds, select the correct refund in the dropdown.
1. Confirm the refund cancellation by selecting **Yes, cancel refund**.

Alternatively, you can click a specific payment and cancel the refund from its details page.

## Refunds that require action 

For some payment methods without native refund support (for example, Konbini, PromptPay, Boleto, and bank transfers), Stripe needs to collect bank account details from your customer before it can process the refund. In these cases, the refund enters the `requires_action` status and Stripe emails your customer to request their bank information.

When a refund has a status of `requires_action`, the [Refund](https://docs.stripe.com/api/refunds/object.md) object’s `next_action` property describes what the refund needs to continue processing. The `next_action` object contains these fields:

- `next_action.type`: The type of next action (for example, `display_details`).
- `next_action.display_details.email_sent`: Information about the email sent to the customer, including:
  - `email_sent_at`: The timestamp when the email was sent.
  - `email_sent_to`: The recipient’s email address.
- `next_action.display_details.expires_at`: The timestamp when the refund request expires if the customer doesn’t respond.

The refund status transitions as follows:

| Event                                                                          | Refund status     |
| ------------------------------------------------------------------------------ | ----------------- |
| Refund is created and customer is emailed                                      | `requires_action` |
| Customer submits bank account details, and Stripe begins processing the refund | `pending`         |
| Refund is expected to arrive in customer’s bank                                | `succeeded`       |
| Customer’s bank returns the funds back to Stripe                               | `requires_action` |
| Customer doesn’t respond before the expiration threshold                       | `failed`          |
| Refund is canceled while in `requires_action` state                            | `canceled`        |

If the customer’s bank can’t successfully complete the transfer (for example, the account holder’s name doesn’t match or the bank account number has a typo), the funds are returned to Stripe and the refund transitions back to `requires_action`. In this case, Stripe emails the customer again to request corrected bank account details.

You can [cancel a refund](https://docs.stripe.com/refunds.md#cancel-refund) while it’s in the `requires_action` state. For example, if you want to arrange an alternative way to return funds to the customer.

## Refund and reversal 

Some refunds—those issued shortly after the original charge—appear in the form of a *reversal* (A reversal is the cancellation of a transaction. Stripe doesn't withhold any fees for payment reversals) instead of a refund. In the case of a reversal, the original charge drops off the customer’s statement, and a separate credit isn’t issued.

*IC+* (A pricing plan where businesses pay the variable network cost for each transaction plus the Stripe fee rather than a flat rate for all transactions. This pricing model provides more visibility into payments costs) users might see a difference in cost between reversals and refunds because reversals usually incur lower network fees.

#### Dashboard

To verify if a refund goes through as a reversal on the Dashboard:

1. Open the payment details page of the payment associated with the refund.
1. In the Timeline, click **View Details** on the refund entry.
1. If it’s a reversal, a corresponding message displays.

#### API

To verify if a refund goes through as a reversal using the API:

1. Consume the `refund.updated` [event](https://docs.stripe.com/refunds.md#refund-events) or [retrieve the refund](https://docs.stripe.com/api/refunds/retrieve.md) with the API.
1. If it’s a reversal, it returns `destination_details[card][type] = 'reversal'`.

## Trace a refund 

After you initiate a refund, Stripe submits refund requests to your customer’s bank or card issuer. Your customer sees the refund as a credit approximately 5-10 business days later, depending upon the bank. A customer might contact you if they don’t see the refund. A refund might not be visible to the customer for several reasons:

- Refunds issued shortly after the original charge appear in the form of a reversal instead of a refund. In the case of a reversal, the original charge drops off the customer’s statement, and a separate credit isn’t issued.
- Refunds can fail if the customer’s bank or card issuer has been unable to process it correctly. The bank returns the refunded amount to us and we add it back to your Stripe account balance. This process can take up to 30 days from requesting the refund.

If a customer is asking about a refund, it can be helpful to give them the primary reference number corresponding to the refund. For card refunds, it can be an **Acquirer Reference Number (ARN)**, **System Trace Audit Number (STAN)**, or **Retrieval Reference Number (RRN)**. An ARN, STAN, or RRN is a reference number assigned to a card transaction as it moves through the payment flow. For local payment method refunds, it can be a reference number generated by Stripe or our financial partners which is propagated to the beneficiary banks or institutions. Your customer can then take this reference to their bank, which can provide more information about when the refund is available. Having a reference number can also increase your customer’s confidence that the refund has been initiated.

Refund references are available under the following conditions:

- They’re supported for some financial partners, and marked as unavailable otherwise.
- It takes up to 7 business days after initiating the refund to receive the ARN from downstream banking partners.
- An ARN isn’t available in the case of a reversal, since the original charge isn’t processed. For card networks that don’t support ARNs, we attempt to provide other references such as System Trace Audit Number (STAN) or Retrieval Reference Number (RRN).

#### Dashboard

To find the reference of a refund using the Dashboard:

1. Open the payment details page of the payment associated with the refund.
1. In the Timeline, click **View Details** on the refund entry.
1. Where available, Stripe shows the ARN or STAN on the clipboard.

#### API

To find the reference of a refund using the API:

1. Consume the `refund.updated` [event](https://docs.stripe.com/refunds.md#refund-events) or [retrieve the refund](https://docs.stripe.com/api/refunds/retrieve.md) with the API.
1. Where available, Stripe shows the card refund reference in the following API response format:

```
{
  id: "re_1234",
  destination_details: {
    card: {
      reference: "123456",
      reference_status: "available",
      reference_type: "acquirer_reference_number",
      type: "refund"
    },
    type: "card",
  }
}
```

Or the reference for selected local payment methods in the following API response format:

```
{
  id: "pyr_1234",
  destination_details: {
    eu_bank_transfer: {
      reference: "123456",
      reference_status: "available"
    },
    type: "eu_bank_transfer",
  }
}
```

## Cancel a payment 

You can cancel a payment using the Dashboard when its status is `uncaptured`, or when it’s a debit payment that hasn’t been posted to the bank yet. To cancel a payment with other statuses, you must use the API.

#### Dashboard

To cancel payments using the Dashboard:

1. Find the payment you want to cancel in the [Payments](https://dashboard.stripe.com/payments) page.
1. Click the payment, then select **Cancel**.
1. Select a reason for canceling, then click **Yes**. If you select **Other**, you must add a note that explains the reason for canceling the payment.

You can cancel a payment from the Dashboard when:

- The payment status is `uncaptured`.
- The payment is a debit payment that hasn’t been posted to the bank yet.

#### API

If you no longer intend to collect a payment, you can [cancel a PaymentIntent](https://docs.stripe.com/api/payment_intents/cancel.md). You can keep a PaymentIntent in an incomplete status, like `requires_confirmation` or `requires_payment_method`, because incomplete PaymentIntents are useful in understanding the conversion rate at checkout. The following code example shows a request to cancel a PaymentIntent:

```curl
curl -X POST https://api.stripe.com/v1/payment_intents/pi_32AkjQ5H4Bas2eAolX13/cancel \
  -u "<<YOUR_SECRET_KEY>>:"
```

You can only cancel a PaymentIntent when it has one of the following statuses:

- `requires_payment_method`
- `requires_capture`
- `requires_confirmation`
- `requires_action`
- `processing` (only when the associated payment method is US Bank Account)

A PaymentIntent can’t be canceled after it has succeeded. When a PaymentIntent is canceled, you can no longer use it to perform additional charges. Any operations that your application attempts to perform on a canceled PaymentIntent fails with an error.

## Refund events

Stripe triggers [events](https://docs.stripe.com/api/events.md#events) every time a refund is created or changed. Some other actions, like reviews closing, also trigger events that are relevant to refunds.

Make sure that your integration is set up to [handle events](https://docs.stripe.com/webhooks/handling-payment-events.md) and that you [verify webhook signatures](https://docs.stripe.com/webhooks.md#verify-events) to confirm that incoming events are from Stripe. You must also build internal logic for notifying customers or your team about the state of the refund process. At a minimum, Stripe recommends that you listen for the `refund.created` event.

The following table describes the most common events related to refunds.

| Event                                            | Description                                                                                                                                                                                                                        |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `refund.created`                                 | Sent when a refund is created.                                                                                                                                                                                                     |
| `refund.updated`                                 | Sent when the refund is updated. Updates include adding metadata and providing details like the [ARN as a reference number to trace refunds](https://docs.stripe.com/refunds.md#tracing-refunds).                                  |
| `refund.failed`                                  | Sent when a [refund has failed](https://docs.stripe.com/refunds.md#failed-refunds).                                                                                                                                                |
| `charge.dispute.funds_reinstated`                | Sent when funds are reinstated to your account after a dispute is closed, including [partially refunded payments](https://docs.stripe.com/disputes/best-practices.md#partial-refund-bp).                                           |
| `charge.refunded`                                | Sent when a charge is refunded, including partial refunds. Listen to `refund.created` for information about the refund.                                                                                                            |
| `review.closed`                                  | Sent when a [review](https://docs.stripe.com/api/events/types.md#review_object) is closed. See the `reason` field to understand why it was closed, one of: `approved`, `disputed`, `canceled`, `refunded`, or `refunded_as_fraud`. |
| `source.refund_attributes_required` (Deprecated) | Sent when the receiver source requires refund attributes to process a refund or a mispayment.                                                                                                                                      |
| `charge.refund.updated` (Deprecated)             | Sent when the refund is updated, only for refunds with a corresponding charge. Listen to `refund.updated` for updates on all refunds instead.                                                                                      |

## Cost optimization

If your business processes a large volume of refunds close to the time of transaction, we recommend using [manual authorization and capture](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method.md) to reduce your refund costs. Manual authorization and capture lets you better control costs by canceling payments before they’re captured, or by reducing your captured amount rather than processing a refund.

## See also

- [Add funds to your Stripe balance](https://docs.stripe.com/get-started/account/add-funds.md)
- [Add funds to your platform balance](https://docs.stripe.com/connect/top-ups.md)
- [Localize prices](https://docs.stripe.com/payments/currencies/localize-prices.md)
