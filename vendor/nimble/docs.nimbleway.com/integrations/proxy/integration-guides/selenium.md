> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Selenium

> Connect Nimble Proxy with Selenium

Selenium is a powerful browser automation framework used for web testing, scraping, and automating repetitive browser tasks. It supports multiple programming languages and browsers.

By integrating Nimble's proxy network with Selenium, you can route your automated browser requests through residential IPs, enabling access to geo-restricted content and avoiding IP-based blocking.

## Prerequisites

* Node.js installed on your system
* Nimble account with proxy credentials

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Install dependencies" titleSize="h3">
    Install Selenium WebDriver and the proxy-chain package:

    ```bash theme={"system"}
    npm install selenium-webdriver proxy-chain
    ```
  </Step>

  <Step title="Get your proxy credentials" titleSize="h3">
    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page and click "add pipeline" to get your pipeline's proxy connection details.
    * In your new pipeline, you will find the IP address, port, username, and password.
    * Your proxy URL format will be: `http://username:password@ip.nimbleway.com:7000`
  </Step>

  <Step title="Implement the proxy connection" titleSize="h3">
    Use the following code to connect Selenium through Nimble's proxy:

    ```javascript theme={"system"}
    const { Builder } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const proxyChain = require('proxy-chain');

    (async () => {
      // Replace with your Nimble pipeline credentials
      const proxyUrl = 'http://YOUR_USERNAME:YOUR_PASSWORD@ip.nimbleway.com:7000';

      // Anonymize the proxy URL (handles authentication)
      const anonymizedProxy = await proxyChain.anonymizeProxy(proxyUrl);

      // Configure Chrome options with proxy
      const options = new chrome.Options();
      options.addArguments(`--proxy-server=${anonymizedProxy}`);
      options.addArguments('--no-sandbox');
      options.addArguments('--disable-setuid-sandbox');

      // Build the WebDriver
      const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

      try {
        // Navigate to your target URL
        await driver.get('https://example.com');

        // Get page title
        const title = await driver.getTitle();
        console.log('Page title:', title);

        // Your automation logic here...

      } finally {
        // Clean up
        await driver.quit();
        await proxyChain.closeAnonymizedProxy(anonymizedProxy, true);
      }
    })();
    ```

    <Info>
      The `proxy-chain` package is required because Selenium doesn't natively support proxy authentication with Chrome. It creates a local proxy server that handles the authentication for you.
    </Info>
  </Step>
</Steps>

## Configuration options

| Parameter | Value                  | Description                |
| --------- | ---------------------- | -------------------------- |
| Host      | `ip.nimbleway.com`     | Nimble proxy endpoint      |
| Port      | `7000`                 | Default proxy port         |
| Username  | Your pipeline username | From your Nimble dashboard |
| Password  | Your pipeline password | From your Nimble dashboard |

## Geo-targeting example

To route requests through a specific country, append the country code to your username:

```javascript theme={"system"}
// Route through US proxies
const proxyUrl = 'http://YOUR_USERNAME-country-us:YOUR_PASSWORD@ip.nimbleway.com:7000';

// Route through Germany proxies
const proxyUrl = 'http://YOUR_USERNAME-country-de:YOUR_PASSWORD@ip.nimbleway.com:7000';
```

## Verify your connection

You can verify your proxy connection by checking your IP address:

```javascript theme={"system"}
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const proxyChain = require('proxy-chain');

(async () => {
  const proxyUrl = 'http://YOUR_USERNAME:YOUR_PASSWORD@ip.nimbleway.com:7000';
  const anonymizedProxy = await proxyChain.anonymizeProxy(proxyUrl);

  const options = new chrome.Options();
  options.addArguments(`--proxy-server=${anonymizedProxy}`);

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  await driver.get('https://api.ipify.org');
  const ip = await driver.findElement({ css: 'body' }).getText();
  console.log('Your proxy IP:', ip);

  await driver.quit();
  await proxyChain.closeAnonymizedProxy(anonymizedProxy, true);
})();
```

That's all! Selenium will now route all requests through Nimble's proxy network.
