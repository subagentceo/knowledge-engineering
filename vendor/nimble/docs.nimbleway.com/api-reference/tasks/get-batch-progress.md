> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get batch progress

> Retrieve lightweight progress information for a batch without fetching all task details.



## OpenAPI

````yaml /openapi.json get /v1/batches/{batch_id}/progress
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/batches/{batch_id}/progress:
    get:
      tags:
        - Tasks
      summary: Get batch progress
      description: >-
        Retrieve lightweight progress information for a batch without fetching
        all task details.
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
          description: Batch progress returned successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BatchProgressResponse'
              example:
                status: success
                id: string
                completed: true
                completed_count: 1
                completed_at: string
                progress: 1
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
    BatchProgressResponse:
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
        completed_at:
          description: ISO timestamp when the batch completed.
          type: string
        progress:
          type: number
          description: Completion ratio between 0 and 1.
      required:
        - status
        - id
        - completed
        - completed_count
        - progress
      additionalProperties: false
      description: Lightweight batch progress without task details.
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