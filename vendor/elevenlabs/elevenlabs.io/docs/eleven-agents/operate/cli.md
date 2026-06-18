> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# ElevenLabs CLI

## Overview

The ElevenLabs CLI allows you to access your ElevenLabs agents from your terminal, unlocking new ways to manage them:

* Store agents as code in your version control system
* Set up CI/CD integration to automatically deploy your agents
* Let your coding agent access and manage your voice agents

Find the [complete source code and contribute on GitHub](https://github.com/elevenlabs/cli).

## Installation

The CLI requires Node.js version 16.0.0 or higher.

```bash title="npm"
npm install -g @elevenlabs/cli
```

```bash title="pnpm"
pnpm add -g @elevenlabs/cli
```

```bash title="yarn"
yarn global add @elevenlabs/cli
```

After installation, the `elevenlabs` command will be available globally in your terminal.

## Quick start

### Initialize a new project

```bash
elevenlabs agents init
```

This creates the project structure with configuration directories and registry files.

### Authenticate with ElevenLabs

```bash
elevenlabs auth login
```

Enter your ElevenLabs API key when prompted. The CLI will verify the key and store it securely.

### Create your first agent

```bash
elevenlabs agents add "My Assistant" --template assistant
```

This creates a new agent configuration using the assistant template.

### Push to ElevenLabs platform

```bash
elevenlabs agents push
```

This uploads your local agent configuration to the ElevenLabs platform.

## Project structure

The CLI creates a structured project directory:

```
your_project/
├── agents.json              # Central agent configuration registry
├── tools.json               # Tool definitions registry
├── tests.json               # Test definitions registry
├── agent_configs/           # Agent configuration files
├── tool_configs/            # Tool configuration files
└── test_configs/            # Test configuration files
```

## Authentication

The CLI stores API keys in `~/.agents/api_keys.json` file with restricted permissions (600).

### Authentication commands

```bash title="Login"
elevenlabs auth login
```

```bash title="Check login status"
elevenlabs auth whoami
```

```bash title="Logout"
elevenlabs auth logout
```

## Agent management

### Creating agents

Create agents using pre-built templates:

```bash
elevenlabs agents add "Agent Name" [options]
```

**Options:**

* `--template <type>`: Choose from available templates (default: default)
* `--skip-upload`: Create locally without uploading to platform

**Example:**

```bash
elevenlabs agents add "Customer Support Bot" --template customer-service
```

### Templates

The CLI provides six pre-built templates for common use cases:

Complete configuration with all available fields, sensible defaults, full voice/text support, widget customization, and evaluation criteria.

Essential fields only including basic prompt, language, TTS, and conversation settings.

Optimized for voice interactions with disabled text input and advanced voice settings.

Text-focused conversations with disabled voice features.

Professional empathetic prompts, low temperature (0.1), 30-minute duration, and evaluation
criteria.

General-purpose AI assistant with balanced creativity (temperature 0.3) and versatile voice/text support.

### Template commands

```bash title="List available templates"
elevenlabs agents templates list
```

```bash title="Show template configuration"
elevenlabs agents templates show <template>
```

### Synchronization

Keep your local configurations synchronized with the ElevenLabs platform:

```bash title="Push all agents"
elevenlabs agents push
```

```bash title="Preview changes (dry run)"
elevenlabs agents push --dry-run
```

### Status and monitoring

```bash title="Check agent status"
elevenlabs agents status
```

### Import and export

```bash title="Import existing agents"
elevenlabs agents pull
```

```bash title="Import specific agent"
elevenlabs agents pull --agent <agent_id>
```

```bash title="Update agents"
elevenlabs agents pull --update
```

```bash title="List all agents"
elevenlabs agents list
```

By default, `elevenlabs agents pull` skips agents that already exist locally. Use the `--update`
flag to override local configurations with remote changes made in the browser or via the API.

## Tool management

The CLI supports two types of tools for extending agent capabilities:

### Webhook tools

HTTP API integrations with authentication and timeout configuration:

```bash
elevenlabs tools add "API Integration" --type "webhook" --config-path ./config.json
```

### Client tools

Direct client-side integrations:

```bash
elevenlabs tools add "Client Function" --type "client" --config-path ./config.json
```

## Widget generation

Generate HTML embed code for web integration:

```bash
elevenlabs agents widget <agent_id>
```

This outputs HTML code like:

```html
<elevenlabs-convai agent-id="agent_id_here"></elevenlabs-convai>
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async></script>
```

## Configuration files

### Agent configuration structure

Each agent configuration includes:

```json
{
  "name": "Agent Name",
  "conversation_config": {
    "agent": {
      "language": "en",
      "prompt": {
        "prompt": "You are a helpful AI assistant.",
        "llm": "gemini-2.5-flash",
        "temperature": 0.0
      }
    },
    "tts": {
      "model_id": "eleven_turbo_v2",
      "voice_id": "cjVigY5qzO86Huf0OWal",
      "agent_output_audio_format": "pcm_16000"
    },
    "asr": {
      "provider": "scribe_realtime",
      "quality": "high",
      "user_input_audio_format": "pcm_16000"
    },
    "conversation": {
      "text_only": false,
      "max_duration_seconds": 600,
      "client_events": ["audio", "interruption"]
    }
  },
  "platform_settings": {
    "widget": {
      "variant": "full",
      "placement": "bottom-right"
    }
  },
  "tags": []
}
```

### CI/CD pipeline integration

```yml
# In your GitHub Actions workflow
- name: Deploy ElevenAgents agents
  run: |
    npm install -g @elevenlabs/cli
    export ELEVENLABS_API_KEY=${{ secrets.ELEVENLABS_API_KEY }}
    elevenlabs agents push --dry-run  # Preview changes
    elevenlabs agents push            # Deploy
    elevenlabs agents status          # Verify deployment
```