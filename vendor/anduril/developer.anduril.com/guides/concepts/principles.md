> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Principles

Since its founding, Anduril has excelled in building integrated systems that function reliably in
austere and hostile environments. Anduril's first Sentry towers performed key workloads such
as computer vision and sensor fusion locally at the edge to automatically triage suspected threats
from the environment, independent of a human operator.

As we introduced new products, we continued to push processing and collaboration to the edge,
rather than centralize logic on data center servers. We embody a local-first approach that forms
the backbone of Anduril's differentiated capability.

We call this backbone **Lattice**.

## Development principles

The **Lattice SDK™** accelerates your ability to develop decentralized apps capable of interloping with other systems
on the mesh using the following core principles:

* **Local-first** -- In order to deliver apps that perform well in degraded network environments,
  develop with bandwidth utilization in mind, and build with the assumption that the network conditions under which your code runs
  can be intermittently unavailable.

* **Open data exchange** --  In order for your systems to work effectively with Lattice, they must speak the same language.
  To achieve this, Lattice utilizes standardized data models across all of Anduril's products and apps. Learn the Lattice data models
  and leverage them to build more resilient data services and integrations.

This approach fosters inter-operability without requiring high levels of prior coordination.

## Data models

With the SDK and its open data models, Lattice lets you integrate highly customizable data systems and hardware platforms
with its growing body of robust, field-tested integrations.

The Lattice SDK implements the following foundational structured data models:

Entities model anything in the world that is of significance to an operator.

Tasking enables you to send sequential commands to agents connected to Lattice.

Objects let you store distributed binary data in Lattice.

## What's next?

* Get started developing with the Lattice using [Lattice Sandboxes](/guides/developer-tools/sandboxes).
* Install [the Lattice SDK™](/guides/getting-started/set-up#install) in a language of your choice.