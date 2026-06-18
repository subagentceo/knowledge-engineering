# Publish with ordering keys

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   Pub/Sub
*   Samples

# Publish with ordering keys Stay organized with collections Save and categorize content based on your preferences.

Publishes messages with an ordering key.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Publish messages to topics

## Code sample

### C++

Before trying this sample, follow the C++ setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub C++ API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
namespace pubsub = ::google::cloud::pubsub;
using ::google::cloud::future;
using ::google::cloud::StatusOr;
[](pubsub::Publisher publisher) {
  struct SampleData {
    std::string ordering_key;
    std::string data;
  } data[] = {
      {"key1", "message1"}, {"key2", "message2"}, {"key1", "message3"},
      {"key1", "message4"}, {"key1", "message5"},
  };
  std::vector<future<void>> done;
  for (auto& datum : data) {
    auto message_id =
        publisher.Publish(pubsub::MessageBuilder{}
                              .SetData("Hello World! [" + datum.data + "]")
                              .SetOrderingKey(datum.ordering_key)
                              .Build());
    std::string ack_id = datum.ordering_key + "#" + datum.data;
    done.push_back(message_id.then([ack_id](future<StatusOr<std::string>> f) {
      auto id = f.get();
      if (!id) throw std::move(id).status();
      std::cout << "Message " << ack_id << " published with id=" << *id
                << "\n";
    }));
  }
  publisher.Flush();
  // Block until all the messages are published (optional)
  for (auto& f : done) f.get();
}
```

### C#

Before trying this sample, follow the C# setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub C# API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```

using Google.Cloud.PubSub.V1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

public class PublishOrderedMessagesAsyncSample
{
    public async Task<int> PublishOrderedMessagesAsync(string projectId, string topicId, IEnumerable<(string, string)> keysAndMessages)
    {
        TopicName topicName = TopicName.FromProjectTopic(projectId, topicId);

        var customSettings = new PublisherClient.Settings
        {
            EnableMessageOrdering = true
        };

        PublisherClient publisher = await new PublisherClientBuilder
        {
            TopicName = topicName,
            // Sending messages to the same region ensures they are received in order even when multiple publishers are used.
            Endpoint = "us-east1-pubsub.googleapis.com:443",
            Settings = customSettings
        }.BuildAsync();

        int publishedMessageCount = 0;
        var publishTasks = keysAndMessages.Select(async keyAndMessage =>
        {
            try
            {
                string message = await publisher.PublishAsync(keyAndMessage.Item1, keyAndMessage.Item2);
                Console.WriteLine($"Published message {message}");
                Interlocked.Increment(ref publishedMessageCount);
            }
            catch (Exception exception)
            {
                Console.WriteLine($"An error occurred when publishing message {keyAndMessage.Item2}: {exception.Message}");
            }
        });
        await Task.WhenAll(publishTasks);
        // PublisherClient instance should be shutdown after use.
        // The TimeSpan specifies for how long to attempt to publish locally queued messages.
        await publisher.ShutdownAsync(TimeSpan.FromSeconds(15));
        return publishedMessageCount;
    }
}
```

### Go

Before trying this sample, follow the Go setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub Go API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
import (
	"context"
	"fmt"
	"io"
	"sync"
	"sync/atomic"

	"cloud.google.com/go/pubsub/v2"
	"google.golang.org/api/option"
)

func publishWithOrderingKey(w io.Writer, projectID, topicID string) {
	// projectID := "my-project-id"
	// topicID := "my-topic"
	ctx := context.Background()

	// Pub/Sub's ordered delivery guarantee only applies when publishes for an ordering key are in the same region.
	// For list of locational endpoints for Pub/Sub, see https://cloud.google.com/pubsub/docs/reference/service_apis_overview#list_of_locational_endpoints
	client, err := pubsub.NewClient(ctx, projectID,
		option.WithEndpoint("us-east1-pubsub.googleapis.com:443"))
	if err != nil {
		fmt.Fprintf(w, "pubsub.NewClient: %v", err)
		return
	}
	defer client.Close()

	var wg sync.WaitGroup
	var totalErrors uint64

	// client.Publisher can be passed a topic ID (e.g. "my-topic") or
	// a fully qualified name (e.g. "projects/my-project/topics/my-topic").
	// If a topic ID is provided, the project ID from the client is used.
	// Reuse this publisher for all publish calls to send messages in batches.
	publisher := client.Publisher(topicID)
	publisher.EnableMessageOrdering = true

	messages := []struct {
		message     string
		orderingKey string
	}{
		{
			message:     "message1",
			orderingKey: "key1",
		},
		{
			message:     "message2",
			orderingKey: "key2",
		},
		{
			message:     "message3",
			orderingKey: "key1",
		},
		{
			message:     "message4",
			orderingKey: "key2",
		},
	}

	for _, m := range messages {
		result := publisher.Publish(ctx, &pubsub.Message{
			Data:        []byte(m.message),
			OrderingKey: m.orderingKey,
		})

		wg.Add(1)
		go func(res *pubsub.PublishResult) {
			defer wg.Done()
			// The Get method blocks until a server-generated ID or
			// an error is returned for the published message.
			_, err := res.Get(ctx)
			if err != nil {
				// Error handling code can be added here.
				fmt.Printf("Failed to publish: %s\n", err)
				atomic.AddUint64(&totalErrors, 1)
				return
			}
		}(result)
	}

	wg.Wait()

	if totalErrors > 0 {
		fmt.Fprintf(w, "%d of 4 messages did not publish successfully", totalErrors)
		return
	}

	fmt.Fprint(w, "Published 4 messages with ordering keys successfully\n")
}
```

