> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# List tasks

> Retrieve a paginated list of tasks for the authenticated account.



## OpenAPI

````yaml /openapi.json get /v1/tasks
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/tasks:
    get:
      tags:
        - Tasks
      summary: List tasks
      description: Retrieve a paginated list of tasks for the authenticated account.
      parameters:
        - in: query
          name: cursor
          schema:
            description: >-
              Cursor for pagination. Use the next_cursor from the previous
              response.
            type: string
            format: uuid
          description: >-
            Cursor for pagination. Use the next_cursor from the previous
            response.
        - in: query
          name: limit
          schema:
            default: 100
            description: Number of tasks to return per page.
            examples:
              - 10
            type: integer
            minimum: 1
            maximum: 9007199254740991
          description: Number of tasks to return per page.
      responses:
        '200':
          description: List of tasks returned successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TaskListResponse'
              example:
                data:
                  - id: 123e4567-e89b-12d3-a456-426614174000
                    state: pending
                    output_url: string
                    status_url: >-
                      https://sdk.nimbleway.com/api/v2/tasks/123e4567-e89b-12d3-a456-426614174000
                    download_url: >-
                      https://sdk.nimbleway.com/api/v2/tasks/123e4567-e89b-12d3-a456-426614174000/results
                    error: Connection timeout
                    error_type: timeout_error
                    created_at: '2024-01-15T10:30:00Z'
                    modified_at: '2024-01-15T10:35:00Z'
                    account_name: string
                    input: null
                    _query: null
                    batch_id: 4b0a90bf-c951-42e4-95b3-a95a65ba69fc
                    status_code: 200
                    api_type: web
                pagination:
                  has_next: true
                  next_cursor: string
                  total: 1
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
          description: Task Not Found
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
                      - Task not found
                required:
                  - status
                  - error
              example:
                status: failed
                error: Task not found
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
    TaskListResponse:
      type: object
      properties:
        data:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                minLength: 1
                description: Unique task identifier.
                examples:
                  - 123e4567-e89b-12d3-a456-426614174000
              state:
                type: string
                enum:
                  - pending
                  - success
                  - error
                description: Current state of the task.
                examples:
                  - pending
              output_url:
                description: Storage location of the output data.
                type: string
              status_url:
                type: string
                format: uri
                description: URL for checking the task status.
                examples:
                  - >-
                    https://sdk.nimbleway.com/api/v2/tasks/123e4567-e89b-12d3-a456-426614174000
              download_url:
                description: URL for downloading the task results.
                examples:
                  - >-
                    https://sdk.nimbleway.com/api/v2/tasks/123e4567-e89b-12d3-a456-426614174000/results
                type: string
                format: uri
              error:
                description: Error message if the task failed.
                examples:
                  - Connection timeout
                type: string
              error_type:
                description: Classification of the error type.
                examples:
                  - timeout_error
                type: string
              created_at:
                description: Timestamp when the task was created.
                examples:
                  - '2024-01-15T10:30:00Z'
                type: string
              modified_at:
                description: Timestamp when the task was last modified.
                examples:
                  - '2024-01-15T10:35:00Z'
                type: string
              account_name:
                description: Account name that owns the task.
                type: string
              input:
                description: Original input data for the task.
              _query: {}
              batch_id:
                description: Batch ID if this task is part of a batch.
                examples:
                  - 4b0a90bf-c951-42e4-95b3-a95a65ba69fc
                type: string
              status_code:
                description: HTTP status code from the task execution.
                examples:
                  - 200
                type: number
              api_type:
                type: string
                enum:
                  - web
                  - serp
                  - ecommerce
                  - social
                  - media
                  - agent
                  - extract
            required:
              - id
              - state
              - status_url
              - created_at
              - input
              - _query
            additionalProperties: false
          description: Array of task objects.
        pagination:
          type: object
          properties:
            has_next:
              type: boolean
              description: Whether there are more tasks available.
            next_cursor:
              anyOf:
                - type: string
                - type: 'null'
              description: Cursor to use for fetching the next page.
            total:
              type: number
              description: Total number of tasks.
          required:
            - has_next
            - next_cursor
            - total
          additionalProperties: false
      required:
        - data
        - pagination
      additionalProperties: false
      description: Paginated list of tasks response.
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