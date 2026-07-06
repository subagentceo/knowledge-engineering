# AI language models in VS Code

Visual Studio Code gives you access to multiple built-in language models, each optimized for different tasks. You can switch models for chat, inline suggestions, and utility tasks, and you can add more models by bringing your own API key.

For background on how language models work, their characteristics, and how to choose the right model, see Language models concepts.

## Change the model for chat

Use the language model picker in the chat input field to change the model for chat conversations and code editing.

![Screenshot that shows the model picker in the Chat view.](/assets/docs/agent-customization/language-models/model-dropdown-change-model-v2.png)

Different models have different strengths. Use a fast model for quick edits and simple questions, and a reasoning model for complex refactoring, architectural decisions, or multi-step tasks. Depending on the type of agent you are using, the list of available models might differ.

You can further extend the list of available models by using your own language model API key.

Note

In an untrusted workspace in Restricted Mode, the chat model picker only shows **Auto**. Trust the workspace to restore the full model list.

Tip

Install the AI Toolkit extension to add more language models to enhance GitHub Copilot capabilities.

For more information, see Change the chat model.

Note

If you are a Copilot Business or Enterprise user, your administrator needs to enable certain models for your organization by opting in to `Editor Preview Features` in the Copilot policy settings on GitHub.com.

## Configure thinking effort

Some models support configurable thinking effort, which controls how much reasoning the model applies to each request. For background on thinking and reasoning, see Thinking and reasoning.

By default, VS Code sets recommended effort levels and has adaptive reasoning enabled, where the model dynamically determines how much to think based on the complexity of each request. For most use cases, the defaults work well.

Tip

Higher thinking effort produces more thinking tokens, which increases AI credit consumption. Only increase thinking effort for genuinely complex tasks. Learn more about optimizing AI credit usage.

To configure the thinking effort:

1.  Open the model picker in the chat input field and select a reasoning model.
    
2.  Select the **>** arrow that appears next to the model name to open the **Thinking Effort** submenu.
    
    Note
    
    Non-reasoning models, such as GPT-4.1 and GPT-4o, do not show the thinking effort submenu.
    
3.  Select an effort level.
    
    ![Screenshot showing the Thinking Effort submenu in the model picker, with different effort levels such as None, Low, Medium, and High.](/assets/docs/agent-customization/language-models/thinking-effort-submenu.png)
    

The model picker label updates to show the selected effort level, for example "Claude Sonnet 4.6 · High". The effort level is remembered per session, so revisiting an earlier session keeps the effort level it was using. New conversations start from the effort level you last set for that model.

Note

The github.copilot.chat.anthropic.thinking.effort Open in VS Code Open in VS Code Insiders and github.copilot.chat.responsesApiReasoningEffort Open in VS Code Open in VS Code Insiders settings are deprecated. Configure thinking effort directly from the language model picker.

## Use auto model selection

With auto model selection, VS Code evaluates task complexity and real-time model availability to route each request to the optimal model. For background on how auto model selection works, see Auto model selection.

To use auto model selection, select **Auto** from the model picker in chat. You can see which model is used for generating a response by hovering over the chat response.

![Screenshot of a chat response, showing the selected model on hover.](/assets/docs/agent-customization/language-models/chat-response-selected-model.png)

## Manage language models

You can use the language models editor to view all available models, choose which models are shown in the model picker, and add more models by adding from built-in providers or from extension-provided model providers.

To open the Language Models editor, open the model picker in the Chat view and select **Manage Language Models** (gear icon) or run the **Chat: Manage Language Models** command from the Command Palette. The Language Models editor opens by default in a modal overlay on top of the editor area.

![Screenshot that shows the Language Models editor.](/assets/docs/agent-customization/language-models/language-models-editor.png)

The editor lists all models available to you, showing key information such as the model capabilities, context size, billing details, and visibility status. By default, models are grouped by provider, but you can also group them by visibility.

You can search and filter models by using the following options:

*   Text search with the search box
*   Provider: `@provider:"OpenAI"`
*   Capability: `@capability:tools`, `@capability:vision`, `@capability:agent`
*   Visibility: `@visible:true/false`

### Customize the model picker

You can customize which models are shown in the model picker by changing the visibility status of models in the Language Models editor. You can show or hide models from any provider.

Hover over a model in the list and select the eye icon to show or hide the model in the model picker.

![Screenshot that shows the Language Models editor with the eye icon to show or hide models in the model picker.](/assets/docs/agent-customization/language-models/language-models-hide.png)

### Pin favorite models

Pin models to keep them in a fixed position at the top of the model picker. Pinned models appear in a dedicated **Pinned** section and don't shift around as you use other models.

To pin or unpin a model:

1.  Open the model picker in the chat input field.
    
2.  Hover over a model and select the pin icon to add it to the **Pinned** section.
    
