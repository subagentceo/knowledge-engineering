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
curl -sL https://sentry.io/get-cli/ | SENTRY_CLI_VERSION="3.5.0" sh
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

| Filename (v3.5.0)                                                                                        | Integrity Checksum                                                        |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| sentry-cli-Darwin-arm64                                                                                  | `sha384-07c2144befbbe0cf8e4285c2751ba3818a55ced6ebd51d0268380e5e30ce9aed` |
| sentry-cli-Darwin-universal                                                                              | `sha384-46a439a75a8dda4719dbfded7b09388dc4b2aa7e1976e28102dfeb14401b8587` |
| sentry-cli-Darwin-x86\_64                                                                                | `sha384-beae514b7d117cb248accbabc87ae9003c0a3795811b28e0640c15e654a78747` |
| sentry-cli-Linux-aarch64                                                                                 | `sha384-94c758dee171ba4f248c0514806c1a03331a59a59582874500f17555b922b257` |
| sentry-cli-Linux-armv7                                                                                   | `sha384-bc036c910ab997ee92e519bd3aa8052ecf432298bf7eb0325d2f82fc9beae016` |
| sentry-cli-Linux-i686                                                                                    | `sha384-8d860d698c40e86a269204c77893a2fecb5467c5dc7b1de56e0877313aa245eb` |
| sentry-cli-Linux-x86\_64                                                                                 | `sha384-522d469086996996322052b8f46bb679f010c53d884521023e79aa7680627104` |
| sentry-cli-Windows-aarch64.exe                                                                           | `sha384-02be1110a4aca28ab0e0aceb41bb1440148748888d79f5024fe66a160872bd18` |
| sentry-cli-Windows-i686.exe                                                                              | `sha384-c03f3ddc68bfae1795ed817b102250642dd06ca0e42339e594454e3a9a42ef93` |
| sentry-cli-Windows-x86\_64.exe                                                                           | `sha384-7b7db2a8650644a77beef525e1464db3dad0b5313f6589f2991d39af7eda78aa` |
| sentry\_cli-3.5.0-py3-none-macosx\_10\_15\_x86\_64.whl                                                   | `sha384-b3f915800dc28dbc7b0772047fe6228c0359445022a57ad0017b3dba40ce4db0` |
| sentry\_cli-3.5.0-py3-none-macosx\_11\_0\_arm64.whl                                                      | `sha384-be486dd34adfae3ef2b7c8c8cff7f59071752f058468b20d5639f49611e7715f` |
| sentry\_cli-3.5.0-py3-none-macosx\_11\_0\_universal2.whl                                                 | `sha384-3e270b97ec7b6394e6e09c72d3e87e1c0b656503d736236e11c49cb548d35a94` |
| sentry\_cli-3.5.0-py3-none-manylinux\_2\_17\_aarch64.manylinux2014\_aarch64.musllinux\_1\_2\_aarch64.whl | `sha384-bb488adc6a1532dc69d03754a2e8dd337c6221d1251b5f01328e03d349828e97` |
| sentry\_cli-3.5.0-py3-none-manylinux\_2\_17\_armv7l.manylinux2014\_armv7l.musllinux\_1\_2\_armv7l.whl    | `sha384-bb198f20e23c47d0f5ebcc1c5f1a9c9ba856710c9fd03de09a515f077797b2d2` |
| sentry\_cli-3.5.0-py3-none-manylinux\_2\_17\_i686.manylinux2014\_i686.musllinux\_1\_2\_i686.whl          | `sha384-0bc23d2e607460eea96369d40f66dab244463b0efd583e21925c101ccd760fc0` |
| sentry\_cli-3.5.0-py3-none-manylinux\_2\_17\_x86\_64.manylinux2014\_x86\_64.musllinux\_1\_2\_x86\_64.whl | `sha384-20f2ed4938293a0f239d5db771ccc133d159bd41edb9e5004528a440dc7181c1` |
| sentry\_cli-3.5.0-py3-none-win32.whl                                                                     | `sha384-2e6cb9248db347e2e4853a1a81c24c4c7ca829deeff0af44a690799b034517bc` |
| sentry\_cli-3.5.0-py3-none-win\_amd64.whl                                                                | `sha384-32e8a10177d6953b75bf37b1d069b9023d3f1ffebdc7c4c120b8b458eaec186a` |
| sentry\_cli-3.5.0-py3-none-win\_arm64.whl                                                                | `sha384-0b7a27599658b4dbd319b136340f83a757b55a38fc7c41ab0e13d85b8116ceae` |
| sentry\_cli-3.5.0.tar.gz                                                                                 | `sha384-58ffa7bdf923484d8fa359213868596ebcf6202b516fa8f53abee0f303a4a4ec` |

If you would like to verify checksums for historic versions of the `sentry-cli`, please refer to our release registry directly, which can be found at [https://release-registry.services.sentry.io/apps/sentry-cli/{version}](https://release-registry.services.sentry.io/apps/sentry-cli/latest). For example, <https://release-registry.services.sentry.io/apps/sentry-cli/1.74.4>.
