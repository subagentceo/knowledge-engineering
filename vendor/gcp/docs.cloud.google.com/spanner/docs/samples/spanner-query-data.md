# Query data

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

Skip to main content

 ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

Technology areas

close

*   AI and ML
    
*   Application development
    
*   Application hosting
    
*   Compute
    
*   Data analytics and pipelines
    
*   Databases
    
*   Distributed, hybrid, and multicloud
    
*   Industry solutions
    
*   Migration
    
*   Networking
    
*   Observability and monitoring
    
*   Security
    
*   Storage
    

Cross-product tools

close

*   Access and resources management
    
*   Costs and usage management
    
*   Infrastructure as code
    
*   SDK, languages, frameworks, and tools
    

/

Console

*   English
*   Deutsch
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   עברית
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어

Sign in

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/spanner-color.svg)

*   Spanner

Start free

Overview Guides Reference Samples Support Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   Reference
    *   Samples
    *   Support
    *   Resources
*   Cross-product tools
    *   More
*   Console

*   Code samples for all products
*   Spanner
    
*   All Spanner code samples
*   Add column
*   Add NUMERIC column
*   Add TIMESTAMP column
*   Batch DML
*   Bulk delete with partitioned DML
*   Bulk update with partitioned DML
*   Cancel backup create operation
*   Create backup
*   Create client with query options
*   Create clients
*   Create database
*   Create database with a property graph
*   Create index
*   Create instance
*   Create storing index
*   Create STRUCT object array with data
*   Create STRUCT object with data
*   Create table with data types
*   Create table with TIMESTAMP column
*   Create user-defined STRUCT
*   Dataflow read
*   Dataflow read all
*   Dataflow read api
*   Dataflow read with transaction
*   Dataflow write group
*   Dataflow write with mutations
*   Delete backup
*   Delete data
*   Delete data in a graph
*   Delete graph data with DML
*   DML delete data
*   DML update commit timestamp
*   DML update data
*   DML update data with STRUCT
*   DML write data
*   DML write single row
*   DML write then read
*   Field access on a STRUCT
*   Field access on nested STRUCT
*   Functions
*   Hibernate generated IDs
*   Hibernate inheritance
*   Hibernate table name
*   Insert graph data
*   Insert graph data with DML
*   JDBC batch transaction
*   JDBC connection with query options
*   JDBC create table
*   JDBC insert
*   JDBC query
*   JDBC set statement for query options
*   List backup operations
*   List backups
*   List database operations
*   Mutations update data
*   Mutations update data with NUMERIC
*   Mutations update data with TIMESTAMP
*   Mutations write data
*   Mutations write data for STRUCT queries
*   Mutations write data types data
*   Mutations write data with TIMESTAMP column
*   Query data
*   Query data from a new column
*   Query data in a graph
*   Query data in a graph with a parameter
*   Query data with array of STRUCT
*   Query data with commit timestamp
*   Query data with index
*   Query data with parameter
*   Query data with STRUCT
*   Query with ARRAY parameter
*   Query with BOOL parameter
*   Query with BYTES parameter
*   Query with DATE parameter
*   Query with FLOAT parameter
*   Query with INT parameter
*   Query with NUMERIC parameter
*   Query with query options
*   Query with STRING parameter
*   Query with TIMESTAMP parameter
*   Quickstart
*   Read data
*   Read data in parallel
*   Read data with index
*   Read stale data
*   Read-only transaction
*   Read/write transaction
*   Restore database from backup
*   Set custom timeout and retry
*   Update backup
*   Update graph data with a graph query
*   Update graph data with DML

*   AI and ML
*   Application development
*   Application hosting
*   Compute
*   Data analytics and pipelines
*   Databases
*   Distributed, hybrid, and multicloud
*   Industry solutions
*   Migration
*   Networking
*   Observability and monitoring
*   Security
*   Storage

*   Access and resources management
*   Costs and usage management
*   Infrastructure as code
*   SDK, languages, frameworks, and tools

*   Home
*   Documentation
*   Databases
*   Spanner
*   Samples

# Query data Stay organized with collections Save and categorize content based on your preferences.

Query data.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Getting started with Spanner and PGAdapter
*   Getting started with Spanner in C#
*   Getting started with Spanner in C++
*   Getting started with Spanner in Go
*   Getting started with Spanner in Go database/sql
*   Getting started with Spanner in Java
*   Getting started with Spanner in JDBC
*   Getting started with Spanner in Node.js
*   Getting started with Spanner in PHP
*   Getting started with Spanner in Python
*   Getting started with Spanner in Ruby
*   Reads outside of transactions

## Code sample

### C++

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
void QueryData(google::cloud::spanner::Client client) {
  namespace spanner = ::google::cloud::spanner;

  spanner::SqlStatement select("SELECT SingerId, LastName FROM Singers");
  using RowType = std::tuple<std::int64_t, std::string>;
  auto rows = client.ExecuteQuery(std::move(select));
  for (auto& row : spanner::StreamOf<RowType>(rows)) {
    if (!row) throw std::move(row).status();
    std::cout << "SingerId: " << std::get<0>(*row) << "\t";
    std::cout << "LastName: " << std::get<1>(*row) << "\n";
  }

  std::cout << "Query completed for [spanner_query_data]\n";
}
```

### C#

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```

using Google.Cloud.Spanner.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

public class QuerySampleDataAsyncSample
{
    public class Album
    {
        public int SingerId { get; set; }
        public int AlbumId { get; set; }
        public string AlbumTitle { get; set; }
    }

