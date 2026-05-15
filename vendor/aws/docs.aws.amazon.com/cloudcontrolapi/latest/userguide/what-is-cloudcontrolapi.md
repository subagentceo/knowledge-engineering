

# What is AWS Cloud Control API?
<a name="what-is-cloudcontrolapi"></a>

Use AWS Cloud Control API to create, read, update, delete, and list (CRUD-L) your cloud resources that belong to AWS and third-party services. With the Cloud Control API standardized set of application programming interfaces (APIs), you can perform CRUD-L operations on any supported resources in your AWS account. Using Cloud Control API, you won't have to generate code or scripts specific to each individual service responsible for those resources.

**Topics**
+ [Are you a first-time Cloud Control API user?](#first-time-user)
+ [Features of Cloud Control API](#cloudcontrolapi-feature-overview)
+ [Related services](#related-services)
+ [Accessing Cloud Control API](#accessing-cloudcontrolapi)
+ [How Cloud Control API works](how-it-works.md)

## Are you a first-time Cloud Control API user?
<a name="first-time-user"></a>

If you're a first-time user of Cloud Control API, we recommend that you begin by reading the following sections:
+ [Setting up AWS Cloud Control API](setting-up.md)
+ [Getting started with Cloud Control API](getting-started.md)

## Features of Cloud Control API
<a name="cloudcontrolapi-feature-overview"></a>

Cloud Control API provides you with consistent control over the resources in your AWS account by offering a standardized way of accessing and provisioning those resources. It provides a uniform programmatic interface for making calls directly to the various resource types available in your AWS account, without having to be familiarized with the APIs of the underlying web services.

## Related services
<a name="related-services"></a>

Similar to Cloud Control API, AWS CloudFormation also uses resource types to call underlying web services APIs to provision those resources when you place such a request in your account. However, CloudFormation focuses on providing resource management, by treating infrastructure as code. Using CloudFormation, you can author declarative templates that include multiple resources and their dependencies, and then provision those resources as a *stack*. A stack is a single unit that you then manage through CloudFormation. You can also centrally manage and provision stacks across multiple AWS accounts and AWS Regions. To be managed through CloudFormation, a resource must be created as part of a stack or imported into a stack. For more information, see the *[AWS CloudFormation User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)*.

## Accessing Cloud Control API
<a name="accessing-cloudcontrolapi"></a>

Cloud Control API provides API operations for generating create, read, update, delete, and list (CRUD-L) resource requests in addition to tracking and managing those requests. You use the AWS Command Line Interface (AWS CLI) for Cloud Control API operations.

The following table shows the Cloud Control API operations you can use to generate CRUD-L resource requests.


| API operation | AWS CLI command | 
| --- | --- | 
| [https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_CreateResource.html](https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_CreateResource.html) | [https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/create-resource.html](https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/create-resource.html) | 
| [https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_DeleteResource.html](https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_DeleteResource.html) | [https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/delete-resource.html](https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/delete-resource.html) | 
| [https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_GetResource.html](https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_GetResource.html) | [https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/get-resource.html](https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/get-resource.html) | 
| [https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_ListResources.html](https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_ListResources.html) | [https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/list-resources.html](https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/list-resources.html) | 
| [https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_UpdateResource.html](https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_UpdateResource.html) | [https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/update-resource.html](https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/update-resource.html) | 

The following table shows the Cloud Control API operations that you can use to track and manage resource requests while they're in process.


| API operation | AWS CLI command | 
| --- | --- | 
| [CancelResourceRequest](https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_CancelResourceRequest.html) | [https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/cancel-resource-request.html](https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/cancel-resource-request.html) | 
| [GetResourceRequestStatus](https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_GetResourceRequestStatus.html) | [https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/get-resource-request-status.html](https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/get-resource-request-status.html) | 
| [ListResourceRequests](https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_ListResourceRequests.html) | [https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/list-resource-requests.html](https://docs.aws.amazon.com/cli/latest/reference/cloudcontrol/list-resource-requests.html) | 