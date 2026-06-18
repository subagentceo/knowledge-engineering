# v1 Test permissions for topic (DEPRECATED)

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   Pub/Sub
*   Samples

# v1 Test permissions for topic (DEPRECATED) Stay organized with collections Save and categorize content based on your preferences.

(DEPRECATED) Test permissions for topic

## Code sample

### Go

Before trying this sample, follow the Go setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub Go API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/pubsub"
)

func testPermissions(w io.Writer, projectID, topicID string) ([]string, error) {
	// projectID := "my-project-id"
	// topicID := "my-topic"
	ctx := context.Background()
	client, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		return nil, fmt.Errorf("pubsub.NewClient: %w", err)
	}

	topic := client.Topic(topicID)
	perms, err := topic.IAM().TestPermissions(ctx, []string{
		"pubsub.topics.publish",
		"pubsub.topics.update",
	})
	if err != nil {
		return nil, fmt.Errorf("TestPermissions: %w", err)
	}
	for _, perm := range perms {
		fmt.Fprintf(w, "Allowed: %v\n", perm)
	}
	return perms, nil
}
```

### Ruby

Before trying this sample, follow the Ruby setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub Ruby API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
# topic_id = "your-topic-id"

pubsub = Google::Cloud::Pubsub.new

topic       = pubsub.topic topic_id
permissions = topic.test_permissions "pubsub.topics.attachSubscription",
                                     "pubsub.topics.publish", "pubsub.topics.update"

puts "Permission to attach subscription" if permissions.include? "pubsub.topics.attachSubscription"
puts "Permission to publish" if permissions.include? "pubsub.topics.publish"
puts "Permission to update" if permissions.include? "pubsub.topics.update"
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.