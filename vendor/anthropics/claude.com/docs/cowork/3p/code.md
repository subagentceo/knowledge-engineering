> ## Documentation Index
>
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Code tab

> How the Code tab is configured in Cowork on 3P

The Code tab in Cowork on third-party (3P) is the embedded [Claude Code](https://code.claude.com/docs/en/desktop) interface. It runs the same Claude Code engine as the standalone CLI, with a graphical session manager.

## Configuration

The Code tab spawns Claude Code CLI sessions. Anthropic is working on achieving settings parity so that your Cowork on 3P configuration applies identically to both tabs; today, some keys do not yet propagate to Code-tab sessions in the same way they apply to the Cowork tab.

To configure the Code tab directly, deploy Claude Code's `managed-settings.json` alongside your Cowork on 3P profile. See the Claude Code documentation:

- [Claude Code Desktop — managed settings](https://code.claude.com/docs/en/desktop#managed-settings)
- [Claude Code settings reference](https://code.claude.com/docs/en/settings)
- [Sandboxing](https://code.claude.com/docs/en/sandboxing)

## Disabling the Code tab

To remove the Code tab entirely, set `isClaudeCodeForDesktopEnabled` to `false` in your Cowork on 3P configuration. Users will see only the Cowork tab.
