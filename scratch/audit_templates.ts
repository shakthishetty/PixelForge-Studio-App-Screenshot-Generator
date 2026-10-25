import { STARTER_TEMPLATES } from "../src/templates/definitions";

console.log(`Total Templates: ${STARTER_TEMPLATES.length}\n`);

STARTER_TEMPLATES.forEach((t, i) => {
  console.log(`=== ${i + 1}. [${t.category}] ${t.id} - "${t.title}" (${t.canvases.length} canvases) ===`);
  t.canvases.forEach((c, ci) => {
    const textEls = c.elements.filter((e) => e.type === "text") as any[];
    const mockups = c.elements.filter((e) => e.type === "mockup") as any[];
    const images = c.elements.filter((e) => e.type === "image") as any[];
    const shapes = c.elements.filter((e) => e.type === "shape") as any[];
    const badges = c.elements.filter((e) => e.type === "badge") as any[];

    const head = textEls[0] ? `Text(y:${textEls[0].y}, font:${textEls[0].fontSize}, align:${textEls[0].align})` : "NoText";
    const mock = mockups.length > 0 ? `${mockups.length} Mockup(y:${mockups[0].y}, rot:${mockups[0].rotation || 0}, dev:${mockups[0].deviceType})` : "NoMockup";
    const others = [
      images.length > 0 ? `${images.length} Images` : "",
      shapes.length > 0 ? `${shapes.length} Shapes` : "",
      badges.length > 0 ? `${badges.length} Badges` : "",
    ].filter(Boolean).join(", ");

    console.log(`  Canvas ${ci + 1}: ${head} | ${mock} | ${others || "None"}`);
  });
});
