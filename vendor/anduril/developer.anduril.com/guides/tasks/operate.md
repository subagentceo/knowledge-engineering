> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Operate on tasks

Operators use the Tasks API to monitor and manage tasks across their operational domain.

The `StreamTasks` ([REST](/reference/rest/tasks/stream-tasks) | [gRPC](/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-stream-tasks))
API provides centralized visibility into task creation, updates, and status changes for all tasks in your environment.
The `CancelTask` ([REST](/reference/rest/tasks/cancel-task) | [gRPC](/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-cancel-task))
API allows you to request cancellation of tasks that are no longer needed.

## Before you begin

* To monitor tasks, [set up](/guides/getting-started/set-up) your Lattice environment.
* Familiarize yourself with [tasks](/guides/tasks/overview) and the task lifecycle.

If you are using gRPC with client credentials, [set up the token refresh module](/guides/getting-started/authenticate#using-grpc) before running the examples on this page.

## Monitor tasks

The `StreamTasks` ([REST](/reference/rest/tasks/stream-tasks) | [gRPC](/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-stream-tasks))
API establishes a server-sent events (SSE) stream that notifies your application about task updates:

In the following example, we specify a prefix for the task stream:

```go title={"Go (REST)"} startLine={41} maxLines={25}
package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	Lattice "github.com/anduril/lattice-sdk-go/v4"
	"github.com/anduril/lattice-sdk-go/v4/client"
	"github.com/anduril/lattice-sdk-go/v4/option"
)

func main() {
	// Get environment variables
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	clientId := os.Getenv("LATTICE_CLIENT_ID")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Check required environment variables
	if latticeEndpoint == "" || clientId == "" || clientSecret == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Initialize headers for sandbox authorization
	headers := http.Header{}
	headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))
	// Create the client
	LatticeClient := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)

	fmt.Println("Starting task stream...")

	ctx := context.Background()

	// Create task stream request
	request := &Lattice.TaskStreamRequest{
		HeartbeatIntervalMs:     Lattice.Int(10000),
		ExcludePreexistingTasks: Lattice.Bool(false),
		TaskType: &Lattice.TaskStreamRequestTaskType{
			TaskStreamRequestTaskTypeTaskTypePrefix: &Lattice.TaskStreamRequestTaskTypeTaskTypePrefix{
				// Define a prefix filter for tasks that belong to your organization
				TaskTypePrefix: "type.googleapis.com/<your-organization>.tasks",
			},
		},
	}

	// Start the task stream
	stream, err := LatticeClient.Tasks.StreamTasks(ctx, request)
	if err != nil {
		fmt.Printf("Failed to start task stream: %v\n", err)
		return
	}
	defer stream.Close()

	// Process the stream events as they arrive
	for {
		event, err := stream.Recv()
		if err != nil {
			fmt.Printf("Error receiving task stream event: %v\n", err)
			return
		}

		if event.Event == "heartbeat" {
			// Process heartbeat events
			timestamp := *event.GetHeartbeat().GetTimestamp()
			fmt.Printf("Heartbeat: %v\n", timestamp)
		} else {
			task := event.GetTaskEvent().GetTaskEvent().GetTask()
			taskId := task.GetVersion().GetTaskID()
			status := task.GetStatus().GetStatus()

			fmt.Printf("  TaskID: %v\n", *taskId)
			fmt.Printf("  Status: %v\n", *status)
		}
	}
}

```

```java title={"Java (REST)"} startLine={40} maxLines={25}
package org.example;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import com.anduril.AsyncLattice;
import com.anduril.resources.tasks.requests.TaskStreamRequest;
import com.anduril.resources.tasks.types.StreamTasksResponse;
import com.anduril.resources.tasks.types.TaskStreamRequestTaskType;
import com.anduril.resources.tasks.types.TaskStreamRequestTaskTypeTaskTypePrefix;
import com.anduril.types.Task;

/**
 * StreamTasks demonstrates how to use the Lattice SDK to stream task events.
 */
public class StreamTasks {
    public static void main(String[] args) {
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        // Remove sandboxesToken from the following statements if you are not developing on Sandboxes.
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");

        if (endpoint == null || clientId == null || clientSecret == null || sandboxesToken == null) {
            System.err.println("Missing required environment variables");
            System.exit(1);
        }
        if (!endpoint.startsWith("https://")) endpoint = "https://" + endpoint;

        try {
            // Initialize the Lattice client
            AsyncLattice client = AsyncLattice.builder()
                .url(endpoint)
                .credentials(clientId, clientSecret)
                // Remove the following if you are not developing on Sandboxes.
                .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
                .build();

            streamTasks(client);
        } catch (Exception e) {
            System.err.println("Failed to initialize: " + e.getMessage());
        }
    }

    /**
     * Stream tasks and process events as they arrive.
     *
     * @param client Lattice client
     */
    private static void streamTasks(AsyncLattice client) {
        System.out.println("Starting task stream");

        try {
            // Define a prefix filter for tasks that belong to your organization
            TaskStreamRequestTaskTypeTaskTypePrefix taskTypePrefix = TaskStreamRequestTaskTypeTaskTypePrefix.builder()
                .taskTypePrefix("type.googleapis.com/<your-organization>.tasks")
                .build();

            // Create task stream request
            TaskStreamRequest request = TaskStreamRequest.builder()
                .heartbeatIntervalMs(10000) // Send heartbeats every 10 seconds (default: 30 seconds)
                .excludePreexistingTasks(false) // Include tasks that existed before starting the stream
                .taskType(TaskStreamRequestTaskType.of(taskTypePrefix))
                .build();

            // Start streaming tasks
            CompletableFuture<Iterable<StreamTasksResponse>> streamFuture = client.tasks().streamTasks(request);

            // Process the stream events as they arrive
            Iterable<StreamTasksResponse> stream = streamFuture.get();
            for (StreamTasksResponse event : stream) {
                if (event.getHeartbeat() != null && event.getHeartbeat().isPresent()) {
                    // Process heartbeat events
                    String timestamp = event.getHeartbeat().get().getTimestamp().get();
                    System.out.println("Heartbeat: " + timestamp);
                } else if (event.getTaskEvent() != null && event.getTaskEvent().isPresent()) {
                    // Process task events
                    Task task = event.getTaskEvent().get()
                        .getTaskEvent().get()
                        .getTask().get();
                    String taskDescription = task.getDescription().get();

                    // Extract and print relevant task information
                    String taskId = task.getVersion().get().getTaskId().get();
                    String status = task.getStatus().get().toString();

                    System.out.println("Task Event: " + taskDescription);
                    System.out.println("  TaskID: " + taskId);
                    System.out.println("  Status: " + status);
                } else {
                    System.out.println("Unknown event type");
                }
            }
        } catch (ExecutionException e) {
            System.err.println("Execution error during task streaming: " + e.getCause().getMessage());
        } catch (InterruptedException e) {
            System.err.println("Task streaming interrupted: " + e.getMessage());
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            System.err.println("Error during task streaming: " + e.getMessage());
        }
    }
}

```

```py title={"Python (REST)"} startLine={27} maxLines={25}
from anduril import AsyncLattice
from anduril import TaskStreamRequestTaskTypeTaskTypePrefix
import asyncio
import os
import sys

lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')

# Remove sandboxes_token from the following statements if you are not developing on Sandboxes.
sandboxes_token = os.getenv('SANDBOXES_TOKEN')
if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
    print("Missing environment variables.")
    sys.exit(1)

# Initialize the Lattice client
client = AsyncLattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    # Remove the following header if you are not developing on Sandboxes.
    headers={"anduril-sandbox-authorization": f"Bearer {sandboxes_token}"}
)

async def stream_tasks():
    try:
        print("Starting task stream")

        # Stream tasks with various configuration options
        task_stream = client.tasks.stream_tasks(
            heartbeat_interval_ms=10000,  # Send heartbeats every 10 seconds (default: 30 seconds)
            exclude_preexisting_tasks=False,  # Include tasks that existed before starting the stream
            task_type=TaskStreamRequestTaskTypeTaskTypePrefix(
                # Define a prefix filter only tasks that belong to your orgnaization
                task_type_prefix="type.googleapis.com/<your-organization>.tasks"
            )
        )

        # Process the stream events as they arrive
        async for event in task_stream:
            if event.event == "heartbeat":
                print(f"Heartbeat: {event.timestamp}")
            elif event.event == "task_event" and event.task_event and event.task_event.task:
                task = event.task_event.task
                if task.version and task.status:
                    print(f"Task Event: {event.task_event.event_type}")
                    print(f"  TaskID: {task.version.task_id}")
                    print(f"  Status: {task.status.status}")
            else:
                print(f"Unknown event type: {event.event}")

    except asyncio.CancelledError:
        print("Task streaming cancelled.")
    except Exception as error:
        print(f"Exception during task streaming: {error}")

if __name__ == "__main__":
    asyncio.run(stream_tasks())

```

```ts title={"TypeScript (REST)"} startLine={20} maxLines={25}
import { LatticeClient } from "@anduril-industries/lattice-sdk";

const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;
// Remove sandboxesToken from the following statement if you are not developing on Sandboxes.
const sandboxesToken = process.env.SANDBOXES_TOKEN;

if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.log('Missing required environment variables.');
    process.exit(1);
}

const client = new LatticeClient(
    {
        baseUrl: `https://${latticeEndpoint}`,
        clientId: clientId,
        clientSecret: clientSecret,
        // Remove the following if you are not developing on Sandboxes.
        headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    }
);

async function streamTasks() {
    try {
        console.log("Starting task stream");

        // Stream tasks with various configuration options
        const taskStream = await client.tasks.streamTasks({
            heartbeatIntervalMs: 10000, // Send heartbeats every 10 seconds (default: 30 seconds)
            excludePreexistingTasks: false, // Include tasks that existed before starting the stream
            // Define a prefix filter for tasks that belong to your organization
            taskType: {
                taskTypePrefix: "type.googleapis.com/<your-organization>.tasks"
            }
        });

        // Process the stream events as they arrive
        for await (const event of taskStream) {
            if (event.event === "heartbeat") {
                console.log(`Heartbeat: ${event?.timestamp}`);
                continue;
            } else {
                console.log(`Task ID: ${event?.taskEvent?.task?.version?.taskId}`)
                console.log(`Task status: ${event?.taskEvent?.task?.status?.status}`)
            }
        }
    } catch (error) {
        console.log(`Exception during task streaming: ${error}`);
    }
}

streamTasks();

```

```go title={"Go (gRPC)"} startLine={53} maxLines={30}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/taskmanager/v1/taskmanagerv1grpc"
	taskmanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/taskmanager/v1"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Setup authentication
	auth := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")),
		grpc.WithPerRPCCredentials(auth),
	}

	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	client := taskmanagerv1grpc.NewTaskManagerAPIClient(conn)

	fmt.Println("Starting task stream...")

	ctx := context.Background()

	// Create task stream request
	request := &taskmanagerv1.StreamTasksRequest{
		HeartbeatIntervalMs:     35000,
		ExcludePreexistingTasks: false,
		TaskType: &taskmanagerv1.StreamTasksRequest_TaskTypePrefix{
			// Filter the stream to only receive your tasks in the stream
			TaskTypePrefix: "type.googleapis.com/<YOUR_ORGANIZATION>",
		},
	}

	// Start the task stream
	stream, err := client.StreamTasks(ctx, request)
	if err != nil {
		fmt.Printf("Failed to start task stream: %v\n", err)
		return
	}

	// Process the stream events as they arrive
	for {
		response, err := stream.Recv()
		if err == io.EOF {
			fmt.Println("Stream ended")
			return
		}
		if err != nil {
			fmt.Printf("Error receiving task stream event: %v\n", err)
			return
		}
		print(response)
		if response.GetHeartbeat() != nil {
			// Process heartbeat events
			timestamp := response.GetHeartbeat().GetTimestamp()
			fmt.Printf("Heartbeat: %v\n", timestamp.AsTime())
		} else if response.GetTaskEvent() != nil {
			// Process task events
			task := response.GetTaskEvent().GetTask()
			taskId := task.GetVersion().GetTaskId()
			status := task.GetStatus().GetStatus()

			fmt.Printf("  TaskID: %v\n", taskId)
			fmt.Printf("  Status: %v\n", status)
		}
	}
}

```

```py title={"Python (gRPC)"} startLine={40} maxLines={20}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import grpc
from auth import ClientCredentialsAuth

from anduril.taskmanager.v1.task_manager_api.pub_pb2 import StreamTasksRequest
from anduril.taskmanager.v1.task_manager_api.pub_pb2_grpc import TaskManagerAPIStub


def main():
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
        print("Missing required environment variables", file=sys.stderr)
        sys.exit(1)

    auth = ClientCredentialsAuth(
        client_id=client_id,
        client_secret=client_secret,
        sandboxes_token=sandboxes_token,
        endpoint=f"https://{lattice_endpoint}/api/v1/oauth/token",
    )

    credentials = grpc.ssl_channel_credentials()
    channel = grpc.intercept_channel(
        grpc.secure_channel(lattice_endpoint, credentials),
        auth.create_metadata_interceptor(),
    )

    client = TaskManagerAPIStub(channel)

    print("Starting task stream...")

    request = StreamTasksRequest(
        heartbeat_interval_ms=35000,
        exclude_preexisting_tasks=False,
        # Filter the stream to only receive your tasks in the stream
        task_type_prefix="type.googleapis.com/<YOUR_ORGANIZATION>",
    )

    try:
        stream = client.StreamTasks(request)
    except Exception as error:
        print(f"Failed to start task stream: {error}", file=sys.stderr)
        return

    for response in stream:
        if response.HasField("heartbeat"):
            timestamp = response.heartbeat.timestamp.ToDatetime()
            print(f"Heartbeat: {timestamp}")
        elif response.HasField("task_event"):
            task = response.task_event.task
            task_id = task.version.task_id
            status = task.status.status
            print(f"  TaskID: {task_id}")
            print(f"  Status: {status}")


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={60} maxLines={30}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::taskmanager::v1::{
    stream_tasks_request, StreamTasksRequest,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::taskmanager::v1::tonic::task_manager_api_client::TaskManagerApiClient;
use auth::ClientCredentialsAuth;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client_id = env::var("LATTICE_CLIENT_ID")
        .expect("LATTICE_CLIENT_ID environment variable not set");
    let client_secret = env::var("LATTICE_CLIENT_SECRET")
        .expect("LATTICE_CLIENT_SECRET environment variable not set");
    let lattice_endpoint = env::var("LATTICE_ENDPOINT")
        .expect("LATTICE_ENDPOINT environment variable not set");
    let sandboxes_token = env::var("SANDBOXES_TOKEN")
        .expect("SANDBOXES_TOKEN environment variable not set");

    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token,
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    let tls_config = ClientTlsConfig::new().with_native_roots();
    let channel = Channel::from_shared(format!("https://{}", lattice_endpoint))?
        .tls_config(tls_config)?
        .connect()
        .await?;

    let access_token = auth.get_token().await?;
    let sandboxes_token = auth.sandboxes_token();
    let auth_header: MetadataValue<_> = format!("Bearer {}", access_token).parse()?;
    let sandbox_header: MetadataValue<_> = format!("Bearer {}", sandboxes_token).parse()?;

    let mut client = TaskManagerApiClient::with_interceptor(
        channel,
        move |mut req: Request<()>| {
            req.metadata_mut()
                .insert("authorization", auth_header.clone());
            req.metadata_mut()
                .insert("anduril-sandbox-authorization", sandbox_header.clone());
            Ok(req)
        },
    );

    println!("Starting task stream...");

    // Create task stream request. The task_type_prefix filters the stream so
    // that only task types matching the prefix are delivered.
    let request = Request::new(StreamTasksRequest {
        heartbeat_interval_ms: 35_000,
        exclude_preexisting_tasks: false,
        task_type: Some(stream_tasks_request::TaskType::TaskTypePrefix(
            "type.googleapis.com/<YOUR_ORGANIZATION>".to_string(),
        )),
        ..Default::default()
    });

    // Start the task stream
    let mut stream = match client.stream_tasks(request).await {
        Ok(resp) => resp.into_inner(),
        Err(e) => {
            eprintln!("Failed to start task stream: {}", e);
            return Ok(());
        }
    };

    // Process the stream events as they arrive
    loop {
        let response = match stream.message().await {
            Ok(Some(r)) => r,
            Ok(None) => {
                println!("Stream ended");
                break;
            }
            Err(e) => {
                eprintln!("Error receiving task stream event: {}", e);
                break;
            }
        };

        if let Some(heartbeat) = response.heartbeat {
            // Process heartbeat events
            if let Some(ts) = heartbeat.timestamp {
                println!("Heartbeat: {}.{:09}", ts.seconds, ts.nanos);
            }
        } else if let Some(task_event) = response.task_event {
            // Process task events
            if let Some(task) = task_event.task {
                let task_id = task
                    .version
                    .as_ref()
                    .map(|v| v.task_id.clone())
                    .unwrap_or_default();
                let status = task
                    .status
                    .as_ref()
                    .map(|s| s.status)
                    .unwrap_or(0);
                println!("  TaskID: {}", task_id);
                println!("  Status: {}", status);
            }
        }
    }

    Ok(())
}

```

The `StreamTasks` method accepts the following parameters:

The interval in milliseconds at which the server sends heartbeat events (default: 30000 ms).
Use heartbeats to verify the connection is still active.

When set to `true`, the stream will only include tasks created after the stream starts.
When `false` (default), existing tasks will also be included in the stream.

Specifies which task types to include in the stream. Can filter by exact match or by prefix.

Only include tasks whose type starts with the specified prefix.
For example, `type.googleapis.com/<your-organization.tasks>`.

Only include tasks specified in the list. You must list the full URL of the
task definition for each of the tasks you want to filter from the stream.

Process the different types of events that arrive through the stream:

```go title={"Go (REST)"} startLine={60} maxLines={30}
package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	Lattice "github.com/anduril/lattice-sdk-go/v4"
	"github.com/anduril/lattice-sdk-go/v4/client"
	"github.com/anduril/lattice-sdk-go/v4/option"
)

func main() {
	// Get environment variables
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	clientId := os.Getenv("LATTICE_CLIENT_ID")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Check required environment variables
	if latticeEndpoint == "" || clientId == "" || clientSecret == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Initialize headers for sandbox authorization
	headers := http.Header{}
	headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))
	// Create the client
	LatticeClient := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)

	fmt.Println("Starting task stream...")

	ctx := context.Background()

	// Create task stream request
	request := &Lattice.TaskStreamRequest{
		HeartbeatIntervalMs:     Lattice.Int(10000),
		ExcludePreexistingTasks: Lattice.Bool(false),
		TaskType: &Lattice.TaskStreamRequestTaskType{
			TaskStreamRequestTaskTypeTaskTypePrefix: &Lattice.TaskStreamRequestTaskTypeTaskTypePrefix{
				// Define a prefix filter for tasks that belong to your organization
				TaskTypePrefix: "type.googleapis.com/<your-organization>.tasks",
			},
		},
	}

	// Start the task stream
	stream, err := LatticeClient.Tasks.StreamTasks(ctx, request)
	if err != nil {
		fmt.Printf("Failed to start task stream: %v\n", err)
		return
	}
	defer stream.Close()

	// Process the stream events as they arrive
	for {
		event, err := stream.Recv()
		if err != nil {
			fmt.Printf("Error receiving task stream event: %v\n", err)
			return
		}

		if event.Event == "heartbeat" {
			// Process heartbeat events
			timestamp := *event.GetHeartbeat().GetTimestamp()
			fmt.Printf("Heartbeat: %v\n", timestamp)
		} else {
			task := event.GetTaskEvent().GetTaskEvent().GetTask()
			taskId := task.GetVersion().GetTaskID()
			status := task.GetStatus().GetStatus()

			fmt.Printf("  TaskID: %v\n", *taskId)
			fmt.Printf("  Status: %v\n", *status)
		}
	}
}

```

```java title={"Java (REST)"} startLine={70} maxLines={30}
package org.example;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import com.anduril.AsyncLattice;
import com.anduril.resources.tasks.requests.TaskStreamRequest;
import com.anduril.resources.tasks.types.StreamTasksResponse;
import com.anduril.resources.tasks.types.TaskStreamRequestTaskType;
import com.anduril.resources.tasks.types.TaskStreamRequestTaskTypeTaskTypePrefix;
import com.anduril.types.Task;

/**
 * StreamTasks demonstrates how to use the Lattice SDK to stream task events.
 */
public class StreamTasks {
    public static void main(String[] args) {
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        // Remove sandboxesToken from the following statements if you are not developing on Sandboxes.
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");

        if (endpoint == null || clientId == null || clientSecret == null || sandboxesToken == null) {
            System.err.println("Missing required environment variables");
            System.exit(1);
        }
        if (!endpoint.startsWith("https://")) endpoint = "https://" + endpoint;

        try {
            // Initialize the Lattice client
            AsyncLattice client = AsyncLattice.builder()
                .url(endpoint)
                .credentials(clientId, clientSecret)
                // Remove the following if you are not developing on Sandboxes.
                .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
                .build();

            streamTasks(client);
        } catch (Exception e) {
            System.err.println("Failed to initialize: " + e.getMessage());
        }
    }

    /**
     * Stream tasks and process events as they arrive.
     *
     * @param client Lattice client
     */
    private static void streamTasks(AsyncLattice client) {
        System.out.println("Starting task stream");

        try {
            // Define a prefix filter for tasks that belong to your organization
            TaskStreamRequestTaskTypeTaskTypePrefix taskTypePrefix = TaskStreamRequestTaskTypeTaskTypePrefix.builder()
                .taskTypePrefix("type.googleapis.com/<your-organization>.tasks")
                .build();

            // Create task stream request
            TaskStreamRequest request = TaskStreamRequest.builder()
                .heartbeatIntervalMs(10000) // Send heartbeats every 10 seconds (default: 30 seconds)
                .excludePreexistingTasks(false) // Include tasks that existed before starting the stream
                .taskType(TaskStreamRequestTaskType.of(taskTypePrefix))
                .build();

            // Start streaming tasks
            CompletableFuture<Iterable<StreamTasksResponse>> streamFuture = client.tasks().streamTasks(request);

            // Process the stream events as they arrive
            Iterable<StreamTasksResponse> stream = streamFuture.get();
            for (StreamTasksResponse event : stream) {
                if (event.getHeartbeat() != null && event.getHeartbeat().isPresent()) {
                    // Process heartbeat events
                    String timestamp = event.getHeartbeat().get().getTimestamp().get();
                    System.out.println("Heartbeat: " + timestamp);
                } else if (event.getTaskEvent() != null && event.getTaskEvent().isPresent()) {
                    // Process task events
                    Task task = event.getTaskEvent().get()
                        .getTaskEvent().get()
                        .getTask().get();
                    String taskDescription = task.getDescription().get();

                    // Extract and print relevant task information
                    String taskId = task.getVersion().get().getTaskId().get();
                    String status = task.getStatus().get().toString();

                    System.out.println("Task Event: " + taskDescription);
                    System.out.println("  TaskID: " + taskId);
                    System.out.println("  Status: " + status);
                } else {
                    System.out.println("Unknown event type");
                }
            }
        } catch (ExecutionException e) {
            System.err.println("Execution error during task streaming: " + e.getCause().getMessage());
        } catch (InterruptedException e) {
            System.err.println("Task streaming interrupted: " + e.getMessage());
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            System.err.println("Error during task streaming: " + e.getMessage());
        }
    }
}

```

```py title={"Python (REST)"} startLine={41} maxLines={30}
from anduril import AsyncLattice
from anduril import TaskStreamRequestTaskTypeTaskTypePrefix
import asyncio
import os
import sys

lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')

# Remove sandboxes_token from the following statements if you are not developing on Sandboxes.
sandboxes_token = os.getenv('SANDBOXES_TOKEN')
if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
    print("Missing environment variables.")
    sys.exit(1)

# Initialize the Lattice client
client = AsyncLattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    # Remove the following header if you are not developing on Sandboxes.
    headers={"anduril-sandbox-authorization": f"Bearer {sandboxes_token}"}
)

async def stream_tasks():
    try:
        print("Starting task stream")

        # Stream tasks with various configuration options
        task_stream = client.tasks.stream_tasks(
            heartbeat_interval_ms=10000,  # Send heartbeats every 10 seconds (default: 30 seconds)
            exclude_preexisting_tasks=False,  # Include tasks that existed before starting the stream
            task_type=TaskStreamRequestTaskTypeTaskTypePrefix(
                # Define a prefix filter only tasks that belong to your orgnaization
                task_type_prefix="type.googleapis.com/<your-organization>.tasks"
            )
        )

        # Process the stream events as they arrive
        async for event in task_stream:
            if event.event == "heartbeat":
                print(f"Heartbeat: {event.timestamp}")
            elif event.event == "task_event" and event.task_event and event.task_event.task:
                task = event.task_event.task
                if task.version and task.status:
                    print(f"Task Event: {event.task_event.event_type}")
                    print(f"  TaskID: {task.version.task_id}")
                    print(f"  Status: {task.status.status}")
            else:
                print(f"Unknown event type: {event.event}")

    except asyncio.CancelledError:
        print("Task streaming cancelled.")
    except Exception as error:
        print(f"Exception during task streaming: {error}")

if __name__ == "__main__":
    asyncio.run(stream_tasks())

```

```ts title={"TypeScript (REST)"} startLine={41} maxLines={30}
import { LatticeClient } from "@anduril-industries/lattice-sdk";

const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;
// Remove sandboxesToken from the following statement if you are not developing on Sandboxes.
const sandboxesToken = process.env.SANDBOXES_TOKEN;

if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.log('Missing required environment variables.');
    process.exit(1);
}

const client = new LatticeClient(
    {
        baseUrl: `https://${latticeEndpoint}`,
        clientId: clientId,
        clientSecret: clientSecret,
        // Remove the following if you are not developing on Sandboxes.
        headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    }
);

async function streamTasks() {
    try {
        console.log("Starting task stream");

        // Stream tasks with various configuration options
        const taskStream = await client.tasks.streamTasks({
            heartbeatIntervalMs: 10000, // Send heartbeats every 10 seconds (default: 30 seconds)
            excludePreexistingTasks: false, // Include tasks that existed before starting the stream
            // Define a prefix filter for tasks that belong to your organization
            taskType: {
                taskTypePrefix: "type.googleapis.com/<your-organization>.tasks"
            }
        });

        // Process the stream events as they arrive
        for await (const event of taskStream) {
            if (event.event === "heartbeat") {
                console.log(`Heartbeat: ${event?.timestamp}`);
                continue;
            } else {
                console.log(`Task ID: ${event?.taskEvent?.task?.version?.taskId}`)
                console.log(`Task status: ${event?.taskEvent?.task?.status?.status}`)
            }
        }
    } catch (error) {
        console.log(`Exception during task streaming: ${error}`);
    }
}

streamTasks();

```

```go title={"Go (gRPC)"} startLine={70} maxLines={30}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/taskmanager/v1/taskmanagerv1grpc"
	taskmanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/taskmanager/v1"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Setup authentication
	auth := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")),
		grpc.WithPerRPCCredentials(auth),
	}

	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	client := taskmanagerv1grpc.NewTaskManagerAPIClient(conn)

	fmt.Println("Starting task stream...")

	ctx := context.Background()

	// Create task stream request
	request := &taskmanagerv1.StreamTasksRequest{
		HeartbeatIntervalMs:     35000,
		ExcludePreexistingTasks: false,
		TaskType: &taskmanagerv1.StreamTasksRequest_TaskTypePrefix{
			// Filter the stream to only receive your tasks in the stream
			TaskTypePrefix: "type.googleapis.com/<YOUR_ORGANIZATION>",
		},
	}

	// Start the task stream
	stream, err := client.StreamTasks(ctx, request)
	if err != nil {
		fmt.Printf("Failed to start task stream: %v\n", err)
		return
	}

	// Process the stream events as they arrive
	for {
		response, err := stream.Recv()
		if err == io.EOF {
			fmt.Println("Stream ended")
			return
		}
		if err != nil {
			fmt.Printf("Error receiving task stream event: %v\n", err)
			return
		}
		print(response)
		if response.GetHeartbeat() != nil {
			// Process heartbeat events
			timestamp := response.GetHeartbeat().GetTimestamp()
			fmt.Printf("Heartbeat: %v\n", timestamp.AsTime())
		} else if response.GetTaskEvent() != nil {
			// Process task events
			task := response.GetTaskEvent().GetTask()
			taskId := task.GetVersion().GetTaskId()
			status := task.GetStatus().GetStatus()

			fmt.Printf("  TaskID: %v\n", taskId)
			fmt.Printf("  Status: %v\n", status)
		}
	}
}

