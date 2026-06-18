# Data Hosting Region Configuration

For customers who are part of Data Hosting in Europe or Australia, you will need to modify your `AndroidManifest.xml` in order to configure the Android Messenger to point to your regional workspace.

In your `AndroidManifest.xml` of the base Android project add the following right before `</application>`:

EU
```xml
<meta-data
        android:name="io.intercom.android.sdk.server.region"
        android:value="@integer/intercom_server_region_eu" />
```

AUS
```xml
<meta-data
        android:name="io.intercom.android.sdk.server.region"
        android:value="@integer/intercom_server_region_aus" />
```

US
```xml
<meta-data
        android:name="io.intercom.android.sdk.server.region"
        android:value="@integer/intercom_server_region_us" />
```

The SDK will default to US servers if this parameter is not specified.

Valid options for `io.intercom.android.sdk.server.region` are

- `intercom_server_region_eu`
- `intercom_server_region_aus`
- `intercom_server_region_us`


Meta data tag `shouldUseEuServer` has been deprecated and can be removed from your manifest file. Please replace it with the above changes to specify the region if you are using it.