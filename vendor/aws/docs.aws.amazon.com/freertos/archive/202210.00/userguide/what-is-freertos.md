

# What is FreeRTOS?
<a name="what-is-freertos"></a>

**Important**  <a name="archive-message"></a>
This is an archived version of the FreeRTOS User Guide for use with FreeRTOS release 202210.00. For the latest version of this document, see the [FreeRTOS User Guide](../../../latest/userguide/index.html).

Developed in partnership with the world's leading chip companies over a 15-year period, and now downloaded every 170 seconds, FreeRTOS is a market-leading real-time operating system (RTOS) for microcontrollers and small microprocessors. Distributed freely under the MIT open source license, FreeRTOS includes a kernel and a growing set of libraries suitable for use across all industry sectors. FreeRTOS is built with an emphasis on reliability and ease of use.

FreeRTOS includes libraries for connectivity, security, and over-the-air (OTA) updates. FreeRTOS also includes demo applications that show FreeRTOS features on [qualified boards](https://devices.amazonaws.com/search?page=1&sv=freertos).

FreeRTOS is an open-source project. You can download the source code, contribute changes or enhancements, or report issues on the GitHub site at [ https://github.com/FreeRTOS/FreeRTOS](https://github.com/FreeRTOS/FreeRTOS).

We release FreeRTOS code under the MIT open source license, so you can use it in commercial and personal projects.

We also welcome contributions to the FreeRTOS documentation (*FreeRTOS User Guide*, *FreeRTOS Porting Guide*, and *FreeRTOS Qualification Guide*). To view the markdown source for the documentation, see [https://github.com/awsdocs/aws-freertos-docs](https://github.com/awsdocs/aws-freertos-docs). It's released under the Creative Commons (CC BY-ND) license.

**Topics**
+ [Download FreeRTOS source code](#freertos-mds-projects-github)
+ [FreeRTOS versions](freertos-versioning.md)
+ [FreeRTOS architecture](freertos-architecture.md)
+ [FreeRTOS-qualified hardware platforms](#freertos-hardware)
+ [Development workflow](#development-workflow)
+ [Additional resources](#resources)

## Download FreeRTOS source code
<a name="freertos-mds-projects-github"></a>

Download the latest FreeRTOS and Long Term Support (LTS) packages from the Downloads page on [freertos.org](https://www.freertos.org/).

## FreeRTOS-qualified hardware platforms
<a name="freertos-hardware"></a>

The following hardware platforms are qualified for FreeRTOS:
+ [ ATECC608A Zero Touch Provisioning Kit for AWS IoT](https://devices.amazonaws.com/detail/a3G0L00000AANvOUAX/ATECC608a-Zero-Touch-Provisioning-Kit-for-AWS-IoT)
+ [Cypress CYW943907AEVAL1F Development Kit](https://devices.amazonaws.com/detail/a3G0L00000AAPg0UAH/CYW943907AEVAL1F)
+ [Cypress CYW954907AEVAL1F Development Kit](https://devices.amazonaws.com/detail/a3G0L00000AAPg5UAH/CYW954907AEVAL1F)
+ [ Cypress CY8CKIT-064S0S2-4343W Kit](https://www.cypress.com/documentation/development-kitsboards/psoc-64-standard-secure-aws-wi-fi-bt-pioneer-kit-cy8ckit)
+ [Espressif ESP32-DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-DevKitC)
+ [Espressif ESP-WROVER-KIT](https://devices.amazonaws.com/detail/a3G0L00000AANtlUAH/ESP-WROVER-KIT)
+ [Espressif ESP-WROOM-32SE](https://devices.amazonaws.com/detail/a3G0h0000077nRtEAI/ESP32-WROOM-32SE)
+ [Espressif ESP32-S2-Saola-1](https://devices.amazonaws.com/detail/a3G0h00000AkFngEAF/ESP32-S2-Saola-1)
+ [ Infineon XMC4800 IoT Connectivity Kit](https://devices.amazonaws.com/detail/a3G0L00000AANsbUAH/XMC4800-IoT-Amazon-FreeRTOS-Connectivity-Kit-WiFi)
+ [Marvell MW320 AWS IoT Starter Kit](https://devices.amazonaws.com/detail/a3G0h000000OaRnEAK/Marvell-MW320)
+ [Marvell MW322 AWS IoT Starter Kit](https://devices.amazonaws.com/detail/a3G0h000000OblKEAS/Marvell-MW322)
+ [MediaTek MT7697Hx Development Kit](https://devices.amazonaws.com/detail/a3G0L00000AAOmPUAX/MT7697Hx-Development-Kit)
+ [ Microchip Curiosity PIC32MZEF Bundle](https://devices.amazonaws.com/detail/a3G0L00000AANscUAH/Curiosity-PIC32MZ-EF-Amazon-FreeRTOS-Bundle)
+ [Nordic nRF52840-DK](https://devices.amazonaws.com/detail/a3G0L00000AANtrUAH/nRF52840-Development-Kit)
+ [NuMaker-IoT-M487](https://devices.amazonaws.com/detail/a3G0h000000Tg9cEAC/NuMaker-IoT-M487)
+ [NXP LPC54018 IoT Module](https://devices.amazonaws.com/detail/a3G0L00000AANtAUAX/LPC54018-IoT-Solution)
+ [ OPTIGA Trust X Security Solution](https://devices.amazonaws.com/detail/a3G0h000007712QEAQ/OPTIGA%E2%84%A2-Trust-X-Security-Solution)
+ [ Renesas RX65N RSK IoT Module](https://devices.amazonaws.com/detail/a3G0L00000AAOkeUAH/Renesas-Starter-Kit+-for-RX65N-2MB)
+ [ STMicroelectronicsSTM32L4 Discovery Kit IoT Node](https://devices.amazonaws.com/detail/a3G0L00000AANsWUAX/STM32L4-Discovery-Kit-IoT-Node)
+ [ Texas Instruments CC3220SF-LAUNCHXL](https://devices.amazonaws.com/detail/a3G0L00000AANtaUAH/SimpleLink-Wi-Fi®-CC3220SF-Wireless-Microcontroller-LaunchPad-Development-Kit)
+ Microsoft Windows 7 or later, with at least a dual core and a hard-wired Ethernet connection
+ [Xilinx Avnet MicroZed Industrial IoT Kit](https://devices.amazonaws.com/detail/a3G0L00000AANtqUAH/MicroZed-IIoT-Bundle-with-Amazon-FreeRTOS)

Qualified devices are also listed on the [AWS Partner Device Catalog](https://devices.amazonaws.com/search?page=1&sv=freertos).

For information about qualifying a new device, see the [FreeRTOS Qualification Guide](https://docs.aws.amazon.com/freertos/latest/qualificationguide/).

## Development workflow
<a name="development-workflow"></a>

You start development by downloading FreeRTOS. You unzip the package and import it into your IDE. You can then develop an application on your selected hardware platform and manufacture and deploy these devices using the development process appropriate for your device. Deployed devices can connect to the AWS IoT service or AWS IoT Greengrass as part of a complete IoT solution.

![Workflow diagram showing steps to develop and deploy IoT applications using FreeRTOS.](http://docs.aws.amazon.com/freertos/archive/202210.00/userguide/images/afr-getting-started-workflow.png)


## Additional resources
<a name="resources"></a>

These resources might be helpful to you.
+ For additional [FreeRTOS Documentation](https://www.freertos.org/Documentation/RTOS_book.html), see [freertos.org](https://www.freertos.org).
+ For questions about FreeRTOS for the FreeRTOS engineering team, you can open an issue [on the FreeRTOS GitHub page](https://github.com/aws/amazon-freertos/issues).
+ For technical questions about FreeRTOS, see the [FreeRTOS Community Forums](https://forums.freertos.org/).
+ For more information about connecting devices to AWS IoT, see [Device Provisioning](https://docs.aws.amazon.com/iot/latest/developerguide/iot-provision.html) in the [AWS IoT Core Developer Guide](https://docs.aws.amazon.com/iot/latest/developerguide).
+ For technical support for AWS, see [AWS Support Center](https://aws.amazon.com/support).
+ For questions about AWS billing, account services, events, abuse, or other issues with AWS, see the [Contact Us](https://aws.amazon.com/contact-us/) page.