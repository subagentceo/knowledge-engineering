# Add another local file mount

> **Note:** Mounting the local file system is not supported in GitHub Codespaces. See developing inside a container on a remote Docker host for information on mounting remote folders in this scenario.

You can add a volume bound to any local folder by using the following appropriate steps, based on what you reference in `devcontainer.json`:

*   **Dockerfile or image**: Add the following to the `mounts` property (VS Code 1.41+) in this same file:
    
    ```
    "mounts": [
      "source=/local/source/path/goes/here,target=/target/path/in/container/goes/here,type=bind,consistency=cached"
    ]
    ```
    
    You can also reference local environment variables or the local path of the workspace. For example, this will bind mount `~` (`$HOME`) on macOS/Linux and the user's folder (`%USERPROFILE%`) on Windows and a sub-folder in the workspace to a different location:
    
    ```
    "mounts": [
        "source=${localEnv:HOME}${localEnv:USERPROFILE},target=/host-home-folder,type=bind,consistency=cached",
        "source=${localWorkspaceFolder}/app-data,target=/data,type=bind,consistency=cached"
    ]
    ```
    

### Video: Add additional folders from your local machine to a dev container

  
  

*   **Docker Compose:** Update (or extend) your `docker-compose.yml` with the following for the appropriate service:
    
    ```
    version: '3'
    services:
      your-service-name-here:
        volumes:
          - /local/source/path/goes/here:/target/path/in/container/goes/here:cached
          - ~:/host-home-folder:cached
          - ./data-subfolder:/data:cached
         # ...
    ```
    

If you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (F1) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

7/1/2026