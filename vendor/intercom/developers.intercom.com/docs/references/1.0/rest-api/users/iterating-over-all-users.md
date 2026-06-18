# Scroll over all users

The [List Users](/docs/references/1.0/rest-api/users/list-users) functionality does not work well for huge datasets, and can result in errors and performance problems when paging deeply. The Scroll API provides an efficient mechanism for iterating over all users in a dataset.

- Each workspace can only have 1 scroll open at a time. You'll get an error message if you try to have more than one open per workspace.
- If the scroll isn't used for 1 minute, it expires and calls with that scroll param will fail
- If the end of the scroll is reached, "users" will be empty and the scroll parameter will expire


```curl
# Send a GET request to get the first page of users
$ curl \
'https://api.intercom.io/users/scroll' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
# To get the next page use the scroll param returned in the response
$ curl \
'https://api.intercom.io/users/scroll?scroll_param=562bc29f-ea55-4823-aaaf-f3faadceaa59' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
  "type": "user.list",
  "users": [
    {
      "type": "user",
      "id": "530370b477ad7120001d",
       ...
     },
     ...
   ],
  "scroll_param": "25b649f7-4d33-4ef6-88f5-60e5b8244309"
}
```

```ruby
# You can use the scroll method to list all your users
intercom.users.scroll.each { |user| puts user.name}
# Alternatively you can use the scroll.next method to get 100 users with each request
result = intercom.users.scroll.next
result.scroll_param
=> "0730e341-63ef-44da-ab9c-9113f886326d"
result = intercom.users.scroll.next("0730e341-63ef-44da-ab9c-9113f886326d");
```

Scroll Parameter
You can get the first page of users by simply sending a GET request to the scroll endpoint. For subsequent requests you will need to use the scroll parameter from the response.

> ❗️ Scroll network timeouts
Since scroll is often used on large datasets network errors such as timeouts can be encountered. When this occurs you will need to restart your scroll query as it is not possible to continue from a specific point when using scroll.
When this occurs you will see a HTTP 500 error with the following message:
"Request failed due to an internal network error. Please restart the scroll operation."