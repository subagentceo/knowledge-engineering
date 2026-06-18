> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Agent versioning

Agent versioning allows you to experiment with different configurations of your agent without risking your production setup. Create isolated branches, test changes, and gradually roll out updates using traffic percentage deployment.

Looking to run A/B tests? See [Experiments](/docs/eleven-agents/operate/experiments) for the recommended workflow for testing agent changes against live traffic.

## Overview

The versioning system provides:

* **Immutable snapshots** of your agent configuration at any point in time
* **Isolated branches** for testing changes before going live
* **Traffic splitting** to gradually roll out changes to a percentage of users
* **Merging** to bring successful experiments back to main

Once versioning is enabled on an agent, it cannot be disabled. Consider this before enabling
versioning on existing agents.

## Core concepts

### Versions

A version is an immutable snapshot of an agent's configuration at a specific point in time. Each version has a unique ID (format: `agtvrsn_xxxx`) and contains:

* `conversation_config` - System prompt, LLM settings, voice configuration, tools, knowledge base
* `platform_settings` - Versioned subset including evaluation, widget, data collection, and safety settings
* `workflow` - Complete workflow definition with nodes and edges

Versions are created automatically when you save changes to a versioned agent. Once created, a version cannot be modified.

### Branches

Branches are named lines of development, similar to git branches. They allow you to work on changes in isolation before merging back to the main branch.

* Every versioned agent has a **Main** branch that cannot be deleted or archived
* Additional branches can be created from any version on the main branch
* Each branch has: id (`agtbrch_xxxx`), name, description, and a list of versions
* Branch names can contain: letters, numbers, and `() [] {} - / .` (max 140 characters)

### Traffic deployment

Traffic can be split across multiple branches by percentage, enabling gradual rollouts and A/B testing.

* Percentages must always total exactly **100%**
* Traffic routing is **deterministic** based on conversation ID (the same user consistently routes to the same branch)
* Only non-archived branches with 0% traffic can be archived

### Drafts

Unsaved changes are stored as drafts, allowing you to work on changes without immediately creating a new version.

* Drafts are **per-user, per-branch** (each team member has their own draft)
* Drafts are automatically discarded when a new version is committed
* Drafts are also discarded when merging into a branch

## Enabling versioning

Versioning is opt-in and must be explicitly enabled. You can enable it when creating a new agent or on an existing agent.

Once enabled, versioning cannot be disabled. This is a permanent change to your agent.

### Enable when creating an agent

Open your agent in the dashboard, go to **Settings**, and enable versioning. Once enabled, the **Versioning** tab becomes available for managing branches, drafts, versions, and traffic deployment.

```python
from elevenlabs.client import ElevenLabs
from elevenlabs.types import *

client = ElevenLabs(api_key="your-api-key")

agent = client.conversational_ai.agents.create(
    conversation_config=ConversationalConfig(
        agent=AgentConfig(
            first_message="Hello! How can I help you today?",
            prompt=AgentPromptConfig(
                prompt="You are a helpful assistant."
            )
        )
    ),
    enable_versioning=True
)

print(f"Agent created with versioning: {agent.agent_id}")
```

```javascript
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const client = new ElevenLabsClient({ apiKey: 'your-api-key' });

const agent = await client.conversationalAi.agents.create({
  conversationConfig: {
    agent: {
      firstMessage: 'Hello! How can I help you today?',
      prompt: {
        prompt: 'You are a helpful assistant.',
      },
    },
  },
  enableVersioning: true,
});

console.log(`Agent created with versioning: ${agent.agentId}`);
```

### Enable on an existing agent

Open your agent in the dashboard, navigate to **Settings**, and toggle versioning on.

```python
agent = client.conversational_ai.agents.update(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    enable_versioning_if_not_enabled=True
)
```

```javascript
const agent = await client.conversationalAi.agents.update('agent_7101k5zvyjhmfg983brhmhkd98n6', {
  enableVersioningIfNotEnabled: true,
});
```

Enabling versioning creates the initial "Main" branch with the first version containing the current agent configuration.

## Working with branches

### Creating a branch

Branches can only be created from versions on the main branch. You can optionally include configuration changes that will be applied to the new branch's initial version.

