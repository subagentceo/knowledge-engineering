> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Proxifier

> Connect Nimble Proxy with Proxifier

Proxifier is a network gateway that allows applications that do not support working through proxy servers to operate through a SOCKS or HTTPS proxy.

Using Proxifier with Nimble, you can selectively route specific applications through residential IPs without redirecting all your traffic through the proxy network.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Install Proxifier" titleSize="h3">
    * Download and install Proxifier from [proxifier.com](https://www.proxifier.com/)
    * Launch Proxifier after installation

    <Info>
      This guide uses Windows as an example, but macOS follows the same configuration steps.
    </Info>
  </Step>

  <Step title="Add Nimble proxy server" titleSize="h3">
    * Navigate to **Profile** → **Proxy Servers**
    * Click **Add** to create a new proxy server
    * Enter the following server details:
      * **Address:** ip.nimbleway.com
      * **Port:** 7000
      * **Protocol:** HTTPS
  </Step>

  <Step title="Configure authentication" titleSize="h3">
    * Enable the **Authentication** checkbox

    * Select **Username and Password**

    * Enter your credentials:
      * **Username:** your pipeline username
      * **Password:** your pipeline password

    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page to get your credentials.
  </Step>

  <Step title="Verify connection" titleSize="h3">
    * Click **Check** to test the connection
    * You should see a success message confirming the proxy is working
    * Click **OK** to save your configuration

    <Warning>
      We recommend you do not set Nimble IP as your default proxy server to avoid routing all traffic through the proxy unnecessarily.
    </Warning>
  </Step>
</Steps>

## Adding proxy rules

You can configure which applications use the Nimble proxy:

1. Go to **Profile** → **Proxification Rules**
2. Click **Add** to create a new rule
3. Configure the rule:
   * **Name:** Give your rule a descriptive name
   * **Applications:** Select specific applications to route through the proxy
   * **Target hosts:** Optionally specify domains or ports
   * **Action:** Select your Nimble proxy server

This allows you to route only specific applications (like browsers or scraping tools) through Nimble while keeping other traffic direct.

## DNS configuration

For optimal performance, configure DNS resolution through Nimble:

1. Go to **Profile** → **Name Resolution**
2. Select **Resolve hostnames through proxy**
3. Click **OK** to save

This ensures DNS queries are also routed through Nimble's infrastructure.

## Configuration options

| Parameter | Value                  | Description                |
| --------- | ---------------------- | -------------------------- |
| Address   | `ip.nimbleway.com`     | Nimble proxy endpoint      |
| Port      | `7000`                 | Default proxy port         |
| Protocol  | HTTPS                  | Secure proxy protocol      |
| Username  | Your pipeline username | From your Nimble dashboard |
| Password  | Your pipeline password | From your Nimble dashboard |

That's all! Proxifier will now route selected applications through Nimble's proxy network.
