> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Publish entities

This page explains how to create and update assets, tracks, and geo-entities - the most common `Entity` templates in Lattice.

In the following steps, you publish various entities and learn how the entity model
lets you represent a variety of real-world objects and geographic areas.

## Before you begin

* To publish entities, [set up the Lattice SDK](/guides/getting-started/set-up) and set up a Lattice environment.
* The following examples use `uuid` to generate unique entity IDs. To use the TypeScript examples,
  install [`@types/uuid`](https://www.npmjs.com/package/@types/uuid):
  ```bash title="TypeScript"
  npm install @types/uuid
  ```
* Learn about required components and various [entity shapes](/guides/entities/overview) in Lattice.

If you are using gRPC with client credentials, [set up the token refresh module](/guides/getting-started/authenticate#using-grpc) before running the examples on this page.

## Publish an asset

An *asset* is an entity under your control, or under the control of another operator or system.
Assets may accept tasks such as search or tracking. To publish an asset, do the following:

Define the entity model's required components. Together with the asset-specific fields,
you get the following entity object:

```json maxLines=15 title="entity.json"
{
  "entityId": "$ENTITY_ID",
  "description": "Friendly drone asset",
  "isLive": true,
  "createdTime": "2025-01-01T00:00:00.000Z",
  "expiryTime": "2025-01-01T01:00:00.000Z",
  "location": {
    "position": {
      "latitudeDegrees": 51.013685596367665,
      "longitudeDegrees": 0.8002299716355741,
      "altitudeAsfMeters": 1000
    }
  },
  "aliases": {
    "name": "Drone 1"
  },
  "milView": {
    "disposition": "DISPOSITION_FRIENDLY",
    "environment": "ENVIRONMENT_AIR"
  },
  "ontology": {
    "platformType": "UAV",
    "template": "TEMPLATE_ASSET"
  },
  "provenance": {
    "integrationName": "your_integration_name",
    "dataType": "your_data_type",
    "sourceUpdateTime": "2025-05-19T20:02:16.753Z"
  },
  "taskCatalog": {
    "taskDefinitions": [
      {
        "taskSpecificationUrl": "type.googleapis.com/anduril.tasks.v2.VisualId",
      },
      {
        "taskSpecificationUrl": "type.googleapis.com/anduril.tasks.v2.Investigate"
      }
    ]
  },
  "health": {
    "connectionStatus": "CONNECTION_STATUS_ONLINE",
    "healthStatus": "HEALTH_STATUS_HEALTHY",
    "updateTime": "2025-01-01T00:00:00.000Z",
  }
}
```

Take a closer look at the following components  in `entity.json` and familiarize yourself
with common patterns used to model an asset in Lattice. In this example:

* Set [`template`](/reference/rest/entities/publish-entity#request.body.ontology.template) to `TEMPLATE_ASSET`.
* Set [`platform_type`](/reference/rest/entities/publish-entity#request.body.ontology.platformType) to `UAV`rendering a drone icon in the Lattice UI.
* Use [`taskCatalog`](/reference/rest/entities/publish-entity#request.body.taskCatalog)
  to publicize the assets tasks. The asset can listen for, and act upon, any
  task assigned to it, matching its specified [`taskDefinition`](/reference/rest/entities/publish-entity#request.body.taskCatalog.taskDefinitions).
* Use [`health`](/reference/rest/entities/publish-entity#request.body.health) to define the health status of the asset.
  When an asset sends updates to Lattice, Lattice automatically sets `health.connection_status`
  to `CONNECTION_STATUS_ONLINE`. If there are no updates after one minute, the field value changes to `CONNECTION_STATUS_OFFLINE`.

```json title="ontology"
"ontology": {
    // Set the required template.
    "template": "TEMPLATE_ASSET",
    // Optionally, set platform_type to UAV.
    "platform_type": "UAV"
}
```

```json title="milView"
"milView": {
    // Set the disposition to friendly.
    // Assets are generally under the control of friendly forces.
    "disposition": "DISPOSITION_FRIENDLY",
    // Set the environment field to specify the terrain in which
    // your asset is operating
    "environment": "ENVIRONMENT_AIR"
}
```

```json title="location"
"location": {
    // Set the position of the asset.
    "position": {
        // Set the asset's latitude, expressed in degrees.
        "latitudeDegrees": 50.91402185768586,
        // Set the asset's longitude, expressed in degrees.
        "longitudeDegrees": 0.79203612077257,
        // Set the asset's Above Ground Level (AGL) altitude, expressed in meters.
        "altitudeAglMeters": 1000
    }
}
```

```json title="taskCatalog"
"taskCatalog": {
    // Define the tasks the asset can perform.
    "taskDefinitions": [
        {
            // Set the task specification URL.
            "taskSpecificationUrl": "type.googleapis.com/anduril.tasks.v2.VisualId",
        },
        {
            // Set the task specification URL.
            "taskSpecificationUrl": "type.googleapis.com/anduril.tasks.v2.Investigate",
        }
    ],
}
```

```json title="health"
"health": {
  // Set the connection status to `CONNECTION_STATUS_ONLINE`.
  "connectionStatus": "CONNECTION_STATUS_ONLINE",
  // Set the health status to `HEALTH_STATUS_HEALTHY`.
  "healthStatus": "HEALTH_STATUS_HEALTHY"
}
```

Use the [`PublishEntity`](/reference/rest/entities/publish-entity) API method to publish the entity:

```go title={"Go (REST)"} startLine={61} maxLines={20}
package main

import (
	"context"
	"fmt"
	"math"
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

	// Set a radius, in degrees, to simulate the entity moving in a circle
	radiusDegrees := 0.1
	count := 0.0
	creationTime := time.Now().UTC()

	// Continuously publish the entity
	for {
		latestTimestamp := time.Now().UTC()
		ctx := context.Background()

		// Update position
		count += 0.1
		t := math.Pi * count / 180.0

		// Create entity to publish
		entity := Lattice.Entity{
			EntityID:    &entityId,
			Description: Lattice.String("Friendly drone asset"),
			Aliases: &Lattice.Aliases{
				Name: Lattice.String("Drone 1"),
			},
			IsLive:      Lattice.Bool(true),
			CreatedTime: Lattice.Time(creationTime),
			ExpiryTime:  Lattice.Time(latestTimestamp.Add(1 * time.Hour)),
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
					LatitudeDegrees:   Lattice.Float64(50.91402185768586 + (radiusDegrees * math.Cos(t))),
					LongitudeDegrees:  Lattice.Float64(0.79203612077257 + (radiusDegrees * math.Sin(t))),
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
				// Live list of active alerts for the asset. Remove entries
				// when the underlying condition clears; Lattice does not
				// filter stale entries automatically.
				ActiveAlerts: []*Lattice.Alert{},
				UpdateTime:   Lattice.Time(latestTimestamp),
			},
			// Declare the sensors carried by the asset. Each entry requires a
			// stable sensor_id, a sensor_type, and at least one field of view
			// so Lattice can render the sensor cone.
			Sensors: &Lattice.Sensors{
				Sensors: []*Lattice.Sensor{
					{
						SensorID:         Lattice.String("camera-1"),
						SensorType:       Lattice.SensorSensorTypeSensorTypeCamera.Ptr(),
						OperationalState: Lattice.SensorOperationalStateOperationalStateOperational.Ptr(),
						FieldsOfView: []*Lattice.FieldOfView{
							{
								CenterRayPose: &Lattice.EntityManagerPose{
									Orientation: &Lattice.Quaternion{
										X: Lattice.Float64(0.0),
										Y: Lattice.Float64(0.0),
										Z: Lattice.Float64(0.0),
										W: Lattice.Float64(1.0),
									},
								},
								HorizontalFov: Lattice.Float64(1.047),
								VerticalFov:   Lattice.Float64(0.785),
								Range:         Lattice.Float64(2000.0),
								Mode:          Lattice.FieldOfViewModeSensorModeSearch.Ptr(),
							},
						},
					},
				},
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
			fmt.Println("Publishing asset")
		}

		// Wait before next request
		time.Sleep(1 * time.Second)
	}
}

```

```java title={"Java (REST)"} startLine={78} maxLines={20}
package org.example;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import com.anduril.Lattice;
import com.anduril.types.Alert;
import com.anduril.types.Aliases;
import com.anduril.types.Entity;
import com.anduril.types.EntityManagerPose;
import com.anduril.types.FieldOfView;
import com.anduril.types.FieldOfViewMode;
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
import com.anduril.types.Quaternion;
import com.anduril.types.Sensor;
import com.anduril.types.SensorOperationalState;
import com.anduril.types.SensorSensorType;
import com.anduril.types.Sensors;
import com.anduril.types.TaskCatalog;
import com.anduril.types.TaskDefinition;



public class PublishAssetDrone {
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
                        .expiryTime(OffsetDateTime.ofInstant(latestTimestamp.plus(1, ChronoUnit.HOURS), ZoneOffset.UTC))
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
                            // Live list of active alerts for the asset. Remove
                            // entries when the underlying condition clears;
                            // Lattice does not filter stale entries
                            // automatically.
                            .activeAlerts(Collections.<Alert>emptyList())
                            .updateTime(OffsetDateTime.ofInstant(latestTimestamp, ZoneOffset.UTC))
                            .build())
                        // Declare the sensors carried by the asset. Each
                        // entry requires a stable sensor_id, a sensor_type,
                        // and at least one field of view so Lattice can
                        // render the sensor cone.
                        .sensors(Sensors.builder()
                            .sensors(List.of(
                                Sensor.builder()
                                    .sensorId("camera-1")
                                    .sensorType(SensorSensorType.SENSOR_TYPE_CAMERA)
                                    .operationalState(SensorOperationalState.OPERATIONAL_STATE_OPERATIONAL)
                                    .fieldsOfView(List.of(
                                        FieldOfView.builder()
                                            .centerRayPose(EntityManagerPose.builder()
                                                .orientation(Quaternion.builder()
                                                    .x(0.0)
                                                    .y(0.0)
                                                    .z(0.0)
                                                    .w(1.0)
                                                    .build())
                                                .build())
                                            .horizontalFov(1.047f)
                                            .verticalFov(0.785f)
                                            .range(2000.0f)
                                            .mode(FieldOfViewMode.SENSOR_MODE_SEARCH)
                                            .build()
                                    ))
                                    .build()
                            ))
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

```py title={"Python (REST)"} startLine={39} maxLines={20}
from anduril import Lattice, Aliases, MilView, Location, Position,\
      Ontology, Provenance, Health, TaskCatalog, TaskDefinition,\
      Sensors, Sensor, FieldOfView, EntityManagerPose, Quaternion
from datetime import datetime, timezone, timedelta
import asyncio
import math
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
        count = 0
        radius_degrees = .1
        creation_time = datetime.now(timezone.utc)
        while(True):
            latest_timestamp = datetime.now(timezone.utc)
            count += .1
            t = math.radians(count)

            client.entities.publish_entity(
                entity_id= id,
                description="Friendly drone asset",
                aliases=Aliases(
                    name="Drone 1"
                ),
                is_live=True,
                created_time=creation_time,
                expiry_time=latest_timestamp + timedelta(hours=1),
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
                        latitude_degrees=50.91402185768586 + (radius_degrees * math.cos(t)),
                        longitude_degrees=0.79203612077257 + (radius_degrees * math.sin(t)),
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
                    # Live list of active alerts for the asset. Remove
                    # entries when the underlying condition clears; Lattice
                    # does not filter stale entries automatically.
                    active_alerts=[],
                    update_time=latest_timestamp
                ),
                # Declare the sensors carried by the asset. Each entry
                # requires a stable sensor_id, a sensor_type, and at least
                # one field of view so Lattice can render the sensor cone.
                sensors=Sensors(
                    sensors=[
                        Sensor(
                            sensor_id="camera-1",
                            sensor_type="SENSOR_TYPE_CAMERA",
                            operational_state="OPERATIONAL_STATE_OPERATIONAL",
                            fields_of_view=[
                                FieldOfView(
                                    center_ray_pose=EntityManagerPose(
                                        orientation=Quaternion(x=0.0, y=0.0, z=0.0, w=1.0),
                                    ),
                                    horizontal_fov=1.047,
                                    vertical_fov=0.785,
                                    range=2000.0,
                                    mode="SENSOR_MODE_SEARCH",
                                ),
                            ],
                        ),
                    ],
                ),
                task_catalog=TaskCatalog(
                    task_definitions=[
                        TaskDefinition( task_specification_url="type.googleapis.com/anduril.tasks.v2.VisualId" ),
                        TaskDefinition( task_specification_url="type.googleapis.com/anduril.tasks.v2.Investigate" )
                    ]
                )
            )
            await asyncio.sleep(1)

    except asyncio.CancelledError:
        print(">>> Exiting...")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    asyncio.run(app())
```

```ts title={"Typescript (REST)"} startLine={41} maxLines={20}
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
        headers: {  "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}`  }
    }
);

const entityId = uuidv4()
const expiryOffsetHours = 1;

// Set a radius, in degrees, to simulate the entity moving in a circle.
const radiusDegrees = .1
let count = 0
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

async function App() {
    try {
        const latestTimestamp = new Date();
        count += .1
        const t = toRadians(count)

        await client.entities.publishEntity(
            {
                entityId: entityId,
                description: "Friendly drone asset",
                aliases: { name: "Drone 1" },
                isLive: true,
                createdTime: latestTimestamp.toISOString(),
                expiryTime: new Date(latestTimestamp.getTime() + expiryOffsetHours * 3600000).toISOString(),
                ontology: {
                    template: "TEMPLATE_ASSET",
                    platformType: "UAV"
                },
                milView: {
                    disposition: "DISPOSITION_FRIENDLY",
                    environment: "ENVIRONMENT_AIR",
                },
                location: {
                    position: {
                        latitudeDegrees: 50.91402185768586 + (radiusDegrees * Math.cos(t)),
                        longitudeDegrees: 0.79203612077257 + (radiusDegrees * Math.sin(t)),
                        altitudeAsfMeters: 1000,
                    }
                },
                provenance: {
                    integrationName: "your_integration_name",
                    dataType: "your_data_type",
                    sourceUpdateTime: latestTimestamp.toISOString()
                },
                health: {
                    connectionStatus: "CONNECTION_STATUS_ONLINE",
                    healthStatus: "HEALTH_STATUS_HEALTHY",
                    // Live list of active alerts for the asset. Remove
                    // entries when the underlying condition clears; Lattice
                    // does not filter stale entries automatically.
                    activeAlerts: [],
                    updateTime: latestTimestamp.toISOString()
                },
                // Declare the sensors carried by the asset. Each entry
                // requires a stable sensor_id, a sensor_type, and at least
                // one field of view so Lattice can render the sensor cone.
                sensors: {
                    sensors: [
                        {
                            sensorId: "camera-1",
                            sensorType: "SENSOR_TYPE_CAMERA",
                            operationalState: "OPERATIONAL_STATE_OPERATIONAL",
                            fieldsOfView: [
                                {
                                    centerRayPose: {
                                        orientation: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 }
                                    },
                                    horizontalFov: 1.047,
                                    verticalFov: 0.785,
                                    range: 2000.0,
                                    mode: "SENSOR_MODE_SEARCH"
                                }
                            ]
                        }
                    ]
                },
                taskCatalog: {
                    taskDefinitions: [
                        { taskSpecificationUrl: "type.googleapis.com/anduril.tasks.v2.VisualId" },
                        { taskSpecificationUrl: "type.googleapis.com/anduril.tasks.v2.Investigate" }
                    ]
                }
            }
        );
        console.log(`Publishing asset.`);
    } catch (error) {
        console.log(`Encountered the following error while publishing entity: ${error}`);
    }
}
(async function runIndefinitely() {
    while (true) {
        await App();
        // Wait for 1 second before the next iteration
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
})();
```

```go title={"Go (gRPC)"} startLine={81} maxLines={20}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"log"
	"math"
	"os"
	"time"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/entitymanager/v1/entitymanagerv1grpc"
	entitymanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/entitymanager/v1"
	ontologyv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/ontology/v1"
	tasksv2 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/tasks/v2"
	_type "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/type"
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

	// Create gRPC connection (using NewClient instead of Dial which is deprecated)
	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	// Create EntityManager client
	client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)

	// Generate a unique ID for the entity
	entityId := uuid.New().String()

	// Set a radius, in degrees, to simulate the entity moving in a circle
	radiusDegrees := 0.1
	count := 0.0
	creationTime := time.Now().UTC()
	creationTimestamp := timestamppb.New(creationTime)

	// Continuously publish the entity
	for {
		// Get current timestamp for this update
		latestTimestamp := time.Now().UTC()
		ctx := context.Background()

		// Update position
		count += 0.1
		t := math.Pi * count / 180.0

		// Create entity to publish
		entity := &entitymanagerv1.Entity{
			EntityId:    entityId,
			Description: "Friendly drone asset",
			Aliases: &entitymanagerv1.Aliases{
				Name: "Drone 1",
			},
			IsLive:      true,
			CreatedTime: creationTimestamp,
			ExpiryTime:  timestamppb.New(latestTimestamp.Add(1 * time.Hour)),
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
					LatitudeDegrees:   50.91402185768586 + (radiusDegrees * math.Cos(t)),
					LongitudeDegrees:  0.79203612077257 + (radiusDegrees * math.Sin(t)),
					AltitudeAsfMeters: wrapperspb.Double(1000),
				},
			},
			Provenance: &entitymanagerv1.Provenance{
				IntegrationName:  "your_integration_name",
				DataType:         "your_data_type",
				SourceUpdateTime: timestamppb.New(latestTimestamp),
			},
			Health: &entitymanagerv1.Health{
				ConnectionStatus: entitymanagerv1.ConnectionStatus_CONNECTION_STATUS_ONLINE,
				HealthStatus:     entitymanagerv1.HealthStatus_HEALTH_STATUS_HEALTHY,
				// Live list of active alerts for the asset. Remove entries
				// when the underlying condition clears; Lattice does not
				// filter stale entries automatically.
				ActiveAlerts: []*entitymanagerv1.Alert{},
				UpdateTime:   timestamppb.New(latestTimestamp),
			},
			// Declare the sensors carried by the asset. Each entry requires a
			// stable sensor_id, a sensor_type, and at least one field of view
			// so Lattice can render the sensor cone.
			Sensors: &entitymanagerv1.Sensors{
				Sensors: []*entitymanagerv1.Sensor{
					{
						SensorId:         "camera-1",
						SensorType:       entitymanagerv1.SensorType_SENSOR_TYPE_CAMERA,
						OperationalState: entitymanagerv1.OperationalState_OPERATIONAL_STATE_OPERATIONAL,
						FieldsOfView: []*entitymanagerv1.FieldOfView{
							{
								CenterRayPose: &entitymanagerv1.Pose{
									Orientation: &_type.Quaternion{
										X: 0.0,
										Y: 0.0,
										Z: 0.0,
										W: 1.0,
									},
								},
								HorizontalFov: 1.047,
								VerticalFov:   0.785,
								Range:         wrapperspb.Float(2000.0),
								Mode:          entitymanagerv1.SensorMode_SENSOR_MODE_SEARCH,
							},
						},
					},
				},
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
			fmt.Printf("Publishing asset with entity ID: %s\n", entityId)
		}

		time.Sleep(5 * time.Second)
	}
}

```

```py title={"Python (gRPC)"} startLine={85} maxLines={20}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import math
import os
import sys
import time
import uuid
from datetime import datetime, timedelta, timezone
import grpc
from auth import ClientCredentialsAuth
from google.protobuf.timestamp_pb2 import Timestamp
from google.protobuf.wrappers_pb2 import DoubleValue, FloatValue

from anduril.entitymanager.v1.entity.pub_pb2 import Aliases, Entity, Provenance
from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import PublishEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub
from anduril.entitymanager.v1.health_status.pub_pb2 import (
    ConnectionStatus,
    Health,
    HealthStatus,
)
from anduril.entitymanager.v1.location.pub_pb2 import Location, Pose, Position
from anduril.entitymanager.v1.ontology.pub_pb2 import MilView, Ontology
from anduril.entitymanager.v1.sensors.pub_pb2 import (
    FieldOfView,
    OperationalState,
    Sensor,
    SensorMode,
    Sensors,
    SensorType,
)
from anduril.entitymanager.v1.types.pub_pb2 import Template
from anduril.ontology.v1.type.pub_pb2 import Disposition, Environment
from anduril.tasks.v2.catalog.pub_pb2 import TaskCatalog, TaskDefinition
from anduril.type.coords.pub_pb2 import Quaternion


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

    # Set a radius, in degrees, to simulate the entity moving in a circle
    radius_degrees = 0.1
    count = 0.0
    creation_timestamp = to_timestamp(datetime.now(timezone.utc))

    while True:
        latest = datetime.now(timezone.utc)
        latest_ts = to_timestamp(latest)
        expiry_ts = to_timestamp(latest + timedelta(hours=1))

        count += 0.1
        t = math.pi * count / 180.0

        entity = Entity(
            entity_id=entity_id,
            description="Friendly drone asset",
            aliases=Aliases(name="Drone 1"),
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
                    latitude_degrees=50.91402185768586 + (radius_degrees * math.cos(t)),
                    longitude_degrees=0.79203612077257 + (radius_degrees * math.sin(t)),
                    altitude_asf_meters=DoubleValue(value=1000),
                ),
            ),
            provenance=Provenance(
                integration_name="your_integration_name",
                data_type="your_data_type",
                source_update_time=latest_ts,
            ),
            health=Health(
                connection_status=ConnectionStatus.CONNECTION_STATUS_ONLINE,
                health_status=HealthStatus.HEALTH_STATUS_HEALTHY,
                # Live list of active alerts for the asset. Remove entries
                # when the underlying condition clears; Lattice does not
                # filter stale entries automatically.
                active_alerts=[],
                update_time=latest_ts,
            ),
            # Declare the sensors carried by the asset. Each entry requires a
            # stable sensor_id, a sensor_type, and at least one field of view
            # so Lattice can render the sensor cone.
            sensors=Sensors(
                sensors=[
                    Sensor(
                        sensor_id="camera-1",
                        sensor_type=SensorType.SENSOR_TYPE_CAMERA,
                        operational_state=OperationalState.OPERATIONAL_STATE_OPERATIONAL,
                        fields_of_view=[
                            FieldOfView(
                                center_ray_pose=Pose(
                                    orientation=Quaternion(x=0.0, y=0.0, z=0.0, w=1.0),
                                ),
                                horizontal_fov=1.047,
                                vertical_fov=0.785,
                                range=FloatValue(value=2000.0),
                                mode=SensorMode.SENSOR_MODE_SEARCH,
                            ),
                        ],
                    ),
                ],
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
            print(f"Publishing asset with entity ID: {entity_id}")
        except Exception as error:
            print(f"Error publishing entity: {error}", file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={99} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::{
    Aliases, ConnectionStatus, Entity, FieldOfView, Health, HealthStatus, Location, MilView,
    Ontology, OperationalState, Pose, Position, Provenance, PublishEntityRequest, Sensor,
    SensorMode, SensorType, Sensors, Template,
};
use anduril_lattice_sdk_community_neoeinstein_prost::anduril::ontology::v1::{
    Disposition, Environment,
};
use anduril_lattice_sdk_community_neoeinstein_prost::anduril::r#type::Quaternion;
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
use std::f64::consts::PI;
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

    // Set a radius, in degrees, to simulate the entity moving in a circle
    let radius_degrees = 0.1;
    let mut count = 0.0_f64;
    let creation_timestamp = now_timestamp();

    // Continuously publish the entity
    loop {
        let latest_timestamp = now_timestamp();

        // Update position
        count += 0.1;
        let t = PI * count / 180.0;

        // Create entity to publish
        let entity = Entity {
            entity_id: entity_id.clone(),
            description: "Friendly drone asset".to_string(),
            aliases: Some(Aliases {
                name: "Drone 1".to_string(),
                ..Default::default()
            }),
            is_live: true,
            created_time: Some(creation_timestamp.clone()),
            expiry_time: Some(add_seconds(&latest_timestamp, 3600)),
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
                    latitude_degrees: 50.91402185768586 + radius_degrees * t.cos(),
                    longitude_degrees: 0.79203612077257 + radius_degrees * t.sin(),
                    altitude_asf_meters: Some(1000.0),
                    ..Default::default()
                }),
                ..Default::default()
            }),
            provenance: Some(Provenance {
                integration_name: "your_integration_name".to_string(),
                data_type: "your_data_type".to_string(),
                source_update_time: Some(latest_timestamp.clone()),
                ..Default::default()
            }),
            health: Some(Health {
                connection_status: ConnectionStatus::Online as i32,
                health_status: HealthStatus::Healthy as i32,
                // Live list of active alerts for the asset. Remove entries
                // when the underlying condition clears; Lattice does not
                // filter stale entries automatically.
                active_alerts: vec![],
                update_time: Some(latest_timestamp.clone()),
                ..Default::default()
            }),
            // Declare the sensors carried by the asset. Each entry requires
            // a stable sensor_id, a sensor_type, and at least one field of
            // view so Lattice can render the sensor cone.
            sensors: Some(Sensors {
                sensors: vec![Sensor {
                    sensor_id: "camera-1".to_string(),
                    sensor_type: SensorType::Camera as i32,
                    operational_state: OperationalState::Operational as i32,
                    fields_of_view: vec![FieldOfView {
                        center_ray_pose: Some(Pose {
                            orientation: Some(Quaternion {
                                x: 0.0,
                                y: 0.0,
                                z: 0.0,
                                w: 1.0,
                            }),
                            ..Default::default()
                        }),
                        horizontal_fov: 1.047,
                        vertical_fov: 0.785,
                        range: Some(2000.0),
                        mode: SensorMode::Search as i32,
                        ..Default::default()
                    }],
                    ..Default::default()
                }],
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

        let request = Request::new(PublishEntityRequest {
            entity: Some(entity),
        });
        match client.publish_entity(request).await {
            Ok(_) => println!("Publishing asset with entity ID: {}", entity_id),
            Err(e) => eprintln!("Error publishing entity: {}", e),
        }

        tokio::time::sleep(Duration::from_secs(5)).await;
    }
}

```

## Publish a track

A *track* represents any entity tracked by another asset or integration source.
Tracks are not directly under the control of friendly forces. This includes aircraft
tracks from radar or sensor hits, signal detections, and vehicles, people, or animals detected through cameras. You can specify the type of track you want to publish by
setting `ontology.template` field:

Define the entity model's required components. To create a generic track, such as an airplane:

* Set `template` to <code>TEMPLATE\_TRACK</code>.
* Set `platform_type` to <code>AIRPLANE</code>.

Together with the track-specific fields, you get the following entity object:

```json maxLines=15 title="entity.json"
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Airplane 1",
    "isLive": true,
    "createdTime": "2025-01-01T00:00:00.000000Z",
    "expiryTime": "2025-01-01T00:01:00.000000Z",
    "milView": {
        "disposition": "DISPOSITION_FRIENDLY",
        "environment": "ENVIRONMENT_AIR"
    },
    "ontology": {
        "template": "TEMPLATE_TRACK",
        "platform_type": "AIRPLANE"
    },
    "aliases": {
        "name": "DL-1234"
    },
    "location": {
        "position": {
            "latitudeDegrees": 50.91402185768586,
            "longitudeDegrees": 0.79203612077257,
            "altitudeHaeMeters": 2994,
            "altitudeAglMeters": 2972.8
        }
    },
    "provenance": {
        "integrationName": "your integration",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-01-01T00:00:00.000000Z"
    }
}
```

Take a closer look at the components in `entity.json` to
familiarize yourself with the track's properties.

```json title="milView"
"milView": {
    // Set the disposition to friendly to represent a
    // friendly airplane detection.
    "disposition": "DISPOSITION_FRIENDLY",
    // Set the environment field to specify the terrain in which
    // detection is made.
    "environment": "ENVIRONMENT_AIR"
}
```

```json title="location"
"location": {
    // Set the position of the track.
    "position": {
        // Set the track's latitude, expressed in degrees.
        "latitudeDegrees": 50.91402185768586,
        // Set the track's longitude, expressed in degrees.
        "longitudeDegrees": 0.79203612077257,
        // Set the track's Height Above Ellipsoid (HAE), expressed in meters.
        "altitudeHaeMeters": 2994,
        // Set the track's Above Ground Level (AGL) altitude, expressed in meters.
        "altitudeAglMeters": 2972.8
    }
}
```

Use the [`PublishEntity`](/reference/rest/entities/publish-entity) API method to publish the entity:

```go title={"Go (REST)"} startLine={61} maxLines={20}
package main

