# Editing Events

## Editing Events

Once you've successfully configured Audit Logs in the WorkOS Dashboard and begun emitting events, how do you go about modifying an event schema without breaking your existing integrations? This is where versioning comes into place. When you make a modification to an existing schema it will create a new version rather than overwriting the existing schema.

The reason for this behavior is to ensure backwards compatibility. Schema configuration is immutable to prevent you from accidentally making changes that are incompatible with events that are already being emitted from your application. Rather you must first create a new version of the schema, and then explicitly emit events for that version leveraging the event `version` field.

### Creating a new event version

In the WorkOS Dashboard navigate to the Audit Logs configuration page. Locate the event that you would like to modify the schema for and click the "Edit Event" item under the context menu.

![A screenshot showing the "Edit Event" option in the WorkOS Dashboard.](https://images.workoscdn.com/images/8ee56828-fc59-4c18-ae64-008a754cd2a6.png?auto=format\&fit=clip\&q=50)

You will be navigated to a page where you can edit both the `targets` associated with the event, and optionally the metadata JSON schema. Once you're done making changes, clicking save will create a new version of the event schema.

![A screenshot showing the "Save as new version" button in the schema editor in the WorkOS Dashboard.](https://images.workoscdn.com/images/65d234a3-f530-4051-95a0-0162cfef122e.png?auto=format\&fit=clip\&q=50)

### Emitting event with version

Now that a schema exists with a new version, the `version` field must be provided when emitting an event so that WorkOS knows which version to use for validation.

#### Emit event
