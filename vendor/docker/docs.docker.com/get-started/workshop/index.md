# Overview of the Docker workshop


This 45-minute workshop contains step-by-step instructions on how to get started with Docker. This workshop shows you how to:

- Build and run an image as a container.
- Share images using Docker Hub.
- Deploy Docker applications using multiple containers with a database.
- Run applications using Docker Compose.

> [!NOTE]
>
> For a quick introduction to Docker and the benefits of containerizing your
> applications, see [Getting started](/get-started/introduction/).

## What is a container?

A container is a sandboxed process running on a host machine that is isolated from all other processes running on that host machine. That isolation leverages [kernel namespaces and cgroups](https://medium.com/@saschagrunert/demystifying-containers-part-i-kernel-space-2c53d6979504),
features that have been in Linux for a long time. Docker makes these capabilities approachable and easy to use. To summarize, a container:

- Is a runnable instance of an image. You can create, start, stop, move, or delete a container using the Docker API or CLI.
- Can be run on local machines, virtual machines, or deployed to the cloud.
- Is portable (and can be run on any OS).
- Is isolated from other containers and runs its own software, binaries, configurations, etc.

If you're familiar with `chroot`, then think of a container as an extended version of `chroot`. The filesystem comes from the image. However, a container adds additional isolation not available when using chroot.

## What is an image?

A running container uses an isolated filesystem. This isolated filesystem is provided by an image, and the image must contain everything needed to run an application - all dependencies, configurations, scripts, binaries, etc. The image also contains other configurations for the container, such as environment variables, a default command to run, and other metadata.

## Next steps

In this section, you learned about containers and images.

Next, you'll containerize a simple application and get hands-on with the concepts.

[Containerize an application](/get-started/workshop/02_our_app/)