import (
	"context"
	"fmt"
	"math"
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

	// Set a radius, in degrees, to simulate the entity moving in a circle
	radiusDegrees := 0.1
	count := 0.0
	creationTime := time.Now().UTC()

	// Continuously publish the entity
	for {
		latestTimestamp := time.Now().UTC()
		ctx := context.Background()

		// Update position
		count += 0.1
		t := math.Pi * count / 180.0

		// Create entity to publish
		entity := Lattice.Entity{
			EntityID:    &entityId,
			Description: Lattice.String("Friendly airplane"),
			Aliases: &Lattice.Aliases{
				Name: Lattice.String("DL-1234"),
			},
			IsLive:      Lattice.Bool(true),
			CreatedTime: Lattice.Time(creationTime),
			ExpiryTime:  Lattice.Time(latestTimestamp.Add(5 * time.Minute)),
			Ontology: &Lattice.Ontology{
				Template:     Lattice.OntologyTemplateTemplateTrack.Ptr(),
				PlatformType: Lattice.String("AIRPLANE"),
			},
			MilView: &Lattice.MilView{
				Disposition: Lattice.MilViewDispositionDispositionFriendly.Ptr(),
				Environment: Lattice.MilViewEnvironmentEnvironmentAir.Ptr(),
			},
			Location: &Lattice.Location{
				Position: &Lattice.Position{
					LatitudeDegrees:   Lattice.Float64(50.91402185768586 + (radiusDegrees * math.Cos(t))),
					LongitudeDegrees:  Lattice.Float64(0.79203612077257 + (radiusDegrees * math.Sin(t))),
					AltitudeHaeMeters: Lattice.Float64(2994),
					AltitudeAglMeters: Lattice.Float64(2972.8),
				},
			},
			Provenance: &Lattice.Provenance{
				IntegrationName:  Lattice.String("your_integration_name"),
				DataType:         Lattice.String("your_data_type"),
				SourceUpdateTime: Lattice.Time(latestTimestamp),
			},
		}

		// Publish the entity
		_, err := LatticeClient.Entities.PublishEntity(ctx, &entity)

		// Handle errors
		if err != nil {
			fmt.Printf("Error publishing entity: %v\n", err)
		} else {
			fmt.Println("Publishing track")
		}

		// Wait before next request
		time.Sleep(1 * time.Second)
	}
}

