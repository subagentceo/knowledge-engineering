# Supported AI models in GitHub Copilot

Learn about the supported AI models in GitHub Copilot.

GitHub Copilot supports multiple models, each with different strengths. Some models prioritize speed and cost-efficiency, while others are optimized for accuracy, reasoning, or working with multimodal inputs (like images and code together).

Depending on your Copilot plan and where you're using it—such as GitHub.com or an IDE—you may have access to different models.

> \[!NOTE]
>
> * Model availability is subject to change. Some models may be replaced or updated over time.
> * In Visual Studio Code you can add more models than those that are available by default with your Copilot subscription. See [Changing the AI model for GitHub Copilot Chat](/en/copilot/how-tos/use-ai-models/change-the-chat-model?tool=vscode#adding-more-models).

For all of the default AI models, input prompts and output completions run through GitHub Copilot's content filters for harmful, offensive, or off-topic content, and for public code matching when enabled.

## Supported AI models in Copilot

This table lists the AI models available in Copilot, along with their release status and availability in different modes.

<div class="ghd-tool rowheaders">

| Model name | Provider | Release status | Agent mode | Ask mode | Edit mode |
| ---------- | -------- | -------------- | ---------- | -------- | --------- |
|            |          |                |            |          |           |

</div>

## Supported AI models in Auto model selection

This table lists the supported AI models for Auto model selection. Available models may be limited by model policies, including policies restricting Copilot to data-resident or FedRAMP-compliant models.

<div class="ghd-tool rowheaders">

| Model | Copilot cloud agent | Copilot Chat | Copilot CLI |
| ----- | ------------------- | ------------ | ----------- |
|       |                     |              |             |

</div>

## Model retirement history

The following table lists AI models that are retired or scheduled for retirement from Copilot, along with their retirement dates and suggested alternatives.

<div class="ghd-tool rowheaders">

| Model name | Retirement date | Suggested alternative |
| ---------- | --------------- | --------------------- |
|            |                 |                       |

</div>

## Supported AI models per client

The following table shows which models are available in each client.

> \[!NOTE]
> When you use Copilot Chat in supported IDEs, **Auto** will automatically select the best model for you based on availability. You can manually choose a different model to override this selection. See [About Copilot auto model selection](/en/copilot/concepts/auto-model-selection) and [Changing the AI model for GitHub Copilot Chat](/en/copilot/how-tos/use-ai-models/change-the-chat-model?tool=vscode).

<div class="ghd-tool rowheaders">

| Model | GitHub.com | Copilot CLI | Visual Studio Code | Visual Studio | Eclipse | Xcode | JetBrains IDEs |
| ----- | ---------- | ----------- | ------------------ | ------------- | ------- | ----- | -------------- |
|       |            |             |                    |               |         |       |                |

</div>

## Minimum IDE versions for recent models

Some Copilot models require minimum versions of supported IDEs or Copilot extensions or plugins. The table below lists the minimum versions known from changelog entries or provided release guidance. This information is tentative and subject to change as model support rolls out. For best results, keep your IDE and Copilot extension or plugin updated to the latest available version.

<div class="ghd-tool rowheaders">

| Model          | Visual Studio Code   | Visual Studio                    | JetBrains IDEs     | Xcode              | Eclipse            |
| -------------- | -------------------- | -------------------------------- | ------------------ | ------------------ | ------------------ |
| Gemini 3 Flash | `v1.115.0` and later | `17.14.22` or `18.1.0` and later | `1.5.62` and later | `0.46.0` and later | `0.14.0` and later |
| Gemini 3.1 Pro | `v1.115.0` and later | `17.14.22` or `18.1.0` and later | `1.5.62` and later | `0.46.0` and later | `0.14.0` and later |
| GPT-5.2-Codex  | No minimum listed    | `17.14.19` or `18.0.0` and later | `1.5.61` and later | `0.45.0` and later | `0.13.0` and later |
| GPT-5.3-Codex  | `v1.104.1` and later | `17.14.19` and later             | `1.5.61` and later | `0.45.0` and later | `0.13.0` and later |
| GPT-5.4        | `v1.104.1` and later | `17.14.19` and later             | `1.5.66` and later | `0.47.0` and later | `0.15.0` and later |
| GPT-5.4 mini   | `v1.104.1` and later | `17.14.19` and later             | `1.5.66` and later | `0.47.0` and later | `0.15.0` and later |
| GPT-5.5        | `v1.117` and later   | `17.14.19` and later             | `1.5.66` and later | `0.47.0` and later | `0.15.0` and later |

</div>

> \[!NOTE]
>
> * For GPT-5.3-Codex in Visual Studio Code, `v1.108` and later provide improved prompting and response quality.
> * "No minimum listed" means the reviewed changelog or release guidance did not specify a minimum version, not that all older versions are supported.
> * Even when a model appears in the model picker on older supported versions, prompting and model behavior may work best with the latest IDE and Copilot extension or plugin versions.

## Supported AI models per Copilot plan

The following table shows which AI models are available in each Copilot plan. For more information about the plans, see [Plans for GitHub Copilot](/en/copilot/about-github-copilot/plans-for-github-copilot).

<!-- expires 2026-05-23 -->

> \[!NOTE] For Copilot Student, GPT-5.3-Codex is not available in the model picker, but remains available through auto model selection.

<!-- end expires 2026-05-23 -->

<div class="ghd-tool rowheaders">

| Available models in chat | Copilot Free | Copilot Student | Copilot Pro | Copilot Pro+ | Copilot Business | Copilot Enterprise |
| ------------------------ | ------------ | --------------- | ----------- | ------------ | ---------------- | ------------------ |
|                          |              |                 |             |              |                  |                    |

</div>

[^gpt54nano]: GPT-5.4 nano is currently only available in the Codex Visual Studio Code extension (Copilot Pro+ only) and is not available in Copilot Chat.

## Model multipliers

<!-- expires 2026-06-01 -->

> \[!IMPORTANT] Starting June 1, 2026, GitHub is moving Copilot from request-based billing to usage-based billing. See [Usage-based billing for organizations and enterprises](/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises) and [Usage-based billing for individuals](/en/copilot/concepts/billing/usage-based-billing-for-individuals).

<!-- end expires 2026-06-01 -->

> \[!NOTE]
> The multiplier for these models are subject to change.
>
> * Claude Sonnet 4.6
> * GPT-5.4 mini

> \[!IMPORTANT] GPT-5.5 is available at a promotional multiplier of 7.5x.

Each model has a premium request multiplier, based on its complexity and resource usage. If you are on a paid Copilot plan, your premium request allowance is deducted according to this multiplier.

For more information about premium requests, see [Requests in GitHub Copilot](/en/copilot/managing-copilot/monitoring-usage-and-entitlements/about-premium-requests).

<div class="ghd-tool rowheaders">

| Model | Multiplier for **paid plans** | Multiplier for **Copilot Free** |
| ----- | ----------------------------- | ------------------------------- |
|       |                               |                                 |

</div>

## Fallback and long-term support (LTS) models

For more information about fallback and LTS models, see [Base and long-term support (LTS) models](/en/copilot/concepts/fallback-and-lts-models).

## Evaluation models

GitHub Copilot offers access to evaluation models—including top-performing open source and open-weight models—to provide the most advanced coding suggestions available.

> \[!NOTE]
> Testing of evaluation models has revealed that some may perform worse than other models on security-related or other categories of prompts. Customers are encouraged to validate code, including code security, using a range of models and thorough human review before incorporating suggestions into production.

Evaluation models may be added, updated, or removed without notice. Availability and rate limits may differ from generally available models.

## Next steps

* For task-based guidance on selecting a model, see [AI model comparison](/en/copilot/reference/ai-models/model-comparison).
* To configure which models are available to you, see [Configuring access to AI models in GitHub Copilot](/en/copilot/using-github-copilot/ai-models/configuring-access-to-ai-models-in-copilot).
* To learn how to change your current model, see [Changing the AI model for GitHub Copilot Chat](/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat) or [Changing the AI model for GitHub Copilot inline suggestions](/en/copilot/how-tos/use-ai-models/change-the-completion-model).
* To learn more about Responsible Use and Responsible AI, see [Copilot Trust Center](https://copilot.github.trust.page/) and [Responsible use of GitHub Copilot features](/en/copilot/responsible-use-of-github-copilot-features).
* To learn how Copilot Chat serves different AI models, see [Hosting of models for GitHub Copilot](/en/copilot/reference/ai-models/model-hosting).