# docker buildx dap build

**Description:** Start a build

**Usage:** `docker buildx dap build [OPTIONS] PATH | URL | -`










## Description

Start a debug session using the [debug adapter protocol](https://microsoft.github.io/debug-adapter-protocol/overview) to communicate with the debugger UI.

Arguments are the same as the `build`

> [!NOTE]
> `buildx dap build` command may receive backwards incompatible features in the future
> if needed. We are looking for feedback on improving the command and extending
> the functionality further.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--add-host` |  |  Add a custom host-to-IP mapping (format: `host:ip`) |
| `--allow` |  |  Allow extra privileged entitlement (e.g., `network.host`, `security.insecure`, `device`, `buildx.local.delete`)<br> |
| `--annotation` |  |  Add annotation to the image |
| `--attest` |  |  Attestation parameters (format: `type=sbom,generator=image`) |
| `--build-arg` |  |  Set build-time variables |
| `--build-context` |  |  Additional build contexts (e.g., name=path) |
| `--cache-from` |  |  External cache sources (e.g., `user/app:cache`, `type=local,src=path/to/dir`)<br> |
| `--cache-to` |  |  Cache export destinations (e.g., `user/app:cache`, `type=local,dest=path/to/dir`)<br> |
| `--call` | `build` |  Set method for evaluating build (`check`, `outline`, `targets`) |
| `--cgroup-parent` |  |  Set the parent cgroup for the `RUN` instructions during build |
| `--check` |  |  Shorthand for `--call=check` |
| `-f`, `--file` |  |  Name of the Dockerfile (default: `PATH/Dockerfile`) |
| `--iidfile` |  |  Write the image ID to a file |
| `--label` |  |  Set metadata for an image |
| `--load` |  |  Shorthand for `--output=type=docker` |
| `--metadata-file` |  |  Write build result metadata to a file |
| `--network` |  |  Set the networking mode for the `RUN` instructions during build |
| `--no-cache` |  |  Do not use cache when building the image |
| `--no-cache-filter` |  |  Do not cache specified stages |
| `-o`, `--output` |  |  Output destination (format: `type=local,dest=path`) |
| `--platform` |  |  Set target platform for build |
| `--policy` |  |  Policy configuration (format: `filename=path[,filename=path][,reset=true|false][,disabled=true|false][,strict=true|false][,log-level=level]`)<br> |
| `--progress` | `auto` |  Set type of progress output (`auto`, `none`,  `plain`, `quiet`, `rawjson`, `tty`). Use plain to show container output<br> |
| `--provenance` |  |  Shorthand for `--attest=type=provenance` |
| `--pull` |  |  Always attempt to pull all referenced images |
| `--push` |  |  Shorthand for `--output=type=registry,unpack=false` |
| `-q`, `--quiet` |  |  Suppress the build output and print image ID on success |
| `--resource` |  |  Resource limits for build containers (format: `memory=2g`, `cpu-quota=50000`)<br> |
| `--sbom` |  |  Shorthand for `--attest=type=sbom` |
| `--secret` |  |  Secret to expose to the build (format: `id=mysecret[,src=/local/secret]`)<br> |
| `--shm-size` |  |  Shared memory size for build containers |
| `--ssh` |  |  SSH agent socket or keys to expose to the build (format: `default|<id>[=<socket>|<key>[,<key>]]`)<br> |
| `-t`, `--tag` |  |  Image identifier (format: `[registry/]repository[:tag]`) |
| `--target` |  |  Set the target build stage to build |
| `--ulimit` |  |  Ulimit options |



## Examples

### Launch request arguments {#launch-config}

The following [launch request arguments](https://microsoft.github.io/debug-adapter-protocol/specification#Requests_Launch) are supported. These are sent as a JSON body as part of the launch request.

| Name                | Type          | Default      | Description                                                                  |
|:--------------------|:--------------|:-------------|:-----------------------------------------------------------------------------|
| `dockerfile`        | `string`      | `Dockerfile` | Name of the Dockerfile                                                       |
| `contextPath`       | `string`      | `.`          | Set the context path for the build (normally the first positional argument)  |
| `target`            | `string`      |              | Set the target build stage to build                                          |
| `stopOnEntry`       | `boolean`     | `false`      | Stop on the first instruction                                                |

### Additional Arguments {#additional-args}

Command line arguments may be passed to the debug adapter the same way they would be passed to the normal build command and they will set the value.
Launch request arguments that are set will override command line arguments if they are present.

A debug extension should include an `args` and `builder` entry in the launch configuration. These will modify the arguments passed to the binary for the tool invocation.
`builder` will add `--builder <arg>` directly after the executable and `args` will append to the end of the tool invocation.
For example, a launch configuration in Visual Studio Code with the following:

```json
{
    "args": ["--build-arg", "FOO=AAA"]
    "builder": ["mybuilder"]
}
```

This should cause the debug adapter to be invoked as `docker buildx --builder mybuilder dap build --build-arg FOO=AAA`.



