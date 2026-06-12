> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Driver

> Resolves the suggested driver for a given URL or agent name. Exactly one of `url` or `agent` must be provided.



## OpenAPI

````yaml /api-reference/openapi.json get /v1/domain-knowledge/driver
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/domain-knowledge/driver:
    get:
      tags:
        - Domain Knowledge
      summary: Get Driver
      description: >-
        Resolves the suggested driver for a given URL or agent name. Exactly one
        of `url` or `agent` must be provided.
      parameters:
        - description: Target domain to resolve driver for (e.g. amazon.com).
          in: query
          name: url
          schema:
            description: Target domain to resolve driver for (e.g. amazon.com).
            examples:
              - amazon.com
            type: string
        - description: Agent name to resolve driver for (e.g. nimble-ecommerce).
          in: query
          name: agent
          schema:
            description: Agent name to resolve driver for (e.g. nimble-ecommerce).
            examples:
              - nimble-ecommerce
            type: string
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DriverResolutionResponse'
          description: Driver resolution result
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
          description: Agent Not Found
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    examples:
                      - failed
                  msg:
                    type: string
                    examples:
                      - Agent not found
                required:
                  - status
                  - msg
              example:
                status: failed
                msg: Agent not found
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
    DriverResolutionResponse:
      additionalProperties: false
      properties:
        agent:
          description: The input agent name (present when agent query param was used)
          type: string
        antibots:
          description: List of detected antibots for the domain
          examples:
            - - cloudflare
              - datadome
          items:
            type: string
          type: array
        description:
          description: Description of the driver
          type: string
        driver:
          description: Resolved driver name
          examples:
            - vx10-pro
          type: string
        need_to_render:
          description: Whether the page needs to be rendered to be properly resolved.
          type: boolean
        url:
          description: The input URL (present when url query param was used)
          type: string
      required:
        - driver
        - antibots
        - description
      type: object
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