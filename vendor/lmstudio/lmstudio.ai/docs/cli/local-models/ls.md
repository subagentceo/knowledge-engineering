

The `lms ls` command displays a list of all models downloaded to your machine, including their size, architecture, and parameters.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22--llm%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Show%20only%20LLMs.%20When%20not%20set%2C%20all%20models%20are%20shown%22%0A-%20name%3A%20%22--embedding%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Show%20only%20embedding%20models%22%0A-%20name%3A%20%22--json%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Output%20the%20list%20in%20JSON%20format%22%0A-%20name%3A%20%22--detailed%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Show%20detailed%20information%20about%20each%20model%22" />

List all models [#list-all-models]

Show all downloaded models:

```shell
lms ls
```

Example output:

```
You have 47 models, taking up 160.78 GB of disk space.

LLMs (Large Language Models)                       PARAMS      ARCHITECTURE           SIZE
lmstudio-community/meta-llama-3.1-8b-instruct          8B         Llama            4.92 GB
hugging-quants/llama-3.2-1b-instruct                   1B         Llama            1.32 GB
mistral-7b-instruct-v0.3                                         Mistral           4.08 GB
zeta                                                   7B         Qwen2            4.09 GB

... (abbreviated in this example) ...

Embedding Models                                   PARAMS      ARCHITECTURE           SIZE
text-embedding-nomic-embed-text-v1.5@q4_k_m                     Nomic BERT        84.11 MB
text-embedding-bge-small-en-v1.5                     33M           BERT           24.81 MB
```

Filter by model type [#filter-by-model-type]

List only LLM models:

```shell
lms ls --llm
```

List only embedding models:

```shell
lms ls --embedding
```

Additional output formats [#additional-output-formats]

Get detailed information about models:

```shell
lms ls --detailed
```

Output in JSON format:

```shell
lms ls --json
```

Operate on a remote LM Studio instance [#operate-on-a-remote-lm-studio-instance]

`lms ls` supports the `--host` flag to connect to a remote LM Studio instance:

```shell
lms ls --host <host>
```

For this to work, the remote LM Studio instance must be running and accessible from your local machine, e.g. be accessible on the same subnet.
