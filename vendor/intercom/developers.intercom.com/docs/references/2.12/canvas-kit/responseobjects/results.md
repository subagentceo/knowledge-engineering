# Results

## Description

The results object should be sent when you want to end configuration of the app and trigger the [Initialize request](/docs/canvas-kit/#initialize) to be sent. You provide the key-value pairs of data you want access to and we will send these in the Initialize request within a [card_creation_options object](/docs/references/canvas-kit/requestobjects/card-creation-options/#card-creation-options).

## Example Object

```json
results: { "key": "value" } // Can be more than one pair
```