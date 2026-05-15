// ----- Copy handler (works via parent .partner\_link) ----- (() => { const fadeMs = 300; const holdMs = 1000; function pickLabelNode(container) { return ( container.querySelector("\[data-copy-label\]") || container.querySelector("p") || container ); } async function writeToClipboard(text) { if (!text) return false; try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return true; } } catch (\_) {} try { const ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.left = "-9999px"; document.body.appendChild(ta); ta.select(); const ok = document.execCommand("copy"); document.body.removeChild(ta); return ok; } catch (\_) { return false; } } function animateCopied(labelNode, copiedText = "Copied!") { const originalText = labelNode.textContent; const originalWidth = labelNode.getBoundingClientRect().width; labelNode.style.minWidth = originalWidth ? \`${originalWidth}px\` : ""; labelNode.style.transition = \`opacity ${fadeMs}ms ease\`; labelNode.style.opacity = "0"; setTimeout(() => { labelNode.textContent = copiedText; labelNode.style.opacity = "1"; setTimeout(() => { labelNode.style.opacity = "0"; setTimeout(() => { labelNode.textContent = originalText; labelNode.style.opacity = "1"; setTimeout(() => { labelNode.style.transition = ""; labelNode.style.minWidth = ""; }, fadeMs); }, fadeMs); }, holdMs); }, fadeMs); } // Event delegation: click on .partner\_link, find \[data-copy\] inside document.addEventListener("click", async (evt) => { const parent = evt.target.closest(".header\_stories\_link.is-copy-link"); if (!parent) return; evt.preventDefault(); const copyEl = parent.querySelector("\[data-copy\]"); if (!copyEl) return; const textToCopy = copyEl.getAttribute("data-copy")?.trim(); const labelNode = pickLabelNode(copyEl); const ok = await writeToClipboard(textToCopy); if (ok && labelNode) animateCopied(labelNode); }); })();

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/69f517432a0d2180dc70610b_alltrails.svg)

# AllTrails

Find your next hike

-   Category
    
    Health and wellness
    
-   Used in
    
    [
    
    Claude  
    
    ](https://claude.ai/directory/2aab1516-4acf-49b3-a85f-ff16c5d8fbb0)[
    
    Claude desktop app  
    
    ](#)[
    
    Claude mobile app  
    
    ](#)[
    
    Claude Code
    
    ](#)[
    
    Claude Code
    
    ](#)[
    
    Claude API
    
    ](#)[
    
    Claude API  
    
    ](#)
    
-   Made by
    
    [
    
    AllTrails
    
    ](https://www.alltrails.com)
    

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) { \[data-youtube="play"\] { transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1); } \[data-youtube="wrapper"\]:hover \[data-youtube="play"\] { transform: scale(1.05); } } \[data-youtube="wrapper"\].is-playing \[data-youtube="cover"\], \[data-youtube="wrapper"\].is-playing \[data-youtube="play"\] { opacity: 0; pointer-events: none; transition: opacity .3s ease; }

