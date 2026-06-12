# Permissions required for fine-grained personal access tokens

For each permission granted to a fine-grained personal access token, these are the REST API endpoints that the app can use.

## About permissions required for fine-grained personal access token

When you create a fine-grained personal access token, you grant it a set of permissions. Permissions define what resources the GitHub App can access via the API. For more information, see [Managing your personal access tokens](/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

To help you choose the correct permissions, you will receive the `X-Accepted-GitHub-Permissions` header in the REST API response. The header will tell you what permissions are required in order to access the endpoint. For more information, see [Troubleshooting the REST API](/en/rest/overview/troubleshooting#resource-not-accessible).

These permissions are required to access private resources. Some endpoints can also be used to access public resources without these permissions. To see whether an endpoint can access public resources without a permission, see the documentation for that endpoint.

Some endpoints require more than one permission. Other endpoints work with any one permission from a set of permissions. In these cases, the "Additional permissions" column will include a checkmark. For full details about the permissions that are required to use the endpoint, see the documentation for that endpoint.

## Organization permissions for "API Insights"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /orgs/{org}/insights/api/route-stats/{actor_type}/{actor_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/insights/api/subject-stats` | read | PAT | ✗ |
| `GET /orgs/{org}/insights/api/summary-stats` | read | PAT | ✗ |
| `GET /orgs/{org}/insights/api/summary-stats/users/{user_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/insights/api/summary-stats/{actor_type}/{actor_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/insights/api/time-stats` | read | PAT | ✗ |
| `GET /orgs/{org}/insights/api/time-stats/users/{user_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/insights/api/time-stats/{actor_type}/{actor_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/insights/api/user-stats/{user_id}` | read | PAT | ✗ |

## Organization permissions for "Administration"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /organizations/{org}/actions/cache/retention-limit` | write | PAT | ✗ |
| `PUT /organizations/{org}/actions/cache/storage-limit` | write | PAT | ✗ |
| `POST /organizations/{org}/settings/billing/budgets` | write | PAT | ✗ |
| `PATCH /organizations/{org}/settings/billing/budgets/{budget_id}` | write | PAT | ✗ |
| `DELETE /organizations/{org}/settings/billing/budgets/{budget_id}` | write | PAT | ✗ |
| `PATCH /orgs/{org}` | write | PAT | ✗ |
| `DELETE /orgs/{org}` | write | PAT | ✗ |
| `POST /orgs/{org}/actions/hosted-runners` | write | PAT | ✗ |
| `PATCH /orgs/{org}/actions/hosted-runners/{hosted_runner_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/actions/hosted-runners/{hosted_runner_id}` | write | PAT | ✗ |
| `POST /orgs/{org}/actions/oidc/customization/properties/repo` | write | PAT | ✗ |
| `DELETE /orgs/{org}/actions/oidc/customization/properties/repo/{custom_property_name}` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/oidc/customization/sub` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/permissions` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/permissions/artifact-and-log-retention` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/permissions/fork-pr-contributor-approval` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/permissions/fork-pr-workflows-private-repos` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/permissions/repositories` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/permissions/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}` | write | PAT | ✓ |
| `PUT /orgs/{org}/actions/permissions/selected-actions` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/permissions/self-hosted-runners` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/permissions/self-hosted-runners/repositories` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/permissions/self-hosted-runners/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/actions/permissions/self-hosted-runners/repositories/{repository_id}` | write | PAT | ✓ |
| `PUT /orgs/{org}/actions/permissions/workflow` | write | PAT | ✗ |
| `POST /orgs/{org}/code-security/configurations` | write | PAT | ✗ |
| `DELETE /orgs/{org}/code-security/configurations/detach` | write | PAT | ✗ |
| `PATCH /orgs/{org}/code-security/configurations/{configuration_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/code-security/configurations/{configuration_id}` | write | PAT | ✗ |
| `POST /orgs/{org}/code-security/configurations/{configuration_id}/attach` | write | PAT | ✗ |
| `PUT /orgs/{org}/code-security/configurations/{configuration_id}/defaults` | write | PAT | ✗ |
| `POST /orgs/{org}/copilot/billing/selected_teams` | write | PAT | ✓ |
| `DELETE /orgs/{org}/copilot/billing/selected_teams` | write | PAT | ✓ |
| `POST /orgs/{org}/copilot/billing/selected_users` | write | PAT | ✓ |
| `DELETE /orgs/{org}/copilot/billing/selected_users` | write | PAT | ✓ |
| `PATCH /orgs/{org}/dependabot/repository-access` | write | PAT | ✗ |
| `PUT /orgs/{org}/dependabot/repository-access/default-level` | write | PAT | ✗ |
| `PUT /orgs/{org}/interaction-limits` | write | PAT | ✗ |
| `DELETE /orgs/{org}/interaction-limits` | write | PAT | ✗ |
| `GET /orgs/{org}/rulesets` | write | PAT | ✗ |
| `POST /orgs/{org}/rulesets` | write | PAT | ✗ |
| `GET /orgs/{org}/rulesets/rule-suites` | write | PAT | ✗ |
| `GET /orgs/{org}/rulesets/rule-suites/{rule_suite_id}` | write | PAT | ✗ |
| `GET /orgs/{org}/rulesets/{ruleset_id}` | write | PAT | ✗ |
| `PUT /orgs/{org}/rulesets/{ruleset_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/rulesets/{ruleset_id}` | write | PAT | ✗ |
| `GET /orgs/{org}/rulesets/{ruleset_id}/history` | write | PAT | ✗ |
| `GET /orgs/{org}/rulesets/{ruleset_id}/history/{version_id}` | write | PAT | ✗ |
| `PATCH /orgs/{org}/secret-scanning/pattern-configurations` | write | PAT | ✗ |
| `PUT /orgs/{org}/security-managers/teams/{team_slug}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/security-managers/teams/{team_slug}` | write | PAT | ✗ |
| `PUT /orgs/{org}/settings/immutable-releases` | write | PAT | ✗ |
| `PUT /orgs/{org}/settings/immutable-releases/repositories` | write | PAT | ✓ |
| `PUT /orgs/{org}/settings/immutable-releases/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/settings/immutable-releases/repositories/{repository_id}` | write | PAT | ✓ |
| `POST /orgs/{org}/{security_product}/{enablement}` | write | PAT | ✗ |
| `GET /organizations/{org}/actions/cache/retention-limit` | read | PAT | ✗ |
| `GET /organizations/{org}/actions/cache/storage-limit` | read | PAT | ✗ |
| `GET /organizations/{org}/settings/billing/ai_credit/usage` | read | PAT | ✗ |
| `GET /organizations/{org}/settings/billing/budgets` | read | PAT | ✗ |
| `GET /organizations/{org}/settings/billing/budgets/{budget_id}` | read | PAT | ✗ |
| `GET /organizations/{org}/settings/billing/premium_request/usage` | read | PAT | ✗ |
| `GET /organizations/{org}/settings/billing/usage` | read | PAT | ✗ |
| `GET /organizations/{org}/settings/billing/usage/summary` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/cache/usage` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/cache/usage-by-repository` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners/images/github-owned` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners/images/partner` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners/limits` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners/machine-sizes` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners/platforms` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners/{hosted_runner_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/oidc/customization/properties/repo` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/oidc/customization/sub` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/permissions` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/permissions/artifact-and-log-retention` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/permissions/fork-pr-contributor-approval` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/permissions/fork-pr-workflows-private-repos` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/permissions/repositories` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/permissions/selected-actions` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/permissions/self-hosted-runners` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/permissions/self-hosted-runners/repositories` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/permissions/workflow` | read | PAT | ✗ |
| `GET /orgs/{org}/code-security/configurations` | read | PAT | ✗ |
| `GET /orgs/{org}/code-security/configurations/defaults` | read | PAT | ✗ |
| `GET /orgs/{org}/code-security/configurations/{configuration_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/code-security/configurations/{configuration_id}/repositories` | read | PAT | ✗ |
| `GET /orgs/{org}/copilot/billing` | read | PAT | ✓ |
| `GET /orgs/{org}/copilot/billing/seats` | read | PAT | ✓ |
| `GET /orgs/{org}/copilot/metrics` | read | PAT | ✓ |
| `GET /orgs/{org}/dependabot/repository-access` | read | PAT | ✗ |
| `GET /orgs/{org}/installations` | read | PAT | ✗ |
| `GET /orgs/{org}/interaction-limits` | read | PAT | ✗ |
| `GET /orgs/{org}/members/{username}/copilot` | read | PAT | ✓ |
| `GET /orgs/{org}/secret-scanning/pattern-configurations` | read | PAT | ✗ |
| `GET /orgs/{org}/security-managers` | read | PAT | ✗ |
| `GET /orgs/{org}/settings/immutable-releases` | read | PAT | ✗ |
| `GET /orgs/{org}/settings/immutable-releases/repositories` | read | PAT | ✗ |
| `GET /orgs/{org}/team/{team_slug}/copilot/metrics` | read | PAT | ✓ |

## Organization permissions for "Agent secrets"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /orgs/{org}/agents/secrets/{secret_name}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/agents/secrets/{secret_name}` | write | PAT | ✗ |
| `PUT /orgs/{org}/agents/secrets/{secret_name}/repositories` | write | PAT | ✗ |
| `PUT /orgs/{org}/agents/secrets/{secret_name}/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/agents/secrets/{secret_name}/repositories/{repository_id}` | write | PAT | ✓ |
| `GET /orgs/{org}/agents/secrets` | read | PAT | ✗ |
| `GET /orgs/{org}/agents/secrets/public-key` | read | PAT | ✗ |
| `GET /orgs/{org}/agents/secrets/{secret_name}` | read | PAT | ✗ |
| `GET /orgs/{org}/agents/secrets/{secret_name}/repositories` | read | PAT | ✗ |

## Organization permissions for "Agent variables"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/agents/variables` | write | PAT | ✗ |
| `PATCH /orgs/{org}/agents/variables/{name}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/agents/variables/{name}` | write | PAT | ✗ |
| `PUT /orgs/{org}/agents/variables/{name}/repositories` | write | PAT | ✗ |
| `PUT /orgs/{org}/agents/variables/{name}/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/agents/variables/{name}/repositories/{repository_id}` | write | PAT | ✓ |
| `GET /orgs/{org}/agents/variables` | read | PAT | ✗ |
| `GET /orgs/{org}/agents/variables/{name}` | read | PAT | ✗ |
| `GET /orgs/{org}/agents/variables/{name}/repositories` | read | PAT | ✗ |

## Organization permissions for "Blocking users"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /orgs/{org}/blocks/{username}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/blocks/{username}` | write | PAT | ✗ |
| `GET /orgs/{org}/blocks` | read | PAT | ✗ |
| `GET /orgs/{org}/blocks/{username}` | read | PAT | ✗ |

## Organization permissions for "Campaigns"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/campaigns` | write | PAT | ✗ |
| `PATCH /orgs/{org}/campaigns/{campaign_number}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/campaigns/{campaign_number}` | write | PAT | ✗ |
| `GET /orgs/{org}/campaigns` | read | PAT | ✗ |
| `GET /orgs/{org}/campaigns/{campaign_number}` | read | PAT | ✗ |

## Organization permissions for "Copilot Spaces"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/copilot-spaces` | write | PAT | ✗ |
| `PUT /orgs/{org}/copilot-spaces/{space_number}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/copilot-spaces/{space_number}` | write | PAT | ✗ |
| `POST /orgs/{org}/copilot-spaces/{space_number}/resources` | write | PAT | ✗ |
| `PUT /orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}` | write | PAT | ✗ |
| `GET /orgs/{org}/copilot-spaces` | read | PAT | ✗ |
| `GET /orgs/{org}/copilot-spaces/{space_number}` | read | PAT | ✗ |
| `GET /orgs/{org}/copilot-spaces/{space_number}/resources` | read | PAT | ✗ |
| `GET /orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}` | read | PAT | ✗ |

## Organization permissions for "Copilot agent settings"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /orgs/{org}/copilot/coding-agent/permissions` | write | PAT | ✗ |
| `PUT /orgs/{org}/copilot/coding-agent/permissions/repositories` | write | PAT | ✗ |
| `PUT /orgs/{org}/copilot/coding-agent/permissions/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/copilot/coding-agent/permissions/repositories/{repository_id}` | write | PAT | ✓ |
| `GET /orgs/{org}/copilot/coding-agent/permissions` | read | PAT | ✗ |
| `GET /orgs/{org}/copilot/coding-agent/permissions/repositories` | read | PAT | ✗ |

## Organization permissions for "Copilot content exclusion"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /orgs/{org}/copilot/content_exclusion` | write | PAT | ✗ |
| `GET /orgs/{org}/copilot/content_exclusion` | read | PAT | ✗ |

## Organization permissions for "Custom organization roles"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /orgs/{org}/organization-roles` | read | PAT | ✗ |
| `GET /orgs/{org}/organization-roles/{role_id}` | read | PAT | ✗ |

## Organization permissions for "Custom properties"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PATCH /orgs/{org}/properties/schema` | admin | PAT | ✗ |
| `PUT /orgs/{org}/properties/schema/{custom_property_name}` | admin | PAT | ✗ |
| `DELETE /orgs/{org}/properties/schema/{custom_property_name}` | admin | PAT | ✗ |
| `PATCH /orgs/{org}/properties/values` | write | PAT | ✗ |
| `GET /orgs/{org}/properties/schema` | read | PAT | ✗ |
| `GET /orgs/{org}/properties/schema/{custom_property_name}` | read | PAT | ✗ |
| `GET /orgs/{org}/properties/values` | read | PAT | ✗ |

## Organization permissions for "Events"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /users/{username}/events/orgs/{org}` | read | PAT | ✗ |

## Organization permissions for "GitHub Copilot Business"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/copilot-spaces/{space_number}/collaborators` | write | PAT | ✗ |
| `PUT /orgs/{org}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}` | write | PAT | ✗ |
| `POST /orgs/{org}/copilot/billing/selected_teams` | write | PAT | ✓ |
| `DELETE /orgs/{org}/copilot/billing/selected_teams` | write | PAT | ✓ |
| `POST /orgs/{org}/copilot/billing/selected_users` | write | PAT | ✓ |
| `DELETE /orgs/{org}/copilot/billing/selected_users` | write | PAT | ✓ |
| `GET /orgs/{org}/copilot-spaces/{space_number}/collaborators` | read | PAT | ✗ |
| `GET /orgs/{org}/copilot/billing` | read | PAT | ✓ |
| `GET /orgs/{org}/copilot/billing/seats` | read | PAT | ✓ |
| `GET /orgs/{org}/copilot/metrics` | read | PAT | ✓ |
| `GET /orgs/{org}/members/{username}/copilot` | read | PAT | ✓ |
| `GET /orgs/{org}/team/{team_slug}/copilot/metrics` | read | PAT | ✓ |

## Organization permissions for "Hosted runner custom images"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `DELETE /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}` | write | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners/images/custom` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}` | read | PAT | ✗ |

## Organization permissions for "Issue Fields"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/issue-fields` | write | PAT | ✗ |
| `PATCH /orgs/{org}/issue-fields/{issue_field_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/issue-fields/{issue_field_id}` | write | PAT | ✗ |
| `GET /orgs/{org}/issue-fields` | read | PAT | ✗ |

## Organization permissions for "Issue Types"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/issue-types` | write | PAT | ✗ |
| `PUT /orgs/{org}/issue-types/{issue_type_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/issue-types/{issue_type_id}` | write | PAT | ✗ |
| `GET /orgs/{org}/issue-types` | read | PAT | ✗ |

## Organization permissions for "Members"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/invitations` | write | PAT | ✗ |
| `DELETE /orgs/{org}/invitations/{invitation_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/members/{username}` | write | PAT | ✗ |
| `PUT /orgs/{org}/memberships/{username}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/memberships/{username}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/organization-roles/teams/{team_slug}` | write | PAT | ✗ |
| `PUT /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/organization-roles/users/{username}` | write | PAT | ✗ |
| `PUT /orgs/{org}/organization-roles/users/{username}/{role_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/organization-roles/users/{username}/{role_id}` | write | PAT | ✗ |
| `PUT /orgs/{org}/outside_collaborators/{username}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/outside_collaborators/{username}` | write | PAT | ✗ |
| `PUT /orgs/{org}/public_members/{username}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/public_members/{username}` | write | PAT | ✗ |
| `POST /orgs/{org}/teams` | write | PAT | ✗ |
| `PATCH /orgs/{org}/teams/{team_slug}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/teams/{team_slug}` | write | PAT | ✗ |
| `PUT /orgs/{org}/teams/{team_slug}/memberships/{username}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}` | write | PAT | ✗ |
| `PATCH /teams/{team_id}` | write | PAT | ✗ |
| `DELETE /teams/{team_id}` | write | PAT | ✗ |
| `PUT /teams/{team_id}/members/{username}` | write | PAT | ✗ |
| `DELETE /teams/{team_id}/members/{username}` | write | PAT | ✗ |
| `PUT /teams/{team_id}/memberships/{username}` | write | PAT | ✗ |
| `DELETE /teams/{team_id}/memberships/{username}` | write | PAT | ✗ |
| `PATCH /user/memberships/orgs/{org}` | write | PAT | ✗ |
| `GET /orgs/{org}/failed_invitations` | read | PAT | ✗ |
| `GET /orgs/{org}/invitations` | read | PAT | ✗ |
| `GET /orgs/{org}/invitations/{invitation_id}/teams` | read | PAT | ✗ |
| `GET /orgs/{org}/members` | read | PAT | ✗ |
| `GET /orgs/{org}/members/{username}` | read | PAT | ✗ |
| `GET /orgs/{org}/memberships/{username}` | read | PAT | ✗ |
| `GET /orgs/{org}/organization-roles/{role_id}/teams` | read | PAT | ✗ |
| `GET /orgs/{org}/organization-roles/{role_id}/users` | read | PAT | ✗ |
| `GET /orgs/{org}/outside_collaborators` | read | PAT | ✗ |
| `GET /orgs/{org}/public_members` | read | PAT | ✗ |
| `GET /orgs/{org}/public_members/{username}` | read | PAT | ✗ |
| `GET /orgs/{org}/teams` | read | PAT | ✗ |
| `GET /orgs/{org}/teams/{team_slug}` | read | PAT | ✗ |
| `GET /orgs/{org}/teams/{team_slug}/invitations` | read | PAT | ✗ |
| `GET /orgs/{org}/teams/{team_slug}/members` | read | PAT | ✗ |
| `GET /orgs/{org}/teams/{team_slug}/memberships/{username}` | read | PAT | ✗ |
| `GET /orgs/{org}/teams/{team_slug}/repos` | read | PAT | ✗ |
| `GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` | read | PAT | ✓ |
| `PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` | read | PAT | ✓ |
| `DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` | read | PAT | ✓ |
| `GET /orgs/{org}/teams/{team_slug}/teams` | read | PAT | ✗ |
| `GET /teams/{team_id}` | read | PAT | ✗ |
| `GET /teams/{team_id}/invitations` | read | PAT | ✗ |
| `GET /teams/{team_id}/members` | read | PAT | ✗ |
| `GET /teams/{team_id}/members/{username}` | read | PAT | ✗ |
| `GET /teams/{team_id}/memberships/{username}` | read | PAT | ✗ |
| `GET /teams/{team_id}/repos` | read | PAT | ✗ |
| `GET /teams/{team_id}/repos/{owner}/{repo}` | read | PAT | ✓ |
| `PUT /teams/{team_id}/repos/{owner}/{repo}` | read | PAT | ✓ |
| `DELETE /teams/{team_id}/repos/{owner}/{repo}` | read | PAT | ✓ |
| `GET /teams/{team_id}/teams` | read | PAT | ✗ |
| `GET /user/memberships/orgs/{org}` | read | PAT | ✗ |

## Organization permissions for "Network configurations"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/settings/network-configurations` | write | PAT | ✗ |
| `PATCH /orgs/{org}/settings/network-configurations/{network_configuration_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/settings/network-configurations/{network_configuration_id}` | write | PAT | ✗ |
| `GET /orgs/{org}/settings/network-configurations` | read | PAT | ✗ |
| `GET /orgs/{org}/settings/network-configurations/{network_configuration_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/settings/network-settings/{network_settings_id}` | read | PAT | ✗ |

## Organization permissions for "Organization Copilot metrics"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /orgs/{org}/copilot/metrics/reports/organization-1-day` | read | PAT | ✗ |
| `GET /orgs/{org}/copilot/metrics/reports/organization-28-day/latest` | read | PAT | ✗ |
| `GET /orgs/{org}/copilot/metrics/reports/user-teams-1-day` | read | PAT | ✗ |
| `GET /orgs/{org}/copilot/metrics/reports/users-1-day` | read | PAT | ✗ |
| `GET /orgs/{org}/copilot/metrics/reports/users-28-day/latest` | read | PAT | ✗ |

## Organization permissions for "Organization codespaces secrets"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /orgs/{org}/codespaces/secrets/{secret_name}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/codespaces/secrets/{secret_name}` | write | PAT | ✗ |
| `PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories` | write | PAT | ✗ |
| `PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}` | write | PAT | ✓ |
| `GET /orgs/{org}/codespaces/secrets` | read | PAT | ✗ |
| `GET /orgs/{org}/codespaces/secrets/public-key` | read | PAT | ✗ |
| `GET /orgs/{org}/codespaces/secrets/{secret_name}` | read | PAT | ✗ |
| `GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories` | read | PAT | ✗ |

## Organization permissions for "Organization codespaces settings"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /orgs/{org}/codespaces/access` | write | PAT | ✗ |
| `POST /orgs/{org}/codespaces/access/selected_users` | write | PAT | ✗ |
| `DELETE /orgs/{org}/codespaces/access/selected_users` | write | PAT | ✗ |

## Organization permissions for "Organization codespaces"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}` | write | PAT | ✓ |
| `POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop` | write | PAT | ✓ |
| `GET /orgs/{org}/codespaces` | read | PAT | ✓ |
| `GET /orgs/{org}/members/{username}/codespaces` | read | PAT | ✓ |

## Organization permissions for "Organization dependabot secrets"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /orgs/{org}/dependabot/secrets/{secret_name}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/dependabot/secrets/{secret_name}` | write | PAT | ✗ |
| `PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories` | write | PAT | ✗ |
| `PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}` | write | PAT | ✓ |
| `GET /orgs/{org}/dependabot/secrets` | read | PAT | ✗ |
| `GET /orgs/{org}/dependabot/secrets/public-key` | read | PAT | ✗ |
| `GET /orgs/{org}/dependabot/secrets/{secret_name}` | read | PAT | ✗ |
| `GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories` | read | PAT | ✗ |

## Organization permissions for "Organization private registries"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/private-registries` | write | PAT | ✗ |
| `PATCH /orgs/{org}/private-registries/{secret_name}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/private-registries/{secret_name}` | write | PAT | ✗ |
| `GET /orgs/{org}/private-registries` | read | PAT | ✗ |
| `GET /orgs/{org}/private-registries/public-key` | read | PAT | ✗ |
| `GET /orgs/{org}/private-registries/{secret_name}` | read | PAT | ✗ |

## Organization permissions for "Projects"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/projectsV2/{project_number}/drafts` | write | PAT | ✗ |
| `POST /orgs/{org}/projectsV2/{project_number}/fields` | write | PAT | ✗ |
| `POST /orgs/{org}/projectsV2/{project_number}/items` | write | PAT | ✗ |
| `PATCH /orgs/{org}/projectsV2/{project_number}/items/{item_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/projectsV2/{project_number}/items/{item_id}` | write | PAT | ✗ |
| `POST /orgs/{org}/projectsV2/{project_number}/views` | write | PAT | ✗ |
| `GET /orgs/{org}/projectsV2` | read | PAT | ✗ |
| `GET /orgs/{org}/projectsV2/{project_number}` | read | PAT | ✗ |
| `GET /orgs/{org}/projectsV2/{project_number}/fields` | read | PAT | ✗ |
| `GET /orgs/{org}/projectsV2/{project_number}/fields/{field_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/projectsV2/{project_number}/items` | read | PAT | ✗ |
| `GET /orgs/{org}/projectsV2/{project_number}/items/{item_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/projectsV2/{project_number}/views/{view_number}/items` | read | PAT | ✗ |

## Organization permissions for "Secrets"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /orgs/{org}/actions/secrets/{secret_name}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/actions/secrets/{secret_name}` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/secrets/{secret_name}/repositories` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}` | write | PAT | ✓ |
| `GET /orgs/{org}/actions/secrets` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/secrets/public-key` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/secrets/{secret_name}` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/secrets/{secret_name}/repositories` | read | PAT | ✗ |

## Organization permissions for "Self-hosted runners"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/actions/runner-groups` | write | PAT | ✗ |
| `PATCH /orgs/{org}/actions/runner-groups/{runner_group_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/actions/runner-groups/{runner_group_id}` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}` | write | PAT | ✓ |
| `PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/runners` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/runners/{runner_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/actions/runner-groups/{runner_group_id}/runners/{runner_id}` | write | PAT | ✗ |
| `POST /orgs/{org}/actions/runners/generate-jitconfig` | write | PAT | ✗ |
| `POST /orgs/{org}/actions/runners/registration-token` | write | PAT | ✗ |
| `POST /orgs/{org}/actions/runners/remove-token` | write | PAT | ✗ |
| `DELETE /orgs/{org}/actions/runners/{runner_id}` | write | PAT | ✗ |
| `POST /orgs/{org}/actions/runners/{runner_id}/labels` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/runners/{runner_id}/labels` | write | PAT | ✗ |
| `DELETE /orgs/{org}/actions/runners/{runner_id}/labels` | write | PAT | ✗ |
| `DELETE /orgs/{org}/actions/runners/{runner_id}/labels/{name}` | write | PAT | ✗ |
| `GET /orgs/{org}/actions/runner-groups` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/runner-groups/{runner_group_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/runner-groups/{runner_group_id}/hosted-runners` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/runner-groups/{runner_group_id}/runners` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/runners` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/runners/downloads` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/runners/{runner_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/runners/{runner_id}/labels` | read | PAT | ✗ |

