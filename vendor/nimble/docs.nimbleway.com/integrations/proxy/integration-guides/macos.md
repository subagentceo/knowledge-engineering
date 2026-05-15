> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# macOS

> Connect Nimble Proxy with macOS System Preferences

macOS natively supports proxy servers like Nimble IP, allowing installed applications to use the proxy connection for their communications over the internet.

By configuring Nimble at the system level, all applications that respect system proxy settings will automatically route their traffic through Nimble's residential proxy network.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Open System Settings" titleSize="h3">
    * Click the **Apple menu** () in the top-left corner
    * Select **System Settings** (or **System Preferences** on older macOS versions)
  </Step>

  <Step title="Navigate to Network settings" titleSize="h3">
    * Click on **Network** in the sidebar
    * Select your active network connection (e.g., **Wi-Fi** or **Ethernet**) from the list
    * Click **Details...** (or **Advanced...** on older versions)
  </Step>

  <Step title="Configure proxy settings" titleSize="h3">
    * Select the **Proxies** tab

    * Enable **Secure Web Proxy (HTTPS)**

    * Enter the proxy configuration:
      * **Server:** ip.nimbleway.com
      * **Port:** 7000

    * Check **Proxy server requires password**

    * Enter your credentials:
      * **Username:** your pipeline username
      * **Password:** your pipeline password

    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page to get your credentials.
  </Step>

  <Step title="Save settings" titleSize="h3">
    * Click **OK** to close the proxy settings
    * Click **Apply** to save your network configuration

    Your secure web traffic will now route through Nimble's proxy network.
  </Step>
</Steps>

## Configuration options

| Parameter | Value                  | Description                |
| --------- | ---------------------- | -------------------------- |
| Server    | `ip.nimbleway.com`     | Nimble proxy endpoint      |
| Port      | `7000`                 | Default proxy port         |
| Username  | Your pipeline username | From your Nimble dashboard |
| Password  | Your pipeline password | From your Nimble dashboard |

## Verify your connection

To verify the proxy is working:

1. Open **Safari** or another browser
2. Visit [https://api.ipify.org](https://api.ipify.org) to check your IP address
3. The displayed IP should be different from your regular IP, confirming traffic is routed through Nimble

## Disabling the proxy

To disable the Nimble proxy:

1. Return to **System Settings** → **Network** → **Details** → **Proxies**
2. Uncheck **Secure Web Proxy (HTTPS)**
3. Click **OK** and **Apply**

<Info>
  Some applications may have their own proxy settings that override system preferences. Check individual application settings if traffic isn't routing through the proxy as expected.
</Info>

That's all! macOS will now route secure web traffic through Nimble's proxy network.
