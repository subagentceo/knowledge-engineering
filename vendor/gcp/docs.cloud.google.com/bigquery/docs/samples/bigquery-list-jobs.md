# List jobs

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Samples

# List jobs Stay organized with collections Save and categorize content based on your preferences.

List all jobs in a project.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Manage jobs

## Code sample

### Go

Before trying this sample, follow the Go setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Go API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/bigquery"
	"google.golang.org/api/iterator"
)

// listJobs demonstrates iterating through the BigQuery jobs collection.
func listJobs(w io.Writer, projectID string) error {
	// projectID := "my-project-id"
	// jobID := "my-job-id"
	ctx := context.Background()

	client, err := bigquery.NewClient(ctx, projectID)
	if err != nil {
		return fmt.Errorf("bigquery.NewClient: %w", err)
	}
	defer client.Close()

	it := client.Jobs(ctx)
	// List up to 10 jobs to demonstrate iteration.
	for i := 0; i < 10; i++ {
		j, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return err
		}
		state := "Unknown"
		switch j.LastStatus().State {
		case bigquery.Pending:
			state = "Pending"
		case bigquery.Running:
			state = "Running"
		case bigquery.Done:
			state = "Done"
		}
		fmt.Fprintf(w, "Job %s in state %s\n", j.ID(), state)
	}
	return nil
}
```

### Java

Before trying this sample, follow the Java setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Java API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import com.google.api.gax.paging.Page;
import com.google.cloud.bigquery.BigQuery;
import com.google.cloud.bigquery.BigQueryException;
import com.google.cloud.bigquery.BigQueryOptions;
import com.google.cloud.bigquery.Job;

// Sample to get list of jobs
public class ListJobs {

  public static void main(String[] args) {
    listJobs();
  }

  public static void listJobs() {
    try {
      // Initialize client that will be used to send requests. This client only needs to be created
      // once, and can be reused for multiple requests.
      BigQuery bigquery = BigQueryOptions.getDefaultInstance().getService();

      Page<Job> jobs = bigquery.listJobs(BigQuery.JobListOption.pageSize(10));
      if (jobs == null) {
        System.out.println("Dataset does not contain any jobs.");
        return;
      }
      jobs.getValues().forEach(job -> System.out.printf("Success! Job ID: %s", job.getJobId()));
    } catch (BigQueryException e) {
      System.out.println("Jobs not listed in dataset due to error: \n" + e.toString());
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

async function listJobs() {
  // Lists all jobs in current GCP project.

  // List the 10 most recent jobs in reverse chronological order.
  //  Omit the max_results parameter to list jobs from the past 6 months.
  const options = {maxResults: 10};
  const [jobs] = await bigquery.getJobs(options);

  console.log('Jobs:');
  jobs.forEach(job => console.log(job.id));
}
```

### Python

Before trying this sample, follow the Python setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Python API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

from google.cloud import bigquery

import datetime

# Construct a BigQuery client object.
client = bigquery.Client()

# List the 10 most recent jobs in reverse chronological order.
# Omit the max_results parameter to list jobs from the past 6 months.
print("Last 10 jobs:")
for job in client.list_jobs(max_results=10):  # API request(s)
    print("{}".format(job.job_id))

# The following are examples of additional optional parameters:

# Use min_creation_time and/or max_creation_time to specify a time window.
print("Jobs from the last ten minutes:")
ten_mins_ago = datetime.datetime.utcnow() - datetime.timedelta(minutes=10)
for job in client.list_jobs(min_creation_time=ten_mins_ago):
    print("{}".format(job.job_id))

# Use all_users to include jobs run by all users in the project.
print("Last 10 jobs run by all users:")
for job in client.list_jobs(max_results=10, all_users=True):
    print("{} run by user: {}".format(job.job_id, job.user_email))

# Use state_filter to filter by job state.
print("Last 10 jobs done:")
for job in client.list_jobs(max_results=10, state_filter="DONE"):
    print("{}".format(job.job_id))
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.