```python
branch = client.conversational_ai.agents.branches.create(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    parent_version_id="agtvrsn_xxxx",
    name="experiment-v2",
    description="Testing new prompt and voice settings"
)

print(f"Created branch: {branch.created_branch_id}")
print(f"Initial version: {branch.created_version_id}")
```

```javascript
const branch = await client.conversationalAi.agents.branches.create('agent_7101k5zvyjhmfg983brhmhkd98n6', {
  parentVersionId: 'agtvrsn_xxxx',
  name: 'experiment-v2',
  description: 'Testing new prompt and voice settings',
});

console.log(`Created branch: ${branch.createdBranchId}`);
console.log(`Initial version: ${branch.createdVersionId}`);

```

### Listing branches

```python
branches = client.conversational_ai.agents.branches.list(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6"
)

for branch in branches.branches:
print(f"{branch.name}: {branch.id}")

```

```javascript
const branches = await client.conversationalAi.agents.branches.list('agent_7101k5zvyjhmfg983brhmhkd98n6');

for (const branch of branches.branches) {
  console.log(`${branch.name}: ${branch.id}`);
}

```

### Getting branch details

```python
branch = client.conversational_ai.agents.branches.get(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    branch_id="agtbrch_xxxx"
)

print(f"Branch: {branch.name}")
print(f"Versions: {len(branch.versions)}")

```

```javascript
const branch = await client.conversationalAi.agents.branches.get('agent_7101k5zvyjhmfg983brhmhkd98n6', 'agtbrch_xxxx');

console.log(`Branch: ${branch.name}`);
console.log(`Versions: ${branch.versions.length}`);

```

## Committing changes

When you update an agent with versioning enabled, specify the `branch_id` to create a new version on that branch.

Open your agent's **Versioning** tab, switch to the target branch, edit the configuration, and save to create a new version.

Pass the `--branch` flag to push to a specific branch by name or ID. The branch must already exist.

```bash
elevenlabs agents push --agent "<agent-name>" --branch "<branch-name>"
```

```python
agent = client.conversational_ai.agents.update(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    branch_id="agtbrch_xxxx",
    conversation_config=ConversationalConfig(
        agent=AgentConfig(
            prompt=AgentPromptConfig(
                prompt="You are a friendly customer support agent."
            )
        )
    )
)
```

```javascript
const agent = await client.conversationalAi.agents.update(
  'agent_7101k5zvyjhmfg983brhmhkd98n6',
  {
    conversationConfig: {
      agent: {
        prompt: {
          prompt: 'You are a friendly customer support agent.',
        },
      },
    },
  },
  { branchId: 'agtbrch_xxxx' }
);
```

A new version is automatically created on the specified branch, and any existing draft for that user on that branch is discarded.

## Deploying traffic

Use the deployments endpoint to distribute traffic across branches. This enables gradual rollouts and A/B testing.

```python
deployment = client.conversational_ai.agents.deployments.create(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    deployments=[
        {"branch_id": "agtbrch_main", "percentage": 90},
        {"branch_id": "agtbrch_xxxx", "percentage": 10}
    ]
)
```

```javascript
const deployment = await client.conversationalAi.agents.deployments.create('agent_7101k5zvyjhmfg983brhmhkd98n6', {
  deployments: [
    { branchId: 'agtbrch_main', percentage: 90 },
    { branchId: 'agtbrch_xxxx', percentage: 10 },
  ],
});
```

All percentages must sum to exactly 100%. The deployment will fail if they don't.

Traffic routing is deterministic based on the conversation ID, ensuring the same user consistently reaches the same branch across sessions.

## Merging branches

When you're satisfied with changes on a branch, merge them back to the main branch.

```python
merge = client.conversational_ai.agents.branches.merge(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    source_branch_id="agtbrch_xxxx",
    target_branch_id="agtbrch_main",
    archive_source_branch=True  # Default: true
)
```

```javascript
const merge = await client.conversationalAi.agents.branches.merge('agent_7101k5zvyjhmfg983brhmhkd98n6', 'agtbrch_xxxx', {
  targetBranchId: 'agtbrch_main',
  archiveSourceBranch: true, // Default: true
});
```

Merging:

* Creates a new version on the main branch with the source branch's configuration
* Optionally archives the source branch (default behavior)
* Automatically transfers traffic from the source branch to main

You can only merge into the main branch. Merging between non-main branches is not supported.

