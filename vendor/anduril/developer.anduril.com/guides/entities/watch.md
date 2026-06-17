> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Watch entities

This shows how to use the SDK to fetch entities from Lattice and
stream real-time information about entity components.

Complete the steps to learn how to use the following APIs:

* [`GetEntity`](/reference/rest/entities/get-entity) -- Retrieves a single entity from Lattice.
* [`StreamEntities`](/reference/rest/entities/stream-entities) -- Establishes a persistent connection to stream entity events.

## Before you begin

* To configure your app to watch entities, [set up the Lattice SDK](/guides/getting-started/set-up).
* Learn about required components and various [entity shapes](/guides/entities/overview) in Lattice.

If you are using gRPC with client credentials, [set up the token refresh module](/guides/getting-started/authenticate#using-grpc) before running the examples on this page.

## Get an entity

Get details of a specific entity using [`entity_ID`](/reference/rest/entities/publish-entity#request.body.entityId)
and the [`GetEntity`](/reference/rest/entities/get-entity) API:

Open the Lattice UI and find the entity in the Entity Explorer. Copy its ID from the **Entity ID** column:

<img src="/_files/anduril.docs.buildwithfern.com/72c242c7f0277f5a308bd2efb784cfcd9675f4dab9d1790bd9b195c6df74c7d0/assets/images/screenshots/developer-console-entity-explorer.png" alt="Shows the Entity Explorer in the Lattice Developer Console." />

Use the `GetEntity` API action to retrieve a single entity object from Lattice.
Replace `$ENTITY_ID` in the following example with the entity ID you copied in the
previous step:

```go title={"Go (REST)"} startLine={42} maxLines={20}
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
)

func main() {
	// Get environment variables
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	clientId := os.Getenv("LATTICE_CLIENT_ID")

	// Remove sandboxesToken from the following statements if you are not developing on Sandboxes.
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

	// Continuously get the entity
	for {
		// Create context for the request
		ctx := context.Background()

		entity, err := LatticeClient.Entities.GetEntity(
			ctx,
			&Lattice.GetEntityRequest{
				EntityID: "<ENTITY_ID>",
			},
		)

		if err != nil {
			fmt.Printf("Error fetching entity: %v\n", err)
		} else {
			fmt.Printf("Asset name     | %s\n", *entity.GetAliases().GetName())
			fmt.Printf("Asset location | %f, %f\n", *entity.GetLocation().GetPosition().GetLatitudeDegrees(),
				*entity.GetLocation().GetPosition().GetLongitudeDegrees())
		}

		// Wait before next request
		time.Sleep(5 * time.Second)
	}
}

```

```java title={"Java (REST)"} startLine={37} maxLines={20}
package org.example;
import com.anduril.Lattice;
import com.anduril.types.Entity;
import java.time.LocalDateTime;

/**
 * Example application that tracks an entity's location using the Lattice SDK.
 */
public class GetEntity {
    private static final String ENTITY_ID = "<ENTITY_ID>";
    
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
            
            // Poll for entity location
            while (true) {
                try {
                    Entity entity = client.entities().getEntity(ENTITY_ID);
                    
                    System.out.println("Timestamp: " + LocalDateTime.now());
                    System.out.println("Asset name: " + entity.getAliases());
                    if (entity.getLocation() != null) {
                        System.out.println("Location: " + entity.getLocation());
                    }
                    System.out.println("---------------");
                    
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

```py title={"Python (REST)"} startLine={27} maxLines={20}
from anduril import Lattice
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

client = Lattice(
    # Set your environment endpoint.
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    # Remove the header if you are not developing on Sandboxes.
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)
async def app(entity_id):
    try:
        while(True):
            entity = client.entities.get_entity(
                entity_id=entity_id
            )
            
            if entity.aliases:
                print(f"Asset name     | {entity.aliases.name}")
            if entity.location and entity.location.position:
                print(f"Asset location | {entity.location.position.latitude_degrees}, {entity.location.position.longitude_degrees}")

            await asyncio.sleep(5)

    except (asyncio.CancelledError, KeyboardInterrupt):
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    asyncio.run(app("<ENTITY_ID>"))
```

```ts title={"Typescript (REST)"} startLine={26} maxLines={20}
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
        // Remove the following statement if you are not developing on Sandboxes.
        headers: {  "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    }
);

async function App(entityId: string) {
    try {
        // Fetch the entity using the client.
        const entity = await client.entities.getEntity({ entityId });

        // Check if the entity object is not empty
        if (entity && Object.keys(entity).length > 0) {
            console.log(`Asset name     | ${entity.aliases?.name}`);
            console.log(`Asset location | ${entity.location?.position?.latitudeDegrees}, ${entity.location?.position?.longitudeDegrees}`);
        } else {
            console.log('Entity object is empty.');
        }
    } catch (error) {
        console.log(`Encountered the following error while fetching entity: ${error}`);
    }
}

(async function runIndefinitely() {
    while (true) {
        // Replace <ENTITY_ID> with the entity ID of the entity you want to get.
        await App("<ENTITY_ID>");
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
})();
```

```go title={"Go (gRPC)"} startLine={51} maxLines={20}
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

	// Periodically get the latest entity state
	for {
		entity, err := client.GetEntity(ctx, &entitymanagerv1.GetEntityRequest{
			EntityId: "Demo-Sim-Asset1",
		})
		if err != nil {
			log.Fatalf("Error getting entity: %v", err)
		}

		// Process each entity.
		log.Printf("Fetching entity at location: %f %f", entity.GetEntity().GetLocation().GetPosition().LatitudeDegrees, entity.GetEntity().GetLocation().GetPosition().LongitudeDegrees)

		time.Sleep(5 * time.Second)
	}
}

```

```py title={"Python (gRPC)"} startLine={46} maxLines={20}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
import time
import grpc
from auth import ClientCredentialsAuth

from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import GetEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub


def main():
    # Load environment variables
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
        print("Missing required environment variables", file=sys.stderr)
        sys.exit(1)

    # Create authentication handler
    auth = ClientCredentialsAuth(
        client_id=client_id,
        client_secret=client_secret,
        sandboxes_token=sandboxes_token,
        endpoint=f"https://{lattice_endpoint}/api/v1/oauth/token"
    )

    # Create gRPC channel with SSL and authentication interceptor
    credentials = grpc.ssl_channel_credentials()
    channel = grpc.intercept_channel(
        grpc.secure_channel(lattice_endpoint, credentials),
        auth.create_metadata_interceptor()
    )

    # Create EntityManager API client stub
    client = EntityManagerAPIStub(channel)

    # Periodically get the latest entity state
    while True:
        try:
            request = GetEntityRequest(entity_id="<ENTITY_ID>")

            # Call the GetEntity RPC
            response = client.GetEntity(request)

            # Log entity location if available
            if (
                response.entity
                and response.entity.location
                and response.entity.location.position
            ):
                position = response.entity.location.position
                print(
                    f"Fetching entity at location: "
                    f"{position.latitude_degrees} {position.longitude_degrees}"
                )

        except Exception as error:
            print(f"Error getting entity: {error}", file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={57} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::entitymanager::v1::tonic::entity_manager_api_client::EntityManagerApiClient;
use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::GetEntityRequest;
use auth::ClientCredentialsAuth;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use std::env;
use std::time::Duration;

/// Main application entry point
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

    // Validate required environment variables
    if client_id.is_empty() || client_secret.is_empty() || lattice_endpoint.is_empty() || sandboxes_token.is_empty() {
        eprintln!("Missing required environment variables:");
        eprintln!("  LATTICE_CLIENT_ID");
        eprintln!("  LATTICE_CLIENT_SECRET");
        eprintln!("  LATTICE_ENDPOINT");
        eprintln!("  SANDBOXES_TOKEN");
        std::process::exit(1);
    }

    // Create authentication handler
    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token.clone(),
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    // Create gRPC channel with TLS
    let tls_config = ClientTlsConfig::new().with_native_roots();
    let channel = Channel::from_shared(format!("https://{}", lattice_endpoint))?
        .tls_config(tls_config)?
        .connect()
        .await?;

    println!("Starting EntityManager API client...");
    println!("Connected to: {}", lattice_endpoint);
    println!();

    // Periodically get the latest entity state
    loop {
        match get_entity(&auth, channel.clone()).await {
            Ok(_) => {}
            Err(e) => {
                eprintln!("Error getting entity: {}", e);
            }
        }

        // Wait 5 seconds before next request
        tokio::time::sleep(Duration::from_secs(5)).await;
    }
}

async fn get_entity(
    auth: &ClientCredentialsAuth,
    channel: Channel,
) -> Result<(), Box<dyn std::error::Error>> {
    // Get fresh access token
    let access_token = auth.get_token().await?;
    let sandboxes_token = auth.sandboxes_token();

    // Parse tokens into metadata values
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

    // Create request for a specific entity
    let request = Request::new(GetEntityRequest {
        entity_id: "<ENTITY_ID>".to_string(),
    });

    // Call the GetEntity RPC
    let response = client.get_entity(request).await?;

    // Log entity location if available
    if let Some(entity) = response.get_ref().entity.as_ref() {
        if let Some(location) = entity.location.as_ref() {
            if let Some(position) = location.position.as_ref() {
                println!(
                    "Fetching entity at location: {} {}",
                    position.latitude_degrees, position.longitude_degrees
                );
            }
        }
    }

    Ok(())
}

```

If successful, you'll see the entity's`aliases.name` and its
real-time location logged in the console:

```bash maxLines=3
Asset name     | Demo-Sim-Asset1
Asset location | 37.7749, -122.4194
```

## Stream entities

The [`StreamEntities`](/reference/rest/entities/stream-entities) API establishes a
persistent connection to stream entity events as they occur. The stream sends two types
of events: [`entity`](/reference/rest/entities/stream-entities#response.body.entity)
and [`heartbeat`](/reference/rest/entities/stream-entities#response.body.heartbeat).

Use the following optional parameters to control
the frequency and type of data fetched from your environment:
[`heartbeatIntervalMS`](/reference/rest/entities/stream-entities#request.body.heartbeatIntervalMS),
[`preExistingOnly`](/reference/rest/entities/stream-entities#request.body.preExistingOnly),
and [`componentsToInclude`](/reference/rest/entities/stream-entities#request.body.componentsToInclude).

To stream entities from Lattice, do the following:

To get stream of all entity components from your environment, including
new entities as they are updated, use the default options.

By default, the `preExistingOnly` option is set to `false`, instructing
Lattice to establish a persistent, real-time connection with the client:

```go title={"Go (REST)"} startLine={40} maxLines={20}
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

		if errors.Is(err, io.EOF) {
			log.Println("Stream completed successfully.")
			return
		}

		if err != nil {
			log.Printf("Error receiving message: %v", err)
			continue
		}

		// Process the message based on its type
		switch message.Event {
		case "heartbeat":
			timestamp := *message.Heartbeat.Timestamp
			log.Printf("Heartbeat: %s", timestamp)
		case "entity":
			log.Printf("Entity: %s", *message.Entity.Entity.EntityID)
		default:
			log.Printf("Unknown event type: %s", message.Event)
		}
	}
}