## Organization permissions for "Variables"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/actions/variables` | write | PAT | ✗ |
| `PATCH /orgs/{org}/actions/variables/{name}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/actions/variables/{name}` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/variables/{name}/repositories` | write | PAT | ✗ |
| `PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/actions/variables/{name}/repositories/{repository_id}` | write | PAT | ✓ |
| `GET /orgs/{org}/actions/variables` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/variables/{name}` | read | PAT | ✗ |
| `GET /orgs/{org}/actions/variables/{name}/repositories` | read | PAT | ✗ |

## Organization permissions for "Webhooks"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/hooks` | write | PAT | ✗ |
| `PATCH /orgs/{org}/hooks/{hook_id}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/hooks/{hook_id}` | write | PAT | ✗ |
| `PATCH /orgs/{org}/hooks/{hook_id}/config` | write | PAT | ✗ |
| `POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts` | write | PAT | ✗ |
| `POST /orgs/{org}/hooks/{hook_id}/pings` | write | PAT | ✗ |
| `GET /orgs/{org}/hooks` | read | PAT | ✗ |
| `GET /orgs/{org}/hooks/{hook_id}` | read | PAT | ✗ |
| `GET /orgs/{org}/hooks/{hook_id}/config` | read | PAT | ✗ |
| `GET /orgs/{org}/hooks/{hook_id}/deliveries` | read | PAT | ✗ |
| `GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}` | read | PAT | ✗ |

