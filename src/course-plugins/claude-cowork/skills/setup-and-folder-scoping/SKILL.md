---
name: setup-and-folder-scoping
description: Install Cowork and choose the right working folder to point Claude at. Trigger when the user is setting up Cowork for the first time, asks how to "point Claude at a folder", which folder to pick, what's in scope, or why their folder choice matters for read/write access and safety.
---

# Setting Up Cowork and Scoping the Folder

> Distilled from the *Introduction to Claude Cowork* course.

## Install

Cowork runs inside the Claude Desktop app on Mac and Windows. Install from claude.com/download, sign in, and find Cowork in the **mode selector at the top right**. If Cowork isn't visible, you may need a paid plan or a more recent version of the app.

## Point Claude at a folder

Click **Work in a project** in the prompt bar and pick a folder. This is the single most important setup choice for each new task — the folder is where the work lives. Claude reads every file inside (Word, Excel, PDF, PowerPoint, whatever's there) and saves finished outputs back to the same location.

**The folder is where Cowork has read AND write access.** It can open files, edit them, create new ones, and organize them. This is the main difference from Chat: in Chat, Claude reads what you upload but can't save back to your computer; in Cowork, it can.

## Pick the smallest folder that holds what the task needs

Choose a folder scoped to one project or stream of work. Claude doesn't need your entire documents folder — just the one with the files for the task.

- Selecting your **home folder** or a catch-all (Documents, Downloads, Desktop) puts *everything* in scope — every personal file, every other client — and anything Claude saves could land anywhere in there.
- Narrow down to the actual project folder (e.g. `Q3 Competitive Review/`) so Claude reads exactly the source files it needs, writes the new deliverable there, and **can't touch anything else.**
- You can always **add another folder later** if a task needs something outside the first one.

## Pick a folder with the right context

Cowork works best when the folder already has the context for the work — the source materials, relevant documents, templates. Cowork is only as useful as the context it has.

## Cloud files behave differently

What a cloud connector lets Claude do varies. Many — like the default Google Drive and M365 connectors — are **read-and-search only**; others can create or edit. Check each connector's description when you enable it. The most reliable place for Claude to build and iterate on a document is still your **local working folder**.

## A good first task to confirm setup

Point Claude at a real project folder (copy contents to a fresh folder first if you'd rather not use the live one — but use real material, not toy files), connect one app, then ask: *"Take a look at everything in this folder and write me a brief on what you've learned — what's in it, how the documents relate, any surprising insights."* Read the brief against your own knowledge.

## Source
Course section(s): "Lesson 2: Setting up Claude Cowork" — "Install Cowork", "Pointing Claude at a folder", "Try it now" — projects/courses/introduction-to-claude-cowork__cowork.txt
