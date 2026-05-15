> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# iOS

> Connect Nimble Proxy with iPhone and iPad

Setting up iOS to use Nimble IP is simple, straightforward, and requires no third-party apps. iOS natively supports proxy configuration for Wi-Fi connections.

By configuring Nimble on your iOS device, all network traffic on that Wi-Fi connection will route through Nimble's residential proxy network.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Open Wi-Fi settings" titleSize="h3">
    * Open the **Settings** app on your iPhone or iPad
    * Tap **Wi-Fi**
    * Tap the **info icon** (ⓘ) next to your connected Wi-Fi network
  </Step>

  <Step title="Configure proxy settings" titleSize="h3">
    * Scroll down to the bottom of the network details
    * Tap **Configure Proxy**
    * Select **Manual**
  </Step>

  <Step title="Enter Nimble proxy details" titleSize="h3">
    Enter the following configuration:

    * **Server:** ip.nimbleway.com
    * **Port:** 7000
    * **Authentication:** Toggle ON
    * **Username:** your pipeline username
    * **Password:** your pipeline password

    In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page to get your credentials.
  </Step>

  <Step title="Save settings" titleSize="h3">
    * Tap **Save** in the top-right corner
    * Your device will now route traffic through Nimble's proxy network

    <Info>
      The proxy configuration applies only to this specific Wi-Fi network. You'll need to repeat the setup for each Wi-Fi network where you want to use Nimble.
    </Info>
  </Step>
</Steps>

## Configuration options

| Parameter      | Value                  | Description                      |
| -------------- | ---------------------- | -------------------------------- |
| Server         | `ip.nimbleway.com`     | Nimble proxy endpoint            |
| Port           | `7000`                 | Default proxy port               |
| Authentication | ON                     | Enable credential authentication |
| Username       | Your pipeline username | From your Nimble dashboard       |
| Password       | Your pipeline password | From your Nimble dashboard       |

## Verify your connection

To verify the proxy is working:

1. Open **Safari** or another browser
2. Visit [https://api.ipify.org](https://api.ipify.org) to check your IP address
3. The displayed IP should be different from your regular IP, confirming traffic is routed through Nimble

## Disabling the proxy

To disable the Nimble proxy:

1. Go to **Settings** → **Wi-Fi**
2. Tap the **info icon** (ⓘ) next to your Wi-Fi network
3. Tap **Configure Proxy**
4. Select **Off**
5. Tap **Save**

## Important notes

* **Per-network configuration:** Proxy settings are tied to specific Wi-Fi networks. If you connect to a different network, you'll need to configure the proxy again.
* **Cellular data:** This configuration only affects Wi-Fi traffic. Cellular data connections are not routed through the proxy.
* **All traffic:** Once enabled, all device traffic on that Wi-Fi network routes through Nimble, including apps and system services.

That's all! Your iOS device will now route Wi-Fi traffic through Nimble's proxy network.
