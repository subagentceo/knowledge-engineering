---
title: Query a database
description: Query D1 using SQL statements through the Workers Binding API, REST API, or Wrangler commands.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Query a database

D1 is compatible with most SQLite's SQL convention since it leverages SQLite's query engine. You can use SQL commands to query D1.

There are a number of ways you can interact with a D1 database:

1. Using [D1 Workers Binding API](https://developers.cloudflare.com/d1/worker-api/) in your code.
2. Using [D1 REST API](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/create/).
3. Using [D1 Wrangler commands](https://developers.cloudflare.com/d1/wrangler-commands/).

## Use SQL to query D1

D1 understands SQLite semantics, which allows you to query a database using SQL statements via Workers BindingAPI or REST API (including Wrangler commands). Refer to [D1 SQL API](https://developers.cloudflare.com/d1/sql-api/sql-statements/) to learn more about supported SQL statements.

### Use foreign key relationships

When using SQL with D1, you may wish to define and enforce foreign key constraints across tables in a database. Foreign key constraints allow you to enforce relationships across tables, or prevent you from deleting rows that reference rows in other tables. An example of a foreign key relationship is shown below.

```

CREATE TABLE users (

    user_id INTEGER PRIMARY KEY,

    email_address TEXT,

    name TEXT,

    metadata TEXT

)


CREATE TABLE orders (

    order_id INTEGER PRIMARY KEY,

    status INTEGER,

    item_desc TEXT,

    shipped_date INTEGER,

    user_who_ordered INTEGER,

    FOREIGN KEY(user_who_ordered) REFERENCES users(user_id)

)


```

Refer to [Define foreign keys](https://developers.cloudflare.com/d1/sql-api/foreign-keys/) for more information.

### Query JSON

D1 allows you to query and parse JSON data stored within a database. For example, you can extract a value inside a JSON object.

Given the following JSON object (`type:blob`) in a column named `sensor_reading`, you can extract values from it directly.

```

{

    "measurement": {

        "temp_f": "77.4",

        "aqi": [21, 42, 58],

        "o3": [18, 500],

        "wind_mph": "13",

        "location": "US-NY"

    }

}


```

```

-- Extract the temperature value

SELECT json_extract(sensor_reading, '$.measurement.temp_f')-- returns "77.4" as TEXT


```

Refer to [Query JSON](https://developers.cloudflare.com/d1/sql-api/query-json/) to learn more about querying JSON objects.

## Query D1 with Workers Binding API

Workers Binding API primarily interacts with the data plane, and allows you to query your D1 database from your Worker.

This requires you to:

1. Bind your D1 database to your Worker.
2. Prepare a statement.
3. Run the statement.

index.js

```

export default {

    async fetch(request, env) {

        const {pathname} = new URL(request.url);

        const companyName1 = `Bs Beverages`;

        const companyName2 = `Around the Horn`;

        const stmt = env.DB.prepare(`SELECT * FROM Customers WHERE CompanyName = ?`);


        if (pathname === `/RUN`) {

            const returnValue = await stmt.bind(companyName1).run();

            return Response.json(returnValue);

        }


        return new Response(

            `Welcome to the D1 API Playground!

            \nChange the URL to test the various methods inside your index.js file.`,

        );

    },

};


```

Refer to [Workers Binding API](https://developers.cloudflare.com/d1/worker-api/) for more information.

## Query D1 with REST API

REST API primarily interacts with the control plane, and allows you to create/manage your D1 database.

Refer to [D1 REST API](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/create/) for D1 REST API documentation.

## Query D1 with Wrangler commands

You can use Wrangler commands to query a D1 database. Note that Wrangler commands use REST APIs to perform its operations.

Terminal window

```

npx wrangler d1 execute prod-d1-tutorial --command="SELECT * FROM Customers"


```

```

🌀 Mapping SQL input into an array of statements

🌀 Executing on local database production-db-backend (<DATABASE_ID>) from .wrangler/state/v3/d1:

┌────────────┬─────────────────────┬───────────────────┐

│ CustomerId │ CompanyName         │ ContactName       │

├────────────┼─────────────────────┼───────────────────┤

│ 1          │ Alfreds Futterkiste │ Maria Anders      │

├────────────┼─────────────────────┼───────────────────┤

│ 4          │ Around the Horn     │ Thomas Hardy      │

├────────────┼─────────────────────┼───────────────────┤

│ 11         │ Bs Beverages        │ Victoria Ashworth │

├────────────┼─────────────────────┼───────────────────┤

│ 13         │ Bs Beverages        │ Random Name       │

└────────────┴─────────────────────┴───────────────────┘


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/best-practices/query-d1/#page","headline":"Query a database · Cloudflare D1 docs","description":"Query D1 using SQL statements through the Workers Binding API, REST API, or Wrangler commands.","url":"https://developers.cloudflare.com/d1/best-practices/query-d1/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/best-practices/","name":"Best practices"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/best-practices/query-d1/","name":"Query a database"}}]}
```
