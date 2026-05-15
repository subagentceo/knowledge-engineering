# Linked external accounts

Manage your linked external accounts.

Linking an external bank account gives Stripe read access to financial information about that account for things like credit reviews, product eligibility determinations, and risk assessments.

To link an external bank account or to manage your linked accounts, go to [Linked external accounts](https://dashboard.stripe.com/settings/linked-accounts) in your Dashboard.

> #### Linked external accounts vs. payout accounts
> 
> Linked accounts are different from payout accounts. Linking an account only gives Stripe access to information, while a payout account can receive funds from a Stripe account. You manage your payout account in [Payout settings](https://dashboard.stripe.com/settings/payouts).

Different Stripe products use linked account data in different ways. We might ask you to link your account in the following cases:

- We need to verify bank account details for *payouts* (A payout is the transfer of funds to an external account, usually a bank account, in the form of a deposit).
- You apply for a loan or line of credit.
- You request access to Stripe products or features with eligibility requirements.
- We need to re-evaluate [reserve](https://support.stripe.com/topics/reserves) balances during a risk review.

> We handle data from your linked financial accounts according to the [Stripe Services Agreement](https://stripe.com/legal/ssa), [Stripe Privacy Policy](https://stripe.com/privacy) and the [partner terms](https://connect.finicity.com/assets/html/connect-eula.html). Stripe’s partner can only obtain financial account information as authorized by you. Stripe doesn’t sell your data to unaffiliated third parties.

## Stripe access to external account data 

With your consent, Stripe can access your linked account to retrieve financial data. For details on the specific data types available through linked accounts, see [the Support article](https://support.stripe.com/user/questions/what-data-does-stripe-access-from-my-linked-financial-account).

Stripe products use this data in the following ways:

- **Payouts**: Stripe uses your financial account information, specifically the account number and routing number, to verify your account for [payouts](https://docs.stripe.com/payouts.md). You can link this account during onboarding or from the **Linked external accounts** settings in your Dashboard.
- **Risk**: Stripe uses your financial account information to determine whether a [reserve](https://support.stripe.com/topics/reserves) is required and, if so, the appropriate amount. Linking your financial account allows Stripe to reassess your risk profile, which might reduce or eliminate the need for a reserve.
- **Issuing**: We use your financial account information during underwriting and on an ongoing basis to determine your [Issuing card](https://docs.stripe.com/issuing.md) credit limit. This limit can change when your financial account information changes. If you unlink a financial account, it might affect your ability to use your card.
- **Capital**: [Stripe Capital](https://docs.stripe.com/capital/how-stripe-capital-works.md) uses your financial account information to evaluate your loan eligibility and the details of your loan offer.

The data available to Stripe can vary based on your financial account, your permissions, and the Stripe products you use. Go to your [Linked external accounts settings](https://dashboard.stripe.com/settings/linked-accounts) to see the accounts you linked to Stripe and what information you’ve shared with different Stripe products.

> We have organizational, technical, and administrative measures in place to protect your financial account data from unauthorized access, destruction, loss, alteration, or misuse within our organization. Should you believe that your interaction with us is no longer secure (for instance, if you feel that the security of your account has been compromised), please [contact us](https://support.stripe.com/contact) immediately.

## Link a financial account 

To link a bank account, go to [Linked external accounts](https://dashboard.stripe.com/settings/linked-accounts) in your Dashboard. If we request that you link an account, your Dashboard displays a **Link bank account** prompt that you can click.

1. From the settings page, click **+ Add account**. If, instead, you clicked the prompt, click **Link bank account**.
1. Choose your bank account provider and enter your bank account login details.
1. Select the account types you want to link, then click **Link accounts**.
1. To link more accounts, click **Link another account**. Otherwise, click **Done**.

You can confirm the linked accounts on the [Linked external accounts](https://dashboard.stripe.com/settings/linked-accounts) page.

## Manage your linked accounts 

You can control which Stripe products use your linked account data from your [Linked external accounts](https://dashboard.stripe.com/settings/linked-accounts) settings. From this page, you can enable or disable data sharing for individual products. Opting out of sharing might affect your eligibility for certain products and features.

### Remove a linked account 

To remove a linked account, go to [Linked external accounts](https://dashboard.stripe.com/settings/linked-accounts) and click the overflow menu ⋯ for the account you want to unlink, then select **Remove account**. For detailed guidance, see [the Support article](https://support.stripe.com/questions/how-to-disconnect-a-linked-financial-account).

After you remove an account, Stripe stops obtaining data from it.

Removing a linked account doesn’t affect your payouts. Your payout bank account is managed separately in [Payout settings](https://dashboard.stripe.com/settings/payouts). However, unlinking might affect your eligibility for products like [Issuing](https://docs.stripe.com/issuing.md) or [Stripe Capital](https://docs.stripe.com/capital/how-stripe-capital-works.md) that rely on linked account data. In some cases, Stripe might request alternative information, such as financial statements.

## How Stripe protects your data

> For details about how Stripe handles linked financial account data, see the Financial Connections and Stripe legal resources linked below. If you believe the security of your account has been compromised, [contact us](https://support.stripe.com/contact) immediately.

### Data retrieval frequency 

How often Stripe accesses your data depends on the permissions granted for your linked account and the Stripe products you use. Learn more about [Financial Connections data permissions](https://docs.stripe.com/financial-connections/fundamentals.md#data-permissions).

### Data retention 

For details about how long Stripe retains linked financial account data, see the [Stripe Privacy Policy](https://stripe.com/privacy).

### Data sharing 

For details on how Stripe uses and shares linked financial account data, see the [Stripe Privacy Policy](https://stripe.com/privacy) and the [Financial Connections Terms](https://stripe.com/legal/consumer#financial-connections-terms).

### Trusted entities 

For details about the parties involved in accessing linked financial account data, see the [What data does Stripe access from my linked financial account?](https://support.stripe.com/user/questions/what-data-does-stripe-access-from-my-linked-financial-account) Support article, the [What is the relationship between Stripe and Stripe’s service providers?](https://support.stripe.com/user/questions/what-is-the-relationship-between-stripe-and-stripes-service-providers) Support article, and the [Financial Connections Terms](https://stripe.com/legal/consumer#financial-connections-terms).

### Technology partners 

For details about the service providers Stripe works with for Financial Connections, see [the Support article](https://support.stripe.com/user/questions/what-is-the-relationship-between-stripe-and-stripes-service-providers) and the [Stripe Privacy Policy](https://stripe.com/privacy).
