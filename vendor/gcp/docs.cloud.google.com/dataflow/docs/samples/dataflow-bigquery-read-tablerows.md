# Read into TableRow objects

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   Cloud Dataflow
*   Samples

# Read into TableRow objects Stay organized with collections Save and categorize content based on your preferences.

Use the BigQueryIO connector to read into TableRow objects.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Read from BigQuery to Dataflow

## Code sample

### Java

To authenticate to Dataflow, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
import com.google.api.services.bigquery.model.TableRow;
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.io.gcp.bigquery.BigQueryIO;
import org.apache.beam.sdk.io.gcp.bigquery.BigQueryIO.TypedRead.Method;
import org.apache.beam.sdk.options.PipelineOptionsFactory;
import org.apache.beam.sdk.transforms.MapElements;
import org.apache.beam.sdk.values.TypeDescriptor;

public class BiqQueryReadTableRows {
  public static void main(String[] args) {
    // Parse the pipeline options passed into the application. Example:
    //   --projectId=$PROJECT_ID --datasetName=$DATASET_NAME --tableName=$TABLE_NAME
    // For more information, see https://beam.apache.org/documentation/programming-guide/#configuring-pipeline-options
    PipelineOptionsFactory.register(ExamplePipelineOptions.class);
    ExamplePipelineOptions options = PipelineOptionsFactory.fromArgs(args)
        .withValidation()
        .as(ExamplePipelineOptions.class);

    // Create a pipeline and apply transforms.
    Pipeline pipeline = Pipeline.create(options);
    pipeline
        // Read table data into TableRow objects.
        .apply(BigQueryIO.readTableRows()
            .from(String.format("%s:%s.%s",
                options.getProjectId(),
                options.getDatasetName(),
                options.getTableName()))
            .withMethod(Method.DIRECT_READ)
        )
        // The output from the previous step is a PCollection<TableRow>.
        .apply(MapElements
            .into(TypeDescriptor.of(TableRow.class))
            // Use TableRow to access individual fields in the row.
            .via((TableRow row) -> {
              var name = (String) row.get("user_name");
              var age = (String) row.get("age");
              System.out.printf("Name: %s, Age: %s%n", name, age);
              return row;
            }));
    pipeline.run().waitUntilFinish();
  }
}
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.