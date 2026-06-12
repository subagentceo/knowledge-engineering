# Evaluation API

The Evaluation API is the primary component of OpenFeature that _application authors_ interact with. The Evaluation API allows developers to evaluate feature flags to alter control flow and application characteristics.

## Setting a Provider​

Before you can start evaluating flags, you must set a _provider_. The provider is the translation layer between the evaluation API and the flag system you use.

*   TypeScript
*   Java
*   C#
*   Go
*   PHP
*   Python

```
import { OpenFeature } from '@openfeature/server-sdk';OpenFeature.setProvider(new YourProviderOfChoice());
```

```
import dev.openfeature.javasdk.OpenFeatureAPI;OpenFeatureAPI api = OpenFeatureAPI.getInstance();api.setProvider(new YourProviderOfChoice());
```

```
using OpenFeature;Api.Instance.SetProvider(new YourProviderOfChoice());
```

```
openfeature.SetProvider(MyFeatureProvider{})
```

```
use OpenFeature\OpenFeatureAPI;OpenFeatureAPI::getInstance()->setProvider(new YourProviderOfChoice());
```

```
import openfeature.apiopenfeature.api.set_provider(YourProviderOfChoice())
```

## Creating a client​

The OpenFeature client is a lightweight abstraction used to evaluate feature flags. If your application is small, you may use a single client for your whole application. In larger applications, it may be helpful to create multiple clients, each with different configuration to fit the needs of different sub-modules. Clients may also be created dynamically, per each HTTP request, for instance.

*   TypeScript
*   Java
*   C#
*   Go
*   PHP
*   Python

```
const client = OpenFeature.getClient('my-app');
```

```
Client client = api.getClient("my-app");
```

```
var client = Api.Instance.GetClient("my-app");
```

```
client := openfeature.NewClient("my-app")
```

```
$client = OpenFeatureAPI::getInstance()->getClient("my-app");
```

```
import openfeature.apiopenfeature.api.get_client("my-app")
```

## Flag Evaluation​

### Basic Evaluation​

The client can be used to do basic flag evaluation, which simply returns flag values of a particular type. The default value must also be specified. In the case of any error during flag evaluation, the default value will be returned, so give consideration to your default values!

*   TypeScript
*   Java
*   C#
*   Go
*   PHP
*   Python

```
// get a bool valueconst boolValue = await client.getBooleanValue('boolFlag', false);// get a string valueconst stringValue = await client.getStringValue('stringFlag', 'default');// get an numeric valueconst numberValue = await client.getNumberValue('intFlag', 1);// get an object valueconst object = await client.getObjectValue<MyObject>('objectFlag', {});
```

```
// get a boolean valueBoolean boolValue = client.getBooleanValue("boolFlag", false);// get a string valueString stringValue = client.getStringValue("stringFlag", "default");// get an integer valueInteger intValue = client.getIntegerValue("intFlag", 1);// get a double valueDouble doubleValue = client.getDoubleValue("doubleFlag", 0.9);// get an object valueValue objectValue = client.getObjectValue("objectFlag", MyObjectInstance);
```

```
// get a boolean valuevar boolValue = await client.GetBooleanValue("boolFlag", false);// get a string valuevar stringValue = await client.GetStringValue("stringFlag", "default");// get an integer valuevar intValue = await client.GetIntegerValue("intFlag", 1);// get an double valuevar doubleValue = await client.GetDoubleValue("doubleFlag", 1);// get an object valuevar objectValue = await client.GetObjectValue("objectFlag", MyObjectInstance);
```

```
// get a boolean valueboolValue, err := client.BooleanValue(context.Background(), "boolFlag", false, openfeature.EvaluationContext{})// get a string valuestringValue, err := client.StringValue(context.Background(), "stringFlag", "default", openfeature.EvaluationContext{})// get an integer valueintValue, err := client.IntValue(context.Background(), "intFlag", 1, openfeature.EvaluationContext{})// get a float valuefloatValue, err := client.FloatValue(context.Background(), "floatFlag", 3.14, openfeature.EvaluationContext{})// get an object valueobjectValue, err := client.ObjectValue(context.Background(), "objectFlag", myObject, openfeature.EvaluationContext{})
```

```
// get a boolean value$boolValue = $client->getBooleanValue("boolFlag", false, null, null);// get a string value$stringValue = $client->getStringValue("stringFlag", "default", null, null);// get an integer value$intValue = $client->getIntegerValue("intFlag", 1, null, null);// get a float value$floatValue = $client->getFloatValue("floatFlag", 0.9, null, null);// get an object value$objectValue = $client->getObjectValue("objectFlag", $myObjectInstance, null, null);
```

