# Twilio Skills for AI coding agents

> \[!IMPORTANT]
>
> Twilio MCP and Twilio Skills are available as Public Beta products, and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the products are declared as Generally Available. Public Beta products are not covered by the Twilio Support Terms or Twilio Service Level Agreement.

Twilio Skills provide structured packages of product knowledge that help you use AI coding agents to build with Twilio.

When you install Twilio Skills, your agent gains the following abilities:

* **Choose the right product** for your use case before writing code.
* **Follow proven architecture patterns** across multi-product implementations.
* **Avoid common mistakes** with explicit constraints and edge-case documentation.
* **Stay current** with products released after your model's training data cutoff.

Skills use a progressive disclosure architecture: your agent sees lightweight metadata for all skills at startup, loads the full skill only when your task matches, and can drill into detailed reference material on demand. This architecture keeps your context lean while providing depth exactly when needed.

## Where to find Twilio Skills

Twilio Skills are published at the [Twilio AI repository on GitHub](https://github.com/twilio/ai) and registered in the [Claude Connectors page for Twilio](https://claude.com/connectors/twilio).

## Install Twilio Skills

### Claude

#### Claude Plugins

Twilio Skills are available as a [Claude plugin](https://claude.com/plugins/twilio-developer-kit). To install in Claude Code:

```shell
claude plugin install twilio-developer-kit@twilio
```

You can also install Twilio Skills from within a Claude Code session:

```text
/plugin marketplace add https://github.com/twilio/ai
/plugin install twilio-developer-kit@twilio
/reload-plugins
```

Skills activate automatically when your prompt matches a covered use case. You can also invoke a specific skill directly:

```text
/twilio-verify-send-otp
/twilio-sms-send-message
/twilio-sendgrid-email-send
```

The Claude plugin also includes MCP server access. For MCP-only installation, see the [MCP server documentation](/docs/ai/mcp).

### Cursor

Twilio Skills are available in the [Cursor marketplace page for Twilio](https://cursor.com/marketplace/twilio). Note that the marketplace listing shows "Twilio" but the plugin ID is `twilio-developer-kit`. To install, open Composer (Command+I or Control+I):

```text
/add-plugin twilio-developer-kit
```

This installs Twilio Skills and the MCP server, making them available in your current project. Type `/skills` in Composer to browse available Twilio Skills.

### Codex

Open Plugins in the Codex app, search for "Twilio developer kit", and install the plugin.

You can also install Twilio Skills in Codex CLI by running the following command to open the plugins list:

```text
/plugins
```

Search for "Twilio developer kit" and install.

### Manual installation

For all platforms following the [Agent Skills standard](https://agentskills.io), install Twilio Skills by copying the skills directory:

```shell
git clone https://github.com/twilio/ai.git
cp -r ai/skills/ ~/.agents/skills/
```

User-level installation (`~/.agents/skills/`) makes skills available across all your projects. Compatible tools include GitHub Copilot, Gemini CLI, JetBrains Junie, and 30+ other platforms.

## Available Skills

### Setup Skills

Get your Twilio environment configured correctly from the start.

| Skill                         | What it covers                                               |
| :---------------------------- | :----------------------------------------------------------- |
| `twilio-account-setup`        | Account structure, project organization, API credentials.    |
| `twilio-iam-auth-setup`       | API keys, auth tokens, restricted keys, credential rotation. |
| `twilio-numbers-senders`      | Number types, sender selection, regulatory bundles.          |
| `twilio-webhook-architecture` | StatusCallbacks, event webhooks, ngrok for local dev.        |

### Planner Skills

Qualify your use case and get product recommendations before you build.

| Skill                                  | What it covers                                                          |
| :------------------------------------- | :---------------------------------------------------------------------- |
| `twilio-identity-verification-advisor` | OTP vs. document verification vs. silent network auth.                  |
| `twilio-marketing-promotions-advisor`  | Campaign architecture across SMS, WhatsApp, email, RCS.                 |
| `twilio-notifications-alerts-advisor`  | Transactional notifications with urgency-based channel routing.         |
| `twilio-voice-ai-agent-advisor`        | AI voice agent architecture (Conversation Relay, Memory, Intelligence). |

### Product Skills

Deep implementation guidance for individual Twilio products.

| Skill                          | What it covers                                                     |
| :----------------------------- | :----------------------------------------------------------------- |
| `twilio-sms-send-message`      | SMS/MMS through Messages API, encoding, media, error handling.     |
| `twilio-whatsapp-send-message` | WhatsApp Business API, templates, 24-hour service window.          |
| `twilio-verify-send-otp`       | OTP delivery, channel selection, Fraud Guard, silent network auth. |
| `twilio-sendgrid-email-send`   | Transactional/bulk email, dynamic templates, scheduled sends.      |

### Guardrail Skills

Operational patterns that prevent production failures.

| Skill                          | What it covers                                                 |
| :----------------------------- | :------------------------------------------------------------- |
| `twilio-security-hardening`    | Request validation, credential management, webhook signatures. |
| `twilio-compliance-traffic`    | TCPA, opt-in/opt-out, quiet hours, consent management.         |
| `twilio-compliance-onboarding` | A2P 10DLC registration, toll-free verification, STIR/SHAKEN.   |

## MCP server

Twilio also provides a [Model Context Protocol (MCP) server](/docs/ai/mcp) for API documentation access. Skills and MCP are complementary:

|                   | Skills                                 | MCP Server                                   |
| :---------------- | :------------------------------------- | :------------------------------------------- |
| **Answers**       | "Which product should I use?"          | "What parameters does this endpoint accept?" |
| **Source**        | Curated procedural knowledge           | Live OpenAPI specs and documentation         |
| **When it loads** | On task match (progressive disclosure) | On tool call                                 |
| **Updates**       | With repo releases                     | Always current (server-side)                 |

Install both for the best experience. Skills guide your agent to the right approach; MCP provides the precise API details to implement it.

**MCP Server URL:** `https://mcp.twilio.com/docs`

## How Skills work

Skills follow the open [Agent Skills standard](https://agentskills.io):

1. **Metadata scan** — At session start, your agent reads skill names and descriptions (a few tokens each)
2. **Match** — When your prompt matches a skill's description, the full skill loads into context
3. **Progressive detail** — Skills reference other skills for deeper topics, loading only what's needed
4. **Explicit boundaries** — Every skill includes a `CANNOT` section documenting what it cannot do, reducing hallucination

Each skill is a single `SKILL.md` file with YAML frontmatter:

```markdown
---
name: twilio-verify-send-otp
description: >
  Send and check one-time passwords via SMS, Voice, email,
  WhatsApp, or Silent Network Auth using Twilio Verify.
---
```

The format is compatible with Claude Code, Cursor, Codex, GitHub Copilot, Gemini CLI, JetBrains Junie, and any tool supporting the Agent Skills standard.

## Feedback

We'd love to hear how Twilio Skills are working for you and what products or use cases you'd like covered next.

* **Email:** [send email to the Skills team](mailto:questions-skills@twilio.com)
* **GitHub:** [File an issue in the Twilio AI repository](https://github.com/twilio/ai/issues)
