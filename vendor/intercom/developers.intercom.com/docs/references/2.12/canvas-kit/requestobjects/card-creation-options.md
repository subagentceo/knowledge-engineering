# Card Creation Options

## Description

The card_creation_options object is a JSON hash containing key-value pairs. These key-value pairs either represent:

- Data that was sent within the [results object](/docs/references/2.12/canvas-kit/responseobjects/results) in response to the [Configure request](/docs/canvas-kit#configure-request).
- Data that was sent within the `card_creation_options` object in response to the [Submit request](/docs/canvas-kit#submit-request).


## Example Object

```json
card_creation_options: { "key": "value" } //Can be more than one pair
```