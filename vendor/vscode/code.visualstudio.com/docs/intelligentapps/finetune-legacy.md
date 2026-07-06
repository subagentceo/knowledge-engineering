# Fine-tune models

Fine-tune AI model is a common practice that allows you to use your custom dataset to run **fine-tune** jobs on a pre-trained model in a computing environment with GPUs. Foundry Toolkit currently supports fine-tuning SLMs on local machine with GPU or in the cloud (Azure Container App) with GPU.

A fine-tuned model can be downloaded to local and do inference test with GPUs, or be quantized to run locally on CPUs. Fine-tuned model can also be deployed to a cloud environment as remote model.

## Fine-tune AI models on Azure with Foundry Toolkit for VS Code (Preview)

Foundry Toolkit for VS Code now supports provisioning an Azure Container App to run model fine-tuning and host an inference endpoint in the cloud.

### Set up your cloud environment

1.  To run the model fine-tuning and inference in your remote Azure Container Apps environment, make sure your subscription has enough GPU capacity. Fine-tuning runs on the NC24-A100 GPU workload profile in Azure Container Apps. Submit a support ticket to request quota for the `SubscriptionNCA100Gpus` SKU in your target region. For more information, see Azure Container Apps workload profiles.
    
    Important
    
    Some models need more than one GPU for a single fine-tuning job. If your quota is too low, provisioning fails with a `MaxRegionalQuotaExceeded` error. Request enough quota for the `SubscriptionNCA100Gpus` SKU to cover the number of GPUs that your model requires.
    
2.  Make sure you have a HuggingFace account and generate an access token if you are using private dataset on HuggingFace or your base model needs access control.
    
3.  Accept the LICENSE on HuggingFace if you are fine-tuning Mistral or Llama.
    
4.  Enable Remote Fine-tuning and Inference feature flag in the Foundry Toolkit for VS Code
    
    1.  Open the VS Code Settings by selecting _File -> Preferences -> Settings_.
    2.  Navigate to _Extensions_ and select _Foundry Toolkit_.
    3.  Select the _"Enable to run fine-tuning and inference on Azure Container Apps"_ option.
    
    ![Foundry Toolkit Settings](/assets/docs/intelligentapps/finetune/settings.png)
    
    1.  Reload VS Code for the changes to take effect.

### Scaffold a fine-tune project

1.  Run the `Foundry Toolkit: Focus on Tools View` in the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P))
2.  Navigate to `Fine-tuning` to access the model catalog. Select a model for the fine-tuning. Assign a name to your project and select its location on your machine. Then, hit the _"Configure Project"_ button. ![Panel: Select Model](/assets/docs/intelligentapps/finetune/panel-select-model.png)
3.  Project Configuration
    1.  Avoid enabling the _"Fine-tune locally"_ option.
    2.  The Olive configuration settings will appear with pre-set default values. Please adjust and fill in these configurations as needed.
    3.  Move on to _Generate Project_. This stage leverages WSL and involves setting up a new Conda environment, preparing for future updates that include Dev Containers. ![Panel: Configure the Model](/assets/docs/intelligentapps/finetune/panel-config-model.png)
    4.  Select _"Relaunch Window In Workspace"_ to open your fine-tune project. ![Panel: Generate Project](/assets/docs/intelligentapps/finetune/panel-generate-project.png)

Note

The project currently works either locally or remotely within the Foundry Toolkit for VS Code. If you choose _"Fine-tune locally"_ during project creation, it will run exclusively in WSL without cloud resources. Otherwise, the project will be restricted to run in the remote Azure Container App environment.

### Provision Azure Resources

To get started, you need to provision the Azure Resource for remote fine-tuning. From command palette find and execute `Foundry Toolkit: Provision Azure Container Apps job for fine-tuning`. During this process, you will be prompted to select your Azure Subscription and resource group.

![Provision Fine-Tuning](/assets/docs/intelligentapps/finetune/command-provision-finetune.png)

Monitor the progress of the provision through the link displayed in the output channel. ![Provision Progress](/assets/docs/intelligentapps/finetune/log-finetining-progress.png)

### Run fine-tuning

To start the remote fine-tuning job, run the `Foundry Toolkit: Run fine-tuning` command in the Command Palette.

![Run Fine-tuning](/assets/docs/intelligentapps/finetune/command-run-finetuning.png)

