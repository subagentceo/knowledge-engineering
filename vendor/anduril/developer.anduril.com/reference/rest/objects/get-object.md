> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Get object

GET https://example.developer.anduril.com/api/v1/objects/{objectPath}

Fetches an object from your environment using the objectPath path parameter.

Reference: https://developer.anduril.com/reference/rest/objects/get-object

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: REST
  version: 1.0.0
paths:
  /api/v1/objects/{objectPath}:
    get:
      operationId: get-object
      summary: Get object
      description: >-
        Fetches an object from your environment using the objectPath path
        parameter.
      tags:
        - subpackage_objects
      parameters:
        - name: objectPath
          in: path
          description: The path of the object to fetch.
          required: true
          schema:
            type: string
        - name: Authorization
          in: header
          description: Bearer authentication
          required: true
          schema:
            type: string
        - name: Accept-Encoding
          in: header
          description: >-
            If set, Lattice will compress the response using the specified
            compression method. If the header is not defined, or the compression
            method is set to `identity`, no compression will be applied to the
            response.
          required: false
          schema:
            $ref: >-
              #/components/schemas/ApiV1ObjectsObjectPathGetParametersAcceptEncoding
        - name: Priority
          in: header
          description: >
            Indicates a client's preference for the priority of the response.
            The value is a structured header as defined in RFC 9218. If you do
            not set the header, Lattice uses the default priority set for the
            environment. Incremental delivery directives are not supported and
            will be ignored.
          required: false
          schema:
            type: string
      responses:
        '200':
          description: Successful operation
          content:
            application/octet-stream:
              schema:
                type: string
                format: binary
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
        '404':
          description: The specified resource was not found
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
    ApiV1ObjectsObjectPathGetParametersAcceptEncoding:
      type: string
      enum:
        - identity
        - zstd
      title: ApiV1ObjectsObjectPathGetParametersAcceptEncoding
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

