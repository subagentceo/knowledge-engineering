---
title: "Code Mappings"
description: "Upload code mappings to Sentry via the CLI. Code mappings link stack trace paths to source code paths in your repository, enabling source context, suspect commits, and code owners."
url: https://docs.sentry.io/cli/code-mappings/
---

# Code Mappings

*Available in version 3.3.4 of Sentry CLI*

Code mappings link stack trace paths to source code paths in your repository. They enable features like [source context](https://docs.sentry.io/platforms/java/source-context.md), [suspect commits](https://docs.sentry.io/product/issues/suspect-commits.md), [stack trace linking](https://docs.sentry.io/integrations/source-code-mgmt/github.md#stack-trace-linking), and [code owners](https://docs.sentry.io/product/issues/ownership-rules.md).

You can [manage code mappings through the Sentry web UI](https://docs.sentry.io/product/issues/suspect-commits.md#set-up-code-mappings), or upload them in bulk using Sentry CLI. It is also possible to upload code mappings automatically in your CI process to keep them in sync with your repository structure.

## [Permissions](https://docs.sentry.io/cli/code-mappings.md#permissions)

Sentry CLI requires an [Organization Token](https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/) with the `org:ci` scope to upload code mappings.

## [Upload Code Mappings](https://docs.sentry.io/cli/code-mappings.md#upload-code-mappings)

Use the `sentry-cli code-mappings upload` command to upload code mappings:

```bash
sentry-cli code-mappings upload ./mappings.json
```

Run `sentry-cli code-mappings upload --help` to see all available options.

### [JSON File Format](https://docs.sentry.io/cli/code-mappings.md#json-file-format)

The input file should be a JSON array of mapping objects, each with a `stackRoot` and `sourceRoot`:

* **stackRoot**: The path prefix as it appears in stack traces (e.g. `io/sentry/android/core` for Java, `src/` for Python/JS).
* **sourceRoot**: The corresponding path in your repository where the source code lives.

Multiple mappings can share the same `stackRoot` if they point to different `sourceRoot` paths. This is useful for monorepos where the same package prefix exists in multiple modules. Sentry evaluates mappings from most specific to least specific, using the first one that resolves to a real file in the repository.

#### [Example](https://docs.sentry.io/cli/code-mappings.md#example)

The following example is based on the [getsentry/sentry-java](https://github.com/getsentry/sentry-java) monorepo, which has multiple modules sharing the `io/sentry` package prefix:

`mappings.json`

```json
[
  {
    "stackRoot": "io/sentry/android/core",
    "sourceRoot": "sentry-android-core/src/main/java/io/sentry/android/core"
  },
  {
    "stackRoot": "io/sentry/opentelemetry",
    "sourceRoot": "sentry-opentelemetry/sentry-opentelemetry-core/src/main/java/io/sentry/opentelemetry"
  },
  {
    "stackRoot": "io/sentry/opentelemetry",
    "sourceRoot": "sentry-opentelemetry/sentry-opentelemetry-bootstrap/src/main/java/io/sentry/opentelemetry"
  },
  {
    "stackRoot": "io/sentry",
    "sourceRoot": "sentry/src/main/java/io/sentry"
  }
]
```
