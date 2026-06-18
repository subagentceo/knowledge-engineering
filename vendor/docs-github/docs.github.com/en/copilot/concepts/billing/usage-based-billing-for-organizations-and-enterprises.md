# Usage-based billing for organizations and enterprises

Under usage-based billing, Copilot usage in organizations and enterprises is measured in AI credits.

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

If you have set a user-level budget and a user exhausts it, that user's access to Copilot is halted, regardless of whether the organization's pool still has capacity. A user can also be blocked by an enterprise spending limit before they reach their individual user-level budget, if the spending limit runs out first. There is no automatic fallback to lower-cost models when a budget is exhausted. For more information about how these controls interact, see [Budgets for usage-based billing](/en/copilot/concepts/billing/budgets-for-usage-based-billing).

Additional usage budgets are set in US dollars, and usage is shown in AI credits. AI credits draw down the budget at a fixed rate: 1 AI credit = $0.01 USD, so a $10 USD budget covers 1,000 AI credits.

## How can I control costs with budgets?

Budget controls let you govern how individual users draw from the shared pool and cap any additional spending once it's exhausted. You can set budgets at multiple levels:

* **User-level budgets** cap how much an individual user can consume per billing cycle, from both the shared pool and additional usage. A $0 USD user-level budget blocks the user immediately.
* **Cost-center budgets** cap metered charges for a defined group of users after the pool is exhausted.
* **Enterprise spending limits** cap total metered charges across your entire enterprise after the pool is exhausted.
* **Organization-level budgets** cap metered charges for users whose Copilot seats are billed to the organization, after the pool is exhausted.

For a full explanation of how these controls work together and when usage gets blocked, see [Budgets for usage-based billing](/en/copilot/concepts/billing/budgets-for-usage-based-billing).

<!-- expires 2026-09-01 -->

## Update your IDE, client, and extension

For the best experience with usage-based billing, update your IDE, client, and Copilot extension to at least the versions listed below.

> \[!NOTE]
> Older versions will continue to work, but may display incorrect model pricing, inaccurate usage information, or outdated billing terminology. Usage alert notifications may also not appear as expected.

| IDE, client, or extension    | Minimum version |
| ---------------------------- | --------------- |
| VS Code                      | 1.120           |
| Visual Studio 2022 (17.x)    | 17.14.33        |
| Visual Studio 2025 (18.x)    | 18.6.0          |
| SQL Server Management Studio | 22.6            |
| JetBrains IDEs (plugin)      | 1.9.1           |
| Eclipse (plugin)             | 0.18.0          |
| Xcode (extension)            | 0.50.0          |
| Copilot CLI                  | 1.0.48          |

We recommend keeping your IDE, client, and Copilot extensions on the latest available stable version. For information on configuring automatic updates, see [Configuring GitHub Copilot in your environment](/en/copilot/how-tos/configure-personal-settings/configure-in-ide). To update Copilot CLI, see [Installing GitHub Copilot CLI](/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli).

<!-- end expires 2026-09-01 -->

## Next steps

* To set up budget controls for your enterprise, see [Getting started with budget controls](/en/copilot/tutorials/budgets/getting-started-with-budget-controls).
* To compare per-token costs across models and estimate your spend, see [Models and pricing for GitHub Copilot](/en/copilot/reference/copilot-billing/models-and-pricing).