# WSL2 Model Selection — RTX 2080 Ti (11GB VRAM)

> Outcome: 2026-06-05-O8
> Audience: solo founders / developer-operators running local inference on consumer hardware

---

## GPU Specification

| Attribute | Value |
| :--- | :--- |
| GPU | NVIDIA GeForce RTX 2080 Ti |
| VRAM | 11 GB GDDR6 |
| CUDA Cores | 4352 |
| Memory Bandwidth | 616 GB/s |
| Compute Capability | 7.5 (Turing) |
| TDP | 250W |

The RTX 2080 Ti is a 2018-era flagship. In 2026 it remains viable for local inference at 7–13B scale. Expect 15–25 tok/s at Q4_K_M for 7B models, 8–14 tok/s for 13B models.

---

## VRAM Budget Math

Rule of thumb: **1B parameters ≈ 0.56 GB at Q4_K_M** (absorbs KV cache + overhead at 4K ctx).

| Parameter Count | Quant | VRAM (model weights) | KV-cache 4K ctx | Total | Fits 11 GB? |
| ---: | :--- | ---: | ---: | ---: | :---: |
| 3.8B | Q4_K_M | ~2.3 GB | ~0.3 GB | ~2.6 GB | yes |
| 7B | Q4_K_M | ~4.1 GB | ~0.5 GB | ~4.6 GB | yes |
| 7B | Q8_0 | ~7.7 GB | ~0.5 GB | ~8.2 GB | yes |
| 9B | Q4_K_M | ~5.2 GB | ~0.6 GB | ~5.8 GB | yes |
| 13B | Q4_K_M | ~7.4 GB | ~0.8 GB | ~8.2 GB | yes |
| 13B | Q8_0 | ~13.6 GB | ~0.8 GB | ~14.4 GB | **no** |
| 14B | Q4_K_M | ~8.3 GB | ~0.9 GB | ~9.2 GB | yes (tight) |
| 14B | Q8_0 | ~15.2 GB | ~0.9 GB | ~16.1 GB | **no** |
| 32B | Q4_K_M | ~19 GB | ~1.5 GB | ~20.5 GB | **no** |
| 70B | Q4_K_M | ~40 GB | ~3 GB | ~43 GB | **no** |

**Practical ceiling for 11 GB:** 14B @ Q4_K_M with 4K context. For larger context (8K+) stay at 13B @ Q4_K_M.

---

## Model Selection Table

Models are ordered by recommended priority for the 11 GB tier.

| Model | Params | Quant | VRAM Est. | Use Case | Context | Ollama Pull |
| :--- | ---: | :--- | ---: | :--- | ---: | :--- |
| **qwen2.5-coder:14b-instruct-q4_K_M** | 14B | Q4_K_M | ~9.2 GB | coding (top pick) | 32K | `ollama pull qwen2.5-coder:14b` |
| **qwen2.5-coder:7b-instruct-q8_0** | 7B | Q8_0 | ~8.2 GB | coding, high-quality | 32K | `ollama pull qwen2.5-coder:7b-instruct-q8_0` |
| **qwen2.5-coder:7b-instruct-q4_K_M** | 7B | Q4_K_M | ~4.6 GB | coding, fast | 32K | `ollama pull qwen2.5-coder:7b` |
| **llama3.1:8b-instruct-q8_0** | 8B | Q8_0 | ~8.7 GB | general chat, instruction | 128K | `ollama pull llama3.1:8b-instruct-q8_0` |
| **llama3.1:8b-instruct-q4_K_M** | 8B | Q4_K_M | ~4.9 GB | general chat | 128K | `ollama pull llama3.1:8b` |
| **llama3.2:3b-instruct-q8_0** | 3B | Q8_0 | ~3.5 GB | fast inference, agents | 128K | `ollama pull llama3.2:3b-instruct-q8_0` |
| **mistral:7b-instruct-v0.3-q4_K_M** | 7B | Q4_K_M | ~4.4 GB | general, function-calling | 32K | `ollama pull mistral:7b-instruct-v0.3-q4_K_M` |
| **mistral:7b-instruct-v0.3-q8_0** | 7B | Q8_0 | ~7.7 GB | general, high-quality | 32K | `ollama pull mistral:7b-instruct-v0.3-q8_0` |
| **phi4-mini:3.8b-instruct-q4_K_M** | 3.8B | Q4_K_M | ~2.6 GB | lightweight reasoning | 128K | `ollama pull phi4-mini` |
| **phi4-mini:3.8b-instruct-q8_0** | 3.8B | Q8_0 | ~4.1 GB | reasoning, fast | 128K | `ollama pull phi4-mini:q8_0` |
| **qwen2.5:7b-instruct-q4_K_M** | 7B | Q4_K_M | ~4.6 GB | general + structured output | 32K | `ollama pull qwen2.5:7b` |
| **qwen2.5:7b-instruct-q8_0** | 7B | Q8_0 | ~8.2 GB | structured output, high-quality | 32K | `ollama pull qwen2.5:7b-instruct-q8_0` |
| **qwen2.5:14b-instruct-q4_K_M** | 14B | Q4_K_M | ~9.2 GB | general, best quality at limit | 32K | `ollama pull qwen2.5:14b` |
| **deepseek-coder-v2:16b-lite-q4_K_M** | 16B MoE | Q4_K_M | ~10.4 GB | coding (MoE, tight fit) | 163K | `ollama pull deepseek-coder-v2:16b-lite-q4_K_M` |
| **codellama:13b-instruct-q4_K_M** | 13B | Q4_K_M | ~8.2 GB | legacy code, fill-in-middle | 16K | `ollama pull codellama:13b-instruct-q4_K_M` |

