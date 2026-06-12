# Java LSP (Eclipse JDT.LS)

Integrates Eclipse JDT Language Server with Claude Code to provide comprehensive Java development support. Get real-time code intelligence including syntax error detection, code completion with Javadoc hovers, semantic highlighting, and navigation features like type search, call hierarchy, and code outline.

Features powerful refactoring capabilities including import organization, code actions, quick fixes, and source refactoring. Supports Java versions 1.8 through 24 with Maven, Gradle, and standalone Java project configurations. Includes annotation processing support and automatic source resolution for external libraries.

**How to use:** Once installed, the Java language server activates automatically when working with `.java` files. Claude Code will leverage the language server for intelligent code suggestions, error diagnostics, and refactoring operations as you work on Java projects.

**Requirements:** Java 17+ (JDK) and the jdtls binary installed via Homebrew (`brew install jdtls`) on macOS or your package manager on Linux.