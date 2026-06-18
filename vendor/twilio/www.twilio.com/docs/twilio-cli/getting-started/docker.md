# Use the Twilio CLI Docker image

The [official Docker image](https://hub.docker.com/r/twilio/twilio-cli/tags) for the Twilio CLI enables you to use the CLI in a portable and secure container-based environment without having to manage the installation yourself.

## Before you begin

In order to utilize the CLI Docker image, you will need to make sure you have [Docker](https://www.docker.com/) installed and running on your system. For installation instructions, see the [Docker website](https://docs.docker.com/get-docker/).

## Run the Docker image

To run the Twilio CLI Docker image with an interactive bash shell, use:

```bash
docker run -it --rm twilio/twilio-cli bash
```

Once the container has finished downloading, and you have entered the shell, you can issue commands using the CLI. For example:

```bash
$ docker run -it --rm twilio/twilio-cli bash

root@1234:/twilio# twilio profiles:list
ID      Account SID                         Active
you     ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  true
main    ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  false
```

### Run commands directly

It is also possible to pass commands directly to the Docker image for single, contained operations. For example, you can check the running version of the Twilio CLI with the following:

```bash
$ docker run -it --rm twilio/twilio-cli twilio --version
twilio-cli/3.0.0 linux-x64 node-v14.18.1
```

## Provide credentials and configuration

Since the container is cleaned up between each execution, it is useful to pass credentials and configuration directly to the Docker container instead of needing to use `twilio login` on each run.

### Via environment variables

If you have your profile credentials set as environment variables, you can pass them directly to the Docker container. The environment variables will be picked up by the containerized version of the Twilio CLI:

```bash
$ export TWILIO_ACCOUNT_SID=...
$ export TWILIO_API_KEY=...
$ export TWILIO_API_SECRET=...
$ docker run -it --rm \
  -e TWILIO_ACCOUNT_SID \
  -e TWILIO_API_KEY \
  -e TWILIO_API_SECRET \
  twilio/twilio-cli twilio phone-numbers:list

SID                                 Phone Number  Friendly Name
PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  +15558675310  (555) 867-5310
```

See the [Docker run reference guide](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file) for more information about setting container environment variables.

### Via the file system

Since the Twilio CLI stores your profile settings on your local file system, it's possible to share those settings with the Docker container by using [Volumes](https://docs.docker.com/storage/volumes/). Your profiles will be inherited by the Docker container, without the need to `login`.

To share your local configuration with the Docker container, mount your system's `~/.twilio-cli` directory to the container at `/root/.twilio-cli` using the `-v` flag. See the [Docker run reference guide](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only) for more information about the `-v` flag.

## macOS and Linux

On macOS and Linux, use:

```bash
$ docker run -it --rm \
  -v ~/.twilio-cli:/root/.twilio-cli \
  twilio/twilio-cli twilio phone-numbers:list

SID                                 Phone Number  Friendly Name
PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  +15558675310  (555) 867-5310
```

## Windows PowerShell

In Windows with PowerShell, run:

```bash
C:\> docker run -it --rm `
  -v $env:userprofile\.twilio-cli:/root/.twilio-cli `
  twilio/twilio-cli twilio phone-numbers:list

SID                                 Phone Number  Friendly Name
PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  +15558675310  (555) 867-5310

```

## Run a specific version or tag

There are multiple versions of the Twilio CLI Docker image that you can use. To run a specific version, append the desired tag to your `docker run` command.

There are two types of tags:

* `latest` - Sets the latest version of the Docker image, which we recommend. This is the default behavior of docker run, but you can choose to append it explicitly.

  ```bash
  docker run -it --rm twilio/twilio-cli:latest bash
  ```
* `<major.minor.patch>` - Sets the container to run using a specific version of the Docker image.

  ```bash
  docker run -it --rm twilio/twilio-cli:2.36.1 bash
  ```

## Update to the latest Docker image

The latest Docker image is only downloaded to your machine on the first execution of `docker run`. You need to manually pull the latest version of subsequent runs if you wish to use an updated image.

To download the latest Docker image and make it available locally, use:

```bash
docker pull twilio/twilio-cli
```

## Next steps

Now that you have the Twilio CLI Docker image installed and understand its use:

* [Experiment with issuing other commands](/docs/twilio-cli/examples)
* [Learn about more special features to enhance your developer experience](/docs/twilio-cli/general-usage)
