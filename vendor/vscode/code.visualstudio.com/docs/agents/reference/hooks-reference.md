# Hooks reference

This article provides a reference for agent hook configuration properties and the input and output schemas of each hook event in VS Code. For information about configuring and using hooks, see Agent hooks.

Every hook also receives a set of common input fields and can return the common output format. The fields documented in the event sections are in addition to those common fields.

## Hook command properties

Each hook entry must have `type: "command"` and at least one command property:

Property

Type

Description

`type`

string

Must be `"command"`

`command`

string

Default command to run (cross-platform)

`windows`

string

Windows-specific command override

`linux`

string

Linux-specific command override

`osx`

string

macOS-specific command override

`cwd`

string

Working directory (relative to repository root)

`env`

object

Additional environment variables

`timeout`

number

Timeout in seconds (default: 30)

## PreToolUse

The `PreToolUse` hook fires before the agent invokes a tool.

### PreToolUse input

In addition to the common fields, `PreToolUse` hooks receive:

```
{
  "tool_name": "editFiles",
  "tool_input": { "files": ["src/main.ts"] },
  "tool_use_id": "tool-123"
}
```

### PreToolUse output

The `PreToolUse` hook can control tool execution through a `hookSpecificOutput` object:

```
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Destructive command blocked by policy",
    "updatedInput": { "files": ["src/safe.ts"] },
    "additionalContext": "User has read-only access to production files"
  }
}
```

Field

Values

Description

`permissionDecision`

`"allow"`, `"deny"`, `"ask"`

Controls tool approval

`permissionDecisionReason`

string

Reason shown to user

`updatedInput`

object

Modified tool input (optional)

`additionalContext`

string

Extra context for the model

**Permission decision priority**: When multiple hooks run for the same tool invocation, the most restrictive decision wins:

1.  `deny` (most restrictive): blocks tool execution
2.  `ask`: requires user confirmation
3.  `allow` (least restrictive): auto-approves execution

**`updatedInput` format**: To determine the format of `updatedInput`, open the agent logs and find the logged tool schema. If `updatedInput` doesn't match the expected schema, it will be ignored.

## PostToolUse

The `PostToolUse` hook fires after a tool completes successfully.

### PostToolUse input

In addition to the common fields, `PostToolUse` hooks receive:

```
{
  "tool_name": "editFiles",
  "tool_input": { "files": ["src/main.ts"] },
  "tool_use_id": "tool-123",
  "tool_response": "File edited successfully"
}
```

### PostToolUse output

The `PostToolUse` hook can provide additional context to the model, or block further processing:

```
{
  "decision": "block",
  "reason": "Post-processing validation failed",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "The edited file has lint errors that need to be fixed"
  }
}
```

Field

Values

Description

`decision`

`"block"`

Block further processing (optional)

`reason`

string

Reason for blocking (shown to the model)

`hookSpecificOutput.additionalContext`

string

Extra context injected into the conversation

## UserPromptSubmit

The `UserPromptSubmit` hook fires when the user submits a prompt.

### UserPromptSubmit input

In addition to the common fields, `UserPromptSubmit` hooks receive a `prompt` field with the text the user submitted.

The `UserPromptSubmit` hook uses the common output format only.

## SessionStart

The `SessionStart` hook fires when a new agent session begins.

### SessionStart input

In addition to the common fields, `SessionStart` hooks receive:

```
{
  "source": "new"
}
```

Field

Type

Description

`source`

string

How the session was started. Currently always `"new"`.

### SessionStart output

The `SessionStart` hook can inject additional context into the agent's conversation:

```
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Project: my-app v2.1.0 | Branch: main | Node: v20.11.0"
  }
}
```

Field

Type

Description

`additionalContext`

string

Context added to the agent's conversation

## Stop

The `Stop` hook fires when the agent session ends. When scoped to a custom agent, the `Stop` hook is also treated as `SubagentStop`.

### Stop input

In addition to the common fields, `Stop` hooks receive:

```
{
  "stop_hook_active": false
}
```

Field

Type

Description

`stop_hook_active`

boolean

`true` when the agent is already continuing as a result of a previous stop hook. Check this value to prevent the agent from running indefinitely.

### Stop output

The `Stop` hook can prevent the agent from stopping:

```
{
  "hookSpecificOutput": {
    "hookEventName": "Stop",
    "decision": "block",
    "reason": "Run the test suite before finishing"
  }
}
```

Field

Values

Description

`decision`

`"block"`

Prevent the agent from stopping

`reason`

string

Required when decision is `"block"`. Tells the agent why it should continue.

Important

When a `Stop` hook blocks the agent from stopping, the agent continues running and the additional turns consume AI credits. Always check the `stop_hook_active` field to prevent the agent from running indefinitely.

## SubagentStart

The `SubagentStart` hook fires when a subagent is spawned.

### SubagentStart input

In addition to the common fields, `SubagentStart` hooks receive:

```
{
  "agent_id": "subagent-456",
  "agent_type": "Plan"
}
```

Field

Type

Description

`agent_id`

string

Unique identifier for the subagent

`agent_type`

string

The agent name (for example, `"Plan"` for built-in agents or custom agent names)

### SubagentStart output

The `SubagentStart` hook can inject additional context into the subagent's conversation:

```
{
  "hookSpecificOutput": {
    "hookEventName": "SubagentStart",
    "additionalContext": "This subagent should follow the project coding guidelines"
  }
}
```

Field

Type

Description

`additionalContext`

string

Context added to the subagent's conversation

## SubagentStop

The `SubagentStop` hook fires when a subagent completes.

### SubagentStop input

In addition to the common fields, `SubagentStop` hooks receive:

```
{
  "agent_id": "subagent-456",
  "agent_type": "Plan",
  "stop_hook_active": false
}
```

Field

Type

Description

`agent_id`

string

Unique identifier for the subagent

`agent_type`

string

The agent name (for example, `"Plan"` for built-in agents or custom agent names)

`stop_hook_active`

boolean

`true` when the subagent is already continuing as a result of a previous stop hook. Check this value to prevent the subagent from running indefinitely.

### SubagentStop output

The `SubagentStop` hook can prevent the subagent from stopping:

```
{
  "decision": "block",
  "reason": "Verify subagent results before completing"
}
```

Field

Values

Description

`decision`

`"block"`

Prevent the subagent from stopping

`reason`

string

Required when decision is `"block"`. Tells the subagent why it should continue.

## PreCompact

The `PreCompact` hook fires before conversation context is compacted.

### PreCompact input

In addition to the common fields, `PreCompact` hooks receive:

```
{
  "trigger": "auto"
}
```

Field

Type

Description

`trigger`

string

How the compaction was triggered. `"auto"` when the conversation is too long for the prompt budget.

The `PreCompact` hook uses the common output format only.

## Related resources

*   Agent hooks - Configure and use hooks in VS Code
*   Custom agents - Create specialized agent configurations
*   Subagents - Delegate tasks to context-isolated subagents

7/1/2026