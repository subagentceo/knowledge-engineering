# docker buildx history rm

**Description:** Remove build records

**Usage:** `docker buildx history rm [OPTIONS] [REF...]`










## Description

Remove one or more build records from the current builder’s history. You can
remove specific builds by ID or offset, or delete all records at once using
the `--all` flag.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--all` |  |  Remove all build records |



## Examples

### Remove a specific build

```console
# Using a build ID
docker buildx history rm qu2gsuo8ejqrwdfii23xkkckt

# Or using a relative offset
docker buildx history rm ^1
```

### Remove multiple builds

```console
# Using build IDs
docker buildx history rm qu2gsuo8ejqrwdfii23xkkckt qsiifiuf1ad9pa9qvppc0z1l3

# Or using relative offsets
docker buildx history rm ^1 ^2
```

### Remove all build records from the current builder (--all) {#all}

```console
docker buildx history rm --all
```



