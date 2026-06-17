> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Manage objects

In Lattice, an **object** is a data model that represents a single file or a piece of data. This page explains how to manage objects in Lattice,
including retrieving metadata, setting expiration times, and deleting objects.

## Before you begin

* To configure your app to manage objects, [set up](/guides/getting-started/set-up) your Lattice environment.
* See an overview of the [Object schema and the Object Store API](/guides/objects/overview) in Lattice.
* If you haven't already, learn how to [upload](/guides/objects/upload) and [download](/guides/objects/download) objects.

If you are using gRPC with client credentials, [set up the token refresh module](/guides/getting-started/authenticate#using-grpc) before running the examples on this page.

## Get object metadata

To retrieve metadata about an object without downloading its contents,
use the `getObjectMetadata` method, which performs a HEAD request to the server.

This operation returns metadata such as the object size in bytes, the SHA-256 checksum,
and timestamps indicating when the object was last modified, and when it expires.

When using the [GetObjectMetadata](/reference/rest/objects/get-object-metadata) API, you must specify
the object path of the object for which you want to retrieve metadata.

For example, if you previously uploaded an image at `/api/v1/objects/image.jpg`,
you would use this path to request its metadata.

Run the following code to retrieve the object's metadata.
Replace <code class="code-highlight">**objectPath**</code> with the path of the object.

```go title={"Go"} maxLines={25}
// Example code for getting object metadata
package main

import (
	"context"
	"fmt"
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
	headers := make(map[string][]string)
	headers["Anduril-Sandbox-Authorization"] = []string{fmt.Sprintf("Bearer %s", sandboxesToken)}

	// Create the client
	c := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)
	// Set object path
	objectPath := "<OBJECT_PATH>"

	// Create context for the request
	ctx := context.Background()

	// Get the object metadata using HEAD request
	response, err := c.Objects.WithRawResponse.GetObjectMetadata(ctx, &Lattice.GetObjectMetadataRequest{ObjectPath: objectPath})
	if err != nil {
		fmt.Printf("Error getting object metadata: %v\n", err)
		os.Exit(1)
	}

	// The response contains headers with metadata information
	fmt.Println("Object Metadata:")
	fmt.Printf("Status Code: %d\n", response.StatusCode)
	fmt.Printf("Path: %s\n", response.Header.Get("Path"))
	fmt.Printf("Content-Length: %s bytes\n", response.Header.Get("Content-Length"))
	fmt.Printf("Checksum: %s\n", response.Header.Get("Checksum"))
	fmt.Printf("Last-Modified: %s\n", response.Header.Get("Last-Modified"))
	fmt.Printf("Expires: %s\n", response.Header.Get("Expires"))
	fmt.Println("Object metadata retrieved successfully")
}

```

```java title={"Java"} maxLines={25}
package org.example;

import com.anduril.Lattice;
import com.anduril.core.LatticeHttpResponse;

public class GetObjectMetadata {
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

            // Set the object path
            String objectPath = "<OBJECT_PATH>";

            try {
                // Get object metadata using HEAD request
                // We need to use withRawResponse to access the headers
                LatticeHttpResponse<Void> response = client.objects().withRawResponse().getObjectMetadata(objectPath);

                // The response contains headers with metadata information
                System.out.println("Object Metadata:");
                System.out.println("Path: " + response.headers().get("Path"));
                System.out.println("Content-Length: " + response.headers().get("Content-Length") + " bytes");
                System.out.println("Checksum: " + response.headers().get("Checksum"));
                System.out.println("Last-Modified: " + response.headers().get("Last-Modified"));
                System.out.println("Expires: " + response.headers().get("Expires"));
                System.out.println("Object metadata retrieved successfully");

            } catch (Exception e) {
                System.err.println("Error getting object metadata: " + e.getMessage());
            }
        } catch (Exception e) {
            System.err.println("Error initializing client: " + e.getMessage());
        }
    }
}
```

```py title={"Python"} maxLines={25}
from anduril import Lattice
import os
import sys
import asyncio

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
    # Remove the following if you are not developing on a Sandboxes.
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)

async def app(object_path):
    try:
        response = client.objects.get_object_metadata(
            object_path=object_path
        )

        # The response contains headers with metadata information.
        print("Object Metadata:")
        print(f"Path: {response.get('Path')}")
        print(f"Content-Length: {response.get('Content-Length')} bytes")
        print(f"Checksum: {response.get('Checksum')}")
        print(f"Last-Modified: {response.get('Last-Modified')}")
        print(f"Expires: {response.get('Expires')}")

    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    # Replace with the path of the object you want to get metadata for
    asyncio.run(app(object_path="<OBJECT_PATH>"))
```

```ts title={"Typescript"} maxLines={25}
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
        // Remove the header if you are not developing on Sandboxes.
        headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    }
);

async function App(objectPath: string) {
    try {
        // Get the object metadata using HEAD request
        const response = await client.objects.getObjectMetadata({ objectPath });

        // The response contains the headers with metadata information
        console.log('Object Metadata:');
        console.log(`Path: ${response.get('Path')}`);
        console.log(`Content Length: ${response.get('Content-Length')} bytes`);
        console.log(`Checksum: ${response.get('Checksum')}`);
        console.log(`Last Modified: ${response.get('Last-Modified')}`);
        console.log(`Expires: ${response.get('Expires')}`);
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.log('Process interrupted. Exiting...');
            process.exit(0);
        } else {
            console.log(`Encountered the following error: ${error}`);
            process.exit(1);
        }
    }
}

// Replace objectPath with the path of the object you want to get metadata for
const objectPath = "<OBJECT_PATH>";
App(objectPath);
```

If successful, the response will include headers with valuable information:

```bash
Object metadata:
- Path: your_object_path.jpg
- Content-Length: 2000000 bytes
- Checksum: 4191337226643912nbab1784de94c4f58bb78bf98bfb9916474b2fe5decbbaa6
- Last-Modified: Thu, 30 Oct 2025 00:30:41 UTC
- Expires: Thu, 30 Oct 2025 01:30:41 UTC
```

You can use this information to verify the object size before downloading,
confirm the object hasn't been modified using the checksum,
and check when the object expires and is removed from your environment.

## Set object time-to-live

In Lattice, an **object** is a data model that represents a single file or a piece of data. When uploading objects, you can control how long they will be stored in Lattice
by setting a Time-To-Live (TTL) value. This is useful for temporary files or for implementing storage policies.

Before uploading, you need to:

1. Have a file ready to upload
2. Determine the desired time-to-live in nanoseconds

For example, to keep an object for 24 hours, you would set the TTL to:
`24 * 60 * 60 * 1,000,000,000` nanoseconds (86,400,000,000,000 ns)

Use the Lattice SDK to upload the object, adding the `Time-To-Live` request header to specify the TTL:

```go title={"Go"} maxLines={25}
package main

import (
	"bytes"
	"context"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

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
	c := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)

	// File path of the object to upload
	filePath := "<FILE_PATH_TTL>"

	// Set TTL to 1 hour in nanoseconds
	ttlInNanoseconds := int64(1 * 60 * 60 * 1000000000) // 1 hour in nanoseconds

	// Create context for the request
	ctx := context.Background()

	// Read the file contents into a byte slice.
	fileContent, err := os.ReadFile(filePath)
	if err != nil {
		fmt.Printf("Error reading file: %v\n", err)
		os.Exit(1)
	}

	// Get file name for object path
	objectPath := filepath.Base(filePath)

	// Create TTL header
	ttlHeaders := http.Header{}
	ttlHeaders.Add("Time-To-Live", strconv.FormatInt(ttlInNanoseconds, 10))

	// Upload object with TTL header
	response, err := c.Objects.UploadObject(
		ctx,
		objectPath,
		bytes.NewReader(fileContent),
		option.WithHTTPHeader(ttlHeaders),
	)
	if err != nil {
		fmt.Printf("Error uploading object: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Object uploaded successfully. Object path: %s\n", response.ContentIdentifier.Path)
	fmt.Printf("Object will expire after %d seconds\n", ttlInNanoseconds/1000000000)

	// Verify the expiry time by getting object metadata
	metadataResponse, err := c.Objects.WithRawResponse.GetObjectMetadata(ctx, &Lattice.GetObjectMetadataRequest{ObjectPath: objectPath})
	if err != nil {
		fmt.Printf("Error getting object metadata: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Expiry time confirmed: %s\n", metadataResponse.Header.Get("Expires"))
}

```

```java title={"Java"} maxLines={25}
package org.example;

import com.anduril.Lattice;
import com.anduril.core.RequestOptions;

import java.io.File;
import java.io.FileInputStream;

public class UploadWithTtl {
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

            // File path of the object to upload
            String filePath = "<FILE_PATH_TTL>";

            // Set TTL to 1 hour in nanoseconds
            long ttlInNanoseconds = 1L * 60 * 60 * 1000000000; // 1 hour in nanoseconds

            // Create a File object from the file path
            File file = new File(filePath);

            // Get file name for object path
            String objectPath = file.getName();

            try {
                // Create request options with TTL header
                RequestOptions requestOptions = RequestOptions.builder()
                    .addHeader("Time-To-Live", String.valueOf(ttlInNanoseconds))
                    .build();

                // Upload the file with TTL header using byte array
                FileInputStream fileInputStream = new FileInputStream(file);
                byte[] fileBytes = new byte[(int) file.length()];
                fileInputStream.read(fileBytes);
                fileInputStream.close();

                var result = client.objects().uploadObject(objectPath, fileBytes, requestOptions);

                System.out.println("Object uploaded successfully. Object path: " + result.getContentIdentifier().getPath());
                System.out.println("Object will expire after " + (ttlInNanoseconds / 1_000_000_000) + " seconds");

                // Verify the expiry time by getting object metadata
                var metadata = client.objects().withRawResponse().getObjectMetadata(objectPath);
                System.out.println("Expiry time confirmed: " + metadata.headers().get("Expires"));

            } catch (Exception e) {
                System.err.println("Error uploading object: " + e.getMessage());
            }
        } catch (Exception e) {
            System.err.println("Error initializing client: " + e.getMessage());
        }
    }
}
```

```py title={"Python"} maxLines={25}
from anduril import Lattice
import os
import sys
import asyncio

lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')
# Remove sandboxes_token from the following statements if you are not developing on Sandboxes.
sandboxes_token = os.getenv('SANDBOXES_TOKEN')
if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
    print("Missing required environment variables.")
    sys.exit(1)

# Set the TTL value to 1 hour, expressed in nanoseconds.
time_to_live = 1 * 60 * 60 * 1000000000

headers = {
    "anduril-sandbox-authorization": f"Bearer {sandboxes_token}"
}

client = Lattice(
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    headers=headers
)

async def app(file_path):
    try:
        # Get the file name.
        file_name = os.path.basename(file_path)
        # Define a unique path for the object using the file name.
        object_path = f"{file_name}"
        # Open the file in binary mode.
        with open(f"{file_path}", "rb") as file:
            # Use the upload_object method to upload the file to Lattice.
            client.objects.upload_object(
                object_path=object_path,
                request=file,
                request_options={
                    "additional_headers": {
                        "time-to-live": f"{time_to_live}"
                    }
                }
            )
        print(f"Object path: {object_path}")

        # Verify the expiry time by getting object metadata
        metadata = client.objects.get_object_metadata(
            object_path=object_path
        )

        print(f"Object expires on {metadata.get('expires')}")

    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    # Replace with your file path
    file_path = "<FILE_PATH_TTL>"
    asyncio.run(app(file_path))
```

```ts title={"Typescript"} maxLines={25}
import { LatticeClient } from "@anduril-industries/lattice-sdk";
import { basename } from 'path';
import { createReadStream } from "fs";

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
        // Remove the header if you are not developing on Sandboxes.
        headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    }
);

async function App(filePath: string, ttlInNanoseconds: number) {
    const fileStreamReadable = createReadStream(filePath);
    try {
        // Set the object path using the file name.
        const objectPath = `${basename(filePath)}`;

        // Upload the file to Lattice with TTL header
        // The Time-To-Live header sets the expiration time in nanoseconds
        const requestOptions = {
            headers: {
                'Time-To-Live': ttlInNanoseconds.toString()
            }
        };

        const result = await client.objects.uploadObject(
            fileStreamReadable,
            objectPath,
            requestOptions
        );

        console.log(`Object uploaded successfully. Object path: ${result.content_identifier.path}`);
        console.log(`Object will expire after ${ttlInNanoseconds / 1e9} seconds`);

        // You can verify the expiry time by getting the object metadata
        const metadata = await client.objects.getObjectMetadata({ objectPath });
        console.log(`Expiry time confirmed: ${metadata.get('Expires')}`);

    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.log('Process interrupted. Exiting...');
            process.exit(0);
        } else {
            console.log(`Encountered the following error: ${error}`);
            process.exit(1);
        }
    } finally {
        fileStreamReadable.close();
    }
}

// Replace filepath with the path of the file you want to upload.
const filePath = "<FILE_PATH_TTL>";
// Set TTL to 1 hour in nanoseconds
const ttlInNanoseconds = 1 * 60 * 60 * 1000000000; // 1 hour in nanoseconds
App(filePath, ttlInNanoseconds);
```

If successful, Lattice sets an expiry time based on the value you specify in the
`Time-To-Live` header. The example from the previous steps confirms the result by
fetching the object's metadata and checking the `Expires` header:

```bash
Object expires on Mon, 01 Jan 2026 00:00:00 UTC
```

If you don't set a TTL, Lattice will use a default typically set to 90 days. This default TTL policy might vary,
based on your environment's configurations.

## Delete an object

In Lattice, an **object** is a data model that represents a single file or a piece of data. When you no longer need an object, you can delete it from Lattice
to free up storage space. Deleting an object is a permanent operation that cannot be undone.

When using the [DeleteObject](/reference/rest/objects/delete-object) API, you must specify
the object path of the object you want to delete.

Replace the object path with your information, then run the following code to delete the object:

```go title={"Go"} maxLines={25}
// Example code for deleting an object
package main

import (
	"context"
	"fmt"
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
	headers := make(map[string][]string)
	headers["Anduril-Sandbox-Authorization"] = []string{fmt.Sprintf("Bearer %s", sandboxesToken)}

	// Create the client
	c := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)
	// Set object path to delete
	objectPath := "<DELETE_OBJECT_PATH>"

	// Create context for the request
	ctx := context.Background()

	// Delete the object
	err := c.Objects.DeleteObject(ctx, &Lattice.DeleteObjectRequest{ObjectPath: objectPath})
	if err != nil {
		fmt.Printf("Error deleting object: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Object deleted successfully: %s\n", objectPath)

	// Try to access the object to verify it's deleted
	_, err = c.Objects.WithRawResponse.GetObjectMetadata(ctx, &Lattice.GetObjectMetadataRequest{ObjectPath: objectPath})
	if err != nil {
		fmt.Println("Verification successful: Object no longer exists.")
		fmt.Printf("Expected error: %v\n", err)
	} else {
		fmt.Println("Warning: Object still exists after deletion attempt.")
	}
}

```

```java title={"Java"} maxLines={25}
package org.example;

import com.anduril.Lattice;

public class DeleteObject {
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

            // Set the object path
            String objectPath = "<DELETE_OBJECT_PATH>";

            try {
                // Delete the object
                client.objects().deleteObject(objectPath);
                System.out.println("Object deleted successfully: " + objectPath);

                // Try to access the object to verify it's deleted
                try {
                    client.objects().getObjectMetadata(objectPath);
                    System.out.println("Warning: Object still exists after deletion attempt.");
                } catch (Exception e) {
                    System.out.println("Verification successful: Object no longer exists.");
                    System.out.println("Expected error: " + e.getMessage());
                }

            } catch (Exception e) {
                System.err.println("Error deleting object: " + e.getMessage());
            }
        } catch (Exception e) {
            System.err.println("Error initializing client: " + e.getMessage());
        }
    }
}
```

```py title={"Python"} maxLines={25}
from anduril import Lattice
import os
import sys
import asyncio

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
    # Remove the following if you are not developing on a Sandboxes.
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)

async def app(object_path):
    try:
        # Delete the object
        client.objects.delete_object(
            object_path=object_path
        )

        print(f"Object deleted successfully: {object_path}")

        try:
            client.objects.get_object_metadata(
                object_path=object_path
            )
            print("Object still exists after deletion attempt.")
        except Exception as e:
            print(f"NotFound: {e}")

    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")

if __name__ == "__main__":
    # Replace with the path of the object you want to delete
    asyncio.run(app(object_path="<DELETE_OBJECT_PATH>"))
```

```ts title={"Typescript"} maxLines={25}
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
        // Remove the header if you are not developing on Sandboxes.
        headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    }
);

async function App(objectPath: string) {
    try {
        // Delete the object
        await client.objects.deleteObject({ objectPath });

        console.log(`Object deleted successfully: ${objectPath}`);

        // Try to access the object to verify it's deleted
        try {
            await client.objects.getObjectMetadata({ objectPath });
            console.log('Warning: Object still exists after deletion attempt.');
        } catch {
            console.log('Verification successful: Object no longer exists.');
        }
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.log('Process interrupted. Exiting...');
            process.exit(0);
        } else {
            console.log(`Encountered the following error: ${error}`);
            process.exit(1);
        }
    }
}

// Replace objectPath with the path of the object you want to delete
const objectPath = "<DELETE_OBJECT_PATH>";
App(objectPath);
```

If successful, this produces an error with the following output:
the object no longer exists"

```bash
Object deleted successfully: test.jpg
Status: 404
```

When you delete an object, you must clean up any references to the object path in your environment.

For example, if the object is linked to an entity, using the entity's `Media` component, your app must submit an `Override`
to remove the object path from the list. Run the following example:

```go title={"Go (REST)"} maxLines={25}
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
	sandboxesToken := os.Getenv("SANDBOXES_TOKEN")

	// Check required environment variables
	if latticeEndpoint == "" || clientId == "" || clientSecret == "" || sandboxesToken == "" {
		fmt.Println("Make sure your Lattice URL and bearer token have been set as system environment variables.")
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

	// Set the entity ID
	entityID := "<ENTITY_ID>"

	// Create context for the request
	ctx := context.Background()

	// Create empty media array
	media := Lattice.Media{
		Media: []*Lattice.MediaItem{},
	}

	// Create a provenance object
	latestTimestamp := time.Now().UTC()

	// Create an entity with empty media
	entityOverride := Lattice.EntityOverride{
		EntityID:  entityID,
		FieldPath: "media.media",
		Entity: &Lattice.Entity{
			EntityID: &entityID,
			Media:    &media,
		},
		Provenance: &Lattice.Provenance{
			IntegrationName:  Lattice.String("<your_integration_name>"),
			DataType:         Lattice.String("<your_data_type>"),
			SourceUpdateTime: Lattice.Time(latestTimestamp),
		},
	}

	// Override the entity's media field
	_, err := LatticeClient.Entities.OverrideEntity(
		ctx,
		&entityOverride,
	)

	if err != nil {
		fmt.Printf("Exception: %v\n", err)
		return
	}

	// Get the entity to verify the media was cleared
	entity, err := LatticeClient.Entities.GetEntity(
		ctx,
		&Lattice.GetEntityRequest{EntityID: entityID},
	)

	if err != nil {
		fmt.Printf("Failed to get entity: %v\n", err)
		return
	}

	fmt.Printf("Entity: %s\n", *entity.EntityID)
	if entity.Media != nil && entity.Media.Media != nil {
		fmt.Printf("Media: %v\n", entity.Media.Media)
	} else {
		fmt.Printf("Media: None\n")
	}
}

```

```java title={"Java (REST)"} maxLines={25}
package org.example;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Collections;

import com.anduril.Lattice;
import com.anduril.resources.entities.requests.EntityOverride;
import com.anduril.types.Entity;
import com.anduril.types.Media;
import com.anduril.types.Provenance;

/**
 * Example application that demonstrates how to clear media from an entity using the Lattice SDK.
 */
public class OverrideMediaClear {
    public static void main(String[] args) {
        // Get environment variables
        String endpoint = System.getenv("LATTICE_ENDPOINT");
        String clientId = System.getenv("LATTICE_CLIENT_ID");
        String clientSecret = System.getenv("LATTICE_CLIENT_SECRET");
        String sandboxesToken = System.getenv("SANDBOXES_TOKEN");

        // Check required variables and ensure URL has https://
        if (endpoint == null || clientId == null || clientSecret == null || sandboxesToken == null) {
            System.err.println("Make sure your Lattice URL and bearer token have been set as system environment variables.");
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

            // Set the entity ID
            String entityId = "<ENTITY_ID>";

            // Create empty Media object
            Media media = Media.builder()
                .media(Collections.emptyList())
                .build();

            // Create a provenance object
            Provenance provenance = Provenance.builder()
                .integrationName("<your_integration_name>")
                .dataType("<your_data_type>")
                .sourceUpdateTime(OffsetDateTime.now(ZoneOffset.UTC))
                .build();

            // Create an entity with empty media
            EntityOverride entityOverride = EntityOverride.builder()
                .entity(Entity.builder()
                    .entityId(entityId)
                    .media(media)
                    .build())
                .provenance(provenance)
                .build();

            // Override the entity's media field
            client.entities().overrideEntity(
                entityId,
                "media.media",
                entityOverride
            );

            // Get the entity to verify the media was cleared
            Entity result = client.entities().getEntity(entityId);
            
            System.out.println("Entity: " + result.getEntityId());
            System.out.println("Media: " + result.getMedia());

        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
    }
}
```

```py title={"Python (REST)"} maxLines={25}
from anduril import Lattice, Media, Entity, Provenance
from datetime import datetime, timezone
import os
import sys
import asyncio
import logging

lattice_endpoint = os.getenv('LATTICE_ENDPOINT')
client_id = os.getenv('LATTICE_CLIENT_ID')
client_secret = os.getenv('LATTICE_CLIENT_SECRET')
sandboxes_token = os.getenv('SANDBOXES_TOKEN')

if not client_id or not client_secret or not lattice_endpoint or not sandboxes_token:
    print("Make sure your Lattice URL and bearer token " \
    "have been set as system environment variables.")
    sys.exit(1)
    
# Create an API stub to interact with Lattice.
client = Lattice(
    # Set your environment URL, and provide both tokens.
    base_url=f"https://{lattice_endpoint}",
    client_id=client_id,
    client_secret=client_secret,
    headers={ "anduril-sandbox-authorization": f"Bearer {sandboxes_token}" }
)
async def app(entity_id):
    try:
        latest_timestamp = datetime.now(timezone.utc)
        provenance = Provenance(
            integration_name="<your_integration_name>",
            data_type="<your_data_type>",
            source_update_time=latest_timestamp
        )
        media = Media(
            media=[]
        )

        client.entities.override_entity(
            entity_id=entity_id,
            field_path="media.media",
            entity=Entity(
                entity_id=entity_id,
                media=media
            ),
            provenance=provenance
        )

        result = client.entities.get_entity(
            entity_id=entity_id
        )

        print(f"Entity: {result.entity_id}")
        print(f"Media: {result.media}")

    except asyncio.CancelledError:
        logging.info(">>>Exiting...")
    except Exception as error:
        logging.error(f"Exception: {error}")

if __name__ == "__main__":
    # Set the integration name and the file path.
    asyncio.run(app(entity_id="<ENTITY_ID>"))
```

```ts title={"Typescript (REST)"} maxLines={25}
import { LatticeClient } from "@anduril-industries/lattice-sdk";

const latticeEndpoint = process.env.LATTICE_ENDPOINT;
const clientSecret = process.env.LATTICE_CLIENT_SECRET;
const clientId = process.env.LATTICE_CLIENT_ID;

// Remove sandboxesToken from the following statements if you are not developing on Sandboxes.
const sandboxesToken = process.env.SANDBOXES_TOKEN;
if (!latticeEndpoint || !clientId || !clientSecret || !sandboxesToken) {
    console.log('Make sure your Lattice URL and bearer token have been set as system environment variables.');
    process.exit(1);
}

const client = new LatticeClient(
    {
        baseUrl: `https://${latticeEndpoint}`,
        clientId: clientId,
        clientSecret: clientSecret,
        // Remove the header if you are not developing on Sandboxes.
        headers: { "Anduril-Sandbox-Authorization": `Bearer ${sandboxesToken}` }
    }
);