```

```py title={"Python (gRPC)"} startLine={53} maxLines={15}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import grpc
from auth import ClientCredentialsAuth

from anduril.taskmanager.v1.task_manager_api.pub_pb2 import StreamTasksRequest
from anduril.taskmanager.v1.task_manager_api.pub_pb2_grpc import TaskManagerAPIStub


def main():
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
        print("Missing required environment variables", file=sys.stderr)
        sys.exit(1)

    auth = ClientCredentialsAuth(
        client_id=client_id,
        client_secret=client_secret,
        sandboxes_token=sandboxes_token,
        endpoint=f"https://{lattice_endpoint}/api/v1/oauth/token",
    )

    credentials = grpc.ssl_channel_credentials()
    channel = grpc.intercept_channel(
        grpc.secure_channel(lattice_endpoint, credentials),
        auth.create_metadata_interceptor(),
    )

    client = TaskManagerAPIStub(channel)

    print("Starting task stream...")

    request = StreamTasksRequest(
        heartbeat_interval_ms=35000,
        exclude_preexisting_tasks=False,
        # Filter the stream to only receive your tasks in the stream
        task_type_prefix="type.googleapis.com/<YOUR_ORGANIZATION>",
    )

    try:
        stream = client.StreamTasks(request)
    except Exception as error:
        print(f"Failed to start task stream: {error}", file=sys.stderr)
        return

    for response in stream:
        if response.HasField("heartbeat"):
            timestamp = response.heartbeat.timestamp.ToDatetime()
            print(f"Heartbeat: {timestamp}")
        elif response.HasField("task_event"):
            task = response.task_event.task
            task_id = task.version.task_id
            status = task.status.status
            print(f"  TaskID: {task_id}")
            print(f"  Status: {status}")


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={78} maxLines={30}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::taskmanager::v1::{
    stream_tasks_request, StreamTasksRequest,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::taskmanager::v1::tonic::task_manager_api_client::TaskManagerApiClient;
use auth::ClientCredentialsAuth;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client_id = env::var("LATTICE_CLIENT_ID")
        .expect("LATTICE_CLIENT_ID environment variable not set");
    let client_secret = env::var("LATTICE_CLIENT_SECRET")
        .expect("LATTICE_CLIENT_SECRET environment variable not set");
    let lattice_endpoint = env::var("LATTICE_ENDPOINT")
        .expect("LATTICE_ENDPOINT environment variable not set");
    let sandboxes_token = env::var("SANDBOXES_TOKEN")
        .expect("SANDBOXES_TOKEN environment variable not set");

    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token,
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    let tls_config = ClientTlsConfig::new().with_native_roots();
    let channel = Channel::from_shared(format!("https://{}", lattice_endpoint))?
        .tls_config(tls_config)?
        .connect()
        .await?;

    let access_token = auth.get_token().await?;
    let sandboxes_token = auth.sandboxes_token();
    let auth_header: MetadataValue<_> = format!("Bearer {}", access_token).parse()?;
    let sandbox_header: MetadataValue<_> = format!("Bearer {}", sandboxes_token).parse()?;

    let mut client = TaskManagerApiClient::with_interceptor(
        channel,
        move |mut req: Request<()>| {
            req.metadata_mut()
                .insert("authorization", auth_header.clone());
            req.metadata_mut()
                .insert("anduril-sandbox-authorization", sandbox_header.clone());
            Ok(req)
        },
    );

    println!("Starting task stream...");

    // Create task stream request. The task_type_prefix filters the stream so
    // that only task types matching the prefix are delivered.
    let request = Request::new(StreamTasksRequest {
        heartbeat_interval_ms: 35_000,
        exclude_preexisting_tasks: false,
        task_type: Some(stream_tasks_request::TaskType::TaskTypePrefix(
            "type.googleapis.com/<YOUR_ORGANIZATION>".to_string(),
        )),
        ..Default::default()
    });

    // Start the task stream
    let mut stream = match client.stream_tasks(request).await {
        Ok(resp) => resp.into_inner(),
        Err(e) => {
            eprintln!("Failed to start task stream: {}", e);
            return Ok(());
        }
    };

    // Process the stream events as they arrive
    loop {
        let response = match stream.message().await {
            Ok(Some(r)) => r,
            Ok(None) => {
                println!("Stream ended");
                break;
            }
            Err(e) => {
                eprintln!("Error receiving task stream event: {}", e);
                break;
            }
        };

        if let Some(heartbeat) = response.heartbeat {
            // Process heartbeat events
            if let Some(ts) = heartbeat.timestamp {
                println!("Heartbeat: {}.{:09}", ts.seconds, ts.nanos);
            }
        } else if let Some(task_event) = response.task_event {
            // Process task events
            if let Some(task) = task_event.task {
                let task_id = task
                    .version
                    .as_ref()
                    .map(|v| v.task_id.clone())
                    .unwrap_or_default();
                let status = task
                    .status
                    .as_ref()
                    .map(|s| s.status)
                    .unwrap_or(0);
                println!("  TaskID: {}", task_id);
                println!("  Status: {}", status);
            }
        }
    }

    Ok(())
}

```

The stream produces two main event types:

* **`heartbeat`**: Regular server heartbeats that confirm the connection is active.
* **`task_event`**: Notifications about task creation, updates, or status changes.

When successfully running the `StreamTasks` code, you'll see output similar to the following:

```bash
Starting task stream
Heartbeat: 2025-01-29T12:34:56.789Z
Task Event: TASK_CREATED
  TaskID: task-123456
  Status: STATUS_SENT
Task Event: TASK_UPDATED
  TaskID: task-123456
  Status: STATUS_MACHINE_RECEIPT
Heartbeat: 2025-01-29T12:35:06.789Z
Task Event: TASK_UPDATED
  TaskID: task-123456
  Status: STATUS_EXECUTING
```

## Cancel tasks

The [`CancelTask`](/reference/rest/tasks/cancel-task) API cancels a task by marking it for cancellation in the system.
The behavior depends on the task's current state:

* If the task has not been sent to an agent, it cancels immediately and transitions to a terminal state
  ([`STATUS_DONE_NOT_OK`](/reference/rest/tasks/update-task-status#request.body.newStatus.status)
  with [`ERROR_CODE_CANCELLED`](/reference/rest/tasks/update-task-status#request.body.newStatus.taskError.code)).
* If the task has been sent to an agent, the cancellation request is routed to the agent,
  which decides whether to accept or reject the cancellation.

Create an asset entity that can receive and process tasks. The entity must include a
[`taskCatalog`](/reference/rest/entities/publish-entity#request.body.taskCatalog)
with [`taskDefinitions`](/reference/rest/entities/publish-entity#request.body.taskCatalog.taskDefinitions)
that specify which task types the asset supports:

```go title={"Go (REST)"} startLine={88} maxLines={8}
package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	Lattice "github.com/anduril/lattice-sdk-go/v4"
	"github.com/anduril/lattice-sdk-go/v4/client"
	"github.com/anduril/lattice-sdk-go/v4/option"
	"github.com/google/uuid"
)

func main() {
	// Get environment variables
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	clientId := os.Getenv("LATTICE_CLIENT_ID")

	// Remove sandboxesToken from the following statements if you are not developing on Sandboxes
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Check required environment variables
	if latticeEndpoint == "" || clientId == "" || clientSecret == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Initialize headers for sandbox authorization
	headers := http.Header{}
	headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))

	// Create the client
	LatticeClient := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)

	// Generate a unique ID for the entity
	entityId := uuid.New().String()

	// Get creation time
	creationTime := time.Now().UTC()

	// Continuously publish the entity
	for {
		latestTimestamp := time.Now().UTC()
		ctx := context.Background()

		// Create entity to publish
		entity := Lattice.Entity{
			EntityID:    &entityId,
			Description: Lattice.String("Friendly drone asset"),
			Aliases: &Lattice.Aliases{
				Name: Lattice.String("Drone 1"),
			},
			IsLive:      Lattice.Bool(true),
			CreatedTime: Lattice.Time(creationTime),
			ExpiryTime:  Lattice.Time(latestTimestamp.Add(1 * time.Minute)),
			Ontology: &Lattice.Ontology{
				Template:     Lattice.OntologyTemplateTemplateAsset.Ptr(),
				PlatformType: Lattice.String("UAV"),
			},
			MilView: &Lattice.MilView{
				Disposition: Lattice.MilViewDispositionDispositionFriendly.Ptr(),
				Environment: Lattice.MilViewEnvironmentEnvironmentAir.Ptr(),
			},
			Location: &Lattice.Location{
				Position: &Lattice.Position{
					LatitudeDegrees:   Lattice.Float64(50.91402185768586),
					LongitudeDegrees:  Lattice.Float64(0.79203612077257),
					AltitudeAsfMeters: Lattice.Float64(1000),
				},
			},
			Provenance: &Lattice.Provenance{
				IntegrationName:  Lattice.String("your_integration_name"),
				DataType:         Lattice.String("your_data_type"),
				SourceUpdateTime: Lattice.Time(latestTimestamp),
			},
			Health: &Lattice.Health{
				ConnectionStatus: Lattice.HealthConnectionStatusConnectionStatusOnline.Ptr(),
				HealthStatus:     Lattice.HealthHealthStatusHealthStatusHealthy.Ptr(),
				UpdateTime:       Lattice.Time(latestTimestamp),
			},
			TaskCatalog: &Lattice.TaskCatalog{
				TaskDefinitions: []*Lattice.TaskDefinition{
					{TaskSpecificationURL: Lattice.String("type.googleapis.com/anduril.tasks.v2.VisualId")},
					{TaskSpecificationURL: Lattice.String("type.googleapis.com/anduril.tasks.v2.Investigate")},
				},
			},
		}

		// Publish the entity
		_, err := LatticeClient.Entities.PublishEntity(ctx, &entity)

		// Handle errors
		if err != nil {
			fmt.Printf("Error publishing entity: %v\n", err)
		} else {
			fmt.Println("Published asset: " + entityId)
		}

		// Wait before next request
		time.Sleep(5 * time.Second)
	}
}

```

```java title={"Java (REST)"} startLine={112} maxLines={8}
package org.example;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.UUID;

import com.anduril.Lattice;
import com.anduril.types.Aliases;
import com.anduril.types.Entity;
import com.anduril.types.Health;
import com.anduril.types.HealthConnectionStatus;
import com.anduril.types.HealthHealthStatus;
import com.anduril.types.Location;
import com.anduril.types.MilView;
import com.anduril.types.MilViewDisposition;
import com.anduril.types.MilViewEnvironment;
import com.anduril.types.Ontology;
import com.anduril.types.OntologyTemplate;
import com.anduril.types.Position;
import com.anduril.types.Provenance;
import com.anduril.types.TaskCatalog;
import com.anduril.types.TaskDefinition;



public class PublishAgent {
    public static void main(String[] args) {
        // Get environment variables
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");
        
        // Check required variables and ensure URL has https://
        if (endpoint == null || clientId == null || clientSecret == null || sandboxesToken == null) {
            System.err.println("Missing required environment variables");
            System.exit(1);
        }
        if (!endpoint.startsWith("https://")) endpoint = "https://" + endpoint;
        
        try {
            // Create Lattice client with Sandbox authentication
            Lattice client = Lattice.builder()
                .url(endpoint)
                .credentials(clientId, clientSecret)
                .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
                .build();
            
            // Generate a unique ID for the entity
            String entityId = UUID.randomUUID().toString();
            
            // Set a radius, in degrees, to simulate the entity moving in a circle
            double radiusDegrees = 0.1;
            double count = 0.0;
            Instant creationTime = Instant.now();
            
            // Continuously publish the entity
            while (true) {
                try {
                    // Get current timestamp
                    Instant latestTimestamp = Instant.now();
                    
                    // Update position
                    count += 0.1;
                    double t = Math.toRadians(count);
                    
                    // Create the entity
                    TaskDefinition visualId = TaskDefinition.builder()
                        .taskSpecificationUrl("type.googleapis.com/anduril.tasks.v2.VisualId")
                        .build();

                    TaskDefinition investigate = TaskDefinition.builder()
                        .taskSpecificationUrl("type.googleapis.com/anduril.tasks.v2.Investigate")
                        .build();

                    Entity entity = Entity.builder()
                        .entityId(entityId)
                        .description("Friendly drone asset")
                        .aliases(Aliases.builder()
                            .name("Drone 1")
                            .build())
                        .isLive(true)
                        .createdTime(OffsetDateTime.ofInstant(creationTime, ZoneOffset.UTC))
                        .expiryTime(OffsetDateTime.ofInstant(latestTimestamp.plus(1, ChronoUnit.MINUTES), ZoneOffset.UTC))
                        .ontology(Ontology.builder()
                            .template(OntologyTemplate.TEMPLATE_ASSET)
                            .platformType("UAV")
                            .build())
                        .milView(MilView.builder()
                            .disposition(MilViewDisposition.DISPOSITION_FRIENDLY)
                            .environment(MilViewEnvironment.ENVIRONMENT_AIR)
                            .build())
                        .location(Location.builder()
                            .position(Position.builder()
                                .latitudeDegrees(50.91402185768586 + (radiusDegrees * Math.cos(t)))
                                .longitudeDegrees(0.79203612077257 + (radiusDegrees * Math.sin(t)))
                                .altitudeAglMeters(1000.0)
                                .build())
                            .build())
                        .provenance(Provenance.builder()
                            .integrationName("your_integration_name")
                            .dataType("your_data_type")
                            .sourceUpdateTime(OffsetDateTime.ofInstant(latestTimestamp, ZoneOffset.UTC))
                            .build())
                        .health(Health.builder()
                            .connectionStatus(HealthConnectionStatus.CONNECTION_STATUS_ONLINE)
                            .healthStatus(HealthHealthStatus.HEALTH_STATUS_HEALTHY)
                            .updateTime(OffsetDateTime.ofInstant(latestTimestamp, ZoneOffset.UTC))
                            .build())
                        .taskCatalog(TaskCatalog.builder()
                            .taskDefinitions(Arrays.asList(visualId, investigate))
                            .build())
                        .build();
                    
                    // Publish the entity
                    client.entities().publishEntity(entity);
                    System.out.println("Publishing asset.");
                    
                    Thread.sleep(1000);
                } catch (Exception e) {
                    System.err.println("Error: " + e.getMessage());
                    Thread.sleep(10000);
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to initialize: " + e.getMessage());
        }
    }
}
```

```py title={"Python (REST)"} startLine={67} maxLines={8}
from anduril import Lattice, Aliases, MilView, Location, \
    Position, Ontology, Provenance, Health, TaskCatalog, TaskDefinition
from datetime import datetime, timezone, timedelta
import asyncio
import os
import sys
from uuid import uuid4

lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')

# Remove sandboxes_token from the following statements if you are not developing on Sandboxes.
sandboxes_token = os.getenv('SANDBOXES_TOKEN')
if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
    print("Missing required environment variables.")
    sys.exit(1)
    
client = Lattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    # Remove the following header if you are not developing on Sandboxes.
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)
id = str(uuid4())

async def app():
    try:
        creation_time = datetime.now(timezone.utc)
        while(True):
            latest_timestamp = datetime.now(timezone.utc)
            client.entities.publish_entity(
                entity_id= id,
                description="Drone 1",
                aliases=Aliases(
                    name="Drone 1"
                ),
                is_live=True,
                created_time=creation_time,
                expiry_time=latest_timestamp + timedelta(minutes=10),
                ontology=Ontology(
                    template="TEMPLATE_ASSET",
                    platform_type="UAV"
                ),
                mil_view=MilView(
                    disposition="DISPOSITION_FRIENDLY",
                    environment="ENVIRONMENT_AIR"
                ),
                location=Location(
                    position=Position(
                        latitude_degrees=50.91402185768586,
                        longitude_degrees=0.79203612077257,
                        altitude_asf_meters=1000
                    )
                ),
                provenance=Provenance(
                    integration_name="your_integration_name",
                    data_type="your_data_type",
                    source_update_time=latest_timestamp
                ),
                health=Health(
                    connection_status="CONNECTION_STATUS_ONLINE",
                    health_status="HEALTH_STATUS_HEALTHY",
                    update_time=latest_timestamp
                ),
                task_catalog=TaskCatalog(
                    task_definitions=[
                        TaskDefinition( task_specification_url="type.googleapis.com/anduril.tasks.v2.VisualId" ),
                        TaskDefinition( task_specification_url="type.googleapis.com/anduril.tasks.v2.Investigate" )
                    ]
                )
            )
            print(f"Published asset: {id}")
            await asyncio.sleep(1)

    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    asyncio.run(app())
```

```ts title={"TypeScript (REST)"} startLine={66} maxLines={8}
import { LatticeClient } from "@anduril-industries/lattice-sdk";
import { v4 as uuidv4 } from 'uuid';

const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;

// Remove sandboxesToken from the following statements if you are not developing on Sandboxes.
const sandboxesToken = process.env.SANDBOXES_TOKEN;
if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.log('Missing required environment variables.');
    process.exit(1);
}
const client = new LatticeClient(
    {
        baseUrl: `https://${latticeEndpoint}`,
        clientId: clientId,
        clientSecret: clientSecret,
        // Remove the following if you are not developing on Sandboxes.
        headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    }
);
const entityId = uuidv4()
const minutes = 10;
function getExpiryTime(minutes: number): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    return now.toISOString();
}
async function App() {
    try {
        const latestTimestamp = new Date().toISOString();
        await client.entities.publishEntity(
            {
                entityId: entityId,
                description: "Drone 1",
                aliases: { name: "Drone 1" },
                isLive: true,
                createdTime: latestTimestamp,
                expiryTime: getExpiryTime(minutes),
                ontology: {
                    template: "TEMPLATE_ASSET",
                    platformType: "UAV"
                },
                milView: {
                    disposition: "DISPOSITION_FRIENDLY",
                    environment: "ENVIRONMENT_AIR"
                },
                location: {
                    position: {
                        latitudeDegrees: 50.91402185768586,
                        longitudeDegrees: 0.79203612077257,
                        altitudeAsfMeters: 1000
                    }
                },
                provenance: {
                    integrationName: "your_integration_name",
                    dataType: "your_data_type",
                    sourceUpdateTime: latestTimestamp
                },
                health: {
                    connectionStatus: "CONNECTION_STATUS_ONLINE",
                    healthStatus: "HEALTH_STATUS_HEALTHY",
                    updateTime: latestTimestamp
                },
                taskCatalog: {
                    taskDefinitions: [
                        { taskSpecificationUrl: "type.googleapis.com/anduril.tasks.v2.VisualId" },
                        { taskSpecificationUrl: "type.googleapis.com/anduril.tasks.v2.Investigate" }
                    ]
                }
            }
        );
        console.log(`Published asset: ${entityId}`);
    } catch (error) {
        console.log(`Encountered the following error while publishing entity: ${error}`);
    }
}
(async function runIndefinitely() {
    while (true) {
        await App();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
})();
```

```go title={"Go (gRPC)"} startLine={106} maxLines={10}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/entitymanager/v1/entitymanagerv1grpc"
	entitymanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/entitymanager/v1"
	ontologyv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/ontology/v1"
	tasksv2 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/tasks/v2"
	"github.com/google/uuid"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func main() {
	// Get environment variables
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Check required environment variables
	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Setup authentication
	auth := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	// Setup gRPC connection options
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")),
		grpc.WithPerRPCCredentials(auth),
	}

	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)

	// Generate a unique ID for the entity
	entityId := uuid.New().String()

	// Get creation time
	creationTime := time.Now().UTC()
	creationTimestamp := timestamppb.New(creationTime)

	// Continuously publish the entity
	for {
		// Get current timestamp for this update
		latestTimestamp := time.Now().UTC()
		ctx := context.Background()

		// Create entity to publish
		entity := &entitymanagerv1.Entity{
			EntityId:    entityId,
			Description: "Agent entity",
			Aliases: &entitymanagerv1.Aliases{
				Name: "Agent 1",
			},
			IsLive:      true,
			CreatedTime: creationTimestamp,
			ExpiryTime:  timestamppb.New(latestTimestamp.Add(1 * time.Minute)),
			Ontology: &entitymanagerv1.Ontology{
				Template:     entitymanagerv1.Template_TEMPLATE_ASSET,
				PlatformType: "UAV",
			},
			MilView: &entitymanagerv1.MilView{
				Disposition: ontologyv1.Disposition_DISPOSITION_FRIENDLY,
				Environment: ontologyv1.Environment_ENVIRONMENT_AIR,
			},
			Location: &entitymanagerv1.Location{
				Position: &entitymanagerv1.Position{
					LatitudeDegrees:   50.91402185768586,
					LongitudeDegrees:  0.79203612077257,
					AltitudeAsfMeters: wrapperspb.Double(1000),
				},
			},
			Provenance: &entitymanagerv1.Provenance{
				IntegrationName:  "agent_integration",
				DataType:         "agent_data",
				SourceUpdateTime: timestamppb.New(latestTimestamp),
			},
			Health: &entitymanagerv1.Health{
				ConnectionStatus: entitymanagerv1.ConnectionStatus_CONNECTION_STATUS_ONLINE,
				HealthStatus:     entitymanagerv1.HealthStatus_HEALTH_STATUS_HEALTHY,
				UpdateTime:       timestamppb.New(latestTimestamp),
			},
			TaskCatalog: &tasksv2.TaskCatalog{
				TaskDefinitions: []*tasksv2.TaskDefinition{
					{
						TaskSpecificationUrl: "type.googleapis.com/anduril.tasks.v2.VisualId",
					},
					{
						TaskSpecificationUrl: "type.googleapis.com/anduril.tasks.v2.Investigate",
					},
				},
			},
		}

		// Create publish request
		request := &entitymanagerv1.PublishEntityRequest{
			Entity: entity,
		}

		// Publish the entity
		_, err := client.PublishEntity(ctx, request)

		// Handle errors
		if err != nil {
			fmt.Printf("Error publishing entity: %v\n", err)
		} else {
			fmt.Printf("Published agent: %s\n", entityId)
		}

		// Wait before next request
		time.Sleep(5 * time.Second)
	}
}

```

```py title={"Python (gRPC)"} startLine={97} maxLines={8}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import time
import uuid
from datetime import datetime, timedelta, timezone
import grpc
from auth import ClientCredentialsAuth
from google.protobuf.timestamp_pb2 import Timestamp
from google.protobuf.wrappers_pb2 import DoubleValue

from anduril.entitymanager.v1.entity.pub_pb2 import Aliases, Entity, Provenance
from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import PublishEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub
from anduril.entitymanager.v1.health_status.pub_pb2 import (
    ConnectionStatus,
    Health,
    HealthStatus,
)
from anduril.entitymanager.v1.location.pub_pb2 import Location, Position
from anduril.entitymanager.v1.ontology.pub_pb2 import MilView, Ontology
from anduril.entitymanager.v1.types.pub_pb2 import Template
from anduril.ontology.v1.type.pub_pb2 import Disposition, Environment
from anduril.tasks.v2.catalog.pub_pb2 import TaskCatalog, TaskDefinition


def to_timestamp(dt: datetime) -> Timestamp:
    ts = Timestamp()
    ts.FromDatetime(dt)
    return ts


