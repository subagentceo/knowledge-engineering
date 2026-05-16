# Secure your Messenger

JWTs (JSON Web Tokens) are the recommended method to secure your Messenger. With JWTs, you can ensure that bad actors can't impersonate your users, see their conversation history, or make unauthorized updates to data.

Messenger security works by requiring a unique server side generated [JSON web token (JWT)](https://jwt.io/introduction), based on the user’s `user_id`, a payload of data about the user (optional) and the Messenger API secret key from your Messenger security settings.

## 🤔 Do I need this?

We **strongly recommend** this for every Messenger installation for users. Without it, a bad actor could gain unauthorised access to the data in your workspace through impersonation of your real users. [See more in our help doc](https://www.intercom.com/help/en/articles/10589769-authenticating-users-in-the-messenger-with-json-web-tokens-jwts)

image.png
[See our help video](https://www.loom.com/share/b48b9f5e7f9a4d89948e40cf8a8db7b4)

> **Already using Identity Verification?** Check out our [migration guide](https://www.intercom.com/help/en/articles/10807823-migrating-from-identity-verification-to-messenger-security-with-jwts) to switch from HMAC to JWT.


## Setting up Messenger Security

You can set up, turn on or turn off Messenger Security at any time in the [Intercom for web settings](https://app.intercom.com/a/apps/_/settings/channels/messenger/security). Here you will isntructions and code examples for many languages and frameworks.

Note: Turning off the feature can be useful while you’re developing but your workspace's data will be vulnerable to unauthorised access or cross-user impersonation while it’s off.

## Best Practices for JWT Implementation

1. **Token Expiration**: Set token expiration times that match your app's session length. While shorter-lived tokens provide better security, the expiration should align with your authentication flow.
2. **Token Refresh**: If you set an expiry, periodically provide fresh tokens to the Intercom SDK, especially when updating user information. This ensures the most current user data is securely verified.


## Rotating your Messenger API secret keys

Your secret key can be generated in [your workspace's Messenger security settings](https://app.intercom.com/a/apps/_/settings/channels/messenger/security).

You can find and copy your existing keys on the right hand sidebar of the JWT setup page.

You can rotate keys in [Workspace > Security > Messenger](https://app.intercom.com/a/apps/_/settings/workspace/security?section=&tab=messenger-security).

rotate keys.png
### Identity Verification

While JWT is the recommended method, we continue to support Identity Verification with HMAC for backward compatibility. If you're making any changes to your Identity Verification setup, we recommend moving to JWTs.

## Troubleshooting

jwt decoder.gif
- Having trouble? Check the verbose logs [on the setup page](https://app.intercom.com/a/apps/_/settings/channels/messenger/security?section=messenger-security&tab=web) and the token debugger
- Check that you’ve set up Messenger security everywhere in your app or website where you talk to logged-in users. If you only set it up on some places and not others, then Intercom Messenger will not work properly.
- Ensure that you secure every integration you have with Intercom. If you only secure web but leave your iOS or Android integrations vulnerable, your data is still at risk.
- Make sure you’re generating your JWT with the right user data based on what you’re sending to Intercom.
  - Your JWT must be generated using the user's [user_id](https://www.intercom.com/help/en/articles/268-what-is-user_id-and-why-would-i-want-to-use-it#h_26e49485a5) value.
- Use the right secret key. You can find your secret key in your [Messenger security settings](https://app.intercom.com/a/apps/_/settings/workspace/security?tab=messenger-security)).
- Be careful not to leak your secret key onto your frontend client or anywhere publicly accessible. If you’ve leaked your secret key, rotate it in your Messenger security settings.