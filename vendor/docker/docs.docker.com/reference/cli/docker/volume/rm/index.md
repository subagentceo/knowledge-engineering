# docker volume rm

**Description:** Remove one or more volumes

**Usage:** `docker volume rm [OPTIONS] VOLUME [VOLUME...]`

**Aliases:** `docker volume remove`








## Description

Remove one or more volumes. You can't remove a volume that's in use by a container.



## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  | API 1.25+ Force the removal of one or more volumes |



## Examples

```console
$ docker volume rm hello

hello
```



