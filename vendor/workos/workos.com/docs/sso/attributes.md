# Profile Attributes

## Introduction

WorkOS automatically normalizes a standard set of attributes from identity providers (IdPs) into the [Single Sign-On (SSO) Profile](https://workos.com/docs/reference/sso/profile) object. More unique cases can be mapped by your customer's IT contact. In this guide, we’ll explain how to map data from identity providers to the SSO Profiles.

## Definitions

**Standard attributes**
: The most common user information, normalized across providers.

**Predefined attributes**
: Detailed user attributes for specific use cases, normalized across providers. You can opt-in to each attribute you'd like IT contacts to map during SSO connection configuration.

**Custom attributes**
: For unique cases, you can create custom attributes your customers can map when setting up an SSO connection.

## Standard attributes

Every SSO Profile comes with the following standard attributes. These are the core set of attributes that are common across all identity providers. These are structured fields with a guaranteed schema in the top-level SSO Profile payload.

| Attribute    | Description                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `idp_id`     | The user’s unique identifier, assigned by the identity provider. Different identity providers use different ID formats |
| `email`      | The user’s email                                                                                                       |
| `first_name` | The user’s first name                                                                                                  |
| `last_name`  | The user’s last name                                                                                                   |

***

## Custom attributes

For more detailed user information, you can opt-in to additional predefined attributes and define your own custom attributes. These attributes will appear in the custom attributes field on [SSO Profile](https://workos.com/docs/reference/sso/profile) objects and can be configured in the [WorkOS Dashboard](https://dashboard.workos.com/).

> When using AuthKit, SSO Profile custom attributes are also available on the organization membership's `custom_attributes` field. See [JWT Templates](https://workos.com/docs/authkit/jwt-templates) for how to include these in your access tokens.

### Predefined attributes

When enabled, IT contacts will be asked to map these attributes during SSO configuration in [Admin Portal](https://workos.com/docs/admin-portal). These fields are always optional if enabled. These fields are named and schematized by WorkOS – they cannot be renamed.

| Attribute               | Type and description                                                                                                            | Status   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `addresses`             | The user’s list of address objects (`street_address`, `locality`, `region`, `postal_code`, `country`, `primary`, `raw_address`) | Optional |
| `cost_center_name`      | The user’s cost center name                                                                                                     | Optional |
| `department_name`       | The user’s department name                                                                                                      | Optional |
| `division_name`         | The user’s division name                                                                                                        | Optional |
| `emails`                | The user’s list of email objects (`type`, `value`, `primary`)                                                                   | Optional |
| `employee_type`         | The user’s employment type                                                                                                      | Optional |
| `employment_start_date` | The user’s start date                                                                                                           | Optional |
| `job_title`             | The user’s job title                                                                                                            | Optional |
| `manager_email`         | The email address for the user’s manager                                                                                        | Optional |
| `username`              | The user’s username                                                                                                             | Optional |

#### Enable or disable a predefined attribute

Predefined attributes can be enabled or disabled in the [WorkOS Dashboard](https://dashboard.workos.com/) on the Identity Provider Attributes page.

![WorkOS Dashboard UI showing editing predefined attributes](https://images.workoscdn.com/images/73b775ed-c3ef-4c81-bb56-7b040d3d073a.png?auto=format\&fit=clip\&q=50)

> For SSO Profiles, making changes to IdP attributes will take effect upon next sign-in.

### Custom attributes

Custom attributes can be utilized to enrich SSO Profiles with additional data from the identity provider. You can create attributes that appear as fields in the [Admin Portal](https://workos.com/admin-portal). Your customers can map these fields to the correct values in their system when setting up SSO with their identity provider.

#### Create a custom attribute

Custom attributes can be created in the [WorkOS Dashboard](https://dashboard.workos.com/) on the Identity Provider Attributes page.

![WorkOS Dashboard UI showing custom attribute creation](https://images.workoscdn.com/images/c1d00c4c-4dea-415e-a8f8-c870317410df.png?auto=format\&fit=clip\&q=50)

> For SSO Profiles, making changes to IdP attributes will take effect upon next sign-in.

#### Delete a custom attribute

When a custom attribute is deleted, [SSO Profiles](https://workos.com/docs/reference/sso/profile) will retain these existing attribute values until the next sign-in.

#### Editing attribute mappings

If attribute data for a particular SSO connection has changed and is no longer mapped properly, you or IT contacts can edit the attribute mappings via the [WorkOS Dashboard](https://dashboard.workos.com/) connection page or [Admin Portal](https://workos.com/admin-portal), respectively.

![WorkOS Dashboard UI showing editing attribute mappings for a connection](https://images.workoscdn.com/images/09395b6c-d037-440f-a17e-ef0507868532.png?auto=format\&fit=clip\&q=50)

### Custom attribute mapping in Admin Portal

You can control the visibility of custom attribute mapping for Directory Sync and Single Sign-On flows in the Admin Portal at the environment and organization level.

The environment-level setting is controlled on the Identity Provider Attributes page in the [WorkOS Dashboard](https://dashboard.workos.com/).

![WorkOS Dashboard UI showing editing custom attribute mapping in Admin Portal setting](https://images.workoscdn.com/images/23ee5439-6cbb-4c18-ac39-0870d63bfc0b.png?auto=format\&fit=clip\&q=50)

Organization-level settings are controlled on an individual organization's Attributes tab in the [WorkOS Dashboard](https://dashboard.workos.com/). Organizations mirror the environment-level settings by default.

## Raw attributes \[Deprecated]

The `raw_attributes` field on [SSO Profile](https://workos.com/docs/reference/sso/profile) objects is deprecated and will **stop returning data on April 15, 2026**.

[Custom attributes](https://workos.com/docs/sso/attributes/custom-attributes/custom-attributes) are the recommended replacement. Define the attributes you need in the [WorkOS Dashboard](https://dashboard.workos.com/), and your customers' IT contacts can map them during SSO connection setup in the [Admin Portal](https://workos.com/docs/admin-portal).

Contact support [via email](mailto:support@workos.com) or Slack if you need help with the migration. We also have tooling to automate the WorkOS-side configuration on your behalf.

For a full migration walkthrough covering Directory Sync, SSO, and AuthKit, see the [migration guide](https://workos.com/docs/deprecations/raw-attributes).

***

## Frequently asked questions

### Which identity providers support mapping additional predefined and custom attributes?

Additional predefined and custom attributes are supported for all SAML SSO connections.

### Can our customers add their own custom attributes outside of what is defined in the WorkOS Dashboard?

We do not currently support this functionality. Custom attributes must be defined in the WorkOS Dashboard first. Please reach out to [support](mailto:support@workos.com) if you have a specific use case that you would like to discuss.

### What happens if an attribute cannot be mapped from the IdP?

Attributes that cannot be mapped for a particular [SSO Profile](https://workos.com/docs/reference/sso/profile) will result in a `null` value for the attribute.
