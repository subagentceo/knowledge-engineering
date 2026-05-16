1.  [Usage](/osv-scanner/usage/)
2.  License Scanning

# [](#license-scanning)License Scanning

Table of contents

-   [License Scanning](#license-scanning)
    -   [License Summary and Violations](#license-summary-and-violations)
        -   [License violations example](#license-violations-example)
    -   [Override License](#override-license)

OSV-Scanner supports license checking as an official feature. The data comes from the [deps.dev API](https://docs.deps.dev/api/).

## [](#license-summary-and-violations)License Summary and Violations

The `--licenses` flag provides a summary of the licenses used by your dependencies. To also display violations, you can provide an allowlist of permitted licenses as an argument:

```
# Show license summary only
osv-scanner --licenses path/to/repository

# Show the license summary and violations against an allowlist (provide the list after the = sign):
osv-scanner --licenses="comma-separated list of allowed licenses" path/to/directory
```

Include your allowed licenses as a comma-separated list. OSV-Scanner recognizes licenses in SPDX format. Please indicate your allowed licenses using [SPDX license](https://spdx.org/licenses/) identifiers.

### [](#license-violations-example)License violations example

If you wanted to allow the following licenses:

-   [BSD 3-Clause “New” or “Revised” License](https://spdx.org/licenses/BSD-3-Clause.html)
-   [Apache License 2.0](https://spdx.org/licenses/Apache-2.0.html)
-   [MIT](https://spdx.org/licenses/MIT.html)

Your command would be in this form:

```
osv-scanner --licenses="BSD-3-Clause,Apache-2.0,MIT" path/to/directory
```

## [](#override-license)Override License

Sometimes, the license either cannot be retrieved, or does not apply to your specific use. In those cases, you can override the license of a specific package by setting it in the config file.

See the [configuration docs](/osv-scanner/configuration/) for how to do this.

* * *

This site uses [Just the Docs](https://github.com/just-the-docs/just-the-docs), a documentation theme for Jekyll.