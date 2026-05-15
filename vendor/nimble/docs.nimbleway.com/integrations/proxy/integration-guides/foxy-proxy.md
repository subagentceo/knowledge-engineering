> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# FoxyProxy

> Connect Nimble Proxy with FoxyProxy

FoxyProxy is a simple and free browser extension that lets you easily use Nimble IP on Firefox or Chrome.

While setting up your proxy server connection can be done without an extension, FoxyProxy provides a simple and flexible interface as well as additional options that browsers lack.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Sign Up & Installation " titleSize="h3">
    Installing FoxyProxy is very straightforward. \
    Simply follow the steps on your browser of choice:

    * [Chrome download page](https://chrome.google.com/webstore/detail/foxyproxy-standard/gcknhkkoolaabfmlnjonogaaifnjlfnp)
    * [Firefox download page](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/)
  </Step>

  <Step title="Authentication Settings" titleSize="h3">
    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page and click “add pipeline” to get your pipeline's proxy connection details.
    * In your new pipeline, you will find the IP address, port, username, and password.
    * Copy the proxy connection details from the Nimble user dashboard to the FoxyProxy platform.
  </Step>

  <Step title="Chrome Setup" titleSize="h3">
    1. After downloading, click the extensions button on the upper right of Chrome and pin the extension to the toolbar
    2. Next, click the FoxyProxy icon to open the quick activation menu, and select “Options” to modify the proxy settings.
    3. On the left navigation menu, go to “Proxies”.
    4. On the options menu to the right, select “Add New Proxy”.
    5. In the Proxy Settings dialog that opens, enter the following credentials:
       * Host: [ip.nimbleway.com](http://ip.nimbleway.com)
       * Port: 7000
       * Username: your pipeline username
       * Password: your pipeline password
       * Check the option to “Save Login Credentials” (click ‘OK’ on the message that pops up, explaining how FoxyProxy handles usernames and passwords)
    6. Go to the “General” tab and set a name for your Proxy (we used Nimble)
    7. There are two ways to enable the proxy:
       1. From the FoxyProxy options page, change the proxy mode from “Disable FoxyProxy” to “Use proxy *yourProfile* for all URLs
       2. Alternatively, you can use FoxyProxy’s quick menu to activate the proxy from any page. Click on the FoxyProxy icon in the toolbar, and then select your proxy profile
  </Step>

  <Step title="Firefox Setup" stepNumber={3} titleSize="h3">
    1. After downloading the add-on, Firefox will automatically add a shortcut to the toolbar. Simply click the FoxyProxy icon to open the quick activation menu, and then click “Options” to modify the proxy settings
    2. On the left navigation menu, click “Add” to create a new proxy profile
    3. In the “Add Proxy” page, set a name for this proxy setup (we used Nimble), then enter the following details:
       * Proxy IP address or DNS name: [ip.nimbleway.com](http://ip.nimbleway.com)
       * Port: 7000
       * Username: your pipeline username
       * Password: your pipeline password
    4. There are two ways to enable the proxy:
       1. From the FoxyProxy options page, change “Turn Off (Use Firefox Settings)” to the title you set for your proxy profile (we used “Nimble”)
       2. Alternatively, you can use FoxyProxy’s quick menu to activate the proxy from any page. Click on the FoxyProxy icon in the toolbar, and then select your proxy profile
  </Step>
</Steps>

That's all! VMLogin will now use proxies from Nimble IP
