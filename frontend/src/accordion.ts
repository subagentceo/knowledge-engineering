// frontend/src/accordion.ts
//
// Phase 13.B+ (O7). "Finally sane accordion": section heights are
// pre-measured via @chenglou/pretext rather than measured against the
// DOM at expand time. Inspired by https://chenglou.me/pretext/accordion/.
//
// API:
//   const a = new Accordion(rootEl);
//   a.addSection("anthropics — overview", htmlBody);
//   a.addSection(...);
//   a.render();
//
// Click-to-expand. Only one section open at a time (mobile-friendly).
// Heights computed once on first render; resize re-computes.

import { layout, prepare } from "@chenglou/pretext";

interface Section {
  el: HTMLElement;
  contentEl: HTMLElement;
  bodyEl: HTMLElement;
  measuredHeight: number;
}

export class Accordion {
  private root: HTMLElement;
  private sections: Section[] = [];
  private openIndex = -1;
  private contentWidth = 0;
  private fontSpec = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
  private lineHeight = 19; // 12px * ~1.55 (per styles.css line-height: 1.55)

  constructor(root: HTMLElement) {
    this.root = root;
  }

  addSection(title: string, bodyHtml: string, vendorTag?: string): void {
    const sectionEl = document.createElement("div");
    sectionEl.className = "accordion-section";

    const summaryEl = document.createElement("div");
    summaryEl.className = "accordion-summary";
    summaryEl.setAttribute("role", "button");
    summaryEl.setAttribute("tabindex", "0");
    if (vendorTag) {
      const tagEl = document.createElement("span");
      tagEl.className = "accordion-vendor-name";
      tagEl.textContent = vendorTag;
      summaryEl.appendChild(tagEl);
    }
    const titleEl = document.createElement("span");
    titleEl.textContent = title;
    summaryEl.appendChild(titleEl);

    const contentEl = document.createElement("div");
    contentEl.className = "accordion-content";

    const bodyEl = document.createElement("div");
    bodyEl.className = "accordion-body";
    bodyEl.innerHTML = bodyHtml;
    contentEl.appendChild(bodyEl);

    sectionEl.appendChild(summaryEl);
    sectionEl.appendChild(contentEl);

    const idx = this.sections.length;
    summaryEl.addEventListener("click", () => this.toggle(idx));
    summaryEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggle(idx);
      }
    });

    this.sections.push({ el: sectionEl, contentEl, bodyEl, measuredHeight: 0 });
    this.root.appendChild(sectionEl);
  }

  /** Pretext-measure each body in turn, store the resulting heights. */
  measure(contentWidth: number): void {
    this.contentWidth = contentWidth;
    for (const s of this.sections) {
      s.measuredHeight = this.measureBody(s.bodyEl, contentWidth);
    }
  }

  /** Reveal the accordion (caller flips `hidden=false` after this). */
  render(): void {
    if (this.contentWidth === 0) {
      // Caller forgot to measure — measure against the live root width.
      this.measure(Math.max(280, this.root.clientWidth - 16));
    }
  }

  private toggle(idx: number): void {
    const section = this.sections[idx];
    if (section === undefined) return;
    if (this.openIndex === idx) {
      // Close current.
      section.el.classList.remove("open");
      section.contentEl.style.height = "0";
      this.openIndex = -1;
      return;
    }
    // Close the previously open one.
    if (this.openIndex >= 0) {
      const prev = this.sections[this.openIndex];
      if (prev !== undefined) {
        prev.el.classList.remove("open");
        prev.contentEl.style.height = "0";
      }
    }
    section.el.classList.add("open");
    section.contentEl.style.height = `${section.measuredHeight}px`;
    this.openIndex = idx;
  }

  /**
   * Pretext-driven measurement: for each text line in the body's
   * textContent we measure the line count for the available width,
   * then multiply by line-height. Pretext does the wrapping math
   * without ever inserting nodes into the DOM. Pre-formatted blocks
   * (<pre>) are measured by their own text width and don't wrap.
   *
   * Citation: seeds/citations/pretext.md
   */
  private measureBody(bodyEl: HTMLElement, contentWidth: number): number {
    let totalLines = 0;
    // Walk the body's children in source order. For each block, decide
    // wrapping behavior. We approximate by treating every direct
    // child as a paragraph-shaped block.
    const blocks = bodyEl.children;
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i] as HTMLElement | undefined;
      if (block === undefined) continue;
      const text = block.textContent ?? "";
      if (block.tagName === "PRE") {
        // Pre-formatted: count newlines + 1.
        totalLines += text.split("\n").length;
        totalLines += 1; // gap
      } else if (text.length === 0) {
        totalLines += 1;
      } else {
        const prepared = prepare(text, this.fontSpec);
        const { lineCount } = layout(prepared, contentWidth, this.lineHeight);
        totalLines += lineCount + 1; // +1 for paragraph spacing
      }
    }
    // bodyEl padding (8 + 16 from styles.css) is ~24px.
    return Math.max(this.lineHeight, totalLines * this.lineHeight + 24);
  }
}
