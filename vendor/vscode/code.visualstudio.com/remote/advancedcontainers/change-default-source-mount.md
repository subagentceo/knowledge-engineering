# Change the default source code mount

If you add the `image` or `dockerFile` properties to `devcontainer.json`, VS Code will automatically "bind" mount your current workspace folder into the container. If `git` is present on the host's `PATH` and the folder containing `.devcontainer/devcontainer.json` is within a `git` repository, the current workspace mounted will be the root of the repository. If `git` is not present on the host's `PATH`, the current workspace mounted will be the folder containing `.devcontainer/devcontainer.json`.

While this is convenient, you may want to change mount settings, alter the type of mount, location, or run in a remote dev container.

You can use the `workspaceMount` property in `devcontainer.json` to change the automatic mounting behavior. It expects the same value as the Docker CLI `--mount` flag.

For example:

```
"workspaceMount": "source=${localWorkspaceFolder}/sub-folder,target=/workspace,type=bind",
"workspaceFolder": "/workspace"
```

This also allows you to do something like a named volume mount instead of a bind mount, which can be useful particularly when using a remote Docker Host or you want to store your entire source tree in a volume.

If you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (F1) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

### Video : Work with Monorepos in a dev container by changing default mount

  
  

### Video : Change the default location of your project in a container

7/1/2026