## Repository permissions for "Actions"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/actions/caches` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/jobs/{job_id}/rerun` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/oidc/customization/sub` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/actions/runs/{run_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/artifacts` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/cache/storage-limit` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/cache/usage` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/caches` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/concurrency_groups` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/concurrency_groups/{concurrency_group_name}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/jobs/{job_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/oidc/customization/sub` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}/concurrency_groups` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/workflows` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}` | read | PAT | ✗ |

## Repository permissions for "Administration"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/repos` | write | PAT | ✗ |
| `PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` | write | PAT | ✓ |
| `DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/cache/retention-limit` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/cache/storage-limit` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/permissions` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/permissions/access` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/permissions/artifact-and-log-retention` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/permissions/fork-pr-contributor-approval` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/permissions/fork-pr-workflows-private-repos` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/permissions/selected-actions` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/permissions/workflow` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/runners/generate-jitconfig` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/runners/registration-token` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/runners/remove-token` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/actions/runners/{runner_id}/labels` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/autolinks` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/autolinks/{autolink_id}` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/automated-security-fixes` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/automated-security-fixes` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/branches/{branch}/protection` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/branches/{branch}/protection` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-quality/setup` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/code-quality/setup` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/code-scanning/default-setup` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/collaborators/{username}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/collaborators/{username}` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/environments/{environment_name}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/environments/{environment_name}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/forks` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/immutable-releases` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/immutable-releases` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/interaction-limits` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/interaction-limits` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/invitations/{invitation_id}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/invitations/{invitation_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/keys` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/keys/{key_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/pages` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/pages` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/pages` | write | PAT | ✓ |
| `GET /repos/{owner}/{repo}/pages/health` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/private-vulnerability-reporting` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/private-vulnerability-reporting` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/rulesets` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/rulesets/{ruleset_id}` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/rulesets/{ruleset_id}/history` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/rulesets/{ruleset_id}/history/{version_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/forks` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/topics` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/vulnerability-alerts` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/vulnerability-alerts` | write | PAT | ✗ |
| `POST /repos/{template_owner}/{template_repo}/generate` | write | PAT | ✓ |
| `PUT /teams/{team_id}/repos/{owner}/{repo}` | write | PAT | ✓ |
| `DELETE /teams/{team_id}/repos/{owner}/{repo}` | write | PAT | ✓ |
| `POST /user/repos` | write | PAT | ✗ |
| `DELETE /user/repository_invitations/{invitation_id}` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/cache/retention-limit` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/permissions` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/permissions/access` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/permissions/artifact-and-log-retention` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/permissions/fork-pr-contributor-approval` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/permissions/fork-pr-workflows-private-repos` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/permissions/selected-actions` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/permissions/workflow` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runners` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runners/downloads` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runners/{runner_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/runners/{runner_id}/labels` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/autolinks` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/autolinks/{autolink_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/automated-security-fixes` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}/protection` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/default-setup` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-security-configuration` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/immutable-releases` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/interaction-limits` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/invitations` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/keys` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/keys/{key_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/rulesets/rule-suites` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/teams` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/traffic/clones` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/traffic/popular/paths` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/traffic/popular/referrers` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/traffic/views` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/vulnerability-alerts` | read | PAT | ✗ |
| `GET /user/repository_invitations` | read | PAT | ✗ |

## Repository permissions for "Agent secrets"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /repos/{owner}/{repo}/agents/secrets/{secret_name}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/agents/secrets/{secret_name}` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/agents/organization-secrets` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/agents/secrets` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/agents/secrets/public-key` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/agents/secrets/{secret_name}` | read | PAT | ✗ |

## Repository permissions for "Agent variables"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /repos/{owner}/{repo}/agents/variables` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/agents/variables/{name}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/agents/variables/{name}` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/agents/organization-variables` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/agents/variables` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/agents/variables/{name}` | read | PAT | ✗ |

## Repository permissions for "Artifact metadata"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/artifacts/metadata/deployment-record` | write | PAT | ✓ |
| `POST /orgs/{org}/artifacts/metadata/deployment-record/cluster/{cluster}` | write | PAT | ✓ |
| `POST /orgs/{org}/artifacts/metadata/storage-record` | write | PAT | ✓ |
| `GET /orgs/{org}/artifacts/{subject_digest}/metadata/deployment-records` | read | PAT | ✓ |
| `GET /orgs/{org}/artifacts/{subject_digest}/metadata/storage-records` | read | PAT | ✓ |

## Repository permissions for "Attestations"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/attestations/delete-request` | write | PAT | ✗ |
| `DELETE /orgs/{org}/attestations/digest/{subject_digest}` | write | PAT | ✗ |
| `DELETE /orgs/{org}/attestations/{attestation_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/attestations` | write | PAT | ✗ |
| `POST /users/{username}/attestations/delete-request` | write | PAT | ✗ |
| `DELETE /users/{username}/attestations/digest/{subject_digest}` | write | PAT | ✗ |
| `DELETE /users/{username}/attestations/{attestation_id}` | write | PAT | ✗ |
| `GET /orgs/{org}/attestations/repositories` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/attestations/{subject_digest}` | read | PAT | ✗ |

## Repository permissions for "Code scanning alerts"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/code-scanning/sarifs` | write | PAT | ✗ |
| `GET /orgs/{org}/code-scanning/alerts` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/alerts` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/analyses` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}` | read | PAT | ✗ |

## Repository permissions for "Codespaces lifecycle admin"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop` | write | PAT | ✓ |
| `POST /user/codespaces/{codespace_name}/exports` | write | PAT | ✗ |
| `POST /user/codespaces/{codespace_name}/start` | write | PAT | ✗ |
| `POST /user/codespaces/{codespace_name}/stop` | write | PAT | ✗ |
| `GET /user/codespaces/{codespace_name}/exports/{export_id}` | read | PAT | ✗ |

## Repository permissions for "Codespaces metadata"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /repos/{owner}/{repo}/codespaces/devcontainers` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/codespaces/machines` | read | PAT | ✗ |
| `GET /user/codespaces/{codespace_name}/machines` | read | PAT | ✗ |

## Repository permissions for "Codespaces secrets"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /repos/{owner}/{repo}/codespaces/secrets` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/codespaces/secrets/public-key` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/codespaces/secrets/{secret_name}` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/codespaces/secrets/{secret_name}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/codespaces/secrets/{secret_name}` | write | PAT | ✗ |

## Repository permissions for "Codespaces"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/codespaces` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/codespaces/new` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/codespaces/permissions_check` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/pulls/{pull_number}/codespaces` | write | PAT | ✗ |
| `POST /user/codespaces` | write | PAT | ✗ |
| `PATCH /user/codespaces/{codespace_name}` | write | PAT | ✗ |
| `DELETE /user/codespaces/{codespace_name}` | write | PAT | ✗ |
| `POST /user/codespaces/{codespace_name}/publish` | write | PAT | ✗ |
| `GET /orgs/{org}/codespaces` | read | PAT | ✓ |
| `GET /orgs/{org}/members/{username}/codespaces` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/codespaces` | read | PAT | ✗ |
| `GET /user/codespaces` | read | PAT | ✗ |
| `GET /user/codespaces/{codespace_name}` | read | PAT | ✗ |

## Repository permissions for "Commit statuses"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /repos/{owner}/{repo}/statuses/{sha}` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/commits/{ref}/status` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/commits/{ref}/statuses` | read | PAT | ✗ |

## Repository permissions for "Contents"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /orgs/{org}/artifacts/metadata/deployment-record` | write | PAT | ✓ |
| `POST /orgs/{org}/artifacts/metadata/deployment-record/cluster/{cluster}` | write | PAT | ✓ |
| `POST /orgs/{org}/artifacts/metadata/storage-record` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/branches/{branch}/rename` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix/commits` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/comments/{comment_id}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/comments/{comment_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/comments/{comment_id}/reactions` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/contents/{path}` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/contents/{path}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/contents/{path}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/contents/{path}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/dependency-graph/snapshots` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/dispatches` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/git/blobs` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/git/commits` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/git/refs` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/git/refs` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/git/refs/{ref}` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/git/refs/{ref}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/git/refs/{ref}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/git/tags` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/git/trees` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/import` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/import` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/import` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/import/authors/{author_id}` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/import/lfs` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/merge-upstream` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/merges` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/releases` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/releases` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/releases/generate-notes` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/releases/{release_id}` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/releases/{release_id}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/releases/{release_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/secret-scanning/push-protection-bypasses` | write | PAT | ✗ |
| `POST /markdown` | read | PAT | ✗ |
| `GET /orgs/{org}/artifacts/{subject_digest}/metadata/deployment-records` | read | PAT | ✓ |
| `GET /orgs/{org}/artifacts/{subject_digest}/metadata/storage-records` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/activity` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/branches/{branch}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/codeql/databases` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}/repos/{repo_owner}/{repo_name}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/codeowners/errors` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/commits` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head` | read | PAT | ✗ |
| `POST /repos/{owner}/{repo}/commits/{commit_sha}/comments` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/commits/{ref}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/community/profile` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/compare/{basehead}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/contents/{path}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/dependency-graph/sbom` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/dependency-graph/sbom/fetch-report/{sbom_uuid}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/dependency-graph/sbom/generate-report` | read | PAT | ✗ |
| `POST /repos/{owner}/{repo}/forks` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/git/blobs/{file_sha}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/git/commits/{commit_sha}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/git/matching-refs/{ref}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/git/ref/{ref}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/git/tags/{tag_sha}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/git/trees/{tree_sha}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/import` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/import/authors` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/import/large_files` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/{pull_number}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/readme` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/readme/{dir}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/releases` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/releases/assets/{asset_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/releases/latest` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/releases/tags/{tag}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/releases/{release_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/releases/{release_id}/assets` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/tarball/{ref}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/zipball/{ref}` | read | PAT | ✗ |
| `POST /repos/{template_owner}/{template_repo}/generate` | read | PAT | ✓ |

## Repository permissions for "Copilot agent settings"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /repos/{owner}/{repo}/copilot/cloud-agent/configuration` | read | PAT | ✗ |

## Repository permissions for "Custom properties"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PATCH /repos/{owner}/{repo}/properties/values` | write | PAT | ✗ |

## Repository permissions for "Dependabot alerts"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}` | write | PAT | ✗ |
| `GET /orgs/{org}/dependabot/alerts` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/dependabot/alerts` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/dependabot/alerts/{alert_number}` | read | PAT | ✗ |

## Repository permissions for "Dependabot secrets"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /repos/{owner}/{repo}/dependabot/secrets/{secret_name}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/dependabot/secrets/{secret_name}` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/dependabot/secrets` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/dependabot/secrets/public-key` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/dependabot/secrets/{secret_name}` | read | PAT | ✗ |

## Repository permissions for "Deployments"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/deployments` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/deployments/{deployment_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/deployments` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/deployments/{deployment_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}` | read | PAT | ✗ |

## Repository permissions for "Environments"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/environments/{environment_name}/variables` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}/secrets` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}/variables` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}` | read | PAT | ✗ |

## Repository permissions for "Issues"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /repos/{owner}/{repo}/issues` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/issues/comments/{comment_id}/pin` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/pin` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/issues/{issue_number}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/assignees` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/comments` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by/{issue_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values/{issue_field_id}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/labels` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/issues/{issue_number}/labels` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/issues/{issue_number}/lock` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/reactions` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/sub_issue` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/sub_issues` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/issues/{issue_number}/sub_issues/priority` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/labels` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/labels/{name}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/labels/{name}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/milestones` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/milestones/{milestone_number}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/milestones/{milestone_number}` | write | PAT | ✓ |
| `GET /repos/{owner}/{repo}/assignees` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/assignees/{assignee}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/comments` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/comments/{comment_id}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/events` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/events/{event_id}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/comments` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocking` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/events` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/labels` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/parent` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/reactions` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/sub_issues` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/timeline` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/labels` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/labels/{name}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/milestones` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/milestones/{milestone_number}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels` | read | PAT | ✓ |

## Repository permissions for "Metadata"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /orgs/{org}/repos` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/collaborators` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/collaborators/{username}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/collaborators/{username}/permission` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/comments` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/comments/{comment_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/comments/{comment_id}/reactions` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/commits/{commit_sha}/comments` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/contributors` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/events` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/forks` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/hash-algorithm` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/languages` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/license` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/private-vulnerability-reporting` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/properties/values` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/rules/branches/{branch}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/rulesets` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/rulesets/{ruleset_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/stargazers` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/stats/code_frequency` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/stats/commit_activity` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/stats/contributors` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/stats/participation` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/stats/punch_card` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/subscribers` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/tags` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/topics` | read | PAT | ✗ |
| `GET /repositories` | read | PAT | ✗ |
| `GET /search/labels` | read | PAT | ✗ |
| `GET /user/repos` | read | PAT | ✗ |
| `GET /users/{username}/repos` | read | PAT | ✗ |

## Repository permissions for "Pages"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /repos/{owner}/{repo}/pages` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/pages` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/pages` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/pages/builds` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/pages/deployments` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pages/health` | write | PAT | ✓ |
| `GET /repos/{owner}/{repo}/pages` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pages/builds` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pages/builds/latest` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pages/builds/{build_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}` | read | PAT | ✗ |

## Repository permissions for "Pull requests"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/issues/{issue_number}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/assignees` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/comments` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values/{issue_field_id}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/issues/{issue_number}/labels` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/issues/{issue_number}/labels` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}` | write | PAT | ✓ |
| `PUT /repos/{owner}/{repo}/issues/{issue_number}/lock` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/labels` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/labels/{name}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/labels/{name}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/milestones` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/milestones/{milestone_number}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/milestones/{milestone_number}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/pulls` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/pulls/{pull_number}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/pulls/{pull_number}/comments` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events` | write | PAT | ✗ |
| `PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/assignees` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/assignees/{assignee}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/issues/comments` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/comments/{comment_id}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/events/{event_id}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/comments` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/events` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/labels` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/issues/{issue_number}/timeline` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/labels` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/labels/{name}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/milestones` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/milestones/{milestone_number}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/pulls` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/comments` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/comments/{comment_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/{pull_number}` | read | PAT | ✓ |
| `GET /repos/{owner}/{repo}/pulls/{pull_number}/comments` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/{pull_number}/commits` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/{pull_number}/files` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/{pull_number}/merge` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments` | read | PAT | ✗ |

## Repository permissions for "Repository security advisories"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /orgs/{org}/security-advisories` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/security-advisories` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/security-advisories/reports` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/security-advisories/{ghsa_id}` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/cve` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/security-advisories` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/security-advisories/{ghsa_id}` | read | PAT | ✗ |
| `POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/forks` | read | PAT | ✓ |

## Repository permissions for "Secret scanning alerts"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}` | write | PAT | ✗ |
| `GET /orgs/{org}/secret-scanning/alerts` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/secret-scanning/alerts` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/secret-scanning/scan-history` | read | PAT | ✗ |

## Repository permissions for "Secrets"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/organization-secrets` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/secrets` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/secrets/public-key` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/secrets/{secret_name}` | read | PAT | ✗ |

## Repository permissions for "Variables"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /repos/{owner}/{repo}/actions/variables` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/actions/variables/{name}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/actions/variables/{name}` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/organization-variables` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/variables` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/actions/variables/{name}` | read | PAT | ✗ |

## Repository permissions for "Webhooks"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /repos/{owner}/{repo}/hooks` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/hooks/{hook_id}` | write | PAT | ✗ |
| `DELETE /repos/{owner}/{repo}/hooks/{hook_id}` | write | PAT | ✗ |
| `PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config` | write | PAT | ✗ |
| `POST /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts` | write | PAT | ✗ |
| `GET /repos/{owner}/{repo}/hooks` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/hooks/{hook_id}` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/hooks/{hook_id}/config` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries` | read | PAT | ✗ |
| `GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}` | read | PAT | ✗ |
| `POST /repos/{owner}/{repo}/hooks/{hook_id}/pings` | read | PAT | ✗ |
| `POST /repos/{owner}/{repo}/hooks/{hook_id}/tests` | read | PAT | ✗ |

## Repository permissions for "Workflows"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /repos/{owner}/{repo}/contents/{path}` | write | PAT | ✓ |
| `DELETE /repos/{owner}/{repo}/contents/{path}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/git/refs` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/git/refs/{ref}` | write | PAT | ✓ |
| `POST /repos/{owner}/{repo}/releases` | write | PAT | ✓ |
| `PATCH /repos/{owner}/{repo}/releases/{release_id}` | write | PAT | ✓ |

## User permissions for "Block another user"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /user/blocks/{username}` | write | PAT | ✗ |
| `DELETE /user/blocks/{username}` | write | PAT | ✗ |
| `GET /user/blocks` | read | PAT | ✗ |
| `GET /user/blocks/{username}` | read | PAT | ✗ |

## User permissions for "Codespaces user secrets"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /user/codespaces/secrets/{secret_name}` | write | PAT | ✗ |
| `DELETE /user/codespaces/secrets/{secret_name}` | write | PAT | ✗ |
| `PUT /user/codespaces/secrets/{secret_name}/repositories` | write | PAT | ✗ |
| `PUT /user/codespaces/secrets/{secret_name}/repositories/{repository_id}` | write | PAT | ✓ |
| `DELETE /user/codespaces/secrets/{secret_name}/repositories/{repository_id}` | write | PAT | ✓ |
| `GET /user/codespaces/secrets` | read | PAT | ✗ |
| `GET /user/codespaces/secrets/public-key` | read | PAT | ✗ |
| `GET /user/codespaces/secrets/{secret_name}` | read | PAT | ✗ |
| `GET /user/codespaces/secrets/{secret_name}/repositories` | read | PAT | ✗ |

## User permissions for "Email addresses"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PATCH /user/email/visibility` | write | PAT | ✗ |
| `POST /user/emails` | write | PAT | ✗ |
| `DELETE /user/emails` | write | PAT | ✗ |
| `GET /user/emails` | read | PAT | ✗ |
| `GET /user/public_emails` | read | PAT | ✗ |

## User permissions for "Followers"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /user/following/{username}` | write | PAT | ✗ |
| `DELETE /user/following/{username}` | write | PAT | ✗ |
| `GET /user/followers` | read | PAT | ✗ |
| `GET /user/following` | read | PAT | ✗ |
| `GET /user/following/{username}` | read | PAT | ✗ |

## User permissions for "GPG keys"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /user/gpg_keys` | write | PAT | ✗ |
| `DELETE /user/gpg_keys/{gpg_key_id}` | write | PAT | ✗ |
| `GET /user/gpg_keys` | read | PAT | ✗ |
| `GET /user/gpg_keys/{gpg_key_id}` | read | PAT | ✗ |

## User permissions for "Gists"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /gists` | write | PAT | ✗ |
| `PATCH /gists/{gist_id}` | write | PAT | ✗ |
| `DELETE /gists/{gist_id}` | write | PAT | ✗ |
| `POST /gists/{gist_id}/comments` | write | PAT | ✗ |
| `PATCH /gists/{gist_id}/comments/{comment_id}` | write | PAT | ✗ |
| `DELETE /gists/{gist_id}/comments/{comment_id}` | write | PAT | ✗ |
| `POST /gists/{gist_id}/forks` | write | PAT | ✗ |
| `PUT /gists/{gist_id}/star` | write | PAT | ✗ |
| `DELETE /gists/{gist_id}/star` | write | PAT | ✗ |

## User permissions for "Git SSH keys"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /user/keys` | write | PAT | ✗ |
| `DELETE /user/keys/{key_id}` | write | PAT | ✗ |
| `GET /user/keys` | read | PAT | ✗ |
| `GET /user/keys/{key_id}` | read | PAT | ✗ |
| `GET /users/{username}/keys` | read | PAT | ✗ |

## User permissions for "Interaction limits"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /user/interaction-limits` | write | PAT | ✗ |
| `DELETE /user/interaction-limits` | write | PAT | ✗ |
| `GET /user/interaction-limits` | read | PAT | ✗ |

## User permissions for "Plan"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /users/{username}/settings/billing/ai_credit/usage` | read | PAT | ✗ |
| `GET /users/{username}/settings/billing/premium_request/usage` | read | PAT | ✗ |
| `GET /users/{username}/settings/billing/usage` | read | PAT | ✗ |
| `GET /users/{username}/settings/billing/usage/summary` | read | PAT | ✗ |

## User permissions for "Private repository invitations"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /repos/{owner}/{repo}/invitations` | read | PAT | ✓ |

## User permissions for "Profile"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PATCH /user` | write | PAT | ✗ |
| `POST /user/social_accounts` | write | PAT | ✗ |
| `DELETE /user/social_accounts` | write | PAT | ✗ |

## User permissions for "SSH signing keys"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `POST /user/ssh_signing_keys` | write | PAT | ✗ |
| `DELETE /user/ssh_signing_keys/{ssh_signing_key_id}` | write | PAT | ✗ |
| `GET /user/ssh_signing_keys` | read | PAT | ✗ |
| `GET /user/ssh_signing_keys/{ssh_signing_key_id}` | read | PAT | ✗ |

## User permissions for "Starring"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `PUT /user/starred/{owner}/{repo}` | write | PAT | ✓ |
| `DELETE /user/starred/{owner}/{repo}` | write | PAT | ✓ |
| `GET /user/starred` | read | PAT | ✗ |
| `GET /user/starred/{owner}/{repo}` | read | PAT | ✓ |
| `GET /users/{username}/starred` | read | PAT | ✗ |

## User permissions for "Watching"

| Endpoint | Access | Tokens | Additional Permissions |
|----------|--------|--------|------------------------|
| `GET /user/subscriptions` | read | PAT | ✗ |
| `GET /users/{username}/subscriptions` | read | PAT | ✗ |

