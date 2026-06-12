> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Crawl by ID



## OpenAPI

````yaml /api-reference/openapi.json get /v1/crawl/{id}
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/crawl/{id}:
    get:
      tags:
        - Crawl
      summary: Crawl by ID
      parameters:
        - in: path
          name: id
          schema:
            type: string
            format: uuid
            description: The unique identifier of the crawl task
            examples:
              - 123e4567-e89b-12d3-a456-426614174000
          required: true
          description: The unique identifier of the crawl task
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                allOf:
                  - type: object
                    properties:
                      status:
                        type: string
                        description: Status of the crawl task
                        examples:
                          - succeeded
                      crawl_id:
                        type: string
                        format: uuid
                        description: Unique identifier for the crawl task
                        examples:
                          - 123e4567-e89b-12d3-a456-426614174000
                      name:
                        type: string
                        description: Name of the crawl task
                      account_name:
                        type: string
                        description: The user's account name
                      total:
                        type: integer
                        description: Total number of pages to crawl
                        examples:
                          - 10
                      completed:
                        type: integer
                        description: Number of pages completed
                        examples:
                          - 2
                      failed:
                        type: integer
                        description: Number of pages failed
                        examples:
                          - 2
                      pending:
                        type: integer
                        description: Number of pages pending
                        examples:
                          - 2
                      created_at:
                        type: string
                        description: Timestamp when crawl was created
                      completed_at:
                        type: string
                        description: Timestamp when crawl was completed
                      updated_at:
                        type: string
                        description: Timestamp when crawl was updateded
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
                          required:
                            - task_id
                            - url
                    required:
                      - status
                      - crawl_id
                      - name
                      - total
                      - completed
                      - created_at
                      - completed_at
                      - tasks
                examples:
                  - crawl_id: 85b21e98-69c5-4aa5-9d25-261a55bbf0db
                    name: my-crawler-1
                    url: https://www.amazon.com/dp
                    account_name: account_name
                    status: succeeded
                    completed_at: '2026-02-11T13:57:27.549Z'
                    crawl_options:
                      limit: 10
                      sitemap: include
                      allow_subdomains: false
                      crawl_entire_domain: false
                      max_discovery_depth: 5
                      allow_external_links: false
                      ignore_query_parameters: false
                    extract_options: null
                    created_at: '2026-02-11T13:55:45.512Z'
                    updated_at: '2026-02-11T13:57:27.555Z'
                    pending: 0
                    completed: 3
                    failed: 1
                    total: 4
                    tasks:
                      - task_id: 8d2bb2fc-e469-4549-b5d8-0d307352aeb5
                        status: completed
                        created_at: '2026-02-11T13:55:45.846Z'
                        updated_at: '2026-02-11T13:55:52.138Z'
                      - task_id: f1fc1a7d-588b-4c9c-b6f3-00a00b6796ce
                        status: completed
                        created_at: '2026-02-11T13:55:52.115Z'
                        updated_at: '2026-02-11T13:55:53.335Z'
                      - task_id: 79389a76-7c7f-4d6d-9041-c13ff83dc265
                        status: completed
                        created_at: '2026-02-11T13:55:52.115Z'
                        updated_at: '2026-02-11T13:55:53.858Z'
                      - task_id: 7f10be27-a526-4cbb-8330-53c7871e7572
                        status: failed
                        created_at: '2026-02-11T13:55:46.075Z'
                        updated_at: '2026-02-11T13:57:27.534Z'
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
        '404':
          description: Crawl Not Found
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    examples:
                      - failed
                  error:
                    type: string
                    examples:
                      - Crawl not found
                required:
                  - status
                  - error
              example:
                status: failed
                error: Crawl not found
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