Best practices for computer and browser use with Claude | Claude!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);.anti-flicker, .anti-flicker \* {visibility: hidden !important; opacity: 0 !important;}\[data-wf-hidden-variation\], \[data-wf-hidden-variation\] \* { display: none !important; }         html:not(.gsap-not-found) \[data-prevent-flicker='true'\] { visibility: hidden; } .line-mask, .word-mask, .char-mask { padding-block: 0.1em; margin-block: -0.1em; }

\[data-prevent-flicker='true'\] { visibility: visible !important; }

.transition\_wrap { display: block; } // Hide the transition\_wrap in Webflow preview mode w/ custom code enabled if (window.location.hostname.includes('.canvas.webflow.com')) { document.write('<style>.transition\_wrap{display:none!important}\[data-prevent-flicker="true"\]{visibility:visible!important}</style>'); } { "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Best practices for computer and browser use with Claude", "description": "Practical guidance for developers building computer and browser use integrations with the Claude model family.", "image": "https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a04cc7d3d02e5b1490e58cb\_og\_best-practices-for-computer-and-browser-use-with-claude.jpg", "publisher": { "@id": "https://claude.com/#organization" }, "datePublished": "May 13, 2026", "dateModified": "May 13, 2026", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://claude.com/blog/best-practices-for-computer-and-browser-use-with-claude" } }

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
2.  Best practices for computer and browser use with Claude
    

Explore here