def main():
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
        print("Missing required environment variables", file=sys.stderr)
        sys.exit(1)

    auth = ClientCredentialsAuth(
        client_id=client_id,
        client_secret=client_secret,
        sandboxes_token=sandboxes_token,
        endpoint=f"https://{lattice_endpoint}/api/v1/oauth/token",
    )

    credentials = grpc.ssl_channel_credentials()
    channel = grpc.intercept_channel(
        grpc.secure_channel(lattice_endpoint, credentials),
        auth.create_metadata_interceptor(),
    )

    client = EntityManagerAPIStub(channel)

    entity_id = str(uuid.uuid4())
    creation_timestamp = to_timestamp(datetime.now(timezone.utc))

    while True:
        latest = datetime.now(timezone.utc)
        latest_ts = to_timestamp(latest)
        expiry_ts = to_timestamp(latest + timedelta(minutes=1))

        entity = Entity(
            entity_id=entity_id,
            description="Agent entity",
            aliases=Aliases(name="Agent 1"),
            is_live=True,
            created_time=creation_timestamp,
            expiry_time=expiry_ts,
            ontology=Ontology(template=Template.TEMPLATE_ASSET, platform_type="UAV"),
            mil_view=MilView(
                disposition=Disposition.DISPOSITION_FRIENDLY,
                environment=Environment.ENVIRONMENT_AIR,
            ),
            location=Location(
                position=Position(
                    latitude_degrees=50.91402185768586,
                    longitude_degrees=0.79203612077257,
                    altitude_asf_meters=DoubleValue(value=1000),
                ),
            ),
            provenance=Provenance(
                integration_name="agent_integration",
                data_type="agent_data",
                source_update_time=latest_ts,
            ),
            health=Health(
                connection_status=ConnectionStatus.CONNECTION_STATUS_ONLINE,
                health_status=HealthStatus.HEALTH_STATUS_HEALTHY,
                update_time=latest_ts,
            ),
            task_catalog=TaskCatalog(
                task_definitions=[
                    TaskDefinition(task_specification_url="type.googleapis.com/anduril.tasks.v2.VisualId"),
                    TaskDefinition(task_specification_url="type.googleapis.com/anduril.tasks.v2.Investigate"),
                ],
            ),
        )

        try:
            client.PublishEntity(PublishEntityRequest(entity=entity))
            print(f"Published agent: {entity_id}")
        except Exception as error:
            print(f"Error publishing entity: {error}", file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={140} maxLines={10}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::{
    Aliases, ConnectionStatus, Entity, Health, HealthStatus, Location, MilView, Ontology,
    Position, Provenance, PublishEntityRequest, Template,
};
use anduril_lattice_sdk_community_neoeinstein_prost::anduril::ontology::v1::{
    Disposition, Environment,
};
use anduril_lattice_sdk_community_neoeinstein_prost::anduril::tasks::v2::{
    TaskCatalog, TaskDefinition,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::entitymanager::v1::tonic::entity_manager_api_client::EntityManagerApiClient;
use auth::ClientCredentialsAuth;
use prost_types::Timestamp;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;
use uuid::Uuid;

use std::env;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

fn now_timestamp() -> Timestamp {
    let d = SystemTime::now().duration_since(UNIX_EPOCH).unwrap();
    Timestamp {
        seconds: d.as_secs() as i64,
        nanos: d.subsec_nanos() as i32,
    }
}

fn add_seconds(ts: &Timestamp, seconds: i64) -> Timestamp {
    Timestamp {
        seconds: ts.seconds + seconds,
        nanos: ts.nanos,
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load environment variables
    let client_id = env::var("LATTICE_CLIENT_ID")
        .expect("LATTICE_CLIENT_ID environment variable not set");
    let client_secret = env::var("LATTICE_CLIENT_SECRET")
        .expect("LATTICE_CLIENT_SECRET environment variable not set");
    let lattice_endpoint = env::var("LATTICE_ENDPOINT")
        .expect("LATTICE_ENDPOINT environment variable not set");
    let sandboxes_token = env::var("SANDBOXES_TOKEN")
        .expect("SANDBOXES_TOKEN environment variable not set");

    // Set up authentication handler
    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token,
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    // Create gRPC channel with TLS
    let tls_config = ClientTlsConfig::new().with_native_roots();
    let channel = Channel::from_shared(format!("https://{}", lattice_endpoint))?
        .tls_config(tls_config)?
        .connect()
        .await?;

    // Fetch a fresh access token and build metadata values
    let access_token = auth.get_token().await?;
    let sandboxes_token = auth.sandboxes_token();
    let auth_header: MetadataValue<_> = format!("Bearer {}", access_token).parse()?;
    let sandbox_header: MetadataValue<_> = format!("Bearer {}", sandboxes_token).parse()?;

    // Create EntityManager API client with authentication interceptor
    let mut client = EntityManagerApiClient::with_interceptor(
        channel,
        move |mut req: Request<()>| {
            req.metadata_mut()
                .insert("authorization", auth_header.clone());
            req.metadata_mut()
                .insert("anduril-sandbox-authorization", sandbox_header.clone());
            Ok(req)
        },
    );

    // Generate a unique ID for the entity
    let entity_id = Uuid::new_v4().to_string();
    let creation_timestamp = now_timestamp();

    // Continuously publish the entity
    loop {
        let latest_timestamp = now_timestamp();

        // Create entity to publish
        let entity = Entity {
            entity_id: entity_id.clone(),
            description: "Agent entity".to_string(),
            aliases: Some(Aliases {
                name: "Agent 1".to_string(),
                ..Default::default()
            }),
            is_live: true,
            created_time: Some(creation_timestamp.clone()),
            expiry_time: Some(add_seconds(&latest_timestamp, 60)),
            ontology: Some(Ontology {
                template: Template::Asset as i32,
                platform_type: "UAV".to_string(),
                ..Default::default()
            }),
            mil_view: Some(MilView {
                disposition: Disposition::Friendly as i32,
                environment: Environment::Air as i32,
                ..Default::default()
            }),
            location: Some(Location {
                position: Some(Position {
                    latitude_degrees: 50.91402185768586,
                    longitude_degrees: 0.79203612077257,
                    altitude_asf_meters: Some(1000.0),
                    ..Default::default()
                }),
                ..Default::default()
            }),
            provenance: Some(Provenance {
                integration_name: "agent_integration".to_string(),
                data_type: "agent_data".to_string(),
                source_update_time: Some(latest_timestamp.clone()),
                ..Default::default()
            }),
            health: Some(Health {
                connection_status: ConnectionStatus::Online as i32,
                health_status: HealthStatus::Healthy as i32,
                update_time: Some(latest_timestamp.clone()),
                ..Default::default()
            }),
            task_catalog: Some(TaskCatalog {
                task_definitions: vec![
                    TaskDefinition {
                        task_specification_url: "type.googleapis.com/anduril.tasks.v2.VisualId"
                            .to_string(),
                    },
                    TaskDefinition {
                        task_specification_url:
                            "type.googleapis.com/anduril.tasks.v2.Investigate".to_string(),
                    },
                ],
            }),
            ..Default::default()
        };

        // Publish the entity
        let request = Request::new(PublishEntityRequest {
            entity: Some(entity),
        });
        match client.publish_entity(request).await {
            Ok(_) => println!("Published agent: {}", entity_id),
            Err(e) => eprintln!("Error publishing entity: {}", e),
        }

        tokio::time::sleep(Duration::from_secs(5)).await;
    }
}

```

The `taskCatalog` defines the task types this asset can execute.
Each [`TaskDefinition`](/reference/rest/entities/publish-entity#request.body.taskCatalog.taskDefinitions)
specifies a [`taskSpecificationUrl`](/reference/rest/entities/publish-entity#request.body.taskCatalog.taskDefinitions.taskSpecificationUrl)
that identifies the task type (for example, `type.googleapis.com/anduril.tasks.v2.VisualId`).

Create a task processor that listens for tasks assigned to your agent and handles cancellation requests.
For demonstration purposes, this example uses a `TASK_ACTIVE` environment variable to control whether the agent accepts or rejects cancellations:

```go title={"Go (REST)"} startLine={54} maxLines={25}
package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	Lattice "github.com/anduril/lattice-sdk-go/v4"
	"github.com/anduril/lattice-sdk-go/v4/client"
	"github.com/anduril/lattice-sdk-go/v4/option"
)

// Sets whether the task is currently being processed. If so, it cannot be cancelled.
var taskActive bool

func main() {
	// Get environment variables
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	clientId := os.Getenv("LATTICE_CLIENT_ID")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")
	taskActiveStr := os.Getenv("TASK_ACTIVE")

	// Check required environment variables
	if latticeEndpoint == "" || clientId == "" || clientSecret == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Parse TASK_ACTIVE environment variable
	taskActive = strings.ToLower(taskActiveStr) == "true"

	// Initialize headers for sandbox authorization
	headers := http.Header{}
	headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))

	// Create the client
	LatticeClient := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)

	// Set the entity ID to listen for tasks
	entityId := "<AGENT_ID>"
	fmt.Printf("Streaming tasks for entity: %s...\n", entityId)

	// Create context for the request
	ctx := context.Background()

	// Create agent stream request
	agentStreamRequest := Lattice.AgentStreamRequest{
		AgentSelector: &Lattice.EntityIDsSelector{
			EntityIDs: []string{entityId},
		},
	}

	// Stream tasks
	stream, err := LatticeClient.Tasks.StreamAsAgent(ctx, &agentStreamRequest)
	if err != nil {
		fmt.Printf("Error streaming tasks: %v\n", err)
		os.Exit(1)
	}

	// Process stream events
	for {
		select {
		case <-ctx.Done():
			log.Printf("Context canceled: %v", ctx.Err())
			return
		default:
			// Continue processing
		}

		event, err := stream.Recv()

		if errors.Is(err, io.EOF) {
			log.Println("Stream completed successfully.")
			return
		}

		if err != nil {
			log.Printf("Error receiving message: %v", err)
			continue
		}

		if event.Event == "heartbeat" {
			timestamp := *event.Heartbeat.Timestamp
			log.Printf("Heartbeat: %s", timestamp)
		} else {
			request := event.GetAgentRequest()
			if executeRequest := request.GetExecuteRequest(); executeRequest != nil {
				task := executeRequest.GetTask()
				if task != nil {
					taskId := *task.GetVersion().GetTaskID()
					taskStatusVersion := *task.GetVersion().GetStatusVersion()
					description := *task.GetDescription()

					log.Printf("Starting task %s, version %d: %s", taskId, taskStatusVersion, description)

					// Update task status to STATUS_EXECUTING
					result, err := executeTask(ctx, LatticeClient, taskId, int(taskStatusVersion), entityId)
					if err != nil {
						log.Printf("Error starting task: %v", err)
						continue
					}

					log.Printf("Started task with status version: %d", *result.StatusVersion)
				}
			} else if completeRequest := request.GetCompleteRequest(); completeRequest != nil {
				taskToComplete := completeRequest.GetTaskID()
				if taskToComplete != nil {
					log.Printf("Completing task: %s", *taskToComplete)
					err := completeTask(ctx, LatticeClient, *taskToComplete, entityId)
					if err != nil {
						log.Printf("Error completing task: %v", err)
					}
				}
			} else if cancelRequest := request.GetCancelRequest(); cancelRequest != nil {
				taskToCancel := cancelRequest.GetTaskID()
				if taskToCancel != nil {
					log.Printf("Cancelling task: %s", *taskToCancel)
					err := cancelTask(ctx, LatticeClient, *taskToCancel, entityId)
					if err != nil {
						log.Printf("Error cancelling task: %v", err)
					}
				}
			}
		}

		// Sleep briefly to prevent tight looping
		time.Sleep(100 * time.Millisecond)
	}
}

// executeTask updates the task status to STATUS_EXECUTING
func executeTask(ctx context.Context, client *client.Client, taskId string, taskStatusVersion int, agentEntityId string) (*Lattice.TaskVersion, error) {
	// Increment status version for the update
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := Lattice.Principal{
		System: &Lattice.System{
			EntityID: &agentEntityId,
		},
	}

	taskStatus := Lattice.TaskStatus{
		Status: Lattice.TaskStatusStatusStatusExecuting.Ptr(),
	}

	// Create task status update request
	taskStatusUpdate := Lattice.TaskStatusUpdate{
		TaskID:        taskId,
		StatusVersion: &taskStatusVersion,
		NewStatus:     &taskStatus,
		Author:        &principal,
	}

	// Call the UpdateTaskStatus API
	task, err := client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
	if err != nil {
		return nil, fmt.Errorf("error updating task status: %w", err)
	}

	return task.Version, nil
}

// cancelTask handles cancellation requests from Lattice
func cancelTask(ctx context.Context, client *client.Client, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := Lattice.GetTaskRequest{
		TaskID: taskId,
	}
	task, err := client.Tasks.GetTask(ctx, &getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}
	if task.Status == nil || task.Version == nil || task.Version.StatusVersion == nil {
		return fmt.Errorf("task status or version is missing")
	}
	currentTaskStatus := task.Status.Status
	taskStatusVersion := *task.Version.StatusVersion
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := Lattice.Principal{
		System: &Lattice.System{
			EntityID: &entityId,
		},
	}

	if taskActive {
		// Reject cancellation: task is active and cannot be cancelled
		rejectedMessage := "Task is already active, and cannot be cancelled."
		taskStatus := Lattice.TaskStatus{
			// Because the cancellation is being rejected, we do not
			// change the task status.
			Status: currentTaskStatus,
			TaskError: &Lattice.TaskError{
				Code:    Lattice.TaskErrorCodeErrorCodeRejected.Ptr(),
				Message: &rejectedMessage,
			},
		}

		taskStatusUpdate := Lattice.TaskStatusUpdate{
			TaskID:        taskId,
			StatusVersion: &taskStatusVersion,
			NewStatus:     &taskStatus,
			Author:        &principal,
		}

		_, err := client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task could not be cancelled.")
	} else {
		// Accept cancellation
		cancelledMessage := "Task cancelled by agent."
		taskStatus := Lattice.TaskStatus{
			Status: Lattice.TaskStatusStatusStatusDoneNotOk.Ptr(),
			TaskError: &Lattice.TaskError{
				Code:    Lattice.TaskErrorCodeErrorCodeCancelled.Ptr(),
				Message: &cancelledMessage,
			},
		}

		taskStatusUpdate := Lattice.TaskStatusUpdate{
			TaskID:        taskId,
			StatusVersion: &taskStatusVersion,
			NewStatus:     &taskStatus,
			Author:        &principal,
		}

		_, err := client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task has been cancelled.")
	}

	return nil
}

// completeTask updates the task status to STATUS_DONE_OK
func completeTask(ctx context.Context, client *client.Client, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := Lattice.GetTaskRequest{
		TaskID: taskId,
	}
	task, err := client.Tasks.GetTask(ctx, &getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}

	if task.Version == nil || task.Version.StatusVersion == nil {
		return fmt.Errorf("task version is missing")
	}

	taskStatusVersion := *task.Version.StatusVersion
	// Increment version and update to terminal state
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := Lattice.Principal{
		System: &Lattice.System{
			EntityID: &entityId,
		},
	}

	taskStatus := Lattice.TaskStatus{
		Status: Lattice.TaskStatusStatusStatusDoneOk.Ptr(),
	}

	taskStatusUpdate := Lattice.TaskStatusUpdate{
		TaskID:        taskId,
		StatusVersion: &taskStatusVersion,
		NewStatus:     &taskStatus,
		Author:        &principal,
	}

	_, err = client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
	if err != nil {
		return fmt.Errorf("error updating task status: %w", err)
	}

	return nil
}

```

```java title={"Java (REST)"} startLine={169} maxLines={25}
package org.example;

import java.util.Arrays;
import java.util.concurrent.CompletableFuture;

import com.anduril.AsyncLattice;
import com.anduril.resources.tasks.requests.AgentStreamRequest;
import com.anduril.resources.tasks.requests.TaskStatusUpdate;
import com.anduril.resources.tasks.types.StreamAsAgentResponse;
import com.anduril.types.AgentStreamEvent;
import com.anduril.types.EntityIdsSelector;
import com.anduril.types.Principal;
import com.anduril.types.TaskError;
import com.anduril.types.TaskErrorCode;
import com.anduril.types.TaskStatus;
import com.anduril.types.TaskStatusStatus;
import com.anduril.types.TaskVersion;
public class ProcessTask {
    // Entity ID to listen for tasks - replace with your actual entity ID.
    private static final String ENTITY_ID = "<AGENT_ID>";

    // Sets whether the task is currently being processed. If so, it cannot be cancelled.
    private static boolean taskActive;

    public static void main(String[] args) {
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");
        String taskActiveStr = System.getenv("TASK_ACTIVE");

        if (endpoint == null || clientId == null || clientSecret == null || sandboxesToken == null) {
            System.err.println("Missing required environment variables.");
            System.exit(1);
        }
        if (!endpoint.startsWith("https://")) endpoint = "https://" + endpoint;

        taskActive = "true".equalsIgnoreCase(taskActiveStr);

        try {
            AsyncLattice client = AsyncLattice.builder()
                .url(endpoint)
                .credentials(clientId, clientSecret)
                .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
                .build();

            System.out.println("Streaming tasks for entity: " + ENTITY_ID + "...");

            // Create agent selector with the specified entity ID.
            EntityIdsSelector agentSelector = EntityIdsSelector.builder()
                .entityIds(Arrays.asList(ENTITY_ID))
                .build();

            // Create agent stream request.
            AgentStreamRequest agentRequest = AgentStreamRequest.builder()
                .agentSelector(agentSelector)
                .build();

            // Stream tasks from Lattice as an agent
            client.tasks().streamAsAgent(agentRequest)
                .thenAccept(requests -> {
                    for (StreamAsAgentResponse request : requests) {
                        if (request.isHeartbeat()) {
                            System.out.println("Heartbeat: " + request.getHeartbeat().get().getTimestamp().get());
                        } else {
                            AgentStreamEvent event = request.getAgentRequest().get();
                            if (event.getExecuteRequest().isPresent()) {
                                String taskId = event.getExecuteRequest().get()
                                    .getTask().get()
                                    .getVersion().get()
                                    .getTaskId().get();

                                int taskStatusVersion = event.getExecuteRequest().get()
                                    .getTask().get()
                                    .getVersion().get()
                                    .getStatusVersion().get();

                                String description = event.getExecuteRequest().get()
                                    .getTask().get()
                                    .getDescription().orElse("No description");

                                System.out.println("Starting task " + taskId + ", version " + taskStatusVersion + ": " + description);

                                try {
                                    TaskVersion result = startTask(client, taskId, taskStatusVersion, ENTITY_ID).get();
                                    System.out.println("Started task with status version: " + result.getStatusVersion().get());
                                } catch (Exception e) {
                                    System.err.println("Error starting task: " + e.getMessage());
                                }
                            } else if (event.getCompleteRequest().isPresent()) {
                                String taskId = event.getCompleteRequest().get().getTaskId().get();
                                System.out.println("Completing task: " + taskId);
                                try {
                                    completeTask(client, taskId, ENTITY_ID).get();
                                } catch (Exception e) {
                                    System.err.println("Error completing task: " + e.getMessage());
                                }
                            } else if (event.getCancelRequest().isPresent()) {
                                String taskId = event.getCancelRequest().get().getTaskId().get();
                                System.out.println("Cancelling task: " + taskId);
                                try {
                                    cancelTask(client, taskId, ENTITY_ID).get();
                                } catch (Exception e) {
                                    System.err.println("Error cancelling task: " + e.getMessage());
                                }
                            }
                        }
                    }
                })
                .exceptionally(ex -> {
                    System.err.println("Exception while streaming tasks: " + ex.getMessage());
                    return null;
                })
                .join();
        } catch (Exception e) {
            System.err.println("Error in streaming loop: " + e.getMessage());
        }
    }

    /**
     * Update task status to STATUS_EXECUTING.
     *
     * @param client Lattice client
     * @param taskId Task ID to update
     * @param taskStatusVersion Current task status version
     * @param agentEntityId Agent entity ID performing the update
     * @return CompletableFuture containing the updated TaskVersion
     */
    private static CompletableFuture<TaskVersion> startTask(AsyncLattice client, String taskId, Integer taskStatusVersion, String agentEntityId) {
        try {
            // Increment status version for the update
            taskStatusVersion += 1;

            // Create system principal with the agent entity ID.
            Principal principal = Principal.builder()
                .system(com.anduril.types.System.builder()
                    .entityId(agentEntityId)
                    .build())
                .build();

            // Create task status for update.
            TaskStatus taskStatus = TaskStatus.builder()
                .status(TaskStatusStatus.STATUS_EXECUTING)
                .build();

            // Create task status update request.
            TaskStatusUpdate taskStatusUpdate = TaskStatusUpdate.builder()
                .statusVersion(taskStatusVersion)
                .newStatus(taskStatus)
                .author(principal)
                .build();

            return client.tasks().updateTaskStatus(taskId, taskStatusUpdate)
                .thenApply(response -> response.getVersion().get());
        } catch (Exception e) {
            System.err.println("Encountered the following error while starting task: " + e.getMessage());
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Handle cancellation requests from Lattice.
     *
     * @param client Lattice client
     * @param taskId Task ID to cancel
     * @param entityId Agent entity ID performing the cancellation
     * @return CompletableFuture indicating completion
     */
    private static CompletableFuture<Void> cancelTask(AsyncLattice client, String taskId, String entityId) {
        // Get current task to retrieve status_version
        return client.tasks().getTask(taskId)
            .thenCompose(task -> {
                if (task.getStatus().isEmpty() || task.getVersion().isEmpty() || task.getVersion().get().getStatusVersion().isEmpty()) {
                    System.err.println("Task status or version is missing");
                    return CompletableFuture.failedFuture(new RuntimeException("Task status or version is missing"));
                }

                TaskStatusStatus currentTaskStatus = task.getStatus().get().getStatus().get();
                int taskStatusVersion = task.getVersion().get().getStatusVersion().get();
                taskStatusVersion += 1;

                // Create system principal with the agent entity ID.
                Principal principal = Principal.builder()
                    .system(com.anduril.types.System.builder()
                        .entityId(entityId)
                        .build())
                    .build();

                TaskStatus taskStatus;
                if (taskActive) {
                    // Reject cancellation: task is active and cannot be cancelled
                    taskStatus = TaskStatus.builder()
                        // Because the cancellation is being rejected, we do not
                        // change the task status.
                        .status(currentTaskStatus)
                        .taskError(TaskError.builder()
                            .code(TaskErrorCode.ERROR_CODE_REJECTED)
                            .message("Task is already active, and cannot be cancelled.")
                            .build())
                        .build();
                } else {
                    // Accept cancellation
                    taskStatus = TaskStatus.builder()
                        .status(TaskStatusStatus.STATUS_DONE_NOT_OK)
                        .taskError(TaskError.builder()
                            .code(TaskErrorCode.ERROR_CODE_CANCELLED)
                            .message("Task cancelled by agent.")
                            .build())
                        .build();
                }

                TaskStatusUpdate taskStatusUpdate = TaskStatusUpdate.builder()
                    .statusVersion(taskStatusVersion)
                    .newStatus(taskStatus)
                    .author(principal)
                    .build();

                return client.tasks().updateTaskStatus(taskId, taskStatusUpdate)
                    .thenAccept(response -> {
                        if (taskActive) {
                            System.out.println("Task could not be cancelled.");
                        } else {
                            System.out.println("Task has been cancelled.");
                        }
                    });
            })
            .exceptionally(ex -> {
                System.err.println("Encountered the following error while cancelling task: " + ex.getMessage());
                return null;
            });
    }

    /**
     * Update task status to STATUS_DONE_OK.
     *
     * @param client Lattice client
     * @param taskId Task ID to complete
     * @param entityId Agent entity ID performing the completion
     * @return CompletableFuture indicating completion
     */
    private static CompletableFuture<Void> completeTask(AsyncLattice client, String taskId, String entityId) {
        // Get current task to retrieve status_version
        return client.tasks().getTask(taskId)
            .thenCompose(task -> {
                if (task.getVersion().isEmpty() || task.getVersion().get().getStatusVersion().isEmpty()) {
                    System.err.println("Task version is missing");
                    return CompletableFuture.failedFuture(new RuntimeException("Task version is missing"));
                }

                int taskStatusVersion = task.getVersion().get().getStatusVersion().get();
                // Increment version and update to terminal state
                taskStatusVersion += 1;

                // Create system principal with the agent entity ID.
                Principal principal = Principal.builder()
                    .system(com.anduril.types.System.builder()
                        .entityId(entityId)
                        .build())
                    .build();

                TaskStatus taskStatus = TaskStatus.builder()
                    .status(TaskStatusStatus.STATUS_DONE_OK)
                    .build();

                TaskStatusUpdate taskStatusUpdate = TaskStatusUpdate.builder()
                    .statusVersion(taskStatusVersion)
                    .newStatus(taskStatus)
                    .author(principal)
                    .build();

                return client.tasks().updateTaskStatus(taskId, taskStatusUpdate)
                    .thenApply(response -> (Void) null);
            })
            .exceptionally(ex -> {
                System.err.println("Encountered the following error while completing task: " + ex.getMessage());
                return null;
            });
    }
}

```

```py title={"Python (REST)"} startLine={127} maxLines={25}
from anduril import AsyncLattice, EntityIdsSelector, TaskStatus, Principal, System, TaskError
import asyncio
import os
import sys

# Sets whether the task is currently being processed, if so, it cannot be cancelled.
task_active = os.getenv('TASK_ACTIVE', 'false').lower() == 'true'

lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')

# Remove sandboxes_token from the following statements if you are not developing on Sandboxes.
sandboxes_token = os.getenv('SANDBOXES_TOKEN')
if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
    print("Missing required environment variables.")
    sys.exit(1)

client = AsyncLattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    # Remove the following header if you are not developing on Sandboxes.
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)

async def start_task(task_id, task_status_version, entity_id):
    try:
        task_status_version += 1
        response = await client.tasks.update_task_status(
            task_id=task_id,
            status_version=task_status_version,
            new_status=TaskStatus(
                status="STATUS_EXECUTING"
            ),
            author=Principal(
                system=System(
                    entity_id=entity_id
                )
            )
        )
        return response
    except Exception as error:
        print(f"Encountered the following error while starting task: {error}")

async def cancel_task(task_id, entity_id):
    try:
        # Get current task to retrieve status_version
        task = await client.tasks.get_task(task_id=task_id)
        if not task.status or not task.version or task.version.status_version is None:
            print("Task status or version is missing")
            return

        current_task_status = task.status.status
        task_status_version = task.version.status_version
        task_status_version += 1
        
        if task_active:
            await client.tasks.update_task_status(
                task_id=task_id,
                status_version=task_status_version,
                new_status=TaskStatus(
                    # Because the cancellation is being rejected, we do not
                    # change the task status.
                    status=current_task_status,
                    task_error=TaskError(
                        code="ERROR_CODE_REJECTED",
                        message="Task is already active, and cannot be cancelled."
                    )
                ),
                author=Principal(
                    system=System(
                        entity_id=entity_id
                    )
                )
            )
            print("Task could not be cancelled.")
        else:
            await client.tasks.update_task_status(
                task_id=task_id,
                status_version=task_status_version,
                new_status=TaskStatus(
                    status="STATUS_DONE_NOT_OK",
                    task_error=TaskError(
                        code="ERROR_CODE_CANCELLED",
                        message="Task cancelled by agent."
                    )
                ),
                author=Principal(
                    system=System(
                        entity_id=entity_id
                    )
                )
            )
            print("Task has been cancelled.")
    except Exception as error:
        print(f"Encountered the following error while cancelling task: {error}")

async def complete_task(task_id, entity_id):
    try:
        # Get current task to retrieve status_version
        task = await client.tasks.get_task(task_id=task_id)
        if not task.version or task.version.status_version is None:
            print("Task version is missing")
            return

        task_status_version = task.version.status_version

        # Increment version and update to terminal state
        task_status_version += 1
        response = await client.tasks.update_task_status(
            task_id=task_id,
            status_version=task_status_version,
            new_status=TaskStatus(
                status="STATUS_DONE_OK"
            ),
            author=Principal(
                system=System(
                    entity_id=entity_id
                )
            )
        )
        return response
    except Exception as error:
        print(f"Encountered the following error while completing task: {error}")

async def main(entity_id):
    try:
        print(f"Streaming tasks for entity: {entity_id}...")
        requests = client.tasks.stream_as_agent(
            agent_selector=EntityIdsSelector(
                entity_ids=[entity_id]
            )
        )

        async for request in requests:
            if request.event == "heartbeat":
                print(f"Heartbeat: {request.timestamp}")
                continue

            if request.execute_request and request.execute_request.task and request.execute_request.task.version:
                version = request.execute_request.task.version
                task_id = version.task_id
                task_status_version = version.status_version
                task_description = request.execute_request.task.description

                print(f"Starting task {task_id}, version {task_status_version}: {task_description}")
                await start_task(task_id, task_status_version, entity_id)

            elif request.complete_request:
                task_id = request.complete_request.task_id
                print(f"Completing task: {task_id}")
                await complete_task(task_id, entity_id)

