# Trial balance

View and analyze account balances over specific periods with the trial balance report.

The [trial balance](https://dashboard.stripe.com/revenue-recognition/statements?tab=trial_balance) lists the balances of the accounts at a specific time (as of a specific date) and ensures the total of the debit accounts equals the total of the credit accounts.

When you’re ready to close an accounting period, prepare a trial balance report. Running a trial balance is an important step in book closing because it summarizes all the transactions for the period, showing the balances in each account. It ensures that the total debits and credits are equal, confirming that the books are balanced.
![Trial balance](https://b.stripecdn.com/docs-statics-srv/assets/trial-balance.7dcb7429b24b35ebc1d1300cb8b93d56.png)

## Trial balance report 

The trial balance report lets you review the starting balance, net change, and ending balance for each account. In the report, positive numbers represent debits, and negative numbers shown in parentheses `()` represent credits.

| Columns                | Description                                                                                                                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| General ledger account | Your general ledger account (if it’s mapped in Stripe using the [map to your chart of accounts](https://docs.stripe.com/revenue-recognition/chart-of-accounts.md) feature) or default [Stripe accounts](https://docs.stripe.com/revenue-recognition/methodology.md) |
| Starting balance       | Balance at the start of the selected accounting period                                                                                                                                                                                                              |
| Net change             | Net change based on the activity in the selected accounting period                                                                                                                                                                                                  |
| Ending balance         | Balance at the end of the selected accounting period                                                                                                                                                                                                                |
| GL code                | The number corresponding to the GL accounts                                                                                                                                                                                                                         |

The account balance changes shown in the trial balance report reconcile with other Revenue Recognition reports such as the income statement, balance sheet report, and debits and credits report for the same period and currency.

With the debits and credits report, you need to add the change amount in debit, and deduct the change amount in credit to arrive at the net change in amount during that period. This helps reconcile with the net change amount in the trial balance.
