> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Choose a protocol

The Lattice SDK supports both **REST** and **gRPC** protocols. REST offers familiar HTTP/JSON workflows
with automatic authentication and broad tooling support.

|                  | REST                                                          | gRPC                                                    |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| Installation     | Packages via [PyPi], [Maven], [npm], source via [GitHub]      | Packages generated in [Buf Schema Registry]             |
| Language Support | Python, Typescript, Java, and Go                              | Auto-generated bindings for 16 languages                |
| Authentication   | Includes built-in support for OAuth 2.0                       | Requires manual token lifecycle management              |
| Streaming        | Supported with basic filtering                                | Supported with advanced filtering                       |
| API availability | `Entities`, `Tasks`, and `Objects`                            | `Entities` and `Tasks`                                  |
| Retries          | Built-in retries for `5xx`, `408`, `409`, and `429` responses | No built-in retries, implement them in your integration |
| On-the-wire size | Larger packets with JSON encoding                             | Smaller packets with binary encoding                    |
| Browser support  | Better browser support                                        | Weaker browser support                                  |

[PyPi]: https://pypi.org/project/anduril-lattice-sdk/

[Maven]: https://central.sonatype.com/artifact/com.anduril/lattice-sdk

[npm]: https://www.npmjs.com/package/@anduril-industries/lattice-sdk

[GitHub]: https://github.com/anduril?q=lattice-sdk&type=all&language=&sort=

[Buf Schema Registry]: https://buf.build/anduril/lattice-sdk

gRPC provides binary Protocol Buffers encoding that reduces bandwidth in constrained networks.
For high-frequency scenarios, the payload difference compounds quickly. Publishing 50 drone positions at 10 Hz
requires \~2 Mbps with REST and JSON, compared to \~1.3 Mbps with gRPC and Protobuf:

```text title="REST bandwidth (50 drones at 10 Hz)"
500 bytes × 10 updates/sec × 50 drones = 250 KB/sec = ~2 Mbps
```

```text title="gRPC bandwidth (50 drones at 10 Hz)"
320 bytes × 10 updates/sec × 50 drones = 160 KB/sec = ~1.3 Mbps
```

