# Resources

## Introduction

Resources are the runtime counterpart to resource types. While resource types define your schema, resources represent the actual instances users create and work with.

When a user creates a workspace in your application, you register a corresponding resource in WorkOS. When they create a project inside that workspace, you register another resource as a child of the workspace. This builds the hierarchy that FGA uses to evaluate permissions.

Each resource has a type, an external ID from your application, a parent (the organization or another resource), and a human-readable name. Together, these form the tree structure where access is assigned and inherited.

***

## Organization resources

An organization resource is automatically created for every organization in WorkOS and serves as the root of your hierarchy. Organization resources cannot be edited or deleted—they exist for the lifetime of the organization.

Every resource you create must have a parent. For top-level resources like workspaces, the parent is the organization resource. You can reference it using the organization's ID directly as the external ID.

***

## Creating resources

Register resources as users create entities in your application. For top-level resources like workspaces, the parent is optional — when omitted, the resource defaults to the organization as its parent:

```bash
curl https://api.workos.com/authorization/resources \
  -X POST \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "resource_type_slug": "workspace",
    "external_id": "workspace_01H",
    "organization_id": "org_01HXYZ",
    "name": "Engineering"
  }'
```

For nested resources, specify the parent to establish the hierarchy. You can reference the parent by its internal WorkOS ID:

```bash
curl https://api.workos.com/authorization/resources \
  -X POST \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "resource_type_slug": "project",
    "external_id": "project_02H",
    "organization_id": "org_01HXYZ",
    "parent_resource_id": "authz_resource_01HXYZ",
    "name": "API Backend"
  }'
```

Or reference the parent by its external ID and type, which is often more convenient since you're already tracking your own entity IDs:

```bash
curl https://api.workos.com/authorization/resources \
  -X POST \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "resource_type_slug": "project",
    "external_id": "project_02H",
    "organization_id": "org_01HXYZ",
    "parent_resource_type_slug": "workspace",
    "parent_resource_external_id": "workspace_01H",
    "name": "API Backend"
  }'
```

See the [API reference](https://workos.com/docs/reference) for full endpoint documentation.

***

## External IDs

External IDs are your application's identifiers for resources—typically the primary key from your database. They provide a stable reference that maps directly to your records.

External IDs must be unique within a resource type and organization. Two workspaces in the same organization can't share an external ID, but a workspace and a project can (since they're different types). Two workspaces in different organizations can also share an external ID.

This uniqueness rule simplifies resource management for managed service providers and platforms that provision similar structures for each customer. Every customer might have a "main" workspace with external ID `main`—that's fine because they're in different organizations.

Use your existing database IDs or UUIDs for external IDs. Keep them stable—don't change an ID after creation—and choose values that are meaningful for debugging and support.

### Managing resources by external ID

Beyond using internal WorkOS resource IDs, you can manage resources directly using your external IDs:

```bash
# Get a resource by external ID
curl "https://api.workos.com/authorization/organizations/org_01HXYZ/resources/workspace/workspace_01H" \
  -H "Authorization: Bearer sk_example_123456789"

# Update a resource by external ID
curl https://api.workos.com/authorization/organizations/org_01HXYZ/resources/workspace/workspace_01H \
  -X PATCH \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{ "name": "Engineering Team" }'

# Delete a resource by external ID
curl https://api.workos.com/authorization/organizations/org_01HXYZ/resources/workspace/workspace_01H \
  -X DELETE \
  -H "Authorization: Bearer sk_example_123456789"
```

This is often more convenient than looking up internal resource IDs since you're already tracking your own entity IDs.

***

## Keeping resources in sync

Resources should mirror your application's data. When entities are created, updated, or deleted in your app, the corresponding resources should change in WorkOS.

**On creation**, register the resource immediately after saving the entity to your database. The resource needs to exist before you can assign roles to it.

**On deletion**, remove the resource when the entity is deleted. By default, deleting a resource will fail if it has child resources or role assignments. Pass `cascade_delete=true` to delete the resource along with all its children and their role assignments.

