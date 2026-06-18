# URL Action

A URL action opens the specified link in a new browser tab.

> ❗️ Encode non-ASCII characters
If your URL has non-ASCII characters that are not encoded, we will use the URL in a meta tag while opening the new window and it will break the non-ASCII encoding.
For JS - Use `encodeURIComponent`
For Ruby - Use `URI.escape`


```json
action: {
  type: "url",
  url:  "https://www.example.com"
}
```