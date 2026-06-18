# Companies and Users

## Associate a Company with a User

```curl
$ curl https://api.intercom.io/users \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d '
{
  "id": "531ee472cce572a6ec000005",
  "companies": [
    {
    "company_id" : "366",
    "name" : "Serenity"
    }
  ]
}
```

```ruby
intercom.users.create(user_id: 111, companies: [{company_id: 10}])
```

```php
<?php
$intercom->users->create([
    "user_id" => "111",
    "companies" => [
        [
            "company_id" => "10"
        ]
    ]
]);
?>
```

```java
User user = User.find("541a144b201ebf2ec5000001");
user.addCompany(company);
User.update(user);
```

## Remove a User from a Company

```curl
$ curl https://api.intercom.io/users \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d '
{
  "id": "531ee472cce572a6ec000005",
  "companies": [
    {
      "company_id" : "3",
     "remove" : true
    }
  ]
}
```

```ruby
user.companies = [{ :company_id => "1234", :remove => true}]
```

```php
<?php
$intercom->users->create([
    "email" => "plato@phil.com",
    "companies" => [
        [
            "company_id" => "9",
            "remove" => true
        ]
    ]
]);
?>
```

Companies field is an Array
Note that when associating a company with a user, the `companies` field used is an array, not an object (as is the case when the user is being fetched)

Create or Update Companies?
Users may be created or updated with a [company object](#company-model). If the company object does not already exist, it will be created for you. This saves having to create a company or check it exists before creating or updating a user.

To remove a company from a user add the field `remove` with a value of `true` to the embedded company object and submit the user as a update request. You must also submit the `id` of the company.

Note: the "id" to be used for the "companies" object is the company\_id.