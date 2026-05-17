# Requests in GitHub Copilot

Learn about requests in Copilot, including premium requests, how they work, and how to manage your usage effectively.

<!-- expires 2026-06-01 -->

<!-- expires 2026-06-01 -->

> \[!IMPORTANT] Starting June 1, 2026, GitHub is moving Copilot from request-based billing to usage-based billing. See [Usage-based billing for organizations and enterprises](/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises) and [Usage-based billing for individuals](/en/copilot/concepts/billing/usage-based-billing-for-individuals).

<!-- end expires 2026-06-01 -->

<!-- end expires 2026-06-01 -->

## What is a request?

A request is any interaction where you ask Copilot to do something for you—whether it's generating code, answering a question, or helping you through an extension. Each time you send a prompt in a chat window or trigger a response from Copilot, you're making a request. For agentic features, only the prompts you send count as premium requests; actions Copilot takes autonomously to complete your task, such as tool calls, do not. For example, using `/plan` in Copilot CLI counts as one premium request, and any follow-up prompt you send counts as another.

## What are premium requests?

Some Copilot features use more advanced processing power and count as premium requests. The number of premium requests a feature consumes can vary depending on the feature and the AI model used.

### Premium features

The following Copilot features can use premium requests.

<div class="ghd-tool rowheaders">

| Feature                                                                                                                    | Premium request consumption                                                                                                                                                                                                                                                                                      | SKU Attribution                      |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [Copilot Chat](/en/copilot/using-github-copilot/copilot-chat)                                                              | Copilot Chat uses **one premium request** per user prompt, multiplied by the model's rate. This includes ask, edit, agent, and plan modes in Copilot Chat in an IDE.                                                                                                                                             | Copilot premium requests             |
| [Copilot CLI](/en/copilot/concepts/agents/about-copilot-cli)                                                               | Each prompt to Copilot CLI uses **one premium request** with the default model. For other models, this is multiplied by the model's rate.                                                                                                                                                                        | Copilot premium requests             |
| [Copilot code review](/en/copilot/using-github-copilot/code-review/using-copilot-code-review)                              | Each time Copilot reviews a pull request (when assigned as a reviewer) or reviews code in your IDE, **one premium request** is consumed.                                                                                                                                                                         | Copilot premium requests             |
| [Copilot cloud agent](/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)                                           | Copilot cloud agent uses **one premium request** per session, multiplied by the model's rate. A session begins when you prompt Copilot to undertake a task. In addition, each real-time steering comment made during an active session uses **one premium request** per session, multiplied by the model's rate. | Copilot cloud agent premium requests |
| [Copilot Spaces](/en/copilot/using-github-copilot/copilot-spaces/about-organizing-and-sharing-context-with-copilot-spaces) | Copilot Spaces uses **one premium request** per user prompt, multiplied by the model's rate.                                                                                                                                                                                                                     | Copilot premium requests             |
| [Spark](/en/copilot/tutorials/building-ai-app-prototypes)                                                                  | Each prompt to Spark uses a fixed rate of **four premium requests**.                                                                                                                                                                                                                                             | Spark premium requests               |
| [OpenAI Codex Visual Studio Code integration](/en/copilot/concepts/agents/openai-codex)                                    | While in preview, each prompt to OpenAI Codex uses **one premium request** multiplied by the model multiplier rates.                                                                                                                                                                                             | Copilot premium requests             |
| [Third-party coding agents](/en/copilot/concepts/agents/about-third-party-agents)                                          | While in preview, each prompt to a third-party coding agent uses **one premium request**.                                                                                                                                                                                                                        | Copilot premium requests             |

</div>

> \[!NOTE]
> Premium requests for Spark and Copilot cloud agent are tracked in dedicated SKUs from November 1, 2025. This provides better cost visibility and budget control for each AI product.

> \[!TIP]
> For instructions on viewing how many premium requests you have used and advice on how to optimize usage, see [Monitoring your GitHub Copilot usage and entitlements](/en/copilot/how-tos/manage-and-track-spending/monitor-premium-requests).

## How do request allowances work per plan?

> \[!NOTE]
> Billing for premium requests began on June 18, 2025, for all paid Copilot plans on GitHub.com, and on August 1, 2025, on GHE.com. The request counters were only set to zero for paid plans.

If you use **Copilot Free**, your plan comes with up to 2,000 inline suggestion requests and up to 50 premium requests per month. All chat interactions count as premium requests.

