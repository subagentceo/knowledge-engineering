# Results

## Description

The results object should be sent when you want to end configuration of the app and trigger the [Initialize request](https://developers.intercom.com/build-an-integration/docs/canvas-kit#section-initialize) to be sent. You provide the key-value pairs of data you want access to and we will send these in the Initialize request within a [card_creation_options object](https://developers.intercom.com/messenger-framework-reference/reference/card-creation-options).

## Example Object

```json
results: { "key": "value" } // Can be more than one pair
```