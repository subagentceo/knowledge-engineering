

# AWS IoT ExpressLink programmer's guide v1.1.1
<a name="elpg"></a>

This document defines the Application Programming Interface (API) that all AWS IoT ExpressLink compliant connectivity modules are required to implement to connect any host processor to the AWS cloud. 

If you have questions or issues that are not answered here, please visit the [AWS re:Post for AWS IoT ExpressLink](https://repost.aws/tags/TADqOo0ODORl2pC69DWwUFug/aws-io-t-express-link) page.

**Topics**
+ [1 Hardware](elpg-hardware.md)
+ [2 Run states](elpg-run-states.md)
+ [3 ExpressLink commands](elpg-commands.md)
+ [4 Messaging](elpg-messaging.md)
+ [5 Configuration Dictionary](elpg-configuration-dictionary.md)
+ [6 Event handling](elpg-event-handling.md)
+ [7 ExpressLink module updates](elpg-ota-updates.md)
+ [8 AWS IoT Services](elpg-iot-services.md)
+ [9 Provisioning](elpg-provisioning.md)
+ [10 Additional services](elpg-additional-services.md)
+ [Document history](elpg-history.md)
+ [Archive](elpg-archive.md)

 

**AWS IoT ExpressLink commands**
+ [ AT   »Communication test«](elpg-commands.md#elpg-at-command)
+ [ CONF KEY=*{value}*   »Assignment«](elpg-configuration-dictionary.md#elpg-assignment-conf)
+ [ CONF {certificate}=pem   »Special certificate input formatting option« ](elpg-ota-updates.md#elpg-ota-conf-command)
+ [ CONF? *key*   »Read the value of a configuration parameter«](elpg-configuration-dictionary.md#elpg-retrieval-conf)
+ [ CONF? *{certificate} pem*   »Special certificate output formatting option« ](elpg-ota-updates.md#elpg-ota-confq-command)
+ [ CONFMODE *[parameter]*   »Activate modal credential entry« ](elpg-commands.md#elpg-confmode-command)
+ [ CONNECT   »Establish a connection to an AWS IoT Core Endpoint« ](elpg-commands.md#elpg-connect-command)
+ [ CONNECT\!   »Non-blocking request to connect to IoT Core« ](elpg-commands.md#elpg-connect-nonblocking-command)
+ [ CONNECT?   »Request the connection status«](elpg-commands.md#elpg-connectq-command)
+ [ DIAG *{command} [optional parameters]*   »Perform a diagnostic command« ](elpg-event-handling.md#elpg-diag-command)
+ [ DISCONNECT   »Leave the connected state and enter the active state«](elpg-commands.md#elpg-disconnect-command)
+ [ EVENT?   »Request the next event in the queue«](elpg-event-handling.md#elpg-eventq-command)
+ [ FACTORY\_RESET   »Request a factory reset of the ExpressLink module«](elpg-commands.md#elpg-factory-reset-command)
+ [ GET   »Request next message pending on any topic«](elpg-messaging.md#elpg-get-command)
+ [ GET0   »Request next message pending on an unassigned topic«](elpg-messaging.md#elpg-get0-command)
+ [ GET*[\#]*   »Request next message pending on the indicated topic«](elpg-messaging.md#elpg-geth-command)
+ [ OTA ACCEPT   »Allow the OTA operation to proceed« ](elpg-ota-updates.md#elpg-ota-accept-command)
+ [ OTA APPLY   »Authorize the ExpressLink module to apply the new image.« ](elpg-ota-updates.md#elpg-ota-apply-command)
+ [ OTA CLOSE   »The host OTA operation is completed«](elpg-ota-updates.md#elpg-ota-close-command)
+ [ OTA FLUSH   »The contents of the OTA buffer are emptied«](elpg-ota-updates.md#elpg-ota-flush-command)
+ [ OTA READ *\#bytes*   »Requests the next \# bytes from the OTA buffer« ](elpg-ota-updates.md#elpg-ota-read-command)
+ [ OTA SEEK *{address}*   »Moves the read pointer to an absolute address« ](elpg-ota-updates.md#elpg-ota-seek-command)
+ [ OTA?   »Fetches the current state of the OTA process«](elpg-ota-updates.md#elpg-otaq-command)
+ [ OTW   »Enter firmware update mode« ](elpg-ota-updates.md#elpg-otw-firmware-update-enter)
+ [ RESET   »Request a full reset of the ExpressLink internal state« ](elpg-commands.md#elpg-reset-command)
+ [ SEND*[\#] message*   »Publish msg on a topic selected from topic list« ](elpg-messaging.md#elpg-sendh-command)
+ [ SHADOW*[\#]* DELETE   »Request the deletion of a Shadow document«](elpg-iot-services.md#elpg-shadow-delete-command)
+ [ SHADOW*[\#]* DOC   »Request a Device Shadow document«](elpg-iot-services.md#elpg-shadow-doc-command)
+ [ SHADOW*[\#]* GET DELETE   »Request a Shadow delete response«](elpg-iot-services.md#elpg-shadow-get-delete-command)
+ [ SHADOW*[\#]* GET DELTA   »Retrieve a Shadow Delta message«](elpg-iot-services.md#elpg-shadow-getdelta-command)
+ [ SHADOW*[\#]* GET DOC   »Retrieve a device shadow document«](elpg-iot-services.md#elpg-shadow-get-doc-command)
+ [ SHADOW*[\#]* GET UPDATE   »Retrieve a device shadow update response«](elpg-iot-services.md#elpg-shadow-get-update-command)
+ [ SHADOW*[\#]* INIT   »Initialize communication with the Device Shadow service«](elpg-iot-services.md#elpg-shadow-init-command)
+ [ SHADOW*[\#]* SUBSCRIBE   »Subscribe to a device shadow document« ](elpg-iot-services.md#elpg-shadow-subscribe-command)
+ [ SHADOW*[\#]* UNSUBSCRIBE   »Unsubscribe to a device shadow document«](elpg-iot-services.md#elpg-shadow-unsubscribe-command)
+ [ SHADOW*[\#]* UPDATE *{new state}*   »Request a device shadow document update«](elpg-iot-services.md#elpg-shadow-update-command)
+ [ SLEEP*[\#] [duration]*   »Request to enter a low power mode«](elpg-commands.md#elpg-sleeph-command)
+ [ SUBSCRIBE*[\#]*   »Subscribe to Topic\#](elpg-messaging.md#elpg-subscribeh-command)
+ [ TIME? ⁞  Request current time information ](elpg-additional-services.md#elpg-additional-services-time-command)
+ [ UNSUBSCRIBE*[\#]*   »Unsubscribe from Topic\#« ](elpg-messaging.md#elpg-unsubscribeh-command)
+ [ WHERE? ⁞  Request location information ](elpg-additional-services.md#elpg-additional-services-where-command)

**Tables**
+ [Table 1 - Error codes](elpg-commands.md#elpg-table1)
+ [Table 2 - Configuration dictionary persistent keys](elpg-configuration-dictionary.md#elpg-table2)
+ [Table 3 - Configuration dictionary non-persistent keys](elpg-configuration-dictionary.md#elpg-table3)
+ [Table 4 - ExpressLink event codes](elpg-event-handling.md#elpg-table4)
+ [Table 5 - Reserved OTA file type codes (0-255)](elpg-ota-updates.md#elpg-table5)
+ [Table 6 - ExpressLink Defender metrics](elpg-iot-services.md#elpg-table6)