If you are using gRPC with client credentials, [set up the token refresh module](/guides/getting-started/authenticate#using-grpc) before running the examples on this page.

## Authentication

If you are using client credentials, your authentication set up differs between REST and gRPC.
REST SDKs automatically manage OAuth token lifecycle, while gRPC requires manual token management with custom credential providers.

For complete authentication details including OAuth client credentials, environment tokens, and
code examples for both protocols, see the [Authenticate guide](/guides/getting-started/authenticate).

## Reliability and retries

Networks that carry Lattice traffic, such as tactical links, satellite relays, and congested cloud egress,
drop connections, throttle traffic, and return transient errors. How much of that your integration has to
handle manually depends on the protocol you choose.

&#x20;**REST: Built-in retries for transient errors**

The Lattice REST SDKs retry automatically on HTTP `5xx`, `408`, `409`, and `429` responses, using
exponential backoff starting at 1 second with a maximum of 60 seconds and ±20% jitter. The SDK also
honors `Retry-After`, `retry-after-ms`, and `X-RateLimit-Reset` headers returned by the server. The
default is 2 retries per call, and you can override this per call with `request_options={"max_retries": N}`.

For REST integrations, the baseline reliability story is already in the SDK. You only need a custom
retry utility if you want to retry additional error classes (for example, `404` under eventual
consistency) or centralize backoff policy across every call site.

&#x20;**gRPC: No built-in retries**

The Lattice gRPC SDKs do not retry anything automatically. Every call that returns a non-`OK` status
surfaces the error to your code unchanged. For gRPC integrations, you must implement retry logic
yourself: classify gRPC status codes as retryable or terminal, apply an exponential backoff, and
honor context cancellation.

For a modular, utility-driven pattern that works for both protocols, see
[Retry connections](/guides/best-practices/retry-connections).

## Managing objects

The Objects API is a REST-only content delivery network (CDN) service for uploading and managing
files and binary data in Lattice. This API is not available in gRPC. If your integration requires
file operations alongside gRPC entity or task operations, you need to use both protocols.

For more information on managing files and binary data, see [Objects overview](/guides/objects/overview).

## Publishing entities

The choice between REST and gRPC for publishing entities depends on your update frequency and data volume.

&#x20;**gRPC: High-throughput streaming**

Use the **PublishEntities** API when your integration produces high volumes of entity updates. This API creates
a client-side stream that efficiently publishes batches of entities in a single connection. This approach is
ideal for integrations that generate large quantities of track detections, such as passive sensors or radar systems
tracking multiple targets simultaneously.

```go title={"Go (gRPC)"} startLine={56} maxLines={20}
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
	ctx := context.Background()

	// Get environment variables
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		log.Fatalf("Missing required environment variables")
	}

	// Set up authentication
	authCredentials := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	// Create gRPC connection
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")),
		grpc.WithPerRPCCredentials(authCredentials),
	}
	conn, err := grpc.NewClient(latticeEndpoint, opts...)
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)

	// Create client-side streaming connection
	stream, err := client.PublishEntities(ctx)
	if err != nil {
		log.Fatalf("Failed to create stream: %v", err)
	}

	log.Println("Publishing entities via client-side streaming...")

	// Send multiple entities through the stream
	for i := range 100 {
		entity := &entitymanagerv1.Entity{
			EntityId:    fmt.Sprintf("entity-%s", uuid.New().String()[:8]),
			Description: "Streaming track example",
			Aliases: &entitymanagerv1.Aliases{
				Name: fmt.Sprintf("Track-%d", i),
			},
			IsLive:      true,
			CreatedTime: timestamppb.Now(),
			ExpiryTime:  timestamppb.New(time.Now().Add(10 * time.Second)),
			Ontology: &entitymanagerv1.Ontology{
				Template:     entitymanagerv1.Template_TEMPLATE_TRACK,
				PlatformType: "UNKNOWN",
			},
			MilView: &entitymanagerv1.MilView{
				Disposition: ontologyv1.Disposition_DISPOSITION_UNKNOWN,
				Environment: ontologyv1.Environment_ENVIRONMENT_UNKNOWN,
			},
			Location: &entitymanagerv1.Location{
				Position: &entitymanagerv1.Position{
					LatitudeDegrees:   33.6405 + float64(i)*0.001,
					LongitudeDegrees:  -117.6738 + float64(i)*0.001,
					AltitudeHaeMeters: wrapperspb.Double(100.0),
				},
			},
			Provenance: &entitymanagerv1.Provenance{
				IntegrationName:  "streaming_example",
				DataType:         "track_data",
				SourceUpdateTime: timestamppb.Now(),
			},
		}

		// Send entity through stream
		if err := stream.Send(&entitymanagerv1.PublishEntitiesRequest{Entity: entity}); err != nil {
			log.Fatalf("Failed to send entity: %v", err)
		}

		if (i+1)%10 == 0 {
			log.Printf("Sent %d entities", i+1)
		}

		// Throttle the call
		time.Sleep(300 * time.Millisecond)
	}

	// Close the stream and receive response
	_, err = stream.CloseAndRecv()
	if err != nil {
		log.Fatalf("Failed to close stream: %v", err)
	}

	log.Println("Successfully published entities")
}

```

```py title={"Python (gRPC)"} startLine={33} maxLines={20}
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
from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import PublishEntitiesRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub
from anduril.entitymanager.v1.location.pub_pb2 import Location, Position
from anduril.entitymanager.v1.ontology.pub_pb2 import MilView, Ontology
from anduril.entitymanager.v1.types.pub_pb2 import Template
from anduril.ontology.v1.type.pub_pb2 import Disposition, Environment


def to_timestamp(dt: datetime) -> Timestamp:
    ts = Timestamp()
    ts.FromDatetime(dt)
    return ts


def entity_iterator():
    """Yield 100 entities through the client-streaming RPC."""
    for i in range(100):
        now = datetime.now(timezone.utc)
        entity = Entity(
            entity_id=f"entity-{uuid.uuid4().hex[:8]}",
            description="Streaming track example",
            aliases=Aliases(name=f"Track-{i}"),
            is_live=True,
            created_time=to_timestamp(now),
            expiry_time=to_timestamp(now + timedelta(seconds=10)),
            ontology=Ontology(template=Template.TEMPLATE_TRACK, platform_type="UNKNOWN"),
            mil_view=MilView(
                disposition=Disposition.DISPOSITION_UNKNOWN,
                environment=Environment.ENVIRONMENT_UNKNOWN,
            ),
            location=Location(
                position=Position(
                    latitude_degrees=33.6405 + i * 0.001,
                    longitude_degrees=-117.6738 + i * 0.001,
                    altitude_hae_meters=DoubleValue(value=100.0),
                ),
            ),
            provenance=Provenance(
                integration_name="streaming_example",
                data_type="track_data",
                source_update_time=to_timestamp(now),
            ),
        )

        yield PublishEntitiesRequest(entity=entity)

        if (i + 1) % 10 == 0:
            print(f"Sent {i + 1} entities")

        # Throttle the call
        time.sleep(0.3)


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

    print("Publishing entities via client-side streaming...")

    try:
        client.PublishEntities(entity_iterator())
    except Exception as error:
        print(f"Failed to publish entities: {error}", file=sys.stderr)
        sys.exit(1)

    print("Successfully published entities")


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={91} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::{
    Aliases, Entity, Location, MilView, Ontology, Position, Provenance, PublishEntitiesRequest,
    Template,
};
use anduril_lattice_sdk_community_neoeinstein_prost::anduril::ontology::v1::{
    Disposition, Environment,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::entitymanager::v1::tonic::entity_manager_api_client::EntityManagerApiClient;
use auth::ClientCredentialsAuth;
use prost_types::Timestamp;
use tokio_stream::wrappers::ReceiverStream;
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

    // Create a channel to feed the client-side stream
    let (tx, rx) = tokio::sync::mpsc::channel(4);

    // Spawn a producer task that sends 100 entities through the stream
    let producer = tokio::spawn(async move {
        println!("Publishing entities via client-side streaming...");
        for i in 0..100 {
            let created_time = now_timestamp();
            let entity_id = format!(
                "entity-{}",
                &Uuid::new_v4().to_string()[..8]
            );
            let entity = Entity {
                entity_id,
                description: "Streaming track example".to_string(),
                aliases: Some(Aliases {
                    name: format!("Track-{}", i),
                    ..Default::default()
                }),
                is_live: true,
                created_time: Some(created_time.clone()),
                expiry_time: Some(add_seconds(&created_time, 10)),
                ontology: Some(Ontology {
                    template: Template::Track as i32,
                    platform_type: "UNKNOWN".to_string(),
                    ..Default::default()
                }),
                mil_view: Some(MilView {
                    disposition: Disposition::Unknown as i32,
                    environment: Environment::Unknown as i32,
                    ..Default::default()
                }),
                location: Some(Location {
                    position: Some(Position {
                        latitude_degrees: 33.6405 + (i as f64) * 0.001,
                        longitude_degrees: -117.6738 + (i as f64) * 0.001,
                        altitude_hae_meters: Some(100.0),
                        ..Default::default()
                    }),
                    ..Default::default()
                }),
                provenance: Some(Provenance {
                    integration_name: "streaming_example".to_string(),
                    data_type: "track_data".to_string(),
                    source_update_time: Some(created_time),
                    ..Default::default()
                }),
                ..Default::default()
            };

            let request = PublishEntitiesRequest {
                entity: Some(entity),
            };
            if tx.send(request).await.is_err() {
                eprintln!("Stream closed early");
                break;
            }

            if (i + 1) % 10 == 0 {
                println!("Sent {} entities", i + 1);
            }

            // Throttle the call
            tokio::time::sleep(Duration::from_millis(300)).await;
        }
    });

    // Open the client-side stream and wait for the server response
    let response = client
        .publish_entities(Request::new(ReceiverStream::new(rx)))
        .await?;
    producer.await?;

    println!("Successfully published entities: {:?}", response.into_inner());
    Ok(())
}

```

&#x20;**REST: Individual entity updates**

Use the **PublishEntity** API when your integration publishes entities individually or at lower frequencies.
This unary API publishes one entity per request, making it well-suited for stateful entities like assets
that update their position and status periodically rather than continuously.

```go title={"Go"} startLine={61} maxLines={20}
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

For detailed guidance on entity publishing patterns and best practices, see [Publish entities](/guides/entities/publish).

## Streaming entities

Both protocols support server-side streaming for consuming entity updates, with different filtering capabilities.

&#x20;**gRPC: Advanced filtering**

Use **StreamEntityComponents** when you need complex filtering logic to receive only relevant entities.
This API offers more robust filtering capabilities, letting you specify filter criteria for more fine-tuned streaming.

```go title={"Go (gRPC)"} startLine={49} maxLines={20}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/entitymanager/v1/entitymanagerv1grpc"
	entitymanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/entitymanager/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	ctx := context.Background()

	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		log.Fatalf("Missing required environment variables")
	}
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

	client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)

	stream, err := client.StreamEntityComponents(ctx, &entitymanagerv1.StreamEntityComponentsRequest{
		ComponentsToInclude: []string{"aliases", "location"},
	})
	if err != nil {
		log.Fatalf("Error creating stream: %v", err)
	}

	log.Println("Starting to receive stream data...")
	for {
		response, err := stream.Recv()
		if err == io.EOF {
			// End of stream
			log.Println("End of stream reached.")
			break
		}
		if err != nil {
			log.Fatalf("Error receiving stream data: %v", err)
		}

		entity := response.GetEntityEvent().GetEntity()
		if position := entity.GetLocation().GetPosition(); position != nil {
			log.Printf("Entity %s at location: %f, %f",
				entity.EntityId,
				position.LatitudeDegrees,
				position.LongitudeDegrees,
			)
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

from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import (
    StreamEntityComponentsRequest,
)
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub


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

    request = StreamEntityComponentsRequest(components_to_include=["aliases", "location"])

    try:
        stream = client.StreamEntityComponents(request)
    except Exception as error:
        print(f"Error creating stream: {error}", file=sys.stderr)
        sys.exit(1)

    print("Starting to receive stream data...")

    try:
        for response in stream:
            entity = response.entity_event.entity
            position = entity.location.position
            if position.latitude_degrees or position.longitude_degrees:
                print(
                    f"Entity {entity.entity_id} at location: "
                    f"{position.latitude_degrees}, {position.longitude_degrees}"
                )
        print("End of stream reached.")
    except Exception as error:
        print(f"Error receiving stream data: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={48} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::StreamEntityComponentsRequest;
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::entitymanager::v1::tonic::entity_manager_api_client::EntityManagerApiClient;
use auth::ClientCredentialsAuth;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use std::env;

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

    // Subscribe to only the aliases and location components on every entity
    let request = Request::new(StreamEntityComponentsRequest {
        components_to_include: vec!["aliases".to_string(), "location".to_string()],
        ..Default::default()
    });

    let mut stream = client.stream_entity_components(request).await?.into_inner();

    println!("Starting to receive stream data...");
    while let Some(response) = stream.message().await? {
        if let Some(entity) = response.entity_event.and_then(|e| e.entity) {
            if let Some(position) = entity.location.and_then(|l| l.position) {
                println!(
                    "Entity {} at location: {}, {}",
                    entity.entity_id, position.latitude_degrees, position.longitude_degrees
                );
            }
        }
    }
    println!("End of stream reached.");

    Ok(())
}

```

&#x20;**REST: Component-based filtering**

Use **StreamEntities** for server-side streaming over HTTP with component-based filtering. This API
filters entities based on the presence of specific components, which is sufficient for most integration
scenarios where you need entities with particular data.

```go title={"Go"} startLine={40} maxLines={20}
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
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	clientId := os.Getenv("LATTICE_CLIENT_ID")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	if latticeEndpoint == "" || clientId == "" || clientSecret == "" || sandboxesToken == "" {
		log.Fatal("Required environment variables not set.")
	}

	headers := http.Header{}
	headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))

	latticeClient := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)

	// Create the entity stream.
	stream, err := latticeClient.Entities.StreamEntities(ctx, &Lattice.EntityStreamRequest{
		PreExistingOnly: Lattice.Bool(false),
		// Define a list of components to control which entities are fetched.
		// If set, Lattice streams only entities with the components you provide.
		ComponentsToInclude: []string{"aliases", "location_uncertainty"},
	})
	if err != nil {
		log.Fatalf("Failed to create entity stream: %v", err)
	}
	defer stream.Close()

	for {
		select {
		case <-ctx.Done():
			log.Printf("Context canceled: %v", ctx.Err())
			return
		default:
			// Continue processing
		}
		message, err := stream.Recv()

		// Handle stream completion
		if errors.Is(err, io.EOF) {
			log.Println("Stream completed successfully.")
			return
		}

		if err != nil {
			log.Printf("Error receiving message: %v", err)
			continue
		}

		// Process the event based whether it is a heartbeat or entity event.
		switch message.Event {
		case "heartbeat":
			timestamp := *message.Heartbeat.Timestamp
			log.Printf("Heartbeat: %s", timestamp)
		case "entity":
			log.Printf("Entity: %s", *message.Entity.Entity.Aliases.Name)
		default:
			log.Printf("Unknown event type: %s", message.Event)
		}
	}
}