            elif request.cancel_request:
                task_id = request.cancel_request.task_id
                print(f"Cancelling task: {task_id}")
                await cancel_task(task_id, entity_id)

    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    raise SystemExit(asyncio.run(main(entity_id="<AGENT_ID>")))

```

```ts title={"TypeScript (REST)"} startLine={165} maxLines={25}
import { LatticeClient } from "@anduril-industries/lattice-sdk";

// Entity ID to listen for tasks - replace with your actual entity ID.
const ENTITY_ID = "<AGENT_ID>";



const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;
const sandboxesToken = process.env.SANDBOXES_TOKEN;
const taskActiveStr = process.env.TASK_ACTIVE;

if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

// Sets whether the task is currently being processed. If so, it cannot be cancelled.
const taskActive = taskActiveStr?.toLowerCase() === "true";

const client = new LatticeClient({
    baseUrl: latticeEndpoint.startsWith("https://") ? latticeEndpoint : `https://${latticeEndpoint}`,
    clientId: clientId,
    clientSecret: clientSecret,
    headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
});


// Update task status to STATUS_EXECUTING.
async function startTask(taskId: string, taskStatusVersion: number, agentEntityId: string) {
    try {
        // Increment status version for the update
        taskStatusVersion += 1;

        // Create system principal with the agent entity ID
        const principal = {
            system: {
                entityId: agentEntityId
            }
        };

        // Create task status for update
        const taskStatus = {
            status: "STATUS_EXECUTING" as const
        };

        // Update task status
        const response = await client.tasks.updateTaskStatus({
            taskId: taskId,
            statusVersion: taskStatusVersion,
            newStatus: taskStatus,
            author: principal
        });

        return response;
    } catch (error) {
        console.error(`Encountered the following error while starting task: ${error}`);
        throw error;
    }
}

// Handle cancellation requests from Lattice.
async function cancelTask(taskId: string, entityId: string) {
    try {
        // Get current task to retrieve status_version
        const task = await client.tasks.getTask({ taskId: taskId });

        if (!task.status || !task.version?.statusVersion) {
            console.error("Task status or version is missing");
            return;
        }

        const currentTaskStatus = task.status.status;
        let taskStatusVersion = task.version.statusVersion;
        taskStatusVersion += 1;

        // Create system principal with the agent entity ID
        const principal = {
            system: {
                entityId: entityId
            }
        };

        let taskStatus;
        if (taskActive) {
            // Reject cancellation: task is active and cannot be cancelled
            taskStatus = {
                // Because the cancellation is being rejected, we do not
                // change the task status.
                status: currentTaskStatus,
                taskError: {
                    code: "ERROR_CODE_REJECTED" as const,
                    message: "Task is already active, and cannot be cancelled."
                }
            };
        } else {
            // Accept cancellation
            taskStatus = {
                status: "STATUS_DONE_NOT_OK" as const,
                taskError: {
                    code: "ERROR_CODE_CANCELLED" as const,
                    message: "Task cancelled by agent."
                }
            };
        }

        await client.tasks.updateTaskStatus({
            taskId: taskId,
            statusVersion: taskStatusVersion,
            newStatus: taskStatus,
            author: principal
        });

        if (taskActive) {
            console.log("Task could not be cancelled.");
        } else {
            console.log("Task has been cancelled.");
        }
    } catch (error) {
        console.error(`Encountered the following error while cancelling task: ${error}`);
    }
}


// Update task status to STATUS_DONE_OK.
async function completeTask(taskId: string, entityId: string) {
    try {
        // Get current task to retrieve status_version
        const task = await client.tasks.getTask({ taskId: taskId });

        if (!task.version?.statusVersion) {
            console.error("Task version is missing");
            return;
        }

        let taskStatusVersion = task.version.statusVersion;
        // Increment version and update to terminal state
        taskStatusVersion += 1;

        // Create system principal with the agent entity ID
        const principal = {
            system: {
                entityId: entityId
            }
        };

        const taskStatus = {
            status: "STATUS_DONE_OK" as const
        };

        await client.tasks.updateTaskStatus({
            taskId: taskId,
            statusVersion: taskStatusVersion,
            newStatus: taskStatus,
            author: principal
        });

        console.log("Task has been completed.");
    } catch (error) {
        console.error(`Encountered the following error while completing task: ${error}`);
    }
}

async function App() {
    try {
        console.log(`Streaming tasks for entity: ${ENTITY_ID}...`);

        // Stream tasks from Lattice as an agent
        const requests = await client.tasks.streamAsAgent({
            agentSelector: {
                entityIds: [ENTITY_ID]
            }
        });

        for await (const request of requests) {
            if (request.event === "heartbeat") {
                console.log(`Heartbeat: ${request.timestamp}`);
                continue;
            }

            if (request.executeRequest) {
                const taskId = request.executeRequest.task?.version?.taskId;
                const taskStatusVersion = request.executeRequest.task?.version?.statusVersion;
                const description = request.executeRequest.task?.description || "No description";

                if (taskId && taskStatusVersion !== undefined) {
                    console.log(`Starting task ${taskId}, version ${taskStatusVersion}: ${description}`);

                    try {
                        const result = await startTask(taskId, taskStatusVersion, ENTITY_ID);
                        console.log(`Started task with status version: ${result.version?.statusVersion}`);
                    } catch (error) {
                        console.error(`Error starting task: ${error}`);
                    }
                }
            } else if (request.completeRequest) {
                const taskId = request.completeRequest.taskId;
                if (taskId) {
                    console.log(`Completing task: ${taskId}`);
                    try {
                        await completeTask(taskId, ENTITY_ID);
                    } catch (error) {
                        console.error(`Error completing task: ${error}`);
                    }
                }
            } else if (request.cancelRequest) {
                const taskId = request.cancelRequest.taskId;
                if (taskId) {
                    console.log(`Cancelling task: ${taskId}`);
                    try {
                        await cancelTask(taskId, ENTITY_ID);
                    } catch (error) {
                        console.error(`Error cancelling task: ${error}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Error in streaming loop: ${error}`);
    }
}

App();

```

```go title={"Go (gRPC)"} startLine={62} maxLines={25}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
	"time"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/taskmanager/v1/taskmanagerv1grpc"
	taskmanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/taskmanager/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

// Sets whether the task is currently being processed; if so, it cannot be cancelled.
var taskActive bool

func main() {
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")
	taskActiveStr := os.Getenv("TASK_ACTIVE")

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Parse TASK_ACTIVE environment variable
	taskActive = strings.ToLower(taskActiveStr) == "true"

	// Setup authentication
	auth := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")),
		grpc.WithPerRPCCredentials(auth),
	}

	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	client := taskmanagerv1grpc.NewTaskManagerAPIClient(conn)

	// Set the entity ID to listen for tasks
	entityId := "<AGENT_ID>"
	fmt.Printf("Listening for tasks for entity %s...\n", entityId)

	for {
		try := func() bool {
			ctx := context.Background()

			// Create the ListenAsAgent request
			listenRequest := &taskmanagerv1.ListenAsAgentRequest{
				AgentSelector: &taskmanagerv1.ListenAsAgentRequest_EntityIds{
					EntityIds: &taskmanagerv1.EntityIds{
						EntityIds: []string{entityId},
					},
				},
			}

			// Call the ListenAsAgent method to get a stream of task requests
			stream, err := client.ListenAsAgent(ctx, listenRequest)
			if err != nil {
				fmt.Printf("Error starting task listener: %v\n", err)
				return false
			}

			for {
				response, err := stream.Recv()
				if err == io.EOF {
					fmt.Println("Stream ended")
					return false
				}
				if err != nil {
					fmt.Printf("Error receiving from stream: %v\n", err)
					return false
				}

				// Process the response based on the type of task request
				switch x := response.Request.(type) {
				case *taskmanagerv1.ListenAsAgentResponse_ExecuteRequest:
					if x.ExecuteRequest != nil && x.ExecuteRequest.Task != nil &&
						x.ExecuteRequest.Task.Version != nil && x.ExecuteRequest.Task.Version.TaskId != "" {
						// Extract task-specific information
						taskId := x.ExecuteRequest.Task.Version.TaskId
						taskStatusVersion := x.ExecuteRequest.Task.Version.StatusVersion

						fmt.Printf("Starting task %s, version %d\n", taskId, taskStatusVersion)

						// Update task status to STATUS_EXECUTING
						result, err := executeTask(ctx, client, taskId, taskStatusVersion, entityId)
						if err != nil {
							fmt.Printf("Error starting task: %v\n", err)
							return false
						}

						fmt.Printf("Started task with status version: %d\n", result.StatusVersion)
					}

				case *taskmanagerv1.ListenAsAgentResponse_CompleteRequest:
					if x.CompleteRequest != nil && x.CompleteRequest.TaskId != "" {
						fmt.Printf("Completing task: %s\n", x.CompleteRequest.TaskId)
						err := completeTask(ctx, client, x.CompleteRequest.TaskId, entityId)
						if err != nil {
							fmt.Printf("Error completing task: %v\n", err)
						}
					}

				case *taskmanagerv1.ListenAsAgentResponse_CancelRequest:
					if x.CancelRequest != nil && x.CancelRequest.TaskId != "" {
						fmt.Printf("Cancelling task: %s\n", x.CancelRequest.TaskId)
						err := cancelTask(ctx, client, x.CancelRequest.TaskId, entityId)
						if err != nil {
							fmt.Printf("Error cancelling task: %v\n", err)
						}
					}
				}
			}
		}()

		if !try {
			// If there was an error, wait a bit before retrying
			time.Sleep(1 * time.Second)
		}
	}
}

// executeTask updates the task status to STATUS_EXECUTING
func executeTask(ctx context.Context, client taskmanagerv1grpc.TaskManagerAPIClient, taskId string, taskStatusVersion uint32, agentEntityId string) (*taskmanagerv1.TaskVersion, error) {
	// Increment status version for the update
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := &taskmanagerv1.Principal{
		Agent: &taskmanagerv1.Principal_System{
			System: &taskmanagerv1.System{
				EntityId: agentEntityId,
			},
		},
	}

	// Create task status update
	taskStatus := &taskmanagerv1.TaskStatus{
		Status: taskmanagerv1.Status_STATUS_EXECUTING,
	}

	// Create status update request
	statusUpdate := &taskmanagerv1.StatusUpdate{
		Version: &taskmanagerv1.TaskVersion{
			TaskId:            taskId,
			DefinitionVersion: 0,
			StatusVersion:     taskStatusVersion,
		},
		Status: taskStatus,
		Author: principal,
	}

	// Create the update status request
	updateRequest := &taskmanagerv1.UpdateStatusRequest{
		StatusUpdate: statusUpdate,
	}

	// Call the UpdateStatus API
	response, err := client.UpdateStatus(ctx, updateRequest)
	if err != nil {
		return nil, fmt.Errorf("error updating task status: %w", err)
	}

	return response.Task.Version, nil
}

// cancelTask handles cancellation requests from Lattice
func cancelTask(ctx context.Context, client taskmanagerv1grpc.TaskManagerAPIClient, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := &taskmanagerv1.GetTaskRequest{
		TaskId: taskId,
	}
	taskResponse, err := client.GetTask(ctx, getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}
	if taskResponse.Task == nil || taskResponse.Task.Status == nil || taskResponse.Task.Version == nil {
		return fmt.Errorf("task status or version is missing")
	}
	currentTaskStatus := taskResponse.Task.Status.Status
	taskStatusVersion := taskResponse.Task.Version.StatusVersion
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := &taskmanagerv1.Principal{
		Agent: &taskmanagerv1.Principal_System{
			System: &taskmanagerv1.System{
				EntityId: entityId,
			},
		},
	}

	if taskActive {
		// Reject cancellation: task is active and cannot be cancelled
		taskStatus := &taskmanagerv1.TaskStatus{
			// Because the cancellation is being rejected, we do not
			// change the task status.
			Status: currentTaskStatus,
			TaskError: &taskmanagerv1.TaskError{
				Code:    taskmanagerv1.ErrorCode_ERROR_CODE_REJECTED,
				Message: "Task is already active, and cannot be cancelled.",
			},
		}

		statusUpdate := &taskmanagerv1.StatusUpdate{
			Version: &taskmanagerv1.TaskVersion{
				TaskId:            taskId,
				DefinitionVersion: 0,
				StatusVersion:     taskStatusVersion,
			},
			Status: taskStatus,
			Author: principal,
		}

		updateRequest := &taskmanagerv1.UpdateStatusRequest{
			StatusUpdate: statusUpdate,
		}

		_, err := client.UpdateStatus(ctx, updateRequest)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task could not be cancelled.")
	} else {
		// Accept cancellation
		taskStatus := &taskmanagerv1.TaskStatus{
			Status: taskmanagerv1.Status_STATUS_DONE_NOT_OK,
			TaskError: &taskmanagerv1.TaskError{
				Code:    taskmanagerv1.ErrorCode_ERROR_CODE_CANCELLED,
				Message: "Task cancelled by agent.",
			},
		}

		statusUpdate := &taskmanagerv1.StatusUpdate{
			Version: &taskmanagerv1.TaskVersion{
				TaskId:            taskId,
				DefinitionVersion: 0,
				StatusVersion:     taskStatusVersion,
			},
			Status: taskStatus,
			Author: principal,
		}

		updateRequest := &taskmanagerv1.UpdateStatusRequest{
			StatusUpdate: statusUpdate,
		}

		_, err := client.UpdateStatus(ctx, updateRequest)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task has been cancelled.")
	}

	return nil
}

// completeTask updates the task status to STATUS_DONE_OK
func completeTask(ctx context.Context, client taskmanagerv1grpc.TaskManagerAPIClient, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := &taskmanagerv1.GetTaskRequest{
		TaskId: taskId,
	}

	taskResponse, err := client.GetTask(ctx, getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}

	if taskResponse.Task == nil || taskResponse.Task.Version == nil {
		return fmt.Errorf("task version is missing")
	}

	taskStatusVersion := taskResponse.Task.Version.StatusVersion
	// Increment version and update to terminal state
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := &taskmanagerv1.Principal{
		Agent: &taskmanagerv1.Principal_System{
			System: &taskmanagerv1.System{
				EntityId: entityId,
			},
		},
	}

	taskStatus := &taskmanagerv1.TaskStatus{
		Status: taskmanagerv1.Status_STATUS_DONE_OK,
	}

	statusUpdate := &taskmanagerv1.StatusUpdate{
		Version: &taskmanagerv1.TaskVersion{
			TaskId:            taskId,
			DefinitionVersion: 0,
			StatusVersion:     taskStatusVersion,
		},
		Status: taskStatus,
		Author: principal,
	}

	updateRequest := &taskmanagerv1.UpdateStatusRequest{
		StatusUpdate: statusUpdate,
	}

	_, err = client.UpdateStatus(ctx, updateRequest)
	if err != nil {
		return fmt.Errorf("error updating task status: %w", err)
	}

	return nil
}

```

```py title={"Python (gRPC)"} startLine={143} maxLines={25}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import time
import grpc
from auth import ClientCredentialsAuth

from anduril.taskmanager.v1.task.pub_pb2 import (
    ErrorCode,
    Principal,
    Status,
    System,
    TaskError,
    TaskStatus,
    TaskVersion,
    StatusUpdate,
)
from anduril.taskmanager.v1.task_manager_api.pub_pb2 import (
    EntityIds,
    GetTaskRequest,
    ListenAsAgentRequest,
    UpdateStatusRequest,
)
from anduril.taskmanager.v1.task_manager_api.pub_pb2_grpc import TaskManagerAPIStub


def execute_task(client, task_id, task_status_version, agent_entity_id):
    """Update the task status to STATUS_EXECUTING."""
    task_status_version += 1

    principal = Principal(system=System(entity_id=agent_entity_id))
    task_status = TaskStatus(status=Status.STATUS_EXECUTING)

    status_update = StatusUpdate(
        version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
        status=task_status,
        author=principal,
    )

    response = client.UpdateStatus(UpdateStatusRequest(status_update=status_update))
    return response.task.version


def cancel_task(client, task_id, entity_id, task_active):
    """Handle a cancellation request from Lattice."""
    task_response = client.GetTask(GetTaskRequest(task_id=task_id))
    if not task_response.task or not task_response.task.status or not task_response.task.version:
        raise RuntimeError("task status or version is missing")

    current_task_status = task_response.task.status.status
    task_status_version = task_response.task.version.status_version + 1

    principal = Principal(system=System(entity_id=entity_id))

    if task_active:
        # Reject cancellation: task is active and cannot be cancelled
        task_status = TaskStatus(
            # Because the cancellation is being rejected, we do not
            # change the task status.
            status=current_task_status,
            task_error=TaskError(
                code=ErrorCode.ERROR_CODE_REJECTED,
                message="Task is already active, and cannot be cancelled.",
            ),
        )
        status_update = StatusUpdate(
            version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
            status=task_status,
            author=principal,
        )
        client.UpdateStatus(UpdateStatusRequest(status_update=status_update))
        print("Task could not be cancelled.")
    else:
        # Accept cancellation
        task_status = TaskStatus(
            status=Status.STATUS_DONE_NOT_OK,
            task_error=TaskError(
                code=ErrorCode.ERROR_CODE_CANCELLED,
                message="Task cancelled by agent.",
            ),
        )
        status_update = StatusUpdate(
            version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
            status=task_status,
            author=principal,
        )
        client.UpdateStatus(UpdateStatusRequest(status_update=status_update))
        print("Task has been cancelled.")


def complete_task(client, task_id, entity_id):
    """Update the task status to STATUS_DONE_OK."""
    task_response = client.GetTask(GetTaskRequest(task_id=task_id))
    if not task_response.task or not task_response.task.version:
        raise RuntimeError("task version is missing")

    task_status_version = task_response.task.version.status_version + 1

    principal = Principal(system=System(entity_id=entity_id))
    task_status = TaskStatus(status=Status.STATUS_DONE_OK)

    status_update = StatusUpdate(
        version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
        status=task_status,
        author=principal,
    )
    client.UpdateStatus(UpdateStatusRequest(status_update=status_update))


def main():
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    # Sets whether the task is currently being processed; if so, it cannot be cancelled.
    task_active = os.getenv("TASK_ACTIVE", "").lower() == "true"

    if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
        print("Missing required environment variables", file=sys.stderr)
        sys.exit(1)

    auth = ClientCredentialsAuth(
        client_id=client_id,
        client_secret=client_secret,
        sandboxes_token=sandboxes_token,
        endpoint=f"https://{lattice_endpoint}/api/v1/oauth/token",
    )

    credentials = grpc.ssl_channel_credentials()
    channel = grpc.intercept_channel(
        grpc.secure_channel(lattice_endpoint, credentials),
        auth.create_metadata_interceptor(),
    )

    client = TaskManagerAPIStub(channel)

    entity_id = "<AGENT_ID>"
    print(f"Listening for tasks for entity {entity_id}...")

    while True:
        try:
            listen_request = ListenAsAgentRequest(
                entity_ids=EntityIds(entity_ids=[entity_id])
            )
            stream = client.ListenAsAgent(listen_request)

            for response in stream:
                if response.HasField("execute_request"):
                    task = response.execute_request.task
                    if task and task.version and task.version.task_id:
                        task_id = task.version.task_id
                        task_status_version = task.version.status_version
                        print(f"Starting task {task_id}, version {task_status_version}")

                        try:
                            result = execute_task(client, task_id, task_status_version, entity_id)
                            print(f"Started task with status version: {result.status_version}")
                        except Exception as error:
                            print(f"Error starting task: {error}", file=sys.stderr)
                            break
                elif response.HasField("complete_request"):
                    if response.complete_request.task_id:
                        print(f"Completing task: {response.complete_request.task_id}")
                        try:
                            complete_task(client, response.complete_request.task_id, entity_id)
                        except Exception as error:
                            print(f"Error completing task: {error}", file=sys.stderr)
                elif response.HasField("cancel_request"):
                    if response.cancel_request.task_id:
                        print(f"Cancelling task: {response.cancel_request.task_id}")
                        try:
                            cancel_task(client, response.cancel_request.task_id, entity_id, task_active)
                        except Exception as error:
                            print(f"Error cancelling task: {error}", file=sys.stderr)
        except Exception as error:
            print(f"Error in stream: {error}", file=sys.stderr)

        # If the stream ended or errored, wait a bit before retrying
        time.sleep(1)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={71} maxLines={25}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::taskmanager::v1::{
    listen_as_agent_request, listen_as_agent_response, principal, EntityIds, ErrorCode,
    GetTaskRequest, ListenAsAgentRequest, Principal, Status, StatusUpdate, System, TaskError,
    TaskStatus, TaskVersion, UpdateStatusRequest,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::taskmanager::v1::tonic::task_manager_api_client::TaskManagerApiClient;
use auth::ClientCredentialsAuth;
use tonic::metadata::MetadataValue;
use tonic::service::interceptor::InterceptedService;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use std::env;
use std::time::Duration;

type Interceptor = Box<dyn FnMut(Request<()>) -> Result<Request<()>, tonic::Status> + Send + Sync>;
type TaskClient = TaskManagerApiClient<InterceptedService<Channel, Interceptor>>;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client_id = env::var("LATTICE_CLIENT_ID")
        .expect("LATTICE_CLIENT_ID environment variable not set");
    let client_secret = env::var("LATTICE_CLIENT_SECRET")
        .expect("LATTICE_CLIENT_SECRET environment variable not set");
    let lattice_endpoint = env::var("LATTICE_ENDPOINT")
        .expect("LATTICE_ENDPOINT environment variable not set");
    let sandboxes_token = env::var("SANDBOXES_TOKEN")
        .expect("SANDBOXES_TOKEN environment variable not set");

    // When true, the agent cannot accept cancellations for an active task.
    let task_active = env::var("TASK_ACTIVE")
        .map(|v| v.eq_ignore_ascii_case("true"))
        .unwrap_or(false);

    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token,
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    let tls_config = ClientTlsConfig::new().with_native_roots();
    let channel = Channel::from_shared(format!("https://{}", lattice_endpoint))?
        .tls_config(tls_config)?
        .connect()
        .await?;

    let access_token = auth.get_token().await?;
    let sandboxes_token = auth.sandboxes_token().to_string();
    let auth_header: MetadataValue<_> = format!("Bearer {}", access_token).parse()?;
    let sandbox_header: MetadataValue<_> = format!("Bearer {}", sandboxes_token).parse()?;

    let interceptor: Interceptor = Box::new(move |mut req: Request<()>| {
        req.metadata_mut()
            .insert("authorization", auth_header.clone());
        req.metadata_mut()
            .insert("anduril-sandbox-authorization", sandbox_header.clone());
        Ok(req)
    });
    let mut client: TaskClient = TaskManagerApiClient::with_interceptor(channel, interceptor);

    // Set the entity ID to listen for tasks
    let entity_id = "<AGENT_ID>".to_string();
    println!("Listening for tasks for entity {}...", entity_id);

    loop {
        let request = Request::new(ListenAsAgentRequest {
            agent_selector: Some(listen_as_agent_request::AgentSelector::EntityIds(EntityIds {
                entity_ids: vec![entity_id.clone()],
            })),
            ..Default::default()
        });

        let mut stream = match client.listen_as_agent(request).await {
            Ok(resp) => resp.into_inner(),
            Err(e) => {
                eprintln!("Error starting task listener: {}", e);
                tokio::time::sleep(Duration::from_secs(1)).await;
                continue;
            }
        };

        loop {
            let response = match stream.message().await {
                Ok(Some(r)) => r,
                Ok(None) => {
                    println!("Stream ended");
                    break;
                }
                Err(e) => {
                    eprintln!("Error receiving from stream: {}", e);
                    break;
                }
            };

            match response.request {
                Some(listen_as_agent_response::Request::ExecuteRequest(execute)) => {
                    if let Some(task) = execute.task {
                        if let Some(version) = task.version {
                            let task_id = version.task_id.clone();
                            let status_version = version.status_version;
                            println!("Starting task {}, version {}", task_id, status_version);

                            match execute_task(&mut client, &task_id, status_version, &entity_id)
                                .await
                            {
                                Ok(v) => println!(
                                    "Started task with status version: {}",
                                    v.status_version
                                ),
                                Err(e) => eprintln!("Error starting task: {}", e),
                            }
                        }
                    }
                }
                Some(listen_as_agent_response::Request::CompleteRequest(complete)) => {
                    if !complete.task_id.is_empty() {
                        println!("Completing task: {}", complete.task_id);
                        if let Err(e) =
                            complete_task(&mut client, &complete.task_id, &entity_id).await
                        {
                            eprintln!("Error completing task: {}", e);
                        }
                    }
                }
                Some(listen_as_agent_response::Request::CancelRequest(cancel)) => {
                    if !cancel.task_id.is_empty() {
                        println!("Cancelling task: {}", cancel.task_id);
                        if let Err(e) =
                            cancel_task(&mut client, &cancel.task_id, &entity_id, task_active)
                                .await
                        {
                            eprintln!("Error cancelling task: {}", e);
                        }
                    }
                }
                None => {}
            }
        }

        tokio::time::sleep(Duration::from_secs(1)).await;
    }
}

fn system_principal(entity_id: &str) -> Principal {
    Principal {
        agent: Some(principal::Agent::System(System {
            entity_id: entity_id.to_string(),
            ..Default::default()
        })),
        ..Default::default()
    }
}

// execute_task updates the task status to STATUS_EXECUTING.
async fn execute_task(
    client: &mut TaskClient,
    task_id: &str,
    task_status_version: u32,
    agent_entity_id: &str,
) -> Result<TaskVersion, tonic::Status> {
    let status_update = StatusUpdate {
        version: Some(TaskVersion {
            task_id: task_id.to_string(),
            status_version: task_status_version + 1,
            definition_version: 0,
            ..Default::default()
        }),
        status: Some(TaskStatus {
            status: Status::Executing as i32,
            ..Default::default()
        }),
        author: Some(system_principal(agent_entity_id)),
        ..Default::default()
    };

    let response = client
        .update_status(Request::new(UpdateStatusRequest {
            status_update: Some(status_update),
        }))
        .await?;

    response
        .into_inner()
        .task
        .and_then(|t| t.version)
        .ok_or_else(|| tonic::Status::internal("missing task version in response"))
}

// cancel_task handles cancellation requests from Lattice.
async fn cancel_task(
    client: &mut TaskClient,
    task_id: &str,
    entity_id: &str,
    task_active: bool,
) -> Result<(), tonic::Status> {
    // Get current task to retrieve status_version
    let task_response = client
        .get_task(Request::new(GetTaskRequest {
            task_id: task_id.to_string(),
            ..Default::default()
        }))
        .await?
        .into_inner()
        .task
        .ok_or_else(|| tonic::Status::internal("task is missing"))?;

    let current_status = task_response
        .status
        .as_ref()
        .map(|s| s.status)
        .unwrap_or(0);
    let version = task_response
        .version
        .ok_or_else(|| tonic::Status::internal("task version is missing"))?;
    let next_status_version = version.status_version + 1;

    let principal = system_principal(entity_id);

    let status_update = if task_active {
        // Reject cancellation: task is active and cannot be cancelled. Because
        // the cancellation is being rejected, we do not change the task status.
        StatusUpdate {
            version: Some(TaskVersion {
                task_id: task_id.to_string(),
                status_version: next_status_version,
                definition_version: 0,
                ..Default::default()
            }),
            status: Some(TaskStatus {
                status: current_status,
                task_error: Some(TaskError {
                    code: ErrorCode::Rejected as i32,
                    message: "Task is already active, and cannot be cancelled.".to_string(),
                    ..Default::default()
                }),
                ..Default::default()
            }),
            author: Some(principal),
            ..Default::default()
        }
    } else {
        // Accept cancellation
        StatusUpdate {
            version: Some(TaskVersion {
                task_id: task_id.to_string(),
                status_version: next_status_version,
                definition_version: 0,
                ..Default::default()
            }),
            status: Some(TaskStatus {
                status: Status::DoneNotOk as i32,
                task_error: Some(TaskError {
                    code: ErrorCode::Cancelled as i32,
                    message: "Task cancelled by agent.".to_string(),
                    ..Default::default()
                }),
                ..Default::default()
            }),
            author: Some(principal),
            ..Default::default()
        }
    };

    client
        .update_status(Request::new(UpdateStatusRequest {
            status_update: Some(status_update),
        }))
        .await?;

    if task_active {
        println!("Task could not be cancelled.");
    } else {
        println!("Task has been cancelled.");
    }
    Ok(())
}

// complete_task updates the task status to STATUS_DONE_OK.
async fn complete_task(
    client: &mut TaskClient,
    task_id: &str,
    entity_id: &str,
) -> Result<(), tonic::Status> {
    // Get current task to retrieve status_version
    let version = client
        .get_task(Request::new(GetTaskRequest {
            task_id: task_id.to_string(),
            ..Default::default()
        }))
        .await?
        .into_inner()
        .task
        .and_then(|t| t.version)
        .ok_or_else(|| tonic::Status::internal("task version is missing"))?;

    let status_update = StatusUpdate {
        version: Some(TaskVersion {
            task_id: task_id.to_string(),
            // Increment version and update to terminal state
            status_version: version.status_version + 1,
            definition_version: 0,
            ..Default::default()
        }),
        status: Some(TaskStatus {
            status: Status::DoneOk as i32,
            ..Default::default()
        }),
        author: Some(system_principal(entity_id)),
        ..Default::default()
    };

    client
        .update_status(Request::new(UpdateStatusRequest {
            status_update: Some(status_update),
        }))
        .await?;
    Ok(())
}

```

The [`StreamAsAgent`](/reference/rest/tasks/stream-as-agent) API establishes a server-sent events (SSE) stream that delivers three types of requests:
**`executeRequest`** which notifies the agent to start executing a task, **`completeRequest`** which requests the agent to complete a task, and
**`cancelRequest`** which equests the agent to cancel a task.

When a `cancelRequest` arrives, the agent retrieves the current task state and decides whether to accept or reject the cancellation.

**Rejecting cancellation:**

If the task is active and cannot be cancelled, the agent rejects the cancellation by
keeping the current status and attaching a [`TaskError`](/reference/rest/tasks/update-task-status#request.body.newStatus.taskError)
with code [`ERROR_CODE_REJECTED`](/reference/rest/tasks/update-task-status#request.body.newStatus.taskError.code):

```go title={"Go (REST)"} startLine={198} maxLines={18}
package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	Lattice "github.com/anduril/lattice-sdk-go/v4"
	"github.com/anduril/lattice-sdk-go/v4/client"
	"github.com/anduril/lattice-sdk-go/v4/option"
)

// Sets whether the task is currently being processed. If so, it cannot be cancelled.
var taskActive bool

func main() {
	// Get environment variables
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	clientId := os.Getenv("LATTICE_CLIENT_ID")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")
	taskActiveStr := os.Getenv("TASK_ACTIVE")

	// Check required environment variables
	if latticeEndpoint == "" || clientId == "" || clientSecret == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Parse TASK_ACTIVE environment variable
	taskActive = strings.ToLower(taskActiveStr) == "true"

	// Initialize headers for sandbox authorization
	headers := http.Header{}
	headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))

	// Create the client
	LatticeClient := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)

	// Set the entity ID to listen for tasks
	entityId := "<AGENT_ID>"
	fmt.Printf("Streaming tasks for entity: %s...\n", entityId)

	// Create context for the request
	ctx := context.Background()

	// Create agent stream request
	agentStreamRequest := Lattice.AgentStreamRequest{
		AgentSelector: &Lattice.EntityIDsSelector{
			EntityIDs: []string{entityId},
		},
	}

	// Stream tasks
	stream, err := LatticeClient.Tasks.StreamAsAgent(ctx, &agentStreamRequest)
	if err != nil {
		fmt.Printf("Error streaming tasks: %v\n", err)
		os.Exit(1)
	}

	// Process stream events
	for {
		select {
		case <-ctx.Done():
			log.Printf("Context canceled: %v", ctx.Err())
			return
		default:
			// Continue processing
		}

		event, err := stream.Recv()

		if errors.Is(err, io.EOF) {
			log.Println("Stream completed successfully.")
			return
		}

		if err != nil {
			log.Printf("Error receiving message: %v", err)
			continue
		}

		if event.Event == "heartbeat" {
			timestamp := *event.Heartbeat.Timestamp
			log.Printf("Heartbeat: %s", timestamp)
		} else {
			request := event.GetAgentRequest()
			if executeRequest := request.GetExecuteRequest(); executeRequest != nil {
				task := executeRequest.GetTask()
				if task != nil {
					taskId := *task.GetVersion().GetTaskID()
					taskStatusVersion := *task.GetVersion().GetStatusVersion()
					description := *task.GetDescription()

					log.Printf("Starting task %s, version %d: %s", taskId, taskStatusVersion, description)

					// Update task status to STATUS_EXECUTING
					result, err := executeTask(ctx, LatticeClient, taskId, int(taskStatusVersion), entityId)
					if err != nil {
						log.Printf("Error starting task: %v", err)
						continue
					}

					log.Printf("Started task with status version: %d", *result.StatusVersion)
				}
			} else if completeRequest := request.GetCompleteRequest(); completeRequest != nil {
				taskToComplete := completeRequest.GetTaskID()
				if taskToComplete != nil {
					log.Printf("Completing task: %s", *taskToComplete)
					err := completeTask(ctx, LatticeClient, *taskToComplete, entityId)
					if err != nil {
						log.Printf("Error completing task: %v", err)
					}
				}
			} else if cancelRequest := request.GetCancelRequest(); cancelRequest != nil {
				taskToCancel := cancelRequest.GetTaskID()
				if taskToCancel != nil {
					log.Printf("Cancelling task: %s", *taskToCancel)
					err := cancelTask(ctx, LatticeClient, *taskToCancel, entityId)
					if err != nil {
						log.Printf("Error cancelling task: %v", err)
					}
				}
			}
		}

		// Sleep briefly to prevent tight looping
		time.Sleep(100 * time.Millisecond)
	}
}

