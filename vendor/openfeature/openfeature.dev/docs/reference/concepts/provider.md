# Providers

_Providers_ are responsible for performing flag evaluations. They provide an abstraction between the underlying flag management system and the OpenFeature SDK. Providers can wrap a vendor SDK, call a bespoke flag evaluation REST API, or even parse some locally stored file to resolve flag values. This allows the underlying flag evaluation logic to be changed without requiring a major code refactor.

An [application integrator](/specification/glossary#application-integrator) can register one provider at a time. Registering an additional provider will override any previously configured providers. If no provider is set, OpenFeature will [no-op](https://en.wikipedia.org/wiki/NOP_\(code\)) and return the default value passed to the evaluation API.

Providers are set through the [evaluation API](/docs/reference/concepts/evaluation-api#setting-a-provider). They're globally registered and a change affects both new and existing OpenFeature clients.

![](/assets/images/of-architecture-a49b167df4037d936bd6623907d84de1.png)

_An example of an OpenFeature provider for a fictional Flags-R-us service._

## Implementing Providers[​](#implementing-providers "Direct link to Implementing Providers")

### Getting started[​](#getting-started "Direct link to Getting started")

To develop a provider, start by confirming that an OpenFeature SDK is available in the language you're interested in. Next, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in an [existing contrib repository](https://github.com/open-feature?q=contrib&type=all&language=&sort=) available under the OpenFeature organization. Finally, you’ll then need to write the provider itself. In most languages, this can be accomplished by implementing the provider interface exported by the OpenFeature SDK.

### Naming recommendations[​](#naming-recommendations "Direct link to Naming recommendations")

The following naming recommendations can be used to ensure consistency between providers developed among the community.

#### Repository name[​](#repository-name "Direct link to Repository name")

If you're creating a new repository, it's recommended that you use one the following naming conventions:

-   `openfeature-provider-<language name>`
-   `<vendor/tool name>-openfeature-provider-<language name>`

note

It is **not** required that a provider be open source, but it's highly recommended.

#### Artifact name[​](#artifact-name "Direct link to Artifact name")

The name of the artifact will vary based on the package manager. Ultimately, it's up to the publisher to decide what name makes the most sense. However, the following items should be used in the package name:

-   OpenFeature (can also be stylized as openfeature or open-feature)
-   Vendor/tool name
-   The word `provider` should be included in the name

An example of what it could look like in NPM: `@openfeature/flagd-provider`

### Domain scoped providers[​](#domain-scoped-providers "Direct link to Domain scoped providers")

OpenFeature supports multiple providers [domain-scoped](https://openfeature.dev/specification/glossary/#domain) to multiple clients in a single application. This allows teams to scope flag evaluation to a particular flag management system, making it easier for developers to mix and match providers based on their needs, all from a unified SDK.

```
OpenFeature.setProvider('ProviderA', new ProviderA());OpenFeature.setProvider('ProviderB', new ProviderB());const clientA = OpenFeature.getClient('ProviderA');const clientB = OpenFeature.getClient('ProviderB');
```

> To learn more, please refer to the [OpenFeature Enhancement Proposal](https://github.com/open-feature/ofep/blob/main/OFEP/provider-client-mapping.md) or [spec change](https://openfeature.dev/specification/sections/flag-evaluation/#requirement-113).

### Multi-Provider support[​](#multi-provider-support "Direct link to Multi-Provider support")

OpenFeature SDKs also support combining multiple providers under a single client using the [Multi-Provider specification](/specification/appendix-a#multi-provider). This interface allows your application to transparently interact with multiple providers from different flag management systems through a single interface. The logic of how the different providers are accessed through the multi-provider is handled through the assigned [multi-provider strategy](/specification/appendix-a#strategies).

```
const multiProvider = new MultiProvider(  [    {      provider: new ProviderA(),    },    {      provider: new ProviderB(),    },  ],  new FirstMatchStrategy(),);await OpenFeature.setProviderAndWait(multiProvider);
```

### Examples[​](#examples "Direct link to Examples")

#### Dynamic Context Implementations (Server-side SDKs)[​](#dynamic-context-implementations-server-side-sdks "Direct link to Dynamic Context Implementations (Server-side SDKs)")

-   TypeScript
-   Java
-   C#
-   Go
-   PHP
-   Python

```
import {  Provider,  ResolutionDetails,  EvaluationContext,  JsonValue,  OpenFeatureEventEmitter,} from '@openfeature/server-sdk';export class MyFeatureProvider implements Provider {  readonly metadata = {    name: 'My Feature Provider',  } as const;  readonly runsOn = 'server';  // emitter for provider events  events = new OpenFeatureEventEmitter();  resolveBooleanEvaluation(    flagKey: string,    defaultValue: boolean,    context: EvaluationContext,  ): Promise<ResolutionDetails<boolean>> {    // code to resolve boolean details  }  resolveStringEvaluation(    flagKey: string,    defaultValue: string,    context: EvaluationContext,  ): Promise<ResolutionDetails<string>> {    // code to resolve string details  }  resolveNumberEvaluation(    flagKey: string,    defaultValue: number,    context: EvaluationContext,  ): Promise<ResolutionDetails<number>> {    // code to resolve number details  }  resolveObjectEvaluation(    flagKey: string,    defaultValue: JsonValue,    context: EvaluationContext,  ): Promise<ResolutionDetails<JsonValue>> {    // code to resolve object details  }}
```

```
package dev.openfeature.javasdk;public class MyFeatureProvider implements FeatureProvider {    private final String name = "My Feature Provider";    @Override    public String getName() {      return this.name;    }    @Override    public Metadata getMetadata() {        return new Metadata() {            @Override            public String getName() {                return name;            }        };    }    @Override    public ProviderEvaluation<Boolean> getBooleanEvaluation(String key, Boolean defaultValue, EvaluationContext ctx) {      // code to resolve boolean details    }    @Override    public ProviderEvaluation<String> getStringEvaluation(String key, String defaultValue, EvaluationContext ctx) {      // code to resolve string details    }    @Override    public ProviderEvaluation<Integer> getIntegerEvaluation(String key, Integer defaultValue, EvaluationContext ctx) {      // code to resolve integer details    }    @Override    public ProviderEvaluation<Double> getDoubleEvaluation(String key, Double defaultValue, EvaluationContext ctx) {      // code to resolve double details    }    @Override    public ProviderEvaluation<Value> getObjectEvaluation(String key, Value defaultValue, EvaluationContext invocationContext) {      // code to resolve object details    }}
```

```
using System.Threading.Tasks;using OpenFeature;using OpenFeature.Model;public class MyFeatureProvider : FeatureProvider{    public static string Name => "My Feature Provider";    public override Metadata GetMetadata()    {        return new Metadata(Name);    }    public override Task<ResolutionDetails<bool>> ResolveBooleanValue(string flagKey, bool defaultValue,        EvaluationContext context = null)    {        // code to resolve boolean details    }    public override Task<ResolutionDetails<string>> ResolveStringValue(string flagKey, string defaultValue,        EvaluationContext context = null)    {        // code to resolve string details    }    public override Task<ResolutionDetails<int>> ResolveIntegerValue(string flagKey, int defaultValue,        EvaluationContext context = null)    {        // code to resolve integer details    }    public override Task<ResolutionDetails<double>> ResolveDoubleValue(string flagKey, double defaultValue,        EvaluationContext context = null)    {        // code to resolve double details    }    public override Task<ResolutionDetails<Value>> ResolveStructureValue(string flagKey, Value defaultValue,        EvaluationContext context = null)    {        // code to resolve object details    }}
```

```
package provider// MyFeatureProvider implements the FeatureProvider interface and provides functions for evaluating flagstype MyFeatureProvider struct{}// Metadata returns the metadata of the providerfunc (e MyFeatureProvider) Metadata() Metadata {    return Metadata{Name: "MyFeatureProvider"}}// BooleanEvaluation returns a boolean flagfunc (e MyFeatureProvider) BooleanEvaluation(flag string, defaultValue bool, evalCtx EvaluationContext) BoolResolutionDetail {    // code to evaluate boolean}// StringEvaluation returns a string flagfunc (e MyFeatureProvider) StringEvaluation(flag string, defaultValue string, evalCtx EvaluationContext) StringResolutionDetail {    // code to evaluate string}// FloatEvaluation returns a float flagfunc (e MyFeatureProvider) FloatEvaluation(flag string, defaultValue float64, evalCtx EvaluationContext) FloatResolutionDetail {    // code to evaluate float}// IntEvaluation returns an int flagfunc (e MyFeatureProvider) IntEvaluation(flag string, defaultValue int64, evalCtx EvaluationContext) IntResolutionDetail {    // code to evaluate int}// ObjectEvaluation returns an object flagfunc (e MyFeatureProvider) ObjectEvaluation(flag string, defaultValue interface{}, evalCtx EvaluationContext) ResolutionDetail {    // code to evaluate object}// Hooks returns hooksfunc (e MyFeatureProvider) Hooks() []Hook {    // code to retrieve hooks}
```

```
namespace OpenFeature\Dev\MyFeature;use OpenFeature\interfaces\hooks\HooksAwareTrait;use OpenFeature\interfaces\provider\Provider;use Psr\Log\LoggerAwareTrait;class MyFeatureProvider implements Provider{    use HooksAwareTrait;    use LoggerAwareTrait;    public const NAME = 'MyFeatureProvider';    public function getMetadata(): MetadataInterface    {        return new Metadata(self::NAME);    }    public function resolveBooleanValue(string $flagKey, bool $defaultValue, ?EvaluationContext $context = null): ResolutionDetails    {        // code to evaluate boolean    }    public function resolveStringValue(string $flagKey, string $defaultValue, ?EvaluationContext $context = null): ResolutionDetails    {        // code to evaluate string    }    public function resolveIntegerValue(string $flagKey, int $defaultValue, ?EvaluationContext $context = null): ResolutionDetails    {        // code to evaluate integer    }    public function resolveFloatValue(string $flagKey, float $defaultValue, ?EvaluationContext $context = null): ResolutionDetails    {        // code to evaluate float    }    public function resolveObjectValue(string $flagKey, $defaultValue, ?EvaluationContext $context = null): ResolutionDetails    {        // code to evaluate object    }}
```

```
from typing import List, Optionalfrom openfeature.evaluation_context import EvaluationContextfrom openfeature.flag_evaluation import FlagResolutionDetailsfrom openfeature.provider.provider import AbstractProviderfrom openfeature.provider.metadata import Metadataclass MyProvider(AbstractProvider):    def get_metadata(self) -> Metadata:        return Metadata(name="MyFeatureProvider")    def get_provider_hooks(self) -> List[Hook]:        return []    def resolve_boolean_details(        self,        flag_key: str,        default_value: bool,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[bool]:        ...  # code to evaluate boolean    def resolve_string_details(        self,        flag_key: str,        default_value: str,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[str]:        ...  # code to evaluate string    def resolve_integer_details(        self,        flag_key: str,        default_value: int,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[int]:        ...  # code to evaluate integer    def resolve_float_details(        self,        flag_key: str,        default_value: float,        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[float]:        ...  # code to evaluate float    def resolve_object_details(        self,        flag_key: str,        default_value: Union[dict, list],        evaluation_context: Optional[EvaluationContext] = None,    ) -> FlagResolutionDetails[Union[dict, list]]:        ...  # code to evaluate object
```

### Static Context Implementations (Client-side SDKs)[​](#static-context-implementations-client-side-sdks "Direct link to Static Context Implementations (Client-side SDKs)")

-   TypeScript

```
import { EvaluationContext, Provider, JsonValue, ResolutionDetails } from '@openfeature/web-sdk';export class TestProvider implements Provider {  metadata = {    name: TestProvider.name,  };  readonly runsOn = 'client';  hooks = [];  onContextChange(oldContext: EvaluationContext, newContext: EvaluationContext): Promise<void> {    // code to run to reconcile the providers state with the newly updated context  }  resolveBooleanEvaluation(flagKey: string, defaultValue: boolean): ResolutionDetails<boolean> {    // code to evaluate boolean  }  resolveStringEvaluation(flagKey: string, defaultValue: string): ResolutionDetails<string> {    // code to evaluate string  }  resolveNumberEvaluation(flagKey: string, defaultValue: number): ResolutionDetails<number> {    // code to evaluate number  }  resolveObjectEvaluation<U extends JsonValue>(flagKey: string, defaultValue: U): ResolutionDetails<U> {    // code to evaluate object  }}
```

### Checklist[​](#checklist "Direct link to Checklist")

Here is a checklist of important considerations when implementing a provider.

#### Functional requirements[​](#functional-requirements "Direct link to Functional requirements")

All resolution methods are implemented (see `Provider` / `FeatureProvider` interface in applicable SDK).

Relevant configuration options for the underlying backend are exposed (typically using the provider constructor).

Flag-keys are transformed appropriately for the underlying backend (OpenFeature defines no restrictions in valid flag keys).

Context is transformed appropriately for the underlying backend.

Provider is named according to the [naming conventions](https://openfeature.dev/docs/reference/concepts/provider#naming-recommendations)

Copy as Markdown

#### Non-functional requirements[​](#non-functional-requirements "Direct link to Non-functional requirements")

Documentation for installation, all behaviors (options, context transformation, flag-key transformation).

Provider is adequately tested.

Provider is added to [the documentation site](https://github.com/open-feature/openfeature.dev/issues/new?assignees=&labels=provider&template=document-provider.yaml&title=%5BProvider%5D%3A+).

Provider releases follow [semantic versioning](https://semver.org/).

Document the version of the OpenFeature specification to which your provider complies.

Copy as Markdown

### FAQ[​](#faq "Direct link to FAQ")

#### Does my provider's version need to match the spec version to which it complies?[​](#does-my-providers-version-need-to-match-the-spec-version-to-which-it-complies "Direct link to Does my provider's version need to match the spec version to which it complies?")

No. You should document the version of the OpenFeature specification your provider complies to, and otherwise use [semantic versioning](https://semver.org/) in your artifact numbers.

#### My backend needs a targeting key (or other user identifier), how can I ensure one exists?[​](#my-backend-needs-a-targeting-key-or-other-user-identifier-how-can-i-ensure-one-exists "Direct link to My backend needs a targeting key (or other user identifier), how can I ensure one exists?")

Targeting keys are not required by the Evaluation API. If your backend requires one, you have a couple options:

-   Indicate an error in your provider (this will result in the default value being returned).
-   Generate one automatically.

Be sure to document this behavior.

#### How should I handle error conditions?[​](#how-should-i-handle-error-conditions "Direct link to How should I handle error conditions?")

If an error condition is encountered in your provider, an error should be [indicated](/specification/types#error-code) by throwing or returning an error, as language idioms dictate. The SDK will ensure the default value is returned and expose the relevant error data.

#### Why isn't there an [error code](/specification/types#error-code) for disabled flags?[​](#why-isnt-there-an-error-code-for-disabled-flags "Direct link to why-isnt-there-an-error-code-for-disabled-flags")

The evaluation of disabled flags does not constitute an "exceptional" occurrence. Flag management systems which feature the ability to disable flags typically expect that flags in this state might be evaluated by client applications. For this reason, OpenFeature defines a [disabled reason](/specification/types#resolution-details), not a disabled error.

#### My flag system doesn't support flags of a particular type. What should I do?[​](#my-flag-system-doesnt-support-flags-of-a-particular-type-what-should-i-do "Direct link to My flag system doesn't support flags of a particular type. What should I do?")

If your backend system doesn't support a particular flag type, you can:

-   Do a conversion from a type the system supports (for example, store JSON objects in a string, or booleans as `0`/`1`), and document this pattern.
-   Indicate an error in your provider (this will result in the default value being returned).

#### How can people find my provider?[​](#how-can-people-find-my-provider "Direct link to How can people find my provider?")

Please add your provider to the [documentation](https://github.com/open-feature/openfeature.dev/issues/new?assignees=&labels=provider&template=document-provider.yaml&title=%5BProvider%5D%3A+) so people can find it!

#### Where should I put my provider source code?[​](#where-should-i-put-my-provider-source-code "Direct link to Where should I put my provider source code?")

If you are a vendor and you want to maintain full control over your provider, you should host the provider in your organization's SCM. If you would like your provider to be maintained as a community project, please take a look at our various [contrib repositories](https://github.com/orgs/open-feature/repositories?q=contrib&type=all&language=&sort=). We encourage you to make your code open source, but obviously it's your decision.

#### Where should I publish my provider artifact?[​](#where-should-i-publish-my-provider-artifact "Direct link to Where should I publish my provider artifact?")

You should publish your provider on the appropriate package management repository for your language, keeping in mind the [naming conventions](https://openfeature.dev/docs/reference/concepts/provider#naming-recommendations). Our [contrib repositories](https://github.com/orgs/open-feature/repositories?q=contrib&type=all&language=&sort=) publish all their artifacts as part of their release processes.