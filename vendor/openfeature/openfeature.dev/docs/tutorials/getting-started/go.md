-   [](/)
-   [Getting Started](/docs/category/getting-started)
-   Go SDK and Go Gin

On this page

# Getting Started with the OpenFeature Go SDK and Go Gin

## Introduction[​](#introduction "Direct link to Introduction")

This walk-through teaches you the basics of using OpenFeature in Go in the context of a Go Gin web application.

You'll learn how to:

-   Integrate the OpenFeature Go SDK
-   Install and configure the OpenFeature provider
-   Perform basic feature flagging

## Requirements[​](#requirements "Direct link to Requirements")

## Walk-through[​](#walk-through "Direct link to Walk-through")

This walk-through assumes that:

-   You have a basic knowledge of Go
-   You have Go 1.17 or later
-   You have Docker installed and running on the host system

### Step 1: Create a new Go project[​](#step-1-create-a-new-go-project "Direct link to Step 1: Create a new Go project")

To get started, let's create a new folder and initialize the project. This can be done by running following commands.

```
mkdir gostartcd gostartgo mod init gostart
```

### Step 2: Set up the application[​](#step-2-set-up-the-application "Direct link to Step 2: Set up the application")

Let's initialize the application with logic to expose a minimal Go Gin web endpoint.

First, create the file `main.go` and include the following code.

```
package mainimport (    "github.com/gin-gonic/gin"    "net/http")const defaultMessage = "Hello!"func main() {    // Initialize Go Gin    engine := gin.Default()    // Setup a simple endpoint    engine.GET("/hello", func(c *gin.Context) {        c.JSON(http.StatusOK, defaultMessage)    })    engine.Run()}
```

To add Go Gin dependency to the application, run the following commands.

```
go get github.com/gin-gonic/gingo mod tidy
```

### Step 3: Add the OpenFeature SDK[​](#step-3-add-the-openfeature-sdk "Direct link to Step 3: Add the OpenFeature SDK")

Next, let's add logic to customize the response message based on the `boolean` [flag key](/specification/glossary#flag-key) `welcome-message`.

```
package mainimport (       "context"       "github.com/gin-gonic/gin"       "github.com/open-feature/go-sdk/openfeature"       "net/http")const defaultMessage = "Hello!"const newWelcomeMessage = "Hello, welcome to this OpenFeature-enabled website!"func main() {       // Initialize OpenFeature client       client := openfeature.NewClient("GoStartApp")       // Initialize Go Gin       engine := gin.Default()       // Setup a simple endpoint       engine.GET("/hello", func(c *gin.Context) {               c.JSON(http.StatusOK, defaultMessage)               // Evaluate welcome-message feature flag               welcomeMessage, _ := client.BooleanValue(                       context.Background(), "welcome-message", false, openfeature.EvaluationContext{},               )               if welcomeMessage {                       c.JSON(http.StatusOK, newWelcomeMessage)                       return               } else {                       c.JSON(http.StatusOK, defaultMessage)                       return               }       })       engine.Run()}
```

To add OpenFeature SDK dependency to the application, run the following commands.

```
go get github.com/open-feature/go-sdk/openfeaturego mod tidy
```

### Step 4: Run the initial application[​](#step-4-run-the-initial-application "Direct link to Step 4: Run the initial application")

Let's start the application and see it in action.

```
go run main.go
```

