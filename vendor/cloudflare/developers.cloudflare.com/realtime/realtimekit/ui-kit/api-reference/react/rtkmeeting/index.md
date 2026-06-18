---
title: RtkMeeting
description: API reference for RtkMeeting component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMeeting

A single component which renders an entire meeting UI. It loads your preset and renders the UI based on it. With this component, you don't have to handle all the states, dialogs and other smaller bits of managing the application.

## Properties

| Property             | Type        | Required | Default          | Description                                                         |
| -------------------- | ----------- | -------- | ---------------- | ------------------------------------------------------------------- |
| applyDesignSystem    | boolean     | ✅        | \-               | Whether to apply the design system on the document root from config |
| config               | UIConfig    | ✅        | \-               | UI Config                                                           |
| gridLayout           | GridLayout1 | ✅        | \-               | Grid layout                                                         |
| iconPack             | IconPack    | ❌        | defaultIconPack  | Icon pack                                                           |
| leaveOnUnmount       | boolean     | ✅        | \-               | Whether participant should leave when this component gets unmounted |
| loadConfigFromPreset | boolean     | ✅        | \-               | Whether to load config from preset                                  |
| meeting              | Meeting     | ✅        | \-               | Meeting object                                                      |
| mode                 | MeetingMode | ✅        | \-               | Fill type                                                           |
| overrides            | Overrides   | ❌        | defaultOverrides | UI Kit Overrides                                                    |
| showSetupScreen      | boolean     | ✅        | \-               | Whether to show setup screen or not                                 |
| size                 | Size        | ✅        | \-               | Size                                                                |
| t                    | RtkI18n     | ❌        | useLanguage()    | Language                                                            |

## Usage Examples

### Basic Usage

```

import { RtkMeeting } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkMeeting />;

}


```

### With Properties

```

import { RtkMeeting } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkMeeting

      applyDesignSystem={true}

      config={defaultUiConfig}

      gridLayout={gridlayout1}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmeeting/#page","headline":"RtkMeeting · Cloudflare Realtime docs","description":"API reference for RtkMeeting component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmeeting/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkmeeting/","name":"RtkMeeting"}}]}
```
