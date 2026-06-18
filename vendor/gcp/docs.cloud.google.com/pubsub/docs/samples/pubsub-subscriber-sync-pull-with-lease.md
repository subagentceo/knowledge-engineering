# Subscribe with synchronous pull and lease management

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   Pub/Sub
*   Samples

# Subscribe with synchronous pull and lease management Stay organized with collections Save and categorize content based on your preferences.

Uses synchronous pull to receive messages and modify their acknowledge deadlines.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Extend ack time with lease management

## Code sample

### C#

Before trying this sample, follow the C# setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub C# API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```

using Google.Cloud.PubSub.V1;
using Grpc.Core;
using System;
using System.Collections.Generic;

public class PullMessageWithLeaseManagementSample
{
    public int PullMessageWithLeaseManagement(string projectId, string subscriptionId, bool acknowledge)
    {
        SubscriptionName subscriptionName = SubscriptionName.FromProjectSubscription(projectId, subscriptionId);
        SubscriberServiceApiClient subscriberClient = SubscriberServiceApiClient.Create();

        var ackIds = new List<string>();
        try
        {
            PullResponse response = subscriberClient.Pull(subscriptionName, maxMessages: 20);

            // Print out each received message.
            foreach (ReceivedMessage msg in response.ReceivedMessages)
            {
                ackIds.Add(msg.AckId);
                string text = msg.Message.Data.ToStringUtf8();
                Console.WriteLine($"Message {msg.Message.MessageId}: {text}");

                // Modify the ack deadline of each received message from the default 10 seconds to 30.
                // This prevents the server from redelivering the message after the default 10 seconds
                // have passed.
                subscriberClient.ModifyAckDeadline(subscriptionName, new List<string> { msg.AckId }, 30);
            }
            // If acknowledgement required, send to server.
            if (acknowledge && ackIds.Count > 0)
            {
                subscriberClient.Acknowledge(subscriptionName, ackIds);
            }
        }
        catch (RpcException ex) when (ex.Status.StatusCode == StatusCode.Unavailable)
        {
            // UNAVAILABLE due to too many concurrent pull requests pending for the given subscription.
        }
        return ackIds.Count;
    }
}
```

### Java

Before trying this sample, follow the Java setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub Java API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```

import com.google.cloud.pubsub.v1.stub.GrpcSubscriberStub;
import com.google.cloud.pubsub.v1.stub.SubscriberStub;
import com.google.cloud.pubsub.v1.stub.SubscriberStubSettings;
import com.google.pubsub.v1.AcknowledgeRequest;
import com.google.pubsub.v1.ModifyAckDeadlineRequest;
import com.google.pubsub.v1.ProjectSubscriptionName;
import com.google.pubsub.v1.PullRequest;
import com.google.pubsub.v1.PullResponse;
import com.google.pubsub.v1.ReceivedMessage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class SubscribeSyncWithLeaseExample {
  public static void main(String... args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "your-project-id";
    String subscriptionId = "your-subscription-id";
    Integer numOfMessages = 10;

    subscribeSyncWithLeaseExample(projectId, subscriptionId, numOfMessages);
  }

  public static void subscribeSyncWithLeaseExample(
      String projectId, String subscriptionId, Integer numOfMessages)
      throws IOException, InterruptedException {
    SubscriberStubSettings subscriberStubSettings =
        SubscriberStubSettings.newBuilder()
            .setTransportChannelProvider(
                SubscriberStubSettings.defaultGrpcTransportProviderBuilder()
                    .setMaxInboundMessageSize(20 << 20) // 20 MB
                    .build())
            .build();

    try (SubscriberStub subscriber = GrpcSubscriberStub.create(subscriberStubSettings)) {

      String subscriptionName = ProjectSubscriptionName.format(projectId, subscriptionId);

      PullRequest pullRequest =
          PullRequest.newBuilder()
              .setMaxMessages(numOfMessages)
              .setSubscription(subscriptionName)
              .build();

      // Use pullCallable().futureCall to asynchronously perform this operation.
      PullResponse pullResponse = subscriber.pullCallable().call(pullRequest);

      // Stop the program if the pull response is empty to avoid acknowledging
      // an empty list of ack IDs.
      if (pullResponse.getReceivedMessagesList().isEmpty()) {
        System.out.println("No message was pulled. Exiting.");
        return;
      }

      List<String> ackIds = new ArrayList<>();
      for (ReceivedMessage message : pullResponse.getReceivedMessagesList()) {
        ackIds.add(message.getAckId());

        // Modify the ack deadline of each received message from the default 10 seconds to 30.
        // This prevents the server from redelivering the message after the default 10 seconds
        // have passed.
        ModifyAckDeadlineRequest modifyAckDeadlineRequest =
            ModifyAckDeadlineRequest.newBuilder()
                .setSubscription(subscriptionName)
                .addAckIds(message.getAckId())
                .setAckDeadlineSeconds(30)
                .build();

        subscriber.modifyAckDeadlineCallable().call(modifyAckDeadlineRequest);
      }

      // Acknowledge received messages.
      AcknowledgeRequest acknowledgeRequest =
          AcknowledgeRequest.newBuilder()
              .setSubscription(subscriptionName)
              .addAllAckIds(ackIds)
              .build();

      // Use acknowledgeCallable().futureCall to asynchronously perform this operation.
      subscriber.acknowledgeCallable().call(acknowledgeRequest);
      System.out.println(pullResponse.getReceivedMessagesList());
    }
  }
}
```

### Ruby

Before trying this sample, follow the Ruby setup instructions in the Pub/Sub quickstart using client libraries. For more information, see the Pub/Sub Ruby API reference documentation.

To authenticate to Pub/Sub, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
# subscription_id = "your-subscription-id"

pubsub = Google::Cloud::PubSub.new
subscriber = pubsub.subscriber subscription_id
new_ack_deadline = 30
processed = false

# The subscriber pulls a specified number of messages.
received_messages = subscriber.pull immediate: false, max: 1
# Obtain the first message.
message = received_messages.first

# Send the message to a non-blocking worker that starts a long-running
# process, such as writing the message to a table, which may take longer than
# the default 10-second acknowledge deadline.
Thread.new do
  sleep 15
  processed = true
  puts "Finished processing \"#{message.data}\"."
end

loop do
  sleep 1
  if processed
    # If the message has been processed, acknowledge the message.
    message.acknowledge!
    puts "Done."
    # Exit after the message is acknowledged.
    break
  else
    # If the message has not yet been processed, reset its ack deadline.
    message.modify_ack_deadline! new_ack_deadline
    puts "Reset ack deadline for \"#{message.data}\" for " \
         "#{new_ack_deadline} seconds."
  end
end
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.