The extension then performs the following operations:

1.  Synchronize your workspace with Azure Files.
    
2.  Trigger the Azure Container Appjob using the commands specified in `./infra/fintuning.config.json`.
    

QLoRA will be used for fine-tuning, and the finetune process will create LoRA adapters for the model to use during inference.

The results of the fine-tuning will be stored in the Azure Files. To explore the output files in the Azure File share, you can navigate to the Azure portal using the link provided in the output panel. Alternatively, you can directly access the Azure portal and locate the storage account named `STORAGE_ACCOUNT_NAME` as defined in `./infra/fintuning.config.json` and the file share named `FILE_SHARE_NAME` as defined in `./infra/fintuning.config.json`.

![file-share](/assets/docs/intelligentapps/finetune/log-finetuning-files.png)

### View logs

Once the fine-tuning job has been started, you can access the system and console logs by visiting the Azure portal.

Alternatively, you can view the console logs directly in the VSCode Output panel.

![log-button](/assets/docs/intelligentapps/finetune/notification-finetune.png)

Note

The job might take a few minutes to initiate. If there is already a running job, the current one may be queued to start later.

#### View and query logs on Azure

After the fine-tuning job is triggered, you can view logs on Azure by selecting the "_Open Logs in Azure Portal_" button from the VSCode notification.

Or, if you've already opened the Azure Portal, find job history from the "_Execution history_" panel to the Azure Container Apps job.

![Job Execution History](/assets/docs/intelligentapps/finetune/finetune-job-history.png)

There are two types of logs, "_Console_" and "_System_".

*   Console logs are messages from your app, including `stderr` and `stdout` messages. This is what you have already seen in the streaming logs section.
*   System logs are messages from the Azure Container Apps service, including the status of service-level events.

To view and query your logs, select the "_Console_" button and navigate to the Log Analytics page where you can view all logs and write your queries.

![Job Log Analytics](/assets/docs/intelligentapps/finetune/finetune-job-log-query.png)

> For more information about Azure Container Apps Logs, see Application Logging in Azure Container Apps.

#### View streaming logs in VSCode

After initiating the fine-tuning job, you can also view logs on Azure by selecting the "_Show Streaming Logs in VS Code_" button in the VSCode notification.

Or you can run the command `Foundry Toolkit: Show the running fine-tuning job streaming logs` in the Command Palette.

![Streaming Log Command](/assets/docs/intelligentapps/finetune/command-show-streaming-log.png)

The streaming log of the running fine-tuning job will be displayed in the Output panel.

![Streaming Log Output](/assets/docs/intelligentapps/finetune/log-finetuning-res.png)

Note

The job might be queued due to insufficient resources. If the log is not displayed, wait for a while and then execute the command to re-connect to the streaming log. The streaming log may timeout and disconnect. However, it can be reconnected by execute the command again.

## Inferencing with the fine-tuned model

After the adapters are trained in the remote environment, use a simple Gradio application to interact with the model.

![Fine-tune complete](/assets/docs/intelligentapps/finetune/log-finetuning-res.png)

### Provision Azure resources

Similar to the fine-tuning process, you need to set up the Azure Resources for remote inference by executing the `Foundry Toolkit: Provision Azure Container Apps for inference` from the command palette. During this setup, you will be asked to select your Azure Subscription and resource group.

![Provision Inference Resource](/assets/docs/intelligentapps/finetune/command-provision-inference.png)

By default, the subscription and the resource group for inference should match those used for fine-tuning. The inference will use the same Azure Container App Environment and access the model and model adapter stored in Azure Files, which were generated during the fine-tuning step.

### Deployment for inference

If you wish to revise the inference code or reload the inference model, please execute the `Foundry Toolkit: Deploy for inference` command. This will synchronize your latest code with ACA and restart the replica.

![Deploy for inference](/assets/docs/intelligentapps/finetune/command-deploy.png)

After the successful completion of the deployment, the model is now ready for evaluation using this endpoint. You can access the inference API by selecting the "_Go to Inference Endpoint_" button displayed in the VSCode notification. Alternatively, the web API endpoint can be found under `ACA_APP_ENDPOINT` in `./infra/inference.config.json` and in the Output panel.

![App Endpoint](/assets/docs/intelligentapps/finetune/notification-deploy.png)

Note

The inference endpoint may require a few minutes to become fully operational.

