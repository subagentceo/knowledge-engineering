# docker pass plugins

**Description:** Manage secrets engine plugins.

**Usage:** `docker pass plugins`





> [!NOTE]
> **Experimental**
>
> This command is experimental. Experimental features are intended for testing and feedback as their functionality or design may change between releases without warning or can be removed entirely in a future release.





## Description

Manage the plugins that the secrets engine uses to resolve secret references.

Each plugin declares its scope through a pattern, and the engine routes every lookup to the plugins whose pattern matches the requested identifier. A plugin registered with `**` receives every request, while a plugin scoped to `docker/auth/**` only serves Docker auth lookups.

Use the subcommands to inspect which plugins are registered and their current status, to enable or disable configurable plugins at runtime, and to set up or tear down plugin-specific credentials (such as the 1Password service account token).




## Examples

List all registered plugins and their status:

```sh
docker pass plugins ls
```

Enable or disable a configurable plugin:

```sh
docker pass plugins enable 1password-cli
docker pass plugins disable 1password-cli
```


## Subcommands

| Command | Description |
|---------|-------------|
| [`docker pass plugins 1password`](https://docs.docker.com/reference/cli/docker/pass/plugins/1password/) | Manage the 1Password SDK plugin. |
| [`docker pass plugins disable`](https://docs.docker.com/reference/cli/docker/pass/plugins/disable/) | Disable a secrets engine plugin. |
| [`docker pass plugins enable`](https://docs.docker.com/reference/cli/docker/pass/plugins/enable/) | Enable a secrets engine plugin. |
| [`docker pass plugins ls`](https://docs.docker.com/reference/cli/docker/pass/plugins/ls/) | List registered secrets engine plugins. |


