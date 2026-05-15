# [](#flag-deprecated-packages)Flag Deprecated Packages

Experimental

OSV-Scanner can identify and report unsupported or removed packages in dependencies.

This feature leverages the [deps.dev API](https://docs.deps.dev/api/).

## [](#deprecation-status)Deprecation Status

The `deprecated` field is a boolean value indicating if a package is flagged as unsupported. This includes states such as:

-   **Deprecated**: Marked as deprecated by the author.
-   **Yanked**: Removed from the registry.

## [](#usage)Usage

To enable package deprecation reporting, use the `--experimental-flag-deprecated-packages` flag. The feature is not available in the `spdx` format.

### [](#project-source-scanning)Project Source Scanning

```
osv-scanner scan source --experimental-flag-deprecated-packages -r /path/to/project
```

For more details on source scanning, see [Project Source Scanning](/osv-scanner/usage/scan-source).

### [](#container-images-scanning)Container Images Scanning

```
# Scan a local or remote image by name
osv-scanner scan image --experimental-flag-deprecated-packages my-image:tag

# Scan an exported image archive
osv-scanner scan image --experimental-flag-deprecated-packages --archive ./path/to/my-image.tar
```

For more details on image scanning, see [Container Image Scanning](/osv-scanner/usage/scan-image).

## [](#output)Output

When enabled, the output reports deprecated packages as follows:

-   **Table, Markdown, HTML**: A dedicated section listing deprecated packages.
-   **JSON**: A `deprecated` field in the `package` object.
-   **SARIF**: A “Deprecated” column in the “Affected Packages” table.
-   **CycloneDX**: A `deprecated` property in `component`.

If no deprecated packages are detected, the corresponding section or field is omitted.

Example JSON Output

```
{
  "results": [
    {
      "source": {
        "path": "/path/to/lockfile",
        "type": "lockfile"
      },
      "packages": [
        {
          "package": {
            "name": "deprecated-package",
            "version": "1.0.0",
            "ecosystem": "npm",
            "deprecated": true
          }
        },
        {
          "package": {
            "name": "not-deprecated-package",
            "version": "2.0.0",
            "ecosystem": "npm"
          }
        }
      ]
    }
  ]
}
```