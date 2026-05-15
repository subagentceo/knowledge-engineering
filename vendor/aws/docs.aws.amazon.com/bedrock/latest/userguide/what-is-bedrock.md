

# Overview
<a name="what-is-bedrock"></a>

Amazon Bedrock is a fully managed service that provides secure, enterprise-grade access to [high-performing foundation models](models.md) from leading AI companies, enabling you to build and scale generative AI applications.

## Quickstart
<a name="quickstart"></a>

Read the [Quickstart](getting-started.md) to write your first API call using Amazon Bedrock in under five minutes.

------
#### [ Messages API ]

```
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="anthropic.claude-opus-4-7",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Can you explain the features of Amazon Bedrock?"}]
)
print(response)
```

------
#### [ Responses API ]

```
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="openai.gpt-oss-120b",
    input="Can you explain the features of Amazon Bedrock?"
    )
print(response)
```

------
#### [ Chat Completions API ]

```
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="openai.gpt-oss-120b",
    messages=[{"role": "user", "content": "Can you explain the features of Amazon Bedrock?"}]
    )
print(response)
```

------
#### [ Converse API ]

```
import boto3

client = boto3.client('bedrock-runtime', region_name='us-east-1')
response = client.converse(
    modelId='anthropic.claude-opus-4-7',
    messages=[
        {
            'role': 'user',
            'content': [{'text': 'Can you explain the features of Amazon Bedrock?'}]
        }
    ]
)
print(response)
```

------
#### [ Invoke API ]

```
import json
import boto3

client = boto3.client('bedrock-runtime', region_name='us-east-1')
response = client.invoke_model(
    modelId='anthropic.claude-opus-4-7',
    body=json.dumps({
            'anthropic_version': 'bedrock-2023-05-31',
            'messages': [{ 'role': 'user', 'content': 'Can you explain the features of Amazon Bedrock?'}],
            'max_tokens': 1024
    })
 )
 print(json.loads(response['body'].read()))
```

------

## Supported models
<a name="featured-models"></a>

Bedrock supports [100\+ foundation models](models.md) from industry-leading providers, including Amazon, Anthropic, DeepSeek, Moonshot AI, MiniMax, and OpenAI.


|  |  |  |  |  |  | 
| --- |--- |--- |--- |--- |--- |
| ![](http://docs.aws.amazon.com/bedrock/latest/userguide/images/what-is/nova2pro.png)**Nova 2** | ![Orange rounded square icon with white radial loading spinner design.](http://docs.aws.amazon.com/bedrock/latest/userguide/images/what-is/claude.png)**Claude Opus 4.6** | ![](http://docs.aws.amazon.com/bedrock/latest/userguide/images/what-is/deepseek.png)**Deepseek 3.2** | ![](http://docs.aws.amazon.com/bedrock/latest/userguide/images/what-is/kimik2.5.png)**Kimi K2.5** | ![](http://docs.aws.amazon.com/bedrock/latest/userguide/images/what-is/minimax2.1.png)**MiniMax M2.1** | ![](http://docs.aws.amazon.com/bedrock/latest/userguide/images/models/openai.png)**GPT-OSS-20B** | 

## What's new?
<a name="whats-new"></a>
+ **[Claude Opus 4.7 now available in Amazon Bedrock](https://aws.amazon.com/about-aws/whats-new/2026/04/claude-opus-4.7-amazon-bedrock/)**: Anthropic's most capable Opus model to date, delivering improvements across agentic coding, professional work, and long-running tasks.
+ **[Claude Mythos Preview (Gated Research Preview)](https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-bedrock-claude-mythos/)**: Anthropic's most advanced AI model with state-of-the-art capabilities across cybersecurity, software coding, and complex reasoning tasks. Available in gated preview in US East (N. Virginia).
+ **[Cost allocation by IAM user and role](https://aws.amazon.com/about-aws/whats-new/2026/04/bedrock-iam-cost-allocation/)**: Amazon Bedrock now supports cost allocation by IAM principal in AWS Cost and Usage Report 2.0 and Cost Explorer, enabling customers to attribute model inference costs across users, teams, and projects.
+ **Anthropic's Claude 4.6 now available on Amazon Bedrock**: [Claude Sonnet 4.6](https://aws.amazon.com/about-aws/whats-new/2026/02/claude-sonnet-4.6-available-in-amazon-bedrock/) and [Claude Opus 4.6](https://aws.amazon.com/about-aws/whats-new/2026/2/claude-opus-4.6-available-amazon-bedrock/) are now available on Amazon Bedrock.

## Start Building
<a name="start-building"></a>


|  |  | 
| --- |--- |
|  ![Cloud icon with bidirectional arrows indicating sync or data transfer.](http://docs.aws.amazon.com/bedrock/latest/userguide/images/what-is/apis.jpg)  | Explore the [APIs supported by Amazon Bedrock](apis.md) and [Endpoints supported by Amazon Bedrock](endpoints.md) supported by Amazon Bedrock. | 
|  ![Wrench and screwdriver icon on purple background.](http://docs.aws.amazon.com/bedrock/latest/userguide/images/what-is/build.jpg)  | Build using the [Making inference requests](inference.md) operations provided by Amazon Bedrock. | 
|  ![](http://docs.aws.amazon.com/bedrock/latest/userguide/images/what-is/customize.png)  | Customize your models to improve performance and quality. [Customize your model to improve its performance for your use case](custom-models.md) | 