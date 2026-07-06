

Use `lms clone` to copy an artifact from LM Studio Hub onto your machine.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22%3Cartifact%3E%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20false%0A%20%20description%3A%20%22Artifact%20identifier%20in%20the%20form%20owner%2Fname%22%0A-%20name%3A%20%22%5Bpath%5D%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Destination%20folder.%20Defaults%20to%20a%20new%20folder%20named%20after%20the%20artifact.%22" />

If no path is provided, `lms clone owner/name` creates a folder called `name` in the current directory. The command exits if the target path already exists.

Clone the latest revision [#clone-the-latest-revision]

```shell
lms clone alice/sample-plugin
```

Clone into a specific directory [#clone-into-a-specific-directory]

```shell
lms clone alice/sample-plugin ./my-folder
```
