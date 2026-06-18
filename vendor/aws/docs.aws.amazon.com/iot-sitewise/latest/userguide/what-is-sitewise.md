

# What is AWS IoT SiteWise?
<a name="what-is-sitewise"></a>

AWS IoT SiteWise is a managed service with which you can collect, store, organize and monitor data from industrial equipment at scale to help you make better, data-driven decisions. You can use AWS IoT SiteWise to monitor operations across facilities, quickly compute common industrial performance metrics, and create applications that analyze industrial equipment data to prevent costly equipment issues and reduce gaps in production. 

With AWS IoT SiteWise Monitor, your operational users can create web applications to view and analyze your industrial data in real-time. You can gain insights about your industrial operations by configuring and monitoring metrics such as *mean time between failures* and *overall equipment effectiveness (OEE)*.

AWS IoT SiteWise Edge is a component of AWS IoT SiteWise that allows collection, storage and processing of data on local devices. This is useful if you have limited access to the internet or need to keep your data private. 

**Topics**
+ [How AWS IoT SiteWise works](#how-sitewise-works)
+ [Use cases for AWS IoT SiteWise](#use-cases)
+ [Using this service with an AWS SDK](sdk-general-information-section.md)
+ [AWS IoT SiteWise concepts](concept-overview.md)

## How AWS IoT SiteWise works
<a name="how-sitewise-works"></a>

AWS IoT SiteWise offers a resource modeling framework that you can use to create representations of your industrial devices, processes, and facilities. The representations of your equipment and processes are called asset models in AWS IoT SiteWise. With asset models, you define the raw data to consume and how to process it into useful metrics. Build and visualize assets and models for your industrial operation in the [AWS IoT SiteWise console](https://console.aws.amazon.com/iotsitewise/). You can also configure asset models to collect and process data at the edge or in the AWS Cloud.

**Topics**
+ [Ingest industrial data](#how-it-works-ingest-data)
+ [Model assets to contextualize gathered data](#how-it-works-model-data)
+ [Analyze using queries, alarms, and predictions](#how-it-works-analyze)
+ [Visualize operations](#how-it-works-web-app)
+ [Store data](#how-it-works-store-data)
+ [Integrate with other services](#features-integrate-with-services)

### Ingest industrial data
<a name="how-it-works-ingest-data"></a>

Begin to use AWS IoT SiteWise by ingesting industrial data. Ingesting your data is done in one of several ways:
+ **Direct ingestion from on-site servers:** Utilize protocols like OPC UA to read data directly from on-site devices. Deploy the SiteWise Edge gateway software, compatible with AWS IoT Greengrass V2, on a wide range of platforms such as common industrial gateways or virtual servers. You can connect up to 100 OPC UA servers to a single AWS IoT SiteWise gateway. For more information, see [AWS IoT SiteWise Edge self-hosted gateway requirements](configure-gateway-ggv2.md).

   Note that protocols like Modbus TCP and Ethernet/IP (EIP) are supported through our partnership with Domatica in the context of AWS IoT Greengrass V2.
+ **Edge data processing with packs:** Enhance your SiteWise Edge gateway by adding packs to enable comprehensive edge capabilities. With SiteWise Edge, available on AWS IoT Greengrass V2, data processing is executed directly on-site before being securely transmitted to the AWS Cloud using an AWS IoT Greengrass stream. For more information, see [Set up an OPC UA source in SiteWise Edge](configure-opcua-source.md).
+ **Adaptive ingestion via Amazon S3 with bulk operations:** When working with large numbers of assets or asset models, use bulk operations to bulk import and export resources from Amazon S3 buckets. For more information, see [Bulk operations with assets and models](bulk-operations-assets-and-models.md).
+ **MQTT messages with AWS IoT Core Rules:** For devices connected to AWS IoT Core sending MQTT messages, employ the AWS IoT Core rules engine to direct those messages to AWS IoT SiteWise.If you have devices connected to AWS IoT Core sending [MQTT](https://docs.aws.amazon.com/iot/latest/developerguide/mqtt.html) messages, use the AWS IoT Core rules engine to route those messages to AWS IoT SiteWise. For more information, see [Ingest data to AWS IoT SiteWise using AWS IoT Core rules](iot-rules.md).
+ **AWS IoT SiteWise API:** Your applications at the Edge or in the cloud can directly send data to AWS IoT SiteWise. For more information, see [Ingest data with AWS IoT SiteWise APIs](ingest-api.md).

### Model assets to contextualize gathered data
<a name="how-it-works-model-data"></a>

After ingesting data, you can use the data to create virtual representations of your assets, processes, and facilities by building models of your physical operations. An asset, representing a device or process, transmits data streams to the AWS Cloud. Assets can also signify logical device groupings. Hierarchies are formed by associating assets to mirror complex operations. These hierarchies allow assets to access data from associated child assets. Assets are created from asset models. Asset models are declarative structures that standardize asset formats. Reuse components of assets for organization and maintainability of your models. For more information, see [Model industrial assets](industrial-asset-models.md).

With AWS IoT SiteWise, you can configure your assets to transform the incoming data into contextual metrics and transforms.
+ Transforms work when receiving equipment data.
+ Metrics are calculated at intervals you define.

Metrics and transforms are applicable to both individual assets or multiple assets.AWS IoT SiteWise automatically computes commonly used statistical aggregates like average, sum, and count, across various time frames relevant to your equipment data, metrics, and transforms.

Assets can be synchronized using AWS IoT TwinMaker. For more information, see [Integrating AWS IoT SiteWise and AWS IoT TwinMaker](integrate-tm.md#it-integrate).

### Analyze using queries, alarms, and predictions
<a name="how-it-works-analyze"></a>

Analyze the date gathered with AWS IoT SiteWise by running queries and setting up alarms. You can also use Amazon Lookout to automatically detect anomalies within metrics and identify their root causes. 
+ Set specific alarms to alert your team when equipment or processes deviate from optimal performance, ensuring quick issue identification and resolution. For more information, see [Monitor data with alarms in AWS IoT SiteWise](industrial-alarms.md).
+ Use the AWS IoT SiteWise API operations to query your asset properties' current values, historical values, and aggregates over specific time intervals. For more information, see [Query data from AWS IoT SiteWise](query-industrial-data.md).
+ Use anomaly detection with Amazon Lookout for Equipment to identify and visualize changes in equipment or operating conditions. With anomaly detection, you can determine preventative maintenance measures for your operations. This integration allows customers to sync data between AWS IoT SiteWise and Amazon Lookout for Equipment. For more information, see [Detect anomalies with Lookout for Equipment](anomaly-detection.md).

### Visualize operations
<a name="how-it-works-web-app"></a>

Set up SiteWise Monitor to create web applications for your operational employees. The web applications help employees to visualize your operations. Handle varied levels of access for your employees using IAM Identity Center or IAM. Configure unique logins and permissions for each employee to view specific subsets of an entire industrial operation. AWS IoT SiteWise provides an [application guide](https://docs.aws.amazon.com/iot-sitewise/latest/appguide/) for these employees to learn how to use SiteWise Monitor.

For more information on visualizing your operations, see [Monitor data with AWS IoT SiteWise Monitor](monitor-data.md).

### Store data
<a name="how-it-works-store-data"></a>

You can integrate time series storage with your industrial data lake. AWS IoT SiteWise has three storage tiers for industrial data:
+ A hot storage tier that is optimized for real-time applications.
+  A warm storage tier optimized for analytical workloads.
+ A customer-managed cold storage tier using Amazon S3 for operational data applications with high latency tolerance.

AWS IoT SiteWise helps you manage storage cost by keeping recent data in the hot storage tier. Then, you define data retention policies to move historical data to warm or cold tier storage. For more information, see [Manage data storage in AWS IoT SiteWise](manage-data-storage.md).

You can also import and export asset metadata. For more information see [Asset metadata](file-path-and-schema.md#asset-metadata).

### Integrate with other services
<a name="features-integrate-with-services"></a>

AWS IoT SiteWise integrates with several AWS services to develop a complete AWS IoT solution in the AWS Cloud. For more information, see [Interact with other AWS services](interact-with-other-services.md).

## Use cases for AWS IoT SiteWise
<a name="use-cases"></a>

AWS IoT SiteWise is used across a variety of industries for many industrial data collection and analysis applications.

Collect data consistently from all your sources to help resolve issues quickly. AWS IoT SiteWise offers remote monitoring to collect the data directly on-site or gather it from multiple sources across many facilities. AWS IoT SiteWise provides the necessary flexibility for industrial IoT data solutions.

### Manufacturing
<a name="use-case-manufacturing"></a>

AWS IoT SiteWise can simplify the process of collecting and utilizing data from your equipment to pinpoint and minimize inefficiencies, enhancing industrial operations. AWS IoT SiteWise helps you collect data from manufacturing lines and equipment. With AWS IoT SiteWise, you can transfer the data to the AWS Cloud and build performance metrics for your specific equipment and processes. You can use the metrics produced to understand the overall effectiveness of your operations and identify opportunities for innovation and improvement. You can also view your manufacturing process and identify equipment and process deficiencies, production gaps, or product defects.

### Food and beverage
<a name="use-case-food-beverage"></a>

Food and beverage industry facilities handle a wide variety of food processing, including grinding grain to flour, butchering and packing meat, and assembling, cooking, and freezing microwaveable meals. Food processing plants often span multiple locations with plant and equipment operators in a centralized location to monitor processes and equipment. For example, refrigeration units assess ingredient handling and expiration. They monitor waste creation across facilities to ensure operational efficiency. With AWS IoT SiteWise, you can group sensor data streams from multiple locations by production line, and facilities so your process engineers can better understand and make improvements across facilities.

### Energy and utilities
<a name="use-case-energy-utilities"></a>

With AWS IoT SiteWise, you can resolve equipment issues easier and more efficiently. You can monitor asset performance remotely and in real time. Access historical equipment data from anywhere to pinpoint potential problems, dispatch accurate resources, and both prevent and fix issues faster.