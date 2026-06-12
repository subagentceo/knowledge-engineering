> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Map



## OpenAPI

````yaml /api-reference/openapi.json post /v1/map
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/map:
    post:
      tags:
        - Map
      summary: Map
      requestBody:
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/MapPayload'
              examples:
                - url: https://example.com
                  sitemap: include
                  country: US
                  locale: en-US
                  domain_filter: all
                  limit: 100
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/MapResponse'
                examples:
                  - task_id: 1ed1dbeb-8f34-4fd1-bb2d-a72bacae2ef3
                    success: true
                    links:
                      - title: Web Scraping API
                        url: https://www.example.com/page1
                        description: Complete guide to web scraping
                      - url: https://www.nimbleway.com/nimble-api/web
                      - title: API Documentation
                        url: https://www.example.com/docs
        '400':
          description: Unprocessable Entity - Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error400'
        '402':
          description: Payment Required
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error402'
        '429':
          description: Rate Limit Exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error429'
        '500':
          description: Internal Server Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error500'
      security:
        - BearerAuth: []
components:
  schemas:
    MapPayload:
      properties:
        url:
          type: string
          format: uri
          description: Url to map
          examples:
            - https://example.com
        sitemap:
          description: Sitemap and other methods will be used together to find URLs
          examples:
            - include
          type: string
          enum:
            - skip
            - include
            - only
        country:
          description: Country used to access the target URL, use ISO Alpha-2 Codes
          examples:
            - US
          type: string
        locale:
          description: >-
            LCID standard locale used for the URL request. Alternatively, user
            can use 'auto' for automatic locale based on geo-location
          examples:
            - en-US
          type: string
        domain_filter:
          description: Includes subdomains of the main domain in the mapping process
          examples:
            - all
          type: string
          enum:
            - domain
            - subdomain
            - all
        limit:
          description: Maximum number of links to return
          type: integer
          minimum: 1
          maximum: 100000
      type: object
      required:
        - url
      title: MapPayload
      description: Request body model for the /map endpoint
    MapResponse:
      type: object
      properties:
        task_id:
          type: string
          description: Unique identifier for the map task
          examples:
            - 123e4567-e89b-12d3-a456-426614174000
        success:
          type: boolean
          description: Indicates if the map request was successful
          examples:
            - true
        links:
          type: array
          items:
            type: object
            properties:
              url:
                type: string
                format: uri
              title:
                type: string
              description:
                type: string
            required:
              - url
            additionalProperties: false
          description: Array of mapped links with optional titles and descriptions
          examples:
            - url: https://example.com/page1
              title: Example Page 1
              description: This is an example description for page 1
            - url: https://example.com/page2
      required:
        - task_id
        - success
        - links
      additionalProperties: false
      description: Response schema for map requests
      examples:
        - task_id: 1ed1dbeb-8f34-4fd1-bb2d-a72bacae2ef3
          success: true
          links:
            - title: Web Scraping API
              url: https://www.example.com/page1
              description: Complete guide to web scraping
            - url: https://www.nimbleway.com/nimble-api/web
            - title: API Documentation
              url: https://www.example.com/docs
    Error400:
      type: object
      title: Error400
      properties:
        status:
          type: string
          example: failed
          examples:
            - failed
        msg:
          type: string
          description: Validation error message describing what went wrong
          example: Invalid request parameters
          examples:
            - Invalid request parameters
        error:
          type: string
          description: The validation error type
          example: PARAMETERS_FAILED_JSON_SCHEMA_VALIDATION_ERROR
          examples:
            - PARAMETERS_FAILED_JSON_SCHEMA_VALIDATION_ERROR
        details:
          type: object
          description: Detailed validation error information
          example:
            schema_validation_errors:
              - instancePath: ''
                schemaPath: '#/required'
                keyword: required
                params:
                  missingProperty: search_engine
                message: must have required property 'search_engine'
      required:
        - status
        - msg
      example:
        status: failed
        msg: Invalid request parameters
        error: PARAMETERS_FAILED_JSON_SCHEMA_VALIDATION_ERROR
        details:
          schema_validation_errors:
            - instancePath: ''
              schemaPath: '#/required'
              keyword: required
              params:
                missingProperty: search_engine
              message: must have required property 'search_engine'
    Error402:
      type: object
      title: Error402
      properties:
        status:
          type: string
          example: failed
          examples:
            - failed
        msg:
          type: string
          description: Error message indicating the payment issue
          example: trial expired
          enum:
            - no budget
            - limit reached
            - trial expired
            - trial quota finished
      required:
        - status
        - msg
      example:
        status: failed
        msg: trial expired
    Error429:
      type: object
      title: Error429
      properties:
        status:
          type: string
          example: failed
          examples:
            - failed
        msg:
          type: string
          example: Rate limit exceeded
          examples:
            - Rate limit exceeded
      required:
        - status
        - msg
      example:
        status: failed
        msg: Rate limit exceeded
    Error500:
      type: object
      title: Error500
      properties:
        success:
          type: string
          example: 'false'
          examples:
            - 'false'
        task_id:
          type: string
          example: 1ed1dbeb-8f34-4fd1-bb2d-a72bacae2ef3
          examples:
            - 1ed1dbeb-8f34-4fd1-bb2d-a72bacae2ef3
        message:
          type: string
          example: can't download the query response - please try again
          examples:
            - can't download the query response - please try again
      required:
        - success
        - task_id
        - message
      example:
        success: 'false'
        task_id: 1ed1dbeb-8f34-4fd1-bb2d-a72bacae2ef3
        message: can't download the query response - please try again
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer

````