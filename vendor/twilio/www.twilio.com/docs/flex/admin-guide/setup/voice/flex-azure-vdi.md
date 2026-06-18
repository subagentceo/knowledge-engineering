# Flex on Azure Virtual Desktop or Windows 365 Cloud PC

## Overview

If you use Azure Virtual Desktop or Windows 365 Cloud PC environments, you can run Flex in these environments while maintaining optimal call quality.

Flex UI 2.8.5 and later improves audio quality by supporting Microsoft's [multimedia redirection (MMR)](https://learn.microsoft.com/en-us/azure/virtual-desktop/multimedia-redirection) browser extension. The Microsoft MMR extension helps your agents avoid potential latency, packet loss, and lengthy round-trip time that would otherwise occur when using Flex on Azure Virtual Desktop or Windows 365 Cloud PC. When agents use Flex on Azure Virtual Desktop or Windows 365 Cloud PC with the MMR extension installed, Flex uses the WebRTC credentials from the browser on the local device, not the browser in Azure Virtual Desktop or Windows 365 Cloud PC. That means that audio packets go directly from the customer to the Flex telephony server to the agent using Flex. Without the MMR extension, audio packets are routed to the Azure Virtual Desktop or Windows 365 Cloud PC browser before reaching the agent in Flex, and that extra step in the path can cause issues with call quality.

## Flex on Azure Virtual Desktop or Windows 365 Cloud PC architecture

Note that while the diagram refers only to Azure Virtual Desktop, the architecture is the same for Windows 365 Cloud PC.

