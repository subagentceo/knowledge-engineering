

Choosing a preferred device [#choosing-a-preferred-device]

When the same model is available on multiple devices in the link, LM Link uses the preferred device to load and use the model. This setting is per-machine: each device on the link independently controls which remote machine it prefers.

This is especially relevant when accessing remote models via the SDK or [REST API](/docs/developer/core/lmlink).

Machines with GUI [#machines-with-gui]

In the app, head to the LM Link page, select the device and toggle the "Set as preferred device" option.

<img src="/assets/marketing/docs/lmlink-preferred.png" style="width: 75%;" data-caption="Set a device as your preferred device" />

Machines without GUI [#machines-without-gui]

To set a preferred device from the terminal, use the following command:

```bash
lms link set-preferred-device
```
