> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# List objects

GET https://example.developer.anduril.com/api/v1/objects

Lists objects in your environment. You can define a prefix to list a subset of your objects. If you do not set a prefix, Lattice returns all available objects. By default this endpoint will list local objects only.

Reference: https://developer.anduril.com/reference/rest/objects/list-objects

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: REST
  version: 1.0.0
paths:
  /api/v1/objects:
    get:
      operationId: list-objects
      summary: List objects
      description: >-
        Lists objects in your environment. You can define a prefix to list a
        subset of your objects. If you do not set a prefix, Lattice returns all
        available objects. By default this endpoint will list local objects
        only.
      tags:
        - subpackage_objects
      parameters:
        - name: prefix
          in: query
          description: >-
            Filters the objects based on the specified prefix path. If no path
            is specified, all objects are returned.
          required: false
          schema:
            type: string
        - name: sinceTimestamp
          in: query
          description: Sets the age for the oldest objects to query across the environment.
          required: false
          schema:
            type: string
            format: date-time
        - name: pageToken
          in: query
          description: >-
            Base64 and URL-encoded cursor returned by the service to continue
            paging.
          required: false
          schema:
            type: string
            format: string
        - name: allObjectsInMesh
          in: query
          description: Lists objects across all environment nodes in a Lattice Mesh.
          required: false
          schema:
            type: boolean
        - name: maxPageSize
          in: query
          description: >-
            Sets the maximum number of items that should be returned on a single
            page.
          required: false
          schema:
            type: integer
        - name: Authorization
          in: header
          description: Bearer authentication
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListResponse'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          description: Unauthorized to access resource
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
servers:
  - url: https://example.developer.anduril.com
    description: https://{server}
components:
  schemas:
    ContentIdentifier:
      type: object
      properties:
        path:
          type: string
          description: >
            A valid path must not contain the following:

            - Spaces or Tabs

            - Special characters other than underscore (_), dash (-), period (.)
            and slash (/)

            - Non-ASCII characters such as accents or symbols

            Paths must not start with a leading space.
        checksum:
          type: string
          description: The SHA-256 checksum of this object.
      required:
        - path
        - checksum
      title: ContentIdentifier
    PathMetadata:
      type: object
      properties:
        content_identifier:
          $ref: '#/components/schemas/ContentIdentifier'
        size_bytes:
          type: integer
          format: uint64
        last_updated_at:
          type: string
          format: date-time
        expiry_time:
          type: string
          format: date-time
      required:
        - content_identifier
        - size_bytes
        - last_updated_at
      title: PathMetadata
    ListResponse:
      type: object
      properties:
        path_metadatas:
          type: array
          items:
            $ref: '#/components/schemas/PathMetadata'
        next_page_token:
          type: string
      required:
        - path_metadatas
      title: ListResponse
    Error:
      type: object
      properties:
        code:
          type: string
        message:
          type: string
      required:
        - code
        - message
      title: Error
  securitySchemes:
    OAuth:
      type: http
      scheme: bearer

```

## Examples



**Response**

```json
{
  "path_metadatas": [
    {
      "content_identifier": {
        "path": "string",
        "checksum": "string"
      },
      "size_bytes": 1,
      "last_updated_at": "2024-01-15T09:30:00Z",
      "expiry_time": "2024-01-15T09:30:00Z"
    }
  ],
  "next_page_token": "string"
}
```