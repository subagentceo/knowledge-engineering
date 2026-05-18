# vendor cites:
# - vendor/docs-github/docs.github.com/en/github-cli/github-cli/quickstart.md:93-97
# - git-config(1) §"Conditional includes"
# Identity: admin-jadecli — 2nd rotation slot. Inherits alex.inc scope verbatim.
# Order matters: [include] FIRST so [user] override below wins.
[include]
	path = ./alex.inc
[user]
	name = admin-jadecli
	email = admin@jadecli.com
[core]
	sshCommand = ssh -i ~/.ssh/id_ed25519_admin -F ~/.ssh/config
[url "git@github.com-admin:"]
	insteadOf = git@github.com:
	insteadOf = https://github.com/
