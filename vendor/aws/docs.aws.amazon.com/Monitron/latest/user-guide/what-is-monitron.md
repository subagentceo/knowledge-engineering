

Amazon Monitron is no longer open to new customers. Existing customers can continue to use the service as normal. For capabilities similar to Amazon Monitron, see our [blog post](https://aws.amazon.com/blogs/machine-learning/maintain-access-and-consider-alternatives-for-amazon-monitron).

# What is Amazon Monitron?
<a name="what-is-monitron"></a>

Amazon Monitron is a machine-learning based end-to-end condition monitoring system that detects potential failures within equipment. You can use it to implement a predictive maintenance program and reduce lost productivity from unplanned machine downtime.

Amazon Monitron includes purpose-built sensors to capture vibration and temperature data, and gateways to automatically transfer data to the AWS Cloud. Amazon Monitron analyzes data for indications of potential equipment failure and notifies you about developing faults so you can resolve them before they become more serious problems. With Amazon Monitron, you can schedule corrective maintenance activities more effectively to limit productivity losses and minimize repair costs that can result from catastrophic failure of your equipment. 

Amazon Monitron comes with an application in two versions. The mobile application handles system setup, analytics, and notiﬁcation when tracking equipment conditions. The web application provides all the same functions as the mobile app except setup.

Reliability managers can quickly deploy Amazon Monitron to track the machine health of industrial equipment, such as bearings, motors, gearboxes, and pumps, without any development work or specialized training.


|  | 
| --- |
|  [![AWS Videos](http://img.youtube.com/vi/https://www.youtube.com/embed/_cIiB-JEwVI/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/_cIiB-JEwVI)  | 

## Amazon Monitron devices
<a name="how-it-works-hardware"></a>

Amazon Monitron includes two types of devices: a **sensor**, for collecting data from your equipment, and a **gateway**, for sending that data to Amazon Monitron. You can purchase both from [Amazon.com](https://amazon.com/) or [Amazon Business](https://business.amazon.com/).

You mount the sensors directly on the machines (or *assets*) that you want to monitor. You can place up to 20 sensors on an asset.

![Orange sensor device with Amazon smile logo and regulatory compliance markings.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/real-sensor.png)


Each sensor collects data from the asset and sends it through the AWS Cloud to Amazon Monitron using a gateway mounted on the factory wall and plugged into a standard outlet.

The Amazon Monitron Starter Kit, which is available at [Amazon.com](https://amazon.com/) or [Amazon Business](https://business.amazon.com/), contains five sensors and one Wi-Fi gateway. You can add more sensors and gateways as needed.

![Two orange Amazon Monitron devices: a sensor with cable and a Wi-Fi gateway unit.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/both-gateways.png)


## Amazon Monitron software
<a name="how-it-works-software"></a>

Amazon Monitron includes a **console**, which is used by your IT account manager to create a project and add admin users to manage it. This project is the framework for all the Amazon Monitron tasks that the rest of the team performs to monitor your equipment. Until you set up the project, no other equipment monitoring can be done using Amazon Monitron. IT Manager tasks include the following:
+ Setting up a user directory to provide users for Amazon Monitron
+ Creating a project to contain all of your team's Amazon Monitron monitoring tasks, such as creating sites, pairing sensors, adding assets, and so on
+ Adding an admin user to manage the project 

Except for the initial project set up, your team performs all monitoring tasks using the Amazon Monitron **mobile app**, which they install on their smartphones, or the **web app**, which they can use in their browsers. Using the mobile app, reliability managers in your factory can set up sites, manage users, add assets, and install sensors. Using the web app, they can complete the same tasks, except for installing sensors and gateways. Technicians can use the apps to monitor the health of your equipment, and track and document potential failures. 

The mobile app displays an icon for each asset, so you can see its condition at a glance. 


| Alert icon | Alert definition | 
| --- | --- | 
|  ![Green circular icon with a white checkmark symbol inside.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/healthy_icon.png)  | **Healthy:** The machine is working normally. | 
|  ![Red hexagonal warning sign with exclamation mark indicating caution or alert.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/alarm_icon.png)  | **Alarm**: An alarm has been triggered for one of the positions of this asset, indicating that the machine vibration and temperature are out of the normal range at this position. We recommend that you investigate the issue at the earliest opportunity. An equipment failure might occur if the issue isn't addressed. | 
|  ![Yellow triangular warning sign with black exclamation mark.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/warning_icon.png)  | **Warning**: A warning has been triggered for one of the positions of this asset, indicating that Amazon Monitron has detected early signs of potential failure. Amazon Monitron identifies warning conditions by analyzing equipment vibration and temperature, using a combination of machine learning and ISO vibration standards. | 
|  ![Wrench icon on a blue square background, representing a tool or settings symbol.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/acknowledged_icon.png)  | **Maintenance**: Someone has acknowledged the alarm and is looking into the issue. | 
|  ![Checkmark and X icons in a gray circle, representing selection or validation options.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/sensor-healthy-offline-asset-list.png)  | **Asset Healthy-offline:** Sensor is offline and the last recorded state was **Healthy**. No new alerts will be generated till the sensor returns online. | 
|  ![Healthy status badge with a close or dismiss button.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/sensor-position-healthy-offline.png)  | **Position Healthy-offline:** Sensor is offline and the last recorded state was **Healthy**. No new alerts will be generated till the position returns online. | 
|  ![Hexagonal warning icon with an exclamation mark and a crossed-out circle.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/sensor-alarm-offline-asset-list.png)  | **Asset Alarm-offline:** Sensor is offline and the last recorded state was an **Alarm**. No new alerts will be generated till the sensor returns online. | 
|  ![Alarm icon with an X symbol for dismissing or closing the alarm notification.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/sensor-position-alarm-offline.png)  | **Position Alarm-offline:** Sensor is offline and the last recorded state was an **Alarm**. No new alerts will be generated till the position returns online. | 
|  ![Warning icon with an exclamation mark inside a triangle and an X symbol.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/sensor-warning-offline-asset-list.png)  | **Asset Warning-offline:** Sensor is offline and the last recorded state was a **Warning**. No new alerts will be generated till the sensor returns online. | 
|  ![Warning message icon with an X button for dismissal.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/sensor-position-warning-offline.png)  | **Position Warning-offline:** Sensor is offline and the last recorded state was a **Warning**. No new alerts will be generated till the position returns online. | 
|  ![Icon showing a wrench with a close or cancel symbol.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/sensor-maintenance-offline-asset-list.png)  | **Asset Maintenance-offline:** Sensor is offline and the last recorded state was **Maintenance**. No new alerts will be generated till the sensor returns online. | 
|  ![Gray button labeled "Maintenance" with an X icon for dismissal or closure.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/sensor-position-maintenance-offline.png)  | **Position Maintenance-offline:** Sensor is offline and the last recorded state was **Maintenance**. No new alerts will be generated till the position returns online. | 
| No sensor | **No sensor**: At least one position for the asset doesn't have a sensor paired to it. | 

To find out more, you can drill down into the data.


|  ![Vibration monitoring dashboard showing total and single axis vibration graphs with measurements around 4.63 mm/s.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/mobile-healthy-ug.png)  |  ![Vibration monitoring dashboard showing total and single axis vibration graphs over time.](http://docs.aws.amazon.com/Monitron/latest/user-guide/images/web-what-is-1.png)  | 
| --- | --- | 
| Sensor reading of a healthy asset. | Sensor reading of an unhealthy asset. | 

As Amazon Monitron collects more data, it improves its machine learning (ML) model and learns to make more accurate estimates of potential machine abnormalities. 

## Benefits of Amazon Monitron
<a name="how-it-works-benefits"></a>

 Amazon Monitron provides the following key benefits:
+ **Works out of the box** – Amazon Monitron sensors and gateways are pre-configured to work with Amazon Monitron software. Reliability managers can install these devices using the app and can start monitoring equipment in just a few hours. It's simple to set up and requires little or no development work, knowledge of ML, or integration. 
+ **Immediate notifications in the Amazon Monitron app** – Amazon Monitron sends users notifications in the app when it detects abnormal machine patterns. Technicians can view, track, and provide feedback on these abnormal machine states in the Amazon Monitron app. 
+ **ISO and ML-based analytics** – Amazon Monitron automatically detects abnormal machine operating states. To do this, Amazon Monitron analyzes vibration and temperature signals and compares them to International Standards Organization (ISO 20816) standard thresholds and ML-enabled models. 
+ **Support for adding ML feedback in the app**– Amazon Monitron offers simple workflows for technicians to enter feedback on the accuracy of the alerts in the app. Amazon Monitron learns from that feedback and continues to improves over time.

## Pricing for Amazon Monitron
<a name="pricing"></a>

Amazon Monitron includes both one-time, device purchase costs for the sensors and gateways, and an ongoing pay-as-you-go service fee per Amazon Monitron sensor in use. There are no additional upfront fees and no long-term commitments.

For information, see [Amazon Monitron Pricing](https://aws.amazon.com/pricing/).

## Related resources
<a name="other-help"></a>

The following documentation and other resources are available for Amazon Monitron: 
+ [Amazon Monitron Getting Started Guide](https://docs.aws.amazon.com/Monitron/latest/getting-started-guide/admin_what-is-monitron.html) – For IT managers, reliability managers, and technicians, this guide gets you started using Amazon Monitron. It shows you how to set up Amazon Monitron, create assets, set up sensors, and start monitoring your equipment. 
+ Amazon Monitron User Guide – This detailed guide provides reliability managers (admin users) and technicians with more in-depth information about using Amazon Monitron to monitor your equipment for machine abnormalities. It also describes how to use the app, your primary Amazon Monitron tool. 

## Are you a first-time user of Amazon Monitron?
<a name="how-it-works-ftu"></a>

How you interact with Amazon Monitron depends on your role as an Amazon Monitron user. Select the role that fits you best from the options below to see a recommended set of topics to help you learn more about Amazon Monitron.

### IT Manager
<a name="first-time-admin-user"></a>

An IT manager sets up an Amazon Monitron project, configures a user directory to add Amazon Monitron users, adds site admin users to manager projects, and can also check Amazon Monitron logs in AWS CloudTrail.

If you are a first-time IT Manager user of Amazon Monitron, we recommend that you read the following sections in order:


|  **1** **[How Amazon Monitron works](how-monitron-works.md)**  |  **2** **[Setting up a project](step-1.md)**  |  **3** **[Projects](projects-chapter.md)**  |  **4** **[Managing admin users](user-management-chapter.md)**  |  **5** **[Understanding networking with Amazon Monitron](networking-chapter.md)**  |  **6** **[Accessing your Amazon Monitron data](access-data.md) **  |  **7** **[Security in Amazon Monitron](security.md)**  | 
| --- | --- | --- | --- | --- | --- | --- | 
| Introduces Amazon Monitron components and describes how Amazon Monitron works | Explains how to setup the AWS console for creating Amazon Monitron projects | Explains how to manage Amazon Monitron projects | Explains how to add and remove admin users to and from your Amazon Monitron projects | Explains Amazon Monitron hardware networking | Explains how to export your Amazon Monitron data with Kinesis or download it to Amazon S3 | Explains how to configure Amazon Monitron to meet your security and compliance objectives | 

### Reliability manager/Admin user
<a name="first-time-reliability-user"></a>

A reliability manager/admin user has full access to all resources within an Amazon Monitron project or site. As a reliability manager or site admin user, you can add other users, create assets, pair sensors to assets, monitor assets, acknowledge alerts, and resolve abnormalities.

If you are a first-time reliability manager or admin user of Amazon Monitron, we recommend that you read the following sections in order:


|  **1** **[How Amazon Monitron works](how-monitron-works.md)**  |  **2** **[Adding assets and installing devices](step-2.md)**  |  **3** **[Sites](site-management-chapterSM.md)**  |  **4** **[Ethernet gateways](setting-up-ethernet-gateways.md)**  |  **5** **[Wi-Fi gateways](setting-up-Wi-Fi-gateways.md)**  |  **6** **[Assets](assets-chapter.md)**  |  **7** **[Managing users](user-management.md)**  | 
| --- | --- | --- | --- | --- | --- | --- | 
| Introduces Amazon Monitron components and describes how Amazon Monitron works | Explains how to install Amazon Monitron gateways, add assets, and attach sensors | Describes how to create and manage sites | Explains how to set up and configure ethernet gateways | Explains how to set up and configure Wi-Fi gateways | Describes how to manage assets and sensors | Describes how to manage admin users | 

### Technician
<a name="first-time-technician-user"></a>

A technician user has read-only permissions to a Amazon Monitron project or site to which they have been added. Technicians also have permissions for monitoring assets and acknowledging and resolving abnormalities.

If you are a first-time technician user of Amazon Monitron, we recommend that you read the following sections in order:


|  **1** **[How Amazon Monitron works](how-monitron-works.md)**  |  **2** **[Assets](assets-chapter.md)**  |  **3** **[Understanding sensor measurements and monitoring machine abnormalities](anom-monitoring-chapter.md)**  |  **4** **[Ethernet gateways](setting-up-ethernet-gateways.md)**  |  **5** **[Wi-Fi gateways](setting-up-Wi-Fi-gateways.md)**  |  **6** **[Troubleshooting Amazon Monitron device issues](troubleshooting.md)**  | 
| --- | --- | --- | --- | --- | --- | 
| Introduces Amazon Monitron components and describes how Amazon Monitron works | Describes how to manage assets and sensors | Explains how to understand sensor measurements and monitor machine abnormalities | Explains how to set up and configure ethernet gateways | Explains how to set up and configure Wi-Fi gateways | Explains how to troubleshoot Amazon Monitron device issues | 