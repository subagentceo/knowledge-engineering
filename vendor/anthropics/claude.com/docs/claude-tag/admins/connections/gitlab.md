> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect GitLab

> Connect GitLab to Claude Tag for repo access and merge-request comments. Covers token permissions, self-managed hostnames, and how it differs from GitHub.

export const BetaNote = () => <Info>Claude Tag is in public beta. Features and behavior described here may change before general availability.</Info>;

<BetaNote />

<Note>Connections are added inside an [Access bundle](/claude-tag/admins/add-connections#your-first-access-bundle). At [`claude.ai/admin-settings/claude-tag`](https://claude.ai/admin-settings/claude-tag), open **Access bundles** in the left navigation, click into a bundle (or **Create** one), and go to its **Credentials** tab.</Note>

Connecting GitLab lets Claude clone repositories, read and search projects, comment on issues and merge requests, and check pipeline status, all through the GitLab REST API. The connection is a single access token added to a bundle.

Pair this connection with the GitLab plugin from Anthropic's plugin marketplace so Claude knows how to call the API; see [Attach plugins](/claude-tag/admins/add-connections#attach-plugins).

## Add the connection

<Steps>
  <Step title="Create the token in GitLab">
    A project access token or group access token, so activity is attributed to a bot identity rather than a person. Grant the `api` scope for read and write; `read_api` for read-only. The token starts with `glpat-`.
  </Step>

  <Step title="Add the credential to a bundle">
    On the bundle's **Credentials** tab, click **Connect** next to **GitLab** and paste the token. For self-managed GitLab, switch to the form's **Advanced** tab and add your instance's hostname under **Allowed websites**.
  </Step>
</Steps>

**You'll see:** GitLab listed in the bundle's connections, and `@Claude what can you access from this channel?` returns it in a new thread under the bundle's scope.

| Field                          | Value                                                                                                                                                   |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Claude's personal access token | The token from GitLab, starting with `glpat-`. Project and group access tokens work here too; the label is the field name, not a token-type constraint. |
| Allowed websites               | `gitlab.com` (preset). For self-managed GitLab, open the **Advanced** tab and add your instance's hostname here.                                        |

GitLab's own guide for creating tokens is at [docs.gitlab.com](https://docs.gitlab.com/api/rest/authentication/).

## How GitLab differs from GitHub

|                              | GitLab                                              | GitHub                                                                             |
| :--------------------------- | :-------------------------------------------------- | :--------------------------------------------------------------------------------- |
| Auth                         | One org-level access token                          | The Claude GitHub App, [installed separately](/claude-tag/admins/configure-github) |
| Attaching a repo in a thread | Give Claude the full repository URL; it clones it   | Typing `owner/repo` in the message auto-attaches it                                |
| Self-managed                 | Your hostname under **Advanced → Allowed websites** | [GitHub Enterprise setup](/claude-tag/admins/configure-github#github-enterprise)   |

The token is auto-injected on every request to your GitLab host and used as the credential when cloning repositories into a session. The model and the sandbox are not given the key; see [how Agent Proxy works](/claude-tag/concepts/agent-identity#agent-proxy).

## Related resources

* [What this connection adds](/claude-tag/users/use-cases/fix-bugs): the code use cases
* [Configure GitHub access](/claude-tag/admins/configure-github): the GitHub App path, which is different
* [Give Claude access](/claude-tag/admins/add-connections): the full credential-type and allowed-hosts reference
