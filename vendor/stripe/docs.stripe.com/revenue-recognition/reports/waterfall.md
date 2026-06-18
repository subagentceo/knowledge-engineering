# Revenue waterfall

View and analyze monthly revenue with the waterfall report.

The [waterfall report](https://dashboard.stripe.com/revenue-recognition/accounting-reports) displays information about your monthly revenue. You can select a range to view, and you can specify a month to show recognized revenue up to.

For example, the following waterfall shows revenue billed in April 2025, with monthly recognized revenue up to the end of June 2025:

|  |
|  |
| **Booked** | **Recognized** | **As of Jun 2025** |
| **Month**  | **Total**      | **May 2025**       | **Jun 2025** | **Recognized** | **Remaining** |
| Apr 2025   | 2,000,000 USD  | 400,000 USD        | 700,000 USD  | 1,100,000 USD  | 900,000 USD   |

In this example, 2,000,000 USD in net revenue was booked in April 2025. Of that amount, 400,000 USD was recognized in May 2025 and 700,000 USD in June 2025, for a total of 1,100,000 USD recognized. The remaining 900,000 USD wasn’t recognized yet.

## Booked revenue 

The **Booked** column in the waterfall report shows the revenue booked by month. The booked revenue of a month is the amount of revenue and deferred revenue booked by *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) line items, invoice items, standalone payments, refunds, disputes, and usage-based billing usage.

### Simple invoice

This example is based on the following assumptions:

- The invoice and invoice line item finalize on July 14, 2025.
- The amount of the invoice line item is 31 USD, and its service period is from July 21, 2025 to Aug 20, 2025.

The revenue waterfall would look like this:

|  |
|  |
| **Booked** | **Recognized** | **As of Sep 2025** |
| **Month**  | **Total**      | **Jun 2025**       | **Jul 2025** | **Aug 2025** | **Sep 2025** | **Recognized** | **Remaining** |
| Jul 2025   | 31 USD         |                    | 11 USD       | 20 USD       |              | 31 USD         | 0 USD         |

### Negative recognized revenue

In the revenue waterfall, the recognized revenue can be negative due to refunds, disputes, invoices marked as uncollectible, and voided invoices.

This example is based on the following assumptions:

- The invoice and invoice line item finalize on July 14, 2025.
- The amount of the invoice line item is 31 USD, and its service period is from July 21, 2025 to Aug 20, 2025.
- The invoice is voided on September 12, 2025.

The booked revenue for July 2025 would net at 31 USD, and the booked revenue for Sep 2025 would be net -31 USD, as shown in the following revenue waterfall:

|  |
|  |
| **Booked** | **Recognized** | **As of Sep 2025** |
| **Month**  | **Total**      | **Jun 2025**       | **Jul 2025** | **Aug 2025** | **Sep 2025** | **Recognized** | **Remaining** |
| Jul 2025   | 31 USD         |                    | 11 USD       | 20 USD       |              | 0 USD          | 0 USD         |
| Aug 2025   | 0 USD          |                    |              |              |              | 0 USD          | 0 USD         |
| Sep 2025   | -31 USD        |                    |              |              | -31 USD      | 0 USD          | 0 USD         |

### Revenue doesn’t include taxes

The total amount of the invoice doesn’t necessarily equal the booked revenue because of taxes.

This example is based on the following assumptions:

- The invoice and invoice line item finalize on July 14, 2025
- The invoice line item’s amount is 35 USD, and its service period is from July 21, 2025 to Aug 20, 2025
- The invoice line item’s tax is 4 USD (inclusively)

Even though the invoice’s total amount is 35 USD, the billed revenue would be 31 USD because the tax is 4 USD, as shown in the following revenue waterfall:

|  |
|  |
| **Booked** | **Recognized** | **As of Sep 2025** |
| **Month**  | **Total**      | **June 2025**      | **July 2025** | **Aug 2025** | **Sep 2025** | **Recognized** | **Remaining** |
| Jul 2025   | 31 USD         |                    | 11 USD        | 20 USD       |              | 31 USD         | 0 USD         |

### The invoice’s due amount isn’t revenue

The amount due for the invoice doesn’t necessarily equal the revenue because an invoice can be paid with the customer balance.

This example is based on the following assumptions:

- The invoice and invoice line item finalize on July 14, 2025.
- The amount of the invoice line item is 31 USD, and its service period is from July 21, 2025 to Aug 20, 2025.
- The invoice is partially paid by customer balance for 10 USD.

