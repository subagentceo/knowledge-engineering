# docker scout policy publish

**Description:** Package local Rego policies into an OCI bundle and push it to a registry (experimental)


**Usage:** `docker scout policy publish [OPTIONS] REFERENCE`





> [!NOTE]
> **Experimental**
>
> This command is experimental. Experimental features are intended for testing and feedback as their functionality or design may change between releases without warning or can be removed entirely in a future release.





## Description

The docker scout policy publish command packages Rego policies into an OCI policy bundle and pushes it to a registry. The published bundle can then be evaluated with docker scout policy --policy-bundle REFERENCE.

When no --policy-file or --policy-dir is given, the built-in default policy set is published. Authentication uses your existing registry credentials (run "docker login" first).


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--policy-dir` |  |  Path to a directory of local .rego policy files to include (repeatable)<br> |
| `--policy-file` |  |  Path or http(s) URL to a .rego policy file to include (repeatable) |



## Examples

  Publish the built-in default policies:
  $ docker scout policy publish registry.example.com/policies:latest[0m

  Publish a directory of local policies:
  $ docker scout policy publish --policy-dir ./rego registry.example.com/policies:latest[0m

  Publish specific policy files:
  $ docker scout policy publish --policy-file fixable.rego --policy-file licenses.rego registry.example.com/policies:latest[0m



