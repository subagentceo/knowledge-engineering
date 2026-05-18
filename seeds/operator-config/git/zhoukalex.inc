# vendor cites:
# - vendor/docs-github/docs.github.com/en/github-cli/github-cli/quickstart.md:93-97
# - git-config(1) §"Conditional includes"
# Identity: zhoukalex — 3rd rotation slot (5x plan). Inherits alex.inc scope verbatim.
[include]
	path = ./alex.inc
[user]
	name = zhoukalex
	email = zhouk.alex@gmail.com
[core]
	sshCommand = ssh -i ~/.ssh/id_ed25519_zhoukalex -F ~/.ssh/config
[url "git@github.com-zhoukalex:"]
	insteadOf = git@github.com:
	insteadOf = https://github.com/
