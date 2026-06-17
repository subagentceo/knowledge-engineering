> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Install

To integrate with Lattice using the Lattice SDK, set up your credentials and environment endpoint as
system variables, then install the SDK in a language, and protocol, of your choice. Lattice supports both
gRPC and REST as first-class protocols:

For more information on selecting the right protocol for your integration, see
[Choose a protocol](/guides/best-practices/choose-a-protocol).

[gRPC](https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go) | [REST](https://github.com/anduril/lattice-sdk-go)

[gRPC](https://buf.build/anduril/lattice-sdk/sdks/main:grpc/java) | [REST](https://github.com/anduril/lattice-sdk-java)

[gRPC](https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python) | [REST](https://github.com/anduril/lattice-sdk-python)

[gRPC](https://buf.build/anduril/lattice-sdk/sdks/main:rust)

[gRPC](https://buf.build/anduril/lattice-sdk/sdks/main:bufbuild/es) | [REST](https://github.com/anduril/lattice-sdk-javascript)

The gRPC examples in Lattice SDK documentation use Go, Python, and Rust.

If you're using another language, you can choose from up to 16 languages and various plugins to get your
[Lattice SDK artifacts for gRPC](https://buf.build/anduril/lattice-sdk/sdks/main:grpc).

## Before you begin

* If you are using Lattice Sandboxes, complete the steps in [Developing with Lattice Sandboxes](/guides/developer-tools/sandboxes)
  to create an environment and generate your credentials.

## Get the SDK for gRPC

Lattice provides a gRPC SDK in a variety of languages and plugins using the
[Lattice SDK Buf Schema Registry](https://buf.build/anduril/lattice-sdk/sdks/main:protobuf).
The following steps show how to get the Lattice SDK for gRPC in Go, Python, and Rust:

Install the [latest version](https://go.dev) of Go.

Create a new folder and initialize your project:

```bash
go mod init lattice-sdk-go-example
```

This generates a `go.mod` file in the project directory.

Install the generated Lattice SDK gRPC stubs using the [`grpc/go`](https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go) plugin:

```bash
go get buf.build/gen/go/anduril/lattice-sdk/grpc/go@v<latest-supported-version>
```

This installs the generated Lattice SDK gRPC stubs along with the required gRPC runtime dependencies and creates a `go.sum` file in the project directory.

Import Lattice and use the client:

```go title="main.go"
package main

import (
    "buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/entitymanager/v1/entitymanagerv1grpc"
)

func main() {
    client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)

    response, err := client.GetEntity(ctx, &entitymanagerv1.GetEntityRequest{
        EntityId: "<ENTITY_ID>",
    })
}
```

Install the [latest version](https://www.python.org/downloads/) of Python.

Lattice requires Python 3.7 or higher.

Create a new project directory and set up a virtual environment:

```bash
python -m venv lattice-sdk-example-env
source lattice-sdk-example-env/bin/activate
```

This creates an isolated Python environment for your project dependencies.

Use `pip` to install the generated Lattice SDK gRPC stubs with the
[`grpc/python`](https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python) plugin:

```bash
python3 -m pip install anduril-lattice-sdk-grpc-python==<latest-supported-version> --extra-index-url https://buf.build/gen/python
```

This installs the generated Lattice SDK gRPC stubs along with the required gRPC runtime dependencies.

* Check the SDK package's dependencies for the required versions of `grpcio` and `protobuf`
  and ensure your environment uses compatible versions.
* Some Buf plugins do not provide robust support for `Any` type messages. We recommend using the `grpc/python`, or the newer `connectrpc/python`,
  as they provide better support for the Lattice SDK messages and types.

Import Lattice and use the client:

```python
import grpc
from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import GetEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub

def main():
    # Create gRPC channel with SSL and authentication interceptor.
    credentials = grpc.ssl_channel_credentials()
    channel = grpc.intercept_channel(
        grpc.secure_channel("<LATTICE_ENDPOINT>", credentials),
        auth.create_metadata_interceptor()
    )

    # Create EntityManager API client stub.
    client = EntityManagerAPIStub(channel)

    request = GetEntityRequest(entity_id="<ENTITY_ID>")

    # Call the GetEntity RPC.
    response = client.GetEntity(request)

if __name__ == "__main__":
    main()
```

Install the [latest version](https://www.rust-lang.org/tools/install) of Rust.

Lattice requires Rust 1.70 or higher.

Create a new project directory and initialize your Cargo project:

```bash
cargo new lattice-sdk-rust-example
cd lattice-sdk-rust-example
```

Configure the buf.build registry by creating `.cargo/config.toml`:

```toml title=".cargo/config.toml"
[registries.buf]
index = "sparse+https://buf.build/gen/cargo/"
credential-provider = "cargo:token"
```

This enables Cargo to access the Buf Schema Registry for Lattice SDK packages.

Install the required `tokio` and `tonic` packages:

```bash
cargo add tokio --features full
cargo add tonic --features transport,tls-native-roots
```

Install the Lattice SDK for gRPC with the following plugins:

* [`community/neoeinstein-prost`](https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-prost)
* [`community/neoeinstein-tonic`](https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic), as well as

```bash
cargo add --registry buf anduril_lattice-sdk_community_neoeinstein-prost@<latest-supported-version>
cargo add --registry buf anduril_lattice-sdk_community_neoeinstein-tonic@<latest-supported-version>
```

Both buf.build packages are required: `neoeinstein-prost` provides Protobuf message types, while `neoeinstein-tonic` provides gRPC service clients.
The tonic client uses types from the prost package.

Import Lattice and use the client:

```rust title="src/main.rs"
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::entitymanager::v1::tonic::entity_manager_api_client::EntityManagerApiClient;
use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::GetEntityRequest;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create gRPC channel with TLS
    let tls_config = ClientTlsConfig::new().with_native_roots();
    let channel = Channel::from_shared(format!("https://{}", lattice_endpoint))?
        .tls_config(tls_config)?
        .connect()
        .await?;

    // Create the client
    let mut client = EntityManagerApiClient::with_interceptor(
        channel,
        move |mut req: Request<()>| {
            req.metadata_mut().insert("authorization", auth_header.clone());
            Ok(req)
        },
    );

    // Create request for a specific entity
    let request = Request::new(GetEntityRequest {
        entity_id: "<ENTITY_ID>".to_string(),
    });

    // Call the GetEntity RPC
    let response = client.get_entity(request).await?;

    Ok(())
}
```

For additional information on using the Buf Schema Registry, refer to the Buf [documentation](https://buf.build/docs/bsr/generated-sdks/tutorial/).

{/* vale off */}

## Get the SDK for REST

Lattice provides a REST SDK in the following languages:

Download the [latest version](https://go.dev/learn/) of Go.

Verify your installation:

```bash
go version
```

Install the latest version of the Lattice SDK:

```go
go get github.com/anduril/lattice-sdk-go/v3
```

Import Lattice and use the client:

```go title="main.go"
package main

import (
    "os"
    "fmt"
    "github.com/anduril/lattice-sdk-go/v3/client"
    "github.com/anduril/lattice-sdk-go/v3/option"
)

func main() {
    latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
    environmentToken := os.Getenv("ENVIRONMENT_TOKEN")

    client := client.NewClient(
        option.WithToken(environmentToken),
        option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
    )

    client.Entities.GetEntity(
        context.TODO(),
        "ENTITY_ID",
    )
}
```

Install a Java Development Kit (JDK).
We recommend using the latest version, for example [AdoptOpenJDK](https://adoptopenjdk.net/).

Install the latest [Gradle distribution](https://gradle.org/install).

Confirm your Gradle installation:

```bash
gradle --version
```

Initialize a project:

```bash
gradle init
```

Follow the interactive prompts to set up your project. Accept the default options
and choose `Groovy` as the Gradle build language.

Add the latest version of the Lattice SDK in `build.gradle`:

```gradle title="build.gradle"
dependencies {
    implementation 'com.anduril:lattice-sdk:+'
}
```

Import Lattice and use the client:

```java title="App.java"
package com.example;

import com.anduril.Lattice;

public class Example {
    public static void main(String[] args) {

        Lattice client = Lattice.builder()
            .url(endpoint)
            .token(token)
            .httpClient(httpClient)
            .build();
        Entity entity = client.entities().getEntity(ENTITY_ID);
    }
}
```

Install the [latest version](https://www.python.org/downloads/) of Python.

Lattice requires Python 3 or higher.

Use `pip` to install the Lattice SDK in Python:

```bash
pip install anduril-lattice-sdk
```

Import Lattice and use the client:

```python title="app.py"
from anduril import Lattice

client = Lattice(
    base_url=f"https://{lattice_endpoint}",
    token=environment_token
)
```

Install the latest versions of [Node.js](https://nodejs.org/en/download/package-manager) and the
[TypeScript compiler](https://www.typescriptlang.org/download/).

Create a new project folder, then initialize type definitions for Node.js:

```bash
npm init
```

Install the following dependencies:

```bash title="npm"
npm install @anduril-industries/lattice-sdk

```

```bash title="yarn"
yarn add @anduril-industries/lattice-sdk
```

Import Lattice and use the client:

```typescript title="App.ts"
import { LatticeClient } from "@anduril-industries/lattice-sdk";

const client = new LatticeClient(
    {
        baseUrl: `https://${latticeEndpoint}`,
        token: environmentToken
    }
);
```

## What's next?

* Start building and [publishing entities](/guides/entities/publish) into Lattice.
* Learn how to [watch entities, stream specific components, and apply filters](/guides/entities/watch).
* See the Lattice [sample applications](/samples/overview).