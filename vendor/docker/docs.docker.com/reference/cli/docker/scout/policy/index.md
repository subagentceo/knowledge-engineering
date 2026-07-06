# docker scout policy

**Description:** Evaluate local Rego policies against an image and display the results (experimental)


**Usage:** `docker scout policy [IMAGE | REPO]`





> [!NOTE]
> **Experimental**
>
> This command is experimental. Experimental features are intended for testing and feedback as their functionality or design may change between releases without warning or can be removed entirely in a future release.





## Description

The `docker scout policy` command evaluates policies against an image.
The image analysis is uploaded to Docker Scout where policies get evaluated.

The policy evaluation results may take a few minutes to become available.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-e`, `--exit-code` |  |  Return exit code '2' if policies are not met, '0' otherwise |
| `--only-policy` |  |  Comma separated list of policies to evaluate |
| `--org` |  |  Namespace of the Docker organization |
| `-o`, `--output` |  |  Write the report to a file |
| `--platform` |  |  Platform of image to evaluate policies against |
| `--policy-bundle` |  |  OCI reference of a policy bundle to evaluate (repeatable) |
| `--policy-config` |  |  Path or http(s) URL to a JSON file configuring policy enablement and inputs<br> |
| `--policy-dir` |  |  Path to a directory of local .rego policy files (repeatable) |
| `--policy-file` |  |  Path or http(s) URL to a .rego policy file (repeatable) |
| `--result-file` |  |  Write the full Rego evaluation result (pass, violations, query bindings and OPA metrics) of each evaluated policy to a JSON file (useful when iterating on local --policy-file policies)<br> |



## Examples

### Evaluate policies against an image and display the results

```console
$ docker scout policy dockerscoutpolicy/customers-api-service:0.0.1
```

### Evaluate policies against an image for a specific organization

```console
$ docker scout policy dockerscoutpolicy/customers-api-service:0.0.1 --org dockerscoutpolicy
```

### Evaluate policies against an image with a specific platform

```console
$ docker scout policy dockerscoutpolicy/customers-api-service:0.0.1 --platform linux/amd64
```

### Compare policy results for a repository in a specific environment

```console
$ docker scout policy dockerscoutpolicy/customers-api-service --to-env production
```


## Subcommands

| Command | Description |
|---------|-------------|
| [`docker scout policy publish`](https://docs.docker.com/reference/cli/docker/scout/policy/publish/) | Package local Rego policies into an OCI bundle and push it to a registry (experimental)
 |


