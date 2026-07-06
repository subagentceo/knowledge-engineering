

<DocsHStack>
  <DocsHStackLeft>
    `POST /api/v1/models/unload`

    **Request body**

    <DocsParamsTable data="-%20name%3A%20instance_id%0A%20%20type%3A%20string%0A%20%20optional%3A%20false%0A%20%20description%3A%20Unique%20identifier%20of%20the%20model%20instance%20to%20unload." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```bash title="Example Request"
    curl http://localhost:1234/api/v1/models/unload \
      -H "Authorization: Bearer $LM_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "instance_id": "openai/gpt-oss-20b"
      }'
    ```
  </DocsHStackRight>
</DocsHStack>

***

<DocsHStack>
  <DocsHStackLeft>
    **Response fields**

    <DocsParamsTable data="-%20name%3A%20instance_id%0A%20%20type%3A%20string%0A%20%20description%3A%20Unique%20identifier%20for%20the%20unloaded%20model%20instance." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Response"
    {
      "instance_id": "openai/gpt-oss-20b"
    }
    ```
  </DocsHStackRight>
</DocsHStack>
