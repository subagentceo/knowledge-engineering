# Metadata and External IDs

## Introduction

Metadata is an attribute of organizations and users that allows you to store additional information about these objects, structured as key-value pairs. For example, you can use metadata to store information about a user's profile picture, or the organization's address.

External identifiers allow you to associate organizations and users with an identifier in your own system.

***

## External identifiers

External identifiers are an attribute of organizations and users that allows you to associate these objects with an identifier in your own system. Once you have set an external identifier for an object, you can query on it via dedicated endpoints in the WorkOS API.

External identifiers must be unique within your environment and are limited to 64 characters.

## Metadata

You can add up to 10 key-value pairs to an organization or user within these data limits:

- **Key**: Up to 40 characters long. ASCII only.
- **Value**: Up to 600 characters long. ASCII only.

If your integration requires more than 10 key-value pairs, consider storing the additional data in your own external database and use an external identifier to associate the data with an organization or user.

> Never store sensitive information in metadata such as passwords, API keys, or other private information.

Metadata is returned in the response body for backend API operations that return organization or user objects, but not in the response body of the [User Authentication](https://workos.com/docs/reference/authkit/authentication) operations. If you want to publicly expose metadata properties from users or organizations in your access tokens, you can use JWT templates to customize claims in your application's access tokens.

## Set an external identifier

To set an external identifier for an organization or user, include the `external_id` property in the request body of the [Create an organization](https://workos.com/docs/reference/organization/create) or [Create a user](https://workos.com/docs/reference/authkit/user/create) endpoints.

#### Request

#### Response

To update an external identifier, include the `external_id` property in the request body of the [Update an organization](https://workos.com/docs/reference/organization/update) or [Update a user](https://workos.com/docs/reference/authkit/user/update) endpoints.

## Query by external identifier

To query an organization or user by their external identifier, use the [Get organization by external identifier](https://workos.com/docs/reference/organization/get-by-external-id) or [Get user by external identifier](https://workos.com/docs/reference/authkit/user/get-by-external-id) endpoints.

## Add and update metadata

Updates to metadata are partial. This means that you only need to include the metadata attributes that you want to update.

Metadata can be included in the request body of the following endpoints:

- [Create an organization](https://workos.com/docs/reference/organization/create)
- [Update an organization](https://workos.com/docs/reference/organization/update)
- [Create a user](https://workos.com/docs/reference/authkit/user/create)
- [Update a user](https://workos.com/docs/reference/authkit/user/update)

To add a metadata attribute to an entity, include the key and value pair in the `metadata` object of the request body.

```json
{
  "metadata": {
    "key": "value"
  }
}
```

To update a metadata attribute, include the key and value pair in the `metadata` object of the request body.

```json
{
  "metadata": {
    "key": "new_value"
  }
}
```

To delete a metadata attribute, set the key to `null` in the `metadata` object of the request body.

```json
{
  "metadata": {
    "key": null
  }
}
```

To delete all metadata attributes, set the `metadata` property an empty object.

```json
{
  "metadata": {}
}
```

## Exposing metadata in JWTs

Custom metadata and external identifiers can be exposed as claims in JWTs using [JWT Templates](https://workos.com/docs/authkit/jwt-templates).

#### Template

#### Context

#### Output