Even though the amount due for the invoice is 21 USD, the revenue would still be 31 USD, as shown in the following revenue waterfall:

|  |
|  |
| **Booked** | **Recognized** | **As of Sep 2025** |
| **Month**  | **Total**      | **Jun 2025**       | **Jul 2025** | **Aug 2025** | **Sep 2025** | **Recognized** | **Remaining** |
| Jul 2025   | 31 USD         |                    | 11 USD       | 20 USD       |              | 31 USD         | 0 USD         |

### Invoice item

Invoice items are created automatically during upgrade and downgrade to represent the unused time of the previous plan and the remaining time of the new plan. You can also create invoice items manually.

Booked revenue includes the revenue of an invoice item in the month that the invoice item first appears.

This example is based on the following assumptions:

- The invoice item is created on May 14, 2025.
- The amount of the invoice item is 31 USD, and its service period is from May 14, 2025 to June 13, 2025.

|  |
|  |
| **Booked** | **Recognized** | **As of Sep 2025** |
| **Month**  | **Total**      | **Apr 2025**       | **May 2025** | **Jun 2025** | **Jul 2025** | **Recognized** | **Remaining** |
| May 2025   | 31 USD         |                    | 18 USD       | 13 USD       |              | 31 USD         | 0 USD         |

To continue with this example, say you create an invoice on Jun 19, 2025, roll the above invoice item to the invoice, and create one more line item with the following assumptions:

- The amount of the invoice line item is 62 USD.
- The service period for the invoice line item is from Jun 21, 2025 to Jul 20, 2025.

The invoice contains two invoice line items. One is the invoice item created in May. The other is the invoice line item created on June 19, 2025. The total amount of the invoice is 93 USD.

The revenue waterfall would look like this:

|  |
|  |
| **Booked** | **Recognized** | **As of Sep 2025** |
| **Month**  | **Total**      | **Apr 2025**       | **May 2025** | **Jun 2025** | **Jul 2025** | **Recognized** | **Remaining** |
| May 2025   | 31 USD         |                    | 18 USD       | 13 USD       |              | 31 USD         | 0 USD         |
| Jun 2025   | 62 USD         |                    |              | 22 USD       | 40 USD       | 62 USD         | 0 USD         |

### Usage-based billing

This example uses the following assumptions:

- 1 unit costs 10 USD.
- 3 units are recorded in June 2025.
- 2 units are recorded in July 2025.
- An invoice finalizes on July 15, 2025, to invoice 5 units.

The revenue waterfall would look like this:

|  |
|  |
| **Booked** | **Recognized** | **As of Sep 2025** |
| **Month**  | **Total**      | **Jun 2025**       | **Jul 2025** | **Recognized** | **Remaining** |
| Jun 2025   | 30 USD         | 30 USD             |              | 30 USD         | 0 USD         |
| Jul 2025   | 20 USD         |                    | 20 USD       | 20 USD         | 0 USD         |

## Replication in Sigma 

