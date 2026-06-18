

AWS Migration Hub is no longer open to new customers as of November 7, 2025. For capabilities similar to AWS Migration Hub, explore [AWS Transform](https://aws.amazon.com/transform).

# What is AWS Migration Hub Orchestrator?
<a name="what-is-migrationhub-orchestrator"></a>

AWS Migration Hub Orchestrator simplifies and automates the migration of servers and enterprise applications to AWS. You can get started quickly through the predefined workflow templates which are built leveraging the migration experience of AWS which also adhere to best practices. You can also use Migration Hub Orchestrator to automate the error-prone manual tasks involved in the migration process and orchestrate the related migration tools from start to finish in the Migration Hub Orchestrator console.

Migration Hub Orchestrator offers templates to create a migration workflow that can be customized to fit your unique migration requirements. Migration Hub Orchestrator automates the steps in your chosen workflow and displays the status of migration.

Migration Hub Orchestrator currently supports the following use cases for migration:
+ Importing virtual machine (VM) images
+ Migrating SAP NetWeaver applications and HANA databases
+ Rehosting applications on Amazon EC2
+ Rehosting SQL Server databases to Amazon EC2 using SQL Server's native backup and restore
+ Replatforming SQL Server databases to Amazon RDS
+ Replatforming applications to Amazon ECS on AWS Fargate.

You can use a predefined workflow template to orchestrate the validation of the source environment for migration readiness, provision your target environment, migrate databases and applications, perform post-migration validation, and cutover to AWS. 

You can access Migration Hub Orchestrator from [https://console.aws.amazon.com/migrationhub/orchestrator/]( https://console.aws.amazon.com/migrationhub/orchestrator/) or from the AWS Command Line Interface. For more information about the Migration Hub Orchestrator APIs and how to use the AWS Command Line Interface (AWS CLI), see the [AWS Migration Hub Orchestrator API Reference](https://docs.aws.amazon.com/migrationhub-orchestrator/latest/APIReference/Welcome.html) and the [AWS Migration Hub Orchestrator CLI Command Reference](https://docs.aws.amazon.com/cli/latest/reference/migrationhuborchestrator/).

## Are you a first-time user of Migration Hub Orchestrator?
<a name="related-services-migrationhub-orchestrator-new-user"></a>

If you are a first-time user of Migration Hub, we recommend that you begin by reading the following sections:
+ **Setting up** – The [Setting up to use Migration Hub Orchestrator](setting-up.md) section details what you need to set up before using Migration Hub Orchestrator.
+ **Templates** – The [Migration Hub Orchestrator templates](templates.md) section details the templates offered by Migration Hub Orchestrator for different migration use cases.
+ **Workflows** – The [Migration workflows for Migration Hub Orchestrator](migration-workflows.md) section details how workflows function in Migration Hub Orchestrator.

## Related services
<a name="related-services-migrationhub-orchestrator"></a>

If you are new to Migration Hub, you can refer to the following guides.
+ [Application Discovery Service](https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html)
+ [AWS App2Container](https://docs.aws.amazon.com/app2container/latest/UserGuide/what-is-a2c.html)
+ [AWS Application Migration Service](https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html)
+ [AWS Launch Wizard for SAP](https://docs.aws.amazon.com/launchwizard/latest/userguide/what-is-launch-wizard-sap.html)
+ [AWS Launch Wizard for SQL Server](https://docs.aws.amazon.com/launchwizard/latest/userguide/what-is-launch-wizard.html)
+ [VM Import/Export](https://docs.aws.amazon.com/vm-import/latest/userguide/what-is-vmimport.html)

## Pricing
<a name="pricing-migrationhub-orchestrator"></a>

Migration Hub Orchestrator is available to you at no additional cost. You only pay for the AWS resources that you provision for migrations. For more information, see [AWS Migration Hub pricing](https://aws.amazon.com/migration-hub/pricing).