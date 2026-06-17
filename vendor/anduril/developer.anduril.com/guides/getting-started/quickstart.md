> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Quickstart

Try the Lattice SDK by connecting Lattice environment and publishing a surface vessel entity.

## Before you begin

* Complete the [set up](/guides/developer-tools/sandboxes) steps to log in to the Sandbox and create an environment.
  If you do not have access to a Lattice Sandbox, [request to join the Lattice SDK developer program](https://anduril.com/lattice-sdk).
* Confirm you have the curl command-line tool, or install it from the [curl](https://curl.se/) website:
  ```bash title="Bash"
  curl --version
  ```

## Publish a track

To get started with Lattice, consider this scenario: a friendly drone with access to Lattice has picked up a new track
that appears to be a surface vessel. To configure this drone to publish a track to Lattice as a new entity,
do the following:

Use your  **Lattice Client ID** and  **Lattice Client Secret** to get an access token from the server. This token has a lifetime of 30 minutes.

```bash title="curl"
export ENVIRONMENT_TOKEN=$(
    curl -s --request POST "https://$LATTICE_ENDPOINT/api/v1/oauth/token" \
    --header "Anduril-Sandbox-Authorization: Bearer $SANDBOXES_TOKEN" \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=client_credentials" \
    --data-urlencode "client_id=$LATTICE_CLIENT_ID" \
    --data-urlencode "client_secret=$LATTICE_CLIENT_SECRET" | \
    jq -r .access_token )
```

Copy the following entity JSON object and save it in a new file named `entity.json`.
Replace the timestamp for `expiryTime` with a time in the future, and `sourceUpdateTime`
with the current time:

```json maxLines=12 title="entity.json"
{
    "entityId": "QUICKSTART_ENTITY_ID",
    "description": "Quickstart example",
    "isLive": true,
    "expiryTime": "<YYYY-MM-DDThh:mm:ssTZD>",
    "aliases": {
        "name": "Simulated Surface Vessel"
    },
    "milView": {
        "disposition": "DISPOSITION_FRIENDLY",
        "environment": "ENVIRONMENT_SURFACE"
    },
    "location": {
        "position": {
            "latitudeDegrees": 33.69447852698943,
            "longitudeDegrees": -117.9173785693163,
            "altitudeHaeMeters": 0
        }
    },
    "ontology": {
        "template": "TEMPLATE_TRACK",
        "platformType": "Surface_Vessel",
        "specificType": "N/A"
    },
    "provenance": {
        "integrationName": "command_line_integration",
        "dataType": "example_data_type",
        "sourceUpdateTime": "<YYYY-MM-DDThh:mm:ssTZD>"
    }
}
```

From the same folder where you saved `entity.json`, use curl
to publish the entity to Lattice:

```bash title="curl"
curl --location \
--request PUT "https://$LATTICE_ENDPOINT/api/v1/entities" \
--header "content-type: application/json" \
--header "authorization: Bearer $ENVIRONMENT_TOKEN" \
--header "anduril-sandbox-authorization: Bearer $SANDBOXES_TOKEN" \
--include \
--data "@entity.json"
```

If the request is successful, you get a <code>**200**</code> status response with an empty body: `{}`.

## Find the vessel in Lattice

To verify that your surface vessel was successfully published to Lattice,
do the following:

Open the Lattice UI.

Find the vessel in the Entity Explorer. Search by the
vessel's `aliases.name` to narrow the list:

<img src="/_files/anduril.docs.buildwithfern.com/72c242c7f0277f5a308bd2efb784cfcd9675f4dab9d1790bd9b195c6df74c7d0/assets/images/screenshots/developer-console-entity-explorer.png" alt="Shows the Entity Explorer in the Lattice Developer Console." />

Open the vessel to view its detail page, and confirm its location, name, and other
components match the entity you published:

<img src="/_files/anduril.docs.buildwithfern.com/f4a1cc6ad39c631b2b40aba648adf11805f4168f9e5be4005d1ec8ffe8aa5a55/assets/images/screenshots/developer-console-surface-vessel-detail.png" alt="Shows the Simulated Surface Vessel's detail page in the Lattice Developer Console." />

## What's next?

* Explore the different [Lattice entity shapes](/guides/entities/overview).
* Learn how to [task an asset](/guides/tasks/overview) in Lattice
* Check out our [sample apps](/samples/overview) in GitHub.