```

```java title={"Java (REST)"} startLine={38} maxLines={20}
package org.example;

import com.anduril.AsyncLattice;
import com.anduril.resources.entities.requests.EntityStreamRequest;
import com.anduril.resources.entities.types.StreamEntitiesResponse;
import com.anduril.types.EntityStreamEvent;



/**
 * Example application that streams all entities using the Lattice SDK.
 */
public class StreamAllEntities {
    
    public static void main(String[] args) {
        // Get environment variables
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");
        
        // Check required variables
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
            
            System.out.println("Starting entity stream...");
            try {
                EntityStreamRequest request = EntityStreamRequest
                    .builder()
                    .preExistingOnly(false)
                    .build();

                client.entities().streamEntities(request)
                    .thenAccept(responses -> {
                        for (StreamEntitiesResponse response : responses) {
                            // If the event is of type heartbeat, log the timestamp.
                            if (response.getHeartbeat() != null && response.getHeartbeat().isPresent()) {
                                System.out.println("Heartbeat received: " + response.getHeartbeat().get().getTimestamp().get());
                            } 
                            // If the event is of type entity, log the entity ID.
                            else if (response.getEntity() != null && response.getEntity().isPresent()) {
                                EntityStreamEvent event = response.getEntity().get();
                                System.out.println("Entity: " + event.getEntity().get().getEntityId().get());
                            }
                        }
                    })
                    .exceptionally(ex -> {
                        System.err.println("Exception while streaming entities: " + ex.getMessage());
                        return null;
                    })
                    .join();
            } catch (Exception e) {
                System.err.println("Error in streaming loop: " + e.getMessage());
            }
        } catch (Exception e) {
            System.err.println("Failed to initialize: " + e.getMessage());
        }
    }
}
```

```py title={"Python (REST)"} startLine={26} maxLines={20}
from anduril import AsyncLattice
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
    
client = AsyncLattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    # Remove the following header if you are not developing on Sandboxes.
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)

async def app():
    try:
        event_stream = client.entities.stream_entities(pre_existing_only=False)
        async for event in event_stream:
            # If the event is of type heartbeat, log the timestamp.
            if event.event == "heartbeat":
                print(f'Heartbeat: {event.timestamp}')
            # If the event is of type entity, log the entity ID.
            elif event.entity:
                print(f'Entity: {event.entity.entity_id}')
    except asyncio.CancelledError:
        print("Streaming cancelled...")
    except Exception as error:
        print(f"Exception: {error}")
        
if __name__ == "__main__":
    asyncio.run(app())

```

```ts title={"Typescript (REST)"} startLine={27} maxLines={20}
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
        // Remove the following statement if you are not developing on Sandboxes.
        headers: {  "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    }
);

async function App() {
    try {
        // Start streaming entities
        const eventStream = await client.entities.streamEntities({ preExistingOnly: false });
        
        // Process the stream
        for await (const event of eventStream) {
            // Check if it's a heartbeat event.
            if (event.event === "heartbeat") {
                console.log(`Heartbeat received: ${event.timestamp}`);
                continue;
            }
            // Process entity event.
            const entity = event.entity;
            if (entity) {
                console.log(`Entity: ${entity.entityId}`);
            }
        }
    } catch (error) {
        console.log(`Exception while streaming entities: ${error}`);
    }
}

