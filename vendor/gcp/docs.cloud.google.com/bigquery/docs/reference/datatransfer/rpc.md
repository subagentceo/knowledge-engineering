# BigQuery Data Transfer API

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Reference

Send feedback

# BigQuery Data Transfer API Stay organized with collections Save and categorize content based on your preferences.

Schedule queries or transfer external data from SaaS applications to Google BigQuery on a regular basis.

## Service: bigquerydatatransfer.googleapis.com

The Service name `bigquerydatatransfer.googleapis.com` is needed to create RPC client stubs.

## google.cloud.bigquery.datatransfer.v1.DataTransferService

 

Methods

`` `CheckValidCreds` ``

Returns true if valid credentials exist for the given data source and requesting user.

`` `CreateTransferConfig` ``

Creates a new data transfer configuration.

`` `DeleteTransferConfig` ``

Deletes a data transfer configuration, including any associated transfer runs and logs.

`` `DeleteTransferRun` ``

Deletes the specified transfer run.

`` `EnrollDataSources` ``

Enroll data sources in a user project.

`` `GetDataSource` ``

Retrieves a supported data source and returns its settings.

`` `GetTransferConfig` ``

Returns information about a data transfer config.

`` `GetTransferResource` ``

Returns a transfer resource.

`` `GetTransferRun` ``

Returns information about the particular transfer run.

`` `ListDataSources` ``

Lists supported data sources and returns their settings.

`` `ListTransferConfigs` ``

Returns information about all transfer configs owned by a project in the specified location.

`` `ListTransferLogs` ``

Returns log messages for the transfer run.

`` `ListTransferResources` ``

Returns information about transfer resources.

`` `ListTransferRuns` ``

Returns information about running and completed transfer runs.

`` `ScheduleTransferRuns`   **(deprecated)** ``

Creates transfer runs for a time range [start_time, end_time].

`` `StartManualTransferRuns` ``

Manually initiates transfer runs.

`` `UnenrollDataSources` ``

Unenroll data sources in a user project.

`` `UpdateTransferConfig` ``

Updates a data transfer configuration.

## google.cloud.location.Locations

 

Methods

`` `GetLocation` ``

Gets information about a location.

`` `ListLocations` ``

Lists information about the supported locations for this service.

Send feedback