# Clangd LSP

Integrates clangd, the official LLVM/Clang language server, into Claude Code to provide intelligent C and C++ code assistance. Get real-time error detection, code completion, and automatic formatting for your C/C++ projects. Supports all common file extensions including .c, .h, .cpp, .cc, .cxx, .hpp, and .hxx.

**Key features:** Code intelligence with IntelliSense and symbol navigation, real-time diagnostics and linting, automatic code formatting, and background indexing for improved performance on large codebases.

**How to use:** Once installed, the language server activates automatically when you open C or C++ files. Claude will have access to enhanced code understanding, allowing you to ask questions like "What's wrong with this function?" or "Find all references to this struct." The plugin requires clangd to be installed on your system — use `brew install llvm` on macOS, `apt install clangd` on Ubuntu/Debian, or `winget install LLVM.LLVM` on Windows.