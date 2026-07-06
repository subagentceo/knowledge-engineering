

Use `lms login` to authenticate the CLI with LM Studio Hub.

Sign in with the browser [#sign-in-with-the-browser]

```shell
lms login
```

The CLI opens a browser window for authentication. If a browser cannot be opened automatically, copy the printed URL into your browser.

"CI style" login with pre-authenticated keys [#ci-style-login-with-pre-authenticated-keys]

```bash
lms login --with-pre-authenticated-keys \
  --key-id <KEY_ID> \
  --public-key <PUBLIC_KEY> \
  --private-key <PRIVATE_KEY>
```

Advanced Flags [#advanced-flags]

<DocsParamsTable data="-%20name%3A%20%22--with-pre-authenticated-keys%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Authenticate%20using%20pre-generated%20keys%20(CI%2FCD).%20Requires%20--key-id%2C%20--public-key%2C%20and%20--private-key.%22%0A-%20name%3A%20%22--key-id%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Key%20ID%20to%20use%20with%20--with-pre-authenticated-keys%22%0A-%20name%3A%20%22--public-key%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Public%20key%20to%20use%20with%20--with-pre-authenticated-keys%22%0A-%20name%3A%20%22--private-key%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Private%20key%20to%20use%20with%20--with-pre-authenticated-keys%22" />
