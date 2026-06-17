> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Listen for tasks

A **taskable agent** is an asset entity, or group of entities that can perform tasks.

An agent calls the following API to listen for tasks assigned to it in Lattice:

* [`StreamAsAgent`](/reference/rest/tasks/stream-as-agent) -- For monitoring tasks routed to the agent using REST.
* [`ListenAsAgent`](/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-listen-as-agent) -- For monitoring tasks routed to the agent using gRPC.

## Before you begin

* To publish taskable entities, and subscribe to tasks, [set up](/guides/getting-started/set-up) your Lattice environment.
* Familiarize yourself with [entities](/guides/entities/overview) and different entity types.

If you are using gRPC with client credentials, [set up the token refresh module](/guides/getting-started/authenticate#using-grpc) before running the examples on this page.

## Integrate an agent

An *asset* is an entity under your control, or under the control of another operator or system.
Assets may accept tasks such as search or tracking. An *agent* is an asset,
or a group of assets, that can complete a specific set of defined tasks.

To publish an agent, do the following:

The entity model's [`TaskCatalog`](/reference/rest/entities/publish-entity#request.body.taskCatalog)
component defines the tasks that an asset can execute. An operator, using the Lattice UI or
a programmatic SDK integration, can use an entity [`override`](/reference/rest/entities/override-entity)
to modify the asset's `TaskCatalog`.

For example, publish an asset with the following catalog to listen to, and execute `VisualId` and `Investigate`
tasks assigned to it:

```json title="taskCatalog"
  "taskCatalog": {
      // Define the tasks the asset can perform.
      "taskDefinitions": [
          {
              // Set the task specification URL.
              "taskSpecificationUrl": "type.googleapis.com/anduril.tasks.v2.VisualId"
          },
          {
              // Set the task specification URL.
              "taskSpecificationUrl": "type.googleapis.com/anduril.tasks.v2.Investigate"
          }
      ]
  }
```

Use the [`PublishEntity`](/reference/rest/entities/publish-entity) method to publish a taskable agent:

```go title={"Go (REST)"} startLine={53} maxLines={30}
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

```java title={"Java (REST)"} startLine={81} maxLines={30}
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

```py title={"Python (REST)"} startLine={30} maxLines={30}
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

```ts title={"Typescript (REST)"} startLine={33} maxLines={30}
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

```go title={"Go (gRPC)"} startLine={71} maxLines={30}
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

```py title={"Python (gRPC)"} startLine={68} maxLines={30}
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

```rs title={"Rust (gRPC)"} startLine={95} maxLines={30}
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

If successful, you see the entity ID in the console. Copy the ID:

```bash
2025-07-16T02:50:04.694Z [INFO]: Published asset: <entity-id>
```

Use [`StreamAsAgent`](/reference/rest/tasks/stream-as-agent),
or [ListenAsAgent](/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-listen-as-agent)
for gRPC, and replace `AGENT_ID` with the ID of the agent you just published.
This lets the agent subscribe to, and listen for, tasks routed to it by Lattice:

```go title={"Go (REST)"} startLine={56} maxLines={35}
package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
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

	// Entity ID to listen for tasks
	entityId := "<AGENT_ID>"
	fmt.Printf("Streaming tasks for entity %s...\n", entityId)

	// Create context for the request
	ctx := context.Background()

	// Create agent selector
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
					log.Printf("Received task: %s", *task.GetVersion().GetTaskID())
					log.Printf("Task description: %s", *task.GetDescription())
				}
			} else if completeRequest := request.GetCompleteRequest(); completeRequest != nil {
				taskToComplete := completeRequest.GetTaskID()
				if taskToComplete != nil {
					log.Printf("Completing task: %s", *taskToComplete)
				}
			} else if cancelRequest := request.GetCancelRequest(); cancelRequest != nil {
				taskToCancel := cancelRequest.GetTaskID()
				if taskToCancel != nil {
					log.Printf("Canceling task: %s", *taskToCancel)
				}
			}
		}
	}
}

```

```java title={"Java (REST)"} startLine={44} maxLines={35}
package org.example;
import java.util.Arrays;

