> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Puppeteer

> Connect Nimble Proxy with Puppeteer

Puppeteer is a Node.js library that provides a high-level API to control Chrome or Chromium browsers. It's commonly used for web scraping, automated testing, and generating screenshots or PDFs of web pages.

By integrating Nimble's proxy network with Puppeteer, you can route your automated browser requests through residential IPs, enabling access to geo-restricted content and avoiding IP-based blocking.

## Prerequisites

* Node.js installed on your system
* Nimble account with proxy credentials

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Install dependencies" titleSize="h3">
    Install Puppeteer and the proxy-chain package, which handles proxy authentication:

    ```bash theme={"system"}
    npm install puppeteer proxy-chain
    ```
  </Step>

  <Step title="Get your proxy credentials" titleSize="h3">
    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page and click "add pipeline" to get your pipeline's proxy connection details.
    * In your new pipeline, you will find the IP address, port, username, and password.
    * Your proxy URL format will be: `http://username:password@ip.nimbleway.com:7000`
  </Step>

  <Step title="Implement the proxy connection" titleSize="h3">
    Use the following code to connect Puppeteer through Nimble's proxy:

    ```javascript theme={"system"}
    const puppeteer = require('puppeteer');
    const proxyChain = require('proxy-chain');

    (async () => {
      // Replace with your Nimble pipeline credentials
      const proxyUrl = 'http://YOUR_USERNAME:YOUR_PASSWORD@ip.nimbleway.com:7000';

      // Anonymize the proxy URL (handles authentication)
      const anonymizedProxy = await proxyChain.anonymizeProxy(proxyUrl);

      // Launch browser with proxy
      const browser = await puppeteer.launch({
        args: [
          `--proxy-server=${anonymizedProxy}`,
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ],
        headless: true
      });

      try {
        const page = await browser.newPage();

        // Navigate to your target URL
        await page.goto('https://example.com');

        // Get page content
        const content = await page.content();
        console.log('Page loaded successfully');

        // Take a screenshot (optional)
        await page.screenshot({ path: 'screenshot.png' });

      } finally {
        // Clean up
        await browser.close();
        await proxyChain.closeAnonymizedProxy(anonymizedProxy, true);
      }
    })();
    ```

    <Info>
      The `proxy-chain` package is required because Puppeteer doesn't natively support proxy authentication. It creates a local proxy server that handles the authentication for you.
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

// Route through UK proxies
const proxyUrl = 'http://YOUR_USERNAME-country-gb:YOUR_PASSWORD@ip.nimbleway.com:7000';
```

## Verify your connection

You can verify your proxy connection by checking your IP address:

```javascript theme={"system"}
const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');

(async () => {
  const proxyUrl = 'http://YOUR_USERNAME:YOUR_PASSWORD@ip.nimbleway.com:7000';
  const anonymizedProxy = await proxyChain.anonymizeProxy(proxyUrl);

  const browser = await puppeteer.launch({
    args: [`--proxy-server=${anonymizedProxy}`],
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://api.ipify.org?format=json');

  const ipInfo = await page.evaluate(() => document.body.textContent);
  console.log('Your proxy IP:', ipInfo);

  await browser.close();
  await proxyChain.closeAnonymizedProxy(anonymizedProxy, true);
})();
```

That's all! Puppeteer will now route all requests through Nimble's proxy network.