async function App(entityId: string) {
    const latestTimestamp = new Date().toISOString();
    try {
        // Override the nested media.media component of the entity with an empty array.
        await client.entities.overrideEntity(
            {
                entityId,
                fieldPath: 'media.media',
                entity: {
                    entityId: entityId,
                    media: {
                        media: []
                    }
                },
                provenance: {
                    integrationName: "<your_integration_name>",
                    dataType: "<your_data_type>",
                    sourceUpdateTime: latestTimestamp
                }
            }
        );

        // Get the entity to verify the media was cleared
        const result = await client.entities.getEntity({ entityId });

        console.log(`Entity: ${result.entityId}`);
        console.log(`Media: ${result.media}`);

    } catch (error) {
        console.log(`Exception: ${error}`);
    }
}

// Replace with the ID of the entity you want to clear media from.
const entityId = '<ENTITY_ID>';
App(entityId);
```

```go title={"Go (gRPC)"} maxLines={25}
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

	// Set the entity ID
	entityID := "<ENTITY_ID>"

	// Create context for the request
	ctx := context.Background()

	// Create empty media array
	emptyMediaItems := []*entitymanagerv1.MediaItem{}
	media := &entitymanagerv1.Media{
		Media: emptyMediaItems,
	}

	// Create a provenance object with current timestamp
	latestTimestamp := time.Now().UTC()
	provenance := &entitymanagerv1.Provenance{
		IntegrationName:  "<your_integration_name>",
		DataType:         "<your_data_type>",
		SourceUpdateTime: timestamppb.New(latestTimestamp),
	}

	// Create an entity with empty media
	entity := &entitymanagerv1.Entity{
		EntityId: entityID,
		Media:    media,
	}

	// Create the override entity request
	request := &entitymanagerv1.OverrideEntityRequest{
		Entity:     entity,
		FieldPath:  []string{"media.media"},
		Provenance: provenance,
	}

	// Call the OverrideEntity method
	_, err = client.OverrideEntity(ctx, request)

	// Handle errors
	if err != nil {
		fmt.Printf("Exception: %v\n", err)
		return
	}
}

