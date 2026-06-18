# FGA (Fine-Grained Authorization)

The FGA API provides endpoints for managing fine-grained authorization in your WorkOS environment. Use these endpoints to create resources, assign roles, and check access permissions for your users.

## Resources

Resources are instances of resource types that represent entities in your application—workspaces, projects, apps, or any other object that users can access. Resources form a hierarchy where permissions can be inherited from parent to child.

## Role Assignments

Role assignments connect organization memberships to roles on specific resources. When a role is assigned to a user on a resource, they gain all permissions included in that role on that resource and its descendants.

## Access Checks

Access check endpoints let you determine whether a user has a specific permission on a resource. You can also discover which resources a user can access, or which users have access to a specific resource.