# docker dhi customization prepare

**Description:** Prepare a new customization YAML file from a DHI base image tag

**Usage:** `docker dhi customization prepare <dhi-repository> <tag>`










## Description

Prepare a new single or bulk customization YAML file by fetching tag details from Docker Hardened Images.
This creates a scaffold YAML file that can be used with the create command.

Single customization — provide the DHI source repository and tag as positional arguments:
  docker dhi customization prepare golang 1.24-dev --destination myorg/dhi-golang

Bulk customization — pipe a JSON array of {destination, tag-definition-id} objects via stdin:
  echo '[{"destination":"myorg/dhi-golang","tag-definition-id":"golang/alpine-3.23/1.24-dev"}]' \
    | docker dhi customization prepare --name my-custo

The scaffold is written to stdout; redirect to a file if needed:
  docker dhi customization prepare golang 1.24-dev > customization.yaml

Run 'docker dhi customization list' to see available source repositories,
or use shell completion to discover repository names and tags.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-d`, `--destination` |  |  Destination repository (e.g. myorg/dhi-golang) |
| `-n`, `--name` |  |  Name for the customization |






