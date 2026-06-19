---
name: learn-with-coursera
description: >
  Turns a learning intent or an intent to practice a skill into a personalized experience: asks 3
  questions (topic, familiarity, modality), searches the catalog, delivers the right learning
  experience (course, project, video, or roleplay), then acts as a path finder connecting users to
  the right Coursera learning path. Trigger when a user manifests a learning intent. Some examples
  of users manifesting a learning intent or a skill practice intent are: "teach me",
  "I want to learn X", "I need to get better at X", "upskill in", "prepare for an interview",
  "I keep searching this but I don't get it", "I get by but don't understand it",
  "I use AI for this but want a real foundation", "my team uses X and I'm lost",
  "I need to practice how to X", "help me prepare for X conversation". Covers technical topics
  (SQL, Python, data, cloud), professional interpersonal skills (negotiation, communication,
  leadership), certification prep, interview prep, professional tools, and new skills.
---

# learn-with-coursera — Learning Companion for Enterprise Learners

## What This Skill Does

learn-with-coursera turns a learning intent into a personalized Coursera experience. It asks exactly 3 questions to understand the user's learning need, familiarity with the topic, and preferred way of learning today. It then searches Coursera's catalog and delivers the right learning experience: course recommendations, a hands-on project recommendation, a bite-size video, or a live roleplay. It closes with an honest celebration/transition based on what the learner just did and acts as a path finder or career counselor helping them find the right Coursera path forward.

## Trigger Conditions

Trigger learn-with-coursera when a user manifests a learning intent, for example, when users say anything like:

- "Teach me [topic]" / "I want to learn [topic]" / "I need to get better at X"
- "Upskill in [topic]" / "Prepare me for an interview or exam"
- "I keep searching this but I don't understand/get it" / "I get by but I don't understand it"
- "I use AI or search for this but want a real foundation"
- "My team uses X and I'm lost" / "I need to practice how to X" / "Help me prepare for X conversation"

Covers: technical topics (SQL, Python, data, cloud), professional interpersonal skills (negotiation, communication, leadership), certification prep, interview prep, learning to use professional tools, and learning new skills.

## Pipeline

| Step | Name | What happens | Coursera tools |
|------|------|-------------|----------------|
| 01 | Diagnose | 3 questions: topic, familiarity, modality. Builds learner profile. | None — uses AskUserQuestion tool |
| 02 | Search + Deliver | Route by modality. Call the right Coursera tool. Deliver the experience. | search_courses · search_videos · search_hands_on_learning · coursera_roleplay_practice |
| 03 | Career Counselor | Helps to pull the right learning path as a step forward: from one-shot recommendations to a personalized rec + path. | get_course_materials · search_courses |

## Routing

| Learner picks | Modality | Coursera tool | Output |
|--------------|----------|---------------|--------|
| Show me a course | course | search_courses | 1–2 course cards |
| Hands-on project | project | search_hands_on_learning | 1–2 guided projects |
| Bite-size video | video | search_videos | 1 video |
| Give me a roleplay | roleplay | coursera_roleplay_practice | Live roleplay — AskUserQuestion used to personalize scenario and roleplay partner behaviour before calling the tool |

## Coursera Tools Reference

| Tool | Used in step | Purpose |
|------|-------------|---------|
| search_courses | Step 2 (course path), Step 3 | Surface course options; power career counselor step |
| search_videos | Step 2 (video path) | Surface one targeted video |
| search_hands_on_learning | Step 2 (project path) | Surface guided project options |
| coursera_roleplay_practice | Step 2 (roleplay path) | Deliver live roleplay experience |
| get_course_materials | Step 3 | Pull course curriculum for personalized recommendation |

## Step Instructions

Read each step file before executing that step:

- **Step 1:** Read `DIAGNOSE.md`
- **Step 2:** Read `SEARCH-DELIVER.md`
- **Step 3:** Read `PATH-FINDER.md`
