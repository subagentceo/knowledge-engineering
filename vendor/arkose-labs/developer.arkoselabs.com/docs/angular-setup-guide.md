# Angular Setup Guide

# Overview

This page describes how to use the Arkose Bot Manager's JavaScript API with *single page applications (SPA)* built using Angular 6+.

## Prerequisite: API Request Authentication Private/Public Key Pair

Arkose Labs authenticates your API requests using a private/public key pair retrievable from the [Arkose Labs Command Center](https://developer.arkoselabs.com/docs/arkose-labs-command-center). To get the key pair, go to the left menubar’s **Settings** entry and then to its **Keys** sub-entry as shown below. If you do not have access to the Command Center or do not have your private and public keys, contact your Arkose Sales Rep or Solution Consultant.

You need the private key to authenticate when using the Arkose Verify API. This private key **must NOT** be published on a client facing website, and **must only be used on your Verify API server-side implementation.**

<Image border={false} src="https://files.readme.io/6aa4068-image.png" />

## Loading the API

Your SPA loads the Arkose Bot Manager API via a `<script>` tag. It contains:

* The Arkose Bot Manager API’s URL.
* Your public key from the Arkose Labs Command Center
* As the value of `data-callback`, the name of a JavaScript function that configures the Arkose Bot Manager client API.

Full details about the script tag and function are in the [Client-Side Instructions](https://developer.arkoselabs.com/docs/standard-setup).

Remember to replace `<company>` with your company's personalized Client API URL name, and replace \<YOUR PUBLIC KEY> with the public key supplied to you by Arkose Labs.

**For Enforcement:**

`<script src="https://<company>-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js" data-callback="setupEnforcement" />`

**For Detection:**\
`<script src="https://<company>-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js" data-callback="setupDetect" />`

***

## Implementing Arkose Labs in Angular 6+

We present two examples on how to implement Arkose Labs in Angular 6+, one in modal/lightbox mode and one in inline mode. They are located in Arkose’s GitHub repo at:

* [Angular Example](https://github.com/ArkoseLabs/arkose-examples/tree/main/angular-example)

<Callout icon="⚠️" theme="warn">
  Arkose strongly encourages you to develop in Modal rather than Inline. If you think you have to use Inline, please talk to your Arkose rep about it.
</Callout>

* arkose-modal: Arkose Enforcement Challenge over a Modal mode on an HTML page. To see the Arkose modal version, go to `http://localhost:4200/login/modal`
* arkose-inline: Arkose Enforcement Challenge in Inline mode on an HTML page. To see the Inline version, go to `http://localhost:4200/login/inline`

The example project provides a simple Angular (14) component that wraps around Arkose’s Client API. It contains a `shared` module, which allows for passing in different public keys and mode (modal or inline).

The `Readme.md` file contains instructions for how to load and run both examples. When Arkose Verification/Challenge is completed in a login page, it goes to `http://localhost:4200/dashboard`.

### Step 1: Adding Your Public Key(s) to the Environment

In the example, the start of the component files initializes the component and loads the Arkose script and passes the public key as `environment.arkoseKey`. `/src/environments/ `contains two files:

* `environment.ts `
* `environment.prod.ts `

The difference is whether the `environment.production` value is `false` or `true` respectively.

Shown below is `environment.ts` (the value of `production` is `false`).

```
// Replace <YOUR_PUBLIC_KEY> with the public key that has been setup for your account
export const environment = {
  production: false,
  arkoseKey: '<YOUR_PUBLIC_KEY>'
};
```

We've defined the environment variables in these files such that `arkoseKey` contains the needed public key to run Arkose Bot Manager.

### Adding Multiple Keys to the Environment

Note that you can define multiple public key variables. For example, in the `environment` file, you could also define a `loginArkoseKey` with a different public key variable used for login workflows and a regKey for registration workflows. Shown here is `environment.ts` after adding an additional `loginArkoseKey`:

```
// Replace <YOUR_PUBLIC_KEY_1> and <YOUR_PUBLIC_KEY_2> with the public keys that have been setup for your account
export const environment = {
  production: false,
  arkoseKey: '<YOUR_PUBLIC_KEY_1>',
  loginArkoseKey: '<YOUR_PUBLIC_KEY_2>'
};

```

### Step 2: Injecting the Arkose Labs Script

The next step is to inject the Arkose Labs script into your Angular component. To do this, just copy and paste the `arkose-script.service.ts` code shown below where needed in your application’s code, typically in the `services` folder.

The following code is an example of an Arkose script service (`/src/app/services/arkose-script.service.ts`) injecting the required Arkose script into your Angular component.

<Callout icon="⚠️" theme="warn">
  Remember to replace `<company>` with your company's personalized Client API URL name, and replace `<YOUR_PUBLIC_KEY>` with the public key supplied to you by Arkose Labs. (See [Vanity URLs in the Knowledge Base](https://support.arkoselabs.com/hc/en-us/articles/5745765165971-Vanity-URLs) (support login required) for details)
</Callout>

```javascript
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
declare global {
  interface Window {
    setupEnforcement?: (myEnforcement: any) => void;
    myEnforcement?: any;
  }
}
@Injectable({
  providedIn: 'root',
})
export class ArkoseScriptService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  // Append the JS tag to the Document Body.
  public loadScript(
    renderer: Renderer2,
    publicKey: string,
    nonce?: string
  ): HTMLScriptElement {
    const scriptId = 'arkose-script';
    const currentScript = this.document.getElementById(scriptId);
    if (currentScript) {
      currentScript.remove();
    }
    <!--
    Remember to replace <company> with your company's personalized Client API URL name, 
    and replace <YOUR_PUBLIC_KEY> with the public key supplied to you by Arkose Labs.
    e.g. <script src="//client-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js" data-callback="setupEnforcement" ></script>
  -->
    const script = renderer.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = `https://<company>-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js`;
    script.setAttribute('data-callback', 'setupEnforcement');
    if (nonce) {
      script.setAttribute('data-nonce', nonce);
    }
    renderer.appendChild(this.document.body, script);
    return script;
  }
}
```

**Example: Injecting Arkose Labs into the applications**

For an example of how Arkose Labs is injected into the applications (lines 6-13), see `/src/app/modules/authentication/login-with-modal-arkose/login-with-modal-arkose-component.html`. There is also a `login-with-inline-arkose-component` directory and associated file in the same path.

```html
<form>
    <div class="box">
      <h1>Login</h1>
      <input type="email" name="email" value="example@gmail.com" class="email" />
      <input type="password" name="password" value="abcdxyz" class="password" />
      <arkose
        [publicKey]="publicKey"
        mode="lightbox"
        (onCompleted)="onCompleted($event)"
        (onError)="onError($event)"
        class="mt-5"
      >
      </arkose>
      <ng-container>
        <a>
          <div class="btn" (click)="onSubmit()">Sign In</div>
        </a>
      </ng-container>
    </div>
</form>
```

### Step 3: Callback Functions and Event Emitters

When the script is injected, the passing public key stored on an environment file is also passed. Once the script is loaded, the workflow binds the callback function to a Window object. *See first[Client API: API Callbacks](https://developer.arkoselabs.com/docs/client-api#api-callbacks) for general details about Arkose Client API callbacks, followed by [Callbacks](https://developer.arkoselabs.com/docs/callbacks) for specific descriptions of the various callbacks.*

With Angular, we associate callbacks with event emitters. In `/src/app/modules/shared/arkose/arkose.component.ts`, which defines a shared component for the Angular SPA, callbacks are associated with newly created event emitters such as:

`@Output() onReady = new EventEmitter();`

Also, callbacks are defined and added to the components configuration, using their association with an event emitter. For example:

```javascript
      onReady: () => {
        this.zone.run(() => {
          this.onReady.emit();
        });
      },
```

See the full `/src/app/modules/shared/arkose/arkose.component.ts` below, which includes callback functions and event emitters.

```typescript
/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  NgZone,
  OnDestroy,
  Input,
} from '@angular/core';
import { ArkoseScriptService } from '../../../services/arkose-script.service';

