

# What is AWS Compute Optimizer?
<a name="what-is-compute-optimizer"></a>

AWS Compute Optimizer is a service that analyzes your AWS resources' configuration and utilization metrics to provide you with rightsizing recommendations and identify idle resources. It reports whether your resources are optimal, and generates optimization recommendations to reduce the cost and improve the performance of your workloads. Compute Optimizer also provides graphs showing recent utilization metric history data, as well as projected utilization for recommendations, which you can use to evaluate which recommendation provides the best price-performance trade-off. The analysis and visualization of your usage patterns can help you decide when to move or resize your running resources, stop or delete idle resources, and still meet your performance and capacity requirements.

Compute Optimizer provides a [console experience](https://console.aws.amazon.com/compute-optimizer), and a [set of APIs](https://docs.aws.amazon.com/compute-optimizer/latest/APIReference/Welcome.html) that allows you to view the findings of the analysis and recommendations for your resources across multiple AWS Regions. You can also view findings and recommendations across multiple accounts, if you opt in the management account of an organization. The findings from the service are also reported in the consoles of the supported services, such as the Amazon EC2 console.

## Supported resources
<a name="intro-supported-resources"></a>

Compute Optimizer generates recommendations for the following resources:
+ Amazon Elastic Compute Cloud (Amazon EC2) instances
+ Amazon EC2 Auto Scaling groups
+ Amazon Elastic Block Store (Amazon EBS) volumes
+ AWS Lambda functions
+ Amazon Elastic Container Service (Amazon ECS) services on AWS Fargate 
+ Commercial software licenses
+ Amazon Aurora and Amazon Relational Database Service (Amazon RDS) databases
+ Amazon NAT Gateway
+ Amazon DynamoDB
+ Amazon ElastiCache
+ Amazon MemoryDB
+ Amazon DocumentDB
+ Amazon WorkSpaces
+ Amazon SageMaker

For Compute Optimizer to generate recommendations for these resources, they must meet a specific set of requirements, and must have accumulated sufficient metric data. For more information, see [Resource requirements](requirements.md).

## Opting in
<a name="intro-opting-in"></a>

You must opt in to have Compute Optimizer analyze your AWS resources. The service supports standalone AWS accounts, member accounts of an organization, and the management account of an organization. For more information, see [Opting in to AWS Compute Optimizer](account-opt-in.md).

## Analyzing metrics
<a name="intro-metrics-analyzed"></a>

After you opt in, Compute Optimizer begins analyzing the specifications and the utilization metrics of your resources from Amazon CloudWatch for the last 14 days. For example, for Amazon EC2 instances, Compute Optimizer analyzes the vCPUs, memory, storage, and other specifications. It also analyzes the CPU utilization, network in and out, disk read and write, and other utilization metrics of currently running instances. For more information, see [Metrics analyzed by AWS Compute Optimizer](metrics.md).

## Enhancing recommendations
<a name="intro-enhanced-infrastructure-metrics"></a>

After you opt in, you can enhance your recommendations by activating recommendation preferences, such as the enhanced infrastructure metrics (paid feature). This feature extends the metrics analysis lookback period for selected resources to 93 days (compared to the 14-day default). For more information, see [Enhanced infrastructure metrics](enhanced-infrastructure-metrics.md).

You can also customize your recommendations using rightsizing recommendation preferences, which allow you to adjust CPU and memory utilization headroom and thresholds, configure specific lookback periods, and set instance family preferences at the organization, account, or regional level. For more information, see [Rightsizing recommendation preferences](rightsizing-preferences.md).

Additionally, Compute Optimizer can ingest and analyze external EC2 memory utilization metrics from observability products like Datadog and Dynatrace to generate more accurate EC2 rightsizing recommendations. For more information, see [External metrics ingestion](external-metrics-ingestion.md).

## Viewing findings and recommendations
<a name="intro-analyzing-data"></a>

Optimization findings for your resources are displayed on the Compute Optimizer dashboard. For more information, see [Using the AWS Compute Optimizer dashboard](viewing-dashboard.md).

The top optimization recommendations for each of your resources are listed on the recommendations page. The top 3 optimization recommendations and utilization graphs for a specific resource are listed on the resource details page. For more information, see [Viewing resource recommendations](viewing-recommendations.md).

Export your optimization recommendations to record them over time, and share the data with others. For more information, see [Exporting AWS Compute Optimizer recommendations](exporting-recommendations.md).

## Availability
<a name="intro-availability"></a>

To view the currently supported AWS Regions and endpoints for Compute Optimizer, see [Compute Optimizer Endpoints and Quotas](https://docs.aws.amazon.com/general/latest/gr/compute-optimizer.html) in the *AWS General Reference*.