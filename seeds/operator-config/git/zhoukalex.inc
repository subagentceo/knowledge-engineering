# vendor cites:
# - vendor/git/git-scm.com/docs/git-config.md §"Includes"
#   (Per the spec: included files are processed as if inlined at the include
#    directive, and the override-by-later-block rule means [user] / [core]
#    below correctly override alex.inc's values.)
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
