# Identity Verification

Identity verification helps to make sure that conversations between you and your users are kept private and that one user can't impersonate another. We strongly encourage all Intercom customers to set up and enable identity verification.

## Enable Identity Verification

To enable identity verification in a Cordova app you will need to enable it on both iOS and Android.
Get the Android identity verification secret from your [Android app settings](https://app.intercom.io/a/apps/_/settings/identity-verification/android) and iOS identity verification secret from your [iOS app settings](https://app.intercom.io/a/apps/_/settings/identity-verification/ios) and store them in a secure place on your app server.

Next toggle enforce identity verification to on for both Android and iOS.

> ❗️ Have you already released your app with the Intercom messenger in it?
If you have then enabling identity verification will stop old versions of your app communicating with Intercom. We recommend that you complete setting up identity verification and test that everything is working. Then turn off identity verification and release an update to your app. This update will be sending user hashes to Intercom but not enforcing it. Once you are happy with the number of users on versions of your app sending the user hash you can come back and toggle identity verification on which will then start enforcing it for all versions of your app.


## Returning the HMAC Digest from your App Server's Authentication Call

Your app server authentication code needs to be modified so that it uses the Intercom Android and iOS API Secrets to create a HMAC digest (hash based message authentication code) from the **user id or email address** for that user.
With a Cordova/Phonegap app we have to use the correct secret per platform. I would suggest passing in the platform to your app server authentication code. The example below shows how you might call a method on your server providing it the mobile platform.


```javascript
yourApi.authenticateUser(user_id_or_email, password, device.platform);
```

Then it returns the HMAC digest to your Cordova/Phonegap app. Note that identity verification does not apply to unidentified users, for whom you do not have a user id or email address.

The HMAC is computed as a SHA-256 digest as follows:


```ruby
def authenticateUser (user_id_or_email, password, platform)
  ... do your app authentication and if successful generate a hmac for intercom
  if platform == iPhone
    OpenSSL::HMAC.hexdigest('sha256', ios_api_key.secret, user_id_or_email) 
  else
    OpenSSL::HMAC.hexdigest('sha256', android_api_key.secret, user_id_or_email) 
  end
end
```

If you wish to generate a HMAC in a different programming language we have a comprehensive list [here](https://gist.github.com/thewheat/7342c76ade46e7322c3e).

## Set the User Hash in your Cordova/Phonegap App

When your Cordova/Phonegap app initializes Intercom if the user is identified (i.e., you have a user id or email address), pass in a String of the HMAC returned from your server's authentication call. This should be called before making the `loginUserWithUserAttributes` call:


```javascript
intercom.setUserHash("your_hmac_of_user_id_or_email");
```

The Intercom API Auth Server uses its copy of the Android and iOS API Secrets to recreate the HMAC digest from the **user_id or email**. If it matches with the supplied HMAC digest, we can be sure that this request is coming from your app server and the API Auth Server issues an access token to the Android messenger.

If the HMAC fails to verify, the API Auth Server responds with a 401.

> 📘 Sending both user_id and email values?
If you send both email and user_id values in your integration, you need to calculate the HMAC on the **user_id** value.
Sending an HMAC derived from the email will fail with a 401 if a user_id is provided


## Troubleshooting

- Make sure you are using the correct identity verification secret for each platform eg. on iOS your server is returning a HMAC using the iOS secret not the Android one.
- The user data passed to your server must be either the user_id or email for that Intercom user. If you supply both email and user_id values, calculate the HMAC on the user_id value
- Do not forget that identity verification needs to be activated (and configured) separately in your development/test and production apps.