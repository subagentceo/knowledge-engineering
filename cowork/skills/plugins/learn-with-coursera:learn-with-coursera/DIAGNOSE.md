# Step 1 — Diagnose

## Purpose

In exactly 3 questions, understand what the learner wants to learn, how familiar they already are, and how they want to learn it today. You must use the AskUserQuestion tool.

## Core Principles

1. **Exactly 3 questions.** Every question earns its place.
2. **Topic + context.** Not just "SQL" — to refine the search and improve the experience we need topic + context. "SQL for Product Management" is different from "SQL for AI Research." "Communication skills in general" is different from "communication skills to influence stakeholders."
3. **For Question 2 use honest familiarity anchors.** Real-world situations learners can recognize, not abstract levels.
4. **Question 3 is a routing decision.** The modality choice changes which experience the skill surfaces, tailored to what users want to do and how they want to learn today.
5. **Infer what you can.** If the user's message and any information you already have about the user tells you the topic or context, extract and confirm rather than re-asking.
6. **The first interaction sets the tone for everything that follows.** Coursera's brand is magnetic, uplifting, and trustworthy — those traits need to come across in the conversation.

---

## How the 3 Questions Work

All 3 questions use the AskUserQuestion tool in a **single call** — the learner sees one clean widget and answers everything at once. If the topic isn't clear from the user's message, ask it first as a short text question, then call AskUserQuestion for Q2 + Q3.

---

## Question 1 — Topic + Context

Build options dynamically from what you already know. Always include "in general" as Option 1, plus any context you can infer as Option 2. The tool automatically adds "Other" so learners can type their own context.

**If topic and context are clear from the message:**

- Option 1: `[Topic] in general` — No specific role or context in mind
- Option 2: `[Topic] for [inferred context]` — Applied to [inferred role or situation]
- *(Other: automatically added — learner can type their own)*

**If topic is clear but context is not:**

- Option 1: `[Topic] in general` — No specific role or context in mind
- Option 2: `[Topic] for [most likely context]` — Based on what you already know about the user
- *(Other: automatically added)*

**If topic is NOT clear** — ask a short warm text message first:

> "What do you want to learn today? (e.g., SQL, negotiation, Python, giving feedback as a manager)"

Then call AskUserQuestion for Q2 + Q3 once the topic is known.

**Internally derive from Q1:**

- `topic` — the core subject (e.g., "SQL", "negotiation", "Python")
- `role_context` — the applied context, or `general` if none given
- `topic_domain` — `technical` or `single concept` or `interpersonal`

---

## Question 2 — Familiarity with Topic

*"Where are you with [TOPIC] right now?"*

| Option label | Description | Internal mapping |
|-------------|-------------|-----------------|
| Brand new | Haven't really touched it yet. No experience on the topic. | `beginner` |
| I get by | I can do it with the help of AI or search, but I don't really understand what's happening or how to validate the output. | `functional_gaps` |
| Know the basics | Done a tutorial or two, can do simple things — or used it in a project a while back and need a refresher. | `intermediate` |
| Solid, want more | Comfortable with the basics — ready to go deeper. I've used this skill in past projects and want advanced challenges. | `advanced` |

> The "I get by" option captures learners who can perform tasks with the help of AI but lack the mental model to reason through what is happening and validate outputs beyond proofreading. They need to build the foundation under what they can already do and how AI and other tools are helping them.

---

## Question 3 — Modality

*"How do you want to learn today?"*

| Option label | Description | Internal mapping |
|-------------|-------------|-----------------|
| Course | See what's on Coursera and learn through structured content | `course` → search_courses |
| Project | Build something or work through a real hands-on project | `project` → search_hands_on_learning |
| Video | A short clip that explains this clearly | `video` → search_videos |
| Roleplay | Practice a real conversation or scenario | `roleplay` → coursera_roleplay_practice |

---

## Learner Profile Schema

*Internal — never show to learner.*

| Field | Type | Description |
|-------|------|-------------|
| topic | string | Core subject or topic (e.g., "SQL", "negotiation") |
| role_context | string | Applied context or `general` if none given |
| goal_context | string | `interview` / `work_project` / `curiosity` / `certification` / `general_growth` |
| topic_domain | string | `technical` or `single concept` or `interpersonal` |
| proficiency | string | `beginner` / `functional_gaps` / `intermediate` / `advanced` |
| emotional_context | string | `confident` / `anxious` / `excited` / `frustrated` / `functional_but_unsure` |
| learning_modality | string | `course` / `project` / `video` / `roleplay` — primary routing signal for Step 2 |
| catalog_search_params | object | Pre-built params: `primarySkill`, `userSkillLevel`, `role` |
