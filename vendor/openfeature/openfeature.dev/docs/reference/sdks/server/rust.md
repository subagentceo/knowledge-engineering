# OpenFeature Rust SDK

![Specification](https://img.shields.io/static/v1?label=specification&message=v0.5.2&color=yellow&style=for-the-badge)![Release](https://img.shields.io/static/v1?label=release&message=v0.3.0&color=blue&style=for-the-badge)  
![Crates.io](https://img.shields.io/crates/v/open-feature)![Min rust version](https://img.shields.io/badge/rust-%3E=1.80.1-blue.svg)![Repo status](https://www.repostatus.org/badges/latest/wip.svg)

## Quick start​

### Requirements​

This package was built with Rust version `1.80.1`. Earlier versions might work, but is not guaranteed.

### Install​

Add the following content to the `Cargo.toml` file:

```
open-feature = "0.3.0"
```

### Usage​

```
async fn example() -> Result<(), Error> {    // Acquire an OpenFeature API instance.    // Note the `await` call here because asynchronous lock is used to    // guarantee thread safety.    let mut api = OpenFeature::singleton_mut().await;    // Configure a provider.    // By default [`NoOpProvider`] is used.    api.set_provider(NoOpProvider::default()).await;    // create a client    let client = api.create_client();    // get a bool flag value    let is_feature_enabled = client        .get_bool_value("v2_enabled", None, None)        .await        .unwrap_or(false);    Ok(())}
```

Note that the default `NoOpProvider` always returns `Err` for any given input.

#### Extended Example​

```
#[tokio::test]async fn extended_example() {    // Acquire an OpenFeature API instance.    let mut api = OpenFeature::singleton_mut().await;    // Set the default (unnamed) provider.    api.set_provider(NoOpProvider::default()).await;    // Create an unnamed client.    let client = api.create_client();    // Create an evaluation context.    // It supports types mentioned in the specification.    let evaluation_context = EvaluationContext::default()        .with_targeting_key("Targeting")        .with_custom_field("bool_key", true)        .with_custom_field("int_key", 100)        .with_custom_field("float_key", 3.14)        .with_custom_field("string_key", "Hello".to_string())        .with_custom_field("datetime_key", time::OffsetDateTime::now_utc())        .with_custom_field(            "struct_key",            EvaluationContextFieldValue::Struct(Arc::new(MyStruct::default())),        )        .with_custom_field("another_struct_key", Arc::new(MyStruct::default()))        .with_custom_field(            "yet_another_struct_key",            EvaluationContextFieldValue::new_struct(MyStruct::default()),        );    // This function returns a `Result`.    // You can process it with functions provided by std.    let is_feature_enabled = client        .get_bool_value("SomeFlagEnabled", Some(&evaluation_context), None)        .await        .unwrap_or(false);    if is_feature_enabled {        // Let's get evaluation details.        let _result = client            .get_int_details("key", Some(&evaluation_context), None)            .await;    }}
```

#### Getting a Struct from a Provider​

It is possible to extract a struct from the provider. Internally, this SDK defines a type `StructValue` to store any structure value. The `client.get_struct_value()` functions takes a type parameter `T`. It will try to parse `StructValue` resolved by the provider to `T`, as long as `T` implements trait `TryFrom<StructValue>`.

You can pass in a type that satisfies this trait bound. When the conversion fails, it returns an `Err` with `EvaluationErrorCode::TypeMismatch`.

### API Reference​

See here for the API docs.

## Features​

Status

Features

Description

✅

Providers

Integrate with a commercial, open source, or in-house feature management tool.

✅

Targeting

Contextually-aware flag evaluation using evaluation context.

✅

Hooks

Add functionality to various stages of the flag evaluation life-cycle.

✅

Logging

Integrate with popular logging packages.

✅

Named clients

Utilize multiple providers in a single application.

❌

Eventing

React to state changes in the provider or flag management system.

✅

Shutdown

Gracefully clean up a provider during application shutdown.

✅

Extending

Extend OpenFeature with custom providers and hooks.

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌

### Providers​

Providers are an abstraction between a flag management system and the OpenFeature SDK. Look here for a complete list of available providers. If the provider you're looking for hasn't been created yet, see the develop a provider section to learn how to build it yourself.

Once you've added a provider as a dependency, it can be registered with OpenFeature like this:

```
// Set the default feature provider. Please replace the `NoOpProvider` with the one you want.// If you do not do that, [`NoOpProvider`] will be used by default.//// [`NoOpProvider`] always returns `Err` despite any input. You can use functions like // `unwrap_or()` to specify default values.//// If you set a new provider after creating some clients, the existing clients will pick up// the new provider you just set.//// You must `await` it to let the provider's initialization to finish.let mut api = OpenFeature::singleton_mut().await;api.set_provider(NoOpProvider::default()).await;
```

In some situations, it may be beneficial to register multiple providers in the same application. This is possible using named clients, which is covered in more detail below.

### Targeting​

Sometimes, the value of a flag must consider some dynamic criteria about the application or user, such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as targeting. If the flag management system you're using supports targeting, you can provide the input data using the evaluation context.

```
// Create a global evaluation context and set it into the API.// Note that this is optional. By default it uses an empty one.let mut api = OpenFeature::singleton_mut().await;api.set_evaluation_context(global_evaluation_context).await;// Set client level evaluation context.// It will overwrite the global one for the existing keys.let mut client = api.create_client();client.set_evaluation_context(client_evaluation_context);// Pass evaluation context in evaluation functions.// This one will overwrite the global evaluation context and // the client level one.client.get_int_value("flag", Some(&evaluation_context), None);
```

### Hooks​

Hooks allow for custom logic to be added at well-defined points of the flag evaluation life-cycle. Look here for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the develop a hook section to learn how to build it yourself.

Once you've added a hook as a dependency, it can be registered at the global, client, or flag invocation level.

```
let mut api = OpenFeature::singleton_mut().await;// Add a global hook.api.add_hook(MyHook::default()).await;// Create a client and add a client level hook.let client = api.create_client().with_hook(MyHook::default());// Get a flag value with a hook.let eval = EvaluationOptions::default().with_hook(MyHook::default());client.get_int_value("key", None, Some(&eval)).await;
```

Example of a hook implementation you can find in examples/hooks.rs.

To run the example, execute the following command:

```
cargo run --example hooks
```

### Logging​

Note that in accordance with the OpenFeature specification, the SDK doesn't generally log messages during flag evaluation.

#### Logging hook​

The Rust SDK provides a logging hook that can be used to log messages during flag evaluation. This hook is not enabled by default and must be explicitly set.

```
let mut api = OpenFeature::singleton_mut().await;let client = api.create_client().with_logging_hook(false);...// Note: You can include evaluation context to log output.let client = api.create_client().with_logging_hook(true);
```

Both **text** and **structured** logging are supported. To enable **structured** logging, enable feature `structured-logging` in your `Cargo.toml`:

```
open-feature = { version = "0.3.0", features = ["structured-logging"] }
```

Example of a logging hook usage you can find in examples/logging.rs.

To run the example, execute the following command:

```
cargo run --example logging
```

**Output**:

```
[2025-01-10T18:53:11Z DEBUG open_feature::hooks::logging] Before stage: domain=, provider_name=Dummy Provider, flag_key=my_feature, default_value=Some(Bool(false)), evaluation_context=EvaluationContext { targeting_key: None, custom_fields: {} }[2025-01-10T18:53:11Z DEBUG open_feature::hooks::logging] After stage: domain=, provider_name=Dummy Provider, flag_key=my_feature, default_value=Some(Bool(false)), reason=None, variant=None, value=Bool(true), evaluation_context=EvaluationContext { targeting_key: None, custom_fields: {} }
```

or with structured logging:

```
cargo run --example logging --features structured-logging
```

**Output**:

```
{"default_value":"Some(Bool(false))","domain":"","evaluation_context":"EvaluationContext { targeting_key: None, custom_fields: {} }","flag_key":"my_feature","level":"DEBUG","message":"Before stage","provider_name":"No-op Provider","target":"open_feature","timestamp":1736537120828}{"default_value":"Some(Bool(false))","domain":"","error_message":"Some(\"No-op provider is never ready\")","evaluation_context":"EvaluationContext { targeting_key: None, custom_fields: {} }","file":"src/hooks/logging.rs","flag_key":"my_feature","level":"ERROR","line":162,"message":"Error stage","module":"open_feature::hooks::logging::structured","provider_name":"No-op Provider","target":"open_feature","timestamp":1736537120828}
```

### Named clients​

Clients can be given a name. A name is a logical identifier that can be used to associate clients with a particular provider. If a name has no associated provider, the global provider is used.

```
// Create a named provider and bind it.api.set_named_provider("named", NoOpProvider::default()).await;// This named client will use the feature provider bound to this name.let client = api.create_named_client("named");assert_eq!(client.get_int_value("key", None, None).await.unwrap(), 42);
```

### Eventing​

Events are not yet available in the Rust SDK.

### Shutdown​

The OpenFeature API provides a close function to perform a cleanup of all registered providers. This should only be called when your application is in the process of shutting down.

```
// This will clean all the registered providers and invoke their `shutdown()` function.let api = OpenFeature::singleton_mut().await;api.shutdown().await;
```

## Extending​

### Develop a provider​

To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. You’ll then need to write the provider by implementing the `FeatureProvider` interface exported by the OpenFeature SDK.

Check the source of `NoOpProvider` for an example.

> Built a new provider? Let us know so we can add it to the docs!

### Develop a hook​

To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. Implement your own hook by conforming to the `Hook interface`. To satisfy the interface, all methods (`before`/`after`/`finally`/`error`) need to be defined.

```
use open_feature::{    EvaluationContext, EvaluationDetails, EvaluationError,    Hook, HookContext, HookHints, Value,};struct MyHook;#[async_trait::async_trait]impl Hook for MyHook {    async fn before<'a>(        &self,        context: &HookContext<'a>,        hints: Option<&'a HookHints>,    ) -> Result<Option<EvaluationContext>, EvaluationError> {        todo!()    }    async fn after<'a>(        &self,        context: &HookContext<'a>,        details: &EvaluationDetails<Value>,        hints: Option<&'a HookHints>,    ) -> Result<(), EvaluationError> {        todo!()    }    async fn error<'a>(        &self,        context: &HookContext<'a>,        error: &EvaluationError,        hints: Option<&'a HookHints>,    ) {        todo!()    }    async fn finally<'a>(        &self,        context: &HookContext<'a>,        evaluation_details: &EvaluationDetails<Value>,        hints: Option<&'a HookHints>,    ) {        todo!()    }}
```

> Built a new hook? Let us know so we can add it to the docs!