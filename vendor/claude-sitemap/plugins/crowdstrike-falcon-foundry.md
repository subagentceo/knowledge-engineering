# CrowdStrike Falcon Foundry

Build Falcon Foundry apps from a natural language prompt. Describe what you want, and Claude scaffolds the entire app with the Foundry CLI, imports OpenAPI specs for API integrations, creates Falcon Fusion SOAR workflows in YAML, writes serverless Go or Python functions, builds React or Vue UI pages with the Falcon Shoelace design system, and models collection schemas. Nine specialized skills cover the full app lifecycle from scaffolding through deployment.

The plugin enforces platform-specific patterns that are difficult to learn from documentation alone. A CLI guard hook validates commands to prevent common failures like missing --no-prompt flags or manually creating directories that bypass the manifest. A skill router detects Foundry-related intent and loads the right skill before Claude starts working.

**How to use:** Describe the app you want to build. For example: "Create a Falcon Foundry app with an Okta API integration. Share its listUsers endpoint with Falcon Fusion SOAR. Create a workflow to list users on demand, and a UI extension that displays the results." Claude breaks this into capabilities, scaffolds each one with the Foundry CLI, delegates implementation to the appropriate skill, validates the manifest, and deploys to the Falcon console. Each skill includes reference implementations from CrowdStrike's open-source sample apps.

The plugin also covers cross-cutting concerns: OAuth scope hardening and input validation via security patterns, systematic troubleshooting for deploy and manifest errors, and correct patterns for calling Falcon platform APIs from serverless functions using CrowdStrike's gofalcon and FalconPy SDKs.