@Component({
  selector: 'arkose',
  templateUrl: './arkose.component.html',
})
export class ArkoseComponent implements OnInit, OnDestroy {
  @Input() public publicKey: string;
  @Input() public mode?: 'lightbox' | 'inline';
  @Input() public selector?: string;
  @Output() onReady = new EventEmitter();
  @Output() onShown = new EventEmitter();
  @Output() onShow = new EventEmitter();
  @Output() onSuppress = new EventEmitter();
  @Output() onCompleted = new EventEmitter();
  @Output() onReset = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onError = new EventEmitter();
  @Output() onFailed = new EventEmitter();

  constructor(
    private renderer: Renderer2,
    private arkoseScriptService: ArkoseScriptService,
    private zone: NgZone
  ) {
    this.publicKey = '';
  }

  ngOnInit(): void {
    // This injects the Arkose script into the angular dom
    const scriptElement = this.arkoseScriptService.loadScript(
      this.renderer,
      this.publicKey
    );

    // This will inject required html and css after the Arkose script is properly loaded
    scriptElement.onload = () => {
      console.log('Arkose API Script loaded');
      window.setupEnforcement = this.setupEnforcement.bind(this);
    };

    // If there is an error loading the Arkose script this callback will be called
    scriptElement.onerror = () => {
      console.log('Could not load the Arkose API Script!');
    };
  }

