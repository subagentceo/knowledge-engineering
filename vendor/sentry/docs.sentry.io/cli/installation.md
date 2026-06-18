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
curl -sL https://sentry.io/get-cli/ | SENTRY_CLI_VERSION="3.5.1" sh
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

*Other available variations of the above snippet: yarn, pnpm*

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

| Filename (v3.5.1)                                                                                        | Integrity Checksum                                                        |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| sentry-cli-Darwin-arm64                                                                                  | `sha384-d2b69f611c2e0701ffa09ad93db2f0d2fc845e1cf20a598270860a59cf698932` |
| sentry-cli-Darwin-universal                                                                              | `sha384-266169e1cefeca08834bf6e28b16822ce681fe35f6e5b20492683744c4fa0d7f` |
| sentry-cli-Darwin-x86\_64                                                                                | `sha384-1a49ffcc4367b710a530a51b37b7e80114ab670385c7292be854ff2837b41da9` |
| sentry-cli-Linux-aarch64                                                                                 | `sha384-1bd69e3258829a50548910eaa2422377dab2a1c25430ed783a55f28ea820a037` |
| sentry-cli-Linux-armv7                                                                                   | `sha384-7f46111fef30e6abcafecf2b29fb76afcd192e507aaad87c5248686deaa90612` |
| sentry-cli-Linux-i686                                                                                    | `sha384-d2048e825041af378a55be9122972ca5efcefea2aa093fa67d1c2833d4124a25` |
| sentry-cli-Linux-x86\_64                                                                                 | `sha384-50a1618336cdbb908e5559d6b941f3aa0ef5f341abeca08de40ed8c0070450b4` |
| sentry-cli-Windows-aarch64.exe                                                                           | `sha384-728b9cef622b8d0fd0b79b2822110f1e5ff8e279edb365d12fcadae6d0dcde2e` |
| sentry-cli-Windows-i686.exe                                                                              | `sha384-2e2d2c0b059cd47fab70c94de090042fbeba55b7ead6bdd43c72dd883623e1ba` |
| sentry-cli-Windows-x86\_64.exe                                                                           | `sha384-6ebf3a4ac9665d29969baccfb3feebb3b26607158eb5b66c7aa58b10b49aaa7f` |
| sentry\_cli-3.5.1-py3-none-macosx\_10\_15\_x86\_64.whl                                                   | `sha384-98cb884278b60f0135953eac310393f3e045b66655d6b394969eaa455c7ba7f3` |
| sentry\_cli-3.5.1-py3-none-macosx\_11\_0\_arm64.whl                                                      | `sha384-7e4f371dc31a19e9722ed1dd3faf4385b6808763dbd959c0d235899c05d2220a` |
| sentry\_cli-3.5.1-py3-none-macosx\_11\_0\_universal2.whl                                                 | `sha384-45b71976a3e8478dac1884d2d28734d7d9f6b80054251991dcccc69cb18419b3` |
| sentry\_cli-3.5.1-py3-none-manylinux\_2\_17\_aarch64.manylinux2014\_aarch64.musllinux\_1\_2\_aarch64.whl | `sha384-7242ad817828dc668a581681820d33f468cdcc742826678f0a624d7b172ba5bd` |
| sentry\_cli-3.5.1-py3-none-manylinux\_2\_17\_armv7l.manylinux2014\_armv7l.musllinux\_1\_2\_armv7l.whl    | `sha384-6a26ee41dbfa7f278cb279d5b24c65335ea63b36ec02ed859dd8363375c684cb` |
| sentry\_cli-3.5.1-py3-none-manylinux\_2\_17\_i686.manylinux2014\_i686.musllinux\_1\_2\_i686.whl          | `sha384-64e9881ec770628226f217fdc45d42d82ea16ff3be0955d3ded9b337bc2b8fb5` |
| sentry\_cli-3.5.1-py3-none-manylinux\_2\_17\_x86\_64.manylinux2014\_x86\_64.musllinux\_1\_2\_x86\_64.whl | `sha384-bcfd3cf9381ad930e707878bb9f5aabcee9e910a15e29859c7791c4086c894dd` |
| sentry\_cli-3.5.1-py3-none-win32.whl                                                                     | `sha384-600bfb964a49857c865b77f33ff18812b256d0af55b469125afa5f3284c3b751` |
| sentry\_cli-3.5.1-py3-none-win\_amd64.whl                                                                | `sha384-66aff3d23ab96640ec24758c3cd9a190992ee263154ea391a3b87b0e0aa948a9` |
| sentry\_cli-3.5.1-py3-none-win\_arm64.whl                                                                | `sha384-5bb02c21586e61135e1fc5ba943f4076ceee38d3206b1433a132cda34e903588` |
| sentry\_cli-3.5.1.tar.gz                                                                                 | `sha384-d373383e1bb135b97c72bb5e85e7ffaf0d3242a255a40b3384c08115989a29bf` |

If you would like to verify checksums for historic versions of the `sentry-cli`, please refer to our release registry directly, which can be found at [https://release-registry.services.sentry.io/apps/sentry-cli/{version}](https://release-registry.services.sentry.io/apps/sentry-cli/latest). For example, <https://release-registry.services.sentry.io/apps/sentry-cli/1.74.4>.
