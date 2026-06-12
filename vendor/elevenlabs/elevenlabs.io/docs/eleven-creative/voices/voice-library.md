> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Voice Library

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/6279d167562a3c4d9e6b93263ec8dfe4f969f713a0543a7bdf68ae2140c2f3ae/assets/images/product-guides/voices/voices-voice-library.webp" alt="Voice Library" />

## Overview

The [Voice Library](https://elevenlabs.io/app/voice-library) is a marketplace where our community can share Professional Voice Clones and earn rewards when others use them. Currently, only Professional Voice Clones can be shared. Instant Voice Clones and voices created with Voice Design are not shareable.

To access the Voice Library, click **Voices** in the sidebar and select **Explore**.

Voice Library voices are not available via the API to free tier users.

### Finding voices

You can browse the Voice Library in several ways:

#### Handpicked Collections

Our Handpicked Collections highlight top voices across use cases, genres, and languages. These collections are updated regularly to include new standout voices.

#### Search

Use the search bar to find voices by name, keyword, or voice ID. You can also search by uploading or dragging and dropping an audio file. This will help you find the original voice, if available, along with similar voices.

#### Sort options

You can sort voices by:

* Trending: voices ranked by popularity
* Latest: newly added voices
* Most users
* Character usage

#### Filters

Use filters to refine your search:

##### Language

The language filter returns voices that have been trained on a specific language. While all voices can be used with any supported language, voices tagged with a specific language will perform best in that language. Some voices have been assessed as performing well in multiple languages, and these voices will also be returned when you search for a specific language.

##### Accent

When you select a language, the Accent filter will also become available, allowing you to filter for specific accents.

##### Category

Filter voices by their suggested use case:

* Conversational
* Narration
* Characters
* Social Media
* Educational
* Advertisement
* Entertainment

##### Gender

* Male
* Female
* Neutral

##### Age

* Young
* Middle Aged
* Old

##### Notice period

Some voices have a notice period. This is how long you'll continue to have access to the voice if the voice owner decides to remove it from the Voice Library. If the voice's owner stops sharing their voice, you'll receive advance notice through email and in-app notifications. These notifications specify when the voice will become unavailable and recommend similar voices from the Voice Library. If the owner of a voice without a notice period decides to stop sharing their voice, you'll lose access to the voice immediately.

This filter allows you to only return voices that have a notice period, and search for voices with a specific notice period. The maximum notice period is 2 years.

##### Live Moderation enabled

Some voices have Live Moderation enabled. This is indicated with a label with a shield icon. When you generate using a voice with Live Moderation enabled, we use tools to check whether the text being generated belongs to a number of prohibited categories. This may introduce extra latency when using the voice.

This filter allows you to exclude voices that have Live Moderation enabled.

##### Quality

Filter voices by their quality level:

* **Any**: All voices regardless of quality assessment
* **Studio Quality**: Voices that have been recorded with proper equipment, mixed well, and tested to be free from most audio problems such as reverb/echo, distortion, or other artifacts. These voices exhibit an overall professional-sounding tone and are reviewed by our QA testers.

### Using voices from the Voice Library

You can use voices from the Voice Library directly without saving them to My Voices. When you use a voice, the notice period will be saved for your account, allowing you to continue using voices you've used previously during an active notice period, even if you haven't saved them to My Voices.

#### Save to My Voices (optional)

While not required, you can save voices to My Voices for easy access or to use at a later date. To do this, click the **+** button.

Voices saved from the Voice Library do not use custom voice slots. Custom voice slots are only
used for voices you create with [Voice Design](/docs/eleven-creative/voices/voice-design) or
[Voice Cloning](/docs/eleven-creative/voices/voice-cloning).

Voices you've added to My Voices will become available for selection in all voice selection menus. You can also use a voice directly from My Voices by clicking the **T** button, which will open Text to Speech with the voice selected.

### My Voices

You can find all the voices you've created yourself, as well as voices you've saved from the Voice Library, in **My Voices**.

You will see the following information about each voice:

* the language it was trained on.
* the category, for example, "Narration".
* how long the notice period is, if the voice has one.

The voice type is indicated by an icon:

* Yellow tick: Professional Voice Clone.
* Black tick: Studio Quality Professional Voice Clone.
* Lightning icon: Instant Voice Clone.
* No icon: voice created with Voice Design.

#### More actions

Click **More actions** (three dots) to:

* Copy voice ID: copies the voice ID to your clipboard.
* Edit voice: allows you to change the name and description of the voice. These changes are only visible to you.
* Share voice: generates a link which you can share with others. When they use the link, the voice will be added to My Voices for their account.
* View history: view your previous Text to Speech generations using this voice.
* Delete voice: deleting voices is permanent and you will be asked to confirm the deletion.

#### Collections

To help organize voices you've saved, you can create your own collections and add voices to them.

To create a new collection go to My voices, click **Collections** and select **Create collection**. Give your new collection a name, and choose from the available icons.

To add individual voices to a collection, click **More actions** (three dots) and select **Add to collection**. You can choose to add the voice to an existing collection, or create a new one.

#### Select multiple voices

You can **Shift + Click** to select multiple voices at once.

#### Drag and drop voices

Both individual voices and multiple voice selections can also be dragged **Collections** and added to an existing collection, or deleted by dragging to the **trash can** icon.

### Sharing a Professional Voice Clone:

In [My Voices](https://elevenlabs.io/app/voice-lab) find your voice and click **More actions**
(three dots), then select **Share voice**.

In the pop-up, enable the **Sharing** toggle.

For private sharing, copy the sharing link. This will allow other users to save your voice to their account.

You can restrict access to specific users by adding emails to the **Allowlist**. If this is left blank, all users with the link will be able to access your voice.

To share publicly, enable **Publish to the Voice Library**. This doesn’t make your voice automatically discoverable.

![Voice sharing overview](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/60fd4b21d2e8bba5e749edb24ec545d5990907ac6da7cbc0967bf08f7c2e0ef9/assets/images/product-guides/voices/voice-sharing.webp)

Before proceeding with the sharing process, you'll have a number of options including setting a notice period and enabling Live Moderation. Please see the [Voice Library Addendum](https://elevenlabs.io/vla) to our [Terms of Service](https://elevenlabs.io/terms-of-use) for more information about these options.

You also have the option to select a custom voice preview. Any generations you've made of 70-150 characters will be available to select. If you don't see any options in the selection menu, there are no eligible generations available.

![Voice sharing options](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/95a98e53782fae49fb01c403fe998b87944b247495f2ef257512652b7588d52d/assets/images/product-guides/voices/voice-sharing-options.webp)

Enter a name and description for your voice.
Make sure the name you give your voice follows our **naming guidelines**:

#### Naming guidelines

* The naming pattern should be a name followed by **key voice traits** or a **voice persona**, separated by a hyphen (-).

* The name must be 40 characters or fewer.

* Your name should NOT include the following:

  * Names of public individuals or entities (company names, band names, influencers or famous people, etc).
  * Social handles (Twitter, Instagram, you name it, etc).
  * ALL CAPS WORDS.
  * Emojis and any other non-letter characters.
  * Explicit or harmful words.
  * The word "voice".

* Some examples of names following our guidelines:

  * Serena - Calm, Friendly, Warm
  * Olivia - Upbeat podcast host
  * Jasper - Deep, Encouraging, Serious
  * Maya - Terror narrator
  * Nelson - Scary villain
  * Harmony - High-energy, High-pitch

#### Description guidelines

* The description helps users decide if your voice is right for their project. Be specific about the use cases your voice is best suited for.

* Include as much detail as possible about your voice's key attributes — tone, style, emotion, pacing, and any unique qualities that set it apart.

* Do not list unrelated use cases to increase visibility. Voices with misleading or spammy descriptions will not be approved.

* Example of a good description:

  > Serena offers a warm, meditative tone with a naturally slow and steady pace. Her voice carries a "smile" that feels both friendly and reassuring, making her perfect for content where the listener needs to feel safe or relaxed.
  >
  > **Best use cases:** Meditation apps, sleep stories, wellness tutorials, and empathetic customer service IVR systems.
  >
  > **Key qualities:** Soft-spoken, breathy, and consistently calm.

Set labels (language, accent, gender, age, use case, tone, and style) to help others find your
voice.

Review and accept the [Voice Library Addendum](https://elevenlabs.io/vla) to our [Terms of
Service](https://elevenlabs.io/terms-of-use) and provide the required consents and confirmations.
Please do this carefully and ensure you fully understand our service before sharing. If you have
any questions at this stage, you can reach out to us at [legal@elevenlabs.io](mailto:legal@elevenlabs.io).

After submission, your voice will be reviewed by our team. If minor adjustments are needed, we may make these for you. Your request to share your voice may be declined if it doesn't meet our guidelines, and repeated uploads that consistently violate our guidelines may lead to restrictions on uploading and sharing voices.

We currently do not have an estimate for the review time, as it depends on the queue.