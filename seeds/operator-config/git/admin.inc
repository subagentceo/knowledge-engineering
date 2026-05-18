# vendor cites:
# - vendor/git/git-scm.com/docs/git-config.md §"Includes"
#   ("Included configuration files are processed as if their contents were
#    directly present at the location of the include directive. Relative
#    paths for included files are resolved relative to the configuration
#    file containing the include directive.")
# Identity: admin-jadecli — 2nd rotation slot. Inherits alex.inc scope verbatim.
# Order matters: [include] FIRST so [user] override below wins. Per the cited
# spec, after inclusion the file is processed as if alex.inc's contents are
# inlined here; subsequent [user] etc. blocks override the included values.
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
