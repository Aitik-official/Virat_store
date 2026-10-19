import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SiteMedia from "@/models/SiteMedia";
import { defaultSiteMedia } from "@/lib/site-assets";

export async function GET() {
  try {
    await connectToDatabase();
    let media = await SiteMedia.findOne({ key: "active_config" }).lean();

    if (!media) {
      media = await SiteMedia.create({
        key: "active_config",
        ...defaultSiteMedia,
      });
    }

    return NextResponse.json({ success: true, media });
  } catch (error: any) {
    console.error("GET /api/media error:", error);
    // Return default assets on error
    return NextResponse.json({
      success: true,
      media: defaultSiteMedia,
      fallback: true,
      error: error.message,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const updated = await SiteMedia.findOneAndUpdate(
      { key: "active_config" },
      { $set: body },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, media: updated });
  } catch (error: any) {
    console.error("PUT /api/media error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update site media" },
      { status: 500 }
    );
  }
}