3.  To unpin a model, hover over it in the **Pinned** section and select the unpin icon.
    

## Bring your own language model key

Bring Your Own Key (BYOK) lets you connect to any compatible model provider while still using the VS Code chat experience and tools. You can use BYOK to access models from other providers, to run models locally, or to use models that are not yet available as built-in options in VS Code.

BYOK models work without signing into a GitHub account and without a Copilot plan. This enables you to use AI chat features entirely with your own models, including fully offline scenarios with local models such as Ollama.

You can also use these models to override the models used for utility tasks in VS Code (such as title generation and intent detection).

Note

Some features still require a GitHub account: semantic search, inline suggestions (code completions), and features that rely on embeddings. BYOK applies to the chat experience and utility tasks only.

VS Code provides different options to add more language models:

*   Built-in providers: The provider you want is already listed (Azure, Anthropic, Gemini, OpenAI, and others).
    
*   Extensions: A marketplace extension provides the model, for example AI Toolkit for local models.
    
*   Custom endpoint: You have a self-hosted, enterprise, or other endpoint that speaks Chat Completions, Responses, or Messages API.
    

Note

If you are a Copilot Business or Enterprise user, your administrator can disable the **Bring Your Own Language Model Key in VS Code** policy in the Copilot policy settings on GitHub.com. For more details, see the GitHub Copilot documentation.

### Add a model from a built in provider

Pick from a set of common providers that are ready to use in VS Code. Depending on the provider, you need an API key and other configuration details like the endpoint URL.

Important

The built-in Ollama provider is deprecated. For local Ollama models, install the official Ollama extension from the Ollama publisher on the Visual Studio Marketplace instead. The extension is maintained by the Ollama team, so it can support new Ollama models and capabilities faster than the built-in provider. If you use the built-in Ollama provider for BYOK local models, install the extension and remove the built-in provider configuration to keep using Ollama models without interruption.

To configure a language model from a built-in provider:

1.  Open the Language Models editor by selecting **Manage Language Models** (gear icon) from the language model picker or via the **Chat: Manage Language Models** command from the Command Palette.
    
2.  Select **Add Models**, and then select a model provider from the list.
    
    ![Screenshot that shows the model provider Quick Pick.](/assets/docs/agent-customization/language-models/model-provider-quick-pick-v2.png)
    
3.  Enter a group name for the models. This is the grouping label shown in the model picker and Language Models editor.
    
    You can change the group name later from the Language Models editor if needed.
    
4.  Enter the provider-specific details, such as the API key or endpoint URL.
    
5.  If the provider requires additional configuration, VS Code opens a `chatLanguageModels.json` file where you can configure the provider and model details. See the Model configuration reference for details on the configuration properties.
    
    The following example shows an Azure OpenAI configuration that uses Entra ID authentication:
    
    ```
    [
      {
        "name": "Azure",
        "vendor": "azure",
        "models": [
          {
            "id": "<my-deployment-name>",
            "name": "GPT-5.5",
            "url": "https://<my-endpoint>.openai.azure.com",
            "toolCalling": true,
            "vision": true,
            "maxInputTokens": 200000,
            "maxOutputTokens": 64000
          }
        ]
      }
    ]
    ```
    
6.  After configuring the model, you can now select it from the model picker in chat.
    
    For a model to be available when using agents in chat, it must support tool calling. If the model doesn't support tool calling, it won't be shown in the model picker.
    

### Add a model provider extension

You can install extensions from the Visual Studio Marketplace that add language model providers to VS Code. These extensions can provide access to additional cloud-hosted or locally running models. For example, the Foundry Toolkit for VS Code extension provides access to Foundry's local and cloud-hosted models.

To add a model provider extension:

1.  Open the Language Models editor by selecting **Manage Language Models** (gear icon) from the language model picker or via the **Chat: Manage Language Models** command from the Command Palette.
    
2.  Select **Install Model Providers**.
    
    VS Code opens the Extensions view, filtered to language model provider extensions. Alternatively, open the Extensions view and search for `@tag:language-models`.
    
3.  Select **Install** to install the extension, for example, Foundry Toolkit for VS Code.
    
4.  Follow the extension's setup instructions to configure model access.
    
5.  The extension's models appear in the model picker in chat and in the Language Model editor. If the models don't appear, reload VS Code.
    

### Add a custom endpoint model

Note

It replaces the deprecated OpenAI Compatible provider and supports additional API types. The github.copilot.chat.customOAIModels Open in VS Code Open in VS Code Insiders setting is deprecated.

The Custom Endpoint provider lets you connect any compatible API endpoint to chat in VS Code. It supports three API types, which you can select per model: Chat Completions, Responses, and Messages.

To add a model with the Custom Endpoint provider:

1.  Open the Language Models editor by selecting **Manage Language Models** (gear icon) from the language model picker or via the **Chat: Manage Language Models** command from the Command Palette.
    
