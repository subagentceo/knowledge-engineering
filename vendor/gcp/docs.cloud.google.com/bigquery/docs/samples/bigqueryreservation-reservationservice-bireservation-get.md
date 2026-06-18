# Get a BI reservation

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Samples

# Get a BI reservation Stay organized with collections Save and categorize content based on your preferences.

Gets the details of a specified BI reservation from the BigQuery Reservation API.

## Code sample

### Node.js

Before trying this sample, follow the Node.js setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Node.js API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Retrieves a BI reservation.
 * A BI reservation is a singleton resource in a location.
 * @param {string} projectId Google Cloud project ID, for example 'example-project-id'.
 * @param {string} location Google Cloud location, for example 'US'.
 */
async function getBiReservation(projectId, location = 'US') {
  const name = client.biReservationPath(projectId, location);
  const request = {
    name,
  };

  try {
    const [reservation] = await client.getBiReservation(request);
    console.log(`Got BI reservation: ${reservation.name}`);
    console.log(`  Size: ${reservation.size} bytes`);
    if (reservation.updateTime) {
      const updateTime = new Date(
        reservation.updateTime.seconds * 1000 +
          reservation.updateTime.nanos / 1000000,
      );
      console.log(`  Last updated: ${updateTime.toISOString()}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `BI reservation not found for project ${projectId} in location ${location}.`,
      );
    } else {
      console.error('Error getting BI reservation:', err);
    }
  }
}
```

### Python

Before trying this sample, follow the Python setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Python API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
from google.api_core.exceptions import NotFound
from google.cloud import bigquery_reservation_v1


def get_bi_reservation(project_id: str, location: str):
    """Gets a BI reservation.

    A BI reservation is a singleton resource. It is not created explicitly, but
    can be updated to enable BI Engine.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the BI reservation , for example, us-central1.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()
    name = client.bi_reservation_path(project_id, location)

    try:
        reservation = client.get_bi_reservation(name=name)
        print(f"Got BI reservation: {reservation.name}")
        print(f"\tSize: {reservation.size} bytes")
        print(f"\tUpdated at: {reservation.update_time}")
    except NotFound:
        print(
            f"BI reservation not found for project '{project_id}' in location '{location}'."
        )
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.