

<DocsHStack>
  <DocsHStackLeft>
    `GET /api/v1/models/download/status/:job_id`

    **Path parameters**

    <DocsParamsTable data="-%20name%3A%20job_id%0A%20%20type%3A%20string%0A%20%20optional%3A%20false%0A%20%20description%3A%20The%20unique%20identifier%20of%20the%20download%20job.%20%60job_id%60%20is%20returned%20by%20the%20%5Bdownload%5D(%2Fdocs%2Fdeveloper%2Frest%2Fdownload)%20endpoint%20when%20a%20download%20is%20initiated." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```bash title="Example Request"
    curl -H "Authorization: Bearer $LM_API_TOKEN" \
      http://localhost:1234/api/v1/models/download/status/job_493c7c9ded
    ```
  </DocsHStackRight>
</DocsHStack>

<DocsHStack>
  <DocsHStackLeft>
    **Response fields**

    Returns a single download job status object. The response varies based on the download status.

    <DocsParamsTable data="-%20name%3A%20job_id%0A%20%20type%3A%20string%0A%20%20description%3A%20Unique%20identifier%20for%20the%20download%20job.%0A-%20name%3A%20status%0A%20%20type%3A%20'%22downloading%22%20%7C%20%22paused%22%20%7C%20%22completed%22%20%7C%20%22failed%22'%0A%20%20description%3A%20Current%20status%20of%20the%20download.%0A-%20name%3A%20bytes_per_second%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Current%20download%20speed%20in%20bytes%20per%20second.%20Present%20when%20%60status%60%20is%20%60downloading%60.%0A-%20name%3A%20estimated_completion%0A%20%20type%3A%20string%0A%20%20optional%3A%20true%0A%20%20description%3A%20Estimated%20completion%20time%20in%20ISO%208601%20format.%20Present%20when%20%60status%60%20is%20%60downloading%60.%0A-%20name%3A%20completed_at%0A%20%20type%3A%20string%0A%20%20optional%3A%20true%0A%20%20description%3A%20Download%20completion%20time%20in%20ISO%208601%20format.%20Present%20when%20%60status%60%20is%20%60completed%60.%0A-%20name%3A%20total_size_bytes%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Total%20size%20of%20the%20download%20in%20bytes.%0A-%20name%3A%20downloaded_bytes%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Number%20of%20bytes%20downloaded%20so%20far.%0A-%20name%3A%20started_at%0A%20%20type%3A%20string%0A%20%20optional%3A%20true%0A%20%20description%3A%20Download%20start%20time%20in%20ISO%208601%20format." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Response"
    {
      "job_id": "job_493c7c9ded",
      "status": "completed",
      "total_size_bytes": 2279145003,
      "downloaded_bytes": 2279145003,
      "started_at": "2025-10-03T15:33:23.496Z",
      "completed_at": "2025-10-03T15:43:12.102Z"
    }
    ```
  </DocsHStackRight>
</DocsHStack>
