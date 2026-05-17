# Models and pricing for GitHub Copilot

See per-token pricing for the models available in GitHub Copilot and reference rates for additional usage across plans.

<!-- expires 2026-06-01 -->

> \[!IMPORTANT] Starting June 1, 2026, GitHub is moving Copilot from request-based billing to usage-based billing. See [Usage-based billing for organizations and enterprises](/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises) and [Usage-based billing for individuals](/en/copilot/concepts/billing/usage-based-billing-for-individuals).
>
> The pricing tables below reflect the new usage-based billing rates that will take effect on June 1, 2026.

<!-- end expires 2026-06-01 -->

## How model pricing works

When you use Copilot, the interaction consumes tokens: input tokens (what's sent to the model), output tokens (what the model generates), and cached tokens (context the model reuses or stores). Each token is priced based on the model used, and the total is converted into AI credits, where 1 AI credit = $0.01 USD.

The cost of an interaction depends on two things: the model and the number of tokens consumed.

How Copilot usage is tracked and billed depends on your plan type:

* Individual plans (Copilot Free, Copilot Pro, and Copilot Pro+) include GitHub AI Credits allowances that vary by plan. For details, see [Usage-based billing for individuals](/en/copilot/concepts/billing/usage-based-billing-for-individuals).
* Copilot Business and Copilot Enterprise include per-user GitHub AI Credits allowances that are pooled at the billing entity level. For details, see [Usage-based billing for organizations and enterprises](/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises).

When usage exceeds the included allowances for any Copilot plan, additional usage is billed in GitHub AI Credits at the per-token rates shown in the pricing tables below (1 AI credit = $0.01 USD).

> \[!NOTE] The option to purchase additional AI credits is not available if you subscribe, or have subscribed, to a Copilot plan through GitHub Mobile on iOS or Android.

## Pricing tables

All prices are **per 1 million tokens**.

### OpenAI

| Model | Release status | Category | Input | Cached input | Output |
| ----- | -------------- | -------- | ----: | -----------: | -----: |
|       |                |          |       |              |        |

[^1]: GPT-4.1 and GPT-5 mini are included models.

[^2]: GPT-5.4 pricing applies to prompts with ≤272K tokens.

### Anthropic

Anthropic models include a cache write cost in addition to cached input.

| Model | Release status | Category | Input | Cached input | Cache write | Output |
| ----- | -------------- | -------- | ----: | -----------: | ----------: | -----: |
|       |                |          |       |              |             |        |

### Google

| Model | Release status | Category | Input | Cached input | Output |
| ----- | -------------- | -------- | ----: | -----------: | -----: |
|       |                |          |       |              |        |

[^5]: Gemini 2.5 Pro and Gemini 3.1 Pro pricing applies to prompts with ≤200K tokens.

[^6]: Gemini 3 Flash has no long-context surcharge.

### xAI

| Model | Release status | Category | Input | Cached input | Output |
| ----- | -------------- | -------- | ----: | -----------: | -----: |
|       |                |          |       |              |        |

### Fine-tuned (GitHub)

| Model | Release status | Category | Input | Cached input | Output |
| ----- | -------------- | -------- | ----: | -----------: | -----: |
|       |                |          |       |              |        |

[^7]: Raptor mini uses GPT-5 mini pricing.

[^8]: Goldeneye uses GPT-5.1-Codex pricing.

## Code completions

Code completions and next edit suggestions are not billed in AI credits. They remain unlimited for all paid Copilot plans and continue to use their existing counting mechanism.

## Pricing and usage cost considerations for Copilot code review

For most Copilot features, the model used for each interaction is visible to you, so you can reference the pricing tables above to estimate costs. Copilot code review is an exception—the model is selected automatically and is not disclosed, so per-token costs may vary between reviews.

Each code review is billed in two ways: token consumption is billed in AI credits, and the agentic infrastructure that powers the review consumes GitHub Actions minutes.

<!-- expires 2026-06-01 -->

**Starting June 1, 2026**, Copilot code review runs will consume GitHub Actions minutes on GitHub-hosted runners. Self-hosted runners do not consume GitHub Actions minutes. Larger runners are billed at different rates than standard GitHub-hosted runners. For more information on runner options, see [Configuring runners for GitHub Copilot code review](/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-runners).

<!-- end expires 2026-06-01 -->

You can view your current GitHub Actions usage for Copilot code review in the following ways:

* **GitHub Actions metrics**: Filter by the `copilot-pull-request-reviewer` workflow. See [Viewing GitHub Actions metrics for your organization](/en/organizations/collaborating-with-groups-in-organizations/viewing-github-actions-metrics-for-your-organization).
* **Billing usage report**: Filter by `workflow_path`. Before June 1, 2026, the value is `dynamic/copilot-pull-request-reviewer/copilot-pull-request-reviewer`. Starting June 1, 2026, the value changes to `dynamic/agents/copilot-pull-request-reviewer`. See [Billing reports reference](/en/billing/reference/billing-reports).

## Model multipliers for annual Copilot Pro and Copilot Pro+ subscribers

<!-- expires 2026-06-01 -->

Starting June 1, 2026, Copilot Pro and Copilot Pro+ subscribers who choose to remain on **existing annual billing plans** and stay on the **request-based billing** model will experience changes to model multipliers. See [Model multipliers for annual plans staying on request-based billing](/en/copilot/reference/copilot-billing/model-multipliers-for-annual-plans).

<!-- end expires 2026-06-01 -->