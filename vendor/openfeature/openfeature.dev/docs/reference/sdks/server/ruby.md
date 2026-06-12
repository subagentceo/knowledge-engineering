# OpenFeature Ruby SDK

![Specification](https://img.shields.io/static/v1?label=specification&message=v0.8.0&color=yellow&style=for-the-badge)![Release](https://img.shields.io/static/v1?label=release&message=v0.6.5&color=blue&style=for-the-badge)![Build](https://img.shields.io/github/actions/workflow/status/open-feature/ruby-sdk/main.yml?style=for-the-badge)![Gem Version](https://img.shields.io/gem/v/openfeature-sdk?style=for-the-badge&color=red)![Code Coverage](https://img.shields.io/codecov/c/github/open-feature/ruby-sdk?style=for-the-badge)  
![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/9337/badge)

## Quick start​

**MCP Install**📋 Copy Prompt

Follow the MCP Getting Started guide to quickly set up the OpenFeature MCP server and connect your AI tool.

*   Run this prompt: `"Install OpenFeature into this app"`

**Quick Install:**

📦 Install in Cursor📦 Install in VS Code

```
claude mcp add --transport stdio openfeature npx -y @openfeature/mcp
```

### Requirements​

Supported Ruby Version

OS

Ruby 3.4.x

Windows, MacOS, Linux

Ruby 4.0.x

Windows, MacOS, Linux

This project supports all Ruby versions in active maintenance per the Ruby maintenance schedule.

### Install​

Install the gem and add to the application's Gemfile by executing:

```
bundle add openfeature-sdk
```

If bundler is not being used to manage dependencies, install the gem by executing:

```
gem install openfeature-sdk
```

### Usage​

```
require 'open_feature/sdk'# API Initialization and configurationOpenFeature::SDK.configure do |config|  # your provider of choice, which will be used as the default provider  config.set_provider(OpenFeature::SDK::Provider::InMemoryProvider.new(    {      "flag1" => true,      "flag2" => 1    }  ))end# Create a clientclient = OpenFeature::SDK.build_client# fetching boolean value feature flagbool_value = client.fetch_boolean_value(flag_key: 'boolean_flag', default_value: false)# a details method is also available for more information about the flag evaluation# see `EvaluationDetails` for more infobool_details = client.fetch_boolean_details(flag_key: 'boolean_flag', default_value: false)# fetching string value feature flagstring_value = client.fetch_string_value(flag_key: 'string_flag', default_value: 'default')# fetching number value feature flagfloat_value = client.fetch_number_value(flag_key: 'number_value', default_value: 1.0)integer_value = client.fetch_number_value(flag_key: 'number_value', default_value: 1)# get an object valueobject = client.fetch_object_value(flag_key: 'object_value', default_value: { name: 'object'})
```

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

Domains

Logically bind clients with providers.

✅

Eventing

React to state changes in the provider or flag management system.

✅

Shutdown

Gracefully clean up a provider during application shutdown.

✅

Tracking

Associate user actions with feature flag evaluations for experimentation.

✅

Transaction Context Propagation

Set a specific evaluation context for a transaction (e.g. an HTTP request or a thread)

✅

Extending

Extend OpenFeature with custom providers and hooks.

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌

### Providers​

Providers are an abstraction between a flag management system and the OpenFeature SDK. Look here for a complete list of available providers.

If the provider you're looking for hasn't been created yet, see the develop a provider section to learn how to build it yourself.

Once you've added a provider as a dependency, it can be registered with OpenFeature like this:

```
OpenFeature::SDK.configure do |config|  # your provider of choice, which will be used as the default provider  config.set_provider(OpenFeature::SDK::Provider::InMemoryProvider.new(    {      "v2_enabled" => true,    }  ))end
```

#### Blocking Provider Registration​

If you need to ensure that a provider is fully initialized before continuing, you can use `set_provider_and_wait`:

```
# Using the SDK directlybegin  OpenFeature::SDK.set_provider_and_wait(my_provider)  puts "Provider is ready!"rescue OpenFeature::SDK::ProviderInitializationError => e  puts "Provider failed to initialize: #{e.message}"  puts "Error code: #{e.error_code}"  # original_error contains the underlying exception that caused the initialization failure  puts "Original error: #{e.original_error}"end# With custom timeout (default is 30 seconds)OpenFeature::SDK.set_provider_and_wait(my_provider, timeout: 60)# Domain-specific providerOpenFeature::SDK.set_provider_and_wait(my_provider, domain: "feature-flags")# Via configuration blockOpenFeature::SDK.configure do |config|  begin    config.set_provider_and_wait(my_provider)  rescue OpenFeature::SDK::ProviderInitializationError => e    # Handle initialization failure  endend
```

The `set_provider_and_wait` method:

*   Waits for the provider's `init` method to complete successfully
*   Raises `ProviderInitializationError` if initialization fails or times out
*   Provides access to the provider instance, error code, and original exception for debugging
*   The `original_error` field contains the underlying exception that caused the initialization failure
*   Uses the same thread-safe provider switching as `set_provider`

In some situations, it may be beneficial to register multiple providers in the same application. This is possible using domains, which is covered in more detail below.

### Targeting​

Sometimes, the value of a flag must consider some dynamic criteria about the application or user, such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as targeting. If the flag management system you're using supports targeting, you can provide the input data using the evaluation context.

```
OpenFeature::SDK.configure do |config|  # you can set a global evaluation context here  config.evaluation_context = OpenFeature::SDK::EvaluationContext.new("host" => "myhost.com")end# Evaluation context can be set on a client as wellclient_with_context = OpenFeature::SDK.build_client(  evaluation_context: OpenFeature::SDK::EvaluationContext.new("controller_name" => "admin"))# Invocation evaluation context can also be passed in during flag evaluation.# During flag evaluation, invocation context takes precedence over client context# which takes precedence over API (aka global) context.bool_value = client.fetch_boolean_value(  flag_key: 'boolean_flag',  default_value: false,  evaluation_context: OpenFeature::SDK::EvaluationContext.new("is_friday" => true))
```

### Hooks​

Hooks allow for custom logic to be added at well-defined points of the flag evaluation life-cycle. Look here for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the develop a hook section to learn how to build it yourself.

Hooks can be registered at the global, client, or flag invocation level.

```
# Define a hookclass MyHook  include OpenFeature::SDK::Hooks::Hook  def before(hook_context:, hints:)    puts "Evaluating flag: #{hook_context.flag_key}"    nil  end  def after(hook_context:, evaluation_details:, hints:)    puts "Flag #{hook_context.flag_key} evaluated to: #{evaluation_details.value}"  end  def error(hook_context:, exception:, hints:)    puts "Error evaluating #{hook_context.flag_key}: #{exception.message}"  end  def finally(hook_context:, evaluation_details:, hints:)    puts "Evaluation complete for #{hook_context.flag_key}"  endend# Register at the API (global) levelOpenFeature::SDK.hooks << MyHook.new# Register at the client levelclient = OpenFeature::SDK.build_clientclient.hooks << MyHook.new# Register at the invocation levelclient.fetch_boolean_value(  flag_key: "my-flag",  default_value: false,  hooks: [MyHook.new])
```

### Logging​

The SDK includes a built-in `LoggingHook` that provides structured log output for flag evaluations. It logs at the `before`, `after`, and `error` stages of the hook lifecycle.

```
# Use the SDK's default logger (from Configuration)OpenFeature::SDK.hooks << OpenFeature::SDK::Hooks::LoggingHook.new# Or provide your own loggerlogger = Logger.new($stdout)OpenFeature::SDK.hooks << OpenFeature::SDK::Hooks::LoggingHook.new(logger: logger)# Optionally include evaluation context in log outputOpenFeature::SDK.hooks << OpenFeature::SDK::Hooks::LoggingHook.new(  logger: logger,  include_evaluation_context: true)
```

Log output uses a structured key=value format:

*   **before** (DEBUG): `stage=before domain=my-domain provider_name=my-provider flag_key=my-flag default_value=false`
*   **after** (DEBUG): includes `reason`, `variant`, and `value`
*   **error** (ERROR): includes `error_code` and `error_message`

### Domains​

Clients can be assigned to a domain. A domain is a logical identifier which can be used to associate clients with a particular provider. If a domain has no associated provider, the default provider is used.

```
OpenFeature::SDK.configure do |config|  config.set_provider(OpenFeature::SDK::Provider::NoOpProvider.new, domain: "legacy_flags")end# Create a client for a different domain, this will use the provider assigned to that domainlegacy_flag_client = OpenFeature::SDK.build_client(domain: "legacy_flags")
```

### Eventing​

Events allow you to react to state changes in the provider or underlying flag management system, such as flag definition changes, provider readiness, or error conditions. Initialization events (`PROVIDER_READY` on success, `PROVIDER_ERROR` on failure) are dispatched for every provider. Some providers support additional events, such as `PROVIDER_CONFIGURATION_CHANGED`.

Please refer to the documentation of the provider you're using to see what events are supported.

```
# Register event handlers at the API (global) levelready_handler = ->(event_details) do  puts "Provider #{event_details[:provider].metadata.name} is ready!"endOpenFeature::SDK.add_handler(OpenFeature::SDK::ProviderEvent::PROVIDER_READY, ready_handler)# The SDK automatically emits lifecycle events. Providers can emit additional spontaneous events# using the EventEmitter mixin to signal internal state changes like configuration updates.class MyEventAwareProvider  include OpenFeature::SDK::Provider::EventEmitter  def init(evaluation_context)    # Start background process to monitor for configuration changes    # Note: SDK automatically emits PROVIDER_READY when init completes successfully    start_background_process  end  def start_background_process    Thread.new do      # Monitor for configuration changes and emit events when they occur      if configuration_changed?        emit_event(          OpenFeature::SDK::ProviderEvent::PROVIDER_CONFIGURATION_CHANGED,          message: "Flag configuration updated"        )      end    end  endend# Remove specific handlers when no longer neededOpenFeature::SDK.remove_handler(OpenFeature::SDK::ProviderEvent::PROVIDER_READY, ready_handler)
```

### Shutdown​

The OpenFeature API provides a `shutdown` method to perform cleanup of all registered providers. This should only be called when your application is in the process of shutting down.

```
# Shut down all registered providers and clear stateOpenFeature::SDK.shutdown
```

Individual providers can implement a `shutdown` method to perform cleanup:

```
class MyProvider  def shutdown    # Perform any shutdown/reclamation steps with flag management system here  endend
```

### Tracking​

The tracking API allows you to use OpenFeature abstractions and objects to associate user actions with feature flag evaluations. This is essential for robust experimentation powered by feature flags. For example, a flag enhancing the appearance of a UI component might drive user engagement to a new feature; to test this hypothesis, telemetry collected by a hook or provider can be associated with telemetry reported in the client's `track` function.

```
client = OpenFeature::SDK.build_client# Simple tracking eventclient.track("checkout_completed")# With evaluation contextclient.track(  "purchase",  evaluation_context: OpenFeature::SDK::EvaluationContext.new(targeting_key: "user-123"))# With tracking event details (optional numeric value + custom fields)details = OpenFeature::SDK::TrackingEventDetails.new(  value: 99.99,  plan: "premium",  currency: "USD")client.track("subscription", tracking_event_details: details)
```

Note that some providers may not support tracking; if the provider does not implement a `track` method, the call is a no-op. Check the documentation for your provider for more information.

### Transaction Context Propagation​

Transaction context is a container for transaction-specific evaluation context (e.g. user id, user agent, IP). Transaction context can be set where specific data is available (e.g. an auth service or request handler) and by using the transaction context propagator it will automatically be applied to all flag evaluations within a transaction (e.g. a request or thread).

The SDK ships with a `ThreadLocalTransactionContextPropagator` that stores context in `Thread.current`:

```
# Set up the propagatorOpenFeature::SDK.set_transaction_context_propagator(  OpenFeature::SDK::ThreadLocalTransactionContextPropagator.new)# Set transaction context (e.g. in a request middleware)OpenFeature::SDK.set_transaction_context(  OpenFeature::SDK::EvaluationContext.new(targeting_key: "user-123", "email" => "user@example.com"))# Transaction context is automatically merged during flag evaluation.# Merge precedence: invocation > client > transaction > API (global)client = OpenFeature::SDK.build_clientclient.fetch_boolean_value(flag_key: "my-flag", default_value: false)
```

You can implement a custom propagator by including the `TransactionContextPropagator` module:

```
class MyRequestScopedPropagator  include OpenFeature::SDK::TransactionContextPropagator  def set_transaction_context(evaluation_context)    # Store context in your request-scoped storage    RequestStore[:openfeature_context] = evaluation_context  end  def get_transaction_context    RequestStore[:openfeature_context]  endend
```

## Extending​

### Develop a provider​

To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. You’ll then need to write the provider by implementing the `Provider` duck.

```
class MyProvider  def init    # Perform any initialization steps with flag management system here    # Return value is ignored    # **Note** The OpenFeature spec defines a lifecycle method called `initialize` to be called when a new provider is set.    # To avoid conflicting with the Ruby `initialize` method, this method should be named `init` when creating a provider.  end  def shutdown    # Perform any shutdown/reclamation steps with flag management system here    # Return value is ignored  end  def fetch_boolean_value(flag_key:, default_value:, evaluation_context: nil)    # Retrieve a boolean value from provider source  end  def fetch_string_value(flag_key:, default_value:, evaluation_context: nil)    # Retrieve a string value from provider source  end  def fetch_number_value(flag_key:, default_value:, evaluation_context: nil)    # Retrieve a numeric value from provider source  end  def fetch_integer_value(flag_key:, default_value:, evaluation_context: nil)    # Retrieve a integer value from provider source  end  def fetch_float_value(flag_key:, default_value:, evaluation_context: nil)    # Retrieve a float value from provider source  end  def fetch_object_value(flag_key:, default_value:, evaluation_context: nil)    # Retrieve a hash value from provider source  end  # Optional: implement tracking support (spec 6.1.4)  # If not defined, Client#track is a no-op  def track(tracking_event_name, evaluation_context:, tracking_event_details:)    # Record a tracking event with your flag management system  endend
```

> Built a new provider? Let us know so we can add it to the docs!

### Develop a hook​

To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. Implement your own hook by including the `OpenFeature::SDK::Hooks::Hook` module. You only need to define the stages you care about — unimplemented stages are no-ops by default.

```
class MyLoggingHook  include OpenFeature::SDK::Hooks::Hook  def before(hook_context:, hints:)    puts "Evaluating #{hook_context.flag_key}"    nil # Return nil or an EvaluationContext to merge  end  def after(hook_context:, evaluation_details:, hints:)    puts "Result: #{evaluation_details.value}"  end  # error and finally are optional — only define what you needend
```

> Built a new hook? Let us know so we can add it to the docs!