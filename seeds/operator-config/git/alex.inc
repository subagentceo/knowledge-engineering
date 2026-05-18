# vendor cites:
# - vendor/git/git-scm.com/docs/git-config.md §"Includes" / §"Conditional Includes"
#   (authoritative: "Included configuration files are processed as if their
#    contents were directly present at the location of the include directive.
#    Relative paths for included files are resolved relative to the
#    configuration file containing the include directive." — this is what makes
#    [include] path = ./alex.inc inside admin.inc / zhoukalex.inc work as
#    documented inheritance, not as a hack.)
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
