# Access Control

> \[!IMPORTANT]
>
> Role Based Access Control (RBAC) is available as a public beta release. Twilio might add or change features before declaring RBAC Generally Available. Beta products aren't covered by a Twilio SLA.
>
> Learn more about [beta product support](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

With Twilio's role-based access control (RBAC) platform, you can grant access to Twilio resources in a granular way and prevent access to other resources. Twilio RBAC lets you adopt the security principle of "least privilege access" for users in your Twilio accounts.

Here are the key features of the Access Control product:

* Control access to Twilio resources with [built-in roles](/docs/iam/access-control/types-of-roles) that range in scope from your whole organization down to viewing only a specific product for a specific subaccount.
* Manage role assignments across multiple accounts and subaccounts in one place using the self-serve RBAC management interface in Twilio Admin.

## View role assignments

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings** > **Organization settings** > **Users**](https://1console.twilio.com/organization/settings/users/managed-users).\
   The **User management** page lists all the users in your organization and their role assignments. You can search by user's name, email, SID, role name or scope name. Scope specifies the boundary within which a role assignment will apply. It can be a managed account, subaccount, or even your organization.
2. To view a user's role assignment details, click the user's name, then click the **Role Assignments** tab.
3. All the user's role assignments, grouped by scope name, will be listed as separate rows. Resource-based role assignments are at the organization scope level but will be listed as separate rows.

## Legacy Console

1. Go to [Twilio Admin](https://admin.twilio.com/)
2. Click on **Access Control**, it will take you to the role assignments view page where you can view all existing role assignments in your Organization. You can return to this view by clicking on the **Role Assignments** subsection in the left navigation bar.
3. You can search Role Assignments by user's name, email, SID, role name or scope name. Scope specifies the boundary within which a role assignment will apply. It can be a managed account, subaccount, or even your organization.
4. To view a user's role assignment details, click the user's name.

## Add a new role assignment

When you assign roles to a user, you start by selecting the scope: organization, account, or subaccount. Then you can assign one or more roles to the user for the specified scope. Depending on the scope, you can select from General or Built-in roles. Learn more about [role types](/docs/iam/access-control/types-of-roles).

Users can have multiple roles in multiple scopes. You can assign up to 25 built-in roles per user across all scopes.

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings** > **Organization settings** > **Users**](https://1console.twilio.com/organization/settings/users/managed-users).
2. Click the user's name, then click the **Role Assignments** tab.
3. Click **Create role assignment**.
4. On the **Create role assignment** page, select the scope type, scopes, and roles. If the role selected is resource-based then addtional fields resource and resource values have to be selected.
5. Click **Save changes**.

## Legacy Console

1. Go to [Access Control > Role Assignments](https://admin.twilio.com/access-control/role-assignments).
2. Click the user's name to open the **Role Assignment Detail** page.
3. On the **Role Assignment Detail** page, click **Add another assignment** to add a new role assignment.
4. Under **Scope**, search the organization, account, or subaccount you want to give access to. You can type the friendly name or SID to search.
5. Select the **Role** to add.
6. To add additional roles to the same scope, click **Add Role** .
7. To add a role to another scope, click **Add another assignment**.
8. Click **Save** to confirm the changes.

## Delete a user's role assignments

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings** > **Organization settings** > **Users**](https://1console.twilio.com/organization/settings/users/managed-users).
2. Click the user's name, then click the **Role Assignments** tab.

   * To remove the role assignment for the scope, click **Delete**.
   * To remove a specific role from the assignment, click **Edit**, remove the role, and click **Save changes**.

## Legacy Console

1. Go to [Access Control > Role Assignments](https://admin.twilio.com/access-control/role-assignments).
2. Click the user's name to open the **Role Assignment Detail** page.
3. On the **Role Assignment Detail** page, click **Edit assignment**.
4. To delete individual roles, click the dustbin icon beside the role.
5. To delete all the roles for a scope, click **Delete Assignment**.
6. Click **Save** to confirm the changes.

## View roles & permissions

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Organization settings** > **Users**](https://1console.twilio.com/organization/settings/users/roles).
2. Click the **Roles** tab.
3. To view a role's details, click **View details**. Resource-based roles will be displayed with a tag below the role name.

## Legacy Console

1. Go to [Access Control > Roles](https://admin.twilio.com/access-control/roles).
2. The Roles page lists Product groups, role names, and descriptions. A Product group refers to Twilio products such as Messaging or Phone Number that the role belongs to. The General product group is for [general roles](https://support.twilio.com/hc/en-us/articles/223136227-What-s-the-Difference-Between-User-Roles-Owner-Administrator-Developer-Billing-Manager-and-Support-) and the Organization product group is for [organization roles](/docs/iam/organizations#organization-roles).
3. Click on a role to view the list of permissions that role contains. There are no permissions for general account roles and organization roles.

> \[!NOTE]
>
> * Only users with the Organization Owner or Organization Admin role can access the Access Control pages.
> * In the legacy console, organization roles cannot be deleted from the Access control pages. Go to the User detail page from the [Managed users page](https://admin.twilio.com/managed-users) to delete organization roles.
> * Owner role for an Account cannot be deleted from the Access Control pages.
