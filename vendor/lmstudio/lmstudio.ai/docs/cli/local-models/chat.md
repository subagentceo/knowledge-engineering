

Use `lms chat` to talk to a local model directly in the terminal. This is handy for quick experiments or scripting.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22%5Bmodel%5D%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Identifier%20of%20the%20model%20to%20use.%20If%20omitted%2C%20you%20will%20be%20prompted%20to%20pick%20one.%22%0A-%20name%3A%20%22-p%2C%20--prompt%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Send%20a%20one-off%20prompt%20and%20print%20the%20response%20to%20stdout%20before%20exiting%22%0A-%20name%3A%20%22-s%2C%20--system-prompt%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Custom%20system%20prompt%20for%20the%20chat%22%0A-%20name%3A%20%22--stats%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Show%20detailed%20prediction%20statistics%20after%20each%20response%22%0A-%20name%3A%20%22--ttl%22%0A%20%20type%3A%20%22number%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Seconds%20to%20keep%20the%20model%20loaded%20after%20the%20chat%20ends%20(default%3A%203600)%22" />

Start an interactive chat [#start-an-interactive-chat]

```shell
lms chat
```

You will be prompted to pick a model if one is not provided.

Chat with a specific model [#chat-with-a-specific-model]

```shell
lms chat my-model
```

Send a single prompt and exit [#send-a-single-prompt-and-exit]

Use `-p` to print the response to stdout and exit instead of staying interactive:

```shell
lms chat my-model -p "Summarize this release note"
```

Set a system prompt [#set-a-system-prompt]

```shell
lms chat my-model -s "You are a terse assistant. Reply in two sentences."
```

Keep the model loaded after chatting [#keep-the-model-loaded-after-chatting]

```shell
lms chat my-model --ttl 600
```

Pipe input from another command [#pipe-input-from-another-command]

`lms chat` reads from stdin, so you can pipe content directly into a prompt:

```shell
cat my_file.txt | lms chat -p "Summarize this, please"
```
