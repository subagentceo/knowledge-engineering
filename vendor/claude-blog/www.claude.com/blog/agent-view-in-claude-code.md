Agent view in Claude Code | Claude!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);.anti-flicker, .anti-flicker \* {visibility: hidden !important; opacity: 0 !important;}\[data-wf-hidden-variation\], \[data-wf-hidden-variation\] \* { display: none !important; }         html:not(.gsap-not-found) \[data-prevent-flicker='true'\] { visibility: hidden; } .line-mask, .word-mask, .char-mask { padding-block: 0.1em; margin-block: -0.1em; }

\[data-prevent-flicker='true'\] { visibility: visible !important; }

.transition\_wrap { display: block; } // Hide the transition\_wrap in Webflow preview mode w/ custom code enabled if (window.location.hostname.includes('.canvas.webflow.com')) { document.write('<style>.transition\_wrap{display:none!important}\[data-prevent-flicker="true"\]{visibility:visible!important}</style>'); } { "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Agent view in Claude Code", "description": "Today we&#39;re introducing agent view in Claude Code: one place to manage all your Claude Code sessions. ", "image": "https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6905132a0adf3c61b0f13515\_og\_claude-powered-artifacts.jpg", "publisher": { "@id": "https://claude.com/#organization" }, "datePublished": "May 11, 2026", "dateModified": "May 11, 2026", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://claude.com/blog/agent-view-in-claude-code" } }

:root { --grid-breakout: \[full-start\] minmax(0, 1fr) \[content-start\] repeat(var(--\_grid---column-count), minmax(0, var(--\_grid---column-width))) \[content-end\] minmax(0, 1fr) \[full-end\]; --grid-breakout-single: \[full-start\] minmax(0, 1fr) \[content-start\] minmax(0, calc(100% - var(--site--margin) \* 2)) \[content-end\] minmax(0, 1fr) \[full-end\]; } ::before, ::after { box-sizing: border-box; } .w-embed:before, .w-embed:after, .w-richtext:before, .w-richtext:after { content: unset; } html { background-color: var(--\_theme---background); } button { background-color: unset; padding: unset; text-align: inherit; } button:not(:disabled) { cursor: pointer; } video { width: 100%; object-fit: cover; } /\* remove padding of empty element \*/ .wf-empty { padding: 0; } svg { max-width: 100%; } @media (prefers-color-scheme: light) { option { color: black; } } img::selection { background: transparent; } /\* Typography \*/ body { text-transform: var(--\_text-style---text-transform); font-smoothing: antialiased; -webkit-font-smoothing: antialiased; } /\* Clear Defaults \*/ a:not (\[class\]) { text-decoration: underline;} \[class~="u-rich-text"\] a, \[class~="u-rich-text-cs"\] a, \[class~="u-rich-text-blog"\] a, \[class~="u-rich-text-tutorials"\] a, a.u-rich-text, \[class~="command\_instruction"\] a { transition: color .15s ease-out, text-decoration-color .15s ease-out; text-underline-offset: 3px; text-decoration: underline; color: currentcolor; text-decoration-color: var(--\_theme---border-primary); } \[class~="u-rich-text"\] a:hover, \[class~="u-rich-text-cs"\] a:hover, \[class~="u-rich-text-blog"\] a:hover, \[class~="u-rich-text-tutorials"\] a:hover, a.u-rich-text:hover, \[class~="command\_instruction"\] a:hover { text-decoration-color: var(--\_theme---foreground-primary); color: var(--\_theme---foreground-primary); } h1,h2,h3,h4,h5,h6,p,blockquote,label { font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit; letter-spacing: inherit; text-transform: inherit; text-wrap: inherit; margin-top: 0; margin-bottom: 0; } select:has(option\[value=""\]:checked) { color: color-mix(in lab, currentcolor 60%, transparent) } /\* Selection Color \*/ ::selection { background-color: var(--\_theme---selection--background); color: var(--\_theme---selection--text); } /\* Margin Trim \*/ :is(.u-margin-trim,.u-rich-text) > :not(:not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim) ~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim)), :is(.u-margin-trim,.u-rich-text) > :not(:not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim) ~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim)).u-display-contents > :first-child { margin-top: 0; } :is(.u-margin-trim,.u-rich-text) > :not(:has(~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim))), :is(.u-margin-trim,.u-rich-text) > :not(:has(~ :not(.w-condition-invisible,.u-cover-absolute,.u-ignore-trim))).u-display-contents > :last-child { margin-bottom: 0; } /\* Line Height Trim \*/ :is(h1,h2,h3,h4,h5,h6,p):not(.u-text-trim-off,:has(\[class\*="u-text-style-"\]))::before, \[class\*="u-text-style-"\]:not(.u-text-trim-off,:has(h1,h2,h3,h4,h5,h6,p))::before { content: ""; display: table; margin-bottom: calc(-0.5lh + var(--\_text-style---trim-top)); } :is(h1,h2,h3,h4,h5,h6,p):not(.u-text-trim-off,:has(\[class\*="u-text-style-"\]))::after, \[class\*="u-text-style-"\]:not(.u-text-trim-off,:has(h1,h2,h3,h4,h5,h6,p))::after { content: ""; display: table; margin-bottom: calc(-0.5lh + var(--\_text-style---trim-bottom)); } /\* Rich Text Links \*/ .w-richtext a { position: relative; z-index: 4; } /\* Line Clamp \*/ .u-line-clamp-1, .u-line-clamp-2, .u-line-clamp-3, .u-line-clamp-4 { -webkit-line-clamp: 1; -webkit-box-orient: vertical; } .u-line-clamp-2 { -webkit-line-clamp: 2; } .u-line-clamp-3 { -webkit-line-clamp: 3; } .u-line-clamp-4 { -webkit-line-clamp: 4; } /\* Child Contain \*/ .u-child-contain > \* { width: 100%; max-width: inherit !important; margin-inline: 0 !important; margin-top: 0 !important; } /\* Hide \*/ .u-hide-if-empty:empty, .u-hide-if-empty:not(:has(> :not(.w-condition-invisible))), .u-hide-if-empty-cms:not(:has(.w-dyn-item)), .u-embed-js, .u-embed-css { display: none !important; } /\* Focus State \*/ a, button, :where(\[tabindex\]), \[data-outline\] { outline-offset: var(--focus--offset-outer); } a:focus-visible, button:focus-visible, \[tabindex\]:focus-visible, label:has(input:focus-visible) \[data-outline\] { outline-color: color-mix(in srgb, var(--\_button-style---border) 50%, transparent); outline-width: var(--focus--width); outline-style: solid; } /\* Global / Clickable Component \*/ .wf-design-mode .clickable\_wrap { z-index: 0; } .clickable\_wrap a\[href="#"\] { display: none; } .clickable\_wrap a\[href="#"\] ~ button { display: block; } /\* Responsive Above \*/ @container threshold-large (width >= 62em) { .u-order-unset-above { order: unset !important; } .u-all-unset-above { all: unset !important; } .u-grid-below { display: flex !important; } .u-max-width-unset-above { max-width: unset !important; } .u-width-unset-above { width: unset !important; } .u-hide-above { display: none !important; } } @container threshold-medium (width >= 48em) { .u-order-unset-above { order: unset !important; } .u-all-unset-above { all: unset !important; } .u-grid-below { display: flex !important; } .u-max-width-unset-above { max-width: unset !important; } .u-width-unset-above { width: unset !important; } .u-hide-above { display: none !important; } } @container threshold-small (width >= 30em) { .u-order-unset-above { order: unset !important; } .u-all-unset-above { all: unset !important; } .u-grid-below { display: flex !important; } .u-max-width-unset-above { max-width: unset !important; } .u-width-unset-above { width: unset !important; } .u-hide-above { display: none !important; } } /\* Responsive Below \*/ @container threshold-large (width < 62em) { .u-order-unset-below { order: unset !important; } .u-all-unset-below { all: unset !important; } .u-grid-above { display: flex !important; } .u-max-width-unset-below { max-width: unset !important; } .u-width-unset-below { width: unset !important; } .u-alignment-unset-below { --\_alignment---direction: start; align-self: start; } .u-hide-below { display: none !important; } } @container threshold-medium (width < 48em) { .u-order-unset-below { order: unset !important; } .u-all-unset-below { all: unset !important; } .u-grid-above { display: flex !important; } .u-max-width-unset-below { max-width: unset !important; } .u-width-unset-below { width: unset !important; } .u-alignment-unset-below { --\_alignment---direction: start; align-self: start; } .u-hide-below { display: none !important; } } @container threshold-small (width < 30em) { .u-order-unset-below { order: unset !important; } .u-all-unset-below { all: unset !important; } .u-grid-above { display: flex !important; } .u-max-width-unset-below { max-width: unset !important; } .u-width-unset-below { width: unset !important; } .u-alignment-unset-below { --\_alignment---direction: start; align-self: start; } .u-hide-below { display: none !important; } } /\* Form Radio \*/ .form\_main\_radio\_label:has(input:checked) .form\_main\_radio\_circle\_inner { opacity: 1; } /\* Form Checkbox \*/ .form\_main\_checkbox\_label:has(input:checked) .form\_main\_checkbox\_box { background-color: currentColor; border-color: currentColor; } .form\_main\_checkbox\_label:has(input:checked) .form\_main\_checkbox\_icon { opacity: 1; } /\* State Manager \*/ \[data-state\] { --\_state---true: 1; --\_state---false: 0; } .is-active, \[data-state~="checked"\]:is(:checked, :has(:checked)), \[data-state~="current"\]:is(.w--current, :has(.w--current)), \[data-state~="open"\]:is(.w--open, :has(.w--open)), \[data-state~="expanded"\]:is(\[aria-expanded="true"\], :has(\[aria-expanded="true"\])), \[data-state~="external"\]:is(\[target="\_blank"\], :has(\[target="\_blank"\])) { --\_state---true: 0; --\_state---false: 1; } .wf-design-mode \[data-trigger~="preview"\], \[data-trigger~="focus"\]:is(:focus-visible, :has(:focus-visible)), \[data-trigger~="group"\]:has(\[data-trigger~="focus-other"\]:focus-visible, \[data-trigger~="focus-other"\] :focus-visible) \[data-trigger~="focus-other"\]:not(:focus-visible, :has(:focus-visible)) { --\_trigger---on: 0; --\_trigger---off: 1; } @media (hover: hover) { \[data-button\]:hover, \[data-trigger~="hover"\]:is(a:hover,button:hover,:has(a:hover,button:hover)), \[data-trigger~="group"\]:has(\[data-trigger~="hover-other"\]:hover) \[data-trigger~="hover-other"\]:not(:hover) { --\_trigger---on: 0; --\_trigger---off: 1; } \[data-trigger~="hover-other"\]:hover { --\_trigger---on: 1 !important; --\_trigger---off: 0 !important; } } @media (hover: none) { \[data-trigger~="mobile"\] { --\_trigger---on: 0; --\_trigger---off: 1; } }