// executeTask updates the task status to STATUS_EXECUTING
func executeTask(ctx context.Context, client *client.Client, taskId string, taskStatusVersion int, agentEntityId string) (*Lattice.TaskVersion, error) {
	// Increment status version for the update
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := Lattice.Principal{
		System: &Lattice.System{
			EntityID: &agentEntityId,
		},
	}

	taskStatus := Lattice.TaskStatus{
		Status: Lattice.TaskStatusStatusStatusExecuting.Ptr(),
	}

	// Create task status update request
	taskStatusUpdate := Lattice.TaskStatusUpdate{
		TaskID:        taskId,
		StatusVersion: &taskStatusVersion,
		NewStatus:     &taskStatus,
		Author:        &principal,
	}

	// Call the UpdateTaskStatus API
	task, err := client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
	if err != nil {
		return nil, fmt.Errorf("error updating task status: %w", err)
	}

	return task.Version, nil
}

// cancelTask handles cancellation requests from Lattice
func cancelTask(ctx context.Context, client *client.Client, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := Lattice.GetTaskRequest{
		TaskID: taskId,
	}
	task, err := client.Tasks.GetTask(ctx, &getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}
	if task.Status == nil || task.Version == nil || task.Version.StatusVersion == nil {
		return fmt.Errorf("task status or version is missing")
	}
	currentTaskStatus := task.Status.Status
	taskStatusVersion := *task.Version.StatusVersion
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := Lattice.Principal{
		System: &Lattice.System{
			EntityID: &entityId,
		},
	}

	if taskActive {
		// Reject cancellation: task is active and cannot be cancelled
		rejectedMessage := "Task is already active, and cannot be cancelled."
		taskStatus := Lattice.TaskStatus{
			// Because the cancellation is being rejected, we do not
			// change the task status.
			Status: currentTaskStatus,
			TaskError: &Lattice.TaskError{
				Code:    Lattice.TaskErrorCodeErrorCodeRejected.Ptr(),
				Message: &rejectedMessage,
			},
		}

		taskStatusUpdate := Lattice.TaskStatusUpdate{
			TaskID:        taskId,
			StatusVersion: &taskStatusVersion,
			NewStatus:     &taskStatus,
			Author:        &principal,
		}

		_, err := client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task could not be cancelled.")
	} else {
		// Accept cancellation
		cancelledMessage := "Task cancelled by agent."
		taskStatus := Lattice.TaskStatus{
			Status: Lattice.TaskStatusStatusStatusDoneNotOk.Ptr(),
			TaskError: &Lattice.TaskError{
				Code:    Lattice.TaskErrorCodeErrorCodeCancelled.Ptr(),
				Message: &cancelledMessage,
			},
		}

		taskStatusUpdate := Lattice.TaskStatusUpdate{
			TaskID:        taskId,
			StatusVersion: &taskStatusVersion,
			NewStatus:     &taskStatus,
			Author:        &principal,
		}

		_, err := client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task has been cancelled.")
	}

	return nil
}

// completeTask updates the task status to STATUS_DONE_OK
func completeTask(ctx context.Context, client *client.Client, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := Lattice.GetTaskRequest{
		TaskID: taskId,
	}
	task, err := client.Tasks.GetTask(ctx, &getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}

	if task.Version == nil || task.Version.StatusVersion == nil {
		return fmt.Errorf("task version is missing")
	}

	taskStatusVersion := *task.Version.StatusVersion
	// Increment version and update to terminal state
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := Lattice.Principal{
		System: &Lattice.System{
			EntityID: &entityId,
		},
	}

	taskStatus := Lattice.TaskStatus{
		Status: Lattice.TaskStatusStatusStatusDoneOk.Ptr(),
	}

	taskStatusUpdate := Lattice.TaskStatusUpdate{
		TaskID:        taskId,
		StatusVersion: &taskStatusVersion,
		NewStatus:     &taskStatus,
		Author:        &principal,
	}

	_, err = client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
	if err != nil {
		return fmt.Errorf("error updating task status: %w", err)
	}

	return nil
}

```

```java title={"Java (REST)"} startLine={202} maxLines={18}
package org.example;

import java.util.Arrays;
import java.util.concurrent.CompletableFuture;

import com.anduril.AsyncLattice;
import com.anduril.resources.tasks.requests.AgentStreamRequest;
import com.anduril.resources.tasks.requests.TaskStatusUpdate;
import com.anduril.resources.tasks.types.StreamAsAgentResponse;
import com.anduril.types.AgentStreamEvent;
import com.anduril.types.EntityIdsSelector;
import com.anduril.types.Principal;
import com.anduril.types.TaskError;
import com.anduril.types.TaskErrorCode;
import com.anduril.types.TaskStatus;
import com.anduril.types.TaskStatusStatus;
import com.anduril.types.TaskVersion;
public class ProcessTask {
    // Entity ID to listen for tasks - replace with your actual entity ID.
    private static final String ENTITY_ID = "<AGENT_ID>";

    // Sets whether the task is currently being processed. If so, it cannot be cancelled.
    private static boolean taskActive;

    public static void main(String[] args) {
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");
        String taskActiveStr = System.getenv("TASK_ACTIVE");

        if (endpoint == null || clientId == null || clientSecret == null || sandboxesToken == null) {
            System.err.println("Missing required environment variables.");
            System.exit(1);
        }
        if (!endpoint.startsWith("https://")) endpoint = "https://" + endpoint;

        taskActive = "true".equalsIgnoreCase(taskActiveStr);

        try {
            AsyncLattice client = AsyncLattice.builder()
                .url(endpoint)
                .credentials(clientId, clientSecret)
                .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
                .build();

            System.out.println("Streaming tasks for entity: " + ENTITY_ID + "...");

            // Create agent selector with the specified entity ID.
            EntityIdsSelector agentSelector = EntityIdsSelector.builder()
                .entityIds(Arrays.asList(ENTITY_ID))
                .build();

            // Create agent stream request.
            AgentStreamRequest agentRequest = AgentStreamRequest.builder()
                .agentSelector(agentSelector)
                .build();

            // Stream tasks from Lattice as an agent
            client.tasks().streamAsAgent(agentRequest)
                .thenAccept(requests -> {
                    for (StreamAsAgentResponse request : requests) {
                        if (request.isHeartbeat()) {
                            System.out.println("Heartbeat: " + request.getHeartbeat().get().getTimestamp().get());
                        } else {
                            AgentStreamEvent event = request.getAgentRequest().get();
                            if (event.getExecuteRequest().isPresent()) {
                                String taskId = event.getExecuteRequest().get()
                                    .getTask().get()
                                    .getVersion().get()
                                    .getTaskId().get();

                                int taskStatusVersion = event.getExecuteRequest().get()
                                    .getTask().get()
                                    .getVersion().get()
                                    .getStatusVersion().get();

                                String description = event.getExecuteRequest().get()
                                    .getTask().get()
                                    .getDescription().orElse("No description");

                                System.out.println("Starting task " + taskId + ", version " + taskStatusVersion + ": " + description);

                                try {
                                    TaskVersion result = startTask(client, taskId, taskStatusVersion, ENTITY_ID).get();
                                    System.out.println("Started task with status version: " + result.getStatusVersion().get());
                                } catch (Exception e) {
                                    System.err.println("Error starting task: " + e.getMessage());
                                }
                            } else if (event.getCompleteRequest().isPresent()) {
                                String taskId = event.getCompleteRequest().get().getTaskId().get();
                                System.out.println("Completing task: " + taskId);
                                try {
                                    completeTask(client, taskId, ENTITY_ID).get();
                                } catch (Exception e) {
                                    System.err.println("Error completing task: " + e.getMessage());
                                }
                            } else if (event.getCancelRequest().isPresent()) {
                                String taskId = event.getCancelRequest().get().getTaskId().get();
                                System.out.println("Cancelling task: " + taskId);
                                try {
                                    cancelTask(client, taskId, ENTITY_ID).get();
                                } catch (Exception e) {
                                    System.err.println("Error cancelling task: " + e.getMessage());
                                }
                            }
                        }
                    }
                })
                .exceptionally(ex -> {
                    System.err.println("Exception while streaming tasks: " + ex.getMessage());
                    return null;
                })
                .join();
        } catch (Exception e) {
            System.err.println("Error in streaming loop: " + e.getMessage());
        }
    }

    /**
     * Update task status to STATUS_EXECUTING.
     *
     * @param client Lattice client
     * @param taskId Task ID to update
     * @param taskStatusVersion Current task status version
     * @param agentEntityId Agent entity ID performing the update
     * @return CompletableFuture containing the updated TaskVersion
     */
    private static CompletableFuture<TaskVersion> startTask(AsyncLattice client, String taskId, Integer taskStatusVersion, String agentEntityId) {
        try {
            // Increment status version for the update
            taskStatusVersion += 1;

            // Create system principal with the agent entity ID.
            Principal principal = Principal.builder()
                .system(com.anduril.types.System.builder()
                    .entityId(agentEntityId)
                    .build())
                .build();

            // Create task status for update.
            TaskStatus taskStatus = TaskStatus.builder()
                .status(TaskStatusStatus.STATUS_EXECUTING)
                .build();

            // Create task status update request.
            TaskStatusUpdate taskStatusUpdate = TaskStatusUpdate.builder()
                .statusVersion(taskStatusVersion)
                .newStatus(taskStatus)
                .author(principal)
                .build();

            return client.tasks().updateTaskStatus(taskId, taskStatusUpdate)
                .thenApply(response -> response.getVersion().get());
        } catch (Exception e) {
            System.err.println("Encountered the following error while starting task: " + e.getMessage());
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Handle cancellation requests from Lattice.
     *
     * @param client Lattice client
     * @param taskId Task ID to cancel
     * @param entityId Agent entity ID performing the cancellation
     * @return CompletableFuture indicating completion
     */
    private static CompletableFuture<Void> cancelTask(AsyncLattice client, String taskId, String entityId) {
        // Get current task to retrieve status_version
        return client.tasks().getTask(taskId)
            .thenCompose(task -> {
                if (task.getStatus().isEmpty() || task.getVersion().isEmpty() || task.getVersion().get().getStatusVersion().isEmpty()) {
                    System.err.println("Task status or version is missing");
                    return CompletableFuture.failedFuture(new RuntimeException("Task status or version is missing"));
                }

                TaskStatusStatus currentTaskStatus = task.getStatus().get().getStatus().get();
                int taskStatusVersion = task.getVersion().get().getStatusVersion().get();
                taskStatusVersion += 1;

                // Create system principal with the agent entity ID.
                Principal principal = Principal.builder()
                    .system(com.anduril.types.System.builder()
                        .entityId(entityId)
                        .build())
                    .build();

                TaskStatus taskStatus;
                if (taskActive) {
                    // Reject cancellation: task is active and cannot be cancelled
                    taskStatus = TaskStatus.builder()
                        // Because the cancellation is being rejected, we do not
                        // change the task status.
                        .status(currentTaskStatus)
                        .taskError(TaskError.builder()
                            .code(TaskErrorCode.ERROR_CODE_REJECTED)
                            .message("Task is already active, and cannot be cancelled.")
                            .build())
                        .build();
                } else {
                    // Accept cancellation
                    taskStatus = TaskStatus.builder()
                        .status(TaskStatusStatus.STATUS_DONE_NOT_OK)
                        .taskError(TaskError.builder()
                            .code(TaskErrorCode.ERROR_CODE_CANCELLED)
                            .message("Task cancelled by agent.")
                            .build())
                        .build();
                }

                TaskStatusUpdate taskStatusUpdate = TaskStatusUpdate.builder()
                    .statusVersion(taskStatusVersion)
                    .newStatus(taskStatus)
                    .author(principal)
                    .build();

                return client.tasks().updateTaskStatus(taskId, taskStatusUpdate)
                    .thenAccept(response -> {
                        if (taskActive) {
                            System.out.println("Task could not be cancelled.");
                        } else {
                            System.out.println("Task has been cancelled.");
                        }
                    });
            })
            .exceptionally(ex -> {
                System.err.println("Encountered the following error while cancelling task: " + ex.getMessage());
                return null;
            });
    }

    /**
     * Update task status to STATUS_DONE_OK.
     *
     * @param client Lattice client
     * @param taskId Task ID to complete
     * @param entityId Agent entity ID performing the completion
     * @return CompletableFuture indicating completion
     */
    private static CompletableFuture<Void> completeTask(AsyncLattice client, String taskId, String entityId) {
        // Get current task to retrieve status_version
        return client.tasks().getTask(taskId)
            .thenCompose(task -> {
                if (task.getVersion().isEmpty() || task.getVersion().get().getStatusVersion().isEmpty()) {
                    System.err.println("Task version is missing");
                    return CompletableFuture.failedFuture(new RuntimeException("Task version is missing"));
                }

                int taskStatusVersion = task.getVersion().get().getStatusVersion().get();
                // Increment version and update to terminal state
                taskStatusVersion += 1;

                // Create system principal with the agent entity ID.
                Principal principal = Principal.builder()
                    .system(com.anduril.types.System.builder()
                        .entityId(entityId)
                        .build())
                    .build();

                TaskStatus taskStatus = TaskStatus.builder()
                    .status(TaskStatusStatus.STATUS_DONE_OK)
                    .build();

                TaskStatusUpdate taskStatusUpdate = TaskStatusUpdate.builder()
                    .statusVersion(taskStatusVersion)
                    .newStatus(taskStatus)
                    .author(principal)
                    .build();

                return client.tasks().updateTaskStatus(taskId, taskStatusUpdate)
                    .thenApply(response -> (Void) null);
            })
            .exceptionally(ex -> {
                System.err.println("Encountered the following error while completing task: " + ex.getMessage());
                return null;
            });
    }
}

```

```py title={"Python (REST)"} startLine={58} maxLines={18}
from anduril import AsyncLattice, EntityIdsSelector, TaskStatus, Principal, System, TaskError
import asyncio
import os
import sys

# Sets whether the task is currently being processed, if so, it cannot be cancelled.
task_active = os.getenv('TASK_ACTIVE', 'false').lower() == 'true'

lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')

# Remove sandboxes_token from the following statements if you are not developing on Sandboxes.
sandboxes_token = os.getenv('SANDBOXES_TOKEN')
if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
    print("Missing required environment variables.")
    sys.exit(1)

client = AsyncLattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    # Remove the following header if you are not developing on Sandboxes.
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)

async def start_task(task_id, task_status_version, entity_id):
    try:
        task_status_version += 1
        response = await client.tasks.update_task_status(
            task_id=task_id,
            status_version=task_status_version,
            new_status=TaskStatus(
                status="STATUS_EXECUTING"
            ),
            author=Principal(
                system=System(
                    entity_id=entity_id
                )
            )
        )
        return response
    except Exception as error:
        print(f"Encountered the following error while starting task: {error}")

async def cancel_task(task_id, entity_id):
    try:
        # Get current task to retrieve status_version
        task = await client.tasks.get_task(task_id=task_id)
        if not task.status or not task.version or task.version.status_version is None:
            print("Task status or version is missing")
            return

        current_task_status = task.status.status
        task_status_version = task.version.status_version
        task_status_version += 1
        
        if task_active:
            await client.tasks.update_task_status(
                task_id=task_id,
                status_version=task_status_version,
                new_status=TaskStatus(
                    # Because the cancellation is being rejected, we do not
                    # change the task status.
                    status=current_task_status,
                    task_error=TaskError(
                        code="ERROR_CODE_REJECTED",
                        message="Task is already active, and cannot be cancelled."
                    )
                ),
                author=Principal(
                    system=System(
                        entity_id=entity_id
                    )
                )
            )
            print("Task could not be cancelled.")
        else:
            await client.tasks.update_task_status(
                task_id=task_id,
                status_version=task_status_version,
                new_status=TaskStatus(
                    status="STATUS_DONE_NOT_OK",
                    task_error=TaskError(
                        code="ERROR_CODE_CANCELLED",
                        message="Task cancelled by agent."
                    )
                ),
                author=Principal(
                    system=System(
                        entity_id=entity_id
                    )
                )
            )
            print("Task has been cancelled.")
    except Exception as error:
        print(f"Encountered the following error while cancelling task: {error}")

async def complete_task(task_id, entity_id):
    try:
        # Get current task to retrieve status_version
        task = await client.tasks.get_task(task_id=task_id)
        if not task.version or task.version.status_version is None:
            print("Task version is missing")
            return

        task_status_version = task.version.status_version

        # Increment version and update to terminal state
        task_status_version += 1
        response = await client.tasks.update_task_status(
            task_id=task_id,
            status_version=task_status_version,
            new_status=TaskStatus(
                status="STATUS_DONE_OK"
            ),
            author=Principal(
                system=System(
                    entity_id=entity_id
                )
            )
        )
        return response
    except Exception as error:
        print(f"Encountered the following error while completing task: {error}")

async def main(entity_id):
    try:
        print(f"Streaming tasks for entity: {entity_id}...")
        requests = client.tasks.stream_as_agent(
            agent_selector=EntityIdsSelector(
                entity_ids=[entity_id]
            )
        )

        async for request in requests:
            if request.event == "heartbeat":
                print(f"Heartbeat: {request.timestamp}")
                continue

            if request.execute_request and request.execute_request.task and request.execute_request.task.version:
                version = request.execute_request.task.version
                task_id = version.task_id
                task_status_version = version.status_version
                task_description = request.execute_request.task.description

                print(f"Starting task {task_id}, version {task_status_version}: {task_description}")
                await start_task(task_id, task_status_version, entity_id)

            elif request.complete_request:
                task_id = request.complete_request.task_id
                print(f"Completing task: {task_id}")
                await complete_task(task_id, entity_id)