```

```java title={"Java (REST)"} startLine={70} maxLines={20}
package org.example;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import com.anduril.Lattice;
import com.anduril.types.Aliases;
import com.anduril.types.Entity;
import com.anduril.types.Location;
import com.anduril.types.MilView;
import com.anduril.types.MilViewDisposition;
import com.anduril.types.MilViewEnvironment;
import com.anduril.types.Ontology;
import com.anduril.types.OntologyTemplate;
import com.anduril.types.Position;
import com.anduril.types.Provenance;



/**
 * Example application that publishes a simulated airplane track to Lattice using the SDK.
 */
public class PublishTrackAirplane {
    
    public static void main(String[] args) {
        // Get environment variables
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxToken = System.getenv("SANDBOXES_TOKEN");
        
        // Check required variables and ensure URL has https://
        if (endpoint == null || clientId == null || clientSecret == null || sandboxToken == null) {
            System.err.println("Missing required environment variables");
            System.exit(1);
        }
        if (!endpoint.startsWith("https://")) endpoint = "https://" + endpoint;
        
        try {
            // Create Lattice client with Sandbox authentication
            Lattice client = Lattice.builder()
                .url(endpoint)
                .credentials(clientId, clientSecret)
                .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxToken)
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
                    
                    // Prepare entity data
                    
                    // Create the entity (using the appropriate methods for the latest SDK version)
                    Entity entity = Entity.builder()
                        .entityId(entityId)
                        .description("Friendly airplane")
                        .aliases(Aliases.builder()
                            .name("Airplane 1")
                            .build())
                        .isLive(true)
                        .createdTime(OffsetDateTime.ofInstant(creationTime, ZoneOffset.UTC))
                        .expiryTime(OffsetDateTime.ofInstant(latestTimestamp.plus(5, ChronoUnit.MINUTES), ZoneOffset.UTC))
                        .ontology(Ontology.builder()
                            .template(OntologyTemplate.TEMPLATE_TRACK)
                            .platformType("Airplane")
                            .build())
                        .milView(MilView.builder()
                            .disposition(MilViewDisposition.DISPOSITION_FRIENDLY)
                            .environment(MilViewEnvironment.ENVIRONMENT_AIR)
                            .build())
                        .location(Location.builder()
                            .position(Position.builder()
                                .latitudeDegrees(50.91402185768586 + (radiusDegrees * Math.cos(t)))
                                .longitudeDegrees(0.79203612077257 + (radiusDegrees * Math.sin(t)))
                                .build())
                            .build())
                        .provenance(Provenance.builder()
                            .integrationName("your_integration_name")
                            .dataType("your_data_type")
                            .sourceUpdateTime(OffsetDateTime.ofInstant(latestTimestamp, ZoneOffset.UTC))
                            .build())
                        .build();
                    
                    // Publish the entity
                    client.entities().publishEntity(entity);
                    System.out.println("Published entity ID: " + entityId);
                    Thread.sleep(5000);
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

```py title={"Python (REST)"} startLine={38} maxLines={20}
from anduril import Lattice, \
    Aliases, MilView, Location, Position, Ontology, Provenance
from datetime import datetime, timezone, timedelta
import asyncio
import math
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
        count = 0
        radius_degrees = .1
        creation_time = datetime.now(timezone.utc)
        while(True):
            latest_timestamp = datetime.now(timezone.utc)
            count += .1
            t = math.radians(count)

            client.entities.publish_entity(
                entity_id= id,
                description="Friendly airplane",
                aliases=Aliases(
                    name="Airplane 1"
                ),
                is_live=True,
                created_time=creation_time,
                expiry_time=latest_timestamp + timedelta(minutes=5),
                ontology=Ontology(
                    template="TEMPLATE_TRACK",
                    platform_type="Airplane"
                ),
                mil_view=MilView(
                    disposition="DISPOSITION_FRIENDLY",
                    environment="ENVIRONMENT_AIR"
                ),
                location=Location(
                    position=Position(
                        latitude_degrees=50.91402185768586 + (radius_degrees * math.cos(t)),
                        longitude_degrees=0.79203612077257 + (radius_degrees * math.sin(t))
                    )
                ),
                provenance=Provenance(
                    integration_name="your_integration_name",
                    data_type="your_data_type",
                    source_update_time=latest_timestamp
                )
            )
            await asyncio.sleep(.1)

    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
         print(f"Exception: {error}")

if __name__ == "__main__":
    asyncio.run(app())
```

```ts title={"Typescript (REST)"} startLine={41} maxLines={20}
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
        // Remove the following if you are not developing Sandboxes.
        headers: {  "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}`  }
    }
);

const entityId = uuidv4()
const expiryOffsetMinutes = 2

// Set a radius, in degrees, to simulate the entity moving in a circle.
const radiusDegrees = .1
let count = 0
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

async function App() {
    try {
        const latestTimestamp = new Date();
        count += .1
        const t = toRadians(count)

        await client.entities.publishEntity(
            {
                entityId: entityId,
                description: "Friendly airplane",
                aliases: { name: "DL-1234" },
                isLive: true,
                createdTime: latestTimestamp.toISOString(),
                expiryTime: new Date(new Date().setMinutes(latestTimestamp.getMinutes() + expiryOffsetMinutes)).toISOString(),
                ontology: {
                    template: "TEMPLATE_TRACK",
                    platformType: "AIRPLANE"
                },
                milView: {
                    disposition: "DISPOSITION_FRIENDLY",
                    environment: "ENVIRONMENT_AIR"
                },
                location: {
                    position: {
                        latitudeDegrees: 50.91402185768586 + (radiusDegrees * Math.cos(t)),
                        longitudeDegrees: 0.79203612077257 + (radiusDegrees * Math.sin(t)),
                        altitudeHaeMeters: 2994,

                        altitudeAglMeters: 2972.8
                    }
                },
                provenance: {
                    integrationName: "your_integration_name",
                    dataType: "your_data_type",
                    sourceUpdateTime: latestTimestamp.toISOString()
                }
            }
        );
        console.log(`Publishing track.`);
    } catch (error) {
        console.log(`Encountered the following error while publishing entity: ${error}`);
    }
}
(async function runIndefinitely() {
    while (true) {
        await App();
        // Wait for 1 second before the next iteration
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
})();

```

```go title={"Go (gRPC)"} startLine={79} maxLines={20}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"log"
	"math"
	"os"
	"time"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/entitymanager/v1/entitymanagerv1grpc"
	entitymanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/entitymanager/v1"
	ontologyv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/ontology/v1"
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

	// Create EntityManager client
	client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)

	// Generate a unique ID for the entity
	entityId := uuid.New().String()

	// Set a radius, in degrees, to simulate the entity moving in a circle
	radiusDegrees := 0.1
	count := 0.0
	creationTime := time.Now().UTC()
	creationTimestamp := timestamppb.New(creationTime)

	// Continuously publish the entity
	for {
		// Get current timestamp for this update
		latestTimestamp := time.Now().UTC()
		ctx := context.Background()

		// Update position
		count += 0.1
		t := math.Pi * count / 180.0

		// Create entity to publish
		entity := &entitymanagerv1.Entity{
			EntityId:    entityId,
			Description: "Friendly airplane",
			Aliases: &entitymanagerv1.Aliases{
				Name: "DL-1234",
			},
			IsLive:      true,
			CreatedTime: creationTimestamp,
			ExpiryTime:  timestamppb.New(latestTimestamp.Add(1 * time.Minute)),
			Ontology: &entitymanagerv1.Ontology{
				Template:     entitymanagerv1.Template_TEMPLATE_TRACK,
				PlatformType: "AIRPLANE",
			},
			MilView: &entitymanagerv1.MilView{
				Disposition: ontologyv1.Disposition_DISPOSITION_FRIENDLY,
				Environment: ontologyv1.Environment_ENVIRONMENT_AIR,
			},
			Location: &entitymanagerv1.Location{
				Position: &entitymanagerv1.Position{
					LatitudeDegrees:   50.91402185768586 + (radiusDegrees * math.Cos(t)),
					LongitudeDegrees:  0.79203612077257 + (radiusDegrees * math.Sin(t)),
					AltitudeHaeMeters: wrapperspb.Double(2994),
					AltitudeAglMeters: wrapperspb.Double(2972.8),
				},
			},
			Provenance: &entitymanagerv1.Provenance{
				IntegrationName:  "your_integration_name",
				DataType:         "your_data_type",
				SourceUpdateTime: timestamppb.New(latestTimestamp),
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
			fmt.Printf("Publishing track with entity ID: %s\n", entityId)
		}

		time.Sleep(5 * time.Second)
	}
}

