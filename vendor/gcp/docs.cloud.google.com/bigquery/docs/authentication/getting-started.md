# Get started with authentication

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Guides

Send feedback Stay organized with collections Save and categorize content based on your preferences.

# Get started with authentication

Application Default Credentials (ADC) let your application use service account credentials to access BigQuery resources as its own identity.

Note that BigQuery doesn't support the use of API keys.

## Before you begin

Select the tab for how you plan to use the samples on this page:

### C#

To use the .NET samples on this page in a local development environment, install and initialize the gcloud CLI, and then set up Application Default Credentials with your user credentials.

1.  Install the Google Cloud CLI.
    
2.  If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
3.  If you're using a local shell, then create local authentication credentials for your user account:
    
    gcloud auth application-default login
    
    You don't need to do this if you're using Cloud Shell.
    
    If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
    

For more information, see Set up authentication for a local development environment.

### Go

To use the Go samples on this page in a local development environment, install and initialize the gcloud CLI, and then set up Application Default Credentials with your user credentials.

1.  Install the Google Cloud CLI.
    
2.  If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
3.  If you're using a local shell, then create local authentication credentials for your user account:
    
    gcloud auth application-default login
    
    You don't need to do this if you're using Cloud Shell.
    
    If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
    

For more information, see Set up authentication for a local development environment.

### Java

To use the Java samples on this page in a local development environment, install and initialize the gcloud CLI, and then set up Application Default Credentials with your user credentials.

1.  Install the Google Cloud CLI.
    
2.  If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
3.  If you're using a local shell, then create local authentication credentials for your user account:
    
    gcloud auth application-default login
    
    You don't need to do this if you're using Cloud Shell.
    
    If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
    

For more information, see Set up authentication for a local development environment.

### Node.js

To use the Node.js samples on this page in a local development environment, install and initialize the gcloud CLI, and then set up Application Default Credentials with your user credentials.

1.  Install the Google Cloud CLI.
    
2.  If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
3.  If you're using a local shell, then create local authentication credentials for your user account:
    
    gcloud auth application-default login
    
    You don't need to do this if you're using Cloud Shell.
    
    If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
    

For more information, see Set up authentication for a local development environment.

### PHP

To use the PHP samples on this page in a local development environment, install and initialize the gcloud CLI, and then set up Application Default Credentials with your user credentials.

1.  Install the Google Cloud CLI.
    
2.  If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
3.  If you're using a local shell, then create local authentication credentials for your user account:
    
    gcloud auth application-default login
    
    You don't need to do this if you're using Cloud Shell.
    
    If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
    

For more information, see Set up authentication for a local development environment.

### Python

To use the Python samples on this page in a local development environment, install and initialize the gcloud CLI, and then set up Application Default Credentials with your user credentials.

1.  Install the Google Cloud CLI.
    
2.  If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
3.  If you're using a local shell, then create local authentication credentials for your user account:
    
    gcloud auth application-default login
    
    You don't need to do this if you're using Cloud Shell.
    
    If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
    

For more information, see Set up authentication for a local development environment.

### Ruby

To use the Ruby samples on this page in a local development environment, install and initialize the gcloud CLI, and then set up Application Default Credentials with your user credentials.

1.  Install the Google Cloud CLI.
    
2.  If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
3.  If you're using a local shell, then create local authentication credentials for your user account:
    
    gcloud auth application-default login
    
    You don't need to do this if you're using Cloud Shell.
    
    If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
    

For more information, see Set up authentication for a local development environment.

For information about setting up authentication for a production environment, see Set up Application Default Credentials for code running on Google Cloud .

## Application Default Credentials

Client libraries can use Application Default Credentials to easily authenticate with Google APIs and send requests to those APIs. With Application Default Credentials, you can test your application locally and deploy it without changing the underlying code. For more information, see Authenticate for using client libraries.

When you create a service object with the BigQuery Client Libraries and don't pass in explicit credentials, your application authenticates using Application Default Credentials. The following samples show how to authenticate to BigQuery by using ADC.

### C#

Before trying this sample, follow the C# setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery C# API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Before you begin.

```

using Google.Apis.Bigquery.v2.Data;
using Google.Cloud.BigQuery.V2;

public class BigQueryCreateDataset
{
    public BigQueryDataset CreateDataset(
        string projectId = "your-project-id",
        string location = "US"
    )
    {
        BigQueryClient client = BigQueryClient.Create(projectId);
        var dataset = new Dataset
        {
            // Specify the geographic location where the dataset should reside.
            Location = location
        };
        // Create the dataset
        return client.CreateDataset(
            datasetId: "your_new_dataset_id", dataset);
    }
}
```

### Go

Before trying this sample, follow the Go setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Go API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Before you begin.

```

// Sample bigquery-quickstart creates a Google BigQuery dataset.
package main

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/bigquery"
)

func main() {
	ctx := context.Background()

	// Sets your Google Cloud Platform project ID.
	projectID := "YOUR_PROJECT_ID"

	// Creates a client.
	client, err := bigquery.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("bigquery.NewClient: %v", err)
	}
	defer client.Close()

	// Sets the name for the new dataset.
	datasetName := "my_new_dataset"

	// Creates the new BigQuery dataset.
	if err := client.Dataset(datasetName).Create(ctx, &bigquery.DatasetMetadata{}); err != nil {
		log.Fatalf("Failed to create dataset: %v", err)
	}

	fmt.Printf("Dataset created\n")
}
```

### Java

Before trying this sample, follow the Java setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Java API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Before you begin.

```
public static void implicit() {
  // Instantiate a client. If you don't specify credentials when constructing a client, the
  // client library will look for credentials in the environment, such as the
  // GOOGLE_APPLICATION_CREDENTIALS environment variable.
  BigQuery bigquery = BigQueryOptions.getDefaultInstance().getService();

  // Use the client.
  System.out.println("Datasets:");
  for (Dataset dataset : bigquery.listDatasets().iterateAll()) {
    System.out.printf("%s%n", dataset.getDatasetId().getDataset());
  }
}
```

### Node.js

Before trying this sample, follow the Node.js setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Node.js API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Before you begin.

```
// Import the Google Cloud client library using default credentials
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
```

### PHP

Before trying this sample, follow the PHP setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery PHP API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Before you begin.

```
use Google\Cloud\BigQuery\BigQueryClient;

/** Uncomment and populate these variables in your code */
//$projectId = 'The Google project ID';

$bigQuery = new BigQueryClient([
    'projectId' => $projectId,
]);
```

### Python

Before trying this sample, follow the Python setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Python API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Before you begin.

```
from google.cloud import bigquery

# If you don't specify credentials when constructing the client, the
# client library will look for credentials in the environment.
client = bigquery.Client()
```

### Ruby

Before trying this sample, follow the Ruby setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Ruby API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Before you begin.

```
require "google/cloud/bigquery"

# This uses Application Default Credentials to authenticate.
# @see https://cloud.google.com/bigquery/docs/authentication/getting-started
bigquery = Google::Cloud::Bigquery.new

sql     = "SELECT " \
          "CONCAT('https://stackoverflow.com/questions/', CAST(id as STRING)) as url, view_count " \
          "FROM `bigquery-public-data.stackoverflow.posts_questions` " \
          "WHERE tags like '%google-bigquery%' " \
          "ORDER BY view_count DESC LIMIT 10"
results = bigquery.query sql

results.each do |row|
  puts "#{row[:url]}: #{row[:view_count]} views"
end
```

## What's next

*   Learn more about BigQuery authentication.
*   Learn how to authenticate with end-user credentials.

Send feedback