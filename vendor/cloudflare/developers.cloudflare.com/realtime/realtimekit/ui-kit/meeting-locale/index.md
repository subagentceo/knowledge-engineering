---
title: Meeting Locale
description: Customize text and localize the RealtimeKit UI Kit meeting interface for different languages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Meeting Locale

RealtimeKit's UI Kit allows you to customize all the text within the video call interface. You can personalize the text to align with your specific locale needs.

Prerequisites

This page builds upon the [Render Default Meeting UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/) & [Build Your Own UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/build-your-own-ui/) guides. Make sure you have read them first and understand how to use the default meeting UI components.

This page is not available for the **iOS, Android**platform.

WebMobile

ReactWeb ComponentsAngular

## Customize the language pack

RealtimeKit's default language pack can be customized to match your application's locale requirements. You can override any text string used in the UI Kit components.

The Flutter UI Kit loads string overrides from an ARB (Application Resource Bundle) JSON file. You provide the asset path when building the UI Kit, and the SDK replaces all matching string keys with your custom values.

The React Native UI Kit uses a language dictionary object to store all UI strings. You can override any key by passing a partial dictionary to the `useLanguage()` function, then pass the result to the `RtkMeeting` component via the `t` prop.

## Import the language utilities

RealtimeKit's default language pack can be imported like this:

```

<script type="module">

  import {

    useLanguage,

    defaultLanguage,

  } from "https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit-ui/dist/esm/index.js";

</script>


```

RealtimeKit's default language pack can be imported like this:

```

import { defaultLanguage, useLanguage } from "@cloudflare/realtimekit-react-ui";


```

RealtimeKit's default language pack can be imported like this:

TypeScript

```

import {

  defaultLanguage,

  useLanguage,

} from "@cloudflare/realtimekit-angular-ui";


```

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


```

No additional imports are required. The `arbPath` parameter is available on `RealtimeKitUIBuilder.build()`.

TypeScript

```

import {

  defaultLanguage,

  useLanguage,

} from "@cloudflare/realtimekit-react-native-ui";


```

## Create your custom language pack

To replace RealtimeKit's default locale with your own, create a custom language pack by spreading the `defaultLanguage` object and overriding specific keys:

```

<body>

  <rtk-meeting id="my-meeting"></rtk-meeting>


  <script type="module">

    import RealtimeKitClient from "https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit@latest/dist/index.es.js";

    import {

      useLanguage,

      defaultLanguage,

    } from "https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit-ui/dist/esm/index.js";


    // Customize RealtimeKit's default locale object

    const myLanguagePack = useLanguage({

      ...defaultLanguage,

      mute_all: "Mute All Users",

      leave: "Exit Call",

      join: "Join Now",

    });


    const init = async () => {

      const meeting = await RealtimeKitClient.init({

        authToken: "<participant_auth_token>",

      });


      const meetingEl = document.getElementById("my-meeting");

      meetingEl.meeting = meeting;

      meetingEl.showSetupScreen = true;


      // Pass custom language pack

      meetingEl.t = myLanguagePack;

    };


    init();

  </script>

</body>


```

The `useLanguage` function takes in your custom locale object as an argument and generates a function that retrieves the value associated with the provided key.

```

import {

  RealtimeKitProvider,

  useRealtimeKitClient,

} from "@cloudflare/realtimekit-react";

import {

  RtkMeeting,

  defaultLanguage,

  useLanguage,

} from "@cloudflare/realtimekit-react-ui";

import { useEffect, useState } from "react";


function App() {

  const [meeting, initMeeting] = useRealtimeKitClient();

  const [authToken, setAuthToken] = useState("<participant_auth_token>");


  // Customize RealtimeKit's default locale object

  const myLanguagePack = useLanguage({

    ...defaultLanguage,

    mute_all: "Mute All Users",

    leave: "Exit Call",

    join: "Join Now",

  });


  useEffect(() => {

    if (authToken) {

      initMeeting({

        authToken: authToken,

      });

    }

  }, [authToken]);


  return (

    <RealtimeKitProvider value={meeting}>

      <RtkMeeting showSetupScreen={true} meeting={meeting} t={myLanguagePack} />

    </RealtimeKitProvider>

  );

}


```

The `useLanguage` hook takes in your custom locale object as an argument and generates a function that retrieves the value associated with the provided key.

TypeScript

```

import { Component, OnInit } from "@angular/core";

import RealtimeKitClient from "@cloudflare/realtimekit-angular";

import {

  defaultLanguage,

  useLanguage,

} from "@cloudflare/realtimekit-angular-ui";


@Component({

  selector: "app-meeting",

  template: `

    <rtk-meeting [meeting]="meeting" [t]="myLanguagePack"></rtk-meeting>

  `,

})

export class MeetingComponent implements OnInit {

  meeting: any;

  myLanguagePack: any;


  async ngOnInit() {

    // Customize RealtimeKit's default locale object

    this.myLanguagePack = useLanguage({

      ...defaultLanguage,

      mute_all: "Mute All Users",

      leave: "Exit Call",

      join: "Join Now",

    });


    this.meeting = await RealtimeKitClient.init({

      authToken: "<participant_auth_token>",

    });

  }

}


