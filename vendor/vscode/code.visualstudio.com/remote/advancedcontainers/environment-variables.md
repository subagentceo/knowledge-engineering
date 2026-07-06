# Environment variables

You can set environment variables in your container without altering the container image by using one of the options below.

> You should verify **Terminal > Integrated: Inherit Env** is checked in settings or the variables you set may not appear in the Integrated Terminal. This setting is checked by default.

## Option 1: Add individual variables

Depending on what you reference in `devcontainer.json`:

*   **Dockerfile or image**: Add the `containerEnv` property to `devcontainer.json` to set variables that should apply to the entire container or `remoteEnv` to set variables for VS Code and related sub-processes (terminals, tasks, debugging, etc.):
    
    ```
    "containerEnv": {
        "MY_CONTAINER_VAR": "some-value-here",
        "MY_CONTAINER_VAR2": "${localEnv:SOME_LOCAL_VAR}"
    },
    "remoteEnv": {
        "PATH": "${containerEnv:PATH}:/some/other/path",
        "MY_REMOTE_VARIABLE": "some-other-value-here",
        "MY_REMOTE_VARIABLE2": "${localEnv:SOME_LOCAL_VAR}"
    }
    ```
    
    As this example illustrates, `containerEnv` can reference local variables and `remoteEnv` can reference both local and existing container variables.
    

### Video: Modify PATH in a dev container

  
  

*   **Docker Compose**: Since Docker Compose has built-in support for updating container-wide variables, only `remoteEnv` is supported in `devcontainer.json`:
    
    ```
    "remoteEnv": {
        "PATH": "${containerEnv:PATH}:/some/other/path",
        "MY_REMOTE_VARIABLE": "some-other-value-here",
        "MY_REMOTE_VARIABLE2": "${localEnv:SOME_LOCAL_VAR}"
    }
    ```
    
    As this example illustrates, `remoteEnv` can reference both local and existing container variables.
    
    To update variables that apply to the entire container, update (or extend) your `docker-compose.yml` with the following for the appropriate service:
    
    ```
    version: '3'
    services:
      your-service-name-here:
        environment:
          - YOUR_ENV_VAR_NAME=your-value-goes-here
          - ANOTHER_VAR=another-value
         # ...
    ```
    

If you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (F1) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

## Option 2: Use an env file

If you have a large number of environment variables that you need to set, you can use a `.env` file instead.

First, create an environment file somewhere in your source tree. Consider this `.devcontainer/devcontainer.env` file:

```
YOUR_ENV_VAR_NAME=your-value-goes-here
ANOTHER_ENV_VAR_NAME=your-value-goes-here
```

Next, depending on what you reference in `devcontainer.json`:

*   **Dockerfile or image**: Edit `devcontainer.json` and add a path to the `devcontainer.env` :
    
    ```
    "runArgs": ["--env-file",".devcontainer/devcontainer.env"]
    ```
    
*   **Docker Compose:** Edit `docker-compose.yml` and add a path to the `devcontainer.env` file relative to the Docker Compose file:
    
    ```
    version: '3'
    services:
      your-service-name-here:
        env_file: devcontainer.env
        # ...
    ```
    

`docker compose` will automatically pick up a file called `.env` in the folder containing the `docker-compose.yml`, but you can also create one in another location.

If you've already built the container and connected to it, run **Dev Containers: Rebuild Container** from the Command Palette (F1) to pick up the change. Otherwise run **Dev Containers: Open Folder in Container...** to connect to the container.

### Video: Load variables from an .env file

7/1/2026