# AWS Transform

Migrate, modernize, and upgrade codebases to AWS with guided, multi-phase workflows. AWS Transform handles .NET Framework to .NET 8/10, mainframe COBOL to Java, VMware VMs to EC2, SQL Server to Aurora, and language/SDK version upgrades for Java, Python, and Node.js. It connects to the AWS Transform MCP server to run assessments, generate migration plans, and execute transformations — all with human-in-the-loop checkpoints at every stage.

The plugin also provides continuous modernization analysis: scan your repositories for tech debt, security vulnerabilities, and upgrade opportunities, then remediate them directly. Each transformation follows a strict assess → plan → transform → validate workflow so nothing is skipped, and state is persisted between sessions so you can resume where you left off.

**How to use:** Ask Claude to perform a migration or analysis task. Example prompts:

*   `migrate .NET Framework to .NET 8` — start a guided .NET modernization
*   `assess this codebase for tech debt` — run continuous modernization analysis
*   `find security vulnerabilities in my repos` — scan for CVEs and security issues
*   `convert SQL Server to Aurora` — plan and execute a database migration
*   `modernize my mainframe COBOL` — transform COBOL to Java
*   `move VMware to EC2` — migrate virtual machines to AWS
*   `upgrade Java to version 21` — upgrade language and SDK versions