```

The `useLanguage` function takes in your custom locale object as an argument and generates a function that retrieves the value associated with the provided key.

Create an ARB JSON file with a `@locale` key and the string keys you want to override. Add the file to your Flutter assets.

**1\. Create the ARB file** at `assets/lang/es.arb`:

```

{

  "@locale": "es",

  "join": "Unirse",

  "leave": "Salir",

  "cancel": "Cancelar",

  "micOn": "Mic Encendido",

  "micOff": "Mic Apagado",

  "videoOn": "Video Encendido",

  "videoOff": "Video Apagado",

  "mute": "Silenciar",

  "participants": "Participantes",

  "chat": "Chat",

  "settings": "Configuración"

}


```

**2\. Register the asset** in `pubspec.yaml`:

YAML

```

flutter:

  assets:

    - assets/lang/


```

**3\. Pass `arbPath`** when building the UI Kit:

Dart

```

final rtkUI = RealtimeKitUIBuilder.build(

  uiKitInfo: uiKitInfo,

  arbPath: 'assets/lang/es.arb',

);

Navigator.push(context, MaterialPageRoute(builder: (_) => rtkUI));


```

You only need to include the keys you want to override. Any key not present in the ARB file falls back to its English default.

Spread the `defaultLanguage` object and override specific keys. Pass the result to `RtkMeeting` via the `t` prop.

TypeScript

```

import {

  RtkMeeting,

  defaultLanguage,

  useLanguage,

} from '@cloudflare/realtimekit-react-native-ui';


function App() {

  const myLanguagePack = useLanguage({

    ...defaultLanguage,

    mute_all: 'Silenciar todo',

    leave: 'Salir',

    join: 'Unirse',

    participants: 'Participantes',

    chat: 'Chat',

    settings: 'Configuración',

  });


  return (

    <RtkMeeting

      meeting={meeting}

      t={myLanguagePack}

      showSetupScreen={true}

    />

  );

}


```

The `useLanguage` function merges your overrides with the defaults. Any key you do not override keeps its English default value.

## Use custom locale with UI provider

You can also pass the custom language pack to the UI provider component when building your own custom UI:

```

<body>

  <rtk-ui-provider id="ui-provider">

    <!-- Your custom UI components -->

  </rtk-ui-provider>


  <script type="module">

    import RealtimeKitClient from "https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit@latest/dist/index.es.js";

    import {

      useLanguage,

      defaultLanguage,

    } from "https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit-ui/dist/esm/index.js";


    const myLanguagePack = useLanguage({

      ...defaultLanguage,

      mute_all: "Mute All Users",

    });


    const meeting = await RealtimeKitClient.init({

      authToken: "<participant_auth_token>",

    });


    const uiProvider = document.getElementById("ui-provider");

    uiProvider.meeting = meeting;

    uiProvider.t = myLanguagePack;

  </script>

</body>


```

```

import {

  RealtimeKitProvider,

  useRealtimeKitClient,

} from "@cloudflare/realtimekit-react";

import {

  RtkUIProvider,

  defaultLanguage,

  useLanguage,

} from "@cloudflare/realtimekit-react-ui";

import { useEffect, useState } from "react";


function App() {

  const [meeting, initMeeting] = useRealtimeKitClient();

  const [authToken, setAuthToken] = useState("<participant_auth_token>");


  const myLanguagePack = useLanguage({

    ...defaultLanguage,

    mute_all: "Mute All Users",

  });


  useEffect(() => {

    if (authToken) {

      initMeeting({

        authToken: authToken,

      });

    }

  }, [authToken]);


  return (

    <RealtimeKitProvider value={meeting}>

      <RtkUIProvider meeting={meeting} t={myLanguagePack}>

        {/* Your custom UI components */}

      </RtkUIProvider>

    </RealtimeKitProvider>

  );

}


```

TypeScript

```

import { Component, OnInit } from "@angular/core";

import RealtimeKitClient from "@cloudflare/realtimekit-angular";

import {

  defaultLanguage,

  useLanguage,

} from "@cloudflare/realtimekit-angular-ui";


@Component({

  selector: "app-meeting",

  template: `

    <rtk-ui-provider [meeting]="meeting" [t]="myLanguagePack">

      <!-- Your custom UI components -->

    </rtk-ui-provider>

  `,

})

export class MeetingComponent implements OnInit {

  meeting: any;

  myLanguagePack: any;


  async ngOnInit() {

    this.myLanguagePack = useLanguage({

      ...defaultLanguage,

      mute_all: "Mute All Users",

    });


    this.meeting = await RealtimeKitClient.init({

      authToken: "<participant_auth_token>",

    });

  }

}


```

## Default language reference

RealtimeKit provides a comprehensive default language pack with all the text strings used throughout the UI Kit. You can override any of these keys to customize the text displayed in your meeting interface.

Here is the complete default language pack offered by RealtimeKit:

```

