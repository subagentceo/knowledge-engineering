# vendor cites:
# - vendor/git/git-scm.com/docs/git-config.md §"Includes"
#   (Cited for the spec defining when inheritance does and does not occur;
#    this file deliberately omits any [include] directive, so per the spec
#    nothing is inlined from elsewhere.)
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
