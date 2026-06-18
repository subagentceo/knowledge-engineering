# Scroll over all companies

The [list all companies](/docs/references/2.1/rest-api/companies/list-companies) functionality does not work well for huge datasets, and can result in errors and performance problems when paging deeply. The Scroll API provides an efficient mechanism for iterating over all companies in a dataset.

- Each app can only have 1 scroll open at a time. You'll get an error message if you try to have more than one open per app.
- If the scroll isn't used for 1 minute, it expires and calls with that scroll param will fail
- If the end of the scroll is reached, "companies" will be empty and the scroll parameter will expire


```curl
# Send a GET request to get the first page of companies
$ curl \
'https://api.intercom.io/companies/scroll' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
# To get the next page use the scroll param returned in the response
$ curl \
'https://api.intercom.io/companies/scroll?scroll_param=562bc29f-ea55-4823-aaaf-f3faadceaa59' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
  "type": "company.list",
  "companies": [
    {
      "type": "company",
      "id": "530370b477ad7120001d",
       ...
     },
     ...
   ],
  "scroll_param": "25b649f7-4d33-4ef6-88f5-60e5b8244309"
}
```

```ruby
# You can use the scroll method to list all your companies
intercom.companies.scroll.each { |company| puts company.name}
# Alternatively you can use the scroll.next method to get 100 companies with each request
result = intercom.companies.scroll.next
result.scroll_param
=> "0730e341-63ef-44da-ab9c-9113f886326d"
result = intercom.companies.scroll.next("0730e341-63ef-44da-ab9c-9113f886326d");
```

Scroll Parameter
You can get the first page of companies by simply sending a GET request to the scroll endpoint. For subsequent requests you will need to use the scroll parameter from the response.

> ❗️ Scroll network timeouts
Since scroll is often used on large datasets network errors such as timeouts can be encountered. When this occurs you will need to restart your scroll query as it is not possible to continue from a specific point when using scroll.
When this occurs you will see a HTTP 500 error with the following message:
"Request failed due to an internal network error. Please restart the scroll operation."