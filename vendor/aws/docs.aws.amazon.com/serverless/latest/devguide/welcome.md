

# What is serverless development?
<a name="welcome"></a>

The following topics will guide you through developing a better conceptual understanding of serverless application development, and how various AWS services fit into together to create *application patterns* that form the core of your cloud applications. These applications can range from microservices that handle discreet business logic as a part of your application back-end, to event-driven workflows that perform data transformations or processing.

Understanding serverless development will help you make critical decisions about which AWS services are best suited for your business need. For example, choosing between Amazon DocumentDB, DynamoDB, and Aurora PostgreSQL for a database depends on various factors, such as what type of data-structure you want to use, or how many concurrent database connections you anticipate as your applications scale.

The goal of this serverless developer guide is to give you directed **learning paths** for the core services you need to implement serverless solutions. 

Serverless development lets you build applications without managing long-running servers, such as a provisioned Amazon EC2 instance. AWS serverless technologies are pay-as-you-go, can scale up and down as your application needs change, and are built to expand across AWS Regions to ensure resiliency.

![Diagram showing serverless development workflow from prerequisites through building applications.](http://docs.aws.amazon.com/serverless/latest/devguide/images/path-serverless-overview.png)


This guide will highlight what you need to know right away and link to service documentation for more service-specific details.

For example, you will learn that the Lambda service creates an *execution environment* to run compute functions. For more information on how Lambda manages function scaling or reduces start-up time, we will link you to relevant sections of the Lambda developer guide.

The topics in this guide will cover the prerequisites for understanding serverless development on AWS, such as account creation and an overview of AWS cloud infrastructure. Then, you will learn how to shift from a traditional development model to a serverless, event-driven architecture with which to develop applications on the cloud.

Along the way, this guide will introduce core services, workshops, and tutorials, you can choose to reinforce your learning with hands-on activities. 
+ AWS Identity and Access Management — for securely accessing resources on AWS.
+ AWS Lambda — for serverless compute functionality.
+ Amazon API Gateway for integrating `HTTP` and `HTTPS` requests with services to handle the requests.
+ Amazon DynamoDB for data storage and retrieval

**Learn serverless techniques in an online workshop**  
Learn by doing in the **[Serverless Patterns Workshop](https://catalog.workshops.aws/serverless-patterns)**. The first module introduces a serverless microservice to retrieve data from DynamoDB with Lambda and API Gateway. Additional modules provide practical examples of unit and integration testing, using infrastructure as code to deploy resources, and how to build common architectural patterns used in serverless solutions.  
 ![Architecture diagram for a REST microservice. Client icon connects through an arrow to REST API resource icon with API Gateway service icon placed above it. REST API is connected by a double arrow to Lambda function resource icon with Permissions Policy resource icon placed above it, and Lambda service icon placed above both. Lambda function resource is connected through an arrow pointing to Users Table resource with DynamoDB service icon placed above it. Dotted boxes enclose each of the services.](http://docs.aws.amazon.com/serverless/latest/devguide/images/workshop-m1-infra-complete.png) 