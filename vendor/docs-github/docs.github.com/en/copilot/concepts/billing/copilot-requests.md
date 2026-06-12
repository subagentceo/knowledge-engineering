# Requests in GitHub Copilot (legacy)

Learn about requests in Copilot, including premium requests, how they work, and how to manage your usage effectively.

> \[!IMPORTANT] This article only applies to Copilot Pro and Copilot Pro+ subscribers on an existing annual plan who remained on legacy premium request-based billing after June 1, 2026.

## What is a request?

A request is any interaction where you ask Copilot to do something for you—whether it's generating code, answering a question, or helping you through an extension. Each time you send a prompt in a chat window or trigger a response from Copilot, you're making a request. For agentic features, only the prompts you send count as premium requests; actions Copilot takes autonomously to complete your task, such as tool calls, do not. For example, using `/plan` in Copilot CLI counts as one premium request, and any follow-up prompt you send counts as another.

## What are premium requests?

Some Copilot features use more advanced processing power and count as premium requests. The number of premium requests a feature consumes can vary depending on the feature and the AI model used.

### Premium features

The following Copilot features can use premium requests.

> \[!IMPORTANT]
> Starting June 1, 2026, Copilot code review will have a model multiplier of 13. This means each time Copilot reviews a pull request or reviews code in your IDE, your monthly quota of Copilot premium requests will be reduced by 13.

<div class="ghd-tool rowheaders">

| Feature                                                                                                                    | Premium request consumption                                                                                                                                                                                                                                                                                      | SKU Attribution                      |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [Copilot Chat](/en/copilot/using-github-copilot/copilot-chat)                                                              | Copilot Chat uses **one premium request** per user prompt, multiplied by the model's rate. This includes ask, edit, agent, and plan modes in Copilot Chat in an IDE.                                                                                                                                             | Copilot premium requests             |
| [Copilot CLI](/en/copilot/concepts/agents/about-copilot-cli)                                                               | Each prompt to Copilot CLI uses **one premium request** with the default model. For other models, this is multiplied by the model's rate.                                                                                                                                                                        | Copilot premium requests             |
| [Copilot code review](/en/copilot/using-github-copilot/code-review/using-copilot-code-review)                              | Each time Copilot reviews a pull request (when assigned as a reviewer) or reviews code in your IDE, **13 premium requests** are consumed.                                                                                                                                                                        | Copilot premium requests             |
| [Copilot cloud agent](/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)                                           | Copilot cloud agent uses **one premium request** per session, multiplied by the model's rate. A session begins when you prompt Copilot to undertake a task. In addition, each real-time steering comment made during an active session uses **one premium request** per session, multiplied by the model's rate. | Copilot cloud agent premium requests |
| [Copilot Spaces](/en/copilot/using-github-copilot/copilot-spaces/about-organizing-and-sharing-context-with-copilot-spaces) | Copilot Spaces uses **one premium request** per user prompt, multiplied by the model's rate.                                                                                                                                                                                                                     | Copilot premium requests             |
| [Spark](/en/copilot/tutorials/building-ai-app-prototypes)                                                                  | Each prompt to Spark uses a fixed rate of **four premium requests**.                                                                                                                                                                                                                                             | Spark premium requests               |
| [OpenAI Codex Visual Studio Code integration](/en/copilot/concepts/agents/openai-codex)                                    | While in preview, each prompt to OpenAI Codex uses **one premium request** multiplied by the model multiplier rates.                                                                                                                                                                                             | Copilot premium requests             |
| [Third-party coding agents](/en/copilot/concepts/agents/about-third-party-coding-agents)                                   | While in preview, each prompt to a third-party coding agent uses **one premium request**, multiplied by the model's rate.                                                                                                                                                                                        | Copilot premium requests             |

</div>

> \[!NOTE]
> Premium requests for Spark and Copilot cloud agent are tracked in dedicated SKUs from November 1, 2025. This provides better cost visibility and budget control for each AI product.

> \[!TIP]
> For instructions on viewing how many premium requests you have used and advice on how to optimize usage, see [Monitoring your GitHub Copilot usage and entitlements (legacy)](/en/copilot/how-tos/manage-and-track-spending/monitor-premium-requests).

## How do request allowances work per plan?

> \[!NOTE]
> Billing for premium requests began on June 18, 2025, for all paid Copilot plans on GitHub.com, and on August 1, 2025, on GHE.com. The request counters were only set to zero for paid plans.

If you're on a **paid plan**, you get unlimited inline suggestions. Rate limiting is in place to accommodate for high demand. See [Usage limits for GitHub Copilot](/en/copilot/concepts/rate-limits).

Paid plans also receive a monthly allowance of premium requests, which can be used for advanced chat interactions, inline suggestions using premium models, and other premium features.

<div class="ghd-tool rowheaders">

|                                                       | Copilot Pro                                                                                                                                                                                                                                                                                                             | Copilot Pro+                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pricing                                               | $10 USD per month<br>(free for some users)                                                                                                                                                                                                                                                                              | $39 USD per month                                                                                                                                                                                                                                                                                                       |
| Premium requests                                      | 300 per month                                                                                                                                                                                                                                                                                                           | 1500 per month                                                                                                                                                                                                                                                                                                          |
| Purchase additional premium requests at $0.04/request | <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-check" aria-label="Included" role="img"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg> | <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-check" aria-label="Included" role="img"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg> |

</div>

## What happens to unused requests at the end of the month?

Unused requests for the previous month do not carry over to the following month. Premium request counters reset on the 1st of each month at 00:00:00 UTC. See [Monitoring your GitHub Copilot usage and entitlements (legacy)](/en/copilot/managing-copilot/understanding-and-managing-copilot-usage/monitoring-your-copilot-usage-and-entitlements).

## What if I run out of premium requests?

> \[!NOTE]
> Additional premium requests are not available to:
>
> * Users who subscribe, or have subscribed, to Copilot Pro or Copilot Pro+ through GitHub Mobile on iOS or Android.

If you use all of your premium requests, you can still use Copilot with one of the included models for the rest of the month. This is subject to change. Response times for the included models may vary during periods of high usage. Requests to the included models may be subject to rate limiting. See [Usage limits for GitHub Copilot](/en/copilot/concepts/rate-limits).

If you need more premium requests beyond your monthly allowance set a budget for additional premium requests or upgrade to a higher plan. See [Setting up budgets to control spending on metered products](/en/billing/managing-your-billing/using-budgets-control-spending).

## Model multipliers

Each model has a premium request multiplier, based on its complexity and resource usage. Your premium request allowance is deducted according to this multiplier.

See [Model multipliers for annual plans on request-based billing (legacy)](/en/copilot/reference/copilot-billing/request-based-billing-legacy/model-multipliers-for-annual-plans).