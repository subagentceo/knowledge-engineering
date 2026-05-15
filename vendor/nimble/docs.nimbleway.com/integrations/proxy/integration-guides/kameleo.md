> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Kameleo

> Connect Nimble Proxy with Kameleo

Kameleo is a technology that allows you to browse the internet anonymously through stealth browsing. It has a range of tools, including a proprietary API and Selenium Stealth WebDriver, that can automate tasks and create multiple accounts while keeping your identity hidden.

The tool is supported by residential and mobile proxy networks, and this guide will show you how to use Nimble's proxy networks with Kameleo.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Sign Up & Installation " titleSize="h3">
    * Sign up for an account at [Kameleo.io](http://Kameleo.io)
    * Download and install the Kameleo software [here](https://kameleo.io/?ref=13784).
    * Navigate to the "New Profile" option on the left side of the screen.
    * Choose the browser and OS footprint you wish to use.
  </Step>

  <Step title="Authentication Settings" titleSize="h3">
    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page and click “add pipeline” to get your pipeline's proxy connection details.
    * In your new pipeline, you will find the IP address, port, username, and password.
    * Copy the proxy connection details from the Nimble user dashboard to the Kameleo platform.
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

That's all! Kameleo will now use proxies from Nimble IP
