> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Android

> Connect Nimble Proxy with Android

Android is by far the most popular mobile OS on the planet, with upwards of 70% market share.

Connecting an Android device to Nimble IP is easy and straightforward, with no 3rd-party apps needed!

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Authentication Settings" titleSize="h3">
    * Fill in the Nimble IP proxy info in the setting proxy server window (don't forget to check "enable proxy server").
    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page and click “add pipeline” to get your pipeline's proxy connection details.
    * In your new pipeline, you will find the IP address, port, username, and password.
    * Copy the proxy connection details from the Nimble user dashboard to the VMLogin platform.
  </Step>

  <Step title="Wi-Fi Setup" stepNumber={3} titleSize="h3">
    1. To get started, open your device's settings, and then Internet/Network settings.
    2. Next, click on the network you’re currently connected to in order to view its properties.
    3. Click on the pencil at the top right to edit the network’s settings, and then on “Advanced options”.
    4. Scroll down until you see “Proxy”. Set your proxy settings to manual. A few new fields will be added, including “Proxy hostname” and “Proxy port” :
       * Hostname: [ip.nimbleway.com](http://ip.nimbleway.com)
       * Port: 7000
    5. At this point, your phone will begin sending your requests through Nimble IP, but you still need to authenticate your device. To do so, open Chrome and browse to any website. You’ll immediately be asked to sign in with a username and password :
       * Username: your pipeline username
       * Password: your pipeline password
    6. Click Sign in, and you’re done!
  </Step>

  <Step title="Cellular Setup" titleSize="h3">
    1. Open your device's settings, and then click on Mobile Networks.
    2. Next, click on “Access Point Names”, or on some devices APNs.
    3. Click on the currently active APN.
    4. Enter in the following details:
       * IP address/Host: [ip.nimbleway.com](http://ip.nimbleway.com)
       * Port: 7000
       * Username: your pipeline username
       * Password: your pipeline password
  </Step>
</Steps>

<Note>
  Because Android is used by many manufacturers, the process may be slightly different on your device. Furthermore, different manufacturers will allow different apps to use proxies, so be sure to check that the app you’d like to use supports proxies.
</Note>

Congratulations! You’ve connected your Android device, and requests will now be routed through Nimble IP.
