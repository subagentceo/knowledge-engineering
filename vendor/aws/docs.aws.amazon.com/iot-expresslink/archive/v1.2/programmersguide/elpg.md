

# AWS IoT ExpressLink programmer's guide v1.2
<a name="elpg"></a>

This document defines the Application Programming Interface (API) that all AWS IoT ExpressLink compliant connectivity modules are required to implement to connect any host processor to the AWS cloud. 

If you have questions or issues that are not answered here, please visit the [AWS re:Post for AWS IoT ExpressLink](https://repost.aws/tags/TADqOo0ODORl2pC69DWwUFug/aws-io-t-express-link) page.

See the [Document history](elpg-history.md) for changes in this version.

**Topics**
+ [1 Overview](elpg-overview.md)
+ [2 Hardware](elpg-hardware.md)
+ [3 Run states](elpg-run-states.md)
+ [4 ExpressLink commands](elpg-commands.md)
+ [5 Messaging](elpg-messaging.md)
+ [6 Configuration Dictionary](elpg-configuration-dictionary.md)
+ [7 Event handling](elpg-event-handling.md)
+ [8 Over the Air Updates](elpg-ota-updates.md)
+ [9 AWS IoT Services](elpg-iot-services.md)
+ [10 Additional services](elpg-additional-services.md)
+ [11 Provisioning](elpg-provisioning.md)
+ [12 Bluetooth Low Energy](elpg-ble.md)
+ [Document history](elpg-history.md)
+ [Archive](elpg-archive.md)

 

**AWS IoT ExpressLink commands**

See these sections for descriptions of AWS IoT ExpressLink commands in the following general categories:
+ [Power and connection control (CONNECT, ...)](elpg-commands.md#elpg-power-control.title)
+ [Messaging topic model (SEND, GET, ... )](elpg-messaging.md#elpg-messaging-topic.title)
+ [Dictionary data access (CONF, ...)](elpg-configuration-dictionary.md#elpg-data-accessed-conf.title)
+ [Event handling commands (EVENT, ...)](elpg-event-handling.md#elpg-event-handling-commands.title)
+ [Diagnostic commands (DIAG, ...) ](elpg-event-handling.md#elpg-diagnostic-commands.title)
+ [OTA commands (OTA)](elpg-ota-updates.md#elpg-ota-commands.title)
  + [Host OTA certificate update ](elpg-ota-updates.md#elpg-hota-cert-update.title)
  + [Over the Wire (OTW) module firmware update command](elpg-ota-updates.md#elpg-otw-firmware-update.title)
+ [AWS IoT Device Defender (using CONF)](elpg-iot-services.md#elpg-device-defender.title)
+ [AWS IoT Device Shadow (SHADOW)](elpg-iot-services.md#elpg-device-shadow.title)
+ [Additional services (TIME?, WHERE?)](elpg-additional-services.md#elpg-additional-services.title)
+ [Bluetooth Low Energy (BLE)](elpg-ble.md#elpg-ble.title)

**Tables**
+ [Table 1 - Error codes](elpg-commands.md#elpg-table1)
+ [Table 2 - Configuration Dictionary Persistent Keys](elpg-configuration-dictionary.md#elpg-table2)
+ [Table 3 - Configuration dictionary non-persistent keys](elpg-configuration-dictionary.md#elpg-table3)
+ [Table 4 - ExpressLink event codes](elpg-event-handling.md#elpg-table4)
+ [Table 5 - Reserved OTA file type codes (0-255)](elpg-ota-updates.md#elpg-table5)
+ [Table 6 - ExpressLink Defender metrics](elpg-iot-services.md#elpg-table6)