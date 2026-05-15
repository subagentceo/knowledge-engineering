

# Welcome to the Amazon Chime SDK API Reference
<a name="welcome"></a>

The Amazon Chime SDK application programming interface (API) is designed for developers to build real-time media applications that can send and receive audio and video and allow content sharing. The Amazon Chime SDK works independently of any Amazon Chime administrator accounts and does not affect meetings hosted on Amazon Chime. Instead, the Amazon Chime SDK provides builder tools that you can use to build your own meeting applications. This API reference provides detailed information about the actions, data types, parameters, and errors included in the Amazon Chime SDK service.

For more information about the Amazon Chime SDK, see [Using the Amazon Chime SDK](https://docs.aws.amazon.com/chime-sdk/latest/dg/meetings-sdk.html) in the *Amazon Chime SDK Developer Guide*. For more information about administering the Amazon Chime SDK, see the [Amazon Chime SDK Administrator Guide](https://docs.aws.amazon.com/chime-sdk/latest/ag/).

You can use an AWS SDK, the AWS Command Line Interface (AWS CLI), or the REST API to make API calls for the Amazon Chime SDK. We recommend using an AWS SDK or the AWS CLI. The page for each API action contains a *See Also* section that includes links to information about using the action with a language-specific AWS SDK or the AWS CLI.

Using an AWS SDK  
You don't need to write code to calculate a signature for request authentication. The SDK clients authenticate your requests by using access keys that you provide. For more information about AWS SDKs, see the [AWS Developer Center](https://aws.amazon.com/developer/). 

Using the AWS CLI  
Use your access keys with the AWS CLI to make API calls. For information about setting up the AWS CLI, see [Installing the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) in the *AWS Command Line Interface User Guide*. For a list of Amazon Chime commands, see the [Amazon Chime commands](https://docs.aws.amazon.com/cli/latest/reference/chime/index.html) in the *AWS CLI Command Reference*. For a list of Amazon Chime SDK Identity commands, see the [Amazon Chime commands](https://docs.aws.amazon.com/cli/latest/reference/chime-sdk-identity/index.html) in the *AWS CLI Command Reference*. For a list of Amazon Chime SDK Meetings commands, see the [Amazon Chime commands](https://docs.aws.amazon.com/cli/latest/reference/chime-sdk-meetings/index.html) in the *AWS CLI Command Reference*. For a list of Amazon Chime SDK Messaging commands, see the [Amazon Chime commands](https://docs.aws.amazon.com/cli/latest/reference/chime-sdk-messaging/index.html) in the *AWS CLI Command Reference*.

Using REST APIs  
If you use REST to make API calls, you must authenticate your request by providing a signature. Amazon Chime SDK supports Signature Version 4. For more information, see [Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) in the *AWS General Reference*.  
When making REST API calls, use the service name `chime` and REST endpoint `https://service.chime.aws.amazon.com`.

Administrative permissions are controlled using AWS Identity and Access Management (IAM). For more information, see [AWS Identity and Access Management for Amazon Chime](https://docs.aws.amazon.com/chime-sdk/latest/ag/security-iam.html) in the *Amazon Chime SDK Administration Guide*.

## Amazon Chime SDK Identity
<a name="chime-sdk-identity"></a>

The Amazon Chime SDK Identity APIs in this section let software developers to create and manage unique instances of their messaging applications. These APIs provide the overarching framework for creating and sending messages. For more information about the identity APIs, refer to [Amazon Chime SDK Identity](https://docs.aws.amazon.com/chime-sdk/latest/APIReference/API_Operations_Amazon_Chime_SDK_Identity.html).

## Amazon Chime SDK Media Pipelines
<a name="chime-sdk-media-pipelines"></a>

The Amazon Chime SDK Media Pipeline APIs in this section let software developers to create Amazon Chime SDK media pipelines and capture audio, video, events, and data messages from Amazon Chime SDK meetings. For more information about media pipelines APIs, see [Amazon Chime SDK Media Pipelines](https://docs.aws.amazon.com/chime-sdk/latest/APIReference/API_Operations_Amazon_Chime_SDK_Media_Pipelines.html).

## Amazon Chime SDK Meetings
<a name="chime-sdk-meetings"></a>

The Amazon Chime SDK Meetings APIs in this section let software developers to create Amazon Chime SDK meetings, set the AWS Regions for meetings, create and manage users, and send and receive meeting notifications. For more information about the meeting APIs, see [Amazon Chime SDK Meetings](https://docs.aws.amazon.com/chime-sdk/latest/APIReference/API_Operations_Amazon_Chime_SDK_Meetings.html).

## Amazon Chime SDK Messaging
<a name="chime-sdk-messaging"></a>

The Amazon Chime SDK Messaging APIs in this section let software developers send and receive messages in custom messaging applications. These APIs depend on the frameworks provided by the Amazon Chime SDK Identity APIs. For more information about the messaging APIs, see [Amazon Chime SDK Messaging](https://docs.aws.amazon.com/chime-sdk/latest/APIReference/API_Operations_Amazon_Chime_SDK_Messaging.html).

## Amazon Chime SDK Voice
<a name="chime-sdk-voice"></a>

The Amazon Chime SDK Voice APIs enable software developers to add telephony capabilties to their custom communication solutions. You use these APIs with SIP infrastructure and Amazon Chime SDK Voice Connectors. For more information, see [Amazon Chime SDK Voice](https://docs.aws.amazon.com/chime-sdk/latest/APIReference/API_Operations_Amazon_Chime_SDK_Voice.html).