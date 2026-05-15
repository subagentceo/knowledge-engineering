# Generative Custom Operators

> \[!IMPORTANT]
>
> Generative Custom Operators are currently available as a Public Beta product and information contained in this document is subject to change. This means that some of the features aren't yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products aren't covered by a Twilio Service Level Agreement. Learn more about Twilio's beta product support [here](https://help.twilio.com/articles/115002413087-Twilio-Beta-Product-Support).

**Generative Custom Operators** allow you to use freeform instructions to analyze conversation transcripts in Conversation Intelligence (classic). Because these Language Operators are Large Language Model (LLM) backed, they are capable of handling a wide range of sophisticated natural language understanding tasks with high degrees of accuracy.

https://www.youtube.com/watch?v=9XruSxDmqI8

With Generative Custom Operators, simply describe the meaning you would like to extract from transcripts. Conversation Intelligence (classic) will send your prompt along with the transcript to the LLM, and return the results of the analysis as an [Operator Result](/docs/conversation-intelligence-classic/api/transcript-operator-results-subresource) for you to consume in downstream systems.

Examples of valuable use cases for Generative Custom Operators include:

* **Intent Recognition**: Identify and categorize the intent of the customer during the interaction.
* **Conversation Scoring**: Assign an overall score based on agent performance against specified criteria.
* **Entity Extraction**: Pull out a value of interest from a conversation based on the context.
* **Tailored Summaries**: Structure conversation summaries in a format that is best suited for your business.
* **Script Adherence**: Determine whether an agent 'stuck to the script' in a comprehensive way, not just individual phrases or sections.
* **Lead Qualification**: Use buying signals to classify leads into categories like 'Hot', 'Warm', or 'Cold'.

