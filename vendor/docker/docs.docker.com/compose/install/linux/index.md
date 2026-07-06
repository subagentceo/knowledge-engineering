# Install the Docker Compose plugin


This page contains instructions on how to install the Docker Compose plugin on Linux from the command line.

To install the Docker Compose plugin on Linux, you can either:
- [Set up Docker's repository on your Linux system](#install-using-the-repository).
- [Install manually](#install-the-plugin-manually).

> [!NOTE]
>
> These instructions assume you already have Docker Engine and Docker CLI installed and now want to install the Docker Compose plugin. 

## Install using the repository

1. Set up the repository. Find distribution-specific instructions in:

    [Ubuntu](/engine/install/ubuntu/#install-using-the-repository) |
    [CentOS](/engine/install/centos/#set-up-the-repository) |
    [Debian](/engine/install/debian/#install-using-the-repository) |
    [Raspberry Pi OS](/engine/install/raspberry-pi-os/#install-using-the-repository) |
    [Fedora](/engine/install/fedora/#set-up-the-repository) |
    [RHEL](/engine/install/rhel/#set-up-the-repository).

2. Update the package index, and install the latest version of Docker Compose:

    * For Ubuntu and Debian, run:

        ```console
        $ sudo apt-get update
        $ sudo apt-get install docker-compose-plugin
        ```
    * For RPM-based distributions, run:

        ```console
        $ sudo yum update
        $ sudo yum install docker-compose-plugin
        ```

3.  Verify that Docker Compose is installed correctly by checking the version.

    ```console
    $ docker compose version
    ```

### Update Docker Compose

To update the Docker Compose plugin, run the following commands:

* For Ubuntu and Debian, run:

    ```console
    $ sudo apt-get update
    $ sudo apt-get install docker-compose-plugin
    ```
* For RPM-based distributions, run:

    ```console
    $ sudo yum update
    $ sudo yum install docker-compose-plugin
    ```

## Install the plugin manually

> [!WARNING]
>
> Manual installations don’t auto-update. For ease of maintenance, use the Docker repository method.

1.  To download and install the Docker Compose CLI plugin, run:

    ```console
    $ DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
    $ mkdir -p $DOCKER_CONFIG/cli-plugins
    $ curl -SL https://github.com/docker/compose/releases/download/v5.1.2/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
    ```

    This command downloads and installs the latest release of Docker Compose for the active user under `$HOME` directory.

    To install:
    - Docker Compose for _all users_ on your system, replace `~/.docker/cli-plugins` with `/usr/local/lib/docker/cli-plugins`.
    - A different version of Compose, substitute `v5.1.2` with the version of Compose you want to use.
    - For a different architecture, substitute `x86_64` with the [architecture you want](https://github.com/docker/compose/releases).   


2. Apply executable permissions to the binary:

    ```console
    $ chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
    ```
    or, if you chose to install Compose for all users:

    ```console
    $ sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
    ```

3. Test the installation.

    ```console
    $ docker compose version
    ```

## What's next?

- [Understand how Compose works](/compose/intro/compose-application-model/)
- [Try the Quickstart guide](/compose/gettingstarted/)

