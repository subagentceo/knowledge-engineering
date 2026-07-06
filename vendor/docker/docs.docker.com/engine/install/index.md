# Install Docker Engine


This section describes how to install Docker Engine on Linux, also known as
Docker CE. Docker Engine is also available for Windows, macOS, and Linux,
through Docker Desktop. For instructions on how to install Docker Desktop,
see: [Overview of Docker Desktop](/desktop/).

## Installation procedures for supported platforms

Click on a platform's link to view the relevant installation procedure.

| Platform                                       | x86_64 / amd64 | arm64 / aarch64 | arm (32-bit) | ppc64le | s390x |
| :--------------------------------------------- | :------------: | :-------------: | :----------: | :-----: | :---: |
| [CentOS](/engine/install/centos/)                            |       ✅       |       ✅        |              |   ✅    |       |
| [Debian](/engine/install/debian/)                            |       ✅       |       ✅        |      ✅      |   ✅    |       |
| [Fedora](/engine/install/fedora/)                            |       ✅       |       ✅        |              |   ✅    |       |
| [Raspberry Pi OS (32-bit)](/engine/install/raspberry-pi-os/) |                |                 |      ⚠️      |         |       |
| [RHEL](/engine/install/rhel/)                                |       ✅       |       ✅        |              |         |  ✅   |
| [Ubuntu](/engine/install/ubuntu/)                            |       ✅       |       ✅        |      ✅      |   ✅    |  ✅   |
| [Binaries](/engine/install/binaries/)                        |       ✅       |       ✅        |      ✅      |         |       |

### Other Linux distributions

> [!NOTE]
>
> While the following instructions may work, Docker doesn't test or verify
> installation on distribution derivatives.

- If you use Debian derivatives such as "BunsenLabs Linux", "Kali Linux" or
  "LMDE" (Debian-based Mint) should follow the installation instructions for
  [Debian](/engine/install/debian/), substitute the version of your distribution for the
  corresponding Debian release. Refer to the documentation of your distribution to find
  which Debian release corresponds with your derivative version.
- Likewise, if you use Ubuntu derivatives such as "Kubuntu", "Lubuntu" or "Xubuntu"
  you should follow the installation instructions for [Ubuntu](/engine/install/ubuntu/),
  substituting the version of your distribution for the corresponding Ubuntu release.
  Refer to the documentation of your distribution to find which Ubuntu release
  corresponds with your derivative version.
- Some Linux distributions provide a package of Docker Engine through their
  package repositories. These packages are built and maintained by the Linux
  distribution's package maintainers and may have differences in configuration
  or are built from modified source code. Docker isn't involved in releasing these
  packages and you should report any bugs or issues involving these packages to
  your Linux distribution's issue tracker.

Docker provides [binaries](/engine/install/binaries/) for manual installation of Docker Engine.
These binaries are statically linked and you can use them on any Linux distribution.

## Release channels

Docker Engine has two types of update channels, **stable** and **test**:

* The **stable** channel gives you the latest versions released for general availability.
* The **test** channel gives you pre-release versions that are ready for testing before
  general availability.

Use the test channel with caution. Pre-release versions include experimental and
early-access features that are subject to breaking changes.

## Support

Docker Engine is an open source project, supported by the Moby project maintainers
and community members. Docker doesn't provide support for Docker Engine.
Docker provides support for Docker products, including Docker Desktop, which uses
Docker Engine as one of its components.

For information about the open source project, refer to the
[Moby project website](https://mobyproject.org/).

### Upgrade path

Patch releases are always backward compatible with its major and minor version.

### Licensing

Commercial use of Docker Engine obtained via Docker Desktop
within larger enterprises (exceeding 250 employees OR with annual revenue surpassing
$10 million USD), requires a [paid subscription](https://www.docker.com/pricing?ref=Docs&refAction=DocsEngineInstall).
Apache License, Version 2.0. See [LICENSE](https://github.com/moby/moby/blob/master/LICENSE) for the full license.

## Reporting security issues

If you discover a security issue, we request that you bring it to our attention immediately.

DO NOT file a public issue. Instead, submit your report privately to security@docker.com.

Security reports are greatly appreciated, and Docker will publicly thank you for it.

## Get started

After setting up Docker, you can learn the basics with
[Getting started with Docker](/get-started/introduction/).