```

For more information on streaming patterns and filtering strategies, see [Watch entities](/guides/entities/watch).

## Decision guide

Use this three-step framework to guide your protocol choice:

Choose gRPC when your integration prioritizes performance and bandwidth efficiency:

* **Bandwidth-constrained networks**: Tactical networks, satellite links, or environments where data transmission costs matter use gRPC.
* **High-throughput scenarios**: Integrations that publishing hundreds of entity updates rapidly use gRPC.
* **Specialized languages**: Integrations written in Rust, C++, or other languages beyond the REST SDK use gRPC bindings.
* **Custom reliability logic**: Integrations that need more control over retry classification,
  backoff, and error handling implement it directly in their integration, since the gRPC SDKs ship no retry layer of their own.

An autonomous drone fleet publishes sensor data and location updates
at 10 Hz per vehicle. With 50 drones, you're sending 500 entity updates per second.
gRPC's binary encoding reduces each payload by 30-50% compared to JSON, significantly
decreasing bandwidth requirements.

Choose REST when your integration prioritizes development velocity and ecosystem compatibility:

* **Web applications**: Dashboards, command and control interfaces, or browser-based tools use REST
* **Low-frequency operations**: Periodic polling, manual workflows, or asynchronous task creation use REST
* **Objects API access**: Services that manage files and binary data in Lattice use REST to integrate with the Objects API.
* **Built-in reliability**: Integrations that want sensible retry defaults for transient server errors without writing a retry layer benefit from the REST SDK's automatic retries on `5xx`, `408`, `409`, and `429` responses.

A command and control web dashboard queries Lattice every 5 seconds
to display current entity positions. The interface creates tasks when operators interact
with the UI. REST's simplicity accelerates development, and browser compatibility is essential.

Many production systems combine both protocols to leverage their respective strengths:

* **Fleet management platforms**: Hardware components use gRPC for telemetry, while web interfaces use REST for visualization.
* **Multi-component systems**: Edge devices publish updates using gRPC, and cloud services consume the data using REST.
* **Objects integration**: Core entity, and tasking operations use gRPC, and file management is implemented in REST.

A robotics platform has autonomous ground vehicles publishing
position and sensor data via gRPC at 5 Hz. A React web application consumes this data
via REST polling at 1 Hz for operator display. Mission plans are uploaded as files through
the REST Objects API, then referenced in tasks sent to the robots.

## What's next

* Review [Authentication patterns](/guides/getting-started/authenticate) for both protocols.
* Explore the [REST API reference](/reference/rest/entities/publish-entity) or [gRPC API reference](/reference/grpc/anduril-entitymanager-v-1/entity-manager-api/anduril-entitymanager-v-1-publish-entity).
* Check [Connect to offline environments](/guides/best-practices/connect-offline) for self-signed certificate configuration.
* Learn how to [Retry connections](/guides/best-practices/retry-connections) with a modular utility that applies to both REST and gRPC.