Now you can visit the url [http://localhost:8080/hello](http://localhost:8080/hello) and observe the message **Hello!**.

"Why I'm I seeing that value?", you may ask. Well, it's because a provider hasn't been configured yet. Without a provider to actually evaluate flags, OpenFeature will return the default value. In the next step, you'll learn how to add a provider.

### Step 5: Configure a provider (flagd)[​](#step-5-configure-a-provider-flagd "Direct link to Step 5: Configure a provider (flagd)")

Providers are an important concept in OpenFeature because they are responsible for the flag evaluation itself. As we saw in the previous step, OpenFeature without a provider always returns the default value. If we want to actually perform feature flagging, we'll need to register a provider.

Create a new file named `flags.flagd.json` and add the following JSON. Notice that there's a flag called `welcome-message` which matches the flag key referenced earlier. The `welcome-message` flag has `on` and `off` variants that return `true` and `false` respectively. The state property controls whether the feature flag is active or not. Finally, the defaultVariant property controls the variant that should be returned. In this case, the defaultVariant is `off`, therefore the value `false` would be returned.

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"    }  }}
```

> NOTE: This configuration is specific for flagd and varies across providers.

With the flagd configuration in place, start flagd service with the following docker command.

> NOTE: On Windows WSL is required both for running docker and to store the file. This is a limitation of Docker ([https://github.com/docker/for-win/issues/8479](https://github.com/docker/for-win/issues/8479))

```
docker run -p 8013:8013 -v $(pwd)/:/etc/flagd/ -it ghcr.io/open-feature/flagd:latest start --uri file:/etc/flagd/flags.flagd.json
```

Now, let's make the required code changes in our application.

```
import (       "context"       "github.com/gin-gonic/gin"       flagd "github.com/open-feature/go-sdk-contrib/providers/flagd/pkg"       "log"       "github.com/open-feature/go-sdk/openfeature"       "net/http")func main() {       // Use flagd as the OpenFeature provider       provider, err := flagd.NewProvider()       if err != nil {           log.Fatalf("failed to initialize flagd provider: %v", err)       }       if err := openfeature.SetProviderAndWait(provider); err != nil {           // If a provider initialization error occurs, log it and exit           log.Fatalf("Failed to set the OpenFeature provider: %v", err)       }       // Initialize OpenFeature client       client := openfeature.NewClient("GoStartApp")
```

Then, let's add `flagd provider` dependency with following commands.

```
go get github.com/open-feature/go-sdk-contrib/providers/flagdgo mod tidy
```

The complete `main.go` file is given below:

```
package mainimport (    "context"    "log"    "net/http"    "github.com/gin-gonic/gin"    flagd "github.com/open-feature/go-sdk-contrib/providers/flagd/pkg"    "github.com/open-feature/go-sdk/openfeature")const defaultMessage = "Hello!"const newWelcomeMessage = "Hello, welcome to this OpenFeature-enabled website!"func main() {    // Use flagd as the OpenFeature provider    provider, err := flagd.NewProvider()    if err != nil {        log.Fatalf("failed to initialize flagd provider: %v", err)    }    if err := openfeature.SetProviderAndWait(provider); err != nil {        // If an error occurs, log it and exit        log.Fatalf("Failed to set the OpenFeature provider: %v", err)    }    // Initialize OpenFeature client    client := openfeature.NewClient("GoStartApp")    // Initialize Go Gin    engine := gin.Default()    // Setup a simple endpoint    engine.GET("/hello", func(c *gin.Context) {        // Evaluate welcome-message feature flag        welcomeMessage, _ := client.BooleanValue(            context.Background(), "welcome-message", false, openfeature.EvaluationContext{},        )        if welcomeMessage {            c.JSON(http.StatusOK, newWelcomeMessage)            return        } else {            c.JSON(http.StatusOK, defaultMessage)            return        }    })    engine.Run()}
```

### Step 6: Rerun the application[​](#step-6-rerun-the-application "Direct link to Step 6: Rerun the application")

Let's rerun the application with the following command.

```
go run main.go
```

Revisit the endpoint [http://localhost:8080/hello](http://localhost:8080/hello) and you will see the same value.

Let's change the feature flag in our `flags.flagd.json`, making `defaultVariant` to `on`

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"      "defaultVariant": "on"    }  }}
```

Revisit the endpoint [http://localhost:8080/hello](http://localhost:8080/hello) and you will be greeted with `Hello, welcome to this OpenFeature-enabled website!`

## Conclusion[​](#conclusion "Direct link to Conclusion")

This walk-through introduced you to the OpenFeature Go SDK and how it can be easily integrated into well-known frameworks such as Go Gin. It covered how a provider can be configured to perform the flag evaluation and introduced basic feature flagging concepts. It also showcased how feature flags can be updated at runtime, without requiring a code change and a redeployment.

[Edit this page](https://github.com/open-feature/openfeature.dev/edit/main/docs/tutorials/getting-started/go.mdx)