  ngOnDestroy(): void {
    if (window.myEnforcement) {
      delete window.myEnforcement;
    }
    if (window.setupEnforcement) {
      delete window.setupEnforcement;
    }
  }

  // This is the function that will be called after the Arkose script has loaded
  setupEnforcement = (myEnforcement: any) => {
    window.myEnforcement = myEnforcement;
    window.myEnforcement.setConfig({
      selector: this.selector && `#${this.selector}`,
      mode: this.mode,
      onReady: () => {
        this.zone.run(() => {
          this.onReady.emit();
        });
      },
      onShown: () => {
        this.zone.run(() => {
          this.onShown.emit();
        });
      },
      onShow: () => {
        this.zone.run(() => {
          this.onShow.emit();
        });
      },
      onSuppress: () => {
        this.zone.run(() => {
          this.onSuppress.emit();
        });
      },
      onCompleted: (response: any) => {
        if (response.token) {
          this.zone.run(() => {
            this.onCompleted.emit(response.token);
          });
        }
      },
      onReset: () => {
        this.zone.run(() => {
          this.onReset.emit();
        });
      },
      onHide: () => {
        this.zone.run(() => {
          this.onHide.emit();
        });
      },
      onError: (response: any) => {
        this.zone.run(() => {
          this.onError.emit(response);
        });
      },
      onFailed: (response: any) => {
        this.zone.run(() => {
          this.onFailed.emit(response);
        });
      },
    });
  };
}
```

In particular, note the definition of `onCompleted()`, where we handle passing the response token to the Arkose Verify API:

```javascript
onCompleted: (response: any) => {
        if (response.token) {
          this.zone.run(() => {
            this.onCompleted.emit(response.token);
          });
        }
      },
```

***

## Summary

To use Arkose Bot Manager in an Angular SPA, you need to do the following as part of the SPA’s definition.

1. Place all Arkose public keys you need to use (one per workflow) in environment variables.
2. Cut and paste the `arkose-script.service.ts` code where needed in your application’s code, typically in `services` folder.
3. Write a file that associates the callback functions with event emitters and defines what they do when called. e.g. `arkose.component.ts`