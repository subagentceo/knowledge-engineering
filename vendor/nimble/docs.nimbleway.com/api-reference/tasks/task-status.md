> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Task Status

> Retrieve the status and results of an async task by ID. Works for all async task types (extract, search, map, agent, crawl).



## OpenAPI

````yaml /api-reference/openapi.json get /v1/tasks/{task_id}
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/tasks/{task_id}:
    get:
      tags:
        - Tasks
      summary: Task Status
      description: >-
        Retrieve the status and results of an async task by ID. Works for all
        async task types (extract, search, map, agent, crawl).
      parameters:
        - in: path
          name: task_id
          schema:
            type: string
            format: uuid
            description: The unique identifier of the async task
            examples:
              - 8e8cfde8-345b-42b8-b3e2-0c61eb11e00f
          required: true
          description: The unique identifier of the async task
      responses:
        '200':
          description: Task Details with Results
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    examples:
                      - success
                  task:
                    type: object
                    properties:
                      id:
                        type: string
                        format: uuid
                        description: Unique task identifier
                      state:
                        type: string
                        description: Current state of the task
                        enum:
                          - pending
                          - processing
                          - completed
                          - failed
                      created_at:
                        type: string
                        format: date-time
                        description: Task creation timestamp
                      modified_at:
                        type: string
                        format: date-time
                        description: Task last modification timestamp
                      input:
                        type: object
                        description: Original request input parameters
                      result:
                        type: object
                        description: >-
                          Task results (structure varies by method used). Only
                          present when state is 'completed'.
                description: >-
                  Task details including metadata and results. The 'result'
                  field structure varies based on method used (extract, search,
                  map, agent, or crawl).
              example:
                status: success
                task:
                  id: 8e8cfde8-345b-42b8-b3e2-0c61eb11e00f
                  state: completed
                  created_at: '2026-01-24T12:36:24.685Z'
                  modified_at: '2026-01-24T12:37:30.123Z'
                  input:
                    url: https://example.com
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