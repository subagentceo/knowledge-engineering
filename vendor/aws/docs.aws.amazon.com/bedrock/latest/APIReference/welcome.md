

# Amazon Bedrock API Reference
<a name="welcome"></a>

This document provides detailed information about the Bedrock API actions and their parameters. For more information about setting up the Amazon Bedrock APIs, see [Set up the Amazon Bedrock API](https://docs.aws.amazon.com/bedrock/latest/userguide/api-setup.html).

## Amazon Bedrock endpoints
<a name="endpoints"></a>

To connect programmatically to an AWS service, you use an endpoint. Refer to the [Amazon Bedrock endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/bedrock.html) chapter in the AWS General Reference for information about the endpoints that you can use for Amazon Bedrock.

Amazon Bedrock provides the following service endpoints.
+ `bedrock` – Contains control plane APIs for managing, training, and deploying models. For more information, see [Amazon Bedrock Actions](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_Operations_Amazon_Bedrock.html) and [Amazon Bedrock Data Types](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_Types_Amazon_Bedrock.html).
+ `bedrock-runtime` – Contains data plane APIs for making inference requests for models hosted in Amazon Bedrock. For more information, see [Amazon Bedrock Runtime Actions](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_Operations_Amazon_Bedrock_Runtime.html) and [Amazon Bedrock Runtime Data Types](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_Types_Amazon_Bedrock_Runtime.html).
+ `bedrock-agent` – Contains control plane APIs for creating and managing agents, knowledge bases, prompt management, and prompt flows. For more information, see [Amazon Bedrock Agents Actions](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_Operations_Amazon_Bedrock_Agents.html) and [Amazon Bedrock Agents Data Types](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_Types_Amazon_Bedrock_Agents.html).
+ `bedrock-agent-runtime` – Contains data plane APIs for invoking agents and flows, and querying knowledge bases. For more information, see [Amazon Bedrock Agents Runtime Actions](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_Operations_Amazon_Bedrock_Agents_Runtime.html) and [Amazon Bedrock Agents Runtime Data Types](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_Types_Amazon_Bedrock_Agents_Runtime.html).

**Note**  
Check that you're using the correct endpoint when making an API request.

## AWS Command Line Interface references
<a name="cli"></a>

Refer to the following references for AWS CLI commands and operations:
+ [Amazon Bedrock CLI commands](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/bedrock/index.html)
+ [Amazon Bedrock Runtime CLI commands](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/bedrock-runtime/index.html)
+ [Amazon Bedrock Agents CLI commands](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/bedrock-agent/index.html)
+ [Amazon Bedrock Agents Runtime CLI commands](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/bedrock-agent-runtime/index.html)

## AWS SDK references
<a name="sdk"></a>

AWS software development kits (SDKs) are available for many popular programming languages. Each SDK provides an API, code examples, and documentation that make it easier for developers to build applications in their preferred language. SDKs automatically perform useful tasks for you, such as:
+ Cryptographically sign your service requests
+ Retry requests
+ Handle error responses

Refer to the following table to find general information about and code examples for each SDK, as well as the Amazon Bedrock API references for each SDK. You can also find code examples at [Code examples for Amazon Bedrock using AWS SDKs](https://docs.aws.amazon.com/bedrock/latest/userguide/service_code_examples.html).


****  

| SDK documentation | Code examples | Amazon Bedrock prefix | Amazon Bedrock runtime prefix | Amazon Bedrock Agents prefix | Amazon Bedrock Agents runtime prefix | 
| --- | --- | --- | --- | --- | --- | 
| [AWS SDK for C\+\+](https://docs.aws.amazon.com/sdk-for-cpp) | [AWS SDK for C\+\+ code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/cpp) | [bedrock](https://sdk.amazonaws.com/cpp/api/LATEST/aws-cpp-sdk-bedrock/html/annotated.html) | [bedrock-runtime](https://sdk.amazonaws.com/cpp/api/LATEST/aws-cpp-sdk-bedrock-runtime/html/annotated.html) | [bedrock-agent](https://sdk.amazonaws.com/cpp/api/LATEST/aws-cpp-sdk-bedrock-agent/html/annotated.html) | [bedrock-agent-runtime](https://sdk.amazonaws.com/cpp/api/LATEST/aws-cpp-sdk-bedrock-agent-runtime/html/annotated.html) | 
| [AWS SDK for Go](https://docs.aws.amazon.com/sdk-for-go) | [AWS SDK for Go code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/gov2) | [bedrock](https://docs.aws.amazon.com/sdk-for-go/api/service/bedrock/) | [bedrockruntime](https://docs.aws.amazon.com/sdk-for-go/api/service/bedrockruntime/) | [bedrockagent](https://docs.aws.amazon.com/sdk-for-go/api/service/bedrockagent/) | [bedrockagentruntime](https://docs.aws.amazon.com/sdk-for-go/api/service/bedrockagentruntime/) | 
| [AWS SDK for Java](https://docs.aws.amazon.com/sdk-for-java) | [AWS SDK for Java code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javav2) | [bedrock](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/bedrock/package-summary.html) | [bedrockruntime](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/bedrockruntime/package-summary.html) | [bedrockagent](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/bedrockagent/package-summary.html) | [bedrockagentruntime](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/bedrockagentruntime/package-summary.html) | 
| [AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript) | [AWS SDK for JavaScript code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3) | [bedrock](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock/) | [bedrock-runtime](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock-runtime/) | [bedrock-agent](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock-agent/) | [bedrock-agent-runtime](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock-agent-runtime/) | 
| [AWS SDK for Kotlin](https://docs.aws.amazon.com/sdk-for-kotlin) | [AWS SDK for Kotlin code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/kotlin) | [bedrock](https://sdk.amazonaws.com/kotlin/api/latest/bedrock/index.html) | [bedrockruntime](https://sdk.amazonaws.com/kotlin/api/latest/bedrockruntime/index.html) | [bedrockagent](https://sdk.amazonaws.com/kotlin/api/latest/bedrockagent/index.html) | [bedrockagentruntime](https://sdk.amazonaws.com/kotlin/api/latest/bedrockagentruntime/index.html) | 
| [AWS SDK for .NET](https://docs.aws.amazon.com/sdk-for-net) | [AWS SDK for .NET code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/dotnetv3) | [Bedrock](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/Bedrock/NBedrock.html) | [BedrockRuntime](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/BedrockRuntime/NBedrockRuntime.html) | [BedrockAgent](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/BedrockAgent/NBedrockAgent.html) | [BedrockAgentRuntime](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/BedrockAgentRuntime/NBedrockAgentRuntime.html) | 
| [AWS SDK for PHP](https://docs.aws.amazon.com/sdk-for-php) | [AWS SDK for PHP code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/php) | [Bedrock](https://docs.aws.amazon.com/aws-sdk-php/v3/api/namespace-Aws.Bedrock.html) | [BedrockRuntime](https://docs.aws.amazon.com/aws-sdk-php/v3/api/namespace-Aws.BedrockRuntime.html) | [BedrockAgent](https://docs.aws.amazon.com/aws-sdk-php/v3/api/namespace-Aws.BedrockAgent.html) | [BedrockAgentRuntime](https://docs.aws.amazon.com/aws-sdk-php/v3/api/namespace-Aws.BedrockAgentRuntime.html) | 
| [AWS SDK for Python (Boto3)](https://docs.aws.amazon.com/pythonsdk) | [AWS SDK for Python (Boto3) code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/python) | [bedrock](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock.html) | [bedrock-runtime](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html) | [bedrock-agent](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-agent.html) | [bedrock-agent-runtime](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-agent-runtime.html) | 
| [AWS SDK for Ruby](https://docs.aws.amazon.com/sdk-for-ruby) | [AWS SDK for Ruby code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/ruby) | [Bedrock](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/Bedrock.html) | [BedrockRuntime](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/BedrockRuntime.html) | [BedrockAgent](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/BedrockAgent.html) | [BedrockAgentRuntime](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/BedrockAgent.html) | 
| [AWS SDK for Rust](https://docs.aws.amazon.com/sdk-for-rust) | [AWS SDK for Rust code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/rust_dev_preview) | [aws-sdk-bedrock](https://docs.rs/aws-sdk-bedrock/latest/aws_sdk_bedrock/) | [aws-sdk-bedrockruntime](https://docs.rs/aws-sdk-bedrockruntime/latest/aws_sdk_bedrockruntime/) | [aws-sdk-bedrockagent](https://docs.rs/aws-sdk-bedrockagent/latest/aws_sdk_bedrockagent/) | [aws-sdk-bedrockagentruntime](https://docs.rs/aws-sdk-bedrockagentruntime/latest/aws_sdk_bedrockagentruntime/) | 
| [AWS SDK for SAP ABAP](https://docs.aws.amazon.com/sdk-for-sapabap) | [AWS SDK for SAP ABAP code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/sap-abap) | [BDK](https://docs.aws.amazon.com/sdk-for-sap-abap/v1/api/latest/bdk/index.html) | [BDR](https://docs.aws.amazon.com/sdk-for-sap-abap/v1/api/latest/bdr/index.html) | [BDA](https://docs.aws.amazon.com/sdk-for-sap-abap/v1/api/latest/bda/index.html) | [BDZ](https://docs.aws.amazon.com/sdk-for-sap-abap/v1/api/latest/bdz/index.html) | 
| [AWS SDK for Swift](https://docs.aws.amazon.com/sdk-for-swift) | [AWS SDK for Swift code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/swift) | [AWSBedrock](https://sdk.amazonaws.com/swift/api/awsbedrock/0.34.0/documentation/awsbedrock) | [AWSBedrockRuntime](https://sdk.amazonaws.com/swift/api/awsbedrockruntime/0.34.0/documentation/awsbedrockruntime) | [AWSBedrockAgent](https://sdk.amazonaws.com/swift/api/awsbedrockagent/0.34.0/documentation/awsbedrockagent) | [AWSBedrockAgentRuntime](https://sdk.amazonaws.com/swift/api/awsbedrockagentruntime/0.34.0/documentation/awsbedrockagentruntime) | 

**Topics**