# Avoid infinite retries in Cloud Functions

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

If you are creating a new function, see the Console Quickstart on Cloud Run.

*   Home
*   Documentation
*   Application hosting
*   Cloud Run
*   Cloud Run functions
*   Samples

# Avoid infinite retries in Cloud Functions Stay organized with collections Save and categorize content based on your preferences.

This sample demonstrates how to avoid infinite retries in Cloud Functions by only executing within a certain time period after the triggering event.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Configure event-driven function retries

## Code sample

### Go

To authenticate to Cloud Run functions, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```

// Package tips contains tips for writing Cloud Functions in Go.
package tips

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/cloudevents/sdk-go/v2/event"
)

func init() {
	functions.CloudEvent("FiniteRetryPubSub", FiniteRetryPubSub)
}

// MessagePublishedData contains the full Pub/Sub message
// See the documentation for more details:
// https://cloud.google.com/eventarc/docs/cloudevents#pubsub
type MessagePublishedData struct {
	Message PubSubMessage
}

// PubSubMessage is the payload of a Pub/Sub event.
// See the documentation for more details:
// https://cloud.google.com/pubsub/docs/reference/rest/v1/PubsubMessage
type PubSubMessage struct {
	Data []byte `json:"data"`
}

// FiniteRetryPubSub demonstrates how to avoid inifinite retries.
func FiniteRetryPubSub(ctx context.Context, e event.Event) error {
	var msg MessagePublishedData
	if err := e.DataAs(&msg); err != nil {
		return fmt.Errorf("event.DataAs: %w", err)
	}

	// Ignore events that are too old.
	expiration := e.Time().Add(10 * time.Second)
	if time.Now().After(expiration) {
		log.Printf("event timeout: halting retries for expired event '%q'", e.ID())
		return nil
	}

	// Add your message processing logic.
	return processTheMessage(msg)
}
```

### Java

To authenticate to Cloud Run functions, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```

import com.google.cloud.functions.CloudEventsFunction;
import io.cloudevents.CloudEvent;
import java.time.Duration;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.logging.Logger;

public class RetryTimeout implements CloudEventsFunction {
  private static final Logger logger = Logger.getLogger(RetryTimeout.class.getName());
  private static final long MAX_EVENT_AGE = 10_000;

  /**
   * Cloud Event Function that only executes within
   * a certain time period after the triggering event
   */
  @Override
  public void accept(CloudEvent event) throws Exception {
    ZonedDateTime utcNow = ZonedDateTime.now(ZoneOffset.UTC);
    ZonedDateTime timestamp = event.getTime().atZoneSameInstant(ZoneOffset.UTC);

    long eventAge = Duration.between(timestamp, utcNow).toMillis();

    // Ignore events that are too old
    if (eventAge > MAX_EVENT_AGE) {
      logger.info(String.format("Dropping event with timestamp %s.", timestamp));
      return;
    }

    // Process events that are recent enough
    // To retry this invocation, throw an exception here
    logger.info(String.format("Processing event with timestamp %s.", timestamp));
  }
}
```

### Node.js

To authenticate to Cloud Run functions, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
const functions = require('@google-cloud/functions-framework');

/**
 * Cloud Event Function that only executes within
 * a certain time period after the triggering event
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} callback The callback function.
 */
functions.cloudEvent('avoidInfiniteRetries', (event, callback) => {
  const eventAge = Date.now() - Date.parse(event.time);
  const eventMaxAge = 10000;

  // Ignore events that are too old
  if (eventAge > eventMaxAge) {
    console.log(`Dropping event ${event} with age ${eventAge} ms.`);
    callback();
    return;
  }

  // Do what the function is supposed to do
  console.log(`Processing event ${event} with age ${eventAge} ms.`);

  // Retry failed function executions
  const failed = false;
  if (failed) {
    callback('some error');
  } else {
    callback();
  }
});
```

### Python

To authenticate to Cloud Run functions, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
from datetime import datetime, timezone

# The 'python-dateutil' package must be included in requirements.txt.
from dateutil import parser

import functions_framework


@functions_framework.cloud_event
def avoid_infinite_retries(cloud_event):
    """Cloud Event Function that only executes within a certain
    time period after the triggering event.

    Args:
        cloud_event: The cloud event associated with the current trigger
    Returns:
        None; output is written to Cloud Logging
    """
    timestamp = cloud_event["time"]

    event_time = parser.parse(timestamp)
    event_age = (datetime.now(timezone.utc) - event_time).total_seconds()
    event_age_ms = event_age * 1000

    # Ignore events that are too old
    max_age_ms = 10000
    if event_age_ms > max_age_ms:
        print("Dropped {} (age {}ms)".format(cloud_event["id"], event_age_ms))
        return "Timeout"

    # Do what the function is supposed to do
    print("Processed {} (age {}ms)".format(cloud_event["id"], event_age_ms))
    return  # To retry the execution, raise an exception here
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.