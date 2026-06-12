> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# ElevenCreative Flows

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/476f79826c3bb57f85d46b402ec330dbb8a992fafa9c0a18bc81b9418898fb34/assets/images/product-guides/flows/flows-hero.webp" alt="Flows canvas overview" />

## Overview

ElevenCreative Flows provides a node-based visual workspace for orchestrating end-to-end creative pipelines. While [ElevenCreative Studio](/docs/eleven-creative/products/studio) uses a linear timeline for precise editing, ElevenCreative Flows allows you to map out production logic on an infinite canvas.

With ElevenCreative Flows, you can chain together over 50 [image and video models](/docs/overview/capabilities/image-video) alongside ElevenLabs' industry-leading [speech](/docs/overview/capabilities/text-to-speech), [music](/docs/overview/capabilities/music), and [sound effects](/docs/overview/capabilities/sound-effects) models. This modular approach enables you to iterate on specific pipeline steps without regenerating the entire project.

ElevenCreative Flows is currently in Alpha. Features are subject to change.

## Key capabilities

* **Visual pipeline builder**: Map complex multi-step workflows on an infinite canvas
* **50+ generative models**: Access image, video, speech, music, and sound effects models in one interface
* **Non-destructive iteration**: Modify individual nodes without regenerating downstream content
* **Modular composition**: Layer and combine outputs from different models
* **Template library**: Start from pre-configured pipelines for common use cases
* **Real-time collaboration**: Work simultaneously with team members on the same flow
* **ElevenCreative Studio integration**: Export finished flows directly to ElevenCreative Studio for timeline editing

## Real-time collaboration

Multiple team members can open the same flow, see each other's cursors, make edits simultaneously, run the pipeline together, and leave comments on nodes. Shared flows appear in each collaborator's flows list automatically.

**Live cursor presence:** See who's working where in the canvas in real time.

**Instant sync:** All edits propagate immediately to every collaborator.

**Shared execution:** Everyone sees pipeline outputs at the same time.

**Basic Seat access:** Reviewers and stakeholders can collaborate at a reduced access tier. Basic Seat members can open shared flows, watch pipelines run, review outputs, and leave comments without needing a full workspace seat.

**Public flows:** External viewers can follow along as anonymous participants on public flows.

## Guide

### Create a new flow

Select **+ New Flow** from the dashboard to open a blank canvas.

{' '}

![Create a new flow](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/c55e68567471280f6d4e713b2f46a23b0479ef64e4a48144e3876e0330fb3532/assets/images/product-guides/flows/flows-new.webp)

### Add nodes

Right-click anywhere on the canvas or use the toolbar at the bottom to add a node. Nodes represent specific models or utility tools.

![Add nodes](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/3db741756fcf67e9969c2503dbae5bf00fc05103e1c22a2fe3334d962e0654b9/assets/images/product-guides/flows/flows-add-node.webp)

### Connect your workflow

Click and drag from an output port of one node to the input port of another to chain them together. For example, connect a generated image to a video generation node.

![Connect workflow](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/ea59847d2a725e920b5a03ecee5cc003f51d7f701c10d2b83c90679a469df685/assets/images/product-guides/flows/flows-connect-workflow.webp)

### Execute and iterate

Click the **Run** button on individual nodes to generate content. Re-run a single node to test variations without affecting the rest of the chain.

![Generate and iterate](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/a5055f58da10a7c0ec9f79fb826ed9fd8f5f329e4d6169b58b47608bbdc362eb/assets/images/product-guides/flows/flows-run.webp)

### Export or move to ElevenCreative Studio

Once your flow is complete, export the final assets directly or send the project to [ElevenCreative Studio](/docs/eleven-creative/products/studio) for fine-tuned timeline editing.

## Starting options

ElevenCreative Flows is designed for both exploratory creation and structured production pipelines.

### Quick start

#### Start from scratch

Begin with a blank canvas. This is ideal for building custom pipelines from the ground up or experimenting with complex multi-step generation chains.

#### Use a template

Select from preset shortcuts at the center of the canvas to load pre-configured node structures:

