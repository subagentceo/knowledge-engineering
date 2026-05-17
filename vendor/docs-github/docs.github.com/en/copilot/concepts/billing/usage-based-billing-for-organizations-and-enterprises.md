# Usage-based billing for organizations and enterprises

Prepare for the transition to usage-based billing for Copilot Business and Copilot Enterprise.

<!-- expires 2026-06-01 -->

> \[!IMPORTANT] GitHub will use the billing methods described in this article **starting June 1, 2026**. You can read more about this change on [the GitHub Blog](https://gh.io/copilot-billing-blog).

<!-- end expires 2026-06-01 -->

## What are GitHub AI Credits?

GitHub AI Credits are the billing unit for Copilot usage in Copilot Business and Copilot Enterprise.

When someone in your organization uses Copilot, the interaction consumes tokens: input tokens (what's sent to the model), output tokens (what the model generates), and cached tokens (context the model reuses or stores). Each token is priced based on the model used, and the total is converted into AI credits, where 1 AI credit = $0.01 USD.

The cost of an interaction depends on two things: the model and the number of tokens consumed. A quick chat question using a lightweight model might cost a fraction of a credit. A long coding agent session using a frontier model across multiple files will cost more, because it's doing more work.

## What is billed in AI credits?

Copilot features that use AI models consume AI credits. This includes Copilot Chat, Copilot CLI, Copilot cloud agent, Copilot Spaces, Spark, and third-party coding agents.

Code completions and next edit suggestions are **not** billed in AI credits. They remain unlimited for all paid plans.

## How do AI credits work?

Each assigned Copilot license comes with a monthly amount of **included AI credits**:

| Plan               | Total AI credits per user per month |
| ------------------ | ----------------------------------- |
| Copilot Business   | 1,900                               |
| Copilot Enterprise | 3,900                               |

A user's included AI credits are pooled at the billing entity level. For example, an enterprise with 100 Copilot Business users gets a shared pool of 190,000 AI credits rather than 100 individual buckets. This means power users can draw more when they need it, while lighter users offset that consumption.

Adding licenses mid-cycle increases the pool immediately. Removing licenses mid-cycle doesn't shrink the pool: the decrease is reflected at the start of the next billing cycle.

<!-- expires 2026-09-01 -->

### Promotional amounts for existing customers

Existing Copilot Business and Copilot Enterprise customers receive a higher amount of included AI credits for the first three months of usage-based billing (June 1 – September 1, 2026):

| Plan               | Total AI credits per user per month |
| ------------------ | ----------------------------------- |
| Copilot Business   | 3,000                               |
| Copilot Enterprise | 7,000                               |

After the promotional period, included usage returns to the standard amounts above.

<!-- end expires 2026-09-01 -->

## What happens if I exceed my included AI credits?

When your pooled AI credits are exhausted, what happens next depends on how you have configured policies for additional usage.

* **Additional usage allowed**: Usage continues at published per-credit rates. The additional spend is charged to your organization or enterprise.
* **Additional usage not allowed**: Usage is blocked until the next billing cycle when monthly amounts are refreshed.

If you have set a user-level budget and a user exhausts it, that user's access to Copilot is halted, regardless of whether the organization's pool still has capacity. There is no automatic fallback to lower-cost models when a budget is exhausted.

Additional usage budgets are set in US dollars, and usage is shown in GitHub AI Credits. GitHub AI Credits draw down the budget at a fixed rate: 1 AI credit = $0.01 USD, so a $10 budget covers 1,000 AI credits.

## How can I control costs with budgets?

You can set budgets at four levels to control GitHub AI Credits spend:

* **Enterprise-level budgets** track spending for all organizations, repositories, and cost centers under the enterprise.
* **Organization-level budgets** track spending for all repositories in the organization.
* **Cost-center-level budgets** track spending for a single cost center.
* **User-level budgets** track spending for individual users. A $0 user-level budget means no access at all.

You can use budgets to get alerts as you approach limits, and to enforce hard stops on usage. For example, if you want to allow some additional usage but keep it in check, you could set a user-level budget slightly above the included amount.

For more information on setting budgets, see [Setting up budgets to control spending on metered products](/en/billing/how-tos/set-up-budgets).

## Next steps

* To compare per-token costs across models and estimate your spend, see [Models and pricing for GitHub Copilot](/en/copilot/reference/copilot-billing/models-and-pricing).
* For guidance on how to prepare for usage-based billing, see [Preparing your organization for usage-based billing](/en/copilot/how-tos/manage-and-track-spending/prepare-for-usage-based-billing).