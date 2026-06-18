# What is GSM-7 character encoding?

The original assignment of 128 alphanumeric characters accepted and displayed in text messages to numerical values for transmission across mobile networks. This assignment of characters to numeric values is character encoding.

[Global System for Mobile Communications (GSM)][GSM] codified these assignments in [GSM 03.38][] (PDF). GSM-7 encodes each character as 7 *bits*. As [*Short Message Service* (SMS)][SMS] messages transmit 140 bytes at a time, SMS messages encoded with GSM-7 can include 160 characters.

```text
(140 bytes × 8 bits) / 7 bits = 160 characters
```

To support local languages, devices use shift tables or change the text encoding to [Universal Coded Character Set–2 byte (UCS-2)][UCS-2] that uses 16 bits per character.

#### View the GSM-7 character map

|      | `00` | `10`  | `20` | `30` | `40` | `50` | `60` | `70` |
| ---- | ---- | ----- | ---- | ---- | ---- | ---- | ---- | ---- |
| `00` | `@`  | `Δ`   | `SP` | `0`  | `¡`  | `P`  | `¿`  | `p`  |
| `01` | `£`  | `_`   | `!`  | `1`  | `A`  | `Q`  | `a`  | `q`  |
| `02` | `$`  | `Φ`   | `"`  | `2`  | `B`  | `R`  | `b`  | `r`  |
| `03` | `¥`  | `Γ`   | `#`  | `3`  | `C`  | `S`  | `c`  | `s`  |
| `04` | `è`  | `Λ`   | `¤`  | `4`  | `D`  | `T`  | `d`  | `t`  |
| `05` | `é`  | `Ω`   | `%`  | `5`  | `E`  | `U`  | `e`  | `u`  |
| `06` | `ù`  | `Π`   | `&`  | `6`  | `F`  | `V`  | `f`  | `v`  |
| `07` | `ì`  | `Ψ`   | `'`  | `7`  | `G`  | `W`  | `g`  | `w`  |
| `08` | `ò`  | `Σ`   | `(`  | `8`  | `H`  | `X`  | `h`  | `x`  |
| `09` | `Ç`  | `Θ`   | `)`  | `9`  | `I`  | `Y`  | `i`  | `y`  |
| `0A` | `LF` | `Ξ`   | `*`  | `:`  | `J`  | `Z`  | `j`  | `z`  |
| `0B` | `Ø`  | `ESC` | `+`  | `;`  | `K`  | `Ä`  | `k`  | `ä`  |
| `0C` | `ø`  | `Æ`   | `,`  | `<`  | `L`  | `Ö`  | `l`  | `ö`  |
| `0D` | `CR` | `æ`   | `-`  | `=`  | `M`  | `Ñ`  | `m`  | `ñ`  |
| `0E` | `Å`  | `ß`   | `.`  | `>`  | `N`  | `Ü`  | `n`  | `ü`  |
| `0F` | `å`  | `É`   | `/`  | `?`  | `O`  | `§`  | `o`  | `à`  |

To read this table, add the hexadecimal column value to the hexadecimal row value.

**For example**: `à` falls in the `70` column and `0F` row. That equals `7F` or `127` in decimal. Number sequences start with `0`.

Some characters, such as `{` and `]`, need an escape character. These escape characters count as two characters in a GSM-7-encoded message.

## Related topics

* [How much does it cost to send a message with more than 160 characters?][msg-cost]
* [Why are my messages with Unicode being split?][SMS-UCS-split]
* [How long can a message be?][msg-length]
* [What the heck is a segment?][blog-segment]
* [Adventures in Unicode SMS][SMS-UCS-split]
* [Twilio Messaging API][tw-msg-api]

[GSM 03.38]: https://www.etsi.org/deliver/etsi_gts/03/0338/05.00.00_60/gsmts_0338v050000p.pdf

[GSM]: https://en.wikipedia.org/wiki/GSM

[msg-cost]: https://help.twilio.com/hc/en-us/articles/223133407-How-much-does-it-cost-to-send-a-message-with-more-than-160-characters-

[SMS]: /docs/glossary/what-is-an-sms-short-message-service

[tw-msg-api]: /docs/messaging/api

[UCS-2]: /docs/glossary/what-is-ucs-2-character-encoding

[blog-segment]: https://www.twilio.com/blog/what-the-heck-is-a-segment-html

[SMS-UCS-split]: https://help.twilio.com/hc/en-us/articles/223134307-Why-are-my-messages-with-unicode-being-split-

[msg-length]: /docs/glossary/what-sms-character-limit
