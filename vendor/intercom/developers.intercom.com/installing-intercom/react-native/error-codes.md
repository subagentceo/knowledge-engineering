# Error Codes

The Intercom React Native wrapper surfaces errors from the underlying native iOS and Android SDKs as Promise rejections. You can catch these errors using standard JavaScript error handling patterns.

## Handling errors

All Intercom methods return a `Promise`. When a call fails, the Promise is rejected with an error object containing a `code` (string) and `message`.


```javascript
try {
  await Intercom.loginUserWithUserAttributes({ email: 'bob@example.com' });
} catch (error) {
  console.log('Error code:', error.code);   // e.g. '102'
  console.log('Error message:', error.message);
}
```

Or using Promise chains:


```javascript
Intercom.loginUserWithUserAttributes({ email: 'bob@example.com' })
  .catch((error) => {
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
  });
```

## List of error codes

The React Native bridge defines its own error codes that are returned as strings in `error.code`. These identify which operation failed:

### User and identity error codes

| Error Code | Operation | Description |
|  --- | --- | --- |
| 101 | loginUnidentifiedUser | An error occurred while logging in an unidentified user. |
| 102 | loginUserWithUserAttributes | An error occurred while logging in an identified user. |
| 103 | setUserHash | An error occurred while setting the user hash for identity verification. |
| 104 | updateUser | An error occurred while updating user attributes. |
| 105 | logEvent | An error occurred while logging an event. |
| 106 | logout | An error occurred while logging out the user. Android only. |
| 107 | setLogLevel / getUnreadConversationCount | An error occurred while setting log level (Android) or fetching unread count (iOS). |
| 109 | setUserJwt | An error occurred while setting a user JWT. |
| 110 | setAuthTokens | An error occurred while setting authentication tokens. |
| 111 | initialize | An error occurred while initializing the Intercom SDK. |


### Display error codes

Android only
The display error codes below are only returned on Android. On iOS, these operations always resolve successfully without error codes.

| Error Code | Operation | Description |
|  --- | --- | --- |
| 201 | present | An error occurred while presenting the Messenger. |
| 202 | presentMessageComposer | An error occurred while presenting the message composer. |
| 203 | presentContent | An error occurred while presenting content (article, survey, carousel, etc.). |
| 205 | setInAppMessageVisibility | An error occurred while setting in-app message visibility. |
| 206 | hideIntercom | An error occurred while hiding the Intercom UI. |
| 208 | setLauncherVisibility | An error occurred while setting launcher visibility. |
| 209 | setBottomPadding | An error occurred while setting the bottom padding. |
| 210 | setThemeMode | An error occurred while setting the theme mode. |


### Push notification error codes

| Error Code | Operation | Description |
|  --- | --- | --- |
| 302 | sendTokenToIntercom | An error occurred while registering a device token for push notifications. |


### Help Center data API error codes

| Error Code | Operation | Description |
|  --- | --- | --- |
| 901 | fetchHelpCenterCollections | An error occurred while fetching Help Center collections. |
| 902 | fetchHelpCenterCollection | An error occurred while fetching the contents of a Help Center collection. |
| 903 | searchHelpCenter | An error occurred while searching the Help Center. |


Underlying native errors
The `error.code` values above identify which React Native bridge operation failed. Note that `error.code` is a string (e.g., `'102'`), not a number. The underlying cause comes from the native iOS or Android SDK. For detailed descriptions of native-level error codes, see the [iOS error codes](https://developers.intercom.com/installing-intercom/ios/error-codes/) and [Android error codes](https://developers.intercom.com/installing-intercom/android/error-codes/) reference pages.