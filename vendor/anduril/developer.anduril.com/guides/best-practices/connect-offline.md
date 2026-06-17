> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Connect to offline environments

By default, the Lattice SDK validates TLS certificates to ensure a secure connection.

If the Lattice environment you are integrating with does not have access to the internet and you are connecting
to it on a local network, you can use self-signed certificates.

This guide explains how to configure the SDK to use self-signed certificates.

## Before you begin

* Complete the steps in [Set up](/guides/getting-started/set-up) to configure your environment variables:
  `LATTICE_ENDPOINT`, `LATTICE_CLIENT_ID`, and `LATTICE_CLIENT_SECRET`.

* Verify that you have access to your Lattice environment and can connect to it. If you cannot access the environment,
  contact your Anduril representative for help.

* Set a `SKIP_TLS_VERIFY` environment variable:

  ```bash title="Bash"
  export SKIP_TLS_VERIFY=true
  ```

  ```ps title="PowerShell"
  setx SKIP_TLS_VERIFY true
  ```

If you are using gRPC with client credentials, [set up the token refresh module](/guides/getting-started/authenticate#using-grpc) before running the examples on this page.

## Configure your client

By default, the SDK validates certificates against the system's trusted Certificate Authority (CA) store.

This is the recommended configuration for any non-development environment. In development environments where CA infrastructure is not accessible,
configure a custom HTTP client to accept self-signed certificates:

Import your environment variables and Initialize the client. In the following, `SKIP_TLS_VERIFY` is a boolean set up as an environment
variable. You can achieve the same result using a local `.env` file, as well:

```go title={"Go (REST)"} startLine={14} maxLines={25}
package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"net/http"
	"os"

	Lattice "github.com/anduril/lattice-sdk-go/v4"
	"github.com/anduril/lattice-sdk-go/v4/client"
	"github.com/anduril/lattice-sdk-go/v4/option"
)

func main() {
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Load the SKIP_TLS_VERIFY variable
	skipTLSVerify := os.Getenv("SKIP_TLS_VERIFY") == "true"

	// Initialize the client
	LatticeClient, err := createLatticeClient(latticeEndpoint, clientID, clientSecret,
		sandboxesToken,
		skipTLSVerify,
	)
	if err != nil {
		fmt.Printf("Error creating Lattice client: %v\n", err)
		os.Exit(1)
	}

	// Use the client
	ctx := context.Background()
	entity, err := LatticeClient.Entities.GetEntity(
		ctx,
		&Lattice.GetEntityRequest{
			EntityID: "Demo-Sim-Asset1",
		},
	)

	if err != nil {
		fmt.Printf("Error fetching entity: %v\n", err)
	} else {
		fmt.Printf("Asset name     | %s\n", *entity.GetAliases().GetName())
		fmt.Printf("Asset location | %f, %f\n", *entity.GetLocation().GetPosition().GetLatitudeDegrees(),
			*entity.GetLocation().GetPosition().GetLongitudeDegrees())
	}
}

func createLatticeClient(endpoint string, clientID string, clientSecret string,
	sandboxesToken string,
	skipTLSVerify bool,
) (*client.Client, error) {

	headers := http.Header{}
	if sandboxesToken != "" {
		headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))
	}

	// Configure the InsecureSkipVerify option
	httpClient := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{
				InsecureSkipVerify: skipTLSVerify,
			},
		},
	}

	latticeClient := client.NewClient(
		option.WithClientCredentials(clientID, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", endpoint)),
		option.WithHTTPHeader(headers),
		option.WithHTTPClient(httpClient),
	)

	return latticeClient, nil
}

```

```java title={"Java (REST)"} startLine={18} maxLines={25}
package org.example;

import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import com.anduril.Lattice;
import okhttp3.OkHttpClient;

/**
 * Example application demonstrating TLS configuration for air-gapped environments.
 */
public class SelfSignedCertificate {

    public static void main(String[] args) {
        // Configuration
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");

        // Load the SKIP_TLS_VERIFY variable
        boolean skipTlsVerify = Boolean.parseBoolean(System.getenv("SKIP_TLS_VERIFY"));

        // Create Lattice client
        Lattice client = createLatticeClient(
            endpoint,
            clientId,
            clientSecret,
            sandboxesToken,
            skipTlsVerify
        );

        System.out.println("Lattice client initialized: https://" + endpoint);

        // Use the client
        try {
            com.anduril.types.Entity entity = client.entities().getEntity("<ENTITY_ID>");
            System.out.println("Successfully fetched entity: " + entity.getEntityId().get());
        } catch (Exception e) {
            System.err.println("Error fetching entity: " + e.getMessage());
        }
    }

    private static Lattice createLatticeClient(
        String endpoint,
        String clientId,
        String clientSecret,
        String sandboxesToken,
        boolean skipTlsVerify
    ) {
        if (!endpoint.startsWith("https://")) {
            endpoint = "https://" + endpoint;
        }

        // Configure HTTP client based on TLS verification setting
        OkHttpClient httpClient;

        if (skipTlsVerify) {
            try {
                // Create a trust manager that accepts all certificates
                TrustManager[] trustAllCerts = new TrustManager[]{
                    new X509TrustManager() {
                        @Override
                        public X509Certificate[] getAcceptedIssuers() {
                            return new X509Certificate[0];
                        }

                        @Override
                        public void checkClientTrusted(X509Certificate[] certs, String authType) {
                        }

                        @Override
                        public void checkServerTrusted(X509Certificate[] certs, String authType) {
                        }
                    }
                };

                // Create SSL context with trust-all manager
                SSLContext sslContext = SSLContext.getInstance("TLS");
                sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

                // Create OkHttpClient with TLS verification disabled
                httpClient = new OkHttpClient.Builder()
                    .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCerts[0])
                    .hostnameVerifier((hostname, session) -> true)
                    .build();
            } catch (Exception e) {
                throw new RuntimeException("Failed to configure SSL context", e);
            }
        } else {
            // Create OkHttpClient with default TLS verification
            httpClient = new OkHttpClient.Builder()
                .build();
        }

        // Create and return Lattice client with configured httpClient
        return Lattice.builder()
            .url(endpoint)
            .credentials(clientId, clientSecret)
            .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
            .httpClient(httpClient)
            .build();
    }
}

```

```py title={"Python (REST)"} startLine={6} maxLines={25}
from anduril import Lattice
import os
import ssl
import httpx

# Configuration
lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')
sandboxes_token = os.getenv('SANDBOXES_TOKEN')

# Load the SKIP_TLS_VERIFY variable
skip_tls_verify = os.getenv('SKIP_TLS_VERIFY', '').lower() == 'true'

def create_lattice_client(
    endpoint: str,
    client_id: str,
    client_secret: str,
    sandboxes_token: str,
    skip_tls_verify: bool = False
) -> Lattice:
    
    if not endpoint.startswith("https://"):
        endpoint = "https://" + endpoint

    # Base configuration
    base_url = endpoint

    # Configure HTTP client based on TLS verification setting
    if skip_tls_verify:
        # Create SSL context that doesn't verify certificates
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        # Create httpx client with TLS verification disabled
        http_client = httpx.Client(verify=ssl_context)
    else:
        # Create httpx client with default TLS verification
        http_client = httpx.Client()

    # Create and return Lattice client with configured httpx_client
    return Lattice(
        base_url=base_url,
        client_id=client_id,
        client_secret=client_secret,
        httpx_client=http_client,
        headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
    )

if not lattice_endpoint or not client_id or not client_secret or not sandboxes_token:
    print("Missing required environment variables.")
    raise SystemExit(1)

# Create Lattice client
client = create_lattice_client(
    lattice_endpoint,
    client_id,
    client_secret,
    sandboxes_token,
    skip_tls_verify
)

print(f"Lattice client initialized: {lattice_endpoint}")

# Use the client
try:
    # Replace <ENTITY_ID> with the ID of an entity in your environment.
    entity = client.entities.get_entity(
        entity_id="<ENTITY_ID>"
    )
    print(f"Successfully fetched entity: {entity.entity_id}")
except Exception as error:
    print(f"Error fetching entity: {error}")

```

```ts title={"TypeScript (REST)"} startLine={5} maxLines={25}
import { LatticeClient } from "@anduril-industries/lattice-sdk";
import https from "https";


const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;
// Remove sandboxesToken from the following statement if you are not developing on Sandboxes.
const sandboxesToken = process.env.SANDBOXES_TOKEN;

if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.log('Missing required environment variables.');
    process.exit(1);
}
// Load the SKIP_TLS_VERIFY variable
const skipTlsVerify = process.env.SKIP_TLS_VERIFY === "true";

function createLatticeClient(
    endpoint: string,
    clientId: string,
    clientSecret: string,
    sandboxesToken: string,
    skipTlsVerify: boolean
): LatticeClient {
    if (!endpoint.startsWith("https://")) {
        endpoint = "https://" + endpoint;
    }

    const baseUrl = endpoint;

    // Configure fetch function based on TLS verification setting
    let fetchFunction: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | undefined;

    if (skipTlsVerify) {
        // Create HTTPS agent with TLS verification disabled
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        });

        fetchFunction = async (input: RequestInfo | URL, init?: RequestInit) => {
            const response = await fetch(input, {
                ...init,
                agent: httpsAgent
            } as RequestInit);
            return response;
        };
    } else {
        // Use default fetch with standard TLS verification
        fetchFunction = fetch;
    }

    // Create and return Lattice client with configured fetch function
    return new LatticeClient({
        baseUrl: baseUrl,
        clientId: clientId,
        clientSecret: clientSecret,
        fetch: fetchFunction,
        // Remove the following if you are not developing on Sandboxes.
        headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    });
}

// Create Lattice client
const client = createLatticeClient(
    latticeEndpoint,
    clientId,
    clientSecret,
    sandboxesToken,
    skipTlsVerify
);

console.log(`Lattice client initialized: ${latticeEndpoint}`);

// Use the client
(async () => {
    try {
        const entity = await client.entities.getEntity({
            // Replace <ENTITY_ID> with the ID of an entity in your environment.
            entityId: "<ENTITY_ID>"
        });
        console.log(`Successfully fetched entity: ${entity.entityId}`);
    } catch (error) {
        console.log(`Error fetching entity: ${error}`);
    }
})();

```

```go title={"Go (gRPC)"} startLine={18} maxLines={25}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"os"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/entitymanager/v1/entitymanagerv1grpc"
	entitymanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/entitymanager/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	ctx := context.Background()

	// Configuration
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Load the SKIP_TLS_VERIFY variable
	skipTLSVerify := os.Getenv("SKIP_TLS_VERIFY") == "true"

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		log.Fatalf("Missing required environment variables")
	}

	auth := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	// Create gRPC connection with optional TLS verification
	conn, err := createGRPCConnection(latticeEndpoint, auth, skipTLSVerify)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	fmt.Printf("gRPC connection established: %s\n", latticeEndpoint)

	client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)

	// Get an entity
	entity, err := client.GetEntity(ctx, &entitymanagerv1.GetEntityRequest{
		EntityId: "<ENTITY_ID>",
	})

	if err != nil {
		fmt.Printf("Error fetching entity: %v\n", err)
	} else {
		fmt.Printf("Successfully fetched entity: %s\n", entity.Entity.EntityId)
	}
}

func createGRPCConnection(
	endpoint string,
	auth *ClientCredentialsAuth,
	skipTLSVerify bool,
) (*grpc.ClientConn, error) {
	// Base dial options
	opts := []grpc.DialOption{
		grpc.WithPerRPCCredentials(auth),
	}

	// Configure transport credentials based on TLS verification setting
	if skipTLSVerify {
		opts = append(opts, grpc.WithTransportCredentials(credentials.NewTLS(
			&tls.Config{
				InsecureSkipVerify: true,
			})))
	} else {
		// Use default secure TLS configuration
		opts = append(opts, grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")))
	}

	// Establish connection
	return grpc.NewClient(endpoint, opts...)
}

```

```py title={"Python (gRPC)"} startLine={38} maxLines={22}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import ssl
import sys
import grpc
from auth import ClientCredentialsAuth

from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import GetEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub


def create_grpc_channel(
    endpoint: str,
    auth: ClientCredentialsAuth,
    skip_tls_verify: bool,
) -> grpc.Channel:
    # Configure transport credentials based on TLS verification setting
    if skip_tls_verify:
        # Python gRPC has no direct equivalent of Go's InsecureSkipVerify.
        # To accept self-signed certificates while keeping TLS encryption, fetch
        # the server's certificate and use it as the trusted root.
        host, _, port = endpoint.partition(":")
        port = int(port) if port else 443
        server_cert = ssl.get_server_certificate((host, port)).encode()
        credentials = grpc.ssl_channel_credentials(root_certificates=server_cert)
    else:
        # Use default secure TLS configuration
        credentials = grpc.ssl_channel_credentials()

    return grpc.intercept_channel(
        grpc.secure_channel(endpoint, credentials),
        auth.create_metadata_interceptor(),
    )


def main():
    # Load environment variables
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    # Load the SKIP_TLS_VERIFY variable
    skip_tls_verify = os.getenv("SKIP_TLS_VERIFY", "").lower() == "true"

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

    # Create gRPC channel with optional TLS verification
    channel = create_grpc_channel(lattice_endpoint, auth, skip_tls_verify)
    print(f"gRPC connection established: {lattice_endpoint}")

    # Create EntityManager API client stub
    client = EntityManagerAPIStub(channel)

    # Get an entity
    try:
        request = GetEntityRequest(entity_id="<ENTITY_ID>")
        response = client.GetEntity(request)
        if response.entity:
            print(f"Successfully fetched entity: {response.entity.entity_id}")
    except Exception as error:
        print(f"Error fetching entity: {error}", file=sys.stderr)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={16} maxLines={25}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::GetEntityRequest;
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::entitymanager::v1::tonic::entity_manager_api_client::EntityManagerApiClient;
use auth::ClientCredentialsAuth;
use http::Uri;
use hyper_util::client::legacy::connect::HttpConnector;
use rustls::client::danger::{HandshakeSignatureValid, ServerCertVerified, ServerCertVerifier};
use rustls::pki_types::{CertificateDer, ServerName, UnixTime};
use rustls::{DigitallySignedStruct, SignatureScheme};
use std::sync::Arc;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig, Endpoint};
use tonic::Request;

use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load configuration
    let client_id = env::var("LATTICE_CLIENT_ID")
        .expect("LATTICE_CLIENT_ID environment variable not set");
    let client_secret = env::var("LATTICE_CLIENT_SECRET")
        .expect("LATTICE_CLIENT_SECRET environment variable not set");
    let lattice_endpoint = env::var("LATTICE_ENDPOINT")
        .expect("LATTICE_ENDPOINT environment variable not set");
    let sandboxes_token = env::var("SANDBOXES_TOKEN")
        .expect("SANDBOXES_TOKEN environment variable not set");

    // Load the SKIP_TLS_VERIFY variable
    let skip_tls_verify = env::var("SKIP_TLS_VERIFY").ok().as_deref() == Some("true");

    // Set up authentication
    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token,
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    // Create gRPC channel with optional TLS verification
    let channel = create_grpc_channel(&lattice_endpoint, skip_tls_verify).await?;
    println!("gRPC connection established: {}", lattice_endpoint);

    // Fetch a fresh access token and build metadata values
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

    // Get an entity
    let request = Request::new(GetEntityRequest {
        entity_id: "<ENTITY_ID>".to_string(),
    });
    match client.get_entity(request).await {
        Ok(resp) => {
            if let Some(entity) = resp.into_inner().entity {
                println!("Successfully fetched entity: {}", entity.entity_id);
            }
        }
        Err(e) => println!("Error fetching entity: {}", e),
    }

    Ok(())
}

// Build a TLS-enabled gRPC channel. When skip_tls_verify is true the channel
// accepts any server certificate (including self-signed ones) by installing a
// rustls verifier that does nothing. This matches the Go example's
// `InsecureSkipVerify: true` and MUST only be used in development.
async fn create_grpc_channel(
    endpoint: &str,
    skip_tls_verify: bool,
) -> Result<Channel, Box<dyn std::error::Error>> {
    let uri: Uri = format!("https://{}", endpoint).parse()?;
    let tonic_endpoint = Endpoint::from(uri);

    if skip_tls_verify {
        // Install the ring-based default crypto provider so that rustls knows
        // which algorithms to use when building the connector.
        let _ = rustls::crypto::ring::default_provider().install_default();

        let rustls_config = rustls::ClientConfig::builder()
            .dangerous()
            .with_custom_certificate_verifier(Arc::new(NoCertVerifier))
            .with_no_client_auth();

        let mut http = HttpConnector::new();
        http.enforce_http(false);
        let https = hyper_rustls::HttpsConnectorBuilder::new()
            .with_tls_config(rustls_config)
            .https_or_http()
            .enable_http2()
            .wrap_connector(http);

        Ok(tonic_endpoint.connect_with_connector(https).await?)
    } else {
        // Use the default secure TLS configuration.
        let tls_config = ClientTlsConfig::new().with_native_roots();
        Ok(tonic_endpoint.tls_config(tls_config)?.connect().await?)
    }
}

// A rustls server certificate verifier that accepts every certificate without
// checking it. This is equivalent to Go's `tls.Config{InsecureSkipVerify: true}`
// and should only be enabled for local development against self-signed Lattice
// deployments.
#[derive(Debug)]
struct NoCertVerifier;

impl ServerCertVerifier for NoCertVerifier {
    fn verify_server_cert(
        &self,
        _end_entity: &CertificateDer<'_>,
        _intermediates: &[CertificateDer<'_>],
        _server_name: &ServerName<'_>,
        _ocsp_response: &[u8],
        _now: UnixTime,
    ) -> Result<ServerCertVerified, rustls::Error> {
        Ok(ServerCertVerified::assertion())
    }

    fn verify_tls12_signature(
        &self,
        _message: &[u8],
        _cert: &CertificateDer<'_>,
        _dss: &DigitallySignedStruct,
    ) -> Result<HandshakeSignatureValid, rustls::Error> {
        Ok(HandshakeSignatureValid::assertion())
    }

    fn verify_tls13_signature(
        &self,
        _message: &[u8],
        _cert: &CertificateDer<'_>,
        _dss: &DigitallySignedStruct,
    ) -> Result<HandshakeSignatureValid, rustls::Error> {
        Ok(HandshakeSignatureValid::assertion())
    }

    fn supported_verify_schemes(&self) -> Vec<SignatureScheme> {
        vec![
            SignatureScheme::RSA_PKCS1_SHA256,
            SignatureScheme::RSA_PKCS1_SHA384,
            SignatureScheme::RSA_PKCS1_SHA512,
            SignatureScheme::ECDSA_NISTP256_SHA256,
            SignatureScheme::ECDSA_NISTP384_SHA384,
            SignatureScheme::ECDSA_NISTP521_SHA512,
            SignatureScheme::RSA_PSS_SHA256,
            SignatureScheme::RSA_PSS_SHA384,
            SignatureScheme::RSA_PSS_SHA512,
            SignatureScheme::ED25519,
        ]
    }
}

```

Configure the HTTP client to set the `InsecureSkipVerify` option. This specifies whether the Lattice client skips verification,
and enables you to use self-signed certificates. If enabled, Lattice still performs basic validation of the certificate's hostname,
and its expiry date.

```go title={"Go (REST)"} startLine={52} maxLines={20}
package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"net/http"
	"os"

	Lattice "github.com/anduril/lattice-sdk-go/v4"
	"github.com/anduril/lattice-sdk-go/v4/client"
	"github.com/anduril/lattice-sdk-go/v4/option"
)

func main() {
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Load the SKIP_TLS_VERIFY variable
	skipTLSVerify := os.Getenv("SKIP_TLS_VERIFY") == "true"

	// Initialize the client
	LatticeClient, err := createLatticeClient(latticeEndpoint, clientID, clientSecret,
		sandboxesToken,
		skipTLSVerify,
	)
	if err != nil {
		fmt.Printf("Error creating Lattice client: %v\n", err)
		os.Exit(1)
	}

	// Use the client
	ctx := context.Background()
	entity, err := LatticeClient.Entities.GetEntity(
		ctx,
		&Lattice.GetEntityRequest{
			EntityID: "Demo-Sim-Asset1",
		},
	)

	if err != nil {
		fmt.Printf("Error fetching entity: %v\n", err)
	} else {
		fmt.Printf("Asset name     | %s\n", *entity.GetAliases().GetName())
		fmt.Printf("Asset location | %f, %f\n", *entity.GetLocation().GetPosition().GetLatitudeDegrees(),
			*entity.GetLocation().GetPosition().GetLongitudeDegrees())
	}
}

func createLatticeClient(endpoint string, clientID string, clientSecret string,
	sandboxesToken string,
	skipTLSVerify bool,
) (*client.Client, error) {

	headers := http.Header{}
	if sandboxesToken != "" {
		headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))
	}

	// Configure the InsecureSkipVerify option
	httpClient := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{
				InsecureSkipVerify: skipTLSVerify,
			},
		},
	}

	latticeClient := client.NewClient(
		option.WithClientCredentials(clientID, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", endpoint)),
		option.WithHTTPHeader(headers),
		option.WithHTTPClient(httpClient),
	)

	return latticeClient, nil
}

```

```java title={"Java (REST)"} startLine={47} maxLines={20}
package org.example;

import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import com.anduril.Lattice;
import okhttp3.OkHttpClient;

/**
 * Example application demonstrating TLS configuration for air-gapped environments.
 */
public class SelfSignedCertificate {

    public static void main(String[] args) {
        // Configuration
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");

        // Load the SKIP_TLS_VERIFY variable
        boolean skipTlsVerify = Boolean.parseBoolean(System.getenv("SKIP_TLS_VERIFY"));

        // Create Lattice client
        Lattice client = createLatticeClient(
            endpoint,
            clientId,
            clientSecret,
            sandboxesToken,
            skipTlsVerify
        );

        System.out.println("Lattice client initialized: https://" + endpoint);

        // Use the client
        try {
            com.anduril.types.Entity entity = client.entities().getEntity("<ENTITY_ID>");
            System.out.println("Successfully fetched entity: " + entity.getEntityId().get());
        } catch (Exception e) {
            System.err.println("Error fetching entity: " + e.getMessage());
        }
    }

    private static Lattice createLatticeClient(
        String endpoint,
        String clientId,
        String clientSecret,
        String sandboxesToken,
        boolean skipTlsVerify
    ) {
        if (!endpoint.startsWith("https://")) {
            endpoint = "https://" + endpoint;
        }

        // Configure HTTP client based on TLS verification setting
        OkHttpClient httpClient;

        if (skipTlsVerify) {
            try {
                // Create a trust manager that accepts all certificates
                TrustManager[] trustAllCerts = new TrustManager[]{
                    new X509TrustManager() {
                        @Override
                        public X509Certificate[] getAcceptedIssuers() {
                            return new X509Certificate[0];
                        }

                        @Override
                        public void checkClientTrusted(X509Certificate[] certs, String authType) {
                        }

                        @Override
                        public void checkServerTrusted(X509Certificate[] certs, String authType) {
                        }
                    }
                };

                // Create SSL context with trust-all manager
                SSLContext sslContext = SSLContext.getInstance("TLS");
                sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

                // Create OkHttpClient with TLS verification disabled
                httpClient = new OkHttpClient.Builder()
                    .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCerts[0])
                    .hostnameVerifier((hostname, session) -> true)
                    .build();
            } catch (Exception e) {
                throw new RuntimeException("Failed to configure SSL context", e);
            }
        } else {
            // Create OkHttpClient with default TLS verification
            httpClient = new OkHttpClient.Builder()
                .build();
        }

        // Create and return Lattice client with configured httpClient
        return Lattice.builder()
            .url(endpoint)
            .credentials(clientId, clientSecret)
            .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
            .httpClient(httpClient)
            .build();
    }
}

```

```py title={"Python (REST)"} startLine={15} maxLines={20}
from anduril import Lattice
import os
import ssl
import httpx

# Configuration
lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')
sandboxes_token = os.getenv('SANDBOXES_TOKEN')

# Load the SKIP_TLS_VERIFY variable
skip_tls_verify = os.getenv('SKIP_TLS_VERIFY', '').lower() == 'true'

def create_lattice_client(
    endpoint: str,
    client_id: str,
    client_secret: str,
    sandboxes_token: str,
    skip_tls_verify: bool = False
) -> Lattice:
    
    if not endpoint.startswith("https://"):
        endpoint = "https://" + endpoint

    # Base configuration
    base_url = endpoint

    # Configure HTTP client based on TLS verification setting
    if skip_tls_verify:
        # Create SSL context that doesn't verify certificates
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        # Create httpx client with TLS verification disabled
        http_client = httpx.Client(verify=ssl_context)
    else:
        # Create httpx client with default TLS verification
        http_client = httpx.Client()

    # Create and return Lattice client with configured httpx_client
    return Lattice(
        base_url=base_url,
        client_id=client_id,
        client_secret=client_secret,
        httpx_client=http_client,
        headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
    )

if not lattice_endpoint or not client_id or not client_secret or not sandboxes_token:
    print("Missing required environment variables.")
    raise SystemExit(1)

# Create Lattice client
client = create_lattice_client(
    lattice_endpoint,
    client_id,
    client_secret,
    sandboxes_token,
    skip_tls_verify
)

print(f"Lattice client initialized: {lattice_endpoint}")

# Use the client
try:
    # Replace <ENTITY_ID> with the ID of an entity in your environment.
    entity = client.entities.get_entity(
        entity_id="<ENTITY_ID>"
    )
    print(f"Successfully fetched entity: {entity.entity_id}")
except Exception as error:
    print(f"Error fetching entity: {error}")

```

```ts title={"TypeScript (REST)"} startLine={18} maxLines={20}
import { LatticeClient } from "@anduril-industries/lattice-sdk";
import https from "https";


const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;
// Remove sandboxesToken from the following statement if you are not developing on Sandboxes.
const sandboxesToken = process.env.SANDBOXES_TOKEN;

if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.log('Missing required environment variables.');
    process.exit(1);
}
// Load the SKIP_TLS_VERIFY variable
const skipTlsVerify = process.env.SKIP_TLS_VERIFY === "true";

function createLatticeClient(
    endpoint: string,
    clientId: string,
    clientSecret: string,
    sandboxesToken: string,
    skipTlsVerify: boolean
): LatticeClient {
    if (!endpoint.startsWith("https://")) {
        endpoint = "https://" + endpoint;
    }

    const baseUrl = endpoint;

    // Configure fetch function based on TLS verification setting
    let fetchFunction: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | undefined;

    if (skipTlsVerify) {
        // Create HTTPS agent with TLS verification disabled
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        });

        fetchFunction = async (input: RequestInfo | URL, init?: RequestInit) => {
            const response = await fetch(input, {
                ...init,
                agent: httpsAgent
            } as RequestInit);
            return response;
        };
    } else {
        // Use default fetch with standard TLS verification
        fetchFunction = fetch;
    }

    // Create and return Lattice client with configured fetch function
    return new LatticeClient({
        baseUrl: baseUrl,
        clientId: clientId,
        clientSecret: clientSecret,
        fetch: fetchFunction,
        // Remove the following if you are not developing on Sandboxes.
        headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    });
}

// Create Lattice client
const client = createLatticeClient(
    latticeEndpoint,
    clientId,
    clientSecret,
    sandboxesToken,
    skipTlsVerify
);

console.log(`Lattice client initialized: ${latticeEndpoint}`);

// Use the client
(async () => {
    try {
        const entity = await client.entities.getEntity({
            // Replace <ENTITY_ID> with the ID of an entity in your environment.
            entityId: "<ENTITY_ID>"
        });
        console.log(`Successfully fetched entity: ${entity.entityId}`);
    } catch (error) {
        console.log(`Error fetching entity: ${error}`);
    }
})();

```

```go title={"Go (gRPC)"} startLine={63} maxLines={20}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"os"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/entitymanager/v1/entitymanagerv1grpc"
	entitymanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/entitymanager/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	ctx := context.Background()

	// Configuration
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Load the SKIP_TLS_VERIFY variable
	skipTLSVerify := os.Getenv("SKIP_TLS_VERIFY") == "true"

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		log.Fatalf("Missing required environment variables")
	}

	auth := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	// Create gRPC connection with optional TLS verification
	conn, err := createGRPCConnection(latticeEndpoint, auth, skipTLSVerify)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	fmt.Printf("gRPC connection established: %s\n", latticeEndpoint)

	client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)

	// Get an entity
	entity, err := client.GetEntity(ctx, &entitymanagerv1.GetEntityRequest{
		EntityId: "<ENTITY_ID>",
	})

	if err != nil {
		fmt.Printf("Error fetching entity: %v\n", err)
	} else {
		fmt.Printf("Successfully fetched entity: %s\n", entity.Entity.EntityId)
	}
}

func createGRPCConnection(
	endpoint string,
	auth *ClientCredentialsAuth,
	skipTLSVerify bool,
) (*grpc.ClientConn, error) {
	// Base dial options
	opts := []grpc.DialOption{
		grpc.WithPerRPCCredentials(auth),
	}

	// Configure transport credentials based on TLS verification setting
	if skipTLSVerify {
		opts = append(opts, grpc.WithTransportCredentials(credentials.NewTLS(
			&tls.Config{
				InsecureSkipVerify: true,
			})))
	} else {
		// Use default secure TLS configuration
		opts = append(opts, grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")))
	}

	// Establish connection
	return grpc.NewClient(endpoint, opts...)
}

```

```py title={"Python (gRPC)"} startLine={14} maxLines={22}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import ssl
import sys
import grpc
from auth import ClientCredentialsAuth

from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import GetEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub


def create_grpc_channel(
    endpoint: str,
    auth: ClientCredentialsAuth,
    skip_tls_verify: bool,
) -> grpc.Channel:
    # Configure transport credentials based on TLS verification setting
    if skip_tls_verify:
        # Python gRPC has no direct equivalent of Go's InsecureSkipVerify.
        # To accept self-signed certificates while keeping TLS encryption, fetch
        # the server's certificate and use it as the trusted root.
        host, _, port = endpoint.partition(":")
        port = int(port) if port else 443
        server_cert = ssl.get_server_certificate((host, port)).encode()
        credentials = grpc.ssl_channel_credentials(root_certificates=server_cert)
    else:
        # Use default secure TLS configuration
        credentials = grpc.ssl_channel_credentials()

    return grpc.intercept_channel(
        grpc.secure_channel(endpoint, credentials),
        auth.create_metadata_interceptor(),
    )


def main():
    # Load environment variables
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    # Load the SKIP_TLS_VERIFY variable
    skip_tls_verify = os.getenv("SKIP_TLS_VERIFY", "").lower() == "true"

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

    # Create gRPC channel with optional TLS verification
    channel = create_grpc_channel(lattice_endpoint, auth, skip_tls_verify)
    print(f"gRPC connection established: {lattice_endpoint}")

    # Create EntityManager API client stub
    client = EntityManagerAPIStub(channel)

    # Get an entity
    try:
        request = GetEntityRequest(entity_id="<ENTITY_ID>")
        response = client.GetEntity(request)
        if response.entity:
            print(f"Successfully fetched entity: {response.entity.entity_id}")
    except Exception as error:
        print(f"Error fetching entity: {error}", file=sys.stderr)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={80} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::GetEntityRequest;
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::entitymanager::v1::tonic::entity_manager_api_client::EntityManagerApiClient;
use auth::ClientCredentialsAuth;
use http::Uri;
use hyper_util::client::legacy::connect::HttpConnector;
use rustls::client::danger::{HandshakeSignatureValid, ServerCertVerified, ServerCertVerifier};
use rustls::pki_types::{CertificateDer, ServerName, UnixTime};
use rustls::{DigitallySignedStruct, SignatureScheme};
use std::sync::Arc;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig, Endpoint};
use tonic::Request;

use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load configuration
    let client_id = env::var("LATTICE_CLIENT_ID")
        .expect("LATTICE_CLIENT_ID environment variable not set");
    let client_secret = env::var("LATTICE_CLIENT_SECRET")
        .expect("LATTICE_CLIENT_SECRET environment variable not set");
    let lattice_endpoint = env::var("LATTICE_ENDPOINT")
        .expect("LATTICE_ENDPOINT environment variable not set");
    let sandboxes_token = env::var("SANDBOXES_TOKEN")
        .expect("SANDBOXES_TOKEN environment variable not set");

    // Load the SKIP_TLS_VERIFY variable
    let skip_tls_verify = env::var("SKIP_TLS_VERIFY").ok().as_deref() == Some("true");

    // Set up authentication
    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token,
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    // Create gRPC channel with optional TLS verification
    let channel = create_grpc_channel(&lattice_endpoint, skip_tls_verify).await?;
    println!("gRPC connection established: {}", lattice_endpoint);

    // Fetch a fresh access token and build metadata values
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

    // Get an entity
    let request = Request::new(GetEntityRequest {
        entity_id: "<ENTITY_ID>".to_string(),
    });
    match client.get_entity(request).await {
        Ok(resp) => {
            if let Some(entity) = resp.into_inner().entity {
                println!("Successfully fetched entity: {}", entity.entity_id);
            }
        }
        Err(e) => println!("Error fetching entity: {}", e),
    }

    Ok(())
}

// Build a TLS-enabled gRPC channel. When skip_tls_verify is true the channel
// accepts any server certificate (including self-signed ones) by installing a
// rustls verifier that does nothing. This matches the Go example's
// `InsecureSkipVerify: true` and MUST only be used in development.
async fn create_grpc_channel(
    endpoint: &str,
    skip_tls_verify: bool,
) -> Result<Channel, Box<dyn std::error::Error>> {
    let uri: Uri = format!("https://{}", endpoint).parse()?;
    let tonic_endpoint = Endpoint::from(uri);

    if skip_tls_verify {
        // Install the ring-based default crypto provider so that rustls knows
        // which algorithms to use when building the connector.
        let _ = rustls::crypto::ring::default_provider().install_default();

        let rustls_config = rustls::ClientConfig::builder()
            .dangerous()
            .with_custom_certificate_verifier(Arc::new(NoCertVerifier))
            .with_no_client_auth();

        let mut http = HttpConnector::new();
        http.enforce_http(false);
        let https = hyper_rustls::HttpsConnectorBuilder::new()
            .with_tls_config(rustls_config)
            .https_or_http()
            .enable_http2()
            .wrap_connector(http);

        Ok(tonic_endpoint.connect_with_connector(https).await?)
    } else {
        // Use the default secure TLS configuration.
        let tls_config = ClientTlsConfig::new().with_native_roots();
        Ok(tonic_endpoint.tls_config(tls_config)?.connect().await?)
    }
}

// A rustls server certificate verifier that accepts every certificate without
// checking it. This is equivalent to Go's `tls.Config{InsecureSkipVerify: true}`
// and should only be enabled for local development against self-signed Lattice
// deployments.
#[derive(Debug)]
struct NoCertVerifier;

impl ServerCertVerifier for NoCertVerifier {
    fn verify_server_cert(
        &self,
        _end_entity: &CertificateDer<'_>,
        _intermediates: &[CertificateDer<'_>],
        _server_name: &ServerName<'_>,
        _ocsp_response: &[u8],
        _now: UnixTime,
    ) -> Result<ServerCertVerified, rustls::Error> {
        Ok(ServerCertVerified::assertion())
    }

    fn verify_tls12_signature(
        &self,
        _message: &[u8],
        _cert: &CertificateDer<'_>,
        _dss: &DigitallySignedStruct,
    ) -> Result<HandshakeSignatureValid, rustls::Error> {
        Ok(HandshakeSignatureValid::assertion())
    }

    fn verify_tls13_signature(
        &self,
        _message: &[u8],
        _cert: &CertificateDer<'_>,
        _dss: &DigitallySignedStruct,
    ) -> Result<HandshakeSignatureValid, rustls::Error> {
        Ok(HandshakeSignatureValid::assertion())
    }

    fn supported_verify_schemes(&self) -> Vec<SignatureScheme> {
        vec![
            SignatureScheme::RSA_PKCS1_SHA256,
            SignatureScheme::RSA_PKCS1_SHA384,
            SignatureScheme::RSA_PKCS1_SHA512,
            SignatureScheme::ECDSA_NISTP256_SHA256,
            SignatureScheme::ECDSA_NISTP384_SHA384,
            SignatureScheme::ECDSA_NISTP521_SHA512,
            SignatureScheme::RSA_PSS_SHA256,
            SignatureScheme::RSA_PSS_SHA384,
            SignatureScheme::RSA_PSS_SHA512,
            SignatureScheme::ED25519,
        ]
    }
}

```

Use the client to call the Lattice API. In the following, we use [`GetEntity`](/reference/rest/entities/get-entity)\
to fetch an entity using its `entityId`:

```go title={"Go (REST)"} startLine={34} maxLines={20}
package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"net/http"
	"os"

	Lattice "github.com/anduril/lattice-sdk-go/v4"
	"github.com/anduril/lattice-sdk-go/v4/client"
	"github.com/anduril/lattice-sdk-go/v4/option"
)

func main() {
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Load the SKIP_TLS_VERIFY variable
	skipTLSVerify := os.Getenv("SKIP_TLS_VERIFY") == "true"

	// Initialize the client
	LatticeClient, err := createLatticeClient(latticeEndpoint, clientID, clientSecret,
		sandboxesToken,
		skipTLSVerify,
	)
	if err != nil {
		fmt.Printf("Error creating Lattice client: %v\n", err)
		os.Exit(1)
	}

	// Use the client
	ctx := context.Background()
	entity, err := LatticeClient.Entities.GetEntity(
		ctx,
		&Lattice.GetEntityRequest{
			EntityID: "Demo-Sim-Asset1",
		},
	)

	if err != nil {
		fmt.Printf("Error fetching entity: %v\n", err)
	} else {
		fmt.Printf("Asset name     | %s\n", *entity.GetAliases().GetName())
		fmt.Printf("Asset location | %f, %f\n", *entity.GetLocation().GetPosition().GetLatitudeDegrees(),
			*entity.GetLocation().GetPosition().GetLongitudeDegrees())
	}
}

func createLatticeClient(endpoint string, clientID string, clientSecret string,
	sandboxesToken string,
	skipTLSVerify bool,
) (*client.Client, error) {

	headers := http.Header{}
	if sandboxesToken != "" {
		headers.Add("Anduril-Sandbox-Authorization", fmt.Sprintf("Bearer %s", sandboxesToken))
	}

	// Configure the InsecureSkipVerify option
	httpClient := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{
				InsecureSkipVerify: skipTLSVerify,
			},
		},
	}

	latticeClient := client.NewClient(
		option.WithClientCredentials(clientID, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", endpoint)),
		option.WithHTTPHeader(headers),
		option.WithHTTPClient(httpClient),
	)

	return latticeClient, nil
}

```

```java title={"Java (REST)"} startLine={38} maxLines={20}
package org.example;

import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import com.anduril.Lattice;
import okhttp3.OkHttpClient;

/**
 * Example application demonstrating TLS configuration for air-gapped environments.
 */
public class SelfSignedCertificate {

    public static void main(String[] args) {
        // Configuration
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");

        // Load the SKIP_TLS_VERIFY variable
        boolean skipTlsVerify = Boolean.parseBoolean(System.getenv("SKIP_TLS_VERIFY"));

        // Create Lattice client
        Lattice client = createLatticeClient(
            endpoint,
            clientId,
            clientSecret,
            sandboxesToken,
            skipTlsVerify
        );

        System.out.println("Lattice client initialized: https://" + endpoint);

        // Use the client
        try {
            com.anduril.types.Entity entity = client.entities().getEntity("<ENTITY_ID>");
            System.out.println("Successfully fetched entity: " + entity.getEntityId().get());
        } catch (Exception e) {
            System.err.println("Error fetching entity: " + e.getMessage());
        }
    }

    private static Lattice createLatticeClient(
        String endpoint,
        String clientId,
        String clientSecret,
        String sandboxesToken,
        boolean skipTlsVerify
    ) {
        if (!endpoint.startsWith("https://")) {
            endpoint = "https://" + endpoint;
        }

        // Configure HTTP client based on TLS verification setting
        OkHttpClient httpClient;

        if (skipTlsVerify) {
            try {
                // Create a trust manager that accepts all certificates
                TrustManager[] trustAllCerts = new TrustManager[]{
                    new X509TrustManager() {
                        @Override
                        public X509Certificate[] getAcceptedIssuers() {
                            return new X509Certificate[0];
                        }

                        @Override
                        public void checkClientTrusted(X509Certificate[] certs, String authType) {
                        }

                        @Override
                        public void checkServerTrusted(X509Certificate[] certs, String authType) {
                        }
                    }
                };

                // Create SSL context with trust-all manager
                SSLContext sslContext = SSLContext.getInstance("TLS");
                sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

                // Create OkHttpClient with TLS verification disabled
                httpClient = new OkHttpClient.Builder()
                    .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCerts[0])
                    .hostnameVerifier((hostname, session) -> true)
                    .build();
            } catch (Exception e) {
                throw new RuntimeException("Failed to configure SSL context", e);
            }
        } else {
            // Create OkHttpClient with default TLS verification
            httpClient = new OkHttpClient.Builder()
                .build();
        }

        // Create and return Lattice client with configured httpClient
        return Lattice.builder()
            .url(endpoint)
            .credentials(clientId, clientSecret)
            .addHeader("Anduril-Sandbox-Authorization", "Bearer " + sandboxesToken)
            .httpClient(httpClient)
            .build();
    }
}

```

```py title={"Python (REST)"} startLine={62} maxLines={20}
from anduril import Lattice
import os
import ssl
import httpx

# Configuration
lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')
sandboxes_token = os.getenv('SANDBOXES_TOKEN')

# Load the SKIP_TLS_VERIFY variable
skip_tls_verify = os.getenv('SKIP_TLS_VERIFY', '').lower() == 'true'

def create_lattice_client(
    endpoint: str,
    client_id: str,
    client_secret: str,
    sandboxes_token: str,
    skip_tls_verify: bool = False
) -> Lattice:
    
    if not endpoint.startswith("https://"):
        endpoint = "https://" + endpoint

    # Base configuration
    base_url = endpoint

    # Configure HTTP client based on TLS verification setting
    if skip_tls_verify:
        # Create SSL context that doesn't verify certificates
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        # Create httpx client with TLS verification disabled
        http_client = httpx.Client(verify=ssl_context)
    else:
        # Create httpx client with default TLS verification
        http_client = httpx.Client()

    # Create and return Lattice client with configured httpx_client
    return Lattice(
        base_url=base_url,
        client_id=client_id,
        client_secret=client_secret,
        httpx_client=http_client,
        headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
    )

if not lattice_endpoint or not client_id or not client_secret or not sandboxes_token:
    print("Missing required environment variables.")
    raise SystemExit(1)

# Create Lattice client
client = create_lattice_client(
    lattice_endpoint,
    client_id,
    client_secret,
    sandboxes_token,
    skip_tls_verify
)

print(f"Lattice client initialized: {lattice_endpoint}")

# Use the client
try:
    # Replace <ENTITY_ID> with the ID of an entity in your environment.
    entity = client.entities.get_entity(
        entity_id="<ENTITY_ID>"
    )
    print(f"Successfully fetched entity: {entity.entity_id}")
except Exception as error:
    print(f"Error fetching entity: {error}")

```

```ts title={"TypeScript (REST)"} startLine={74} maxLines={20}
import { LatticeClient } from "@anduril-industries/lattice-sdk";
import https from "https";


const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;
// Remove sandboxesToken from the following statement if you are not developing on Sandboxes.
const sandboxesToken = process.env.SANDBOXES_TOKEN;

if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.log('Missing required environment variables.');
    process.exit(1);
}
// Load the SKIP_TLS_VERIFY variable
const skipTlsVerify = process.env.SKIP_TLS_VERIFY === "true";

function createLatticeClient(
    endpoint: string,
    clientId: string,
    clientSecret: string,
    sandboxesToken: string,
    skipTlsVerify: boolean
): LatticeClient {
    if (!endpoint.startsWith("https://")) {
        endpoint = "https://" + endpoint;
    }

    const baseUrl = endpoint;

    // Configure fetch function based on TLS verification setting
    let fetchFunction: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | undefined;

    if (skipTlsVerify) {
        // Create HTTPS agent with TLS verification disabled
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        });

        fetchFunction = async (input: RequestInfo | URL, init?: RequestInit) => {
            const response = await fetch(input, {
                ...init,
                agent: httpsAgent
            } as RequestInit);
            return response;
        };
    } else {
        // Use default fetch with standard TLS verification
        fetchFunction = fetch;
    }

    // Create and return Lattice client with configured fetch function
    return new LatticeClient({
        baseUrl: baseUrl,
        clientId: clientId,
        clientSecret: clientSecret,
        fetch: fetchFunction,
        // Remove the following if you are not developing on Sandboxes.
        headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    });
}

// Create Lattice client
const client = createLatticeClient(
    latticeEndpoint,
    clientId,
    clientSecret,
    sandboxesToken,
    skipTlsVerify
);

console.log(`Lattice client initialized: ${latticeEndpoint}`);

// Use the client
(async () => {
    try {
        const entity = await client.entities.getEntity({
            // Replace <ENTITY_ID> with the ID of an entity in your environment.
            entityId: "<ENTITY_ID>"
        });
        console.log(`Successfully fetched entity: ${entity.entityId}`);
    } catch (error) {
        console.log(`Error fetching entity: ${error}`);
    }
})();

```

```go title={"Go (gRPC)"} startLine={48} maxLines={20}
// This Go example is compatible with artifacts generated using
// the following grpc/go plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/go
package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"os"

	"buf.build/gen/go/anduril/lattice-sdk/grpc/go/anduril/entitymanager/v1/entitymanagerv1grpc"
	entitymanagerv1 "buf.build/gen/go/anduril/lattice-sdk/protocolbuffers/go/anduril/entitymanager/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	ctx := context.Background()

	// Configuration
	clientID := os.Getenv("LATTICE_CLIENT_ID")
	clientSecret := os.Getenv("LATTICE_CLIENT_SECRET")
	latticeEndpoint := os.Getenv("LATTICE_ENDPOINT")
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Load the SKIP_TLS_VERIFY variable
	skipTLSVerify := os.Getenv("SKIP_TLS_VERIFY") == "true"

	if latticeEndpoint == "" || clientSecret == "" || clientID == "" || sandboxesToken == "" {
		log.Fatalf("Missing required environment variables")
	}

	auth := &ClientCredentialsAuth{
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		SandboxesToken: sandboxesToken,
		Endpoint:       fmt.Sprintf("https://%s/api/v1/oauth/token", latticeEndpoint),
	}

	// Create gRPC connection with optional TLS verification
	conn, err := createGRPCConnection(latticeEndpoint, auth, skipTLSVerify)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	fmt.Printf("gRPC connection established: %s\n", latticeEndpoint)

	client := entitymanagerv1grpc.NewEntityManagerAPIClient(conn)

	// Get an entity
	entity, err := client.GetEntity(ctx, &entitymanagerv1.GetEntityRequest{
		EntityId: "<ENTITY_ID>",
	})

	if err != nil {
		fmt.Printf("Error fetching entity: %v\n", err)
	} else {
		fmt.Printf("Successfully fetched entity: %s\n", entity.Entity.EntityId)
	}
}

func createGRPCConnection(
	endpoint string,
	auth *ClientCredentialsAuth,
	skipTLSVerify bool,
) (*grpc.ClientConn, error) {
	// Base dial options
	opts := []grpc.DialOption{
		grpc.WithPerRPCCredentials(auth),
	}

	// Configure transport credentials based on TLS verification setting
	if skipTLSVerify {
		opts = append(opts, grpc.WithTransportCredentials(credentials.NewTLS(
			&tls.Config{
				InsecureSkipVerify: true,
			})))
	} else {
		// Use default secure TLS configuration
		opts = append(opts, grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")))
	}

	// Establish connection
	return grpc.NewClient(endpoint, opts...)
}

```

```py title={"Python (gRPC)"} startLine={61} maxLines={16}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import ssl
import sys
import grpc
from auth import ClientCredentialsAuth

from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import GetEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub


def create_grpc_channel(
    endpoint: str,
    auth: ClientCredentialsAuth,
    skip_tls_verify: bool,
) -> grpc.Channel:
    # Configure transport credentials based on TLS verification setting
    if skip_tls_verify:
        # Python gRPC has no direct equivalent of Go's InsecureSkipVerify.
        # To accept self-signed certificates while keeping TLS encryption, fetch
        # the server's certificate and use it as the trusted root.
        host, _, port = endpoint.partition(":")
        port = int(port) if port else 443
        server_cert = ssl.get_server_certificate((host, port)).encode()
        credentials = grpc.ssl_channel_credentials(root_certificates=server_cert)
    else:
        # Use default secure TLS configuration
        credentials = grpc.ssl_channel_credentials()

    return grpc.intercept_channel(
        grpc.secure_channel(endpoint, credentials),
        auth.create_metadata_interceptor(),
    )


def main():
    # Load environment variables
    client_id = os.getenv("LATTICE_CLIENT_ID")
    client_secret = os.getenv("LATTICE_CLIENT_SECRET")
    lattice_endpoint = os.getenv("LATTICE_ENDPOINT")
    sandboxes_token = os.getenv("SANDBOXES_TOKEN")

    # Load the SKIP_TLS_VERIFY variable
    skip_tls_verify = os.getenv("SKIP_TLS_VERIFY", "").lower() == "true"

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

    # Create gRPC channel with optional TLS verification
    channel = create_grpc_channel(lattice_endpoint, auth, skip_tls_verify)
    print(f"gRPC connection established: {lattice_endpoint}")

    # Create EntityManager API client stub
    client = EntityManagerAPIStub(channel)

    # Get an entity
    try:
        request = GetEntityRequest(entity_id="<ENTITY_ID>")
        response = client.GetEntity(request)
        if response.entity:
            print(f"Successfully fetched entity: {response.entity.entity_id}")
    except Exception as error:
        print(f"Error fetching entity: {error}", file=sys.stderr)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} startLine={60} maxLines={20}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::GetEntityRequest;
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::entitymanager::v1::tonic::entity_manager_api_client::EntityManagerApiClient;
use auth::ClientCredentialsAuth;
use http::Uri;
use hyper_util::client::legacy::connect::HttpConnector;
use rustls::client::danger::{HandshakeSignatureValid, ServerCertVerified, ServerCertVerifier};
use rustls::pki_types::{CertificateDer, ServerName, UnixTime};
use rustls::{DigitallySignedStruct, SignatureScheme};
use std::sync::Arc;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig, Endpoint};
use tonic::Request;

use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load configuration
    let client_id = env::var("LATTICE_CLIENT_ID")
        .expect("LATTICE_CLIENT_ID environment variable not set");
    let client_secret = env::var("LATTICE_CLIENT_SECRET")
        .expect("LATTICE_CLIENT_SECRET environment variable not set");
    let lattice_endpoint = env::var("LATTICE_ENDPOINT")
        .expect("LATTICE_ENDPOINT environment variable not set");
    let sandboxes_token = env::var("SANDBOXES_TOKEN")
        .expect("SANDBOXES_TOKEN environment variable not set");

    // Load the SKIP_TLS_VERIFY variable
    let skip_tls_verify = env::var("SKIP_TLS_VERIFY").ok().as_deref() == Some("true");

    // Set up authentication
    let auth = ClientCredentialsAuth::new(
        client_id,
        client_secret,
        sandboxes_token,
        format!("https://{}/api/v1/oauth/token", lattice_endpoint),
    );

    // Create gRPC channel with optional TLS verification
    let channel = create_grpc_channel(&lattice_endpoint, skip_tls_verify).await?;
    println!("gRPC connection established: {}", lattice_endpoint);

    // Fetch a fresh access token and build metadata values
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

    // Get an entity
    let request = Request::new(GetEntityRequest {
        entity_id: "<ENTITY_ID>".to_string(),
    });
    match client.get_entity(request).await {
        Ok(resp) => {
            if let Some(entity) = resp.into_inner().entity {
                println!("Successfully fetched entity: {}", entity.entity_id);
            }
        }
        Err(e) => println!("Error fetching entity: {}", e),
    }

    Ok(())
}

// Build a TLS-enabled gRPC channel. When skip_tls_verify is true the channel
// accepts any server certificate (including self-signed ones) by installing a
// rustls verifier that does nothing. This matches the Go example's
// `InsecureSkipVerify: true` and MUST only be used in development.
async fn create_grpc_channel(
    endpoint: &str,
    skip_tls_verify: bool,
) -> Result<Channel, Box<dyn std::error::Error>> {
    let uri: Uri = format!("https://{}", endpoint).parse()?;
    let tonic_endpoint = Endpoint::from(uri);

    if skip_tls_verify {
        // Install the ring-based default crypto provider so that rustls knows
        // which algorithms to use when building the connector.
        let _ = rustls::crypto::ring::default_provider().install_default();

        let rustls_config = rustls::ClientConfig::builder()
            .dangerous()
            .with_custom_certificate_verifier(Arc::new(NoCertVerifier))
            .with_no_client_auth();

        let mut http = HttpConnector::new();
        http.enforce_http(false);
        let https = hyper_rustls::HttpsConnectorBuilder::new()
            .with_tls_config(rustls_config)
            .https_or_http()
            .enable_http2()
            .wrap_connector(http);

        Ok(tonic_endpoint.connect_with_connector(https).await?)
    } else {
        // Use the default secure TLS configuration.
        let tls_config = ClientTlsConfig::new().with_native_roots();
        Ok(tonic_endpoint.tls_config(tls_config)?.connect().await?)
    }
}

// A rustls server certificate verifier that accepts every certificate without
// checking it. This is equivalent to Go's `tls.Config{InsecureSkipVerify: true}`
// and should only be enabled for local development against self-signed Lattice
// deployments.
#[derive(Debug)]
struct NoCertVerifier;

impl ServerCertVerifier for NoCertVerifier {
    fn verify_server_cert(
        &self,
        _end_entity: &CertificateDer<'_>,
        _intermediates: &[CertificateDer<'_>],
        _server_name: &ServerName<'_>,
        _ocsp_response: &[u8],
        _now: UnixTime,
    ) -> Result<ServerCertVerified, rustls::Error> {
        Ok(ServerCertVerified::assertion())
    }

    fn verify_tls12_signature(
        &self,
        _message: &[u8],
        _cert: &CertificateDer<'_>,
        _dss: &DigitallySignedStruct,
    ) -> Result<HandshakeSignatureValid, rustls::Error> {
        Ok(HandshakeSignatureValid::assertion())
    }

    fn verify_tls13_signature(
        &self,
        _message: &[u8],
        _cert: &CertificateDer<'_>,
        _dss: &DigitallySignedStruct,
    ) -> Result<HandshakeSignatureValid, rustls::Error> {
        Ok(HandshakeSignatureValid::assertion())
    }

    fn supported_verify_schemes(&self) -> Vec<SignatureScheme> {
        vec![
            SignatureScheme::RSA_PKCS1_SHA256,
            SignatureScheme::RSA_PKCS1_SHA384,
            SignatureScheme::RSA_PKCS1_SHA512,
            SignatureScheme::ECDSA_NISTP256_SHA256,
            SignatureScheme::ECDSA_NISTP384_SHA384,
            SignatureScheme::ECDSA_NISTP521_SHA512,
            SignatureScheme::RSA_PSS_SHA256,
            SignatureScheme::RSA_PSS_SHA384,
            SignatureScheme::RSA_PSS_SHA512,
            SignatureScheme::ED25519,
        ]
    }
}

```

When you need to connect to a offline environment, you set the `SKIP_TLS_VERIFY` to `true` and enable your integration
to use self-signed certificates.

## What's next

* Learn how to [publish entities](/guides/entities/publish) to Lattice.
* Explore [tasking](/guides/tasks/overview) to learn how you can task an agent in Lattice.
* Learn more about the [Lattice OAuth 2.0](/reference/rest/oauth/get-token) endpoint.