

<DocsHStack>
  <DocsHStackLeft>
    `GET /api/v1/models`

    This endpoint has no request parameters.
  </DocsHStackLeft>

  <DocsHStackRight>
    ```bash title="Example Request"
    curl http://localhost:1234/api/v1/models \
      -H "Authorization: Bearer $LM_API_TOKEN"
    ```
  </DocsHStackRight>
</DocsHStack>

***

<DocsHStack>
  <DocsHStackLeft>
    **Response fields**

    <DocsParamsTable data="-%20name%3A%20models%0A%20%20type%3A%20array%0A%20%20description%3A%20List%20of%20available%20models%20(both%20LLMs%20and%20embedding%20models).%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20type%3A%20'%22llm%22%20%7C%20%22embedding%22'%0A%20%20%20%20%20%20description%3A%20Type%20of%20model.%0A%20%20%20%20-%20name%3A%20publisher%0A%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20description%3A%20Model%20publisher%20name.%0A%20%20%20%20-%20name%3A%20key%0A%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20description%3A%20Unique%20identifier%20for%20the%20model.%0A%20%20%20%20-%20name%3A%20display_name%0A%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20description%3A%20Human-readable%20model%20name.%0A%20%20%20%20-%20name%3A%20architecture%0A%20%20%20%20%20%20type%3A%20string%20%7C%20null%0A%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20description%3A%20Model%20architecture%20(e.g.%2C%20%22llama%22%2C%20%22mistral%22).%20Absent%20for%20embedding%20models.%0A%20%20%20%20-%20name%3A%20quantization%0A%20%20%20%20%20%20type%3A%20object%20%7C%20null%0A%20%20%20%20%20%20description%3A%20Quantization%20information%20for%20the%20model.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20name%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%20%7C%20null%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Quantization%20method%20name.%0A%20%20%20%20%20%20%20%20-%20name%3A%20bits_per_weight%0A%20%20%20%20%20%20%20%20%20%20type%3A%20number%20%7C%20null%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Bits%20per%20weight%20for%20the%20quantization.%0A%20%20%20%20-%20name%3A%20size_bytes%0A%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20description%3A%20Size%20of%20the%20model%20in%20bytes.%0A%20%20%20%20-%20name%3A%20params_string%0A%20%20%20%20%20%20type%3A%20string%20%7C%20null%0A%20%20%20%20%20%20description%3A%20Human-readable%20parameter%20count%20(e.g.%2C%20%227B%22%2C%20%2213B%22).%0A%20%20%20%20-%20name%3A%20loaded_instances%0A%20%20%20%20%20%20type%3A%20array%0A%20%20%20%20%20%20description%3A%20List%20of%20currently%20loaded%20instances%20of%20this%20model.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20id%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Unique%20identifier%20for%20the%20loaded%20model%20instance.%0A%20%20%20%20%20%20%20%20-%20name%3A%20config%0A%20%20%20%20%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Configuration%20for%20the%20loaded%20instance.%0A%20%20%20%20%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20context_length%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20The%20maximum%20context%20length%20for%20the%20model%20in%20number%20of%20tokens.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20eval_batch_size%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Number%20of%20input%20tokens%20to%20process%20together%20in%20a%20single%20batch%20during%20evaluation.%20Absent%20for%20embedding%20models.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20parallel%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Maximum%20number%20of%20parallel%20predictions%20the%20instance%20can%20handle.%20Absent%20for%20embedding%20models.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20flash_attention%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20boolean%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Whether%20Flash%20Attention%20is%20enabled%20for%20optimized%20attention%20computation.%20Absent%20for%20embedding%20models.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20num_experts%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Number%20of%20experts%20for%20MoE%20(Mixture%20of%20Experts)%20models.%20Absent%20for%20embedding%20models.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20offload_kv_cache_to_gpu%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20boolean%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Whether%20KV%20cache%20is%20offloaded%20to%20GPU%20memory.%20Absent%20for%20embedding%20models.%0A%20%20%20%20-%20name%3A%20max_context_length%0A%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20description%3A%20Maximum%20context%20length%20supported%20by%20the%20model%20in%20number%20of%20tokens.%0A%20%20%20%20-%20name%3A%20format%0A%20%20%20%20%20%20type%3A%20'%22gguf%22%20%7C%20%22mlx%22%20%7C%20null'%0A%20%20%20%20%20%20description%3A%20Model%20file%20format.%0A%20%20%20%20-%20name%3A%20capabilities%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20description%3A%20Model%20capabilities.%20Absent%20for%20embedding%20models.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20vision%0A%20%20%20%20%20%20%20%20%20%20type%3A%20boolean%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Whether%20the%20model%20supports%20vision%2Fimage%20inputs.%0A%20%20%20%20%20%20%20%20-%20name%3A%20trained_for_tool_use%0A%20%20%20%20%20%20%20%20%20%20type%3A%20boolean%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Whether%20the%20model%20was%20trained%20for%20tool%2Ffunction%20calling.%0A%20%20%20%20%20%20%20%20-%20name%3A%20reasoning%0A%20%20%20%20%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Public%20reasoning%20configuration%20for%20the%20model.%20Absent%20when%20no%20reasoning%20config%20is%20exposed.%0A%20%20%20%20%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20allowed_options%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'(%22off%22%20%7C%20%22on%22%20%7C%20%22low%22%20%7C%20%22medium%22%20%7C%20%22high%22)%5B%5D'%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Allowed%20public%20reasoning%20settings%20for%20the%20model.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20default%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'%22off%22%20%7C%20%22on%22%20%7C%20%22low%22%20%7C%20%22medium%22%20%7C%20%22high%22'%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Default%20public%20reasoning%20setting%20for%20the%20model.%0A%20%20%20%20-%20name%3A%20description%0A%20%20%20%20%20%20type%3A%20string%20%7C%20null%0A%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20description%3A%20Model%20description.%20Absent%20for%20embedding%20models.%0A%20%20%20%20-%20name%3A%20variants%0A%20%20%20%20%20%20type%3A%20array%0A%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20description%3A%20List%20of%20available%20quantization%20variant%20names%20for%20this%20model.%20Present%20for%20multi-variant%20models.%0A%20%20%20%20-%20name%3A%20selected_variant%0A%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20description%3A%20The%20currently%20selected%20variant%20name.%20Present%20when%20%60variants%60%20is%20present." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Response"
    {
      "models": [
        {
          "type": "llm",
          "publisher": "google",
          "key": "google/gemma-4-26b-a4b",
          "display_name": "Gemma 4 26B A4B",
          "architecture": "gemma4",
          "quantization": {
            "name": "Q4_K_M",
            "bits_per_weight": 4
          },
          "size_bytes": 17990911801,
          "params_string": "26B-A4B",
          "loaded_instances": [
            {
              "id": "google/gemma-4-26b-a4b",
              "config": {
                "context_length": 4096,
                "eval_batch_size": 512,
                "parallel": 4,
                "flash_attention": true,
                "num_experts": 8,
                "offload_kv_cache_to_gpu": true
              }
            }
          ],
          "max_context_length": 262144,
          "format": "gguf",
          "capabilities": {
            "vision": true,
            "trained_for_tool_use": true,
            "reasoning": {
              "allowed_options": [
                "off",
                "on"
              ],
              "default": "on"
            }
          },
          "description": null,
          "variants": [
            "google/gemma-4-26b-a4b@q4_k_m"
          ],
          "selected_variant": "google/gemma-4-26b-a4b@q4_k_m"
        },
          {
            "type": "llm",
            "publisher": "deepseek",
            "key": "deepseek-r1",
            "display_name": "DeepSeek R1",
            "architecture": "deepseek",
            "quantization": {
              "name": "Q4_K_M",
              "bits_per_weight": 4
            },
            "size_bytes": 40492610355,
            "params_string": "671B",
            "loaded_instances": [],
            "max_context_length": 131072,
            "format": "gguf",
            "capabilities": {
              "vision": false,
              "trained_for_tool_use": true,
              "reasoning": {
                "allowed_options": ["on"],
                "default": "on"
              }
            },
            "description": null
          },
          {
            "type": "embedding",
            "publisher": "gaianet",
            "key": "text-embedding-nomic-embed-text-v1.5-embedding",
            "display_name": "Nomic Embed Text v1.5",
            "quantization": {
              "name": "F16",
              "bits_per_weight": 16
            },
            "size_bytes": 274290560,
            "params_string": null,
            "loaded_instances": [],
            "max_context_length": 2048,
            "format": "gguf"
          }
      ]
    }
    ```
  </DocsHStackRight>
</DocsHStack>