```

```py title={"Python (gRPC)"} maxLines={25}
# This Python example is compatible with artifacts generated using
# the following grpc/python plugin: https://buf.build/anduril/lattice-sdk/sdks/main:grpc/python

import os
import sys
from datetime import datetime, timezone
import grpc
from auth import ClientCredentialsAuth
from google.protobuf.timestamp_pb2 import Timestamp

from anduril.entitymanager.v1.entity.pub_pb2 import Entity, Provenance
from anduril.entitymanager.v1.entity_manager_api.pub_pb2 import OverrideEntityRequest
from anduril.entitymanager.v1.entity_manager_api.pub_pb2_grpc import EntityManagerAPIStub
from anduril.entitymanager.v1.media.pub_pb2 import Media


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

    entity_id = "<ENTITY_ID>"

    # Empty Media component clears the existing list
    media = Media(media=[])

    latest_timestamp = Timestamp()
    latest_timestamp.FromDatetime(datetime.now(timezone.utc))
    provenance = Provenance(
        integration_name="<your_integration_name>",
        data_type="<your_data_type>",
        source_update_time=latest_timestamp,
    )

    entity = Entity(entity_id=entity_id, media=media)

    request = OverrideEntityRequest(
        entity=entity,
        field_path=["media.media"],
        provenance=provenance,
    )

    try:
        client.OverrideEntity(request)
    except Exception as error:
        print(f"Exception: {error}", file=sys.stderr)


