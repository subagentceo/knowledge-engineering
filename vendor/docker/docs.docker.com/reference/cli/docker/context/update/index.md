# docker context update

**Description:** Update a context

**Usage:** `docker context update [OPTIONS] CONTEXT`










## Description

Updates an existing `context`.
See [context create](/reference/cli/docker/context/create/).


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--description` |  |  Description of the context |
| `--docker` |  |  set the docker endpoint |



## Examples

### Update an existing context

```console
$ docker context update \
    --description "some description" \
    --docker "host=tcp://myserver:2376,ca=~/ca-file,cert=~/cert-file,key=~/key-file" \
    my-context
```



