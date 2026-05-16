# Evaluation Context

The [_evaluation context_](/specification/glossary#evaluation-context) is a container for arbitrary contextual data that can be used as a basis for dynamic evaluation. Static data such as the host or an identifier for the application can be configured globally. Dynamic evaluation context, such as the IP address of the client in a web application, can be implicitly propagated or explicitly passed to during flag evaluation, and can be merged with static values.

## Providing Evaluation Context[​](#providing-evaluation-context "Direct link to Providing Evaluation Context")

### Dynamic Context Implementations (Server-side SDKs)[​](#dynamic-context-implementations-server-side-sdks "Direct link to Dynamic Context Implementations (Server-side SDKs)")

In [server-side SDKs](/docs/reference/concepts/sdk-paradigms#dynamic-context-paradigm-server-side-sdks), values relevant for flag evaluation can be included in the evaluation context at multiple points: globally (on the top level API), on the client, and at the point of flag evaluation (invocation).

-   TypeScript
-   Java
-   C#
-   Go
-   PHP
-   Python

```
// add a value to the global contextOpenFeature.setContext({ myGlobalKey: 'myGlobalValue' });// add a value to the client contextconst client = OpenFeature.getClient();client.setContext({ myClientKey: 'myClientValue' });// add a value to the invocation contextconst context: EvaluationContext = {  myInvocationKey: 'myInvocationValue',};const boolValue = await client.getBooleanValue('boolFlag', false, context);
```

```
// add a value to the global contextOpenFeatureAPI api = OpenFeatureAPI.getInstance();api.setEvaluationContext(new MutableContext().add("myGlobalKey", "myGlobalValue"));// add a value to the client contextClient client = api.getClient();client.setEvaluationContext(new MutableContext().add("myClientKey", "myClientValue"));// add a value to the invocation contextEvaluationContext context = new MutableContext();context.addStringAttribute("myInvocationKey", "myInvocationValue")Boolean boolValue = client.getBooleanValue("boolFlag", false, context);
```

```
// add a value to the global contextApi api = Api.Instance;api.SetContext(new EvaluationContextBuilder().Set("myGlobalKey", "myGlobalValue").Build());// add a value to the client contextFeatureClient client = api.GetClient();client.SetContext(new EvaluationContextBuilder().Set("myClientKey", "myClientValue").Build());// add a value to the invocation contextvar context = new EvaluationContext()    .Set("myInvocationKey", "myInvocationValue")    .Build();var boolValue = await client.GetBooleanValue("boolFlag", false, context);
```

```
// add a value to the global contextopenfeature.SetEvaluationContext(openfeature.NewEvaluationContext(    "",    map[string]interface{}{        "myGlobalKey":  "myGlobalValue",    },))// add a value to the client contextclient := openfeature.NewClient("my-app")client.SetEvaluationContext(openfeature.NewEvaluationContext(    "",     map[string]interface{}{        "myGlobalKey":  "myGlobalValue",    },))// add a value to the invocation contextevalCtx := openfeature.NewEvaluationContext(    "",    map[string]interface{}{        "myInvocationKey": "myInvocationValue",    },)boolValue, err := client.BooleanValue("boolFlag", false, evalCtx)
```

```
// add a value to the global context$api = OpenFeatureAPI.getInstance();$api->setEvaluationContext(new EvaluationContext("targetingKey", ["myGlobalKey" => "myGlobalValue"]));// add a value to the client context$client = $api->getClient();$client->setEvaluationContext(new EvaluationContext("targetingKey", ["myClientKey" => "myClientValue"]));// add a value to the invocation context$context = new EvaluationContext("targetingKey", ["myInvocationKey" => "myInvocationValue"]);$boolValue = $client->getBooleanValue("boolFlag", false, $context);
```

```
# add a value to the global contextimport openfeature.apicontext = EvaluationContext("targetingKey", {"myGlobalKey": "myGlobalValue"})openfeature.api.set_evaluation_context(context)# add a value to the client contextclient = api.get_client()context = EvaluationContext("targetingKey", {"myClientKey": "myClientValue"})client.set_evaluation_context(context)# add a value to the invocation contextcontext = EvaluationContext("targetingKey", {"myInvocationKey": "myInvocationValue"})bool_value = client.get_boolean_value("boolFlag", False, context)
```

#### Context merging[​](#context-merging "Direct link to Context merging")

At the point of flag evaluation, the evaluation context is merged, and duplicate values are overwritten as defined in the [specification](/specification/sections/evaluation-context#32-context-levels-and-merging).

### Static Context Implementations (Client-side SDKs)[​](#static-context-implementations-client-side-sdks "Direct link to Static Context Implementations (Client-side SDKs)")

In [client-side SDKs](/docs/reference/concepts/sdk-paradigms#static-context-paradigms-client-side-sdks), values relevant for flag evaluation are set on the OpenFeature API object. In these implementations, this is an asynchronous operation associated with [provider reconciliation](/docs/reference/concepts/sdk-paradigms#static-context-paradigms-client-side-sdks).

-   TypeScript

```
// add a value to the contextawait OpenFeature.setContext({ myUserData: 'myUserValue' });// the context is used for all feature flag evaluations automatically.const boolValue = await client.getBooleanValue('boolFlag', false);
```

## Circular structures in Evaluation Context[​](#circular-structures-in-evaluation-context "Direct link to Circular structures in Evaluation Context")

Many providers serialize the evaluation context as part of their operation. Be careful not to include circular structures in the evaluation context to avoid serialization issues.

## Targeting Key[​](#targeting-key "Direct link to Targeting Key")

Many feature flag management systems require an identifier for the subject of flag evaluation. For many feature flag systems this is required in order to perform fractional evaluation or percentage-based rollouts deterministically. In the case of web applications or mobile apps, the subject is frequently an end user, but in other cases it could be a service or client application. The `evaluation context` includes an optional `targeting key` field for this purpose. The targeting key should contain a string uniquely identifying the subject (i.e.: a UUID, a hash of some user attribute such as an email, or the hostname of an application or service). Some [providers](/docs/reference/concepts/provider) may require this field to be set to function correctly.

## Personally Identifiable Information (PII) Considerations[​](#personally-identifiable-information-pii-considerations "Direct link to Personally Identifiable Information (PII) Considerations")

Be thoughtful in your inclusion of personal data in the `evaluation context`. Such data is useful for targeting and dynamic evaluation, but you should consider how the [provider](/docs/reference/concepts/provider) in use may handle or persist this data. Hooks (specifically hooks implementing the _before_ stage) can be useful to restrict, filter or anonymize data in the `evaluation context`.