![Diagram showing connection between agent machine, Azure Virtual Desktop server, and Twilio Programmable Voice.](https://docs-resources.prod.twilio.com/f0792485b80a2846126bfb30df47ae1e459ca64a0eed9ee7563f8e7a6df3504e.png)

1. An agent logs on to their local host.
2. The agent's device establishes a connection with the session host through the Microsoft remote desktop client.
3. In the session host, the agent accesses Flex using a browser with the Microsoft Multimedia Redirection extension installed and enabled.
4. After authentication, Flex initializes, which establishes a connection with the Twilio Programmable Voice server.
5. During a call (outbound or inbound), MMR forwards the WebRTC connection information to the local host, allowing the local host to connect directly with the Twilio Voice media server for direct exchange of media packets. The direct connection between the local host and the Twilio Voice media server improves audio quality.

## System requirements

### Flex

* For Azure Virtual Desktop: Flex UI version 2.8.5 or later
* For Windows 365 Cloud PC: Flex UI version 2.10.1 or later

### Azure Virtual Desktop or Windows 365 server

* See [Microsoft's prerequisites for using multimedia redirection](https://learn.microsoft.com/en-us/azure/virtual-desktop/multimedia-redirection?tabs=edge#prerequisites). Note that there are separate tabs at the top of the page for Azure Virtual Desktop and Windows 365. The use of Azure Virtual Desktop or Windows 365 is subject to Microsoft's terms and conditions.

### Remote device

* Your device must meet the prerequisites for the Remote Desktop app for [Azure Virtual Desktop](https://learn.microsoft.com/en-us/azure/virtual-desktop/users/connect-remote-desktop-client?tabs=macos#prerequisites) or [Windows 365](https://learn.microsoft.com/en-us/windows-365/end-user-access-cloud-pc#remote-desktop).

## Set up Flex on Azure Virtual Desktop or Windows 365 Cloud PC

To set up Flex on Azure Virtual Desktop or Windows 365 Cloud PC, complete the following steps:

1. [Set up your local Windows environment](https://learn.microsoft.com/en-us/azure/virtual-desktop/multimedia-redirection-video-playback-calls?tabs=edge\&pivots=azure-virtual-desktop#prerequisites). Note that there are separate tabs at the top of the page for Azure Virtual Desktop and Windows 365.
2. [Set up the Azure Virtual Desktop environment](https://learn.microsoft.com/en-us/azure/virtual-desktop/multimedia-redirection-video-playback-calls?tabs=edge\&pivots=azure-virtual-desktop#install-multimedia-redirection-on-session-hosts). Note that there are separate tabs at the top of the page for Azure Virtual Desktop and Windows 365.
3. Self-hosted Flex only: Upgrade the Flex UI library to a version that supports Azure Virtual Desktop or Windows 365 Cloud PC:
   1. Download Flex UI 2.8.5 or later from the NPM registry and then run the following command in your Flex project. Make sure the Flex UI version in the command matches the one that you downloaded.<br />\`npm install @twilio/flex-ui
   2. Set up call redirection for Azure virtual Desktop or Windows 365 by following the "Enable call redirection for specific domains" section of [Microsoft's "Multimedia redirection for video playback and calls in a remote session"](https://learn.microsoft.com/en-us/azure/virtual-desktop/multimedia-redirection-video-playback-calls?tabs=intune\&pivots=azure-virtual-desktop#enable-call-redirection-for-specific-domains) page. Note that there are separate tabs at the top of the page for Azure Virtual Desktop and Windows 365.
4. Validate your setup to ensure that Flex will automatically detect if you're running in a Virtual Desktop or Cloud PC environment:

   1. Log in to your Virtual Desktop or Cloud PC environment.
   2. Open the Chrome browser within the Virtual Desktop or Cloud PC environment.
   3. Open Flex and log in to your Flex instance.
   4. From Flex, place an outgoing phone call.
   5. Confirm that the MMR extension in your browser has changed to include a green phone icon. If you click it, you should see the message "A call is being redirected." These indicate that Flex can detect your Azure Virtual Desktop environment.

   If MMR does not show that the call is being redirected, see ["The MMR extension is not loaded"](#the-mmr-extension-is-not-loaded) in the troubleshooting section.

   ![Microsoft Multimedia Redirection extension not loaded with video and call redirection options.](https://docs-resources.prod.twilio.com/46da9c25c408410b62e79c6ea7fcfa653a721cac3fab722bae5d8e445164dfcb.png)

## Twilio Voice JS DSCP support

Voice Over Internet Protocol (VoIP) call quality is influenced by environmental factors, such as:

* Firewall configuration
* Network conditions
* Available bandwidth
* Browser version (for webRTC)
* Operating system
* Microphone and speaker hardware

It's important you review our [deployment best practices](https://help.twilio.com/articles/223133127-Twilio-Voice-JavaScript-SDK-Deployment-Best-Practices) and [connectivity requirements documentation](https://help.twilio.com/articles/223180888-Twilio-Voice-JavaScript-and-Mobile-SDK-Network-Connectivity-and-Bandwidth-Requirements) before taking your app to production. Browsers that support DSCP are able to tag call media packets sent by the voice client. Your router or network element can then use these tags to prioritize call media packets over other traffic on the network.

* Your router or network element must be DSCP-compliant.
* DSCP is only supported by Google Chrome.

## Known issues

* Unable to read volume levels from the front end (Microsoft MMR issue)

## Troubleshooting

### Capture logs

To capture logs from the MMR extension, open the MMR extension in your browser and select **Show Advanced Settings**. Next to **Collect logs**, click **Start**.

![MMR extension settings pane with the Collect logs option circled.](https://docs-resources.prod.twilio.com/65a35d381ad9866370b530b37cf538b92421c2634173dee9a7402d3b8fa97df8.png)

### The MMR extension is not loaded

If you followed step 4 in the [the setup instructions above](#set-up-flex-on-azure-virtual-desktop-or-windows-365-cloud-pc) to validate the Azure Virtual Desktop setup and the MMR extension is not loaded, check the following:

* Check your configurations and confirm that your environment meets the [system requirements](#system-requirements), then try again.
* If your Flex environment is self-hosted, confirm that you completed step 3 in [the setup instructions above](#set-up-flex-on-azure-virtual-desktop-or-windows-365-cloud-pc), including enabling call redirection for your domain.
* Ensure that you have not installed and enabled both the preview and GA versions of the MMR extensions. If you have both, remove the preview version.

If you have checked your environment and configuration and still have issues, contact Twilio support.

![MMR extension pane with the message The extension is not loaded.](https://docs-resources.prod.twilio.com/be97251dc4093014fe9aec6045e6a794ed4aa3b826366d7450f5f410c67ba200.png)

## Support

Microsoft and Twilio jointly support the delivery of Flex on Azure Virtual Desktop or Windows 365 Cloud PC. If you experience an issue, open a support ticket with the vendor whose product you suspect to be causing the issue.

* If the problem seems like a Flex issue, [open a support ticket with Twilio](https://help.twilio.com).
* If you suspect it's an Azure Virtual Desktop or Windows 365 issue, [open a support ticket with Microsoft](https://azure.microsoft.com/en-us/support/). You must have an active Microsoft license to receive support from Microsoft.

When Twilio or Microsoft receives the ticket, they will triage the issue and escalate it as appropriate. If they determine that the problem is caused by the other company's product, they will advise you to create a support ticket with the other company.
