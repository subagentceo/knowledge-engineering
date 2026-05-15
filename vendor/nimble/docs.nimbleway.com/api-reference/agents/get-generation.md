> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Generation



## OpenAPI

````yaml /openapi.json get /v1/agents/generations/{generation_id}
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/agents/generations/{generation_id}:
    get:
      tags:
        - Agents
      summary: Get Generation
      parameters:
        - name: generation_id
          in: path
          required: true
          schema:
            type: string
            format: uuid
            title: Generation Id
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AgentGenerationResponse'
              example:
                id: 86441962-c8f5-4c24-b271-ee877d2dd865
                status: success
                agent_name: books_toscrape_categories_nkjansdkj_2026_03_24_zco2isqi
                source_version_id: c51d09fc-c8f2-4b3a-a9bc-eaab88316217
                generated_version_id: fee30209-2439-459b-985a-ba7f8d8d2325
                generated_version:
                  id: fee30209-2439-459b-985a-ba7f8d8d2325
                  agent_name: books_toscrape_categories_nkjansdkj_2026_03_24_zco2isqi
                  version_number: 2
                  metadata:
                    vertical: Other
                    data_source: books.toscrape.com
                    display_name: books_toscrape_categories_nkjansdkj
                    tags: []
                    domain: books.toscrape.com
                    is_displayed: false
                  steps: []
                  artifacts: {}
                summary: >-
                  Done! The agent for **books.toscrape.com** category pages is
                  fully configured and preview ran successfully. Here's a
                  summary of what was set up:


                  - **Browsing**: Navigates to category pages using a URL
                  template with `category_slug` and `category_id` as inputs
                  (e.g., `mystery` / `3`)

                  - **Parsing**: Extracts book data — `name`, `price`, `url`,
                  and `availability` — from each listing on the category page
                created_at: '2026-03-24T19:19:39.300002+00:00'
                started_at: '2026-03-24T19:19:39.307295+00:00'
                completed_at: '2026-03-24T19:22:01.638660+00:00'
        '402':
          description: Payment Required
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error402'
        '422':
          description: Unprocessable Entity - Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error400'
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
    AgentGenerationResponse:
      properties:
        id:
          type: string
          format: uuid
          title: Id
          description: The id of the agent generation
        status:
          type: string
          title: Status
          description: The status of the agent generation
        agent_name:
          type: string
          title: Agent Name
          description: The name of the agent
        version_id:
          type: string
          format: uuid
          title: Version Id
          description: The version id of the agent
        summary:
          anyOf:
            - type: string
            - type: 'null'
          title: Summary
          description: The summary of the agent generation
        error:
          anyOf:
            - type: string
              title: Error
              description: The error of the agent generation
            - type: 'null'
          title: Error
          description: The error of the agent generation
      type: object
      required:
        - id
        - status
      title: AgentGenerationResponse
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