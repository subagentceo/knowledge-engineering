# Results

The `results` object should be sent as the final response during the `configure` flow, when you want to start the `initialize` flow after configuration to add the app is complete.

```json
{
  results: {
    name: "Data one", //Example teammate input
    email: "Data two" //Example teammate input
  }
}
```

| Key | Type | Description |
|  --- | --- | --- |
| results | object | Set of key-value pairs representing the configuration options entered by the teammate. |