import com.anduril.AsyncLattice;
import com.anduril.resources.tasks.requests.AgentStreamRequest;
import com.anduril.resources.tasks.types.StreamAsAgentResponse;
import com.anduril.types.AgentStreamEvent;
import com.anduril.types.EntityIdsSelector;

public class StreamAsAgent {
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

        try {
            AsyncLattice client = AsyncLattice.builder()
                .url(endpoint)
                .credentials(clientId, clientSecret)
                .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
                .build();

            String entityId = "<AGENT_ID>";
            System.out.println("Streaming tasks for entity " + entityId + "...");

            EntityIdsSelector agentSelector = EntityIdsSelector
                .builder()
                .entityIds(Arrays.asList(entityId))
                .build();

            
            AgentStreamRequest agentRequest = AgentStreamRequest
                .builder()
                .agentSelector(agentSelector)
                .build();
            

            client.tasks().streamAsAgent(agentRequest)
                .thenAccept(requests -> {
                    for (StreamAsAgentResponse request : requests) {
                        if (request.isHeartbeat()) {
                            System.out.println("Heartbeat: " + request.getHeartbeat().get().getTimestamp().get());
                        } else {
                            AgentStreamEvent event = request.getAgentRequest().get();
                            if (event.getExecuteRequest().isPresent()) {
                                System.out.println("Received task: " + event.getExecuteRequest().get()
                                    .getTask().get()
                                    .getVersion().get()
                                    .getTaskId().get());

                            }  else if (event.getCompleteRequest().isPresent()) {
                                System.out.println("Completing task: " + event.getCompleteRequest().get()
                                    .getTaskId().get());
                            } else if (event.getCancelRequest().isPresent()) {
                                System.out.println("Canceling task: " + event.getCancelRequest().get()
                                    .getTaskId().get());
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
}

```

```py title={"Python (REST)"} startLine={21} maxLines={35}
from anduril import AsyncLattice, EntityIdsSelector
import asyncio
import os
import sys

lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')
sandboxes_token = os.getenv('SANDBOXES_TOKEN')

if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
    print("Missing required environment variables.")
    sys.exit(1)
    
client = AsyncLattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)

async def listen(entity_id):
    try:
        requests = client.tasks.stream_as_agent(
            agent_selector=EntityIdsSelector(
                entity_ids=[entity_id]
            )
        )
        async for request in requests:
            if request.event == "heartbeat":
                print(f"Heartbeat: {request.timestamp}")
                continue
            else:
                if request.execute_request and request.execute_request.task and request.execute_request.task.version:
                    version = request.execute_request.task.version
                    task_id = version.task_id
                    task_status_version = version.status_version
                    task_description = request.execute_request.task.description
                    print(f"Starting task {task_id}, version {task_status_version}: {task_description}")

                elif request.complete_request:
                    print(f"Completing task: {request.complete_request.task_id}")

                elif request.cancel_request:
                    print(f"Cancelling task: {request.cancel_request.task_id}")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    raise SystemExit(asyncio.run(listen(entity_id="<AGENT_ID>")))
```

```ts title={"Typescript (REST)"} startLine={23} maxLines={35}
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
                const taskDescription = request.executeRequest?.task?.description;

                console.log(`Starting task ${taskId}: ${taskDescription}`);
            } else if (request.completeRequest) {
                console.log(`Completing task: ${request.completeRequest.taskId}`);
            } else if (request.cancelRequest) {
                console.log(`Cancelling task: ${request.cancelRequest.taskId}`);
            }
        }
    } catch (error) {
        console.log(`Encountered the following error: ${error}`);
    }
}

// Replace agentId with the ID of entity listening for a task.
const entityId = '<AGENT_ID>';
App(entityId);
```

```go title={"Go (gRPC)"} startLine={67} maxLines={35}
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

	// Set up authentication
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

	// Entity ID to listen for tasks
	entityId := "<ENTITY_ID>"
	fmt.Printf("Listening for tasks for entity %s...\n", entityId)