> DeepSeek-Coder-V2 16B-Lite is a MoE model; only active expert weights are loaded, making ~10.4 GB feasible but very tight. Monitor VRAM usage before adopting in production.

---

## Model Rankings by Use Case

### Best for Coding

| Rank | Model | HumanEval | Notes |
| ---: | :--- | :--- | :--- |
| 1 | qwen2.5-coder:14b Q4_K_M | ~85% | Top local coding model for 11GB tier |
| 2 | qwen2.5-coder:7b Q8_0 | ~80% | High-fidelity weights, same arch |
| 3 | deepseek-coder-v2:16b-lite Q4_K_M | ~82% | MoE — fast but tight on VRAM |
| 4 | qwen2.5-coder:7b Q4_K_M | ~78% | Fast, low VRAM headroom for ctx |
| 5 | codellama:13b Q4_K_M | ~62% | Older baseline, fill-in-middle support |

### Best for General Chat / Instruction Following

| Rank | Model | MMLU | Notes |
| ---: | :--- | :--- | :--- |
| 1 | qwen2.5:14b Q4_K_M | ~79% | Best general model within budget |
| 2 | llama3.1:8b Q8_0 | ~73% | 128K context, strong RLHF |
| 3 | llama3.1:8b Q4_K_M | ~71% | Good balance, fast |
| 4 | qwen2.5:7b Q4_K_M | ~74% | Better MMLU than mistral 7B |
| 5 | mistral:7b Q8_0 | ~64% | Efficient, good function-calling |

### Best for Structured Output / JSON / Tool Calling

| Rank | Model | Notes |
| ---: | :--- | :--- |
| 1 | qwen2.5:7b Q8_0 | Excellent JSON adherence, structured output training |
| 2 | mistral:7b-instruct-v0.3 Q4_K_M | Native function-calling schema support |
| 3 | llama3.1:8b Q4_K_M | Tool-calling trained, 128K ctx |
| 4 | phi4-mini Q8_0 | Small but high accuracy for structured tasks |

### Best for Speed (high tok/s, minimal VRAM)

| Rank | Model | Est. tok/s | VRAM |
| ---: | :--- | ---: | ---: |
| 1 | phi4-mini:3.8b Q4_K_M | ~45 tok/s | 2.6 GB |
| 2 | llama3.2:3b Q8_0 | ~50 tok/s | 3.5 GB |
| 3 | qwen2.5-coder:7b Q4_K_M | ~25 tok/s | 4.6 GB |
| 4 | mistral:7b Q4_K_M | ~22 tok/s | 4.4 GB |

---

## Quantization Guide

| Format | Bits/weight | Quality vs FP16 | Best for |
| :--- | ---: | :--- | :--- |
| Q4_K_M | 4-bit (K-quant, medium) | <1% degradation | Fitting larger models; default choice |
| Q5_K_M | 5-bit (K-quant, medium) | <0.5% degradation | Extra headroom, still fits 7B in 11GB |
| Q6_K | 6-bit (K-quant) | ~0.1% degradation | Near-lossless for 7B on 11GB |
| Q8_0 | 8-bit | ~0.05% degradation | Maximum quality; use for 7B on 11GB |
| F16 | 16-bit | baseline | Rarely fits 11GB for 7B+ |

