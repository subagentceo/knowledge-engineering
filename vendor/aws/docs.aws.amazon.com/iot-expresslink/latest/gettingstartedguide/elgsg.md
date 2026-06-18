

# Getting started with AWS IoT ExpressLink
<a name="elgsg"></a>

The following sections will guide you through the required steps to connect your AWS IoT ExpressLink Evaluation Kit to the cloud to send and receive data directly with your AWS account. For module specific guides, see the Getting Started Guide for your specific AWS IoT ExpressLink hardware module in the [AWS Partner Device Catalog](https://partners.amazonaws.com/qualified-devices).

If your ExpressLink module manufacturer supplies an Evaluation Kit, you will want to follow the specific steps provided there. Also, the general steps you follow for a manufacturer-specific Evaluation Kit are provided in section "11.2.1 Run the Quick Connect demo application" of the [AWS IoT ExpressLink Programmer's Guide ](https://docs.aws.amazon.com/iot-expresslink/latest/programmersguide/elpg-provisioning.html).

If you have questions or issues that are not answered here, please visit the [AWS re:Post for AWS IoT ExpressLink](https://repost.aws/tags/TADqOo0ODORl2pC69DWwUFug/aws-iot-expresslink) page.

**Topics**
+ [Set up your host machine](#elgsg-host-app-set-up)
+ [AWS account set up and console login](elgsg-set-up.md)
+ [Register an AWS IoT ExpressLink module](elgsg-register-account.md)
+ [Connect and interact with AWS Cloud.](elgsg-interact-with-cloud.md)
+ [Perform a firmware OTA update](elgsg-setup-ota-update.md)

## Set up your host machine
<a name="elgsg-host-app-set-up"></a>

AWS IoT ExpressLink evaluation kits can be connected to a host machine serial interface using a terminal application.

**Prerequisites**: To establish a serial interface connection between your host machine and the evaluation kit, you must install the corresponding USB to UART bridge Virtual Communication Port drivers. Refer to your hardware module's *Getting Started Guide* for any specific requirements.

1. Open a terminal application for your host machine (for example, TeraTerm for Windows, CoolTerm for Mac) and select the port corresponding to the evaluation kit. 

1. Configure the terminal application with the following settings:

   ```
   Baudrate:     115,200 
   Bits:          8 
   Parity:        None
   Stop:          1
   Flow control:  None
   Local Echo:    Yes
   End of Line:   Line Feed
   ```

1. To check your connection, enter the following command from the terminal:

   ```
   AT
   ```

   If you receive the answer 'OK', then you've successfully connected the evaluation kit to your host machine. 

Keep the terminal window open. You'll use the terminal later in this procedure.