2.  Select **Add Models**, and then select **Custom Endpoint** from the list.
    
3.  Enter a group name for the models. This is the grouping label shown in the model picker and Language Models editor.
    
    You can change the group name later from the Language Models editor if needed.
    
4.  Enter a display name and API key for the endpoint.
    
5.  Select the API type: **Chat Completions**, **Responses**, or **Messages**. Make sure the model supports this API type.
    
6.  VS Code opens a `chatLanguageModels.json` file where you can configure the model details. Update the model properties and save the file. See the Model configuration reference for details on the configuration properties.
    
    The following example shows a Messages API configuration for an Anthropic endpoint:
    
    ```
    [
      {
        "name": "Anthropic",
        "vendor": "customendpoint",
        "apiKey": "YOUR_API_KEY",
        "apiType": "messages",
        "models": [
          {
            "id": "claude-sonnet-4-6",
            "name": "Claude Sonnet 4.6",
            "url": "https://api.anthropic.com/v1/messages",
            "toolCalling": true,
            "vision": true,
            "maxInputTokens": 200000,
            "maxOutputTokens": 64000
          }
        ]
      }
    ]
    ```
    
7.  After configuring the model, select it from the model picker in chat.
    
    Tip
    
    If the model you added does not immediately appear in the model picker, restart VS Code.
    

## Update model provider details

To update the details of a model provider you configured previously:

1.  Select **Manage Language Models** (gear icon) from the language model picker in the Chat view or run the **Chat: Manage Language Models** command from the Command Palette.
    
2.  In the Language Models editor, select the gear icon next to the model provider you want to update.
    
    ![Screenshot that shows the model provider Quick Pick, with a gear icon next to the provider name.](/assets/docs/agent-customization/language-models/reconfigure-model-provider.png)
    
3.  Update the provider details, such as the API key or endpoint URL.
    

## Configure models for other features

In addition to the main chat model, you can configure which model is used for inline chat, inline suggestions, and background utility tasks.

### Change the model for inline chat

You can configure a default language model for editor inline chat. This enables you to use a different model for inline chat than for chat conversations.

To configure the default model for inline chat, use the inlineChat.defaultModel Open in VS Code Open in VS Code Insiders setting. The setting lists all available models from the model picker.

If you change the model during an inline chat session, the selection persists for the remainder of the session. After you reload VS Code, the model resets to the value specified in the inlineChat.defaultModel Open in VS Code Open in VS Code Insiders setting.

### Change the model for inline suggestions

To change the language model that is used for generating inline suggestions in the editor:

1.  Select **Configure Inline Suggestions...** from the Chat menu in the VS Code title bar.
    
2.  Select **Change Completions Model...**, and then select one of the models from the list.
    

Note

The list of available models might vary and change over time. When no alternative models are available, the option to change the model is not available.

If you are a Copilot Business or Enterprise user, your Administrator needs to enable certain models for your organization by opting in to `Editor Preview Features` in the Copilot policy settings on GitHub.com.

### Change the model for utility tasks

In addition to the main chat model, VS Code uses lightweight models in the background for utility tasks such as generating titles, creating commit messages, and detecting intent. By default, these tasks use built-in utility models provided by GitHub Copilot. You can override which model is used for these tasks with any available model, including BYOK and extension-provided models.

There are two settings for utility models, depending on the type of task:

*   chat.utilityModel Open in VS Code Open in VS Code Insiders : Override the model used for general utility flows, such as generating titles and summaries, settings search, and Git review.
*   chat.utilitySmallModel Open in VS Code Open in VS Code Insiders : Override the model used for fast, lightweight utility flows, such as commit messages, rename suggestions, branch name generation, prompt categorization, and intent detection. A fast and inexpensive model is recommended for this setting.

Both settings default to **Default**, which uses the built-in utility model from GitHub Copilot.

If you use BYOK models without signing into a GitHub account, the built-in utility models are not available. VS Code shows a notification in the Chat view that prompts you to configure utility models. Set chat.utilityModel Open in VS Code Open in VS Code Insiders and chat.utilitySmallModel Open in VS Code Open in VS Code Insiders to a BYOK model to enable utility features like title generation and commit message creation.

## Model configuration reference

When you add BYOK model, you can configure the model properties in the `chatLanguageModels.json` file. The configuration has two levels: provider-level and model-level.

Depending on the provider, some provider and model properties might be required while others are optional. For example, some providers only require an API key and endpoint URL and discover the available models automatically, while others require you to specify the details for each model.

The provider-level properties include:

Property

Description

`vendor`

The provider of the model, for example `azure`, `openai`, `customendpoint`

`name`

The display name (group name) of the provider shown in the UI.

`models`

_(Optional)_ An array of model configurations provided by this provider.

