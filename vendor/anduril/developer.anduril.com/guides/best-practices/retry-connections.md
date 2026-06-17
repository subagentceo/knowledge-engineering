> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Retry connections

Production integrations send thousands of requests over networks that can drop connections, throttle traffic, or return transient errors.
A reusable retry utility lets you apply one consistent backoff policy across every API interaction instead of duplicating retry logic per call.

## Before you begin

* Complete the steps in [Set up](/guides/getting-started/set-up) to configure your environment and install the SDK.
* Decide which protocol you are using, REST or gRPC, as the error types and retry-eligible codes differ between protocols.

If you are using gRPC with client credentials, [set up the token refresh module](/guides/getting-started/authenticate#using-grpc) before running the examples on this page.

## What the SDK retries

Before building your own utility, understand what the SDK already handles so you do not retry the same error twice.

The **Lattice REST SDKs** retry automatically on HTTP `5xx`, `408`, `409`, and `429` responses. The SDK retry mechanism applies
exponential backoff starting at 1 second, with a maximum of 60 seconds, with ±20% jitter, and honors `Retry-After`, `retry-after-ms`,
and `X-RateLimit-Reset` headers. The default is 2 retries per call. You can override this per call with `request_options={"max_retries": N}`.

The **gRPC SDKs** do not implement retries automatically. You must implement retries for your Lattice integrations.

If you build a retry utility on top of the Lattice REST SDKs, set `request_options={"max_retries": 0}` on each SDK
call to delegate the entire retry policy to your utility. Without this, both layers retry independently, and
a single transient error can trigger up to `(sdk_retries + 1) x utility_retries` total attempts.

## Build a retry utility

A single helper function that wraps any API call gives you one place to tune backoff parameters, adjust error classification, and add observability
across your integration:

The following utility loops up to `max_retries` times, sleeping for an exponentially increasing backoff between attempts.
It re-raises immediately on errors that retrying will not fix.

```py title={"Python (REST)"} startLine={35} maxLines={19}
from anduril import Lattice, \
    Aliases, MilView, Location, Position, Ontology, Provenance
from anduril.core import ApiError
from datetime import datetime, timezone, timedelta
import asyncio
import httpx
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

MAX_RETRIES = 3
INITIAL_BACKOFF_SECONDS = 1.0

TERMINAL_STATUS_CODES = {400, 401, 403, 413}


async def retry_with_backoff(operation, *, max_retries=MAX_RETRIES, initial_backoff=INITIAL_BACKOFF_SECONDS):
    for attempt in range(max_retries):
        try:
            return operation()
        except ApiError as e:
            # Terminal 4xx errors mean the request itself is wrong; retrying will not help.
            if e.status_code in TERMINAL_STATUS_CODES:
                raise
            if attempt < max_retries - 1:
                backoff = initial_backoff * (2 ** attempt)
                await asyncio.sleep(backoff)
            else:
                raise
        except (httpx.ConnectError, httpx.RemoteProtocolError):
            if attempt < max_retries - 1:
                backoff = initial_backoff * (2 ** attempt)
                await asyncio.sleep(backoff)
            else:
                raise


entity_id = str(uuid4())
radius_degrees = 0.1
creation_time = datetime.now(timezone.utc)
count = 0.0


def publish_track():
    global count
    count += 0.1
    t = math.radians(count)
    latest_timestamp = datetime.now(timezone.utc)

    client.entities.publish_entity(
        entity_id=entity_id,
        description="Friendly airplane",
        is_live=True,
        aliases=Aliases(
            name="Airplane 1"
        ),
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
        ),
        # The utility owns the retry policy, so disable the SDK's built-in retry layer to avoid double-retrying.
        request_options={"max_retries": 0}
    )


async def app():
    try:
        while True:
            await retry_with_backoff(publish_track)
            print(f"Published track with entity ID: {entity_id}")
            await asyncio.sleep(5)
    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")


if __name__ == "__main__":
    asyncio.run(app())

```

```go title={"Go (gRPC)"} startLine={45} maxLines={26}
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
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// RetryOpts controls the retry behavior of retryWithBackoff.
type RetryOpts struct {
	MaxAttempts    int
	InitialBackoff time.Duration
}

// retryableCodes lists transient server-side and connectivity errors that are
// safe to retry. NotFound is included because a resource may not yet be visible
// due to eventual consistency. Terminal codes (InvalidArgument, PermissionDenied,
// Unauthenticated, FailedPrecondition, AlreadyExists) are intentionally absent —
// retrying them will not change the outcome.
var retryableCodes = map[codes.Code]bool{
	codes.Unavailable:       true,
	codes.DeadlineExceeded:  true,
	codes.ResourceExhausted: true,
	codes.Internal:          true,
	codes.Aborted:           true,
	codes.Unknown:           true,
	codes.NotFound:          true,
}

func retryWithBackoff(ctx context.Context, op func(context.Context) error, opts RetryOpts) error {
	for attempt := 0; attempt < opts.MaxAttempts; attempt++ {
		err := op(ctx)
		if err == nil {
			return nil
		}

		code := status.Code(err)
		if !retryableCodes[code] {
			// Terminal error — the request itself is wrong; retrying will not help.
			return err
		}

		if attempt == opts.MaxAttempts-1 {
			return err
		}

		backoff := opts.InitialBackoff * (1 << attempt)
		select {
		case <-time.After(backoff):
		case <-ctx.Done():
			return ctx.Err()
		}
	}
	return fmt.Errorf("retry: exceeded %d attempts", opts.MaxAttempts)
}

func main() {
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
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

	entityId := uuid.New().String()
	radiusDegrees := 0.1
	count := 0.0
	creationTime := time.Now().UTC()
	creationTimestamp := timestamppb.New(creationTime)

	for {
		latestTimestamp := time.Now().UTC()
		ctx := context.Background()

		count += 0.1
		t := math.Pi * count / 180.0

		entity := &entitymanagerv1.Entity{
			EntityId:    entityId,
			Description: "Friendly airplane",
			Aliases: &entitymanagerv1.Aliases{
				Name: "Airplane 1",
			},
			IsLive:      true,
			CreatedTime: creationTimestamp,
			ExpiryTime:  timestamppb.New(latestTimestamp.Add(5 * time.Minute)),
			Ontology: &entitymanagerv1.Ontology{
				Template:     entitymanagerv1.Template_TEMPLATE_TRACK,
				PlatformType: "Airplane",
			},
			MilView: &entitymanagerv1.MilView{
				Disposition: ontologyv1.Disposition_DISPOSITION_FRIENDLY,
				Environment: ontologyv1.Environment_ENVIRONMENT_AIR,
			},
			Location: &entitymanagerv1.Location{
				Position: &entitymanagerv1.Position{
					LatitudeDegrees:  50.91402185768586 + (radiusDegrees * math.Cos(t)),
					LongitudeDegrees: 0.79203612077257 + (radiusDegrees * math.Sin(t)),
				},
			},
			Provenance: &entitymanagerv1.Provenance{
				IntegrationName:  "your_integration_name",
				DataType:         "your_data_type",
				SourceUpdateTime: timestamppb.New(latestTimestamp),
			},
		}

		request := &entitymanagerv1.PublishEntityRequest{Entity: entity}

		err := retryWithBackoff(ctx, func(ctx context.Context) error {
			_, err := client.PublishEntity(ctx, request)
			return err
		}, RetryOpts{MaxAttempts: 3, InitialBackoff: time.Second})

		if err != nil {
			fmt.Printf("Publish failed after retries: %v\n", err)
		} else {
			fmt.Printf("Publishing track with entity ID: %s\n", entityId)
		}

		time.Sleep(5 * time.Second)
	}
}

```

```py title={"Python (gRPC)"} startLine={39} maxLines={18}
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

from anduril.entitymanager.v1.entity.pub_pb2 import Aliases, Entity, Provenance
from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import PublishEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub
from anduril.entitymanager.v1.location.pub_pb2 import Location, Position
from anduril.entitymanager.v1.ontology.pub_pb2 import MilView, Ontology
from anduril.entitymanager.v1.types.pub_pb2 import Template
from anduril.ontology.v1.type.pub_pb2 import Disposition, Environment


# Transient server-side and connectivity errors that are safe to retry.
# NOT_FOUND is included because a resource may not yet be visible due to eventual
# consistency. Terminal codes (INVALID_ARGUMENT, PERMISSION_DENIED, UNAUTHENTICATED,
# FAILED_PRECONDITION, ALREADY_EXISTS) are intentionally absent — retrying them
# will not change the outcome.
RETRYABLE_CODES = {
    grpc.StatusCode.UNAVAILABLE,
    grpc.StatusCode.DEADLINE_EXCEEDED,
    grpc.StatusCode.RESOURCE_EXHAUSTED,
    grpc.StatusCode.INTERNAL,
    grpc.StatusCode.ABORTED,
    grpc.StatusCode.UNKNOWN,
    grpc.StatusCode.NOT_FOUND,
}


def retry_with_backoff(op, max_attempts=3, initial_backoff_sec=1.0):
    """Retry a callable with exponential backoff on retryable gRPC errors."""
    last_error: Exception | None = None
    for attempt in range(max_attempts):
        try:
            return op()
        except grpc.RpcError as error:
            last_error = error
            code = error.code() if hasattr(error, "code") else None
            if code not in RETRYABLE_CODES:
                # Terminal error — the request itself is wrong; retrying will not help.
                raise
            if attempt == max_attempts - 1:
                raise
            backoff = initial_backoff_sec * (1 << attempt)
            time.sleep(backoff)
    raise RuntimeError(f"retry: exceeded {max_attempts} attempts") from last_error


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
    radius_degrees = 0.1
    count = 0.0
    creation_timestamp = to_timestamp(datetime.now(timezone.utc))

    while True:
        latest = datetime.now(timezone.utc)
        latest_ts = to_timestamp(latest)
        expiry_ts = to_timestamp(latest + timedelta(minutes=5))

        count += 0.1
        t = math.pi * count / 180.0

        entity = Entity(
            entity_id=entity_id,
            description="Friendly airplane",
            aliases=Aliases(name="Airplane 1"),
            is_live=True,
            created_time=creation_timestamp,
            expiry_time=expiry_ts,
            ontology=Ontology(template=Template.TEMPLATE_TRACK, platform_type="Airplane"),
            mil_view=MilView(
                disposition=Disposition.DISPOSITION_FRIENDLY,
                environment=Environment.ENVIRONMENT_AIR,
            ),
            location=Location(
                position=Position(
                    latitude_degrees=50.91402185768586 + (radius_degrees * math.cos(t)),
                    longitude_degrees=0.79203612077257 + (radius_degrees * math.sin(t)),
                ),
            ),
            provenance=Provenance(
                integration_name="your_integration_name",
                data_type="your_data_type",
                source_update_time=latest_ts,
            ),
        )

        request = PublishEntityRequest(entity=entity)

        try:
            retry_with_backoff(lambda: client.PublishEntity(request))
            print(f"Publishing track with entity ID: {entity_id}")
        except Exception as error:
            print(f"Publish failed after retries: {error}", file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={41} maxLines={26}
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
use tonic::service::interceptor::InterceptedService;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::{Code, Request};
use uuid::Uuid;

use std::env;
use std::f64::consts::PI;
use std::future::Future;
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

// RetryOpts controls the retry behavior of retry_with_backoff.
#[derive(Clone, Copy)]
struct RetryOpts {
    max_attempts: u32,
    initial_backoff: Duration,
}

// retryable_code lists transient server-side and connectivity errors that are
// safe to retry. NotFound is included because a resource may not yet be visible
// due to eventual consistency. Terminal codes (InvalidArgument, PermissionDenied,
// Unauthenticated, FailedPrecondition, AlreadyExists) are intentionally absent —
// retrying them will not change the outcome.
fn is_retryable(code: Code) -> bool {
    matches!(
        code,
        Code::Unavailable
            | Code::DeadlineExceeded
            | Code::ResourceExhausted
            | Code::Internal
            | Code::Aborted
            | Code::Unknown
            | Code::NotFound
    )
}

async fn retry_with_backoff<F, Fut, T>(
    mut op: F,
    opts: RetryOpts,
) -> Result<T, tonic::Status>
where
    F: FnMut() -> Fut,
    Fut: Future<Output = Result<T, tonic::Status>>,
{
    let mut attempt = 0;
    loop {
        match op().await {
            Ok(value) => return Ok(value),
            Err(status) => {
                if !is_retryable(status.code()) {
                    // Terminal error — the request itself is wrong; retrying will not help.
                    return Err(status);
                }
                attempt += 1;
                if attempt >= opts.max_attempts {
                    return Err(status);
                }
                let backoff = opts.initial_backoff * (1 << (attempt - 1));
                tokio::time::sleep(backoff).await;
            }
        }
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

    let client: EntityManagerApiClient<InterceptedService<_, _>> =
        EntityManagerApiClient::with_interceptor(
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
    let radius_degrees = 0.1;
    let mut count = 0.0_f64;
    let creation_timestamp = now_timestamp();

    loop {
        let latest_timestamp = now_timestamp();
        count += 0.1;
        let t = PI * count / 180.0;

        let entity = Entity {
            entity_id: entity_id.clone(),
            description: "Friendly airplane".to_string(),
            aliases: Some(Aliases {
                name: "Airplane 1".to_string(),
                ..Default::default()
            }),
            is_live: true,
            created_time: Some(creation_timestamp.clone()),
            expiry_time: Some(add_seconds(&latest_timestamp, 300)),
            ontology: Some(Ontology {
                template: Template::Track as i32,
                platform_type: "Airplane".to_string(),
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

        let publish_request = PublishEntityRequest {
            entity: Some(entity),
        };

        let result = retry_with_backoff(
            || {
                let mut client = client.clone();
                let request = publish_request.clone();
                async move { client.publish_entity(Request::new(request)).await.map(|_| ()) }
            },
            RetryOpts {
                max_attempts: 3,
                initial_backoff: Duration::from_secs(1),
            },
        )
        .await;

        match result {
            Ok(_) => println!("Publishing track with entity ID: {}", entity_id),
            Err(e) => eprintln!("Publish failed after retries: {}", e),
        }

        tokio::time::sleep(Duration::from_secs(5)).await;
    }
}

```

Not all errors benefit from a retry. Retrying a malformed request or an unauthorized call wastes time and can obscure bugs.
Classify errors into two buckets, **retryable** and **terminal**, before deciding whether to back off or re-raise immediately.

&#x20;**The REST SDKs**

This utility catches two broad error categories:

* `anduril.ApiError` with a `status_code` — Inspect the code to decide.
* `httpx.ConnectError` and `httpx.RemoteProtocolError` — Low-level transport failures that are always retryable.

Retryable status codes that should be retried:

* `404` Not Found — The resource might not yet be visible due to eventual consistency.
* `408` Request Timeout — The server did not receive the complete request in time, often due to transient network latency.
* `409` Conflict — A concurrent write contended with this request, so retrying after a short backoff often succeeds.
* `429` Too Many Requests — The client has been rate-limited, so back off before retrying.
* `5xx` Server Error — The server encountered a transient failure that might clear on a subsequent attempt.

Terminal status codes that should **not** be retried:

* `400` Bad Request — The payload is malformed.
* `401` Unauthorized — Refresh credentials before retrying.
* `403` Forbidden — Retrying will not change permissions.
* `413` Payload Too Large — Reduce the payload size.

&#x20;**The gRPC SDKs**

Extract the gRPC status code with `status.Code(err)` and check it against a `map[codes.Code]bool`.

Retryable codes that should be retried:

* `UNAVAILABLE` — The server is temporarily unreachable.
* `DEADLINE_EXCEEDED` — The call timed out before a response was received.
* `RESOURCE_EXHAUSTED` — The client has been rate-limited or has exceeded a quota.
* `INTERNAL` — The server encountered an unspecified failure that may be transient.
* `ABORTED` — A concurrency conflict occurred, so retrying after a short backoff often succeeds.
* `UNKNOWN` — An unrecognized error was returned, so treat it as transient.
* `NOT_FOUND` — The resource might not yet be visible due to eventual consistency.

Terminal codes that should **not** be retried:

* `INVALID_ARGUMENT` — Fix the request before retrying.
* `PERMISSION_DENIED` — Retrying will not grant access.
* `UNAUTHENTICATED` — Refresh the token before retrying.
* `FAILED_PRECONDITION` — A required precondition is not met.
* `ALREADY_EXISTS` — The resource already exists.

Wrap the API call in a zero-argument, callable function, and pass it to the utility.
The utility handles timing and error classification.

```py title={"Python (REST)"} startLine={101} maxLines={10}
from anduril import Lattice, \
    Aliases, MilView, Location, Position, Ontology, Provenance
from anduril.core import ApiError
from datetime import datetime, timezone, timedelta
import asyncio
import httpx
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

MAX_RETRIES = 3
INITIAL_BACKOFF_SECONDS = 1.0

TERMINAL_STATUS_CODES = {400, 401, 403, 413}


async def retry_with_backoff(operation, *, max_retries=MAX_RETRIES, initial_backoff=INITIAL_BACKOFF_SECONDS):
    for attempt in range(max_retries):
        try:
            return operation()
        except ApiError as e:
            # Terminal 4xx errors mean the request itself is wrong; retrying will not help.
            if e.status_code in TERMINAL_STATUS_CODES:
                raise
            if attempt < max_retries - 1:
                backoff = initial_backoff * (2 ** attempt)
                await asyncio.sleep(backoff)
            else:
                raise
        except (httpx.ConnectError, httpx.RemoteProtocolError):
            if attempt < max_retries - 1:
                backoff = initial_backoff * (2 ** attempt)
                await asyncio.sleep(backoff)
            else:
                raise


entity_id = str(uuid4())
radius_degrees = 0.1
creation_time = datetime.now(timezone.utc)
count = 0.0


def publish_track():
    global count
    count += 0.1
    t = math.radians(count)
    latest_timestamp = datetime.now(timezone.utc)

    client.entities.publish_entity(
        entity_id=entity_id,
        description="Friendly airplane",
        is_live=True,
        aliases=Aliases(
            name="Airplane 1"
        ),
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
        ),
        # The utility owns the retry policy, so disable the SDK's built-in retry layer to avoid double-retrying.
        request_options={"max_retries": 0}
    )


async def app():
    try:
        while True:
            await retry_with_backoff(publish_track)
            print(f"Published track with entity ID: {entity_id}")
            await asyncio.sleep(5)
    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")


if __name__ == "__main__":
    asyncio.run(app())

```

```go title={"Go (gRPC)"} startLine={148} maxLines={10}
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
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// RetryOpts controls the retry behavior of retryWithBackoff.
type RetryOpts struct {
	MaxAttempts    int
	InitialBackoff time.Duration
}

// retryableCodes lists transient server-side and connectivity errors that are
// safe to retry. NotFound is included because a resource may not yet be visible
// due to eventual consistency. Terminal codes (InvalidArgument, PermissionDenied,
// Unauthenticated, FailedPrecondition, AlreadyExists) are intentionally absent —
// retrying them will not change the outcome.
var retryableCodes = map[codes.Code]bool{
	codes.Unavailable:       true,
	codes.DeadlineExceeded:  true,
	codes.ResourceExhausted: true,
	codes.Internal:          true,
	codes.Aborted:           true,
	codes.Unknown:           true,
	codes.NotFound:          true,
}

func retryWithBackoff(ctx context.Context, op func(context.Context) error, opts RetryOpts) error {
	for attempt := 0; attempt < opts.MaxAttempts; attempt++ {
		err := op(ctx)
		if err == nil {
			return nil
		}

		code := status.Code(err)
		if !retryableCodes[code] {
			// Terminal error — the request itself is wrong; retrying will not help.
			return err
		}

		if attempt == opts.MaxAttempts-1 {
			return err
		}

		backoff := opts.InitialBackoff * (1 << attempt)
		select {
		case <-time.After(backoff):
		case <-ctx.Done():
			return ctx.Err()
		}
	}
	return fmt.Errorf("retry: exceeded %d attempts", opts.MaxAttempts)
}

func main() {
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		fmt.Println("Missing required environment variables")
		os.Exit(1)
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

	entityId := uuid.New().String()
	radiusDegrees := 0.1
	count := 0.0
	creationTime := time.Now().UTC()
	creationTimestamp := timestamppb.New(creationTime)

	for {
		latestTimestamp := time.Now().UTC()
		ctx := context.Background()

		count += 0.1
		t := math.Pi * count / 180.0

		entity := &entitymanagerv1.Entity{
			EntityId:    entityId,
			Description: "Friendly airplane",
			Aliases: &entitymanagerv1.Aliases{
				Name: "Airplane 1",
			},
			IsLive:      true,
			CreatedTime: creationTimestamp,
			ExpiryTime:  timestamppb.New(latestTimestamp.Add(5 * time.Minute)),
			Ontology: &entitymanagerv1.Ontology{
				Template:     entitymanagerv1.Template_TEMPLATE_TRACK,
				PlatformType: "Airplane",
			},
			MilView: &entitymanagerv1.MilView{
				Disposition: ontologyv1.Disposition_DISPOSITION_FRIENDLY,
				Environment: ontologyv1.Environment_ENVIRONMENT_AIR,
			},
			Location: &entitymanagerv1.Location{
				Position: &entitymanagerv1.Position{
					LatitudeDegrees:  50.91402185768586 + (radiusDegrees * math.Cos(t)),
					LongitudeDegrees: 0.79203612077257 + (radiusDegrees * math.Sin(t)),
				},
			},
			Provenance: &entitymanagerv1.Provenance{
				IntegrationName:  "your_integration_name",
				DataType:         "your_data_type",
				SourceUpdateTime: timestamppb.New(latestTimestamp),
			},
		}

		request := &entitymanagerv1.PublishEntityRequest{Entity: entity}

		err := retryWithBackoff(ctx, func(ctx context.Context) error {
			_, err := client.PublishEntity(ctx, request)
			return err
		}, RetryOpts{MaxAttempts: 3, InitialBackoff: time.Second})

		if err != nil {
			fmt.Printf("Publish failed after retries: %v\n", err)
		} else {
			fmt.Printf("Publishing track with entity ID: %s\n", entityId)
		}

		time.Sleep(5 * time.Second)
	}
}

```

```py title={"Python (gRPC)"} startLine={130} maxLines={7}
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

from anduril.entitymanager.v1.entity.pub_pb2 import Aliases, Entity, Provenance
from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import PublishEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub
from anduril.entitymanager.v1.location.pub_pb2 import Location, Position
from anduril.entitymanager.v1.ontology.pub_pb2 import MilView, Ontology
from anduril.entitymanager.v1.types.pub_pb2 import Template
from anduril.ontology.v1.type.pub_pb2 import Disposition, Environment


# Transient server-side and connectivity errors that are safe to retry.
# NOT_FOUND is included because a resource may not yet be visible due to eventual
# consistency. Terminal codes (INVALID_ARGUMENT, PERMISSION_DENIED, UNAUTHENTICATED,
# FAILED_PRECONDITION, ALREADY_EXISTS) are intentionally absent — retrying them
# will not change the outcome.
RETRYABLE_CODES = {
    grpc.StatusCode.UNAVAILABLE,
    grpc.StatusCode.DEADLINE_EXCEEDED,
    grpc.StatusCode.RESOURCE_EXHAUSTED,
    grpc.StatusCode.INTERNAL,
    grpc.StatusCode.ABORTED,
    grpc.StatusCode.UNKNOWN,
    grpc.StatusCode.NOT_FOUND,
}


def retry_with_backoff(op, max_attempts=3, initial_backoff_sec=1.0):
    """Retry a callable with exponential backoff on retryable gRPC errors."""
    last_error: Exception | None = None
    for attempt in range(max_attempts):
        try:
            return op()
        except grpc.RpcError as error:
            last_error = error
            code = error.code() if hasattr(error, "code") else None
            if code not in RETRYABLE_CODES:
                # Terminal error — the request itself is wrong; retrying will not help.
                raise
            if attempt == max_attempts - 1:
                raise
            backoff = initial_backoff_sec * (1 << attempt)
            time.sleep(backoff)
    raise RuntimeError(f"retry: exceeded {max_attempts} attempts") from last_error


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
    radius_degrees = 0.1
    count = 0.0
    creation_timestamp = to_timestamp(datetime.now(timezone.utc))

    while True:
        latest = datetime.now(timezone.utc)
        latest_ts = to_timestamp(latest)
        expiry_ts = to_timestamp(latest + timedelta(minutes=5))

        count += 0.1
        t = math.pi * count / 180.0

        entity = Entity(
            entity_id=entity_id,
            description="Friendly airplane",
            aliases=Aliases(name="Airplane 1"),
            is_live=True,
            created_time=creation_timestamp,
            expiry_time=expiry_ts,
            ontology=Ontology(template=Template.TEMPLATE_TRACK, platform_type="Airplane"),
            mil_view=MilView(
                disposition=Disposition.DISPOSITION_FRIENDLY,
                environment=Environment.ENVIRONMENT_AIR,
            ),
            location=Location(
                position=Position(
                    latitude_degrees=50.91402185768586 + (radius_degrees * math.cos(t)),
                    longitude_degrees=0.79203612077257 + (radius_degrees * math.sin(t)),
                ),
            ),
            provenance=Provenance(
                integration_name="your_integration_name",
                data_type="your_data_type",
                source_update_time=latest_ts,
            ),
        )

        request = PublishEntityRequest(entity=entity)

        try:
            retry_with_backoff(lambda: client.PublishEntity(request))
            print(f"Publishing track with entity ID: {entity_id}")
        except Exception as error:
            print(f"Publish failed after retries: {error}", file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={186} maxLines={10}
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
use tonic::service::interceptor::InterceptedService;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::{Code, Request};
use uuid::Uuid;

use std::env;
use std::f64::consts::PI;
use std::future::Future;
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

// RetryOpts controls the retry behavior of retry_with_backoff.
#[derive(Clone, Copy)]
struct RetryOpts {
    max_attempts: u32,
    initial_backoff: Duration,
}

// retryable_code lists transient server-side and connectivity errors that are
// safe to retry. NotFound is included because a resource may not yet be visible
// due to eventual consistency. Terminal codes (InvalidArgument, PermissionDenied,
// Unauthenticated, FailedPrecondition, AlreadyExists) are intentionally absent —
// retrying them will not change the outcome.
fn is_retryable(code: Code) -> bool {
    matches!(
        code,
        Code::Unavailable
            | Code::DeadlineExceeded
            | Code::ResourceExhausted
            | Code::Internal
            | Code::Aborted
            | Code::Unknown
            | Code::NotFound
    )
}

async fn retry_with_backoff<F, Fut, T>(
    mut op: F,
    opts: RetryOpts,
) -> Result<T, tonic::Status>
where
    F: FnMut() -> Fut,
    Fut: Future<Output = Result<T, tonic::Status>>,
{
    let mut attempt = 0;
    loop {
        match op().await {
            Ok(value) => return Ok(value),
            Err(status) => {
                if !is_retryable(status.code()) {
                    // Terminal error — the request itself is wrong; retrying will not help.
                    return Err(status);
                }
                attempt += 1;
                if attempt >= opts.max_attempts {
                    return Err(status);
                }
                let backoff = opts.initial_backoff * (1 << (attempt - 1));
                tokio::time::sleep(backoff).await;
            }
        }
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

    let client: EntityManagerApiClient<InterceptedService<_, _>> =
        EntityManagerApiClient::with_interceptor(
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
    let radius_degrees = 0.1;
    let mut count = 0.0_f64;
    let creation_timestamp = now_timestamp();

    loop {
        let latest_timestamp = now_timestamp();
        count += 0.1;
        let t = PI * count / 180.0;

        let entity = Entity {
            entity_id: entity_id.clone(),
            description: "Friendly airplane".to_string(),
            aliases: Some(Aliases {
                name: "Airplane 1".to_string(),
                ..Default::default()
            }),
            is_live: true,
            created_time: Some(creation_timestamp.clone()),
            expiry_time: Some(add_seconds(&latest_timestamp, 300)),
            ontology: Some(Ontology {
                template: Template::Track as i32,
                platform_type: "Airplane".to_string(),
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

        let publish_request = PublishEntityRequest {
            entity: Some(entity),
        };

        let result = retry_with_backoff(
            || {
                let mut client = client.clone();
                let request = publish_request.clone();
                async move { client.publish_entity(Request::new(request)).await.map(|_| ()) }
            },
            RetryOpts {
                max_attempts: 3,
                initial_backoff: Duration::from_secs(1),
            },
        )
        .await;

        match result {
            Ok(_) => println!("Publishing track with entity ID: {}", entity_id),
            Err(e) => eprintln!("Publish failed after retries: {}", e),
        }

        tokio::time::sleep(Duration::from_secs(5)).await;
    }
}

```

A single utility keeps retry behavior consistent across your integration, so tuning the backoff policy or adding logging requires only a change in one place.

## What's next

* Learn how to [publish entities](/guides/entities/publish) to Lattice.
* Review [Authentication](/guides/getting-started/authenticate) to understand how credentials are refreshed.
* Check [Choose a protocol](/guides/best-practices/choose-a-protocol) to decide between REST and gRPC for your integration.