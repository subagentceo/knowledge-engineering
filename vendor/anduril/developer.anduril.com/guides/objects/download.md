> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Download an object

In Lattice, an **object** is a data model that represents a single file or a piece of data. This page explains how to retrieve objects from Lattice.

## Before you begin

* To configure your app to upload objects, [set up](/guides/getting-started/set-up) your Lattice environment.
* See an overview of the [Object schema and the Object Store API](/guides/objects/overview) in Lattice.

## Download an object

In Lattice, an **object** is a data model that represents a single file or a piece of data. To download a specific binary object from Lattice
using its unique object path, do the following:

When using the [DownloadObject](/reference/rest/objects/get-object) API, you must specify
the object path of the object you want to download at runtime.

In the [previous](/guides/objects/upload) procedure,
you uploaded the following objects:

* Image: A `.jpg` image at the following path: `/api/v1/objects/cessna.jpg`.
  This image is a thumbnail of its associated track entity.
* CSV: A `.csv` file at the following path: `/api/v1/objects/manifest.csv`.
  This serves as metadata, in this case, a vessel manifest for the associated entity.
  Choose one, and note the object path.

Run the following code in the directory where you'd like to download the object.
To download, use the [`GetObject`](/reference/rest/objects/get-object) operation.
Replace the following:

* <code class="code-highlight">**object\_path**</code>: the unique path of the object in Lattice.

```go title={"Go"} maxLines={25}
package main

import (
	"context"
	"fmt"
	"io"
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
	c := client.NewClient(
		option.WithClientCredentials(clientId, clientSecret),
		option.WithBaseURL(fmt.Sprintf("https://%s", latticeEndpoint)),
		option.WithHTTPHeader(headers),
	)
	// Set object path
	objectPath := "<OBJECT_PATH>"

	// Create context for the request
	ctx := context.Background()

	// Get the object
	response, err := c.Objects.GetObject(ctx, &Lattice.GetObjectRequest{ObjectPath: objectPath})
	if err != nil {
		fmt.Printf("Error getting object: %v\n", err)
		os.Exit(1)
	}
	// Create output file
	file, err := os.Create(objectPath)
	if err != nil {
		fmt.Printf("Error creating file: %v\n", err)
		os.Exit(1)
	}
	defer file.Close()

	// Copy data from response to file
	_, err = io.Copy(file, response)
	if err != nil {
		fmt.Printf("Error writing to file: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Object downloaded successfully. Object path: %s\n", objectPath)
}

```

```java title={"Java"} maxLines={25}
package org.example;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

import com.anduril.Lattice;
public class Download {
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
            
            // Set the file path for downloaded file
            String objectPath = "<OBJECT_PATH>";
            
            // Create local file path with the original name and extension.
            String localFilePath = objectPath;
            File file = new File(localFilePath);
            
            try {
                // Download the object from Lattice
                InputStream response = client.objects().getObject(objectPath);
                
                // Save the downloaded object to file
                try (FileOutputStream outputStream = new FileOutputStream(file)) {
                    byte[] buffer = new byte[4096];
                    int bytesRead;
                    while ((bytesRead = response.read(buffer)) != -1) {
                        outputStream.write(buffer, 0, bytesRead);
                    }
                    System.out.println("Successfully downloaded " + objectPath + " to " + localFilePath);
                }
            } catch (Exception e) {
                System.err.println("Error downloading object: " + e.getMessage());
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
        response = client.objects.get_object(
            object_path=object_path
        )
        chunks = [chunk for chunk in response]
        result = b''.join(chunks)
        print(f"Downloaded file: {result}")
    
    except asyncio.CancelledError:
        print(">>>Exiting...")
    except Exception as error:
        print(f"Exception: {error}")
if __name__ == "__main__":
    # Set the object path to the function to download the object.
    asyncio.run(app(object_path="<OBJECT_PATH>"))
```

```ts title={"Typescript"} maxLines={25}
import { LatticeClient } from "@anduril-industries/lattice-sdk";
import { writeFileSync } from 'fs';

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
        const response = await client.objects.getObject({ objectPath });
        const data = new Uint8Array(await response.arrayBuffer());
        writeFileSync(objectPath, data);
        console.log(`Object downloaded successfully. Object path: ${objectPath}`);
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

// Replace objectPath with the path of the object you want to download from Lattice.
const objectPath = "<OBJECT_PATH>";
App(objectPath);
```

If successful, you'll see the following output:

```bash
INFO - HTTP Request: GET https://lattice-50802.env.sandboxes.developer.anduril.com/api/v1/objects/your_object_name "HTTP/1.1 200 OK"
```

## What's next?

* Learn more about the [Objects API](/reference/rest/objects/list-objects).