            elif request.cancel_request:
                task_id = request.cancel_request.task_id
                print(f"Cancelling task: {task_id}")
                await cancel_task(task_id, entity_id)

    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    raise SystemExit(asyncio.run(main(entity_id="<AGENT_ID>")))

```

```ts title={"TypeScript (REST)"} startLine={86} maxLines={18}
import { LatticeClient } from "@anduril-industries/lattice-sdk";

// Entity ID to listen for tasks - replace with your actual entity ID.
const ENTITY_ID = "<AGENT_ID>";



const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;
const sandboxesToken = process.env.SANDBOXES_TOKEN;
const taskActiveStr = process.env.TASK_ACTIVE;

if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

// Sets whether the task is currently being processed. If so, it cannot be cancelled.
const taskActive = taskActiveStr?.toLowerCase() === "true";

const client = new LatticeClient({
    baseUrl: latticeEndpoint.startsWith("https://") ? latticeEndpoint : `https://${latticeEndpoint}`,
    clientId: clientId,
    clientSecret: clientSecret,
    headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
});


// Update task status to STATUS_EXECUTING.
async function startTask(taskId: string, taskStatusVersion: number, agentEntityId: string) {
    try {
        // Increment status version for the update
        taskStatusVersion += 1;

        // Create system principal with the agent entity ID
        const principal = {
            system: {
                entityId: agentEntityId
            }
        };

        // Create task status for update
        const taskStatus = {
            status: "STATUS_EXECUTING" as const
        };

        // Update task status
        const response = await client.tasks.updateTaskStatus({
            taskId: taskId,
            statusVersion: taskStatusVersion,
            newStatus: taskStatus,
            author: principal
        });

        return response;
    } catch (error) {
        console.error(`Encountered the following error while starting task: ${error}`);
        throw error;
    }
}

// Handle cancellation requests from Lattice.
async function cancelTask(taskId: string, entityId: string) {
    try {
        // Get current task to retrieve status_version
        const task = await client.tasks.getTask({ taskId: taskId });

        if (!task.status || !task.version?.statusVersion) {
            console.error("Task status or version is missing");
            return;
        }

        const currentTaskStatus = task.status.status;
        let taskStatusVersion = task.version.statusVersion;
        taskStatusVersion += 1;

        // Create system principal with the agent entity ID
        const principal = {
            system: {
                entityId: entityId
            }
        };

        let taskStatus;
        if (taskActive) {
            // Reject cancellation: task is active and cannot be cancelled
            taskStatus = {
                // Because the cancellation is being rejected, we do not
                // change the task status.
                status: currentTaskStatus,
                taskError: {
                    code: "ERROR_CODE_REJECTED" as const,
                    message: "Task is already active, and cannot be cancelled."
                }
            };
        } else {
            // Accept cancellation
            taskStatus = {
                status: "STATUS_DONE_NOT_OK" as const,
                taskError: {
                    code: "ERROR_CODE_CANCELLED" as const,
                    message: "Task cancelled by agent."
                }
            };
        }

        await client.tasks.updateTaskStatus({
            taskId: taskId,
            statusVersion: taskStatusVersion,
            newStatus: taskStatus,
            author: principal
        });

        if (taskActive) {
            console.log("Task could not be cancelled.");
        } else {
            console.log("Task has been cancelled.");
        }
    } catch (error) {
        console.error(`Encountered the following error while cancelling task: ${error}`);
    }
}


// Update task status to STATUS_DONE_OK.
async function completeTask(taskId: string, entityId: string) {
    try {
        // Get current task to retrieve status_version
        const task = await client.tasks.getTask({ taskId: taskId });

        if (!task.version?.statusVersion) {
            console.error("Task version is missing");
            return;
        }

        let taskStatusVersion = task.version.statusVersion;
        // Increment version and update to terminal state
        taskStatusVersion += 1;

        // Create system principal with the agent entity ID
        const principal = {
            system: {
                entityId: entityId
            }
        };

        const taskStatus = {
            status: "STATUS_DONE_OK" as const
        };

        await client.tasks.updateTaskStatus({
            taskId: taskId,
            statusVersion: taskStatusVersion,
            newStatus: taskStatus,
            author: principal
        });

        console.log("Task has been completed.");
    } catch (error) {
        console.error(`Encountered the following error while completing task: ${error}`);
    }
}

async function App() {
    try {
        console.log(`Streaming tasks for entity: ${ENTITY_ID}...`);

        // Stream tasks from Lattice as an agent
        const requests = await client.tasks.streamAsAgent({
            agentSelector: {
                entityIds: [ENTITY_ID]
            }
        });

        for await (const request of requests) {
            if (request.event === "heartbeat") {
                console.log(`Heartbeat: ${request.timestamp}`);
                continue;
            }

            if (request.executeRequest) {
                const taskId = request.executeRequest.task?.version?.taskId;
                const taskStatusVersion = request.executeRequest.task?.version?.statusVersion;
                const description = request.executeRequest.task?.description || "No description";

                if (taskId && taskStatusVersion !== undefined) {
                    console.log(`Starting task ${taskId}, version ${taskStatusVersion}: ${description}`);

                    try {
                        const result = await startTask(taskId, taskStatusVersion, ENTITY_ID);
                        console.log(`Started task with status version: ${result.version?.statusVersion}`);
                    } catch (error) {
                        console.error(`Error starting task: ${error}`);
                    }
                }
            } else if (request.completeRequest) {
                const taskId = request.completeRequest.taskId;
                if (taskId) {
                    console.log(`Completing task: ${taskId}`);
                    try {
                        await completeTask(taskId, ENTITY_ID);
                    } catch (error) {
                        console.error(`Error completing task: ${error}`);
                    }
                }
            } else if (request.cancelRequest) {
                const taskId = request.cancelRequest.taskId;
                if (taskId) {
                    console.log(`Cancelling task: ${taskId}`);
                    try {
                        await cancelTask(taskId, ENTITY_ID);
                    } catch (error) {
                        console.error(`Error cancelling task: ${error}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Error in streaming loop: ${error}`);
    }
}

App();

```

```go title={"Go (gRPC)"} startLine={207} maxLines={18}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
	"time"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/taskmanager/v1/taskmanagerv1grpc"
	taskmanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/taskmanager/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

// Sets whether the task is currently being processed; if so, it cannot be cancelled.
var taskActive bool

func main() {
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")
	taskActiveStr := os.Getenv("TASK_ACTIVE")

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Parse TASK_ACTIVE environment variable
	taskActive = strings.ToLower(taskActiveStr) == "true"

	// Setup authentication
	auth := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")),
		grpc.WithPerRPCCredentials(auth),
	}

	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	client := taskmanagerv1grpc.NewTaskManagerAPIClient(conn)

	// Set the entity ID to listen for tasks
	entityId := "<AGENT_ID>"
	fmt.Printf("Listening for tasks for entity %s...\n", entityId)

	for {
		try := func() bool {
			ctx := context.Background()

			// Create the ListenAsAgent request
			listenRequest := &taskmanagerv1.ListenAsAgentRequest{
				AgentSelector: &taskmanagerv1.ListenAsAgentRequest_EntityIds{
					EntityIds: &taskmanagerv1.EntityIds{
						EntityIds: []string{entityId},
					},
				},
			}

			// Call the ListenAsAgent method to get a stream of task requests
			stream, err := client.ListenAsAgent(ctx, listenRequest)
			if err != nil {
				fmt.Printf("Error starting task listener: %v\n", err)
				return false
			}

			for {
				response, err := stream.Recv()
				if err == io.EOF {
					fmt.Println("Stream ended")
					return false
				}
				if err != nil {
					fmt.Printf("Error receiving from stream: %v\n", err)
					return false
				}

				// Process the response based on the type of task request
				switch x := response.Request.(type) {
				case *taskmanagerv1.ListenAsAgentResponse_ExecuteRequest:
					if x.ExecuteRequest != nil && x.ExecuteRequest.Task != nil &&
						x.ExecuteRequest.Task.Version != nil && x.ExecuteRequest.Task.Version.TaskId != "" {
						// Extract task-specific information
						taskId := x.ExecuteRequest.Task.Version.TaskId
						taskStatusVersion := x.ExecuteRequest.Task.Version.StatusVersion

						fmt.Printf("Starting task %s, version %d\n", taskId, taskStatusVersion)

						// Update task status to STATUS_EXECUTING
						result, err := executeTask(ctx, client, taskId, taskStatusVersion, entityId)
						if err != nil {
							fmt.Printf("Error starting task: %v\n", err)
							return false
						}

						fmt.Printf("Started task with status version: %d\n", result.StatusVersion)
					}

				case *taskmanagerv1.ListenAsAgentResponse_CompleteRequest:
					if x.CompleteRequest != nil && x.CompleteRequest.TaskId != "" {
						fmt.Printf("Completing task: %s\n", x.CompleteRequest.TaskId)
						err := completeTask(ctx, client, x.CompleteRequest.TaskId, entityId)
						if err != nil {
							fmt.Printf("Error completing task: %v\n", err)
						}
					}

				case *taskmanagerv1.ListenAsAgentResponse_CancelRequest:
					if x.CancelRequest != nil && x.CancelRequest.TaskId != "" {
						fmt.Printf("Cancelling task: %s\n", x.CancelRequest.TaskId)
						err := cancelTask(ctx, client, x.CancelRequest.TaskId, entityId)
						if err != nil {
							fmt.Printf("Error cancelling task: %v\n", err)
						}
					}
				}
			}
		}()

		if !try {
			// If there was an error, wait a bit before retrying
			time.Sleep(1 * time.Second)
		}
	}
}

// executeTask updates the task status to STATUS_EXECUTING
func executeTask(ctx context.Context, client taskmanagerv1grpc.TaskManagerAPIClient, taskId string, taskStatusVersion uint32, agentEntityId string) (*taskmanagerv1.TaskVersion, error) {
	// Increment status version for the update
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := &taskmanagerv1.Principal{
		Agent: &taskmanagerv1.Principal_System{
			System: &taskmanagerv1.System{
				EntityId: agentEntityId,
			},
		},
	}

	// Create task status update
	taskStatus := &taskmanagerv1.TaskStatus{
		Status: taskmanagerv1.Status_STATUS_EXECUTING,
	}

	// Create status update request
	statusUpdate := &taskmanagerv1.StatusUpdate{
		Version: &taskmanagerv1.TaskVersion{
			TaskId:            taskId,
			DefinitionVersion: 0,
			StatusVersion:     taskStatusVersion,
		},
		Status: taskStatus,
		Author: principal,
	}

	// Create the update status request
	updateRequest := &taskmanagerv1.UpdateStatusRequest{
		StatusUpdate: statusUpdate,
	}

	// Call the UpdateStatus API
	response, err := client.UpdateStatus(ctx, updateRequest)
	if err != nil {
		return nil, fmt.Errorf("error updating task status: %w", err)
	}

	return response.Task.Version, nil
}

// cancelTask handles cancellation requests from Lattice
func cancelTask(ctx context.Context, client taskmanagerv1grpc.TaskManagerAPIClient, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := &taskmanagerv1.GetTaskRequest{
		TaskId: taskId,
	}
	taskResponse, err := client.GetTask(ctx, getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}
	if taskResponse.Task == nil || taskResponse.Task.Status == nil || taskResponse.Task.Version == nil {
		return fmt.Errorf("task status or version is missing")
	}
	currentTaskStatus := taskResponse.Task.Status.Status
	taskStatusVersion := taskResponse.Task.Version.StatusVersion
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := &taskmanagerv1.Principal{
		Agent: &taskmanagerv1.Principal_System{
			System: &taskmanagerv1.System{
				EntityId: entityId,
			},
		},
	}

	if taskActive {
		// Reject cancellation: task is active and cannot be cancelled
		taskStatus := &taskmanagerv1.TaskStatus{
			// Because the cancellation is being rejected, we do not
			// change the task status.
			Status: currentTaskStatus,
			TaskError: &taskmanagerv1.TaskError{
				Code:    taskmanagerv1.ErrorCode_ERROR_CODE_REJECTED,
				Message: "Task is already active, and cannot be cancelled.",
			},
		}

		statusUpdate := &taskmanagerv1.StatusUpdate{
			Version: &taskmanagerv1.TaskVersion{
				TaskId:            taskId,
				DefinitionVersion: 0,
				StatusVersion:     taskStatusVersion,
			},
			Status: taskStatus,
			Author: principal,
		}

		updateRequest := &taskmanagerv1.UpdateStatusRequest{
			StatusUpdate: statusUpdate,
		}

		_, err := client.UpdateStatus(ctx, updateRequest)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task could not be cancelled.")
	} else {
		// Accept cancellation
		taskStatus := &taskmanagerv1.TaskStatus{
			Status: taskmanagerv1.Status_STATUS_DONE_NOT_OK,
			TaskError: &taskmanagerv1.TaskError{
				Code:    taskmanagerv1.ErrorCode_ERROR_CODE_CANCELLED,
				Message: "Task cancelled by agent.",
			},
		}

		statusUpdate := &taskmanagerv1.StatusUpdate{
			Version: &taskmanagerv1.TaskVersion{
				TaskId:            taskId,
				DefinitionVersion: 0,
				StatusVersion:     taskStatusVersion,
			},
			Status: taskStatus,
			Author: principal,
		}

		updateRequest := &taskmanagerv1.UpdateStatusRequest{
			StatusUpdate: statusUpdate,
		}

		_, err := client.UpdateStatus(ctx, updateRequest)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task has been cancelled.")
	}

	return nil
}

// completeTask updates the task status to STATUS_DONE_OK
func completeTask(ctx context.Context, client taskmanagerv1grpc.TaskManagerAPIClient, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := &taskmanagerv1.GetTaskRequest{
		TaskId: taskId,
	}

	taskResponse, err := client.GetTask(ctx, getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}

	if taskResponse.Task == nil || taskResponse.Task.Version == nil {
		return fmt.Errorf("task version is missing")
	}

	taskStatusVersion := taskResponse.Task.Version.StatusVersion
	// Increment version and update to terminal state
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := &taskmanagerv1.Principal{
		Agent: &taskmanagerv1.Principal_System{
			System: &taskmanagerv1.System{
				EntityId: entityId,
			},
		},
	}

	taskStatus := &taskmanagerv1.TaskStatus{
		Status: taskmanagerv1.Status_STATUS_DONE_OK,
	}

	statusUpdate := &taskmanagerv1.StatusUpdate{
		Version: &taskmanagerv1.TaskVersion{
			TaskId:            taskId,
			DefinitionVersion: 0,
			StatusVersion:     taskStatusVersion,
		},
		Status: taskStatus,
		Author: principal,
	}

	updateRequest := &taskmanagerv1.UpdateStatusRequest{
		StatusUpdate: statusUpdate,
	}

	_, err = client.UpdateStatus(ctx, updateRequest)
	if err != nil {
		return fmt.Errorf("error updating task status: %w", err)
	}

	return nil
}

```

```py title={"Python (gRPC)"} startLine={57} maxLines={18}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import time
import grpc
from auth import ClientCredentialsAuth

from anduril.taskmanager.v1.task.pub_pb2 import (
    ErrorCode,
    Principal,
    Status,
    System,
    TaskError,
    TaskStatus,
    TaskVersion,
    StatusUpdate,
)
from anduril.taskmanager.v1.task_manager_api.pub_pb2 import (
    EntityIds,
    GetTaskRequest,
    ListenAsAgentRequest,
    UpdateStatusRequest,
)
from anduril.taskmanager.v1.task_manager_api.pub_pb2_grpc import TaskManagerAPIStub


def execute_task(client, task_id, task_status_version, agent_entity_id):
    """Update the task status to STATUS_EXECUTING."""
    task_status_version += 1

    principal = Principal(system=System(entity_id=agent_entity_id))
    task_status = TaskStatus(status=Status.STATUS_EXECUTING)

    status_update = StatusUpdate(
        version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
        status=task_status,
        author=principal,
    )

    response = client.UpdateStatus(UpdateStatusRequest(status_update=status_update))
    return response.task.version


def cancel_task(client, task_id, entity_id, task_active):
    """Handle a cancellation request from Lattice."""
    task_response = client.GetTask(GetTaskRequest(task_id=task_id))
    if not task_response.task or not task_response.task.status or not task_response.task.version:
        raise RuntimeError("task status or version is missing")

    current_task_status = task_response.task.status.status
    task_status_version = task_response.task.version.status_version + 1

    principal = Principal(system=System(entity_id=entity_id))

    if task_active:
        # Reject cancellation: task is active and cannot be cancelled
        task_status = TaskStatus(
            # Because the cancellation is being rejected, we do not
            # change the task status.
            status=current_task_status,
            task_error=TaskError(
                code=ErrorCode.ERROR_CODE_REJECTED,
                message="Task is already active, and cannot be cancelled.",
            ),
        )
        status_update = StatusUpdate(
            version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
            status=task_status,
            author=principal,
        )
        client.UpdateStatus(UpdateStatusRequest(status_update=status_update))
        print("Task could not be cancelled.")
    else:
        # Accept cancellation
        task_status = TaskStatus(
            status=Status.STATUS_DONE_NOT_OK,
            task_error=TaskError(
                code=ErrorCode.ERROR_CODE_CANCELLED,
                message="Task cancelled by agent.",
            ),
        )
        status_update = StatusUpdate(
            version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
            status=task_status,
            author=principal,
        )
        client.UpdateStatus(UpdateStatusRequest(status_update=status_update))
        print("Task has been cancelled.")


def complete_task(client, task_id, entity_id):
    """Update the task status to STATUS_DONE_OK."""
    task_response = client.GetTask(GetTaskRequest(task_id=task_id))
    if not task_response.task or not task_response.task.version:
        raise RuntimeError("task version is missing")

    task_status_version = task_response.task.version.status_version + 1

    principal = Principal(system=System(entity_id=entity_id))
    task_status = TaskStatus(status=Status.STATUS_DONE_OK)

    status_update = StatusUpdate(
        version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
        status=task_status,
        author=principal,
    )
    client.UpdateStatus(UpdateStatusRequest(status_update=status_update))


def main():
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    # Sets whether the task is currently being processed; if so, it cannot be cancelled.
    task_active = os.getenv("TASK_ACTIVE", "").lower() == "true"

    if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
        print("Missing required environment variables", file=sys.stderr)
        sys.exit(1)

    auth = ClientCredentialsAuth(
        client_id=client_id,
        client_secret=client_secret,
        sandboxes_token=sandboxes_token,
        endpoint=f"https://{lattice_endpoint}/api/v1/oauth/token",
    )

    credentials = grpc.ssl_channel_credentials()
    channel = grpc.intercept_channel(
        grpc.secure_channel(lattice_endpoint, credentials),
        auth.create_metadata_interceptor(),
    )

    client = TaskManagerAPIStub(channel)

    entity_id = "<AGENT_ID>"
    print(f"Listening for tasks for entity {entity_id}...")

    while True:
        try:
            listen_request = ListenAsAgentRequest(
                entity_ids=EntityIds(entity_ids=[entity_id])
            )
            stream = client.ListenAsAgent(listen_request)

            for response in stream:
                if response.HasField("execute_request"):
                    task = response.execute_request.task
                    if task and task.version and task.version.task_id:
                        task_id = task.version.task_id
                        task_status_version = task.version.status_version
                        print(f"Starting task {task_id}, version {task_status_version}")

                        try:
                            result = execute_task(client, task_id, task_status_version, entity_id)
                            print(f"Started task with status version: {result.status_version}")
                        except Exception as error:
                            print(f"Error starting task: {error}", file=sys.stderr)
                            break
                elif response.HasField("complete_request"):
                    if response.complete_request.task_id:
                        print(f"Completing task: {response.complete_request.task_id}")
                        try:
                            complete_task(client, response.complete_request.task_id, entity_id)
                        except Exception as error:
                            print(f"Error completing task: {error}", file=sys.stderr)
                elif response.HasField("cancel_request"):
                    if response.cancel_request.task_id:
                        print(f"Cancelling task: {response.cancel_request.task_id}")
                        try:
                            cancel_task(client, response.cancel_request.task_id, entity_id, task_active)
                        except Exception as error:
                            print(f"Error cancelling task: {error}", file=sys.stderr)
        except Exception as error:
            print(f"Error in stream: {error}", file=sys.stderr)

        # If the stream ended or errored, wait a bit before retrying
        time.sleep(1)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={231} maxLines={18}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::taskmanager::v1::{
    listen_as_agent_request, listen_as_agent_response, principal, EntityIds, ErrorCode,
    GetTaskRequest, ListenAsAgentRequest, Principal, Status, StatusUpdate, System, TaskError,
    TaskStatus, TaskVersion, UpdateStatusRequest,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::taskmanager::v1::tonic::task_manager_api_client::TaskManagerApiClient;
use auth::ClientCredentialsAuth;
use tonic::metadata::MetadataValue;
use tonic::service::interceptor::InterceptedService;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use std::env;
use std::time::Duration;

type Interceptor = Box<dyn FnMut(Request<()>) -> Result<Request<()>, tonic::Status> + Send + Sync>;
type TaskClient = TaskManagerApiClient<InterceptedService<Channel, Interceptor>>;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client_id = env::var("LATTICE_CLIENT_ID")
        .expect("LATTICE_CLIENT_ID environment variable not set");
    let client_secret = env::var("LATTICE_CLIENT_SECRET")
        .expect("LATTICE_CLIENT_SECRET environment variable not set");
    let lattice_endpoint = env::var("LATTICE_ENDPOINT")
        .expect("LATTICE_ENDPOINT environment variable not set");
    let sandboxes_token = env::var("SANDBOXES_TOKEN")
        .expect("SANDBOXES_TOKEN environment variable not set");

    // When true, the agent cannot accept cancellations for an active task.
    let task_active = env::var("TASK_ACTIVE")
        .map(|v| v.eq_ignore_ascii_case("true"))
        .unwrap_or(false);

    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token,
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    let tls_config = ClientTlsConfig::new().with_native_roots();
    let channel = Channel::from_shared(format!("https://{}", lattice_endpoint))?
        .tls_config(tls_config)?
        .connect()
        .await?;

    let access_token = auth.get_token().await?;
    let sandboxes_token = auth.sandboxes_token().to_string();
    let auth_header: MetadataValue<_> = format!("Bearer {}", access_token).parse()?;
    let sandbox_header: MetadataValue<_> = format!("Bearer {}", sandboxes_token).parse()?;

    let interceptor: Interceptor = Box::new(move |mut req: Request<()>| {
        req.metadata_mut()
            .insert("authorization", auth_header.clone());
        req.metadata_mut()
            .insert("anduril-sandbox-authorization", sandbox_header.clone());
        Ok(req)
    });
    let mut client: TaskClient = TaskManagerApiClient::with_interceptor(channel, interceptor);

    // Set the entity ID to listen for tasks
    let entity_id = "<AGENT_ID>".to_string();
    println!("Listening for tasks for entity {}...", entity_id);

    loop {
        let request = Request::new(ListenAsAgentRequest {
            agent_selector: Some(listen_as_agent_request::AgentSelector::EntityIds(EntityIds {
                entity_ids: vec![entity_id.clone()],
            })),
            ..Default::default()
        });

        let mut stream = match client.listen_as_agent(request).await {
            Ok(resp) => resp.into_inner(),
            Err(e) => {
                eprintln!("Error starting task listener: {}", e);
                tokio::time::sleep(Duration::from_secs(1)).await;
                continue;
            }
        };

        loop {
            let response = match stream.message().await {
                Ok(Some(r)) => r,
                Ok(None) => {
                    println!("Stream ended");
                    break;
                }
                Err(e) => {
                    eprintln!("Error receiving from stream: {}", e);
                    break;
                }
            };

            match response.request {
                Some(listen_as_agent_response::Request::ExecuteRequest(execute)) => {
                    if let Some(task) = execute.task {
                        if let Some(version) = task.version {
                            let task_id = version.task_id.clone();
                            let status_version = version.status_version;
                            println!("Starting task {}, version {}", task_id, status_version);

                            match execute_task(&mut client, &task_id, status_version, &entity_id)
                                .await
                            {
                                Ok(v) => println!(
                                    "Started task with status version: {}",
                                    v.status_version
                                ),
                                Err(e) => eprintln!("Error starting task: {}", e),
                            }
                        }
                    }
                }
                Some(listen_as_agent_response::Request::CompleteRequest(complete)) => {
                    if !complete.task_id.is_empty() {
                        println!("Completing task: {}", complete.task_id);
                        if let Err(e) =
                            complete_task(&mut client, &complete.task_id, &entity_id).await
                        {
                            eprintln!("Error completing task: {}", e);
                        }
                    }
                }
                Some(listen_as_agent_response::Request::CancelRequest(cancel)) => {
                    if !cancel.task_id.is_empty() {
                        println!("Cancelling task: {}", cancel.task_id);
                        if let Err(e) =
                            cancel_task(&mut client, &cancel.task_id, &entity_id, task_active)
                                .await
                        {
                            eprintln!("Error cancelling task: {}", e);
                        }
                    }
                }
                None => {}
            }
        }

        tokio::time::sleep(Duration::from_secs(1)).await;
    }
}

fn system_principal(entity_id: &str) -> Principal {
    Principal {
        agent: Some(principal::Agent::System(System {
            entity_id: entity_id.to_string(),
            ..Default::default()
        })),
        ..Default::default()
    }
}

// execute_task updates the task status to STATUS_EXECUTING.
async fn execute_task(
    client: &mut TaskClient,
    task_id: &str,
    task_status_version: u32,
    agent_entity_id: &str,
) -> Result<TaskVersion, tonic::Status> {
    let status_update = StatusUpdate {
        version: Some(TaskVersion {
            task_id: task_id.to_string(),
            status_version: task_status_version + 1,
            definition_version: 0,
            ..Default::default()
        }),
        status: Some(TaskStatus {
            status: Status::Executing as i32,
            ..Default::default()
        }),
        author: Some(system_principal(agent_entity_id)),
        ..Default::default()
    };

    let response = client
        .update_status(Request::new(UpdateStatusRequest {
            status_update: Some(status_update),
        }))
        .await?;

    response
        .into_inner()
        .task
        .and_then(|t| t.version)
        .ok_or_else(|| tonic::Status::internal("missing task version in response"))
}

// cancel_task handles cancellation requests from Lattice.
async fn cancel_task(
    client: &mut TaskClient,
    task_id: &str,
    entity_id: &str,
    task_active: bool,
) -> Result<(), tonic::Status> {
    // Get current task to retrieve status_version
    let task_response = client
        .get_task(Request::new(GetTaskRequest {
            task_id: task_id.to_string(),
            ..Default::default()
        }))
        .await?
        .into_inner()
        .task
        .ok_or_else(|| tonic::Status::internal("task is missing"))?;

    let current_status = task_response
        .status
        .as_ref()
        .map(|s| s.status)
        .unwrap_or(0);
    let version = task_response
        .version
        .ok_or_else(|| tonic::Status::internal("task version is missing"))?;
    let next_status_version = version.status_version + 1;

    let principal = system_principal(entity_id);

    let status_update = if task_active {
        // Reject cancellation: task is active and cannot be cancelled. Because
        // the cancellation is being rejected, we do not change the task status.
        StatusUpdate {
            version: Some(TaskVersion {
                task_id: task_id.to_string(),
                status_version: next_status_version,
                definition_version: 0,
                ..Default::default()
            }),
            status: Some(TaskStatus {
                status: current_status,
                task_error: Some(TaskError {
                    code: ErrorCode::Rejected as i32,
                    message: "Task is already active, and cannot be cancelled.".to_string(),
                    ..Default::default()
                }),
                ..Default::default()
            }),
            author: Some(principal),
            ..Default::default()
        }
    } else {
        // Accept cancellation
        StatusUpdate {
            version: Some(TaskVersion {
                task_id: task_id.to_string(),
                status_version: next_status_version,
                definition_version: 0,
                ..Default::default()
            }),
            status: Some(TaskStatus {
                status: Status::DoneNotOk as i32,
                task_error: Some(TaskError {
                    code: ErrorCode::Cancelled as i32,
                    message: "Task cancelled by agent.".to_string(),
                    ..Default::default()
                }),
                ..Default::default()
            }),
            author: Some(principal),
            ..Default::default()
        }
    };

    client
        .update_status(Request::new(UpdateStatusRequest {
            status_update: Some(status_update),
        }))
        .await?;

    if task_active {
        println!("Task could not be cancelled.");
    } else {
        println!("Task has been cancelled.");
    }
    Ok(())
}

// complete_task updates the task status to STATUS_DONE_OK.
async fn complete_task(
    client: &mut TaskClient,
    task_id: &str,
    entity_id: &str,
) -> Result<(), tonic::Status> {
    // Get current task to retrieve status_version
    let version = client
        .get_task(Request::new(GetTaskRequest {
            task_id: task_id.to_string(),
            ..Default::default()
        }))
        .await?
        .into_inner()
        .task
        .and_then(|t| t.version)
        .ok_or_else(|| tonic::Status::internal("task version is missing"))?;

    let status_update = StatusUpdate {
        version: Some(TaskVersion {
            task_id: task_id.to_string(),
            // Increment version and update to terminal state
            status_version: version.status_version + 1,
            definition_version: 0,
            ..Default::default()
        }),
        status: Some(TaskStatus {
            status: Status::DoneOk as i32,
            ..Default::default()
        }),
        author: Some(system_principal(entity_id)),
        ..Default::default()
    };

    client
        .update_status(Request::new(UpdateStatusRequest {
            status_update: Some(status_update),
        }))
        .await?;
    Ok(())
}

```

**Accepting cancellation:**

If the task can be cancelled, the agent accepts by setting the status to `STATUS_DONE_NOT_OK`
with a `TaskError` indicating `ERROR_CODE_CANCELLED`:

```go title={"Go (REST)"} startLine={227} maxLines={16}
package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	Lattice "github.com/anduril/lattice-sdk-go/v4"
	"github.com/anduril/lattice-sdk-go/v4/client"
	"github.com/anduril/lattice-sdk-go/v4/option"
)

// Sets whether the task is currently being processed. If so, it cannot be cancelled.
var taskActive bool

func main() {
	// Get environment variables
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	clientId := os.Getenv("LATTICE_CLIENT_ID")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")
	taskActiveStr := os.Getenv("TASK_ACTIVE")

	// Check required environment variables
	if latticeEndpoint == "" || clientId == "" || clientSecret == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Parse TASK_ACTIVE environment variable
	taskActive = strings.ToLower(taskActiveStr) == "true"

	// Initialize headers for sandbox authorization
	headers := http.Header{}
	headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))

	// Create the client
	LatticeClient := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)

	// Set the entity ID to listen for tasks
	entityId := "<AGENT_ID>"
	fmt.Printf("Streaming tasks for entity: %s...\n", entityId)

	// Create context for the request
	ctx := context.Background()

	// Create agent stream request
	agentStreamRequest := Lattice.AgentStreamRequest{
		AgentSelector: &Lattice.EntityIDsSelector{
			EntityIDs: []string{entityId},
		},
	}

	// Stream tasks
	stream, err := LatticeClient.Tasks.StreamAsAgent(ctx, &agentStreamRequest)
	if err != nil {
		fmt.Printf("Error streaming tasks: %v\n", err)
		os.Exit(1)
	}

	// Process stream events
	for {
		select {
		case <-ctx.Done():
			log.Printf("Context canceled: %v", ctx.Err())
			return
		default:
			// Continue processing
		}

		event, err := stream.Recv()

		if errors.Is(err, io.EOF) {
			log.Println("Stream completed successfully.")
			return
		}

		if err != nil {
			log.Printf("Error receiving message: %v", err)
			continue
		}

		if event.Event == "heartbeat" {
			timestamp := *event.Heartbeat.Timestamp
			log.Printf("Heartbeat: %s", timestamp)
		} else {
			request := event.GetAgentRequest()
			if executeRequest := request.GetExecuteRequest(); executeRequest != nil {
				task := executeRequest.GetTask()
				if task != nil {
					taskId := *task.GetVersion().GetTaskID()
					taskStatusVersion := *task.GetVersion().GetStatusVersion()
					description := *task.GetDescription()

					log.Printf("Starting task %s, version %d: %s", taskId, taskStatusVersion, description)

					// Update task status to STATUS_EXECUTING
					result, err := executeTask(ctx, LatticeClient, taskId, int(taskStatusVersion), entityId)
					if err != nil {
						log.Printf("Error starting task: %v", err)
						continue
					}

					log.Printf("Started task with status version: %d", *result.StatusVersion)
				}
			} else if completeRequest := request.GetCompleteRequest(); completeRequest != nil {
				taskToComplete := completeRequest.GetTaskID()
				if taskToComplete != nil {
					log.Printf("Completing task: %s", *taskToComplete)
					err := completeTask(ctx, LatticeClient, *taskToComplete, entityId)
					if err != nil {
						log.Printf("Error completing task: %v", err)
					}
				}
			} else if cancelRequest := request.GetCancelRequest(); cancelRequest != nil {
				taskToCancel := cancelRequest.GetTaskID()
				if taskToCancel != nil {
					log.Printf("Cancelling task: %s", *taskToCancel)
					err := cancelTask(ctx, LatticeClient, *taskToCancel, entityId)
					if err != nil {
						log.Printf("Error cancelling task: %v", err)
					}
				}
			}
		}

		// Sleep briefly to prevent tight looping
		time.Sleep(100 * time.Millisecond)
	}
}

// executeTask updates the task status to STATUS_EXECUTING
func executeTask(ctx context.Context, client *client.Client, taskId string, taskStatusVersion int, agentEntityId string) (*Lattice.TaskVersion, error) {
	// Increment status version for the update
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := Lattice.Principal{
		System: &Lattice.System{
			EntityID: &agentEntityId,
		},
	}

	taskStatus := Lattice.TaskStatus{
		Status: Lattice.TaskStatusStatusStatusExecuting.Ptr(),
	}

	// Create task status update request
	taskStatusUpdate := Lattice.TaskStatusUpdate{
		TaskID:        taskId,
		StatusVersion: &taskStatusVersion,
		NewStatus:     &taskStatus,
		Author:        &principal,
	}

	// Call the UpdateTaskStatus API
	task, err := client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
	if err != nil {
		return nil, fmt.Errorf("error updating task status: %w", err)
	}

	return task.Version, nil
}

// cancelTask handles cancellation requests from Lattice
func cancelTask(ctx context.Context, client *client.Client, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := Lattice.GetTaskRequest{
		TaskID: taskId,
	}
	task, err := client.Tasks.GetTask(ctx, &getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}
	if task.Status == nil || task.Version == nil || task.Version.StatusVersion == nil {
		return fmt.Errorf("task status or version is missing")
	}
	currentTaskStatus := task.Status.Status
	taskStatusVersion := *task.Version.StatusVersion
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := Lattice.Principal{
		System: &Lattice.System{
			EntityID: &entityId,
		},
	}

	if taskActive {
		// Reject cancellation: task is active and cannot be cancelled
		rejectedMessage := "Task is already active, and cannot be cancelled."
		taskStatus := Lattice.TaskStatus{
			// Because the cancellation is being rejected, we do not
			// change the task status.
			Status: currentTaskStatus,
			TaskError: &Lattice.TaskError{
				Code:    Lattice.TaskErrorCodeErrorCodeRejected.Ptr(),
				Message: &rejectedMessage,
			},
		}

		taskStatusUpdate := Lattice.TaskStatusUpdate{
			TaskID:        taskId,
			StatusVersion: &taskStatusVersion,
			NewStatus:     &taskStatus,
			Author:        &principal,
		}

		_, err := client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task could not be cancelled.")
	} else {
		// Accept cancellation
		cancelledMessage := "Task cancelled by agent."
		taskStatus := Lattice.TaskStatus{
			Status: Lattice.TaskStatusStatusStatusDoneNotOk.Ptr(),
			TaskError: &Lattice.TaskError{
				Code:    Lattice.TaskErrorCodeErrorCodeCancelled.Ptr(),
				Message: &cancelledMessage,
			},
		}

		taskStatusUpdate := Lattice.TaskStatusUpdate{
			TaskID:        taskId,
			StatusVersion: &taskStatusVersion,
			NewStatus:     &taskStatus,
			Author:        &principal,
		}

		_, err := client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task has been cancelled.")
	}

	return nil
}

// completeTask updates the task status to STATUS_DONE_OK
func completeTask(ctx context.Context, client *client.Client, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := Lattice.GetTaskRequest{
		TaskID: taskId,
	}
	task, err := client.Tasks.GetTask(ctx, &getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}

	if task.Version == nil || task.Version.StatusVersion == nil {
		return fmt.Errorf("task version is missing")
	}

	taskStatusVersion := *task.Version.StatusVersion
	// Increment version and update to terminal state
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := Lattice.Principal{
		System: &Lattice.System{
			EntityID: &entityId,
		},
	}

	taskStatus := Lattice.TaskStatus{
		Status: Lattice.TaskStatusStatusStatusDoneOk.Ptr(),
	}

	taskStatusUpdate := Lattice.TaskStatusUpdate{
		TaskID:        taskId,
		StatusVersion: &taskStatusVersion,
		NewStatus:     &taskStatus,
		Author:        &principal,
	}

	_, err = client.Tasks.UpdateTaskStatus(ctx, &taskStatusUpdate)
	if err != nil {
		return fmt.Errorf("error updating task status: %w", err)
	}

	return nil
}

```

```java title={"Java (REST)"} startLine={222} maxLines={16}
package org.example;

import java.util.Arrays;
import java.util.concurrent.CompletableFuture;

import com.anduril.AsyncLattice;
import com.anduril.resources.tasks.requests.AgentStreamRequest;
import com.anduril.resources.tasks.requests.TaskStatusUpdate;
import com.anduril.resources.tasks.types.StreamAsAgentResponse;
import com.anduril.types.AgentStreamEvent;
import com.anduril.types.EntityIdsSelector;
import com.anduril.types.Principal;
import com.anduril.types.TaskError;
import com.anduril.types.TaskErrorCode;
import com.anduril.types.TaskStatus;
import com.anduril.types.TaskStatusStatus;
import com.anduril.types.TaskVersion;
public class ProcessTask {
    // Entity ID to listen for tasks - replace with your actual entity ID.
    private static final String ENTITY_ID = "<AGENT_ID>";

    // Sets whether the task is currently being processed. If so, it cannot be cancelled.
    private static boolean taskActive;

