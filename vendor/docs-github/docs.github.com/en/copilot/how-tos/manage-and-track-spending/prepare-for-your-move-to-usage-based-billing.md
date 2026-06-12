# Usage-based billing for individuals

Your Copilot plan includes a monthly allowance of GitHub AI Credits. If you exhaust your AI credits, you can pay extra to keep working.

Copilot usage is measured in AI credits. All Copilot plans include a monthly allowance of AI credits. If you use up all of the credits included in your plan, you can purchase more and keep working.

## What are GitHub AI Credits?

When you use Copilot, the interaction consumes tokens: input tokens (what's sent to the model), output tokens (what the model generates), and cached tokens (context the model reuses or stores). Each token is priced based on the model used.

The cost of an interaction therefore depends on two things:

* The **model** used
* The **number of tokens** consumed

This total is converted into **AI credits** (1 AI credit = $0.01 USD).

For example:

* A quick question in Copilot Chat using a lightweight model might cost a fraction of an AI credit.
* A long Copilot cloud agent session using a frontier model across multiple files will cost more AI credits, because it's doing more work.

To view Copilot's supported models and their pricing, see [Models and pricing for GitHub Copilot](/en/copilot/reference/copilot-billing/models-and-pricing).

## How do AI credits work?

All individual plans—Copilot Free, Copilot Pro, Copilot Pro+, and Copilot Max—include a monthly GitHub AI Credits allowance that varies by plan.

Each paid plan includes the following:

* **Base credits**: These are included with your plan subscription each month. These match with your subscription price and they never change.
* **Flex allotment**: This is an additional monthly amount on top of your base credits. The flex allotment is a variable part of your included usage; it is designed to adapt as the economics of AI evolve, including model pricing, new models, and improvements in efficiency.

Your base credits are used first. If you go beyond your base credits, the flex allotment is applied automatically at the same rates across your IDE, GitHub.com, and Copilot CLI. No additional setup is required. Your usage dashboard shows your available allowance and what you've used.

### GitHub AI Credits allowance by plan

The following table shows what's included with each paid plan.

| Plan         | Price per month | Base credits | Flex allotment | Total monthly AI credits |
| ------------ | --------------- | ------------ | -------------- | ------------------------ |
| Copilot Pro  | $10 USD         | 1,000        | 500            | 1,500                    |
| Copilot Pro+ | $39 USD         | 3,900        | 3,100          | 7,000                    |
| Copilot Max  | $100 USD        | 10,000       | 10,000         | 20,000                   |

Copilot Free and Copilot Student both have an allowance of AI credits and access to select models. Copilot Free includes 2000 code completions per month and Copilot Student includes unlimited code completions.

If you use everything included in your plan, you can purchase more and keep working. See [What happens if I exceed my included AI credits](#what-happens-if-i-exceed-my-included--data-variablesproductprodname_ai_credits_short-).

## What is billed in AI credits?

Copilot features that use AI models consume AI credits, such as:

* Copilot Chat
* Copilot CLI
* Copilot cloud agent
* Copilot Spaces
* Spark
* Third-party coding agents

Code completions and next edit suggestions are not billed in AI credits and remain unlimited for all paid plans.

## What affects my usage?

More complex interactions consume more of your usage allowance. The main factors are:

* **Conversation length and complexity**: Longer conversations and more elaborate tasks involve more back-and-forth with the model, consuming more.
* **Agentic features**: Features like agent mode and Copilot cloud agent can involve multiple model calls within a single task. A complex agentic session working across a large codebase will consume significantly more usage than a quick question in chat.
* **Model choice**: Different models have different costs per token. More capable models designed for complex reasoning cost more than lighter models suited to quick tasks. Switching to a less expensive model is one way to extend your usage allowance.

> \[!NOTE] If you are on a paid Copilot plan, you qualify for a 10% discount on model costs while using auto model selection in Copilot Chat, Copilot CLI, or Copilot cloud agent.

## What happens if I exceed my included AI credits?

When your AI credits are exhausted, you can:

* Set a budget for additional usage and pay extra to continue working
* Wait until the next monthly cycle when your included usage resets

Your additional usage budget is set in US dollars, and your usage is shown in GitHub AI Credits. GitHub AI Credits draw down your budget at a fixed rate: 1 AI credits = $0.01 USD, so a $10 budget covers 1,000 AI credits.

> \[!NOTE] Additional usage may be capped. If you use all AI credits available on your plan, we recommend upgrading to a higher plan.

To set up a budget for GitHub AI Credits, see [Setting up budgets to control spending on metered products](/en/billing/how-tos/set-up-budgets#managing-budgets-for-your-personal-account).

## About changes to your Copilot plan

If you have an active Copilot Pro, Copilot Pro+, or Copilot Max plan, and are then assigned a seat as part of a Copilot Business or Copilot Enterprise plan, your personal Copilot plan will be automatically canceled. You will receive a prorated refund for any remaining portion of your personal plan's current billing cycle. You will then be able to continue using Copilot according to the policies set by your company.

You can cancel your Copilot plan at any time. The cancellation will take effect at the end of your current billing cycle. See [Viewing and changing your GitHub Copilot plan](/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-your-copilot-subscription/canceling-copilot-as-an-individual-user).

## Determining your billing date

Your billing date will depend on whether or not you are already being billed by GitHub.

* **If you are not already being billed by GitHub**, in most cases your billing cycle will start on the day you sign up for Copilot. For example, if you sign up on 3 September, with monthly billing, your initial billing cycle will run from 3 September until and including 2 October, and then on the same days of subsequent months.
* **If you already have a billing cycle**, billing for Copilot will be included in your next bill. You will be charged on a pro rata basis for that initial period.

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

## Further reading

* [Plans for GitHub Copilot](/en/copilot/about-github-copilot/subscription-plans-for-github-copilot)
* [Manage your GitHub Copilot account](/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-your-copilot-subscription)
* [Managing your payment and billing information](/en/billing/managing-your-billing/managing-your-payment-and-billing-information)