# [](#usage)Usage

This documentation is for the V2 release. For the older, V1 release documentation, check out [https://google.github.io/osv-scanner-v1](https://google.github.io/osv-scanner-v1).

Table of contents

-   [Usage](#usage)
    -   [Core Concept](#core-concept)
    -   [Subcommands](#subcommands)
        -   [The `scan` Subcommand](#the-scan-subcommand)
    -   [Post-Extraction Flags](#post-extraction-flags)
        -   [Saving to File](#saving-to-file)
        -   [Setting Output Format](#setting-output-format)
        -   [Override config file](#override-config-file)
        -   [Set verbosity level](#set-verbosity-level)
        -   [Serve HTML report locally](#serve-html-report-locally)
        -   [Offline vulnerability match](#offline-vulnerability-match)
        -   [Licenses scanning](#licenses-scanning)
        -   [Show all packages](#show-all-packages)
        -   [Other features](#other-features)
    -   [Pre-Commit Integration](#pre-commit-integration)
        -   [Examples](#examples)
    -   [Running in a Docker Container](#running-in-a-docker-container)

## [](#core-concept)Core Concept

OSV-Scanner operates in a two-step process:

1.  **Package Extraction**: The tool first extracts information about the packages used in your project, container image, or other target.
    
2.  **Vulnerability Matching**: The extracted package information is then matched against known vulnerability databases to identify potential security issues.
    

## [](#subcommands)Subcommands

OSV-Scanner V2 is divided into several subcommands:

Subcommand

Documentation Link

Quick Example

`scan`

[Further down this page](/osv-scanner/usage/#scan-subcommand)

`osv-scanner scan -r ./my-project-dir/`

`scan source`

[Source Project Scanning](/osv-scanner/usage/scan-source)

Source scanning is default, so the example is the same as above.

`scan image`

[Container Scanning](/osv-scanner/usage/scan-image)

`osv-scanner scan image my-docker-img:latest`

`fix`

[Guided Remediation](/osv-scanner/experimental/guided-remediation/)

`osv-scanner fix -M path/to/package.json -L path/to/package-lock.json`

Guided remediation (the `fix` command) can be risky when run on untrusted projects. It may trigger the package manager to execute scripts or follow external registries specified in the project. Please ensure you trust the source code and artifacts before proceeding.

### [](#the-scan-subcommand)The `scan` Subcommand

The `scan` subcommand is the primary way to initiate vulnerability scans. It has two subcommands of its own: `source` (default) and `image`.

-   **`scan source`**: Scans source code directories for package dependencies and vulnerabilities. See the [Scanning Source documentation](/osv-scanner/usage/scan-source) for more details.
    
-   **`scan image`**: Scans container images for vulnerabilities. See the [Scanning Container Images documentation](/osv-scanner/usage/scan-image) for more details.
    

Both `scan source` and `scan image` share a common set of flags for configuring the scan and output.

## [](#post-extraction-flags)Post-Extraction Flags

### [](#saving-to-file)Saving to File

The `--output-file` flag can be used to save the scan results to a file instead of being printed on the stdout:

```
osv-scanner scan -L package-lock.json --output-file scan-results.txt
```

### [](#setting-output-format)Setting Output Format

The `--format` flag can be used to specify the output format osv-scanner gives.

See [Output](/osv-scanner/output/) page for more details.

```
osv-scanner scan -L package-lock.json --format json
```

### [](#override-config-file)Override config file

The `--config` flag can be used to specify a global config override to apply to all the files you are scanning.

See [Config](/osv-scanner/configuration/) for more details.

```
osv-scanner scan -L package-lock.json --config ./my-osv-scanner-config.toml
```

### [](#set-verbosity-level)Set verbosity level

The `--verbosity` flag can be used to set the verbosity level. See `--help` output for possible levels.

```
osv-scanner scan -L package-lock.json --verbosity info
```

### [](#serve-html-report-locally)Serve HTML report locally

The `--serve` flag is a helper flag to set the output format to HTML, and serve the report locally on port 8000.

```
osv-scanner scan -L package-lock.json --serve
```

### [](#offline-vulnerability-match)Offline vulnerability match

The `--offline-vulnerabilities` flag can be used to check for vulnerabilities using local databases that are already cached

```
osv-scanner --offline-vulnerabilities --download-offline-databases ./path/to/your/dir
```

See [offline vulnerabilities](/osv-scanner/usage/offline-mode/) for more details.

### [](#licenses-scanning)Licenses scanning

The `--licenses` flag can be used to report license violations based on an allowlist

```
# Show license summary only
osv-scanner --licenses path/to/repository

# Show the license summary and violations against an allowlist (provide the list after the = sign):
osv-scanner --licenses="comma-separated list of allowed licenses" path/to/directory
```

See [licenses scanning](/osv-scanner/usage/license-scanning/) for more details.

### [](#show-all-packages)Show all packages

The `--all-packages` flag can be used to output all packages in JSON format (make sure to set `--format=json`).

Note that the `PackageOverrides` configuration, specifically the `ignore` action, takes precedence over this flag.

See [configuration](/osv-scanner/configuration/#override-packages) for more details.

```
osv-scanner --all-packages --format=json path/to/repository
```

### [](#other-features)Other features

Several other features are available through flags. See their respective documentation pages for more details:

-   `--no-resolve`: Disables [transitive dependency resolution](/osv-scanner/supported-languages-and-lockfiles/#transitive-dependency-scanning).

## [](#pre-commit-integration)Pre-Commit Integration

OSV-Scanner can be integrated as a [pre-commit](https://pre-commit.com) hook in your project.

1.  Add the `osv-scanner` hook to your `.pre-commit-config.yaml` file.
    
2.  Use the `args` key to pass command-line arguments as you would when running OSV-Scanner directly.
    
3.  Verify your configuration with:
    

```
pre-commit run --all-files --verbose osv-scanner
```

### [](#examples)Examples

```
# Scan the current directory.
repos:
  - repo: https://github.com/google/osv-scanner/
    rev: v2.2.4
    hooks:
      - id: osv-scanner

# Scan the current directory, this equivalent as the previous one, but with custom
# user defined arguments. The arguments (`args` key) are the defaults.
repos:
  - repo: https://github.com/google/osv-scanner/
    rev: v2.2.4
    hooks:
      - id: osv-scanner
        args:
          - "scan"
          - "source"
          - "--format=vertical"
          - "--verbosity=error"
          - "--recursive"
          - "." # replace with your chosen directory or lock file

# Scan a container image. The `docker` command should be present in your PATH.
repos:
  - repo: https://github.com/google/osv-scanner/
    rev: v2.2.4
    hooks:
      - id: osv-scanner
        args:
          - "scan"
          - "image"
          - "--format=vertical"
          - "--verbosity=error"
          - "debian:trixie" # replace with your chosen image (the tag is mandatory)
```

## [](#running-in-a-docker-container)Running in a Docker Container

The OSV-Scanner Docker image can be pulled from the GitHub Container Registry:

```
docker pull ghcr.io/google/osv-scanner:latest
```

Once you have the image, you can test that it works by running:

```
docker run ghcr.io/google/osv-scanner -h
```

To run a scan, mount the directory to scan to `/src` and pass the necessary flags:

```
docker run -v ${PWD}:/src ghcr.io/google/osv-scanner -L /src/go.mod
```

* * *

## Table of contents

-   [Container Image Scanning](/osv-scanner/usage/scan-image)
-   [Project Source Scanning](/osv-scanner/usage/scan-source)
-   [License Scanning](/osv-scanner/usage/license-scanning/)
-   [Offline Mode](/osv-scanner/usage/offline-mode/)

* * *

This site uses [Just the Docs](https://github.com/just-the-docs/just-the-docs), a documentation theme for Jekyll.