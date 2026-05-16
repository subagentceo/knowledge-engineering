# Turn on a ringtone for inbound tasks

## Overview

By default, Flex shows agents a browser notification for every inbound task. If you also want Flex to play a sound so that agents can hear when a new task comes in, you can turn on a ringtone in Flex Console.

To prevent interruptions, the ringtone doesn't sound when an agent is in a call.

## Turn on the default ringtone

If you previously added a custom plugin or other configuration to enable ringing, we recommend you turn off or remove these modifications before turning on the ringtone setting. If you have an active plugin to change the ringtone, and the ringtone is turned on, plugin behavior takes precedence.

To turn on the ringtone:

1. In Twilio Console, navigate to **Flex** > **Contact center settings** > **Inbound task notifications**.
2. Select **Play ringtone for inbound tasks in Flex**, and then click **Save**.

## Use a custom ringtone

If you want to play different sounds based on task channel or reservation status, you can configure additional behavior using the [SoundManager API](/docs/flex/developer/ui/sound-and-audio#soundmanager-api).