if __name__ == "__main__":
    main()

```

```rs title={"Rust (gRPC)"} maxLines={25}
// This Rust example is compatible with artifacts generated using
// the following grpc/rust plugin: https://buf.build/anduril/lattice-sdk/sdks/main:community/neoeinstein-tonic
mod auth;

use anduril_lattice_sdk_community_neoeinstein_prost::anduril::entitymanager::v1::{
    Entity, Media, OverrideEntityRequest, Provenance,
};
use anduril_lattice_sdk_community_neoeinstein_tonic::anduril::entitymanager::v1::tonic::entity_manager_api_client::EntityManagerApiClient;
use auth::ClientCredentialsAuth;
use prost_types::Timestamp;
use tonic::metadata::MetadataValue;
use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use std::env;
use std::time::{SystemTime, UNIX_EPOCH};

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

    let entity_id = "<ENTITY_ID>".to_string();

    // Create the override entity request with an empty media array
    let request = Request::new(OverrideEntityRequest {
        entity: Some(Entity {
            entity_id,
            media: Some(Media { media: vec![] }),
            ..Default::default()
        }),
        field_path: vec!["media.media".to_string()],
        provenance: Some(Provenance {
            integration_name: "<your_integration_name>".to_string(),
            data_type: "<your_data_type>".to_string(),
            source_update_time: Some(now_timestamp()),
            ..Default::default()
        }),
    });

    if let Err(e) = client.override_entity(request).await {
        println!("Exception: {}", e);
    }

    Ok(())
}

```

If successful, you'll see an output similar to the following, confirming that the entity's `Media` component
is empty

```bash
Entity: <your_entity_id>
Media: None
```

## What's next?

* Learn more about the [Objects API](/reference/rest/objects/list-objects).
* Explore how to use objects with [Entities](/guides/entities/overview) to associate binary data with your Lattice entities.