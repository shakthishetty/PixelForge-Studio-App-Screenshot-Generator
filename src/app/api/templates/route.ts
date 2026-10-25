import { NextResponse } from "next/server";
import { STARTER_TEMPLATES } from "@/templates/definitions";

export async function GET() {
  return NextResponse.json({
    templates: STARTER_TEMPLATES,
    total: STARTER_TEMPLATES.length,
  });
}
