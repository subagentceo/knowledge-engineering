# Migrate subscriptions to Stripe Billing using toolkit

Learn how to migrate your existing subscriptions to Stripe using the toolkit.

Use the [Billing migration toolkit](https://dashboard.stripe.com/billing/migrations) in the Stripe Dashboard to migrate your existing subscriptions from a third-party system, a home-grown system, or an existing Stripe account to Stripe Billing.

## Before you begin

1. If you haven’t already, review the [migration stages](https://docs.stripe.com/billing/subscriptions/migrate-subscriptions.md#migration-stages).
2. [Set up a Stripe Billing integration](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md) before you begin migration. This is a one-time setup that you don’t need to repeat for future migrations.
3. [Request a payments data import](https://docs.stripe.com/get-started/data-migrations/pan-import.md) from your current processor. This step is only required if you’re migrating to Stripe from another processor. If you’re migrating from Stripe to Stripe, you can skip this prerequisite.
4. If you’re migrating from a third-party or home-grown system:
   - Create new subscriptions in Stripe first.
   - After creating new subscriptions, cancel old subscriptions before they charge so you don’t double-bill.
   - If a subscription’s billing date is close to migration, schedule the new Stripe subscription to start after the last charge from the old subscription to make sure the migration has time to complete. Then cancel the old subscription.

## Open the Billing migration toolkit

Create a *sandbox* (A sandbox is an isolated test environment that allows you to test Stripe functionality in your account without affecting your live integration. Use sandboxes to safely experiment with new features and changes) in the Dashboard if you want to run a test migration first.

1. Go to [Dashboard](https://dashboard.stripe.com/billing) > [Subscriptions](https://dashboard.stripe.com/test/subscriptions) > [**Migrations**](https://dashboard.stripe.com/test/billing/migrations).

   Alternatively, you can click the overflow menu (⋯) next to **+ Create subscription**, and select [Migrate subscriptions](https://dashboard.stripe.com/settings/billing/migrations).

2. To start your migration, click **Let’s get started**.

## Download a CSV file

First, export your existing subscriptions by matching the exported data to a migration-compatible CSV file. You can create your own CSV file, or download any of the following CSV templates provided by Stripe ([Basic](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#basic), [Multi-price items](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#multi-price), and [Ad-hoc pricing](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#ad-hoc)). You can also find examples of CSV files for common migration [use cases](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#migration-use-cases).

1. Click **Download CSV template**.

2. Choose a CSV template (basic, multi-price items, or ad-hoc pricing) based on your billing use case.

   ### Basic CSV 

   This example shows a migration for common subscription use cases like quantity, taxes, billing anchor, discounts, trials, and backdating.

   ### Specify the following fields for a Basic CSV file:

| Attribute                   | Type                           | Example                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------- | ------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customer` **(required)**   | Stripe Customer ID             | `cus_xxx1`                               | The identifier of the customer to create the subscription for.                                                                                                                                                                                                                                                                                                                                                |
| `start_date` **(required)** | Timestamp in epoch UNIX format | `1658179441`                             | Determines when to create the subscription. You must provide a value that’s 24 hours (or greater) into the future. In a sandbox, you can set this to 1 hour in the future.                                                                                                                                                                                                                                    |
| `price` **(required)**      | Stripe Price ID                | `price_1LDGNmDK0D4Fox2RxIaXQkBp`         | You must use a recurring price. If migrating multiple items, use the `items.x.{price, quantity}` format instead. Ad-hoc prices are also supported with `adhoc_items.x.{amount, product, interval,currency}`.                                                                                                                                                                                                  |
| `quantity`                  | Number                         | `1`                                      | Determines quantity of a subscription. By default, each subscription is for one product, but Stripe allows you to subscribe a customer to multiple quantities of an item.                                                                                                                                                                                                                                     |
| `metadata.*`                | String                         | `subscription_1`                         | Attach these key-value pairs that you can attach to an object. This is useful for storing additional information about the object in a structured format. You can add any metadata fields you desire (for example, `metadata_third_party_sub_id`). If this is a Stripe-to-Stripe migration, enter `internal:Stripe`.                                                                                          |
| `automatic_tax`             | Boolean                        | `false`                                  | Specify `true` to use automatic tax settings by Stripe Tax.                                                                                                                                                                                                                                                                                                                                                   |
| `billing_cycle_anchor`      | Timestamp in epoch UNIX format | `1658179441`                             | Determines the next date to bill the subscription to the customer.                                                                                                                                                                                                                                                                                                                                            |
| `coupon`                    | Stripe Coupon ID               | `Z4OV52SU`                               | The identifier of the coupon to apply to this subscription.                                                                                                                                                                                                                                                                                                                                                   |
| `trial_end`                 | Timestamp in epoch UNIX format | `1658179441`                             | Sets the phase to trialing from the start date to the `trial_end` date. You must specify a value that’s before the cycle end date, and you can’t combine it with the trial.                                                                                                                                                                                                                                   |
| `proration_behavior`        | Enum                           | `create_prorations` or `none`            | Determines if the subscription creates prorations after migration. The default value is `create_prorations`.                                                                                                                                                                                                                                                                                                  |
| `collection_method`         | Enum                           | `charge_automatically` or `send_invoice` | When charging automatically, Stripe attempts to pay the underlying subscription at the end of each billing period using the default source attached to the customer. When sending an invoice, Stripe emails your customer an invoice with payment instructions and mark the subscription as active. On creation, this defaults to `charge_automatically`. If `send_invoice`, you must set `days_until_due`.   |
| `default_tax_rate`          | Stripe Tax ID                  | `txr_1LPcLzAWeZvbCyjpzDA4qs1l`           | Sets the subscription’s `default_tax_rates`. This also determines the invoice’s `default_tax_rates` for any invoices issued by the subscription during this phase. This value is incompatible with `automatic_tax`.                                                                                                                                                                                           |
| `backdate_start_date`       | Timestamp                      | `1658179441`                             | Determines the `start_date` of the created subscription, which must occur in the past. If set, you must specify `none` for the `proration_behavior`. Doing so prevents the creation of a prorated invoice for the time between `backdate_start_date` and actual `start_date`. For more details, see [backdating no charge](https://docs.stripe.com/billing/subscriptions/backdating.md#backdating-no-charge). |
| `days_until_due`            | Integer                        | `30`                                     | The number of days from when the invoice is created until it’s due. This value is required and valid only for invoices with `collection_method` set to `send_invoice`.                                                                                                                                                                                                                                        |
| `cancel_at_period_end`      | Boolean                        | `false`                                  | Specify `true` if you want to cancel a subscription at the end of the period.                                                                                                                                                                                                                                                                                                                                 |

   ### Multi-price items CSV 

   This example shows a migration that has multiple products per subscription.

   ### Specify the following fields for a Multi-price items CSV file:

| Attribute                       | Type                           | Example                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------- | ------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customer` **(required)**       | Stripe Customer ID             | `cus_xxx1`                               | The identifier of the customer to create the subscription for.                                                                                                                                                                                                                                                                                                                                                |
| `start_date` **(required)**     | Timestamp in epoch UNIX format | `1658179441`                             | Determines when to create the subscription. You must provide a value that’s 24 hours (or greater) into the future. In a sandbox, you can set this to 1 hour in the future.                                                                                                                                                                                                                                    |
| `items.0.price` **(required)**  | Stripe Price ID                | `price_1LDGNmDK0D4Fox2RxIaXQkBp`         | The identifier of the price object, which must be a recurring price.                                                                                                                                                                                                                                                                                                                                          |
| `items.0.quantity`              | Number                         | `1`                                      | Determines quantity of a subscription. By default, each subscription is for one product, but Stripe allows you to subscribe a customer to multiple quantities of an item.                                                                                                                                                                                                                                     |
| `items.1.price`  **(required)** | Stripe Price ID                | `price_1LujbnDCA5oQnOCew7kwa4T5`         | The identifier of the price object, which must be a recurring price.                                                                                                                                                                                                                                                                                                                                          |
| `items.1.quantity`              | Number                         | `1`                                      | Determines quantity of a subscription. By default, each subscription is for one product, but Stripe allows you to subscribe a customer to multiple quantities of an item.                                                                                                                                                                                                                                     |
| `metadata_third_party_sub_id`   | String                         | `subscription_1`                         | Attach these key-value pairs to an object. This is useful for storing additional information about the object in a structured format.                                                                                                                                                                                                                                                                         |
| `automatic_tax`                 | Boolean                        | `false`                                  | Specify `true` to use automatic tax settings by Stripe Tax.                                                                                                                                                                                                                                                                                                                                                   |
| `billing_cycle_anchor`          | Timestamp in epoch UNIX format | `1658179441`                             | Determines the next date to bill the subscription to the customer.                                                                                                                                                                                                                                                                                                                                            |
| `coupon`                        | Stripe Coupon ID               | `Z4OV52SU`                               | The identifier of the coupon to apply to this subscription.                                                                                                                                                                                                                                                                                                                                                   |
| `proration_behavior`            | Enum                           | `create_prorations`                      | Determines if the subscription creates prorations after migration. The default value is `create_prorations`.                                                                                                                                                                                                                                                                                                  |
| `collection_method`             | Enum                           | `charge_automatically` or `send_invoice` | When charging automatically, Stripe attempts to pay the underlying subscription at the end of each billing period using the default source attached to the customer. The default value is `charge_automatically`. When sending an invoice, Stripe emails your customer an invoice with payment instructions, and marks the subscription as active. If using `send_invoice`, you must set `days_until_due`.    |
| `default_tax_rate`              | Stripe Tax ID                  | `txr_1LPcLzAWeZvbCyjpzDA4qs1l`           | Sets the subscription’s `default_tax_rates`. This also determines the invoice’s `default_tax_rates` for any invoices issued by the subscription during this phase. This value is incompatible with `automatic_tax`.                                                                                                                                                                                           |
| `backdate_start_date`           | Timestamp                      | `1705753518`                             | Determines the `start_date` of the created subscription, which must occur in the past. If set, you must specify `none` for the `proration_behavior`. Doing so prevents the creation of a prorated invoice for the time between `backdate_start_date` and actual `start_date`. For more details, see [backdating no charge](https://docs.stripe.com/billing/subscriptions/backdating.md#backdating-no-charge). |
| `days_until_due`                | Integer                        | `30`                                     | The number of days from when the invoice is created until it’s due. This is required and valid only for invoices with `collection_method` set to `send_invoice`.                                                                                                                                                                                                                                              |
| `cancel_at_period_end`          | Boolean                        | `false`                                  | Specify `true` if you want to cancel a subscription at the end of the period.                                                                                                                                                                                                                                                                                                                                 |
| `add_invoice_items.0.amount`    | Number                         | `19.99`                                  | A positive number. Use full units with decimals (such as 21.50).                                                                                                                                                                                                                                                                                                                                              |
| `add_invoice_items.0.product`   | Stripe Product ID              | `prod_PjfC3kWS58IoOX`                    | The identifier of the product to add the invoice to.                                                                                                                                                                                                                                                                                                                                                          |
| `add_invoice_items.0.currency`  | String                         | `usd`                                    | A three-letter ISO currency code, in lowercase, for a [supported currency](https://docs.stripe.com/currencies.md).                                                                                                                                                                                                                                                                                            |

   ### Ad-hoc prices CSV 

   This example shows handling a subscription migration using [ad-hoc pricing](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-items-price_data) for existing products.

   ### Specify the following fields for an Ad-hoc pricing CSV file:

| Attribute                               | Type                           | Example                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------- | ------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customer` **(required)**               | Stripe Customer ID             | `cus_xxx1`                              | The identifier of the customer to create the subscription for.                                                                                                                                                                                                                                                                                                                                                |
| `start_date` **(required)**             | Timestamp in epoch UNIX format | `1710937191`                            | Determines when to create the subscription. You must provide a value that’s 24 hours (or greater) into the future. In a sandbox, you can set this to 1 hour in the future.                                                                                                                                                                                                                                    |
| `adhoc_items.0.amount` **(required)**   | Number                         | `19.99`                                 | A positive number. Use full units with decimals (such as 21.50).                                                                                                                                                                                                                                                                                                                                              |
| `adhoc_items.0.product` **(required)**  | Stripe Product ID              | `prod_NwSGSFZb7ENuTW`                   | The identifier of the product that belongs with the ad-hoc price.                                                                                                                                                                                                                                                                                                                                             |
| `adhoc_items.0.interval` **(required)** | day, week, month or year       | `month`                                 | The billing frequency.                                                                                                                                                                                                                                                                                                                                                                                        |
| `adhoc_items.0.currency` **(required)** | String                         | `usd`                                   | A three-letter ISO currency code, in lowercase, for a [supported currency](https://docs.stripe.com/currencies.md).                                                                                                                                                                                                                                                                                            |
| `adhoc_items.0.quantity`                | Number                         | `1`                                     | Determines quantity of a subscription. By default, each subscription is for one product, but Stripe allows you to subscribe a customer to multiple quantities of an item.                                                                                                                                                                                                                                     |
| `adhoc_items.1.amount`                  | Number                         | `19.99`                                 | A positive number. Use full units with decimals (such as 21.50).                                                                                                                                                                                                                                                                                                                                              |
| `adhoc_items.1.interval`                | day, week, month or year       | `month`                                 | The billing frequency.                                                                                                                                                                                                                                                                                                                                                                                        |
| `adhoc_items.1.currency`                | String                         | `usd`                                   | A three-letter ISO currency code, in lowercase, for a [supported currency](https://docs.stripe.com/currencies.md).                                                                                                                                                                                                                                                                                            |
| `adhoc_items.1.quantity`                | Number                         | `1`                                     | Determines quantity of a subscription. By default, each subscription is for one product, but Stripe allows you to subscribe a customer to multiple quantities of an item.                                                                                                                                                                                                                                     |
| `metadata.source`                       | Number                         | `external:zuora`                        | Attach these key-value pairs to an object. This is useful for storing additional information about the object in a structured format. You can add any metadata fields desired, for example `metadata_third_party_sub_id`. If this is a Stripe-to-Stripe migration, enter `internal:Stripe`.                                                                                                                   |
| `metadata_third_party_sub_id`           | String                         | `subscription_1`                        | Attach these key-value pairs to an object. This is useful for storing additional information about the object in a structured format.                                                                                                                                                                                                                                                                         |
| `automatic_tax`                         | Boolean                        | `false`                                 | Specify `true` to use automatic tax settings by Stripe Tax.                                                                                                                                                                                                                                                                                                                                                   |
| `billing_cycle_anchor`                  | Timestamp in epoch UNIX format | `1713615591`                            | Determines the next date to bill the subscription to the customer.                                                                                                                                                                                                                                                                                                                                            |
| `coupon`                                | Stripe Coupon ID               | `black_friday`                          | The identifier of the coupon to apply to this subscription.                                                                                                                                                                                                                                                                                                                                                   |
| `proration_behavior`                    | Enum                           | `create_prorations`                     | Determines if the subscription creates prorations after migration. The default value is `create_prorations`.                                                                                                                                                                                                                                                                                                  |
| `collection_method`                     | Enum                           | `charge_automatically`or `send_invoice` | When charging automatically, Stripe attempts to pay the underlying subscription at the end of each billing period using the default source attached to the customer. The default value is `charge_automatically`. When sending an invoice, Stripe emails your customer an invoice with payment instructions, and marks the subscription as active. If using `send_invoice`, you must set `days_until_due`.    |
| `default_tax_rate`                      | Stripe Tax ID                  | `txr_1LPcLzAWeZvbCyjpzDA4qs1l`          | Sets the subscription’s `default_tax_rates`. This also determines the invoice’s `default_tax_rates` for any invoices issued by the subscription during this Phase. This value is incompatible with `automatic_tax`.                                                                                                                                                                                           |
| `backdate_start_date`                   | Timestamp in epoch UNIX format | `1705753518`                            | Determines the `start_date` of the created subscription, which must occur in the past. If set, you must specify `none` for the `proration_behavior`. Doing so prevents the creation of a prorated invoice for the time between `backdate_start_date` and actual `start_date`. For more details, see [backdating no charge](https://docs.stripe.com/billing/subscriptions/backdating.md#backdating-no-charge). |
| `days_until_due`                        | Integer                        | `30`                                    | The number of days from when the invoice is created until it’s due. This is required and valid only for invoices with `collection_method` set to `send_invoice`.                                                                                                                                                                                                                                              |
| `cancel_at_period_end`                  | Boolean                        | `false`                                 | Specify `true` if you want to cancel a subscription at the end of the period.                                                                                                                                                                                                                                                                                                                                 |
| `add_invoice_items.0.amount`            | Number                         | `19.99`                                 | A positive number. Use full units with decimals (such as 21.50).                                                                                                                                                                                                                                                                                                                                              |
| `add_invoice_items.0.product`           | Stripe Product ID              | `prod_PjfC3kWS58IoOX`                   | The identifier of the product to add the invoice to.                                                                                                                                                                                                                                                                                                                                                          |
| `add_invoice_items.0.currency`          | String                         | `usd`                                   | A three-letter ISO currency code, in lowercase, for a [supported currency](https://docs.stripe.com/currencies.md).                                                                                                                                                                                                                                                                                            |

3. In the CSV file, specify the details of the subscriptions you want to export.

   > #### For Stripe-to-Stripe migrations
   > 
   > If you’re migrating subscriptions within Stripe accounts, refer to the [CSV example](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#within-Stripe-accounts) before you specify and upload a CSV file.

## Upload a CSV file

Click **Upload CSV**. The CSV file size limit is 120 MB.

Stripe validates the file to verify that the uploaded subscriptions are in the required CSV format. This process might take up to a few hours, depending on the size of the file. If the file is valid, you can proceed to the next step in the migration. If there are any validation errors, you must [resolve the errors](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#resolve-validation-errors) to proceed.

## Review uploaded subscriptions

After Stripe validates your CSV file, review the summary of your uploaded subscriptions for any discrepancies:

1. Cross-check the summary for the correct:

   - Date of upload
   - Uploaded file name
   - Number of subscriptions
   - Number of customers
   - First subscription go-live date

2. If everything is valid, click **Start migration**.

   If you see errors, click **Cancel migration** and restart the migration from [Download a CSV file](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#download-csv).

## Track migration progress

After you review your uploaded subscriptions, track the progress of your migration:

| Migration progress         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Migration in progress      | Your subscriptions are queued to schedule on the specified start date. This process can take a few minutes to a few hours, depending on the size of the file. For example, the validation and migration for 100,000 subscriptions takes approximately 30 minutes to complete.

  The Billing migration toolkit uses the [Subscription schedule](https://docs.stripe.com/api/subscription_schedules.md) to migrate your subscriptions. This allows your subscriptions to remain in a scheduled state for 24 hours before going live. In a sandbox, the buffer time is reduced to 1 hour for faster evaluation and testing.                                                                                                                                                                                                                                                                                                                                       |
| Scheduled subscriptions    | After migration, your subscriptions remain in a scheduled state for 24 hours before going live. You have 10 hours to [cancel these scheduled subscriptions](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#cancel-migration) using the toolkit.

  You can’t update scheduled subscriptions using the migration toolkit. If you want to update your scheduled subscriptions, you can either call the [update](https://docs.stripe.com/api/subscription_schedules/update.md) endpoint, or update each subscription individually in the [Subscriptions](https://dashboard.stripe.com/subscriptions) page of the Dashboard.

  Customers can’t cancel scheduled subscriptions from their customer portal. They can only cancel live subscriptions.                                                                                                                                                                                  |
| Go live with subscriptions | After 24 hours, your scheduled subscriptions go live and charge customers on their applicable start dates. You can view all your live subscriptions in the [Subscriptions](https://dashboard.stripe.com/subscriptions) page of the Dashboard.

  After the migration goes live, we recommend you monitor your subscriptions starting from the first payment. Make sure the charge dates and amounts for the migrated subscriptions match the specified [start_date](https://docs.stripe.com/api/subscription_schedules/create.md#create_subscription_schedule-start_date).

  Customers can cancel live subscriptions from their customer portal.                                                                                                                                                                                                                                                                                                               |
| Monitor subscriptions      | After the migration goes live, monitor your subscriptions for problems related to payment methods. For example, check transactions for unrecoverable issuer [decline codes](https://docs.stripe.com/declines/codes.md) such as `incorrect_number` and [take action](https://docs.stripe.com/get-started/data-migrations/pan-import.md#remap-customer-ids) to make sure invoices get paid. Consider notifying customers that have invalid payment methods through channels other than email, such as text messages or in-app notifications.

  When using automatic collection, check [open or past due invoices](https://docs.stripe.com/billing/collection-method.md#failed-incomplete-subscriptions) to make sure customers aren’t missing [default payment methods](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-payment_settings-save_default_payment_method), which might cause the invoice to be unable to attempt collection. |

## View all migrations

To view all of your migrations:

1. Select the migration you want to review in [**Migrations**](https://dashboard.stripe.com/billing/migrations).

2. To open a migration, click **View** in the dropdown menu.

   You can track the following fields:

   - Upload date
   - File name
   - Stripe billing migration id
   - Number of subscriptions
   - Migration status

## Optional: Cancel a migration

If you identify any problems with the scheduled subscriptions, you can roll back the migration and revert the scheduled subscriptions. The Dashboard displays a timestamp to indicate if you can still cancel the migration using the toolkit. You have 10 hours from when you scheduled the subscriptions to cancel them. After 10 hours, the cancel option is disabled in the toolkit. To cancel the migration after 10 hours, you can either call the [cancel](https://docs.stripe.com/api/subscription_schedules/cancel.md) endpoint, or individually cancel each subscription in the [Subscriptions](https://dashboard.stripe.com/subscriptions) page of the Dashboard.

1. Find the migration you want to cancel in your [Migrations](https://dashboard.stripe.com/billing/migrations).
2. Click **Cancel migration** in the dropdown menu.

## Optional: Run multiple migrations

You can run as many simultaneous subscription migrations as you want. For large migrations, divide the subscriptions into batches and start with a small batch. This can help you quickly identify any validation issues and save validation time.

To start a new migration:

1. Click **Start new migration**.
2. Restart the migration process from [Download a CSV file](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#download-csv).

You can also find examples of CSV files for common migration [use cases](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#migration-use-cases).

## Optional: Resolve validation errors

If you have any errors in your uploaded file, the toolkit displays a failure summary. To resolve the errors:

1. Click **Download file to review errors**.

2. Review the `processing_error` column to see the errors.

3. Correct all the errors. Common errors include:

| Error                        | Troubleshooting                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| Invalid dates                | Make sure all the dates are in epoch or Unix timestamp format.                                      |
| Incorrect `start_date` range | Make sure the `start_date` for each subscription is at least 24 hours in the future.                |
| Missing data                 | Make sure every record contains the required fields.                                                |
| Incompatible price and tax   | Make sure prices for specified tax rates have the same `tax_behavior` (inclusive versus exclusive). |

4. Click **Upload revised file** to re-upload the corrected CSV (the CSV file size limit is 120 mb).

5. Wait for re-validation to see the latest validation status.

## Migration use cases

You can apply the migration use cases in this section to your own migration, if applicable. Timestamps in these examples are in Unix EPOCH format. The examples also include test customer and price IDs that you can use in a sandbox.

You can combine any Stripe-provided CSV template ([Basic](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#basic), [Multi-price items](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#multi-price), [Ad-hoc pricing](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#ad-hoc)) with any of these examples as needed.

### Migrate subscriptions with various pricing models

You can migrate subscriptions with flat-rate pricing, such as a basic plan at 100 USD per month or an advanced plan at 200 USD per month. These subscriptions can have one or more line items.

**Example 1 (Basic)**: Migrate a basic 100 USD monthly subscription with a quantity of 2, starting on January 1. The subscription is charged automatically using the default payment method.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       | 2        | subscription_1              |               |                      |        |           | none               | charge_automatically |                  |                     |                |                      |                            |                             |                              |

**Example 2 (Multi-price items)**: Migrate the following subscriptions starting on January 1, to be charged automatically using the default payment method:

- A basic 100 USD monthly subscription with a quantity of 2
- An advanced 200 USD monthly subscription with a quantity of 1

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | items.0.price (required) | items.0.quantity | items.1.price | items.1.quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1               | 1                | price_xxx2    | subscription_1   |                             |               |                      |        |           | none               | charge_automatically |                  |                     |                |                      |                            |                             |                              |  |

**Example 3 (Basic)**: Migrate the following subscription starting on January 1, to be charged automatically using the default payment method:

- A basic 100 USD monthly subscription with a quantity of 2
- An ad-hoc invoice add-on fee of 20 USD

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       | 2        | subscription_1              |               |                      |        |           | none               | charge_automatically |                  |                     |                |                      | 50                         | prod_xxx1                   | usd                          |

You can also migrate subscriptions with ad-hoc pricing, in cases where you don’t have fixed pricing amounts.

**Example 4 (Ad-hoc pricing)**: Migrate the following subscription starting on January 1, to be charged automatically using the default payment method:

- A 153 USD ad-hoc monthly subscription with a quantity of 1

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | adhoc_items.0.amount (required) | adhoc_items.0.product | adhoc_items.0.interval | adhoc_items.0.currency | adhoc_items.0.quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior   | collection_method | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1                      | prod_xxx1             | 1                      | subscription_1         |                        |                             |               |                      |        | none      | charge_automatically |                   |                  |                     |                |                      |                            |                             |                              |

### Migrate subscriptions with different types of payment collection methods

You can collect payment for the migrated subscriptions either automatically with the default saved payment method or by sending an invoice that the customer can pay by the due date.

**Example 1 (Basic)**: Migrate a yearly 500 USD subscription with a quantity of 1, starting on January 1, to be charged automatically using the default payment method.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       | 1        | subscription_1              |               |                      |        |           | none               | charge_automatically |                  |                     |                |                      |                            |                             |                              |

**Example 2 (Basic)**: Migrate a yearly 500 USD subscription with a quantity of 1, starting on January 1. This subscription is billed using an invoice sent to the customer, with a 30-day due date.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       | 1        | subscription_1              |               |                      |        |           | none               | send_invoice      |                  |                     | 30             |                      |                            |                             |                              |

### Migrate subscriptions at different stages of subscription service period

**Example 1 (Basic): Migrate a subscription that’s due for renewal**. For example, migrate a 100 USD monthly subscription with a renewal date of January 1. The subscription renews on the 1st of every month.

- Set the `start_date` to the current renewal date, so the subscription is charged immediately.
- Set the `billing_cycle_anchor` to the next renewal cycle date.
- Set `proration_behavior` to `none`.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       |          | subscription_1              |               | 1706745600           |        |           | none               | charge_automatically |                  |                     |                |                      |                            |                             |                              |

**Example 2 (Basic): Migrate a paid subscription that’s in the middle of a billing period**. For example, migrate a 100 USD monthly subscription with an original start date of December 25. The migration date is January 1, and the subscription renews on the 25th of every month.

- Set `backdate_start_date` to the original start date of the subscription.
- Set `billing_cycle_anchor` to the upcoming renewal date.
- Set `start_date` to the migration date.
- Set `proration_behavior` to `none` to avoid charging the customer again and keep the subscription in a scheduled state until the next billing period.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       |          | subscription_1              |               | 1706140800           |        |           | none               | charge_automatically |                  | 1703462400          |                |                      |                            |                             |                              |

**Example 3 (Basic): Migrate subscriptions with trials**. For example, migrate a basic 100 USD monthly subscription starting on January 1. The subscription is under a trial until January 31. After the trial ends, the subscription is charged automatically using the default payment method.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end  | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       | 1        | subscription_1              |               |                      |        | 1706659200 | none               | charge_automatically |                  | 1703462400          |                |                      |                            |                             |                              |

**Example 4 (Basic): Migrate past-due subscriptions**. For example, migrate a 100 USD monthly subscription with a last cycle start date of December 25, which hasn’t been paid. Migrate this mid-cycle starting January 1, with a renewal date on the 25th of each month. This creates a prorated invoice from January 1 to January 25 that Stripe can attempt to collect payment for.

To migrate subscriptions that are in an active cycle but haven’t been paid in the previous system, set `proration_behavior` to `create_prorations` to immediately create an invoice and collect payment. This also enters the subscription into Stripe’s dunning flow, if the payment is still unpaid.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       | 1        | subscription_1              |               | 1706140800           |        |           | create_prorations  | charge_automatically |                  | 1703462400          |                |                      |                            |                             |                              |

**Example 5: Migrate subscriptions that need to be canceled at the end of the cycle**. After migration, you can choose whether or not to charge these subscriptions, based on the migration timing (mid-cycle or at renewal).

They’re canceled at the end of that period. For example, migrate a basic 100 USD monthly subscription starting on January 1. This subscription is automatically canceled on January 31.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       | 1        | subscription_1              |               | 1706140800           |        |           | none               | charge_automatically |                  | 1703462400          |                |                      | TRUE                       |                             |                              |

### Migrate subscriptions with taxes

**Example 1 (Basic)**: Migrate subscriptions to automatically calculate tax by enabling Stripe Tax. For example, migrate a 100 USD monthly subscription starting January 1, with Stripe Tax enabled to calculate the tax automatically.

The migration toolkit validates if you enabled Stripe Tax in advance, and if customers provided the required fields to calculate tax automatically. Make sure your customers provide the necessary information before migration.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       | 1        | subscription_1              | TRUE          |                      |        |           | none               | charge_automatically |                  |                     |                |                      |                            |                             |                              |

**Example 2 (Basic)**: Migrate subscriptions and calculate tax using [manual tax rates](https://dashboard.stripe.com/test/tax-rates). For example, to migrate a basic 100 USD monthly subscription starting on January 1, with 10% tax created using manual tax rates:

- Create a 10% manual tax rate in the [Dashboard](https://dashboard.stripe.com/test/tax-rates) (**Product catalog** > **Coupons**).
- Use the tax rate ID in the migration CSV template.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxx1            | 1704067200            | price_xxx1       | 1        | subscription_1              | FALSE         | 1706140800           |        |           | none               | charge_automatically | txr_xxx1         |                     |                |                      |                            |                             |                              |

**Example 3 (Basic)**: If you use an external tax provider, such as Avalara or Vertex:

For migrated subscriptions where tax is already calculated, leave both `automatic_tax` and `default_tax_rate` blank in the CSV.

After the subscriptions are migrated and live, they automatically follow the tax integration workflows you set up for new subscriptions in your Billing integration.

### Migrate subscriptions with discounts

The migration toolkit supports only one coupon per subscription.

You can migrate subscriptions with discounts that are applied after migration. For example, to migrate a 100 USD monthly subscription starting January 1, with a 10% forever discount:

- Create a 10% coupon in the [Dashboard](https://dashboard.stripe.com/test/tax-rates) (**Product catalog** > **Coupons**).
- Use the coupon name in the migration CSV file.

|  |
|  |
| **ATTRIBUTE** | customer (required) | start_date (required) | price (required) | quantity | metadata.third_party_sub_id | automatic_tax | billing_cycle_anchor | coupon        | trial_end | proration_behavior | collection_method    | default_tax_rate | backdate_start_date | days_until_due | cancel_at_period_end | add_invoice_items.0.amount | add_invoice_items.0.product | add_invoice_items.0.currency |
| **FIELD**     | cus_xxxx1           | 1704067200            | price_xxx1       | 1        | subscription_1              |               |                      | sample_coupon |           | none               | charge_automatically |                  |                     |                |                      |                            |                             |                              |

### Migrate subscriptions within Stripe accounts

The steps to migrate subscriptions from one Stripe account to another are the same as when migrating from a third-party system. Use the Billing migration toolkit to export the subscription data for your CSV file from your old Stripe account.

To create a migration CSV for a Stripe-to-Stripe migration:

1. Export the subscriptions from the old Stripe account using the Dashboard.
2. Use the following CSV example as a reference to map fields between the old and new Stripe accounts.

|  |
|  |
| **ATTRIBUTE** | customer (required)                                      | start_date (required)                                               | price (required)                       | quantity                                              | metadata.old_Stripe_sub_id                      | automatic_tax                                       | billing_cycle_anchor               | coupon                                       | trial_end                                   | proration_behavior                                           | collection_method                        | default_tax_rate                               | backdate_start_date                                         | days_until_due                                       | cancel_at_period_end                                          |
| **FIELD**     | Export field: Customer ID (from previous account export) | Export field: Current Period End UTC (from previous account export) | Respective price id in the new account | Export field: Quantity (from previous account export) | Export field: id (from previous account export) | TRUE if using Stripe tax in new account, else FALSE | Future billing date in new account | Respective coupon in the new account, if any | Respective trial in the new account, if any | `create_prorations` in case of prorated invoice, else `none` | `charge_automatically` or `send_invoice` | Respective tax rate in the new account, if any | Export field: Start Date UTC (from previous account export) | Specify if using `send_invoice` as collection method | Specify if a subscription is due to be canceled at period end |

### Migrate subscriptions with multiple phases

The migration toolkit doesn’t support adding multiple phases directly to a subscription. We recommend the following approach:

1. Use the migration toolkit to migrate the initial phase of the subscription.
2. After the migration, add the additional phases to the migrated subscription schedules. To do so, call the [update](https://docs.stripe.com/api/subscription_schedules/update.md) endpoint or use the Stripe [Subscriptions](https://dashboard.stripe.com/test/subscriptions) Dashboard.
3. Adjust the `start_date` of the migration to allow enough time between the scheduled and live status changes. This allows you to make the phase updates before the subscriptions go live.

## CSV reference

The migration tookit requires you to upload a CSV that has specific information in the correct fields.

### CSV prerequisites

Before you create or download a CSV file, make sure you have access to the following information:

|  |
|  |
| **Customer object**                                                                                            | All customers must have a default [payment method attached to them](https://docs.stripe.com/api/payment_methods/attach.md). Without a default payment method, future subscription payments will fail. If you don’t have a default payment method set for your customers after migrating their data, you have two options:
  - Obtain the user’s consent or rely on their past payment behavior to determine the default payment method on a per-customer basis.
  - Use this [provided script](https://gist.github.com/bsears90/c3f36bfe379dfd13cae749824c5b45ae) to attach the latest payment method to your customers and make it the default method.                                                                   |
| **Automatic tax**                                                                                              | If you use Stripe Tax (where you set automatic tax to true), all customers must have either [addresses or postal codes](https://docs.stripe.com/tax/customer-locations.md) (or both) per country. Stripe needs this information to calculate taxes for the given subscriptions.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [collection_method](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-collection_method) | If you’re using the `send_invoice` payment method for your subscriptions:
  - Add email addresses to the required customers.
  - Add the [days_until_due](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-days_until_due) parameter in the migration CSV file to state the validity of *invoices* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) for each customer.                                                                                                                                       |
| **Dates**                                                                                                      | - To ensure accurate timing, pay special attention to timezones when you create epoch date-time formats for your migration CSV file.
  - For the toolkit, set the [start_date](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-start_date) with a buffer of at least 24 hours in advance from the CSV upload time. We create a [subscription schedule](https://docs.stripe.com/billing/subscriptions/subscription-schedules.md) so that you get this buffer time to confirm and verify accuracy. When the start date begins, the subscription changes from scheduled start to live state.                                                                                                         |
| **Coupons**                                                                                                    | - If the subscription schedule or subscription has [billing cycle anchor](https://docs.stripe.com/billing/subscriptions/billing-cycle.md) in the future and `proration_behavior` [set to](https://docs.stripe.com/billing/subscriptions/prorations.md#disable-prorations) `none`, updating these objects unsets the coupon. Re-apply the coupon if you make any updates to the subscription schedule or subscription.
  - To migrate a subscription with ongoing `discount_behavior`:
    - Set a future phase that removes the coupon at the correct date instead of waiting for an expiration.
    - Create a coupon for each subscription, with the duration being different on each one so they all expire correctly. |
| **Stripe to Stripe migration**                                                                                 | Users can migrate subscriptions within Stripe accounts. You must input Customer IDs and Price IDs (and both Coupon IDs and Tax IDs, if using them) into the template associated with your destination Stripe account, and not your source Stripe account. The migration tool generates an error if you input IDs associated with your source account.                                                                                                                                                                                                                                                                                                                                                                     |

### Full CSV specification

| Attribute                               | Type                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customer` **(required)**               | Stripe Customer ID                       | The identifier of the customer to create the subscription for.                                                                                                                                                                                                                                                                                                                                                |
| `start_date` **(required)**             | Timestamp in epoch UNIX format           | Determines when to create the subscription. You must provide a value that’s 24 hours (or greater) into the future. In a sandbox, you can set this to 1 hour in the future.                                                                                                                                                                                                                                    |
| `price` **(required)**                  | Stripe Price ID                          | Must be a recurring price. If migrating multiple items, use `items.x.{price, quantity}` format instead. Ad-hoc prices are also supported with `adhoc_items.x.{amount, interval, product, currency}`.                                                                                                                                                                                                          |
| `quantity`                              | Number                                   | Determines quantity of a subscription. By default, each subscription is for one product, but Stripe allows you to subscribe a customer to multiple quantities of an item.                                                                                                                                                                                                                                     |
| `items.x.price` **(required)**          | Stripe Price ID                          | The ID of the price object. Must be a recurring price.                                                                                                                                                                                                                                                                                                                                                        |
| `items.x.quantity`                      | Number                                   | Determines quantity of a subscription. By default, each subscription is for one product, but Stripe allows you to subscribe a customer to multiple quantities of an item.                                                                                                                                                                                                                                     |
| `adhoc_items.x.amount` **(required)**   | Number                                   | A positive number. Use full units with decimals (such as 21.50).                                                                                                                                                                                                                                                                                                                                              |
| `adhoc_items.x.product` **(required)**  | Stripe Product ID                        | The identifier of the product that belongs with the ad-hoc price.                                                                                                                                                                                                                                                                                                                                             |
| `adhoc_items.x.interval` **(required)** | `day`, `week`, `month` or `year`         | The billing frequency.                                                                                                                                                                                                                                                                                                                                                                                        |
| `adhoc_items.x.currency` **(required)** | String                                   | A three-letter ISO currency code, in lowercase, for a [supported currency](https://docs.stripe.com/currencies.md).                                                                                                                                                                                                                                                                                            |
| `adhoc_items.x.quantity`                | Number                                   | Determines quantity of a subscription. By default, each subscription is for one product, but Stripe allows you to subscribe a customer to multiple quantities of an item.                                                                                                                                                                                                                                     |
| `metadata_source`                       | String                                   | If you’re doing a Stripe-to-Stripe migration, enter `internal:Stripe`.                                                                                                                                                                                                                                                                                                                                        |
| `metadata_*`                            | String                                   | Attach these key-value pairs to an object. This is useful for storing additional information about the object in a structured format.                                                                                                                                                                                                                                                                         |
| `automatic_tax`                         | Boolean                                  | Specify `true` to use automatic tax settings by Stripe Tax.                                                                                                                                                                                                                                                                                                                                                   |
| `coupon`                                | Stripe Coupon ID                         | The identifier of the coupon to apply to this subscription.                                                                                                                                                                                                                                                                                                                                                   |
| `currency`                              | String                                   | Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://docs.stripe.com/currencies.md). Used for currency selection with multi-currency prices.                                                                                                                                                                              |
| `trial_end`                             | Timestamp                                | Sets the phase to trialing from the start date to the `trial_end` date. You must specify a value that’s before the cycle/phase end date, and you can’t combine it with the trial.                                                                                                                                                                                                                             |
| `proration_behavior`                    | `create_prorations` or `none`            | Determines if the subscription creates prorations after migration. The default value is `create_prorations`.                                                                                                                                                                                                                                                                                                  |
| `collection_method`                     | `charge_automatically` or `send_invoice` | When charging automatically, Stripe attempts to pay the underlying subscription at the end of each billing period using the default source attached to the customer. The default value is `charge_automatically`. When sending an invoice, Stripe emails your customer an invoice with payment instructions, and marks the subscription as active. If using `send_invoice`, you must set `days_until_due`.    |
| `default_tax_rate`                      | Stripe Tax ID                            | Sets the subscription’s `default_tax_rates`. This also determines the invoice’s `default_tax_rates` for any invoices issued by the subscription during this phase. This value is incompatible with `automatic_tax`.                                                                                                                                                                                           |
| `backdate_start_date`                   | Timestamp in epoch UNIX format           | Determines the `start_date` of the created subscription, which must occur in the past. If set, you must specify `none` for the `proration_behavior`. Doing so prevents the creation of a prorated invoice for the time between `backdate_start_date` and actual `start_date`. For more details, see [backdating no charge](https://docs.stripe.com/billing/subscriptions/backdating.md#backdating-no-charge). |
| `billing_cycle_anchor`                  | Timestamp                                | Determines the future dates of when to bill the subscription to the customer.                                                                                                                                                                                                                                                                                                                                 |
| `days_until_due`                        | Integer                                  | The number of days from when the invoice is created until it’s due. This is required and valid only for invoices with `collection_method` set to `send_invoice`.                                                                                                                                                                                                                                              |
| `cancel_at_period_end`                  | Boolean                                  | Specify `true` to cancel a subscription at the end of the period.                                                                                                                                                                                                                                                                                                                                             |

## See also

- [Migrate subscriptions using Stripe APIs](https://docs.stripe.com/billing/subscriptions/import-subscriptions.md)
