# Hugging Face Skills

Hugging Face Skills provides a comprehensive suite of AI/ML capabilities for working with the Hugging Face ecosystem. Train and fine-tune language models using TRL with cloud GPU infrastructure, create and manage datasets with SQL-based querying, run model evaluations, track experiments, and publish research papers—all without leaving Claude Code.

The plugin includes 8 specialized skills: model training (SFT, DPO, GRPO, Reward Modeling), dataset creation and management, model evaluation, compute job execution, experiment tracking with Trackio, research paper publishing, reusable tool building, and Hub operations via the HF CLI.

**How to use:** Invoke skills with natural language prompts like "Train a model on my dataset using SFT", "Create a new dataset for instruction tuning", "Run evaluations on my model and update the model card", or "Query this Hugging Face dataset with SQL". Use `/hugging-face-model-trainer` to fine-tune LLMs on cloud GPUs, `/hugging-face-datasets` to manage datasets, and `/hugging-face-evaluation` to run benchmarks.

Key features include automatic model saving to the Hugging Face Hub, real-time training monitoring, GGUF conversion for local deployment, cost estimation tools, and multi-GPU support. Requires a Hugging Face account with an HF_TOKEN for authentication.
