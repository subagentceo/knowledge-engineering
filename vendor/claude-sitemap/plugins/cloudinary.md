Bring Cloudinary's full media management platform into Claude. This plugin connects five MCP servers covering asset management, environment configuration, structured metadata, AI-powered image and video analysis, and automated media workflows (Mediaflows). Upload, organize, and transform images and videos without leaving the conversation.

The plugin includes a transformations skill that builds and validates Cloudinary delivery URLs from natural language — supporting resize and crop modes, format and quality optimization, effects like background removal and generative fill, video trimming, overlays, and more. A documentation skill fetches live Cloudinary docs so responses are always accurate and backed by official references.

**How to use:** After installing, authorize via OAuth to connect your Cloudinary account (the Mediaflows server requires manual API key setup). Then ask Claude to perform tasks like:

-   "Upload this image to my Cloudinary account"
-   "Generate a transformation URL that crops to 400x300 with face detection and auto quality"
-   "Analyze this product photo and suggest optimizations"
-   "Remove the background from my hero image and replace it with a gradient"
-   "Show me the Cloudinary docs for video transcoding options"
-   "Set up a Mediaflow to auto-optimize images on upload"