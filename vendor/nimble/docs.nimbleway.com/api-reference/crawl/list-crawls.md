> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# List Crawls



## OpenAPI

````yaml /openapi.json get /v1/crawl
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/crawl:
    get:
      tags:
        - Crawl
      summary: List Crawls
      parameters:
        - in: query
          name: status
          schema:
            type: string
            enum:
              - queued
              - running
              - succeeded
              - failed
              - canceled
            description: Filter crawls by their status
            examples:
              - pending
          required: true
          description: Filter crawls by their status
        - in: query
          name: cursor
          schema:
            description: Cursor for pagination
            anyOf:
              - type: 'null'
              - type: string
          description: Cursor for pagination
        - in: query
          name: limit
          schema:
            description: Number of crawls to return per page
            examples:
              - 10
            type: integer
            minimum: 1
            maximum: 9007199254740991
          description: Number of crawls to return per page
      responses:
        '200':
          description: Successful Response - List of Crawl Tasks
          content:
            application/json:
              schema:
                allOf:
                  - type: object
                    properties:
                      data:
                        type: array
                        description: Array of crawl tasks
                        items:
                          type: object
                          properties:
                            crawl_id:
                              type: string
                              format: uuid
                              description: Unique identifier for the crawl task
                            name:
                              type: string
                              nullable: true
                              description: Optional name for the crawl task
                            url:
                              type: string
                              format: uri
                              description: Starting URL for the crawl
                            account_name:
                              type: string
                              nullable: true
                              description: The user's account name
                            status:
                              type: string
                              description: Current status of the crawl task
                              enum:
                                - pending
                                - running
                                - completed
                                - failed
                                - canceled
                            total:
                              type: integer
                              nullable: true
                              description: Total number of pages discovered
                            completed:
                              type: integer
                              nullable: true
                              description: Number of pages completed
                            failed:
                              type: integer
                              nullable: true
                              description: Number of pages failed
                            pending:
                              type: integer
                              nullable: true
                              description: Number of pages pending
                            created_at:
                              type: string
                              format: date-time
                              description: Timestamp when the crawl task was created
                            updated_at:
                              type: string
                              format: date-time
                              description: Timestamp when the crawl task was updateded
                            completed_at:
                              type: string
                              format: date-time
                              nullable: true
                              description: Timestamp when the crawl was completed
                            crawl_options:
                              type: object
                              description: Crawl configuration settings
                            extract_options:
                              type: object
                              nullable: true
                              description: Optional extraction configuration
                            tasks:
                              type: array
                              description: Array of individual page crawl tasks
                              items:
                                type: object
                                properties:
                                  task_id:
                                    type: string
                                    format: uuid
                                    examples:
                                      - abc12345-e89b-12d3-a456-426614174001
                                  status:
                                    type: string
                                    examples:
                                      - completed
                                    enum:
                                      - pending
                                      - failed
                                      - completed
                                  completed_at:
                                    type: string
                                    description: Timestamp when task was completed
                                  updated_at:
                                    type: string
                                    description: Timestamp when task was updateded
                      pagination:
                        type: object
                        description: Pagination information
                        properties:
                          hasNext:
                            type: boolean
                            description: Whether there are more results available
                          nextCursor:
                            type: string
                            nullable: true
                            description: Cursor for the next page of results
                          total:
                            type: integer
                            description: Total number of crawl tasks matching the filter
                    required:
                      - data
                      - pagination
                examples:
                  - data:
                      - crawl_id: 0e9984a1-980c-412d-9e95-ebe5f6704d8a
                        name: crawl_name
                        url: https://docs.nimbleway.com
                        account_name: account_name
                        status: queued
                        total: 2
                        completed: 2
                        pending: 0
                        failed: 0
                        created_at: '2026-01-24T11:55:24.197Z'
                        completed_at: null
                        crawl_options:
                          limit: 5000
                          sitemap: include
                          allow_subdomains: false
                          crawl_entire_domain: false
                          max_discovery_depth: 5
                          allow_external_links: false
                          ignore_query_parameters: false
                        extract_options: {}
                        tasks:
                          - task_id: 441e0939-064a-4945-b49d-038772fcce17
                            status: completed
                            created_at: '2026-02-05T10:34:21.487Z'
                            updated_at: '2026-02-05T10:34:26.674Z'
                          - task_id: 0b1351e9-8155-4cd2-8cc5-a7528d0692d4
                            status: completed
                            created_at: '2026-02-05T10:34:26.667Z'
                            updated_at: '2026-02-05T10:34:27.733Z'
                    pagination:
                      has_next: false
                      next_cursor: null
                      total: 15
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