> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent Batch



## OpenAPI

````yaml /api-reference/openapi.json post /v1/agents/batch
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/agents/batch:
    post:
      tags:
        - Agents
      summary: Agent Batch
      requestBody:
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/AgentBatchBody'
              examples:
                - inputs:
                    - params:
                        keyword: iphone 15
                    - params:
                        keyword: iphone 16
                    - params:
                        keyword: iphone 17
                  shared_inputs:
                    agent: amazon_serp
      responses:
        '200':
          description: Agent Batch Created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BatchResponse'
              example:
                batch_id: 4b0a90bf-c951-42e4-95b3-a95a65ba69fc
                batch_size: 1
                tasks:
                  - id: 123e4567-e89b-12d3-a456-426614174000
                    state: pending
                    output_url: string
                    created_at: '2024-01-15T10:30:00Z'
                    modified_at: '2024-01-15T10:35:00Z'
                    account_name: string
                    input: null
                    batch_id: 4b0a90bf-c951-42e4-95b3-a95a65ba69fc
                    status_code: 200
                    api_type: extract
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
    AgentBatchBody:
      type: object
      properties:
        inputs:
          type: array
          items:
            $ref: '#/components/schemas/AgentBatchInputsPayload'
            required: []
        shared_inputs:
          allOf:
            - $ref: '#/components/schemas/AgentAsyncPayload'
              required:
                - Agents
      required:
        - inputs
        - shared_inputs
      description: Request body for executing a batch of agent requests
    BatchResponse:
      type: object
      properties:
        batch_id:
          type: string
          description: Unique identifier for the batch.
        batch_size:
          type: number
          description: Number of tasks in the batch.
        tasks:
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
                    https://sdk.nimbleway.com/v1/tasks/123e4567-e89b-12d3-a456-426614174000
              download_url:
                description: URL for downloading the task results.
                examples:
                  - >-
                    https://sdk.nimbleway.com/v1/tasks/123e4567-e89b-12d3-a456-426614174000/results
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
          description: List of created tasks.
      additionalProperties: false
      description: Response when a batch of extract tasks is created successfully.
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
    AgentBatchInputsPayload:
      type: object
      title: AgentBatchInputsPayload
      properties:
        params:
          type: object
          description: >-
            The agent's input parameters, for example query, prodcut_id, etc.
            Depands on the agent used.
          allOf:
            - $ref: '#/components/schemas/AgentParams'
          examples:
            - params:
                keyword: iphone 17
                zip_code: '90210'
          required: []
        localization:
          description: >-
            Controls if localization sould be enabled (default false). Some
            agent support localization based on zip_code or store_id on the site
            it self. Relevant only when agent is supporting localization
          type: boolean
        formats:
          type: array
          description: >-
            Output formats to include in the response alongside `data.parsing`.
            By default, only structured parsed data is returned.
          items:
            type: string
            enum:
              - html
              - markdown
              - headers
              - links
      required:
        - agent
        - params
      description: Request body model for the /agent/run endpoint
    AgentAsyncPayload:
      type: object
      title: AgentPayload
      properties:
        agent:
          type: string
          description: The agent's name to execute
          examples:
            - google_search
        params:
          type: object
          description: >-
            The agent's input parameters, for example query, prodcut_id, etc.
            Depands on the agent used.
          allOf:
            - $ref: '#/components/schemas/AgentParams'
            - $ref: '#/components/schemas/AsyncOptions'
          examples:
            - params:
                keyword: iphone 17
                zip_code: '90210'
          required: []
        localization:
          description: >-
            Controls if localization sould be enabled (default false). Some
            agent support localization based on zip_code or store_id on the site
            it self. Relevant only when agent is supporting localization
          type: boolean
        formats:
          type: array
          description: >-
            Output formats to include in the response alongside `data.parsing`.
            By default, only structured parsed data is returned.
          items:
            type: string
            enum:
              - html
              - markdown
              - headers
              - links
      required:
        - agent
        - params
      description: Request body model for the /agent/run endpoint
    AgentParams:
      type: object
      minProperties: 1
      description: >-
        Agent input parameters. At least one agent-specific key-value pair is
        required (e.g., `keyword`, `product_id`). Refer to the specific agent's
        documentation.
      additionalProperties: true
      properties:
        country:
          description: Country used to access the target URL, use ISO Alpha-2 Codes
          examples:
            - US
          type: string
        locale:
          type: string
          description: Language preference for the search results. Use LCID standard
          examples:
            - en
        tag:
          description: User-defined tag for request identification
          examples:
            - campaign-2024-q1
          type: string
        parse:
          type: boolean
          description: Whether to parse the response content
          examples:
            - true
    AsyncOptions:
      type: object
      properties:
        storage_type:
          type: string
          description: >-
            Storage type for async results. Use s3 for Amazon S3 and gs for
            Google Cloud Platform.
          enum:
            - s3
            - gs
          examples:
            - s3
        storage_url:
          type: string
          description: >-
            Repository URL where output will be saved. Format:
            s3://Your.Bucket.Name/your/object/name/prefix/ - Output will be
            saved as TASK_ID.json
          examples:
            - s3://Your.Repository.Path/
        callback_url:
          type: string
          format: uri
          description: >-
            A URL to callback once the data is delivered. The API will send a
            POST request with task details (without the requested data) when the
            task completes.
          examples:
            - https://your.callback.url/path
        storage_compress:
          type: boolean
          description: >-
            When set to true, the response saved to storage_url will be
            compressed using GZIP format. If false or not set, response will be
            saved uncompressed.
          examples:
            - false
        storage_object_name:
          type: string
          description: Custom name for the stored object instead of the default task ID
          examples:
            - my task
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer

````