Generative Custom Operators currently use OpenAI GPT-4o-mini as the underlying LLM. For more information on the model and how the data is handled, please refer to our [AI Nutrition Fact Label for OpenAI](/docs/conversation-intelligence-classic/ai-nutrition-fact-labels#openai-gpt-4o-mini).

For workflows subject to HIPAA using Conversation Intelligence (classic) for Voice as a HIPAA Eligible Service, Generative Custom Operators currently use Azure OpenAI as the underlying LLM. For more information on the model and how the data is handled, please refer to our [AI Nutrition Label for Azure OpenAI](/docs/conversation-intelligence-classic/ai-nutrition-fact-labels#azure-openai).

## Prerequisites

Generative Custom Operators apply LLM-backed language analysis to Conversation Intelligence (classic) Transcripts. This guide assumes that you have already:

1. [Created a **Intelligence Service**](/docs/conversation-intelligence-classic/onboarding#create-an-intelligence-service).
2. [Set up **Transcription** of Voice Calls](/docs/conversation-intelligence-classic/onboarding#create-an-intelligence-service) either through auto-transcribe or by using the REST API.
3. \[Optional] [Have one or more **completed transcripts**](/docs/conversation-intelligence-classic/onboarding#view-completed-transcriptions) in your Intelligence Service.

Completing Step 3 is strongly recommended as it will allow you to use the [**preview results**](#preview-results) feature of Generative Custom Operators – testing your draft prompt with previous transcripts before saving your new Language Operator.

## Create Generative Custom Operator in Console

![Interface for creating a generative custom operator with scoring criteria and transcript preview.](https://docs-resources.prod.twilio.com/dc15e8eb69fe9137f861fda02f005f1e38a75fd13aa9d4dac4cd66d2600e669f.png)

The simplest way to create a Generative Custom Operator is using the Twilio Console:

* Navigate to the [Conversation Intelligence (classic) product](https://console.twilio.com/us1/develop/conversational-intelligence/overview)
* Click **Services** in the sidebar
* Select an existing **Intelligence Service**, or create a new one
  * *Note*: The Service you select should be the same service containing the transcripts you'd like the Generative Custom Operator to analyze
* Click the **Create Custom Operator** button
* Select **Generative** as your operator type

This will launch the Generative Custom Operator creation wizard in Console, guiding you through the creation process.

### Write prompt

The prompt for your Generative Custom Operator provides instructions for the LLM to analyze incoming transcripts. In the textbox, explain what you would like to achieve, being specific and including key requirements for how you'd like the LLM to behave.

Please see the sections on:

* [**Best Practices**](#prompting-best-practices) for prompt writing
* [**Example Use Cases**](#example-use-cases) for more inspiration on the types of prompts you can write.

*Important notes on prompting*:

* The maximum allowable prompt length is **4,000 characters**, or roughly 600-1000 words
* Generative Custom Operators can be used to analyze transcripts in [all languages supported by Conversation Intelligence (classic)](/docs/conversation-intelligence-classic/onboarding#supported-languages)
* In addition, **your prompt can be written in a different language than the transcripts it will analyze**. For example, while the transcripts might be in Spanish, you can write the prompt in English

### Preview results

The Console wizard for Generative Custom Operators provides the ability to preview operator results before it is finalized. This is a useful way to test the prompt you've written, ensuring that it yields the intended results.

![Custom operator prompt creation with criteria for scoring transcripts and preview results options.](https://docs-resources.prod.twilio.com/74b91ac7e1b9ae8993f34eacebea34d5aa52117fae57b98034b5f9b9b78754e1.png)

To preview your Generative Custom Operator, find the *preview operator results* pane on the right side of the Console wizard. Click the **choose test transcript button** and choose a previously transcribed conversation to use to test your prompt. Be sure to choose a transcript that is as close as possible to the type of interaction you would expect to happen in production, once the Operator has been created. This will give the most realistic preview of "real-world" operator results.

Once a desired test transcript is selected, click the **preview operator results** button to run your Operator. Once complete, you will see the results returned by the LLM.

If the results weren't what you expected:

1. **Iterate on your prompt**: Revise your prompt, being sure to take into consideration our [prompting best practices](#prompting-best-practices).
2. **Try a different transcript**: It may be the underlying conversation data itself that is yielding a particular operator result. A different transcript may produce different results.
3. **Use Advanced Settings**: [Advanced Settings](#advanced-settings) provide additional options for customizing operator results, including output formatting controls and providing training examples to the LLM.

> \[!NOTE]
>
> * Previewing Generative Custom Operator results is **currently available only in the Console**.
> * Transcripts **must already be created in your Intelligence Service** to use them for preview.
> * If you don't have any transcripts, you can first use the [transcribe recent recordings](https://console.twilio.com/us1/develop/conversational-intelligence/transcripts?transcribeRecent=true) feature or [create Transcript API](/docs/conversation-intelligence-classic/api/transcript-resource#create-a-new-transcript) to generate a transcript to test with, then return to create your Operator.

Once you're content with your prompt, click **Next** and review the summary of your Generative Custom Operator. If everything looks good, click **Submit** to save your new Operator.

### Adding to a Service

The final step is to add your new Generative Custom Operator to an Intelligence Service. This will allow you to use the Operator to analyze transcripts in that Service.

Upon successful creation of your Generative Custom Operator, you will be redirected to the Operator list page for your service.

To add your new Operator to a Service:

* Find your recently created Operator in the list. It will be labeled with type equal to **Generative operator**
* Click **+Add** to apply it to your Service

Great! Your new Generative Custom Operator will now execute with each new Transcript uploaded to this Intelligence Service.

## Create Generative Custom Operator with the REST API

The Intelligence REST API can be used to create Generative Custom Operators in addition to the Console. There are a few key parameters to include when creating a Generative Custom Operator:

`POST  https://intelligence.twilio.com/v2/Operators/Custom`

Encoding type: `application/x-www-form-urlencoded`

**Request Parameters:**

| Parameter                   | Type     | Definition                                                                                                                                                                                                                                                                  |
| --------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FriendlyName`              | `string` | A human-readable name of this Operator, up to 64 characters.                                                                                                                                                                                                                |
| `OperatorType`              | `string` | For Generative Custom Operators, this should be set to `Generative` or `GenerativeJSON` based on your desired output format of the Operator results. <ul><li>Use `Generative` for plain text output</li><br /><li>Use `GenerativeJSON` for JSON-formatted output.</li></ul> |
| `Config`                    | `object` | The configuration object for the Operator.                                                                                                                                                                                                                                  |
| `Config.prompt`             | `string` | The instructions for the LLM to analyze the transcripts.                                                                                                                                                                                                                    |
| `Config.json_result_schema` | `object` | For `GenerativeJSON` Operators only. This is the JSON schema object that the LLM will use to format the results. For more details on how to construct this object, please see the section on [JSON output format](#json-output-format).                                     |
| `Config.examples`           | `array`  | Optional array of training examples to provide context and specificity to the LLM. For more details on how to construct this object, please see the section on [training examples](#training-examples).                                                                     |

### Example request

Below is a simple example of a request to create a basic Generative Custom Operator using the API:

Create a Generative Custom Operator with Text Output

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCustomOperator() {
  const customOperator = await client.intelligence.v2.customOperators.create({
    config: {
      prompt:
        "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
    },
    friendlyName: "LeadGeneration",
    operatorType: "Generative",
  });

  console.log(customOperator.accountSid);
}

createCustomOperator();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

custom_operator = client.intelligence.v2.custom_operators.create(
    friendly_name="LeadGeneration",
    operator_type="Generative",
    config={
        "prompt": "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n"
    },
)

print(custom_operator.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var customOperator = await CustomOperatorResource.CreateAsync(
            friendlyName: "LeadGeneration",
            operatorType: "Generative",
            config: new Dictionary<string, Object>() {
                { "prompt",
                  "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n" }
            });

        Console.WriteLine(customOperator.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import java.util.Map;
import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.CustomOperator;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomOperator customOperator =
            CustomOperator
                .creator("LeadGeneration",
                    "Generative",
                    new HashMap<String, Object>() {
                        {
                            put("prompt",
                                "You are labeling the conversations between a customer and a virtual agent.  Your job "
                                + "is to label the transcript below with one of these labels based on the "
                                + "description\nLabels\nWARM -  A customer who has shown interest in our products and "
                                + "offerings. They may not be open to schedule an appointment at this point or commit "
                                + "to more specifics.\nHOT - A qualified lead is someone who understands what we can "
                                + "offer and are willing to commit. They are more likely to result in a sale. A "
                                + "customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold "
                                + "lead is the one that is not interested or has lost interest in the product and "
                                + "offering.\n");
                        }
                    })
                .create();

        System.out.println(customOperator.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	intelligence "github.com/twilio/twilio-go/rest/intelligence/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &intelligence.CreateCustomOperatorParams{}
	params.SetFriendlyName("LeadGeneration")
	params.SetOperatorType("Generative")
	params.SetConfig(map[string]interface{}{
		"prompt": "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
	})

	resp, err := client.IntelligenceV2.CreateCustomOperator(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$custom_operator = $twilio->intelligence->v2->customOperators->create(
    "LeadGeneration", // FriendlyName
    "Generative", // OperatorType
    [
        "prompt" =>
            "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
    ] // Config
);

print $custom_operator->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

custom_operator = @client
                  .intelligence
                  .v2
                  .custom_operators
                  .create(
                    friendly_name: 'LeadGeneration',
                    operator_type: 'Generative',
                    config: {
                      'prompt' => 'You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description
Labels
WARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.
HOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.
COLD - A cold lead is the one that is not interested or has lost interest in the product and offering.
'
                    }
                  )

puts custom_operator.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:operators:custom:create \
   --friendly-name LeadGeneration \
   --operator-type Generative \
   --config "{\"prompt\":\"You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\\nLabels\\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\\n\"}"
```

```bash
CONFIG_OBJ=$(cat << EOF
{
  "prompt": "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n"
}
EOF
)
curl -X POST "https://intelligence.twilio.com/v2/Operators/Custom" \
--data-urlencode "FriendlyName=LeadGeneration" \
--data-urlencode "OperatorType=Generative" \
--data-urlencode "Config=$CONFIG_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "LYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "LeadGeneration",
  "description": "New Operator",
  "author": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "operator_type": "Generative",
  "version": 1,
  "availability": "public",
  "config": {
    "prompt": "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n"
  },
  "date_created": "2010-08-31T20:36:28Z",
  "date_updated": "2010-08-31T20:36:28Z",
  "url": "https://intelligence.twilio.com/v2/Operators/Custom/LYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### Adding to a Service

Once the Generative Custom Operator has been created via the API, **it must also be added to an Intelligence Service** to be used for analyzing transcripts.

Please see the [Operator Attachment API docs](/docs/conversation-intelligence-classic/api/operator-attachment-subresource#create-an-operator-attachment) for instructions on how to do this.

You will need the `OperatorSid` of the newly created Operator to attach it to a Service. This can be found in the response to the Operator creation API request above.

## Advanced settings

Advanced settings provide increased configurability for Generative Custom Operators. Two advanced settings are available: **JSON Output Format** and **Training Examples**.

### JSON output format

Generative Custom Operators allow you to specify the output format that best suits your needs. By default, the LLM will return an unstructured text response. However, you can **optionally choose to structure the Operator Result output by providing a [JSON schema](https://json-schema.org/docs) that the LLM will use to format the results**. JSON schema is a powerful standard for defining the structure of the data you expect to receive from the LLM. It allows you to specify the property names and data types for each property, as well as any constraints or requirements for the properties.

When using JSON output format, the LLM will return results that adhere to the schema you provide. This can be useful for ensuring that the output is structured in a way that is easy to consume by downstream systems or for more complex analysis.

#### Structuring your JSON schema

A JSON Schema for Generative Custom Operator results is passed as an object. At minimum, a valid JSON results schema object will include the following keywords:

* `type` : Must be set to `"object"`
* `properties` : An object containing the property names and their data types you would like the LLM to return

Here's a simple example of a valid JSON object used for a tailored summarization use case that can be passed as `json_result_schema` parameter when creating the `GenerativeJSON` operator:

```json {title="Sample JSON result schema for tailored summary use case"}
{
    "type": "object",
    "properties": {
        "budget": { "type": "string" },
        "authority": { "type": "string" },
        "need": { "type": "string" },
        "timeline": { "type": "string" }
    }
}
```

> \[!NOTE]
>
> * For additional JSON result schema examples, please see the section on [example use cases](#example-use-cases).
> * We also suggest using this [JSON Schema Generator](https://transform.tools/json-to-json-schema) to help create your schema from a desired JSON object result.
> * To review all available JSON Schema syntax, visit the [reference docs](https://json-schema.org/understanding-json-schema/reference)

Additional notes on JSON output formatting:

* The root level `type` of a JSON schema **must** be set to `object`
* The following property data types are supported : `string`, `number`, `boolean`, `integer`, `object`, `array`, `enum`, `anyOf`
* Max **100 object properties** and **5 levels of nesting** are supported
* Max **500 enum values** across all enum properties are supported
* Notable JSON Schema keywords not supported include:
  * **For strings**: `minLength`, `maxLength`, `pattern`, `format`
  * **For numbers**: `minimum`, `maximum`, `multipleOf`
  * **For objects**: `patternProperties`, `unevaluatedProperties`, `propertyNames`, `minProperties`, `maxProperties`
  * **For arrays**: `unevaluatedItems`, `contains`, `minContains`, `maxContains`, `minItems`, `maxItems`, `uniqueItems`
* Structured Operator Results will be returned in the same order as the ordering of keys in the schema
* In the event an Operator execution request is refused for safety reasons the Operator Result API response will include a new field called `refusal` to indicate that the LLM refused to fulfill the request
* Twilio will automatically set `additionalProperties` to `false` and specify all provided fields as `required` (constraints of Structured Outputs). You don't need to pass these fields as part of your JSON schema. Twilio will automatically overwrite any user-provided values for these fields.

#### Use the Console to create a Generative Custom Operator with JSON output

You can include a custom JSON output format when you create your Operator in the Console. From the **Create your prompt** page, click **Advanced Settings**. Under **Output format**, select **JSON schema** which allows you to provide a JSON schema:

![Advanced settings for JSON schema output format with example structure.](https://docs-resources.prod.twilio.com/6724267438480a38f30a5fed072938c7c71e3ca0c45d3921041529d8c4935ec4.png)

#### Use the API to create a Generative Custom Operator with JSON output

You can use the API to create an Operator that produces a structured JSON output format.

To use the REST API to create a Generative Custom Operator with JSON output, in addition to the standard fields, you must:

* Set `OperatorType` to `GenerativeJSON`.
* Set `Config.json_result_schema` parameter to the JSON schema you'd like the LLM to adhere to.

An example request can be found below:

Create a Generative Custom Operator with JSON output

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCustomOperator() {
  const customOperator = await client.intelligence.v2.customOperators.create({
    config: {
      prompt:
        "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
      json_result_schema: {
        type: "object",
        properties: {
          label: {
            type: "string",
          },
        },
      },
    },
    friendlyName: "SalesLeadClassification",
    operatorType: "GenerativeJSON",
  });

  console.log(customOperator.accountSid);
}

createCustomOperator();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

custom_operator = client.intelligence.v2.custom_operators.create(
    friendly_name="SalesLeadClassification",
    operator_type="GenerativeJSON",
    config={
        "prompt": "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
        "json_result_schema": {
            "type": "object",
            "properties": {"label": {"type": "string"}},
        },
    },
)

print(custom_operator.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var customOperator = await CustomOperatorResource.CreateAsync(
            friendlyName: "SalesLeadClassification",
            operatorType: "GenerativeJSON",
            config: new Dictionary<string, Object>() {
                { "prompt",
                  "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n" },
                { "json_result_schema",
                  new Dictionary<string, Object>() {
                      { "type", "object" },
                      { "properties",
                        new Dictionary<string, Object>() {
                            { "label", new Dictionary<string, Object>() { { "type", "string" } } }
                        } }
                  } }
            });

        Console.WriteLine(customOperator.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import java.util.Map;
import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.CustomOperator;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomOperator customOperator =
            CustomOperator
                .creator("SalesLeadClassification",
                    "GenerativeJSON",
                    new HashMap<String, Object>() {
                        {
                            put("prompt",
                                "You are labeling the conversations between a customer and a virtual agent.  Your job "
                                + "is to label the transcript below with one of these labels based on the "
                                + "description\nLabels\nWARM -  A customer who has shown interest in our products and "
                                + "offerings. They may not be open to schedule an appointment at this point or commit "
                                + "to more specifics.\nHOT - A qualified lead is someone who understands what we can "
                                + "offer and are willing to commit. They are more likely to result in a sale. A "
                                + "customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold "
                                + "lead is the one that is not interested or has lost interest in the product and "
                                + "offering.\n");
                            put("json_result_schema", new HashMap<String, Object>() {
                                {
                                    put("type", "object");
                                    put("properties", new HashMap<String, Object>() {
                                        {
                                            put("label", new HashMap<String, Object>() {
                                                {
                                                    put("type", "string");
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    })
                .create();

        System.out.println(customOperator.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	intelligence "github.com/twilio/twilio-go/rest/intelligence/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &intelligence.CreateCustomOperatorParams{}
	params.SetFriendlyName("SalesLeadClassification")
	params.SetOperatorType("GenerativeJSON")
	params.SetConfig(map[string]interface{}{
		"prompt": "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
		"json_result_schema": map[string]interface{}{
			"type": "object",
			"properties": map[string]interface{}{
				"label": map[string]interface{}{
					"type": "string",
				},
			},
		},
	})

	resp, err := client.IntelligenceV2.CreateCustomOperator(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$custom_operator = $twilio->intelligence->v2->customOperators->create(
    "SalesLeadClassification", // FriendlyName
    "GenerativeJSON", // OperatorType
    [
        "prompt" =>
            "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
        "json_result_schema" => [
            "type" => "object",
            "properties" => [
                "label" => [
                    "type" => "string",
                ],
            ],
        ],
    ] // Config
);

print $custom_operator->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

custom_operator = @client
                  .intelligence
                  .v2
                  .custom_operators
                  .create(
                    friendly_name: 'SalesLeadClassification',
                    operator_type: 'GenerativeJSON',
                    config: {
                      'prompt' => 'You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description
Labels
WARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.
HOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.
COLD - A cold lead is the one that is not interested or has lost interest in the product and offering.
',
                      'json_result_schema' => {
                        'type' => 'object',
                        'properties' => {
                          'label' => {
                            'type' => 'string'
                          }
                        }
                      }
                    }
                  )

puts custom_operator.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:operators:custom:create \
   --friendly-name SalesLeadClassification \
   --operator-type GenerativeJSON \
   --config "{\"prompt\":\"You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\\nLabels\\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\\n\",\"json_result_schema\":{\"type\":\"object\",\"properties\":{\"label\":{\"type\":\"string\"}}}}"
```

```bash
CONFIG_OBJ=$(cat << EOF
{
  "prompt": "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
  "json_result_schema": {
    "type": "object",
    "properties": {
      "label": {
        "type": "string"
      }
    }
  }
}
EOF
)
curl -X POST "https://intelligence.twilio.com/v2/Operators/Custom" \
--data-urlencode "FriendlyName=SalesLeadClassification" \
--data-urlencode "OperatorType=GenerativeJSON" \
--data-urlencode "Config=$CONFIG_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### Training examples

In addition to specifying the output format, you can also provide training examples. Examples can help improve Operator results by contextualizing and clarifying as well as signaling intent and adding specificity to your request. These examples should consist of a sample input and the corresponding expected output. The LLM will use these examples to better understand the task you are asking it to perform.

#### Use the Console to Create a Generative Custom Operator with training examples

You can add training examples when you create your Operator in the Console. From the **Create your prompt** page, click **Advanced Settings**. Under **Training examples**, provide one or more sample conversation inputs and outputs to feed to the LLM:

![Training examples section with input and expected JSON output fields.](https://docs-resources.prod.twilio.com/70e71f95d945bb042ace8c4bfcd16869de3e0f56a5780ad2747bbfeb46c4068d.png)

#### Use the API to Create a Generative Custom Operator with training examples

Training examples can be passed in the `Config` object of either `Generative` or `GenerativeJSON` Custom Operators. The `examples` parameter should be an array of objects, each containing an `input` and `output` key:

* `input`: Provide a transcript snippet for the LLM to use as an example conversation
* `output`: Provide what you would expect the LLM to output for the given transcript snippet

Below is an example of a simple `examples` array:

```json
"examples": [
    {
        "input": "This is an example sentence which qualifies the lead as HOT.",
        "output": "HOT"
    }
]
```

An example full request to the API can be found below:

Create a Generative Custom Operator

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCustomOperator() {
  const customOperator = await client.intelligence.v2.customOperators.create({
    config: {
      prompt:
        "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
      examples: [
        {
          input: "This is an example sentence which qualifies the lead as HOT.",
          output: "HOT",
        },
      ],
    },
    friendlyName: "LeadGeneration",
    operatorType: "Generative",
  });

  console.log(customOperator.accountSid);
}

createCustomOperator();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

custom_operator = client.intelligence.v2.custom_operators.create(
    friendly_name="LeadGeneration",
    operator_type="Generative",
    config={
        "prompt": "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
        "examples": [
            {
                "input": "This is an example sentence which qualifies the lead as HOT.",
                "output": "HOT",
            }
        ],
    },
)

print(custom_operator.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var customOperator = await CustomOperatorResource.CreateAsync(
            friendlyName: "LeadGeneration",
            operatorType: "Generative",
            config: new Dictionary<string, Object>() {
                { "prompt",
                  "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n" },
                { "examples",
                  new List<Object> { new Dictionary<string, Object>() {
                      { "input", "This is an example sentence which qualifies the lead as HOT." },
                      { "output", "HOT" }
                  } } }
            });

        Console.WriteLine(customOperator.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.CustomOperator;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomOperator customOperator =
            CustomOperator
                .creator("LeadGeneration",
                    "Generative",
                    new HashMap<String, Object>() {
                        {
                            put("prompt",
                                "You are labeling the conversations between a customer and a virtual agent.  Your job "
                                + "is to label the transcript below with one of these labels based on the "
                                + "description\nLabels\nWARM -  A customer who has shown interest in our products and "
                                + "offerings. They may not be open to schedule an appointment at this point or commit "
                                + "to more specifics.\nHOT - A qualified lead is someone who understands what we can "
                                + "offer and are willing to commit. They are more likely to result in a sale. A "
                                + "customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold "
                                + "lead is the one that is not interested or has lost interest in the product and "
                                + "offering.\n");
                            put("examples", Arrays.asList(new HashMap<String, Object>() {
                                {
                                    put("input", "This is an example sentence which qualifies the lead as HOT.");
                                    put("output", "HOT");
                                }
                            }));
                        }
                    })
                .create();

        System.out.println(customOperator.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	intelligence "github.com/twilio/twilio-go/rest/intelligence/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &intelligence.CreateCustomOperatorParams{}
	params.SetFriendlyName("LeadGeneration")
	params.SetOperatorType("Generative")
	params.SetConfig(map[string]interface{}{
		"prompt": "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
		"examples": []interface{}{
			map[string]interface{}{
				"input":  "This is an example sentence which qualifies the lead as HOT.",
				"output": "HOT",
			},
		},
	})

	resp, err := client.IntelligenceV2.CreateCustomOperator(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$custom_operator = $twilio->intelligence->v2->customOperators->create(
    "LeadGeneration", // FriendlyName
    "Generative", // OperatorType
    [
        "prompt" =>
            "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
        "examples" => [
            [
                "input" =>
                    "This is an example sentence which qualifies the lead as HOT.",
                "output" => "HOT",
            ],
        ],
    ] // Config
);

print $custom_operator->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

custom_operator = @client
                  .intelligence
                  .v2
                  .custom_operators
                  .create(
                    friendly_name: 'LeadGeneration',
                    operator_type: 'Generative',
                    config: {
                      'prompt' => 'You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description
Labels
WARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.
HOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.
COLD - A cold lead is the one that is not interested or has lost interest in the product and offering.
',
                      'examples' => [
                        {
                          'input' => 'This is an example sentence which qualifies the lead as HOT.',
                          'output' => 'HOT'
                        }
                      ]
                    }
                  )

puts custom_operator.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:operators:custom:create \
   --friendly-name LeadGeneration \
   --operator-type Generative \
   --config "{\"prompt\":\"You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\\nLabels\\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\\n\",\"examples\":[{\"input\":\"This is an example sentence which qualifies the lead as HOT.\",\"output\":\"HOT\"}]}"
```

```bash
CONFIG_OBJ=$(cat << EOF
{
  "prompt": "You are labeling the conversations between a customer and a virtual agent.  Your job is to label the transcript below with one of these labels based on the description\nLabels\nWARM -  A customer who has shown interest in our products and offerings. They may not be open to schedule an appointment at this point or commit to more specifics.\nHOT - A qualified lead is someone who understands what we can offer and are willing to commit. They are more likely to result in a sale. A customer who schedules an appointment is also considered HOT lead.\nCOLD - A cold lead is the one that is not interested or has lost interest in the product and offering.\n",
  "examples": [
    {
      "input": "This is an example sentence which qualifies the lead as HOT.",
      "output": "HOT"
    }
  ]
}
EOF
)
curl -X POST "https://intelligence.twilio.com/v2/Operators/Custom" \
--data-urlencode "FriendlyName=LeadGeneration" \
--data-urlencode "OperatorType=Generative" \
--data-urlencode "Config=$CONFIG_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Prompting best practices

In order to ensure the consistent results from your Generative Custom Operators, it is helpful to use prompting best practices. The prompt is the instructions for the LLM, so it is essential to make sure those instructions are well understood. Below are a few best practices for constructing a successful prompt:

1. **Specify the Task Clearly and Use Explicit Instructions**: Clearly state what you want the model to do and specify the style or format of the response. This reduces ambiguity and ensures that the model provides the desired output.

> \[!NOTE]
>
> Instead of asking "Tell me about this customer," specify "Provide a concise summary the customers needs with regard to moving and storage."

2. **Include Context**: Providing relevant context can help the model generate relevant and coherent responses, especially in complex queries.

> \[!NOTE]
>
> "Given our company's emphasis on recurring revenue over one-time purchases, how strong of a lead is this prospect?"

3. **Ask Specific Questions and Limit Open-Ended Inputs**: Formulate precise questions to elicit clear and focused responses. Narrow the scope to avoid broad or vague answers.

> \[!NOTE]
>
> "What are three key factors this customer is looking for in an insurance provider?"

4. **Break Down Complex Tasks**: For complex or multi-step tasks, consider breaking them into simpler, sequential prompts.

> \[!NOTE]
>
> * "Step 1: List the key moments in this conversation."
> * "Step 2: Compare these with the following script."

5. **Use Examples to Guide Format**: Offering a sample response can set expectations for the type and style of answer you anticipate.

> \[!NOTE]
>
> "Describe the key features the customer wants in a car. For instance, 'The customer is looking for a sports car with low mileage and a good infotainment system.'"

Note that if you have multiple examples to illustrate how you would like the LLM to respond, you can use the [Training Examples](#training-examples) feature to provide these in a structured way.

6. **Provide Constraints When Necessary**: Introducing constraints like word limits or particular formats can help control the output.

> \[!NOTE]
>
> "Summarize the conversation in 100 words or fewer."

## Example use cases

### Conversation scoring

**Sample Prompt**:<br />
*Assign the interaction a score from 1-5 based on the performance of the agent and provide a one sentence rationale for your score. Evaluate based on the following criteria:*

* *Professionalism: Was the agent friendly, clear, and professional?*
* *Problem-Solving: Did the agent resolve the issue efficiently?*
* *Overall Experience: Was the customer satisfied, and was the conversation handled well?*

**Output Format**: Text

**Sample Result**:<br />
`Score: 5`<br />
`Rationale: The agent was courteous, provided clear explanations, & efficiently resolved the issue.`

### Intent recognition

**Sample Prompt**:<br />
*Identify the primary intent of the customer during this interaction. Categorize the intent into one of the following predefined categories: Technical Support, Billing Inquiry, Product Feedback, General Inquiry.*

**Output Format**: Text

**Sample Result**:<br />
`Billing Inquiry`

### Competitor insight

**Sample Prompt**:<br />
*Identify a competitor mentioned in the conversation along with the product or service they offer and the reason for comparison.*

**Output Format**: Text

**Sample Result**:<br />
`Owl Shoes - MaxH Running Shoes: Customer is comparing comfort and durability.`

### Extract order numbers

**Sample Prompt**:<br />
*Extract the customer's order number mentioned either by the customer or agent in the interaction. Use numerals for the numbers included in the order number, and capitalize the letters. Also, add a dash in between the first three and final four characters.*

**Output Format**: Text

**Sample Result**:<br />
`180-A84S`

### Agent script adherence

**Sample Prompt**:<br />
*Review the transcript and evaluate whether the agent adhered to the required script. Check for the presence of key statements:*

* *Greeting & Identification (25%) – Did the agent introduce themselves and the company?*
* *Disclosure Statement (25%) – Did the agent provide the mandatory disclosure?*
* *Resolution Steps (30%) – Did the agent follow the prescribed resolution process?*
* *Closing & Next Steps (20%) – Did the agent summarize the resolution and offer further assistance?*

*Also provide a concise score reason explaining your assigned score.*

**Output Format**: JSON

**JSON Schema**:<br />

```json
{
    "type": "object",
    "properties": {
        "greeting": { "type": "boolean" },
        "disclosure_statements": { "type": "boolean" },
        "resolution_steps": { "type": "boolean" },
        "closing_next_steps": { "type": "boolean" },
        "score": { "type": "string" },
        "score_reason": { "type": "string" }
    }
}
```

**Sample Result**:<br />

```json
{
    "greeting": true,
    "disclosure_statements": false,
    "resolution_steps": true,
    "closing_next_steps": true,
    "score": "75%",
    "score_reason": "Partial compliance. Missing required disclosure."
}
```

### Lead qualification

**Sample Prompt**:<br />
*Detect strong buying signals in sales conversations, such as pricing inquiries, purchase timeline discussions, and objections that suggest high interest. Classify the lead's likelihood to close.*

**Output Format**: JSON

**JSON Schema**:<br />

```json
{
    "type": "object",
    "properties": {
        "buying_signals": { "type": "string" },
        "confidence_score": { "type": "number" },
        "lead_category": { "type": "string" }
    }
}
```

**Sample Result**:<br />

```json
  {
    "buying_signal": "Asked about annual pricing discounts & contract cancellation terms",
    "confidence_score": 0.9,
    "lead_category": "Hot"
  }
```

### Inflammatory content detection

**Sample Prompt**:<br />
*Use the following parameters to evaluate the conversation between the agent and the customer for inflammatory content:*

* *Hostile Language: Did the agent or customer use any language that could be considered aggressive, rude, or hostile? (e.g., yelling, insults, threats, etc.) (Yes/No)*
* *Personal Attacks: Was there any instance of personal attacks, insults, or discriminatory remarks made by either party? (Yes/No)*
* *Offensive Language*: Did the agent or customer use profanity or offensive language during the conversation? (Yes/No)\*

**Output Format**: JSON

**JSON Schema**:<br />

```json
{
    "type": "object",
    "properties": {
        "aggressive_hostile_language": { "type": "string", "enum": ["yes", "no"] },
        "personal_attacks": { "type": "string", "enum": ["yes", "no"] },
        "profanity_offensive_language": { "type": "string", "enum": ["yes", "no"] }
    }
}
```

**Sample Result**:<br />

```json
{
  "aggressive_hostile_language": "no",
  "personal_attacks": "no",
  "profanity_offensive_language": "yes" 
}
```

### Tailored summaries

**Sample Prompt**:<br />
*Summarize sales conversations in a custom format designed for sales workflows, using the BANT framework:*

* *Budget: Does the customer have a budget allocated for the solution?*
* *Authority: Is the customer the decision-maker?*
* *Need: What problem is the customer trying to solve?*
* *Timeline: When does the customer need the solution in place?*

**Output Format**: JSON

**JSON Schema**:<br />

```json
{
    "type": "object",
    "properties": {
        "budget": { "type": "string" },
        "authority": { "type": "string" },
        "need": { "type": "string" },
        "timeline": { "type": "string" }
    }
}
```

**Sample Result**:<br />

```json
{
  "budget": "$50,000 annually, subject to change based on features.",
  "authority": "Customer is leading the evaluation, but the CTO has final approval.",
  "need": "Improve customer support by managing inbound calls and messages more effectively.",
  "timeline": "Implementation needed by Q1 next year."
}
```

## Retrieving Operator Results

Like all Language Operators, Generative Custom Operators will execute immediately following successful creation of a Transcript. Operator results can be retrieved in two ways:

1. In **Console**
2. Using the **REST API**

### Console

Generative Custom Operator Results are visible on the Transcript Viewer in Console.

To view Operator Results in Console:

* Visit the [Transcripts page](https://console.twilio.com/us1/develop/conversational-intelligence/transcripts)
* Select your Transcript where the Generative Custom Operator has run

On the Transcript Viewer, you will see the **Language Operator Results** on the right pane alongside the transcript text. You will see the Friendly Name of your Generative Custom Operator along with the Operator Results.

### REST API

Generative Custom Operator results can be retrieved using the [Transcript Operator Results API](/docs/conversation-intelligence-classic/api/transcript-operator-results-subresource). This is often preferable for consuming Operator Results in downstream systems.

In the response to the Operator Results API request, you will receive an array of `operator_results`. The `operator_results` property contains an array of results of the analyses from the Intelligence Service's attached Language Operators.

The format of the Generative Custom Operator Result object will depend on whether you created a `Generative` or `GenerativeJSON` Operator type.

> \[!NOTE]
>
> For complete reference docs on the `GET` Transcript Operator Results API, please see [here](/docs/conversation-intelligence-classic/api/transcript-operator-results-subresource).

#### Generative Operator Results (Returns Text)

The results from the LLM will be returned in the `text_generation_results` object. Specifically, `text_generation_results.result` will contain the generated text response from the LLM.

Below is a simplified example of the Operator Result object for a `Generative` Custom Operator:

```json
// !mark(7:10)
{
    "name": "GenerativeOperator",
    "url": "https://intelligence.twilio.com/v2/Transcripts/GTXXX/OperatorResults/LYXXX",
    "operator_sid": "LYXXX",
    "transcript_sid": "GTXXX",
    "operator_type": "text-generation",
    "text_generation_results": {
        "result": "three bedroom apartment",
        "format": "text"
    }
}
```

> \[!NOTE]
>
> Some fields have been omitted for brevity. The full response will include additional fields set to `null` or be empty arrays/objects.

Importantly, this object will be returned as one of several `operator_results` objects in the response to the Operator Results API request.

The full API request/response will use the following format:

`GET https://intelligence.twilio.com/v2/Transcripts/GTXXX/OperatorResults/LYXXX `

**Response**:

```json
// !mark(3:13)
{
  "operator_results": [
    {
        "name": "GenerativeOperator",
        "url": "https://intelligence.twilio.com/v2/Transcripts/GTXXX/OperatorResults/LYXXX",
        "operator_sid": "LYXXX",
        "transcript_sid": "GTXXX",
        "operator_type": "text-generation",
        "text_generation_results": {
            "result": "three bedroom apartment",
            "format": "text"
        }
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://intelligence.twilio.com/v2/Transcripts/GTXXX/OperatorResults?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://intelligence.twilio.com/v2/Transcripts/GTXXX/OperatorResults?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "operator_results"
  }
}
```

#### GenerativeJSON Operator Results (JSON output)

The `operator_results` object for a `GenerativeJSON` Operator type will look slightly different, and return the Operator Result in accordance with the [JSON schema](#json-output-format) provided during Operator creation.

Specifically, the JSON will be returned as the `json_results` object.

Below is a simplified example of the Operator Result object for a `GenerativeJSON` Custom Operator:

```json
// !mark(4:8)
{
    "name": "GenerativeJSONOperator",
    "url": "https://intelligence.twilio.com/v2/Transcripts/GTXXX/OperatorResults/LYXXX",
    "json_results": {
        "age": 30,
        "favorite_number": 7,
        "hair_color": "blonde"
    },
    "operator_sid": "LYXXX",
    "transcript_sid": "GTXXX",
    "operator_type": "json"
}
```

> \[!NOTE]
>
> Some fields have been omitted for brevity. The full response will include additional fields that are set to `null` or are empty arrays or objects.

Importantly, this object will be returned as one of several `operator_results` objects in the response to the Operator Results API request.

The full API request/response will use the following format:

`GET https://intelligence.twilio.com/v2/Transcripts/GTXXX/OperatorResults/LYXXX `

**Response**:

```json
// !mark(3:14)
{
  "operator_results": [
    {
        "name": "GenerativeJSONOperator",
        "url": "https://intelligence.twilio.com/v2/Transcripts/GTXXX/OperatorResults/LYXXX",
        "json_results": {
            "age": 30,
            "favorite_number": 7,
            "hair_color": "blonde"
        },
        "operator_sid": "LYXXX",
        "transcript_sid": "GTXXX",
        "operator_type": "json"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://intelligence.twilio.com/v2/Transcripts/GTXXX/OperatorResults?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://intelligence.twilio.com/v2/Transcripts/GTXXX/OperatorResults?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "operator_results"
  }
}
```

## PII redaction

For customers with PII redaction enabled on their Intelligence Service, **it isn't currently possible to view Generative Custom Operator results with PII redacted**. Fetching Generative Custom Operator Results for a redacted transcript will return an entirely redacted value by default.

Below is an example of what the Operator Results API response will look like if PII redaction is enabled by default:

```json
"text_generation_results": {
    "result": "[Redacted: GenerativeOperatorFriendlyName]",
    "format": "text"
}
```

To view Generative Custom Operator results for redacted transcript it is necessary to set the `Redacted` Query Parameter equal to `false` to return the original unredacted Operator Results.

Example:
`GET https://intelligence.twilio.com/v2/Transcripts/{TranscriptSid}/OperatorResults/?Redacted=false`

For more information on fetching Generative Custom Operator Results, please see the [Transcript Operator Results API documentation](/docs/conversation-intelligence-classic/api/transcript-operator-results-subresource)

> \[!NOTE]
>
> By setting `Redacted` equal to `false`, there may be PII returned in this request.

## Understanding billing

Unlike the previous generation of language operators, Generative Custom Operators will be billed **based on characters included in the *input to* and *output from* the LLM**.

* **Input**: includes all information sent to the LLM to generate a response
* **Output**: The actual results returned by the LLM

Please see [Twilio Voice Pricing](https://www.twilio.com/en-us/voice/pricing/us) for the amounts billed per 1k characters.

### Input characters

There are three main components of the billable input character count:

1. **Transcript**: The transcription of the conversation itself required for the LLM to perform conversational analysis. For voice calls, we estimate roughly 800-1000 characters per 1 minute of call recording time.
2. **User prompt**: The instructions to the LLM that you provide. This is inclusive of the prompt itself (spaces included), plus training examples and the JSON output format, if using those advanced settings.
3. **System prompt**: Additional metadata provided by Twilio required for the LLM to execute successfully. We estimate this to be between 100-200 characters per operator execution, on average.

To estimate the number of input characters per operator execution, simply add your average transcript character count to user and system prompt characters. A simple example with conservative figures:

* 2m transcript = 2000 characters
* User prompt = 630 characters
* System prompt = 200 characters
* Total = **2830 characters**

### Output characters

Output character count is straightforward – it is limited to the data returned by the LLM when your Generative Custom Operator runs. The character count of the output will be determined based on a combination of:

* The instructions you provide in the prompt
* The output format you specify (text or JSON)

The best way to estimate output character count is either to preview your operator results during creation, or look at actual Operator Results.
