# Elixir LS

Integrates the ElixirLS language server with Claude Code, providing code intelligence and diagnostics for Elixir projects. Supports `.ex` (Elixir source), `.exs` (Elixir script), and `.heex` (Phoenix HEEx template) files.

With this plugin enabled, Claude Code gains access to real-time compiler diagnostics, code navigation, and language-aware analysis powered by ElixirLS — the same language server used by popular editors like VS Code and Neovim. This means more accurate code suggestions, better error detection, and richer understanding of your Elixir and Phoenix codebases.

**Prerequisites:** Elixir and Erlang must be installed. ElixirLS can be installed via Homebrew (`brew install elixir-ls`), Nix, or built from source.

**How to use:** Once installed, the plugin activates automatically when you work with Elixir files. Try prompts like: "Find all compiler warnings in this Phoenix project," "Refactor this GenServer module," or "Explain what this Ecto changeset pipeline does." The language server runs in the background, giving Claude deeper insight into your code structure, types, and potential issues.
