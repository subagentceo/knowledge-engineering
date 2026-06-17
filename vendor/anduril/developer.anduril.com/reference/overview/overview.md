> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# The Lattice API

With the SDK and its open data models, Lattice lets you integrate highly customizable data systems and hardware platforms
with Lattice's growing body of robust, field-tested integrations.

Lattice provides the following APIs:

Entities model anything in the world that is of significance to an operator.

Tasking enables you to send sequential commands to agents connected to
Lattice.

Objects let you store distributed binary data in Lattice.

## API availability

Lattice APIs designate three availability levels: **beta**, **generally available (GA)**,
and **deprecated**:

* Resources marked as **beta** should not be depended on in production.
* Resources marked as **beta** may have breaking changes without notice.
* Resources marked as **beta** may not be available within every Anduril environment.
* Resources not marked as **beta** are **generally available**, and maintain stability.

For [REST](/reference/rest), any REST APIs still in development are marked as beta
within the reference documentation:

<img src="/_files/anduril.docs.buildwithfern.com/6c5bec76116a59a19be5038e35a8e4c013ef4a5a19524154497cf1b260d65726/assets/images/screenshots/beta.png" alt="Displays the Lattice REST API with a `Beta` label." />

For [gRPC](/reference/grpc), APIs still in development are marked with beta in the namespace.
For example, `anduril.entitymanager.v2beta`.

## Lattice SDK versions

The Lattice SDK versions for different languages are independently versioned. The versions are based on the semantic versioning
standard. For example, in version `2.6.4`, `2` is the *major*, `6` is the *minor* and `4` is the *patch*. When we release a
new version of the SDK, we increment one of these values depending on the type of change introduced.

* **Major**: We increment the *major* version when the version contains breaking changes that are not backwards compatible with
  the previous version. For example, to change a method.
* **Minor**: We increment the *minor* version when the version contains new features that are backwards compatible with
  the previous version. For example, to add a new method.
* **Patch**: We increment the *patch* version when the version contains backwards compatible bug fixes. For example, fixing a bug
  where Entities were not correctly publishing.

When a new Lattice SDK major version is released, the previous major version
is supported for **six** months for critical security fixes.

If you’re on an older major SDK version, we recommend upgrading to the latest major
version to take advantage of new features and bug fixes. Older major versions of
the package continue to be available for use, but won’t receive any additional updates.

#### v1 to v2

Moving from Lattice SDK v1 to v2+ consisted of a major change where we generated clients from our REST endpoints rather
than our gRPC endpoints. A special [migration guide](/reference/overview/versioning/migrating-to-v2) is available for this migration.

## What's next?

* Get started with Lattice using the [sample apps](/samples/overview).
* Follow the [quickstart guide](/guides/getting-started/quickstart) to build your first integration.