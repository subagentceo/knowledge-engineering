# Manage connected accounts with the Dashboard

Learn about using the Stripe Dashboard to find and manage connected accounts.

You can use the Dashboard to inspect, support, and better understand your platform’s connected accounts.

The Connected accounts page [displays a list of your connected accounts](https://docs.stripe.com/connect/dashboard/viewing-all-accounts.md) with basic information such as each account’s status and payment balance. You can filter and sort the list to do things such as:

- View accounts that are restricted or have other issues that you can help resolve.
- View your largest accounts.
- View accounts based on their status.
- [Review compliance information to take action on requirement updates](https://docs.stripe.com/connect/dashboard/review-compliance-information.md#requirement-updates). Use the instructions provided to make sure that your connected accounts remain [enabled](https://docs.stripe.com/connect/dashboard.md#enabled) when requirements change.

For individual connected accounts, some common tasks you can do in the Dashboard include:

- [Create accounts](https://docs.stripe.com/connect/dashboard/managing-individual-accounts.md#creating-accounts)
- [Find individual accounts](https://docs.stripe.com/connect/dashboard/managing-individual-accounts.md#finding-accounts)
- [Update account information](https://docs.stripe.com/connect/dashboard/managing-individual-accounts.md#updating-accounts)
- [Send funds to accounts](https://docs.stripe.com/connect/dashboard/managing-individual-accounts.md#sending-funds)

## Status badges 

Status badges exclude local payment methods. See the [Capability settings](https://dashboard.stripe.com/settings/connect/capability-settings) in the Dashboard for the full list of local payment methods.

Status badges provide a way to understand the status of an account. You can hover over the badges to view contextual information, and you can click the [status tabs](https://docs.stripe.com/connect/dashboard/viewing-all-accounts.md#tabs-workflows) to view accounts grouped by that status. Status badges include:

| Status            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (Restricted)      | The account has at least one inactive capability, not counting inactive payment methods. Additional information usually needs to be collected to enable these accounts. Click an account to view details about any inactive capabilities and their requirements.

  If information is required to enable the account, it appears in an **Actions required** list at the top of the Connected account details page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| (Restricted soon) | The account has currently due requirements with an upcoming due date.

  If information is required to enable the account, it appears in an **Actions required** list at the top of the Connected account details page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| (In review)       | The account is being reviewed or verified by Stripe. This occurs when:

  - Stripe is verifying information that was provided, such as an uploaded government-issued ID document.
  - Stripe is performing a watchlist check against a list of prohibited individuals and businesses.
  - Stripe is reviewing the account for suspected fraudulent activity.

  Review times vary depending on the requirement, but they typically last 24–48 hours.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| (Enabled)         | The account is in good standing, with all capabilities enabled, not counting payment methods. Some enabled accounts might eventually become subject to additional requirements if they reach a certain payment volume [threshold](https://docs.stripe.com/connect/identity-verification.md#verification-requirements). These potential requirements appear in an account’s requirements as `eventually_due`, but don’t affect payments or payouts unless the account reaches the volume threshold. If that happens, the `eventually_due` requirements become `currently_due`.

  If an account has potential eventually due requirements:

  - **For v2 Accounts:** Eventually due requirements appear in the `Account`’s [requirements.entries](https://docs.stripe.com/api/v2/core/accounts/object.md#v2_account_object-requirements-entries) array with a `minimum_deadline.status` of `eventually_due`.
  - **For v1 Accounts:** Eventually due requirements appear in the `Account`’s [requirements.eventually_due](https://docs.stripe.com/api/accounts/object.md#account_object-requirements) array. |
| (Rejected)        | Your platform or Stripe rejected the connected account. Hover over the status badge to see whether your platform or Stripe rejected the account.

  Check the **Actions required** list at the top of the Connected account details page to see the reason the account was rejected. In general, accounts are rejected by Stripe if they’re suspected of fraudulent activity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## Use platform branding for connected accounts

This setting only applies to new accounts created by your platform. Existing accounts aren’t affected.

To apply your [platform branding settings](https://dashboard.stripe.com/settings/branding) to all new connected accounts, open [Onboarding interface](https://dashboard.stripe.com/settings/connect/onboarding-interface) in your Connect settings, click **Customize**, and enable **Copy platform branding**. When **Copy platform branding** is enabled, elements of your platform branding automatically apply to all new accounts.

To update the branding settings of an existing connected account, use the Accounts API:

- **Accounts v2:** Update the [configuration.merchant.branding](https://docs.stripe.com/api/v2/core/accounts/update.md#v2_update_accounts-configuration-merchant-branding) hash.
- **Accounts v1:** Update the [settings.branding](https://docs.stripe.com/api/accounts/update.md#update_account-settings-branding) hash.

## See also

- [Viewing all accounts](https://docs.stripe.com/connect/dashboard/viewing-all-accounts.md)
- [Managing individual accounts](https://docs.stripe.com/connect/dashboard/managing-individual-accounts.md)
