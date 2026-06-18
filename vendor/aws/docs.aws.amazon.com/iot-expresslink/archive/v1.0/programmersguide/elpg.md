

# AWS IoT ExpressLink programmer's guide v1.0
<a name="elpg"></a>

This document defines the Application Programming Interface (API) that all AWS IoT ExpressLink compliant connectivity modules are required to implement to connect any host processor to the AWS cloud. 

If you have questions or issues that are not answered here, please visit the [AWS re:Post for AWS IoT ExpressLink](https://repost.aws/tags/TADqOo0ODORl2pC69DWwUFug/aws-io-t-express-link) page.

**Topics**
+ [1 Hardware](elpg-hardware.md)
+ [2 Run states](elpg-run-states.md)
+ [3 ExpressLink commands](elpg-commands.md)
+ [4 Messaging](elpg-messaging.md)
+ [5 Configuration Dictionary](elpg-configuration-dictionary.md)
+ [6 Status dictionary](elpg-status-dictionary.md)
+ [7 Event handling](elpg-event-handling.md)
+ [8 ExpressLink module updates](elpg-ota-updates.md)
+ [9 Additional services](elpg-additional-services.md)
+ [10 Provisioning](elpg-provisioning.md)

 

**AWS IoT ExpressLink commands**
+ [ AT ⁞  Communication test](elpg-commands.md#elpg-at-command)
+ [ CONF KEY=*{value}* ⁞  Assignment](elpg-configuration-dictionary.md#elpg-assignment-conf)
+ [ CONF {certificate}=pem ⁞  Special certificate input formatting option ](elpg-ota-updates.md#elpg-ota-conf-command)
+ [ CONF? *key* ⁞  Read the value of a configuration parameter](elpg-configuration-dictionary.md#elpg-retrieval-conf)
+ [ CONF? *{certificate} pem* ⁞  Special certificate output formatting option ](elpg-ota-updates.md#elpg-ota-confq-command)
+ [ CONFMODE *[parameter]* ⁞  Activate modal credential entry ](elpg-commands.md#elpg-confmode-command)
+ [ CONNECT ⁞  Explicitly request a module to connect to AWS IoT Core ](elpg-commands.md#elpg-connect-command)
+ [ CONNECT? ⁞  Request the connection status](elpg-commands.md#elpg-connectq-command)
+ [ DIAG *{command} [optional parameters]* ⁞  Perform a diagnostic command ](elpg-event-handling.md#elpg-diag-command)
+ [ DISCONNECT ⁞  Leave the connected state and enter the active state](elpg-commands.md#elpg-disconnect-command)
+ [ EVENT? ⁞  Request the next event in the queue](elpg-event-handling.md#elpg-eventq-command)
+ [ FACTORY\_RESET ⁞  Request a factory reset of the ExpressLink module](elpg-commands.md#elpg-factory-reset-command)
+ [ GET ⁞  Request next message pending on any topic](elpg-messaging.md#elpg-get-command)
+ [ GET*{\#}* ⁞  Request next message pending on the indicated topic](elpg-messaging.md#elpg-geth-command)
+ [ GET0 ⁞  Request next message pending on an unassigned topic](elpg-messaging.md#elpg-get0-command)
+ [ OTA ACCEPT ⁞  Allow the OTA operation to proceed ](elpg-ota-updates.md#elpg-ota-accept-command)
+ [ OTA APPLY ⁞  Authorize the ExpressLink module to apply the new image. ](elpg-ota-updates.md#elpg-ota-apply-command)
+ [ OTA CLOSE ⁞  The host OTA operation is completed](elpg-ota-updates.md#elpg-ota-close-command)
+ [ OTA FLUSH ⁞  The contents of the OTA buffer are emptied](elpg-ota-updates.md#elpg-ota-flush-command)
+ [ OTA READ *\#bytes* ⁞  Requests the next \# bytes from the OTA buffer ](elpg-ota-updates.md#elpg-ota-read-command)
+ [ OTA SEEK *{address}* ⁞  Moves the read pointer to an absolute address ](elpg-ota-updates.md#elpg-ota-seek-command)
+ [ OTA? ⁞  Fetches the current state of the OTA process](elpg-ota-updates.md#elpg-otaq-command)
+ [ OTW ⁞  Enter firmware update mode ](elpg-ota-updates.md#elpg-otw-firmware-update-enter)
+ [ RESET ⁞  Request a full reset of the ExpressLink internal state ](elpg-commands.md#elpg-reset-command)
+ [ SEND *{topic} message* ⁞  Publish msg on the specified topic](elpg-messaging.md#elpg-send-command)
+ [ SEND*{\#} message* ⁞  Publish msg on a topic selected from topic list ](elpg-messaging.md#elpg-sendh-command)
+ [ SLEEP*{\#} [duration]* ⁞  Request to enter a low power mode](elpg-commands.md#elpg-sleeph-command)
+ [ SUBSCRIBE*{\#}* ⁞  Subscribe to Topic\#](elpg-messaging.md#elpg-subscribeh-command)
+ [ TIME? ⁞  Request current time information ](elpg-additional-services.md#elpg-timeq-command)
+ [ UNSUBSCRIBE*{\#}* ⁞  Unsubscribe from Topic\# ](elpg-messaging.md#elpg-unsubscribeh-command)
+ [ WHERE? ⁞  Request location information ](elpg-additional-services.md#elpg-whereq-command)

**Tables**
+ [Table 1 - Error codes](elpg-commands.md#elpg-table1)
+ [Table 2 - Configuration dictionary persistent keys](elpg-configuration-dictionary.md#elpg-table2)
+ [Table 3 - Configuration dictionary non-persistent keys](elpg-configuration-dictionary.md#elpg-table3)
+ [Table 4 - ExpressLink event codes](elpg-event-handling.md#elpg-table4)
+ [Table 5 - Reserved OTA file type codes (0-255)](elpg-ota-updates.md#elpg-table5)