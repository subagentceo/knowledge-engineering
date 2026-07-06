

<DocsHStack>
  <DocsHStackLeft>
    `POST /api/v1/models/load`

    **Request body**

    <DocsParamsTable data="-%20name%3A%20model%0A%20%20type%3A%20string%0A%20%20optional%3A%20false%0A%20%20description%3A%20Unique%20identifier%20for%20the%20model%20to%20load.%20Can%20be%20an%20LLM%20or%20embedding%20model.%0A-%20name%3A%20context_length%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Maximum%20number%20of%20tokens%20that%20the%20model%20will%20consider.%0A-%20name%3A%20eval_batch_size%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Number%20of%20input%20tokens%20to%20process%20together%20in%20a%20single%20batch%20during%20evaluation.%20Will%20only%20have%20an%20effect%20on%20LLMs%20loaded%20by%20LM%20Studio's%20%5Bllama.cpp%5D(https%3A%2F%2Fgithub.com%2Fggml-org%2Fllama.cpp)-based%20engine.%0A-%20name%3A%20flash_attention%0A%20%20type%3A%20boolean%0A%20%20optional%3A%20true%0A%20%20description%3A%20Whether%20to%20optimize%20attention%20computation.%20Can%20decrease%20memory%20usage%20and%20improved%20generation%20speed.%20Will%20only%20have%20an%20effect%20on%20LLMs%20loaded%20by%20LM%20Studio's%20%5Bllama.cpp%5D(https%3A%2F%2Fgithub.com%2Fggml-org%2Fllama.cpp)-based%20engine.%0A-%20name%3A%20num_experts%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Number%20of%20expert%20to%20use%20during%20inference%20for%20MoE%20(Mixture%20of%20Experts)%20models.%20Will%20only%20have%20an%20effect%20on%20MoE%20LLMs%20loaded%20by%20LM%20Studio's%20%5Bllama.cpp%5D(https%3A%2F%2Fgithub.com%2Fggml-org%2Fllama.cpp)-based%20engine.%0A-%20name%3A%20offload_kv_cache_to_gpu%0A%20%20type%3A%20boolean%0A%20%20optional%3A%20true%0A%20%20description%3A%20Whether%20KV%20cache%20is%20offloaded%20to%20GPU%20memory.%20If%20false%2C%20KV%20cache%20is%20stored%20in%20CPU%20memory%2FRAM.%20Will%20only%20have%20an%20effect%20on%20LLMs%20loaded%20by%20LM%20Studio's%20%5Bllama.cpp%5D(https%3A%2F%2Fgithub.com%2Fggml-org%2Fllama.cpp)-based%20engine.%0A-%20name%3A%20echo_load_config%0A%20%20type%3A%20boolean%0A%20%20optional%3A%20true%0A%20%20description%3A%20If%20true%2C%20echoes%20the%20final%20load%20configuration%20in%20the%20response%20under%20%60%22load_config%22%60.%20Default%20%60false%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```bash title="Example Request"
    curl http://localhost:1234/api/v1/models/load \
      -H "Authorization: Bearer $LM_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "openai/gpt-oss-20b",
        "context_length": 16384,
        "flash_attention": true,
        "echo_load_config": true
      }'
    ```
  </DocsHStackRight>
</DocsHStack>

***

<DocsHStack>
  <DocsHStackLeft>
    **Response fields**

    <DocsParamsTable data="-%20name%3A%20type%0A%20%20type%3A%20'%22llm%22%20%7C%20%22embedding%22'%0A%20%20description%3A%20Type%20of%20the%20loaded%20model.%0A-%20name%3A%20instance_id%0A%20%20type%3A%20string%0A%20%20description%3A%20Unique%20identifier%20for%20the%20loaded%20model%20instance.%0A-%20name%3A%20load_time_seconds%0A%20%20type%3A%20number%0A%20%20description%3A%20Time%20taken%20to%20load%20the%20model%20in%20seconds.%0A-%20name%3A%20status%0A%20%20type%3A%20'%22loaded%22'%0A%20%20description%3A%20Load%20status.%0A-%20name%3A%20load_config%0A%20%20type%3A%20object%0A%20%20optional%3A%20true%0A%20%20description%3A%20The%20final%20configuration%20applied%20to%20the%20loaded%20model.%20This%20may%20include%20settings%20that%20were%20not%20specified%20in%20the%20request.%20Included%20only%20when%20%60%22echo_load_config%22%60%20is%20%60true%60%20in%20the%20request.%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20LLM%20load%20config%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Configuration%20parameters%20specific%20to%20LLM%20models.%20%60load_config%60%20will%20be%20this%20type%20when%20%60%22type%22%60%20is%20%60%22llm%22%60.%20Only%20parameters%20that%20applied%20to%20the%20load%20will%20be%20present.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20context_length%0A%20%20%20%20%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Maximum%20number%20of%20tokens%20that%20the%20model%20will%20consider.%0A%20%20%20%20%20%20%20%20-%20name%3A%20eval_batch_size%0A%20%20%20%20%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Number%20of%20input%20tokens%20to%20process%20together%20in%20a%20single%20batch%20during%20evaluation.%20Only%20present%20for%20models%20loaded%20with%20LM%20Studio's%20%5Bllama.cpp%5D(https%3A%2F%2Fgithub.com%2Fggml-org%2Fllama.cpp)-based%20engine.%0A%20%20%20%20%20%20%20%20-%20name%3A%20flash_attention%0A%20%20%20%20%20%20%20%20%20%20type%3A%20boolean%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Whether%20Flash%20Attention%20is%20enabled%20for%20optimized%20attention%20computation.%20Only%20present%20for%20models%20loaded%20with%20LM%20Studio's%20%5Bllama.cpp%5D(https%3A%2F%2Fgithub.com%2Fggml-org%2Fllama.cpp)-based%20engine.%0A%20%20%20%20%20%20%20%20-%20name%3A%20num_experts%0A%20%20%20%20%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Number%20of%20experts%20for%20MoE%20(Mixture%20of%20Experts)%20models.%20Only%20present%20for%20MoE%20models%20loaded%20with%20LM%20Studio's%20%5Bllama.cpp%5D(https%3A%2F%2Fgithub.com%2Fggml-org%2Fllama.cpp)-based%20engine.%0A%20%20%20%20%20%20%20%20-%20name%3A%20offload_kv_cache_to_gpu%0A%20%20%20%20%20%20%20%20%20%20type%3A%20boolean%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Whether%20KV%20cache%20is%20offloaded%20to%20GPU%20memory.%20Only%20present%20for%20models%20loaded%20with%20LM%20Studio's%20%5Bllama.cpp%5D(https%3A%2F%2Fgithub.com%2Fggml-org%2Fllama.cpp)-based%20engine.%0A%20%20%20%20-%20name%3A%20Embedding%20model%20load%20config%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Configuration%20parameters%20specific%20to%20embedding%20models.%20%60load_config%60%20will%20be%20this%20type%20when%20%60%22type%22%60%20is%20%60%22embedding%22%60.%20Only%20parameters%20that%20applied%20to%20the%20load%20will%20be%20present.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20context_length%0A%20%20%20%20%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Maximum%20number%20of%20tokens%20that%20the%20model%20will%20consider." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Response"
    {
      "type": "llm",
      "instance_id": "openai/gpt-oss-20b",
      "load_time_seconds": 9.099,
      "status": "loaded",
      "load_config": {
        "context_length": 16384,
        "eval_batch_size": 512,
        "flash_attention": true,
        "offload_kv_cache_to_gpu": true,
        "num_experts": 4
      }
    }
    ```
  </DocsHStackRight>
</DocsHStack>
