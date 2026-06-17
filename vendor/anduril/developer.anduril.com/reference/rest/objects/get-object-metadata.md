> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Get object metadata

HEAD https://example.developer.anduril.com/api/v1/objects/{objectPath}

Returns metadata for a specified object path. Use this to fetch metadata such as object size (size_bytes), its expiry time (expiry_time), or its latest update timestamp (last_updated_at).

Reference: https://developer.anduril.com/reference/rest/objects/get-object-metadata

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: REST
  version: 1.0.0
paths:
  /api/v1/objects/{objectPath}:
    head:
      operationId: get-object-metadata
      summary: Get object metadata
      description: >-
        Returns metadata for a specified object path. Use this to fetch metadata
        such as object size (size_bytes), its expiry time (expiry_time), or its
        latest update timestamp (last_updated_at).
      tags:
        - subpackage_objects
      parameters:
        - name: objectPath
          in: path
          description: The path of the object to query.
          required: true
          schema:
            type: string
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
                $ref: '#/components/schemas/Objects_getObjectMetadata_Response_200'
        '400':
          description: Not Found
          content:
            application/json:
              schema:
                description: Any type
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                description: Any type
        '500':
          description: Internal Server Error
          content:
            application/json:
              schema:
                description: Any type
servers:
  - url: https://example.developer.anduril.com
    description: https://{server}
components:
  schemas:
    Objects_getObjectMetadata_Response_200:
      type: object
      properties: {}
      description: Empty response body
      title: Objects_getObjectMetadata_Response_200
  securitySchemes:
    OAuth:
      type: http
      scheme: bearer

```

## Examples



**Response**

```json
{}
```