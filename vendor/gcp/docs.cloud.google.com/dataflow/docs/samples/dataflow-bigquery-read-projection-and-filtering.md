# Read with projection and filtering

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   Cloud Dataflow
*   Samples

# Read with projection and filtering Stay organized with collections Save and categorize content based on your preferences.

Use the BigQueryIO connector in DIRECT_READ mode with column projection and filtering.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Read from BigQuery to Dataflow

## Code sample

### Java

To authenticate to Dataflow, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
import com.google.common.collect.ImmutableMap;
import java.util.List;
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.managed.Managed;
import org.apache.beam.sdk.options.PipelineOptionsFactory;
import org.apache.beam.sdk.transforms.MapElements;
import org.apache.beam.sdk.values.Row;
import org.apache.beam.sdk.values.TypeDescriptors;

public class BigQueryReadWithProjectionAndFiltering {
  public static void main(String[] args) {
    // Parse the pipeline options passed into the application. Example:
    //   --projectId=$PROJECT_ID --datasetName=$DATASET_NAME --tableName=$TABLE_NAME
    // For more information, see https://beam.apache.org/documentation/programming-guide/#configuring-pipeline-options
    PipelineOptionsFactory.register(ExamplePipelineOptions.class);
    ExamplePipelineOptions options = PipelineOptionsFactory.fromArgs(args)
        .withValidation()
        .as(ExamplePipelineOptions.class);

    String tableSpec = String.format("%s:%s.%s",
        options.getProjectId(),
        options.getDatasetName(),
        options.getTableName());

    ImmutableMap<String, Object> config = ImmutableMap.<String, Object>builder()
        .put("table", tableSpec)
        .put("row_restriction", "age > 18")
        .put("fields", List.of("user_name", "age"))
        .build();

    // Create a pipeline and apply transforms.
    Pipeline pipeline = Pipeline.create(options);
    pipeline
        .apply(Managed.read(Managed.BIGQUERY).withConfig(config)).getSinglePCollection()
        .apply(MapElements
            .into(TypeDescriptors.strings())
            // Access individual fields in the row.
            .via((Row row) -> {
              String output = String.format("Name: %s, Age: %s%n",
                  row.getString("user_name"),
                  row.getInt64("age"));
              System.out.println(output);
              return output;
            }));
    pipeline.run().waitUntilFinish();
  }
}
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.