# Session helpers

After authenticating and [storing the encrypted session as a cookie](https://workos.com/docs/authkit/vanilla/nodejs/3-handle-the-user-session/save-the-encrypted-session), retrieving and decrypting the session is made easy via the session helper methods.

## Authenticate

Unseals the session data and checks if the session is still valid.

#### Authenticate

## Get log out URL

End a user's session. The user's browser should be redirected to this URL. Functionally similar to [Get logout URL](https://workos.com/docs/reference/authkit/logout/get-logout-url) but extracts the session ID automatically from the session data.

#### Get log out URL

## Load sealed session

Load the session by providing the sealed session and the cookie password.

#### Load sealed session

## Refresh

Refreshes the user's session with the refresh token. Passing in a new organization ID will switch the user to that organization.

#### Refresh