## Archiving branches

Archive branches you no longer need. This helps keep your branch list organized.

```python
client.conversational_ai.agents.branches.update(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    branch_id="agtbrch_xxxx",
    archived=True
)
```

```javascript
await client.conversationalAi.agents.branches.update('agent_7101k5zvyjhmfg983brhmhkd98n6', 'agtbrch_xxxx', {
  archived: true,
});
```

You cannot archive a branch that has traffic allocated to it. Remove all traffic before archiving.

Archived branches can be unarchived by setting `archived=False`.

## Retrieving specific versions

You can retrieve an agent at a specific version or branch tip.

### Get agent at specific version

```python
agent = client.conversational_ai.agents.get(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    version_id="agtvrsn_xxxx"
)
```

```javascript
const agent = await client.conversationalAi.agents.get('agent_7101k5zvyjhmfg983brhmhkd98n6', {
  versionId: 'agtvrsn_xxxx',
});
```

### Get agent at branch tip

```python
agent = client.conversational_ai.agents.get(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    branch_id="agtbrch_xxxx"
)
```

```javascript
const agent = await client.conversationalAi.agents.get('agent_7101k5zvyjhmfg983brhmhkd98n6', {
  branchId: 'agtbrch_xxxx',
});
```

### Include draft changes

```python
agent = client.conversational_ai.agents.get(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    branch_id="agtbrch_xxxx",
    include_draft=True
)
```

```javascript
const agent = await client.conversationalAi.agents.get('agent_7101k5zvyjhmfg983brhmhkd98n6', {
  branchId: 'agtbrch_xxxx',
  includeDraft: true,
});
```

## Settings reference

### Versioned settings

These settings can differ between versions and branches:

| Category                        | Settings                                                                                                                                                                                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Conversation config**         | System prompt, agent personality, LLM selection and parameters, voice settings (TTS model, voice ID), tools configuration, knowledge base, first message, language settings, turn detection, interruption settings                                                                                            |
| **Versioned platform settings** | `evaluation` - evaluation criteria, `widget` - widget appearance and behavior, `data_collection` - structured data extraction, `overrides` - conversation initiation overrides, `workspace_overrides` - webhooks configuration, `testing` - test configurations, `safety` - guardrails (IVC/non-IVC settings) |
| **Workflow**                    | Complete workflow definition (nodes and edges)                                                                                                                                                                                                                                                                |

### Per-agent settings

These settings are shared across all versions:

| Setting        | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `name`, `tags` | Agent name and tags (only updated when committing to main branch) |
| `auth`         | Authentication settings and allowlist                             |
| `call_limits`  | Concurrency and daily limits                                      |
| `privacy`      | Retention settings and zero-retention mode                        |
| `ban`          | Ban status (admin only)                                           |

Changes to name and tags on non-main branches don't persist to the agent until merged to main.

## Best practices

Set up [automated tests](/docs/eleven-agents/customization/agent-testing) that capture
expected behavior before creating a new branch. This establishes a baseline and helps catch
regressions early when iterating on your experiment.

Choose branch names that clearly communicate the purpose of the experiment. Include the feature
name, hypothesis, or ticket number for easy reference (e.g., `feature/new-greeting-flow` or
`experiment/shorter-responses`).

Use the branch description field to explain what hypothesis you're testing, what metrics define
success, and any dependencies or considerations. This helps team members understand active
experiments.

Save drafts frequently while iterating on changes. This preserves your work without creating
unnecessary versions. Only commit when you're ready to test or deploy.

When deploying a new branch, begin with 5-10% of traffic. This limits exposure if issues arise
while still providing meaningful data.

Use the [analytics dashboard](/docs/eleven-agents/dashboard) to compare branch performance.
Look for call completion rates, average conversation duration, success evaluation scores, and
tool execution rates. Only increase traffic when metrics meet or exceed your main branch
baseline.

Scale up traffic in increments (10% → 25% → 50% → 100%) as confidence grows. This approach
minimizes risk while validating performance at each stage.

Merge successful experiments promptly to avoid configuration drift. Long-running branches become
harder to merge and may conflict with other changes made to main.

## Next steps

Run A/B tests using branches and traffic deployment

Set up automated tests for your agent versions

Monitor performance across different branches

Manage versioning from the command line