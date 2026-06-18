# Capital metrics

Access financing offer data in the Stripe Dashboard.

> Capital for platforms is available in [public preview](https://docs.stripe.com/release-phases.md).

The Capital page in the [Stripe Dashboard](https://dashboard.stripe.com/connect/capital) can help you understand the performance of your Capital program. The page displays metrics for originations, conversion, and the level of engagement with financing offers that were delivered to your connected accounts.

It also provides detailed insights into the status and specifics of these offers. Capital metrics refresh nightly. You can see different insights on the [Overview](https://docs.stripe.com/capital/reporting.md#overview-tab) tab and the [Financing offers](https://docs.stripe.com/capital/reporting.md#financing-offers-tab) tab.

## Overview tab

In the **Overview** tab, you can view information about your offer funnel and insights about your Capital program.

### Offer funnel

- **Active offers** and **In-progress financing** show the current state of your Capital program.
- **Fully repaid financing** shows the lifetime metric from the start of your Capital program.

### Insights

These are the following charts in the **Overview** tab:

| Chart                            | Description                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Origination volume               | A monthly chart with the amount of financing at origination.                                                 |
| Platform earnings                | Monthly total revenue shared paid out to the platform based on the amount of funds disbursed at origination. |
| 30-day conversion rate           | A daily chart with 30-day conversion.                                                                        |
| Average accepted financing offer | The average principal amount for connected accounts within the given time period.                            |

### Eligibility

Use the following charts to learn about eligibility:

| Chart                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Estimated financing offer amount      | This is the estimated financing offer amount for all your connected accounts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Estimated eligible connected accounts | This is the stimated total number of connected accounts eligible for Capital.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Review accounts                       | Download a list of all the connected account IDs that are currently eligible for a capital financing offer, as well as a list of all the email addresses on file for your connected accounts to verify the recipients of Capital financing offers. Review your email recipients regularly to make sure the recipient of monthly offer emails is a decision maker who can agree to Capital financing for each connected account. When there is no owner specified for a connected account, Stripe sends Capital offer emails to the connected account support alias, which might not be a recipient who can make decisions. |

## Financing offers tab

In the **Financing offers** tab, you can view topline metrics for:

- Pending offers
- Active offers
- In-progress financings
- Fully paid financings.

Pending offers refer to connected accounts that qualify for potential offers, but the offers haven’t yet been created. An offer might not be created if the connected account is deny-listed, unsubscribed from offers, or if they don’t have a valid email address.

| Column                | Description                                                                                                                                                                                                                                                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connected account ID  | The ID of the connected account.                                                                                                                                                                                                                                                                                                                    |
| Account name          | The name of the connected account.                                                                                                                                                                                                                                                                                                                  |
| Financing type        | The financing product offered to the connected account. Can be one of *flex loan*, *fixed term*, or *cash advance*.                                                                                                                                                                                                                                 |
| Product type          | Indicates whether the offer is a standalone financing offer (standard), or if the offer is a refill. Refills are additional financing offers sent to customers who have made substantial repayment progress towards their in-progress loans, usually around 75%. If approved, refill offers pay down the remaining balance on the in-progress loan. |
| Status                | The status of the offer. See [Financing status](https://docs.stripe.com/capital/reporting.md#financing-status) for details.                                                                                                                                                                                                                         |
| First time offer      | Indicates whether this is the first eligible financing offer for a connected account, or if they’ve previously been eligible for and received an offer. Offer terms can vary with time, and can change financing type.                                                                                                                              |
| Created               | The date the offer was created.                                                                                                                                                                                                                                                                                                                     |
| Expires               | The date this financing offer expires, typically 30 days after creation.                                                                                                                                                                                                                                                                            |
| The overflow menu (⋯) | If you have a Stripe-hosted Capital page, your operational support team can use the overflow menu (⋯) on the far right to manually share a link with a connected account that will take them to the Stripe hosted Capital dashboard to review and apply for an offer.                                                                               |

Click a financing offer from the table to see the following information:

- Offered and accepted financing details including amount, fee, and withholding rate
- Offer creation date
- Remaining balance
- If the email offer has been delivered, whether the connected account has clicked the link to view the offer
- Whether the connected account has applied for financing
- Paydown history from incoming payments for the connected account

To improve navigation, use the connected account’s account ID and financing offer ID to filter or search.

### Financing status

The status of the offer is either:

|  |
|  |
| Undelivered     | The financing offer has been created but hasn’t been delivered to the connected account.                                                            |
| Delivered       | The financing offer has been delivered to the connected account, either by you or by Stripe.                                                        |
| Accepted        | An application for the offer has been submitted and is pending review by Stripe Servicing.                                                          |
| Paid out        | The application has passed review and the accepted financing has been disbursed.                                                                    |
| Rejected        | The application didn’t pass review and has been rejected by Stripe Servicing.                                                                       |
| Canceled        | The application has been canceled.                                                                                                                  |
| Fully paid down | The financing has been fully paid.                                                                                                                  |
| Expired         | The 30-day period has passed for the connected account to apply for and accept the offer. When the offer is expired, it’s inaccessible to the user. |

## Download data

From the financing offer table, you can export the table’s data as a CSV file:

1. From the **Overview** tab or the **Financing offers** tab, click **Export**.
2. Select the time zone, date range, and columns you want to export. These filters apply to the data export.

## Capital Data in Sigma

[Sigma](https://docs.stripe.com/data/how-sigma-works.md) provides all your Capital transactional data in an interactive SQL environment. To access it:

1. [Enable Sigma](https://dashboard.stripe.com/sigma/activate) in the Dashboard.
2. Select **Analyze** to explore your data with Sigma.

Sigma provides Capital data in three tables:

|  |
|  |
| [financing_offers](https://dashboard.stripe.com/stripe-schema?tableName=financing_offers)                                                 | This table contains all information about the financing offers we’ve created for merchants on your platform, such as an offered principal or premium, and the terms for offers that have been accepted.                                                                                    |
| [financing_balances](https://dashboard.stripe.com/stripe-schema?tableName=financing_balances)                                             | This table contains daily balance snapshots for each paid out financing for connected accounts on your platform. Starting from payout to being fully paid, each financing has a daily balance snapshot in the table. You can see these broken down by the remaining principal and premium. |
| [connected_account_financing_transactions](https://dashboard.stripe.com/stripe-schema?tableName=connected_account_financing_transactions) | This table contains all financing transactions, such as payouts, paydowns, and reversals, for all Capital financing for connected accounts on your platform. This information mirrors what’s available in the Financing Transactions API.                                                  |

For detailed documentation on how to use Sigma for Capital data, refer to [Financing offers](https://dashboard.stripe.com/stripe-schema?tableName=financing_offers) in the Stripe Data Schema.

## Platform earnings

Platform earnings are calculated per financing and paid out on a monthly cadence at the start of the month.

### Previous behavior

Previously, platform earnings from Capital were categorized as Stripe fees. To improve reconciliation and distinguish fee types, we have updated the labeling for all platform earnings with a new type of `revenue_share`.

Platform earnings before February 25, 2026 remain unchanged. They continue to use the old labels:

- `type = stripe_fee`
- `reporting_category = fee`

Platform earnings starting February 25, 2026 use the following labels:

- `type = revenue_share`
- `reporting_category = revenue_share`

### Check your platform earnings

You can monitor your platform earnings in the Dashboard:

- To see line items related to revenue share:
  - Go to the [Balances](https://dashboard.stripe.com/balance/all-activity) > **All activity** section.
  - Select **Type: Revenue share** from the filter. You should see line items that match **Capital Revshare**.
- To see transactions related to revenue share:
  - Go to the [Balance Report](https://dashboard.stripe.com/reports/balance) >  **Balance change from activity** section.
  - Download the **Revenue share** file.

## See also

- [Set up Capital](https://docs.stripe.com/capital/getting-started.md)
