



Explore the docs [#explore-the-docs]

<Cards>
  <Card title="Developer" description="Build with LM Studio's local REST API, OpenAI-compatible APIs, and developer tooling." href="/docs/developer" icon="getDocsSectionIcon(&#x22;developer&#x22;)" />

  <Card title="Python SDK" description="Use lmstudio-python to load models, generate text, embed content, and build agents." href="/docs/python" icon="getDocsSectionIcon(&#x22;python&#x22;)" />

  <Card title="TypeScript SDK" description="Use lmstudio-js in Node.js or TypeScript apps for local model workflows and plugins." href="/docs/typescript" icon="getDocsSectionIcon(&#x22;typescript&#x22;)" />

  <Card title="CLI" description="Use lms for chat, model downloads, daemon management, server control, and publishing." href="/docs/cli" icon="getDocsSectionIcon(&#x22;cli&#x22;)" />

  <Card title="Integrations" description="Connect LM Studio to Codex, Claude Code, OpenClaw, MCP tools, and remote workflows." href="/docs/integrations" icon="getDocsSectionIcon(&#x22;integrations&#x22;)" />

  <Card title="LM Link" description="Set up LM Link to route local AI workloads across devices and preferred machines." href="/docs/lmlink" icon="getDocsSectionIcon(&#x22;lmlink&#x22;)" />
</Cards>

To get LM Studio, head over to the [Downloads page](/download) and download an installer for your operating system.

LM Studio is available for macOS, Windows, and Linux.

What can I do with LM Studio? [#what-can-i-do-with-lm-studio]

1. Download and run local LLMs like gpt-oss or Llama, Qwen
2. Use a simple and flexible chat interface
3. Connect MCP servers and use them with local models
4. Search & download functionality (via Hugging Face 🤗)
5. Serve local models on OpenAI-like endpoints, locally and on the network
6. Manage your local models, prompts, and configurations

System requirements [#system-requirements]

LM Studio generally supports Apple Silicon Macs, x64/ARM64 Windows PCs, and x64 Linux PCs.

Consult the [System Requirements](app/system-requirements) page for more detailed information.

Run llama.cpp (GGUF) or MLX models [#run-llamacpp-gguf-or-mlx-models]

LM Studio supports running LLMs on Mac, Windows, and Linux using [`llama.cpp`](https://github.com/ggerganov/llama.cpp).

On Apple Silicon Macs, LM Studio also supports running LLMs using Apple's [`MLX`](https://github.com/ml-explore/mlx).

To install or manage LM Runtimes, press `⌘` `Shift` `R` on Mac or `Ctrl` `Shift` `R` on Windows/Linux.

LM Studio as an MCP client [#lm-studio-as-an-mcp-client]

You can install MCP servers in LM Studio and use them with your local models.

See the docs for more: [Use MCP server](/docs/app/plugins/mcp).

If you're develping an MCP server, check out [Add to LM Studio Button](/docs/app/plugins/mcp/deeplink).

Run an LLM like `gpt-oss`, `Llama`, `Qwen`, `Mistral`, or `DeepSeek R1` on your computer [#run-an-llm-like-gpt-oss-llama-qwen-mistral-or-deepseek-r1-on-your-computer]

To run an LLM on your computer you first need to download the model weights.

You can do this right within LM Studio! See [Download an LLM](app/basics/download-model) for guidance.

Chat with documents entirely offline on your computer [#chat-with-documents-entirely-offline-on-your-computer]

You can attach documents to your chat messages and interact with them entirely offline, also known as "RAG".

Read more about how to use this feature in the [Chat with Documents](app/basics/rag) guide.

Run LM Studio without the GUI (llmster) [#run-lm-studio-without-the-gui-llmster]

llmster is the headless version of LM Studio, no desktop app required. It's ideal for servers, CI environments, or any machine where you don't need a GUI.

Learn more: [Headless Mode](/docs/developer/core/headless).

Use LM Studio's API from your own apps and scripts [#use-lm-studios-api-from-your-own-apps-and-scripts]

LM Studio provides a REST API that you can use to interact with your local models from your own apps and scripts.

* [OpenAI Compatibility API](api/openai-api)
* [LM Studio REST API (beta)](api/rest-api)

<br />

Community [#community]

Join the LM Studio community on [Discord](https://discord.gg/aPQfnNkxGC) to ask questions, share knowledge, and get help from other users and the LM Studio team.
