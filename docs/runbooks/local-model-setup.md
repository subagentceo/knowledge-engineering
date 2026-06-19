# Local Model Setup Runbook
<!-- @cite cowork/config/local-model-policy.yaml -->
<!-- @cite cowork/scripts/ollama-healthcheck.py -->
<!-- @cite https://www.kdnuggets.com/pairing-claude-code-with-local-models -->

Route nightly cowork scripts to a local Ollama instance on your Windows 11 WSL machine
over Tailscale, eliminating Anthropic token usage for routine maintenance tasks.

**Hardware target:** RTX 2080 (11GB VRAM), 128GB RAM, 24-thread CPU, WSL Ubuntu 26.04

---

## 1. Prerequisites

On the Windows machine:
- Tailscale installed and connected to your `subagentceo.org.github` network
- WSL2 with Ubuntu 26.04 (already present per your setup)
- NVIDIA GPU drivers 525+ (required for CUDA in WSL2)
- Ollama 0.14.0+ (for Anthropic Messages API support)

---

## 2. WSL CUDA Setup

```bash
# In WSL terminal — verify GPU is visible
nvidia-smi
# Should show RTX 2080, CUDA Version 12.x

# If nvidia-smi fails, install CUDA toolkit for WSL:
wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-wsl-ubuntu.pin
sudo mv cuda-wsl-ubuntu.pin /etc/apt/preferences.d/cuda-repository-pin-600
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/3bf863cc.pub
sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/ /"
sudo apt update && sudo apt install -y cuda-toolkit-12-4
```

---

## 3. Install Ollama on WSL

```bash
# Install (one command)
curl -fsSL https://ollama.com/install.sh | sh

# Verify version (must be 0.14.0+ for Anthropic Messages API)
ollama version

# Pull the recommended model for your VRAM
# glm-4.7-flash:latest — 8GB VRAM, 128K context, strong tool-calling, Apache 2.0
ollama pull glm-4.7-flash:latest

# Verify it's downloaded
ollama list
```

**Model selection for RTX 2080 (11GB VRAM):**

| Model | VRAM | Context | Best for |
|-------|------|---------|----------|
| `glm-4.7-flash:latest` | 8GB | 128K | ✅ Recommended — tool calling, fast, fits easily |
| `devstral-small-2:24b` | 16GB | 32K | ❌ Too large for 11GB |
| `qwen3-coder` | 20GB | 128K | ❌ Too large for 11GB |
| `qwen2.5-coder:7b` | 6GB | 32K | ✅ Alternative if GLM unavailable |

---

## 4. Configure Ollama for Network Access

By default Ollama only listens on localhost. For Tailscale access, bind to all interfaces:

```bash
# Option A: Environment variable (add to ~/.bashrc or ~/.profile)
echo 'export OLLAMA_HOST=0.0.0.0' >> ~/.bashrc
source ~/.bashrc

# Option B: systemd override (persistent across reboots)
sudo mkdir -p /etc/systemd/system/ollama.service.d
sudo tee /etc/systemd/system/ollama.service.d/override.conf << 'EOF'
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
EOF
sudo systemctl daemon-reload
sudo systemctl restart ollama

# Verify Ollama is listening on all interfaces
curl http://localhost:11434
# Expected: "Ollama is running"
```

> **Security note:** `0.0.0.0` makes Ollama reachable on all network interfaces.
> Tailscale provides network-level isolation — only devices on your Tailscale
> network can reach the WSL machine's Tailscale IP.

---

## 5. Get Your Tailscale IP

```powershell
# In Windows PowerShell or WSL:
tailscale ip -4
# Example output: 100.64.1.42
```

Note this IP — you'll set it as `OLLAMA_TAILSCALE_IP` on macOS.

---

## 6. macOS Configuration

### Shell profile (permanent)

Add to `~/.zshrc` or `~/.bash_profile` on macOS:

```bash
export OLLAMA_TAILSCALE_IP="100.64.1.42"   # ← replace with your actual IP
export OLLAMA_MODEL="glm-4.7-flash:latest"
```

