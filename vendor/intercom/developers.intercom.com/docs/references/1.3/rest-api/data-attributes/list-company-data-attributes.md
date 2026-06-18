# List Company Data Attributes

**List of your company data attributes**

```curl
$ curl https://api.intercom.io/data_attributes/company \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
{
    "type": "data_attribute.list",
    "data_attributes": [
        {
            "type": "data_attribute",
            "name": "name",
            "full_name": "name",
            "label": "Company name",
            "description": "The name of a company",
            "data_type": "string",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": true,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "company_id",
            "full_name": "company_id",
            "label": "Company ID",
            "description": "A number identifying a company",
            "data_type": "string",
            "api_writable": false,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "last_request_at",
            "full_name": "last_request_at",
            "label": "Company last seen",
            "description": "The last day anyone from a company visited your site or app",
            "data_type": "date",
            "api_writable": false,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "remote_created_at",
            "full_name": "remote_created_at",
            "label": "Company created at",
            "description": "The day a company was added to Intercom",
            "data_type": "date",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "user_count",
            "full_name": "user_count",
            "label": "People",
            "description": "The number of people in a company",
            "data_type": "integer",
            "api_writable": false,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "session_count",
            "full_name": "session_count",
            "label": "Company web sessions",
            "description": "All visits from anyone in a company to your product's site or app",
            "data_type": "integer",
            "api_writable": false,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "website",
            "full_name": "website",
            "label": "Company website",
            "description": "The web address for the company's primary marketing site",
            "data_type": "string",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": true,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "subdomain",
            "full_name": "custom_attributes.subdomain",
            "label": "subdomain",
            "data_type": "string",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": true,
            "archived": false,
            "created_at": 1500395363,
            "updated_at": 1500395363
        },
        {
            "type": "data_attribute",
            "name": "paid_subscriber",
            "full_name": "custom_attributes.paid_subscriber",
            "label": "paid_subscriber",
            "data_type": "boolean",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": true,
            "archived": false,
            "created_at": 1511192754,
            "updated_at": 1511192754
        },
        {
            "type": "data_attribute",
            "name": "team_mates",
            "full_name": "custom_attributes.team_mates",
            "label": "team_mates",
            "data_type": "integer",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": true,
            "archived": false,
            "created_at": 1511192755,
            "updated_at": 1511192755
        }
    ]
}
```

### List Company attributes

You can fetch a list of all the company data attributes for your app by using `https://api.intercom.io/data_attributes/company`.

### Returns

List of data attributes

By default a list of all unarchived data attributes is returned. You can include the following parameter to retrieve all the company data attributes for your app (i.e. including archived attributes)

| Parameter | Type | Description |
|  --- | --- | --- |
| include_archived | boolean | Include archived attributes in the list.  By default we return only non archived data attributes |


## List of your company data attributes including archived

```curl
$ curl https://api.intercom.io/data_attributes/company?include_archived=true \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
{
    "type": "data_attribute.list",
    "data_attributes": [
        {
            "type": "data_attribute",
            "name": "name",
            "full_name": "name",
            "label": "Company name",
            "description": "The name of a company",
            "data_type": "string",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": true,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "company_id",
            "full_name": "company_id",
            "label": "Company ID",
            "description": "A number identifying a company",
            "data_type": "string",
            "api_writable": false,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "last_request_at",
            "full_name": "last_request_at",
            "label": "Company last seen",
            "description": "The last day anyone from a company visited your site or app",
            "data_type": "date",
            "api_writable": false,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "remote_created_at",
            "full_name": "remote_created_at",
            "label": "Company created at",
            "description": "The day a company was added to Intercom",
            "data_type": "date",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "user_count",
            "full_name": "user_count",
            "label": "People",
            "description": "The number of people in a company",
            "data_type": "integer",
            "api_writable": false,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "session_count",
            "full_name": "session_count",
            "label": "Company web sessions",
            "description": "All visits from anyone in a company to your product's site or app",
            "data_type": "integer",
            "api_writable": false,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "name",
            "full_name": "plan.name",
            "label": "Plan",
            "description": "A specific plan or level within your product that companies have signed up to",
            "data_type": "string",
            "api_writable": false,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "monthly_spend",
            "full_name": "monthly_spend",
            "label": "Monthly Spend",
            "description": "The monthly revenue you receive from a company",
            "data_type": "float",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "size",
            "full_name": "size",
            "label": "Company size",
            "description": "The number of people employed in this company, expressed as a single number",
            "data_type": "integer",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": true,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "industry",
            "full_name": "industry",
            "label": "Company industry",
            "description": "The category or domain this company belongs to e.g. 'ecommerce' or 'SaaS'",
            "data_type": "string",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": true,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "website",
            "full_name": "website",
            "label": "Company website",
            "description": "The web address for the company's primary marketing site",
            "data_type": "string",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": true,
            "custom": false,
            "archived": false
        },
        {
            "type": "data_attribute",
            "name": "subdomain",
            "full_name": "custom_attributes.subdomain",
            "label": "subdomain",
            "data_type": "string",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": true,
            "archived": false,
            "created_at": 1500395363,
            "updated_at": 1500395363
        },
        {
            "type": "data_attribute",
            "name": "paid_subscriber",
            "full_name": "custom_attributes.paid_subscriber",
            "label": "paid_subscriber",
            "data_type": "boolean",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": true,
            "archived": false,
            "created_at": 1511192754,
            "updated_at": 1511192754
        },
        {
            "type": "data_attribute",
            "name": "team_mates",
            "full_name": "custom_attributes.team_mates",
            "label": "team_mates",
            "data_type": "integer",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": true,
            "archived": false,
            "created_at": 1511192755,
            "updated_at": 1511192755
        },
        {
            "type": "data_attribute",
            "name": "monthly_spend",
            "full_name": "custom_attributes.monthly_spend",
            "label": "monthly_spend",
            "data_type": "integer",
            "api_writable": true,
            "messenger_writable": false,
            "ui_writable": false,
            "custom": true,
            "archived": true,
            "created_at": 1511192755,
            "updated_at": 1511192755
        }
    ]
}
```