# What is a Mean Opinion Score (MOS)?

A *Mean Opinion Score (MOS)* is a numerical measure of the human-judged overall quality of an event or experience. In telecommunications, a Mean Opinion Score is a ranking of the quality of voice and video sessions.

Most often judged on a scale of 1 (bad) to 5 (excellent), Mean Opinion Scores are the average of a number of other human-scored individual parameters. Although originally Mean Opinion Scores were derived from surveys of expert observers, today a MOS is often produced by an *Objective Measurement Method* approximating a human ranking.

## Where Can a Mean Opinion Score Be Used?

Generically, a Mean Opinion Score can be employed anywhere human subjective experience and opinion is useful. In practice, it is often used to judge digital approximations of world phenomena.

Commonly employed domains where Mean Opinion Score is applied include static image compression (e.g. JPG, GIF), audio codecs (e.g. MP3, Vorbis, AAC, Opus) and video codecs (e.g. H.264, VP8). It is also very commonly employed in streaming sessions where network effects can degrade communications quality.

## How is a Mean Opinion Score Determined for Audio and Video Quality?

Mean Opinion Scores, as commonly used today, originated from polls of test subjects listening to audio or observing video. A number of current standards can be traced back to expert listeners and observers in distraction free quiet rooms subjectively logging experience scores. A MOS itself is a metascore, averaged from a number of individual components of session quality.

Nowadays, audio and video communications isn't scored by a panel of individuals, but by a number of algorithms (\*Objective Measurement Methods)\*that attempt to approximate human experience. ITU-T's [P.800.1](https://www.itu.int/rec/T-REC-P.800.1-200303-S/en) discusses objective and subjective scoring of telephone transmission quality, while recommendations such as [P.863](https://www.itu.int/rec/T-REC-P.863/en) and [J.247](https://www.itu.int/rec/T-REC-J.247/en) cover speech and video quality, respectively.

The most commonly used rating scale is the Absolute Category Ranking (ACR) scale, which ranges from 1 to 5. The levels of the Absolute Category Ranking are:

| **5** Excellent |
| --------------- |
| **4** Good      |
| **3** Fair      |
| **2** Poor      |
| **1** Bad       |

Due to the human tendency to avoid perfect ratings (now reflected in the objective approximations), somewhere around 4.3 - 4.5 is considered an excellent quality target. On the low end, call or video quality becomes unacceptable below a MOS of roughly 3.5.

## What Causes a Low Mean Opinion Score in Video and Voice Calls?

All links in the chain from sender to receiver can cause a drop in mean opinion score. Everything from a human's health to audio and video equipment to computer settings can cause a degradation in communications quality. However, network effects are most readily apparent and measurable on these calls - [jitter](/docs/glossary/what-is-jitter), [latency](/docs/glossary/what-is-latency), and [packet loss](/docs/glossary/what-is-packet-loss) lend themselves to numerical measurement, and have a direct effect on perceived call quality.

## Does Twilio Report a Mean Opinion Score?

Twilio monitors average call quality over time and other metrics such as packet loss, round trip time, and jitter in the [Voice Insights API](/docs/voice/voice-insights). Sustained high jitter, packet loss, or round trip time, or a low mean opinion score will raise an event with a warning. Warnings are only cleared when measures improve for a specific amount of time; current event thresholds can be seen [here](/docs/voice/voice-insights/api/call/details-sdk-call-quality-events).

If you're experiencing persistent call quality issues with Twilio, we have written up a number of [client best practices](https://help.twilio.com/hc/en-us/articles/223133127-What-are-Twilio-Client-s-Deployment-Best-Practices-) to follow. If problems persist, talk to [Twilio Support](https://help.twilio.com) for help debugging your setup.

Additionally, Twilio can provide [SIP Trunking](https://www.twilio.com/en-us/sip-trunking) services with our own [private connections](https://www.twilio.com/en-us/interconnect) and routing choices, which usually greatly improves routing quality and improves mean opinion scores. Depending on availability, we can route your communications traffic over the internet or through our high speed, low-latency global backbone. To discuss this option in further detail, [talk to sales](https://www.twilio.com/en-us/help/sales).