{

  "about_call": "About Call",

  "screen": "Screen",

  "camera": "Camera",

  "leave": "Leave",

  "dismiss": "Dismiss",

  "logo": "Logo",

  "page": "Page",

  "more": "More",

  "page.prev": "Previous Page",

  "page.next": "Next Page",

  "layout": "Layout",

  "layout.auto": "Auto Layout",

  "settings": "Settings",

  "file": "File",

  "image": "Image",

  "connection": "Connection",

  "leave_confirmation": "Are you sure you want to leave the call?",

  "cancel": "Cancel",

  "yes": "Yes",

  "(you)": "(you)",

  "you": "You",

  "everyone": "Everyone",

  "to": "To",

  "mute": "Mute",

  "kick": "Kick",

  "pin": "Pin",

  "pinned": "Pinned",

  "accept": "Accept",

  "unpin": "Unpin",

  "pip_on": "Show PiP",

  "pip_off": "Hide PiP",

  "viewers": "Viewers",

  "join": "Join",

  "joined": "Joined",

  "create": "Create",

  "close": "Close",

  "ask": "Ask",

  "type": "Type",

  "activate": "Activate",

  "requests": "Requests",

  "mic_off": "Mic Off",

  "disable_mic": "Disable Mic",

  "mic_on": "Mic On",

  "enable_mic": "Enable Mic",

  "audio": "Audio",

  "test": "Test",

  "minimize": "Hide Tile",

  "maximize": "Show Tile",

  "mute_all": "Mute all",

  "mute_all.description": "Everyone else in the meeting will be muted.",

  "mute_all.header": "Are you sure?",

  "mute_all.allow_unmute": "Allow others to unmute",

  "video_off": "Video Off",

  "disable_video": "Disable Video",

  "video_on": "Video On",

  "enable_video": "Enable Video",

  "video": "Video",

  "offline": "You're offline",

  "offline.description": "Please ensure that you are connected to the internet.",

  "disconnected": "You haven't joined the meeting.",

  "failed": "You've been disconnected",

  "failed.description": "We could not connect you back to the meeting room. Please try rejoining the meeting.",

  "disconnected.description": "Please join the meeting in order to see and interact with other participants.",

  "participants": "Participants",

  "participants.errors.empty_results": "Couldn't find a participant with the specified name or ID.",

  "participants.empty_list": "It looks like nobody is here.",

  "participants.no_pending_requests": "There are no pending requests.",

  "participants.turn_off_video": "Turn off video",

  "polls": "Polls",

  "polls.by": "Poll by",

  "polls.question": "Poll Question",

  "polls.question.placeholder": "What is your poll for?",

  "polls.answers": "Answers",

  "polls.option": "Add an option.",

  "polls.option.placeholder": "Enter an option",

  "polls.results.anon": "Anonymous",

  "polls.results.hide": "Hide results before voting",

  "polls.create": "Create Poll",

  "polls.cancel": "Cancel Poll Creation",

  "polls.empty": "No polls available",

  "polls.errors.question_required": "Question is required.",

  "polls.errors.empty_option": "Empty options not allowed.",

  "screenshare": "Screen Share",

  "screenshare.min_preview": "Minimize Preview",

  "screenshare.max_preview": "Expand Preview",

  "screenshare.shared": "Your screen is being shared.",

  "screenshare.start": "Share Screen",

  "screenshare.stop": "Stop Sharing",

  "screenshare.error.unknown": "An error occurred while starting screenshare.",

  "screenshare.error.max_count": "Maximum screen share limit reached.",

  "plugins": "Plugins",

  "perm_denied": "Permission denied by browser.",

  "perm_denied.audio": "Mic Permission denied by browser",

  "perm_denied.video": "Camera Permission denied by browser",

  "perm_denied.screenshare": "Screenshare Permission denied by browser",

  "perm_denied.audio.chrome.message": "In the top navigation bar, click on the icon left to the URL and ensure  'Microphone' permission is checked",

  "perm_denied.video.chrome.message": "In the top navigation bar, click on the icon left to the URL and ensure  'Camera' permission is checked",

  "perm_denied.screenshare.chrome.message": "Under Chrome settings, navigate to 'Privacy and Security > Site Settings > Permissions'. Select 'Screenshare', provide permission and reload this application.",

  "perm_denied.audio.safari.message": "Under Safari settings, navigate to 'Websites > Microphone', provide permission and reload this application.",

  "perm_denied.video.safari.message": "Under Safari settings, navigate to 'Websites > Camera', provide permission and reload this application.",

  "perm_denied.screenshare.safari.message": "Under Safari settings, navigate to 'Websites > Screenshare', provide permission and reload this application.",

  "perm_denied.audio.edge.message": "Under Edge settings, navigate to 'Site Permissions > Microphone', provide permission and reload this application.",

  "perm_denied.video.edge.message": "Under Edge settings, navigate to 'Site Permissions > Camera', provide permission and reload this application.",

  "perm_denied.screenshare.edge.message": "Under Edge settings, navigate to 'Site Permissions > Screenshare', provide permission and reload this application.",

  "perm_denied.audio.microsoft edge.message": "Under Edge settings, navigate to 'Site Permissions > Microphone', provide permission and reload this application.",

  "perm_denied.video.microsoft edge.message": "Under Edge settings, navigate to 'Site Permissions > Camera', provide permission and reload this application.",

  "perm_denied.screenshare.microsoft edge.message": "Under Edge settings, navigate to 'Site Permissions > Screenshare', provide permission and reload this application.",

  "perm_denied.audio.firefox.message": "Under Firefox settings, navigate to 'Privacy and Security > Permissions > Microphone', provide permission and reload this application.",

  "perm_denied.video.firefox.message": "Under Firefox settings, navigate to 'Privacy and Security > Permissions > Camera', provide permission and reload this application.",

  "perm_denied.screenshare.firefox.message": "Under Firefox settings, navigate to 'Privacy and Security > Permissions > Screenshare', provide permission and reload this application.",

  "perm_denied.audio.others.message": "From your browser settings, enable 'Microphone' permissions and reload this application.",

  "perm_denied.video.others.message": "From your browser settings, enable 'Camera' permissions and reload this application.",

  "perm_denied.screenshare.others.message": "From your browser settings, enable 'Screenshare' permissions and reload this application.",

  "perm_sys_denied": "Permission denied by system",

  "perm_sys_denied.audio": "Mic permission denied by system",

  "perm_sys_denied.video": "Camera permission denied by system",

  "perm_sys_denied.screenshare": "Screenshare permission denied by system",

  "perm_sys_denied.audio.macos.message": "Open Apple Menu, Navigate to 'System Settings > Privacy & Security > Microphone'. Allow access to your browser and reload this application.",

  "perm_sys_denied.video.macos.message": "Open Apple Menu, Navigate to 'System Settings > Privacy & Security > Camera'. Allow access to your browser and reload this application.",

  "perm_sys_denied.screenshare.macos.message": "Open Apple Menu, Navigate to 'System Settings > Privacy & Security > Screenshare'. Allow access to your browser and reload this application.",

  "perm_sys_denied.audio.ios.message": "On your iPhone, navigate to 'Settings > Privacy > Microphone', allow access to your browser and reload this application.",

  "perm_sys_denied.video.ios.message": "On your iPhone, navigate to 'Settings > Privacy > Camera', allow access to your browser and reload this application.",

  "perm_sys_denied.screenshare.ios.message": "On your iPhone, navigate to 'Settings > Privacy > Screenshare', allow access to your browser and reload this application.",

  "perm_sys_denied.audio.windows.message": "Go to windows settings, select 'Settings > Privacy > Microphone'. Allow permissions to your browser and reload this application.",

  "perm_sys_denied.video.windows.message": "Go to windows settings, select 'Settings > Privacy > Camera'. Allow permissions to your browser and reload this application.",

  "perm_sys_denied.screenshare.windows.message": "Go to windows settings, select 'Settings > Privacy > Screenshare'. Allow permissions to your browser and reload this application.",

  "perm_sys_denied.audio.android.message": "On your device, navigate to 'Settings > Apps'. Select your browser, allow Microphone permissions and reload this application.",

  "perm_sys_denied.video.android.message": "On your device, navigate to 'Settings > Apps'. Select your browser, allow Camera permissions and reload this application.",

  "perm_sys_denied.screenshare.android.message": "On your device, navigate to 'Settings > Apps'. Select your browser, allow Screenshare permissions and reload this application.",

  "perm_sys_denied.audio.others.message": "Navigate to your system settings. Allow 'Microphone' permissions for your browser and reload this application.",

  "perm_sys_denied.video.others.message": "Navigate to your system settings. Allow 'Camera' permissions for your browser and reload this application.",

  "perm_sys_denied.screenshare.others.message": "Navigate to your system settings. Allow 'Screenshare' permissions for your browser and reload this application.",

  "perm_could_not_start": "Could not capture device.",

  "perm_could_not_start.audio": "Unable to start your Microphone",

  "perm_could_not_start.video": "Unable to start your Camera",

  "perm_could_not_start.screenshare": "Unable to start your Screenshare",

  "perm_could_not_start.audio.message": "Looks like the system could not capture your microphone. Please restart your device or upgrade your browser to fix this.",

  "perm_could_not_start.video.message": "Looks like the system could not capture your camera. Please restart your device or upgrade your browser to fix this.",

  "perm_could_not_start.screenshare.message": "Looks like the system could not capture your screenshare. Please restart your device or upgrade your browser to fix this.",

  "full_screen": "Full Screen",

  "full_screen.exit": "Exit Full Screen",

  "waitlist.header_title": "Waiting",

  "waitlist.body_text": "You are in the waiting room, the host will let you in soon.",

  "waitlist.deny_request": "Deny request",

  "waitlist.accept_request": "Accept request",

  "waitlist.accept_all": "Accept all",

  "stage_request.header_title": "Join Stage Requests",

  "stage_request.deny_request": "Deny request",

  "stage_request.accept_request": "Accept request",

  "stage_request.accept_all": "Accept all",

  "stage_request.deny_all": "Deny all",

  "stage_request.approval_pending": "Pending",

  "stage_request.denied": "Denied",

  "stage_request.request": "Join stage",

  "stage_request.requested": "Requested",

  "stage_request.cancel_request": "Cancel request",

  "stage_request.leave_stage": "Leave stage",

  "stage_request.request_tip": "Request to join the discussion",

  "stage_request.leave_tip": "Leave the stage",

  "stage_request.pending_tip": "Request pending",

  "stage_request.denied_tip": "Rejected request",

  "stage.empty_host": "The stage is empty",

  "stage.empty_host_summary": "You are off stage. You can manage stage request from the participants tab.",

  "stage.empty_viewer": "There is no one on stage",

  "stage.remove_from_stage": "Remove from stage",

  "stage.invited_notification": "has been invited to join stage.",

  "stage.add_to_stage": "Invite to stage",

  "stage.join_title": "Join Stage",

  "stage.join_summary": "You are about to join the stage, your video & audio as shown above will be visible to all participants.",

  "stage.join_cancel": "Cancel",

  "stage.join_confirm": "Join",

  "setup_screen.join_in_as": "Joining as",

  "setup_screen.your_name": "Your name",

  "stage.reconnecting": "Reconnecting...",

  "recording.label": "REC",

  "recording.indicator": "This meeting is being recorded.",

  "recording.started": "This meeting is being recorded.",

  "recording.stopped": "Recording for this meeting has been stopped.",

  "recording.paused": "Recording for this meeting has been paused.",

  "recording.error.start": "Error while starting recording.",

  "recording.error.stop": "Error while stopping recording",

  "recording.error.resume": "Error while resuming recording",

  "recording.start": "Start Recording",

  "recording.stop": "Stop Recording",

  "recording.resume": "Resume Recording",

  "recording.starting": "Starting",

  "recording.stopping": "Stopping",

  "recording.loading": "Loading",

  "recording.idle": "Record",

  "audio_playback": "Play Audio",

  "audio_playback.title": "Allow Audio Playback",

  "audio_playback.description": "In order to play audio properly on your device, click the button below.",

  "breakout_rooms": "Breakout Rooms",

  "breakout_rooms.room_config_header": "Create Breakout",

  "breakout_rooms.join_breakout_header": "Join Breakout",

  "breakout_rooms.empty": "Nobody here yet.",

  "breakout_rooms.delete": "Delete Room",

  "breakout_rooms.switch": "Switch",

  "breakout_rooms.main_room": "Main Room",

  "breakout_rooms.shuffle_participants": "Shuffle Participants",

  "breakout_rooms.deselect": "Deselect",

  "breakout_rooms.selected": "selected",

  "breakout_rooms.num_of_rooms": "No. of Rooms",

  "breakout_rooms.approx": "Approx.",

  "breakout_rooms.participants_per_room": "participants/room",

  "breakout_rooms.division_text": "when equally divided.",

  "breakout_rooms.start_breakout": "Start Breakout",

  "breakout_rooms.close_breakout": "Close Breakout",

  "breakout_rooms.update_breakout": "Update Breakout",

  "breakout_rooms.discard_changes": "Discard Changes",

  "breakout_rooms.room": "Room",

  "breakout_rooms.rooms": "Rooms",

  "breakout_rooms.room_name": "Room Name",

  "breakout_rooms.edit_room_name": "Edit Room Name",

  "breakout_rooms.save_room_name": "Save Room Name",

  "breakout_rooms.add_room": "Add",

  "breakout_rooms.add_room_brief": "Add Room",

  "breakout_rooms.select_all": "Select all",

  "breakout_rooms.unassign_all": "Unassign all",

  "breakout_rooms.assign": "Assign",

  "breakout_rooms.assign_participants": "Assign Participants",

  "breakout_rooms.none_assigned": "No participants assigned yet",

  "breakout_rooms.drag_drop_participants": "Drag and drop participants",

  "breakout_rooms.click_drop_participants": "Click here to assign",

  "breakout_rooms.status.assign_multiple": "Assign multiple participants at once by clicking and selecting them",

  "breakout_rooms.status.select_room": "Select a room to assign",

  "breakout_rooms.ephemeral_status.participants_assigned": "Participants assigned",

  "breakout_rooms.ephemeral_status.participants_assigned_randomly": "Participants assigned randomly",

  "breakout_rooms.ephemeral_status.changes_discarded": "Changes discarded",

  "breakout_rooms.confirm_modal.start_breakout.header": "Start breakout rooms?",

  "breakout_rooms.confirm_modal.start_breakout.content": "Once started, all participants will be moved to their assigned rooms.",

  "breakout_rooms.confirm_modal.start_breakout.cancelText": "No, go back",

  "breakout_rooms.confirm_modal.start_breakout.ctaText": "Yes, start",

  "breakout_rooms.confirm_modal.close_breakout.header": "Close breakout rooms?",

  "breakout_rooms.confirm_modal.close_breakout.content": "All breakout rooms will be closed & participants will be moved back to the main room.",

  "breakout_rooms.confirm_modal.close_breakout.ctaText": "Yes, close breakout",

  "breakout_rooms.move_reason.started_msg": "Starting breakout rooms...",

  "breakout_rooms.move_reason.started_desc": "You are being moved to your assigned room",

  "breakout_rooms.move_reason.closed_msg": "Closing Breakout rooms...",

  "breakout_rooms.move_reason.closed_desc": "You are being moved back to the main room",

  "breakout_rooms.move_reason.switch_room": "Joining Breakout Room...",

  "breakout_rooms.move_reason.switch_main_room": "Joining Main Room...",

  "breakout_rooms.all_assigned": "All participants have been assigned",

  "breakout_rooms.empty_main_room": "No more participants in the main room.",

  "breakout_rooms.leave_confirmation": "Are you sure you want to leave the call? You are in a breakout room, you can join the main room too.",

  "breakout_rooms.leave_confirmation.main_room_btn": "Go back to main room",

  "ai": "AI",

  "ai.meeting_ai": "MeetingAI",

  "ai.home": "Home",

  "ai.transcriptions": "Transcriptions",

  "ai.personal": "Personal",

  "ai.caption_view": "Caption View",

  "ai.chat.tooltip": "This conversation will just be visible to you and not to others in the call.",

  "ai.chat.summarise": "Hey AI, summarise this call",

  "ai.chat.agenda": "Hey AI, what is today's agenda?",

  "search": "Search",

  "search.could_not_find": "Couldn't find a participant with the specified name or ID.",

  "search.empty": "It looks like nobody is here.",

  "end": "End Meeting",

  "end.all": "End meeting for all",

  "ended": "The meeting ended.",

  "ended.rejected": "Your request to join the meeting was denied.",

  "ended.left": "You left the meeting.",

  "ended.kicked": "You were removed from the meeting.",

  "ended.disconnected": "The call ended because the connection was lost.",

  "ended.network": "Please check your internet connection and try again.",

  "ended.unauthorized": "You are not authorized to join this meeting.",

  "network": "Network",

  "network.reconnecting": "Connection lost. Trying to reconnect.",

  "network.delay_extended": "Taking too long to reconnect. Please check your network connection.",

  "network.disconnected": "Could not reconnect. Please leave the meeting and try refreshing the window.",

  "network.leaving": "Automatically leaving the meeting in 10 seconds.",

  "network.restored": "Connection restored",

  "network.delay": "Taking too long to reconnect.",

  "network.lost": "Connection lost",

  "network.lost_extended": "Connection lost. Please check your network connection.",

  "livestream": "Livestream",

  "livestream.indicator": "This meeting is being livestreamed.",

  "livestream.skip": "Skip to Live",

  "livestream.idle": "Waiting to go live.",

  "livestream.starting": "Livestream is starting...",

  "livestream.stopping": "Livestream is stopping...",

  "livestream.waiting_on_manual_ingestion": "Please ingest livestream media.",

  "livestream.error.not_supported": "Player not supported.",

  "livestream.error.not_found": "Playback URL not found.",

  "livestream.error.unknown": "An unknown error occurred.",

  "livestream.error.sync": "Could not sync livestream please try again later.",

  "livestream.error.start": "Error while starting livestream.",

  "livestream.error.stop": "Error while stopping livestream.",

  "livestream.go_live": "Go Live",

  "livestream.end_live": "End Live",

  "livestream.error": "Error",

  "cta.help": "Need help on how to do this?",

  "cta.continue": "Ignore",

  "cta.reload": "Reload",

  "cta.confirmation": "Are you sure?",

  "cta.system_settings": "Open Settings",

  "remote_access.empty": "There are no remote requests, yet.",

  "remote_access.requests": "The following people have requested remote control to your screen share.",

  "remote_access.allow": "Please select whom you want to give access to.",

  "remote_access.grant": "Grant access",

  "remote_access.indicator": "Any plugin or screenshare you switch to will sync the change across the meeting",

  "chat": "Chat",

  "chat.new": "New",

  "chat.max_limit_warning": "Max Character Limit",

  "chat.rate_limit_error": "Please wait before you can send another message",

  "chat.new_channel": "Create new channel",

  "chat.channel_name": "Enter channel name",

  "chat.member_name": "Enter member name",

  "chat.add_members": "Add members",

  "chat.delete_msg": "Delete",

  "chat.edit_msg": "Edit",

  "chat.send_msg": "Send message",

  "chat.send_attachment": "Drop files/images to send",

  "chat.send_img": "Send an image",

  "chat.send_file": "Send a file",

  "chat.send_emoji": "Send an emoji",

  "chat.update_msg": "Update message",

  "chat.channel_members": "Channel Members",

  "chat.img.loading": "Loading image",

  "chat.error.img_not_found": "Image not found",

  "chat.error.empty_results": "Couldn't find a member with the specified name.",

  "chat.img.shared_by": "Shared by",

  "chat.reply": "Reply",

  "chat.message_placeholder": "Message..",

  "chat.click_to_send": "Click to send as message",

  "chat.search_msgs": "Search messages",

  "chat.search_conversations": "Search conversations",

  "chat.start_conversation": "Start a conversation..",

  "chat.empty_search": "No messages found",

  "chat.empty_channel": "Send a message to get started",

  "chat.cancel_upload": "Cancel upload",

  "chat.view_chats": "View chats",

  "chat.everyone": "everyone",

  "chat.pinned_msgs": "Pinned messages",

  "chat.toggle_pinned_msgs": "Toggle pinned messages",

  "date.today": "Today",

  "date.yesterday": "Yesterday",

  "date.sunday": "Sunday",

  "date.monday": "Monday",

  "date.tuesday": "Tuesday",

  "date.wednesday": "Wednesday",

  "date.thursday": "Thursday",

  "date.friday": "Friday",

  "date.saturday": "Saturday",

  "list.empty": "No items found",

  "grid.listening": "Listening",

  "transcript.off": "Turn off Transcripts",

  "transcript.on": "Turn on Transcripts",

  "settings.notification_sound": "Notification sound",

  "settings.microphone_input": "Microphone",

  "settings.speaker_output": "Speaker",

  "settings.mirror_video": "Mirror my Video",

  "settings.camera_off": "Camera is off",

  "dialog.close": "Close dialog",

  "notifications.joined": "just joined",

  "notifications.left": "left",

  "notifications.requesting_to_join_meeting": "is requesting to join the meeting",

  "notifications.requested_to_join_stage": "has requested to join stage",

  "notifications.joined_stage": "has joined stage",

  "notifications.request_to_join_accepted": "Request to join accepted",

  "notifications.request_to_join_rejected": "Request to join rejected",

  "notifications.accept": "Accept",

  "notifications.new_poll_created_by": "New poll created by",

  "notifications.connected_to": "Connected to",

  "notifications.plugin_switched_to": "Plugin switched to",

  "notifications.remote_control_requested": "has requested for remote control",

  "notifications.remote_control_request_sent": "Sent remote control request to",

  "notifications.remote_control_request_accepted": "has granted remote control",

  "notifications.remote_control_granted": "Granted remote control to",

  "notifications.remote_control_terminated": "Existing remote control has been terminated",

  "debugger.troubleshooting.label": "Troubleshooting",

  "debugger.quality.good": "Good",

  "debugger.quality.average": "Average",

  "debugger.quality.poor": "Poor",

  "debugger.stats.bitrate.label": "Bitrate",

  "debugger.stats.bitrate.description": "Data transmitted per second, affects quality and file size.",

  "debugger.stats.packet_loss.label": "Packet Loss",

  "debugger.stats.packet_loss.description": "Amount of data lost during transfer",

  "debugger.stats.jitter.label": "Jitter",

  "debugger.stats.jitter.description": "Variance or fluctuation in latency",

  "debugger.stats.cpu_limitations.label": "CPU Limitations",

  "debugger.stats.cpu_limitations.description": "CPU limitations can impact WebRTC call quality and performance.",

  "debugger.stats.bandwidth_limitations.label": "Bandwidth Limitations",

  "debugger.stats.bandwidth_limitations.description": "Slow internet speeds can degrade video quality.",

  "debugger.audio.label": "Audio",

  "debugger.audio.troubleshooting.label": "Audio Troubleshooting",

  "debugger.audio.messages.generating_report": "Generating report. Please wait for a few seconds.",

  "debugger.audio.messages.enable_media": "Please enable mic to see the report.",

  "debugger.audio.sections.network_media": "Network & Media",

  "debugger.video.label": "Video",

  "debugger.video.troubleshooting.label": "Video Troubleshooting",

  "debugger.video.messages.generating_report": "Generating report. Please wait for a few seconds.",

  "debugger.video.messages.enable_media": "Please enable camera to see the report.",

  "debugger.video.sections.network_media": "Network & Media",

  "debugger.screenshare.label": "Screenshare",

  "debugger.screenshare.troubleshooting.label": "Screenshare Troubleshooting",

  "debugger.screenshare.sections.network_media": "Network & Media",

  "debugger.screenshare.messages.generating_report": "Generating report. Please wait for a few seconds.",

  "debugger.screenshare.messages.enable_media": "Please share screen to see the report.",

  "debugger.system.label": "System",

  "debugger.system.troubleshooting.label": "System Troubleshooting",

  "debugger.system.sections.battery": "Battery",

  "debugger.system.battery.level.label": "Battery Level",

  "debugger.system.battery.level.description": "A low battery charge may result in reduced performance.",

  "debugger.system.battery.charging.label": "Battery Charging Status",

  "debugger.system.battery.charging.description": "A device running on power performs optimally.",

  "debugger.system.battery.charging.is_charging": "Charging",

  "debugger.system.battery.charging.is_not_charging": "Not charging"

}


