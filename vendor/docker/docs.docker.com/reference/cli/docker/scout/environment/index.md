# docker scout environment

**Description:** Manage environments (experimental)

**Usage:** `docker scout environment [ENVIRONMENT] [IMAGE]`

**Aliases:** `docker scout env`



> [!NOTE]
> **Experimental**
>
> This command is experimental. Experimental features are intended for testing and feedback as their functionality or design may change between releases without warning or can be removed entirely in a future release.





## Description

The `docker scout environment` command lists the environments.
If you pass an image reference, the image is recorded to the specified environment.

Once recorded, environments can be referred to by their name. For example,
you can refer to the `production` environment with the `docker scout compare`
command as follows:

```console
$ docker scout compare --to-env production
```


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--org` |  |  Namespace of the Docker organization |
| `-o`, `--output` |  |  Write the report to a file |
| `--platform` |  |  Platform of image to record |



## Examples

### List existing environments

```console
$ docker scout environment
prod
staging
```

### List images of an environment

```console
$ docker scout environment staging
namespace/repo:tag@sha256:9a4df4fadc9bbd44c345e473e0688c2066a6583d4741679494ba9228cfd93e1b
namespace/other-repo:tag@sha256:0001d6ce124855b0a158569c584162097fe0ca8d72519067c2c8e3ce407c580f
```

### Record an image to an environment, for a specific platform

```console
$ docker scout environment staging namespace/repo:stage-latest --platform linux/amd64
✓ Pulled
✓ Successfully recorded namespace/repo:stage-latest in environment staging
```