-   [
    
    Ask questions about this page
    
    ](#)
-   [
    
    Copy as markdown
    
    ](#)

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0112e18cdd7f0b92d19e40_Hand-BuildingBricks.svg)

# Best practices for computer and browser use with Claude

_Practical guidance for developers building computer and browser use integrations with the Claude model family._

.button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

[](#)

.button\_main\_icon { transition: color 300ms ease; } .button\_main\_wrap:hover .button\_main\_icon { color: var(--\_button-style---icon-hover); } .button\_main\_wrap:focus-within .button\_main\_icon { color: var(--\_button-style---text-hover) !important; } .button\_main\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

[](#)

-   Category
    
    [Agents](https://claude.com/blog/category/agents)
    
-   Product
    
    Claude Platform
    
-   Date
    
    May 13, 2026
    
-   Reading time
    
    5
    
    min
    
-   Share
    
    [Copy link](#)
    
    https://claude.com/blog/best-practices-for-computer-and-browser-use-with-claude
    

/\* Fluid breakout for blog embeds + code blocks \*/ .u-rich-text-blog .w-embed, .u-rich-text-blog pre.w-code-block { --max-w: 860px; --gutter: 24px; --available: calc(100vw - (var(--gutter) \* 2)); --w: min(var(--max-w), var(--available)); width: var(--w); max-width: var(--w); margin-left: calc((640px - var(--w)) / 2); margin-right: calc((640px - var(--w)) / 2); box-sizing: border-box; } @media (max-width: 720px) { .u-rich-text-blog .w-embed, .u-rich-text-blog pre.w-code-block { width: 100%; max-width: 100%; margin-left: 0; margin-right: 0; } /\* Constrain the post column to the viewport so nothing overflows the page \*/ .blog\_post\_layout.u-column-custom, .blog\_post\_content\_wrap, .u-rich-text-blog { max-width: 100% !important; box-sizing: border-box; } html, body { overflow-x: hidden; } } /\* Embed inner wrappers: scroll horizontally when content overflows \*/ .u-rich-text-blog .w-embed figure { width: 100% !important; max-width: 100% !important; margin: 0 !important; } .u-rich-text-blog .w-embed figure > div { width: 100% !important; max-width: 100% !important; overflow-x: auto !important; -webkit-overflow-scrolling: touch; } /\* Tables: ratios on wider screens, natural width + scroll on mobile \*/ .u-rich-text-blog .w-embed table { width: 100% !important; table-layout: fixed !important; } .u-rich-text-blog .w-embed table th:nth-child(1), .u-rich-text-blog .w-embed table td:nth-child(1) { width: 22%; } .u-rich-text-blog .w-embed table th:nth-child(2), .u-rich-text-blog .w-embed table td:nth-child(2) { width: 39%; } .u-rich-text-blog .w-embed table th:nth-child(3), .u-rich-text-blog .w-embed table td:nth-child(3) { width: 39%; } .u-rich-text-blog .w-embed td code, .u-rich-text-blog .w-embed th code { overflow-wrap: anywhere; word-break: break-word; white-space: normal; } @media (max-width: 639px) { .u-rich-text-blog .w-embed table { width: auto !important; min-width: 640px !important; table-layout: auto !important; } .u-rich-text-blog .w-embed table th, .u-rich-text-blog .w-embed table td { min-width: 0 !important; width: auto !important; } } /\* Code blocks \*/ .u-rich-text-blog pre.w-code-block { overflow-x: auto; -webkit-overflow-scrolling: touch; } @media (max-width: 639px) { .u-rich-text-blog pre.w-code-block { font-size: 0.82rem; } }

Claude's [latest models](https://www.anthropic.com/news/claude-sonnet-4-6) represent a significant step forward in computer and browser use capabilities. Because of these features, LLMs are now able to power increasingly complex agentic systems that power real work, like building software applications and automating workflows across multiple, disparate technologies.

In this blog post, we share best practices for using Claude with computer and browser use, ranging from simple configuration changes to more advanced integration patterns. We hope this piece helps as you start integrating Claude's computer and browser use capabilities into your product. We are also releasing a new [demo implementation](https://github.com/anthropics/claude-quickstarts/tree/main/computer-use-best-practices) which encapsulates some of these best practices and provides additional tools useful for developing on top of Claude's computer use capabilities.

_Note that these recommendations apply to the Claude 4.6 family (Opus 4.6, Sonnet 4.6, Haiku 4.5) and Claude Opus 4.7 unless otherwise noted. Where guidance differs between the 4.6 family and Opus 4.7, we call it out inline. Our findings are based on internal experimentation and may be updated in the future as new models and techniques emerge._

# **Getting started: resolution and scaling**

Click accuracy is the foundation of any computer use integration. If clicks don't land where they should, nothing downstream works: forms don't get filled, buttons don't get pressed, and workflows fail. The single highest impact optimization is also one of the simplest: pre downscale your screenshots before sending them to the API.

## **Ensure proper scaling**

When you send a screenshot to Claude’s Computer Use API, the model sees it and returns click coordinates in the display\_width\_px / display\_height\_px coordinate space you specified. But there's an important constraint: the API has internal processing limits on image size. Images that exceed these limits get downscaled before the model sees them, which means the model is clicking based on a degraded version of the image while your harness expects coordinates aligned to the original resolution.

For our Claude 4.6 model family, the API's limits are:

-   **Max long edge**: 1568 pixels
-   **Max total pixels**: 1.15 megapixels
-   Images exceeding **either** limit get internally downscaled

Our Opus 4.7 model supports higher resolution. The limits are:

-   **Max long edge**: 2576 pixels
-   **Max total pixels**: 3.75 megapixels
-   Images exceeding **either** limit get internally downscaled

When the coordinate space and the model's perceived image don't match, the model's predicted clicks land on a display scale different from the image it's actually seeing. This is the primary cause of click inaccuracy at high resolutions. The fix is straightforward: always downscale your screenshots to fit within these limits before sending them to the API. We consistently observe significant accuracy degradation when images exceed the limits, and this single change is worth more than almost any other optimization.

## **Recommended resolutions**

**Start with 1280x720.** This is a safe, practical default for most use cases. It uses about 80% of the pixel budget, stays well within both the long edge and total pixel limits, and is a standard resolution that models have seen during training. It works well for both modern web UIs and legacy desktop applications.

**If you are using Opus 4.7, we recommend starting with 1080p**, as this brings a meaningful quality lift over 720p and provides a good balance between token use and performance.

**For developers who want to maximize the visual information the model receives**, we also recommend a "max API fit" approach: computing the optimal resolution per-image based on the source's native aspect ratio:

```python
import math

# 1568 for 4.6 family, 2576 for Opus 4.7
MAX_LONG_EDGE = 1568

# 1.15MP for 4.6 family, 3.75MP for Opus 4.7
MAX_PIXELS = 1_150_000

def compute_max_api_fit(native_w, native_h):
    """Compute the largest resolution that fits API limits
    while preserving aspect ratio."""
    aspect = native_w / native_h

    # Compute max dimensions from pixel budget
    h_from_pixels = math.sqrt(MAX_PIXELS / aspect)
    w_from_pixels = h_from_pixels * aspect

    # Apply long edge constraint
    if native_w >= native_h:
        w = min(w_from_pixels, MAX_LONG_EDGE)
        h = w / aspect
    else:
        h = min(h_from_pixels, MAX_LONG_EDGE)
        w = h * aspect

    # Never upscale beyond native
    w = min(w, native_w)
    h = min(h, native_h)

    return int(w), int(h)
```

This approach is slightly more complex but avoids aspect ratio distortion and uses the full pixel budget available for each image. The accuracy improvement over a fixed 1280x720 is modest, but it's a straightforward implementation that avoids the distortion that occurs when forcing a 16:9 source into a 4:3 display resolution.

**Resolutions to avoid:**

-   **Native resolution (unscaled)**: Unless your source images happen to be below the resolution limits, sending native resolution screenshots is the most common cause of poor click accuracy.
-   **Very low resolutions (below 960x540)**: With low resolution images, too much detail is lost for the model to accurately identify small UI elements.
-   **If on MacOS:**  A common issue for browser use is that the screenshots on MacOS are often captured with a device pixel ratio of 2, which means that you can end up with images that are 2x the resolution of the screen coordinates.
-   **If you are on the 4.6 family, avoid 1920x1080 and above:** These exceed the pixel limit and will be silently downscaled. On Opus 4.7 the ceiling is higher (3.75 MP), so 1080p and 1440p is within budget; still avoid native 4K without downscaling.

## **Coordinate scaling**

When you resize a screenshot before sending it, the model returns click coordinates in the display resolution you specified. You must scale these back to your actual screen resolution before executing the click:

```python
# Your screen is screen_w x screen_h
# You sent a screenshot resized to display_w x display_h
scale_x = screen_w / display_w
scale_y = screen_h / display_h

screen_x = int(api_returned_x * scale_x)
screen_y = int(api_returned_y * scale_y)
```

This is straightforward but critical, because if you forget to scale or `display_width_px` / `display_height_px` don't match the actual dimensions of the image you sent, every click will be consistently offset

## **Content ordering in the messages array**

When constructing your messages content array, place the text instruction _before_ the image, as depicted in the code snippet below. This lets the model know what it's looking for as it processes the screenshot, which improves click accuracy.

```python
# RECOMMENDED — text instruction first, then screenshot:
content = [
    {"type": "text", "text": "Click on the Submit button"},
    {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": screenshot_b64}},
]

# NOT RECOMMENDED — image first, then text:
content = [
    {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": screenshot_b64}},
    {"type": "text", "text": "Click on the Submit button"},
]
```

## **Diagnosing click issues**

If clicks are missing their targets, it often boils down to one of the causes, below: 

Symptom

Likely causes

Try this

Clicks consistently offset in one direction

-   `display_width_px` / `display_height_px` don't match the actual image dimensions sent
-   Screenshot exceeds API limits and is being silently downscaled
-   Content ordering is image-first instead of text-first

-   Ensure display dimensions exactly match your resized screenshot, not your native resolution
-   Pre-downscale to 1280x720 or use `compute_max_api_fit`
-   Move text instruction before the image in the content array

Clicks land in roughly the right area but miss the target

-   Target is very small (checkbox, icon, toggle)
-   Source image was very high resolution (4K+) and detail was lost during downscaling
-   Aspect ratio distortion from forcing a non-native aspect ratio

-   Enable `enable_zoom: True` for dense UIs
-   Capture at a lower DPI or crop to the relevant screen region before downscaling
-   Preserve the source aspect ratio when resizing

Model clicks the wrong element entirely

-   Ambiguous instruction ("click Submit" when multiple submit-like buttons exist)
-   Visually similar elements near the target
-   UI is too complex for a single instruction

-   Use more specific prompts with positional context ("click the blue Submit button in the bottom-right of the form")
-   Break complex interactions into smaller steps
-   Provide additional context about the page layout

Accuracy is poor across the board

-   Screenshots are being sent above API limits
-   Source images are from very high-resolution displays (4K+) with extreme compression ratios
-   Resolution is too low, losing critical detail

-   Pre-downscale all screenshots to fit within limits
-   For 4K+ sources on the 4.6 family, Sonnet is more robust to heavy downscaling than Opus 4.6. On Opus 4.7 this gap largely closes, use the 4.7 pixel budget (up to 3.75 MP) so less downscaling is needed in the first place.
-   Try 1280x720 as a baseline; if too lossy, use `compute_max_api_fit`

## **Model selection for clicking tasks**

Based on our internal testing, Claude Sonnet 4.6 tends to be more mechanically precise at clicking (better spatial accuracy, fewer near misses) while Claude Opus 4.6 brings stronger reasoning. Sonnet 4.6 is also more robust when source images require heavy downscaling. 

Opus 4.7 narrows this gap: Through testing, we have found its clicking precision is roughly on par with Sonnet 4.6, and its higher resolution budget reduces the amount of downscaling needed in the first place, making it a strong choice when you want Opus-level reasoning paired with strong click accuracy.

For most tasks, we recommend starting with Sonnet 4.6, which provides the best balance of clicking accuracy, reasoning, and cost. Choose Opus 4.7 when you want stronger reasoning, particularly if using high-resolution source images. Haiku 4.5 remains an excellent option when latency is the priority. Advanced workflows may still benefit from an orchestrator + sub-agent pattern where a reasoning model handles planning and decision-making while Sonnet or Haiku executes the mechanical clicking steps.

## **Handling small targets**

Click accuracy degrades as targets get smaller. Large and medium UI elements (buttons, input fields, and standard menu items) are reliable across all resolutions within the safe zone. The challenge is with small and tiny targets, like checkboxes, system tray icons, dropdown arrows, small toggle switches, and tree view expand/collapse buttons.

If your application involves clicking small targets frequently, consider these strategies:

**Use zoom for dense UIs.** Claude 4.6 and 4.7 models support a zoom capability that lets the model inspect specific screen regions at higher resolution before clicking. Enable it in your [tool configuration](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool):

```python
{
    "type": "computer_20251124",
    "name": "computer",
    "display_width_px": 1280,
    "display_height_px": 720,
    "enable_zoom": True
}
```

**Make targets larger.** If you control the UI being automated, increasing the size of click targets (even modestly) has a disproportionate impact on reliability. This might mean using a lower system DPI, zooming in the browser, or adjusting UI scaling settings.

**Use keyboard alternatives for tiny targets.** For very small elements, such as system tray icons or tiny checkboxes), keyboard shortcuts or tab-based navigation can be more reliable than clicking. If your workflow allows it, prompting the model to use keyboard interactions for specific steps can improve success rates.

**Consider source image resolution.** Screenshots from 4K+ displays that get compressed down to 720p lose significant detail (for example, a 16px checkbox at 3840x2160 native becomes roughly 5px at 1280x720 display resolution, which makes the target much smaller and therefore more difficult to hit). If you're working with very high-resolution displays, consider using Opus 4.7,  which has a higher resolution limit than previous models. If using 4.6 models, consider capturing at a lower DPI, using display scaling to enlarge UI elements, or focusing the screenshot on the relevant portion of the screen rather than the full display. Because these models represent more information with less pixels, we’ve observed that performance degrades as source image scale increases, meaning more compression is needed. 

## **Approaches we tested that didn't help**

We experimented on internal evaluations with several popular optimization techniques and did not find consistent uplift from these approaches, though results may vary depending on the specific situation:

-   **Breaking the image into smaller tiles**: Splitting a screenshot into quadrants or regions and sending them separately did not improve click accuracy.
-   **Overlaying a grid pattern with coordinates**: Adding a visual coordinate grid to screenshots to help the model localize targets did not produce reliable gains.
-   **Resize algorithm choice**: PIL LANCZOS, sips, and other common resize algorithms produced identical results. Use whatever is convenient for your stack.

## **Inspecting failures**

If the model acts unpredictably after trying the fixes above, log the full transcripts and overlay the predicted clicks on the source screenshots to understand what the model is actually seeing and deciding.

Some failures aren't about click accuracy at all. For example, certain dropdown menus may invoke system-level UI that the browser viewport doesn't capture—the model appears to be failing the task, but it simply can't see the menu it needs to interact with. In cases like these, the model should rely on alternative methods such as JavaScript execution, keyboard navigation, or direct document object model (DOM) manipulation rather than clicking.

## **Quick reference**

_How to scale and prepare an image for computer use_

```python
import math
from PIL import Image
import base64
import io

# 1568 for 4.6 family, 2576 for Opus 4.7
MAX_LONG_EDGE = 1568

# 1.15MP for 4.6 family, 3.75MP for Opus 4.7
MAX_PIXELS = 1_150_000

def prepare_screenshot(screenshot: Image.Image, native_w: int, native_h: int) -> tuple[str, int, int]:
    """Resize a screenshot to fit API limits and return base64 + display dimensions."""

    # Option A: Fixed 720p (simple, reliable)
    display_w, display_h = 1280, 720

    # Option B: Max API fit (maximizes fidelity)
    # display_w, display_h = compute_max_api_fit(native_w, native_h)

    resized = screenshot.resize((display_w, display_h), Image.LANCZOS)

    buffer = io.BytesIO()
    resized.save(buffer, format="PNG")
    b64 = base64.standard_b64encode(buffer.getvalue()).decode()

    return b64, display_w, display_h


def scale_coordinates(api_x: int, api_y: int, display_w: int, display_h: int,
                      screen_w: int, screen_h: int) -> tuple[int, int]:
    """Scale API-returned coordinates back to native screen space."""
    screen_x = int(api_x * (screen_w / display_w))
    screen_y = int(api_y * (screen_h / display_h))
    return screen_x, screen_y


def compute_max_api_fit(native_w: int, native_h: int) -> tuple[int, int]:
    """Compute the largest resolution that fits API limits while preserving aspect ratio."""
    aspect = native_w / native_h
    h_from_pixels = math.sqrt(MAX_PIXELS / aspect)
    w_from_pixels = h_from_pixels * aspect

    if native_w >= native_h:
        w = min(w_from_pixels, MAX_LONG_EDGE)
        h = w / aspect
    else:
        h = min(h_from_pixels, MAX_LONG_EDGE)
        w = h * aspect

    w = min(w, native_w)
    h = min(h, native_h)
    return int(w), int(h)
```

**Usage:**

```python
import anthropic
from PIL import Image

client = anthropic.Anthropic()

# Capture screenshot (your method here)
screenshot = Image.open("screenshot.png")
native_w, native_h = screenshot.size

# Prepare for API
b64, display_w, display_h = prepare_screenshot(screenshot, native_w, native_h)

# Send to Claude — text before image
response = client.beta.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    betas=["computer-use-2025-11-24"],
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Click on the Submit button"},
            {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": b64}},
        ]
    }],
    tools=[{
        "type": "computer_20251124",
        "name": "computer",
        "display_width_px": display_w,
        "display_height_px": display_h,
    }],
)

# Scale coordinates back for execution
api_x, api_y = extract_click_coords(response)  # your parsing logic
screen_x, screen_y = scale_coordinates(api_x, api_y, display_w, display_h, native_w, native_h)
```

# **Tuning thinking effort for computer use**

Claude's latest models support [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking), a setting which lets Claude decide how much to reason through intermediate steps before acting. Instead of manually setting a thinking token budget, adaptive thinking lets Claude dynamically determine when and how much to use extended thinking based on the complexity of each request. For computer use, this means Claude can think through what it's seeing on screen, plan multi-step interactions, and self-correct before committing to a click or keystroke.

With adaptive thinking, Claude's thinking depth is controlled via the thinking parameter with an effort level: low, medium, high,xhigh (with Opus 4.7),and max. More thinking means more reasoning per action, but also more output tokens, higher latency, and higher cost.

The natural question: depending on the model, how much thinking is optimal for computer use?

## **Claude Opus 4.7**

We tested each thinking effort level across a suite of end to end UI automation tasks spanning desktop applications, browsers, and multi-application workflows.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0240d5a273c79dddb95eb5_image1.png)

**Opus 4.7 outperforms the 4.6 family.** On the OSWorld Verified benchmark, we find that Opus outperforms all 4.6 family models at equivalent token usage and effort settings. Opus 4.7 on low effort scores similarly to Sonnet 4.6 on max, while using ~1/10th the tokens per task. For difficult tasks, Opus 4.7 is the obvious choice.

**Setting effort to `high`** achieves close to the highest task success rate while using roughly half the output tokens of `max`. Compared to Opus 4.6, low, medium and high all use approximately the same amount of tokens while improving score on OSWorld. During our internal testing, Max effort used more tokens and provided the best score. The table below outlines our recommendations for when to use each thinking effort level.

### **Recommendations for effort levels**

Scenario

Thinking effort

Why

Default for most use cases

`high`

Opus 4.7 is best for difficult tasks. Using high will give the model enough reasoning to plan over complex multi-step interactions without significantly increasing token usage.

High-throughput / cost-sensitive

`low`

Lower token usage while providing quality between Opus 4.6's high and max effort settings.

Simple, well-defined workflows / fastest

Suggest trying Sonnet 4.6

Use if low latency is the highest priority. Adequate for short, predictable tasks where the UI is consistent and the workflow is known.

Complex, one-shot tasks

`max`

Use when tasks are highly challenging and you need to get it right on the first attempt.

## **Claude 4.6 models**

We tested each thinking effort level across a suite of end to end UI automation tasks spanning desktop applications, browsers, and multi-application workflows.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a024267c961b1b1c42684fc_image2.png)

Two patterns stand out:

‍**Medium effort is the sweet spot.** Setting effort to medium achieves close to the highest task success rate while using roughly half the output tokens of high. Beyond medium, performance somewhat plateaus. Notably, when tasks are retried, medium and high converge to the same success rate. This means high effort may help the model get a difficult task right on the first try, but given multiple attempts, medium may get there as reliably at lower cost.

**A little thinking goes a long way.** low effort is a surprisingly strong option. It actually uses _fewer_ total output tokens than disabling thinking entirely (the model makes fewer mistakes and needs fewer retry cycles), while matching or slightly exceeding no-thinking accuracy. This makes it the best option for cost-sensitive, high-throughput workloads. The table below outlines our effort recommendations.

### **Recommendations for effort levels**

Scenario

Thinking effort

Why

Default for most use cases

`medium`

Best accuracy-to-cost ratio. Gives the model enough reasoning to plan multi-step interactions without overthinking. With retries, matches high performance at half the token cost.

High-throughput / cost-sensitive

`low`

More accurate than no thinking, but with lower token usage due to fewer errors and retries.

Simple, well-defined workflows / fastest

Thinking disabled

Use if low latency is the highest priority. Adequate for short, predictable tasks where the UI is consistent and the workflow is known.

Complex, one-shot tasks

`high`

Use when tasks are challenging and you need to get it right on the first attempt. If your system supports retries, medium may achieve the same eventual success rate.

We don't recommend `max` effort for computer use. In our testing, it provides no accuracy benefit over `high` while further increasing output token cost. UI tasks are primarily perceptual rather than deeply logical, and the additional reasoning budget goes unused or leads to overthinking. Keep in mind that this advice will change as models evolve.

## **Example configuration of medium setting effort level**

```python
import anthropic

client = anthropic.Anthropic()

response = client.beta.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    betas=["computer-use-2025-11-24"],
    thinking={"type": "adaptive"},
    output_config={"effort": "medium"},
    messages=[...],
    tools=[
        {
            "type": "computer_20251124",
            "name": "computer",
            "display_width_px": 1280,
            "display_height_px": 720,
        }
    ],
)
```

## **Why more thinking doesn't always help**

UI automation tasks are fundamentally different from coding or math problems. Most computer use actions are perceptual and mechanical: identifying the right element, clicking in the right place, rather than deeply logical. Thinking helps most when the model needs to:

-   Plan a multi-step sequence before starting (e.g., "I need to open Settings, navigate to Privacy, then disable tracking")
-   Recover from an unexpected UI state (e.g., a dialog appeared that wasn't anticipated)
-   Cross-reference information between what's on screen and the task instructions
-   Complete challenging projects on professional software

# **Improving safety: leveraging prompt injection classifiers**

_This section covers prompt injection protection, which is offered by default and for free if you use our official computer use tool header. However, if you are interested in enabling this on custom computer or browser use tools, please fill out our_ [_Prompt Injection Classifiers Interest Form._](https://docs.google.com/forms/d/e/1FAIpQLSfXj6rXC-SUQEYHCLabwUe5JuYiYyJ29Ja-KP7EhLIPlyz0tw/viewform?usp=dialog)

Computer use agents interact with untrusted content by design. Every screenshot, webpage, or application UI that Claude processes could contain adversarial instructions, including hidden text, manipulated images, deceptive UI elements, or social engineering attempts that try to hijack the agent's behavior. This attack surface is fundamentally different from a typical API integration where you control the inputs. With computer use, the inputs to the model are the open internet and whatever software the agent is navigating.

As computer use agents become more capable and more widely deployed, prompt injection becomes a correspondingly more serious risk. An agent that can click, type, and navigate can be manipulated into taking real-world actions such as filling out forms, downloading files, or navigating to malicious URLs. Building robust defenses against these attacks is essential for any production deployment.

## **How we approach prompt injection defense**

We've written in detail about our [approach to prompt injection defenses](https://www.anthropic.com/research/prompt-injection-defenses) for browser and computer use. Our defense strategy operates at multiple layers:

**Training-time robustness.** We use reinforcement learning to build prompt injection resistance directly into Claude's capabilities. During training, Claude is exposed to injected content embedded in simulated web pages and application UIs, and rewarded when it correctly identifies and refuses to follow malicious instructions. This means Claude's first line of defense is the model itself as it has learned to distinguish between legitimate user instructions and adversarial content encountered during task execution.

**Real-time classifiers.** We run probes that scan content entering Claude's context window and flag potential prompt injection attempts. These probes detect adversarial commands across multiple modalities such as text hidden in page content, instructions embedded in images, and deceptive UI elements designed to trick the agent and then adjust Claude's behavior when they identify an attack.

**Continuous red teaming.** Our security researchers continuously probe these defenses, and we participate in external adversarial evaluations to benchmark robustness against evolving attack techniques.

We've continued to invest heavily in all three layers since our initial computer use research preview. Each new model generation incorporates stronger training-time defenses and more capable classifiers, and we've expanded the range of attack techniques our red team evaluates against.

## **Using Claude’s built-in classifiers**

When you use Claude's [official computer use tool](https://docs.anthropic.com/en/docs/agents-and-tools/computer-use) via the API, prompt injection classifiers run automatically on every request. These classifiers operate in parallel with the main model inference, adding approximately zero additional latency and no additional cost to your requests.

There is nothing you need to configure to enable this protection. It's on by default when you use the official `computer_20251124` tool type. The classifiers evaluate screenshots and other content for signs of prompt injection and influence Claude's responses accordingly.

```javascript
# Classifiers run automatically when using the official CU tool — no extra config needed
tools = [
    {
        "type": "computer_20251124",
        "name": "computer",
        "display_width_px": 1280,
        "display_height_px": 720,
    }
]
```

## **If you're not using the official computer use tool**

Many developers build computer use integrations using custom tool definitions rather than the official `computer_20251124` tool type, for example, defining their own screenshot and click tools. If this describes your setup, the built-in classifiers described above don't currently run on your requests.

We're actively exploring how to extend prompt injection protection to these custom implementations. If you're building a computer use or browser use integration without the official tool type and are interested in prompt injection classifiers, [fill out this interest form](https://docs.google.com/forms/d/e/1FAIpQLSfXj6rXC-SUQEYHCLabwUe5JuYiYyJ29Ja-KP7EhLIPlyz0tw/viewform?usp=dialog) and we'll follow up as this capability becomes available.

## **Best practices regardless of classifier use**

Classifiers are one layer of defense, not a complete solution. We recommend the following practices for any computer use deployment:

**Implement human-in-the-loop for high-stakes actions.** Have the agent pause and request user confirmation before performing irreversible actions such as submitting forms, making purchases, sending messages, or modifying data. This is the single most effective mitigation against prompt injection regardless of classifier performance.

**Scope the agent's permissions.** Limit what the agent can do. If your workflow doesn't require file downloads, don't give the agent access to download files. If it doesn't need to send emails, don't give it access to an email client. Reducing the blast radius of a successful injection is as important as preventing the injection itself.

**Monitor and log agent actions.** Log the full sequence of actions the agent takes, including screenshots at each step. This allows you to detect anomalous behavior, audit what happens when something goes wrong, and build a feedback loop to improve your system's robustness over time.

**Treat all web content as untrusted.** Design your agent's system prompt to clearly distinguish between the user's instructions and content encountered during task execution. Remind the model that text found on web pages, in emails, or in application UIs is not from the user and should not be treated as instructions.

# **Context management for computer use**

When building computer use agents, screenshots accumulate fast. Every action generates a new image, and each image consumes roughly 1,000–1,800 tokens depending on resolution. After accounting for the system prompt, tool definitions, and text content, a 200k context window can fill up in well under 100 screenshots.

Managing this context well has two goals: 1) keeping total tokens bounded and 2) keeping prompt caching effective so you don't repeatedly pay full price for the same prefix. We've found that effective [context management](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) has more impact on long-running-agent cost and latency than almost any other optimization. This section covers three layers that compose cleanly: placing cache breakpoints, pruning old screenshots without breaking the cache, and summarizing history when pruning isn't enough.

## **Placing cache breakpoints**

Prompt caching only helps if breakpoints land on content that will recur across turns. The API supports four cache breakpoints total. Putting all four on a stable prefix (system prompt, tool definitions) wastes them as that prefix is already hit once and never invalidates, so one breakpoint is enough. The other three are better spent on recent history, where invalidation risk is highest and savings compound over long sessions.

We recommend:

-   **One breakpoint on the system prompt or trailing tool definitions.** This prefix rarely changes within a session.
-   **Up to three additional breakpoints on the most recent tool results**, advancing each turn and clearing the previous iteration's breakpoints so you don't overrun the four-breakpoint limit.

Spreading breakpoints across recent positions gives you graceful degradation. If your most recent breakpoint is invalidated, e.g. by an image prune, a compaction, or a tool-definition change, an earlier breakpoint can still hit, and you keep paying 10% of the full input cost instead of 100%.

_Example of cache control and setting breakpoints:_

```python
def set_trailing_cache_control(messages, max_breakpoints=3):
    """Place up to `max_breakpoints` ephemeral cache_control markers on the
    most recent tool_result blocks, after clearing any existing markers."""
    for msg in messages:
        for block in msg.get("content", []):
            if isinstance(block, dict):
                block.pop("cache_control", None)

    placed = 0
    for msg in reversed(messages):
        for block in reversed(msg.get("content", [])):
            if placed >= max_breakpoints:
                return
            if isinstance(block, dict) and block.get("type") == "tool_result":
                block["cache_control"] = {"type": "ephemeral"}
                placed += 1
```

## **Approach 1: Rolling buffer (cache-aware)**

The simplest way to keep token counts bounded is to keep only the N most recent screenshots and drop the rest. Before each API call, walk the message array and replace older image blocks with a short placeholder (e.g., a text block saying “\[Image omitted\]”).

The naive version of this pattern is dropping screenshots one at a time as they age out, which changes the prefix on every turn and invalidates the prompt cache continuously. This is how rolling buffers got their reputation for breaking caching. The fix is to prune in batches so the prefix stays byte-identical for several turns at a time, then invalidates once, then stays stable again.

A concrete pattern that we have tested is to:

1.  Keep the most recent keep\_n screenshots in full resolution.
2.  Once the total screenshot count exceeds keep\_n + interval, replace the oldest interval screenshots with placeholders in a single pass.
3.  Between pruning events, the message array is byte-identical across turns, so your cache breakpoints keep hitting.

Reasonable defaults to start with: keep\_n = 3, interval = 25. These are tunable, and a higher interval means fewer prune events (better cache efficiency) but a larger tail of full-resolution screenshots in context (more tokens). Measure cache hit rate and total input tokens on a representative trajectory and adjust.

_Example of pruning previous screenshots while keeping cache breakpoints:_

```python
def prune_old_screenshots(messages, keep_n=3, interval=25):
    """Replace older screenshots with text placeholders in batches.
    Only prunes when the total count exceeds keep_n + interval, so the
    message prefix stays byte-stable for `interval` turns between prunes."""
    image_positions = [
        (msg_idx, block_idx)
        for msg_idx, msg in enumerate(messages)
        for block_idx, block in enumerate(msg.get("content", []))
        if isinstance(block, dict) and block.get("type") == "image"
    ]
    if len(image_positions) <= keep_n + interval:
        return messages

    to_prune = image_positions[:-keep_n][-interval:]
    for msg_idx, block_idx in to_prune:
        messages[msg_idx]["content"][block_idx] = {
            "type": "text",
            "text": "[Image omitted]",
        }
    return messages
```

Rolling buffers still have one real limitation: anything outside the buffer is gone. The original instructions, what the agent already tried, and where it is in the task all disappear with the pruned screenshots. For short tasks (under ~50 actions), that's fine. For anything longer, combine this with compaction.

## **Approach 2: LLM-based compaction**

Instead of silently dropping old images, summarize the full conversation before discarding it. The summary preserves what happened, what the user asked for, what's been completed, and where to resume. A few recent screenshots are kept alongside it so the agent can see what it's currently looking at.

Compaction and the cache-aware rolling buffer are complementary. Use the rolling buffer turn-to-turn to keep token growth manageable; use compaction occasionally to reclaim the rest of the window without losing earlier context. Each compaction event is a cache invalidation by design, so you want it to happen rarely, not every few turns.

### **The summarization prompt**

This example prompt provides a scaffold where each section targets a specific failure mode. The prompt must capture everything the agent needs to continue the task without re-reading the original conversation, as depicted in the example below: 

```python
COMPACT_PROMPT = """Your task is to create a detailed summary of this conversation that
will REPLACE the conversation history. The agent will continue working with only this
summary and a few recent screenshots as context.

CRITICAL: Preserve ALL user instructions verbatim. User instructions are the most
critical element. If they are lost, the agent will deviate from the task.

Before providing your summary, analyze the conversation in  tags:
1. Extract every user instruction, requirement, and constraint
2. Identify if this is a repeatable workflow (e.g., processing N items)
3. Chronologically trace what actions were taken and what happened

Your summary MUST include these sections:

1. USER INSTRUCTIONS:
   - Complete initial task definition (verbatim when possible)
   - ALL specific requirements and criteria
   - Every "DO NOT", "ALWAYS", "MUST" instruction
   - Any corrections or feedback that changed the approach

2. TASK TEMPLATE (if this is a repeatable workflow):
   - The pattern being repeated
   - Decision criteria for each iteration
   - Standard workflow steps
   - Example of one completed iteration

3. CONSTRAINTS AND RULES:
   - All user-specified rules and restrictions
   - Edge cases and exceptions discovered

4. ACTIONS TAKEN:
   - Pages visited and elements interacted with
   - Forms filled and buttons clicked

5. ERRORS AND FIXES:
   - What went wrong and how it was resolved
   - Approaches that failed (so they aren't retried)

6. PROGRESS TRACKING:
   - Items completed vs. remaining
   - Current position in the workflow

7. CURRENT STATE:
   - Current application, URL and domain (optional)
   - Important page state (logged in, form progress, etc.)

8. NEXT STEP:
   - Exactly what should be done next to continue
"""
```

In the prompt above, **User Instructions** prevents task drift: without them, the agent deviates after compaction. **Task Template** captures the repeatable pattern so the agent can continue iterating after compaction without re-deriving the workflow from scratch. **Constraints and Rules** preserves restrictions and edge cases set before or discovered during the task, so the agent doesn't violate existing rules it knew to abide by. **Actions Taken** helps track past progress.  **Errors and Fixes** prevents retrying failed approaches ("I already tried clicking Submit; it doesn't work until the Terms checkbox is checked"). **Progress Tracking** prevents restarts and skipped items. **Current State** & **Next Step** gives an unambiguous entry point to resume.

### **Server-side compaction (beta)**

The simplest way to use this prompt is to let the API handle compaction via [server-side compaction](https://docs.anthropic.com/en/docs/build-with-claude/compaction) (beta). Pass your custom summarization prompt as the `instructions` parameter in `context_management`, and the API automatically summarizes when input tokens exceed a trigger threshold. The `instructions` parameter completely replaces the default summarization prompt, so the sections above are what the model will follow. Set `pause_after_compaction` to attach the most recent messages (including screenshots) across compaction events.

_Examples of using autocompaction tool:_

```python
# Minimal — turn on autocompaction with API defaults
response = client.beta.messages.create(
    model="claude-opus-4-7",
    max_tokens=16000,
    betas=["compact-2026-01-12", "computer-use-2025-11-24"],
    context_management={"edits": [{"type": "compact_20260112"}]},
    messages=[...],
    tools=[...],
)

# Customized — set your own trigger threshold and summarization prompt
response = client.beta.messages.create(
    model="claude-opus-4-7",
    max_tokens=16000,
    betas=["compact-2026-01-12", "computer-use-2025-11-24"],
    context_management={
        "edits": [
            {
                "type": "compact_20260112",
                "trigger": {"type": "input_tokens", "value": 150_000},
                "instructions": COMPACT_PROMPT,
            }
        ]
    },
    messages=[...],
    tools=[...],
)
```

### **Truncate client-side to match the server**

When the API runs a server-side compaction, it replaces pre-compaction content on its side, but your local messages array still holds the full history. If you keep sending the full history on every subsequent turn, you'll pay for tokens the server no longer needs, plus your rolling-buffer pruner will operate on a different message slice than the server actually sees, which can break the cache-stable prefix you carefully maintained above.

The fix is to mirror the server's truncation on the client, as depicted by the code snippet below. When the response reports that compaction occurred, drop everything before the compaction marker from your local messages array before the next turn. This keeps client and server views aligned and lets the rolling buffer keep working correctly.

```python
def truncate_to_last_compaction(messages, response):
    """If the server compacted on this turn, drop pre-compaction messages
    locally so the next turn's cache prefix matches what the server sees."""
    context_mgmt = getattr(response, "context_management", None)
    if not context_mgmt or not context_mgmt.get("applied_edits"):
        return messages

    compaction = next(
        (e for e in context_mgmt["applied_edits"] if e["type"] == "compact"),
        None,
    )
    if compaction is None:
        return messages

    keep_from = compaction["message_index_after_compaction"]
    return messages[keep_from:]
```

## **Client-side compaction**

If you're using a model that doesn't support server-side compaction, or you want full control, implement compaction client-side with the same prompt. After each API call, check the total input token count from the response usage field. When that crosses a threshold (e.g., 90% of the context window), send the conversation to a summarizer model with COMPACT\_PROMPT as the system prompt. Replace the message history with the summary plus a few recent screenshots, then continue the agent loop.

## **Putting it together**

A good default for a long-running computer use agent looks like this:

-   One cache breakpoint on the stable prefix, three on trailing tool results, cleared and re-placed each turn.
-   Cache-aware rolling buffer with keep\_n = 3 and interval = 25, replacing older screenshots with placeholders in batches.
-   Server-side compaction triggered around 150k input tokens with a custom prompt, plus a client-side truncation pass to keep the two views aligned.

With these three layers in place, a typical long-horizon CU session will hit the prompt cache on the vast majority of turns, keep total input tokens bounded well below the context window, and preserve enough history through compaction events that the agent doesn't lose track of the task.

# **Experimental settings for improving computer and browser use**

The patterns below are techniques we've been testing in our implementations that show promise but aren't yet blanket recommendations. Each trades off complexity or cost for a potential lift on specific kinds of workloads. We include them here so you can try them on your workflow, but expect the guidance in this section to evolve quickly.

## **Batch tools**

In the updated reference implementation we expose two tools alongside the standard computer and browser tools: `computer_batch` and `browser_batch`. Each accepts a list of sub-actions and executes them in a single tool call. For example, instead of separate click, type, and press key turns, the model can emit one computer\_batch call containing all three actions.

The appeal is efficiency: a workflow with N mechanical actions is a single round trip instead of N round trips, which on long-horizon tasks meaningfully reduces wall-clock time and output token spend. The risk is compounding error, if action 2 depends on visual state that action 1 changed, and action 1 misses, the rest of the batch operates on stale assumptions and the agent can drift without ever seeing a screenshot of the actual state.

We recommend batch tools when the sub-actions are self-contained and don't depend on each other's visual outcomes (filling multiple fields in a form, chaining keyboard shortcuts, scrolling and clicking a known target). We'd avoid them in exploratory navigation, error-recovery sequences, or any workflow where "if action 1 fails I need to re-plan" is a real state.

Because batch tools are your own custom definitions, they stack cleanly with the standard computer or browser tools. Keep both available and let the model choose.

## **The advisor tool (beta)**

The [advisor tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool) pairs an executor model with a higher-intelligence advisor model that the executor can consult mid-generation for strategic guidance. The executor runs the loop and when it hits something that needs deeper reasoning, it calls the advisor, receives a plan or course correction, and continues. This happens server-side inside a single request, no extra round trips on your side.

For computer use specifically, this pattern is most useful on long-horizon tasks where most turns are mechanical clicking but occasional planning moments (choosing which tab to open, recovering from an unexpected modal, deciding whether to abandon a strategy) benefit from Opus-level reasoning. You get close to advisor-solo quality while the bulk of token generation happens at executor rates.

_Example of enabling the advisor tool:_

```python
response = client.beta.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    betas=["advisor-tool-2026-03-01", "computer-use-2025-11-24"],
    tools=[
        {
            "type": "advisor_20260301",
            "name": "advisor",
            "model": "claude-opus-4-7",
        },
        {
            "type": "computer_20251124",
            "name": "computer",
            "display_width_px": 1280,
            "display_height_px": 720,
        },
    ],
    messages=[...],
)
```

Useful controls for the advisor tool include:

-   **`max_uses`:** cap advisor calls per request. Helpful when you want to bound the worst-case cost.
-   **Conversation-wide cap in your harness:** the advisor bills at Opus 4.7 rates for each consult, so on very long sessions you may want to stop offering the advisor after some number of uses.
-   **Advisor-side caching:** on multi-call conversations, caching the advisor's prefix pays off after roughly three consults. In the reference implementation we default to 5-minute ephemeral caching.

Two non-obvious things worth knowing: the advisor runs without tools and without context management, so it can't click or browse on your behalf, it only returns text advice. And because the executor model doesn't always remember the advisor exists on long-horizon tasks, see the reminder nudges section below.

## **Cleaning up orphaned advisor blocks**

When the advisor tool fires, the executor emits a `server_tool_use` block with name: "advisor" followed by an `advisor_tool_result` block in the returned content. These blocks live in your messages array alongside everything else.

If you later drop the advisor tool from your tools array — because you hit a conversation-wide cap, changed config, or switched models — those prior `server_tool_use` / `advisor_tool_result` blocks become orphaned. The API will return a 400 on the next request because the referenced tool is no longer declared.

The fix is a simple pre-send pass: whenever the advisor is disabled for a turn, walk the message history and strip any content blocks of type `server_tool_use` (with name == "advisor") and `advisor_tool_result`.

_Example of removing stale advisor blocks:_

```python
def strip_orphaned_advisor_blocks(messages):
    """Remove advisor server_tool_use / tool_result blocks from history.
    Call this before any request that doesn't include the advisor tool."""
    for msg in messages:
        content = msg.get("content")
        if not isinstance(content, list):
            continue
        msg["content"] = [
            block for block in content
            if not (
                isinstance(block, dict)
                and (
                    (block.get("type") == "server_tool_use"
                     and block.get("name") == "advisor")
                    or block.get("type") == "advisor_tool_result"
                )
            )
        ]
    return messages
```

## **Periodic reminder nudges**

On long sessions, the executor model can forget which tools are available or which ones it should prefer. Two short reminder patterns have helped in our testing:

**Batch reminder.** If you expose `computer_batch` or `browser_batch` alongside the standard tools and observe the model chaining single-action calls when a batch would be appropriate, append a short system-level nudge after the next tool result: "Remember you can use `computer_batch` to combine sequential actions in a single tool call when they don't depend on intermediate screenshots." The goal is to pull the model back toward batching without dictating exactly when.

**Advisor reminder.** The advisor tool is easy for the executor to forget exists, especially if it hasn't been called in many turns. On sessions longer than ~20 turns without an advisor call, append a brief reminder that the advisor is available for planning or course-correction moments. In the reference implementation we use a 20-turn cadence and append a one-line hint.

Both nudges are light-touch context injections, not system-prompt rewrites. They cost a few tens of input tokens per append. If your system prompt is already long or your cache breakpoints are precisely placed, weigh whether the lift is worth the added invalidation risk.

## **Debugging patterns in the reference implementation**

When something misbehaves and you're not sure whether the problem is your harness, your screenshots, or the model, three side utilities in the reference implementation are worth reaching for before you start adding logging:

-   **Trajectory viewer (streamlit run viewer/app.py).** Loads a recorded trajectory and lets you step through the agent's turns with screenshots, thinking, tool calls, and usage per step. Best for answering "what did the model actually see, and what did it decide?" after a failed run.
-   **Tool debug panel (uvicorn debug.server:app --reload)**. A small web UI that lets you exercise each tool individually: take a screenshot, capture click coordinates, type, scroll, zoom. Useful for confirming that your capture pipeline and coordinate scaling are actually producing what you expect.
-   **Localization playground (uvicorn localize.server:app --reload --port 8001)**. Upload any image and ask the model to point at a target. Renders the predicted coordinates back on your image at both display and native resolution. This is the fastest way to diagnose whether a click miss is a resize bug, a coordinate-scaling bug, or a genuine model error. This is especially useful when a customer reports bad clicks and you want to reproduce the failure in isolation.

None of these are required to build a working integration; they're debugging aids for when the default feedback loop (log, re-run, squint at transcripts) isn't fast enough.

## **Improving reliability: teaching Claude**

Instead of iterating on text prompts until Claude gets a workflow right, you can show it the correct behavior directly. Record yourself performing the task, capturing screenshots, actions, and optionally voice narration at each step, then replay that demonstration as context when Claude executes the same workflow. The recording becomes a reusable specification Claude can follow, adapting to differences in the live UI state.

We use this pattern internally in Claude in Chrome (where we call it "Teach Mode") and are sharing it here because the underlying approach is broadly useful for anyone building computer use or browser use products. It helps in two ways: improving reliability on workflows Claude can mostly handle but occasionally gets wrong, and unlocking entirely new workflows that Claude can't complete from a text prompt alone. The core idea (capture a demonstration, feed it back as context) is straightforward to implement and adapts well to both browser and desktop environments.

### **The core concept: show, don't tell**

Traditional prompt engineering asks users to describe what they want in words, then iterate when the AI misunderstands. This pattern inverts that: users demonstrate the task while the system records their actions, screenshots, and (optionally) voice narration. During playback, Claude receives the full demonstration as context and follows the same sequence of steps, adapting to any differences in the current UI state.

The key insight is that playback isn't strict replay. Claude uses the demonstration as a guide while reasoning about the live environment. If a button has moved or a menu has been reorganized, Claude can find the equivalent element in the current UI rather than blindly clicking at recorded coordinates.

### **The data model**

The fundamental unit is a “workflow step”, a single action captured during recording. Each step bundles what was done, where it happened, and what the screen looked like:

```python
from dataclasses import dataclass, field
from typing import Literal, Optional

@dataclass
class WorkflowStep:
    action: Literal["click", "type", "navigate", "scroll", "select"]
    description: str                         # Human-readable, e.g. "Click the Submit button"
    timestamp: float
    selector: Optional[str] = None           # CSS selector or XPath
    coordinates: Optional[dict] = None       # {"x": int, "y": int}
    url: Optional[str] = None
    screenshot: Optional[str] = None         # Base64-encoded screenshot
    viewport_dimensions: Optional[dict] = None  # {"width": int, "height": int}
    speech_transcript: Optional[str] = None  # Voice narration, if captured
    value: Optional[str] = None              # For type actions

@dataclass
class SavedWorkflow:
    id: str
    name: str                                # e.g. "Submit expense report"
    steps: list[WorkflowStep] = field(default_factory=list)
    description: Optional[str] = None        # AI-generated summary of the workflow
    start_url: Optional[str] = None
    created_at: float = 0.0
    usage_count: int = 0
```

Capturing both selectors and coordinates is intentional: selectors are more robust to layout changes, but coordinates provide a visual fallback Claude can use when selectors break. Viewport dimensions are stored so coordinates can be scaled when the playback environment differs from the recording environment.

### **Recording: what to capture**

At minimum, capture click events, keyboard input, navigation changes, and a screenshot at each action. For each click, generate a human-readable description (from aria-labels, text content, or via a quick Claude call) and annotate the screenshot with a visual marker at the click position:

```python
def on_click(event):
    step = WorkflowStep(
        action="click",
        selector=generate_selector(event.target),
        coordinates={"x": event.client_x, "y": event.client_y},
        url=current_url(),
        description=generate_description(event.target),
        timestamp=now(),
        viewport_dimensions=get_viewport_size(),
    )
    # Annotate screenshot with a circle at the click position
    screenshot = capture_screenshot()
    step.screenshot = annotate_with_circle(screenshot, event.client_x, event.client_y)
    workflow_steps.append(step)
```

The annotation (a colored circle at the click location) serves two purposes: it helps users verify the recording captured the right element, and during playback it shows Claude exactly where the action occurred. Your playback prompt should clarify that these markers are recording artifacts, not part of the live UI.

### **Playback: constructing the prompt**

This is the most important piece. When a user triggers a saved workflow, you construct a message to Claude containing three things: the user's intent, a context block explaining the demonstration format, and the recorded screenshots.

The context block tells Claude how to interpret annotated screenshots and how to adapt when the live UI differs:

```python
def generate_playback_context(steps: list[WorkflowStep]) -> str:
    steps_description = "\n".join(
        f"Step {i+1}: {step.description}"
        for i, step in enumerate(steps)
    )

    return f"""<demonstration_context>
The user has recorded a demonstration showing how to perform this task.

RECORDED STEPS:
{steps_description}

ABOUT THE SCREENSHOTS:
- Each screenshot shows the screen state when an action was taken
- BLUE CIRCLES mark where the user clicked — these are recording annotations
- The blue highlighting is NOT part of the actual interface
- Your own screenshots will NOT have these markers

HOW TO USE THIS DEMONSTRATION:
1. Review all steps and screenshots to understand the complete workflow
2. Take your own screenshot to see the CURRENT page state
3. The blue highlights show which element to interact with — find it in your current view
4. Follow the same sequence of actions, adapting to any differences
5. If the UI has changed significantly, use judgment to find equivalent elements
</demonstration_context>"""
```

Then assemble the full message with the user's prompt, the context block, and each step's screenshot as an image:

```python
import anthropic

client = anthropic.Anthropic()

content = [
    {"type": "text", "text": user_prompt},
    {"type": "text", "text": generate_playback_context(workflow.steps)},
]

for i, step in enumerate(workflow.steps):
    if step.screenshot:
        content.append({"type": "text", "text": f"[Step {i+1}: {step.description}]"})
        content.append({
            "type": "image",
            "source": {"type": "base64", "media_type": "image/jpeg", "data": step.screenshot},
        })

response = client.beta.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    betas=["computer-use-2025-11-24"],
    messages=[{"role": "user", "content": content}],
    tools=[{
        "type": "computer_20251124",
        "name": "computer",
        "display_width_px": 1280,
        "display_height_px": 720,
    }],
)
```

### **Playback modes**

Not every workflow needs the same level of adherence to the recorded demonstration. Some workflows are too long, consuming a significant amount of input tokens which ultimately degrades latency and increases cost. Consider supporting a strictness parameter that you include in the context prompt:

**Strict:** follow steps exactly; stop and report if the UI has changed too much. Good for compliance-sensitive workflows where the exact sequence matters.

**Adaptive:** use the demonstration as a guide but adapt to UI changes. This is the best default for most use cases — it handles minor layout shifts, updated button labels, and reorganized menus gracefully.

‍**Goal-oriented:** focus on the end result; treat the recorded steps as hints rather than instructions. Useful when the UI changes frequently but the goal stays the same. Use a model to summarize the recorded demonstration, using strategies similar to the one described in the next section, then pass that summary to the CU model.

### **Example: end-to-end expense report workflow**

Here's what a saved workflow looks like in practice. The workflow captures five steps: navigating to the expense form, selecting an expense type, choosing "Travel" from the dropdown, entering an amount, and clicking Submit.

```python
expense_workflow = SavedWorkflow(
    id="wf_abc123",
    name="Submit Expense Report",
    start_url="https://expenses.company.com/new",
    steps=[
        WorkflowStep(
            action="navigate",
            url="https://expenses.company.com/new",
            description="Navigate to new expense form",
            timestamp=1700000000,
        ),
        WorkflowStep(
            action="click",
            selector="#expense-type-dropdown",
            coordinates={"x": 400, "y": 200},
            description="Click on expense type dropdown",
            timestamp=1700000001,
        ),
        WorkflowStep(
            action="click",
            selector="[data-value='travel']",
            coordinates={"x": 400, "y": 280},
            description='Select "Travel" expense type',
            timestamp=1700000002,
        ),
        WorkflowStep(
            action="type",
            selector="#amount-input",
            value="150.00",
            description="Enter expense amount",
            timestamp=1700000003,
        ),
        WorkflowStep(
            action="click",
            selector="#submit-expense-btn",
            coordinates={"x": 1150, "y": 420},
            description="Click the Submit button",
            speech_transcript="Now I'll click submit to send the report for approval",
            timestamp=1700000004,
        ),
    ],
)
```

When a user later says "Submit my expense report for the team lunch ($85.50)", the playback service constructs a prompt with the demonstration context, all five annotated screenshots, and the specific values from the new request. Claude sees exactly where to click, what sequence to follow, and adapts the amounts and descriptions to match the current task. If your workflow is too long for this approach to be practical due to input token count, then consider first compacting the workflow before using it as an example. See the following section for tips on managing context.

# **Getting started with computer and browser use**

These practices reflect our current best understanding of what makes computer use integrations reliable in production. They apply to the Claude 4.6 model family and Opus 4.7, and will be updated as new models and techniques emerge.

As your integration matures, the patterns that matter most will depend on your specific environment, target applications, and reliability requirements._‍_

_Get started with the_ [_computer use documentation_](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)_, check out our new_ [_demo implementation_](https://github.com/anthropics/claude-quickstarts/tree/main/computer-use-best-practices) _of these best practices, or revisit the_ [_original computer use research post_](https://www.anthropic.com/news/developing-computer-use) _for background on how these capabilities were built and where they're headed._

_Acknowledgements: This article & corresponding demo were written by Lucas Gonzalez and Luca Weihs. The authors would like to thank Molly Vorwerck, Javier Rando, Maya Nielan, Gabe Mulley, and Brigit Brown for their contributions._

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

@container threshold-medium (width < 48em) { .header\_col\_title\_wrap { flex-flow: column ; justify-content: flex-start; align-items: flex-start; } }

## Related posts

Explore more product news and best practices for teams building with Claude.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6903d22f63175f636cba4641_c0af2a56f56cf298ce5904f2901e9a36facd0dbe-1000x1000.svg)

Apr 30, 2026

### Building AI agents for the enterprise

Agents

[Building AI agents for the enterprise](#)Building AI agents for the enterprise

[Building AI agents for the enterprise](/blog/building-ai-agents-for-the-enterprise)Building AI agents for the enterprise

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/692f76874e94e489958af8ba_Object-CodeMagnifier.svg)

Apr 29, 2026

### Claude API skill now in CodeRabbit, JetBrains, Resolve AI, and Warp

Agents

[Claude API skill now in CodeRabbit, JetBrains, Resolve AI, and Warp](#)Claude API skill now in CodeRabbit, JetBrains, Resolve AI, and Warp

[Claude API skill now in CodeRabbit, JetBrains, Resolve AI, and Warp](/blog/claude-api-skill)Claude API skill now in CodeRabbit, JetBrains, Resolve AI, and Warp

![](https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg)

Oct 31, 2025

### What is Model Context Protocol? Connect AI to your world

Agents

[What is Model Context Protocol? Connect AI to your world](#)What is Model Context Protocol? Connect AI to your world

[What is Model Context Protocol? Connect AI to your world](/blog/what-is-model-context-protocol)What is Model Context Protocol? Connect AI to your world

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6903d22a7bb714a55b503cd7_cad034e66b44f7f017c0cb931c403a97d1763758-1000x1000.svg)

Apr 29, 2026

### Product development in the agentic era

Agents

[Product development in the agentic era](#)Product development in the agentic era

[Product development in the agentic era](/blog/product-development-in-the-agentic-era)Product development in the agentic era

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

[English (US)](/blog/best-practices-for-computer-and-browser-use-with-claude)

[日本語 (Japan)](/ja/blog/best-practices-for-computer-and-browser-use-with-claude)

[Deutsch (Germany)](/de/blog/best-practices-for-computer-and-browser-use-with-claude)

[Français (France)](/fr/blog/best-practices-for-computer-and-browser-use-with-claude)

[한국어 (South Korea)](/ko/blog/best-practices-for-computer-and-browser-use-with-claude)

function initDynamicCurrentYear() { const currentYear = new Date().getFullYear(); const currentYearElements = document.querySelectorAll('\[data-current-year\]'); currentYearElements.forEach(currentYearElement => { currentYearElement.textContent = currentYear; }); } // Initialize Dynamic Current Year document.addEventListener('DOMContentLoaded', () => { initDynamicCurrentYear(); });

[](/blog-product/claude-platform)

Claude Platform

gsap.registerPlugin(ScrollTrigger,SplitText,TextPlugin,Flip,Draggable,InertiaPlugin); /\*\* \* claude-animations.js \* GSAP-powered animations for claude.com \* \* Contains: \* - Page transitions & hero animations \* - Heading animations (scroll-triggered) \* - Columns & cards animations \* - Artifact toggle & metadata animations \* \* Dependencies: GSAP, SplitText, ScrollTrigger, jQuery \*/ function isValidSameOriginUrl(urlString) { if (!urlString || typeof urlString !== 'string') { return false; } try { // Use URL constructor for safe parsing const url = new URL(urlString, window.location.origin); // Only allow http and https protocols if (!\['http:', 'https:'\].includes(url.protocol)) { return false; } // Only allow same origin if (url.origin !== window.location.origin) { return false; } return true; } catch (e) { // Invalid URL format return false; } } document.addEventListener('DOMContentLoaded', () => { // PRE-INITIALIZE SplitText BEFORE any animations run // This prevents layout thrashing during animation frames const heroData = \[\]; document.querySelectorAll('\[data-animate-hero-wrap\]').forEach((hero) => { const heading = hero.querySelector('\[data-animate-hero-heading\]'); const text = hero.querySelector('\[data-animate-hero-text\]'); const cta = hero.querySelector('\[data-animate-hero-cta\]'); const visual = hero.querySelectorAll('\[data-animate-hero-visual\]'); let split = null; if (heading) { const targetElement = heading.children.length > 0 ? heading.children : heading; split = SplitText.create(targetElement, { type: 'words', wordsClass: 'word', }); // Set initial state immediately (batch DOM writes) if (split.words && split.words.length > 0) { gsap.set(split.words, { autoAlpha: 0 }); } } heroData.push({ hero, heading, text, cta, visual, split }); }); // Force a single reflow before animations start document.body.offsetHeight; // HERO ANIMATION FUNCTION - uses pre-split text (no DOM modification) function animateHero() { heroData.forEach(({ hero, text, cta, visual, split }) => { const heroTl = gsap.timeline(); // Animate pre-split words (no DOM modification here) if (split && split.words && split.words.length > 0) { heroTl.to(split.words, { autoAlpha: 1, duration: 1, ease: 'power2.out', stagger: { amount: 0.2 }, }); } // Animate text if (text) { heroTl.from( text, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+30%', ); } // Animate CTA if (cta) { heroTl.from( cta, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+25%', ); } // Animate Visual if (visual && visual.length) { heroTl.from( visual, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<', ); } gsap.set(hero, { visibility: 'visible' }); return heroTl; }); } // PAGE LOAD SEQUENCE let tl = gsap.timeline(); // Only animate elements that exist on the page const transitionWrap = document.querySelector('.transition\_wrap'); const navWrap = document.querySelector('.nav\_wrap'); const navSecondaryWrap = document.querySelector('.nav\_secondary\_wrap'); const pageMain = document.querySelector('.page\_main'); if (transitionWrap) { tl.to(transitionWrap, { autoAlpha: 0, duration: 1, ease: 'none' }); } if (navWrap) { tl.from(navWrap, { autoAlpha: 0, y: -20, duration: 1, ease: 'power2.out' }, transitionWrap ? '>-50%' : 0); } if (navSecondaryWrap) { tl.from(navSecondaryWrap, { autoAlpha: 0, y: -20, duration: 1, ease: 'power2.out' }, '<'); } // Only animate hero if one exists on the page if (heroData.length > 0) { tl.add(() => animateHero(), '<+25%'); // Animate main wrapper excluding hero section if (pageMain) { const nonHeroChildren = pageMain.querySelectorAll(':scope > \*:not(\[data-animate-hero-wrap\])'); if (nonHeroChildren.length > 0) { tl.from( nonHeroChildren, { autoAlpha: 0, y: 20, duration: 1, ease: 'power2.out', }, '>-20%', ); } } } else if (pageMain) { // Animate entire main wrapper if no hero exists tl.from( pageMain, { autoAlpha: 0, y: 20, duration: 1, ease: 'power2.out', }, '>-50%', ); } if (transitionWrap) { tl.set(transitionWrap, { display: 'none' }); } // LINK CLICK TRANSITIONS $('a:not(.ignore-transition)').on('click', function (e) { // Let browser handle new-tab/window behaviors if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.which === 2 || e.button === 1) { return; } let currentUrl = $(this).attr('href'); if ($(this).prop('hostname') === window.location.host && !currentUrl.includes('#') && $(this).attr('target') !== '\_blank') { // SECURITY: Validate URL before navigation to prevent injection attacks if (!isValidSameOriginUrl(currentUrl)) { console.warn('Navigation blocked: Invalid or unsafe URL', currentUrl); return; } e.preventDefault(); let tl = gsap.timeline({ onComplete: () => (window.location.href = currentUrl) }); // nosemgrep: unsafe-url-manipulation if (transitionWrap) { tl.set(transitionWrap, { display: 'block' }); tl.fromTo(transitionWrap, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.75, ease: 'none' }); } } }); // BACK BUTTON HANDLING window.onpageshow = function (event) { if (event.persisted) window.location.reload(); }; }); /\* Heading Animation \*/ document.addEventListener('DOMContentLoaded', () => { const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; if (prefersReducedMotion) { return; } document.querySelectorAll('\[data-animate-header-wrap\]').forEach((header) => { const heading = header.querySelector('\[data-animate-header-heading\]'); const text = header.querySelector('\[data-animate-header-text\]'); const cta = header.querySelector('\[data-animate-header-cta\]'); const tl = gsap.timeline({ scrollTrigger: { trigger: header, start: 'top bottom', end: 'top 80%', toggleActions: 'none play none reset', }, }); // Animate heading with split text if (heading && heading.children.length > 0) { const split = SplitText.create(heading.children, { type: 'words', wordsClass: 'word', }); if (split.words && split.words.length > 0) { tl.from(split.words, { autoAlpha: 0, duration: 1, ease: 'power2.out', stagger: { amount: 0.2 }, }); } } // Animate text if (text) { tl.from( text, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+30%', ); } // Animate CTA if (cta) { tl.from( cta, { autoAlpha: 0, y: 10, duration: 0.75, ease: 'power2.out', }, '<+25%', ); } }); }); /\* Columns & Cards Animation \*/ document.addEventListener('DOMContentLoaded', () => { const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; if (prefersReducedMotion) { return; } document.querySelectorAll('\[data-animate-card-wrap\]').forEach((cardWrap) => { const cards = cardWrap.querySelectorAll('\[data-animate-card-card\]'); // NodeList is always truthy, so check length instead if (cards.length === 0) return; const tl = gsap.timeline({ scrollTrigger: { trigger: cardWrap, start: 'top bottom', end: 'top 70%', toggleActions: 'none play none none', }, }); tl.from(cards, { autoAlpha: 0, y: 20, duration: 0.75, stagger: { each: 0.1 }, ease: 'power2.out', }); }); }); /\* Combined Artifact Toggle & Metadata Animation \*/ document.addEventListener('DOMContentLoaded', () => { // Configuration const TOGGLE\_ENABLED = true; // Set to false to disable toggle functionality // Initially hide all artifact\_metadata elements for animation const style = document.createElement('style'); style.textContent = \`.artifact\_metadata { opacity: 0; transform: translateY(32px); }\`; document.head.appendChild(style); // Track which columns have been animated and which have toggles const animatedColumns = new Set(); const toggleManagedColumns = new Set(); // ============================================ // METADATA ANIMATION FUNCTIONALITY // ============================================ // Function to animate metadata items function animateMetadata(column) { // Skip if already animated or if this column is toggle-managed and hidden if (animatedColumns.has(column)) return; if (toggleManagedColumns.has(column) && column.style.display === 'none') return; const metadataItems = column.querySelectorAll('.artifact\_metadata'); if (metadataItems.length > 0) { animatedColumns.add(column); gsap.fromTo( metadataItems, { opacity: 0, y: 32, }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.2, }, ); } } // Intersection Observer for viewport visibility const observer = new IntersectionObserver( (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { // Only animate if not hidden by toggle if (!toggleManagedColumns.has(entry.target) || entry.target.style.display !== 'none') { animateMetadata(entry.target); } } }); }, { threshold: 0.5, rootMargin: '0px 0px -80px 0px', }, ); // ============================================ // TOGGLE FUNCTIONALITY // ============================================ if (TOGGLE\_ENABLED) { const toggleButtons = document.querySelectorAll('.artifact\_toggle'); const MOBILE\_BREAKPOINT = 768; // Adjust as needed toggleButtons.forEach((button) => { const container = button.closest('.artifact\_component\_wrap') || button.parentElement; const metadataColumn = container.querySelector('.artifact\_column\_metadata'); const contentColumn = container.querySelector('.artifact\_column\_content'); if (!metadataColumn || !contentColumn) return; // Check if this is variant 1-1 (toggle always visible) const artifactWrapper = button.closest('\[data-wf--artifact-wrapper--variant\]'); const isVariant11 = artifactWrapper?.getAttribute('data-wf--artifact-wrapper--variant') === '1-1'; // Mark this metadata column as toggle-managed toggleManagedColumns.add(metadataColumn); // Track current state let showingContent = true; // Helper function to check if we're on mobile function isMobile() { return window.innerWidth <= MOBILE\_BREAKPOINT; } // Helper function to check if toggle should be active function shouldToggleBeActive() { // Toggle is active if: // 1. It's variant 1-1 (always active), OR // 2. We're on mobile/tablet return isVariant11 || isMobile(); } // Helper function to update button text function updateButtonText(newText) { const walker = document.createTreeWalker( button, NodeFilter.SHOW\_TEXT, { acceptNode: function (node) { return node.textContent.trim() ? NodeFilter.FILTER\_ACCEPT : NodeFilter.FILTER\_REJECT; }, }, false, ); let textNode; while ((textNode = walker.nextNode())) { textNode.textContent = newText; break; } } // Set initial states based on viewport and variant function initializeToggleState() { if (shouldToggleBeActive()) { // Toggle is active: Hide metadata initially gsap.set(metadataColumn, { display: 'none', opacity: 0, y: -24, }); gsap.set(contentColumn, { display: 'flex', opacity: 1, y: 0, }); updateButtonText('View prompt'); showingContent = true; button.style.display = ''; // Show toggle button (let CSS control it) } else { // Toggle not active: Show both columns, hide toggle button gsap.set(\[metadataColumn, contentColumn\], { clearProps: 'display,opacity,y', }); button.style.display = 'none'; // Hide toggle button // Reset the state flag showingContent = true; // Trigger metadata animation if in viewport and not yet animated if (!animatedColumns.has(metadataColumn)) { // Check if already in viewport const rect = metadataColumn.getBoundingClientRect(); const inViewport = rect.top < window.innerHeight && rect.bottom > 0; if (inViewport && metadataColumn.offsetParent !== null) { animateMetadata(metadataColumn); } } } } // Toggle animation function button.addEventListener('click', () => { if (!shouldToggleBeActive()) return; // Safety check if (showingContent) { // Switch to metadata/prompt view gsap.to(contentColumn, { opacity: 0, y: 24, duration: 0.3, ease: 'power2.inOut', onComplete: () => { gsap.set(contentColumn, { display: 'none' }); }, }); gsap.set(metadataColumn, { display: 'flex' }); // Check if metadata needs initial animation if (!animatedColumns.has(metadataColumn)) { // First time showing - animate the metadata items animateMetadata(metadataColumn); // Also animate the column itself gsap.fromTo( metadataColumn, { opacity: 0, y: -24, }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.15, }, ); } else { // Already animated before - just show it gsap.fromTo( metadataColumn, { opacity: 0, y: -24, }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.15, }, ); } updateButtonText('View result'); showingContent = false; } else { // Switch back to content view gsap.to(metadataColumn, { opacity: 0, y: -24, duration: 0.3, ease: 'power2.inOut', onComplete: () => { gsap.set(metadataColumn, { display: 'none' }); }, }); gsap.set(contentColumn, { display: 'flex' }); gsap.fromTo( contentColumn, { opacity: 0, y: 24, }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.15, }, ); updateButtonText('View prompt'); showingContent = true; } }); // Initialize toggle state initializeToggleState(); // Handle resize events let resizeTimer; window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { initializeToggleState(); }, 250); }); }); } // ============================================ // OBSERVE ALL COLUMNS // ============================================ // Observe all artifact columns for animation const artifactColumns = document.querySelectorAll('.artifact\_column\_metadata'); artifactColumns.forEach((column) => { observer.observe(column); }); // ============================================ // TAB & SLIDER LISTENERS // ============================================ // Tab activation listener document.addEventListener('click', (e) => { const tab = e.target.closest('\[role="tab"\], .tab-button, .w-tab-link, \[data-w-tab\]'); if (tab) { setTimeout(() => { document.querySelectorAll('.artifact\_column\_metadata').forEach((column) => { // Check if column is visible and not toggle-hidden if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) { animateMetadata(column); } }); }, 100); } }); // Slider change listener document.addEventListener('click', (e) => { const sliderControl = e.target.closest('\[data-aside-prev\], \[data-aside-next\], \[data-aside-dot\], .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet'); if (sliderControl) { setTimeout(() => { document.querySelectorAll('.artifact\_column\_metadata').forEach((column) => { if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) { animateMetadata(column); } }); }, 300); } }); // Swiper events if (typeof Swiper !== 'undefined') { document.querySelectorAll('.swiper').forEach((swiperEl) => { const swiper = swiperEl.swiper; if (swiper) { swiper.on('slideChange', () => { setTimeout(() => { document.querySelectorAll('.artifact\_column\_metadata').forEach((column) => { if (column.offsetParent !== null && (!toggleManagedColumns.has(column) || column.style.display !== 'none')) { animateMetadata(column); } }); }, 100); }); } }); } }); document.addEventListener('DOMContentLoaded', function() { const contentElement = document.querySelector('\[data-readtime="content"\]'); const minutesElement = document.querySelector('\[data-readtime="minutes"\]'); if (!contentElement || !minutesElement) return; const text = contentElement.innerText || contentElement.textContent; const wordCount = text.trim().split(/\\s+/).length; const wordsPerMinute = 250; const minutes = Math.round(wordCount / wordsPerMinute); minutesElement.textContent = minutes || 1; // minimum 1 minute });