* **Perfume Ad**: A template optimized for luxury product visuals and voiceovers
* **E-commerce Store**: Designed for creating rapid product demos and variations
* **Yacht Promo Shoot**: A multi-modal setup for high-end travel and lifestyle content
* **And more**: Additional templates are continuously being added

## Flows Agent

Flows Agent is a conversational AI co-editor built directly into ElevenCreative Flows. To begin working with the agent, enter a description of what you want to create in the agent chat box. You have the option to upload existing files or start from scratch. The agent may ask clarifying questions, then builds your flow by placing nodes directly onto the canvas. Continue the conversation to keep iterating on your flow by providing feedback and requesting changes.

![Flows Agent creating a new flow](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/ce96a9170d9367e98816346dffbf429eaec694bdffa0eb0134b56b5fee5976b8/assets/images/product-guides/flows/flows-agent-new.webp)

### Using the agent with existing flows

You can also work with Flows Agent on existing flows. Just enter a description of what you want to do in the agent chat box, and the agent will analyse your existing nodes and carry out your instructions.

![Flows Agent working with existing
flows](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/6e76725a28de83ec701d984fb9620e8fddd22cdbded7858d0f31edd2f0f8d9d8/assets/images/product-guides/flows/flows-agent-existing.webp)

### Agent permissions

You can set permissions for the agent, with the following options:

* **Approve each**: you'll be prompted to review and confirm every action before it executes.
* **Auto-run**: all actions will automatically execute without requiring confirmation.
* **Auto under threshold**: you'll only be asked for confirmation when a single action's cost exceeds your specified threshold.

### Manual control

Flows Agent does not replace manual editing. You can take over at any point to make adjustments, then hand control back to the agent. Manual and agent-assisted editing work side by side throughout your workflow.

![Completed flow with agent
conversation](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/7a394d1cf4a62de6640bb7127063ddb92c733afc234123f9e46b3c7c99797240/assets/images/product-guides/flows/flows-agent-detail.webp)

### Pricing

