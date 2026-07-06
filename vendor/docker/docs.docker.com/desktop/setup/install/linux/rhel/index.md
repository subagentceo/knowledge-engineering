# Install Docker Desktop on RHEL


> **Docker Desktop terms**
>
> Commercial use of Docker Desktop in larger enterprises (more than 250
> employees or more than $10 million USD in annual revenue) requires a [paid
> subscription](https://www.docker.com/pricing?ref=Docs&refAction=DocsDesktopRhelInstall).

This page contains information on how to install, launch and upgrade Docker Desktop on a Red Hat Enterprise Linux (RHEL) distribution.

## Prerequisites

To install Docker Desktop successfully, you must:

- Meet the [general system requirements](/desktop/setup/install/linux/#general-system-requirements).
- Have a 64-bit version of either RHEL 9 or RHEL 10.

- If `pass` is not installed, or it can't be installed, you must enable [CodeReady Linux Builder (CRB) repository](https://access.redhat.com/articles/4348511) and [Extra Packages for Enterprise Linux (EPEL)](https://docs.fedoraproject.org/en-US/epel/).

   **RHEL 10**


   ```console
   $ sudo subscription-manager repos --enable codeready-builder-for-rhel-10-$(arch)-rpms
   $ sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-10.noarch.rpm
   $ sudo dnf install pass
   ```

   **RHEL 9**


   ```console
   $ sudo subscription-manager repos --enable codeready-builder-for-rhel-9-$(arch)-rpms
   $ sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm
   $ sudo dnf install pass
   ```

   

- For a GNOME desktop environment you must install AppIndicator and KStatusNotifierItem [GNOME extensions](https://extensions.gnome.org/extension/615/appindicator-support/). You must also enable EPEL.

   **RHEL 10**


   ```console
   $ # enable EPEL as described above
   $ sudo dnf install gnome-shell-extension-appindicator
   $ sudo gnome-extensions enable appindicatorsupport@rgcjonas.gmail.com
   ```

   **RHEL 9**


   ```console
   $ # enable EPEL as described above
   $ sudo dnf install gnome-shell-extension-appindicator
   $ sudo gnome-extensions enable appindicatorsupport@rgcjonas.gmail.com
   ```

   

- If you're not using GNOME, you must install `gnome-terminal` to enable terminal access from Docker Desktop:

   ```console
   $ sudo dnf install gnome-terminal
   ```

## Install Docker Desktop

To install Docker Desktop on RHEL:

1. Set up Docker's package repository as follows:

   ```console
   $ sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
   ```

2. Download the latest [RPM package](https://desktop.docker.com/linux/main/amd64/docker-desktop-x86_64-rhel.rpm?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-linux-amd64).

3. Install the package with dnf as follows:

   ```console
   $ sudo dnf install ./docker-desktop-x86_64-rhel.rpm
   ```

The RPM package includes a post-install script that completes additional setup steps automatically.

The post-install script:

- Sets the capability on the Docker Desktop binary to map privileged ports and set resource limits.
- Adds a DNS name for Kubernetes to `/etc/hosts`.
- Creates a symlink from `/usr/local/bin/com.docker.cli` to `/usr/bin/docker`.
  This is because the classic Docker CLI is installed at `/usr/bin/docker`. The Docker Desktop installer also installs a Docker CLI binary that includes cloud-integration capabilities and is essentially a wrapper for the Compose CLI, at `/usr/local/bin/com.docker.cli`. The symlink ensures that the wrapper can access the classic Docker CLI. 
- Creates a symlink from `/usr/libexec/qemu-kvm` to `/usr/local/bin/qemu-system-x86_64`.

## Launch Docker Desktop





To start Docker Desktop for Linux:

1. Navigate to the Docker Desktop application in your Gnome/KDE Desktop.

2. Select **Docker Desktop** to start Docker.

   The Docker Subscription Service Agreement displays.

3. Select **Accept** to continue. Docker Desktop starts after you accept the terms.

   Note that Docker Desktop won't run if you do not agree to the terms. You can choose to accept the terms at a later date by opening Docker Desktop.

   For more information, see [Docker Desktop Subscription Service Agreement](https://www.docker.com/legal/docker-subscription-service-agreement). It is recommended that you also read the [FAQs](https://www.docker.com/pricing/faq).

Alternatively, open a terminal and run:

```console
$ systemctl --user start docker-desktop
```

When Docker Desktop starts, it creates a dedicated [context](/engine/context/working-with-contexts) that the Docker CLI
can use as a target and sets it as the current context in use. This is to avoid
a clash with a local Docker Engine that may be running on the Linux host and
using the default context. On shutdown, Docker Desktop resets the current
context to the previous one.

The Docker Desktop installer updates Docker Compose and the Docker CLI binaries
on the host. It installs Docker Compose V2 and gives users the choice to
link it as docker-compose from the Settings panel. Docker Desktop installs
the new Docker CLI binary that includes cloud-integration capabilities in `/usr/local/bin/com.docker.cli`
and creates a symlink to the classic Docker CLI at `/usr/local/bin`.

After you’ve successfully installed Docker Desktop, you can check the versions
of these binaries by running the following commands:

```console
$ docker compose version
Docker Compose version v2.39.4

$ docker --version
Docker version 28.4.0, build d8eb465

$ docker version
Client:
 Version:           28.4.0
 API version:       1.51
 Go version:        go1.24.7
<...>
```

To enable Docker Desktop to start on sign in, from the Docker menu, select
**Settings** > **General** > **Start Docker Desktop when you sign in to your computer**.

Alternatively, open a terminal and run:

```console
$ systemctl --user enable docker-desktop
```

To stop Docker Desktop, select the Docker menu icon to open the Docker menu and select **Quit Docker Desktop**.

Alternatively, open a terminal and run:

```console
$ systemctl --user stop docker-desktop
```



> [!TIP]
>
> To attach Red Hat subscription data to containers, see [Red Hat verified solution](https://access.redhat.com/solutions/5870841).
>
> For example:
> ```console
> $ docker run --rm -it -v "/etc/pki/entitlement:/etc/pki/entitlement" -v "/etc/rhsm:/etc/rhsm-host" -v "/etc/yum.repos.d/redhat.repo:/etc/yum.repos.d/redhat.repo" registry.access.redhat.com/ubi9
> ```

## Upgrade Docker Desktop

Once a new version for Docker Desktop is released, the Docker UI shows a notification.
You need to first remove the previous version and then download the new package each time you want to upgrade Docker Desktop. Run:

```console
$ sudo dnf remove docker-desktop
$ sudo dnf install ./docker-desktop-<arch>-rhel.rpm
```

## Next steps

- Review [Docker's subscriptions](https://www.docker.com/pricing?ref=Docs&refAction=DocsDesktopRhelInstall) to see what Docker can offer you.
- Take a look at the [Docker workshop](/get-started/workshop/) to learn how to build an image and run it as a containerized application.
- [Explore Docker Desktop](/desktop/use-desktop/) and all its features.
- [Troubleshooting](/desktop/troubleshoot-and-support/troubleshoot/) describes common problems, workarounds, how to run and submit diagnostics, and submit issues.
- [FAQs](/desktop/troubleshoot-and-support/faqs/general/) provide answers to frequently asked questions.
- [Release notes](/desktop/release-notes/) lists component updates, new features, and improvements associated with Docker Desktop releases.
- [Back up and restore data](/desktop/settings-and-maintenance/backup-and-restore/) provides instructions
  on backing up and restoring data related to Docker.

