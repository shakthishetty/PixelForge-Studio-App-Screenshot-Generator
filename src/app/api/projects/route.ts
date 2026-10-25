import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ProjectSchema = z.object({
  id: z.string(),
  version: z.number().default(1),
  title: z.string().min(1),
  targetPlatform: z.string().default("universal"),
  activeCanvasId: z.string(),
  canvases: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      width: z.number().positive(),
      height: z.number().positive(),
      background: z.any(),
      elements: z.array(z.any()),
    })
  ).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = ProjectSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid project document format", details: validated.error.issues },
        { status: 400 }
      );
    }

    // In guest mode (or until remote DB credentials configured), return success
    return NextResponse.json({
      success: true,
      projectId: validated.data.id,
      title: validated.data.title,
      savedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Server Error", message: err.message },
      { status: 500 }
    );
  }
}
