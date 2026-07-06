# Persist bash history

You can also use a mount to persist your `bash` command history across sessions / container rebuilds.

First, update your `Dockerfile` so that each time a command is used in `bash`, the history is updated and stored in a location we will persist.

If you have a root user, update your `Dockerfile` with the following:

```
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && echo "$SNIPPET" >> "/root/.bashrc"
```

If you have a non-root user, update your `Dockerfile` with the following. Replace `user-name-goes-here` with the name of a non-root user in the container.

```
ARG USERNAME=user-name-goes-here

RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && mkdir /commandhistory \
    && touch /commandhistory/.bash_history \
    && chown -R $USERNAME /commandhistory \
    && echo "$SNIPPET" >> "/home/$USERNAME/.bashrc"
```

Next, add a local volume to store the command history. This step varies depending on whether or not you are using Docker Compose.

*   **Dockerfile or image**: Use the `mounts` property (VS Code 1.41+) in your `devcontainer.json` file.
    
    ```
      "mounts": [
          "source=projectname-bashhistory,target=/commandhistory,type=volume"
      ]
    ```
    
*   **Docker Compose:** Update (or extend) your `docker-compose.yml` with the following for the appropriate service.
    
    ```
    version: '3'
    services:
      your-service-name-here:
        volumes:
          - projectname-bashhistory:/commandhistory
         # ...
    volumes:
      projectname-bashhistory:
    ```
    

Finally, if you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (F1) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

> **Note:** If your host machine is running Linux (including WSL on Windows) and its user's UID and GID do not match those of the user in the dev container, the dev container user's UID and GID will be updated to those of the host user and you need to apply the same update to the volume by adding the following to the devcontainer.json.

```
```json
  "postCreateCommand": {
    "Fix Volume Permissions": "sudo chown -R $(whoami): /commandhistory"
  }
```
```

### Video: How to make your bash history persist in a dev container

7/1/2026