# Migrate from AWS Cognito

## Introduction

The WorkOS AuthKit API allows you to migrate your existing user data from a variety of existing sources. In this guide, we'll walk through the steps to export, and then import your users from AWS Cognito.

> AWS Cognito does not offer exports of user password hashes or MFA keys. This means that your imported users will need to reset their passwords and reconfigure any required MFA.

## (1) Exporting Cognito user data

User data in an AWS Cognito User Pool can be exported using the AWS CLI's [list-users command](https://docs.aws.amazon.com/cli/latest/reference/cognito-idp/list-users.html).

To retrieve the first page of results, use the command:

```bash title="List users using the Cognito CLI"
aws cognito-idp list-users --user-pool-id <your-user-pool> --region <region>
```

Add the `--pagination-token <next-token>` argument to paginate subsequent requests:

```bash title="export-aws-cognito-users.sh"
#!/bin/bash
user_pool_id="<your-user-pool-id>"
region="<your-region>"
output_dir="cognito_exports"
file_index=1

mkdir -p "$output_dir"

export_users() {
  aws cognito-idp list-users --user-pool-id "$user_pool_id" --region "$region" $1 | \
  jq '.' > "$output_dir/users_$2.json"
}

next_token=""
while true; do
  next_token=$(export_users "${next_token:+--pagination-token $next_token}" "$file_index" | jq -r '.PaginationToken // empty')
  [ -z "$next_token" ] && break
  ((file_index++))
done
echo "Export complete."
```

## (2) Importing users into WorkOS

After obtaining your user data from Cognito, it's time to import them into WorkOS.

### Using the WorkOS migrations CLI

The fastest way to import users is with the CLI:

```bash
npx workos migrations import --csv cognito-users.csv
```

Or for a guided experience: `npx workos migrations wizard`

Alternatively, map attributes from the AWS Cognito User format to WorkOS API parameters.

```json title="Example AWS Cognito list-users response object"
{
  "Users": [
    {
      "Username": "22704aa3-fc10-479a-97eb-2af5806bd327",
      "Enabled": true,
      "UserStatus": "FORCE_CHANGE_PASSWORD",
      "UserCreateDate": 1548089817.683,
      "UserLastModifiedDate": 1548089817.683,
      "Attributes": [
        {
          "Name": "sub",
          "Value": "22704aa3-fc10-479a-97eb-2af5806bd327"
        },
        {
          "Name": "family_name",
          "Value": "Mouse"
        },
        {
          "Name": "given_name",
          "Value": "Mickey"
        },
        {
          "Name": "email_verified",
          "Value": "true"
        },
        {
          "Name": "email",
          "Value": "mary@example.com"
        }
      ]
    }
  ]
}
```

Using the WorkOS [Create User API](https://workos.com/docs/reference/authkit/user/create), you can create a corresponding record in WorkOS for each exported user. Use the following mapping from the AWS Cognito object to parameters in your WorkOS Create User API calls:

| AWS Cognito     |     | WorkOS API       |
| --------------- | --- | ---------------- |
| `email`         | →   | `email`          |
| `emailVerified` | →   | `email_verified` |
| `given_name`    | →   | `first_name`     |
| `family_name`   | →   | `last_name`      |

> Migrated users **must reset their passwords** before they can sign in.

### Triggering password resets

It's important to have a strategy for triggering password resets after importing your users into WorkOS. You may want to ask users to reset their password the next time they attempt to sign in, or proactively send them password reset emails.

In either case, you can trigger the password reset flow by using the WorkOS [Send Password Reset Email API](https://workos.com/docs/reference/authkit/password-reset/create).

## Other authentication methods

In addition to migrating username and password users to WorkOS, you can migrate users who authenticate using third-party identity providers, such as Google, without re-obtaining access.

Ensure you use the same credentials (i.e. Client ID and Client Secret) in WorkOS as those used for your connection in AWS Cognito.

For OAuth providers, you will need to add WorkOS as an additional Redirect URI. See the [Google OAuth integration guide](https://workos.com/docs/integrations/google-oauth/customize-google-oauth-domain-optional/3-add-new-redirect-uri-to-google) as an example of what this process looks like.
