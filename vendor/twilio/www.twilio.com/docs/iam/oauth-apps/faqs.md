# OAuth apps FAQs

#### What are the regions supported?

We currently support this feature only in the US1 region.

#### Are there any costs associated with using this feature?

OAuth apps are available to all accounts at no additional cost.

#### Which roles allow access to the OAuth apps feature?

Users with the Owner, Administrator or Developer role will be able to access this feature.

#### What is the expiration time of the access token?

By default, the expiration time of access tokens is 1 hour. This is returned as the `expires_in` parameter in the API response after calling the token endpoint. The value is provided in seconds, currently defaulted to 3600 seconds (1 hour).

#### If I generate a new access token will the old token still work?

Yes. If a new access token is generated, the previous access token will continue to work until it expires.

#### What happens when a user who has created an OAuth app is deleted or removed from the account?

There will be no impact on the OAuth app and the credentials will still work.

#### What should I do if my credentials are compromised?

It is recommended that you immediately delete the OAuth app. This will make the credentials and access tokens as invalid.

#### Is there a way to rotate credentials?

Yes, users can rotate client secret from within the Twilio Console. On rotation, the old secret will remain valid for 1 day before it becomes inactive. The expiration of the previous secret is not currently configurable.

Only two client secrets can remain active at any time. If a user rotates a secret before an existing secret expires, a new secret is generated and the oldest active secret becomes invalid.

#### Is this feature also available for subaccounts? Will the account OAuth app work for Subaccount?

Yes this feature is available for subaccounts as well. The account OAuth app will not work for subaccounts under it and users will have to create separate OAuth apps for the subaccount.

#### How are scopes (permissions) mapped with the APIs?

Mapping of the scopes (permissions) to the APIs can be found in the [OAuth apps Overview guide](/docs/iam/oauth-apps/overview#scopespermissions-available-with-oauth-apps). The same mapping applies to the [Restricted API keys](https://www.twilio.com/docs/iam/api-keys/restricted-api-keys) product.