    public async Task<List<Album>> QuerySampleDataAsync(string projectId, string instanceId, string databaseId)
    {
        string connectionString = $"Data Source=projects/{projectId}/instances/{instanceId}/databases/{databaseId}";

        var albums = new List<Album>();
        using var connection = new SpannerConnection(connectionString);
        using var cmd = connection.CreateSelectCommand("SELECT SingerId, AlbumId, AlbumTitle FROM Albums");

        using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            albums.Add(new Album
            {
                AlbumId = reader.GetFieldValue<int>("AlbumId"),
                SingerId = reader.GetFieldValue<int>("SingerId"),
                AlbumTitle = reader.GetFieldValue<string>("AlbumTitle")
            });
        }
        return albums;
    }
}
```

### Go

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```

import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/spanner"
	"google.golang.org/api/iterator"
)

func query(w io.Writer, db string) error {
	ctx := context.Background()
	client, err := spanner.NewClient(ctx, db)
	if err != nil {
		return err
	}
	defer client.Close()

	stmt := spanner.Statement{SQL: `SELECT SingerId, AlbumId, AlbumTitle FROM Albums`}
	iter := client.Single().Query(ctx, stmt)
	defer iter.Stop()
	for {
		row, err := iter.Next()
		if err == iterator.Done {
			return nil
		}
		if err != nil {
			return err
		}
		var singerID, albumID int64
		var albumTitle string
		if err := row.Columns(&singerID, &albumID, &albumTitle); err != nil {
			return err
		}
		fmt.Fprintf(w, "%d %d %s\n", singerID, albumID, albumTitle)
	}
}
```

### Java

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
static void query(DatabaseClient dbClient) {
  try (ResultSet resultSet =
      dbClient
          .singleUse() // Execute a single read or query against Cloud Spanner.
          .executeQuery(Statement.of("SELECT SingerId, AlbumId, AlbumTitle FROM Albums"))) {
    while (resultSet.next()) {
      System.out.printf(
          "%d %d %s\n", resultSet.getLong(0), resultSet.getLong(1), resultSet.getString(2));
    }
  }
}
```

### Node.js

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
// Imports the Google Cloud client library
const {Spanner} = require('@google-cloud/spanner');

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const projectId = 'my-project-id';
// const instanceId = 'my-instance';
// const databaseId = 'my-database';

// Creates a client
const spanner = new Spanner({
  projectId: projectId,
});

// Gets a reference to a Cloud Spanner instance and database
const instance = spanner.instance(instanceId);
const database = instance.database(databaseId);

const query = {
  sql: 'SELECT SingerId, AlbumId, AlbumTitle FROM Albums',
};

// Queries rows from the Albums table
try {
  const [rows] = await database.run(query);

  rows.forEach(row => {
    const json = row.toJSON();
    console.log(
      `SingerId: ${json.SingerId}, AlbumId: ${json.AlbumId}, AlbumTitle: ${json.AlbumTitle}`,
    );
  });
} catch (err) {
  console.error('ERROR:', err);
} finally {
  // Close the database when finished.
  await database.close();
}
```

### PHP

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
use Google\Cloud\Spanner\SpannerClient;

/**
 * Queries sample data from the database using SQL.
 * Example:
 * ```
 * query_data($instanceId, $databaseId);
 * ```
 *
 * @param string $instanceId The Spanner instance ID.
 * @param string $databaseId The Spanner database ID.
 */
function query_data(string $instanceId, string $databaseId): void
{
    $spanner = new SpannerClient();
    $instance = $spanner->instance($instanceId);
    $database = $instance->database($databaseId);

    $results = $database->execute(
        'SELECT SingerId, AlbumId, AlbumTitle FROM Albums'
    );

    foreach ($results as $row) {
        printf('SingerId: %s, AlbumId: %s, AlbumTitle: %s' . PHP_EOL,
            $row['SingerId'], $row['AlbumId'], $row['AlbumTitle']);
    }
}
```

### Python

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
def query_data(instance_id, database_id):
    """Queries sample data from the database using SQL."""
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    with database.snapshot() as snapshot:
        results = snapshot.execute_sql(
            "SELECT SingerId, AlbumId, AlbumTitle FROM Albums"
        )

        for row in results:
            print("SingerId: {}, AlbumId: {}, AlbumTitle: {}".format(*row))
```

### Ruby

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
# project_id  = "Your Google Cloud project ID"
# instance_id = "Your Spanner instance ID"
# database_id = "Your Spanner database ID"

require "google/cloud/spanner"

spanner = Google::Cloud::Spanner.new project: project_id
client  = spanner.client instance_id, database_id

client.execute("SELECT SingerId, AlbumId, AlbumTitle FROM Albums").rows.each do |row|
  puts "#{row[:SingerId]} #{row[:AlbumId]} #{row[:AlbumTitle]}"
end
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

*   ### Products and pricing
    
    *   See all products
    *   Google Cloud pricing
    *   Google Cloud Marketplace
    *   Contact sales
*   ### Support
    
    *   Community forums
    *   Support
    *   Release Notes
    *   System status
*   ### Resources
    
    *   GitHub
    *   Getting Started with Google Cloud
    *   Code samples
    *   Cloud Architecture Center
    *   Training and Certification
*   ### Engage
    
    *   Blog
    *   Events
    *   X (Twitter)
    *   Google Cloud on YouTube
    *   Google Cloud Tech on YouTube

*   About Google
*   Privacy
*   Site terms
*   Google Cloud terms
*   Manage cookies
*   Our third decade of climate action: join us
*   Sign up for the Google Cloud newsletter Subscribe

*   English
*   Deutsch
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   עברית
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어