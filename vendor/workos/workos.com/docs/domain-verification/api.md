# API

Instead of leveraging the Admin Portal, the Domain Verification API can be used to verify domains programmatically.

Integrating with the API goes as follows:

1. Create an organization domain for an organization
2. Share the token and setup instructions with the organization owner (IT contact)
3. Wait for the verification to complete

## Create a new organization domain

All domains belong to an [organization](https://workos.com/docs/reference/organization). In order to create and verify a domain, an organization must first be [created](https://workos.com/docs/reference/organization/create).

#### Request

#### Response

The `verification_token` returned can then be set as the value of a TXT record that WorkOS will periodically check until the record is found. The TXT record for the above response example would be:

- Name: `domain-to-verify.com`
- Value: `verification_token=3CVZxo4HgvSiYRKlV4RdOWwWl`

## Get a domain

Fetch an existing domain and it's current verification status. This endpoint can be polled once verification has been initiated to determine if verification has been successful.

#### Request

#### Response

Possible `state` values:

- `pending`: domain verification has been initiated and not yet completed
- `verified`: domain has been verified
- `failed`: domain was not able to be verified

Possible `verification_strategy` values:

- `dns`: domain is verified with the DNS flow
- `manual`: domain is verified by a person or a system, without running the DNS flow

## Initiate verification for existing domain

If a domain has not successfully verified within thirty days and moves to the `failed` state, verification can be restarted manually.

#### Request

#### Response
