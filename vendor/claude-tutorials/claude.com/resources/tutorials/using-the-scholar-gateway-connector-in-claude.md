Using the Scholar Gateway Connector in Claude | Claude!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);.anti-flicker, .anti-flicker \* {visibility: hidden !important; opacity: 0 !important;}\[data-wf-hidden-variation\], \[data-wf-hidden-variation\] \* { display: none !important; }         html:not(.gsap-not-found) \[data-prevent-flicker='true'\] { visibility: hidden; } .line-mask, .word-mask, .char-mask { padding-block: 0.1em; margin-block: -0.1em; }

\[data-prevent-flicker='true'\] { visibility: visible !important; }

.transition\_wrap { display: block; } // Hide the transition\_wrap in Webflow preview mode w/ custom code enabled if (window.location.hostname.includes('.canvas.webflow.com')) { document.write('<style>.transition\_wrap{display:none!important}\[data-prevent-flicker="true"\]{visibility:visible!important}</style>'); }

:root { --grid-breakout: \[full-start\] minmax(0, 1fr) \[content-start\] repeat(var(--\_grid---column-count), minmax(0, var(--\_grid---column-width))) \[content-end\] minmax(0, 1fr) \[full-end\]; --grid-breakout-single: \[full-start\] minmax(0, 1fr) \[content-start\] minmax(0, calc(100% - var(--site--margin) \* 2)) \[content-end\] minmax(0, 1fr) \[full-end\]; } ::before, ::after { box-sizing: border-box; } .w-embed:before, .w-embed:after, .w-richtext:before, .w-richtext:after { content: unset; } html { background-color: var(--\_theme---background); } button { background-color: unset; padding: unset; text-align: inherit; } button:not(:disabled) { cursor: pointer; } video { width: 100%; object-fit: cover; } /\* remove padding of empty element \*/ .wf-empty { padding: 0; } svg { max-width: 100%; } @media (prefers-color-scheme: light) { option { color: black; } } img::selection { background: transparent; } /\* Typography \*/ body { text-transform: var(--\_text-style---text-transform); font-smoothing: antialiased; -webkit-font-smoothing: antialiased; } /\* Clear Defaults \*/ a:not (\[class\]) { text-decoration: underline;} \[class~="u-rich-text"\] a, \[class~="u-rich-text-cs"\] a, \[class~="u-rich-text-blog"\] a, \[class~="u-rich-text-tutorials"\] a, a.u-rich-text, \[class~="command\_instruction"\] a { transition: color .15s ease-out, text-decoration-color .15s ease-out; text-underline-offset: 3px; text-decoration: underline; color: currentcolor; text-decoration-color: var(--\_theme---border-primary); } \[class~="u-rich-text"\] a:hover, \[class~="u-rich-text-cs"\] a:hover, \[class~="u-rich-text-blog"\] a:hover, \[class~="u-rich-text-tutorials"\] a:hover, a.u-rich-text:hover, \[class~="command\_instruction"\] a:hover { text-decoration-color: var(--\_theme---foreground-primary); color: var(--\_theme---foreground-primary); } h1,h2,h3,h4,h5,h6,p,blockquote,label { font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit; letter-spacing: inherit; text-transform: inherit; text-wrap: inherit; margin-top: 0; margin-bottom: 0; } select:has(option\[value=""\]:checked) { color: color-mix(in lab, currentcolor 60%, transparent) } /\* Selection Color \*/ ::selection { background-color: var(--\_theme---selection--background); color: var(--\_theme---selection--text); } /\* Margin Trim \*/ :is(.u-margin-trim,.u-rich-text) > :not(:not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim) ~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim)), :is(.u-margin-trim,.u-rich-text) > :not(:not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim) ~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim)).u-display-contents > :first-child { margin-top: 0; } :is(.u-margin-trim,.u-rich-text) > :not(:has(~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim))), :is(.u-margin-trim,.u-rich-text) > :not(:has(~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim))).u-display-contents > :last-child { margin-bottom: 0; } /\* Line Height Trim \*/ :is(h1,h2,h3,h4,h5,h6,p):not(.u-text-trim-off,:has(\[class\*="u-text-style-"\]))::before, \[class\*="u-text-style-"\]:not(.u-text-trim-off,:has(h1,h2,h3,h4,h5,h6,p))::before { content: ""; display: table; margin-bottom: calc(-0.5lh + var(--\_text-style---trim-top)); } :is(h1,h2,h3,h4,h5,h6,p):not(.u-text-trim-off,:has(\[class\*="u-text-style-"\]))::after, \[class\*="u-text-style-"\]:not(.u-text-trim-off,:has(h1,h2,h3,h4,h5,h6,p))::after { content: ""; display: table; margin-bottom: calc(-0.5lh + var(--\_text-style---trim-bottom)); } /\* Rich Text Links \*/ .w-richtext a { position: relative; z-index: 4; } /\* Line Clamp \*/ .u-line-clamp-1, .u-line-clamp-2, .u-line-clamp-3, .u-line-clamp-4 { -webkit-line-clamp: 1; -webkit-box-orient: vertical; } .u-line-clamp-2 { -webkit-line-clamp: 2; } .u-line-clamp-3 { -webkit-line-clamp: 3; } .u-line-clamp-4 { -webkit-line-clamp: 4; } /\* Child Contain \*/ .u-child-contain > \* { width: 100%; max-width: inherit !important; margin-inline: 0 !important; margin-top: 0 !important; } /\* Hide \*/ .u-hide-if-empty:empty, .u-hide-if-empty:not(:has(> :not(.w-condition-invisible))), .u-hide-if-empty-cms:not(:has(.w-dyn-item)), .u-embed-js, .u-embed-css { display: none !important; } /\* Focus State \*/ a, button, :where(\[tabindex\]), \[data-outline\] { outline-offset: var(--focus--offset-outer); } a:focus-visible, button:focus-visible, \[tabindex\]:focus-visible, label:has(input:focus-visible) \[data-outline\] { outline-color: color-mix(in srgb, var(--\_button-style---border) 50%, transparent); outline-width: var(--focus--width); outline-style: solid; } /\* Global / Clickable Component \*/ .wf-design-mode .clickable\_wrap { z-index: 0; } .clickable\_wrap a\[href="#"\] { display: none; } .clickable\_wrap a\[href="#"\] ~ button { display: block; } /\* Responsive Above \*/ @container threshold-large (width >= 62em) { .u-order-unset-above { order: unset !important; } .u-all-unset-above { all: unset !important; } .u-grid-below { display: flex !important; } .u-max-width-unset-above { max-width: unset !important; } .u-width-unset-above { width: unset !important; } .u-hide-above { display: none !important; } } @container threshold-medium (width >= 48em) { .u-order-unset-above { order: unset !important; } .u-all-unset-above { all: unset !important; } .u-grid-below { display: flex !important; } .u-max-width-unset-above { max-width: unset !important; } .u-width-unset-above { width: unset !important; } .u-hide-above { display: none !important; } } @container threshold-small (width >= 30em) { .u-order-unset-above { order: unset !important; } .u-all-unset-above { all: unset !important; } .u-grid-below { display: flex !important; } .u-max-width-unset-above { max-width: unset !important; } .u-width-unset-above { width: unset !important; } .u-hide-above { display: none !important; } } /\* Responsive Below \*/ @container threshold-large (width < 62em) { .u-order-unset-below { order: unset !important; } .u-all-unset-below { all: unset !important; } .u-grid-above { display: flex !important; } .u-max-width-unset-below { max-width: unset !important; } .u-width-unset-below { width: unset !important; } .u-alignment-unset-below { --\_alignment---direction: start; align-self: start; } .u-hide-below { display: none !important; } } @container threshold-medium (width < 48em) { .u-order-unset-below { order: unset !important; } .u-all-unset-below { all: unset !important; } .u-grid-above { display: flex !important; } .u-max-width-unset-below { max-width: unset !important; } .u-width-unset-below { width: unset !important; } .u-alignment-unset-below { --\_alignment---direction: start; align-self: start; } .u-hide-below { display: none !important; } } @container threshold-small (width < 30em) { .u-order-unset-below { order: unset !important; } .u-all-unset-below { all: unset !important; } .u-grid-above { display: flex !important; } .u-max-width-unset-below { max-width: unset !important; } .u-width-unset-below { width: unset !important; } .u-alignment-unset-below { --\_alignment---direction: start; align-self: start; } .u-hide-below { display: none !important; } } /\* Form Radio \*/ .form\_main\_radio\_label:has(input:checked) .form\_main\_radio\_circle\_inner { opacity: 1; } /\* Form Checkbox \*/ .form\_main\_checkbox\_label:has(input:checked) .form\_main\_checkbox\_box { background-color: currentColor; border-color: currentColor; } .form\_main\_checkbox\_label:has(input:checked) .form\_main\_checkbox\_icon { opacity: 1; } /\* State Manager \*/ \[data-state\] { --\_state---true: 1; --\_state---false: 0; } .is-active, \[data-state~="checked"\]:is(:checked, :has(:checked)), \[data-state~="current"\]:is(.w--current, :has(.w--current)), \[data-state~="open"\]:is(.w--open, :has(.w--open)), \[data-state~="expanded"\]:is(\[aria-expanded="true"\], :has(\[aria-expanded="true"\])), \[data-state~="external"\]:is(\[target="\_blank"\], :has(\[target="\_blank"\])) { --\_state---true: 0; --\_state---false: 1; } .wf-design-mode \[data-trigger~="preview"\], \[data-trigger~="focus"\]:is(:focus-visible, :has(:focus-visible)), \[data-trigger~="group"\]:has(\[data-trigger~="focus-other"\]:focus-visible, \[data-trigger~="focus-other"\] :focus-visible) \[data-trigger~="focus-other"\]:not(:focus-visible, :has(:focus-visible)) { --\_trigger---on: 0; --\_trigger---off: 1; } @media (hover: hover) { \[data-button\]:hover, \[data-trigger~="hover"\]:is(a:hover,button:hover,:has(a:hover,button:hover)), \[data-trigger~="group"\]:has(\[data-trigger~="hover-other"\]:hover) \[data-trigger~="hover-other"\]:not(:hover) { --\_trigger---on: 0; --\_trigger---off: 1; } \[data-trigger~="hover-other"\]:hover { --\_trigger---on: 1 !important; --\_trigger---off: 0 !important; } } @media (hover: none) { \[data-trigger~="mobile"\] { --\_trigger---on: 0; --\_trigger---off: 1; } }

