

**End of support notice**: On February 20, 2026, AWS will end support for the Amazon Chime service. After February 20, 2026, you will no longer be able to access the Amazon Chime console or Amazon Chime application resources. For more information, visit the [blog post](https://aws.amazon.com/blogs/messaging-and-targeting/update-on-support-for-amazon-chime/). **Note:** This does not impact the availability of the [Amazon Chime SDK service](https://aws.amazon.com/chime/chime-sdk/).

# Welcome to the Amazon Chime API Reference
<a name="welcome"></a>

The Amazon Chime application programming interface (API) is designed for administrators to perform key tasks, such as creating and managing Amazon Chime accounts, users, and Voice Connectors. This guide provides detailed information about the Amazon Chime API, including operations, types, inputs and outputs, and error codes.

You can use an AWS SDK, the AWS Command Line Interface (AWS CLI), or the REST API to make API calls for Amazon Chime. We recommend using an AWS SDK or the AWS CLI. The page for each API action contains a *See Also* section that includes links to information about using the action with a language-specific AWS SDK or the AWS CLI.

**Important**  
The Amazon Chime SDK Identity, Media Pipelines, Meetings, and Messaging APIs are now published on the new *Amazon Chime SDK API Reference*. For more information, see the [Amazon Chime SDK API Reference](https://docs.aws.amazon.com//chime-sdk/latest/APIReference/).

Using an AWS SDK  
 You don't need to write code to calculate a signature for request authentication. The SDK clients authenticate your requests by using access keys that you provide. For more information about AWS SDKs, see the [AWS Developer Center](https://aws.amazon.com/developer/). 

Using the AWS CLI  
Use your access keys with the AWS CLI to make API calls. For information about setting up the AWS CLI, see [Installing the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) in the *AWS Command Line Interface User Guide*. For a list of available Amazon Chime commands, see the [Amazon Chime commands](https://docs.aws.amazon.com/cli/latest/reference/chime/index.html) in the *AWS CLI Command Reference*. 

Using REST APIs  
If you use REST to make API calls, you must authenticate your request by providing a signature. Amazon Chime supports Signature Version 4. For more information, see [Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) in the *Amazon Web Services General Reference*.  
When making REST API calls, use the service name `chime` and REST endpoint `https://service.chime.aws.amazon.com`.

Administrative permissions are controlled using AWS Identity and Access Management (IAM). For more information, see [Identity and Access Management for Amazon Chime](https://docs.aws.amazon.com/chime/latest/ag/security-iam.html) in the *Amazon Chime Administration Guide*.