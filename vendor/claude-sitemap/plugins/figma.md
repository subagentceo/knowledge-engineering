# Figma

The Figma plugin bridges the gap between design and development by connecting Claude Code directly to your Figma design files. Access design context, extract component information, retrieve design tokens, and translate designs into production-ready code with pixel-perfect fidelity.

Key features include extracting structured design data (layout, typography, colors) from Figma frames, fetching design variables and tokens, mapping Figma components to your existing codebase via Code Connect, and capturing visual references for validation. The plugin works with both Figma's cloud server and the desktop app.

**How to use:** Share a Figma URL and ask Claude to implement the design. Use `/implement-design` to translate Figma frames into code using your project's design system. Use `/create-design-system-rules` to generate custom guidelines that encode your team's development conventions. Use `/code-connect-components` to establish mappings between Figma components and your codebase implementations.

Example prompts: "Implement this Figma design: [paste Figma URL]", "Create design system rules for my React project", "Connect my Button component to its Figma counterpart", "Extract the color variables from this design file".
