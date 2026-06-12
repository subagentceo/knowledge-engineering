# Query data from a new column

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Spanner
*   Samples

# Query data from a new column Stay organized with collections Save and categorize content based on your preferences.

Query data from a new column.

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

## Code sample

### C++

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
void QueryNewColumn(google::cloud::spanner::Client client) {
  namespace spanner = ::google::cloud::spanner;

  spanner::SqlStatement select(
      "SELECT SingerId, AlbumId, MarketingBudget FROM Albums");
  using RowType =
      std::tuple<std::int64_t, std::int64_t, absl::optional<std::int64_t>>;

  auto rows = client.ExecuteQuery(std::move(select));
  for (auto& row : spanner::StreamOf<RowType>(rows)) {
    if (!row) throw std::move(row).status();
    std::cout << "SingerId: " << std::get<0>(*row) << "\t";
    std::cout << "AlbumId: " << std::get<1>(*row) << "\t";
    auto marketing_budget = std::get<2>(*row);
    if (marketing_budget) {
      std::cout << "MarketingBudget: " << *marketing_budget << "\n";
    } else {
      std::cout << "MarketingBudget: NULL\n";
    }
  }
  std::cout << "Read completed for [spanner_read_data_with_new_column]\n";
}
```

### C#

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```

using Google.Cloud.Spanner.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

public class QueryNewColumnAsyncSample
{
    public class Album
    {
        public int SingerId { get; set; }
        public int AlbumId { get; set; }
        public long MarketingBudget { get; set; }
    }

    public async Task<List<Album>> QueryNewColumnAsync(string projectId, string instanceId, string databaseId)
    {
        string connectionString = $"Data Source=projects/{projectId}/instances/{instanceId}/databases/{databaseId}";

        var albums = new List<Album>();
        using var connection = new SpannerConnection(connectionString);
        using var cmd = connection.CreateSelectCommand("SELECT * FROM Albums");
        using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            albums.Add(new Album
            {
                SingerId = reader.GetFieldValue<int>("SingerId"),
                AlbumId = reader.GetFieldValue<int>("AlbumId"),
                MarketingBudget = reader.IsDBNull(reader.GetOrdinal("MarketingBudget")) ? 0 : reader.GetFieldValue<long>("MarketingBudget")
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
	"strconv"

	"cloud.google.com/go/spanner"
	"google.golang.org/api/iterator"
)

func queryNewColumn(w io.Writer, db string) error {
	ctx := context.Background()
	client, err := spanner.NewClient(ctx, db)
	if err != nil {
		return err
	}
	defer client.Close()

	stmt := spanner.Statement{SQL: `SELECT SingerId, AlbumId, MarketingBudget FROM Albums`}
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
		var marketingBudget spanner.NullInt64
		if err := row.ColumnByName("SingerId", &singerID); err != nil {
			return err
		}
		if err := row.ColumnByName("AlbumId", &albumID); err != nil {
			return err
		}
		if err := row.ColumnByName("MarketingBudget", &marketingBudget); err != nil {
			return err
		}
		budget := "NULL"
		if marketingBudget.Valid {
			budget = strconv.FormatInt(marketingBudget.Int64, 10)
		}
		fmt.Fprintf(w, "%d %d %s\n", singerID, albumID, budget)
	}
}
```

### Java

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
static void queryDataWithNewColumn(
    final String project,
    final String instance,
    final String database,
    final Properties properties) throws SQLException {
  try (Connection connection =
      DriverManager.getConnection(
          String.format(
              "jdbc:cloudspanner:/projects/%s/instances/%s/databases/%s",
              project, instance, database),
          properties)) {
    // Rows without an explicit value for MarketingBudget will have a
    // MarketingBudget equal to null.
    try (ResultSet resultSet =
        connection
            .createStatement()
            .executeQuery(
                "SELECT SingerId, AlbumId, MarketingBudget "
                + "FROM Albums")) {
      while (resultSet.next()) {
        // Use the ResultSet#getObject(String) method to get data
        // of any type from the ResultSet.
        System.out.printf(
            "%s %s %s\n",
            resultSet.getObject("SingerId"),
            resultSet.getObject("AlbumId"),
            resultSet.getObject("MarketingBudget"));
      }
    }
  }
}
```

### Node.js

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
// This sample uses the `MarketingBudget` column. You can add the column
// by running the `add_column` sample or by running this DDL statement against
// your database:
//    ALTER TABLE Albums ADD COLUMN MarketingBudget INT64

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
  sql: 'SELECT SingerId, AlbumId, MarketingBudget FROM Albums',
};

// Queries rows from the Albums table
try {
  const [rows] = await database.run(query);

  rows.forEach(async row => {
    const json = row.toJSON();

    console.log(
      `SingerId: ${json.SingerId}, AlbumId: ${
        json.AlbumId
      }, MarketingBudget: ${
        json.MarketingBudget ? json.MarketingBudget : null
      }`,
    );
  });
} catch (err) {
  console.error('ERROR:', err);
} finally {
  // Close the database when finished.
  database.close();
}
```

### PHP

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
use Google\Cloud\Spanner\SpannerClient;

/**
 * Queries sample data from the database using SQL.
 * This sample uses the `MarketingBudget` column. You can add the column
 * by running the `add_column` sample or by running this DDL statement against
 * your database:
 *
 *      ALTER TABLE Albums ADD COLUMN MarketingBudget INT64
 *
 * Example:
 * ```
 * query_data_with_new_column($instanceId, $databaseId);
 * ```
 *
 * @param string $instanceId The Spanner instance ID.
 * @param string $databaseId The Spanner database ID.
 */
function query_data_with_new_column(string $instanceId, string $databaseId): void
{
    $spanner = new SpannerClient();
    $instance = $spanner->instance($instanceId);
    $database = $instance->database($databaseId);

    $results = $database->execute(
        'SELECT SingerId, AlbumId, MarketingBudget FROM Albums'
    );

    foreach ($results as $row) {
        printf('SingerId: %s, AlbumId: %s, MarketingBudget: %d' . PHP_EOL,
            $row['SingerId'], $row['AlbumId'], $row['MarketingBudget']);
    }
}
```

### Python

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
def query_data_with_new_column(instance_id, database_id):
    """Queries sample data from the database using SQL.

    This sample uses the `MarketingBudget` column. You can add the column
    by running the `add_column` sample or by running this DDL statement against
    your database:

        ALTER TABLE Albums ADD COLUMN MarketingBudget INT64
    """
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    with database.snapshot() as snapshot:
        results = snapshot.execute_sql(
            "SELECT SingerId, AlbumId, MarketingBudget FROM Albums"
        )

        for row in results:
            print("SingerId: {}, AlbumId: {}, MarketingBudget: {}".format(*row))
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

client.execute("SELECT SingerId, AlbumId, MarketingBudget FROM Albums").rows.each do |row|
  puts "#{row[:SingerId]} #{row[:AlbumId]} #{row[:MarketingBudget]}"
end
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.