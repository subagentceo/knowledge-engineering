> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Task API Best Practices

> Best practices for writing Task Specs and caching outputs when using Parallel's agent products

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

## Task Spec Best Practices

Define what entity you're researching (input) and what specific data points you need back (output). Keep both as flat-structured as possible.

<Note>
  **The `description` field is your primary tool for controlling output quality.** Field-level descriptions are the best way to include specific instructions for each output field. Think of the `description` as your "prompt" for that field—it's where you specify format requirements, data sources, fallback behavior, and any other instructions.
</Note>

<Steps>
  <Step title="Identify what schema your use case requires">
    * If executing a Deep Research style Task, use the Task Spec with `auto` schema
    * If control and specificity with regards to outputs are required, use Task Spec with a JSONSchema for inputs and outputs
    * In other cases, the Task Spec may not be necessary; the system in this case will output a plain text response
  </Step>

  <Step title="Define effective inputs">
    * When using only text based inputs, be as specific as possible about what you are expecting the system to return. Include any instructions and preferences in the input text.
    * When using JSON Schema inputs, use the minimum fields required to uniquely identify the entity you want to enrich. For example, include both the company\_name and company\_website, or both the person\_name and social\_url, to help the system disambiguate.
    * Avoid deeply nested structures and keep the input schema flat
  </Step>

  <Step title="Define effective outputs (relevant when using JSONSchema outputs)">
    **Use field-level `description` for all instructions.** The `description` field is the most effective way to control how each output field is populated. Include:

    * **Entity**: What are you researching?
    * **Action**: What do you want to find?
    * **Specifics**: Constraints, time periods, formatting requirements
    * **Error Handling**: What to return if data is unavailable (e.g., "If unavailable, return null")

    <Tip>
      **Example of a well-written description:**

      ```json theme={"system"}
      "employee_count": {
        "type": "string",
        "description": "The current number of employees at the company. Use the most recent data available from LinkedIn, company website, or press releases. Format as a range (e.g., '501-1000') if exact count unavailable. If no data found, return 'Unknown'."
      }
      ```
    </Tip>

    * Use clear, descriptive field names
      * Use `ceo_name` instead of `name`
      * Use `headquarters_address`\*\* instead of `address`
      * Use `annual_revenue_2024`\*\* instead of `revenue`
    * Specify Data Formats
      * Always specify format for dates: `YYYY-MM-DD`
      * Use ranges for numerical values with units: `revenue_in_millions`, `employee_count`
      * Specify quantities for lists: `top_5_products`, `recent_3_acquisitions`
    * **Unnecessary Fields**: Don't include fields like `reasoning` or `confidence_score` as these are already included in the basis
  </Step>

  <Step title="Additional instructions">
    If there are additional requirements or instructions separate from individual fields, the top-level `description` field is available. For example:

    ```json theme={"system"}
    {
      "type": "object",
      "description": "Extract all information only from well-known government sites.",
      "properties": {
        "latest_funding_amount": {
          "type": "string",
          "description": "Funding amount in millions USD format (e.g., '50M'). If unavailable, return null."
        },
        "funding_round_type": {
          "type": "string",
          "description": "Type of funding round (Series A, Series B, etc.). If unknown, return 'Type unknown'."
        },
        "funding_date": {
          "type": "string",
          "description": "Date of funding round in YYYY-MM-DD format. If partial date available, use YYYY-MM or YYYY."
        },
        "current_employee_count": {
          "type": "string",
          "description": "Current number of employees as approximate number or range. Allow estimates when precise counts unavailable."
        }
      }
    }
    ```
  </Step>
</Steps>

## Caching Best Practices for Agent Products

When using Parallel's agent products (such as the Task API, [FindAll](/findall-api/findall-quickstart), or [Monitor](/monitor-api/monitor-quickstart)), inputs provide context to the model's response. Because outputs may reflect the inputs provided, developers should use caution when deciding whether to cache and reuse outputs across different end users or contexts, as that could potentially cause inputs or context from inputs to be shared across end users.

* If your inputs could include private customer data, internal documents, or any proprietary context, we do not recommend caching outputs and reusing them across customers. Because output is contextually tied to that input, private inputs could then be shared across end users.

### Matrix: How to think about caching

| API                                                                                              | Description                                                                                        | Can inputs passed in prompts be outputs? | Caching Suitability when sensitive input provided |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------- |
| Search, Extract, Entity Search                                                                   | Fetches raw, public web content - no user context present in output                                | No                                       | Yes                                               |
| Task API, [FindAll](/findall-api/findall-quickstart), [Monitor](/monitor-api/monitor-quickstart) | Takes prompts/inputs that you provide, and those inputs can shape the output and be present in it. | Yes                                      | No                                                |
