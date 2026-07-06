# Develop on a remote Docker host

Sometimes you may want to use the Dev Containers extension to develop inside a container that sits on a remote server. Docker does **not** support mounting (binding) your local filesystem into a remote dev container, so Visual Studio Code's default `devcontainer.json` behavior to use your local source code will not work. While this is the default behavior, in this section we will cover connecting to a remote host so that you can either use the Remote - SSH extension to open a folder on a remote host in a container, attach to any running container, or use a **local** `devcontainer.json` file as a way to configure, create, and connect to a remote dev container using a socket.

## Connect using the Remote - SSH extension

If you are using a Linux or macOS SSH host, you can use the Remote - SSH and Dev Containers extensions together. You do not even need to have a Docker client installed locally. To do so:

1.  Follow the installation and SSH host setup steps for the Remote - SSH extension.
2.  **Optional:** Set up SSH key based authentication to the server so you do not need to enter your password multiple times.
3.  Install Docker on your SSH host. You do not need to install Docker locally.
4.  Follow the quick start for the Remote - SSH extension to connect to a host and open a folder there.
5.  Create a devcontainer.json file.
6.  Use the **Dev Containers: Reopen in Container** command from the Command Palette (F1, ⇧⌘P (Windows, Linux Ctrl+Shift+P)).

The rest of the Dev Containers quick start applies as-is. You can learn more about the Remote - SSH extension in its documentation.

## Connect using the Remote - Tunnels extension

You can use the Remote - Tunnels and Dev Containers extensions together to open a folder on your remote host inside of a container. You do not even need to have a Docker client installed locally. This is similar to the SSH host scenario above, but uses Remote - Tunnels instead. To do so:

1.  Follow the Getting Started instructions for the Remote - Tunnels extension.
2.  Install Docker on your tunnel host. You do not need to install Docker locally.
3.  Follow the steps for the Remote - Tunnels extension to connect to a tunnel host and open a folder there.
4.  Use the **Dev Containers: Reopen in Container** command from the Command Palette (F1, ⇧⌘P (Windows, Linux Ctrl+Shift+P)).

The rest of the Dev Containers quick start applies as-is. You can learn more about the Remote - Tunnels extension in its documentation.

## Connect using the Docker CLI

This model only requires that a Docker Engine be running on a remote host that your local Docker CLI can connect to. While using the Remote - SSH and Remote - Tunnels extensions is easier and doesn't require the Docker CLI to even be installed locally, this model can be useful for situations where you already have a host you are connecting to from the command line. This approach is also useful if you are looking to attach to already running containers on this remote server.

### A basic remote example

Setting up VS Code to attach to a container on a remote Docker host can be as easy as setting the Container Tools extension `containers.environment` property in `settings.json` and restarting VS Code (or reloading the window).

For example:

```
"containers.environment": {
    "DOCKER_HOST": "ssh://your-remote-user@your-remote-machine-fqdn-or-ip-here"
}
```

Using SSH requires a supported SSH client, that you have key based authentication configured for the remote host, and that the **key is imported into your local SSH agent**. See the article on using SSH Keys with Git for details on configuring the agent and adding your key.

At this point, you can attach to containers on the remote host. We'll cover more on information on how you can connect using settings and environment variables or Docker contexts later in this section.

For `devcontainer.json`, there is one additional step: You'll need to update any configured (or auto-configured) bind mounts so they no longer point to the local filesystem.

There's two variations of this setup. The first is to **create your remote dev container first**, and then **clone your source code into a named volume** since this does not require you to have direct access to the filesystem on the remote host.

Here is a basic `devcontainer.json` example of this setup:

```
{
  "image": "node", // Or "dockerFile"
  "workspaceFolder": "/workspace",
  "workspaceMount": "source=remote-workspace,target=/workspace,type=volume"
}
```

In fact, the **Dev Containers: Clone Repository in Container Volume...** command in the Command Palette (F1) uses this same technique. If you already have a `devcontainer.json` file in a GitHub repository that references an image or Dockerfile, the command will automatically use a named volume instead of a bind mount - which also works with remote hosts.

The second approach is to **bind mount a folder on the remote machine** into your container. This requires you to have access to the remote filesystem, but also allows you to work with **existing source code** on the remote machine.

Update the `workspaceMount` property in the example above to use this model instead:

```
"workspaceMount": "source=/absolute/path/on/remote/machine,target=/workspace,type=bind,consistency=cached"
```

In either case, to try it out, run **Dev Containers: Open Folder in Container...**, and select the local folder with the `.devcontainer.json` file in it.

See Converting an existing or pre-defined devcontainer.json for information on other scenarios like Docker Compose.

## Connect using VS Code settings or local environment variables

If you already have a remote Docker host up and running, you can use the following properties in your workspace or user `settings.json` to specify the host.

### SSH protocol

Recent versions of Docker (18.06+) have added support for the SSH protocol to connect to remote Docker Host. This is easy to configure as you only need to set one property in `settings.json` to use it.

First, install a supported SSH client, configure key based authentication), and then **import your key into your local SSH agent** (which often is not running by default on Windows and Linux). See the article on using SSH Keys with Git for details on configuring the agent and adding the key.

Then, add the following Container Tools extension `containers.environment` property to `settings.json` (replacing values as appropriate):