```

You can override any of these keys in your custom language pack. For example, to translate the interface to Spanish:

JavaScript

```

const spanishLanguagePack = useLanguage({

  ...defaultLanguage,

  leave: "Salir",

  join: "Unirse",

  mute: "Silenciar",

  participants: "Participantes",

  chat: "Chat",

  settings: "Configuración",

});


```

The following table lists all overridable string keys for the Flutter UI Kit. Use these keys in your ARB file to override the corresponding UI text.

| Key                             | Default                                  |
| ------------------------------- | ---------------------------------------- |
| join                            | Join                                     |
| joinInAs                        | Join in as                               |
| enterYourName                   | Enter your name                          |
| micOn                           | Mic On                                   |
| micOff                          | Mic Off                                  |
| leave                           | Leave                                    |
| cancel                          | Cancel                                   |
| areYouSureYouWantToLeaveTheCall | Are you sure you want to leave the call? |
| more                            | more                                     |
| selectAudioDevice               | Select Audio Device                      |
| selectVideoDevice               | Select Video Device                      |
| videoOn                         | Video On                                 |
| videoOff                        | Video Off                                |
| mute                            | Mute                                     |
| unmute                          | Muted                                    |
| unpin                           | Unpin                                    |
| pin                             | Pin                                      |
| kick                            | Kick                                     |
| removeFromStage                 | Remove from stage                        |
| inviteToStage                   | Invite to stage                          |
| screenShare                     | Screen Share                             |
| plugins                         | Plugins                                  |
| createPoll                      | Create Poll                              |
| question                        | Question                                 |
| askAQuestion                    | Ask a question                           |
| options                         | Options                                  |
| enterAnOption                   | Enter an option                          |
| addOption                       | Add an Option                            |
| anonymous                       | Anonymous                                |
| hideResultsBeforeVoting         | Hide Results before voting               |
| questionAndOptionsCantBeEmpty   | Question and options can not be empty!   |
| polls                           | Polls                                    |
| pollBy                          | Poll by                                  |
| vote                            | Vote                                     |
| voted                           | Voted                                    |
| viewVoters                      | View Voters                              |
| stopRecording                   | Stop Recording                           |
| startRecording                  | Start Recording                          |
| muteAll                         | Mute All                                 |
| disableAllVideos                | Disable all videos                       |
| settings                        | Settings                                 |
| rec                             | REC                                      |
| camera                          | Camera                                   |
| microphoneInput                 | Microphone (input)                       |
| chat                            | Chat                                     |
| noMessages                      | No messages                              |
| chatMessagesWillAppearHere      | Chat messages will appear here           |
| file                            | File                                     |
| image                           | Image                                    |
| send                            | Send                                     |
| participants                    | Participants                             |
| waitlisted                      | Waitlisted                               |
| inCall                          | In Call                                  |
| you                             | you                                      |
| turnOffVideo                    | Turn off video                           |
| videoAlreadyOff                 | Video already off                        |
| back                            | Back                                     |
| waitingForTheHostToLetYouIn     | Wait for the host to let you in!         |
| shareScreen                     | Share Screen                             |
| stopSharing                     | Stop Sharing                             |
| endMeetingForAll                | End Meeting for All                      |
| message                         | Message                                  |
| newPollCreated                  | New Poll created                         |
| waitingToGoLive                 | Waiting to go live                       |
| frontCamera                     | Front Camera                             |
| rearCamera                      | Rear Camera                              |
| externalCamera                  | External Camera                          |
| headset                         | Headset                                  |
| speaker                         | Speaker                                  |
| bluetooth                       | Bluetooth                                |
| earpiece                        | Earpiece                                 |

The React Native UI Kit exposes approximately 195 overridable string keys via the `defaultLanguage` object. The table below lists commonly used keys. For the full list, refer to the `defaultLanguage` export from `@cloudflare/realtimekit-react-native-ui`.

| Key                        | Default                                  |
| -------------------------- | ---------------------------------------- |
| join                       | Join                                     |
| leave                      | Leave                                    |
| cancel                     | Cancel                                   |
| leave\_confirmation        | Are you sure you want to leave the call? |
| mic\_on                    | Mic On                                   |
| mic\_off                   | Mic Off                                  |
| video\_on                  | Video On                                 |
| video\_off                 | Video Off                                |
| mute                       | Mute                                     |
| mute\_all                  | Mute all                                 |
| participants               | Participants                             |
| chat                       | Chat                                     |
| settings                   | Settings                                 |
| polls                      | Polls                                    |
| screenshare                | Screen Share                             |
| screenshare.start          | Share Screen                             |
| screenshare.stop           | Stop Sharing                             |
| recording.start            | Start Recording                          |
| recording.stop             | Stop Recording                           |
| end                        | End Meeting                              |
| end.all                    | End meeting for all                      |
| setup\_screen.join\_in\_as | Join in as                               |
| setup\_screen.your\_name   | Your name                                |
| network.reconnecting       | Connection lost. Trying to reconnect...  |
| network.restored           | Connection restored                      |
| ended                      | The meeting ended.                       |
| ended.left                 | You left the meeting.                    |
| ended.kicked               | You were removed from the meeting.       |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/meeting-locale/#page","headline":"Meeting Locale · Cloudflare Realtime docs","description":"Customize text and localize the RealtimeKit UI Kit meeting interface for different languages.","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/meeting-locale/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/meeting-locale/","name":"Meeting Locale"}}]}
```
