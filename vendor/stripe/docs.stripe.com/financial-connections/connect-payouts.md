# Collect a bank account to enhance Connect payouts

Collect your connected account's bank account and use account data to enhance payouts.

Not sure about which Financial Connections integration to use? See our [overview of integration options](https://docs.stripe.com/financial-connections/use-cases.md).

Financial Connections lets you instantly collect tokenized account and routing numbers for payouts to connected accounts where your platform is liable for negative balances, including Custom and Express accounts.

Financial Connections helps you:

- Increase onboarding conversion by eliminating the need for your connected accounts to leave your website or application to locate their account and routing numbers.
- Reduce payout failure rates by eliminating errors that result from manual entry of account and routing numbers.
- Stay secure by not storing sensitive data such as account and routing numbers on your server.
- Save development time by eliminating your need to build bank account manual entry forms.
- Enable your users to connect their accounts in fewer steps with Link, allowing them to save and reuse their bank account details across Stripe businesses.

Optionally, Stripe platforms in the US can request permission from your accounts to retrieve additional data on their [Financial Connections account](https://docs.stripe.com/api/financial_connections/accounts/object.md). Consider optimizing your onboarding process by accessing [balances](https://docs.stripe.com/financial-connections/balances.md), [transactions](https://docs.stripe.com/financial-connections/transactions.md), and [ownership](https://docs.stripe.com/financial-connections/ownership.md) information.

Retrieving additional account data can help you:

- Mitigate fraud when onboarding accounts by verifying the ownership details of their bank account, such as the name and address of the account holder.
- Underwrite accounts for financial services that you might offer on your platform with balances and transactions data.

## Get started 

For accounts where your platform is liable for negative balances, such as Custom and Express accounts, enable Stripe Financial Connections either within the [Connect Onboarding](https://docs.stripe.com/connect/payouts-bank-accounts.md?bank-account-collection-method=financial-connections) web form or within your [own onboarding flow](https://docs.stripe.com/connect/payouts-bank-accounts.md?bank-account-collection-method=financial-connections&bank-account-collection-integration=direct-api).

For accounts where your platform isn’t liable for negative balances, including Standard connected accounts, account onboarding always uses Financial Connections. The platform can’t access additional bank account data on those accounts.
