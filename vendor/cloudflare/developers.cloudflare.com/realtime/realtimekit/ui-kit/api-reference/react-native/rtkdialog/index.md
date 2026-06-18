---
title: RtkDialog
description: API reference for RtkDialog component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkDialog

A modal dialog overlay component with optional close button.

## Properties

| Property         | Type              | Required | Default         | Description                      |    |              |
| ---------------- | ----------------- | -------- | --------------- | -------------------------------- | -- | ------------ |
| children         | ReactNode         | ✅        | \-              | Dialog content                   |    |              |
| meeting          | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |    |              |
| onRtkDialogClose | any               | ✅        | \-              | Callback when dialog is closed   |    |              |
| config           | UIConfig          | ❌        | defaultConfig   | UI configuration object          |    |              |
| hideCloseButton  | boolean           | ❌        | false           | Hide the close button            |    |              |
| open             | boolean           | ❌        | \-              | Whether the dialog is visible    |    |              |
| size             | 'lg' \| 'md'      | 'sm'     | 'xl'            | ❌                                | \- | Size variant |
| states           | States            | ❌        | \-              | UI state object                  |    |              |
| iconPack         | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |    |              |
| t                | RtkI18n           | ❌        | \-              | i18n translation function        |    |              |

## Usage Examples

### Basic Usage

```

import { RtkDialog } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkDialog meeting={meeting} onRtkDialogClose={() => setOpen(false)}>

      <Text>Dialog content</Text>

    </RtkDialog>

  );

}


```

### With Properties

```

import { RtkDialog } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkDialog

      meeting={meeting}

      open={isOpen}

      onRtkDialogClose={() => setOpen(false)}

      hideCloseButton={false}

      size="md"

    >

      <Text>Dialog content</Text>

    </RtkDialog>

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkdialog/#page","headline":"RtkDialog · Cloudflare Realtime docs","description":"API reference for RtkDialog component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkdialog/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkdialog/","name":"RtkDialog"}}]}
```
