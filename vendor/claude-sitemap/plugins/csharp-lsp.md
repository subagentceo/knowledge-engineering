# C# LSP

C# language server integration for Claude Code, providing rich code intelligence for C# projects. Powered by the Roslyn-based csharp-ls language server, this plugin enables intelligent code completion, real-time diagnostics, symbol navigation, hover documentation, and refactoring capabilities for .cs files.

Key features include automatic error detection and reporting, go-to-definition, find references, code formatting with .editorconfig support, and smart suggestions based on your project context. The plugin supports .NET Core, .NET Framework, and multi-project solutions.

**How to use:** After installing the plugin and the csharp-ls language server (via `dotnet tool install --global csharp-ls` or `brew install csharp-ls`), Claude Code automatically provides enhanced C# support. Simply open a C# project and start coding—you'll get intelligent completions, inline diagnostics, and quick-fix suggestions as you work. Requires .NET SDK 6.0 or later.