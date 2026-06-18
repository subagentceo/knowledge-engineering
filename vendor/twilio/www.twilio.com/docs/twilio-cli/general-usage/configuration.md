# Configuration

The `twilio:config` command enables you to list and set configuration values that apply regardless of your active [profile](/docs/twilio-cli/general-usage/profiles).

## List values

To see your current configuration including Edge, profiles, and active profile, use:

```bash
twilio config:list
```

If a configuration value is currently determined by an environment variable, such as `TWILIO_EDGE`, it will have `[env]` appended to its value. For example, this could look like:

```bash
$ export TWILIO_EDGE=sydney
$ twilio config:list
Config Name          Value
edge                 "sydney[env]"
# remaining config values...
```

> \[!NOTE]
>
> All configurations are stored in `~/.twilio-cli/config.json`.

## Set values

To set a configuration value, such as setting your target Edge to `sydney` without an environment variable, use:

```bash
twilio config:set --edge=sydney
```

### Require profile input

To configure the Twilio CLI to reject any commands that do not include a `profile` flag, use:

```bash
$ twilio config:set --require-profile-input

# ❌ This is doomed to fail since no profile is provided
$ twilio phone-numbers:list
 » Error: Missing required flag:
 -p, --profile PROFILE  Shorthand identifier for your profile. To disable this check run:

  twilio config:set --no-require-profile-input

# ✅ profile is defined, request accepted
$ twilio phone-numbers:list --profile=dev
SID                                 Phone Number  Friendly Name
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1646887XXXX  Congress hotline

# ✅ you can also use shorthand for the profile flag
$ twilio phone-numbers:list -p dev
SID                                 Phone Number  Friendly Name
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1646887XXXX  Congress hotline
```

Run the following command and confirm to revert this setting:

```bash
$ twilio config:set --no-require-profile-input
? Overwrite existing requireProfileInput value? Yes
```

## Remove values

To remove the value of a configuration that has previously been set, set the value to an empty string. You will be prompted to confirm that you want to remove that value from your configuration.

This is useful in case you are temporarily setting the Edge to a non-US location for some work, and want to revert back to the US Edge afterwards. As an example:

```bash
$ twilio config:set --edge=
? Remove existing edge value? Yes
```

> \[!WARNING]
>
> If no profile is active after setting `--no-require-profile-input`, run `twilio profiles:use PROFILE_ID` to set an active profile for subsequent CLI commands.

## Precedence of configuration values

The Twilio CLI will attempt to load configuration values in the following order of priority:

1. From environment variables, if set
2. From the values defined in `config.json`
