

The `lms load` command loads a model into memory. You can optionally set parameters such as context length, GPU offload, and TTL. This guide also covers unloading models with `lms unload`.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22%5Bpath%5D%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22The%20path%20of%20the%20model%20to%20load.%20If%20not%20provided%2C%20you%20will%20be%20prompted%20to%20select%20one%22%0A-%20name%3A%20%22--ttl%22%0A%20%20type%3A%20%22number%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22If%20provided%2C%20when%20the%20model%20is%20not%20used%20for%20this%20number%20of%20seconds%2C%20it%20will%20be%20unloaded%22%0A-%20name%3A%20%22--gpu%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22How%20much%20to%20offload%20to%20the%20GPU.%20Values%3A%200-1%2C%20off%2C%20max%22%0A-%20name%3A%20%22--context-length%22%0A%20%20type%3A%20%22number%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22The%20number%20of%20tokens%20to%20consider%20as%20context%20when%20generating%20text%22%0A-%20name%3A%20%22--identifier%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22The%20identifier%20to%20assign%20to%20the%20loaded%20model%20for%20API%20reference%22%0A-%20name%3A%20%22--estimate-only%22%0A%20%20type%3A%20%22boolean%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Print%20a%20resource%20(memory)%20estimate%20and%20exit%20without%20loading%20the%20model%22" />

Load a model [#load-a-model]

Load a model into memory by running the following command:

```shell
lms load <model_key>
```

You can find the `model_key` by first running [`lms ls`](/docs/cli/local-models/ls) to list your locally downloaded models.

Set a custom identifier [#set-a-custom-identifier]

Optionally, you can assign a custom identifier to the loaded model for API reference:

```shell
lms load <model_key> --identifier "my-custom-identifier"
```

You will then be able to refer to this model by the identifier `my_model` in subsequent commands and API calls (`model` parameter).

Set context length [#set-context-length]

You can set the context length when loading a model using the `--context-length` flag:

```shell
lms load <model_key> --context-length 4096
```

This determines how many tokens the model will consider as context when generating text.

Set GPU offload [#set-gpu-offload]

Control GPU memory usage with the `--gpu` flag:

```shell
lms load <model_key> --gpu 0.5    # Offload 50% of layers to GPU
lms load <model_key> --gpu max    # Offload all layers to GPU
lms load <model_key> --gpu off    # Disable GPU offloading
```

If not specified, LM Studio will automatically determine optimal GPU usage.

Set TTL [#set-ttl]

Set an auto-unload timer with the `--ttl` flag (in seconds):

```shell
lms load <model_key> --ttl 3600   # Unload after 1 hour of inactivity
```

Estimate resources without loading [#estimate-resources-without-loading]

Preview memory requirements before loading a model using `--estimate-only`:

```shell
lms load --estimate-only <model_key>
```

Optional flags such as `--context-length` and `--gpu` are honored and reflected in the estimate. The estimator accounts for factors like context length, flash attention, and whether the model is vision‑enabled.

Example:

```bash
$ lms load --estimate-only gpt-oss-120b
Model: openai/gpt-oss-120b
Estimated GPU Memory:   65.68 GB
Estimated Total Memory: 65.68 GB

Estimate: This model may be loaded based on your resource guardrails settings.
```

Unload models [#unload-models]

Use `lms unload` to remove models from memory.

Flags [#flags-1]

<DocsParamsTable data="-%20name%3A%20%22%5Bmodel_key%5D%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22The%20key%20of%20the%20model%20to%20unload.%20If%20not%20provided%2C%20you%20will%20be%20prompted%20to%20select%20one%22%0A-%20name%3A%20%22--all%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Unload%20all%20currently%20loaded%20models%22%0A-%20name%3A%20%22--host%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22The%20host%20address%20of%20a%20remote%20LM%20Studio%20instance%20to%20connect%20to%22" />

Unload a specific model [#unload-a-specific-model]

```shell
lms unload <model_key>
```

If no model key is provided, you will be prompted to select from currently loaded models.

Unload all models [#unload-all-models]

```shell
lms unload --all
```

Unload from a remote LM Studio instance [#unload-from-a-remote-lm-studio-instance]

```shell
lms unload <model_key> --host <host>
```

Operate on a remote LM Studio instance [#operate-on-a-remote-lm-studio-instance]

`lms load` supports the `--host` flag to connect to a remote LM Studio instance.

```shell
lms load <model_key> --host <host>
```

For this to work, the remote LM Studio instance must be running and accessible from your local machine, e.g. be accessible on the same subnet.
