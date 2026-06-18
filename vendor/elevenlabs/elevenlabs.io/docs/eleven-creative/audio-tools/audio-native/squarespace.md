> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Audio Native with Squarespace

Follow the steps in the [Audio Native overview](/docs/eleven-creative/audio-tools/audio-native) to
get started with Audio Native before continuing with this guide.

Navigate to your Squarespace site, sign in and open the page you wish to add narration to.

Click the "+" symbol on the spot you want to place the Audio Native player and select "Code" from the menu.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/aedf2e008d7a58a1c502b0b71fc674397928102ce07202a31eec415360d98490/assets/images/product-guides/audio-native/audio-native-squarespace-1.png" alt="Audio Native" />

Paste the Audio Native embed code into the HTML box and press enter.

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

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/c9bc7a9212ad6934ebd100aab3fc6d35436e01058d1ce41cf6ac9994a1aba91c/assets/images/product-guides/audio-native/audio-native-squarespace-2.png" alt="Audio Native" />

Click the "Save" button in the top right corner of the editor, which should now be highlighted.

Finally, navigate to the live version of the blog post. You should see a message to let you know that the Audio Native project is being created. After a few minutes the text in your blog will be converted to an audio article and the embedded audio player will appear.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/e5dd2d8d5c0a5827527911cfab8bb32c5c1af58947a0eeb5e6e6e2df8687de44/assets/images/product-guides/audio-native/audio-native-squarespace-3.png" alt="Audio Native" />