> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Sample apps

## Entity visualizer

Entities characterize real world objects such as vehicles, ships, aircraft, and
more. The Lattice data model provides an open, flexible set of attributes
which may be defined by automated sensor systems, tactical data links, and input
by human operators. This sample app renders a simple web app
which shows all entities in an environment on a map.

This app is designed to be a starting point for learning about entities and the many attributes enabled by
the entity open data model:

Click to go to the sample application repository on GitHub. By downloading and/or using, you agree to the terms of use.
If you do not agree, do not use the application or the SDK:

* [Visualize Entities on a Map sample app](https://github.com/anduril/sample-app-entity-visualizer)

<img src="/_files/anduril.docs.buildwithfern.com/df2943ff63c8f0de53aff525d969c89aa2e4a0a698496bc72532ca1f38947a85/assets/images/sample-apps/entity-map.png" />

## Objects CLI

In Lattice, the [Objects API](/reference/rest/objects/list-objects) provides a content-delivery
network service that enables resilient data storage at the edge. This sample app implements
a command-line interface that lets developers interact with the Objects API for managing
files across the Lattice environment.

The Objects CLI provides a comprehensive set of operations including uploading files with
customizable time-to-live values, downloading objects to specified locations, retrieving metadata,
listing objects with prefix filtering, and deleting objects from the store.

Click to go to the sample application repository on GitHub. By downloading and/or using, you agree to the terms of use.
If you do not agree, do not use the application or the SDK:

* [Objects CLI sample app](https://github.com/anduril/sample-app-objects)

<img src="/_files/anduril.docs.buildwithfern.com/583705f9b28aa34570b44842ab83054da69ed50c4cdf9146859a4c442d198e9b/assets/images/sample-apps/objects-cli.png" />

For more information, see [Objects overview](/guides/objects/overview).

## Integrate maritime AIS position data

The AIS (Automatic Identification System) vessel traffic dataset is a repository
of vessel identification and positioning data. The data is collected by the U.S.
Coast Guard through an onboard navigation safety device that transmits and
monitors the location and characteristics of vessels in U.S. and international
waters in real time.

This sample integration utilizes previously extracted AIS
data to represent the location of a surface vessel over time, and then models
that vessel as an entity with a location which is periodically updated. Once the
entity is published in Lattice it may be visualized or referenced by another
app.

This sample app is available using the gRPC SDK or the REST SDK:

Click to go to the sample application repository on GitHub. By downloading and/or using, you agree to the terms of use.
If you do not agree, do not use the application or the SDK:

* [AIS Integration sample app using gRPC SDK](https://github.com/anduril/sample-app-ais-integration-grpc)
* [AIS Integration sample app using REST SDK](https://github.com/anduril/sample-app-ais-integration-rest)

<img src="/_files/anduril.docs.buildwithfern.com/4a529a595d17e583420ee1bfe53e7c99a9c06a48829dcc2557912222015d7b07/assets/images/sample-apps/ais-motion.png" />

## Entity thumbnail

In Lattice, an object is a data model that lets you store and access files across your environment.
The [**Objects**](/reference/rest/objects/list-objects) API is a content-delivery network service that provides resilient data storage at the edge.
Use objects together with entities to implement use-cases like track thumbnails, and vessel manifests.

This app demonstrates an entity thumbnail use-case implemented with the Lattice SDK. The sample app is a command-line interface
tool that lets you upload images to Lattice, and link them with an entity. The example C2 app shows this linked image as a thumbnail
of the entity:

Click to go to the sample application repository on GitHub. By downloading and/or using, you agree to the terms of use.
If you do not agree, do not use the application or the SDK:

* [Entity thumbnail sample app](https://github.com/anduril/sample-app-thumbnail)

<img src="/_files/anduril.docs.buildwithfern.com/58c183e84a49edc4eb2b0c8a5db18eb71e36c6ebdfd68091cd2950a16858f5dc/assets/images/sample-apps/track-thumbnail.png" />

For more information, see [Objects](/guides/objects/overview).

## Task an asset

Tasks are the core open data model which communicate requests to manned or
unmanned agents to perform purposeful activities, such as moving to a given
location, orienting sensing towards a location of interest, or taking more
active actions on other entities. This example handles basic tasks and task
status management for a notional asset.

You can download this sample app from GitHub.

Click to go to the sample application repository on GitHub. By downloading and/or using, you agree to the terms of use.
If you do not agree, do not use the application or the SDK:

* [Task an Asset sample app](https://github.com/anduril/sample-app-auto-reconnaissance)

<img src="/_files/anduril.docs.buildwithfern.com/991bd5d11d1cac24cfbccd738c5d190519172ed1ddc8dce70b0f4b8dff597535/assets/images/sample-apps/tasking.png" />