# Ruby LSP

Integrates the Ruby Language Server into Claude Code, providing rich code intelligence and analysis for Ruby projects. Supports `.rb`, `.rake`, `.gemspec`, `.ru`, and `.erb` files with features like go-to-definition, hover documentation, code completion, signature help, and diagnostics. Built on Shopify's open-source Ruby LSP implementation, it brings a full-featured Ruby development experience directly into your workflow.

The plugin delivers comprehensive navigation and refactoring capabilities including find references, workspace-wide symbol search, rename symbol, extract-to-variable/method refactorings, and intelligent code actions for quick fixes. Semantic highlighting, inlay hints, and folding ranges help you read and understand Ruby code more effectively.

Analysis features surface syntax errors and linting violations inline, while formatting support keeps your code consistent on save or on demand — including range formatting and on-type completion of `end` tokens. The extensible add-on system supports Ruby LSP Rails, RSpec, and other community extensions.

**How to use:** Install the plugin and ensure Ruby 3.0+ is available in your environment (install via `gem install ruby-lsp` or add `gem 'ruby-lsp'` to your Gemfile). Once enabled, Claude Code automatically gains Ruby code intelligence — ask things like "go to the definition of this method," "what does this class do," "find all references to UserController," or "rename the Invoice module across the project."
