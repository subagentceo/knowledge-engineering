# docker buildx use

**Description:** Set the current builder instance

**Usage:** `docker buildx use [OPTIONS] NAME`










## Description

Switches the current builder instance. Build commands invoked after this command
will run on a specified builder. Alternatively, a context name can be used to
switch to the default builder of that context.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--default` |  |  Set builder as default for current context |
| `--global` |  |  Builder persists context changes |



## Examples

### Override the configured builder instance (--builder) {#builder}

Same as [`buildx --builder`](/reference/cli/docker/buildx/#builder).



