---
title: Containers
description: Wrangler commands for interacting with Cloudflare's Container Platform.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Containers

Interact with [Containers](https://developers.cloudflare.com/containers/) using Wrangler.

### `build`

Build a Container image from a Dockerfile.

```

wrangler containers build [PATH] [OPTIONS]


```

* `PATH` ` string ` optional  
   * Path for the directory containing the Dockerfile to build.
* `-t, --tag` ` string ` required  
   * Name and optionally a tag (format: "name:tag").
* `--path-to-docker` ` string ` optional  
   * Path to your docker binary if it's not on `$PATH`.  
   * Default: "docker"
* `-p, --push` ` boolean ` optional  
   * Push the built image to Cloudflare's managed registry.  
   * Default: false

### `delete`

Delete a Container (application).

```

wrangler containers delete <CONTAINER_ID> [OPTIONS]


```

* `CONTAINER_ID` ` string ` required  
   * The ID of the Container to delete.

### `images`

Perform operations on images in your containers registry.

#### `images list`

List images in your containers registry.

```

wrangler containers images list [OPTIONS]


```

* `--filter` ` string ` optional  
   * Regex to filter results.
* `--json` ` boolean ` optional  
   * Return output as clean JSON.  
   * Default: false

#### `images delete`

Remove an image from your containers registry.

```

wrangler containers images delete [IMAGE] [OPTIONS]


```

* `IMAGE` ` string ` required  
   * Image to delete of the form `IMAGE:TAG`

### `registries`

Configure and view registries available to your container.[Read more](https://developers.cloudflare.com/containers/platform-details/image-management/#using-amazon-ecr-container-images) about our currently supported external registries.

#### `registries list`

List registries your containers are able to use.

```

wrangler containers registries list [OPTIONS]


```

* `--json` ` boolean ` optional  
   * Return output as clean JSON.  
   * Default: false

#### `registries configure`

Configure a new registry for your account.

```

wrangler containers registries configure [DOMAIN] [OPTIONS]


```

* `DOMAIN` ` string ` required  
   * Domain to configure for the registry.
* `--public-credential` ` string ` required  
   * The public part of the registry credentials, e.g. `AWS_ACCESS_KEY_ID` for ECR
* `--secret-store-id` ` string ` optional  
   * The ID of the secret store to use to store the registry credentials
* `--secret-name` ` string ` optional  
   * The name Wrangler should store the registry credentials under

When run interactively, wrangler will prompt you for your secret and store it in Secrets Store. To run non-interactively, you can send your secret value to wrangler through stdin to have the secret created for you.

#### `registries delete`

Remove a registry configuration from your account.

```

wrangler containers registries delete [DOMAIN] [OPTIONS]


```

* `DOMAIN` ` string ` required  
   * domain of the registry to delete

#### `registries credentials`

Generate temporary credentials to push or pull images from the Cloudflare managed registry (`registry.cloudflare.com`).

```

wrangler containers registries credentials [OPTIONS]


```

* `--push` ` boolean ` optional  
   * Generate credentials with push permission.
* `--pull` ` boolean ` optional  
   * Generate credentials with pull permission.
* `--expiration-minutes` ` number ` optional  
   * How long the credentials should be valid for (in minutes).  
   * Default: 15

At least one of `--push` or `--pull` must be specified.

### `info`

Get information about a specific Container, including top-level details and a list of instances.

```

wrangler containers info <CONTAINER_ID> [OPTIONS]


```

* `CONTAINER_ID` ` string ` required  
   * The ID of the Container to get information about.

### `instances`

List all Container instances for a given application. Displays instance ID, name, state, location, version, and creation time.

In interactive mode, results are paginated. Press `Enter` to load the next page or `Esc`/`q` to stop. In non-interactive environments (for example, when piping output or running in CI), all pages are fetched automatically.

Use the `--json` flag to return output as a flat JSON array. Each element contains the fields `id`, `name`, `state`, `location`, `version`, and `created`. This is also the default output format in non-interactive environments.

```

wrangler containers instances <APPLICATION_ID> [OPTIONS]


```

* `APPLICATION_ID` ` string ` required  
   * The UUID of the application to list instances for. Use `wrangler containers list` to find application IDs.
* `--per-page` ` number ` optional  
   * Number of instances per page.  
   * Default: 25
* `--json` ` boolean ` optional  
   * Return output as clean JSON.  
   * Default: false

For example, to list instances for an application:

Terminal window

```

wrangler containers instances 12345678-abcd-1234-abcd-123456789abc


```

```

INSTANCE                              NAME        STATE          LOCATION  VERSION  CREATED

a1b2c3d4-e5f6-7890-abcd-ef1234567890  worker-12   running        sfo06     3        2025-06-01T12:00:00Z

b2c3d4e5-f6a7-8901-bcde-f12345678901  worker-47   provisioning   iad01     2        2025-06-01T13:00:00Z


```

To get the same data as JSON:

Terminal window

```

wrangler containers instances 12345678-abcd-1234-abcd-123456789abc --json


```

```

[

  {

    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

    "name": "worker-12",

    "state": "running",

    "location": "sfo06",

    "version": 3,

    "created": "2025-06-01T12:00:00Z"

  }

]


```

### `list`

List the Containers in your account.

```

wrangler containers list [OPTIONS]


```

### `push`

Push a tagged image to a Cloudflare managed registry, which is automatically integrated with your account.

```

wrangler containers push [TAG] [OPTIONS]


```

* `TAG` ` string ` required  
   * The name and tag of the container image to push.
* `--path-to-docker` ` string ` optional  
   * Path to your docker binary if it's not on `$PATH`.  
   * Default: "docker"

### `ssh`

Connect to a running Container instance using SSH. Refer to [SSH](https://developers.cloudflare.com/containers/ssh/) for configuration details.

```

wrangler containers ssh <INSTANCE_ID>


```

You can also specify a command to run, instead of the default shell. For example:

```

wrangler containers ssh <INSTANCE_ID> -- ls -al


```

* `INSTANCE_ID` ` string ` required  
   * The ID of the Container instance to SSH into.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/containers/#page","headline":"Containers · Cloudflare Workers docs","description":"Wrangler commands for interacting with Cloudflare's Container Platform.","url":"https://developers.cloudflare.com/workers/wrangler/commands/containers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/containers/","name":"Containers"}}]}
```