/\* ========================= Robust YouTube API loader ========================= \*/ (function () { let readyPromise; window.\_ensureYouTubeAPI = function \_ensureYouTubeAPI() { if (readyPromise) return readyPromise; if (window.YT && typeof YT.Player === "function") { readyPromise = Promise.resolve(); return readyPromise; } readyPromise = new Promise((resolve) => { const prev = window.onYouTubeIframeAPIReady; window.onYouTubeIframeAPIReady = function () { try { prev && prev(); } catch (e) {} resolve(); }; let tag = document.querySelector( 'script\[src\*="youtube.com/iframe\_api"\]' ); if (!tag) { tag = document.createElement("script"); tag.src = "https://www.youtube.com/iframe\_api"; tag.async = true; document.head.appendChild(tag); } const poll = setInterval(() => { if (window.YT && typeof YT.Player === "function") { clearInterval(poll); resolve(); } }, 50); setTimeout(() => clearInterval(poll), 10000); }); return readyPromise; }; // Preload ASAP to keep the first tap in-gesture on iOS if (document.readyState !== "loading") \_ensureYouTubeAPI(); else document.addEventListener("DOMContentLoaded", \_ensureYouTubeAPI, { once: true, }); })(); document.addEventListener("DOMContentLoaded", function () { document.querySelectorAll(".video\_main\_wrap").forEach((section) => { if (section.dataset.scriptInitialized) return; section.dataset.scriptInitialized = "true"; // Any element with data-video-id that contains a \[data-youtube="player"\] is a component const components = Array.from( section.querySelectorAll("\[data-video-id\]") ).filter((el) => el.querySelector('\[data-youtube="player"\]')); if (!components.length) return; components.forEach((wrap) => { if (wrap.dataset.youtubeInit) return; wrap.dataset.youtubeInit = "true"; const videoId = wrap.getAttribute("data-video-id"); const shouldAutoResume = wrap.getAttribute("data-resume") === "true"; const playWrap = wrap.querySelector('\[data-youtube="play"\]'); // overlay container const coverImg = wrap.querySelector('\[data-youtube="cover"\]'); const playerHost = wrap.querySelector('\[data-youtube="player"\]'); if (!videoId || !playerHost) return; // Optional CSS background cover const thumb = wrap.getAttribute("data-thumb"); if (!coverImg && thumb) wrap.style.background = \`center / cover no-repeat url("${thumb}")\`; // Layout / focusability const cs = getComputedStyle(wrap); if (!/relative|absolute|fixed/.test(cs.position)) wrap.style.position = "relative"; if (!wrap.style.aspectRatio) wrap.style.aspectRatio = "16 / 9"; playerHost.style.position = "absolute"; playerHost.style.inset = "0"; playerHost.style.pointerEvents = "auto"; if (!playerHost.hasAttribute("tabindex")) playerHost.setAttribute("tabindex", "-1"); // Helps touch taps go straight to the iframe wrap.style.touchAction = "manipulation"; // ---- State let player = null; let playerReady = false; let userStarted = false; let revealed = false; let revealTimeoutId = null; let io = null; let prewarmed = false; // manual vs programmatic pause tracking let programmaticPause = false; let userPaused = false; // ---- Utils function moveFocusToHost() { try { playerHost.focus({ preventScroll: true }); } catch (e) {} } function hideA11y(el) { if (!el) return; const active = document.activeElement; if (active && el.contains(active)) moveFocusToHost(); el.setAttribute("inert", ""); requestAnimationFrame(() => { el.setAttribute("aria-hidden", "true"); }); } function killOverlay() { // Remove overlay nodes so nothing can intercept taps afterwards try { coverImg && coverImg.remove(); } catch (e) {} try { playWrap && playWrap.remove(); } catch (e) {} } function revealPlayer() { if (revealed) return; revealed = true; moveFocusToHost(); hideA11y(coverImg); hideA11y(playWrap); wrap.classList.add("is-playing"); wrap.classList.remove("is-loading"); // Nuke overlays entirely to guarantee clean taps killOverlay(); } function pauseIfPlaying() { if (!player || !playerReady) return; const s = player.getPlayerState && player.getPlayerState(); if (s === 1 || s === 3) { programmaticPause = true; try { player.pauseVideo(); } catch (e) {} setTimeout(() => { programmaticPause = false; }, 0); } } function resumeIfAllowed() { if ( !player || !playerReady || !userStarted || userPaused || !shouldAutoResume ) return; const s = player.getPlayerState && player.getPlayerState(); if (s === 2 || s === 5) { try { player.playVideo(); } catch (e) {} } } function ensureObserver() { if (io) return; io = new IntersectionObserver( (entries) => { for (const entry of entries) { // pre-warm early so the first tap never waits if (!prewarmed && entry.isIntersecting) { prewarmPlayer(); } if (entry.isIntersecting && entry.intersectionRatio >= 0.25) { resumeIfAllowed(); } else { pauseIfPlaying(); } } }, { threshold: \[0, 0.1, 0.25, 0.5, 0.75, 1\] } ); io.observe(wrap); } function setIframeAllow() { try { const ifr = player && player.getIframe && player.getIframe(); if (ifr) { // Ensure autoplay permission on some stricter browsers const allow = ifr.getAttribute("allow") || ""; if (!/autoplay/.test(allow)) { ifr.setAttribute( "allow", (allow ? allow + "; " : "") + "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" ); } } } catch (e) {} } function buildPlayer(autoplay) { return new YT.Player(playerHost, { host: "https://www.youtube-nocookie.com", videoId: videoId, playerVars: { autoplay: autoplay ? 1 : 0, controls: 1, rel: 0, playsinline: 1, modestbranding: 1, fs: 1, origin: window.location.origin, }, events: { onReady: function () { playerReady = true; setIframeAllow(); }, onStateChange: function (e) { // manual vs programmatic pause if (e.data === 2) { if (!programmaticPause) userPaused = true; } else if (e.data === 1) { userPaused = false; } // Reveal when buffering/playing to avoid the empty gap if (e.data === 1 || e.data === 3) { revealPlayer(); if (revealTimeoutId) { clearTimeout(revealTimeoutId); revealTimeoutId = null; } } }, }, }); } function prewarmPlayer() { if (prewarmed) return; prewarmed = true; \_ensureYouTubeAPI().then(() => { if (!player) { player = buildPlayer(false); // build but don't play } }); } function attemptPlayWithFallback() { if (!player) { // Build with autoplay:1 to catch the gesture immediately player = buildPlayer(true); } try { player.playVideo(); } catch (e) {} // If we don't reach PLAYING quickly, try muted autoplay (iOS always allows this) if (!revealTimeoutId) { revealTimeoutId = setTimeout(() => { if (!revealed && player && typeof player.isMuted === "function") { try { player.mute(); player.playVideo(); } catch (e) {} } }, 450); } } function onActivate(e) { e.preventDefault(); if (userStarted) return; userStarted = true; // Make sure taps go straight to the iframe even before reveal if (coverImg) coverImg.style.pointerEvents = "none"; if (playWrap) playWrap.style.pointerEvents = "none"; wrap.classList.add("is-loading"); if ( playWrap && document.activeElement && playWrap.contains(document.activeElement) ) { moveFocusToHost(); } \_ensureYouTubeAPI().then(() => { attemptPlayWithFallback(); ensureObserver(); }); } // Bind to overlay container and any inner button const innerBtn = playWrap ? playWrap.querySelector('button, \[role="button"\]') : null; if (playWrap) { playWrap.addEventListener("click", onActivate, { passive: false }); playWrap.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(e); } }); } if (innerBtn) { innerBtn.addEventListener("click", onActivate, { passive: false }); innerBtn.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(e); } }); } // Always make the whole component clickable to start playback wrap.addEventListener("click", onActivate, { passive: false }); // Page/tab visibility document.addEventListener("visibilitychange", () => { if (document.hidden) pauseIfPlaying(); else resumeIfAllowed(); }); // Cleanup on removal const mo = new MutationObserver(() => { if (!document.body.contains(wrap)) { try { io && io.disconnect(); } catch (e) {} try { player && player.destroy && player.destroy(); } catch (e) {} mo.disconnect(); } }); mo.observe(document.body, { childList: true, subtree: true }); // Prewarm as soon as it appears ensureObserver(); }); }); });

[Play video](#)Play video

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

-   Capabilities
    
    Read
    
    [](/connectors-capabilities/read-only)
    
    Interactive
    
    [](/connectors-capabilities/interactive)
    
-   More
    
    [Documentation](https://support.alltrails.com/hc/en-us/articles/47343827423764-AllTrails-integrations-with-AI-services)[Privacy Policy](https://privacy.alltrails.com/policies)[Support](https://support.alltrails.com/hc)
    

Find your next outdoor adventure with AllTrails, directly in Claude. AllTrails is the world's most popular and trusted outdoor exploration platform, with more than 500,000 curated trails — complete with reviews, photos, and ratings from a community of over 90+ million trail-goers. From local walks to bucket-list adventures, AllTrails helps you discover new places and connect with the outdoors.

You can use AllTrails to:

**Find nearby trails:**  
"Find moderate hiking trails within 30 minutes of Boulder with waterfalls"

**Check trail conditions:**  
"What's the weather and trail status for the Mist Trail in Yosemite this weekend?"

**Plan a route:**  
"Suggest a dog-friendly loop trail under 5 miles near Asheville"

.connector\_cms\_pill p{ overflow: hidden; display: -webkit-box; /\* Required for line-clamp to work in WebKit browsers \*/ -webkit-line-clamp: 2; /\* Limit to 3 lines \*/ -webkit-box-orient: vertical; /\* Required for line-clamp in WebKit browsers \*/ text-overflow: ellipsis; /\* Ensures ellipsis is displayed \*/ }

## Related connectors

Life sciences and healthcare

Health and wellness

Claude

Claude Code

March 4, 2026

[

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/695f3e9e884bd175dbadbf06_cms.jpg)

### CMS Coverage

Access the CMS Coverage Database



](/connectors/cms-coverage)

Health and wellness

Claude

February 24, 2026

[

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/696146b3ef7f8280dc6a91ff_function-health.jpg)

### Function (beta)

View lab test results summaries, get nutrition plans



](/connectors/function)

Health and wellness

Claude

January 26, 2026

[

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/695f3e7cb91804401037ccb4_healthEx.jpg)

### HealthEx (beta)

Connect your health records for personalized insights



](/connectors/healthex)

Health and wellness

Claude

Claude Code

March 4, 2026

[

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/695f3eb9f2f34ada6ce08e57_ICD-10.jpg)

### ICD-10 Codes

Access ICD-10-CM and ICD-10-PCS code sets



](/connectors/icd-10-codes)