# Install Docker Engine on RHEL


To get started with Docker Engine on RHEL, make sure you
[meet the prerequisites](#prerequisites), and then follow the
[installation steps](#installation-methods).

## Prerequisites

### OS requirements

To install Docker Engine, you need a maintained version of one of the following
RHEL versions:

- RHEL 8
- RHEL 9
- RHEL 10

### Uninstall old versions

Before you can install Docker Engine, you need to uninstall any conflicting packages.

Your Linux distribution may provide unofficial Docker packages, which may conflict
with the official packages provided by Docker. You must uninstall these packages
before you install the official version of Docker Engine.

```console
$ sudo dnf remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine \
                  podman \
                  runc
```

`dnf` might report that you have none of these packages installed.

Images, containers, volumes, and networks stored in `/var/lib/docker/` aren't
automatically removed when you uninstall Docker.

## Installation methods

You can install Docker Engine in different ways, depending on your needs:

- You can
  [set up Docker's repositories](#install-using-the-repository) and install
  from them, for ease of installation and upgrade tasks. This is the
  recommended approach.

- You can download the RPM package,
  [install it manually](#install-from-a-package), and manage
  upgrades completely manually. This is useful in situations such as installing
  Docker on air-gapped systems with no access to the internet.

- In testing and development environments, you can use automated
  [convenience scripts](#install-using-the-convenience-script) to install Docker.





Apache License, Version 2.0. See [LICENSE](https://github.com/moby/moby/blob/master/LICENSE) for the full license.


### Install using the rpm repository {#install-using-the-repository}

Before you install Docker Engine for the first time on a new host machine, you
need to set up the Docker repository. Afterward, you can install and update
Docker from the repository.

#### Set up the repository

Install the `dnf-plugins-core` package (which provides the commands to manage
your DNF repositories) and set up the repository.

```console
$ sudo dnf -y install dnf-plugins-core
$ sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
```

#### Install Docker Engine

1. Install the Docker packages.

   **Latest**



   To install the latest version, run:

   ```console
   $ sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

   If prompted to accept the GPG key, verify that the fingerprint matches
   `060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35`, and if so, accept it.

   This command installs Docker, but it doesn't start Docker. It also creates a
   `docker` group, however, it doesn't add any users to the group by default.

   **Specific version**



   To install a specific version, start by listing the available versions in
   the repository:

   ```console
   $ dnf list docker-ce --showduplicates | sort -r

   docker-ce.x86_64    3:29.6.1-1.el9    docker-ce-stable
   docker-ce.x86_64    3:29.6.0-1.el9    docker-ce-stable
   <...>
   ```

   The list returned depends on which repositories are enabled, and is specific
   to your version of RHEL (indicated by the `.el9` suffix in this example).

   Install a specific version by its fully qualified package name, which is
   the package name (`docker-ce`) plus the version string (2nd column),
   separated by a hyphen (`-`). For example, `docker-ce-3:29.6.1-1.el9`.

   Replace `<VERSION_STRING>` with the desired version and then run the following
   command to install:

   ```console
   $ sudo dnf install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io docker-buildx-plugin docker-compose-plugin
   ```

   This command installs Docker, but it doesn't start Docker. It also creates a
   `docker` group, however, it doesn't add any users to the group by default.

   

2. Start Docker Engine.

   ```console
   $ sudo systemctl enable --now docker
   ```

   This configures the Docker systemd service to start automatically when you
   boot your system. If you don't want Docker to start automatically, use `sudo
   systemctl start docker` instead.

3. Verify that the installation is successful by running the `hello-world` image:

   ```console
   $ sudo docker run hello-world
   ```

   This command downloads a test image and runs it in a container. When the
   container runs, it prints a confirmation message and exits.

You have now successfully installed and started Docker Engine.





> [!TIP]
> 
> Receiving errors when trying to run without root?
>
> The `docker` user group exists but contains no users, which is why you’re required 
> to use `sudo` to run Docker commands. Continue to [Linux postinstall](/engine/install/linux-postinstall) 
> to allow non-privileged users to run Docker commands and for other optional configuration steps.



#### Upgrade Docker Engine

To upgrade Docker Engine, follow the [installation instructions](#install-using-the-repository),
choosing the new version you want to install.

### Install from a package

If you can't use Docker's `rpm` repository to install Docker Engine, you can
download the `.rpm` file for your release and install it manually. You need to
download a new file each time you want to upgrade Docker Engine.

<!-- markdownlint-disable-next-line -->
1. Go to [https://download.docker.com/linux/rhel/](https://download.docker.com/linux/rhel/).

2. Select your RHEL version in the list.

3. Select the applicable architecture (`x86_64`, `aarch64`, or `s390x`), and
   then go to `stable/Packages/`.

4. Download the following `rpm` files for the Docker Engine, CLI, containerd,
   and Docker Compose packages:

   - `containerd.io-<version>.<arch>.rpm`
   - `docker-ce-<version>.<arch>.rpm`
   - `docker-ce-cli-<version>.<arch>.rpm`
   - `docker-buildx-plugin-<version>.<arch>.rpm`
   - `docker-compose-plugin-<version>.<arch>.rpm`

5. Install Docker Engine, changing the following path to the path where you downloaded
   the packages.

   ```console
   $ sudo dnf install ./containerd.io-<version>.<arch>.rpm \
     ./docker-ce-<version>.<arch>.rpm \
     ./docker-ce-cli-<version>.<arch>.rpm \
     ./docker-buildx-plugin-<version>.<arch>.rpm \
     ./docker-compose-plugin-<version>.<arch>.rpm
   ```

   Docker is installed but not started. The `docker` group is created, but no
   users are added to the group.

6. Start Docker Engine.

   ```console
   $ sudo systemctl enable --now docker
   ```

   This configures the Docker systemd service to start automatically when you
   boot your system. If you don't want Docker to start automatically, use `sudo
   systemctl start docker` instead.

7. Verify that the installation is successful by running the `hello-world` image:

   ```console
   $ sudo docker run hello-world
   ```

   This command downloads a test image and runs it in a container. When the
   container runs, it prints a confirmation message and exits.

You have now successfully installed and started Docker Engine.





> [!TIP]
> 
> Receiving errors when trying to run without root?
>
> The `docker` user group exists but contains no users, which is why you’re required 
> to use `sudo` to run Docker commands. Continue to [Linux postinstall](/engine/install/linux-postinstall) 
> to allow non-privileged users to run Docker commands and for other optional configuration steps.



#### Upgrade Docker Engine

To upgrade Docker Engine, download the newer package files and repeat the
[installation procedure](#install-from-a-package), using `dnf upgrade`
instead of `dnf install`, and point to the new files.





### Install using the convenience script

Docker provides a convenience script at
[https://get.docker.com/](https://get.docker.com/) to install Docker into
development environments non-interactively. The convenience script isn't
recommended for production environments, but it's useful for creating a
provisioning script tailored to your needs. Also refer to the
[install using the repository](#install-using-the-repository) steps to learn
about installation steps to install using the package repository. The source code
for the script is open source, and you can find it in the
[`docker-install` repository on GitHub](https://github.com/docker/docker-install).

<!-- prettier-ignore -->
Always examine scripts downloaded from the internet before running them locally.
Before installing, make yourself familiar with potential risks and limitations
of the convenience script:

- The script requires `root` or `sudo` privileges to run.
- The script attempts to detect your Linux distribution and version and
  configure your package management system for you.
- The script doesn't allow you to customize most installation parameters.
- The script installs dependencies and recommendations without asking for
  confirmation. This may install a large number of packages, depending on the
  current configuration of your host machine.
- By default, the script installs the latest stable release of Docker,
  containerd, and runc. When using this script to provision a machine, this may
  result in unexpected major version upgrades of Docker. Always test upgrades in
  a test environment before deploying to your production systems.
- The script isn't designed to upgrade an existing Docker installation. When
  using the script to update an existing installation, dependencies may not be
  updated to the expected version, resulting in outdated versions.

> [!TIP]
>
> Preview script steps before running. You can run the script with the `--dry-run` option to learn what steps the
> script will run when invoked:
>
> ```console
> $ curl -fsSL https://get.docker.com -o get-docker.sh
> $ sudo sh ./get-docker.sh --dry-run
> ```

This example downloads the script from
[https://get.docker.com/](https://get.docker.com/) and runs it to install the
latest stable release of Docker on Linux:

```console
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh
Executing docker install script, commit: 7cae5f8b0decc17d6571f9f52eb840fbc13b2737
<...>
```

You have now successfully installed and started Docker Engine. The `docker`
service starts automatically on Debian based distributions. On `RPM` based
distributions, such as CentOS, Fedora or RHEL, you need to start it
manually using the appropriate `systemctl` or `service` command. As the message
indicates, non-root users can't run Docker commands by default.

> **Use Docker as a non-privileged user, or install in rootless mode?**
>
> The installation script requires `root` or `sudo` privileges to install and
> use Docker. If you want to grant non-root users access to Docker, refer to the
> [post-installation steps for Linux](/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user).
> You can also install Docker without `root` privileges, or configured to run in
> rootless mode. For instructions on running Docker in rootless mode, refer to
> [run the Docker daemon as a non-root user (rootless mode)](/engine/security/rootless/).

#### Install pre-releases

Docker also provides a convenience script at
[https://test.docker.com/](https://test.docker.com/) to install pre-releases of
Docker on Linux. This script is equal to the script at `get.docker.com`, but
configures your package manager to use the test channel of the Docker package
repository. The test channel includes both stable and pre-releases (beta
versions, release-candidates) of Docker. Use this script to get early access to
new releases, and to evaluate them in a testing environment before they're
released as stable.

To install the latest version of Docker on Linux from the test channel, run:

```console
$ curl -fsSL https://test.docker.com -o test-docker.sh
$ sudo sh test-docker.sh
```

#### Upgrade Docker after using the convenience script

If you installed Docker using the convenience script, you should upgrade Docker
using your package manager directly. There's no advantage to re-running the
convenience script. Re-running it can cause issues if it attempts to re-install
repositories which already exist on the host machine.



## Uninstall Docker Engine

1. Uninstall the Docker Engine, CLI, containerd, and Docker Compose packages:

   ```console
   $ sudo dnf remove docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
   ```

2. Images, containers, volumes, or custom configuration files on your host
   aren't automatically removed. To delete all images, containers, and volumes:

   ```console
   $ sudo rm -rf /var/lib/docker
   $ sudo rm -rf /var/lib/containerd
   ```

You have to delete any edited configuration files manually.

## Next steps

- Continue to [Post-installation steps for Linux](/engine/install/rhel/linux-postinstall/).

