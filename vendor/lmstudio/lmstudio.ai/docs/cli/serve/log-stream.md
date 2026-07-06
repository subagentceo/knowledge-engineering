

`lms log stream` lets you inspect the exact strings LM Studio sends to and receives from models, and (new in 0.3.26) stream server logs. This is useful for debugging prompt templates, model IO, and server operations.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22-s%2C%20--source%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Source%20of%20logs%3A%20model%20or%20server%20(default%3A%20model)%22%0A-%20name%3A%20%22--stats%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Print%20prediction%20stats%20when%20available%22%0A-%20name%3A%20%22--filter%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Filter%20for%20model%20source%3A%20input%2C%20output%2C%20or%20both%22%0A-%20name%3A%20%22--json%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Output%20logs%20as%20JSON%20(newline%20separated)%22" />

Quick start [#quick-start]

Stream model IO (default):

```shell
lms log stream
```

Stream server logs:

```shell
lms log stream --source server
```

Filter model logs [#filter-model-logs]

```bash
# Only the formatted user input
lms log stream --source model --filter input

# Only the model output (emitted once the message completes)
lms log stream --source model --filter output

# Both directions
lms log stream --source model --filter input,output
```

JSON output and stats [#json-output-and-stats]

Emit JSON:

```shell
lms log stream --source model --filter input,output --json
```

Include prediction stats:

```shell
lms log stream --source model --filter output --stats
```
