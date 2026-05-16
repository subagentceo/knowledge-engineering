# Flex UI Requirements

## Overview

Review the hardware, software, and network requirements for running Flex UI to make sure your environment meets these standards.

## Hardware requirements

To comfortably run the Flex UI, an agent's computer must have the following:

|             | CPU   | RAM  | Screen resolution |
| ----------- | ----- | ---- | ----------------- |
| **Minimum** | 2 Ghz | 2 GB | 1024x768          |

## Software requirements

| **Requirement**      | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operating system** | <ul><li>Windows 10 and 11</li><li>MacOS</li><li>Linux Ubuntu or Mint 64-bit</li></ul>                                                                                                                                                                                                                                                                                                                                                                                |
| **Browser**          | Use an up-to-date version of your preferred browser:<br /><ul><li>[Google Chrome](https://www.google.com/chrome/)</li><li>[Microsoft Edge](https://www.microsoft.com/edge)<br />**Note:** Only the Flex UI [Agent Desktop](https://flex.twilio.com/agent-desktop/) is supported in Edge.</li></ul> Make sure you set your browser to full screen or a browser width that's at least 1024. Smaller window sizes may cause some Flex UI pages not to appear correctly. |

## Network requirements

This table shows the minimum recommended bandwidth for running Flex UI without significant effect on performance.

|                     | **Bandwidth** | **Packets dropped** | **Delay** |
| ------------------- | ------------- | ------------------- | --------- |
| **Download/Upload** | 200 kb/s      | 1-3%                | 200 ms    |

This table shows the domains that you need to add to your allowlists for VPNs and proxies to ensure proper access to Flex UI.

| **Domain**                                 | **Purpose**                                                                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **`*.twilio.com`**                         | Used by a variety of Twilio Services, including ones related to Flex.                                                                  |
| **`*.ytica.com`**                          | Used by Flex Insights.                                                                                                                 |
| **`*.twiliocdn.com`**                      | Used to serve static assets that we provide. This is commonly used for items such as SDK versions or standard media files.             |
| **`*.twil.io`**                            | Used by Twilio Functions product. It's standard practice for many of our customers to use a Twilio Function and access them from Flex. |
| **`*.segment.com`** and **`*.segment.io`** | Used to provide telemetry for Flex.                                                                                                    |
