> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Update tasks

In Lattice, a **task status** represents each stage of the task lifecycle. When an agent receives a task,
it calls the following API to update a task in Lattice:

* [`UpdateStatus`](/reference/rest/tasks/update-task-status): Used to report real-time status updates to Lattice
  as the agent makes progress through a task.

## Before you begin

* To publish taskable entities, and subscribe to tasks, [set up](/guides/getting-started/set-up) your Lattice environment.
* Familiarize yourself with [entities](/guides/entities/overview) and different entity types.

If you are using gRPC with client credentials, [set up the token refresh module](/guides/getting-started/authenticate#using-grpc) before running the examples on this page.

## Start performing a task

After an agent has identified a task to perform and begins to make progress towards its objective,
it communicates back to Lattice using the [UpdateTaskStatus](/reference/rest/tasks/update-task-status)
to cycle through various states of a task lifecycle.

To update the status of a task, do the following:

Use the [`UpdateTaskStatus`](/reference/rest/tasks/update-task-status)
operation. In this example, the agent listens to a stream of assigned tasks, then updates the task status,
incrementing the `StatusVersion` of the task.

Replace `AGENT_ID` with the ID of the agent you want to task. If you are developing on Sandboxes,
replace this with the following simulated asset: `Demo-Sim-Asset1`:

```go title={"Go (REST)"} startLine={136} maxLines={20}
package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

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

	// Set the entity ID to listen for tasks
	entityId := "<AGENT_ID>"
	fmt.Printf("Streaming tasks for entity %s...\n", entityId)

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
					result, err := startTask(ctx, LatticeClient, taskId, int(taskStatusVersion), entityId)
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
				}
			} else if cancelRequest := request.GetCancelRequest(); cancelRequest != nil {
				taskToCancel := cancelRequest.GetTaskID()
				if taskToCancel != nil {
					log.Printf("Cancelling task: %s", *taskToCancel)
				}
			}
		}

		// Sleep briefly to prevent tight looping
		time.Sleep(100 * time.Millisecond)
	}
}

// startTask updates the task status to STATUS_EXECUTING
func startTask(ctx context.Context, client *client.Client, taskId string, taskStatusVersion int, agentEntityId string) (*Lattice.TaskVersion, error) {
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

```

```java title={"Java (REST)"} startLine={117} maxLines={20}
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
import com.anduril.types.TaskStatus;
import com.anduril.types.TaskStatusStatus;
import com.anduril.types.TaskVersion;

/**
 * StartTask demonstrates how to use the Lattice SDK to stream tasks assigned to an agent
 * and update task status.
 */
public class StartTask {
    // Entity ID to listen for tasks - replace with your actual entity ID.
    private static final String ENTITY_ID = "<AGENT_ID>";

    public static void main(String[] args) {
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");

        if (endpoint == null || clientId == null || clientSecret == null || sandboxesToken == null) {
            System.err.println("Missing required environment variables");
            System.exit(1);
        }
        if (!endpoint.startsWith("https://")) endpoint = "https://" + endpoint;

        try {
            AsyncLattice client = AsyncLattice.builder()
                .url(endpoint)
                .credentials(clientId, clientSecret)
                .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
                .build();

            System.out.println("Streaming tasks for: " + ENTITY_ID);

            // Create agent selector with the specified entity ID.
            EntityIdsSelector agentSelector = EntityIdsSelector.builder()
                .entityIds(Arrays.asList(ENTITY_ID))
                .build();

            // Create agent stream request.
            AgentStreamRequest agentRequest = AgentStreamRequest.builder()
                .agentSelector(agentSelector)
                .build();

            // Stream tasks from the server
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
                                    // Update task status.
                                    TaskVersion result = startTask(client, taskId, taskStatusVersion, ENTITY_ID).get();
                                    System.out.println("Started task with status version: " + result.getStatusVersion().get());
                                } catch (Exception e) {
                                    System.err.println("Error starting task: " + e.getMessage());
                                }
                            } else if (event.getCompleteRequest().isPresent()) {
                                System.out.println("Completing task: " + event.getCompleteRequest().get()
                                    .getTaskId().get());
                            } else if (event.getCancelRequest().isPresent()) {
                                System.out.println("Cancelling task: " + event.getCancelRequest().get()
                                    .getTaskId().get());
                            }
                        }
                    }
                })
                .exceptionally(ex -> {
                    System.err.println("Error streaming tasks: " + ex.getMessage());
                    return null;
                })
                .join();
        } catch (Exception e) {
            System.err.println("Failed to initialize: " + e.getMessage());
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

            // Increment status version for the update
            taskStatusVersion += 1;

            // Create task status update request.
            TaskStatusUpdate taskStatusUpdate = TaskStatusUpdate.builder()
                .statusVersion(taskStatusVersion)
                .newStatus(taskStatus)
                .author(principal)
                .build();

            return client.tasks().updateTaskStatus(taskId, taskStatusUpdate)
                .thenApply(newStatus -> newStatus.getVersion().get());
        } catch (Exception e) {
            System.err.println("Encountered the following error while starting task: " + e.getMessage());
            return CompletableFuture.failedFuture(e);
        }
    }
}

```

```py title={"Python (REST)"} startLine={21} maxLines={20}
from anduril import AsyncLattice, EntityIdsSelector, TaskStatus, Principal, System
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
                result = await start_task(task_id, task_status_version, entity_id)
                if result and result.version:
                    print(f"Started task with status version: {result.version.status_version}.")

    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    raise SystemExit(asyncio.run(main(entity_id="<AGENT_ID>")))
```

```ts title={"Typescript (REST)"} startLine={21} maxLines={20}
import { LatticeClient } from "@anduril-industries/lattice-sdk";

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
        headers: {  "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}`  }
    }
);