Each model in the `models` array supports the following properties:

Property

Description

`id`

Model identifier sent to the API. For example, for Foundry this is the deployment name.

`name`

Display name shown in the model picker.

`url`

Full endpoint URL for the model.

`apiType`

_(Optional)_ Override the API type per model (`chat-completions`, `responses`, or `messages`). Defaults to the provider-level `apiType`.

`toolCalling`

Set to `true` if the model supports tool calling.

`vision`

Set to `true` if the model supports image inputs.

`maxInputTokens`

Maximum number of input tokens the model accepts. Together with `maxOutputTokens`, this defines the model's context window.

`maxOutputTokens`

Maximum number of output tokens the model generates. Together with `maxInputTokens`, this defines the model's context window.

`editTools`

_(Optional)_ An array of edit tools the model supports. If not configured, the editor tries multiple edit tools and picks the best one. Possible values: `find-replace`, `multi-find-replace`, `apply-patch`, `code-rewrite`.

`thinking`

_(Optional)_ Set to `true` if the model supports thinking capabilities. Defaults to `false`.

`streaming`

_(Optional)_ Set to `true` if the model supports streaming responses. Defaults to `true`.

`zeroDataRetentionEnabled`

_(Optional)_ Set to `true` if Zero Data Retention (ZDR) is enabled for this endpoint. When enabled, `previous_response_id` is not sent in requests via the Responses API. Defaults to `false`.

`supportsReasoningEffort`

_(Optional)_ An array of reasoning effort levels the model accepts (for example, `["low", "medium", "high"]`). When set, a **Thinking Effort** picker is shown in the model picker. Common levels are `minimal`, `low`, `medium`, `high`.

`reasoningEffortFormat`

_(Optional)_ Body shape used to forward reasoning effort to the model. `chat-completions` sends a top-level `reasoning_effort` string. `responses` sends a nested `reasoning.effort` object. When unset, the format follows the URL.

`requestHeaders`

_(Optional)_ An object of additional HTTP headers to include with requests to this model. Certain reserved headers (forbidden, forwarding, and internal headers) are not allowed and are ignored if present.

Note

The sum of `maxInputTokens` and `maxOutputTokens` must not exceed the model's context window. VS Code uses the sum of these two values as the model's total context window, for example to show context usage in the Chat view. Typically, you set `maxInputTokens` to the model's context window size minus `maxOutputTokens`. Check your provider's model documentation for the context window size.

## Frequently asked questions

### How do I enable bring your own model key for Copilot Business or Copilot Enterprise?

If you are a Copilot Business or Enterprise user, your organization administrator must enable the **Bring Your Own Language Model Key in VS Code** policy in the Copilot policy settings on GitHub.com. After the policy is enabled, you can use your own API keys to add models, just like individual plan users. For more details, see the GitHub Copilot documentation.

### Can I use locally hosted models with Copilot in VS Code?

You can use locally hosted models in chat by using bring your own model key (BYOK) and using a model provider that supports connecting to a local model. You have different options to connect to a local model:

*   Use a built-in model provider that supports local models
*   Install an extension from the Visual Studio Marketplace, for example, AI Toolkit for VS Code with Foundry Local

Locally hosted models work without a GitHub account, without a Copilot plan, and without an internet connection. To get the full set of utility features (title generation, commit messages, and others), configure chat.utilityModel Open in VS Code Open in VS Code Insiders and chat.utilitySmallModel Open in VS Code Open in VS Code Insiders to point to a local model.

Currently, you cannot connect to a local model for inline suggestions. VS Code provides an extension API `InlineCompletionItemProvider` that enables extensions to contribute a custom completion provider. You can get started with our Inline Completions sample.

Note

Some features require a GitHub account and internet connectivity: semantic search, inline suggestions (code completions), and features that rely on embeddings. These features are not available through BYOK models.

### Can I use a local model without an internet connection?

Yes, you can use a local model completely offline. Add a local model provider such as Ollama by using the **Chat: Manage Language Models** command, select the model in chat, and start using it. To also enable utility features like title generation and commit messages, set chat.utilityModel Open in VS Code Open in VS Code Insiders and chat.utilitySmallModel Open in VS Code Open in VS Code Insiders to a local model. Features that depend on the GitHub Copilot service, such as semantic search, inline suggestions, and embeddings, are not available offline.

### Can I use a local model without a Copilot plan?

Yes, you can use BYOK models, including local models, without a Copilot plan and without signing into a GitHub account. Add a model with the **Chat: Manage Language Models** command and select it in chat. Features that depend on the GitHub Copilot service, such as semantic search, inline suggestions, and embeddings, require a Copilot plan.

## Related resources

*   Language models concepts
*   Available language models in GitHub Copilot
*   Choosing the right AI model for your task
*   Security considerations for AI in VS Code

7/1/2026