To replicate the revenue waterfall report in [Sigma](https://docs.stripe.com/data/how-sigma-works.md), use the `revenue_recognition_debits_and_credits` table.

This query generates waterfall numbers for revenue booked from Nov 2022 to Nov 2023, and recognized up to Nov 2024. Feel free to adjust the dates to your desired time frame.

> If you’re using our [chart of accounts](https://docs.stripe.com/revenue-recognition/chart-of-accounts.md) beta feature, be sure to update the `unbilled_ar_accounts` mapping in the query below to reflect the accounts in your general ledger.

```sql
select "billing_period", "currency", "total", "2022-11-01", "2022-12-01", "2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01", "2023-05-01", "2023-06-01", "2023-07-01", "2023-08-01", "2023-09-01", "2023-10-01", "2023-11-01", "2023-12-01", "2024-01-01", "2024-02-01", "2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01", "2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01", "2024-11-01", "deferred", "future_billings"
from (
  with unbilled_ar_accounts as (
    values 'UnbilledAccountsReceivable'
  )

  , formatted_changes as (
    select
      booked_date,
      date_format(accounting_period_date, '%Y-%m-%d') as accounting_period,
      debit,
      credit,
    	debit_account_type,
    	credit_account_type,
      currency,
      if(lower(currency) in ('bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'vnd', 'vuv', 'xaf', 'xof', 'xpf'), cast(amount as decimal(18, 0)), cast(0.01 * amount as decimal(18, 2))) as decimalized_settlement_amount,
      case when debit in (select * from unbilled_ar_accounts) OR credit in (select * from unbilled_ar_accounts) then true else false end AS is_unbilled
    from revenue_recognition_debits_and_credits
  )

  , raw_net_changes as (
    select
      debit as account,
      debit_account_type as account_type,
      decimalized_settlement_amount as raw_net_change,
      *
    from formatted_changes
    union all
    select
      credit as account,
      credit_account_type as account_type,
      -decimalized_settlement_amount as raw_net_change,
      *
    from formatted_changes
  )

  , net_changes as (
    select
      (case when account_type in ('Assets', 'ContraRevenue', 'Expenses', 'Losses')
      	then raw_net_change else -raw_net_change end) as net_change,
      *
    from raw_net_changes
  )

  , waterfall_entries as (
    select
      account,
      currency,
      date_trunc('month', booked_date) as billing_period,
      accounting_period,
      is_unbilled,
      (net_change * (case when account_type = 'Revenue' then 1 else -1 end)) as net_change
    from net_changes
    where account_type in ('Revenue', 'ContraRevenue')
  )

  select
    currency,
    billing_period,
    sum(net_change) as total,
      nullif(sum(case when accounting_period = '2022-11-01' then net_change else 0 end), 0) as "2022-11-01",
      nullif(sum(case when accounting_period = '2022-12-01' then net_change else 0 end), 0) as "2022-12-01",
      nullif(sum(case when accounting_period = '2023-01-01' then net_change else 0 end), 0) as "2023-01-01",
      nullif(sum(case when accounting_period = '2023-02-01' then net_change else 0 end), 0) as "2023-02-01",
      nullif(sum(case when accounting_period = '2023-03-01' then net_change else 0 end), 0) as "2023-03-01",
      nullif(sum(case when accounting_period = '2023-04-01' then net_change else 0 end), 0) as "2023-04-01",
      nullif(sum(case when accounting_period = '2023-05-01' then net_change else 0 end), 0) as "2023-05-01",
      nullif(sum(case when accounting_period = '2023-06-01' then net_change else 0 end), 0) as "2023-06-01",
      nullif(sum(case when accounting_period = '2023-07-01' then net_change else 0 end), 0) as "2023-07-01",
      nullif(sum(case when accounting_period = '2023-08-01' then net_change else 0 end), 0) as "2023-08-01",
      nullif(sum(case when accounting_period = '2023-09-01' then net_change else 0 end), 0) as "2023-09-01",
      nullif(sum(case when accounting_period = '2023-10-01' then net_change else 0 end), 0) as "2023-10-01",
      nullif(sum(case when accounting_period = '2023-11-01' then net_change else 0 end), 0) as "2023-11-01",
      nullif(sum(case when accounting_period = '2023-12-01' then net_change else 0 end), 0) as "2023-12-01",
      nullif(sum(case when accounting_period = '2024-01-01' then net_change else 0 end), 0) as "2024-01-01",
      nullif(sum(case when accounting_period = '2024-02-01' then net_change else 0 end), 0) as "2024-02-01",
      nullif(sum(case when accounting_period = '2024-03-01' then net_change else 0 end), 0) as "2024-03-01",
      nullif(sum(case when accounting_period = '2024-04-01' then net_change else 0 end), 0) as "2024-04-01",
      nullif(sum(case when accounting_period = '2024-05-01' then net_change else 0 end), 0) as "2024-05-01",
      nullif(sum(case when accounting_period = '2024-06-01' then net_change else 0 end), 0) as "2024-06-01",
      nullif(sum(case when accounting_period = '2024-07-01' then net_change else 0 end), 0) as "2024-07-01",
      nullif(sum(case when accounting_period = '2024-08-01' then net_change else 0 end), 0) as "2024-08-01",
      nullif(sum(case when accounting_period = '2024-09-01' then net_change else 0 end), 0) as "2024-09-01",
      nullif(sum(case when accounting_period = '2024-10-01' then net_change else 0 end), 0) as "2024-10-01",
      nullif(sum(case when accounting_period = '2024-11-01' then net_change else 0 end), 0) as "2024-11-01",
    sum(case when accounting_period >= '2024-12-01' and is_unbilled = false then net_change else 0 end) as deferred,
    sum(case when accounting_period >= '2024-12-01' and is_unbilled = true then net_change else 0 end) as future_billings

  from waterfall_entries
  where
    net_change != 0
    and billing_period >= timestamp '2022-11-01 00:00:00'
    and billing_period < timestamp '2023-12-01 00:00:00'
  group by currency, billing_period
  order by currency asc, billing_period asc
)
```
