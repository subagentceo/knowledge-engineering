> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Upload object

POST https://example.developer.anduril.com/api/v1/objects/{objectPath}
Content-Type: application/octet-stream

Uploads an object. The object must be 1 GiB or smaller.

Reference: https://developer.anduril.com/reference/rest/objects/upload-object

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: REST
  version: 1.0.0
paths:
  /api/v1/objects/{objectPath}:
    post:
      operationId: upload-object
      summary: Upload object
      description: Uploads an object. The object must be 1 GiB or smaller.
      tags:
        - subpackage_objects
      parameters:
        - name: objectPath
          in: path
          description: Path of the Object that is to be uploaded.
          required: true
          schema:
            type: string
        - name: Authorization
          in: header
          description: Bearer authentication
          required: true
          schema:
            type: string
        - name: Time-To-Live
          in: header
          description: >-
            An optional expiry TTL associated with an object. The value
            represents the number of nanoseconds the object will exist in the
            local store. If no TTL is supplied, the server applies a default
            TTL. In most cases, the default TTL is 90 days. However, it might be
            higher or lower, depending on the retention requirements of your
            environment.
          required: false
          schema:
            type: integer
            format: int64
        - name: Distribution-Mode
          in: header
          description: >-
            Controls how the object is distributed across the mesh. If set to
            `force`, the object will be force distributed to all nodes.
            Force-distributed objects are subject to a size limit.
          required: false
          schema:
            $ref: >-
              #/components/schemas/ApiV1ObjectsObjectPathPostParametersDistributionMode
      responses:
        '200':
          description: Successful upload
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PathMetadata'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '413':
          description: Content too large
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
        '507':
          description: Insuccifient Storage
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
      requestBody:
        content:
          application/octet-stream:
            schema:
              type: string
              format: binary
servers:
  - url: https://example.developer.anduril.com
    description: https://{server}
components:
  schemas:
    ApiV1ObjectsObjectPathPostParametersDistributionMode:
      type: string
      enum:
        - force
      title: ApiV1ObjectsObjectPathPostParametersDistributionMode
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
  "content_identifier": {
    "path": "string",
    "checksum": "string"
  },
  "size_bytes": 1,
  "last_updated_at": "2024-01-15T09:30:00Z",
  "expiry_time": "2024-01-15T09:30:00Z"
}
```