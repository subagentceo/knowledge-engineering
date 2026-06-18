

# What is AWS CodeArtifact?
<a name="welcome"></a>

AWS CodeArtifact is a secure, highly scalable, managed artifact repository service that helps organizations to store and share software packages for application development. You can use CodeArtifact with popular build tools and package managers such as the NuGet CLI, Maven, Gradle, npm, yarn, pip, and twine. CodeArtifact helps reduce the need for you to manage your own artifact storage system or worry about scaling its infrastructure. There are no limits on the number or total size of the packages that you can store in a CodeArtifact repository.

You can create a connection between your private CodeArtifact repository and an external, public repository, such as npmjs.com or Maven Central. CodeArtifact will then fetch and store packages on demand from the public repository when they're requested by a package manager. This makes it more convenient to consume open-source dependencies used by your application and helps ensure they're always available for builds and development. You can also publish private packages to a CodeArtifact repository. This helps you share proprietary software components between multiple applications and development teams in your organization.

 For more information, see [AWS CodeArtifact](https://aws.amazon.com/codeartifact/).

## How does CodeArtifact work?
<a name="codeartifact-how-does-it-work"></a>

CodeArtifact stores software packages in repositories. Repositories are polyglot—a single repository can contain packages of any supported type. Every CodeArtifact repository is a member of a single CodeArtifact domain. We recommend that you use one production domain for your organization with one or more repositories. For example, you might use each repository for a different development team. Packages in your repositories can then be discovered and shared across your development teams. 

To add packages to a repository, configure a package manager such as npm or Maven to use the repository endpoint (URL). You can then use the package manager to publish packages to the repository. You can also import open-source packages into a repository by configuring it with an external connection to a public repository such as npmjs, NuGet Gallery, Maven Central, or PyPI. For more information, see [Connect a CodeArtifact repository to a public repository](external-connection.md). 

 You can make packages in one repository available to another repository in the same domain. To do this, configure one repository as an upstream of the other. All package versions available to the upstream repository are also available to the downstream repository. In addition, all packages that are available to the upstream repository through an external connection to a public repository are available to the downstream repository. For more information, see [Working with upstream repositories in CodeArtifact](repos-upstream.md). 

CodeArtifact requires users to authenticate with the service in order to publish or consume package versions. You must authenticate to the CodeArtifact service by creating an authorization token using your AWS credentials. Packages in CodeArtifact repositories cannot be made publicly available. For more information about authentication and access in CodeArtifact, see [AWS CodeArtifact authentication and tokens](tokens-authentication.md).

## How do I get started with CodeArtifact?
<a name="how-do-i-get-started"></a>

 We recommend that you complete the following steps: 

1.  **Learn** more about CodeArtifact by reading [AWS CodeArtifact concepts](codeartifact-concepts.md). 

1.  **Set up** your AWS account, the AWS CLI, and an IAM user by following the steps in [Setting up with AWS CodeArtifact](get-set-up-for-codeartifact.md). 

1.  **Use** CodeArtifact by following the instructions in [Getting started with CodeArtifact](getting-started.md). 