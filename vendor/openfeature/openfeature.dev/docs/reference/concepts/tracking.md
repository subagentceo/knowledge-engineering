-   [](/)
-   [Concepts](/docs/category/concepts)
-   Tracking

On this page

# Tracking

Tracking in OpenFeature is the process of associating metrics or KPIs with feature flag evaluation contexts. This association helps measure the impact of feature changes on both business KPIs and system performance, making it particularly valuable for experimentation.

## Use Cases[​](#use-cases "Direct link to Use Cases")

Tracking events associated with flag evaluations serves two primary purposes:

### Performance Monitoring[​](#performance-monitoring "Direct link to Performance Monitoring")

When changes are made to an application via feature flags, tracking helps measure their impact on performance. By associating events with flag evaluation contexts and sending this data to telemetry or analytics platforms, teams can determine whether specific flag configurations improve or degrade measured performance, whether business metrics or system performance.

### Experimentation[​](#experimentation "Direct link to Experimentation")

Tracking creates a crucial link between flag evaluations and business outcomes, enabling robust experimentation. Experimentation differs from generalized Performance Monitoring in its execution. The most common form of Experimentation being A/B testing which is when two variations of an application or feature are distributed randomly to similar groups and the differences in metrics is evaluated. For example, if a feature flag controls the order of items in a menu, tracking events can be emitted when users click on menu items. The feature flag provider can typically be set to distribute the different variations equally to your audience, making this an A/B test, helping to validate hypotheses about user behavior in a statistically relevant manner.

## Providers, Hooks and Integration[​](#providers-hooks-and-integration "Direct link to Providers, Hooks and Integration")

In order to accomplish the use cases above, it's required that the flag provider in use reports events or metrics about the flag evaluations and [tracking calls](/specification/sections/providers/#27-tracking-support) it facilitates. If your vendor or home-grown solution does not support these functionalities, the OpenFeature SDK offers various integration and extension points to help. You can implement your own provider [track](/specification/sections/tracking#61-tracking-api) function (by extending or encapsulating your provider) and use custom [hooks](/docs/reference/concepts/hooks), to collect and export the appropriate event data to your customer data or analytics platform.

## Track Event Implementation[​](#track-event-implementation "Direct link to Track Event Implementation")

The `track` function requires only a label parameter. You don’t need to pass an identifier or flag evaluation context since the OpenFeature provider already maintains this information.

Optionally, you can associate additional metadata with each track event if your feature flagging tool supports it.

-   TypeScript
-   Java
-   C#
-   Go

```
// example tracking event recording a conversionclient.track('conversion-tracked');// optionally additional data can be associated with the eventclient.track('conversion-tracked', {  value: 99.77,  currencyCode: 'USD',});
```

```
// example tracking event recording a conversionclient.track("conversion-tracked");// optionally additional data can be associated with the eventclient.track("conversion-tracked", new TrackingEventDetails(99.77).add("currencyCode", "USD"));
```

```
// example tracking event recording a conversionclient.Track("visited-promo-page");// optionally additional data can be associated with the eventclient.Track("visited-promo-page", new TrackingEventDetailsBuilder().SetValue(99.77).Set("currencyCode", "USD").Build());
```

```
client.Track(  context.Background(),  "visited-promo-page",  openfeature.EvaluationContext{},  openfeature.NewTrackingEventDetails(99.77).Add("currencyCode", "USD"),  )
```

[Edit this page](https://github.com/open-feature/openfeature.dev/edit/main/docs/reference/concepts/07-tracking.mdx)