    public static void main(String[] args) {
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");
        String taskActiveStr = System.getenv("TASK_ACTIVE");

        if (endpoint == null || clientId == null || clientSecret == null || sandboxesToken == null) {
            System.err.println("Missing required environment variables.");
            System.exit(1);
        }
        if (!endpoint.startsWith("https://")) endpoint = "https://" + endpoint;

        taskActive = "true".equalsIgnoreCase(taskActiveStr);

        try {
            AsyncLattice client = AsyncLattice.builder()
                .url(endpoint)
                .credentials(clientId, clientSecret)
                .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
                .build();

            System.out.println("Streaming tasks for entity: " + ENTITY_ID + "...");

            // Create agent selector with the specified entity ID.
            EntityIdsSelector agentSelector = EntityIdsSelector.builder()
                .entityIds(Arrays.asList(ENTITY_ID))
                .build();

            // Create agent stream request.
            AgentStreamRequest agentRequest = AgentStreamRequest.builder()
                .agentSelector(agentSelector)
                .build();

            // Stream tasks from Lattice as an agent
            client.tasks().streamAsAgent(agentRequest)
                .thenAccept(requests -> {
                    for (StreamAsAgentResponse request : requests) {
                        if (request.isHeartbeat()) {
                            System.out.println("Heartbeat: " + request.getHeartbeat().get().getTimestamp().get());
                        } else {
                            AgentStreamEvent event = request.getAgentRequest().get();
                            if (event.getExecuteRequest().isPresent()) {
                                String taskId = event.getExecuteRequest().get()
                                    .getTask().get()
                                    .getVersion().get()
                                    .getTaskId().get();

                                int taskStatusVersion = event.getExecuteRequest().get()
                                    .getTask().get()
                                    .getVersion().get()
                                    .getStatusVersion().get();

                                String description = event.getExecuteRequest().get()
                                    .getTask().get()
                                    .getDescription().orElse("No description");

                                System.out.println("Starting task " + taskId + ", version " + taskStatusVersion + ": " + description);

                                try {
                                    TaskVersion result = startTask(client, taskId, taskStatusVersion, ENTITY_ID).get();
                                    System.out.println("Started task with status version: " + result.getStatusVersion().get());
                                } catch (Exception e) {
                                    System.err.println("Error starting task: " + e.getMessage());
                                }
                            } else if (event.getCompleteRequest().isPresent()) {
                                String taskId = event.getCompleteRequest().get().getTaskId().get();
                                System.out.println("Completing task: " + taskId);
                                try {
                                    completeTask(client, taskId, ENTITY_ID).get();
                                } catch (Exception e) {
                                    System.err.println("Error completing task: " + e.getMessage());
                                }
                            } else if (event.getCancelRequest().isPresent()) {
                                String taskId = event.getCancelRequest().get().getTaskId().get();
                                System.out.println("Cancelling task: " + taskId);
                                try {
                                    cancelTask(client, taskId, ENTITY_ID).get();
                                } catch (Exception e) {
                                    System.err.println("Error cancelling task: " + e.getMessage());
                                }
                            }
                        }
                    }
                })
                .exceptionally(ex -> {
                    System.err.println("Exception while streaming tasks: " + ex.getMessage());
                    return null;
                })
                .join();
        } catch (Exception e) {
            System.err.println("Error in streaming loop: " + e.getMessage());
        }
    }

    /**
     * Update task status to STATUS_EXECUTING.
     *
     * @param client Lattice client
     * @param taskId Task ID to update
     * @param taskStatusVersion Current task status version
     * @param agentEntityId Agent entity ID performing the update
     * @return CompletableFuture containing the updated TaskVersion
     */
    private static CompletableFuture<TaskVersion> startTask(AsyncLattice client, String taskId, Integer taskStatusVersion, String agentEntityId) {
        try {
            // Increment status version for the update
            taskStatusVersion += 1;

            // Create system principal with the agent entity ID.
            Principal principal = Principal.builder()
                .system(com.anduril.types.System.builder()
                    .entityId(agentEntityId)
                    .build())
                .build();

            // Create task status for update.
            TaskStatus taskStatus = TaskStatus.builder()
                .status(TaskStatusStatus.STATUS_EXECUTING)
                .build();

            // Create task status update request.
            TaskStatusUpdate taskStatusUpdate = TaskStatusUpdate.builder()
                .statusVersion(taskStatusVersion)
                .newStatus(taskStatus)
                .author(principal)
                .build();

            return client.tasks().updateTaskStatus(taskId, taskStatusUpdate)
                .thenApply(response -> response.getVersion().get());
        } catch (Exception e) {
            System.err.println("Encountered the following error while starting task: " + e.getMessage());
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Handle cancellation requests from Lattice.
     *
     * @param client Lattice client
     * @param taskId Task ID to cancel
     * @param entityId Agent entity ID performing the cancellation
     * @return CompletableFuture indicating completion
     */
    private static CompletableFuture<Void> cancelTask(AsyncLattice client, String taskId, String entityId) {
        // Get current task to retrieve status_version
        return client.tasks().getTask(taskId)
            .thenCompose(task -> {
                if (task.getStatus().isEmpty() || task.getVersion().isEmpty() || task.getVersion().get().getStatusVersion().isEmpty()) {
                    System.err.println("Task status or version is missing");
                    return CompletableFuture.failedFuture(new RuntimeException("Task status or version is missing"));
                }

                TaskStatusStatus currentTaskStatus = task.getStatus().get().getStatus().get();
                int taskStatusVersion = task.getVersion().get().getStatusVersion().get();
                taskStatusVersion += 1;

                // Create system principal with the agent entity ID.
                Principal principal = Principal.builder()
                    .system(com.anduril.types.System.builder()
                        .entityId(entityId)
                        .build())
                    .build();

                TaskStatus taskStatus;
                if (taskActive) {
                    // Reject cancellation: task is active and cannot be cancelled
                    taskStatus = TaskStatus.builder()
                        // Because the cancellation is being rejected, we do not
                        // change the task status.
                        .status(currentTaskStatus)
                        .taskError(TaskError.builder()
                            .code(TaskErrorCode.ERROR_CODE_REJECTED)
                            .message("Task is already active, and cannot be cancelled.")
                            .build())
                        .build();
                } else {
                    // Accept cancellation
                    taskStatus = TaskStatus.builder()
                        .status(TaskStatusStatus.STATUS_DONE_NOT_OK)
                        .taskError(TaskError.builder()
                            .code(TaskErrorCode.ERROR_CODE_CANCELLED)
                            .message("Task cancelled by agent.")
                            .build())
                        .build();
                }

                TaskStatusUpdate taskStatusUpdate = TaskStatusUpdate.builder()
                    .statusVersion(taskStatusVersion)
                    .newStatus(taskStatus)
                    .author(principal)
                    .build();

                return client.tasks().updateTaskStatus(taskId, taskStatusUpdate)
                    .thenAccept(response -> {
                        if (taskActive) {
                            System.out.println("Task could not be cancelled.");
                        } else {
                            System.out.println("Task has been cancelled.");
                        }
                    });
            })
            .exceptionally(ex -> {
                System.err.println("Encountered the following error while cancelling task: " + ex.getMessage());
                return null;
            });
    }

    /**
     * Update task status to STATUS_DONE_OK.
     *
     * @param client Lattice client
     * @param taskId Task ID to complete
     * @param entityId Agent entity ID performing the completion
     * @return CompletableFuture indicating completion
     */
    private static CompletableFuture<Void> completeTask(AsyncLattice client, String taskId, String entityId) {
        // Get current task to retrieve status_version
        return client.tasks().getTask(taskId)
            .thenCompose(task -> {
                if (task.getVersion().isEmpty() || task.getVersion().get().getStatusVersion().isEmpty()) {
                    System.err.println("Task version is missing");
                    return CompletableFuture.failedFuture(new RuntimeException("Task version is missing"));
                }

                int taskStatusVersion = task.getVersion().get().getStatusVersion().get();
                // Increment version and update to terminal state
                taskStatusVersion += 1;

                // Create system principal with the agent entity ID.
                Principal principal = Principal.builder()
                    .system(com.anduril.types.System.builder()
                        .entityId(entityId)
                        .build())
                    .build();

                TaskStatus taskStatus = TaskStatus.builder()
                    .status(TaskStatusStatus.STATUS_DONE_OK)
                    .build();

                TaskStatusUpdate taskStatusUpdate = TaskStatusUpdate.builder()
                    .statusVersion(taskStatusVersion)
                    .newStatus(taskStatus)
                    .author(principal)
                    .build();

                return client.tasks().updateTaskStatus(taskId, taskStatusUpdate)
                    .thenApply(response -> (Void) null);
            })
            .exceptionally(ex -> {
                System.err.println("Encountered the following error while completing task: " + ex.getMessage());
                return null;
            });
    }
}

```

```py title={"Python (REST)"} startLine={79} maxLines={16}
from anduril import AsyncLattice, EntityIdsSelector, TaskStatus, Principal, System, TaskError
import asyncio
import os
import sys

# Sets whether the task is currently being processed, if so, it cannot be cancelled.
task_active = os.getenv('TASK_ACTIVE', 'false').lower() == 'true'

lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')

# Remove sandboxes_token from the following statements if you are not developing on Sandboxes.
sandboxes_token = os.getenv('SANDBOXES_TOKEN')
if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
    print("Missing required environment variables.")
    sys.exit(1)

client = AsyncLattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    # Remove the following header if you are not developing on Sandboxes.
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)

async def start_task(task_id, task_status_version, entity_id):
    try:
        task_status_version += 1
        response = await client.tasks.update_task_status(
            task_id=task_id,
            status_version=task_status_version,
            new_status=TaskStatus(
                status="STATUS_EXECUTING"
            ),
            author=Principal(
                system=System(
                    entity_id=entity_id
                )
            )
        )
        return response
    except Exception as error:
        print(f"Encountered the following error while starting task: {error}")

async def cancel_task(task_id, entity_id):
    try:
        # Get current task to retrieve status_version
        task = await client.tasks.get_task(task_id=task_id)
        if not task.status or not task.version or task.version.status_version is None:
            print("Task status or version is missing")
            return

        current_task_status = task.status.status
        task_status_version = task.version.status_version
        task_status_version += 1
        
        if task_active:
            await client.tasks.update_task_status(
                task_id=task_id,
                status_version=task_status_version,
                new_status=TaskStatus(
                    # Because the cancellation is being rejected, we do not
                    # change the task status.
                    status=current_task_status,
                    task_error=TaskError(
                        code="ERROR_CODE_REJECTED",
                        message="Task is already active, and cannot be cancelled."
                    )
                ),
                author=Principal(
                    system=System(
                        entity_id=entity_id
                    )
                )
            )
            print("Task could not be cancelled.")
        else:
            await client.tasks.update_task_status(
                task_id=task_id,
                status_version=task_status_version,
                new_status=TaskStatus(
                    status="STATUS_DONE_NOT_OK",
                    task_error=TaskError(
                        code="ERROR_CODE_CANCELLED",
                        message="Task cancelled by agent."
                    )
                ),
                author=Principal(
                    system=System(
                        entity_id=entity_id
                    )
                )
            )
            print("Task has been cancelled.")
    except Exception as error:
        print(f"Encountered the following error while cancelling task: {error}")

async def complete_task(task_id, entity_id):
    try:
        # Get current task to retrieve status_version
        task = await client.tasks.get_task(task_id=task_id)
        if not task.version or task.version.status_version is None:
            print("Task version is missing")
            return

        task_status_version = task.version.status_version

        # Increment version and update to terminal state
        task_status_version += 1
        response = await client.tasks.update_task_status(
            task_id=task_id,
            status_version=task_status_version,
            new_status=TaskStatus(
                status="STATUS_DONE_OK"
            ),
            author=Principal(
                system=System(
                    entity_id=entity_id
                )
            )
        )
        return response
    except Exception as error:
        print(f"Encountered the following error while completing task: {error}")

async def main(entity_id):
    try:
        print(f"Streaming tasks for entity: {entity_id}...")
        requests = client.tasks.stream_as_agent(
            agent_selector=EntityIdsSelector(
                entity_ids=[entity_id]
            )
        )

        async for request in requests:
            if request.event == "heartbeat":
                print(f"Heartbeat: {request.timestamp}")
                continue

            if request.execute_request and request.execute_request.task and request.execute_request.task.version:
                version = request.execute_request.task.version
                task_id = version.task_id
                task_status_version = version.status_version
                task_description = request.execute_request.task.description

                print(f"Starting task {task_id}, version {task_status_version}: {task_description}")
                await start_task(task_id, task_status_version, entity_id)

            elif request.complete_request:
                task_id = request.complete_request.task_id
                print(f"Completing task: {task_id}")
                await complete_task(task_id, entity_id)

            elif request.cancel_request:
                task_id = request.cancel_request.task_id
                print(f"Cancelling task: {task_id}")
                await cancel_task(task_id, entity_id)

    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    raise SystemExit(asyncio.run(main(entity_id="<AGENT_ID>")))

```

```ts title={"TypeScript (REST)"} startLine={98} maxLines={16}
import { LatticeClient } from "@anduril-industries/lattice-sdk";

// Entity ID to listen for tasks - replace with your actual entity ID.
const ENTITY_ID = "<AGENT_ID>";



const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;
const sandboxesToken = process.env.SANDBOXES_TOKEN;
const taskActiveStr = process.env.TASK_ACTIVE;

if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

// Sets whether the task is currently being processed. If so, it cannot be cancelled.
const taskActive = taskActiveStr?.toLowerCase() === "true";

const client = new LatticeClient({
    baseUrl: latticeEndpoint.startsWith("https://") ? latticeEndpoint : `https://${latticeEndpoint}`,
    clientId: clientId,
    clientSecret: clientSecret,
    headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
});


// Update task status to STATUS_EXECUTING.
async function startTask(taskId: string, taskStatusVersion: number, agentEntityId: string) {
    try {
        // Increment status version for the update
        taskStatusVersion += 1;

        // Create system principal with the agent entity ID
        const principal = {
            system: {
                entityId: agentEntityId
            }
        };

        // Create task status for update
        const taskStatus = {
            status: "STATUS_EXECUTING" as const
        };

        // Update task status
        const response = await client.tasks.updateTaskStatus({
            taskId: taskId,
            statusVersion: taskStatusVersion,
            newStatus: taskStatus,
            author: principal
        });

        return response;
    } catch (error) {
        console.error(`Encountered the following error while starting task: ${error}`);
        throw error;
    }
}

// Handle cancellation requests from Lattice.
async function cancelTask(taskId: string, entityId: string) {
    try {
        // Get current task to retrieve status_version
        const task = await client.tasks.getTask({ taskId: taskId });

        if (!task.status || !task.version?.statusVersion) {
            console.error("Task status or version is missing");
            return;
        }

        const currentTaskStatus = task.status.status;
        let taskStatusVersion = task.version.statusVersion;
        taskStatusVersion += 1;

        // Create system principal with the agent entity ID
        const principal = {
            system: {
                entityId: entityId
            }
        };

        let taskStatus;
        if (taskActive) {
            // Reject cancellation: task is active and cannot be cancelled
            taskStatus = {
                // Because the cancellation is being rejected, we do not
                // change the task status.
                status: currentTaskStatus,
                taskError: {
                    code: "ERROR_CODE_REJECTED" as const,
                    message: "Task is already active, and cannot be cancelled."
                }
            };
        } else {
            // Accept cancellation
            taskStatus = {
                status: "STATUS_DONE_NOT_OK" as const,
                taskError: {
                    code: "ERROR_CODE_CANCELLED" as const,
                    message: "Task cancelled by agent."
                }
            };
        }

        await client.tasks.updateTaskStatus({
            taskId: taskId,
            statusVersion: taskStatusVersion,
            newStatus: taskStatus,
            author: principal
        });

        if (taskActive) {
            console.log("Task could not be cancelled.");
        } else {
            console.log("Task has been cancelled.");
        }
    } catch (error) {
        console.error(`Encountered the following error while cancelling task: ${error}`);
    }
}


// Update task status to STATUS_DONE_OK.
async function completeTask(taskId: string, entityId: string) {
    try {
        // Get current task to retrieve status_version
        const task = await client.tasks.getTask({ taskId: taskId });

        if (!task.version?.statusVersion) {
            console.error("Task version is missing");
            return;
        }

        let taskStatusVersion = task.version.statusVersion;
        // Increment version and update to terminal state
        taskStatusVersion += 1;

        // Create system principal with the agent entity ID
        const principal = {
            system: {
                entityId: entityId
            }
        };

        const taskStatus = {
            status: "STATUS_DONE_OK" as const
        };

        await client.tasks.updateTaskStatus({
            taskId: taskId,
            statusVersion: taskStatusVersion,
            newStatus: taskStatus,
            author: principal
        });

        console.log("Task has been completed.");
    } catch (error) {
        console.error(`Encountered the following error while completing task: ${error}`);
    }
}

async function App() {
    try {
        console.log(`Streaming tasks for entity: ${ENTITY_ID}...`);

        // Stream tasks from Lattice as an agent
        const requests = await client.tasks.streamAsAgent({
            agentSelector: {
                entityIds: [ENTITY_ID]
            }
        });

        for await (const request of requests) {
            if (request.event === "heartbeat") {
                console.log(`Heartbeat: ${request.timestamp}`);
                continue;
            }

            if (request.executeRequest) {
                const taskId = request.executeRequest.task?.version?.taskId;
                const taskStatusVersion = request.executeRequest.task?.version?.statusVersion;
                const description = request.executeRequest.task?.description || "No description";

                if (taskId && taskStatusVersion !== undefined) {
                    console.log(`Starting task ${taskId}, version ${taskStatusVersion}: ${description}`);

                    try {
                        const result = await startTask(taskId, taskStatusVersion, ENTITY_ID);
                        console.log(`Started task with status version: ${result.version?.statusVersion}`);
                    } catch (error) {
                        console.error(`Error starting task: ${error}`);
                    }
                }
            } else if (request.completeRequest) {
                const taskId = request.completeRequest.taskId;
                if (taskId) {
                    console.log(`Completing task: ${taskId}`);
                    try {
                        await completeTask(taskId, ENTITY_ID);
                    } catch (error) {
                        console.error(`Error completing task: ${error}`);
                    }
                }
            } else if (request.cancelRequest) {
                const taskId = request.cancelRequest.taskId;
                if (taskId) {
                    console.log(`Cancelling task: ${taskId}`);
                    try {
                        await cancelTask(taskId, ENTITY_ID);
                    } catch (error) {
                        console.error(`Error cancelling task: ${error}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Error in streaming loop: ${error}`);
    }
}

App();

```

```go title={"Go (gRPC)"} startLine={239} maxLines={16}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
	"time"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/taskmanager/v1/taskmanagerv1grpc"
	taskmanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/taskmanager/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

// Sets whether the task is currently being processed; if so, it cannot be cancelled.
var taskActive bool

func main() {
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")
	taskActiveStr := os.Getenv("TASK_ACTIVE")

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
	}

	// Parse TASK_ACTIVE environment variable
	taskActive = strings.ToLower(taskActiveStr) == "true"

	// Setup authentication
	auth := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")),
		grpc.WithPerRPCCredentials(auth),
	}

	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	client := taskmanagerv1grpc.NewTaskManagerAPIClient(conn)

	// Set the entity ID to listen for tasks
	entityId := "<AGENT_ID>"
	fmt.Printf("Listening for tasks for entity %s...\n", entityId)

	for {
		try := func() bool {
			ctx := context.Background()

			// Create the ListenAsAgent request
			listenRequest := &taskmanagerv1.ListenAsAgentRequest{
				AgentSelector: &taskmanagerv1.ListenAsAgentRequest_EntityIds{
					EntityIds: &taskmanagerv1.EntityIds{
						EntityIds: []string{entityId},
					},
				},
			}

			// Call the ListenAsAgent method to get a stream of task requests
			stream, err := client.ListenAsAgent(ctx, listenRequest)
			if err != nil {
				fmt.Printf("Error starting task listener: %v\n", err)
				return false
			}

			for {
				response, err := stream.Recv()
				if err == io.EOF {
					fmt.Println("Stream ended")
					return false
				}
				if err != nil {
					fmt.Printf("Error receiving from stream: %v\n", err)
					return false
				}

				// Process the response based on the type of task request
				switch x := response.Request.(type) {
				case *taskmanagerv1.ListenAsAgentResponse_ExecuteRequest:
					if x.ExecuteRequest != nil && x.ExecuteRequest.Task != nil &&
						x.ExecuteRequest.Task.Version != nil && x.ExecuteRequest.Task.Version.TaskId != "" {
						// Extract task-specific information
						taskId := x.ExecuteRequest.Task.Version.TaskId
						taskStatusVersion := x.ExecuteRequest.Task.Version.StatusVersion

						fmt.Printf("Starting task %s, version %d\n", taskId, taskStatusVersion)

						// Update task status to STATUS_EXECUTING
						result, err := executeTask(ctx, client, taskId, taskStatusVersion, entityId)
						if err != nil {
							fmt.Printf("Error starting task: %v\n", err)
							return false
						}

						fmt.Printf("Started task with status version: %d\n", result.StatusVersion)
					}

				case *taskmanagerv1.ListenAsAgentResponse_CompleteRequest:
					if x.CompleteRequest != nil && x.CompleteRequest.TaskId != "" {
						fmt.Printf("Completing task: %s\n", x.CompleteRequest.TaskId)
						err := completeTask(ctx, client, x.CompleteRequest.TaskId, entityId)
						if err != nil {
							fmt.Printf("Error completing task: %v\n", err)
						}
					}

				case *taskmanagerv1.ListenAsAgentResponse_CancelRequest:
					if x.CancelRequest != nil && x.CancelRequest.TaskId != "" {
						fmt.Printf("Cancelling task: %s\n", x.CancelRequest.TaskId)
						err := cancelTask(ctx, client, x.CancelRequest.TaskId, entityId)
						if err != nil {
							fmt.Printf("Error cancelling task: %v\n", err)
						}
					}
				}
			}
		}()

		if !try {
			// If there was an error, wait a bit before retrying
			time.Sleep(1 * time.Second)
		}
	}
}

// executeTask updates the task status to STATUS_EXECUTING
func executeTask(ctx context.Context, client taskmanagerv1grpc.TaskManagerAPIClient, taskId string, taskStatusVersion uint32, agentEntityId string) (*taskmanagerv1.TaskVersion, error) {
	// Increment status version for the update
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := &taskmanagerv1.Principal{
		Agent: &taskmanagerv1.Principal_System{
			System: &taskmanagerv1.System{
				EntityId: agentEntityId,
			},
		},
	}

	// Create task status update
	taskStatus := &taskmanagerv1.TaskStatus{
		Status: taskmanagerv1.Status_STATUS_EXECUTING,
	}

	// Create status update request
	statusUpdate := &taskmanagerv1.StatusUpdate{
		Version: &taskmanagerv1.TaskVersion{
			TaskId:            taskId,
			DefinitionVersion: 0,
			StatusVersion:     taskStatusVersion,
		},
		Status: taskStatus,
		Author: principal,
	}

	// Create the update status request
	updateRequest := &taskmanagerv1.UpdateStatusRequest{
		StatusUpdate: statusUpdate,
	}

	// Call the UpdateStatus API
	response, err := client.UpdateStatus(ctx, updateRequest)
	if err != nil {
		return nil, fmt.Errorf("error updating task status: %w", err)
	}

	return response.Task.Version, nil
}

// cancelTask handles cancellation requests from Lattice
func cancelTask(ctx context.Context, client taskmanagerv1grpc.TaskManagerAPIClient, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := &taskmanagerv1.GetTaskRequest{
		TaskId: taskId,
	}
	taskResponse, err := client.GetTask(ctx, getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}
	if taskResponse.Task == nil || taskResponse.Task.Status == nil || taskResponse.Task.Version == nil {
		return fmt.Errorf("task status or version is missing")
	}
	currentTaskStatus := taskResponse.Task.Status.Status
	taskStatusVersion := taskResponse.Task.Version.StatusVersion
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := &taskmanagerv1.Principal{
		Agent: &taskmanagerv1.Principal_System{
			System: &taskmanagerv1.System{
				EntityId: entityId,
			},
		},
	}

	if taskActive {
		// Reject cancellation: task is active and cannot be cancelled
		taskStatus := &taskmanagerv1.TaskStatus{
			// Because the cancellation is being rejected, we do not
			// change the task status.
			Status: currentTaskStatus,
			TaskError: &taskmanagerv1.TaskError{
				Code:    taskmanagerv1.ErrorCode_ERROR_CODE_REJECTED,
				Message: "Task is already active, and cannot be cancelled.",
			},
		}

		statusUpdate := &taskmanagerv1.StatusUpdate{
			Version: &taskmanagerv1.TaskVersion{
				TaskId:            taskId,
				DefinitionVersion: 0,
				StatusVersion:     taskStatusVersion,
			},
			Status: taskStatus,
			Author: principal,
		}

		updateRequest := &taskmanagerv1.UpdateStatusRequest{
			StatusUpdate: statusUpdate,
		}

		_, err := client.UpdateStatus(ctx, updateRequest)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task could not be cancelled.")
	} else {
		// Accept cancellation
		taskStatus := &taskmanagerv1.TaskStatus{
			Status: taskmanagerv1.Status_STATUS_DONE_NOT_OK,
			TaskError: &taskmanagerv1.TaskError{
				Code:    taskmanagerv1.ErrorCode_ERROR_CODE_CANCELLED,
				Message: "Task cancelled by agent.",
			},
		}

		statusUpdate := &taskmanagerv1.StatusUpdate{
			Version: &taskmanagerv1.TaskVersion{
				TaskId:            taskId,
				DefinitionVersion: 0,
				StatusVersion:     taskStatusVersion,
			},
			Status: taskStatus,
			Author: principal,
		}

		updateRequest := &taskmanagerv1.UpdateStatusRequest{
			StatusUpdate: statusUpdate,
		}

		_, err := client.UpdateStatus(ctx, updateRequest)
		if err != nil {
			return fmt.Errorf("error updating task status: %w", err)
		}

		log.Println("Task has been cancelled.")
	}

	return nil
}

// completeTask updates the task status to STATUS_DONE_OK
func completeTask(ctx context.Context, client taskmanagerv1grpc.TaskManagerAPIClient, taskId string, entityId string) error {
	// Get current task to retrieve status_version
	getTaskRequest := &taskmanagerv1.GetTaskRequest{
		TaskId: taskId,
	}

	taskResponse, err := client.GetTask(ctx, getTaskRequest)
	if err != nil {
		return fmt.Errorf("error getting task: %w", err)
	}

	if taskResponse.Task == nil || taskResponse.Task.Version == nil {
		return fmt.Errorf("task version is missing")
	}

	taskStatusVersion := taskResponse.Task.Version.StatusVersion
	// Increment version and update to terminal state
	taskStatusVersion++

	// Create system principal with the agent entity ID
	principal := &taskmanagerv1.Principal{
		Agent: &taskmanagerv1.Principal_System{
			System: &taskmanagerv1.System{
				EntityId: entityId,
			},
		},
	}

	taskStatus := &taskmanagerv1.TaskStatus{
		Status: taskmanagerv1.Status_STATUS_DONE_OK,
	}

	statusUpdate := &taskmanagerv1.StatusUpdate{
		Version: &taskmanagerv1.TaskVersion{
			TaskId:            taskId,
			DefinitionVersion: 0,
			StatusVersion:     taskStatusVersion,
		},
		Status: taskStatus,
		Author: principal,
	}

	updateRequest := &taskmanagerv1.UpdateStatusRequest{
		StatusUpdate: statusUpdate,
	}

	_, err = client.UpdateStatus(ctx, updateRequest)
	if err != nil {
		return fmt.Errorf("error updating task status: %w", err)
	}

	return nil
}

```

```py title={"Python (gRPC)"} startLine={76} maxLines={16}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import time
import grpc
from auth import ClientCredentialsAuth

from anduril.taskmanager.v1.task.pub_pb2 import (
    ErrorCode,
    Principal,
    Status,
    System,
    TaskError,
    TaskStatus,
    TaskVersion,
    StatusUpdate,
)
from anduril.taskmanager.v1.task_manager_api.pub_pb2 import (
    EntityIds,
    GetTaskRequest,
    ListenAsAgentRequest,
    UpdateStatusRequest,
)
from anduril.taskmanager.v1.task_manager_api.pub_pb2_grpc import TaskManagerAPIStub


def execute_task(client, task_id, task_status_version, agent_entity_id):
    """Update the task status to STATUS_EXECUTING."""
    task_status_version += 1

    principal = Principal(system=System(entity_id=agent_entity_id))
    task_status = TaskStatus(status=Status.STATUS_EXECUTING)

    status_update = StatusUpdate(
        version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
        status=task_status,
        author=principal,
    )

    response = client.UpdateStatus(UpdateStatusRequest(status_update=status_update))
    return response.task.version


def cancel_task(client, task_id, entity_id, task_active):
    """Handle a cancellation request from Lattice."""
    task_response = client.GetTask(GetTaskRequest(task_id=task_id))
    if not task_response.task or not task_response.task.status or not task_response.task.version:
        raise RuntimeError("task status or version is missing")

    current_task_status = task_response.task.status.status
    task_status_version = task_response.task.version.status_version + 1

    principal = Principal(system=System(entity_id=entity_id))

    if task_active:
        # Reject cancellation: task is active and cannot be cancelled
        task_status = TaskStatus(
            # Because the cancellation is being rejected, we do not
            # change the task status.
            status=current_task_status,
            task_error=TaskError(
                code=ErrorCode.ERROR_CODE_REJECTED,
                message="Task is already active, and cannot be cancelled.",
            ),
        )
        status_update = StatusUpdate(
            version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
            status=task_status,
            author=principal,
        )
        client.UpdateStatus(UpdateStatusRequest(status_update=status_update))
        print("Task could not be cancelled.")
    else:
        # Accept cancellation
        task_status = TaskStatus(
            status=Status.STATUS_DONE_NOT_OK,
            task_error=TaskError(
                code=ErrorCode.ERROR_CODE_CANCELLED,
                message="Task cancelled by agent.",
            ),
        )
        status_update = StatusUpdate(
            version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
            status=task_status,
            author=principal,
        )
        client.UpdateStatus(UpdateStatusRequest(status_update=status_update))
        print("Task has been cancelled.")


def complete_task(client, task_id, entity_id):
    """Update the task status to STATUS_DONE_OK."""
    task_response = client.GetTask(GetTaskRequest(task_id=task_id))
    if not task_response.task or not task_response.task.version:
        raise RuntimeError("task version is missing")

    task_status_version = task_response.task.version.status_version + 1

    principal = Principal(system=System(entity_id=entity_id))
    task_status = TaskStatus(status=Status.STATUS_DONE_OK)

    status_update = StatusUpdate(
        version=TaskVersion(task_id=task_id, definition_version=0, status_version=task_status_version),
        status=task_status,
        author=principal,
    )
    client.UpdateStatus(UpdateStatusRequest(status_update=status_update))


def main():
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    # Sets whether the task is currently being processed; if so, it cannot be cancelled.
    task_active = os.getenv("TASK_ACTIVE", "").lower() == "true"

    if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
        print("Missing required environment variables", file=sys.stderr)
        sys.exit(1)

    auth = ClientCredentialsAuth(
        client_id=client_id,
        client_secret=client_secret,
        sandboxes_token=sandboxes_token,
        endpoint=f"https://{lattice_endpoint}/api/v1/oauth/token",
    )

    credentials = grpc.ssl_channel_credentials()
    channel = grpc.intercept_channel(
        grpc.secure_channel(lattice_endpoint, credentials),
        auth.create_metadata_interceptor(),
    )

    client = TaskManagerAPIStub(channel)

    entity_id = "<AGENT_ID>"
    print(f"Listening for tasks for entity {entity_id}...")

    while True:
        try:
            listen_request = ListenAsAgentRequest(
                entity_ids=EntityIds(entity_ids=[entity_id])
            )
            stream = client.ListenAsAgent(listen_request)

            for response in stream:
                if response.HasField("execute_request"):
                    task = response.execute_request.task
                    if task and task.version and task.version.task_id:
                        task_id = task.version.task_id
                        task_status_version = task.version.status_version
                        print(f"Starting task {task_id}, version {task_status_version}")

                        try:
                            result = execute_task(client, task_id, task_status_version, entity_id)
                            print(f"Started task with status version: {result.status_version}")
                        except Exception as error:
                            print(f"Error starting task: {error}", file=sys.stderr)
                            break
                elif response.HasField("complete_request"):
                    if response.complete_request.task_id:
                        print(f"Completing task: {response.complete_request.task_id}")
                        try:
                            complete_task(client, response.complete_request.task_id, entity_id)
                        except Exception as error:
                            print(f"Error completing task: {error}", file=sys.stderr)
                elif response.HasField("cancel_request"):
                    if response.cancel_request.task_id:
                        print(f"Cancelling task: {response.cancel_request.task_id}")
                        try:
                            cancel_task(client, response.cancel_request.task_id, entity_id, task_active)
                        except Exception as error:
                            print(f"Error cancelling task: {error}", file=sys.stderr)
        except Exception as error:
            print(f"Error in stream: {error}", file=sys.stderr)

        # If the stream ended or errored, wait a bit before retrying
        time.sleep(1)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={252} maxLines={16}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::taskmanager::v1::{
    listen_as_agent_request, listen_as_agent_response, principal, EntityIds, ErrorCode,
    GetTaskRequest, ListenAsAgentRequest, Principal, Status, StatusUpdate, System, TaskError,
    TaskStatus, TaskVersion, UpdateStatusRequest,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::taskmanager::v1::tonic::task_manager_api_client::TaskManagerApiClient;
use auth::ClientCredentialsAuth;
use tonic::metadata::MetadataValue;
use tonic::service::interceptor::InterceptedService;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use std::env;
use std::time::Duration;

type Interceptor = Box<dyn FnMut(Request<()>) -> Result<Request<()>, tonic::Status> + Send + Sync>;
type TaskClient = TaskManagerApiClient<InterceptedService<Channel, Interceptor>>;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client_id = env::var("LATTICE_CLIENT_ID")
        .expect("LATTICE_CLIENT_ID environment variable not set");
    let client_secret = env::var("LATTICE_CLIENT_SECRET")
        .expect("LATTICE_CLIENT_SECRET environment variable not set");
    let lattice_endpoint = env::var("LATTICE_ENDPOINT")
        .expect("LATTICE_ENDPOINT environment variable not set");
    let sandboxes_token = env::var("SANDBOXES_TOKEN")
        .expect("SANDBOXES_TOKEN environment variable not set");

    // When true, the agent cannot accept cancellations for an active task.
    let task_active = env::var("TASK_ACTIVE")
        .map(|v| v.eq_ignore_ascii_case("true"))
        .unwrap_or(false);

    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token,
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    let tls_config = ClientTlsConfig::new().with_native_roots();
    let channel = Channel::from_shared(format!("https://{}", lattice_endpoint))?
        .tls_config(tls_config)?
        .connect()
        .await?;

    let access_token = auth.get_token().await?;
    let sandboxes_token = auth.sandboxes_token().to_string();
    let auth_header: MetadataValue<_> = format!("Bearer {}", access_token).parse()?;
    let sandbox_header: MetadataValue<_> = format!("Bearer {}", sandboxes_token).parse()?;

    let interceptor: Interceptor = Box::new(move |mut req: Request<()>| {
        req.metadata_mut()
            .insert("authorization", auth_header.clone());
        req.metadata_mut()
            .insert("anduril-sandbox-authorization", sandbox_header.clone());
        Ok(req)
    });
    let mut client: TaskClient = TaskManagerApiClient::with_interceptor(channel, interceptor);

    // Set the entity ID to listen for tasks
    let entity_id = "<AGENT_ID>".to_string();
    println!("Listening for tasks for entity {}...", entity_id);

    loop {
        let request = Request::new(ListenAsAgentRequest {
            agent_selector: Some(listen_as_agent_request::AgentSelector::EntityIds(EntityIds {
                entity_ids: vec![entity_id.clone()],
            })),
            ..Default::default()
        });

        let mut stream = match client.listen_as_agent(request).await {
            Ok(resp) => resp.into_inner(),
            Err(e) => {
                eprintln!("Error starting task listener: {}", e);
                tokio::time::sleep(Duration::from_secs(1)).await;
                continue;
            }
        };

        loop {
            let response = match stream.message().await {
                Ok(Some(r)) => r,
                Ok(None) => {
                    println!("Stream ended");
                    break;
                }
                Err(e) => {
                    eprintln!("Error receiving from stream: {}", e);
                    break;
                }
            };

            match response.request {
                Some(listen_as_agent_response::Request::ExecuteRequest(execute)) => {
                    if let Some(task) = execute.task {
                        if let Some(version) = task.version {
                            let task_id = version.task_id.clone();
                            let status_version = version.status_version;
                            println!("Starting task {}, version {}", task_id, status_version);

                            match execute_task(&mut client, &task_id, status_version, &entity_id)
                                .await
                            {
                                Ok(v) => println!(
                                    "Started task with status version: {}",
                                    v.status_version
                                ),
                                Err(e) => eprintln!("Error starting task: {}", e),
                            }
                        }
                    }
                }
                Some(listen_as_agent_response::Request::CompleteRequest(complete)) => {
                    if !complete.task_id.is_empty() {
                        println!("Completing task: {}", complete.task_id);
                        if let Err(e) =
                            complete_task(&mut client, &complete.task_id, &entity_id).await
                        {
                            eprintln!("Error completing task: {}", e);
                        }
                    }
                }
                Some(listen_as_agent_response::Request::CancelRequest(cancel)) => {
                    if !cancel.task_id.is_empty() {
                        println!("Cancelling task: {}", cancel.task_id);
                        if let Err(e) =
                            cancel_task(&mut client, &cancel.task_id, &entity_id, task_active)
                                .await
                        {
                            eprintln!("Error cancelling task: {}", e);
                        }
                    }
                }
                None => {}
            }
        }

        tokio::time::sleep(Duration::from_secs(1)).await;
    }
}

fn system_principal(entity_id: &str) -> Principal {
    Principal {
        agent: Some(principal::Agent::System(System {
            entity_id: entity_id.to_string(),
            ..Default::default()
        })),
        ..Default::default()
    }
}

// execute_task updates the task status to STATUS_EXECUTING.
async fn execute_task(
    client: &mut TaskClient,
    task_id: &str,
    task_status_version: u32,
    agent_entity_id: &str,
) -> Result<TaskVersion, tonic::Status> {
    let status_update = StatusUpdate {
        version: Some(TaskVersion {
            task_id: task_id.to_string(),
            status_version: task_status_version + 1,
            definition_version: 0,
            ..Default::default()
        }),
        status: Some(TaskStatus {
            status: Status::Executing as i32,
            ..Default::default()
        }),
        author: Some(system_principal(agent_entity_id)),
        ..Default::default()
    };

    let response = client
        .update_status(Request::new(UpdateStatusRequest {
            status_update: Some(status_update),
        }))
        .await?;

    response
        .into_inner()
        .task
        .and_then(|t| t.version)
        .ok_or_else(|| tonic::Status::internal("missing task version in response"))
}

// cancel_task handles cancellation requests from Lattice.
async fn cancel_task(
    client: &mut TaskClient,
    task_id: &str,
    entity_id: &str,
    task_active: bool,
) -> Result<(), tonic::Status> {
    // Get current task to retrieve status_version
    let task_response = client
        .get_task(Request::new(GetTaskRequest {
            task_id: task_id.to_string(),
            ..Default::default()
        }))
        .await?
        .into_inner()
        .task
        .ok_or_else(|| tonic::Status::internal("task is missing"))?;

    let current_status = task_response
        .status
        .as_ref()
        .map(|s| s.status)
        .unwrap_or(0);
    let version = task_response
        .version
        .ok_or_else(|| tonic::Status::internal("task version is missing"))?;
    let next_status_version = version.status_version + 1;

    let principal = system_principal(entity_id);

    let status_update = if task_active {
        // Reject cancellation: task is active and cannot be cancelled. Because
        // the cancellation is being rejected, we do not change the task status.
        StatusUpdate {
            version: Some(TaskVersion {
                task_id: task_id.to_string(),
                status_version: next_status_version,
                definition_version: 0,
                ..Default::default()
            }),
            status: Some(TaskStatus {
                status: current_status,
                task_error: Some(TaskError {
                    code: ErrorCode::Rejected as i32,
                    message: "Task is already active, and cannot be cancelled.".to_string(),
                    ..Default::default()
                }),
                ..Default::default()
            }),
            author: Some(principal),
            ..Default::default()
        }
    } else {
        // Accept cancellation
        StatusUpdate {
            version: Some(TaskVersion {
                task_id: task_id.to_string(),
                status_version: next_status_version,
                definition_version: 0,
                ..Default::default()
            }),
            status: Some(TaskStatus {
                status: Status::DoneNotOk as i32,
                task_error: Some(TaskError {
                    code: ErrorCode::Cancelled as i32,
                    message: "Task cancelled by agent.".to_string(),
                    ..Default::default()
                }),
                ..Default::default()
            }),
            author: Some(principal),
            ..Default::default()
        }
    };

    client
        .update_status(Request::new(UpdateStatusRequest {
            status_update: Some(status_update),
        }))
        .await?;

    if task_active {
        println!("Task could not be cancelled.");
    } else {
        println!("Task has been cancelled.");
    }
    Ok(())
}

// complete_task updates the task status to STATUS_DONE_OK.
async fn complete_task(
    client: &mut TaskClient,
    task_id: &str,
    entity_id: &str,
) -> Result<(), tonic::Status> {
    // Get current task to retrieve status_version
    let version = client
        .get_task(Request::new(GetTaskRequest {
            task_id: task_id.to_string(),
            ..Default::default()
        }))
        .await?
        .into_inner()
        .task
        .and_then(|t| t.version)
        .ok_or_else(|| tonic::Status::internal("task version is missing"))?;

    let status_update = StatusUpdate {
        version: Some(TaskVersion {
            task_id: task_id.to_string(),
            // Increment version and update to terminal state
            status_version: version.status_version + 1,
            definition_version: 0,
            ..Default::default()
        }),
        status: Some(TaskStatus {
            status: Status::DoneOk as i32,
            ..Default::default()
        }),
        author: Some(system_principal(entity_id)),
        ..Default::default()
    };

    client
        .update_status(Request::new(UpdateStatusRequest {
            status_update: Some(status_update),
        }))
        .await?;
    Ok(())
}

```

The agent must first retrieve the current task using [`GetTask`](/reference/rest/tasks/get-task) to
obtain the current [`statusVersion`](/reference/rest/tasks/get-task#response.body.version.statusVersion),
then increment it before calling [`UpdateTaskStatus`](/reference/rest/tasks/update-task-status).

Send a task cancellation request to Lattice. Since, in this example, the task has already been sent to an agent,
Lattice routes the request to the agent:

```go title={"Go (REST)"} startLine={60} maxLines={20}
package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	Lattice "github.com/anduril/lattice-sdk-go/v4"
	"github.com/anduril/lattice-sdk-go/v4/client"
	"github.com/anduril/lattice-sdk-go/v4/option"
)

func main() {
	// Get environment variables
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	clientId := os.Getenv("LATTICE_CLIENT_ID")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Check required environment variables
	if latticeEndpoint == "" || clientId == "" || clientSecret == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables.")
		os.Exit(1)
	}

	// Check for required command-line arguments
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run cancel_task.go <task_id> [entity_id]")
		os.Exit(1)
	}

