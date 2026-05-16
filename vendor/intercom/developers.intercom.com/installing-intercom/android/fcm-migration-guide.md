# Migrating to FCM HTTP v1

[Google has deprecated the legacy FCM APIs](https://firebase.google.com/docs/cloud-messaging/migrate-v1) and will discontinue its usage by **June, 2024**. We’ve now added support for the new HTTP v1 API and below are the steps for migration.

If this is your first time setting up Android push notifications in Intercom, please go to our [Android Push Notifications](https://developers.intercom.com/installing-intercom/android/fcm-push-notifications/) section.

## Step 1. Enable Firebase Cloud Messaging (v1)

Login in to your [FCM Console page](https://console.firebase.google.com/) and click on the gear icon beside Project Overview in the sidebar. Select **Project Settings** to navigate to the Project settings page.

![](/assets/fcm-project-setting.1d9373bd04bf191cef7870a3f1c43616b36b49f499ba4e5cc9dd1e056b078ba7.71a4f21c.png)

br
Under the Project settings page, select the **Cloud Messaging** tab and ensure that **Firebase Cloud Messaging API (V1)** is enabled.

![](/assets/fcm-project-setting-opened.c0d8686fdcab0e0c3f804f0fa88dd3042e20cd95eb3947e6939fd46f4c76c181.71a4f21c.png)

br
This is enabled by default for all new FCM projects, however, if you have an older project and **Firebase Cloud Messaging (v1)** is disabled, you can enable it by clicking on the three dots icon and selecting **Manage API in Google Cloud Console**, this will bring you to a new page where you can enable the **Firebase Cloud Messaging API** by clicking on the **Enable** button.

![](/assets/fcm-enable-screen.59fea01e08dd223a256e168a5ac21ae28ed716722466850a9f2c468f6723ea89.71a4f21c.png)

Once successfully enabled, navigate back to the [firebase console](https://console.firebase.google.com/) and continue to the next step.

## Step 2. Generate Private Key

Under the Project settings page, select the **Service Accounts** tab and under Firebase Admin SDK, ensure that Node.js is selected and then click on Generate new private key

![](/assets/fcm-service-account-settings.5ef7cd2d514557b88bc1ec2d9af62e279b0510fbcee40d2fa8a3381b51fa1b66.71a4f21c.png)

br
This will bring up a warning modal, click on **Generate Key** to download your private key JSON file.

![](/assets/fcm-generate-key.d3a4b530b9c903005afcdb9c758748d174724976d840fe7ce769db1dae936df2.71a4f21c.png)

## Step 3. Configure Push Credentials in Intercom

Open your Intercom app’s settings and select **Installation -> Android**. Under the **Push Notifications** section, click on the **Edit** button to update your existing push credentials or click on **Configure push notifications** to set up new push credentials.

Upload the private key which you downloaded from FCM under the **Service Account private key** field and Save.

![](/assets/upload-service-account-file.12b6600675f81a685f9da8da790174339c7a40e14b9dc18061e4dbf6b29a4334.71a4f21c.png)

Once the file is successfully validated and saved, we will switch to using the new API to send push notifications.

## FAQ

**Do I need to update my Android SDK?**

No, you only need to update your push credentials with the private key and we will automatically migrate you to the new API.

**When is the deadline for this migration?**

Google has set a [deadline for June, 2024](https://firebase.google.com/docs/cloud-messaging/migrate-v1) to discontinue the legacy API, we encourage you to migrate as soon as possible to avoid any disruptions after the deadline date.

**Do I need to update all my push credentials if I have multiple push credentials?**

Yes, you will need to update each push credential with its related private key. If the apps are under the same project, then the same private key will work for all but it will have to be updated individually.