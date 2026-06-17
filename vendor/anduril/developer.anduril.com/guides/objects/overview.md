> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Objects overview

In Lattice, an **object** is a data model that represents a single file or a piece of data. Implemented around Anduril's resilient content-delivery network (CDN),
the Objects API distributes objects around the [Lattice mesh](https://www.anduril.com/lattice/lattice-mesh).

Use the Objects API together with Entities to implement use cases such as track thumbnails, and vessel manifests.

An object must be less than 1 GiB in size.

## Data distribution

Each Lattice environment runs an instance of the CDN. In a Lattice mesh deployment, every node in the mesh
runs a single instance of the CDN. This lets Lattice retrieve objects using a tiered lookup mechanism:

<img src="/_files/anduril.docs.buildwithfern.com/be83e074bce1b6d6be87c091b656fb4863e4a312bf172ffdefe9ff12e9cf4eef/assets/images/diagrams/objects-cdn.png" alt="Architectural diagram showing the content-delivery network used by Lattice." />

If the requested data is not cached locally, Lattice queries peers at the same layer in the mesh.
If a peer has the data, a request is issued to stream and cache the blob locally before sending it to the client.
If no peers at the same layer have the requested data, the system queries nodes in the next highest layer,
following a specific precedence order.

## Object schema

The Objects API implements the `PathMetadata` and `ContentIdentifier`
schemas to store and retrieve objects across the Lattice environment:

&#x20;**`PathMetadata`**:

String that uniquely identifies the object path in your environment.

The size of the object in bytes.

The time when the object was last updated.

The future time at which an object expires and is deleted from the environment.

&#x20;**`ContentIdentifier`**:

The unique object path in your environment.

The SHA-256 checksum of the object used to verify the integrity of the data in Lattice.

## Object lifecycle

An object in Lattice has the following lifecycle states:

When you upload an object, Object Store updates the object's
[`last_updated_at`](/reference/rest/objects/upload-object#response.body.last_updated_at).

When an object expires, Object Store automatically deletes it from Lattice.
You can define an [`expiry_time`](/reference/rest/objects/upload-object#response.body.expiry_time])
by setting the optional `Time-to-Live` header when uploading the object.
If you associate an object with an entity in Lattice, your app must handle resetting the entity's
[`media`](/reference/rest/entities/publish-entity#request.body.media) component
accordingly.

You can delete an object from Lattice before it expires by using the
[`DeleteObject`](/reference/rest/objects/delete-object) API.
Similar to when an object expires, you must handle resetting the entity's `media` component
if the object is associated with an entity in Lattice.

## What's next?

* To start uploading objects, see [Upload objects to Lattice](/guides/objects/upload).
* Check out our [sample apps](/samples/overview).
* Learn more about [the Objects](/reference/rest/objects/list-objects) API.