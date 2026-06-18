# Submit Action

A submit action fires a webhook to the developer’s web-service with the current state of the card, including the values entered into any interactive components, so that the developer can trigger side-effects and/or return a new set of components to update the card state.

[More on how this works is in the submit flow documentation through this link](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/request-flows#section-submit-flow).

Input Components
If there are input elements present within the card, then a submit action from a [button](#section-button) will submit the entire form.

```json
action: {
  "type": "submit"
}
```