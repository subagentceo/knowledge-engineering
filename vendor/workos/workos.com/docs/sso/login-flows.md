# Login Flows

The instructions in the [Quick Start guide](https://workos.com/docs/sso) focus on setting up Service Provider (SP)-initiated SSO. In these scenarios, when a user attempts to login, they navigate to an application (a service provider) and are then redirected to the [Identity Provider (IdP)](https://workos.com/docs/glossary/idp) for authentication, via the WorkOS API.

Alternatively, most users are able to start the process from the Identity Provider itself. Organizations will often provide an IdP dashboard where employees can select any of the eligible applications that they can access via the IdP, similar to the screenshot below. Clicking on a tile results in an IdP-initiated login flow, since the user initiates the login from the Identity Provider, not the application.

![Screenshot of the Okta dashboard](https://images.workoscdn.com/images/1489f46f-bbcd-4e47-a217-3a45f0f795aa.png?auto=format\&fit=clip\&q=50)

***

## SP-initiated SSO

With an SP-initiated login flow, the user begins the authentication process from your application. You can control where the user will be redirected after login by specifying the `redirectURI` parameter when making the [Get Authorization URL](https://workos.com/docs/reference/sso/get-authorization-url) call. Additionally, this call can take an optional `state` parameter - this parameter will be returned in the callback after authentication, where your application can use it to verify the validity of the response or to pass any state from the originating session. One common practice is to route requests from different Organizations to a single Redirect URI, but instead utilize the `state` parameter to deep link users into the application after the authentication is completed.

#### Get Authorization URL Call

```js
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

const authorizationUrl = workos.sso.getAuthorizationUrl({
  clientId,
  connection: 'connection_123',
  redirectUri: 'https://your-app.com/callback',
  state: 'dj1kUXc0dzlXZ1hjUQ==',
});
```

```rb
require "workos"

CLIENT_ID = ENV["WORKOS_CLIENT_ID"]

authorization_url = WorkOS::SSO.authorization_url(
  client_id: CLIENT_ID,
  connection: "connection_123",
  redirect_uri: "https://your-app.com/callback",
  state: "dj1kUXc0dzlXZ1hjUQ=="
)
```

```py
from workos import WorkOSClient

workos_client = WorkOSClient(
    api_key="sk_example_123456789", client_id="client_123456789"
)

authorization_url = workos_client.sso.get_authorization_url(
    connection_id="connection_123",
    redirect_uri="https://your-app.com/callback",
    state="dj1kUXc0dzlXZ1hjUQ==",
)
```

```go
package main

import (
	"os"

	"github.com/workos/workos-go/v3/pkg/sso"
)

func main() {
	apiKey := os.Getenv("WORKOS_API_KEY")
	clientID := os.Getenv("WORKOS_CLIENT_ID")

	sso.Configure(apiKey, clientID)

	url := sso.GetAuthorizationURLOpts{
		Connection:  "connection_123",
		RedirectURI: "https://your-app.com/callback",
		State:       "dj1kUXc0dzlXZ1hjUQ==",
	}
}
```

```php
<?php

WorkOS\WorkOS::setApiKey("sk_example_123456789");
WorkOS\WorkOS::setClientId("client_123456789");

$sso = new WorkOS\SSO();

$authorizationUrl = $sso->getAuthorizationUrl(
    redirectUri: "https://your-app.com/callback",
    state: "dj1kUXc0dzlXZ1hjUQ==",
    connection: "conn_01E4ZCR3C56J083X43JQXF3JK5"
);
```

```php
<?php

WorkOS\WorkOS::setApiKey("sk_example_123456789");
WorkOS\WorkOS::setClientId("client_123456789");

$sso = new WorkOS\SSO();

$authorizationUrl = $sso->getAuthorizationUrl(
    redirectUri: "https://your-app.com/callback",
    state: "dj1kUXc0dzlXZ1hjUQ==",
    connection: "conn_01E4ZCR3C56J083X43JQXF3JK5"
);
```

```java
import com.workos.WorkOS;
import java.util.Map;

Map<String, String> env = System.getenv();
WorkOS workos = new WorkOS(env.get("WORKOS_API_KEY"));
String clientId = env.get("WORKOS_CLIENT_ID");
String connectionId = "connection_123";
String redirectUri = "https://your-app.com/callback";
String state = "dj1kUXc0dzlXZ1hjUQ==";

String url = workos.sso.getAuthorizationUrl(clientId, redirectUri, state)
                 .connection(connectionId)
                 .build();
```

```cs
using WorkOS;

var ssoService = new SSOService();
string clientId = Environment.GetEnvironmentVariable("WORKOS_CLIENT_ID");

var options = new GetAuthorizationURLOptions {
    ClientId = clientId,
    Connection = "connection_123",
    RedirectURI = "https://your-app.com/callback",
    State = "dj1kUXc0dzlXZ1hjUQ==",
};

var url = ssoService.GetAuthorizationURL(options);
```

***

## IdP-initiated SSO

If you follow the instructions in the [Quick Start guide](https://workos.com/docs/sso), IdP-initiated login flows will automatically be available, and users will be able to find a tile for your application within their IdP, similar to the screenshot above. Clicking on the tile will send an IdP-initiated SSO response to your application's callback endpoint.

### Configure IdP-initiated SSO

Normally, IdP-initiated logins are sent to the default Redirect URI of your default application. To customize this, configure a `RelayState` in the IdP as URL parameters. Two parameters are supported:

- `client_id` routes the user to a specific [application](https://workos.com/docs/authkit/applications)

  ```text
  client_id=client_123456789
  ```

- `redirect_uri` sends the user to an alternate Redirect URI from those configured in the [Applications](https://dashboard.workos.com/environment/applications) section of the WorkOS Dashboard. Open your application and go to the **Redirects** tab to manage these URIs.

  ```text
  redirect_uri=https://example.com/callback
  ```

Any other values in the `RelayState` are ignored.

Your application will also be able to retrieve the [Profile object](https://workos.com/docs/reference/sso/profile) for the user upon successful authentication. If your IdP is unable to provide a `redirect_uri` in its default `RelayState`, or if you would like to generate a custom redirect URI for each user after they sign in, you can use the [Profile object](https://workos.com/docs/reference/sso/profile) to dynamically generate a redirect URI.

```json title="Example Profile"
{
  "id": "prof_01DMC79VCBZ0NY2099737PSVF1",
  "connection_id": "conn_01E4ZCR3C56J083X43JQXF3JK5",
  "connection_type": "okta",
  "email": "todd@example.com",
  "first_name": "Todd",
  "idp_id": "00u1a0ufowBJlzPlk357",
  "last_name": "Rundgren",
  "object": "profile",
  "custom_attributes": {}
}
```

The Profile object includes the `connection_id` which identifies the connection that the profile is associated with in WorkOS. We recommend using the connection information for routing requests in an IdP-Initiated flow.

### Disable IdP-initiated SSO (Beta)

We have recently added Beta support for fully disabling IdP-initiated SSO logins for a connection. Once disabled, any attempted IdP-initiated requests will fail with an `idp_initiated_sso_disabled` error.

> Disabling IdP-initiated SSO is currently in invite-only beta, please reach out to [WorkOS support](mailto:support@workos.com) if you’d like to use it or learn more about it.

For applications that need to support IdP-initiated workflows, but would like to mitigate the security risks of unsolicited SAML responses, WorkOS recommends the following:

- Disable IdP-initiated SSO for your connection.
- Adjust your callback method to capture the `idp_initiated_sso_disabled` error.
- Start a new SP-initiated request from the callback when the error is detected.

The error callback will include the connection and organization ID’s, which can be used to request a new authorization URL for the SP-initiated request. The new request will generally be transparent to the user, as they are already logged in to the Identity Provider.

#### Callback Endpoint with IdP-Initiated error support

```go
package main

import (
	"net/http"
	"os"

	"github.com/workos/workos-go/v3/pkg/sso"
)

func main() {
	apiKey := os.Getenv("WORKOS_API_KEY")
	clientID := os.Getenv("WORKOS_CLIENT_ID")

	sso.Configure(apiKey, clientID)

	http.HandleFunc("/callback", func(w http.ResponseWriter, r *http.Request) {
		error := r.URL.Query().Get("error")
		if error == "idp_initiated_sso_disabled" {
			// A WorkOS Connection ID
			connectionID := r.URL.Query().Get("connection_id")

			// The callback URI WorkOS should redirect to after the authentication
			redirectURI := "https://dashboard.my-app.com/"

			// The state parameter can be used to encode the current state of your app
			state := "dj1kUXc0dzlXZ1hjUQ=="

			sso.Login(sso.GetAuthorizationURLOpts{
				Connection:  connectionID,
				RedirectURI: redirectURI,
				State:       state,
			})
		} else if !error {
			profileAndToken, err := sso.GetProfileAndToken(r.Context(), sso.GetProfileAndTokenOpts{
				Code: r.URL.Query().Get("code"),
			})

			if err != nil {
				// Handle the error...
			}

			// Use the information in `profile` for further business logic.
			profile := profileAndToken.Profile
			http.Redirect(w, r, "/", http.StatusSeeOther)
		}
	})
}
```

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$sso = new WorkOS\SSO();

switch (strtok($_SERVER["REQUEST_URI"], "?")) {
    case "/auth":
        // A WorkOS Connection ID
        $connection = "connection_123";

        // The callback URI WorkOS should redirect to after the authentication
        $redirectUri = "https://dashboard.my-app.com/";

        $authorizationUrl = $sso->getAuthorizationUrl(
            connection: $connection,
            redirectUri: $redirectUri
        );

        header("Location: $authorizationUrl", true, 302);
        return true;
}
```

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get("/auth", function () {
    // A WorkOS Connection ID
    $connection = "connection_123";

    // The callback URI WorkOS should redirect to after the authentication
    $redirectUri = "https://dashboard.my-app.com/";

    $authorizationUrl = $sso->getAuthorizationUrl(
        redirectUri: $redirectUri,
        connection: $connection
    );

    return redirect($authorizationUrl);
});
```

```java
import com.workos.WorkOS;
import com.workos.sso.models.Profile;
import com.workos.sso.models.ProfileAndToken;
import io.javalin.Javalin;
import java.util.Map;

public class Application {
  public static void main(String[] args) {
    Map<String, String> env = System.getenv();
    Javalin app = Javalin.create().start(7001);
    WorkOS workos = new WorkOS(env.get("WORKOS_API_KEY"));
    String clientId = env.get("WORKOS_CLIENT_ID");

    app.get("/callback", ctx -> {
      String error = ctx.queryParam("error");
      if (error == "idp_initiated_sso_disabled") {
        // A WorkOS Connection ID
        String connectionId = ctx.queryParam("connection_id");

        // The callback URI WorkOS should redirect to after the authentication
        String redirectUri = "uri";

        // The state parameter can be used to encode the current state of your app
        String state = "state";

        String url = workos.sso.getAuthorizationUrl(clientId, redirectUri, state)
                         .connection(connectionId)
                         .build();
        ctx.redirect(url);
      } else if (error == null) {
        String code = ctx.queryParam("code");
        ProfileAndToken profileAndToken = workos.sso.getProfileAndToken(code, clientId);
        Profile profile = profileAndToken.profile;
        // Use the information in `profile` for further business logic.
        ctx.redirect("/");
      }
    });
  }
}
```

```cs
using System;
using Microsoft.AspNetCore.Mvc;
using WorkOS;

namespace MyApplication.Controllers
{
    public class CallbackController : Controller
    {
        [HttpGet("callback")]
        public async Task<IActionResult> Index([FromQuery(Name = "code")] string code,
                                               [FromQuery(Name = "error")] string error,
                                               [FromQuery(Name = "connection_id")] string connection_id)
        {
            var ssoService = new SSOService();
            string clientId = Environment.GetEnvironmentVariable("WORKOS_CLIENT_ID");

            if (error == "idp_initiated_sso_disabled")
            {
                string connection = connection_id;

                // The callback URI WorkOS should redirect to after the authentication
                string redirectUri = "https://dashboard.my-app.com/";

                // The state parameter can be used to encode the current state of your app
                string state = "dj1kUXc0dzlXZ1hjUQ==";

                var options = new GetAuthorizationURLOptions {
                    ClientId = clientId,
                    Connection = connection,
                    RedirectURI = redirectUri,
                    State = state,
                };

                var url = ssoService.GetAuthorizationURL(options);

                return Redirect(url);
            }
            else if (error == null)
            {
                var options = new GetProfileAndTokenOptions {
                    ClientId = clientId,
                    Code = code,
                };

                var profileAndToken = await ssoService.GetProfileAndToken(options);

                // Use the information in `profile` for further business logic.
                var profile = profileAndToken.Profile;
                return Redirect("/");
            }
        }
    }
}
```

## Implementing SSO with WorkOS

This document offers guidance to integrate Single Sign-On with our standalone API into your existing auth stack. You might also want to look at [AuthKit](https://workos.com/docs/authkit), a complete authentication platform that leverages Single Sign-On functionality out of the box, following best practices.
