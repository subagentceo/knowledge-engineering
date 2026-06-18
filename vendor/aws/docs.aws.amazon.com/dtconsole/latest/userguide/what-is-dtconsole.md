

# What is the Developer Tools console?
<a name="what-is-dtconsole"></a>

The Developer Tools console is home to a set of services and features that you can use individually or collectively to help you develop software, either individually or as a team. The developer tools can help you securely store, build, test, and deploy your software. Used individually or collectively, these tools provide support for DevOps, continuous integration, and continuous delivery (CI/CD).

The Developer Tools console includes the following services:
+ [AWS CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/) is a fully managed source control service that hosts private Git repositories. You can use repositories to privately store and manage assets (such as documents, source code, and binary files) in the AWS Cloud. Your repositories store your project history from the first commit through the latest changes. You can work collaboratively on code in repositories by commenting on code and creating pull requests to help ensure code quality. 
+ [AWS CodeBuild](https://docs.aws.amazon.com/codebuild/latest/userguide/) is a fully managed build service that compiles your source code, runs unit tests, and produces artifacts that are ready to deploy. It provides prepackaged build environments for popular programming languages and build tools such as Apache Maven, Gradle, and more. You can also customize build environments in CodeBuild to use your own build tools. 
+ [AWS CodeDeploy](https://docs.aws.amazon.com/codedeploy/latest/userguide/) is a fully managed deployment service that automates software deployments to compute services such as Amazon EC2, AWS Lambda, and your on-premises servers. It can help you rapidly release new features, avoid downtime during application deployment, and handle the complexity of updating your applications.
+ [AWS CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/) is a continuous integration and continuous delivery service you can use to model, visualize, and automate the steps required to release your software. You can quickly model and configure the different stages of a software release process. You can build, test, and deploy your code every time there is a code change, based on the release process models you define.

Here's an example of how you can use the services in the Developer Tools console together to help you develop software. 

![An example CI/CD pipeline that uses services in the AWS Developer Tools console.](http://docs.aws.amazon.com/dtconsole/latest/userguide/images/ExampleCICDPipeline.png)


In this example, developers create a repository in CodeCommit and use it to develop and collaborate on their code. They create a build project in CodeBuild to build and test their code, and use CodeDeploy to deploy their code to test and production environments. They want to iterate quickly, so they create a pipeline in CodePipeline to detect the changes in the CodeCommit repository. Those changes are built, tests are run, and successfully built and tested code is deployed to the test server. The team adds test stages to the pipeline to run more tests on the staging server, such as integration or load tests. Upon the successful completion of those tests, a team member reviews the results and if satisfied, manually approves the changes for production. CodePipeline deploys the tested and approved code to production instances. 

This is just one simple example of how you can use one or more of the services available in the Developer Tools console to help you develop software. Each of the services can be customized to meet your needs. They offer many integrations with other products and services, both in AWS and with other third-party tools. For more information, see the following topics:
+ CodeCommit: [Product and service integrations](https://docs.aws.amazon.com/codecommit/latest/userguide/integrations.html)
+ CodeBuild: [Use CodeBuild with Jenkins](https://docs.aws.amazon.com/codebuild/latest/userguide/jenkins-plugin.html)
+ CodeDeploy: [Product and service integrations](https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations.html)
+ CodePipeline: [Product and service integrations](https://docs.aws.amazon.com/codepipeline/latest/userguide/integrations.html)

## Are you a first-time user?
<a name="first-time-user"></a>

If you are a first-time user of one or more of the services available in the Developer Tools console, we recommend that you begin by reading the following topics:
+ [Getting started with CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/getting-started-cc.html)
+ [Getting started with CodeBuild](https://docs.aws.amazon.com/codebuild/latest/userguide/getting-started.html), [Concepts](https://docs.aws.amazon.com/codebuild/latest/userguide/concepts.html)
+ [Getting started with CodeDeploy](https://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-codedeploy.html), [Primary components ](https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html)
+ [Getting started with CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/getting-started-codepipeline.html), [Concepts](https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html)

## Features of the developer tools console
<a name="servicename-feature-overview"></a>

The Developer Tools console includes the following features:
+ The Developer Tools console includes a notifications manager feature that you can use to subscribe to events in AWS CodeBuild, AWS CodeCommit, AWS CodeDeploy, and AWS CodePipeline. This feature has its own API, AWS CodeStar Notifications. You can use the notifications feature to quickly notify users about events in the repositories, build projects, deployment applications, and pipelines that are most important to their work. A notifications manager helps make users aware of events that occur on repositories, builds, deployments, or pipelines so that they can quickly take action, such as approving changes or correcting errors. For more information, see [What are notifications?](welcome.md)
+ The Developer Tools console includes a connections feature that you can use to associate your AWS resources with third-party source code providers. This feature has its own API, AWS CodeConnections. You can use the connections feature to set up an authorized connection with a third-party provider and use the connection resource with other AWS services. For more information, see [What are connections?](welcome-connections.md)