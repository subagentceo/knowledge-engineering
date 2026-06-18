# Stored Data

## Description

A `canvas` object may optionally contain a stored_data object. This is where you can add key-value pairs of data that you want to be sent in whatever the next request is.

For example, the flow of your app might have multiple canvases with data being inputted on each one. You may want to have all this data available to use at the end of the flow for the final canvas. You can therefore put all this data in the stored_data object so it's sent in subsequent requests and is available at the end.

## Example Object

```json
stored_data: {"key": "value"} //Can be more than one pair
```