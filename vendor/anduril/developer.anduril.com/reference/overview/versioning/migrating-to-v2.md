> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Migrate to v2

The v2 release of the Lattice SDK represents a change in **SDK implementation**, and not in
the underlying Lattice services or APIs.

The underlying Lattice services continue to support both REST and gRPC protocols.

If you're an existing Lattice developer, you have three migration paths to choose from:

1. [**Continue using gRPC with Buf**](#option-1-use-v2-with-grpc) (recommended):
   If your apps use gRPC, or you have existing Lattice integrations that use gRPC, get the artifacts
   directly from the [Buf Schema Registry](https://buf.build/anduril/lattice-sdk/sdks/main:protobuf). If you prefer
   to continue using gRPC and want to generate clients compatible with Lattice SDK v1,
   use the following plugin versions when getting the artifacts from Buf:

   | Language              | Plugin version                                                                                                                                                                                                                                  |
   | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | C++                   | [grpc/cpp@1.68.0](https://buf.build/anduril/lattice-sdk/sdks/main:grpc/cpp?version=v1.68.0)                                                                                                                                                     |
   | Java                  | [grpc/java@1.54.1](https://buf.build/anduril/lattice-sdk/sdks/main:grpc/java?version=v1.54.1)                                                                                                                                                   |
   | Go                    | [grpc/go@1.5.1](https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go?version=v1.5.1)                                                                                                                                                         |
   | Javascript/Typescript | [es@2.2.0](https://buf.build/anduril/lattice-sdk/sdks/main:bufbuild/es?version=v2.2.0)                                                                                                                                                          |
   | Python                | [betterproto@2.0.0b7](https://github.com/danielgtaylor/python-betterproto/tree/v.2.0.0b7)                                                                                                                                                       |
   | Rust                  | [neoeinstein-prost@0.5.0](https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-prost?version=v0.5.0) and [neoeinstein-tonic@0.5.0](https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic?version=v0.5.0) |

   We do not recommend using `betterproto` moving forward, as the plugin does not support type `Any`.
   For Python, we recommend using the [`grpc/python`](https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python) plugin.

2. [**Migrate to SDK v2**](#option-2-use-v2-with-rest) (recommended):
   We recommend migrating to the REST-based SDKs for faster integration with Lattice, if you prefer working with JSON formats,
   or have existing APIs that use REST. REST offers a more streamlined setup experience and better browser compatibility.

3. **Maintain v1 usage** (not recommended): While you can continue using v1
   gRPC-based packages without changes, we do not recommend this approach. New versions of the Lattice SDK include
   new features and critical updates to existing resources.

Use the following table to help you decide which migration path is best for you:

<a id="migration-comparison-table" />

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

The following steps guide you through the first two recommended paths.

## Before you begin

* Check the version of the Lattice SDK package:

  ```bash title="Go"
  go list -m github.com/anduril/lattice-sdk-go
  ```

  ```xml title="Java"
  <!-- Check your pom.xml file -->
  <dependency>
    <groupId>com.anduril</groupId>
    <artifactId>lattice-sdk</artifactId>
    <version>1.1.0</version>
  </dependency>
  ```

  ```bash title="Python"
  pip freeze | grep anduril-lattice-sdk
  ```

  ```bash title="TypeScript"
  npm view @anduril-industries/lattice-sdk version
  ```

  If your version starts with `1.x.x`, continue with the migration guide:

## Option 1: Use v2 with gRPC

The following shows how to update from v1 to v2 gRPC implementation in Go:

Update your go.mod file to include the new version of the gRPC client:

```bash
go get buf.build/gen/go/anduril/lattice-sdk/grpc/go@v1.5.1-20250716223851-f58576d79c34.2
```

This fetches the specified version from the Buf Schema Registry.

Update your imports to use the new version of the client. The following `.diff` shows the necessary changes
needed to use `	grpc/go@1.5.1`, the same plugin version used for Lattice SDK v1:

```diff title={"Go"} maxLines={20}
--- v1.go
+++ v2.go
@@ -5,7 +5,8 @@ import (
 	"log"
 	"os"
 
-	entitymanagerv1 "github.com/anduril/lattice-sdk-go/src/anduril/entitymanager/v1"
+	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/entitymanager/v1/entitymanagerv1grpc"
+	entitymanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/entitymanager/v1"
 	"google.golang.org/grpc"
 	"google.golang.org/grpc/credentials"
 )
@@ -30,15 +31,16 @@ func main() {
 	if err != nil {
 		log.Fatalf("did not connect: %v", err)
 	}
+	defer conn.Close()
 
-	client := entitymanagerv1.NewEntityManagerAPIClient(conn)
+	client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)
 
-	request := &entitymanagerv1.GetEntityRequest{
+	response, err := client.GetEntity(ctx, &entitymanagerv1.GetEntityRequest{
 		EntityId: "<ENTITY_ID>",
-	}
-	response, err := client.GetEntity(ctx, request)
+	})
 
 	if err != nil {
		log.Fatalf("Error fetching entity: %v", err)
 	}
 	log.Printf("Response: %v", response)
```

## Option 2: Use v2 with REST

If you're migrating from the v1 gRPC SDK to the v2 REST SDK, follow these steps to update your implementation:

Follow the [SDK setup guide](/guides/getting-started/set-up#get-the-sdk-for-rest) to install the REST SDK for your preferred language.

For Go, do the following:

```go
go get github.com/anduril/lattice-sdk-go/v2
```

When migrating from the gRPC implementation to REST,
you'll need to update how you initialize and configure the client:

```diff title={"rest-go-v1-v2.diff"}
--- grpc_v1.go	2025-08-01 10:11:20
+++ rest_v2.go	2025-08-01 12:07:40
@@ -5,39 +5,26 @@
 	"log"
 	"os"
 
-	entitymanagerv1 "github.com/anduril/lattice-sdk-go/src/anduril/entitymanager/v1"
-	"google.golang.org/grpc"
-	"google.golang.org/grpc/credentials"
+	"github.com/anduril/lattice-sdk-go/v2/client"
+	"github.com/anduril/lattice-sdk-go/v2/option"
 )
 
 func main() {
 	ctx := context.Background()
 	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	environmentToken := os.Getenv("ENVIRONMENT_TOKEN")
 
 	if latticeEndpoint == "" || environmentToken == "" {
 		log.Fatalf("Missing required environment variables")
 	}
-	auth := &BearerTokenAuth{
-		Token: environmentToken,
-	}
 
-	opts := []grpc.DialOption{
-		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")),
-		grpc.WithPerRPCCredentials(auth),
-	}
-	conn, err := grpc.NewClient(latticeEndpoint, opts...)
-	if err != nil {
-		log.Fatalf("did not connect: %v", err)
-	}
+	client := client.NewClient(
+		option.WithToken(environmentToken),
+		option.WithBaseURL(latticeEndpoint),
+	)
 
-	client := entitymanagerv1.NewEntityManagerAPIClient(conn)
+	response, err := client.Entities.GetEntity(ctx, "<ENTITY_ID>")
 
-	request := &entitymanagerv1.GetEntityRequest{
-		EntityId: "<ENTITY_ID>",
-	}
-	response, err := client.GetEntity(ctx, request)
-
 	if err != nil {
 		log.Fatalf("Error fetching entity: %v", err)
 	}

```

## What's next?

* Review our [language-specific setup guides](/guides/getting-started/set-up) for detailed implementation instructions
* See the [API reference](/reference/overview/overview) and explore the Lattice APIs.
* Check out the [sample apps](/samples/overview) to see the SDK in action.