If you're on a **paid plan** or **Copilot Student**, you get unlimited inline suggestions and unlimited chat interactions using the included models (GPT-5 mini, GPT-4.1 and GPT-4o). Rate limiting is in place to accommodate for high demand. See [Usage limits for GitHub Copilot](/en/copilot/concepts/rate-limits).

Paid plans and Copilot Student also receive a monthly allowance of premium requests, which can be used for advanced chat interactions, inline suggestions using premium models, and other premium features. For an overview of the amount of premium requests included in each plan, see [Plans for GitHub Copilot](/en/copilot/about-github-copilot/subscription-plans-for-github-copilot#comparing-copilot-plans).

> \[!NOTE]
> If a user has licenses from multiple enterprises, or standalone organizations, they must make a selection using the "Usage billed to" drop down in order to utilize premium requests. The billing entity selected will be billed for any premium requests they make. If no billing entity is selected, premium requests will be blocked. See [Monitoring your GitHub Copilot usage and entitlements](/en/copilot/managing-copilot/monitoring-usage-and-entitlements/monitoring-your-copilot-usage-and-entitlements#managing-premium-request-billing-with-multiple-copilot-licenses).

## What happens to unused requests at the end of the month?

Unused requests for the previous month do not carry over to the following month. Premium request counters reset on the 1st of each month at 00:00:00 UTC. See [Monitoring your GitHub Copilot usage and entitlements](/en/copilot/managing-copilot/understanding-and-managing-copilot-usage/monitoring-your-copilot-usage-and-entitlements).

## What if I run out of premium requests?

> \[!NOTE]
> Additional premium requests are not available to:
>
> * Users on Copilot Free. To access more premium requests, upgrade to a paid plan.
> * Users who subscribe, or have subscribed, to Copilot Pro or Copilot Pro+ through GitHub Mobile on iOS or Android.

If you're on a **paid plan** and use all of your premium requests, you can still use Copilot with one of the included models for the rest of the month. This is subject to change. Response times for the included models may vary during periods of high usage. Requests to the included models may be subject to rate limiting. See [Usage limits for GitHub Copilot](/en/copilot/concepts/rate-limits).

If you need more premium requests beyond your monthly allowance:

* For an individual subscription, set a budget for additional premium requests or upgrade to a higher plan. See [Setting up budgets to control spending on metered products](/en/billing/managing-your-billing/using-budgets-control-spending).
* If you're an enterprise or organization owner, ensure that the "Premium request paid usage" policy is enabled and that extra spending is not prevented by a budget. See [Managing the premium request allowance for your organization or enterprise](/en/copilot/how-tos/premium-requests/manage-for-enterprise).

## Model multipliers

The available models vary depending on your Copilot plan. See [Plans for GitHub Copilot](/en/copilot/about-github-copilot/plans-for-github-copilot#models).

> \[!NOTE]
>
> * The models included with Copilot plans are subject to change.
> * Model multipliers and costs are subject to change.
> * Discounted multipliers are available for using Copilot auto model selection. See [About Copilot auto model selection](/en/copilot/concepts/auto-model-selection).
>   * If you are on a paid Copilot plan and use auto model selection in Copilot Chat, Copilot CLI, or Copilot cloud agent, models qualify for a 10% multiplier discount. For example, Sonnet 4 would be billed at .9x rather than 1x when using auto model selection.
>   * Discounted multipliers are not available for Copilot Free.

Each model has a premium request multiplier, based on its complexity and resource usage. If you are on a paid Copilot plan, your premium request allowance is deducted according to this multiplier.

GPT-5 mini, GPT-4.1 and GPT-4o are the included models, and do not consume any premium requests if you are on a **paid plan**.

If you use **Copilot Free**, you have access to a limited number of models, and each model will consume one premium request when used.

<div class="ghd-tool rowheaders">

| Model | Multiplier for **paid plans** | Multiplier for **Copilot Free** |
| ----- | ----------------------------- | ------------------------------- |
|       |                               |                                 |

</div>

**For GitHub Enterprise Cloud**, requests processed with data residency or FedRAMP enforcement include an additional 10% multiplier. See [GitHub Copilot with data residency](/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency#pricing-for-data-resident-copilot).

## Examples of premium request usage

Premium request usage is based on the model’s multiplier and the feature you’re using. For example:

* **Using GPT-5 mini on Copilot Free**: Each interaction counts as 1 premium request.
* **Using GPT-5 mini on a paid plan**: No premium requests are consumed.