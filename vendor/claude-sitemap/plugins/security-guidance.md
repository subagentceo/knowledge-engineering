# Security Guidance

A security reminder hook that automatically warns about potential security vulnerabilities when Claude edits files. The plugin intercepts Write, Edit, and MultiEdit operations and scans code for dangerous patterns before changes are applied.

The plugin detects eight major vulnerability categories including command injection in GitHub Actions workflows, unsafe child_process.exec() calls, eval() and new Function() usage, XSS vectors like dangerouslySetInnerHTML and innerHTML, Python pickle deserialization risks, and os.system() command injection.

**How it works:** The plugin runs automatically as a pre-tool hook - no commands needed. When Claude attempts to write code containing potentially unsafe patterns, you'll see a warning with specific remediation advice before the edit proceeds. Warnings are session-scoped so you only see each one once.

**Example warnings you might see:**

*   Suggestions to use execFileNoThrow() instead of child_process.exec() to prevent shell injection
*   Alerts about XSS risks when using innerHTML or dangerouslySetInnerHTML
*   Warnings about GitHub Actions injection when editing workflow files