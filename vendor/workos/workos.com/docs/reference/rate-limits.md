# Rate limits

WorkOS APIs are rate limited to ensure that they are fast for everyone. If you find yourself getting 429 errors, double check your integration to make sure you aren't making unnecessary requests.

## General

| Name         | Path | Limit                                        |
| ------------ | ---- | -------------------------------------------- |
| All requests | \*   | 6,000 requests per 60 seconds per IP address |

This rate limits applies to all environments, staging and production. Exceptions to the general rate limit are listed below.

## Single Sign-On

| Name                                                          | Path           | Limit                                        |
| ------------------------------------------------------------- | -------------- | -------------------------------------------- |
| [Get Authorization URL](https://workos.com/docs/reference/sso/get-authorization-url) | /sso/authorize | 1,000 requests per 60 seconds per connection |

## Directory Sync

| Name                                                        | Path             | Limit                               |
| ----------------------------------------------------------- | ---------------- | ----------------------------------- |
| [Directory Users](https://workos.com/docs/reference/directory-sync/directory-user) | /directory\_users | 4 requests per second per directory |

## Organizations

| Name                                                  | Path              | Limit                                  |
| ----------------------------------------------------- | ----------------- | -------------------------------------- |
| [Delete Organization](https://workos.com/docs/reference/organization/delete) | /organizations/\* | 50 requests per 60 seconds per API key |

## AuthKit

Rate limiting for AuthKit APIs are enforced on a per environment basis.

| Name                                                        | Path                                         | Limit                                                |
| ----------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| Reads                                                       | /user\_management/\*                          | 1,000 requests per 10 seconds                        |
| Writes                                                      | /user\_management/\*                          | 500 requests per 10 seconds                          |
| [Authentication](https://workos.com/docs/reference/authkit/authentication)         | /user\_management/authenticate                | 10 requests per 60 seconds per email or challenge ID |
| [Magic Auth](https://workos.com/docs/reference/authkit/magic-auth)                 | /user\_management/magic\_auth/send             | 3 requests per 60 seconds per email                  |
| [Email verification](https://workos.com/docs/reference/authkit/email-verification) | /user\_management/:id/email\_verification/send | 3 requests per 60 seconds per user                   |
| [Password reset](https://workos.com/docs/reference/authkit/password-reset)         | /user\_management/password\_reset/send         | 3 requests per 60 seconds per email                  |

## Hosted AuthKit

| Name                     | Limits                                                     |
| ------------------------ | ---------------------------------------------------------- |
| Reads                    | 1,000 requests per 10 seconds                              |
| Writes                   | 500 requests per 10 seconds                                |
| SSO sign-ins             | 3 requests per 60 seconds per IP address                   |
| Email sign-ins           | 10 requests per 60 seconds per email and IP address        |
| Magic Auth sign-ins      | 10 requests per 60 seconds per IP address and challenge ID |
| Magic Auth code requests | 3 requests per 60 seconds per IP address and email         |