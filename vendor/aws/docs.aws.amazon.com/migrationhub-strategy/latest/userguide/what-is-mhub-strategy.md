

AWS Migration Hub is no longer open to new customers as of November 7, 2025. For capabilities similar to AWS Migration Hub, explore [AWS Transform](https://aws.amazon.com/transform).

# What is Migration Hub Strategy Recommendations?
<a name="what-is-mhub-strategy"></a>

Migration Hub Strategy Recommendations helps you plan migration and modernization initiatives by offering migration and modernization strategy recommendations for viable transformation paths for your applications. 

Strategy Recommendations can analyze your server inventory, runtime environment, and application binaries for Microsoft IIS and Java Tomcat and Jboss applications to generate anti-pattern reports. In addition, you can configure your source code to allow Strategy Recommendations to perform source code and database analysis of all of your applications. Strategy Recommendations compares this analysis with your business goals, and the transformation preferences of the applications and databases that you provided to recommend:
+ The most effective migration strategy for each of your applications.
+ Migration and modernization tools or services that you can use.
+ Application incompatibilities and anti-patterns to resolve for a specific option.

Migration Hub Strategy Recommendations recommends migration and modernization strategies for rehosting, replatforming, and refactoring with associated deployment destinations, tools, and programs. For information about rehosting, replatforming, and refactoring, see [Migration terms - 7 Rs](https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-retiring-applications/apg-gloss.html#apg.migration.terms) in the *AWS Prescriptive Guidance* glossary.

Strategy Recommendations might recommend straightforward options, such as rehosting on Amazon Elastic Compute Cloud (Amazon EC2) using AWS Application Migration Service (AWS MGN). More optimized recommendations might include replatforming to containers using AWS App2Container, or refactoring to open source technologies such as .NET Core and PostgreSQL.

## Are you a first-time Strategy Recommendations customer?
<a name="first-time-user"></a>

If this is your first time using Strategy Recommendations, we recommend that you begin by reading the following sections:
+ [Strategy Recommendations overview](overview.md)
+ [Setting up Strategy Recommendations](setting-up.md)
+ [Getting started with Strategy Recommendations](getting-started.md)

## Related services
<a name="related-services"></a>
+ [AWS Migration Hub](https://docs.aws.amazon.com/migrationhub/) – You use the AWS Migration Hub console to access the Migration Hub Strategy Recommendations console. It also displays information about the servers that you are collecting data from.
+ [AWS Application Discovery Service](https://docs.aws.amazon.com/application-discovery/) – You use Application Discovery Service to collect data about your servers and applications in the AWS Migration Hub console before using Strategy Recommendations.
+ [AWS Application Migration Service](https://aws.amazon.com/application-migration-service/) – AWS Application Migration Service is the primary migration service recommended for lift-and-shift migrations to AWS.
+ [AWS Database Migration Service](https://aws.amazon.com/dms/) – AWS Database Migration Service is a web service you can use to migrate data from your database that is on-premises, on an Amazon Relational Database Service (Amazon RDS) DB instance, or in a database on an Amazon Elastic Compute Cloud (Amazon EC2) instance to a database on an AWS service.
+ [AWS App2Container](https://aws.amazon.com/app2container/) – AWS App2Container (A2C) is a command line tool for modernizing .NET and Java applications into containerized applications.
+ [Porting Assistant for .NET](https://docs.aws.amazon.com/portingassistant/) – Use for .NET source code analysis. Porting Assistant for .NET is a compatibility scanner that reduces the manual effort required to port Microsoft .NET Framework applications to .NET Core. The Porting Assistant for .NET assesses the .NET application source code and identifies incompatible APIs and third-party packages.
+ [End-of-Support Migration Program for Windows Server](https://aws.amazon.com/emp-windows-server/) – End-of-Support Migration Program (EMP) for Windows Server includes tooling to migrate your legacy applications from Windows Server 2003, 2008, and 2008 R2 to newer, supported versions on AWS, without any refactoring.
+ [AWS Schema Conversion Tool](https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Installing.html) – You can use the AWS Schema Conversion Tool (AWS SCT) to convert your existing database schema from one database engine to another.
+ [Windows Web Application Migration Assistant](https://github.com/awslabs/windows-web-app-migration-assistant) – The Windows Web Application Migration Assistant for AWS Elastic Beanstalk is an interactive PowerShell utility that migrates ASP.NET and ASP.NET Core applications from on-premises IIS Windows servers to Elastic Beanstalk.
+  [Babelfish for Aurora PostgreSQL](https://aws.amazon.com/rds/aurora/babelfish/) – Babelfish for Aurora PostgreSQL is a new capability for the Amazon Aurora PostgreSQL-Compatible Edition that enables Aurora to understand commands from applications written for the Microsoft SQL server. 