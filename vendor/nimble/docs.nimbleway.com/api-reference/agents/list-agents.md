> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# List Agents



## OpenAPI

````yaml /openapi.json get /v1/agents
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/agents:
    get:
      tags:
        - Agents
      summary: List Agents
      parameters:
        - name: privacy
          in: query
          required: false
          schema:
            description: Filter by privacy level
            default: all
            type: string
            enum:
              - public
              - private
              - all
          description: Filter by privacy level
        - name: managed_by
          in: query
          required: false
          schema:
            description: Filter by who manage the agent
            type: string
            enum:
              - nimble
              - community
              - self_managed
          description: Filter by who manage the agent
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            maximum: 250
            minimum: 1
            description: Number of results per page
            default: 100
            title: Limit
          description: Number of results per page
        - name: offset
          in: query
          required: false
          schema:
            type: integer
            minimum: 0
            description: Pagination offset
            default: 0
            title: Offset
          description: Pagination offset
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                allOf:
                  - type: array
                    items:
                      properties:
                        name:
                          type: string
                          title: Name
                        is_public:
                          type: boolean
                          title: Is Public
                        managed_by:
                          type: string
                          title: Managed By
                        display_name:
                          type: string
                          title: Display Name
                        description:
                          anyOf:
                            - type: string
                            - type: 'null'
                          title: Description
                        vertical:
                          anyOf:
                            - type: string
                            - type: 'null'
                          title: Vertical
                        entity_type:
                          anyOf:
                            - type: string
                            - type: 'null'
                          title: Entity Type
                        domain:
                          anyOf:
                            - type: string
                            - type: 'null'
                          title: Domain
                      type: object
                      required:
                        - name
                        - is_public
                        - display_name
                      title: Agents
                    title: Response List Agents
                examples:
                  - - name: aldi_clp
                      is_public: true
                      display_name: Aldi Category Landing Page
                      description: >-
                        The Aldi Browse Products agent extracts structured
                        product listings from Aldi’s category pages. This agent
                        is ideal for monitoring category-level assortment,
                        analyzing competitive inventory, and powering product
                        discovery and pricing intelligence use cases
                      vertical: Ecommerce
                      entity_type: Category Landing Page (CLP)
                      domain: www.aldi.us
                      managed_by: nimble
                    - name: aldi_pdp
                      is_public: true
                      display_name: Aldi Product Details Page
                      description: >
                        The Aldi Product Detail Page Agent extracts structured
                        data from individual product pages on Aldi. This agent
                        is ideal for tracking competitor pricing, monitoring
                        catalog changes, and powering product intelligence use
                        cases.
                      vertical: Ecommerce
                      entity_type: Product Detail Page (PDP)
                      domain: https://www.aldi.us/
                      managed_by: nimble
                    - name: amazon_plp
                      is_public: true
                      display_name: Amazon CLP
                      description: >-
                        The Amazon Browse Products agent extracts structured
                        product listings from Amazon’s category pages. This
                        agent is ideal for monitoring category-level assortment,
                        analyzing competitive inventory, and powering product
                        discovery and pricing intelligence use cases
                      vertical: Ecommerce
                      entity_type: Category Landing Page (CLP)
                      domain: www.amazon.com
                      managed_by: nimble
                    - name: amazon_pdp
                      is_public: true
                      display_name: Amazon Product Details Page
                      description: >-
                        The Amazon Product Detail Page Agent extracts structured
                        data from individual product pages on Amazon. This agent
                        is ideal for tracking competitor pricing, monitoring
                        catalog changes, and powering product intelligence use
                        cases.
                      vertical: Ecommerce
                      entity_type: Product Detail Page (PDP)
                      domain: www.amazon.com
                      managed_by: nimble
      security:
        - BearerAuth: []
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer

````