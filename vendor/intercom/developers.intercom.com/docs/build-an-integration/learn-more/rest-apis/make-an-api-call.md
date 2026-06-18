# Make an API call

You can use your [Access Token](/docs/build-an-integration/learn-more/authentication#access-tokens) to make your first call to our REST API. Here's a sample code snippet that you can run in your terminal to fetch a list of all the admins in your workspace:

```shell
# Copy the cURL request below into your Terminal.
# Replace **<INSERT_ACCESS_TOKEN_HERE>** with your Access Token.

$ curl https://api.intercom.io/admins \
-H 'Authorization:Bearer <INSERT_ACCESS_TOKEN_HERE>' \
-H 'Accept: application/json'
```

Alternatively, you can make the same API call directly from our API reference [documentation](https://developers.intercom.com/intercom-api-reference/reference/listadmins).