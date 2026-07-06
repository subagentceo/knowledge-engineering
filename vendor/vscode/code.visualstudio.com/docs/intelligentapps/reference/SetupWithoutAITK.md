# Set up the environment manually

This article describes how to manually set up Python environments for model conversion and model inference across different hardware targets.

## Set up the environment for model conversion

It is recommended to install your environment in a Python virtual environment using uv, as Foundry Toolkit uses this internally.

The default Python version is 3.12 unless configured otherwise.

### Requirements installation

When Foundry Toolkit sets up a virtual environment, it installs three kinds of requirements in order:

*   **Base requirements**: The fundamental requirements, including all packages.
*   **Feature requirements**: Additional requirements for the recipe, installed after the base requirements.
*   **Project requirements**: The `requirements.txt` file inside the project, allowing you to customize dependencies.

These files are hosted in the olive-recipes repo.

Note

The requirements files support special commands that enrich their content. Before installing a requirements file, check for any special commands and handle them accordingly, then install it normally with `uv pip install -r xxx.txt`.

#### Example: Qualcomm NPU

For Deepseek Qualcomm NPU, `runtimeOverwrite.executeEp` is `CUDAExecutionProvider`, so the base requirements file is NvidiaGPU. `executeRuntimeFeatures` is `AutoGptq`, so the feature requirements file is AutoGptq.

#### Example: AMD NPU

For Deepseek AMD NPU, `runtimeOverwrite.executeEp` is `AMD/Quark_py3.10.17`, so the base requirements file is AMD/Quark_py3.10.17. There are no feature requirements. Use Python 3.10 for this virtual environment.

## Set up the environment for model inference

The process is similar to Set up the environment for model conversion.

Tip

The same requirements file may also be used for conversion. You may only need to install `onnxruntime-windowsml` and `onnxruntime-genai-winml` from the file.

WCR is the up-to-date requirements file for running models on all execution providers in Foundry Toolkit.

Note

For LLM models on QNN, an arm64 Python environment provides better performance. A dedicated requirements file is available for this configuration.

05/13/2025