> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get batch details

> Retrieve the details of a batch including all its tasks and completion status.



## OpenAPI

````yaml /api-reference/openapi.json get /v1/batches/{batch_id}
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/batches/{batch_id}:
    get:
      tags:
        - Tasks
      summary: Get batch details
      description: >-
        Retrieve the details of a batch including all its tasks and completion
        status.
      parameters:
        - in: path
          name: batch_id
          schema:
            type: string
            description: The unique identifier of the batch.
            examples:
              - 123e4567-e89b-12d3-a456-426614174000
          required: true
          description: The unique identifier of the batch.
      responses:
        '200':
          description: Batch found and returned successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BatchGetResponse'
              example:
                status: success
                id: string
                completed: true
                completed_count: 1
                progress: 1
                created_at: string
                completed_at: string
                tasks:
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
          description: Batch Not Found
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
                      - Batch not found
                required:
                  - status
                  - error
              example:
                status: failed
                error: Batch not found
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
    BatchGetResponse:
      type: object
      properties:
        status:
          type: string
          const: success
        id:
          type: string
          description: Unique identifier for the batch.
        completed:
          type: boolean
          description: Whether all tasks in the batch have finished.
        completed_count:
          type: number
          description: Number of tasks that have completed so far.
        progress:
          type: number
          description: Completion ratio between 0 and 1.
        created_at:
          type: string
          description: ISO timestamp when the batch was created.
        completed_at:
          description: ISO timestamp when the batch completed.
          type: string
        tasks:
          type: array
          items:
            anyOf:
              - type: object
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
              - type: 'null'
          description: List of tasks in the batch.
      required:
        - status
        - id
        - completed
        - completed_count
        - progress
        - created_at
        - tasks
      additionalProperties: false
      description: Response containing batch details with all tasks.
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