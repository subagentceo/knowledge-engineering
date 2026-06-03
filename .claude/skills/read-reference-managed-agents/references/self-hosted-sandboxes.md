# Self-hosted sandboxes

Run agent sessions in your own self-hosted sandbox environment.

---

By default, Managed Agents executes tools and code inside [Anthropic-managed cloud sandboxes](/docs/en/managed-agents/cloud-sandboxes-reference). Self-hosted sandboxes keep the orchestration on Anthropic's side but move tool execution into infrastructure you control, so the agent's code, filesystem, and network egress never leave your environment.

Tool execution stays on your host: the filesystem the agent reads and writes, the processes it spawns, and the network it can reach are all under your control. Tool inputs and outputs still flow to Anthropic's control plane (where Claude runs) so the model can see results and determine what to do next. See the [security model](/docs/en/managed-agents/self-hosted-sandboxes-security) for the full data-flow boundary.

<Note>
Self-hosted sandboxes support all Claude models available in Managed Agents, including Claude Opus 4.8. The model is configured on the [agent](/docs/en/managed-agents/agent-setup), not the environment.
</Note>

## How it differs from cloud environments

| | Cloud environment | Self-hosted sandbox |
|---|---|---|
| Where tools run | Anthropic-managed sandboxes | Your infrastructure |
| Network reach | Anthropic's egress controls | Your network policy |
| File and GitHub repo mounting | Managed by Anthropic | Managed by you |
| Lifecycle | Managed by Anthropic | Managed by you |

Self-hosting is a good fit when the agent needs to operate on data that cannot leave your network boundary, reach internal services that are not publicly routable, or run under your organization's own compliance and audit controls.

For Zero Data Retention and HIPAA BAA eligibility, see [API and data retention](/docs/en/manage-claude/api-and-data-retention#feature-eligibility).

## When to combine with MCP tunnels

Self-hosting controls *where the agent's code executes*. [MCP tunnels](/docs/en/agents-and-tools/mcp-tunnels/overview) control *how Anthropic reaches MCP servers in your network*. They are independent: a session running in Anthropic's cloud sandboxes can still reach private MCP servers through a tunnel, and a self-hosted session can use either tunneled or public MCP servers. Use both when you want execution and tool access to stay inside your boundary.

## Environment worker

An environment worker is a process you run on your own infrastructure. It receives tool execution requests from Anthropic and runs them locally. The `self_hosted` environment acts as a work queue: when a [session](/docs/en/managed-agents/sessions) is assigned to it, Anthropic enqueues the session as a work item. Your worker claims work items from that queue, spawns an execution context for each one, downloads the agent's [skills](/docs/en/managed-agents/skills), runs the tool calls, and posts the results back.

Work items are claimed by polling the environment's queue: either by an **always-on worker** that polls continuously, or a **webhook-triggered handler** that wakes on `session.status_run_started` and starts polling.

The CLI and SDK both ship pre-built workers. The `ant` CLI supports the always-on pattern only; the SDK supports both always-on and webhook-triggered.

### Sandbox filesystem

- **`/workspace`:** the system default working directory for tool execution and skill download. Skills are downloaded to `<workdir>/skills/<name>/`.
- **`/mnt/session/outputs`:** the worker harness instructs Claude to write final deliverables here. In sandbox mode, mount a host directory at this path to retrieve outputs after the session ends.

## Before you begin

You need:

- **An existing agent.** If you don't have one, complete the [Quickstart](/docs/en/managed-agents/quickstart) first.
- **A Linux host** with `/bin/bash` at that exact path. The TypeScript SDK additionally requires `unzip`, `tar`, and Node.js 22 or later.
- **The `ant` CLI or an Anthropic SDK** (Python, TypeScript, or Go) on the worker host.
- **Two credentials:** an environment key (generated in the steps that follow) and your Claude API key.

## Setup steps

### 1. Create a self-hosted environment

```python
environment = client.beta.environments.create(
    name="self-hosted", config={"type": "self_hosted"}
)
print(environment.id)
```

### 2. Generate an environment key

In the Console, open the environment and click **Generate environment key**. Then export:

```bash
export ANTHROPIC_ENVIRONMENT_KEY="sk-ant-oat01-..."
export ANTHROPIC_ENVIRONMENT_ID="env_..."
```

## Run a worker

### Always-on (SDK)

```python
import asyncio
import os
from anthropic import AsyncAnthropic
from anthropic.lib.environments import EnvironmentWorker

async def main() -> None:
    environment_key = os.environ["ANTHROPIC_ENVIRONMENT_KEY"]
    environment_id = os.environ["ANTHROPIC_ENVIRONMENT_ID"]
    async with AsyncAnthropic(auth_token=environment_key) as client:
        await EnvironmentWorker(
            client,
            environment_id=environment_id,
            environment_key=environment_key,
            workdir="/workspace",
        ).run()

asyncio.run(main())
```

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { EnvironmentWorker } from "@anthropic-ai/sdk/helpers/beta/environments";

const environmentKey = process.env.ANTHROPIC_ENVIRONMENT_KEY!;
const environmentId = process.env.ANTHROPIC_ENVIRONMENT_ID!;
const client = new Anthropic({ authToken: environmentKey });
const controller = new AbortController();
process.once("SIGTERM", () => controller.abort());

await new EnvironmentWorker({
  client,
  environmentId,
  environmentKey,
  workdir: "/workspace",
  signal: controller.signal
}).run();
```

### Always-on (ant CLI)

```bash
# Install
VERSION=1.10.0
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m | sed -e 's/x86_64/amd64/' -e 's/aarch64/arm64/')
curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${VERSION}/ant_${VERSION}_${OS}_${ARCH}.tar.gz" \
  | sudo tar -xz -C /usr/local/bin ant

