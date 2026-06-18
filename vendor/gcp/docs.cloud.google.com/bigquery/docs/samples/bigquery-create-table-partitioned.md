# Column-based time partitioning

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Samples

# Column-based time partitioning Stay organized with collections Save and categorize content based on your preferences.

Create a table that uses column-based time partitioning.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Creating partitioned tables

## Code sample

### Go

Before trying this sample, follow the Go setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Go API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import (
	"context"
	"fmt"
	"time"

	"cloud.google.com/go/bigquery"
)

// createTablePartitioned demonstrates creating a table and specifying a time partitioning configuration.
func createTablePartitioned(projectID, datasetID, tableID string) error {
	// projectID := "my-project-id"
	// datasetID := "mydatasetid"
	// tableID := "mytableid"
	ctx := context.Background()

	client, err := bigquery.NewClient(ctx, projectID)
	if err != nil {
		return fmt.Errorf("bigquery.NewClient: %w", err)
	}
	defer client.Close()

	sampleSchema := bigquery.Schema{
		{Name: "name", Type: bigquery.StringFieldType},
		{Name: "post_abbr", Type: bigquery.IntegerFieldType},
		{Name: "date", Type: bigquery.DateFieldType},
	}
	metadata := &bigquery.TableMetadata{
		TimePartitioning: &bigquery.TimePartitioning{
			Field:      "date",
			Expiration: 90 * 24 * time.Hour,
		},
		Schema: sampleSchema,
	}
	tableRef := client.Dataset(datasetID).Table(tableID)
	if err := tableRef.Create(ctx, metadata); err != nil {
		return err
	}
	return nil
}
```

### Java

Before trying this sample, follow the Java setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Java API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import com.google.cloud.bigquery.BigQuery;
import com.google.cloud.bigquery.BigQueryException;
import com.google.cloud.bigquery.BigQueryOptions;
import com.google.cloud.bigquery.Field;
import com.google.cloud.bigquery.Schema;
import com.google.cloud.bigquery.StandardSQLTypeName;
import com.google.cloud.bigquery.StandardTableDefinition;
import com.google.cloud.bigquery.TableId;
import com.google.cloud.bigquery.TableInfo;
import com.google.cloud.bigquery.TimePartitioning;

// Sample to create a partition table
public class CreatePartitionedTable {

  public static void main(String[] args) {
    // TODO(developer): Replace these variables before running the sample.
    String datasetName = "MY_DATASET_NAME";
    String tableName = "MY_TABLE_NAME";
    Schema schema =
        Schema.of(
            Field.of("name", StandardSQLTypeName.STRING),
            Field.of("post_abbr", StandardSQLTypeName.STRING),
            Field.of("date", StandardSQLTypeName.DATE));
    createPartitionedTable(datasetName, tableName, schema);
  }

  public static void createPartitionedTable(String datasetName, String tableName, Schema schema) {
    try {
      // Initialize client that will be used to send requests. This client only needs to be created
      // once, and can be reused for multiple requests.
      BigQuery bigquery = BigQueryOptions.getDefaultInstance().getService();

      TableId tableId = TableId.of(datasetName, tableName);

      TimePartitioning partitioning =
          TimePartitioning.newBuilder(TimePartitioning.Type.DAY)
              .setField("date") //  name of column to use for partitioning
              .setExpirationMs(7776000000L) // 90 days
              .build();

      StandardTableDefinition tableDefinition =
          StandardTableDefinition.newBuilder()
              .setSchema(schema)
              .setTimePartitioning(partitioning)
              .build();
      TableInfo tableInfo = TableInfo.newBuilder(tableId, tableDefinition).build();

      bigquery.create(tableInfo);
      System.out.println("Partitioned table created successfully");
    } catch (BigQueryException e) {
      System.out.println("Partitioned table was not created. \n" + e.toString());
    }
  }
}
```

### Node.js

Before trying this sample, follow the Node.js setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Node.js API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

async function createTablePartitioned() {
  // Creates a new partitioned table named "my_table" in "my_dataset".

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const datasetId = "my_dataset";
  // const tableId = "my_table";
  const schema = 'Name:string, Post_Abbr:string, Date:date';

  // For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource
  const options = {
    schema: schema,
    location: 'US',
    timePartitioning: {
      type: 'DAY',
      expirationMs: '7776000000',
      field: 'date',
    },
  };

  // Create a new table in the dataset
  const [table] = await bigquery
    .dataset(datasetId)
    .createTable(tableId, options);
  console.log(`Table ${table.id} created with partitioning: `);
  console.log(table.metadata.timePartitioning);
}
```

### Python

Before trying this sample, follow the Python setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Python API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
from google.cloud import bigquery

client = bigquery.Client()

# Use format "your-project.your_dataset.your_table_name" for table_id
table_id = your_fully_qualified_table_id
schema = [
    bigquery.SchemaField("name", "STRING"),
    bigquery.SchemaField("post_abbr", "STRING"),
    bigquery.SchemaField("date", "DATE"),
]
table = bigquery.Table(table_id, schema=schema)
table.time_partitioning = bigquery.TimePartitioning(
    type_=bigquery.TimePartitioningType.DAY,
    field="date",  # name of column to use for partitioning
    expiration_ms=1000 * 60 * 60 * 24 * 90,
)  # 90 days

table = client.create_table(table)

print(
    f"Created table {table.project}.{table.dataset_id}.{table.table_id}, "
    f"partitioned on column {table.time_partitioning.field}."
)
```

### Terraform

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands. For more information, see the Terraform provider reference documentation.

```
resource "google_bigquery_dataset" "default" {
  dataset_id                      = "mydataset"
  default_partition_expiration_ms = 2592000000  # 30 days
  default_table_expiration_ms     = 31536000000 # 365 days
  description                     = "dataset description"
  location                        = "US"
  max_time_travel_hours           = 96 # 4 days

  labels = {
    billing_group = "accounting",
    pii           = "sensitive"
  }
}

resource "google_bigquery_table" "default" {
  dataset_id = google_bigquery_dataset.default.dataset_id
  table_id   = "mytable"

  time_partitioning {
    type          = "DAY"
    field         = "Created"
    expiration_ms = 432000000 # 5 days
  }
  require_partition_filter = true

  schema = <<EOF
[
  {
    "name": "ID",
    "type": "INT64",
    "mode": "NULLABLE",
    "description": "Item ID"
  },
  {
    "name": "Created",
    "type": "TIMESTAMP",
    "description": "Record creation timestamp"
  },
  {
    "name": "Item",
    "type": "STRING",
    "mode": "NULLABLE"
  }
]
EOF

}
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.