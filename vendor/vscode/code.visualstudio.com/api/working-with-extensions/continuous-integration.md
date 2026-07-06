# Continuous Integration

Extension integration tests can be run on CI services. The `@vscode/test-electron` library helps you set up extension tests on CI providers and contains a sample extension setup on Azure Pipelines. You can check out the build pipeline or jump directly to the `azure-pipelines.yml` file.

## Automated publishing

You can also configure the CI to publish a new version of the extension automatically.

The publish command is similar to publishing from a local environment using `vsce`, but you must somehow provide the Personal Access Token (PAT) in a secure way. By storing the PAT as a `VSCE_PAT` **secret variable**, `vsce` will be able to use it. Secret variables are never exposed, so they are safe to use in a CI pipeline.

## Azure Pipelines

![Azure Pipelines](/assets/api/working-with-extensions/continuous-integration/pipelines-logo.png)

Azure Pipelines is great for running VS Code extension tests as it supports running the tests on Windows, macOS, and Linux. For Open Source projects, you get unlimited minutes and 10 free parallel jobs. This section explains how to set up an Azure Pipelines for running your extension tests.

First, create a free account on Azure DevOps and create an Azure DevOps project for your extension.

Then, add the following `azure-pipelines.yml` file to the root of your extension's repository. Other than the `xvfb` setup script for Linux that is necessary to run VS Code in headless Linux CI machines, the definition is straight-forward:

```
trigger:
  branches:
    include:
    - main
  tags:
    include:
    - v*

strategy:
  matrix:
    linux:
      imageName: 'ubuntu-latest'
    mac:
      imageName: 'macos-latest'
    windows:
      imageName: 'windows-latest'

pool:
  vmImage: $(imageName)

steps:

- task: NodeTool@0
  inputs:
    versionSpec: '10.x'
  displayName: 'Install Node.js'

- bash: |
    /usr/bin/Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
    echo ">>> Started xvfb"
  displayName: Start xvfb
  condition: and(succeeded(), eq(variables['Agent.OS'], 'Linux'))

- bash: |
    echo ">>> Compile vscode-test"
    yarn && yarn compile
    echo ">>> Compiled vscode-test"
    cd sample
    echo ">>> Run sample integration test"
    yarn && yarn compile && yarn test
  displayName: Run Tests
  env:
    DISPLAY: ':99.0'
```

Finally, create a new pipeline in your DevOps project and point it to the `azure-pipelines.yml` file. Trigger a build and voilà:

![pipelines](/assets/api/working-with-extensions/continuous-integration/pipelines.png)

You can enable the build to run continuously when pushing to a branch and even on pull requests. See Build pipeline triggers to learn more.

### Azure Pipelines automated publishing

1.  Set up `VSCE_PAT` as a secret variable using the Azure DevOps secrets instructions.
2.  Install `vsce` as a `devDependencies` (`npm install @vscode/vsce --save-dev` or `yarn add @vscode/vsce --dev`).
3.  Declare a `deploy` script in `package.json` without the PAT (by default, `vsce` will use the `VSCE_PAT` environment variable as the Personal Access Token).

```
"scripts": {
  "deploy": "vsce publish --yarn"
}
```

4.  Configure the CI so the build will also run when tags are created:

```
trigger:
  branches:
    include:
    - main
  tags:
    include:
    - refs/tags/v*
```

5.  Add a `publish` step in `azure-pipelines.yml` that calls `yarn deploy` with the secret variable.

```
- bash: |
    echo ">>> Publish"
    yarn deploy
  displayName: Publish
  condition: and(succeeded(), startsWith(variables['Build.SourceBranch'], 'refs/tags/'), eq(variables['Agent.OS'], 'Linux'))
  env:
    VSCE_PAT: $(VSCE_PAT)
```

The condition property tells the CI to run the publish step only in certain cases.

In our example, the condition has three checks:

*   `succeeded()` - Publish only if the tests pass.
*   `startsWith(variables['Build.SourceBranch'], 'refs/tags/')` - Publish only if a tagged (release) build.
*   `eq(variables['Agent.OS'], 'Linux')` - Include if your build runs on multiple agents (Windows, Linux, etc.). If not, remove that part of the condition.

Since `VSCE_PAT` is a secret variable, it is not immediately usable as an environment variable. Thus, we need to explicitly map the environment variable `VSCE_PAT` to the secret variable.

## GitHub Actions

You can also configure GitHub Actions to run your extension CI. In headless Linux CI machines `xvfb` is required to run VS Code, so if Linux is the current OS run the tests in an Xvfb enabled environment:

```
on:
  push:
    branches:
      - main

jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    - name: Install Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 18.x
    - run: npm install
    - run: xvfb-run -a npm test
      if: runner.os == 'Linux'
    - run: npm test
      if: runner.os != 'Linux'
```

### GitHub Actions automated publishing

1.  Set up `VSCE_PAT` as an encrypted secret using the GitHub Actions secrets instructions.
2.  Install `vsce` as a `devDependencies` (`npm install @vscode/vsce --save-dev` or `yarn add @vscode/vsce --dev`).
3.  Declare a `deploy` script in `package.json` without the PAT.

```
"scripts": {
  "deploy": "vsce publish --yarn"
}
```

4.  Configure the CI so the build will also run when tags are created:

```
on:
  push:
    branches:
    - main
  release:
    types:
    - created
```

5.  Add a `publish` job to the pipeline that calls `npm run deploy` with the secret variable.

```
- name: Publish
  if: success() && startsWith(github.ref, 'refs/tags/') && matrix.os == 'ubuntu-latest'
  run: npm run deploy
  env:
    VSCE_PAT: ${{ secrets.VSCE_PAT }}
```

The if property tells the CI to run the publish step only in certain cases.

In our example, the condition has three checks:

*   `success()` - Publish only if the tests pass.
*   `startsWith(github.ref, 'refs/tags/')` - Publish only if a tagged (release) build.
*   `matrix.os == 'ubuntu-latest'` - Include if your build runs on multiple agents (Windows, Linux, etc.). If not, remove that part of the condition.

## GitLab CI

GitLab CI can be used to test and publish the extension in headless Docker containers. This can be done by pulling a preconfigured Docker image, or installing `xvfb` and the libraries required to run Visual Studio Code during the pipeline.

```
image: node:12-buster

before_script:
  - npm install

test:
  script:
    - |
      apt update
      apt install -y libasound2 libgbm1 libgtk-3-0 libnss3 xvfb
      xvfb-run -a npm run test
```

### GitLab CI automated publishing

1.  Set up `VSCE_PAT` as a masked variable using the GitLab CI documentation.
2.  Install `vsce` as a `devDependencies` (`npm install @vscode/vsce --save-dev` or `yarn add @vscode/vsce --dev`).
3.  Declare a `deploy` script in `package.json` without the PAT.

```
"scripts": {
  "deploy": "vsce publish --yarn"
}
```

4.  Add a `deploy` job that calls `npm run deploy` with the masked variable which will only trigger on tags.

```
deploy:
  only:
    - tags
  script:
    - npm run deploy
```

## Common questions

### Do I need to use Yarn for continuous integration?

All of the above examples refer to a hypothetical project built with Yarn, but can be adapted to use npm, Grunt, Gulp, or any other JavaScript build tool.

7/1/2026