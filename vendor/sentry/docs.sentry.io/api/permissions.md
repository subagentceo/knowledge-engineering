---
title: "Permissions & Scopes"
url: https://docs.sentry.io/api/permissions/
---

# Permissions & Scopes

If you're building on top of Sentry's API (i.e using [Auth Tokens](https://docs.sentry.io/api/auth.md)), you'll need certain scopes to access different API endpoints.

To set the scopes for an [integration token](https://docs.sentry.io/integrations/integration-platform.md#permissions), select the scopes from the dropdown. These can be edited later.

To set the scopes for an personal token, select the scopes from the dropdown when [creating a personal token](https://sentry.io/api/). These cannot be edited later.

If you're looking for information on membership roles please visit the [membership](https://docs.sentry.io/organization/membership.md) documentation.

### [Organizations](https://docs.sentry.io/api/permissions.md#organizations)

|              |             |
| ------------ | ----------- |
| **GET**      | `org:read`  |
| **PUT/POST** | `org:write` |
| **DELETE**   | `org:admin` |

### [Continuous Integration (CI)](https://docs.sentry.io/api/permissions.md#continuous-integration-ci)

|                  |          |
| ---------------- | -------- |
| **CI Workflows** | `org:ci` |

Use the `org:ci` scope for CI and deployment workflows, including uploading source maps, creating releases, and managing code mappings.

### [Projects](https://docs.sentry.io/api/permissions.md#projects)

|              |                 |
| ------------ | --------------- |
| **GET**      | `project:read`  |
| **PUT/POST** | `project:write` |
| **DELETE**   | `project:admin` |

##### Note

The `project:releases` scope will give you access to both **project** and **organization** release endpoints. The available endpoints are listed in the [Releases](https://docs.sentry.io/api/releases.md) section of the API Documentation.

### [Teams](https://docs.sentry.io/api/permissions.md#teams)

|              |              |
| ------------ | ------------ |
| **GET**      | `team:read`  |
| **PUT/POST** | `team:write` |
| **DELETE**   | `team:admin` |

### [Members](https://docs.sentry.io/api/permissions.md#members)

|              |                |
| ------------ | -------------- |
| **GET**      | `member:read`  |
| **PUT/POST** | `member:write` |
| **DELETE**   | `member:admin` |

### [Issues & Events](https://docs.sentry.io/api/permissions.md#issues--events)

|            |               |
| ---------- | ------------- |
| **GET**    | `event:read`  |
| **PUT**    | `event:write` |
| **DELETE** | `event:admin` |

##### Note

**PUT/DELETE** methods only apply to updating/deleting issues. Events in Sentry are immutable and can only be deleted by deleting the whole issue.

### [Releases](https://docs.sentry.io/api/permissions.md#releases)

|                         |                    |
| ----------------------- | ------------------ |
| **GET/PUT/POST/DELETE** | `project:releases` |

##### Note

Be aware that if you're using `sentry-cli` to [manage your releases](https://docs.sentry.io/cli/releases.md), you'll need a token which also has `org:read` scope.

##### Project Access

In addition to the `project:releases` scope, mutations on releases (create, update, delete, file uploads, deploys) require that the user has access to **all** projects associated with the release. If your organization has [Open Membership](https://docs.sentry.io/organization/membership.md#open-membership) disabled, members can only modify releases for projects belonging to teams they are a member of.
