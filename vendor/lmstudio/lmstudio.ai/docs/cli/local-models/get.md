

The `lms get` command allows you to search and download models from online repositories. If no model is specified, it shows staff-picked recommendations.

Models you download via `lms get` will be stored in your LM Studio model directory.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22%5BmodelName%5D%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22The%20model%20to%20download.%20If%20omitted%2C%20staff%20picks%20are%20shown.%20For%20models%20with%20multiple%20quantizations%2C%20append%20'%40'%20(e.g.%2C%20'llama-3.1-8b%40q4_k_m').%22%0A-%20name%3A%20%22--mlx%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Include%20only%20MLX%20models%20in%20search%20results.%20If%20either%20'--mlx'%20or%20'--gguf'%20is%20set%2C%20only%20matching%20formats%20are%20shown%3B%20otherwise%20results%20match%20installed%20runtimes.%22%0A-%20name%3A%20%22--gguf%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Include%20only%20GGUF%20models%20in%20search%20results.%20If%20either%20'--mlx'%20or%20'--gguf'%20is%20set%2C%20only%20matching%20formats%20are%20shown%3B%20otherwise%20results%20match%20installed%20runtimes.%22%0A-%20name%3A%20%22-n%2C%20--limit%22%0A%20%20type%3A%20%22number%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Limit%20the%20number%20of%20model%20options%20shown.%22%0A-%20name%3A%20%22--always-show-all-results%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Always%20prompt%20you%20to%20choose%20from%20search%20results%2C%20even%20when%20there's%20an%20exact%20match.%22%0A-%20name%3A%20%22-a%2C%20--always-show-download-options%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Always%20prompt%20you%20to%20choose%20a%20quantization%2C%20even%20when%20an%20exact%20match%20is%20auto-selected.%22" />

Download a model [#download-a-model]

Download a model by name:

```shell
lms get llama-3.1-8b
```

Specify quantization [#specify-quantization]

Download a specific model quantization:

```shell
lms get llama-3.1-8b@q4_k_m
```

Filter by format [#filter-by-format]

Show only MLX or GGUF models:

```shell
lms get --mlx
lms get --gguf
```

Control search results [#control-search-results]

Limit the number of results:

```shell
lms get --limit 5
```

Always show all options:

```shell
lms get --always-show-all-results
lms get --always-show-download-options
```
