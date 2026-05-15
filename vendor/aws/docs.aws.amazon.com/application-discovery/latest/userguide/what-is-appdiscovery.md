

AWS Application Discovery Service is no longer open to new customers. Alternatively, use AWS Transform which provides similar capabilities. For more information, see [AWS Application Discovery Service availability change](https://docs.aws.amazon.com/application-discovery/latest/userguide/application-discovery-service-availability-change.html).

# What is AWS Application Discovery Service?
<a name="what-is-appdiscovery"></a>

AWS Application Discovery Service helps you plan your migration to the AWS cloud by collecting usage and configuration data about your on-premises servers and databases. Application Discovery Service is integrated with AWS Migration Hub and AWS Database Migration Service Fleet Advisor. Migration Hub simplifies your migration tracking as it aggregates your migration status information into a single console. You can view the discovered servers, group them into applications, and then track the migration status of each application from the Migration Hub console in your home Region. You can use DMS Fleet Advisor to assess migrations options for database workloads.

All discovered data is stored in your AWS Migration Hub home Region. Therefore, you must set your home Region in the Migration Hub console or with CLI commands before performing any discovery and migration activities. Your data can be exported for analysis in Microsoft Excel or AWS analysis tools such as Amazon Athena and Amazon Quick.

Using Application Discovery Service APIs, you can export the system performance and utilization data for your discovered servers. Input this data into your cost model to compute the cost of running those servers in AWS. Additionally, you can export data about the network connections that exist between servers. This information helps you determine the network dependencies between servers and group them into applications for migration planning.

**Note**  
Your home Region must be set in AWS Migration Hub before you begin the process of discovery, because your data will be stored in your home Region. For more information about working with a home Region, see [Home Region](https://docs.aws.amazon.com//migrationhub/latest/ug/home-region.html).

Application Discovery Service offers three ways of performing discovery and collecting data about your on-premises servers:
+ **Agentless discovery** can be performed by deploying the Application Discovery Service Agentless Collector (Agentless Collector) (OVA file) through your VMware vCenter. After Agentless Collector is configured, it identifies virtual machines (VMs) and hosts associated with vCenter. Agentless Collector collects the following static configuration data: Server hostnames, IP addresses, MAC addresses, disk resource allocations, database engine versions, and database schemas. Additionally, it collects the utilization data for each VM and database providing the average and peak utilization for metrics such as CPU, RAM, and Disk I/O.
+ **Agent-based discovery** can be performed by deploying the AWS Application Discovery Agent (Discovery Agent) on each of your VMs and physical servers. The agent installer is available for Windows and Linux operating systems. It collects static configuration data, detailed time-series system-performance information, inbound and outbound network connections, and processes that are running.
+ **File-based import** allows you to import details of your on-premises environment directly into Migration Hub without using the Agentless Collector or Discovery Agent, so you can perform migration assessment and planning directly from your imported data. The data ingested is dependent on the data provided.

Application Discovery Service integrates with application discovery solutions from AWS Partner Network (APN) partners. These third-party solutions can help you import details about your on-premises environment directly into Migration Hub, without using any agentless collector or discovery agent. Third-party application discovery tools can query AWS Application Discovery Service, and they can write to the Application Discovery Service database using the public API. In this way, you can import data into Migration Hub and view it, so that you can associate applications with servers and track migrations. 

## VMware Discovery
<a name="more-discovery"></a>

If you have virtual machines (VMs) that are running in the VMware vCenter environment, you can use the Agentless Collector to collect system information without having to install an agent on each VM. Instead, you load this on-premises appliance into vCenter and allow it to discover all of its hosts and VMs. 

Agentless Collector captures system performance information and resource utilization for each VM running in the vCenter, regardless of what operating system is in use. However, it cannot “look inside” each of the VMs, and as such, cannot figure out what processes are running on each VM nor what network connections exist. Therefore, if you need this level of detail and want to take a closer look at some of your existing VMs in order to assist in planning your migration, you can install the Discovery Agent on an as-needed basis.

Also, for VMs hosted on VMware, you can use both the Agentless Collector and Discovery Agent to perform discovery simultaneously. For details regarding the exact types of data each discovery tool will collect, see [Using the VMware vCenter Agentless Collector data collection module](agentless-collector-gs-data-collection-vcenter.md).

## Database discovery
<a name="database-discovery"></a>

If you have database and analytics servers in your on-premises environment, then you can use the Agentless Collector to discover and inventory these servers. You can then collect performance metrics for each database server without the need to install Agentless Collector on each computer in your environment.

The Agentless Collector database and analytics data collection module captures metadata and performance metrics that provide insight into your data infrastructure. The database and analytics data collection module uses LDAP in Microsoft Active Directory to gather information about the OS, database, and analytics servers in your network. Then, the data collection module periodically runs queries to collect actual utilization metrics of CPU, memory, and disk capacity for the databases and analytics servers. For details regarding the collected metrics, see [Data collected by the database and analytics module](agentless-collector-data-collected-database-analytics.md).

After Agentless Collector completes data collection from your environment, you can use the AWS DMS console for further analysis and for planning your migration. For example, to choose an optimal migration target in the AWS Cloud, you can generate target recommendations for your source databases. For more information, see [Using the database and analytics data collection module](agentless-collector-gs-database-analytics-collection.md).

## Compare Agentless Collector and Discovery Agent
<a name="compare-tools"></a>

The following table provides a quick comparison of the data collection methods that Application Discovery Service supports.


|  | Agentless Collector | Discovery Agent | Migration Hub template | RVTools export | 
| --- |--- |--- |--- |--- |
| **Supported server types** | 
| --- |
| VMware virtual machine | Yes | Yes | Yes | Yes | 
| Physical server | No | Yes | Yes | Yes | 
| **Deployment** | 
| --- |
| Per server | No | Yes | N/A | No | 
| Per vCenter | Yes | No | N/A | Yes | 
| Per data center on the same network | No | No | N/A | No | 
| **Collected data** | 
| --- |
| Server profile (static configuration) data | Yes | Yes | Yes | Yes | 
| Server utilization metrics from Hypervisor (CPU, RAM, etc.) | Yes | Yes | Yes | No | 
| Server utilization metrics from server (CPU, RAM, etc.) | Yes | Yes | Yes | No | 
| Server network connections (TCP only) | Yes | Yes | No | No | 
| Running processes | No | Yes | No | No | 
| Collection interval | -60 minutes | -15 seconds | Single snapshot | Single snapshot | 
| **Server data use cases** | 
| --- |
| View server data in Migration Hub | Yes | Yes | Profile only | No | 
| Generate Amazon EC2 recommendation based on server profile | Yes | Yes | Yes | Yes | 
| Generate Amazon EC2 recommendation based on utilization data | Yes | Yes | Yes | No | 
| Export of latest utilization snapshot data | Yes | Yes | Yes | No | 
| Export of time series utilization data | No | Yes | No | No | 
| **Network data use cases** | 
| --- |
| Visualization in Migration Hub | Yes | Yes | No | No | 
| Export to Amazon Athena for further exploration | No | Yes | No | No | 
| Export to CSV file | No | Yes | No | No | 
| **Database use cases** | 
| --- |
| Database server profile (static configuration) data | Yes | No | No | No | 
| Supported database engines | Oracle, SQL Server, MySQL, PostgreSQL | None | None | None | 
| Database schema complexity and duplicates | Yes | No | No | No | 
| Database schema objects | Yes | No | No | No | 
| **Platform support** | 
| --- |
| Supported operating systems | Any OS running in VMware center v5.5 or newer versions | Any Linux or Windows server | Any Linux or Windows server | Any Linux server, Windows server, or VMware v5.5 or newer versions | 

## Assumptions
<a name="assumptions"></a>

To use Application Discovery Service, the following is assumed:
+ You have signed up for AWS. For more information, see [Setting up Application Discovery Service](setting-up.md).
+ You have selected a Migration Hub home Region. For more information, see [the documentation regarding home Regions](https://docs.aws.amazon.com//migrationhub/latest/ug/home-region.html).

Here's what to expect:
+ The Migration Hub home Region is the only Region where Application Discovery Service stores your discovery and planning data.
+ Discovery agents, connectors, and imports can be used in your selected Migration Hub home Region only.
+ For a list of AWS Regions where you can use Application Discovery Service, see the [Amazon Web Services General Reference](https://docs.aws.amazon.com/general/latest/gr/rande.html#migrationhub-region).