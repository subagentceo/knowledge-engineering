# Overview of Compose Bridge




Compose Bridge converts your Docker Compose configuration into platform-specific deployment formats such as Kubernetes manifests. By default, it generates:

- Kubernetes manifests 
- A Kustomize overlay

These outputs are ready for deployment on Docker Desktop with [Kubernetes enabled](/desktop/settings-and-maintenance/settings/#kubernetes).  

Compose Bridge helps you bridge the gap between Compose and Kubernetes, making it easier to adopt Kubernetes while keeping the simplicity and efficiency of Compose.

It's a flexible tool that lets you either take advantage of the [default transformation](/compose/bridge/usage/) or [create a custom transformation](/compose/bridge/customize/) to suit specific project needs and requirements. 

## How it works

Compose Bridge uses transformations to convert a Compose model into another form. 

A transformation is packaged as a Docker image that receives the fully resolved Compose model as `/in/compose.yaml` and can produce any target format file under `/out`.

Compose Bridge provides its own transformation for Kubernetes using Go templates, so that it is easy to extend for customization by replacing or appending your own templates.

For more detailed information on how these transformations work and how you can customize them for your projects, see [Customize](/compose/bridge/customize/).

Compose Bridge also supports applications that use LLMs via Docker Model Runner.

For more details, see [Use Model Runner](/compose/bridge/use-model-runner/).

## Apply organizational standards at scale 


Compose Bridge supports custom transformation templates, which lets platform teams encode
organizational standards once and apply them consistently whenever a `compose.yaml` file
is converted to Kubernetes manifests or other formats.

Developers continue to write standard Compose files. During conversion, Compose Bridge
runs your custom transformation and automatically injects the required security contexts,
resource limits, labels, and network policies into the output manifests — without
requiring developers to know or manage those details.

When your requirements change, update the transformation template in one place. Every team
picks up the changes on their next conversion, with no edits to individual Compose files.

This separation of concerns keeps developers focused on application configuration, while
platform teams control governance and enforce policy through the transformation layer.

To get started, see [Customize Compose Bridge](/compose/bridge/customize/).

## What's next?

- [Use Compose Bridge](/compose/bridge/usage/)
- [Explore how you can customize Compose Bridge](/compose/bridge/customize/)

