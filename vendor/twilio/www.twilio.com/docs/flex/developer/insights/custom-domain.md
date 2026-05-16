# Run Flex Insights on a Custom Domain

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

This article helps you to take the full advantage of Historical Reporting in Flex. It guides you through enabling Historical Reporting for self-hosted Flex and for your local development environment.

If you use hosted Flex on flex.twilio.com domain you do not need to take any action. Access to Flex Insights Historical Reporting from flex.twilio.com domain is allowed by default. If you still have difficulty accessing Historical Reporting please contact our support.

With full access to Historical Reporting, you can enhance your Flex Instance with important contextual data to help your users make informed decisions in any situation.

## Self-Hosted Flex on Custom Domain

If you use self-hosted Flex you need to ask our support team to allow access from domains that Flex runs on. Follow these steps:

1. Check that the address in your browser address bar does *not* start with flex.twilio.com.
2. Create a list of all domains on which you plan to run Flex, so you can ask to enable access for all of them at once. Don't forget development, staging, and testing instances.
3. [Contact our support team](https://help.twilio.com) with a request to enable access to the domains you have collected. Provide support with account SIDs associated with every domain you need to allow.
4. Wait for confirmation that your domains are allowed to access Historical Reporting.

After these steps are completed you can take advantage of Historical Reporting programmability.

## Local Development

When embedding Historical Reporting into you customized Flex you might need to access Historical Reporting from localhost. We do not enable CORS to access Historical Reporting from localhost as it poses a security risk. To enable rapid prototyping and development on your local machine you need to run a local proxy service.

To help with development, we have built our own proxy server that you can run locally. The package can be run with `npx @twilio/flex-ui-dev-proxy`. Out of the box it runs on localhost:8081, but both host and port can be configured. Refer to the [README.md](https://www.npmjs.com/package/@twilio/flex-ui-dev-proxy) for more details.

When you run insights locally, you also need to set the URL to your insights analytics proxy URL in the `appConfig.js` file. For example:

```javascript
{
    insights: {
        analyticsUrl: "http://localhost:8081"
    }
}
```

## Using the Proxy in your own stack

While running the proxy as a separate process is recommended, it is possible to import just the express middleware or webpack proxy configuration object from the package, so that you can use it in your own stack. Refer to the [README.md](https://www.npmjs.com/package/@twilio/flex-ui-dev-proxy) for more information.