### Java

Before trying this sample, follow the Java setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub Java API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
import com.google.api.core.ApiFuture;
import com.google.api.core.ApiFutureCallback;
import com.google.api.core.ApiFutures;
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.pubsub.v1.Publisher;
import com.google.common.util.concurrent.MoreExecutors;
import com.google.protobuf.ByteString;
import com.google.pubsub.v1.PubsubMessage;
import com.google.pubsub.v1.TopicName;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class PublishWithOrderingKeys {
  public static void main(String... args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "your-project-id";
    // Choose an existing topic.
    String topicId = "your-topic-id";

    publishWithOrderingKeysExample(projectId, topicId);
  }

  public static void publishWithOrderingKeysExample(String projectId, String topicId)
      throws IOException, InterruptedException {
    TopicName topicName = TopicName.of(projectId, topicId);
    // Create a publisher and set message ordering to true.
    Publisher publisher =
        Publisher.newBuilder(topicName)
            // Sending messages to the same region ensures they are received in order
            // even when multiple publishers are used.
            .setEndpoint("us-east1-pubsub.googleapis.com:443")
            .setEnableMessageOrdering(true)
            .build();

    try {
      Map<String, String> messages = new LinkedHashMap<String, String>();
      messages.put("message1", "key1");
      messages.put("message2", "key2");
      messages.put("message3", "key1");
      messages.put("message4", "key2");

      for (Map.Entry<String, String> entry : messages.entrySet()) {
        ByteString data = ByteString.copyFromUtf8(entry.getKey());
        PubsubMessage pubsubMessage =
            PubsubMessage.newBuilder().setData(data).setOrderingKey(entry.getValue()).build();
        ApiFuture<String> future = publisher.publish(pubsubMessage);

        // Add an asynchronous callback to handle publish success / failure.
        ApiFutures.addCallback(
            future,
            new ApiFutureCallback<String>() {

              @Override
              public void onFailure(Throwable throwable) {
                if (throwable instanceof ApiException) {
                  ApiException apiException = ((ApiException) throwable);
                  // Details on the API exception.
                  System.out.println(apiException.getStatusCode().getCode());
                  System.out.println(apiException.isRetryable());
                }
                System.out.println("Error publishing message : " + pubsubMessage.getData());
              }

              @Override
              public void onSuccess(String messageId) {
                // Once published, returns server-assigned message ids (unique within the topic).
                System.out.println(pubsubMessage.getData() + " : " + messageId);
              }
            },
            MoreExecutors.directExecutor());
      }
    } finally {
      // When finished with the publisher, shutdown to free up resources.
      publisher.shutdown();
      publisher.awaitTermination(1, TimeUnit.MINUTES);
    }
  }
}
```

### PHP

Before trying this sample, follow the PHP setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub PHP API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
use Google\Cloud\PubSub\MessageBuilder;
use Google\Cloud\PubSub\PubSubClient;

/**
 * Publishes a message for a Pub/Sub topic.
 *
 * @param string $projectId  The Google project ID.
 * @param string $topicName  The Pub/Sub topic name.
 */
function publish_with_ordering_keys($projectId, $topicName)
{
    $pubsub = new PubSubClient([
        'projectId' => $projectId,
    ]);

    $topic = $pubsub->topic($topicName);
    foreach (range(1, 5) as $i) {
        $topic->publish((new MessageBuilder(['orderingKey' => 'foo']))
            ->setData('message' . $i)->build(), ['enableMessageOrdering' => true]);
    }

    print('Message published' . PHP_EOL);
}
```

### Ruby

Before trying this sample, follow the Ruby setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub Ruby API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
# topic_id = "your-topic-id"

pubsub = Google::Cloud::PubSub.new
# Start sending messages in one request once the size of all queued messages
# reaches 1 MB or the number of queued messages reaches 20
publisher = pubsub.publisher topic_id, async: {
  max_bytes:    1_000_000,
  max_messages: 20
}

publisher.enable_message_ordering!
10.times do |i|
  publisher.publish_async "This is message ##{i}.",
                          ordering_key: "ordering-key"
end

# Stop the async_publisher to send all queued messages immediately.
publisher.async_publisher.stop!
puts "Messages published with ordering key."
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.