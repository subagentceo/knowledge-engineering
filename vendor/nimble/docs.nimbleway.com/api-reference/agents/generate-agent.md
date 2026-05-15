> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Generate Agent



## OpenAPI

````yaml /openapi.json post /v1/agents/generations
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/agents/generations:
    post:
      tags:
        - Agents
      summary: Generate Agent
      requestBody:
        content:
          application/json:
            schema:
              anyOf:
                - $ref: '#/components/schemas/CreateAgentGenerationRequest'
                - $ref: '#/components/schemas/CreateAgentRefinementRequest'
              title: Request
              examples:
                - prompt: I want an agent for books.toscrape.com category pages
                  agent_name: books_toscrape_categories_nkjansdkj
                  url: books.toscrape.com
                  input_schema:
                    type: object
                    properties:
                      category:
                        type: string
                  output_schema:
                    type: object
                    properties:
                      name:
                        type: string
                      price:
                        type: string
                      url:
                        type: string
                      availability:
                        type: string
        required: true
      responses:
        '201':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AgentGenerationResponse'
              example:
                id: 86441962-c8f5-4c24-b271-ee877d2dd865
                status: queued
                agent_name: books_toscrape_categories_nkjansdkj_2026_03_24_zco2isqi
                source_version_id: c51d09fc-c8f2-4b3a-a9bc-eaab88316217
                created_at: '2026-03-24T19:19:39.300002+00:00'
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
    CreateAgentGenerationRequest:
      properties:
        prompt:
          type: string
          title: Prompt
          description: The prompt to use for the agent generation
        agent_name:
          type: string
          title: Agent Name
          description: The name of the agent to generate
        url:
          type: string
          title: Url
          description: The URL to use for the agent generation
          examples:
            - https://www.amazon.com/s?k=laptop
        metadata:
          anyOf:
            - $ref: '#/components/schemas/AgentVersionMetadata'
            - type: 'null'
          title: Metadata
          description: The metadata of the agent version
        input_schema:
          additionalProperties: true
          type: object
          title: Input Schema
          description: The input schema for the agent generation
          examples:
            type: object
            properties:
              category:
                type: string
        output_schema:
          additionalProperties: true
          type: object
          title: Output Schema
          description: The output schema for the agent generation
          examples:
            type: object
            properties:
              name:
                type: string
      type: object
      required:
        - prompt
        - url
      title: CreateAgentGenerationRequest
    CreateAgentRefinementRequest:
      properties:
        prompt:
          type: string
          title: Prompt
          description: The prompt to use for the agent refinement
        from_agent:
          type: string
          title: From Agent
          description: The name of the agent to refine
          examples:
            - amazon_pdp
      type: object
      required:
        - prompt
        - from_agent
      title: CreateAgentRefinementRequest
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
    AgentVersionMetadata:
      properties:
        data_source:
          type: string
          title: Data Source
          description: The data source of the agent
          examples:
            - Amazon
        description:
          anyOf:
            - type: string
              title: Description
              description: The description of the agent
              examples:
                - >-
                  The Amazon Product Detail Page Agent extracts structured data
                  from individual product pages on Amazon. This agent is ideal
                  for tracking competitor pricing, monitoring catalog changes,
                  and powering product intelligence use cases.
            - type: 'null'
          title: Description
          description: The description of the agent
        tags:
          items:
            type: string
          type: array
          title: Tags
          description: The tags of the agent
          examples:
            - - Ecommerce
              - Search
        domain:
          anyOf:
            - type: string
              title: Domain
              description: The domain of the agent
              examples:
                - www.amazon.com
                - www.google.com
            - type: 'null'
          title: Domain
          description: The domain of the agent
        vertical:
          anyOf:
            - type: string
              title: Category
              description: The category of the agent
              examples:
                - Ecommerce
                - Search
            - type: 'null'
        entity_type:
          anyOf:
            - type: string
              title: Entity Type
              description: The entity type of the agent
              examples:
                - Product Detail Page (PDP)
                - Search Engine Results Page (SERP)
            - type: 'null'
      type: object
      required: []
      title: AgentVersionMetadata
      description: The metadata of the agent version
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer

````