Audit the project's dependencies for known vulnerabilities and outdated packages.

Scope the audit to: $ARGUMENTS

Steps:
1. Detect the package manager (npm, pnpm, yarn, pip, etc.) from lockfiles present.
2. List declared dependencies and their installed versions.
3. Flag any with known security advisories, and any that are significantly behind their latest release.
4. Report findings as a table: package, current version, latest version, advisory (if any), recommended action.
5. Do not modify any files — this command is read-only.