async function startTask(taskId: string, statusVersion: number, entityId: string) {
    try {
        const response = await client.tasks.updateTaskStatus(
            {
                taskId,
                // Increment the task status version.
                statusVersion: statusVersion + 1,
                author: {
                    system: {
                        entityId: entityId
                    }
                },
                // Indicate that the agent has started the task.
                newStatus: {
                    status: "STATUS_EXECUTING"
                }
            }
        )
        return response;
    } catch (error) {
        console.log(`Encountered the following error while starting task: ${error}`);
    }
}

async function App(entityId: string) {
    try {
        console.log(`Streaming tasks for entity ${entityId}...`);
        const requests = await client.tasks.streamAsAgent(
            {
                agentSelector: {
                    entityIds: [entityId]
                }
            }
        );

        for await (const request of requests) {
            if (request.event === "heartbeat") {
                console.log(`Heartbeat: ${request?.timestamp}`);
                continue;
            }

            if (request.executeRequest) {
                const taskId = request.executeRequest?.task?.version?.taskId;
                const taskStatusVersion = request.executeRequest?.task?.version?.statusVersion;
                const taskDescription = request.executeRequest?.task?.description;
                if (!taskId || taskStatusVersion == null) continue;

                console.log(`Starting task ${taskId}, version ${taskStatusVersion}: ${taskDescription}`);
                const result = await startTask(taskId, taskStatusVersion, entityId);
                console.log(`Started task ${taskId}, with status version number: ${result?.version?.statusVersion}.`);

            } else if (request.completeRequest) {
                console.log(`Completing task: ${request.completeRequest.taskId}`);
            } else if (request.cancelRequest) {
                console.log(`Cancelling task: ${request.cancelRequest.taskId}`);
            }
        }
    } catch (error) {
        console.log(`Encountered the following error while processing task: ${error}`);
    }
}

