> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Windows

> Connect Nimble Proxy with Windows System Settings

Windows 10 and later natively support proxy servers like Nimble IP. The operating system manages server and port settings, while each application handles its own authentication credentials.

By configuring Nimble at the system level, applications that respect system proxy settings will route their traffic through Nimble's residential proxy network.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Open Proxy Settings" titleSize="h3">
    * Press the **Windows key** and search for "proxy settings"
    * Or navigate to **Settings** → **Network & Internet** → **Proxy**
  </Step>

  <Step title="Configure Manual Proxy" titleSize="h3">
    * Scroll down to **Manual proxy setup**
    * Click **Set up** (or toggle **Use a proxy server** to ON on older Windows versions)
    * Enter the proxy configuration:
      * **Proxy IP address:** ip.nimbleway.com
      * **Port:** 7000
    * Click **Save**
  </Step>

  <Step title="Enter credentials in applications" titleSize="h3">
    Windows 10+ requires applications to manage proxy authentication individually. When you access a website through your browser, you'll receive a prompt requesting your Nimble credentials:

    * **Username:** your pipeline username
    * **Password:** your pipeline password

    In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page to get your credentials.

    <Info>
      Most browsers will remember your credentials after the first entry, so you won't need to re-enter them for each request.
    </Info>
  </Step>
</Steps>

## Configuration options

| Parameter        | Value                  | Description                |
| ---------------- | ---------------------- | -------------------------- |
| Proxy IP address | `ip.nimbleway.com`     | Nimble proxy endpoint      |
| Port             | `7000`                 | Default proxy port         |
| Username         | Your pipeline username | From your Nimble dashboard |
| Password         | Your pipeline password | From your Nimble dashboard |

## Alternative: IP allowlisting

Instead of using username/password authentication, you can allowlist your IP address:

1. Log in to your [Nimble Dashboard](https://app.nimbleway.com)
2. Navigate to your Pipeline settings
3. Add your public IP address to the allowlist
4. Connect to the proxy without credentials

This is useful for automated systems or when you prefer not to enter credentials.

## Geo-targeting

To route requests through a specific country, modify your username:

```
your-username-country-us    # Route through US
your-username-country-gb    # Route through UK
your-username-country-de    # Route through Germany
```

## Disabling the proxy

To disable the Nimble proxy:

1. Return to **Settings** → **Network & Internet** → **Proxy**
2. Toggle **Use a proxy server** to OFF
3. Or click **Set up** and disable the proxy

That's all! Windows will now route web traffic through Nimble's proxy network.
