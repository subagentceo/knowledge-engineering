# vendor cites:
# - vendor/docs-github/docs.github.com/en/github-cli/github-cli/quickstart.md:93-97
#   (gh auth switch — multi-account auth, primary doctrine for this pattern)
# - git-config(1) §"Conditional includes" — git's includeIf / include semantics
# Identity: alex-jadecli — PRIMARY. All third-party integrations route here.
# This file is the BASE that admin.inc and zhoukalex.inc inherit for scope parity.
[user]
	name = alex-jadecli
	email = alex@jadecli.com
[core]
	sshCommand = ssh -i ~/.ssh/id_ed25519_alex -F ~/.ssh/config
[url "git@github.com-alex:"]
	insteadOf = git@github.com:
	insteadOf = https://github.com/