**Recommended default**: Q4_K_M (fits more, negligible quality loss). Upgrade to Q8_0 for the primary coding model if it fits (7B Q8_0 = ~8.2 GB, viable on 11 GB).

---

## Recommended Stack

```
WSL2 Ubuntu 22.04 / 24.04
  └── ollama (daemon, GPU-aware, GGUF runtime)
        ├── qwen2.5-coder:14b (primary coding)
        ├── llama3.1:8b (general chat)
        └── qwen2.5:7b (structured output / agents)
  └── LiteLLM proxy (OpenAI-compatible API on :4000)
        └── exposed to host at localhost:4000
```

LiteLLM provides an OpenAI-compatible `/chat/completions` endpoint over any ollama model, enabling drop-in use with tools expecting the OpenAI SDK.

---

## WSL2 Setup Commands

### 1. Windows host — configure `.wslconfig`

Create or edit `C:\Users\<YourUsername>\.wslconfig`:

```ini
[wsl2]
memory=24GB
swap=8GB
processors=8
localhostForwarding=true
networkingMode=mirrored
autoMemoryReclaim=dropcache
sparseVhd=true
```

### 2. WSL2 Ubuntu — install CUDA toolkit (host driver handles GPU)

```bash
# Do NOT install the NVIDIA Linux driver inside WSL2.
# The Windows host driver provides GPU passthrough automatically.

sudo apt update && sudo apt install -y zstd curl

# Verify GPU is visible
nvidia-smi
```

### 3. Install ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh

# Enable and start the service
sudo systemctl enable ollama
sudo systemctl start ollama

# Verify GPU is detected
journalctl -u ollama --no-pager | grep -i gpu
```

### 4. Pull recommended models

```bash
# Coding — primary (tight on 11GB, watch VRAM)
ollama pull qwen2.5-coder:14b

# Coding — safe fit with high quality
ollama pull qwen2.5-coder:7b-instruct-q8_0

# General chat — 128K context window
ollama pull llama3.1:8b

# Structured output / agents
ollama pull qwen2.5:7b

# Lightweight fast model
ollama pull phi4-mini
```

### 5. Test inference

```bash
# Quick sanity check
ollama run qwen2.5-coder:7b "Write a Python function to parse JSON safely"

# Watch VRAM usage during inference
watch -n 1 nvidia-smi
```

### 6. Install LiteLLM proxy

```bash
pip install litellm[proxy]
```

Create `litellm_config.yaml`:

```yaml
model_list:
  - model_name: qwen2.5-coder-14b
    litellm_params:
      model: ollama/qwen2.5-coder:14b
      api_base: http://localhost:11434
  - model_name: llama3.1-8b
    litellm_params:
      model: ollama/llama3.1:8b
      api_base: http://localhost:11434
  - model_name: qwen2.5-7b
    litellm_params:
      model: ollama/qwen2.5:7b
      api_base: http://localhost:11434

general_settings:
  master_key: local-dev-key
```

Start proxy:

```bash
litellm --config litellm_config.yaml --port 4000
```

Consume via OpenAI SDK:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:4000",
    api_key="local-dev-key",
)

response = client.chat.completions.create(
    model="qwen2.5-coder-14b",
    messages=[{"role": "user", "content": "Explain Rust's borrow checker"}],
)
print(response.choices[0].message.content)
```

### 7. (Optional) Open WebUI for browser chat

```bash
docker run -d \
  --name open-webui \
  --network=host \
  -v open-webui:/app/backend/data \
  ghcr.io/open-webui/open-webui:main
# Open http://localhost:8080 — point to ollama at http://localhost:11434
```

---

## Docker + NVIDIA Container Toolkit (alternative to bare ollama)

If you prefer Docker-based isolation:

```bash
# Register NVIDIA runtime with Docker inside WSL2
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# Run ollama in container (GPU passthrough)
docker run -d \
  --gpus all \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama \
  ollama/ollama

# Pull a model
docker exec -it ollama ollama pull qwen2.5-coder:14b
```