## Advanced usage

### Fine-tune project components

Folder

Contents

`infra`

Contains all necessary configurations for remote operations.

`infra/provision/finetuning.parameters.json`

Holds parameters for the bicep templates, used for provisioning Azure resources for fine-tuning.

`infra/provision/finetuning.bicep`

Contains templates for provisioning Azure resources for fine-tuning.

`infra/finetuning.config.json`

The configuration file, generated by the `Foundry Toolkit: Provision Azure Container Apps job for fine-tuning` command. It is used as input for other remote command palettes.

### Configuring secrets for fine-tuning in Azure Container Apps

Azure Container App Secrets provide a secure way to store and manage sensitive data within Azure Container Apps, like HuggingFace tokens and Weights & Biases API keys. Using Foundry Toolkit's command palette, you can input the secrets into the provisioned Azure container app job(as stored in `./finetuning.config.json`). These secrets are then set as **environment variables** in all containers.

#### Steps

1.  In the Command Palette, type and select `Foundry Toolkit: Add Azure Container Apps Job secret for fine-tuning`
    
    ![Add secret](/assets/docs/intelligentapps/finetune/command-add-secret.png)
    
2.  Provide a secret name and value
    
    ![Input secret name](/assets/docs/intelligentapps/finetune/input-secret-name.png)
    
    ![Input secret](/assets/docs/intelligentapps/finetune/input-secret.png)
    
    For example, if you're using a private Hugging Face dataset or models that need Hugging Face access control, add a secret so the fine-tuning job can authenticate without a manual login. Enter `HF_TOKEN` as the secret name and your Hugging Face token as the value. The toolkit uses the secret name you enter as the environment variable name, so enter it exactly as `HF_TOKEN`, the variable that Hugging Face tools read. Azure Container Apps stores the underlying secret resource in lowercase as `hf-token`, but the environment variable passed to the job is still `HF_TOKEN`.
    

After you've set up the secret, you can now use it in your Azure Container App. The secret will be set in the environment variables of your container app.

### Configuring Azure resource provision for fine-tune

This guide will help you configure the `Foundry Toolkit: Provision Azure Container Apps job for fine-tuning` command.

You can find configuration parameters in `./infra/provision/finetuning.parameters.json` file. Here are the details:

Parameter

Description

`defaultCommands`

This is the default command to start a fine-tuning job. It can be overwritten in `./infra/finetuning.config.json`.

`maximumInstanceCount`

This parameter sets the maximum capacity of GPU instances.

`timeout`

This sets the timeout for the Azure Container Appfine-tuning job in seconds. The default value is 10800, which equals to 3 hours. If the Azure Container Appjob reaches this timeout, the fine-tuning process halts. However, checkpoints are saved by default, allowing the fine-tuning process to resume from the last checkpoint instead of starting over if it is run again.

`location`

This is the location where Azure resources are provisioned. The default value is the same as the chosen resource group's location.

`storageAccountName`, `fileShareName` `acaEnvironmentName`, `acaEnvironmentStorageName`, `acaJobName`, `acaLogAnalyticsName`

These parameters are used to name the Azure resources for provision. You can input a new, unused resource name to create your own custom-named resources, or you can input the name of an already existing Azure resource if you'd prefer to use that.

### Using existing Azure resources

If you have existing Azure resources that need to be configured for fine-tuning, you can specify their names in the `./infra/provision/finetuning.parameters.json` file and then run the `Foundry Toolkit: Provision Azure Container Apps job for fine-tuning` from the command palette. This will update the resources you've specified and create any that are missing.

For example, if you have an existing Azure container environment, your `./infra/finetuning.parameters.json` should look like this:

```
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
      ...
      "acaEnvironmentName": {
        "value": "<your-aca-env-name>"
      },
      "acaEnvironmentStorageName": {
        "value": null
      },
      ...
    }
  }
```

### Manual provisioning

If you prefer to manually set up the Azure resources, you can use the provided bicep files in the `./infra/provision` folders. If you've already set up and configured all the Azure resources without using the Foundry Toolkit command palette, you can simply enter the resource names in the `finetune.config.json` file.

For example:

```
{
  "SUBSCRIPTION_ID": "<your-subscription-id>",
  "RESOURCE_GROUP_NAME": "<your-resource-group-name>",
  "STORAGE_ACCOUNT_NAME": "<your-storage-account-name>",
  "FILE_SHARE_NAME": "<your-file-share-name>",
  "ACA_JOB_NAME": "<your-aca-job-name>",
  "COMMANDS": [
    "cd /mount",
    "pip install huggingface-hub==0.22.2",
    "huggingface-cli download <your-model-name> --local-dir ./model-cache/<your-model-name> --local-dir-use-symlinks False",
    "pip install -r ./setup/requirements.txt",
    "python3 ./finetuning/invoke_olive.py && find models/ -print | grep adapter/adapter"
  ]
}
```

### Inference components included in the template

Folder

Contents

`infra`

Contains all necessary configurations for remote operations.

`infra/provision/inference.parameters.json`

Holds parameters for the bicep templates, used for provisioning Azure resources for inference.

`infra/provision/inference.bicep`

Contains templates for provisioning Azure resources for inference.

`infra/inference.config.json`

The configuration file, generated by the `Foundry Toolkit: Provision Azure Container Apps for inference` command. It is used as input for other remote command palettes.

### Configuring Azure resource provisioning

This guide will help you configure the `Foundry Toolkit: Provision Azure Container Apps for inference` command.

You can find configuration parameters in `./infra/provision/inference.parameters.json` file. Here are the details:

Parameter

Description

`defaultCommands`

This is the commands to initiate a web API.

`maximumInstanceCount`

This parameter sets the maximum capacity of GPU instances.

`location`

This is the location where Azure resources are provisioned. The default value is the same as the chosen resource group's location.

`storageAccountName`, `fileShareName` `acaEnvironmentName`, `acaEnvironmentStorageName`, `acaAppName`, `acaLogAnalyticsName`

These parameters are used to name the Azure resources for provision. By default, they will be same to the fine-tuning resource name. You can input a new, unused resource name to create your own custom-named resources, or you can input the name of an already existing Azure resource if you'd prefer to use that.

### Using existing Azure resources

By default, the inference provision use the same Azure Container App Environment, Storage Account, Azure File Share, and Azure Log Analytics that were used for fine-tuning. A separate Azure Container App is created solely for the inference API.

If you have customized the Azure resources during the fine-tuning step or want to use your own existing Azure resources for inference, specify their names in the `./infra/inference.parameters.json` file. Then, run the `Foundry Toolkit: Provision Azure Container Apps for inference` command from the command palette. This updates any specified resources and creates any that are missing.

For example, if you have an existing Azure container environment, your `./infra/finetuning.parameters.json` should look like this:

```
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
      ...
      "acaEnvironmentName": {
        "value": "<your-aca-env-name>"
      },
      "acaEnvironmentStorageName": {
        "value": null
      },
      ...
    }
  }
```

### Manual provisioning

If you prefer to manually configure the Azure resources, you can use the provided bicep files in the `./infra/provision` folders. If you have already set up and configured all the Azure resources without using the Foundry Toolkit command palette, you can simply enter the resource names in the `inference.config.json` file.

For example:

```
{
  "SUBSCRIPTION_ID": "<your-subscription-id>",
  "RESOURCE_GROUP_NAME": "<your-resource-group-name>",
  "STORAGE_ACCOUNT_NAME": "<your-storage-account-name>",
  "FILE_SHARE_NAME": "<your-file-share-name>",
  "ACA_APP_NAME": "<your-aca-name>",
  "ACA_APP_ENDPOINT": "<your-aca-endpoint>"
}
```

## What you learned

In this article, you learned how to:

*   Set up the Foundry Toolkit for VS Code to support fine-tuning and inference in Azure Container Apps.
*   Create a fine-tuning project in Foundry Toolkit for VS Code.
*   Configure the fine-tuning workflow, including dataset selection and training parameters.
*   Run the fine-tuning workflow to adapt a pre-trained model to your specific dataset.
*   View the results of the fine-tuning process, including metrics and logs.
*   Use the sample notebook for model inference and testing.
*   Export and share the fine-tuning project with others.
*   Re-evaluate a model using different datasets or training parameters.
*   Handle failed jobs and adjust configurations for re-runs.
*   Understand the supported models and their requirements for fine-tuning.
*   Use the Foundry Toolkit for VS Code to manage fine-tuning projects, including provisioning Azure resources, running fine-tuning jobs, and deploying models for inference.

12/11/2024