# Run in-process
ant beta:worker poll --workdir "/workspace"
```

**Sandbox per session** (stronger isolation):

```dockerfile
FROM your-base-image
ARG ANT_VERSION=1.10.0
ARG TARGETARCH
RUN ARCH=$([ "$TARGETARCH" = "arm64" ] && echo arm64 || echo amd64) && \
    curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${ANT_VERSION}/ant_${ANT_VERSION}_linux_${ARCH}.tar.gz" \
      | tar -xz -C /usr/local/bin ant
WORKDIR /workspace
VOLUME /mnt/session/outputs
ENTRYPOINT ["ant", "beta:worker", "run"]
```

```bash
#!/bin/bash
# spawn.sh: called once per session
mkdir -p "/host/outputs/$ANTHROPIC_SESSION_ID"
exec docker run --rm \
  -e ANTHROPIC_SESSION_ID -e ANTHROPIC_ENVIRONMENT_KEY \
  -e ANTHROPIC_WORK_ID -e ANTHROPIC_ENVIRONMENT_ID -e ANTHROPIC_BASE_URL \
  -v "/host/outputs/$ANTHROPIC_SESSION_ID":/mnt/session/outputs \
  your-image
```

```bash
ant beta:worker poll --on-work ./spawn.sh
```

### Webhook-triggered (SDK)

Subscribe to `session.status_run_started` webhooks and invoke `EnvironmentWorker` per event:

```python
async def handle(raw: bytes, headers: dict[str, str]) -> dict:
    event = client.beta.webhooks.unwrap(raw.decode(), headers=headers)
    if event.data.type != "session.status_run_started":
        return {"status": "ignored"}
    async for work in client.beta.environments.work.poller(
        environment_id=environment_id,
        environment_key=environment_key,
        block_ms=None,
        reclaim_older_than_ms=2000,
        drain=True,
        auto_stop=False,
    ):
        await client.beta.environments.work.worker(workdir="/workspace").handle_item(
            work_id=work.id,
            environment_id=environment_id,
            session_id=work.data.id,
            environment_key=environment_key,
        )
    return {"status": "ok"}
```

## SDK helpers

- **`EnvironmentWorker`:** out-of-the-box worker. `.run()` runs indefinitely; `.handle_item()` picks up one session and exits.
- **`work.poller()`:** polls the work queue and yields each claimed session. Options: `drain`, `block_ms`, `reclaim_older_than_ms`, `auto_stop`.
- **`client.beta.sessions.events.tool_runner()`:** runs tool calls for a single session given the session ID and tool list.

## Start a session

```python
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    metadata={"input_file": "s3://my-bucket/data.csv"},
)
```

<Note>
[Memory](/docs/en/managed-agents/memory) is not currently supported with self-hosted sandboxes.
</Note>

## Monitoring and operations

These calls authenticate with your Claude API key (not the environment key) and run from outside the worker host.

### Read queue depth

```python
stats = client.beta.environments.work.stats(os.environ["ANTHROPIC_ENVIRONMENT_ID"])
print(f"depth={stats.depth} pending={stats.pending}")
```

Response:
```json
{
  "type": "work_queue_stats",
  "depth": 0,
  "pending": 0,
  "oldest_queued_at": null,
  "workers_polling": 0
}
```

- `depth`: items waiting to be claimed
- `pending`: items a worker has claimed and is processing
- `workers_polling`: workers that polled in the last 30 seconds (use for liveness alerting)

### Stop a session gracefully

```python
work = client.beta.environments.work.stop(
    os.environ["ANTHROPIC_WORK_ID"],
    environment_id=os.environ["ANTHROPIC_ENVIRONMENT_ID"],
)
print(work.state)
```

Pass `force: true` to interrupt immediately instead of waiting for the current tool call to complete.

<Warning>
These monitoring endpoints use your organization API key. Do NOT set `ANTHROPIC_API_KEY` on the worker host — it would expose an org-scoped credential to agent tool calls.
</Warning>
