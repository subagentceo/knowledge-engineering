> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# MuLogin

> Connect Nimble Proxy with MuLogin

MuLogin is a multi-session browser that helps you manage multiple online accounts from a single interface while maintaining your privacy and security.

Using MuLogin, you can create multiple virtual browser profiles that act as separate users, each with its own unique digital fingerprint. This allows you to access multiple accounts from a single device without compromising your data or leaving a trace.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Sign Up & Installation" titleSize="h3">
    * Sign up for an account at [mulogin.com](https://www.mulogin.com/)
    * Download and install the MuLogin software [here](https://www.mulogin.com/).
    * Launch MuLogin and select "Add Browser" from the right-side menu.
    * Locate the "Proxy Settings" section and choose "HTTP" as the protocol type.
  </Step>

  <Step title="Authentication Settings" titleSize="h3">
    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page and click "add pipeline" to get your pipeline's proxy connection details.
    * In your new pipeline, you will find the IP address, port, username, and password.
    * Copy the proxy connection details from the Nimble user dashboard to the MuLogin platform.
  </Step>

  <Step title="Configuration" stepNumber={3} titleSize="h3">
    Configure the proxy using the following information:

    * Proxy type: HTTP
    * IP address/Host: [ip.nimbleway.com](http://ip.nimbleway.com)
    * Port: 7000
    * Username: your pipeline username
    * Password: your pipeline password

    Click "Check the network" to validate your proxy connection.
  </Step>
</Steps>

That's all! MuLogin will now use proxies from Nimble IP.