---

## Performance Tuning

### Context length vs VRAM tradeoff

KV cache grows linearly with context. At 11 GB on a 14B Q4_K_M model (~9.2 GB weights), only ~1.5 GB remains for KV cache — limiting context to ~4K tokens safely.

For larger contexts (16K+) use the 7B Q4_K_M variant which leaves ~6 GB for KV cache.

Set context length explicitly when pulling:

```bash
OLLAMA_NUM_CTX=4096 ollama run qwen2.5-coder:14b
```

Or in `~/.ollama/config.json`:

```json
{
  "num_ctx": 8192
}
```

### Flash Attention

Ollama enables Flash Attention automatically for Turing-class GPUs (compute capability 7.5). Verify:

```bash
journalctl -u ollama --no-pager | grep -i flash
```

### Parallel requests

Default ollama serves one request at a time. For agent workloads needing concurrency:

```bash
# Allow up to 2 concurrent requests (VRAM permitting)
OLLAMA_NUM_PARALLEL=2 ollama serve
```

---

## Model Shortlist — Minimum Starter Set

If disk space is limited, start with exactly three models covering all use cases:

| Priority | Model | VRAM | Primary purpose |
| ---: | :--- | ---: | :--- |
| 1 | `qwen2.5-coder:7b-instruct-q8_0` | 8.2 GB | Code generation, completions |
| 2 | `llama3.1:8b-instruct-q4_K_M` | 4.9 GB | Chat, instruction, 128K ctx |
| 3 | `phi4-mini:3.8b-instruct-q4_K_M` | 2.6 GB | Fast agents, structured tasks |

Upgrade path: once comfortable, add `qwen2.5-coder:14b` for coding and `qwen2.5:14b` for general use.

---

## Not Recommended for 11GB

| Model | Why excluded |
| :--- | :--- |
| Llama 3.3 70B Q4_K_M | ~40 GB VRAM — requires 48GB+ system |
| Qwen2.5 72B Q4_K_M | ~43 GB VRAM — 2× RTX 4090 minimum |
| Qwen2.5-Coder 32B Q4_K_M | ~19 GB VRAM — requires 24GB card |
| Mistral 24B Q4_K_M | ~14 GB VRAM — exceeds budget |
| Llama 3.1 13B Q8_0 | ~14.4 GB VRAM — over by 3 GB |
| DeepSeek-V3 (full) | 685B — multi-node only |

---

## Sources

- [Ollama VRAM Requirements: Complete 2026 Guide](https://localllm.in/blog/ollama-vram-requirements-for-local-llms)
- [AI Models for RTX 2080 Ti 11GB — What Runs](https://willitrunai.com/gpus/rtx-2080-ti-11gb)
- [Home GPU LLM Leaderboard by VRAM Tier](https://awesomeagents.ai/leaderboards/home-gpu-llm-leaderboard/)
- [Running LLMs on Older GPUs](https://llmhardware.io/guides/running-llm-on-old-gpu)
- [Best Ollama Models 2026: Ranked for Coding, RAG & Agents](https://www.morphllm.com/best-ollama-models)
- [WSL2 + Ollama on Windows: Complete Setup Guide](https://insiderllm.com/guides/wsl2-ollama-windows-setup-guide/)
- [Running DeepSeek, Llama 3, and Qwen Locally: Complete GPU Requirements Guide](https://dev.to/maxvyaznikov/running-deepseek-llama-3-and-qwen-locally-complete-gpu-requirements-guide-6fd)
- [Best Local Coding LLM 2026: Qwen2.5-Coder vs DeepSeek-Coder-V2](https://dev.to/jovan_chan_9500711396d4e6/best-local-coding-llm-in-2026-qwen25-coder-vs-deepseek-coder-v2-vs-codestral-45g8)
- [Ollama Setup Guide 2026](https://www.sitepoint.com/ollama-setup-guide-2026/)
- [LiteLLM with Ollama — AutoGen docs](https://microsoft.github.io/autogen/0.2/docs/topics/non-openai-models/local-litellm-ollama/)
- [AI Model VRAM Requirements 2026](https://willitrunai.com/blog/vram-requirements-for-ai-models)
- [Qwen 2.5 7B: Run on 8GB VRAM (Benchmarks + Ollama Pull)](https://localaimaster.com/models/qwen-2-5-7b)