code, kbd, pre, samp { font-family: var(--\_typography---font--mono-family); } body \* { scrollbar-width: none; /\* Firefox \*/ -ms-overflow-style: none; /\* IE/Edge Legacy \*/ } body \*::-webkit-scrollbar { display: none; /\* Unreliable \*/ width: 0px; /\* WebKit/Blink \*/ } @media (prefers-color-scheme: dark) { body, .u-theme-ivory, \[data-wf--section--theme='ivory'\] { --\_theme---background-primary: var(--swatch--gray-950); --\_theme---background-secondary: var(--swatch--gray-900); --\_theme---background-tertiary: var(--swatch--gray-850); --\_theme---border-primary: var(--swatch--gray-600); --\_theme---border-secondary: var(--swatch--gray-700); --\_theme---border-tertiary: var(--swatch--gray-750); --\_theme---foreground-primary: var(--swatch--gray-050); --\_theme---foreground-secondary: var(--swatch--gray-400); --\_theme---foreground-tertiary: var(--swatch--gray-500); --\_theme---pictogram-accent: var(--swatch--gray-750); --\_theme---button-primary--background: var(--swatch--gray-050); --\_theme---button-primary--text: var(--swatch--gray-950); --\_theme---button-primary--border: var(--swatch--transparent); --\_theme---button-primary--icon: var(--\_theme---button-primary--text); --\_theme---button-primary--background-hover: var(--\_theme---button-primary--background); --\_theme---button-primary--text-hover: var(--\_theme---button-primary--text); --\_theme---button-primary--border-hover: var(--\_theme---button-primary--border); --\_theme---button-primary--icon-hover: var(--\_theme---background-primary); --\_theme---button-secondary--background: var(--swatch--gray-750); --\_theme---button-secondary--text: var(--swatch--gray-050); --\_theme---button-secondary--border: var(--\_theme---border-secondary); --\_theme---button-secondary--icon: var(--\_theme---button-secondary--text); --\_theme---button-secondary--background-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--text-hover: var(--\_theme---button-secondary--text); --\_theme---button-secondary--border-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--icon-hover: var(--\_theme---foreground-secondary); --\_theme---button-tertiary--background: var(--\_theme---background-primary); --\_theme---button-tertiary--text: var(--swatch--gray-050); --\_theme---button-tertiary--border: var(--\_theme---border-secondary); --\_theme---button-tertiary--icon: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--background-hover: var(--\_theme---button-tertiary--background); --\_theme---button-tertiary--text-hover: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--border-hover: var(--\_theme---button-tertiary--border); --\_theme---button-tertiary--icon-hover: var(--\_theme---foreground-primary); --\_theme---error-text: #df6666; --\_theme---heroes-accent: #c46849; --\_theme---white: var(--\_theme---background-primary); } .u-theme-white, \[data-wf--section--theme='white'\] { --\_theme---background-primary: var(--swatch--gray-850); --\_theme---background-secondary: var(--swatch--gray-800); --\_theme---background-tertiary: var(--swatch--gray-750); --\_theme---border-primary: var(--swatch--gray-550); --\_theme---border-secondary: var(--swatch--gray-650); --\_theme---border-tertiary: var(--swatch--gray-700); --\_theme---foreground-primary: var(--swatch--gray-050); --\_theme---foreground-secondary: var(--swatch--gray-350); --\_theme---foreground-tertiary: var(--swatch--gray-450); --\_theme---pictogram-accent: var(--swatch--gray-700); --\_theme---button-primary--background: var(--swatch--gray-050); --\_theme---button-primary--text: var(--swatch--gray-950); --\_theme---button-primary--border: var(--swatch--transparent); --\_theme---button-primary--icon: var(--\_theme---button-primary--text); --\_theme---button-primary--background-hover: var(--\_theme---button-primary--background); --\_theme---button-primary--text-hover: var(--\_theme---button-primary--text); --\_theme---button-primary--border-hover: var(--\_theme---button-primary--border); --\_theme---button-primary--icon-hover: var(--\_theme---background-primary); --\_theme---button-secondary--background: var(--swatch--gray-700); --\_theme---button-secondary--text: var(--swatch--gray-050); --\_theme---button-secondary--border: var(--\_theme---border-secondary); --\_theme---button-secondary--icon: var(--\_theme---button-secondary--text); --\_theme---button-secondary--background-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--text-hover: var(--\_theme---button-secondary--text); --\_theme---button-secondary--border-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--icon-hover: var(--\_theme---foreground-secondary); --\_theme---button-tertiary--background: var(--\_theme---background-primary); --\_theme---button-tertiary--text: var(--swatch--gray-050); --\_theme---button-tertiary--border: var(--\_theme---border-secondary); --\_theme---button-tertiary--icon: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--background-hover: var(--\_theme---button-tertiary--background); --\_theme---button-tertiary--text-hover: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--border-hover: var(--\_theme---button-tertiary--border); --\_theme---button-tertiary--icon-hover: var(--\_theme---foreground-primary); --\_theme---error-text: #df6666; --\_theme---heroes-accent: #c46849; --\_theme---white: var(--\_theme---background-primary); } .u-theme-neutral-1, \[data-wf--section--theme='neutral-1'\] { --\_theme---background-primary: var(--swatch--gray-800); --\_theme---background-secondary: var(--swatch--gray-750); --\_theme---background-tertiary: var(--swatch--gray-700); --\_theme---border-primary: var(--swatch--gray-500); --\_theme---border-secondary: var(--swatch--gray-600); --\_theme---border-tertiary: var(--swatch--gray-650); --\_theme---foreground-primary: var(--swatch--gray-050); --\_theme---foreground-secondary: var(--swatch--gray-300); --\_theme---foreground-tertiary: var(--swatch--gray-400); --\_theme---pictogram-accent: var(--swatch--gray-650); --\_theme---button-primary--background: var(--swatch--gray-050); --\_theme---button-primary--text: var(--swatch--gray-950); --\_theme---button-primary--border: var(--swatch--transparent); --\_theme---button-primary--icon: var(--\_theme---button-primary--text); --\_theme---button-primary--background-hover: var(--\_theme---button-primary--background); --\_theme---button-primary--text-hover: var(--\_theme---button-primary--text); --\_theme---button-primary--border-hover: var(--\_theme---button-primary--border); --\_theme---button-primary--icon-hover: var(--\_theme---background-primary); --\_theme---button-secondary--background: var(--swatch--gray-650); --\_theme---button-secondary--text: var(--swatch--gray-050); --\_theme---button-secondary--border: var(--\_theme---border-secondary); --\_theme---button-secondary--icon: var(--\_theme---button-secondary--text); --\_theme---button-secondary--background-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--text-hover: var(--\_theme---button-secondary--text); --\_theme---button-secondary--border-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--icon-hover: var(--\_theme---foreground-secondary); --\_theme---button-tertiary--background: var(--\_theme---background-primary); --\_theme---button-tertiary--text: var(--swatch--gray-050); --\_theme---button-tertiary--border: var(--\_theme---border-secondary); --\_theme---button-tertiary--icon: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--background-hover: var(--\_theme---button-tertiary--background); --\_theme---button-tertiary--text-hover: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--border-hover: var(--\_theme---button-tertiary--border); --\_theme---button-tertiary--icon-hover: var(--\_theme---foreground-primary); --\_theme---error-text: #df6666; --\_theme---heroes-accent: #c46849; --\_theme---white: var(--\_theme---background-primary); } .logo\_light { display: none; } .logo\_dark { display: block; } .illustration\_light { display: none; } .illustration\_dark { display: block; } } @media (prefers-color-scheme: light) { .logo\_light { display: block; } .logo\_dark { display: none; } .illustration\_light { display: block; } .illustration\_dark { display: none; } } .u-text-font-mono { --\_text-style---trim-top: var(--\_typography---font--mono-text-trim-top); --\_text-style---trim-bottom: var(--\_typography---font--mono-text-trim-bottom); } .w-richtext li > ul, .w-richtext li > ol { margin-top: 0.75rem; } .u-checklist ul { list-style: none; margin: 0; padding: 0; } .u-checklist ul li { position: relative; padding-left: 2rem; } .u-checklist ul li::before { content: ''; position: absolute; left: 0; top: 0.1em; width: 1.5rem; height: 1.5rem; background-repeat: no-repeat; background-position: center; background-size: contain; background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M18.226%206.13068C18.4439%205.95655%2018.7615%205.95361%2018.9842%206.13888C19.2067%206.32458%2019.2604%206.63728%2019.1283%206.88304L19.0604%206.98382L10.0602%2017.784C9.95233%2017.9133%209.7949%2017.9908%209.62665%2017.9984C9.45844%2018.0059%209.29454%2017.9429%209.17547%2017.8238L4.97541%2013.6237L4.89806%2013.53C4.7446%2013.2971%204.7705%2012.9802%204.97541%2012.7753C5.18032%2012.5704%205.49726%2012.5445%205.73011%2012.698L5.82386%2012.7753L9.55868%2016.5101L18.1393%206.21506L18.226%206.13068Z%22%20fill%3D%22%235E5D59%22/%3E%3C/svg%3E'); } \[class^='card\_'\]\[class$='\_wrap'\] .clickable\_wrap.u-cover-absolute .clickable\_link, \[class^='card\_'\]\[class$='\_wrap'\] .clickable\_wrap.u-cover-absolute .clickable\_btn { outline-offset: var(--focus--offset-inner); } textarea\[data-autogrow\] { overflow-y: hidden; resize: none; height: 1.75rem; min-height: 0; } .btn\_main\_wrap::hover, .btn\_small\_wrap::hover, .btn\_tiny\_wrap::hover, .button\_toggle\_wrap::hover, .btn\_icon\_main\_wrap::hover, .btn\_icon\_small\_wrap::hover, .btn\_icon\_tiny\_wrap::hover { transition: /\* Transition to click/active \*/ box-shadow ease-in-out 100ms, background ease-in-out 100ms, color ease-in-out 50ms; } .btn\_main\_wrap::active, .btn\_small\_wrap::active, .btn\_tiny\_wrap::active, .button\_toggle\_wrap::active, .btn\_icon\_main\_wrap::active, .btn\_icon\_small\_wrap::active, .btn\_icon\_tiny\_wrap::active { transition: /\* Transition to click/active \*/ box-shadow ease-in-out 50ms, background ease-in-out 50ms, color ease-in-out 25ms; } .card\_cs\_grid\_img img { max-width: 60%; max-height: 60%; } @container viewport (width < 30em) { \[data-wf--grid--column-count='4'\]:has(.card\_feature\_wrap) .c-grid { --\_column-count---value: 1; } } @container viewport (min-width: 30em) and (max-width: 62em) { \[data-wf--grid--column-count='4'\]:has(.card\_feature\_wrap) .c-grid { --\_column-count---value: 2; } } /\* Mods for spacing and visibility of embed in accordian content used for schema \*/ .accordion\_content\_text p:has(+ .w-embed.w-script) { margin-bottom: 0; } /\* Absolute inner SVG of lottie to prevent page jump \*/ .heroes\_lottie\_component svg { position: absolute; top: 0; left: 0; } /\* Sticky scroll \*/ @media screen and (min-width: 992px) { .sticky\_image\_link\_wrap:has(.sticky\_image\_link.w--current) { opacity: 1; width: calc((100% - var(--\_grid---gutter)) \* (6 / 12)); } } @media screen and (max-width: 767px) { .c-grid:last-child .sticky\_image\_block, .sticky\_image\_block:last-child { padding: 0; } .c-grid:last-child .sticky\_image\_wrap { margin-bottom: 0; } } #send, #threads, #get-help, #collaborate { display: block; /\* or grid, flex - anything but contents \*/ } /\* Removes padding from the last-item in the Download page cards \*/ .download\_card\_bar\_wrap:last-child { padding-bottom: 0; }

/\* Select text below clickable overlay \*/ html.wf-design-mode .clickable\_wrap { pointer-events: none; }

document.addEventListener("DOMContentLoaded", function () { // ---------------- Config ---------------- const EDGE\_PADDING = 16; // >= 1rem from edges const OFFSET\_Y = 10; // gap under trigger const DIM\_OPACITY = 0.3; const DIM\_EASE\_MS = 350; const CLOSE\_DELAY = 120; const isCoarse = () => matchMedia("(hover: none), (pointer: coarse)").matches; // ---------------- Bubble (single instance) ---------------- function ensureBubble(){ let el = document.querySelector(".tt-bubble"); if (el) return el; el = document.createElement("div"); el.className = "tt-bubble u-theme-white"; el.setAttribute("role","tooltip"); el.setAttribute("aria-hidden","true"); el.style.left = "0px"; el.style.top = "0px"; el.innerHTML = \` <div class="tt-inner"> <div class="tt-h" id="tt-title"></div> <p class="tt-b" id="tt-body"></p> <button type="button" class="tt-close" aria-label="Close">×</button> </div>\`; document.body.appendChild(el); return el; } const bubble = ensureBubble(); const elH = bubble.querySelector("#tt-title"); const elB = bubble.querySelector("#tt-body"); const elClose = bubble.querySelector(".tt-close"); // ---------------- Parse \[\[term|heading|body\]\] anywhere ---------------- const TOKEN\_RE = /\\\[\\\[(\[^|\\\]\]+)\\|(\[^|\\\]\]+)\\|(\[^\\\]\]+)\\\]\\\]/g; const BLOCK\_SKIP = new Set(\["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT","SELECT","CODE","PRE","TEMPLATE","IFRAME"\]); function shouldSkipTextNode(n){ let el = n.parentElement; while (el){ if (BLOCK\_SKIP.has(el.tagName) || el.isContentEditable) return true; el = el.parentElement; } return false; } const walker = document.createTreeWalker(document.body, NodeFilter.SHOW\_TEXT); const textNodes = \[\]; while (walker.nextNode()){ const n = walker.currentNode; if (!n.nodeValue || shouldSkipTextNode(n)) continue; if (TOKEN\_RE.test(n.nodeValue)) textNodes.push(n); TOKEN\_RE.lastIndex = 0; } textNodes.forEach(node => { const frag = document.createDocumentFragment(); const insideLink = !!node.parentElement.closest("a"); let text = node.nodeValue, last = 0; TOKEN\_RE.lastIndex = 0; let m; while ((m = TOKEN\_RE.exec(text))){ if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index))); const term=m\[1\].trim(), heading=m\[2\].trim(), body=m\[3\].trim(); const t = insideLink ? document.createElement("span") : document.createElement("button"); if (insideLink){ t.setAttribute("role","button"); t.setAttribute("tabindex","0"); } else { t.type="button"; } t.className="tt-trigger"; t.textContent=term; t.setAttribute("data-tt-h", heading); t.setAttribute("data-tt-b", body); t.setAttribute("aria-haspopup","dialog"); t.setAttribute("aria-expanded","false"); frag.appendChild(t); last = TOKEN\_RE.lastIndex; } if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last))); node.parentNode.replaceChild(frag, node); }); // ---------------- State ---------------- let current = null; let hoverCount = 0; let closeTimer = null; // Dimming bookkeeping let dimCtx = null; // { container, dimEls:\[\], wrappedTexts:\[\], pathEls:\[\] } // ---------------- Find the correct "text element" container ---------------- function findTextContainer(trigger){ // Prefer common RTE wrappers let el = trigger.closest(".w-richtext, .rich-text, .rte, \[data-rte\]"); if (el) return el; // Otherwise climb until we find an ancestor that contains multiple block nodes anywhere inside. const BLOCK\_SEL = "p,h1,h2,h3,h4,h5,h6,ul,ol,li,blockquote,pre,figure,figcaption"; el = trigger.parentElement; while (el && el !== document.body){ const blockCount = el.querySelectorAll(BLOCK\_SEL).length; if (blockCount >= 2) return el; el = el.parentElement; } // Fallback: nearest non-inline container el = trigger.parentElement || document.body; while (el && el !== document.body){ const d = getComputedStyle(el).display; if (d !== "inline" && d !== "contents") return el; el = el.parentElement; } return document.body; } // Utility: child of \`ancestor\` that contains \`target\` (direct child) function directChildContaining(ancestor, target){ for (const ch of ancestor.children){ if (ch === target || ch.contains(target)) return ch; } return null; } function getElementTarget(e) { // If target is already an Element, use it if (e.target instanceof Element) return e.target; // Otherwise, walk the composed/path for the first Element const path = (typeof e.composedPath === 'function') ? e.composedPath() : \[\]; for (const n of path) if (n instanceof Element) return n; return null; } // ---------------- Dim everything except the trigger branch (sibling branches only) ---------------- function dimAllOtherBranches(container, trigger){ undim(); // clear previous const dimEls = \[\]; const wrappedTexts = \[\]; const pathEls = \[\]; // Build ELEMENT-only path \[container -> ... -> trigger\] const path = \[\]; for (let el = trigger; el && el !== container; el = el.parentElement) path.push(el); path.push(container); path.reverse(); // At each ancestor level, find the \*direct\* child that leads to the trigger for (let i = 0; i < path.length; i++){ const anc = path\[i\]; const branchChild = (i < path.length - 1) ? directChildContaining(anc, path\[i+1\]) : path\[i\]; // last step is the trigger itself // Fade element siblings (whole branches) for (const child of anc.children){ if (child === branchChild) continue; // keep the path branch crisp // Never fade any element that is (or contains) the trigger if (child === trigger || child.contains(trigger)) continue; child.style.transition = \`opacity ${DIM\_EASE\_MS}ms ease\`; child.style.opacity = String(DIM\_OPACITY); dimEls.push(child); } // Fade TEXT NODE siblings directly under this ancestor (outside branchChild) anc.childNodes.forEach(node => { if (node.nodeType !== 3) return; // text only if (!node.nodeValue || !node.nodeValue.trim()) return; // If this text node sits inside branchChild, skip if (branchChild && branchChild.contains && branchChild.contains(node)) return; const span = document.createElement("span"); span.style.transition = \`opacity ${DIM\_EASE\_MS}ms ease\`; span.style.opacity = String(DIM\_OPACITY); span.textContent = node.nodeValue; node.parentNode.replaceChild(span, node); wrappedTexts.push(span); }); // Keep a reference to the path elements (so we can explicitly restore opacity if needed) if (anc && anc.nodeType === 1) pathEls.push(anc); } // Hard-guard: explicitly set opacity:1 on the entire path to neutralize any inherited fade pathEls.forEach(el => { el.style.opacity = "1"; }); dimCtx = { container, dimEls, wrappedTexts, pathEls }; } function undim(){ if (!dimCtx) return; const { dimEls, wrappedTexts, pathEls } = dimCtx; // Animate back dimEls.forEach(el => { el.style.transition = \`opacity ${DIM\_EASE\_MS}ms ease\`; el.style.opacity = "1"; // remove inline style after the animation so we don't override site CSS setTimeout(() => { if (el) el.style.opacity = ""; }, DIM\_EASE\_MS + 50); }); wrappedTexts.forEach(span => { span.style.transition = \`opacity ${DIM\_EASE\_MS}ms ease\`; span.style.opacity = "1"; span.addEventListener("transitionend", () => { if (!span.parentNode) return; span.parentNode.replaceChild(document.createTextNode(span.textContent || ""), span); }, { once:true }); }); // Clear hard-guard on path pathEls.forEach(el => { if (el) el.style.opacity = ""; }); dimCtx = null; } // ---------------- Positioning (centered, edge-aware, flip) ---------------- function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); } function measureBubbleForPlacement(){ const wasOpen = bubble.classList.contains("is-open"); if (!wasOpen){ bubble.style.visibility="hidden"; bubble.classList.add("is-open"); } const rect = bubble.getBoundingClientRect(); if (!wasOpen){ bubble.classList.remove("is-open"); bubble.style.visibility=""; } return { w: rect.width, h: rect.height }; } function placeAnchored(trigger){ const vw=innerWidth, vh=innerHeight; const r = trigger.getBoundingClientRect(); const { w, h } = measureBubbleForPlacement(); let left = r.left + (r.width/2) - (w/2); left = clamp(left, EDGE\_PADDING, Math.max(EDGE\_PADDING, vw - EDGE\_PADDING - w)); const topBelow = r.bottom + OFFSET\_Y; const spaceBelow = vh - topBelow - EDGE\_PADDING; const placeBelow = spaceBelow >= h; let top = placeBelow ? topBelow : (r.top - h - OFFSET\_Y); top = clamp(top, EDGE\_PADDING, Math.max(EDGE\_PADDING, vh - EDGE\_PADDING - h)); bubble.style.left = left + "px"; bubble.style.top = top + "px"; const br = bubble.getBoundingClientRect(); if (br.bottom > vh - EDGE\_PADDING){ bubble.style.maxHeight = (vh - 2\*EDGE\_PADDING) + "px"; bubble.style.overflowY = "auto"; } else { bubble.style.maxHeight = "none"; bubble.style.overflowY = "visible"; } } // ---------------- Open / Close (place → fade/scale) ---------------- function animateIn(){ bubble.style.transition = "none"; bubble.style.opacity = "0"; bubble.style.transform = "scale(0.95)"; void bubble.offsetWidth; bubble.style.transition = "opacity .18s ease, transform .18s ease"; bubble.style.opacity = "1"; bubble.style.transform = "scale(1)"; } function animateOut(done){ bubble.style.transition = "opacity .16s ease, transform .16s ease"; bubble.style.opacity = "0"; bubble.style.transform = "scale(0.95)"; const end = () => { bubble.removeEventListener("transitionend", end); done && done(); }; bubble.addEventListener("transitionend", end); setTimeout(end, 260); } function openFromTrigger(trigger){ if (current && current !== trigger) forceClose(); current = trigger; trigger.setAttribute("aria-expanded","true"); elH.textContent = trigger.getAttribute("data-tt-h") || ""; elB.textContent = trigger.getAttribute("data-tt-b") || ""; bubble.classList.add("is-open"); bubble.setAttribute("aria-hidden","false"); placeAnchored(trigger); animateIn(); const container = findTextContainer(trigger); dimAllOtherBranches(container, trigger); hoverCount = 0; cancelCloseTimer(); } function forceClose(){ if (!current) return; bubble.classList.remove("is-open"); bubble.setAttribute("aria-hidden","true"); current.setAttribute("aria-expanded","false"); current = null; undim(); hoverCount = 0; cancelCloseTimer(); } function closeWithAnim(){ if (!current) return; const t = current; animateOut(() => { bubble.classList.remove("is-open"); bubble.setAttribute("aria-hidden","true"); t.setAttribute("aria-expanded","false"); current = null; undim(); }); } function scheduleClose(){ cancelCloseTimer(); closeTimer = setTimeout(() => { if (hoverCount <= 0 && !isCoarse()) closeWithAnim(); }, CLOSE\_DELAY); } function cancelCloseTimer(){ if (closeTimer){ clearTimeout(closeTimer); closeTimer = null; } } // ---------------- Hover-intent (desktop) ---------------- function onZoneEnter(){ if (isCoarse()) return; hoverCount++; cancelCloseTimer(); } function onZoneLeave(){ if (isCoarse()) return; hoverCount = Math.max(0, hoverCount - 1); if (hoverCount === 0) scheduleClose(); } bubble.addEventListener("pointerenter", onZoneEnter, true); bubble.addEventListener("mouseenter", onZoneEnter, true); bubble.addEventListener("pointerleave", onZoneLeave, true); bubble.addEventListener("mouseleave", onZoneLeave, true); const handleEnter = (e) => { if (isCoarse()) return; const target = getElementTarget(e); if (!target) return; const t = target.closest(".tt-trigger"); if (!t) return; onZoneEnter(); if (!current || current !== t) openFromTrigger(t); }; const handleLeave = (e) => { if (isCoarse()) return; const target = getElementTarget(e); if (!target) return; const t = target.closest(".tt-trigger"); if (!t) return; onZoneLeave(); }; document.addEventListener("pointerenter", handleEnter, true); document.addEventListener("mouseenter", handleEnter, true); document.addEventListener("pointerleave", handleLeave, true); document.addEventListener("mouseleave", handleLeave, true); // ---------------- Keyboard ---------------- document.addEventListener("focusin", (e) => { if (!e.target) return; const t = e.target.closest(".tt-trigger"); if (t) openFromTrigger(t); }); document.addEventListener("focusout", (e) => { if (!e.target) return; const t = e.target.closest(".tt-trigger"); if (t && current === t) closeWithAnim(); }); // ---------------- Mobile / coarse ---------------- document.addEventListener("pointerdown", (e) => { if (!isCoarse()) return; const t = e.target.closest(".tt-trigger"); if (!t) return; e.preventDefault(); e.stopPropagation(); if (current === t && bubble.classList.contains("is-open")) { closeWithAnim(); return; } openFromTrigger(t); }, true); document.addEventListener("click", (e) => { if (!isCoarse()) return; if (!bubble.classList.contains("is-open")) return; const inBubble = !!e.target.closest(".tt-bubble"); const onTrigger = !!e.target.closest(".tt-trigger"); if (!inBubble && !onTrigger) closeWithAnim(); }, true); // Close button + ESC elClose.addEventListener("click", closeWithAnim); document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeWithAnim(); }); // Reposition on resize/scroll while open const reposition = () => { if (!current) return; placeAnchored(current); }; addEventListener("resize", reposition, { passive: true }); addEventListener("scroll", reposition, { passive: true }); });

/\* Tooltip Styles \*/ /\* Trigger \*/ .tt-trigger { cursor: help; text-decoration: underline dotted; text-underline-offset: .2em; color: inherit; } .tt-trigger:focus-visible{ outline:2px solid currentColor; outline-offset:2px; } /\* Bubble \*/ .tt-bubble{ position: fixed; z-index: 10; max-width: 17rem; background: var(--\_theme---background-primary); box-shadow: 0 4px 24px rgba(0,0,0,.05); border-radius: var(--radius--large); border-style: solid; border-color: var(--\_theme---border-tertiary); padding: var(--\_spacing---space--1-5rem); pointer-events: none; opacity: 0; transform: translate3d(0,0,0) scale(.98); transition: opacity .3s ease, transform .3s ease; will-change: transform, opacity; } .tt-bubble.is-open{ opacity:1; transform:translate3d(0,0,0) scale(1); pointer-events:auto; } .tt-h{ margin-bottom: var(--\_spacing---space--0-5rem); font-size: var(--\_typography---font-size--body-3); font-family: var(--\_typography---font--secondary-family); line-height: var(--\_typography---line-height--1-6); color: var(--\_theme---foreground-primary); } .tt-b{ margin:0; font-size: var(--\_typography---font-size--caption); line-height: var(--\_typography---line-height--1-6); color: var(--\_theme---foreground-tertiary); } /\* Mobile close button \*/ .tt-close { display: none; } @media (hover: none), (pointer: coarse) { .tt-close { display: inline-flex; position: absolute; top: 0.5rem; right: 0.5rem; width: 32px; height: 32px; align-items: center; justify-content: center; border: 0; border-radius: 999px; background: transparent; font-size: 22px; line-height: 1; color: inherit; cursor: pointer; touch-action: manipulation; } .tt-close:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; } .tt-close:hover { opacity: 1; } }

html\[lang="de-DE"\] h1, html\[lang="de-DE"\] h2, html\[lang="de-DE"\] h3, html\[lang="de-DE"\] h4, html\[lang="de-DE"\] h5, html\[lang="de-DE"\] h6, html\[lang="de-DE"\] p, html\[lang="de-DE"\] li, html\[lang="fr-FR"\] h1, html\[lang="fr-FR"\] h2, html\[lang="fr-FR"\] h3, html\[lang="fr-FR"\] h4, html\[lang="fr-FR"\] h5, html\[lang="fr-FR"\] h6, html\[lang="fr-FR"\] p, html\[lang="fr-FR"\] li { overflow-wrap: break-word; hyphens: auto; }

:root { --nav--icon-thickness: var(--border-width--main); --nav--hamburger-thickness: var(--nav--icon-thickness); --nav--hamburger-gap: var(--\_spacing---space--0-25rem); --nav--hamburger-rotate: 45; --nav--dropdown-duration: 300ms; --nav--dropdown-open-duration: 600ms; --nav--dropdown-delay: 0ms; --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1); } /\* ========== GENERAL RESPONSIVE RULES ========== \*/ /\* Lock body when nav is open (script toggles .is-nav-open) \*/ @media (width < 56em) { body.is-nav-open { overflow: hidden; } } @container (min-width: 56em) { .nav\_wrap.is-desktop { display: block; } .nav\_wrap.is-mobile { display: none; } } @container (max-width: 50.5em) { /\* Mega dropdown \*/ .nav\_dropdown\_main\_scroll.is-desktop.is-mega { flex-flow: column; } .nav\_dropdown\_main\_wrap.is-desktop.u-theme-white.is-mega.w--open { width: 100%; left: 0 !important; } .nav\_dropdown\_list\_wrap.is-mega:first-child .nav\_dropdown\_label.u-text-style-caption { margin-top: 0; } } @container (width < 28em) { .nav\_mobile\_layout .nav\_actions\_mobile { display: none; } } /\* ========== DROPDOWN STYLING ========== \*/ html:not(.wf-design-mode) .nav\_dropdown\_component > .w-dropdown-list { display: grid !important; grid-template-columns: minmax(0, 1fr); grid-template-rows: 0fr; transition: grid-template-rows var(--nav--dropdown-duration) var(--ease-expo-out), visibility 0s var(--nav--dropdown-duration), opacity var(--nav--dropdown-duration) var(--ease-expo-out); visibility: hidden; opacity: 0; } html:not(.wf-design-mode) .nav\_dropdown\_component > .w-dropdown-list.w--open { visibility: visible; opacity: 1; transition: grid-template-rows var(--nav--dropdown-duration) var(--ease-expo-out), visibility 0s 0s, opacity var(--nav--dropdown-duration) var(--ease-expo-out); } .nav\_dropdown\_component > .w-dropdown-list > \* { overflow: hidden; } .nav\_dropdown\_component:has(> .w-dropdown-toggle\[aria-expanded="true"\]) > .w-dropdown-list { --nav--dropdown-duration: var(--nav--dropdown-open-duration); grid-template-rows: 1fr; } /\*.nav\_wrap.is-desktop:has(.nav\_dropdown\_component > .w-dropdown-toggle.w--open\[aria-expanded="false"\]) .nav\_dropdown\_component:has(> .w--open\[aria-expanded="true"\]) > .w-dropdown-list { transition-delay: var(--nav--dropdown-duration); }\*/ /\* Dropdown caret rotation \*/ .nav\_links\_svg.is-desktop { transition: transform 750ms var(--ease-expo-out); } .w-dropdown-toggle\[aria-expanded="true"\] .nav\_links\_svg.is-desktop { transform: rotate(-180deg); } .nav\_links\_svg\_line.is-2 { transition: transform 500ms var(--ease-expo-out); } .w-dropdown-toggle\[aria-expanded="true"\] .nav\_links\_svg\_line.is-2 { transform: rotate(0deg); } /\* open (replicates your original transforms) \*/ .nav\_btn\_wrap\[aria-expanded="true"\] .nav\_btn\_line:nth-child(1), .nav\_btn\_wrap\[aria-expanded="true"\] > \* > :first-child { transform: translateY(calc(var(--nav--hamburger-thickness) \* 1 + var(--nav--hamburger-gap) \* 1)) rotate(calc(var(--nav--hamburger-rotate) \* -1deg)); } .nav\_btn\_wrap\[aria-expanded="true"\] .nav\_btn\_line:nth-child(2), .nav\_btn\_wrap\[aria-expanded="true"\] > \* > :nth-child(2) { opacity: 0; } .nav\_btn\_wrap\[aria-expanded="true"\] .nav\_btn\_line:nth-child(3), .nav\_btn\_wrap\[aria-expanded="true"\] > \* > :last-child { transform: translateY(calc(var(--nav--hamburger-thickness) \* -1 + var(--nav--hamburger-gap) \* -1)) rotate(calc(var(--nav--hamburger-rotate) \* 1deg)); width: 1rem; } /\* ========== HOVER & THEME EFFECTS ========== \*/ @media (hover: hover) and (pointer: fine) { body:has(.nav\_dropdown\_item:hover) .nav\_dropdown\_item:not(:hover) > \* > \* { color: var(--\_theme---foreground-tertiary); } .nav\_dropdown\_link { transition: background-color 300ms ease, color 300ms ease; } .nav\_dropdown\_item:hover .nav\_dropdown\_link { background: var(--\_theme---background-tertiary); color: var(--\_theme---foreground-primary); } .nav\_secondary\_wrap .nav\_dropdown\_item:hover .nav\_dropdown\_link { background: var(--\_theme---background-tertiary); color: var(--\_theme---foreground-primary); } .nav\_wrap.is-mobile .nav\_dropdown\_item:hover .nav\_dropdown\_link { color: var(--\_theme---foreground-primary); } .nav\_links\_text { transition: color 500ms var(--ease-expo-out); } .nav\_links\_svg { transition: transform 500ms var(--ease-expo-out), color 500ms var(--ease-expo-out); } .nav\_links\_item:hover .nav\_links\_text, .nav\_links\_item:hover .nav\_links\_svg { color: var(--\_theme---foreground-primary); } } /\* ========== LAYOUT / UTILITY (kept, de-Webflow’d) ========== \*/ .nav\_wrap.is-mobile \[data-open-on-mobile\] > .w-dropdown-toggle { display: none; } .nav\_wrap.is-mobile \[data-open-on-mobile\] > .w-dropdown-list { visibility: visible; opacity: 1; display: block; grid-template-rows: 1fr; } .nav\_buttons\_item .button\_main\_wrap { width: 100%; min-width: max-content; } /\* Optional: fade out mobile actions while open \*/ .nav\_actions\_wrap { transition: opacity 500ms var(--ease-expo-out); } body.is-nav-open .nav\_actions\_mobile .nav\_actions\_wrap { opacity: 0; pointer-events: none; } .nav\_links\_item:first-child { border-top: none; } /\* ========== Breadcrumbs ========== \*/ .breadcrumb\_text.is\_linked\[href="#"\], .breadcrumb\_text:has(+.breadcrumb\_text.is\_linked:not(\[href="#"\])) { display: none; } .breadcrumb\_text.is\_linked:not(\[href="#"\]) { display: block; }

document.addEventListener("DOMContentLoaded", function () { document.querySelectorAll(".nav\_component").forEach((root) => { if (root.dataset.scriptInitialized) return; root.dataset.scriptInitialized = "true"; if (!window.gsap) { console.error("GSAP not found"); return; } const btn = root.querySelector('.nav\_btn\_wrap'); const menu = root.querySelector('.nav\_menu\_wrap'); if (!btn || !menu) { console.warn('Missing .nav\_btn\_wrap or .nav\_menu\_wrap in', root); return; } // a11y setup (scoped) if (!btn.hasAttribute('type')) btn.setAttribute('type', 'button'); if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false'); if (!menu.id) menu.id = 'primary-nav-' + Math.random().toString(36).slice(2); if (!btn.hasAttribute('aria-controls')) btn.setAttribute('aria-controls', menu.id); menu.setAttribute('aria-hidden', 'true'); // targets (scoped) const items = Array.from(menu.querySelectorAll('.nav\_links\_item')); const actions = menu.querySelector('.nav\_menu\_actions\_wrap'); // feature detection const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; const canClipInset = !!(window.CSS && CSS.supports && ( CSS.supports('clip-path','inset(0 0 100% 0)') || CSS.supports('-webkit-clip-path','inset(0 0 100% 0)') )); const useClip = canClipInset && !prefersReduced; // durations from CSS vars function readDur(varName, fallbackSec) { const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim(); if (!v) return fallbackSec; if (v.endsWith('ms')) return parseFloat(v)/1000; if (v.endsWith('s')) return parseFloat(v); const n = parseFloat(v); return isNaN(n) ? fallbackSec : n; } const OPEN\_DUR = readDur('--nav--menu-open-duration', 0.8); const CLOSE\_DUR = readDur('--nav--menu-close-duration', 0.4); // state per component let isOpen = false; let current = null; function setMenuVisibleForAnim() { menu.style.display = 'flex'; // ensure it's shown before anim menu.removeAttribute('hidden'); menu.setAttribute('aria-hidden', 'false'); menu.style.willChange = useClip ? 'clip-path' : 'transform, opacity'; } function clearMenuInline() { gsap.set(menu, { clearProps: 'clipPath,webkitClipPath,opacity,transform,willChange,pointerEvents' }); } // OPEN function playOpen() { setMenuVisibleForAnim(); menu.style.pointerEvents = 'none'; document.body.classList.add('is-nav-open'); btn.setAttribute('aria-expanded', 'true'); if (useClip) { gsap.set(menu, { clipPath: 'inset(0 0 100% 0)', webkitClipPath: 'inset(0 0 100% 0)' }); } else { gsap.set(menu, { yPercent: -2, opacity: 0 }); } if (items.length) gsap.set(items, { y: 20, autoAlpha: 0 }); if (actions) gsap.set(actions, { y: 20, autoAlpha: 0 }); const tl = gsap.timeline({ defaults: { ease: 'power3.out' } }); if (useClip) { tl.to(menu, { clipPath: 'inset(0 0 0% 0)', webkitClipPath: 'inset(0 0 0% 0)', duration: prefersReduced ? 0.01 : OPEN\_DUR, ease: 'expo.out' }, 0); } else { tl.to(menu, { yPercent: 0, opacity: 1, duration: prefersReduced ? 0.01 : Math.min(OPEN\_DUR, 0.36) }, 0.02); } if (items.length) { tl.to(items, { y: 0, autoAlpha: 1, stagger: prefersReduced ? 0 : 0.08, duration: prefersReduced ? 0.01 : 0.4 }, 0.10); } if (actions) { const base = 0.10 + (items.length ? items.length \* (prefersReduced ? 0 : 0.08) : 0); tl.to(actions, { y: 0, autoAlpha: 1, duration: prefersReduced ? 0.01 : 0.4 }, base); } tl.add(() => { menu.style.pointerEvents = 'auto'; }, '>-0.1'); // listeners (per open) document.addEventListener('keydown', onKeydown); menu.addEventListener('click', onMenuLinkClick); return tl; } // CLOSE (fade all together, then clip inset close) function playClose() { menu.style.pointerEvents = 'none'; btn.setAttribute('aria-expanded', 'false'); document.body.classList.remove('is-nav-open'); const tl = gsap.timeline({ defaults: { ease: 'power3.out' } }); const fadeTargets = items.concat(actions ? \[actions\] : \[\]); if (fadeTargets.length) tl.to(fadeTargets, { autoAlpha: 0, y: 0, duration: prefersReduced ? 0.01 : 0.2 }, 0); if (useClip) { gsap.set(menu, { clipPath: 'inset(0 0 0% 0)', webkitClipPath: 'inset(0 0 0% 0)' }); tl.to(menu, { clipPath: 'inset(0 0 100% 0)', webkitClipPath: 'inset(0 0 100% 0)', duration: prefersReduced ? 0.01 : CLOSE\_DUR }, '>-0.02'); } else { tl.to(menu, { yPercent: -2, opacity: 0, duration: prefersReduced ? 0.01 : Math.min(CLOSE\_DUR, 0.28) }, '>-0.02'); } tl.add(() => { menu.style.display = 'none'; menu.setAttribute('aria-hidden', 'true'); clearMenuInline(); if (items.length) gsap.set(items, { clearProps: 'all' }); if (actions) gsap.set(actions, { clearProps: 'all' }); // remove listeners added on open document.removeEventListener('keydown', onKeydown); menu.removeEventListener('click', onMenuLinkClick); }); return tl; } function openMenu() { if (isOpen) return; isOpen = true; if (current && current.isActive()) current.kill(); current = playOpen(); } function closeMenu() { if (!isOpen) return; isOpen = false; if (current && current.isActive()) current.kill(); current = playClose(); } function onKeydown(e){ if (e.key === 'Escape' && isOpen) { e.preventDefault(); closeMenu(); } } function onMenuLinkClick(e){ const a = e.target.closest('a\[href\]'); if (!a) return; const url = new URL(a.href, location.href); if (url.origin === location.origin) { e.preventDefault(); const tl = playClose(); tl.eventCallback('onComplete', () => { window.location.href = a.href; }); isOpen = false; } } // Toggle (scoped) btn.addEventListener('click', () => (isOpen ? closeMenu() : openMenu())); // Normalize if visible on load (scoped) if (getComputedStyle(menu).display !== 'none') { btn.setAttribute('aria-expanded', 'true'); menu.setAttribute('aria-hidden', 'false'); document.body.classList.add('is-nav-open'); isOpen = true; } }); });

(function () { 'use strict'; // ---------- tiny utils ---------- var NS = 'navBundleInit'; function onceFlag(el, k){ k=k||'scriptInitialized'; if (el.dataset\[k\]) return true; el.dataset\[k\]='true'; return false; } function ready(fn){ if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn,{once:true});} else { fn(); } } // ---------- 1) Ask Claude about this page ---------- function initAskPage(){ var buttons = document.querySelectorAll('\[data-ask-page\]'); if (!buttons.length) return; // Early exit if no buttons buttons.forEach(function(btn){ if (onceFlag(btn, NS)) return; btn.addEventListener('click', function (e) { e.preventDefault(); var pageUrl = window.location.href; var prompt = "Read this page " + pageUrl + " so that I can ask you questions about it"; var claudeUrl = new URL('https://claude.ai/new'); claudeUrl.searchParams.set('q', prompt); window.open(claudeUrl.toString(), '\_blank', 'noopener'); }); }); } // ---------- 2) Copy page content as Markdown (Turndown) ---------- var \_turndownReady; function ensureTurndown(){ if (window.TurndownService) return Promise.resolve(); if (\_turndownReady) return \_turndownReady; \_turndownReady = new Promise(function(resolve, reject){ var s = document.createElement('script'); s.src = 'https://unpkg.com/turndown/dist/turndown.js'; s.async = true; s.onload = function(){ resolve(); }; s.onerror = function(){ reject(new Error('Failed to load Turndown')); }; document.head.appendChild(s); }); return \_turndownReady; } function initCopyAsMarkdown(){ var copyButton = document.getElementById('copy-as-markdown'); if (!copyButton) return; // Early exit if (onceFlag(copyButton, NS)) return; var buttonTextEl = copyButton.querySelector('.nav\_dropdown\_text') || copyButton; var originalText = buttonTextEl.textContent; copyButton.addEventListener('click', function(){ ensureTurndown().then(function(){ try { var TurndownService = window.TurndownService; var turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', fence: '\`\`\`', emDelimiter: '\*', strongDelimiter: '\*\*', linkStyle: 'inlined' }); // Skip junk turndownService.addRule('skipWebflowElements', { filter: function(node){ return node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' || (node.className && (String(node.className).includes('w-editor') || String(node.className).includes('w-embed'))); }, replacement: function(){ return ''; } }); buttonTextEl.textContent = 'Copying...'; copyButton.disabled = true; var contentElement = document.querySelector('main') || document.querySelector('.main-content') || document.querySelector('body'); if (!contentElement) throw new Error('No content found to copy'); var cloned = contentElement.cloneNode(true); cloned.querySelectorAll('script, style, nav, footer, .w-nav, .footer').forEach(function(el){ el.remove(); }); var markdown = turndownService.turndown(cloned); var done = function(){ buttonTextEl.textContent = 'Copied!'; setTimeout(function(){ buttonTextEl.textContent = originalText; copyButton.disabled = false; }, 2000); }; if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(markdown).then(done, function(err){ throw err; }); } else { var ta = document.createElement('textarea'); ta.value = markdown; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done(); } } catch (err){ console.error('Copy failed:', err); buttonTextEl.textContent = 'Copy failed'; setTimeout(function(){ buttonTextEl.textContent = originalText; copyButton.disabled = false; }, 2000); } }).catch(function(err){ console.error('Turndown load failed:', err); buttonTextEl.textContent = 'Copy failed'; setTimeout(function(){ buttonTextEl.textContent = originalText; copyButton.disabled = false; }, 2000); }); }); } // ---------- init all ---------- ready(function(){ initAskPage(); initCopyAsMarkdown(); }); // Optional: expose minimal API for debugging (comment out in production if not needed) // window.NavBundle = { // initCopyAsMarkdown: initCopyAsMarkdown, // initAskPage: initAskPage // }; })();

[

](https://claude.com)

-   Meet Claude
    
    Products
    
    -   [
        
        Claude
        
        ](/product/overview)
    -   [
        
        Claude Code
        
        ](/product/claude-code)
    -   [
        
        Claude Cowork
        
        ](/product/cowork)
    -   [
        
        Claude Security
        
        ](/product/claude-security)
    
    Features
    
    -   [
        
        Claude for Chrome
        
        ](/claude-for-chrome)
    -   [
        
        Claude for Slack
        
        ](/claude-for-slack)
    -   [
        
        Claude for Microsoft 365
        
        ](/claude-for-microsoft-365)
    -   [
        
        Skills
        
        ](/skills)
    
    Models
    
    -   [
        
        Opus
        
        ](https://www.anthropic.com/claude/opus)
    -   [
        
        Sonnet
        
        ](https://www.anthropic.com/claude/sonnet)
    -   [
        
        Haiku
        
        ](https://www.anthropic.com/claude/haiku)
    
-   Platform
    
    -   [
        
        Overview
        
        ](/platform/api)
    -   [
        
        Developer docs
        
        ](https://platform.claude.com/docs)
    -   [
        
        Pricing
        
        ](http://claude.com/pricing#api)
    
    -   [
        
        Console login
        
        ](https://platform.claude.com/)
    
-   Solutions
    
    Use cases
    
    -   [
        
        AI agents
        
        ](/solutions/agents)
    -   [
        
        Coding
        
        ](/solutions/coding)
    
    Departments
    
    -   [
        
        Legal
        
        ](/solutions/legal)
    -   [
        
        Security
        
        ](/solutions/security)
    
    Industries
    
    -   [
        
        Customer support
        
        ](/solutions/customer-support)
    -   [
        
        Education
        
        ](/solutions/education)
    -   [
        
        Financial services
        
        ](/solutions/financial-services)
    -   [
        
        Government
        
        ](/solutions/government)
    -   [
        
        Healthcare
        
        ](/solutions/healthcare)
    -   [
        
        Life sciences
        
        ](/solutions/life-sciences)
    -   [
        
        Nonprofits
        
        ](/solutions/nonprofits)
    
-   Pricing
    
    -   [
        
        Overview
        
        ](/pricing)
    -   [
        
        API
        
        ](/pricing#api)
    
    Plans
    
    -   [
        
        Pro
        
        ](/pricing/pro)
    -   [
        
        Max
        
        ](/pricing/max)
    -   [
        
        Team
        
        ](/pricing/team)
    -   [
        
        Enterprise
        
        ](/pricing/enterprise)
    
-   Resources
    
    Insights
    
    -   [
        
        Blog
        
        ](/blog)
    -   [
        
        Customer stories
        
        ](/customers)
    -   [
        
        Anthropic news
        
        ](https://www.anthropic.com/news)
    
    Learn
    
    -   [
        
        Anthropic Academy
        
        ](https://www.anthropic.com/learn)
    -   [
        
        Courses
        
        ](/resources/courses)
    -   [
        
        Tutorials
        
        ](/resources/tutorials)
    -   [
        
        Use cases
        
        ](/resources/use-cases)
    
    Tools
    
    -   [
        
        Connectors
        
        ](/connectors)
    -   [
        
        Plugins
        
        ](/plugins)
    
    Connect
    
    -   [
        
        Events
        
        ](https://www.anthropic.com/events)
    -   [
        
        Community
        
        ](/community)
    
-   [
    
    Login
    
    ](https://claude.ai/login)

-   .button\_small\_icon { transition: color 300ms ease; } .button\_small\_wrap:hover .button\_small\_icon { color: var(--\_button-style---icon-hover); } .button\_small\_wrap:focus-within .button\_small\_icon { color: var(--\_button-style---text-hover) !important; } .button\_small\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Contact sales
    
    [Contact sales](/contact-sales)Contact sales
    
-   .button\_small\_icon { transition: color 300ms ease; } .button\_small\_wrap:hover .button\_small\_icon { color: var(--\_button-style---icon-hover); } .button\_small\_wrap:focus-within .button\_small\_icon { color: var(--\_button-style---text-hover) !important; } .button\_small\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Try Claude
    
    [Try Claude](https://claude.ai/)Try Claude
    
-   .button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Contact sales
    
    [Contact sales](/contact-sales)Contact sales
    
-   .button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Try Claude
    
    [Try Claude](https://claude.ai/)Try Claude
    

[

](#)

-   .button\_small\_icon { transition: color 300ms ease; } .button\_small\_wrap:hover .button\_small\_icon { color: var(--\_button-style---icon-hover); } .button\_small\_wrap:focus-within .button\_small\_icon { color: var(--\_button-style---text-hover) !important; } .button\_small\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Contact sales
    
    [Contact sales](/contact-sales)Contact sales
    
-   .button\_small\_icon { transition: color 300ms ease; } .button\_small\_wrap:hover .button\_small\_icon { color: var(--\_button-style---icon-hover); } .button\_small\_wrap:focus-within .button\_small\_icon { color: var(--\_button-style---text-hover) !important; } .button\_small\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Try Claude
    
    [Try Claude](https://claude.ai/)Try Claude
    
-   .button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Contact sales
    
    [Contact sales](/contact-sales)Contact sales
    
-   .button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Try Claude
    
    [Try Claude](https://claude.ai/)Try Claude
    

-   Meet Claude
    
    Products
    
    -   [
        
        Claude
        
        ](/product/overview)
    -   [
        
        Claude Code
        
        ](/product/claude-code)
    -   [
        
        Claude Cowork
        
        ](/product/cowork)
    -   [
        
        Claude Security
        
        ](/product/claude-security)
    
    Features
    
    -   [
        
        Claude for Chrome
        
        ](/claude-for-chrome)
    -   [
        
        Claude for Slack
        
        ](/claude-for-slack)
    -   [
        
        Claude for Microsoft 365
        
        ](/claude-for-microsoft-365)
    -   [
        
        Skills
        
        ](/skills)
    
    Models
    
    -   [
        
        Opus
        
        ](https://www.anthropic.com/claude/opus)
    -   [
        
        Sonnet
        
        ](https://www.anthropic.com/claude/sonnet)
    -   [
        
        Haiku
        
        ](https://www.anthropic.com/claude/haiku)
    
-   Platform
    
    -   [
        
        Overview
        
        ](/platform/api)
    -   [
        
        Developer docs
        
        ](https://platform.claude.com/docs)
    -   [
        
        Pricing
        
        ](http://claude.com/pricing#api)
    
    -   [
        
        Console login
        
        ](https://platform.claude.com/)
    
-   Solutions
    
    Use cases
    
    -   [
        
        AI agents
        
        ](/solutions/agents)
    -   [
        
        Coding
        
        ](/solutions/coding)
    
    Departments
    
    -   [
        
        Legal
        
        ](/solutions/legal)
    -   [
        
        Security
        
        ](/solutions/security)
    
    Industries
    
    -   [
        
        Customer support
        
        ](/solutions/customer-support)
    -   [
        
        Education
        
        ](/solutions/education)
    -   [
        
        Financial services
        
        ](/solutions/financial-services)
    -   [
        
        Government
        
        ](/solutions/government)
    -   [
        
        Healthcare
        
        ](/solutions/healthcare)
    -   [
        
        Life sciences
        
        ](/solutions/life-sciences)
    -   [
        
        Nonprofits
        
        ](/solutions/nonprofits)
    
-   Pricing
    
    -   [
        
        Overview
        
        ](/pricing)
    -   [
        
        API
        
        ](/pricing#api)
    
    Plans
    
    -   [
        
        Pro
        
        ](/pricing/pro)
    -   [
        
        Max
        
        ](/pricing/max)
    -   [
        
        Team
        
        ](/pricing/team)
    -   [
        
        Enterprise
        
        ](/pricing/enterprise)
    
-   Resources
    
    Insights
    
    -   [
        
        Blog
        
        ](/blog)
    -   [
        
        Customer stories
        
        ](/customers)
    -   [
        
        Anthropic news
        
        ](https://www.anthropic.com/news)
    
    Learn
    
    -   [
        
        Anthropic Academy
        
        ](https://www.anthropic.com/learn)
    -   [
        
        Courses
        
        ](/resources/courses)
    -   [
        
        Tutorials
        
        ](/resources/tutorials)
    -   [
        
        Use cases
        
        ](/resources/use-cases)
    
    Tools
    
    -   [
        
        Connectors
        
        ](/connectors)
    -   [
        
        Plugins
        
        ](/plugins)
    
    Connect
    
    -   [
        
        Events
        
        ](https://www.anthropic.com/events)
    -   [
        
        Community
        
        ](/community)
    
-   [
    
    Login
    
    ](https://claude.ai/login)

-   .button\_small\_icon { transition: color 300ms ease; } .button\_small\_wrap:hover .button\_small\_icon { color: var(--\_button-style---icon-hover); } .button\_small\_wrap:focus-within .button\_small\_icon { color: var(--\_button-style---text-hover) !important; } .button\_small\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Contact sales
    
    [Contact sales](/contact-sales)Contact sales
    
-   .button\_small\_icon { transition: color 300ms ease; } .button\_small\_wrap:hover .button\_small\_icon { color: var(--\_button-style---icon-hover); } .button\_small\_wrap:focus-within .button\_small\_icon { color: var(--\_button-style---text-hover) !important; } .button\_small\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Try Claude
    
    [Try Claude](https://claude.ai/)Try Claude
    
-   .button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Contact sales
    
    [Contact sales](/contact-sales)Contact sales
    
-   .button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }
    
    Try Claude
    
    [Try Claude](https://claude.ai/)Try Claude
    

1.  Tutorials
    
    [
    
    Tutorials
    
    ](https://claude.com/resources/tutorials)
    
    /
2.  Using the Scholar Gateway Connector in Claude
    

Explore here

-   [
    
    Ask questions about this page
    
    ](#)
-   [
    
    Copy as markdown
    
    ](#)

/\* - - - - - - - - - - - - - - - - - - - - - - - - - - - THUMBNAIL BG COLORS - - - - - - - - - - - - - - - - - - - - - - - - - - - - \*/ \[data-thumbnail-bg="Clay"\] { background-color: var(--swatch--clay); } \[data-thumbnail-bg="Cactus"\] { background-color: var(--swatch--cactus); } \[data-thumbnail-bg="Coral"\] { background-color: var(--swatch--coral); } \[data-thumbnail-bg="Fig"\] { background-color: var(--swatch--fig); } \[data-thumbnail-bg="Heather"\] { background-color: var(--swatch--heather); } \[data-thumbnail-bg="Oat"\] { background-color: var(--swatch--oat); } \[data-thumbnail-bg="Olive"\] { background-color: var(--swatch--olive); } \[data-thumbnail-bg="Sky"\] { background-color: var(--swatch--sky); } \[data-thumbnail-bg="Peach"\] { background-color: var(--swatch--peach); } \[data-thumbnail-bg="Plum"\] { background-color: var(--swatch--plum); } \[data-thumbnail-bg="Mineral"\] { background-color: var(--swatch--mineral); } /\* - - - - - - - - - - - - - - - - - - - - - - - - - - - CONDITIONAL STYLES BASED ON IF IMAGE OR VIDEO ARE VISIBLE - - - - - - - - - - - - - - - - - - - - - - - - - - - - \*/ .hero\_tutorial\_post\_wrap:has(+ .tutorial\_post\_media\_wrap :is(.tutorial\_post\_image\_wrap, .tutorial\_post\_video\_wrap):not(.w-condition-invisible)) { border-bottom: none !important; } .tutorial\_post\_media\_wrap:has(+ .tutorial\_post\_wrap:not(.w-condition-invisible)) .u-section-spacer { display: none !important; } /\* - - - - - - - - - - - - - - - - - - - - - - - - - - - TABLE OF CONTENTS Adding here so classes don't get accidentally cleared - - - - - - - - - - - - - - - - - - - - - - - - - - - - \*/ .tutorial\_post\_toc\_list { color: var(--\_theme---foreground-tertiary); font-size: var(--\_typography---font-size--body-3); } .tutorial\_post\_toc\_item { margin-left: -0.0625rem; padding-top: var(--\_spacing---space--0-25rem); padding-bottom: var(--\_spacing---space--0-25rem); padding-left: var(--\_spacing---space--1rem); border-left-style: solid; border-left-width: var(--border-width--main); border-left-color: var(--\_theme---border-secondary); } .tutorial\_post\_toc\_item.active { border-left-color: var(--\_theme---heroes-accent); } /\* - - - - - - - - - - - - - - - - - - - - - - - - - - - ANCHOR LINK - - - - - - - - - - - - - - - - - - - - - - - - - - - - \*/ /\* offset for <span class="anchor"> that takes fixed header height into account \*/ .anchor { position: relative; top: calc(-1 \* var(--\_spacing---space--4rem) - 120px); } /\* Copy anchor link to clipboard button \*/ .anchor-link-box { /\* quick btn reset \*/ background: none; border: none; padding: 0; cursor: pointer; /\* other styles \*/ position: absolute !important; left: -3rem; top: 50%; transform: translateY(-50%); opacity: 0; transition: opacity 0.2s ease; width: 2.5rem; height: 2.5rem; background: var(--\_theme---background-tertiary); border: var(--border-width--main) solid var(--\_theme---border-tertiary); border-radius: var(--radius--main); display: flex; align-items: center; justify-content: center; padding: var(--\_spacing---space--0-5rem); } .anchor-link-box:hover { opacity: 1; } .tooltip { opacity: 0; transition: opacity 0.2s ease; position: absolute; left: 50%; bottom: calc(100% + 0.5rem); transform: translateX(-50%); background: var(--\_theme---button-primary--background); color: var(--\_theme---button-primary--text); white-space: nowrap; padding: 0.125rem 0.5rem; border-radius: var(--radius--x-small); font-family: var(--\_typography---font--primary-family); font-size: var(--\_typography---font-size--caption); line-height: var(--\_typography---line-height--1-6); } .tooltip.active { opacity: 1; } /\* - - - - - - - - - - - - - - - - - - - - - - - - - - - HIDE EMPTY <p> TAGS - - - - - - - - - - - - - - - - - - - - - - - - - - - - \*/ p:empty, p:has(> br:only-child) { display: none; } /\* - - - - - - - - - - - - - - - - - - - - - - - - - - - BORDER RADIUS ON RICH TEXT VIDEOS - - - - - - - - - - - - - - - - - - - - - - - - - - - - \*/ .w-richtext-figure-type-video { border-radius: var(--radius--main); overflow: hidden; } /\* - - - - - - - - - - - - - - - - - - - - - - - - - - - FIX GRID SPACING IF TUTORIAL HAS NO VIDEO - - - - - - - - - - - - - - - - - - - - - - - - - - - - \*/ .tutorial\_post\_video\_layout:has(.w-dyn-bind-empty) { display: none; }

document.addEventListener('DOMContentLoaded', function() { // Helper function to convert text to slug function textToSlug(text) { return text .toLowerCase() .trim() .replace(/\[''"&\]/g, '') .replace(/"(\[^"\]+)"/, '$1') .replace(/\\s\*\[:.,?—–\\\\/-\]\\s\*/g, '-') .replace(/\\s+/g, '-') .replace(/-+/g, '-') .replace(/^-+|-+$/g, ''); } // Track used slugs to prevent duplicate IDs const usedSlugs = new Set(); function getUniqueSlug(baseSlug) { let slug = baseSlug; let counter = 1; while (usedSlugs.has(slug)) { slug = \`${baseSlug}-${counter}\`; counter++; } usedSlugs.add(slug); return slug; } // Add/Remove class helper functions const addClass = (element, className) => { if (element && className) { element.classList.add(className); } }; const removeClass = (element, className) => { if (element && className) { element.classList.remove(className); } }; // Debounce helper for resize events function debounce(func, wait) { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; } // Get elements const tutorialContent = document.getElementById('tutorial\_content'); const tocContainer = document.getElementById('tutorial\_toc'); if (!tutorialContent || !tocContainer) { return; } const h2Elements = tutorialContent.querySelectorAll('h2'); if (h2Elements.length === 0) { tocContainer.style.display = 'none'; return; } // Create ToC list const tocList = document.createElement('ul'); addClass(tocList, 'tutorial\_post\_toc\_list'); const tocItems = \[\]; // Copy anchor link to clipboard with tooltip const copyAnchorToClipboard = (element, spanElement, mouseEnterTime = 750) => { let hoverTimeout; let tooltip; element.addEventListener("mouseenter", function () { clearTimeout(hoverTimeout); tooltip = document.createElement("span"); addClass(tooltip, 'tooltip'); tooltip.innerText = "Copy anchor link"; this.appendChild(tooltip); hoverTimeout = setTimeout(() => { addClass(tooltip, "active"); }, mouseEnterTime); }); element.addEventListener("mouseleave", function () { clearTimeout(hoverTimeout); if (tooltip) { removeClass(tooltip, "active"); this.removeChild(tooltip); tooltip = null; } }); element.addEventListener("click", function (event) { event.preventDefault(); clearTimeout(hoverTimeout); if (spanElement && spanElement.classList.contains("anchor")) { const id = spanElement.id; if (tooltip) { tooltip.innerText = "Copied!"; addClass(tooltip, "active"); const url = new URL(window.location.href); url.searchParams.delete("topic"); const anchorLink = \`${url.origin}${url.pathname}#${id}\`; if (navigator && navigator.clipboard) { navigator.clipboard.writeText(anchorLink).catch((err) => { console.error("Could not copy text: ", err); }); } hoverTimeout = setTimeout(() => { removeClass(tooltip, "active"); }, 1500); } } else { console.error("Couldn't find Span with the ID"); } }); }; // Anchor link SVG icon const anchorLinkSVG = \`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.59608 7.99088C9.01909 7.43035 10.5884 7.86617 11.5326 8.96256L11.7123 9.19108C11.7695 9.27004 11.8243 9.35165 11.8754 9.4362L12.018 9.69792L12.0531 9.79362C12.1116 10.0184 12.0068 10.2611 11.7904 10.3678C11.5738 10.4744 11.3168 10.4098 11.1742 10.2262L11.1205 10.1403L11.018 9.95377C10.9816 9.8936 10.9434 9.83515 10.9027 9.77897L10.7738 9.61491C10.0992 8.83195 8.97855 8.52172 7.96327 8.92155C6.67866 9.42757 6.04713 10.8791 6.55311 12.1637L7.83631 15.4206C8.34249 16.7049 9.794 17.3357 11.0785 16.8298C12.3629 16.3236 12.9937 14.8721 12.4877 13.5876L12.3969 13.3551C12.2957 13.0983 12.4213 12.808 12.6781 12.7067C12.935 12.6055 13.2253 12.732 13.3265 12.9889L13.4183 13.2214C14.1268 15.0198 13.2432 17.052 11.4447 17.7604C9.64625 18.4688 7.61412 17.5852 6.90565 15.7868L5.62245 12.5299C4.91434 10.7317 5.79792 8.69938 7.59608 7.99088ZM8.55506 2.23991C10.3536 1.53146 12.3857 2.41505 13.0941 4.21354L14.3773 7.4694C15.0857 9.26779 14.202 11.2999 12.4037 12.0085C10.9807 12.569 9.41236 12.1332 8.46815 11.0368L8.28749 10.8092C8.17297 10.6512 8.07027 10.481 7.98182 10.3014C7.86013 10.0539 7.96206 9.75458 8.20936 9.63249C8.4571 9.5105 8.7573 9.61229 8.87928 9.86002C8.9425 9.98839 9.0156 10.1089 9.09706 10.2214L9.22596 10.3844C9.90056 11.1677 11.022 11.4788 12.0375 11.0788C13.3218 10.5727 13.9524 9.12105 13.4467 7.83659L12.1644 4.57975C11.6584 3.29511 10.2059 2.66356 8.92128 3.1696C7.63695 3.67569 7.00633 5.12732 7.5121 6.41178L7.60389 6.64518C7.70479 6.902 7.57845 7.19247 7.32167 7.29362C7.06479 7.39475 6.77446 7.26823 6.67323 7.01139L6.58143 6.77897C5.87303 4.98058 6.75677 2.94846 8.55506 2.23991Z" fill="currentColor"/></svg>\`; // Process each H2 and build ToC h2Elements.forEach((h2) => { const headingText = h2.textContent; const baseSlug = textToSlug(headingText); const slug = getUniqueSlug(baseSlug); // Add anchor span const anchorSpan = document.createElement('span'); anchorSpan.id = slug; addClass(anchorSpan, 'anchor'); h2.prepend(anchorSpan); // Add anchor link box const anchorLinkBox = document.createElement('button'); anchorLinkBox.type = 'button'; addClass(anchorLinkBox, 'anchor-link-box'); anchorLinkBox.innerHTML = anchorLinkSVG; h2.prepend(anchorLinkBox); // Initialize copy functionality copyAnchorToClipboard(anchorLinkBox, anchorSpan); // Create ToC item const listItem = document.createElement('li'); addClass(listItem, 'tutorial\_post\_toc\_item'); const link = document.createElement('a'); link.href = \`#${slug}\`; const textDiv = document.createElement('div'); textDiv.textContent = headingText; link.appendChild(textDiv); listItem.appendChild(link); tocList.appendChild(listItem); tocItems.push({ element: listItem, target: h2 }); }); tocContainer.appendChild(tocList); // Configuration const headerHeight = 134; const activationOffset = 100; // State let currentActive = 0; let ranges = \[\]; let frameRequested = false; // Calculate activation ranges using getBoundingClientRect for reliability // (offsetTop can be relative to offsetParent, not document) function calculateRanges() { const scrollY = window.scrollY; ranges = tocItems.map((item, index) => { const rect = item.target.getBoundingClientRect(); const absoluteTop = rect.top + scrollY; const activationPoint = absoluteTop - headerHeight - activationOffset; const nextAbsoluteTop = index < tocItems.length - 1 ? tocItems\[index + 1\].target.getBoundingClientRect().top + scrollY : Infinity; const nextActivation = nextAbsoluteTop === Infinity ? Infinity : nextAbsoluteTop - headerHeight - activationOffset; return { index: index, start: Math.max(0, activationPoint), end: nextActivation }; }); } // Update active section function updateActiveSection() { if (ranges.length === 0) return; const scrollPosition = window.scrollY; let newActive = 0; // Find current range if (scrollPosition < ranges\[0\].start) { newActive = 0; } else { for (let i = 0; i < ranges.length; i++) { if (scrollPosition >= ranges\[i\].start && scrollPosition < ranges\[i\].end) { newActive = i; break; } } } // Special case: if near bottom of page, activate last item const scrollBottom = scrollPosition + window.innerHeight; const documentHeight = document.documentElement.scrollHeight; if (documentHeight - scrollBottom < 100) { newActive = tocItems.length - 1; } // Update classes if changed if (newActive !== currentActive) { tocItems.forEach(item => removeClass(item.element, 'active')); currentActive = newActive; if (tocItems\[currentActive\]) { addClass(tocItems\[currentActive\].element, 'active'); } } frameRequested = false; } // Scroll handler function handleScroll() { if (!frameRequested) { frameRequested = true; window.requestAnimationFrame(updateActiveSection); } } // Recalculate on resize (debounced) const handleResize = debounce(() => { calculateRanges(); updateActiveSection(); }, 250); // Smooth scroll behavior for ToC links tocItems.forEach(item => { item.element.querySelector('a').addEventListener('click', function(e) { e.preventDefault(); const targetId = this.getAttribute('href').substring(1); const targetElement = document.getElementById(targetId); if (targetElement) { const scrollTo = targetElement.parentElement.offsetTop - headerHeight - 20; window.scrollTo({ top: scrollTo, behavior: 'smooth' }); } }); }); // Initialize calculateRanges(); addClass(tocItems\[0\].element, 'active'); // Handle hash on initial page load if (window.location.hash) { const hash = window.location.hash.substring(1); const targetIndex = tocItems.findIndex(item => item.target.querySelector('.anchor')?.id === hash ); if (targetIndex !== -1) { tocItems.forEach(item => removeClass(item.element, 'active')); addClass(tocItems\[targetIndex\].element, 'active'); currentActive = targetIndex; } } // Re-check after browser might restore scroll position requestAnimationFrame(() => { requestAnimationFrame(() => { calculateRanges(); updateActiveSection(); }); }); // Event listeners window.addEventListener('scroll', handleScroll, { passive: true }); window.addEventListener('resize', handleResize); // Visual Viewport API for mobile viewport changes (keyboard, browser chrome) if (window.visualViewport) { window.visualViewport.addEventListener('resize', handleResize); window.visualViewport.addEventListener('scroll', handleResize); } // Browser back/forward navigation with hash changes window.addEventListener('popstate', () => { calculateRanges(); updateActiveSection(); }); // Handle dynamic content changes (if Webflow adds/removes content) const observer = new MutationObserver(debounce(() => { calculateRanges(); updateActiveSection(); }, 500)); observer.observe(tutorialContent, { childList: true, subtree: true, attributes: false }); // Recalculate after images load (affects layout positions) const images = tutorialContent.querySelectorAll('img'); images.forEach(img => { if (!img.complete) { img.addEventListener('load', handleResize, { once: true }); img.addEventListener('error', handleResize, { once: true }); } }); // Recalculate after fonts load if (document.fonts && document.fonts.ready) { document.fonts.ready.then(handleResize); } });

# Using the Scholar Gateway Connector in Claude

Set up and use the Scholar Gateway integration by Wiley with Claude for access to over 3 million peer-reviewed scientific articles.

-   Category
    
    Life Sciences
    
-   Product
    
    Claude.ai
    
-   Reading time
    
    Watch time
    
    5
    
    min
    
    min
    
-   Share
    
    [Copy link](#)
    
    https://claude.com/resources/tutorials/using-the-scholar-gateway-connector-in-claude
    

![](https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg)

The Scholar Gateway by Wiley integration provides authenticated access to the most relevant snippets of scientific research papers to utilize within Claude. This article explains how to set up and use the Scholar Gateway integration with Claude to accelerate your research workflows.

The Scholar Gateway integration relies upon Claude's ability to [use remote connectors](https://support.claude.com/en/articles/11724452-browsing-and-connecting-to-tools-from-the-directory).

## What this integration provides

Currently >3 million journal articles are available through Scholar Gateway with additional collections, databases and new articles being added all the time.

These datasets cover key STEM subjects including articles from a significant number of leading Life Sciences journals. Specifically, Scholar Gateway has over 300 Life Sciences journals that cover over 900,000 research articles.

Scholar Gateway (Beta) enables AI responses grounded in peer-reviewed sources with verifiable citations and DOI links.

Instead of relying on general AI knowledge, Scholar Gateway (Beta) searches current literature from Wiley journals and research databases to deliver evidence-backed answers with complete source metadata.

While the Beta currently provides access to Wiley content only, additional publisher sources will be added soon.

This enables you to verify that claims are backed with sourced research — ensuring your AI-assisted research meets professional research standards.

## Who can access the Scholar Gateway integration

-   Existing subscribers to Wiley journals will need to upgrade their subscription following a trial period to allow AI access.
-   New subscribers will need to subscribe subject to a trial period.

More details on accessing the integration can be found in [Wiley’s MCP Server Documentation](https://docs.scholargateway.ai/).

## Setting up the Scholar Gateway integration

**For Organization Owners (Team and Enterprise)**

1.  Navigate to Admin settings > Connectors
2.  Click "Browse connectors"
3.  Click “**Scholar Gateway**”
4.  Click “Add to your team”

**For Individual Claude Users**

1.  Navigate to Settings > Connectors
2.  Click “Connect”
3.  Follow the instructions to authenticate with your Wiley account

Learn about [finding and connecting tools](https://support.claude.com/en/articles/11724452-browsing-and-connecting-to-tools-from-the-directory).

**For Claude Code Users**

1.  Command: `/plugin marketplace add anthropics/life-sciences`‍
2.  Command: `/plugin install wiley-scholar-gateway@life-sciences`‍
3.  Restart Claude Code
4.  Verify that the server is connected with `/mcp`

Technical details of the Scholar Gateway integration can be found in [Wiley’s MCP Server Documentation](https://docs.scholargateway.ai/).

## Common use cases

-   Enhanced literature review when planning experiments and research plans, to efficiently identify, summarize, and evaluate relevant literature as individual articles or in aggregation, enabling new ways of doing research and delivering reliable and cited insights in seconds.​
-   Information on latest research in a certain field of medicine or pharmaceuticals.

## Related tutorials

[How to use the Nextflow Deployment agent skill with Claude Code](/resources/tutorials/how-to-use-the-nextflow-deployment-agent-skill-with-claude-code)How to use the Nextflow Deployment agent skill with Claude Code

How to use the Nextflow Deployment agent skill with Claude Code

Tutorial

[Tutorial](/resources/tutorials/how-to-use-the-nextflow-deployment-agent-skill-with-claude-code)Tutorial

[How to use the Instrument Data to Allotrope Skill with Claude](/resources/tutorials/how-to-use-the-instrument-data-to-allotrope-skill-with-claude)How to use the Instrument Data to Allotrope Skill with Claude

How to use the Instrument Data to Allotrope Skill with Claude

Tutorial

[Tutorial](/resources/tutorials/how-to-use-the-instrument-data-to-allotrope-skill-with-claude)Tutorial

[How to use the Scientific Problem Selection Skill with Claude](/resources/tutorials/how-to-use-the-scientific-problem-selection-skill-with-claude)How to use the Scientific Problem Selection Skill with Claude

How to use the Scientific Problem Selection Skill with Claude

Tutorial

[Tutorial](/resources/tutorials/how-to-use-the-scientific-problem-selection-skill-with-claude)Tutorial

[How to use the scVI-Tools bioinformatics skill bundle with Claude](/resources/tutorials/how-to-use-the-scvi-tools-bioinformatics-skill-bundle-with-claude)How to use the scVI-Tools bioinformatics skill bundle with Claude

How to use the scVI-Tools bioinformatics skill bundle with Claude

Tutorial

[Tutorial](/resources/tutorials/how-to-use-the-scvi-tools-bioinformatics-skill-bundle-with-claude)Tutorial

@container (width < 52em) { .footer\_layout { display: flex; column-gap: var(--\_spacing---space--4rem); row-gap: var(--\_spacing---space--4rem); } .footer\_content\_wrap.u-column-custom { display: contents; } } .footer\_link { opacity: 1; transition: opacity 0.3s ease; } .footer\_links\_list:has(.footer\_link:hover) .footer\_link:not(:hover) { opacity: 0.4; }

[Homepage](https://claude.com)Homepage

[Next](#)Next

Thank you! Your submission has been received!

Oops! Something went wrong while submitting the form.

(function () { const ROOT\_SEL = "\[data-prompt-scope\]"; const TRIGGER\_SEL = "\[data-prompt-trigger\]"; const MENU\_ATTR = "data-prompt-menu"; const CLOSE\_SEL = "\[data-prompt-menu-close\]"; const ACTION\_SEL = "a, button, \[data-prompt-menu-action\]"; const ITEM\_SEL = "\[data-prompt-item\], li, .menu-item, .w-dyn-item"; // ---------- Claude helper ---------- function buildClaudeUrl(text) { const url = new URL("https://claude.ai/new"); url.searchParams.set("q", text || ""); return url.toString(); } function openClaude(text) { const q = (text || "").trim(); if (!q) return; window.open(buildClaudeUrl(q), "\_blank", "noopener"); } // ---------- Utilities ---------- let uid = 0; function makeId(prefix = "prompt-menu") { uid += 1; return \`${prefix}-${Date.now().toString(36)}-${uid}\`; } // Limit queries to elements that belong to THIS scope (ignore nested scopes) function qsaInScope(root, sel) { return Array.from(root.querySelectorAll(sel)).filter( (el) => el.closest(ROOT\_SEL) === root ); } // Lightweight shield to stop click-through during the brief close animation function deployClickShield(ms = 300) { const sh = document.createElement("div"); sh.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:auto;background:transparent"; document.body.appendChild(sh); setTimeout(() => { sh.remove(); }, ms); } // Pairing: find which menu a trigger controls (no manual ids needed) function resolveMenuForTrigger(root, trigger) { // 1) explicit data-prompt-trigger="x" -> \[data-prompt-menu="x"\] const explicit = trigger.getAttribute("data-prompt-trigger"); if (explicit) { const m = qsaInScope(root, \`\[${MENU\_ATTR}="${explicit}"\]\`)\[0\]; if (m) return m; } // 2) aria-controls const ctrl = trigger.getAttribute("aria-controls"); if (ctrl) { const m = qsaInScope(root, \`#${ctrl.replace(/(\["'\\\\\])/g, "\\\\$1")}\`)\[0\]; if (m) return m; } // 3) nearest following sibling with \[data-prompt-menu\] let sib = trigger.nextElementSibling; while (sib && sib !== root) { if ( sib.hasAttribute && sib.hasAttribute(MENU\_ATTR) && sib.closest(ROOT\_SEL) === root ) return sib; sib = sib.nextElementSibling; } // 4) first menu in this root return qsaInScope(root, \`\[${MENU\_ATTR}\]\`)\[0\] || null; } function ensurePairing(trigger, menu) { if (!menu.id) menu.id = makeId(); trigger.setAttribute("aria-controls", menu.id); if (trigger.tagName === "BUTTON" && !trigger.hasAttribute("type")) trigger.type = "button"; } // ---------- Animations (GSAP) ---------- function revealMenu(menu) { return new Promise((resolve) => { gsap.set(menu, { visibility: "visible", pointerEvents: "auto", willChange: "transform, opacity", }); gsap.killTweensOf(menu); gsap.fromTo( menu, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.28, ease: "power3.out", clearProps: "willChange", onComplete: resolve, } ); }); } function hideMenu(menu) { return new Promise((resolve) => { gsap.killTweensOf(menu); gsap.to(menu, { opacity: 0, duration: 0.2, ease: "power2.out", onComplete: () => { gsap.set(menu, { visibility: "hidden", pointerEvents: "none", clearProps: "opacity,scale,willChange", }); resolve(); }, }); }); } // ---------- Per-scope controller ---------- const stateMap = new WeakMap(); // root -> { openMenuEl, openTrigger, isAnimating } function getState(root) { let s = stateMap.get(root); if (!s) { s = { openMenuEl: null, openTrigger: null, isAnimating: false }; stateMap.set(root, s); } return s; } function setTriggersInteractive(root, enabled) { qsaInScope(root, TRIGGER\_SEL).forEach((el) => { el.style.pointerEvents = enabled ? "auto" : "none"; }); } // ---------- Button fade animations ---------- function fadeOutButtons(root) { return new Promise((resolve) => { const buttons = qsaInScope(root, TRIGGER\_SEL); if (buttons.length === 0) { resolve(); return; } gsap.killTweensOf(buttons); gsap.to(buttons, { autoAlpha: 0, duration: 0.2, ease: "power2.out", onComplete: resolve, }); }); } function fadeInButtons(root) { return new Promise((resolve) => { const buttons = qsaInScope(root, TRIGGER\_SEL); if (buttons.length === 0) { resolve(); return; } gsap.killTweensOf(buttons); gsap.to(buttons, { autoAlpha: 1, duration: 0.2, ease: "power2.out", onComplete: resolve, }); }); } async function openMenuIn(root, menu, trigger) { const s = getState(root); if (s.isAnimating || s.openMenuEl === menu) return; s.isAnimating = true; // close any currently open in THIS scope only if (s.openMenuEl && s.openMenuEl !== menu) { await hideMenu(s.openMenuEl); if (s.openTrigger) s.openTrigger.setAttribute("aria-expanded", "false"); } // Fade out buttons when opening menu await fadeOutButtons(root); await revealMenu(menu); s.openMenuEl = menu; s.openTrigger = trigger || null; if (s.openTrigger) s.openTrigger.setAttribute("aria-expanded", "true"); // Disable only this scope's triggers while open setTriggersInteractive(root, false); s.isAnimating = false; } async function closeMenuIn(root) { const s = getState(root); if (!s.openMenuEl || s.isAnimating) return; s.isAnimating = true; deployClickShield(280); // prevent click-through during closing await hideMenu(s.openMenuEl); if (s.openTrigger) s.openTrigger.setAttribute("aria-expanded", "false"); s.openMenuEl = null; s.openTrigger = null; // Re-enable only this scope's triggers setTriggersInteractive(root, true); // Fade in buttons when closing menu await fadeInButtons(root); s.isAnimating = false; } // ---------- Initializer ---------- const initedRoots = new WeakSet(); function initScope(root) { if (!root || initedRoots.has(root)) return; initedRoots.add(root); if (!window.gsap) { console.warn("GSAP is required for prompt menus."); return; } // Normalize ALL menus in this scope to hidden on init (prevents “open on load” bugs) qsaInScope(root, \`\[${MENU\_ATTR}\]\`).forEach((menu) => { if (menu.dataset.pmMenuInit) return; menu.dataset.pmMenuInit = "true"; gsap.set(menu, { visibility: "hidden", opacity: 0, scale: 1, pointerEvents: "none", }); // Optional close button const closer = menu.querySelector(CLOSE\_SEL); if (closer) { if (closer.tagName === "BUTTON" && !closer.hasAttribute("type")) closer.type = "button"; closer.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); closeMenuIn(root); }); } // Menu item -> Claude menu.addEventListener("click", (e) => { const target = e.target.closest(ACTION\_SEL); if (!target || !menu.contains(target)) return; const container = target.closest(ITEM\_SEL) || target; const hiddenP = container.querySelector("\[data-prompt-menu-text\]"); if (!hiddenP) return; e.preventDefault(); e.stopPropagation(); const text = hiddenP.textContent || hiddenP.innerText || ""; openClaude(text); // close after action closeMenuIn(root); }); }); // Bind triggers (auto-wire) qsaInScope(root, TRIGGER\_SEL).forEach((trigger) => { if (trigger.dataset.pmTrigInit) return; trigger.dataset.pmTrigInit = "true"; const menu = resolveMenuForTrigger(root, trigger); if (menu) ensurePairing(trigger, menu); trigger.setAttribute("aria-expanded", "false"); trigger.addEventListener("click", async (e) => { e.preventDefault(); const targetMenu = resolveMenuForTrigger(root, trigger); if (!targetMenu) return; const s = getState(root); if (s.openMenuEl === targetMenu) { await closeMenuIn(root); // toggle close return; } await openMenuIn(root, targetMenu, trigger); }); }); // Outside click (this scope only) document.addEventListener("click", (e) => { const s = getState(root); if (!s.openMenuEl) return; const insideMenu = s.openMenuEl.contains(e.target); const onTrigger = !!e.target.closest(TRIGGER\_SEL) && root.contains(e.target); if (!insideMenu && !onTrigger) closeMenuIn(root); }); // ESC (this scope only) document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenuIn(root); }); } // ---------- Boot + observe ---------- function boot(container = document) { const roots = container.querySelectorAll ? container.querySelectorAll(ROOT\_SEL) : \[\]; roots.forEach(initScope); } if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", () => boot(), { once: true, }); } else { boot(); } const mo = new MutationObserver((muts) => { for (const m of muts) { for (const node of m.addedNodes || \[\]) { if (node.nodeType !== 1) continue; if (node.matches && node.matches(ROOT\_SEL)) initScope(node); if (node.querySelectorAll) { node.querySelectorAll(ROOT\_SEL).forEach(initScope); } } } }); mo.observe(document.documentElement, { childList: true, subtree: true }); })();

(function () { // ---------- Claude helper ---------- function buildClaudeUrl(text) { const url = new URL('https://claude.ai/new'); url.searchParams.set('q', text || ''); return url.toString(); } // ---------- Auto-grow helpers ---------- function sizeTextarea(el) { // Ensure UA defaults don't force a starting height el.setAttribute('rows', el.getAttribute('data-min-rows') || '1'); el.style.minHeight = '0px'; el.style.height = 'auto'; // allow shrink el.style.height = el.scrollHeight + 'px'; // fit content } function initAutogrow(root = document) { root.querySelectorAll('textarea\[data-autogrow\]').forEach((el) => { if (el.dataset.autogrowInit) return; el.dataset.autogrowInit = 'true'; // Respect your existing pattern for default text const preset = el.getAttribute('data-default-text'); if (preset != null && !el.value) el.value = preset; // Initial sizing sizeTextarea(el); // Resize as you type el.addEventListener('input', () => sizeTextarea(el)); // In case fonts/styles load late and change line-height window.addEventListener('load', () => sizeTextarea(el), { once: true }); }); } // ---------- Claude form initializer ---------- function initClaudeForms(root = document) { root.querySelectorAll('form\[data-claude-form\]').forEach((form) => { if (form.dataset.claudeInit) return; form.dataset.claudeInit = 'true'; const textarea = form.querySelector('\[data-claude-textarea\], textarea'); const trigger = form.querySelector('\[data-claude-button\], button\[type="button"\], a\[data-claude-button\]'); if (!textarea || !trigger) { console.warn('Claude form: missing textarea or trigger in', form); return; } // If the trigger is a <button> but has no type, force "button" so it won't submit if (trigger.tagName === 'BUTTON' && !trigger.hasAttribute('type')) { trigger.type = 'button'; } // Keep <a> from navigating away while still opening Claude if (trigger.tagName === 'A') { trigger.addEventListener('click', (e) => e.preventDefault()); } // Optional: support data-default-text on the textarea const preset = textarea.getAttribute('data-default-text'); if (preset != null && !textarea.value) textarea.value = preset; // Click opens Claude; submission is optional trigger.addEventListener('click', () => { const text = (textarea.value || '').trim(); if (!text) { textarea.focus(); return; } window.open(buildClaudeUrl(text), '\_blank', 'noopener'); const mode = form.getAttribute('data-claude-mode') || 'intercept'; if (mode === 'also') { // Submit after opening Claude form.submit(); } // intercept mode: do nothing (no submit) }); // (Optional) Keep an <a data-claude-button> href in sync for right-click/open-in-new-tab UX if (trigger.tagName === 'A') { const syncHref = () => trigger.setAttribute('href', buildClaudeUrl((textarea.value || '').trim())); syncHref(); textarea.addEventListener('input', syncHref); textarea.addEventListener('change', syncHref); } }); } // ---------- Boot ---------- function initAll(root = document) { initAutogrow(root); initClaudeForms(root); } if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', () => initAll(), { once: true }); } else { initAll(); } // Re-init if content is injected later (Webflow CMS / IX / tabs) const mo = new MutationObserver((muts) => { for (const m of muts) { for (const node of m.addedNodes || \[\]) { if (node.nodeType === 1) initAll(node); } } }); mo.observe(document.documentElement, { childList: true, subtree: true }); })();

.prompt\_menu\_item { transition: border-color 0.2s ease, color 0.2s ease; } .prompt\_menu\_item\_base, .prompt\_menu\_item\_icon { transition: opacity 0.2s ease; } .prompt\_menu\_list .prompt\_menu\_item:first-child { border-color: transparent; } .prompt\_menu\_item:hover { border-color: transparent; color: var(--\_theme---foreground-primary); } .prompt\_menu\_item:hover .prompt\_menu\_item\_base { opacity: 1; } .prompt\_menu\_item:hover .prompt\_menu\_item\_icon { opacity: 1; } .prompt\_menu\_item:hover + .prompt\_menu\_item { border-top-color: transparent; } .button\_prompt\_icon { transition: color 0.3s ease; } .button\_prompt\_wrap:hover .button\_prompt\_icon { color: var(--\_button-style---icon-hover); } .button\_prompt\_wrap:focus-within .button\_prompt\_icon { color: var(--\_button-style---text-hover) !important; } .button\_prompt\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

Write

[Button Text](#)Button Text

Learn

[Button Text](#)Button Text

Code

[Button Text](#)Button Text

Write

-   Help me develop a unique voice for an audience
    
    [](#)
    
    Hi Claude! Could you help me develop a unique voice for an audience? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational.  
      
    Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!
    
-   Improve my writing style
    
    [](#)
    
    Hi Claude! Could you improve my writing style? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational.  
      
    Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!
    
-   Brainstorm creative ideas
    
    [](#)
    
    Hi Claude! Could you brainstorm creative ideas? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational.  
      
    Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!
    

Learn

-   Explain a complex topic simply
    
    [](#)
    
    Hi Claude! Could you explain a complex topic simply? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational.  
      
    Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!
    
-   Help me make sense of these ideas
    
    [](#)
    
    Hi Claude! Could you help me make sense of these ideas? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational.  
      
    Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!
    
-   Prepare for an exam or interview
    
    [](#)
    
    Hi Claude! Could you prepare for an exam or interview? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational.  
      
    Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!
    

Code

-   Explain a programming concept
    
    [](#)
    
    Hi Claude! Could you explain a programming concept? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational.  
      
    Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!
    
-   Look over my code and give me tips
    
    [](#)
    
    Hi Claude! Could you look over my code and give me tips? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational.  
      
    Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!
    
-   Vibe code with me
    
    [](#)
    
    Hi Claude! Could you vibe code with me? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to— like Google Drive, web search, etc.—if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational.  
      
    Please execute the task as soon as you can—an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!
    

More

-   Write case studies
    
    [](#)
    
    This is another test
    
-   Write grant proposals
    
    [](#)
    
    Hi Claude! Could you write grant proposals? If you need more information from me, ask me 1-2 key questions right away. If you think I should upload any documents that would help you do a better job, let me know. You can use the tools you have access to — like Google Drive, web search, etc. — if they’ll help you better accomplish this task. Do not use analysis tool. Please keep your responses friendly, brief and conversational.  
      
    Please execute the task as soon as you can - an artifact would be great if it makes sense. If using an artifact, consider what kind of artifact (interactive, visual, checklist, etc.) might be most helpful for this specific task. Thanks for your help!
    
-   Write video scripts
    
    [](#)
    
    this is a test
    

[Anthropic](https://www.anthropic.com/)Anthropic

© \[year\] Anthropic PBC

Products

-   Claude
    
    [Claude](/product/overview)Claude
    
-   Claude Code
    
    [Claude Code](/product/claude-code)Claude Code
    
-   Claude Code for Enterprise
    
    [Claude Code for Enterprise](/product/claude-code/enterprise)Claude Code for Enterprise
    
-   Claude Cowork
    
    [Claude Cowork](/product/cowork)Claude Cowork
    
-   Claude Security
    
    [Claude Security](/product/claude-security)Claude Security
    
-   Pro plan
    
    [Pro plan](/pricing/pro)Pro plan
    
-   Max plan
    
    [Max plan](/pricing/max)Max plan
    
-   Team plan
    
    [Team plan](/pricing/team)Team plan
    
-   Enterprise plan
    
    [Enterprise plan](/pricing/enterprise)Enterprise plan
    
-   Download app
    
    [Download app](/download)Download app
    
-   Pricing
    
    [Pricing](/pricing)Pricing
    
-   Log in
    
    [Log in](https://claude.ai/login)Log in
    

Features

-   Claude for Chrome
    
    [Claude for Chrome](/claude-for-chrome)Claude for Chrome
    
-   Claude for Slack
    
    [Claude for Slack](/claude-for-slack)Claude for Slack
    
-   Claude for Microsoft 365
    
    [Claude for Microsoft 365](/claude-for-microsoft-365)Claude for Microsoft 365
    
-   Skills
    
    [Skills](/skills)Skills
    

Models

-   Mythos Preview
    
    [Mythos Preview](https://www.anthropic.com/glasswing)Mythos Preview
    
-   Opus
    
    [Opus](https://www.anthropic.com/claude/opus)Opus
    
-   Sonnet
    
    [Sonnet](https://www.anthropic.com/claude/sonnet)Sonnet
    
-   Haiku
    
    [Haiku](https://www.anthropic.com/claude/haiku)Haiku
    

Solutions

-   AI agents
    
    [AI agents](/solutions/agents)AI agents
    
-   Code modernization
    
    [Code modernization](/solutions/code-modernization)Code modernization
    
-   Coding
    
    [Coding](/solutions/coding)Coding
    
-   Customer support
    
    [Customer support](/solutions/customer-support)Customer support
    
-   Education
    
    [Education](/solutions/education)Education
    
-   Financial services
    
    [Financial services](/solutions/financial-services)Financial services
    
-   Government
    
    [Government](/solutions/government)Government
    
-   Healthcare
    
    [Healthcare](/solutions/healthcare)Healthcare
    
-   Legal
    
    [Legal](/solutions/legal)Legal
    
-   Life sciences
    
    [Life sciences](/solutions/life-sciences)Life sciences
    
-   Nonprofits
    
    [Nonprofits](/solutions/nonprofits)Nonprofits
    
-   Security
    
    [Security](/solutions/security)Security
    
-   Small business
    
    [Small business](/solutions/small-business)Small business
    

Claude Platform

-   Overview
    
    [Overview](/platform/api)Overview
    
-   Developer docs
    
    [Developer docs](https://platform.claude.com/docs)Developer docs
    
-   Pricing
    
    [Pricing](https://claude.com/pricing#api)Pricing
    
-   Marketplace
    
    [Marketplace](/platform/marketplace)Marketplace
    
-   Claude on AWS
    
    [Claude on AWS](/partners/claude-on-aws)Claude on AWS
    
-   Google Cloud’s Vertex AI
    
    [Google Cloud’s Vertex AI](/partners/google-cloud-vertex-ai)Google Cloud’s Vertex AI
    
-   Microsoft Foundry
    
    [Microsoft Foundry](/partners/microsoft-foundry)Microsoft Foundry
    
-   Regional compliance
    
    [Regional compliance](/regional-compliance)Regional compliance
    
-   Console login
    
    [Console login](https://platform.claude.com/)Console login
    

Resources

-   Blog
    
    [Blog](/blog)Blog
    
-   Claude partner network
    
    [Claude partner network](/partners)Claude partner network
    
-   Community
    
    [Community](/community)Community
    
-   Connectors
    
    [Connectors](/connectors)Connectors
    
-   Courses
    
    [Courses](https://www.anthropic.com/learn)Courses
    
-   Customer stories
    
    [Customer stories](/customers)Customer stories
    
-   Engineering at Anthropic
    
    [Engineering at Anthropic](https://www.anthropic.com/engineering)Engineering at Anthropic
    
-   Events
    
    [Events](https://www.anthropic.com/events)Events
    
-   Plugins
    
    [Plugins](/plugins)Plugins
    
-   Powered by Claude
    
    [Powered by Claude](/partners/powered-by-claude)Powered by Claude
    
-   Service partners
    
    [Service partners](/partners/services)Service partners
    
-   Startups program
    
    [Startups program](/programs/startups)Startups program
    
-   Tutorials
    
    [Tutorials](/resources/tutorials)Tutorials
    
-   Use cases
    
    [Use cases](/resources/use-cases)Use cases
    

Company

-   Anthropic
    
    [Anthropic](https://www.anthropic.com/)Anthropic
    
-   Careers
    
    [Careers](https://www.anthropic.com/careers)Careers
    
-   Economic Futures
    
    [Economic Futures](https://www.anthropic.com/economic-futures)Economic Futures
    
-   Research
    
    [Research](https://www.anthropic.com/research)Research
    
-   News
    
    [News](https://www.anthropic.com/news)News
    
-   Responsible Scaling Policy
    
    [Responsible Scaling Policy](https://www.anthropic.com/news/announcing-our-updated-responsible-scaling-policy)Responsible Scaling Policy
    
-   Security and compliance
    
    [Security and compliance](https://trust.anthropic.com/)Security and compliance
    
-   Transparency
    
    [Transparency](https://anthropic.com/transparency)Transparency
    

Help and security

-   Availability
    
    [Availability](https://www.anthropic.com/supported-countries)Availability
    
-   Status
    
    [Status](https://status.anthropic.com/)Status
    
-   Support center
    
    [Support center](https://support.claude.com/en/)Support center
    

Terms and policies

-   Privacy choices
    
    /\* Dialog styling \*/ dialog#consent-container { margin: 0; padding: 8px; opacity: 0; transform: translateY(16px); transition: opacity 0.3s ease-out, transform 0.3s ease-out; } dialog#consent-container.show { opacity: 1; transform: translateY(0); } dialog#consent-container::backdrop { background: transparent; } dialog button span { display: inline !important; } /\* Toggle switch styling \*/ .toggle\_switch { position: relative; display: inline-block; width: 36px; height: 24px; } .toggle\_switch input { opacity: 0; width: 0; height: 0; } .toggle\_slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #87867f; transition: .4s; border-radius: 24px; } .toggle\_slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; } input:checked + .toggle\_slider { background-color: #d97757; } input:checked + .toggle\_slider:before { transform: translateX(12px); } input:disabled + .toggle\_slider { cursor: not-allowed; opacity: 0.5; } @media only screen and (max-width: 501px) { dialog#consent-container { left: 8px !important; bottom: 8px !important; right: 8px !important; } #consent-banner { padding: 24px 16px 16px !important; } #simple-options { grid-template-columns: repeat(3, 1fr) !important; grid-template-rows: auto auto !important; } #customize-btn { grid-column: span 1 !important; } dialog button span { display: none !important; }
    
    ### Cookie settings
    
    We use cookies to deliver and improve our services, analyze site usage, and if you agree, to customize or personalize your experience and market our services to you. You can read our Cookie Policy [here](https://www.anthropic.com/legal/cookies).
    
    Customize cookie settings Reject all cookies Accept all cookies
    
    ###### Necessary
    
    Enables security and basic functionality.
    
    Required 
    
    ###### Analytics
    
    Enables tracking of site performance.
    
    Off 
    
    ###### Marketing
    
    Enables ads personalization and tracking.
    
    Off 
    
    Save preferences
    
-   Privacy policy
    
    [Privacy policy](https://www.anthropic.com/legal/privacy)Privacy policy
    
-   Responsible disclosure policy
    
    [Responsible disclosure policy](https://www.anthropic.com/responsible-disclosure-policy)Responsible disclosure policy
    
-   Terms of service: Commercial
    
    [Terms of service: Commercial](https://www.anthropic.com/legal/commercial-terms)Terms of service: Commercial
    
-   Terms of service: Consumer
    
    [Terms of service: Consumer](https://www.anthropic.com/legal/consumer-terms)Terms of service: Consumer
    
-   Usage policy
    
    [Usage policy](https://www.anthropic.com/legal/aup)Usage policy
    

[x.com](https://x.com/claudeai)x.com

[LinkedIn](https://www.linkedin.com/showcase/claude/)LinkedIn

[YouTube](https://www.youtube.com/@anthropic-ai)YouTube

[Instagram](https://www.instagram.com/claudeai)Instagram

English (US)

[English (US)](/resources/tutorials/using-the-scholar-gateway-connector-in-claude)

[日本語 (Japan)](/ja)

[Deutsch (Germany)](/de)

[Français (France)](/fr)

[한국어 (South Korea)](/ko)

function initDynamicCurrentYear() { const currentYear = new Date().getFullYear(); const currentYearElements = document.querySelectorAll('\[data-current-year\]'); currentYearElements.forEach(currentYearElement => { currentYearElement.textContent = currentYear; }); } // Initialize Dynamic Current Year document.addEventListener('DOMContentLoaded', () => { initDynamicCurrentYear(); });

gsap.registerPlugin(ScrollTrigger,SplitText,TextPlugin,Flip,Draggable,InertiaPlugin); /\*\* \* claude-animations.js \* GSAP-powered animations for claude.com \* \* Contains: \* - Page transitions & hero animations \* - Heading animations (scroll-triggered) \* - Columns & cards animations \* - Artifact toggle & metadata animations \* \* Dependencies: GSAP, SplitText, ScrollTrigger, jQuery \*/ function isValidSameOriginUrl(urlString) { if (!urlString || typeof urlString !== 'string') { return false; } try { // Use URL constructor for safe parsing const url = new URL(urlString, window.location.origin); // Only allow http and https protocols if (!\['http:', 'https:'\].includes(url.protocol)) { return false; } // Only allow same origin if (url.origin !== window.location.origin) { return false; } return true; } catch (e) { // Invalid URL format return false; } } document.addEventListener('DOMContentLoaded', () => { // PRE-INITIALIZE SplitText BEFORE any animations run // This prevents layout thrashing during animation frames const heroData = \[\]; document.querySelectorAll('\[data-animate-hero-wrap\]').forEach((hero) => { const heading = hero.querySelector('\[data-animate-hero-heading\]'); const text = hero.querySelector('\[data-animate-hero-text\]'); const cta = hero.querySelector('\[data-animate-hero-cta\]'); const visual = hero.querySelectorAll('\[data-animate-hero-visual\]'); let split = null; if (heading) { const targetElement = heading.children.length > 0 ? heading.children : heading; split = SplitText.create(targetElement, { type: 'words', wordsClass: 'word', }); // Set initial state immediately (batch DOM writes) if (split.words && split.words.length > 0) { gsap.set(split.words, { autoAlpha: 0 }); } } heroData.push({ hero, heading, text, cta, visual, split }); }); // Force a single reflow before animations start document.body.offsetHeight; // HERO ANIMATION FUNCTION - uses pre-split text (no DOM modification) function animateHero() { heroData.forEach(({ hero, text, cta, visual, split }) => { const heroTl = gsap.timeline(); // Animate pre-split words (no DOM modification here) if (split && split.words && split.words.length > 0) { heroTl.to(split.words, { autoAlpha: 1, duration: 1, ease: 'power2.out', stagger: { amount: 0.2 }, }); } // Animate text if (text) { heroTl.from( text, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+30%', ); } // Animate CTA if (cta) { heroTl.from( cta, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+25%', ); } // Animate Visual if (visual && visual.length) { heroTl.from( visual, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<', ); } gsap.set(hero, { visibility: 'visible' }); return heroTl; }); } // PAGE LOAD SEQUENCE let tl = gsap.timeline(); // Only animate elements that exist on the page const transitionWrap = document.querySelector('.transition\_wrap'); const navWrap = document.querySelector('.nav\_wrap'); const navSecondaryWrap = document.querySelector('.nav\_secondary\_wrap'); const pageMain = document.querySelector('.page\_main'); if (transitionWrap) { tl.to(transitionWrap, { autoAlpha: 0, duration: 1, ease: 'none' }); } if (navWrap) { tl.from(navWrap, { autoAlpha: 0, y: -20, duration: 1, ease: 'power2.out' }, transitionWrap ? '>-50%' : 0); } if (navSecondaryWrap) { tl.from(navSecondaryWrap, { autoAlpha: 0, y: -20, duration: 1, ease: 'power2.out' }, '<'); } // Only animate hero if one exists on the page if (heroData.length > 0) { tl.add(() => animateHero(), '<+25%'); // Animate main wrapper excluding hero section if (pageMain) { const nonHeroChildren = pageMain.querySelectorAll(':scope > \*:not(\[data-animate-hero-wrap\])'); if (nonHeroChildren.length > 0) { tl.from( nonHeroChildren, { autoAlpha: 0, y: 20, duration: 1, ease: 'power2.out', }, '>-20%', ); } } } else if (pageMain) { // Animate entire main wrapper if no hero exists tl.from( pageMain, { autoAlpha: 0, y: 20, duration: 1, ease: 'power2.out', }, '>-50%', ); } if (transitionWrap) { tl.set(transitionWrap, { display: 'none' }); } // LINK CLICK TRANSITIONS $('a:not(.ignore-transition)').on('click', function (e) { // Let browser handle new-tab/window behaviors if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.which === 2 || e.button === 1) { return; } let currentUrl = $(this).attr('href'); if ($(this).prop('hostname') === window.location.host && !currentUrl.includes('#') && $(this).attr('target') !== '\_blank') { // SECURITY: Validate URL before navigation to prevent injection attacks if (!isValidSameOriginUrl(currentUrl)) { console.warn('Navigation blocked: Invalid or unsafe URL', currentUrl); return; } e.preventDefault(); let tl = gsap.timeline({ onComplete: () => (window.location.href = currentUrl) }); // nosemgrep: unsafe-url-manipulation if (transitionWrap) { tl.set(transitionWrap, { display: 'block' }); tl.fromTo(transitionWrap, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.75, ease: 'none' }); } } }); // BACK BUTTON HANDLING window.onpageshow = function (event) { if (event.persisted) window.location.reload(); }; }); /\* Heading Animation \*/ document.addEventListener('DOMContentLoaded', () => { const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; if (prefersReducedMotion) { return; } document.querySelectorAll('\[data-animate-header-wrap\]').forEach((header) => { const heading = header.querySelector('\[data-animate-header-heading\]'); const text = header.querySelector('\[data-animate-header-text\]'); const cta = header.querySelector('\[data-animate-header-cta\]'); const tl = gsap.timeline({ scrollTrigger: { trigger: header, start: 'top bottom', end: 'top 80%', toggleActions: 'none play none reset', }, }); // Animate heading with split text if (heading && heading.children.length > 0) { const split = SplitText.create(heading.children, { type: 'words', wordsClass: 'word', }); if (split.words && split.words.length > 0) { tl.from(split.words, { autoAlpha: 0, duration: 1, ease: 'power2.out', stagger: { amount: 0.2 }, }); } } // Animate text if (text) { tl.from( text, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+30%', ); } // Animate CTA if (cta) { tl.from( cta, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+25%', ); } }); }); /\* Columns & Cards Animation \*/ document.addEventListener('DOMContentLoaded', () => { const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; if (prefersReducedMotion) { return; } document.querySelectorAll('\[data-animate-card-wrap\]').forEach((cardWrap) => { const cards = cardWrap.querySelectorAll('\[data-animate-card-card\]'); // NodeList is always truthy, so check length instead if (cards.length === 0) return; const tl = gsap.timeline({ scrollTrigger: { trigger: cardWrap, start: 'top bottom', end: 'top 70%', toggleActions: 'none play none none', }, }); tl.from(cards, { autoAlpha: 0, y: 20, duration: 0.75, stagger: { each: 0.1 }, ease: 'power2.out', }); }); }); /\* Combined Artifact Toggle & Metadata Animation \*/ document.addEventListener('DOMContentLoaded', () => { // Configuration const TOGGLE\_ENABLED = true; // Set to false to disable toggle functionality // Initially hide all artifact\_metadata elements for animation const style = document.createElement('style'); style.textContent = \`.artifact\_metadata { opacity: 0; transform: translateY(32px); }\`; document.head.appendChild(style); // Track which columns have been animated and which have toggles const animatedColumns = new Set(); const toggleManagedColumns = new Set(); // ============================================ // METADATA ANIMATION FUNCTIONALITY // ============================================ // Function to animate metadata items function animateMetadata(column) { // Skip if already animated or if this column is toggle-managed and hidden if (animatedColumns.has(column)) return; if (toggleManagedColumns.has(column) && column.style.display === 'none') return; const metadataItems = column.querySelectorAll('.artifact\_metadata'); if (metadataItems.length > 0) { animatedColumns.add(column); gsap.fromTo( metadataItems, { opacity: 0, y: 32, }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.2, }, ); } } // Intersection Observer for viewport visibility const observer = new IntersectionObserver( (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { // Only animate if not hidden by toggle if (!toggleManagedColumns.has(entry.target) || entry.target.style.display !== 'none') { animateMetadata(entry.target); } } }); }, { threshold: 0.5, rootMargin: '0px 0px -80px 0px', }, ); // ============================================ // TOGGLE FUNCTIONALITY // ============================================ if (TOGGLE\_ENABLED) { const toggleButtons = document.querySelectorAll('.artifact\_toggle'); const MOBILE\_BREAKPOINT = 768; // Adjust as needed toggleButtons.forEach((button) => { const container = button.closest('.artifact\_component\_wrap') || button.parentElement; const metadataColumn = container.querySelector('.artifact\_column\_metadata'); const contentColumn = container.querySelector('.artifact\_column\_content'); if (!metadataColumn || !contentColumn) return; // Check if this is variant 1-1 (toggle always visible) const artifactWrapper = button.closest('\[data-wf--artifact-wrapper--variant\]'); const isVariant11 = artifactWrapper?.getAttribute('data-wf--artifact-wrapper--variant') === '1-1'; // Mark this metadata column as toggle-managed toggleManagedColumns.add(metadataColumn); // Track current state let showingContent = true; // Helper function to check if we're on mobile function isMobile() { return window.innerWidth <= MOBILE\_BREAKPOINT; } // Helper function to check if toggle should be active function shouldToggleBeActive() { // Toggle is active if: // 1. It's variant 1-1 (always active), OR // 2. We're on mobile/tablet return isVariant11 || isMobile(); } // Helper function to update button text function updateButtonText(newText) { const walker = document.createTreeWalker( button, NodeFilter.SHOW\_TEXT, { acceptNode: function (node) { return node.textContent.trim() ? NodeFilter.FILTER\_ACCEPT : NodeFilter.FILTER\_REJECT; }, }, false, ); let textNode; while ((textNode = walker.nextNode())) { textNode.textContent = newText; break; } } // Set initial states based on viewport and variant function initializeToggleState() { if (shouldToggleBeActive()) { // Toggle is active: Hide metadata initially gsap.set(metadataColumn, { display: 'none', opacity: 0, y: -24, }); gsap.set(contentColumn, { display: 'flex', opacity: 1, y: 0, }); updateButtonText('View prompt'); showingContent = true; button.style.display = ''; // Show toggle button (let CSS control it) } else { // Toggle not active: Show both columns, hide toggle button gsap.set(\[metadataColumn, contentColumn\], { clearProps: 'display,opacity,y', }); button.style.display = 'none'; // Hide toggle button // Reset the state flag showingContent = true; // Trigger metadata animation if in viewport and not yet animated if (!animatedColumns.has(metadataColumn)) { // Check if already in viewport const rect = metadataColumn.getBoundingClientRect(); const inViewport = rect.top < window.innerHeight && rect.bottom > 0; if (inViewport && metadataColumn.offsetParent !== null) { animateMetadata(metadataColumn); } } } } // Toggle animation function button.addEventListener('click', () => { if (!shouldToggleBeActive()) return; // Safety check if (showingContent) { // Switch to metadata/prompt view gsap.to(contentColumn, { opacity: 0, y: 24, duration: 0.3, ease: 'power2.inOut', onComplete: () => { gsap.set(contentColumn, { display: 'none' }); }, }); gsap.set(metadataColumn, { display: 'flex' }); // Check if metadata needs initial animation if (!animatedColumns.has(metadataColumn)) { // First time showing - animate the metadata items animateMetadata(metadataColumn); // Also animate the column itself gsap.fromTo( metadataColumn, { opacity: 0, y: -24, }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.15, }, ); } else { // Already animated before - just show it gsap.fromTo( metadataColumn, { opacity: 0, y: -24, }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.15, }, ); } updateButtonText('View result'); showingContent = false; } else { // Switch back to content view gsap.to(metadataColumn, { opacity: 0, y: -24, duration: 0.3, ease: 'power2.inOut', onComplete: () => { gsap.set(metadataColumn, { display: 'none' }); }, }); gsap.set(contentColumn, { display: 'flex' }); gsap.fromTo( contentColumn, { opacity: 0, y: 24, }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.15, }, ); updateButtonText('View prompt'); showingContent = true; } }); // Initialize toggle state initializeToggleState(); // Handle resize events let resizeTimer; window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { initializeToggleState(); }, 250); }); }); } // ============================================ // OBSERVE ALL COLUMNS // ============================================ // Observe all artifact columns for animation const artifactColumns = document.querySelectorAll('.artifact\_column\_metadata'); artifactColumns.forEach((column) => { observer.observe(column); }); // ============================================ // TAB & SLIDER LISTENERS // ============================================ // Tab activation listener document.addEventListener('click', (e) => { const tab = e.target.closest('\[role="tab"\], .tab-button, .w-tab-link, \[data-w-tab\]'); if (tab) { setTimeout(() => { document.querySelectorAll('.artifact\_column\_metadata').forEach((column) => { // Check if column is visible and not toggle-hidden if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) { animateMetadata(column); } }); }, 100); } }); // Slider change listener document.addEventListener('click', (e) => { const sliderControl = e.target.closest('\[data-aside-prev\], \[data-aside-next\], \[data-aside-dot\], .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet'); if (sliderControl) { setTimeout(() => { document.querySelectorAll('.artifact\_column\_metadata').forEach((column) => { if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) { animateMetadata(column); } }); }, 300); } }); // Swiper events if (typeof Swiper !== 'undefined') { document.querySelectorAll('.swiper').forEach((swiperEl) => { const swiper = swiperEl.swiper; if (swiper) { swiper.on('slideChange', () => { setTimeout(() => { document.querySelectorAll('.artifact\_column\_metadata').forEach((column) => { if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) { animateMetadata(column); } }); }, 100); }); } }); } }); document.addEventListener('DOMContentLoaded', function() { const contentElement = document.querySelector('\[data-readtime="content"\]'); const minutesElement = document.querySelector('\[data-readtime="minutes"\]'); if (!contentElement || !minutesElement) return; const text = contentElement.innerText || contentElement.textContent; const wordCount = text.trim().split(/\\s+/).length; const wordsPerMinute = 250; const minutes = Math.round(wordCount / wordsPerMinute); minutesElement.textContent = minutes || 1; // minimum 1 minute }); // Hide all empty paragraph tags from the main content RTF document.querySelectorAll('#tutorial\_content p').forEach(p => { if (p.textContent.trim() === '' || /^\[\\u200B-\\u200D\\uFEFF\]+$/.test(p.textContent)) { p.remove(); } });