```

```py title={"Python (gRPC)"} startLine={70} maxLines={20}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import math
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
from anduril.entitymanager.v1.location.pub_pb2 import Location, Position
from anduril.entitymanager.v1.ontology.pub_pb2 import MilView, Ontology
from anduril.entitymanager.v1.types.pub_pb2 import Template
from anduril.ontology.v1.type.pub_pb2 import Disposition, Environment


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

    # Set a radius, in degrees, to simulate the entity moving in a circle
    radius_degrees = 0.1
    count = 0.0
    creation_timestamp = to_timestamp(datetime.now(timezone.utc))

    while True:
        latest = datetime.now(timezone.utc)
        latest_ts = to_timestamp(latest)
        expiry_ts = to_timestamp(latest + timedelta(minutes=1))

        count += 0.1
        t = math.pi * count / 180.0

        entity = Entity(
            entity_id=entity_id,
            description="Friendly airplane",
            aliases=Aliases(name="DL-1234"),
            is_live=True,
            created_time=creation_timestamp,
            expiry_time=expiry_ts,
            ontology=Ontology(template=Template.TEMPLATE_TRACK, platform_type="AIRPLANE"),
            mil_view=MilView(
                disposition=Disposition.DISPOSITION_FRIENDLY,
                environment=Environment.ENVIRONMENT_AIR,
            ),
            location=Location(
                position=Position(
                    latitude_degrees=50.91402185768586 + (radius_degrees * math.cos(t)),
                    longitude_degrees=0.79203612077257 + (radius_degrees * math.sin(t)),
                    altitude_hae_meters=DoubleValue(value=2994),
                    altitude_agl_meters=DoubleValue(value=2972.8),
                ),
            ),
            provenance=Provenance(
                integration_name="your_integration_name",
                data_type="your_data_type",
                source_update_time=latest_ts,
            ),
        )

        try:
            client.PublishEntity(PublishEntityRequest(entity=entity))
            print(f"Publishing track with entity ID: {entity_id}")
        except Exception as error:
            print(f"Error publishing entity: {error}", file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={96} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::{
    Aliases, Entity, Location, MilView, Ontology, Position, Provenance, PublishEntityRequest,
    Template,
};
use anduril_lattice_sdk_community_neoeinstein_prost::anduril::ontology::v1::{
    Disposition, Environment,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::entitymanager::v1::tonic::entity_manager_api_client::EntityManagerApiClient;
use auth::ClientCredentialsAuth;
use prost_types::Timestamp;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;
use uuid::Uuid;

use std::env;
use std::f64::consts::PI;
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

    // Set a radius, in degrees, to simulate the entity moving in a circle
    let radius_degrees = 0.1;
    let mut count = 0.0_f64;
    let creation_timestamp = now_timestamp();

    // Continuously publish the entity
    loop {
        let latest_timestamp = now_timestamp();

        // Update position
        count += 0.1;
        let t = PI * count / 180.0;

        // Create entity to publish
        let entity = Entity {
            entity_id: entity_id.clone(),
            description: "Friendly airplane".to_string(),
            aliases: Some(Aliases {
                name: "DL-1234".to_string(),
                ..Default::default()
            }),
            is_live: true,
            created_time: Some(creation_timestamp.clone()),
            expiry_time: Some(add_seconds(&latest_timestamp, 60)),
            ontology: Some(Ontology {
                template: Template::Track as i32,
                platform_type: "AIRPLANE".to_string(),
                ..Default::default()
            }),
            mil_view: Some(MilView {
                disposition: Disposition::Friendly as i32,
                environment: Environment::Air as i32,
                ..Default::default()
            }),
            location: Some(Location {
                position: Some(Position {
                    latitude_degrees: 50.91402185768586 + radius_degrees * t.cos(),
                    longitude_degrees: 0.79203612077257 + radius_degrees * t.sin(),
                    altitude_hae_meters: Some(2994.0),
                    altitude_agl_meters: Some(2972.8),
                    ..Default::default()
                }),
                ..Default::default()
            }),
            provenance: Some(Provenance {
                integration_name: "your_integration_name".to_string(),
                data_type: "your_data_type".to_string(),
                source_update_time: Some(latest_timestamp.clone()),
                ..Default::default()
            }),
            ..Default::default()
        };

        let request = Request::new(PublishEntityRequest {
            entity: Some(entity),
        });
        match client.publish_entity(request).await {
            Ok(_) => println!("Publishing track with entity ID: {}", entity_id),
            Err(e) => eprintln!("Error publishing entity: {}", e),
        }

        tokio::time::sleep(Duration::from_secs(5)).await;
    }
}

```

Define the entity model's required components. To create a sensor point of interest, such as a satellite,
with at least one known onboard sensor:

* Set `template` to <code>TEMPLATE\_SENSOR\_POINT\_OF\_INTEREST</code>.
* Set `platform_type` to <code>SATELLITE</code>.

Together with the track-specific fields, you get the following entity object:

```json maxLines=20 title="entity.json"
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Friendly satellite",
    "isLive": true,
    "createdTime": "2025-12-07T00:09:42.816877Z",
    "expiryTime": "2025-12-17T00:09:42.816878Z",
    "milView": {
        "disposition": "DISPOSITION_FRIENDLY",
        "environment": "ENVIRONMENT_SPACE"
    },
    "ontology": {
        "template": "TEMPLATE_TRACK",
        "platform_type": "SATELLITE"
    },
    "sensors": {
        "sensors": [
            {
                "operationalState": "OPERATIONAL_STATE_OPERATIONAL",
                "sensorType": "SENSOR_TYPE_RADAR"
            }
        ]
    },
    "aliases": {
        "name": "Landsat 9"
    },
    "location": {
        "position": {
            "latitudeDegrees": 50.95155,
            "longitudeDegrees": 0.90788,
            "altitudeAglMeters": 35786000
        }
    },
    "provenance": {
        "integrationName": "your_integration",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    }
}
```

Take a closer look at the signal-specific components in `entity_model.json`
to familiarize yourself with components used to model a signal detection, like a satellite:

```json title="MilView"
"milView": {
    // Set the disposition. In this example, the satellite detection
    // is classified as friendly.
    "disposition": "DISPOSITION_FRIENDLY",
    // Set the environment field to specify the terrain in which
    // the signal is observed.
    "environment": "ENVIRONMENT_SPACE"
}
```

```json title="Location"
"location": {
    // Set the position of the track.
    "position": {
        // Set the track's latitude, expressed in degrees.
        "latitudeDegrees": 50.95155,
        // Set the track's longitude, expressed in degrees.
        "longitudeDegrees": 0.90788,
        // Set the track's altitude Above Ground Level (AGL).
        "altitudeAglMeters": 35786000
    }
}
```

```json title="Sensors"
"sensors": {
    // Use sensors to define any specific details
    // about the detected satellite.
    "sensors": [
        {
            // Set the sensor's operational state.
            "operationalState": "OPERATIONAL_STATE_OPERATIONAL",
            // Set the sensor's type.
            "sensorType": "SENSOR_TYPE_RADAR"
        }
    ]
}
```

Use the [`PublishEntity`](/reference/rest/entities/publish-entity) API method to publish the entity:

```go title={"Go (REST)"} startLine={52} maxLines={20}
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
		entity := Lattice.Entity{
			EntityID:    &entityId,
			Description: Lattice.String("Friendly satellite"),
			Aliases: &Lattice.Aliases{
				Name: Lattice.String("Landsat 6"),
			},
			IsLive:      Lattice.Bool(true),
			CreatedTime: Lattice.Time(creationTime),
			ExpiryTime:  Lattice.Time(latestTimestamp.Add(1 * time.Minute)),
			Ontology: &Lattice.Ontology{
				Template:     Lattice.OntologyTemplateTemplateSensorPointOfInterest.Ptr(),
				PlatformType: Lattice.String("SATELLITE"),
			},
			MilView: &Lattice.MilView{
				Disposition: Lattice.MilViewDispositionDispositionNeutral.Ptr(),
				Environment: Lattice.MilViewEnvironmentEnvironmentSpace.Ptr(),
			},
			Location: &Lattice.Location{
				Position: &Lattice.Position{
					LatitudeDegrees:   Lattice.Float64(50.95155),
					LongitudeDegrees:  Lattice.Float64(0.90788),
					AltitudeAglMeters: Lattice.Float64(35786000),
				},
			},
			Sensors: &Lattice.Sensors{
				Sensors: []*Lattice.Sensor{
					{
						SensorType: Lattice.SensorSensorTypeSensorTypeRadar.Ptr(),
					},
				},
			},
			Provenance: &Lattice.Provenance{
				IntegrationName:  Lattice.String("your_integration_name"),
				DataType:         Lattice.String("your_data_type"),
				SourceUpdateTime: Lattice.Time(latestTimestamp),
			},
		}
		_, err := LatticeClient.Entities.PublishEntity(ctx, &entity)
		// Handle errors
		if err != nil {
			fmt.Printf("Error publishing entity: %v\n", err)
		} else {
			fmt.Println("Publishing track")
		}

		// Wait before next request
		time.Sleep(1 * time.Second)
	}
}

```

```java title={"Java (REST)"} startLine={68} maxLines={20}
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
import com.anduril.types.Location;
import com.anduril.types.MilView;
import com.anduril.types.MilViewDisposition;
import com.anduril.types.MilViewEnvironment;
import com.anduril.types.Ontology;
import com.anduril.types.OntologyTemplate;
import com.anduril.types.Position;
import com.anduril.types.Provenance;
import com.anduril.types.Sensor;
import com.anduril.types.SensorOperationalState;
import com.anduril.types.SensorSensorType;
import com.anduril.types.Sensors;



public class PublishTrackSatellite {
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
            
            // Get creation time
            Instant creationTime = Instant.now();
            
            // Continuously publish the entity
            while (true) {
                try {
                    // Get current timestamp
                    Instant latestTimestamp = Instant.now();
                    
                    // Create the entity
                    Sensor sensor = Sensor.builder()
                        .operationalState(SensorOperationalState.OPERATIONAL_STATE_OPERATIONAL)
                        .sensorType(SensorSensorType.SENSOR_TYPE_RADAR)
                        .build();
                    
                    Entity entity = Entity.builder()
                        .entityId(entityId)
                        .description("Friendly satellite")
                        .aliases(Aliases.builder()
                            .name("Landsat 9")
                            .build())
                        .isLive(true)
                        .createdTime(OffsetDateTime.ofInstant(creationTime, ZoneOffset.UTC))
                        .expiryTime(OffsetDateTime.ofInstant(latestTimestamp.plus(1, ChronoUnit.MINUTES), ZoneOffset.UTC))
                        .ontology(Ontology.builder()
                            .template(OntologyTemplate.TEMPLATE_TRACK)
                            .platformType("SATELLITE")
                            .build())
                        .milView(MilView.builder()
                            .disposition(MilViewDisposition.DISPOSITION_FRIENDLY)
                            .environment(MilViewEnvironment.ENVIRONMENT_SPACE)
                            .build())
                        .location(Location.builder()
                            .position(Position.builder()
                                .latitudeDegrees(50.95155)
                                .longitudeDegrees(0.90788)
                                .altitudeAglMeters(35786000.0)
                                .build())
                            .build())
                        .sensors(Sensors.builder()
                            .sensors(Arrays.asList(sensor))
                            .build())
                        .provenance(Provenance.builder()
                            .integrationName("your_integration_name")
                            .dataType("your_data_type")
                            .sourceUpdateTime(OffsetDateTime.ofInstant(latestTimestamp, ZoneOffset.UTC))
                            .build())
                        .build();
                    
                    // Publish the entity
                    client.entities().publishEntity(entity);
                    System.out.println("Published track.");
                    
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

```py title={"Python (REST)"} startLine={33} maxLines={20}
from anduril import Lattice, Aliases, MilView, \
    Location, Position, Ontology, Provenance, Sensor, Sensors
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
                description="Friendly satellite",
                aliases=Aliases(
                    name="Landsat 9"
                ),
                is_live=True,
                created_time=creation_time,
                expiry_time=latest_timestamp + timedelta(minutes=1),
                ontology=Ontology(
                    template="TEMPLATE_SENSOR_POINT_OF_INTEREST",
                    platform_type="SATELLITE"
                ),
                sensors=Sensors(
                    sensors=[
                        Sensor(
                            operational_state="OPERATIONAL_STATE_OPERATIONAL",
                            sensor_type="SENSOR_TYPE_RADAR"
                        )
                    ]
                ),
                mil_view=MilView(
                    disposition="DISPOSITION_FRIENDLY",
                    environment="ENVIRONMENT_SPACE"
                ),
                location=Location(
                    position=Position(
                        latitude_degrees=50.95155,
                        longitude_degrees=0.90788,
                        altitude_hae_meters=300000
                    )
                ),
                provenance=Provenance(
                    integration_name="your_integration_name",
                    data_type="your_data_type",
                    source_update_time=latest_timestamp
                )
            )
            await asyncio.sleep(.1)
    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    asyncio.run(app())
```

```ts title={"Typescript (REST)"} startLine={31} maxLines={20}
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
        headers: {  "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}`  }
    }
);

const entityId = uuidv4()
const expiryOffsetMinutes = 2;

async function App() {
    try {
        const latestTimestamp = new Date();
        await client.entities.publishEntity(
            {
                entityId: entityId,
                description: "Friendly satellite",
                aliases: { name: "Landsat 9" },
                isLive: true,
                createdTime: latestTimestamp.toISOString(),
                expiryTime: new Date(new Date().setMinutes(latestTimestamp.getMinutes() + expiryOffsetMinutes)).toISOString(),
                ontology: {
                    template: "TEMPLATE_TRACK",
                    platformType: "SATELLITE"
                },
                milView: {
                    disposition: "DISPOSITION_FRIENDLY",
                    environment: "ENVIRONMENT_SPACE"
                },
                location: {
                    position: {
                        latitudeDegrees: 50.95155,
                        longitudeDegrees: 0.90788,
                        altitudeAglMeters: 35786000
                    }
                },
                sensors: {
                    sensors: [
                        {
                            operationalState: "OPERATIONAL_STATE_OPERATIONAL",
                            sensorType: "SENSOR_TYPE_RADAR"
                        }
                    ]
                },
                provenance: {
                    integrationName: "your_integration_name",
                    dataType: "your_data_type",
                    sourceUpdateTime: latestTimestamp.toISOString()
                }
            }
        );
        console.log(`Publishing track.`);
    } catch (error) {
        console.log(`Encountered the following error while publishing entity: ${error}`);
    }
}
(async function runIndefinitely() {
    while (true) {
        await App();
        // Wait for 1 second before the next iteration
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
})();
```

```go title={"Go (gRPC)"} startLine={73} maxLines={20}
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

	// Create gRPC connection
	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	// Create EntityManager client
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
			Description: "Friendly satellite",
			Aliases: &entitymanagerv1.Aliases{
				Name: "Landsat 6",
			},
			IsLive:      true,
			CreatedTime: creationTimestamp,
			ExpiryTime:  timestamppb.New(latestTimestamp.Add(1 * time.Minute)),
			Ontology: &entitymanagerv1.Ontology{
				Template:     entitymanagerv1.Template_TEMPLATE_SENSOR_POINT_OF_INTEREST,
				PlatformType: "SATELLITE",
			},
			MilView: &entitymanagerv1.MilView{
				Disposition: ontologyv1.Disposition_DISPOSITION_NEUTRAL,
				Environment: ontologyv1.Environment_ENVIRONMENT_SPACE,
			},
			Location: &entitymanagerv1.Location{
				Position: &entitymanagerv1.Position{
					LatitudeDegrees:   50.95155,
					LongitudeDegrees:  0.90788,
					AltitudeAglMeters: wrapperspb.Double(35786000),
				},
			},
			Sensors: &entitymanagerv1.Sensors{
				Sensors: []*entitymanagerv1.Sensor{
					{
						SensorType: entitymanagerv1.SensorType_SENSOR_TYPE_RADAR,
					},
				},
			},
			Provenance: &entitymanagerv1.Provenance{
				IntegrationName:  "your_integration_name",
				DataType:         "your_data_type",
				SourceUpdateTime: timestamppb.New(latestTimestamp),
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
			fmt.Printf("Publishing satellite track with entity ID: %s\n", entityId)
		}

		time.Sleep(5 * time.Second)
	}
}

