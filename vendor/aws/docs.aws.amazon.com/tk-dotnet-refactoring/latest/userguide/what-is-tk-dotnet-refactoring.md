

AWS .NET Modernization Tools Porting Assistant (PA) for .NET, AWS App2Container (A2C), AWS Toolkit for .NET Refactoring (TR), and AWS Microservice Extractor (ME) for .NET is no longer open to new customers. If you would like to use the service, sign up prior to November 7, 2025. Alternatively use [AWS Transform](https://aws.amazon.com/transform/), which is an agentic AI service developed to accelerate enterprise modernization of .NET.

# What is AWS Toolkit for .NET Refactoring?
<a name="what-is-tk-dotnet-refactoring"></a>

AWS Toolkit for .NET Refactoring is an extension for Microsoft Visual Studio that reduces the time and effort that is required to refactor legacy .NET applications to alternatives on AWS Cloud. 

Toolkit for .NET Refactoring assesses the application source code and recommends modernization pathways, such as porting to .NET Core. It also identifies Microsoft Windows dependencies on Microsoft Internet Information Services (IIS) and Microsoft Active Directory (AD), performs code modifications where possible, and assists in validating the refactored application on AWS services. Using the Toolkit for .NET Refactoring Visual Studio extension, you can perform all of these tasks within the Visual Studio integrated development environment (IDE).

**Topics**
+ [Features of Toolkit for .NET Refactoring](#dotnet-refactoring-feature-overview)
+ [Concepts](#concepts)

## Features of Toolkit for .NET Refactoring
<a name="dotnet-refactoring-feature-overview"></a>

The Toolkit for .NET Refactoring extension provides compatibility assessments, porting assistance, and testing on AWS.

### Compatibility assessment
<a name="assessment"></a>

Before you update your source code, Toolkit for .NET Refactoring performs an assessment of your .NET application source code and packages, such as NuGet and Microsoft Core. The extension determines compatibility based on whether a project can move to .NET Core runtime without code changes or package upgrades. The extension assesses .NET Core compatibility for solutions, projects, NuGet packages, and source code. 

The compatibility assessment identifies the following: 
+ Microsoft Windows dependencies on Microsoft Internet Information Services (IIS) and Microsoft Active Directory (AD).
+ API and package incompatibilities with newer cross-platform .NET versions, such as .NET Core 3.1, .NET 5, and .NET 6.

Toolkit for .NET Refactoring scans third-party and internal packages to classify them as compatible or incompatible. For each incompatible package, Toolkit for .NET Refactoring provides replacement options, if they are available. 

### Porting assistance
<a name="porting"></a>

When the compatibility assessment is complete, the Toolkit for .NET Refactoring extension provides porting assistance by suggesting code changes to remove incompatibilities that it found in the assessment. If the latest version of a package is compatible with .NET Core, the extension upgrades the package to its latest compatible version and updates the relevant project reference files and `web.config` files to a format that is compatible with .NET Core. Although the extension doesn't eliminate the need for manual source code changes, it reduces the initial effort that is required to refactor the source code. 

### Testing on AWS
<a name="testing"></a>

As you refactor your source code, you can use the Toolkit for .NET Refactoring extension to test and validate the code. To validate the code, you can deploy directly from Visual Studio to Amazon Elastic Container Service (Amazon ECS), hosted on AWS Fargate. 

If the solution is a web application that has been ported to .NET Core, the Toolkit for .NET Refactoring extension provides the ability to test the application by running the application in the AWS Cloud. To do this, you might need to set up the necessary resources in the AWS account and build the artifact with the .NET `publish` command or rebuild the solution. You can use the Toolkit for .NET Refactoring extension to upload the artifact into your AWS account and run it inside an Amazon ECS Linux container instance to verify that the solution is fully compatible in a Linux environment. 

## Concepts
<a name="concepts"></a>

An understanding of the terminology and concepts below is necessary to make full use of the Toolkit for .NET Refactoring extension. 

### Amazon ECS
<a name="ecs"></a>

Amazon Elastic Container Service (Amazon ECS) is a highly scalable and fast container management service. It is an abstraction of a container runtime environment that is analogous to a Kubernetes Pod, but with Amazon ECS, you don't need to worry about the complexity of Kubernetes. Within Amazon ECS, containers are grouped in a task. Within a task, multiple containers can run and share resources such as disk volumes or networks. Tasks are grouped in a service, which is an abstraction of a scalable multi-worker application. For more information, see [What is Amazon Elastic Container Service?](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)

### IAM roles, permissions, and delegations
<a name="iam"></a>

To access an AWS resource, a user must have permissions to access the resource. Permissions are grouped into IAM roles. IAM roles have restrictions regarding which users can use the roles. These restrictions can be included in the trust relationship of the role or as a permission assigned to a specific user. 

AWS services also require permissions to perform operations. 
+ The service can act on the behalf of the user that is accessing the resource. In this case, the service uses the permissions of the user. 
+ You can specify an IAM role for the service and the service will assume the role to perform the operations. 

For more information about roles, see [Using IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html) in the *IAM User Guide*.

### AWS Managed Microsoft AD
<a name="active-directory"></a>

AWS Directory Service for Microsoft Active Directory (AWS Managed Microsoft AD) runs on a Windows host, where the host and Active Directory are managed by AWS. An Active Directory administrator can use Active Directory management tools from a Windows instance that is joined to the Active Directory.

The Active Directory acts as a Domain Name System (DNS) for the nodes that are joined to the domain. Usually, a Dynamic Host Configuration Protocol (DHCP) server within the network is configured to return the IP of the Active Directory as a DNS server for the network.

### Sidecar container
<a name="sidecar-container"></a>

A sidecar container is a container that runs on the same node, which is the same Amazon ECS task, as the main application container. The sidecar container performs auxiliary tasks such as log collection, authentication, authorization, and network routing. Using a sidecar container is preferable to running an agent process in the same container in the application. A sidecar container allows the auxiliary processes to run in isolation and have an independent compute environment, including installed libraries, packages, and operating system. 

The Amazon ECS on Fargate task will run the following two containers: 
+ The application container.
+ The sidecar container that is used for Toolkit for .NET Refactoring technical tasks, such as file sync and Active Directory authentication.

### Microsoft Active Directory authentication in Linux containers
<a name="linux-active-directory"></a>

Microsoft Active Directory (AD) can act as Kerberos server. Linux Kerberos utilities are used to obtain an authentication token for the application that is ported to .NET Core. The application uses this token to authenticate itself to the dependent services. 