// Replace with the ID of entity listening for a task
const entityId = '<AGENT_ID>';
App(entityId);
```

```go title={"Go (gRPC)"} startLine={146} maxLines={20}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"time"

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

	// Set the entity ID to listen for tasks
	entityId := "<ENTITY_ID>"
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
						result, err := startTask(ctx, client, taskId, taskStatusVersion, entityId)
						if err != nil {
							fmt.Printf("Error starting task: %v\n", err)
							return false
						}

						fmt.Printf("Started task with status version: %d\n", result.StatusVersion)
					}

				case *taskmanagerv1.ListenAsAgentResponse_CompleteRequest:
					if x.CompleteRequest != nil && x.CompleteRequest.TaskId != "" {
						fmt.Printf("Completing task: %s\n", x.CompleteRequest.TaskId)
					}

				case *taskmanagerv1.ListenAsAgentResponse_CancelRequest:
					if x.CancelRequest != nil && x.CancelRequest.TaskId != "" {
						fmt.Printf("Cancelling task: %s\n", x.CancelRequest.TaskId)
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

// startTask updates the task status to STATUS_EXECUTING
func startTask(ctx context.Context, client taskmanagerv1grpc.TaskManagerAPIClient, taskId string, taskStatusVersion uint32, agentEntityId string) (*taskmanagerv1.TaskVersion, error) {
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

```

```py title={"Python (gRPC)"} startLine={33} maxLines={15}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import time
import grpc
from auth import ClientCredentialsAuth

from anduril.taskmanager.v1.task.pub_pb2 import (
    Principal,
    Status,
    System,
    TaskStatus,
    TaskVersion,
    StatusUpdate,
)
from anduril.taskmanager.v1.task_manager_api.pub_pb2 import (
    EntityIds,
    ListenAsAgentRequest,
    UpdateStatusRequest,
)
from anduril.taskmanager.v1.task_manager_api.pub_pb2_grpc import TaskManagerAPIStub


def start_task(client, task_id, task_status_version, agent_entity_id):
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

    entity_id = "<ENTITY_ID>"
    print(f"Listening for tasks for entity {entity_id}...")

    while True:
        try:
            stream = client.ListenAsAgent(
                ListenAsAgentRequest(entity_ids=EntityIds(entity_ids=[entity_id]))
            )

            for response in stream:
                if response.HasField("execute_request"):
                    task = response.execute_request.task
                    if task and task.version and task.version.task_id:
                        task_id = task.version.task_id
                        task_status_version = task.version.status_version
                        print(f"Starting task {task_id}, version {task_status_version}")

                        try:
                            result = start_task(client, task_id, task_status_version, entity_id)
                            print(f"Started task with status version: {result.status_version}")
                        except Exception as error:
                            print(f"Error starting task: {error}", file=sys.stderr)
                            break
                elif response.HasField("complete_request"):
                    if response.complete_request.task_id:
                        print(f"Completing task: {response.complete_request.task_id}")
                elif response.HasField("cancel_request"):
                    if response.cancel_request.task_id:
                        print(f"Cancelling task: {response.cancel_request.task_id}")
        except Exception as error:
            print(f"Error in stream: {error}", file=sys.stderr)

        # If the stream ended or errored, wait a bit before retrying
        time.sleep(1)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={107} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::taskmanager::v1::{
    listen_as_agent_request, listen_as_agent_response, principal, EntityIds, ListenAsAgentRequest,
    Principal, Status, StatusUpdate, System, TaskStatus, TaskVersion, UpdateStatusRequest,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::taskmanager::v1::tonic::task_manager_api_client::TaskManagerApiClient;
use auth::ClientCredentialsAuth;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use std::env;
use std::time::Duration;

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
    let sandboxes_token = auth.sandboxes_token().to_string();
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

    // Set the entity ID to listen for tasks
    let entity_id = "<ENTITY_ID>".to_string();
    println!("Listening for tasks for entity {}...", entity_id);

    // Reconnect loop: open a fresh ListenAsAgent stream if the previous one
    // disconnects or errors.
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

            // Process the response based on the type of task request
            match response.request {
                Some(listen_as_agent_response::Request::ExecuteRequest(execute)) => {
                    if let Some(task) = execute.task {
                        if let Some(version) = task.version {
                            let task_id = version.task_id.clone();
                            let task_status_version = version.status_version;
                            println!(
                                "Starting task {}, version {}",
                                task_id, task_status_version
                            );

                            // Create status update request
                            let status_update = StatusUpdate {
                                version: Some(TaskVersion {
                                    task_id: task_id.clone(),
                                    // Increment status version for the update
                                    status_version: task_status_version + 1,
                                    definition_version: 0,
                                    ..Default::default()
                                }),
                                status: Some(TaskStatus {
                                    status: Status::Executing as i32,
                                    ..Default::default()
                                }),
                                author: Some(Principal {
                                    agent: Some(principal::Agent::System(System {
                                        entity_id: entity_id.clone(),
                                        ..Default::default()
                                    })),
                                    ..Default::default()
                                }),
                                ..Default::default()
                            };

                            // Call the UpdateStatus API
                            match client
                                .update_status(Request::new(UpdateStatusRequest {
                                    status_update: Some(status_update),
                                }))
                                .await
                            {
                                Ok(resp) => {
                                    if let Some(v) =
                                        resp.into_inner().task.and_then(|t| t.version)
                                    {
                                        println!(
                                            "Started task with status version: {}",
                                            v.status_version
                                        );
                                    }
                                }
                                Err(e) => eprintln!("Error starting task: {}", e),
                            }
                        }
                    }
                }
                Some(listen_as_agent_response::Request::CompleteRequest(complete)) => {
                    if !complete.task_id.is_empty() {
                        println!("Completing task: {}", complete.task_id);
                    }
                }
                Some(listen_as_agent_response::Request::CancelRequest(cancel)) => {
                    if !cancel.task_id.is_empty() {
                        println!("Cancelling task: {}", cancel.task_id);
                    }
                }
                None => {}
            }
        }

        // If there was an error, wait a bit before retrying
        tokio::time::sleep(Duration::from_secs(1)).await;
    }
}

