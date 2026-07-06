> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up Claude Tag

> Set up Claude Tag for your organization: pair your Slack workspace, give Claude access to your tools, set a spending limit, and launch. See prerequisites and each step in detail.

export const BetaNote = () => <Info>Claude Tag is in public beta. Features and behavior described here may change before general availability.</Info>;

<BetaNote />

Claude Tag is Claude working in your team's Slack channels, with its own accounts in your tools.

Open [`claude.ai/admin-settings/claude-tag`](https://claude.ai/admin-settings/claude-tag) and click **Set up** (or **+ Connect** if a workspace is already paired). If you started setup earlier without finishing, you'll be asked to **Resume** or **Set up a new workspace**. A setup dialog walks you through each step:

* **[Set up Claude Tag for your workspace](#set-up-claude-tag-for-your-workspace)**: install the Slack app and link it with a pairing code
* **[Give Claude Tag access](#give-claude-tag-access)**: name an [Access bundle](/claude-tag/concepts/glossary#access-bundle) and connect your most-used apps
* **[Give Claude access to your org's repos](#give-claude-access-to-your-orgs-repos)**: grant GitHub repositories (shown only if the Claude GitHub App is already linked)
* **[Set a spending limit](#set-a-spending-limit)**: cap monthly spend
* **[Review and launch](#review-and-launch)**: turn on Claude Tag

The rest of this page covers [what to have ready before you start](#before-you-start), [each step in detail](#setup-steps), and [common setup issues](#common-setup-issues).

<Note>If your team already uses the earlier Claude in Slack, the same steps apply and your existing app stays; see [Migrate from the earlier app](/claude-tag/admins/migrate-from-earlier) for what changes.</Note>

## Before you start

| Prerequisite                                                              | Why you need it                                                                                                                                                                       | If you don't have it                                                                                                                                                                                                                                                                    |
| :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A **Team or Enterprise plan** on claude.ai                                | Claude Tag is available on Team and Enterprise plans, on Anthropic's first-party service. It isn't available on individual plans (Free, Pro, or Max), or for third-party deployments. | Start a Team or Enterprise plan at [claude.com/pricing](https://claude.com/pricing)                                                                                                                                                                                                     |
| A Claude organization **without Zero Data Retention (ZDR)**               | Claude Tag stores channel memory and session transcripts, which ZDR doesn't permit.                                                                                                   | Claude Tag isn't available to ZDR organizations                                                                                                                                                                                                                                         |
| **Owner** role in your Claude organization                                | Pairing a workspace and creating Access bundles are Owner-only writes; an Admin can view settings but not complete setup.                                                             | Ask an Owner to run setup, or have one promote you at [`claude.ai/admin-settings/members`](https://claude.ai/admin-settings/members)                                                                                                                                                    |
| A **Slack workspace admin**                                               | Running `@Claude connect` requires a Slack workspace admin; installing the app usually does too (most workspaces require admin approval for new apps)                                 | If that's someone else, [send them the install request](/claude-tag/admins/pair-workspace#send-the-install-request-to-your-slack-admin) now so the pairing code is ready before you [pair your Slack workspace](#set-up-claude-tag-for-your-workspace)                                  |
| **Usage credits** (Team plans)                                            | Channel work draws from your organization's usage balance; on a Team plan nothing runs until credits are loaded                                                                       | Check whether your organization has a [launch usage credit](https://support.claude.com/en/articles/15575654-claude-tag-launch-promo-for-claude-team-and-enterprise) before buying; otherwise, buy credits at [`claude.ai/admin-settings/usage`](https://claude.ai/admin-settings/usage) |
| *(Optional)* The **Claude GitHub App** linked to your Claude organization | Linking GitHub before you start adds a repository-access step to the setup dialog, so you can grant repositories there instead of returning to the bundle afterward                   | [Link your GitHub organization](/claude-tag/admins/configure-github#link-your-github-organization) first, or grant repository access after setup                                                                                                                                        |
| *(Optional)* A **channel to test in**                                     | You'll invite Claude to a channel to [test](#test-that-setup-worked) that setup worked                                                                                                | Create a private Slack channel for the pilot, or pick any existing one                                                                                                                                                                                                                  |

If any of your services restrict traffic by IP, file the [network requirements](/claude-tag/admins/network-requirements) request with your network team early; in many organizations, IP allowlist changes take days to approve.

## Setup steps

All steps run in one dialog. Each section below shows what you'll see and what to do.

### Set up Claude Tag for your workspace

A Slack workspace is your team's space in Slack, at an address like `your-team.slack.com`; it contains all your channels. Pairing links one workspace to your Claude organization so `@Claude` can run in its channels and usage bills to your organization.

This step shows three numbered substeps:

<Steps>
  <Step title="Install Claude for Slack">
    The **Install Claude for Slack** link opens the Slack Marketplace listing. Click **Add to Slack** there and approve the permissions.
  </Step>

  <Step title="Send `@Claude connect` as a new channel message">
    This message is shown with a copy button. In any channel of the workspace you just installed in, paste and send it as a new top-level message with no other text; sent as a reply inside a thread, the command is treated as a normal request and no code is issued. Claude replies with a pairing code valid for 15 minutes.

    Only a Slack workspace admin can run `@Claude connect`; anyone else gets a message naming who to ask. If that's not you, [send them the install request](/claude-tag/admins/pair-workspace#send-the-install-request-to-your-slack-admin) and have them return the code.
  </Step>

  <Step title="Paste the code Claude sends you">
    Paste the code into the input field (the placeholder reads `workspace_…`).
  </Step>
</Steps>

Under **Set up Claude Tag in**, choose **Whole workspace (Recommended)** or **Specific channel** (which asks for channel IDs). Click **Next**.

See [Pair your Slack workspace](/claude-tag/admins/pair-workspace) for the Slack-admin handoff template, what to do if `@Claude connect` fails, and pairing on Enterprise Grid.

### Give Claude Tag access

An [Access bundle](/claude-tag/concepts/glossary#access-bundle) is a named set of credentials, repository grants, plugins, and instructions that Claude uses on behalf of anyone in the channels it covers.

<Steps>
  <Step title="Name the bundle">
    **Access bundle name** is prefilled as **Slack default**; rename it if you want.
  </Step>

  <Step title="Connect your most-used apps">
    For each listed app you want Claude to reach, click **Connect** and enter a service-account credential (not a personal login). Use **Connect another tool** for a service that isn't listed.
  </Step>
</Steps>

<Note>GitHub isn't in this app list because it's managed through the Claude GitHub App rather than a credential. If the app is already linked to your Claude organization, the setup dialog includes a [dedicated repository step](#give-claude-access-to-your-orgs-repos) for it; see [Configure GitHub access](/claude-tag/admins/configure-github) for the full setup.</Note>

You can skip connections here and add them afterward; without any, Claude can be invited to channels but can't act in your tools beyond Slack. Web search and a [default set of network hosts](/claude-tag/admins/add-connections#allow-a-host-without-a-credential) still work. Click **Next**.

See [Give Claude access](/claude-tag/admins/add-connections) for which services to connect first and how to create the service accounts, and the [per-service connection guides](/claude-tag/admins/connections/overview) for credential fields per tool.

### Give Claude access to your org's repos

This step appears only if your Claude organization already has the Claude GitHub App linked. Organizations without a linked GitHub installation move straight to the spending limit, and can [grant repository access](/claude-tag/admins/configure-github) after setup instead.

<Steps>
  <Step title="Grant repositories per installation">
    Each linked GitHub installation is listed. For each installation, **Connect** grants every repository. To grant only specific repositories, open the menu next to it, choose **Manage repos…**, select the repositories you want, and choose **Apply**.
  </Step>
</Steps>

These grants apply to every channel Claude is in. You can [add repositories to specific channels later](/claude-tag/admins/attach-to-scope). Click **Next**.

See [Configure GitHub access](/claude-tag/admins/configure-github) for linking the Claude GitHub App and managing repository grants after setup.

### Set a spending limit

Channel work draws from your organization's usage balance, not from individual seats; the spend limit caps how much of that balance Claude Tag can use each billing period. (DMs run on the user's own claude.ai account and aren't capped by this limit.)

<Steps>
  <Step title="Pick a preset or enter a custom amount">
    Choose from `$100`, `$250`, `$500`, `$1,000` (the default), **Unlimited**, or **Custom** (a US-dollar amount up to `$1,000,000`).
  </Step>
</Steps>

If your organization has no usage credits, this step shows **Buy usage credits** instead with a **Buy now** button; load credits, then continue. Click **Next**.

See [Set a spend limit](/claude-tag/admins/set-spend-limit) for what counts toward the cap, per-channel limits, and what users see when it's reached.

### Review and launch

<Steps>
  <Step title="Confirm and enable">
    Leave **Turn on Claude Tag** on.
  </Step>

  <Step title="Click Launch Claude">
    The dialog closes; Claude is now reachable in the workspace you paired.
  </Step>
</Steps>

## Change a setting after setup

Everything you set during setup can be changed afterward on the [Claude Tag admin page](https://claude.ai/admin-settings/claude-tag).

| To change                                                                       | Go to                                                                                                                                                         |
| :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pair another workspace, or disconnect one                                       | The Slack row's **⋮** menu under **Where Claude Tag works**; see [Manage workspaces](/claude-tag/admins/workspaces)                                           |
| The Access bundle's name, connections, domains, repos, plugins, or instructions | **Access bundles** in the left navigation, or any scope's panel on the **Slack** tab; see [Give Claude access](/claude-tag/admins/add-connections)            |
| The spending limit                                                              | [`claude.ai/admin-settings/usage/claude-tag`](https://claude.ai/admin-settings/usage/claude-tag); see [Set a spend limit](/claude-tag/admins/set-spend-limit) |
| Whether Claude Tag is enabled at all                                            | The **Enable Claude Tag for your organization** toggle at the top of the admin page                                                                           |

## Test that setup worked

In Slack, in your pilot channel, run `/invite @Claude` and then `@Claude summarize this channel`.

An *is thinking…* status under your message means the app is installed and listening. A reply means the workspace is paired and the channel is on the new version. This task doesn't touch any connection, so it isolates pairing from credential issues.

The [See it work](/claude-tag/admins/test-it) page has more prompts that run with no connections, and a per-connection test that proves each credential works.

## After setup

After your test passes, these guides cover what's not part of initial setup:

| Guide                                                                                                     | Do this when                                                                                                                                        |
| :-------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Give Claude access](/claude-tag/admins/add-connections)                                                  | You skipped connections during setup, or a team needs another tool connected                                                                        |
| [Allow a host without a credential](/claude-tag/admins/add-connections#allow-a-host-without-a-credential) | Claude reports a blocked host, or a channel needs to reach a site or API that doesn't take a credential                                             |
| [Configure per-channel access](/claude-tag/admins/attach-to-scope)                                        | One channel needs more (or different) access than the default. Keep elevated credentials in private-channel scopes; the org baseline stays minimal. |
| [Configure GitHub access](/claude-tag/admins/configure-github)                                            | You didn't grant repository access during setup, or you need to add more repositories                                                               |
| [Restrict where Claude operates](/claude-tag/admins/restrict-access)                                      | Governance review: guest channels, member access, DM policy                                                                                         |
| [Customize](/claude-tag/admins/customize)                                                                 | Standing instructions, plugins, and what channel members can change                                                                                 |

There are two common ways to roll out from here:

| Pattern                  | What you do                                                    | What channel members experience                                                                |
| :----------------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| Pilot first              | One bundle on one workspace or channel; widen after validating | Claude appears in a few channels first, with capability growing as scopes are attached         |
| Single bundle everywhere | One broad bundle at organization defaults                      | Every channel gets the same capability on day one. Fits orgs that already grant tools broadly. |

## Common setup issues

| You expected                                                                       | But got                                                                       | Do this                                                                                                                                                                                                                                                                                     |
| :--------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A pairing code from `@Claude connect`                                              | “Only Slack workspace admins can link…”                                       | The person who sent `@Claude connect` isn't a Slack workspace admin. [Send the request](/claude-tag/admins/pair-workspace#send-the-install-request-to-your-slack-admin) to someone who is.                                                                                                  |
| A pairing code                                                                     | “…installation is out of date”                                                | The app was updated with permissions your workspace hasn't approved yet. A Slack admin approves the update or reinstalls the app, then sends `@Claude connect` again. See [both remedies](/claude-tag/admins/pair-workspace#if-claude-connect-says-the-installation-is-out-of-date).        |
| The Slack row under **Where Claude Tag works** to show your workspace as connected | It still shows **Not connected**                                              | The code may have expired (codes last 15 minutes) or come from a different workspace. Send `@Claude connect` again for a fresh code.                                                                                                                                                        |
| A connected tool to work in your test                                              | “I can't reach…”                                                              | Connections only apply to **new** threads. Start a fresh thread before anything else.                                                                                                                                                                                                       |
| The **Where Claude Tag works** section with a **+ Connect** button                 | Only the legacy Claude in Slack toggles                                       | Your organization isn't enabled for Claude Tag. Contact your account team.                                                                                                                                                                                                                  |
| Claude to respond in Slack                                                         | A reply that Claude in Slack isn't available or enabled for your organization | The workspace is paired to a Claude organization that isn't enabled for Claude Tag. Turn on the **Enable Claude Tag for your organization** toggle. See [the troubleshooting entry](/claude-tag/admins/pair-workspace#if-claude-says-claude-in-slack-is-unavailable-for-your-organization). |
| The **Slack** tab to list your scopes                                              | "Couldn't load Slack scopes. Reload the page to try again."                   | A page-load fetch failed; reload. Your configuration is intact.                                                                                                                                                                                                                             |
| A reply in your test channel                                                       | "Couldn't check this channel just now"                                        | The pre-reply guest check briefly failed. Mention `@Claude` again.                                                                                                                                                                                                                          |
| A reply in your test channel                                                       | "Something went wrong starting a session"                                     | Retry first. If it persists, see [the session-start entries](/claude-tag/admins/troubleshooting#something-went-wrong-starting-a-session).                                                                                                                                                   |

## Related resources

* [Network requirements](/claude-tag/admins/network-requirements): what your services must allowlist so Claude can reach them
