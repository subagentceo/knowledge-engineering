> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure GitHub access

> Claude Tag gives Claude its own GitHub identity, so it opens pull requests as Claude. See how to link your GitHub organization, grant repositories to a bundle, what loads when a repository is cloned into a session, and how to get project dependencies installed.

export const BetaNote = () => <Info>Claude Tag is in public beta. Features and behavior described here may change before general availability.</Info>;

<BetaNote />

Claude Tag gives Claude its own GitHub identity, the Claude GitHub App, so pull requests it opens from a channel are authored by Claude rather than by a person. You only need GitHub access if a team will hand Claude code work: branches, pull requests, review, or CI follow-up.

You link GitHub once for your Claude organization, then grant repositories per Access bundle.

<Tip>If you link your GitHub organization before running the [setup dialog](/claude-tag/admins/setup-overview), the dialog includes a step for granting repository access inline, so you don't need to return to the Repositories tab afterward.</Tip>

## Link your GitHub organization

<Note>
  The person who completes the link must be both an **owner of the GitHub organization** and an **Admin in your Claude organization**. If you aren't a GitHub organization owner, use **Copy message** under **Not a GitHub organization owner?** on the GitHub settings page to send the link to someone who is.
</Note>

<Steps>
  <Step title="Open the GitHub settings page">
    Open [`claude.ai/admin-settings/claude-code/github`](https://claude.ai/admin-settings/claude-code/github). This page is shared with Claude Code; one connection serves both products.
  </Step>

  <Step title="Connect GitHub">
    Click **Connect GitHub** and complete the GitHub authorization. After authorizing, the page shows two sections: **Installations** lists organizations already linked, and **Unlinked accounts** lists organizations where the Claude GitHub App is installed but not yet linked.
  </Step>

  <Step title="Link or install">
    If your organization is under **Unlinked accounts**, click **Link** next to it. If it isn't listed at all, click **Install on another organization** and complete the install on github.com; you're returned to this page with the organization under **Installations** as **Active**.

    * A disabled **Link** button means you aren't an owner of that GitHub organization
    * A **Needs permissions** status means the installation has a pending request; **Review permissions** takes you to github.com to approve it
  </Step>
</Steps>

## Grant repository access

The remaining steps are in the Claude Tag admin page, not GitHub's settings. Repository grants live on the Access bundle; editing a bundle's Repositories tab requires the **Owner** role in your Claude organization.

<Steps>
  <Step title="Open the bundle's Repositories tab">
    Open an [Access bundle](/claude-tag/admins/add-connections#your-first-access-bundle) and go to its **Repositories** tab. Before any GitHub organization is linked, this tab shows a **Get started with GitHub** button that opens [`claude.ai/admin-settings/claude-code/github`](https://claude.ai/admin-settings/claude-code/github).
  </Step>

  <Step title="Select repositories">
    Choose the repositories Claude can read from and open pull requests against. Access is per listed repository, or choose **Connect all repos** for the organization.
  </Step>
</Steps>

## Verify GitHub access

* The GitHub organization shows as **Active** under **Installations** at [`claude.ai/admin-settings/claude-code/github`](https://claude.ai/admin-settings/claude-code/github).
* The granted repositories are listed in the bundle's **Repositories** tab.
* For the end-to-end check, open a draft PR from a test channel; see [Verify the bundle is live](/claude-tag/admins/attach-to-scope#verify-the-bundle-is-live).

### If Claude can't reach a repository

When Claude replies "That environment or repo isn't configured for Claude Code", or reports that GitHub returned a 403, check the two levels in order.

| Check                                                                                                             | Where                                                                                                                                                                                                                                                    |
| :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The GitHub organization that owns the repository shows **Active** under **Installations**                         | [`claude.ai/admin-settings/claude-code/github`](https://claude.ai/admin-settings/claude-code/github). An installation still waiting on a GitHub organization owner shows **Needs permissions**; **Review permissions** opens the approval on github.com. |
| The repository is listed on the bundle's **Repositories** tab, and that bundle is attached to the channel's scope | [`claude.ai/admin-settings/claude-tag`](https://claude.ai/admin-settings/claude-tag) → **Access bundles** → the bundle → **Repositories**. A repository granted in one bundle isn't reachable from a channel under a different bundle.                   |

Repository grants apply to new threads. After changing the **Repositories** tab, start a fresh thread in the channel and name the repository in the first message.

## How granted repositories reach a session

Granting a repository in a bundle makes it *available* to Claude in any channel under that bundle's scope. It doesn't clone the code into a session on its own. A session starts with no repositories checked out; Claude clones one when the request names it, or when someone in the thread tells it which repository to add. Tell your team to name the repository in the first message of a code task.

### What loads from a repository

When Claude clones a granted repository into a session, its `CLAUDE.md`, `.claude/CLAUDE.md`, and `.claude/rules/*.md` files load on the next turn after the clone completes, so project context arrives without further prompting. A repository's `.mcp.json` is never loaded; connections come only from the Access bundle.

### Install project dependencies

Every session runs in an isolated sandbox with a standard set of preinstalled tools. The sandbox is the same for every repository; there is no setup script or custom image to configure. If a project needs something the standard set doesn't include, such as a specific language runtime or a database client, add the install commands to the repository's `CLAUDE.md`.

Claude follows `CLAUDE.md` as guidance when it starts work that needs it, not as an unconditional setup step. Write each install as a precondition of the work it supports, for example "install the SDK before building or running tests", so Claude runs it when a task touches that code. The sandbox is fresh for every session, so the installs repeat each time Claude works in the repository.

Prefer the standard package manager and its default registry over a vendor install script or a third-party package source. Package managers such as `apt`, `pip`, `npm`, and `dotnet` reach their default registries from the sandbox; downloads from other hosts can be blocked at the sandbox's [egress boundary](/claude-tag/concepts/security-and-data#network-egress). An Owner can allow an additional host on the bundle's Domains tab; see [Allow a host without a credential](/claude-tag/admins/add-connections#allow-a-host-without-a-credential).

## GitHub Actions access

Claude reads GitHub Actions but does not write to it. It can list and view workflow runs and logs, so it can watch a pull request's checks and report when CI passes or fails. The branches and pull requests it pushes trigger `push` and `pull_request` workflows like any other commit.

Claude can't dispatch, re-run, or cancel workflow runs, and it can't edit workflow files. Those requests fail with `403 GitHub Actions writes are not permitted for this session type`. The restriction guards against CI tampering, and no setting lifts it. Adding `api.github.com` as a [custom connection](/claude-tag/admins/connections/custom) with your own token doesn't enable Actions writes either; requests to GitHub always go through the Claude GitHub App.

To let Claude start a workflow on demand, give the workflow a trigger Claude can create. A `push` trigger scoped to a designated branch pattern means asking Claude to push there starts the run, and Claude can then follow it to completion.

## Scheduled work uses the same connection

Scheduled jobs use the same GitHub connection as interactive work, with nothing extra to configure. A recurring job that can't reach its repository skips that run and retries on its next schedule; after three consecutive failed runs spanning at least an hour, it disables itself. A one-time job that can't reach its repository is disabled on the first failure; the routine's page shows why.

## GitHub Enterprise

### GitHub Enterprise Cloud with data residency

Organizations on `*.ghe.com` (Enterprise Cloud with Data Residency) are registered the same way as a GitHub Enterprise Server host below.

### GitHub Enterprise Server

GitHub Enterprise Server instances are supported when reachable from the public internet. A GHES host on a private network without a public address can't be connected.

On GHES, you create the GitHub App on your own instance instead of installing Anthropic's. The setup is shared with Claude Code; follow the [Claude Code GitHub Enterprise Server guide](https://code.claude.com/docs/en/github-enterprise-server) to create and register the app. After registering the GHE host, a host picker appears on the bundle's **Repositories** tab; select your host there to grant its repositories.

Registering a GHE host with your Claude organization isn't fully self-serve. Raise it with your account team if the guide doesn't get you all the way through.

## Related resources

* [Configure per-channel access](/claude-tag/admins/attach-to-scope): bind the bundle to the workspaces and channels that need it
* [Set up routines](/claude-tag/users/proactivity): the scheduled jobs that use this connection
