# React Native Expo

## Introduction

When it comes to combining the WorkOS SSO solution with mobile applications, our advice on the general flow tends to go like this:

1. Make an API call to generate an Authorization URL.
2. Send the end user to the generated URL within their mobile browser.
3. Deep-link the end user back into your native application upon successful authentication.

With Expo, you're able to integrate the WorkOS API with the Expo AuthSession and WebBrowser libraries, which adds web browser based authentication to your app.

***

## (1) Add AuthSession Package

To get started, you'll want to add the `AuthSession` package to your React Native Expo project using the following:

```bash title="Install Expo's AuthSession Package"
expo install expo-auth-session expo-random
```

We'll be using the `AuthSession.makeRedirectUri()` method to generate a RedirectUri for us to use.

## (2) Add WebBrowser Package

You'll also want to add the `WebBrowser` package to your React Native Expo project using the following:

```bash title="Install Expo's WebBrowser Package"
expo install expo-web-browser
```

For our purposes, we'll specifically be using the `WebBrowser.openAuthSessionAsync()` method, which you can read more about [here](https://docs.expo.dev/versions/latest/sdk/webbrowser/#webbrowseropenauthsessionasyncurl-redirecturl-options). We will be using two arguments:

- `url`: This will be the Authorization URL we generate using the WorkOS API
- `redirect`: This will be the link back into your native Expo application once authentication is complete

## (3) Get Authorization URL

The first step in the authentication process will be to Get the Authorization URL and use it as the `url` argument in the `openAuthSessionAsync()` method. In the code, it would look something like this:

```js title="Get Authorization URL Call"
// Generate the RedirectUri and save it to a redirect variable
// You will also need to add this redirect URI on your application's Redirects tab in the WorkOS Dashboard
const redirect = AuthSession.makeRedirectUri().toString();

// Pull Connection ID from environment variables
const connection_id = process.env.WORKOS_CONNECTION_ID;

// Pull Client ID from evnironment variables
const client_id = process.env.WORKOS_CLIENT_ID;

// Format the URL for the Get Authorization URL call and pass in the Client ID, Redirect URI, and Connection ID
const url = `https://api.workos.com/sso/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect}&state=&connection=${connection_id}`;

// Call openAuthSessionAsync with the url and redirect from above, and save the returned object to a variable
const result = await WebBrowser.openAuthSessionAsync(url, redirect);

// Pull the code returned in the result stored as a param in the url field. In this case, we are using a regular expression pattern to pull it from the url.
const codeRegex = /code=([^&]+)/;
const matches = result.url.match(codeRegex);
const code = matches ? matches[1] : null;
```

## (4) Exchange OAuth Code for User Profile and Token

Once the above is in place, you will ultimately have a code which you can then exchange in one more API call for the user profile of the authenticating user. You'll be making a POST request to Get a Profile and Token with the token, as shown here using Axios:

```js title="Exchange OAuth Code for Profile and Token"
// Use the profile returned in response.data as you need!
axios({
  method: 'post',
  url: `https://api.workos.com/sso/token?client_id=${client_id}&client_secret=${apiKey}&grant_type=authorization_code&code=${code}`,
}).then((response) => {});
```

From the end user's side, they will be sent to the native UI of their Identity Provider in their mobile browser. After they authenticate with their credentials, they will be dropped back into the native application, ready to go.

***

## Conclusion

That's all there is to it! By combining WorkOS SSO with React Native Expo AuthSession, adding Single Sign-On to your Expo app is a total breeze with minimal code needed.

To test the React Native Expo flow for yourself, head over to the GitHub repository of [our example React Native Expo application](https://github.com/workos/expo-authkit-example) and give it a whirl for yourself!
