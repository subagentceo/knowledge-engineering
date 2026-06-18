

AWS IoT FleetWise is no longer open to new customers. Existing AWS IoT FleetWise customers can continue using the service. The [Guidance for Connected Mobility on AWS](https://aws.amazon.com/solutions/guidance/connected-mobility-on-aws/) provides guidance on how to develop and deploy modular services for connected mobility solutions that can be used to achieve equivalent capabilities as AWS IoT FleetWise.

# What is AWS IoT FleetWise?
<a name="what-is-iotfleetwise"></a>

AWS IoT FleetWise is a managed service that you can use to collect vehicle data and organize it in the cloud. You can use the collected data to improve vehicle quality, performance, and autonomy. With AWS IoT FleetWise, you can collect and organize data from vehicles that use different protocols and data formats. AWS IoT FleetWise helps to transform low-level messages into human-readable values and standardize the data format in the cloud for data analyses. You can also define data collection campaigns to control what vehicle data to collect and when to transfer that data to the cloud.

When the vehicle data is in the cloud, you can use it for applications that analyze vehicle fleet health. This data can help you to identify potential maintenance issues, make in-vehicle infotainment systems smarter, and improve advanced technologies like autonomous driving and driver-assistance systems with analytics and machine learning (ML).

The following diagram shows the basic architecture of AWS IoT FleetWise.

![Architecture of AWS IoT FleetWise](http://docs.aws.amazon.com/iot-fleetwise/latest/developerguide/images/architecture-diagram.png)


**Topics**
+ [Benefits](#benefits)
+ [Use cases](#use-cases)
+ [Important notice](#important-notice)
+ [Are you new to AWS IoT FleetWise?](#first-time-user)
+ [Accessing AWS IoT FleetWise](#acessing-servicename)
+ [Pricing for AWS IoT FleetWise](#priding-servicename)
+ [Related services](#related-services)
+ [Key concepts and features of AWS IoT FleetWise](how-iotfleetwise-works.md)
+ [AWS Region and feature availability in AWS IoT FleetWise](fleetwise-regions.md)

## Benefits
<a name="benefits"></a>

The key benefits of AWS IoT FleetWise are:

**Collect vehicle data more intelligently**  
Improve data relevance with intelligent data collection that sends only the data you need to the cloud for analysis.

**Easily analyze standardized, fleet-wide data**  
Analyze standardized data from a fleet of vehicles without needing to develop a custom data collection or logging system.

**Automatic data synchronization in the cloud**  
Gain a unified view of data collected from both standard sensors (telemetry data) and vision systems (data from cameras, radars, and lidars), and keep it automatically synchronized in the cloud. AWS IoT FleetWise keeps both structured and unstructured vision system data, metadata, and standard sensor data automatically synchronized in the cloud. This streamlines the process to assemble a full picture view of events and gain insights.

**Store data at the Edge and forward it under optimal conditions**  
Reduce transmission costs by temporarily storing data on vehicles. You can forward selected data to the cloud under specified, optimal conditions--such as when vehicles connect to Wi-Fi.

**Note**  
Vision system data is in preview release and is subject to change.

## Use cases
<a name="use-cases"></a>

The scenarios in which you can use AWS IoT FleetWise include the following:

**Train AI/ML models**  
Continuously improve machine learning models used for autonomous and advanced driver assistance systems by collecting data from production vehicles.

**Enhance the digital customer experience**  
Use data from infotainment systems to make in-vehicle audiovisual content and in-app insights more relevant.

**Maintain vehicle fleet health **  
Use insights from fleet data to monitor EV battery health and charge levels, manage maintenance schedules, analyze fuel consumption, and more.

**Create and manage commands**  
Use commands to execute commands on a vehicle from the cloud. You can remotely send commands to a vehicle, and within a few seconds, the vehicle will execute the command. For example, you can configure commands to lock a vehicle’s door or set the temperature.

**Create and manage state templates**  
State templates provide a mechanism for vehicle owners to track the state of their vehicle. The AWS IoT FleetWise Edge Agent that runs on the vehicle collects and sends signal updates to the cloud.

## Important notice
<a name="important-notice"></a>

Vehicle data collected through your use of AWS IoT FleetWise is intended for informational purposes only (including to help you train cloud-based artificial intelligence and machine learning models), and you may not use AWS IoT FleetWise to control or operate vehicle functions. You are solely responsible for all liability that may arise in connection with any use outside of AWS IoT FleetWise's intended purpose and in any manner contrary to applicable vehicle regulations.

Vehicle data collected through your use of AWS IoT FleetWise should be evaluated for accuracy as appropriate for your use case, including for purposes of meeting any compliance obligations you may have under applicable vehicle safety regulations (such as safety monitoring and reporting obligations). Such evaluation should include collecting and reviewing information through other industry standard means and sources (such as reports from drivers of vehicles). You and your End Users are solely responsible for all decisions made, advice given, actions taken, and failures to take action based on your use of AWS IoT FleetWise.

## Are you new to AWS IoT FleetWise?
<a name="first-time-user"></a>

If you're new to AWS IoT FleetWise, we recommend that you begin by reading the following sections:
+ [Key concepts and features of AWS IoT FleetWise](how-iotfleetwise-works.md)
+ [Set up AWS IoT FleetWise](setting-up.md)
+ [Tutorial: Get started with AWS IoT FleetWise](fleetwise-getting-started.md)
+ [Ingest AWS IoT FleetWise data to the cloud](data-ingestion.md)

## Accessing AWS IoT FleetWise
<a name="acessing-servicename"></a>

You can use the AWS IoT FleetWise console or API to access AWS IoT FleetWise.

## Pricing for AWS IoT FleetWise
<a name="priding-servicename"></a>

Vehicles send data to the cloud through MQTT messages. You pay at the end of each month for the vehicles that you created in AWS IoT FleetWise. You also pay for messages that you collect from vehicles. For current information about pricing, see the [AWS IoT FleetWise Pricing](https://aws.amazon.com/iot-fleetwise/pricing/) page. To learn more about the MQTT messaging protocol, see [MQTT](https://docs.aws.amazon.com/iot/latest/developerguide/mqtt.html) in the *AWS IoT Core Developer Guide*.

## Related services
<a name="related-services"></a>

AWS IoT FleetWise integrates with the following AWS services to improve the availability and scalability of your cloud solutions.
+ **AWS IoT Core** – Register and control AWS IoT devices that upload vehicle data to AWS IoT FleetWise, and remotely send commands to a vehicle. For more information, see [What is AWS IoT](https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html) in the *AWS IoT Developer Guide*.
+ **Amazon Timestream** – Use a time series database to store and analyze your vehicle data. For more information, see [What is Amazon Timestream](https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html) in the *Amazon Timestream Developer Guide*.
+ **Amazon S3** – Use an object storage service to store and manage your vehicle data. For more information, see [What is Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) in the *Amazon Simple Storage Service User Guide*.