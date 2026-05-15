---
title: "Installation"
description: "Learn about the different methods available to install `sentry-cli`."
url: https://docs.sentry.io/cli/installation/
---

# Installation

Depending on your platform, there are different methods available to install `sentry-cli`.

## [Manual Download](https://docs.sentry.io/cli/installation.md#manual-download)

You can find the list of releases on [the GitHub release page](https://github.com/getsentry/sentry-cli/releases/). We provide executables for Linux, OS X and Windows. It’s a single file download and upon receiving the file you can rename it to just `sentry-cli` or `sentry-cli.exe` to use it.

## [Automatic Installation](https://docs.sentry.io/cli/installation.md#automatic-installation)

If you are on macOS or Linux, you can use the automated downloader which will fetch the latest release version for you and install it:

```bash
curl -sL https://sentry.io/get-cli/ | sh
```

We do however, encourage you to pin the specific version of the CLI, so your builds are always reproducible. To do that, you can use the exact same method, with an additional version specifier:

```bash
curl -sL https://sentry.io/get-cli/ | SENTRY_CLI_VERSION="3.4.2" sh
```

This will automatically download the correct version of `sentry-cli` for your operating system and install it. If necessary, it will prompt for your admin password for `sudo`. For a different installation location or for systems without `sudo` (like Windows), you can `export INSTALL_DIR=/custom/installation/path` before running this command.

To verify it's installed correctly you can bring up the help:

```bash
sentry-cli --help
```

## [Installation via NPM](https://docs.sentry.io/cli/installation.md#installation-via-npm)

There is also the option to install `sentry-cli` via npm for specialized use cases. This, for instance, is useful for build servers. The package is called `@sentry/cli` and in the post installation it will download the appropriate release binary:

```bash
npm install @sentry/cli
```

You can then find it in the `.bin` folder:

```bash
./node_modules/.bin/sentry-cli --help
```

In case you want to install this with npm system wide with sudo you will need to pass `--unsafe-perm` to it:

```bash
sudo npm install -g @sentry/cli --unsafe-perm
```

This installation is not recommended however.

### [Downloading From a Custom Source](https://docs.sentry.io/cli/installation.md#downloading-from-a-custom-source)

By default, this package will download sentry-cli from the CDN managed by [Fastly](https://www.fastly.com/). To use a custom CDN, set the npm config property `sentrycli_cdnurl`. The downloader will append `"/<version>/sentry-cli-<dist>"`.

```bash
npm install @sentry/cli --sentrycli_cdnurl=https://mymirror.local/path
```

Or add property into your `.npmrc` file (<https://docs.npmjs.com/files/npmrc>)

```bash
sentrycli_cdnurl=https://mymirror.local/path
```

Another option is to use the environment variable `SENTRYCLI_CDNURL`.

```bash
SENTRYCLI_CDNURL=https://mymirror.local/path npm install @sentry/cli
```

### [Available Installation Options](https://docs.sentry.io/cli/installation.md#available-installation-options)

Options listed below control how `sentry-cli` install script behaves, when installed through `npm`.

`SENTRYCLI_CDNURL`:

If set, the script will use given URL for fetching the binary. Defaults to `https://downloads.sentry-cdn.com/sentry-cli`.

`SENTRYCLI_USE_LOCAL`:

If set to `1`, `sentry-cli` binary will be discovered from your `$PATH` and copied locally instead of being downloaded from external servers. It will still verify the version number, which has to match.

`SENTRYCLI_SKIP_DOWNLOAD`:

If set to `1`, the script will skip downloading the binary completely.

`SENTRYCLI_SKIP_CHECKSUM_VALIDATION`:

If set to `1`, the script will skip the checksum validation phase. You can manually verify the checksums by visiting [Build Checksums](https://docs.sentry.io/cli/installation.md#build-checksums) page.

`SENTRYCLI_NO_PROGRESS_BAR`:

If set to `1`, the script will not display download progress bars. This is a default behavior for CI environments.

`SENTRYCLI_LOG_STREAM`:

If set, the script will change where it writes its output. Possible values are `stdout` and `stderr`. Defaults to `stdout`.

## [Installation via Homebrew](https://docs.sentry.io/cli/installation.md#installation-via-homebrew)

If you are on OS X, you can install `sentry-cli` via homebrew:

```bash
brew install getsentry/tools/sentry-cli
```

## [Installation via Scoop](https://docs.sentry.io/cli/installation.md#installation-via-scoop)

If you are on Windows, you can install `sentry-cli` via [Scoop](https://scoop.sh):

```powershell
> scoop install sentry-cli
```

## [Docker Image](https://docs.sentry.io/cli/installation.md#docker-image)

For unsupported distributions and CI systems, we offer a Docker image that comes with `sentry-cli` preinstalled. It is recommended to use the `latest` tag, but you can also pin to a specific version. By default, the command runs inside the `/work` directory. Mount relevant project folders and build outputs there to allow `sentry-cli` to scan for resources:

```bash
docker pull getsentry/sentry-cli
docker run --rm -v $(pwd):/work getsentry/sentry-cli --help
```

## [Updating and Uninstalling](https://docs.sentry.io/cli/installation.md#updating-and-uninstalling)

You can use `sentry-cli update` and `sentry-cli uninstall` to update or uninstall the `sentry-cli` binary. These commands may be unavailable in certain situations, generally when `sentry-cli` has been installed by a tool like homebrew or yarn, either directly or as a dependency of another package. In those cases, the same tool will need to be used for updating and removal. If you find that `sentry-cli update` and `sentry-cli uninstall` aren't working and you don't know how the package was installed, running `which sentry-cli` will often provide a clue as to which tool to use.

## [Build Checksums](https://docs.sentry.io/cli/installation.md#build-checksums)

When downloading an executable from a remote server, it's often a good practice to verify, that what has been downloaded, is in fact what we expect it to be. To make sure that this is the case, we can use checksum validation. A checksum is the value calculated from the contents of a file, in a form of hash, in our case SHA256, and it acts as the data integrity check, as it's always producing the same output, for a given input.

Below is the table of SHA256 checksums for all available build targets that our CLI supports. To calculate the hash of a downloaded file, you can use `sha256sum` utility, which is preinstalled in OSX and most Linux distributions.

| Filename (v<!-- -->3.4.2<!-- -->)                                                                        | Integrity Checksum                                                        |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| sentry-cli-Darwin-arm64                                                                                  | `sha384-206ff3bdabf40a95ea3a330b8c842d90492dba8033ee6473e5287f74dd03b903` |
| sentry-cli-Darwin-universal                                                                              | `sha384-5e724365cdbbc42e4db7b1a1081adb3764dbdea5f26e94ae2124012cf65a8350` |
| sentry-cli-Darwin-x86\_64                                                                                | `sha384-240d9822c8bf6e3f2c893a9d98deb06a7df385531111a1586fc8a2ba8d687f78` |
| sentry-cli-Linux-aarch64                                                                                 | `sha384-6ccc3b59fae821b54da4a35be12a8893b6a25ba1c0c42f78e275ec57018af3d0` |
| sentry-cli-Linux-armv7                                                                                   | `sha384-2ed2f57bb2ee136203ae1632e1b359aa9eff8d28077f66b905c77f3a254976e0` |
| sentry-cli-Linux-i686                                                                                    | `sha384-f0d81697f7af7a51d6ddc361f8ceefe109cd9150b70491f7b6fa5ddba66ad7e2` |
| sentry-cli-Linux-x86\_64                                                                                 | `sha384-d0718d487f2e408ef7d6689c9ee6e9010cd7e842874641156c932f39857f135d` |
| sentry-cli-Windows-aarch64.exe                                                                           | `sha384-90c9e273cd1661774c8bddcfff2ea6ebd4b144a4f3f2a4d667d099fdd30d4dc0` |
| sentry-cli-Windows-i686.exe                                                                              | `sha384-73183ea067a445578b536890cc08b072f2260f3e52a72890f2492f991b67de63` |
| sentry-cli-Windows-x86\_64.exe                                                                           | `sha384-572b4a6c04504302a46e2e1c196ec31cda266b574b1444605426aa8e41d46b8c` |
| sentry\_cli-3.4.2-py3-none-macosx\_10\_15\_x86\_64.whl                                                   | `sha384-e9c3498bb724d0394f5822c7fb48f3002d45bd79d9935d62d97c3b33e67d6dae` |
| sentry\_cli-3.4.2-py3-none-macosx\_11\_0\_arm64.whl                                                      | `sha384-03e1fc0a57d1dbed796cf18c98aa47ff0d50a93e750b6e989065e5df4d5c3e26` |
| sentry\_cli-3.4.2-py3-none-macosx\_11\_0\_universal2.whl                                                 | `sha384-70d97076497078fbe8829143e92001f224f84eb82b8550ff54b37ec961acb1d2` |
| sentry\_cli-3.4.2-py3-none-manylinux\_2\_17\_aarch64.manylinux2014\_aarch64.musllinux\_1\_2\_aarch64.whl | `sha384-6ebca733c0fe6993adb99c2259cbc6c1e48515c0e8b5c87a5afe4fbf9b0887a5` |
| sentry\_cli-3.4.2-py3-none-manylinux\_2\_17\_armv7l.manylinux2014\_armv7l.musllinux\_1\_2\_armv7l.whl    | `sha384-dbf062d23c990110b27e20ae878c930b28ad0fe2dda1fc350c5f35a38dd2d88f` |
| sentry\_cli-3.4.2-py3-none-manylinux\_2\_17\_i686.manylinux2014\_i686.musllinux\_1\_2\_i686.whl          | `sha384-826ddc529e14acf2457259bb8b3fa08bdb4c697614f52521474b172238a10fed` |
| sentry\_cli-3.4.2-py3-none-manylinux\_2\_17\_x86\_64.manylinux2014\_x86\_64.musllinux\_1\_2\_x86\_64.whl | `sha384-563bb366356f180eeaa589106f8db296b2a4a356b575cc8457e2348b3968b42c` |
| sentry\_cli-3.4.2-py3-none-win32.whl                                                                     | `sha384-0af469271620db914a783ea5b49f3638ea6d4d9dee244d427deccea748a7b133` |
| sentry\_cli-3.4.2-py3-none-win\_amd64.whl                                                                | `sha384-17661c677a9b45bb25291955297969f75503e7416e1c864b0b88d898789fcef1` |
| sentry\_cli-3.4.2-py3-none-win\_arm64.whl                                                                | `sha384-bcda818c5908bd76b1ad5cdb75b7ad17ed873ac94df1908f5533ca7c9600c58f` |
| sentry\_cli-3.4.2.tar.gz                                                                                 | `sha384-046cf245288f447f46707ffaee316a814375d7be40ef38ce9bc13e2ba4236ce8` |

If you would like to verify checksums for historic versions of the `sentry-cli`, please refer to our release registry directly, which can be found at [https://release-registry.services.sentry.io/apps/sentry-cli/{version}](https://release-registry.services.sentry.io/apps/sentry-cli/latest). For example, <https://release-registry.services.sentry.io/apps/sentry-cli/1.74.4>.
