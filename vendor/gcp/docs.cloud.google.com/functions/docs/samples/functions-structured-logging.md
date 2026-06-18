# Write structured Logging in Cloud Functions

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

If you are creating a new function, see the Console Quickstart on Cloud Run.

*   Home
*   Documentation
*   Application hosting
*   Cloud Run
*   Cloud Run functions
*   Samples

# Write structured Logging in Cloud Functions Stay organized with collections Save and categorize content based on your preferences.

This sample demonstrates how to write structured logs in Cloud Functions using the Google Cloud logging client. Structured logs provide a more detailed and organized way to record information about your application, making it easier to troubleshoot and analyze issues.

## Code sample

### Node.js

To authenticate to Cloud Run functions, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
const {Logging} = require('@google-cloud/logging');
const functions = require('@google-cloud/functions-framework');
const pkg = require('./package.json');

functions.http('structuredLogging', async (req, res) => {
  // Initialize the logging client
  const logging = new Logging();
  // Required to capture your project id
  await logging.setProjectId();
  // Create a LogSync transport, defaulting to process.stdout
  const log = logging.logSync(pkg.name);
  const text = 'Hello, world!';
  // Create a structured log entry with severity,
  // additional component fields, and HTTP request.
  // Appending the httpRequest enables log correlation.
  const metadata = {
    severity: 'NOTICE',
    component: 'arbitrary-property',
    httpRequest: req,
  };
  // Prepares a log entry
  const entry = log.entry(metadata, text);
  log.write(entry);
  res.status(200).send('Success: A log message was written');
});
```

### Python

To authenticate to Cloud Run functions, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
import logging

import functions_framework
from google.cloud.logging import Client


@functions_framework.http
def structured_logging(request):
    # Initialize the Google Cloud logging client
    cloud_logging_client = Client()
    # Set up a Log Handler that exports logs in JSON format to stdout
    # when running in a serverless environment.
    # To manually set up a Structured Log Handler, see
    # https://googleapis.dev/python/logging/latest/handlers-structured-log.html
    cloud_logging_client.setup_logging()

    # Construct log message and additional metadata
    # https://cloud.google.com/run/docs/logging#using-json
    msg = "Hello, world!"
    metadata = {"component": "arbitrary-property"}

    # Write structured log with additional component fields
    # HTTP request data is attached automatically for request-log correlation
    logging.info(msg, extra={"json_fields": metadata})

    return "Success: A log message was written"
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.