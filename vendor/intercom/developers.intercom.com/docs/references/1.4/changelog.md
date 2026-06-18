# Changelog (v1.4)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

Breaking Changes
This version of the API includes [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api). See below for details.

## Listing Data Attributes

We've modified the way data attributes are retrieved via our [Data Attributes API](/docs/references/1.4/rest-api/data-attributes/data-attributes). You can now retrieve a list of all data attributes by sending a GET request to the `data_attributes` endpoint.

- **Listing customer data attributes** - you can list customer data attributes by specifying a `model` parameter in the request URL with the value `customer`.
- **Listing company data attributes** - you can list company data attributes by specifying a `model` parameter in the request URL with the value `company`.


With the introduction of this change, **customer and company data attributes can no longer be listed by using the old endpoints**. For example, sending a request to the `data_attributes/customer` endpoint and sending a request to the `data_attributes/company` will no longer work.

## Validating Custom Data Attributes

Custom Data Attributes created via the API must now use the same naming rules as the ones created via the UI. Names can therefore only contain alphanumeric characters, currency symbols, and hyphens.

## Adding owner_id to User & Lead objects

We now expose a user or lead's account owner through the `owner_id` attribute. This will be the integer for an admin's id, meaning you can use this to make a call to our Admin API and get more details on the given owner.

## Removing archived Custom Data Attributes from User responses

Archived Custom Data Attributes will no longer be present on the User model in API responses.

## Removing Teams from Admin responses

The Admins endpoint will no longer return Teams in its responses. The Teams endpoint should be used instead.