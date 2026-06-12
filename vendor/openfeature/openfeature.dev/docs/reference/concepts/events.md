# Events

Events enable the ability to react to state changes in the provider or underlying flag management system. These include changes in provider readiness, error status, or perhaps most interestingly, flag configuration changes.

## Event Handlers​

Event handlers can be attached to a `client` or to the global API object, for any provider event type. Handlers attached to the global API object run when _any_ provider emits the associated events; this makes global handlers ideal for configuration troubleshooting, monitoring and other cross-cutting concerns. Handlers attached to a client will run only when the provider bound with that client emits the associated event; this makes `client` handlers ideal for reacting to flag-state changes in an application domain logic.

Handlers are passed an event details structure, which contains data about the event, including a list of keys that have changed (if applicable and available).

*   TypeScript
*   Java
*   C#
*   Go
*   Python

```
// add an event handler to a clientconst client = OpenFeature.getClient();client.addHandler(ProviderEvents.ConfigurationChanged, (eventDetails) => {  // do something when the provider's flag settings change});// add an event handler to the global APIOpenFeature.addHandler(ProviderEvents.Error, (eventDetails) => {  // do something when if the provider goes into an error state});
```

```
// add an event handler to a clientClient client = OpenFeatureAPI.getInstance().getClient();client.onProviderConfigurationChanged((EventDetails eventDetails) -> {    // do something when the provider's flag settings change});// add an event handler to the global APIOpenFeatureAPI.getInstance().onProviderError((EventDetails eventDetails) -> {  // do something when if the provider goes into an error state});
```

```
// add an event handler to a clientvar client = Api.Instance.GetClient();client.AddHandler(ProviderEventTypes.ProviderConfigurationChanged, (ProviderEventPayload eventDetails) =>{  // do something when the provider's flag settings change});// add an event handler to the global APIApi.Instance.AddHandler(ProviderEventTypes.ProviderError, (ProviderEventPayload eventDetails) =>{  // do something when if the provider goes into an error state});
```

```
var changedCallback = func(details openfeature.EventDetails) {  // do something when the provider's flag settings change}// add an event handler to a clientclient := openfeature.NewClient("clientName")// add an event handler to a clientclient.AddHandler(openfeature.ProviderError, &changedCallback)var errorCallback = func(details openfeature.EventDetails) {  // do something when if the provider goes into an error state}// add an event handler to the global APIopenfeature.AddHandler(openfeature.ProviderError, &errorCallback)
```

```
client = api.get_client()def on_changed(event_details: EventDetails):  # do something when the provider's flag settings change# add an event handler to a clientclient.add_handler(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, on_changed)def on_error(event_details: EventDetails):  # do something when if the provider goes into an error state# add an event handler to the global APIapi.add_handler(ProviderEvent.PROVIDER_ERROR, on_error)
```

## Event Types​

See event types specification.

### PROVIDER_READY​

The provider is ready to perform flag evaluations.

_Application authors_ may wish to wait to evaluate flags until the provider has fully started. In that case, they can await the `PROVIDER_READY` event before evaluating any flags. This can be especially useful for hiding UI elements or otherwise deferring evaluation until associated flags can be resolved accurately.

### PROVIDER_CONFIGURATION_CHANGED​

A change was made to the backend flag configuration.

If the flag management system supports it, providers may emit a `PROVIDER_CONFIGURATION_CHANGED` event signifying that flag configurations have changed. This might mean the value of a flag (or flags) have changed, or that a rule has been updated. Generally, the associated event details will indicate which flag (or flags) have been changed with the `flags changed` field.

### PROVIDER_ERROR​

The provider signaled an error.

If a provider becomes unavailable, evaluations will typically default. Handlers associated with `PROVIDER_ERROR` events can be used to alert monitoring systems about the provider failure, or enable custom fallback mechanisms.

### PROVIDER_STALE​

The provider's cached state is no longer valid and may not be up-to-date with the source of truth.

Some providers maintain a connection to a management system, but are also tolerate of disconnection. The `PROVIDER_STALE` indicates this situation.

### PROVIDER_RECONCILING (Static-context/Client-side only)​

The context associated with the provider has changed, and the provider has not yet reconciled its associated state.

### PROVIDER_CONTEXT_CHANGED (Static-context/Client-side only)​

The context associated with the provider has changed, and the provider has reconciled its associated state.