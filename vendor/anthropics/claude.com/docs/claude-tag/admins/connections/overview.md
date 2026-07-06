> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Per-service connection guides

> Step-by-step setup for each tool Claude Tag can connect to. Each guide covers the dedicated account to create, the credential to enter, and the URL to allow.

export const BetaNote = () => <Info>Claude Tag is in public beta. Features and behavior described here may change before general availability.</Info>;

<BetaNote />

Each guide covers one service: how to create the credential as a dedicated identity, what to paste into the Access bundle, and the Allowed websites value. For the model behind connections (credential types, Agent Proxy, allowed websites), see [Give Claude access](/claude-tag/admins/add-connections).

<Warning>Always connect a dedicated account for Claude (for example, `claude@yourcompany.example.com`), not your personal login. Anyone in a channel under the bundle's [scope](/claude-tag/admins/attach-to-scope) can use the connection through Claude, so whatever this account can reach is available to every member of those channels. See [Create a dedicated account per service](/claude-tag/admins/add-connections#create-a-dedicated-account-per-service).</Warning>

| Service                         | Category           | Guide                                                                   |
| :------------------------------ | :----------------- | :---------------------------------------------------------------------- |
| Datadog                         | Monitoring         | [Connect Datadog](/claude-tag/admins/connections/datadog)               |
| Sentry                          | Monitoring         | [Connect Sentry](/claude-tag/admins/connections/sentry)                 |
| PagerDuty                       | Monitoring         | [Connect PagerDuty](/claude-tag/admins/connections/pagerduty)           |
| Linear                          | Issue tracking     | [Connect Linear](/claude-tag/admins/connections/linear)                 |
| Asana                           | Issue tracking     | [Connect Asana](/claude-tag/admins/connections/asana)                   |
| Jira and Confluence (custom)    | Issue tracking     | [Connect Jira and Confluence](/claude-tag/admins/connections/atlassian) |
| Notion                          | Knowledge and docs | [Connect Notion](/claude-tag/admins/connections/notion)                 |
| Google (Drive, Calendar, Gmail) | Knowledge and docs | [Connect Google](/claude-tag/admins/connections/google)                 |
| HubSpot                         | Go-to-market       | [Connect HubSpot](/claude-tag/admins/connections/hubspot)               |
| Salesforce (custom)             | Go-to-market       | [Connect Salesforce](/claude-tag/admins/connections/salesforce)         |
| Gong                            | Go-to-market       | [Connect Gong](/claude-tag/admins/connections/gong)                     |
| GitLab                          | Code               | [Connect GitLab](/claude-tag/admins/connections/gitlab)                 |
| BigQuery (custom)               | Data warehouse     | [Connect BigQuery](/claude-tag/admins/connections/bigquery)             |
| Snowflake (custom)              | Data warehouse     | [Connect Snowflake](/claude-tag/admins/connections/snowflake)           |
| Stripe                          | Billing            | [Connect Stripe](/claude-tag/admins/connections/stripe)                 |
| Vercel                          | Deployments        | [Connect Vercel](/claude-tag/admins/connections/vercel)                 |

GitHub is managed through the Claude GitHub App rather than a connection in this list; see [Configure GitHub access](/claude-tag/admins/configure-github).

Services marked (custom) have no preset button. Add them with **Connect another tool** following their guide.

The presets and guides cover common services, not the full set Claude can connect to. Any app with an API can be added as a custom connection or a custom MCP server. See [Connect a custom service](/claude-tag/admins/connections/custom) for the credential types and form fields.
