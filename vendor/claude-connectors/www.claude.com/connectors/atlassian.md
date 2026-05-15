// ----- Copy handler (works via parent .partner\_link) ----- (() => { const fadeMs = 300; const holdMs = 1000; function pickLabelNode(container) { return ( container.querySelector("\[data-copy-label\]") || container.querySelector("p") || container ); } async function writeToClipboard(text) { if (!text) return false; try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return true; } } catch (\_) {} try { const ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.left = "-9999px"; document.body.appendChild(ta); ta.select(); const ok = document.execCommand("copy"); document.body.removeChild(ta); return ok; } catch (\_) { return false; } } function animateCopied(labelNode, copiedText = "Copied!") { const originalText = labelNode.textContent; const originalWidth = labelNode.getBoundingClientRect().width; labelNode.style.minWidth = originalWidth ? \`${originalWidth}px\` : ""; labelNode.style.transition = \`opacity ${fadeMs}ms ease\`; labelNode.style.opacity = "0"; setTimeout(() => { labelNode.textContent = copiedText; labelNode.style.opacity = "1"; setTimeout(() => { labelNode.style.opacity = "0"; setTimeout(() => { labelNode.textContent = originalText; labelNode.style.opacity = "1"; setTimeout(() => { labelNode.style.transition = ""; labelNode.style.minWidth = ""; }, fadeMs); }, fadeMs); }, holdMs); }, fadeMs); } // Event delegation: click on .partner\_link, find \[data-copy\] inside document.addEventListener("click", async (evt) => { const parent = evt.target.closest(".header\_stories\_link.is-copy-link"); if (!parent) return; evt.preventDefault(); const copyEl = parent.querySelector("\[data-copy\]"); if (!copyEl) return; const textToCopy = copyEl.getAttribute("data-copy")?.trim(); const labelNode = pickLabelNode(copyEl); const ok = await writeToClipboard(textToCopy); if (ok && labelNode) animateCopied(labelNode); }); })();

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/690abde7cfa24b799acf7fc9_Atlassian.jpg)

# Atlassian Rovo

Access Jira & Confluence from Claude

-   Category
    
    Productivity
    
-   Used in
    
    [
    
    Claude  
    
    ](http://claude.ai/directory/11ba10d9-477b-4988-bd1c-90a7fa680dc1)[
    
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
    
    Atlassian
    
    ](https://www.atlassian.com/)
    

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) { \[data-youtube="play"\] { transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1); } \[data-youtube="wrapper"\]:hover \[data-youtube="play"\] { transform: scale(1.05); } } \[data-youtube="wrapper"\].is-playing \[data-youtube="cover"\], \[data-youtube="wrapper"\].is-playing \[data-youtube="play"\] { opacity: 0; pointer-events: none; transition: opacity .3s ease; }

