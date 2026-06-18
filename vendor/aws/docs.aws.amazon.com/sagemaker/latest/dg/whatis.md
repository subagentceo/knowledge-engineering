

# What is Amazon SageMaker AI?
<a name="whatis"></a>

Amazon SageMaker AI is a fully managed machine learning (ML) service. With SageMaker AI, data scientists and developers can quickly and confidently build, train, and deploy ML models into a production-ready hosted environment. It provides a UI experience for running ML workflows that makes SageMaker AI ML tools available across multiple integrated development environments (IDEs). 

With SageMaker AI, you can store and share your data without having to build and manage your own servers. This gives you or your organizations more time to collaboratively build and develop your ML workflow, and do it sooner. SageMaker AI provides managed ML algorithms to run efficiently against extremely large data in a distributed environment. With built-in support for bring-your-own-algorithms and frameworks, SageMaker AI offers flexible distributed training options that adjust to your specific workflows. Within a few steps, you can deploy a model into a secure and scalable environment from the SageMaker AI console.

**Topics**
+ [Amazon SageMaker AI rename](#whatis-rename)
+ [Amazon SageMaker and Amazon SageMaker AI](#whatis-rename-unified)
+ [Pricing for Amazon SageMaker AI](#whatis-pricing)
+ [Recommendations for a first-time user of Amazon SageMaker AI](first-time-user.md)
+ [Overview of machine learning with Amazon SageMaker AI](how-it-works-mlconcepts.md)
+ [Amazon SageMaker AI Features](whatis-features.md)

## Amazon SageMaker AI rename
<a name="whatis-rename"></a>

On December 03, 2024, Amazon SageMaker was renamed to Amazon SageMaker AI. This name change does not apply to any of the existing Amazon SageMaker features.

### Legacy namespaces remain the same
<a name="whatis-rename-legacy"></a>

The `sagemaker` API namespaces, along with the following related namespaces, remain unchanged for backward compatibility purposes.
+ AWS CLI commands
+ [Managed policies](https://docs.aws.amazon.com/sagemaker/latest/dg/security-iam-awsmanpol.html) containing `AmazonSageMaker` prefixes
+ [Service endpoints](https://docs.aws.amazon.com/general/latest/gr/sagemaker.html) containing `sagemaker`
+ [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_SageMaker.html) resources containing `AWS::SageMaker` prefixes
+ Service-linked role containing `AWSServiceRoleForSageMaker`
+ Console URLs containing `sagemaker`
+ Documentation URLs containing `sagemaker`

## Amazon SageMaker and Amazon SageMaker AI
<a name="whatis-rename-unified"></a>

On December 03, 2024, Amazon released the next generation of Amazon SageMaker.

Amazon SageMaker is a unified platform for data, analytics, and AI. Bringing together AWS machine learning and analytics capabilities, the next generation of SageMaker delivers an integrated experience for analytics and AI with unified access to all your data.

Amazon SageMaker includes the following capabilities: 
+ Amazon SageMaker AI (formerly Amazon SageMaker) - Build, train, and deploy ML and foundation models, with fully managed infrastructure, tools, and workflows
+ Amazon SageMaker Lakehouse – Unify data access across Amazon S3 data lakes, Amazon Redshift, and other data sources
+ Amazon SageMaker Data and AI Governance – Discover, govern, and collaborate on data and AI securely with Amazon SageMaker Catalog, built on Amazon DataZone
+ SQL Analytics - Gain insights with the most price-performant SQL engine with Amazon Redshift 
+ Amazon SageMaker Data Processing - Analyze, prepare, and integrate data for analytics and AI using open-source frameworks on Amazon Athena, Amazon EMR, and AWS Glue
+ Amazon SageMaker Unified Studio – Build with all your data and tools for analytics and AI in a single development environment
+ Amazon Bedrock - Build and scale generative AI applications

For more information, refer to [Amazon SageMaker](https://aws.amazon.com/sagemaker).

## Pricing for Amazon SageMaker AI
<a name="whatis-pricing"></a>

For information about [AWS Free Tier](https://aws.amazon.com/free) limits and the cost of using SageMaker AI, see [Amazon SageMaker AI Pricing](https://aws.amazon.com/sagemaker/pricing/).