# vendor cites:
# - vendor/docs-github/docs.github.com/en/github-cli/github-cli/quickstart.md:93-97
# - git-config(1) §"Conditional includes"
# Identity: jade-jadecli — LEGACY. Not in subagentceo org per CLAUDE.md.
# Intentionally does NOT inherit from alex.inc — keep scope minimal.
[user]
	name = jade-jadecli
	email = jade@jadecli.com
[core]
	sshCommand = ssh -i ~/.ssh/id_ed25519_jade -F ~/.ssh/config
[url "git@github.com-jade:"]
	insteadOf = git@github.com:
	insteadOf = https://github.com/
