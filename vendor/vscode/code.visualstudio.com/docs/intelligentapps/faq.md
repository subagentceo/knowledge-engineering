# Foundry Toolkit FAQ

## Models

### How can I find my remote model endpoint and authentication header?

Here are some examples about how to find your endpoint and authentication headers in common OpenAI service providers. For other providers, you can check out their documentation about the chat completion endpoint and authentication header.

#### Example 1: Azure OpenAI

1.  Go to the **Deployments** blade in Azure OpenAI Studio and select a deployment, for example, `gpt-4o`. If you don't have a deployment yet, check the Azure OpenAI documentation on how to create a deployment.
    
    ![Select model deployment](/assets/docs/intelligentapps/faq/6-aoai-deployments.png)
    
2.  Retrieve your chat completion endpoint in the **Target URI** field in the **Endpoint** section
    
    ![Find model endpoint](/assets/docs/intelligentapps/faq/7-aoai-model.png)
    
3.  Get the API key from the **Key** property in the **Endpoint** section.
    
    After you copy the API key, add it in the format of `api-key: <YOUR_API_KEY>` for authentication header in Foundry Toolkit. See Azure OpenAI service documentation to learn more about the authentication header.
    

#### Example 2: OpenAI

1.  For now, the chat completion endpoint is fixed at `https://api.openai.com/v1/chat/completions`. See OpenAI documentation to learn more about it.
    
2.  Go to the OpenAI documentation and select `API Keys` or `Project API Keys` to create or retrieve your API key.
    
    After you copy the API key, fill it in the format of `Authorization: Bearer <YOUR_API_KEY>` for authentication header in Foundry Toolkit. See the OpenAI documentation for more information.
    
    ![Find model access key](/assets/docs/intelligentapps/faq/8-openai-key.png)
    

### How to edit endpoint URL or authentication header?

If you enter the wrong endpoint or authentication header, you may encounter errors with inferencing.

1.  Open the VS Code `setting.json` file:
    
    *   Select `Edit settings.json` in the authentication failure notification
        
        ![Edit](/assets/docs/intelligentapps/faq/9-edit.png)
        
    *   Alternatively, enter `Open User Settings (JSON)` in the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P))
        
2.  Search for the `windowsaistudio.remoteInfereneEndpoints` setting
    
3.  Edit or remove existing endpoint URLs or authentication headers.
    
    ![Edit endpoint in settings](/assets/docs/intelligentapps/faq/10-edit-settings.png)
    
    After you save the settings, the models list in tree view or playground will automatically refresh.
    

### How can I join the waitlist for OpenAI o1-mini or OpenAI o1-preview?

The OpenAI o1 series models are specifically designed to tackle reasoning and problem-solving tasks with increased focus and capability. These models spend more time processing and understanding the user's request, making them exceptionally strong in areas like science, coding, math and similar fields. For example, o1 can be used by healthcare researchers to annotate cell sequencing data, by physicists to generate complicated mathematical formulas needed for quantum optics, and by developers in all fields to build and execute multi-step workflows.

Important

The o1-preview model is available for limited access. To try the model in the playground, registration is required, and access is granted based on Microsoft’s eligibility criteria.

Visit the GitHub model market to find OpenAI o1-mini or OpenAI o1-preview and join the waitlist.

### Can I use my own models or other models from Hugging Face?

If your own model supports the OpenAI API contract, you can host it in the cloud and add the model to Foundry Toolkit as a custom model. You need to provide key information such as model endpoint URL, access key and model name.

## Fine-tuning

### There are many fine-tuning settings. Do I need to worry about all of them?

No, you can just run with the default settings and our sample dataset for testing. You can also pick your own dataset, but you will need to tweak some settings. See the fine-tuning tutorial for more info.

### Foundry Toolkit does not scaffold the fine-tuning project

Make sure to check for the extension prerequisites before installing the extension.

### I have the NVIDIA GPU device but the prerequisites check fails

If you have the NVIDIA GPU device but the prerequisites check fails with "GPU is not detected", make sure that the latest driver is installed. You can check and download the driver at NVIDIA site.

Also, make sure that it is installed in the path. To verify, run `nvidia-smi` from the command line.

### I generated the project but Conda activate fails to find the environment

There might have been an issue setting the environment. You can manually initialize the environment by using `bash /mnt/[PROJECT_PATH]/setup/first_time_setup.sh` from inside the workspace.

### When using a Hugging Face dataset, how do I get it?

Before you start the `python finetuning/invoke_olive.py` command, make sure that you run `huggingface-cli login` command. This ensures that the dataset can be downloaded on your behalf.

## Environment

### Does the extension work in Linux or other systems?

Yes, Foundry Toolkit runs on Windows, Mac, and Linux.

### How can I disable the Conda auto activation from my WSL

To disable the Conda install in WSL, run `conda config --set auto_activate_base false`. This disables the base environment.

### Do you support containers today?

We are currently working on the container support and it will be enabled in a future release.

### Why do you need GitHub and Hugging Face credentials?

We host all the project templates in GitHub, and the base models are hosted in Azure or Hugging Face. These environments require an account to get access them from the APIs.

### I am getting an error downloading Llama2

Ensure that you request access to Llama through the Llama 2 sign up page. This is needed to comply with Meta's trade compliance.

### I can't save project inside WSL instance

Because remote sessions are currently not supported when running the Foundry Toolkit actions, you cannot save your project while being connected to WSL. To close remote connections, select "WSL" at the bottom left of the screen and choose "Close Remote Connections".

### Error: GitHub API forbidden

We host the project templates in the `microsoft/windows-ai-studio-templates` GitHub repository, and the extension uses the GitHub API to load the repo contents. If you are in Microsoft, you may need to authorize Microsoft organization to avoid such forbidden issue.

See this issue for a workaround. The detailed steps are:

1.  Sign out GitHub account from VS Code
    
2.  Reload VS Code and Foundry Toolkit and you will be asked to sign in GitHub again
    
3.  **Important:** In the browser's authorize page, make sure to authorize the app to access the Microsoft org
    
    ![Authorize Access](/assets/docs/intelligentapps/faq/faq-github-api-forbidden.png)
    

### Cannot list, load, or download ONNX model

Check the Foundry Toolkit log in the VS Code Output panel. If you see _Agent_ errors or _Failed to get downloaded models_, then close all VS Code instances and reopen VS Code.

(_This issue is caused by the underlying ONNX agent unexpectedly closing and the above step is to restart the agent._)

12/11/2024