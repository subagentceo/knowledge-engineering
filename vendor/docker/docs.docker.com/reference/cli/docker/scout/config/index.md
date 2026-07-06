# docker scout config

**Description:** Manage Docker Scout configuration

**Usage:** `docker scout config [KEY] [VALUE]`










## Description

`docker scout config` allows you to list, get and set Docker Scout configuration.

Available configuration key:

- `organization`: Namespace of the Docker organization to be used by default.




## Examples

### List existing configuration

```console
$ docker scout config
organization=my-org-namespace
```

### Print configuration value

```console
$ docker scout config organization
my-org-namespace
```

### Set configuration value

```console
$ docker scout config organization my-org-namespace
    ✓ Successfully set organization to my-org-namespace
```



