

Use `lms import` to bring an existing model file into LM Studio without downloading it.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22%3Cfile-path%3E%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20false%0A%20%20description%3A%20%22Path%20to%20the%20model%20file%20to%20import%22%0A-%20name%3A%20%22--user-repo%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Set%20the%20target%20folder%20as%20%3Cuser%3E%2F%3Crepo%3E.%20Skips%20the%20categorization%20prompts.%22%0A-%20name%3A%20%22-y%2C%20--yes%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Skip%20confirmations%20and%20try%20to%20infer%20the%20model%20location%20from%20the%20file%20name%22%0A-%20name%3A%20%22-c%2C%20--copy%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Copy%20the%20file%20instead%20of%20moving%20it%22%0A-%20name%3A%20%22-L%2C%20--hard-link%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Create%20a%20hard%20link%20instead%20of%20moving%20or%20copying%20the%20file%22%0A-%20name%3A%20%22-l%2C%20--symbolic-link%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Create%20a%20symbolic%20link%20instead%20of%20moving%20or%20copying%20the%20file%22%0A-%20name%3A%20%22--dry-run%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Do%20not%20perform%20the%20import%2C%20just%20show%20what%20would%20be%20done%22" />

Only one of `--copy`, `--hard-link`, or `--symbolic-link` can be used at a time. If none is provided, `lms import` moves the file by default.

Import a model file [#import-a-model-file]

```shell
lms import ~/Downloads/model.gguf
```

Keep the original file [#keep-the-original-file]

```shell
lms import ~/Downloads/model.gguf --copy
```

Pick the target folder yourself [#pick-the-target-folder-yourself]

Use `--user-repo` to skip prompts and place the model in the chosen namespace:

```shell
lms import ~/Downloads/model.gguf --user-repo my-user/custom-models
```

Dry run before importing [#dry-run-before-importing]

```shell
lms import ~/Downloads/model.gguf --dry-run
```
