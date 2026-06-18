---
title: TURN Feature Matrix
description: Supported TURN protocols, RFCs, and STUN features on Cloudflare Realtime TURN.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# TURN Feature Matrix

## TURN client to TURN server protocols

| Protocol | Support | Relevant specification                                                                                      |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| UDP      | ✅       | [RFC 5766 ↗](https://datatracker.ietf.org/doc/html/rfc5766)                                                 |
| TCP      | ✅       | [RFC 5766 ↗](https://datatracker.ietf.org/doc/html/rfc5766)                                                 |
| TLS      | ✅       | [RFC 5766 ↗](https://datatracker.ietf.org/doc/html/rfc5766)                                                 |
| DTLS     | No      | [draft-petithuguenin-tram-turn-dtls-00 ↗](http://tools.ietf.org/html/draft-petithuguenin-tram-turn-dtls-00) |

## TURN client to TURN server protocols

| Protocol                                        | Support                                                                                                                                                               | Relevant specification                                                                                                 |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| TURN (base RFC)                                 | ✅                                                                                                                                                                     | [RFC 5766 ↗](https://datatracker.ietf.org/doc/html/rfc5766)                                                            |
| TURN REST API                                   | ✅ (See [FAQ](https://developers.cloudflare.com/realtime/turn/faq/#does-cloudflare-realtime-turn-support-the-expired-ietf-rfc-draft-draft-uberti-behave-turn-rest-00)) | [draft-uberti-behave-turn-rest-00 ↗](http://tools.ietf.org/html/draft-uberti-behave-turn-rest-00)                      |
| Origin field in TURN (Multi-tenant TURN Server) | ✅                                                                                                                                                                     | [draft-ietf-tram-stun-origin-06 ↗](https://tools.ietf.org/html/draft-ietf-tram-stun-origin-06)                         |
| ALPN support for STUN & TURN                    | ✅                                                                                                                                                                     | [RFC 7443 ↗](https://datatracker.ietf.org/doc/html/rfc7443)                                                            |
| TURN Bandwidth draft specs                      | No                                                                                                                                                                    | [draft-thomson-tram-turn-bandwidth-01 ↗](http://tools.ietf.org/html/draft-thomson-tram-turn-bandwidth-01)              |
| TURN-bis (with dual allocation) draft specs     | No                                                                                                                                                                    | [draft-ietf-tram-turnbis-04 ↗](http://tools.ietf.org/html/draft-ietf-tram-turnbis-04)                                  |
| TCP relaying TURN extension                     | No                                                                                                                                                                    | [RFC 6062 ↗](https://datatracker.ietf.org/doc/html/rfc6062)                                                            |
| IPv6 extension for TURN                         | No                                                                                                                                                                    | [RFC 6156 ↗](https://datatracker.ietf.org/doc/html/rfc6156)                                                            |
| oAuth third-party TURN/STUN authorization       | No                                                                                                                                                                    | [RFC 7635 ↗](https://datatracker.ietf.org/doc/html/rfc7635)                                                            |
| DTLS support (for TURN)                         | No                                                                                                                                                                    | [draft-petithuguenin-tram-stun-dtls-00 ↗](https://datatracker.ietf.org/doc/html/draft-petithuguenin-tram-stun-dtls-00) |
| Mobile ICE (MICE) support                       | No                                                                                                                                                                    | [draft-wing-tram-turn-mobility-02 ↗](http://tools.ietf.org/html/draft-wing-tram-turn-mobility-02)                      |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/turn/rfc-matrix/#page","headline":"TURN Feature Matrix · Cloudflare Realtime docs","description":"Supported TURN protocols, RFCs, and STUN features on Cloudflare Realtime TURN.","url":"https://developers.cloudflare.com/realtime/turn/rfc-matrix/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/turn/","name":"TURN Service"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/turn/rfc-matrix/","name":"TURN Feature Matrix"}}]}
```
