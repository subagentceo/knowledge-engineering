> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Customize Claude Tag

> Claude Tag is customized per channel and workspace (a scope), not per user. See what admins set in claude.ai, what anyone can change from the channel, and what stays fixed.

export const BetaNote = () => <Info>Claude Tag is in public beta. Features and behavior described here may change before general availability.</Info>;

<BetaNote />

Claude Tag's behavior is shaped by four layers, each set in a different place:

| Layer                   | What it is                                                                                                                                           | Who sets it                                                                                                                                         | Where                                                                                                                            |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **Connections**         | Credentials for the systems Claude can reach (GitHub, Drive, Datadog, your APIs)                                                                     | Owner                                                                                                                                               | [Access bundles](/claude-tag/admins/add-connections)                                                                             |
| **Plugins and skills**  | Instructions that teach Claude how to use a tool or follow a process. A plugin bundles one or more [skills](https://code.claude.com/docs/en/skills). | Owner                                                                                                                                               | [Bundle Plugins tab](/claude-tag/admins/add-connections#attach-plugins) or a [skills repository](/claude-tag/admins/skills-repo) |
| **Custom instructions** | Standing guidance read in every session at a scope (team conventions, output formats). Outranks channel memory.                                      | Owner for any scope; channel members for the channel scope, from the [Configure page](/claude-tag/users/good-habits#configure-claude-for-a-channel) | [Per-scope instructions](/claude-tag/admins/attach-to-scope#add-custom-instructions)                                             |
| **Channel memory**      | Facts Claude saves while working in a channel                                                                                                        | Anyone in the channel                                                                                                                               | By [telling Claude](/claude-tag/users/memory)                                                                                    |

Connections and plugins decide what Claude *can do*; instructions and memory shape *how it does it*.

## Settings admins control

Access and organization-wide behavior are set at [`claude.ai/admin-settings/claude-tag`](https://claude.ai/admin-settings/claude-tag), per scope (a scope is a channel, a workspace, or your whole organization), so the same agent can work differently in different channels. Most controls below are Owner-only.

| Setting             | What it does                                                                                        | More                                                                                                                    |
| :------------------ | :-------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| Custom instructions | Standing guidance read in every session on a scope, like team conventions. Outranks channel memory. | [Add custom instructions](/claude-tag/admins/attach-to-scope#add-custom-instructions)                                   |
| Plugins             | Bundles of skills that teach Claude how to use a specific tool                                      | [Attach plugins](/claude-tag/admins/add-connections#attach-plugins)                                                     |
| Connections         | Which systems it can reach from each channel                                                        | [Add connections](/claude-tag/admins/add-connections)                                                                   |
| Default model       | Which Claude model handles sessions in a scope                                                      | [Choose the model for a scope](#choose-the-model-for-a-scope)                                                           |
| Claude Tag version  | Which generation answers (New, Legacy, or Off) in a scope                                           | [Migrate from the earlier Claude in Slack](/claude-tag/admins/restrict-access#migrate-from-the-earlier-claude-in-slack) |

### Channel connections are separate from personal connectors

An Owner configures Claude's connections, plugins, and skills, and they apply per scope. They are separate from the connectors, skills, or MCP servers an individual user has set up in their own claude.ai or Claude Desktop account. A user's personal connectors are not available to Claude in a channel, and the channel's connections are not listed among that user's personal connectors in claude.ai.

To give Claude access to a tool that is not in the built-in connection list, including a custom MCP server, see [add a custom connection](/claude-tag/admins/connections/custom).

## Change behavior from the channel

Everything in the table below is open to channel members, with no admin involved.

| To change                      | Say something like                                         | More                                                                       |
| :----------------------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------- |
| How Claude formats output      | "remember for this channel: post reports as a table"       | [Memory](/claude-tag/users/memory)                                         |
| How chatty Claude is           | "ask before posting anything longer than a screen"         | [Memory](/claude-tag/users/memory)                                         |
| When Claude follows a thread   | "stay quiet in this thread unless someone tags you"        | [Control when Claude Tag responds](/claude-tag/users/when-claude-responds) |
| What Claude does on a schedule | "every morning at 9, post a digest of open threads"        | [Set up routines](/claude-tag/users/proactivity)                           |
| What Claude remembers          | "what do you remember about this channel?" then correct it | [Memory](/claude-tag/users/memory)                                         |

Changes in the table above are saved to channel memory; verify one stuck by asking what it remembers.

Members can also tailor how Claude works in the channel from the **Configure** link in the footer of any Claude reply. The link opens a claude.ai page where anyone in the channel who is also a member of your Claude organization can edit settings for that channel, unless an admin has [restricted editing to admins](/claude-tag/admins/attach-to-scope#restrict-who-can-set-channel-instructions). The **Channel instructions** field on that page holds standing guidance that outranks memory. See [configure Claude for a channel](/claude-tag/users/good-habits#configure-claude-for-a-channel).

## Choose the model for a scope

Each scope carries a **Default model** setting in its **Advanced** section, alongside the [environment](/claude-tag/admins/attach-to-scope#choose-the-environment-for-a-scope) and guest controls. It sets the model new channel sessions in that scope start on; the options are drawn from the models available to your organization, such as Opus and Sonnet models. A scope without its own setting inherits from its parent, and a channel's setting overrides its workspace's. The **Inherit** option shows which model the scope resolves to.

To keep sessions on a model you chose, set a specific model at the organization scope rather than leaving the setting unset; every scope without an override then follows it.

The setting applies to new sessions; threads already underway keep the model they started with. The footer of each Claude reply in Slack names the model that handled it, so you can confirm what a scope is running.

Channel members can also change the model from Slack, with no admin involved. Asking Claude in a thread switches that thread, and asking it to make a model the channel default changes what new threads in the channel start on. See [choose the model Claude Tag uses](/claude-tag/users/models).

### Models your organization allows

Claude Tag draws its model list from the models your organization makes available for Claude Code, set in the Claude admin console. That policy applies in two places.

* **Model lists in Slack.** The models Claude offers when someone asks it to switch, and the model selector for direct messages, show only allowed models. Claude declines a request to switch to a model outside the list.
* **Configured defaults.** If your organization also enforces the policy on defaults and a workspace or channel's **Default model** isn't on the allowed list, Claude declines to start the session and posts a notice in the thread. The notice says the configured model isn't available to your organization and asks the requester to contact an admin. Claude doesn't start the thread on a different model, so a session never runs on a model no one chose.

A change to the allowed list applies to new sessions, like a change to the **Default model**; a thread already underway keeps its model until someone in it asks Claude to switch.

## Settings no one can change

* The Claude app's name, @-handle, and avatar in Slack are the same in every workspace; there is no rename or rebrand setting.

## Related resources

* [What Claude Tag remembers](/claude-tag/users/memory): how channel instructions are stored, shared, and corrected
* [Good habits for working with Claude Tag](/claude-tag/users/good-habits): phrasings that make recurring output consistent
* [How agent identity works](/claude-tag/concepts/agent-identity): why access is set per channel
