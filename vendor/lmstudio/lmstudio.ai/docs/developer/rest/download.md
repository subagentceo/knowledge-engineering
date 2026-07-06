

<DocsHStack>
  <DocsHStackLeft>
    `POST /api/v1/models/download`

    **Request body**

    <DocsParamsTable data="-%20name%3A%20model%0A%20%20type%3A%20string%0A%20%20optional%3A%20false%0A%20%20description%3A%20The%20model%20to%20download.%20Accepts%20%5Bmodel%20catalog%5D(https%3A%2F%2Flmstudio.ai%2Fmodels)%20identifiers%20(e.g.%2C%20%60openai%2Fgpt-oss-20b%60)%20and%20exact%20Hugging%20Face%20links%20(e.g.%2C%20%60https%3A%2F%2Fhuggingface.co%2Flmstudio-community%2Fgpt-oss-20b-GGUF%60)%0A-%20name%3A%20quantization%0A%20%20type%3A%20string%0A%20%20optional%3A%20true%0A%20%20description%3A%20Quantization%20level%20of%20the%20model%20to%20download%20(e.g.%2C%20%60Q4_K_M%60).%20Only%20supported%20for%20Hugging%20Face%20links." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```bash title="Example Request"
    curl http://localhost:1234/api/v1/models/download \
      -H "Authorization: Bearer $LM_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "ibm/granite-4-micro"
      }'
    ```
  </DocsHStackRight>
</DocsHStack>

<DocsHStack>
  <DocsHStackLeft>
    **Response fields**

    Returns a download job status object. The response varies based on the download status.

    <DocsParamsTable data="-%20name%3A%20job_id%0A%20%20type%3A%20string%0A%20%20optional%3A%20true%0A%20%20description%3A%20Unique%20identifier%20for%20the%20download%20job.%20Absent%20when%20%60status%60%20is%20%60already_downloaded%60.%0A-%20name%3A%20status%0A%20%20type%3A%20'%22downloading%22%20%7C%20%22paused%22%20%7C%20%22completed%22%20%7C%20%22failed%22%20%7C%20%22already_downloaded%22'%0A%20%20description%3A%20Current%20status%20of%20the%20download.%0A-%20name%3A%20completed_at%0A%20%20type%3A%20string%0A%20%20optional%3A%20true%0A%20%20description%3A%20Download%20completion%20time%20in%20ISO%208601%20format.%20Present%20when%20%60status%60%20is%20%60completed%60.%0A-%20name%3A%20total_size_bytes%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Total%20size%20of%20the%20download%20in%20bytes.%20Absent%20when%20%60status%60%20is%20%60already_downloaded%60.%0A-%20name%3A%20started_at%0A%20%20type%3A%20string%0A%20%20optional%3A%20true%0A%20%20description%3A%20Download%20start%20time%20in%20ISO%208601%20format.%20Absent%20when%20%60status%60%20is%20%60already_downloaded%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Response"
    {
      "job_id": "job_493c7c9ded",
      "status": "downloading",
      "total_size_bytes": 2279145003,
      "started_at": "2025-10-03T15:33:23.496Z"
    }
    ```
  </DocsHStackRight>
</DocsHStack>