```
# get a boolean valuevalue = client.get_boolean_value("boolFlag", False)# get a string valuevalue = client.get_string_value("stringFlag", "default")# get an integer valuevalue = client.get_integer_value("intFlag", 1)# get a float valuevalue = client.get_float_value("floatFlag", 0.9)# get an object valuevalue = client.get_object_value("objectFlag", my_object_instance)
```

### Detailed Evaluation​

In addition to basic evaluation, _detailed evaluation_ methods are available. These return the value, as well as additional metadata about the flag evaluation in the _Evaluation Details_ structure.

#### Evaluation Details Structure Fields​

Field

Description

flag key

the unique identifier for a feature flag

value

the value returned from a flag evaluation

reason (optional)

a string explaining why the flag value was returned

variant (optional)

the variant associated with the return flag value

flag metadata (optional)

a key-value structure which supports definition of arbitrary properties

error code (optional)

an error code that categorizes flag evaluation errors

error message (optional)

a string detailing the error

*   TypeScript
*   Java
*   C#
*   Go
*   PHP
*   Python

```
// get details of boolean evaluationconst boolDetails = await client.getBooleanDetails('boolFlag', false);// get details of string evaluationconst stringDetails = await client.getStringDetails('stringFlag', 'default');// get details of numeric evaluationconst numberDetails = await client.getNumberDetails('intFlag', 1);// get details of object evaluationconst objectDetails = await client.getObjectDetails<MyObject>('objectFlag', {});
```

```
// get details of boolean evaluationFlagEvaluationDetails<Boolean> boolDetails = client.getBooleanDetails("boolFlag", false);// get details of string evaluationFlagEvaluationDetails<String> stringDetails = client.getStringDetails("stringFlag", "default");// get details of integer evaluationFlagEvaluationDetails<Integer> intDetails = client.getIntegerDetails("intFlag", 1);// get details of double evaluationFlagEvaluationDetails<Double> doubleDetails = client.getDoubleDetails("doubleFlag", .9);// get details of object evaluationFlagEvaluationDetails<Value> objectDetails = client.getObjectDetails<MyObject>("objectFlag", myObjectDefaultInstance);
```

```
// get details of boolean evaluationvar boolDetails = await client.GetBooleanDetails("boolFlag", false);// get details of string evaluationvar stringDetails = await client.GetStringDetails("stringFlag", "default");// get details of int evaluationvar intDetails = await client.GetIntegerDetails("intFlag", 1);// get details of double evaluationvar doubleDetails = await client.GetDoubleDetails("doubleFlag", 1);// get details of object evaluationvar objectDetails = await client.GetObjectDetails("objectFlag", myObjectDefaultInstance);
```

```
// get details of boolean evaluationboolDetails, err := client.BooleanValueDetails(context.Background(), "boolFlag", false, openfeature.EvaluationContext{})// get details of string evaluationstringDetails, err := client.StringValueDetails(context.Background(), "stringFlag", "default", openfeature.EvaluationContext{})// get details of integer evaluationintDetails, err := client.IntValueDetails(context.Background(), "intFlag", 1, openfeature.EvaluationContext{})// get details of float evaluationfloatDetails, err := client.FloatValueDetails(context.Background(), "floatFlag", 3.14, openfeature.EvaluationContext{})// get details of object evaluationobjectDetails, err := client.ObjectValueDetails(context.Background(), "objectFlag", myObject, openfeature.EvaluationContext{})
```

```
// get details of a boolean evaluation$boolDetails = $client->getBooleanDetails("boolFlag", false, null, null);// get details of a string evaluation$stringDetails = $client->getStringDetails("stringFlag", "default", null, null);// get details of an integer evaluation$intDetails = $client->getIntegerDetails("intFlag", 1, null, null);// get details of a float evaluation$floatDetails = $client->getFloatDetails("floatFlag", 0.9, null, null);// get details of an object evaluation$objectDetails = $client->getObjectDetails("objectFlag", $myObjectInstance, null, null);
```

```
# get details of boolean evaluationdetails = client.get_boolean_details("boolFlag", false);# get details of string evaluationdetails = client.get_string_details("stringFlag", "default");# get details of an integer evaluationdetails = client.get_integer_details("intFlag", 1);# get details of a float evaluationdetails = client.get_float_details("floatFlag", 1);# get details of object evaluationdetails = client.get_object_details("objectFlag", {});
```