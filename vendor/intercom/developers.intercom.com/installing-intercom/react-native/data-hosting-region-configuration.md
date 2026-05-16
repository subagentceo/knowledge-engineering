# Data Hosting Region Configuration

For customers who are part of Data Hosting in Europe, you will need to modify your app's configuration in order to configure the iOS Messenger to point to your EU workspace.

## iOS

See our iOS Installation guidelines [here](/installing-intercom/ios/data-hosting-region-configuration).

## **Expo**

For customers using **Expo** you can modify your `info.plist` by adding the following as a to the `info.plist` secion of your `app.json` file.


```json
"infoPlist": {
  "IntercomEURegion": "true"
},
```

## Android

See our Android Installation guidelines [here](/installing-intercom/android/data-hosting-region-configuration).