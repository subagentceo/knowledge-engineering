# Embedding Dashboards

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

> \[!NOTE]
>
> A developer proxy is needed for local development. Please refer to the article about [Local Development](/docs/flex/developer/insights/custom-domain).

Starting in version 1.27, Flex supports Dashboard embedding. To utilize this functionality, use the Dashboard component exported under the `Flex.Insights.Dashboard` namespace.

The component takes a `dashboardId` prop and displays that dashboard embedded in an iframe. This allows you to create custom views with particular dashboards.

## Dashboard component

The component has the following props:

* `dashboardId: string;`
* `queryParams?: {};`
* `events?: { [event: string]: (eventData: unknown, eventId: string) => void };`

### dashboardId

The ID of the dashboard. This is the only required prop on this component and most likely the only one you will need to use.

Please refer to the next chapter to learn how to get `dashboardId`.

### queryParams

For expert users. The object will be passed as query string to the iframe URL.

### events

For expert users. Allows you to attach custom handlers to the post message events received from the iframe.

## Getting the Dashboard ID

Knowing the Dashboard ID is crucial for being able to render it. To figure out the correct Dashboard ID, navigate to the desired dashboard first and check the URL in your browser.

It should look something like this: `<yourFlexUrl>/dashboards/aeJSfSg9if1x`.

The part after `dashboards/` is the currently displayed Dashboard's ID, in this case `aeJSfSg9if1x`.

## Example

We will use the Dashboard ID we just discovered to display the Dashboard as content of the CRM container:

```jsx
Flex.CRMContainer.Content.replace(
  <Flex.Insights.Dashboard key="some-key" dashboardId="aeJSfSg9if1x" />
);
```
