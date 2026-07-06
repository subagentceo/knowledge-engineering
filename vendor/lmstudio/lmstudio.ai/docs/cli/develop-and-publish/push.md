

Run `lms push` from inside a [plugin](/docs/typescript/plugins), [preset](/docs/app/presets), or [`model.yaml`](/docs/app/modelyaml) project to publish a new revision. If a `model.yaml` exists, the CLI will generate a `manifest.json` for you before pushing.

For plugins, the CLI will ask for confirmation unless you pass `-y`.

Publish the current folder [#publish-the-current-folder]

```shell
lms push
```

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22--description%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Override%20the%20artifact%20description%20for%20this%20push%22%0A-%20name%3A%20%22--overrides%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22JSON%20string%20to%20override%20manifest%20fields%20(parsed%20with%20JSON.parse)%22%0A-%20name%3A%20%22-y%2C%20--yes%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Suppress%20confirmations%20and%20warnings%22%0A-%20name%3A%20%22--private%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Mark%20the%20artifact%20as%20private%20when%20first%20published%22%0A-%20name%3A%20%22--write-revision%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Write%20the%20returned%20revision%20number%20to%20manifest.json%22" />

Advanced [#advanced]

Publish quietly and keep the revision in manifest.json [#publish-quietly-and-keep-the-revision-in-manifestjson]

```shell
lms push -y --write-revision
```

Override metadata for this upload [#override-metadata-for-this-upload]

```shell
lms push --description "New beta build" --overrides '{"tags": ["beta"]}'
```
