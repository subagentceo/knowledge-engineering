> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SwitchyOmega

> Connect Nimble Proxy with SwitchyOmega browser extension

SwitchyOmega is a free browser extension that lets you manage and switch between multiple proxies quickly and easily. It supports both Chrome and Firefox with an intuitive interface.

Using SwitchyOmega with Nimble, you can easily toggle proxy connections on and off, and even set up automatic rules to route specific websites through different proxies.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Install SwitchyOmega" titleSize="h3">
    Install the extension for your browser:

    * **Chrome:** [Chrome Web Store](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)
    * **Firefox:** [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/switchyomega/)

    After installation, pin the extension to your browser toolbar for easy access.
  </Step>

  <Step title="Open SwitchyOmega options" titleSize="h3">
    * Click the SwitchyOmega icon in your browser toolbar
    * Select **Options** to open the settings interface
  </Step>

  <Step title="Configure the proxy profile" titleSize="h3">
    * In the left sidebar, click on **proxy** under Profiles
    * Enter the following connection details:
      * **Protocol:** HTTPS
      * **Server:** ip.nimbleway.com
      * **Port:** 7000
    * Enter your credentials:
      * **Username:** your pipeline username
      * **Password:** your pipeline password

    In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page to get your credentials.
  </Step>

  <Step title="Apply and activate" titleSize="h3">
    * Click **Apply changes** to save your proxy settings
    * Click the SwitchyOmega icon in your toolbar
    * Select your **proxy** profile to activate the connection

    Your browser traffic will now route through Nimble's proxy network.
  </Step>
</Steps>

## Configuration options

| Parameter | Value                  | Description                |
| --------- | ---------------------- | -------------------------- |
| Protocol  | HTTPS                  | Secure proxy protocol      |
| Server    | `ip.nimbleway.com`     | Nimble proxy endpoint      |
| Port      | `7000`                 | Default proxy port         |
| Username  | Your pipeline username | From your Nimble dashboard |
| Password  | Your pipeline password | From your Nimble dashboard |

## Auto-switch rules

SwitchyOmega allows you to automatically route specific websites through different proxies:

<Steps>
  <Step title="Create multiple profiles" titleSize="h3">
    Create separate proxy profiles for different use cases (e.g., different geo-locations or pipelines):

    * Click **New profile** in the left sidebar
    * Select **Proxy Profile**
    * Configure each profile with different Nimble pipeline credentials
  </Step>

  <Step title="Configure auto-switch" titleSize="h3">
    * Click on **auto switch** in the left sidebar
    * Add rules to route specific domains through specific profiles:
      * **Condition type:** Host wildcard
      * **Condition:** `*.example.com`
      * **Profile:** Select which proxy profile to use
    * Click **Apply changes**
  </Step>

  <Step title="Enable auto-switch" titleSize="h3">
    * Click the SwitchyOmega icon in your toolbar
    * Select **auto switch** to enable automatic profile switching

    Now specific websites will automatically route through their assigned proxy profiles.
  </Step>
</Steps>

## Quick switching

Once configured, you can quickly switch between:

* **Direct** - No proxy (direct connection)
* **System Proxy** - Use system-level proxy settings
* **proxy** - Your Nimble proxy profile
* **auto switch** - Automatic rule-based switching

Just click the SwitchyOmega icon and select the desired mode.

That's all! SwitchyOmega will now manage your Nimble proxy connections.
