# OpenFeature Python SDK

![Specification](https://img.shields.io/static/v1?label=Specification&message=v0.8.0&color=red&style=for-the-badge)![Latest version](https://img.shields.io/static/v1?label=release&message=v0.10.0&color=blue&style=for-the-badge)  
![Build status](https://github.com/open-feature/python-sdk/actions/workflows/build.yml/badge.svg)![Codecov](https://codecov.io/gh/open-feature/python-sdk/branch/main/graph/badge.svg?token=FQ1I444HB3)![Min python version](https://img.shields.io/badge/python-\>=3.10-blue.svg)![Repo status](https://www.repostatus.org/badges/latest/wip.svg)

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

*   Python 3.10+

### Install​

#### Pip install​

```
pip install openfeature-sdk==0.10.0
```

#### requirements.txt​

```
openfeature-sdk==0.10.0
```

```
pip install -r requirements.txt
```

### Usage​

```
from openfeature import apifrom openfeature.provider.in_memory_provider import InMemoryFlag, InMemoryProvider# flags defined in memorymy_flags = {  "v2_enabled": InMemoryFlag("on", {"on": True, "off": False})}# configure a providerapi.set_provider(InMemoryProvider(my_flags))# create a clientclient = api.get_client()# get a bool flag valueflag_value = client.get_boolean_value("v2_enabled", False)print("Value: " + str(flag_value))
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

Tracking

Associate user actions with feature flag evaluations.

✅

Shutdown

Gracefully clean up a provider during application shutdown.

✅

Transaction Context Propagation

Set a specific evaluation context for a transaction (e.g. an HTTP request or a thread)

✅

Extending

Extend OpenFeature with custom providers and hooks.

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌

### Providers​

Providers are an abstraction between a flag management system and the OpenFeature SDK. Look here for a complete list of available providers. If the provider you're looking for hasn't been created yet, see the develop a provider section to learn how to build it yourself.

Once you've added a provider as a dependency, it can be registered with OpenFeature like this:

```
from openfeature import apifrom openfeature.provider.no_op_provider import NoOpProviderapi.set_provider(NoOpProvider())open_feature_client = api.get_client()
```

`set_provider()` is non-blocking: it registers the provider immediately and runs initialization in a background thread. Flag evaluations during the initialization window return the default value with a `PROVIDER_NOT_READY` error code. Use `set_provider_and_wait()` if you need to ensure the provider is ready before proceeding:

```
# blocks until the provider is initialized (or raises on failure)api.set_provider_and_wait(NoOpProvider())
```

In some situations, it may be beneficial to register multiple providers in the same application. This is possible using domains, which is covered in more detail below.

### Targeting​

Sometimes, the value of a flag must consider some dynamic criteria about the application or user, such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as targeting. If the flag management system you're using supports targeting, you can provide the input data using the evaluation context.

```
from openfeature.api import (    get_client,    set_provider,    get_evaluation_context,    set_evaluation_context,)from openfeature.evaluation_context import EvaluationContextglobal_context = EvaluationContext(    targeting_key="targeting_key1", attributes={"application": "value1"})request_context = EvaluationContext(    targeting_key="targeting_key2", attributes={"email": request.form['email']})## set global contextset_evaluation_context(global_context)# merge second contextclient = get_client(domain="No-op Provider")client.get_string_value("email", "fallback", request_context)
```

### Hooks​

Hooks allow for custom logic to be added at well-defined points of the flag evaluation life-cycle. Look here for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the develop a hook section to learn how to build it yourself.

Once you've added a hook as a dependency, it can be registered at the global, client, or flag invocation level.

```
from openfeature import apifrom openfeature.api import add_hooksfrom openfeature.flag_evaluation import FlagEvaluationOptions# set global hooks at the API-leveladd_hooks([MyHook()])# or configure them in the clientclient = api.get_client()client.add_hooks([MyHook()])# or at the invocation-leveloptions = FlagEvaluationOptions(hooks=[MyHook()])client.get_boolean_value("my-flag", False, flag_evaluation_options=options)
```

### Tracking​

The tracking API allows you to use OpenFeature abstractions and objects to associate user actions with feature flag evaluations. This is essential for robust experimentation powered by feature flags. For example, a flag enhancing the appearance of a UI component might drive user engagement to a new feature; to test this hypothesis, telemetry collected by a hook or provider can be associated with telemetry reported in the client's `track` function.

```
from openfeature.track import TrackingEventDetails# initialize a clientclient = api.get_client()# trigger tracking event actionclient.track(    'visited-promo-page',    evaluation_context=EvaluationContext(),    tracking_event_details=TrackingEventDetails(99.77).add("currencyCode", "USD"),    )
```

Note that some providers may not support tracking; check the documentation for your provider for more information.

### Logging​

The OpenFeature SDK logs to the `openfeature` logger using the `logging` package from the Python Standard Library.

#### Logging Hook​

The Python SDK includes a `LoggingHook`, which logs detailed information at key points during flag evaluation, using the `logging` package. This hook can be particularly helpful for troubleshooting and debugging; simply attach it at the global, client or invocation level and ensure your log level is set to "debug".

```
from openfeature import apifrom openfeature.hook.logging_hook import LoggingHookapi.add_hooks([LoggingHook()])
```

### Domains​

Clients can be assigned to a domain. A domain is a logical identifier which can be used to associate clients with a particular provider. If a domain has no associated provider, the global provider is used.

```
from openfeature import api# Registering the default providerapi.set_provider(MyProvider());# Registering a provider to a domainapi.set_provider(MyProvider(), "my-domain");# A client bound to the default providerdefault_client = api.get_client();# A client bound to the MyProvider providerdomain_scoped_client = api.get_client("my-domain");
```

Domains can be defined on a provider during registration. For more details, please refer to the providers section.

### Eventing​

Events allow you to react to state changes in the provider or underlying flag management system, such as flag definition changes, provider readiness, or error conditions. Initialization events (PROVIDER_READY on success, PROVIDER_ERROR on failure) are dispatched for every provider. Some providers support additional events, such as PROVIDER_CONFIGURATION_CHANGED.

Please refer to the documentation of the provider you're using to see what events are supported.

```
from openfeature import apifrom openfeature.event import EventDetails, ProviderEventdef on_provider_ready(event_details: EventDetails):    print(f"Provider {event_details.provider_name} is ready")api.add_handler(ProviderEvent.PROVIDER_READY, on_provider_ready)client = api.get_client()def on_provider_ready(event_details: EventDetails):    print(f"Provider {event_details.provider_name} is ready")client.add_handler(ProviderEvent.PROVIDER_READY, on_provider_ready)
```

### Transaction Context Propagation​

Transaction context is a container for transaction-specific evaluation context (e.g. user id, user agent, IP). Transaction context can be set where specific data is available (e.g. an auth service or request handler) and by using the transaction context propagator it will automatically be applied to all flag evaluations within a transaction (e.g. a request or thread).

You can implement a different transaction context propagator by implementing the `TransactionContextPropagator` class exported by the OpenFeature SDK. In most cases you can use `ContextVarsTransactionContextPropagator` as it works for `threads` and `asyncio` using Context Variables.

The following example shows a **multithreaded** Flask application using transaction context propagation to propagate the request ip and user id into request scoped transaction context.

```
from flask import Flask, requestfrom openfeature import apifrom openfeature.evaluation_context import EvaluationContextfrom openfeature.transaction_context import ContextVarsTransactionContextPropagator# Initialize the Flask appapp = Flask(__name__)# Set the transaction context propagatorapi.set_transaction_context_propagator(ContextVarsTransactionContextPropagator())# Middleware to set the transaction context# You can call api.set_transaction_context anywhere you have information,# you want to have available in the code-paths below the current one.@app.before_requestdef set_request_transaction_context():  ip = request.headers.get("X-Forwarded-For", request.remote_addr)  user_id = request.headers.get("User-Id")  # Assuming we're getting the user ID from a header  evaluation_context = EvaluationContext(targeting_key=user_id, attributes={"ipAddress": ip})  api.set_transaction_context(evaluation_context)def create_response() -> str:  # This method can be anywhere in our code.  # The feature flag evaluation will automatically contain the transaction context merged with other context  new_response = api.get_client().get_string_value("response-message", "Hello User!")  return f"Message from server: {new_response}"# Example route where we use the transaction context@app.route('/greeting')def some_endpoint():  return create_response()
```

This also works for asyncio based implementations e.g. FastApi as seen in the following example:

```
from fastapi import FastAPI, Requestfrom openfeature import apifrom openfeature.evaluation_context import EvaluationContextfrom openfeature.transaction_context import ContextVarsTransactionContextPropagator# Initialize the FastAPI appapp = FastAPI()# Set the transaction context propagatorapi.set_transaction_context_propagator(ContextVarsTransactionContextPropagator())# Middleware to set the transaction context@app.middleware("http")async def set_request_transaction_context(request: Request, call_next):    ip = request.headers.get("X-Forwarded-For", request.client.host)    user_id = request.headers.get("User-Id")  # Assuming we're getting the user ID from a header    evaluation_context = EvaluationContext(targeting_key=user_id, attributes={"ipAddress": ip})    api.set_transaction_context(evaluation_context)    response = await call_next(request)    return responsedef create_response() -> str:    # This method can be located anywhere in our code.    # The feature flag evaluation will automatically include the transaction context merged with other context.    new_response = api.get_client().get_string_value("response-message", "Hello User!")    return f"Message from server: {new_response}"# Example route where we use the transaction context@app.get('/greeting')async def some_endpoint():    return create_response()
```

### Asynchronous Feature Retrieval​

The OpenFeature API supports asynchronous calls, enabling non-blocking feature evaluations for improved performance, especially useful in concurrent or latency-sensitive scenarios. If a provider _hasn't_ implemented asynchronous calls, the client can still be used asynchronously, but calls will be blocking (synchronous).

```
import asynciofrom openfeature import apifrom openfeature.provider.in_memory_provider import InMemoryFlag, InMemoryProvidermy_flags = { "v2_enabled": InMemoryFlag("on", {"on": True, "off": False}) }api.set_provider(InMemoryProvider(my_flags))client = api.get_client()flag_value = await client.get_boolean_value_async("v2_enabled", False) # API calls are suffixed by _asyncprint("Value: " + str(flag_value))
```

See the develop a provider for how to support asynchronous functionality in providers.

### Shutdown​

The OpenFeature API provides a shutdown function to perform a cleanup of all registered providers. This should only be called when your application is in the process of shutting down.

```
from openfeature import apiapi.shutdown()
```

## Extending​

### Develop a provider​

To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. You’ll then need to write the provider by implementing the `AbstractProvider` class exported by the OpenFeature SDK.

```
from typing import List, Optional, Unionfrom openfeature.evaluation_context import EvaluationContextfrom openfeature.flag_evaluation import FlagResolutionDetailsfrom openfeature.hook import Hookfrom openfeature.provider import AbstractProvider, Metadataclass MyProvider(AbstractProvider):    def get_metadata(self) -> Metadata:        ...    def get_provider_hooks(self) -> List[Hook]:        return []    def resolve_boolean_details(        self,        flag_key: str,        default_value: bool,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[bool]:        ...    def resolve_string_details(        self,        flag_key: str,        default_value: str,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[str]:        ...    def resolve_integer_details(        self,        flag_key: str,        default_value: int,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[int]:        ...    def resolve_float_details(        self,        flag_key: str,        default_value: float,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[float]:        ...    def resolve_object_details(        self,        flag_key: str,        default_value: Union[dict, list],        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[Union[dict, list]]:        ...
```

Providers can also be extended to support async functionality. To support add asynchronous calls to a provider:

*   Implement the `AbstractProvider` as shown above.
*   Define asynchronous calls for each data type.

```
class MyProvider(AbstractProvider):    ...    async def resolve_boolean_details_async(        self,        flag_key: str,        default_value: bool,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[bool]:        ...    async def resolve_string_details_async(        self,        flag_key: str,        default_value: str,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[str]:        ...    async def resolve_integer_details_async(        self,        flag_key: str,        default_value: int,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[int]:        ...    async def resolve_float_details_async(        self,        flag_key: str,        default_value: float,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[float]:        ...    async def resolve_object_details_async(        self,        flag_key: str,        default_value: Union[dict, list],        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[Union[dict, list]]:        ...
```

> Built a new provider? Let us know so we can add it to the docs!

### Develop a hook​

To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. Implement your own hook by creating a hook that inherits from the `Hook` class. Any of the evaluation life-cycle stages (`before`/`after`/`error`/`finally_after`) can be override to add the desired business logic.

```
from openfeature.hook import Hook, HookContext, HookHintsfrom openfeature.flag_evaluation import FlagEvaluationDetails, FlagValueTypeclass MyHook(Hook):    def after(self, hook_context: HookContext, details: FlagEvaluationDetails[FlagValueType], hints: HookHints):        print("This runs after the flag has been evaluated")
```

> Built a new hook? Let us know so we can add it to the docs!