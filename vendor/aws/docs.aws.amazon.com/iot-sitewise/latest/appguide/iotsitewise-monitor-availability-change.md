

The SiteWise Monitor feature is not available to new customers. Existing customers can continue to use the service as normal. For more information, see [SiteWise Monitor availability change](https://docs.aws.amazon.com/iot-sitewise/latest/appguide/iotsitewise-monitor-availability-change.html)

# AWS IoT SiteWise Monitor availability change
<a name="iotsitewise-monitor-availability-change"></a>

For capabilities similar to the AWS IoT SiteWise Monitor feature, explore the SiteWise plugin for Amazon Managed Grafana (AMG).

This guide describes migration options for AWS IoT SiteWise Monitor customers.

SiteWise Monitor is a feature of AWS IoT SiteWise that enables you to create web portals for visualizing and sharing your AWS IoT SiteWise data with members of your organization. AWS IoT SiteWise continues to be available, but the Monitor feature is entering maintenance mode.

**Note**  
AWS IoT SiteWise and Amazon Managed Grafana continue to be fully supported. Only the AWS IoT SiteWise Monitor feature, the visualization layer, is entering maintenance mode. Your AWS IoT SiteWise and Amazon Managed Grafana data are not affected.

## Migration options
<a name="iotsitewise-monitor-availability-change-migration"></a>

We recommend migrating your AWS IoT SiteWise Monitor dashboards and visualizations to Amazon Managed Grafana.

**Amazon Managed Grafana**  
Amazon Managed Grafana is a fully managed service for Grafana, a popular open-source analytics platform that enables you to query, visualize, and alert on your metrics, logs, and traces.  
To get started with Amazon Managed Grafana, see [What is Amazon Managed Grafana?](https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html) the Amazon Managed Grafana User Guide.

**Other options**  
+ Grafana Cloud – A fully managed Grafana® instance offered by Grafana Labs. For more information, see the [Grafana Labs](https://grafana.com/) website.
+ Open-source Grafana (self-hosted) – Create local real-time monitoring dashboards for your industrial data at the Edge. For more information, see [Process and visualize data with SiteWise Edge and open-source tools](https://docs.aws.amazon.com/iot-sitewise/latest/userguide/open-source-edge-integrations.html)

## Limitations
<a name="iotsitewise-monitor-availability-change-limitations"></a>

Consider these limitations when migrating to Amazon Managed Grafana:
+ Amazon Managed Grafana lacks asset-level access control
+ Amazon Managed Grafana doesn't support AWS IoT SiteWise Assistant

## Comparing architectures
<a name="w2aab7c19"></a>

AWS IoT SiteWise Monitor provides web portals that visualize industrial data through projects, dashboards, and user management, integrating directly with AWS IoT SiteWise assets and data. Amazon Managed Grafana maintains the core AWS IoT SiteWise asset and data management while replacing only the visualization layer. Amazon Managed Grafana offers extensive visualization capabilities through its AWS IoT SiteWise plugin.


**Feature Comparison**  

| Feature | AWS IoT SiteWise Monitor | Amazon Managed Grafana | 
| --- | --- | --- | 
| Data visualization | Built-in dashboards with industrial-focused components | Extensive visualization library with SiteWise plugin | 
| User management | IAM Identity Center integration with portal-specific access | IAM Identity Center integration with workspace-level controls | 
| Asset navigation | Hierarchical asset browser with direct SiteWise integration | Asset navigation through SiteWise plugin | 
| AI capabilities | Built-in AWS IoT SiteWise Assistant integration | Not supported | 
| Dashboard creation | Project-based organization with industrial templates | Flexible dashboard creation with extensive customization. Folder organization similar to SiteWise Monitor. | 
| Real-time updates | Direct SiteWise data streaming | SiteWise data streaming through plugin | 
| Security | AWS-managed portal security | AWS-managed workspace security with additional controls | 

## Migration procedure from SiteWise Monitor to Amazon Managed Grafana
<a name="iotsitewise-monitor-availability-change-migration-procedure"></a>

### Step 1: Export Monitor-related resources
<a name="iotsitewise-monitor-availability-change-migration-procedure_export"></a>

Export all of your resources for SiteWise Monitor to preserve your settings.

**To export your resources**

1. List all portals and projects. For more information, see [ListPortals](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_ListProjects.html) and [ListProjects](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_ListProjects.html) in the *AWS IoT SiteWise API Reference*.

1. List all dashboard configurations and visualizations. For more information, see [ListDashboards](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_ListDashboards.html) in the *AWS IoT SiteWise API Reference*.

1. Record access permissions and user roles. For more information, see [Identity and access management for AWS IoT SiteWise](https://docs.aws.amazon.com/iot-sitewise/latest/userguide/security-iam.html) in the *AWS IoT SiteWise User Guide*.

### Step 2: Set up Amazon Managed Grafana for AWS IoT SiteWise
<a name="iotsitewise-monitor-availability-change-migration-procedure_gra-setup"></a>

1. Follow the Amazon Managed Grafana getting started guide to create a workspace. For more information, see [Create your first workspace](https://docs.aws.amazon.com/grafana/latest/userguide/getting-started-with-AMG.html#AMG-getting-started-workspace-create) in the *Amazon Managed Grafana User Guide*.
**Note**  
Select **Service managed** when setting up your **Permission type**.

1. Set up your data source configuration for AWS IoT SiteWise. For more information, see [Use AWS data source configuration to add AWS IoT SiteWise as a data source](https://docs.aws.amazon.com/grafana/latest/userguide/IoTSiteWise-adding-AWS-config.html) in the *Amazon Managed Grafana User Guide*

1. Create a dashboard in Amazon Managed Grafana for your AWS IoT SiteWise data. For more information, see [Create your first dashboard](https://docs.aws.amazon.com/grafana/latest/userguide/getting-started-grafanaui.html) in the *Amazon Managed Grafana User Guide*.

   You can use your existing SiteWise Monitor dashboard's portal layout and components as a model to create a similarly structured dashboard in Amazon Managed Grafana.

1. Set up workspace permissions in Amazon Managed Grafana. For more information, see [Manage user and group access to Amazon Managed Grafana workspaces](https://docs.aws.amazon.com/grafana/latest/userguide/AMG-manage-users-and-groups-AMG.html).

### Step 3: Verification and cleanup
<a name="iotsitewise-monitor-availability-change-migration-procedure_validate"></a>

1. Test that you see all of your expected data in Amazon Managed Grafana. For example, asset properties, updates, aggregated measurements, and your asset hierarchy navigation.

1. After you've confirmed that your data is in Amazon Managed Grafana, delete your SiteWise Monitor resources in the following order:

   1. Delete projects within portals. For more information, see [DeleteProject](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_DeleteProject.html) in the *AWS IoT SiteWise API Reference*.

   1. Delete all access policies of the projects. For more information, see [DeleteAccessPolicy](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_DeleteAccessPolicy.html) in the *AWS IoT SiteWise API Reference*.

   1. Delete all dashboards of the projects. For more information, see [DeleteDashboard](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_DeleteDashboard.html) in the *AWS IoT SiteWise API Reference*.

   1. Delete all access policies of the portals. For more information, see [DeleteAccessPolicy](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_DeleteAccessPolicy.html) in the *AWS IoT SiteWise API Reference*.

   1. Delete the portals. For more information, see [DeletePortal](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_DeletePortal.html) in the *AWS IoT SiteWise API Reference*.
**Important**  
Maintain your AWS IoT SiteWise assets and data ingestion configuration settings because you need them for other aspects of the AWS IoT SiteWise service.

## Frequently asked questions
<a name="iotsitewise-monitor-availability-change-faq"></a>

### Can I migrate gradually or do I need to migrate all at once?
<a name="iotsitewise-monitor-availability-change-faq-gradual"></a>

You can migrate gradually. SiteWise Monitor and Amazon Managed Grafana can run simultaneously, allowing you to migrate dashboards and users in phases. Both services access the same underlying AWS IoT SiteWise data.

### When do I need to migrate by?
<a name="iotsitewise-monitor-availability-change-faq-timeline"></a>

SiteWise Monitor remains available to existing customers in maintenance mode. You'll receive advance notice if any changes to availability are planned. Monitor AWS service announcements and your account notifications for updates.

### Will there be downtime during migration?
<a name="iotsitewise-monitor-availability-change-faq-downtime"></a>

No downtime is required. Amazon Managed Grafana is a separate service that connects to your existing AWS IoT SiteWise assets and data. Your AWS IoT SiteWise data ingestion and storage continue uninterrupted during migration.

### What migration assistance is available?
<a name="iotsitewise-monitor-availability-change-faq-assistance"></a>

Support can help with migration questions. For complex migrations, consider Professional Services. For more information, see [Professional Services](https://aws.amazon.com/professional-services/).

### How much does Amazon Managed Grafana cost compared to SiteWise Monitor?
<a name="iotsitewise-monitor-availability-change-faq-cost"></a>

Amazon Managed Grafana pricing is based on active users and data source queries. For current pricing information, see [Amazon Managed Grafana pricing](https://aws.amazon.com/grafana/pricing/). Use the [pricing calculator](https://calculator.aws/) to estimate costs for your specific usage.

## Additional resources
<a name="iotsitewise-monitor-availability-change-resources"></a>
+ [Amazon Managed Grafana User Guide](https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html)
+ [AWS IoT SiteWise API Reference](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/Welcome.html)
+ [AWS IoT SiteWise User Guide](https://docs.aws.amazon.com/iot-sitewise/latest/userguide/what-is-sitewise.html)