/\* ========================= Robust YouTube API loader ========================= \*/ (function () { let readyPromise; window.\_ensureYouTubeAPI = function \_ensureYouTubeAPI() { if (readyPromise) return readyPromise; if (window.YT && typeof YT.Player === "function") { readyPromise = Promise.resolve(); return readyPromise; } readyPromise = new Promise((resolve) => { const prev = window.onYouTubeIframeAPIReady; window.onYouTubeIframeAPIReady = function () { try { prev && prev(); } catch (e) {} resolve(); }; let tag = document.querySelector( 'script\[src\*="youtube.com/iframe\_api"\]' ); if (!tag) { tag = document.createElement("script"); tag.src = "https://www.youtube.com/iframe\_api"; tag.async = true; document.head.appendChild(tag); } const poll = setInterval(() => { if (window.YT && typeof YT.Player === "function") { clearInterval(poll); resolve(); } }, 50); setTimeout(() => clearInterval(poll), 10000); }); return readyPromise; }; // Preload ASAP to keep the first tap in-gesture on iOS if (document.readyState !== "loading") \_ensureYouTubeAPI(); else document.addEventListener("DOMContentLoaded", \_ensureYouTubeAPI, { once: true, }); })(); document.addEventListener("DOMContentLoaded", function () { document.querySelectorAll(".video\_main\_wrap").forEach((section) => { if (section.dataset.scriptInitialized) return; section.dataset.scriptInitialized = "true"; // Any element with data-video-id that contains a \[data-youtube="player"\] is a component const components = Array.from( section.querySelectorAll("\[data-video-id\]") ).filter((el) => el.querySelector('\[data-youtube="player"\]')); if (!components.length) return; components.forEach((wrap) => { if (wrap.dataset.youtubeInit) return; wrap.dataset.youtubeInit = "true"; const videoId = wrap.getAttribute("data-video-id"); const shouldAutoResume = wrap.getAttribute("data-resume") === "true"; const playWrap = wrap.querySelector('\[data-youtube="play"\]'); // overlay container const coverImg = wrap.querySelector('\[data-youtube="cover"\]'); const playerHost = wrap.querySelector('\[data-youtube="player"\]'); if (!videoId || !playerHost) return; // Optional CSS background cover const thumb = wrap.getAttribute("data-thumb"); if (!coverImg && thumb) wrap.style.background = \`center / cover no-repeat url("${thumb}")\`; // Layout / focusability const cs = getComputedStyle(wrap); if (!/relative|absolute|fixed/.test(cs.position)) wrap.style.position = "relative"; if (!wrap.style.aspectRatio) wrap.style.aspectRatio = "16 / 9"; playerHost.style.position = "absolute"; playerHost.style.inset = "0"; playerHost.style.pointerEvents = "auto"; if (!playerHost.hasAttribute("tabindex")) playerHost.setAttribute("tabindex", "-1"); // Helps touch taps go straight to the iframe wrap.style.touchAction = "manipulation"; // ---- State let player = null; let playerReady = false; let userStarted = false; let revealed = false; let revealTimeoutId = null; let io = null; let prewarmed = false; // manual vs programmatic pause tracking let programmaticPause = false; let userPaused = false; // ---- Utils function moveFocusToHost() { try { playerHost.focus({ preventScroll: true }); } catch (e) {} } function hideA11y(el) { if (!el) return; const active = document.activeElement; if (active && el.contains(active)) moveFocusToHost(); el.setAttribute("inert", ""); requestAnimationFrame(() => { el.setAttribute("aria-hidden", "true"); }); } function killOverlay() { // Remove overlay nodes so nothing can intercept taps afterwards try { coverImg && coverImg.remove(); } catch (e) {} try { playWrap && playWrap.remove(); } catch (e) {} } function revealPlayer() { if (revealed) return; revealed = true; moveFocusToHost(); hideA11y(coverImg); hideA11y(playWrap); wrap.classList.add("is-playing"); wrap.classList.remove("is-loading"); // Nuke overlays entirely to guarantee clean taps killOverlay(); } function pauseIfPlaying() { if (!player || !playerReady) return; const s = player.getPlayerState && player.getPlayerState(); if (s === 1 || s === 3) { programmaticPause = true; try { player.pauseVideo(); } catch (e) {} setTimeout(() => { programmaticPause = false; }, 0); } } function resumeIfAllowed() { if ( !player || !playerReady || !userStarted || userPaused || !shouldAutoResume ) return; const s = player.getPlayerState && player.getPlayerState(); if (s === 2 || s === 5) { try { player.playVideo(); } catch (e) {} } } function ensureObserver() { if (io) return; io = new IntersectionObserver( (entries) => { for (const entry of entries) { // pre-warm early so the first tap never waits if (!prewarmed && entry.isIntersecting) { prewarmPlayer(); } if (entry.isIntersecting && entry.intersectionRatio >= 0.25) { resumeIfAllowed(); } else { pauseIfPlaying(); } } }, { threshold: \[0, 0.1, 0.25, 0.5, 0.75, 1\] } ); io.observe(wrap); } function setIframeAllow() { try { const ifr = player && player.getIframe && player.getIframe(); if (ifr) { // Ensure autoplay permission on some stricter browsers const allow = ifr.getAttribute("allow") || ""; if (!/autoplay/.test(allow)) { ifr.setAttribute( "allow", (allow ? allow + "; " : "") + "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" ); } } } catch (e) {} } function buildPlayer(autoplay) { return new YT.Player(playerHost, { host: "https://www.youtube-nocookie.com", videoId: videoId, playerVars: { autoplay: autoplay ? 1 : 0, controls: 1, rel: 0, playsinline: 1, modestbranding: 1, fs: 1, origin: window.location.origin, }, events: { onReady: function () { playerReady = true; setIframeAllow(); }, onStateChange: function (e) { // manual vs programmatic pause if (e.data === 2) { if (!programmaticPause) userPaused = true; } else if (e.data === 1) { userPaused = false; } // Reveal when buffering/playing to avoid the empty gap if (e.data === 1 || e.data === 3) { revealPlayer(); if (revealTimeoutId) { clearTimeout(revealTimeoutId); revealTimeoutId = null; } } }, }, }); } function prewarmPlayer() { if (prewarmed) return; prewarmed = true; \_ensureYouTubeAPI().then(() => { if (!player) { player = buildPlayer(false); // build but don't play } }); } function attemptPlayWithFallback() { if (!player) { // Build with autoplay:1 to catch the gesture immediately player = buildPlayer(true); } try { player.playVideo(); } catch (e) {} // If we don't reach PLAYING quickly, try muted autoplay (iOS always allows this) if (!revealTimeoutId) { revealTimeoutId = setTimeout(() => { if (!revealed && player && typeof player.isMuted === "function") { try { player.mute(); player.playVideo(); } catch (e) {} } }, 450); } } function onActivate(e) { e.preventDefault(); if (userStarted) return; userStarted = true; // Make sure taps go straight to the iframe even before reveal if (coverImg) coverImg.style.pointerEvents = "none"; if (playWrap) playWrap.style.pointerEvents = "none"; wrap.classList.add("is-loading"); if ( playWrap && document.activeElement && playWrap.contains(document.activeElement) ) { moveFocusToHost(); } \_ensureYouTubeAPI().then(() => { attemptPlayWithFallback(); ensureObserver(); }); } // Bind to overlay container and any inner button const innerBtn = playWrap ? playWrap.querySelector('button, \[role="button"\]') : null; if (playWrap) { playWrap.addEventListener("click", onActivate, { passive: false }); playWrap.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(e); } }); } if (innerBtn) { innerBtn.addEventListener("click", onActivate, { passive: false }); innerBtn.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(e); } }); } // Always make the whole component clickable to start playback wrap.addEventListener("click", onActivate, { passive: false }); // Page/tab visibility document.addEventListener("visibilitychange", () => { if (document.hidden) pauseIfPlaying(); else resumeIfAllowed(); }); // Cleanup on removal const mo = new MutationObserver(() => { if (!document.body.contains(wrap)) { try { io && io.disconnect(); } catch (e) {} try { player && player.destroy && player.destroy(); } catch (e) {} mo.disconnect(); } }); mo.observe(document.body, { childList: true, subtree: true }); // Prewarm as soon as it appears ensureObserver(); }); }); });

[Play video](#)Play video

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

-   Capabilities
    
    Read & write
    
    [](/connectors-capabilities/ready-write)
    
-   More
    
    [Documentation](https://www.atlassian.com/platform/remote-mcp-server)[Privacy Policy](https://www.atlassian.com/legal/privacy-policy)[Support](https://customerfeedback.atlassian.net/servicedesk/customer/portal/1701/group/1762/create/11360)
    

Connect to Jira, Confluence, and other Atlassian apps to manage issues, access documentation, track sprints, create tickets, update project status, and coordinate development workflows. Streamline project management and knowledge sharing across your development and collaboration tools through conversational interactions.

You can use the Atlassian Rovo connector to:

‍

Summarize Jira issues:

"Summarize all Jira issues assigned to me in the 'Q3 Planning' project that are still marked as 'In Progress'"

‍

Create Confluence pages:

"Create a new Confluence page titled 'Post-Mortem: Sprint 24' in the 'Engineering/Incidents' space. Include a summary of key takeaways and assign action items to team members"

‍

Perform bulk Jira actions:

"Create five Jira issues in the 'Mobile App' project for the following tasks: fix login bug, update onboarding flow, test Android push notifications, redesign settings page, and review user analytics dashboard"

‍

Users must have a Confluence account to use the server if 'User Installed Apps' setting is blocked.

.swiper-pagination-bullet { background: var(--\_theme---border-secondary) !important; opacity: 1 !important; width: 0.3125rem; height: 0.3125rem; } .swiper-pagination-bullet-active { background: var(--\_theme---foreground-primary) !important; opacity: 1 !important; width: 0.3125rem; height: 0.3125rem; } .swiper.is-marginalia .swiper-slide.is-marginalia { display: flex !important; flex-direction: column !important; } .swiper.is-marginalia .marginalia\_component { height: 100%; } .swiper.is-marginalia .marginalia\_wrap { height: 100%; box-shadow: 0px 0px 0px 0px; } .swiper-button-disabled { opacity: 0.3 !important; pointer-events: none !important; }

document.addEventListener("DOMContentLoaded", function () { document.querySelectorAll(".marginalia\_item\_slider").forEach((element) => { if (element.dataset.scriptInitialized) return; element.dataset.scriptInitialized = "true"; // ---- Utilities (scoped) ---- function updateNavigationStates(swiper) { const prevButton = element.querySelector("\[data-swiper-prev\]"); const nextButton = element.querySelector("\[data-swiper-next\]"); if (!prevButton || !nextButton || !swiper) return; const currentIndex = swiper.realIndex || 0; const totalSlides = swiper.slides ? swiper.slides.length : 0; if (currentIndex === 0) { prevButton.classList.add("swiper-button-disabled"); prevButton.disabled = true; } else { prevButton.classList.remove("swiper-button-disabled"); prevButton.disabled = false; } if (currentIndex === totalSlides - 1) { nextButton.classList.add("swiper-button-disabled"); nextButton.disabled = true; } else { nextButton.classList.remove("swiper-button-disabled"); nextButton.disabled = false; } } function equalizeSlideHeights(swiper) { if (!swiper || !swiper.slides) return; const slides = Array.from(swiper.slides); slides.forEach((s) => (s.style.height = "auto")); // Let layout settle before measuring setTimeout(() => { let maxHeight = 0; slides.forEach((s) => { const h = s.offsetHeight; if (h > maxHeight) maxHeight = h; }); slides.forEach((s) => (s.style.height = maxHeight + "px")); swiper.updateSize(); swiper.updateSlides(); }, 50); } // Prevent clicks on disabled buttons (scoped) function disableHandler(e) { const btn = e.target.closest("\[data-swiper-prev\],\[data-swiper-next\]"); if (!btn) return; if (btn.classList.contains("swiper-button-disabled")) { e.preventDefault(); e.stopPropagation(); } } element.addEventListener("click", disableHandler); // ---- Prefers Reduced Motion handling ---- const prm = window.matchMedia("(prefers-reduced-motion: reduce)"); let swiper; function buildBaseConfig(isPRM) { return { navigation: { prevEl: element.querySelector("\[data-swiper-prev\]"), nextEl: element.querySelector("\[data-swiper-next\]"), }, pagination: { el: element.querySelector("\[data-swiper-dots\]"), clickable: true, }, keyboard: { enabled: true }, observer: true, observeParents: true, watchSlidesProgress: !isPRM, // not needed in reduced mode on: { init() { equalizeSlideHeights(this); updateNavigationStates(this); }, slideChange() { updateNavigationStates(this); }, resize() { equalizeSlideHeights(this); }, }, }; } function buildMotionConfig() { return { grabCursor: true, effect: "cards", cardsEffect: { slideShadows: false }, speed: 500, }; } function buildReducedConfig() { // No animated transforms; instant changes; optional cssMode/native scroll. return { grabCursor: false, effect: "slide", speed: 0, // instant change cssMode: true, // native scrolling, no transform animations allowTouchMove: false, // avoid swipe gestures causing motion shortSwipes: false, longSwipes: false, a11y: { enabled: true }, }; } function initSwiper() { // Destroy existing instance cleanly if present if (swiper && swiper.destroy) { try { swiper.destroy(true, true); } catch (e) {} swiper = null; } const isPRM = prm.matches; const base = buildBaseConfig(isPRM); const mode = isPRM ? buildReducedConfig() : buildMotionConfig(); const container = element.querySelector(".swiper.is-marginalia"); if (!container) return; swiper = new Swiper(container, { ...mode, ...base }); } initSwiper(); // Re-initialize if the user toggles reduced motion setting live if (typeof prm.addEventListener === "function") { prm.addEventListener("change", initSwiper); } else if (typeof prm.addListener === "function") { // Safari < 14 fallback prm.addListener(initSwiper); } }); });

Skills

Capture Tasks from Meeting Notes

[Play video](#)Play video

Analyze meeting notes to find action items and create Jira tasks for assigned work.

.button\_tiny\_icon { transition: color 300ms ease; } .button\_tiny\_wrap:hover .button\_tiny\_icon { color: var(--\_button-style---icon-hover); } .button\_tiny\_wrap:focus-within .button\_tiny\_icon { color: var(--\_button-style---text-hover) !important; } .button\_tiny\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

Learn more

[Learn more](https://github.com/atlassian/atlassian-mcp-server)Learn more

\[data-vid-modal\].active { display: flex; }

document.addEventListener("DOMContentLoaded", function () { document.querySelectorAll("\[data-vid-component\]").forEach((element) => { if (element.dataset.scriptInitialized) return; element.dataset.scriptInitialized = "true"; // ----- grab this section's modal ----- const modalRoot = element.querySelector("\[data-vid-modal\]"); if (!modalRoot) return; const content = modalRoot.querySelector(".video\_modal\_content") || modalRoot; const iframe = modalRoot.querySelector("\[data-vid-frame\]"); const coverEl = modalRoot.querySelector("\[data-vid-cover\]"); const captionEl = modalRoot.querySelector("\[data-vid-caption\]") || null; const closeBtns = modalRoot.querySelectorAll("\[data-vid-close\]"); if (!iframe || !coverEl) return; let isAnimating = false; let lastFocused = null; let scrollY = 0; // ----- helpers ----- function buildEmbedUrl(id) { const vid = String(id || "").trim(); if (!vid) return ""; return \`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1&showinfo=0&playsinline=1\`; } function lockScroll() { scrollY = window.pageYOffset || document.documentElement.scrollTop || 0; document.body.style.overflow = "hidden"; document.body.style.position = "fixed"; document.body.style.top = \`-${scrollY}px\`; document.body.style.width = "100%"; } function unlockScroll() { document.body.style.removeProperty("overflow"); document.body.style.removeProperty("position"); document.body.style.removeProperty("top"); document.body.style.removeProperty("width"); window.scrollTo(0, scrollY); } function setCaption(text) { if (!captionEl) return; const t = (text || "").trim(); captionEl.hidden = !t; if (t) captionEl.textContent = t; } function resetCover() { coverEl.style.removeProperty("display"); // keep your CSS (img/div) coverEl.style.opacity = "1"; } function fadeOutCover() { gsap.to(coverEl, { opacity: 0, duration: 0.5, ease: "power2.out", onComplete: () => { coverEl.style.display = "none"; } }); } function loadAndFade(embedUrl) { iframe.src = embedUrl + "&autoplay=1"; iframe.addEventListener("load", function onLoad() { iframe.removeEventListener("load", onLoad); setTimeout(fadeOutCover, 1000); }); // fallback setTimeout(() => { if (getComputedStyle(coverEl).opacity !== "0") fadeOutCover(); }, 3000); } // ----- open / close ----- function openModal(trigger) { if (isAnimating) return; const id = trigger.getAttribute("data-vid-id"); const caption = trigger.getAttribute("data-vid-caption"); const url = buildEmbedUrl(id); if (!url) return; isAnimating = true; lastFocused = document.activeElement; resetCover(); setCaption(caption); modalRoot.classList.add("active"); modalRoot.setAttribute("aria-hidden", "false"); lockScroll(); const tl = gsap.timeline({ onComplete: () => { isAnimating = false; loadAndFade(url); closeBtns\[0\] && closeBtns\[0\].focus({ preventScroll: true }); } }); tl.fromTo( modalRoot, { backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: "rgba(0,0,0,0.85)", duration: 0.6, ease: "expo.out" } ).fromTo( content, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" }, ">-40%" ); const firstClose = closeBtns\[0\]; if (firstClose) tl.fromTo(firstClose, { scale: 0 }, { scale: 1, duration: 0.45, ease: "expo.out" }, ">-40%"); if (captionEl && !captionEl.hidden) tl.fromTo(captionEl, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "expo.out" }, "<+15%"); } function closeModal() { if (isAnimating) return; isAnimating = true; iframe.src = ""; // stop immediately const tl = gsap.timeline({ onComplete: () => { modalRoot.classList.remove("active"); modalRoot.setAttribute("aria-hidden", "true"); unlockScroll(); isAnimating = false; resetCover(); if (lastFocused && typeof lastFocused.focus === "function") { lastFocused.focus({ preventScroll: true }); } } }); tl.to(content, { opacity: 0, duration: 0.4, ease: "expo.in" }) .to(modalRoot, { backgroundColor: "rgba(0,0,0,0)", duration: 0.4, ease: "expo.in" }, ">-40%"); } // ----- triggers ----- // internal (inside this section) element.querySelectorAll("\[data-vid-trigger\]:not(\[data-vid-target\])").forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) openModal(btn); }); }); // external (anywhere) that explicitly target THIS modal const externals = Array.from(document.querySelectorAll("\[data-vid-trigger\]\[data-vid-target\]")) .filter((btn) => { const sel = btn.getAttribute("data-vid-target"); try { return document.querySelector(sel) === modalRoot; } catch { return false; } }); externals.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) openModal(btn); }); }); // close buttons closeBtns.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) closeModal(); }); }); // click backdrop to close modalRoot.addEventListener("click", (e) => { if (e.target === modalRoot && modalRoot.classList.contains("active") && !isAnimating) { closeModal(); } }); // ESC to close document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modalRoot.classList.contains("active") && !isAnimating) { closeModal(); } }); }); }); document.addEventListener("DOMContentLoaded", () => { document.querySelectorAll("\[data-vid-modal\]").forEach((modal) => { // Move modal to the end of <body> once, so it sits at the top context if (!modal.\_\_ported) { document.body.appendChild(modal); modal.\_\_ported = true; } }); });

[Next](#)Next

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

Skills

Generate Status Reports

Generate project status reports from Jira issues and publish to Confluence.

.button\_tiny\_icon { transition: color 300ms ease; } .button\_tiny\_wrap:hover .button\_tiny\_icon { color: var(--\_button-style---icon-hover); } .button\_tiny\_wrap:focus-within .button\_tiny\_icon { color: var(--\_button-style---text-hover) !important; } .button\_tiny\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

Learn more

[Learn more](https://github.com/atlassian/atlassian-mcp-server)Learn more

\[data-vid-modal\].active { display: flex; }

document.addEventListener("DOMContentLoaded", function () { document.querySelectorAll("\[data-vid-component\]").forEach((element) => { if (element.dataset.scriptInitialized) return; element.dataset.scriptInitialized = "true"; // ----- grab this section's modal ----- const modalRoot = element.querySelector("\[data-vid-modal\]"); if (!modalRoot) return; const content = modalRoot.querySelector(".video\_modal\_content") || modalRoot; const iframe = modalRoot.querySelector("\[data-vid-frame\]"); const coverEl = modalRoot.querySelector("\[data-vid-cover\]"); const captionEl = modalRoot.querySelector("\[data-vid-caption\]") || null; const closeBtns = modalRoot.querySelectorAll("\[data-vid-close\]"); if (!iframe || !coverEl) return; let isAnimating = false; let lastFocused = null; let scrollY = 0; // ----- helpers ----- function buildEmbedUrl(id) { const vid = String(id || "").trim(); if (!vid) return ""; return \`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1&showinfo=0&playsinline=1\`; } function lockScroll() { scrollY = window.pageYOffset || document.documentElement.scrollTop || 0; document.body.style.overflow = "hidden"; document.body.style.position = "fixed"; document.body.style.top = \`-${scrollY}px\`; document.body.style.width = "100%"; } function unlockScroll() { document.body.style.removeProperty("overflow"); document.body.style.removeProperty("position"); document.body.style.removeProperty("top"); document.body.style.removeProperty("width"); window.scrollTo(0, scrollY); } function setCaption(text) { if (!captionEl) return; const t = (text || "").trim(); captionEl.hidden = !t; if (t) captionEl.textContent = t; } function resetCover() { coverEl.style.removeProperty("display"); // keep your CSS (img/div) coverEl.style.opacity = "1"; } function fadeOutCover() { gsap.to(coverEl, { opacity: 0, duration: 0.5, ease: "power2.out", onComplete: () => { coverEl.style.display = "none"; } }); } function loadAndFade(embedUrl) { iframe.src = embedUrl + "&autoplay=1"; iframe.addEventListener("load", function onLoad() { iframe.removeEventListener("load", onLoad); setTimeout(fadeOutCover, 1000); }); // fallback setTimeout(() => { if (getComputedStyle(coverEl).opacity !== "0") fadeOutCover(); }, 3000); } // ----- open / close ----- function openModal(trigger) { if (isAnimating) return; const id = trigger.getAttribute("data-vid-id"); const caption = trigger.getAttribute("data-vid-caption"); const url = buildEmbedUrl(id); if (!url) return; isAnimating = true; lastFocused = document.activeElement; resetCover(); setCaption(caption); modalRoot.classList.add("active"); modalRoot.setAttribute("aria-hidden", "false"); lockScroll(); const tl = gsap.timeline({ onComplete: () => { isAnimating = false; loadAndFade(url); closeBtns\[0\] && closeBtns\[0\].focus({ preventScroll: true }); } }); tl.fromTo( modalRoot, { backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: "rgba(0,0,0,0.85)", duration: 0.6, ease: "expo.out" } ).fromTo( content, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" }, ">-40%" ); const firstClose = closeBtns\[0\]; if (firstClose) tl.fromTo(firstClose, { scale: 0 }, { scale: 1, duration: 0.45, ease: "expo.out" }, ">-40%"); if (captionEl && !captionEl.hidden) tl.fromTo(captionEl, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "expo.out" }, "<+15%"); } function closeModal() { if (isAnimating) return; isAnimating = true; iframe.src = ""; // stop immediately const tl = gsap.timeline({ onComplete: () => { modalRoot.classList.remove("active"); modalRoot.setAttribute("aria-hidden", "true"); unlockScroll(); isAnimating = false; resetCover(); if (lastFocused && typeof lastFocused.focus === "function") { lastFocused.focus({ preventScroll: true }); } } }); tl.to(content, { opacity: 0, duration: 0.4, ease: "expo.in" }) .to(modalRoot, { backgroundColor: "rgba(0,0,0,0)", duration: 0.4, ease: "expo.in" }, ">-40%"); } // ----- triggers ----- // internal (inside this section) element.querySelectorAll("\[data-vid-trigger\]:not(\[data-vid-target\])").forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) openModal(btn); }); }); // external (anywhere) that explicitly target THIS modal const externals = Array.from(document.querySelectorAll("\[data-vid-trigger\]\[data-vid-target\]")) .filter((btn) => { const sel = btn.getAttribute("data-vid-target"); try { return document.querySelector(sel) === modalRoot; } catch { return false; } }); externals.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) openModal(btn); }); }); // close buttons closeBtns.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) closeModal(); }); }); // click backdrop to close modalRoot.addEventListener("click", (e) => { if (e.target === modalRoot && modalRoot.classList.contains("active") && !isAnimating) { closeModal(); } }); // ESC to close document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modalRoot.classList.contains("active") && !isAnimating) { closeModal(); } }); }); }); document.addEventListener("DOMContentLoaded", () => { document.querySelectorAll("\[data-vid-modal\]").forEach((modal) => { // Move modal to the end of <body> once, so it sits at the top context if (!modal.\_\_ported) { document.body.appendChild(modal); modal.\_\_ported = true; } }); });

[Next](#)Next

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

Skills

Search Company Knowledge

Search company knowledge bases (Confluence, Jira, internal docs) to find and explain internal concepts, processes, and technical details.

.button\_tiny\_icon { transition: color 300ms ease; } .button\_tiny\_wrap:hover .button\_tiny\_icon { color: var(--\_button-style---icon-hover); } .button\_tiny\_wrap:focus-within .button\_tiny\_icon { color: var(--\_button-style---text-hover) !important; } .button\_tiny\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

Learn more

[Learn more](https://github.com/atlassian/atlassian-mcp-server)Learn more

\[data-vid-modal\].active { display: flex; }

document.addEventListener("DOMContentLoaded", function () { document.querySelectorAll("\[data-vid-component\]").forEach((element) => { if (element.dataset.scriptInitialized) return; element.dataset.scriptInitialized = "true"; // ----- grab this section's modal ----- const modalRoot = element.querySelector("\[data-vid-modal\]"); if (!modalRoot) return; const content = modalRoot.querySelector(".video\_modal\_content") || modalRoot; const iframe = modalRoot.querySelector("\[data-vid-frame\]"); const coverEl = modalRoot.querySelector("\[data-vid-cover\]"); const captionEl = modalRoot.querySelector("\[data-vid-caption\]") || null; const closeBtns = modalRoot.querySelectorAll("\[data-vid-close\]"); if (!iframe || !coverEl) return; let isAnimating = false; let lastFocused = null; let scrollY = 0; // ----- helpers ----- function buildEmbedUrl(id) { const vid = String(id || "").trim(); if (!vid) return ""; return \`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1&showinfo=0&playsinline=1\`; } function lockScroll() { scrollY = window.pageYOffset || document.documentElement.scrollTop || 0; document.body.style.overflow = "hidden"; document.body.style.position = "fixed"; document.body.style.top = \`-${scrollY}px\`; document.body.style.width = "100%"; } function unlockScroll() { document.body.style.removeProperty("overflow"); document.body.style.removeProperty("position"); document.body.style.removeProperty("top"); document.body.style.removeProperty("width"); window.scrollTo(0, scrollY); } function setCaption(text) { if (!captionEl) return; const t = (text || "").trim(); captionEl.hidden = !t; if (t) captionEl.textContent = t; } function resetCover() { coverEl.style.removeProperty("display"); // keep your CSS (img/div) coverEl.style.opacity = "1"; } function fadeOutCover() { gsap.to(coverEl, { opacity: 0, duration: 0.5, ease: "power2.out", onComplete: () => { coverEl.style.display = "none"; } }); } function loadAndFade(embedUrl) { iframe.src = embedUrl + "&autoplay=1"; iframe.addEventListener("load", function onLoad() { iframe.removeEventListener("load", onLoad); setTimeout(fadeOutCover, 1000); }); // fallback setTimeout(() => { if (getComputedStyle(coverEl).opacity !== "0") fadeOutCover(); }, 3000); } // ----- open / close ----- function openModal(trigger) { if (isAnimating) return; const id = trigger.getAttribute("data-vid-id"); const caption = trigger.getAttribute("data-vid-caption"); const url = buildEmbedUrl(id); if (!url) return; isAnimating = true; lastFocused = document.activeElement; resetCover(); setCaption(caption); modalRoot.classList.add("active"); modalRoot.setAttribute("aria-hidden", "false"); lockScroll(); const tl = gsap.timeline({ onComplete: () => { isAnimating = false; loadAndFade(url); closeBtns\[0\] && closeBtns\[0\].focus({ preventScroll: true }); } }); tl.fromTo( modalRoot, { backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: "rgba(0,0,0,0.85)", duration: 0.6, ease: "expo.out" } ).fromTo( content, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" }, ">-40%" ); const firstClose = closeBtns\[0\]; if (firstClose) tl.fromTo(firstClose, { scale: 0 }, { scale: 1, duration: 0.45, ease: "expo.out" }, ">-40%"); if (captionEl && !captionEl.hidden) tl.fromTo(captionEl, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "expo.out" }, "<+15%"); } function closeModal() { if (isAnimating) return; isAnimating = true; iframe.src = ""; // stop immediately const tl = gsap.timeline({ onComplete: () => { modalRoot.classList.remove("active"); modalRoot.setAttribute("aria-hidden", "true"); unlockScroll(); isAnimating = false; resetCover(); if (lastFocused && typeof lastFocused.focus === "function") { lastFocused.focus({ preventScroll: true }); } } }); tl.to(content, { opacity: 0, duration: 0.4, ease: "expo.in" }) .to(modalRoot, { backgroundColor: "rgba(0,0,0,0)", duration: 0.4, ease: "expo.in" }, ">-40%"); } // ----- triggers ----- // internal (inside this section) element.querySelectorAll("\[data-vid-trigger\]:not(\[data-vid-target\])").forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) openModal(btn); }); }); // external (anywhere) that explicitly target THIS modal const externals = Array.from(document.querySelectorAll("\[data-vid-trigger\]\[data-vid-target\]")) .filter((btn) => { const sel = btn.getAttribute("data-vid-target"); try { return document.querySelector(sel) === modalRoot; } catch { return false; } }); externals.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) openModal(btn); }); }); // close buttons closeBtns.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) closeModal(); }); }); // click backdrop to close modalRoot.addEventListener("click", (e) => { if (e.target === modalRoot && modalRoot.classList.contains("active") && !isAnimating) { closeModal(); } }); // ESC to close document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modalRoot.classList.contains("active") && !isAnimating) { closeModal(); } }); }); }); document.addEventListener("DOMContentLoaded", () => { document.querySelectorAll("\[data-vid-modal\]").forEach((modal) => { // Move modal to the end of <body> once, so it sits at the top context if (!modal.\_\_ported) { document.body.appendChild(modal); modal.\_\_ported = true; } }); });

[Next](#)Next

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

Skills

Spec to Backlog

Automatically convert Confluence specification documents into structured Jira backlogs with Epics and implementation tickets.

.button\_tiny\_icon { transition: color 300ms ease; } .button\_tiny\_wrap:hover .button\_tiny\_icon { color: var(--\_button-style---icon-hover); } .button\_tiny\_wrap:focus-within .button\_tiny\_icon { color: var(--\_button-style---text-hover) !important; } .button\_tiny\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

Learn more

[Learn more](https://github.com/atlassian/atlassian-mcp-server)Learn more

\[data-vid-modal\].active { display: flex; }

document.addEventListener("DOMContentLoaded", function () { document.querySelectorAll("\[data-vid-component\]").forEach((element) => { if (element.dataset.scriptInitialized) return; element.dataset.scriptInitialized = "true"; // ----- grab this section's modal ----- const modalRoot = element.querySelector("\[data-vid-modal\]"); if (!modalRoot) return; const content = modalRoot.querySelector(".video\_modal\_content") || modalRoot; const iframe = modalRoot.querySelector("\[data-vid-frame\]"); const coverEl = modalRoot.querySelector("\[data-vid-cover\]"); const captionEl = modalRoot.querySelector("\[data-vid-caption\]") || null; const closeBtns = modalRoot.querySelectorAll("\[data-vid-close\]"); if (!iframe || !coverEl) return; let isAnimating = false; let lastFocused = null; let scrollY = 0; // ----- helpers ----- function buildEmbedUrl(id) { const vid = String(id || "").trim(); if (!vid) return ""; return \`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1&showinfo=0&playsinline=1\`; } function lockScroll() { scrollY = window.pageYOffset || document.documentElement.scrollTop || 0; document.body.style.overflow = "hidden"; document.body.style.position = "fixed"; document.body.style.top = \`-${scrollY}px\`; document.body.style.width = "100%"; } function unlockScroll() { document.body.style.removeProperty("overflow"); document.body.style.removeProperty("position"); document.body.style.removeProperty("top"); document.body.style.removeProperty("width"); window.scrollTo(0, scrollY); } function setCaption(text) { if (!captionEl) return; const t = (text || "").trim(); captionEl.hidden = !t; if (t) captionEl.textContent = t; } function resetCover() { coverEl.style.removeProperty("display"); // keep your CSS (img/div) coverEl.style.opacity = "1"; } function fadeOutCover() { gsap.to(coverEl, { opacity: 0, duration: 0.5, ease: "power2.out", onComplete: () => { coverEl.style.display = "none"; } }); } function loadAndFade(embedUrl) { iframe.src = embedUrl + "&autoplay=1"; iframe.addEventListener("load", function onLoad() { iframe.removeEventListener("load", onLoad); setTimeout(fadeOutCover, 1000); }); // fallback setTimeout(() => { if (getComputedStyle(coverEl).opacity !== "0") fadeOutCover(); }, 3000); } // ----- open / close ----- function openModal(trigger) { if (isAnimating) return; const id = trigger.getAttribute("data-vid-id"); const caption = trigger.getAttribute("data-vid-caption"); const url = buildEmbedUrl(id); if (!url) return; isAnimating = true; lastFocused = document.activeElement; resetCover(); setCaption(caption); modalRoot.classList.add("active"); modalRoot.setAttribute("aria-hidden", "false"); lockScroll(); const tl = gsap.timeline({ onComplete: () => { isAnimating = false; loadAndFade(url); closeBtns\[0\] && closeBtns\[0\].focus({ preventScroll: true }); } }); tl.fromTo( modalRoot, { backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: "rgba(0,0,0,0.85)", duration: 0.6, ease: "expo.out" } ).fromTo( content, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" }, ">-40%" ); const firstClose = closeBtns\[0\]; if (firstClose) tl.fromTo(firstClose, { scale: 0 }, { scale: 1, duration: 0.45, ease: "expo.out" }, ">-40%"); if (captionEl && !captionEl.hidden) tl.fromTo(captionEl, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "expo.out" }, "<+15%"); } function closeModal() { if (isAnimating) return; isAnimating = true; iframe.src = ""; // stop immediately const tl = gsap.timeline({ onComplete: () => { modalRoot.classList.remove("active"); modalRoot.setAttribute("aria-hidden", "true"); unlockScroll(); isAnimating = false; resetCover(); if (lastFocused && typeof lastFocused.focus === "function") { lastFocused.focus({ preventScroll: true }); } } }); tl.to(content, { opacity: 0, duration: 0.4, ease: "expo.in" }) .to(modalRoot, { backgroundColor: "rgba(0,0,0,0)", duration: 0.4, ease: "expo.in" }, ">-40%"); } // ----- triggers ----- // internal (inside this section) element.querySelectorAll("\[data-vid-trigger\]:not(\[data-vid-target\])").forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) openModal(btn); }); }); // external (anywhere) that explicitly target THIS modal const externals = Array.from(document.querySelectorAll("\[data-vid-trigger\]\[data-vid-target\]")) .filter((btn) => { const sel = btn.getAttribute("data-vid-target"); try { return document.querySelector(sel) === modalRoot; } catch { return false; } }); externals.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) openModal(btn); }); }); // close buttons closeBtns.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) closeModal(); }); }); // click backdrop to close modalRoot.addEventListener("click", (e) => { if (e.target === modalRoot && modalRoot.classList.contains("active") && !isAnimating) { closeModal(); } }); // ESC to close document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modalRoot.classList.contains("active") && !isAnimating) { closeModal(); } }); }); }); document.addEventListener("DOMContentLoaded", () => { document.querySelectorAll("\[data-vid-modal\]").forEach((modal) => { // Move modal to the end of <body> once, so it sits at the top context if (!modal.\_\_ported) { document.body.appendChild(modal); modal.\_\_ported = true; } }); });

[Next](#)Next

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

Skills

Triage Issue

Triage bug reports and error messages by searching for duplicates in Jira and offering to create new issues or add comments to existing ones.

.button\_tiny\_icon { transition: color 300ms ease; } .button\_tiny\_wrap:hover .button\_tiny\_icon { color: var(--\_button-style---icon-hover); } .button\_tiny\_wrap:focus-within .button\_tiny\_icon { color: var(--\_button-style---text-hover) !important; } .button\_tiny\_wrap:focus-within { color: var(--\_button-style---text-hover) !important; }

Learn more

[Learn more](https://github.com/atlassian/atlassian-mcp-server)Learn more

\[data-vid-modal\].active { display: flex; }

document.addEventListener("DOMContentLoaded", function () { document.querySelectorAll("\[data-vid-component\]").forEach((element) => { if (element.dataset.scriptInitialized) return; element.dataset.scriptInitialized = "true"; // ----- grab this section's modal ----- const modalRoot = element.querySelector("\[data-vid-modal\]"); if (!modalRoot) return; const content = modalRoot.querySelector(".video\_modal\_content") || modalRoot; const iframe = modalRoot.querySelector("\[data-vid-frame\]"); const coverEl = modalRoot.querySelector("\[data-vid-cover\]"); const captionEl = modalRoot.querySelector("\[data-vid-caption\]") || null; const closeBtns = modalRoot.querySelectorAll("\[data-vid-close\]"); if (!iframe || !coverEl) return; let isAnimating = false; let lastFocused = null; let scrollY = 0; // ----- helpers ----- function buildEmbedUrl(id) { const vid = String(id || "").trim(); if (!vid) return ""; return \`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1&showinfo=0&playsinline=1\`; } function lockScroll() { scrollY = window.pageYOffset || document.documentElement.scrollTop || 0; document.body.style.overflow = "hidden"; document.body.style.position = "fixed"; document.body.style.top = \`-${scrollY}px\`; document.body.style.width = "100%"; } function unlockScroll() { document.body.style.removeProperty("overflow"); document.body.style.removeProperty("position"); document.body.style.removeProperty("top"); document.body.style.removeProperty("width"); window.scrollTo(0, scrollY); } function setCaption(text) { if (!captionEl) return; const t = (text || "").trim(); captionEl.hidden = !t; if (t) captionEl.textContent = t; } function resetCover() { coverEl.style.removeProperty("display"); // keep your CSS (img/div) coverEl.style.opacity = "1"; } function fadeOutCover() { gsap.to(coverEl, { opacity: 0, duration: 0.5, ease: "power2.out", onComplete: () => { coverEl.style.display = "none"; } }); } function loadAndFade(embedUrl) { iframe.src = embedUrl + "&autoplay=1"; iframe.addEventListener("load", function onLoad() { iframe.removeEventListener("load", onLoad); setTimeout(fadeOutCover, 1000); }); // fallback setTimeout(() => { if (getComputedStyle(coverEl).opacity !== "0") fadeOutCover(); }, 3000); } // ----- open / close ----- function openModal(trigger) { if (isAnimating) return; const id = trigger.getAttribute("data-vid-id"); const caption = trigger.getAttribute("data-vid-caption"); const url = buildEmbedUrl(id); if (!url) return; isAnimating = true; lastFocused = document.activeElement; resetCover(); setCaption(caption); modalRoot.classList.add("active"); modalRoot.setAttribute("aria-hidden", "false"); lockScroll(); const tl = gsap.timeline({ onComplete: () => { isAnimating = false; loadAndFade(url); closeBtns\[0\] && closeBtns\[0\].focus({ preventScroll: true }); } }); tl.fromTo( modalRoot, { backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: "rgba(0,0,0,0.85)", duration: 0.6, ease: "expo.out" } ).fromTo( content, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" }, ">-40%" ); const firstClose = closeBtns\[0\]; if (firstClose) tl.fromTo(firstClose, { scale: 0 }, { scale: 1, duration: 0.45, ease: "expo.out" }, ">-40%"); if (captionEl && !captionEl.hidden) tl.fromTo(captionEl, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "expo.out" }, "<+15%"); } function closeModal() { if (isAnimating) return; isAnimating = true; iframe.src = ""; // stop immediately const tl = gsap.timeline({ onComplete: () => { modalRoot.classList.remove("active"); modalRoot.setAttribute("aria-hidden", "true"); unlockScroll(); isAnimating = false; resetCover(); if (lastFocused && typeof lastFocused.focus === "function") { lastFocused.focus({ preventScroll: true }); } } }); tl.to(content, { opacity: 0, duration: 0.4, ease: "expo.in" }) .to(modalRoot, { backgroundColor: "rgba(0,0,0,0)", duration: 0.4, ease: "expo.in" }, ">-40%"); } // ----- triggers ----- // internal (inside this section) element.querySelectorAll("\[data-vid-trigger\]:not(\[data-vid-target\])").forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) openModal(btn); }); }); // external (anywhere) that explicitly target THIS modal const externals = Array.from(document.querySelectorAll("\[data-vid-trigger\]\[data-vid-target\]")) .filter((btn) => { const sel = btn.getAttribute("data-vid-target"); try { return document.querySelector(sel) === modalRoot; } catch { return false; } }); externals.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) openModal(btn); }); }); // close buttons closeBtns.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); if (!isAnimating) closeModal(); }); }); // click backdrop to close modalRoot.addEventListener("click", (e) => { if (e.target === modalRoot && modalRoot.classList.contains("active") && !isAnimating) { closeModal(); } }); // ESC to close document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modalRoot.classList.contains("active") && !isAnimating) { closeModal(); } }); }); }); document.addEventListener("DOMContentLoaded", () => { document.querySelectorAll("\[data-vid-modal\]").forEach((modal) => { // Move modal to the end of <body> once, so it sits at the top context if (!modal.\_\_ported) { document.body.appendChild(modal); modal.\_\_ported = true; } }); });

[Next](#)Next

![](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6889473610b50328dbb70b58_placeholder.svg)

[Prev](#)Prev

[Next](#)Next

.connector\_cms\_pill p{ overflow: hidden; display: -webkit-box; /\* Required for line-clamp to work in WebKit browsers \*/ -webkit-line-clamp: 2; /\* Limit to 3 lines \*/ -webkit-box-orient: vertical; /\* Required for line-clamp in WebKit browsers \*/ text-overflow: ellipsis; /\* Ensures ellipsis is displayed \*/ }

## Related connectors

Productivity

Claude

Claude Code

April 29, 2026

[

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/69f24b64e8d71dfd92fdd8d2_Adobe_icon_RGB_red%20\(3\)%20-%20Sarah%20Xu.svg)

### Adobe Experience Manager

Manage your Adobe Experience Manager content



](/connectors/adobe-experience-manager)

Productivity

Communication

Claude

Claude Code

February 11, 2026

[

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/690abdda280622da0e174da2_Asana.jpg)

### Asana

Connect to Asana to coordinate tasks, projects, and goals



](/connectors/asana)

Productivity

Claude

May 1, 2026

[

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/69f517b944431173c96c6735_audible%20-%20Audible%20\(1\).svg)

### Audible

Ask for audiobook recommendations



](/connectors/audible)

Productivity

Claude

Claude Code

May 12, 2026

[

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a02b70a38d8e2b6e8fa1f71_consilio%20\(1\).svg)

### Aurora

Search your Consilio matters, docs, and more.



](/connectors/aurora)