```

To assign a task, do the following:

1. Open your environment's Lattice UI, and select the entity you published
   in the Entity Explorer. On Sandboxes, choose **Demo-Sim-Asset1**.
2. From the entity's detail page, click **Assign Task**:
   <img src="/_files/anduril.docs.buildwithfern.com/e4304bc543cec0b7c859c63328414b293bdd7403ad7eb26f3d07066afaa15951/assets/images/screenshots/developer-console-entity-detail-page.png" alt="Shows an entity's detail page with the Assign Task button in the Lattice Developer Console." />
3. Select a task from the **Available Tasks** list, fill in the
   fields under **Task Configuration**, then click
   **Submit Task**. The form is generated from the task's schema,
   and submitting it sends a real `CreateTask` request:
   <img src="/_files/anduril.docs.buildwithfern.com/5dda5b8a8cc65404a04cc17f7d4cf3993383e7991e0411dd93db50e4b43d91bf/assets/images/screenshots/developer-console-assign-task-form.png" alt="Shows the task configuration form in the Lattice Developer Console." />

If successful, you see the following output in your local development console:

```bash
Starting task <task-id>, version 1.
Started task with status version: 2.  
```

The agent has successfully updated the tasks status and incremented the task status version.

## Update the status of a task

In Lattice tasks move through the following states:

The agent receives a task with `STATUS_SENT`:

```json
"task": {
    "version": {
        "taskId": "my-task",
        "definitionVersion": 1,
        "statusVersion": 1
    },
    "status": {
        "status": "STATUS_SENT"
    }
}

```

The agent then responds back with status `STATUS_MACHINE_RECEIPT`, indicating that the task
has been received, and incrementing `statusVersion` accordingly:

```json
"statusUpdate": {
    "version": {
        "taskId": "my-task",
        "definitionVersion": 1,
        "statusVersion": 2
    },
    "status": {
        "status": "STATUS_MACHINE_RECEIPT"
    }
}
```

When the agent is ready to acknowledge the task, it does so using `STATUS_ACK`,
and again increments `statusVersion`:

```json
"statusUpdate": {
    "version": {
        "taskId": "my-task",
        "definitionVersion": 1,
        "statusVersion": 3
    },
    "status": {
        "status": "STATUS_ACK"
    }
}
```

The agent confirms it intends to execute the task using `STATUS_WILCO`:

```json
"statusUpdate": {
    "version": {
        "taskId": "my-task",
        "definitionVersion": 1,
        "statusVersion": 4
    },
    "status": {
        "status": "STATUS_WILCO"
    }
}
```

As the agent begins to actively execute the task, it indicates this by reporting `STATUS_EXECUTING` back to Lattice:

```json
"statusUpdate": {
    "version": {
        "taskId": "my-task",
        "definitionVersion": 1,
        "statusVersion": 5
    },
    "status": {
        "status": "STATUS_EXECUTING"
    }
}
```

Finally, when the agent reaches a terminal state and completes the task successfully, it
reports `STATUS_DONE_OK`. This might result from operator-initiated requests for task completion:

```json
"statusUpdate": {
    "version": {
        "taskId": "my-task",
        "definitionVersion": 1,
        "statusVersion": 6
    },
    "status": {
        "status": "STATUS_DONE_OK"
    }
}
```

If the agent reaches a terminal state but does not complete the task successfully, it
reports `STATUS_DONE_NOT_OK`. This might result from operator-initiated requests for task completion or cancellation.
The agent should include a descriptive [`TaskError`](/reference/rest/tasks/update-task-status#request.body.newStatus.taskError)
when reporting `STATUS_DONE_NOT_OK`:

```json
"statusUpdate": {
    "version": {
        "taskId": "my-task",
        "definitionVersion": 1,
        "statusVersion": 7
    },
    "status": {
        "status": "DONE_NOT_OK",
        "taskError": {
        "code": "ERROR_CODE_FAILED",
        "message": "The asset failed task execution due to an internal error.",
        }
    }
}
```

In this example, the message indicates that the agent encountered an internal
error during task execution. You can add more descriptive errors to help the operator
troubleshoot the issue accordingly.

The `STATUS_DONE_OK` and `STATUS_DONE_NOT_OK` statuses are considered terminal states.
Once a task reaches either state, it's complete and cannot be updated.

## What's next

* To learn more about tasks, see [Task an asset](/samples/overview#task-an-asset) in
  the Lattice SDK sample applications guide.