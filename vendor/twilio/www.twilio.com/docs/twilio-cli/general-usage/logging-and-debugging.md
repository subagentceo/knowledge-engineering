# Logging and debugging

To help debug issues with commands, the Twilio CLI also supports logging via the `-l` flag.

You can decide what level of logging you'd like by using the `-l` option. The valid levels of logging messages are `debug`, `info`, `warn`, `error`, and `none`.

All debug, informational, warning, and error logs are sent to `stderr`. This is so it can be easily separated from the command output.

For example, suppose you're unable to list your messages and aren't sure why:

```bash
$ twilio api:core:messages:list
 » twilio-cli encountered an unexpected error. To report this issue, execute the command with the "-l debug" flag, then copy the output to a new issue here: "https://github.com/twilio/twilio-cli/issues"
```

In this case (and most cases), debug logs will help you inspect the issue and see errors in greater detail:

```bash
$ twilio api:core:messages:list -l debug
[DEBUG] Config File: /Users/example/.twilio-cli/config.json
[DEBUG] Using profile: developer
[DEBUG] Provided flags: {"cli-log-level":"debug","cli-output-format":"columns","silent":false,"skip-parameter-validation":false,"properties":"sid,from,to,status,direction,dateSent","limit":50,"no-limit":false}
[DEBUG] domainName=api, path=/2010-04-01/Accounts/{AccountSid}/Messages.json, actionName=list
[DEBUG] pathNode=AccountSid, value=ACxxxx
[DEBUG] -- BEGIN Twilio API Request --
[DEBUG] get https://api.sydney.jp1.twilio.com/2010-04-01/Accounts/ACxxxx/Messages.json
[DEBUG] Custom HTTP Headers:
[DEBUG] User-Agent: twilio-cli/5.1.0 @twilio/cli-core/7.3.0 (darwin x64) twilio-api-client/7.3.0 api:core:messages:list
[DEBUG] -- END Twilio API Request --
[DEBUG] Found command "api:core:messages:list" plugin: twilio-cli
 » twilio-cli encountered an unexpected error. To report this issue, execute the command with the "-l debug" flag, then copy the output to a new issue here: "https://github.com/twilio/twilio-cli/issues"
[DEBUG] getaddrinfo ENOTFOUND api.sydney.jp1.twilio.com
[DEBUG] Error: getaddrinfo ENOTFOUND api.sydney.jp1.twilio.com
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:71:26)
```

Instead of an opaque error message, you now have logs that indicate the issue is due to an invalid URL in the request. Time to verify that you have the correct [Edge](/docs/global-infrastructure/understanding-edge-locations) and [Region](/docs/global-infrastructure/understanding-twilio-regions) set for your account!
