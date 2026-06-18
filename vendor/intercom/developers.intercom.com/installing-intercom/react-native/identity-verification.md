# Identity Verification

Identity verification helps to make sure that conversations between you and your users are kept private and that one user can't impersonate another. We strongly encourage all Intercom customers to set up and enable identity verification.

## Enable Identity Verification

Get the identity verification secret from your app settings

- [IOS](https://app.intercom.io/a/apps/_/settings/identity-verification/ios)
- [Android](https://app.intercom.io/a/apps/_/settings/identity-verification/android)


Next toggle enforce identity verification to on.

> ❗️ Have you already released your app with the Intercom messenger in it?
If you have then enabling identity verification will stop old versions of your app communicating with Intercom. We recommend that you complete setting up identity verification and test that everything is working. Then turn off identity verification and release an update to your app. This update will be sending user hashes to Intercom but not enforcing it. Once you are happy with the number of users on versions of your app sending the user hash you can come back and toggle identity verification on which will then start enforcing it for all versions of your app.


## Returning the HMAC Digest from your App Server's Authentication Call

Your app server authentication code needs to be modified so that is uses the Intercom Android API Secret to create a HMAC digest (hash based message authentication code) from the **user id or email address** for that user. Then it returns the HMAC digest to your Android app. Note that identity verification does not apply to unidentified users, for whom you do not have a user id or email address.

The HMAC is computed as a SHA-256 digest as follows:

```ruby
OpenSSL::HMAC.hexdigest('sha256', api_key.secret, user_id_or_email)
```

> 📘
If you wish to generate a HMAC in a different programming language we have a comprehensive list [here](https://gist.github.com/thewheat/7342c76ade46e7322c3e).


## Set the User Hash

When your React Native app initializes Intercom if the user is identified (i.e., you have a user id or email address), pass in a String of the HMAC returned from your server's authentication call. **This should be done before making any user Registration calls.**

```javascript
Intercom.setUserHash("your_hmac_of_user_id_or_email");
```

The Intercom API Auth Server uses its copy of the API Secret to recreate the HMAC digest from the user_id or email. If it matches with the supplied HMAC digest, we can be sure that this request is coming from your app server and the API Auth Server issues an access token to the Android messenger.

If the HMAC fails to verify, the API Auth Server responds with a 401.

> 📘 Sending both user_id and email values?
If you send both email and user_id values in your integration, you need to calculate the HMAC on the **user_id** value.
Sending an HMAC derived from the email will fail with a 401 if a user_id is provided