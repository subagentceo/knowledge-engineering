# Initial Audio Device Check

The initial audio device check allows you to check an audio device's health when Flex starts up. Using the initial audio device check ensures that Flex can properly access your agents' audio devices before agents become available and are being offered any phone calls. This will significantly reduce the number of audio related issues resulting in cancelled incoming and outgoing calls.

## Why do audio device issues occur?

The most common issues with accessing the audio device are:

* Browser permissions for Microphone access have not been granted
* Disconnected or faulty USB headset
* Headset driver issues

## How does the audio device check work?

To make sure that your audio device is ready to be used when you start receiving or making calls, the Flex UI will try to access an audio device from the list of available devices when Flex starts up, the browser window refreshes, or the available device list changes. In most cases, it will be a default device. If the Flex UI is able to access the device, then it will use the device for incoming and outgoing calls.

**What happens if Flex UI couldn't access any devices?**

If the Flex UI doesn't find any devices, it will reject all incoming and outgoing calls by rejecting the task reservation. The Flex UI will show the user an error describing the issue. Reservations will be rejected until the user fixes the device issue.

**We strongly advise users to switch to an unavailable state as soon as the error occurs so that further calls can be properly routed to other agents.**

Once the device list has been updated, the Flex UI will check for available devices again. The Flex UI checks the audio device on every browser refresh **AND** on any changes in the available device list.

## How do I turn the audio device check feature on / off?

Initial audio device check is be enabled by default. You might want to keep this feature off for the following reasons:

* You are a messaging-only contact center and do not make or receive calls
* You have customized Flex to receive calls over non-WebRTC devices
* You are a developer and use a Bluetooth headset to listen to banging tracks and deep cuts while developing.

Flex also provides a config flag. This allows you to bypass the audio device check.

```javascript
appConfig = {
  <...>
  initialDeviceCheck: false
}
```

## How do I switch audio devices?

Beginning in Flex UI 2.8.0, you can switch both input and output audio devices in Flex. For example, you can switch between your headset and your built-in laptop speakers and microphone. To switch audio devices, click the headphones icon next to your status menu at the top of the Flex page, then select the audio device that you want to use.

This option is available only if your administrator has enabled it. It won't appear when you're using [Flex on Citrix VDI](/docs/flex/admin-guide/setup/voice/flex-citrix-vdi) due to compatibility issues.
