> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# List batches

> Retrieve a paginated list of batches for the authenticated account.



## OpenAPI

````yaml /api-reference/openapi.json get /v1/batches
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/batches:
    get:
      tags:
        - Tasks
      summary: List batches
      description: Retrieve a paginated list of batches for the authenticated account.
      responses:
        '200':
          description: List of batches returned successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BatchListResponse'
              example:
                data:
                  - id: 69c41d24-cc43-4ffa-b225-d46a8599ec4e
                    account_name: account_name
                    completed: false
                    created_at: '2026-03-24T14:27:57.642Z'
                    tasks:
                      - afe1af62-a361-4df0-ba30-126842aba6d2
                      - e42562aa-45fc-404b-a088-616fbf1daeb2
                    username: admin
                  - id: 31f260da-237a-4f6f-adbd-528f37d0e3e0
                    account_name: account_name
                    completed: false
                    created_at: '2026-03-24T14:28:17.003Z'
                    tasks:
                      - 58821233-9b4c-43de-b4ba-816a8f053e1f
                      - 7f6c6d61-fbc1-4bc1-abc1-211b28c38927
                    username: admin
                pagination:
                  has_next: false
                  next_cursor: null
                  total: 2
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
    BatchListResponse:
      type: object
      properties:
        data:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                description: Unique identifier for the batch.
              account_name:
                type: string
                description: Name of the account that owns the batch.
              completed:
                type: boolean
                description: Whether all tasks in the batch have finished.
              created_at:
                type: string
                description: ISO timestamp when the batch was created.
              tasks:
                type: array
                items:
                  type: string
                  description: Unique identifier for the task.
            required:
              - id
              - account_name
              - completed
              - created_at
              - tasks
          description: List of batches.
        pagination:
          type: object
          properties:
            has_next:
              type: boolean
              description: Whether there are more batches available.
            next_cursor:
              type: string
              description: Cursor to use for fetching the next page.
            total:
              type: number
              description: Total number of batches.
          required:
            - has_next
            - next_cursor
            - total
      required:
        - data
        - pagination
      additionalProperties: false
      description: List of batches.
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