

# What is AWS Entity Resolution?
<a name="what-is-service"></a>

AWS Entity Resolution is a service that helps you match, link, and enhance related records stored across multiple applications, channels, and data stores. You can get started using entity resolution workflows that are flexible, scalable, and can connect to your existing applications and data service providers. 

AWS Entity Resolution offers advanced matching techniques, such as rule-based matching, machine learning-based matching (ML matching), and data service provider-led matching. These techniques can help you more accurately link and enhance related records of customer information, product codes, or business data codes. 

You can use AWS Entity Resolution to create a unified view of customer interactions by linking recent events (such as ad clicks, cart abandonment, and purchases) with pseudonymized signals from your data service providers into a unique entity ID. You can also better track products that use different codes (for example, SKU, UPC) across your stores. You can use AWS Entity Resolution to control matching accuracy and better protect data security while minimizing data movement.

**Topics**
+ [Are you a first-time AWS Entity Resolution user?](#first-time-user)
+ [Features of AWS Entity Resolution](#servicename-feature-overview)
+ [Related services](#related-services)
+ [Accessing AWS Entity Resolution](#acessing-service)
+ [Pricing for AWS Entity Resolution](#pricing)

## Are you a first-time AWS Entity Resolution user?
<a name="first-time-user"></a>

If you're a first-time user of AWS Entity Resolution, we recommend that you begin by reading the following sections:
+ [Features of AWS Entity Resolution](#servicename-feature-overview)
+ [Accessing AWS Entity Resolution](#acessing-service)
+ [Set up AWS Entity Resolution](setting-up.md)

## Features of AWS Entity Resolution
<a name="servicename-feature-overview"></a>

AWS Entity Resolution includes the following features:
+ **Flexible and customizable data preparation**

  AWS Entity Resolution reads your data from AWS Glue to use as inputs for match processing. You can specify a maximum of 20 data inputs. AWS Entity Resolution processes each row of the data input table as a record, with a unique entity serving as a primary key. AWS Entity Resolution can operate on encrypted datasets. First define the [schema mapping](glossary.md#schema-mapping-definition) for AWS Entity Resolution to understand what input fields you want to use in your [matching workflow](glossary.md#matching-workflow-definition). You can bring your own data schema, or blueprint, from an existing AWS Glue data input. Or, you can build your custom schema using an interactive user interface or JSON editor. By default, AWS Entity Resolution also [normalizes](glossary.md#normalization-defn) data inputs before matching to improve match processing, such as removing special characters and extra spaces, and formatting text to lowercase. If your data input is already normalized, then you can turn off normalization. We also provide a [GitHub library](https://aws.amazon.com/solutions/guidance/customizing-normalization-library-for-aws-entity-resolution/), which you can use to further customize the data normalization process to suit your needs.
+ **Configurable entity matching workflows**

  An entity [matching workflow](glossary.md#matching-workflow-definition) is a sequence of steps that you set up to tell AWS Entity Resolution how to match your data input and where to write the consolidated data output. You can set up one or more matching workflows to compare different data inputs and use different matching techniques, such as [rule-based matching](glossary.md#rule-based-matching-defn), [machine learning matching](glossary.md#ml-matching-defn), or [data service provider-led matching](glossary.md#provider-service-matching) without entity resolution or ML experience. You can also view the job status of existing matching workflows and metrics, such as resource number, number of records processed, and number of matches found.
  + **Ready-to-use rule-based matching**

    This matching technique includes a set of ready-to-use rules in the AWS Management Console or AWS Command Line Interface (AWS CLI). You can use these rules to find related records based on your input fields. You can also customize the rules by adding or removing input fields for each rule, deleting rules, rearranging rule priority, and creating new rules. You can also reset the rules to return them to their original configurations. The data output in your Amazon Simple Storage Service (Amazon S3) bucket has match groups that AWS Entity Resolution generates using the [rule-based matching technique](glossary.md#rule-based-matching-defn). Each match group has the rule number used to generate that match associated with it to help you understand the match. For example, the rule number can demonstrate the precision of each match group such that rule one is more precise than rule two.
  + **Pre-configured machine learning-based matching (ML matching)**

    This matching technique includes a pre-configured ML model to find matches across all of your data inputs, especially consumer-based records. The model uses all input fields associated with name, email address, phone number, address, and date of birth data types. The model generates match groups of related records with a [confidence score](glossary.md#confidence-level-defn) in each group explaining the quality of the match relative to other match groups. The model considers missing input fields and analyzes the entire record together to represent an entity. The data output in your Amazon S3 bucket has match groups that AWS Entity Resolution generates using the ML matching. This is where each match group has an associated confidence score of 0.0–1.0, which indicates the precision of the match.
  + **Matching records with data service providers**

    With AWS Entity Resolution you can match, link, and enhance your records with leading data service vendors and licensed datasets to expand your ability to understand, reach, and service your customers. For example, you can append attributes to your data to enhance your records, or you can improve the interoperability of systems and platforms you work with to meet your business goals. You can use this matching workflow with a few clicks, removing the need to build and maintain complex proprietary integrations. You must have a license agreement with these data service providers to take advantage of this matching technique.
+ **Manual bulk processing and automatic incremental processing**

  You can use data processing to help convert your data input or inputs into a consolidated data output table with similar records that have a common match ID generated using entity matching workflow configurations. Using the API and AWS Management Console or the AWS CLI, you can run [manual bulk processing](glossary.md#manual-processing) on demand, based on your existing extract, transform, and load (ETL) data pipeline, which re-processes all data for any new matches and updates to existing matches. Also, for rule-based matching scenarios, you can initiate [automatic incremental processing](glossary.md#incremental-processing) so that as soon as new data is available in your Amazon S3 bucket, the service reads those new records and compares them against existing records. This keeps your matches up to date with any changes in Amazon S3 data.
+ **Near real-time lookup**

  Looking up any entity fields through the [AWS Entity Resolution GetMatchId API operation](https://docs.aws.amazon.com/entityresolution/latest/apireference/API_GetMatchId.html) helps you synchronously retrieve an existing match ID. You can call AWS Entity Resolution with personally identifiable information (PII) attributes acquired through different sources and channels. AWS Entity Resolution hashes those attributes for data protection and retrieves the corresponding match ID to link and match the customer. For example, you can get a web sign-up with an associated name, email, and mailing address. Use the AWS Entity Resolution GetMatchId API operation to find out if this customer or entity already exists in your matched results stored in your S3 bucket, along with the corresponding entity match ID associated with it. After you get the entity match ID, you can find the transactional information associated with it in your source applications, such as your customer relationship management (CRM) or customer data platform (CDP) systems.
+ **Data protection and Regionalization by design**

  AWS Entity Resolution offers a default encryption capability that can help you protect your data, and equips you with an encryption key for every data input into the service. For example, AWS Entity Resolution gives you the flexibility to bring server-side encrypted and hashed data to run rule-based matching workflows. AWS Entity Resolution supports Regionalization, which means that your matching workflows run to process your data in the same AWS Region from where you're using the service. You can also encrypt and hash the data output in Amazon S3 before using your resolved data in other applications. 
+ **Multi-party transcoding**

  AWS Entity Resolution helps you define your data sources and matching configurations between multiple parties who want to use a data collaboration, such as in AWS Clean Rooms.

## Related services
<a name="related-services"></a>

The following AWS services are related to AWS Entity Resolution:
+ **Amazon S3** 

  Store data that you bring into AWS Entity Resolution in Amazon S3. 

  For more information, see [What Is Amazon S3?](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html) in the *Amazon Simple Storage Service User Guide*.
+ **AWS Glue** 

  Create AWS Glue tables from your data in Amazon S3 for use in AWS Entity Resolution. 

  For more information, see [What is AWS Glue?](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html) in the *AWS Glue Developer Guide*.
+ **AWS CloudTrail**

  Use AWS Entity Resolution with CloudTrail logs to enhance your analysis of AWS service activity.

  For more information, see [Logging AWS Entity Resolution API calls using AWS CloudTrail](logging-using-cloudtrail.md).
+ **CloudFormation**

  Create the following resources in CloudFormation: AWS::EntityResolution::MatchingWorkflow, AWS::EntityResolution::SchemaMapping, AWS::EntityResolution:IdMappingWorkflow, AWS::EntityResolution::IdNamespace and AWS::EntityResolution::PolicyStatement

  For more information, see [Create AWS Entity Resolution resources with AWS CloudFormation](creating-resources-with-cloudformation.md).

## Accessing AWS Entity Resolution
<a name="acessing-service"></a>

You can access AWS Entity Resolution through the following options:
+ Directly through the AWS Entity Resolution console at [https://console.aws.amazon.com/entityresolution/](https://console.aws.amazon.com/entityresolution/).
+ Programmatically through the AWS Entity Resolution API. For more information, see the [https://docs.aws.amazon.com/entityresolution/latest/apireference/Welcome.html](https://docs.aws.amazon.com/entityresolution/latest/apireference/Welcome.html).
  + If you plan to call the AWS Entity Resolution API in AWS Lambda Runtime, create your own deployment package and include the desired version of the AWS SDK library. For more information, see the following examples in the *AWS Lambda Developer Guide*: 
    + [Deploy Java Lambda functions with .zip or JAR file archives](https://docs.aws.amazon.com/lambda/latest/dg/java-package.html)
    + [Working with .zip file archives for Python Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/python-package.html)

## Pricing for AWS Entity Resolution
<a name="pricing"></a>

For pricing information, see [AWS Entity Resolution Pricing](https://aws.amazon.com/entity-resolution/pricing/).