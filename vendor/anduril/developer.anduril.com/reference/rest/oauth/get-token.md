> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Get OAuth2 token

POST https://example.developer.anduril.com/api/v1/oauth/token
Content-Type: application/x-www-form-urlencoded

Gets a new short-lived token using the specified client credentials

Reference: https://developer.anduril.com/reference/rest/oauth/get-token

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: REST
  version: 1.0.0
paths:
  /api/v1/oauth/token:
    post:
      operationId: get-token
      summary: Get OAuth2 token
      description: Gets a new short-lived token using the specified client credentials
      tags:
        - subpackage_oauth
      parameters:
        - name: Authorization
          in: header
          description: Bearer authentication
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Access token response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/oauth_getToken_Response_200'
        '400':
          description: Bad request or invalid request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetTokenRequestBadRequestError'
        '401':
          description: Unauthorized - client authentication failed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetTokenRequestUnauthorizedError'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                grant_type:
                  type: string
                  enum:
                    - client_credentials
                  description: The type of grant being requested
                client_id:
                  type: string
                  description: The client identifier
                client_secret:
                  type: string
                  format: password
                  description: The client secret
              required:
                - grant_type
servers:
  - url: https://example.developer.anduril.com
    description: https://{server}
components:
  schemas:
    oauth_getToken_Response_200:
      type: object
      properties:
        access_token:
          type: string
          description: The access token
        token_type:
          type: string
          description: The type of token (typically "Bearer")
        expires_in:
          type: integer
          description: Lifetime of the access token in seconds
        refresh_expires_in:
          type: integer
          description: Lifetime of the refresh token
        not-before-policy:
          type: integer
          description: Enforce that a token cannot be used before a specific unixtime
        scope:
          type: string
          description: The scope of the access token
      required:
        - access_token
        - token_type
      title: oauth_getToken_Response_200
    GetTokenRequestBadRequestError:
      type: object
      properties:
        error:
          type: string
        error_description:
          type: string
      required:
        - error
      title: GetTokenRequestBadRequestError
    GetTokenRequestUnauthorizedError:
      type: object
      properties:
        error:
          type: string
        error_description:
          type: string
      required:
        - error
      title: GetTokenRequestUnauthorizedError
  securitySchemes:
    OAuth:
      type: http
      scheme: bearer

```

## Examples



**Request**

```json
{
  "grant_type": "client_credentials"
}
```

**Response**

```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_expires_in": 1,
  "not-before-policy": 1,
  "scope": "string"
}
```