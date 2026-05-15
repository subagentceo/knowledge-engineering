> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Incogniton

> Connect Nimble Proxy with Incogniton

Incogniton is a multi-session browser that helps you manage multiple online accounts from a single interface while maintaining your privacy and security.

Using Incogniton, you can create multiple virtual browser profiles that act as separate users, each with its own unique digital fingerprint. This allows you to access multiple accounts from a single device without compromising your data or leaving a trace.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Sign Up & Installation" titleSize="h3">
    * Sign up for a free account at [incogniton.com](http://incogniton.com).
    * Download and install the Incogniton software [here](https://incogniton.com/?utm_source=proxy\&utm_campaign=nimbleway).
    * Navigate to the "Profile Management" option on the left side of the screen.
    * Click the "New profile" button in the top right corner.
  </Step>

  <Step title="Authentication Settings" titleSize="h3">
    * From the left navigation, select "Proxy" and choose the "Proxy type" from the options provided (HTTP, SOCK4, or SOCK5). **HTTP is available with the Nimble IP**.
    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page and click “add pipeline” to get your pipeline's proxy connection details.
    * In your new pipeline, you will find the IP address, port, username, and password.
    * Copy the proxy connection details from the Nimble user dashboard to the Incogniton platform.
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

That's all! Your Incogniton browser will now use proxies from Nimble IP.
