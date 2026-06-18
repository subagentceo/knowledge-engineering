

# What is AWS Ground Station?
<a name="what-is"></a>

 AWS Ground Station is a fully managed service that provides secure, fast, and predictable satellite communications across a global infrastructure. With AWS Ground Station, you no longer have to build, manage, or scale your own ground station infrastructure. AWS Ground Station enables you to focus on innovating and rapidly experimenting with new applications that ingest satellite data, rather than spend resources on building, operating, and scaling your own ground stations. 

Using AWS's low-latency, high-bandwidth global fiber network, you can begin processing your satellite data within seconds of reception at the antenna system. This enables you to turn raw data into processed information or analyzed knowledge within a matter of seconds.

 For organizations with specialized requirements, AWS Ground Station also offers [AWS Ground Station Dedicated Antennas](dedicated-antennas.md) — custom-built antenna systems that AWS manages on your behalf, providing dedicated access to antennas built to your specifications. 

## Common use cases
<a name="what-is.common-use-cases"></a>

 ![Common use cases for AWS Ground Station include the following: onboard and schedule, command, control, and downlink, receive data, and process and distribute data.](http://docs.aws.amazon.com/ground-station/latest/ug/images/what-is-gs.png) 

AWS Ground Station allows you to communicate with your satellites bi-directionally and supports the following use cases: 
+  **Downlink data** – Receive data from your satellites, transmitting X-band and S-band frequencies, delivered to an Amazon EC2 instance in real-time (VITA-49 format), or directly to an Amazon S3 bucket in your account ([PCAP format](https://wiki.wireshark.org/Development/LibpcapFileFormat)). Additionally, for satellites that use a supported modulation and encoding scheme, you can choose between receiving data that is demodulated and decoded, or the raw digital intermediate frequency (DigIF) samples (VITA-49 format). 
+  **Uplink data** – Send data and commands to your satellites, that receive S-band frequencies, by sending DigIF data (VITA-49 format) to be transmitted by AWS Ground Station. 
+  **Uplink echo** – Validate commands sent to your spacecraft, and perform other advanced tasks, by receiving your transmitted signal on a physically co-located antenna. 
+  **Software Defined Radio (SDR) / Front End Processor (FEP)** – Use your existing SDR and/or FEP, that's capable of running on an Amazon EC2 instance, to process your data in real-time to send/receive your existing waveforms, and generate your data products. 
+  **Telemetry, Tracking, and Command (TT&C)** – Perform TT&C using a combination of the previously listed use cases to manage your satellite fleet. 
+  **Cross Region Data Delivery** – Operate multiple simultaneous contacts using AWS Ground Station’s global antenna network from a single AWS Region. 
+  **Digital twin** – Test scheduling, verification of configurations, and proper error handling at a reduced cost without using production antenna capacity. 

## Next steps
<a name="what-is.next-steps"></a>

 We recommend that you begin by reading the following sections: 
+  To learn essential AWS Ground Station concepts, see [How AWS Ground Station works](how-it-works.md). 
+  To learn how to set up your account and resources to use AWS Ground Station, see [Get started](getting-started.md). 
+  To programmatically use AWS Ground Station, please refer to the [AWS Ground Station API Reference](https://docs.aws.amazon.com/ground-station/latest/APIReference/Welcome.html). The API Reference describes all the API operations for AWS Ground Station in detail. It also provides sample requests, responses, and errors for the supported web service protocols. You can use the [AWS CLI](https://aws.amazon.com/cli), or an [AWS SDK](https://aws.amazon.com/developer/tools/), in the language of your choice, to write code that interacts with AWS Ground Station. 