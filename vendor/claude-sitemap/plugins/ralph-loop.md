# Ralph Loop

Ralph Loop enables iterative, self-referential AI development loops where Claude works on the same task repeatedly until completion. The plugin intercepts session exits via a stop hook and automatically re-feeds your prompt while preserving all file modifications and git history between iterations. This creates autonomous improvement cycles where Claude can refine its work based on test failures and previous attempts.

The technique is ideal for well-defined projects with clear success criteria, greenfield development with automated verification, and any task amenable to iterative refinement. Claude reads its own past work to inform improvements, creating a powerful feedback loop for autonomous problem-solving.

**How to use:** Start an iterative session with `/ralph-loop "your prompt here" --max-iterations 10 --completion-promise "DONE"`. The loop continues until Claude outputs the completion promise or reaches the iteration limit. Cancel anytime with `/cancel-ralph`. Write prompts with explicit completion criteria and success metrics for best results.