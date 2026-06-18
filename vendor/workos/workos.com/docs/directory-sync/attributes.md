# User Attributes

import { DocsAccordionHydrator } from "../../../components/docs-accordion-hydrator";
import { DocsAccordion } from "../../../components/docs-accordion";

## Introduction

WorkOS can automatically find and normalize most common attributes from directory providers into the [Directory User](https://workos.com/docs/reference/directory-sync/directory-user) object, which represents an enterprise user. More unique cases can be mapped by your customers admins.

<DocsAccordion.Header as="h3">Directory User object</DocsAccordion.Header>

Here is an example Directory User. The data stored varies per directory provider and may include attributes such as photo URLs, pay groups, supervisors, etc.

```json language="json" title="Directory User"
{
  "id": "directory_user_01E1X7B89OH8Z3SXFJR4H7RGX7",
  "idp_id": "821991",
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@example.com",
  "state": "active",
  "created_at": "2021-06-25T19:07:33.155Z",
  "updated_at": "2021-06-25T19:07:33.155Z",
  "object": "directory_user",
  "directory_id": "directory_01E1X194NTJ3PXMAY79DYV0F0P",
  "organization_id": "org_01EHWNCE74X7JSDV0X3SZ3PJNY",
  "custom_attributes": {
    "emails": [
      {
        "type": "work",
        "value": "jane@example.com",
        "primary": true
      }
    ],
    "employee_number": "E-12345",
    "employee_type": "Full Time",
    "employment_start_date": "2021-06-27T12:00:00.000Z",
    "department_name": "Engineering",
    "display_name": "Jane Doe",
    "manager_name": "John Smith",
    "manager_email": "john@example.com",
    "manager_id": "26118915-6090-4610-87e4-49d8ca9f808d",
    "division_name": "Analytics",
    "cost_center_name": "IT",
    "job_title": "Software Engineer",
    "organization": "Acme Corp",
    "addresses": [
      {
        "type": "work",
        "street_address": "101 123rd Ave",
        "locality": "Brooklyn",
        "region": "New York",
        "postal_code": "12345",
        "country": "USA",
        "raw_address": "101 123rd Ave, Brooklyn,  New York, 12345, USA",
        "primary": true
      },
      {
        "type": "home",
        "street_address": "102 W 321st St",
        "locality": "Brooklyn",
        "region": "New York",
        "postal_code": "54321",
        "country": "USA",
        "raw_address": "102 W 321st St, Brooklyn,  New York, 54321, USA",
        "primary": false
      }
    ],
    "phone_numbers": [
      {
        "value": "+1-555-555-4567",
        "display": null,
        "type": "work",
        "primary": true
      }
    ],
    "username": "jane@example.com",
    "my_new_key": "<custom-mapped value>"
  }
}
```

In this guide, we'll explain how to map data from directory providers to the Directory Users.

## Definitions

**Standard attributes**
: The most common user information, normalized across providers.

**Predefined attributes**
: Detailed user attributes for specific use cases, normalized across providers. You can opt-in to each attribute you'd like auto-mapped.

**Custom attributes**
: For unique cases, you can create custom attributes your customers can map when setting up a directory.

## Standard attributes

Every Directory User comes with the following standard attributes. These are the core set of attributes that are common across all identity providers. These are structured fields with a guaranteed schema in the top-level Directory User payload.

| Attribute    | Type and description                                                                                                     | Status   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| `idp_id`     | The user's unique identifier, assigned by the directory provider. Different directory providers use different ID formats | Required |
| `first_name` | The user's first name                                                                                                    | Optional |
| `last_name`  | The user's last name                                                                                                     | Optional |
| `email`      | The user's email                                                                                                         | Optional |
| `state`      | The user's state. May be `active`, or `inactive`                                                                         | Required |

> `emails`, `job_title`, and `username` were previously considered standard attributes, but have been deprecated in favor of equivalent [auto-mapped custom attributes](https://workos.com/docs/directory-sync/attributes/custom-attributes/predefined-attributes).

***

## Custom attributes

For more detailed user information, you can opt-in to additional predefined attributes and define your own custom attributes. These attributes will appear in the custom attributes field on [Directory User](https://workos.com/docs/reference/directory-sync/directory-user) objects and can be configured in the [WorkOS Dashboard](https://dashboard.workos.com/).

> Custom attributes are configured at the environment level. To configure attributes for a specific organization, please [contact our support team](mailto:support@workos.com).

> When using AuthKit with directory provisioning, Directory User custom attributes are also available on the organization membership's `custom_attributes` field. See [JWT Templates](https://workos.com/docs/authkit/jwt-templates) for how to include these in your access tokens.

### Predefined attributes

When enabled, the values will be mapped without additional setup. Not every directory provider has data for every field, so they are always optional if enabled. These fields are named and schematized by WorkOS – they cannot be renamed.

| Attribute               | Type and description                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `addresses`             | The user's list of address objects (`street_address`, `locality`, `region`, `postal_code`, `country`, `primary`, `raw_address`) |
| `cost_center_name`      | The user's cost center name                                                                                                     |
| `department_name`       | The user's department name                                                                                                      |
| `display_name`          | The user's display name                                                                                                         |
| `division_name`         | The user's division name                                                                                                        |
| `emails`                | The user's list of email objects (`type`, `value`, `primary`)                                                                   |
| `employee_number`       | The user's employee number assigned by the organization                                                                         |
| `employee_type`         | The user's employment type                                                                                                      |
| `employment_start_date` | The user's start date                                                                                                           |
| `job_title`             | The user's job title                                                                                                            |
| `manager_name`          | The name of the user's manager                                                                                                  |
| `manager_id`            | The identifier of the user's manager from the directory provider                                                                |
| `manager_email`         | The email address for the user's manager                                                                                        |
| `organization`          | The name of the user's organization                                                                                             |
| `phone_numbers`         | The user's list of phone number objects (`value`, `display`, `type`, `primary`)                                                 |
| `username`              | The user's username                                                                                                             |

#### Enable or disable a predefined attribute

Predefined attributes can be enabled or disabled in the [WorkOS Dashboard](https://dashboard.workos.com/) on the Identity Provider Attributes page.

![WorkOS Dashboard UI showing editing predefined attributes](https://images.workoscdn.com/images/73b775ed-c3ef-4c81-bb56-7b040d3d073a.png?auto=format\&fit=clip\&q=50)

> Updates to these settings may take up to an hour to reflect in your Directory User API response. A [dsync.user.updated](https://workos.com/docs/events/directory-sync) event is emitted for each Directory User changed by toggling auto-mapped attributes.

### Support per directory provider

The following support table outlines the attribute availability across directory providers.

| Attribute | SCIM | Google | Workday | HiBob | People HR | BambooHR | Breathe HR | Cezanne HR | Fourth |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `addresses` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| `cost_center` | Yes | Yes | Yes | No | No | No | No | Yes | No |
| `department_name` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `display_name` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `division_name` | Yes | No | Yes | No | No | Yes | Yes | No | No |
| `emails` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| `employee_number` | Yes | No | Yes | Yes | Yes | Yes | No | No | No |
| `employment_start_date` | No | No | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `employee_type` | Yes | Yes | Yes | No | Yes | Yes | Yes | No | Yes |
| `job_title` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| `manager_name` | Yes | No | Yes | Yes | Yes | Yes | No | No | No |
| `manager_email` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| `manager_id` | Yes | No | Yes | Yes | Yes | Yes | No | No | No |
| `organization` | Yes | No | Yes | No | No | No | No | No | No |
| `phone_numbers` | Yes | Yes | No | No | No | Yes | No | No | Yes |
| `username` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |

### Custom attributes

Custom attributes can be utilized to enrich [Directory User](https://workos.com/docs/reference/directory-sync/directory-user) objects with additional data from the identity provider. You can create attributes that appear as fields in the [Admin Portal](https://workos.com/admin-portal). Your customers can map these fields to the correct values in their system when setting up Directory Sync with their identity provider.

#### Create a custom attribute

Custom attributes can be created in the [WorkOS Dashboard](https://dashboard.workos.com/) on the Identity Provider Attributes page.

![WorkOS Dashboard UI showing custom attribute creation](https://images.workoscdn.com/images/c1d00c4c-4dea-415e-a8f8-c870317410df.png?auto=format\&fit=clip\&q=50)

#### Delete a custom attribute

When a custom attribute is deleted, the attribute will be deleted from all [Directory User](https://workos.com/docs/reference/directory-sync/directory-user) objects.

> Updates to custom attributes may take up to an hour to reflect in your Directory User API response. A [dsync.user.updated](https://workos.com/docs/events/directory-sync) event is emitted for each Directory User changed.

#### Nested attributes

Custom attributes support nested attribute mapping. Different directory providers structure their data differently, and nested attribute support allows you or your customer to map values regardless of where they appear in the directory structure.

Nested attributes from the directory can be mapped to custom attributes using the WorkOS [Dashboard](https://dashboard.workos.com/) or [Admin Portal](https://workos.com/docs/admin-portal) by selecting attributes from an interactive schema viewer. The schema viewer displays the structure of user data from their directory, allowing them to browse and select any nested field. This ensures accurate mapping without manual configuration.

##### Example: Different structures across providers

The same logical attribute (like "license") may appear at different nesting levels depending on the provider:

```json language="json" title="Provider A - Nested under URN"
{
  "userName": "jdoe@example.com",
  "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
    "license_tier": "silver"
  }
}
```

```json language="json" title="Provider B - Under custom schemas"
{
  "userName": "jdoe@example.com",
  "customSchemas": {
    "license_tier": "silver"
  }
}
```

With nested attribute support, you can create a single custom attribute called `license_tier`, and IT admins can map it to the correct location in their specific directory provider's structure using the schema viewer.

***

## Raw attributes \[Deprecated]

The `raw_attributes` field on [Directory User](https://workos.com/docs/reference/directory-sync/directory-user) objects is deprecated and will **stop returning data on April 15, 2026**.

[Custom attributes](https://workos.com/docs/directory-sync/attributes/custom-attributes/custom-attributes) and [nested attribute mapping](https://workos.com/docs/directory-sync/attributes/custom-attributes/custom-attributes) are the recommended replacements. These features provide a consistent, structured API while giving IT admins the flexibility to map any field from their directory provider.

Contact support [via email](mailto:support@workos.com) or Slack if you need help with the migration. We also have tooling to automate the WorkOS-side configuration on your behalf.

For a full migration walkthrough covering Directory Sync, SSO, and AuthKit, see the [migration guide](https://workos.com/docs/deprecations/raw-attributes).

***

## Frequently asked questions

### Are existing directories required to update the attribute mapping when new required custom attributes are added?

No, when you add a new required custom attribute to your settings, this won't be retroactively required for directories that have already been set up and configured. However, in the WorkOS dashboard, you will be able to navigate directly to the existing directory and fill in details for those attributes manually.

### Can our customers add their own custom attributes outside of what is defined in the WorkOS dashboard?

We do not currently support this functionality, as you have to define any custom attributes in the dashboard first. Please reach out to [support](mailto:support@workos.com) if you have a specific use case that you would like to discuss.

### What happens if an attribute cannot be mapped from the IdP?

Attributes that cannot be mapped for a particular [Directory User](https://workos.com/docs/reference/directory-sync/directory-user) will result in a `null` value for the attribute. [dsync.user.updated](https://workos.com/docs/events/directory-sync) events are not emitted when an attribute changes from `null` to `undefined` or vice versa.

### How do IT admins map nested attributes?

IT admins can map nested attributes using the schema viewer in the WorkOS [Admin Portal](https://workos.com/docs/admin-portal) when configuring their directory. The schema viewer displays the actual structure of user data from their directory provider, showing how attributes are organized.

To map a nested attribute:

1. IT admins navigate to the attribute mapping step during directory configuration
2. They view a visual representation of their directory's user data structure
3. They select any field, regardless of nesting level, from the schema viewer
4. The mapping is automatically configured for that nested attribute

This approach works consistently across all directory providers, even though each provider may structure their data differently. The schema viewer adapts to show the specific structure of the IT admin's directory provider, ensuring accurate mapping without requiring technical knowledge of the underlying data format.