**On rename**, update the resource's name when the entity's name changes in your application. External IDs are immutable after creation.

**On reparent**, update the resource's parent when the entity moves within your hierarchy. For example, if a user drags a project from one workspace to another, update the parent to keep WorkOS in sync. WorkOS automatically rebuilds ancestry for the resource and all its descendants. See [Updating and deleting](#updating-and-deleting) for the API call.

***

## What to model as resources

FGA is optimized for low-cardinality, stable entities—the structural elements of your application where access boundaries matter.

**Good candidates for FGA resources**: Workspaces, teams, accounts, projects, repositories, pipelines, dashboards, environments—entities where users have different access levels to different instances, and the count is typically in the hundreds to thousands per organization.

**Keep in your database**: Documents, messages, tasks, files, comments, rows—high-volume content that changes frequently and typically inherits access from a parent. Modeling millions of documents as individual resources would overwhelm sync and provide no real benefit.

As a rule of thumb, hundreds to thousands of resources per organization works well. Tens of thousands might work but consider whether they all need individual access control. Millions should stay in your database with references to their parent FGA resource.

FGA has a **soft limit of 5,000 resource instances per resource type per organization.** This is based on our experience working with customers to avoid potential data syncing issues—not a technical limitation. If your use case requires higher cardinality, [reach out to us](https://workos.com/contact) to discuss your specific needs.

## Parent references for high-volume data

High-volume entities can participate in authorization without being modeled as FGA resources. Store a reference to the nearest FGA-managed parent in your database:

```json
{
  "id": "doc_abc123",
  "content": "...",
  "project_id": "proj_456" // ← Reference to FGA resource
}
```

When checking access, ask about the parent:

```bash
# Can this user edit this document?
# → Check: Does user have document:edit on Project proj_456?
curl https://api.workos.com/authorization/organization_memberships/om_01HXYZ/check \
  -X POST \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "permission_slug": "document:edit",
    "resource_type_slug": "project",
    "resource_external_id": "proj_456"
  }'
```

This approach keeps authorization fast (no sync lag), avoids reconciliation issues, scales to millions of documents, and uses the existing permission hierarchy. Users with `document:edit` on the project can edit all documents in it without syncing each document to WorkOS.

***

## Querying resources

List resources with optional filters:

```bash
curl "https://api.workos.com/authorization/resources?resource_type_slug=project&organization_id=org_01HXYZ" \
  -H "Authorization: Bearer sk_example_123456789"
```

Get a specific resource:

```bash
curl https://api.workos.com/authorization/resources/authz_resource_01HXYZ \
  -H "Authorization: Bearer sk_example_123456789"
```

See the [API reference](https://workos.com/docs/reference) for full query parameters.

***

## Updating and deleting

Update a resource's name when the corresponding entity changes:

```bash
curl https://api.workos.com/authorization/resources/authz_resource_01HXYZ \
  -X PATCH \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{ "name": "Engineering Team" }'
```

Move a resource to a new parent by specifying the parent's internal ID:

```bash
curl https://api.workos.com/authorization/resources/authz_resource_01HXYZ \
  -X PATCH \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{ "parent_resource_id": "authz_resource_02HXYZ" }'
```

Or reference the new parent by its external ID and type:

```bash
curl https://api.workos.com/authorization/resources/authz_resource_01HXYZ \
  -X PATCH \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "parent_resource_type_slug": "workspace",
    "parent_resource_external_id": "workspace_02H"
  }'
```

The new parent must be in the same organization and its resource type must be a valid parent type for the resource being moved. WorkOS automatically rebuilds the ancestry chain for the resource and all its descendants, so inherited permissions immediately reflect the new position in the hierarchy.

Delete a resource when the entity is deleted from your application. By default, the request will fail if the resource has child resources or role assignments. Pass `cascade_delete=true` to remove the resource along with all its children and their assignments:

```bash
curl "https://api.workos.com/authorization/resources/authz_resource_01HXYZ?cascade_delete=true" \
  -X DELETE \
  -H "Authorization: Bearer sk_example_123456789"
```
