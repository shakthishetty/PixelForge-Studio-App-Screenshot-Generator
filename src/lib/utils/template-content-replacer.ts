import { CanvasItem } from "@/types/editor";

export interface UserImportedContentItem {
  url: string;
  title: string;
  subtitle?: string;
}

/**
 * Checks whether an element is a graphic badge, laurel wreath, rating star, etc.
 * that shouldn't be replaced with an app screenshot.
 */
export function isNonScreenAsset(el: any): boolean {
  if (el.type === "badge") return true;
  if (el.type !== "image") return false;
  const str = `${el.id || ""} ${el.name || ""}`.toLowerCase();
  return (
    str.includes("badge") ||
    str.includes("wreath") ||
    str.includes("laurel") ||
    str.includes("rating") ||
    str.includes("spotlight") ||
    str.includes("award") ||
    str.includes("star") ||
    str.includes("icon") ||
    str.includes("logo") ||
    str.includes("avatar")
  );
}

/**
 * Takes an array of template canvases and replaces the placeholder headlines,
 * subtitles, and mockup screenshot images with the user's imported content.
 * 
 * Preserves 100% of the template's:
 * - Colors, background gradients, and patterns
 * - Device mockup styles (iPhone, Android, tablet, angled, 3D tilt, shadows)
 * - Badges, laurels, awards, and decorative shapes
 * - Layout positioning and typography styling (fonts, alignments, weights)
 */
export function applyUserContentToCanvases(
  canvases: CanvasItem[],
  userContent: UserImportedContentItem[]
): CanvasItem[] {
  if (!userContent || userContent.length === 0 || !canvases || canvases.length === 0) {
    return canvases;
  }

  // Deep clone so template definitions are never mutated
  const cloned: CanvasItem[] = JSON.parse(JSON.stringify(canvases));

  // If user imported more screenshots than canvases in the template,
  // extend with clones of the last canvas so all user screenshots are included
  if (userContent.length > cloned.length) {
    const extraCount = userContent.length - cloned.length;
    const baseCanvas = cloned[cloned.length - 1];
    for (let i = 0; i < extraCount; i++) {
      const extraClone: CanvasItem = JSON.parse(JSON.stringify(baseCanvas));
      extraClone.id = "c-ext-" + Math.random().toString(36).substring(2, 9);
      extraClone.name = `Canvas ${cloned.length + 1}`;
      extraClone.elements = extraClone.elements.map((el) => ({
        ...el,
        id: "el-" + Math.random().toString(36).substring(2, 9),
      }));
      cloned.push(extraClone);
    }
  }

  cloned.forEach((canvas, canvasIdx) => {
    const item = userContent[canvasIdx % userContent.length];
    if (!item) return;

    // 1. Text Replacement (Title / Headline & Subtitle / Description)
    const textElements = canvas.elements.filter((el) => el.type === "text") as any[];

    if (textElements.length === 1) {
      if (item.title && item.title.trim().length > 0) {
        textElements[0].text = item.title;
      }
    } else if (textElements.length > 1) {
      // Find headline: by name or largest font size
      let headlineEl = textElements.find(
        (el) =>
          el.name?.toLowerCase().includes("headline") ||
          el.name?.toLowerCase().includes("title")
      );
      if (!headlineEl) {
        headlineEl = textElements.reduce((max, el) =>
          (el.fontSize || 0) > (max.fontSize || 0) ? el : max
        );
      }

      // Find subtitle: other text matching subtitle/desc, or second largest font
      const otherTexts = textElements.filter((el) => el.id !== headlineEl.id);
      let subtitleEl = otherTexts.find(
        (el) =>
          el.name?.toLowerCase().includes("subtitle") ||
          el.name?.toLowerCase().includes("desc") ||
          el.name?.toLowerCase().includes("sub")
      );
      if (!subtitleEl && otherTexts.length > 0) {
        subtitleEl = otherTexts[0];
      }

      // Replace headline with user title
      if (item.title && item.title.trim().length > 0 && headlineEl) {
        headlineEl.text = item.title;
      }

      // Replace subtitle with user subtitle (if provided)
      if (item.subtitle && item.subtitle.trim().length > 0 && subtitleEl) {
        subtitleEl.text = item.subtitle;
      }
    }

    // 2. Mockup & Screenshot Image Replacement
    const mockupElements = canvas.elements.filter(
      (el) => el.type === "mockup" || (el.type === "image" && !isNonScreenAsset(el))
    ) as any[];

    mockupElements.forEach((mockEl, mIdx) => {
      // For dual/multi-phone templates on a single canvas,
      // subsequent mockups can display the subsequent screenshot
      const screenItem =
        mIdx === 0
          ? item
          : userContent[(canvasIdx + mIdx) % userContent.length] || item;

      if (screenItem.url) {
        if (mockEl.type === "mockup") {
          mockEl.screenshotUrl = screenItem.url;
        } else {
          mockEl.url = screenItem.url;
        }
      }
    });
  });

  return cloned;
}
