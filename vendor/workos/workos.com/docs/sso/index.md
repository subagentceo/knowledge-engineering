# Single Sign-On

## Choose your integration approach

There are two ways to integrate Single Sign-On (SSO) with WorkOS:

### (A) With the standalone SSO API

The standalone API (covered in this document), is a standalone API for integrating into an existing auth stack.

### (B) Using WorkOS AuthKit

[AuthKit](https://workos.com/docs/authkit) is a complete authentication platform which includes SSO out of the box.

## How Single Sign-On works

Single Sign-On is the most frequently asked for requirement by organizations looking to adopt new SaaS applications. SSO enables authentication via an organization’s [identity provider (IdP)](https://workos.com/docs/glossary/idp).

This service is compatible with any IdP that supports either the [SAML](https://workos.com/docs/glossary/saml) or [OIDC](https://workos.com/docs/glossary/oidc) protocols. It’s modeled to meet the [OAuth 2.0](https://workos.com/docs/glossary/oauth-2-0) framework specification, abstracting away the underlying authentication handshakes between different IdPs.

![Authentication Flow Diagram](https://images.workoscdn.com/images/90b84f08-3363-446a-8610-f7b2bd2ee2ca.png?auto=format\&fit=clip\&q=80)\[border=false]

WorkOS SSO API acts as authentication middleware and intentionally does not handle user database management for your application.

## What you’ll build

In this guide, we’ll take you from learning about Single Sign-On and POC-ing all the way through to authenticating your first user via the WorkOS SSO API.

## Before getting started

To get the most out of this guide, you’ll need:

- A [WorkOS account](https://dashboard.workos.com/)
- A local app to integrate SSO with.

Reference these [example apps](https://workos.com/docs/sso/example-apps) as you follow this guide.

## API object definitions

[Connection](https://workos.com/docs/reference/sso/connection)
: The method by which a group of users (typically in a single organization) sign in to your application.

[Profile](https://workos.com/docs/reference/sso/profile)
: Represents an authenticated user. The Profile object contains information relevant to a user in the form of normalized and raw attributes.

## (1) Add SSO to your app

Let’s build the SSO authentication workflow into your app.

### Install the WorkOS SDK

WorkOS offers native SDKs in several popular programming languages. Choose a language below to see instructions in your application’s language.

### Set secrets

To make calls to WorkOS, provide the API key and, in some cases, the client ID. Store these values as managed secrets, such as `WORKOS_API_KEY` and `WORKOS_CLIENT_ID`, and pass them to the SDKs either as environment variables or directly in your app’s configuration based on your preferences.

```plain title="Environment variables"
WORKOS_API_KEY='sk_example_123456789'
WORKOS_CLIENT_ID='client_123456789'
```

> The code examples use your staging API keys when [signed in](https://dashboard.workos.com)

### Add an endpoint to initiate SSO

The endpoint to initiate SSO via the WorkOS API is responsible for handing off the rest of the authentication workflow to WorkOS. There are a couple configuration options shown below.

You can use the optional `state` parameter to encode arbitrary information to help restore application state between redirects.

- | Using organization ID

  Use the organization parameter when authenticating a user by their specific organization. This is the preferred parameter for SAML and OIDC connections.

  The example below uses the Test Organization that is available in your staging environment and uses a mock identity provider. It’s created to help you test your SSO integration without having to go through the process of setting up an account with a real identity provider.

  #### Authentication Endpoint

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

  	// Use the Test Organization ID to get started. Replace it with
  	// the user’s real organization ID when you finish the integration.
  	orgID := "org_test_idp"

  	// The callback URI WorkOS should redirect to after the authentication
  	redirectURI := "https://dashboard.my-app.com"

  	http.Handle("/auth", sso.Login(sso.GetAuthorizationURLOpts{
  		Organization: orgID,
  		RedirectURI:  redirectURI,
  	}))
  }
  ```

  ```php
  <?php

  require __DIR__ . "/vendor/autoload.php";

  $sso = new WorkOS\SSO();

  switch (strtok($_SERVER["REQUEST_URI"], "?")) {
      case "/auth":
          // Use the Test Organization ID to get started. Replace it with
          // the user’s real organization ID when you finish the integration.
          $organization = "org_test_idp";

          // The callback URI WorkOS should redirect to after the authentication
          $redirectUri = "https://dashboard.my-app.com/";

          $authorizationUrl = $sso->getAuthorizationUrl(
              organization: $organization,
              redirectUri: $redirectUri
          );

          header("Location: $authorizationUrl", true, 302);
          return true;
  }
  ```

  ```php
  <?php

  use Illuminate\Support\Facades\Route;

  $sso = new WorkOS\SSO();

  Route::get("/auth", function () {
      // Use the Test Organization ID to get started. Replace it with
      // the user’s real organization ID when you finish the integration.
      $organization = "org_test_idp";

      // The callback URI WorkOS should redirect to after the authentication
      $redirectUri = "https://dashboard.my-app.com/";

      $authorizationUrl = $sso->getAuthorizationUrl(
          organization: $organization,
          redirectUri: $redirectUri
      );

      return redirect($authorizationUrl);
  });
  ```

  ```java
  import com.workos.WorkOS;
  import io.javalin.Javalin;
  import java.util.Map;

  public class Application {
    public static void main(String[] args) {
      Map<String, String> env = System.getenv();
      Javalin app = Javalin.create().start(7001);
      WorkOS workos = new WorkOS(env.get("WORKOS_API_KEY"));
      String clientId = env.get("WORKOS_CLIENT_ID");

      // Use the Test Organization ID to get started. Replace it with
      // the user’s real organization ID when you finish the integration.
      String organization = "org_test_idp";

      // The callback URI WorkOS should redirect to after the authentication
      String redirectUri = "https://dashboard.my-app.com";

      app.get("/auth", ctx -> {
        String url = workos.sso.getAuthorizationUrl(clientId, redirectUri)
                         .organization(organization)
                         .build();

        ctx.redirect(url);
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
      public class AuthController : Controller
      {
          [HttpGet("auth")]
          public IActionResult Index()
          {
              var ssoService = new SSOService();
              string clientId = Environment.GetEnvironmentVariable("WORKOS_CLIENT_ID");

              // Use the Test Organization ID to get started. Replace it with
              // the user’s real organization ID when you finish the integration.
              string organization = "org_test_idp";

              // The callback URI WorkOS should redirect to after the authentication.
              string redirectUri = "https://dashboard.my-app.com";

              var options = new GetAuthorizationURLOptions {
                  ClientId = clientId,
                  Organization = organization,
                  RedirectURI = redirectUri,
              };

              var url = ssoService.GetAuthorizationURL(options);

              return Redirect(url);
          }
      }
  }
  ```

- | Using connection ID

  You can also use the connection parameter for SAML or OIDC connections when authenticating a user by their connection ID.

  #### Authentication Endpoint

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

  	// A WorkOS Connection ID
  	connectionID := "connection_123"

  	// The callback URI WorkOS should redirect to after the authentication
  	redirectURI := "https://dashboard.my-app.com"

  	http.Handle("/auth", sso.Login(sso.GetAuthorizationURLOpts{
  		Connection:  connectionID,
  		RedirectURI: redirectURI,
  	}))
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
  import io.javalin.Javalin;
  import java.util.Map;

  public class Application {
    public static void main(String[] args) {
      Map<String, String> env = System.getenv();
      Javalin app = Javalin.create().start(7001);
      WorkOS workos = new WorkOS(env.get("WORKOS_API_KEY"));
      String clientId = env.get("WORKOS_CLIENT_ID");

      // A WorkOS Connection ID
      String connectionId = "connection_123";

      // The callback URI WorkOS should redirect to after authenticating
      String redirectUri = "https://dashboard.my-app.com";

      app.get("/auth", ctx -> {
        String url = workos.sso.getAuthorizationUrl(clientId, redirectUri)
                         .connection(connectionId)
                         .build();

        ctx.redirect(url);
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
      public class AuthController : Controller
      {
          [HttpGet("auth")]
          public IActionResult Index()
          {
              var ssoService = new SSOService();
              string clientId = Environment.GetEnvironmentVariable("WORKOS_CLIENT_ID");

              // A WorkOS Connection ID
              string connection = "connection_123";

              // The callback URI WorkOS should redirect to after the authentication
              string redirectUri = "https://dashboard.my-app.com";

              var options = new GetAuthorizationURLOptions {
                  ClientId = clientId,
                  Connection = connection,
                  RedirectURI = redirectUri,
              };

              var url = ssoService.GetAuthorizationURL(options);

              return Redirect(url);
          }
      }
  }
  ```

- | Using provider

  The provider parameter is used for OAuth connections which are configured at the environment level.

  > The supported `provider` values are `GoogleOAuth`, `MicrosoftOAuth`, `GitHubOAuth`, and `AppleOAuth`.

  #### Authentication Endpoint

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

  	// The provider to authenticate with
  	provider := "GoogleOAuth"

  	// The callback URI WorkOS should redirect to after the authentication
  	redirectURI := "https://dashboard.my-app.com"

  	http.Handle("/auth", sso.Login(sso.GetAuthorizationURLOpts{
  		Provider:    provider,
  		RedirectURI: redirectURI,
  	}))
  }
  ```

  ```php
  <?php

  require __DIR__ . "/vendor/autoload.php";

  switch (strtok($_SERVER["REQUEST_URI"], "?")) {
      case "/auth":
          // The provider to authenticate with
          $provider = "GoogleOAuth";

          // The callback URI WorkOS should redirect to after the authentication
          $redirectUri = "https://dashboard.my-app.com/";

          $authorizationUrl = $sso->getAuthorizationUrl(
              provider: $provider,
              redirectUri: $redirectUri
          );

          header("Location: $authorizationUrl", true, 302);
          return true;
  }
  ```

  ```php
  <?php

  use Illuminate\Support\Facades\Route;

  $sso = new WorkOS\SSO();

  Route::get("/auth", function () {
      // The provider to authenticate with
      $provider = "GoogleOAuth";

      // The callback URI WorkOS should redirect to after the authentication
      $redirectUri = "https://dashboard.my-app.com/";

      $authorizationUrl = $sso->getAuthorizationUrl(
          provider: $provider,
          redirectUri: $redirectUri
      );

      return redirect($authorizationUrl);
  });
  ```

  ```java
  import com.workos.WorkOS;
  import io.javalin.Javalin;
  import java.util.Map;

  public class Application {
    public static void main(String[] args) {
      Map<String, String> env = System.getenv();
      Javalin app = Javalin.create().start(7001);
      WorkOS workos = new WorkOS(env.get("WORKOS_API_KEY"));
      String clientId = env.get("WORKOS_CLIENT_ID");

      // The provider to authenticate with
      String provider = "GoogleOAuth";

      // The callback URI WorkOS should redirect to after the authentication
      String redirectUri = "https://dashboard.my-app.com";

      app.get("/auth", ctx -> {
        String url = workos.sso.getAuthorizationUrl(clientId, redirectUri)
                         .provider(provider)
                         .build();

        ctx.redirect(url);
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
      public class AuthController : Controller
      {
          [HttpGet("auth")]
          public IActionResult Index()
          {
              var ssoService = new SSOService();
              string clientId = Environment.GetEnvironmentVariable("WORKOS_CLIENT_ID");

              // The provider to authenticate with
              string provider = "GoogleOAuth";

              // The callback URI WorkOS should redirect to after the authentication
              string redirectUri = "https://dashboard.my-app.com";

              var options = new GetAuthorizationURLOptions {
                  ClientId = clientId,
                  Provider = provider,
                  RedirectURI = redirectUri,
              };

              var url = ssoService.GetAuthorizationURL(options);

              return Redirect(url);
          }
      }
  }
  ```

If there is an issue generating an authorization URL, WorkOS will return the redirect URI as is. Read the [API Reference](https://workos.com/docs/reference/sso/get-authorization-url) for more details.

### Add a callback endpoint

Next, let’s add the redirect endpoint which will handle the callback from WorkOS after a user has authenticated with their identity provider. This endpoint should exchange the authorization code returned by WorkOS with the authenticated user’s profile. The authorization code is valid for 10 minutes.

#### Callback Endpoint

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
		opts := sso.GetProfileAndTokenOpts{
			Code: r.URL.Query().Get("code"),
		}

		profileAndToken, err := sso.GetProfileAndToken(r.Context(), opts)

		if err != nil {
			// Handle the error...
		}

		profile := profileAndToken.Profile

		// Use the Test Organization ID to get started. Replace it with
		// the user’s real organization ID when you finish the integration.
		orgID := "org_test_idp"

		// Validate that this profile belongs to the organization used for authentication
		if profile.OrganizationId != orgID {
			http.Error(w, "Unauthorized", http.StatusForbidden)
		}

		// Use the information in `profile` for further business logic.

		http.Redirect(w, r, "/", http.StatusSeeOther)
	})
}
```

```php
<?php

require __DIR__ . "/vendor/autoload.php";

WorkOS\WorkOS::setApiKey("sk_example_123456789");
WorkOS\WorkOS::setClientId("client_123456789");

$sso = new WorkOS\SSO();

switch (strtok($_SERVER["REQUEST_URI"], "?")) {
    case "/callback":
        $code = $_GET["code"];
        $profileAndToken = $sso->getProfileAndToken($code);

        $profile = $profileAndToken->profile;

        // Use the Test Organization ID to get started. Replace it with
        // the user’s real organization ID when you finish the integration.
        $organization = "org_test_idp";

        // Validate that this profile belongs to the organization used for authentication
        if ($profile->organization_id != $organization) {
            http_response_code(401);
            echo json_encode(["message" => "Unauthorized"]);
            return;
        }

        // Use the information in `profile` for further business logic.

        header("Location: /", true, 302);
        return true;
}
```

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

WorkOS\WorkOS::setApiKey("sk_example_123456789");
WorkOS\WorkOS::setClientId("client_123456789");

$sso = new WorkOS\SSO();

Route::get("/callback", function (Request $request) {
    $code = $request->input("code");
    $profileAndToken = $sso->getProfileAndToken($code);

    $profile = $profileAndToken->profile;

    // Use the Test Organization ID to get started. Replace it with
    // the user’s real organization ID when you finish the integration.
    $organization = "org_test_idp";

    // Validate that this profile belongs to the organization used for authentication
    if ($profile->organization_id != $organization) {
        return Response::json(
            [
                "message" => "Unauthorized",
            ],
            401
        );
    }

    // Use the information in `profile` for further business logic.

    return redirect("/");
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
      String code = ctx.queryParam("code");
      ProfileAndToken profileAndToken = workos.sso.getProfileAndToken(code, clientId);

      Profile profile = profileAndToken.profile;

      // Use the Test Organization ID to get started. Replace it with
      // the user’s real organization ID when you finish the integration.
      String organization = "org_test_idp";

      // Validate that this profile belongs to the organization used for authentication
      if (profile.organizationId != organization) {
        ctx.json("Unauthorized").status(401)
      }

      // Use the information in `profile` for further business logic.

      ctx.redirect("/");
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
        public async Task<IActionResult> Index([FromQuery(Name = "code")] string code)
        {
            var ssoService = new SSOService();
            string clientId = Environment.GetEnvironmentVariable("WORKOS_CLIENT_ID");

            var options = new GetProfileAndTokenOptions {
                ClientId = clientId,
                Code = code,
            };

            var profileAndToken = await ssoService.GetProfileAndToken(options);

            var profile = profileAndToken.Profile;

            // Use the Test Organization ID to get started. Replace it with
            // the user’s real organization ID when you finish the integration.
            string organization = "org_test_idp";

            // Validate that this profile belongs to the organization used for authentication
            if (profile.OrganizationId != organization)
            {
                var resp = new HttpResponseMessage(
                    HttpStatusCode.Unauthorized) { Content = new StringContent("Unauthorized") };
                throw new HttpResponseException(resp);
            }

            // Use the information in `profile` for further business logic.

            return Redirect("/");
        }
    }
}
```

When adding your callback endpoint, it is important to always validate the returned profile’s organization ID. It’s unsafe to validate using email domains as organizations might allow email addresses from outside their corporate domain (e.g. for guest users).

***

## (2) Configure a redirect URI

In the [Applications](https://dashboard.workos.com/environment/applications) section of the WorkOS Dashboard, open your application and go to the **Redirects** tab to configure allowed redirect URIs. Add your callback endpoint from the previous section.

Multi-tenant apps will typically have a single redirect URI specified. You can set multiple redirect URIs for single-tenant apps. You’ll need to be sure to specify which redirect URI to use in the WorkOS client call to fetch the authorization URL.

> More information about wildcard characters support can be found in the [Redirect URIs](https://workos.com/docs/sso/redirect-uris/wildcard-characters) guide.

![Redirects in the Dashboard](https://images.workoscdn.com/images/195dbff3-adbf-4010-b07c-ffc73ceeca68.png?auto=format\&fit=clip\&q=90)

### Identity provider-initiated SSO

Normally, the default redirect URI you configure for your application is going to be used for all identity provider-initiated SSO sessions. This is because the WorkOS client is not used to initiate the authentication flow.

However, your customer can specify a separate redirect URI to be used for all their IdP-initiated sessions as a `RelayState` parameter in the SAML settings on their side.

Learn more about configuring IdP-initiated SSO in the [Login Flows](https://workos.com/docs/sso/login-flows/idp-initiated-sso/configure-idp-initiated-sso) guide.

***

## (3) Test end-to-end

If you followed this guide, you used the Test Organization available in your staging environment to initiate SSO. With that, you can already test your integration end-to-end.

![Test SSO WorkOS Dashboard](https://images.workoscdn.com/images/7b7407d7-dcc7-4fd4-859f-4ee4214d69c2.png?auto=format\&fit=clip\&q=80)

Head to the *Test SSO* page in the [WorkOS Dashboard](https://dashboard.workos.com/) to get started with testing common login flows, or read on about that in detail in the next guide.