```
"containers.environment": {
    "DOCKER_HOST": "ssh://your-remote-user@your-remote-machine-fqdn-or-ip-here"
}
```

After restarting VS Code (or reloading the window), you will now be able to attach to any running container on the remote host. You can also use specialized, local `devcontainer.json` files to create / connect to a remote dev container.

> **Tip:** If this is not working for you but you are able to connect to the host using SSH from the command line, be sure you have the SSH agent running with your authentication key. If all else fails, you can use an SSH tunnel as a fallback instead.

### Using the TCP protocol

While the SSH protocol has its own built-in authorization mechanism, using the TCP protocol often requires setting other Container Tools extension properties in your `settings.json`. These are:

```
"containers.environment": {
    "DOCKER_HOST": "tcp://your-remote-machine-fqdn-or-ip-here:port",
    "DOCKER_CERT_PATH": "/optional/path/to/folder/with/certificate/files",
    "DOCKER_TLS_VERIFY": "1" // or "0"
}
```

As with SSH, restart VS Code (or reload the window) for the settings to take effect.

### Using environment variables instead of settings.json

If you'd prefer not to use `settings.json`, you can set **environment variables** in a terminal instead. The steps to do so are:

1.  Shut down **all instances** of VS Code.
2.  Ensure VS Code is in your operating system `PATH`.
3.  Set the environment variables (for example `DOCKER_HOST`) in a terminal / command prompt.
4.  Type `code` in this same terminal / command prompt to launch VS Code with the variables set.

## Connect using Docker Contexts

Docker Contexts allow you to interact with different hosts - you can set up contexts for each host and switch between them.

You create new contexts with `docker context create`. The current context can be changed using `docker context use <context>`.

The Container Tools extension comes with the `containers.environment` setting where environment variables like `DOCKER_HOST` or `DOCKER_CONTEXT` can be set that are also honored by the Dev Containers extension.

> **Note:** The above settings are only visible when the Container Tools extension is installed. Without the Container Tools extension, Dev Containers will use the current context.

## Converting an existing or pre-defined devcontainer.json

To convert an existing or pre-defined, local `devcontainer.json` into a remote one, follow these steps:

1.  Open a **local** folder in VS Code (not a remote one) where you want to convert the file.
    
2.  If you did not select a folder with a `devcontainer.json` in it, you can pick a pre-defined one by running **Dev Containers: Add Container Configuration File...** from the Command Palette (F1).
    
3.  Follow these steps based on what your `.devcontainer/devcontainer.json` or `.devcontainer.json` references to alter the source code mount:
    
    **Dockerfile or image**:
    
    If you do **not** have login access to the remote host, use a Docker "volume" for your source code. Update `.devcontainer/devcontainer.json` as follows (replacing `remote-workspace` with a unique volume name if desired):
    
    ```
    "workspaceMount": "source=remote-workspace,target=/workspace,type=volume"
    "workspaceFolder": "/workspace",
    ```
    
    If you **do** have login access, you can use a remote filesystem bind mount instead:
    
    ```
    "workspaceMount": "source=/absolute/path/on/remote/machine,target=/workspace,type=bind,consistency=cached"
    "workspaceFolder": "/workspace",
    ```
    
    The `workspaceMount` property supports the same values as the Docker CLI `--mount` flag if you have a different scenario in mind.
    
    **Docker Compose**:
    
    If you do **not** have login access to the remote host, update (or extend) your `docker-compose.yml`. Replace `your-service-name-here` with the value specified for the `"service"` property in `devcontainer.json` and appropriate and `remote-workspace` with a unique volume name:
    
    ```
    version: '3'
    services:
      your-service-name-here:
        volumes:
            - remote-workspace:/workspace
        # ...
    
    volumes:
      remote-workspace:
    ```
    
    If you **do** have login access, you can use a remote filesystem bind mount instead:
    
    ```
    version: '3'
    services:
      your-service-name-here:
        volumes:
          - /absolute/path/on/remote/machine:/workspace:cached
        # ...
    ```
    
    See the Docker Compose documentation on `volumes` if you need to support a different scenario.
    
4.  Run the **Dev Containers: Reopen in Container** command from the Command Palette (F1) or **Dev Containers: Rebuild Container**.
    
5.  If you used a volume instead of a bind mount, use ⌃⇧` (Windows, Linux Ctrl+Shift+`) to open a terminal inside the container. You can run `git clone` from here to pull down your source code and use **File > Open... / Open Folder...** to open the cloned repository.
    

Next time you want to connect to this same container, run **Dev Containers: Open Folder in Container...** and select the same local folder in a VS Code window.

## Optional: Making the remote source code available locally

If you store your source code on the remote host's filesystem instead of inside a Docker volume, there are several ways you can access the files locally:

1.  Mount the remote filesystem using SSHFS.
2.  Sync files from the remote host to your local machine using `rsync`.
3.  Use the `mount` command if you are using Docker Machine.

Using SSHFS or Docker Machine's mount command are the more convenient options and do not require any file sync'ing. However, performance will be significantly slower than working through VS Code, so they are best used for single file edits and uploading/downloading content. If you need to use an application that bulk reads/write to many files at once (like a local source control tool), rsync is a better choice.

7/1/2026