App();
```

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
		IncludeAllComponents: true,
	})
	if err != nil {
		log.Fatalf("Error creating stream: %v", err)
	}

	log.Println("Starting to receive stream data...")
	for {
		response, err := stream.Recv()
		if err == io.EOF {
			log.Println("End of stream reached")
			break
		}
		if err != nil {
			log.Fatalf("Error receiving stream data: %v", err)
		}

		// Process each entity.
		log.Printf("Streaming entity ID: %s", response.GetEntityEvent().GetEntity().EntityId)
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

    request = StreamEntityComponentsRequest(include_all_components=True)

    try:
        stream = client.StreamEntityComponents(request)
    except Exception as error:
        print(f"Error creating stream: {error}", file=sys.stderr)
        sys.exit(1)

    print("Starting to receive stream data...")

    try:
        for response in stream:
            entity = response.entity_event.entity
            print(f"Streaming entity ID: {entity.entity_id}")
        print("End of stream reached")
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

    // Subscribe to all components on every entity
    let request = Request::new(StreamEntityComponentsRequest {
        include_all_components: true,
        ..Default::default()
    });

    let mut stream = client.stream_entity_components(request).await?.into_inner();

    println!("Starting to receive stream data...");
    while let Some(response) = stream.message().await? {
        if let Some(entity) = response.entity_event.and_then(|e| e.entity) {
            println!("Streaming entity ID: {}", entity.entity_id);
        }
    }
    println!("End of stream reached");

    Ok(())
}

```

If successful, you get a stream of all entities as they are updated in Lattice:

```bash maxLines=3
Entity: Demo-Sim-Asset2
Entity: adsbEntity
Entity: esim.adsb.aus-4005
```

Use `componentsToInclude` and provide a list of components in `snake_case`.
For example, `aliases`, and `location_uncertainty`:

```go title={"Go (REST)"} startLine={40} maxLines={20}
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

```java title={"Java (REST)"} startLine={41} maxLines={20}
package org.example;
import java.util.Arrays;
import java.util.Optional;