	// Create context for the request
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
		os.Exit(1)
	}

	response, err := stream.Recv()
	if err != nil {
		fmt.Printf("Error receiving from stream: %v\n", err)
		os.Exit(1)
	}

	// Process the response based on the type of task request
	switch x := response.Request.(type) {
	case *taskmanagerv1.ListenAsAgentResponse_ExecuteRequest:
		if x.ExecuteRequest != nil && x.ExecuteRequest.Task != nil {
			fmt.Printf("Starting task: %s\n", x.ExecuteRequest.Task.Description)
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

```

```py title={"Python (gRPC)"} startLine={42} maxLines={25}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import grpc
from auth import ClientCredentialsAuth

from anduril.taskmanager.v1.task_manager_api.pub_pb2 import (
    EntityIds,
    ListenAsAgentRequest,
)
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

    request = ListenAsAgentRequest(entity_ids=EntityIds(entity_ids=[entity_id]))

    try:
        stream = client.ListenAsAgent(request)
        response = next(iter(stream))
    except Exception as error:
        print(f"Error receiving from stream: {error}", file=sys.stderr)
        sys.exit(1)

    # Process the response based on the type of task request
    if response.HasField("execute_request"):
        task = response.execute_request.task
        if task and task.description:
            print(f"Starting task: {task.description}")
    elif response.HasField("complete_request"):
        if response.complete_request.task_id:
            print(f"Completing task: {response.complete_request.task_id}")
    elif response.HasField("cancel_request"):
        if response.cancel_request.task_id:
            print(f"Cancelling task: {response.cancel_request.task_id}")


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={61} maxLines={35}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::taskmanager::v1::{
    listen_as_agent_request, listen_as_agent_response, EntityIds, ListenAsAgentRequest,
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

    // Entity ID to listen for tasks
    let entity_id = "<ENTITY_ID>".to_string();
    println!("Listening for tasks for entity {}...", entity_id);

    // Call the ListenAsAgent method to get a stream of task requests
    let request = Request::new(ListenAsAgentRequest {
        agent_selector: Some(listen_as_agent_request::AgentSelector::EntityIds(EntityIds {
            entity_ids: vec![entity_id],
        })),
        ..Default::default()
    });
    let mut stream = client.listen_as_agent(request).await?.into_inner();

    if let Some(response) = stream.message().await? {
        // Process the response based on the type of task request
        match response.request {
            Some(listen_as_agent_response::Request::ExecuteRequest(execute)) => {
                if let Some(task) = execute.task {
                    println!("Starting task: {}", task.description);
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

    Ok(())
}

```

If successful, you see the following output:

```bash
Listening for tasks for entity with ID <entity-id>...
```

To assign a task, do the following:

1. Open your environment's Lattice UI, and select the entity you published
   in the Entity Explorer.
2. From the entity's detail page, click **Assign Task**:
   <img src="/_files/anduril.docs.buildwithfern.com/e4304bc543cec0b7c859c63328414b293bdd7403ad7eb26f3d07066afaa15951/assets/images/screenshots/developer-console-entity-detail-page.png" alt="Shows an entity's detail page with the Assign Task button in the Lattice Developer Console." />
3. Select a task from the **Available Tasks** list, fill in the
   fields under **Task Configuration**, then click
   **Submit Task**. The form is generated from the task's schema,
   and submitting it sends a real `CreateTask` request:
   <img src="/_files/anduril.docs.buildwithfern.com/5dda5b8a8cc65404a04cc17f7d4cf3993383e7991e0411dd93db50e4b43d91bf/assets/images/screenshots/developer-console-assign-task-form.png" alt="Shows the task configuration form in the Lattice Developer Console." />

If successful, you see the following output back in your local development console:

```bash
Received the following task: "Maintain sensor awareness on specified group or object."
```

## Endpoints for operators

The operator should use the following endpoints from Lattice UI or a third-party
UI:

* [`CreateTask`](/reference/rest/tasks/create-task): Creates a
  new task. Lattice calls the `CreateTask` endpoint after a task's details have
  been populated in the UI, and an operator presses "Execute Task" for the first
  time.
* [`GetTask`](/reference/rest/tasks/get-task): Fetches the state
  of an existing task.
* [`QueryTasks`](/reference/rest/tasks/query-tasks): Finds
  tasks that match the specified criteria.

## What's next

* To learn more about tasks, see [Task an asset](/guides/tasks/overview).
* See tasks in action with [the auto-reconnaissance](/samples/overview#task-an-asset)
  sample app.