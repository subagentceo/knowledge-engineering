# Monthly summary

Learn about the monthly summary report.

The [monthly summary](https://dashboard.stripe.com/revenue-recognition/) provides a detailed breakdown of activity for the previous month. You can use this information to understand how your billing activity affected your revenue and to book journal entries.
![Monthly summary for a given month](https://b.stripecdn.com/docs-statics-srv/assets/monthly-summary-v2.ba474e8e2a801fedb0674c40bae653ad.png)

You can see that the net recognized revenue is 171,601 USD and the ending balance of deferred revenue at the end of July is 310,000 USD.

## Recognized revenue 

Items can be broken down into two categories: revenue and contra revenue. The following table explains each item under recognized revenue:

| Item                                          | Category       | Description                                                                                                                                                                                                                                                                     |
| --------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Revenue from billings this month              | Revenue        | The recognized revenue portion from finalized invoice line items and standalone payments occurring this month. The revenue of a standalone payment is recognized when the payment occurs.                                                                                       |
| Recognized revenue previously deferred        | Revenue        | The recognized revenue portion from invoice line items finalized in previous months.                                                                                                                                                                                            |
| Revenue from metered subscriptions this month | Revenue        | The revenue from metered subscriptions.                                                                                                                                                                                                                                         |
| Revenue from unbilled services                | Revenue        | The revenue from unbilled invoice items.                                                                                                                                                                                                                                        |
| Revenue from platform fees                    | Revenue        | The revenue from platform fees. [Learn how a platform fee impacts revenue](https://docs.stripe.com/revenue-recognition/connect/destination-charges.md#revenue-collected-application-fee-amount).                                                                                |
| Less canceled unbilled invoice items          | Contra revenue | The contra revenue originated from the deleted unbilled invoice items.                                                                                                                                                                                                          |
| Less refunds                                  | Contra revenue | The contra revenue originated from refunds. This contra revenue offsets previously recognized revenue. [Learn how a refund impacts revenue.](https://docs.stripe.com/revenue-recognition/examples/contra.md#refund)                                                             |
| Less disputes                                 | Contra revenue | The contra revenue originated from disputes. This contra revenue offsets previously recognized revenue. [Learn how a dispute impacts revenue.](https://docs.stripe.com/revenue-recognition/examples/contra.md#dispute)                                                          |
| Less voided billings                          | Contra revenue | The contra revenue originated from voids. This contra revenue offsets previously recognized revenue. [Learn how voiding impacts revenue.](https://docs.stripe.com/revenue-recognition/examples/contra.md#void)                                                                  |
| Less bad debt                                 | Contra revenue | The contra revenue originated from marking invoices as uncollectible. This contra revenue offsets previously recognized revenue. [Learn how marking an invoice as uncollectible impacts revenue.](https://docs.stripe.com/revenue-recognition/examples/contra.md#uncollectible) |
| Less credit notes                             | Contra revenue | The contra revenue originated from credit notes. This contra revenue offsets previously recognized revenue.                                                                                                                                                                     |
| Less refunds from platform fees               | Contra revenue | The contra revenue originated from refunding platform fees. [Learn how a platform fee refund impacts revenue](https://docs.stripe.com/revenue-recognition/connect/destination-charges.md#loss-and-contra-revenue-with-issuing-refunds).                                         |
| Less transfer                                 | Contra revenue | The contra revenue originated from separate transfers. [Learn how a separate transfer impacts revenue](https://docs.stripe.com/revenue-recognition/connect/charges-transfers.md).                                                                                               |
| Net revenue                                   | -              | The recognized revenue less the contra revenue.                                                                                                                                                                                                                                 |

## Deferred revenue 

The deferred revenue section gives the breakdown of what changed in the deferred revenue balance. The following table lists the items under this section:

| Item                                         | Description                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Starting balance                             | The ending balance of the deferred revenue from the previous month.                                                                                                                                                                                                                                                                                                                        |
| Deferred change from new billings this month | The deferred revenue from finalized invoice line items and standalone payments occurring this month. With the exception of unbilled revenue that was recognized in previous months (that is, included in “Revenue from unbilled services” in previous months), every invoice line item and standalone payment books its deferred revenue regardless of their revenue recognition schedule. |
| Less recognized revenue                      | The portion of deferred revenue that was recognized this month.                                                                                                                                                                                                                                                                                                                            |
| Less credits issued                          | The remaining deferred revenue erased due to refunds, disputes, voids, uncollectible invoices, and credit notes. [Learn how a refund impacts the remaining deferred revenue.](https://docs.stripe.com/revenue-recognition/examples/contra.md#refund)                                                                                                                                       |
| Ending balance                               | The ending balance of the deferred revenue from this month.                                                                                                                                                                                                                                                                                                                                |

## Finalized invoice example 

This example includes only one *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) with the following assumptions:

- The invoice finalizes on July 10, 2025.
- The invoice has only one line item whose service period is from July 20, 2025 to September 17, 2025.
- The amount for the invoice line item is 60 USD, out of which 12 USD is recognized in July and 48 USD is deferred.

The monthly summary for July 2025 would look like this:

|  |
|  |
| **Recognized revenue**                       |         |
| Revenue from billings this month             | 12 USD  |
| **Net revenue**                              | 12 USD  |
| **Deferred revenue**                         |         |
| Starting balance Jul 1 UTC                   | 0 USD   |
| Deferred change from new billings this month | 60 USD  |
| Less recognized revenue                      | -12 USD |
| **Ending balance Jul 31 UTC**                | 48 USD  |
| **Future scheduled billings**                |         |
| Starting balance Jul 1 UTC                   | 0 USD   |
| **Ending balance Jul 31 UTC**                | 0 USD   |

Continuing on this example, if the invoice is refunded on August 15, 2025, the monthly summary for August 2025 would look like this:

|  |
|  |
| **Recognized revenue**        |         |
| Less refunds                  | -12 USD |
| **Net revenue**               | -12 USD |
| **Deferred revenue**          |         |
| Starting balance Aug 1 UTC    | 48 USD  |
| Less credits issued           | -48 USD |
| **Ending balance Aug 31 UTC** | 0 USD   |
| **Future scheduled billings** |         |
| Starting balance Aug 1 UTC    | 0 USD   |
| **Ending balance Aug 31 UTC** | 0 USD   |

## Standalone payment example 

The revenue of a standalone payment is recognized when the payment occurs. This example has only one charge with the following assumptions:

- The charge occurs on July 15, 2025.
- The charge’s amount is 17 USD.

The monthly summary for July 2025 would look like this:

|  |
|  |
| **Recognized revenue**                       |        |
| Revenue from billings this month             | 17 USD |
| **Net revenue**                              | 17 USD |
| **Deferred revenue**                         |        |
| Starting balance Jul 1 UTC                   | 0 USD  |
| Deferred change from new billings this month | 17 USD |
| Less recognized revenue                      | 17 USD |
| **Ending balance Jul 31 UTC**                | 0 USD  |
| **Future scheduled billings**                |        |
| Starting balance Jul 1 UTC                   | 0 USD  |
| **Ending balance Jul 31 UTC**                | 0 USD  |
