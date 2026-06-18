# Read data in parallel

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Spanner
*   Samples

# Read data in parallel Stay organized with collections Save and categorize content based on your preferences.

Read data in parallel by dividing the query into smaller pieces, or partitions, and fetching the partitions in parallel.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Reads outside of transactions

## Code sample

### C++

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
void UsePartitionQuery(google::cloud::spanner::Client client) {
  namespace spanner = ::google::cloud::spanner;
  auto txn = spanner::MakeReadOnlyTransaction();

  spanner::SqlStatement select(
      "SELECT SingerId, FirstName, LastName FROM Singers");
  using RowType = std::tuple<std::int64_t, std::string, std::string>;

  auto partitions = client.PartitionQuery(
      std::move(txn), std::move(select),
      google::cloud::Options{}.set<spanner::PartitionDataBoostOption>(true));
  if (!partitions) throw std::move(partitions).status();

  // You would probably choose to execute these partitioned queries in
  // separate threads/processes, or on a different machine.
  int number_of_rows = 0;
  for (auto const& partition : *partitions) {
    auto rows = client.ExecuteQuery(partition);
    for (auto& row : spanner::StreamOf<RowType>(rows)) {
      if (!row) throw std::move(row).status();
      number_of_rows++;
    }
  }
  std::cout << "Number of partitions: " << partitions->size() << "\n"
            << "Number of rows: " << number_of_rows << "\n";
  std::cout << "Read completed for [spanner_batch_client]\n";
}
```

### C#

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```

using Google.Cloud.Spanner.Data;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

public class BatchReadRecordsAsyncSample
{
    private int _rowsRead;
    private int _partitionCount;
    public async Task<(int RowsRead, int Partitions)> BatchReadRecordsAsync(string projectId, string instanceId, string databaseId)
    {
        string connectionString = $"Data Source=projects/{projectId}/instances/{instanceId}/databases/{databaseId}";
        using var connection = new SpannerConnection(connectionString);
        await connection.OpenAsync();

        using var transaction = await connection.BeginTransactionAsync(
            SpannerTransactionCreationOptions.ReadOnly.WithIsDetached(true),
            new SpannerTransactionOptions { DisposeBehavior = DisposeBehavior.CloseResources },
            cancellationToken: default);
        using var cmd = connection.CreateSelectCommand("SELECT SingerId, FirstName, LastName FROM Singers");
        cmd.Transaction = transaction;

        // A CommandPartition object is serializable and can be used from a different process.
        // If data boost is enabled, partitioned read and query requests will be executed
        // using Spanner independent compute resources.
        var partitions = await cmd.GetReaderPartitionsAsync(PartitionOptions.Default.WithDataBoostEnabled(true));

        var transactionId = transaction.TransactionId;
        await Task.WhenAll(partitions.Select(x => DistributedReadWorkerAsync(x, transactionId)));
        Console.WriteLine($"Done reading!  Total rows read: {_rowsRead:N0} with {_partitionCount} partition(s)");
        return (RowsRead: _rowsRead, Partitions: _partitionCount);
    }

