# Revenue Recognition reports in Sigma and SDP

Run prebuilt Revenue Recognition reports or build custom queries in Sigma.

Revenue Recognition provides prebuilt report templates in [Sigma](https://docs.stripe.com/data/how-sigma-works.md) that you can run directly or use as a starting point for custom queries. These templates are available for both Sigma and Sigma for Organizations.

## Run a prebuilt template report 

To run a prebuilt Revenue Recognition report, navigate to [Sigma](https://dashboard.stripe.com/sigma/queries) in the Stripe Dashboard and search for the template by name. The following report templates are available:

- **Period summary**: Revenue, deferred revenue, and future scheduled billings activity for a given month.
- **Income statement**: Detailed revenue and contra revenue breakdown grouped by account.
- **Trial balance**: Starting balance, net change, and ending balance for all accounts.
- **Balance sheet**: Assets, liabilities, and equity balances for a given period.
- **Revenue waterfall**: How revenue from each billing period is recognized across accounting periods.
- **Debits and credits**: Detailed double-entry journal of all revenue recognition transactions.
- **AR aging report**: Outstanding accounts receivable amounts by age buckets.

Each of these reports has additional variants grouped by customer, product, price, invoice, or line item.

All templates default to the last completed month. To change the time frame, modify the `accounting_period_date` filter in the query’s `WHERE` clause. For example, the default filter looks like this:

```sql
where
  accounting_period_date >= date_trunc('month', current_date - interval '1' month)
  and accounting_period_date < date_trunc('month', current_date)
```

To query a specific month, such as January 2025, replace it with:

```sql
where
  accounting_period_date >= date '2025-01-01'
  and accounting_period_date < date '2025-02-01'
```

To query a full quarter, such as Q1 2025:

```sql
where
  accounting_period_date >= date '2025-01-01'
  and accounting_period_date < date '2025-04-01'
```

## Build a custom query 

You can build custom reports using the `revenue_recognition_debits_and_credits`, `revenue_recognition_month_summary`, and other tables in Sigma.

### Recognized revenue from unpaid invoices 

This query generates a report for revenue recognized from unpaid open invoices, grouped by invoice ID. You can adjust the time frame and grouping parameters.

> If you’re using our [chart of accounts](https://docs.stripe.com/revenue-recognition/chart-of-accounts.md) beta feature, be sure to update the `debit` and `credit` mappings in the query below to reflect the accounts in your general ledger.

```sql
with revrec as (
  select
    *
  from
    revenue_recognition_debits_and_credits
  where
    debit = 'DeferredRevenue' and credit = 'Revenue'
), sigmainv as (
  select
    *
  from
    invoices
  where
    status = 'open'
)
select
  revrec.invoice_id,
  SUM(revrec.presentment_amount) AS recognized_revenue
from
  sigmainv
  left join revrec on revrec.invoice_id = sigmainv.id
group by revrec.invoice_id
```