import com.anduril.AsyncLattice;
import com.anduril.resources.entities.requests.EntityStreamRequest;
import com.anduril.resources.entities.types.StreamEntitiesResponse;
import com.anduril.types.EntityStreamEvent;



/**
 * Example application that streams all entities using the Lattice SDK.
 */
public class StreamSpecificComponents {
    
    public static void main(String[] args) {
        // Get environment variables
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");
        
        // Check required variables
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
            
            System.out.println("Starting entity stream...");
            
            try {
                EntityStreamRequest request = EntityStreamRequest.builder()
                    .preExistingOnly(false)
                    .componentsToInclude(Optional.of(Arrays.asList("aliases", "location_uncertainty")))
                    .build();

                client.entities().streamEntities(request)
                    .thenAccept(responses -> {
                        for (StreamEntitiesResponse response : responses) {
                            // If the event is of type heartbeat, log the timestamp.
                            if (response.getHeartbeat() != null && response.getHeartbeat().isPresent()) {
                                System.out.println("Heartbeat received: " + response.getHeartbeat().get().getTimestamp().get());
                            } 
                            // If the event is of type entity, log the entity ID.
                            else if (response.getEntity() != null && response.getEntity().isPresent()) {
                                EntityStreamEvent event = response.getEntity().get();
                                System.out.println("Entity: " + event.getEntity().get().getAliases().get().getName().get());
                            }
                        }
                    })
                    .exceptionally(ex -> {
                        System.err.println("Exception while streaming entities: " + ex.getMessage());
                        return null;
                    })
                    .join();
            } catch (Exception e) {
                System.err.println("Error in streaming loop: " + e.getMessage());
            }
        } catch (Exception e) {
            System.err.println("Failed to initialize: " + e.getMessage());
        }
    }
}
```

```py title={"Python (REST)"} startLine={26} maxLines={20}
from anduril import AsyncLattice
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

client = AsyncLattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    # Remove the following header if you are not developing on Sandboxes.
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)

async def app():
    try:
        event_stream = client.entities.stream_entities(
            pre_existing_only=False,
            components_to_include=["aliases", "location_uncertainty"]
        )
        async for event in event_stream:
            # If the event is of type heartbeat, log the timestamp.
            if event.event == "heartbeat":
                print(f'Heartbeat: {event.timestamp}')
            # If the event is of type entity, log the entity name.
            elif event.entity and event.entity.aliases:
                print(f'Entity: {event.entity.aliases.name}')
    except asyncio.CancelledError:
        print("Streaming cancelled...")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    asyncio.run(app())
    
```

```ts title={"Typescript (REST)"} startLine={27} maxLines={20}
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
        // Remove the following statement if you are not developing on Sandboxes.
        headers: {  "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    }
);

async function App() {
    try {
        // Start streaming entities
        const eventStream = await client.entities.streamEntities(
            {
                preExistingOnly: false,
                componentsToInclude: ["aliases", "location_uncertainty"]
            }
        );
        
        // Process the stream
        for await (const event of eventStream) {
            // Check if it's a heartbeat event.
            if (event.event === "heartbeat") {
                console.log(`Heartbeat received: ${event.timestamp}`);
                continue;
            }
            // Process entity event.
            const entity = event.entity;
            if (entity) {
                console.log(`Entity: ${entity.aliases?.name}`);
            }
        }
    } catch (error) {
        console.log(`Exception while streaming entities: ${error}`);
    }
}

App();
```

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

If you're directly invoking the [`streamEntities`](/reference/rest/entities/stream-entities) REST API using `curl` or another
similar tool, you must list the components using `camelCase`: `locationUncertainty`.

If successful, you receive a real-time stream of entities with `aliases` populated:

```bash maxLines=3
Entity: ADS-B: N113PF
Entity: DIVE
Entity: FISHING VESSEL (37958)
```

## What's next?

* Learn more about the Entities API in [REST](/reference/rest/entities/publish-entity) and
  [gRPC](/reference/grpc/anduril-entitymanager-v-1/entity-manager-api/anduril-entitymanager-v-1-publish-entity).
* Learn how to [Publish entities to Lattice](/guides/entities/publish).
* Check out the Lattice [sample apps](/samples/overview).