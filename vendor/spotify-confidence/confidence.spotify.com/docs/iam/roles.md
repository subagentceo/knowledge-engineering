> ## Documentation Index
> Fetch the complete documentation index at: https://confidence.spotify.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Roles

In Confidence, you can create nuanced permission schemas using fine-grained roles.
Confidence comes with a set of [predefined roles](#predefined-roles) that are usually enough to achieve the desired access control.
If you need even more specialized roles, you can create [custom roles](#custom-roles).

## Predefined Roles

Confidence comes with the following predefined roles:

| Role                       | Description                                                                                                                                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Admin**                  | Has the highest level of privileges. Admins have full control over various resources, including workflows, metrics, flags, IAM policies, events, and billing. They hold permissions to administer, edit, create, and view various entities within the system. |
| **Editor**                 | General role for editing various resources. Editors have permissions to create, update, and manage entities within workflows, metrics, flags, IAM, and events.                                                                                                |
| **Creator**                | General role for creating various resources. Creators have permissions to create, and thereby make themselves owner of, entities within workflows, metrics, flags, IAM, and events.                                                                           |
| **Reader**                 | General role for read-only access. Readers can view various entities across workflows, metrics, flags, IAM, and events.                                                                                                                                       |
| **Billing Admin**          | Specifically handles billing-related administrative tasks. They have permissions related to billing administration.                                                                                                                                           |
| **Events Editor**          | Manages and edits event-related resources. They have permissions to create, edit, and manage events, event connections, event definitions, and related cryptographic keys.                                                                                    |
| **Events Reader**          | Has read-only access to event-related resources. They can view events, event connections, event definitions, and related cryptographic keys.                                                                                                                  |
| **Flags Editor**           | Manages and edits feature flags and related segments. They can create, edit, and manage flags, segments, and evaluation context schemas.                                                                                                                      |
| **Flags Reader**           | Has read-only access to feature flags and related segments. They can view flags, segments, and evaluation context schemas.                                                                                                                                    |
| **Flags Resolver Logger**  | Involved in logging resolve information for flags. They have permissions related to administration of resolve information and flag assignments.                                                                                                               |
| **Flags Resolver Sidecar** | Manages the sidecar aspect of flag resolution. They have permissions to read flags, segments, and clients, and administer resolve information and flag assignments.                                                                                           |
| **IAM Editor**             | Manages and edits IAM (Identity and Access Management) resources. They can create, edit, and manage clients, roles, user invitations, OAuth apps, cryptographic keys, and IAM policies.                                                                       |
| **IAM Reader**             | Has read-only access to IAM resources. They can view clients, roles, user invitations, OAuth apps, cryptographic keys, and IAM policies.                                                                                                                      |
| **Metrics Editor**         | Manages and edits metrics-related resources. They can create, edit, and manage metrics, metric calculations, scheduled metric calculations, and associated tables and warehouses.                                                                             |
| **Metrics Reader**         | Has read-only access to metrics-related resources. They can view metrics, metric calculations, scheduled metric calculations, and associated tables and warehouses.                                                                                           |
| **Stats API User**         | Specific role for users of the Stats API. They have permissions related to the usage of the Stats API.                                                                                                                                                        |
| **Workflows Editor**       | Manages and edits workflow-related resources. They can create, edit, and manage workflows, workflow instances, workflow logs, workflow secrets, and related surfaces.                                                                                         |
| **Workflows Reader**       | Has read-only access to workflow-related resources. They can view workflows, workflow instances, workflow logs, workflow secrets, and related surfaces.                                                                                                       |

### Owner

All resources in Confidence have an owner.
The owner role can only be assigned per instance of a resource, for example an A/B test, a metric, or a surface.
The owner of a resource has full control over the resource.
The owner is typically the user that created the resource, but you can set it to any user or group.

## Custom Roles

Create custom roles from the finest grained permissions to fit your organization's needs.

For each permission you can select one or several types:

* **Reader** - Can view the type of resource that the permission handles
* **Creator** - Can create the type of resource that the permission handles
* **Editor** - Can edit (which includes reading and creating) the type of resource that the permission handles
* **Admin** - Has all permissions for this type of resource

<Note>
  Only the creator and reader permissions types are meaningful to combine for the same type of resource. For all other combinations, one type of permissions includes the other.
</Note>

### Available Permissions

The following permissions are available:

| Permission                                                    | Description                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [API client](../api/quickstart#create-an-api-client)          | API clients for Confidence services. Users integrating with Confidence via the APIs need these permissions.                                                                                                                                                                                             |
| [Assignment table](/docs/metrics/assignment-tables)           | Data tables for feature flag rules applied events. These permissions are mainly needed in the setup phase of the Confidence App.                                                                                                                                                                        |
| [Client](/docs/sdks/introduction)                             | Feature flag clients. Users who need to create or delete new clients need these permissions. Feature flag developers need read permissions to be able to select clients for their feature flags.                                                                                                        |
| [Data warehouse](../data-warehouse-native)                    | Data warehouse integration and configuration. Only relevant for [Warehouse Native Confidence](../data-warehouse-native) users.                                                                                                                                                                          |
| [Dimension table](/docs/metrics/dimension-tables)             | Data tables with dimensions to segment results of metrics in [explorations](/docs/experiments/exploration). Users mapping data in your data warehouse to Confidence need these permissions.                                                                                                             |
| [Entity](/docs/metrics/entities)                              | Unique identifiers for randomly assigning treatment and tying metrics to units exposed to an experiment. These permissions are mainly needed in the setup phase of the Confidence App.                                                                                                                  |
| [Entity relation table](/docs/metrics/entity-relation-tables) | Mappings between entities and input fields. These permissions are mainly needed in the setup phase of the Confidence App.                                                                                                                                                                               |
| Exposure calculation                                          | Data job for calculating exposure for [explorations](/docs/experiments/exploration) in experiments and for the results in [analyses](/docs/experiments/workflows/analysis). Workflows have permissions to create and edit exposure calculations even if the workflow instance owner doesn't.            |
| [Exposure table](/docs/metrics/exposure)                      | Data tables for experiment exposure. Typically created by a workflow instance. Workflows have permissions to create and edit exposure tables even if the workflow-instance owner doesn't.                                                                                                               |
| [Fact table](/docs/metrics/fact-tables)                       | Data tables containing measurements that describe your entities. Users mapping data in your data warehouse to Confidence need these permissions.                                                                                                                                                        |
| [Flag](../flags/introduction)                                 | Feature flags including variants and rules. Developers integrating software services with Confidence need these permissions. Experimenters can only launch experiments if they have create rights for the involved flag, but it's recommended to give create permissions per flag rather than by roles. |
| [Group](./groups)                                             | Groups of users that own resources and have roles. Users administering groups and teams need these permissions.                                                                                                                                                                                         |
| Materialized segment                                          | Materialized segments for the [sticky assignment](../flags/audience#sticky-assignments) functionality. Workflows have permissions to create and edit materialized segments even if the workflow instance owner doesn't.                                                                                 |
| [Metric](../metrics/introduction)                             | Metrics defined on top of fact tables. Users developing and consuming metrics in Confidence need these permissions.                                                                                                                                                                                     |
| Metric calculation                                            | Metric calculation for [explorations](/docs/experiments/exploration) in experiments and for the results in [analyses](/docs/experiments/workflows/analysis) instances. Workflows have permissions to create and edit metrics calculations even if the workflow instance owner doesn't.                  |
| Role                                                          | A set of permissions that a group or user can get via a [policy](./policies). It's recommended that only the Confidence Admin has these permissions (which they have by default).                                                                                                                       |
| Scheduled exposure calculation                                | Data job for calculating exposure for an experiment. Workflows have permissions to create and edit scheduled exposure calculations even if the workflow instance owner doesn't.                                                                                                                         |
| Scheduled metric calculation                                  | Metrics calculations for experiment results. Workflows have permissions to create and edit scheduled metric calculations even if the workflow instance owner doesn't.                                                                                                                                   |
| Segment                                                       | Segments are internal to rules on feature flags, they contain targeting and allocation logic including treatment assignment. Workflows have permissions to create and edit segments even if the workflow instance owner doesn't.                                                                        |
| SQL job                                                       | A user needs creator permission to be able to run preview queries. Workflows have permissions to create and edit SQL jobs even if the workflow instance owner doesn't.                                                                                                                                  |
| Workflow                                                      | Workflows are the blueprints for A/B tests, rollouts, and analyses. These permissions are only needed for users hosting their own Confidence instance or using only Confidence APIs.                                                                                                                    |
| Workflow instance                                             | The instances of workflows are the A/B tests, rollouts, and analyses created by Confidence users. To be able to experiment, users need permissions for workflow instances.                                                                                                                              |
| Workflow log                                                  | Permission to view logs from a workflow, used when developing custom workflows.                                                                                                                                                                                                                         |
| Workflow secret                                               | Permission to manage secrets for a workflow, used when developing custom workflows.                                                                                                                                                                                                                     |

## Related Resources

<CardGroup cols={2}>
  <Card title="IAM Introduction" href="/docs/iam/introduction">
    Overview of identity and access management
  </Card>

  <Card title="Policies" href="/docs/iam/policies">
    Assign roles to users and groups
  </Card>

  <Card title="Groups" href="/docs/iam/groups">
    Organize users into groups
  </Card>

  <Card title="Users" href="/docs/iam/users">
    Manage individual user access
  </Card>
</CardGroup>
