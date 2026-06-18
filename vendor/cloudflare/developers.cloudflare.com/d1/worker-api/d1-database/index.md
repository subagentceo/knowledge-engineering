---
title: D1 Database
description: Use the D1Database binding to prepare statements, execute queries, batch operations, and dump a D1 database from a Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# D1 Database

To interact with your D1 database from your Worker, you need to access it through the environment bindings provided to the Worker (`env`).

* [  JavaScript ](#tab-panel-7945)
* [  Python ](#tab-panel-7946)

JavaScript

```

async fetch(request, env) {

  // D1 database is 'env.DB', where "DB" is the binding name from the Wrangler configuration file.

}


```

Python

```

from workers import WorkerEntrypoint


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # D1 database is 'self.env.DB', where "DB" is the binding name from the Wrangler configuration file.

        pass


```

A D1 binding has the type `D1Database`, and supports a number of methods, as listed below.

## Methods

### `prepare()`

Prepares a query statement to be later executed.

* [  JavaScript ](#tab-panel-7947)
* [  Python ](#tab-panel-7948)

JavaScript

```

const someVariable = `Bs Beverages`;

const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);


```

Python

```

some_variable = "Bs Beverages"

stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(some_variable)


```

#### Parameters

* `query`: ` String ` Required  
   * The SQL query you wish to execute on the database.

#### Return values

* `D1PreparedStatement`: ` Object `  
   * An object which only contains methods. Refer to [Prepared statement methods](https://developers.cloudflare.com/d1/worker-api/prepared-statements/).

#### Guidance

You can use the `bind` method to dynamically bind a value into the query statement, as shown below.

* Example of a static statement without using `bind`:  
   * [  JavaScript ](#tab-panel-7949)  
   * [  Python ](#tab-panel-7950)  
JavaScript  
```  
const stmt = db  
  .prepare("SELECT * FROM Customers WHERE CompanyName = 'Alfreds Futterkiste' AND CustomerId = 1")  
```  
Python  
```  
stmt = db.prepare("SELECT * FROM Customers WHERE CompanyName = 'Alfreds Futterkiste' AND CustomerId = 1")  
```
* Example of an ordered statement using `bind`:  
   * [  JavaScript ](#tab-panel-7951)  
   * [  Python ](#tab-panel-7952)  
JavaScript  
```  
const stmt = db  
  .prepare("SELECT * FROM Customers WHERE CompanyName = ? AND CustomerId = ?")  
  .bind("Alfreds Futterkiste", 1);  
```  
Python  
```  
stmt = db.prepare("SELECT * FROM Customers WHERE CompanyName = ? AND CustomerId = ?").bind("Alfreds Futterkiste", 1)  
```

Refer to the [bind method documentation](https://developers.cloudflare.com/d1/worker-api/prepared-statements/#bind) for more information.

### `batch()`

Sends multiple SQL statements inside a single call to the database. This can have a huge performance impact as it reduces latency from network round trips to D1\. D1 operates in auto-commit. Our implementation guarantees that each statement in the list will execute and commit, sequentially, non-concurrently.

Batched statements are [SQL transactions ↗](https://www.sqlite.org/lang%5Ftransaction.html). If a statement in the sequence fails, then an error is returned for that specific statement, and it aborts or rolls back the entire sequence.

To send batch statements, provide `D1Database::batch` a list of prepared statements and get the results in the same order.

* [  JavaScript ](#tab-panel-7953)
* [  Python ](#tab-panel-7954)

JavaScript

```

const companyName1 = `Bs Beverages`;

const companyName2 = `Around the Horn`;

const stmt = env.DB.prepare(`SELECT * FROM Customers WHERE CompanyName = ?`);

const batchResult = await env.DB.batch([

  stmt.bind(companyName1),

  stmt.bind(companyName2)

]);


```

Python

```

from pyodide.ffi import to_js


company_name1 = "Bs Beverages"

company_name2 = "Around the Horn"

stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?")

batch_result = await self.env.DB.batch(to_js([

    stmt.bind(company_name1),

    stmt.bind(company_name2)

]))


```

#### Parameters

* `statements`: ` Array `  
   * An array of [D1PreparedStatement](#prepare)s.

#### Return values

* `results`: ` Array `  
   * An array of `D1Result` objects containing the results of the [D1Database::prepare](#prepare) statements. Each object is in the array position corresponding to the array position of the initial [D1Database::prepare](#prepare) statement within the `statements`.  
   * Refer to [D1Result](https://developers.cloudflare.com/d1/worker-api/return-object/#d1result) for more information about this object.

Example of return values

* [  JavaScript ](#tab-panel-7955)
* [  Python ](#tab-panel-7956)

JavaScript

```

const companyName1 = `Bs Beverages`;

const companyName2 = `Around the Horn`;

const stmt = await env.DB.batch([

  env.DB.prepare(`SELECT * FROM Customers WHERE CompanyName = ?`).bind(companyName1),

  env.DB.prepare(`SELECT * FROM Customers WHERE CompanyName = ?`).bind(companyName2)

]);

return Response.json(stmt)


```

Python

```

from pyodide.ffi import to_js

from workers import Response


company_name1 = "Bs Beverages"

company_name2 = "Around the Horn"

stmt = await self.env.DB.batch(to_js([

    self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(company_name1),

    self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(company_name2)

]))

return Response.json(stmt)


```

```

[

  {

    "success": true,

    "meta": {

      "served_by": "miniflare.db",

      "duration": 0,

      "changes": 0,

      "last_row_id": 0,

      "changed_db": false,

      "size_after": 8192,

      "rows_read": 4,

      "rows_written": 0

    },

    "results": [

      {

        "CustomerId": 11,

        "CompanyName": "Bs Beverages",

        "ContactName": "Victoria Ashworth"

      },

      {

        "CustomerId": 13,

        "CompanyName": "Bs Beverages",

        "ContactName": "Random Name"

      }

    ]

  },

  {

    "success": true,

    "meta": {

      "served_by": "miniflare.db",

      "duration": 0,

      "changes": 0,

      "last_row_id": 0,

      "changed_db": false,

      "size_after": 8192,

      "rows_read": 4,

      "rows_written": 0

    },

    "results": [

      {

        "CustomerId": 4,

        "CompanyName": "Around the Horn",

        "ContactName": "Thomas Hardy"

      }

    ]

  }

]


```

* [  JavaScript ](#tab-panel-7957)
* [  Python ](#tab-panel-7958)

JavaScript

```

console.log(stmt[1].results);


```

Python

```

print(stmt[1].results.to_py())


```

```

[

  {

    "CustomerId": 4,

    "CompanyName": "Around the Horn",

    "ContactName": "Thomas Hardy"

  }

]


```

#### Guidance

* You can construct batches reusing the same prepared statement:  
   * [  JavaScript ](#tab-panel-7959)  
   * [  Python ](#tab-panel-7960)  
JavaScript  
```  
const companyName1 = `Bs Beverages`;  
const companyName2 = `Around the Horn`;  
const stmt = env.DB.prepare(`SELECT * FROM Customers WHERE CompanyName = ?`);  
const batchResult = await env.DB.batch([  
  stmt.bind(companyName1),  
  stmt.bind(companyName2)  
]);  
return Response.json(batchResult);  
```  
Python  
```  
from pyodide.ffi import to_js  
from workers import Response  
company_name1 = "Bs Beverages"  
company_name2 = "Around the Horn"  
stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?")  
batch_result = await self.env.DB.batch(to_js([  
    stmt.bind(company_name1),  
    stmt.bind(company_name2)  
]))  
return Response.json(batch_result)  
```

### `exec()`

Executes one or more queries directly without prepared statements or parameter bindings.

* [  JavaScript ](#tab-panel-7961)
* [  Python ](#tab-panel-7962)

JavaScript

```

const returnValue = await env.DB.exec(`SELECT * FROM Customers WHERE CompanyName = "Bs Beverages"`);


```

Python

```

return_value = await self.env.DB.exec('SELECT * FROM Customers WHERE CompanyName = "Bs Beverages"')


```

#### Parameters

* `query`: ` String ` Required  
   * The SQL query statement without parameter binding.

#### Return values

* `D1ExecResult`: ` Object `  
   * The `count` property contains the number of executed queries.  
   * The `duration` property contains the duration of operation in milliseconds.  
         * Refer to [D1ExecResult](https://developers.cloudflare.com/d1/worker-api/return-object/#d1execresult) for more information.

Example of return values

* [  JavaScript ](#tab-panel-7963)
* [  Python ](#tab-panel-7964)

JavaScript

```

const returnValue = await env.DB.exec(`SELECT * FROM Customers WHERE CompanyName = "Bs Beverages"`);

return Response.json(returnValue);


```

Python

```

from workers import Response


return_value = await self.env.DB.exec('SELECT * FROM Customers WHERE CompanyName = "Bs Beverages"')

return Response.json(return_value)


```

```

{

  "count": 1,

  "duration": 1

}


```

#### Guidance

* If an error occurs, an exception is thrown with the query and error messages, execution stops and further statements are not executed. Refer to [Errors](https://developers.cloudflare.com/d1/observability/debug-d1/#error-list) to learn more.
* This method can have poorer performance (prepared statements can be reused in some cases) and, more importantly, is less safe.
* Only use this method for maintenance and one-shot tasks (for example, migration jobs).
* The input can be one or multiple queries separated by `\n`.

### `dump`

Warning

This API only works on databases created during D1's alpha period. Check which version your database uses with `wrangler d1 info <DATABASE_NAME>`.

Dumps the entire D1 database to an SQLite compatible file inside an ArrayBuffer.

* [  JavaScript ](#tab-panel-7965)
* [  Python ](#tab-panel-7966)

JavaScript

```

const dump = await db.dump();

return new Response(dump, {

  status: 200,

  headers: {

    "Content-Type": "application/octet-stream",

  },

});


```

Python

```

from workers import Response


dump = await db.dump()

return Response(dump, status=200, headers={"Content-Type": "application/octet-stream"})


```

#### Parameters

* None.

#### Return values

* None.

### `withSession()`

Starts a D1 session which maintains sequential consistency among queries executed on the returned `D1DatabaseSession` object.

* [  JavaScript ](#tab-panel-7967)
* [  Python ](#tab-panel-7968)

JavaScript

```

const session = env.DB.withSession("<parameter>");


```

Python

```

session = self.env.DB.withSession("<parameter>")


```

#### Parameters

* `first-primary`: ` String `Optional  
   * Directs the first query in the Session (whether read or write) to the primary database instance. Use this option if you need to start the Session with the most up-to-date data from the primary database instance.  
   * Subsequent queries in the Session may use read replicas.  
   * Subsequent queries in the Session have sequential consistency.
* `first-unconstrained`: ` String `Optional  
   * Directs the first query in the Session (whether read or write) to any database instance. Use this option if you do not need to start the Session with the most up-to-date data, and wish to prioritize minimizing query latency from the very start of the Session.  
   * Subsequent queries in the Session have sequential consistency.  
   * This is the default behavior when no parameter is provided.
* `bookmark`: ` String `Optional  
   * A [bookmark](https://developers.cloudflare.com/d1/reference/time-travel/#bookmarks) from a previous D1 Session. This allows you to start a new Session from at least the provided `bookmark`.  
   * Subsequent queries in the Session have sequential consistency.

#### Return values

* `D1DatabaseSession`: ` Object `  
   * An object which contains the methods [prepare()](https://developers.cloudflare.com/d1/worker-api/d1-database#prepare) and [batch()](https://developers.cloudflare.com/d1/worker-api/d1-database#batch) similar to `D1Database`, along with the additional [getBookmark](https://developers.cloudflare.com/d1/worker-api/d1-database#getbookmark) method.

#### Guidance

* To use read replication, you have to use the D1 Sessions API, otherwise all queries will continue to be executed only by the primary database.
* You can return the last encountered `bookmark` for a given Session using [session.getBookmark()](https://developers.cloudflare.com/d1/worker-api/d1-database/#getbookmark).

## `D1DatabaseSession` methods

### `getBookmark`

Retrieves the latest `bookmark` from the D1 Session.

* [  JavaScript ](#tab-panel-7969)
* [  Python ](#tab-panel-7970)

JavaScript

```

const session = env.DB.withSession("first-primary");

const result = await session

  .prepare(`SELECT * FROM Customers WHERE CompanyName = 'Bs Beverages'`)

  .run()

const { bookmark } = session.getBookmark();

  return bookmark;


```

Python

```

session = self.env.DB.withSession("first-primary")

result = await session.prepare(

    "SELECT * FROM Customers WHERE CompanyName = 'Bs Beverages'"

).run()


bookmark = session.getBookmark()


```

#### Parameters

* None

#### Return values

* `bookmark`: ` String | null `  
   * A [bookmark](https://developers.cloudflare.com/d1/reference/time-travel/#bookmarks) which identifies the latest version of the database seen by the last query executed within the Session.  
   * Returns `null` if no query is executed within a Session.

### `prepare()`

This method is equivalent to [D1Database::prepare](https://developers.cloudflare.com/d1/worker-api/d1-database/#prepare).

### `batch()`

This method is equivalent to [D1Database::batch](https://developers.cloudflare.com/d1/worker-api/d1-database/#batch).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/worker-api/d1-database/#page","headline":"D1 Database · Cloudflare D1 docs","description":"Use the D1Database binding to prepare statements, execute queries, batch operations, and dump a D1 database from a Worker.","url":"https://developers.cloudflare.com/d1/worker-api/d1-database/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/worker-api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/worker-api/d1-database/","name":"D1 Database"}}]}
```