```

```py title={"Python (gRPC)"} startLine={63} maxLines={20}
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
from anduril.entitymanager.v1.location.pub_pb2 import Location, Position
from anduril.entitymanager.v1.ontology.pub_pb2 import MilView, Ontology
from anduril.entitymanager.v1.sensors.pub_pb2 import Sensor, Sensors, SensorType
from anduril.entitymanager.v1.types.pub_pb2 import Template
from anduril.ontology.v1.type.pub_pb2 import Disposition, Environment


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
            description="Friendly satellite",
            aliases=Aliases(name="Landsat 6"),
            is_live=True,
            created_time=creation_timestamp,
            expiry_time=expiry_ts,
            ontology=Ontology(
                template=Template.TEMPLATE_SENSOR_POINT_OF_INTEREST,
                platform_type="SATELLITE",
            ),
            mil_view=MilView(
                disposition=Disposition.DISPOSITION_NEUTRAL,
                environment=Environment.ENVIRONMENT_SPACE,
            ),
            location=Location(
                position=Position(
                    latitude_degrees=50.95155,
                    longitude_degrees=0.90788,
                    altitude_agl_meters=DoubleValue(value=35786000),
                ),
            ),
            sensors=Sensors(
                sensors=[Sensor(sensor_type=SensorType.SENSOR_TYPE_RADAR)],
            ),
            provenance=Provenance(
                integration_name="your_integration_name",
                data_type="your_data_type",
                source_update_time=latest_ts,
            ),
        )

        try:
            client.PublishEntity(PublishEntityRequest(entity=entity))
            print(f"Publishing satellite track with entity ID: {entity_id}")
        except Exception as error:
            print(f"Error publishing entity: {error}", file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={86} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::{
    Aliases, Entity, Location, MilView, Ontology, Position, Provenance, PublishEntityRequest,
    Sensor, SensorType, Sensors, Template,
};
use anduril_lattice_sdk_community_neoeinstein_prost::anduril::ontology::v1::{
    Disposition, Environment,
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

    let entity_id = Uuid::new_v4().to_string();
    let creation_timestamp = now_timestamp();

    // Continuously publish the entity
    loop {
        let latest_timestamp = now_timestamp();

        // Create entity to publish
        let entity = Entity {
            entity_id: entity_id.clone(),
            description: "Friendly satellite".to_string(),
            aliases: Some(Aliases {
                name: "Landsat 6".to_string(),
                ..Default::default()
            }),
            is_live: true,
            created_time: Some(creation_timestamp.clone()),
            expiry_time: Some(add_seconds(&latest_timestamp, 60)),
            ontology: Some(Ontology {
                template: Template::SensorPointOfInterest as i32,
                platform_type: "SATELLITE".to_string(),
                ..Default::default()
            }),
            mil_view: Some(MilView {
                disposition: Disposition::Neutral as i32,
                environment: Environment::Space as i32,
                ..Default::default()
            }),
            location: Some(Location {
                position: Some(Position {
                    latitude_degrees: 50.95155,
                    longitude_degrees: 0.90788,
                    altitude_agl_meters: Some(35_786_000.0),
                    ..Default::default()
                }),
                ..Default::default()
            }),
            sensors: Some(Sensors {
                sensors: vec![Sensor {
                    sensor_type: SensorType::Radar as i32,
                    ..Default::default()
                }],
            }),
            provenance: Some(Provenance {
                integration_name: "your_integration_name".to_string(),
                data_type: "your_data_type".to_string(),
                source_update_time: Some(latest_timestamp.clone()),
                ..Default::default()
            }),
            ..Default::default()
        };

        let request = Request::new(PublishEntityRequest {
            entity: Some(entity),
        });
        match client.publish_entity(request).await {
            Ok(_) => println!("Publishing satellite track with entity ID: {}", entity_id),
            Err(e) => eprintln!("Error publishing entity: {}", e),
        }

        tokio::time::sleep(Duration::from_secs(5)).await;
    }
}

```

Define the entity model's required components. To create a signal of interest, such as a ground radar detection:

* Set `template` to <code>TEMPLATE\_SIGNAL\_OF\_INTEREST</code>.
* Set `platform_type` to <code>RADAR</code>.

Together with the track-specific fields, you get the following entity object:

```json maxLines=20 title="entity_model.json"
{
  "entityId": "UNIQUE_ENTITY_ID",
  "description": "Radar",
  "isLive": true,
  "createdTime": "2025-04-21T20:42:42.741Z",
  "expiryTime": "2025-04-21T21:17:38.156Z",
  "ontology": {
      "template": "TEMPLATE_SIGNAL_OF_INTEREST",
      "platformType": "RADAR"
  },
  "milView": {
      "disposition": "DISPOSITION_FRIENDLY",
      "environment": "ENVIRONMENT_SURFACE"
  },
  "aliases": {
      "name": "ARSR-4/FPS-130"
  },
  "location": {
      "position": {
          "latitudeDegrees": 50.91401185768586,
          "longitudeDegrees": -0.79203612077257
      }
  },
  "signal": {
    "fixed": {}
  },
  "provenance": {
      "integrationName": "your_integration_name",
      "dataType": "adsb",
      "sourceUpdateTime": "2025-04-21T20:47:38.156Z"
  }
}
```

Take a closer look at the following components in `entity_model.json`
to familiarize yourself with common components used to model a signal detection,
such as a radar. In this example, the detected tack is stationary at a fixed location:

```json title="Ontology"
"ontology": {
    // Set the required template.
    "template": "TEMPLATE_SIGNAL_OF_INTEREST",
    // Optionally, set platform_type to RADAR.
    "platform_type": "RADAR"
}
```

```json title="MilView"
"milView": {
    // Set the disposition. In this example, the radar detection
    // is classified as friendly.
    "disposition": "DISPOSITION_FRIENDLY",
    // Set the environment field to specify that the radar is
    // detected on the ground.
    "environment": "ENVIRONMENT_SURFACE"
}
```

```json title="Signal"
"signal": {
    // Indicates that the signal is detected at a fixed location.
    // Requires setting the location component.
    "fixed": {}
}
```

```json title="Location"
"location": {
    // Set the position of the track.
    "position": {
        // Set the track's latitude, expressed in degrees.
        "latitudeDegrees": 50.91401185768586,
        // Set the track's longitude, expressed in degrees.
        "longitudeDegrees": -0.79203612077257
    }
}
```

Use the [`PublishEntity`](/reference/rest/entities/publish-entity) API method to publish the entity:

```go title={"Go (REST)"} startLine={54} maxLines={20}
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
			Description: Lattice.String("Friendly radar"),
			Aliases: &Lattice.Aliases{
				Name: Lattice.String("ARSR-4/FPS-130"),
			},
			IsLive:      Lattice.Bool(true),
			CreatedTime: Lattice.Time(creationTime),
			ExpiryTime:  Lattice.Time(latestTimestamp.Add(1 * time.Minute)),
			Ontology: &Lattice.Ontology{
				Template:     Lattice.OntologyTemplateTemplateSignalOfInterest.Ptr(),
				PlatformType: Lattice.String("RADAR"),
			},
			MilView: &Lattice.MilView{
				Disposition: Lattice.MilViewDispositionDispositionFriendly.Ptr(),
				Environment: Lattice.MilViewEnvironmentEnvironmentSurface.Ptr(),
			},
			Location: &Lattice.Location{
				Position: &Lattice.Position{
					LatitudeDegrees:  Lattice.Float64(50.95155),
					LongitudeDegrees: Lattice.Float64(0.90788),
				},
			},
			Signal: &Lattice.Signal{
				Fixed: &Lattice.Fixed{},
			},
			Provenance: &Lattice.Provenance{
				IntegrationName:  Lattice.String("your_integration_name"),
				DataType:         Lattice.String("your_data_type"),
				SourceUpdateTime: Lattice.Time(latestTimestamp),
			},
		}

		// Publish the entity
		_, err := LatticeClient.Entities.PublishEntity(ctx, &entity)

		// Handle errors
		if err != nil {
			fmt.Printf("Error publishing entity: %v\n", err)
		} else {
			fmt.Println("Publishing track")
		}

		// Wait before next request
		time.Sleep(1 * time.Second)
	}
}

```

```java title={"Java (REST)"} startLine={60} maxLines={20}
package org.example;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import com.anduril.Lattice;
import com.anduril.types.Aliases;
import com.anduril.types.Entity;
import com.anduril.types.Fixed;
import com.anduril.types.Location;
import com.anduril.types.MilView;
import com.anduril.types.MilViewDisposition;
import com.anduril.types.MilViewEnvironment;
import com.anduril.types.Ontology;
import com.anduril.types.OntologyTemplate;
import com.anduril.types.Position;
import com.anduril.types.Provenance;
import com.anduril.types.Signal;



public class PublishTrackRadar {
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
            
            // Get creation time
            Instant creationTime = Instant.now();
            
            // Continuously publish the entity
            while (true) {
                try {
                    // Get current timestamp
                    Instant latestTimestamp = Instant.now();
                    
                    // Create the entity
                    Entity entity = Entity.builder()
                        .entityId(entityId)
                        .description("Friendly radar")
                        .aliases(Aliases.builder()
                            .name("ARSR-4/FPS-130")
                            .build())
                        .isLive(true)
                        .createdTime(OffsetDateTime.ofInstant(creationTime, ZoneOffset.UTC))
                        .expiryTime(OffsetDateTime.ofInstant(latestTimestamp.plus(1, ChronoUnit.MINUTES), ZoneOffset.UTC))
                        .ontology(Ontology.builder()
                            .template(OntologyTemplate.TEMPLATE_SIGNAL_OF_INTEREST)
                            .platformType("RADAR")
                            .build())
                        .milView(MilView.builder()
                            .disposition(MilViewDisposition.DISPOSITION_FRIENDLY)
                            .environment(MilViewEnvironment.ENVIRONMENT_SURFACE)
                            .build())
                        .location(Location.builder()
                            .position(Position.builder()
                                .latitudeDegrees(50.95155)
                                .longitudeDegrees(0.90788)
                                .build())
                            .build())
                        .signal(Signal.builder()
                            .fixed(Fixed.builder().build())
                            .build())
                        .provenance(Provenance.builder()
                            .integrationName("your_integration_name")
                            .dataType("your_data_type")
                            .sourceUpdateTime(OffsetDateTime.ofInstant(latestTimestamp, ZoneOffset.UTC))
                            .build())
                        .build();
                    
                    // Publish the entity
                    client.entities().publishEntity(entity);
                    System.out.println("Published track ID: " + entityId);
                    
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

```py title={"Python (REST)"} startLine={33} maxLines={20}
from anduril import Lattice, Aliases, \
    MilView, Location, Position, Ontology, Provenance, Signal, Fixed
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
                description="Friendly radar",
                aliases=Aliases(
                    name="ARSR-4/FPS-130"
                ),
                is_live=True,
                created_time=creation_time,
                expiry_time=latest_timestamp + timedelta(minutes=1),
                ontology=Ontology(
                    template="TEMPLATE_SIGNAL_OF_INTEREST",
                    platform_type="RADAR"
                ),
                signal=Signal(
                    fixed=Fixed()
                ),
                mil_view=MilView(
                    disposition="DISPOSITION_FRIENDLY",
                    environment="ENVIRONMENT_SURFACE"
                ),
                location=Location(
                    position=Position(
                        latitude_degrees=50.95155,
                        longitude_degrees=0.90788
                    )
                ),
                provenance=Provenance(
                    integration_name="your_integration_name",
                    data_type="your_data_type",
                    source_update_time=latest_timestamp
                )
            )
            await asyncio.sleep(.1)
    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    asyncio.run(app())
```

```ts title={"Typescript (REST)"} startLine={31} maxLines={20}
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
        headers: {  "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}`  }
    }
);

const entityId = uuidv4()
const expiryOffsetMinutes = 2;

async function App() {
    try {
        const latestTimestamp = new Date();
        await client.entities.publishEntity(
            {
                entityId: entityId,
                description: "Friendly radar",
                aliases: { name: "ARSR-4/FPS-130" },
                isLive: true,
                createdTime: latestTimestamp.toISOString(),
                expiryTime: new Date(new Date().setMinutes(latestTimestamp.getMinutes() + expiryOffsetMinutes)).toISOString(),
                ontology: {
                    template: "TEMPLATE_SIGNAL_OF_INTEREST",
                    platformType: "RADAR"
                },
                milView: {
                    disposition: "DISPOSITION_FRIENDLY",
                    environment: "ENVIRONMENT_SURFACE"
                },
                location: {
                    position: {
                        latitudeDegrees: 50.91401185768586,
                        longitudeDegrees: -0.79203612077257
                    }
                },
                signal: {
                    fixed: {}
                },
                provenance: {
                    integrationName: "your_integration_name",
                    dataType: "your_data_type",
                    sourceUpdateTime: latestTimestamp.toISOString()
                }
            }
        );
        console.log(`Publishing track.`);
    } catch (error) {
        console.log(`Encountered the following error while publishing entity: ${error}`);
    }
}
(async function runIndefinitely() {
    while (true) {
        await App();
        // Wait for 1 second before the next iteration
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
})();
```

```go title={"Go (gRPC)"} startLine={72} maxLines={20}
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
	"github.com/google/uuid"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/protobuf/types/known/timestamppb"
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

	// Create gRPC connection
	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	// Create EntityManager client
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
			Description: "Friendly radar",
			Aliases: &entitymanagerv1.Aliases{
				Name: "ARSR-4/FPS-130",
			},
			IsLive:      true,
			CreatedTime: creationTimestamp,
			ExpiryTime:  timestamppb.New(latestTimestamp.Add(1 * time.Minute)),
			Ontology: &entitymanagerv1.Ontology{
				Template:     entitymanagerv1.Template_TEMPLATE_SIGNAL_OF_INTEREST,
				PlatformType: "RADAR",
			},
			MilView: &entitymanagerv1.MilView{
				Disposition: ontologyv1.Disposition_DISPOSITION_FRIENDLY,
				Environment: ontologyv1.Environment_ENVIRONMENT_SURFACE,
			},
			Location: &entitymanagerv1.Location{
				Position: &entitymanagerv1.Position{
					LatitudeDegrees:  50.95155,
					LongitudeDegrees: 0.90788,
				},
			},
			Signal: &entitymanagerv1.Signal{
				Report: &entitymanagerv1.Signal_Fixed{},
			},
			Provenance: &entitymanagerv1.Provenance{
				IntegrationName:  "your_integration_name",
				DataType:         "your_data_type",
				SourceUpdateTime: timestamppb.New(latestTimestamp),
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
			fmt.Printf("Publishing radar track with entity ID: %s\n", entityId)
		}

		time.Sleep(5 * time.Second)
	}
}

