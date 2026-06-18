> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Audio Native with Wix

Follow the steps in the [Audio Native overview](/docs/eleven-creative/audio-tools/audio-native) to
get started with Audio Native before continuing with this guide.

Navigate to your Wix site, sign in and open the settings page for the page you wish to narrate.

Click the "+" symbol at the top of your content and select "HTML Code" from the menu.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/5f9626bac119a2647568eac68a7f47877c5590a0f9d40bb77d7d34288d82852c/assets/images/product-guides/audio-native/audio-native-wix-1.webp" alt="Audio Native" />

Paste the Audio Native embed code into the HTML box and click "Save".

```html title="Embed code snippet"
    <div
        id="elevenlabs-audionative-widget"
        data-height="90"
        data-width="100%"
        data-frameborder="no"
        data-scrolling="no"
        data-publicuserid="public-user-id"
        data-playerurl="https://elevenlabs.io/player/index.html"
        data-projectid="project-id"
    >
        Loading the <a href="https://elevenlabs.io/text-to-speech" target="_blank" rel="noopener">Elevenlabs Text to Speech</a> AudioNative Player...
    </div>
    <script src="https://elevenlabs.io/player/audioNativeHelper.js" type="text/javascript"></script>
```

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/719f1f2d8f01aa94ea6550fc62666ec4c4dac024e3f26a8eed925de0f8c54e3d/assets/images/product-guides/audio-native/audio-native-wix-2.webp" alt="Audio Native" />

Click the "Publish" button in the top right corner of the editor.

Finally, navigate to the live version of the blog post. You should see a message to let you know that the Audio Native project is being created. After a few minutes the text in your blog will be converted to an audio article and the embedded audio player will appear.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/4bf9e321cac2007f1cf570410dc2e6a610fe209acad0c0caca4a049484e7ff22/assets/images/product-guides/audio-native/audio-native-wix-3.webp" alt="Audio Native" />