code, kbd, pre, samp { font-family: var(--\_typography---font--mono-family); } body \* { scrollbar-width: none; /\* Firefox \*/ -ms-overflow-style: none; /\* IE/Edge Legacy \*/ } body \*::-webkit-scrollbar { display: none; /\* Unreliable \*/ width: 0px; /\* WebKit/Blink \*/ } @media (prefers-color-scheme: dark) { body, .u-theme-ivory, \[data-wf--section--theme='ivory'\] { --\_theme---background-primary: var(--swatch--gray-950); --\_theme---background-secondary: var(--swatch--gray-900); --\_theme---background-tertiary: var(--swatch--gray-850); --\_theme---border-primary: var(--swatch--gray-600); --\_theme---border-secondary: var(--swatch--gray-700); --\_theme---border-tertiary: var(--swatch--gray-750); --\_theme---foreground-primary: var(--swatch--gray-050); --\_theme---foreground-secondary: var(--swatch--gray-400); --\_theme---foreground-tertiary: var(--swatch--gray-500); --\_theme---pictogram-accent: var(--swatch--gray-750); --\_theme---button-primary--background: var(--swatch--gray-050); --\_theme---button-primary--text: var(--swatch--gray-950); --\_theme---button-primary--border: var(--swatch--transparent); --\_theme---button-primary--icon: var(--\_theme---button-primary--text); --\_theme---button-primary--background-hover: var(--\_theme---button-primary--background); --\_theme---button-primary--text-hover: var(--\_theme---button-primary--text); --\_theme---button-primary--border-hover: var(--\_theme---button-primary--border); --\_theme---button-primary--icon-hover: var(--\_theme---background-primary); --\_theme---button-secondary--background: var(--swatch--gray-750); --\_theme---button-secondary--text: var(--swatch--gray-050); --\_theme---button-secondary--border: var(--\_theme---border-secondary); --\_theme---button-secondary--icon: var(--\_theme---button-secondary--text); --\_theme---button-secondary--background-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--text-hover: var(--\_theme---button-secondary--text); --\_theme---button-secondary--border-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--icon-hover: var(--\_theme---foreground-secondary); --\_theme---button-tertiary--background: var(--\_theme---background-primary); --\_theme---button-tertiary--text: var(--swatch--gray-050); --\_theme---button-tertiary--border: var(--\_theme---border-secondary); --\_theme---button-tertiary--icon: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--background-hover: var(--\_theme---button-tertiary--background); --\_theme---button-tertiary--text-hover: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--border-hover: var(--\_theme---button-tertiary--border); --\_theme---button-tertiary--icon-hover: var(--\_theme---foreground-primary); --\_theme---error-text: #df6666; --\_theme---heroes-accent: #c46849; --\_theme---white: var(--\_theme---background-primary); } .u-theme-white, \[data-wf--section--theme='white'\] { --\_theme---background-primary: var(--swatch--gray-850); --\_theme---background-secondary: var(--swatch--gray-800); --\_theme---background-tertiary: var(--swatch--gray-750); --\_theme---border-primary: var(--swatch--gray-550); --\_theme---border-secondary: var(--swatch--gray-650); --\_theme---border-tertiary: var(--swatch--gray-700); --\_theme---foreground-primary: var(--swatch--gray-050); --\_theme---foreground-secondary: var(--swatch--gray-350); --\_theme---foreground-tertiary: var(--swatch--gray-450); --\_theme---pictogram-accent: var(--swatch--gray-700); --\_theme---button-primary--background: var(--swatch--gray-050); --\_theme---button-primary--text: var(--swatch--gray-950); --\_theme---button-primary--border: var(--swatch--transparent); --\_theme---button-primary--icon: var(--\_theme---button-primary--text); --\_theme---button-primary--background-hover: var(--\_theme---button-primary--background); --\_theme---button-primary--text-hover: var(--\_theme---button-primary--text); --\_theme---button-primary--border-hover: var(--\_theme---button-primary--border); --\_theme---button-primary--icon-hover: var(--\_theme---background-primary); --\_theme---button-secondary--background: var(--swatch--gray-700); --\_theme---button-secondary--text: var(--swatch--gray-050); --\_theme---button-secondary--border: var(--\_theme---border-secondary); --\_theme---button-secondary--icon: var(--\_theme---button-secondary--text); --\_theme---button-secondary--background-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--text-hover: var(--\_theme---button-secondary--text); --\_theme---button-secondary--border-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--icon-hover: var(--\_theme---foreground-secondary); --\_theme---button-tertiary--background: var(--\_theme---background-primary); --\_theme---button-tertiary--text: var(--swatch--gray-050); --\_theme---button-tertiary--border: var(--\_theme---border-secondary); --\_theme---button-tertiary--icon: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--background-hover: var(--\_theme---button-tertiary--background); --\_theme---button-tertiary--text-hover: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--border-hover: var(--\_theme---button-tertiary--border); --\_theme---button-tertiary--icon-hover: var(--\_theme---foreground-primary); --\_theme---error-text: #df6666; --\_theme---heroes-accent: #c46849; --\_theme---white: var(--\_theme---background-primary); } .u-theme-neutral-1, \[data-wf--section--theme='neutral-1'\] { --\_theme---background-primary: var(--swatch--gray-800); --\_theme---background-secondary: var(--swatch--gray-750); --\_theme---background-tertiary: var(--swatch--gray-700); --\_theme---border-primary: var(--swatch--gray-500); --\_theme---border-secondary: var(--swatch--gray-600); --\_theme---border-tertiary: var(--swatch--gray-650); --\_theme---foreground-primary: var(--swatch--gray-050); --\_theme---foreground-secondary: var(--swatch--gray-300); --\_theme---foreground-tertiary: var(--swatch--gray-400); --\_theme---pictogram-accent: var(--swatch--gray-650); --\_theme---button-primary--background: var(--swatch--gray-050); --\_theme---button-primary--text: var(--swatch--gray-950); --\_theme---button-primary--border: var(--swatch--transparent); --\_theme---button-primary--icon: var(--\_theme---button-primary--text); --\_theme---button-primary--background-hover: var(--\_theme---button-primary--background); --\_theme---button-primary--text-hover: var(--\_theme---button-primary--text); --\_theme---button-primary--border-hover: var(--\_theme---button-primary--border); --\_theme---button-primary--icon-hover: var(--\_theme---background-primary); --\_theme---button-secondary--background: var(--swatch--gray-650); --\_theme---button-secondary--text: var(--swatch--gray-050); --\_theme---button-secondary--border: var(--\_theme---border-secondary); --\_theme---button-secondary--icon: var(--\_theme---button-secondary--text); --\_theme---button-secondary--background-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--text-hover: var(--\_theme---button-secondary--text); --\_theme---button-secondary--border-hover: var(--\_theme---button-secondary--background); --\_theme---button-secondary--icon-hover: var(--\_theme---foreground-secondary); --\_theme---button-tertiary--background: var(--\_theme---background-primary); --\_theme---button-tertiary--text: var(--swatch--gray-050); --\_theme---button-tertiary--border: var(--\_theme---border-secondary); --\_theme---button-tertiary--icon: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--background-hover: var(--\_theme---button-tertiary--background); --\_theme---button-tertiary--text-hover: var(--\_theme---button-tertiary--text); --\_theme---button-tertiary--border-hover: var(--\_theme---button-tertiary--border); --\_theme---button-tertiary--icon-hover: var(--\_theme---foreground-primary); --\_theme---error-text: #df6666; --\_theme---heroes-accent: #c46849; --\_theme---white: var(--\_theme---background-primary); } .logo\_light { display: none; } .logo\_dark { display: block; } .illustration\_light { display: none; } .illustration\_dark { display: block; } } @media (prefers-color-scheme: light) { .logo\_light { display: block; } .logo\_dark { display: none; } .illustration\_light { display: block; } .illustration\_dark { display: none; } } .u-text-font-mono { --\_text-style---trim-top: var(--\_typography---font--mono-text-trim-top); --\_text-style---trim-bottom: var(--\_typography---font--mono-text-trim-bottom); } .w-richtext li > ul, .w-richtext li > ol { margin-top: 0.75rem; } .u-checklist ul { list-style: none; margin: 0; padding: 0; } .u-checklist ul li { position: relative; padding-left: 2rem; } .u-checklist ul li::before { content: ''; position: absolute; left: 0; top: 0.1em; width: 1.5rem; height: 1.5rem; background-repeat: no-repeat; background-position: center; background-size: contain; background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M18.226%206.13068C18.4439%205.95655%2018.7615%205.95361%2018.9842%206.13888C19.2067%206.32458%2019.2604%206.63728%2019.1283%206.88304L19.0604%206.98382L10.0602%2017.784C9.95233%2017.9133%209.7949%2017.9908%209.62665%2017.9984C9.45844%2018.0059%209.29454%2017.9429%209.17547%2017.8238L4.97541%2013.6237L4.89806%2013.53C4.7446%2013.2971%204.7705%2012.9802%204.97541%2012.7753C5.18032%2012.5704%205.49726%2012.5445%205.73011%2012.698L5.82386%2012.7753L9.55868%2016.5101L18.1393%206.21506L18.226%206.13068Z%22%20fill%3D%22%235E5D59%22/%3E%3C/svg%3E'); } \[class^='card\_'\]\[class$='\_wrap'\] .clickable\_wrap.u-cover-absolute .clickable\_link, \[class^='card\_'\]\[class$='\_wrap'\] .clickable\_wrap.u-cover-absolute .clickable\_btn { outline-offset: var(--focus--offset-inner); } textarea\[data-autogrow\] { overflow-y: hidden; resize: none; height: 1.75rem; min-height: 0; } .btn\_main\_wrap::hover, .btn\_small\_wrap::hover, .btn\_tiny\_wrap::hover, .button\_toggle\_wrap::hover, .btn\_icon\_main\_wrap::hover, .btn\_icon\_small\_wrap::hover, .btn\_icon\_tiny\_wrap::hover { transition: /\* Transition to click/active \*/ box-shadow ease-in-out 100ms, background ease-in-out 100ms, color ease-in-out 50ms; } .btn\_main\_wrap::active, .btn\_small\_wrap::active, .btn\_tiny\_wrap::active, .button\_toggle\_wrap::active, .btn\_icon\_main\_wrap::active, .btn\_icon\_small\_wrap::active, .btn\_icon\_tiny\_wrap::active { transition: /\* Transition to click/active \*/ box-shadow ease-in-out 50ms, background ease-in-out 50ms, color ease-in-out 25ms; } .card\_cs\_grid\_img img { max-width: 60%; max-height: 60%; } @container viewport (width < 30em) { \[data-wf--grid--column-count='4'\]:has(.card\_feature\_wrap) .c-grid { --\_column-count---value: 1; } } @container viewport (min-width: 30em) and (max-width: 62em) { \[data-wf--grid--column-count='4'\]:has(.card\_feature\_wrap) .c-grid { --\_column-count---value: 2; } } /\* Mods for spacing and visibility of embed in accordian content used for schema \*/ .accordion\_content\_text p:has(+ .w-embed.w-script) { margin-bottom: 0; } /\* Absolute inner SVG of lottie to prevent page jump \*/ .heroes\_lottie\_component svg { position: absolute; top: 0; left: 0; } /\* Sticky scroll \*/ @media screen and (min-width: 992px) { .sticky\_image\_link\_wrap:has(.sticky\_image\_link.w--current) { opacity: 1; width: calc((100% - var(--\_grid---gutter)) \* (6 / 12)); } } @media screen and (max-width: 767px) { .c-grid:last-child .sticky\_image\_block, .sticky\_image\_block:last-child { padding: 0; } .c-grid:last-child .sticky\_image\_wrap { margin-bottom: 0; } } #send, #threads, #get-help, #collaborate { display: block; /\* or grid, flex - anything but contents \*/ } /\* Removes padding from the last-item in the Download page cards \*/ .download\_card\_bar\_wrap:last-child { padding-bottom: 0; }

/\* Select text below clickable overlay \*/ html.wf-design-mode .clickable\_wrap { pointer-events: none; }

document.addEventListener("DOMContentLoaded", function () { // ---------------- Config ---------------- const EDGE\_PADDING = 16; // >= 1rem from edges const OFFSET\_Y = 10; // gap under trigger const DIM\_OPACITY = 0.3; const DIM\_EASE\_MS = 350; const CLOSE\_DELAY = 120; const isCoarse = () => matchMedia("(hover: none), (pointer: coarse)").matches; // ---------------- Bubble (single instance) ---------------- function ensureBubble(){ let el = document.querySelector(".tt-bubble"); if (el) return el; el = document.createElement("div"); el.className = "tt-bubble u-theme-white"; el.setAttribute("role","tooltip"); el.setAttribute("aria-hidden","true"); el.style.left = "0px"; el.style.top = "0px"; el.innerHTML = \` <div class="tt-inner"> <div class="tt-h" id="tt-title"></div> <p class="tt-b" id="tt-body"></p> <button type="button" class="tt-close" aria-label="Close">×</button> </div>\`; document.body.appendChild(el); return el; } const bubble = ensureBubble(); const elH = bubble.querySelector("#tt-title"); const elB = bubble.querySelector("#tt-body"); const elClose = bubble.querySelector(".tt-close"); // ---------------- Parse \[\[term|heading|body\]\] anywhere ---------------- const TOKEN\_RE = /\\\[\\\[(\[^|\\\]\]+)\\|(\[^|\\\]\]+)\\|(\[^\\\]\]+)\\\]\\\]/g; const BLOCK\_SKIP = new Set(\["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT","SELECT","CODE","PRE","TEMPLATE","IFRAME"\]); function shouldSkipTextNode(n){ let el = n.parentElement; while (el){ if (BLOCK\_SKIP.has(el.tagName) || el.isContentEditable) return true; el = el.parentElement; } return false; } const walker = document.createTreeWalker(document.body, NodeFilter.SHOW\_TEXT); const textNodes = \[\]; while (walker.nextNode()){ const n = walker.currentNode; if (!n.nodeValue || shouldSkipTextNode(n)) continue; if (TOKEN\_RE.test(n.nodeValue)) textNodes.push(n); TOKEN\_RE.lastIndex = 0; } textNodes.forEach(node => { const frag = document.createDocumentFragment(); const insideLink = !!node.parentElement.closest("a"); let text = node.nodeValue, last = 0; TOKEN\_RE.lastIndex = 0; let m; while ((m = TOKEN\_RE.exec(text))){ if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index))); const term=m\[1\].trim(), heading=m\[2\].trim(), body=m\[3\].trim(); const t = insideLink ? document.createElement("span") : document.createElement("button"); if (insideLink){ t.setAttribute("role","button"); t.setAttribute("tabindex","0"); } else { t.type="button"; } t.className="tt-trigger"; t.textContent=term; t.setAttribute("data-tt-h", heading); t.setAttribute("data-tt-b", body); t.setAttribute("aria-haspopup","dialog"); t.setAttribute("aria-expanded","false"); frag.appendChild(t); last = TOKEN\_RE.lastIndex; } if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last))); node.parentNode.replaceChild(frag, node); }); // ---------------- State ---------------- let current = null; let hoverCount = 0; let closeTimer = null; // Dimming bookkeeping let dimCtx = null; // { container, dimEls:\[\], wrappedTexts:\[\], pathEls:\[\] } // ---------------- Find the correct "text element" container ---------------- function findTextContainer(trigger){ // Prefer common RTE wrappers let el = trigger.closest(".w-richtext, .rich-text, .rte, \[data-rte\]"); if (el) return el; // Otherwise climb until we find an ancestor that contains multiple block nodes anywhere inside. const BLOCK\_SEL = "p,h1,h2,h3,h4,h5,h6,ul,ol,li,blockquote,pre,figure,figcaption"; el = trigger.parentElement; while (el && el !== document.body){ const blockCount = el.querySelectorAll(BLOCK\_SEL).length; if (blockCount >= 2) return el; el = el.parentElement; } // Fallback: nearest non-inline container el = trigger.parentElement || document.body; while (el && el !== document.body){ const d = getComputedStyle(el).display; if (d !== "inline" && d !== "contents") return el; el = el.parentElement; } return document.body; } // Utility: child of \`ancestor\` that contains \`target\` (direct child) function directChildContaining(ancestor, target){ for (const ch of ancestor.children){ if (ch === target || ch.contains(target)) return ch; } return null; } function getElementTarget(e) { // If target is already an Element, use it if (e.target instanceof Element) return e.target; // Otherwise, walk the composed/path for the first Element const path = (typeof e.composedPath === 'function') ? e.composedPath() : \[\]; for (const n of path) if (n instanceof Element) return n; return null; } // ---------------- Dim everything except the trigger branch (sibling branches only) ---------------- function dimAllOtherBranches(container, trigger){ undim(); // clear previous const dimEls = \[\]; const wrappedTexts = \[\]; const pathEls = \[\]; // Build ELEMENT-only path \[container -> ... -> trigger\] const path = \[\]; for (let el = trigger; el && el !== container; el = el.parentElement) path.push(el); path.push(container); path.reverse(); // At each ancestor level, find the \*direct\* child that leads to the trigger for (let i = 0; i < path.length; i++){ const anc = path\[i\]; const branchChild = (i < path.length - 1) ? directChildContaining(anc, path\[i+1\]) : path\[i\]; // last step is the trigger itself // Fade element siblings (whole branches) for (const child of anc.children){ if (child === branchChild) continue; // keep the path branch crisp // Never fade any element that is (or contains) the trigger if (child === trigger || child.contains(trigger)) continue; child.style.transition = \`opacity ${DIM\_EASE\_MS}ms ease\`; child.style.opacity = String(DIM\_OPACITY); dimEls.push(child); } // Fade TEXT NODE siblings directly under this ancestor (outside branchChild) anc.childNodes.forEach(node => { if (node.nodeType !== 3) return; // text only if (!node.nodeValue || !node.nodeValue.trim()) return; // If this text node sits inside branchChild, skip if (branchChild && branchChild.contains && branchChild.contains(node)) return; const span = document.createElement("span"); span.style.transition = \`opacity ${DIM\_EASE\_MS}ms ease\`; span.style.opacity = String(DIM\_OPACITY); span.textContent = node.nodeValue; node.parentNode.replaceChild(span, node); wrappedTexts.push(span); }); // Keep a reference to the path elements (so we can explicitly restore opacity if needed) if (anc && anc.nodeType === 1) pathEls.push(anc); } // Hard-guard: explicitly set opacity:1 on the entire path to neutralize any inherited fade pathEls.forEach(el => { el.style.opacity = "1"; }); dimCtx = { container, dimEls, wrappedTexts, pathEls }; } function undim(){ if (!dimCtx) return; const { dimEls, wrappedTexts, pathEls } = dimCtx; // Animate back dimEls.forEach(el => { el.style.transition = \`opacity ${DIM\_EASE\_MS}ms ease\`; el.style.opacity = "1"; // remove inline style after the animation so we don't override site CSS setTimeout(() => { if (el) el.style.opacity = ""; }, DIM\_EASE\_MS + 50); }); wrappedTexts.forEach(span => { span.style.transition = \`opacity ${DIM\_EASE\_MS}ms ease\`; span.style.opacity = "1"; span.addEventListener("transitionend", () => { if (!span.parentNode) return; span.parentNode.replaceChild(document.createTextNode(span.textContent || ""), span); }, { once:true }); }); // Clear hard-guard on path pathEls.forEach(el => { if (el) el.style.opacity = ""; }); dimCtx = null; } // ---------------- Positioning (centered, edge-aware, flip) ---------------- function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); } function measureBubbleForPlacement(){ const wasOpen = bubble.classList.contains("is-open"); if (!wasOpen){ bubble.style.visibility="hidden"; bubble.classList.add("is-open"); } const rect = bubble.getBoundingClientRect(); if (!wasOpen){ bubble.classList.remove("is-open"); bubble.style.visibility=""; } return { w: rect.width, h: rect.height }; } function placeAnchored(trigger){ const vw=innerWidth, vh=innerHeight; const r = trigger.getBoundingClientRect(); const { w, h } = measureBubbleForPlacement(); let left = r.left + (r.width/2) - (w/2); left = clamp(left, EDGE\_PADDING, Math.max(EDGE\_PADDING, vw - EDGE\_PADDING - w)); const topBelow = r.bottom + OFFSET\_Y; const spaceBelow = vh - topBelow - EDGE\_PADDING; const placeBelow = spaceBelow >= h; let top = placeBelow ? topBelow : (r.top - h - OFFSET\_Y); top = clamp(top, EDGE\_PADDING, Math.max(EDGE\_PADDING, vh - EDGE\_PADDING - h)); bubble.style.left = left + "px"; bubble.style.top = top + "px"; const br = bubble.getBoundingClientRect(); if (br.bottom > vh - EDGE\_PADDING){ bubble.style.maxHeight = (vh - 2\*EDGE\_PADDING) + "px"; bubble.style.overflowY = "auto"; } else { bubble.style.maxHeight = "none"; bubble.style.overflowY = "visible"; } } // ---------------- Open / Close (place → fade/scale) ---------------- function animateIn(){ bubble.style.transition = "none"; bubble.style.opacity = "0"; bubble.style.transform = "scale(0.95)"; void bubble.offsetWidth; bubble.style.transition = "opacity .18s ease, transform .18s ease"; bubble.style.opacity = "1"; bubble.style.transform = "scale(1)"; } function animateOut(done){ bubble.style.transition = "opacity .16s ease, transform .16s ease"; bubble.style.opacity = "0"; bubble.style.transform = "scale(0.95)"; const end = () => { bubble.removeEventListener("transitionend", end); done && done(); }; bubble.addEventListener("transitionend", end); setTimeout(end, 260); } function openFromTrigger(trigger){ if (current && current !== trigger) forceClose(); current = trigger; trigger.setAttribute("aria-expanded","true"); elH.textContent = trigger.getAttribute("data-tt-h") || ""; elB.textContent = trigger.getAttribute("data-tt-b") || ""; bubble.classList.add("is-open"); bubble.setAttribute("aria-hidden","false"); placeAnchored(trigger); animateIn(); const container = findTextContainer(trigger); dimAllOtherBranches(container, trigger); hoverCount = 0; cancelCloseTimer(); } function forceClose(){ if (!current) return; bubble.classList.remove("is-open"); bubble.setAttribute("aria-hidden","true"); current.setAttribute("aria-expanded","false"); current = null; undim(); hoverCount = 0; cancelCloseTimer(); } function closeWithAnim(){ if (!current) return; const t = current; animateOut(() => { bubble.classList.remove("is-open"); bubble.setAttribute("aria-hidden","true"); t.setAttribute("aria-expanded","false"); current = null; undim(); }); } function scheduleClose(){ cancelCloseTimer(); closeTimer = setTimeout(() => { if (hoverCount <= 0 && !isCoarse()) closeWithAnim(); }, CLOSE\_DELAY); } function cancelCloseTimer(){ if (closeTimer){ clearTimeout(closeTimer); closeTimer = null; } } // ---------------- Hover-intent (desktop) ---------------- function onZoneEnter(){ if (isCoarse()) return; hoverCount++; cancelCloseTimer(); } function onZoneLeave(){ if (isCoarse()) return; hoverCount = Math.max(0, hoverCount - 1); if (hoverCount === 0) scheduleClose(); } bubble.addEventListener("pointerenter", onZoneEnter, true); bubble.addEventListener("mouseenter", onZoneEnter, true); bubble.addEventListener("pointerleave", onZoneLeave, true); bubble.addEventListener("mouseleave", onZoneLeave, true); const handleEnter = (e) => { if (isCoarse()) return; const target = getElementTarget(e); if (!target) return; const t = target.closest(".tt-trigger"); if (!t) return; onZoneEnter(); if (!current || current !== t) openFromTrigger(t); }; const handleLeave = (e) => { if (isCoarse()) return; const target = getElementTarget(e); if (!target) return; const t = target.closest(".tt-trigger"); if (!t) return; onZoneLeave(); }; document.addEventListener("pointerenter", handleEnter, true); document.addEventListener("mouseenter", handleEnter, true); document.addEventListener("pointerleave", handleLeave, true); document.addEventListener("mouseleave", handleLeave, true); // ---------------- Keyboard ---------------- document.addEventListener("focusin", (e) => { if (!e.target) return; const t = e.target.closest(".tt-trigger"); if (t) openFromTrigger(t); }); document.addEventListener("focusout", (e) => { if (!e.target) return; const t = e.target.closest(".tt-trigger"); if (t && current === t) closeWithAnim(); }); // ---------------- Mobile / coarse ---------------- document.addEventListener("pointerdown", (e) => { if (!isCoarse()) return; const t = e.target.closest(".tt-trigger"); if (!t) return; e.preventDefault(); e.stopPropagation(); if (current === t && bubble.classList.contains("is-open")) { closeWithAnim(); return; } openFromTrigger(t); }, true); document.addEventListener("click", (e) => { if (!isCoarse()) return; if (!bubble.classList.contains("is-open")) return; const inBubble = !!e.target.closest(".tt-bubble"); const onTrigger = !!e.target.closest(".tt-trigger"); if (!inBubble && !onTrigger) closeWithAnim(); }, true); // Close button + ESC elClose.addEventListener("click", closeWithAnim); document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeWithAnim(); }); // Reposition on resize/scroll while open const reposition = () => { if (!current) return; placeAnchored(current); }; addEventListener("resize", reposition, { passive: true }); addEventListener("scroll", reposition, { passive: true }); });

/\* Tooltip Styles \*/ /\* Trigger \*/ .tt-trigger { cursor: help; text-decoration: underline dotted; text-underline-offset: .2em; color: inherit; } .tt-trigger:focus-visible{ outline:2px solid currentColor; outline-offset:2px; } /\* Bubble \*/ .tt-bubble{ position: fixed; z-index: 10; max-width: 17rem; background: var(--\_theme---background-primary); box-shadow: 0 4px 24px rgba(0,0,0,.05); border-radius: var(--radius--large); border-style: solid; border-color: var(--\_theme---border-tertiary); padding: var(--\_spacing---space--1-5rem); pointer-events: none; opacity: 0; transform: translate3d(0,0,0) scale(.98); transition: opacity .3s ease, transform .3s ease; will-change: transform, opacity; } .tt-bubble.is-open{ opacity:1; transform:translate3d(0,0,0) scale(1); pointer-events:auto; } .tt-h{ margin-bottom: var(--\_spacing---space--0-5rem); font-size: var(--\_typography---font-size--body-3); font-family: var(--\_typography---font--secondary-family); line-height: var(--\_typography---line-height--1-6); color: var(--\_theme---foreground-primary); } .tt-b{ margin:0; font-size: var(--\_typography---font-size--caption); line-height: var(--\_typography---line-height--1-6); color: var(--\_theme---foreground-tertiary); } /\* Mobile close button \*/ .tt-close { display: none; } @media (hover: none), (pointer: coarse) { .tt-close { display: inline-flex; position: absolute; top: 0.5rem; right: 0.5rem; width: 32px; height: 32px; align-items: center; justify-content: center; border: 0; border-radius: 999px; background: transparent; font-size: 22px; line-height: 1; color: inherit; cursor: pointer; touch-action: manipulation; } .tt-close:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; } .tt-close:hover { opacity: 1; } }

html\[lang="de-DE"\] h1, html\[lang="de-DE"\] h2, html\[lang="de-DE"\] h3, html\[lang="de-DE"\] h4, html\[lang="de-DE"\] h5, html\[lang="de-DE"\] h6, html\[lang="de-DE"\] p, html\[lang="de-DE"\] li, html\[lang="fr-FR"\] h1, html\[lang="fr-FR"\] h2, html\[lang="fr-FR"\] h3, html\[lang="fr-FR"\] h4, html\[lang="fr-FR"\] h5, html\[lang="fr-FR"\] h6, html\[lang="fr-FR"\] p, html\[lang="fr-FR"\] li { overflow-wrap: break-word; hyphens: auto; }

/\* Hover states for list items \*/ .card\_blog\_list\_content { opacity: 1; transition: opacity 0.3s ease; } .blog\_cms\_wrap:has(.blog\_cms\_item:hover) .blog\_cms\_item:not(:hover) .card\_blog\_list\_content { opacity: 0.3; } /\* Hover states for grid items \*/ .blog\_cms\_grid:has(.blog\_cms\_item:hover) .blog\_cms\_item:not(:hover) .card\_blog\_wrap { background-color: transparent; } @container stories-list (width > 38em) { .card\_blog\_list\_label, .card\_blog\_list\_wrap .button\_main\_wrap { display: none; } .card\_blog\_list\_meta { display: contents; } } @container stories-list (width <= 38em) { .blog\_cms\_list\_header { display: none; } .card\_blog\_list\_content { display: flex; align-items: stretch; } .card\_blog\_list\_field:last-child { display: none; } .tab\_btn\_text { display: none; } .tab\_menu\_inner { width: auto; } .tab\_btn\_wrap { width: auto; } } @container threshold-medium (width < 52em) { \[data-aside-rail\] { display: none !important; } \[data-aside='slider'\] { display: block !important; } .blog\_post\_wrap { display: flex; } .blog\_post\_layout { margin: auto !important; position: relative; } } @container threshold-medium (width < 58em) { .marginalia\_rail { display: none !important; } .marginalia\_slider { display: block !important; } } @media (max-width: 71rem) { .blog\_post\_marginalia { position: relative !important; } .blog\_post\_marginalia\_wrap { margin-top: 4rem; } } \[data-aside-track\] > \[data-aside-card\] { padding-left: 0.5rem; padding-right: 0.5rem; } \[data-aside-track\] > \[data-aside-card\] .marginalia\_wrap { box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px; } \[data-aside-prev\], \[data-aside-next\] { transition: opacity 0.3s ease; } \[data-aside-prev\].is-disabled, \[data-aside-next\].is-disabled { opacity: 0.3; pointer-events: none; cursor: default; } \[data-aside-dot\] { width: 0.3125rem; height: 0.3125rem; border-radius: 999px; background: var(--\_theme---border-secondary); transition: background 0.3s ease; } \[data-aside-dot\].is-active { background: var(--\_theme---foreground-primary); } /\* Live view mods \*/ .card\_blog\_list\_field .w-dyn-item:not(:first-child) { display: none; } .card\_blog\_wrap:has(.card\_blog\_visual\_wrap.w-condition-invisible) .card\_blog\_title { font-size: var(--\_typography---font-size--h5); } @container viewport (width < 38rem) { .card\_blog\_wrap:has(.card\_blog\_visual\_wrap.w-condition-invisible) .card\_blog\_title { font-size: var(--\_typography---font-size--h6); } } /\* Blog background colors \*/ \[data-illustration-bg='Heather'\] { background-color: var(--swatch--heather) !important; } \[data-illustration-bg='Mineral'\] { background-color: var(--swatch--mineral) !important; } \[data-illustration-bg='Peach'\] { background-color: var(--swatch--peach) !important; } \[data-illustration-bg='Plum'\] { background-color: var(--swatch--plum) !important; } \[data-illustration-bg='Clay'\] { background-color: var(--swatch--clay) !important; } \[data-illustration-bg='Olive'\] { background-color: var(--swatch--olive) !important; } \[data-illustration-bg='Cactus'\] { background-color: var(--swatch--cactus) !important; } \[data-illustration-bg='Sky'\] { background-color: var(--swatch--sky) !important; } \[data-illustration-bg='Coral'\] { background-color: var(--swatch--coral) !important; } \[data-illustration-bg='Fig'\] { background-color: var(--swatch--fig) !important; } \[data-illustration-bg='Oat'\] { background-color: var(--swatch--oat) !important; } /\* Figures always full width max \*/ .u-rich-text-blog figure { max-width: 100%; } /\* HTML video styling \*/ .u-rich-text-blog figure:has(video) { margin: var(--\_spacing---space--3rem) 0; width: 100%; max-width: none; } .u-rich-text-blog figure:has(video) > div { border-radius: var(--radius--main); overflow: hidden; } /\* YouTube video styling \*/ .u-rich-text-blog figure.w-richtext-figure-type-video iframe { overflow: hidden; border-radius: var(--radius--main); } /\* Table styling \*/ .u-rich-text-blog figure:has(table) { margin: var(--\_spacing---space--3rem) 0; width: 100%; max-width: none; } .u-rich-text-blog figure:has(table) > div\[role='region'\] { padding: var(--\_spacing---space--1-5rem); background-color: var(--\_theme---background-tertiary); border-radius: var(--radius--main); overflow-x: auto; } .u-rich-text-blog figure table { width: 100%; border-collapse: collapse; font-size: var(--\_typography---font-size--body-1); color: var(--\_theme---foreground-primary); } .u-rich-text-blog figure table.u-text-style-body-2 { font-size: var(--\_typography---font-size--body-2); } .u-rich-text-blog figure table.u-text-style-body-3 { font-size: var(--\_typography---font-size--body-3); } .u-rich-text-blog figure th, .u-rich-text-blog figure td { padding: var(--\_spacing---space--1rem); text-align: left; } .u-rich-text-blog figure th { font-weight: 600; border-bottom: 1px solid var(--\_theme---border-secondary); } .u-rich-text-blog figure tr:not(:last-child) td { border-bottom: 1px solid var(--\_theme---border-secondary); } .u-rich-text-blog figure td:first-child { font-weight: 500; } .u-rich-text-blog figure tr { vertical-align: top; } .u-rich-text-blog figcaption { margin-top: 0.75rem; font-size: var(--\_typography---font-size--caption); color: var(--\_theme---foreground-tertiary); } @media (max-width: 767px) { .u-rich-text-blog figure:has(table), .u-rich-text-blog pre { width: calc(100vw - var(--site--margin) \* 2); } .u-rich-text-blog figure > div\[role='region'\] { overflow-x: auto; -webkit-overflow-scrolling: touch; /\* Smooth scrolling on iOS \*/ } .u-rich-text-blog figure:has(table) > div\[role='region'\]::-webkit-scrollbar { height: 4px; } .u-rich-text-blog figure:has(table) > div\[role='region'\]::-webkit-scrollbar-track { background: transparent; } .u-rich-text-blog figure:has(table) > div\[role='region'\]::-webkit-scrollbar-thumb { background: var(--\_theme---foreground-tertiary); border-radius: 2px; } .u-rich-text-blog figure table { min-width: 500px; /\* Prevents table from collapsing too small \*/ } } /\* ---- Code block mods ---- \*/ .u-rich-text-blog pre { margin: var(--\_spacing---space--3rem) 0; background-color: var(--\_theme---background-secondary) !important; border: 1px solid var(--\_theme---border-tertiary) !important; } .u-rich-text-blog pre code { background-color: none !important; border: none !important; margin: 0 !important; color: var(--\_theme---foreground-secondary) !important; } .u-rich-text-blog code span { color: var(--\_theme---foreground-secondary) !important; }

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
    

1.  Blog
    
    [
    
    Blog
    
    ](/blog)
    
    /
2.  Agent view in Claude Code
    

Explore here

-   [
    
    Ask questions about this page
    
    ](#)
-   [
    
    Copy as markdown
    
    ](#)

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6903d2222403b092e0358b0e_cd4fd51deacd067d4e30aee4f4b149f6cba1b97b-1000x1000.svg)

# Agent view in Claude Code

.button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

[](#)

.button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

[](#)

-   Category
    
    [Product announcements](https://claude.com/blog/category/announcements)
    
-   Product
    
    Claude Code
    
-   Date
    
    May 11, 2026
    
-   Reading time
    
    5
    
    min
    
-   Share
    
    [Copy link](#)
    
    https://claude.com/blog/agent-view-in-claude-code
    

Today we're introducing agent view in Claude Code: one place to manage all your Claude Code sessions. 

When running agents in parallel before, you've probably had to manage multiple terminal tabs, a tmux grid, and an overloaded mental ledger of what you need to tackle next.

With agent view in Claude Code, you can kick off new agents, send them to the background, and jump in only when Claude needs you. See at a glance which agents are waiting on you, which are still working, and which are done, so you can easily steer many all at once.

## How it works

Agent view improves visualizing and interacting with your Claude Code sessions in the CLI.

### See everything at once

Press the left arrow from any session or run `claude agents` from the terminal to open agent view. Each row shows the session, whether it needs your input, the contents of its last response, and when you last interacted with it.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a02147d18cd3a9a9fe18c4f_aef149a9.png)

### Peek and reply without leaving

Select a session to peek at the last turn. If a session is waiting on a decision, answer inline and the session picks back up. Press enter to attach directly to sessions where you want to explore the full transcript.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a02147d18cd3a9a9fe18c52_57c35e02.png)

### Background anything

Lastly, users can take any existing session and add it to agent view using `/bg` or skip the foreground entirely using `claude --bg [task]` to launch a fresh session.

## How developers are using agent view

A few patterns we have seen from early users:

-   **Scaling the number of concurrent sessions:** Dispatch several ideas at once, each optionally paired with a skill, and return to a list of pull requests ready for review.
-   **Manage long running agents:** PR babysitters, dashboard updaters, and other looping jobs show their next run time right in the list.
-   **Navigate between separate sessions:** When you’re in the middle of a session, press the left arrow, start a related task or quick codebase question, then arrow right back into what you were doing. Peek shows the answer when it lands.
-   **See what shipped:** Status indicators on each row plus the title in peek make it easy to scan which sessions produced a PR.

## Getting started

Agent view is available today as a Research Preview on Pro, Max, Team, Enterprise, and Claude API plans. Opt-in by running `claude agents`. Usual rate limits apply. See the [docs](https://code.claude.com/docs/en/agent-view) for more information.

\[data-slider-shell\]{ display: none; } \[data-slider-track\] > \[data-slider-card\]{ flex: 0 0 auto; width: auto; min-width: 0; box-sizing: border-box; padding-left: 1rem; padding-right: 1rem; } \[data-slider-prev\], \[data-slider-next\] { transition: opacity 0.3s ease; } \[data-slider-prev\].is-disabled, \[data-slider-next\].is-disabled { opacity: 0.3; pointer-events: none; cursor: default; } \[data-slider-dot\] { width: 1.75rem; justify-content: center; display: flex; height: 1.75rem; align-items: center; } \[data-slider-dot\] span { display: block; width: 0.3125rem; height: 0.3125rem; border-radius: 999px; background: var(--\_theme---border-secondary); transition: background 0.3s ease; } \[data-slider-dot\].is-active span { background: var(--\_theme---foreground-primary); }

document.addEventListener("DOMContentLoaded", function () { if (!document.getElementById("\_\_swiper\_slider\_overrides")) { var s = document.createElement("style"); s.id = "\_\_swiper\_slider\_overrides"; s.textContent = \` /\* Equal-height cards \*/ \[data-slider\] \[data-slider-track\] { align-items: stretch; } \[data-slider\] \[data-slider-card\].swiper-slide { height: auto; display: flex; flex-direction: column; } \[data-slider\] \[data-slider-card\].swiper-slide > \* { flex: 1 1 auto; } /\* Preserve original .slider\_dots layout — stop Swiper from stretching it \*/ \[data-slider\] \[data-slider-dots\].swiper-pagination-horizontal, \[data-slider\] \[data-slider-dots\].swiper-pagination-bullets { width: auto !important; position: static; flex: 0 0 auto; } /\* Match easing to GSAP power1.inOut \*/ \[data-slider\] .swiper-wrapper { transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1) !important; } \`; document.head.appendChild(s); } function debounce(fn, wait) { let t; return function () { const args = arguments; clearTimeout(t); t = setTimeout(function () { fn.apply(null, args); }, wait); }; } var FULL\_DURATION = 600; var SNAPPY\_DURATION = 400; document.querySelectorAll("\[data-slider\]").forEach(function (root) { if (root.dataset.scriptInitialized) return; root.dataset.scriptInitialized = "true"; var desktopPer = parseInt(root.getAttribute("data-slider-desktop-threshold")) || 4; var tabletPer = parseInt(root.getAttribute("data-slider-tablet-threshold")) || 2; var mobilePer = 1; var loopAttr = (root.getAttribute("data-slider-loop") || "").toLowerCase(); var centerAttr = (root.getAttribute("data-slider-center") || "").toLowerCase(); var LOOP = loopAttr === "true" || loopAttr === "1" || loopAttr === ""; var CENTER\_MODE = centerAttr === "true" || centerAttr === "1"; var grid = root.querySelector("\[data-slider-grid\]"); var shell = root.querySelector("\[data-slider-shell\]"); var viewport = shell && shell.querySelector("\[data-slider-viewport\]"); var track = shell && shell.querySelector("\[data-slider-track\]"); var prevBtn = shell && shell.querySelector("\[data-slider-prev\]"); var nextBtn = shell && shell.querySelector("\[data-slider-next\]"); var controls = shell && shell.querySelector("\[data-slider-controls\]"); var dotsWrap = shell && shell.querySelector("\[data-slider-dots\]"); var mobileActive = shell && shell.querySelector("\[data-slider-mobile-active\]"); var mobileTotal = shell && shell.querySelector("\[data-slider-mobile-total\]"); if (!grid || !shell || !viewport || !track) return; var cards = Array.prototype.slice.call(grid.querySelectorAll("\[data-slider-card\]")); if (!cards.length) return; var placeholders = new Map(); cards.forEach(function (card) { var m = document.createComment("card-slot"); card.parentNode.insertBefore(m, card); placeholders.set(card, m); }); var originalLength = cards.length; if (mobileTotal) mobileTotal.textContent = String(originalLength); var swiper = null; var currentMode = "grid"; var lastNavTime = 0; function applySwiperClasses() { viewport.classList.add("swiper"); track.classList.add("swiper-wrapper"); cards.forEach(function (c) { c.classList.add("swiper-slide"); }); } function removeSwiperClasses() { viewport.classList.remove("swiper"); track.classList.remove("swiper-wrapper"); cards.forEach(function (c) { c.classList.remove("swiper-slide"); }); } function moveCardsToTrack() { cards.forEach(function (c) { track.appendChild(c); }); grid.style.display = "none"; } function moveCardsBackToGrid() { cards.forEach(function (c) { var m = placeholders.get(c); if (m && m.parentNode) m.parentNode.insertBefore(c, m); c.classList.remove("is-active"); }); grid.style.display = ""; } function showControls(show) { if (controls) controls.style.display = show ? "" : "none"; } function getSlidesPerViewForWindow() { var w = window.innerWidth; if (w >= 1200) return desktopPer; if (w >= 768) return tabletPer; return mobilePer; } function shouldUseSlider() { return cards.length > getSlidesPerViewForWindow(); } function updateMobileCounter(realIndex) { if (mobileActive) mobileActive.textContent = String((realIndex || 0) + 1); } // Override slideNext/slidePrev: dynamically switch params.speed so the next // transition runs at SNAPPY\_DURATION if the user is clicking rapidly. function patchNavigationSpeed(sw) { var proto = Object.getPrototypeOf(sw); sw.slideNext = function () { var now = Date.now(); var hadRecent = lastNavTime !== 0 && (now - lastNavTime) < FULL\_DURATION; sw.params.speed = hadRecent ? SNAPPY\_DURATION : FULL\_DURATION; lastNavTime = now; return proto.slideNext.call(sw); }; sw.slidePrev = function () { var now = Date.now(); var hadRecent = lastNavTime !== 0 && (now - lastNavTime) < FULL\_DURATION; sw.params.speed = hadRecent ? SNAPPY\_DURATION : FULL\_DURATION; lastNavTime = now; return proto.slidePrev.call(sw); }; } function initializeSlider() { if (swiper) return; applySwiperClasses(); moveCardsToTrack(); shell.style.display = "block"; showControls(true); swiper = new Swiper(viewport, { slidesPerView: mobilePer, spaceBetween: 0, loop: LOOP, centeredSlides: CENTER\_MODE, followFinger: true, freeMode: false, slideToClickedSlide: false, autoHeight: false, speed: FULL\_DURATION, allowSlidePrev: true, allowSlideNext: true, preventInteractionOnTransition: false, breakpoints: { 768: { slidesPerView: tabletPer }, 1200: { slidesPerView: desktopPer } }, mousewheel: { forceToAxis: true }, keyboard: { enabled: true, onlyInViewport: true }, navigation: { nextEl: nextBtn || undefined, prevEl: prevBtn || undefined, disabledClass: "is-disabled" }, pagination: dotsWrap ? { el: dotsWrap, bulletActiveClass: "is-active", bulletClass: "slider\_dot\_item", bulletElement: "button", clickable: true, renderBullet: function (index, className) { return '<button type="button" data-slider-dot class="' + className + '" aria-label="Go to item ' + (index + 1) + '"><span></span></button>'; } } : false, slideActiveClass: "is-active", slideDuplicateActiveClass: "is-active", on: { init: function () { updateMobileCounter(this.realIndex); }, slideChange: function () { updateMobileCounter(this.realIndex); } } }); patchNavigationSpeed(swiper); currentMode = "slider"; } function destroySlider() { if (!swiper) return; try { swiper.destroy(true, true); } catch (e) {} swiper = null; removeSwiperClasses(); moveCardsBackToGrid(); shell.style.display = "none"; showControls(false); currentMode = "grid"; } function evaluate() { if (shouldUseSlider()) { if (currentMode !== "slider") initializeSlider(); else if (swiper) swiper.update(); } else { if (currentMode !== "grid") destroySlider(); } } window.addEventListener("resize", debounce(evaluate, 200)); if (window.ResizeObserver) { var ro = new ResizeObserver(debounce(evaluate, 200)); ro.observe(document.documentElement); root.\_sliderCleanup = function () { ro.disconnect(); if (swiper) { try { swiper.destroy(true, true); } catch (e) {} swiper = null; } }; } evaluate(); }); });

No items found.

[Prev](#)Prev

0/5

[Next](#)Next

eBook

.button\_small\_icon { transition: color 300ms ease; } .button\_small\_wrap:hover .button\_small\_icon { color: var(--\_button-style---icon-hover); } .button\_small\_wrap:focus-within .button\_small\_icon { color: var(--\_button-style---text-hover) !important; } .button\_small\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

[](#)

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

FAQ

No items found.

.wf-design-mode \[data-accordion="content"\] { display: block; } .accordion\_toggle\_line.is-2 { transition: transform 500ms var(--ease-expo-out); } \[data-accordion="component"\].is-opened .accordion\_toggle\_line.is-2 { transform: rotate(0deg); }

document.addEventListener("DOMContentLoaded", function () { document.querySelectorAll("\[data-accordion='wrap'\]").forEach((component, listIndex) => { if (component.dataset.scriptInitialized) return; component.dataset.scriptInitialized = "true"; const closePrevious = component.getAttribute("data-close-previous") !== "false"; const closeOnSecondClick = component.getAttribute("data-close-on-second-click") !== "false"; const openOnHover = component.getAttribute("data-open-on-hover") === "true"; const openByDefault = component.getAttribute("data-open-by-default") !== null && !isNaN(+component.getAttribute("data-open-by-default")) ? +component.getAttribute("data-open-by-default") : false; const list = component.querySelector("\[data-accordion='list'\]"); let previousIndex = null, closeFunctions = \[\]; function removeCMSList(slot) { const dynList = Array.from(slot.children).find((child) => child.classList.contains("w-dyn-list")); if (!dynList) return; const nestedItems = dynList?.firstElementChild?.children; if (!nestedItems) return; const staticWrapper = \[...slot.children\]; \[...nestedItems\].forEach(el => el.firstElementChild && slot.appendChild(el.firstElementChild)); staticWrapper.forEach((el) => el.remove()); } removeCMSList(list); component.querySelectorAll("\[data-accordion='component'\]").forEach((card, cardIndex) => { const button = card.querySelector("\[data-accordion='toggle'\]"); const content = card.querySelector("\[data-accordion='content'\]"); if (!button || !content ) return console.warn("Missing elements:", card); button.setAttribute("aria-expanded", "false"); button.setAttribute("id", "accordion\_button\_" + listIndex + "\_" + cardIndex); content.setAttribute("id", "accordion\_content\_" + listIndex + "\_" + cardIndex); button.setAttribute("aria-controls", content.id); content.setAttribute("aria-labelledby", button.id); content.style.display = "none"; const refresh = () => { tl.invalidate(); if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh(); }; const tl = gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: "power1.inOut" }, onComplete: refresh, onReverseComplete: refresh }); tl.set(content, { display: "block" }); tl.fromTo(content, { height: 0 }, { height: "auto" }); const closeAccordion = () => card.classList.contains("is-opened") && (card.classList.remove("is-opened"), tl.reverse(), button.setAttribute("aria-expanded", "false")); closeFunctions\[cardIndex\] = closeAccordion; const openAccordion = (instant = false) => { if (closePrevious && previousIndex !== null && previousIndex !== cardIndex) closeFunctions\[previousIndex\]?.(); previousIndex = cardIndex; button.setAttribute("aria-expanded", "true"); card.classList.add("is-opened"); instant ? tl.progress(1) : tl.play(); }; if (openByDefault === cardIndex + 1) openAccordion(true); button.addEventListener("click", () => (card.classList.contains("is-opened") && closeOnSecondClick ? (closeAccordion(), (previousIndex = null)) : openAccordion())); if (openOnHover) button.addEventListener("mouseenter", () => openAccordion()); }); }); });

.button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

[](#)

Get Claude Code

-   [
    
    Desktop
    
    ](/download)
-   [
    
    VS Code
    
    ](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)
-   [
    
    JetBrains
    
    ](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-)
-   [
    
    On the web
    
    ](https://claude.ai/code)
-   [
    
    Slack
    
    ](https://slack.com/oauth/v2/authorize?client_id=1601185624273.8899143856786&scope=app_mentions:read,assistant:write,channels:history,channels:read,chat:write,files:read,files:write,groups:history,groups:read,im:history,im:read,im:write,mpim:history,reactions:write,users:read,users:read.email,commands,search:read.public&user_scope=bookmarks:read,channels:history,channels:read,chat:write,emoji:read,files:read,groups:history,groups:read,groups:write,im:history,im:read,im:write,links:read,mpim:history,mpim:read,mpim:write,mpim:write.topic,pins:read,reactions:read,reactions:write,remote_files:read,team:read,users:read,users:read.email,search:read.public,search:read.private,search:read.im,search:read.mpim,search:read.files,search:read.users,canvases:read,canvases:write)

// Detect OS and show appropriate command (function() { 'use strict'; // Check for reduced motion preference const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; // Detect OS once and cache result let osDetected = false; function detectAndSetCommandOS() { if (osDetected) return; osDetected = true; // Check for test parameter const urlParams = new URLSearchParams(window.location.search); const isTestPC = urlParams.has('pc'); // Modern API with fallback - detect Mac or Linux const isMacOrLinux = isTestPC ? false : ( navigator.userAgentData ? (navigator.userAgentData.platform.toLowerCase().includes('mac') || navigator.userAgentData.platform.toLowerCase().includes('linux')) : /Mac|iPhone|iPod|iPad|Linux/i.test(navigator.userAgent) ); if (!isMacOrLinux) { const macCommands = document.querySelectorAll('\[data-command-os="mac"\]'); const pcCommands = document.querySelectorAll('\[data-command-os="pc"\]'); macCommands.forEach(el => el.style.display = 'none'); pcCommands.forEach(el => el.style.display = 'flex'); } } // Copy functionality with event delegation function handleCopyClick(event) { const target = event.target.closest('\[data-copy\]'); if (!target) return; const textToCopy = target.getAttribute('data-copy'); // Feature detection for Clipboard API if (!navigator.clipboard) { console.error('Clipboard API not available'); return; } navigator.clipboard.writeText(textToCopy) .then(() => { let btnText = target.querySelector('.command\_card\_text'); if (btnText) { showCopiedFeedback(btnText, prefersReducedMotion); } else { // Create temporary feedback element btnText = document.createElement('span'); btnText.className = 'command\_card\_text'; btnText.textContent = "Copied!"; target.appendChild(btnText); if (prefersReducedMotion) { // No animation, just show and remove setTimeout(() => { target.removeChild(btnText); }, 1000); } else { btnText.style.opacity = '0'; btnText.style.transition = 'opacity 0.3s ease'; requestAnimationFrame(() => { btnText.style.opacity = '1'; setTimeout(() => { btnText.style.opacity = '0'; setTimeout(() => { if (btnText.parentNode) { target.removeChild(btnText); } }, 300); }, 1000); }); } } }) .catch(err => console.error('Copy failed:', err)); } function showCopiedFeedback(btnText, skipAnimation) { // Store original HTML once const originalHTML = btnText.innerHTML; if (skipAnimation) { // No animation for reduced motion preference btnText.innerHTML = "Copied!"; setTimeout(() => { btnText.innerHTML = originalHTML; }, 1000); return; } // Cache computed styles once before any changes const computedStyle = window.getComputedStyle(btnText); const originalWidth = computedStyle.width; const originalStyles = { webkitLineClamp: computedStyle.webkitLineClamp, lineClamp: computedStyle.lineClamp, overflow: computedStyle.overflow, textOverflow: computedStyle.textOverflow, whiteSpace: computedStyle.whiteSpace }; // Set up for transition while preserving line-clamp btnText.style.minWidth = originalWidth; btnText.style.transition = 'opacity 0.3s ease'; // Fade out btnText.style.opacity = '0'; // Use a single setTimeout chain instead of nested callbacks setTimeout(() => { btnText.innerHTML = "Copied!"; btnText.style.opacity = '1'; setTimeout(() => { btnText.style.opacity = '0'; setTimeout(() => { btnText.innerHTML = originalHTML; // Restore original line-clamp properties if (originalStyles.webkitLineClamp !== 'none') { btnText.style.webkitLineClamp = originalStyles.webkitLineClamp; btnText.style.lineClamp = originalStyles.lineClamp; btnText.style.overflow = originalStyles.overflow; btnText.style.textOverflow = originalStyles.textOverflow; btnText.style.whiteSpace = originalStyles.whiteSpace; } btnText.style.opacity = '1'; setTimeout(() => { btnText.style.transition = ''; btnText.style.minWidth = ''; }, 300); }, 300); }, 1000); }, 300); } // Initialize function init() { detectAndSetCommandOS(); // Use event delegation on document - more efficient than multiple listeners document.addEventListener('click', handleCopyClick); } // Execute when DOM is ready or immediately if already loaded if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); } })();

curl -fsSL https://claude.ai/install.sh | bash

Copy command to clipboard

irm https://claude.ai/install.ps1 | iex

Copy command to clipboard

Or read the [documentation](https://code.claude.com/docs/en/overview)

.button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

Try Claude Code

[Try Claude Code](https://claude.ai/code)Try Claude Code

.button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

Developer docs

[Developer docs](https://code.claude.com/docs/en/overview)Developer docs

@container threshold-medium (width < 48em) { .header\_col\_title\_wrap { flex-flow: column ; justify-content: flex-start; align-items: flex-start; } }

## Related posts

Explore more product news and best practices for teams building with Claude.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a025cf25f0694905405e054_Object-Scale.svg)

May 12, 2026

### Claude for the legal industry

Product announcements

[Claude for the legal industry](#)Claude for the legal industry

[Claude for the legal industry](/blog/claude-for-the-legal-industry)Claude for the legal industry

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0112e18cdd7f0b92d19e40_Hand-BuildingBricks.svg)

May 11, 2026

### Introducing the Claude Platform on AWS

Product announcements

[Introducing the Claude Platform on AWS](#)Introducing the Claude Platform on AWS

[Introducing the Claude Platform on AWS](/blog/claude-platform-on-aws)Introducing the Claude Platform on AWS

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6903d229a7aa26ac1b6e96c2_a62b6eb169818f14c35b7a192af269e283f8fa93-1000x1000.svg)

May 7, 2026

### Collaborate with Claude across Excel, PowerPoint, Word and Outlook

Product announcements

[Collaborate with Claude across Excel, PowerPoint, Word and Outlook](#) Collaborate with Claude across Excel, PowerPoint, Word and Outlook

[Collaborate with Claude across Excel, PowerPoint, Word and Outlook](/blog/collaborate-with-claude-across-excel-powerpoint-word-and-outlook) Collaborate with Claude across Excel, PowerPoint, Word and Outlook

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6903d224ef32980bc807847d_a683fdcfe3e2c7c6532342a0fa4ff789c3fd4852-1000x1000.svg)

May 6, 2026

### New in Claude Managed Agents: dreaming, outcomes, and multiagent orchestration

Product announcements

[New in Claude Managed Agents: dreaming, outcomes, and multiagent orchestration](#)New in Claude Managed Agents: dreaming, outcomes, and multiagent orchestration

[New in Claude Managed Agents: dreaming, outcomes, and multiagent orchestration](/blog/new-in-claude-managed-agents)New in Claude Managed Agents: dreaming, outcomes, and multiagent orchestration

## Transform how your organization operates with Claude

.button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

See pricing

[See pricing](https://claude.com/pricing#api)See pricing

.button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

Contact sales

[Contact sales](https://claude.com/contact-sales)Contact sales

Get the developer newsletter

Product updates, how-tos, community spotlights, and more. Delivered monthly to your inbox.

document.addEventListener('DOMContentLoaded', function() { // Find all forms with data-form='iterable' function initializeIterableForms() { const forms = document.querySelectorAll('form\[data-form="iterable"\]'); forms.forEach(form => { // Skip if already initialized if (form.dataset.iterableInitialized) return; form.dataset.iterableInitialized = 'true'; // Store original action const originalAction = form.getAttribute('action'); form.removeAttribute('action'); // Handle form submission form.addEventListener('submit', async function(e) { e.preventDefault(); e.stopPropagation(); const emailInput = form.querySelector('input\[type="email"\]'); const email = emailInput ? emailInput.value : ''; if (!email) return; // Disable submit button const submitBtn = form.querySelector('button\[type="submit"\]'); if (submitBtn) { submitBtn.disabled = true; } try { // Submit to Iterable await fetch(originalAction || 'https://links.iterable.com/lists/publicAddSubscriberForm?publicIdString=f12dbb96-5d68-4b76-8013-9f175aa07346', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, body: \`email=${encodeURIComponent(email)}\`, mode: 'no-cors' }); // Show success message const successDiv = form.parentElement.querySelector('.w-form-done'); const errorDiv = form.parentElement.querySelector('.w-form-fail'); if (successDiv) { successDiv.style.display = 'block'; form.style.display = 'none'; } if (errorDiv) { errorDiv.style.display = 'none'; } } catch (error) { // Show error message const errorDiv = form.parentElement.querySelector('.w-form-fail'); if (errorDiv) { errorDiv.style.display = 'block'; } } finally { // Re-enable submit button if (submitBtn) { submitBtn.disabled = false; } } }); }); } // Initialize on load initializeIterableForms(); // Watch for dynamically added forms const observer = new MutationObserver(() => { initializeIterableForms(); }); observer.observe(document.body, { childList: true, subtree: true }); });

[Subscribe](#)Subscribe

Please provide your email address if you'd like to receive our monthly developer newsletter. You can unsubscribe at any time.

Thank you! You’re subscribed.

Sorry, there was a problem with your submission, please try again later.

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

[English (US)](/blog/agent-view-in-claude-code)

[日本語 (Japan)](/ja)

[Deutsch (Germany)](/de)

[Français (France)](/fr)

[한국어 (South Korea)](/ko)

function initDynamicCurrentYear() { const currentYear = new Date().getFullYear(); const currentYearElements = document.querySelectorAll('\[data-current-year\]'); currentYearElements.forEach(currentYearElement => { currentYearElement.textContent = currentYear; }); } // Initialize Dynamic Current Year document.addEventListener('DOMContentLoaded', () => { initDynamicCurrentYear(); });

[](/blog-product/claude-code)

Claude Code

[](/blog-usecases/coding)

Coding

[](/blog-usecases/productivity)

Productivity

gsap.registerPlugin(ScrollTrigger,SplitText,TextPlugin,Flip,Draggable,InertiaPlugin); /\*\* \* claude-animations.js \* GSAP-powered animations for claude.com \* \* Contains: \* - Page transitions & hero animations \* - Heading animations (scroll-triggered) \* - Columns & cards animations \* - Artifact toggle & metadata animations \* \* Dependencies: GSAP, SplitText, ScrollTrigger, jQuery \*/ function isValidSameOriginUrl(urlString) { if (!urlString || typeof urlString !== 'string') { return false; } try { // Use URL constructor for safe parsing const url = new URL(urlString, window.location.origin); // Only allow http and https protocols if (!\['http:', 'https:'\].includes(url.protocol)) { return false; } // Only allow same origin if (url.origin !== window.location.origin) { return false; } return true; } catch (e) { // Invalid URL format return false; } } document.addEventListener('DOMContentLoaded', () => { // PRE-INITIALIZE SplitText BEFORE any animations run // This prevents layout thrashing during animation frames const heroData = \[\]; document.querySelectorAll('\[data-animate-hero-wrap\]').forEach((hero) => { const heading = hero.querySelector('\[data-animate-hero-heading\]'); const text = hero.querySelector('\[data-animate-hero-text\]'); const cta = hero.querySelector('\[data-animate-hero-cta\]'); const visual = hero.querySelectorAll('\[data-animate-hero-visual\]'); let split = null; if (heading) { const targetElement = heading.children.length > 0 ? heading.children : heading; split = SplitText.create(targetElement, { type: 'words', wordsClass: 'word', }); // Set initial state immediately (batch DOM writes) if (split.words && split.words.length > 0) { gsap.set(split.words, { autoAlpha: 0 }); } } heroData.push({ hero, heading, text, cta, visual, split }); }); // Force a single reflow before animations start document.body.offsetHeight; // HERO ANIMATION FUNCTION - uses pre-split text (no DOM modification) function animateHero() { heroData.forEach(({ hero, text, cta, visual, split }) => { const heroTl = gsap.timeline(); // Animate pre-split words (no DOM modification here) if (split && split.words && split.words.length > 0) { heroTl.to(split.words, { autoAlpha: 1, duration: 1, ease: 'power2.out', stagger: { amount: 0.2 }, }); } // Animate text if (text) { heroTl.from( text, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+30%', ); } // Animate CTA if (cta) { heroTl.from( cta, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+25%', ); } // Animate Visual if (visual && visual.length) { heroTl.from( visual, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<', ); } gsap.set(hero, { visibility: 'visible' }); return heroTl; }); } // PAGE LOAD SEQUENCE let tl = gsap.timeline(); // Only animate elements that exist on the page const transitionWrap = document.querySelector('.transition\_wrap'); const navWrap = document.querySelector('.nav\_wrap'); const navSecondaryWrap = document.querySelector('.nav\_secondary\_wrap'); const pageMain = document.querySelector('.page\_main'); if (transitionWrap) { tl.to(transitionWrap, { autoAlpha: 0, duration: 1, ease: 'none' }); } if (navWrap) { tl.from(navWrap, { autoAlpha: 0, y: -20, duration: 1, ease: 'power2.out' }, transitionWrap ? '>-50%' : 0); } if (navSecondaryWrap) { tl.from(navSecondaryWrap, { autoAlpha: 0, y: -20, duration: 1, ease: 'power2.out' }, '<'); } // Only animate hero if one exists on the page if (heroData.length > 0) { tl.add(() => animateHero(), '<+25%'); // Animate main wrapper excluding hero section if (pageMain) { const nonHeroChildren = pageMain.querySelectorAll(':scope > \*:not(\[data-animate-hero-wrap\])'); if (nonHeroChildren.length > 0) { tl.from( nonHeroChildren, { autoAlpha: 0, y: 20, duration: 1, ease: 'power2.out', }, '>-20%', ); } } } else if (pageMain) { // Animate entire main wrapper if no hero exists tl.from( pageMain, { autoAlpha: 0, y: 20, duration: 1, ease: 'power2.out', }, '>-50%', ); } if (transitionWrap) { tl.set(transitionWrap, { display: 'none' }); } // LINK CLICK TRANSITIONS $('a:not(.ignore-transition)').on('click', function (e) { // Let browser handle new-tab/window behaviors if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.which === 2 || e.button === 1) { return; } let currentUrl = $(this).attr('href'); if ($(this).prop('hostname') === window.location.host && !currentUrl.includes('#') && $(this).attr('target') !== '\_blank') { // SECURITY: Validate URL before navigation to prevent injection attacks if (!isValidSameOriginUrl(currentUrl)) { console.warn('Navigation blocked: Invalid or unsafe URL', currentUrl); return; } e.preventDefault(); let tl = gsap.timeline({ onComplete: () => (window.location.href = currentUrl) }); // nosemgrep: unsafe-url-manipulation if (transitionWrap) { tl.set(transitionWrap, { display: 'block' }); tl.fromTo(transitionWrap, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.75, ease: 'none' }); } } }); // BACK BUTTON HANDLING window.onpageshow = function (event) { if (event.persisted) window.location.reload(); }; }); /\* Heading Animation \*/ document.addEventListener('DOMContentLoaded', () => { const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; if (prefersReducedMotion) { return; } document.querySelectorAll('\[data-animate-header-wrap\]').forEach((header) => { const heading = header.querySelector('\[data-animate-header-heading\]'); const text = header.querySelector('\[data-animate-header-text\]'); const cta = header.querySelector('\[data-animate-header-cta\]'); const tl = gsap.timeline({ scrollTrigger: { trigger: header, start: 'top bottom', end: 'top 80%', toggleActions: 'none play none reset', }, }); // Animate heading with split text if (heading && heading.children.length > 0) { const split = SplitText.create(heading.children, { type: 'words', wordsClass: 'word', }); if (split.words && split.words.length > 0) { tl.from(split.words, { autoAlpha: 0, duration: 1, ease: 'power2.out', stagger: { amount: 0.2 }, }); } } // Animate text if (text) { tl.from( text, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+30%', ); } // Animate CTA if (cta) { tl.from( cta, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+25%', ); } }); }); /\* Columns & Cards Animation \*/ document.addEventListener('DOMContentLoaded', () => { const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; if (prefersReducedMotion) { return; } document.querySelectorAll('\[data-animate-card-wrap\]').forEach((cardWrap) => { const cards = cardWrap.querySelectorAll('\[data-animate-card-card\]'); // NodeList is always truthy, so check length instead if (cards.length === 0) return; const tl = gsap.timeline({ scrollTrigger: { trigger: cardWrap, start: 'top bottom', end: 'top 70%', toggleActions: 'none play none none', }, }); tl.from(cards, { autoAlpha: 0, y: 20, duration: 0.75, stagger: { each: 0.1 }, ease: 'power2.out', }); }); }); /\* Combined Artifact Toggle & Metadata Animation \*/ document.addEventListener('DOMContentLoaded', () => { // Configuration const TOGGLE\_ENABLED = true; // Set to false to disable toggle functionality // Initially hide all artifact\_metadata elements for animation const style = document.createElement('style'); style.textContent = \`.artifact\_metadata { opacity: 0; transform: translateY(32px); }\`; document.head.appendChild(style); // Track which columns have been animated and which have toggles const animatedColumns = new Set(); const toggleManagedColumns = new Set(); // ============================================ // METADATA ANIMATION FUNCTIONALITY // ============================================ // Function to animate metadata items function animateMetadata(column) { // Skip if already animated or if this column is toggle-managed and hidden if (animatedColumns.has(column)) return; if (toggleManagedColumns.has(column) && column.style.display === 'none') return; const metadataItems = column.querySelectorAll('.artifact\_metadata'); if (metadataItems.length > 0) { animatedColumns.add(column); gsap.fromTo( metadataItems, { opacity: 0, y: 32, }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.2, }, ); } } // Intersection Observer for viewport visibility const observer = new IntersectionObserver( (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { // Only animate if not hidden by toggle if (!toggleManagedColumns.has(entry.target) || entry.target.style.display !== 'none') { animateMetadata(entry.target); } } }); }, { threshold: 0.5, rootMargin: '0px 0px -80px 0px', }, ); // ============================================ // TOGGLE FUNCTIONALITY // ============================================ if (TOGGLE\_ENABLED) { const toggleButtons = document.querySelectorAll('.artifact\_toggle'); const MOBILE\_BREAKPOINT = 768; // Adjust as needed toggleButtons.forEach((button) => { const container = button.closest('.artifact\_component\_wrap') || button.parentElement; const metadataColumn = container.querySelector('.artifact\_column\_metadata'); const contentColumn = container.querySelector('.artifact\_column\_content'); if (!metadataColumn || !contentColumn) return; // Check if this is variant 1-1 (toggle always visible) const artifactWrapper = button.closest('\[data-wf--artifact-wrapper--variant\]'); const isVariant11 = artifactWrapper?.getAttribute('data-wf--artifact-wrapper--variant') === '1-1'; // Mark this metadata column as toggle-managed toggleManagedColumns.add(metadataColumn); // Track current state let showingContent = true; // Helper function to check if we're on mobile function isMobile() { return window.innerWidth <= MOBILE\_BREAKPOINT; } // Helper function to check if toggle should be active function shouldToggleBeActive() { // Toggle is active if: // 1. It's variant 1-1 (always active), OR // 2. We're on mobile/tablet return isVariant11 || isMobile(); } // Helper function to update button text function updateButtonText(newText) { const walker = document.createTreeWalker( button, NodeFilter.SHOW\_TEXT, { acceptNode: function (node) { return node.textContent.trim() ? NodeFilter.FILTER\_ACCEPT : NodeFilter.FILTER\_REJECT; }, }, false, ); let textNode; while ((textNode = walker.nextNode())) { textNode.textContent = newText; break; } } // Set initial states based on viewport and variant function initializeToggleState() { if (shouldToggleBeActive()) { // Toggle is active: Hide metadata initially gsap.set(metadataColumn, { display: 'none', opacity: 0, y: -24, }); gsap.set(contentColumn, { display: 'flex', opacity: 1, y: 0, }); updateButtonText('View prompt'); showingContent = true; button.style.display = ''; // Show toggle button (let CSS control it) } else { // Toggle not active: Show both columns, hide toggle button gsap.set(\[metadataColumn, contentColumn\], { clearProps: 'display,opacity,y', }); button.style.display = 'none'; // Hide toggle button // Reset the state flag showingContent = true; // Trigger metadata animation if in viewport and not yet animated if (!animatedColumns.has(metadataColumn)) { // Check if already in viewport const rect = metadataColumn.getBoundingClientRect(); const inViewport = rect.top < window.innerHeight && rect.bottom > 0; if (inViewport && metadataColumn.offsetParent !== null) { animateMetadata(metadataColumn); } } } } // Toggle animation function button.addEventListener('click', () => { if (!shouldToggleBeActive()) return; // Safety check if (showingContent) { // Switch to metadata/prompt view gsap.to(contentColumn, { opacity: 0, y: 24, duration: 0.3, ease: 'power2.inOut', onComplete: () => { gsap.set(contentColumn, { display: 'none' }); }, }); gsap.set(metadataColumn, { display: 'flex' }); // Check if metadata needs initial animation if (!animatedColumns.has(metadataColumn)) { // First time showing - animate the metadata items animateMetadata(metadataColumn); // Also animate the column itself gsap.fromTo( metadataColumn, { opacity: 0, y: -24, }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.15, }, ); } else { // Already animated before - just show it gsap.fromTo( metadataColumn, { opacity: 0, y: -24, }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.15, }, ); } updateButtonText('View result'); showingContent = false; } else { // Switch back to content view gsap.to(metadataColumn, { opacity: 0, y: -24, duration: 0.3, ease: 'power2.inOut', onComplete: () => { gsap.set(metadataColumn, { display: 'none' }); }, }); gsap.set(contentColumn, { display: 'flex' }); gsap.fromTo( contentColumn, { opacity: 0, y: 24, }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.15, }, ); updateButtonText('View prompt'); showingContent = true; } }); // Initialize toggle state initializeToggleState(); // Handle resize events let resizeTimer; window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { initializeToggleState(); }, 250); }); }); } // ============================================ // OBSERVE ALL COLUMNS // ============================================ // Observe all artifact columns for animation const artifactColumns = document.querySelectorAll('.artifact\_column\_metadata'); artifactColumns.forEach((column) => { observer.observe(column); }); // ============================================ // TAB & SLIDER LISTENERS // ============================================ // Tab activation listener document.addEventListener('click', (e) => { const tab = e.target.closest('\[role="tab"\], .tab-button, .w-tab-link, \[data-w-tab\]'); if (tab) { setTimeout(() => { document.querySelectorAll('.artifact\_column\_metadata').forEach((column) => { // Check if column is visible and not toggle-hidden if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) { animateMetadata(column); } }); }, 100); } }); // Slider change listener document.addEventListener('click', (e) => { const sliderControl = e.target.closest('\[data-aside-prev\], \[data-aside-next\], \[data-aside-dot\], .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet'); if (sliderControl) { setTimeout(() => { document.querySelectorAll('.artifact\_column\_metadata').forEach((column) => { if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) { animateMetadata(column); } }); }, 300); } }); // Swiper events if (typeof Swiper !== 'undefined') { document.querySelectorAll('.swiper').forEach((swiperEl) => { const swiper = swiperEl.swiper; if (swiper) { swiper.on('slideChange', () => { setTimeout(() => { document.querySelectorAll('.artifact\_column\_metadata').forEach((column) => { if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) { animateMetadata(column); } }); }, 100); }); } }); } }); document.addEventListener('DOMContentLoaded', function() { const contentElement = document.querySelector('\[data-readtime="content"\]'); const minutesElement = document.querySelector('\[data-readtime="minutes"\]'); if (!contentElement || !minutesElement) return; const text = contentElement.innerText || contentElement.textContent; const wordCount = text.trim().split(/\\s+/).length; const wordsPerMinute = 250; const minutes = Math.round(wordCount / wordsPerMinute); minutesElement.textContent = minutes || 1; // minimum 1 minute });