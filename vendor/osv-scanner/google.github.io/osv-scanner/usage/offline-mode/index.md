1.  [Usage](/osv-scanner/usage/)
2.  Offline Mode

# [](#offline-mode)Offline Mode

Table of contents

-   [Offline Mode](#offline-mode)
    -   [Specify database location](#specify-database-location)
    -   [Offline option](#offline-option)
    -   [Download offline databases option](#download-offline-databases-option)
    -   [Manual database download](#manual-database-download)
    -   [Limitations](#limitations)

OSV-Scanner now supports offline scanning as an official feature. Offline scanning checks your project against a local database instead of calling the OSV.dev API.

## [](#specify-database-location)Specify database location

Our offline features require the use of a local database, the location of which is determined through the use of the `OSV_SCANNER_LOCAL_DB_CACHE_DIRECTORY` environment variable.

The local database file structure is in this form:

```
{local_db_dir}/
  osv-scanner/
    npm/all.zip
    PyPI/all.zip
    …
    {ecosystem}/all.zip
```

Where `{local_db_dir}` can be set by the `OSV_SCANNER_LOCAL_DB_CACHE_DIRECTORY` environment variable.

If the `OSV_SCANNER_LOCAL_DB_CACHE_DIRECTORY` environment variable is _not_ set, OSV-Scanner will attempt to look for the database in the following locations, in this order:

1.  The location returned by [`os.UserCacheDir`](https://pkg.go.dev/os#UserCacheDir)
2.  The location returned by [`os.TempDir`](https://pkg.go.dev/os#TempDir)

The database can be [downloaded manually](#manual-database-download) or by using the [`--download-offline-databases` flag](#download-offline-databases-option).

## [](#offline-option)Offline option

The offline database flag `--offline` causes OSV-Scanner to scan your project against a previously downloaded local database. OSV-Scanner will not download or update the local database, nor will it send any project or dependency information anywhere. When a local database is not present, you will get an error message. No network connection is required when using this flag.

```
osv-scanner --offline ./path/to/your/dir
```

To use offline mode for just the vulnerability database, but allow other features to possibly make network requests (e.g. [transitive dependency scanning](/osv-scanner/supported-languages-and-lockfiles/#transitive-dependency-scanning)), you can use the `--offline-vulnerabilities` flag instead.

## [](#download-offline-databases-option)Download offline databases option

The download offline databases flag `--download-offline-databases` allows OSV-Scanner to download or update your local database when running in offline mode, to make it easier to get started. This option only works when you also set the offline flag.

```
osv-scanner --offline-vulnerabilities --download-offline-databases ./path/to/your/dir
```

## [](#manual-database-download)Manual database download

Instead of using the `--download-offline-databases` flag to download the database, it is possible to manually download the database.

A downloadable copy of the OSV database is stored in a GCS bucket maintained by OSV: [`gs://osv-vulnerabilities`](https://osv-vulnerabilities.storage.googleapis.com)

This bucket contains zip files containing all vulnerabilities for each ecosystem at: `gs://osv-vulnerabilities/<ECOSYSTEM>/all.zip`.

E.g. for PyPI vulnerabilities:

```
gcloud storage cp gs://osv-vulnerabilities/PyPI/all.zip .
```

You can also download over HTTP via `https://osv-vulnerabilities.storage.googleapis.com/<ECOSYSTEM>/all.zip`.

A list of all current ecosystems is available at [`gs://osv-vulnerabilities/ecosystems.txt`](https://osv-vulnerabilities.storage.googleapis.com/ecosystems.txt).

Set the location of your manually downloaded database by following the instructions [here](#specify-database-location).

## [](#limitations)Limitations

1.  Commit level scanning is not supported.

* * *

This site uses [Just the Docs](https://github.com/just-the-docs/just-the-docs), a documentation theme for Jekyll.