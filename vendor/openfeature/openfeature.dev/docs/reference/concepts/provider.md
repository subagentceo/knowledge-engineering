-   [](/)
-   [Concepts](/docs/category/concepts)
-   Providers

On this page

# Providers

_Providers_ are responsible for performing flag evaluations. They provide an abstraction between the underlying flag management system and the OpenFeature SDK. Providers can wrap a vendor SDK, call a bespoke flag evaluation REST API, or even parse some locally stored file to resolve flag values. This allows the underlying flag evaluation logic to be changed without requiring a major code refactor.

An [application integrator](/specification/glossary#application-integrator) can register one provider at a time. Registering an additional provider will override any previously configured providers. If no provider is set, OpenFeature will [no-op](https://en.wikipedia.org/wiki/NOP_\(code\)) and return the default value passed to the evaluation API.

Providers are set through the [evaluation API](/docs/reference/concepts/evaluation-api#setting-a-provider). They're globally registered and a change affects both new and existing OpenFeature clients.

![](/assets/images/of-architecture-a49b167df4037d936bd6623907d84de1.png)

_An example of an OpenFeature provider for a fictional Flags-R-us service._