# Preparing for your move to usage-based billing

If you're on a Copilot Pro or Copilot Pro+ plan, review your estimated costs under usage-based billing and take steps to prepare before the transition.

<!-- expires 2026-06-01 -->

On June 1, 2026, Copilot is moving to usage-based billing with GitHub AI Credits. Use the tool below to understand how this change affects you before the transition takes effect.

<!-- end expires 2026-06-01 -->

## Download the usage report

From the announcement banner on the premium request analytics page, click **Preview your usage** to see your options. From the dialog, click **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-download" aria-label="download icon" role="img"><path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path><path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"></path></svg> Download CSV** to request a detailed usage report. You can also request the report directly from the premium request analytics page, by clicking **Get usage report**. The report is generated asynchronously and delivered to you via email.

Alongside the existing columns for your current billing data, two additional columns show the estimated equivalent under usage-based billing:

* `aic_quantity`: The number of AI credits consumed
* `aic_gross_amount`: The estimated cost in USD under usage-based billing

## See projected spend

For a detailed breakdown, you can upload your CSV to the [billing preview tool](https://copilot-billing-preview.github.com/). The tool gives you a view of your estimated costs, including:

* A side-by-side comparison of your current billing (PRUs) and projected AI Credits (AICs), including total costs with additional usage.
* A detailed breakdown of consumed units, included discounts, and additional usage for each billing model.

> \[!NOTE]
> The billing preview tool provides estimated projections for illustrative purposes only. Actual usage may differ. Charges are calculated from actual usage emissions processed by the billing platform, separate from the preview data pipeline.

Your data stays in your browser; nothing is uploaded to a server.

## Prepare for the transition

* **Understand what consumes credits**. Copilot Chat, Copilot CLI, Copilot cloud agent, Copilot Spaces, Spark, and third-party coding agents consume AI credits. Code completions and next edit suggestions remain unlimited for all paid plans.
* **Consider your model usage**. Frontier models consume more credits per interaction than lightweight models. Switching to a lighter model for routine tasks can stretch your included usage further.

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

* [Usage-based billing for individuals](/en/copilot/concepts/billing/usage-based-billing-for-individuals)
* [Models and pricing for GitHub Copilot](/en/copilot/reference/copilot-billing/models-and-pricing)