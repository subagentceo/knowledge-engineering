> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# VMLogin

> Connect Nimble Proxy with VMLogin

With VMLogin's virtual browsing profiles, you can use physical devices to access and manage multiple online accounts while also benefiting from features like anti-association and fingerprint protection.

These virtual profiles help you protect your online identity and enhance the security of your online accounts.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Sign Up & Installation " titleSize="h3">
    * Sign up for an account at [VMLogin](https://www.vmlogin.us/?ref=nimble)
    * Download and install the VMLogin software [here.](https://www.vmlogin.us/?ref=nimble)
    * Launch VMLogin and create a new browser profile.
    * Click "Get random profile" to generate a new virtual browsing profile.
    * Customize your profile by selecting the settings that best suit you, including the operating system, screen resolution, language, WebGL vendor, time zone, and media device fingerprint.
  </Step>

  <Step title="Authentication Settings" titleSize="h3">
    * Fill in the Nimble IP proxy info in the setting proxy server window (don't forget to check "enable proxy server").
    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page and click “add pipeline” to get your pipeline's proxy connection details.
    * In your new pipeline, you will find the IP address, port, username, and password.
    * Copy the proxy connection details from the Nimble user dashboard to the VMLogin platform.
  </Step>

  <Step title="Configuration" stepNumber={3} titleSize="h3">
    Configure the proxy using the following information:

    * Proxy type: HTTP
    * IP address/Host: [ip.nimbleway.com](http://ip.nimbleway.com)
    * Port: 7000
    * Username: your pipeline username
    * Password: your pipeline password
  </Step>
</Steps>

That's all! VMLogin will now use proxies from Nimble IP
