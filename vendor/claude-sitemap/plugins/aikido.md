# Aikido Security

Aikido Security scanning for Claude Code detects SAST vulnerabilities, exposed secrets, and Infrastructure-as-Code misconfigurations in code you write or modify. Powered by the Aikido MCP server, it scans your files in real time and guides Claude to fix issues before they ship.

The plugin automatically identifies files generated or changed during your session, runs a full security scan (up to 50 files per request), and when vulnerabilities are found, applies remediation guidance and re-scans — repeating up to three times until the code is clean. Each finding includes its title, severity, location, and line numbers.

**How to use:** After installing, run `/aikido:setup your-api-key` to configure your Aikido API key (get one from app.aikido.dev → Settings → Integrations → IDE Plugins). Then use `/aikido:scan` to scan modified or new files for security issues, apply fixes, and re-scan until clean. You can also ask Claude naturally — for example, "scan my code for security vulnerabilities" or "check for exposed secrets in the files I changed."

Requires Node.js 18 or later and an Aikido API key.
