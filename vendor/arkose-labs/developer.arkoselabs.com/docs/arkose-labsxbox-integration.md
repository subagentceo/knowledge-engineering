# Connected Devices Integration

# Overview

Many connected devices, such as gaming consoles and smart TVs, provide limited web browsing capabilities via WebView. Arkose Bot Manager works well on many of those devices. However, due to their variability and the large number of different devices, we cannot provide a list of those confirmed to be compatible with Arkose Bot Manager. Please check with your CSM (Customer Success Manager) if you have questions or specific requirements.

The rest of this page shows how to integrate Xbox controller functionality into Arkose Protect. Integration with other devices is similar.

# Integration Instructions for Xbox Controller

The Enforcement Challenge (EC) must be embedded in a web browser, such as the UWP WebView if the app is built on that platform .

In your application, use a structure that allows you to identify when an Xbox is in use. When you identify an Xbox, use the **loaded\_callback** function `arkoseEnforcement.enableDirectionalInput` when you instantiate an EC, as shown in the code sample below.

```javascript
const arkoseEnforcement = new ArkoseEnforcement({
    public_key: publicKey,
    target_html: "CAPTCHA",
    callback: function() {
        // Callback
    },
    loaded_callback: function() {
        // Ensure that you only run enableDirectionalInput when used on xbox
       arkoseEnforcement.enableDirectionalInput();
    }
});
```

The `arkoseEnforcement.enableDirectionalInput` function allows directional instructions from the Xbox controller to be used to interact with the EC.

# Further Help

If you need more help with Xbox controller functionality, contact your CSM.