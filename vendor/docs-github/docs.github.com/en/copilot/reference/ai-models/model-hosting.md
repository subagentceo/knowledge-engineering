# Hosting of models for GitHub Copilot

Learn how different AI models are hosted for GitHub Copilot.

GitHub Copilot can use a variety of AI models. This article explains how these models are hosted and served.

## OpenAI models

> [!IMPORTANT] GPT-5.5 is available at a promotional multiplier of 7.5x.

Used for:

* GPT-4.1
* GPT-5 mini
* GPT-5.2
* GPT-5.2-Codex
* GPT-5.3-Codex
* GPT-5.4
* GPT-5.4 mini
* GPT-5.4 nano
* GPT-5.5

These models are hosted by OpenAI and GitHub's Azure infrastructure.

OpenAI makes the [following data commitment](https://openai.com/enterprise-privacy/): _We [OpenAI] do not train models on customer business data_. Data processing follows OpenAI's enterprise privacy comments.

GitHub maintains a [zero data retention agreement](https://platform.openai.com/docs/guides/your-data) with OpenAI.

All input requests and output responses processed by GitHub Copilot's models continue to pass through GitHub Copilot's, content filtering systems. These filters include checks for public code matches (when applied) as well as mechanisms to detect and block harmful or offensive content.

## OpenAI models fine-tuned by Microsoft

Used for:

* Raptor mini
* Goldeneye

These models are deployed on GitHub managed Azure OpenAI tenant.

## Anthropic models

Used for:

* Claude Haiku 4.5
* Claude Sonnet 4.5
* Claude Opus 4.5
* Claude Opus 4.6
* Claude Opus 4.6 (fast mode) (preview)
* Claude Opus 4.7
* Claude Sonnet 4.6

These models are hosted by Amazon Web Services, Anthropic PBC, and Google Cloud Platform. GitHub has provider agreements in place to ensure data is not used for training. Additional details for each provider are included below:

* Amazon Bedrock: Amazon makes the [following data commitments](https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html): _Amazon Bedrock doesn't store or log your prompts and completions. Amazon Bedrock doesn't use your prompts and completions to train any AWS models and doesn't distribute them to third parties_.
<!-- markdownlint-disable GHD046 -->
* Anthropic PBC: GitHub maintains a [zero data retention agreement](https://privacy.anthropic.com/en/articles/8956058-i-have-a-zero-retention-agreement-with-anthropic-what-products-does-it-apply-to) with Anthropic for generally available Anthropic features in GitHub Copilot. Some Anthropic features in beta or public preview—including tool search via the Messages API—are not covered by this agreement. For these features, data may be retained by Anthropic in accordance with [Anthropic's ZDR documentation](https://platform.claude.com/docs/en/build-with-claude/zero-data-retention). GitHub will update this page as ZDR coverage changes.
<!-- markdownlint-enable GHD046 -->
* Google Cloud: [Google commits to not training on GitHub data as part of their service terms](https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance). GitHub is additionally not subject to prompt logging for abuse monitoring.

To provide better service quality and reduce latency, GitHub uses [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching). You can read more about prompt caching on [Anthropic PBC](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching), [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html), and [Google Cloud](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude-prompt-caching).

When using Claude, input prompts and output completions continue to run through GitHub Copilot's content filters for public code matching, when applied, along with those for harmful or offensive content.

## Google models

Used for:

* Gemini 2.5 Pro
* Gemini 3 Flash
* Gemini 3.1 Pro

GitHub Copilot uses Gemini 3.1 Pro, Gemini 3 Flash, and Gemini 2.5 Pro hosted on Google Cloud Platform (GCP). When using Gemini models, prompts and metadata are sent to GCP, which makes the [following data commitment](https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance): _Gemini doesn't use your prompts, or its responses, as data to train its models._

To provide better service quality and reduce latency, GitHub uses [prompt caching](https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance#customer_data_retention_and_achieving_zero_data_retention).

When using Gemini models, input prompts and output completions continue to run through GitHub Copilot's content filters for public code matching, when applied, along with those for harmful or offensive content.

## Inline suggestions

Inline suggestions, including ghost text and next edit suggestions, are powered by models hosted on Azure for Copilot Business and Copilot Enterprise plans. Copilot Free and Copilot Student user models are hosted on Fireworks AI.