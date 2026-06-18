# Apps on Devices

Learn about deploying your Android POS apps on Stripe smart readers.

Apps on Devices isn’t available to all users. If you pay [standard pricing](https://stripe.com/pricing) on card present transactions, Apps on Devices is available at no extra cost. If you’re interested in using it, [contact your sales representative](https://stripe.com/contact/sales) so they can assess your eligibility and pricing. If you don’t have a sales representative, contact us using the form at [Stripe support](https://support.stripe.com) to enable this feature.

To be eligible, you must have either an existing Android-based POS application or the resources to build an Android application. When using direct charges, a single platform must control your connected account.

Use Apps on Devices to run your point-of-sale (POS) application along with other apps on your device. You can deploy your POS app to Stripe smart readers to provide an all-in-one solution, or build a customer-facing app for payments, driven by your POS running on another device.

Stripe handles all payments and compliance with the Terminal SDK. Android and React Native SDKs support Apps on Devices.

Apps on Devices enables the key phases of your app lifecycle:

1. [Build and test your app](https://docs.stripe.com/terminal/features/apps-on-devices/build.md)
2. [Prepare for app review](https://docs.stripe.com/terminal/features/apps-on-devices/app-review.md)
3. [Submit your app](https://docs.stripe.com/terminal/features/apps-on-devices/submit.md)
4. [Deploy your app to selected devices](https://docs.stripe.com/terminal/features/apps-on-devices/deploy-in-dashboard.md)
5. [Monitor deployment](https://docs.stripe.com/terminal/features/apps-on-devices/monitor.md)

View the [sample app](https://github.com/stripe-samples/terminal-apps-on-devices) to learn integration best practices, how to collect and confirm a payment, and more.

## Supported integrations

Apps on Devices supports two types of integrations:

- [POS Android app on a Stripe smart reader](https://docs.stripe.com/terminal/features/apps-on-devices/overview.md#pos-stripe-device)
- [POS Android app paired with a consumer-facing app on a Stripe-compatible reader](https://docs.stripe.com/terminal/features/apps-on-devices/overview.md#pos-consumer-app)

#### Point of sale app on a Stripe smart reader 

In this integration, both your POS app and the Stripe Reader app run on a Stripe smart reader. When the device starts, it launches your POS app instead of the Stripe Reader app. When initiating a transaction, the Stripe Reader app becomes the primary. At the end of the transaction, the Stripe Reader app finishes and your POS app becomes the primary.
![](https://b.stripecdn.com/docs-statics-srv/assets/apps-on-devices-pos-on-spos.d5f000091839ad34c7d963d7b365599b.png)

#### Point-of-sale app paired with consumer-facing app on a Stripe smart reader 

In this integration, your POS app runs on a device that’s separate from the Stripe smart reader. Your consumer-facing Android app runs on the Stripe smart reader and supports the payment transaction.

You manage the communication between your POS app and consumer-facing app over TCP/IP.
![](https://b.stripecdn.com/docs-statics-srv/assets/apps-on-devices-app-on-cfd.9a008cbbeec4bd909ee061db638873b2.png)

## App requirements

App resources are limited by the device specs, and app functionality might be constrained by differences from standard Android development. Make sure your app can run successfully by operating within the requirements below.

#### APK size limit

APK files that you upload to the Stripe API have a 200MB size limit.

#### Device specs

- To see the hardware specifications for Verifone readers, see [Set up Verifone readers](https://docs.stripe.com/terminal/payments/setup-reader/verifone.md).
- To see the hardware specifications for the [Stripe Reader S700/S710](https://docs.stripe.com/terminal/payments/setup-reader/stripe-reader-s700-s710.md), see the following table:

|  |
|  |
| CPU                  | Qualcomm Snapdragon 665 QCM6125 |
| RAM                  | 4GB                             |
| Storage              | 64GB                            |
| OS                   | Android 10                      |
| Screen dimensions    | 1080x1920 pixels                |
| Screen pixel density | 420dpi (xxhdpi)                 |

#### Device storage

Stripe manages updates over the air for all apps and software components that run on the device. Make sure your app uses 8GB or less of storage on the device.

## Differences from standard Android

The Stripe SmartPOS OS is built for security and PCI-compliance based on the Android Open Source Project (AOSP). It differs from standard consumer Android in the following ways:

- Google Play Services aren’t available on Stripe Android devices. You can integrate Google Play Services SDKs in your app, but you must verify that your app functions as expected. For example, parts of Firebase and Google Maps SDKs won’t function on Stripe devices.
- Notifications are disabled and the device user can’t access the home screen. Either your app or the Stripe reader app persists as the primary.
- Production devices have a disabled USB port. Additionally, [Android Debug Bridge](https://developer.android.com/studio/command-line/adb) (`adb`) and debugging aren’t available.

You can use a [DevKit device](https://docs.stripe.com/terminal/features/apps-on-devices/build.md) for development purposes.

## Android permissions

During installation, the Stripe SmartPOS OS automatically grants [Android permissions](https://developer.android.com/guide/topics/permissions/overview) in your app’s manifest. The device user isn’t prompted for permission approval at runtime. Your app’s permissions are verified against the allowed permissions list, and apps requesting permissions in excess of the allowlist are rejected.

| Permission                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [android.permission.ACCESS_ADSERVICES_AD_ID](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/common/AdServicesPermissions#ACCESS_ADSERVICES_AD_ID)             |
| [android.permission.ACCESS_ADSERVICES_ATTRIBUTION](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/common/AdServicesPermissions#ACCESS_ADSERVICES_ATTRIBUTION) |
| [android.permission.ACCESS_COARSE_LOCATION](https://developer.android.com/reference/android/Manifest.permission#ACCESS_COARSE_LOCATION)                                                             |
| [android.permission.ACCESS_FINE_LOCATION](https://developer.android.com/reference/android/Manifest.permission#ACCESS_FINE_LOCATION)                                                                 |
| [android.permission.ACCESS_NETWORK_STATE](https://developer.android.com/reference/android/Manifest.permission#ACCESS_NETWORK_STATE)                                                                 |
| [android.permission.ACCESS_WIFI_STATE](https://developer.android.com/reference/android/Manifest.permission#ACCESS_WIFI_STATE)                                                                       |
| [android.permission.BLUETOOTH](https://developer.android.com/reference/android/Manifest.permission#BLUETOOTH)                                                                                       |
| [android.permission.BLUETOOTH_ADMIN](https://developer.android.com/reference/android/Manifest.permission#BLUETOOTH_ADMIN)                                                                           |
| [android.permission.BLUETOOTH_ADVERTISE](https://developer.android.com/reference/android/Manifest.permission#BLUETOOTH_ADVERTISE)                                                                   |
| [android.permission.BLUETOOTH_CONNECT](https://developer.android.com/reference/android/Manifest.permission#BLUETOOTH_CONNECT)                                                                       |
| [android.permission.BLUETOOTH_SCAN](https://developer.android.com/reference/android/Manifest.permission#BLUETOOTH_SCAN)                                                                             |
| [android.permission.CAMERA](https://developer.android.com/reference/android/Manifest.permission#CAMERA)                                                                                             |
| [android.permission.FOREGROUND_SERVICE](https://developer.android.com/reference/android/Manifest.permission#FOREGROUND_SERVICE)                                                                     |
| [android.permission.FOREGROUND_SERVICE_CONNECTED_DEVICE](https://developer.android.com/reference/android/Manifest.permission#FOREGROUND_SERVICE_CONNECTED_DEVICE)                                   |
| [android.permission.FOREGROUND_SERVICE_DATA_SYNC](https://developer.android.com/reference/android/Manifest.permission#FOREGROUND_SERVICE_DATA_SYNC)                                                 |
| [android.permission.FOREGROUND_SERVICE_SPECIAL_USE](https://developer.android.com/reference/android/Manifest.permission#FOREGROUND_SERVICE_SPECIAL_USE)                                             |
| [android.permission.INTERNET](https://developer.android.com/reference/android/Manifest.permission#INTERNET)                                                                                         |
| [android.permission.NEARBY_WIFI_DEVICES](https://developer.android.com/reference/android/Manifest.permission#NEARBY_WIFI_DEVICES)                                                                   |
| [android.permission.NFC](https://developer.android.com/reference/android/Manifest.permission#NFC)                                                                                                   |
| [android.permission.POST_NOTIFICATIONS](https://developer.android.com/reference/android/Manifest.permission#POST_NOTIFICATIONS)                                                                     |
| [android.permission.READ_BASIC_PHONE_STATE](https://developer.android.com/reference/android/Manifest.permission#READ_BASIC_PHONE_STATE)                                                             |
| [android.permission.READ_CONTACTS](https://developer.android.com/reference/android/Manifest.permission#READ_CONTACTS)                                                                               |
| [android.permission.READ_EXTERNAL_STORAGE](https://developer.android.com/reference/android/Manifest.permission#READ_EXTERNAL_STORAGE)                                                               |
| [android.permission.READ_MEDIA_AUDIO](https://developer.android.com/reference/android/Manifest.permission#READ_MEDIA_AUDIO)                                                                         |
| [android.permission.READ_MEDIA_IMAGES](https://developer.android.com/reference/android/Manifest.permission#READ_MEDIA_IMAGES)                                                                       |
| [android.permission.READ_MEDIA_VIDEO](https://developer.android.com/reference/android/Manifest.permission#READ_MEDIA_VIDEO)                                                                         |
| [android.permission.READ_PHONE_STATE](https://developer.android.com/reference/android/Manifest.permission#READ_PHONE_STATE)                                                                         |
| [android.permission.READ_PRIVILEGED_PHONE_STATE](https://source.android.com/docs/core/connect/device-identifiers)                                                                                   |
| [android.permission.RECORD_AUDIO](https://developer.android.com/reference/android/Manifest.permission#RECORD_AUDIO)                                                                                 |
| [android.permission.RECEIVE_BOOT_COMPLETED](https://developer.android.com/reference/android/Manifest.permission#RECEIVE_BOOT_COMPLETED)                                                             |
| [android.permission.SET_WALLPAPER](https://developer.android.com/reference/android/Manifest.permission#SET_WALLPAPER)                                                                               |
| [android.permission.USE_BIOMETRIC](https://developer.android.com/reference/android/Manifest.permission#USE_BIOMETRIC)                                                                               |
| [android.permission.USE_FINGERPRINT](https://developer.android.com/reference/android/Manifest.permission#USE_FINGERPRINT)                                                                           |
| [android.permission.VIBRATE](https://developer.android.com/reference/android/Manifest.permission#VIBRATE)                                                                                           |
| [android.permission.WAKE_LOCK](https://developer.android.com/reference/android/Manifest.permission#WAKE_LOCK)                                                                                       |
| [android.permission.WRITE_EXTERNAL_STORAGE](https://developer.android.com/reference/android/Manifest.permission#WRITE_EXTERNAL_STORAGE)                                                             |
| [com.android.alarm.permission.SET_ALARM](https://developer.android.com/reference/android/Manifest.permission#SET_ALARM)                                                                             |
| [com.google.android.c2dm.permission.RECEIVE](https://developers.google.com/android/reference/com/google/android/gms/cloudmessaging/CloudMessagingReceiver)                                          |
| com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE                                                                                                                              |
| com.google.android.gms.permission.AD_ID                                                                                                                                                             |

> The camera, Bluetooth, and location capabilities and APIs are still in the experimental phase and haven’t been fully tested, validated, and approved by Stripe. Their performance, reliability, and stability aren’t guaranteed. Use this functionality at your discretion.
> 
> The NFC functionality in the devices only supports payments—it can’t be used for non-payment related features.

## Apps on Devices and Stripe Connect compatibility

Platforms using Apps on Devices can deploy apps only to [connected accounts](https://docs.stripe.com/connect.md) that are controlled by a single platform. A connected account is supported if its [`controller.is_controller`](https://docs.stripe.com/api/accounts/object.md#account_object-controller-is_controller) property is `true`. That prevents multiple platforms from deploying apps to the same connected account.

## Next steps

- [Build and test your app](https://docs.stripe.com/terminal/features/apps-on-devices/build.md)
- [Prepare for app review](https://docs.stripe.com/terminal/features/apps-on-devices/app-review.md)