    private async Task DistributedReadWorkerAsync(CommandPartition readPartition, TransactionId id)
    {
        var localId = Interlocked.Increment(ref _partitionCount);
        using var connection = new SpannerConnection(id.ConnectionString);
        using var transaction = await connection.BeginTransactionAsync(
            SpannerTransactionCreationOptions.FromReadOnlyTransactionId(id),
            transactionOptions: null,
            cancellationToken: default);
        using var cmd = connection.CreateCommandWithPartition(readPartition, transaction);
        using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            Interlocked.Increment(ref _rowsRead);
            Console.WriteLine($"Partition ({localId}) "
                + $"{reader.GetFieldValue<int>("SingerId")}"
                + $" {reader.GetFieldValue<string>("FirstName")}"
                + $" {reader.GetFieldValue<string>("LastName")}");
        }
        Console.WriteLine($"Done with single reader {localId}.");
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

func readBatchData(w io.Writer, db string) error {
	ctx := context.Background()
	client, err := spanner.NewClient(ctx, db)
	if err != nil {
		return err
	}
	defer client.Close()

	txn, err := client.BatchReadOnlyTransaction(ctx, spanner.StrongRead())
	if err != nil {
		return err
	}
	defer txn.Close()

	// Singer represents a row in the Singers table.
	type Singer struct {
		SingerID   int64
		FirstName  string
		LastName   string
		SingerInfo []byte
	}
	stmt := spanner.Statement{SQL: "SELECT SingerId, FirstName, LastName FROM Singers;"}
	// A Partition object is serializable and can be used from a different process.
	// DataBoost option is an optional parameter which can also be used for partition read
	// and query to execute the request via spanner independent compute resources.
	partitions, err := txn.PartitionQueryWithOptions(ctx, stmt, spanner.PartitionOptions{}, spanner.QueryOptions{DataBoostEnabled: true})
	if err != nil {
		return err
	}
	recordCount := 0
	for i, p := range partitions {
		iter := txn.Execute(ctx, p)
		defer iter.Stop()
		for {
			row, err := iter.Next()
			if err == iterator.Done {
				break
			} else if err != nil {
				return err
			}
			var s Singer
			if err := row.ToStruct(&s); err != nil {
				return err
			}
			fmt.Fprintf(w, "Partition (%d) %v\n", i, s)
			recordCount++
		}
	}
	fmt.Fprintf(w, "Total partition count: %v\n", len(partitions))
	fmt.Fprintf(w, "Total record count: %v\n", recordCount)
	return nil
}
```

### Java

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
int numThreads = Runtime.getRuntime().availableProcessors();
ExecutorService executor = Executors.newFixedThreadPool(numThreads);

// Statistics
int totalPartitions;
AtomicInteger totalRecords = new AtomicInteger(0);

try {
  BatchClient batchClient =
      spanner.getBatchClient(DatabaseId.of(options.getProjectId(), instanceId, databaseId));

  final BatchReadOnlyTransaction txn =
      batchClient.batchReadOnlyTransaction(TimestampBound.strong());

  // A Partition object is serializable and can be used from a different process.
  // DataBoost option is an optional parameter which can be used for partition read
  // and query to execute the request via spanner independent compute resources.

  List<Partition> partitions =
      txn.partitionQuery(
          PartitionOptions.getDefaultInstance(),
          Statement.of("SELECT SingerId, FirstName, LastName FROM Singers"),
          // Option to enable data boost for a given request
          Options.dataBoostEnabled(true));

  totalPartitions = partitions.size();

  for (final Partition p : partitions) {
    executor.execute(
        () -> {
          try (ResultSet results = txn.execute(p)) {
            while (results.next()) {
              long singerId = results.getLong(0);
              String firstName = results.getString(1);
              String lastName = results.getString(2);
              System.out.println("[" + singerId + "] " + firstName + " " + lastName);
              totalRecords.getAndIncrement();
            }
          }
        });
  }
} finally {
  executor.shutdown();
  executor.awaitTermination(1, TimeUnit.HOURS);
  spanner.close();
}

double avgRecordsPerPartition = 0.0;
if (totalPartitions != 0) {
  avgRecordsPerPartition = (double) totalRecords.get() / totalPartitions;
}
System.out.println("totalPartitions=" + totalPartitions);
System.out.println("totalRecords=" + totalRecords);
System.out.println("avgRecordsPerPartition=" + avgRecordsPerPartition);
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
const [transaction] = await database.createBatchTransaction();

const query = {
  sql: 'SELECT * FROM Singers',
  // DataBoost option is an optional parameter which can also be used for partition read
  // and query to execute the request via spanner independent compute resources.
  dataBoostEnabled: true,
};

// A Partition object is serializable and can be used from a different process.
const [partitions] = await transaction.createQueryPartitions(query);
console.log(`Successfully created ${partitions.length} query partitions.`);

let row_count = 0;
const promises = [];
partitions.forEach(partition => {
  promises.push(
    transaction.execute(partition).then(results => {
      const rows = results[0].map(row => row.toJSON());
      row_count += rows.length;
    }),
  );
});
Promise.all(promises)
  .then(() => {
    console.log(
      `Successfully received ${row_count} from executed partitions.`,
    );
    transaction.close();
  })
  .then(() => {
    database.close();
  });
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
 * batch_query_data($instanceId, $databaseId);
 * ```
 *
 * @param string $instanceId The Spanner instance ID.
 * @param string $databaseId The Spanner database ID.
 */
function batch_query_data(string $instanceId, string $databaseId): void
{
    $spanner = new SpannerClient();
    $batch = $spanner->batch($instanceId, $databaseId);
    $snapshot = $batch->snapshot();
    $queryString = 'SELECT SingerId, FirstName, LastName FROM Singers';
    $partitions = $snapshot->partitionQuery($queryString, [
        // This is an optional parameter which can be used for partition
        // read and query to execute the request via spanner independent
        // compute resources.
        'dataBoostEnabled' => true
    ]);
    $totalPartitions = count($partitions);
    $totalRecords = 0;
    foreach ($partitions as $partition) {
        $result = $snapshot->executePartition($partition);
        $rows = $result->rows();
        foreach ($rows as $row) {
            $singerId = $row['SingerId'];
            $firstName = $row['FirstName'];
            $lastName = $row['LastName'];
            printf('SingerId: %s, FirstName: %s, LastName: %s' . PHP_EOL, $singerId, $firstName, $lastName);
            $totalRecords++;
        }
    }
    printf('Total Partitions: %d' . PHP_EOL, $totalPartitions);
    printf('Total Records: %d' . PHP_EOL, $totalRecords);
    $averageRecordsPerPartition = $totalRecords / $totalPartitions;
    printf('Average Records Per Partition: %f' . PHP_EOL, $averageRecordsPerPartition);
}
```

### Python

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
def run_batch_query(instance_id, database_id):
    """Runs an example batch query."""

    # Expected Table Format:
    # CREATE TABLE Singers (
    #   SingerId   INT64 NOT NULL,
    #   FirstName  STRING(1024),
    #   LastName   STRING(1024),
    #   SingerInfo BYTES(MAX),
    # ) PRIMARY KEY (SingerId);

    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    # Create the batch transaction and generate partitions
    snapshot = database.batch_snapshot()
    partitions = snapshot.generate_read_batches(
        table="Singers",
        columns=("SingerId", "FirstName", "LastName"),
        keyset=spanner.KeySet(all_=True),
        # A Partition object is serializable and can be used from a different process.
        # DataBoost option is an optional parameter which can also be used for partition read
        # and query to execute the request via spanner independent compute resources.
        data_boost_enabled=True,
    )

    # Create a pool of workers for the tasks
    start = time.time()
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(process, snapshot, p) for p in partitions]

        for future in concurrent.futures.as_completed(futures, timeout=3600):
            finish, row_ct = future.result()
            elapsed = finish - start
            print("Completed {} rows in {} seconds".format(row_ct, elapsed))

    # Clean up
    snapshot.close()


def process(snapshot, partition):
    """Processes the requests of a query in an separate process."""
    print("Started processing partition.")
    row_ct = 0
    for row in snapshot.process_read_batch(partition):
        print("SingerId: {}, AlbumId: {}, AlbumTitle: {}".format(*row))
        row_ct += 1
    return time.time(), row_ct
```

### Ruby

To learn how to install and use the client library for Spanner, see Spanner client libraries.

To authenticate to Spanner, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
# project_id  = "Your Google Cloud project ID"
# instance_id = "Your Spanner instance ID"
# database_id = "Your Spanner database ID"

require "google/cloud/spanner"

# Prepare a thread pool with number of processors
processor_count  = Concurrent.processor_count
thread_pool      = Concurrent::FixedThreadPool.new processor_count

# Prepare AtomicFixnum to count total records using multiple threads
total_records = Concurrent::AtomicFixnum.new

# Create a new Spanner batch client
spanner        = Google::Cloud::Spanner.new project: project_id
batch_client   = spanner.batch_client instance_id, database_id

# Get a strong timestamp bound batch_snapshot
batch_snapshot = batch_client.batch_snapshot strong: true

# Get partitions for specified query
# data_boost_enabled option is an optional parameter which can be used for partition read
# and query to execute the request via spanner independent compute resources.
partitions       = batch_snapshot.partition_query "SELECT SingerId, FirstName, LastName FROM Singers", data_boost_enabled: true
total_partitions = partitions.size

# Enqueue a new thread pool job
partitions.each_with_index do |partition, _partition_index|
  thread_pool.post do
    # Increment total_records per new row
    batch_snapshot.execute_partition(partition).rows.each do |_row|
      total_records.increment
    end
  end
end

# Wait for queued jobs to complete
thread_pool.shutdown
thread_pool.wait_for_termination

# Close the client connection and release resources.
batch_snapshot.close

# Collect statistics for batch query
average_records_per_partition = 0.0
if total_partitions != 0
  average_records_per_partition = total_records.value / total_partitions.to_f
end

puts "Total Partitions: #{total_partitions}"
puts "Total Records: #{total_records.value}"
puts "Average records per Partition: #{average_records_per_partition}"
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.