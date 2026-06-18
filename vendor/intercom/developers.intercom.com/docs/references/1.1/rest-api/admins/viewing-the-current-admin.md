# Viewing the current admin and app

OAuth only
This feature is only available when using [OAuth](https://developers.intercom.io/blog#oauth-support). This requires the "Read admins" permission.

You can view the name, email and app ID of the current authorised admin via a GET request to `https://api.intercom.io/me`.

### Returns

An [Admin model](#admin-model), with an embedded App object.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'admin'* |
| id | string | *The id of the admin* |
| name | string | *The name of the admin* |
| email | string | *The email address of the admin* |
| email_verified | boolean | *This field will indicate whether the Intercom user has verified their email or not* |
| app.type | string | *value is 'app'* |
| app.id_code | string | *The id of the app* |
| app.name | string | *The name of the app* |
| app.created_at | timestamp | *When the app was created* |
| app.identity_verification | boolean | *Whether or not the app uses identity verification* |


Single Sign On
If you are building a custom "Log in with Intercom" flow for your site, and you call the /me endpoint to identify the user logging, in you should not accept any sign ins from users with unverified email addresses as it poses a potential impersonation security risk.