### Per-session toggle

```bash
# Switch to local Ollama:
source scripts/use-local.sh

# Switch back to Anthropic:
source scripts/use-anthropic.sh
```

### Permanent Claude Code config (`~/.claude/settings.json`)

> ⚠️ Only use this if you want ALL Claude Code sessions to use local Ollama.
> The toggle scripts above are recommended for mixed usage.

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://100.64.1.42:11434",
    "ANTHROPIC_API_KEY": "ollama",
    "ANTHROPIC_AUTH_TOKEN": "ollama",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.7-flash:latest",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.7-flash:latest",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.7-flash:latest",
    "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1"
  }
}
```

**Why `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1`:** Claude Code adds Anthropic-specific
`anthropic-beta` headers (for prompt caching, extended thinking, etc.) that local servers
don't recognize. This flag strips those headers before the request is sent. Without it,
you get `Error: Unexpected value(s) for the anthropic-beta header` on every request.

---

## 7. Verification

```bash
# On macOS — test Ollama is reachable over Tailscale
curl http://100.64.1.42:11434
# Expected: "Ollama is running"

# Test the Anthropic Messages API endpoint
curl -s http://100.64.1.42:11434/v1/models | python3 -m json.tool | head -20

# Run the healthcheck script
export OLLAMA_TAILSCALE_IP="100.64.1.42"
python3 cowork/scripts/ollama-healthcheck.py --verbose

# Full end-to-end: run the nightly review against local model
source scripts/use-local.sh
python3 cowork/scripts/nightly-review.py
```

---

## 8. Nightly Script Integration

The 3 scheduled tasks now call `ollama-healthcheck.py` as preflight:

```
00:00 PST  nightly-review.py     → local (queue aggregation, terse summary)
06:00 PST  type-safety-audit.py  → local (JSONL schema validation)
07:00 PST  morning-summary.py    → local (HTML report + narrative paragraph)
```

If `OLLAMA_TAILSCALE_IP` is unset or the WSL machine is offline,
all scripts fall back to the Anthropic API automatically.

See `cowork/config/local-model-policy.yaml` for the full routing policy.

---

## 9. Troubleshooting

**Connection refused from macOS:**
```bash
# Verify WSL is running (Windows)
wsl --list --running

# Check Ollama is bound to 0.0.0.0 (WSL)
ss -tlnp | grep 11434
# Should show: 0.0.0.0:11434

# Check Tailscale is up on both machines
tailscale status
```

**Model not found error:**
```bash
# List models on Ollama (from macOS)
curl http://<TAILSCALE_IP>:11434/v1/models

# The model name in ANTHROPIC_DEFAULT_SONNET_MODEL must match EXACTLY
# including the :latest tag
```

**anthropic-beta header error:**
```bash
# Make sure this is set before running claude
export CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS="1"
```

**Slow generation (< 5 tokens/sec):**
- Confirm CUDA is being used: `ollama ps` should show "GPU" not "CPU"
- RTX 2080 with glm-4.7-flash:latest should produce ~30-60 tokens/sec
- If CPU-only: check `nvidia-smi` from WSL; may need driver reinstall

**WSL sleeps when Windows locks:**
- Disable WSL sleep: in Windows, search "Power & sleep" → set sleep to "Never" on plugged-in
- Or run Ollama as a Windows service that keeps WSL alive

---

## 10. Expected Performance (RTX 2080)

| Model | VRAM used | Tokens/sec (gen) | Tokens/sec (prompt) |
|-------|-----------|------------------|---------------------|
| glm-4.7-flash Q4_K_M | ~8GB | ~35–55 t/s | ~200–400 t/s |
| qwen2.5-coder:7b Q4 | ~5GB | ~45–70 t/s | ~300–500 t/s |

For nightly scripts (queue review, type-safety audit, morning summary):
- Average output: 200–800 tokens per script
- Estimated runtime: 10–30 seconds per script
- Anthropic tokens saved: ~15,000–22,000 per night = ~$0.23–0.33/night at sonnet pricing
