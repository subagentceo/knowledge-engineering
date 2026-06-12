# Create a Cloud SQL connection

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Samples

# Create a Cloud SQL connection Stay organized with collections Save and categorize content based on your preferences.

Add credentials to connect BigQuery to Cloud SQL.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Connect to Cloud SQL

## Code sample

### Java

Before trying this sample, follow the Java setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Java API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import com.google.cloud.bigquery.connection.v1.CloudSqlCredential;
import com.google.cloud.bigquery.connection.v1.CloudSqlProperties;
import com.google.cloud.bigquery.connection.v1.Connection;
import com.google.cloud.bigquery.connection.v1.CreateConnectionRequest;
import com.google.cloud.bigquery.connection.v1.LocationName;
import com.google.cloud.bigqueryconnection.v1.ConnectionServiceClient;
import java.io.IOException;

// Sample to create a connection with cloud MySql database
public class CreateConnection {

  public static void main(String[] args) throws IOException {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "MY_PROJECT_ID";
    String location = "MY_LOCATION";
    String connectionId = "MY_CONNECTION_ID";
    String database = "MY_DATABASE";
    String instance = "MY_INSTANCE";
    String instanceLocation = "MY_INSTANCE_LOCATION";
    String username = "MY_USERNAME";
    String password = "MY_PASSWORD";
    String instanceId = String.format("%s:%s:%s", projectId, instanceLocation, instance);
    CloudSqlCredential cloudSqlCredential =
        CloudSqlCredential.newBuilder().setUsername(username).setPassword(password).build();
    CloudSqlProperties cloudSqlProperties =
        CloudSqlProperties.newBuilder()
            .setType(CloudSqlProperties.DatabaseType.MYSQL)
            .setDatabase(database)
            .setInstanceId(instanceId)
            .setCredential(cloudSqlCredential)
            .build();
    Connection connection = Connection.newBuilder().setCloudSql(cloudSqlProperties).build();
    createConnection(projectId, location, connectionId, connection);
  }

  static void createConnection(
      String projectId, String location, String connectionId, Connection connection)
      throws IOException {
    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      LocationName parent = LocationName.of(projectId, location);
      CreateConnectionRequest request =
          CreateConnectionRequest.newBuilder()
              .setParent(parent.toString())
              .setConnection(connection)
              .setConnectionId(connectionId)
              .build();
      Connection response = client.createConnection(request);
      System.out.println("Connection created successfully :" + response.getName());
    }
  }
}
```

### Python

Before trying this sample, follow the Python setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Python API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
from google.cloud import bigquery_connection_v1 as bq_connection

"""This sample shows how to create a BigQuery connection with a Cloud SQL for MySQL database"""


def main() -> None:
    # TODO(developer): Set all variables for your Cloud SQL for MySQL connection.
    project_id = "your-project-id"  # set project_id
    location = "US"  # set location
    # See: https://cloud.google.com/bigquery/docs/locations for a list of
    # available locations.
    database = "my-database"  # set database name
    username = "my-username"  # set database username
    password = "my-password"  # set database password
    cloud_sql_conn_name = ""  # set the name of your connection
    transport = "grpc"  # Set the transport to either "grpc" or "rest"
    connection_id = "my-sample-connection"

    cloud_sql_credential = bq_connection.CloudSqlCredential(
        {
            "username": username,
            "password": password,
        }
    )
    cloud_sql_properties = bq_connection.CloudSqlProperties(
        {
            "type_": bq_connection.CloudSqlProperties.DatabaseType.MYSQL,
            "database": database,
            "instance_id": cloud_sql_conn_name,
            "credential": cloud_sql_credential,
        }
    )
    create_mysql_connection(
        connection_id, project_id, location, cloud_sql_properties, transport
    )


def create_mysql_connection(
    connection_id: str,
    project_id: str,
    location: str,
    cloud_sql_properties: bq_connection.CloudSqlProperties,
    transport: str,
) -> None:
    connection = bq_connection.types.Connection({"cloud_sql": cloud_sql_properties})
    client = bq_connection.ConnectionServiceClient(transport=transport)
    parent = client.common_location_path(project_id, location)
    request = bq_connection.CreateConnectionRequest(
        {
            "parent": parent,
            "connection": connection,
            # connection_id is optional, but can be useful to identify
            # connections by name. If not supplied, one is randomly
            # generated.
            "connection_id": connection_id,
        }
    )
    response = client.create_connection(request)
    print(f"Created connection successfully: {response.name}")
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.