# MagicSchool on building a safety layer for millions of student conversations

_Q&A with Keanon O'Keefe, Senior Product Manager, AI Trust, Safety, and Quality, and Chris Rohlfs, Staff Data Scientist, AI Trust, Safety, and Quality at MagicSchool_

MagicSchool is a K-12 AI platform used by more than 7 million educators across 13,000 schools and districts. MagicSchool’s AI-powered platform helps teachers save time by streamlining lesson planning, providing personalized student feedback, and creating engaging content for students. MagicSchool recently built a Claude-powered safety layer that moderates 8 to 10 million student messages in real time each month, reducing the false positive rate of self-harm and mental distress signals by 3x. Because students are minors, the deployment follows Claude's API requirements for minor users. We spoke with Keanon O'Keefe, Senior Product Manager for AI Trust, Safety, and Quality, and Chris Rohlfs, Staff Data Scientist for AI Trust, Safety, and Quality, about how it works, why precision matters more than recall, and what happens after a flag goes off. The following conversation has been edited for length and clarity.

## Anthropic: Set the stage for us. What is MagicSchool, what are students actually doing on it, and where does the new safety moderation layer fit in?

**Keanon O'Keefe, MagicSchool:** MagicSchool is the most widely used AI platform in K-12 education, supporting millions of educators worldwide. Built by educators, we serve as the AI Operating System for schools, bringing together teacher tools, student-safe learning experiences, and district-level governance in one connected platform. We leverage Claude to power our safe, student-facing AI experiences. This includes, but is not limited to, our tutoring and study tools, as well as chatbots, which account for millions of student interactions a month. The new safety moderation layer was rolled out as part of the existing interface, with better signals and responses for crisis, not a separate, bespoke tool for students.

## Anthropic: Even with a platform built for the classroom, K-12 is a hard moderation problem. What's the core challenge?

**Chris Rohlfs, MagicSchool:** One of the challenges we face is that K-12 students naturally explore and push boundaries. We need the AI we provide to the classroom to be robust and to adhere to strict guidelines we set for safety, fairness, and educational value.

## Anthropic: What did your safety approach look like before this layer, and where was it falling short?

**O'Keefe:** We've been using off-the-shelf third-party systems to help us flag student messages, but as we grew and reviewed more message threads, we began to see where context awareness was not always flagged appropriately. The existing systems were not able to specialize to our specific educational use cases and we found ourselves fighting false positive and false negative results across various categories.

## Anthropic: When you say "safety moderation," what is the layer actually looking for, and how does it work?

**O'Keefe:** The Haiku-based moderation prompt specifically identifies indicators of student self-harm or mental distress. For moderating student messages, we started leveraging Haiku 4.5 as an LLM Judge specifically focused on self-harm and mental distress concerns, as the off-the-shelf solutions we were using struggled with the nuance and complex language in these messages. As a student interacts with one of our tools, their inputted messages are moderated in real time. We send the message text to the LLM Judge via the API. If the LLM Judge or one of our moderation tools flags the message, we alert the teacher immediately.

## Anthropic: Over-flagging has its own cost. What does that look like in practice?

**O'Keefe:** It's immensely critical. We owe it to students and teachers to ensure their AI interactions are safe and monitored. We alert when we detect potential critical issues in student interactions, such as violence or self-harm, and teachers expect to be alerted where they can be acted on immediately. However, flagging the wrong issues or flagging unnecessary concerns creates noise, erodes trust, and risks missing a true concern. When incorrect alerts requiring rapid response reach designated action channels, the reputational harm extends well beyond noise. And, missing a dangerous message prevents a teacher or administrator from being able to address a student and intervene quickly and appropriately.

## Anthropic: Walk us through the model choice. Why Haiku 4.5 specifically as the judge?

**Rohlfs:** We put every model through extensive red-teaming before it goes into the platform. For our student-facing tools, where the stakes are highest, Claude has consistently been the strongest choice, most notably for its high performance against our safety benchmarks. MagicSchool has multiple layers of defense, including prompting that we regularly test across real and synthetic edge cases. The Haiku-driven moderation layer is an additional check that helps teachers identify when students enter potentially concerning content. We've validated it against established external benchmarks and our own user data, and found it accurately flags concerning cases without overflagging benign content, outperforming alternative moderation services at the speed and volume we require.

‍
