---
title: Canvas Remoting
description: How Canvas Remoting works in Browser Isolation.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Canvas Remoting

Canvas Remoting is a Browser Isolation capability that optimizes performance for web applications using the HTML5 Canvas API (a browser feature that allows web applications to draw graphics directly on the page). It sends vector draw commands to the client instead of rasterized bitmaps (pixel images), reducing bandwidth consumption and improving frame rates for productivity applications.

## How it works

Browser Isolation uses Network Vector Rendering (NVR) to send lightweight drawing instructions to the user's browser, rather than streaming rendered pixels or video of the page. However, HTML5 Canvas content previously required server-side rasterization (converting draw commands into pixel images), sending large bitmaps for every frame.

Canvas Remoting extends NVR to Canvas-based applications by:

1. Capturing draw commands made to the HTML5 Canvas element.
2. Converting and sending those commands to the client as NVR instructions.
3. Rendering the Canvas content on the client onto an offscreen texture (a hidden drawing surface used for intermediate rendering).
4. Compositing (layering) the texture into the final document output.

## Supported applications

Canvas Remoting improves performance for productivity applications that rely on the HTML5 Canvas API:

| Application                          | Improvement                                |
| ------------------------------------ | ------------------------------------------ |
| Microsoft Word                       | 10x bandwidth reduction                    |
| Microsoft Excel                      | Smooth scrolling and data entry            |
| Microsoft PowerPoint                 | Fluid animations                           |
| Google Sheets                        | Consistent 30fps rendering                 |
| Google Maps                          | Smooth panning and zooming                 |
| Web-based terminals and AI notebooks | Fast and responsive text input and display |

## Limitations

Canvas Remoting supports 2D Canvas contexts only. The following are not supported:

* WebGL and WebGPU contexts
* 3D graphics applications
* Advanced Canvas features requiring GPU acceleration

## Enable or disable Canvas Remoting

Canvas Remoting is on by default for all Browser Isolation customers. No configuration is required.

![Canvas Remoting context menu option](https://developers.cloudflare.com/_astro/canvas-remoting-context-menu.DnzW09g1_1kc8Iw.webp) 

### Disable Canvas Remoting for the current session

1. Right-click on the background of the isolated webpage.
2. Select **Disable Canvas Remoting** from the context menu.

### Re-enable Canvas Remoting

1. Right-click on the background of the isolated webpage.
2. Select **Enable Canvas Remoting** from the context menu.

## Troubleshooting

Canvas content renders slowly

If Canvas-based applications appear choppy or consume excessive bandwidth:

1. Verify Canvas Remoting is on by right-clicking the page background.
2. Check that the context menu shows **Disable Canvas Remoting** (indicating it is active).
3. If the issue persists, open a support case and provide the Ray ID from the error page.

Graphical glitches or missing elements

If Canvas content displays incorrectly after reconnecting from a network interruption:

1. Refresh the isolated page.
2. If the issue persists, select **Disable Canvas Remoting** from the right-click menu.
3. Re-enable Canvas Remoting after the page reloads.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/canvas-remoting/#page","headline":"Canvas Remoting · Cloudflare One docs","description":"How Canvas Remoting works in Browser Isolation.","url":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/canvas-remoting/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/remote-browser-isolation/","name":"Remote browser isolation"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/remote-browser-isolation/canvas-remoting/","name":"Canvas Remoting"}}]}
```