```

```py title={"Python (gRPC)"} startLine={62} maxLines={20}
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

from anduril.entitymanager.v1.entity.pub_pb2 import Aliases, Entity, Provenance
from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import PublishEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub
from anduril.entitymanager.v1.location.pub_pb2 import Location, Position
from anduril.entitymanager.v1.ontology.pub_pb2 import MilView, Ontology
from anduril.entitymanager.v1.signal.pub_pb2 import Fixed, Signal
from anduril.entitymanager.v1.types.pub_pb2 import Template
from anduril.ontology.v1.type.pub_pb2 import Disposition, Environment


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
            description="Friendly radar",
            aliases=Aliases(name="ARSR-4/FPS-130"),
            is_live=True,
            created_time=creation_timestamp,
            expiry_time=expiry_ts,
            ontology=Ontology(
                template=Template.TEMPLATE_SIGNAL_OF_INTEREST,
                platform_type="RADAR",
            ),
            mil_view=MilView(
                disposition=Disposition.DISPOSITION_FRIENDLY,
                environment=Environment.ENVIRONMENT_SURFACE,
            ),
            location=Location(
                position=Position(latitude_degrees=50.95155, longitude_degrees=0.90788),
            ),
            signal=Signal(fixed=Fixed()),
            provenance=Provenance(
                integration_name="your_integration_name",
                data_type="your_data_type",
                source_update_time=latest_ts,
            ),
        )

        try:
            client.PublishEntity(PublishEntityRequest(entity=entity))
            print(f"Publishing radar track with entity ID: {entity_id}")
        except Exception as error:
            print(f"Error publishing entity: {error}", file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={86} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::{
    signal, Aliases, Entity, Fixed, Location, MilView, Ontology, Position, Provenance,
    PublishEntityRequest, Signal, Template,
};
use anduril_lattice_sdk_community_neoeinstein_prost::anduril::ontology::v1::{
    Disposition, Environment,
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

    let entity_id = Uuid::new_v4().to_string();
    let creation_timestamp = now_timestamp();

    // Continuously publish the entity
    loop {
        let latest_timestamp = now_timestamp();

        // Create entity to publish
        let entity = Entity {
            entity_id: entity_id.clone(),
            description: "Friendly radar".to_string(),
            aliases: Some(Aliases {
                name: "ARSR-4/FPS-130".to_string(),
                ..Default::default()
            }),
            is_live: true,
            created_time: Some(creation_timestamp.clone()),
            expiry_time: Some(add_seconds(&latest_timestamp, 60)),
            ontology: Some(Ontology {
                template: Template::SignalOfInterest as i32,
                platform_type: "RADAR".to_string(),
                ..Default::default()
            }),
            mil_view: Some(MilView {
                disposition: Disposition::Friendly as i32,
                environment: Environment::Surface as i32,
                ..Default::default()
            }),
            location: Some(Location {
                position: Some(Position {
                    latitude_degrees: 50.95155,
                    longitude_degrees: 0.90788,
                    ..Default::default()
                }),
                ..Default::default()
            }),
            signal: Some(Signal {
                report: Some(signal::Report::Fixed(Fixed {})),
                ..Default::default()
            }),
            provenance: Some(Provenance {
                integration_name: "your_integration_name".to_string(),
                data_type: "your_data_type".to_string(),
                source_update_time: Some(latest_timestamp.clone()),
                ..Default::default()
            }),
            ..Default::default()
        };

        let request = Request::new(PublishEntityRequest {
            entity: Some(entity),
        });
        match client.publish_entity(request).await {
            Ok(_) => println!("Publishing radar track with entity ID: {}", entity_id),
            Err(e) => eprintln!("Error publishing entity: {}", e),
        }

        tokio::time::sleep(Duration::from_secs(5)).await;
    }
}

```

## Publish a geo-entity

A *geo-entity* is a shape, region, or point of interest drawn on the map, which may not physically exist.
Use geo-entities to represent an geographical areas of interest, such as airfield, or a control zone
for autonomous vehicles to operate in. To publish a geo-entity, do the following:

Define the entity model's required components. Together with the geo-entity-specific fields,
you get the following entity object:

```json maxLines=20 title="entity_model.json"
{
  "entityId": "UNIQUE_ENTITY_ID",
  "description": "Polygon entity",
  "isLive": true,
  "createdTime": "2025-05-28T18:16:34.969Z",
  "noExpiry": true,
  "aliases": {
    "name": "Control-Area 1"
  },
  "ontology": {
    "template": "TEMPLATE_GEO"
  },
  "geoDetails": {
    "type": "GEO_TYPE_CONTROL_AREA",
    "controlArea": {
      "type": "CONTROL_AREA_TYPE_LOITER_ZONE"
    }
  },
  "geoShape": {
    "polygon": {
      "rings": [
        {
          "positions": [
            {
              "position": {
                "latitudeDegrees": 33.641132,
                "longitudeDegrees": -117.918669,
                "altitudeAglMeters": 500
              },
              "location": {
                "latitudeDegrees": 33.641132,
                "longitudeDegrees": -117.918669,
                "additionalAltitudes": [
                  {
                    "agl": {
                      "valueMeters": 500
                    }
                  }
                ]
              },
              "heightM": 1
            },
            {
              "position": {
                "latitudeDegrees": 33.646911,
                "longitudeDegrees": -117.929123,
                "altitudeAglMeters": 500
              },
              "location": {
                "latitudeDegrees": 33.646911,
                "longitudeDegrees": -117.929123,
                "additionalAltitudes": [
                  {
                    "agl": {
                      "valueMeters": 500
                    }
                  }
                ]
              },
              "heightM": 1
            },
            {
              "position": {
                "latitudeDegrees": 33.635059,
                "longitudeDegrees": -117.917482,
                "altitudeAglMeters": 500
              },
              "location": {
                "latitudeDegrees": 33.635059,
                "longitudeDegrees": -117.917482,
                "additionalAltitudes": [
                  {
                    "agl": {
                      "valueMeters": 500
                    }
                  }
                ]
              },
              "heightM": 1
            },
            {
              "position": {
                "latitudeDegrees": 33.641132,
                "longitudeDegrees": -117.918669,
                "altitudeAglMeters": 500
              },
              "location": {
                "latitudeDegrees": 33.641132,
                "longitudeDegrees": -117.918669,
                "additionalAltitudes": [
                  {
                    "agl": {
                      "valueMeters": 500
                    }
                  }
                ]
              },
              "heightM": 1
            }
          ]
        }
      ]
    }
  },
  "provenance": {
    "integrationName": "your_integration_name",
    "dataType": "test_data",
    "sourceUpdateTime": "2025-05-28T18:17:34.866Z",
  }
}
```

Take a closer look at the following components  in `entity_model.json` and familiarize yourself
with common patterns used to model a get-entity in Lattice. You define `rings` to create the polygon.
Each `ring` must have *at least four* points, each represented by a `position` component.

The last point must be the same as the first point you define for the `ring` component.

```json title="ontology"
"ontology": {
  // Set the required template.
  "template": "TEMPLATE_GEO"
}
```

```json title="getDetails"
"geoDetails": {
  // Set the type of the geo-entity to GEO_TYPE_CONTROL_AREA.
  // This type is commonly used to represent special zones for
  // autonomous entities to operate in.
  "type": "GEO_TYPE_CONTROL_AREA",
  "controlArea": {
    "type": "CONTROL_AREA_TYPE_LOITER_ZONE"
  }
}
```

```json title="geoShape"
"geoShape": {
  "polygon": {
    "rings": [
      {
        "positions": [
          {
            "position": {
              "latitudeDegrees": 33.641132,
              "longitudeDegrees": -117.918669,
              "altitudeAglMeters": 500
            },
            "location": {
              "latitudeDegrees": 33.641132,
              "longitudeDegrees": -117.918669,
              "additionalAltitudes": [
                {
                  "agl": {
                    "valueMeters": 500
                  }
                }
              ]
            },
            "heightM": 1
          },
          {
            "position": {
              "latitudeDegrees": 33.646911,
              "longitudeDegrees": -117.929123,
              "altitudeAglMeters": 500
            },
            "location": {
              "latitudeDegrees": 33.646911,
              "longitudeDegrees": -117.929123,
              "additionalAltitudes": [
                {
                  "agl": {
                    "valueMeters": 500
                  }
                }
              ]
            },
            "heightM": 1
          },
          {
            "position": {
              "latitudeDegrees": 33.635059,
              "longitudeDegrees": -117.917482,
              "altitudeAglMeters": 500
            },
            "location": {
              "latitudeDegrees": 33.635059,
              "longitudeDegrees": -117.917482,
              "additionalAltitudes": [
                {
                  "agl": {
                    "valueMeters": 500
                  }
                }
              ]
            },
            "heightM": 1
          },
          {
            "position": {
              "latitudeDegrees": 33.641132,
              "longitudeDegrees": -117.918669,
              "altitudeAglMeters": 500
            },
            "location": {
              "latitudeDegrees": 33.641132,
              "longitudeDegrees": -117.918669,
              "additionalAltitudes": [
                {
                  "agl": {
                    "valueMeters": 500
                  }
                }
              ]
            },
            "heightM": 1
          }
        ]
      }
    ]
  }
```

Each point in the polygon has a minimum altitude defined as `altitudeAglMeters`.
The first and the last point have a `heightM` component, which sets
additional height, in meters, above `altitudeAglMeters`.

This represents a three-sided polygon that defines a control area. Control areas
include, for example, `CONTROL_AREA_TYPE_KEEP_IN_ZONE`, `CONTROL_AREA_TYPE_KEEP_OUT_ZONE`,
and `CONTROL_AREA_TYPE_LOITER_ZONE`.

Use the [`PublishEntity`](/reference/rest/entities/publish-entity) API method to publish the entity:

```go title={"Go (REST)"} startLine={94} maxLines={20}
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

	// Entities must be republished at least every 5 minutes to persist across Lattice service restarts
	for {
		latestTimestamp := time.Now().UTC()
		ctx := context.Background()

		// Create positions for the polygon
		positions := []*Lattice.GeoPolygonPosition{
			// First point
			{
				Position: &Lattice.Position{
					LatitudeDegrees:   Lattice.Float64(33.641132),
					LongitudeDegrees:  Lattice.Float64(-117.918669),
					AltitudeAglMeters: Lattice.Float64(500),
				},
				HeightM: Lattice.Float64(1),
			},
			// Second point
			{
				Position: &Lattice.Position{
					LatitudeDegrees:   Lattice.Float64(33.646911),
					LongitudeDegrees:  Lattice.Float64(-117.929123),
					AltitudeAglMeters: Lattice.Float64(500),
				},
				HeightM: Lattice.Float64(1),
			},
			// Third point
			{
				Position: &Lattice.Position{
					LatitudeDegrees:   Lattice.Float64(33.635059),
					LongitudeDegrees:  Lattice.Float64(-117.917482),
					AltitudeAglMeters: Lattice.Float64(500),
				},
				HeightM: Lattice.Float64(1),
			},
			// Fourth point (same as first to close the polygon)
			{
				Position: &Lattice.Position{
					LatitudeDegrees:   Lattice.Float64(33.641132),
					LongitudeDegrees:  Lattice.Float64(-117.918669),
					AltitudeAglMeters: Lattice.Float64(500),
				},
				HeightM: Lattice.Float64(1),
			},
		}

		// Create entity to publish
		entity := Lattice.Entity{
			EntityID:    &entityId,
			Description: Lattice.String("Polygon entity"),
			Aliases: &Lattice.Aliases{
				Name: Lattice.String("Control-Area Loiter Zone"),
			},
			IsLive:      Lattice.Bool(true),
			CreatedTime: Lattice.Time(creationTime),
			NoExpiry:    Lattice.Bool(true),
			Ontology: &Lattice.Ontology{
				Template: Lattice.OntologyTemplateTemplateGeo.Ptr(),
			},
			GeoDetails: &Lattice.GeoDetails{
				Type: Lattice.GeoDetailsTypeGeoTypeControlArea.Ptr(),
				ControlArea: &Lattice.ControlAreaDetails{
					Type: Lattice.ControlAreaDetailsTypeControlAreaTypeLoiterZone.Ptr(),
				},
			},
			GeoShape: &Lattice.GeoShape{
				Polygon: &Lattice.GeoPolygon{
					Rings: []*Lattice.LinearRing{
						{
							Positions: positions,
						},
					},
				},
			},
			Provenance: &Lattice.Provenance{
				IntegrationName:  Lattice.String("your_integration_name"),
				DataType:         Lattice.String("test_data"),
				SourceUpdateTime: Lattice.Time(latestTimestamp),
			},
		}

		// Publish the entity
		_, err := LatticeClient.Entities.PublishEntity(ctx, &entity)

		// Handle errors
		if err != nil {
			fmt.Printf("Error publishing entity: %v\n", err)
		} else {
			fmt.Println("Publishing geo entity")
		}

		// Republishing every 10 seconds
		time.Sleep(10 * time.Second)
	}
}

```

```java title={"Java (REST)"} startLine={141} maxLines={20}
package org.example;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import com.anduril.Lattice;
import com.anduril.types.Aliases;
import com.anduril.types.ControlAreaDetails;
import com.anduril.types.ControlAreaDetailsType;
import com.anduril.types.Entity;
import com.anduril.types.GeoDetails;
import com.anduril.types.GeoDetailsType;
import com.anduril.types.GeoPolygon;
import com.anduril.types.GeoPolygonPosition;
import com.anduril.types.GeoShape;
import com.anduril.types.LinearRing;
import com.anduril.types.Ontology;
import com.anduril.types.OntologyTemplate;
import com.anduril.types.Position;
import com.anduril.types.Provenance;



public class PublishGeoEntityPolygon {
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
            
            // Get creation time
            Instant creationTime = Instant.now();
            
            // Entities must be republished at least every 5 minutes to persist across Lattice service restarts
            while (true) {
                try {
                    // Get current timestamp
                    Instant latestTimestamp = Instant.now();
                    
                    // Create positions for the polygon
                    List<GeoPolygonPosition> positions = new ArrayList<>();
                    
                    // First point
                    Position pos1 = Position.builder()
                        .latitudeDegrees(33.641132)
                        .longitudeDegrees(-117.918669)
                        .altitudeAglMeters(500.0)
                        .build();
                    
                    GeoPolygonPosition geoPos1 = GeoPolygonPosition.builder()
                        .position(pos1)
                        .heightM(1.0f)
                        .build();
                    positions.add(geoPos1);
                    
                    // Second point
                    Position pos2 = Position.builder()
                        .latitudeDegrees(33.646911)
                        .longitudeDegrees(-117.929123)
                        .altitudeAglMeters(500.0)
                        .build();
                    
                    GeoPolygonPosition geoPos2 = GeoPolygonPosition.builder()
                        .position(pos2)
                        .heightM(1.0f)
                        .build();
                    positions.add(geoPos2);
                    
                    // Third point
                    Position pos3 = Position.builder()
                        .latitudeDegrees(33.635059)
                        .longitudeDegrees(-117.917482)
                        .altitudeAglMeters(500.0)
                        .build();
                    
                    GeoPolygonPosition geoPos3 = GeoPolygonPosition.builder()
                        .position(pos3)
                        .heightM(1.0f)
                        .build();
                    positions.add(geoPos3);
                    
                    // Fourth point (same as first to close the polygon)
                    Position pos4 = Position.builder()
                        .latitudeDegrees(33.641132)
                        .longitudeDegrees(-117.918669)
                        .altitudeAglMeters(500.0)
                        .build();
                    
                    GeoPolygonPosition geoPos4 = GeoPolygonPosition.builder()
                        .position(pos4)
                        .heightM(1.0f)
                        .build();
                    positions.add(geoPos4);
                    
                    // Create entity objects
                    ControlAreaDetails controlArea = ControlAreaDetails.builder()
                        .type(ControlAreaDetailsType.CONTROL_AREA_TYPE_LOITER_ZONE)
                        .build();
                        
                    GeoDetails geoDetails = GeoDetails.builder()
                        .type(GeoDetailsType.GEO_TYPE_CONTROL_AREA)
                        .controlArea(controlArea)
                        .build();
                        
                    LinearRing ring = LinearRing.builder()
                        .positions(positions)
                        .build();
                        
                    GeoPolygon polygon = GeoPolygon.builder()
                        .rings(Arrays.asList(ring))
                        .build();
                        
                    GeoShape geoShape = GeoShape.builder()
                        .polygon(polygon)
                        .build();
                    
                    // Create the entity
                    Entity entity = Entity.builder()
                        .entityId(entityId)
                        .description("Polygon entity")
                        .aliases(Aliases.builder()
                            .name("Control-Area Loiter Zone")
                            .build())
                        .isLive(true)
                        .createdTime(OffsetDateTime.ofInstant(creationTime, ZoneOffset.UTC))
                        .noExpiry(true)
                        .ontology(Ontology.builder()
                            .template(OntologyTemplate.TEMPLATE_GEO)
                            .build())
                        .geoDetails(geoDetails)
                        .geoShape(geoShape)
                        .provenance(Provenance.builder()
                            .integrationName("your_integration_name")
                            .dataType("test_data")
                            .sourceUpdateTime(OffsetDateTime.ofInstant(latestTimestamp, ZoneOffset.UTC))
                            .build())
                        .build();
                    
                    // Publish the entity
                    client.entities().publishEntity(entity);
                    System.out.println("Published geo entity ID: " + entityId);

                    // Republishing every 10 seconds
                    Thread.sleep(10000);
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

```py title={"Python (REST)"} startLine={33} maxLines={20}
from anduril import Lattice, Aliases, GeoDetails, GeoShape, GeoPolygon, \
    GeoPolygonPosition, Position, ControlAreaDetails, LinearRing, Ontology, Provenance
from datetime import datetime, timezone
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
        # Entities must be republished at least every 5 minutes to persist across Lattice service restarts
        while(True):
            latest_timestamp = datetime.now(timezone.utc)
            client.entities.publish_entity(
                entity_id= id,
                description="Control area",
                aliases=Aliases(
                    name="Loiter Zone 1",
                ),
                is_live=True,
                created_time=creation_time,
                no_expiry=True,
                ontology=Ontology(
                    template="TEMPLATE_GEO"
                ),
                geo_details=GeoDetails(
                    type="GEO_TYPE_CONTROL_AREA",
                    control_area=ControlAreaDetails(
                        type="CONTROL_AREA_TYPE_LOITER_ZONE"
                    )
                ),
                geo_shape=GeoShape(
                    polygon=GeoPolygon(
                        rings=[
                            LinearRing(
                                positions=[
                                    GeoPolygonPosition(
                                        position=Position(
                                            latitude_degrees=33.641132,
                                            longitude_degrees=-117.918669,
                                            altitude_agl_meters=500
                                        ),
                                        height_m=1
                                    ),
                                    GeoPolygonPosition(
                                        position=Position(
                                            latitude_degrees=33.646911,
                                            longitude_degrees=-117.929123,
                                            altitude_agl_meters=500
                                        ),
                                        height_m=1
                                    ),
                                    GeoPolygonPosition(
                                        position=Position(
                                            latitude_degrees=33.635059,
                                            longitude_degrees=-117.917482,
                                            altitude_agl_meters=500
                                        ),
                                        height_m=1
                                    ),
                                    GeoPolygonPosition(
                                        position=Position(
                                            latitude_degrees=33.641132,
                                            longitude_degrees=-117.918669,
                                            altitude_agl_meters=500
                                        ),
                                        height_m=1
                                    )
                                ]
                            )
                        ]
                    )
                ),
                provenance=Provenance(
                    integration_name="your_integration_name",
                    data_type="test_data",
                    source_update_time=latest_timestamp
                )
            )
            # Republish every 5 seconds
            await asyncio.sleep(5)
    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    asyncio.run(app())
```

```ts title={"Typescript (REST)"} startLine={30} maxLines={20}
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
        headers: {  "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}`  }
    }
);

const entityId = uuidv4()

async function App() {
    try {
        const latestTimestamp = new Date();
        await client.entities.publishEntity(
            {
                entityId: entityId,
                description: "Polygon entity",
                aliases: { name: "Control-Area Loiter Zone" },
                isLive: true,
                createdTime: latestTimestamp.toISOString(),
                noExpiry: true, // Entities with noExpiry still need to be republished every 5 minutes to persist across service restarts
                ontology: {
                    template: "TEMPLATE_GEO"
                },
                geoDetails: {
                    type: "GEO_TYPE_CONTROL_AREA",
                    controlArea: {
                        type: "CONTROL_AREA_TYPE_LOITER_ZONE"
                    }
                },
                geoShape: {
                    polygon: {
                        rings: [
                            {
                                positions: [
                                    {
                                        position: {
                                            latitudeDegrees: 33.641132,
                                            longitudeDegrees: -117.918669,
                                            altitudeAglMeters: 500
                                        },
                                        heightM: 1
                                    },
                                    {
                                        position: {
                                            latitudeDegrees: 33.646911,
                                            longitudeDegrees: -117.929123,
                                            altitudeAglMeters: 500
                                        },
                                        heightM: 1 
                                    },
                                    {
                                        position: {
                                            latitudeDegrees: 33.635059,
                                            longitudeDegrees: -117.917482,
                                            altitudeAglMeters: 500
                                        },
                                        heightM: 1
                                    },
                                    {
                                        position: {
                                            latitudeDegrees: 33.641132,
                                            longitudeDegrees: -117.918669,
                                            altitudeAglMeters: 500
                                        },
                                        heightM: 1
                                    }
                                ]
                            }
                        ]
                    }
                },
                provenance: {
                    integrationName: "your_integration_name",
                    dataType: "your_data_type",
                    sourceUpdateTime: latestTimestamp.toISOString()
                }
            }
        );
        console.log(`Publishing geo entity.`);
    } catch (error) {
        console.log(`Encountered the following error while publishing entity: ${error}`);
    }
}
(async function runIndefinitely() {
    while (true) {
        await App();
        // Wait for 10 seconds before the next iteration
        // Republishing entities at least every 5 minutes is required for them to persist across Lattice service restarts
        // This example republishes every 10 seconds, well within the 5-minute requirement
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
})();

```

```go title={"Go (gRPC)"} startLine={112} maxLines={20}
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

	// Create gRPC connection
	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	// Create EntityManager client
	client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)

	// Generate a unique ID for the entity
	entityId := uuid.New().String()

	// Get creation time
	creationTime := time.Now().UTC()
	creationTimestamp := timestamppb.New(creationTime)

	// Create positions for the polygon
	positions := []*entitymanagerv1.GeoPolygonPosition{
		// First point
		{
			Position: &entitymanagerv1.Position{
				LatitudeDegrees:   33.641132,
				LongitudeDegrees:  -117.918669,
				AltitudeAglMeters: wrapperspb.Double(500),
			},
			HeightM: wrapperspb.Float(1),
		},
		// Second point
		{
			Position: &entitymanagerv1.Position{
				LatitudeDegrees:   33.646911,
				LongitudeDegrees:  -117.929123,
				AltitudeAglMeters: wrapperspb.Double(500),
			},
			HeightM: wrapperspb.Float(1),
		},
		// Third point
		{
			Position: &entitymanagerv1.Position{
				LatitudeDegrees:   33.635059,
				LongitudeDegrees:  -117.917482,
				AltitudeAglMeters: wrapperspb.Double(500),
			},
			HeightM: wrapperspb.Float(1),
		},
		// Fourth point (same as first to close the polygon)
		{
			Position: &entitymanagerv1.Position{
				LatitudeDegrees:   33.641132,
				LongitudeDegrees:  -117.918669,
				AltitudeAglMeters: wrapperspb.Double(500),
			},
			HeightM: wrapperspb.Float(1),
		},
	}

	// Continuously publish the entity
	for {
		// Get current timestamp for this update
		latestTimestamp := time.Now().UTC()
		ctx := context.Background()

		// Create entity to publish
		entity := &entitymanagerv1.Entity{
			EntityId:    entityId,
			Description: "Polygon entity",
			Aliases: &entitymanagerv1.Aliases{
				Name: "Control-Area Loiter Zone",
			},
			IsLive:      true,
			CreatedTime: creationTimestamp,
			NoExpiry:    true,
			Ontology: &entitymanagerv1.Ontology{
				Template: entitymanagerv1.Template_TEMPLATE_GEO,
			},
			GeoDetails: &entitymanagerv1.GeoDetails{
				Type: entitymanagerv1.GeoType_GEO_TYPE_CONTROL_AREA,
				TypeDetails: &entitymanagerv1.GeoDetails_ControlArea{
					ControlArea: &entitymanagerv1.ControlAreaDetails{
						Type: entitymanagerv1.ControlAreaType_CONTROL_AREA_TYPE_LOITER_ZONE,
					},
				},
			},
			GeoShape: &entitymanagerv1.GeoShape{
				Shape: &entitymanagerv1.GeoShape_Polygon{
					Polygon: &entitymanagerv1.GeoPolygon{
						Rings: []*entitymanagerv1.LinearRing{
							{
								Positions: positions,
							},
						},
					},
				},
			},
			Provenance: &entitymanagerv1.Provenance{
				IntegrationName:  "your_integration_name",
				DataType:         "test_data",
				SourceUpdateTime: timestamppb.New(latestTimestamp),
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
			fmt.Println("Publishing geo entity")
		}

		// Republishing every 10 seconds
		time.Sleep(10 * time.Second)
	}
}

```

```py title={"Python (gRPC)"} startLine={108} maxLines={20}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import time
import uuid
from datetime import datetime, timezone
import grpc
from auth import ClientCredentialsAuth
from google.protobuf.timestamp_pb2 import Timestamp
from google.protobuf.wrappers_pb2 import DoubleValue, FloatValue

from anduril.entitymanager.v1.entity.pub_pb2 import Aliases, Entity, Provenance
from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import PublishEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub
from anduril.entitymanager.v1.geoentity.pub_pb2 import (
    ControlAreaDetails,
    ControlAreaType,
    GeoDetails,
    GeoPolygon,
    GeoPolygonPosition,
    GeoShape,
    GeoType,
    LinearRing,
)
from anduril.entitymanager.v1.location.pub_pb2 import Position
from anduril.entitymanager.v1.ontology.pub_pb2 import Ontology
from anduril.entitymanager.v1.types.pub_pb2 import Template


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

    positions = [
        # First point
        GeoPolygonPosition(
            position=Position(
                latitude_degrees=33.641132,
                longitude_degrees=-117.918669,
                altitude_agl_meters=DoubleValue(value=500),
            ),
            height_m=FloatValue(value=1),
        ),
        # Second point
        GeoPolygonPosition(
            position=Position(
                latitude_degrees=33.646911,
                longitude_degrees=-117.929123,
                altitude_agl_meters=DoubleValue(value=500),
            ),
            height_m=FloatValue(value=1),
        ),
        # Third point
        GeoPolygonPosition(
            position=Position(
                latitude_degrees=33.635059,
                longitude_degrees=-117.917482,
                altitude_agl_meters=DoubleValue(value=500),
            ),
            height_m=FloatValue(value=1),
        ),
        # Fourth point (same as first to close the polygon)
        GeoPolygonPosition(
            position=Position(
                latitude_degrees=33.641132,
                longitude_degrees=-117.918669,
                altitude_agl_meters=DoubleValue(value=500),
            ),
            height_m=FloatValue(value=1),
        ),
    ]

    while True:
        latest_ts = to_timestamp(datetime.now(timezone.utc))

        entity = Entity(
            entity_id=entity_id,
            description="Polygon entity",
            aliases=Aliases(name="Control-Area Loiter Zone"),
            is_live=True,
            created_time=creation_timestamp,
            no_expiry=True,
            ontology=Ontology(template=Template.TEMPLATE_GEO),
            geo_details=GeoDetails(
                type=GeoType.GEO_TYPE_CONTROL_AREA,
                control_area=ControlAreaDetails(
                    type=ControlAreaType.CONTROL_AREA_TYPE_LOITER_ZONE,
                ),
            ),
            geo_shape=GeoShape(
                polygon=GeoPolygon(
                    rings=[LinearRing(positions=positions)],
                ),
            ),
            provenance=Provenance(
                integration_name="your_integration_name",
                data_type="test_data",
                source_update_time=latest_ts,
            ),
        )

        try:
            client.PublishEntity(PublishEntityRequest(entity=entity))
            print("Publishing geo entity")
        except Exception as error:
            print(f"Error publishing entity: {error}", file=sys.stderr)

        # Republishing every 10 seconds
        time.sleep(10)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={120} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::{
    geo_details, geo_shape, Aliases, ControlAreaDetails, ControlAreaType, Entity, GeoDetails,
    GeoPolygon, GeoPolygonPosition, GeoShape, GeoType, LinearRing, Ontology, Position, Provenance,
    PublishEntityRequest, Template,
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

    let entity_id = Uuid::new_v4().to_string();
    let creation_timestamp = now_timestamp();

    // Create positions for the polygon
    let positions = vec![
        // First point
        GeoPolygonPosition {
            position: Some(Position {
                latitude_degrees: 33.641132,
                longitude_degrees: -117.918669,
                altitude_agl_meters: Some(500.0),
                ..Default::default()
            }),
            height_m: Some(1.0),
        },
        // Second point
        GeoPolygonPosition {
            position: Some(Position {
                latitude_degrees: 33.646911,
                longitude_degrees: -117.929123,
                altitude_agl_meters: Some(500.0),
                ..Default::default()
            }),
            height_m: Some(1.0),
        },
        // Third point
        GeoPolygonPosition {
            position: Some(Position {
                latitude_degrees: 33.635059,
                longitude_degrees: -117.917482,
                altitude_agl_meters: Some(500.0),
                ..Default::default()
            }),
            height_m: Some(1.0),
        },
        // Fourth point (same as first to close the polygon)
        GeoPolygonPosition {
            position: Some(Position {
                latitude_degrees: 33.641132,
                longitude_degrees: -117.918669,
                altitude_agl_meters: Some(500.0),
                ..Default::default()
            }),
            height_m: Some(1.0),
        },
    ];

    // Continuously publish the entity
    loop {
        let latest_timestamp = now_timestamp();

        let entity = Entity {
            entity_id: entity_id.clone(),
            description: "Polygon entity".to_string(),
            aliases: Some(Aliases {
                name: "Control-Area Loiter Zone".to_string(),
                ..Default::default()
            }),
            is_live: true,
            created_time: Some(creation_timestamp.clone()),
            no_expiry: true,
            ontology: Some(Ontology {
                template: Template::Geo as i32,
                ..Default::default()
            }),
            geo_details: Some(GeoDetails {
                r#type: GeoType::ControlArea as i32,
                type_details: Some(geo_details::TypeDetails::ControlArea(ControlAreaDetails {
                    r#type: ControlAreaType::LoiterZone as i32,
                })),
            }),
            geo_shape: Some(GeoShape {
                shape: Some(geo_shape::Shape::Polygon(GeoPolygon {
                    rings: vec![LinearRing {
                        positions: positions.clone(),
                    }],
                    is_rectangle: false,
                })),
            }),
            provenance: Some(Provenance {
                integration_name: "your_integration_name".to_string(),
                data_type: "test_data".to_string(),
                source_update_time: Some(latest_timestamp.clone()),
                ..Default::default()
            }),
            ..Default::default()
        };

        let request = Request::new(PublishEntityRequest {
            entity: Some(entity),
        });
        match client.publish_entity(request).await {
            Ok(_) => println!("Publishing geo entity"),
            Err(e) => eprintln!("Error publishing entity: {}", e),
        }

        // Republish every 10 seconds
        tokio::time::sleep(Duration::from_secs(10)).await;
    }
}

```

The example uses [`noExpiry`](/reference/rest/entities/publish-entity#request.body.noExpiry) instead
of `expiryTime` used in the previous steps. Setting `noExpiry` to `true` indicates that the entity
does not expire and persists indefinitely. Use this option *only* when the entity contains information
that should be available to other tasks or integrations beyond its immediate operational context. In this case
we assume that this long-living geographical entity maintains persistent relevance across multiple operations or tasks.

Even when using `noExpiry: true`, entities must be republished at least every 5 minutes
to ensure persistence across Lattice service restarts. If Lattice restarts and an entity hasn't been
republished within the previous 5 minutes, it won't be restored after the restart. This is
demonstrated in the example code, which republishes the entity every 10 seconds in an indefinite loop.

## Set platform type

For iconography within Lattice, add a [`platform_type`](/reference/rest/entities/get-entity#response.body.ontology.platformType)
value to the `ontology` component. The Lattice UI supports the following types:

```json maxLines=5 title="ontology"
"ontology": {
  "template": "TEMPLATE_TRACK",
  "platform_type": "AIRPLANE"
}
```

<img src="/_files/anduril.docs.buildwithfern.com/0d4df04b2e1acf6a57abafd39ded3e824cf0f46db3766b09c9eb07cb508966e3/assets/images/icons/track_airplane_friendly.png" alt="Shows the airplane platform type icon." />

```json maxLines=5 title="ontology"
"ontology": {
  "template": "TEMPLATE_TRACK",
  "platform_type": "ANIMAL"
}
```

<img src="/_files/anduril.docs.buildwithfern.com/7a1fefc3547f6948eba052eece6ddc337104877bd629ec458fd072352e827007/assets/images/icons/track_animal_friendly.png" alt="Shows the animal platform type icon." />

```json maxLines=5 title="ontology"

"ontology": {
  "template": "TEMPLATE_TRACK",
  "platform_type": "CAR"
}
```

<img src="/_files/anduril.docs.buildwithfern.com/f67c3d700204f4058408001cb908f3cdbfa62959b9f20592a3a5c2a0d01036d4/assets/images/icons/track_car_friendly.png" alt="Shows the car platform type icon." />

```json maxLines=5 title="ontology"
"ontology": {
  "template": "TEMPLATE_TRACK",
  "platform_type": "PERSON"
}
```

<img src="/_files/anduril.docs.buildwithfern.com/81fac650252b5f3243b15b0b11d2a37211528aa0b9544cb4c521d1a3b96d4228/assets/images/icons/track_person_friendly.png" alt="Shows the person platform type icon." />

```json maxLines=5 title="ontology"
"ontology": {
  "template": "TEMPLATE_SENSOR_POINT_OF_INTEREST",
  "platform_type": "RADAR"
}
```

<img src="/_files/anduril.docs.buildwithfern.com/4ba629d2b78c8f01afdc7c69805517fd3b06d0556150869bec56bdc0bd5aa0ed/assets/images/icons/track_radar_friendly.png" alt="Shows the radar platform type icon." />

```json maxLines=5 title="ontology"
"ontology": {
  "template": "TEMPLATE_SIGNAL_POINT_OF_INTEREST",
  "platform_type": "SATELLITE"
}
```

<img src="/_files/anduril.docs.buildwithfern.com/0e60836a67e8cebaa8b3f6c64007deb2551bdb9f73d452f14a392f22906c7d10/assets/images/icons/track_satellite_friendly.png" alt="Shows the satellite platform type icon." />

```json maxLines=5 title="ontology"
"ontology": {
  "template": "TEMPLATE_TRACK",
  "platform_type": "SURFACE VESSEL"
}
```

<img src="/_files/anduril.docs.buildwithfern.com/4f4fb41d2f34e7fd61213c890470f78d30f7d01dd6838024d0a5032980e5cc3f/assets/images/icons/track_surface_vessel_friendly.png" alt="Shows the surface vessel platform type icon." />

```json maxLines=5 title="ontology"
"ontology": {
  "template": "TEMPLATE_ASSET",
  "platform_type": "SUBMARINE"
}
```

<img src="/_files/anduril.docs.buildwithfern.com/4fe192198e46a35bd40911ee0ba9ac2a035a7edf1c2cb566c8cf08fe42d6294e/assets/images/icons/track_submarine_friendly.png" alt="Shows the submarine platform type icon." />

```json maxLines=5 title="ontology"
"ontology": {
  "template": "TEMPLATE_ASSET",
  "platform_type": "UAV"
}
```

<img src="/_files/anduril.docs.buildwithfern.com/a4aa98326fc9decf78dfc44235ad8a58c6643ecb59913bcbfb89aec464af74a7/assets/images/icons/track_uav_friendly.png" alt="Shows the UAV platform type icon." />

```json maxLines=5 title="ontology"
"ontology": {
  "template": "TEMPLATE_TRACK",
  "platform_type": "VEHICLE"
}
```

<img src="/_files/anduril.docs.buildwithfern.com/600f77e2bff8c1f962ec2402444c887de1b655516a5d2f4c136d943a24af7e0f/assets/images/icons/track_vehicle_friendly.png" alt="Shows the vehicle platform type icon." />

## Specify motion

The entity [`location`](/reference/rest/entities/publish-entity#request.body.location)
component contains kinematic fields, including position, attitude, and velocity,
that represent the motion of entities over time. Third-party integrations are
responsible for providing all available kinematic field data.

An entity contains four altitude references, specified in meters:

The entity's height above the World Geodetic System 984 (WGS84) ellipsoid.

The entity's height above the terrain. This is
typically measured with a radar altimeter or by using a terrain tile set
lookup.

The entity's height above the sea floor.

The depth of the entity from the surface of the water.

Lattice does not support Mean Sea Level (MSL) references,
EGM-96 and the EGM-08. If the only altitude reference available to your
integration is MSL, convert it to Height Above Ellipsoid (HAE) and populate the
`altitude_hae_meters` field. We recommend using an open-source library, such as
[EGM96 for Go](https://pkg.go.dev/github.com/westphae/geomag/pkg/egm96)
to apply this conversion

For example, to indicate to Lattice that a plane is flying at an altitude of
2,994 meters higher than the World Geodetic System 1984 (WGS-84) ellipsoid, you would
populate an entity with the following data:

```json maxLines=9 title="entity_model.json"
"location": {
    "position": {
      "latitudeDegrees": 42.2,
      "longitudeDegrees": -71.1,
      "altitudeHaeMeters": 2994.0,
      "altitudeAglMeters": 2972.8
    },
}
```

An entity contains two attitude references, specified in radians:

The entity's attitude in the East-North-Up (ENU) frame, represented by a quaternion.

An ENU reference frame centered on the corresponding position, measured in meters-per-second.

If both `attitude_enu` and `velocity_enu` are populated, Lattice prioritizes the value
from the `attitude_enu` component.

## Set transponder code

For most civilian aircraft it is common to assign a unique 24-bit ICAO address to identify the aircraft.
To record an entity's ADS-B identifier in Lattice, populate the `Mode-S.Address` field.

To indicate that an entity has an ADS-B transponder:

* Set [Transponder codes](/reference/rest/entities/publish-entity#request.body.transponder_codes).
* Set [`aliases.name`](/reference/rest/entities/publish-entity#request.body.aliases.name)to specify any flight number
  associated with the aircraft, for example, an **UAL-1235**.
* Add [`aliases.alternate_ids`](/reference/rest/entities/publish-entity#request.body.aliases.alternateIds) to indicate a call-sign
  for the aircraft: `ALT_ID_TYPE_CALLSIGN`.

After you publish the entity, open its detail page in the Lattice UI to verify its transponder details:

<img src="/_files/anduril.docs.buildwithfern.com/da8b30aea6ba0611ff908922e839feaf4909589d1cef29c37d844de8faa474f1/assets/images/screenshots/developer-console-adsb-transponder.png" alt="Shows an entity with its ADS-B transponder details in the Lattice Developer Console." />

## What's next?

* Learn more about the Entities API in [REST](/reference/rest/entities/publish-entity) and [gRPC](/reference/grpc/anduril-entitymanager-v-1/entity-manager-api/anduril-entitymanager-v-1-publish-entity).
* Learn how to [task an asset](/guides/tasks/overview).
* Check out the Lattice [sample apps](/samples/overview).