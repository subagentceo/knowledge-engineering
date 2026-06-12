# List data sources

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Samples

# List data sources Stay organized with collections Save and categorize content based on your preferences.

Lists all supported data sources for the BigQuery Data Transfer Service.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   BigQuery Data Transfer Service API Client Libraries

## Code sample

### C#

Before trying this sample, follow the C# setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery C# API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

using Google.Api.Gax.ResourceNames;
using Google.Cloud.BigQuery.DataTransfer.V1;
using System;

namespace GoogleCloudSamples
{
    public class QuickStart
    {
        public static void Main(string[] args)
        {
            // Instantiates a client
            DataTransferServiceClient client = DataTransferServiceClient.Create();

            // Your Google Cloud Platform project ID
            string projectId = "YOUR-PROJECT-ID";

            ProjectName project = ProjectName.FromProject(projectId);
            var sources = client.ListDataSources(project);
            Console.WriteLine("Supported Data Sources:");
            foreach (DataSource source in sources)
            {
                Console.WriteLine(
                    $"{source.DataSourceId}: " +
                    $"{source.DisplayName} ({source.Description})");
            }
        }
    }
}
```

### Go

Before trying this sample, follow the Go setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Go API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

// Sample bigquery-quickstart creates a Google BigQuery dataset.
package main

import (
	"context"
	"fmt"
	"log"

	"google.golang.org/api/iterator"

	// Imports the BigQuery Data Transfer client package.
	datatransfer "cloud.google.com/go/bigquery/datatransfer/apiv1"
	"cloud.google.com/go/bigquery/datatransfer/apiv1/datatransferpb"
)

func main() {
	ctx := context.Background()

	// Sets your Google Cloud Platform project ID.
	projectID := "YOUR_PROJECT_ID"

	// Creates a client.
	client, err := datatransfer.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	req := &datatransferpb.ListDataSourcesRequest{
		Parent: fmt.Sprintf("projects/%s", projectID),
	}
	it := client.ListDataSources(ctx, req)
	fmt.Println("Supported Data Sources:")
	for {
		ds, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatalf("Failed to list sources: %v", err)
		}
		fmt.Println(ds.DisplayName)
		fmt.Println("\tID: ", ds.DataSourceId)
		fmt.Println("\tFull path: ", ds.Name)
		fmt.Println("\tDescription: ", ds.Description)
	}
}
```

### Java

Before trying this sample, follow the Java setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Java API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
// Imports the Google Cloud client library

import com.google.cloud.bigquery.datatransfer.v1.DataSource;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient.ListDataSourcesPagedResponse;
import com.google.cloud.bigquery.datatransfer.v1.ListDataSourcesRequest;

public class QuickstartSample {
  /** List available data sources for the BigQuery Data Transfer service. */
  public static void main(String... args) throws Exception {
    // Sets your Google Cloud Platform project ID.
    // String projectId = "YOUR_PROJECT_ID";
    String projectId = args[0];

    // Instantiate a client. If you don't specify credentials when constructing a client, the
    // client library will look for credentials in the environment, such as the
    // GOOGLE_APPLICATION_CREDENTIALS environment variable.
    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      // Request the list of available data sources.
      String parent = String.format("projects/%s", projectId);
      ListDataSourcesRequest request =
          ListDataSourcesRequest.newBuilder().setParent(parent).build();
      ListDataSourcesPagedResponse response = client.listDataSources(request);

      // Print the results.
      System.out.println("Supported Data Sources:");
      for (DataSource dataSource : response.iterateAll()) {
        System.out.println(dataSource.getDisplayName());
        System.out.printf("\tID: %s%n", dataSource.getDataSourceId());
        System.out.printf("\tFull path: %s%n", dataSource.getName());
        System.out.printf("\tDescription: %s%n", dataSource.getDescription());
      }
    }
  }
}
```

### Node.js

Before trying this sample, follow the Node.js setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Node.js API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
const {
  DataTransferServiceClient,
} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Lists all available data sources for a project.
 * Data sources are the services that can be used to create data transfers into BigQuery.
 *
 * @param {string} projectId The Google Cloud project ID, for example 'example-project-id'.
 */
async function listDataSources(projectId) {
  const request = {
    parent: `projects/${projectId}`,
  };

  try {
    const [dataSources] = await client.listDataSources(request);

    if (dataSources.length === 0) {
      console.log(`No data sources found in project ${projectId}.`);
      return;
    }

    console.log('Supported data sources:');
    for (const dataSource of dataSources) {
      console.log(`\nData source: ${dataSource.name}`);
      console.log(`  ID: ${dataSource.dataSourceId}`);
      console.log(`  Display Name: ${dataSource.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project ${projectId} not found.`);
    } else {
      console.error('An error occurred:', err);
    }
  }
}
```

### PHP

Before trying this sample, follow the PHP setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery PHP API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
# Includes the autoloader for libraries installed with composer
require __DIR__ . '/vendor/autoload.php';

# Imports the Google Cloud client library
use Google\Cloud\BigQuery\DataTransfer\V1\Client\DataTransferServiceClient;
use Google\Cloud\BigQuery\DataTransfer\V1\ListDataSourcesRequest;

# Instantiates a client
$bqdtsClient = new DataTransferServiceClient();

# Your Google Cloud Platform project ID
$projectId = 'YOUR_PROJECT_ID';
$parent = sprintf('projects/%s/locations/us', $projectId);

try {
    echo 'Supported Data Sources:', PHP_EOL;
    $listDataSourcesRequest = (new ListDataSourcesRequest())
        ->setParent($parent);
    $pagedResponse = $bqdtsClient->listDataSources($listDataSourcesRequest);
    foreach ($pagedResponse->iterateAllElements() as $dataSource) {
        echo 'Data source: ', $dataSource->getDisplayName(), PHP_EOL;
        echo 'ID: ', $dataSource->getDataSourceId(), PHP_EOL;
        echo 'Full path: ', $dataSource->getName(), PHP_EOL;
        echo 'Description: ', $dataSource->getDescription(), PHP_EOL;
    }
} finally {
    $bqdtsClient->close();
}
```

### Python

Before trying this sample, follow the Python setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Python API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
from google.cloud import bigquery_datatransfer

client = bigquery_datatransfer.DataTransferServiceClient()

# TODO: Update to your project ID.
project_id = "my-project"

# Get the full path to your project.
parent = client.common_project_path(project_id)

print("Supported Data Sources:")

# Iterate over all possible data sources.
for data_source in client.list_data_sources(parent=parent):
    print("{}:".format(data_source.display_name))
    print("\tID: {}".format(data_source.data_source_id))
    print("\tFull path: {}".format(data_source.name))
    print("\tDescription: {}".format(data_source.description))
```

### Ruby

Before trying this sample, follow the Ruby setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Ruby API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
# Imports the Google Cloud client library
require "google/cloud/bigquery/data_transfer"

# Your Google Cloud Platform project ID
# project_id = "YOUR_PROJECT_ID"

# Instantiate a client
data_transfer = Google::Cloud::Bigquery::DataTransfer.data_transfer_service

# Get the full path to your project.
project_path = data_transfer.project_path project: project_id

puts "Supported Data Sources:"

# Iterate over all possible data sources.
data_transfer.list_data_sources(parent: project_path).each do |data_source|
  puts "Data source: #{data_source.display_name}"
  puts "ID: #{data_source.data_source_id}"
  puts "Full path: #{data_source.name}"
  puts "Description: #{data_source.description}"
end
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.