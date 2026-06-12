# Serena

Serena transforms Claude into a powerful coding agent with IDE-like capabilities. This MCP server provides semantic code retrieval and editing tools that work at the symbol level, enabling intelligent navigation of large codebases without reading entire files. Supporting over 30 programming languages including Python, JavaScript, TypeScript, Java, Rust, Go, and C++, Serena leverages Language Server Protocol integration to deliver precise code understanding.

Key features include symbol-level code extraction with tools like `find_symbol` and `find_referencing_symbols`, precision editing operations such as `insert_after_symbol`, and token-efficient codebase interaction. The toolkit exploits the relational structure of code to help Claude work effectively on complex projects.

**How to use:** Once installed, Claude gains semantic code tools automatically. Ask Claude to find symbol definitions, locate references across your codebase, or make targeted edits. Example prompts: "Find all references to the UserService class", "Show me where the authenticate function is defined", "Insert a logging statement after the validateInput method".