Flows Agent is available on all plans. Chat usage is billed based on the volume and type of tokens processed during your conversation — there is no fixed price per interaction. Speech, image, music, sound effects, and video generation are billed at the standard rates for those capabilities. Commercial usage rights are determined by your subscription plan, consistent with other ElevenLabs products. Standard subscription plans are charged in credits, while Enterprise plans may use fiat billing. [Contact our Enterprise Sales team](https://elevenlabs.io/enterprise) to learn more.

To upgrade your plan, visit your [Subscription page](https://elevenlabs.io/app/subscription).

## The node system

Nodes are the building blocks of a flow. Each node serves a specific purpose, from inputting text to generating high-fidelity video.

#### Generation nodes

These nodes house the generative models that create your assets:

* **Text to Speech**: Generate narration using our latest models, including [v3](/docs/overview/models#eleven-v3)
* **Image Generation**: Choose from 50+ industry-leading models to create visuals
* **Video Generation**: Animate images or generate video clips directly from text
* **Music**: Add atmospheric soundtracks to your project
* **Sound Effects**: Add targeted sound effects to your project

See our [capabilities overview](/docs/overview/intro#capabilities) for detailed information on each model type.

#### Processing & utility nodes

Use these nodes to refine and combine your content:

* **Text**: Add text input to your flow for prompts and instructions
* **Upload Media**: Import your own images, videos, or audio files into the flow
* **Composition**: A centralized preview node where you can layer audio and video to view the final output
* **Lipsync Generation**: Chain a speech node with either a video or image node to create perfectly synced talking heads
* **Upscale**: Increase the resolution and quality of your generated visual assets

#### Contextual navigation

When you drag a connection from an output port, ElevenCreative Flows automatically suggests compatible next-step nodes to help you build your pipeline faster.

## Execution and iteration

Unlike linear editors, ElevenCreative Flows allows for non-destructive iteration.

![Flow execution](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/fee84dc60f09c24b1ce7b170935640aedf5f158c153fb8a5e1947cf4a1ec0ade/assets/images/product-guides/flows/flows-run-from-here.webp)

**Partial generation:** If you want to change the voiceover but keep the generated video, you only need to re-run the [Text to Speech](/docs/overview/capabilities/text-to-speech) node. Only the subsequent nodes in that specific path will need to be updated.

**Batch variations:** Because the structure is saved as a flow, you can quickly swap out a single prompt or character and re-execute the pipeline to generate dozens of creative variations for A/B testing or multi-language campaigns.

**Credit usage:** Generating content within a node costs credits just like our standalone tools. Re-running a node will trigger a new generation and a new credit charge.

## Export and final production

Once you are satisfied with the output of your flow, you have two primary options:

**Download assets:** Export individual files or the final composition from the result nodes.

**Export to ElevenCreative Studio:** Send your assets directly to [ElevenCreative Studio](/docs/eleven-creative/products/studio) if your project requires precise timeline-based adjustments, captions, or manual track layering.

Programmatic execution via API for mass creative production is planned for a future release.

## Creating a template

You can create a template from an existing flow, allowing you to reuse the same flow with different inputs each time. Templates can be kept for personal use or shared with others.

![Creating a template from a flow](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/c42cf66b656de0e6764fa615b20986a40cee9f329416b2a80c50a76718c8f795/assets/images/product-guides/flows/flows-create-template.webp)

### To create a template

### Select your input nodes

These are the values someone provides when they run the template. You can have multiple inputs of different types.

### Select your output nodes

You must select at least one. If you select more than one, all outputs will be bundled into a zip file for download.

### Run the template at least once

This is required before the template can be saved or shared.

### Sharing options

When saving your template, choose who can access it:

* **Just me**: the template can only be used by you.
* **Workspace**: the template can be used by anyone in your workspace.
* **Link only**: the template can be used by anyone with the link.
* **Explore**: the template will be submitted for review. Once approved, it will be visible to everyone in the [Templates](https://elevenlabs.io/app/templates) **Explore** tab.

For more information on using and managing templates, see the [Templates documentation](/docs/eleven-creative/products/templates).

## FAQ

ElevenCreative Flows supports over 50 image and video models alongside ElevenLabs' [text to
speech](/docs/overview/capabilities/text-to-speech), [music](/docs/overview/capabilities/music),
and [sound effects](/docs/overview/capabilities/sound-effects) models. See our [Images & Video
guide](/docs/eleven-creative/playground/image-video#models) for a complete list.

[ElevenCreative Studio](/docs/eleven-creative/products/studio) uses a linear timeline for
precise frame-by-frame editing with tracks for video, audio, music, and captions. ElevenCreative
Flows uses a node-based canvas for building multi-step generative pipelines. Use ElevenCreative
Flows to orchestrate complex generation chains, then export to ElevenCreative Studio for final
editing.

Yes. Each flow is automatically saved as a project. You can reload a flow, modify prompts or
settings, and re-execute to create variations without rebuilding the entire pipeline. You can
also create a template from any flow, allowing you to reuse the same flow structure with
different inputs each time. See [Creating a template](#creating-a-template) for more details.

No. ElevenCreative Flows supports non-destructive iteration. You can re-run a single node, and
only downstream nodes connected to that path will need to be updated. Unconnected branches
remain unchanged.

Each node generation costs credits based on the model and settings used, identical to standalone
tool pricing. Re-running a node triggers a new generation and a new credit charge. The number of
credits you will be charged is displayed when you hover over the **Run** button.

You can export individual assets or the final composition as downloadable files. To continue
working with your outputs in [ElevenCreative Studio](/docs/eleven-creative/products/studio),
save them to your Files library and import them from there.

Programmatic execution via API is planned for a future release. This will enable mass creative
production use cases, such as connecting a CMS to a flow for automated content generation.

If a node fails during execution, only that node is affected and you are not charged for that
execution. You can re-run the failed node without affecting other branches of your flow.

Yes. When a flow is shared with your workspace, any team member can open it and start working.
Changes sync instantly. You can see who else is in the flow and work on different parts of the
pipeline simultaneously.

Share a flow with anyone in your workspace. Shared flows appear in each collaborator's flows
list automatically — no separate link required.

Yes. Basic Seat members can open shared flows, watch pipelines run, review outputs, and leave
comments. They do not need a full workspace seat.

On public flows, collaborators outside your workspace can view and follow along. They appear as
anonymous participants.

No. Collaboration itself does not consume credits. Credits are consumed when nodes are executed,
as normal.