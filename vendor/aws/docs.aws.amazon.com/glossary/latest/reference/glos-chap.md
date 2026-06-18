

# AWS Glossary
<a name="glos-chap"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

### Numbers and symbols<a name="numbers"></a>

**100-continue**<a name="hundredcontinue"></a>  
A method that gives a client the ability to see whether a server can accept a request before actually sending it. For large PUT requests, this method can save both time and bandwidth charges.

### A<a name="A"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**AAD**<a name="AAD_abbrev"></a>   
See [additional authenticated data](#additional_authenticated_data).

**access control list (ACL)**<a name="ACL"></a>  
A document that defines who can access a particular [bucket](#bucket) or object. Each [bucket](#bucket) and object in [Amazon S3](#amazons3) has an ACL. This document defines what each type of user can do, such as write and read permissions.

**access identifiers**<a name="access_identifiers"></a>   
See [credentials](#accesscredentials).

**access key**<a name="access_key"></a>  
The combination of an [access key ID](#accesskeyID) (for example, `AKIAIOSFODNN7EXAMPLE`) and a [secret access key](#SecretAccessKey) (for example, `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`). You use access keys to sign API requests that you make to AWS.

**access key ID**<a name="accesskeyID"></a>  
A unique identifier that's associated with a [secret access key](#SecretAccessKey); the access key ID and secret access key are used together to sign programmatic AWS requests cryptographically.

**access key rotation**<a name="keyrotate"></a>  
A method to increase security by changing the AWS access key ID. You can use this method to retire an old key at your discretion.

**access policy language**<a name="accesslang"></a>  
A language for writing documents (specifically, [*policies*](#policy)) that specify who can access a particular AWS [resource](#resource) and under what conditions.

**account**<a name="account"></a>  
A formal relationship with AWS that's associated with all of the following:  
+ The owner email address and password
+ The control of resources created under its umbrella
+ Payment for the AWS activity related to those resources
The AWS account has permission to do anything and everything with all the AWS account resources. This is in contrast to a [user](#AWSUser), which is an entity contained within the account.

**account activity**<a name="accountactivity"></a>  
A webpage showing your month-to-date AWS usage and costs. The account activity page is located at [https://aws.amazon.com/account-activity/](https://aws.amazon.com/account-activity/).

**AWS Account Management**<a name="aws-account-management"></a>  
AWS Account Management is a tool that you can use to update the contact information for each of your AWS accounts.   
See also [https://aws.amazon.com/organizations](https://aws.amazon.com/organizations/).

**ACL**<a name="ACL_abbrev"></a>   
See [access control list (ACL)](#ACL).

**ACM**<a name="acm"></a>  
AWS Certificate Manager is a web service for provisioning, managing, and deploying Secure Sockets Layer/[Transport Layer Security](#transportlayersecurity) (SSL/TLS) certificates for use with AWS services.   
See also [https://aws.amazon.com/certificate-manager/](https://aws.amazon.com/certificate-manager/).

**action**<a name="action"></a>  
An API function. Also called *operation* or *call*. The activity the [principal](#principal) has permission to perform. The action is B in the statement "A has permission to do B to C where D applies." For example, Jane sends a request to [Amazon SQS](#AmazonSimpleQueueService) with `Action=ReceiveMessage`.  
[CloudWatch](#AmazonCW): The response initiated by the change in an alarm's state (for example, from `OK` to `ALARM`). The state change might be caused by a metric reaching the alarm threshold, or by a `SetAlarmState` request. Each alarm can have one or more actions assigned to each state. Actions are performed once each time the alarm changes to a state that has an action assigned. Example actions include an [Amazon SNS](#SNS) notification, running an [Amazon EC2 Auto Scaling](#AutoScaling) [policy](#policy), and an [ Amazon EC2 instance](#ec2instance) stop/terminate action.

**active trusted key groups**<a name="active_trusted_key_groups"></a>  
A list that shows each of the [trusted key groups](#trusted_key_groups), and the IDs of the public keys in each key group, that are active for a distribution in Amazon CloudFront. CloudFront can use the public keys in these key groups to verify the signatures of [CloudFront signed URLs and signed cookies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html).

**active trusted signers**<a name="trustedsigner"></a>  
See [active trusted key groups](#active_trusted_key_groups).

**active-active**<a name="activeactive"></a>  
A class of high availability strategies in which a workload exists simultaneously in multiple Regions, uses multiple primary resources, and serves traffic from all of the Regions to which it's deployed. Sometimes referred to as active/active.    
See also [read local/write global](#readlocalwriteglobal)[read local/write local](#readlocalwritelocal)[global consistency](#globalconsistency).

**active-passive**<a name="activepassive"></a>  
A class of disaster recovery strategies that involve a primary Region and a standby Region in a [back up and restore](#backupand), [hot standby](#hotstandby), [pilot light](#pilotlight), or [warm standby](#warmstandby) configuration. Sometimes referred to as active/passive. 

**additional authenticated data**<a name="additional_authenticated_data"></a>  
Information that's checked for integrity but not encrypted, such as headers or other contextual metadata.

**administrative suspension**<a name="admin_suspension"></a>  
[Amazon EC2 Auto Scaling](#AutoScaling) might suspend processes for [Auto Scaling group](#AutoScalingGroup) that repeatedly fail to launch instances. Auto Scaling groups that most commonly experience administrative suspension have zero running instances, have been trying to launch instances for more than 24 hours, and have not succeeded in that time. 

**alarm**<a name="alarm"></a>  
An item that watches a single metric over a specified time period and starts an [Amazon SNS](#SNS) [topic](#topic) or an [Amazon EC2 Auto Scaling](#AutoScaling) [policy](#policy). These actions are started if the value of the metric crosses a threshold value over a predetermined number of time periods.

**allow**<a name="allow"></a>  
One of two possible outcomes (the other is [deny](#deny)) when an [IAM](#IAM) access [policy](#policy) is evaluated. When a user makes a request to AWS, AWS evaluates the request based on all permissions that apply to the user and then returns either allow or deny.

**Amazon Machine Image (AMI)**<a name="AmazonMachineImage"></a>  
An Amazon Machine Image (AMI) is an encrypted machine image stored in [Amazon EBS](#EBS) or [Amazon S3](#amazons3). AMIs function similarly to a template of a computer's root drive. They contain the operating system and can also include software and layers of your application, such as database servers, middleware, and web servers. 

**Amazon Web Services (AWS)**<a name="amazonwebservices"></a>  
An infrastructure web services platform in the cloud for companies of all sizes.   
See also [https://aws.amazon.com/what-is-cloud-computing/](https://aws.amazon.com/what-is-cloud-computing/).

**AMI**<a name="AMI_abbrev"></a>   
See [Amazon Machine Image (AMI)](#AmazonMachineImage).

**Amplify**<a name="Amplify"></a>  
AWS Amplify is a complete solution that frontend web and mobile developers can use to build and deploy secure, scalable full-stack applications powered by AWS. Amplify provides two services: [Amplify Hosting](#AmplifyHosting) and [Amplify Studio](#AmplifyStudio).   
See also [https://aws.amazon.com/amplify/](https://aws.amazon.com/amplify/).

**Amplify Android**<a name="AmplifyAndroid"></a>  
Amplify Android is a collection of open-source client libraries that provides interfaces for specific use cases across many AWS services. Amplify Android is the recommended way to build native Android applications powered by AWS.   
See also [https://aws.amazon.com/amplify/](https://aws.amazon.com/amplify/).

**Amplify Hosting**<a name="AmplifyHosting"></a>  
AWS Amplify Hosting is a fully managed continuous integration and continuous delivery (CI/CD) and hosting service for fast, secure, and reliable static and server-side rendered apps. Amplify Hosting provides a Git-based workflow for hosting full-stack serverless web apps with continuous deployment.   
See also [https://aws.amazon.com/amplify/hosting/](https://aws.amazon.com/amplify/hosting/).

**Amplify iOS**<a name="AmplifyiOS"></a>  
Amplify iOS is a collection of open-source client libraries that provides interfaces for specific use cases across many AWS services. Amplify iOS is the recommended way to build native iOS applications powered by AWS.   
See also [https://aws.amazon.com/amplify/](https://aws.amazon.com/amplify/).

**Amplify Studio**<a name="AmplifyStudio"></a>  
AWS Amplify Studio is a visual development environment that web and mobile developers can use to build the frontend UI components and the backend environment for a full-stack application.   
See also [https://aws.amazon.com/amplify/studio/](https://aws.amazon.com/amplify/studio/).

**analysis rules**<a name="analysisrules"></a>  
[AWS Clean Rooms](#cleanrooms): The query restrictions that authorize a specific type of query.

**analysis scheme**<a name="analysisscheme"></a>  
[CloudSearch](#cloudSearch): Language-specific text analysis options that are applied to a text field to control stemming and configure stopwords and synonyms. 

**API Gateway**<a name="APIGateway"></a>  
Amazon API Gateway is a fully managed service that developers can use to create, publish, maintain, monitor, and secure APIs at any scale.   
See also [https://aws.amazon.com/api-gateway](https://aws.amazon.com/api-gateway/).

**AWS App2Container**<a name="app2container"></a>  
AWS App2Container is a transformation tool that modernizes .NET and Java applications by migrating them into containerized applications.   
See also [https://aws.amazon.com/app2container](https://aws.amazon.com/app2container/).

**AWS AppConfig**<a name="AppConfig"></a>  
AWS AppConfig is a service used to update software at runtime without deploying new code. With AWS AppConfig, you can configure, validate, and deploy feature flags and application configurations.   
See also [https://aws.amazon.com/systems-manager/features/appconfig](https://aws.amazon.com/systems-manager/features/appconfig/).

**Amazon AppFlow**<a name="appflow"></a>  
Amazon AppFlow is a fully managed integration service that you can use to transfer data securely between software as a service (SaaS) applications and AWS services.   
See also [https://aws.amazon.com/appflow](https://aws.amazon.com/appflow/).

**application**<a name="application"></a>  
[Elastic Beanstalk](#Beanstalk): A logical collection of components, including environments, versions, and environment configurations. An application is conceptually similar to a folder.  
[CodeDeploy](#AWSCodeDeploy): A name that uniquely identifies the application to be deployed. AWS CodeDeploy uses this name to ensure the correct combination of revision, deployment configuration, and deployment group are referenced during a deployment.

**Application Auto Scaling**<a name="ApplicationAutoScaling"></a>  
AWS Application Auto Scaling is a web service that you can use to configure automatic scaling for AWS resources beyond Amazon EC2, such as Amazon ECS services, Amazon EMR clusters, and DynamoDB tables.   
See also [https://aws.amazon.com/autoscaling/](https://aws.amazon.com/autoscaling/).

**Application Billing**<a name="AppBilling"></a>  
The location where your customers manage the Amazon DevPay products they've purchased. The web address is [http://www.amazon.com/dp-applications](http://www.amazon.com/dp-applications).

**Application Composer**<a name="ApplicationComposer"></a>  
AWS Application Composer is a visual designer that you can use to build serverless applications from multiple AWS services. As you design an application, Application Composer automatically generates a YAML template with [CloudFormation](#CloudFormation) and [AWS SAM](#SAM) template resources.   
See also [https://aws.amazon.com/application-composer/](https://aws.amazon.com/application-composer/).

**Application Cost Profiler**<a name="application-cost-profiler"></a>  
AWS Application Cost Profiler is a solution to track the consumption of shared AWS resources used by software applications and report granular cost breakdown across tenant base.   
See also [https://aws.amazon.com/aws-cost-management/aws-application-cost-profiler/](https://aws.amazon.com/aws-cost-management/aws-application-cost-profiler/).

**Application Discovery Service**<a name="ApplicationDiscoveryService"></a>  
AWS Application Discovery Service is a web service that helps you plan to migrate to AWS by identifying IT assets in a data center—including servers, virtual machines, applications, application dependencies, and network infrastructure.    
See also [https://aws.amazon.com/application-discovery/](https://aws.amazon.com/application-discovery/).

**application revision**<a name="applicationrevision"></a>  
[CodeDeploy](#AWSCodeDeploy): An archive file containing source content—such as source code, webpages, executable files, and deployment scripts—along with an [application specification file](#applicationspecificationfile). Revisions are stored in [Amazon S3](#amazons3) [buckets](#bucket) or [GitHub](#github) repositories. For Amazon S3, a revision is uniquely identified by its Amazon S3 object key and its ETag, version, or both. For GitHub, a revision is uniquely identified by its commit ID.

**application specification file**<a name="applicationspecificationfile"></a>  
[CodeDeploy](#AWSCodeDeploy): A YAML-formatted file used to map the source files in an application revision to destinations on the instance. The file is also used to specify custom permissions for deployed files and specify scripts to be run on each instance at various stages of the deployment process.

**application version**<a name="appversion"></a>  
[Elastic Beanstalk](#Beanstalk): A specific, labeled iteration of an application that represents a functionally consistent set of deployable application code. A version points to an [Amazon S3](#amazons3) object (a JAVA WAR file) that contains the application code. 

**AppSpec file**<a name="AppSpec_file"></a>   
See [application specification file](#applicationspecificationfile).

**WorkSpaces Applications**<a name="appstream"></a>  
Amazon WorkSpaces Applications is a fully managed, secure service for streaming desktop applications to users without rewriting those applications.   
See also [https://aws.amazon.com/appstream/](https://aws.amazon.com/appstream/).

**AWS AppSync**<a name="AWSAppSync"></a>  
AWS AppSync is an enterprise-level, fully managed GraphQL service with real-time data synchronization and offline programming features.   
See also [https://aws.amazon.com/appsync/](https://aws.amazon.com/appsync/).

**ARN**<a name="ARN_abbrev"></a>   
See [Amazon Resource Name (ARN)](#ARN).

**artifact**<a name="artifact"></a>  
[CodePipeline](#AWSCodePipeline): A copy of the files or changes that are worked on by the pipeline. 

**asymmetric encryption**<a name="asymmetric_encryption"></a>  
 [Encryption](#encrypt) that uses both a public key and a private key.

**asynchronous bounce**<a name="asynchronousbounce"></a>  
A type of [bounce](#bounce) that occurs when a [receiver](#receiver) initially accepts an email message for delivery and then subsequently fails to deliver it.

**Athena**<a name="athena"></a>  
Amazon Athena is an interactive query service that you can use to analyze data in Amazon S3 using ANSI SQL. Athena is serverless, so there's no infrastructure to manage. Athena scales automatically and is simple to use, so you can start analyzing your datasets within seconds.   
See also [https://aws.amazon.com/athena/](https://aws.amazon.com/athena/).

**atomic counter**<a name="atomic-counter"></a>  
DynamoDB: A method of incrementing or decrementing the value of an existing attribute without interfering with other write requests.

**attribute**<a name="attribute"></a>  
A fundamental data element, something that doesn't need to be broken down any further. In DynamoDB, attributes are similar in many ways to fields or columns in other database systems.  
 Amazon Machine Learning: A unique, named property within an observation in a dataset. In tabular data, such as spreadsheets or comma-separated values (.csv) files, the column headings represent the attributes, and the rows contain values for each attribute.

**AUC**<a name="AUC"></a>  
Area Under a Curve. An industry-standard metric to evaluate the quality of a binary classification machine learning model. AUC measures the ability of the model to predict a higher score for positive examples, those that are “correct,” than for negative examples, those that are “incorrect.” The AUC metric returns a decimal value from 0 to 1. AUC values near 1 indicate an ML model that's highly accurate.

**Aurora**<a name="aurora"></a>  
Amazon Aurora is a fully managed MySQL-compatible relational database engine that combines the speed and availability of commercial databases with the simplicity and cost-effectiveness of open-source databases.   
See also [https://aws.amazon.com/rds/aurora/](https://aws.amazon.com/rds/aurora/).

**authenticated encryption**<a name="authenticated_encryption"></a>  
[Encryption](#encrypt) that provides confidentiality, data integrity, and authenticity assurances of the encrypted data.

**authentication**<a name="authentication"></a>  
The process of proving your identity to a system.

**AWS Auto Scaling**<a name="AWSAutoScaling"></a>  
AWS Auto Scaling is a fully managed service that you can use to quickly discover the scalable AWS resources that are part of your application and to configure dynamic scaling.   
See also [https://aws.amazon.com/autoscaling/](https://aws.amazon.com/autoscaling/).

**Auto Scaling group**<a name="AutoScalingGroup"></a>  
A representation of multiple [EC2 instances](#ec2instance) that share similar characteristics, and that are treated as a logical grouping for the purposes of instance scaling and management.

**Availability Zone**<a name="AZ"></a>  
A distinct location within a [Region](#region) that's insulated from failures in other Availability Zones, and provides inexpensive, low-latency network connectivity to other Availability Zones in the same Region.

**AWS**   
See [Amazon Web Services (AWS)](#amazonwebservices).

### B<a name="B"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**back up and restore**<a name="backupand"></a>  
A disaster recovery strategy in which backups of data in the primary Region are copied to a standby Region and can be restored from the standby Region. You must provision the infrastructure and other resources, such as compute, as part of a failover process.    
See also [active-passive](#activepassive)[hot standby](#hotstandby)[pilot light](#pilotlight)[warm standby](#warmstandby).

**Backint Agent**<a name="backint-agent"></a>  
AWS Backint Agent for SAP HANA is an SAP-certified backup and restore solution for SAP HANA workloads running on Amazon EC2 instances in the cloud.   
See also [https://aws.amazon.com/backint-agent](https://aws.amazon.com/backint-agent/).

**AWS Backup**<a name="awsbackup"></a>  
AWS Backup is a managed backup service that you can use to centralize and automate the backup of data across AWS services in the cloud and on premises.   
See also [https://aws.amazon.com/backup/](https://aws.amazon.com/backup/).

**basic monitoring**<a name="basicmonitor"></a>  
Monitoring of AWS provided metrics derived at a 5-minute frequency.

**batch**<a name="batch"></a>   
See [document batch](#documentbatch).

**batch prediction**<a name="batch-prediction"></a>  
Amazon Machine Learning: An operation that processes multiple input data observations at one time (asynchronously). Unlike real-time predictions, batch predictions aren't available until all predictions have been processed.   
See also [real-time predictions](#real-time-predictions).

**BGP ASN**<a name="BGPASN"></a>  
Border Gateway Protocol Autonomous System Number is a unique identifier for a network, for use in BGP routing. [Amazon EC2](#ec2) supports all 2-byte ASN numbers in the range of 1 – 65335, with the exception of 7224, which is reserved.

**billing**<a name="billing_general"></a>   
See [Billing and Cost Management](#billing).

**Billing and Cost Management**<a name="billing"></a>  
AWS Billing and Cost Management is the AWS Cloud computing model where you pay for services on demand and use as much or as little as you need. While [resources](#resource) are active under your account, you pay for the cost of allocating those resources. You also pay for any incidental usage associated with those resources, such as data transfer or allocated storage.   
See also [https://aws.amazon.com/billing/new-user-faqs/](https://aws.amazon.com/billing/new-user-faqs/).

**binary attribute**<a name="binary-attribute"></a>  
Amazon Machine Learning: An attribute for which one of two possible values is possible. Valid positive values are 1, y, yes, t, and true answers. Valid negative values are 0, n, no, f, and false. Amazon Machine Learning outputs 1 for positive values and 0 for negative values.   
See also [attribute](#attribute).

**binary classification model**<a name="binary-classification-model"></a>  
Amazon Machine Learning: A machine learning model that predicts the answer to questions where the answer can be expressed as a binary variable. For example, questions with answers of “1” or “0”, “yes” or “no”, “will click” or “will not click” are questions that have binary answers. The result for a binary classification model is always either a “1” (for a “true” or affirmative answers) or a “0” (for a “false” or negative answers).

**block**<a name="block"></a>  
A dataset. [Amazon EMR](#AmazonElasticMapReduce) breaks large amounts of data into subsets. Each subset is called a data block. Amazon EMR assigns an ID to each block and uses a hash table to keep track of block processing.

**block device**<a name="blockdevice"></a>  
A storage device that supports reading and (optionally) writing data in fixed-size blocks, sectors, or clusters.

**block device mapping**<a name="blockdevmap"></a>  
A mapping structure for every [AMI](#AmazonMachineImage) and [instance](#instance) that specifies the block devices attached to the instance.

**AWS Blockchain Templates**<a name="blockchain-templates"></a>   
See [Managed Blockchain](#managed-blockchain).

**blue/green deployment**<a name="bluegreendeployment"></a>  
CodeDeploy: A deployment method where the instances in a deployment group (the original environment) are replaced by a different set of instances (the replacement environment).

**bootstrap action**<a name="bootstrapact"></a>  
A user-specified default or custom action that runs a script or an application on all nodes of a job flow before [Hadoop](#Hadoop) starts.

**Border Gateway Protocol Autonomous System Number**<a name="BGPASN_full"></a>   
See [BGP ASN](#BGPASN).

**bounce**<a name="bounce"></a>  
A failed email delivery attempt.

**Braket**<a name="braket"></a>  
Amazon Braket is a fully managed quantum computing service that helps you run quantum algorithms to accelerate your research and discovery.   
See also [https://aws.amazon.com/braket](https://aws.amazon.com/braket/).

**breach**<a name="breach"></a>  
[Amazon EC2 Auto Scaling](#AutoScaling): The condition where a user-set threshold (upper or lower boundary) is passed. If the duration of the breach is significant, as set by a breach duration parameter, it can possibly start a [scaling activity](#ScalingActivity). 

**bucket**<a name="bucket"></a>  
[Amazon S3](#amazons3): A container for stored objects. Every object is contained in a bucket. For example, if the object named `photos/puppy.jpg` is stored in the `amzn-s3-demo-bucket` bucket, then authorized users can access the object with the URL `https://amzn-s3-demo-bucket.s3.region-code.amazonaws.com/photos/puppy.jpg`.

**bucket owner**<a name="bucketowner"></a>  
The person or organization that owns a [bucket](#bucket) in [Amazon S3](#amazons3). In the same way that Amazon is the only owner of the domain name Amazon.com, only one person or organization can own a bucket. 

**bundling**<a name="bundling"></a>  
A commonly used term for creating an [Amazon Machine Image (AMI)](#AmazonMachineImage). It specifically refers to creating [instance store-backed AMIs](#instancebacked).

### C<a name="C"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**cache cluster**<a name="CacheCluster"></a>  
A logical cache distributed over multiple [cache nodes](#CacheNode). A cache cluster can be set up with a specific number of cache nodes.

**cache cluster identifier**<a name="CacheClusterIdentifier"></a>  
Customer-supplied identifier for the cache cluster that must be unique for that customer in an [AWS Region](#region).

**cache engine version**<a name="CacheEngineVersion"></a>  
The version of the Memcached service that's running on the cache node.

**cache node**<a name="CacheNode"></a>  
A fixed-size chunk of secure, network-attached RAM. Each cache node runs an instance of the Memcached service, and has its own DNS name and port. Multiple types of cache nodes are supported, each with varying amounts of associated memory.

**cache node type**<a name="CacheNodeType"></a>  
An [EC2 instance](#ec2instance) type used to run the cache node.

**cache parameter group**<a name="CacheParameterGroup"></a>  
A container for cache engine parameter values that can be applied to one or more cache clusters.

**cache security group**<a name="CacheSecurityGroup"></a>  
A group maintained by ElastiCache that combines inbound authorizations to cache nodes for hosts belonging to [Amazon EC2](#ec2) [security groups](#SecurityGroup) that are specified through the console or the API or command line tools.

**campaign**<a name="campaign"></a>  
[Amazon Personalize](#amazonpersonalize): A deployed solution version (trained model) with provisioned dedicated transaction capacity for creating real-time recommendations for your application users. After you create a campaign, you use the `getRecommendations` or `getPersonalizedRanking` personalization operations to get recommendations.   
See also [recommendations](#recommendations). 
See also [solution version](#solution-version).

**canned access policy**<a name="cannedaccesspol"></a>  
A standard access control policy that you can apply to a [bucket](#bucket) or object. Options include: private, public-read, public-read-write, and authenticated-read.

**canonicalization**<a name="canonicalize"></a>  
The process of converting data into a standard format that a service such as [Amazon S3](#amazons3) can recognize.

**capacity**<a name="capacity"></a>  
The amount of available compute size at a given time. Each [Auto Scaling group](#AutoScalingGroup) is defined with a minimum and maximum compute size. A [scaling activity](#ScalingActivity) increases or decreases the capacity within the defined minimum and maximum values.

**Cartesian product**<a name="cartesian-product"></a>  
A mathematical operation that returns a product from multiple sets.

**Cartesian product processor**<a name="cartesian-product-processor"></a>  
A processor that calculates a Cartesian product. Also known as a *Cartesian data processor*.

**AWS CDK**<a name="AWSCDK"></a>  
AWS Cloud Development Kit (AWS CDK) is an open-source software development framework for defining your cloud infrastructure in code and provisioning it through CloudFormation.   
See also [https://aws.amazon.com/cdk/](https://aws.amazon.com/cdk/).

**CDN**<a name="CDN_abbrev"></a>   
See [content delivery network (CDN)](#content-delivery-network).

**certificate**<a name="certificate"></a>  
A credential that some AWS products use to authenticate [AWS accounts](#account) and users. Also known as an [X.509 certificate](#X509). The certificate is paired with a private key.

**chargeable resources**<a name="chargeable-resources"></a>  
Features or services whose use incurs fees. Although some AWS products are free, others include charges. For example, in an [CloudFormation](#CloudFormation) [stack](#stack), AWS [resources](#resource) that have been created incur charges. The amount charged depends on the usage load. Use the Amazon Web Services Simple Monthly Calculator to estimate your cost prior to creating instances, stacks, or other resources.

**Amazon Q Developer in chat applications**<a name="chatbot"></a>  
Amazon Q Developer in chat applications is an interactive agent that makes it easier to monitor, troubleshoot, and operate AWS resources in your Slack channels and Amazon Chime chat rooms.   
See also [https://aws.amazon.com/chatbot](https://aws.amazon.com/chatbot/).

**Amazon Chime**<a name="chime"></a>  
Amazon Chime is a secure, real-time, unified communications service that transforms meetings by making them more efficient and easier to conduct.   
See also [https://aws.amazon.com/chime/](https://aws.amazon.com/chime/).

**CIDR block**<a name="CIDRblock"></a>  
Classless Inter-Domain Routing. An internet protocol address allocation and route aggregation methodology.   
See also [Classless Inter-Domain Routing](http://en.wikipedia.org/wiki/CIDR_notation).

**ciphertext**<a name="cipher_text"></a>  
Information that has been [encrypted](#encrypt), as opposed to [plaintext](#plain_text), which is information that has not.

**classification**<a name="classification"></a>  
In machine learning, a type of problem that seeks to place (classify) a data sample into a single category or “class.” Often, classification problems are modeled to choose one category (class) out of two. These are binary classification problems. Problems with more than two available categories (classes) are called "multiclass classification" problems.   
See also [binary classification model](#binary-classification-model). 
See also [multiclass classification model](#multiclass-classification-model).

**AWS Clean Rooms**<a name="cleanrooms"></a>  
AWS Clean Rooms is an AWS service that helps multiple parties to join their data together in a secure collaboration workspace.   
See also [https://aws.amazon.com/clean-rooms/](https://aws.amazon.com/clean-rooms/).

**Client VPN**<a name="client-vpn"></a>  
AWS Client VPN is a client-based, managed VPN service that remote clients can use to securely access your AWS resources using an Open VPN-based software client.   
See also [https://aws.amazon.com/vpn/client-vpn](https://aws.amazon.com/vpn/client-vpn/).

**AWS Cloud Control API**<a name="cloudcontrolapi"></a>  
AWS Cloud Control API is a set of standardized application programming interfaces (APIs) that developers can use to create, read, update, delete, and list supported cloud infrastructure.   
See also [https://aws.amazon.com/cloudcontrolapi](https://aws.amazon.com/cloudcontrolapi/).

**Cloud Directory**<a name="clouddirectory"></a>  
Amazon Cloud Directory is a service that provides a highly scalable directory store for your application's multihierarchical data.   
See also [https://aws.amazon.com/cloud-directory/](https://aws.amazon.com/cloud-directory/).

**AWS Cloud Map**<a name="cloudmap"></a>  
AWS Cloud Map is a service that you use to create and maintain a map of the backend services and resources that your applications depend on. With AWS Cloud Map, you can name and discover your AWS Cloud resources.   
See also [https://aws.amazon.com/cloud-map](https://aws.amazon.com/cloud-map).

**cloud service provider (CSP)**<a name="cloudserviceprovider"></a>  
A cloud service provider is a company that provides subscribers with access to internet-hosted computing, storage, and software services.

**AWS Cloud WAN**<a name="cloud-wan"></a>  
AWS Cloud WAN is a managed wide-area networking service used to build, manage, and monitor a unified global network.   
See also [https://aws.amazon.com/cloud-wan](https://aws.amazon.com/cloud-wan/).

**AWS Cloud9**<a name="AWSCloud9"></a>  
AWS Cloud9 is a cloud-based integrated development environment (IDE) that you use to write, run, and debug code.   
See also [https://aws.amazon.com/cloud9/](https://aws.amazon.com/cloud9/).

**CloudFormation**<a name="CloudFormation"></a>  
AWS CloudFormation is a service for writing or changing templates that create and delete related AWS [resources](#resource) together as a unit.   
See also [https://aws.amazon.com/cloudformation](https://aws.amazon.com/cloudformation/).

**CloudFront**<a name="AmazonCF"></a>  
Amazon CloudFront is an AWS content delivery service that helps you improve the performance, reliability, and availability of your websites and applications.   
See also [https://aws.amazon.com/cloudfront](https://aws.amazon.com/cloudfront/).

**CloudHSM**<a name="cloudhsm"></a>  
AWS CloudHSM is a web service that helps you meet corporate, contractual, and regulatory compliance requirements for data security by using dedicated hardware security module (HSM) appliances within the AWS Cloud.   
See also [https://aws.amazon.com/cloudhsm/](https://aws.amazon.com/cloudhsm/).

**CloudSearch**<a name="cloudSearch"></a>  
Amazon CloudSearch is a fully managed service in the AWS Cloud that you can use to set up, manage, and scale a search solution for your website or application.   
See also [https://aws.amazon.com/cloudsearch/](https://aws.amazon.com/cloudsearch/).

**CloudTrail**<a name="cloudtrail"></a>  
AWS CloudTrail is a web service that records AWS API calls for your account and delivers log files to you. The recorded information includes the identity of the API caller, the time of the API call, the source IP address of the API caller, the request parameters, and the response elements that the AWS service returns.   
See also [https://aws.amazon.com/cloudtrail/](https://aws.amazon.com/cloudtrail/).

**CloudWatch**<a name="AmazonCW"></a>  
Amazon CloudWatch is a web service that you can use to monitor and manage various metrics, and configure alarm actions based on data from those metrics.   
See also [https://aws.amazon.com/cloudwatch](https://aws.amazon.com/cloudwatch/).

**CloudWatch Events**<a name="AmazonCWE"></a>  
Amazon CloudWatch Events is a web service that you can use to deliver a timely stream of system events that describe changes in AWS [resources](#resource) to [Lambda](#lambda) functions, streams in [Kinesis Data Streams](#AmazonKinesisStreams), [Amazon SNS](#SNS) topics, or built-in targets.    
See also [https://aws.amazon.com/cloudwatch](https://aws.amazon.com/cloudwatch/).

**CloudWatch Logs**<a name="AmazonCWL"></a>  
Amazon CloudWatch Logs is a web service for monitoring and troubleshooting your systems and applications from your existing system, application, and custom log files. You can send your existing log files to CloudWatch Logs and monitor these logs in near-real time.   
See also [https://aws.amazon.com/cloudwatch](https://aws.amazon.com/cloudwatch/).

**cluster**<a name="cluster"></a>  
A logical grouping of [container instances](#container_instance) that you can place [tasks](#task) on.   
[OpenSearch Service](#AmazonElasticsearchService): A logical grouping of one or more data nodes, optional dedicated master nodes, and storage required to run Amazon OpenSearch Service (OpenSearch Service) and operate your OpenSearch Service domain.   
See also [data node](#data-node). 
See also [dedicated master node](#dedicatedmasternode). 
See also [node](#node).

**cluster compute instance**<a name="ClusterCompute"></a>  
A type of [instance](#instance) that provides a great amount of CPU power coupled with increased networking performance, making it well suited for High Performance Compute (HPC) applications and other demanding network-bound applications. 

**cluster placement group**<a name="ClusterPlacementGroup"></a>  
A logical [cluster compute instance](#ClusterCompute) grouping to provide lower latency and high-bandwidth connectivity between the [instances](#instance). 

**cluster status**<a name="clusterstatus"></a>  
[OpenSearch Service](#AmazonElasticsearchService): An indicator of the health of a cluster. A status can be green, yellow, or red. At the shard level, green means that all shards are allocated to nodes in a cluster, yellow means that the primary shard is allocated but the replica shards aren't, and red means that the primary and replica shards of at least one index aren't allocated. The shard status determines the index status, and the index status determines the cluster status. 

**CNAME**<a name="cname"></a>  
Canonical Name Record. A type of [resource record](#resourcerecord) in the Domain Name System (DNS) that specifies that the domain name is an alias of another, canonical domain name. Specifically, it's an entry in a DNS table that you can use to alias one fully qualified domain name to another. 

**Code Signing for AWS IoT**<a name="codesinging"></a>  
A service for signing code that you create for any IoT device that's supported by Amazon Web Services (AWS).

**CodeBuild**<a name="AWSCodeBuild"></a>  
AWS CodeBuild is a fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy.   
See also [https://aws.amazon.com/codebuild](https://aws.amazon.com/codebuild/).

**CodeCommit**<a name="AWSCodeCommit"></a>  
AWS CodeCommit is a fully managed source control service that companies can use to host secure and highly scalable private Git repositories.   
See also [https://aws.amazon.com/codecommit](https://aws.amazon.com/codecommit/).

**CodeDeploy**<a name="AWSCodeDeploy"></a>  
AWS CodeDeploy is a service that automates code deployments to any instance, including [EC2 instances](#ec2instance) and [instances](#instance) running on-premises.   
See also [https://aws.amazon.com/codedeploy](https://aws.amazon.com/codedeploy/).

**AWS CodeDeploy agent**<a name="AWSCodeDeployagent"></a>  
AWS CodeDeploy agent is a software package that, when installed and configured on an instance, enables that instance to be used in CodeDeploy deployments.

**CodeGuru**<a name="codeguru"></a>  
Amazon CodeGuru is a collection of developer tools that automate code reviews and provide intelligent recommendations to optimize application performance.   
See also [https://aws.amazon.com/codeguru](https://aws.amazon.com/codeguru/).

**CodePipeline**<a name="AWSCodePipeline"></a>  
AWS CodePipeline is a continuous delivery service for fast and reliable application updates.   
See also [https://aws.amazon.com/codepipeline](https://aws.amazon.com/codepipeline/).

**Amazon Cognito**<a name="cognito"></a>  
Amazon Cognito is a web service that you can use to save mobile user data in the AWS Cloud without writing any backend code or managing any infrastructure. Examples of mobile user data that you can save include app preferences and game states. Amazon Cognito offers mobile identity management and data synchronization across devices.    
See also [https://aws.amazon.com/cognito/](https://aws.amazon.com/cognito/).

**collaboration**<a name="collaboration"></a>  
[AWS Clean Rooms](#cleanrooms): A secure logical boundary in AWS Clean Rooms in which members can perform SQL queries on configured tables.

**AWS CLI**<a name="awscli"></a>  
AWS Command Line Interface is a unified downloadable and configurable tool for managing AWS services. Control multiple AWS services from the command line and automate them through scripts.   
See also [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/).

**complaint**<a name="complaint"></a>  
The event where a [recipient](#recipient) who doesn't want to receive an email message chooses "Mark as Spam" within the email client, and the [internet service provider (ISP)](#internetserviceprovider) sends a notification to [Amazon SES](#SES).

**compound query**<a name="compoundquery"></a>  
[CloudSearch](#cloudSearch): A search request that specifies multiple search criteria using the Amazon CloudSearch structured search syntax.

**Amazon Comprehend**<a name="comprehend"></a>  
Amazon Comprehend is a natural language processing (NLP) service that uses machine learning to find insights and relationships in text.   
See also [https://aws.amazon.com/comprehend/](https://aws.amazon.com/comprehend/).

**Amazon Comprehend Medical**<a name="comprehendmedical"></a>  
Amazon Comprehend Medical is a HIPAA-eligible natural language processing (NLP) service that uses machine learning (ML), and has been pre-trained to understand and extract health data from medical text, such as prescriptions, procedures, or diagnoses.   
See also [https://aws.amazon.com/comprehend/medical](https://aws.amazon.com/comprehend/medical/).

**condition**<a name="condition"></a>  
[IAM](#IAM): Any restriction or detail about a permission. The condition is *D* in the statement "A has permission to do B to C where D applies."  
[AWS WAF](#awswaf): A set of attributes that AWS WAF searches for in web requests to AWS [resources](#resource) such as [Amazon CloudFront](#AmazonCF) distributions. Conditions can include values such as the IP addresses that web requests originate from or values in request headers. Based on the specified conditions, you can configure AWS WAF to allow or block web requests to AWS resources.

**conditional parameter**<a name="conditional_parameter"></a>   
See [mapping](#mapping).

**AWS Config**<a name="config"></a>  
AWS Config is a fully managed service that provides an AWS [resource](#resource) inventory, configuration history, and configuration change notifications for better security and governance. You can create rules that automatically check the configuration of AWS resources that AWS Config records.   
See also [https://aws.amazon.com/config/](https://aws.amazon.com/config/).

**configuration API**<a name="configurationapi"></a>  
[CloudSearch](#cloudSearch): The API call that you use to create, configure, and manage search domains.

**configuration template**<a name="configtemplate"></a>  
A series of key–value pairs that define parameters for various AWS products so that [Elastic Beanstalk](#Beanstalk) can provision them for an environment.

**Connect Customer**<a name="connect"></a>  
Amazon Connect Customer is a service solution that offers self-service configuration and provides dynamic, personal, and natural customer engagement at any scale.   
See also [https://aws.amazon.com/connect/](https://aws.amazon.com/connect/).

**consistency model**<a name="consistencymodel"></a>  
The method a service uses to achieve high availability. For example, it could involve replicating data across multiple servers in a data center.   
See also [eventual consistency](#eventualconsistency).

**console**<a name="console"></a>   
See [AWS Management Console](#AWSManagementConsole).

**Console Mobile Application**<a name="mobile"></a>  
AWS Console Mobile Application lets AWS customers monitor and manage a select set of resources to stay informed and connected with their AWS resources while on the go.   
See also [https://aws.amazon.com/console/mobile](https://aws.amazon.com/console/mobile/).

**consolidated billing**<a name="consolidatedbilling"></a>  
A feature of the AWS Organizations service for consolidating payment for multiple AWS accounts. You create an organization that contains your AWS accounts, and you use the management account of your organization to pay for all member accounts. You can see a combined view of AWS costs that are incurred by all accounts in your organization, and you can get detailed cost reports for individual accounts. 

**container**<a name="container"></a>  
A container is a standard unit of software that contains application code and all relevant dependencies.

**container definition**<a name="container_definition"></a>  
A container definition specifies the details that are associated with running a [container](#container) on Amazon ECS. More specifically, a container definition specifies details such as the container image to use and how much CPU and memory the container is allocated. The container definition is included as part of an Amazon ECS [task definition](#task_definition).

**container instance**<a name="container_instance"></a>  
A container instance is a self-managed [EC2 instance](#ec2instance) or an on-premises server or virtual machine (VM) that's running the Amazon Elastic Container Service (Amazon ECS) container agent and has been registered into a [cluster](#cluster). A container instance serves as the infrastructure that your Amazon ECS workloads are run on.

**container registry**<a name="container_registry"></a>  
A container registry is a collection of repositories that store container images. One example is Amazon Elastic Container Registry (Amazon ECR).

**content delivery network (CDN)**<a name="content-delivery-network"></a>  
A web service that speeds up distribution of your static and dynamic web content—such as .html, .css, .js, media files, and image files—to your users by using a worldwide network of data centers. When a user requests your content, the request is routed to the data center that provides the lowest latency (time delay). If the content is already in the location with the lowest latency, the CDN delivers it immediately. If not, the CDN retrieves it from an origin that you specify (for example, a web server or an Amazon S3 bucket). With some CDNs, you can help secure your content by configuring an HTTPS connection between users and data centers, and between data centers and your origin. Amazon CloudFront is an example of a CDN.

**contextual metadata**<a name="contextual-metadata"></a>  
[Amazon Personalize](#amazonpersonalize): Interactions data that you collect about a user's browsing context (such as device used or location) when an event (such as a click) occurs. Contextual metadata can improve recommendation relevance for new and existing users.   
See also [Interactions dataset](#interactions-dataset). 
See also [event](#event).

**continuous delivery**<a name="continuous_delivery"></a>  
A software development practice where code changes are automatically built, tested, and prepared for a release to production.   
See also [https://aws.amazon.com/devops/continuous-delivery/](https://aws.amazon.com/devops/continuous-delivery/).

**continuous integration**<a name="continuous_integration"></a>  
A software development practice where developers regularly merge code changes into a central repository, after which automated builds and tests are run.   
See also [https://aws.amazon.com/devops/continuous-integration/](https://aws.amazon.com/devops/continuous-integration/).

**AWS Control Tower**<a name="controltower"></a>  
AWS Control Tower is a service used to set up and govern a secure, multi-account AWS environment.   
See also [https://aws.amazon.com/controltower](https://aws.amazon.com/controltower/).

**cooldown period**<a name="cooldown"></a>  
Amount of time that [Amazon EC2 Auto Scaling](#AutoScaling) doesn't allow the desired size of the [Auto Scaling group](#AutoScalingGroup) to be changed by any other notification from an [CloudWatch](#AmazonCW) [alarm](#alarm).

**core node**<a name="corenode"></a>  
An [EC2 instance](#ec2instance) that runs [Hadoop](#Hadoop) map and reduce tasks and stores data using the Hadoop Distributed File System (HDFS). Core nodes are managed by the [master node](#masternode), which assigns Hadoop tasks to nodes and monitors their status. The EC2 instances you assign as core nodes are capacity that must be allotted for the entire job flow run. Because core nodes store data, you can't remove them from a job flow. However, you can add more core nodes to a running job flow.   
Core nodes run both the DataNodes and TaskTracker Hadoop daemons.

**corpus**<a name="corpus"></a>  
[CloudSearch](#cloudSearch): A collection of data that you want to search.

**Corretto**<a name="AmazonCorretto"></a>  
Amazon Corretto is a no-cost, multiplatform, production-ready distribution of the Open Java Development Kit (OpenJDK).   
See also [https://aws.amazon.com/corretto/](https://aws.amazon.com/corretto/).

**coverage**<a name="coverage"></a>  
[Amazon Personalize](#amazonpersonalize): An evaluation metric that tells you the proportion of unique items that Amazon Personalize might recommend using your model out of the total number of unique items in Interactions and Items datasets. To make sure Amazon Personalize recommends more of your items, use a model with a higher coverage score. Recipes that feature item exploration, such as user-personalization, have higher coverage than those that don’t, such as popularity-count.   
See also [metrics](#metrics). 
See also [Items dataset](#items-dataset). 
See also [Interactions dataset](#interactions-dataset). 
See also [item exploration](#item-exploration). 
See also [user-personalization recipe](#userpersonalization). 
See also [popularity-count recipe](#popularity-count-recipe).

**credential helper**<a name="credentialhelper"></a>  
[CodeCommit](#AWSCodeCommit): A program that stores credentials for repositories and supplies them to Git when making connections to those repositories. The [AWS CLI](#awscli) includes a credential helper that you can use with Git when connecting to CodeCommit repositories.

**credentials**<a name="accesscredentials"></a>  
Also called *access credentials* or *security credentials*. In authentication and authorization, a system uses credentials to identify who is making a call and whether to allow the requested access. In AWS, these credentials are typically the [access key ID](#accesskeyID) and the [secret access key](#SecretAccessKey).

**cross-account access**<a name="crossaccountaccess"></a>  
The process of permitting limited, controlled use of [resources](#resource) in one [AWS account](#account) by a user in another AWS account. For example, in [CodeCommit](#AWSCodeCommit) and [CodeDeploy](#AWSCodeDeploy) you can configure cross-account access so that a user in AWS account A can access an CodeCommit repository created by account B. Or a pipeline in [CodePipeline](#AWSCodePipeline) created by account A can use CodeDeploy resources created by account B. In [IAM](#IAM) you use a [role](#role) to [delegate](#delegation) temporary access to a [user](#AWSUser) in one account to resources in another.

**cross-Region replication**<a name="cross-region-replication"></a>  
A solution for replicating data across different [AWS Regions](#region), in near-real time.

**Cryptographic Computing for Clean Rooms (C3R)**<a name="C3R"></a>  
[AWS Clean Rooms](#cleanrooms): A capability in AWS Clean Rooms that organizations can use to bring sensitive data together to derive new insights from data analytics while cryptographically limiting what any party in the process can learn.

**customer gateway**<a name="customergateway"></a>  
A router or software application on your side of a VPN tunnel that's managed by [Amazon VPC](#vpc). The internal interfaces of the customer gateway are attached to one or more devices in your home network. The external interface is attached to the [virtual private gateway (VGW)](#VPNgateway) across the VPN tunnel. 

**customer managed policy**<a name="customer_managed_policy"></a>  
An [IAM](#IAM) [managed policy](#managed_policy) that you create and manage in your [AWS account](#account).

**customer master key (CMK)**<a name="customer_master_key"></a>  
We no longer use customer master key or CMK. These terms are replaced by AWS KMS key (first mention) and KMS key (subsequent mention). For more information, see [KMS key](#KMSkey).

### D<a name="D"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**dashboard**<a name="dashboard"></a>   
See [service health dashboard](#servicehealthdashboard).

**data consistency**<a name="data-consistency"></a>  
A concept that describes when data is written or updated successfully and all copies of the data are updated in all [AWS Regions](#region). However, it takes time for the data to propagate to all storage locations. To support varied application requirements, [DynamoDB](#dynamodb) supports both eventually consistent and strongly consistent reads.   
See also [eventual consistency](#eventualconsistency). 
See also [eventually consistent read](#eventually-consistent-read). 
See also [strongly consistent read](#strongly-consistent-read).

**AWS Data Exchange**<a name="data-exchange"></a>  
AWS Data Exchange is a service that helps you find, subscribe to, and use third-party data in the cloud.   
See also [https://aws.amazon.com/data-exchange](https://aws.amazon.com/data-exchange/).

**Amazon Data Lifecycle Manager**<a name="datalifecyclemanager"></a>  
Amazon Data Lifecycle Manager is an Amazon service that automates and manages the lifecycle of Amazon EBS snapshots and [Amazon EBS-backed AMIs](#EBSbacked).

**data node**<a name="data-node"></a>  
[OpenSearch Service](#AmazonElasticsearchService): An OpenSearch instance that holds data and responds to data upload requests.   
See also [dedicated master node](#dedicatedmasternode). 
See also [node](#node).

**Data Pipeline**<a name="AmazonDataPipeline"></a>  
AWS Data Pipeline is a web service for processing and moving data between different AWS compute and storage services, as well as on-premises data sources, at specified intervals.   
See also [https://aws.amazon.com/datapipeline](https://aws.amazon.com/datapipeline).

**data schema**<a name="data-schema"></a>   
See [schema](#schema).

**data source**<a name="data_source"></a>  
The database, file, or repository that provides information required by an application or database. For example, in [OpsWorks](#opsworks), valid data sources include an [instance](#instance) for a stack's MySQL layer or a stack's [Amazon RDS](#AmazonRelationalDatabaseService) service layer. In [Amazon Redshift ](#redshift), valid data sources include text files in an [Amazon S3](#amazons3) [bucket](#bucket), in an [Amazon EMR](#AmazonElasticMapReduce) cluster, or on a remote host that a cluster can access through an SSH connection.   
See also [datasource](#datasource).

**database engine**<a name="databaseengine"></a>  
The database software and version running on the [DB instance](#dbinstance).

**database name**<a name="databasename"></a>  
The name of a database hosted in a [DB instance](#dbinstance). A DB instance can host multiple databases, but databases hosted by the same DB instance must each have a unique name within that instance. 

**dataset**<a name="dataset"></a>  
[Amazon Personalize](#amazonpersonalize): A container for the data used by Amazon Personalize. There are three types of Amazon Personalize datasets: Users, Items, and Interactions.   
See also [Interactions dataset](#interactions-dataset). 
See also [Users dataset](#users-dataset). 
See also [Items dataset](#items-dataset).

**dataset group**<a name="dataset-group"></a>  
[Amazon Personalize](#amazonpersonalize): A container for Amazon Personalize components, including datasets, event trackers, solutions, filters, campaigns, and batch inference jobs. A dataset group organizes your resources into independent collections, so resources from one dataset group can’t influence resources in any other dataset group.   
See also [dataset](#dataset). 
See also [event tracker](#event-tracker). 
See also [solution](#solution). 
See also [campaign](#campaign).

**datasource**<a name="datasource"></a>  
[Amazon ML](#machine-learning): An object that contains metadata about the input data. Amazon ML reads the input data, computes descriptive statistics on its attributes, and stores the statistics—along with a schema and other information—as part of the datasource object. Amazon ML uses datasources to train and evaluate a machine learning model and generate batch predictions.   
See also [data source](#data_source).

**DataSync**<a name="datasync"></a>  
AWS DataSync is an online data transfer service that simplifies, automates, and accelerates moving data between storage systems and services.   
See also [https://aws.amazon.com/datasync](https://aws.amazon.com/datasync/).

**DB compute class**<a name="DBComputeclass"></a>  
The size of the database compute platform used to run the instance.

**DB instance**<a name="dbinstance"></a>  
An isolated database environment running in the cloud. A DB instance can contain multiple user-created databases.

**DB instance identifier**<a name="DBInstanceidentifier"></a>  
User-supplied identifier for the DB instance. The identifier must be unique for that user in an [AWS Region](#region).

**DB parameter group**<a name="DBParameterGroup"></a>  
A container for database engine parameter values that apply to one or more [DB instances](#dbinstance).

**DB security group**<a name="DBSecurityGroup"></a>  
A method that controls access to the [DB instance](#dbinstance). By default, network access is turned off to DB instances. After inbound traffic is configured for a [security group](#SecurityGroup), the same rules apply to all DB instances associated with that group.

**DB snapshot**<a name="DBSnapshot"></a>  
A user-initiated point backup of a [DB instance](#dbinstance).

**Dedicated Host**<a name="DedicatedHost"></a>  
A physical server with [EC2 instance](#ec2instance) capacity fully dedicated to a user.

**Dedicated Instance**<a name="DedicatedInstance"></a>  
An [instance](#instance) that's physically isolated at the host hardware level and launched within a [Amazon VPC](#vpc).

**dedicated master node**<a name="dedicatedmasternode"></a>  
[OpenSearch Service](#AmazonElasticsearchService): An OpenSearch instance that performs cluster management tasks, but doesn't hold data or respond to data upload requests. Amazon OpenSearch Service (OpenSearch Service) uses dedicated master nodes to increase cluster stability.    
See also [data node](#data-node). 
See also [node](#node).

**Dedicated Reserved Instance**<a name="DedicatedReservedInstance"></a>  
An option that you purchase to guarantee that sufficient capacity will be available to launch [Dedicated Instances](#DedicatedInstance) into a [Amazon VPC](#vpc). 

**AWS DeepComposer**<a name="deepcomposer"></a>  
AWS DeepComposer is a web service designed specifically to educate developers through tutorials, sample code, and training data.   
See also [https://aws.amazon.com/deepcomposer](https://aws.amazon.com/deepcomposer/).

**AWS DeepLens**<a name="deeplens"></a>  
AWS DeepLens is a tool that provides AWS customers with a centralized place to search, discover, and connect with trusted APN Technology and Consulting Partners, based on customers' business needs.   
See also [https://aws.amazon.com/deeplens](https://aws.amazon.com/deeplens/).

**AWS DeepRacer**<a name="deepracer"></a>  
AWS DeepRacer is a cloud-based 3D racing simulator, global racing league, and fully autonomous 1/18th-scale race car driven by reinforcement learning.   
See also [https://aws.amazon.com/deepracer](https://aws.amazon.com/deepracer/).

**delegation**<a name="delegation"></a>  
Within a single [AWS account](#account): Giving AWS [users](#AWSUser) access to [resources](#resource) your AWS account.   
Between two AWS accounts: Setting up a trust between the account that owns the resource (the trusting account), and the account that contains the users that need to access the resource (the trusted account).   
See also [trust policy](#trust_policy).

**delete marker**<a name="deletemarker"></a>  
An object with a key and version ID, but without content. [Amazon S3](#amazons3) inserts delete markers automatically into versioned [buckets](#bucket) when an object is deleted.

**deliverability**<a name="deliverability"></a>  
The likelihood that an email message arrives at its intended destination.

**deliveries**<a name="deliveries"></a>  
The number of email messages, sent through [Amazon SES](#SES), that were accepted by an [internet service provider (ISP)](#internetserviceprovider) for delivery to [recipients](#recipient) over a period of time.

**deny**<a name="deny"></a>  
The result of a [policy](#policy) statement that includes deny as the effect, so that a specific action or actions are expressly forbidden for a user, group, or role. Explicit deny take precedence over explicit [allow](#allow). 

**deployment configuration**<a name="deploymentconfiguration"></a>  
[CodeDeploy](#AWSCodeDeploy): A set of deployment rules and success and failure conditions used by the service during a deployment.

**deployment group**<a name="deploymentgroup"></a>  
[CodeDeploy](#AWSCodeDeploy): A set of individually tagged [instances](#instance) or [EC2 instances](#ec2instance) in [Auto Scaling groups](#AutoScalingGroup), or both.

**Description property**<a name="description"></a>  
A property added to parameters, [resources](#resource), resource properties, mappings, and outputs to help you to document [CloudFormation](#CloudFormation) template elements.

**detailed monitoring**<a name="detailedmonitoring"></a>  
Monitoring of AWS provided metrics derived at a 1-minute frequency.

**Detective**<a name="detective"></a>  
Amazon Detective is a service that collects log data from your AWS resources to analyze and identify the root cause of security findings or suspicious activities. The Detective behavior graph provides visualizations to help you to determine the nature and extent of possible security issues and conduct an efficient investigation.   
See also [https://aws.amazon.com/detective/](https://aws.amazon.com/detective/).

**Device Farm**<a name="DeviceFarm"></a>  
AWS Device Farm is an app testing service that you can use to test Android, iOS, and web apps on real, physical phones and tablets that are hosted by AWS.   
See also [https://aws.amazon.com/device-farm/](https://aws.amazon.com/device-farm/).

**Amazon DevOps Guru**<a name="devops-guru"></a>  
Amazon DevOps Guru is a fully managed operations service powered by machine learning (ML), designed to improve an application's operational performance and availability.   
See also [https://aws.amazon.com/devops-guru/](https://aws.amazon.com/devops-guru/).

**dimension**<a name="dimension"></a>  
A name–value pair (for example, InstanceType=m1.small, or EngineName=mysql), that contains additional information to identify a metric.

**Direct Connect**<a name="AWSDirectConnect"></a>  
AWS Direct Connect is a web service that simplifies establishing a dedicated network connection from your premises to AWS. Using Direct Connect, you can establish private connectivity between AWS and your data center, office, or colocation environment.   
See also [ https://aws.amazon.com/directconnect](https://aws.amazon.com/directconnect/).

**Directory Service**<a name="AWSDirectoryService"></a>  
AWS Directory Service is a managed service for connecting your AWS [resources](#resource) to an existing on-premises Microsoft Active Directory or to set up and operate a new, standalone directory in the AWS Cloud.   
See also [ https://aws.amazon.com/directoryservice](https://aws.amazon.com/directoryservice/).

**discussion forums**<a name="discussionforums"></a>  
A place where AWS users can post technical questions and feedback to help accelerate their development efforts and to engage with the AWS community. For more information, see the [Amazon Web Services Discussion Forums](https://forums.aws.amazon.com/).

**distribution**<a name="distribution"></a>  
A link between an origin server (such as an [Amazon S3](#amazons3) [bucket](#bucket)) and a domain name, which [CloudFront](#AmazonCF) automatically assigns. Through this link, CloudFront identifies the object you have stored in your [origin server](#originserver). 

**DKIM**<a name="DKIM"></a>  
DomainKeys Identified Mail is a standard that email senders use to sign their messages. ISPs use those signatures to verify that messages are legitimate. For more information, see [https://tools.ietf.org/html/rfc6376](https://tools.ietf.org/html/rfc6376).

**AWS DMS**<a name="AWSDatabaseMigrationService"></a>  
AWS Database Migration Service is a web service that can help you migrate data to and from many widely used commercial and open-source databases.   
See also [https://aws.amazon.com/dms](https://aws.amazon.com/dms).

**DNS**<a name="DNS_abbrev"></a>   
See [Domain Name System](#domainnamesystem).

**Docker image**<a name="docker_image"></a>  
 A layered file system template that's the basis of a Docker [container](#container). Docker images can comprise specific operating systems or applications. 

**document**<a name="document"></a>  
[CloudSearch](#cloudSearch): An item that can be returned as a search result. Each document has a collection of fields that contain the data that can be searched or returned. The value of a field can be either a string or a number. Each document must have a unique ID and at least one field. 

**document batch**<a name="documentbatch"></a>  
[CloudSearch](#cloudSearch): A collection of add and delete document operations. You use the document service API to submit batches to update the data in your search domain. 

**document service API**<a name="documentsvcapi"></a>  
[CloudSearch](#cloudSearch): The API call that you use to submit document batches to update the data in a search domain.

**document service endpoint**<a name="documentsvcendpoint"></a>  
[CloudSearch](#cloudSearch): The URL that you connect to when sending document updates to an Amazon CloudSearch domain. Each search domain has a unique document service endpoint that remains the same for the life of the domain.

**Amazon DocumentDB**<a name="documentdb"></a>  
Amazon DocumentDB (with MongoDB compatibility) is a managed database service that you can use to set up, operate, and scale MongoDB-compatible databases in the cloud.   
See also [https://aws.amazon.com/documentdb/](https://aws.amazon.com/documentdb/).

**domain**<a name="domain"></a>  
[OpenSearch Service](#AmazonElasticsearchService): The hardware, software, and data exposed by Amazon OpenSearch Service (OpenSearch Service) endpoints. An OpenSearch Service domain is a service wrapper around an OpenSearch cluster. An OpenSearch Service domain encapsulates the engine instances that process OpenSearch Service requests, the indexed data that you want to search, snapshots of the domain, access policies, and metadata.   
See also [cluster](#cluster). 
See also [Elasticsearch](#Elasticsearch).

**Domain Name System**<a name="domainnamesystem"></a>  
Domain Name System is a service that routes internet traffic to websites by translating human-readable domain names (for example, `www.example.com`) into the numeric IP addresses, such as 192.0.2.1, which computers use to connect to each other.

**Donation button**<a name="Donationbutton"></a>  
An HTML-coded button to provide a simple and secure way for US-based, IRS-certified 501(c)(3) nonprofit organizations to solicit donations.

**DynamoDB**<a name="dynamodb"></a>  
Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.    
See also [https://aws.amazon.com/dynamodb/](https://aws.amazon.com/dynamodb/).

**Amazon DynamoDB Encryption Client**<a name="dynamodbencryptionclient"></a>  
Amazon DynamoDB Encryption Client is a software library that helps you protect your table data before you send it to [DynamoDB](#dynamodb).

**Amazon DynamoDB Storage Backend for Titan**<a name="dynamodb-titan-backend"></a>  
Amazon DynamoDB Storage Backend for Titan is a graph database implemented on top of Amazon DynamoDB. Titan is a scalable graph database optimized for storing and querying graphs.   
See also [https://aws.amazon.com/dynamodb/](https://aws.amazon.com/dynamodb/).

**DynamoDB Streams**<a name="dynamodb-streams"></a>  
Amazon DynamoDB Streams is an AWS service that captures a time-ordered sequence of item-level modifications in any Amazon DynamoDB table. This service also stores this information in a log for up to 24 hours. Applications can access this log and view the data items as they appeared before and after they were modified, in near-real time.    
See also [https://aws.amazon.com/dynamodb/](https://aws.amazon.com/dynamodb/).

### E<a name="E"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**Amazon EBS**<a name="EBS"></a>  
Amazon Elastic Block Store is a service that provides block level storage [volumes](#volume) or use with [EC2 instances](#ec2instance).   
See also [https://aws.amazon.com/ebs](https://aws.amazon.com/ebs/).

**Amazon EBS-backed AMI**<a name="EBSbacked"></a>  
An Amazon EBS-backed AMI is a type of [Amazon Machine Image (AMI)](#AmazonMachineImage) whose instances use an [Amazon EBS](#EBS) [volume](#volume) as their root device. Compare this with instances launched from [instance store-backed AMIs](#instancebacked), which use the [instance store](#instancestore) as the root device.

**Amazon EC2**<a name="ec2"></a>  
Amazon Elastic Compute Cloud is a web service for launching and managing Linux/UNIX and Windows Server [instances](#instance) in Amazon data centers.    
See also [https://aws.amazon.com/ec2](https://aws.amazon.com/ec2/).

**Amazon EC2 Auto Scaling**<a name="AutoScaling"></a>  
Amazon EC2 Auto Scaling is a web service that launches or terminates instances automatically based on user-defined [policies](#policy), schedules, and [health checks](#healthcheck).   
See also [https://aws.amazon.com/ec2/autoscaling](https://aws.amazon.com/ec2/autoscaling/).

**EC2 instance**<a name="ec2instance"></a>  
A compute [instance](#instance) in the [Amazon EC2](#ec2) service. Other AWS services use the term *EC2 instance* to distinguish these instances from other types of instances they support.

**Amazon ECR**<a name="ecr"></a>  
Amazon Elastic Container Registry (Amazon ECR) is a fully managed Docker container registry that you can use to store, manage, and deploy Docker container images. Amazon ECR is integrated with [Amazon ECS](#ecs) and [IAM](#IAM).   
See also [https://aws.amazon.com/ecr](https://aws.amazon.com/ecr).

**Amazon ECS**<a name="ecs"></a>  
Amazon Elastic Container Service (Amazon ECS) is a highly scalable, fast, [container](#container) management service that you can use to run, stop, and manage Docker containers on a [cluster](#cluster) of EC2 instances.   
See also [https://aws.amazon.com/ecs](https://aws.amazon.com/ecs).

**edge location**<a name="edgeloc"></a>  
edge location is a data center that an AWS service uses to perform service-specific operations. For example, [CloudFront](#AmazonCF) uses edge locations to cache copies of your content, so the content is closer to your users and can be delivered faster regardless of their location. [Route 53](#Route53) uses edge locations to speed up the response to public DNS queries.

**Amazon EFS**<a name="efs"></a>  
Amazon Elastic File System is a file storage service for [EC2](#ec2) [instances](#instance). Amazon EFS provides an interface that you can use to create and configure file systems. Amazon EFS storage capacity grows and shrinks automatically as you add and remove files.   
See also [https://aws.amazon.com/efs/](https://aws.amazon.com/efs/).

**Amazon EKS**<a name="elastickubernetes"></a>  
Amazon Elastic Kubernetes Service is a managed service that you can use to run Kubernetes on AWS without needing to stand up or maintain your own Kubernetes control plane.   
See also [https://aws.amazon.com/eks/](https://aws.amazon.com/eks/).

**Elastic**<a name="Elastic"></a>  
A company that provides open-source solutions—including OpenSearch, Logstash, Kibana, and Beats—that take data from any source and search, analyze, and visualize it in real time.  
Amazon OpenSearch Service (OpenSearch Service) is an AWS managed service for deploying, operating, and scaling OpenSearch in the AWS Cloud.   
See also [OpenSearch Service](#AmazonElasticsearchService). 
See also [Elasticsearch](#Elasticsearch).

**Elastic Beanstalk**<a name="Beanstalk"></a>  
AWS Elastic Beanstalk is a web service for deploying and managing applications in the AWS Cloud without worrying about the infrastructure that runs those applications.   
See also [https://aws.amazon.com/elasticbeanstalk](https://aws.amazon.com/elasticbeanstalk/).

**Elastic Block Store**<a name="EBS_full"></a>   
See [Amazon EBS](#EBS).

**Elastic Inference**<a name="elastic-inference"></a>  
Amazon Elastic Inference is a resource that customers can use to attach low-cost GPU-powered acceleration to Amazon EC2 and SageMaker AI instances, or Amazon ECS tasks, to reduce the cost of running deep learning inference by up to 75%.   
See also [https://aws.amazon.com/machine-learning/elastic-inference](https://aws.amazon.com/machine-learning/elastic-inference/).

**Elastic IP address**<a name="ElasticIP"></a>  
A fixed (static) IP address that you have allocated in [Amazon EC2](#ec2) or [Amazon VPC](#vpc) and then attached to an [instance](#instance). Elastic IP addresses are associated with your account, not a specific instance. They are *elastic* because you can easily allocate, attach, detach, and free them as your needs change. Unlike traditional static IP addresses, Elastic IP addresses allow you to mask instance or [Availability Zone](#AZ) failures by rapidly remapping your public IP addresses to another instance.

**ELB**<a name="ELB"></a>  
Elastic Load Balancing is a web service that improves an application's availability by distributing incoming traffic between two or more [EC2 instances](#ec2instance).   
See also [https://aws.amazon.com/elasticloadbalancing](https://aws.amazon.com/elasticloadbalancing/).

**elastic network interface**<a name="elasticnetworkinterface"></a>  
An additional network interface that can be attached to an [instance](#instance). Elastic network interfaces include a primary private IP address, one or more secondary private IP addresses, an Elastic IP Address (optional), a MAC address, membership in specified [security groups](#SecurityGroup), a description, and a source/destination check flag. You can create an elastic network interface, attach it to an instance, detach it from an instance, and attach it to another instance. 

**Elastic Transcoder**<a name="elastictranscoder"></a>  
Amazon Elastic Transcoder is a cloud-based media transcoding service. Elastic Transcoder is a highly scalable tool for converting (or *transcoding*) media files from their source format into versions that play on devices such as smartphones, tablets, and PCs.   
See also [https://aws.amazon.com/elastictranscoder/](https://aws.amazon.com/elastictranscoder/).

**ElastiCache**<a name="elasticache"></a>  
Amazon ElastiCache is a web service that simplifies deploying, operating, and scaling an in-memory cache in the cloud. The service improves the performance of web applications by providing information retrieval from fast, managed, in-memory caches, instead of relying entirely on slower disk-based databases.   
See also [https://aws.amazon.com/elasticache/](https://aws.amazon.com/elasticache/).

**Elasticsearch**<a name="Elasticsearch"></a>  
An open-source, real-time distributed search and analytics engine used for full-text search, structured search, and analytics. OpenSearch was developed by the Elastic company.  
Amazon OpenSearch Service (OpenSearch Service) is an AWS managed service for deploying, operating, and scaling OpenSearch in the AWS Cloud.   
See also [OpenSearch Service](#AmazonElasticsearchService). 
See also [Elastic](#Elastic).

**AWS Elemental MediaConnect**<a name="mediaconnect"></a>  
AWS Elemental MediaConnect is a fully-managed live video distribution service that reliably and securely ingests video into the AWS Cloud and transports it to multiple destinations within the AWS network and the internet.   
See also [https://aws.amazon.com/mediaconnect](https://aws.amazon.com/mediaconnect/).

**AWS Elemental MediaConvert**<a name="AWSElementalMediaConvert"></a>  
AWS Elemental MediaConvert is a file-based media conversion service that transforms content into formats for traditional broadcast and internet streaming.   
See also [https://aws.amazon.com/mediaconvert](https://aws.amazon.com/mediaconvert).

**AWS Elemental MediaLive**<a name="AWSElementalMediaLive"></a>  
AWS Elemental MediaLive is a cloud-based live video encoding service that creates high-quality streams for delivery to broadcasts and internet-connected devices.   
See also [https://aws.amazon.com/medialive](https://aws.amazon.com/medialive).

**AWS Elemental MediaPackage**<a name="AWSElementalMediaPackage"></a>  
AWS Elemental MediaPackage is a highly-scalable video origination and packaging service that delivers video securely and reliably.   
See also [https://aws.amazon.com/mediapackage](https://aws.amazon.com/mediapackage).

**AWS Elemental MediaStore**<a name="AWSElementalMediaStore"></a>  
AWS Elemental MediaStore is a storage service optimized for media that provides the performance, consistency, and low latency required to deliver live and on-demand video content at scale.   
See also [https://aws.amazon.com/mediastore](https://aws.amazon.com/mediastore).

**AWS Elemental MediaTailor**<a name="AWSElementalMediaTailor"></a>  
AWS Elemental MediaTailor is a channel assembly and personalized ad-insertion service for over-the-top (OTT) video and audio applications.   
See also [https://aws.amazon.com/mediatailor](https://aws.amazon.com/mediatailor).

**EMP**<a name="emp"></a>  
 The AWS End-of-Support Migration Program for Windows Server provides the technology and guidance to migrate your applications running on Windows Server 2003, Windows Server 2008, and Windows Server 2008 R2 to the latest, supported versions of Windows Server running on Amazon Web Services (AWS).

**Amazon EMR**<a name="AmazonElasticMapReduce"></a>  
Amazon Elastic Map Reduce is a web service that you can use to process large amounts of data efficiently. Amazon EMR uses [Hadoop](#Hadoop) processing combined with several AWS products to do such tasks as web indexing, data mining, log file analysis, machine learning, scientific simulation, and data warehousing.    
See also [https://aws.amazon.com/elasticmapreduce](https://aws.amazon.com/elasticmapreduce/).

**encrypt**<a name="encrypt"></a>  
To use a mathematical algorithm to make data unintelligible to unauthorized [users](#AWSUser). Encryption also gives authorized users a method (such as a key or password) to convert the altered data back to its original state.

**encryption context**<a name="encryption_context"></a>  
A set of key–value pairs that contains additional information associated with [AWS KMS](#awskms)–encrypted information.

**AWS Encryption SDK**<a name="encryptionsdk"></a>  
AWS Encryption SDK is a client-side encryption library that you can use to encrypt and decrypt data using industry standards and best practices.   
See also [https://aws.amazon.com/blogs/security/tag/aws-encryption-sdk/](https://aws.amazon.com/blogs/security/tag/aws-encryption-sdk/).

**endpoint**<a name="endpoint"></a>  
A URL that identifies a host and port as the entry point for a web service. Every web service request contains an endpoint. Most AWS products provide endpoints for a Region to enable faster connectivity.  
[ElastiCache](#elasticache): The DNS name of a [cache node](#CacheNode).  
[Amazon RDS](#AmazonRelationalDatabaseService): The DNS name of a [DB instance](#dbinstance).  
[CloudFormation](#CloudFormation): The DNS name or IP address of the server that receives an HTTP request.

**endpoint port**<a name="endpointport"></a>  
[ElastiCache](#elasticache): The port number used by a [cache node](#CacheNode).  
[Amazon RDS](#AmazonRelationalDatabaseService): The port number used by a [DB instance](#dbinstance).

**envelope encryption**<a name="envelope_encryption"></a>  
The use of a master key and a data key to algorithmically protect data. The master key is used to encrypt and decrypt the data key and the data key is used to encrypt and decrypt the data itself. 

**environment**<a name="environment"></a>  
[Elastic Beanstalk](#Beanstalk): A specific running instance of an [application](#application). The application has a CNAME and includes an application version and a customizable configuration (which is inherited from the default container type).  
[CodeDeploy](#AWSCodeDeploy): Instances in a deployment group in a blue/green deployment. At the start of a blue/green deployment, the deployment group is made up of instances in the original environment. At the end of the deployment, the deployment group is made up of instances in the replacement environment.

**environment configuration**<a name="environmentconfiguration"></a>  
A collection of parameters and settings that define how an environment and its associated resources behave.

**ephemeral store**<a name="ephemeral_store"></a>   
See [instance store](#instancestore).

**epoch**<a name="epoch"></a>  
The date from which time is measured. For most Unix environments, the epoch is January 1, 1970.

**ETL**<a name="ETL_abbrev"></a>   
See [extract, transform, and load (ETL)](#extracttransformload).

**evaluation**<a name="evaluation"></a>  
Amazon Machine Learning: The process of measuring the predictive performance of a machine learning (ML) model.  
Also a machine learning object that stores the details and result of an ML model evaluation.

**evaluation datasource**<a name="evaluation-datasource"></a>  
The data that Amazon Machine Learning uses to evaluate the predictive accuracy of a machine learning model.

**event**<a name="event"></a>  
[Amazon Personalize](#amazonpersonalize): A user activity—such as a click, a purchase, or a video viewing—that you record and upload to an Amazon Personalize Interactions dataset. You record events individually in real time or record and upload events in bulk.   
See also [dataset](#dataset). 
See also [Interactions dataset](#interactions-dataset).

**event tracker**<a name="event-tracker"></a>  
[Amazon Personalize](#amazonpersonalize): Specifies a destination dataset group for event data that you record in real time. When you record events in real time, you provide the ID of the event tracker so that Amazon Personalize knows where to add the data.   
See also [dataset group](#dataset-group). 
See also [event](#event).

**EventBridge**<a name="eventbridge"></a>  
Amazon EventBridge is a serverless event bus service that you can use to connect your applications with data from a variety of sources and routes that data to targets such as AWS Lambda. You can set up routing rules to determine where to send your data to build application architectures that react in real time to all of your data sources.   
See also [https://aws.amazon.com/eventbridge/](https://aws.amazon.com/eventbridge/).

**eventual consistency**<a name="eventualconsistency"></a>  
The method that AWS services use to achieve high availability. This involves replicating data across multiple servers in Amazon data centers. When data is written or updated and `Success` is returned, all copies of the data are updated. However, it takes time for the data to propagate to all storage locations. The data will eventually be consistent, but an immediate read might not show the change. Consistency is usually reached within seconds.   
See also [data consistency](#data-consistency). 
See also [eventually consistent read](#eventually-consistent-read). 
See also [strongly consistent read](#strongly-consistent-read).

**eventually consistent read**<a name="eventually-consistent-read"></a>  
A read process that returns data from only one Region and might not show the most recent write information. However, if you repeat your read request after a short time, the response should eventually return the latest data.   
See also [data consistency](#data-consistency). 
See also [eventual consistency](#eventualconsistency). 
See also [strongly consistent read](#strongly-consistent-read).

**eviction**<a name="eviction"></a>  
The deletion by [CloudFront](#AmazonCF) of an object from an [edge location](#edgeloc) before its expiration time. If an object in an edge location isn't frequently requested, CloudFront might evict the object (remove the object before its expiration date) to make room for objects that are more popular. 

**exbibyte (EiB)**<a name="exbibyte"></a>  
A contraction of exa binary byte. An exbibyte (EiB) is 2^60 or 1,152,921,504,606,846,976 bytes. An exabyte (EB) is 10^18 or 1,000,000,000,000,000,000 bytes. 1,024 EiB is a [zebibyte (ZiB)](#zebibyte).

**expiration**<a name="expiration"></a>  
For [CloudFront](#AmazonCF) caching, the time when CloudFront stops responding to user requests with an object. If you don't use headers or CloudFront [distribution](#distribution) settings to specify how long you want objects to stay in an [edge location](#edgeloc), the objects expire after 24 hours. The next time a user requests an object that has expired, CloudFront forwards the request to the [origin](#originserver).

**explicit impressions**<a name="explicit-impressions"></a>  
[Amazon Personalize](#amazonpersonalize): A list of items that you manually add to an Amazon Personalize Interactions dataset to influence future recommendations. Unlike *implicit impressions*, where Amazon Personalize automatically derives the impressions data, you choose what to include in explicit impressions.   
See also [recommendations](#recommendations). 
See also [Interactions dataset](#interactions-dataset). 
See also [impressions data](#impressions-data). 
See also [implicit impressions](#implicit-impressions).

**explicit launch permission**<a name="explicitlaunchpermission"></a>  
An [Amazon Machine Image (AMI)](#AmazonMachineImage) launch permission granted to a specific [AWS account](#account).

**exponential backoff**<a name="exponentialbackoff"></a>  
A strategy that incrementally increases the wait between retry attempts in order to reduce the load on the system and increase the likelihood that repeated requests will succeed. For example, client applications might wait up to 400 milliseconds before attempting the first retry, up to 1600 milliseconds before the second, and up to 6400 milliseconds (6.4 seconds) before the third.

**expression**<a name="expression"></a>  
[CloudSearch](#cloudSearch): A numeric expression that you can use to control how search hits are sorted. You can construct Amazon CloudSearch expressions using numeric fields, other rank expressions, a document's default relevance score, and standard numeric operators and functions. When you use the `sort` option to specify an expression in a search request, the expression is evaluated for each search hit and the hits are listed according to their expression values.

**extract, transform, and load (ETL)**<a name="extracttransformload"></a>  
A process that's used to integrate data from multiple sources. Data is collected from sources (extract), converted to an appropriate format (transform), and written to a target data store (load) for purposes of analysis and querying.  
ETL tools combine these three functions to consolidate and move data from one environment to another. [AWS Glue](#Glue) is a fully managed ETL service for discovering and organizing data, transforming it, and making it available for search and analytics.

### F<a name="F"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**facet**<a name="facet"></a>  
[CloudSearch](#cloudSearch): An index field that represents a category that you want to use to refine and filter search results.

**facet enabled**<a name="facetenabled"></a>  
[CloudSearch](#cloudSearch): An index field option that enables facet information to be calculated for the field.

**AWS Fargate**<a name="awsfargate"></a>  
AWS Fargate is a serverless, pay-as-you-go compute engine that you can use to build applications on AWS. You can use Amazon Elastic Container Service (Amazon ECS) or Amazon Elastic Kubernetes Service (Amazon EKS) to maintain container applications using AWS Fargate.    
See also [https://aws.amazon.com/fargate/](https://aws.amazon.com/fargate/).

**Fault Injection Simulator (AWS FIS)**<a name="fis"></a>  
AWS Fault Injection Service is a managed service that you can use to perform fault injection experiments on your AWS workloads.   
See also [https://aws.amazon.com/fis](https://aws.amazon.com/fis/).

**FBL**<a name="FBL_abbrev"></a>   
See [feedback loop (FBL)](#feedbackloop).

**feature transformation**<a name="feature-transformation"></a>  
Amazon Machine Learning: The machine learning process of constructing more predictive input representations or “features” from the raw input variables to optimize a machine learning model’s ability to learn and generalize. Also known as *data transformation* or *feature engineering*.

**federated identity management (FIM)**<a name="fed_identity"></a>  
Allows individuals to sign in to different networks or services, using the same group or personal credentials to access data across all networks. With identity federation in AWS, external identities (federated users) are granted secure access to [resources](#resource) in an [AWS account](#account) without having to create IAM [users](#AWSUser). These external identities can come from a corporate identity store (such as LDAP or Windows Active Directory) or from a third party (such as Login with Amazon, Facebook, or Google). AWS federation also supports SAML 2.0.

**federated user**<a name="federated_user"></a>   
See [federated identity management (FIM)](#fed_identity).

**federation**<a name="federation"></a>   
See [federated identity management (FIM)](#fed_identity).

**feedback loop (FBL)**<a name="feedbackloop"></a>  
The mechanism by which a mailbox provider (for example, an [internet service provider (ISP)](#internetserviceprovider)) forwards a [recipient](#recipient)'s [complaint](#complaint) back to the [sender](#sender).

**field weight**<a name="fieldweight"></a>  
The relative importance of a text field in a search index. Field weights control how much matches in particular text fields affect a document's relevance score.

**filter**<a name="filter"></a>  
A criterion that you specify to limit the results when you list or describe your [Amazon EC2](#ec2) [resources](#resource).

**filter query**<a name="filterquery"></a>  
A way to filter search results without affecting how the results are scored and sorted. Specified with the [CloudSearch](#cloudSearch) `fq` parameter. 

**FIM**<a name="FIM_abbrev"></a>   
See [federated identity management (FIM)](#fed_identity).

**FinSpace**<a name="finspace"></a>  
Amazon FinSpace is a data management and analytics service purpose-built for the financial services industry (FSI).   
See also [https://aws.amazon.com/finspace](https://aws.amazon.com/finspace/).

**Firehose**<a name="Firehose"></a>   
See [Firehose](#AmazonKinesisFirehose).

**Firewall Manager**<a name="firewallmanager"></a>  
AWS Firewall Manager is a service that you use with AWS WAF to simplify your AWS WAF administration and maintenance tasks across multiple accounts and resources. With AWS Firewall Manager, you set up your firewall rules only once. The service automatically applies your rules across your accounts and resources, even as you add new resources.   
See also [https://aws.amazon.com/firewall-manager](https://aws.amazon.com/firewall-manager/).

**Forecast**<a name="forecast"></a>  
Amazon Forecast is a fully managed service that uses statistical and machine learning algorithms to produce highly accurate time-series forecasts.   
See also [https://aws.amazon.com/forecast/](https://aws.amazon.com/forecast/).

**format version**<a name="format_version"></a>   
See [template format version](#template-format-version).

**forums**<a name="forums"></a>   
See [discussion forums](#discussionforums).

**function**<a name="function"></a>   
See [intrinsic function](#intrinsicfunction).

**fuzzy search**<a name="fuzzysearch"></a>  
A simple search query that uses approximate string matching (fuzzy matching) to correct for typographical errors and misspellings.

### G<a name="G"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**GameKit**<a name="GameKit"></a>  
AWS GameKit is an open-source SDK and game engine plugin that empowers game developers to build and deploy cloud-based features with AWS from their game engine.   
See also [https://aws.amazon.com/gamekit/](https://aws.amazon.com/gamekit/).

**Amazon GameLift Servers**<a name="GameLift"></a>  
Amazon GameLift Servers is a managed service for deploying, operating, and scaling session-based multiplayer games.   
See also [https://aws.amazon.com/gamelift/](https://aws.amazon.com/gamelift/).

**GameSparks**<a name="GameSparks"></a>  
Amazon GameSparks is a fully managed AWS service that provides a multi-service backend for game developers.   
See also [https://aws.amazon.com/gamesparks/](https://aws.amazon.com/gamesparks/).

**geospatial search**<a name="geospatialsearch"></a>  
A search query that uses locations specified as a latitude and longitude to determine matches and sort the results. 

**gibibyte (GiB)**<a name="gibibyte"></a>  
A contraction of giga binary byte, a gibibyte is 2^30 or 1,073,741,824 bytes. A gigabyte (GB) is 10^9 or 1,000,000,000 bytes. 1,024 GiB is a [tebibyte (TiB)](#tebibyte).

**GitHub**<a name="github"></a>  
A web-based repository that uses Git for version control.

**Global Accelerator**<a name="globalaccelerator"></a>  
AWS Global Accelerator is a network layer service that you use to create accelerators that direct traffic to optimal endpoints over the AWS global network. This improves the availability and performance of your internet applications that are used by a global audience.   
See also [https://aws.amazon.com/global-accelerator](https://aws.amazon.com/global-accelerator/).

**global consistency**<a name="globalconsistency"></a>  
An [active-active](#activeactive) strategy in which all reads and writes for a workload are handled in the Region where the request originates and are replicated synchronously to all other Regions in the architecture.    
See also [read local/write global](#readlocalwriteglobal)[read local/write local](#readlocalwritelocal).

**global secondary index**<a name="global-secondary-index"></a>  
An index with a partition key and a sort key that can be different from those on the table. A global secondary index is considered global because queries on the index can span all of the data in a table, across all partitions.   
See also [local secondary index](#local-secondary-index).

**AWS Glue**<a name="Glue"></a>  
AWS Glue is a fully managed [extract, transform, and load (ETL)](#extracttransformload) service that you can use to catalog data and load it for analytics. With AWS Glue, you can discover your data, develop scripts to transform sources into targets, and schedule and run ETL jobs in a serverless environment.   
See also [https://aws.amazon.com/glue](https://aws.amazon.com/glue/).

**AWS GovCloud (US)**<a name="govcloud-us"></a>  
AWS GovCloud (US) is an isolated AWS Region that hosts sensitive workloads in the cloud, ensuring that this work meets the US government's regulatory and compliance requirements. The AWS GovCloud (US) Region adheres to United States International Traffic in Arms Regulations (ITAR), Federal Risk and Authorization Management Program (FedRAMP) requirements, Department of Defense (DOD) Cloud Security Requirements Guide (SRG) Levels 2 and 4, and Criminal Justice Information Services (CJIS) Security Policy requirements.   
See also [https://aws.amazon.com/govcloud-us/](https://aws.amazon.com/govcloud-us/).

**grant**<a name="grant_perms"></a>  
[AWS KMS](#awskms): A mechanism for giving AWS [principals](#principal) long-term permissions to use KMS keys. 

**grant token**<a name="grant_token"></a>  
A type of identifier that allows the permissions in a [grant](#grant_perms) to take effect immediately.

**ground truth**<a name="ground-truth"></a>  
The observations used in the machine learning (ML) model training process that include the correct value for the target attribute. To train an ML model to predict house sales prices, the input observations would typically include prices of previous house sales in the area. The sale prices of these houses constitute the ground truth.

**group**<a name="group"></a>  
A collection of [IAM](#IAM) [users](#AWSUser). You can use IAM groups to simplify specifying and managing permissions for multiple users.

**GuardDuty**<a name="guardduty"></a>  
Amazon GuardDuty is a continuous security monitoring service. Amazon GuardDuty can help to identify unexpected and potentially unauthorized or malicious activity in your AWS environment.   
See also [https://aws.amazon.com/guardduty/](https://aws.amazon.com/guardduty/).

### H<a name="H"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**Hadoop**<a name="Hadoop"></a>  
Software that enables distributed processing for big data by using clusters and simple programming models. For more information, see [http://hadoop.apache.org](http://hadoop.apache.org/).

**hard bounce**<a name="hardbounce"></a>  
A persistent email delivery failure such as "mailbox does not exist."

**hardware VPN**<a name="hardwarevpn"></a>  
A hardware-based IPsec VPN connection over the internet.

**AWS Health**<a name="health"></a>  
AWS Health is a service that provides ongoing visibility into AWS customers' accounts and the availability of their AWS services and resources.   
See also [https://aws.amazon.com/premiumsupport/technology/aws-health-dashboard](https://aws.amazon.com/premiumsupport/technology/aws-health-dashboard/).

**health check**<a name="healthcheck"></a>  
A system call to check on the health status of each instance in an [Amazon EC2 Auto Scaling](#AutoScaling) group.

**HealthLake**<a name="healthlake"></a>  
AWS HealthLake is a HIPAA-eligible service that helps customers store, query, and generate artificial intelligence (AI) and machine learning (ML) insights from healthcare data and enables healthcare data interoperability.   
See also [https://aws.amazon.com/healthlake](https://aws.amazon.com/healthlake/).

**highlight enabled**<a name="highlightenabled"></a>  
[CloudSearch](#cloudSearch): An index field option that enables matches within the field to be highlighted.

**highlights**<a name="highlights"></a>  
[CloudSearch](#cloudSearch): Excerpts returned with search results that show where the search terms appear within the text of the matching documents.

**high-quality email**<a name="highqualityemail"></a>  
Email that recipients find valuable and want to receive. Value means different things to different recipients and can come in such forms as offers, order confirmations, receipts, or newsletters.

**hit**<a name="hitcloudsearch"></a>  
A document that matches the criteria specified in a search request. Also referred to as a *search result*.

**HMAC**<a name="HMAC"></a>  
Hash-based Message Authentication Code is a specific construction for calculating a message authentication code (MAC) involving a cryptographic hash function in combination with a secret key. You can use it to verify both the data integrity and the authenticity of a message at the same time. AWS calculates the HMAC using a standard, cryptographic hash algorithm, such as SHA-256. 

**hosted zone**<a name="hostedzone"></a>  
A collection of [resource record](#resourcerecord) sets that [Route 53](#Route53) hosts. Similar to a traditional DNS zone file, a hosted zone represents a collection of records that are managed together under a single domain name.

**hot standby**<a name="hotstandby"></a>  
An [active-passive](#activepassive) disaster recovery strategy in which a workload is fully scaled up in both the primary and standby Regions, but serves traffic from only the primary Region.    
See also [back up and restore](#backupand)[pilot light](#pilotlight)[warm standby](#warmstandby).

**HRNN**<a name="hrnn"></a>  
[Amazon Personalize](#amazonpersonalize): A hierarchical recurrent neural network machine learning algorithm that models changes in user behavior and predicts the items that a user might interact with in personal recommendation applications.

**HTTP-Query**<a name="HTTPquery"></a>   
See [Query](#Query).

**HVM virtualization**<a name="HVM"></a>  
Hardware Virtual Machine virtualization. Allows the guest VM to run as though it's on a native hardware platform, except that it still uses paravirtual (PV) network and storage drivers for improved performance.   
See also [PV virtualization](#PV).

### I<a name="I"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**IAM**<a name="IAM"></a>  
AWS Identity and Access Management is a web service that [Amazon Web Services (AWS)](#amazonwebservices) customers can use to manage users and user permissions within AWS.   
See also [https://aws.amazon.com/iam](https://aws.amazon.com/iam/).

**IAM Access Analyzer**<a name="accessanalyzer"></a>  
Access Management Access Analyzer is a feature of [IAM](#IAM) that you can use to identify the resources in your organization and accounts that are shared with an external entity. Example resources include Amazon S3 buckets or IAM roles.   
See also [https://aws.amazon.com/about-aws/whats-new/2019/12/introducing-aws-identity-and-access-management-access-analyzer/](https://aws.amazon.com/about-aws/whats-new/2019/12/introducing-aws-identity-and-access-management-access-analyzer/).

**IAM group**<a name="IAM_group"></a>   
See [group](#group).

**IAM Identity Center**<a name="aws-sso"></a>  
AWS IAM Identity Center is a cloud-based service that brings together administration of users and their access to AWS accounts and cloud applications. You can control single sign-on access and user permissions across all your AWS accounts in AWS Organizations.   
See also [https://aws.amazon.com/single-sign-on/](https://aws.amazon.com/single-sign-on/).

**IAM policy simulator**<a name="IAM_policy_simulator"></a>   
See [policy simulator](#policy_simulator).

**IAM role**<a name="IAM_role"></a>   
See [role](#role).

**IAM user**<a name="IAM_user"></a>   
See [user](#AWSUser).

**Identity and Access Management**<a name="IAM_service"></a>   
See [IAM](#IAM).

**identity provider (IdP)**<a name="identity_provider"></a>  
An [IAM](#IAM) entity that holds metadata about external identity providers.

**IdP**<a name="IdP_abbrev"></a>   
See [identity provider (IdP) ](#identity_provider).

**image**<a name="image"></a>   
See [Amazon Machine Image (AMI)](#AmazonMachineImage).

**Image Builder**<a name="image-builder"></a>  
EC2 Image Builder is a service that facilitates building, maintaining, and distributing customized server images that launch EC2 instances, or that run in Docker containers.   
See also [https://aws.amazon.com/image-builder](https://aws.amazon.com/image-builder/).

**implicit impressions**<a name="implicit-impressions"></a>  
[Amazon Personalize](#amazonpersonalize): The recommendations that your application shows a user. Unlike *explicit impressions*, where you manually record each impression, Amazon Personalize automatically derives implicit impressions from your recommendation data.   
See also [recommendations](#recommendations). 
See also [impressions data](#impressions-data). 
See also [explicit impressions](#explicit-impressions).

**import log**<a name="importlog"></a>  
A report that contains details about how [Import/Export](#ImportExport) processed your data.

**Import/Export**<a name="ImportExport"></a>  
AWS Import/Export is a service for transferring large amounts of data between AWS and portable storage devices.    
See also [https://aws.amazon.com/importexport](https://aws.amazon.com/importexport/).

**import/export station**<a name="importexportstation"></a>  
A machine that uploads or downloads your data to or from [Amazon S3](#amazons3).

**impressions data**<a name="impressions-data"></a>  
[Amazon Personalize](#amazonpersonalize): The list of items that you presented to a user when they interacted with a particular item such as by clicking it, watching it, or purchasing it. Amazon Personalize uses impressions data to calculate the relevance of new items for a user based on how frequently users have selected or ignored the same item.   
See also [explicit impressions](#explicit-impressions). 
See also [implicit impressions](#implicit-impressions).

**index**<a name="index"></a>   
See [search index](#searchindex).

**index field**<a name="indexfield"></a>  
A name–value pair that's included in an [CloudSearch](#cloudSearch) domain's index. An index field can contain text or numeric data, dates, or a location. 

**indexing options**<a name="indexoptions"></a>  
Configuration settings that define an [CloudSearch](#cloudSearch) domain's index fields, how document data is mapped to those index fields, and how the index fields can be used. 

**inline policy**<a name="inline_policy"></a>  
An [IAM](#IAM) [policy](#policy) that's embedded in a single IAM [user](#AWSUser), [group](#group), or [role](#role).

**in-place deployment**<a name="inplacedeployment"></a>  
CodeDeploy: A deployment method where the application on each instance in the deployment group is stopped, the latest application revision is installed, and the new version of the application is started and validated. You can choose to use a load balancer so each instance is deregistered during its deployment and then restored to service after the deployment is complete.

**input data**<a name="input-data"></a>  
Amazon Machine Learning: The observations that you provide to Amazon Machine Learning to train and evaluate a machine learning model and generate predictions.

**Amazon Inspector**<a name="Amazon_Inspector"></a>  
Amazon Inspector is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS. Amazon Inspector automatically assesses applications for vulnerabilities or deviations from best practices. After performing an assessment, Amazon Inspector produces a detailed report with prioritized steps for remediation.   
See also [https://aws.amazon.com/inspector](https://aws.amazon.com/inspector/).

**instance**<a name="instance"></a>  
A copy of an [Amazon Machine Image (AMI)](#AmazonMachineImage) running as a virtual server in the AWS Cloud.

**instance family**<a name="instancefamily"></a>  
A general [instance type](#instancetype) grouping using either storage or CPU capacity. 

**instance group**<a name="instancegroup"></a>  
A [Hadoop](#Hadoop) cluster contains one master instance group that contains one [master node](#masternode), a core instance group that contains one or more [core node](#corenode) and an optional [task node](#tasknode) instance group, which can contain any number of task nodes. 

**instance profile**<a name="instanceprofile"></a>  
A container that passes [IAM](#IAM) [role](#role) information to an [EC2 instance](#ec2instance) at launch.

**instance store**<a name="instancestore"></a>  
Disk storage that's physically attached to the host computer for an [EC2 instance](#ec2instance), and therefore has the same lifespan as the instance. When the instance is terminated, you lose any data in the instance store. 

**instance store-backed AMI**<a name="instancebacked"></a>  
A type of [Amazon Machine Image (AMI)](#AmazonMachineImage) whose [instances](#instance) use an [instance store](#instancestore) [volume](#volume) as the root device. Compare this with instances launched from [Amazon EBS-backed AMIs](#EBSbacked), which use an Amazon EBS volume as the root device.

**instance type**<a name="instancetype"></a>  
A specification that defines the memory, CPU, storage capacity, and usage cost for an [instance](#instance). Some instance types are for standard applications, whereas others are for CPU-intensive, memory-intensive applications. 

**Interactions dataset**<a name="interactions-dataset"></a>  
[Amazon Personalize](#amazonpersonalize): A container for historical and real-time data collected from interactions between users and items (called events). Interactions data can include impressions data and contextual metadata.   
See also [dataset](#dataset). 
See also [event](#event). 
See also [impressions data](#impressions-data). 
See also [contextual metadata](#contextual-metadata).

**internet gateway**<a name="internetgateway"></a>  
Connects a network to the internet. You can route traffic for IP addresses outside your [Amazon VPC](#vpc) to the internet gateway. 

**internet service provider (ISP)**<a name="internetserviceprovider"></a>  
A company that provides subscribers with access to the internet. Many ISPs are also [mailbox providers](#mailboxprovider). Mailbox providers are sometimes referred to as ISPs, even if they only provide mailbox services.

**intrinsic function**<a name="intrinsicfunction"></a>  
A special action in a [CloudFormation](#CloudFormation) template that assigns values to properties not available until runtime. These functions follow the format *Fn::Attribute*, such as `Fn::GetAtt`. Arguments for intrinsic functions can be parameters, pseudo parameters, or the output of other intrinsic functions.

**AWS IoT 1-Click**<a name="AWSIoTOneClick"></a>  
AWS IoT 1-Click is a service that simple devices can use to launch AWS Lambda functions.   
See also [https://aws.amazon.com/iot-1-click](https://aws.amazon.com/iot-1-click/).

**AWS IoT Analytics**<a name="AWSIoTAnalytics"></a>  
AWS IoT Analytics is a fully managed service used to run sophisticated analytics on massive volumes of IoT data.   
See also [https://aws.amazon.com/iot-analytics](https://aws.amazon.com/iot-analytics/).

**AWS IoT Core**<a name="AWSIoT"></a>  
AWS IoT Core is a managed cloud platform that lets connected devices easily and securely interact with cloud applications and other devices.   
See also [https://aws.amazon.com/iot](https://aws.amazon.com/iot/).

**AWS IoT Device Defender**<a name="AWSIoTDeviceDefender"></a>  
AWS IoT Device Defender is an AWS IoT security service that you can use to audit the configuration of your devices, monitor your connected devices to detect abnormal behavior, and to mitigate security risks.   
See also [https://aws.amazon.com/iot-device-defender](https://aws.amazon.com/iot-device-defender/).

**AWS IoT Device Management**<a name="AWSIoTDeviceManagement"></a>  
AWS IoT Device Management is a service used to securely onboard, organize, monitor, and remotely manage IoT devices at scale.   
See also [https://aws.amazon.com/iot-device-management](https://aws.amazon.com/iot-device-management/).

**AWS IoT Events**<a name="AWSIoTEvents"></a>  
AWS IoT Events is a fully managed AWS IoT service that you can use to detect and respond to events from IoT sensors and applications.   
See also [https://aws.amazon.com/iot-events](https://aws.amazon.com/iot-events/).

**AWS IoT FleetWise**<a name="IoT-FleetWise"></a>  
AWS IoT FleetWise is a service that you can use to collect, transform, and transfer vehicle data to the cloud at scale.   
See also [https://aws.amazon.com/iot-fleetwise](https://aws.amazon.com/iot-fleetwise/).

**AWS IoT Greengrass**<a name="Greengrass"></a>  
AWS IoT Greengrass is a software that you can use to run local compute, messaging, data caching, sync, and ML inference capabilities for connected devices in a secure way.   
See also [https://aws.amazon.com/greengrass](https://aws.amazon.com/greengrass/).

**AWS IoT RoboRunner**<a name="roborunner"></a>  
AWS IoT RoboRunner is a solution that provides infrastructure for integrating robots with work management systems and building robotics fleet management applications.   
See also [https://aws.amazon.com/roborunner](https://aws.amazon.com/roborunner/).

**AWS IoT SiteWise**<a name="AWSIoTSiteWise"></a>  
AWS IoT SiteWise is a managed service that you can use to collect, organize, and analyze data from industrial equipment at scale.   
See also [https://aws.amazon.com/iot-sitewise](https://aws.amazon.com/iot-sitewise/).

**AWS IoT Things Graph**<a name="AWSIoTThingsGraph"></a>  
AWS IoT Things Graph is a service that you can use to visually connect different devices and web services to build IoT applications.   
See also [https://aws.amazon.com/iot-things-graph](https://aws.amazon.com/iot-things-graph/).

**IP address**<a name="IPaddress"></a>  
A numerical address (for example, 192.0.2.44) that networked devices use to communicate with one another using the Internet Protocol (IP). Each [EC2 instance](#ec2instance) is assigned two IP addresses at launch, which are directly mapped to each other through network address translation ([NAT](#nat)): a private IP address (following RFC 1918) and a public IP address. Instances launched in a [VPC](#vpc) are assigned only a private IP address. Instances launched in your default VPC are assigned both a private IP address and a public IP address.

**IP match condition**<a name="IPmatchcondition"></a>  
[AWS WAF](#awswaf): An attribute that specifies the IP addresses or IP address ranges that web requests originate from. Based on the specified IP addresses, you can configure AWS WAF to allow or block web requests to AWS [resources](#resource) such as [Amazon CloudFront](#AmazonCF) distributions.

**AWS IQ**<a name="iq"></a>  
AWS IQ is a cloud service that AWS customers can use to find, engage, and pay AWS Certified third-party experts for on-demand project work.   
See also [https://iq.aws.amazon.com](https://iq.aws.amazon.com).

**ISP**<a name="ISP_abbrev"></a>   
See [internet service provider (ISP)](#internetserviceprovider).

**issuer**<a name="issuer"></a>  
The person who writes a [policy](#policy) to grant permissions to a [resource](#resource). The issuer (by definition) is always the resource owner. AWS doesn't permit [Amazon SQS](#AmazonSimpleQueueService) users to create policies for resources they don't own. If John is the resource owner, AWS authenticates John's identity when he submits the policy he's written to grant permissions for that resource.

**item**<a name="item"></a>  
A group of attributes that's uniquely identifiable among all of the other items. Items in [DynamoDB](#dynamodb) are similar in many ways to rows, records, or tuples in other database systems.

**item exploration**<a name="item-exploration"></a>  
[Amazon Personalize](#amazonpersonalize): The process that Amazon Personalize uses to test different item recommendations, including recommendations of new items with no or little interaction data, and learn how users respond. You configure item exploration at the campaign level for solution versions created with the user-personalization recipe.   
See also [recommendations](#recommendations). 
See also [campaign](#campaign). 
See also [solution version](#solution-version). 
See also [user-personalization recipe](#userpersonalization).

**Items dataset**<a name="items-dataset"></a>  
[Amazon Personalize](#amazonpersonalize): A container for metadata about items, such as price, genre, or availability.   
See also [dataset](#dataset).

**item-to-item similarities (SIMS) recipe**<a name="item-to-item-similarities"></a>  
[Amazon Personalize](#amazonpersonalize): A RELATED\_ITEMS recipe that uses the data from an Interactions dataset to make recommendations for items that are similar to a specified item. The SIMS recipe calculates similarity based on the way users interact with items instead of matching item metadata, such as price or age.   
See also [recipe](#persrecipe). 
See also [RELATED\_ITEMS recipes](#related-item-recipes). 
See also [Interactions dataset](#interactions-dataset).

### J<a name="J"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**job flow**<a name="jobflow"></a>  
[Amazon EMR](#AmazonElasticMapReduce): One or more [steps](#step) that specify all of the functions to be performed on the data.

**job ID**<a name="jobID"></a>  
A five-character, alphanumeric string that uniquely identifies an [Import/Export](#ImportExport) storage device in your shipment. AWS issues the job ID in response to a `CREATE JOB` email command. 

**job prefix**<a name="jobprefix"></a>  
An optional string that you can add to the beginning of an [Import/Export](#ImportExport) log file name to prevent collisions with objects of the same name.   
See also [key prefix](#keyprefix).

**JSON**<a name="json"></a>  
JavaScript Object Notation. A lightweight data interchange format. For information about JSON, see [http://www.json.org/](http://www.json.org/).

**junk folder**<a name="junkfolder"></a>  
The location where email messages that various filters determine to be of lesser value are collected so that they don't arrive in the [recipient](#recipient)'s inbox but are still accessible to the recipient. This is also referred to as a [spam](#spam) or bulk folder.

### K<a name="K"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**Amazon Kendra**<a name="kendra"></a>  
Amazon Kendra is a search service powered by machine learning (ML) that developers can use to add search capabilities to their applications so their end users can discover information stored within the vast amount of content spread across their company.   
See also [https://aws.amazon.com/kendra/](https://aws.amazon.com/kendra/).

**key**<a name="key"></a>  
A credential that identifies an [AWS account](#account) or [user](#AWSUser) to AWS (such as the AWS [secret access key](#SecretAccessKey)).
[Amazon S3](#amazons3), [Amazon EMR](#AmazonElasticMapReduce): The unique identifier for an object in a [bucket](#bucket). Every object in a bucket has exactly one key. Because a bucket and key together uniquely identify each object, you can think of Amazon S3 as a basic data map between the *bucket \+ key*, and the object itself. You can uniquely address every object in Amazon S3 through the combination of the web service endpoint, bucket name, and key, as in this example: `http://doc.s3.amazonaws.com/2006-03-01/AmazonS3.wsdl`, where `doc` is the name of the bucket, and `2006-03-01/AmazonS3.wsdl` is the key.
[Import/Export](#ImportExport): The name of an object in Amazon S3. It's a sequence of Unicode characters whose UTF-8 encoding can't exceed 1024 bytes. If a key (for example, logPrefix \+ import-log-JOBID) is longer than 1024 bytes, [Elastic Beanstalk](#Beanstalk) returns an `InvalidManifestField` error. 
[IAM](#IAM): In a [policy](#policy), a specific characteristic that's the basis for restricting access (such as the current time or the IP address of the requester).
Tagging resources: A general [tag](#tag) label that acts like a category for more specific tag values. For example, you might have [EC2 instance](#ec2instance) with the tag key of *Owner* and the tag value of *Jan*. You can tag an AWS [resource](#resource) with up to 10 key–value pairs. Not all AWS resources can be tagged.

**key pair**<a name="keypair"></a>  
A set of security credentials that you use to prove your identity electronically. A key pair consists of a private key and a public key.

**key prefix**<a name="keyprefix"></a>  
A string of characters that is a subset of an object key name, starting with the first character. The prefix can be any length, up to the maximum length of the object key name (1,024 bytes).

**Amazon Keyspaces**<a name="keyspaces"></a>  
Amazon Keyspaces (for Apache Cassandra) is a scalable, highly available, and managed Apache Cassandra-compatible database service.   
See also [https://aws.amazon.com/keyspaces/](https://aws.amazon.com/keyspaces/).

**kibibyte (KiB)**<a name="kibibyte"></a>  
A contraction of kilo binary byte, a kibibyte is 2^10 or 1,024 bytes. A kilobyte (KB) is 10^3 or 1,000 bytes. 1,024 KiB is a [mebibyte (MiB)](#mebibyte).

**Kinesis**<a name="AmazonKinesis"></a>  
Amazon Kinesis is a platform for streaming data on AWS. Kinesis offers services that simplify the loading and analysis of streaming data.    
See also [https://aws.amazon.com/kinesis/](https://aws.amazon.com/kinesis/).

**Firehose**<a name="AmazonKinesisFirehose"></a>  
Amazon Data Firehose is a fully managed service for loading streaming data into AWS. Firehose can capture and automatically load streaming data into [Amazon S3](#amazons3) and [Amazon Redshift ](#redshift), enabling near real-time analytics with existing business intelligence tools and dashboards. Firehose automatically scales to match the throughput of your data and requires no ongoing administration. It can also batch, compress, and encrypt the data before loading it.    
See also [https://aws.amazon.com/kinesis/firehose/](https://aws.amazon.com/kinesis/firehose/).

**Kinesis Data Streams**<a name="AmazonKinesisStreams"></a>  
Amazon Kinesis Data Streams is a web service for building custom applications that process or analyze streaming data for specialized needs. Amazon Kinesis Data Streams can continuously capture and store terabytes of data per hour from hundreds of thousands of sources.    
See also [https://aws.amazon.com/kinesis/streams/](https://aws.amazon.com/kinesis/streams/).

**AWS KMS**<a name="awskms"></a>  
AWS Key Management Service is a managed service that simplifies the creation and control of encryption keys that are used to encrypt data.   
See also [https://aws.amazon.com/kms](https://aws.amazon.com/kms/).

**KMS key**<a name="KMSkey"></a>  
The primary resource in AWS Key Management Service. In general, KMS keys are created, used, and deleted entirely within KMS. KMS supports symmetric and asymmetric KMS keys for encryption and signing. KMS keys can be either customer managed, AWS managed, or AWS owned. For more information, see AWS KMS keys in the [AWS Key Management Service Developer Guide](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#kms_keys).

### L<a name="L"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**labeled data**<a name="labeled-data"></a>  
In machine learning, data for which you already know the target or “correct” answer.

**Lake Formation**<a name="lake-formation"></a>  
AWS Lake Formation is a managed service that makes it easy to set up, secure, and manage your data lakes. Lake Formation helps you discover your data sources and then catalog, cleanse, and transform the data.   
See also [https://aws.amazon.com/lake-formation](https://aws.amazon.com/lake-formation/).

**Lambda**<a name="lambda"></a>  
AWS Lambda is a web service that you can use to run code without provisioning or managing servers. You can run code for virtually any type of application or backend service with zero administration. You can set up your code to automatically start from other AWS services or call it directly from any web or mobile app.   
See also [https://aws.amazon.com/lambda/](https://aws.amazon.com/lambda/).

**launch configuration**<a name="launchconfiguration"></a>  
A set of descriptive parameters used to create new [EC2 instances](#ec2instance) in an [Amazon EC2 Auto Scaling](#AutoScaling) activity.   
A template that an [Auto Scaling group](#AutoScalingGroup) uses to launch new EC2 instances. The launch configuration contains information such as the [Amazon Machine Image (AMI)](#AmazonMachineImage) ID, the instance type, key pairs, [security groups](#SecurityGroup), and block device mappings, among other configuration settings.

**launch permission**<a name="launchpermission"></a>  
An [Amazon Machine Image (AMI)](#AmazonMachineImage) attribute that allows users to launch an AMI. 

**Launch Wizard**<a name="launchwizard"></a>  
AWS Launch Wizard is a cloud solution that offers a guided way of sizing, configuring, and deploying AWS resources for third-party applications, such as Microsoft SQL Server Always On and HANA based SAP systems, without the need to manually identify and provision individual AWS resources.   
See also [https://aws.amazon.com/launchwizard](https://aws.amazon.com/launchwizard/).

**Amazon Lex**<a name="lex"></a>  
Amazon Lex is a fully managed artificial intelligence (AI) service with advanced natural language models to design, build, test, and deploy conversational interfaces in applications.   
See also [https://aws.amazon.com/lex/](https://aws.amazon.com/lex/).

**lifecycle**<a name="lifecycle"></a>  
The lifecycle state of the [EC2 instance](#ec2instance) contained in an [Auto Scaling group](#AutoScalingGroup). EC2 instances progress through several states over their lifespan; these include *Pending*, *InService*, *Terminating* and *Terminated*. 

**lifecycle action**<a name="lifecycleaction"></a>  
An action that can be paused by Auto Scaling, such as launching or terminating an EC2 instance.

**lifecycle hook**<a name="lifecyclehook"></a>  
A feature for pausing Auto Scaling after it launches or terminates an EC2 instance so that you can perform a custom action while the instance isn't in service.

**Lightsail**<a name="lightsail"></a>  
Amazon Lightsail is a service used to launch and manage a virtual private server with AWS. Lightsail offers bundled plans that include everything you need to deploy a virtual private server, for a low monthly rate.   
See also [https://aws.amazon.com/lightsail/](https://aws.amazon.com/lightsail/).

**load balancer**<a name="loadbalancer"></a>  
A DNS name combined with a set of ports, which together provide a destination for all requests intended for your application. A load balancer can distribute traffic to multiple application instances across every [Availability Zone](#AZ) within a [Region](#region). Load balancers can span multiple Availability Zones within an AWS Region into which an [Amazon EC2](#ec2) instance was launched. But load balancers can't span multiple Regions. 

**local secondary index**<a name="local-secondary-index"></a>  
An index that has the same partition key as the table, but a different sort key. A local secondary index is local in the sense that every partition of a local secondary index is scoped to a table partition that has the same partition key value.   
See also [local secondary index](#local-secondary-index).

**Amazon Location**<a name="location"></a>  
Amazon Location Service is a fully managed service that makes it easy for a developer to add location functionality, such as maps, points of interest, geocoding, routing, tracking, and geofencing, to their applications, without sacrificing data security, user privacy, data quality, or cost.   
See also [https://aws.amazon.com/location/](https://aws.amazon.com/location/).

**logical name**<a name="logical-name"></a>  
A case-sensitive unique string within an [CloudFormation](#CloudFormation) template that identifies a [resource](#resource), [mapping](#mapping), parameter, or output. In an CloudFormation template, each parameter, [resource](#resource), property, mapping, and output must be declared with a unique logical name. You use the logical name when dereferencing these items using the `Ref` function.

**Lookout for Equipment**<a name="lookout-for-equipment"></a>  
Amazon Lookout for Equipment is a machine learning service that uses data from sensors mounted on factory equipment to detect abnormal behavior so you can take action before machine failures occur.   
See also [https://aws.amazon.com/lookout-for-equipment/](https://aws.amazon.com/lookout-for-equipment/).

**Lookout for Metrics**<a name="lookout-for-metrics"></a>  
Amazon Lookout for Metrics is a machine learning (ML) service that automatically detects and diagnoses anomalies in business and operational data, such as a sudden dip in sales revenue or customer acquisition rates.   
See also [https://aws.amazon.com/lookout-for-metrics](https://aws.amazon.com/lookout-for-metrics/).

**Lookout for Vision**<a name="lookout-for-vision"></a>  
Amazon Lookout for Vision is a machine learning service that uses computer vision (CV) to find defects in industrial products. Amazon Lookout for Vision can identify missing components in an industrial product, damage to vehicles or structures, irregularities in production lines, and even minuscule defects in silicon wafers—or any other physical item where quality is important.   
See also [https://aws.amazon.com/lookout-for-vision/](https://aws.amazon.com/lookout-for-vision/).

**Lumberyard**<a name="lumberyard"></a>   
See [O3DE](#o3de).

### M<a name="M"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**Macie**<a name="macie"></a>  
Amazon Macie is a security service that uses machine learning to automatically discover, classify, and protect sensitive data in AWS.   
See also [http://aws.amazon.com/macie/](http://aws.amazon.com/macie/).

**Mail Transfer Agent (MTA)**<a name="mailtransferagent"></a>  
Software that transports email messages from one computer to another by using a client-server architecture.

**mailbox provider**<a name="mailboxprovider"></a>  
An organization that provides email mailbox hosting services. Mailbox providers are sometimes referred to as [internet service providers (ISPs)](#internetserviceprovider), even if they only provide mailbox services.

**mailbox simulator**<a name="mailboxsimulator"></a>  
A set of email addresses that you can use to test an [Amazon SES](#SES)-based email-sending application without sending messages to actual recipients. Each email address represents a specific scenario (such as a bounce or complaint) and generates a typical response that's specific to the scenario.

**main route table**<a name="MainRouteTable"></a>  
The default [route table](#routetable) that any new [Amazon VPC](#vpc) [subnet](#subnet) uses for routing. You can associate a subnet with a different route table of your choice. You can also change which route table is the main route table.

**AWS Mainframe Modernization**<a name="mainframe-modernization"></a>  
AWS Mainframe Modernization service is a cloud native platform for migration, modernization, execution, and operation of mainframe applications.   
See also [https://aws.amazon.com/mainframe-modernization](https://aws.amazon.com/mainframe-modernization/).

**Managed Blockchain**<a name="managed-blockchain"></a>  
Amazon Managed Blockchain is a fully managed service for creating and managing scalable blockchain networks using popular open source frameworks.   
See also [http://aws.amazon.com/managed-blockchain/](http://aws.amazon.com/managed-blockchain/).

**Amazon Managed Grafana**<a name="grafana"></a>  
Amazon Managed Grafana is a fully managed and secure data visualization service that you can use to instantly query, correlate, and visualize operational metrics, logs, and traces from multiple data sources.   
See also [https://aws.amazon.com/grafana/](https://aws.amazon.com/grafana/).

**AWS managed key**<a name="AWS_managed_key"></a>  
One type of KMS key in [AWS KMS](#awskms).

**managed policy**<a name="managed_policy"></a>  
A standalone [IAM](#IAM) [policy](#policy) that you can attach to multiple [users](#AWSUser), [groups](#group), and [roles](#role)s in your IAM [account](#account). Managed policies can either be AWS managed policies (which are created and managed by AWS) or customer managed policies (which you create and manage in your AWS account).

**AWS managed policy**<a name="AWS_managed_policy"></a>  
An [IAM](#IAM) [managed policy](#managed_policy) that's created and managed by AWS.

**Amazon Managed Service for Prometheus**<a name="prometheus"></a>  
Amazon Managed Service for Prometheus is a service that provides highly available, secure, and managed monitoring for your containers.   
See also [https://aws.amazon.com/prometheus/](https://aws.amazon.com/prometheus/).

**AWS Management Console**<a name="AWSManagementConsole"></a>  
AWS Management Console is a graphical interface to manage compute, storage, and other cloud [resources](#resource).   
See also [https://aws.amazon.com/console](https://aws.amazon.com/console/).

**management portal**<a name="mgtportal"></a>  
AWS Management Portal for vCenter is a web service for managing your AWS [resources](#resource) using VMware vCenter. You install the portal as a vCenter plugin within your existing vCenter environment. After it's installed, you can migrate VMware VMs to [Amazon EC2](#ec2) and manage AWS resources from within vCenter.   
See also [https://aws.amazon.com/ec2/vcenter-portal/](https://aws.amazon.com/ec2/vcenter-portal/).

**manifest**<a name="manifest"></a>  
When sending a *create job* request for an import or export operation, you describe your job in a text file called a manifest. The manifest file is a YAML-formatted file that specifies how to transfer data between your storage device and the AWS Cloud.

**manifest file**<a name="manifest-file"></a>  
Amazon Machine Learning: The file used for describing batch predictions. The manifest file relates each input data file with its associated batch prediction results. It's stored in the Amazon S3 output location.

**mapping**<a name="mapping"></a>  
A way to add conditional parameter values to an [CloudFormation](#CloudFormation) template. You specify mappings in the template's optional Mappings section and retrieve the desired value using the `FN::FindInMap` function.

**marker**<a name="marker"></a>   
See [pagination token](#PaginationToken).

**AWS Marketplace**<a name="marketplace"></a>  
AWS Marketplace is a web portal where qualified partners market and sell their software to AWS customers. AWS Marketplace is an online software store that helps customers find, buy, and immediately start using the software and services that run on AWS.   
See also [https://aws.amazon.com/partners/aws-marketplace/](https://aws.amazon.com/partners/aws-marketplace/).

**master node**<a name="masternode"></a>  
A process running on an [Amazon Machine Image (AMI)](#AmazonMachineImage) that keeps track of the work its core and task nodes complete. 

**maximum price**<a name="maxprice"></a>  
 The maximum price you pay to launch one or more [Spot Instances](#SpotInstance). If your maximum price exceeds the current [Spot price](#SpotPrice) and your restrictions are met, [Amazon EC2](#ec2) launches instances on your behalf. 

**maximum send rate**<a name="maximumsendrate"></a>  
The maximum number of email messages that you can send per second using [Amazon SES](#SES).

**mean reciprocal rank at 25**<a name="mean-reciprocal-rank-at-25"></a>  
[Amazon Personalize](#amazonpersonalize): An evaluation metric that assesses the relevance of a model’s highest ranked recommendation. Amazon Personalize calculates this metric using the average accuracy of the model when ranking the most relevant recommendation out of the top 25 recommendations over all requests for recommendations.   
See also [metrics](#metrics). 
See also [recommendations](#recommendations).

**mebibyte (MiB)**<a name="mebibyte"></a>  
A contraction of mega binary byte. A mebibyte (MiB) is 2^20 or 1,048,576 bytes. A megabyte (MB) is 10^6 or 1,000,000 bytes. 1,024 MiB is a [gibibyte (GiB)](#gibibyte).

**member resources**<a name="member_resources"></a>   
See [resource](#resource).

**MemoryDB**<a name="memorydb"></a>  
Amazon MemoryDB is a Redis-compatible, durable, in-memory database service that's purpose-built for modern applications with microservices architectures.   
See also [https://aws.amazon.com/memorydb](https://aws.amazon.com/memorydb/).

**message ID**<a name="messageID"></a>  
[Amazon SES](#SES): A unique identifier that's assigned to every email message that's sent.  
[Amazon SQS](#AmazonSimpleQueueService): The identifier returned when you send a message to a queue.

**metadata**<a name="metadata"></a>  
Information about other data or objects. In [Amazon S3](#amazons3) and [Amazon EMR](#AmazonElasticMapReduce) metadata takes the form of name–value pairs that describe the object. These include default metadata such as the date last modified and standard HTTP metadata (for example, Content-Type). Users can also specify custom metadata at the time they store an object. In [Amazon EC2](#ec2) metadata includes data about an [EC2 instance](#ec2instance) that the instance can retrieve to determine things about itself, such as the instance type or the IP address.

**metric**<a name="metric"></a>  
An element of time-series data defined by a unique combination of exactly one [namespace](#namespace), exactly one metric name, and between zero and ten dimensions. Metrics and the statistics derived from them are the basis of [CloudWatch](#AmazonCW).

**metric name**<a name="metricname"></a>  
The primary identifier of a metric, used with a [namespace](#namespace) and optional dimensions.

**metrics**<a name="metrics"></a>  
[Amazon Personalize](#amazonpersonalize): Evaluation data that Amazon Personalize generates when you train a model. You use metrics to evaluate the performance of the model, view the effects of modifying a solution’s configuration, and compare results between solutions that use the same training data but were created with different recipes.   
See also [solution](#solution). 
See also [recipe](#persrecipe).

**MFA**<a name="MFA_abbrev"></a>   
See [multi-factor authentication (MFA)](#AWSMultiFactorAuthentication).

**micro instance**<a name="MicroInstance"></a>  
 A type of [EC2 instance](#ec2instance) that's more economical to use if you have occasional bursts of high CPU activity.

**AWS Microservice Extractor for .NET**<a name="microservice-extractor"></a>  
AWS Microservice Extractor for .NET is an assistive modernization tool that helps to reduce the time and effort required to break down large, monolithic applications running on the AWS Cloud or on premises into smaller, independent services. These services can be operated and managed independently.

**Migration Hub**<a name="migrationhub"></a>  
AWS Migration Hub is a service that provides a single location to track migration tasks across multiple AWS tools and partner solutions.   
See also [https://aws.amazon.com/migration-hub/](https://aws.amazon.com/migration-hub/).

**MIME**<a name="MIME_abbrev"></a>   
See [Multipurpose Internet Mail Extensions (MIME)](#multipurposeinternetmailextensions).

**Amazon ML**<a name="machine-learning"></a>  
Amazon Machine Learning is a cloud-based service that creates machine learning (ML) models by finding patterns in your data, and uses these models to process new data and generate predictions.   
See also [http://aws.amazon.com/machine-learning/](http://aws.amazon.com/machine-learning/).

**ML model**<a name="ml-model"></a>  
In machine learning (ML), a mathematical model that generates predictions by finding patterns in data. Amazon Machine Learning supports three types of ML models: binary classification, multiclass classification, and regression. Also known as a *predictive model*.   
See also [binary classification model](#binary-classification-model). 
See also [multiclass classification model](#multiclass-classification-model). 
See also [regression model](#regression-model).

**Mobile Analytics**<a name="AmazonMobileAnalytics"></a>  
Amazon Mobile Analytics is a service for collecting, visualizing, understanding, and extracting mobile app usage data at scale.   
See also [https://aws.amazon.com/mobileanalytics](https://aws.amazon.com/mobileanalytics/).

**Mobile Hub**<a name="AWSMobileHub"></a>   
See [Amplify](#Amplify).

**AWS Mobile SDK**<a name="mobilesdk"></a>   
See [Amplify](#Amplify).

**Mobile SDK for Android**<a name="sdk-for-android"></a>   
See [Amplify Android](#AmplifyAndroid).

**Mobile SDK for iOS**<a name="sdk-for-ios"></a>   
See [Amplify iOS](#AmplifyiOS).

**Mobile SDK for Unity**<a name="sdk-for-unity"></a>  
The AWS Mobile SDK for Unity is included in the [AWS SDK for .NET](#sdkdotnet).

**Mobile SDK for Xamarin**<a name="sdk-for-xamarin"></a>  
The AWS Mobile SDK for Xamarin is included in the [AWS SDK for .NET](#sdkdotnet).

**Amazon Monitron**<a name="monitron"></a>  
Amazon Monitron is an end-to-end system that uses machine learning (ML) to detect abnormal behavior in industrial machinery. Use Amazon Monitron to implement predictive maintenance and reduce unplanned downtime.   
See also [https://aws.amazon.com/monitron/](https://aws.amazon.com/monitron/).

**Amazon MQ**<a name="AmazonMQ"></a>  
Amazon MQ is a managed message broker service for Apache ActiveMQ that you can use to set up and operate message brokers in the cloud.   
See also [https://aws.amazon.com/amazon-mq/](https://aws.amazon.com/amazon-mq/).

**MTA**<a name="MTA_abbrev"></a>   
See [Mail Transfer Agent (MTA)](#mailtransferagent).

**Multi-AZ deployment**<a name="multiAZ"></a>  
A primary [DB instance](#dbinstance) that has a synchronous standby replica in a different [Availability Zone](#AZ). The primary DB instance is synchronously replicated across Availability Zones to the standby replica.

**multiclass classification model**<a name="multiclass-classification-model"></a>  
A machine learning model that predicts values that belong to a limited, pre-defined set of permissible values. For example, "Is this product a book, movie, or clothing?"

**multi-factor authentication (MFA)**<a name="AWSMultiFactorAuthentication"></a>  
An optional [AWS account](#account) security feature. After you enable AWS MFA, you must provide a six-digit, single-use code in addition to your sign-in credentials whenever you access secure AWS webpages or the [AWS Management Console](#AWSManagementConsole). You get this single-use code from an authentication device that you keep in your physical possession.   
See also [https://aws.amazon.com/mfa/](https://aws.amazon.com/mfa/).

**multipart upload**<a name="multipartupload"></a>  
A feature that you can use to upload a single object as a set of parts.

**Multipurpose Internet Mail Extensions (MIME)**<a name="multipurposeinternetmailextensions"></a>  
An internet standard that extends the email protocol to include non-ASCII text and nontext elements, such as attachments.

**Multitool**<a name="Multitool"></a>  
A cascading application that provides a simple command-line interface for managing large datasets. 

**multi-valued attribute**<a name="multivalattrib"></a>  
An attribute with more than one value.

**Amazon MWAA**<a name="managed-workflows-for-apache-airflow"></a>  
Amazon Managed Workflows for Apache Airflow is a managed orchestration service for Apache Airflow to assist in setting up and operating end-to-end data pipelines in the cloud at scale.   
See also [https://aws.amazon.com/managed-workflows-for-apache-airflow](https://aws.amazon.com/managed-workflows-for-apache-airflow/).

### N<a name="N"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**namespace**<a name="namespace"></a>  
An abstract container that provides context for the items (names, or technical terms, or words) it holds, and allows disambiguation of homonym items residing in different namespaces.

**NAT**<a name="nat"></a>  
Network address translation. A strategy of mapping one or more IP addresses to another while data packets are in transit across a traffic routing device. This is commonly used to restrict internet communication to private instances while allowing outgoing traffic.    
See also [Network Address Translation and Protocol Translation](#networkAddressTranslation). 
See also [NAT gateway](#natGateway). 
See also [NAT instance](#natInstance).

**NAT gateway**<a name="natGateway"></a>  
A [NAT](#nat) device, managed by AWS, that performs network address translation in a private [subnet](#subnet), to secure inbound internet traffic. A NAT gateway uses both NAT and port address translation.   
See also [NAT instance](#natInstance).

**NAT instance**<a name="natInstance"></a>  
A [NAT](#nat) device, configured by a user, that performs network address translation in a [Amazon VPC](#vpc) public [subnet](#subnet) to secure inbound internet traffic.    
See also [NAT gateway](#natGateway).

**Neptune**<a name="neptune"></a>  
Amazon Neptune is a managed graph database service that you can use to build and run applications that work with highly connected datasets. Neptune supports the popular graph query languages Apache TinkerPop Gremlin and W3C's SPARQL, enabling you to build queries that efficiently navigate highly connected datasets.   
See also [https://aws.amazon.com/neptune/](https://aws.amazon.com/neptune/).

**network ACL**<a name="NetworkACL"></a>  
An optional layer of security that acts as a firewall for controlling traffic in and out of a [subnet](#subnet). You can associate multiple subnets with a single network [ACL](#ACL), but a subnet can be associated with only one network ACL at a time.

**Network Address Translation and Protocol Translation**<a name="networkAddressTranslation"></a>  
([NAT](#nat)-PT) An internet protocol standard defined in RFC 2766.   
See also [NAT instance](#natInstance). 
See also [NAT gateway](#natGateway).

**Network Firewall**<a name="network-firewall"></a>  
AWS Network Firewall is a managed service that deploys essential network protections for all Amazon Virtual Private Clouds (Amazon VPCs).   
See also [https://aws.amazon.com/network-firewall](https://aws.amazon.com/network-firewall/).

**n-gram processor**<a name="n-gram-processor"></a>  
A processor that performs n-gram transformations.   
See also [n-gram transformation](#n-gram-transformation).

**n-gram transformation**<a name="n-gram-transformation"></a>  
Amazon Machine Learning: A transformation that aids in text string analysis. An n-gram transformation takes a text variable as input and outputs strings by sliding a window of size *n* words, where *n* is specified by the user, over the text, and outputting every string of words of size *n* and all smaller sizes. For example, specifying the n-gram transformation with window size =2 returns all the two-word combinations and all of the single words.

**NICE Desktop Cloud Visualization**<a name="dcv"></a>  
A remote visualization technology for securely connecting users to graphic-intensive 3D applications hosted on a remote, high-performance server. 

**Nimble Studio**<a name="nimble-studio"></a>  
Amazon Nimble Studio is a managed AWS cloud service for creative studios to produce visual effects, animation, and interactive content—from storyboard to final deliverable.   
See also [https://aws.amazon.com/nimble-studio/](https://aws.amazon.com/nimble-studio/).

**node**<a name="node"></a>  
[OpenSearch Service](#AmazonElasticsearchService): An OpenSearch instance. A node can be either a data instance or a dedicated master instance.   
See also [dedicated master node](#dedicatedmasternode).

**NoEcho**<a name="noecho"></a>  
A property of [CloudFormation](#CloudFormation) parameters that prevent the otherwise default reporting of names and values of a template parameter. Declaring the `NoEcho` property causes the parameter value to be masked with asterisks in the report by the `cfn-describe-stacks` command.

**normalized discounted cumulative gain (NCDG) at K (5/10/25)**<a name="ncdg"></a>  
[Amazon Personalize](#amazonpersonalize): An evaluation metric that tells you about the relevance of your model’s highly ranked recommendations, where K is a sample size of 5, 10, or 25 recommendations. Amazon Personalize calculates this by assigning weight to recommendations based on their position in a ranked list, where each recommendation is discounted (given a lower weight) by a factor dependent on its position. The normalized discounted cumulative gain at K assumes that recommendations that are lower on a list are less relevant than recommendations higher on the list.   
See also [metrics](#metrics). 
See also [recommendations](#recommendations).

**NoSQL**<a name="nosql"></a>  
Nonrelational database systems that are highly available, scalable, and optimized for high performance. Instead of the relational model, NoSQL databases (for example, [DynamoDB](#dynamodb)) use alternate models for data management, such as key–value pairs or document storage. 

**null object**<a name="nullobject"></a>  
A null object is one whose version ID is null. [Amazon S3](#amazons3) adds a null object to a [bucket](#bucket) when [versioning](#versioning) for that bucket is suspended. It's possible to have only one null object for each key in a bucket.

**number of passes**<a name="number-of-passes"></a>  
The number of times that you allow Amazon Machine Learning to use the same data records to train a machine learning model.

### O<a name="O"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**O3DE**<a name="o3de"></a>  
Open 3D Engine (successor to Amazon Lumberyard) is an open-source 3D development engine for creating games and simulations. O3DE is licensed under Apache 2.0 and maintained by a community of contributors, including Amazon.   
See also [https://www.o3de.org/](https://www.o3de.org/). 
See also [https://aws.amazon.com/lumberyard/](https://aws.amazon.com/lumberyard/). 
See also [https://docs.aws.amazon.com/lumberyard/](https://docs.aws.amazon.com/lumberyard/).

**object**<a name="object"></a>  
[Amazon S3](#amazons3): The fundamental entity type stored in Amazon S3. Objects consist of object data and metadata. The data portion is opaque to Amazon S3.  
[CloudFront](#AmazonCF): Any entity that can be served either over HTTP or a version of RTMP.

**observation**<a name="observation"></a>  
Amazon Machine Learning: A single instance of data that Amazon Machine Learning (Amazon ML) uses to either train a machine learning model how to predict or to generate a prediction. Each row in an Amazon ML input data file is an observation.

**On-Demand Instance**<a name="ondemandinstance"></a>  
An [Amazon EC2](#ec2) pricing option that charges you for compute capacity by the hour or second (minimum of 60 seconds) with no long-term commitment.

**Open 3D Engine**<a name="Open3DEngine"></a>   
See [O3DE](#o3de).

**OpenSearch Service**<a name="AmazonElasticsearchService"></a>  
Amazon OpenSearch Service is an AWS managed service for deploying, operating, and scaling OpenSearch, an open-source search and analytics engine, in the AWS Cloud. Amazon OpenSearch Service (OpenSearch Service) also offers security options, high availability, data durability, and direct access to the OpenSearch API.   
See also [https://aws.amazon.com/elasticsearch-service](https://aws.amazon.com/elasticsearch-service/).

**operation**<a name="operation"></a>  
An API function. Also called an *action*.

**OpsWorks**<a name="opsworks"></a>  
AWS OpsWorks is a configuration management service that helps you use Chef to configure and operate groups of instances and applications. You can define the application's architecture and the specification of each component including package installation, software configuration, and [resources](#resource) such as storage. You can automate tasks based on time, load, or lifecycle events.   
See also [https://aws.amazon.com/opsworks/](https://aws.amazon.com/opsworks/).

**optimistic locking**<a name="optimistic-locking"></a>  
A strategy to ensure that an item that you want to update has not been modified by others before you perform the update. For [DynamoDB](#dynamodb), optimistic locking support is provided by the AWS SDKs.

**opt-in Region**<a name="optinregion"></a>  
An AWS Region that is disabled by default. To use an opt-in Region, you must enable it. Regions introduced after March 20, 2019 are opt-in Regions. For a list of opt-in Regions, see [Considerations before enabling and disabling Regions](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html#manage-acct-regions-considerations) in the *AWS Account Management Guide*.    
See also [Region that is enabled by default](#regionthat).

**organization**<a name="organization"></a>  
[Organizations](#awsorganizations): An entity that you create to consolidate and manage your AWS accounts. An organization has one management account along with zero or more member accounts.

**organizational unit**<a name="organizational-unit"></a>  
[Organizations](#awsorganizations): A container for accounts within a [root](#root) of an organization. An organizational unit (OU) can contain other OUs.

**Organizations**<a name="awsorganizations"></a>  
AWS Organizations is an account management service that you can use to consolidate multiple AWS accounts into an organization that you create and centrally manage.    
See also [https://aws.amazon.com/organizations/](https://aws.amazon.com/organizations/).

**origin access identity**<a name="originaccessidentity"></a>  
Also called OAI. When using [Amazon CloudFront](#AmazonCF) to serve content with an [Amazon S3](#amazons3) [bucket](#bucket) as the origin, a virtual identity that you use to require users to access your content through CloudFront URLs instead of Amazon S3 URLs. Usually used with CloudFront [private content](#privatecontent). 

**origin server**<a name="originserver"></a>  
The [Amazon S3](#amazons3) [bucket](#bucket) or custom origin containing the definitive original version of the content you deliver through [CloudFront](#AmazonCF).

**original environment**<a name="originalenvironment"></a>  
The instances in a deployment group at the start of an CodeDeploy blue/green deployment.

**OSB transformation**<a name="osb-transformation"></a>  
Orthogonal sparse bigram transformation. In machine learning, a transformation that aids in text string analysis and that's an alternative to the n-gram transformation. OSB transformations are generated by sliding the window of size *n* words over the text, and outputting every pair of words that includes the first word in the window.   
See also [n-gram transformation](#n-gram-transformation).

**OU**<a name="OU_abbrev"></a>   
See [organizational unit](#organizational-unit).

**Outposts**<a name="outposts"></a>  
AWS Outposts is a fully managed service by AWS that extends AWS infrastructure, services, APIs, and tools to on-premises data centers and edge locations. Use AWS Outposts for workloads and devices requiring low latency access to on-premises systems, local data processing, data residency, and application migration with local system interdependencies.   
See also [https://aws.amazon.com/outposts](https://aws.amazon.com/outposts/).

**output location**<a name="output-location"></a>  
Amazon Machine Learning: An Amazon S3 location where the results of a batch prediction are stored.

### P<a name="P"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**pagination**<a name="Pagination"></a>  
The process of responding to an API request by returning a large list of records in small separate parts. Pagination can occur in the following situations:  
+ The client sets the maximum number of returned records to a value below the total number of records.
+ The service has a default maximum number of returned records that's lower than the total number of records.
When an API response is paginated, the service sends a subset of the large list of records and a pagination token that indicates that more records are available. The client includes this pagination token in a subsequent API request, and the service responds with the next subset of records. This continues until the service responds with a subset of records and no pagination token, indicating that all records have been sent. 

**pagination token**<a name="PaginationToken"></a>  
A marker that indicates that an API response contains a subset of a larger list of records. The client can return this marker in a subsequent API request to retrieve the next subset of records until the service responds with a subset of records and no pagination token, indicating that all records have been sent.    
See also [pagination](#Pagination).

**paid AMI**<a name="paidAMI"></a>  
An [Amazon Machine Image (AMI)](#AmazonMachineImage) that you sell to other [Amazon EC2](#ec2) users on [AWS Marketplace](#marketplace).

**AWS Panorama**<a name="panorama"></a>  
AWS Panorama is a machine learning (ML) Appliance and Software Development Kit (SDK) that organizations can use to bring computer vision (CV) to on-premises cameras to make predictions locally.   
See also [https://aws.amazon.com/panorama](https://aws.amazon.com/panorama/).

**AWS ParallelCluster**<a name="parallelcluster"></a>  
AWS ParallelCluster is an AWS supported open source cluster management tool that helps you to deploy and manage high performance computing (HPC) clusters in the AWS Cloud.

**paravirtual virtualization**<a name="paravirtual"></a>   
See [PV virtualization](#PV).

**part**<a name="part"></a>  
A contiguous portion of the object's data in a multipart upload request.

**partition**<a name="partition"></a>  
A group of [AWS Regions](#region). Each Region is in only one partition, and each partition contains one or more Regions. Partitions have independent instances of the AWS Identity and Access Management (IAM) infrastructure. In other words, a partition is comprised of Regions that share the same authentication, account, and resource stack. Each AWS account is scoped to one partition. You can't use IAM credentials from one partition to interact with resources in a different partition.   
Some AWS services are designed to provide cross-Region functionality. Such cross-Region functionality is supported only between Regions in the same partition. AWS commercial Regions are in the `AWS` partition, China Regions are in the `AWS-cn` partition, and AWS GovCloud (US) Regions are in the `AWS-us-gov` partition. 

**partition key**<a name="partition-key"></a>  
A simple primary key, composed of one attribute (also known as a *hash attribute*).   
See also [primary key](#primary-key). 
See also [sort key](#sort-key).

**PAT**<a name="pat"></a>  
Port address translation. 

**pebibyte (PiB)**<a name="pebibyte"></a>  
A contraction of peta binary byte, a pebibyte is 2^50 or 1,125,899,906,842,624 bytes. A petabyte (PB) is 10^15 or 1,000,000,000,000,000 bytes. 1,024 PiB is an [exbibyte (EiB)](#exbibyte).

**period**<a name="period"></a>   
See [sampling period](#SamplingPeriod).

**permission**<a name="permission"></a>  
A statement within a [policy](#policy) that allows or denies access to a particular [resource](#resource). You can state any permission in the following way: "A has permission to do B to C." For example, Jane (A) has permission to read messages (B) from John's [Amazon SQS](#AmazonSimpleQueueService) queue (C). Whenever Jane sends a request to Amazon SQS to use John's queue, the service checks to see if she has permission. It further checks to see if the request satisfies the conditions John set forth in the permission.

**persistent storage**<a name="persistentstorage"></a>  
A data storage solution where the data remains intact until it's deleted. Options within [AWS](#amazonwebservices) include: [Amazon S3](#amazons3), [Amazon RDS](#AmazonRelationalDatabaseService), [DynamoDB](#dynamodb), and other services.

**Amazon Personalize**<a name="amazonpersonalize"></a>  
Amazon Personalize is an artificial intelligence service for creating individualized product and content recommendations.   
See also [https://aws.amazon.com/personalize/](https://aws.amazon.com/personalize/).

**PERSONALIZED\_RANKING recipes**<a name="personalized-ranking-recipes"></a>  
[Amazon Personalize](#amazonpersonalize): Recipes that provide item recommendations in ranked order based on the predicted interest for a user.   
See also [recipe](#persrecipe). 
See also [recommendations](#recommendations). 
See also [personalized-ranking recipe](#personalizedranking). 
See also [popularity-count recipe](#popularity-count-recipe).

**personalized-ranking recipe**<a name="personalizedranking"></a>  
[Amazon Personalize](#amazonpersonalize): A PERSONALIZED\_RANKING recipe that ranks a collection of items that you provide based on the predicted interest level for a specific user. Use the personalized-ranking recipe to create curated lists of items or ordered search results that are personalized for a specific user.   
See also [recipe](#persrecipe). 
See also [PERSONALIZED\_RANKING recipes](#personalized-ranking-recipes).

**physical name**<a name="physical-name"></a>  
A unique label that [CloudFormation](#CloudFormation) assigns to each [resource](#resource) when creating a [stack](#stack). Some CloudFormation commands accept the physical name as a value with the `--physical-name` parameter.

**pilot light**<a name="pilotlight"></a>  
An [active-passive](#activepassive) disaster recovery strategy in which you replicate data from the primary Region as standby, then provision a replica that contains only the core workload infrastructure. To make this infrastructure functional and serve requests, you must provision the remaining resources, such as compute.    
See also [back up and restore](#backupand)[hot standby](#hotstandby)[warm standby](#warmstandby).

**Amazon Pinpoint**<a name="pinpoint"></a>  
Amazon Pinpoint is a multichannel communications service that helps organizations send timely, targeted content through SMS, email, mobile push notifications, voice messages, and in-application channels.   
See also [https://aws.amazon.com/pinpoint](https://aws.amazon.com/pinpoint/).

**pipeline**<a name="pipeline"></a>  
[CodePipeline](#AWSCodePipeline): A workflow construct that defines the way software changes go through a release process.

**plaintext**<a name="plain_text"></a>  
Information that has not been [encrypted](#encrypt), as opposed to [ciphertext](#cipher_text).

**policy**<a name="policy"></a>  
[IAM](#IAM): A document defining permissions that apply to a user, group, or role; the permissions in turn determine what users can do in AWS. A policy typically [allows](#allow) access to specific actions, and can optionally grant that the actions are allowed for specific [resources](#resource), such as [EC2 instances](#ec2instance) or [Amazon S3](#amazons3) [buckets](#bucket). Policies can also explicitly [deny](#deny) access.  
[Amazon EC2 Auto Scaling](#AutoScaling): An object that stores the information that's needed to launch or terminate instances for an Auto Scaling group. Running the policy causes instances to be launched or terminated. You can configure an [alarm](#alarm) to invoke an Auto Scaling policy.

**policy generator**<a name="policy_generator"></a>  
A tool in the [IAM](#IAM) [AWS Management Console](#AWSManagementConsole) that helps you build a [policy](#policy) by selecting elements from lists of available options. 

**policy simulator**<a name="policy_simulator"></a>  
A tool in the [IAM](#IAM) [AWS Management Console](#AWSManagementConsole) that helps you test and troubleshoot [policies](#policy) so you can see their effects in real-world scenarios. 

**policy validator**<a name="policy_validator"></a>  
A tool in the [IAM](#IAM) [AWS Management Console](#AWSManagementConsole) that examines your existing IAM access control [policies](#policy) to ensure that they comply with the IAM policy grammar.

**Amazon Polly**<a name="polly"></a>  
Amazon Polly is a text-to-speech (TTS) service that turns text into natural-sounding human speech. Amazon Polly provides dozens of lifelike voices across a broad set of languages so that you can build speech-enabled applications that work in many different countries.   
See also [https://aws.amazon.com/polly/](https://aws.amazon.com/polly/).

**popularity-count recipe**<a name="popularity-count-recipe"></a>  
[Amazon Personalize](#amazonpersonalize): A USER\_PERSONALIZATION recipe that recommends the items that have had the most interactions with unique users.   
See also [recipe](#persrecipe). 
See also [USER\_PERSONALIZATION recipes](#user-personalization-recipes).

**Porting Assistant for .NET**<a name="portingassistant"></a>  
Porting Assistant for .NET is a compatibility analyzer that reduces the manual effort required to port Microsoft .NET Framework applications to open source .NET Core.

**precision at K (5/10/25)**<a name="precision-at-K"></a>  
[Amazon Personalize](#amazonpersonalize): An evaluation metric that tells you how relevant your model’s recommendations are based on a sample size of K (5, 10, or 25) recommendations. Amazon Personalize calculates this metric based on the number of relevant recommendations out of the top K recommendations, divided by K, where K is 5, 10, or 25.   
See also [metrics](#metrics). 
See also [recommendations](#recommendations).

**prefix**<a name="prefix"></a>   
See [job prefix](#jobprefix).

**Premium Support**<a name="PremiumSupport"></a>  
A one-on-one, fast-response support channel that AWS customers can subscribe to for support for AWS infrastructure services.    
See also [https://aws.amazon.com/premiumsupport/](https://aws.amazon.com/premiumsupport/).

**presigned URL**<a name="presignedURL"></a>  
A web address that uses [query string authentication](#querystringauthentication). 

**primary key**<a name="primary-key"></a>  
One or two attributes that uniquely identify each item in a [DynamoDB](#dynamodb) table, so that no two items can have the same key.   
See also [partition key](#partition-key). 
See also [sort key](#sort-key).

**primary shard**<a name="primary-shard"></a>   
See [shard](#shard).

**principal**<a name="principal"></a>  
The [user](#AWSUser), service, or [account](#account) that receives permissions that are defined in a [policy](#policy). The principal is A in the statement "A has permission to do B to C."

**AWS Private CA**<a name="aws-pca"></a>  
AWS Private Certificate Authority is a hosted private certificate authority service for issuing and revoking private digital [certificates](#certificate).   
See also [https://aws.amazon.com/certificate-manager/private-certificate-authority/](https://aws.amazon.com/certificate-manager/private-certificate-authority/).

**private content**<a name="privatecontent"></a>  
When using [Amazon CloudFront](#AmazonCF) to serve content with an [Amazon S3](#amazons3) [bucket](#bucket) as the origin, a method of controlling access to your content by requiring users to use signed URLs. Signed URLs can restrict user access based on the current date and time, the IP addresses that the requests originate from, or both.

**private IP address**<a name="privateIP"></a>  
A private numerical address (for example, 192.0.2.44) that networked devices use to communicate with one another using the Internet Protocol (IP). Each [EC2 instance](#ec2instance) is assigned two IP addresses at launch, which are directly mapped to each other through network address translation ([NAT](#nat)): a private address (following RFC 1918) and a public address. *Exception:* Instances launched in [Amazon VPC](#vpc) are assigned only a private IP address.

**private subnet**<a name="privateSubnet"></a>  
A [Amazon VPC](#vpc) [subnet](#subnet) whose instances can't be reached from the internet.

**product code**<a name="productcode"></a>  
An identifier provided by AWS when you submit a product to [AWS Marketplace](#marketplace).

**properties**<a name="properties"></a>   
See [resource property](#resourceproperty).

**property rule**<a name="property-rule"></a>  
A [JSON](#json)-compliant markup standard for declaring properties, mappings, and output values in an [CloudFormation](#CloudFormation) template. 

**Provisioned IOPS**<a name="provisionedIOPS"></a>  
A storage option that delivers fast, predictable, and consistent I/O performance. When you specify an IOPS rate while creating a DB instance, [Amazon RDS](#AmazonRelationalDatabaseService) provisions that IOPS rate for the lifetime of the DB instance.

**pseudo parameter**<a name="pseudoparameter"></a>  
A predefined setting (for example, `AWS:StackName`) that can be used in [CloudFormation](#CloudFormation) templates without having to declare them. You can use pseudo parameters anywhere you can use a regular parameter.

**public AMI**<a name="publicAMI"></a>  
An [Amazon Machine Image (AMI)](#AmazonMachineImage) that all [AWS accounts](#account) have permission to launch.

**public dataset**<a name="publicdataset"></a>  
A large collection of public information that can be seamlessly integrated into applications that are based in the AWS Cloud. Amazon stores public datasets at no charge to the community and, similar to other AWS services, users pay only for the compute and storage they use for their own applications. These datasets currently include data from the Human Genome Project, the US Census, Wikipedia, and other sources.    
See also [https://aws.amazon.com/publicdatasets](https://aws.amazon.com/publicdatasets/).

**public IP address**<a name="publicIP"></a>  
A public numerical address (for example, 192.0.2.44) that networked devices use to communicate with one another using the Internet Protocol (IP). Each [EC2 instance](#ec2instance) is assigned two IP addresses at launch, which are directly mapped to each other through Network Address Translation ([NAT](#nat)): a private address (following RFC 1918) and a public address. *Exception:* Instances launched in [Amazon VPC](#vpc) are assigned only a private IP address.

**public subnet**<a name="publicSubnet"></a>  
A [subnet](#subnet) whose instances can be reached from the internet.

**PV virtualization**<a name="PV"></a>  
Paravirtual virtualization allows guest VMs to run on host systems that don't have special support extensions for full hardware and CPU virtualization. Because PV guests run a modified operating system that doesn't use hardware emulation, they can't provide hardware-related features, such as enhanced networking or GPU support.   
See also [HVM virtualization](#HVM).

### Q<a name="Q"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**Amazon QLDB**<a name="qldb"></a>  
Amazon Quantum Ledger Database (Amazon QLDB) is a fully managed ledger database that provides a transparent, immutable, and cryptographically verifiable transaction log owned by a central trusted authority.   
See also [https://aws.amazon.com/qldb](https://aws.amazon.com/qldb/).

**quartile binning transformation**<a name="quartile-binning-transformation"></a>  
Amazon Machine Learning: A process that takes two inputs, a numerical variable and a parameter called a bin number, and outputs a categorical variable. Quartile binning transformations discover non-linearity in a variable's distribution by enabling the machine learning model to learn separate importance values for parts of the numeric variable’s distribution.

**Query**<a name="Query"></a>  
A type of web service that generally uses only the GET or POST HTTP method and a query string with parameters in the URL.   
See also [REST](#REST).

**query string authentication**<a name="querystringauthentication"></a>  
An AWS feature that you can use to place the authentication information in the HTTP request query string instead of in the `Authorization` header, which provides URL-based access to objects in a [bucket](#bucket).

**queue**<a name="queue"></a>  
A sequence of messages or jobs that are held in temporary storage awaiting transmission or processing. 

**queue URL**<a name="queueURL"></a>  
A web address that uniquely identifies a queue.

**Quick**<a name="quicksight-gloss"></a>  
Amazon Quick is a fast, cloud-powered business analytics service that you can use to build visualizations, perform analysis, and quickly get business insights from your data.    
See also [https://aws.amazon.com/quicksight/](https://aws.amazon.com/quicksight/).

**quota**<a name="quota"></a>  
The maximum value for your resources, actions, and items in your AWS account

### R<a name="R"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**AWS RAM**<a name="ram"></a>  
AWS Resource Access Manager is a web service that AWS customers can use to securely share AWS resources with any AWS account or within your organization.   
See also [https://aws.amazon.com/ram](https://aws.amazon.com/ram/).

**range GET**<a name="rangeGET"></a>  
A request that specifies a byte range of data to get for a download. If an object is large, you can break up a download into smaller units by sending multiple range GET requests that each specify a different byte range to GET. 

**raw email**<a name="rawemail"></a>  
A type of *sendmail* request with which you can specify the email headers and MIME types. 

**Amazon RDS**<a name="AmazonRelationalDatabaseService"></a>  
Amazon Relational Database Service is a web service that makes it easier to set up, operate, and scale a relational database in the cloud. It provides cost-efficient, resizable capacity for an industry-standard relational database and manages common database administration tasks.   
See also [https://aws.amazon.com/rds](https://aws.amazon.com/rds/).

**read local/write global**<a name="readlocalwriteglobal"></a>  
An [active-active](#activeactive) strategy in which all writes for a workload are sent to one primary Region and all read traffic is served from the Region where the request originates. Typically architected with an asynchronous data store. Sometimes referred to as *read local-write global*.    
See also [read local/write local](#readlocalwritelocal)[global consistency](#globalconsistency).

**read local/write local**<a name="readlocalwritelocal"></a>  
An [active-active](#activeactive) strategy in which all writes for a workload are sent to one primary Region and all read traffic is served from the Region where the request originates. Typically architected with an asynchronous data store. Sometimes referred to as read local-write global.    
See also [read local/write global](#readlocalwriteglobal)[global consistency](#globalconsistency).

**read replica**<a name="readreplica"></a>  
[Amazon RDS](#AmazonRelationalDatabaseService): An active copy of another DB instance. Any updates to the data on the source DB instance are replicated to the read replica DB instance using the built-in replication feature of MySQL 5.1.

**real-time predictions**<a name="real-time-predictions"></a>  
Amazon Machine Learning: Synchronously generated predictions for individual data observations.   
See also [batch prediction](#batch-prediction).

**receipt handle**<a name="receipthandle"></a>  
[Amazon SQS](#AmazonSimpleQueueService): An identifier that you get when you receive a message from the queue. This identifier is required to delete a message from the queue or when changing a message's visibility timeout.

**receiver**<a name="receiver"></a>  
The entity that consists of the network systems, software, and policies that manage email delivery for a [recipient](#recipient). 

**recipe**<a name="persrecipe"></a>  
[Amazon Personalize](#amazonpersonalize): An Amazon Personalize algorithm that's preconfigured to predict the items that a user interacts with (for USER\_PERSONALIZATION recipes), or calculate items that are similar to specific items that a user has shown interest in (for RELATED\_ITEMS recipes), or rank a collection of items that you provide based on the predicted interest for a specific user (for PERSONALIZED\_RANKING recipes).   
See also [USER\_PERSONALIZATION recipes](#user-personalization-recipes). 
See also [RELATED\_ITEMS recipes](#related-item-recipes). 
See also [PERSONALIZED\_RANKING recipes](#personalized-ranking-recipes).

**recipient**<a name="recipient"></a>  
[Amazon SES](#SES): The person or entity receiving an email message. For example, a person named in the "To" field of a message.

**recommendations**<a name="recommendations"></a>  
[Amazon Personalize](#amazonpersonalize): A list of items that Amazon Personalize predicts that a user interacts with. Depending on the Amazon Personalize recipe used, recommendations can be either a list of items (with USER\_PERSONALIZATION recipes and RELATED\_ITEMS recipes), or a ranking of a collection of items you provided (with PERSONALIZED\_RANKING recipes).   
See also [recipe](#persrecipe). 
See also [campaign](#campaign). 
See also [solution version](#solution-version). 
See also [USER\_PERSONALIZATION recipes](#user-personalization-recipes). 
See also [RELATED\_ITEMS recipes](#related-item-recipes). 
See also [PERSONALIZED\_RANKING recipes](#personalized-ranking-recipes).

**Redis**<a name="redis"></a>  
A fast, open-source, in-memory key-value data structure store. Redis comes with a set of versatile in-memory data structures with which you can easily create a variety of custom applications.

**Amazon Redshift**<a name="redshift"></a>  
Amazon Redshift is a fully managed, petabyte-scale data warehouse service in the cloud. With Amazon Redshift, you can analyze your data using your existing business intelligence tools.   
See also [https://aws.amazon.com/redshift/](https://aws.amazon.com/redshift/).

**reference**<a name="prop_reference"></a>  
A means of inserting a property from one AWS [resource](#resource) into another. For example, you could insert an [Amazon EC2](#ec2) [security group](#SecurityGroup) property into an [Amazon RDS](#AmazonRelationalDatabaseService) resource.

**Region**<a name="region"></a>  
A named set of AWS [resources](#resource) that's in the same geographical area. A Region is comprised of at least three [Availability Zones](#AZ). AWS Regions are divided into [partitions](#partition). AWS commercial Regions are in the `AWS` partition, China Regions are in the `AWS-cn` partition, and AWS GovCloud (US) Regions are in the `AWS-us-gov` partition.

**Region that is enabled by default**<a name="regionthat"></a>  
An AWS Region that is enabled by default. Regions that were introduced before March 20, 2019 are enabled by default and can’t be disabled. For a list of Regions that aren’t enabled by default ([opt-in Region](#optinregion)), see [Considerations before enabling and disabling Regions](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html#manage-acct-regions-considerations) in the *AWS Account Management Guide*.

**regression model**<a name="recipe"></a>  
Amazon Machine Learning: Preformatted instructions for common data transformations that fine-tune machine learning model performance.

**regression model**<a name="regression-model"></a>  
A type of machine learning model that predicts a numeric value, such as the exact purchase price of a house.

**regularization**<a name="regularization"></a>  
A machine learning (ML) parameter that you can tune to obtain higher-quality ML models. Regularization helps prevent ML models from memorizing training data examples instead of learning how to generalize the patterns it sees (called overfitting). When training data is overfitted, the ML model performs well on the training data, but doesn't perform well on the evaluation data or on new data.

**Amazon Rekognition**<a name="rekognition"></a>  
Amazon Rekognition is a machine learning service that identifies objects, people, text, scenes, and activities, including inappropriate content, in either image or video files. With Amazon Rekognition Custom Labels, you can create a customized ML model that detects objects and scenes specific to your business in images.   
See also [https://aws.amazon.com/rekognition/](https://aws.amazon.com/rekognition/).

**RELATED\_ITEMS recipes**<a name="related-item-recipes"></a>  
[Amazon Personalize](#amazonpersonalize)Recipes that recommend items that are similar to a specified item, such as the item-to-item (SIMS) recipe.   
See also [recipe](#persrecipe). 
See also [item-to-item similarities (SIMS) recipe](#item-to-item-similarities).

**replacement environment**<a name="replacementenvironment"></a>  
The instances in a deployment group after the CodeDeploy blue/green deployment.

**replica shard**<a name="replica-shard"></a>   
See [shard](#shard).

**reply path**<a name="replypath"></a>  
The email address that an email reply is sent to. This is different from the [return path](#returnpath).

**representational state transfer**<a name="REST_full"></a>   
See [REST](#REST).

**reputation**<a name="reputation"></a>  
1. An [Amazon SES](#SES) metric, based on factors that might include [bounces](#bounce), [complaints](#complaint), and other metrics, regarding whether a customer is sending high-quality email.  
2. A measure of confidence, as judged by an [internet service provider (ISP)](#internetserviceprovider) or other entity that an IP address that they are receiving email from isn't the source of [spam](#spam).

**requester**<a name="requester"></a>  
The person (or application) that sends a request to AWS to perform a specific action. When AWS receives a request, it first evaluates the requester's permissions to determine whether the requester is allowed to perform the request action (if applicable, for the requested [resource](#resource)).

**Requester Pays**<a name="RequesterPays"></a>  
An [Amazon S3](#amazons3) feature that allows a [bucket owner](#bucketowner) to specify that anyone who requests access to objects in a particular [bucket](#bucket) must pay the data transfer and request costs.

**reservation**<a name="reservation"></a>  
A collection of [EC2 instances](#ec2instance) started as part of the same launch request. This is not to be confused with a [Reserved Instance](#reservedinstance).

**Reserved Instance**<a name="reservedinstance"></a>  
A pricing option for [EC2 instances](#ec2instance) that discounts the [on-demand](#ondemandinstance) usage charge for instances that meet the specified parameters. Customers pay for the entire term of the instance, regardless of how they use it.

**Reserved Instance Marketplace**<a name="reservedinstancemarketplace"></a>  
An online exchange that matches sellers who have reserved capacity that they no longer need with buyers who are looking to purchase additional capacity. [reserved instances](#reservedinstance) that you purchase from third-party sellers have less than a full standard term remaining and can be sold at different upfront prices. The usage or reoccurring fees remain the same as the fees set when the Reserved Instances were originally purchased. Full standard terms for Reserved Instances available from AWS run for one year or three years.

**Resilience Hub**<a name="resilience-hub"></a>  
AWS Resilience Hub gives you a central place to define, validate, and track the resiliency of your AWS application. It helps you to protect your applications from disruptions, and reduce recovery costs to optimize business continuity to help meet compliance and regulatory requirements.    
See also [https://aws.amazon.com/resilience-hub](https://aws.amazon.com/resilience-hub/).

**resource**<a name="resource"></a>  
An entity that users can work with in AWS, such as an [EC2 instance](#ec2instance), an [DynamoDB](#dynamodb) table, an [Amazon S3](#amazons3) [bucket](#bucket), an [IAM](#IAM) user, or an [OpsWorks](#opsworks) [stack](#stack).

**Resource Groups**<a name="arg"></a>  
AWS Resource Groups is a web service that AWS customers can use to manage and automate tasks on large numbers of resources at one time.   
See also [AWS Resource Groups](https://docs.aws.amazon.com/ARG/latest/userguide/resource-groups.html).

**Amazon Resource Name (ARN)**<a name="ARN"></a>  
Amazon Resource Name is a standardized way to refer to an AWS [resource](#resource) (for example, `arn:aws:iam::123456789012:user/division_abc/subdivision_xyz/Bob`).

**resource property**<a name="resourceproperty"></a>  
A value required when including an AWS [resource](#resource) in an [CloudFormation](#CloudFormation) [stack](#stack). Each resource can have one or more properties associated with it. For example, an `AWS::EC2::Instance` resource might have a `UserData` property. In an CloudFormation template, resources must declare a properties section, even if the resource has no properties.

**resource record**<a name="resourcerecord"></a>  
Also called *resource record set*. The fundamental information elements in the Domain Name System (DNS).   
See also [Domain Name System](http://en.wikipedia.org/wiki/Domain_Name_System).

**REST**<a name="REST"></a>  
Representational state transfer. A simple stateless architecture that generally runs over HTTPS/TLS. REST emphasizes that resources have unique and hierarchical identifiers (URIs), are represented by common media types (such as HTML, XML, or [JSON](#json)), and that operations on the resources are either predefined or discoverable within the media type. In practice, this generally results in a limited number of operations.   
See also [Query](#Query). 
See also [WSDL](#WSDL). 
See also [SOAP](#SOAP).

**RESTful web service**<a name="RESTful"></a>  
Also known as RESTful API. A web service that follows [REST](#REST) architectural constraints. The API operations must use HTTP methods explicitly, expose hierarchical URIs, and transfer either XML, [JSON](#json), or both. 

**return enabled**<a name="returnenabled"></a>  
[CloudSearch](#cloudSearch): An index field option that enables the field's values to be returned in the search results.

**return path**<a name="returnpath"></a>  
The email address that bounced email is returned to. The return path is specified in the header of the original email. This is different from the [reply path](#replypath).

**revision**<a name="revision"></a>  
[CodePipeline](#AWSCodePipeline): A change that's made to a source that's configured in a source action, such as a pushed commit to a [GitHub](#github) repository or an update to a file in a versioned [Amazon S3](#amazons3) [bucket](#bucket). 

**AWS RoboMaker**<a name="robomaker"></a>  
AWS RoboMaker is a cloud-based simulation service that robotics developers use to run, scale, and automate simulation without managing any infrastructure.   
See also [https://aws.amazon.com/robomaker](https://aws.amazon.com/robomaker/).

**role**<a name="role"></a>  
A tool for giving temporary access to AWS [resources](#resource) in your [AWS account](#account).

**rollback**<a name="rollback"></a>  
A return to a previous state that follows the failure to create an object, such as [CloudFormation](#CloudFormation) [stack](#stack). All [resources](#resource) that are associated with the failure are deleted during the rollback. For CloudFormation, you can override this behavior using the `--disable-rollback` option on the command line.

**root**<a name="root"></a>  
[Organizations](#awsorganizations): A parent container for the accounts in your organization. If you apply a [service control policy](#service-control-policy) to the root, it applies to every [organizational unit](#organizational-unit) and account in the organization.

**root credentials**<a name="root_credentials"></a>  
Authentication information associated with the [AWS account](#account) owner. 

**root device volume**<a name="rootdevicevolume"></a>  
A [volume](#volume) that contains the image used to boot the [instance](#instance) (also known as a *root device*). If you launched the instance from an [AMI](#AmazonMachineImage) backed by [instance store](#instancestore), this is an instance store [volume](#volume) created from a template stored in [Amazon S3](#amazons3). If you launched the instance from an AMI backed by [Amazon EBS](#EBS), this is an Amazon EBS volume created from an Amazon EBS snapshot.

**route table**<a name="routetable"></a>  
A set of routing rules that controls the traffic leaving any [subnet](#subnet) that's associated with the route table. You can associate multiple subnets with a single route table, but a subnet can be associated with only one route table at a time.

**Route 53**<a name="Route53"></a>  
Amazon Route 53 is a web service that you can use to create a new DNS service or to migrate your existing DNS service to the cloud.   
See also [https://aws.amazon.com/route53](https://aws.amazon.com/route53/).

**row identifier**<a name="row-identifier"></a>  
Amazon Machine Learning: An attribute in the input data that you can include in the evaluation or prediction output to make it easier to associate a prediction with an observation.

**rule**<a name="rule"></a>  
[AWS WAF](#awswaf): A set of conditions that AWS WAF searches for in web requests to AWS [resources](#resource) such as [Amazon CloudFront](#AmazonCF) distributions. You add rules to a [web ACL](#webacl), and then specify whether you want to allow or block web requests based on each rule.

### S<a name="S"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**Amazon S3**<a name="amazons3"></a>  
Amazon S3 is storage for the internet. You can use it to store and retrieve any amount of data at any time, from anywhere on the web.   
See also [https://aws.amazon.com/s3](https://aws.amazon.com/s3/).

**Amazon Glacier**<a name="glacier"></a>  
Amazon Glacier is a secure, durable, and low-cost storage service for data archiving and long-term backup. You can reliably store large or small amounts of data for significantly less than on-premises solutions. Amazon Glacier is optimized for infrequently accessed data, where a retrieval time of several hours is suitable.   
See also [https://aws.amazon.com/glacier/](https://aws.amazon.com/glacier/).

**Amazon S3-Backed AMI**<a name="s3backed"></a>   
See [instance store-backed AMI](#instancebacked).

**SageMaker AI**<a name="sagemaker"></a>  
Amazon SageMaker AI is a fully managed cloud service that builds, trains, and deploys machine learning (ML) models by using AWS infrastructure, tools, and workflows.   
See also [https://aws.amazon.com/sagemaker](https://aws.amazon.com/sagemaker/).

**AWS SAM**<a name="SAM"></a>  
AWS Serverless Application Model is an open-source framework for building and running serverless applications. AWS SAM provides a command line interface tool and a shorthand syntax template specification that you can use to quickly iterate through your serverless application lifecycle.   
See also [https://aws.amazon.com/serverless/sam/](https://aws.amazon.com/serverless/sam/).

**sampling period**<a name="SamplingPeriod"></a>  
A defined duration of time, such as one minute, which [CloudWatch](#AmazonCW) computes a [statistic](#statistic) over. 

**sandbox**<a name="sandbox"></a>  
A testing location where you can test the functionality of your application without affecting production, incurring charges, or purchasing products.  
[Amazon SES](#SES): An environment that developers can use to test and evaluate the service. In the sandbox, you have full access to the Amazon SES API, but you can only send messages to verified email addresses and the mailbox simulator. To get out of the sandbox, you must apply for production access. Accounts in the sandbox also have lower [sending limits](#sendinglimits) than production accounts.

**scale in**<a name="scale-in"></a>  
To remove EC2 instances from an [Auto Scaling group](#AutoScalingGroup).

**scale out**<a name="scale-out"></a>  
To add EC2 instances to an [Auto Scaling group](#AutoScalingGroup).

**scaling activity**<a name="ScalingActivity"></a>  
A process that changes the size, configuration, or makeup of an [Auto Scaling group](#AutoScalingGroup) by launching or terminating instances.

**scaling policy**<a name="scalingpolicy"></a>  
A description of how Auto Scaling automatically scales an [Auto Scaling group](#AutoScalingGroup) in response to changing demand.   
See also [scale in](#scale-in). 
See also [scale out](#scale-out).

**scheduler**<a name="scheduler"></a>  
 The method used for placing [tasks](#task) on [container instances](#container_instance). 

**schema**<a name="schema"></a>  
Amazon Machine Learning: The information that's needed to interpret the input data for a machine learning model, including attribute names and their assigned data types, and the names of special attributes.

**score cut-off value**<a name="score-cut-off-value"></a>  
Amazon Machine Learning: A binary classification model outputs a score that ranges from 0 to 1. To decide whether an observation is classified as 1 or 0, you pick a classification threshold, or cut-off, and Amazon ML compares the score against it. Observations with scores higher than the cut-off are predicted as target equals 1, and scores lower than the cut-off are predicted as target equals 0.

**SCP**<a name="SCP_abbrev"></a>   
See [service control policy](#service-control-policy).

**AWS SCT**<a name="schema-conversion-tool"></a>  
AWS Schema Conversion Tool is a desktop application that automates heterogeneous database migrations. You can use AWS SCT to convert database schemas and code objects, SQL code in your applications, and ETL scripts to a format compatible with the target database. Then, you can use AWS SCT data extraction agents to migrate data to your target database.   
See also [https://aws.amazon.com/dms/schema-conversion-tool](https://aws.amazon.com/dms/schema-conversion-tool/).

**AWS SDK for .NET**<a name="sdkdotnet"></a>  
AWS SDK for .NET is a software development kit that provides .NET API operations for AWS services including [Amazon S3](#amazons3), [Amazon EC2](#ec2), [IAM](#IAM), and more. You can download the SDK as multiple service-specific packages on NuGet.   
See also [https://aws.amazon.com/sdk-for-net/](https://aws.amazon.com/sdk-for-net/).

**SDK for C\+\+**<a name="sdkcpp"></a>  
AWS SDK for C\+\+ is a software development kit that provides C\+\+ APIs for many AWS services including [Amazon S3](#amazons3), [Amazon EC2](#ec2), [DynamoDB](#dynamodb), and more. The single, downloadable package includes the AWS C\+\+ library, code examples, and documentation.   
See also [https://aws.amazon.com/sdk-for-cpp/](https://aws.amazon.com/sdk-for-cpp/).

**SDK for Go**<a name="sdkgo"></a>  
AWS SDK for Go is a software development kit for integrating your Go application with the full suite of AWS services.   
See also [https://aws.amazon.com/sdk-for-go/](https://aws.amazon.com/sdk-for-go/).

**SDK for Java**<a name="sdkjava"></a>  
AWS SDK for Java is a software development kit that provides Java API operations for many AWS services including [Amazon S3](#amazons3), [Amazon EC2](#ec2), [DynamoDB](#dynamodb), and more. The single, downloadable package includes the AWS Java library, code examples, and documentation.    
See also [https://aws.amazon.com/sdk-for-java/](https://aws.amazon.com/sdk-for-java/).

**SDK for JavaScript in Node.js**<a name="sdkjavanodejs"></a>  
AWS SDK for JavaScript in Node.js is a software development kit for accessing AWS services from JavaScript in Node.js. The SDK provides JavaScript objects for AWS services, including [Amazon S3](#amazons3), [Amazon EC2](#ec2), [DynamoDB](#dynamodb), and [Amazon SWF](#swf). The single, downloadable package includes the AWS JavaScript library and documentation.   
See also [https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/).

**SDK for JavaScript in the Browser**<a name="sdkjavabrowser"></a>  
AWS SDK for JavaScript in the Browser is a software development kit for accessing AWS services from JavaScript code running in the browser. Authenticate users through Facebook, Google, or Login with Amazon using web identity federation. Store application data in [DynamoDB](#dynamodb), and save user files to [Amazon S3](#amazons3).   
See also [https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/).

**SDK for PHP**<a name="sdkphp"></a>  
AWS SDK for PHP is a software development kit and open-source PHP library for integrating your PHP application with AWS services such as [Amazon S3](#amazons3), [Amazon Glacier](#glacier), and [DynamoDB](#dynamodb).   
See also [https://aws.amazon.com/sdk-for-php/](https://aws.amazon.com/sdk-for-php/).

**SDK for Python (Boto3)**<a name="sdkpython"></a>  
AWS SDK for Python (Boto3) is a software development kit for using Python to access AWS services such as [Amazon EC2](#ec2), [Amazon EMR](#AmazonElasticMapReduce), [Amazon EC2 Auto Scaling](#AutoScaling), [Kinesis](#AmazonKinesis), or [Lambda](#lambda).   
See also [http://boto.readthedocs.org/en/latest/](http://boto.readthedocs.org/en/latest/).

**SDK for Ruby**<a name="sdkruby"></a>  
AWS SDK for Ruby is a software development kit for accessing AWS services from Ruby. The SDK provides Ruby classes for many AWS services including [Amazon S3](#amazons3), [Amazon EC2](#ec2), [DynamoDB](#dynamodb) and more. The single, downloadable package includes the AWS Ruby Library and documentation.   
See also [https://aws.amazon.com/sdk-for-ruby/](https://aws.amazon.com/sdk-for-ruby/).

**SDK for Rust**<a name="sdk-for-rust"></a>  
AWS SDK for Rust is a software development kit that provides APIs and utilities for developers. It enables Rust applications to integrate with AWS services such as Amazon S3 and Amazon EC2.

**SDK for Swift**<a name="sdk-for-swift"></a>  
AWS SDK for Swift is a software development kit that provides support for accessing AWS infrastructure and services using the Swift language.

**search API**<a name="searchapi"></a>  
[CloudSearch](#cloudSearch): The API that you use to submit search requests to a [search domain](#searchdomain). 

**search domain**<a name="searchdomain"></a>  
[CloudSearch](#cloudSearch): Encapsulates your searchable data and the search instances that handle your search requests. You typically set up a separate Amazon CloudSearch domain for each different collection of data that you want to search.

**search domain configuration**<a name="domainconfig"></a>  
[CloudSearch](#cloudSearch): A domain's indexing options, [analysis schemes](#analysisscheme), [expressions](#expression), [suggesters](#suggester), access policies, and scaling and availability options. 

**search enabled**<a name="searchenabled"></a>  
[CloudSearch](#cloudSearch): An index field option that enables the field data to be searched. 

**search endpoint**<a name="searchendpoint"></a>  
[CloudSearch](#cloudSearch): The URL that you connect to when sending search requests to a search domain. Each Amazon CloudSearch domain has a unique search endpoint that remains the same for the life of the domain.

**search index**<a name="searchindex"></a>  
[CloudSearch](#cloudSearch): A representation of your searchable data that facilitates fast and accurate data retrieval.

**search instance**<a name="searchinstance"></a>  
[CloudSearch](#cloudSearch): A compute [resource](#resource) that indexes your data and processes search requests. An Amazon CloudSearch domain has one or more search instances, each with a finite amount of RAM and CPU resources. As your data volume grows, more search instances or larger search instances are deployed to contain your indexed data. When necessary, your index is automatically partitioned across multiple search instances. As your request volume or complexity increases, each search partition is automatically replicated to provide additional processing capacity. 

**search request**<a name="searchrequest"></a>  
[CloudSearch](#cloudSearch): A request that's sent to an Amazon CloudSearch domain's search endpoint to retrieve documents from the index that match particular search criteria. 

**search result**<a name="searchresult"></a>  
[CloudSearch](#cloudSearch): A document that matches a search request. Also referred to as a *search hit*. 

**secret access key**<a name="SecretAccessKey"></a>  
A key that's used with the [access key ID](#accesskeyID) to cryptographically sign programmatic AWS requests. Signing a request identifies the sender and prevents the request from being altered. You can generate secret access keys for your [AWS account](#account), individual IAM [users](#AWSUser) and temporary sessions.

**Secrets Manager**<a name="secretsmanager"></a>  
AWS Secrets Manager is a service for securely encrypting, storing, and rotating credentials for databases and other services.   
See also [https://aws.amazon.com/secrets-manager/](https://aws.amazon.com/secrets-manager/).

**security group**<a name="SecurityGroup"></a>  
A named set of allowed inbound network connections for an instance. (Security groups in [Amazon VPC](#vpc) also include support for outbound connections.) Each security group consists of a list of protocols, ports, and IP address ranges. A security group can apply to multiple instances, and multiple groups can regulate a single instance. 

**Security Hub CSPM**<a name="securityhub"></a>  
AWS Security Hub CSPM is a service that provides a comprehensive view of the security state of your AWS resources. Security Hub CSPM collects security data from AWS accounts and services and helps you analyze your security trends to identify and prioritize the security issues across your AWS environment.   
See also [https://aws.amazon.com/security-hub/](https://aws.amazon.com/security-hub/).

**sender**<a name="sender"></a>  
The person or entity sending an email message.

**Sender ID**<a name="SenderID"></a>  
A Microsoft controlled version of [SPF](#SPF). An email authentication and anti-spoofing system. For more information about Sender ID, see [Sender ID](http://wikipedia.org/wiki/Sender_ID) in Wikipedia.

**sending limits**<a name="sendinglimits"></a>  
The [sending quota](#sendingquota) and [maximum send rate](#maximumsendrate) that are associated with every [Amazon SES](#SES) account.

**sending quota**<a name="sendingquota"></a>  
The maximum number of email messages that you can send using [Amazon SES](#SES) in a 24-hour period.

**AWS Serverless Application Repository**<a name="serverlessrepo"></a>  
AWS Serverless Application Repository is a managed repository that teams, organizations, and individual developers can use to store and share reusable applications, and assemble and deploy serverless architectures in powerful new ways.   
See also [https://aws.amazon.com/serverless/serverlessrepo/](https://aws.amazon.com/serverless/serverlessrepo/).

**server-side encryption (SSE)**<a name="server_side_encryption"></a>  
The [encrypting](#encrypt) of data at the server level. [Amazon S3](#amazons3) supports three modes of server-side encryption: SSE-S3, where Amazon S3 manages the keys; SSE-C, where the customer manages the keys; and SSE-KMS, where [AWS KMS](#awskms) manages keys.

**Service Catalog**<a name="servicecatalog"></a>  
AWS Service Catalog is a web service that helps organizations create and manage catalogs of IT services that are approved for use on AWS. These IT services can include everything from virtual machine images, servers, software, and databases to complete multitier application architectures.   
See also [https://aws.amazon.com/servicecatalog/](https://aws.amazon.com/servicecatalog/).

**service control policy**<a name="service-control-policy"></a>  
[Organizations](#awsorganizations): A policy-based control that specifies the services and actions that users and roles can use in the accounts that the service control policy (SCP) affects.

**service endpoint**<a name="service_endpoint"></a>   
See [endpoint](#endpoint).

**service health dashboard**<a name="servicehealthdashboard"></a>  
A webpage showing up-to-the-minute information about AWS service availability. The dashboard is located at [http://status.aws.amazon.com/](http://status.aws.amazon.com/).

**AWS Service Management Connector**<a name="service-management-connector"></a>  
AWS Service Management Connector enables customers to provision, manage, and operate AWS resources and capabilities in familiar IT Service Management (ITSM) tooling.   
See also [https://aws.amazon.com/service-management-connector](https://aws.amazon.com/service-management-connector/).

**Service Quotas**<a name="servicequotas"></a>  
A service for viewing and managing your quotas easily and at scale as your AWS workloads grow. Quotas, also referred to as limits, are the maximum number of resources that you can create in an AWS account.

**service role**<a name="servicerole"></a>  
An [IAM](#IAM) [role](#role) that grants permissions to an AWS service so it can access AWS [resources](#resource). The policies that you attach to the service role determine which AWS resources the service can access and what it can do with those resources.

**Amazon SES**<a name="SES"></a>  
Amazon Simple Email Service is a simple and cost-effective email solution for applications.    
See also [https://aws.amazon.com/ses](https://aws.amazon.com/ses/).

**session**<a name="session"></a>  
The period when the temporary security credentials that are provided by [AWS STS](#STS) allow access to your AWS account.

**SHA**<a name="SHA"></a>  
Secure Hash Algorithm. SHA1 is an earlier version of the algorithm, which AWS has replaced with SHA256. 

**shard**<a name="shard"></a>  
[OpenSearch Service](#AmazonElasticsearchService): A partition of data in an index. You can split an index into multiple shards, which can include primary shards (original shards) and replica shards (copies of the primary shards). Replica shards provide failover. This means that, if a cluster node that contains a primary shard fails, a replica shard is promoted to a primary shard. Replica shards also can handle requests.

**shared AMI**<a name="sharedAMI"></a>  
An [Amazon Machine Image (AMI)](#AmazonMachineImage) that a developer builds and makes available for others to use. 

**Shield**<a name="shield"></a>  
AWS Shield is a service that helps to protect your resources—such as Amazon EC2 instances, Elastic Load Balancing load balancers, Amazon CloudFront distributions, and Route 53 hosted zones—against DDoS attacks. AWS Shield is automatically included at no extra cost beyond what you already pay for AWS WAF and your other AWS services. For added protection against DDoS attacks, AWS offers AWS Shield Advanced.    
See also [https://aws.amazon.com/shield](https://aws.amazon.com/shield/).

**shutdown action**<a name="shutdownaction"></a>  
[Amazon EMR](#AmazonElasticMapReduce): A predefined bootstrap action that launches a script that runs a series of commands in parallel before terminating the job flow. 

**signature**<a name="signature"></a>  
Refers to a *digital signature*, which is a mathematical way to confirm the authenticity of a digital message. AWS uses signatures to authenticate the requests you send to our web services. For more information, to [https://aws.amazon.com/security](https://aws.amazon.com/security/). 

**SIGNATURE file**<a name="SIGNATUREfile"></a>  
[Import/Export](#ImportExport): A file that you copy to the root directory of your storage device. The file contains a job ID, manifest file, and a signature.

**Signature Version 4**<a name="sig_v_4"></a>  
Protocol for authenticating inbound API requests to AWS services in all AWS Regions.

**Signer**<a name="signer"></a>  
AWS Signer is a fully managed code-signing service used to ensure the authenticity and integrity of an AWS customer's code.

**Silk**<a name="silk"></a>  
Amazon Silk is a next-generation web browser that's available only on Fire OS tablets and phones. Built on a split architecture that divides processing between the client and the AWS Cloud, Amazon Silk creates a faster, more responsive mobile browsing experience.

**Simple Mail Transfer Protocol**<a name="SMTP_full"></a>   
See [SMTP](#smtp).

**Simple Object Access Protocol**<a name="SOAP_full"></a>   
See [SOAP](#SOAP).

**SimSpace Weaver**<a name="SimSpaceWeaver"></a>  
AWS SimSpace Weaver is a managed service that you can use to build and run large-scale spatial simulations in the AWS Cloud.   
See also [https://aws.amazon.com/simspaceweaver/](https://aws.amazon.com/simspaceweaver/).

**SIMS recipe**<a name="SIMS_recipe"></a>   
See [item-to-item similarities (SIMS) recipe](#item-to-item-similarities).

**single sign-on**<a name="single_sign-on"></a>  
An authentication scheme that allows users to sign in one time to access multiple applications and websites. The service name AWS Single Sign-On is now AWS IAM Identity Center.   
See also [IAM Identity Center](#aws-sso).

**Single-AZ DB instance**<a name="singleAZ"></a>  
A standard (non-Multi-AZ) [DB instance](#dbinstance) that's deployed in one [Availability Zone](#AZ), without a standby replica in another Availability Zone.    
See also [Multi-AZ deployment](#multiAZ).

**Site-to-Site VPN**<a name="site-to-site-vpn"></a>  
AWS Site-to-Site VPN is a fully managed service that you can use to establish Internet Protocol security (IPsec) VPN connections between your AWS networks and your on-premises networks.   
See also [https://aws.amazon.com/vpn/site-to-site-vpn](https://aws.amazon.com/vpn/site-to-site-vpn/).

**sloppy phrase search**<a name="sloppyphrasesearch"></a>  
A search for a phrase that specifies how close the terms must be to one another to be considered a match. 

**AWS SMS**<a name="server-migration-service"></a>  
AWS Server Migration Service is a service that combines data collection tools with automated server replication to speed the migration of on-premises servers to AWS.   
See also [https://aws.amazon.com/server-migration-service](https://aws.amazon.com/server-migration-service/).

**SMTP**<a name="smtp"></a>  
Simple Mail Transfer Protocol. The standard that's used to exchange email messages between internet hosts for the purpose of routing and delivery.

**snapshot**<a name="snapshot"></a>  
[Amazon EBS](#EBS): A backup of your [volumes](#volume) that's stored in [Amazon S3](#amazons3). You can use these snapshots as the starting point for new Amazon EBS volumes or to protect your data for long-term durability.   
See also [DB snapshot](#DBSnapshot).

**Snowball**<a name="snowball"></a>  
AWS Snowball is a petabyte-scale data transport solution that uses devices that are secure to transfer large amounts of data into and out of the AWS Cloud.   
See also [https://aws.amazon.com/snowball](https://aws.amazon.com/importexport/).

**Amazon SNS**<a name="SNS"></a>  
Amazon Simple Notification Service is a web service that applications, users, and devices can use to instantly send and receive notifications from the cloud.   
See also [https://aws.amazon.com/sns](https://aws.amazon.com/sns/).

**SOAP**<a name="SOAP"></a>  
Simple Object Access Protocol. An XML-based protocol that you can use to exchange information over a particular protocol (for example, HTTP or SMTP) between applications.   
See also [REST](#REST). 
See also [WSDL](#WSDL).

**soft bounce**<a name="softbounce"></a>  
A temporary email delivery failure such as one resulting from a full mailbox.

**software VPN**<a name="softwarevpn"></a>  
A software appliance-based VPN connection over the internet. 

**solution**<a name="solution"></a>  
[Amazon Personalize](#amazonpersonalize): The recipe, customized parameters, and trained models (solution versions) that can be used to generate recommendations.   
See also [recipe](#persrecipe). 
See also [solution version](#solution-version). 
See also [recommendations](#recommendations).

**solution version**<a name="solution-version"></a>  
[Amazon Personalize](#amazonpersonalize): A trained model that you create as part of a solution in Amazon Personalize. You deploy a solution version in a campaign to generate recommendations.   
See also [solution](#solution). 
See also [campaign](#campaign). 
See also [recommendations](#recommendations).

**sort enabled**<a name="sortenabled"></a>  
[CloudSearch](#cloudSearch): An index field option that enables a field to be used to sort the search results.

**sort key**<a name="sort-key"></a>  
An attribute used to sort the order of partition keys in a composite primary key (also known as a *range attribute*).    
See also [partition key](#partition-key). 
See also [primary key](#primary-key).

**source/destination checking**<a name="sourcedestinationchecking"></a>  
A security measure to verify that an [EC2 instance](#ec2instance) is the origin of all traffic that it sends and the ultimate destination of all traffic that it receives. In other words, this measure verifies that the instance isn't relaying traffic. By default, source/destination checking is turned on. For instances that function as gateways, such as [Amazon VPC](#vpc) [NAT](#nat) instances, source/destination checking must be disabled.

**spam**<a name="spam"></a>  
Unsolicited bulk emails.

**spamtrap**<a name="spamtrap"></a>  
An email address that's set up by an anti-[spam](#spam) entity. This email address isn't for correspondence but rather for monitoring unsolicited emails. This is also called a *honeypot*.

**SPF**<a name="SPF"></a>  
Sender Policy Framework. A standard for authenticating email. 

**SPICE**<a name="spice"></a>  
A robust in-memory engine that is part of [Amazon Quick](#quicksight-gloss). Engineered for the cloud, SPICE (Super-fast, Parallel, In-memory Calculation Engine) uses a combination of storage and in-memory technologies. It uses these to get faster results from interactive queries and advanced calculations on large datasets. SPICE automatically replicates data for high availability. SPICE makes it possible for Amazon Quick to support hundreds of thousands of simultaneous analyses across a variety of data sources.

**Spot Instance**<a name="SpotInstance"></a>  
 A type of [EC2 instance](#ec2instance) that you can bid on to use unused [Amazon EC2](#ec2) capacity.

**Spot price**<a name="SpotPrice"></a>  
The price for a [Spot Instance](#SpotInstance) at any given time. If your maximum price exceeds the current price and your restrictions are met, [Amazon EC2](#ec2) launches instances on your behalf. 

**SQL injection match condition**<a name="SQLinjectionmatchcondition"></a>  
[AWS WAF](#awswaf): An attribute that specifies the part of web requests (such as a header or a query string) that AWS WAF inspects for malicious SQL code. Based on the specified conditions, you can configure AWS WAF to allow or block web requests to an AWS [resource](#resource), such as an [Amazon CloudFront](#AmazonCF) distribution.

**Amazon SQS**<a name="AmazonSimpleQueueService"></a>  
Amazon Simple Queue Service is a reliable and scalable hosted queues for storing messages as they travel between computers.    
See also [https://aws.amazon.com/sqs](https://aws.amazon.com/sqs/).

**Amazon SWF**<a name="swf"></a>  
Amazon Simple Workflow Service is a fully managed service that helps developers build, run, and scale background jobs that have parallel or sequential steps. Amazon SWF functions similar to a state tracker and task coordinator in the AWS Cloud.   
See also [https://aws.amazon.com/swf/](https://aws.amazon.com/swf/).

**SSE**<a name="SSE_abbrev"></a>   
See [server-side encryption (SSE)](#server_side_encryption).

**SSL**<a name="ssl"></a>  
Secure Sockets Layer   
See also [Transport Layer Security (TLS)](#transportlayersecurity).

**stack**<a name="stack"></a>  
[CloudFormation](#CloudFormation): A collection of AWS resources that you create and delete as a single unit.  
[OpsWorks](#opsworks): A set of instances that you manage collectively, typically because they have a common purpose such as serving PHP applications. A stack serves as a container and handles tasks that apply to the group of instances as a whole, such as managing applications and cookbooks.

**station**<a name="stage"></a>  
[CodePipeline](#AWSCodePipeline): A portion of a pipeline workflow where one or more actions are performed.

**station**<a name="station"></a>  
A place at an AWS facility where your AWS Import/Export data is transferred on to, or off of, your storage device.

**statistic**<a name="statistic"></a>  
One of five functions of the values submitted for a given [sampling period](#SamplingPeriod). These functions are `Maximum`, `Minimum`, `Sum`, `Average`, and `SampleCount`.

**stem**<a name="stems"></a>  
The common root or substring shared by a set of related words. 

**stemming**<a name="stemming"></a>  
The process of mapping related words to a common stem. This enables matching on variants of a word. For example, a search for "horse" could return matches for horses, horseback, and horsing, as well as horse. [CloudSearch](#cloudSearch) supports both dictionary based and algorithmic stemming.

**step**<a name="step"></a>  
[Amazon EMR](#AmazonElasticMapReduce): A single function applied to the data in a [job flow](#jobflow). The sum of all steps comprises a job flow.

**Step Functions**<a name="AWSStepFunctions"></a>  
AWS Step Functions is a web service that coordinates the components of distributed applications as a series of steps in a visual workflow.   
See also [https://aws.amazon.com/step-functions/](https://aws.amazon.com/step-functions/).

**step type**<a name="steptype"></a>  
[Amazon EMR](#AmazonElasticMapReduce): The type of work done in a step. There are a limited number of step types, such as moving data from [Amazon S3](#amazons3) to [Amazon EC2](#ec2) or from Amazon EC2 to Amazon S3. 

**sticky session**<a name="stickysession"></a>  
A feature of the [ELB](#ELB) load balancer that binds a user's session to a specific application instance. This is so that all requests that are coming from the user during the session are sent to the same application instance. By contrast, a load balancer defaults to route each request independently to the application instance with the smallest load. 

**stopping**<a name="stopping"></a>  
The process of filtering stop words from an index or search request.

**stopword**<a name="stopword"></a>  
A word that isn't indexed and is automatically filtered out of search requests because it's either insignificant or so common that including it results in too many matches to be useful. Stopwords are language specific. 

**Storage Gateway**<a name="storagegateway"></a>  
AWS Storage Gateway is a hybrid cloud storage service that provides on-premises access to virtually unlimited cloud storage.   
See also [AWS Storage Gateway](https://aws.amazon.com/storagegateway/?nc2=h_ql_prod_st_sg).

**streaming**<a name="streaming"></a>  
[Amazon EMR](#AmazonElasticMapReduce): A utility that comes with [Hadoop](#Hadoop) that you can use to develop MapReduce executables in languages other than Java.   
[CloudFront](#AmazonCF): The ability to use a media file in real time—as it's transmitted in a steady stream from a server.

**streaming distribution**<a name="streamingdistribution"></a>  
A special kind of [distribution](#distribution) that serves streamed media files using a Real Time Messaging Protocol (RTMP) connection.

**Streams**<a name="streams"></a>   
See [Kinesis Data Streams](#AmazonKinesisStreams).

**string match condition**<a name="stringmatchcondition"></a>  
[AWS WAF](#awswaf): An attribute that specifies the strings that AWS WAF searches for in a web request, such as a value in a header or a query string. Based on the specified strings, you can configure AWS WAF to allow or block web requests to an AWS [resource](#resource), such as a [CloudFront](#AmazonCF) distribution.

**string-to-sign**<a name="string-to-sign"></a>  
Before you calculate an [HMAC](#HMAC) signature, you first assemble the required components in a canonical order. The preencrypted string is the string-to-sign.

**strongly consistent read**<a name="strongly-consistent-read"></a>  
A read process that returns a response with the most up-to-date data. This data reflects the updates from all previous write operations that were successful—regardless of the Region.   
See also [data consistency](#data-consistency). 
See also [eventual consistency](#eventualconsistency). 
See also [eventually consistent read](#eventually-consistent-read).

**structured query**<a name="structuredquery"></a>  
Search criteria that are specified using the [CloudSearch](#cloudSearch) structured query language. You use the structured query language to construct compound queries that use advanced search options and combine multiple search criteria using Boolean operators. 

**AWS STS**<a name="STS"></a>  
AWS Security Token Service is a web service for requesting temporary, limited-privilege credentials for [IAM](#IAM) users or for users that you authenticate ([federated users](#fed_identity)).   
See also [https://aws.amazon.com/iam/](https://aws.amazon.com/iam/).

**subnet**<a name="subnet"></a>  
A segment of the IP address range of a [Amazon VPC](#vpc) that an [EC2 instance](#ec2instance) can be attached to. You can create subnets to group instances according to security and operational needs. 

**Subscription button**<a name="Subscriptionbutton"></a>  
An HTML-coded button that provides a simple way to charge customers a recurring fee.

**suggester**<a name="suggester"></a>  
[CloudSearch](#cloudSearch): Specifies an index field for getting autocomplete suggestions and options that can enable fuzzy matches and control how suggestions are sorted.

**suggestions**<a name="suggestions"></a>  
Documents that contain a match for the partial search string in the field that's designated by the [suggester](#suggester). [CloudSearch](#cloudSearch) suggestions include the document IDs and field values for each matching document. To be a match, the string must match the contents of the field starting from the beginning of the field. 

**Sumerian**<a name="AmazonSumerian"></a>  
Amazon Sumerian is a set of tools for creating and running high-quality 3D, augmented reality (AR), and virtual reality (VR) applications on the web.   
See also [https://aws.amazon.com/sumerian/](https://aws.amazon.com/sumerian/).

**supported AMI**<a name="supportedAMI"></a>  
An [Amazon Machine Image (AMI)](#AmazonMachineImage) similar to a [paid AMI](#paidAMI), except that the owner charges for additional software or a service that customers use with their own AMIs.

**SWF**<a name="SWF_abbrev"></a>   
See [Amazon SWF](#swf).

**symmetric encryption**<a name="symmetric_encryption"></a>  
[Encryption](#encrypt) that uses a private key only.   
See also [asymmetric encryption](#asymmetric_encryption).

**synchronous bounce**<a name="synchronousbounce"></a>  
A type of [bounce](#bounce) that occurs while the email servers of the [sender](#sender) and [receiver](#receiver) are actively communicating.

**synonym**<a name="synonym"></a>  
A word that's the same or nearly the same as an indexed word and that likely produces the same results when specified in a search request. For example, a search for "Rocky Four" or "Rocky 4" likely returns the fourth *Rocky* movie. You can do this by designating that `four` and `4` are synonyms for `IV`. Synonyms are language specific. 

**Systems Manager**<a name="systems-manager"></a>  
AWS Systems Manager is the operations hub for AWS and hybrid cloud environments that can help achieve secure operations at scale. It provides a unified user interface for users to view operations data from multiple AWS services and automate tasks across their AWS resources.   
See also [https://aws.amazon.com/systems-manager](https://aws.amazon.com/systems-manager/).

### T<a name="T"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**table**<a name="table"></a>  
A collection of data. Similar to other database systems, DynamoDB stores data in tables. 

**tag**<a name="tag"></a>  
Metadata that you can define and assign to AWS [resources](#resource), such as an [EC2 instance](#ec2instance). Not all AWS resources can be tagged.

**tagging**<a name="tagging"></a>  
Tagging resources: Applying a [tag](#tag) to an AWS [resource](#resource).  
[Amazon SES](#SES): Also called *labeling*. A way to format [return path](#returnpath) email addresses so that you can specify a different return path for each recipient of a message. You can use tagging to support [VERP](#VERP). For example, if Andrew manages a mailing list, he can use the return paths `andrew+recipient1@example.net` and `andrew+recipient2@example.net` so that he can determine which email bounced.

**target attribute**<a name="target-attribute"></a>  
Amazon Machine Learning (Amazon ML): The attribute in the input data that contains the “correct” answers. Amazon ML uses the target attribute to learn how to make predictions on new data. For example, if you were building a model for predicting the sale price of a house, the target attribute would be “target sale price in USD.”

**target revision**<a name="targetrevision"></a>  
[CodeDeploy](#AWSCodeDeploy): The most recent version of the application revision that has been uploaded to the repository and will be deployed to the instances in a deployment group. In other words, the application revision currently targeted for deployment. This is also the revision that will be pulled for automatic deployments.

**task**<a name="task"></a>  
 An instantiation of a [task definition](#task_definition) that's running on a [container instance](#container_instance). 

**task definition**<a name="task_definition"></a>  
The blueprint for your task. Specifies the name of the [task](#task), revisions, [container definitions](#container_definition), and [volume](#volume) information. 

**task node**<a name="tasknode"></a>  
An [EC2 instance](#ec2instance) that runs [Hadoop](#Hadoop) map and reduce tasks, but doesn't store data. Task nodes are managed by the [master node](#masternode), which assigns Hadoop tasks to nodes and monitors their status. While a job flow is running, you can increase and decrease the number of task nodes. Because they don't store data and can be added and removed from a job flow, you can use task nodes to manage the EC2 instance capacity your job flow uses, increasing capacity to handle peak loads and decreasing it later.  
Task nodes only run a TaskTracker Hadoop daemon.

**tebibyte (TiB)**<a name="tebibyte"></a>  
A contraction of tera binary byte. A tebibyte (TiB) is 2^40 or 1,099,511,627,776 bytes. A terabyte (TB) is 10^12 or 1,000,000,000,000 bytes. 1,024 TiB is a [pebibyte (PiB)](#pebibyte).

**template format version**<a name="template-format-version"></a>  
The version of an [CloudFormation](#CloudFormation) template design that determines the available features. If you omit the `AWSTemplateFormatVersion` section from your template, CloudFormation assumes the most recent format version.

**template validation**<a name="template-validation"></a>  
The process of confirming the use of [JSON](#json) code in an [CloudFormation](#CloudFormation) template. You can validate any CloudFormation template using the `cfn-validate-template` command.

**temporary security credentials**<a name="temp_security_creds"></a>  
Authentication information that's provided by [AWS STS](#STS) when you call an STS API action. Includes an [access key ID](#accesskeyID), a [secret access key](#SecretAccessKey), a [session](#session) token, and an expiration time.

**Amazon Textract**<a name="AmazonTextract"></a>  
Amazon Textract is a service that automatically extracts text and data from scanned documents. Amazon Textract goes beyond simple optical character recognition (OCR) to also identify the contents of fields in forms and information stored in tables.   
See also [https://aws.amazon.com/textract/](https://aws.amazon.com/textract/).

**throttling**<a name="throttling"></a>  
The automatic restricting or slowing down of a process based on one or more limits. For example, [Kinesis Data Streams](#AmazonKinesisStreams) throttles operations if an application (or group of applications operating on the same stream) attempts to get data from a shard at a rate faster than the shard limit. [API Gateway](#APIGateway) uses throttling to limit the steady-state request rates for a single account. [Amazon SES](#SES) uses throttling to reject attempts to send email that exceeds the [sending limits](#sendinglimits).

**time-series data**<a name="timeseriesdata"></a>  
Data that's provided as part of a metric. The time value is assumed to be when the value occurred. A metric is the fundamental concept for [CloudWatch](#AmazonCW) and represents a time-ordered set of data points. You publish metric data points into CloudWatch and later retrieve statistics about those data points as a time-series ordered dataset.

**timestamp**<a name="timestamp"></a>  
A date/time string in the ISO 8601 format (more specifically, in the `YYYY-MM-DD` format).

**Timestream**<a name="timestream"></a>  
Amazon Timestream is a scalable and serverless time series database service for real-time analytics, DevOps, and IoT applications that you can use to store and analyze trillions of events per day.   
See also [https://aws.amazon.com/timestream](https://aws.amazon.com/timestream/).

**TLS**<a name="TLS_abbrev"></a>   
See [Transport Layer Security (TLS)](#transportlayersecurity).

**tokenization**<a name="tokenization"></a>  
The process of splitting a stream of text into separate tokens on detectable boundaries such as white space and hyphens.

**AWS Toolkit for Eclipse**<a name="toolkiteclipse"></a>  
AWS Toolkit for Eclipse is an open-source plugin for the Eclipse Java integrated development environment (IDE) that makes it easier to develop, debug, and deploy Java applications using Amazon Web Services.   
See also [https://aws.amazon.com/eclipse/](https://aws.amazon.com/eclipse/).

**AWS Toolkit for JetBrains**<a name="toolkitjetbrains"></a>  
AWS Toolkit for JetBrains is an open-source plugin for the integrated development environments (IDEs) from JetBrains that makes it easier to develop, debug, and deploy serverless applications using Amazon Web Services.   
See also [https://aws.amazon.com/intellij/](https://aws.amazon.com/intellij/)[https://aws.amazon.com/pycharm/](https://aws.amazon.com/pycharm/).

**AWS Toolkit for Microsoft Azure DevOps**<a name="awsvsts"></a>  
AWS Toolkit for Microsoft Azure DevOps provides tasks you can use in build and release definitions in VSTS to interact with AWS services.   
See also [https://aws.amazon.com/vsts/](https://aws.amazon.com/vsts/).

**AWS Toolkit for Visual Studio**<a name="toolkitvisualstudio"></a>  
AWS Toolkit for Visual Studio is an extension for Visual Studio that helps in developing, debugging, and deploying .NET applications using Amazon Web Services.    
See also [https://aws.amazon.com/visualstudio/](https://aws.amazon.com/visualstudio/).

**AWS Toolkit for Visual Studio Code**<a name="toolkitvscode"></a>  
AWS Toolkit for Visual Studio Code is an open-source plugin for the Visual Studio Code (VS Code) editor that makes it easier to develop, debug, and deploy applications using Amazon Web Services.   
See also [https://aws.amazon.com/visualstudiocode/](https://aws.amazon.com/visualstudiocode/).

**AWS Tools for PowerShell**<a name="toolspowershell"></a>  
AWS Tools for PowerShell is a set of PowerShell cmdlets to help developers and administrators manage their AWS services from the PowerShell scripting environment.   
See also [https://aws.amazon.com/powershell/](https://aws.amazon.com/powershell/).

**topic**<a name="topic"></a>  
A communication channel to send messages and subscribe to notifications. It provides an access point for publishers and subscribers to communicate with each other.

**Traffic Mirroring**<a name="trafficmirroring"></a>  
An Amazon VPC feature that you can use to copy network traffic from an elastic network interface of Amazon EC2 instances. You can then send this network traffic to out-of-band security and monitoring appliances for content inspection, threat monitoring, and troubleshooting.   
See also [https://aws.amazon.com/vpc/](https://aws.amazon.com/vpc/).

**training datasource**<a name="training-datasource"></a>  
A datasource that contains the data that Amazon Machine Learning uses to train the machine learning model to make predictions.

**Amazon Transcribe**<a name="transcribe"></a>  
Amazon Transcribe is a machine learning service that uses automatic speech recognition (ASR) to quickly and accurately convert speech to text.   
See also [https://aws.amazon.com/transcribe/](https://aws.amazon.com/transcribe/).

**Amazon Transcribe Medical**<a name="transcribe-med"></a>  
Amazon Transcribe Medical is an automatic speech recognition (ASR) service for adding medical speech-to-text capabilities to voice-enabled clinical documentation applications.   
See also [https://aws.amazon.com/transcribe/medical/](https://aws.amazon.com/transcribe/medical/).

**Transfer Family**<a name="transfer-family"></a>  
AWS Transfer Family offers fully managed support for transferring files over SFTP, FTPS, and FTP into and out of Amazon S3 or Amazon EFS, as well as support for the Applicability Statement 2 (AS2) protocol for business-to-business (B2B) transfers.   
See also [https://aws.amazon.com/aws-transfer-family](https://aws.amazon.com/aws-transfer-family/).

**transition**<a name="transition"></a>  
[CodePipeline](#AWSCodePipeline): The act of a revision in a pipeline continuing from one stage to the next in a workflow.

**Amazon Translate**<a name="translate"></a>  
Amazon Translate is a neural machine translation service that delivers fast, high-quality, and affordable language translation.   
See also [https://aws.amazon.com/translate/](https://aws.amazon.com/translate/).

**Transport Layer Security (TLS)**<a name="transportlayersecurity"></a>  
A cryptographic protocol that provides security for communication over the internet. Its predecessor is Secure Sockets Layer (SSL).

**trust policy**<a name="trust_policy"></a>  
An [IAM](#IAM) [policy](#policy) that's an inherent part of an IAM [role](#role). The trust policy specifies which principals are allowed to use the role.

**Trusted Advisor**<a name="trustedadvisor"></a>  
AWS Trusted Advisor is a web service that inspects your AWS environment and makes recommendations for saving money, improving system availability and performance, and helping to close security gaps.   
See also [https://aws.amazon.com/premiumsupport/trustedadvisor/](https://aws.amazon.com/premiumsupport/trustedadvisor/).

**trusted key groups**<a name="trusted_key_groups"></a>  
Amazon CloudFront key groups whose public keys CloudFront can use to verify the signatures of [CloudFront signed URLs and signed cookies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html).

**trusted signers**<a name="trustedsigners"></a>  
See [trusted key groups](#trusted_key_groups).

**tuning**<a name="tuning"></a>  
Selecting the number and type of [AMIs](#AmazonMachineImage) to run a [Hadoop](#Hadoop) job flow most efficiently.

**tunnel**<a name="tunnel"></a>  
A route for transmission of private network traffic that uses the internet to connect nodes in the private network. The tunnel uses encryption and secure protocols such as PPTP to prevent the traffic from being intercepted as it passes through public routing nodes. 

### U<a name="U"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**unbounded**<a name="unbounded"></a>  
The number of potential occurrences isn't limited by a set number. This value is often used when defining a data type that's a list (for example, `maxOccurs="unbounded"`), in [WSDL](#WSDL).

**unit**<a name="unit"></a>  
Standard measurement for the values submitted to [CloudWatch](#AmazonCW) as metric data. Units include seconds, percent, bytes, bits, count, bytes/second, bits/second, count/second, and none.

**usage report**<a name="usagereport"></a>  
An AWS record that details your usage of a particular AWS service. You can generate and download usage reports from [https://aws.amazon.com/usage-reports/](https://aws.amazon.com/usage-reports/).

**user**<a name="AWSUser"></a>  
A person or application under an [account](#account) that makes API calls to AWS products. Each user has a unique name within the AWS account, and a set of security credentials that aren't shared with other users. These credentials are separate from the security credentials for the AWS account. Each user is associated with one and only one AWS account.

**USER\_PERSONALIZATION recipes**<a name="user-personalization-recipes"></a>  
[Amazon Personalize](#amazonpersonalize): Recipes that are used to build a recommendation system that predicts the items that a user interacts with based on data provided in Interactions, Items, and Users datasets.   
See also [recipe](#persrecipe). 
See also [user-personalization recipe](#userpersonalization). 
See also [popularity-count recipe](#popularity-count-recipe). 
See also [HRNN](#hrnn).

**user-personalization recipe**<a name="userpersonalization"></a>  
[Amazon Personalize](#amazonpersonalize): An HRNN-based USER\_PERSONALIZATION recipe that predicts the items that a user interacts with. The user-personalization recipe can use item exploration and impressions data to generate recommendations for new items.   
See also [HRNN](#hrnn). 
See also [recipe](#persrecipe). 
See also [USER\_PERSONALIZATION recipes](#user-personalization-recipes). 
See also [item exploration](#item-exploration). 
See also [impressions data](#impressions-data). 
See also [recommendations](#recommendations).

**Users dataset**<a name="users-dataset"></a>  
[Amazon Personalize](#amazonpersonalize): A container for metadata about your users, such as age, gender, or loyalty membership.   
See also [dataset](#dataset).

### V<a name="V"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**validation**<a name="validation"></a>   
See [template validation](#template-validation).

**value**<a name="value"></a>  
Instances of [attributes](#attribute) for an item, such as cells in a spreadsheet. An attribute might have multiple values.
Tagging resources: A specific [tag](#tag) label that acts as a descriptor within a tag category (key). For example, you might have [EC2 instance](#ec2instance) with the tag key of *Owner* and the tag value of *Jan*. You can tag an AWS [resource](#resource) with up to 10 key–value pairs. Not all AWS resources can be tagged.

**Variable Envelope Return Path**<a name="VERP_full"></a>   
See [VERP](#VERP).

**verification**<a name="verification"></a>  
The process of confirming that you own an email address or a domain so that you can send email from or to it.

**VERP**<a name="VERP"></a>  
Variable Envelope Return Path. A way that email-sending applications can match [bounced](#bounce) email with the undeliverable address that caused the bounce by using a different [return path](#returnpath) for each recipient. VERP is typically used for mailing lists. With VERP, the recipient's email address is embedded in the address of the return path, which is where bounced email is returned. This makes it possible to automate the processing of bounced email without having to open the bounce messages, which might vary in content.

**versioning**<a name="versioning"></a>  
Every object in [Amazon S3](#amazons3) has a key and a version ID. Objects with the same key, but different version IDs can be stored in the same [bucket](#bucket). Versioning is enabled at the bucket layer using PUT Bucket versioning. 

**VGW**<a name="VGW"></a>   
See [virtual private gateway (VGW)](#VPNgateway).

**virtual private gateway (VGW)**<a name="VPNgateway"></a>  
The Amazon side of a [VPN connection](#VPNconnection) that maintains connectivity. The internal interfaces of the virtual private gateway connect to your [Amazon VPC](#vpc) through the VPN attachment. The external interfaces connect to the VPN connection, which leads to the [customer gateway](#customergateway).

**virtualization**<a name="virtualization"></a>  
Allows multiple guest virtual machines (VM) to run on a host operating system. Guest VMs can run on one or more levels above the host hardware, depending on the type of virtualization.    
See also [PV virtualization](#PV). 
See also [HVM virtualization](#HVM).

**visibility timeout**<a name="visibilitytimeout"></a>  
The period of time that a message is invisible to the rest of your application after an application component gets it from the queue. During the visibility timeout, the component that received the message usually processes it, and then deletes it from the queue. This prevents multiple components from processing the same message.

**VM Import/Export**<a name="VMimport"></a>  
VM Import/Export is a service for importing virtual machine (VM) images from your existing virtualization environment to Amazon EC2 and then exporting them back.   
See also [https://aws.amazon.com/ec2/vm-import](https://aws.amazon.com/ec2/vm-import/).

**volume**<a name="volume"></a>  
A fixed amount of storage on an [instance](#instance). You can share volume data between more than one [container](#container) and persist the data on the [container instance](#container_instance) when the containers are no longer running. 

**Amazon VPC**<a name="vpc"></a>  
Amazon Virtual Private Cloud is a web service for provisioning a logically isolated section of the AWS Cloud virtual network that you define. You control your virtual networking environment by selecting your own IP address range, creating [subnets](#subnet) and configuring [route tables](#routetable) and network gateways.   
See also [https://aws.amazon.com/vpc](https://aws.amazon.com/vpc/).

**VPC endpoint**<a name="VPCendpoint"></a>  
A feature that you can use to create a private connection between your [Amazon VPC](#vpc) and another AWS service without requiring access over the internet, through a [NAT](#nat) instance, a [VPN connection](#VPNconnection), or [Direct Connect](#AWSDirectConnect). 

**VPG**<a name="VPG"></a>   
See [virtual private gateway (VGW)](#VPNgateway).

**Site-to-Site VPN**<a name="vpn"></a>  
AWS Virtual Private Network provides functionality that establishes encrypted connections between your network or device, and AWS. Site-to-Site VPN is comprised of two services: [AWS Client VPN](#client-vpn) and [AWS Site-to-Site VPN](#site-to-site-vpn).   
See also [https://aws.amazon.com/vpn](https://aws.amazon.com/vpn/).

**Site-to-Site VPN CloudHub**<a name="vpn_cloudhub"></a>  
Site-to-Site VPN CloudHub is a feature that enables secure communication between branch offices using a simple hub-and-spoke model, with or without a VPN.

**VPN connection**<a name="VPNconnection"></a>  
[Amazon Web Services (AWS)](#amazonwebservices): The IPsec connection that's between a [Amazon VPC](#vpc) and some other network, such as a corporate data center, home network, or colocation facility.

### W<a name="W"></a>

 [Numbers and symbols](#numbers) \| [A](#A) \| [B](#B) \| [C](#C) \| [D](#D) \| [E](#E) \| [F](#F) \| [G](#G) \| [H](#H) \| [I](#I) \| [J](#J) \| [K](#K) \| [L](#L) \| [M](#M) \| [N](#N) \| [O](#O) \| [P](#P) \| [Q](#Q) \| [R](#R) \| [S](#S) \| [T](#T) \| [U](#U) \| [V](#V) \| [W](#W) \| [X, Y, Z](#XYZ) 

**AWS WAF**<a name="awswaf"></a>  
AWS WAF is a web application firewall service that controls access to content by allowing or blocking web requests based on criteria that you specify. For example, you can filter access based on the header values or the IP addresses that the requests originate from. AWS WAF helps protect web applications from common web exploits that could affect application availability, compromise security, or consume excessive resources.   
See also [https://aws.amazon.com/waf/](https://aws.amazon.com/waf/).

**Amazon WAM**<a name="wam"></a>  
Amazon WorkSpaces Application Manager (Amazon WAM) is a web service for deploying and managing applications for WorkSpaces. Amazon WAM accelerates software deployment, upgrades, patching, and retirement by packaging Windows desktop applications into virtualized application containers.    
See also [https://aws.amazon.com/workspaces/applicationmanager](https://aws.amazon.com/workspaces/applicationmanager).

**warm standby**<a name="warmstandby"></a>  
An [active-passive](#activepassive) disaster recovery strategy in which a workload is scaled down in the passive standby Region, but is otherwise fully functional. This is not an Amazon EC2 Auto Scaling term, but an industry-standard resilience term.    
See also [back up and restore](#backupand)[hot standby](#hotstandby)[pilot light](#pilotlight).

**AWS Wavelength**<a name="wavelength"></a>  
AWS Wavelength is a service by AWS that embeds AWS compute and storage services within 5G networks to provide mobile edge computing infrastructure. Use AWS Wavelength to develop, deploy, and scale ultra-low-latency applications to mobile devices and end users.   
See also [https://aws.amazon.com/wavelength](https://aws.amazon.com/wavelength/).

**web access control list (web ACL)**<a name="webacl"></a>  
[AWS WAF](#awswaf): A set of rules that defines the conditions that AWS WAF searches for in web requests to an AWS [resource](#resource), such as a [Amazon CloudFront](#AmazonCF) distribution. A web access control list (web ACL) specifies if to allow, block, or count the requests.

**Web Services Description Language**<a name="WSDL_full"></a>   
See [WSDL](#WSDL).

**WorkDocs**<a name="workdocs"></a>  
Amazon WorkDocs is a managed, secure enterprise document storage and sharing service with administrative controls and feedback capabilities.   
See also [https://aws.amazon.com/workdocs/](https://aws.amazon.com/workdocs/).

**Amazon WorkLink**<a name="worklink"></a>  
Amazon WorkLink is a cloud-based service that provides secure access to internal websites and web apps from mobile devices.   
See also [https://aws.amazon.com/worklink/](https://aws.amazon.com/worklink/).

**WorkMail**<a name="workmail"></a>  
Amazon WorkMail is a managed, secure business email and calendar service with support for existing desktop and mobile email clients.    
See also [https://aws.amazon.com/workmail/](https://aws.amazon.com/workmail/).

**WorkSpaces**<a name="workspaces"></a>  
Amazon WorkSpaces is a managed, secure desktop computing service for provisioning cloud-based desktops and providing users access to documents, applications, and [resources](#resource) from supported devices.   
See also [https://aws.amazon.com/workspaces/](https://aws.amazon.com/workspaces/).

**WSDL**<a name="WSDL"></a>  
Web Services Description Language. A language that's used to describe the actions that a web service can perform, along with the syntax of action requests and responses.    
See also [REST](#REST). 
See also [SOAP](#SOAP).

### X, Y, Z<a name="XYZ"></a>

**X.509 certificate**<a name="X509"></a>  
A digital document that uses the X.509 public key infrastructure (PKI) standard to verify that a public key belongs to the entity that's described in the [certificate](#certificate).

**X-Ray**<a name="xray"></a>  
AWS X-Ray is a web service that collects data about requests that your application serves. X-Ray provides tools that you can use to view, filter, and gain insights into that data to identify issues and opportunities for optimization.   
See also [https://aws.amazon.com/xray/](https://aws.amazon.com/xray/).

**yobibyte (YiB)**<a name="yobibyte"></a>  
A contraction of yotta binary byte. A yobibyte (YiB) is 2^80 or 1,208,925,819,614,629,174,706,176 bytes. A yottabyte (YB) is 10^24 or 1,000,000,000,000,000,000,000,000 bytes.

**zebibyte (ZiB)**<a name="zebibyte"></a>  
A contraction of zetta binary byte. A zebibyte (ZiB) is 2^70 or 1,180,591,620,717,411,303,424 bytes. A zettabyte (ZB) is 10^21 or 1,000,000,000,000,000,000,000 bytes. 1,024 ZiB is a [yobibyte (YiB)](#yobibyte).

**zone awareness**<a name="zoneawareness"></a>  
[OpenSearch Service](#AmazonElasticsearchService): A configuration that distributes nodes in a cluster across two [Availability Zones](#AZ) in the same Region. Zone awareness helps to prevent data loss and minimizes downtime if a node and data center fails. If you enable zone awareness, you must have an even number of data instances in the instance count, and you also must use the Amazon OpenSearch Service Configuration API to replicate your data for your OpenSearch cluster.