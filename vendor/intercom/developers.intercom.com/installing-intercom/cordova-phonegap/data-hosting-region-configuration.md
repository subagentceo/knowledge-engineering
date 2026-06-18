# Data Hosting Region Configuration

For customers who wish to configure their data hosting region, you will need to modify your app's `config.xml` in order to configure the Messenger to point to your desired workspace.

This is usually present in `/<YOUR_APP_DIR>/config.xml`

## iOS

You can add a String entry into your `info.plist` by adding the following to `config.xml` file.

```xml
<widget>
...

    <config-file target="*-Info.plist" parent="IntercomRegion">
        <string>EU</string> <!-- This can be US, EU or AU to point to United States, Europe, Australia regions respectively-->
    </config-file>
...
</widget>
```

The SDK will default to US servers if this parameter is not specified.

Valid options for value are

1. `EU` for Europe region
2. `AU` for Australia region
3. `US` for United States region


## Android

You can add a `meta-data` into `AndroidManifest.xml` by adding the following to `config.xml` file

```xml
<widget>
...

    <config-file target="AndroidManifest.xml" parent="/manifest/application">
        <meta-data android:name="io.intercom.android.sdk.server.region" android:value="@integer/intercom_server_region_aus" />
    </config-file>
...
</widget>
```

The SDK will default to US servers if this parameter is not specified.

Valid options for io.intercom.android.sdk.server.region are

1. `intercom_server_region_eu` for Europe region
2. `intercom_server_region_aus` for Australia region
3. `intercom_server_region_us` for United States region