# Data Hosting Region Configuration

For customers who wish to configure their data hosting region, you will need to modify your `Info.plist` in order to configure the iOS Messenger to point to your desired workspace.

Add **`IntercomRegion`** as a new String key to your `info.plist`.

Add a value of **AU** (Australia), **EU** (Europe) or **US** (United States) to this key.

If this key is absent, the region will default to US.

![](/assets/b4be0cc-screenshot_2022-04-05_at_10.38.27.17f4833ddcbc8abec6009cd2c5f6fe66dfeffe3295dc89cb4a18cc6e63495c83.71a4f21c.png)