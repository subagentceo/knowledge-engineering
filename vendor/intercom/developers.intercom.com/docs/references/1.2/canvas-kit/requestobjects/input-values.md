# Input Values

The `input-values` object is a JSON hash where you can add key-value pairs.

It's returned to the relevant URLs to specify any data that had been inputted by teammates during the configure flow, and any data that has been inputted by end users during the submit flow.

```json
input_values: {
    name: "Data one",
     ... //Can be more than one pair
  }
```

```json
{
  app_id: "<string id_code of the app using the card>",
  admin: {<Admin object of admin who is performing configuration>},
  current_canvas: {<Canvas object>},
  component_id: "<component_id, component which triggered action>",
  input_values: {
    <component_id>: "<value entered in component>",
    ...
  },
  context: {<Context object>}
}
```

```json
{
  app_id: "<string id_code of the app using the card>",
  current_canvas: {<Canvas object>},
  component_id: "<component_id, component which triggered action>",
  input_values: {
    <component_id>: "<value entered in component>",
    ...
  },
  user: {<User object of end-user who triggered action>},
  context: {<Context object>}
}
```