# Metadata Schema

## Metadata Schema

Audit Log Events can contain arbitrary metadata for adding additional details to your events. Normally this data can take any shape. However, custom metadata schemas can be defined when configuring the event for additional type safety and data consistency. When an event is emitted that does not match the provided schema, an error will be returned.

When first creating an event schema, check the "Require metadata schema validation" checkbox. You will then be navigated to the schema editor where you can modify the underlying [JSON Schema](https://json-schema.org/) for all `metadata` objects.

![A screenshot showing how to require metadata schema validation in the WorkOS Dashboard.](https://images.workoscdn.com/images/24a410e1-72aa-4f5b-8854-98a4307602ff.png?auto=format\&fit=clip\&q=50)

There are `metadata` objects located at the root of the event, and within `actor` and `targets` objects. Each can contain a unique JSON Schema. To add to a `metadata` object, click the "+" sign.

> Metadata objects have a limit of 50 keys. Key names can be up to 40 characters long, and values can be up to 500 characters long.

![A screenshot showing the schema editor in the WorkOS Dashboard.](https://images.workoscdn.com/images/7d9e37a3-2e8d-4910-b85d-34c224e375be.png?auto=format\&fit=clip\&q=50)

#### Event with metadata
