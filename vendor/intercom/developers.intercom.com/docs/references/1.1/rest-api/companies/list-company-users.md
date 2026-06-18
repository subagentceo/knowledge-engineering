# List Company Users

## Example ID Request

```curl
$ curl https://api.intercom.io/companies/5310dabd598c9a0a7e000005/users \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```ruby
intercom.companies.users(company.id)
```

```java
Map<String, String> params params = Maps.newHashMap();
params.put("company_id", "6");
UserCollection users = Company.listUsers(params);
```

## Example Company ID Request

```curl
$ curl https://api.intercom.io/companies?company_id=22&type=user \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
  "type": "user.list",
  "total_count": 10,
  "users": [
    {
      "type": "user",
      "id": "530370b477ad7120001d",
       ...
     },
     ...
   ]
}

# NB: Full User objects are returned
```

```ruby
intercom.companies.users(company.company_id)
```

```java
Map<String, String> params = Maps.newHashMap();
params.put("company_id", "1");
Company company = Company.find(map);
```

The users belonging to a company can be listed by sending a `GET` request to `https://api.intercom.io/companies/{id}/users`, where `{id}` is the value of the company's `id` field.

To query for a company's users using the company id value you have assigned to the company, send a `GET` request to `https://api.intercom.io/companies`, using the parameter `{company_id}` with value of the company id, and a `type` field with a value of `users`.

### Request Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| company_id | yes | Your company id for the company. |
| type | yes | The value must be `user` |


### Returns

A pageable list of **users** and **leads**. Response objects contain `type` set to `user` and `contact` respectively. See the section ["List Users"](#list-users) and ["List Leads"](#list-leads) for details of the JSON response.