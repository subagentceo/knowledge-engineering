# Authentication

Twilio SendGrid supports API keys delivered via Bearer token or Basic authentication, depending on the Twilio SendGrid functionality you are using. In addition to Bearer API key authentication, Twilio SendGrid recommends two-factor authentication (2FA) to improve security.

## API key

Authenticate to the Twilio SendGrid API by creating an API Key in the [Settings section of the Twilio SendGrid console][tsg-settings].

Twilio SendGrid requires using API keys because they are a secure way to talk to the Twilio SendGrid API that is separate from your username and password. If your API key gets compromised, you can delete and create a new API key and update your environment variables with the new key. API key permissions can be set to provide access to different functions of your account, without providing access to your account as a whole.

To use an API key, pass an Authorization header with a value of `Bearer <Your-API-Key-Here>`, where you replace `<Your-API-Key-Here>` with the API Key that you created in the UI.

Example header:

```bash
GET https://api.sendgrid.com/v3/resource HTTP/1.1
Authorization: Bearer <Your-API-Key-Here>
```

```bash
curl -X "GET" "https://api.sendgrid.com/v3/templates" -H "Authorization: Bearer <Your-API-Key-Here>" -H "Content-Type: application/json"
```

## Basic authentication

Using basic authentication with your account password is not as secure as using an API key. If your credentials are compromised—for example, if you accidentally commit them to version control—it is more difficult to regain the security of your account when those credentials are your username and password rather than an API key. For this reason, Twilio Twilio SendGrid ended support for Basic Authentication with username and password as of Q4 2020. Twilio SendGrid supports Basic Authentication using an API key as your password value for some services.

When using Basic Authentication, your username will always be `apikey`, and your password will be your API key.

> \[!NOTE]
>
> If you are currently using Basic authentication, we recommend upgrading your authentication method to Bearer using [API Keys][] and then enabling Two-Factor Authentication for improved security. For more information, see [Upgrading your authentication method to API Keys][].

## Two-factor authentication

To ensure the security of your account, Twilio SendGrid requires enabling two-factor authentication (2FA) for all users. To learn about setting up 2FA, see [Two-factor authentication][].

> \[!NOTE]
>
> It is not possible to use basic authentication for users, subusers, or teammates that enable 2FA.

[API Keys]: /docs/sendgrid/ui/account-and-settings/api-keys

[tsg-settings]: https://app.sendgrid.com/settings/api_keys

[Two-factor authentication]: /docs/sendgrid/ui/account-and-settings/two-factor-authentication

[Upgrading your authentication method to API Keys]: /docs/sendgrid/for-developers/sending-email/upgrade-your-authentication-method-to-api-keys
