

End of support notice: On May 20, 2026, AWS will end support for AWS IoT Events. After May 20, 2026, you will no longer be able to access the AWS IoT Events console or AWS IoT Events resources. For more information, see [AWS IoT Events end of support](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-end-of-support.html).

# What is AWS IoT Events?
<a name="what-is-iotevents"></a>

AWS IoT Events enables you to monitor your equipment or device fleets for failures or changes in operation, and to trigger actions when such events occur. AWS IoT Events continuously watches IoT sensor data from devices, processes, applications, and other AWS services to identify significant events so you can take action.

Use AWS IoT Events to build complex event monitoring applications in the AWS Cloud that you can access through the AWS IoT Events console or APIs.

![A diagram that shows inputs to AWS IoT Events being processed and the resulting actions.](http://docs.aws.amazon.com/iotevents/latest/developerguide/images/iot-events-how-it-works.png)


**Topics**
+ [Benefits and features](#iotevents-benefits)
+ [Use cases](#iotevents-use-cases)

## Benefits and features
<a name="iotevents-benefits"></a>

**Accept inputs from multiple sources**  
AWS IoT Events accepts inputs from many IoT telemetry data sources. These include sensor devices, management applications, and other AWS IoT services, such as AWS IoT Core and AWS IoT Analytics. You can push any telemetry data input to AWS IoT Events by using a standard API interface (`BatchPutMessage` API) or the AWS IoT Events console.  
For more information on getting started with AWS IoT Events, see [Getting started with the AWS IoT Events console](iotevents-getting-started.md).

**Use simple logical expressions to recognize complex patterns of events**  
AWS IoT Events can recognize patterns of events that involve multiple inputs from a single IoT device or application, or from diverse equipment and many independent sensors. This is especially useful because each sensor and application provides important information. But only by combining diverse sensor and application data can you get a complete picture of the performance and quality of operations. You can configure AWS IoT Events detectors to recognize these events using simple logical expressions instead of complex code.  
For more information on logical expressions, see [Expressions to filter, transform, and process event data](iotevents-expressions.md).

**Trigger actions based on events**  
AWS IoT Events enables you to directly trigger actions in Amazon Simple Notification Service (Amazon SNS), AWS IoT Core, Lambda, Amazon SQS and Amazon Kinesis Firehose. You can also trigger an AWS Lambda function using the AWS IoT rules engine which makes it possible to take actions using other services, such as Connect Customer, or your own enterprise resource planning (ERP) applications.  
AWS IoT Events includes a prebuilt library of actions you can take, and also enables you to define your own.  
To learn more about triggering actions based on events, see [Supported actions to receive data and trigger actions in AWS IoT Events](iotevents-supported-actions.md).

**Automatically scale to meet the demands of your fleet**  
AWS IoT Events scales automatically when you are connecting homogeneous devices. You can define a detector once for a specific type of device, and the service will automatically scale and manage all instances of that device that connect to AWS IoT Events.  
To explore examples of detector models, see [AWS IoT Events detector model examples](iotevents-examples.md).

## Use cases
<a name="iotevents-use-cases"></a>

AWS IoT Events has many uses. Here are a few example use cases.

### Monitor and maintain remote devices
<a name="use-case-remote-devices"></a>

Monitoring a fleet of remotely deployed machines can be challenging, especially when a malfunction occurs without clear context. If one machine stops functioning, this might mean replacing the entire processing unit or machine. But this isn't sustainable. With AWS IoT Events you can receive messages from multiple sensors on each machine to help you diagnose specific issues over time. Instead of replacing the whole unit, you now have the necessary information to send a technician with the exact part that needs replacement. With millions of machines, savings can add up to millions of dollars, lowering your total cost of owning or maintaining each machine.

### Manage industrial robots
<a name="use-case-industrial-robots"></a>

Deploying robots in your facilities to automate package movement can greatly enhance efficiency. To minimize costs, robots can be equipped with simple, low-cost sensors that report data to the cloud. However, with dozens of sensors and hundreds of operating modes, detecting issues in real time can be challenging. Using AWS IoT Events, you can build an expert system that processes this sensor data in the cloud, creating alerts to automatically notify technical staff if a failure is imminent.

### Track building automation systems
<a name="use-case-track-systems"></a>

In data centers, monitoring for high temperatures and low humidity helps to prevent equipment failures. Sensors are often purchased from many manufacturers and each type comes with its own management software. However, management software from different vendors sometimes isn't compatible, making it difficult to detect problems. Using AWS IoT Events, you can set up alerts to notify your operations analysts of issues with your heating and cooling systems well in advance of failures. In this way, you can prevent an unscheduled data center shutdown that would cost thousands of dollars in equipment replacement and potential lost revenue.