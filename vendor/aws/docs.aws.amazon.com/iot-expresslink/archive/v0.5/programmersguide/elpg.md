

# AWS IoT ExpressLink programmer's guide v0.5
<a name="elpg"></a>

**Topics**
+ [1 Overview](elpg-overview.md)
+ [2 Run states](elpg-run-states.md)
+ [3 ExpressLink commands](elpg-commands.md)
+ [4 Messaging](elpg-messaging.md)
+ [5 Configuration Dictionary](elpg-configuration-dictionary.md)
+ [6 Event handling](elpg-event-handling.md)
+ [7 ExpressLink module OTA updates](elpg-ota-updates.md)
+ [8 AWS IoT Services](elpg-iot-services.md)
+ [9 Additional services](elpg-additional-services.md)

 

**AWS IoT ExpressLink commands**
+ [AT](elpg-commands.md#elpg-at-command)
+ [CONF](elpg-configuration-dictionary.md#elpg-conf-command)
+ [CONF {certificate key}=pem](elpg-configuration-dictionary.md#elpg-conf-command)
+ [CONF?](elpg-configuration-dictionary.md#elpg-confq-command)
+ [CONF? {certificate} pem](elpg-configuration-dictionary.md#elpg-confq-command)
+ [CONFMODE](elpg-commands.md#elpg-confmode-command)
+ [CONNECT](elpg-commands.md#elpg-connect-command)
+ [CONNECT?](elpg-commands.md#elpg-connectq-command)
+ [DEFENDER](elpg-iot-services.md#elpg-defender-command)
+ [DIAG](elpg-event-handling.md#elpg-diag-command)
+ [DISCONNECT](elpg-commands.md#elpg-disconnect-command)
+ [EVENT?](elpg-event-handling.md#elpg-eventq-command)
+ [FACTORY\_RESET](elpg-commands.md#elpg-factory-reset-command)
+ [GET](elpg-messaging.md#elpg-get-command)
+ [GET{\#}](elpg-messaging.md#elpg-geth-command)
+ [GET0](elpg-messaging.md#elpg-get0-command)
+ [JOB](elpg-iot-services.md#elpg-job-command)
+ [OTA APPLY](elpg-ota-updates.md#elpg-ota-apply-command)
+ [OTA CLOSE](elpg-ota-updates.md#elpg-ota-close-command)
+ [OTA FLUSH](elpg-ota-updates.md#elpg-ota-flush-command)
+ [OTA READ](elpg-ota-updates.md#elpg-ota-read-command)
+ [OTA SEEK](elpg-ota-updates.md#elpg-ota-seek-command)
+ [OTA?](elpg-ota-updates.md#elpg-otaq-command)
+ [RESET](elpg-commands.md#elpg-reset-command)
+ [SEND ](elpg-messaging.md#elpg-send-command)
+ [SHADOW](elpg-iot-services.md#elpg-shadow-command)
+ [SLEEP\#](elpg-commands.md#elpg-sleeph-command)
+ [SUBSCRIBE\#](elpg-messaging.md#elpg-subscribeh-command)
+ [TIME?](elpg-additional-services.md#elpg-timeq-command)
+ [UNSUBSCRIBE\#](elpg-messaging.md#elpg-unsubscribeh-command)
+ [WHERE?](elpg-additional-services.md#elpg-whereq-command)

**Tables**
+ [Table 1 - Error codes](elpg-commands.md#elpg-table1)
+ [Table 2 - Configuration Dictionary Persistent Keys](elpg-configuration-dictionary.md#elpg-table2)
+ [Table 3 - Configuration Dictionary Non-persistent Keys](elpg-configuration-dictionary.md#elpg-table3)
+ [Table 4 - ExpressLink event codes](elpg-event-handling.md#elpg-table4)
+ [Table 5 - Reserved OTA file type codes (0-255)](elpg-ota-updates.md#elpg-table5)
+ [Table 6 - ExpressLink Defender metrics](elpg-iot-services.md#elpg-table6)