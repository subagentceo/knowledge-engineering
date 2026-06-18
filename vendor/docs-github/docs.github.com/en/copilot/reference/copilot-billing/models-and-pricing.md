# Models and pricing for GitHub Copilot

See per-token pricing for the models available in GitHub Copilot and reference rates for additional usage across plans.

## How model pricing works

When you use Copilot, the interaction consumes tokens: input tokens (what's sent to the model), output tokens (what the model generates), and cached tokens (context the model reuses or stores). Each token is priced based on the model used, and the total is converted into AI credits, where 1 AI credit = $0.01 USD.

The cost of an interaction depends on two things: the model and the number of tokens consumed.

How Copilot usage is tracked and billed depends on your plan type:

* Individual plans (Copilot Free, Copilot Pro, Copilot Pro+, and Copilot Max) include GitHub AI Credits allowances that vary by plan. For details, see [Usage-based billing for individuals](/en/copilot/concepts/billing/usage-based-billing-for-individuals).
* Copilot Business and Copilot Enterprise include per-user GitHub AI Credits allowances that are pooled at the billing entity level. For details, see [Usage-based billing for organizations and enterprises](/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises).

When usage exceeds the included allowances for any Copilot plan, additional usage is billed in GitHub AI Credits at the per-token rates shown in the pricing tables below (1 AI credit = $0.01 USD).

> \[!NOTE] The option to purchase additional AI credits is not available if you subscribe, or have subscribed, to a Copilot plan through GitHub Mobile on iOS or Android.

## Pricing tables

All prices are **per 1 million tokens**.

### OpenAI

> \[!NOTE] Models with a **Long context** tier, offer extended capabilities and longer context windows. See [Supported AI models in GitHub Copilot](/en/copilot/reference/ai-models/supported-models#models-with-extended-capabilities)

| Model         | Release status | Category    | Tier         | Threshold (input tokens) |  Input | Cached input | Output |
| ------------- | -------------- | ----------- | ------------ | ------------------------ | -----: | -----------: | -----: |
|               |                |             |              |                          |        |              |        |
| GPT-5 mini    | GA             | Lightweight | Default      | Not applicable           |  $0.25 |       $0.025 |  $2.00 |
|               |                |             |              |                          |        |              |        |
| GPT-5.3-Codex | GA             | Powerful    | Default      | Not applicable           |  $1.75 |       $0.175 | $14.00 |
|               |                |             |              |                          |        |              |        |
| GPT-5.4       | GA             | Versatile   | Default      | ≤ 272K                   |  $2.50 |        $0.25 | $15.00 |
|               |                |             |              |                          |        |              |        |
| GPT-5.4       | GA             | Versatile   | Long context | > 272K                   |  $5.00 |        $0.50 | $22.50 |
|               |                |             |              |                          |        |              |        |
| GPT-5.4 mini  | GA             | Lightweight | Default      | Not applicable           |  $0.75 |       $0.075 |  $4.50 |
|               |                |             |              |                          |        |              |        |
| GPT-5.4 nano  | GA             | Lightweight | Default      | Not applicable           |  $0.20 |        $0.02 |  $1.25 |
|               |                |             |              |                          |        |              |        |
| GPT-5.5       | GA             | Powerful    | Default      | ≤ 272K                   |  $5.00 |        $0.50 | $30.00 |
|               |                |             |              |                          |        |              |        |
| GPT-5.5       | GA             | Powerful    | Long context | > 272K                   | $10.00 |        $1.00 | $45.00 |
|               |                |             |              |                          |        |              |        |

### Anthropic

Anthropic models include a cache write cost in addition to cached input.

> \[!NOTE] Claude Fable 5 is currently unavailable. For more information, see [Anthropic's announcement](https://www.anthropic.com/news/fable-mythos-access).

| Model             | Release status | Category  |  Input | Cached input | Cache write | Output |
| ----------------- | -------------- | --------- | -----: | -----------: | ----------: | -----: |
|                   |                |           |        |              |             |        |
| Claude Haiku 4.5  | GA             | Versatile |  $1.00 |        $0.10 |       $1.25 |  $5.00 |
|                   |                |           |        |              |             |        |
| Claude Sonnet 4   | GA             | Versatile |  $3.00 |        $0.30 |       $3.75 | $15.00 |
|                   |                |           |        |              |             |        |
| Claude Sonnet 4.5 | GA             | Versatile |  $3.00 |        $0.30 |       $3.75 | $15.00 |
|                   |                |           |        |              |             |        |
| Claude Sonnet 4.6 | GA             | Versatile |  $3.00 |        $0.30 |       $3.75 | $15.00 |
|                   |                |           |        |              |             |        |
| Claude Opus 4.5   | GA             | Powerful  |  $5.00 |        $0.50 |       $6.25 | $25.00 |
|                   |                |           |        |              |             |        |
| Claude Opus 4.6   | GA             | Powerful  |  $5.00 |        $0.50 |       $6.25 | $25.00 |
|                   |                |           |        |              |             |        |
| Claude Opus 4.7   | GA             | Powerful  |  $5.00 |        $0.50 |       $6.25 | $25.00 |
|                   |                |           |        |              |             |        |
| Claude Opus 4.8   | GA             | Powerful  |  $5.00 |        $0.50 |       $6.25 | $25.00 |
|                   |                |           |        |              |             |        |
| Claude Fable 5    | GA             | Powerful  | $10.00 |        $1.00 |      $12.50 | $50.00 |
|                   |                |           |        |              |             |        |

### Google

> \[!NOTE] Models with a **Long context** tier, offer extended capabilities and longer context windows. See [Supported AI models in GitHub Copilot](/en/copilot/reference/ai-models/supported-models#models-with-extended-capabilities)

| Model            | Release status | Category    | Tier         | Threshold (input tokens) | Input | Cached input | Output |
| ---------------- | -------------- | ----------- | ------------ | ------------------------ | ----: | -----------: | -----: |
|                  |                |             |              |                          |       |              |        |
| Gemini 2.5 Pro   | GA             | Powerful    | Default      | Not applicable           | $1.25 |       $0.125 | $10.00 |
|                  |                |             |              |                          |       |              |        |
| Gemini 3 Flash   | Public preview | Lightweight | Default      | Not applicable           | $0.50 |        $0.05 |  $3.00 |
|                  |                |             |              |                          |       |              |        |
| Gemini 3.1 Pro   | Public preview | Powerful    | Default      | ≤ 200K                   | $2.00 |        $0.20 | $12.00 |
|                  |                |             |              |                          |       |              |        |
| Gemini 3.1 Pro   | Public preview | Powerful    | Long context | > 200K                   | $4.00 |        $0.40 | $18.00 |
|                  |                |             |              |                          |       |              |        |
| Gemini 3.5 Flash | GA             | Lightweight | Default      | Not applicable           | $1.50 |        $0.15 |  $9.00 |
|                  |                |             |              |                          |       |              |        |

### Fine-tuned (GitHub)

| Model       | Release status | Category  | Input | Cached input | Output |
| ----------- | -------------- | --------- | ----: | -----------: | -----: |
|             |                |           |       |              |        |
| Raptor mini | Public preview | Versatile | $0.25 |       $0.025 |  $2.00 |
|             |                |           |       |              |        |

### Microsoft

| Model            | Release status | Category    | Input | Cached input | Output |
| ---------------- | -------------- | ----------- | ----: | -----------: | -----: |
|                  |                |             |       |              |        |
| MAI-Code-1-Flash | GA             | Lightweight | $0.75 |       $0.075 |  $4.50 |
|                  |                |             |       |              |        |

## Code completions

Code completions and next edit suggestions are not billed in AI credits. They remain unlimited for all paid Copilot plans and continue to use their existing counting mechanism.

## Pricing and usage cost considerations for Copilot code review

For most Copilot features, the model used for each interaction is visible to you, so you can reference the pricing tables above to estimate costs. Copilot code review is an exception—the model is selected automatically and is not disclosed, so per-token costs may vary between reviews.

Each code review is billed in two ways: token consumption is billed in AI credits, and the agentic infrastructure that powers the review consumes GitHub Actions minutes.

GitHub Actions minutes are attributed to the repository, and from there to the enterprise or cost center where applicable. AI credits are charged to the person who requests the review, or to the author of a pull request where a policy automatically triggers a review. If neither has a Copilot seat, usage is billed to the enterprise or cost center instead.

You can view your current GitHub Actions usage for Copilot code review in the following ways:

* **GitHub Actions metrics**: Filter by the `copilot-pull-request-reviewer` workflow. See [Viewing GitHub Actions metrics for your organization](/en/organizations/collaborating-with-groups-in-organizations/viewing-github-actions-metrics-for-your-organization).
* **Billing usage report**: Filter by `workflow_path` using the value `dynamic/agents/copilot-pull-request-reviewer`. See [Billing reports reference](/en/billing/reference/billing-reports).

## Model multipliers for annual Copilot Pro and Copilot Pro+ subscribers

Copilot Pro and Copilot Pro+ subscribers on **existing annual billing plans** using the **request-based billing** model have different model multipliers. See [Model multipliers for annual plans on request-based billing (legacy)](/en/copilot/reference/copilot-billing/model-multipliers-for-annual-plans).