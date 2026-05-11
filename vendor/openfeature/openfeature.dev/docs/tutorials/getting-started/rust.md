-   [](/)
-   [Getting Started](/docs/category/getting-started)
-   Rust SDK and Axum

On this page

# Getting Started with the OpenFeature Rust SDK and Axum

## Introduction[​](#introduction "Direct link to Introduction")

This tutorial explains how to integrate the OpenFeature Rust SDK into an Axum application using the flagd provider. In this guide you will learn how to:

-   Create a new Rust project with Cargo
-   Update dependencies to include Docker-based flagd configuration
-   Set up an Axum server with a custom AppState that holds a FlagdProvider
-   Evaluate a feature flag and return a custom message with diff markers to highlight changes

## Requirements[​](#requirements "Direct link to Requirements")

-   Rust stable (1.80.2 or later recommended)
-   Cargo
-   Docker (to run the flagd service)
-   A valid flagd configuration file (e.g. `flags.flagd.json`)

## Walk-through[​](#walk-through "Direct link to Walk-through")

### Step 1: Create a new Rust project[​](#step-1-create-a-new-rust-project "Direct link to Step 1: Create a new Rust project")

```
cargo new axumstart
```

Then navigate to the project directory:

```
cd axumstart
```

### Step 2: Update Cargo.toml dependencies[​](#step-2-update-cargotoml-dependencies "Direct link to Step 2: Update Cargo.toml dependencies")

In your Cargo.toml add the following dependencies:

```
[dependencies]axum = "0.6"tokio = { version = "1", features = ["full"] }serde_json = "1.0"tracing = "0.1"open-feature = "^0"open-feature-flagd = "^0"
```

Adjust version numbers according to the latest releases.

### Step 3: Set Up the Application[​](#step-3-set-up-the-application "Direct link to Step 3: Set Up the Application")

Create or modify your `src/main.rs` with the following code. Notice the diff markers to indicate new additions:

```
fn main() {    println!("Hello, world!");}use axum::{    extract::State,    http::StatusCode,    response::IntoResponse,    routing::get,    Json, Router,};use open_feature_flagd::{FlagdOptions, FlagdProvider};use open_feature::{EvaluationContext, provider::FeatureProvider};use serde_json::json;use std::sync::Arc;#[derive(Clone)]pub struct AppState {    pub flag_provider: Arc<FlagdProvider>,}async fn hello_handler(State(state): State<AppState>) -> impl IntoResponse {    // Create an evaluation context (custom fields can be added if required)    let context = EvaluationContext::default();    // Evaluate the "welcome-message" feature flag.    let flag_eval = state.flag_provider.resolve_bool_value("welcome-message", &context).await;    let message = match flag_eval {        Ok(result) if result.value => "Hello, welcome to this OpenFeature-enabled website!",        _ => "Hello!",    };    (StatusCode::OK, Json(json!({ "message": message })))}#[tokio::main]async fn main() {    // Initialize the flagd provider with default options.    let flag_provider = Arc::new(        FlagdProvider::new(FlagdOptions {            cache_settings: None,            ..Default::default()        })        .await        .expect("Failed to connect to flagd. Please confirm flagd is running."),    );    // Create a custom application state with the flag provider.    let app_state = AppState { flag_provider };    // Build an Axum application with the "/hello" endpoint.    let app = Router::new()        .route("/hello", get(hello_handler))        .with_state(app_state);    let addr = "127.0.0.1:8080".parse().unwrap();    println!("Listening on http://{}/hello", addr);    axum::Server::bind(&addr)        .serve(app.into_make_service())        .await        .unwrap();}
```

### Step 4: Configure a provider (flagd)[​](#step-4-configure-a-provider-flagd "Direct link to Step 4: Configure a provider (flagd)")

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

Flagd can be run as a [standalone binary](https://flagd.dev/reference/flagd-cli/flagd/) or [Kubernetes Operator](https://openfeature.dev/docs/tutorials/ofo/) as well. If you don't have docker installed, get and install the [Flagd binary](https://github.com/open-feature/flagd/releases). With the flagd configuration in place, start flagd service with the following command.

```
flagd start -f file:flags.flagd.json
```

### Step 6: Rerun the application[​](#step-6-rerun-the-application "Direct link to Step 6: Rerun the application")

Now that everything is in place, let's start the app.

```
cargo run
```

Open your browser and navigate to [http://127.0.0.1:8080/hello](http://127.0.0.1:8080/hello) should show the same value as before. This difference is now the feature flag value can be changed at runtime!

Let's change the feature flag in our `flags.flagd.json`, making `defaultVariant` to `on`

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"      "defaultVariant": "on"    }  }}
```

Save the changes to `flags.flagd.json` and refresh the browser tab. You should now be greeted with `Hello, welcome to this OpenFeature-enabled website!`.

## Conclusion[​](#conclusion "Direct link to Conclusion")

This tutorial demonstrated how to integrate the OpenFeature Rust SDK with an Axum web server using a custom AppState containing a FlagdProvider. By leveraging flagd service, you can dynamically update feature flags at runtime without needing to redeploy your application.

For advanced configuration and more details, refer to the [OpenFeature Rust SDK documentation](https://docs.rs/open-feature-flagd/latest/open_feature_flagd/).

[Edit this page](https://github.com/open-feature/openfeature.dev/edit/main/docs/tutorials/getting-started/rust.mdx)