	taskId := os.Args[1]
	var entityId *string
	if len(os.Args) > 2 {
		entityId = &os.Args[2]
	}

	// Initialize headers for sandbox authorization
	headers := http.Header{}
	headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))

	// Create the client
	LatticeClient := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)

	// Create context for the request
	ctx := context.Background()

	// Build author based on whether entity_id is provided
	var author *Lattice.Principal
	if entityId != nil {
		author = &Lattice.Principal{
			System: &Lattice.System{
				EntityID: entityId,
			},
		}
		fmt.Printf("Cancelling task: %s\n", taskId)
		fmt.Printf("Author entity: %s\n", *entityId)
	} else {
		userId := "operator_1"
		author = &Lattice.Principal{
			User: &Lattice.User{
				UserID: &userId,
			},
		}
		fmt.Printf("Cancelling task: %s\n", taskId)
	}

	// Create cancel task request
	cancelRequest := Lattice.TaskCancellation{
		TaskID: taskId,
		Author: author,
	}

	// Call the CancelTask API
	_, err := LatticeClient.Tasks.CancelTask(ctx, &cancelRequest)
	if err != nil {
		fmt.Printf("Error cancelling task: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Cancel task response: {}\n")
}

```

```java title={"Java (REST)"} startLine={44} maxLines={20}
package org.example;

import com.anduril.Lattice;
import com.anduril.resources.tasks.requests.TaskCancellation;
import com.anduril.types.Principal;
import com.anduril.types.User;
public class CancelTask {
    public static void main(String[] args) {
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");

        if (endpoint == null || clientId == null || clientSecret == null || sandboxesToken == null) {
            System.err.println("Missing required environment variables.");
            System.exit(1);
        }
        if (!endpoint.startsWith("https://")) endpoint = "https://" + endpoint;

        // Check for required command-line arguments
        if (args.length < 1) {
            System.err.println("Usage: java CancelTask <task_id> [entity_id]");
            System.exit(1);
        }

        String taskId = args[0];
        String entityId = args.length > 1 ? args[1] : null;

        try {
            Lattice client = Lattice.builder()
                .url(endpoint)
                .credentials(clientId, clientSecret)
                .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
                .build();

            // Build author based on whether entity_id is provided
            Principal author;
            if (entityId != null) {
                author = Principal.builder()
                    .system(com.anduril.types.System.builder()
                        .entityId(entityId)
                        .build())
                    .build();
                System.out.println("Cancelling task: " + taskId);
                System.out.println("Author entity: " + entityId);
            } else {
                author = Principal.builder()
                    .user(User.builder()
                        .userId("operator_1")
                        .build())
                    .build();
                System.out.println("Cancelling task: " + taskId);
            }

            // Create cancel task request
            TaskCancellation cancelRequest = TaskCancellation.builder()
                .author(author)
                .build();

            // Call the CancelTask API
            client.tasks().cancelTask(taskId, cancelRequest);
        } catch (Exception e) {
            System.err.println("Error cancelling task: " + e.getMessage());
            System.exit(1);
        }
    }
}

```

```py title={"Python (REST)"} startLine={24} maxLines={20}
from anduril import AsyncLattice, Principal, System, User
import asyncio
import os
import sys

lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')

# Remove sandboxes_token from the following statements if you are not developing on Sandboxes.
sandboxes_token = os.getenv('SANDBOXES_TOKEN')
if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
    print("Missing required environment variables.")
    sys.exit(1)

client = AsyncLattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    # Remove the following header if you are not developing on Sandboxes.
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)

async def cancel_task(task_id, entity_id=None):
    try:
        # Build author if entity_id is provided
        author = None
        if entity_id:
            author = Principal(
                system=System(
                    entity_id=entity_id
                )
            )
        else:
            author = Principal(
                user=User(
                    user_id="operator_1"
                )
            )

        # Call the cancel_task API
        response = await client.tasks.cancel_task(
            task_id=task_id,
            author=author
        )
        print(f"Cancel task response: {response}")
    except Exception as error:
        print(f"Error cancelling task: {error}")
        raise

async def main():
    if len(sys.argv) < 2:
        print("Usage: python cancel_task.py <task_id> [entity_id]")
        sys.exit(1)

    task_id = sys.argv[1]
    entity_id = sys.argv[2] if len(sys.argv) > 2 else None

    print(f"Cancelling task: {task_id}")
    if entity_id:
        print(f"Author entity: {entity_id}")

    await cancel_task(task_id, entity_id)

if __name__ == "__main__":
    asyncio.run(main())

```

```ts title={"TypeScript (REST)"} startLine={31} maxLines={20}
import { LatticeClient } from "@anduril-industries/lattice-sdk";

const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;
const sandboxesToken = process.env.SANDBOXES_TOKEN;

if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

const client = new LatticeClient({
    baseUrl: latticeEndpoint.startsWith("https://") ? latticeEndpoint : `https://${latticeEndpoint}`,
    clientId: clientId,
    clientSecret: clientSecret,
    headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
});

async function App() {
    // Check for required command-line arguments
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error("Usage: npx ts-node CancelTask.ts <task_id> [entity_id]");
        process.exit(1);
    }

    const taskId = args[0];
    const entityId = args.length > 1 ? args[1] : undefined;

    try {
        // Build author based on whether entity_id is provided
        let author;
        if (entityId) {
            author = {
                system: {
                    entityId: entityId
                }
            };
            console.log(`Cancelling task: ${taskId}`);
            console.log(`Author entity: ${entityId}`);
        } else {
            author = {
                user: {
                    userId: "operator_1"
                }
            };
            console.log(`Cancelling task: ${taskId}`);
        }

        // Call the CancelTask API
        await client.tasks.cancelTask({
            taskId: taskId,
            author: author
        });

        console.log("Task cancellation request sent successfully.");
    } catch (error) {
        console.error(`Error cancelling task: ${error}`);
        process.exit(1);
    }
}

App();

```

```go title={"Go (gRPC)"} startLine={66} maxLines={20}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/taskmanager/v1/taskmanagerv1grpc"
	taskmanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/taskmanager/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables.")
		os.Exit(1)
	}

	// Check for required command-line arguments
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run cancel_task.go <task_id> [entity_id]")
		os.Exit(1)
	}

	taskId := os.Args[1]
	var entityId string
	if len(os.Args) > 2 {
		entityId = os.Args[2]
	}

	// Setup authentication
	auth := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")),
		grpc.WithPerRPCCredentials(auth),
	}

	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	client := taskmanagerv1grpc.NewTaskManagerAPIClient(conn)

	ctx := context.Background()

	// Build author based on whether entity_id is provided
	var author *taskmanagerv1.Principal
	if entityId != "" {
		author = &taskmanagerv1.Principal{
			Agent: &taskmanagerv1.Principal_System{
				System: &taskmanagerv1.System{
					EntityId: entityId,
				},
			},
		}
		fmt.Printf("Cancelling task: %s\n", taskId)
		fmt.Printf("Author entity: %s\n", entityId)
	} else {
		author = &taskmanagerv1.Principal{
			Agent: &taskmanagerv1.Principal_User{
				User: &taskmanagerv1.User{
					UserId: "operator_1",
				},
			},
		}
		fmt.Printf("Cancelling task: %s\n", taskId)
	}

	// Create cancel task request
	cancelRequest := &taskmanagerv1.CancelTaskRequest{
		TaskId: taskId,
		Author: author,
	}

	// Call the CancelTask API
	_, err = client.CancelTask(ctx, cancelRequest)
	if err != nil {
		log.Fatalf("Error cancelling task: %v", err)
	}

	fmt.Printf("Cancel task response: {}\n")
}

```

```py title={"Python (gRPC)"} startLine={58} maxLines={10}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import grpc
from auth import ClientCredentialsAuth

from anduril.taskmanager.v1.task.pub_pb2 import Principal, System, User
from anduril.taskmanager.v1.task_manager_api.pub_pb2 import CancelTaskRequest
from anduril.taskmanager.v1.task_manager_api.pub_pb2_grpc import TaskManagerAPIStub


def main():
    # Load environment variables
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
        print("Missing required environment variables", file=sys.stderr)
        sys.exit(1)

    if len(sys.argv) < 2:
        print("Usage: python cancel_task.py <task_id> [entity_id]", file=sys.stderr)
        sys.exit(1)

    task_id = sys.argv[1]
    entity_id = sys.argv[2] if len(sys.argv) > 2 else ""

    # Create authentication handler
    auth = ClientCredentialsAuth(
        client_id=client_id,
        client_secret=client_secret,
        sandboxes_token=sandboxes_token,
        endpoint=f"https://{lattice_endpoint}/api/v1/oauth/token",
    )

    # Create gRPC channel with SSL and authentication interceptor
    credentials = grpc.ssl_channel_credentials()
    channel = grpc.intercept_channel(
        grpc.secure_channel(lattice_endpoint, credentials),
        auth.create_metadata_interceptor(),
    )

    client = TaskManagerAPIStub(channel)

    # Build author based on whether entity_id was provided
    if entity_id:
        author = Principal(system=System(entity_id=entity_id))
        print(f"Cancelling task: {task_id}")
        print(f"Author entity: {entity_id}")
    else:
        author = Principal(user=User(user_id="operator_1"))
        print(f"Cancelling task: {task_id}")

    request = CancelTaskRequest(task_id=task_id, author=author)

    try:
        client.CancelTask(request)
        print("Cancel task response: {}")
    except Exception as error:
        print(f"Error cancelling task: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={66} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::taskmanager::v1::{
    principal, CancelTaskRequest, Principal, System, User,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::taskmanager::v1::tonic::task_manager_api_client::TaskManagerApiClient;
use auth::ClientCredentialsAuth;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client_id = env::var("LATTICE_CLIENT_ID")
        .expect("LATTICE_CLIENT_ID environment variable not set");
    let client_secret = env::var("LATTICE_CLIENT_SECRET")
        .expect("LATTICE_CLIENT_SECRET environment variable not set");
    let lattice_endpoint = env::var("LATTICE_ENDPOINT")
        .expect("LATTICE_ENDPOINT environment variable not set");
    let sandboxes_token = env::var("SANDBOXES_TOKEN")
        .expect("SANDBOXES_TOKEN environment variable not set");

    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        eprintln!("Usage: cargo run --bin cancel_task -- <task_id> [entity_id]");
        std::process::exit(1);
    }
    let task_id = args[1].clone();
    let entity_id = args.get(2).cloned();

    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token,
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    let tls_config = ClientTlsConfig::new().with_native_roots();
    let channel = Channel::from_shared(format!("https://{}", lattice_endpoint))?
        .tls_config(tls_config)?
        .connect()
        .await?;

    let access_token = auth.get_token().await?;
    let sandboxes_token = auth.sandboxes_token();
    let auth_header: MetadataValue<_> = format!("Bearer {}", access_token).parse()?;
    let sandbox_header: MetadataValue<_> = format!("Bearer {}", sandboxes_token).parse()?;

    let mut client = TaskManagerApiClient::with_interceptor(
        channel,
        move |mut req: Request<()>| {
            req.metadata_mut()
                .insert("authorization", auth_header.clone());
            req.metadata_mut()
                .insert("anduril-sandbox-authorization", sandbox_header.clone());
            Ok(req)
        },
    );

    // Build the author principal. When an entity ID is provided we cancel the
    // task as a system (entity-backed agent); otherwise we cancel as a user.
    let author = match entity_id.as_deref() {
        Some(entity_id) if !entity_id.is_empty() => {
            println!("Cancelling task: {}", task_id);
            println!("Author entity: {}", entity_id);
            Principal {
                agent: Some(principal::Agent::System(System {
                    entity_id: entity_id.to_string(),
                    ..Default::default()
                })),
                ..Default::default()
            }
        }
        _ => {
            println!("Cancelling task: {}", task_id);
            Principal {
                agent: Some(principal::Agent::User(User {
                    user_id: "operator_1".to_string(),
                })),
                ..Default::default()
            }
        }
    };

    // Send the CancelTask request.
    let request = Request::new(CancelTaskRequest {
        task_id,
        author: Some(author),
    });
    client.cancel_task(request).await?;

    println!("Cancel task response: {{}}");
    Ok(())
}

```

The `CancelTask` API accepts the following parameters:

The unique identifier of the task to cancel.

Who or what is requesting the cancellation. Can be a user [`Principal`](/reference/rest/tasks/cancel-task#request.body.author)
with a [`userId`](/reference/rest/tasks/cancel-task#request.body.author.user.userId) or a
system `Principal` with an [`entityId`](/reference/rest/tasks/cancel-task#request.body.author.system.entityId).

Run the cancellation request with the task ID from Step 2:

```bash
python cancel_task.py <task_id>
```

After requesting cancellation, the task will transition to one of two outcomes:

**Successful cancellation:**

When the agent accepts the cancellation, the task transitions to
`STATUS_DONE_NOT_OK` with `ERROR_CODE_CANCELLED`:

```bash
Cancelling task: task-123456
Task has been cancelled.
Task Status: STATUS_DONE_NOT_OK
Error Code: ERROR_CODE_CANCELLED
Error Message: Task cancelled by agent.
```

**Rejected cancellation:**

When the agent rejects the cancellation, the task retains its current status but includes a
`TaskError` with `ERROR_CODE_REJECTED`:

```bash
Cancelling task: task-123456
Task could not be cancelled.
Task Status: STATUS_EXECUTING
Error Code: ERROR_CODE_REJECTED
Error Message: Task is already active, and cannot be cancelled.
```

For more information, see `CancelTask` in the *Lattice API Reference*.

## What's next

* Learn how to update task status, see [Update tasks](/guides/tasks/update).
* Implement agent-specific task listening, see [Listen for tasks](/guides/tasks/listen).